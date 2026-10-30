import copy
import unittest
import json
import tempfile
from pathlib import Path
from unittest.mock import patch
from tools.restore_published_inventory import main
from tools.restore_published_inventory import prepare_baseline


def catalogue(date, records):
    return {"syncedAt": date, "products": records}


class PublishedBaselineTest(unittest.TestCase):
    def test_stateless_runs_preserve_first_date_and_removed_bundle_history(self):
        recorded = catalogue("2026-09-01T00:00:00Z", [{"folderId": "old"}])
        published = catalogue("2026-10-26T00:00:00Z", [{"folderId": "new", "addedAt": "2026-10-26T00:00:00Z"}])
        original = copy.deepcopy(published)
        baseline, ledger = prepare_baseline(published, recorded, {"removed": "2026-09-01T00:00:00Z"})
        published_next = catalogue("2026-10-30T00:00:00Z", baseline["products"])
        second, ledger = prepare_baseline(published_next, recorded, ledger)
        self.assertEqual(second["products"][0]["addedAt"], "2026-10-26T00:00:00Z")
        self.assertIn("removed", ledger)
        self.assertEqual(published, original)

    def test_recovery_uses_earliest_evidence_and_stable_identity(self):
        checked = catalogue("2026-09-01T00:00:00Z", [{"folderId": "old", "addedAt": "2026-09-01T00:00:00Z"}])
        live = catalogue("2026-10-26T00:00:00Z", [{"folderId": "moved", "stableFolderId": "old", "addedAt": "2026-10-26T00:00:00Z"}, {"folderId": "undated"}])
        baseline, dates = prepare_baseline(live, checked, {})
        self.assertEqual(baseline["products"][0]["addedAt"], "2026-09-01T00:00:00Z")
        self.assertNotIn("addedAt", baseline["products"][1])

    def test_invalid_or_older_publication_cannot_replace_newer_checked_data(self):
        checked = catalogue("2026-10-26T00:00:00Z", [{"folderId": "new"}])
        old = catalogue("2026-09-01T00:00:00Z", [{"folderId": "old"}])
        baseline, _ = prepare_baseline(old, checked, {})
        self.assertEqual(baseline["products"][0]["folderId"], "new")
        for bad in [{}, catalogue("bad", [{"folderId": "one"}]), catalogue("2026-09-01T00:00:00Z", []), catalogue("2026-09-01T00:00:00Z", [{"folderId": "one"}, {"folderId": "one"}])]:
            with self.subTest(bad=bad), self.assertRaises(ValueError):
                prepare_baseline(bad, checked, {})
        with self.assertRaises(ValueError):
            prepare_baseline(old, checked, {"one": "bad-date"})

    def test_missing_ledger_is_optional_only_before_first_ledger_publication(self):
        for version, optional in [(None, True), (1, False)]:
            with self.subTest(version=version), tempfile.TemporaryDirectory() as directory:
                root = Path(directory)
                (root / "data").mkdir()
                payload = catalogue("2026-10-26T00:00:00Z", [{"folderId": "old"}])
                if version:
                    payload["firstSeenVersion"] = version
                (root / "data/inventory.json").write_text(json.dumps(payload))
                (root / "data/first_seen.json").write_text('{"version":1,"dates":{}}')
                with patch("tools.restore_published_inventory.download", side_effect=[payload, {"dates": {}}]) as fetch:
                    main(root, root / "previous.json")
                self.assertEqual(fetch.call_args_list[1].kwargs, {"optional": optional})
                self.assertTrue((root / "previous.json").exists())
