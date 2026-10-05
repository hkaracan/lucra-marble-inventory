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
  modal.addEventListener('close', () => {
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
  input.setAttribute('role', 'combobox');
  input.setAttribute('aria-autocomplete', 'list');
  input.setAttribute('aria-controls', list.id);
  input.setAttribute('aria-expanded', 'false');
  let choices = [], selected = -1;
  function close() {
    list.hidden = true;
    input.setAttribute('aria-expanded', 'false');
    input.removeAttribute('aria-activedescendant');
    selected = -1;
  }
  function select(index) {
    selected = index;
    [...list.children].forEach((option, i) => option.setAttribute('aria-selected', String(i === index)));
    if (index >= 0) {
      input.setAttribute('aria-activedescendant', list.children[index].id);
      list.children[index].scrollIntoView({block: 'nearest'});
    } else input.removeAttribute('aria-activedescendant');
  }
  function choose(index) {
    const choice = choices[index];
    if (!choice) return;
    input.value = choice.value;
    input.dispatchEvent(new Event('input', {bubbles: true}));
    close();
    input.focus({preventScroll: true});
  }
  function suggest() {
    const query = input.value.trim().toLocaleLowerCase();
    if (!query || document.activeElement !== input) return close();
    const eligible = products.filter(product =>
      (document.body.classList.contains('sales-mode') || isCustomerVisible(product)) &&
      (!sharedCollectionActive || sharedCollectionKeys.has(productKey(product))));
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
      option.addEventListener('click', () => choose(index));
      list.append(option);
    });
    selected = -1;
    input.removeAttribute('aria-activedescendant');
    list.hidden = !choices.length;
    input.setAttribute('aria-expanded', String(!!choices.length));
  }
  input.addEventListener('input', suggest);
  input.addEventListener('focus', suggest);
  input.addEventListener('blur', close);
  input.addEventListener('keydown', event => {
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
    } else if (event.key === 'Enter') close();
  });
})();
