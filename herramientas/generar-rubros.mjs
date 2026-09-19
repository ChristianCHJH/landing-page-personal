import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { celular, tablet, escapar } from "./dispositivos.mjs";

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITIO = "https://landing-page-personal-kappa.vercel.app";
const WHATSAPP = "51913412590";
const FECHA = new Date().toISOString().slice(0, 10);
const dispositivos = JSON.parse(readFileSync(join(RAIZ, "herramientas", "dispositivos.json"), "utf-8"));
const rubros = JSON.parse(readFileSync(join(RAIZ, "herramientas", "rubros.json"), "utf-8")).map((rubro) => {
  if (!dispositivos[rubro.slug]) throw new Error(`Faltan pantallas para ${rubro.slug}`);
  return { ...rubro, dispositivos: dispositivos[rubro.slug] };
});

const enlaceWhatsapp = (mensaje) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensaje)}`;

const botonWhatsapp = (rubro, cta, clases = "btn btn--primary") => `<a class="${clases}" data-cta="${cta}-${rubro.slug}" href="${escapar(enlaceWhatsapp(rubro.whatsapp))}" target="_blank" rel="noopener">
            <i class="ph-fill ph-whatsapp-logo" aria-hidden="true"></i>
            Escríbenos por WhatsApp
          </a>`;

const pestañasProblema = (rubro) => `<div class="problems" role="tablist" aria-label="Problemas que resolvemos">
            ${rubro.dispositivos.celular.escenas
              .map(
                (escena, i) => `<button type="button" role="tab" class="problem${i === 0 ? " is-on" : ""}" aria-selected="${i === 0}" data-quote="${escapar(rubro.soluciones[i][0])}">
              <i class="ph ph-${rubro.soluciones[i][2]}" aria-hidden="true"></i>${escapar(escena.problema)}
            </button>`,
              )
              .join("\n            ")}
          </div>
          <p class="problems__quote" aria-live="polite">“${escapar(rubro.soluciones[0][0])}”</p>`;

const solucion = ([dolor, respuesta, icono]) => `<li class="fix">
            <p class="fix__pain">“${escapar(dolor)}”</p>
            <div class="fix__answer">
              <span class="fix__icon"><i class="ph ph-${icono}" aria-hidden="true"></i></span>
              <p>${escapar(respuesta)}</p>
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
          areaServed: [{ "@type": "City", name: "Lima" }, { "@type": "Country", name: "Perú" }],
          provider: { "@type": "ProfessionalService", "@id": `${SITIO}/#negocio`, name: "Yanapay", telephone: "+51913412590" },
          offers: { "@type": "Offer", priceCurrency: "PEN", price: "90", description: "Planes desde S/ 90 al mes" },
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Yanapay", item: `${SITIO}/` },
            { "@type": "ListItem", position: 2, name: rubro.nombre, item: `${SITIO}/${rubro.slug}/` },
          ],
        },
      ],
    },
    null,
    2,
  );

const otrosRubros = (actual) =>
  rubros
    .filter((r) => r.slug !== actual.slug)
    .map((r) => `<a class="other" href="/${r.slug}/"><i class="ph ph-${r.icono}" aria-hidden="true"></i>${escapar(r.nombre)}</a>`)
    .join("\n          ");

