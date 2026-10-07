/* Isolate Google's automatic measurement from customer forms and shared URLs. */
(() => {
  const policy=window.LucraAnalyticsPolicy;
  const production=location.hostname==='inventory.lucramarble.com';
  if (!production || parent===window) return;
  let started=false;
  window.addEventListener('message', event => {
    if (event.source!==parent || event.origin!==location.origin || event.data?.type!=='lucra-analytics') return;
    const message=event.data;
    if (message.action==='stop') {
      window['ga-disable-'+policy.id]=true;
      window.gtag?.('consent','update',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
      return;
    }
    if (message.action==='start' && !started) {
      started=true;
      window.dataLayer=[];
      window.gtag=function(){window.dataLayer.push(arguments);};
      gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
      gtag('consent','update',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
      gtag('set',{page_location:policy.location,page_title:policy.title,page_referrer:policy.referrer(message.referrer)});
      gtag('js',new Date());
      gtag('config',policy.id,{send_page_view:false,allow_google_signals:false,allow_ad_personalization_signals:false,cookie_domain:'auto'});
      const script=document.createElement('script');script.async=true;script.onload=()=>{parent.postMessage({type:'lucra-analytics-status',loaded:true},location.origin);};script.onerror=()=>{parent.postMessage({type:'lucra-analytics-status',loaded:false},location.origin);};script.src='https://www.googletagmanager.com/gtag/js?id='+policy.id;document.head.append(script);
      gtag('event','page_view',{send_to:policy.id,page_location:policy.location,page_title:policy.title,page_referrer:policy.referrer(message.referrer)});
      return;
    }
    if (!started || message.action!=='event' || window['ga-disable-'+policy.id]) return;
    const clean=policy.sanitize(message.name,message.values);
    if(clean)gtag('event',clean.name,{...clean.values,send_to:policy.id,page_location:policy.location,page_title:policy.title});
  });
})();
