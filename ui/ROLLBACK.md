# Responsive UI rollback

Pre-release commit: 5c48370c58f88ecbb18f4c23c21e5644e9beba8f
Backup branch: backup/ui-before-responsive-2026-10-05

Revert the responsive UI PR merge commit on main and push the revert. GitHub Actions republishes the prior UI. This keeps later inventory data and unrelated commits; do not force-reset main to the backup branch. The new ui/ files are additive and the original app.js, authentication, sync scripts, and data files are unchanged by this release.

The default Pages workflow performs a fresh Drive sync before deployment. If the sync service is unavailable, a UI revert may not deploy until that sync succeeds. The existing deployed catalogue remains live on workflow failure.

Immediate fallback: choose Previous layout from the header/Menu, or open /classic.html. This uses the same live catalogue, authentication, saved lists, and original app.js. The browser remembers that choice. Choose New layout on the classic page to return.
