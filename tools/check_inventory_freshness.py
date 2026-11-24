"""Read-only check of the catalogue customers actually receive from Pages."""
from __future__ import annotations

import argparse
import json
import os
import time
import uuid
from datetime import datetime, timedelta, timezone
from pathlib import Path
from urllib.parse import urlencode
from urllib.request import Request, urlopen

SITE = "https://inventory.lucramarble.com/data/inventory.json"
MAX_BYTES = 8_000_000


def parse_timestamp(value):
    try:
        stamp = datetime.fromisoformat(value.replace("Z", "+00:00"))
        if stamp.tzinfo is None:
            raise ValueError("Timestamp has no timezone")
        return stamp.astimezone(timezone.utc)
    except (AttributeError, TypeError, ValueError) as error:
        raise ValueError("Catalogue has a missing or invalid syncedAt timestamp") from error


def validate_inventory(payload, *, now=None, max_age_hours=24, expected_synced_at=None):
    now = now or datetime.now(timezone.utc)
    if not isinstance(payload, dict):
        raise ValueError("Published catalogue is not a JSON object")
    stamp = parse_timestamp(payload.get("syncedAt"))
    age = now - stamp
    if age < -timedelta(minutes=5):
        raise ValueError("Published catalogue timestamp is unexpectedly in the future")
    if age > timedelta(hours=max_age_hours):
        raise ValueError(
            f"Inventory is stale: last published refresh {payload['syncedAt']} "
            f"({age.total_seconds() / 3600:.1f} hours ago; limit {max_age_hours} hours)"
        )
    products = payload.get("products")
    if not isinstance(products, list) or not products:
        raise ValueError("Published catalogue has no bundles")
    identities = [
        item.get("stableFolderId") or item.get("folderId")
        for item in products if isinstance(item, dict)
    ]
    if (len(identities) != len(products)
            or not all(isinstance(key, str) and key for key in identities)
            or len(set(identities)) != len(identities)):
        raise ValueError("Published catalogue contains invalid or duplicate bundle identities")
    if expected_synced_at is not None and stamp < parse_timestamp(expected_synced_at):
        raise ValueError("Pages is still serving the previous catalogue after deployment")
    return (
        f"Live inventory healthy: {len(products)} bundles; last refresh {payload['syncedAt']}; "
        f"age {max(0, age.total_seconds()) / 3600:.1f} hours (limit {max_age_hours} hours)."
    )


def download_inventory():
    # A different URL on every attempt avoids testing a cached earlier response.
    request = Request(SITE + "?" + urlencode({"health": uuid.uuid4().hex}), headers={
        "User-Agent": "LucraInventoryHealth/1.0",
        "Cache-Control": "no-cache",
    })
    with urlopen(request, timeout=20) as response:
        raw = response.read(MAX_BYTES + 1)
    if len(raw) > MAX_BYTES:
        raise ValueError("Published catalogue exceeds the expected size")
    return json.loads(raw)


def check_live(*, attempts=3, retry_delay=5, max_age_hours=24, expected_synced_at=None):
    for attempt in range(1, attempts + 1):
        try:
            return validate_inventory(download_inventory(), max_age_hours=max_age_hours,
                                      expected_synced_at=expected_synced_at)
        except (OSError, ValueError) as error:
            if attempt == attempts:
                raise
            print(f"Live inventory check {attempt}/{attempts}: {error}. Retrying.")
            time.sleep(retry_delay)


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--max-age-hours", type=int, default=24)
    parser.add_argument("--attempts", type=int, default=3)
    parser.add_argument("--retry-delay", type=int, default=5)
    parser.add_argument("--expected-inventory", type=Path)
    args = parser.parse_args(argv)
    if args.max_age_hours < 1 or args.attempts < 1 or args.retry_delay < 0:
        parser.error("Age and attempts must be positive; delay cannot be negative")
    try:
        expected = None
        if args.expected_inventory:
            expected = json.loads(args.expected_inventory.read_text(encoding="utf-8"))["syncedAt"]
            parse_timestamp(expected)
        message = check_live(attempts=args.attempts, retry_delay=args.retry_delay,
                             max_age_hours=args.max_age_hours, expected_synced_at=expected)
        status = 0
    except (OSError, ValueError, KeyError, TypeError) as error:
        message = f"Live inventory check failed: {error}"
        status = 1
    print(message)
    if summary := os.environ.get("GITHUB_STEP_SUMMARY"):
        with open(summary, "a", encoding="utf-8") as handle:
            handle.write(f"## Live inventory {'needs attention' if status else 'health'}\n\n{message}\n")
            if status:
                handle.write("\nCheck the latest **Sync inventory** run and the Pages deployment. "
                             "This monitor only reads the live catalogue; it does not change stock.\n")
    return status


if __name__ == "__main__":
    raise SystemExit(main())
