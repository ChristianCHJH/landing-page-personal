/* Genera las 12 páginas de rubro en el mundo «Cuaderno de cuentas» y el sitemap.
   Uso: node herramientas/generar-rubros.mjs
   Fuentes: herramientas/rubros.json (textos) y herramientas/dispositivos.json (demo y vista del sistema).
   Cada página carga portada.css (sin tocarlo) más rubro.css y rubro.js.
   No lee ni escribe index.html: la lista de rubros sale de rubros.json. */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { demo, hojaSistema, escapar } from "./dispositivos.mjs";

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITIO = "https://landing-page-personal-kappa.vercel.app";
const WHATSAPP = "51913412590";
const FECHA = new Date().toISOString().slice(0, 10);
const FUENTES = "https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@100..125,700..800&family=Kalam:wght@400;700&family=Schibsted+Grotesk:wght@400..700&display=swap";

const dispositivos = JSON.parse(readFileSync(join(RAIZ, "herramientas", "dispositivos.json"), "utf-8"));
const rubros = JSON.parse(readFileSync(join(RAIZ, "herramientas", "rubros.json"), "utf-8")).map((rubro) => {
  if (!dispositivos[rubro.slug]) throw new Error(`Faltan pantallas para ${rubro.slug}`);
  return { ...rubro, dispositivos: dispositivos[rubro.slug] };
});

// Preguntas frecuentes: las mismas respuestas reales de la portada.
const PREGUNTAS = [
  ["¿Necesito saber de computación?", "No. Si sabes usar WhatsApp, sabes usar tu sistema. Lo diseño con las palabras que ya usas en tu negocio y te enseño a ti y a tu equipo."],
  ["¿Funciona en el celular?", "Sí. Lo abres desde el celular, la tablet o la computadora, sin instalar nada. Ves tus cobros y ventas desde donde estés."],
  ["¿Qué pasa con lo que ya tengo en Excel?", "Lo paso al sistema por ti. Clientes, deudas, productos e historial. No empiezas de cero."],
  ["¿Emite boletas y facturas electrónicas SUNAT?", "Sí. Conecto tu sistema con la facturación electrónica para que la boleta o factura salga sola cuando registras la venta o el cobro."],
  ["¿Cuánto cuesta?", "Los planes empiezan desde S/ 90 al mes. El precio final depende de lo que necesites, y te lo doy cerrado y por escrito después de la primera conversación, que es gratis."],
  ["¿Por qué no uso un sistema que ya existe?", "Los sistemas genéricos te obligan a cambiar tu forma de trabajar. El tuyo se adapta a cómo ya trabajas y crece contigo cuando lo necesites."],
];

const LOGO = `<svg class="logo__marca" viewBox="0 0 64 64" aria-hidden="true"><rect width="64" height="64" rx="14" /><path fill-rule="evenodd" d="M27 16h10l11 32h-8.5l-2.1-6.5H26.6L24.5 48H16zM32 25l-3 9h6z" fill="#fff" /></svg>`;
const LOGO_CLARO = `<svg class="logo__marca" viewBox="0 0 64 64" aria-hidden="true"><rect width="64" height="64" rx="14" /><path fill-rule="evenodd" d="M27 16h10l11 32h-8.5l-2.1-6.5H26.6L24.5 48H16zM32 25l-3 9h6z" /></svg>`;

