const fs = require('node:fs'), vm = require('node:vm'), assert = require('node:assert/strict');
const requests = [], verified = [], broken = [];
const node = {setAttribute(){}, querySelectorAll(){return []}};
const context = {
 document:{querySelector(){return node},body:{dataset:{previewColumns:'2'}}},
 navigator:{connection:{saveData:false,effectiveType:'4g'}},
 ResizeObserver:class{observe(){}}, MutationObserver:class{observe(){}}, render(){},
 currentProduct:{id:'first',images:[{src:'a',fileId:'a'},{src:'b',fileId:'b'},{src:'c',fileId:'c'}]},
 imageIndex:0, galleryPreloadCache:new Map(), productKey:p=>p.id,
 markPhotoVerified:(...x)=>verified.push(x),markPhotoBroken:(...x)=>broken.push(x),
 Image:class{constructor(){this.handlers={};requests.push(this)} addEventListener(type,fn){this.handlers[type]=fn}}
};
vm.createContext(context);vm.runInContext(fs.readFileSync(require('node:path').join(__dirname,'quality.js'),'utf8'),context);
context.preloadGalleryNeighbors(); assert.equal(requests.length,2);
context.currentProduct={id:'second',images:[{src:'d'},{src:'e'}]};
requests[0].handlers.load(); requests[1].handlers.error();
assert.deepEqual(verified,[['first','b']]); assert.deepEqual(broken,[['first','c']]);
assert.equal(context.galleryPreloadCache.has('c'),false);
context.navigator.connection.saveData=true;context.preloadGalleryNeighbors();assert.equal(requests.length,2);
context.navigator.connection.saveData=false;context.navigator.connection.effectiveType='slow-2g';context.preloadGalleryNeighbors();assert.equal(requests.length,2);
context.navigator.connection.effectiveType='4g';context.currentProduct={id:'large',images:Array.from({length:30},(_,i)=>({src:'photo'+i}))};
for(let i=0;i<30;i++){context.imageIndex=i;context.preloadGalleryNeighbors()}
assert.ok(context.galleryPreloadCache.size<=12);
console.log('Passed: adjacent loading, origin attribution, failed retry, data saver, slow connection, bounded cache.');
