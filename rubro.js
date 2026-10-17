/* Páginas de rubro Abiel · comportamiento propio.
   Mismo mundo que portada.js (encabezado, fecha, «pasar en limpio»), sin tocarlo.
   Todo corre una sola vez; nada se repite en bucle. */

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Cada botón de WhatsApp avisa qué llamada a la acción se usó */
function setupCtas() {
  document.querySelectorAll("[data-cta]").forEach((link) => {
    link.addEventListener("click", () => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "click_whatsapp", cta: link.dataset.cta });
    });
  });
}

/* Menú móvil, sombra del encabezado y botón flotante */
function setupNavigation() {
  const nav = document.getElementById("nav");
  const burger = document.getElementById("burger");
  const menu = document.getElementById("menuMovil");
  const hero = document.getElementById("inicio");
  const fab = document.getElementById("fab");
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

  // El flotante aparece cuando el botón principal de la primera pantalla ya no se ve.
  new IntersectionObserver(([entry]) => {
    fab.classList.toggle("is-on", !entry.isIntersecting);
  }).observe(hero);

  const sombra = () => nav.classList.toggle("is-scrolled", window.scrollY > 8);
  window.addEventListener("scroll", sombra, { passive: true });
  sombra();
}

/* Fecha del día en el renglón del encabezado */
function setupFecha() {
  const fecha = document.getElementById("navFecha");
  if (!fecha) return;
  fecha.textContent = new Intl.DateTimeFormat("es-PE", { day: "2-digit", month: "2-digit" }).format(new Date());
}

/* ------------------------------------------------------------------
   «Pasar en limpio»: cada renglón anotado a mano se tacha con lapicero
   rojo (o se marca su casilla) y aparece en limpio lo que se hizo solo,
   con el resaltador. Vale para la lista de hoy y para el papel del rubro.
   Corre una sola vez al verse; «Pasar en limpio otra vez» la repite.
   El HTML ya trae el estado final: sin JS o sin GSAP se ve completo.
   ------------------------------------------------------------------ */
