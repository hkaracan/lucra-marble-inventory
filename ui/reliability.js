/* Pure change detection is also exercised with local inventory fixtures. */
function previewSavedChanges(records, inventory) {
  const byKey = new Map(inventory.map(product => [product.key, product]));
  return records.flatMap(record => {
    const product = byKey.get(record.key);
    if (!product) return [{...record, kind:'missing'}];
    if (product.reserved) return [{...record, name:product.name, code:product.code, kind:record.reserved ? 'reserved' : 'newly-reserved'}];
    return [];
  });
}

(() => {
  const $ = selector => document.querySelector(selector);
  const read = () => {try {return JSON.parse(localStorage.getItem('lucraResponsiveSavedStatus')) || [];} catch {return [];}};
  let records = new Map(read().map(record => [record.key, record]));
  const persist = () => {try {localStorage.setItem('lucraResponsiveSavedStatus', JSON.stringify([...records.values()]));} catch {}};
  const originalPrune = prunePresentationSelection;
  // Remember selected keys before the existing app prunes removed catalogue entries.
  prunePresentationSelection = () => {
    for (const key of presentationSelection) {
      if (!records.has(key)) {
        const product = products.find(item => productKey(item) === key);
        records.set(key, {key, name:product?.name || 'Saved bundle', code:product?.code || '', reserved:Boolean(product?.reserved)});
      }
    }
    originalPrune();
  };
  const notice = document.createElement('details');
  notice.className = 'preview-availability-info';
  notice.innerHTML = '<summary aria-label="About catalogue availability"><span aria-hidden="true">ⓘ</span><span class="preview-availability-label">Availability info</span></summary><p class="preview-availability-note"></p>';
  const noticeText = notice.querySelector('p');
  const phoneNotice = matchMedia('(max-width:720px)');
  function arrangeAvailabilityInfo() {
    notice.open = false;
    const meta = $('#publicCatalogueFreshness').closest('.preview-catalogue-meta');
    if (phoneNotice.matches && meta) meta.append(notice);
    else $('#publicCatalogueFreshness').after(notice);
  }
  phoneNotice.addEventListener('change', arrangeAvailabilityInfo);
  arrangeAvailabilityInfo();
  document.addEventListener('click', event => {if (!notice.contains(event.target)) notice.open = false;});
  notice.addEventListener('keydown', event => {if (event.key === 'Escape') {notice.open = false; notice.querySelector('summary').focus();}});
  const detailNotice = document.createElement('p');
  detailNotice.className = 'preview-availability-note preview-bundle-availability';
  $('#productDialog .dialog-title-row').after(detailNotice);
  const desktopAlerts = document.createElement('section');
  desktopAlerts.className = 'preview-list-alerts preview-catalogue-alerts';
  $('#presentationCollection').after(desktopAlerts);
  const listAlerts = document.createElement('section');
  listAlerts.className = 'preview-list-alerts';
  $('#previewListEmpty').after(listAlerts);
  const setText = (element, value) => {if (element.textContent !== value) element.textContent = value;};
  let previousAlerts;
  function update() {
    if (!hasLoadedInventory) {desktopAlerts.hidden = listAlerts.hidden = true; return;}
    const live = products.filter(isCustomerVisible);
    const byKey = new Map(live.map(product => [productKey(product), product]));
    for (const key of presentationSelection) {
      const product = byKey.get(key);
      if (product && !records.has(key)) records.set(key, {key, name:product.name, code:product.code, reserved:Boolean(product.reserved)});
    }
    for (const [key, record] of records) {
      const product = byKey.get(key);
      if (product && !presentationSelection.has(key)) records.delete(key);
      else if (product && !product.reserved) records.set(key, {...record, reserved:false, name:product.name, code:product.code});
    }
    persist();
    const changes = previewSavedChanges([...records.values()], live.map(product => ({key:productKey(product), name:product.name, code:product.code, reserved:product.reserved})));
    const reserved = changes.filter(change => change.kind !== 'missing');
    const missing = changes.filter(change => change.kind === 'missing');
    const reservedMarkup = reserved.length ? `<details class="preview-reserved-notice"><summary>${reserved.length} reserved ${reserved.length === 1 ? 'bundle' : 'bundles'} · Confirm availability</summary><div>${reserved.map(change => `<p><strong>${escapeHtml(change.name)}${change.code ? ` · ${escapeHtml(change.code)}` : ''}</strong><span>${change.kind === 'newly-reserved' ? 'Now reserved. ' : ''}Ask Lucra to confirm availability.</span></p>`).join('')}</div></details>` : '';
    const missingMarkup = missing.length ? `<h3>Check your saved bundles</h3>${missing.map(change => `<div><p><strong>${escapeHtml(change.name)}${change.code ? ` · ${escapeHtml(change.code)}` : ''}</strong><span>No longer listed in this catalogue. It will not be included in new shares or quotes.</span></p><button type="button" data-dismiss-saved="${escapeHtml(change.key)}">Dismiss</button></div>`).join('')}` : '';
    const markup = reservedMarkup + missingMarkup;

    if (markup !== previousAlerts) {
      desktopAlerts.innerHTML = listAlerts.innerHTML = markup;
      previousAlerts = markup;
    }
    desktopAlerts.hidden = listAlerts.hidden = changes.length === 0;
    const updated = syncedAt && !Number.isNaN(Date.parse(syncedAt)) ? ` Last updated ${syncDateLabel(syncedAt)}.` : ' Update time not available.';
    setText(noticeText, 'Available means listed in the catalogue; confirm current availability and pricing with Lucra.' + updated);
    setText(detailNotice, (currentProduct?.reserved ? 'This bundle is reserved. Ask Lucra about availability.' : 'Listed as available. Please confirm current availability with Lucra.') + updated);
    shareList.disabled = selectedPresentationProducts().length === 0;
  }
  [desktopAlerts, listAlerts].forEach(panel => panel.addEventListener('click', event => {
    const button = event.target.closest('[data-dismiss-saved]');
    if (!button) return;
    records.delete(button.dataset.dismissSaved); persist(); update();
  }));

  const shareList = document.createElement('button');
  shareList.type = 'button'; shareList.className = 'primary preview-share-list';
  shareList.textContent = 'Share my list';
  $('.presentation-collection-actions').prepend(shareList);
  const listActions = $('.presentation-collection-actions');
  const actionOrder = [shareList, $('.preview-compare-list'), $('#requestPresentationQuote'), $('#printPresentationCollection'), $('#sharePresentationCollection'), $('#openPresentationCollection'), $('#copyPresentationCollectionSummary'), $('#whatsappPresentationCollection'), $('#clearPresentationCollection')];
  actionOrder.forEach(button => listActions.append(button));
  const listFeedback = document.createElement('p');
  listFeedback.className = 'preview-share-feedback'; listFeedback.setAttribute('role', 'status');
  $('.presentation-collection-actions').after(listFeedback);
  shareList.addEventListener('click', async () => {
    const selected = selectedPresentationProducts();
    if (!selected.length) return;
    const title = commitCustomerCollectionTitle(), url = publicCustomerCollectionUrl(selected, title);
    if (navigator.share) {
      try {await navigator.share({title:title || 'Lucra Marble · My list', text:customerCollectionSummary(selected, title), url}); setText(listFeedback, 'Sharing completed.'); return;}
      catch (error) {if (error?.name === 'AbortError') {setText(listFeedback, 'Sharing cancelled.'); return;}}
    }
    await copyText(url, shareList, 'List link copied');
  });
  const bundleFeedback = document.createElement('p');
  bundleFeedback.className = 'preview-share-feedback'; bundleFeedback.setAttribute('role', 'status');
  $('#productDialog .preview-share-row').after(bundleFeedback);
  const bundleShare = $('#shareProduct');
  bundleShare.textContent = 'Share bundle';
  const watchCopy = (button, feedback, message, defaultLabel) => {
    new MutationObserver(() => {
      if (/copied/i.test(button.textContent)) setText(feedback, message);
      else if (/ready/i.test(button.textContent)) setText(feedback, 'Copy dialog opened.');
      else if (defaultLabel && ['Share customer link', 'Share'].includes(button.textContent)) setText(button, defaultLabel);
    }).observe(button, {childList:true});
  };
  watchCopy(bundleShare, bundleFeedback, 'Bundle details and public link copied.', 'Share bundle');
  watchCopy($('#copyLink'), bundleFeedback, 'Bundle page link copied.');
  // Capture the button before awaiting clipboard access; DOM event.currentTarget
  // is cleared after dispatch in the original async copy handler.
  $('#copyLink').addEventListener('click', async event => {
    event.stopImmediatePropagation();
    const button = event.currentTarget;
    if (currentProduct) await copyText(customerProductUrl(currentProduct), button, 'Link copied');
  }, true);
  watchCopy($('#sharePresentationCollection'), listFeedback, 'List link copied.');
  watchCopy($('#copyPresentationCollectionSummary'), listFeedback, 'List summary copied.');
  watchCopy(shareList, listFeedback, 'List link copied.');
  $('#productDialog').addEventListener('close', () => setText(bundleFeedback, ''));

  // Keep failed catalogue photos recoverable, using the same original image element.
  document.addEventListener('error', event => {
    const image = event.target;
    if (!image.matches?.('#productGrid img[data-catalog-image]')) return;
    const container = image.closest('.card-image');
    let retry = container.querySelector('.preview-photo-retry');
    if (!retry) {
      retry = document.createElement('button'); retry.type = 'button';
      retry.className = 'preview-photo-retry'; retry.textContent = 'Retry photo';
      retry.setAttribute('aria-label', `Retry photo for ${image.closest('.card').querySelector('h3').textContent}`);
      retry.addEventListener('click', event => {
        event.preventDefault(); event.stopPropagation();
        const src = image.getAttribute('src'), srcset = image.getAttribute('srcset');
        retry.hidden = true; image.classList.remove('image-failed');
        container.classList.remove('image-error'); container.classList.add('is-loading');
        image.removeAttribute('srcset'); image.removeAttribute('src');
        requestAnimationFrame(() => {if (srcset) image.setAttribute('srcset', srcset); if (src) image.setAttribute('src', src);});
      });
      container.append(retry);
    }
    retry.hidden = false;
  }, true);
  document.addEventListener('load', event => {
    if (event.target.matches?.('#productGrid img[data-catalog-image]')) {
      const retry = event.target.closest('.card-image').querySelector('.preview-photo-retry');
      if (retry) retry.hidden = true;
    }
  }, true);
  ['#productGrid', '#presentationCollectionItems', '#dialogName'].forEach(selector => {
    new MutationObserver(update).observe($(selector), {childList:true});
  });
  // Async inventory loading invokes the wrapped prune before rendering these notices.
})();
