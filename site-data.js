(function(){
  'use strict';
  var cfg = window.SUPABASE_CONFIG || {};
  if(!cfg.url || !cfg.anonKey || cfg.url.indexOf('YOUR-PROJECT') !== -1 || cfg.anonKey.indexOf('YOUR_') === 0){
    console.info('Supabase is not configured; showing built-in website content.');
    return;
  }
  var base = cfg.url.replace(/\/$/, '');
  var headers = { apikey:cfg.anonKey };
  function esc(v){ return String(v == null ? '' : v).replace(/[&<>'"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]}); }
  function get(table, query){
    return fetch(base+'/rest/v1/'+table+'?'+query,{headers:headers}).then(function(r){if(!r.ok)throw new Error(table+' '+r.status);return r.json();});
  }
  function waLink(number, title){
    var n=String(number||'').replace(/\D/g,'');
    return 'https://wa.me/'+n+'?text='+encodeURIComponent('Hello, I want to order: '+title);
  }
  function applySettings(x){
    if(!x)return;
    var h=document.querySelector('.hero h1'), p=document.querySelector('.hero-sub');
    if(h&&x.hero_title)h.textContent=x.hero_title;
    if(p&&x.hero_subtitle)p.textContent=x.hero_subtitle;
    if(x.whatsapp){
      document.querySelectorAll('a[href*="wa.me"]').forEach(function(a){a.href=waLink(x.whatsapp,'Mihad Boom Shorts service');});
    }
    if(x.telegram){
      document.querySelectorAll('.btn-deal, .deal, .foot-social a').forEach(function(a){if(a.textContent.trim().toLowerCase().indexOf('telegram')>-1||a.classList.contains('btn-deal')||a.classList.contains('deal'))a.href=x.telegram;});
    }
    var social={Facebook:x.facebook,YouTube:x.youtube,Telegram:x.telegram};
    document.querySelectorAll('.foot-social a').forEach(function(a){var u=social[a.textContent.trim()];if(u)a.href=u;});
    var foot=document.querySelector('.foot-bottom'); if(foot&&x.footer_text)foot.textContent=x.footer_text;
  }
  function applyStats(rows){
    var grid=document.querySelector('.stats-grid'); if(!grid||!rows.length)return;
    grid.innerHTML=rows.map(function(r){return '<div class="stat"><div class="num">'+esc(r.value)+'</div><div class="label">'+esc(r.label)+'</div></div>';}).join('');
  }
  function applyPackages(rows, settings){
    var grid=document.querySelector('.price-grid'); if(!grid||!rows.length)return;
    grid.innerHTML=rows.map(function(r){
      var img=r.image_url?'<img class="package-image" src="'+esc(r.image_url)+'" alt="'+esc(r.title)+'" loading="lazy">':'';
      return '<div class="price-card"><h3>'+esc(r.title)+'</h3>'+img+'<div class="amount">৳'+esc(r.price)+'</div><h4 class="package-headline">'+esc(r.headline||'FULL VIRAL CONTENT')+'</h4><p class="package-desc">'+esc(r.description||'')+'</p><a class="btn-outline" href="'+esc(waLink(settings&&settings.whatsapp,r.title))+'" target="_blank" rel="noopener">Order Now</a></div>';
    }).join('');
  }
  function applyDemos(rows, settings){
    var grid=document.getElementById('demo-grid'); if(!grid||!rows.length)return;
    grid.innerHTML=rows.map(function(r){
      var media=r.thumbnail_url?'<img class="demo-thumb-img" src="'+esc(r.thumbnail_url)+'" alt="'+esc(r.title)+'" loading="lazy">':'<span class="play"><svg viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z"/></svg></span>';
      var label=r.video_url?'WATCH VIDEO':'COMING SOON';
      var card='<article class="video-card"><div class="thumb"><span class="coming">'+label+'</span>'+media+'</div><div class="info"><h2>'+esc(r.title)+'</h2><p>'+esc(r.description||'')+'</p></div></article>';
      return r.video_url?'<a class="video-link" href="'+esc(r.video_url)+'" target="_blank" rel="noopener">'+card+'</a>':card;
    }).join('');
    var deal=document.querySelector('.deal');if(deal&&settings&&settings.telegram)deal.href=settings.telegram;
  }
  Promise.all([
    get('site_settings','id=eq.1&select=*').then(function(a){return a[0]||{};}),
    get('stats','active=eq.true&select=*&order=sort_order.asc'),
    get('packages','active=eq.true&select=*&order=sort_order.asc'),
    get('demos','active=eq.true&select=*&order=sort_order.asc')
  ]).then(function(all){applySettings(all[0]);applyStats(all[1]);applyPackages(all[2],all[0]);applyDemos(all[3],all[0]);})
  .catch(function(e){console.warn('Live content could not load; built-in content remains visible.',e);});
})();
