const rootFolder = 'https://drive.google.com/drive/folders/17u1Vo3es5lO07Z0__mfu5ugXCOaTkf4Z?usp=drive_link';
const actionsWorkflowUrl = 'https://github.com/hkaracan/lucra-marble-inventory/actions/workflows/sync-inventory.yml';
const isGithubPages = /(^|\.)github\.io$/.test(location.hostname);
const salesPassword = 'lucra123';
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
const translations={
  en:{heroEyebrow:'DENIZLI SLAB INVENTORY',heroTitle:'Available natural stone,',heroTitleEm:'ready to discover.',heroCopy:"Explore Lucra Marble's current slab collection. Search by material, browse individual bundles, and view every slab in detail.",liveCollection:'LIVE COLLECTION',slabInventory:'Slab inventory',searchPlaceholder:'Search material or bundle ID',allBundles:'All bundles',available:'Available',reserved:'Reserved',presentationMode:'Presentation Mode',salesMode:'Sales Mode',sort:'Sort',name:'Name',mostSlabs:'Most slabs',largestArea:'Largest area',minArea:'Min m²',maxArea:'Max m²',minSlabs:'Min slabs',maxSlabs:'Max slabs',size:'Size',sizePlaceholder:'e.g. 190 × 290',packing:'Packing',allData:'All data',connected:'Connected',fileFound:'File found',missing:'Missing',photos:'Photos',allPhotos:'All photos',withImages:'With images',missingImages:'Missing images',clearFilters:'Clear filters',moreFilters:'More filters',hideFilters:'Hide filters',salesWorkspace:'SALES WORKSPACE',inventoryDashboard:'Inventory dashboard',salesHint:'Click a product row to open its full image gallery and packing-list details.',showMissingPacking:'Show bundles without packing lists',dataQuality:'DATA QUALITY',inventoryHealth:'Inventory health',showDetails:'Show details',hideDetails:'Hide details',shortlist:'Shortlist',newList:'New list',rename:'Rename',delete:'Delete',compareSelected:'Compare selected',copySummary:'Copy summary',whatsappCustomer:'WhatsApp customer',exportCsv:'Export CSV',exportVisible:'Export visible CSV',clear:'Clear',productSelect:'Product / select',status:'Status',stock:'Stock',sizes:'Sizes',packingList:'Packing list',media:'Media',followUp:'Follow-up',source:'Source',bundle:'BUNDLE',bundleSingular:'bundle',bundles:'bundles',jumpToSlab:'Jump to slab',slabPickerHint:'Select a slab number or additional view',totalSlabs:'Total slabs',totalArea:'Total area',dimensions:'Dimensions',location:'Location',followUpStatus:'Status',new:'New',sent:'Sent to customer',waiting:'Waiting for reply',quoted:'Quoted',closed:'Closed',salesNote:'Sales note',salesNotePlaceholder:'Add a private note for your team',saveNote:'Save note',saved:'Saved',customerCta:'Interested in this bundle? Share the page with your team or contact Lucra Marble for current pricing and availability.',copyLink:'Copy bundle link',shareCustomer:'Share customer link',printSheet:'Print sheet',openDrive:'Open Google Drive folder',salesAccess:'SALES ACCESS',openSalesDashboard:'Open sales dashboard',salesAccessHint:'Enter the demo password to view packing-list and source details.',password:'Password',cancel:'Cancel',unlockDashboard:'Unlock dashboard',compareBundles:'Compare selected bundles',copyComparison:'Copy comparison',close:'Close',noMatchingBundles:'No matching bundles',tryAnother:'Try another material name or clear the filter.',slabs:'slabs',countUnavailable:'Count unavailable',sizesNotListed:'Sizes not listed',noPackingList:'No packing list',noImageAvailable:'No images found',galleryReady:'Gallery ready',views:'views',photoFoldersSkipped:'photo folder(s) skipped',readError:'Read error',noExcel:'No Excel file in bundle folder',noReadableRows:'No readable packing rows',packingData:'Packing data',shownBundles:'Shown bundles',knownArea:'Known area',areaData:'Area data',packingRows:'Packing rows',sizeData:'Size data',customerOptions:'Selected stone options',contactForPricing:'Please contact us for pricing, availability confirmation, and delivery information.',inventoryHealthHint:'These checks are based on the latest published catalogue.',noIssues:'No catalogue issues found',missingPackingDetail:'bundles without recognized packing lists',missingPackingRowsDetail:'bundles with packing files but no readable rows',missingSizeDetail:'bundles without readable m² or dimensions',missingImageDetail:'bundles without images',skippedPhotoDetail:'bundles with skipped photo folders',syncErrorDetail:'bundles with sync errors',skippedFolders:'Skipped photo folders',syncIssues:'Sync issues',added:'Added',updated:'Updated',unchanged:'Unchanged',lastSync:'Last published sync',details:'Details',viewRows:'View affected rows',noNote:'No note',imageLoadFailed:'Image failed to load',copied:'Copied',listName:'List name',seePackingList:'See packing list',galleryAvailable:'Gallery available'},
  tr:{heroEyebrow:'DENİZLİ PLAKA ENVANTERİ',heroTitle:'Seçili doğal taşlar,',heroTitleEm:'keşfetmeye hazır.',heroCopy:'Lucra Marble güncel plaka koleksiyonunu keşfedin. Malzeme veya paket koduna göre arayın, tek tek demetleri inceleyin ve her plakayı ayrıntılı görüntüleyin.',liveCollection:'GÜNCEL KOLEKSİYON',slabInventory:'Plaka envanteri',searchPlaceholder:'Malzeme veya paket kodu ara',allBundles:'Tüm demetler',available:'Mevcut',reserved:'Rezerve',presentationMode:'Sunum Modu',salesMode:'Satış Modu',sort:'Sırala',name:'İsim',mostSlabs:'En çok plaka',largestArea:'En büyük alan',minArea:'Min m²',maxArea:'Maks m²',minSlabs:'Min plaka',maxSlabs:'Maks plaka',size:'Ölçü',sizePlaceholder:'örn. 190 × 290',packing:'Paket listesi',allData:'Tüm veriler',connected:'Bağlı',fileFound:'Dosya bulundu',missing:'Eksik',photos:'Fotoğraflar',allPhotos:'Tüm fotoğraflar',withImages:'Fotoğraflı',missingImages:'Fotoğraf eksik',clearFilters:'Filtreleri temizle',moreFilters:'Diğer filtreler',hideFilters:'Filtreleri gizle',salesWorkspace:'SATIŞ ÇALIŞMA ALANI',inventoryDashboard:'Envanter paneli',salesHint:'Tam fotoğraf galerisi ve paket listesi ayrıntılarını açmak için bir ürün satırına tıklayın.',showMissingPacking:'Paket listesi olmayan demetleri göster',dataQuality:'VERİ KALİTESİ',inventoryHealth:'Envanter durumu',showDetails:'Ayrıntıları göster',hideDetails:'Ayrıntıları gizle',shortlist:'Seçim listesi',newList:'Yeni liste',rename:'Yeniden adlandır',delete:'Sil',compareSelected:'Seçilenleri karşılaştır',copySummary:'Özeti kopyala',whatsappCustomer:'Müşteriye WhatsApp',exportCsv:'CSV dışa aktar',exportVisible:'Görünenleri CSV dışa aktar',clear:'Temizle',productSelect:'Ürün / seç',status:'Durum',stock:'Stok',sizes:'Ölçüler',packingList:'Paket listesi',media:'Medya',followUp:'Takip',source:'Kaynak',bundle:'DEMET',bundleSingular:'demet',bundles:'demet',jumpToSlab:'Plakaya git',slabPickerHint:'Bir plaka numarası veya ek görünüm seçin',totalSlabs:'Toplam plaka',totalArea:'Toplam alan',dimensions:'Ölçüler',location:'Konum',followUpStatus:'Durum',new:'Yeni',sent:'Müşteriye gönderildi',waiting:'Yanıt bekleniyor',quoted:'Teklif verildi',closed:'Kapandı',salesNote:'Satış notu',salesNotePlaceholder:'Ekibiniz için özel bir not ekleyin',saveNote:'Notu kaydet',saved:'Kaydedildi',customerCta:'Bu demetle ilgileniyor musunuz? Sayfayı ekibinizle paylaşın veya güncel fiyat ve uygunluk için Lucra Marble ile iletişime geçin.',copyLink:'Demet bağlantısını kopyala',shareCustomer:'Müşteri bağlantısını paylaş',printSheet:'Sayfayı yazdır',openDrive:'Google Drive klasörünü aç',salesAccess:'SATIŞ ERİŞİMİ',openSalesDashboard:'Satış panelini aç',salesAccessHint:'Paket listesi ve kaynak ayrıntılarını görmek için demo şifresini girin.',password:'Şifre',cancel:'İptal',unlockDashboard:'Paneli aç',compareBundles:'Seçilen demetleri karşılaştır',copyComparison:'Karşılaştırmayı kopyala',close:'Kapat',noMatchingBundles:'Eşleşen demet yok',tryAnother:'Başka bir malzeme adı deneyin veya filtreyi temizleyin.',slabs:'plaka',countUnavailable:'Adet bilgisi yok',sizesNotListed:'Ölçü listelenmemiş',noPackingList:'Paket listesi yok',noImageAvailable:'Fotoğraf bulunamadı',galleryReady:'Galeri hazır',views:'görünüm',photoFoldersSkipped:'fotoğraf klasörü atlandı',readError:'Okuma hatası',noExcel:'Demet klasöründe Excel dosyası yok',noReadableRows:'Okunabilir paket satırı yok',packingData:'Paket verisi',shownBundles:'Gösterilen demet',knownArea:'Bilinen alan',areaData:'Alan verisi',packingRows:'Paket satırları',sizeData:'Ölçü verisi',customerOptions:'Seçilen taş seçenekleri',contactForPricing:'Fiyat, uygunluk teyidi ve teslimat bilgisi için lütfen bizimle iletişime geçin.',inventoryHealthHint:'Bu kontroller son yayımlanan kataloğa göre hazırlanmıştır.',noIssues:'Katalog sorunu bulunamadı',missingPackingDetail:'paket listesi tanınmayan demet',missingPackingRowsDetail:'paket dosyası olup okunabilir satırı olmayan demet',missingSizeDetail:'okunabilir m² veya ölçüsü olmayan demet',missingImageDetail:'fotoğrafı olmayan demet',skippedPhotoDetail:'fotoğraf klasörü atlanan demet',syncErrorDetail:'senkronizasyon hatası olan demet',skippedFolders:'Atlanan fotoğraf klasörleri',syncIssues:'Senkronizasyon sorunları',added:'Eklenen',updated:'Güncellenen',unchanged:'Değişmeyen',lastSync:'Son yayımlanan senkronizasyon',details:'Ayrıntılar',viewRows:'Etkilenen satırları göster',noNote:'Not yok',imageLoadFailed:'Fotoğraf yüklenemedi',copied:'Kopyalandı',listName:'Liste adı',seePackingList:'Paket listesini gör',galleryAvailable:'Galeri hazır'}
};
let language='en';
try{language=localStorage.getItem('lucraLanguage')==='tr'?'tr':'en'}catch(error){}
function t(key){return translations[language][key]??translations.en[key]??key}
function applyLanguage(){
  document.documentElement.lang=language;
  document.querySelectorAll('[data-i18n]').forEach(element=>{element.textContent=t(element.dataset.i18n)});
  document.querySelectorAll('[data-i18n-placeholder]').forEach(element=>{element.placeholder=t(element.dataset.i18nPlaceholder)});
  const switcher=document.querySelector('#languageSwitch');
  if(switcher){switcher.textContent=language==='en'?'TR':'EN';switcher.title=language==='en'?'Türkçe':'English';switcher.setAttribute('aria-label',switcher.title)}
  const modeLabel=document.querySelector('#modeLabel');
  if(modeLabel)modeLabel.textContent=document.body.classList.contains('sales-mode')?t('salesMode'):t('presentationMode');
  const filterToggle=document.querySelector('#advancedFiltersToggle');
  if(filterToggle){const open=document.body.classList.contains('filters-open');const label=filterToggle.querySelector('[data-i18n]');if(label)label.textContent=t(open?'hideFilters':'moreFilters');filterToggle.lastElementChild.textContent=open?'⌃':'⌄';filterToggle.setAttribute('aria-expanded',String(open))}
}
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
const salesKpis=document.querySelector('#salesKpis'), salesRows=document.querySelector('#salesRows'), salesFilterNote=document.querySelector('#salesFilterNote');
const sortSelect=document.querySelector('#sortSelect'), syncButton=document.querySelector('#syncButton');
const minArea=document.querySelector('#minArea'), maxArea=document.querySelector('#maxArea'), minSlabs=document.querySelector('#minSlabs'), maxSlabs=document.querySelector('#maxSlabs'), dimensionFilter=document.querySelector('#dimensionFilter'), packingFilter=document.querySelector('#packingFilter'), mediaFilter=document.querySelector('#mediaFilter'), clearFiltersButton=document.querySelector('#clearFilters');
const advancedFiltersToggle=document.querySelector('#advancedFiltersToggle');
const showMissingPacking=document.querySelector('#showMissingPacking');
const shortlistCount=document.querySelector('#shortlistCount'), compareSelectedButton=document.querySelector('#compareSelected'), copyShortlistButton=document.querySelector('#copyShortlist'), whatsappShortlistButton=document.querySelector('#whatsappShortlist'), exportShortlistButton=document.querySelector('#exportShortlist'), exportVisibleButton=document.querySelector('#exportVisible'), clearShortlistButton=document.querySelector('#clearShortlist');
const shortlistSelect=document.querySelector('#shortlistSelect'), newShortlistButton=document.querySelector('#newShortlist'), renameShortlistButton=document.querySelector('#renameShortlist'), deleteShortlistButton=document.querySelector('#deleteShortlist');
const healthSummary=document.querySelector('#healthSummary'), healthDetails=document.querySelector('#healthDetails'), toggleHealthButton=document.querySelector('#toggleHealth');
const salesGate=document.querySelector('#salesGate'), salesGateForm=document.querySelector('#salesGateForm'), salesPasswordInput=document.querySelector('#salesPasswordInput'), salesGateError=document.querySelector('#salesGateError');
const compareDialog=document.querySelector('#compareDialog'), compareContent=document.querySelector('#compareContent'), copyCompareButton=document.querySelector('#copyCompare');
const followupStatus=document.querySelector('#followupStatus'), salesNote=document.querySelector('#salesNote'), saveSalesNoteButton=document.querySelector('#saveSalesNote'), noteSaved=document.querySelector('#noteSaved'), shareProductButton=document.querySelector('#shareProduct');
let showMissingPackingValue=true, shortlist=new Set(), shortlistLists={}, activeShortlistName='Sales shortlist', salesNotes={}, inventoryReport={};
try{showMissingPackingValue=localStorage.getItem('lucraShowMissingPacking')!=='0'}catch(error){}
try{
  const storedShortlists=JSON.parse(localStorage.getItem('lucraShortlists')||'null');
  if(storedShortlists?.lists&&typeof storedShortlists.lists==='object'){shortlistLists=storedShortlists.lists;activeShortlistName=storedShortlists.active||Object.keys(shortlistLists)[0]||activeShortlistName}
  else{shortlistLists[activeShortlistName]=JSON.parse(localStorage.getItem('lucraShortlist')||'[]')}
}catch(error){shortlistLists[activeShortlistName]=[]}
if(!shortlistLists[activeShortlistName])activeShortlistName=Object.keys(shortlistLists)[0]||'Sales shortlist';
shortlist=new Set(Array.isArray(shortlistLists[activeShortlistName])?shortlistLists[activeShortlistName]:[]);
try{salesNotes=JSON.parse(localStorage.getItem('lucraSalesNotes')||'{}')||{}}catch(error){salesNotes={}}
showMissingPacking.checked=showMissingPackingValue;
if(isGithubPages){
  syncButton.textContent='↻ Sync via GitHub Actions';
  syncButton.title='Open the manual GitHub Actions sync workflow';
}
function numberFilterValue(input){const value=Number(input.value);return input.value.trim()!==''&&Number.isFinite(value)?value:null}
function filteredProducts(){
  const q=search.value.trim().toLowerCase(),dimensionQuery=dimensionFilter.value.trim().toLowerCase();
  const minAreaValue=numberFilterValue(minArea),maxAreaValue=numberFilterValue(maxArea),minSlabsValue=numberFilterValue(minSlabs),maxSlabsValue=numberFilterValue(maxSlabs);
  const visible=products.filter(p=>{
    const text=`${p.name} ${p.code} ${p.groupName||''}`.toLowerCase();
    const dimensions=(p.dimensions||[]).join(' ').toLowerCase();
    const area=p.sqm==null||p.sqm===''?null:Number(p.sqm),slabs=p.pcs==null||p.pcs===''?null:Number(p.pcs),packingClass=packingListSummary(p).className,hasImages=Boolean(p.images?.length);
    return (currentFilter==='all'||(currentFilter==='reserved'?p.reserved:!p.reserved))&&text.includes(q)&&(!dimensionQuery||dimensions.includes(dimensionQuery))&&(minAreaValue===null||(Number.isFinite(area)&&area>=minAreaValue))&&(maxAreaValue===null||(Number.isFinite(area)&&area<=maxAreaValue))&&(minSlabsValue===null||(Number.isFinite(slabs)&&slabs>=minSlabsValue))&&(maxSlabsValue===null||(Number.isFinite(slabs)&&slabs<=maxSlabsValue))&&(packingFilter.value==='all'||packingClass===packingFilter.value)&&(mediaFilter.value==='all'||(mediaFilter.value==='with-images'?hasImages&&!p.skippedPhotoFolders?.length:!hasImages));
  });
  return visible.sort((a,b)=>sortSelect.value==='slabs'?((Number(b.pcs)||0)-(Number(a.pcs)||0)||a.name.localeCompare(b.name)):sortSelect.value==='area'?((Number(b.sqm)||0)-(Number(a.sqm)||0)||a.name.localeCompare(b.name)):a.name.localeCompare(b.name)||a.code.localeCompare(b.code));
}

