(function(){
"use strict";
var C = window.APP_CONFIG || {};
var $ = function(id){ return document.getElementById(id); };
var cfg = C.merge(null);

var I = {
  menu:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.1 13.34l2.83-2.83L3.91 3.5a4.008 4.008 0 0 0 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z"/></svg>',
  instagram:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.63-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/></svg>',
  facebook:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07z"/></svg>',
  tiktok:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>',
  phone:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2z"/></svg>',
  whatsapp:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.05 21.8a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88a9.82 9.82 0 0 1 6.99 2.9 9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.89 9.88zM20.5 3.49A11.8 11.8 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.17-3.44-8.42z"/></svg>',
  map:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>'
};
var ARROW = '<svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>';
var DAYS = ["الأحد","الاثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"];

function safeUrl(u){
  try{
    var p = new URL(u, location.href);
    return (p.protocol === "https:" || p.protocol === "http:") ? p.href : "";
  }catch(e){ return ""; }
}
function digits(s){ return String(s || "").replace(/[^\d]/g, ""); }
function toast(msg){
  var t = $("toast"); t.textContent = msg; t.classList.add("show");
  clearTimeout(toast._t); toast._t = setTimeout(function(){ t.classList.remove("show"); }, 2200);
}
function copyText(text){
  if(navigator.clipboard && navigator.clipboard.writeText){
    return navigator.clipboard.writeText(text).then(function(){ return true; }, function(){ return legacyCopy(text); });
  }
  return Promise.resolve(legacyCopy(text));
}
function legacyCopy(text){
  try{
    var ta = document.createElement("textarea");
    ta.value = text; ta.setAttribute("readonly",""); ta.style.cssText = "position:fixed;opacity:0";
    document.body.appendChild(ta); ta.select();
    var ok = document.execCommand("copy"); ta.remove(); return ok;
  }catch(e){ return false; }
}
function el(tag, cls, href, external){
  var a = document.createElement(tag);
  if(cls) a.className = cls;
  if(href){ a.href = href; if(external){ a.target = "_blank"; a.rel = "noopener noreferrer"; } }
  return a;
}

/* ساعات العمل */
function parseRange(s){
  var m = /^(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})$/.exec(String(s || "").trim());
  if(!m) return null;
  var o = (+m[1])*60 + (+m[2]), c = (+m[3])*60 + (+m[4]);
  if(+m[1] > 23 || +m[3] > 23 || +m[2] > 59 || +m[4] > 59 || o === c) return null;
  return {o:o, c:c, over:c < o};
}
function fmt(min){
  var h = Math.floor(min/60), m = min % 60, p = h >= 12 ? "م" : "ص";
  var h12 = h % 12 === 0 ? 12 : h % 12;
  return h12 + ":" + (m < 10 ? "0" : "") + m + " " + p;
}
function nowInZone(){
  try{
    var parts = new Intl.DateTimeFormat("en-US",{timeZone:cfg.timezone,weekday:"short",hour:"2-digit",minute:"2-digit",hourCycle:"h23"}).formatToParts(new Date());
    var g = function(t){ return parts.filter(function(p){ return p.type === t; })[0].value; };
    return {day:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].indexOf(g("weekday")), min:(+g("hour"))*60 + (+g("minute"))};
  }catch(e){ var d = new Date(); return {day:d.getDay(), min:d.getHours()*60 + d.getMinutes()}; }
}
function renderStatus(){
  var s = $("status");
  var sched = cfg.hours.map(parseRange);
  if(!sched.some(Boolean)){ s.hidden = true; return; }
  var now = nowInZone(), today = sched[now.day], prev = sched[(now.day + 6) % 7];
  var state = "closed", text = "مغلق الآن";
  if(today && ((!today.over && now.min >= today.o && now.min < today.c) || (today.over && now.min >= today.o))){
    state = "open"; text = "مفتوح الآن، يغلق " + fmt(today.c);
  }else if(prev && prev.over && now.min < prev.c){
    state = "open"; text = "مفتوح الآن، يغلق " + fmt(prev.c);
  }else if(today && now.min < today.o){
    text = "مغلق الآن، يفتح " + fmt(today.o);
  }
  s.textContent = text; s.className = "status " + state; s.hidden = false;
}

