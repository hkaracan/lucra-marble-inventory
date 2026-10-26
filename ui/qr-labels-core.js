/* Approved Lucra A4 label layout. No network requests or app-state changes. */
(function(root) {
  const PAGE = [595.275, 841.89];
  const BOUNDS = [813.2386,683.9136,554.5893,425.2646,295.94,166.6153,37.2906];
  const FIRST = ['L1010','L1009','L1016','K5808','K6210','K6058'];
  function prepare(products, options, sizing, urlFor) {
    const source = options.selectedOnly ? products.filter(p => options.selected.has(p.bundleKey)) : products;
    const rows = source.filter(p => options.includeReserved || !p.reserved).map(p => {
      const url = urlFor(p), parsed = new URL(url);
      if (parsed.origin !== 'https://inventory.lucramarble.com' || !parsed.hash.startsWith('#bundle-') || decodeURIComponent(parsed.hash.slice(8)) !== p.bundleKey) throw Error('Invalid bundle link');
      const average = sizing.averageSize(p);
      const parts = (p.surfaceTypes || []).flatMap(s => String(s).split(/\s*(?:·|\/)\s*/)).map(s => s.trim()).filter(Boolean);
      const finishes = parts.filter(s => s.toLowerCase() !== 'bookmatched');
      return {key:p.bundleKey, url, code:p.code && p.code !== '—' ? String(p.code) : '',
        name:String(p.name || 'Unnamed material').replace(/^Brown Terazzo$/i,'Brown Terrazzo'),
        size:average ? `${Math.round(average.width)} x ${Math.round(average.height)} cm` : 'Size not available',
        missingSize:!average, partialSize:Boolean(average?.partial),
        surface:(finishes.length ? finishes : parts).join(' / ').replace(/Polieshed/g,'Polished')};
    });
    if (new Set(rows.map(r => r.url)).size !== rows.length) throw Error('Duplicate bundle links');
    rows.sort((a,b) => {
      const ai = FIRST.indexOf(a.code), bi = FIRST.indexOf(b.code);
      if (ai >= 0 || bi >= 0) return (ai < 0 ? FIRST.length : ai) - (bi < 0 ? FIRST.length : bi);
      return a.name.localeCompare(b.name,'en',{sensitivity:'base'}) || a.code.localeCompare(b.code,'en');
    });
    return rows;
  }
  async function create(rows, assets, dependencies, progress = () => {}) {
    if (!rows.length) throw Error('No bundles selected');
    const {jsPDF, qrcode} = dependencies;
    const doc = new jsPDF({unit:'pt',format:PAGE,compress:true,putOnlyUsedFonts:true,floatPrecision:6});
    for (const [style,data] of [['normal',assets.light],['bold',assets.bold]]) {
      doc.addFileToVFS(`Roboto-${style}.ttf`,data); doc.addFont(`Roboto-${style}.ttf`,'Roboto',style);
    }
    doc.setProperties({title:'Lucra Marble inventory QR labels',author:'Lucra Marble'});
    doc.viewerPreferences({PrintScaling:'None'});
    function cut(y) {
      doc.setDrawColor(174,180,184);doc.setLineWidth(0.6);doc.setLineDashPattern([11.904,11.904],0);
      doc.line(17.9036,PAGE[1]-y,583.3236,PAGE[1]-y);doc.setLineDashPattern([],0);
      doc.line(0,PAGE[1]-y,6,PAGE[1]-y);doc.line(589.2756,PAGE[1]-y,PAGE[0],PAGE[1]-y);
    }
    for (let i=0;i<rows.length;i++) {
      const row=i%6, p=rows[i], top=BOUNDS[row], bottom=BOUNDS[row+1];
      if (!row) {if(i)doc.addPage(PAGE);for(const y of BOUNDS)cut(y);}
      doc.addImage(assets.logo,'PNG',140.1977,PAGE[1]-(top-50.5698)-37.8831,87.5953,37.8831,'lucra-logo');
      const qr=qrcode(0,'L');qr.addData(p.url,'Byte');qr.make();
      const n=qr.getModuleCount(), outer=111.2502, quiet=outer*10/320, inner=outer-2*quiet, cell=inner/n;
      const x=24.2011+quiet, y=PAGE[1]-(bottom+9.0376+quiet+inner);
      doc.setFillColor(0,0,0);
      for(let r=0;r<n;r++)for(let c=0;c<n;c++)if(qr.isDark(r,c)) {
        const start=c;while(c+1<n&&qr.isDark(r,c+1))c++;
        doc.rect(x+start*cell,y+r*cell,(c-start+1)*cell,cell,'F');
      }
      doc.link(24.2011,PAGE[1]-(bottom+9.0376+outer),outer,outer,{url:p.url});
      const lines=[p.name,p.code,p.size,p.surface].filter(Boolean);
      for(let j=0;j<lines.length;j++) {
        doc.setFont('Roboto',j===0?'bold':'normal');doc.setFontSize(11);doc.setTextColor(0,0,0);
        const available=PAGE[0]-141.2041-18;
        if(doc.getTextWidth(lines[j])>available)doc.setFontSize(Math.max(8.5,11*available/doc.getTextWidth(lines[j])));
        doc.text(lines[j],141.2041,PAGE[1]-(top-77.1048-j*13.2));
      }
      progress(i+1,rows.length);
      if(row===5)await new Promise(resolve=>setTimeout(resolve,0));
    }
    return doc;
  }
  const api={prepare,create};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.LucraQRLabels=api;
})(typeof window!=='undefined'?window:this);