function packingListSummary(product){
  if(product.syncError)return {label:t('readError'),detail:product.syncError,className:'missing'};
  if(!product.packingList)return {label:t('missing'),detail:t('noExcel'),className:'missing'};
  if(!product.lines?.length)return {label:t('fileFound'),detail:product.packingWarning||t('noReadableRows'),className:'partial'};
  const blocks=new Set(product.lines.map(line=>line.block).filter(Boolean)).size;
  return {label:t('connected'),detail:`${product.lines.length} lines${blocks?` · ${blocks} blocks`:''}`,className:'connected'};
}

function productStock(product){
  const slabs=product.pcs!=null?`${Number(product.pcs)} ${t('slabs')}`:t('countUnavailable');
  return `${slabs}${product.sqm!=null?` · ${Number(product.sqm).toFixed(2)} m²`:''}`;
}

function productDimensions(product){
  if(product.dimensions?.length)return product.dimensions.join(' · ');
  return product.packingList?t('sizesNotListed'):t('noPackingList');
}

function productMediaSummary(product){
  const images=product.images?.length||0;
  if(!images)return {label:t('missing'),detail:t('noImageAvailable'),className:'missing'};
  const skipped=product.skippedPhotoFolders?.length||0;
  return {label:`${images} ${t('views')}`,detail:skipped?`${skipped} ${t('photoFoldersSkipped')}`:t('galleryReady'),className:skipped?'partial':'connected'};
}

