/* Piezas del cuaderno para las páginas de rubro.
   - primeraHoja(): lo que protagoniza la primera pantalla. Si el rubro declara «papel»
     en rubros.json, dibuja el papel propio de su negocio con un renderer por familia
     (libreta, agenda, talonario, carnet, cuenta). Si no, cae a demo().
   - demo(): la lista manuscrita del día que se pasa en limpio (una escena por renglón).
   - hojaSistema(): la vista del sistema como papel pegado (tabla, agenda, mapa, tablero,
     plano, o una familia leída de una escena si el rubro declara «hoja»).
   Los datos salen de herramientas/dispositivos.json. Todo es de ejemplo, con datos ficticios.

   Contrato del «pasar en limpio» (lo lee rubro.js): cada paso lleva [data-paso]; dentro,
   el tachón es svg[data-tachon], la versión en limpio es [data-limpio], el visto de una
   casilla es .casilla path y el resaltador es .resalte. El HTML trae el estado final.
   Agregar una familia nueva es escribir su renderer y sumarlo a PAPELES. */

export const escapar = (texto) =>
  String(texto ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Tachones a mano: tres trazos distintos para que no se vean copiados.
const TACHONES = [
  "M1 10.5 C 18 8.2, 34 11.6, 52 9.4 S 84 8.1, 99 8.9",
  "M0.5 8.6 C 15 10.6, 38 7.4, 55 9.8 S 86 10.6, 99.5 7.6",
  "M1.2 9.8 C 22 7.8, 41 11.2, 63 8.8 S 90 10.2, 99 9.2",
];

const ICONO_TONO = { ok: "check-circle", soon: "clock", late: "warning-circle" };
const CLASE_TONO = { ok: "tag--ok", soon: "", late: "tag--debe" };

// Estado en limpio: el mismo .tag de la portada, con ícono según el tono.
const estado = (texto, tono, resaltado = false) =>
  `<span class="tag ${CLASE_TONO[tono] ?? ""}"><i class="ph-fill ph-${ICONO_TONO[tono] || "circle"}" aria-hidden="true"></i>${
    resaltado ? `<span class="resalte">${escapar(texto)}</span>` : escapar(texto)
  }</span>`;

/* ---------- Demo: la hoja de hoy ---------- */
export const demo = (rubro) => {
  const c = rubro.dispositivos.celular;
  const total = c.escenas.length;
  const renglones = c.escenas
    .map((e, i) => {
      if (!e.mano) throw new Error(`Falta el renglón a mano de ${rubro.slug}, escena ${i + 1}`);
      return `<li class="tarea" data-paso>
              <s class="tarea__mano">${escapar(e.mano)}<svg class="tarea__tachon" data-tachon viewBox="0 0 100 18" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="${TACHONES[i % TACHONES.length]}" /></svg></s>
              <span class="tarea__limpio" data-limpio><i class="ph ph-arrow-elbow-down-right" aria-hidden="true"></i><span class="tarea__linea"><span class="tarea__texto"><span class="resalte">${escapar(e.toast)}</span></span>${
                e.hora ? `<span class="tarea__hora"><span class="tarea__sep"> · </span>${escapar(e.hora)}</span>` : ""
              }</span></span>
            </li>`;
    })
    .join("\n            ");
  return `<figure class="demo" id="demo" aria-labelledby="demoTitulo">
          <div class="demo__cabeza">
            <p class="demo__titulo" id="demoTitulo">Hoy en ${escapar(c.negocio)}</p>
          </div>
          <ol class="demo__lista">
            ${renglones}
          </ol>
          <p class="demo__total">En limpio: <span class="demo__ahorro" id="demoCuenta" data-total="${total}">${total} de ${total}</span></p>
          <button class="demo__otra" id="demoOtra" type="button" hidden><i class="ph ph-arrow-counter-clockwise" aria-hidden="true"></i><span>Pasar en limpio otra vez</span></button>
          <figcaption class="demo__nota">Ejemplo con datos ficticios</figcaption>
        </figure>`;
};

/* ---------- Papel propio del rubro: piezas comunes ---------- */
// Visto de lapicero que sale de la casilla, el mismo trazo de la portada.
const VISTO = "M7 18.5 C 9.5 20.5, 12 23.5, 14.2 27 C 18 18, 24 10.5, 32.5 3.5";

// Lo anotado a mano que se tacha con lapicero rojo.
const manoTachada = (texto, i = 0) =>
  `<s class="mano-tacha">${escapar(texto)}<svg class="tachon" data-tachon viewBox="0 0 100 18" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="${TACHONES[i % TACHONES.length]}" /></svg></s>`;

// La versión en limpio; el resaltador va solo si lo hizo el sistema.
const enLimpio = (texto, { resalte = true, hora = "", flecha = true } = {}) =>
  `<span class="limpio" data-limpio>${flecha ? '<i class="ph ph-arrow-elbow-down-right" aria-hidden="true"></i>' : ""}<span>${
    resalte ? `<span class="resalte">${escapar(texto)}</span>` : escapar(texto)
  }${hora ? `<span class="limpio__hora"> · ${escapar(hora)}</span>` : ""}</span></span>`;

const casilla = (marcada) =>
  `<span class="casilla" aria-hidden="true">${marcada ? `<svg viewBox="0 0 36 34"><path pathLength="1" d="${VISTO}" /></svg>` : ""}</span>`;

const escenaDe = (rubro, n) => {
  const e = rubro.dispositivos.celular.escenas[n];
  if (!e) throw new Error(`${rubro.slug}: no existe la escena ${n}`);
  return e;
};

/* ---------- Familia «libreta»: cuaderno de pensiones, de crédito o de fiados ----------
   Cada renglón es una fila de la escena (nombre, detalle, estado). Lo que cambió se
   tacha y pasa en limpio; lo demás queda anotado a mano. */
const libreta = (p, rubro, ids) => {
  const e = escenaDe(rubro, p.escena);
  const cambios = new Map((p.renglones || []).map((r) => [r.fila, r]));
  const columna = p.nota ?? 2;
  let trazo = 0;
  const renglones = e.filas
    .map((fila, i) => {
      const c = cambios.get(i);
      const nota = c?.mano ?? fila[columna];
      if (!c) {
        return `<li class="libreta__renglon"><span class="libreta__nombre">${escapar(fila[0])}</span><span class="libreta__nota"><span class="mano">${escapar(nota)}</span></span></li>`;
      }
      const tacha = c.tacha !== false;
      return `<li class="libreta__renglon" data-paso><span class="libreta__nombre">${escapar(fila[0])}</span><span class="libreta__nota">${
        tacha ? manoTachada(nota, trazo++) : `<span class="mano">${escapar(nota)}</span>`
      }${enLimpio(c.limpio ?? fila[2], { resalte: c.resalte !== false })}</span></li>`;
    })
    .join("\n              ");
  return `<div class="pieza libreta">
            <span class="cinta cinta--centro" aria-hidden="true"></span>
            <div class="libreta__cabeza">
              <p class="libreta__titulo" id="${ids.titulo}">${escapar(p.titulo ?? e.titulo)}</p>
              <p class="pieza__negocio">${escapar(rubro.dispositivos.celular.negocio)}</p>
            </div>
            <ul class="libreta__lista">
              ${renglones}
            </ul>
            <p class="libreta__pie">${escapar(e.etiqueta)} <strong>${escapar(e.valor)}</strong> · ${escapar(e.meta)}</p>
          </div>`;
};

/* ---------- Familia «agenda»: las citas de mañana con su casilla ----------
   La casilla de cada cita confirmada se marca; al pie, lo anotado a mano se tacha y
   queda en limpio cuántos confirmaron. */
const agendaPapel = (p, rubro, ids) => {
  const e = escenaDe(rubro, p.escena);
  const dias = (e.dias || [])
    .map((d, i) => `<li${i === e.activo ? ' class="is-hoy"' : ""}>${escapar(d)}${
      i === e.activo ? '<svg viewBox="0 0 60 40" preserveAspectRatio="none" aria-hidden="true"><path d="M44 6 C 30 1, 8 4, 4 18 C 1 31, 22 38, 38 35 C 54 32, 59 20, 52 10 C 48 5, 40 3, 33 4" /></svg>' : ""
    }</li>`)
    .join("");
  const citas = e.citas
    .map(([hora, nombre, detalle, tono, estadoTexto]) => {
      const ok = tono === "ok";
      return `<li class="agenda-papel__cita" data-paso>
              <span class="agenda-papel__hora">${escapar(hora)}</span>
              <span class="agenda-papel__quien"><span class="mano">${escapar(nombre)}</span><span class="agenda-papel__detalle">${escapar(detalle)}</span></span>
              <span class="agenda-papel__estado">${enLimpio(estadoTexto, { resalte: false, flecha: false })}${casilla(ok)}</span>
            </li>`;
    })
    .join("\n            ");
  return `<div class="pieza agenda-papel">
            <span class="cinta cinta--izq" aria-hidden="true"></span>
            <div class="libreta__cabeza">
              <p class="libreta__titulo" id="${ids.titulo}">${escapar(p.titulo ?? e.titulo)}</p>
              <p class="pieza__negocio">${escapar(rubro.dispositivos.celular.negocio)}</p>
            </div>
            ${dias ? `<ol class="agenda-papel__dias" aria-label="Semana; mañana es ${escapar(e.dias[e.activo])}">${dias}</ol>` : ""}
            <ol class="agenda-papel__lista">
            ${citas}
            </ol>
            <p class="pieza__pendiente" data-paso>${manoTachada(e.mano, 1)}${enLimpio(e.toast, { hora: e.hora })}</p>
          </div>`;
};

/* ---------- Familia «talonario»: nota de pedido, cotización o presupuesto ----------
   La hoja del talonario ya sale en limpio; lo anotado a mano al pie se tacha y queda
   en limpio lo que se hizo solo. */
const talonario = (p, rubro, ids) => {
  const e = escenaDe(rubro, p.escena);
  const [tipo, ...numero] = String(e.encabezado).split(" ");
  return `<div class="pieza talonario">
            <div class="talonario__hoja">
              <div class="talonario__cabeza">
                <p class="talonario__tipo" id="${ids.titulo}">${escapar(tipo)}</p>
                <p class="talonario__numero">N.° ${escapar(numero.join(" "))}</p>
              </div>
              <p class="talonario__cliente">${escapar(e.codigo)}</p>
              <ul class="talonario__lineas">
                ${(e.lineas || []).map(([concepto, monto]) => `<li><span>${escapar(concepto)}</span><span>${escapar(monto)}</span></li>`).join("\n                ")}
              </ul>
              ${e.total ? `<p class="talonario__total"><span>Total</span><span>${escapar(e.total)}</span></p>` : ""}
              <p class="pieza__pendiente" data-paso>${manoTachada(e.mano, 2)}${enLimpio(e.sello, { hora: e.hora })}</p>
            </div>
          </div>`;
};

/* ---------- Familia «carnet»: el carnet del socio ----------
   El estado anotado a mano se tacha y pasa en limpio. */
const carnet = (p, rubro, ids) => {
  const e = escenaDe(rubro, p.escena);
  const [nombre, detalle, estadoTexto] = e.filas[p.fila];
  return `<div class="pieza carnet">
            <span class="cinta cinta--der" aria-hidden="true"></span>
            <div class="carnet__cabeza">
              <p class="carnet__marca"><i class="ph ph-${rubro.icono}" aria-hidden="true"></i>${escapar(e.marca ?? rubro.dispositivos.celular.negocio)}</p>
              <p class="carnet__tipo" id="${ids.titulo}">${escapar(p.titulo ?? "Carnet de socio")}</p>
            </div>
            <dl class="carnet__campos">
              <div><dt>Socio</dt><dd class="mano carnet__nombre">${escapar(nombre)}</dd></div>
              <div><dt>Entrada</dt><dd class="mano">${escapar(detalle)}</dd></div>
              <div data-paso><dt>Estado</dt><dd>${manoTachada(estadoTexto)}${enLimpio(p.limpio)}${
                p.detalle ? `<span class="carnet__vence" data-limpio>${escapar(p.detalle)}</span>` : ""
              }</dd></div>
            </dl>
          </div>`;
};

/* ---------- Familia «cuenta»: la cuenta a mano con raya de suma ----------
   Cada parte es [concepto, monto]; un monto que empieza con «-» resta. */
const cuentaMano = (e) => {
  const filas = e.partes
    .map(([concepto, monto], i) => {
      const resta = /^\s*-/.test(monto);
      const op = resta ? "−" : i === 0 ? "" : "+";
      return `<li class="cuenta-mano__fila"><span class="cuenta-mano__op" aria-hidden="true">${op}</span><span class="cuenta-mano__concepto">${escapar(concepto)}</span><span class="cuenta-mano__num">${
        resta ? '<span class="solo-lector">menos </span>' : ""
      }${escapar(String(monto).replace(/^\s*-\s*/, ""))}</span></li>`;
    })
    .join("\n                ");
  return `<div class="cuenta-mano">
              <ol class="cuenta-mano__lista">
                ${filas}
              </ol>
              <svg class="cuenta-mano__raya" viewBox="0 0 400 14" preserveAspectRatio="none" aria-hidden="true"><path d="M2 4.5 C 120 3, 260 6, 398 3.8" /><path d="M4 10.5 C 140 9.4, 280 11.6, 396 9.6" /></svg>
              <p class="cuenta-mano__etiqueta">${escapar(e.etiqueta)}</p>
              <p class="cuenta-mano__total">${escapar(e.total)}</p>
              ${e.meta ? `<p class="cuenta-mano__meta">${escapar(e.meta)}</p>` : ""}
              ${e.nota ? `<p class="cuenta-mano__nota"><i class="ph ph-check-circle" aria-hidden="true"></i><span><span class="resalte">${escapar(e.nota)}</span></span></p>` : ""}
            </div>`;
};

// Un renderer por familia. Para sumar «cuenta», «plano» o «ruta» a la primera
// pantalla basta con escribir su renderer y agregarlo aquí.
const PAPELES = { libreta, agenda: agendaPapel, talonario, carnet };

export const primeraHoja = (rubro) => {
  if (!rubro.papel) return demo(rubro);
  const piezas = [].concat(rubro.papel);
  const html = piezas
    .map((p, i) => {
      const render = PAPELES[p.familia];
      if (!render) throw new Error(`${rubro.slug}: familia de papel desconocida «${p.familia}»`);
      return render(p, rubro, { titulo: i === 0 ? "demoTitulo" : `demoTitulo${i + 1}` });
    })
    .join("\n          ");
  const familias = [...new Set(piezas.map((p) => `papel--${p.familia}`))].join(" ");
  return `<figure class="papel ${familias}${piezas.length > 1 ? " papel--doble" : ""}" id="demo" aria-labelledby="demoTitulo">
          <div class="papel__piezas">
          ${html}
          </div>
          <div class="papel__pie">
            <button class="demo__otra" id="demoOtra" type="button" hidden><i class="ph ph-arrow-counter-clockwise" aria-hidden="true"></i><span>Pasar en limpio otra vez</span></button>
            <figcaption class="demo__nota">Ejemplo con datos ficticios</figcaption>
          </div>
        </figure>`;
};

/* ---------- Hoja del sistema: tabla ---------- */
const tabla = (t) => {
  const filas = t.filas.map((fila, i) => {
    const celdas = fila.slice(0, -2);
    const [tag, tono] = fila.slice(-2);
    const vivo = i === t.vivo;
    return { celdas, estado: vivo ? estado(t.vivoTag, "ok", true) : estado(tag, tono), vivo };
  });
  const datos = t.columnas.slice(1, -1);
  return `<table class="hs-tabla">
              <thead><tr>${t.columnas.map((c) => `<th scope="col">${escapar(c)}</th>`).join("")}</tr></thead>
              <tbody>
                ${filas
                  .map(
                    (f) =>
                      `<tr${f.vivo ? ' class="is-vivo"' : ""}>${f.celdas.map((c, j) => (j === 0 ? `<th scope="row">${escapar(c)}</th>` : `<td>${escapar(c)}</td>`)).join("")}<td>${f.estado}</td></tr>`,
                  )
                  .join("\n                ")}
              </tbody>
            </table>
            <ul class="hs-renglones">
              ${filas
                .map(
                  (f) => `<li${f.vivo ? ' class="is-vivo"' : ""}>
                <span class="hs-renglones__nombre">${escapar(f.celdas[0])}</span>${f.estado}
                <span class="hs-renglones__datos">${f.celdas
                  .slice(1)
                  .map((c, j) => `${escapar(datos[j])} <strong>${escapar(c)}</strong>`)
                  .join(" · ")}</span>
              </li>`,
                )
                .join("\n              ")}
            </ul>`;
};

/* ---------- Hoja del sistema: agenda ---------- */
// «3:00» de la tarde va después de «12:00»: las horas antes de las 7 son de la tarde.
const minutos = (hora) => {
  const [h, m = "0"] = String(hora).split(":");
  const n = Number(h);
  return (n < 7 ? n + 12 : n) * 60 + Number(m);
};

/* Cada hora ocupa dos filas de media hora. Si entre dos horas seguidas hay más de una
   hora de diferencia (el refrigerio), se dibuja un corte: así 12:00 y 3:00 no parecen
   estar a una hora de distancia. */
const agenda = (t) => {
  const cortes = t.horas.slice(1).flatMap((h, i) => (minutos(h) - minutos(t.horas[i]) > 60 ? [i + 1] : []));
  const fila = (x, incluirCorteFinal = true) =>
    2 + Math.round(x * 2) + cortes.filter((b) => (incluirCorteFinal ? b <= x : b < x)).length;
  const alturas = t.horas.flatMap((_, i) => (cortes.includes(i) ? ["16px", "26px", "26px"] : ["26px", "26px"]));
  return `<div class="hs-agenda" style="--cols:${t.columnas.length};grid-template-rows:auto ${alturas.join(" ")}">
              <span class="hs-agenda__esquina" aria-hidden="true"></span>
              ${t.columnas.map((c, i) => `<span class="hs-agenda__col" style="grid-column:${i + 2}">${escapar(c)}</span>`).join("")}
              ${t.horas
                .map(
                  (h, i) =>
                    `<span class="hs-agenda__linea" style="grid-row:${fila(i)} / span 2" aria-hidden="true"></span><span class="hs-agenda__hora" style="grid-row:${fila(i)}">${escapar(h)}</span>`,
                )
                .join("\n              ")}
              ${cortes
                .map((b) => `<span class="hs-agenda__corte" style="grid-row:${fila(b) - 1}" aria-hidden="true"></span>`)
                .join("\n              ")}
              ${t.bloques
                .map(([col, inicio, dur, texto, tono], i) => {
                  const nuevo = i === t.nuevo;
                  const desde = fila(inicio);
                  const hasta = fila(inicio + dur, false);
                  return `<span class="hs-agenda__cita hs-agenda__cita--${tono}${nuevo ? " is-nuevo" : ""}" style="grid-column:${col + 2};grid-row:${desde} / span ${Math.max(1, hasta - desde)}"><span class="solo-lector">${escapar(t.columnas[col])}: </span>${
                    nuevo ? `<span class="resalte">${escapar(texto)}</span>` : escapar(texto)
                  }</span>`;
                })
                .join("\n              ")}
            </div>`;
};

/* ---------- Hoja del sistema: renglones en limpio ----------
   «vivo» es el índice del renglón que hizo el sistema solo: solo ese lleva resaltador. */
const listaFilas = (filas, vivo) =>
  filas
    .map(
      ([nombre, detalle, tag, tono], i) => `<li>
                  <span class="hs-lista__quien"><span class="hs-lista__nombre">${escapar(nombre)}</span><span class="hs-lista__detalle">${escapar(detalle)}</span></span>
                  ${estado(tag, tono, i === vivo)}
                </li>`,
    )
    .join("\n                ");

// Una escena de tipo lista como hoja del sistema: cifra arriba, renglones y lo que se hizo solo.
const listaEscena = (e) => `<div class="hs-escena">
              <p class="hs-escena__cifra"><span>${escapar(e.etiqueta)}</span> <strong>${escapar(e.valor)}</strong></p>
              <p class="hs-escena__meta">${escapar(e.meta)}</p>
              <ul class="hs-lista">
                ${listaFilas(e.filas)}
              </ul>
              <p class="hs-escena__solo"><i class="ph ph-check-circle" aria-hidden="true"></i><span><span class="resalte">${escapar(e.toast)}</span></span></p>
            </div>`;

/* ---------- Hoja del sistema: mapa ---------- */
const FONDO_CIUDAD = `<g class="hs-mapa__calles">
                  <path d="M0 60 H300 M0 130 H300 M0 200 H300 M60 0 V260 M150 0 V260 M230 0 V260" />
                  <path class="hs-mapa__avenida" d="M0 95 H300 M190 0 V260" />
                </g>
                <rect class="hs-mapa__parque" x="72" y="142" width="64" height="44" rx="8" />
                <rect class="hs-mapa__parque" x="238" y="208" width="52" height="40" rx="8" />`;

const FONDO_CARRETERA = `<g class="hs-mapa__cerros">
                  <path d="M0 120 Q60 80 110 110 T220 90 T300 70" />
                  <path d="M0 170 Q70 140 130 160 T240 140 T300 130" />
                  <path d="M0 215 Q80 195 150 210 T300 190" />
                </g>
                <path class="hs-mapa__rio" d="M-10 250 Q70 220 120 235 T260 205 T320 190" />`;

const mapa = (t, slug) => `<div class="hs-mapa">
              <svg class="hs-mapa__svg" viewBox="0 0 300 260" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                ${t.fondo === "ciudad" ? FONDO_CIUDAD : FONDO_CARRETERA}
                ${t.rutas.map((r, i) => `<path id="ruta-${slug}-${i}" class="hs-mapa__ruta${i ? " hs-mapa__ruta--otra" : ""}" d="${r.d}" />`).join("\n                ")}
                ${t.rutas
                  .map(
                    (r, i) =>
                      `<g class="hs-mapa__vehiculo${i ? " hs-mapa__vehiculo--otro" : ""}" data-ruta="ruta-${slug}-${i}" data-hasta="${i ? 0.5 : 0.64}"><circle r="10" /><circle class="hs-mapa__nucleo" r="4" /></g>`,
                  )
                  .join("\n                ")}
              </svg>
              <ul class="hs-lista">
                ${listaFilas(t.lista, t.vivo)}
              </ul>
            </div>`;

/* ---------- Hoja del sistema: tablero ---------- */
const kanban = (t) => `<div class="hs-tablero">
              ${t.columnas
                .map(
                  ([titulo, tarjetas], ci) => `<div class="hs-tablero__col">
                <p class="hs-tablero__titulo">${escapar(titulo)}<span>${tarjetas.length + (ci === t.destino ? 1 : 0)}</span></p>
                <ul>
                  ${tarjetas.map((texto) => `<li>${escapar(texto)}</li>`).join("")}${
                    ci === t.destino
                      ? `<li class="is-nuevo"><i class="ph-fill ph-whatsapp-logo" aria-hidden="true"></i><span class="resalte">${escapar(t.tarjeta)}</span></li>`
                      : ""
                  }
                </ul>
              </div>`,
                )
                .join("\n              ")}
            </div>`;

/* ---------- Hoja del sistema: plano de lotes ---------- */
const LOTE = { l: "libre", s: "separado", v: "vendido" };
const plano = (t) => {
  const estados = [...t.estados];
  const cuenta = (letra) => estados.filter((c) => c === letra).length;
  return `<div class="hs-plano">
              <div class="hs-plano__lotes" style="--cols:${t.columnas}" aria-hidden="true">
                ${estados
                  .map((c, i) =>
                    i === t.cambia
                      ? `<span class="lote lote--separado is-nuevo"><span class="resalte">${escapar(t.codigo || "")}</span></span>`
                      : `<span class="lote lote--${LOTE[c]}"></span>`,
                  )
                  .join("")}
              </div>
              <dl class="hs-plano__cuenta">
                <div><dt><i class="lote lote--libre" aria-hidden="true"></i>Libres</dt><dd>${cuenta("l")}</dd></div>
                <div><dt><i class="lote lote--separado" aria-hidden="true"></i>Separados</dt><dd>${cuenta("s")}</dd></div>
                <div><dt><i class="lote lote--vendido" aria-hidden="true"></i>Vendidos</dt><dd>${cuenta("v")}</dd></div>
              </dl>
              <p class="solo-lector">El lote ${escapar(t.codigo || "")} se acaba de separar.</p>
            </div>`;
};

const VISTAS = { tabla, agenda, mapa, kanban, plano };

// Familias que la hoja del sistema puede leer de una escena (rubros.json, «hoja»).
const HOJAS = { cuenta: cuentaMano, lista: listaEscena };

export const hojaSistema = (rubro) => {
  let tipo;
  let titulo;
  let cuerpo;
  if (rubro.hoja) {
    const e = escenaDe(rubro, rubro.hoja.escena);
    const render = HOJAS[rubro.hoja.familia];
    if (!render) throw new Error(`${rubro.slug}: familia de hoja desconocida «${rubro.hoja.familia}»`);
    tipo = rubro.hoja.familia;
    titulo = rubro.hoja.titulo ?? e.titulo;
    cuerpo = render(e);
  } else {
    const t = rubro.dispositivos.tablet;
    const render = VISTAS[t.tipo];
    if (!render) throw new Error(`Vista desconocida: ${t.tipo}`);
    tipo = t.tipo;
    titulo = t.titulo;
    cuerpo = render(t, rubro.slug);
  }
  return `<figure class="hs hs--${tipo}" id="hojaSistema" aria-labelledby="hsTitulo">
          <span class="cinta cinta--centro" aria-hidden="true"></span>
          <div class="hs__cabeza">
            <p class="hs__negocio"><i class="ph ph-${rubro.icono}" aria-hidden="true"></i>${escapar(rubro.dispositivos.celular.negocio)}</p>
            <p class="hs__titulo" id="hsTitulo">${escapar(titulo)}</p>
          </div>
          <div class="hs__cuerpo">
            ${cuerpo}
          </div>
          <figcaption class="hs__pie"><i class="ph ph-device-mobile" aria-hidden="true"></i> Lo ves tú, lo ve tu equipo, desde el celular.</figcaption>
        </figure>`;
};
