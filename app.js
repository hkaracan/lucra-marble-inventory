const rootFolder = 'https://drive.google.com/drive/folders/17u1Vo3es5lO07Z0__mfu5ugXCOaTkf4Z?usp=drive_link';
const names = [
  'Alaskan Blue K2970','Alexander Black K4987','Arabescato Imperiale K6235','Bianco Dolomite L1011','Breccia Montagna K3332','Bruno Perla K6029','Cafe Amore K6058','Ceppo Beige K5567','Ceppo Beige K6086','Ceppo Grey K3630','Crema Luna K6131','Diamond Grey M2878','Flinders White','Golden Roots K5080','Green Olive K3618','Ice Bloom K4132','Invisible Blue K3280','Karmania Traonyx K5809','Lilac Extra K3619','Marmara Equator K3514','MoonLight Grey K5147','Naturella K5171','NebuLa Wave L009','Nimbus White Veincut K6169','Polar White K6089','Porto Rosa L006','Red Jasper L1010','Red Travertine K5094','Reserved Velluto Onyx K3947','Rosso Levanto K6222','Rosso Levanto L1013','Rosso Levanto L1014','Silver Travertine Ham (Raw) K5301','Sunset Dolomite New','Terranova Ceppo K6044','Travertine L009','Tundra Grey','Van Gogh K3229','Vanilla Ice K5372','Vanilla K6130','Velluto Onyx Cross Cut K3653','Verde Levanto K5420'
];
const stones = [
  'linear-gradient(128deg,#82929c 0 18%,#c7d5da 20% 36%,#5b707d 38% 43%,#dce6e8 46% 100%)',
  'radial-gradient(ellipse at 30% 70%,#6d745f 0 12%,transparent 13%),linear-gradient(112deg,#d8d2c3,#a5a798 35%,#ece6d8 38%,#bbb6a6 62%,#716f63 65%,#d9d4c8)',
  'linear-gradient(120deg,#eee9df 0 27%,#b9a89e 29% 31%,#f4f0e8 33% 56%,#876d68 58% 61%,#dfd6cf 64%)',
  'linear-gradient(145deg,#182b29,#46635b 25%,#152b26 27% 51%,#87928a 53% 55%,#263c36 58% 100%)',
  'linear-gradient(110deg,#ece9e2 0 20%,#ad9b8a 22% 24%,#f4f2ed 26% 60%,#c9bdb3 62% 64%,#e8e3dc 68%)',
  'radial-gradient(circle at 20% 30%,#d8c0a4,transparent 18%),linear-gradient(135deg,#a27d63,#e0c8af 32%,#8d6a54 35%,#ccb096 66%,#785644 70%)'
];
const fallbackProducts = names.map((label,i)=>{
  const reserved = label.startsWith('Reserved ');
  const clean = label.replace(/^Reserved\s+/,'');
  const match = clean.match(/\s([KLM]\d+)$/);
  const code = match ? match[1] : '—';
  const name = match ? clean.slice(0,match.index) : clean;
  const special = code === 'K5809';
  return {name,code,reserved,finish:special?'Bookmatched / Honed':'Packing list connected',pcs:special?29:null,sqm:special?147.41:null,size:special?'135–165 × 315–317 cm':'See packing list',images:special?[{src:'public/karmania-0.jpg',label:'0',type:'slab'},{src:'public/karmania-1.jpg',label:'1',type:'slab'}]:[],stone:stones[i%stones.length],media:special?'31 photos + video':null,lines:special?['K58090102 · 9 pcs · 46.22 m²','K58090202 · 10 pcs · 51.35 m²','K58090302 · 10 pcs · 49.84 m²']:[],folderId:null,packingList:null};
});

