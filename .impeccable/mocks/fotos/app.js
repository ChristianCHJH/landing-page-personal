/* Prototipo «fotos»: primera pantalla con cuatro fotos del trabajo a mano, negocios con fotos
   que se turnan, comparativa Hoy / Con Abiel, casos reales y precio.
   Movimiento: CSS para la entrada de la primera pantalla; GSAP + ScrollTrigger (3.12.5) para el scroll.
   Con movimiento reducido las fotos siguen pasando solas, pero solo con fundido. */
(() => {
  "use strict";

  const D = window.ABIEL;
  const R = D.rubros;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  const G = window.gsap;
  const ST = window.ScrollTrigger;
  const conGsap = !!(G && ST);
  if (conGsap) G.registerPlugin(ST);
  const DUR = 7000;        // turno de cada negocio
  const DUR_INICIO = 5600; // turno de cada foto de la primera pantalla

  const esperar = (ms) => new Promise((ok) => setTimeout(ok, ms));
  const ocioso = window.requestIdleCallback || ((fn) => setTimeout(fn, 400));

  /* ---------- Carga diferida de una foto (<figure> con data-src) ---------- */
  function cargarFig(fig) {
    if (!fig) return Promise.resolve();
    const img = $("img", fig);
    if (fig.dataset.cargada) return img.complete ? Promise.resolve() : img.decode().catch(() => {});
    fig.dataset.cargada = "1";
    const src = $("source", fig);
    if (src && src.dataset.srcset) src.srcset = src.dataset.srcset;
    if (img.dataset.srcset) img.srcset = img.dataset.srcset;
    if (img.dataset.src) img.src = img.dataset.src;
    return img.decode().catch(() => {});
  }

  /* Cambia la foto activa de un carrusel: fundido (y zoom lento por CSS si hay movimiento) */
  function turnarFoto(contenedor, antes, despues) {
    const figAntes = contenedor.querySelector(`[data-i="${antes}"]`);
    const figNueva = contenedor.querySelector(`[data-i="${despues}"]`);
    $$(".foto.saliendo", contenedor).forEach((f) => f.classList.remove("saliendo"));
    if (figAntes) {
      figAntes.classList.add("saliendo");
      figAntes.classList.remove("activa");
      setTimeout(() => figAntes.classList.remove("saliendo"), 1700);
    }
    figNueva.classList.add("activa");
  }

  function pintarPausa(btn, seccion, pausado) {
    seccion.classList.toggle("pausada", pausado);
    btn.setAttribute("aria-pressed", String(pausado));
    btn.setAttribute("aria-label", pausado ? "Seguir pasando las fotos" : "Pausar las fotos");
    $("i", btn).className = pausado ? "ph-fill ph-play" : "ph-fill ph-pause";
  }

  /* ================= 1. Primera pantalla ================= */
  const inicio = $("#inicio");
  const fotosInicio = $("#fotosInicio");
  const tareas = $$("#tareas li");
  const pausaInicio = $("#pausaInicio");
  const N_INICIO = fotosInicio.children.length;
  fotosInicio.children[0].dataset.cargada = "1";

  let iniActual = 0;
  let iniPausado = false;      // empieza reproduciendo, también con movimiento reducido
  let iniEnVista = true;
  let iniListo = false;        // espera a que termine la entrada del titular
  let iniTimer = null;
  let iniTurno = 0;

  function marcarTarea(i) {
    tareas.forEach((li, k) => {
      li.classList.toggle("activa", k === i);
      if (k === i) li.classList.add("tachada");
      else if (i === 0) li.classList.remove("tachada"); // vuelta nueva: se vuelve a tachar desde cero
    });
  }

  function iniProgramar() {
    clearTimeout(iniTimer);
    if (!iniListo || iniPausado || !iniEnVista || document.hidden) return;
    iniTimer = setTimeout(() => iniIr(iniActual + 1), DUR_INICIO);
  }

  async function iniIr(i) {
    i = (i + N_INICIO) % N_INICIO;
    const yo = ++iniTurno;
    await Promise.race([cargarFig(fotosInicio.children[i]), esperar(1200)]);
    if (yo !== iniTurno) return;
    turnarFoto(fotosInicio, iniActual, i);
    iniActual = i;
    marcarTarea(i);
    iniProgramar();
  }

  pausaInicio.addEventListener("click", () => {
    iniPausado = !iniPausado;
    pintarPausa(pausaInicio, inicio, iniPausado);
    iniProgramar();
  });

  new IntersectionObserver(([en]) => {
    iniEnVista = en.isIntersecting;
    iniProgramar();
  }, { threshold: 0.25 }).observe(inicio);

  // La entrada del titular dura ~1,2 s; recién ahí se tacha la primera tarea y empieza el turno
  const html = document.documentElement;
  const empezarInicio = () => setTimeout(() => {
    iniListo = true;
    marcarTarea(0);
    iniProgramar();
  }, reduce.matches ? 500 : 1250);
  if (html.classList.contains("fuentes")) empezarInicio();
  else {
    const mo = new MutationObserver(() => {
      if (!html.classList.contains("fuentes")) return;
      mo.disconnect();
      empezarInicio();
    });
    mo.observe(html, { attributes: true, attributeFilter: ["class"] });
  }
  window.addEventListener("load", () => ocioso(() => {
    for (let k = 1; k < N_INICIO; k++) cargarFig(fotosInicio.children[k]);
  }));

  /* ================= 2. Negocios ================= */
  const portada = $("#negocios");
  const fotos = $("#fotos");
  const dolores = $("#dolores");
  const chips = $("#chips");
  const pausaBtn = $("#pausa");
  const select = $("#negocio");
  const comparar = $("#comparar");
  const capaHoy = $("#capaHoy");
  const capaApp = $("#capaApp");
  const divisor = $("#divisor");
  const verHoy = $("#verHoy");
  const verAbiel = $("#verAbiel");
  const celularDolor = $("#celularDolor");

  let actual = 0;
  let elegido = false;          // el visitante eligió un negocio
  let pausado = false;          // empieza reproduciendo (antes: pausado si había movimiento reducido)
  let enVista = false;          // la sección empieza fuera de la vista
  let timer = null;
  let turno = 0;                // descarta cambios viejos si se toca rápido

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const waUrl = (msg) => `https://wa.me/${D.telefono}?text=${encodeURIComponent(msg)}`;
  const frase = (r) => `«${r.dolor}»`;

  R.forEach((r, i) => {
    if (i > 0) {
      const fig = document.createElement("figure");
      fig.className = "foto";
      fig.dataset.i = i;
      fig.innerHTML =
        `<picture><source media="(max-aspect-ratio: 4/5)" data-srcset="img/${r.slug}-800.webp" width="800" height="1400" />` +
        `<img data-src="img/${r.slug}-1600.webp" data-srcset="img/${r.slug}-1600.webp 1600w" sizes="100vw" width="1600" height="1067" alt="" decoding="async" style="--foco: ${r.foco}" /></picture>`;
      fotos.appendChild(fig);

      const q = document.createElement("blockquote");
      q.className = "dolor";
      q.dataset.i = i;
      q.setAttribute("aria-hidden", "true");
      q.innerHTML = `<p class="dolor__frase">${esc(frase(r))}</p><footer class="dolor__quien">${esc(r.nombre)}</footer>`;
      dolores.appendChild(q);
    }

    const b = document.createElement("button");
    b.type = "button";
    b.className = "chip";
    b.dataset.i = i;
    b.textContent = r.chip;
    b.setAttribute("aria-pressed", i === 0 ? "true" : "false");
    b.addEventListener("click", () => ir(i, { manual: true }));
    chips.appendChild(b);

    const o = document.createElement("option");
    o.value = i;
    o.textContent = r.nombre;
    select.appendChild(o);
  });
  fotos.children[0].dataset.cargada = "1";
  const cargar = (i) => cargarFig(fotos.querySelector(`[data-i="${(i + R.length) % R.length}"]`));

  function actualizarWa() {
    const msg = elegido ? R[actual].wa : D.mensajeGeneral;
    $$("[data-wa]").forEach((a) => { a.href = waUrl(msg); });
    $$("[data-wa-general]").forEach((a) => { a.href = waUrl(D.mensajeGeneral); });
  }

  function programar() {
    clearTimeout(timer);
    portada.classList.remove("rodando");
    if (pausado || !enVista || document.hidden) return;
    void portada.offsetWidth; // reinicia la barra de avance del chip
    portada.classList.add("rodando");
    timer = setTimeout(() => ir(actual + 1), DUR);
  }

  async function ir(i, { manual = false } = {}) {
    i = (i + R.length) % R.length;
    if (manual) {
      elegido = true;
      pausado = true; // eligió su negocio: la foto se queda; el botón la vuelve a poner en marcha
      dolores.setAttribute("aria-live", "polite");
      pintarPausa(pausaBtn, portada, pausado);
    }
    const yo = ++turno;
    if (i !== actual) {
      clearTimeout(timer);
      await Promise.race([cargar(i), esperar(1200)]);
      if (yo !== turno) return;
      cambiarFoto(i);
    }
    actualizarWa();
    programar();
  }

  function cambiarFoto(i) {
    turnarFoto(fotos, actual, i);
    actual = i;

    $$(".dolor", dolores).forEach((q) => {
      const si = Number(q.dataset.i) === i;
      q.classList.toggle("activa", si);
      q.setAttribute("aria-hidden", String(!si));
    });

    $$(".chip", chips).forEach((c) => c.setAttribute("aria-pressed", String(Number(c.dataset.i) === i)));
    const chip = chips.children[i];
    if (chips.scrollWidth > chips.clientWidth + 4) {
      const x = chips.scrollLeft + chip.getBoundingClientRect().left - chips.getBoundingClientRect().left - 16;
      chips.scrollTo({ left: x, behavior: reduce.matches ? "auto" : "smooth" });
    }

    select.value = String(i);
    pintar(i, true);
    ocioso(() => cargar(i + 1));
  }

  pausaBtn.addEventListener("click", () => {
    pausado = !pausado;
    pintarPausa(pausaBtn, portada, pausado);
    programar();
  });

  let toque = null;
  portada.addEventListener("pointerdown", (e) => {
    if (e.target.closest("a, button, .chips")) return;
    toque = { x: e.clientX, y: e.clientY };
  });
  portada.addEventListener("pointerup", (e) => {
    if (!toque) return;
    const dx = e.clientX - toque.x;
    const dy = e.clientY - toque.y;
    toque = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.4) ir(actual + (dx < 0 ? 1 : -1), { manual: true });
  });
  portada.addEventListener("pointercancel", () => { toque = null; });

  new IntersectionObserver(([en]) => {
    enVista = en.isIntersecting;
    if (enVista) ocioso(() => cargar(actual + 1));
    programar();
  }, { threshold: 0.4 }).observe(portada);

  document.addEventListener("visibilitychange", () => { programar(); iniProgramar(); });

  /* ---------- Comparativa: Hoy (libreta) y Con Abiel (celular) ---------- */
  const iniciales = (n) => {
    const p = n.split(/\s+/).filter((w) => !/^(de|del|la|el|las|los|y)$/i.test(w));
    return p.length > 1 ? (p[0][0] + p[1][0]).toUpperCase() : p[0].slice(0, 2).toUpperCase();
  };
  const tag = (t, tono) => `<span class="tag tag--${tono}">${esc(t)}</span>`;
  const fila = (a, b, estado, tono) =>
    `<li class="fila"><div class="fila__texto"><p class="fila__a">${esc(a)}</p><p class="fila__b">${esc(b)}</p></div>${tag(estado, tono)}</li>`;

  function libreta(r) {
    const h = r.hoy;
    const lineas = h.lineas.map((l) =>
      `<li><span class="${l.tacha ? "tacha" : ""}">${esc(l.t)}</span>${l.marca ? `<span class="libreta__marca" aria-hidden="true">${esc(l.marca)}</span>` : ""}</li>`
    ).join("");
    return `<div class="libreta">
      <div class="libreta__tapa" aria-hidden="true">${"<span></span>".repeat(9)}</div>
      <div class="libreta__hoja">
        <p class="libreta__titulo">${esc(h.titulo)}</p>
        <ul class="libreta__lista">${lineas}</ul>
      </div>
      <p class="libreta__nota">${esc(h.nota)}</p>
    </div>`;
  }

  const escenas = {
    lista: (a) => `<div class="hoja"><div class="resumen"><p class="resumen__etiqueta">${esc(a.etiqueta)}</p><p class="resumen__valor">${esc(a.valor)}</p><p class="resumen__meta">${esc(a.meta)}</p></div>
      <ul class="filas">${a.filas.map((f) => fila(...f)).join("")}</ul></div>`,

    chat: (a) => `<div class="chat"><div class="chat__contacto hoja"><i class="ph-fill ph-whatsapp-logo" aria-hidden="true"></i>${esc(a.contacto)}</div>
      ${a.mensajes.map(([q, t, h]) => q === "sistema"
        ? `<p class="burbuja burbuja--sistema"><i class="ph-fill ph-check-circle" aria-hidden="true"></i>${esc(t)}</p>`
        : `<p class="burbuja burbuja--${q}">${esc(t)}<small>${esc(h)}</small></p>`).join("")}</div>`,

    calendario: (a) => `<div class="dias">${a.dias.map((d, k) => `<span class="dia${k === a.activo ? " dia--activo" : ""}">${esc(d)}</span>`).join("")}</div>
      <div class="hoja">${a.citas.map(([h, n, d, tono, e]) => `<div class="cita"><span class="cita__hora">${esc(h)}</span><div class="fila__texto"><p class="fila__a">${esc(n)}</p><p class="fila__b">${esc(d)}</p></div>${tag(e, tono)}</div>`).join("")}</div>`,

    ficha: (a) => `<div class="hoja"><div class="ficha__cabeza"><span class="ficha__icono"><i class="ph ph-${esc(a.icono)}" aria-hidden="true"></i></span><div><p class="ficha__nombre">${esc(a.nombre)}</p><p class="ficha__detalle">${esc(a.detalle)}</p></div></div></div>
      <p class="ficha__subtitulo">${esc(a.tituloItems)}</p>
      <ul class="filas hoja">${a.items.map(([t, d, tono]) => fila(t, d, tono === "ok" ? "Listo" : "Pronto", tono)).join("")}</ul>`,

    caja: (a) => {
      const suma = a.partes.reduce((s, p) => s + p[2], 0);
      const colores = ["#141210", "#8a8177", "#c9c1b4", "#e2dccf"];
      const barra = suma <= 100 ? `<div class="reparto" aria-hidden="true">${a.partes.map((p) => `<span style="flex:${p[2]}"></span>`).join("")}</div>` : "";
      return `<div class="hoja"><div class="caja__total"><p class="resumen__etiqueta">${esc(a.etiqueta)}</p><p class="resumen__valor">${esc(a.total)}</p><p class="resumen__meta">${esc(a.meta)}</p>${barra}</div>
        ${a.partes.map((p, k) => `<div class="parte"><span>${suma <= 100 ? `<i class="punto" style="background:${colores[k]}"></i>` : ""}${esc(p[0])}</span><b>${esc(p[1])}</b></div>`).join("")}</div>
        <p class="nota-app"><i class="ph-fill ph-check-circle" aria-hidden="true"></i>${esc(a.nota)}</p>`;
    },

    documento: (a) => `<div class="hoja doc"><div class="doc__cabeza"><i class="ph ph-${esc(a.icono)}" aria-hidden="true"></i><div><p class="doc__titulo">${esc(a.encabezado)}</p><p class="doc__codigo">${esc(a.codigo)}</p></div></div>
      ${a.lineas.map(([n, v]) => `<div class="doc__linea"><span>${esc(n)}</span><b>${esc(v)}</b></div>`).join("")}
      ${a.total ? `<div class="doc__total"><span>Total</span><span>${esc(a.total)}</span></div>` : ""}
      <p class="sello"><i class="ph-fill ph-check-circle" aria-hidden="true"></i>${esc(a.sello)}</p></div>`,

    linea: (a) => `<div class="hoja"><div class="ficha__cabeza"><span class="ficha__icono"><i class="ph ph-student" aria-hidden="true"></i></span><div><p class="ficha__nombre">${esc(a.nombre)}</p><p class="ficha__detalle">${esc(a.detalle)}</p></div></div>
      <ol class="pasos">${a.pasos.map(([t, h, ok]) => `<li class="paso${ok ? "" : " paso--pendiente"}"><span class="paso__punto">${ok ? '<i class="ph ph-check" aria-hidden="true"></i>' : ""}</span><div><p class="paso__texto">${esc(t)}</p>${h ? `<p class="paso__hora">${esc(h)}</p>` : ""}</div></li>`).join("")}</ol></div>
      <p class="nota-app"><i class="ph-fill ph-check-circle" aria-hidden="true"></i>${esc(a.nota)}</p>`,

    carnet: (a) => `<div class="carnet"><p class="carnet__marca">${esc(a.marca)}</p><p class="carnet__nombre">${esc(a.nombre)}</p><p class="carnet__plan">${esc(a.plan)}, vence el ${esc(a.vence)}</p>
      <div class="carnet__pie"><span class="carnet__plan">Hoy, 6:12 am</span>${tag(a.estado, "ok")}</div></div>
      <p class="ficha__subtitulo">Ingresos de hoy</p>
      <ul class="filas hoja">${a.filas.map((f) => fila(...f)).join("")}</ul>`,

    plano: (a) => {
      const lotes = [...a.estados].map((e, k) => {
        const esEste = `B-${k + 1}` === a.codigo;
        return `<span class="lote lote--${esEste ? "cambia" : e}">${esEste ? esc(a.codigo) : ""}</span>`;
      }).join("");
      return `<div class="hoja plano"><div class="plano__grilla" style="grid-template-columns: repeat(${a.columnas}, 1fr)">${lotes}</div>
        <div class="leyenda"><span><i style="background:#e2f3e8;box-shadow:inset 0 0 0 1px #b9dfc6"></i>Libre</span><span><i style="background:#fbefd9;box-shadow:inset 0 0 0 1px #ecd2a6"></i>Separado</span><span><i style="background:#d8d2c6"></i>Vendido</span></div></div>
        <p class="nota-app"><i class="ph-fill ph-check-circle" aria-hidden="true"></i>${esc(a.codigo)} ya no aparece libre para nadie</p>`;
    },

    catalogo: (a) => `<p class="enlace"><i class="ph ph-link" aria-hidden="true"></i>Un solo enlace con <b>todo tu catálogo</b></p>
      <div class="catalogo">${a.productos.map(([n, p, ic, color]) => `<div class="producto hoja"><div class="producto__foto" style="background:${color}"><i class="ph ph-${esc(ic)}" aria-hidden="true"></i></div><div class="producto__texto"><p class="producto__nombre">${esc(n)}</p><p class="producto__precio">${esc(p)}</p></div></div>`).join("")}</div>`
  };

  function telefono(r) {
    const a = r.app;
    return `<div class="telefono"><div class="pantalla">
      <div class="estado"><span>${esc(a.hora)}</span><span class="estado__iconos" aria-hidden="true"><i class="ph-fill ph-cell-signal-full"></i><i class="ph-fill ph-battery-full"></i></span></div>
      <div class="cabeza"><span class="cabeza__avatar" aria-hidden="true">${esc(iniciales(a.negocio))}</span><div><p class="cabeza__saludo">${esc(a.saludo)}</p><p class="cabeza__negocio">${esc(a.negocio)}</p></div></div>
      <div class="escena"><p class="escena__titulo">${esc(a.titulo)}</p>${escenas[a.tipo](a)}</div>
      <p class="aviso"><i class="ph ph-check" aria-hidden="true"></i><span>${esc(a.toast)}</span></p>
      <span class="pantalla__apagada" aria-hidden="true"></span>
    </div></div>`;
  }


  let pintado = -1;
  let introHecha = true;   // pasa a false si hay GSAP y movimiento: la comparativa espera su entrada
  let introTl = null;

  function pintar(i, suave) {
    if (i === pintado) return;
    pintado = i;
    const r = R[i];
    const poner = () => {
      if (introTl && introTl.isActive()) introTl.progress(1);
      capaHoy.innerHTML = `<div class="capa__contenido">${libreta(r)}</div>`;
      capaApp.innerHTML = `<div class="capa__contenido">${telefono(r)}</div>`;
      celularDolor.textContent = frase(r);
      capaApp.classList.remove("visible");
      if (comparar.classList.contains("por-escribir")) return; // se enciende en la entrada
      void capaApp.offsetWidth;
      capaApp.classList.add("visible");
      if (introHecha && suave && conGsap && !reduce.matches) animarCambio();
    };
    if (suave && !reduce.matches && capaHoy.firstChild) {
      comparar.classList.add("cambiando");
      setTimeout(() => {
        poner();
        requestAnimationFrame(() => comparar.classList.remove("cambiando"));
      }, 220);
    } else {
      poner();
    }
  }

  select.addEventListener("change", () => ir(Number(select.value), { manual: true }));

  /* Deslizador antes / después. El divisor se mueve con transform (--x en px), no con left */
  let pos = 50;
  const ponerX = () => comparar.style.setProperty("--x", (pos / 100) * comparar.clientWidth + "px");
  function ponerPos(p, { animar = true } = {}) {
    pos = Math.max(0, Math.min(100, p));
    comparar.classList.toggle("arrastrando", !animar);
    comparar.style.setProperty("--pos", pos + "%");
    ponerX();
    divisor.setAttribute("aria-valuenow", String(Math.round(pos)));
    divisor.setAttribute(
      "aria-valuetext",
      pos >= 95 ? "Solo Hoy" : pos <= 5 ? "Solo Con Abiel" : `Hoy ${Math.round(pos)} %, Con Abiel ${Math.round(100 - pos)} %`
    );
    verHoy.setAttribute("aria-pressed", String(pos >= 95));
    verAbiel.setAttribute("aria-pressed", String(pos <= 5));
    comparar.dataset.lado = pos >= 95 ? "hoy" : pos <= 5 ? "abiel" : "ambos";
    if (pos <= 5 && animar) {
      capaApp.classList.remove("visible");
      void capaApp.offsetWidth;
      capaApp.classList.add("visible");
    }
  }
  if (window.ResizeObserver) {
    new ResizeObserver(() => {
      const antes = comparar.classList.contains("arrastrando");
      comparar.classList.add("arrastrando");
      ponerX();
      if (!antes) requestAnimationFrame(() => comparar.classList.remove("arrastrando"));
    }).observe(comparar);
  }

  verHoy.addEventListener("click", () => ponerPos(100));
  verAbiel.addEventListener("click", () => ponerPos(0));

  const desdeX = (x) => {
    const r = comparar.getBoundingClientRect();
    return ((x - r.left) / r.width) * 100;
  };
  let arrastre = null;
  comparar.addEventListener("pointerdown", (e) => {
    if (e.button !== 0) return;
    if (introTl && introTl.isActive()) introTl.progress(1);
    arrastre = { x: e.clientX, movio: false, id: e.pointerId };
    if (e.target.closest(".divisor")) {
      comparar.setPointerCapture(e.pointerId);
      arrastre.agarre = true;
    }
  });
  comparar.addEventListener("pointermove", (e) => {
    if (!arrastre || arrastre.id !== e.pointerId) return;
    if (!arrastre.movio && Math.abs(e.clientX - arrastre.x) < 6) return;
    if (!arrastre.movio) {
      arrastre.movio = true;
      if (!arrastre.agarre) comparar.setPointerCapture(e.pointerId);
    }
    ponerPos(desdeX(e.clientX), { animar: false });
  });
  const soltar = (e) => {
    if (!arrastre) return;
    if (!arrastre.movio && e.type === "pointerup") ponerPos(desdeX(e.clientX));
    comparar.classList.remove("arrastrando");
    arrastre = null;
  };
  comparar.addEventListener("pointerup", soltar);
  comparar.addEventListener("pointercancel", soltar);

  divisor.addEventListener("keydown", (e) => {
    const pasos = { ArrowLeft: -10, ArrowDown: -10, ArrowRight: 10, ArrowUp: 10 };
    if (introTl && introTl.isActive()) introTl.progress(1);
    if (e.key in pasos) { ponerPos(pos + pasos[e.key]); e.preventDefault(); }
    else if (e.key === "Home") { ponerPos(0); e.preventDefault(); }
    else if (e.key === "End") { ponerPos(100); e.preventDefault(); }
  });

  /* ---------- La libreta se escribe y el celular se enciende ---------- */
  const TAPA = "inset(-20% 100% -20% 0%)";
  const ESCRITO = "inset(-20% 0% -20% 0%)";

  function escribir(tl, rapido, en) {
    const titulo = $(".libreta__titulo", capaHoy);
    const lineas = $$(".libreta__lista li > span:first-child", capaHoy);
    const nota = $(".libreta__nota", capaHoy);
    const tiempo = (el) => (rapido ? 0.32 : Math.min(0.62, 0.16 + el.textContent.length * 0.015));
    tl.fromTo(titulo, { clipPath: TAPA }, { clipPath: ESCRITO, duration: tiempo(titulo), ease: "power1.inOut" }, en);
    lineas.forEach((el) => {
      tl.fromTo(el, { clipPath: TAPA }, { clipPath: ESCRITO, duration: tiempo(el), ease: "power1.inOut" }, rapido ? ">-0.2" : ">-0.06");
      const marca = $(".libreta__marca", el.parentElement);
      if (marca) tl.fromTo(marca, { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, duration: 0.42, ease: "back.out(2.6)" }, ">-0.08");
    });
    tl.fromTo(nota, { opacity: 0, y: -26, rotation: -9 }, { opacity: 1, y: 0, rotation: -2.2, duration: 0.8, ease: "expo.out" }, ">0");
  }

  function encender(tl, rapido, en) {
    const apagada = $(".pantalla__apagada", capaApp);
    const escena = $(".escena", capaApp);
    tl.fromTo(apagada, { opacity: 1 }, { opacity: 0, duration: rapido ? 0.25 : 0.7, ease: "power2.out" }, en)
      .fromTo(escena, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.8, ease: "expo.out" }, "<0.15")
      .call(() => {
        capaApp.classList.remove("visible");
        void capaApp.offsetWidth;
        capaApp.classList.add("visible"); // el aviso de abajo entra por CSS
      }, null, "<0.2");
  }

  function animarCambio() {
    const tl = G.timeline();
    escribir(tl, true, 0);
    encender(tl, true, 0.1);
  }

  function introCelular() {
    if (introHecha) return;
    const o = { p: 100 };
    introTl = G.timeline({
      onComplete: () => {
        comparar.classList.remove("por-escribir", "arrastrando");
        introHecha = true;
      }
    });
    escribir(introTl, false, 0.1);
    introTl.to(o, {
      p: 50,
      duration: 1.2,
      ease: "power3.inOut",
      onUpdate: () => ponerPos(o.p, { animar: false })
    }, ">-0.15");
    encender(introTl, false, "<0.35");
    introTl.call(() => comparar.classList.remove("por-escribir"), null, "<");
  }

  /* ---------- Casos: el video corre solo cuando se ve, con su botón de pausa ---------- */
  const video = $("#videoInmobiliaria");
  const control = $("#videoControl");
  let videoCargado = false;
  let videoPausadoPorTi = false;

  const cargarVideo = () => {
    if (videoCargado) return;
    videoCargado = true;
    $$("source[data-src]", video).forEach((s) => { s.src = s.dataset.src; });
    video.load();
  };
  const reproducir = () => {
    cargarVideo();
    const intento = video.play();
    if (intento && intento.catch) intento.catch(() => {});
  };
  const pintarControl = () => {
    const corriendo = !video.paused && !video.ended;
    control.innerHTML = `<i class="ph-fill ${corriendo ? "ph-pause" : "ph-play"}" aria-hidden="true"></i>`;
    control.setAttribute("aria-label", corriendo ? "Pausar el video" : "Reproducir el video");
  };
  ["play", "pause", "ended"].forEach((ev) => video.addEventListener(ev, pintarControl));
  control.addEventListener("click", () => {
    if (!video.paused && !video.ended) { videoPausadoPorTi = true; video.pause(); }
    else { videoPausadoPorTi = false; reproducir(); }
  });
  control.hidden = false;
  pintarControl();

  new IntersectionObserver(([en]) => { if (en.isIntersecting) cargarVideo(); }, { rootMargin: "400px 0px" }).observe(video);
  new IntersectionObserver(([en]) => {
    if (en.isIntersecting) {
      // Con movimiento reducido no arranca solo: el plano hace zoom; queda el botón para verlo
      if (!videoPausadoPorTi && !reduce.matches) reproducir();
    } else if (!video.paused) {
      video.pause();
    }
  }, { threshold: 0.35 }).observe(video);

  /* ---------- Arranque ---------- */
  pintar(0, false);
  ponerPos(50, { animar: false });
  requestAnimationFrame(() => comparar.classList.remove("arrastrando"));
  actualizarWa();
  pintarPausa(pausaBtn, portada, pausado);
  pintarPausa(pausaInicio, inicio, iniPausado);
  $("#tambien").textContent = D.tambien;

  /* ================= Movimiento al hacer scroll ================= */
  const precio = $("#precio");
  if (!conGsap) return; // sin GSAP no se oculta nada: todo queda visible desde el HTML
  // El subrayado del precio solo se esconde (para dibujarse) cuando este script sí corre
  document.documentElement.classList.add("anima");

  G.matchMedia().add({
    mover: "(prefers-reduced-motion: no-preference)",
    quieto: "(prefers-reduced-motion: reduce)"
  }, (ctx) => {
    const { mover } = ctx.conditions;
    // clamp(): si la sección está tan abajo que el scroll no llega a la línea de inicio
    // (el precio, al final de la página), la entrada se dispara igual al llegar al fondo
    const unaVez = (trigger, start) => ({ trigger, start: `clamp(${start})`, once: true });

    if (mover) {
      /* 1 → 2: la foto de la primera pantalla se aleja (el texto no se desvanece: queda sólido) y la foto de negocios se abre como una ventana */
      G.to(fotosInicio, { scale: 1.08, ease: "none", scrollTrigger: { trigger: inicio, start: "top top", end: "bottom top", scrub: true } });
      G.fromTo(fotos,
        { clipPath: "inset(7% 4% 0% 4% round 28px)" },
        { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none", scrollTrigger: { trigger: portada, start: "top bottom", end: "top top", scrub: 0.4 } });
      G.from([".elige__titulo", ".pausa:not(.pausa--inicio)", ...$$(".chip", chips)], {
        opacity: 0, y: 16, duration: 0.8, stagger: 0.045, ease: "expo.out", clearProps: "transform",
        scrollTrigger: unaVez(portada, "top 55%")
      });

      /* 2b: título, y luego la libreta se escribe y el celular se enciende */
      G.from(".celular__titulo .pal__in", { yPercent: 112, duration: 1.1, stagger: 0.06, ease: "expo.out", scrollTrigger: unaVez("#celular", "top 78%") });
      G.from([".negocio", ".celular__dolor"], { opacity: 0, y: 14, duration: 0.9, stagger: 0.08, delay: 0.35, ease: "expo.out", clearProps: "transform", scrollTrigger: unaVez("#celular", "top 78%") });
      introHecha = false;
      comparar.classList.add("por-escribir");
      capaApp.classList.remove("visible");
      ponerPos(100, { animar: false });
      ST.create({ trigger: comparar, start: "top 68%", once: true, onEnter: introCelular });

      /* 3: casos, la sección quieta: cada tarjeta sube un poco y aparece.
         Las capturas no se recortan ni se acercan: se mueven enteras. */
      G.from(".casos__cabeza > *", { opacity: 0, y: 20, duration: 1, stagger: 0.1, ease: "expo.out", clearProps: "transform,opacity", scrollTrigger: unaVez("#casos", "top 80%") });
      $$(".caso").forEach((caso) => {
        G.timeline({ defaults: { ease: "expo.out", clearProps: "transform,opacity" }, scrollTrigger: unaVez(caso, "top 85%") })
          .from($(".caso__foto", caso), { opacity: 0, y: 28, duration: 1.1 }, 0)
          .from($$(".caso__texto > *", caso), { opacity: 0, y: 14, duration: 0.9, stagger: 0.07 }, 0.2);
      });

      /* 4: precio, el cierre: las palabras suben y el monto se subraya */
      G.timeline({ defaults: { ease: "expo.out" }, scrollTrigger: unaVez(precio, "top 72%") })
        .from(".precio__titulo .pal__in", { yPercent: 112, duration: 1.1, stagger: 0.08 }, 0)
        .call(() => precio.classList.add("visto"), null, 0.45)
        .from([".precio__nota", ".wa--precio"], { opacity: 0, y: 16, duration: 0.9, stagger: 0.1, clearProps: "transform,opacity" }, 0.35);
    } else {
      /* Movimiento reducido: nada de entradas. El contenido está visible desde el principio
         (no espera a ningún disparador de scroll), subrayado del precio incluido. */
      precio.classList.add("visto");
    }

    return () => {
      // al cambiar la preferencia: todo a su estado final
      comparar.classList.remove("por-escribir");
      introHecha = true;
      ponerPos(50, { animar: false });
      precio.classList.add("visto");
    };
  });

  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => ST.refresh());
  window.addEventListener("load", () => ST.refresh());
})();
