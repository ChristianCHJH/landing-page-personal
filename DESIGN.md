---
name: Abiel
description: Portada con fotos de emprendedores urbanos del Perú; las fotos mandan y la interfaz se retira. Un solo acento, el verde de WhatsApp.
colors:
  tinta: "#141210"
  tinta-2: "#2a2622"
  papel: "#f4f1ea"
  papel-2: "#e9e4da"
  blanco: "#ffffff"
  suave-claro: "#ebe5da"
  suave-oscuro: "#5b544b"
  wa: "#25d366"
  wa-hover: "#3be07a"
  wa-texto: "#062a14"
  wa-tinta: "#0b6b32"
  ok: "#1d7a43"
  pronto: "#9a5a00"
  tarde: "#b8322a"
  resalte: "#f4dc6b"
  boli: "#2b2724"
  boli-rojo: "#c0362c"
typography:
  titular-inicio:
    fontFamily: "Bricolage Grotesque, Bricolage Estrecha Fallback, sans-serif"
    fontSize: "clamp(2.5rem, 11.4vw, 6.2rem)"
    fontWeight: 780
    lineHeight: 0.98
    letterSpacing: "-0.02em"
    fontVariation: "\"wdth\" 80, \"opsz\" 96"
  frase-dolor:
    fontFamily: "Bricolage Grotesque, Bricolage Estrecha Fallback, sans-serif"
    fontSize: "clamp(2.1rem, 10vw, 5.4rem)"
    fontWeight: 750
    lineHeight: 1.02
    fontVariation: "\"wdth\" 80, \"opsz\" 96 (86 en escritorio)"
  titular-seccion:
    fontFamily: "Bricolage Grotesque, Bricolage Estrecha Fallback, sans-serif"
    fontSize: "clamp(2rem, 7.4vw, 3.6rem)"
    fontWeight: 750
    lineHeight: 1.02
    letterSpacing: "-0.025em"
    fontVariation: "\"wdth\" 82, \"opsz\" 96"
  boton:
    fontFamily: "Bricolage Grotesque, Bricolage Boton Fallback, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    fontVariation: "\"wdth\" 92"
  cuerpo:
    fontFamily: "Bricolage Grotesque, Bricolage Fallback, sans-serif"
    fontSize: "1rem a 1.0625rem"
    fontWeight: 400
    lineHeight: 1.45
  mano:
    fontFamily: "Kalam, Kalam Fallback, cursive"
    uso: "solo la libreta «Hoy» de la comparativa"
rounded:
  boton: "14px"
  chip: "999px"
  caso: "14px"
  libreta: "22px"
  telefono: "42px (pantalla 33px)"
components:
  wa: "Botón verde de WhatsApp: alto 56px, radio 14px, fondo wa, texto wa-texto, ícono 1.6rem. Único botón de acción de la página."
  chip: "Rubro sobre la foto: alto 40px, píldora, borde blanco 34 %, fondo tinta 46 % con desenfoque; el elegido va en blanco con barra de avance verde."
  pausa: "Botón redondo de 36px para pausar las fotos que se turnan."
  velo: "Degradado de tinta arriba y abajo de cada foto para que el texto blanco se lea."
  comparar: "Comparativa con divisor arrastrable: libreta «Hoy» (Kalam) a la izquierda y celular «Con Abiel» a la derecha, más botones Hoy / Con Abiel."
  caso: "Captura entera sobre papel, radio 14px, con Antes / Ahora y resaltador amarillo."
  precio: "Fondo tinta, «Desde S/ 90 al mes» con subrayado verde, nota y botón de WhatsApp."
---

# Design System: Abiel

## Overview

Una sola página, oscura arriba y clara en el medio:

1. **Primera pantalla:** fotos de emprendedores urbanos trabajando a mano (Excel, cobro, boleta, almacén) que se turnan de fondo, el titular «Deja de hacer a mano lo que se repite en tu negocio.», las cuatro tareas y el botón de WhatsApp.
2. **¿Qué negocio tienes?:** una foto por rubro con su dolor en una frase grande; los chips eligen el rubro y cambian el mensaje de WhatsApp.
3. **Comparativa Hoy / Con Abiel:** la libreta a mano frente al celular con el sistema, con datos ficticios rotulados.
4. **Casos reales:** inmobiliaria (video del plano), movilidad escolar y tienda, con capturas de ejemplo.
5. **Precio:** desde S/ 90 al mes y WhatsApp.

Archivos: `index.html`, `estilos.css`, `datos.js` (rubros, dolores, mensajes y escenas), `app.js`. Fotos en `assets/fotos/` (créditos en `assets/fotos/CREDITOS.md`), capturas en `assets/casos/`. El prototipo que dio origen queda en `.impeccable/mocks/fotos/`.

## Reglas

- **Las fotos mandan:** fondo a sangre con velo de tinta; la interfaz es blanca y mínima encima. Nada de tarjetas ni adornos sobre las fotos.
- **Un solo acento:** el verde de WhatsApp, y solo en lo que lleva a WhatsApp o marca progreso.
- **Fotos:** emprendedores urbanos o lugares de trabajo; nunca se presentan como clientes ni llevan el nombre de un negocio real.
- **Capturas de interfaz siempre enteras:** nunca recortadas por `object-fit: cover` ni tapadas; en celular se usa un recorte propio que se lea (como `inmobiliaria-plano-movil.webp`).
- **Datos ficticios rotulados:** la comparativa y los casos dicen «datos ficticios» o «datos de ejemplo».
- **Movimiento reducido:** todo el contenido queda visible (nada depende de una animación para aparecer). Las fotos siguen avanzando solas, pero con fundido y sin zoom; la entrada del titular es un fundido; el video no arranca solo.
- **Sin saltos al cargar:** las fuentes de respaldo de `estilos.css` imitan las medidas de Bricolage y Kalam, los anchos de lectura van en `em` (no en `ch`) y los íconos reservan 1em. Si se cambia una fuente o un tamaño, hay que volver a medir el CLS.
- **WhatsApp:** todos los botones van a `https://wa.me/51913412590` con mensaje; el del rubro elegido usa el mensaje de ese rubro (`datos.js`).
