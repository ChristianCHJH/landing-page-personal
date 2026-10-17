/* Portada Abiel · comportamiento propio de index.html, la única página del sitio. */

const WHATSAPP_NUMBER = "51913412590";
const MENSAJE_BASE = "Hola Christian, hago algo a mano en mi negocio y quiero automatizarlo.";
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const formatSoles = new Intl.NumberFormat("es-PE", { maximumFractionDigits: 0 });

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

/* Menú móvil, sombra del encabezado y botón flotante */
function setupNavigation() {
  const nav = document.getElementById("nav");
  const burger = document.getElementById("burger");
  const menu = document.getElementById("menuMovil");
  const hero = document.getElementById("inicio");
  const fab = document.getElementById("fab");
  const painsSection = document.getElementById("dolores");
  if (!nav || !burger || !menu || !hero || !fab) return;

  const toggleMenu = (open) => {
    menu.hidden = !open;
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    burger.innerHTML = open ? '<i class="ph ph-x" aria-hidden="true"></i>' : '<i class="ph ph-list" aria-hidden="true"></i>';
  };

  burger.addEventListener("click", () => toggleMenu(menu.hidden));
  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => toggleMenu(false)));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !menu.hidden) {
      toggleMenu(false);
      burger.focus();
    }
  });

  // El flotante solo aparece cuando no hay otro botón de WhatsApp a la vista
  // (primera pantalla, barra de dolores, calculadora, precio, etiqueta, cierre ni pie).
  let heroVisible = true;
  let painsVisible = false;
  const otrosVisibles = new Set();
  const refreshFab = () => fab.classList.toggle("is-on", !heroVisible && !painsVisible && otrosVisibles.size === 0);

  const otros = Array.from(document.querySelectorAll("main a[data-cta], .pie"));
  const observadorOtros = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) otrosVisibles.add(entry.target);
      else otrosVisibles.delete(entry.target);
    });
    refreshFab();
  });
  otros.forEach((el) => observadorOtros.observe(el));

  new IntersectionObserver(([entry]) => {
    heroVisible = entry.isIntersecting;
    refreshFab();
  }).observe(hero);

  const sombra = () => nav.classList.toggle("is-scrolled", window.scrollY > 8);
  window.addEventListener("scroll", sombra, { passive: true });
  sombra();

  if (painsSection) {
    new IntersectionObserver(([entry]) => {
      painsVisible = entry.isIntersecting;
      refreshFab();
    }, { threshold: 0.15 }).observe(painsSection);
  }
}

/* Fecha del día en el renglón del encabezado */
function setupFecha() {
  const fecha = document.getElementById("navFecha");
  if (!fecha) return;
  fecha.textContent = new Intl.DateTimeFormat("es-PE", { day: "2-digit", month: "2-digit" }).format(new Date());
}

/* ------------------------------------------------------------------
   Momento autoral: «pasar en limpio».
   Cada renglón manuscrito se tacha con lapicero rojo y debajo aparece la
   versión en limpio, con el resaltador pintándose de izquierda a derecha.
   Corre una sola vez y se queda en limpio; «Pasar en limpio otra vez» la repite.
   El HTML ya trae el estado final: si no hay JS o GSAP, se ve completo.
   ------------------------------------------------------------------ */
