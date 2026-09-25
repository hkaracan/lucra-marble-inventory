const rootFolder = 'https://drive.google.com/drive/folders/17u1Vo3es5lO07Z0__mfu5ugXCOaTkf4Z?usp=drive_link';
const actionsWorkflowUrl = 'https://github.com/hkaracan/lucra-marble-inventory/actions/workflows/sync-inventory.yml';
const publicSiteBase = 'https://hkaracan.github.io/lucra-marble-inventory/';
const isGithubPages = /(^|\.)github\.io$/.test(location.hostname);
const salesPassword = 'lucra123';
const lucraQuoteEmail = 'emine@lucramarble.com';
const lucraWhatsAppUrl = 'https://wa.me/905062288586';
const names = [
  'Alaskan Blue K2970','Alexander Black K4987','Arabescato Imperiale K6235','Bianco Dolomite L1011','Breccia Montagna K3332','Bruno Perla K6029','Cafe Amore K6058','Ceppo Beige K5567','Ceppo Beige K6086','Ceppo Grey K3630','Crema Luna K6131','Diamond Grey M2878','Flinders White','Golden Roots K5080','Green Olive K3618','Ice Bloom K4132','Invisible Blue K3280','Karmania Traonyx K5809','Lilac Extra K3619','Marmara Equator K3514','MoonLight Grey K5147','Naturella K5171','Nebula Wave L1009','Nimbus White Veincut K6169','Polar White K6089','Porto Rosa L006','Red Jasper L1010','Red Travertine K5094','Reserved Velluto Onyx K3947','Rosso Levanto K6222','Rosso Levanto L1013','Rosso Levanto L1014','Silver Travertine Ham (Raw) K5301','Sunset Dolomite New','Terranova Ceppo K6044','Travertine L009','Tundra Grey','Van Gogh K3229','Vanilla Ice K5372','Vanilla K6130','Velluto Onyx Cross Cut K3653','Verde Levanto K5420'
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
Object.assign(translations.en,{justIn:'Just in',newBundle:'New',newest:'New to old',oldest:'Old to new',recentlyAdded:'Recently added',areaAndSizeNotListed:'Area and dimensions not listed',photoVerification:'Image verification',photoVerificationDetail:'images checked by this browser since the catalogue loaded',photoVerificationNotStarted:'No browser image checks yet'});
Object.assign(translations.tr,{justIn:'Yeni geldi',newBundle:'Yeni'});
Object.assign(translations.en,{auditEyebrow:'SYNC AUDIT',syncAudit:'Sync audit',syncAuditHint:'Review each product’s packing list, area, dimensions, photos, and sync status.',openAudit:'Open audit',hideAudit:'Hide audit',auditFilter:'Show',auditAll:'All products',auditAttention:'Needs attention',auditNoPacking:'No packing list',auditSize:'Missing area / size',auditImages:'Missing images',auditImageCheck:'Image count mismatch',auditWarnings:'Sync warnings',exportAudit:'Export audit CSV',auditAreaSize:'Area / size',auditSync:'Sync',auditNoResults:'No products match this audit filter.',complete:'Complete',partial:'Partial',notProvided:'Not provided',clean:'Clean',ready:'Ready',imageChecks:'Image checks',imageMismatchDetail:'bundles where numbered photos differ from slab count',reviewImages:'Review numbered photos',slabPhotos:'slab photos',missingNumbers:'Missing numbers',expected:'Expected',followupFilter:'Follow-up',allFollowups:'All follow-up statuses',copyCustomerLink:'Copy customer link',customerLinkCopied:'Customer link copied',packingHiddenNote:'bundles without packing lists hidden',followupHiddenNote:'bundles hidden by follow-up filter',sharedSelection:'SHARED SELECTION',sharedSelectionHint:'A curated selection from Lucra Marble.',showAllBundles:'Show all bundles',shareSelection:'Share selection link',selectionShared:'Selection link copied',sharedCollectionEmpty:'No shared bundles are available'});
Object.assign(translations.tr,{auditEyebrow:'SENKRONİZASYON DENETİMİ',syncAudit:'Senkronizasyon denetimi',syncAuditHint:'Her ürünün paket listesini, alanını, ölçülerini, fotoğraflarını ve senkronizasyon durumunu inceleyin.',openAudit:'Denetimi aç',hideAudit:'Denetimi gizle',auditFilter:'Göster',auditAll:'Tüm ürünler',auditAttention:'İlgilenilmeli',auditNoPacking:'Paket listesi yok',auditSize:'Alan / ölçü eksik',auditImages:'Fotoğraf eksik',auditImageCheck:'Fotoğraf sayısı uyuşmuyor',auditWarnings:'Senkronizasyon uyarıları',exportAudit:'Denetimi CSV aktar',auditAreaSize:'Alan / ölçü',auditSync:'Senkronizasyon',auditNoResults:'Bu denetim filtresiyle eşleşen ürün yok.',complete:'Tamam',partial:'Kısmi',notProvided:'Belirtilmedi',clean:'Temiz',ready:'Hazır',imageChecks:'Fotoğraf kontrolleri',imageMismatchDetail:'numaralı fotoğrafı plaka adedinden farklı olan demet',reviewImages:'Numaralı fotoğrafları kontrol edin',slabPhotos:'plaka fotoğrafı',missingNumbers:'Eksik numaralar',expected:'Beklenen',followupFilter:'Takip',allFollowups:'Tüm takip durumları',copyCustomerLink:'Müşteri bağlantısını kopyala',customerLinkCopied:'Müşteri bağlantısı kopyalandı',packingHiddenNote:'paket listesi olmayan demet gizlendi',followupHiddenNote:'demet takip filtresiyle gizlendi',sharedSelection:'PAYLAŞILAN SEÇİM',sharedSelectionHint:'Lucra Marble’dan seçilmiş ürünler.',showAllBundles:'Tüm demetleri göster',shareSelection:'Seçim bağlantısını paylaş',selectionShared:'Seçim bağlantısı kopyalandı',sharedCollectionEmpty:'Paylaşılan demet bulunamadı'});
let language='en';
Object.assign(translations.en,{printSheet:'Print bundle sheet',selectedViews:'Selected views',fullGallery:'View full gallery',bundleSheet:'Bundle sheet',sizeDetailsNotListed:'Size details not listed'});
Object.assign(translations.tr,{printSheet:'Demet sayfasını yazdır',selectedViews:'Seçili görseller',fullGallery:'Tam galeriyi görüntüle',bundleSheet:'Demet sayfası',sizeDetailsNotListed:'Ölçü ayrıntıları listelenmedi'});
Object.assign(translations.en,{customerCollection:'CUSTOMER COLLECTION',customerCollectionHint:'Create a short list to share or print for a customer.',selectedBundles:'bundles selected',addToCollection:'Add to collection',removeFromCollection:'Remove from collection',printCollection:'Print collection',collectionSheet:'Customer collection',collectionIntro:'A curated selection from Lucra Marble.',onlineGallery:'Online gallery'});
Object.assign(translations.tr,{customerCollection:'MÜŞTERİ KOLEKSİYONU',customerCollectionHint:'Müşteriyle paylaşmak veya yazdırmak için kısa bir seçim oluşturun.',selectedBundles:'demet seçildi',addToCollection:'Koleksiyona ekle',removeFromCollection:'Koleksiyondan çıkar',printCollection:'Koleksiyonu yazdır',collectionSheet:'Müşteri koleksiyonu',collectionIntro:'Lucra Marble’dan seçilmiş ürünler.',onlineGallery:'Çevrim içi galeri'});
Object.assign(translations.en,{scanToView:'Scan to view online'});
Object.assign(translations.tr,{scanToView:'Çevrim içi görüntülemek için tarayın'});
Object.assign(translations.en,{collectionTitleLabel:'Collection title',collectionTitlePlaceholder:'Optional project or customer name',whatsappCollection:'Send via WhatsApp',lastUpdated:'Last updated',availabilityNote:'Availability and pricing are subject to confirmation.'});
Object.assign(translations.tr,{collectionTitleLabel:'Koleksiyon başlığı',collectionTitlePlaceholder:'İsteğe bağlı proje veya müşteri adı',whatsappCollection:'WhatsApp ile gönder',lastUpdated:'Son güncelleme',availabilityNote:'Uygunluk ve fiyat teyide tabidir.'});
Object.assign(translations.en,{copyCollectionLink:'Copy collection link',collectionLinkCopied:'Collection link copied'});
Object.assign(translations.tr,{copyCollectionLink:'Koleksiyon bağlantısını kopyala',collectionLinkCopied:'Koleksiyon bağlantısı kopyalandı'});
Object.assign(translations.en,{customerCollection:'YOUR LIST',customerCollectionHint:'Create a list to share or print for a customer.',addToCollection:'Add to list',removeFromCollection:'Remove from list',printCollection:'Print list',collectionSheet:'Customer list',collectionIntro:'A saved list from Lucra Marble.',collectionTitleLabel:'List title',whatsappCollection:'Send list via WhatsApp',copyCollectionLink:'Copy list link',collectionLinkCopied:'List link copied',sharedSelection:'SHARED LIST',sharedSelectionHint:'A shared list from Lucra Marble.',shareSelection:'Share list link',selectionShared:'List link copied'});
Object.assign(translations.tr,{customerCollection:'LİSTENİZ',customerCollectionHint:'Müşteriyle paylaşmak veya yazdırmak için bir liste oluşturun.',addToCollection:'Listeye ekle',removeFromCollection:'Listeden çıkar',printCollection:'Listeyi yazdır',collectionSheet:'Müşteri listesi',collectionIntro:'Lucra Marble’dan kaydedilmiş liste.',collectionTitleLabel:'Liste başlığı',whatsappCollection:'Listeyi WhatsApp ile gönder',copyCollectionLink:'Liste bağlantısını kopyala',collectionLinkCopied:'Liste bağlantısı kopyalandı',sharedSelection:'PAYLAŞILAN LİSTE',sharedSelectionHint:'Lucra Marble’dan paylaşılan liste.',shareSelection:'Liste bağlantısını paylaş',selectionShared:'Liste bağlantısı kopyalandı'});
Object.assign(translations.en,{approxWeight:'Approx. weight',weightNotAvailable:'Weight unavailable',weightAssumption:'Estimated using 58 kg/m²; actual weight may vary.',weightUnavailableReason:'Weight unavailable because area is not listed.',surfaceType:'Surface',surfaceNotListed:'Not listed',requestQuote:'Request a quote',askLucraWhatsApp:'Ask Lucra on WhatsApp',quoteRequestSubject:'Quote request',quoteRequestReady:'Quote request ready'});
Object.assign(translations.en,{customerCta:'Need current pricing or availability? Request a quote or ask Lucra on WhatsApp.'});
Object.assign(translations.tr,{approxWeight:'Yaklaşık ağırlık',weightNotAvailable:'Belirtilmedi'});
Object.assign(translations.en,{whatsappCustomer:'Send via WhatsApp'});
Object.assign(translations.tr,{whatsappCustomer:'WhatsApp ile gönder'});
Object.assign(translations.en,{slabPhotos:'slab photos'});
Object.assign(translations.tr,{slabPhotos:'plaka fotoğrafı'});
Object.assign(translations.en,{photo:'Photo',of:'of',previousPhoto:'Previous photo',nextPhoto:'Next photo',previousSlab:'Previous slab',nextSlab:'Next slab'});
Object.assign(translations.tr,{photo:'Fotoğraf',of:'/',previousPhoto:'Önceki fotoğraf',nextPhoto:'Sonraki fotoğraf'});
Object.assign(translations.en,{retryImage:'Retry image',retryingImage:'Retrying image…',imageLoading:'Loading image…',imageUnavailable:'This image is unavailable from the public Drive folder.',imageUnavailableShort:'Photo unavailable',viewSlab:'View slab',viewAdditional:'View additional image'});
Object.assign(translations.tr,{retryImage:'Fotoğrafı yeniden dene',retryingImage:'Fotoğraf yeniden deneniyor…',imageLoading:'Fotoğraf yükleniyor…',imageUnavailable:'Bu fotoğraf herkese açık Drive klasöründen alınamıyor.',imageUnavailableShort:'Fotoğraf kullanılamıyor',viewSlab:'Plakayı görüntüle',viewAdditional:'Ek fotoğrafı görüntüle'});
Object.assign(translations.en,{zoom:'Zoom',resetZoom:'Reset zoom',fullscreen:'Fullscreen',exitFullscreen:'Exit fullscreen'});
Object.assign(translations.tr,{zoom:'Yakınlaştır',resetZoom:'Yakınlaştırmayı sıfırla',fullscreen:'Tam ekran',exitFullscreen:'Tam ekrandan çık'});
Object.assign(translations.en,{showMissingPacking:'Include bundles without packing lists'});
Object.assign(translations.tr,{showMissingPacking:'Paket listesi olmayan demetleri dahil et'});
Object.assign(translations.en,{catalogView:'Cards per row',quickFilters:'Quick filters',quickFilterHiddenNote:'bundles hidden by quick filter'});
Object.assign(translations.tr,{catalogView:'Kart / satır',quickFilters:'Hızlı filtreler',quickFilterHiddenNote:'demet hızlı filtreyle gizlendi'});
Object.assign(translations.en,{salesSearchPlaceholder:'Search dashboard list',salesSort:'Sort list',showing:'Showing',imageChecks:'Photo/slab notes',imageMismatchDetail:'photo count differs from slab count; this can reflect normal production loss, not missing photos',auditImageCheck:'Photo/slab count notes',auditImages:'No photos found',reviewImages:'Review photo coverage',missingPhotoNumbers:'Missing photo numbers',missingImageDetail:'bundles with no photos found',missingImages:'No photos found',noImageAvailable:'No photos found'});
Object.assign(translations.tr,{salesSearchPlaceholder:'Panel listesini ara',salesSort:'Listeyi sırala',showing:'Gösterilen',imageChecks:'Fotoğraf/plaka notları',imageMismatchDetail:'fotoğraf sayısı plaka sayısından farklı; bu normal üretim kaybını gösterebilir, fotoğraf eksikliğini değil',auditImageCheck:'Fotoğraf/plaka sayısı notları',auditImages:'Fotoğraf bulunamadı',reviewImages:'Fotoğraf kapsamını kontrol edin',missingPhotoNumbers:'Eksik fotoğraf numaraları',missingImageDetail:'fotoğrafı bulunmayan demet',missingImages:'Fotoğraf bulunamadı',noImageAvailable:'Fotoğraf bulunamadı'});
Object.assign(translations.en,{staleCatalogue:'Catalogue may be out of date.',lastSynced:'Last synced',dayAgo:'day ago',daysAgo:'days ago',copyCollectionSummary:'Copy list summary',collectionSummaryCopied:'List summary copied',listLink:'List link'});
Object.assign(translations.tr,{staleCatalogue:'Katalog güncelliğini yitirmiş olabilir.',lastSynced:'Son senkronizasyon',dayAgo:'gün önce',daysAgo:'gün önce',copyCollectionSummary:'Liste özetini kopyala',collectionSummaryCopied:'Liste özeti kopyalandı',listLink:'Liste bağlantısı'});
Object.assign(translations.en,{sharedListStatus:'{available} of {requested} {requestedUnit} available',sharedListMissing:'{missingLabel} not currently in the catalogue',returnToCatalogue:'Return to full catalogue'});
Object.assign(translations.tr,{sharedListStatus:'{requested} {requestedUnit} içinden {available} mevcut',sharedListMissing:'{missingLabel} güncel katalogda bulunmuyor',returnToCatalogue:'Kataloğun tamamına dön'});
Object.assign(translations.en,{reviewSelection:'Review selected bundles'});
Object.assign(translations.tr,{reviewSelection:'Seçilen demetleri incele'});
Object.assign(translations.en,{syncHistory:'Recent syncs',syncSuccess:'Success',syncFailed:'Failed',latestSyncFailed:'Latest sync failed',previousCatalogueKept:'The previous catalogue remains published.',viewWorkflow:'View workflow',noSyncHistory:'No sync history available'});
Object.assign(translations.tr,{syncHistory:'Son senkronizasyonlar',syncSuccess:'Başarılı',syncFailed:'Başarısız',latestSyncFailed:'Son senkronizasyon başarısız',previousCatalogueKept:'Önceki katalog yayımlanmaya devam ediyor.',viewWorkflow:'İş akışını görüntüle',noSyncHistory:'Senkronizasyon geçmişi yok'});
Object.assign(translations.en,{photoCheck:'Photo check',auditPhotoCheck:'Photo check',photoCheckDetail:'bundles with missing or broken photos, or skipped photo folders',photoCoverage:'Photo coverage notes',photoCoverageDetail:'bundles where numbered slab photos differ from the listed slab count; this can reflect normal production loss',brokenImages:'broken images',driveFolder:'Drive folder',excelSource:'Excel source',openExcel:'Open Excel source',warning:'Warning',auditSource:'Source mismatch',sourceIssues:'Source issues',sourceMismatchDetail:'bundles whose folder code and packing-list name do not agree'});
Object.assign(translations.tr,{photoCheck:'Fotoğraf kontrolü',auditPhotoCheck:'Fotoğraf kontrolü',photoCheckDetail:'fotoğrafı olmayan, bozuk fotoğraflı, klasörü atlanan veya plaka/fotoğraf sayısı farklı demet',brokenImages:'bozuk fotoğraf',driveFolder:'Drive klasörü',excelSource:'Excel kaynağı',openExcel:'Excel kaynağını aç'});
Object.assign(translations.en,{scanSharedList:'Scan to open this list',galleryLabel:'Product gallery',closeGallery:'Close gallery'});
Object.assign(translations.tr,{scanSharedList:'Bu listeyi açmak için tarayın',galleryLabel:'Ürün galerisi',closeGallery:'Galeriyi kapat'});
Object.assign(translations.en,{latestSync:'LATEST SYNC',syncBundlesChecked:'bundles checked',publicDriveSource:'Public Drive · read-only'});
Object.assign(translations.tr,{latestSync:'SON SENKRONİZASYON',syncBundlesChecked:'demet kontrol edildi',publicDriveSource:'Herkese açık Drive · salt okunur'});
Object.assign(translations.en,{skipToCatalogue:'Skip to catalogue',searchLabel:'Search material or bundle ID',inventoryFiltersLabel:'Inventory filters',catalogViewLabel:'Catalog layout',updatedAt:'Updated {date}',copyListLink:'Copy list link',listLinkCopied:'List link copied',openGallery:'Open product gallery',areaNotProvided:'Area not provided',sizeNotProvided:'Size not provided',slab:'slab',slabPhoto:'slab photo',extraView:'extra view',extraViews:'extra views',video:'video',videos:'videos'});
Object.assign(translations.tr,{skipToCatalogue:'Kataloğa geç',searchLabel:'Malzeme veya paket kodu ara',inventoryFiltersLabel:'Envanter filtreleri',catalogViewLabel:'Katalog düzeni',updatedAt:'Güncelleme: {date}',copyListLink:'Liste bağlantısını kopyala',listLinkCopied:'Liste bağlantısı kopyalandı',openGallery:'Ürün galerisini aç',areaNotProvided:'Alan belirtilmedi',sizeNotProvided:'Ölçü belirtilmedi',slab:'plaka',slabPhoto:'plaka fotoğrafı',extraView:'ek görünüm',extraViews:'ek görünüm',video:'video',videos:'video'});
Object.assign(translations.en,{sharedListMetaTitle:'Shared slab list',sharedListMetaDescription:'View a shared Lucra Marble slab list from Denizli, Türkiye.'});
Object.assign(translations.tr,{sharedListMetaTitle:'Paylaşılan plaka listesi',sharedListMetaDescription:'Denizli, Türkiye’den paylaşılan Lucra Marble plaka listesini görüntüleyin.'});
Object.assign(translations.en,{resetAll:'Reset all',activeFilters:'Active filters',removeFilter:'Remove filter',searchFilter:'Search',statusFilter:'Status',sortFilter:'Sort',minAreaFilter:'Min m²',maxAreaFilter:'Max m²',minSlabsFilter:'Min slabs',maxSlabsFilter:'Max slabs',sizeFilter:'Size',surfaceFilter:'Surface',allSurfaces:'All surfaces',packingFilter:'Packing',photosFilter:'Photos'});
Object.assign(translations.en,{quoteFromShortlist:'Request a quote',requestQuoteFromList:'Request a quote',shortlistQuoteTitle:'Request a quote',shortlistQuoteHint:'Send one enquiry for the selected bundles, quantities, delivery destination, and contact details.',selectedQuoteBundles:'Selected bundles',quantity:'Quantity',contactName:'Contact name',company:'Company',email:'Email',phone:'Phone / WhatsApp',deliveryDestination:'Delivery destination',deliveryPlaceholder:'City, country, or delivery address',quoteNotes:'Additional notes',quoteNotesPlaceholder:'Project timing, finish, or other requirements',emailQuoteRequest:'Email quote request',whatsappQuoteRequest:'Send request via WhatsApp',quoteRequestMissingSelection:'Select at least one bundle first.',quoteRequestMissingQuantity:'Enter a quantity of at least 1 for every bundle.',quoteRequestMissingFields:'Please complete the required fields.',quoteRequestPrepared:'Quote request ready',openLink:'Open link',openListLink:'Open list link'});
Object.assign(translations.en,{customerVisibility:'Customer view',shownToCustomers:'Shown to customers',hiddenFromCustomers:'Hidden from customers',hideFromCustomers:'Hide from customers',showToCustomers:'Show to customers',customerVisibilityShown:'Customer view: {shown} shown · Saved on this device',customerVisibilitySummary:'Customer view: {shown} shown · {hidden} hidden · Saved on this device',customerVisibilityHiddenNote:'bundles hidden from customer view'});
function t(key){return translations[language][key]??translations.en[key]??key}
function message(key,values){return Object.entries(values).reduce((text,[name,value])=>text.replaceAll(`{${name}}`,String(value)),t(key))}
function countLabel(count,singularKey,pluralKey=singularKey){const value=Number(count)||0;return `${value} ${value===1?t(singularKey):t(pluralKey)}`}
function setMetaContent(selector,content){const element=document.querySelector(selector);if(element)element.setAttribute('content',content)}
function thumbnailNameStem(value){return String(value||'').replace(/\.[^.]+$/,'').trim().replace(/[\s_-]+/g,'').toLowerCase()}
function productThumbnailImage(product){
  const images=product?.images||[];
  const named=images.find(image=>['kapak','cover','thumbnail'].includes(thumbnailNameStem(image.name)));
  if(named)return named;
  if(product?.thumbnailFileId){const synced=images.find(image=>image.fileId===product.thumbnailFileId);if(synced)return synced}
  const numberedSlabs=images.filter(image=>image.type==='slab'&&Number(image.label)>0);
  const slabsAtOrAfterFive=numberedSlabs.filter(image=>Number(image.label)>=5).sort((a,b)=>Number(a.label)-Number(b.label));
  const slabsBeforeFive=numberedSlabs.filter(image=>Number(image.label)<5).sort((a,b)=>Number(b.label)-Number(a.label));
  return slabsAtOrAfterFive[0]||slabsBeforeFive[0]||images.find(image=>image.type==='slab')||images[0]||null;
}
function updateShareMetadata(product=null){
  const productTitle=product?`Lucra Marble · ${product.name}${product.code&&product.code!=='—'?` · ${product.code}`:''}`:'';
  const title=productTitle||(sharedCollectionActive?`Lucra Marble · ${sharedCollectionTitle||t('sharedListMetaTitle')}`:'Lucra Marble — Slab Inventory');
  const description=product?`${product.name} · ${product.reserved?t('reserved'):t('available')} · Denizli, Türkiye`:sharedCollectionActive?t('sharedListMetaDescription'):'Browse Lucra Marble’s current natural-stone slab inventory from Denizli, Türkiye.';
  const url=product?publicCustomerProductUrl(product):sharedCollectionActive?publicSharedCollectionUrl():'https://hkaracan.github.io/lucra-marble-inventory/';
  const image=productThumbnailImage(product)?.src||'https://hkaracan.github.io/lucra-marble-inventory/public/lucra-logo.png';
  document.title=title;setMetaContent('meta[name="description"]',description);setMetaContent('meta[property="og:title"]',title);setMetaContent('meta[property="og:description"]',description);setMetaContent('meta[property="og:url"]',url);setMetaContent('meta[property="og:image"]',image);setMetaContent('meta[name="twitter:title"]',title);setMetaContent('meta[name="twitter:description"]',description);setMetaContent('meta[name="twitter:image"]',image);
}
function applyLanguage(){
  document.documentElement.lang=language;
  document.querySelectorAll('[data-i18n]').forEach(element=>{element.textContent=t(element.dataset.i18n)});
  document.querySelectorAll('[data-i18n-placeholder]').forEach(element=>{element.placeholder=t(element.dataset.i18nPlaceholder)});
  const modeLabel=document.querySelector('#modeLabel');
  if(modeLabel)modeLabel.textContent=document.body.classList.contains('sales-mode')?t('salesMode'):t('presentationMode');
  const filterToggle=document.querySelector('#advancedFiltersToggle');
  if(filterToggle){const open=document.body.classList.contains('filters-open');const label=filterToggle.querySelector('[data-i18n]');if(label)label.textContent=t(open?'hideFilters':'moreFilters');filterToggle.lastElementChild.textContent=open?'⌃':'⌄';filterToggle.setAttribute('aria-expanded',String(open))}
  const auditToggle=document.querySelector('#toggleAudit');
  if(auditToggle){const open=!document.querySelector('#auditPanel')?.hidden; auditToggle.textContent=t(open?'hideAudit':'openAudit');auditToggle.setAttribute('aria-expanded',String(open))}
  document.querySelector('#searchInput')?.setAttribute('aria-label',t('searchLabel'));
  document.querySelector('#inventoryFilters')?.setAttribute('aria-label',t('inventoryFiltersLabel'));
  document.querySelector('#catalogView')?.setAttribute('aria-label',t('catalogViewLabel'));
  updateShareMetadata();
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
const JUST_IN_WINDOW_DAYS=5,NEW_WINDOW_DAYS=10;
function bundleFreshness(product,referenceTime=Date.now()){
  const addedAt=product?.addedAt, timestamp=addedAt?Date.parse(addedAt):NaN;
  if(!Number.isFinite(timestamp))return null;
  const ageMs=referenceTime-timestamp;
  if(ageMs<0||ageMs>NEW_WINDOW_DAYS*86400000)return null;
  return ageMs<=JUST_IN_WINDOW_DAYS*86400000?{label:t('justIn'),className:'just-in'}:{label:t('newBundle'),className:'new'};
}
function freshnessBadgeMarkup(product,compact=false){
  const freshness=bundleFreshness(product);
  if(!freshness)return '';
  return `<span class="${compact?'sales-':''}freshness-badge ${freshness.className}">${escapeHtml(freshness.label)}</span>`;
}
let products=assignBundleKeys(fallbackProducts), currentFilter='all', currentProduct=null, imageIndex=0, syncedAt=null;
let catalogColumns='2';
try{const storedColumns=localStorage.getItem('lucraCatalogColumns');if(['2','3','4'].includes(storedColumns))catalogColumns=storedColumns}catch(error){}
document.body.classList.add(`catalog-columns-${catalogColumns}`);
const grid=document.querySelector('#productGrid'), search=document.querySelector('#searchInput'), count=document.querySelector('#resultCount'), empty=document.querySelector('#emptyState'), syncStatus=document.querySelector('#syncStatus'), syncFeedback=document.querySelector('#syncFeedback'), activeFilterChips=document.querySelector('#activeFilterChips');
const catalogView=document.querySelector('.catalog-view'), catalogViewButtons=document.querySelectorAll('.catalog-view-button');
const salesKpis=document.querySelector('#salesKpis'), salesRows=document.querySelector('#salesRows'), salesFilterNote=document.querySelector('#salesFilterNote'), salesSearchInput=document.querySelector('#salesSearchInput'), salesSortSelect=document.querySelector('#salesSortSelect');
const customerVisibilitySummary=document.querySelector('#customerVisibilitySummary');
const sortSelect=document.querySelector('#sortSelect'), syncButton=document.querySelector('#syncButton');
const minArea=document.querySelector('#minArea'), maxArea=document.querySelector('#maxArea'), minSlabs=document.querySelector('#minSlabs'), maxSlabs=document.querySelector('#maxSlabs'), dimensionFilter=document.querySelector('#dimensionFilter'), surfaceFilter=document.querySelector('#surfaceFilter'), packingFilter=document.querySelector('#packingFilter'), mediaFilter=document.querySelector('#mediaFilter'), clearFiltersButton=document.querySelector('#clearFilters');
const advancedFiltersToggle=document.querySelector('#advancedFiltersToggle');
const showMissingPacking=document.querySelector('#showMissingPacking');
const shortlistCount=document.querySelector('#shortlistCount'), compareSelectedButton=document.querySelector('#compareSelected'), copyShortlistButton=document.querySelector('#copyShortlist'), shareCollectionButton=document.querySelector('#shareCollection'), whatsappShortlistButton=document.querySelector('#whatsappShortlist'), exportShortlistButton=document.querySelector('#exportShortlist'), exportVisibleButton=document.querySelector('#exportVisible'), clearShortlistButton=document.querySelector('#clearShortlist');
const shortlistSelect=document.querySelector('#shortlistSelect'), newShortlistButton=document.querySelector('#newShortlist'), renameShortlistButton=document.querySelector('#renameShortlist'), deleteShortlistButton=document.querySelector('#deleteShortlist');
const healthSummary=document.querySelector('#healthSummary'), healthDetails=document.querySelector('#healthDetails'), toggleHealthButton=document.querySelector('#toggleHealth');
const auditSection=document.querySelector('.sync-audit'), auditPanel=document.querySelector('#auditPanel'), auditRows=document.querySelector('#auditRows'), auditEmpty=document.querySelector('#auditEmpty'), auditCount=document.querySelector('#auditCount'), auditFilterSelect=document.querySelector('#auditFilter'), toggleAuditButton=document.querySelector('#toggleAudit'), exportAuditButton=document.querySelector('#exportAudit');
const followupFilterSelect=document.querySelector('#followupFilter');
const collectionBanner=document.querySelector('#collectionBanner'), collectionTitle=document.querySelector('#collectionTitle'), collectionSummary=document.querySelector('#collectionSummary'), collectionQr=document.querySelector('#collectionQr'), collectionUpdated=document.querySelector('#collectionUpdated'), copySharedCollectionLink=document.querySelector('#copySharedCollectionLink'), clearCollectionButton=document.querySelector('#clearCollection');
const presentationCollection=document.querySelector('#presentationCollection'), presentationCollectionName=document.querySelector('#presentationCollectionName'), presentationCollectionTitle=document.querySelector('#presentationCollectionTitle'), presentationCollectionSummary=document.querySelector('#presentationCollectionSummary'), presentationCollectionItems=document.querySelector('#presentationCollectionItems'), sharePresentationCollectionButton=document.querySelector('#sharePresentationCollection'), openPresentationCollectionButton=document.querySelector('#openPresentationCollection'), requestPresentationQuoteButton=document.querySelector('#requestPresentationQuote'), copyPresentationCollectionSummaryButton=document.querySelector('#copyPresentationCollectionSummary'), printPresentationCollectionButton=document.querySelector('#printPresentationCollection'), whatsappPresentationCollectionButton=document.querySelector('#whatsappPresentationCollection'), clearPresentationCollectionButton=document.querySelector('#clearPresentationCollection');
const catalogueFreshness=document.querySelector('#catalogueFreshness'), publicCatalogueFreshness=document.querySelector('#publicCatalogueFreshness'), latestSyncTitle=document.querySelector('#latestSyncTitle'), latestSyncSource=document.querySelector('#latestSyncSource'), latestSyncStats=document.querySelector('#latestSyncStats'), latestSyncHistoryRows=document.querySelector('#latestSyncHistoryRows'), syncFailureNote=document.querySelector('#syncFailureNote');
const salesGate=document.querySelector('#salesGate'), salesGateForm=document.querySelector('#salesGateForm'), salesPasswordInput=document.querySelector('#salesPasswordInput'), salesGateError=document.querySelector('#salesGateError');
const compareDialog=document.querySelector('#compareDialog'), compareContent=document.querySelector('#compareContent'), copyCompareButton=document.querySelector('#copyCompare');
const shortlistQuoteDialog=document.querySelector('#shortlistQuoteDialog'), shortlistQuoteForm=document.querySelector('#shortlistQuoteForm'), shortlistQuoteItems=document.querySelector('#shortlistQuoteItems'), shortlistQuoteError=document.querySelector('#shortlistQuoteError'), closeShortlistQuoteButton=document.querySelector('#closeShortlistQuote'), shortlistQuoteCloseButton=document.querySelector('#shortlistQuoteClose'), whatsappShortlistQuoteButton=document.querySelector('#whatsappShortlistQuote');
const openProductLink=document.querySelector('#openProductLink');
const followupStatus=document.querySelector('#followupStatus'), salesNote=document.querySelector('#salesNote'), saveSalesNoteButton=document.querySelector('#saveSalesNote'), noteSaved=document.querySelector('#noteSaved'), shareProductButton=document.querySelector('#shareProduct');
let showMissingPackingValue=true, shortlist=new Set(), shortlistLists={}, activeShortlistName='Sales shortlist', salesNotes={}, customerVisibility={}, inventoryReport={}, syncHistory=[], syncState=null, auditFilter='all', salesQuickFilter='all', salesFollowupFilter='all', salesSearch='', salesSort='name', sharedCollectionActive=false, sharedCollectionTitle='', sharedCollectionKeys=new Set(), presentationSelection=new Set(), customerCollectionTitle='', quoteRequestRecords=[];
const catalogImageIndexes=new Map();
const brokenPhotoIdsByProduct=new Map(),verifiedPhotoIdsByProduct=new Map();
const photoVerification={checked:0,failed:0,lastCheckedAt:null};
let inventoryHealthRefreshTimer=null;

function scheduleInventoryHealthRefresh(){
  if(inventoryHealthRefreshTimer)return;
  inventoryHealthRefreshTimer=setTimeout(()=>{inventoryHealthRefreshTimer=null;renderInventoryHealth();if(auditPanel&&!auditPanel.hidden)renderSyncAudit()},250);
}

function markPhotoVerified(productId,fileId){
  if(!productId||!fileId)return;
  const key=String(productId),verified=verifiedPhotoIdsByProduct.get(key)||new Set(),id=String(fileId);
  if(verified.has(id))return;
  verified.add(id);verifiedPhotoIdsByProduct.set(key,verified);
  photoVerification.checked+=1;photoVerification.lastCheckedAt=new Date().toISOString();
  if(document.body.classList.contains('sales-mode'))scheduleInventoryHealthRefresh();
}
function readSharedCollection(){
  const url=new URL(location.href),values=url.searchParams.getAll('collection');
  if(!values.length)return;
  sharedCollectionActive=true;
  sharedCollectionTitle=(url.searchParams.get('title')||'').trim();
  document.body.classList.add('shared-collection-mode');
  const keys=values.length===1?values[0].split(','):values;
  sharedCollectionKeys=new Set(keys.map(key=>key.trim()).filter(Boolean));
}
readSharedCollection();
try{showMissingPackingValue=localStorage.getItem('lucraShowMissingPacking')!=='0'}catch(error){}
try{
  const storedShortlists=JSON.parse(localStorage.getItem('lucraShortlists')||'null');
  if(storedShortlists?.lists&&typeof storedShortlists.lists==='object'){shortlistLists=storedShortlists.lists;activeShortlistName=storedShortlists.active||Object.keys(shortlistLists)[0]||activeShortlistName}
  else{shortlistLists[activeShortlistName]=JSON.parse(localStorage.getItem('lucraShortlist')||'[]')}
}catch(error){shortlistLists[activeShortlistName]=[]}
if(!shortlistLists[activeShortlistName])activeShortlistName=Object.keys(shortlistLists)[0]||'Sales shortlist';
shortlist=new Set(Array.isArray(shortlistLists[activeShortlistName])?shortlistLists[activeShortlistName]:[]);
try{salesNotes=JSON.parse(localStorage.getItem('lucraSalesNotes')||'{}')||{}}catch(error){salesNotes={}}
try{
  const storedCustomerVisibility=JSON.parse(localStorage.getItem('lucraCustomerVisibility')||'{}');
  if(storedCustomerVisibility&&typeof storedCustomerVisibility==='object'&&!Array.isArray(storedCustomerVisibility))customerVisibility=storedCustomerVisibility;
}catch(error){customerVisibility={}}
try{presentationSelection=new Set(JSON.parse(localStorage.getItem('lucraCustomerCollection')||'[]'))}catch(error){presentationSelection=new Set()}
try{customerCollectionTitle=(localStorage.getItem('lucraCustomerCollectionTitle')||'').trim()}catch(error){customerCollectionTitle=''}
if(sharedCollectionTitle)customerCollectionTitle=sharedCollectionTitle;
presentationCollectionName.value=customerCollectionTitle;
showMissingPacking.checked=showMissingPackingValue;
if(isGithubPages){
  syncButton.textContent='↻ Sync via GitHub Actions';
  syncButton.title='Open the manual GitHub Actions sync workflow';
}
function numberFilterValue(input){const value=Number(input.value);return input.value.trim()!==''&&Number.isFinite(value)?value:null}
function normalizeDimensionText(value){return String(value??'').toLowerCase().replace(/(?:centimeters?|cm)/g,'').replace(/[×✕✖*]/g,'x').replace(/\s*x\s*/g,'x').replace(/\s+/g,'').trim()}
function filteredProducts(){
  const q=search.value.trim().toLowerCase(),dimensionQuery=normalizeDimensionText(dimensionFilter.value);
  const minAreaValue=numberFilterValue(minArea),maxAreaValue=numberFilterValue(maxArea),minSlabsValue=numberFilterValue(minSlabs),maxSlabsValue=numberFilterValue(maxSlabs);
  const visible=products.filter(p=>{
    const text=`${p.name} ${p.code} ${p.groupName||''}`.toLowerCase();
    const dimensions=normalizeDimensionText((p.dimensions||[]).join(' '));
    const area=p.sqm==null||p.sqm===''?null:Number(p.sqm),slabs=p.pcs==null||p.pcs===''?null:Number(p.pcs),packingClass=packingListSummary(p).className,hasImages=Boolean(p.images?.length),surfaceMatches=surfaceFilter.value==='all'||productSurfaceTypes(p).some(surface=>surface.split(' · ').includes(surfaceFilter.value));
    return (document.body.classList.contains('sales-mode')||isCustomerVisible(p))&&(!sharedCollectionActive||sharedCollectionKeys.has(productKey(p)))&&(currentFilter==='all'||(currentFilter==='reserved'?p.reserved:currentFilter==='recent'?Boolean(bundleFreshness(p)):!p.reserved))&&text.includes(q)&&(!dimensionQuery||dimensions.includes(dimensionQuery))&&(minAreaValue===null||(Number.isFinite(area)&&area>=minAreaValue))&&(maxAreaValue===null||(Number.isFinite(area)&&area<=maxAreaValue))&&(minSlabsValue===null||(Number.isFinite(slabs)&&slabs>=minSlabsValue))&&(maxSlabsValue===null||(Number.isFinite(slabs)&&slabs<=maxSlabsValue))&&surfaceMatches&&(packingFilter.value==='all'||packingClass===packingFilter.value)&&(mediaFilter.value==='all'||(mediaFilter.value==='with-images'?hasImages&&!p.skippedPhotoFolders?.length:!hasImages));
  });
  const addedTimestamp=product=>{const timestamp=Date.parse(product?.addedAt||'');return Number.isFinite(timestamp)?timestamp:0};
  return visible.sort((a,b)=>sortSelect.value==='newest'?addedTimestamp(b)-addedTimestamp(a)||a.name.localeCompare(b.name)||a.code.localeCompare(b.code):sortSelect.value==='oldest'?addedTimestamp(a)-addedTimestamp(b)||a.name.localeCompare(b.name)||a.code.localeCompare(b.code):sortSelect.value==='slabs'?((Number(b.pcs)||0)-(Number(a.pcs)||0)||a.name.localeCompare(b.name)):sortSelect.value==='area'?((Number(b.sqm)||0)-(Number(a.sqm)||0)||a.name.localeCompare(b.name)):a.name.localeCompare(b.name)||a.code.localeCompare(b.code));
}

function packingListSummary(product){
  if(product.syncError)return {label:t('readError'),detail:product.syncError,className:'missing'};
  if(!product.packingList)return {label:t('missing'),detail:t('noExcel'),className:'missing'};
  if(!product.lines?.length)return {label:t('fileFound'),detail:product.packingWarning||t('noReadableRows'),className:'partial'};
  const blocks=new Set(product.lines.map(line=>line.block).filter(Boolean)).size;
  return {label:t('connected'),detail:`${product.lines.length} lines${blocks?` · ${blocks} blocks`:''}`,className:'connected'};
}

function productStock(product){
  const slabs=product.pcs!=null?countLabel(product.pcs,'slab','slabs'):t('countUnavailable');
  const area=product.sqm!=null?` · ${Number(product.sqm).toFixed(2)} m²`:` · ${product.dimensions?.length?t('areaNotProvided'):t('areaAndSizeNotListed')}`;
  return `${slabs}${area}`;
}
function productApproxWeight(product){
  if(product?.sqm==null||product.sqm==='')return null;
  const area=Number(product.sqm);
  return Number.isFinite(area)&&area>0?area*58:null;
}
function productWeightLabel(product){
  const weight=productApproxWeight(product);
  return weight==null?t('weightNotAvailable'):`${Math.round(weight)} kg`;
}
function productWeightAssumption(product){return productApproxWeight(product)==null?t('weightUnavailableReason'):t('weightAssumption')}
function isMysticGreyProduct(product){return /\bmystic\s+grey\b|\bM2880\b/i.test(`${product?.name||''} ${product?.folderName||''} ${product?.code||''}`)}
function compactMysticImageLabel(value){
  const text=String(value??'').replace(/\.[^.]+$/,'').trim(),match=text.match(/(\d+)$/);
  if(!match)return text;
  const digits=match[1],number=Number(digits);
  return number<10?String(number):digits.slice(-2);
}

function productDimensions(product){
  if(product.dimensions?.length)return product.dimensions.join(' · ');
  if(product.sqm==null)return t('areaAndSizeNotListed');
  return product.packingList?t('sizeNotProvided'):t('noPackingList');
}

function sourceCodesIn(value){
  return [...new Set((String(value??'').match(/\b([KLM]\d+)\b/gi)||[]).map(code=>code.toUpperCase()))];
}
function canonicalProductName(value){
  const text=String(value??'').trim();
  if(/^nebula\s+wave$/i.test(text))return 'Nebula Wave';
  if(/^sunset\s+dlomite$/i.test(text))return 'Sunset Dolomite';
  return text;
}
function isKnownNebulaSourceAlias(product){
  const name=canonicalProductName(product?.name),folderCode=sourceCodesIn(product?.folderName)[0]||'',packingCodes=sourceCodesIn(product?.packingList);
  return name==='Nebula Wave'&&folderCode==='L009'&&packingCodes.includes('L1009');
}
function displayProductCode(product){return isKnownNebulaSourceAlias(product)?'L1009':product?.code}
function sourceMismatchInfo(product){
  if(isKnownNebulaSourceAlias(product))return {hasIssue:false,detail:t('noIssues')};
  const stored=Array.isArray(product.sourceWarnings)?product.sourceWarnings.filter(Boolean):[];
  if(stored.length){
    return {hasIssue:true,detail:stored.map(warning=>typeof warning==='string'?warning:warning.message||warning.error||t('sourceMismatchDetail')).join(' · ')};
  }
  const folderCode=sourceCodesIn(product.folderName)[0]||'';
  const packingCodes=sourceCodesIn(product.packingList);
  if(folderCode&&packingCodes.length&&!packingCodes.includes(folderCode)){
    return {hasIssue:true,detail:`Folder ${folderCode}; packing list name references ${packingCodes.join(', ')}`};
  }
  return {hasIssue:false,detail:t('noIssues')};
}

function imageAudit(product){
  const typedSlabImages=(product.images||[]).filter(image=>image.type==='slab');
  const slabImageCount=product.slabImageCount==null?typedSlabImages.length:Number(product.slabImageCount);
  const expectedSlabs=product.pcs==null||product.pcs===''||!Number.isFinite(Number(product.pcs))?null:Number(product.pcs);
  const labels=typedSlabImages.map(image=>Number(image.label)).filter(Number.isFinite);
  const uniqueLabels=new Set(labels);
  const missingNumbers=[];
  if(labels.length){
    const minimum=Math.min(...labels),maximum=Math.max(...labels);
    for(let number=minimum;number<=maximum;number++)if(!uniqueLabels.has(number))missingNumbers.push(number);
  }
  return {slabImageCount,extraImageCount:product.extraImageCount==null?(product.images||[]).filter(image=>image.type==='extra').length:Number(product.extraImageCount),expectedSlabs,missingNumbers,mismatch:expectedSlabs!==null&&slabImageCount!==expectedSlabs};
}
function imageCoverageDetail(check){
  const coverage=check.expectedSlabs===null?`${check.slabImageCount} ${t('slabPhotos')}`:`${check.slabImageCount} / ${check.expectedSlabs} ${t('slabPhotos')}`;
  if(check.missingNumbers.length)return `${coverage} · ${t('missingPhotoNumbers')}: ${check.missingNumbers.slice(0,12).join(', ')}${check.missingNumbers.length>12?'…':''}`;
  return check.mismatch?`${coverage} · ${t('reviewImages')}`:coverage;
}
function photoCheck(product){
  const imageCheck=imageAudit(product),imageCount=product.images?.length||0;
  const storedBroken=Array.isArray(product.photoCheck?.brokenImages)?product.photoCheck.brokenImages.length:0;
  const runtimeBroken=brokenPhotoIdsByProduct.get(productKey(product))?.size||0;
  const brokenCount=Math.max(storedBroken,runtimeBroken),skippedCount=product.skippedPhotoFolders?.length||0;
  const issues=[];
  if(!imageCount)issues.push(t('noImageAvailable'));
  if(brokenCount)issues.push(`${brokenCount} ${t('brokenImages')}`);
  if(skippedCount)issues.push(`${skippedCount} ${t('photoFoldersSkipped')}`);
  const className=!imageCount||brokenCount?'missing':skippedCount?'partial':imageCheck.mismatch?'info':'connected';
  const detailParts=[];
  if(issues.length)detailParts.push(`${t('photoCheck')}: ${issues.join(' · ')}`);
  if(imageCheck.mismatch)detailParts.push(`${t('photoCoverage')}: ${imageCoverageDetail(imageCheck)}`);
  return {imageCheck,imageCount,brokenCount,skippedCount,hasIssue:issues.length>0,coverageNote:imageCheck.mismatch,label:imageCount?`${imageCount} ${t('views')}`:t('missing'),detail:detailParts.length?detailParts.join(' · '):`${t('photoCheck')}: ${t('galleryReady')}`,className};
}
function markPhotoBroken(productId,fileId){
  if(!productId||!fileId)return;
  const key=String(productId),broken=brokenPhotoIdsByProduct.get(key)||new Set();
  if(broken.has(String(fileId)))return;
  broken.add(String(fileId));brokenPhotoIdsByProduct.set(key,broken);
  photoVerification.failed+=1;photoVerification.lastCheckedAt=new Date().toISOString();
  if(document.body.classList.contains('sales-mode'))scheduleInventoryHealthRefresh();
}
function productMediaSummary(product){
  const check=photoCheck(product);
  return {label:check.label,detail:check.detail,className:check.className};
}

function deriveInventoryReport(records){
  const previous=records.filter(product=>product.packingList);
  const missingPacking=records.filter(product=>!product.packingList);
  const unreadablePacking=records.filter(product=>product.packingList&&!product.lines?.length);
  const missingImages=records.filter(product=>!product.images?.length);
  const missingAreas=records.filter(product=>product.sqm==null);
  const missingDimensions=records.filter(product=>!product.dimensions?.length);
  const sourceIssues=records.filter(product=>sourceMismatchInfo(product).hasIssue);
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
    sourceMismatches:sourceIssues.length,
    sourceMismatchFolders:sourceIssues.map(product=>product.folderName),
  };
}

function followupLabel(status){return t({new:'new',sent:'sent',waiting:'waiting',quoted:'quoted',closed:'closed'}[status]||'new')}
function followupFor(product){const saved=salesNotes[productKey(product)]||{};return {status:saved.status||'new',note:saved.note||'',updatedAt:saved.updatedAt||null}}
function renderInventoryHealth(){
  const missingPacking=products.filter(product=>!product.packingList),unreadablePacking=products.filter(product=>product.packingList&&!product.lines?.length),missingImages=products.filter(product=>!product.images?.length),imageChecks=products.filter(product=>imageAudit(product).mismatch),photoIssues=products.filter(product=>photoCheck(product).hasIssue),skippedFolders=products.filter(product=>product.skippedPhotoFolders?.length),syncErrors=products.filter(product=>product.syncError),sourceIssues=products.filter(product=>sourceMismatchInfo(product).hasIssue),incompleteSizes=products.filter(product=>product.sqm==null||!product.dimensions?.length);
  const checks=[
    {label:t('packingList'),value:missingPacking.length,detail:t('missingPackingDetail'),className:missingPacking.length?'warning':'healthy',filter:'no-packing'},
    {label:t('packingRows'),value:unreadablePacking.length,detail:t('missingPackingRowsDetail'),className:unreadablePacking.length?'warning':'healthy',filter:'attention'},
    {label:t('sizeData'),value:incompleteSizes.length,detail:t('missingSizeDetail'),className:incompleteSizes.length?'warning':'healthy',filter:'size'},
    {label:t('photoCheck'),value:photoIssues.length,detail:t('photoCheckDetail'),className:photoIssues.length?'warning':'healthy',filter:'photo-check'},
    {label:t('photoCoverage'),value:imageChecks.length,detail:t('photoCoverageDetail'),className:imageChecks.length?'info':'healthy',filter:'image-check'},
    {label:t('sourceIssues'),value:sourceIssues.length,detail:t('sourceMismatchDetail'),className:sourceIssues.length?'warning':'healthy',filter:'source'},
    {label:t('syncIssues'),value:syncErrors.length+skippedFolders.length,detail:t('syncErrorDetail'),className:syncErrors.length||skippedFolders.length?'warning':'healthy',filter:'warnings'},
  ];
  healthSummary.innerHTML=checks.map(check=>`<button type="button" class="health-card ${check.className}" data-audit-filter="${escapeHtml(check.filter)}" aria-label="${escapeHtml(`${check.label}: ${check.value}. ${t('viewRows')}`)}"><strong>${escapeHtml(check.value)}</strong><span>${escapeHtml(check.label)}</span><small>${escapeHtml(check.value===0?t('noIssues'):check.detail)}</small></button>`).join('');
  const issueList=(title,items,detail)=>items.length?`<section><h5>${escapeHtml(title)} <span>${items.length}</span></h5><p>${items.slice(0,8).map(product=>`<span>${escapeHtml(`${product.name}${product.code&&product.code!=='—'?` · ${product.code}`:''}`)}</span>`).join('')}${items.length>8?`<small>+ ${items.length-8} more</small>`:''}</p></section>`:`<section class="health-clear"><h5>${escapeHtml(title)}</h5><p>${escapeHtml(t('noIssues'))}</p></section>`;
  const reportLine=inventoryReport.added||inventoryReport.updated||inventoryReport.unchanged?`<section class="health-report"><h5>${escapeHtml(t('lastSync'))}</h5><p>${escapeHtml(`${t('added')}: ${inventoryReport.added||0} · ${t('updated')}: ${inventoryReport.updated||0} · ${t('unchanged')}: ${inventoryReport.unchanged||0}`)}</p></section>`:'';
  const verificationSummary=photoVerification.checked?`${photoVerification.checked} checked${photoVerification.failed?` · ${photoVerification.failed} failed`:''} · ${syncDateLabel(photoVerification.lastCheckedAt)}`:t('photoVerificationNotStarted');
  const verificationLine=`<section class="health-report"><h5>${escapeHtml(t('photoVerification'))}</h5><p>${escapeHtml(verificationSummary)}</p><small>${escapeHtml(t('photoVerificationDetail'))}</small></section>`;
  healthDetails.innerHTML=`${reportLine}${verificationLine}${issueList(t('packingList'),missingPacking,t('missing'))}${issueList(t('packingRows'),unreadablePacking,t('missing'))}${issueList(t('sizeData'),incompleteSizes,t('missing'))}${issueList(t('photoCheck'),photoIssues,t('missing'))}${issueList(t('photos'),missingImages,t('missing'))}${issueList(t('photoCoverage'),imageChecks,t('missing'))}${issueList(t('skippedFolders'),skippedFolders,t('missing'))}${issueList(t('sourceIssues'),sourceIssues,t('missing'))}${issueList(t('syncIssues'),syncErrors,t('missing'))}`;
}

function auditInfo(product){
  const hasArea=product.sqm!==null&&product.sqm!==''&&Number.isFinite(Number(product.sqm));
  const hasDimensions=Array.isArray(product.dimensions)&&product.dimensions.length>0;
  const packingMissing=!product.packingList;
  const packingUnreadable=Boolean(product.packingList&&!product.lines?.length);
  const imageCount=product.images?.length||0;
  const skippedCount=product.skippedPhotoFolders?.length||0;
  const source=sourceMismatchInfo(product);
  const syncWarning=Boolean(product.syncError)||skippedCount>0||source.hasIssue;
  const packing=product.syncError?{label:t('readError'),detail:product.syncError,className:'missing'}:packingMissing?{label:t('notProvided'),detail:t('noExcel'),className:'neutral'}:packingUnreadable?{label:t('fileFound'),detail:product.packingWarning||t('noReadableRows'),className:'partial'}:{label:t('connected'),detail:`${product.lines.length} ${t('packingRows').toLowerCase()}`,className:'connected'};
  const area=hasArea?`${Number(product.sqm).toFixed(2)} m²`:t('missing');
  const dimensions=hasDimensions?productDimensions(product):t('missing');
  const size=!hasArea&&!hasDimensions?{label:t('missing'),detail:`${t('areaData')}: ${area} · ${t('dimensions')}: ${dimensions}`,className:'missing'}:!hasArea||!hasDimensions?{label:t('partial'),detail:`${t('areaData')}: ${area} · ${t('dimensions')}: ${dimensions}`,className:'partial'}:{label:t('complete'),detail:`${area} · ${dimensions}`,className:'connected'};
  const check=photoCheck(product),imageCheck=check.imageCheck;
  const media={label:check.label,detail:check.detail,className:check.className};
  const sync=product.syncError?{label:t('readError'),detail:product.syncError,className:'missing'}:skippedCount?{label:t('partial'),detail:`${skippedCount} ${t('photoFoldersSkipped')}`,className:'partial'}:source.hasIssue?{label:t('warning'),detail:source.detail,className:'warning'}:{label:t('clean'),detail:t('noIssues'),className:'connected'};
  const attention=packingUnreadable||!hasArea||!hasDimensions||check.hasIssue||syncWarning;
  return {packing,size,media,sync,overall:{label:attention?t('auditAttention'):t('ready'),detail:attention?t('auditAttention'):t('clean'),className:attention?'warning':'connected'},packingMissing,packingUnreadable,sizeMissing:!hasArea||!hasDimensions,imageMissing:!imageCount,imageCheck:imageCheck.mismatch,photoCheck:check.hasIssue,sourceMismatch:source.hasIssue,syncWarning};
}
function auditStatusMarkup(status){return `<span class="audit-status ${escapeHtml(status.className)}"><b>${escapeHtml(status.label)}</b><small>${escapeHtml(status.detail)}</small></span>`}
function auditMatchesFilter(product,filter){
  const info=auditInfo(product);
  return filter==='attention'?info.overall.className==='warning':filter==='no-packing'?info.packingMissing:filter==='size'?info.sizeMissing:filter==='images'?info.imageMissing:filter==='image-check'?info.imageCheck:filter==='photo-check'?info.photoCheck:filter==='source'?info.sourceMismatch:filter==='warnings'?info.syncWarning:true;
}
function auditMatches(product){
  return auditMatchesFilter(product,auditFilter);
}
function renderSyncAudit(){
  const records=products.filter(auditMatches);
  auditCount.textContent=`${records.length} ${records.length===1?t('bundleSingular'):t('bundles')}`;
  auditEmpty.hidden=records.length>0;
  exportAuditButton.disabled=records.length===0;
  auditRows.innerHTML=records.map(product=>{
    const info=auditInfo(product),driveUrl=productDriveUrl(product),excelUrl=product.packingListId?packingListUrl(product):'';
    return `<div class="audit-row" role="row" tabindex="0" aria-label="${escapeHtml(`${t('openGallery')}: ${product.name}${product.code&&product.code!=='—'?` · ${t('bundle')} ${product.code}`:''}`)}" aria-keyshortcuts="Enter Space" data-product-id="${escapeHtml(productKey(product))}">
      <span class="audit-product" data-label="${escapeHtml(t('productSelect'))}" role="cell"><strong>${escapeHtml(product.name)}</strong><small>${escapeHtml(product.code)}</small><span class="audit-overall ${escapeHtml(info.overall.className)}">${escapeHtml(info.overall.label)}</span></span>
      <span data-label="${escapeHtml(t('packingList'))}" role="cell">${auditStatusMarkup(info.packing)}</span>
      <span data-label="${escapeHtml(t('auditAreaSize'))}" role="cell">${auditStatusMarkup(info.size)}</span>
      <span data-label="${escapeHtml(t('media'))}" role="cell">${auditStatusMarkup(info.media)}</span>
      <span data-label="${escapeHtml(t('auditSync'))}" role="cell">${auditStatusMarkup(info.sync)}</span>
      <span class="audit-source-links" data-label="${escapeHtml(t('source'))}" role="cell"><a class="audit-source" href="${escapeHtml(driveUrl)}" target="_blank" rel="noreferrer">${escapeHtml(t('driveFolder'))} ↗</a>${excelUrl?`<a class="audit-source audit-excel" href="${escapeHtml(excelUrl)}" target="_blank" rel="noreferrer">${escapeHtml(t('excelSource'))} ↗</a>`:''}</span>
    </div>`;
  }).join('');
  auditRows.querySelectorAll('.audit-row').forEach(row=>{
    row.addEventListener('click',event=>{if(!event.target.closest('a,button,input,label'))openProduct(row.dataset.productId)});
    row.addEventListener('keydown',event=>{if((event.key==='Enter'||event.key===' ')&&!event.target.closest('a,button,input,label')){event.preventDefault();openProduct(row.dataset.productId)}});
  });
}
function setAuditOpen(open){
  auditPanel.hidden=!open;
  toggleAuditButton.setAttribute('aria-expanded',String(open));
  toggleAuditButton.textContent=t(open?'hideAudit':'openAudit');
  if(open)renderSyncAudit();
}
function setAuditFilter(value){
  auditFilter=value;
  auditFilterSelect.value=value;
  setAuditOpen(true);
  requestAnimationFrame(()=>auditSection.scrollIntoView({behavior:'smooth',block:'nearest'}));
}

function salesQuickFilterMatches(product,filter=salesQuickFilter){
  return filter==='reserved'?Boolean(product.reserved):auditMatchesFilter(product,filter);
}
function salesSortProducts(records){
  return [...records].sort((a,b)=>{
    if(salesSort==='slabs')return (Number(b.pcs)||0)-(Number(a.pcs)||0)||a.name.localeCompare(b.name);
    if(salesSort==='area')return (Number(b.sqm)||0)-(Number(a.sqm)||0)||a.name.localeCompare(b.name);
    if(salesSort==='packing')return Number(Boolean(a.packingList))-Number(Boolean(b.packingList))||a.name.localeCompare(b.name);
    if(salesSort==='status')return Number(Boolean(a.reserved))-Number(Boolean(b.reserved))||a.name.localeCompare(b.name);
    return a.name.localeCompare(b.name)||String(a.code||'').localeCompare(String(b.code||''));
  });
}
function salesVisibleProducts(visible){
  const packingVisible=showMissingPackingValue?visible:visible.filter(product=>product.packingList);
  const quickVisible=salesQuickFilter==='all'?packingVisible:packingVisible.filter(product=>salesQuickFilterMatches(product));
  const followupVisible=salesFollowupFilter==='all'?quickVisible:quickVisible.filter(product=>followupFor(product).status===salesFollowupFilter);
  const query=salesSearch.trim().toLowerCase();
  const searched=query?followupVisible.filter(product=>`${product.name} ${product.code} ${product.groupName||''} ${product.folderName||''} ${productDimensions(product)}`.toLowerCase().includes(query)):followupVisible;
  return salesSortProducts(searched);
}
function renderSalesDashboard(visible){
  renderCatalogueFreshness();
  renderLatestSync();
  const hiddenPacking=visible.filter(product=>!product.packingList).length;
  const hiddenCustomer=products.filter(product=>!isCustomerVisible(product)).length;
  const shownCustomer=products.filter(product=>isCustomerVisible(product)).length;
  if(customerVisibilitySummary)customerVisibilitySummary.textContent=hiddenCustomer?message('customerVisibilitySummary',{shown:shownCustomer,hidden:hiddenCustomer}):message('customerVisibilityShown',{shown:shownCustomer});
  const packingVisible=showMissingPackingValue?visible:visible.filter(product=>product.packingList);
  const quickVisible=salesQuickFilter==='all'?packingVisible:packingVisible.filter(product=>salesQuickFilterMatches(product));
  const dashboardVisible=salesVisibleProducts(visible);
  const hiddenQuick=packingVisible.length-quickVisible.length;
  const hiddenFollowup=quickVisible.length-dashboardVisible.length;
  followupFilterSelect.value=salesFollowupFilter;
  salesSearchInput.value=salesSearch;
  salesSortSelect.value=salesSort;
  document.querySelectorAll('.sales-quick-filter').forEach(button=>{
    const filter=button.dataset.auditFilter||'all';
    button.classList.toggle('active',filter===salesQuickFilter);
    button.setAttribute('aria-pressed',String(filter===salesQuickFilter));
    const countElement=button.querySelector('.quick-filter-count');
    if(countElement)countElement.textContent=packingVisible.filter(product=>filter==='all'||salesQuickFilterMatches(product,filter)).length;
  });
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

  renderInventoryHealth();renderSyncAudit();renderShortlistManager();
  const dashboardNotes=[];
  if(!showMissingPackingValue&&hiddenPacking)dashboardNotes.push(`${hiddenPacking} ${t('packingHiddenNote')}`);
  if(hiddenCustomer)dashboardNotes.push(`${hiddenCustomer} ${t('customerVisibilityHiddenNote')}`);
  if(salesQuickFilter!=='all'&&hiddenQuick)dashboardNotes.push(`${hiddenQuick} ${t('quickFilterHiddenNote')}`);
  if(salesFollowupFilter!=='all'&&hiddenFollowup)dashboardNotes.push(`${hiddenFollowup} ${t('followupHiddenNote')}`);
  salesFilterNote.textContent=[`${t('showing')} ${dashboardVisible.length} ${dashboardVisible.length===1?t('bundleSingular'):t('bundles')}`,...dashboardNotes].join(' · ');
  salesRows.innerHTML=dashboardVisible.map(product=>{
    const packing=packingListSummary(product);
    const media=productMediaSummary(product);
    const surface=productSurfaceLabel(product);
    const followup=followupFor(product),customerVisible=isCustomerVisible(product);
    const driveUrl=product.folderId?`https://drive.google.com/drive/folders/${encodeURIComponent(product.folderId)}`:rootFolder;
    return `<div class="sales-row ${customerVisible?'':'customer-hidden'}" role="row" tabindex="0" aria-label="${escapeHtml(`${t('openGallery')}: ${product.name}${product.code&&product.code!=='—'?` · ${t('bundle')} ${product.code}`:''}`)}" aria-keyshortcuts="Enter Space" data-product-id="${escapeHtml(productKey(product))}">
      <span class="sales-product" data-label="${escapeHtml(t('productSelect'))}" role="cell"><span class="sales-product-line"><input class="shortlist-toggle" type="checkbox" ${shortlist.has(productKey(product))?'checked':''} aria-label="Add ${escapeHtml(product.name)} ${escapeHtml(product.code)} to shortlist"><strong>${escapeHtml(product.name)}</strong>${freshnessBadgeMarkup(product,true)}</span><small>${escapeHtml(product.code)}</small></span>
      <span data-label="${escapeHtml(t('status'))}" role="cell"><b class="sales-status ${product.reserved?'reserved':''}">${escapeHtml(product.reserved?t('reserved'):t('available'))}</b></span>
      <span data-label="${escapeHtml(t('stock'))}" role="cell">${escapeHtml(productStock(product))}</span>
      <span class="sales-dimensions" data-label="${escapeHtml(t('sizes'))}" role="cell">${escapeHtml(productDimensions(product))}</span>
      <span class="sales-packing ${packing.className}" data-label="${escapeHtml(t('packingList'))}" role="cell"><b>${escapeHtml(packing.label)}</b><small>${escapeHtml(packing.detail)}</small><small class="sales-surface">${escapeHtml(t('surfaceType'))}: ${escapeHtml(surface)}</small></span>
      <span class="sales-packing ${media.className}" data-label="${escapeHtml(t('media'))}" role="cell"><b>${escapeHtml(media.label)}</b><small>${escapeHtml(media.detail)}</small></span>
      <span class="sales-followup-cell" data-label="${escapeHtml(t('followUp'))}" role="cell"><b class="followup-status ${escapeHtml(followup.status)}">${escapeHtml(followupLabel(followup.status))}</b><small>${escapeHtml(followup.note||t('noNote'))}</small></span>
      <span class="sales-customer-visibility ${customerVisible?'':'is-hidden'}" data-label="${escapeHtml(t('customerVisibility'))}" role="cell"><b>${escapeHtml(t(customerVisible?'shownToCustomers':'hiddenFromCustomers'))}</b><button class="customer-visibility-toggle" type="button" data-product-id="${escapeHtml(productKey(product))}" aria-pressed="${customerVisible}" aria-label="${escapeHtml(t(customerVisible?'hideFromCustomers':'showToCustomers'))} ${escapeHtml(product.name)}">${escapeHtml(t(customerVisible?'hideFromCustomers':'showToCustomers'))}</button></span>
      <span class="sales-links" data-label="${escapeHtml(t('source'))}" role="cell"><a class="sales-source" href="${escapeHtml(driveUrl)}" target="_blank" rel="noreferrer">${escapeHtml(t('source'))} ↗</a><button class="sales-customer-action" type="button" data-product-id="${escapeHtml(productKey(product))}" aria-label="${escapeHtml(t('copyCustomerLink'))} ${escapeHtml(product.name)}">${escapeHtml(t('copyCustomerLink'))}</button></span>
    </div>`;
  }).join('');
  salesRows.querySelectorAll('.sales-row').forEach(row=>{
    const checkbox=row.querySelector('.shortlist-toggle');
    checkbox?.addEventListener('click',event=>event.stopPropagation());
    checkbox?.addEventListener('change',event=>toggleShortlist(row.dataset.productId,event.currentTarget.checked));
    const customerAction=row.querySelector('.sales-customer-action');
    customerAction?.addEventListener('click',event=>{event.stopPropagation();const product=products.find(item=>productKey(item)===row.dataset.productId);if(product)copyText(customerProductUrl(product),customerAction,t('customerLinkCopied'))});
    const visibilityToggle=row.querySelector('.customer-visibility-toggle');
    visibilityToggle?.addEventListener('click',event=>{event.stopPropagation();const product=products.find(item=>productKey(item)===row.dataset.productId);if(product)toggleCustomerVisibility(row.dataset.productId,!isCustomerVisible(product))});
    row.addEventListener('click',event=>{if(!event.target.closest('a,button,input,label'))openProduct(row.dataset.productId)});
    row.addEventListener('keydown',event=>{if((event.key==='Enter'||event.key===' ')&&!event.target.closest('a,button,input,label')){event.preventDefault();openProduct(row.dataset.productId)}});
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
function isCustomerVisible(product){return Boolean(product)&&customerVisibility[productKey(product)]!==false}
function saveCustomerVisibility(){try{localStorage.setItem('lucraCustomerVisibility',JSON.stringify(customerVisibility))}catch(error){}}
function pruneCustomerVisibility(){const valid=new Set(products.map(product=>productKey(product)));let changed=false;Object.keys(customerVisibility).forEach(key=>{if(!valid.has(key)){delete customerVisibility[key];changed=true}});if(changed)saveCustomerVisibility()}
function toggleCustomerVisibility(id,visible){if(!id)return;if(visible)delete customerVisibility[id];else customerVisibility[id]=false;saveCustomerVisibility();render()}
function selectedPresentationProducts(){return products.filter(product=>presentationSelection.has(productKey(product))&&isCustomerVisible(product))}
function savePresentationSelection(){try{localStorage.setItem('lucraCustomerCollection',JSON.stringify([...presentationSelection]))}catch(error){}}
function prunePresentationSelection(){const valid=new Set(products.map(product=>productKey(product)));let changed=false;presentationSelection.forEach(key=>{if(!valid.has(key)){presentationSelection.delete(key);changed=true}});if(changed)savePresentationSelection()}
function togglePresentationSelection(id,selected){if(selected)presentationSelection.add(id);else presentationSelection.delete(id);savePresentationSelection();render()}
function commitCustomerCollectionTitle(){customerCollectionTitle=customerCollectionTitle.trim();presentationCollectionName.value=customerCollectionTitle;try{localStorage.setItem('lucraCustomerCollectionTitle',customerCollectionTitle)}catch(error){}renderPresentationCollection();return customerCollectionTitle}
function renderPresentationCollection(){
  const selected=selectedPresentationProducts();
  presentationCollection.hidden=document.body.classList.contains('sales-mode')||selected.length===0;
  presentationCollectionName.value=customerCollectionTitle;
  presentationCollectionTitle.textContent=customerCollectionTitle||`${selected.length} ${t('selectedBundles')}`;
  presentationCollectionSummary.textContent=[collectionStats(selected),collectionUpdatedLabel(),t('availabilityNote')].filter(Boolean).join(' · ');
  presentationCollectionItems.innerHTML=selected.map(product=>`<span><span class="collection-review-copy"><strong>${escapeHtml(product.name)}</strong><small>${escapeHtml(product.code&&product.code!=='—'?product.code:t('bundle'))} · ${escapeHtml(product.reserved?t('reserved'):t('available'))}</small></span><button class="collection-review-remove" type="button" data-product-id="${escapeHtml(productKey(product))}" aria-label="${escapeHtml(t('removeFromCollection'))} ${escapeHtml(product.name)}" title="${escapeHtml(t('removeFromCollection'))}">×</button></span>`).join('');
  presentationCollectionItems.querySelectorAll('.collection-review-remove').forEach(button=>button.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();togglePresentationSelection(button.dataset.productId,false)}));
  sharePresentationCollectionButton.disabled=selected.length===0;
  openPresentationCollectionButton.disabled=selected.length===0;
  requestPresentationQuoteButton.disabled=selected.length===0;
  openPresentationCollectionButton.dataset.url=selected.length?publicCustomerCollectionUrl(selected,customerCollectionTitle):'';
  copyPresentationCollectionSummaryButton.disabled=selected.length===0;
  printPresentationCollectionButton.disabled=selected.length===0;
  whatsappPresentationCollectionButton.disabled=selected.length===0;
  clearPresentationCollectionButton.disabled=selected.length===0;
}
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
  shareCollectionButton.disabled=selected.length===0;
  whatsappShortlistButton.disabled=selected.length===0;
  exportShortlistButton.disabled=selected.length===0;
  clearShortlistButton.disabled=selected.length===0;
}
function productDriveUrl(product){return product.folderId?`https://drive.google.com/drive/folders/${encodeURIComponent(product.folderId)}`:rootFolder}
function packingListUrl(product){return product.packingListId?`https://drive.google.com/file/d/${encodeURIComponent(product.packingListId)}/view`:productDriveUrl(product)}
function basePageUrl(){const url=new URL(location.href);url.hash='';url.searchParams.delete('collection');url.searchParams.delete('title');url.searchParams.delete('v');return url.toString()}
function customerProductUrl(product){return `${basePageUrl()}#bundle-${encodeURIComponent(productKey(product))}`}
function setCollectionParams(url,records){url.searchParams.delete('collection');records.forEach(product=>url.searchParams.append('collection',productKey(product)));return url}
function customerCollectionUrl(records,title=''){const url=setCollectionParams(new URL(basePageUrl()),records);if(title.trim())url.searchParams.set('title',title.trim());return url.toString()}
function publicBasePageUrl(){return isGithubPages?basePageUrl():publicSiteBase}
function publicCustomerProductUrl(product){return `${publicBasePageUrl()}#bundle-${encodeURIComponent(productKey(product))}`}
function publicCustomerCollectionUrl(records,title=''){const url=setCollectionParams(new URL(publicBasePageUrl()),records);if(title.trim())url.searchParams.set('title',title.trim());return url.toString()}
function publicSharedCollectionUrl(){const url=new URL(publicBasePageUrl());sharedCollectionKeys.forEach(key=>url.searchParams.append('collection',key));if(sharedCollectionTitle.trim())url.searchParams.set('title',sharedCollectionTitle.trim());return url.toString()}
function collectionStats(records){
  const slabs=records.reduce((sum,product)=>sum+(Number(product.pcs)||0),0),areas=records.filter(product=>product.sqm!=null&&Number.isFinite(Number(product.sqm))).reduce((sum,product)=>sum+Number(product.sqm),0);
  return [countLabel(records.length,'bundleSingular','bundles'),slabs?countLabel(slabs,'slab','slabs'):'',areas?`${areas.toFixed(2)} m²`:'',areas?`${t('approxWeight')}: ${Math.round(areas*58)} kg`:'' ].filter(Boolean).join(' · ');
}
function collectionUpdatedLabel(){return syncedAt?`${t('lastUpdated')}: ${syncDateLabel(syncedAt)}`:''}
function catalogueFreshnessMessage(){
  const syncedDate=syncedAt?new Date(syncedAt):null,ageMs=syncedDate&&!Number.isNaN(syncedDate.getTime())?Date.now()-syncedDate.getTime():null;
  const staleAfterDays=7;
  if(ageMs===null||ageMs<staleAfterDays*86400000)return '';
  const ageDays=Math.max(1,Math.floor(ageMs/86400000));
  return `${t('staleCatalogue')} ${t('lastSynced')} ${syncedDate.toLocaleDateString()} (${ageDays} ${ageDays===1?t('dayAgo'):t('daysAgo')}).`;
}
function renderCatalogueFreshness(){
  const freshnessMessage=catalogueFreshnessMessage();
  if(catalogueFreshness){catalogueFreshness.hidden=!freshnessMessage;catalogueFreshness.textContent=freshnessMessage}
  if(publicCatalogueFreshness){publicCatalogueFreshness.hidden=!syncedAt;publicCatalogueFreshness.textContent=syncedAt?message('updatedAt',{date:syncDateLabel(syncedAt)}):''}
}
function syncDateLabel(value){
  const date=value?new Date(value):null;
  return date&&!Number.isNaN(date.getTime())?date.toLocaleString(undefined,{dateStyle:'medium',timeStyle:'short'}):t('notProvided');
}
function fallbackSyncRun(){
  if(!syncedAt)return null;
  return {status:'success',attemptedAt:syncedAt,syncedAt, bundles:inventoryReport.bundles||products.length, added:inventoryReport.added||0, updated:inventoryReport.updated||0, unchanged:inventoryReport.unchanged||0, warnings:inventoryReport.warningCount||0, errors:inventoryReport.folderErrors||0, addedFolders:inventoryReport.addedFolders||[], updatedFolders:inventoryReport.updatedFolders||[]};
}
function syncRunDetails(run){
  if(run.status==='failed')return run.message||t('previousCatalogueKept');
  return `${t('added')}: ${run.added??0} · ${t('updated')}: ${run.updated??0} · ${t('unchanged')}: ${run.unchanged??0}`;
}
function syncRunChangedNames(run){
  const added=(run.addedFolders||[]).map(name=>`+ ${name}`),updated=(run.updatedFolders||[]).map(name=>`↻ ${name}`);
  return [...added,...updated].slice(0,3).join(' · ')+(added.length+updated.length>3?` + ${added.length+updated.length-3}`:'');
}
function renderSyncHistory(){
  if(!latestSyncHistoryRows)return;
  const fallback=fallbackSyncRun();
  const records=(Array.isArray(syncHistory)&&syncHistory.length?syncHistory:[fallback].filter(Boolean)).slice(0,5);
  if(!records.length){latestSyncHistoryRows.innerHTML=`<p class="sync-history-empty">${escapeHtml(t('noSyncHistory'))}</p>`;return}
  latestSyncHistoryRows.innerHTML=records.map(run=>{
    const failed=run.status==='failed', dateValue=run.attemptedAt||run.syncedAt, changedNames=syncRunChangedNames(run);
    const date=dateValue?new Date(dateValue):null,datetime=date&&!Number.isNaN(date.getTime())?date.toISOString():'';
    return `<div class="sync-history-row ${failed?'failed':'success'}"><div class="sync-history-row-head"><b>${escapeHtml(failed?t('syncFailed'):t('syncSuccess'))}</b><time${datetime?` datetime="${escapeHtml(datetime)}"`:''}>${escapeHtml(syncDateLabel(dateValue))}</time></div><span>${escapeHtml(syncRunDetails(run))}</span>${changedNames?`<small>${escapeHtml(changedNames)}</small>`:''}</div>`;
  }).join('');
}
function renderLatestSync(){
  if(!latestSyncTitle||!latestSyncSource||!latestSyncStats)return;
  const fallback=fallbackSyncRun(), latestSuccess=(Array.isArray(syncHistory)?syncHistory.find(run=>run.status!=='failed'):null)||fallback;
  const dateValue=latestSuccess?.syncedAt||syncedAt,date=dateValue?new Date(dateValue):null,validDate=date&&!Number.isNaN(date.getTime());
  latestSyncTitle.textContent=validDate?syncDateLabel(dateValue):t('notProvided');
  latestSyncSource.textContent=validDate?`${t('publicDriveSource')} · ${latestSuccess.bundles||products.length} ${t('syncBundlesChecked')}`:'';
  latestSyncStats.setAttribute('aria-label',t('latestSync'));
  const report=latestSuccess||{};
  latestSyncStats.innerHTML=[
    [t('added'),report.added??0,'added'],
    [t('updated'),report.updated??0,'updated'],
    [t('unchanged'),report.unchanged??0,'unchanged'],
  ].map(([label,value,className])=>`<span class="latest-sync-stat ${className}"><b>${escapeHtml(value)}</b><small>${escapeHtml(label)}</small></span>`).join('');
  renderSyncHistory();
  const failed=syncState?.status==='failed';
  if(syncFailureNote){
    syncFailureNote.hidden=!failed;
    if(failed){
      const workflowUrl=typeof syncState.workflowUrl==='string'&&syncState.workflowUrl.startsWith('https://github.com/')?syncState.workflowUrl:actionsWorkflowUrl;
      syncFailureNote.innerHTML=`<strong>${escapeHtml(t('latestSyncFailed'))}</strong> · ${escapeHtml(syncDateLabel(syncState.attemptedAt))} · ${escapeHtml(syncState.message||t('previousCatalogueKept'))} <a href="${escapeHtml(workflowUrl)}" target="_blank" rel="noreferrer">${escapeHtml(t('viewWorkflow'))} ↗</a>`;
    }else syncFailureNote.textContent='';
  }
}
function qrCodeMarkup(url,label=t('scanToView'),className=''){
  const qrUrl=`https://api.qrserver.com/v1/create-qr-code/?size=320x320&margin=10&data=${encodeURIComponent(url)}`;
  return `<div class="print-qr ${className}"><img src="${escapeHtml(qrUrl)}" alt="${escapeHtml(label)}" loading="lazy" decoding="async" referrerpolicy="no-referrer" onerror="this.hidden=true;this.nextElementSibling.hidden=false"><span hidden>${escapeHtml(label)}<small>${escapeHtml(url)}</small></span><b>${escapeHtml(label)}</b></div>`;
}
function renderCollectionBanner(){
  if(!sharedCollectionActive){collectionBanner.hidden=true;if(collectionQr)collectionQr.innerHTML='';if(collectionUpdated)collectionUpdated.textContent='';return}
  const available=products.filter(product=>sharedCollectionKeys.has(productKey(product)));
  const requested=sharedCollectionKeys.size,missing=Math.max(0,requested-available.length);
  const freshnessMessage=catalogueFreshnessMessage();
  collectionBanner.hidden=false;
  collectionBanner.classList.toggle('partial',missing>0);collectionBanner.classList.toggle('stale',Boolean(freshnessMessage));
  collectionTitle.textContent=sharedCollectionTitle||(available.length?collectionStats(available):t('sharedCollectionEmpty'));
  collectionSummary.textContent=[message('sharedListStatus',{available:available.length,requested,requestedUnit:requested===1?t('bundleSingular'):t('bundles')}),missing?message('sharedListMissing',{missingLabel:countLabel(missing,'bundleSingular','bundles')}):'',available.length?collectionStats(available):'',freshnessMessage,t('sharedSelectionHint'),t('availabilityNote')].filter(Boolean).join(' · ');
  if(collectionQr){collectionQr.setAttribute('aria-label',t('scanSharedList'));collectionQr.innerHTML=qrCodeMarkup(publicSharedCollectionUrl(),t('scanSharedList'),'collection-qr')}
  if(collectionUpdated){
    const date=syncedAt?new Date(syncedAt):null,validDate=date&&!Number.isNaN(date.getTime());
    collectionUpdated.innerHTML=validDate?`<span>${escapeHtml(t('lastUpdated'))}</span><time datetime="${escapeHtml(date.toISOString())}">${escapeHtml(syncDateLabel(syncedAt))}</time>`:`<span>${escapeHtml(t('lastUpdated'))}</span><time>${escapeHtml(t('notProvided'))}</time>`;
  }
}
function clearSharedCollection(){
  sharedCollectionActive=false;sharedCollectionTitle='';sharedCollectionKeys.clear();document.body.classList.remove('shared-collection-mode');
  const url=new URL(location.href);url.searchParams.delete('collection');url.searchParams.delete('title');history.replaceState(null,'',`${url.pathname}${url.search}${url.hash}`);updateShareMetadata();render();
}
const surfaceLabelTranslations={cilali:'Polished',polished:'Polished',polish:'Polished',honlu:'Honed',honed:'Honed',deri:'Leather',leather:'Leather','leather finish':'Leather',ham:'Raw',raw:'Raw',islenmemis:'Raw',mat:'Matte',matte:'Matte',fircali:'Brushed',brushed:'Brushed',kumlu:'Sandblasted',kumlanmis:'Sandblasted',sandblasted:'Sandblasted',bookmatch:'Bookmatched',bookmatched:'Bookmatched',htl:'HTL',patina:'Patinato',patinali:'Patinato',patinato:'Patinato',natural:'Natural'};
const surfaceExclusionsByCode={K3332:new Set(['Breccia Montagna']),K6169:new Set(['HTL'])};
function normalizeSurfaceLabel(value){
  const text=String(value||'').trim().replace(/[İıŞşĞğÜüÖöÇç]/g,letter=>({İ:'I',ı:'i',Ş:'S',ş:'s',Ğ:'G',ğ:'g',Ü:'U',ü:'u',Ö:'O',ö:'o',Ç:'C',ç:'c'}[letter]||letter));
  const parts=text.split(/\s*(?:&|\+|\/|\band\b|\bve\b|-)\s*/i).map(part=>part.trim()).filter(Boolean);
  const normalized=[];
  parts.forEach(part=>{
    const key=part.toLowerCase().replace(/\s+/g,' ');
    const label=surfaceLabelTranslations[key]||part.replace(/\b\w/g,character=>character.toUpperCase());
    if(label&&!normalized.includes(label))normalized.push(label);
  });
  return normalized.join(' · ');
}
function surfaceLabelLooksValid(value){
  const text=String(value||'').trim().replace(/[İıŞşĞğÜüÖöÇç]/g,letter=>({İ:'I',ı:'i',Ş:'S',ş:'s',Ğ:'G',ğ:'g',Ü:'U',ü:'u',Ö:'O',ö:'o',Ç:'C',ç:'c'}[letter]||letter)).toLowerCase();
  return Boolean(text&&(/polish|honed|raw|leather|surface|finish|cilali|honlu|deri|ham|bookmatch|brushed|fircali|kumlu|patina/.test(text)||['htl','unfilled','filled'].includes(text)));
}
function productSurfaceTypes(product){
  const values=Array.isArray(product?.surfaceTypes)&&product.surfaceTypes.length?product.surfaceTypes:(Array.isArray(product?.lines)?product.lines.map(line=>typeof line==='object'?(line.surfaceType||line.finish):'').filter(surfaceLabelLooksValid):[]);
  const excluded=surfaceExclusionsByCode[String(product?.code||'').toUpperCase()]||new Set();
  return [...new Set(values.map(normalizeSurfaceLabel).filter(Boolean).map(surface=>surface.split(' · ').filter(part=>!excluded.has(part)).join(' · ')).filter(Boolean))];
}
function surfaceFilterValues(){
  return [...new Set(products.flatMap(product=>productSurfaceTypes(product).flatMap(surface=>surface.split(' · ').map(value=>value.trim()).filter(Boolean))))].sort((a,b)=>a.localeCompare(b));
}
function populateSurfaceFilter(){
  if(!surfaceFilter)return;
  const selected=surfaceFilter.value,values=surfaceFilterValues();
  surfaceFilter.innerHTML=`<option value="all">${escapeHtml(t('allSurfaces'))}</option>${values.map(value=>`<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`).join('')}`;
  surfaceFilter.value=values.includes(selected)?selected:'all';
}
function productSurfaceLabel(product){
  const surfaces=productSurfaceTypes(product);
  return surfaces.length?surfaces.join(' · '):(product?.packingList?t('surfaceNotListed'):t('noPackingList'));
}
function productSummary(product){
  const packing=packingListSummary(product),media=productMediaSummary(product);
  return `${product.name} ${product.code} — ${product.reserved?'Reserved':'Available'}\nStock: ${productStock(product)}\nApprox. weight: ${productWeightLabel(product)}\nWeight basis: ${productWeightAssumption(product)}\nSurface: ${productSurfaceLabel(product)}\nSizes: ${productDimensions(product)}\nPacking list: ${packing.label} (${packing.detail})\nMedia: ${media.label} (${media.detail})\nDrive: ${productDriveUrl(product)}`;
}
function shortlistSummary(title='Lucra Marble shortlist'){
  return [title,...selectedProducts().map((product,index)=>`${index+1}. ${productSummary(product)}`)].join('\n\n');
}
function customerProductSummary(product,usePublicLink=false,includeDrive=false){
  const code=product.code&&product.code!=='—'?` (${product.code})`:'';
  const stock=product.pcs!=null?countLabel(product.pcs,'slab','slabs'):'Bundle details available on request';
  const area=product.sqm!=null?` · ${Number(product.sqm).toFixed(2)} m²`:` · ${t('areaNotProvided')}`;
  const dimensions=`Sizes: ${productDimensions(product)}`;
  return [
    `Lucra Marble · ${product.name}${code}`,
    product.reserved?'Currently reserved':'Available',
    `Stock: ${stock}${area}`,
    `Approx. weight: ${productWeightLabel(product)}`,
    `Weight basis: ${productWeightAssumption(product)}`,
    `Surface: ${productSurfaceLabel(product)}`,
    dimensions,
    'Location: Denizli, Türkiye',
    `Photos & details: ${usePublicLink?publicCustomerProductUrl(product):customerProductUrl(product)}`,
    includeDrive?`Google Drive folder: ${productDriveUrl(product)}`:'',
  ].filter(Boolean).join('\n');
}
function customerQuoteRequest(product){
  const code=product.code&&product.code!=='—'?` (${product.code})`:'';
  return [
    `Hello Lucra Marble,`,
    `I would like to request a quote for ${product.name}${code}.`,
    '',
    customerProductSummary(product,true),
    '',
    'Please confirm current price, availability, and delivery information.',
  ].join('\n');
}
function customerCollectionSummary(records,title=''){
  return [
    `Lucra Marble · ${title||t('collectionSheet')}`,
    collectionStats(records),
    collectionUpdatedLabel(),
    `${t('listLink')}: ${publicCustomerCollectionUrl(records,title)}`,
    '',
    ...records.map((product,index)=>`${index+1}. ${customerProductSummary(product,true)}`),
    '',
    t('availabilityNote'),
    t('contactForPricing'),
  ].filter(Boolean).join('\n\n');
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
function renderShortlistQuoteItems(records=quoteRequestRecords){
  shortlistQuoteItems.innerHTML=records.map(product=>{
    const code=product.code&&product.code!=='—'?` · ${product.code}`:'';
    return `<div class="quote-item"><div><strong>${escapeHtml(product.name)}</strong><small>${escapeHtml(`${productStock(product)}${code}`)}</small></div><label><span>${escapeHtml(t('quantity'))}</span><input type="number" min="1" step="1" value="1" inputmode="numeric" required data-quote-quantity="${escapeHtml(productKey(product))}" aria-label="${escapeHtml(`${t('quantity')} · ${product.name}`)}"></label></div>`;
  }).join('');
}
function openShortlistQuoteDialog(records=selectedPresentationProducts()){
  const selected=records;
  if(!selected.length)return;
  quoteRequestRecords=selected;
  renderShortlistQuoteItems(selected);
  shortlistQuoteError.textContent='';
  shortlistQuoteDialog.showModal();
  requestAnimationFrame(()=>shortlistQuoteForm.querySelector('input')?.focus());
}
function collectShortlistQuoteRequest(){
  const selected=quoteRequestRecords.length?quoteRequestRecords:selectedPresentationProducts();
  if(!selected.length){shortlistQuoteError.textContent=t('quoteRequestMissingSelection');return null}
  const quantityInputs=[...shortlistQuoteItems.querySelectorAll('[data-quote-quantity]')];
  const items=selected.map(product=>{
    const input=quantityInputs.find(item=>item.dataset.quoteQuantity===productKey(product));
    return {product,quantity:Number(input?.value)};
  });
  if(items.some(item=>!Number.isInteger(item.quantity)||item.quantity<1)){
    shortlistQuoteError.textContent=t('quoteRequestMissingQuantity');
    return null;
  }
  if(!shortlistQuoteForm.checkValidity()){
    shortlistQuoteError.textContent=t('quoteRequestMissingFields');
    shortlistQuoteForm.reportValidity();
    return null;
  }
  const formData=new FormData(shortlistQuoteForm);
  return {selected,items,contactName:String(formData.get('contactName')||'').trim(),company:String(formData.get('company')||'').trim(),email:String(formData.get('email')||'').trim(),phone:String(formData.get('phone')||'').trim(),delivery:String(formData.get('delivery')||'').trim(),notes:String(formData.get('notes')||'').trim()};
}
function shortlistQuoteRequestMessage(request){
  return [
    'Hello Lucra Marble,',
    '',
    'I would like to request a quote for the following bundles:',
    ...request.items.map((item,index)=>{
      const code=item.product.code&&item.product.code!=='—'?` (${item.product.code})`:'';
      return `${index+1}. Required quantity: ${item.quantity} · ${item.product.name}${code}\n   Stock reference: ${productStock(item.product)}\n   Product page: ${publicCustomerProductUrl(item.product)}`;
    }),
    '',
    'Customer details:',
    `Name: ${request.contactName}`,
    request.company?`Company: ${request.company}`:'',
    `Email: ${request.email}`,
    `Phone / WhatsApp: ${request.phone}`,
    `Delivery destination: ${request.delivery}`,
    request.notes?`Additional notes: ${request.notes}`:'',
    '',
    `Shared list reference: ${publicCustomerCollectionUrl(request.selected)}`,
    '',
    'Please confirm current pricing, availability, and delivery information.',
  ].filter(Boolean).join('\n');
}
function submitShortlistQuoteRequest(event){
  event.preventDefault();
  const request=collectShortlistQuoteRequest();
  if(!request)return;
  const subject=`${t('quoteRequestSubject')} · ${request.items.length} ${t('bundles')} · Lucra Marble`;
  shortlistQuoteDialog.close();
  window.location.href=`mailto:${lucraQuoteEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(shortlistQuoteRequestMessage(request))}`;
}
function sendShortlistQuoteViaWhatsApp(){
  const request=collectShortlistQuoteRequest();
  if(!request)return;
  shortlistQuoteDialog.close();
  openWhatsApp(shortlistQuoteRequestMessage(request));
}
async function copyText(text,button,successText){
  const original=button.textContent;
  try{
    if(!navigator.clipboard?.writeText)throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(text);button.textContent=successText;
  }catch(error){window.prompt('Copy this summary',text);button.textContent='Summary ready'}
  setTimeout(()=>button.textContent=original,1600);
}
function openWhatsApp(text){window.open(`${lucraWhatsAppUrl}?text=${encodeURIComponent(text)}`,'_blank','noopener,noreferrer')}
function renderCompare(){
  const selected=selectedProducts();
  compareContent.innerHTML=`<div class="compare-table-wrap"><table class="compare-table"><thead><tr><th>${escapeHtml(t('bundle'))}</th><th>${escapeHtml(t('status'))}</th><th>${escapeHtml(t('stock'))}</th><th>${escapeHtml(t('sizes'))}</th><th>${escapeHtml(t('surfaceType'))}</th><th>${escapeHtml(t('packingList'))}</th><th>${escapeHtml(t('media'))}</th></tr></thead><tbody>${selected.map(product=>{
    const packing=packingListSummary(product),media=productMediaSummary(product);
    return `<tr><th><strong>${escapeHtml(product.name)}</strong><small>${escapeHtml(product.code)}</small></th><td><b class="sales-status ${product.reserved?'reserved':''}">${escapeHtml(product.reserved?t('reserved'):t('available'))}</b></td><td>${escapeHtml(productStock(product))}</td><td>${escapeHtml(productDimensions(product))}</td><td>${escapeHtml(productSurfaceLabel(product))}</td><td><b class="compare-status ${packing.className}">${escapeHtml(packing.label)}</b><small>${escapeHtml(packing.detail)}</small></td><td><b class="compare-status ${media.className}">${escapeHtml(media.label)}</b><small>${escapeHtml(media.detail)}</small></td></tr>`;
  }).join('')}</tbody></table></div>`;
}
function csvCell(value){return `"${String(value??'').replace(/"/g,'""')}"`}
function downloadProducts(records,filePrefix){
  const rows=[['Product','Code','Status','Stock','Approx. weight','Surface','Dimensions','Packing list','Packing detail','Media','Media detail','Drive URL'],...records.map(product=>{
    const packing=packingListSummary(product),media=productMediaSummary(product);
    return [product.name,product.code,product.reserved?'Reserved':'Available',productStock(product),productWeightLabel(product),productSurfaceLabel(product),productDimensions(product),packing.label,packing.detail,media.label,media.detail,productDriveUrl(product)];
  })];
  const csv=`\ufeff${rows.map(row=>row.map(csvCell).join(',')).join('\n')}`;
  const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));
  const link=document.createElement('a');link.href=url;link.download=`${filePrefix}-${new Date().toISOString().slice(0,10)}.csv`;document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function downloadShortlist(){downloadProducts(selectedProducts(),'lucra-shortlist')}
function downloadVisible(){
  const records=salesVisibleProducts(filteredProducts());
  downloadProducts(records,'lucra-inventory-view');
}
function downloadAudit(){
  const records=products.filter(auditMatches);
  const rows=[['Product','Code','Overall','Packing list','Packing detail','Area / size','Area / size detail','Media','Media detail','Sync','Sync detail','Drive URL'],...records.map(product=>{
    const info=auditInfo(product);
    return [product.name,product.code,info.overall.label,info.packing.label,info.packing.detail,info.size.label,info.size.detail,info.media.label,info.media.detail,info.sync.label,info.sync.detail,productDriveUrl(product)];
  })];
  const csv=`\ufeff${rows.map(row=>row.map(csvCell).join(',')).join('\n')}`;
  const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));
  const link=document.createElement('a');link.href=url;link.download=`lucra-sync-audit-${new Date().toISOString().slice(0,10)}.csv`;document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
