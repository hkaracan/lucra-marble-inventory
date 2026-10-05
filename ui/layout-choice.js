(() => {
  const classic = document.body?.dataset.layout === 'classic' || location.pathname.endsWith('/classic.html');
  if (!classic) {try {if(localStorage.getItem('lucraLayout') === 'classic') location.replace('classic.html' + location.search + location.hash);} catch {}}
  document.addEventListener('click', event => {
    const link = event.target.closest('[data-layout-choice]');
    if (!link) return;
    event.preventDefault();
    try {if(link.dataset.layoutChoice === 'classic')localStorage.setItem('lucraLayout','classic');else localStorage.removeItem('lucraLayout');} catch {}
    location.assign((link.dataset.layoutChoice === 'classic' ? 'classic.html' : './') + location.search + location.hash);
  });
})();
