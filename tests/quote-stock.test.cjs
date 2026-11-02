const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync(require('node:path').join(__dirname,'../app.js'),'utf8');
const fn=source.slice(source.indexOf('function quoteStockWarning('),source.indexOf('shortlistQuoteItems.addEventListener(\'input\'',source.indexOf('function quoteStockWarning(')));
const context=vm.createContext({language:'en',Intl});vm.runInContext(fn,context);
const warning=(q,n)=>context.quoteStockWarning(q,n);
test('warns only above known stock, including zero and singular stock',()=>{
 assert.equal(warning(45,45),'');assert.equal(warning(1,45),'');
 assert.match(warning(46,45),/Only 45 slabs are currently listed/);
 assert.match(warning(2,1),/Only 1 slab is currently listed/);
 assert.match(warning(1,0),/Only 0 slabs are currently listed/);
});
test('unknown stock and unfinished or invalid quantities do not invent a limit',()=>{
 for(const stock of [null,undefined,'',NaN,-1,'unknown',1.5])assert.equal(warning(100,stock),'');
 for(const q of ['',0,-1,1.5,'abc'])assert.equal(warning(q,45),'');
 assert.match(warning('46','45'),/Only 45/);
});
test('warning follows the selected interface language',()=>{context.language='tr';assert.match(warning(46,45),/yalnızca 45 plaka/);context.language='en';});
