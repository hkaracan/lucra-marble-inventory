/* Numeric stock helpers shared by the UI and regression checks. */
(function(root) {
  function knownNumber(value) {
    if (value == null || String(value).trim() === '') return null;
    const number = Number(value);
    return Number.isFinite(number) && number >= 0 ? number : null;
  }
  function sizes(product) {
    const dimensions = (product.dimensions || []).map(value => {
      const match = String(value).match(/^\s*(\d+(?:[.,]\d+)?)\s*[×xX]\s*(\d+(?:[.,]\d+)?)\s*cm\s*$/);
      return match ? match.slice(1).map(number => Number(number.replace(',', '.'))) : null;
    }).filter(pair => pair && pair.every(number => number > 0));
    if (dimensions.length) return dimensions;
    return (product.lines || []).filter(line => knownNumber(line.pcs) > 0).map(line => [Number(line.widthCm), Number(line.heightCm)]).filter(pair => pair.every(number => Number.isFinite(number) && number > 0));
  }
  function fits(product, length, width) {
    length = Number(length) || 0; width = Number(width) || 0;
    if (length <= 0 && width <= 0) return true;
    return sizes(product).some(([a,b]) => (a >= length && b >= width) || (b >= length && a >= width));
  }
  function totals(records) {
    const result = {bundles:records.length, slabs:0, area:0, missingSlabs:0, missingArea:0};
    for (const product of records) {
      const slabs = knownNumber(product.pcs), area = knownNumber(product.sqm);
      if (slabs === null) result.missingSlabs++; else result.slabs += slabs;
      if (area === null) result.missingArea++; else result.area += area;
    }
    return result;
  }
  const api = {fits, sizes, totals};
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.LucraSizing = api;
})(typeof window !== 'undefined' ? window : this);