const enlaceWhatsapp = (mensaje) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensaje)}`;

// Una sola acción en toda la página: escribir por WhatsApp con el mensaje del rubro.
const botonWhatsapp = (rubro, cta, clases = "btn btn--primario", texto = "Escríbeme por WhatsApp") => `<a class="${clases}" data-cta="${cta}-${rubro.slug}" href="${escapar(enlaceWhatsapp(rubro.whatsapp))}" target="_blank" rel="noopener">
            <i class="ph-fill ph-whatsapp-logo" aria-hidden="true"></i>
            <span>${texto}</span>
          </a>`;

const ENLACES = [
  ["#solucion", "Lo que resuelvo"],
  ["#precio", "Precio"],
  ["#sistema", "Cómo se ve"],
  ["#preguntas", "Preguntas"],
  ["#rubros", "Otros rubros"],
];

const arreglo = ([dolor, respuesta, icono]) => `<li class="arreglo">
              <i class="ph ph-${icono} arreglo__icono" aria-hidden="true"></i>
              <div>
                <p class="arreglo__antes">“${escapar(dolor)}”</p>
                <p class="arreglo__ahora">${escapar(respuesta)}</p>
              </div>
            </li>`;

const datosEstructurados = (rubro) =>
  JSON.stringify(
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          name: `Sistema para ${rubro.nombre.toLowerCase()}`,
          serviceType: rubro.nombre,
          description: rubro.descripcion,
          url: `${SITIO}/${rubro.slug}/`,
          image: `${SITIO}/assets/og/${rubro.slug}.jpg`,
          areaServed: [{ "@type": "City", name: "Lima" }, { "@type": "Country", name: "Perú" }],
          provider: { "@type": "ProfessionalService", "@id": `${SITIO}/#negocio`, name: "Abiel", telephone: "+51913412590" },
          offers: { "@type": "Offer", priceCurrency: "PEN", price: "90", description: "Planes desde S/ 90 al mes" },
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Abiel", item: `${SITIO}/` },
            { "@type": "ListItem", position: 2, name: rubro.nombre, item: `${SITIO}/${rubro.slug}/` },
          ],
        },
        {
          "@type": "FAQPage",
          mainEntity: PREGUNTAS.map(([pregunta, respuesta]) => ({
            "@type": "Question",
            name: pregunta,
            acceptedAnswer: { "@type": "Answer", text: respuesta },
          })),
        },
      ],
    },
    null,
    2,
  );

const indiceRubros = (actual) =>
  rubros
    .filter((r) => r.slug !== actual.slug)
    .map(
      (r) =>
        `<li><a class="indice__item" href="/${r.slug}/"><i class="ph ph-${r.icono}" aria-hidden="true"></i><span class="indice__nombre">${escapar(r.nombre)}</span><span class="indice__puntos" aria-hidden="true"></span><i class="ph ph-arrow-right indice__ir" aria-hidden="true"></i></a></li>`,
    )
    .join("\n          ");

const notaPrecio = (rubro) =>
  rubro.nota
    ? `<p class="precio__sunat"><i class="ph-fill ph-warning-circle" aria-hidden="true"></i><span>${escapar(rubro.nota)}</span></p>`
    : `<p class="precio__sunat"><i class="ph-fill ph-chat-teardrop-text" aria-hidden="true"></i><span>Hablas directo con quien construye tu sistema. Sin call center y sin palabras raras.</span></p>`;

