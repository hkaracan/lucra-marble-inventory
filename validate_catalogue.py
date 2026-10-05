#!/usr/bin/env python3
"""Validate the generated catalogue before it is published to GitHub Pages."""

from __future__ import annotations

import argparse
import json
from pathlib import Path


def read_json(path: Path) -> dict:
    try:
        value = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        raise SystemExit(f"Cannot read valid JSON from {path}: {exc}") from exc
    if not isinstance(value, dict):
        raise SystemExit(f"{path} must contain a JSON object")
    return value


def read_inventory_script(path: Path) -> dict:
    text = path.read_text(encoding="utf-8")
    if "=" not in text:
        raise SystemExit(f"{path} does not contain the generated inventory assignment")
    return json.loads(text.split("=", 1)[1].strip().rstrip(";"))


def validate_payload(payload: dict, label: str = "catalogue") -> list[str]:
    products = payload.get("products")
    if not isinstance(products, list) or not products:
        return [f"{label} contains no products"]

    problems: list[str] = []
    folder_ids = [str(product.get("folderId") or "") for product in products]
    missing_ids = [index + 1 for index, folder_id in enumerate(folder_ids) if not folder_id]
    if missing_ids:
        problems.append(f"{label} has products without folder IDs: {missing_ids[:5]}")
    duplicates = sorted({folder_id for folder_id in folder_ids if folder_id and folder_ids.count(folder_id) > 1})
    if duplicates:
        problems.append(f"{label} contains duplicate folder IDs: {duplicates[:5]}")

    codes = {str(product.get("code") or "").upper() for product in products}
    if payload.get("source", "").endswith("17u1Vo3es5lO07Z0__mfu5ugXCOaTkf4Z") and "L1014" not in codes:
        problems.append("required L1014 bundle is missing")

    for product in products:
        name = product.get("name") or product.get("folderName")
        if not name:
            problems.append("a product is missing both name and folder name")
        if not isinstance(product.get("images"), list) or not isinstance(product.get("extraImages"), list):
            problems.append(f"{name or 'Unknown product'} has an invalid media list")
        if not isinstance(product.get("lines"), list):
            problems.append(f"{name or 'Unknown product'} has an invalid packing-list line list")

    report = payload.get("report")
    if isinstance(report, dict) and report.get("bundles") not in (None, len(products)):
        problems.append("catalogue report bundle count does not match product count")
    return problems


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--inventory", type=Path, default=Path("data/inventory.json"))
    parser.add_argument("--script", type=Path, default=Path("data/inventory.js"))
    parser.add_argument("--previous", type=Path)
    parser.add_argument("--minimum-retention", type=float, default=0.8)
    args = parser.parse_args()

    payload = read_json(args.inventory)
    problems = validate_payload(payload)
    script_payload = read_inventory_script(args.script)
    problems.extend(validate_payload(script_payload, "inventory.js"))

    json_ids = {str(product.get("folderId") or "") for product in payload.get("products", [])}
    script_ids = {str(product.get("folderId") or "") for product in script_payload.get("products", [])}
    if json_ids != script_ids:
        problems.append("inventory.json and inventory.js contain different bundle IDs")

    if args.previous and args.previous.exists():
        previous = read_json(args.previous)
        previous_count = len(previous.get("products") or [])
        current_count = len(payload.get("products") or [])
        minimum_count = max(1, int(previous_count * args.minimum_retention))
        if previous_count and current_count < minimum_count:
            problems.append(
                f"bundle count dropped from {previous_count} to {current_count}; "
                f"minimum safe count is {minimum_count}"
            )

    if problems:
        raise SystemExit("Catalogue validation failed:\n- " + "\n- ".join(problems))
    print(f"Catalogue validation passed: {len(payload['products'])} bundles")


if __name__ == "__main__":
    main()