function deriveInventoryReport(records){
  const previous=records.filter(product=>product.packingList);
  const missingPacking=records.filter(product=>!product.packingList);
  const unreadablePacking=records.filter(product=>product.packingList&&!product.lines?.length);
  const missingImages=records.filter(product=>!product.images?.length);
  const missingAreas=records.filter(product=>product.sqm==null);
  const missingDimensions=records.filter(product=>!product.dimensions?.length);
  const skippedPhotoFolders=records.reduce((total,product)=>total+(product.skippedPhotoFolders?.length||0),0);
  return {
    bundles:records.length,
    added:0,
    updated:0,
    unchanged:previous.length,
    missingPackingLists:missingPacking.length,
    unreadablePackingLists:unreadablePacking.length,
    missingImages:missingImages.length,
    missingAreas:missingAreas.length,
    missingDimensions:missingDimensions.length,
    skippedPhotoFolders,
    folderErrors:records.filter(product=>product.syncError).length,
    warningCount:unreadablePacking.length+skippedPhotoFolders,
    missingPackingListFolders:missingPacking.map(product=>product.folderName),
    unreadablePackingListFolders:unreadablePacking.map(product=>product.folderName),
    missingImageFolders:missingImages.map(product=>product.folderName),
    missingAreaFolders:missingAreas.map(product=>product.folderName),
    missingDimensionFolders:missingDimensions.map(product=>product.folderName),
  };
}