function setupDemo() {
  const demo = document.getElementById("demo");
  const gsap = window.gsap;
  if (!demo || !gsap) return;

  // Cada paso puede traer un tachón, una casilla con visto, su versión en limpio y el
  // resaltador. Sirve igual para la lista de hoy y para cualquier familia de papel.
  const pasos = Array.from(demo.querySelectorAll("[data-paso]")).map((paso) => {
    const limpios = Array.from(paso.querySelectorAll("[data-limpio]"));
    return {
      tachon: paso.querySelector("[data-tachon]"),
      trazo: paso.querySelector("[data-tachon] path"),
      visto: paso.querySelector(".casilla path"),
      limpios,
      resaltes: limpios.flatMap((l) => Array.from(l.querySelectorAll(".resalte"))),
    };
  });
  if (!pasos.length) return;

  const todos = (clave) => pasos.flatMap((p) => [].concat(p[clave] || [])).filter(Boolean);
  const fijar = (lista, valores) => { if (lista.length) gsap.set(lista, valores); };
  const cuenta = document.getElementById("demoCuenta");
  const otra = document.getElementById("demoOtra");
  const total = pasos.length;
  const pintarCuenta = (n) => { if (cuenta) cuenta.textContent = `${n} de ${total}`; };

  let estadoInicial;
  const tl = gsap.timeline({ paused: true });
  let t = prefersReducedMotion ? 0.3 : 0.6;

  if (prefersReducedMotion) {
    // Sin trazos ni desplazamientos: el estado final aparece por opacidad.
    const vistos = todos("visto").map((v) => v.closest("svg"));
    estadoInicial = () => {
      fijar([...todos("tachon"), ...vistos, ...todos("limpios")], { opacity: 0 });
      pintarCuenta(0);
    };
    estadoInicial();
    pasos.forEach((p, i) => {
      if (p.tachon) tl.to(p.tachon, { opacity: 1, duration: 0.3, ease: "none" }, t);
      if (p.visto) tl.to(p.visto.closest("svg"), { opacity: 1, duration: 0.3, ease: "none" }, t);
      if (p.limpios.length) tl.to(p.limpios, { opacity: 1, duration: 0.4, ease: "none" }, t + 0.15);
      tl.call(() => pintarCuenta(i + 1), null, t + 0.2);
      t += p.tachon ? 0.7 : 0.4;
    });
  } else {
    estadoInicial = () => {
      fijar([...todos("trazo"), ...todos("visto")], { strokeDashoffset: 1 });
      fijar(todos("limpios"), { clipPath: "inset(-10% 100% -10% 0)" });
      fijar(todos("resaltes"), { backgroundSize: "0% 84%" });
      pintarCuenta(0);
    };
    estadoInicial();
    pasos.forEach((p, i) => {
      // Primero se tacha (o se marca la casilla), después se escribe en limpio y al final se resalta.
      let limpio = t;
      if (p.trazo) {
        tl.to(p.trazo, { strokeDashoffset: 0, duration: 0.5, ease: "power2.inOut" }, t);
        limpio = t + 0.42;
      } else if (p.visto) {
        tl.to(p.visto, { strokeDashoffset: 0, duration: 0.36, ease: "power2.inOut" }, t);
        limpio = t + 0.2;
      }
      if (p.limpios.length) tl.to(p.limpios, { clipPath: "inset(-10% 0% -10% 0)", duration: 0.7, ease: "expo.out", stagger: 0.18 }, limpio);
      if (p.resaltes.length) tl.to(p.resaltes, { backgroundSize: "100% 84%", duration: 0.55, ease: "power2.out" }, limpio + 0.28);
      tl.call(() => pintarCuenta(i + 1), null, limpio + 0.5);
      t += p.trazo ? 1.4 : 0.62;
    });
  }
  // Al terminar queda el estado final exacto.
  tl.call(() => pintarCuenta(total));

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

/* Hoja del sistema: el resaltador se pinta una vez y los vehículos llegan a su punto de la ruta */
function setupHojaSistema() {
  const hoja = document.getElementById("hojaSistema");
  if (!hoja) return;
  const gsap = window.gsap;
  const marcas = hoja.querySelectorAll(".resalte");
  const vehiculos = Array.from(hoja.querySelectorAll(".hs-mapa__vehiculo"));

  const ubicar = (vehiculo, fraccion) => {
    const ruta = document.getElementById(vehiculo.dataset.ruta);
    if (!ruta || !ruta.getTotalLength) return;
    const punto = ruta.getPointAtLength(ruta.getTotalLength() * fraccion);
    vehiculo.setAttribute("transform", `translate(${punto.x.toFixed(1)} ${punto.y.toFixed(1)})`);
  };

  // Sin movimiento (o sin GSAP): todo queda en su lugar final desde el inicio.
  if (prefersReducedMotion || !gsap) {
    vehiculos.forEach((v) => {
      ubicar(v, Number(v.dataset.hasta));
      v.classList.add("is-listo");
    });
    return;
  }

  // Algunas hojas (el mapa sin renglón resaltado) no tienen marcas: GSAP avisaría «target not found».
  if (marcas.length) gsap.set(marcas, { backgroundSize: "0% 84%" });
  vehiculos.forEach((v) => {
    ubicar(v, 0);
    v.classList.add("is-listo");
  });

  const observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    observer.disconnect();
    if (marcas.length) gsap.to(marcas, { backgroundSize: "100% 84%", duration: 0.6, ease: "power2.out", stagger: 0.3, delay: 0.3 });
    vehiculos.forEach((v, i) => {
      const avance = { f: 0 };
      gsap.to(avance, {
        f: Number(v.dataset.hasta),
        duration: 2.4,
        delay: 0.2 + i * 0.3,
        ease: "power2.inOut",
        onUpdate: () => ubicar(v, avance.f),
      });
    });
  }, { threshold: 0.4 });
  observer.observe(hoja);
}

document.addEventListener("DOMContentLoaded", () => {
  const anio = document.getElementById("anio");
  if (anio) anio.textContent = String(new Date().getFullYear());
  setupCtas();
  setupNavigation();
  setupFecha();
  setupDemo();
  setupHojaSistema();
});
