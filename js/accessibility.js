/* ווידג'ט נגישות — שותפות חברתית */
(function () {
  'use strict';

  /* ---------- styles ---------- */
  const css = `
  .a11y-fab{position:fixed;bottom:26px;inset-inline-end:26px;z-index:300;width:60px;height:60px;border-radius:50%;border:none;cursor:pointer;background:linear-gradient(135deg,#7b2fbe,#d61f6e 55%,#f7941d);display:grid;place-items:center;box-shadow:0 10px 30px -6px rgba(123,47,190,.6);transition:transform .25s}
  .a11y-fab:hover{transform:scale(1.1)}
  .a11y-fab svg{width:34px;height:34px;fill:#fff}
  .a11y-panel{position:fixed;top:0;inset-inline-end:0;height:100dvh;width:340px;max-width:92vw;z-index:310;background:#fdfbf8;box-shadow:-10px 0 60px rgba(59,16,87,.3);transform:translateX(calc(-1 * var(--a11y-dir,-100%)));transition:transform .3s ease;display:flex;flex-direction:column;font-family:'Heebo',sans-serif}
  html[dir="rtl"] .a11y-panel{transform:translateX(-100%)}
  html[dir="rtl"] .a11y-panel.open{transform:translateX(0)}
  .a11y-panel.open{transform:translateX(0)}
  .a11y-head{display:flex;align-items:center;justify-content:space-between;padding:18px 22px;background:linear-gradient(135deg,#7b2fbe,#d61f6e 55%,#f7941d);color:#fff}
  .a11y-head b{font-size:1.1rem;font-weight:800}
  .a11y-close{background:rgba(255,255,255,.18);border:1px solid rgba(255,255,255,.4);color:#fff;width:36px;height:36px;border-radius:50%;cursor:pointer;font-size:1.1rem;line-height:1}
  .a11y-close:hover{background:rgba(255,255,255,.32)}
  .a11y-body{padding:16px;overflow-y:auto;flex:1;display:grid;grid-template-columns:1fr 1fr;gap:12px;align-content:start}
  .a11y-item{background:#fff;border:1.5px solid #eee5f2;border-radius:16px;padding:16px 10px;display:flex;flex-direction:column;align-items:center;gap:9px;cursor:pointer;text-align:center;font-family:inherit;font-size:.86rem;font-weight:700;color:#3b1057;transition:.2s;position:relative}
  .a11y-item:hover{border-color:#d61f6e;transform:translateY(-2px)}
  .a11y-item svg{width:28px;height:28px;stroke:#7b2fbe;fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;transition:.2s}
  .a11y-item.on{background:linear-gradient(135deg,#7b2fbe,#d61f6e 55%,#f7941d);border-color:transparent;color:#fff;box-shadow:0 8px 20px -8px rgba(214,31,110,.6)}
  .a11y-item.on svg{stroke:#fff}
  .a11y-item .a11y-lvl{position:absolute;top:8px;inset-inline-start:8px;background:#fff;color:#d61f6e;font-size:.68rem;font-weight:900;border-radius:99px;padding:1px 7px;display:none}
  .a11y-item.on .a11y-lvl{display:block}
  .a11y-foot{padding:14px 16px;display:grid;gap:10px}
  .a11y-reset{border:none;cursor:pointer;font-family:inherit;font-weight:800;font-size:.98rem;color:#fff;background:linear-gradient(135deg,#7b2fbe,#d61f6e 55%,#f7941d);padding:13px;border-radius:12px;transition:.2s}
  .a11y-reset:hover{opacity:.92;transform:translateY(-1px)}
  .a11y-note{text-align:center;font-size:.78rem;color:#6d5f7a}
  .a11y-pages{display:flex;justify-content:center;gap:10px;font-size:.88rem}
  .a11y-pages a{color:#d61f6e;font-weight:700;text-decoration:underline;text-underline-offset:3px}
  .a11y-pages a:hover{color:#7b2fbe}
  .a11y-pages span{color:#6d5f7a}
  .a11y-overlay{position:fixed;inset:0;z-index:305;background:rgba(24,8,36,.35);opacity:0;pointer-events:none;transition:.3s}
  .a11y-overlay.show{opacity:1;pointer-events:auto}
  @media(max-width:960px){.a11y-fab{bottom:96px;inset-inline-end:20px}}

  /* ---------- feature effects ---------- */
  html.a11y-contrast, html.a11y-contrast body{background:#fff}
  html.a11y-contrast body{filter:invert(1) hue-rotate(180deg)}
  html.a11y-contrast img,html.a11y-contrast video,html.a11y-contrast iframe{filter:invert(1) hue-rotate(180deg)}
  html.a11y-links a{text-decoration:underline !important;text-underline-offset:3px;outline:2px dashed #d61f6e;outline-offset:2px}
  html.a11y-txt-1{font-size:112.5%}
  html.a11y-txt-2{font-size:125%}
  html.a11y-txt-3{font-size:140%}
  html.a11y-spacing body, html.a11y-spacing body *{letter-spacing:.12em !important;word-spacing:.18em !important}
  html.a11y-noanim *,html.a11y-noanim *::before,html.a11y-noanim *::after{animation:none !important;transition:none !important}
  html.a11y-noanim{scroll-behavior:auto}
  html.a11y-noanim .reveal{opacity:1 !important;transform:none !important}
  html.a11y-noimg img{visibility:hidden !important}
  html.a11y-noimg .gal-grid a,html.a11y-noimg .preview-card{background:#e8dff0 !important}
  html.a11y-font body,html.a11y-font body *{font-family:Arial,'Segoe UI',Tahoma,sans-serif !important}
  html.a11y-lineheight body,html.a11y-lineheight body p,html.a11y-lineheight body li,html.a11y-lineheight body span,html.a11y-lineheight body a,html.a11y-lineheight body h1,html.a11y-lineheight body h2,html.a11y-lineheight body h3{line-height:2.2 !important}
  html.a11y-gray body{filter:grayscale(1)}
  html.a11y-contrast.a11y-gray body{filter:invert(1) hue-rotate(180deg) grayscale(1)}
  html.a11y-cursor,html.a11y-cursor *{cursor:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='44' height='44' viewBox='0 0 24 24'><path d='M5 2l14 12-6 1 3.5 6-3 1.5L10 16l-5 4z' fill='black' stroke='white' stroke-width='1.4'/></svg>") 4 2, auto !important}
  html.a11y-focus a:focus,html.a11y-focus button:focus,html.a11y-focus input:focus,html.a11y-focus textarea:focus{outline:4px solid #f7941d !important;outline-offset:3px !important}
  `;

  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  /* ---------- features ---------- */
  const FEATURES = [
    { key: 'contrast', label: 'ניגודיות כהה', cls: 'a11y-contrast',
      icon: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" stroke="none"/></svg>' },
    { key: 'links', label: 'הדגשת קישורים', cls: 'a11y-links',
      icon: '<svg viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/></svg>' },
    { key: 'bigtext', label: 'טקסט גדול', cycle: 3, clsPrefix: 'a11y-txt-',
      icon: '<svg viewBox="0 0 24 24"><path d="M4 18V8m0 0h5m-5 0v5m9 5V4m0 0h7M13 4v7"/></svg>' },
    { key: 'spacing', label: 'ריווח טקסט', cls: 'a11y-spacing',
      icon: '<svg viewBox="0 0 24 24"><path d="M7 8l-4 4 4 4M17 8l4 4-4 4M3 12h18"/></svg>' },
    { key: 'noanim', label: 'ביטול הנפשות', cls: 'a11y-noanim',
      icon: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M10 9v6M14 9v6"/></svg>' },
    { key: 'noimg', label: 'הסתרת תמונות', cls: 'a11y-noimg',
      icon: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 16l5-5 4 4 3-3 6 6M3 3l18 18"/></svg>' },
    { key: 'font', label: 'פונט קריא', cls: 'a11y-font',
      icon: '<svg viewBox="0 0 24 24"><path d="M6 20V6a2 2 0 0 1 2-2h4a4 4 0 0 1 0 8H8m6 0a4 4 0 0 1 0 8H8"/></svg>' },
    { key: 'cursor', label: 'סמן גדול', cls: 'a11y-cursor',
      icon: '<svg viewBox="0 0 24 24"><path d="M5 3l14 11-6 1 3 6-3 1.5L10 16l-5 4z"/></svg>' },
    { key: 'lineheight', label: 'גובה שורה', cls: 'a11y-lineheight',
      icon: '<svg viewBox="0 0 24 24"><path d="M10 6h11M10 12h11M10 18h11M5 4v16m0-16L3 6m2-2 2 2m-2 14-2-2m2 2 2-2"/></svg>' },
    { key: 'gray', label: 'גווני אפור', cls: 'a11y-gray',
      icon: '<svg viewBox="0 0 24 24"><path d="M12 3c3 4.5 6 7.7 6 11a6 6 0 0 1-12 0c0-3.3 3-6.5 6-11z"/><path d="M12 3v17"/></svg>' },
    { key: 'focus', label: 'הדגשת פוקוס', cls: 'a11y-focus',
      icon: '<svg viewBox="0 0 24 24"><rect x="7" y="7" width="10" height="10" rx="2"/><path d="M3 8V5a2 2 0 0 1 2-2h3m8 0h3a2 2 0 0 1 2 2v3m0 8v3a2 2 0 0 1-2 2h-3m-8 0H5a2 2 0 0 1-2-2v-3"/></svg>' },
    { key: 'readable', label: 'מצב קריאה', cls: 'a11y-noanim a11y-lineheight a11y-spacing', combo: ['noanim','lineheight','spacing'],
      icon: '<svg viewBox="0 0 24 24"><path d="M2 5h8a3 3 0 0 1 3 3v11a3 3 0 0 0-3-3H2zM22 5h-8a3 3 0 0 0-3 3v11a3 3 0 0 1 3-3h8z"/></svg>' }
  ];

  const STORE = 'sp-a11y';
  let state = {};
  try { state = JSON.parse(localStorage.getItem(STORE)) || {}; } catch (e) { state = {}; }

  const root = document.documentElement;

  function applyState() {
    FEATURES.forEach(f => {
      if (f.cycle) {
        for (let i = 1; i <= f.cycle; i++) root.classList.remove(f.clsPrefix + i);
        const lvl = state[f.key] || 0;
        if (lvl > 0) root.classList.add(f.clsPrefix + lvl);
      } else if (!f.combo) {
        root.classList.toggle(f.cls, !!state[f.key]);
      }
    });
    // combos map to their parts
    FEATURES.filter(f => f.combo).forEach(f => {
      if (state[f.key]) f.combo.forEach(k => {
        const part = FEATURES.find(x => x.key === k);
        if (part) root.classList.add(part.cls);
      });
    });
    localStorage.setItem(STORE, JSON.stringify(state));
    refreshButtons();
  }

  /* ---------- markup ---------- */
  const fab = document.createElement('button');
  fab.className = 'a11y-fab';
  fab.setAttribute('aria-label', 'פתיחת תפריט נגישות');
  fab.innerHTML = '<svg viewBox="0 0 24 24"><path d="M12 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm9 6.5c-2.6.6-5 1-6.7 1.1l-.05 2.2c0 .6.05 1.2.2 1.8l1.55 5.6a1.2 1.2 0 0 1-2.3.7l-1.45-5.2h-.5L10.3 20a1.2 1.2 0 0 1-2.3-.7l1.55-5.6c.15-.6.2-1.2.2-1.8l-.05-2.2C8 9.5 5.6 9.1 3 8.5A1.1 1.1 0 0 1 3.5 6.4c6 1.4 11 1.4 17 0a1.1 1.1 0 0 1 .5 2.1z"/></svg>';

  const overlay = document.createElement('div');
  overlay.className = 'a11y-overlay';

  const panel = document.createElement('div');
  panel.className = 'a11y-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', 'תפריט נגישות');
  panel.innerHTML = `
    <div class="a11y-head">
      <b>תפריט נגישות</b>
      <button class="a11y-close" aria-label="סגירת תפריט נגישות">✕</button>
    </div>
    <div class="a11y-body"></div>
    <div class="a11y-foot">
      <button class="a11y-reset">איפוס כל הגדרות הנגישות</button>
      <div class="a11y-pages">
        <a href="accessibility.html">הצהרת נגישות</a>
        <span>|</span>
        <a href="privacy.html">מדיניות פרטיות</a>
      </div>
      <div class="a11y-note">שותפות חברתית — חברה. רווחה. זכויות.</div>
    </div>`;

  const body = panel.querySelector('.a11y-body');
  FEATURES.forEach(f => {
    const b = document.createElement('button');
    b.className = 'a11y-item';
    b.dataset.key = f.key;
    b.setAttribute('aria-pressed', 'false');
    b.innerHTML = '<span class="a11y-lvl"></span>' + f.icon + '<span>' + f.label + '</span>';
    b.addEventListener('click', () => {
      if (f.cycle) {
        state[f.key] = ((state[f.key] || 0) + 1) % (f.cycle + 1);
      } else {
        state[f.key] = !state[f.key];
      }
      applyState();
    });
    body.appendChild(b);
  });

  function refreshButtons() {
    body.querySelectorAll('.a11y-item').forEach(btn => {
      const f = FEATURES.find(x => x.key === btn.dataset.key);
      const val = state[f.key];
      const on = f.cycle ? val > 0 : !!val;
      btn.classList.toggle('on', on);
      btn.setAttribute('aria-pressed', String(on));
      if (f.cycle) btn.querySelector('.a11y-lvl').textContent = val > 0 ? 'x' + val : '';
    });
  }

  panel.querySelector('.a11y-reset').addEventListener('click', () => {
    state = {};
    applyState();
  });

  function openPanel() { panel.classList.add('open'); overlay.classList.add('show'); }
  function closePanel() { panel.classList.remove('open'); overlay.classList.remove('show'); }
  fab.addEventListener('click', () => panel.classList.contains('open') ? closePanel() : openPanel());
  panel.querySelector('.a11y-close').addEventListener('click', closePanel);
  overlay.addEventListener('click', closePanel);
  addEventListener('keydown', e => { if (e.key === 'Escape') closePanel(); });

  document.body.appendChild(overlay);
  document.body.appendChild(panel);
  document.body.appendChild(fab);
  applyState();
})();
