"""Generate browser taxonomy from the independently maintained JSON mapping."""
import argparse
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--check', action='store_true', help='Validate without writing files')
args = parser.parse_args()
config = json.loads((ROOT / 'material-categories.json').read_text())
ids = [category['id'] for category in config['categories']]
if len(ids) != len(set(ids)) or 'all' in ids:
    raise SystemExit('Category IDs must be unique; All is the aggregate filter.')
names = set()
for name, category in config['materials'].items():
    normalized = ' '.join(name.casefold().split())
    if not normalized or normalized in names or category not in ids:
        raise SystemExit(f'Invalid or duplicate material assignment: {name}')
    names.add(normalized)
content = '// Generated from material-categories.json; independent of inventory sync.\nconst lucraMaterialCategories = ' + json.dumps(config, indent=2) + ';\n'
target = ROOT / 'ui/material-categories.js'
if args.check:
    if target.read_text() != content:
        raise SystemExit('Browser mapping is out of date. Run tools/build_material_categories.py.')
else:
    target.write_text(content)
print(f'Validated {len(names)} material assignments across {len(ids)} categories.')