function escapeHtml(value){return String(value??'').replace(/[&<>"']/g,character=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));}
function slugifyBundle(value){return String(value??'bundle').toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'')||'bundle';}
function bundleBase(product){return product.folderId?`drive-${product.folderId}`:`bundle-${slugifyBundle(product.folderName||product.name||product.code||'bundle')}`;}
function assignBundleKeys(records){
  const used=new Set();
  return records.map(product=>{
    const base=bundleBase(product);let key=base;let suffix=2;
    while(used.has(key))key=`${base}-${suffix++}`;
    used.add(key);return {...product,bundleKey:key};
  });
}
function productKey(product){return product.bundleKey||bundleBase(product);}

let products=assignBundleKeys(fallbackProducts), currentFilter='all', currentProduct=null, imageIndex=0, syncedAt=null;
const grid=document.querySelector('#productGrid'), search=document.querySelector('#searchInput'), count=document.querySelector('#resultCount'), empty=document.querySelector('#emptyState'), syncStatus=document.querySelector('#syncStatus'), syncFeedback=document.querySelector('#syncFeedback');
const salesKpis=document.querySelector('#salesKpis'), salesRows=document.querySelector('#salesRows');
const sortSelect=document.querySelector('#sortSelect'), syncButton=document.querySelector('#syncButton');
function filteredProducts(){
  const q=search.value.trim().toLowerCase();
  const visible=products.filter(p=>(currentFilter==='all'||(currentFilter==='reserved'?p.reserved:!p.reserved))&&(`${p.name} ${p.code} ${p.groupName||''}`.toLowerCase().includes(q)));
  return visible.sort((a,b)=>sortSelect.value==='slabs'?((Number(b.pcs)||0)-(Number(a.pcs)||0)||a.name.localeCompare(b.name)):sortSelect.value==='area'?((Number(b.sqm)||0)-(Number(a.sqm)||0)||a.name.localeCompare(b.name)):a.name.localeCompare(b.name)||a.code.localeCompare(b.code));
}

function packingListSummary(product){
  if(product.syncError)return {label:'Read error',detail:product.syncError,className:'missing'};
  if(!product.packingList)return {label:'Missing',detail:'No Excel file in bundle folder',className:'missing'};
  if(!product.lines?.length)return {label:'File found',detail:'No readable packing rows',className:'partial'};
  const blocks=new Set(product.lines.map(line=>line.block).filter(Boolean)).size;
  return {label:'Connected',detail:`${product.lines.length} lines${blocks?` · ${blocks} blocks`:''}`,className:'connected'};
}

function productStock(product){
  const slabs=product.pcs!=null?`${Number(product.pcs)} slabs`:'Count unavailable';
  return `${slabs}${product.sqm!=null?` · ${Number(product.sqm).toFixed(2)} m²`:''}`;
}

function productDimensions(product){
  if(product.dimensions?.length)return product.dimensions.join(' · ');
  return product.packingList?'Sizes not listed':'No packing list';
}

function productMediaSummary(product){
  const images=product.images?.length||0;
  if(!images)return {label:'Missing',detail:'No images found',className:'missing'};
  const skipped=product.skippedPhotoFolders?.length||0;
  return {label:`${images} views`,detail:skipped?`${skipped} photo folder${skipped===1?'':'s'} skipped`:'Gallery ready',className:skipped?'partial':'connected'};
}

function renderSalesDashboard(visible){
  const totalSlabs=visible.reduce((sum,product)=>sum+(Number(product.pcs)||0),0);
  const knownArea=visible.filter(product=>product.sqm!=null);
  const totalArea=knownArea.reduce((sum,product)=>sum+Number(product.sqm||0),0);
  const connected=visible.filter(product=>packingListSummary(product).className==='connected').length;
  salesKpis.innerHTML=[
    ['Shown bundles',visible.length],
    ['Available',visible.filter(product=>!product.reserved).length],
    ['Reserved',visible.filter(product=>product.reserved).length],
    ['Slabs',totalSlabs||'—'],
    ['Known area',knownArea.length?`${totalArea.toFixed(2)} m²`:'—'],
    ['Packing data',`${connected}/${visible.length}`],
  ].map(([label,value])=>`<div class="sales-kpi"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`).join('');

  salesRows.innerHTML=visible.map(product=>{
    const packing=packingListSummary(product);
    const media=productMediaSummary(product);
    const driveUrl=product.folderId?`https://drive.google.com/drive/folders/${encodeURIComponent(product.folderId)}`:rootFolder;
    return `<div class="sales-row" role="row" tabindex="0" data-product-id="${escapeHtml(productKey(product))}">
      <span class="sales-product" role="cell"><strong>${escapeHtml(product.name)}</strong><small>${escapeHtml(product.code)}</small></span>
      <span role="cell"><b class="sales-status ${product.reserved?'reserved':''}">${product.reserved?'Reserved':'Available'}</b></span>
      <span role="cell">${escapeHtml(productStock(product))}</span>
      <span class="sales-dimensions" role="cell">${escapeHtml(productDimensions(product))}</span>
      <span class="sales-packing ${packing.className}" role="cell"><b>${escapeHtml(packing.label)}</b><small>${escapeHtml(packing.detail)}</small></span>
      <span class="sales-packing ${media.className}" role="cell"><b>${escapeHtml(media.label)}</b><small>${escapeHtml(media.detail)}</small></span>
      <a class="sales-source" role="cell" href="${escapeHtml(driveUrl)}" target="_blank" rel="noreferrer">Drive ↗</a>
    </div>`;
  }).join('');
  salesRows.querySelectorAll('.sales-row').forEach(row=>{
    row.addEventListener('click',event=>{if(!event.target.closest('a'))openProduct(row.dataset.productId)});
    row.addEventListener('keydown',event=>{if(event.key==='Enter'&&!event.target.closest('a'))openProduct(row.dataset.productId)});
  });
}

function render(){
  const visible=filteredProducts();
  count.textContent=`${visible.length} ${visible.length===1?'bundle':'bundles'}`;
  empty.hidden=visible.length>0;
  renderSalesDashboard(visible);
  grid.innerHTML=visible.map((p,index)=>`<article class="card" tabindex="0" data-product-id="${escapeHtml(productKey(p))}">
    <div class="card-image"><div class="stone-placeholder" style="--stone:${p.stone}"></div>${p.images.length?`<img src="${escapeHtml(p.images[0].src)}" alt="${escapeHtml(p.name)} slab" loading="${index<2?'eager':'lazy'}" fetchpriority="${index<2?'high':'low'}" decoding="async" onload="this.classList.add('loaded')" onerror="this.remove()">`:''}
      <span class="status-badge ${p.reserved?'reserved':''}">${p.reserved?'Reserved':'Available'}</span>${p.media?`<span class="media-badge">${escapeHtml(p.media)}</span>`:''}</div>
    <div class="card-info"><div><h3>${escapeHtml(p.name)}</h3><p class="card-meta">${p.pcs?`${p.pcs} slabs${p.sqm!=null?` · ${Number(p.sqm).toFixed(2)} m²`:''}`:p.packingList?'See packing list':'Gallery available'}</p></div><span class="card-code">${escapeHtml(p.code)}</span></div>
  </article>`).join('');
  grid.querySelectorAll('.card').forEach(card=>{card.addEventListener('click',()=>openProduct(card.dataset.productId));card.addEventListener('keydown',e=>{if(e.key==='Enter')openProduct(card.dataset.productId)})});
}

document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{document.querySelector('.filter.active').classList.remove('active');btn.classList.add('active');currentFilter=btn.dataset.filter;render()}));
search.addEventListener('input',render);
sortSelect.addEventListener('change',render);
document.querySelector('#modeSwitch').addEventListener('click',()=>{document.body.classList.toggle('sales-mode');document.querySelector('#modeLabel').textContent=document.body.classList.contains('sales-mode')?'Sales Mode':'Presentation Mode';render()});

