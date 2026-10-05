# Lucra home-screen shortcut

Open https://inventory.lucramarble.com/ before adding the shortcut.

- iPhone/iPad: Safari → Share → Add to Home Screen → Add.
- Android: Chrome → More (⋮) → Add to home screen → Create shortcut → Add.

The shortcut uses the existing Lucra emblem on white, with the short name Lucra. Remove and re-add older shortcuts if their cached icon does not update.

Both index.html and classic.html link a 180×180 Apple touch icon and site.webmanifest, which declares 192×192 and 512×512 Android icons. Browser behavior is preserved; this does not add offline caching.

Validation: PNG dimensions match the metadata, the manifest parses, and both layouts link the assets. Check the latest Sync inventory Actions run and live asset URLs after deploying. Final icon rendering must be checked on a physical device.

To remove the icon update, revert merge commit 27278ab63b3c1c93e0cd934924e8cf25abe79fde with git revert -m 1, then push main. This preserves the responsive UI and inventory history.
