# Lucra Marble Inventory

Responsive catalogue MVP based on Lucra Marble's Google Drive folder and per-bundle packing-list workflow.

## Preview locally

```bash
python3 -m pip install -r requirements.txt
python3 server.py
```

Then open `http://localhost:4173`.

You can also open `index.html` directly from this folder. Direct HTML mode shows the latest locally generated inventory snapshot and public Drive thumbnails; use the Python server when you want to run a fresh manual Drive sync.

The public website is available at [hkaracan.github.io/lucra-marble-inventory](https://hkaracan.github.io/lucra-marble-inventory/). Because GitHub Pages is a static host, its **Sync via GitHub Actions** button opens the manual workflow instead of running the local Python API.

## Current scope

- Real current Drive folder names and bundle IDs
- Search and available/reserved filters
- Reserved bundles visible in both modes
- Presentation/Sales mode switch
- Sales dashboard with all products, stock totals, source links, and packing-list completeness
- Sales shortlist with comparison, customer-ready WhatsApp sharing, printable sheets, and CSV export
- Optional hiding of bundles without packing lists
- Responsive catalogue and product modal
- Wide, horizontal slab-first product cards
- Image-first fullscreen gallery with overlaid slab numbers, previous/next controls, zoom-and-pan, and keyboard navigation
- HEIC/camera-photo support, including sequential labels for bundles without numbered filenames
- Denizli, Türkiye inventory location
- Real K5809 packing-list totals and representative slab photography
- Designed data adapter boundary for Google Drive API and XLSX parsing
- Manual public-folder sync with no Google credentials

## Synchronize

Run `python3 sync_drive.py`, or switch to Sales Mode and press **Sync from Drive**. The synchronizer reads every public product folder (including bundle folders nested under group folders), finds packing-list workbooks at the bundle root or inside nested bundle folders, identifies numbered/HEIC slab photographs and supplementary media, and generates `data/inventory.json`. Google’s anonymous folder HTML currently returns only 50 children for larger public folders, so `data/drive_overflow.json` is a read-only continuation cache of public file IDs; workbook bytes and thumbnails are still fetched live from Drive. Public Drive markup is not a documented API, so Google interface changes may require a parser update later.

To refresh the live website, open the repository’s **Actions** tab, select **Sync inventory**, choose **Run workflow**, and confirm. The workflow runs the same read-only synchronizer, commits the refreshed catalogue files, and GitHub Pages publishes the new snapshot automatically. The workflow summary reports added, updated, unchanged, missing-list, missing-image, skipped-photo-folder, and folder-error counts. A failed sync does not replace the previous catalogue.

Sales Mode has a deliberately simple demonstration gate using `lucra123`. This is only a client-side visibility gate for the prototype; it is not a security boundary. Real protection would require server-side authentication.

Safety controls include read-only requests, three-request concurrency, spacing between requests, bounded retries with backoff, time-limited optional nested-photo lookups, individual folder error isolation, a one-minute manual-sync cooldown, single-sync locking, local image caching, and atomic inventory replacement. L1014 is validated as a required bundle and its packing-list record is retained if a refresh cannot read the folder. A failed refresh preserves the previous successful catalogue, while optional photo-folder skips and packing-list warnings are included in the Sales Mode sync feedback.

## Live integration

The production data adapter will enumerate the configured Drive root folder, parse each packing-list workbook layout it encounters, identify numbered slab photographs and supplementary bookmatch/zoom/backlit/video media, and cache normalized bundle records. Sales Mode marks each bundle as connected, file found, or missing so a salesperson can see which records need attention.
