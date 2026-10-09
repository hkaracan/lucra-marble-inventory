/* Customer enquiries and freshness feedback reuse the original app actions. */
(() => {
  const footer = document.querySelector('body > footer > span');
  const time = document.createElement('time');
  footer.replaceChildren(time);
  function updateFooter() {
    const valid = syncedAt && Number.isFinite(Date.parse(syncedAt));
    time.textContent = valid ? `${t('lastUpdated')}: ${syncDateLabel(syncedAt)}` : 'Last update unavailable';
    if (valid) time.dateTime = new Date(syncedAt).toISOString();
    else time.removeAttribute('datetime');
  }
  const originalRender = render;
  render = function(...args) { const result = originalRender(...args); updateFooter(); return result; };
  updateFooter();

  const quote = document.querySelector('#shortlistQuoteDialog');
  const email = document.querySelector('#quoteEmail');
  const phone = document.querySelector('#quotePhone');
  email.required = false;
  phone.required = false;
  const hint = document.createElement('p');
  hint.className = 'preview-contact-hint';
  hint.id = 'quoteContactHint';
  hint.textContent = 'Provide an email address or a phone / WhatsApp number. Only one is required.';
  document.querySelector('.quote-form-grid').after(hint);
  [email, phone].forEach(field => {
    const describedBy = field.getAttribute('aria-describedby');
    field.setAttribute('aria-describedby', [describedBy, hint.id].filter(Boolean).join(' '));
    field.addEventListener('input', () => email.setCustomValidity(''));
  });
  const originalCollect = collectShortlistQuoteRequest;
  collectShortlistQuoteRequest = function() {
    email.setCustomValidity('');
    if (!email.value.trim() && !phone.value.trim()) {
      const message = 'Please provide an email address or a phone / WhatsApp number.';
      document.querySelector('#shortlistQuoteError').textContent = message;
      email.setCustomValidity(message);
      email.reportValidity();
      return null;
    }
    return originalCollect();
  };

  // A quote is one browser-history layer above bundle details or My list.
  const session = `quote-${Date.now()}`;
  let activeToken = null, serial = 0, replaying = false;
  const quantities = new Map();
  const ownState = () => history.state?.__lucraQuote?.session === session ? history.state.__lucraQuote : null;
  const originalOpen = openShortlistQuoteDialog;
  openShortlistQuoteDialog = function(records = selectedPresentationProducts()) {
    const wasOpen = quote.open;
    email.setCustomValidity('');
    originalOpen(records);
    if (!quote.open || replaying || wasOpen) return;
    activeToken = ++serial;
    history.pushState({...history.state, __lucraQuote:{session, token:activeToken, keys:records.map(productKey)}}, '', location.href);
  };
  quote.addEventListener('close', () => {
    if (activeToken !== null) quantities.set(activeToken, [...quote.querySelectorAll('[data-quote-quantity]')].map(field => ({key:field.dataset.quoteQuantity, value:field.value})));
    if (ownState()?.token === activeToken) history.back();
    activeToken = null;
  });
  window.addEventListener('popstate', () => {
    const state = ownState();
    if (!state) { if (quote.open) quote.close(); return; }
    if (quote.open) return;
    const records = state.keys.map(key => products.find(product => productKey(product) === key)).filter(Boolean);
    replaying = true;
    openShortlistQuoteDialog(records);
    replaying = false;
    if (!quote.open) return;
    activeToken = state.token;
    for (const entry of quantities.get(activeToken) || []) {
      const field = [...quote.querySelectorAll('[data-quote-quantity]')].find(field => field.dataset.quoteQuantity === entry.key);
      if (field) field.value = entry.value;
    }
  });
  const button = document.querySelector('#requestQuote');
  button.removeEventListener('click', requestProductQuote);
  requestProductQuote = function() { if (currentProduct) openShortlistQuoteDialog([currentProduct]); };
  button.addEventListener('click', requestProductQuote);
})();

