/* Reorganize existing staff controls without replacing their handlers or data. */
(() => {
  const $=selector=>document.querySelector(selector), dashboard=$('#salesDashboard');
  const read=(key,fallback)=>{try{return localStorage.getItem(key)||fallback}catch{return fallback}};
  const write=(key,value)=>{try{localStorage.setItem(key,value)}catch{}};
  const words={en:{sales:'Sales',customer:'Customer view',stock:'Stock',lists:'Shortlists',checks:'Data checks',title:'Sales dashboard',filters:'Filters',totals:'Stock totals',details:'Bundle details',sizes:'All sizes',average:'Average size',empty:'No bundles match these filters.',listEmpty:'Your shortlist is empty. Select bundles in Stock to add them.',add:'Choose bundles',updated:'Updated',clear:'Clear filters',selected:'selected',actions:'More actions',manage:'Manage lists',account:'Staff views',view:'View bundle',loading:'Loading inventory…',loadError:'Inventory could not be loaded.',retry:'Retry loading inventory'},tr:{sales:'Satış',customer:'Müşteri görünümü',stock:'Stok',lists:'Seçimler',checks:'Veri kontrolleri',title:'Satış paneli',filters:'Filtreler',totals:'Stok toplamları',details:'Demet ayrıntıları',sizes:'Tüm ölçüler',average:'Ortalama ölçü',empty:'Bu filtrelere uygun demet yok.',listEmpty:'Seçiminiz boş. Stok bölümünden demet seçin.',add:'Demet seç',updated:'Güncellendi',clear:'Filtreleri temizle',selected:'seçildi',actions:'Diğer işlemler',manage:'Listeleri yönet',account:'Personel görünümleri',view:'Demeti görüntüle',loading:'Stok yükleniyor…',loadError:'Stok yüklenemedi.',retry:'Stoku yeniden yükle'}};
  const w=()=>words[language==='tr'?'tr':'en'];
  let active=read('lucraSalesSection','stock');if(!['stock','lists','checks'].includes(active))active='stock';
  const expanded=new Set(), slots=new Map();
  const pin=node=>{const marker=document.createComment('staff: original position');node.before(marker);slots.set(node,marker);return node};
  const restore=node=>slots.get(node)?.after(node);
  const make=(tag,className)=>{const node=document.createElement(tag);if(className)node.className=className;return node};
  const tabs=make('div','sales-workspace-tabs');tabs.setAttribute('role','tablist');
  for(const id of ['stock','lists','checks']){const b=make('button');b.type='button';b.id='salesTab-'+id;b.dataset.section=id;b.setAttribute('role','tab');b.setAttribute('aria-controls','salesPanel-'+id);b.addEventListener('click',()=>activate(id));tabs.append(b);}
  const updated=make('p','sales-workspace-updated');
  $('.sales-dashboard-head').after(updated,tabs);
  const panels={};for(const id of ['stock','lists','checks']){const p=make('section','sales-workspace-panel');p.id='salesPanel-'+id;p.setAttribute('role','tabpanel');p.setAttribute('aria-labelledby','salesTab-'+id);panels[id]=p;dashboard.append(p);}
  const totals=make('details','sales-stock-totals'),totalLabel=make('summary');totals.open=!matchMedia('(max-width:720px)').matches;totals.append(totalLabel,$('#salesKpis'));panels.stock.append(totals);
  const filterDetails=make('details','sales-workspace-filters'),filterLabel=make('summary'),filterBody=make('div','sales-workspace-filter-body');filterDetails.append(filterLabel,filterBody);
  const filtersToMove=[$('.preview-material-categories'),$('#inventoryFilters'),$('#advancedFilters'),$('#collectionBanner')].filter(Boolean);filtersToMove.forEach(pin);
  filterBody.append($('.sales-quick-filters'),$('.show-missing'),$('.sales-view-filter'));
  const reset=make('button','secondary');reset.type='button';reset.addEventListener('click',()=>{salesQuickFilter='all';salesFollowupFilter='all';salesSearch='';resetAllFilters();render()});filterBody.append(reset);
  const searchControls=$('.sales-list-controls');searchControls.after(filterDetails);
  const listTools=$('.sales-tools');panels.lists.append(listTools);
  const manager=$('.shortlist-manager'),manage=make('details','sales-list-management'),manageLabel=make('summary'),manageButtons=make('div');manage.append(manageLabel,manageButtons);for(const id of ['newShortlist','renameShortlist','deleteShortlist'])manageButtons.append($('#'+id));manager.append(manage);
  const actions=$('.shortlist-actions'),more=make('details','sales-list-more'),moreLabel=make('summary'),moreBody=make('div');more.append(moreLabel,moreBody);
  for(const id of ['copyShortlist','whatsappShortlist','exportShortlist','exportVisible','clearShortlist'])moreBody.append($('#'+id));actions.append(more);
  // Keep PDF export available from Stock and Shortlists, including an empty list.
  const download=$('#downloadQrLabels'),downloadHome=make('div','sales-stock-actions');if(download)downloadHome.append(download);panels.stock.append(downloadHome);
  const checksActions=make('div','sales-check-actions');panels.checks.append(checksActions,$('#syncFeedback'),$('.latest-sync'),$('.inventory-health'),$('.sync-audit'),$('#customerVisibilitySummary'),$('#catalogueFreshness'));
  const listHost=make('div','sales-workspace-results');listHost.append($('#salesFilterNote'),$('.sales-list'));dashboard.append(searchControls,filterDetails,listHost);
  $('.sales-list').setAttribute('role','list');$('.sales-list-head').hidden=true;
  const empty=make('div','sales-workspace-empty'),emptyText=make('p'),choose=make('button','secondary');choose.type='button';choose.addEventListener('click',()=>{if(!hasLoadedInventory)loadInventory();else activate('stock')});empty.append(emptyText,choose);listHost.append(empty);
  const viewBar=make('nav','staff-viewbar');viewBar.setAttribute('aria-label','Staff views');viewBar.hidden=true;
  const salesButton=make('button'),customerButton=make('button');salesButton.type=customerButton.type='button';viewBar.append(salesButton,customerButton,$('#signOutSales'));$('.site-header').append(viewBar);
  salesButton.addEventListener('click',()=>{if(salesUnlocked)setSalesMode(true)});customerButton.addEventListener('click',()=>setSalesMode(false));
  $('#modeSwitch').addEventListener('click',()=>{if(!document.body.classList.contains('sales-mode'))write('lucraStaffView','sales')},true);
  function moveFilters(sales){for(const node of filtersToMove){if(sales)filterBody.insertBefore(node,reset);else restore(node)}}
  function updateNavigation(){
    const sales=document.body.classList.contains('sales-mode');document.body.classList.toggle('staff-session',salesUnlocked);viewBar.hidden=!salesUnlocked;
    salesButton.textContent=w().sales;customerButton.textContent=w().customer;viewBar.setAttribute('aria-label',w().account);
    salesButton.setAttribute('aria-pressed',String(sales));customerButton.setAttribute('aria-pressed',String(!sales));
    if(salesUnlocked)checksActions.append($('.header-actions'));
    moveFilters(sales);
    for(const [id,label] of [['previewExplore',sales?w().stock:'Inventory'],['previewList',sales?w().lists:'My list']]){
      const node=$('#'+id);for(const child of [...node.childNodes])if(child.nodeType===Node.TEXT_NODE)child.textContent=label;
      if(sales){node.setAttribute('aria-current',(id==='previewExplore'&&active==='stock')||(id==='previewList'&&active==='lists')?'page':'false');node.setAttribute('aria-label',label);}
    }
  }
  function decorateRows(){
    if(!document.body.classList.contains('sales-mode'))return;
    for(const row of $('#salesRows').children){
      if(row.querySelector('.sales-row-main'))continue;
      row.setAttribute('role','listitem');const main=make('div','sales-row-main'),detail=make('details','sales-row-details'),summary=make('summary'),grid=make('div','sales-detail-grid');
      const cells=[...row.children];cells.forEach(cell=>cell.removeAttribute('role'));
      const size=cells[3],allSizes=make('div','sales-all-sizes');allSizes.dataset.label=w().sizes;allSizes.textContent=size.textContent;
      const product=products.find(p=>productKey(p)===row.dataset.productId),avg=product&&window.LucraSizing.averageSize(product);size.textContent=avg?`${Math.round(avg.width)} × ${Math.round(avg.height)} cm`:t('sizeNotProvided');size.dataset.label=w().average;if(avg?.partial){const note=make('small');note.textContent=t('sizeSample').replace('{count}',String(avg.slabs));size.append(note);}
      main.append(cells[0],cells[1],cells[2],size,cells[6]);const pick=main.querySelector('.shortlist-toggle');if(pick){const touch=make('label','sales-pick');pick.before(touch);touch.append(pick);}grid.append(allSizes,cells[4],cells[5],cells[7],cells[8]);summary.textContent=w().details;detail.append(summary,grid);detail.open=expanded.has(row.dataset.productId);
      detail.addEventListener('toggle',()=>{if(!detail.isConnected)return;if(detail.open)expanded.add(row.dataset.productId);else expanded.delete(row.dataset.productId)});
      row.append(main,detail);
    }
  }
  function update(){
    const text=w();$('#salesDashboardTitle').textContent=text.title;$('#salesDashboardTitle').removeAttribute('data-i18n');
    updated.textContent=syncedAt?`${text.updated} ${syncDateLabel(syncedAt)}`:'';
    const currentRows=$('#salesRows').children.length;
    for(const b of tabs.children){const selected=b.dataset.section===active;b.textContent=text[b.dataset.section];b.setAttribute('aria-selected',String(selected));b.tabIndex=selected?0:-1;}
    for(const [id,p]of Object.entries(panels))p.hidden=id!==active;
    const checks=active==='checks';searchControls.hidden=checks;filterDetails.hidden=checks;listHost.hidden=checks;
    const count=activeFilterEntries().length+Number(salesQuickFilter!=='all')+Number(salesFollowupFilter!=='all')+Number(sharedCollectionActive);filterLabel.textContent=text.filters+(count?` (${count})`:'');reset.textContent=text.clear;totalLabel.textContent=text.totals;manageLabel.textContent=text.manage;moreLabel.textContent=text.actions;
    if(download){(active==='lists'?actions:downloadHome).prepend(download);}
    (active==='lists'?moreBody:downloadHome).append($('#exportVisible'));
    empty.hidden=hasLoadedInventory&&(currentRows>0||checks);emptyText.textContent=!hasLoadedInventory?(inventoryLoadState==='error'?text.loadError:text.loading):active==='lists'?text.listEmpty:text.empty;choose.textContent=!hasLoadedInventory?text.retry:text.add;choose.hidden=!hasLoadedInventory?inventoryLoadState!=='error':active!=='lists';
    decorateRows();updateNavigation();
  }
  function activate(id){active=id;write('lucraSalesSection',id);render();tabs.querySelector(`[data-section="${id}"]`).focus({preventScroll:true});}
  tabs.addEventListener('keydown',event=>{if(!['ArrowRight','ArrowLeft','Home','End'].includes(event.key))return;event.preventDefault();const order=['stock','lists','checks'],i=order.indexOf(active);activate(event.key==='Home'?'stock':event.key==='End'?'checks':order[(i+(event.key==='ArrowRight'?1:2))%3]);});
  const originalVisible=salesVisibleProducts;salesVisibleProducts=function(...args){const rows=originalVisible(...args);return active==='lists'?rows.filter(p=>shortlist.has(productKey(p))):rows;};
  const originalRender=render;render=function(...args){const result=originalRender(...args);if(!hasLoadedInventory)update();return result;};
  const originalDashboard=renderSalesDashboard;renderSalesDashboard=function(...args){const result=originalDashboard(...args);update();return result;};
  let customerSearch=null;
  const originalMode=setSalesMode;setSalesMode=function(enabled){
    if(enabled&&!salesUnlocked)return;
    const wasSales=document.body.classList.contains('sales-mode');
    for(const dialog of [$('#previewFilters'),$('#previewListDialog')])if(dialog.open)dialog.close();
    if(enabled&&!wasSales){customerSearch=search.value;search.value='';}
    if(!enabled&&wasSales&&customerSearch!==null){search.value=customerSearch;customerSearch=null;}
    write('lucraStaffView',enabled?'sales':'customer');const result=originalMode(enabled);updateNavigation();return result;
  };
  const explicitCustomerLink=()=>/^#bundle-/.test(location.hash)||new URL(location.href).searchParams.has('collection');
  function restoreView(){if(salesUnlocked&&!explicitCustomerLink())setSalesMode(read('lucraStaffView','customer')==='sales');else updateNavigation()}
  const originalSession=applySalesSession;applySalesSession=function(...args){const was=salesUnlocked;const result=originalSession(...args);if(!was&&salesUnlocked)restoreView();else updateNavigation();return result;};
  for(const [id,section]of [['previewExplore','stock'],['previewList','lists']])$('#'+id).addEventListener('click',event=>{if(!document.body.classList.contains('sales-mode'))return;event.preventDefault();event.stopImmediatePropagation();activate(section);dashboard.scrollIntoView({block:'start',behavior:'smooth'});},true);
  // Audit shortcuts must reveal their destination before the existing handler scrolls.
  $('.inventory-health').addEventListener('click',()=>{active='checks';update()});
  new MutationObserver(()=>{update();}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  const media=matchMedia('(max-width:1024px)');media.addEventListener('change',()=>{if(document.body.classList.contains('sales-mode'))requestAnimationFrame(updateNavigation)});
  if(products.length)render();else update();if(salesUnlocked)restoreView();
})();
