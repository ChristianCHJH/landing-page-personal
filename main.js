gsap.registerPlugin(ScrollTrigger);

/* ── Scroll progress bar ── */
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.prepend(progressBar);

window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.transform = `scaleX(${window.scrollY / max})`;
}, { passive: true });

/* ── Cursor spotlight (desktop only) ── */
if (window.matchMedia('(pointer: fine)').matches) {
  const cursorGlow = document.createElement('div');
  cursorGlow.className = 'cursor-glow';
  document.body.appendChild(cursorGlow);
  document.addEventListener('mousemove', e => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top  = e.clientY + 'px';
    cursorGlow.style.opacity = '1';
  });
  document.addEventListener('mouseleave', () => { cursorGlow.style.opacity = '0'; });
}

/* ── Hero: inject aurora + particles + photo rings ── */
const heroEl = document.querySelector('.hero');

const auroraEl = document.createElement('div');
auroraEl.className = 'hero__aurora';
auroraEl.setAttribute('aria-hidden', 'true');
heroEl.prepend(auroraEl);

const particlesEl = document.createElement('div');
particlesEl.className = 'hero__particles';
particlesEl.setAttribute('aria-hidden', 'true');
heroEl.appendChild(particlesEl);

for (let i = 0; i < 20; i++) {
  const dot = document.createElement('div');
  dot.className = 'particle';
  dot.style.left   = Math.random() * 100 + '%';
  dot.style.bottom = (Math.random() * 45 + 5) + '%';
  const size = 2 + Math.random() * 3;
  dot.style.width  = size + 'px';
  dot.style.height = size + 'px';
  dot.style.setProperty('--dur',   (5 + Math.random() * 7) + 's');
  dot.style.setProperty('--delay', (Math.random() * 10) + 's');
  particlesEl.appendChild(dot);
}

const imageWrap = document.querySelector('.hero__image-wrap');
[0, 1].forEach(() => {
  const ring = document.createElement('div');
  ring.className = 'hero__image-ring';
  ring.setAttribute('aria-hidden', 'true');
  imageWrap.prepend(ring);
});

/* ── NAV scroll effect ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ── Mobile menu ── */
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
burger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

/* ── Sector tabs ── */
const sectorTabs = document.querySelectorAll('.sector-tab');
const sectorPanels = document.querySelectorAll('.sector-panel');

sectorTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    sectorTabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
    sectorPanels.forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    const panel = document.querySelector(`[data-panel="${tab.dataset.sector}"]`);
    if (panel) {
      panel.classList.add('active');
      gsap.from(panel.querySelector('.sector-panel__features'), {
        opacity: 0, x: -20, duration: 0.4, ease: 'power2.out',
      });
    }
  });
});

/* ── Floating CTA ── */
const floatingCta = document.getElementById('floatingCta');
if (heroEl && floatingCta) {
  const heroObserver = new IntersectionObserver(([entry]) => {
    floatingCta.classList.toggle('visible', !entry.isIntersecting);
  }, { threshold: 0 });
  heroObserver.observe(heroEl);
}

/* ── Manual SplitText ── */
function splitChars(el) {
  const temp = document.createElement('div');
  temp.innerHTML = el.innerHTML;
  el.innerHTML = '';

  temp.childNodes.forEach(node => {
    if (node.nodeType === Node.TEXT_NODE) {
      node.textContent.split('').forEach(ch => {
        const s = document.createElement('span');
        s.className = 'char';
        s.textContent = ch === ' ' ? ' ' : ch;
        el.appendChild(s);
      });
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const color = node.style.color || 'var(--accent)';
      node.textContent.split('').forEach(ch => {
        const s = document.createElement('span');
        s.className = 'char';
        s.style.color = color;
        s.textContent = ch === ' ' ? ' ' : ch;
        el.appendChild(s);
      });
    }
  });

  return el.querySelectorAll('.char');
}

/* ── Manual ScrambleText ── */
function scrambleText(el, finalText, duration) {
  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#@%&?!';
  const start = performance.now();
  const tick = now => {
    const progress = Math.min((now - start) / duration, 1);
    const revealed = Math.floor(progress * finalText.length);
    let result = '';
    for (let i = 0; i < finalText.length; i++) {
      if (i < revealed || finalText[i] === ' ') {
        result += finalText[i];
      } else {
        result += CHARS[Math.floor(Math.random() * CHARS.length)];
      }
    }
    el.textContent = result;
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/* ── HERO animations ── */
const nameEl = document.querySelector('.hero__name');
const chars  = splitChars(nameEl);

gsap.set(chars, { opacity: 0, y: 55, rotateX: -90 });
gsap.set(['.hero__sub', '.hero__ctas', '.hero__trust'], { y: 30, opacity: 0 });
gsap.set('.hero__image-wrap', { x: 60, opacity: 0 });
gsap.set('.hero__eyebrow', { opacity: 0 });

const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.2 });