async function shareCustomerProduct(){
  if(!currentProduct)return;
  const summary=customerProductSummary(currentProduct,true),url=publicCustomerProductUrl(currentProduct);
  if(navigator.share){
    try{await navigator.share({title:`Lucra Marble · ${currentProduct.name}`,text:summary,url});return}catch(error){if(error?.name==='AbortError')return}
  }
  await copyText(summary,shareProductButton,t('copied'));
}
function requestProductQuote(){
  if(!currentProduct)return;
  const code=currentProduct.code&&currentProduct.code!=='—'?` · ${currentProduct.code}`:'';
  const subject=`${t('quoteRequestSubject')} · Lucra Marble · ${currentProduct.name}${code}`;
  const body=customerQuoteRequest(currentProduct);
  window.location.href=`mailto:${lucraQuoteEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
async function shareCustomerCollection(){
  const selected=selectedProducts();if(!selected.length)return;
  const url=publicCustomerCollectionUrl(selected,customerCollectionTitle);
  if(navigator.share){
    try{await navigator.share({title:`Lucra Marble · ${t('sharedSelection')}`,text:`${selected.length} ${t('bundles')}`,url});return}catch(error){if(error?.name==='AbortError')return}
  }
  await copyText(url,shareCollectionButton,t('selectionShared'));
}
function printSheetMarkup(product){
  const thumbnail=productThumbnailImage(product),images=(product.images||[]).slice(0,6),onlineUrl=publicCustomerProductUrl(product),driveUrl=productDriveUrl(product);
  const imageGrid=images.length?`<section class="print-sheet-views"><h2>${escapeHtml(t('selectedViews'))}</h2><div class="print-sheet-image-grid">${images.map((image,index)=>`<figure><img src="${escapeHtml(image.src)}" alt="${escapeHtml(product.name)} ${escapeHtml(image.type==='slab'?`slab ${image.label}`:image.label)}"><figcaption>${escapeHtml(image.type==='slab'?`Slab ${image.label}`:image.label||`${t('selectedViews')} ${index+1}`)}</figcaption></figure>`).join('')}</div>${product.images.length>images.length?`<p class="print-sheet-muted">${escapeHtml(`${product.images.length-images.length} ${t('views')} · `)}<a href="${escapeHtml(onlineUrl)}">${escapeHtml(t('fullGallery'))}</a></p>`:''}</section>`:'<p class="print-sheet-muted">No images found</p>';
  const dimensions=product.dimensions?.length?productDimensions(product):t('sizeDetailsNotListed');
  return `<div class="print-sheet-page"><header class="print-sheet-header"><div><div class="print-sheet-brand">LUCRA MARBLE · DENİZLİ, TÜRKİYE</div><h1>${escapeHtml(product.name)}</h1><p>${escapeHtml(product.code)} · <span class="print-sheet-status ${product.reserved?'reserved':''}">${escapeHtml(product.reserved?t('reserved'):t('available'))}</span></p></div><div class="print-sheet-header-side"><div class="print-sheet-label">${escapeHtml(t('bundleSheet'))}</div>${qrCodeMarkup(onlineUrl)}</div></header>${thumbnail?.src?`<img class="print-sheet-hero" src="${escapeHtml(thumbnail.src)}" alt="${escapeHtml(product.name)}">`:''}<dl class="print-sheet-specs"><div><dt>${escapeHtml(t('totalSlabs'))}</dt><dd>${escapeHtml(product.pcs!=null?String(product.pcs):t('countUnavailable'))}</dd></div><div><dt>${escapeHtml(t('totalArea'))}</dt><dd>${escapeHtml(product.sqm!=null?`${Number(product.sqm).toFixed(2)} m²`:'—')}</dd></div><div><dt>${escapeHtml(t('approxWeight'))}</dt><dd>${escapeHtml(productWeightLabel(product))}</dd></div><div><dt>${escapeHtml(t('dimensions'))}</dt><dd>${escapeHtml(dimensions)}</dd></div><div><dt>${escapeHtml(t('surfaceType'))}</dt><dd>${escapeHtml(productSurfaceLabel(product))}</dd></div><div><dt>${escapeHtml(t('location'))}</dt><dd>Denizli, Türkiye</dd></div></dl>${imageGrid}<div class="print-sheet-links"><a href="${escapeHtml(onlineUrl)}">${escapeHtml(t('fullGallery'))} ↗</a><a href="${escapeHtml(driveUrl)}">${escapeHtml(t('openDrive'))} ↗</a></div><p class="print-sheet-footer">${escapeHtml(t('contactForPricing'))}</p></div>`;
}

function printProductSheet(){
  if(!currentProduct)return;
  let sheet=document.querySelector('#printSheet');
  if(!sheet){sheet=document.createElement('div');sheet.id='printSheet';sheet.className='print-sheet';document.body.appendChild(sheet)}
  sheet.innerHTML=printSheetMarkup(currentProduct);
  document.body.classList.add('printing-sheet');
  const cleanup=()=>{document.body.classList.remove('printing-sheet');sheet.innerHTML='';window.removeEventListener('afterprint',cleanup)};
  window.addEventListener('afterprint',cleanup);
  const waitForImages=Array.from(sheet.querySelectorAll('img')).map(image=>new Promise(resolve=>{if(image.complete){resolve();return}image.onload=resolve;image.onerror=resolve;setTimeout(resolve,3200)}));
  Promise.race([Promise.all(waitForImages),new Promise(resolve=>setTimeout(resolve,3500))]).then(()=>window.print());
}

function printCollectionMarkup(records){
  const collectionUrl=publicCustomerCollectionUrl(records,customerCollectionTitle);
  const cards=records.map(product=>{
    const image=productThumbnailImage(product),code=product.code&&product.code!=='—'?` · ${product.code}`:'';
    const stock=product.pcs!=null?`${Number(product.pcs)} ${t('slabs')}`:t('countUnavailable');
    const area=product.sqm!=null?` · ${Number(product.sqm).toFixed(2)} m²`:'';
    const weight=productApproxWeight(product)!=null?` · ${t('approxWeight')}: ${Math.round(productApproxWeight(product))} kg`:'';
    const dimensions=product.dimensions?.length?productDimensions(product):t('sizeDetailsNotListed');
    const onlineUrl=publicCustomerProductUrl(product),driveUrl=productDriveUrl(product);
    return `<article class="print-collection-card"><div class="print-collection-card-head"><div><h2>${escapeHtml(product.name)}</h2><p>${escapeHtml(code.replace(/^ · /,''))}</p></div><span class="print-sheet-status ${product.reserved?'reserved':''}">${escapeHtml(product.reserved?t('reserved'):t('available'))}</span></div>${image?.src?`<img class="print-collection-image" src="${escapeHtml(image.src)}" alt="${escapeHtml(product.name)}">`:'<div class="print-collection-image print-collection-no-image">No image</div>'}<dl class="print-collection-specs"><div><dt>${escapeHtml(t('stock'))}</dt><dd>${escapeHtml(`${stock}${area}${weight}`)}</dd></div><div><dt>${escapeHtml(t('dimensions'))}</dt><dd>${escapeHtml(dimensions)}</dd></div><div><dt>${escapeHtml(t('surfaceType'))}</dt><dd>${escapeHtml(productSurfaceLabel(product))}</dd></div><div><dt>${escapeHtml(t('location'))}</dt><dd>Denizli, Türkiye</dd></div></dl><div class="print-collection-links"><a href="${escapeHtml(onlineUrl)}">${escapeHtml(t('onlineGallery'))} ↗</a><a href="${escapeHtml(driveUrl)}">${escapeHtml(t('openDrive'))} ↗</a></div>${qrCodeMarkup(onlineUrl,t('scanToView'),'print-collection-qr')}</article>`;
  }).join('');
  return `<div class="print-collection-page"><header class="print-collection-header"><div><div class="print-sheet-brand">LUCRA MARBLE · DENİZLİ, TÜRKİYE</div><h1>${escapeHtml(customerCollectionTitle||t('collectionSheet'))}</h1><p>${escapeHtml(t('collectionIntro'))}</p></div><div class="print-collection-header-side"><div class="print-sheet-label">${escapeHtml(`${records.length} ${t('selectedBundles')}`)}</div>${qrCodeMarkup(collectionUrl)}</div></header><section class="print-collection-grid">${cards}</section><p class="print-collection-footer">${escapeHtml(`${t('availabilityNote')} ${t('contactForPricing')}`)}</p></div>`;
}
function printPresentationCollection(){
  commitCustomerCollectionTitle();
  const selected=selectedPresentationProducts();if(!selected.length)return;
  let sheet=document.querySelector('#printCollectionSheet');
  if(!sheet){sheet=document.createElement('div');sheet.id='printCollectionSheet';sheet.className='print-collection';document.body.appendChild(sheet)}
  sheet.innerHTML=printCollectionMarkup(selected);
  document.body.classList.add('printing-collection');
  const cleanup=()=>{document.body.classList.remove('printing-collection');sheet.innerHTML='';window.removeEventListener('afterprint',cleanup)};
  window.addEventListener('afterprint',cleanup);
  const waitForImages=Array.from(sheet.querySelectorAll('img')).map(image=>new Promise(resolve=>{if(image.complete){resolve();return}image.onload=resolve;image.onerror=resolve;setTimeout(resolve,3200)}));
  Promise.race([Promise.all(waitForImages),new Promise(resolve=>setTimeout(resolve,3500))]).then(()=>window.print());
}

function setCatalogColumns(value){
  if(!['2','3','4'].includes(value))return;
  catalogColumns=value;
  document.body.classList.remove('catalog-columns-2','catalog-columns-3','catalog-columns-4');
  document.body.classList.add(`catalog-columns-${value}`);
  catalogViewButtons.forEach(button=>{
    const active=button.dataset.columns===value;
    button.classList.toggle('active',active);
    button.setAttribute('aria-pressed',String(active));
  });
  try{localStorage.setItem('lucraCatalogColumns',value)}catch(error){}
}

function catalogSlabImages(product){return (product.images||[]).filter(image=>image.type==='slab')}
function catalogImageIndex(product,images){
  const stored=catalogImageIndexes.get(productKey(product));
  if(Number.isFinite(stored))return images.length?Math.min(Math.max(stored,0),images.length-1):0;
  const preferred=productThumbnailImage(product);
  const preferredIndex=preferred?.type==='slab'?images.findIndex(image=>image.fileId===preferred.fileId):-1;
  return preferredIndex>=0?preferredIndex:0;
}
function catalogCardImage(product){
  const slabImages=catalogSlabImages(product),catalogIndex=catalogImageIndex(product,slabImages),preferred=productThumbnailImage(product);
  return catalogImageIndexes.has(productKey(product))?(slabImages[catalogIndex]||preferred||product.images?.[0]):(preferred||slabImages[catalogIndex]||product.images?.[0]);
}
function catalogImagePosition(image,index,total){return image?.type==='slab'?`Slab ${image?.label||index+1} · ${index+1} / ${total}`:(image?.label||image?.name||'Thumbnail')}
function updateCatalogCardImage(card,product,direction){
  const images=catalogSlabImages(product);
  if(images.length<2)return;
  const current=catalogImageIndex(product,images),next=(current+direction+images.length)%images.length,image=images[next];
  catalogImageIndexes.set(productKey(product),next);
  const imageElement=card.querySelector('img[data-catalog-image]'),container=card.querySelector('.card-image');
  if(!imageElement||!container)return;
  container.classList.remove('image-error','image-contained');
  container.classList.toggle('is-loading',Boolean(image.src));
  imageElement.classList.remove('loaded');
  imageElement.dataset.photoFileId=image.fileId||'';
  if(image.thumbSrc)imageElement.srcset=`${image.thumbSrc} 700w, ${image.src} 1400w`;
  else imageElement.removeAttribute('srcset');
  imageElement.src=image.thumbSrc||image.src;
  imageElement.alt=`${product.name} slab ${image.label||next+1}`;
  const position=card.querySelector('.catalog-image-position');
  if(position)position.textContent=catalogImagePosition(image,next,images.length);
}

function setCatalogStatusFilter(value){
  currentFilter=value;
  document.querySelectorAll('.filter').forEach(filter=>{
    const active=filter.dataset.filter===value;
    filter.classList.toggle('active',active);
    filter.setAttribute('aria-pressed',String(active));
  });
}
function activeFilterEntries(){
  const entries=[],query=search.value.trim();
  if(query)entries.push({key:'search',label:`${t('searchFilter')}: ${query}`});
  if(currentFilter!=='all'){
    const button=document.querySelector(`.filter[data-filter="${currentFilter}"]`);
    entries.push({key:'status',label:`${t('statusFilter')}: ${button?.textContent.trim()||currentFilter}`});
  }
  if(sortSelect.value!=='name')entries.push({key:'sort',label:`${t('sortFilter')}: ${sortSelect.options[sortSelect.selectedIndex]?.textContent||sortSelect.value}`});
  [[minArea,'minAreaFilter'],[maxArea,'maxAreaFilter'],[minSlabs,'minSlabsFilter'],[maxSlabs,'maxSlabsFilter']].forEach(([input,key])=>{if(input.value.trim())entries.push({key:input.id,label:`${t(key)}: ${input.value.trim()}`})});
  if(dimensionFilter.value.trim())entries.push({key:'dimension',label:`${t('sizeFilter')}: ${dimensionFilter.value.trim()}`});
  if(surfaceFilter.value!=='all')entries.push({key:'surface',label:`${t('surfaceFilter')}: ${surfaceFilter.options[surfaceFilter.selectedIndex]?.textContent||surfaceFilter.value}`});
  if(packingFilter.value!=='all')entries.push({key:'packing',label:`${t('packingFilter')}: ${packingFilter.options[packingFilter.selectedIndex]?.textContent||packingFilter.value}`});
  if(mediaFilter.value!=='all')entries.push({key:'media',label:`${t('photosFilter')}: ${mediaFilter.options[mediaFilter.selectedIndex]?.textContent||mediaFilter.value}`});
  return entries;
}
function renderActiveFilterChips(){
  if(!activeFilterChips)return;
  const entries=activeFilterEntries();
  activeFilterChips.hidden=entries.length===0;
  activeFilterChips.innerHTML=entries.length?`<span class="active-filter-label">${escapeHtml(t('activeFilters'))}</span>${entries.map(entry=>`<button type="button" class="filter-chip" data-clear-filter="${escapeHtml(entry.key)}" aria-label="${escapeHtml(`${t('removeFilter')}: ${entry.label}`)}">${escapeHtml(entry.label)} <span aria-hidden="true">×</span></button>`).join('')}`:'';
}
function clearSingleFilter(key){
  if(key==='search')search.value='';
  else if(key==='status')setCatalogStatusFilter('all');
  else if(key==='sort')sortSelect.value='name';
  else{
    const controls={minArea,maxArea,minSlabs,maxSlabs,dimension:dimensionFilter,surface:surfaceFilter,packing:packingFilter,media:mediaFilter};
    const control=controls[key];
    if(control)control.value=['surface','packing','media'].includes(key)?'all':'';
  }
  render();
}
function resetAllFilters(){
  search.value='';
  setCatalogStatusFilter('all');
  sortSelect.value='name';
  [minArea,maxArea,minSlabs,maxSlabs,dimensionFilter].forEach(input=>input.value='');
  surfaceFilter.value='all';
  packingFilter.value='all';
  mediaFilter.value='all';
  document.body.classList.remove('filters-open');
  advancedFiltersToggle.setAttribute('aria-expanded','false');
  const label=advancedFiltersToggle.querySelector('[data-i18n]');
  if(label)label.textContent=t('moreFilters');
  advancedFiltersToggle.lastElementChild.textContent='⌄';
  render();
}

function render(){
  populateSurfaceFilter();
  renderCollectionBanner();
  renderPresentationCollection();
  const visible=filteredProducts();
  count.textContent=`${visible.length} ${visible.length===1?t('bundleSingular'):t('bundles')}`;
  empty.hidden=visible.length>0;
  renderSalesDashboard(visible);
  renderActiveFilterChips();
  grid.innerHTML=visible.map((p,index)=>{const selected=presentationSelection.has(productKey(p)),slabImages=catalogSlabImages(p),catalogIndex=catalogImageIndex(p,slabImages),preferredImage=productThumbnailImage(p),image=catalogImageIndexes.has(productKey(p))?(slabImages[catalogIndex]||preferredImage||p.images[0]):(preferredImage||slabImages[catalogIndex]||p.images[0]),cardSrc=image?.thumbSrc||image?.src,hasCatalogNav=slabImages.length>1,bundleLabel=p.code&&p.code!=='—'?` · ${t('bundle')} ${p.code}`:'';return `<article class="card" tabindex="0" aria-label="${escapeHtml(`${t('openGallery')}: ${p.name}${bundleLabel}`)}" aria-keyshortcuts="Enter Space" data-product-id="${escapeHtml(productKey(p))}">
    <div class="card-image ${image?.src?'is-loading':''}"><div class="stone-placeholder" style="--stone:${p.stone}"></div>${image?.src?`<span class="image-loading-badge">${escapeHtml(t('imageLoading'))}</span><img data-catalog-image="true" data-product-id="${escapeHtml(productKey(p))}" data-photo-file-id="${escapeHtml(image.fileId||'')}" src="${escapeHtml(cardSrc)}" ${image.thumbSrc?`srcset="${escapeHtml(image.thumbSrc)} 700w, ${escapeHtml(image.src)} 1400w" sizes="(max-width:580px) calc(100vw - 40px), (max-width:900px) calc(50vw - 26px), calc(50vw - 26px)"`:''} alt="${escapeHtml(p.name)} slab ${escapeHtml(image.label||catalogIndex+1)}" loading="${index<2?'eager':'lazy'}" fetchpriority="${index<2?'high':'low'}" decoding="async" onload="this.classList.add('loaded');const container=this.closest('.card-image');container.classList.remove('is-loading');const ratio=this.naturalWidth/this.naturalHeight;container.classList.toggle('image-contained',ratio<1.38||ratio>1.78)" onerror="this.classList.add('image-failed');const container=this.closest('.card-image');container.classList.remove('is-loading');container.classList.add('image-error')"><span class="image-error-badge">${escapeHtml(t('imageUnavailableShort'))}</span>`:''}${hasCatalogNav?`<button type="button" class="catalog-image-nav prev" data-catalog-direction="-1" aria-label="${escapeHtml(`${t('previousSlab')} · ${p.name}`)}">‹</button><span class="catalog-image-position" aria-live="polite">${escapeHtml(catalogImagePosition(image,catalogIndex,slabImages.length))}</span><button type="button" class="catalog-image-nav next" data-catalog-direction="1" aria-label="${escapeHtml(`${t('nextSlab')} · ${p.name}`)}">›</button>`:''}
      <span class="status-badge ${p.reserved?'reserved':''}">${escapeHtml(p.reserved?t('reserved'):t('available'))}</span>${freshnessBadgeMarkup(p)}${sharedCollectionActive?'':`<button type="button" class="card-collection-toggle ${selected?'selected':''}" data-product-id="${escapeHtml(productKey(p))}" aria-pressed="${selected}" aria-label="${escapeHtml(t(selected?'removeFromCollection':'addToCollection'))} ${escapeHtml(p.name)}${escapeHtml(bundleLabel)}"><span aria-hidden="true">${selected?'✓':'+'}</span><span>${escapeHtml(t(selected?'removeFromCollection':'addToCollection'))}</span></button>`}</div>
    <div class="card-info"><div><h3>${escapeHtml(p.name)}</h3><p class="card-meta">${escapeHtml(productStock(p))}</p>${p.media?`<p class="card-media-meta">${escapeHtml(p.media)}</p>`:''}</div><span class="card-code">${escapeHtml(p.code&&p.code!=='—'?`${t('bundle')} ${p.code}`:t('notProvided'))}</span></div>
  </article>`}).join('');
  grid.querySelectorAll('img[data-photo-file-id]').forEach(image=>{
    image.addEventListener('load',()=>markPhotoVerified(image.dataset.productId,image.dataset.photoFileId));
    image.addEventListener('error',()=>markPhotoBroken(image.dataset.productId,image.dataset.photoFileId));
    if(image.complete){if(image.naturalWidth)markPhotoVerified(image.dataset.productId,image.dataset.photoFileId);else markPhotoBroken(image.dataset.productId,image.dataset.photoFileId)}
  });
  grid.querySelectorAll('.catalog-image-nav').forEach(button=>button.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();const card=button.closest('.card'),product=products.find(item=>productKey(item)===card?.dataset.productId);if(product)updateCatalogCardImage(card,product,Number(button.dataset.catalogDirection))}));
  grid.querySelectorAll('.card').forEach(card=>{const toggle=card.querySelector('.card-collection-toggle');toggle?.addEventListener('click',event=>{event.stopPropagation();togglePresentationSelection(card.dataset.productId,!presentationSelection.has(card.dataset.productId))});card.addEventListener('click',event=>{if(!event.target.closest('button'))openProduct(card.dataset.productId)});card.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&!e.target.closest('button')){e.preventDefault();openProduct(card.dataset.productId)}})});
}

document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{setCatalogStatusFilter(btn.dataset.filter);render()}));
catalogViewButtons.forEach(button=>button.addEventListener('click',()=>setCatalogColumns(button.dataset.columns)));
search.addEventListener('input',render);
sortSelect.addEventListener('change',render);
[minArea,maxArea,minSlabs,maxSlabs,dimensionFilter,surfaceFilter,packingFilter,mediaFilter].forEach(input=>input.addEventListener(input.tagName==='SELECT'?'change':'input',render));
clearFiltersButton.addEventListener('click',resetAllFilters);
activeFilterChips?.addEventListener('click',event=>{const chip=event.target.closest('[data-clear-filter]');if(chip)clearSingleFilter(chip.dataset.clearFilter)});
clearCollectionButton.addEventListener('click',clearSharedCollection);
copySharedCollectionLink?.addEventListener('click',()=>{if(sharedCollectionActive)copyText(publicSharedCollectionUrl(),copySharedCollectionLink,t('listLinkCopied'))});
presentationCollectionName.addEventListener('input',event=>{customerCollectionTitle=event.currentTarget.value;renderPresentationCollection()});
sharePresentationCollectionButton.addEventListener('click',async()=>{const selected=selectedPresentationProducts();if(!selected.length)return;const title=commitCustomerCollectionTitle(),url=publicCustomerCollectionUrl(selected,title);await copyText(url,sharePresentationCollectionButton,t('collectionLinkCopied'))});
copyPresentationCollectionSummaryButton.addEventListener('click',()=>{const selected=selectedPresentationProducts();if(selected.length)copyText(customerCollectionSummary(selected,commitCustomerCollectionTitle()),copyPresentationCollectionSummaryButton,t('collectionSummaryCopied'))});
printPresentationCollectionButton.addEventListener('click',printPresentationCollection);
whatsappPresentationCollectionButton.addEventListener('click',()=>{const selected=selectedPresentationProducts();if(selected.length)openWhatsApp(customerCollectionSummary(selected,commitCustomerCollectionTitle()))});
clearPresentationCollectionButton.addEventListener('click',()=>{presentationSelection.clear();savePresentationSelection();render()});
advancedFiltersToggle.addEventListener('click',()=>{const open=document.body.classList.toggle('filters-open');advancedFiltersToggle.setAttribute('aria-expanded',String(open));advancedFiltersToggle.querySelector('[data-i18n]').textContent=t(open?'hideFilters':'moreFilters');advancedFiltersToggle.lastElementChild.textContent=open?'⌃':'⌄'});
showMissingPacking.addEventListener('change',event=>{showMissingPackingValue=event.currentTarget.checked;try{localStorage.setItem('lucraShowMissingPacking',showMissingPackingValue?'1':'0')}catch(error){}render()});
document.querySelectorAll('.sales-quick-filter').forEach(button=>button.addEventListener('click',()=>{salesQuickFilter=button.dataset.auditFilter||'all';render()}));
salesSearchInput.addEventListener('input',event=>{salesSearch=event.currentTarget.value;render()});
salesSortSelect.addEventListener('change',event=>{salesSort=event.currentTarget.value;render()});
followupFilterSelect.addEventListener('change',event=>{salesFollowupFilter=event.currentTarget.value;render()});
shortlistSelect.addEventListener('change',event=>switchShortlist(event.currentTarget.value));
newShortlistButton.addEventListener('click',createShortlist);renameShortlistButton.addEventListener('click',renameShortlist);deleteShortlistButton.addEventListener('click',deleteShortlist);
toggleHealthButton.addEventListener('click',()=>{const expanded=!healthDetails.hidden;healthDetails.hidden=expanded;toggleHealthButton.setAttribute('aria-expanded',String(!expanded));toggleHealthButton.textContent=!expanded?t('hideDetails'):t('showDetails')});
healthSummary.addEventListener('click',event=>{const card=event.target.closest('[data-audit-filter]');if(card)setAuditFilter(card.dataset.auditFilter)});
toggleAuditButton.addEventListener('click',()=>setAuditOpen(auditPanel.hidden));
auditFilterSelect.addEventListener('change',event=>{auditFilter=event.currentTarget.value;renderSyncAudit()});
exportAuditButton.addEventListener('click',downloadAudit);
function setSalesMode(enabled){document.body.classList.toggle('sales-mode',enabled);catalogView.hidden=enabled;document.querySelector('#modeLabel').textContent=enabled?t('salesMode'):t('presentationMode');render()}
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
shortlistQuoteForm.addEventListener('submit',submitShortlistQuoteRequest);
whatsappShortlistQuoteButton.addEventListener('click',sendShortlistQuoteViaWhatsApp);
closeShortlistQuoteButton.addEventListener('click',()=>shortlistQuoteDialog.close());
shortlistQuoteCloseButton.addEventListener('click',()=>shortlistQuoteDialog.close());
saveSalesNoteButton.addEventListener('click',()=>{if(!currentProduct)return;salesNotes[productKey(currentProduct)]={status:followupStatus.value,note:salesNote.value.trim(),updatedAt:new Date().toISOString()};try{localStorage.setItem('lucraSalesNotes',JSON.stringify(salesNotes))}catch(error){}noteSaved.textContent=t('saved');setTimeout(()=>noteSaved.textContent='',1600);renderSalesDashboard(filteredProducts())});

const dialog=document.querySelector('#productDialog');
const gallerySurface=document.querySelector('.gallery'), galleryImage=document.querySelector('#dialogImage'), galleryHint=document.querySelector('#galleryHint'), galleryLoadingLabel=document.querySelector('#galleryLoadingLabel'), galleryRetryButton=document.querySelector('#galleryRetry'), galleryZoomButton=document.querySelector('#galleryZoom'), galleryExpandButton=document.querySelector('#galleryExpand'), dialogCloseButton=document.querySelector('#dialogClose'), customerCta=document.querySelector('.customer-cta');
const salesFollowupSection=document.querySelector('.sales-followup'), bundleQrPanel=document.querySelector('#bundleQrPanel');
let galleryPanX=0, galleryPanY=0, galleryPanning=false, galleryPanStart=null, gallerySwipeStart=null, galleryZoomScale=1.55, galleryPointers=new Map(), galleryPinchStart=null, galleryPreloadCache=new Map(), dialogReturnFocus=null;
function moveGalleryImage(direction){
  if(!currentProduct?.images.length)return;
  imageIndex=(imageIndex+direction+currentProduct.images.length)%currentProduct.images.length;
  updateGallery();
  requestAnimationFrame(()=>document.querySelector(direction<0?'#prevImage':'#nextImage')?.focus());
}
function compactGalleryLabel(label){
  return String(label??'').replace(/\bclose(?:[- ]?up)?\b/ig,'C').replace(/\bbookmatch(?:ed)?\b/ig,'BM').replace(/\blight\b/ig,'L').replace(/\bzoom\b/ig,'Z').replace(/[()]/g,'').replace(/\s+/g,' ').trim();
}
function updateGalleryJumpLabels(){
  const compact=dialog.classList.contains('gallery-focus');
  document.querySelectorAll('#slabNumbers .slab-number').forEach(button=>{button.textContent=compact?compactGalleryLabel(button.dataset.fullLabel):button.dataset.fullLabel});
}
function updateGalleryZoomControl(){
  const zoomed=galleryImage.classList.contains('zoomed');
  galleryZoomButton.textContent=zoomed?'↺':dialog.classList.contains('gallery-focus')?'Z':'＋ Zoom';
  galleryZoomButton.title=zoomed?t('resetZoom'):t('zoom');
  galleryZoomButton.setAttribute('aria-label',galleryZoomButton.title);
}
function setGalleryLoading(active,label=t('imageLoading')){
  gallerySurface.classList.toggle('is-loading',active);gallerySurface.setAttribute('aria-busy',String(active));galleryLoadingLabel.hidden=!active;
  if(active){galleryLoadingLabel.textContent=label;galleryLoadingLabel.setAttribute('aria-label',label)}
}
function preloadGalleryNeighbors(){
  const images=currentProduct?.images||[];
  if(images.length<2)return;
  [1,-1].forEach(offset=>{
    const image=images[(imageIndex+offset+images.length)%images.length];
    if(!image?.src)return;
    if(galleryPreloadCache.has(image.src))return;
    const preloader=new Image();preloader.decoding='async';preloader.fetchPriority='low';preloader.addEventListener('load',()=>markPhotoVerified(productKey(currentProduct),image.fileId||image.src),{once:true});preloader.addEventListener('error',()=>markPhotoBroken(productKey(currentProduct),image.fileId||image.src),{once:true});preloader.src=image.src;galleryPreloadCache.set(image.src,preloader);
  });
}
function openProduct(id){
  if(!dialog.open)dialogReturnFocus=document.activeElement;
  const candidate=products.find(p=>productKey(p)===id);
  if(candidate&&!document.body.classList.contains('sales-mode')&&!isCustomerVisible(candidate))return;
  const cardImage=candidate?catalogCardImage(candidate):null;
  const matchingImageIndex=candidate?.images?.findIndex(image=>Boolean(cardImage)&&((cardImage.fileId&&image.fileId===cardImage.fileId)||(!cardImage.fileId&&cardImage.src&&image.src===cardImage.src)))??-1;
  currentProduct=candidate; imageIndex=matchingImageIndex>=0?matchingImageIndex:0;galleryPreloadCache.clear();
  if(!currentProduct)return;
  openProductLink.href=customerProductUrl(currentProduct);
  bundleQrPanel.hidden=false;bundleQrPanel.setAttribute('aria-label',`${t('scanToView')}: ${currentProduct.name}`);bundleQrPanel.innerHTML=qrCodeMarkup(publicCustomerProductUrl(currentProduct),t('scanToView'),'bundle-qr-code');
  updateShareMetadata(currentProduct);
  dialogCloseButton.setAttribute('aria-label',t('closeGallery'));gallerySurface.setAttribute('aria-label',`${t('galleryLabel')}: ${currentProduct.name}`);
  document.querySelector('#dialogCode').textContent=currentProduct.code;
  document.querySelector('#dialogName').textContent=currentProduct.name;
  const hasPackingList=Boolean(currentProduct.packingList);
  document.querySelector('#dialogPcs').textContent=currentProduct.pcs!=null?currentProduct.pcs:(hasPackingList?'Not listed':'No packing list');
  document.querySelector('#dialogSqm').textContent=currentProduct.sqm!=null?`${Number(currentProduct.sqm).toFixed(2)} m² · ${(Number(currentProduct.sqm)*10.7639).toFixed(0)} ft²`:(hasPackingList?t('areaNotProvided'):t('noPackingList'));
  document.querySelector('#dialogWeight').textContent=productWeightLabel(currentProduct);
  document.querySelector('#dialogWeightNote').textContent=productWeightAssumption(currentProduct);
  document.querySelector('#dialogSize').textContent=currentProduct.dimensions?.length?productDimensions(currentProduct):(hasPackingList?t('sizeNotProvided'):t('noPackingList'));
  document.querySelector('#dialogSurface').textContent=productSurfaceLabel(currentProduct);
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
  requestAnimationFrame(()=>dialogCloseButton.focus());
}
function updateGallery(){
  const img=galleryImage;
  const selected=currentProduct.images[imageIndex];
  const slabLabel=selected?.label??'';
  galleryPanX=0;galleryPanY=0;galleryZoomScale=1.55;galleryPointers.clear();galleryPinchStart=null;gallerySwipeStart=null;img.classList.remove('zoomed','panning');img.style.transform='';updateGalleryZoomControl();
  img.classList.remove('image-failed');galleryRetryButton.hidden=true;galleryRetryButton.textContent=t('retryImage');galleryRetryButton.setAttribute('aria-label',t('retryImage'));
  galleryHint.hidden=currentProduct.images.length>0;galleryHint.textContent=currentProduct.images.length?'':t('noImageAvailable');setGalleryLoading(currentProduct.images.length>0);
  if(currentProduct.images.length){img.dataset.productId=productKey(currentProduct);img.dataset.photoFileId=selected.fileId||'';img.loading='eager';img.fetchPriority='high';img.decoding='async';img.src=selected.src;img.alt=`${currentProduct.name} ${selected.type==='slab'?`slab ${selected.label}`:selected.label}`;img.style.background='';preloadGalleryNeighbors()}else{delete img.dataset.productId;delete img.dataset.photoFileId;img.removeAttribute('src');img.alt='';img.style.background=currentProduct.stone}
  const galleryCount=document.querySelector('#galleryCount'),previousButton=document.querySelector('#prevImage'),nextButton=document.querySelector('#nextImage');
  galleryCount.textContent=currentProduct.images.length?`${t('photo')} ${imageIndex+1} ${t('of')} ${currentProduct.images.length} · ${selected.type==='slab'?`Slab ${slabLabel}`:selected.label}`:'Drive gallery';
  galleryCount.setAttribute('aria-live','polite');gallerySurface.setAttribute('aria-label',`${t('galleryLabel')}: ${currentProduct.name}`);previousButton.setAttribute('aria-label',t('previousPhoto'));nextButton.setAttribute('aria-label',t('nextPhoto'));
  previousButton.hidden=currentProduct.images.length<2;nextButton.hidden=currentProduct.images.length<2;
  const numbers=document.querySelector('#slabNumbers');
  const picker=document.querySelector('#slabPickerWrap');
  picker.hidden=currentProduct.images.length===0;
  numbers.setAttribute('aria-label',`${t('jumpToSlab')}: ${currentProduct.name}`);
  const jumpTargets=currentProduct.images.reduce((targets,image,i)=>{if(!targets.some(target=>target.label===image.label&&target.type===image.type))targets.push({label:image.label,type:image.type,index:i});return targets},[]);
  const compact=dialog.classList.contains('gallery-focus');
  numbers.innerHTML=jumpTargets.map(target=>{const active=currentProduct.images[imageIndex]?.label===target.label&&currentProduct.images[imageIndex]?.type===target.type;const label=target.type==='slab'?`${t('viewSlab')} ${target.label}`:`${t('viewAdditional')} ${target.label}`;return `<button type="button" class="slab-number ${target.type==='extra'?'extra':''} ${active?'active':''}" data-index="${target.index}" data-full-label="${escapeHtml(target.label)}" aria-label="${escapeHtml(label)}" aria-pressed="${active}" title="${escapeHtml(target.label)}">${escapeHtml(compact?compactGalleryLabel(target.label):target.label)}</button>`}).join('');
  numbers.querySelectorAll('.slab-number').forEach(button=>button.addEventListener('click',()=>{imageIndex=Number(button.dataset.index);updateGallery();requestAnimationFrame(()=>numbers.querySelector('.active')?.focus())}));
  numbers.querySelector('.active')?.scrollIntoView({behavior:compact?'auto':'smooth',block:'nearest',inline:'center'});
}
document.querySelector('#prevImage').addEventListener('click',()=>moveGalleryImage(-1));
document.querySelector('#nextImage').addEventListener('click',()=>moveGalleryImage(1));
document.querySelector('#dialogClose').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
function retryGalleryImage(){
  const selected=currentProduct?.images?.[imageIndex];
  if(!selected?.src)return;
  galleryPreloadCache.delete(selected.src);galleryRetryButton.hidden=true;galleryHint.hidden=true;galleryImage.classList.remove('image-failed');setGalleryLoading(true,t('retryingImage'));galleryImage.removeAttribute('src');
  requestAnimationFrame(()=>{if(currentProduct?.images?.[imageIndex]!==selected)return;galleryImage.src=selected.src;preloadGalleryNeighbors()});
}
galleryRetryButton.addEventListener('click',retryGalleryImage);
galleryImage.addEventListener('error',()=>{const image=currentProduct?.images?.[imageIndex];markPhotoBroken(currentProduct&&productKey(currentProduct),image?.fileId||image?.src);setGalleryLoading(false);galleryImage.classList.add('image-failed');galleryHint.hidden=false;galleryHint.textContent=t('imageUnavailable');galleryRetryButton.hidden=false});
function galleryContainedSize(){
  const gallery=galleryImage.parentElement;
  const width=gallery?.clientWidth||0, height=gallery?.clientHeight||0;
  const naturalWidth=galleryImage.naturalWidth, naturalHeight=galleryImage.naturalHeight;
  if(!width||!height||!naturalWidth||!naturalHeight)return {width,height};
  const imageRatio=naturalWidth/naturalHeight, boxRatio=width/height;
  return imageRatio>boxRatio?{width,height:width/imageRatio}:{width:height*imageRatio,height};
}
function clampGalleryPan(){
  if(!galleryImage.classList.contains('zoomed')){galleryPanX=0;galleryPanY=0;return;}
  const gallery=galleryImage.parentElement, width=gallery?.clientWidth||0, height=gallery?.clientHeight||0;
  const base=galleryContainedSize();
  if(!width||!height||!base.width||!base.height)return;
  const limitX=Math.max(0,(base.width*galleryZoomScale-width)/2);
  const limitY=Math.max(0,(base.height*galleryZoomScale-height)/2);
  galleryPanX=Math.min(limitX,Math.max(-limitX,galleryPanX));
  galleryPanY=Math.min(limitY,Math.max(-limitY,galleryPanY));
}
function applyGalleryTransform(){
  clampGalleryPan();
  galleryImage.style.transform=galleryImage.classList.contains('zoomed')?`translate(${galleryPanX}px, ${galleryPanY}px) scale(${galleryZoomScale})`:'';
}
function toggleGalleryZoom(){if(!currentProduct?.images.length)return;const zoomed=galleryImage.classList.toggle('zoomed');if(zoomed)galleryZoomScale=1.55;else{galleryPanX=0;galleryPanY=0;galleryZoomScale=1.55}updateGalleryZoomControl();applyGalleryTransform()}
galleryImage.addEventListener('dblclick',toggleGalleryZoom);
galleryZoomButton.addEventListener('click',toggleGalleryZoom);
galleryImage.addEventListener('dragstart',event=>event.preventDefault());
function galleryPointerDistance(){
  const points=[...galleryPointers.values()];
  if(points.length<2)return 0;
  return Math.hypot(points[0].x-points[1].x,points[0].y-points[1].y);
}
galleryImage.addEventListener('pointerdown',event=>{
  if((event.pointerType==='mouse'&&event.button!==0)||!currentProduct?.images.length)return;
  galleryPointers.set(event.pointerId,{x:event.clientX,y:event.clientY});
  if(galleryPointers.size>=2){
    event.preventDefault();gallerySwipeStart=null;galleryPanning=false;galleryPanStart=null;galleryImage.classList.remove('panning');
    const distance=galleryPointerDistance(),initialScale=galleryImage.classList.contains('zoomed')?galleryZoomScale:1;galleryImage.classList.add('zoomed');galleryZoomScale=initialScale;galleryPinchStart={distance,scale:initialScale};updateGalleryZoomControl();applyGalleryTransform();galleryImage.setPointerCapture?.(event.pointerId);return;
  }
  if(galleryImage.classList.contains('zoomed')){
    event.preventDefault();galleryPanning=true;galleryPanStart={x:event.clientX,y:event.clientY,panX:galleryPanX,panY:galleryPanY};galleryImage.classList.add('panning');galleryImage.setPointerCapture?.(event.pointerId);return;
  }
  gallerySwipeStart={x:event.clientX,y:event.clientY,pointerId:event.pointerId};galleryImage.setPointerCapture?.(event.pointerId);
});
galleryImage.addEventListener('pointermove',event=>{
  if(galleryPointers.has(event.pointerId))galleryPointers.set(event.pointerId,{x:event.clientX,y:event.clientY});
  if(galleryPinchStart&&galleryPointers.size>=2){
    event.preventDefault();const distance=galleryPointerDistance();galleryZoomScale=Math.min(3,Math.max(1,galleryPinchStart.scale*(distance/galleryPinchStart.distance||1)));applyGalleryTransform();return;
  }
  if(galleryPanning&&galleryPanStart){galleryPanX=galleryPanStart.panX+event.clientX-galleryPanStart.x;galleryPanY=galleryPanStart.panY+event.clientY-galleryPanStart.y;applyGalleryTransform();return;}
  if(gallerySwipeStart&&Math.abs(event.clientX-gallerySwipeStart.x)>10)event.preventDefault();
});
galleryImage.addEventListener('load',()=>{markPhotoVerified(galleryImage.dataset.productId,galleryImage.dataset.photoFileId);setGalleryLoading(false);galleryImage.classList.remove('image-failed');galleryHint.hidden=true;galleryRetryButton.hidden=true;if(galleryImage.classList.contains('zoomed'))applyGalleryTransform()});
window.addEventListener('resize',()=>{if(galleryImage.classList.contains('zoomed'))applyGalleryTransform()});
function stopGalleryPan(){galleryPanning=false;galleryPanStart=null;galleryImage.classList.remove('panning')}
function finishGalleryPointer(event){
  galleryPointers.delete(event.pointerId);
  if(galleryPinchStart){if(galleryPointers.size<2)galleryPinchStart=null;return;}
  if(galleryPanning){stopGalleryPan();return;}
  if(!gallerySwipeStart)return;
  const start=gallerySwipeStart;gallerySwipeStart=null;
  const deltaX=event.clientX-start.x,deltaY=event.clientY-start.y;
  if(Math.abs(deltaX)>=45&&Math.abs(deltaX)>Math.abs(deltaY)*1.2)moveGalleryImage(deltaX<0?1:-1);
}
galleryImage.addEventListener('pointerup',finishGalleryPointer);
galleryImage.addEventListener('pointercancel',event=>{galleryPointers.delete(event.pointerId);stopGalleryPan();gallerySwipeStart=null;galleryPinchStart=null});
galleryImage.addEventListener('pointerleave',event=>{if(galleryPanning&&!galleryImage.hasPointerCapture?.(event.pointerId))stopGalleryPan()});
function setGalleryFullscreen(fullscreen){
  dialog.classList.toggle('gallery-focus',fullscreen);customerCta.hidden=fullscreen;salesFollowupSection.hidden=fullscreen;
  galleryExpandButton.textContent=fullscreen?'⤡ Exit':'⤢ Fullscreen';galleryExpandButton.title=fullscreen?t('exitFullscreen'):t('fullscreen');galleryExpandButton.setAttribute('aria-label',galleryExpandButton.title);galleryExpandButton.setAttribute('aria-pressed',String(fullscreen));
  gallerySurface.setAttribute('aria-label',`${t('galleryLabel')}: ${currentProduct?.name||''}${fullscreen?' · '+t('fullscreen'):''}`);updateGalleryZoomControl();updateGalleryJumpLabels();requestAnimationFrame(()=>galleryExpandButton.focus());
}
galleryExpandButton.addEventListener('click',()=>setGalleryFullscreen(!dialog.classList.contains('gallery-focus')));
dialog.addEventListener('keydown',event=>{if(!dialog.open||event.target.matches('input,textarea,select'))return;if(event.key==='ArrowLeft'&&currentProduct?.images.length){event.preventDefault();moveGalleryImage(-1)}if(event.key==='ArrowRight'&&currentProduct?.images.length){event.preventDefault();moveGalleryImage(1)}if(event.key.toLowerCase()==='z'){event.preventDefault();toggleGalleryZoom()}if(event.key.toLowerCase()==='f'){event.preventDefault();setGalleryFullscreen(!dialog.classList.contains('gallery-focus'))}});
dialog.addEventListener('close',()=>{dialog.classList.remove('gallery-focus');customerCta.hidden=false;salesFollowupSection.hidden=false;bundleQrPanel.hidden=true;bundleQrPanel.innerHTML='';galleryExpandButton.textContent='⤢ Fullscreen';galleryExpandButton.title=t('fullscreen');galleryExpandButton.setAttribute('aria-label',galleryExpandButton.title);galleryExpandButton.setAttribute('aria-pressed','false');gallerySurface.setAttribute('aria-label',`${t('galleryLabel')}: ${currentProduct?.name||''}`);galleryPanX=0;galleryPanY=0;galleryZoomScale=1.55;galleryPointers.clear();galleryPinchStart=null;gallerySwipeStart=null;galleryImage.classList.remove('zoomed','panning');galleryImage.style.transform='';updateGalleryZoomControl();updateShareMetadata();const returnFocus=dialogReturnFocus;dialogReturnFocus=null;if(returnFocus?.isConnected&&typeof returnFocus.focus==='function')requestAnimationFrame(()=>returnFocus.focus())});
document.querySelector('#copyLink').addEventListener('click',async(e)=>{const url=customerProductUrl(currentProduct);await navigator.clipboard.writeText(url);e.currentTarget.textContent='Link copied';setTimeout(()=>e.currentTarget.textContent='Copy bundle link',1400)});
openPresentationCollectionButton.addEventListener('click',()=>{const selected=selectedPresentationProducts();if(selected.length){const title=commitCustomerCollectionTitle();window.open(publicCustomerCollectionUrl(selected,title),'_blank','noopener,noreferrer')}});
requestPresentationQuoteButton.addEventListener('click',()=>openShortlistQuoteDialog());
openProductLink.addEventListener('click',event=>{if(!currentProduct){event.preventDefault();return}openProductLink.href=customerProductUrl(currentProduct)});
shareProductButton.addEventListener('click',shareCustomerProduct);
shareCollectionButton.addEventListener('click',shareCustomerCollection);
document.querySelector('#printProduct').addEventListener('click',()=>printProductSheet());
document.querySelector('#requestQuote').addEventListener('click',requestProductQuote);
document.querySelector('#whatsappProduct').addEventListener('click',()=>openWhatsApp(customerQuoteRequest(currentProduct)));
document.querySelector('#compareClose').addEventListener('click',()=>compareDialog.close());
document.querySelector('#closeCompare').addEventListener('click',()=>compareDialog.close());
document.querySelector('#copyCompare').addEventListener('click',()=>copyText(shortlistSummary('Lucra Marble comparison'),copyCompareButton,'Copied'));
compareDialog.addEventListener('click',event=>{if(event.target===compareDialog)compareDialog.close()});

function normalizeLiveProduct(p,i){
  const mediaUrl=(fileId,size=1400)=>location.protocol==='file:'||isGithubPages?`https://drive.google.com/thumbnail?id=${encodeURIComponent(fileId)}&sz=w${size}`:`/api/media?id=${encodeURIComponent(fileId)}&size=${size}`;
  const imageSources=fileId=>({src:mediaUrl(fileId),thumbSrc:mediaUrl(fileId,700)});
  const displayName=canonicalProductName(p.name),productForDisplay={...p,name:displayName},displayCode=displayProductCode(productForDisplay),mysticGrey=isMysticGreyProduct(productForDisplay);
  const slabImages=(p.images||[]).map(image=>({...imageSources(image.fileId),fileId:image.fileId,name:image.name,label:String(mysticGrey?compactMysticImageLabel(image.label??image.name??image.number):image.label??image.number),type:'slab'}));
  const extras=(p.extraImages||[]).map(image=>({...imageSources(image.fileId),fileId:image.fileId,name:image.name,label:mysticGrey?compactMysticImageLabel(image.label||image.name):image.label||'Detail',type:'extra'}));
  const images=[...slabImages,...extras],normalizedProduct={...p,name:displayName,code:displayCode,size:p.dimensions?.length?(p.dimensions.length===1?p.dimensions[0]:`${p.dimensions[0]} + ${p.dimensions.length-1} sizes`):'See packing list',images,slabImageCount:slabImages.length,extraImageCount:extras.length,stone:stones[i%stones.length],media:[slabImages.length?countLabel(slabImages.length,'slabPhoto','slabPhotos'):null,extras.length?countLabel(extras.length,'extraView','extraViews'):null,p.videos?.length?countLabel(p.videos.length,'video','videos'):null].filter(Boolean).join(' · ')};
  const thumbnail=productThumbnailImage(normalizedProduct);
  return {...normalizedProduct,thumbnailFileId:thumbnail?.fileId||null,thumbnailLabel:thumbnail?.label||null};
}

