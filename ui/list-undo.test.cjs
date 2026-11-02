const test=require('node:test'),assert=require('node:assert/strict');
const {restore}=require('./list-undo.js');
test('undo single removal preserves previous order and later additions',()=>{
 const before=['A','B','C'],after=['A','C'],current=['A','C','D'];
 assert.deepEqual(restore(before,after,current,new Set(['A','B','C','D'])),['A','B','C','D']);
 assert.deepEqual(before,['A','B','C']);assert.deepEqual(current,['A','C','D']);
});
test('undo clearing restores saved bundles and keeps a later selection',()=>{
 assert.deepEqual(restore(['A','B'],[],['C'],new Set(['A','B','C'])),['A','B','C']);
});
test('undo never restores bundles removed from the current catalogue',()=>{
 assert.deepEqual(restore(['A','B'],[],['C'],new Set(['B','C'])),['B','C']);
});
test('undo does not duplicate a removed bundle that was re-added manually',()=>{
 assert.deepEqual(restore(['A','B'],['B'],['A','B'],new Set(['A','B'])),['A','B']);
});