/* Keep product specifications compact without losing packing-list detail. */
(() => {
  Object.assign(translations.en, {averageSize:'Average size', sizeSample:'Based on {count} slabs with size data'});
  Object.assign(translations.tr, {averageSize:'Ortalama ölçü', sizeSample:'Ölçüsü belirtilen {count} plaka üzerinden'});
  const value = document.querySelector('#dialogSize');
  const label = value.previousElementSibling;
  label.dataset.i18n = 'averageSize';
  label.textContent = t('averageSize');
  const originalOpen = openProduct;
  openProduct = function(...args) {
    const result = originalOpen(...args);
    const average = currentProduct && window.LucraSizing.averageSize(currentProduct);
    value.textContent = average ? `${Math.round(average.width)} × ${Math.round(average.height)} cm` : t('sizeNotProvided');
    if (average?.partial) {
      const note = document.createElement('small');
      note.className = 'spec-note';
      note.textContent = t('sizeSample').replace('{count}', String(average.slabs));
      value.append(note);
    }
    return result;
  };
})();

/* A listed size must fit both requirements on the same slab. */
(() => {
  const sizing = window.LucraSizing;
  const originalSize = document.querySelector('#dimensionFilter');
  originalSize.value = '';
  originalSize.closest('label').hidden = true;
  originalSize.closest('label').classList.add('preview-omitted-filter');
  const group = document.createElement('fieldset');
  group.className = 'preview-dimension-fields';
  group.innerHTML = '<legend>Minimum slab dimensions (cm)</legend><div><label for="minSlabLength">Minimum length<input id="minSlabLength" type="number" min="0" step="any" inputmode="decimal" placeholder="e.g. 290" aria-describedby="slabDimensionHint"></label><label for="minSlabWidth">Minimum width<input id="minSlabWidth" type="number" min="0" step="any" inputmode="decimal" placeholder="e.g. 190" aria-describedby="slabDimensionHint"></label></div><p id="slabDimensionHint">Shows bundles with at least one listed size that fits, in either orientation. Other slabs in the bundle may be smaller.</p>';
  originalSize.closest('label').after(group);
  const length = group.querySelector('#minSlabLength'), width = group.querySelector('#minSlabWidth');
  const storageKey = 'lucraSlabDimensions';
  const save = () => { if (!sharedCollectionActive) try {localStorage.setItem(storageKey, JSON.stringify({length:length.value, width:width.value}));} catch {} };
  if (!sharedCollectionActive) try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
    for (const [field, value] of [[length,saved.length],[width,saved.width]]) if (typeof value === 'string' && Number.isFinite(Number(value)) && Number(value) >= 0) field.value = value;
  } catch {}
  const minimum = field => field.validity.valid && field.value.trim() ? Number(field.value) : 0;
  const originalFiltered = filteredProducts;
  filteredProducts = function(...args) {originalSize.value = ''; return originalFiltered(...args).filter(product => sizing.fits(product, minimum(length), minimum(width)));};
  [length,width].forEach(field => field.addEventListener('input', () => {save(); render();}));
  const originalEntries = activeFilterEntries;
  activeFilterEntries = function(...args) {
    const entries = originalEntries(...args);
    for (const [field,label] of [[length,'Minimum length'],[width,'Minimum width']]) if (minimum(field) > 0) entries.push({key:field.id,label:`${label}: ${field.value} cm`});
    return entries;
  };
  const originalClear = clearSingleFilter;
  clearSingleFilter = function(key) {
    if (key === length.id || key === width.id) { (key === length.id ? length : width).value = ''; save(); render(); }
    else return originalClear(key);
  };
  const originalReset = resetAllFilters;
  resetAllFilters = function(...args) {length.value = ''; width.value = ''; save(); return originalReset(...args);};
  document.querySelector('#clearFilters').addEventListener('click', event => {event.stopImmediatePropagation(); resetAllFilters();}, true);

  const totals = document.createElement('dl');
  totals.className = 'preview-selection-totals';
  totals.setAttribute('aria-label','My list totals');
  totals.setAttribute('aria-live','polite');
  totals.setAttribute('aria-atomic','true');
  document.querySelector('#presentationCollectionTitle').after(totals);
  const missing = document.createElement('p');
  missing.className = 'preview-totals-note';
  totals.after(missing);
  const originalCollection = renderPresentationCollection;
  renderPresentationCollection = function(...args) {
    const result = originalCollection(...args), selected = selectedPresentationProducts(), count = sizing.totals(selected);
    totals.innerHTML = [['Bundles',count.bundles],[count.missingSlabs?'Known slabs':'Total slabs',count.missingSlabs === count.bundles ? '—' : count.slabs],[count.missingArea?'Known area':'Total area',count.missingArea === count.bundles ? '—' : `${count.area.toFixed(2)} m²`]].map(([label,value])=>`<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(String(value))}</dd></div>`).join('');
    const notes = [];
    if (count.missingSlabs) notes.push(`${count.missingSlabs} ${count.missingSlabs === 1 ? 'bundle is' : 'bundles are'} missing slab counts`);
    if (count.missingArea) notes.push(`${count.missingArea} ${count.missingArea === 1 ? 'bundle is' : 'bundles are'} missing area data`);
    missing.textContent = notes.length ? `Totals include known stock only. ${notes.join('; ')}.` : '';
    missing.hidden = !notes.length;
    document.querySelector('#presentationCollectionSummary').textContent = [count.area > 0 ? `Approx. weight: ${Math.round(count.area*58)} kg` : '',collectionUpdatedLabel(),t('availabilityNote')].filter(Boolean).join(' · ');
    return result;
  };
  render();
})();

