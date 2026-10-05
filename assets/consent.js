/* Cookie consent + Google Analytics 4 for himanshukhandelwal.in
   - Nothing from Google loads, and no analytics cookie is set, until the visitor presses "Accept analytics".
   - "Decline" (or a browser Global Privacy Control / Do Not Track signal) keeps analytics off.
   - The choice is stored in this browser only (localStorage key "hk_consent") and can be changed any time
     through any link with the attribute data-cookie-settings. */
(function () {
  'use strict';
  var GA_ID = 'G-EWYG3QV7BC';
  var KEY = 'hk_consent';
  var VERSION = 1;

  function read() {
    try {
      var v = JSON.parse(localStorage.getItem(KEY) || 'null');
      return v && v.v === VERSION ? v : null;
    } catch (e) { return null; }
  }
  function write(analytics) {
    try { localStorage.setItem(KEY, JSON.stringify({ v: VERSION, analytics: !!analytics, t: new Date().toISOString() })); } catch (e) {}
  }
  function privacySignal() {
    return navigator.globalPrivacyControl === true || navigator.doNotTrack === '1' || window.doNotTrack === '1';
  }

  /* ---------- Google Analytics, only on consent ---------- */
  var loaded = false;
  function loadGA() {
    if (loaded) { window['ga-disable-' + GA_ID] = false; window.__gaOn = true; return; }
    loaded = true;
    window['ga-disable-' + GA_ID] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    window.gtag('js', new Date());
    window.gtag('config', GA_ID, { allow_google_signals: false, allow_ad_personalization_signals: false });
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_ID);
    document.head.appendChild(s);
    window.__gaOn = true;
  }
  function unloadGA() {
    window['ga-disable-' + GA_ID] = true;      /* stops any further hits from an already-loaded tag */
    window.__gaOn = false;
    /* remove Google Analytics cookies set earlier */
    var host = location.hostname, parts = host.split('.'), domains = ['', host, '.' + host];
    if (parts.length > 2) domains.push('.' + parts.slice(-2).join('.'));
    document.cookie.split(';').forEach(function (c) {
      var name = c.split('=')[0].trim();
      if (name === '_ga' || name.indexOf('_ga_') === 0 || name === '_gid' || name.indexOf('_gat') === 0) {
        domains.forEach(function (d) {
          document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/' + (d ? '; domain=' + d : '');
        });
      }
    });
  }

  /* ---------- the banner ---------- */
  var css = '' +
    '.hkc{position:fixed;z-index:2147483000;left:clamp(12px,2vw,28px);bottom:clamp(12px,2vw,28px);width:min(420px,calc(100vw - 24px));padding:20px 22px;border-radius:22px;' +
    'background:rgba(14,14,14,.82);color:#fff;font:400 14px/1.5 "Instrument Sans",system-ui,-apple-system,"Segoe UI",sans-serif;border:1px solid rgba(255,255,255,.18);' +
    '-webkit-backdrop-filter:blur(20px) saturate(1.4);backdrop-filter:blur(20px) saturate(1.4);box-shadow:0 30px 70px -20px rgba(0,0,0,.6),inset 0 1px 0 rgba(255,255,255,.18);' +
    'transform:translateY(18px);opacity:0;transition:opacity .45s cubic-bezier(.32,.72,0,1),transform .45s cubic-bezier(.32,.72,0,1)}' +
    '.hkc.on{transform:none;opacity:1}' +
    '.hkc h2{margin:0 0 6px;font:700 16px/1.2 "Archivo",system-ui,sans-serif;letter-spacing:-.01em}' +
    '.hkc p{margin:0;color:rgba(255,255,255,.82)}' +
    '.hkc a{color:#fff;text-underline-offset:3px}' +
    '.hkc .row{display:flex;gap:10px;margin-top:16px}' +
    '.hkc button{flex:1;appearance:none;cursor:pointer;font:600 14px/1 "Instrument Sans",system-ui,sans-serif;padding:13px 16px;border-radius:999px;border:1px solid #fff;transition:background .25s,color .25s,transform .2s}' +
    '.hkc button:active{transform:scale(.98)}' +
    '.hkc .yes{background:#fff;color:#0a0a0a}.hkc .yes:hover{background:#e6e6e6}' +
    '.hkc .no{background:transparent;color:#fff}.hkc .no:hover{background:rgba(255,255,255,.12)}' +
    '.hkc button:focus-visible,.hkc a:focus-visible{outline:2px solid #fff;outline-offset:3px}' +
    '.hkc .st{margin-top:10px;font-size:12.5px;color:rgba(255,255,255,.65)}' +
    '@media (prefers-reduced-motion:reduce){.hkc{transition:none}}';

  var box = null;
  function build() {
    if (box) return box;
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    box = document.createElement('div');
    box.className = 'hkc';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'false');
    box.setAttribute('aria-labelledby', 'hkc-t');
    box.setAttribute('aria-describedby', 'hkc-d');
    box.hidden = true;
    box.innerHTML =
      '<h2 id="hkc-t">Cookies and analytics</h2>' +
      '<p id="hkc-d">I’d like to use Google Analytics to see which parts of this site are useful. It only runs if you accept. If you decline, nothing is tracked. ' +
      '<a href="privacy.html">Privacy policy</a></p>' +
      '<div class="row"><button type="button" class="no" data-c="no">Decline</button><button type="button" class="yes" data-c="yes">Accept analytics</button></div>' +
      '<div class="st" id="hkc-s" aria-live="polite"></div>';
    document.body.appendChild(box);
    box.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-c]'); if (!b) return;
      choose(b.getAttribute('data-c') === 'yes');
    });
    return box;
  }
  function show(statusText) {
    build();
    var s = document.getElementById('hkc-s'); s.textContent = statusText || '';
    box.hidden = false;
    requestAnimationFrame(function () { box.classList.add('on'); });
  }
  function hide() {
    if (!box) return;
    box.classList.remove('on');
    setTimeout(function () { box.hidden = true; }, 450);
  }
  function choose(allow) {
    write(allow);
    if (allow) loadGA(); else unloadGA();
    hide();
  }

  /* ---------- start ---------- */
  function init() {
    var c = read();
    if (c) {
      if (c.analytics) loadGA(); else unloadGA();
    } else if (privacySignal()) {
      unloadGA();                       /* browser says do not track: treat as declined, show no banner */
    } else {
      setTimeout(function () { show(''); }, 900);
    }
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('[data-cookie-settings]'); if (!a) return;
      e.preventDefault();
      var cur = read();
      show(cur ? 'Current choice: analytics ' + (cur.analytics ? 'on' : 'off') + '.' : (privacySignal() ? 'Your browser sent a do-not-track signal, so analytics is off unless you accept.' : ''));
    });
    window.hkCookieSettings = function () { var cur = read(); show(cur ? 'Current choice: analytics ' + (cur.analytics ? 'on' : 'off') + '.' : ''); };
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