function followupLabel(status){return t({new:'new',sent:'sent',waiting:'waiting',quoted:'quoted',closed:'closed'}[status]||'new')}
function followupFor(product){const saved=salesNotes[productKey(product)]||{};return {status:saved.status||'new',note:saved.note||'',updatedAt:saved.updatedAt||null}}
function renderInventoryHealth(){
  const missingPacking=products.filter(product=>!product.packingList),unreadablePacking=products.filter(product=>product.packingList&&!product.lines?.length),missingImages=products.filter(product=>!product.images?.length),skippedFolders=products.filter(product=>product.skippedPhotoFolders?.length),syncErrors=products.filter(product=>product.syncError),incompleteSizes=products.filter(product=>product.sqm==null||!product.dimensions?.length);
  const checks=[
    {label:t('packingList'),value:missingPacking.length,detail:t('missingPackingDetail'),className:missingPacking.length?'warning':'healthy'},
    {label:t('packingRows'),value:unreadablePacking.length,detail:t('missingPackingRowsDetail'),className:unreadablePacking.length?'warning':'healthy'},
    {label:t('sizeData'),value:incompleteSizes.length,detail:t('missingSizeDetail'),className:incompleteSizes.length?'warning':'healthy'},
    {label:t('photos'),value:missingImages.length,detail:t('missingImageDetail'),className:missingImages.length?'warning':'healthy'},
    {label:t('syncIssues'),value:syncErrors.length+skippedFolders.length,detail:t('syncErrorDetail'),className:syncErrors.length||skippedFolders.length?'warning':'healthy'},
  ];
  healthSummary.innerHTML=checks.map(check=>`<div class="health-card ${check.className}"><strong>${escapeHtml(check.value)}</strong><span>${escapeHtml(check.label)}</span><small>${escapeHtml(check.value===0?t('noIssues'):check.detail)}</small></div>`).join('');
  const issueList=(title,items,detail)=>items.length?`<section><h5>${escapeHtml(title)} <span>${items.length}</span></h5><p>${items.slice(0,8).map(product=>`<span>${escapeHtml(`${product.name}${product.code&&product.code!=='—'?` · ${product.code}`:''}`)}</span>`).join('')}${items.length>8?`<small>+ ${items.length-8} more</small>`:''}</p></section>`:`<section class="health-clear"><h5>${escapeHtml(title)}</h5><p>${escapeHtml(t('noIssues'))}</p></section>`;
  const reportLine=inventoryReport.added||inventoryReport.updated||inventoryReport.unchanged?`<section class="health-report"><h5>${escapeHtml(t('lastSync'))}</h5><p>${escapeHtml(`${t('added')}: ${inventoryReport.added||0} · ${t('updated')}: ${inventoryReport.updated||0} · ${t('unchanged')}: ${inventoryReport.unchanged||0}`)}</p></section>`:'';
  healthDetails.innerHTML=`${reportLine}${issueList(t('packingList'),missingPacking,t('missing'))}${issueList(t('packingRows'),unreadablePacking,t('missing'))}${issueList(t('sizeData'),incompleteSizes,t('missing'))}${issueList(t('photos'),missingImages,t('missing'))}${issueList(t('skippedFolders'),skippedFolders,t('missing'))}${issueList(t('syncIssues'),syncErrors,t('missing'))}`;
}

function renderSalesDashboard(visible){
  const hiddenPacking=visible.filter(product=>!product.packingList).length;
  const dashboardVisible=showMissingPackingValue?visible:visible.filter(product=>product.packingList);
  const totalSlabs=dashboardVisible.reduce((sum,product)=>sum+(Number(product.pcs)||0),0);
  const knownArea=dashboardVisible.filter(product=>product.sqm!=null);
  const totalArea=knownArea.reduce((sum,product)=>sum+Number(product.sqm||0),0);
  const connected=dashboardVisible.filter(product=>packingListSummary(product).className==='connected').length;
  exportVisibleButton.disabled=dashboardVisible.length===0;
  salesKpis.innerHTML=[
    [t('shownBundles'),dashboardVisible.length],
    [t('available'),dashboardVisible.filter(product=>!product.reserved).length],
    [t('reserved'),dashboardVisible.filter(product=>product.reserved).length],
    [t('slabs'),totalSlabs||'—'],
    [t('knownArea'),knownArea.length?`${totalArea.toFixed(2)} m²`:'—'],
    [t('packingData'),`${connected}/${dashboardVisible.length}`],
  ].map(([label,value])=>`<div class="sales-kpi"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`).join('');

  renderInventoryHealth();renderShortlistManager();
  salesFilterNote.textContent=!showMissingPackingValue&&hiddenPacking?`${hiddenPacking} bundle${hiddenPacking===1?'':'s'} without ${t('packingList').toLowerCase()} hidden from the dashboard.`:'';
  salesRows.innerHTML=dashboardVisible.map(product=>{
    const packing=packingListSummary(product);
    const media=productMediaSummary(product);
    const followup=followupFor(product);
    const driveUrl=product.folderId?`https://drive.google.com/drive/folders/${encodeURIComponent(product.folderId)}`:rootFolder;
    return `<div class="sales-row" role="row" tabindex="0" data-product-id="${escapeHtml(productKey(product))}">
      <span class="sales-product" data-label="${escapeHtml(t('productSelect'))}" role="cell"><span class="sales-product-line"><input class="shortlist-toggle" type="checkbox" ${shortlist.has(productKey(product))?'checked':''} aria-label="Add ${escapeHtml(product.name)} ${escapeHtml(product.code)} to shortlist"><strong>${escapeHtml(product.name)}</strong></span><small>${escapeHtml(product.code)}</small></span>
      <span data-label="${escapeHtml(t('status'))}" role="cell"><b class="sales-status ${product.reserved?'reserved':''}">${escapeHtml(product.reserved?t('reserved'):t('available'))}</b></span>
      <span data-label="${escapeHtml(t('stock'))}" role="cell">${escapeHtml(productStock(product))}</span>
      <span class="sales-dimensions" data-label="${escapeHtml(t('sizes'))}" role="cell">${escapeHtml(productDimensions(product))}</span>
      <span class="sales-packing ${packing.className}" data-label="${escapeHtml(t('packingList'))}" role="cell"><b>${escapeHtml(packing.label)}</b><small>${escapeHtml(packing.detail)}</small></span>
      <span class="sales-packing ${media.className}" data-label="${escapeHtml(t('media'))}" role="cell"><b>${escapeHtml(media.label)}</b><small>${escapeHtml(media.detail)}</small></span>
      <span class="sales-followup-cell" data-label="${escapeHtml(t('followUp'))}" role="cell"><b class="followup-status ${escapeHtml(followup.status)}">${escapeHtml(followupLabel(followup.status))}</b><small>${escapeHtml(followup.note||t('noNote'))}</small></span>
      <a class="sales-source" data-label="${escapeHtml(t('source'))}" role="cell" href="${escapeHtml(driveUrl)}" target="_blank" rel="noreferrer">${escapeHtml(t('source'))} ↗</a>
    </div>`;
  }).join('');
  salesRows.querySelectorAll('.sales-row').forEach(row=>{
    const checkbox=row.querySelector('.shortlist-toggle');
    checkbox?.addEventListener('click',event=>event.stopPropagation());
    checkbox?.addEventListener('change',event=>toggleShortlist(row.dataset.productId,event.currentTarget.checked));
    row.addEventListener('click',event=>{if(!event.target.closest('a,button,input,label'))openProduct(row.dataset.productId)});
    row.addEventListener('keydown',event=>{if(event.key==='Enter'&&!event.target.closest('a,button,input,label'))openProduct(row.dataset.productId)});
  });
  updateShortlistControls();
}