const dialog=document.querySelector('#productDialog');
function openProduct(id){
  currentProduct=products.find(p=>productKey(p)===id); imageIndex=0;
  if(!currentProduct)return;
  document.querySelector('#dialogCode').textContent=currentProduct.code;
  document.querySelector('#dialogName').textContent=currentProduct.name;
  const hasPackingList=Boolean(currentProduct.packingList);
  document.querySelector('#dialogPcs').textContent=currentProduct.pcs!=null?currentProduct.pcs:(hasPackingList?'Not listed':'No packing list');
  document.querySelector('#dialogSqm').textContent=currentProduct.sqm!=null?`${Number(currentProduct.sqm).toFixed(2)} m² · ${(Number(currentProduct.sqm)*10.7639).toFixed(0)} ft²`:(hasPackingList?'Not listed':'No packing list');
  document.querySelector('#dialogSize').textContent=currentProduct.dimensions?.length?productDimensions(currentProduct):(hasPackingList?'Not listed':'No packing list');
  const status=document.querySelector('#dialogStatus');status.className=`status-badge ${currentProduct.reserved?'reserved':''}`;status.textContent=currentProduct.reserved?'Reserved':'Available';
  const packingSummary=packingListSummary(currentProduct);
  document.querySelector('#bundleLines').innerHTML=currentProduct.lines.length?currentProduct.lines.map(x=>typeof x==='string'?`<p><span>${escapeHtml(x.split(' · ')[0])}</span><span>${escapeHtml(x.split(' · ')[1])}</span><span>${escapeHtml(x.split(' · ')[2])}</span></p>`:`<p><span>${escapeHtml(x.block||'Additional size')}</span><span>${escapeHtml(`${x.pcs} pcs · ${x.widthCm??'—'} × ${x.heightCm??'—'} cm`)}</span><span>${escapeHtml(x.sqm!=null?`${Number(x.sqm).toFixed(2)} m²`:'—')}</span></p>`).join(''):`<p><span>Packing list</span><span>${escapeHtml(packingSummary.detail)}</span><span>${escapeHtml(packingSummary.label)}</span></p>`;
  if(currentProduct.packingList)document.querySelector('#bundleLines').insertAdjacentHTML('beforeend',`<div class="sales-note sales-only">Source: ${escapeHtml(currentProduct.packingList)}${syncedAt?` · Synced ${escapeHtml(new Date(syncedAt).toLocaleString())}`:''}</div>`);
  document.querySelector('#openDrive').href=currentProduct.folderId?`https://drive.google.com/drive/folders/${currentProduct.folderId}`:rootFolder;
  updateGallery(); dialog.showModal();
}
function updateGallery(){
  const img=document.querySelector('#dialogImage');
  const selected=currentProduct.images[imageIndex];
  const slabLabel=selected?.label??'';
  if(currentProduct.images.length){img.src=selected.src;img.alt=`${currentProduct.name} ${selected.type==='slab'?`slab ${selected.label}`:selected.label}`;img.style.background=''}else{img.removeAttribute('src');img.alt='';img.style.background=currentProduct.stone}
  document.querySelector('#galleryCount').textContent=currentProduct.images.length?`${selected.type==='slab'?`Slab ${slabLabel}`:selected.label} · ${imageIndex+1} / ${currentProduct.images.length}`:'Drive gallery';
  document.querySelector('#prevImage').hidden=currentProduct.images.length<2;document.querySelector('#nextImage').hidden=currentProduct.images.length<2;
  const numbers=document.querySelector('#slabNumbers');
  const picker=document.querySelector('#slabPickerWrap');
  picker.hidden=currentProduct.images.length===0;
  const jumpTargets=currentProduct.images.reduce((targets,image,i)=>{if(!targets.some(target=>target.label===image.label&&target.type===image.type))targets.push({label:image.label,type:image.type,index:i});return targets},[]);
  numbers.innerHTML=jumpTargets.map(target=>`<button type="button" class="slab-number ${target.type==='extra'?'extra':''} ${currentProduct.images[imageIndex]?.label===target.label&&currentProduct.images[imageIndex]?.type===target.type?'active':''}" data-index="${target.index}" aria-label="View ${target.type==='slab'?`slab ${target.label}`:target.label}">${target.label}</button>`).join('');
  numbers.querySelectorAll('.slab-number').forEach(button=>button.addEventListener('click',()=>{imageIndex=Number(button.dataset.index);updateGallery()}));
  numbers.querySelector('.active')?.scrollIntoView({behavior:'smooth',block:'nearest',inline:'center'});
}
document.querySelector('#prevImage').addEventListener('click',()=>{imageIndex=(imageIndex-1+currentProduct.images.length)%currentProduct.images.length;updateGallery()});
document.querySelector('#nextImage').addEventListener('click',()=>{imageIndex=(imageIndex+1)%currentProduct.images.length;updateGallery()});
document.querySelector('#dialogClose').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
document.querySelector('#copyLink').addEventListener('click',async(e)=>{const url=`${location.href.split('#')[0]}#bundle-${encodeURIComponent(productKey(currentProduct))}`;await navigator.clipboard.writeText(url);e.currentTarget.textContent='Link copied';setTimeout(()=>e.currentTarget.textContent='Copy bundle link',1400)});

