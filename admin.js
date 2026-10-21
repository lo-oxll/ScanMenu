(function(){
"use strict";
var C = window.APP_CONFIG || {};
var $ = function(id){ return document.getElementById(id); };
var DAYS = ["الأحد","الاثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"];
var current = C.merge(null), logoData = "";
var DATA_IMG = /^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+\/=]+$/;

function msg(text, ok){ var m = $("saveMsg"); m.textContent = text; m.className = "msg " + (ok ? "ok" : "err"); }
function pad(n){ return (n < 10 ? "0" : "") + n; }

/* ===== ساعات العمل ===== */
function buildHours(hours){
  var box = $("hoursRows"); box.textContent = "";
  DAYS.forEach(function(d,i){
    var m = /^(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})$/.exec(String(hours[i] || "").trim());
    var row = document.createElement("div"); row.className = "day";
    var lab = document.createElement("label");
    var cb = document.createElement("input"); cb.type = "checkbox"; cb.id = "h_on_" + i; cb.checked = !!m;
    lab.appendChild(cb); lab.appendChild(document.createTextNode(d));
    var o = document.createElement("input"); o.type = "time"; o.id = "h_o_" + i; o.setAttribute("aria-label", "فتح " + d);
    var c = document.createElement("input"); c.type = "time"; c.id = "h_c_" + i; c.setAttribute("aria-label", "إغلاق " + d);
    if(m){ o.value = pad(+m[1]) + ":" + m[2]; c.value = pad(+m[3]) + ":" + m[4]; }
    function sync(){ o.disabled = c.disabled = !cb.checked; }
    cb.addEventListener("change", sync); sync();
    row.appendChild(lab); row.appendChild(o); row.appendChild(c); box.appendChild(row);
  });
}
function collectHours(errors){
  var out = [];
  DAYS.forEach(function(d,i){
    if(!$("h_on_" + i).checked){ out.push(""); return; }
    var o = $("h_o_" + i).value, c = $("h_c_" + i).value;
    if(!o || !c){ errors.push("أدخل وقت الفتح والإغلاق ليوم " + d); out.push(""); return; }
    if(o === c){ errors.push("وقت الفتح والإغلاق متطابقان ليوم " + d); out.push(""); return; }
    out.push(o + "-" + c);
  });
  return out;
}
$("copyAll").addEventListener("click", function(){
  var on = $("h_on_0").checked, o = $("h_o_0").value, c = $("h_c_0").value;
  for(var i = 1; i < 7; i++){
    $("h_on_" + i).checked = on; $("h_o_" + i).value = o; $("h_c_" + i).value = c;
    $("h_on_" + i).dispatchEvent(new Event("change"));
  }
});

