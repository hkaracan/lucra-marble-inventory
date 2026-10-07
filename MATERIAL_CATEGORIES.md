# Material categories

Customer-approved October 7, 2026: the 38 previously unclassified material names are Marble. Bianco Dolomite, Giallo Siena Dolomite and Sunset Dolomite are Dolomite; Silver Travertine Ham (Raw) and Travertine are Travertine; Velluto Onyx and Velluto Onyx Cross Cut are Onyx; Karmania Traonyx is Traonyx.

`material-categories.json` is the source of truth. It is separate from generated inventory data and is never rewritten by stock syncing. Assignments apply to every bundle with the canonical material name. Parent folder names are not used to guess the category.

To add or correct a material, edit its entry in `materials`, then run:

```
python3 tools/build_material_categories.py
python3 tools/build_material_categories.py --check
```

Publish the JSON and generated `ui/material-categories.js` together and update its cache version in `index.html`. Unknown material names remain visible under All and are flagged for review in Sales mode; they are never automatically assigned to Marble. Case and whitespace differences are normalized, and the existing Sunset Dlomite name alias is respected.

Category selection combines with the existing availability, search, dimensions and surface filters. Availability lives in Filters. Reset filters clears the category too. Personal category choices are remembered; opening a shared collection starts at All so the entire shared collection is visible.

The classic layout, inventory synchronization, quote/share/print actions and saved collection membership are unchanged. Revert the category feature's merge commit with `git revert -m 1 <merge-sha>` to undo the feature independently.