function normalizeLiveProduct(p,i){
  const mediaUrl=fileId=>location.protocol==='file:'?`https://drive.google.com/thumbnail?id=${encodeURIComponent(fileId)}&sz=w1400`:`/api/media?id=${encodeURIComponent(fileId)}`;
  const slabImages=(p.images||[]).map(image=>({src:mediaUrl(image.fileId),label:String(image.label??image.number),type:'slab'}));
  const extras=(p.extraImages||[]).map(image=>({src:mediaUrl(image.fileId),label:image.label||'Detail',type:'extra'}));
  return {...p,size:p.dimensions?.length?(p.dimensions.length===1?p.dimensions[0]:`${p.dimensions[0]} + ${p.dimensions.length-1} sizes`):'See packing list',images:[...slabImages,...extras],stone:stones[i%stones.length],media:[slabImages.length?`${slabImages.length} slabs`:null,extras.length?`${extras.length} extra views`:null,p.videos?.length?`${p.videos.length} video`:null].filter(Boolean).join(' · ')};
}

function syncSummary(data){
  const warnings=data.warnings||[], errors=data.errors||[];
  const summary=[`${data.count??data.products?.length??0} bundles`];
  if(warnings.length)summary.push(`${warnings.length} sync warning${warnings.length===1?'':'s'}`);
  if(errors.length)summary.push(`${errors.length} bundle error${errors.length===1?'':'s'}`);
  return summary.join(' · ');
}
function syncDetails(data){
  const warnings=(data.warnings||[]).map(item=>item.photoFolder?`${item.folder} / ${item.photoFolder}: ${item.error}`:`${item.folder}: ${item.error}`);
  const errors=(data.errors||[]).map(item=>`${item.folder}: ${item.error}`);
  return [...warnings,...errors].join(' | ');
}
function syncDetailSummary(data){
  const photoFolders=(data.warnings||[]).filter(item=>item.kind==='optional-photo-folder').map(item=>`${item.folder} / ${item.photoFolder}`);
  const otherWarnings=(data.warnings||[]).filter(item=>item.kind!=='optional-photo-folder').map(item=>item.folder);
  const errors=(data.errors||[]).map(item=>item.folder);
  const compact=(items,label)=>items.length?`${label}: ${items.slice(0,3).join('; ')}${items.length>3?` + ${items.length-3} more`:''}`:'';
  return [compact(photoFolders,'Skipped optional photo folders'),compact(otherWarnings,'Other warnings'),compact(errors,'Bundle errors')].filter(Boolean).join(' · ');
}
function setSyncFeedback(data,prefix='Last sync'){
  const detail=syncDetails(data), summary=syncDetailSummary(data);
  syncFeedback.textContent=`${prefix}: ${syncSummary(data)}${summary?` — ${summary}`:''}`;
  syncStatus.title=detail||'';
}