function saveShortlist(){
  shortlistLists[activeShortlistName]=[...shortlist];
  try{localStorage.setItem('lucraShortlists',JSON.stringify({active:activeShortlistName,lists:shortlistLists}));localStorage.setItem('lucraShortlist',JSON.stringify([...shortlist]))}catch(error){}
}
function renderShortlistManager(){
  const names=Object.keys(shortlistLists);
  if(!names.length){shortlistLists[activeShortlistName]=[];names.push(activeShortlistName)}
  shortlistSelect.innerHTML=names.map(name=>`<option value="${escapeHtml(name)}">${escapeHtml(name)}</option>`).join('');shortlistSelect.value=activeShortlistName;
  renameShortlistButton.disabled=!activeShortlistName;deleteShortlistButton.disabled=names.length<2;
}
function switchShortlist(name){
  if(!shortlistLists[name]||name===activeShortlistName)return;
  saveShortlist();activeShortlistName=name;shortlist=new Set(shortlistLists[name]);saveShortlist();render();
}
function createShortlist(){
  const requested=window.prompt(t('listName'),t('newList'));if(!requested)return;let name=requested.trim();if(!name)return;
  let suffix=2,base=name;while(shortlistLists[name])name=`${base} ${suffix++}`;
  saveShortlist();shortlistLists[name]=[];activeShortlistName=name;shortlist=new Set();saveShortlist();render();
}
function renameShortlist(){
  const requested=window.prompt(t('listName'),activeShortlistName);if(!requested)return;const name=requested.trim();if(!name||name===activeShortlistName)return;
  if(shortlistLists[name]&&!window.confirm(`${name} already exists. Replace it?`))return;
  saveShortlist();shortlistLists[name]=shortlistLists[activeShortlistName]||[];delete shortlistLists[activeShortlistName];activeShortlistName=name;saveShortlist();render();
}
function deleteShortlist(){
  const names=Object.keys(shortlistLists);if(names.length<2)return;if(!window.confirm(`${t('delete')} “${activeShortlistName}”?`))return;
  delete shortlistLists[activeShortlistName];activeShortlistName=Object.keys(shortlistLists)[0];shortlist=new Set(shortlistLists[activeShortlistName]||[]);saveShortlist();render();
}
function selectedProducts(){return products.filter(product=>shortlist.has(productKey(product)))}
function pruneShortlist(){
  const valid=new Set(products.map(product=>productKey(product)));let changed=false;
  shortlist.forEach(key=>{if(!valid.has(key)){shortlist.delete(key);changed=true}});
  if(changed)saveShortlist();
}
function toggleShortlist(id,selected){if(selected)shortlist.add(id);else shortlist.delete(id);saveShortlist();render()}
function updateShortlistControls(){
  const selected=selectedProducts();
  shortlistCount.textContent=`${selected.length} selected`;
  compareSelectedButton.disabled=selected.length<2;
  copyShortlistButton.disabled=selected.length===0;
  whatsappShortlistButton.disabled=selected.length===0;
  exportShortlistButton.disabled=selected.length===0;
  clearShortlistButton.disabled=selected.length===0;
}
function productDriveUrl(product){return product.folderId?`https://drive.google.com/drive/folders/${encodeURIComponent(product.folderId)}`:rootFolder}
function customerProductUrl(product){return `${location.href.split('#')[0]}#bundle-${encodeURIComponent(productKey(product))}`}
function productSummary(product){
  const packing=packingListSummary(product),media=productMediaSummary(product);
  return `${product.name} ${product.code} — ${product.reserved?'Reserved':'Available'}\nStock: ${productStock(product)}\nSizes: ${productDimensions(product)}\nPacking list: ${packing.label} (${packing.detail})\nMedia: ${media.label} (${media.detail})\nDrive: ${productDriveUrl(product)}`;
}
function shortlistSummary(title='Lucra Marble shortlist'){
  return [title,...selectedProducts().map((product,index)=>`${index+1}. ${productSummary(product)}`)].join('\n\n');
}
function customerProductSummary(product){
  const code=product.code&&product.code!=='—'?` (${product.code})`:'';
  const stock=product.pcs!=null?`${Number(product.pcs)} slabs`:'Bundle details available on request';
  const area=product.sqm!=null?` · ${Number(product.sqm).toFixed(2)} m²`:'';
  const dimensions=product.dimensions?.length?`Sizes: ${productDimensions(product)}`:'';
  return [
    `Lucra Marble · ${product.name}${code}`,
    product.reserved?'Currently reserved':'Available',
    `Stock: ${stock}${area}`,
    dimensions,
    'Location: Denizli, Türkiye',
    `Photos & details: ${customerProductUrl(product)}`,
    `Google Drive folder: ${productDriveUrl(product)}`,
  ].filter(Boolean).join('\n');
}
function customerShortlistSummary(){
  return [
    'Lucra Marble · Selected stone options',
    '',
    ...selectedProducts().map((product,index)=>`${index+1}. ${customerProductSummary(product)}`),
    '',
    'Please contact us for pricing, availability confirmation, and delivery information.',
  ].join('\n\n');
}
async function copyText(text,button,successText){
  const original=button.textContent;
  try{
    if(!navigator.clipboard?.writeText)throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(text);button.textContent=successText;
  }catch(error){window.prompt('Copy this summary',text);button.textContent='Summary ready'}
  setTimeout(()=>button.textContent=original,1600);
}
function openWhatsApp(text){window.open(`https://wa.me/?text=${encodeURIComponent(text)}`,'_blank','noopener,noreferrer')}
function renderCompare(){
  const selected=selectedProducts();
  compareContent.innerHTML=`<div class="compare-table-wrap"><table class="compare-table"><thead><tr><th>${escapeHtml(t('bundle'))}</th><th>${escapeHtml(t('status'))}</th><th>${escapeHtml(t('stock'))}</th><th>${escapeHtml(t('sizes'))}</th><th>${escapeHtml(t('packingList'))}</th><th>${escapeHtml(t('media'))}</th></tr></thead><tbody>${selected.map(product=>{
    const packing=packingListSummary(product),media=productMediaSummary(product);
    return `<tr><th><strong>${escapeHtml(product.name)}</strong><small>${escapeHtml(product.code)}</small></th><td><b class="sales-status ${product.reserved?'reserved':''}">${escapeHtml(product.reserved?t('reserved'):t('available'))}</b></td><td>${escapeHtml(productStock(product))}</td><td>${escapeHtml(productDimensions(product))}</td><td><b class="compare-status ${packing.className}">${escapeHtml(packing.label)}</b><small>${escapeHtml(packing.detail)}</small></td><td><b class="compare-status ${media.className}">${escapeHtml(media.label)}</b><small>${escapeHtml(media.detail)}</small></td></tr>`;
  }).join('')}</tbody></table></div>`;
}
function csvCell(value){return `"${String(value??'').replace(/"/g,'""')}"`}
function downloadProducts(records,filePrefix){
  const rows=[['Product','Code','Status','Stock','Dimensions','Packing list','Packing detail','Media','Media detail','Drive URL'],...records.map(product=>{
    const packing=packingListSummary(product),media=productMediaSummary(product);
    return [product.name,product.code,product.reserved?'Reserved':'Available',productStock(product),productDimensions(product),packing.label,packing.detail,media.label,media.detail,productDriveUrl(product)];
  })];
  const csv=`\ufeff${rows.map(row=>row.map(csvCell).join(',')).join('\n')}`;
  const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));
  const link=document.createElement('a');link.href=url;link.download=`${filePrefix}-${new Date().toISOString().slice(0,10)}.csv`;document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function downloadShortlist(){downloadProducts(selectedProducts(),'lucra-shortlist')}
