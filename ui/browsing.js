/* Local preview workflows; original app data and action handlers stay intact. */
(() => {
  const $ = selector => document.querySelector(selector);
  const grid = $('#productGrid');
  const read = (key, fallback) => {try {return JSON.parse(localStorage.getItem(key)) ?? fallback;} catch {return fallback;}};
  const write = (key, value) => {try {localStorage.setItem(key, JSON.stringify(value));} catch {}};
  const phone = matchMedia('(max-width:720px)');
  const tablet = matchMedia('(min-width:721px) and (max-width:1024px)');
  const device = () => phone.matches ? 'phone' : tablet.matches ? 'tablet' : 'computer';
  let columns = read('lucraResponsiveColumns', {phone:1, tablet:2, computer:Number(catalogColumns)});
  const density = $('.catalog-view');
  const one = document.createElement('button');
  one.type = 'button'; one.className = 'catalog-view-button'; one.dataset.columns = '1';
  one.textContent = '1'; one.setAttribute('aria-label', '1 card per row');
  density.insertBefore(one, density.querySelector('button'));
  function applyColumns() {
    columns = read('lucraResponsiveColumns', columns);
    const kind = device(), allowed = kind === 'phone' ? [1, 2] : kind === 'tablet' ? [2, 3] : [2, 3, 4];
    const chosen = allowed.includes(columns[kind]) ? columns[kind] : allowed[0];
    columns[kind] = chosen;
    write('lucraResponsiveColumns', columns);
    document.body.dataset.previewColumns = String(chosen);
    grid.style.setProperty('--preview-columns', chosen);
    density.querySelectorAll('button').forEach(button => {
      const number = Number(button.dataset.columns), active = number === chosen;
      button.hidden = !allowed.includes(number);
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
  }
  density.addEventListener('click', event => {
    const button = event.target.closest('button[data-columns]');
    if (!button) return;
    event.stopImmediatePropagation();
    columns = {...read('lucraResponsiveColumns', columns), [device()]:Number(button.dataset.columns)};
    write('lucraResponsiveColumns', columns);
    applyColumns();
  }, true);
  phone.addEventListener('change', applyColumns);
  tablet.addEventListener('change', applyColumns);
  applyColumns();

  const meta = document.createElement('div');
  meta.className = 'preview-catalogue-meta';
  const metaNodes = [$('#publicCatalogueFreshness'), $('#resultCount')];
  const metaSlots = metaNodes.map(node => {
    const marker = document.createComment('preview: catalogue metadata position');
    node.before(marker);
    return marker;
  });
  function arrangeCatalogueMeta() {
    if (phone.matches) {
      $('.catalog-head').after(meta);
      metaNodes.forEach(node => meta.append(node));
    } else {
      metaNodes.forEach((node, index) => metaSlots[index].after(node));
      meta.remove();
    }
  }
  phone.addEventListener('change', arrangeCatalogueMeta);
  arrangeCatalogueMeta();

  // Set insertion order now controls review, sharing, printing, and quoting.
  selectedPresentationProducts = () => {
    const byKey = new Map(products.map(product => [productKey(product), product]));
    return [...presentationSelection].map(key => byKey.get(key)).filter(product => product && isCustomerVisible(product));
  };
  const originalFilteredProducts = filteredProducts;
  if (sharedCollectionActive) {
    const sharedOrder = document.createElement('option');
    sharedOrder.value = 'shared-order'; sharedOrder.textContent = 'Shared list order';
    $('#sortSelect').prepend(sharedOrder);
    $('#sortSelect').value = 'shared-order';
  }
  filteredProducts = () => {
    const visible = originalFilteredProducts();
    if (sharedCollectionActive && $('#sortSelect').value === 'shared-order') {
      const order = new Map([...sharedCollectionKeys].map((key, index) => [key, index]));
      return visible.sort((a, b) => order.get(productKey(a)) - order.get(productKey(b)));
    }
    return visible;
  };
  const compareList = document.createElement('button');
  compareList.type = 'button'; compareList.className = 'secondary preview-compare-list';
  compareList.textContent = 'Compare my list';
  $('.presentation-collection-actions').prepend(compareList);
  const comparison = document.createElement('dialog');
  comparison.className = 'preview-comparison';
  comparison.setAttribute('aria-labelledby', 'previewComparisonTitle');
  comparison.innerHTML = '<header><h2 id="previewComparisonTitle">Compare my list</h2><button type="button" aria-label="Close list comparison">×</button></header><div class="preview-comparison-body"></div>';
  document.body.append(comparison);
  comparison.querySelector('header button').addEventListener('click', () => comparison.close());
  compareList.addEventListener('click', () => {
    const selected = selectedPresentationProducts();
    const rows = [
      ['Status', product => product.reserved ? 'Reserved' : 'Available'],
      ['Slabs', product => product.pcs ?? 'Not available'],
      ['Area', product => product.sqm != null ? `${Number(product.sqm).toFixed(2)} m²` : 'Not available'],
      ['Dimensions', productDimensions],
      ['Finish', productSurfaceLabel],
    ];
    const headers = selected.map(product => {
      const photo = productThumbnailImage(product);
      return `<th scope="col">${photo?.src ? `<img src="${escapeHtml(photo.thumbSrc || photo.src)}" alt="${escapeHtml(product.name)}" loading="lazy">` : ''}<strong>${escapeHtml(product.name)}</strong><small>${escapeHtml(product.code)}</small></th>`;
    }).join('');
    comparison.querySelector('.preview-comparison-body').innerHTML = `<div class="preview-comparison-scroll" role="region" aria-label="Bundle comparison; scroll horizontally for more bundles" tabindex="0"><table class="preview-comparison-table" style="--comparison-count:${selected.length}"><caption class="sr-only">Compare ${selected.length} selected bundles</caption><colgroup><col class="preview-comparison-label">${selected.map(() => '<col>').join('')}</colgroup><thead><tr><th scope="col">Details</th>${headers}</tr></thead><tbody>${rows.map(([label, value]) => `<tr><th scope="row">${label}</th>${selected.map(product => `<td>${escapeHtml(String(value(product) || 'Not available'))}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
    comparison.showModal();
  });
  function decorateList() {
    const selected = selectedPresentationProducts();
    compareList.disabled = selected.length < 2;
    $('#presentationCollectionItems').querySelectorAll(':scope > span').forEach((row, index) => {
      if (row.dataset.previewReview) return;
      const product = selected[index];
      if (!product) return;
      row.dataset.previewReview = productKey(product);
      const photo = productThumbnailImage(product);
      const view = document.createElement('button');
      view.type = 'button'; view.className = 'preview-review-photo';
      view.setAttribute('aria-label', `View ${product.name}`);
      if (photo?.src) view.innerHTML = `<img src="${escapeHtml(photo.thumbSrc || photo.src)}" alt="" loading="lazy">`;
      else view.textContent = 'View';
      view.addEventListener('click', () => openProduct(productKey(product)));
      row.prepend(view);
      const stock = document.createElement('small');
      stock.textContent = productStock(product);
      row.querySelector('.collection-review-copy').append(stock);
      const reorder = document.createElement('div');
      reorder.className = 'preview-review-order';
      ['up', 'down'].forEach((direction, directionIndex) => {
        const button = document.createElement('button');
        button.type = 'button'; button.textContent = directionIndex ? '↓' : '↑';
        button.setAttribute('aria-label', `Move ${product.name} ${direction}`);
        button.disabled = directionIndex ? index === selected.length - 1 : index === 0;
        button.addEventListener('click', () => {
          const keys = [...presentationSelection], from = keys.indexOf(productKey(product));
          const other = selected[index + (directionIndex ? 1 : -1)];
          if (!other) return;
          const to = keys.indexOf(productKey(other));
          [keys[from], keys[to]] = [keys[to], keys[from]];
          presentationSelection.clear(); keys.forEach(key => presentationSelection.add(key));
          savePresentationSelection(); render();
          requestAnimationFrame(() => {
            decorateList();
            const newRow = [...$('#presentationCollectionItems').children].find(item => item.dataset.previewReview === productKey(product));
            newRow?.querySelectorAll('.preview-review-order button')[directionIndex]?.focus({preventScroll:true});
          });
        });
        reorder.append(button);
      });
      row.append(reorder);
    });
  }
  new MutationObserver(decorateList).observe($('#presentationCollectionItems'), {childList:true});
  renderPresentationCollection(); decorateList();

  // Existing sales comparison keeps every column, presented as labeled rows on phones.
  const compareContent = $('#compareContent');
  new MutationObserver(() => {
    const labels = [...compareContent.querySelectorAll('thead th')].map(cell => cell.textContent.trim());
    compareContent.querySelectorAll('tbody tr').forEach(row => [...row.children].forEach((cell, index) => {cell.dataset.label = labels[index];}));
  }).observe(compareContent, {childList:true});

  const clearEmpty = document.createElement('button');
  clearEmpty.type = 'button'; clearEmpty.className = 'secondary preview-clear-empty';
  clearEmpty.textContent = 'Reset filters';
  function resetBrowsingFilters() {
    resetAllFilters();
    $('#searchInput').focus({preventScroll:true});
  }
  clearEmpty.addEventListener('click', resetBrowsingFilters);
  $('#emptyState').append(clearEmpty);
  const chips = $('#activeFilterChips');
  const originalRenderChips = renderActiveFilterChips;
  renderActiveFilterChips = () => {
    originalRenderChips();
    const active = activeFilterEntries().length > 0;
    clearEmpty.hidden = !active;
    if (!active) return;
    const reset = document.createElement('button');
    reset.type = 'button'; reset.className = 'preview-reset-filters';
    reset.textContent = 'Reset filters';
    reset.addEventListener('click', resetBrowsingFilters);
    chips.append(reset);
  };
  chips.addEventListener('click', event => {
    const button = event.target.closest('[data-clear-filter]');
    if (!button) return;
    const index = [...chips.querySelectorAll('[data-clear-filter]')].indexOf(button);
    requestAnimationFrame(() => {
      const remaining = [...chips.querySelectorAll('[data-clear-filter]')];
      (remaining[Math.min(index, remaining.length - 1)] || $('#searchInput')).focus({preventScroll:true});
    });
  }, true);
  renderActiveFilterChips();

  const controlIds = ['searchInput', 'sortSelect', 'minArea', 'maxArea', 'minSlabs', 'maxSlabs', 'dimensionFilter', 'surfaceFilter'];
  const saved = read('lucraResponsiveBrowsing', {});
  let restored = false, knownProducts;
  function saveBrowsing() {
    if (!restored || sharedCollectionActive) return;
    write('lucraResponsiveBrowsing', {
      fields:Object.fromEntries(controlIds.map(id => [id, $('#' + id).value])),
      status:currentFilter,
      photos:[...catalogImageIndexes].map(([key, index]) => ({key, fileId:catalogSlabImages(products.find(product => productKey(product) === key) || {})[index]?.fileId, index})),
    });
  }
  function restoreBrowsing() {
    if (knownProducts === products) return;
    knownProducts = products;
    if (!restored) {
      if (!sharedCollectionActive) controlIds.forEach(id => {
        const field = $('#' + id), value = saved.fields?.[id];
        if (typeof value !== 'string') return;
        if (field.tagName !== 'SELECT' || [...field.options].some(option => option.value === value)) field.value = value;
      });
      if (!sharedCollectionActive && ['all', 'available', 'reserved', 'recent'].includes(saved.status)) setCatalogStatusFilter(saved.status);
      (saved.photos || []).forEach(entry => {
        const product = products.find(item => productKey(item) === entry.key);
        if (!product) return;
        const images = catalogSlabImages(product);
        const matching = entry.fileId ? images.findIndex(image => image.fileId === entry.fileId) : entry.index;
        if (Number.isInteger(matching) && matching >= 0 && matching < images.length) catalogImageIndexes.set(entry.key, matching);
      });
      restored = true;
      render();
    }
  }
  // The original async inventory load renders the grid after its live data arrives.
  new MutationObserver(() => {restoreBrowsing(); saveBrowsing();}).observe(grid, {childList:true, subtree:true, attributes:true, attributeFilter:['data-photo-file-id']});
  document.addEventListener('input', saveBrowsing);
  document.addEventListener('change', saveBrowsing);
  window.addEventListener('pagehide', saveBrowsing);
})();