/* Keep original list actions and handlers while shortening the browsing panel. */
(() => {
  const panel = document.querySelector('#presentationCollection');
  const sheet = document.querySelector('#previewListDialog');
  const mobile = matchMedia('(max-width:1024px)');
  const body = document.createElement('div');
  body.className = 'preview-list-content';
  while (panel.firstChild) body.append(panel.firstChild);
  const header = document.createElement('div');
  header.className = 'preview-list-summary-row';
  const review = document.createElement('button');
  review.type = 'button'; review.className = 'secondary preview-list-review';
  body.id = 'previewListContent';
  review.setAttribute('aria-controls', body.id);
  const summary = document.createElement('span');
  summary.className = 'preview-list-compact-totals';
  const primary = document.createElement('div');
  primary.className = 'preview-list-primary';
  header.append(review, summary, primary);
  panel.append(header, body);
  const footer = document.createElement('footer');
  footer.className = 'preview-sheet-footer preview-list-footer';
  sheet.append(footer);
  const quote = document.querySelector('#requestPresentationQuote');
  const share = document.querySelector('.preview-share-list');
  const actions = body.querySelector('.presentation-collection-actions');
  const compare = body.querySelector('.preview-compare-list');
  if (compare) { compare.classList.add('preview-list-compare'); actions.before(compare); }
  const utilities = document.createElement('details');
  utilities.className = 'preview-list-utilities';
  const utilityTitle = document.createElement('summary');
  utilityTitle.textContent = 'More actions';
  actions.before(utilities); utilities.append(utilityTitle, actions);
  let expanded = false;
  function update() {
    const count = window.LucraSizing.totals(selectedPresentationProducts());
    const parts = [`${count.bundles} ${count.bundles === 1 ? 'bundle' : 'bundles'}`];
    if (!count.missingSlabs) parts.push(`${count.slabs} slabs`);
    if (!count.missingArea) parts.push(`${count.area.toFixed(2)} m²`);
    summary.textContent = parts.join(' · ');
    review.textContent = expanded ? 'Close list' : 'Review list';
    review.setAttribute('aria-expanded', String(expanded));
    body.hidden = !mobile.matches && !expanded;
    header.hidden = mobile.matches;
    footer.hidden = !mobile.matches || count.bundles === 0 || document.body.classList.contains('sales-mode');
    const target = mobile.matches ? footer : primary;
    if (quote.parentElement !== target) target.append(quote, share);
  }
  review.addEventListener('click', () => {
    expanded = !expanded;
    if (expanded) body.querySelector('.collection-review').open = true;
    update();
  });
  const originalCollection = renderPresentationCollection;
  renderPresentationCollection = function(...args) { const result = originalCollection(...args); update(); return result; };
  mobile.addEventListener('change', update);
  sheet.addEventListener('close', update);
  update();
})();
