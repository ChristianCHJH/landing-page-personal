/* Piezas del cuaderno para las páginas de rubro.
   - demo(): la lista manuscrita del día que se pasa en limpio (una escena por renglón).
   - hojaSistema(): la vista del sistema como papel pegado (tabla, agenda, mapa, tablero, panel o plano).
   Los datos salen de herramientas/dispositivos.json. Todo es de ejemplo, con datos ficticios. */

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
      return `<li class="tarea">
              <s class="tarea__mano">${escapar(e.mano)}<svg class="tarea__tachon" viewBox="0 0 100 18" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="${TACHONES[i % TACHONES.length]}" /></svg></s>
              <span class="tarea__limpio"><i class="ph ph-arrow-elbow-down-right" aria-hidden="true"></i><span class="tarea__linea"><span class="tarea__texto"><span class="resalte">${escapar(e.toast)}</span></span>${
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
const agenda = (t) => {
  const filas = t.horas.length * 2;
  return `<div class="hs-agenda" style="--cols:${t.columnas.length};grid-template-rows:auto repeat(${filas}, 26px)">
              <span class="hs-agenda__esquina" aria-hidden="true"></span>
              ${t.columnas.map((c, i) => `<span class="hs-agenda__col" style="grid-column:${i + 2}">${escapar(c)}</span>`).join("")}
              ${t.horas
                .map(
                  (h, i) =>
                    `<span class="hs-agenda__linea" style="grid-row:${i * 2 + 2} / span 2" aria-hidden="true"></span><span class="hs-agenda__hora" style="grid-row:${i * 2 + 2}">${escapar(h)}</span>`,
                )
                .join("\n              ")}
              ${t.bloques
                .map(([col, inicio, dur, texto, tono], i) => {
                  const nuevo = i === t.nuevo;
                  return `<span class="hs-agenda__cita hs-agenda__cita--${tono}${nuevo ? " is-nuevo" : ""}" style="grid-column:${col + 2};grid-row:${Math.round(inicio * 2) + 2} / span ${Math.max(1, Math.round(dur * 2))}"><span class="solo-lector">${escapar(t.columnas[col])}: </span>${
                    nuevo ? `<span class="resalte">${escapar(texto)}</span>` : escapar(texto)
                  }</span>`;
                })
                .join("\n              ")}
            </div>`;
};

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
                ${t.lista
                  .map(
                    ([nombre, detalle, tag, tono]) => `<li>
                  <span class="hs-lista__quien"><span class="hs-lista__nombre">${escapar(nombre)}</span><span class="hs-lista__detalle">${escapar(detalle)}</span></span>
                  ${estado(tag, tono)}
                </li>`,
                  )
                  .join("\n                ")}
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

/* ---------- Hoja del sistema: panel ---------- */
const panel = (t) => `<div class="hs-panel">
              <dl class="hs-panel__cifras">
                ${t.stats.map(([label, valor]) => `<div><dt>${escapar(label)}</dt><dd>${escapar(valor)}</dd></div>`).join("")}
              </dl>
              <p class="hs-panel__rotulo">${escapar(t.barrasTitulo)}</p>
              <div class="hs-panel__barras" aria-hidden="true">
                ${t.barras.map((v, i) => `<span style="--h:${v}%"${i === t.barras.length - 1 ? ' class="is-ahora"' : ""}></span>`).join("")}
              </div>
              <div class="hs-panel__eje" aria-hidden="true">${t.ejes.map((e) => `<span>${escapar(e)}</span>`).join("")}</div>
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

const VISTAS = { tabla, agenda, mapa, kanban, panel, plano };

export const hojaSistema = (rubro) => {
  const t = rubro.dispositivos.tablet;
  const render = VISTAS[t.tipo];
  if (!render) throw new Error(`Vista desconocida: ${t.tipo}`);
  return `<figure class="hs hs--${t.tipo}" id="hojaSistema" aria-labelledby="hsTitulo">
          <span class="cinta cinta--centro" aria-hidden="true"></span>
          <div class="hs__cabeza">
            <p class="hs__negocio"><i class="ph ph-${rubro.icono}" aria-hidden="true"></i>${escapar(rubro.dispositivos.celular.negocio)}</p>
            <p class="hs__titulo" id="hsTitulo">${escapar(t.titulo)}</p>
          </div>
          <div class="hs__cuerpo">
            ${render(t, rubro.slug)}
          </div>
          <figcaption class="hs__pie"><i class="ph ph-device-mobile" aria-hidden="true"></i> Lo ves tú, lo ve tu equipo, desde el celular.</figcaption>
        </figure>`;
};