function setupDemo() {
  const demo = document.getElementById("demo");
  const gsap = window.gsap;
  if (!demo || !gsap) return;

  const tareas = Array.from(demo.querySelectorAll(".tarea"));
  const trazos = tareas.map((t) => t.querySelector(".tarea__tachon path"));
  const tachones = tareas.map((t) => t.querySelector(".tarea__tachon"));
  const limpios = tareas.map((t) => t.querySelector(".tarea__limpio"));
  const resaltes = tareas.map((t) => t.querySelector(".resalte"));
  const ahorroEl = document.getElementById("demoAhorro");
  const otra = document.getElementById("demoOtra");

  const acumulados = [];
  tareas.reduce((suma, t) => {
    const nueva = suma + Number(t.dataset.min || 0);
    acumulados.push(nueva);
    return nueva;
  }, 0);

  const formato = (min) => {
    const m = Math.round(min);
    const h = Math.floor(m / 60);
    const r = m % 60;
    return h > 0 ? `${h} h ${r} min` : `${r} min`;
  };
  const contador = { min: 0 };
  const pintarContador = () => { ahorroEl.textContent = formato(contador.min); };

  let estadoInicial;
  const tl = gsap.timeline({ paused: true });

  if (prefersReducedMotion) {
    // Sin trazos ni desplazamientos: el estado final aparece por opacidad.
    estadoInicial = () => {
      gsap.set([...tachones, ...limpios], { opacity: 0 });
      contador.min = 0;
      pintarContador();
    };
    estadoInicial();
    tareas.forEach((_, i) => {
      const t = 0.3 + i * 0.7;
      tl.to(tachones[i], { opacity: 1, duration: 0.3, ease: "none" }, t)
        .to(limpios[i], { opacity: 1, duration: 0.4, ease: "none" }, t + 0.15)
        .call(() => { contador.min = acumulados[i]; pintarContador(); }, null, t + 0.2);
    });
  } else {
    estadoInicial = () => {
      gsap.set(trazos, { strokeDashoffset: 1 });
      gsap.set(limpios, { clipPath: "inset(-10% 100% -10% 0)" });
      gsap.set(resaltes, { backgroundSize: "0% 84%" });
      contador.min = 0;
      pintarContador();
    };
    estadoInicial();
    tareas.forEach((_, i) => {
      const t = 0.6 + i * 1.55;
      tl.to(trazos[i], { strokeDashoffset: 0, duration: 0.5, ease: "power2.inOut" }, t)
        .to(limpios[i], { clipPath: "inset(-10% 0% -10% 0)", duration: 0.7, ease: "expo.out" }, t + 0.42)
        .to(resaltes[i], { backgroundSize: "100% 84%", duration: 0.55, ease: "power2.out" }, t + 0.7)
        .to(contador, { min: acumulados[i], duration: 0.9, ease: "expo.out", onUpdate: pintarContador }, t + 0.6);
    });
  }
  // Al terminar queda el estado final exacto.
  tl.call(() => { contador.min = acumulados[acumulados.length - 1]; pintarContador(); });

  let visible = false;
  const actualizar = () => {
    if (tl.progress() >= 1) return;
    if (visible && !document.hidden) tl.play();
    else tl.pause();
  };

  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    actualizar();
  }, { threshold: 0.2 }).observe(demo);
  document.addEventListener("visibilitychange", actualizar);

  if (otra) {
    otra.hidden = false;
    otra.addEventListener("click", () => {
      estadoInicial();
      tl.restart();
    });
  }
}

/* Renglones de «¿Qué haces a mano que se repite?» */
function setupPainPicker() {
  const pains = Array.from(document.querySelectorAll(".pain"));
  const count = document.getElementById("pickCount");
  const fixes = document.getElementById("pickFixes");
  const button = document.getElementById("pickBtn");
  if (!button || pains.length === 0) return;

  // Casilla con visto de lapicero y la solución escrita debajo del renglón.
  pains.forEach((pain) => {
    const casilla = pain.querySelector(".pain__casilla");
    if (casilla && !casilla.querySelector("svg")) {
      casilla.innerHTML = '<svg viewBox="0 0 36 34" aria-hidden="true"><path pathLength="1" d="M7 18.5 C 9.5 20.5, 12 23.5, 14.2 27 C 18 18, 24 10.5, 32.5 3.5" /></svg>';
    }
    const fix = document.createElement("span");
    fix.className = "pain__fix";
    fix.setAttribute("aria-hidden", "true");
    fix.innerHTML = '<span><span><i class="ph ph-arrow-elbow-down-right"></i></span></span>';
    fix.querySelector("i").parentElement.append(pain.dataset.fix);
    pain.appendChild(fix);
  });

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
      count.textContent = "Toca los renglones que te pasan.";
      button.classList.add("is-disabled");
      button.setAttribute("aria-disabled", "true");
      button.href = whatsappUrl(MENSAJE_BASE);
      return;
    }

    // Lo que ayudaría ya se ve escrito bajo cada renglón; el lector de pantalla lo recibe en la lista oculta.
    count.innerHTML = `Marcaste ${selected.length}.<span class="solo-lector"> Esto te ayudaría:</span>`;
    button.classList.remove("is-disabled");
    button.removeAttribute("aria-disabled");
    const lines = selected.map((p) => `- ${p.dataset.pain}`).join("\n");
    button.href = whatsappUrl(`Hola Christian, en mi negocio me pasa esto:\n${lines}\n¿Cómo me puedes ayudar?`);
  };

  pains.forEach((pain) => {
    pain.addEventListener("click", () => {
      const pressed = pain.getAttribute("aria-pressed") === "true";
      pain.setAttribute("aria-pressed", String(!pressed));
      refresh();
    });
  });

  // Sin nada marcado, el botón no envía: lleva al primer renglón.
  button.addEventListener("click", (event) => {
    if (button.getAttribute("aria-disabled") === "true") {
      event.preventDefault();
      event.stopImmediatePropagation();
      pains[0].focus();
    }
  }, true);

  refresh();
}

