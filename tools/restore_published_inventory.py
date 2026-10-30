"""Restore the last successful publication before a stateless Actions sync."""
from __future__ import annotations

import copy
import json
import sys
from datetime import datetime, timezone
from pathlib import Path
from urllib.error import HTTPError
from urllib.request import Request, urlopen

SITE = "https://inventory.lucramarble.com/data/"


def valid_date(value):
    try:
        parsed = datetime.fromisoformat(value.replace("Z", "+00:00"))
        return parsed if parsed.tzinfo and parsed <= datetime.now(timezone.utc) else None
    except (AttributeError, TypeError, ValueError):
        return None


def validate_catalogue(payload):
    if not isinstance(payload, dict) or not valid_date(payload.get("syncedAt")):
        raise ValueError("Published catalogue has no valid sync date")
    products = payload.get("products")
    if not isinstance(products, list) or not products:
        raise ValueError("Published catalogue has no products")
    ids = [p.get("stableFolderId") or p.get("folderId") for p in products if isinstance(p, dict)]
    if len(ids) != len(products) or not all(isinstance(key, str) and key for key in ids) or len(set(ids)) != len(ids):
        raise ValueError("Published catalogue has invalid or duplicate identities")


def merge_dates(*ledgers):
    dates = {}
    for ledger in ledgers:
        if not isinstance(ledger, dict):
            raise ValueError("Invalid first-seen history")
        for key, value in ledger.items():
            if not isinstance(key, str) or not key or not valid_date(value):
                raise ValueError("Invalid first-seen history")
            if key not in dates or valid_date(value) < valid_date(dates[key]):
                dates[key] = value
    return dates


def catalogue_dates(payload):
    return {p.get("stableFolderId") or p["folderId"]: p["addedAt"]
            for p in payload.get("products", []) if p.get("addedAt")}


def prepare_baseline(published, recorded, ledger):
    validate_catalogue(published)
    validate_catalogue(recorded)
    # Never replace a newer checked-in baseline with an older publication.
    source = published if valid_date(published["syncedAt"]) >= valid_date(recorded["syncedAt"]) else recorded
    baseline = copy.deepcopy(source)
    dates = merge_dates(ledger, catalogue_dates(recorded), catalogue_dates(published))
    for product in baseline["products"]:
        key = product.get("stableFolderId") or product["folderId"]
        if key in dates:
            product["addedAt"] = dates[key]
    return baseline, dates


def download(name, optional=False):
    url = SITE + name + "?baseline=" + datetime.now(timezone.utc).strftime("%Y%m%d%H%M%S")
    for attempt in range(3):
        try:
            with urlopen(Request(url, headers={"User-Agent": "LucraInventoryBaseline/1.0"}), timeout=30) as response:
                data = response.read(8_000_001)
            if len(data) > 8_000_000:
                raise ValueError("Published baseline exceeds the expected size")
            return json.loads(data)
        except HTTPError as error:
            if optional and error.code == 404:
                return {"dates": {}}
            if attempt == 2:
                raise
        except (OSError, ValueError):
            if attempt == 2:
                raise


def main(root, previous_path=Path("/tmp/lucra-previous-inventory.json")):
    directory = root / "data"
    recorded = json.loads((directory / "inventory.json").read_text())
    seeds = json.loads((directory / "first_seen.json").read_text())["dates"]
    published = download("inventory.json")
    prior = download("first_seen.json", optional=published.get("firstSeenVersion") != 1)["dates"]
    baseline, dates = prepare_baseline(published, recorded, merge_dates(seeds, prior))
    (directory / "inventory.json").write_text(json.dumps(baseline, ensure_ascii=False, indent=2))
    (directory / "first_seen.json").write_text(json.dumps({"version": 1, "dates": dates}, indent=2))
    (directory / "sync_history.json").write_text(json.dumps({"runs": baseline.get("syncHistory", [])}, indent=2))
    if baseline.get("syncStatus"):
        (directory / "sync_status.json").write_text(json.dumps(baseline["syncStatus"], indent=2))
    previous_path.write_text(json.dumps(baseline, ensure_ascii=False))
    print(f'Restored {len(baseline["products"])} published bundles and {len(dates)} recorded arrival dates')


if __name__ == "__main__":
    main(Path(__file__).resolve().parents[1])