const pagina = (rubro) => `<!DOCTYPE html>
<html lang="es-PE">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <title>${escapar(rubro.titulo)}</title>
  <meta name="description" content="${escapar(rubro.descripcion)}" />
  <link rel="canonical" href="${SITIO}/${rubro.slug}/" />
  <meta name="robots" content="index, follow" />
  <meta name="theme-color" content="#F5F5F2" media="(prefers-color-scheme: light)" />
  <meta name="theme-color" content="#111214" media="(prefers-color-scheme: dark)" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="es_PE" />
  <meta property="og:site_name" content="Yanapay" />
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
  <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=Onest:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/regular/style.css" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/fill/style.css" />
  <link rel="stylesheet" href="/style.css" />
  <script type="application/ld+json">
${datosEstructurados(rubro)}
  </script>
</head>
<body class="page-rubro">
  <a class="skip" href="#contenido">Saltar al contenido</a>

  <header class="nav" id="nav">
    <div class="container nav__inner">
      <a href="/" class="logo" aria-label="Yanapay, ir al inicio">
        <span class="logo__mark" aria-hidden="true">Y</span>
        <span class="logo__text">Yanapay</span>
      </a>
      <nav class="nav__links" aria-label="Principal">
        <a href="#solucion">Lo que hacemos</a>
        <a href="#precio">Precio</a>
        <a href="/#rubros">Otros rubros</a>
      </nav>
      ${botonWhatsapp(rubro, "nav", "btn btn--primary btn--sm nav__cta")}
      <button class="nav__burger" id="burger" aria-label="Abrir menú" aria-expanded="false" aria-controls="menuMovil">
        <i class="ph ph-list" aria-hidden="true"></i>
      </button>
    </div>
    <div class="nav__mobile" id="menuMovil" hidden>
      <a href="#solucion">Lo que hacemos</a>
      <a href="#precio">Precio</a>
      <a href="/#rubros">Otros rubros</a>
    </div>
  </header>

  <main id="contenido">
    <section class="hero" id="inicio">
      <div class="container hero__grid">
        <div class="hero__copy">
          <p class="hero__pill"><i class="ph ph-${rubro.icono}" aria-hidden="true"></i> ${escapar(rubro.pill)}</p>
          <h1 class="hero__title hero__title--rubro">${escapar(rubro.gancho)}</h1>
          <p class="hero__sub">${escapar(rubro.sub)}</p>
          <div class="hero__ctas">
            ${botonWhatsapp(rubro, "hero", "btn btn--primary btn--lg")}
            <a class="btn btn--ghost btn--lg" href="#solucion">Ver lo que hacemos</a>
          </div>
        </div>

        <div class="hero__visual hero__visual--devices">
          <div class="devices">
            <div class="devices__stage">
          ${tablet(rubro)}
          ${celular(rubro)}
            </div>
          </div>
          ${pestañasProblema(rubro)}
        </div>
      </div>
    </section>

    <section class="section fixes" id="solucion">
      <div class="container">
        <h2 class="section__title">Lo que te resolvemos</h2>
        <p class="section__sub">Tres cosas puntuales. Lo demás lo vemos juntos, según cómo trabajas.</p>
        <ol class="fixes__list">
          ${rubro.soluciones.map(solucion).join("\n          ")}
        </ol>
        <div class="extras">
          <p class="extras__label">También podemos:</p>
          <ul class="extras__list">
            ${rubro.extras.map((extra) => `<li>${escapar(extra)}</li>`).join("\n            ")}
          </ul>
        </div>
      </div>
    </section>

    <section class="section steps" id="proceso">
      <div class="container">
        <h2 class="section__title">Empezar es fácil</h2>
        <ol class="steps__list">
          <li class="step">
            <span class="step__icon"><i class="ph ph-chats-circle" aria-hidden="true"></i></span>
            <h3>Conversamos 30 minutos</h3>
            <p>Por WhatsApp o videollamada, gratis. Me cuentas cómo trabajas hoy y qué te quita tiempo.</p>
          </li>
          <li class="step">
            <span class="step__icon"><i class="ph ph-presentation-chart" aria-hidden="true"></i></span>
            <h3>Te mostramos cómo quedaría</h3>
            <p>Ves tu sistema antes de pagar nada, con un precio cerrado por escrito.</p>
          </li>
          <li class="step">
            <span class="step__icon"><i class="ph ph-rocket-launch" aria-hidden="true"></i></span>
            <h3>Lo usas y te acompañamos</h3>
            <p>Pasamos tu Excel al sistema, capacitamos a tu equipo y seguimos disponibles.</p>
          </li>
        </ol>

        <div class="price" id="precio">
          <div class="price__main">
            <p class="price__label">Planes desde</p>
            <p class="price__value">S/ 90 <span>al mes</span></p>
            <p class="price__note">El precio final depende de lo que necesite tu negocio. Te lo damos cerrado y por escrito después de la primera conversación.</p>
          </div>
          <div class="price__side">
            ${rubro.nota ? `<p class="price__sunat"><i class="ph-fill ph-warning-circle" aria-hidden="true"></i><span>${escapar(rubro.nota)}</span></p>` : `<p class="price__sunat price__sunat--ok"><i class="ph-fill ph-seal-check" aria-hidden="true"></i><span>Hablas directo con quien construye tu sistema. Sin call center y sin palabras raras.</span></p>`}
            ${botonWhatsapp(rubro, "precio")}
          </div>
        </div>
      </div>
    </section>

    <section class="final" id="contacto">
      <div class="container final__inner">
        <h2 class="final__title">Cuéntanos cómo trabajas hoy.</h2>
        <p class="final__sub">Te respondemos hoy mismo. La primera conversación es gratis y sin compromiso.</p>
        ${botonWhatsapp(rubro, "final", "btn btn--light btn--lg")}
      </div>
    </section>

    <section class="section others" aria-label="Otros rubros">
      <div class="container">
        <p class="others__label">También trabajamos con</p>
        <div class="others__list">
          ${otrosRubros(rubro)}
        </div>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="container footer__inner">
      <div>
        <a href="/" class="logo">
          <span class="logo__mark" aria-hidden="true">Y</span>
          <span class="logo__text">Yanapay</span>
        </a>
        <p class="footer__tag">Sistemas a la medida para negocios peruanos.</p>
      </div>
      <nav class="footer__links" aria-label="Pie de página">
        <a href="/">Inicio</a>
        <a href="/#rubros">Rubros</a>
        <a href="/#preguntas">Preguntas</a>
      </nav>
      <div class="footer__contact">
        <a href="https://wa.me/${WHATSAPP}" target="_blank" rel="noopener">+51 913 412 590</a>
        <span>Lima, Perú</span>
      </div>
    </div>
    <p class="footer__legal container">© <span id="anio">2026</span> Yanapay</p>
  </footer>

  <a class="fab" id="fab" data-cta="flotante-${rubro.slug}" href="${escapar(enlaceWhatsapp(rubro.whatsapp))}" target="_blank" rel="noopener" aria-label="Escríbenos por WhatsApp">
    <i class="ph-fill ph-whatsapp-logo" aria-hidden="true"></i>
  </a>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" defer></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" defer></script>
  <script src="/main.js" defer></script>
</body>
</html>
`;

