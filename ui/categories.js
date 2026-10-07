/* Material taxonomy is maintained separately from generated stock data. */
(() => {
  const taxonomy = lucraMaterialCategories;
  const normalize = value => canonicalProductName(value).toLocaleLowerCase().replace(/\s+/g, ' ').trim();
  const assignments = new Map(Object.entries(taxonomy.materials).map(([name, category]) => [normalize(name), category]));
  const labels = new Map(taxonomy.categories.map(category => [category.id, category.label]));
  const storageKey = 'lucraMaterialCategory';
  let selected = 'all';
  try { const saved = localStorage.getItem(storageKey); if (!sharedCollectionActive && labels.has(saved)) selected = saved; } catch {}
  const categoryOf = product => assignments.get(normalize(product.name)) || null;
  window.lucraMatchesMaterialCategory = product => selected === 'all' || categoryOf(product) === selected;
  const remember = () => {try {localStorage.setItem(storageKey, selected);} catch {}};
  const bar = document.createElement('div');
  bar.className = 'preview-material-categories';
  bar.setAttribute('role', 'group');
  bar.setAttribute('aria-label', 'Material categories');
  for (const category of [{id:'all', label:'All'}, ...taxonomy.categories]) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'preview-material-category';
    button.dataset.category = category.id;
    button.textContent = category.label;
    button.setAttribute('aria-pressed', String(category.id === selected));
    button.addEventListener('click', () => {
      selected = category.id;
      remember();
      render();
      button.scrollIntoView({block:'nearest', inline:'nearest'});
    });
    bar.append(button);
  }
  const statuses = document.querySelector('#inventoryFilters');
  statuses.before(bar);
  const availability = document.createElement('div');
  availability.className = 'preview-desktop-availability';
  document.querySelector('#advancedFilters').prepend(availability);
  availability.append(statuses);
  const review = document.createElement('p');
  review.className = 'sales-only preview-category-review';
  bar.after(review);
  const originalFilter = filteredProducts;
  filteredProducts = function() { return originalFilter().filter(window.lucraMatchesMaterialCategory); };
  const originalEntries = activeFilterEntries;
  activeFilterEntries = function() {
    const entries = originalEntries();
    if (selected !== 'all') entries.unshift({key:'material-category', label:`Material: ${labels.get(selected)}`});
    return entries;
  };
  const originalClear = clearSingleFilter;
  clearSingleFilter = function(key) {
    if (key === 'material-category') { selected = 'all'; remember(); render(); }
    else originalClear(key);
  };
  const originalReset = resetAllFilters;
  resetAllFilters = function() { selected = 'all'; remember(); return originalReset(); };
  const originalRender = render;
  render = function(...args) {
    bar.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.category === selected)));
    const unmatched = [...new Set(products.filter(product => !categoryOf(product)).map(product => product.name))];
    review.hidden = unmatched.length === 0;
    review.textContent = unmatched.length ? `Material category needed: ${unmatched.join(', ')}. These bundles remain visible under All.` : '';
    return originalRender(...args);
  };
  if (products.length) render();
})();
