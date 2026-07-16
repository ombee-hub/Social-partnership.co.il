// header shadow
const header = document.getElementById('header');
addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 10));

// mobile side drawer menu
const burger = document.getElementById('burger'), navLinks = document.getElementById('navLinks');
const drawerHead = document.createElement('li');
drawerHead.className = 'drawer-head';
drawerHead.innerHTML = '<a class="drawer-brand" href="index.html" aria-label="חזרה לדף הבית"><img src="images/logo-mark.png" alt="שותפות חברתית"><b>שותפות חברתית</b></a><button class="drawer-close" aria-label="סגירת תפריט">✕</button>';
navLinks.prepend(drawerHead);
const navOverlay = document.createElement('div');
navOverlay.className = 'nav-overlay';
document.querySelector('header').appendChild(navOverlay);
const openMenu = () => { navLinks.classList.add('open'); navOverlay.classList.add('show'); };
const closeMenu = () => { navLinks.classList.remove('open'); navOverlay.classList.remove('show'); };
burger.addEventListener('click', () => navLinks.classList.contains('open') ? closeMenu() : openMenu());
drawerHead.querySelector('.drawer-close').addEventListener('click', closeMenu);
navOverlay.addEventListener('click', closeMenu);
navLinks.addEventListener('click', e => { if (e.target.tagName === 'A') closeMenu(); });
addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
addEventListener('resize', () => { if (innerWidth > 960) closeMenu(); });

// build activities gallery (49 images) — only on the gallery page
const actGal = document.getElementById('actGallery');
if (actGal) {
  const VISIBLE = 12, TOTAL = 49;
  for (let i = 1; i <= TOTAL; i++) {
    const n = String(i).padStart(2, '0');
    const a = document.createElement('a');
    a.href = `images/activities/activity-${n}.jpg`;
    if (i > VISIBLE) a.classList.add('hidden-item');
    if (i % 7 === 1) a.classList.add('wide');
    a.innerHTML = `<img src="images/activities/activity-${n}.jpg" alt="פעילות שותפות חברתית ${i}" loading="lazy">`;
    actGal.appendChild(a);
  }
  const moreBtn = document.getElementById('moreBtn');
  if (moreBtn) moreBtn.addEventListener('click', () => {
    actGal.querySelectorAll('.hidden-item').forEach(el => el.classList.remove('hidden-item'));
    moreBtn.style.display = 'none';
  });
}

// lightbox — only on pages that include it
const lb = document.getElementById('lb');
if (lb) {
  const lbImg = lb.querySelector('img'), lbCount = lb.querySelector('.lb-count');
  let items = [], idx = 0;
  const render = () => { lbImg.src = items[idx]; lbCount.textContent = `${idx + 1} / ${items.length}`; };
  const openLb = (list, i) => { items = list; idx = i; render(); lb.classList.add('open'); document.body.style.overflow = 'hidden'; };
  const closeLb = () => { lb.classList.remove('open'); document.body.style.overflow = ''; };
  document.querySelectorAll('[data-gallery]').forEach(g => {
    g.addEventListener('click', e => {
      const a = e.target.closest('a'); if (!a) return;
      e.preventDefault();
      const links = [...g.querySelectorAll('a')].map(x => x.href);
      openLb(links, links.indexOf(a.href));
    });
  });
  lb.querySelector('.lb-close').addEventListener('click', closeLb);
  lb.querySelector('.lb-next').addEventListener('click', () => { idx = (idx + 1) % items.length; render(); });
  lb.querySelector('.lb-prev').addEventListener('click', () => { idx = (idx - 1 + items.length) % items.length; render(); });
  lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
  addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowLeft') { idx = (idx + 1) % items.length; render(); }
    if (e.key === 'ArrowRight') { idx = (idx - 1 + items.length) % items.length; render(); }
  });
}

// contact form — opens the visitor's email client with the message prefilled
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const f = contactForm;
    const subject = 'פנייה מהאתר: ' + (f.subject.value.trim() || 'ללא נושא');
    const body = [
      'שם: ' + f.name.value.trim(),
      'טלפון: ' + f.phone.value.trim(),
      f.email.value.trim() ? 'דוא"ל: ' + f.email.value.trim() : '',
      '',
      f.message.value.trim()
    ].filter(Boolean).join('\n');
    location.href = 'mailto:bsb200203@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    document.getElementById('formNote').textContent = 'נפתחה תוכנת המייל שלך לשליחת הפנייה — אם לא נפתחה, אפשר לכתוב לנו ישירות: bsb200203@gmail.com';
  });
}

// cookie consent banner
if (!localStorage.getItem('sp-cookies-choice') && !localStorage.getItem('sp-cookies-ok')) {
  const banner = document.createElement('div');
  banner.className = 'cookie-banner show';
  banner.setAttribute('role', 'region');
  banner.setAttribute('aria-label', 'הודעת עוגיות');
  banner.innerHTML = `
    <div class="cookie-inner">
      <p>אתר זה עושה שימוש בקבצי Cookie ובאחסון מקומי לצורך תפעול תקין של האתר ושמירת העדפות הגלישה והנגישות שלכם/ן. למידע נוסף ראו את <a href="privacy.html">מדיניות הפרטיות</a> שלנו.</p>
      <div class="cookie-actions">
        <button class="cookie-accept">אישור</button>
        <button class="cookie-decline">דחייה</button>
      </div>
    </div>`;
  banner.querySelector('.cookie-accept').addEventListener('click', () => {
    localStorage.setItem('sp-cookies-choice', 'accepted');
    banner.remove();
  });
  banner.querySelector('.cookie-decline').addEventListener('click', () => {
    localStorage.setItem('sp-cookies-choice', 'declined');
    banner.remove();
  });
  document.body.appendChild(banner);
}

// reveal on scroll
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
