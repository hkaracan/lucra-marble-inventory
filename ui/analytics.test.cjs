const test=require('node:test');
const assert=require('node:assert/strict');
const vm=require('node:vm');
const fs=require('node:fs');
const policy=require('./analytics-policy.js');
test('event allowlist drops contact, search, titles and arbitrary parameters',()=>{
 assert.deepEqual(policy.sanitize('save_bundle',{bundle_code:'K4987',email:'private@example.com',contact_name:'Private',title:'Customer project'}),{name:'save_bundle',values:{bundle_code:'K4987'}});
 assert.deepEqual(policy.sanitize('search_inventory',{result_count:12,search_term:'private@example.com'}),{name:'search_inventory',values:{result_count:12}});
 assert.deepEqual(policy.sanitize('filter_material',{category:'private@example.com'}),{name:'filter_material',values:{}});
 assert.equal(policy.sanitize('__proto__',{}),null);
 assert.equal(policy.sanitize('form_submit',{email:'private@example.com'}),null);
 assert.deepEqual(policy.sanitize('view_bundle',{bundle_code:'private@example.com'}),{name:'view_bundle',values:{}});
 assert.equal(policy.referrer('https://example.com/customer?email=private@example.com#secret'),'https://example.com/');
 assert.equal(policy.referrer('javascript:alert(1)'),'');
});
function frame(host='inventory.lucramarble.com') {
 const handlers={},scripts=[];
 const parent={};
 const window={LucraAnalyticsPolicy:policy,addEventListener:(name,fn)=>handlers[name]=fn};
 const context={window,parent,location:{hostname:host,origin:'https://'+host},document:{createElement:()=>({}),head:{append:script=>scripts.push(script)}},Date};
 Object.defineProperty(context,'gtag',{get:()=>window.gtag});
 vm.runInNewContext(fs.readFileSync(__dirname+'/analytics-frame.js','utf8'),context);
 return {window,scripts,send:(data,origin=context.location.origin,source=parent)=>handlers.message?.({data,origin,source})};
}
test('tag stays unloaded until trusted startup, and URLs are fixed or scrubbed',()=>{
 const f=frame();
 f.send({type:'lucra-analytics',action:'event',name:'save_bundle',values:{bundle_code:'K4987'}});
 assert.equal(f.scripts.length,0);
 f.send({type:'lucra-analytics',action:'start'},'https://attacker.example');
 assert.equal(f.scripts.length,0);
 f.send({type:'lucra-analytics',action:'start'},undefined,{});
 assert.equal(f.scripts.length,0);
 f.send({type:'lucra-analytics',action:'start',referrer:'https://lucramarble.com/?email=private@example.com'});
 assert.equal(f.scripts.length,1);
 assert.equal(f.scripts[0].src,'https://www.googletagmanager.com/gtag/js?id=G-LDDC1RZFHJ');
 const calls=f.window.dataLayer.map(args=>Array.from(args));
 const page=calls.find(call=>call[0]==='event'&&call[1]==='page_view')[2];
 assert.equal(page.page_location,policy.location);
 assert.equal(page.page_referrer,'https://lucramarble.com/');
 assert.equal(calls.find(call=>call[0]==='config')[2].send_page_view,false);
 assert.equal(JSON.stringify(calls).includes('private@example.com'),false);
 f.send({type:'lucra-analytics',action:'start'});
 assert.equal(f.scripts.length,1);
});
test('events are sanitized again at the tag, withdrawal stops tracking, local hosts never load it',()=>{
 const f=frame();f.send({type:'lucra-analytics',action:'start'});
 f.send({type:'lucra-analytics',action:'event',name:'quote_handoff',values:{channel:'whatsapp',bundle_count:2,email:'private@example.com',notes:'Private'}});
 const event=Array.from(f.window.dataLayer.at(-1));
 assert.equal(event[1],'quote_handoff');assert.equal(event[2].channel,'whatsapp');assert.equal(event[2].bundle_count,2);assert.equal(event[2].email,undefined);
 f.send({type:'lucra-analytics',action:'stop'});const count=f.window.dataLayer.length;
 f.send({type:'lucra-analytics',action:'event',name:'save_bundle',values:{bundle_code:'K4987'}});
 assert.equal(f.window.dataLayer.length,count);
 const local=frame('localhost');local.send({type:'lucra-analytics',action:'start'});assert.equal(local.scripts.length,0);
});