/* ===== الشعار ===== */
function isPath(v){ return /^[A-Za-z0-9_\-][A-Za-z0-9_\-.\/]*$/.test(v) && v.indexOf("..") === -1 && !/\/$/.test(v); }
function setLogoPreview(){
  var p = $("logoPrev"), v = logoData || $("f_logo").value.trim();
  if(v && (DATA_IMG.test(v) || /^https:\/\//i.test(v) || isPath(v))){ p.src = v; p.hidden = false; }
  else{ p.removeAttribute("src"); p.hidden = true; }
}
function resizeToDataUrl(file){
  return new Promise(function(resolve, reject){
    if(["image/jpeg","image/png","image/webp"].indexOf(file.type) === -1) return reject(new Error("نوع الصورة غير مسموح"));
    if(file.size > 8 * 1048576) return reject(new Error("الصورة كبيرة جداً (الحد 8 ميغابايت)"));
    var fr = new FileReader();
    fr.onerror = function(){ reject(new Error("تعذّرت قراءة الملف")); };
    fr.onload = function(){
      var img = new Image();
      img.onerror = function(){ reject(new Error("الصورة غير صالحة")); };
      img.onload = function(){
        var S = 256, cv = document.createElement("canvas"); cv.width = cv.height = S;
        var side = Math.min(img.width, img.height), sx = (img.width - side) / 2, sy = (img.height - side) / 2;
        cv.getContext("2d").drawImage(img, sx, sy, side, side, 0, 0, S, S);
        var out = cv.toDataURL("image/webp", 0.85);
        if(out.indexOf("data:image/webp") !== 0) out = cv.toDataURL("image/png");
        if(out.length > 400000) return reject(new Error("الصورة بعد التصغير ما زالت كبيرة، جرّب صورة أبسط"));
        resolve(out);
      };
      img.src = fr.result;
    };
    fr.readAsDataURL(file);
  });
}
$("f_logoFile").addEventListener("change", function(){
  var inp = this, f = inp.files && inp.files[0]; if(!f) return;
  resizeToDataUrl(f).then(function(url){
    logoData = url; $("f_logo").value = ""; setLogoPreview();
    msg("تمت معالجة الصورة. نزّل data.json لتطبيقها.", true);
  }).catch(function(e){ msg(e.message, false); }).then(function(){ inp.value = ""; });
});
$("f_logo").addEventListener("input", function(){ logoData = ""; setLogoPreview(); });
$("rmLogo").addEventListener("click", function(){ logoData = ""; $("f_logo").value = ""; setLogoPreview(); });

/* ===== تعبئة النموذج ===== */
function fill(cfg){
  current = cfg;
  $("f_name").value = cfg.name; $("f_tagline").value = cfg.tagline;
  if(DATA_IMG.test(cfg.logo)){ logoData = cfg.logo; $("f_logo").value = ""; } else { logoData = ""; $("f_logo").value = cfg.logo; }
  setLogoPreview();
  $("f_menu").value = cfg.menu;
  $("f_phone").value = cfg.phone; $("f_whatsapp").value = cfg.whatsapp; $("f_wamsg").value = cfg.whatsappMessage;
  $("f_map").value = cfg.map;
  $("f_instagram").value = cfg.instagram; $("f_facebook").value = cfg.facebook; $("f_tiktok").value = cfg.tiktok;
  $("f_wifiName").value = cfg.wifi.name; $("f_wifiPass").value = cfg.wifi.password;
  buildHours(cfg.hours);
}

/* ===== التحقق والجمع ===== */
function checkHttps(v, label, errors){
  v = v.trim(); if(!v) return "";
  try{
    var u = new URL(v);
    if(u.protocol !== "https:" || !u.hostname) throw 0;
    return u.href;
  }catch(e){ errors.push("رابط " + label + " غير صالح (يجب أن يبدأ بـ https://)"); return ""; }
}
function checkAsset(v, label, errors){
  v = v.trim(); if(!v) return "";
  if(isPath(v)) return v;
  return checkHttps(v, label, errors);
}
function checkPhone(v, label, errors){
  v = v.trim(); if(!v) return "";
  var d = v.replace(/[\s\-()+]/g, "");
  if(!/^\d{8,15}$/.test(d)){ errors.push("رقم " + label + " غير صالح، استخدم الصيغة الدولية مثل +9647700000000"); return ""; }
  return "+" + d;
}
function collect(){
  var errors = [];
  var name = $("f_name").value.trim();
  if(!name) errors.push("اسم المطعم مطلوب");
  var wn = $("f_wifiName").value.trim(), wp = $("f_wifiPass").value.trim();
  if((wn && !wp) || (!wn && wp)) errors.push("أدخل اسم شبكة الواي فاي وكلمة مرورها معاً أو اتركهما فارغين");
  var data = {
    name: name,
    tagline: $("f_tagline").value.trim(),
    logo: logoData || checkAsset($("f_logo").value, "الصورة", errors),
    menu: checkAsset($("f_menu").value, "القائمة", errors),
    instagram: checkHttps($("f_instagram").value, "إنستغرام", errors),
    facebook: checkHttps($("f_facebook").value, "فيسبوك", errors),
    tiktok: checkHttps($("f_tiktok").value, "تيك توك", errors),
    map: checkHttps($("f_map").value, "الموقع", errors),
    phone: checkPhone($("f_phone").value, "الاتصال", errors),
    whatsapp: checkPhone($("f_whatsapp").value, "واتساب", errors),
    whatsappMessage: $("f_wamsg").value.trim(),
    wifi: {name: wn, password: wp},
    timezone: current.timezone || "Asia/Baghdad",
    hours: collectHours(errors)
  };
  return {data: data, errors: errors};
}
function buildJson(){
  var res = collect();
  if(res.errors.length){ msg(res.errors[0], false); return null; }
  return JSON.stringify(res.data, null, 2) + "\n";
}

/* ===== التصدير ===== */
$("editForm").addEventListener("submit", function(e){
  e.preventDefault();
  var json = buildJson(); if(!json) return;
  var blob = new Blob([json], {type: "application/json"});
  var url = URL.createObjectURL(blob), a = document.createElement("a");
  a.href = url; a.download = "data.json"; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(function(){ URL.revokeObjectURL(url); }, 4000);
  msg("تم إنشاء data.json. ارفعه إلى GitHub مستبدلاً الملف القديم.", true);
});
function legacyCopy(text){
  try{
    var ta = document.createElement("textarea");
    ta.value = text; ta.setAttribute("readonly",""); ta.style.cssText = "position:fixed;opacity:0";
    document.body.appendChild(ta); ta.select();
    var ok = document.execCommand("copy"); ta.remove(); return ok;
  }catch(e){ return false; }
}
$("copyBtn").addEventListener("click", function(){
  var json = buildJson(); if(!json) return;
  var done = function(ok){ msg(ok ? "تم نسخ المحتوى. الصقه في ملف data.json على GitHub (أيقونة القلم) ثم Commit." : "تعذّر النسخ، استخدم زر التنزيل.", ok); };
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(json).then(function(){ done(true); }, function(){ done(legacyCopy(json)); });
  }else{ done(legacyCopy(json)); }
});

/* ===== الاستيراد والتحميل الأولي ===== */
$("importFile").addEventListener("change", function(){
  var inp = this, f = inp.files && inp.files[0]; if(!f) return;
  if(f.size > 1048576){ msg("الملف كبير جداً", false); inp.value = ""; return; }
  var fr = new FileReader();
  fr.onload = function(){
    try{ fill(C.merge(JSON.parse(fr.result))); msg("تم استيراد الملف.", true); }
    catch(e){ msg("الملف ليس JSON صالحاً", false); }
    inp.value = "";
  };
  fr.readAsText(f);
});

fill(C.merge(null));
fetch(C.DATA_URL || "data.json", {cache: "no-store"}).then(function(r){
  if(!r.ok) throw new Error("http");
  return r.json();
}).then(function(d){ fill(C.merge(d)); }).catch(function(){
  msg("تعذّر تحميل data.json الحالي. ابدأ من الصفر أو استورد ملفاً.", false);
});
})();