async function loadInventory(){
  try{
    let data;
    if(location.protocol==='file:'){
      data=window.LUCRA_INVENTORY;
      if(!data)throw new Error('No local inventory snapshot');
    }else{
      const response=await fetch(`/data/inventory.json?ts=${Date.now()}`);
      if(!response.ok)throw new Error('No synced inventory');
      data=await response.json();
    }
    products=assignBundleKeys((data.products||[]).map(normalizeLiveProduct));syncedAt=data.syncedAt;
    syncStatus.innerHTML=`<i></i> ${products.length} bundles · ${new Date(syncedAt).toLocaleDateString()}`;
    setSyncFeedback({...data,count:products.length},location.protocol==='file:'?'Local snapshot':'Last sync');
  }catch(error){syncStatus.innerHTML='<i></i> Preview data';syncStatus.title='';syncFeedback.textContent='';}
  render();
}

function openHashProduct(){
  const match=location.hash.match(/^#bundle-(.+)$/);if(!match)return;
  const id=decodeURIComponent(match[1]), product=products.find(p=>productKey(p)===id)||(id!=='—'?products.find(p=>p.code===id):null);
  if(product)openProduct(productKey(product));
}
window.addEventListener('hashchange',openHashProduct);

document.querySelector('#syncButton').addEventListener('click',async(event)=>{
  const button=event.currentTarget;
  if(location.protocol==='file:'){
    syncFeedback.textContent='Drive sync needs the local server. This HTML is showing the last synced snapshot.';
    return;
  }
  button.disabled=true;button.textContent='Syncing…';syncStatus.innerHTML='<i></i> Reading Drive';syncStatus.title='';syncFeedback.textContent='Syncing: reading the public Drive folder and packing lists…';
  try{const response=await fetch('/api/sync',{method:'POST'});const result=await response.json();if(!result.ok)throw new Error(result.error||'The Drive sync failed');await loadInventory();setSyncFeedback(result);button.textContent=`Synced ${result.count} bundles`;setTimeout(()=>button.textContent='↻ Sync from Drive',1800)}catch(error){const message=error instanceof Error?error.message:String(error);button.textContent='Sync failed';syncStatus.innerHTML='<i></i> Sync failed';syncStatus.title=message;syncFeedback.textContent=`Sync failed: ${message}. The previous catalogue remains available.`;setTimeout(()=>button.textContent='↻ Try again',1800)}finally{button.disabled=false}
});
loadInventory().then(openHashProduct);