/* Antes y después: deslizador en pantallas anchas, pestañas en las angostas */
function setupCompare() {
  const frame = document.getElementById("compare");
  const range = document.getElementById("compareRange");
  if (!frame || !range) return;
  const apply = (value) => frame.style.setProperty("--pos", `${value}%`);
  range.addEventListener("input", () => apply(range.value));
  apply(range.value);

  // Pestañas accesibles «Antes / Después» (flechas, Inicio y Fin del teclado)
  const lista = document.querySelector(".compare__pestanas");
  const angosto = window.matchMedia("(max-width: 1023px)");
  if (lista) {
    const tabs = Array.from(lista.querySelectorAll('[role="tab"]'));
    const paneles = tabs.map((tab) => document.getElementById(tab.getAttribute("aria-controls")));
    let actual = 0;

    const elegir = (i, enfocar) => {
      actual = i;
      tabs.forEach((tab, j) => {
        tab.setAttribute("aria-selected", String(j === i));
        tab.tabIndex = j === i ? 0 : -1;
      });
      if (angosto.matches) paneles.forEach((panel, j) => { panel.hidden = j !== i; });
      if (enfocar) tabs[i].focus();
    };

    const modo = () => {
      const conPestanas = angosto.matches;
      lista.hidden = !conPestanas;
      frame.classList.toggle("compare--pestanas", conPestanas);
      paneles.forEach((panel, j) => {
        if (conPestanas) {
          panel.setAttribute("role", "tabpanel");
          panel.setAttribute("aria-labelledby", tabs[j].id);
          panel.tabIndex = 0;
          panel.hidden = j !== actual;
        } else {
          panel.removeAttribute("role");
          panel.removeAttribute("aria-labelledby");
          panel.removeAttribute("tabindex");
          panel.hidden = false;
        }
      });
    };

    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => elegir(i, false));
      tab.addEventListener("keydown", (event) => {
        const teclas = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 };
        if (!(event.key in teclas)) return;
        event.preventDefault();
        elegir((teclas[event.key] + tabs.length) % tabs.length, true);
      });
    });
    angosto.addEventListener("change", modo);
    modo();
  }

  const gsap = window.gsap;
  if (prefersReducedMotion || !gsap) return;

  // Pista: en pantallas anchas la barra entra desde la derecha la primera vez que se ve.
  let usado = false;
  range.addEventListener("pointerdown", () => { usado = true; }, { once: true });
  range.addEventListener("keydown", () => { usado = true; }, { once: true });
  const observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting || angosto.matches) return;
    observer.disconnect();
    if (usado) return;
    const hint = { value: 88 };
    apply(hint.value);
    gsap.to(hint, {
      value: 50,
      duration: 1.4,
      ease: "expo.out",
      onUpdate: () => {
        if (usado) return;
        apply(hint.value);
        range.value = Math.round(hint.value);
      },
    });
  }, { threshold: 0.5 });
  observer.observe(frame);
}

