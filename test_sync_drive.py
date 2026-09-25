from __future__ import annotations

import io
import json
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

from openpyxl import Workbook

import sync_drive


def packing_list_bytes() -> bytes:
    workbook = Workbook()
    sheet = workbook.active
    sheet.append(["Block Number", "Finish", "Material", "Width", "Height", "Pcs", "Sqm"])
    sheet.append(["L101401", "Honed", "Rosso Levanto", 160, 320, 4, 20.48])
    output = io.BytesIO()
    workbook.save(output)
    return output.getvalue()


def workbook_bytes(rows: list[list]) -> bytes:
    workbook = Workbook()
    sheet = workbook.active
    for row in rows:
        sheet.append(row)
    output = io.BytesIO()
    workbook.save(output)
    return output.getvalue()


class MockedSyncTest(unittest.TestCase):
    def test_no_packing_list_bundle_folders_are_valid_bundle_folders(self):
        self.assertTrue(sync_drive.is_bundle_folder("Rosso Levanto K6222"))
        self.assertTrue(sync_drive.is_bundle_folder("Vanilla Ice K5372"))
        self.assertTrue(sync_drive.is_bundle_folder("Reserved - Vanilla Ice K5372"))
        self.assertTrue(sync_drive.is_bundle_folder("Rosso Levanto L1014"))
        self.assertTrue(sync_drive.is_bundle_folder("K6170"))

    def test_code_only_bundle_folder_is_named_from_its_packing_list(self):
        tree = {
            "root": [{"id": "k6170", "name": "K6170"}],
            "k6170": [
                {"id": "packing", "name": "K6170 Packing List.xlsx"},
                {"id": "photo-1", "name": "1.jpg"},
            ],
        }

        def fake_folder_items(folder_id, timeout=35, attempts=3):
            return tree.get(folder_id, [])

        fake_folder_items.cache_clear = lambda: None
        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory) / "data" / "inventory.json"
            with patch.object(sync_drive, "OUTPUT", output), patch.object(sync_drive, "folder_items", fake_folder_items), patch.object(
                sync_drive, "download_file", return_value=workbook_bytes(
                    [
                        ["Block Number", "Material", "Width", "Height", "Pcs"],
                        ["K617001", "Nimbus", 170, 300, 2],
                    ]
                )
            ):
                payload = sync_drive.sync_inventory("root")

        product = payload["products"][0]
        self.assertEqual(product["code"], "K6170")
        self.assertEqual(product["name"], "Nimbus")
        self.assertEqual(product["pcs"], 2)
        self.assertEqual(product["folderName"], "K6170")

    def test_code_only_excel_names_are_packing_lists_and_area_can_be_derived(self):
        parsed = sync_drive.parse_packing_list(
            workbook_bytes(
                [
                    ["Block Number", "Material", "Width", "Height", "Pcs"],
                    ["K537201", "Vanilla Ice", 160, 320, 4],
                    ["K537202", "Vanilla Ice", 165, 325, 2],
                ]
            )
        )

        self.assertTrue(sync_drive.is_packing_list_item({"name": "K5372.xlsx", "kind": "unknown"}))
        self.assertEqual(parsed["totalPcs"], 6)
        self.assertEqual(parsed["totalSqm"], 31.21)
        self.assertEqual(parsed["lines"][0]["sqm"], 20.48)

    def test_surface_types_are_normalized_to_english(self):
        parsed = sync_drive.parse_packing_list(
            workbook_bytes(
                [
                    ["Block Number", "Surface", "Material", "Width", "Height", "Pcs", "Sqm"],
                    ["K900001", "CİLALI & DERİ", "Sample Stone", 160, 320, 2, 10.24],
                    ["K900002", "Ham", "Sample Stone", 165, 325, 1, 5.36],
                ]
            )
        )

        self.assertEqual(parsed["lines"][0]["finish"], "CİLALI & DERİ")
        self.assertEqual(parsed["lines"][0]["surfaceType"], "Polished · Leather")
        self.assertEqual(parsed["lines"][1]["surfaceType"], "Raw")

        with patch.object(
            sync_drive,
            "download_file",
            return_value=packing_list_bytes(),
        ):
            product = sync_drive.normalize_folder(
                {
                    "id": "surface-product",
                    "name": "Sample Stone K9000",
                    "_items": [{"id": "packing", "name": "Packing List K9000.xlsx"}],
                }
            )
        self.assertEqual(product["surfaceTypes"], ["Honed"])

    def test_added_at_is_preserved_and_new_bundles_receive_a_first_seen_date(self):
        tree = {
            "root": [
                {"id": "old", "name": "Old Stone K1000"},
                {"id": "new", "name": "New Stone K2000"},
            ],
            "old": [{"id": "old-packing", "name": "Packing List K1000.xlsx"}],
            "new": [{"id": "new-packing", "name": "Packing List K2000.xlsx"}],
        }

        def fake_folder_items(folder_id, timeout=35, attempts=3):
            return tree.get(folder_id, [])

        fake_folder_items.cache_clear = lambda: None
        previous = {
            "products": [
                {
                    "folderId": "old",
                    "folderName": "Old Stone K1000",
                    "name": "Old Stone",
                    "code": "K1000",
                    "addedAt": "2026-09-01T12:00:00Z",
                }
            ],
            "errors": [],
            "warnings": [],
        }

        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory) / "data" / "inventory.json"
            output.parent.mkdir(parents=True)
            output.write_text(json.dumps(previous), encoding="utf-8")
            with patch.object(sync_drive, "OUTPUT", output), patch.object(sync_drive, "folder_items", fake_folder_items), patch.object(
                sync_drive, "download_file", return_value=packing_list_bytes()
            ):
                payload = sync_drive.sync_inventory("root")

            old = next(product for product in payload["products"] if product["code"] == "K1000")
            new = next(product for product in payload["products"] if product["code"] == "K2000")
            history_path = output.with_name("sync_history.json")
            status_path = output.with_name("sync_status.json")
            self.assertEqual(old["addedAt"], "2026-09-01T12:00:00Z")
            self.assertRegex(new["addedAt"], r"^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$")
            self.assertEqual(payload["syncHistory"][0]["status"], "success")
            self.assertEqual(payload["syncHistory"][0]["added"], 1)
            self.assertTrue(history_path.exists())
            self.assertTrue(status_path.exists())
            self.assertEqual(
                json.loads(history_path.read_text(encoding="utf-8"))["runs"][0]["updated"],
                payload["report"]["updated"],
            )
            self.assertEqual(json.loads(status_path.read_text(encoding="utf-8"))["status"], "success")

    def test_packing_list_variants_provide_totals_and_dimensions(self):
        bruno = sync_drive.parse_packing_list(
            workbook_bytes(
                [
                    [None, "BUNDLE NO", "PRODUCT", "THICKNESS", "HEIGHT", "LENGTH", "PCS", "SQM", "TOTAL SQM"],
                    [None, "K6029004", "BRUNO PERLA", "2 CM", 164, 285, 6, 28.04, 56.06],
                    [None, None, None, None, 165, 283, 6, 28.02, None],
                    [None, None, None, None, None, None, 37, 172.91, 172.91],
                ]
            )
        )
        terranova = sync_drive.parse_packing_list(
            workbook_bytes(
                [
                    [None, "BUNDLE NO", "MATERIAL NAME", "THICKNESS", "HEIGHT", "LENGHT", "PCS", "SQM", "BUNDLE SQM"],
                    [None, "K6044001", "TERRANOVA", "2 CM", 165, 295, 3, 14.60, 49.62],
                    [None, None, None, None, 169, 296, 7, 35.02, None],
                    [None, None, None, None, None, None, 30, 149.66, 149.66],
                ]
            )
        )
        flinders = sync_drive.parse_packing_list(
            workbook_bytes(
                [
                    [],
                    [],
                    [None, "K31670102", "BOOKMATCHED/HONED", "Flinders White", 192, 278, 8, 42.70, 53.38],
                    [None, None, "BOOKMATCHED/HONED", "Flinders White", 192, 278, 2, 10.68, None],
                    [None, None, None, None, None, None, 10, 53.38, None],
                ]
            )
        )
        merged_dimensions = sync_drive.parse_packing_list(
            workbook_bytes(
                [
                    [],
                    [None, "Block Number", "Material Name", None, "Dimensions", None, "Pcs", "Sqm", "Bundle Sqm"],
                    [None, "K29700402", "Bookmatched-Polished", "Alaskan Blue", 195, 295, 7, 40.27, 51.53],
                    [None, None, "Bookmatched-Polished", "Alaskan Blue", 195, 295, 1, 5.75, None],
                    [None, None, None, None, 190, 290, 1, 5.51, None],
                ]
            )
        )
        vanilla = sync_drive.parse_packing_list(
            workbook_bytes(
                [
                    [None, "No", "DESCRIPTION OF GOODS", "Block Ref.", "SURFACE", "NET SIZES (cm)", None, None, "PCS", "SLABS NO", "QTY (SQM)", "Bandıl Sqm"],
                    [None, None, None, None, None, "T", "W", "L", None, None, None, None],
                    [None, "1.", "VANILLA", "K6130", "HONED & BOOKMATCHED", 2, 170, 260, 2, "1 - 2", 8.84, 55.571],
                    [None, None, None, None, None, 2, 180, 270, 1, "3", 4.86, None],
                    [None, None, None, None, None, 2, 190, 270, 3, "4 - 5 - 6", 15.39, None],
                    [None, None, None, None, None, 2, 194, 273, 5, "7 - 8 - 9 - 10 - 11", 26.481, None],
                    [None, "2.", "VANILLA", "K6130", "HONED & BOOKMATCHED", 2, 194, 275, 3, "12 - 13 - 14", 16.005, 58.685],
                    [None, None, None, None, None, 2, 194, 275, 8, "15 - 22", 42.68, None],
                ]
            )
        )

        self.assertEqual((bruno["totalPcs"], bruno["totalSqm"]), (12, 56.06))
        self.assertEqual(bruno["lines"][1]["widthCm"], 165)
        self.assertEqual((terranova["totalPcs"], terranova["totalSqm"]), (10, 49.62))
        self.assertEqual(terranova["lines"][0]["widthCm"], 165)
        self.assertEqual(terranova["lines"][0]["heightCm"], 295)
        self.assertEqual((flinders["totalPcs"], flinders["totalSqm"]), (10, 53.38))
        self.assertEqual(flinders["lines"][0]["material"], "Flinders White")
        self.assertEqual((merged_dimensions["totalPcs"], merged_dimensions["totalSqm"]), (9, 51.53))
        self.assertEqual(merged_dimensions["lines"][0]["finish"], "Bookmatched-Polished")
        self.assertEqual(merged_dimensions["lines"][0]["surfaceType"], "Bookmatched · Polished")
        self.assertEqual(merged_dimensions["lines"][0]["material"], "Alaskan Blue")
        self.assertEqual(merged_dimensions["lines"][0]["widthCm"], 195)
        self.assertEqual((vanilla["totalPcs"], vanilla["totalSqm"]), (22, 114.26))
        self.assertIn("170 × 260 cm", {f'{line["widthCm"]} × {line["heightCm"]} cm' for line in vanilla["lines"]})

    def test_nested_extra_image_labels_are_compact_numbers(self):
        def fake_folder_items(folder_id, timeout=35, attempts=3):
            return [
                {"id": "image-1", "name": "1.jpg"},
                {"id": "image-2", "name": "2.jpg"},
                {"id": "bookmatch-1", "name": "Bookmatch 1.jpg"},
            ]

        with patch.object(sync_drive, "folder_items", fake_folder_items):
            slabs, extras, *_ = sync_drive.collect_media([{"id": "nested", "name": "Tundra Grey K900"}])

        self.assertEqual([image["number"] for image in slabs], [1, 2])
        self.assertEqual([image["label"] for image in extras], ["3"])

    def test_product_thumbnail_prefers_named_photo_over_slab_five(self):
        product = sync_drive.normalize_folder(
            {
                "id": "thumbnail-product",
                "name": "Thumbnail Stone K9000",
                "_items": [
                    {"id": f"slab-{number}", "name": f"{number}.jpg"}
                    for number in range(1, 7)
                ]
                + [{"id": "cover", "name": "COVER.jpg"}],
            }
        )

        self.assertEqual(product["thumbnailFileId"], "cover")
        self.assertEqual(product["thumbnailSource"], "named")

    def test_product_thumbnail_falls_back_to_slab_five(self):
        product = sync_drive.normalize_folder(
            {
                "id": "slab-five-product",
                "name": "Numbered Stone K9001",
                "_items": [
                    {"id": f"slab-{number}", "name": f"{number}.jpg"}
                    for number in range(1, 7)
                ],
            }
        )

        self.assertEqual(product["thumbnailFileId"], "slab-5")
        self.assertEqual(product["thumbnailLabel"], "5")
        self.assertEqual(product["thumbnailSource"], "nearest-slab-5")

    def test_product_thumbnail_prefers_the_nearest_available_slab_at_or_after_five(self):
        selected, source = sync_drive.select_thumbnail_image(
            [
                {"number": 1, "label": "1", "fileId": "slab-1"},
                {"number": 4, "label": "4", "fileId": "slab-4"},
                {"number": 6, "label": "6", "fileId": "slab-6"},
                {"number": 12, "label": "12", "fileId": "slab-12"},
            ],
            [],
        )

        self.assertEqual(selected["fileId"], "slab-6")
        self.assertEqual(source, "nearest-slab-5")

    def test_product_thumbnail_uses_nearest_lower_slab_when_no_later_slab_exists(self):
        selected, source = sync_drive.select_thumbnail_image(
            [
                {"number": 1, "label": "1", "fileId": "slab-1"},
                {"number": 4, "label": "4", "fileId": "slab-4"},
            ],
            [],
        )

        self.assertEqual(selected["fileId"], "slab-4")
        self.assertEqual(source, "nearest-slab-5")

    def test_mystic_grey_image_labels_use_the_trailing_sequence_number(self):
        product = sync_drive.normalize_folder(
            {
                "id": "mystic-grey",
                "name": "Mystic Grey M2880",
                "_items": [
                    {"id": "image-1", "name": "M(2880)00000001.jpg"},
                    {"id": "image-2", "name": "M(2880)00000010.jpg"},
                    {"id": "image-3", "name": "M(2880)00000042.jpg"},
                ],
            }
        )

        self.assertEqual([image["label"] for image in product["images"]], ["1", "10", "42"])
        self.assertEqual(product["extraImages"], [])

    def test_mystic_grey_packing_list_and_images_match_44_slabs(self):
        rows = [
            ["Block Number", "PLAKA NO.", "Material Name", None, "Dimensions", None, "Pcs", "Sqm", "Bundle Pcs", "Bundle Sqm"],
        ]
        rows.extend(
            [f"M2880-{((number - 1) // 11) + 1:02d}", number, "Bookmatched/Polished", "Mystic Grey", 198, 313, 1, 271.76 / 44, None, None]
            for number in range(1, 45)
        )
        rows.append(["TOPLAM", None, None, None, None, None, 44, 271.76, 44, 271.76])
        image_items = [
            {"id": f"photo-{number}", "name": f"M(2880){number:08d}.jpg"}
            for number in range(1, 45)
            if number not in {7, 37}
        ]
        folder = {
            "id": "mystic-grey",
            "name": "Mystic Grey M2880",
            "_items": [{"id": "packing", "name": "Mystic Grey M2880 Packing List.xlsx"}, *image_items],
        }

        with patch.object(sync_drive, "download_file", return_value=workbook_bytes(rows)):
            product = sync_drive.normalize_folder(folder)

        self.assertEqual(product["pcs"], 44)
        self.assertEqual(product["sqm"], 271.76)
        self.assertEqual(len(product["images"]), 42)
        self.assertEqual(product["extraImages"], [])
        self.assertEqual(product["photoCheck"]["missingNumbers"], [7, 37])
        self.assertTrue(product["photoCheck"]["countMismatch"])

    def test_nested_bundle_folder_can_supply_packing_list_and_images(self):
        def fake_folder_items(folder_id, timeout=35, attempts=3):
            return [
                {"id": "packing", "name": "Packing List K900 Tundra Grey.xlsx"},
                {"id": "slab-1", "name": "1.jpg"},
                {"id": "slab-2", "name": "2.jpg"},
            ]

        with patch.object(sync_drive, "folder_items", fake_folder_items), patch.object(
            sync_drive, "download_file", return_value=packing_list_bytes()
        ):
            slabs, extras, _, packing, packing_name, packing_file_id, skipped = sync_drive.collect_media(
                [{"id": "nested", "name": "Tundra Grey K900"}]
            )

        self.assertEqual(packing_name, "Packing List K900 Tundra Grey.xlsx")
        self.assertEqual(packing_file_id, "packing")
        self.assertEqual(packing["totalPcs"], 4)
        self.assertEqual(extras, [])
        self.assertEqual([image["label"] for image in slabs], ["1", "2"])
        self.assertEqual([image["number"] for image in slabs], [1, 2])
        self.assertEqual(skipped, [])

    def test_l1014_survives_slow_nested_photo_folder_and_reserved_name_is_clean(self):
        tree = {
            "root": [
                {"id": "l1014", "name": "Rosso Levanto L1014"},
                {"id": "tundra-group", "name": "Tundra Grey"},
                {"id": "rosso-k6222", "name": "Rosso Levanto K6222"},
                {"id": "vanilla-k5372", "name": "Vanilla Ice K5372"},
            ],
            "l1014": [
                {"id": "l1014-direct-photo-3", "name": "3", "kind": "image"},
                {"id": "packing", "name": "Packing List L1014.xlsx"},
                {"id": "slow-photo-folder", "name": "1"},
                {"id": "working-photo-folder", "name": "2"},
            ],
            "working-photo-folder": [{"id": "l1014-photo-2", "name": "IMG_0002.HEIC"}],
            "tundra-group": [{"id": "reserved-tundra", "name": "Reserved - Tundra Light K6138"}],
            "reserved-tundra": [
                {"id": "tundra-photo", "name": "1.jpg"},
                {"id": "reserved-packing", "name": "Packing List K6138.xlsx"},
            ],
            "rosso-k6222": [{"id": "rosso-photo", "name": "IMG_9053.HEIC"}],
            "vanilla-k5372": [{"id": "vanilla-photo", "name": "1.jpg"}],
        }
        calls = []

        def fake_folder_items(folder_id, timeout=35, attempts=3):
            calls.append((folder_id, timeout, attempts))
            if folder_id == "slow-photo-folder":
                raise TimeoutError("simulated nested Drive timeout")
            return tree.get(folder_id, [])

        fake_folder_items.cache_clear = lambda: None

        script_content = ""
        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory) / "data" / "inventory.json"
            with patch.object(sync_drive, "OUTPUT", output), patch.object(sync_drive, "folder_items", fake_folder_items), patch.object(
                sync_drive, "download_file", return_value=packing_list_bytes()
            ):
                payload = sync_drive.sync_inventory("root")
            script_content = output.with_name("inventory.js").read_text(encoding="utf-8")

        l1014 = next(product for product in payload["products"] if product["code"] == "L1014")
        reserved = next(product for product in payload["products"] if product["code"] == "K6138")
        rosso = next(product for product in payload["products"] if product["code"] == "K6222")
        vanilla = next(product for product in payload["products"] if product["code"] == "K5372")
        self.assertEqual(l1014["folderName"], "Rosso Levanto L1014")
        self.assertEqual(l1014["packingList"], "Packing List L1014.xlsx")
        self.assertEqual(l1014["packingListId"], "packing")
        self.assertEqual(l1014["pcs"], 4)
        self.assertEqual([image["number"] for image in l1014["images"]], [2, 3])
        self.assertEqual(l1014["skippedPhotoFolders"][0]["name"], "1")
        self.assertTrue(l1014["photoCheck"]["countMismatch"])
        self.assertEqual(l1014["photoCheck"]["missingNumbers"], [])
        self.assertTrue(any(warning["photoFolder"] == "1" for warning in payload["warnings"]))
        self.assertEqual(reserved["name"], "Tundra Light")
        self.assertTrue(reserved["reserved"])
        self.assertEqual(reserved["groupName"], "Tundra Grey")
        self.assertIsNone(rosso["packingList"])
        self.assertEqual(rosso["pcs"], 1)
        self.assertEqual([image["label"] for image in rosso["images"]], ["1"])
        self.assertIsNone(vanilla["packingList"])
        self.assertEqual(vanilla["pcs"], 1)
        self.assertEqual(payload["report"]["missingPackingLists"], 2)
        self.assertIn(("slow-photo-folder", sync_drive.NESTED_FOLDER_TIMEOUT, sync_drive.NESTED_FOLDER_ATTEMPTS), calls)
        self.assertIn("window.LUCRA_INVENTORY", script_content)
        self.assertIn("Rosso Levanto L1014", script_content)
        self.assertEqual(payload["report"]["bundles"], 4)
        self.assertEqual(payload["report"]["added"], 4)
        self.assertEqual(payload["report"]["skippedPhotoFolders"], 1)

    def test_failed_l1014_refresh_keeps_previous_catalogue(self):
        tree = {"root": [{"id": "l1014", "name": "Rosso Levanto L1014"}]}

        def fake_folder_items(folder_id, timeout=35, attempts=3):
            if folder_id == "l1014":
                raise TimeoutError("simulated L1014 listing timeout")
            return tree.get(folder_id, [])

        fake_folder_items.cache_clear = lambda: None
        previous = {
            "products": [{"folderId": "l1014", "folderName": "Rosso Levanto L1014", "name": "Rosso Levanto", "code": "L1014"}],
            "errors": [],
            "warnings": [],
        }

        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory) / "data" / "inventory.json"
            output.parent.mkdir(parents=True)
            output.write_text(json.dumps(previous), encoding="utf-8")
            with patch.object(sync_drive, "OUTPUT", output), patch.object(sync_drive, "folder_items", fake_folder_items):
                payload = sync_drive.sync_inventory("root")

        self.assertEqual([product["code"] for product in payload["products"]], ["L1014"])
        self.assertTrue(payload["errors"])

    def test_source_code_mismatch_is_reported_without_changing_the_folder_code(self):
        folder = {
            "id": "red-travertine",
            "name": "Red Travertine K5094",
            "_items": [{"id": "packing", "name": "K5480 Packing List.xlsx"}],
        }

        with patch.object(sync_drive, "download_file", return_value=packing_list_bytes()):
            product = sync_drive.normalize_folder(folder)

        self.assertEqual(product["code"], "K5094")
        self.assertEqual(len(product["sourceWarnings"]), 1)
        self.assertEqual(product["sourceWarnings"][0]["packingCodes"], ["K5480"])
        self.assertIn("K5094", product["sourceWarnings"][0]["message"])

    def test_known_nebula_alias_uses_packing_code_and_clean_name(self):
        folder = {
            "id": "nebula-wave",
            "name": "NebuLa Wave L009",
            "_items": [{"id": "packing", "name": "Packing List L1009.xlsx"}],
        }

        with patch.object(sync_drive, "download_file", return_value=packing_list_bytes()):
            product = sync_drive.normalize_folder(folder)

        self.assertEqual(product["name"], "Nebula Wave")
        self.assertEqual(product["code"], "L1009")
        self.assertEqual(product["sourceWarnings"], [])
        self.assertEqual(sync_drive.canonical_display_name("Sunset Dlomite"), "Sunset Dolomite")


if __name__ == "__main__":
    unittest.main()
