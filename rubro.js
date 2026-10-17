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
   rojo y debajo aparece lo que se hizo solo, con el resaltador.
   Corre una sola vez al verse; «Pasar en limpio otra vez» la repite.
   El HTML ya trae el estado final: sin JS o sin GSAP se ve completo.
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
  const cuenta = document.getElementById("demoCuenta");
  const otra = document.getElementById("demoOtra");
  const total = tareas.length;
  const pintarCuenta = (n) => { if (cuenta) cuenta.textContent = `${n} de ${total}`; };

  let estadoInicial;
  const tl = gsap.timeline({ paused: true });

  if (prefersReducedMotion) {
    // Sin trazos ni desplazamientos: el estado final aparece por opacidad.
    estadoInicial = () => {
      gsap.set([...tachones, ...limpios], { opacity: 0 });
      pintarCuenta(0);
    };
    estadoInicial();
    tareas.forEach((_, i) => {
      const t = 0.3 + i * 0.7;
      tl.to(tachones[i], { opacity: 1, duration: 0.3, ease: "none" }, t)
        .to(limpios[i], { opacity: 1, duration: 0.4, ease: "none" }, t + 0.15)
        .call(() => pintarCuenta(i + 1), null, t + 0.2);
    });
  } else {
    estadoInicial = () => {
      gsap.set(trazos, { strokeDashoffset: 1 });
      gsap.set(limpios, { clipPath: "inset(-10% 100% -10% 0)" });
      gsap.set(resaltes, { backgroundSize: "0% 84%" });
      pintarCuenta(0);
    };
    estadoInicial();
    tareas.forEach((_, i) => {
      const t = 0.6 + i * 1.55;
      tl.to(trazos[i], { strokeDashoffset: 0, duration: 0.5, ease: "power2.inOut" }, t)
        .to(limpios[i], { clipPath: "inset(-10% 0% -10% 0)", duration: 0.7, ease: "expo.out" }, t + 0.42)
        .to(resaltes[i], { backgroundSize: "100% 84%", duration: 0.55, ease: "power2.out" }, t + 0.7)
        .call(() => pintarCuenta(i + 1), null, t + 0.9);
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

  gsap.set(marcas, { backgroundSize: "0% 84%" });
  vehiculos.forEach((v) => {
    ubicar(v, 0);
    v.classList.add("is-listo");
  });

  const observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    observer.disconnect();
    gsap.to(marcas, { backgroundSize: "100% 84%", duration: 0.6, ease: "power2.out", stagger: 0.3, delay: 0.3 });
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
