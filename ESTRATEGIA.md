# Estrategia comercial de la landing Yanapay.tech

Fecha: 2026-09-19. Ver en local: `docker compose up -d` → http://localhost:8080

## 1. La idea central

El cliente no compra "software". Compra **dejar de perder plata y tiempo**.
La landing no debe explicar qué es un sistema: debe hacer que el dueño diga
"eso me pasa a mí" y escriba por WhatsApp.

Regla de copy: **nunca** "sistema, módulo, CRM, ERP, API" en titulares.
Sí: "quién te debe", "cuánto vendiste hoy", "se te acabó el stock", "boletas", "cobrar".

## 2. Mercado (Lima / Perú)

| Dato | Uso en la landing |
|---|---|
| 2.47 millones de MYPE formales (Produce, feb-2026) | Mercado enorme; hablarle a la MYPE, no a la corporación |
| Desde 1-jun-2026 SUNAT hace emisor electrónico a todo RUC nuevo (R.S. 000075-2026) | Gancho de urgencia: "¿Tus boletas y facturas ya salen solas?" |
| WhatsApp: ~94 % de smartphones en Perú | Todo CTA termina en WhatsApp con mensaje ya escrito |
| Competencia: SaaS baratos (Nubefact, OkFac, Facturalaya) | No pelear por precio de facturador. Diferencial: **se adapta a cómo ya trabajas** + cobranza + reportes |

Dolores más frecuentes (lenguaje del cliente):

1. "No sé quién me debe" → cuentas por cobrar, cobranza por WhatsApp.
2. "Todo está en Excel y cada uno tiene su versión" → un solo lugar, desde el celular.
3. "No sé cuánto gano de verdad" → reporte del día / mes en el celular.
4. "Se me acaba el stock o me roban y no me entero" → inventario con alertas.
5. "Pierdo tiempo haciendo boletas/facturas a mano" → SUNAT automático.

### Nichos recomendados (orden de ataque)

1. **Colegios, nidos y academias** — pensiones morosas. Dolor de cobranza muy claro, pagan mensual.
2. **Clínicas dentales y consultorios** — citas, pacientes que no vuelven, deudas de tratamientos.
3. **Distribuidoras y ferreterías** — crédito a clientes, stock, facturas.
4. **Condominios / administradoras** — cobro de mantenimiento.

Elegir **uno** como protagonista del hero y dejar los demás en el selector de dolores.

## 3. Diagnóstico de la landing actual

Bien: hero habla del dolor ("¿Sigues con Excel y cuadernos?"), CTA WhatsApp flotante.

Mal (ordenado por impacto):

1. **Casos con placeholders** (`[Nombre del negocio]`) → destruyen confianza. Llenar con reales o quitar.
2. **Tabs por rubro** obligan a clasificarse; mejor empezar por el dolor.
3. **Imágenes pesadas**: `foto_portda.png` 7 MB, `foto_perfil_2.png` 3 MB → celular con datos se va.
4. **Cero SEO técnico**: sin Open Graph, sin schema, sin sitemap, sin analítica.
5. Sin precio de referencia ni garantía → el dueño asume "esto es caro, no es para mí".

## 4. Estructura propuesta (una sola página)

1. **Hero**: titular de dolor + mockup animado en celular: notificación "Te deben S/ 12,450 — 8 clientes" y botón "Cobrar por WhatsApp". CTA: "Quiero ver mi negocio así".
2. **"¿Cuál de estos te pasa?"**: 6 tarjetas de dolor clicables. Las que marca arman el mensaje de WhatsApp ("Hola, me pasa: no sé quién me debe, todo está en Excel"). Es el elemento que convierte.
3. **Antes / Después**: slider arrastrable; izquierda un Excel desordenado, derecha el panel limpio. Animado con GSAP al hacer scroll.
4. **Lo que ganas** (resultados, no funciones): "Cobras a tiempo", "Ves tu caja desde el celular", "Boletas SUNAT solas", "Alertas de stock".
5. **Casos reales** (solo si hay datos reales; 1 caso real vale más que 3 inventados).
6. **Quién te atiende**: foto de Christian + 3 líneas. En Perú se compra a personas: "Hablas directo con quien construye tu sistema".
7. **Cómo trabajamos + oferta**: diagnóstico gratis 30 min → propuesta en 48 h → primera versión en X semanas. "Desde S/ ___" o "planes mensuales desde S/ ___". Garantía simple.
8. **Preguntas frecuentes**: "¿Necesito saber de computación?", "¿Funciona en celular?", "¿Mis datos de Excel se pierden?", "¿Cuánto cuesta?". Sirve para SEO.
9. **CTA final + WhatsApp flotante**.

### Animación (sin volver lenta la página)

- GSAP ya está: contador de soles que sube, celdas de Excel que "vuelan" y se ordenan en el panel, tarjetas de dolor con entrada escalonada.
- Respetar `prefers-reduced-motion`. En móvil, animaciones cortas (≤ 400 ms).

### Fotos

- Christian: solo en "Quién te atiende" (no en el hero; el hero es del cliente).
- Negocio: foto real de un mostrador/consultorio limeño con alguien usando celular o tablet. Evitar stock gringo.