heroTl
  .call(() => {
    const eyebrow = document.querySelector('.hero__eyebrow');
    gsap.set(eyebrow, { opacity: 1 });
    scrambleText(eyebrow, 'Software para negocios peruanos', 2000);
  })
  .to(chars, {
    opacity: 1,
    y: 0,
    rotateX: 0,
    stagger: { amount: 0.6, from: 'start' },
    duration: 0.65,
    ease: 'back.out(1.6)',
  }, 0.3)
  .to('.hero__sub',   { opacity: 1, y: 0, duration: 0.65 }, '-=0.3')
  .to('.hero__ctas',  { opacity: 1, y: 0, duration: 0.55 }, '-=0.4')
  .to('.hero__trust', { opacity: 1, y: 0, duration: 0.5  }, '-=0.3')
  .to('.hero__image-wrap', { opacity: 1, x: 0, duration: 1.1, ease: 'power2.out' }, '-=0.8')
  .to('.hero__image-wrap', {
    y: -14, duration: 3, ease: 'sine.inOut', repeat: -1, yoyo: true,
  }, '>+0.1');

/* ── Hero photo: parallax suave con el mouse ── */
if (window.matchMedia('(pointer: fine)').matches) {
  let lerpX = 0, lerpY = 0, rawX = 0, rawY = 0;
  const heroPhoto = document.querySelector('.hero__photo');

  document.addEventListener('mousemove', e => {
    rawX = (e.clientX / window.innerWidth  - 0.5) * 2;
    rawY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  gsap.ticker.add(() => {
    lerpX += (rawX - lerpX) * 0.05;
    lerpY += (rawY - lerpY) * 0.05;
    heroPhoto.style.transform = `translateX(calc(-50% + ${lerpX * 9}px)) translateY(${lerpY * 5}px)`;
  });
}

/* ── Scroll animations ── */
document.querySelectorAll('.section__header').forEach(el => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: 'top 85%', onEnter: () => el.classList.add('in-view') },
    opacity: 0, y: 30, duration: 0.7, ease: 'power2.out',
  });
});

gsap.from('.sector-tab', {
  scrollTrigger: { trigger: '.sector-tabs', start: 'top 85%' },
  opacity: 0, y: 20, duration: 0.5, ease: 'power2.out', stagger: 0.08,
});

gsap.from('.sector-panel__content', {
  scrollTrigger: { trigger: '.sector-panels', start: 'top 80%' },
  opacity: 0, y: 30, duration: 0.7, ease: 'power2.out',
});

gsap.from('.caso-card', {
  scrollTrigger: { trigger: '.casos__grid', start: 'top 80%' },
  opacity: 0, y: 50, duration: 0.7, ease: 'power2.out', stagger: 0.15,
});

gsap.from('.paso', {
  scrollTrigger: { trigger: '.proceso__steps', start: 'top 80%' },
  opacity: 0, y: 40, duration: 0.65, ease: 'back.out(1.4)', stagger: 0.15,
});

gsap.from('.contacto__left', {
  scrollTrigger: { trigger: '.contacto__inner', start: 'top 80%' },
  opacity: 0, x: -30, duration: 0.7, ease: 'power2.out',
});

gsap.from('.contacto__form', {
  scrollTrigger: { trigger: '.contacto__inner', start: 'top 80%' },
  opacity: 0, x: 30, duration: 0.7, ease: 'power2.out',
});

gsap.from('.footer__inner > *', {
  scrollTrigger: { trigger: '.footer__inner', start: 'top 90%' },
  opacity: 0, y: 20, duration: 0.5, ease: 'power2.out', stagger: 0.1,
});

/* ── Form: abrir WhatsApp con mensaje ── */
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const nombre  = this.nombre.value.trim();
  const negocio = this.negocio.value;
  const mensaje = this.mensaje.value.trim();
  const texto = `Hola Yanapay, soy ${nombre}${negocio ? ` (${negocio})` : ''}. ${mensaje || 'Quiero información sobre sus servicios.'}`;
  window.open(`https://wa.me/51913412590?text=${encodeURIComponent(texto)}`, '_blank');
});

/* ── Active nav link highlight ── */
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav__links a[href^="#"]');

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const link = document.querySelector(`.nav__links a[href="#${entry.target.id}"]`);
    if (!link) return;
    navLinks.forEach(l => l.classList.remove('active-link'));
    link.classList.add('active-link');
  });
}, { rootMargin: '-30% 0px -60% 0px' });

sections.forEach(s => navObserver.observe(s));
