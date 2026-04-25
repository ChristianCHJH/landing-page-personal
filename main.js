gsap.registerPlugin(ScrollTrigger);

/* ---- NAV scroll effect ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* ---- Mobile menu ---- */
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
burger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

/* ---- HERO animations ---- */
const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

heroTl
  .to('.hero__eyebrow',    { opacity: 1, y: 0, duration: 0.6, from: { y: 20 } })
  .to('.hero__name',       { opacity: 1, y: 0, duration: 0.7 }, '-=0.3')
  .to('.hero__tagline',    { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
  .to('.hero__sub',        { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
  .to('.hero__ctas',       { opacity: 1, y: 0, duration: 0.5 }, '-=0.3')
  .to('.hero__stats',      { opacity: 1, y: 0, duration: 0.5 }, '-=0.3')
  .to('.hero__image-wrap', { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' }, '-=0.6');

gsap.set(['.hero__eyebrow', '.hero__name', '.hero__tagline', '.hero__sub', '.hero__ctas', '.hero__stats'], { y: 30 });
gsap.set('.hero__image-wrap', { x: 40 });

/* ---- Scroll animations ---- */
function fadeUp(selector, options = {}) {
  gsap.from(selector, {
    scrollTrigger: {
      trigger: selector,
      start: 'top 85%',
      toggleActions: 'play none none none',
      ...options.trigger,
    },
    opacity: 0,
    y: 40,
    duration: 0.7,
    ease: 'power2.out',
    stagger: options.stagger || 0,
    ...options.from,
  });
}

/* Section headers */
document.querySelectorAll('.section__header').forEach(el => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: 'top 85%' },
    opacity: 0, y: 30, duration: 0.7, ease: 'power2.out',
  });
});

/* Service cards */
gsap.from('.card--service', {
  scrollTrigger: { trigger: '.servicios__grid', start: 'top 80%' },
  opacity: 0, y: 50, duration: 0.6, ease: 'power2.out', stagger: 0.1,
});

/* Portfolio cards */
gsap.from('.card--project', {
  scrollTrigger: { trigger: '.portafolio__grid', start: 'top 80%' },
  opacity: 0, y: 60, duration: 0.7, ease: 'power2.out', stagger: 0.15,
});

/* Credibilidad */
gsap.from('.credibilidad__text', {
  scrollTrigger: { trigger: '.credibilidad__inner', start: 'top 80%' },
  opacity: 0, x: -40, duration: 0.8, ease: 'power2.out',
});
gsap.from('.stat-card', {
  scrollTrigger: { trigger: '.credibilidad__stats', start: 'top 80%' },
  opacity: 0, y: 40, duration: 0.6, ease: 'power2.out', stagger: 0.1,
});

/* Contact */
gsap.from('.contacto__channel', {
  scrollTrigger: { trigger: '.contacto__inner', start: 'top 80%' },
  opacity: 0, x: -30, duration: 0.6, ease: 'power2.out', stagger: 0.15,
});
gsap.from('.contacto__form', {
  scrollTrigger: { trigger: '.contacto__inner', start: 'top 80%' },
  opacity: 0, x: 30, duration: 0.7, ease: 'power2.out',
});

/* Footer */
gsap.from('.footer__inner > *', {
  scrollTrigger: { trigger: '.footer__inner', start: 'top 90%' },
  opacity: 0, y: 20, duration: 0.5, ease: 'power2.out', stagger: 0.1,
});

/* ---- Form: redirect to WhatsApp on submit ---- */
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const nombre  = this.nombre.value.trim();
  const negocio = this.negocio.value;
  const mensaje = this.mensaje.value.trim();

  const texto = `Hola Christian, soy ${nombre}${negocio ? ` (${negocio})` : ''}. ${mensaje || 'Quiero información sobre tus servicios.'}`;
  const url = `https://wa.me/51913412590?text=${encodeURIComponent(texto)}`;
  window.open(url, '_blank');
});

/* ---- Smooth active nav link highlight ---- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__links a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === `#${current}`
      ? 'var(--accent)'
      : '';
  });
}, { passive: true });