function downloadVisible(){
  const visible=filteredProducts();
  const records=showMissingPackingValue?visible:visible.filter(product=>product.packingList);
  downloadProducts(records,'lucra-inventory-view');
}
async function shareCustomerProduct(){
  if(!currentProduct)return;
  const summary=customerProductSummary(currentProduct),url=customerProductUrl(currentProduct);
  if(navigator.share){
    try{await navigator.share({title:`Lucra Marble · ${currentProduct.name}`,text:summary,url});return}catch(error){if(error?.name==='AbortError')return}
  }
  await copyText(summary,shareProductButton,t('copied'));
}
function printProductSheet(){
  if(!currentProduct)return;
  const printWindow=window.open('','_blank');
  if(!printWindow){syncFeedback.textContent='The print window was blocked. Allow pop-ups for this site and try again.';return}
  const product=currentProduct,packing=packingListSummary(product),media=productMediaSummary(product);
  const lineRows=(product.lines||[]).map(line=>typeof line==='string'?`<li>${escapeHtml(line)}</li>`:`<li>${escapeHtml(line.block||'Additional size')} · ${escapeHtml(`${line.pcs??'—'} pcs · ${line.widthCm??'—'} × ${line.heightCm??'—'} cm · ${line.sqm??'—'} m²`)}</li>`).join('');
  const image=product.images?.[0]?.src?`<img src="${escapeHtml(product.images[0].src)}" alt="${escapeHtml(product.name)} slab">`:'';
  printWindow.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>${escapeHtml(product.name)} ${escapeHtml(product.code)} · Lucra Marble</title><style>body{font-family:Arial,sans-serif;color:#17222c;margin:40px;max-width:900px}header{display:flex;justify-content:space-between;align-items:start;border-bottom:2px solid #17222c;padding-bottom:18px;margin-bottom:24px}h1{font-size:30px;margin:0 0 8px}h2{font-size:15px;margin:28px 0 10px;text-transform:uppercase;letter-spacing:.08em}p{color:#5d6a72}img{display:block;width:100%;max-height:420px;object-fit:contain;background:#eef3f4;margin:20px 0}dl{display:grid;grid-template-columns:160px 1fr;gap:10px;border-top:1px solid #dce5e9;padding-top:16px}dt{color:#6b7780}dd{margin:0;font-weight:600}li{margin:7px 0;color:#42515a}small{color:#6b7780}@media print{body{margin:20px}}</style></head><body><header><div><small>LUCRA MARBLE · DENIZLI, TÜRKİYE</small><h1>${escapeHtml(product.name)}</h1><p>${escapeHtml(product.code)} · ${product.reserved?'Reserved':'Available'}</p></div><strong>Inventory sheet</strong></header>${image}<dl><dt>Stock</dt><dd>${escapeHtml(productStock(product))}</dd><dt>Dimensions</dt><dd>${escapeHtml(productDimensions(product))}</dd><dt>Packing list</dt><dd>${escapeHtml(packing.label)} · ${escapeHtml(packing.detail)}</dd><dt>Media</dt><dd>${escapeHtml(media.label)} · ${escapeHtml(media.detail)}</dd><dt>Source</dt><dd>${escapeHtml(productDriveUrl(product))}</dd></dl>${lineRows?`<h2>Packing-list lines</h2><ul>${lineRows}</ul>`:''}<p><small>Generated from the Lucra Marble inventory catalogue.</small></p></body></html>`);
  printWindow.document.close();printWindow.focus();setTimeout(()=>printWindow.print(),350);
}

function render(){
  const visible=filteredProducts();
  count.textContent=`${visible.length} ${visible.length===1?t('bundleSingular'):t('bundles')}`;
  empty.hidden=visible.length>0;
  renderSalesDashboard(visible);
  grid.innerHTML=visible.map((p,index)=>`<article class="card" tabindex="0" data-product-id="${escapeHtml(productKey(p))}">
    <div class="card-image"><div class="stone-placeholder" style="--stone:${p.stone}"></div>${p.images.length?`<img src="${escapeHtml(p.images[0].src)}" alt="${escapeHtml(p.name)} slab" loading="${index<2?'eager':'lazy'}" fetchpriority="${index<2?'high':'low'}" decoding="async" onload="this.classList.add('loaded')" onerror="this.remove();this.closest('.card-image').classList.add('image-error')"><span class="image-error-badge">${escapeHtml(t('imageLoadFailed'))}</span>`:''}
      <span class="status-badge ${p.reserved?'reserved':''}">${escapeHtml(p.reserved?t('reserved'):t('available'))}</span>${p.media?`<span class="media-badge">${escapeHtml(p.media)}</span>`:''}</div>
    <div class="card-info"><div><h3>${escapeHtml(p.name)}</h3><p class="card-meta">${p.pcs?escapeHtml(productStock(p)):p.packingList?escapeHtml(t('seePackingList')):escapeHtml(t('galleryAvailable'))}</p></div><span class="card-code">${escapeHtml(p.code)}</span></div>
  </article>`).join('');
  grid.querySelectorAll('.card').forEach(card=>{card.addEventListener('click',()=>openProduct(card.dataset.productId));card.addEventListener('keydown',e=>{if(e.key==='Enter')openProduct(card.dataset.productId)})});
}

document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{document.querySelector('.filter.active').classList.remove('active');btn.classList.add('active');currentFilter=btn.dataset.filter;render()}));
search.addEventListener('input',render);
sortSelect.addEventListener('change',render);
[minArea,maxArea,minSlabs,maxSlabs,dimensionFilter,packingFilter,mediaFilter].forEach(input=>input.addEventListener(input.tagName==='SELECT'?'change':'input',render));
clearFiltersButton.addEventListener('click',()=>{minArea.value='';maxArea.value='';minSlabs.value='';maxSlabs.value='';dimensionFilter.value='';packingFilter.value='all';mediaFilter.value='all';render()});
advancedFiltersToggle.addEventListener('click',()=>{const open=document.body.classList.toggle('filters-open');advancedFiltersToggle.setAttribute('aria-expanded',String(open));advancedFiltersToggle.querySelector('[data-i18n]').textContent=t(open?'hideFilters':'moreFilters');advancedFiltersToggle.lastElementChild.textContent=open?'⌃':'⌄'});
showMissingPacking.addEventListener('change',event=>{showMissingPackingValue=event.currentTarget.checked;try{localStorage.setItem('lucraShowMissingPacking',showMissingPackingValue?'1':'0')}catch(error){}render()});
shortlistSelect.addEventListener('change',event=>switchShortlist(event.currentTarget.value));
newShortlistButton.addEventListener('click',createShortlist);renameShortlistButton.addEventListener('click',renameShortlist);deleteShortlistButton.addEventListener('click',deleteShortlist);
toggleHealthButton.addEventListener('click',()=>{const expanded=!healthDetails.hidden;healthDetails.hidden=expanded;toggleHealthButton.setAttribute('aria-expanded',String(!expanded));toggleHealthButton.textContent=!expanded?t('hideDetails'):t('showDetails')});
document.querySelector('#languageSwitch').addEventListener('click',()=>{language=language==='en'?'tr':'en';try{localStorage.setItem('lucraLanguage',language)}catch(error){}applyLanguage();render();if(currentProduct&&dialog.open)openProduct(productKey(currentProduct))});
function setSalesMode(enabled){document.body.classList.toggle('sales-mode',enabled);document.querySelector('#modeLabel').textContent=enabled?t('salesMode'):t('presentationMode');render()}
let salesUnlocked=false;
try{salesUnlocked=sessionStorage.getItem('lucraSalesUnlocked')==='1'}catch(error){}
document.querySelector('#modeSwitch').addEventListener('click',()=>{
  const entering=!document.body.classList.contains('sales-mode');
  if(!entering){setSalesMode(false);return}
  if(salesUnlocked){setSalesMode(true);return}
  salesGateError.textContent='';salesPasswordInput.value='';salesGate.showModal();setTimeout(()=>salesPasswordInput.focus(),50);
});
salesGateForm.addEventListener('submit',event=>{
  event.preventDefault();
  if(salesPasswordInput.value===salesPassword){
    salesUnlocked=true;try{sessionStorage.setItem('lucraSalesUnlocked','1')}catch(error){}
    salesGate.close();setSalesMode(true);
  }else{salesGateError.textContent='That password is not correct.';salesPasswordInput.select()}
});
document.querySelector('#cancelSalesAccess').addEventListener('click',()=>salesGate.close());
compareSelectedButton.addEventListener('click',()=>{renderCompare();compareDialog.showModal()});
copyShortlistButton.addEventListener('click',()=>copyText(shortlistSummary(),copyShortlistButton,'Copied'));
whatsappShortlistButton.addEventListener('click',()=>openWhatsApp(customerShortlistSummary()));
exportShortlistButton.addEventListener('click',downloadShortlist);
exportVisibleButton.addEventListener('click',downloadVisible);
clearShortlistButton.addEventListener('click',()=>{shortlist.clear();saveShortlist();render()});
saveSalesNoteButton.addEventListener('click',()=>{if(!currentProduct)return;salesNotes[productKey(currentProduct)]={status:followupStatus.value,note:salesNote.value.trim(),updatedAt:new Date().toISOString()};try{localStorage.setItem('lucraSalesNotes',JSON.stringify(salesNotes))}catch(error){}noteSaved.textContent=t('saved');setTimeout(()=>noteSaved.textContent='',1600);renderSalesDashboard(filteredProducts())});

