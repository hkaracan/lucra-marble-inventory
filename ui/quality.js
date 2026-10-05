/* Responsive photo requests and accessible feedback without changing inventory actions. */
(() => {
  const grid = document.querySelector('#productGrid');
  function sizePhotos() {
    const columns = Number(document.body.dataset.previewColumns) || 2;
    grid.querySelectorAll('img[data-catalog-image]').forEach((image, index) => {
      const width = Math.ceil(image.closest('.card-image').getBoundingClientRect().width);
      if (width > 0) image.sizes = `${width}px`;
      image.loading = index < columns ? 'eager' : 'lazy';
      image.fetchPriority = index < columns ? 'high' : 'low';
    });
  }
  const originalRender = render;
  render = function(...args) {
    const result = originalRender(...args);
    sizePhotos();
    return result;
  };
  new ResizeObserver(sizePhotos).observe(grid);
  new MutationObserver(sizePhotos).observe(document.body, {attributes:true, attributeFilter:['data-preview-columns']});
  sizePhotos();

  // Preload only adjacent photos, and remember the originating bundle in async callbacks.
  preloadGalleryNeighbors = function() {
    const connection = navigator.connection;
    if (connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType || '')) return;
    const images = currentProduct?.images || [];
    if (images.length < 2) return;
    const key = productKey(currentProduct);
    for (const offset of [1, -1]) {
      const image = images[(imageIndex + offset + images.length) % images.length];
      if (!image?.src || galleryPreloadCache.has(image.src)) continue;
      const preloader = new Image();
      preloader.decoding = 'async';
      preloader.fetchPriority = 'low';
      preloader.addEventListener('load', () => markPhotoVerified(key, image.fileId || image.src), {once:true});
      preloader.addEventListener('error', () => {
        galleryPreloadCache.delete(image.src);
        markPhotoBroken(key, image.fileId || image.src);
      }, {once:true});
      galleryPreloadCache.set(image.src, preloader);
      preloader.src = image.src;
    }
    while (galleryPreloadCache.size > 12) galleryPreloadCache.delete(galleryPreloadCache.keys().next().value);
  };
  const count = document.querySelector('#resultCount');
  count.setAttribute('role', 'status');
  count.setAttribute('aria-live', 'polite');
  count.setAttribute('aria-atomic', 'true');
  const loading = document.querySelector('#galleryLoadingLabel');
  loading.setAttribute('role', 'status');
  loading.setAttribute('aria-live', 'polite');
})();
