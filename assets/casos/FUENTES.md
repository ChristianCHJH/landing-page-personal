# Procedencia del material de casos

Todo se generó el 17/10/2026 con capturas de Playwright (Chrome local) y scripts que viven en `C:\Users\Christian\Proyectos\yanapay-videos` (fuera de este repositorio). Los repositorios de origen no se modificaron: los datos se cambiaron solo **durante la captura** (interceptando la respuesta HTML o la API, o inyectando JS en la página abierta).

Scripts (carpeta `yanapay-videos/capturas/`):

| Script | Qué hace |
|---|---|
| `lib-inmo.mjs` | Servidor estático de solo lectura para `inmobiliaria/6-prototipo/demo` (puerto 8917) y función `transformar()`, que reemplaza los datos en la respuesta HTML vía `page.route` |
| `capturar-inmobiliaria.mjs` | Imagen fija del plano y fotogramas del clip |
| `capturar-movilidad.mjs` + `componer-movilidad.mjs` | Pantallas del padre y composición en tres teléfonos |
| `capturar-tienda.mjs` | Catálogo web con la API interceptada |
| `a-webp.mjs` | Conversión a WebP 1200x900 con `sharp` (calidad 80, lanczos3) |

Todos se ejecutan con `node run.mjs capturas/<script>.mjs` desde `yanapay-videos`.

## inmobiliaria.webp (1200x900, 96 KB)

- **Fuente:** `inmobiliaria/6-prototipo/demo/01-horizonte.html`, pantalla «Plano de lotes» coloreada por estado de venta. Captura a 1440x1080 @1,5x, reducida a 1200x900.
- **Datos reemplazados durante la captura:**
  - Nombre del proyecto «Mirador Chancay» → «Lomas del Sol» (selector y rótulo del plano).
  - Rótulos del entorno «FUTURO HOTEL RESORT» → «ZONA DE EXPANSIÓN», «PLAYA CHACRA Y MAR» → «VÍA PRINCIPAL», «ÁREA VERDE — MIRADOR» → «ÁREA VERDE».
  - «Club House IBL» → «Club House»; «IBL INMOBILIARIA S.A.C.» → «INVERSIONES ANDINAS S.A.C.».
  - Usuaria «Lucía Bendezú» (LB) → «Ana Torres» (AT).
  - Cualquier `DNI ########` → código de contrato; cualquier `RUC ###########` → `RUC XXXXXXXXXXX`; teléfonos `9## ### ###` → `9XX XXX XXX`.
  - Se ocultó la nota de la leyenda «El color de un lote disponible está pendiente de definir con ustedes» (era texto de presentación al cliente).
- La marca que se ve es la marca demo **HORIZONTE** que ya traen los prototipos. No se usaron las láminas de `6-prototipo/capturas/`.

## movilidad.webp (1200x900, 49 KB)

- **Fuente:** `movilidad_escolar/diseno/movilidad-escolar-prototipo.html` (lienzo de diseño). Del artboard «Fusión · Padre · En ruta» (`FusionPadreEnRuta.dc.html`) se extrajo el `srcdoc` ya renderizado por el lienzo y se abrió solo a 390x844 @2x. Los `.dc.html` sueltos no funcionan solos porque falta `support.js`.
- **Estados capturados** (clic en la tarjeta de aviso): «El bus llega a tu casa en 3 minutos» → «Mateo ya está en el bus» → «Mateo llegó al colegio».
- **Composición:** tres teléfonos (marco dibujado en CSS) centrados sobre fondo `#F7F9FC`, render a 1200x900 @2x y reducción a 1200x900.
- **Datos reemplazados:** se aplica `Rufo Jara` → `Raúl Rojas` y `Jara` → `Rojas` sobre el HTML antes de abrirlo. En esta pantalla no aparece la familia: solo los nombres genéricos del prototipo («Mateo», «Luis, el conductor», colegio «San Andrés»).

