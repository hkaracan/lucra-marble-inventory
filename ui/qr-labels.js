/* Staff download panel; uses the inventory and shortlist already loaded by app.js. */
(() => {
  const button=document.createElement('button');button.type='button';button.className='secondary';button.id='downloadQrLabels';
  document.querySelector('#salesDashboard .shortlist-actions').prepend(button);
  const dialog=document.createElement('dialog');dialog.id='qrLabelsDialog';dialog.className='qr-label-dialog';dialog.setAttribute('aria-labelledby','qrLabelsTitle');
  dialog.innerHTML=`<form id="qrLabelsForm"><header><h2 id="qrLabelsTitle"></h2><button type="button" id="qrLabelsClose" aria-label="Close">×</button></header>
    <p id="qrLabelsIntro"></p><p id="qrLabelsUpdated"></p>
    <fieldset><legend id="qrLabelsScope"></legend><label><input type="radio" name="qrScope" value="all" checked><span id="qrLabelsAll"></span></label><label><input type="radio" name="qrScope" value="selected"><span id="qrLabelsSelected"></span></label></fieldset>
    <label class="qr-label-reserved"><input type="checkbox" id="qrLabelsReserved" checked><span id="qrLabelsReservedText"></span></label>
    <p id="qrLabelsSummary" role="status" aria-live="polite"></p><p id="qrLabelsWarning"></p><p id="qrLabelsPrint"></p><p id="qrLabelsError" role="alert"></p>
    <footer><button type="button" id="qrLabelsCancel" class="secondary"></button><button type="submit" id="qrLabelsDownload" class="primary"></button></footer></form>`;
  document.body.append(dialog);
  const $=id=>dialog.querySelector('#'+id);
  const copy={en:{open:'Download QR labels',title:'QR labels',intro:'Six labels per A4 page, with rounded average dimensions.',scope:'Bundles to include',all:'All bundles',selected:'Selected bundles',reserved:'Include reserved bundles',updated:'Stock last updated',unknown:'Not available',summary:(n)=>`${n} labels · ${Math.ceil(n/6)} A4 ${n<=6?'page':'pages'}`,missing:(n)=>`${n} bundle(s) have no average size. Their labels will say “Size not available”.`,partial:(n)=>`${n} bundle(s) have incomplete size data; their averages use only slabs with recorded sizes.`,print:'Print at Actual size / 100% on A4 paper.',cancel:'Cancel',download:'Download PDF',working:'Creating PDF…',empty:'No bundles to include. Choose all bundles or select bundles in the dashboard.',error:'The PDF could not be created. Please try again.',done:'PDF ready. Check your downloads.',selection:(n)=>`Selected bundles (${n})`},tr:{open:'QR etiketlerini indir',title:'QR etiketleri',intro:'Onaylanan A4 tasarımı: sayfa başına altı etiket ve yuvarlanmış ortalama ölçüler.',scope:'Dahil edilecek demetler',all:'Tüm demetler',selected:'Seçili demetler',reserved:'Rezerve demetleri dahil et',updated:'Stok son güncelleme',unknown:'Belirtilmedi',summary:(n)=>`${n} etiket · ${Math.ceil(n/6)} A4 sayfa`,missing:(n)=>`${n} demetin ortalama ölçüsü yok. Etiketlerinde “Size not available” yazacak.`,partial:(n)=>`${n} demetin ölçü verileri eksik; ortalamaları ölçüsü kayıtlı plakaları kullanır.`,print:'A4 kağıda Gerçek boyut / %100 ölçeğinde yazdırın.',cancel:'İptal',download:'PDF indir',working:'PDF hazırlanıyor…',empty:'Dahil edilecek demet yok. Tüm demetleri seçin veya panodan demet seçin.',error:'PDF oluşturulamadı. Lütfen tekrar deneyin.',done:'PDF hazır. İndirilenleri kontrol edin.',selection:(n)=>`Seçili demetler (${n})`}};
  const text=()=>copy[language==='tr'?'tr':'en'];
  const scripts=new Map();
  function script(src) {
    if(!scripts.has(src))scripts.set(src,new Promise((resolve,reject)=>{
      const el=document.createElement('script');el.src=src;el.onload=resolve;el.onerror=()=>{scripts.delete(src);el.remove();reject(Error('PDF asset unavailable'));};document.head.append(el);
    }));
    return scripts.get(src);
  }
  const core=()=>script('ui/qr-labels-core.js?v=1');
  let busy=false;
  function rows() {return window.LucraQRLabels.prepare(products,{selectedOnly:dialog.querySelector('[name="qrScope"]:checked').value==='selected',selected:shortlist,includeReserved:$('qrLabelsReserved').checked},window.LucraSizing,publicCustomerProductUrl);}
  function refresh() {
    const t=text();button.textContent=t.open;
    if(!dialog.open)return;
    for(const [id,key] of [['qrLabelsTitle','title'],['qrLabelsIntro','intro'],['qrLabelsScope','scope'],['qrLabelsAll','all'],['qrLabelsReservedText','reserved'],['qrLabelsPrint','print'],['qrLabelsCancel','cancel']])$(id).textContent=t[key];
    $('qrLabelsClose').setAttribute('aria-label',language==='tr'?'Kapat':'Close');
    $('qrLabelsSelected').textContent=t.selection(selectedProducts().length);
    $('qrLabelsUpdated').textContent=`${t.updated}: ${syncedAt?syncDateLabel(syncedAt):t.unknown}`;
    if(!window.LucraQRLabels)return;
    const records=rows(),missing=records.filter(p=>p.missingSize).length,partial=records.filter(p=>p.partialSize).length;
    $('qrLabelsSummary').textContent=records.length?t.summary(records.length):t.empty;
    $('qrLabelsWarning').textContent=[missing?t.missing(missing):'',partial?t.partial(partial):''].filter(Boolean).join(' ');
    $('qrLabelsDownload').disabled=busy||!records.length;
    $('qrLabelsDownload').textContent=busy?t.working:t.download;
  }
  button.addEventListener('click',async()=>{
    if(!salesUnlocked||!document.body.classList.contains('sales-mode'))return;
    $('qrLabelsError').textContent='';dialog.showModal();refresh();
    $('qrLabelsDownload').disabled=true;
    try{await core();refresh();}catch{ $('qrLabelsError').textContent=text().error; }
  });
  for(const id of ['qrLabelsClose','qrLabelsCancel'])$(id).addEventListener('click',()=>dialog.close());
  dialog.addEventListener('change',()=>{$('qrLabelsError').textContent='';refresh();});
  $('qrLabelsForm').addEventListener('submit',async event=>{
    event.preventDefault();if(busy||!salesUnlocked||!document.body.classList.contains('sales-mode'))return;
    busy=true;refresh();$('qrLabelsError').textContent='';
    try {
      const records=rows();if(!records.length)throw Error('Empty selection');
      await Promise.all([script('ui/vendor/jspdf.umd.min.js'),script('ui/vendor/qrcode.js'),script('ui/qr-label-assets.js?v=1')]);
      const doc=await window.LucraQRLabels.create(records,window.LucraQRLabelAssets,{jsPDF:window.jspdf.jsPDF,qrcode:window.qrcode});
      if(!salesUnlocked||!document.body.classList.contains('sales-mode'))throw Error('Staff session ended');
      const date=new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Istanbul',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
      if(!dialog.open)return;
      doc.save(`lucra_inventory_qr_labels_${date}.pdf`);
      $('qrLabelsSummary').textContent=text().done;
    }catch(error){$('qrLabelsError').textContent=text().error;}
    finally{busy=false;$('qrLabelsDownload').disabled=false;$('qrLabelsDownload').textContent=text().download;}
  });
  new MutationObserver(()=>{refresh();if(dialog.open&&!document.body.classList.contains('sales-mode'))dialog.close();}).observe(document.body,{attributes:true,attributeFilter:['class']});
  new MutationObserver(refresh).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  refresh();
})();