/* Calculadora: la cuenta a mano */
function setupCalculator() {
  const hours = document.getElementById("horas");
  const cost = document.getElementById("costo");
  const hoursOut = document.getElementById("horasOut");
  const costOut = document.getElementById("costoOut");
  const monthly = document.getElementById("calcMes");
  const monthlyHours = document.getElementById("calcHoras");
  const days = document.getElementById("calcDias");
  const wa = document.getElementById("calcWa");
  const waMonto = document.getElementById("calcWaMonto");
  if (!hours || !cost) return;
  const WEEKS_PER_MONTH = 4.33;
  const HOURS_PER_WORKDAY = 8;
  const gsap = window.gsap;
  const mostrado = { mes: null };

  const lleno = (input) => {
    const min = Number(input.min);
    const max = Number(input.max);
    input.style.setProperty("--lleno", `${((Number(input.value) - min) / (max - min)) * 100}%`);
  };

  const refresh = () => {
    const hoursPerMonth = Number(hours.value) * WEEKS_PER_MONTH;
    const mes = Math.round(hoursPerMonth * Number(cost.value) / 10) * 10;
    hoursOut.textContent = `${hours.value} h`;
    costOut.textContent = `S/ ${cost.value}`;
    monthlyHours.textContent = String(Math.round(hoursPerMonth));
    days.textContent = String(Math.max(1, Math.round(hoursPerMonth / HOURS_PER_WORKDAY)));
    lleno(hours);
    lleno(cost);

    // Botón de WhatsApp con la cifra y las horas de la cuenta
    const montoTexto = formatSoles.format(mes);
    const horasMes = Math.round(hoursPerMonth);
    if (waMonto) waMonto.textContent = montoTexto;
    if (wa) wa.href = whatsappUrl(`Hola Christian, calculé que pierdo S/ ${montoTexto} al mes (${horasMes} horas) en tareas que hago a mano. ¿Cómo lo automatizo?`);

    if (mostrado.mes === null || prefersReducedMotion || !gsap) {
      mostrado.mes = mes;
      monthly.textContent = formatSoles.format(mes);
      return;
    }
    gsap.to(mostrado, {
      mes,
      duration: 0.35,
      ease: "expo.out",
      overwrite: true,
      onUpdate: () => { monthly.textContent = formatSoles.format(Math.round(mostrado.mes / 10) * 10); },
    });
  };

  hours.addEventListener("input", refresh);
  cost.addEventListener("input", refresh);
  refresh();
}

/* Trabajos: el video corre una vez al entrar en pantalla y tiene su botón; el resaltador se pinta una vez */
function setupCasos() {
  const video = document.getElementById("videoInmobiliaria");
  const control = document.getElementById("videoControl");
  if (video && control) {
    let cargado = false;
    let visto = false;
    let pausadoPorScroll = false;

    const cargar = () => {
      if (cargado) return;
      cargado = true;
      video.querySelectorAll("source[data-src]").forEach((source) => {
        source.src = source.dataset.src;
      });
      video.load();
    };
    const reproducir = () => {
      cargar();
      if (video.ended) video.currentTime = 0;
      const intento = video.play();
      if (intento && intento.catch) intento.catch(() => {});
    };
    const pintar = () => {
      let icono = "ph-play";
      let nombre = "Reproducir el video";
      if (!video.paused && !video.ended) {
        icono = "ph-pause";
        nombre = "Pausar el video";
      } else if (video.ended) {
        icono = "ph-arrow-counter-clockwise";
        nombre = "Ver el video otra vez";
      } else if (video.currentTime > 0) {
        nombre = "Seguir viendo el video";
      }
      control.innerHTML = `<i class="ph-fill ${icono}" aria-hidden="true"></i>`;
      control.setAttribute("aria-label", nombre);
    };

    ["play", "pause", "ended"].forEach((evento) => video.addEventListener(evento, pintar));
    control.addEventListener("click", () => {
      pausadoPorScroll = false;
      if (!video.paused && !video.ended) video.pause();
      else reproducir();
    });
    control.hidden = false;
    pintar();

    new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!visto && !prefersReducedMotion) {
          visto = true;
          reproducir();
        } else if (pausadoPorScroll) {
          pausadoPorScroll = false;
          reproducir();
        }
      } else if (!video.paused && !video.ended) {
        pausadoPorScroll = true;
        video.pause();
      }
    }, { threshold: 0.25 }).observe(video);
  }

  const gsap = window.gsap;
  if (prefersReducedMotion || !gsap) return;
  document.querySelectorAll(".caso").forEach((caso) => {
    const marcas = caso.querySelectorAll(".caso__ahora .resalte");
    if (marcas.length === 0) return;
    gsap.set(marcas, { backgroundSize: "0% 84%" });
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      gsap.to(marcas, { backgroundSize: "100% 84%", duration: 0.6, ease: "power2.out", stagger: 0.35, delay: 0.2 });
    }, { threshold: 0.6 });
    observer.observe(caso.querySelector(".caso__ahora"));
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const anio = document.getElementById("anio");
  if (anio) anio.textContent = String(new Date().getFullYear());
  prepareWhatsappLinks();
  setupNavigation();
  setupFecha();
  setupDemo();
  setupPainPicker();
  setupCompare();
  setupCalculator();
  setupCasos();
});
