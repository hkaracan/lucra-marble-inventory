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
