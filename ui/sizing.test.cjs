const test = require('node:test');
const assert = require('node:assert/strict');
const {fits, totals, averageSize} = require('./sizing.js');
test('fits uses one size pair and permits rotation', () => {
 const mixed = {dimensions:['190 × 290 cm','150 × 330 cm']};
 assert.equal(fits(mixed,290,190),true);
 assert.equal(fits(mixed,190,290),true);
 assert.equal(fits(mixed,300,180),false);
 assert.equal(fits(mixed,330,150),true);
 assert.equal(fits(mixed,331,0),false);
 assert.equal(fits(mixed,0,330),true);
});
test('average size weights each slab and normalizes rotated dimensions', () => {
 assert.deepEqual(averageSize({pcs:4,lines:[{pcs:3,widthCm:180,heightCm:300},{pcs:'1',widthCm:280,heightCm:160}]}),{width:175,height:295,slabs:4,partial:false});
});
test('average size flags incomplete rows and excludes invalid or zero stock', () => {
 assert.deepEqual(averageSize({pcs:5,lines:[{pcs:3,widthCm:180,heightCm:300},{pcs:2,widthCm:null,heightCm:300},{pcs:0,widthCm:1,heightCm:1}]}),{width:180,height:300,slabs:3,partial:true});
 assert.equal(averageSize({lines:[{pcs:'bad',widthCm:180,heightCm:300}]}),null);
 assert.equal(averageSize({lines:[{pcs:1,widthCm:-1,heightCm:300}]}),null);
 assert.equal(averageSize({}),null);
});
test('a common listed size can be used, but mixed sizes without counts cannot', () => {
 assert.deepEqual(averageSize({pcs:4,dimensions:['180 × 300 cm','300 × 180 cm']}),{width:180,height:300,slabs:4,partial:false});
 assert.equal(averageSize({dimensions:['180 × 300 cm','160 × 280 cm']}),null);
});
test('unknown sizes do not match, but numeric packing rows can match', () => {
 assert.equal(fits({},200,100),false);
 assert.equal(fits({},0,0),true);
 assert.equal(fits({dimensions:['See packing list']},200,100),false);
 assert.equal(fits({lines:[{widthCm:190,heightCm:290,pcs:2}]},290,190),true);
 assert.equal(fits({lines:[{widthCm:190,heightCm:290,pcs:0}]},290,190),false);
 assert.equal(fits({dimensions:['190,5 x 290.5 cm']},290.5,190.5),true);
});
test('totals distinguish missing values from known zero and accept numeric strings', () => {
 const result = totals([{pcs:9,sqm:51.53},{pcs:'51',sqm:'281.66'},{pcs:null,sqm:''},{pcs:0,sqm:0}]);
 assert.ok(Math.abs(result.area - 333.19) < 1e-9);
 assert.deepEqual({...result,area:result.area.toFixed(2)},{bundles:4,slabs:60,area:'333.19',missingSlabs:1,missingArea:1});
 assert.deepEqual(totals([{pcs:'bad',sqm:-1}]),{bundles:1,slabs:0,area:0,missingSlabs:1,missingArea:1});
 assert.deepEqual(totals([]),{bundles:0,slabs:0,area:0,missingSlabs:0,missingArea:0});
});