const dialog=document.querySelector('#productDialog');
const galleryImage=document.querySelector('#dialogImage'), galleryHint=document.querySelector('#galleryHint'), galleryZoomButton=document.querySelector('#galleryZoom'), galleryExpandButton=document.querySelector('#galleryExpand');
let galleryPanX=0, galleryPanY=0, galleryPanning=false, galleryPanStart=null;
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
  document.querySelector('#openDrive').href=productDriveUrl(currentProduct);
  const followup=followupFor(currentProduct);
  followupStatus.value=followup.status;
  salesNote.value=followup.note;
  noteSaved.textContent='';
  updateGallery(); dialog.showModal();
}
function updateGallery(){
  const img=galleryImage;
  const selected=currentProduct.images[imageIndex];
  const slabLabel=selected?.label??'';
  galleryPanX=0;galleryPanY=0;img.classList.remove('zoomed','panning');img.style.transform='';galleryZoomButton.textContent='＋ Zoom';
  galleryHint.hidden=currentProduct.images.length>0;galleryHint.textContent=currentProduct.images.length?'':'No image is available for this bundle.';
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
galleryImage.addEventListener('error',()=>{galleryHint.hidden=false;galleryHint.textContent='This image is unavailable from the public Drive folder.'});
function applyGalleryTransform(){galleryImage.style.transform=galleryImage.classList.contains('zoomed')?`translate(${galleryPanX}px, ${galleryPanY}px) scale(1.55)`:''}
function toggleGalleryZoom(){if(!currentProduct?.images.length)return;const zoomed=galleryImage.classList.toggle('zoomed');if(!zoomed){galleryPanX=0;galleryPanY=0}galleryZoomButton.textContent=zoomed?'− Reset zoom':'＋ Zoom';applyGalleryTransform()}
galleryImage.addEventListener('dblclick',toggleGalleryZoom);
galleryZoomButton.addEventListener('click',toggleGalleryZoom);
galleryImage.addEventListener('dragstart',event=>event.preventDefault());
galleryImage.addEventListener('pointerdown',event=>{if(!galleryImage.classList.contains('zoomed'))return;event.preventDefault();galleryPanning=true;galleryPanStart={x:event.clientX,y:event.clientY,panX:galleryPanX,panY:galleryPanY};galleryImage.classList.add('panning');galleryImage.setPointerCapture?.(event.pointerId)});
galleryImage.addEventListener('pointermove',event=>{if(!galleryPanning||!galleryPanStart)return;galleryPanX=galleryPanStart.panX+event.clientX-galleryPanStart.x;galleryPanY=galleryPanStart.panY+event.clientY-galleryPanStart.y;applyGalleryTransform()});
function stopGalleryPan(){galleryPanning=false;galleryPanStart=null;galleryImage.classList.remove('panning')}
galleryImage.addEventListener('pointerup',stopGalleryPan);galleryImage.addEventListener('pointercancel',stopGalleryPan);galleryImage.addEventListener('pointerleave',event=>{if(galleryPanning&&!galleryImage.hasPointerCapture?.(event.pointerId))stopGalleryPan()});
galleryExpandButton.addEventListener('click',()=>{dialog.classList.toggle('gallery-focus');galleryExpandButton.textContent=dialog.classList.contains('gallery-focus')?'⤡ Exit fullscreen':'⤢ Fullscreen'});
dialog.addEventListener('keydown',event=>{if(!dialog.open||event.target.matches('input,textarea,select'))return;if(event.key==='ArrowLeft'&&currentProduct?.images.length){event.preventDefault();imageIndex=(imageIndex-1+currentProduct.images.length)%currentProduct.images.length;updateGallery()}if(event.key==='ArrowRight'&&currentProduct?.images.length){event.preventDefault();imageIndex=(imageIndex+1)%currentProduct.images.length;updateGallery()}if(event.key.toLowerCase()==='z'){event.preventDefault();toggleGalleryZoom()}});
dialog.addEventListener('close',()=>{dialog.classList.remove('gallery-focus');galleryExpandButton.textContent='⤢ Fullscreen';galleryPanX=0;galleryPanY=0;galleryImage.classList.remove('zoomed','panning');galleryImage.style.transform='';galleryZoomButton.textContent='＋ Zoom'});
document.querySelector('#copyLink').addEventListener('click',async(e)=>{const url=`${location.href.split('#')[0]}#bundle-${encodeURIComponent(productKey(currentProduct))}`;await navigator.clipboard.writeText(url);e.currentTarget.textContent='Link copied';setTimeout(()=>e.currentTarget.textContent='Copy bundle link',1400)});
shareProductButton.addEventListener('click',shareCustomerProduct);
document.querySelector('#printProduct').addEventListener('click',()=>printProductSheet());
document.querySelector('#whatsappProduct').addEventListener('click',()=>openWhatsApp(customerProductSummary(currentProduct)));
document.querySelector('#compareClose').addEventListener('click',()=>compareDialog.close());
document.querySelector('#closeCompare').addEventListener('click',()=>compareDialog.close());
document.querySelector('#copyCompare').addEventListener('click',()=>copyText(shortlistSummary('Lucra Marble comparison'),copyCompareButton,'Copied'));
compareDialog.addEventListener('click',event=>{if(event.target===compareDialog)compareDialog.close()});

function normalizeLiveProduct(p,i){
  const mediaUrl=fileId=>location.protocol==='file:'||isGithubPages?`https://drive.google.com/thumbnail?id=${encodeURIComponent(fileId)}&sz=w1400`:`/api/media?id=${encodeURIComponent(fileId)}`;
  const slabImages=(p.images||[]).map(image=>({src:mediaUrl(image.fileId),label:String(image.label??image.number),type:'slab'}));
  const extras=(p.extraImages||[]).map(image=>({src:mediaUrl(image.fileId),label:image.label||'Detail',type:'extra'}));
  return {...p,size:p.dimensions?.length?(p.dimensions.length===1?p.dimensions[0]:`${p.dimensions[0]} + ${p.dimensions.length-1} sizes`):'See packing list',images:[...slabImages,...extras],stone:stones[i%stones.length],media:[slabImages.length?`${slabImages.length} slabs`:null,extras.length?`${extras.length} extra views`:null,p.videos?.length?`${p.videos.length} video`:null].filter(Boolean).join(' · ')};
}

function syncSummary(data){
  const warnings=data.warnings||[], errors=data.errors||[];
  const report=data.report||{};
  const summary=[`${data.count??data.products?.length??0} bundles`];
  if(report.added||report.updated)summary.push(`+${report.added||0} new · ${report.updated||0} updated`);
  if(report.missingPackingLists)summary.push(`${report.missingPackingLists} without packing list`);
  if(report.unreadablePackingLists)summary.push(`${report.unreadablePackingLists} unreadable packing file${report.unreadablePackingLists===1?'':'s'}`);
  if(report.missingAreas)summary.push(`${report.missingAreas} without area`);
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
      const response=await fetch(`data/inventory.json?ts=${Date.now()}`);
      if(!response.ok)throw new Error('No synced inventory');
      data=await response.json();
    }
    products=assignBundleKeys((data.products||[]).map(normalizeLiveProduct));pruneShortlist();inventoryReport=data.report&&Object.keys(data.report).length?data.report:deriveInventoryReport(products);syncedAt=data.syncedAt;
    syncStatus.innerHTML=`<i></i> ${products.length} bundles · ${new Date(syncedAt).toLocaleDateString()}`;
    setSyncFeedback({...data,count:products.length},location.protocol==='file:'?'Local snapshot':isGithubPages?'Last published sync':'Last sync');
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
  if(isGithubPages){
    window.open(actionsWorkflowUrl,'_blank','noopener');
    syncFeedback.textContent='GitHub Actions opened. Choose “Run workflow” to sync Drive; this page will update after GitHub Pages redeploys.';
    return;
  }
  if(location.protocol==='file:'){
    syncFeedback.textContent='Drive sync needs the local server. This HTML is showing the last synced snapshot.';
    return;
  }
  button.disabled=true;button.textContent='Syncing…';syncStatus.innerHTML='<i></i> Reading Drive';syncStatus.title='';syncFeedback.textContent='Syncing: reading the public Drive folder and packing lists…';
  try{const response=await fetch('/api/sync',{method:'POST'});const result=await response.json();if(!result.ok)throw new Error(result.error||'The Drive sync failed');await loadInventory();setSyncFeedback(result);button.textContent=`Synced ${result.count} bundles`;setTimeout(()=>button.textContent='↻ Sync from Drive',1800)}catch(error){const message=error instanceof Error?error.message:String(error);button.textContent='Sync failed';syncStatus.innerHTML='<i></i> Sync failed';syncStatus.title=message;syncFeedback.textContent=`Sync failed: ${message}. The previous catalogue remains available.`;setTimeout(()=>button.textContent='↻ Try again',1800)}finally{button.disabled=false}
});
applyLanguage();
loadInventory().then(openHashProduct);
