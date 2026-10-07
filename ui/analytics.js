/* Automatic production inventory analytics. No customer text is forwarded. */
(() => {
  const policy=window.LucraAnalyticsPolicy;
  const production=location.hostname==='inventory.lucramarble.com';
  const staffKey='lucraAnalyticsStaff';
  const denied=()=>{try{return sessionStorage.getItem(staffKey)==='1';}catch{return false;}};
  let frame=null, frameReady=false, staff=denied(), authChecked=!supabaseClient;
  function stop() {if(frame){frame.contentWindow?.postMessage({type:'lucra-analytics',action:'stop'},location.origin);frame.remove();frame=null;}frameReady=false;}
  function excludeStaff() {staff=true;try{sessionStorage.setItem(staffKey,'1');}catch{}stop();}
  function allowed() {return production && !staff && authChecked && !salesUnlocked && !document.body.classList.contains('sales-mode');}
  function start() {
    if(!allowed() || frame)return;
    frame=document.createElement('iframe');frame.hidden=true;frame.setAttribute('aria-hidden','true');frame.title='Analytics';frame.referrerPolicy='no-referrer';
    frame.addEventListener('load',()=>{if(!frame || !allowed())return;frameReady=true;frame.contentWindow.postMessage({type:'lucra-analytics',action:'start',referrer:policy.referrer(document.referrer)},location.origin);if(inventoryLoadState==='error')track('inventory_load_error');});
    const frameUrl=new URL('analytics-frame.html',scriptUrl);frameUrl.search=new URL(scriptUrl).search;frame.src=frameUrl.href;
    document.body.append(frame);
  }
  const scriptUrl=document.currentScript.src;
  window.addEventListener('message',event=>{if(frame && event.source===frame.contentWindow && event.origin===location.origin && event.data?.type==='lucra-analytics-status')frame.dataset.tagStatus=event.data.loaded===true?'loaded':'failed';});
  function track(name,values={}) {const clean=policy.sanitize(name,values);if(!clean || !allowed() || !frameReady)return;frame.contentWindow.postMessage({type:'lucra-analytics',action:'event',...clean},location.origin);}
  document.querySelector('#modeSwitch').addEventListener('click',excludeStaff,true);
  const originalSession=applySalesSession;
  applySalesSession=function(...args){const result=originalSession(...args);if(salesUnlocked)excludeStaff();return result;};
  if(supabaseClient) supabaseClient.auth.getSession().then(({data})=>{authChecked=true;if(data.session?.user?.email?.toLowerCase()===authorizedSalesEmail)excludeStaff();else start();}).catch(()=>{authChecked=true;start();});
  const originalOpen=openProduct;
  openProduct=function(...args){const previous=document.querySelector('#productDialog').open?productKey(currentProduct):null;const result=originalOpen(...args);if(document.querySelector('#productDialog').open && productKey(currentProduct)!==previous)track('view_bundle',{bundle_code:currentProduct.code});return result;};
  const originalSave=togglePresentationSelection;
  togglePresentationSelection=function(id,selected){const product=products.find(item=>productKey(item)===id),before=presentationSelection.has(id);const result=originalSave(id,selected);if(before!==presentationSelection.has(id))track(selected?'save_bundle':'remove_bundle',{bundle_code:product?.code});return result;};
  const originalQuote=openShortlistQuoteDialog;
  openShortlistQuoteDialog=function(...args){const wasOpen=shortlistQuoteDialog.open;const result=originalQuote(...args);if(!wasOpen && shortlistQuoteDialog.open)track('open_quote',{bundle_count:quoteRequestRecords.length});return result;};
  let searchTimer,dimensionsTimer;
  document.querySelector('#searchInput').addEventListener('input',()=>{clearTimeout(searchTimer);searchTimer=setTimeout(()=>{if(search.value.trim())track('search_inventory',{result_count:filteredProducts().length});},1200);});
  for(const id of ['minSlabLength','minSlabWidth'])document.querySelector('#'+id)?.addEventListener('input',()=>{clearTimeout(dimensionsTimer);dimensionsTimer=setTimeout(()=>track('filter_dimensions',{length_cm:Number(document.querySelector('#minSlabLength').value)||0,width_cm:Number(document.querySelector('#minSlabWidth').value)||0,result_count:filteredProducts().length}),1200);});
  document.addEventListener('click',event=>{
    const button=event.target.closest('button');if(!button)return;
    if(button.matches('.preview-material-category'))track('filter_material',{category:button.dataset.category});
    if(button.id==='previewList')track('open_my_list',{bundle_count:selectedPresentationProducts().length});
    if(button.matches('.preview-compare-list'))track('compare_bundles',{bundle_count:selectedPresentationProducts().length});
    if(button.id==='whatsappProduct')track('contact_whatsapp',{bundle_code:currentProduct?.code});
  });
  // Count only validated handoffs; do not record an enquiry as actually sent.
  const originalCollect=collectShortlistQuoteRequest;
  collectShortlistQuoteRequest=function(...args){const request=originalCollect(...args);if(request){const whatsapp=document.activeElement?.id==='whatsappShortlistQuote';track('quote_handoff',{channel:whatsapp?'whatsapp':'email',bundle_count:request.items.length});}return request;};
  const originalLoad=loadInventory;
  loadInventory=async function(...args){const result=await originalLoad(...args);if(inventoryLoadState==='error')track('inventory_load_error');return result;};
  document.addEventListener('error',event=>{if(event.target instanceof HTMLImageElement && event.target.closest('#productGrid,#productDialog,.preview-comparison'))track('image_load_error');},true);
  start();
})();
