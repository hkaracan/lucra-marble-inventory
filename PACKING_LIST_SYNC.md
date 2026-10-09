# Packing-list discovery

The regular public Drive folder page can omit files after its first 50 entries. When that listing is full, or a media folder has no visible packing list, the importer also reads Drive's public embedded folder listing. Results are combined by file ID, preserving existing media. The audited overflow manifest remains a final fallback.

Excel candidates are recognized by their extension or spreadsheet type, including code-only filenames and PL abbreviations. If a candidate fails to download or yields no readable rows, the importer tries the next candidate. Expanded-list failures are included in the sync warnings rather than silently claiming no spreadsheet exists.

A-prefix bundle codes are supported alongside K/L/M. A trailing Honed label belongs in finish details rather than the material name. Amazonite Honed A3238 is displayed as Amazonite with bundle code A3238; its packing list retains Bookmatched/Honed and supplies 49 slabs, 251.88 m², and seven dimension pairs.

Regression tests cover recovering an Excel file beyond 50 photos without hard-coded file IDs, duplicate suppression, visible fallback failures, separate name/code/finish, and unreadable-first/readable-second workbooks. Run `python -m unittest test_sync_drive` from the repository directory.

This remains a public-listing integration; if Google changes either HTML format or removes public access, sync warnings show the problem. It does not modify Drive files or sharing permissions.