## 5. SEO

Una landing de una sola página posiciona poco por sí sola; el SEO aquí es **local + técnico + anuncios**.

Técnico (se hace en el código):

1. `title` y `description` con palabra clave + Lima/Perú.
2. Open Graph + imagen 1200×630 (se ve bonito al compartir por WhatsApp).
3. JSON-LD: `ProfessionalService` (Lima, teléfono, horario) + `FAQPage`.
4. Imágenes WebP < 200 KB, `loading="lazy"`, `width/height` fijos.
5. `robots.txt`, `sitemap.xml`, canonical, dominio `yanapay.tech` en Search Console.

Palabras clave objetivo (intención de compra):

- "sistema de cobranza para colegios", "software para colegios Lima"
- "software para clínica dental Perú", "sistema de citas consultorio"
- "control de inventario ferretería", "sistema de ventas con facturación electrónica"
- "pasar Excel a sistema", "cuentas por cobrar Excel"

Fuera del código (lo que más clientes trae al inicio):

1. **Perfil de Empresa en Google** (Google Maps) con reseñas.
2. Google Ads a esas palabras clave, S/ 15–30 por día, enviando a la landing.
3. Medir: GA4 + evento en cada clic de WhatsApp (saber qué dolor convierte).

## 6. Competencia revisada (sep-2026)

- **Facturalaya**: mejor referente local. Dolores concretos, precios visibles (S/ 97-139/mes), todo CTA a WhatsApp.
- **Bsale / OkFac**: contadores de clientes, casos con nombre, OkFac muestra precios (S/ 140-350/mes).
- **Doctocliq** (dental): muchos testimonios con foto y cifra de resultado.
- **Colegios (SieWeb, JSedu)**: hablan de UGEL/MINEDU; la morosidad de pensiones no es protagonista. **Hueco para Yanapay.**
- Referencia de precio a medida en Lima (Metasoft): web app con panel desde S/ 12,000.

## 7. Lo que se construyó (v2)

Hero con celular animado (cobranza que se cobra sola), franja "se conecta con", selector de dolores que arma el WhatsApp,
antes/después arrastrable (Excel vs sistema), resultados con mini pantallas, calculadora "¿cuánto te cuesta el Excel?",
rubros deslizables, "quién te atiende", pasos, FAQ (con schema), CTA final. SEO: title, OG + `assets/og.jpg`, JSON-LD,
`robots.txt`, `sitemap.xml`. Cada clic a WhatsApp envía el evento `click_whatsapp` a `dataLayer` (listo para GA4/GTM).

## 8. Lo que falta decidir (Christian)

1. Nicho protagonista del hero.
2. Casos reales: nombre (o rubro), antes/después y una cifra.
3. Precio "desde" o rango, y si habrá plan mensual.
4. Foto de negocio real.
5. ¿Se mantiene el formulario o solo WhatsApp?

## Fuentes

- [Produce — Estadística MIPYME](https://ogeiee.produce.gob.pe/index.php/en/shortcode/estadistica-oee/estadisticas-mipyme)
- [La República — MYPE generan más de 10 millones de empleos (2026)](https://especial.larepublica.pe/valor-agregado/2026/05/15/mypes-en-peru-mas-de-24-millones-de-empresas-impulsan-el-empleo-y-la-economia-1383550)
- [Gestión — emisión electrónica obligatoria desde el primer día](https://gestion.pe/economia/sunat-nuevos-contribuyentes-tendran-emision-electronica-obligatoria-desde-el-primer-dia-noticia/)
- [SUNAT — modifica normativa de emisores electrónicos](https://www.gob.pe/institucion/sunat/informes-publicaciones/8079009-sunat-modifica-normativa-sobre-emisores-electronicos-y-uso-del-sire)
- [AnswerForMe — WhatsApp Business en Lima 2026](https://answerforme.io/en/blog/whatsapp-business-lima-guide-2026)

## 9. Plan de prueba social (sin inventar nada)

1. **Clientes fundadores**: los primeros 3 a 5 negocios reciben precio de lanzamiento a cambio de testimonio con nombre, rubro, distrito y foto.
2. **Medir antes de entregar**: anotar con el cliente cuántas horas o soles pierde hoy (usar la calculadora). A los 30 días, medir de nuevo. Esa cifra es el caso.
3. **Pedir reseña en Google** apenas el cliente esté contento (Perfil de Empresa en Google).
4. Recién con 2 casos reales se agrega la sección "Negocios que ya lo usan" debajo del antes/después.

## 10. Cambios v3 (largo y orden)

- Se quitó "Lo que cambia en tu día a día" (repetía el antes/después): 13.7 → 11 pantallas en celular.
- Rubros pasan justo después del hero ("¿Qué negocio tienes?"); se sumaron veterinarias, spas/barberías y gimnasios (9 rubros).
- Precio visible: **planes desde S/ 90 al mes**, con gancho SUNAT (emisión electrónica desde el RUC, junio 2026).
- Celular: tarjetas de dolores, pasos y foto más compactos.
