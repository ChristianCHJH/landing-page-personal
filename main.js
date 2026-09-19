const WHATSAPP_NUMBER = "51913412590";
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const formatSoles = new Intl.NumberFormat("es-PE", { maximumFractionDigits: 0 });
const formatSolesDecimals = new Intl.NumberFormat("es-PE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function whatsappUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function trackCta(name) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "click_whatsapp", cta: name });
}

function prepareWhatsappLinks() {
  document.querySelectorAll("[data-wa]").forEach((link) => {
    link.href = whatsappUrl(link.dataset.wa);
  });
  document.querySelectorAll("[data-cta]").forEach((link) => {
    link.addEventListener("click", () => trackCta(link.dataset.cta));
  });
}

function setupNavigation() {
  const nav = document.getElementById("nav");
  const burger = document.getElementById("burger");
  const menu = document.getElementById("menuMovil");
  const hero = document.getElementById("inicio");
  const fab = document.getElementById("fab");
  const painsSection = document.getElementById("dolores");

  const toggleMenu = (open) => {
    menu.hidden = !open;
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    burger.innerHTML = open ? '<i class="ph ph-x" aria-hidden="true"></i>' : '<i class="ph ph-list" aria-hidden="true"></i>';
  };

  burger.addEventListener("click", () => toggleMenu(menu.hidden));
  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => toggleMenu(false)));

  let heroVisible = true;
  let painsVisible = false;
  const refreshFab = () => fab.classList.toggle("is-on", !heroVisible && !painsVisible);

  new IntersectionObserver(([entry]) => {
    heroVisible = entry.isIntersecting;
    nav.classList.toggle("is-scrolled", !entry.isIntersecting || entry.intersectionRatio < 0.9);
    refreshFab();
  }, { threshold: [0, 0.9] }).observe(hero);

  new IntersectionObserver(([entry]) => {
    painsVisible = entry.isIntersecting;
    refreshFab();
  }, { threshold: 0.15 }).observe(painsSection);
}

function setupCollectionDemo() {
  const demo = document.getElementById("demo");
  const rows = Array.from(demo.querySelectorAll(".row"));
  const totalEl = document.getElementById("demoTotal");
  const pendingEl = document.getElementById("demoPend");
  const toast = document.getElementById("demoToast");
  const toastText = document.getElementById("demoToastText");
  const initialTotal = rows.reduce((sum, row) => sum + Number(row.dataset.monto), 0);

  let total = initialTotal;
  let pending = rows.length;
  let timers = [];
  let autoplayIndex = 0;
  let visible = false;
  let userTookControl = false;

  const later = (fn, ms) => timers.push(setTimeout(fn, ms));
  const clearTimers = () => { timers.forEach(clearTimeout); timers = []; };

  const showToast = (text) => {
    toastText.textContent = text;
    toast.classList.add("is-on");
    later(() => toast.classList.remove("is-on"), 1900);
  };

  const animateTotal = (from, to) => {
    if (prefersReducedMotion || !window.gsap) {
      totalEl.textContent = formatSoles.format(to);
      return;
    }
    const counter = { value: from };
    window.gsap.to(counter, {
      value: to,
      duration: 0.9,
      ease: "power2.out",
      onUpdate: () => { totalEl.textContent = formatSoles.format(counter.value); },
    });
  };

  const familyName = (row) => row.querySelector(".row__name").textContent;

  const collect = (row) => {
    if (row.classList.contains("is-sent")) return;
    const button = row.querySelector(".row__btn");
    button.classList.add("is-press");
    later(() => button.classList.remove("is-press"), 160);
    row.classList.add("is-sent");
    button.innerHTML = '<i class="ph ph-checks" aria-hidden="true"></i> Enviado';
    showToast(`Recordatorio enviado a ${familyName(row)}`);

    later(() => {
      const amount = Number(row.dataset.monto);
      row.classList.add("is-paid");
      row.querySelector(".row__state").textContent = "Pagó con Yape, recién";
      animateTotal(total, total - amount);
      total -= amount;
      pending -= 1;
      pendingEl.textContent = String(pending);
      showToast(`Nuevo pago: S/ ${amount} de ${familyName(row)}`);
    }, 2300);
  };

  const originalStates = rows.map((row) => row.querySelector(".row__state").textContent);

  const reset = () => {
    rows.forEach((row, i) => {
      row.classList.remove("is-sent", "is-paid");
      row.querySelector(".row__state").textContent = originalStates[i];
      row.querySelector(".row__btn").innerHTML = '<i class="ph-fill ph-whatsapp-logo" aria-hidden="true"></i> Recordar';
    });
    total = initialTotal;
    pending = rows.length;
    totalEl.textContent = formatSoles.format(total);
    pendingEl.textContent = String(pending);
    autoplayIndex = 0;
  };

  const autoplayStep = () => {
    if (!visible || userTookControl) return;
    if (autoplayIndex >= 2) {
      later(() => { reset(); later(autoplayStep, 1200); }, 3200);
      return;
    }
    collect(rows[autoplayIndex]);
    autoplayIndex += 1;
    later(autoplayStep, 4200);
  };

  rows.forEach((row) => {
    row.querySelector(".row__btn").addEventListener("click", () => {
      if (!userTookControl) {
        userTookControl = true;
        clearTimers();
      }
      collect(row);
      if (rows.every((r) => r.classList.contains("is-sent"))) later(reset, 5200);
    });
  });

  if (prefersReducedMotion) return;

  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible && !userTookControl && timers.length === 0) later(autoplayStep, 1400);
    if (!visible && !userTookControl) { clearTimers(); reset(); }
  }, { threshold: 0.5 }).observe(demo);
}

