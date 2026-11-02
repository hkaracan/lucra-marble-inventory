/* Browser-local stock summary. Uses the same bundled PDF library/fonts as QR labels. */
(function(root){
  async function create(records,assets,jsPDF,{title='Stock inventory',updated=null}={}){
    if(!Array.isArray(records)||!records.length)throw Error('No bundles to export');
    const rows=records.map(p=>({...p,name:String(p.name||'Unnamed material'),code:String(p.code||'—'),surface:String(p.surface||'Not listed')}));
    for(const p of rows){const url=new URL(p.url);if(url.origin!=='https://inventory.lucramarble.com'||!url.hash.startsWith('#bundle-'))throw Error('Invalid customer link');}
    const doc=new jsPDF({unit:'pt',format:'a4',orientation:'landscape',compress:true,putOnlyUsedFonts:true});
    for(const [style,data]of [['normal',assets.light],['bold',assets.bold]]){doc.addFileToVFS(`Roboto-${style}.ttf`,data);doc.addFont(`Roboto-${style}.ttf`,'Roboto',style);}
    doc.setProperties({title:`Lucra Marble - ${title}`,author:'Lucra Marble'});
    const width=doc.internal.pageSize.getWidth(),height=doc.internal.pageSize.getHeight(),margin=32;
    const cols=[{label:'Material / surface',x:32,w:244},{label:'Bundle',x:284,w:88},{label:'Status',x:380,w:82},{label:'Slabs',x:470,w:54},{label:'Area (m²)',x:532,w:88},{label:'Average size',x:628,w:180}];
    let y=0;
    const text=(value,x,y,size=10,bold=false,color=[35,50,71])=>{doc.setFont('Roboto',bold?'bold':'normal');doc.setFontSize(size);doc.setTextColor(...color);doc.text(String(value),x,y);};
    const wrap=(value,size,w,bold=false)=>{doc.setFont('Roboto',bold?'bold':'normal');doc.setFontSize(size);return doc.splitTextToSize(String(value),w);};
    const date=updated&&Number.isFinite(Date.parse(updated))?new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Istanbul',day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'}).format(new Date(updated))+' (Türkiye)':'Not available';
    const slabs=rows.reduce((sum,p)=>sum+(Number(p.pcs)||0),0),area=rows.reduce((sum,p)=>sum+(Number(p.sqm)||0),0),unknownCount=rows.filter(p=>p.pcs==null).length,unknownArea=rows.filter(p=>p.sqm==null).length;
    function header(){
      doc.addImage(assets.logo,'PNG',margin,20,94,41,'lucra-logo');
      const titleLines=wrap(title,17,width-182,true);
      doc.setFont('Roboto','bold');doc.setFontSize(17);doc.setTextColor(35,50,71);doc.text(titleLines.slice(0,2),146,35);
      text(`Stock updated: ${date}`,margin,78,9,false,[94,109,120]);
      text(`${rows.length} bundles  |  ${unknownCount?'Known slabs':'Slabs'}: ${slabs}  |  ${unknownArea?'Known area':'Area'}: ${area.toFixed(2)} m²`,margin,95,10,true);
      doc.setFillColor(239,244,246);doc.rect(margin,108,width-margin*2,27,'F');
      for(const c of cols)text(c.label,c.x+5,125,9,true);
      y=135;
    }
    header();
    for(let i=0;i<rows.length;i++){
      const p=rows[i],name=wrap(p.name,11,cols[0].w-10,true),surface=wrap(p.surface,9,cols[0].w-10),size=p.average?`${Math.round(p.average.width)} × ${Math.round(p.average.height)} cm`:'Not available',sizeNote=p.average?.partial?'Recorded sizes only':'';
      const rowHeight=Math.max(49,name.length*13+surface.length*11+16);
      if(y+rowHeight>height-53){doc.addPage();header();await new Promise(resolve=>setTimeout(resolve,0));}
      if(i%2===1){doc.setFillColor(249,251,251);doc.rect(margin,y,width-margin*2,rowHeight,'F');}
      doc.setFont('Roboto','bold');doc.setFontSize(11);doc.setTextColor(35,50,71);doc.text(name,cols[0].x+5,y+16);
      doc.setFont('Roboto','normal');doc.setFontSize(9);doc.setTextColor(94,109,120);doc.text(surface,cols[0].x+5,y+16+name.length*13);
      text(p.code,cols[1].x+5,y+16,10,true);text('View online',cols[1].x+5,y+32,9,false,[22,111,131]);doc.link(cols[1].x+4,y+21,73,15,{url:p.url});
      text(p.reserved?'Reserved':'Available',cols[2].x+5,y+16,10,false,p.reserved?[140,91,28]:[55,111,81]);
      text(p.pcs==null?'—':p.pcs,cols[3].x+5,y+16);
      text(p.sqm==null?'—':Number(p.sqm).toFixed(2),cols[4].x+5,y+16);
      text(size,cols[5].x+5,y+16);if(sizeNote)text(sizeNote,cols[5].x+5,y+32,8,false,[94,109,120]);
      doc.setDrawColor(220,229,232);doc.setLineWidth(.4);doc.line(margin,y+rowHeight,width-margin,y+rowHeight);y+=rowHeight;
    }
    const pages=doc.getNumberOfPages();
    for(let page=1;page<=pages;page++){doc.setPage(page);text('Availability and dimensions are subject to confirmation. Open the bundle link for photos and details.',margin,height-24,8,false,[94,109,120]);text(`${page} / ${pages}`,width-margin-30,height-24,8);}
    return doc;
  }
  const api={create};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.LucraInventoryPDF=api;
})(typeof window!=='undefined'?window:this);