const pagina = (rubro) => `<!DOCTYPE html>
<html lang="es-PE">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <title>${escapar(rubro.titulo)}</title>
  <meta name="description" content="${escapar(rubro.descripcion)}" />
  <link rel="canonical" href="${SITIO}/${rubro.slug}/" />
  <meta name="robots" content="index, follow" />
  <meta name="theme-color" content="#FAFCFF" />
  <meta name="color-scheme" content="light" />
  <meta name="geo.region" content="PE-LIM" />
  <meta name="geo.placename" content="Lima" />

  <meta property="og:type" content="website" />
  <meta property="og:locale" content="es_PE" />
  <meta property="og:site_name" content="Abiel" />
  <meta property="og:url" content="${SITIO}/${rubro.slug}/" />
  <meta property="og:title" content="${escapar(rubro.gancho)}" />
  <meta property="og:description" content="${escapar(rubro.sub)}" />
  <meta property="og:image" content="${SITIO}/assets/og/${rubro.slug}.jpg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />

  <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="${FUENTES}" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/regular/style.css" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/fill/style.css" />
  <link rel="stylesheet" href="/portada.css" />
  <link rel="stylesheet" href="/rubro.css" />

  <script type="application/ld+json">
${datosEstructurados(rubro)}
  </script>
</head>
<body class="pagina-rubro">
  <a class="saltar" href="#contenido">Saltar al contenido</a>

  <!-- Encabezado: el renglón de arriba de la hoja del cuaderno -->
  <header class="nav" id="nav">
    <div class="contenedor nav__fila">
      <a href="/" class="logo" aria-label="Abiel, ir a la portada">
        ${LOGO}
        <span class="logo__texto">Abiel</span>
      </a>
      <p class="nav__fecha">Fecha: <span id="navFecha">hoy</span></p>
      <nav class="nav__enlaces" aria-label="Principal">
        ${ENLACES.map(([href, texto]) => `<a href="${href}">${texto}</a>`).join("\n        ")}
      </nav>
      ${botonWhatsapp(rubro, "nav", "btn btn--primario btn--chico nav__cta")}
      <button class="nav__menu" id="burger" type="button" aria-label="Abrir menú" aria-expanded="false" aria-controls="menuMovil">
        <i class="ph ph-list" aria-hidden="true"></i>
      </button>
    </div>
    <div class="nav__movil" id="menuMovil" hidden>
      ${ENLACES.map(([href, texto]) => `<a href="${href}">${texto}</a>`).join("\n      ")}
      <a href="/">Ir a la portada</a>
      ${botonWhatsapp(rubro, "menu")}
    </div>
  </header>

  <main id="contenido">
    <!-- Primera pantalla: la hoja de hoy del negocio -->
    <section class="hero" id="inicio">
      <div class="contenedor hero__grid">
        <div class="hero__copy">
          <h1 class="hero__titulo hero__titulo--rubro">${escapar(rubro.gancho)}</h1>
          <p class="hero__sub">${escapar(rubro.sub)}</p>
          <div class="hero__ctas">
            ${botonWhatsapp(rubro, "hero", "btn btn--primario btn--grande")}
          </div>
          <ul class="hero__datos">
            <li>Primera conversación gratis</li>
            <li>Lo ves funcionando antes de pagar</li>
            <li>Desde S/ 90 al mes</li>
          </ul>
          <p class="hero__lugar"><i class="ph ph-${rubro.icono}" aria-hidden="true"></i> ${escapar(rubro.pill)}</p>
        </div>

        <!-- Demo: lo que se anotó a mano hoy, pasado en limpio -->
        ${demo(rubro)}
      </div>
    </section>

    <!-- Lo que resuelvo: lo que dice el dueño y lo que hace el sistema -->
    <section class="seccion arreglos" id="solucion">
      <div class="contenedor arreglos__grid">
        <div class="arreglos__intro">
          <h2 class="seccion__titulo">Lo que te resuelvo</h2>
          <p class="seccion__sub">Tres cosas puntuales. Lo demás lo vemos juntos, según cómo trabajas.</p>
        </div>
        <div>
          <ol class="arreglos__lista">
            ${rubro.soluciones.map(arreglo).join("\n            ")}
          </ol>
          <div class="extras">
            <p class="extras__titulo">También puedo:</p>
            <ul class="extras__lista">
              ${rubro.extras.map((extra) => `<li><i class="ph ph-plus" aria-hidden="true"></i>${escapar(extra)}</li>`).join("\n              ")}
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Pasos en la columna del margen + precio como nota pegada -->
    <section class="seccion pasos" id="proceso">
      <div class="contenedor pasos__grid">
        <div>
          <h2 class="seccion__titulo">Empezar es fácil</h2>
          <ol class="turnos">
            <li class="turno">
              <span class="turno__num" aria-hidden="true">1</span>
              <h3>Me cuentas cómo trabajas hoy</h3>
              <p>30 minutos por WhatsApp o videollamada, gratis.</p>
            </li>
            <li class="turno">
              <span class="turno__num" aria-hidden="true">2</span>
              <h3>Te muestro cómo quedaría</h3>
              <p>Lo ves funcionando antes de pagar, con precio cerrado por escrito.</p>
            </li>
            <li class="turno">
              <span class="turno__num" aria-hidden="true">3</span>
              <h3>Lo implemento y me quedo contigo</h3>
              <p>Paso tu Excel al sistema, capacito a tu equipo y sigo disponible.</p>
            </li>
          </ol>
        </div>

        <aside class="precio" id="precio" aria-labelledby="precioTitulo">
          <span class="cinta cinta--centro" aria-hidden="true"></span>
          <p class="precio__label" id="precioTitulo">Planes desde</p>
          <p class="precio__valor">S/ 90 <span>al mes</span></p>
          <p class="precio__nota">El precio final depende de lo que necesite tu negocio. Te lo doy cerrado y por escrito después de la primera conversación.</p>
          ${notaPrecio(rubro)}
          ${botonWhatsapp(rubro, "precio")}
        </aside>
      </div>
    </section>

    <!-- Cómo se ve: la vista del sistema como papel pegado -->
    <section class="seccion sistema" id="sistema">
      <div class="contenedor sistema__grid">
        <div class="sistema__intro">
          <h2 class="seccion__titulo">Así se ve tu negocio en limpio</h2>
          <p class="seccion__sub">Lo que hoy anotas a mano queda ordenado en un solo lugar. Lo amarillo es lo que se hizo solo.</p>
          <p class="sistema__aviso"><i class="ph ph-info" aria-hidden="true"></i> Ejemplo con datos ficticios.</p>
        </div>
        ${hojaSistema(rubro)}
      </div>
    </section>

    <!-- Preguntas frecuentes como renglones -->
    <section class="seccion faq" id="preguntas">
      <div class="contenedor faq__grid">
        <h2 class="seccion__titulo">Lo que casi todos me preguntan</h2>
        <div class="faq__lista">
          ${PREGUNTAS.map(
            ([pregunta, respuesta]) => `<details>
            <summary>${escapar(pregunta)}<i class="ph ph-plus" aria-hidden="true"></i></summary>
            <p>${escapar(respuesta)}</p>
          </details>`,
          ).join("\n          ")}
        </div>
      </div>
    </section>

    <!-- Otros rubros: el índice del cuaderno -->
    <section class="seccion rubros" id="rubros">
      <div class="contenedor rubros__grid">
        <div class="rubros__intro">
          <h2 class="seccion__titulo">¿Tienes otro negocio?</h2>
          <p class="seccion__sub">Toca el tuyo y mira lo que haría por tu negocio.</p>
          <a class="enlace-mano" href="/"><span>Ir a la portada</span> <i class="ph ph-arrow-up-right" aria-hidden="true"></i></a>
        </div>
        <ul class="indice">
          ${indiceRubros(rubro)}
        </ul>
      </div>
    </section>

    <!-- Cierre: la tapa del cuaderno -->
    <section class="tapa final" id="contacto">
      <div class="contenedor final__fila">
        <h2 class="final__titulo">Cuéntame cómo trabajas hoy.</h2>
        <div class="final__accion">
          <p class="final__sub">Escríbeme y lo vemos juntos. Te respondo hoy mismo. La primera conversación es gratis y sin compromiso.</p>
          ${botonWhatsapp(rubro, "final", "btn btn--etiqueta btn--grande")}
        </div>
      </div>
    </section>
  </main>

  <footer class="pie">
    <div class="contenedor pie__fila">
      <div>
        <a href="/" class="logo logo--claro" aria-label="Abiel, ir a la portada">
          ${LOGO_CLARO}
          <span class="logo__texto">Abiel</span>
        </a>
        <p class="pie__frase">Automatizo el trabajo manual y repetitivo de negocios peruanos.</p>
      </div>
      <nav class="pie__enlaces" aria-label="Pie de página">
        <a href="/">Portada</a>
        <a href="/#rubros">Todos los rubros</a>
        <a href="#precio">Precio</a>
        <a href="#preguntas">Preguntas</a>
      </nav>
      <div class="pie__contacto">
        <a href="https://wa.me/${WHATSAPP}" data-cta="pie-${rubro.slug}" target="_blank" rel="noopener">+51 913 412 590</a>
        <span>Lima, Perú</span>
      </div>
    </div>
    <p class="pie__legal contenedor">© <span id="anio">2026</span> Abiel</p>
  </footer>

  <a class="fab" id="fab" data-cta="flotante-${rubro.slug}" href="${escapar(enlaceWhatsapp(rubro.whatsapp))}" target="_blank" rel="noopener" aria-label="Escríbeme por WhatsApp">
    <i class="ph-fill ph-whatsapp-logo" aria-hidden="true"></i>
  </a>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" defer></script>
  <script src="/rubro.js" defer></script>
</body>
</html>
`;

for (const rubro of rubros) {
  const carpeta = join(RAIZ, rubro.slug);
  mkdirSync(carpeta, { recursive: true });
  writeFileSync(join(carpeta, "index.html"), pagina(rubro), "utf-8");
}

// El sitemap sale de rubros.json: no depende del HTML de la portada.
const urls = [`${SITIO}/`, ...rubros.map((r) => `${SITIO}/${r.slug}/`)];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url>\n    <loc>${url}</loc>\n    <lastmod>${FECHA}</lastmod>\n  </url>`).join("\n")}
</urlset>
`;
writeFileSync(join(RAIZ, "sitemap.xml"), sitemap, "utf-8");

console.log(`Generadas ${rubros.length} páginas de rubro y sitemap.xml con ${urls.length} direcciones.`);