function setupPainPicker() {
  const pains = Array.from(document.querySelectorAll(".pain"));
  const count = document.getElementById("pickCount");
  const fixes = document.getElementById("pickFixes");
  const button = document.getElementById("pickBtn");

  const refresh = () => {
    const selected = pains.filter((p) => p.getAttribute("aria-pressed") === "true");
    const uniqueFixes = [...new Set(selected.map((p) => p.dataset.fix))];

    fixes.innerHTML = "";
    uniqueFixes.forEach((fix) => {
      const item = document.createElement("li");
      item.textContent = fix;
      fixes.appendChild(item);
    });

    if (selected.length === 0) {
      count.textContent = "Toca las tarjetas que te pasan.";
      button.classList.add("is-disabled");
      button.setAttribute("aria-disabled", "true");
      button.href = whatsappUrl("Hola Yanapay, quiero ordenar mi negocio.");
      return;
    }

    count.textContent = selected.length === 1 ? "Marcaste 1. Esto te ayudaría:" : `Marcaste ${selected.length}. Esto te ayudaría:`;
    button.classList.remove("is-disabled");
    button.removeAttribute("aria-disabled");
    const lines = selected.map((p) => `- ${p.dataset.pain}`).join("\n");
    button.href = whatsappUrl(`Hola Yanapay, en mi negocio me pasa esto:\n${lines}\n¿Cómo me pueden ayudar?`);
  };

  pains.forEach((pain) => {
    pain.addEventListener("click", () => {
      const pressed = pain.getAttribute("aria-pressed") === "true";
      pain.setAttribute("aria-pressed", String(!pressed));
      if (!pressed && window.gsap && !prefersReducedMotion) {
        window.gsap.fromTo(pain.querySelector(".pain__icon"), { rotate: -14, scale: 0.8 }, { rotate: 0, scale: 1, duration: 0.5, ease: "back.out(3)" });
      }
      refresh();
    });
  });

  refresh();
}

function setupCompare() {
  const frame = document.getElementById("compare");
  const range = document.getElementById("compareRange");
  const apply = (value) => {
    frame.style.setProperty("--pos", `${value}%`);
  };
  range.addEventListener("input", () => apply(range.value));
  apply(range.value);

  if (prefersReducedMotion || !window.gsap || !window.ScrollTrigger) return;

  const hint = { value: 88 };
  apply(hint.value);
  range.value = hint.value;
  window.gsap.to(hint, {
    value: 50,
    duration: 1.6,
    ease: "power3.inOut",
    scrollTrigger: { trigger: frame, start: "top 70%", once: true },
    onUpdate: () => {
      apply(hint.value);
      range.value = Math.round(hint.value);
    },
  });
}