function render(){
  var name = cfg.name || "اسم المطعم";
  document.title = name + " — القائمة وحساباتنا";
  $("name").textContent = name;
  $("footer").textContent = name;
  $("tagline").textContent = cfg.tagline; $("tagline").hidden = !cfg.tagline;

  /* الشعار */
  var logo = $("logo"); logo.textContent = "";
  var src = cfg.logo ? (/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+\/=]+$/.test(cfg.logo) ? cfg.logo : safeUrl(cfg.logo)) : "";
  if(src){
    var img = document.createElement("img");
    img.src = src; img.alt = name; img.decoding = "async";
    img.onerror = function(){ img.remove(); logo.textContent = name.trim().charAt(0); };
    logo.appendChild(img);
  }else{ logo.textContent = name.trim().charAt(0); }

  /* التواصل الاجتماعي: صف واحد تحت الاسم */
  var soc = $("social"); soc.textContent = "";
  [["instagram","إنستغرام"],["facebook","فيسبوك"],["tiktok","تيك توك"]].forEach(function(p){
    var href = safeUrl(cfg[p[0]] || ""); if(!href) return;
    var a = el("a","soc",href,true);
    a.setAttribute("aria-label", p[1]); a.title = p[1]; a.innerHTML = I[p[0]];
    soc.appendChild(a);
  });
  soc.hidden = !soc.children.length;

  /* القائمة مباشرة تحت التواصل */
  var mw = $("menuWrap"); mw.textContent = "";
  var m = cfg.menu ? safeUrl(cfg.menu) : "";
  if(m){
    var a = el("a","link menu",m,true);
    a.innerHTML = I.menu + "<span></span>" + ARROW;
    a.querySelector("span").textContent = "القائمة الإلكترونية";
    mw.appendChild(a);
  }
  mw.hidden = !m;

  /* الأزرار السريعة */
  var q = $("quick"); q.textContent = "";
  function addQuick(href, icon, label, ext){
    var a = el("a","act",href,ext);
    a.innerHTML = I[icon] + "<span></span>"; a.querySelector("span").textContent = label; q.appendChild(a);
  }
  var phone = digits(cfg.phone), wa = digits(cfg.whatsapp), mp = cfg.map ? safeUrl(cfg.map) : "";
  if(phone) addQuick("tel:+" + phone, "phone", "اتصال", false);
  if(wa) addQuick("https://wa.me/" + wa + (cfg.whatsappMessage ? "?text=" + encodeURIComponent(cfg.whatsappMessage) : ""), "whatsapp", "واتساب", true);
  if(mp) addQuick(mp, "map", "الموقع", true);
  q.hidden = !q.children.length;

  /* الواي فاي */
  var hasWifi = cfg.wifi && cfg.wifi.name && cfg.wifi.password;
  $("wifi").hidden = !hasWifi;
  if(hasWifi) $("wifiName").textContent = cfg.wifi.name;

  /* ساعات العمل */
  var sched = cfg.hours.map(parseRange), list = $("hours"); list.textContent = "";
  if(sched.some(Boolean)){
    var now = nowInZone();
    DAYS.forEach(function(d,i){
      var r = sched[i], row = document.createElement("div");
      if(i === now.day) row.className = "today";
      var a = document.createElement("span"), b = document.createElement("span");
      a.textContent = d; b.textContent = r ? fmt(r.o) + " - " + fmt(r.c) : "مغلق";
      row.appendChild(a); row.appendChild(b); list.appendChild(row);
    });
    $("hoursBox").hidden = false;
  }else{ $("hoursBox").hidden = true; }
  renderStatus();
}

/* النقر ثلاث مرات على اسم المطعم يفتح صفحة المدير */
var taps = [];
$("name").addEventListener("click", function(){
  var n = Date.now();
  taps = taps.filter(function(t){ return n - t < 700; });
  taps.push(n);
  if(taps.length >= 3){ taps = []; location.href = "admin.html"; }
});

$("wifiCopy").addEventListener("click", function(){
  copyText(cfg.wifi.password).then(function(ok){ toast(ok ? "تم نسخ كلمة المرور" : "تعذّر النسخ، اطلب كلمة المرور من الموظف"); });
});
$("share").addEventListener("click", function(){
  var data = {title: cfg.name, url: location.href.split("#")[0]};
  if(navigator.share){ navigator.share(data).catch(function(){}); }
  else{ copyText(data.url).then(function(ok){ toast(ok ? "تم نسخ الرابط" : "تعذّر نسخ الرابط"); }); }
});

/* عرض فوري من الكاش ثم تحديث من قاعدة البيانات */
try{
  var cached = localStorage.getItem("rs_cfg");
  if(cached) cfg = C.merge(JSON.parse(cached));
}catch(e){}
render();

fetch(C.DATA_URL || "data.json", {cache:"no-cache"}).then(function(r){
  if(!r.ok) throw new Error("http");
  return r.json();
}).then(function(d){
  cfg = C.merge(d);
  try{ localStorage.setItem("rs_cfg", JSON.stringify(d)); }catch(e){}
  render();
}).catch(function(){});
setInterval(renderStatus, 60000);
})();
