const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm');
const {create}=require('../ui/inventory-pdf.js');
const {jsPDF}=require('../ui/vendor/jspdf.umd.min.js');
const sizing=require('../ui/sizing.js');
const inventory=JSON.parse(fs.readFileSync('data/inventory.json','utf8'));
const context={window:{}};vm.runInNewContext(fs.readFileSync('ui/qr-label-assets.js','utf8'),context);
const rows=inventory.products.map(p=>({...p,average:sizing.averageSize(p),surface:(p.surfaceTypes||[]).join(' / '),url:'https://inventory.lucramarble.com/#bundle-'+encodeURIComponent('drive-'+(p.stableFolderId||p.folderId))}));
(async()=>{
 await assert.rejects(()=>create([],context.window.LucraQRLabelAssets,jsPDF));
 await assert.rejects(()=>create([{...rows[0],url:'https://example.com/'}],context.window.LucraQRLabelAssets,jsPDF));
 const doc=await create(rows,context.window.LucraQRLabelAssets,jsPDF,{updated:inventory.syncedAt,title:'Stock inventory'});
 assert.ok(doc.getNumberOfPages()>1);
 const bytes=Buffer.from(doc.output('arraybuffer'));assert.equal(bytes.subarray(0,5).toString(),'%PDF-');
 if(process.env.LUCRA_PDF_TEST_OUTPUT)fs.writeFileSync(process.env.LUCRA_PDF_TEST_OUTPUT,bytes);
 const one=await create([{...rows[0],name:'Türkiye - sample material '.repeat(8),pcs:null,sqm:null,average:null}],context.window.LucraQRLabelAssets,jsPDF,{title:'My shortlist'});assert.equal(one.getNumberOfPages(),1);
 console.log(`PASS: ${rows.length} stock rows, pagination, missing stock/sizes, long Turkish names, safe links, real PDF generation.`);
})().catch(error=>{console.error(error);process.exitCode=1});
