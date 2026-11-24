import json
import os
import tempfile
import unittest
from datetime import datetime, timedelta, timezone
from pathlib import Path
from unittest.mock import patch

from tools.check_inventory_freshness import check_live, download_inventory, main, validate_inventory

NOW = datetime(2026, 11, 24, 16, tzinfo=timezone.utc)


def catalogue(hours_old=1):
    return {"syncedAt": (NOW - timedelta(hours=hours_old)).isoformat(),
            "products": [{"folderId": "one"}]}


class InventoryFreshnessTest(unittest.TestCase):
    def test_fresh_unchanged_inventory_is_healthy(self):
        self.assertIn("1 bundles", validate_inventory(catalogue(), now=NOW))
        validate_inventory(catalogue(24), now=NOW)

    def test_stale_empty_invalid_and_future_catalogues_fail(self):
        for payload in [catalogue(24.01), catalogue(-1), [], {},
                        {**catalogue(), "syncedAt": "bad"},
                        {**catalogue(), "syncedAt": "2026-11-24T15:00:00"},
                        {**catalogue(), "products": []},
                        {**catalogue(), "products": [None]},
                        {**catalogue(), "products": [{"folderId": "one"}] * 2},
                        {**catalogue(), "products": [{"folderId": []}]}]:
            with self.subTest(payload=payload), self.assertRaises(ValueError):
                validate_inventory(payload, now=NOW)

    def test_new_deployment_must_reach_public_catalogue(self):
        with self.assertRaisesRegex(ValueError, "previous catalogue"):
            validate_inventory(catalogue(2), now=NOW, expected_synced_at=catalogue(1)["syncedAt"])
        validate_inventory(catalogue(1), now=NOW, expected_synced_at=catalogue(1)["syncedAt"])
        validate_inventory(catalogue(0), now=NOW, expected_synced_at=catalogue(1)["syncedAt"])

    def test_retries_network_failure_and_old_deployment_until_recovered(self):
        fresh = {**catalogue(), "syncedAt": datetime.now(timezone.utc).isoformat()}
        with patch("tools.check_inventory_freshness.download_inventory",
                   side_effect=[OSError("unavailable"), catalogue(10000), fresh]) as fetch, \
                patch("tools.check_inventory_freshness.time.sleep") as sleep:
            self.assertIn("healthy", check_live())
            self.assertEqual(fetch.call_count, 3)
            self.assertEqual(sleep.call_count, 2)

    def test_unrecovered_failure_is_bounded(self):
        with patch("tools.check_inventory_freshness.download_inventory", side_effect=OSError("offline")) as fetch, \
                patch("tools.check_inventory_freshness.time.sleep") as sleep, self.assertRaises(OSError):
            check_live(attempts=2)
        self.assertEqual(fetch.call_count, 2)
        self.assertEqual(sleep.call_count, 1)

    def test_download_does_not_accept_oversized_response_and_bypasses_cache(self):
        with patch("tools.check_inventory_freshness.urlopen") as fetch:
            fetch.return_value.__enter__.return_value.read.return_value = b"x" * 8_000_001
            with self.assertRaisesRegex(ValueError, "size"):
                download_inventory()
            first = fetch.call_args.args[0].full_url
            with self.assertRaises(ValueError):
                download_inventory()
            self.assertNotEqual(first, fetch.call_args.args[0].full_url)

    def test_cli_failure_writes_actionable_summary_and_returns_nonzero(self):
        with tempfile.TemporaryDirectory() as directory:
            summary = Path(directory) / "summary.md"
            with patch.dict(os.environ, {"GITHUB_STEP_SUMMARY": str(summary)}), \
                    patch("tools.check_inventory_freshness.check_live", side_effect=ValueError("Inventory is stale")):
                self.assertEqual(main([]), 1)
            self.assertIn("needs attention", summary.read_text())
            self.assertIn("Sync inventory", summary.read_text())

    def test_cli_reads_expected_deployment_date(self):
        with tempfile.TemporaryDirectory() as directory:
            expected = Path(directory) / "inventory.json"
            expected.write_text(json.dumps(catalogue()))
            with patch.dict(os.environ, {"GITHUB_STEP_SUMMARY": ""}), \
                    patch("tools.check_inventory_freshness.check_live", return_value="Healthy") as check:
                self.assertEqual(main(["--expected-inventory", str(expected)]), 0)
            self.assertEqual(check.call_args.kwargs["expected_synced_at"], catalogue()["syncedAt"])


if __name__ == "__main__":
    unittest.main()
