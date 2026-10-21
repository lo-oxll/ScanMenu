"use strict";
(async () => {
  const $ = (s) => document.querySelector(s);
  let d;
  try { d = await App.load(); } catch { $("#name").textContent = "تعذّر تحميل البيانات"; return; }
  App.theme(d);
  const name = d.name || "المطعم";
  document.title = name + " — القائمة وحساباتنا";
  $("#name").textContent = name;
  if (d.tagline) { $("#tagline").textContent = d.tagline; $("#tagline").hidden = false; }

  const logo = $("#logo");
  if (d.logo) { const i = new Image(); i.alt = ""; i.src = d.logo; logo.append(i); } else logo.textContent = name.trim().charAt(0);

  const digits = (v) => String(v || "").replace(/\D/g, "");
  const L = [];
  if (d.phone) L.push(["اتصال", "tel:+" + digits(d.phone)]);
  if (d.whatsapp) L.push(["واتساب", "https://wa.me/" + digits(d.whatsapp) + "?text=" + encodeURIComponent(d.whatsappMessage || "")]);
  [["الموقع", d.map], ["إنستغرام", d.instagram], ["فيسبوك", d.facebook], ["تيك توك", d.tiktok]].forEach(([t, u]) => { if (/^https:\/\//.test(u || "")) L.push([t, u]); });
  $("#links").innerHTML = L.map(([t, u]) => `<a class="btn ghost sm" href="${App.esc(u)}" target="_blank" rel="noopener">${t}</a>`).join("");

  if (d.wifi && d.wifi.name) {
    $("#wifi").hidden = false; $("#wifiName").textContent = d.wifi.name;
    if (d.wifi.password) $("#wifiCopy").onclick = async () => { try { await navigator.clipboard.writeText(d.wifi.password); App.toast("تم النسخ"); } catch { App.toast("تعذّر النسخ"); } };
    else $("#wifiCopy").hidden = true;
  }

  const days = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"], hrs = d.hours || [];
  let day = new Date().getDay(), now = 0;
  try {
    const p = Object.fromEntries(new Intl.DateTimeFormat("en-US", { timeZone: d.timezone || "Asia/Baghdad", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date()).map((x) => [x.type, x.value]));
    day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(p.weekday); now = +p.hour * 60 + +p.minute;
  } catch { /* نستخدم توقيت الجهاز */ }
  const rng = (i) => {
    const h = hrs[(i + 7) % 7];
    if (!/^\d\d:\d\d-\d\d:\d\d$/.test(h || "")) return null;
    return h.split("-").map((t) => +t.slice(0, 2) * 60 + +t.slice(3));
  };
  if (hrs.length) {
    $("#hoursBox").hidden = false;
    $("#hours").innerHTML = days.map((n, i) => `<div class="${i === day ? "today" : ""}"><span>${n}</span><span dir="ltr">${App.esc(rng(i) ? hrs[i] : "مغلق")}</span></div>`).join("");
    const t = rng(day), y = rng(day - 1);
    const open = (t && (t[0] < t[1] ? now >= t[0] && now < t[1] : now >= t[0])) || (y && y[0] >= y[1] && now < y[1]);
    const s = $("#status"); s.hidden = false; s.className = "status " + (open ? "open" : "closed"); s.textContent = open ? "مفتوح الآن" : "مغلق الآن";
  }

  let taps = 0, first = 0, timer;
  logo.addEventListener("click", () => {
    const now = Date.now();
    if (!taps || now - first > 2000) { taps = 0; first = now; }
    taps++;
    clearTimeout(timer);
    if (taps >= 5) { taps = 0; location.href = "admin.html"; return; }
    timer = setTimeout(() => { if (taps === 3) location.href = "cashier.html"; taps = 0; }, 700);
  });

  $("#share").onclick = async () => {
    try { if (navigator.share) await navigator.share({ title: name, url: location.href }); else { await navigator.clipboard.writeText(location.href); App.toast("تم نسخ الرابط"); } } catch { /* أُلغيت المشاركة */ }
  };
})();
