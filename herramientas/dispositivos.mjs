export const escapar = (texto) =>
  String(texto ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const etiqueta = (texto, tono) => `<span class="tag tag--${tono}">${escapar(texto)}</span>`;

const inicial = (nombre) => escapar(String(nombre).trim().charAt(0).toUpperCase());

const lista = (e) => `<div class="app__total">
          <p class="app__label">${escapar(e.etiqueta)}</p>
          <p class="app__amount">${escapar(e.valor)}</p>
          <p class="app__meta">${escapar(e.meta)}</p>
        </div>
        <ul class="app__list">
          ${e.filas
            .map(
              ([nombre, detalle, tag, tono]) => `<li class="row row--tag">
            <div class="row__who">
              <p class="row__name">${escapar(nombre)}</p>
              <p class="row__detail">${escapar(detalle)}</p>
            </div>
            ${etiqueta(tag, tono)}
          </li>`,
            )
            .join("\n          ")}
        </ul>`;

const chat = (e) => `<div class="chat">
          <div class="chat__head">
            <span class="chat__avatar">${inicial(e.contacto)}</span>
            <div>
              <p class="chat__name">${escapar(e.contacto)}</p>
              <p class="chat__status">por WhatsApp</p>
            </div>
          </div>
          <div class="chat__body">
            ${e.mensajes
              .map(([de, texto, hora], i) =>
                de === "sistema"
                  ? `<p class="chat__system" style="--i:${i}"><i class="ph-fill ph-check-circle"></i>${escapar(texto)}</p>`
                  : `<p class="chat__msg chat__msg--${de}" style="--i:${i}">${escapar(texto)}<span>${escapar(hora)}${de === "yo" ? ' <i class="ph ph-checks"></i>' : ""}</span></p>`,
              )
              .join("\n            ")}
          </div>
        </div>`;

const calendario = (e) => `<div class="cal">
          <div class="cal__days">
            ${e.dias
              .map((dia, i) => {
                const [letra, numero] = dia.split(" ");
                return `<span class="cal__day${i === e.activo ? " is-on" : ""}"><small>${escapar(letra)}</small>${escapar(numero)}</span>`;
              })
              .join("")}
          </div>
          <ul class="cal__slots">
            ${e.citas
              .map(
                ([hora, nombre, detalle, tono, tag]) => `<li class="slot slot--${tono}">
              <span class="slot__time">${escapar(hora)}</span>
              <div class="slot__info">
                <p class="slot__name">${escapar(nombre)}</p>
                <p class="slot__detail">${escapar(detalle)}</p>
              </div>
              ${etiqueta(tag, tono)}
            </li>`,
              )
              .join("\n            ")}
          </ul>
        </div>`;

const MAPA_FONDO_CIUDAD = `<g class="map__streets">
            <path d="M0 60 H300 M0 130 H300 M0 200 H300 M60 0 V260 M150 0 V260 M230 0 V260" />
            <path class="map__avenue" d="M0 95 H300 M190 0 V260" />
          </g>
          <rect class="map__park" x="72" y="142" width="64" height="44" rx="8" />
          <rect class="map__park" x="238" y="208" width="52" height="40" rx="8" />`;

const MAPA_FONDO_CARRETERA = `<g class="map__hills">
            <path d="M0 120 Q60 80 110 110 T220 90 T300 70" />
            <path d="M0 170 Q70 140 130 160 T240 140 T300 130" />
            <path d="M0 215 Q80 195 150 210 T300 190" />
          </g>
          <path class="map__river" d="M-10 250 Q70 220 120 235 T260 205 T320 190" />`;

const mapa = (e, id) => `<div class="map">
          <svg class="map__svg" viewBox="0 0 300 260" aria-hidden="true">
          ${e.fondo === "ciudad" ? MAPA_FONDO_CIUDAD : MAPA_FONDO_CARRETERA}
          <path id="${id}" class="map__route" d="${e.ruta}" />
          ${e.paradas
            .map(
              ([x, y, nombre]) =>
                `<g class="map__stop"><circle cx="${x}" cy="${y}" r="6" /><text x="${x > 190 ? x - 10 : x + 10}" y="${y + 4}"${x > 190 ? ' text-anchor="end"' : ""}>${escapar(nombre)}</text></g>`,
            )
            .join("\n          ")}
          <g class="map__vehicle">
            <circle r="11" />
            <circle class="map__vehicle-core" r="5" />
            <animateMotion dur="${e.duracion || 9}s" repeatCount="indefinite" rotate="0"><mpath href="#${id}" /></animateMotion>
          </g>
          </svg>
          <div class="map__card">
            <div>
              <p class="row__name">${escapar(e.eta.titulo)}</p>
              <p class="row__detail">${escapar(e.eta.detalle)}</p>
            </div>
            ${etiqueta(e.eta.tag, e.eta.tono)}
          </div>
        </div>`;

const ficha = (e) => `<div class="pet">
          <div class="pet__head">
            <span class="pet__avatar"><i class="ph ph-${e.icono}"></i></span>
            <div>
              <p class="pet__name">${escapar(e.nombre)}</p>
              <p class="row__detail">${escapar(e.detalle)}</p>
            </div>
          </div>
          <p class="pet__label">${escapar(e.titulo_items)}</p>
          <ul class="pet__items">
            ${e.items
              .map(
                ([texto, fecha, tono]) => `<li class="pet__item pet__item--${tono}">
              <i class="ph-fill ${tono === "ok" ? "ph-check-circle" : tono === "late" ? "ph-warning-circle" : "ph-clock"}"></i>
              <div>
                <p class="row__name">${escapar(texto)}</p>
                <p class="row__detail">${escapar(fecha)}</p>
              </div>
            </li>`,
              )
              .join("\n            ")}
          </ul>
        </div>`;

const LOTE = { l: "libre", s: "separado", v: "vendido" };

const plano = (e, tamaño = "sm") => `<div class="plan plan--${tamaño}">
          <div class="plan__grid" style="--cols:${e.columnas}">
            ${[...e.estados]
              .map((c, i) => `<span class="lot lot--${LOTE[c]}${i === e.cambia ? " lot--cambia" : ""}">${i === e.cambia ? escapar(e.codigo || "") : ""}</span>`)
              .join("")}
          </div>
          <div class="plan__legend">
            <span><i class="lot lot--libre"></i>Libre</span>
            <span><i class="lot lot--separado"></i>Separado</span>
            <span><i class="lot lot--vendido"></i>Vendido</span>
          </div>
        </div>`;

const documento = (e) => `<div class="doc">
          <p class="doc__head"><i class="ph ph-${e.icono || "receipt"}"></i>${escapar(e.encabezado)}</p>
          <p class="doc__code">${escapar(e.codigo)}</p>
          <div class="doc__lines">
            ${e.lineas.map(([a, b]) => `<p class="doc__line"><span>${escapar(a)}</span><span>${escapar(b)}</span></p>`).join("\n            ")}
          </div>
          ${e.total ? `<p class="doc__total"><span>Total</span><span>${escapar(e.total)}</span></p>` : ""}
          ${
            e.fotos
              ? `<div class="doc__photos">${e.fotos
                  .map((f) => `<span class="doc__photo"><i class="ph ph-camera"></i>${escapar(f)}</span>`)
                  .join("")}</div>`
              : ""
          }
          <p class="doc__seal doc__seal--${e.tono}"><i class="ph-fill ph-seal-check"></i>${escapar(e.sello)}</p>
        </div>`;

const linea = (e) => `<div class="trip">
          <div class="pet__head">
            <span class="pet__avatar"><i class="ph ph-${e.icono}"></i></span>
            <div>
              <p class="pet__name">${escapar(e.nombre)}</p>
              <p class="row__detail">${escapar(e.detalle)}</p>
            </div>
          </div>
          <ol class="trip__steps">
            ${e.pasos
              .map(
                ([texto, hora, hecho]) => `<li class="trip__step${hecho ? " is-done" : ""}">
              <span class="trip__dot"><i class="ph-fill ph-check"></i></span>
              <div>
                <p class="row__name">${escapar(texto)}</p>
                <p class="row__detail">${escapar(hora || "Pendiente")}</p>
              </div>
            </li>`,
              )
              .join("\n            ")}
          </ol>
          ${e.nota ? `<p class="trip__note"><i class="ph-fill ph-whatsapp-logo"></i>${escapar(e.nota)}</p>` : ""}
        </div>`;

const carnet = (e) => `<div class="pass">
          <div class="pass__card pass__card--${e.tono}">
            <div class="pass__top">
              <span class="pass__brand">${escapar(e.marca)}</span>
              <span class="pass__state">${escapar(e.estado)}</span>
            </div>
            <div class="pass__who">
              <span class="pass__avatar">${inicial(e.nombre)}</span>
              <div>
                <p class="pass__name">${escapar(e.nombre)}</p>
                <p class="pass__plan">${escapar(e.plan)}</p>
              </div>
            </div>
            <div class="pass__bottom">
              <div>
                <p class="pass__small">Vence</p>
                <p class="pass__date">${escapar(e.vence)}</p>
              </div>
              <span class="pass__qr" aria-hidden="true">${Array.from({ length: 25 }, (_, i) => `<i class="${[0, 1, 3, 5, 6, 8, 11, 12, 13, 16, 18, 19, 21, 23, 24].includes(i) ? "on" : ""}"></i>`).join("")}</span>
            </div>
          </div>
          <ul class="app__list">
            ${e.filas
              .map(
                ([nombre, detalle, tag, tono]) => `<li class="row row--tag">
              <div class="row__who">
                <p class="row__name">${escapar(nombre)}</p>
                <p class="row__detail">${escapar(detalle)}</p>
              </div>
              ${etiqueta(tag, tono)}
            </li>`,
              )
              .join("\n            ")}
          </ul>
        </div>`;

const caja = (e) => `<div class="app__total">
          <p class="app__label">${escapar(e.etiqueta)}</p>
          <p class="app__amount">${escapar(e.total)}</p>
          <p class="app__meta">${escapar(e.meta)}</p>
        </div>
        <ul class="split">
          ${e.partes
            .map(
              ([nombre, monto, pct]) => `<li class="split__row">
            <div class="split__top"><span>${escapar(nombre)}</span><strong>${escapar(monto)}</strong></div>
            <span class="split__bar" style="--p:${pct}%"></span>
          </li>`,
            )
            .join("\n          ")}
        </ul>
        ${e.nota ? `<p class="split__note"><i class="ph-fill ph-check-circle"></i>${escapar(e.nota)}</p>` : ""}`;

const ESCENAS = { lista, chat, calendario, mapa, ficha, plano, documento, linea, carnet, caja };

export const celular = (rubro) => {
  const c = rubro.dispositivos.celular;
  const escenas = c.escenas
    .map((e, i) => {
      const render = ESCENAS[e.tipo];
      if (!render) throw new Error(`Escena desconocida: ${e.tipo}`);
      return `<div class="scene${i === 0 ? " is-on" : ""}"${i === 0 ? "" : ' aria-hidden="true"'} data-toast="${escapar(e.toast)}" data-toast-icon="${escapar(e.icono_toast || "check-circle")}">
        <p class="scene__title">${escapar(e.titulo)}</p>
        ${render(e, `ruta-${rubro.slug}-${i}`)}
      </div>`;
    })
    .join("\n      ");
  return `<div class="phone phone--tall" aria-label="Ejemplo de cómo se vería tu sistema en el celular">
            <div class="phone__notch" aria-hidden="true"></div>
            <div class="app app--scenes">
              <div class="app__top">
                <div>
                  <p class="app__hello">${escapar(c.saludo)}</p>
                  <p class="app__biz">${escapar(c.negocio)}</p>
                </div>
                <span class="app__avatar" aria-hidden="true"><i class="ph ph-${rubro.icono}"></i></span>
              </div>
              <div class="scenes">
      ${escenas}
              </div>
              <div class="scene-dots" role="tablist" aria-label="Pantallas de ejemplo">
                ${c.escenas.map((e, i) => `<button type="button" class="scene-dot${i === 0 ? " is-on" : ""}" aria-label="Ver ${escapar(e.titulo)}"></button>`).join("")}
              </div>
            </div>
            <div class="toast" role="status" aria-live="polite">
              <i class="ph-fill ph-check-circle" aria-hidden="true"></i>
              <span></span>
            </div>
          </div>`;
};

const tabla = (t) => `<table class="tt">
            <thead><tr>${t.columnas.map((c) => `<th>${escapar(c)}</th>`).join("")}</tr></thead>
            <tbody>
              ${t.filas
                .map((fila, i) => {
                  const celdas = fila.slice(0, -2);
                  const [tag, tono] = fila.slice(-2);
                  const estado =
                    i === t.vivo
                      ? `<span class="swap"><span class="swap__a">${etiqueta(tag, tono)}</span><span class="swap__b">${etiqueta(t.vivoTag, "ok")}</span></span>`
                      : etiqueta(tag, tono);
                  return `<tr${i === t.vivo ? ' class="is-live"' : ""}>${celdas.map((c) => `<td>${escapar(c)}</td>`).join("")}<td>${estado}</td></tr>`;
                })
                .join("\n              ")}
            </tbody>
          </table>`;

const agenda = (t) => `<div class="ag" style="--cols:${t.columnas.length};--rows:${t.horas.length}">
            <div class="ag__head"><span></span>${t.columnas.map((c) => `<span>${escapar(c)}</span>`).join("")}</div>
            <div class="ag__body">
              <div class="ag__hours">${t.horas.map((h) => `<span>${escapar(h)}</span>`).join("")}</div>
              <div class="ag__grid">
                ${t.bloques
                  .map(
                    ([col, inicio, dur, texto, tono], i) =>
                      `<span class="ag__block ag__block--${tono}${i === t.nuevo ? " ag__block--nuevo" : ""}" style="--c:${col};--s:${inicio};--d:${dur}">${escapar(texto)}</span>`,
                  )
                  .join("\n                ")}
              </div>
            </div>
          </div>`;

const mapaTablet = (t, slug) => `<div class="tmap">
            <ul class="tmap__list">
              ${t.lista
                .map(
                  ([nombre, detalle, tag, tono]) => `<li>
                <p class="row__name">${escapar(nombre)}</p>
                <p class="row__detail">${escapar(detalle)}</p>
                ${etiqueta(tag, tono)}
              </li>`,
                )
                .join("\n              ")}
            </ul>
            <svg class="map__svg tmap__svg" viewBox="0 0 300 260" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              ${t.fondo === "ciudad" ? MAPA_FONDO_CIUDAD : MAPA_FONDO_CARRETERA}
              ${t.rutas.map((r, i) => `<path id="tr-${slug}-${i}" class="map__route${i ? " map__route--soft" : ""}" d="${r.d}" />`).join("\n              ")}
              ${t.rutas
                .map(
                  (r, i) => `<g class="map__vehicle${i ? " map__vehicle--soft" : ""}"><circle r="9" /><circle class="map__vehicle-core" r="4" /><animateMotion dur="${r.duracion}s" repeatCount="indefinite" begin="${i * 1.3}s"><mpath href="#tr-${slug}-${i}" /></animateMotion></g>`,
                )
                .join("\n              ")}
            </svg>
          </div>`;

const kanban = (t) => `<div class="kb">
            ${t.columnas
              .map(
                ([titulo, tarjetas], ci) => `<div class="kb__col">
              <p class="kb__title">${escapar(titulo)}<span>${tarjetas.length + (ci === t.destino ? 1 : 0)}</span></p>
              ${tarjetas.map((texto) => `<p class="kb__card">${escapar(texto)}</p>`).join("")}
              ${ci === t.origen ? `<p class="kb__card kb__card--sale">${escapar(t.tarjeta)}</p>` : ""}
              ${ci === t.destino ? `<p class="kb__card kb__card--entra"><i class="ph-fill ph-whatsapp-logo"></i>${escapar(t.tarjeta)}</p>` : ""}
            </div>`,
              )
              .join("\n            ")}
          </div>`;

const panel = (t) => `<div class="pn">
            <div class="pn__stats">
              ${t.stats.map(([label, valor]) => `<div class="pn__stat"><p class="row__detail">${escapar(label)}</p><p class="pn__value">${escapar(valor)}</p></div>`).join("")}
            </div>
            <p class="pn__label">${escapar(t.barrasTitulo)}</p>
            <div class="pn__bars">
              ${t.barras.map((v, i) => `<span style="--h:${v}%;--i:${i}"${i === t.barras.length - 1 ? ' class="is-now"' : ""}></span>`).join("")}
            </div>
            <div class="pn__axis">${t.ejes.map((e) => `<span>${escapar(e)}</span>`).join("")}</div>
          </div>`;

const planoTablet = (t) => `<div class="tplan">
            ${plano(t, "lg")}
            <div class="tplan__side">
              ${[["Libres", "l", "libre"], ["Separados", "s", "separado"], ["Vendidos", "v", "vendido"]]
                .map(([label, letra, tono]) => `<div class="tplan__stat"><i class="lot lot--${tono}"></i><p class="pn__value">${[...t.estados].filter((c) => c === letra).length}</p><p class="row__detail">${label}</p></div>`)
                .join("")}
            </div>
          </div>`;

const TABLETS = { tabla, agenda, mapa: mapaTablet, kanban, panel, plano: planoTablet };

export const tablet = (rubro) => {
  const t = rubro.dispositivos.tablet;
  const render = TABLETS[t.tipo];
  if (!render) throw new Error(`Tablet desconocida: ${t.tipo}`);
  return `<div class="tablet" aria-hidden="true">
            <div class="tablet__screen">
              <div class="tablet__bar">
                <span class="tablet__brand"><i class="ph ph-${rubro.icono}"></i>${escapar(rubro.dispositivos.celular.negocio)}</span>
                <span class="tablet__title">${escapar(t.titulo)}</span>
              </div>
              <div class="tablet__body">
          ${render(t, rubro.slug)}
              </div>
            </div>
          </div>`;
};
