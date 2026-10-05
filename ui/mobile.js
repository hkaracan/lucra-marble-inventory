/* Presentation-only adapter. All inventory actions stay in the original app.js. */
(() => {
  const mobile = matchMedia('(max-width:1024px)');
  const phoneSlabs = matchMedia('(max-width:720px)');
  const $ = selector => document.querySelector(selector);
  if (!$('#productGrid') || !$('#previewFilters')) return;
  const heartIcon = '<svg class="preview-heart" viewBox="0 0 24 22" aria-hidden="true" focusable="false"><path d="M12 19.5 3.3 11.2C-1.2 6.8 5.2-.8 12 5.6 18.8-.8 25.2 6.8 20.7 11.2Z" /></svg>';
  const navHeart = $('#previewList > span');
  if (navHeart.firstChild?.nodeType === Node.TEXT_NODE) navHeart.firstChild.remove();
  navHeart.insertAdjacentHTML('afterbegin', heartIcon);
  const filterSheet = $('#previewFilters');
  const listSheet = $('#previewListDialog');
  const menuSheet = $('#previewMenuDialog');
  $('.site-header').append($('#previewMenu'));
  const filterPanel = $('#advancedFilters');
  $('#productDialog [data-i18n="location"]')?.closest('div').remove();
  // These data-quality filters are omitted from the customer preview.
  ['#packingFilter', '#mediaFilter'].forEach(selector => {
    const control = $(selector);
    control.value = 'all';
    control.closest('label').classList.add('preview-omitted-filter');
  });
  const selectionPanel = $('#presentationCollection');
  const headerActions = $('.header-actions');
  const filterToggle = $('#advancedFiltersToggle');
  const filterCount = document.createElement('small');
  filterCount.className = 'preview-filter-count';
  filterCount.setAttribute('aria-hidden', 'true');
  filterToggle.prepend(filterCount);
  const searchRow = document.createElement('div');
  searchRow.className = 'preview-search-row';
  const slots = new Map();
  const statuses = $('#inventoryFilters');
  const statusSection = document.createElement('section');
  statusSection.className = 'preview-sheet-status';
  statusSection.innerHTML = '<h3>Availability</h3>';
  $('#previewFilterBody').append(statusSection);
  let lastFocus;

  // Move the original controls, never clone them or replace their event handlers.
  function moveTo(node, target) {
    if (!slots.has(node)) {
      const marker = document.createComment('preview: original position');
      node.before(marker);
      slots.set(node, marker);
    }
    target.append(node);
  }
  function restore(node) {
    const marker = slots.get(node);
    if (marker) marker.after(node);
  }
  function closeSheets() {
    [filterSheet, listSheet, menuSheet].forEach(sheet => {
      if (sheet.open) sheet.close();
    });
  }
  function openSheet(sheet) {
    closeSheets();
    lastFocus = document.activeElement;
    if (sheet === filterSheet) {
      moveTo(statuses, statusSection);
      moveTo(filterPanel, $('#previewFilterBody'));
      filterToggle.setAttribute('aria-expanded', 'true');
    }
    if (sheet === listSheet) {
      moveTo(selectionPanel, $('#previewListBody'));
      const review = selectionPanel.querySelector('details');
      if (review) review.open = true;
    }
    sheet.showModal();
    if (sheet === menuSheet) $('#previewMenu').setAttribute('aria-expanded', 'true');
    update();
  }
  [filterSheet, listSheet, menuSheet].forEach(sheet => {
    sheet.querySelector('[data-preview-close]').addEventListener('click', () => sheet.close());
    sheet.addEventListener('click', event => {
      if (event.target !== sheet) return;
      const bounds = sheet.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) sheet.close();
    });
    sheet.addEventListener('close', () => {
      if (sheet === filterSheet) {
        restore(statuses);
        restore(filterPanel);
        document.body.classList.remove('filters-open');
        filterToggle.setAttribute('aria-expanded', 'false');
      }
      if (sheet === listSheet) restore(selectionPanel);
      if (sheet === menuSheet) $('#previewMenu').setAttribute('aria-expanded', 'false');
      update();
      lastFocus?.focus();
    });
  });
  filterToggle.addEventListener('click', event => {
    if (!mobile.matches) return;
    event.stopImmediatePropagation();
    event.preventDefault();
    openSheet(filterSheet);
  }, true);
  $('#previewApply').addEventListener('click', () => filterSheet.close());
  $('#previewReset').addEventListener('click', () => {
    resetAllFilters();
    filterToggle.setAttribute('aria-expanded', 'true');
    update();
  });
  $('#previewExplore').addEventListener('click', () => {
    closeSheets();
    $('#catalog').scrollIntoView({behavior:'smooth'});
    $('#catalog').focus({preventScroll:true});
  });
  $('#previewList').addEventListener('click', () => {
    if (document.body.classList.contains('sales-mode')) {
      $('.sales-tools').scrollIntoView({behavior:'smooth'});
      $('#shortlistSelect')?.focus({preventScroll:true});
    } else openSheet(listSheet);
  });
  $('#previewMenu').addEventListener('click', () => openSheet(menuSheet));
  $('#modeSwitch').addEventListener('click', () => menuSheet.close());
  $('#signOutSales').addEventListener('click', () => menuSheet.close());

  function arrange() {
    closeSheets();
    if (mobile.matches) {
      const controls = $('.controls');
      controls.prepend(searchRow);
      moveTo($('.search'), searchRow);
      moveTo(filterToggle, searchRow);
      moveTo(headerActions, $('#previewMenuBody'));
      const head = $('.catalog-head');
      controls.after(head);
    } else {
      restore($('.search'));
      restore(filterToggle);
      restore(headerActions);
      searchRow.remove();
      $('.controls').before($('.catalog-head'));
    }
    update();
  }
  mobile.addEventListener('change', arrange);
  filterToggle.setAttribute('aria-haspopup', 'dialog');
  filterToggle.setAttribute('aria-controls', 'previewFilters');
  filterToggle.setAttribute('aria-label', 'Open inventory filters');

  const saveBar = document.createElement('div');
  const productToolbar = document.createElement('div');
  productToolbar.className = 'preview-product-toolbar';
  productToolbar.setAttribute('role', 'group');
  productToolbar.setAttribute('aria-label', 'Bundle gallery controls');
  $('#productDialog').prepend(productToolbar);
  saveBar.className = 'preview-product-save';
  saveBar.innerHTML = '<span></span><div class="preview-save-controls"><span class="preview-saved-label" hidden>♥ Saved</span><button type="button" class="primary"></button></div>';
  $('#productDialog').append(saveBar);
  saveBar.querySelector('button').addEventListener('click', () => {
    if (!currentProduct) return;
    const key = productKey(currentProduct);
    togglePresentationSelection(key, !presentationSelection.has(key));
    notifySelection(key);
    update();
  });

  function setText(element, value) {
    if (element.textContent !== value) element.textContent = value;
  }
  function update() {
    setText($('.slab-picker-head small'), phoneSlabs.matches ? 'Swipe to find a slab or extra view' : 'Select a slab or extra view');
    const productDialog = $('#productDialog');
    $('#previewExplore').toggleAttribute('aria-current', !listSheet.open);
    if (!listSheet.open) $('#previewExplore').setAttribute('aria-current', 'page');
    if (listSheet.open) $('#previewList').setAttribute('aria-current', 'page');
    else $('#previewList').removeAttribute('aria-current');
    const toolbarControls = [$('#dialogClose'), $('#productDialog .gallery-tools')];
    if (mobile.matches && !productDialog.classList.contains('gallery-focus')) {
      toolbarControls.forEach(node => {
        if (node.parentElement !== productToolbar) moveTo(node, productToolbar);
      });
    } else toolbarControls.forEach(restore);
    const total = presentationSelection.size;
    const sales = document.body.classList.contains('sales-mode');
    const badge = $('#previewListCount');
    setText(badge, String(sales ? shortlist.size : total));
    badge.hidden = Number(badge.textContent) === 0;
    $('#previewListEmpty').hidden = total > 0;
    $('#previewList').hidden = sharedCollectionActive;
    setText($('#previewApply'), `Show ${$('#resultCount').textContent || 'bundles'}`);
    const count = activeFilterEntries().length;
    setText(filterCount, String(count));
    filterCount.hidden = count === 0;
    filterToggle.setAttribute('aria-label', count ? `Open inventory filters, ${count} active` : 'Open inventory filters');
    saveBar.hidden = sharedCollectionActive || sales;
    if (currentProduct) {
      ['#dialogPcs', '#dialogSqm', '#dialogWeight', '#dialogSize', '#dialogSurface'].forEach(selector => {
        const field = $(selector);
        if (!field.textContent.trim() || /^(—|Not listed|No packing list|Area not provided|Size not provided)$/i.test(field.textContent.trim())) setText(field, 'Not available');
      });
      $('#dialogWeightNote').hidden = !$('#dialogWeightNote').textContent.trim();
      $('#bundleLines').classList.toggle('preview-empty-section', !currentProduct.lines?.length && !currentProduct.packingList);
      setText(saveBar.querySelector('span'), productStock(currentProduct));
      const selected = presentationSelection.has(productKey(currentProduct));
      const button = saveBar.querySelector('button');
      setText(button, selected ? 'Remove' : '♡ Add to my list');
      saveBar.querySelector('.preview-saved-label').hidden = !selected;
      button.classList.toggle('preview-remove', selected);
      button.setAttribute('aria-label', selected ? 'Remove bundle from my list' : 'Add bundle to my list');
      button.setAttribute('aria-pressed', String(selected));
    }
    {
      document.querySelectorAll('.card-collection-toggle').forEach(button => {
        if (!button.firstElementChild.querySelector('.preview-heart')) button.firstElementChild.innerHTML = heartIcon;
      });
      document.querySelectorAll('#productGrid .card').forEach(card => {
        const product = products.find(item => productKey(item) === card.dataset.productId);
        if (!product) return;
        const images = catalogSlabImages(product);
        if (images.length < 2) return;
        let position = card.querySelector('.preview-photo-position');
        if (!position) {
          position = document.createElement('span');
          position.className = 'preview-photo-position';
          position.setAttribute('aria-live', 'polite');
          card.querySelector('.card-image').append(position);
        }
        setText(position, `${catalogImageIndex(product, images) + 1} of ${images.length}`);
      });
    }
  }
  // Renders and asynchronous data refreshes remain owned by the original app.
  ['#productGrid', '#resultCount', '#dialogName', '#presentationCollectionTitle'].forEach(selector => {
    const node = $(selector);
    if (node) new MutationObserver(update).observe(node, {childList:true});
  });
  new MutationObserver(update).observe($('#productGrid'), {subtree:true, childList:true, attributes:true, attributeFilter:['data-photo-file-id']});
  if (document.body) new MutationObserver(update).observe(document.body, {attributes:true,attributeFilter:['class']});
  new MutationObserver(update).observe($('#productDialog'), {attributes:true,attributeFilter:['class']});

  // Card swipes reuse the existing catalogue photo navigation.
  let swipe;
  let suppressClickUntil = 0;
  const gridNode = $('#productGrid');
  let browseReturn;
  function rememberCard(event) {
    const card = event.target.closest('.card');
    if (!card || event.target.closest('button') || (event.type === 'keydown' && !['Enter', ' '].includes(event.key))) return;
    browseReturn = {key:card.dataset.productId, top:window.scrollY, left:window.scrollX};
  }
  gridNode.addEventListener('click', rememberCard, true);
  gridNode.addEventListener('keydown', rememberCard, true);
  $('#productDialog').addEventListener('close', () => {
    if (!browseReturn) return;
    const previous = browseReturn;
    browseReturn = null;
    requestAnimationFrame(() => {
      const card = [...gridNode.querySelectorAll('.card')].find(item => item.dataset.productId === previous.key);
      card?.focus({preventScroll:true});
      window.scrollTo({top:previous.top, left:previous.left, behavior:'instant'});
    });
  });
  const toast = document.createElement('div');
  toast.className = 'preview-list-toast';
  toast.setAttribute('popover', 'manual');
  toast.innerHTML = '<span role="status" aria-live="polite"></span><button type="button">Undo</button>';
  document.body.append(toast);
  let toastTimer, undoSelection;
  function notifySelection(key) {
    const selected = presentationSelection.has(key);
    undoSelection = {key, selected:!selected};
    setText(toast.querySelector('span'), selected ? 'Added to my list' : 'Removed from my list');
    toast.showPopover();
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {toast.hidePopover(); undoSelection = null;}, 6000);
  }
  toast.querySelector('button').addEventListener('click', () => {
    if (!undoSelection) return;
    togglePresentationSelection(undoSelection.key, undoSelection.selected);
    update();
    clearTimeout(toastTimer);
    toast.hidePopover();
    undoSelection = null;
  });
  gridNode.addEventListener('click', event => {
    const toggle = event.target.closest('.card-collection-toggle');
    if (toggle) {
      const key = toggle.dataset.productId;
      setTimeout(() => notifySelection(key), 0);
    }
  }, true);
  gridNode.addEventListener('pointerdown', event => {
    if (!mobile.matches || event.pointerType === 'mouse' || event.target.closest('button')) return;
    const image = event.target.closest('.card-image');
    if (image) swipe = {image, x:event.clientX, y:event.clientY, id:event.pointerId};
  });
  gridNode.addEventListener('pointerup', event => {
    if (!swipe || swipe.id !== event.pointerId) return;
    const start = swipe;
    swipe = null;
    const dx = event.clientX - start.x, dy = event.clientY - start.y;
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    const card = start.image.closest('.card');
    const product = products.find(item => productKey(item) === card.dataset.productId);
    if (product && catalogSlabImages(product).length > 1) {
      updateCatalogCardImage(card, product, dx < 0 ? 1 : -1);
      suppressClickUntil = performance.now() + 500;
    }
  });
  gridNode.addEventListener('pointercancel', () => {swipe = null;});
  gridNode.addEventListener('click', event => {
    if (performance.now() < suppressClickUntil && !event.target.closest('button')) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }, true);
  // Keep utility actions available without competing with enquiry and sharing.
  const utilityActions = $('#copyLink').parentElement;
  const more = document.createElement('details');
  more.className = 'preview-more-actions';
  const summary = document.createElement('summary');
  summary.textContent = 'More actions';
  more.append(summary, utilityActions);
  $('.enquiry-actions').after(more);
  const shareRow = document.createElement('div');
  shareRow.className = 'dialog-actions preview-share-row';
  shareRow.append($('#shareProduct'));
  more.before(shareRow);
  $('#copyLink').textContent = 'Copy link';
  $('#shareProduct').textContent = 'Share';
  $('#copyLink').title = 'Copy the current page link';
  $('#shareProduct').title = 'Share the public link and bundle details';
  // Larger, shorter helper text in the preview only.
  $('.customer-cta').textContent = 'Ask about pricing and availability.';
  $('.slab-picker-head small').textContent = 'Swipe to find a slab or extra view';
  phoneSlabs.addEventListener('change', update);
  new ResizeObserver(entries => {
    $('#productDialog').style.setProperty('--preview-slab-picker-height', `${entries[0].target.getBoundingClientRect().height}px`);
  }).observe($('#slabPickerWrap'));
  arrange();
})();
