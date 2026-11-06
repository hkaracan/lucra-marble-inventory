/* Browser navigation and inventory search, layered over the existing app. */
(() => {
  const modal = document.querySelector('#productDialog');
  const session = `lucra-${Date.now()}`;
  const marker = '__lucraBundle';
  const layer = () => history.state?.[marker]?.session === session ? history.state[marker] : null;
  const originalOpen = openProduct;
  const originalFullscreen = setGalleryFullscreen;
  let replaying = false;
  function stateFor(depth) {
    return {...history.state, [marker]: {session, depth, key: productKey(currentProduct)}};
  }
  openProduct = function(id) {
    originalOpen(id);
    if (!modal.open || replaying) return;
    const current = layer();
    if (current) history.replaceState(stateFor(current.depth), '', location.href);
    else history.pushState(stateFor(1), '', location.href);
  };
  setGalleryFullscreen = function(fullscreen) {
    if (!modal.open) return;
    const current = layer();
    if (!replaying && !fullscreen && current?.depth === 2) {
      history.back();
      return;
    }
    originalFullscreen(fullscreen);
    if (!replaying && fullscreen && current?.depth === 1) history.pushState(stateFor(2), '', location.href);
  };
  window.addEventListener('popstate', () => {
    const current = layer();
    replaying = true;
    if (current) {
      if (!modal.open || productKey(currentProduct) !== current.key) openProduct(current.key);
      if (modal.open) originalFullscreen(current.depth === 2);
    } else if (modal.open) modal.close();
    replaying = false;
  });
  // Keep page/share metadata aligned with the visible view, including native
  // Escape and browser navigation, before the delayed dialog close event.
  const syncViewMetadata = () => updateShareMetadata(modal.open ? currentProduct : null);
  new MutationObserver(syncViewMetadata).observe(modal, {attributes:true, attributeFilter:['open']});
  modal.addEventListener('close', () => {
    syncViewMetadata();
    if (modal.open) return; // A new gallery may have opened before this queued event.
    const current = layer();
    if (current) history.go(-current.depth);
  });
  modal.addEventListener('cancel', event => {
    if (modal.classList.contains('gallery-focus')) {
      event.preventDefault();
      setGalleryFullscreen(false);
    }
  });

  const input = document.querySelector('#searchInput');
  const host = input.closest('.search');
  const clear = document.createElement('button');
  clear.type = 'button';
  clear.className = 'preview-search-clear';
  clear.setAttribute('aria-label', 'Clear search');
  clear.title = 'Clear search';
  clear.innerHTML = '<span aria-hidden="true">×</span>';
  const updateClear = () => { clear.hidden = input.value.length === 0; };
  clear.addEventListener('click', event => {
    event.preventDefault();
    event.stopPropagation();
    input.value = '';
    input.focus({preventScroll:true});
    input.dispatchEvent(new Event('input', {bubbles:true}));
  });
  host.append(clear);
  input.addEventListener('input', updateClear);
  const renderWithSearch = render;
  render = function(...args) {
    const result = renderWithSearch(...args);
    updateClear();
    return result;
  };
  updateClear();
  const list = document.createElement('div');
  list.id = 'inventorySuggestions';
  list.className = 'preview-search-suggestions';
  list.setAttribute('role', 'listbox');
  list.setAttribute('aria-label', 'Material and bundle suggestions');
  list.hidden = true;
  host.append(list);
  const mobileSearch = matchMedia('(max-width: 1024px), (pointer: coarse)');
  const viewport = window.visualViewport;
  let focusHeight = window.innerHeight;
  let focusWidth = window.innerWidth;
  let choices = [], selected = -1;

  function updateKeyboardLayout() {
    const body = document.body;
    const wasCompact = body.classList.contains('search-keyboard-open');
    const layoutHeight = focusWidth === window.innerWidth
      ? Math.max(focusHeight, window.innerHeight)
      : window.innerHeight;
    const keyboardOpen = viewport && viewport.scale === 1 &&
      layoutHeight - viewport.height > 100;
    const compact = mobileSearch.matches && keyboardOpen &&
      (document.activeElement === input || wasCompact) &&
      !body.classList.contains('sales-mode');

    body.classList.toggle('search-keyboard-open', Boolean(compact));
    if (compact) {
      body.style.setProperty('--search-visible-height', `${Math.floor(viewport.height)}px`);
      if (!wasCompact) {
        const fieldTop = host.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({top: Math.max(0, fieldTop - 8), behavior: 'instant'});
      }
    } else if (wasCompact) {
      body.style.removeProperty('--search-visible-height');
    }
  }

  function configureSearch() {
    close();
    if (mobileSearch.matches) {
      for (const name of ['role', 'aria-autocomplete', 'aria-expanded']) {
        input.removeAttribute(name);
      }
      input.setAttribute('aria-controls', 'productGrid');
    } else {
      input.setAttribute('role', 'combobox');
      input.setAttribute('aria-autocomplete', 'list');
      input.setAttribute('aria-controls', list.id);
      input.setAttribute('aria-expanded', 'false');
      suggest();
    }
    updateKeyboardLayout();
  }

  mobileSearch.addEventListener('change', configureSearch);
  viewport?.addEventListener('resize', updateKeyboardLayout);
  window.addEventListener('resize', updateKeyboardLayout);

  const grid = document.querySelector('#productGrid');
  grid.addEventListener('pointerdown', event => {
    if (event.isPrimary && event.button === 0 && event.target.closest('a, button') &&
        document.body.classList.contains('search-keyboard-open')) {
      // Let the card receive its click before focus loss can move the grid.
      event.preventDefault();
    }
  });
  grid.addEventListener('click', event => {
    const link = event.target.closest('.card-product-link');
    if (link && document.body.classList.contains('search-keyboard-open')) {
      // The gallery can then return focus to the result that opened it.
      link.focus({preventScroll: true});
    }
  }, true);

  function close() {
    list.hidden = true;
    if (!mobileSearch.matches) input.setAttribute('aria-expanded', 'false');
    input.removeAttribute('aria-activedescendant');
    selected = -1;
  }
  function select(index) {
    selected = index;
    [...list.children].forEach((option, i) => option.setAttribute('aria-selected', String(i === index)));
    if (index >= 0) {
      input.setAttribute('aria-activedescendant', list.children[index].id);
      const option = list.children[index];
      const item = option.getBoundingClientRect();
      const bounds = list.getBoundingClientRect();
      if (item.top < bounds.top) list.scrollTop += item.top - bounds.top;
      else if (item.bottom > bounds.bottom) list.scrollTop += item.bottom - bounds.bottom;
    } else input.removeAttribute('aria-activedescendant');
  }
  function choose(index) {
    const choice = choices[index];
    if (!choice) return;
    input.value = choice.value;
    input.dispatchEvent(new Event('input', {bubbles: true}));
    close();
  }
  function suggest() {
    if (mobileSearch.matches) return;
    const query = input.value.trim().toLocaleLowerCase();
    if (!query || document.activeElement !== input) return close();
    const eligible = products.filter(product =>
      (!sharedCollectionActive || sharedCollectionKeys.has(productKey(product))) &&
      (!window.lucraMatchesMaterialCategory || window.lucraMatchesMaterialCategory(product)));
    const names = [...new Set(eligible.map(product => product.name))]
      .filter(name => name.toLocaleLowerCase().includes(query))
      .sort((a, b) => Number(b.toLocaleLowerCase().startsWith(query)) - Number(a.toLocaleLowerCase().startsWith(query)) || a.localeCompare(b));
    choices = names.slice(0, 4).map(name => ({value: name, label: name, detail: 'Material'}));
    const bundles = eligible.filter(product => product.code && product.code !== '—' &&
      `${product.name} ${product.code}`.toLocaleLowerCase().includes(query));
    const codes = new Set();
    for (const product of bundles) {
      if (choices.length >= 8) break;
      if (codes.has(product.code)) continue;
      codes.add(product.code);
      choices.push({value: product.code, label: product.code, detail: product.name});
    }
    list.replaceChildren();
    choices.forEach((choice, index) => {
      const option = document.createElement('div');
      option.id = `inventorySuggestion-${index}`;
      option.setAttribute('role', 'option');
      option.setAttribute('aria-selected', 'false');
      const name = document.createElement('strong');
      name.textContent = choice.label;
      const detail = document.createElement('small');
      detail.textContent = choice.detail;
      option.append(name, detail);
      option.addEventListener('pointerdown', event => event.preventDefault());
      option.addEventListener('click', event => {
        // The surrounding label would otherwise focus the search field again.
        event.preventDefault();
        choose(index);
      });
      list.append(option);
    });
    selected = -1;
    input.removeAttribute('aria-activedescendant');
    list.hidden = !choices.length;
    input.setAttribute('aria-expanded', String(!!choices.length));
  }
  input.addEventListener('input', suggest);
  input.addEventListener('focus', () => {
    focusHeight = window.innerHeight;
    focusWidth = window.innerWidth;
    updateKeyboardLayout();
    suggest();
  });
  input.addEventListener('blur', () => {
    close();
    // Keep the cards in place until the keyboard finishes closing.
    updateKeyboardLayout();
  });
  input.addEventListener('keydown', event => {
    if (event.isComposing) return;
    if (mobileSearch.matches) {
      if (event.key === 'Enter') {
        event.preventDefault();
        input.blur();
      }
      return;
    }
    if (event.key === 'Escape') { close(); return; }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (list.hidden) suggest();
      if (!choices.length || list.hidden) return;
      select(selected < 0 ? (event.key === 'ArrowDown' ? 0 : choices.length - 1) :
        (selected + (event.key === 'ArrowDown' ? 1 : -1) + choices.length) % choices.length);
    } else if (event.key === 'Enter' && !list.hidden && selected >= 0) {
      event.preventDefault();
      choose(selected);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      close();
    }
  });
  configureSearch();
})();