## tienda.webp (1200x900, 33 KB)

- **Fuente:** `movilidad_escolar/catalogo-web` (Angular 21) levantado con `npx ng serve --port 4200` y abierto en `/moda-andina/catalogo` a 1200x900 @2x. No se levantó el backend.
- **API interceptada con `page.route`:** `GET /api/tienda/catalogo/moda-andina`, `/etiquetas` y `/productos?page=1&limit=24`. Responden con una tienda de ejemplo, «Moda Andina» (dirección genérica «Av. Principal 123 · Galería Central, tienda 12», teléfono `900000000`, que solo va en el enlace de WhatsApp), 3 etiquetas y 8 productos de ropa con precios en S/.
- **Fotos de producto:** ilustraciones SVG planas generadas en `capturar-tienda.mjs` (polo, polera, jean, casaca, vestido, short, gorra, zapatillas), servidas interceptando `/archivos/demo/*.svg`. No hay fotos de terceros ni de personas, así que no hace falta un archivo de créditos.

## inmobiliaria.mp4 / inmobiliaria.webm (960x720, 30 fps, 7,5 s, sin audio)

- **Proyecto Remotion 4.0.536:** `yanapay-videos`, composición `CasoInmobiliaria` (`src/CasoInmobiliaria.tsx`, 225 fotogramas).
- **Fotogramas de origen** (`yanapay-videos/public/inmo/`, 1440x1080, mismos reemplazos que la imagen fija):
  - `plano-0..6.png`: el plano con los lotes libres I1-26 a I1-31 pasando a separado o financiado uno por uno. Se cambia el `fill` del polígono por JS y se actualizan los contadores de las fichas y de la leyenda (Libres 105→99).
  - `morosos.png`: `03-cobranzas.html`, pestaña «Morosidad». Las filas de `MOROSOS` se reescribieron en la respuesta: 20 nombres inventados, DNI → «Contrato LS-####», teléfono → `9XX XXX X##`, asesores → nombres genéricos, proyecto «El Mirador» → «Los Pinos».
  - `whatsapp.png`: el modal «Recordar» de la primera fila, pestaña «Abrir WhatsApp con el mensaje listo». La cuenta BBVA se muestra como `0011-XXXX-XXXX-0000`.
- **Secuencia:** plano con zoom lento hacia la manzana I1 mientras se pintan los 6 lotes → fundido a morosidad, donde las filas aparecen una a una → aparece el recordatorio de WhatsApp → fundido al primer fotograma del plano, para que el bucle empalme.
- **Comandos:**
  ```
  npx remotion render CasoInmobiliaria out/master.mp4 --codec=h264 --crf=8 --muted
  FF=node_modules/@remotion/compositor-win32-x64-msvc/ffmpeg.exe
  VF="scale=in_range=pc:out_range=tv,format=yuv420p"
  # MP4 (590 KB)
  $FF -i out/master.mp4 -an -vf "$VF" -c:v libx264 -preset veryslow -crf 31 -tune animation -g 300 -profile:v high -color_range tv -movflags +faststart inmobiliaria.mp4
  # WebM VP9 en dos pasadas (570 KB)
  $FF -i out/master.mp4 -an -vf "$VF" -c:v libvpx-vp9 -b:v 620k -pass 1 -passlogfile vp9log -row-mt 1 -deadline good -cpu-used 1 -g 300 -f webm NUL
  $FF -i out/master.mp4 -an -vf "$VF" -c:v libvpx-vp9 -b:v 620k -pass 2 -passlogfile vp9log -row-mt 1 -deadline good -cpu-used 1 -g 300 -auto-alt-ref 1 -lag-in-frames 25 inmobiliaria.webm
  ```
- Se usó CRF 31 en lugar de ~27: con CRF 27 el MP4 pesaba 1,4 MB, por el detalle fino de las líneas del plano. Con CRF 31 queda por debajo del objetivo de 700 KB y el texto sigue legible.