const tarjetaRubro = (rubro) => `<a class="rubro-chip" href="/${rubro.slug}/">
            <i class="ph ph-${rubro.icono}" aria-hidden="true"></i>
            <span>${escapar(rubro.nombre)}</span>
            <i class="ph ph-arrow-right rubro-chip__go" aria-hidden="true"></i>
          </a>`;

for (const rubro of rubros) {
  const carpeta = join(RAIZ, rubro.slug);
  mkdirSync(carpeta, { recursive: true });
  writeFileSync(join(carpeta, "index.html"), pagina(rubro), "utf-8");
}

const inicio = readFileSync(join(RAIZ, "index.html"), "utf-8");
const marcaInicio = '<div class="rubro-grid">';
const desde = inicio.indexOf(marcaInicio);
const hasta = desde === -1 ? -1 : inicio.indexOf("</div>", desde + marcaInicio.length);
if (desde === -1 || hasta === -1) throw new Error("No se encontró la grilla de rubros en index.html");
const grilla = `${marcaInicio}\n          ${rubros.map(tarjetaRubro).join("\n          ")}\n        `;
writeFileSync(join(RAIZ, "index.html"), inicio.slice(0, desde) + grilla + inicio.slice(hasta), "utf-8");

const urls = [`${SITIO}/`, ...rubros.map((r) => `${SITIO}/${r.slug}/`)];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url>\n    <loc>${url}</loc>\n    <lastmod>${FECHA}</lastmod>\n  </url>`).join("\n")}
</urlset>
`;
writeFileSync(join(RAIZ, "sitemap.xml"), sitemap, "utf-8");

console.log(`Generadas ${rubros.length} páginas de rubro, grilla de inicio y sitemap.`);