function syncSummary(data){
  const warnings=data.warnings||[], errors=data.errors||[];
  const report=data.report||{};
  const summary=[`${data.count??data.products?.length??0} bundles`];
  if(report.added||report.updated)summary.push(`+${report.added||0} new · ${report.updated||0} updated`);
  if(report.missingPackingLists)summary.push(`${report.missingPackingLists} without packing list`);
  if(report.unreadablePackingLists)summary.push(`${report.unreadablePackingLists} unreadable packing file${report.unreadablePackingLists===1?'':'s'}`);
  if(report.missingAreas)summary.push(`${report.missingAreas} without area`);
  if(report.photoCheckIssues)summary.push(`${report.photoCheckIssues} photo check issue${report.photoCheckIssues===1?'':'s'}`);
  if(report.photoCoverageNotes)summary.push(`${report.photoCoverageNotes} photo coverage note${report.photoCoverageNotes===1?'':'s'}`);
  if(report.sourceMismatches)summary.push(`${report.sourceMismatches} source name/code mismatch${report.sourceMismatches===1?'':'es'}`);
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

function localSnapshotNeedsRefresh(data){
  const synced=Date.parse(data?.syncedAt||'');
  return !Number.isFinite(synced)||Date.now()-synced>2*60*60*1000;
}
async function fetchPublishedSnapshot(){
  const stamp=Date.now();
  const inventoryResponse=await fetch(`${publicSiteBase}data/inventory.json?ts=${stamp}`,{cache:'no-store'});
  if(!inventoryResponse.ok)throw new Error('No published inventory');
  const data=await inventoryResponse.json();
  const [historyData,statusData]=await Promise.all([
    fetch(`${publicSiteBase}data/sync_history.json?ts=${stamp}`,{cache:'no-store'}).then(response=>response.ok?response.json():null).catch(()=>null),
    fetch(`${publicSiteBase}data/sync_status.json?ts=${stamp}`,{cache:'no-store'}).then(response=>response.ok?response.json():null).catch(()=>null),
  ]);
  return {data,historyData,statusData};
}
function fetchPublishedScriptSnapshot(){
  return new Promise((resolve,reject)=>{
    const previous=window.LUCRA_INVENTORY,script=document.createElement('script');
    script.async=true;script.src=`${publicSiteBase}data/inventory.js?ts=${Date.now()}`;
    script.onload=()=>{
      const data=window.LUCRA_INVENTORY;
      window.LUCRA_INVENTORY=previous;script.remove();
      data?.products?resolve({data,historyData:data.syncHistory||null,statusData:data.syncStatus||null}):reject(new Error('No published inventory script'));
    };
    script.onerror=()=>{script.remove();reject(new Error('Published inventory script unavailable'))};
    document.head.appendChild(script);
  });
}

    async function loadInventory(){
      try{
        let data,historyData=null,statusData=null,inventorySource='Local snapshot';
        if(location.protocol==='file:'){
          data=window.LUCRA_INVENTORY;
          if(!data)throw new Error('No local inventory snapshot');
          historyData=data.syncHistory||null;
          statusData=data.syncStatus||null;
          if(localSnapshotNeedsRefresh(data)){
            try{
              const published=await fetchPublishedSnapshot();
              data=published.data;historyData=published.historyData;statusData=published.statusData;inventorySource='Published catalogue';
            }catch(error){
              try{
                const published=await fetchPublishedScriptSnapshot();
                data=published.data;historyData=published.historyData;statusData=published.statusData;inventorySource='Published catalogue';
              }catch(scriptError){
                inventorySource='Local snapshot';
              }
            }
          }
        }else{
          const stamp=Date.now();
          const inventoryResponse=await fetch(`data/inventory.json?ts=${stamp}`);
          if(!inventoryResponse.ok)throw new Error('No synced inventory');
          data=await inventoryResponse.json();
          [historyData,statusData]=await Promise.all([
            fetch(`data/sync_history.json?ts=${stamp}`).then(response=>response.ok?response.json():null).catch(()=>null),
            fetch(`data/sync_status.json?ts=${stamp}`).then(response=>response.ok?response.json():null).catch(()=>null),
          ]);
        }
        const historyRuns=Array.isArray(historyData)?historyData:historyData&&Array.isArray(historyData.runs)?historyData.runs:data.syncHistory;
        syncHistory=Array.isArray(historyRuns)?historyRuns:[];
        syncState=statusData||data.syncStatus||null;
        brokenPhotoIdsByProduct.clear();verifiedPhotoIdsByProduct.clear();catalogImageIndexes.clear();photoVerification.checked=0;photoVerification.failed=0;photoVerification.lastCheckedAt=null;
        products=assignBundleKeys((data.products||[]).map(normalizeLiveProduct));pruneShortlist();prunePresentationSelection();pruneCustomerVisibility();const reportedInventory=data.report&&Object.keys(data.report).length?data.report:deriveInventoryReport(products),sourceIssues=products.filter(product=>sourceMismatchInfo(product).hasIssue),photoIssues=products.filter(product=>photoCheck(product).hasIssue),photoCoverageNotes=products.filter(product=>imageAudit(product).mismatch);inventoryReport={...reportedInventory,photoCheckIssues:photoIssues.length,photoCoverageNotes:photoCoverageNotes.length,sourceMismatches:sourceIssues.length,sourceMismatchFolders:sourceIssues.map(product=>product.folderName)};syncedAt=data.syncedAt;
        syncStatus.innerHTML=`<i></i> ${products.length} bundles · ${new Date(syncedAt).toLocaleDateString()}`;
        setSyncFeedback({...data,count:products.length,report:inventoryReport},location.protocol==='file:'?inventorySource:isGithubPages?'Last published sync':'Last sync');
      }catch(error){syncStatus.innerHTML='<i></i> Preview data';syncStatus.title='';syncFeedback.textContent='';syncHistory=[];syncState=null;}
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
setCatalogColumns(catalogColumns);
loadInventory().then(openHashProduct);
