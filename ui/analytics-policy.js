/* Only these event names and values may leave the inventory UI. */
(function(root) {
  const id = 'G-LDDC1RZFHJ';
  const categories = ['all','marble','travertine','onyx','traonyx','dolomite'];
  const events = {
    page_view:{}, view_bundle:{bundle_code:'code'}, save_bundle:{bundle_code:'code'}, remove_bundle:{bundle_code:'code'},
    open_my_list:{bundle_count:'count'}, compare_bundles:{bundle_count:'count'}, open_quote:{bundle_count:'count'},
    quote_handoff:{channel:['email','whatsapp'],bundle_count:'count'}, contact_whatsapp:{bundle_code:'code'},
    search_inventory:{result_count:'count'}, filter_material:{category:categories},
    filter_dimensions:{length_cm:'size',width_cm:'size',result_count:'count'},
    inventory_load_error:{}, image_load_error:{},
  };
  function sanitize(name, values={}) {
    if (!Object.hasOwn(events,name)) return null;
    const clean = {};
    for (const [key,rule] of Object.entries(events[name])) {
      const value = values[key];
      if (Array.isArray(rule) && rule.includes(value)) clean[key]=value;
      if (rule==='code' && typeof value==='string' && /^[A-Z0-9-]{1,24}$/.test(value)) clean[key]=value;
      if (rule==='count' && Number.isInteger(value) && value>=0 && value<=1000000) clean[key]=value;
      if (rule==='size' && typeof value==='number' && Number.isFinite(value) && value>=0 && value<=10000) clean[key]=value;
    }
    return {name,values:clean};
  }
  function referrer(value) {try {const url=new URL(value);return /^https?:$/.test(url.protocol)?url.origin+'/':'';} catch {return '';}}
  const api={id,sanitize,referrer,location:'https://inventory.lucramarble.com/',title:'Lucra Marble — Slab Inventory'};
  if (typeof module!=='undefined' && module.exports) module.exports=api; else root.LucraAnalyticsPolicy=api;
})(typeof window!=='undefined'?window:this);
