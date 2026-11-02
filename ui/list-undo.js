/* Restore removals without discarding bundles added after the action. */
(function(root){
  function restore(before,after,current,allowed){
    const present=new Set(current),remaining=new Set(after),removed=new Set(before.filter(key=>!remaining.has(key)));
    return [...new Set([...before.filter(key=>present.has(key)||removed.has(key)),...current])].filter(key=>allowed.has(key));
  }
  if(typeof module!=='undefined'&&module.exports){module.exports={restore};return;}
  const bar=document.createElement('aside');bar.className='list-undo';bar.hidden=true;bar.setAttribute('aria-label','List change');
  const message=document.createElement('span'),button=document.createElement('button'),dismiss=document.createElement('button'),announce=document.createElement('span');
  message.setAttribute('role','status');message.setAttribute('aria-live','polite');button.type=dismiss.type='button';button.className='secondary';dismiss.className='quiet-button';dismiss.textContent='×';
  announce.className='sr-only';announce.setAttribute('role','status');document.body.append(announce);bar.append(message,button,dismiss);document.body.append(bar);
  let pending=null;
  window.LucraListUndoHasPending=()=>Boolean(pending&&(pending.kind==='customer'||salesUnlocked));
  function move(){const host=document.querySelector('dialog[open]')||document.body;if(bar.parentElement!==host)host.append(bar);}
  function refresh(){bar.hidden=!pending||(pending.kind==='sales'&&!salesUnlocked);if(bar.hidden)return;button.textContent=language==='tr'?'Geri al':'Undo';dismiss.setAttribute('aria-label',language==='tr'?'Bildirimi kapat':'Dismiss notification');const label=pending.kind==='customer'?(language==='tr'?'Listem':'My list'):pending.name;const copy=language==='tr'?`${label}: ${pending.count} demet kaldırıldı.`:`${label}: ${pending.count} ${pending.count===1?'bundle removed':'bundles removed'}.`;if(message.textContent!==copy)message.textContent=copy;move();}
  function remember(kind,before,after,name=''){const count=before.filter(key=>!after.includes(key)).length;if(!count)return;pending={kind,before,after,name,count};refresh();}
  function forget(){pending=null;bar.hidden=true;}
  button.addEventListener('click',()=>{
    if(!pending||(pending.kind==='sales'&&!salesUnlocked))return;const action=pending;forget();const allowed=new Set(products.map(productKey));
    if(action.kind==='customer'){presentationSelection=new Set(restore(action.before,action.after,[...presentationSelection],allowed));savePresentationSelection();}
    else{
      if(!Object.hasOwn(shortlistLists,action.name))return;
      const current=activeShortlistName===action.name?[...shortlist]:shortlistLists[action.name];
      shortlistLists[action.name]=restore(action.before,action.after,current,allowed);
      if(activeShortlistName===action.name)shortlist=new Set(shortlistLists[action.name]);saveShortlist();
    }
    render();announce.textContent=language==='tr'?'Kaldırılan demetler geri yüklendi.':'Removed bundles restored.';
  });
  dismiss.addEventListener('click',forget);
  const customerToggle=togglePresentationSelection;togglePresentationSelection=function(id,selected){const before=[...presentationSelection];const result=customerToggle(id,selected);if(!selected)remember('customer',before,[...presentationSelection]);return result;};
  const salesToggle=toggleShortlist;toggleShortlist=function(id,selected){const before=[...shortlist],name=activeShortlistName;const result=salesToggle(id,selected);if(!selected)remember('sales',before,[...shortlist],name);return result;};
  const clearCustomer=clearPresentationList;clearPresentationList=function(){const before=[...presentationSelection];const result=clearCustomer();remember('customer',before,[...presentationSelection]);return result;};
  const clearSales=clearSalesShortlist;clearSalesShortlist=function(){const before=[...shortlist],name=activeShortlistName;const result=clearSales();remember('sales',before,[...shortlist],name);return result;};
  for(const [name,original]of [['rename',renameShortlist],['delete',deleteShortlist]]){
    const wrap=function(...args){const before=JSON.stringify(Object.keys(shortlistLists));const result=original(...args);if(pending?.kind==='sales'&&before!==JSON.stringify(Object.keys(shortlistLists)))forget();return result;};
    if(name==='rename')renameShortlist=wrap;else deleteShortlist=wrap;
  }
  new MutationObserver(move).observe(document.body,{subtree:true,attributes:true,attributeFilter:['open']});
  new MutationObserver(refresh).observe(document.body,{attributes:true,attributeFilter:['class']});
  new MutationObserver(refresh).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
})(typeof window!=='undefined'?window:this);