function setupCalculator() {
  const hours = document.getElementById("horas");
  const cost = document.getElementById("costo");
  const hoursOut = document.getElementById("horasOut");
  const costOut = document.getElementById("costoOut");
  const monthly = document.getElementById("calcMes");
  const monthlyHours = document.getElementById("calcHoras");
  const days = document.getElementById("calcDias");
  const WEEKS_PER_MONTH = 4.33;
  const HOURS_PER_WORKDAY = 8;

  const refresh = () => {
    const hoursPerMonth = Number(hours.value) * WEEKS_PER_MONTH;
    hoursOut.textContent = `${hours.value} h`;
    costOut.textContent = `S/ ${cost.value}`;
    monthly.textContent = formatSoles.format(Math.round(hoursPerMonth * Number(cost.value) / 10) * 10);
    monthlyHours.textContent = String(Math.round(hoursPerMonth));
    days.textContent = String(Math.max(1, Math.round(hoursPerMonth / HOURS_PER_WORKDAY)));
  };

  hours.addEventListener("input", refresh);
  cost.addEventListener("input", refresh);
  refresh();
}

function setupAnimations() {
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  document.querySelectorAll("[data-count]").forEach((el) => {
    el.textContent = formatSolesDecimals.format(Number(el.dataset.count));
  });
  if (!gsap || !ScrollTrigger || prefersReducedMotion) return;

  const intro = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.8 } });
  intro
    .from(".hero__pill", { y: 16, opacity: 0, duration: 0.6 })
    .from(".hero__title", { y: 28, opacity: 0 }, "-=0.35")
    .from(".hero__sub", { y: 20, opacity: 0 }, "-=0.55")
    .from(".hero__ctas .btn", { y: 16, opacity: 0, stagger: 0.08 }, "-=0.55")
    .from(".phone", { y: 60, opacity: 0, rotate: 4, duration: 1.1 }, "-=0.9")
    .from(".phone .row", { y: 14, opacity: 0, stagger: 0.07, duration: 0.5 }, "-=0.6")
    .from(".chip-float", { x: -24, opacity: 0, duration: 0.6 }, "-=0.3");

  gsap.to(".chip-float", { y: -10, duration: 2.4, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1.8 });

  const reveal = (targets, trigger, extra = {}) => {
    gsap.from(targets, {
      y: 32,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.07,
      scrollTrigger: { trigger, start: "top 80%", once: true },
      ...extra,
    });
  };

  document.querySelectorAll(".section__title").forEach((title) => reveal(title, title));
  reveal(".pain", ".pains", { stagger: 0.05 });
  reveal(".win", ".wins__list", { stagger: 0.12 });
  reveal(".calc__box", ".calc__box");
  reveal(".rubro", ".rubros__track", { x: 40, y: 0 });
  reveal(".about__promises li", ".about__promises", { x: -20, y: 0 });
  reveal(".step", ".steps__list", { stagger: 0.15 });
  reveal(".faq__list details", ".faq__list", { y: 16, stagger: 0.05 });
  reveal(".final__inner > *", ".final", { stagger: 0.1 });

  gsap.from(".about__photo", {
    rotate: -8,
    y: 40,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: { trigger: ".about", start: "top 75%", once: true },
  });

  gsap.from(".bars span", {
    scaleY: 0,
    duration: 0.8,
    ease: "power3.out",
    stagger: 0.06,
    scrollTrigger: { trigger: ".bars", start: "top 85%", once: true },
  });

  document.querySelectorAll("[data-count]").forEach((el) => {
    const counter = { value: 0 };
    el.textContent = formatSolesDecimals.format(0);
    gsap.to(counter, {
      value: Number(el.dataset.count),
      duration: 1.6,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
      onUpdate: () => { el.textContent = formatSolesDecimals.format(counter.value); },
    });
  });

  gsap.fromTo(".steps__list", { "--line-progress": 0 }, {
    "--line-progress": 1,
    ease: "none",
    scrollTrigger: { trigger: ".steps__list", start: "top 75%", end: "bottom 60%", scrub: true },
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (window.gsap && window.ScrollTrigger) window.gsap.registerPlugin(window.ScrollTrigger);
  document.getElementById("anio").textContent = String(new Date().getFullYear());
  prepareWhatsappLinks();
  setupNavigation();
  setupPainPicker();
  setupCalculator();
  setupCompare();
  setupCollectionDemo();
  setupAnimations();
});
