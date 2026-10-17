---
name: Abiel
description: El cuaderno de cuentas que se pasa en limpio solo. Portada de automatización para negocios pequeños del Perú.
colors:
  cobalto: "#1D3FAE"
  cobalto-osc: "#16318C"
  cobalto-hondo: "#10266E"
  sobre-tapa: "#DDE5FF"
  lapicero: "#1F3FBF"
  lapicero-seco: "#4A5BA8"
  rojo: "#D9312B"
  margen: "#E0605A"
  resaltador: "#FFE14D"
  hoja: "#FAFCFF"
  papel: "#FFFFFF"
  papel-hover: "#EAF0FF"
  cuadro: "#D5E5F5"
  renglon: "#B9D0E8"
  tinta: "#111318"
  tinta-2: "#394150"
  tinta-3: "#586173"
typography:
  display:
    fontFamily: "Archivo, Schibsted Grotesk, sans-serif"
    fontSize: "clamp(2.45rem, 1rem + 4.6vw, 4.75rem)"
    fontWeight: 800
    lineHeight: 1.01
    letterSpacing: "-0.028em"
    fontVariation: "\"wdth\" 110"
  display-cierre:
    fontFamily: "Archivo, Schibsted Grotesk, sans-serif"
    fontSize: "clamp(2.3rem, 1.3rem + 3.8vw, 4.6rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.03em"
    fontVariation: "\"wdth\" 116"
  cifra:
    fontFamily: "Archivo, Schibsted Grotesk, sans-serif"
    fontSize: "clamp(3.2rem, 2.4rem + 3vw, 4.75rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.03em"
    fontFeature: "\"tnum\" 1"
    fontVariation: "\"wdth\" 116"
  headline:
    fontFamily: "Archivo, Schibsted Grotesk, sans-serif"
    fontSize: "clamp(2rem, 1.3rem + 2.6vw, 3.35rem)"
    fontWeight: 800
    lineHeight: 1.04
    letterSpacing: "-0.024em"
    fontVariation: "\"wdth\" 112"
  title:
    fontFamily: "Archivo, Schibsted Grotesk, sans-serif"
    fontSize: "clamp(1.45rem, 1.1rem + 1.2vw, 2rem)"
    fontWeight: 800
    lineHeight: 1.12
    letterSpacing: "-0.016em"
    fontVariation: "\"wdth\" 110"
  title-paso:
    fontFamily: "Archivo, Schibsted Grotesk, sans-serif"
    fontSize: "clamp(1.2rem, 1.05rem + 0.6vw, 1.5rem)"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.01em"
    fontVariation: "\"wdth\" 108"
    fontVariation: "\"wdth\" 120"
  body:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  body-lead:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 1rem + 0.3vw, 1.2rem)"
    fontWeight: 400
    lineHeight: 1.6
  body-limpio:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "clamp(0.98rem, 0.92rem + 0.25vw, 1.06rem)"
    fontWeight: 600
    lineHeight: 1.5
  label:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 700
    lineHeight: 1.2
  caption:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
  mano-titulo:
    fontFamily: "Kalam, Schibsted Grotesk, cursive"
    fontSize: "clamp(1.45rem, 1.15rem + 1vw, 1.9rem)"
    fontWeight: 700
    lineHeight: 1.2
  mano-renglon:
    fontFamily: "Kalam, Schibsted Grotesk, cursive"
    fontSize: "clamp(1.15rem, 1rem + 0.95vw, 1.55rem)"
    fontWeight: 400
    lineHeight: 1.35
  mano-nota:
    fontFamily: "Kalam, Schibsted Grotesk, cursive"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.35
  mano-numero:
    fontFamily: "Kalam, Schibsted Grotesk, cursive"
    fontSize: "2.5rem"
    fontWeight: 700
    lineHeight: 1
rounded:
  cinta: "2px"
  foto: "3px"
  casilla: "4px"
  tag: "6px"
  logo: "8px"
  boton: "10px"
  etiqueta-linea: "12px"
  hoja-incrustada: "14px"
  etiqueta: "18px"
  redondo: "50%"
spacing:
  celda: "24px"
  nav-h: "64px"
  margen-rojo-movil: "20px"
  columna-izq-movil: "40px"
  columna-der-movil: "16px"
  margen-rojo-ancho: "max(28px, calc(50% - 656px))"
  columna-izq-ancho: "max(64px, calc(50% - 600px))"
  columna-der-ancho: "max(32px, calc(50% - 600px))"
  seccion-arriba: "clamp(56px, 6vw, 80px)"
  seccion-abajo: "clamp(40px, 4.5vw, 60px)"
  junto-a-tapa: "clamp(80px, 10vw, 128px)"
  tapa: "clamp(80px, 10vw, 136px)"
components:
  button-primary:
    backgroundColor: "{colors.cobalto}"
    textColor: "{colors.papel}"
    typography: "{typography.label}"
    rounded: "{rounded.boton}"
    padding: "12px 22px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.cobalto-osc}"
    textColor: "{colors.papel}"
  button-primary-grande:
    backgroundColor: "{colors.cobalto}"
    textColor: "{colors.papel}"
    rounded: "{rounded.boton}"
    padding: "16px 28px"
    height: "58px"
  button-primary-chico:
    backgroundColor: "{colors.cobalto}"
    textColor: "{colors.papel}"
    rounded: "{rounded.boton}"
    padding: "9px 16px"
    height: "42px"
  button-etiqueta:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.cobalto-hondo}"
    typography: "{typography.label}"
    rounded: "{rounded.boton}"
    padding: "16px 28px"
    height: "58px"
  button-etiqueta-hover:
    backgroundColor: "{colors.papel-hover}"
    textColor: "{colors.cobalto-hondo}"
  button-sin-tinta:
    textColor: "{colors.lapicero-seco}"
    rounded: "{rounded.boton}"
    padding: "12px 22px"
    height: "48px"
  enlace-mano:
    textColor: "{colors.lapicero}"
    typography: "{typography.mano-nota}"
    padding: "0 4px"
    height: "48px"
  nav-renglon:
    textColor: "{colors.tinta}"
    height: "{spacing.nav-h}"
  nav-renglon-scrolled:
    backgroundColor: "{colors.hoja}"
    textColor: "{colors.tinta}"
  renglon-casilla:
    textColor: "{colors.tinta}"
    padding: "16px 6px 14px"
    height: "60px"
  casilla:
    backgroundColor: "{colors.papel}"
    rounded: "{rounded.casilla}"
    size: "26px"
  renglon-indice:
    textColor: "{colors.tinta}"
    padding: "6px 0"
    height: "54px"
  resaltador:
    backgroundColor: "{colors.resaltador}"
    textColor: "{colors.tinta}"
    padding: "0 0.18em"
  tapa:
    backgroundColor: "{colors.cobalto}"
    textColor: "{colors.papel}"
    padding: "{spacing.tapa} 0"
  contratapa:
    backgroundColor: "{colors.cobalto-hondo}"
    textColor: "{colors.sobre-tapa}"
    padding: "52px 0 28px"
  etiqueta-nombre:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.etiqueta}"
    padding: "26px 26px 28px"
    width: "440px"
  foto-cinta:
    backgroundColor: "{colors.papel}"
    rounded: "{rounded.foto}"
    padding: "10px 10px 12px"
  tarjeta-precio:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.casilla}"
    padding: "38px 28px 28px"
    width: "460px"
  pick:
    backgroundColor: "{colors.hoja}"
    textColor: "{colors.lapicero}"
    rounded: "{rounded.cinta}"
    padding: "10px 6px 10px 10px"
  comparador:
    backgroundColor: "{colors.papel}"
    rounded: "{rounded.hoja-incrustada}"
  comparador-manija:
    backgroundColor: "{colors.cobalto}"
    textColor: "{colors.papel}"
    rounded: "{rounded.redondo}"
    size: "48px"
  fab:
    backgroundColor: "{colors.cobalto}"
    textColor: "{colors.papel}"
    rounded: "{rounded.redondo}"
    size: "58px"
---

# Design System: Abiel

> **Alcance.** Este sistema cubre la portada (`index.html` + `portada.css` + `portada.js`) y las 12 páginas de rubro (`/colegios/`, `/clinicas/`, `/veterinarias/`, `/ferreterias/`, `/transporte/`, `/inmobiliarias/`, `/condominios/`, `/movilidad-escolar/`, `/gimnasios/`, `/spas/`, `/talleres/`, `/minimarkets/`), que genera `herramientas/generar-rubros.mjs` con `portada.css` + `rubro.css` + `rubro.js`. Los rubros dependen de las clases de `portada.css`: renombrarlas rompe las 12 páginas. `style.css` y `main.js` ya no los usa ninguna página.

## Overview

**Creative North Star: "El cuaderno de cuentas que se pasa en limpio solo"**

La página entera es una hoja de cuaderno cuadriculado peruano: blanco frío, cuadrícula celeste de 24px y una sola línea de margen roja que baja por toda la página, de arriba abajo. Sobre esa hoja hay dos clases de escritura. La **manuscrita** (Kalam, tinta de lapicero azul) es lo que el dueño del negocio anota hoy: deudas, pendientes, «cobrar a Quispe». La **en limpio** (Archivo ancho para titulares y Schibsted Grotesk para el texto, en tinta negra nítida) es lo que el sistema ya hizo. El gesto que lo explica todo está en la primera pantalla: cada renglón manuscrito se tacha con lapicero rojo y debajo aparece su versión en limpio, con el resaltador amarillo marcando lo que se hizo solo.

Las secciones de peso no van sobre la hoja: son **tapas de cuaderno** en cobalto saturado, a todo el ancho, con grano de cartulina y un lomo oscuro a la altura del margen. Encima de la tapa va la etiqueta de nombre del cuaderno escolar. El pie es la contratapa, en un cobalto más hondo. Los objetos que se pegan a la hoja (capturas de trabajos, tarjeta de precio) son papeles blancos un poco torcidos, con cinta adhesiva y una sombra suave de papel levantado. La densidad es la de un cuaderno: renglones con su línea, listas en vez de tarjetas, mucho aire entre bloques.

Rechazo confirmado (contrato de dirección): la portada SaaS de titular a la izquierda y celular a la derecha sobre fondo crema con mancha de degradado. Solo tema claro; la portada declara `color-scheme: light` y no tiene modo oscuro.

**Key Characteristics:**
- Hoja cuadriculada (celda de 24px) con margen rojo continuo como fondo de toda la página.
- Dos escrituras con funciones distintas: manuscrita en lapicero azul para lo pendiente o anotado, y grotesca negra en limpio para lo resuelto.
- Tres marcas con un solo uso cada una: lapicero rojo para tachar, resaltador amarillo para lo que se hizo solo y visto de lapicero para marcar.
- Tapas de cuaderno en cobalto a todo el ancho para «Por qué hago esto» y el cierre; contratapa en cobalto hondo para el pie.
- Papeles pegados con cinta, rotados entre −1.5° y 1.2°, con sombra difusa.
- Listas como renglones (borde inferior de 1px en color renglón), sin tarjetas con borde ni rejillas de íconos.
- Movimiento de escritura: trazos que se dibujan, recortes que se revelan de izquierda a derecha y resaltador que se pinta. Todo tiene versión de solo opacidad.

## Colors

Hoja fría casi blanca, tinta casi negra y una familia de azules de lapicero y de tapa, con dos acentos de marcador (rojo y amarillo) que tienen un solo uso cada uno.

### Primary
- **Cobalto de tapa** (`cobalto`): la tapa del cuaderno. Fondo de las secciones `.tapa`, botón principal, botón flotante de WhatsApp, cabecera del panel «tu sistema» del comparador, manija del deslizador, botón del control deslizante y casilla del logotipo. Es la única superficie de color saturado de la página.
- **Cobalto oscuro** (`cobalto-osc`): solo el *hover* del botón principal y del botón flotante.
- **Cobalto hondo** (`cobalto-hondo`): la contratapa (pie) y el texto del botón etiqueta.
- **Azul sobre tapa** (`sobre-tapa`): texto de cuerpo encima de cobalto (≈7:1 sobre la tapa). Los titulares y los `<strong>` sobre la tapa van en blanco puro.

### Secondary
- **Tinta de lapicero** (`lapicero`): todo lo manuscrito (Kalam), los enlaces, el visto de las casillas, el contorno de foco (3px), la selección de texto, el relleno del control deslizante, los íconos de acento y la raya de la suma. Se distingue del cobalto por función: el lapicero escribe y el cobalto cubre.
- **Lapicero sin tinta** (`lapicero-seco`): texto del botón «Enviar lo que marqué» mientras no hay nada marcado, con contorno discontinuo `#8C9BD3`. Es el estado desactivado del mundo, en vez de un gris de sistema.

### Tertiary
- **Lapicero rojo** (`rojo`): solo el trazo del tachón sobre los renglones manuscritos de la demo.
- **Margen rojo** (`margen`): solo la línea vertical de 2px del margen de la hoja, con opacidad 0.8.
- **Resaltador amarillo** (`resaltador`): solo el fondo `.resalte` sobre lo que el sistema hizo solo («Recordatorio enviado», «se actualiza solo»). Los bordes del trazo se degradan a `rgba(255,225,77,0.45)` y `0.6` para imitar la punta del plumón.

### Neutral
- **Hoja** (`hoja`): fondo de la página, del encabezado al hacer scroll, del menú móvil y de la barra «pick». También es el `theme-color`.
- **Papel** (`papel`): todo lo que se pega encima de la hoja: fotos, etiqueta, precio, casillas, panel del sistema y botón etiqueta.
- **Papel al pasar** (`papel-hover`): *hover* de los objetos de papel que se pueden pulsar (botón etiqueta, control del video).
- **Cuadro** (`cuadro`): las líneas de la cuadrícula de fondo (1px cada 24px) y los separadores del menú móvil.
- **Renglón** (`renglon`): la línea inferior de cada renglón (tareas, dolores, índice, pasos, preguntas), el borde del encabezado y los bordes de 1.5px de la barra pick, del comparador y de las pestañas.
- **Tinta** (`tinta`): texto en limpio y titulares sobre la hoja.
- **Tinta 2** (`tinta-2`): subtítulos, párrafos secundarios y borde de la casilla vacía.
- **Tinta 3** (`tinta-3`): notas, horas, rótulos de la etiqueta e íconos neutros. Contraste ≈6:1 sobre la hoja.

El comparador «Antes y después» usa a propósito una paleta ajena, la de una hoja de cálculo genérica (`#E1E4E8`, `#ECEEF1`, `#DADDE2`, `#EEF0F3`, `#F1EBDA`). Es material local del Excel de mentira, no forma parte del sistema y no se usa fuera de ese panel.

**Tintes del rubro.** `rubro.css` declara en `:root` unos tintes claros que solo usan los papeles de rubro y la hoja del sistema, todos de la familia renglón/lapicero: `--renglon-suave` (`#E3E8F0`, línea interior de tablas, listas y agenda sobre papel), `--papel-hover` (`#EAF0FF`, cita confirmada), `--papel-sombra` (`#F2F6FC`, columna del tablero), `--lapicero-claro` (`#8C9BD3`, contornos discontinuos de lo que no se confirma), `--lapicero-seco` y los seis `--mapa-*` del mapa. La cita sin respuesta de la agenda usa `hoja` y `renglon`, no la paleta gris del Excel.

### Named Rules
**The Un Marcador, Un Significado Rule.** El rojo solo tacha y el amarillo solo resalta lo que se hizo solo. Ninguno se usa para alertas, errores, etiquetas ni decoración. Si algo amarillo no lo hizo el sistema, sobra.

**The Lapicero Escribe, Cobalto Cubre Rule.** El lapicero (`lapicero`) es tinta: texto, trazos, foco. El cobalto (`cobalto`) es material: tapas, botones, manijas. No se intercambian aunque sean casi el mismo azul.

## Typography

**Display Font:** Archivo, eje de ancho 100–125 y peso 700–800 (con Schibsted Grotesk de respaldo)
**Body Font:** Schibsted Grotesk, peso 400–700 variable (con system-ui)
**Label/Mono Font:** Kalam 400 y 700 para la escritura a mano (con Schibsted Grotesk de respaldo)

**Character:** Archivo ensanchado y en 800 es la letra «en limpio» de los titulares: ancha, firme, casi de rótulo impreso. Schibsted Grotesk es el cuerpo legible y neutro. Kalam es el lapicero del dueño, siempre en azul `lapicero`. Las tres se cargan desde Google Fonts en una sola petición.

El ancho de Archivo se fija con `font-stretch` y equivale al eje `wdth`. El valor cambia con el papel del texto: 108% en el título de paso, 110% en el titular de la portada (116% desde 1024px) y en el de caso, 112% en los títulos de sección y en las cifras de la calculadora, y 116% en el precio y el cierre.

### Hierarchy
- **Display** (800, `clamp(2.45rem, 1rem + 4.6vw, 4.75rem)`, 1.01, −0.028em, ancho 110→116%): solo el titular de la portada, con `text-wrap: balance` y un quiebre fijo antes de «se puede hacer solo.».
- **Display cierre** (800, `clamp(2.3rem, 1.3rem + 3.8vw, 4.6rem)`, 1.02, −0.03em, ancho 116%): la pregunta final sobre la tapa.
- **Cifra** (800, `clamp(3.2rem, 2.4rem + 3vw, 4.75rem)` en el precio y `clamp(3rem, 2rem + 4vw, 5rem)` en la calculadora, 1, −0.03em, cifras tabulares): números grandes en limpio. La unidad («al mes») baja a Schibsted 600 de 1.1rem.
- **Headline** (800, `clamp(2rem, 1.3rem + 2.6vw, 3.35rem)`, 1.04, −0.024em, ancho 112%, máximo 20ch): título de cada sección.
- **Title** (800, `clamp(1.45rem, 1.1rem + 1.2vw, 2rem)`, 1.12, ancho 110%): título de cada caso. El título de paso es una variante más chica (`clamp(1.2rem, 1.05rem + 0.6vw, 1.5rem)`, ancho 108%).
- **Body** (400, 1.0625rem = 17px, 1.6): texto corrido. Subtítulos de sección a 1.125rem con máximo de 52ch; respuestas del FAQ con máximo de 65ch.
- **Body limpio** (600, `clamp(0.98rem, 0.92rem + 0.25vw, 1.06rem)`, 1.5): la línea en limpio bajo cada renglón manuscrito.
- **Label** (700, 1rem, 1.2): botones. Enlaces del encabezado en 600 a 0.98rem; listas de integraciones en 600 a 0.95rem.
- **Caption** (400, 0.8125rem, `tinta-3`): notas al pie de la demo («Ejemplo con datos ficticios»).
- **Mano** (Kalam, siempre `lapicero`): título de la demo en 700 con subrayado (`clamp(1.45rem, 1.15rem + 1vw, 1.9rem)`); renglón tachable en 400 (`clamp(1.15rem, 1rem + 0.95vw, 1.55rem)`); notas, enlaces, pestañas, valores de la etiqueta y contador del pick en 700, entre 1.15rem y 1.35rem; total «Te ahorraste» en 700 con doble subrayado (`clamp(1.45rem, 1.15rem + 1.2vw, 2.05rem)`); números de paso y operadores de la cuenta en 700, entre 1.8rem y 2.5rem.

### Named Rules
**The Dos Escrituras Rule.** Kalam solo para lo que una persona escribe a mano en su cuaderno: lo pendiente, las notas, los números de la cuenta, los enlaces que invitan. Lo que el sistema ya resolvió va en Schibsted o Archivo, en tinta negra. Un titular de sección nunca va en Kalam.

**The Ancho Por Peso Rule.** Los titulares no ganan jerarquía con más peso (todo es 800), sino con más tamaño y más ancho. Para destacar un titular se sube `font-stretch` dentro de 108–120%; no se cambia el peso.

## Layout

**La hoja y el margen.** El fondo de `body` es la cuadrícula: dos gradientes de 1px en `cuadro` repetidos cada `celda` (24px). Una línea de 2px en `margen` corre por toda la altura en `left: var(--m)`. El contenido se alinea con tres variables, no con un contenedor centrado de ancho fijo:
- Celular (<768px): margen rojo a 20px, columna izquierda a 40px y derecha a 16px. El texto empieza a la derecha del margen, como en un cuaderno.
- Desde 768px: margen en `max(28px, calc(50% - 656px))`, columna izquierda en `max(64px, calc(50% - 600px))` y derecha en `max(32px, calc(50% - 600px))`. Con eso la medida útil queda en unos 1200px centrados y el margen siempre 36px a la izquierda del texto.

La cuadrícula es material, no una rejilla de maquetación: los espacios no se ajustan a múltiplos de 24px.

**Ritmo vertical.** Secciones sobre la hoja con `clamp(56px, 6vw, 80px)` arriba y `clamp(40px, 4.5vw, 60px)` abajo. Antes y después de cada tapa el aire sube a `clamp(80px, 10vw, 128px)`, y la tapa misma lleva `clamp(80px, 10vw, 136px)` de relleno vertical. Separaciones internas habituales: 8, 12, 16, 22–24, 28, 32, 40, 48, 64, 72 y 80px.

**Columnas.** Todo es una columna en celular. Desde 1024px las secciones parten en dos columnas asimétricas: 1.12fr/0.88fr en la portada, 4fr/8fr en rubros (con la introducción fija al hacer scroll), 7fr/5fr en casos (invertido en el segundo), y 5fr/7fr o 7fr/5fr en calculadora, «Por qué hago esto», pasos, FAQ y cierre, con 64–88px entre columnas. Los renglones de dolores pasan a dos columnas desde 900px y el índice de rubros desde 768px.

**Puntos de quiebre usados:** 360 (se oculta la fecha), 480 (botones de la portada a todo el ancho por debajo), 560 (la hora pasa delante del texto en la demo), 600 (el Excel pierde una columna), 640, 768, 900, 1024, 1200 (enlaces del encabezado visibles, menú oculto) y 1400 (los números de paso se escriben en la columna del margen).

**Celular primero.** El encabezado mide 64px y es fijo. El botón flotante respeta `safe-area-inset-bottom`. Todos los objetivos táctiles miden al menos 44px (casi todos 48px o más).

## Elevation & Depth

Profundidad de papel, no de interfaz. La hoja es plana. Lo que se pega encima levanta un poco: sombras difusas, desplazadas hacia abajo y con *spread* negativo, siempre teñidas de azul tinta (`rgba(17, 25, 60, …)` o `rgba(17, 30, 80, …)`), nunca negro puro. La tapa no tiene sombra: su profundidad viene del grano de cartulina (ruido SVG `feTurbulence` al 7% de opacidad), un brillo diagonal de 160° y el lomo, una franja `rgba(0,0,20,0.16)` del ancho del margen con filo claro de 1px.

### Shadow Vocabulary
- **Papel pegado** (`box-shadow: 0 20px 34px -22px rgba(17, 25, 60, 0.5), 0 2px 6px rgba(17, 25, 60, 0.12)`): fotos de los casos. La tarjeta de precio usa la misma receta un poco más honda (`0 24px 40px -24px rgba(17,25,60,0.55), 0 2px 6px rgba(17,25,60,0.1)`).
- **Etiqueta sobre tapa** (`box-shadow: 0 22px 40px -20px rgba(0, 0, 30, 0.6)`): la etiqueta de nombre y, más corta, el botón etiqueta (`0 10px 22px -12px rgba(0,0,30,0.6)`).
- **Hoja incrustada** (`box-shadow: 0 20px 40px -28px rgba(17, 25, 60, 0.5)`): el marco del comparador.
- **Botón de tapa** (`box-shadow: inset 0 1px 0 rgba(255,255,255,0.18), 0 6px 14px -8px rgba(29,63,174,0.75)`): el botón principal, con brillo superior y sombra cobalto.
- **Flotante** (`box-shadow: 0 12px 24px -10px rgba(17, 30, 100, 0.65)`): botón de WhatsApp fijo.
- **Encabezado al bajar** (`box-shadow: 0 10px 22px -16px rgba(17, 30, 80, 0.4)`): aparece cuando `scrollY > 8`.
- **Barra pick** (`box-shadow: 0 -10px 18px -14px rgba(17, 30, 80, 0.35)`): sombra hacia arriba, porque la barra se queda pegada abajo.
- **Perillas** (`0 2px 8px rgba(17, 30, 80, 0.4)` en el control deslizante, `0 6px 14px -6px rgba(17,30,80,0.6)` en la manija del comparador, `0 4px 12px -4px rgba(17,30,80,0.5)` en el control del video y `0 2px 8px rgba(17,30,80,0.16)` en las etiquetas Antes/Después).

### Named Rules
**The Papel Levanta, Hoja No Rule.** Solo lo que es un objeto pegado o un control flotante lleva sombra. Los renglones, las listas, el índice y el FAQ son tinta sobre la hoja y no tienen sombra ni fondo propio.

**The Sombra Azul Rule.** Toda sombra es difusa, con *spread* negativo y teñida de azul tinta. No hay sombras duras desplazadas ni negras.

## Shapes

Esquinas casi rectas para lo que es papel y redondeo amable para lo que se pulsa. Los papeles pegados apenas se redondean: 3px la foto, 4px el precio y la casilla, 2px la barra pick. Los botones y el botón de menú usan 10px; las pestañas del comparador, 10px solo arriba. La etiqueta de nombre es la forma más blanda (18px), con una línea interior cobalto de 1.5px a 8px del borde y radio de 12px, como las etiquetas escolares impresas. El marco del comparador usa 14px. Los controles circulares (flotante, control del video, manija, perillas) son círculos completos.

Formas propias del mundo:
- **Rotación de papel pegado:** −1.4°, 1.2° y −0.8° en las fotos; −1.5° en la etiqueta y en la nota del Excel; 1.2° en el precio.
- **Cinta adhesiva:** rectángulo de 104×28px (84×24px en celular) en `rgba(232, 228, 214, 0.9)` con bordes rasgados mediante `clip-path: polygon(3% 0, 97% 5%, 100% 48%, 96% 100%, 2% 95%, 0 52%)`, cruzado a −34° o 32° en las esquinas, o a −3° centrado arriba.
- **Resaltador:** radio irregular `0.25em 0.6em 0.3em 0.5em / 0.5em 0.3em 0.6em 0.35em`, con el trazo al 84% de alto y centrado al 60%.
- **Puntos de índice:** línea punteada de 2px en `#9AAAC4` entre el nombre del rubro y la flecha, como en el índice de un cuaderno.
- **Líneas a mano:** el tachón, el visto y la raya de la suma son trazos SVG con `stroke-linecap: round` (2.6px, 3.2px y 2.2px).

## Components

### Buttons
Botones de tapa: sólidos, con poco brillo y firmes al pulsarlos.
- **Shape:** esquinas suaves (`{rounded.boton}`); alto mínimo de 48px, 58px en el grande y 42px en el chico.
- **Primary:** fondo `cobalto` y texto blanco en Schibsted 700, con ícono de WhatsApp relleno a 1.3em y 10px de separación. Lleva la sombra «botón de tapa». Es la acción de WhatsApp en todas sus apariciones: portada, encabezado, menú, etiqueta, precio y pick.
- **Hover / Focus:** el fondo pasa a `cobalto-osc` en 0.2s con `--ease`. Al pulsar baja 1px (`translateY(1px)`, 0.15s). El foco es el global: contorno de 3px en `lapicero` con 3px de separación, blanco sobre tapas y pie.
- **Etiqueta (sobre tapa):** fondo `papel`, texto `cobalto-hondo` y sombra «etiqueta». *Hover* en `papel-hover`. Solo para la acción principal encima de una tapa cobalto.
- **Sin tinta (desactivado):** fondo transparente, texto `lapicero-seco` y contorno discontinuo de 1.5px en `#8C9BD3`. Al pulsarlo no envía: lleva el foco al primer renglón.
- **Enlace a mano (secundario):** texto Kalam 700 a 1.3rem en `lapicero`, subrayado de 2px que se vuelve ondulado al pasar el cursor, y flecha. Alto táctil de 48px. Es la única forma de acción secundaria.

### Renglón (lista base)
Toda lista es una serie de renglones. Cada uno lleva borde inferior de 1px en `renglon`, sin fondo y sin radio. Variantes:
- **Renglón tachable (demo):** línea manuscrita Kalam 400 en `lapicero`; debajo, la línea en limpio (Schibsted 600, `tinta`) con flecha de codo, el texto resaltado y la hora en `tinta-3`. En celular la hora va delante, como en un registro.
- **Renglón con casilla (dolores):** botón de ancho completo con `aria-pressed` y alto mínimo de 60px. Al pasar el cursor el fondo se tiñe de `rgba(31,63,191,0.045)`. Al marcarlo el texto sube a 650 y debajo se despliega la solución en Kalam (de `0fr` a `1fr` en 0.35s).
- **Renglón de índice (rubros):** ícono en `lapicero`, nombre, puntos de índice y flecha. Al pasar el cursor el nombre se subraya en `lapicero` y la flecha avanza 4px.
- **Renglón de paso:** número Kalam de 2.5rem a la izquierda. Desde 1400px el número se escribe en la columna del margen, a 66px del texto.
- **Renglón de pregunta (FAQ):** `<details>` con alto mínimo de 62px y ícono «+» en `lapicero` que gira 45° al abrirse.

### Casilla
Cuadro de 26px con borde de 2px en `tinta-2`, radio de 4px y fondo `papel`. El visto es un trazo SVG de lapicero de 3.2px que sale del cuadro hacia arriba a la derecha, como una marca hecha a mano, y se dibuja con `stroke-dashoffset` de 1 a 0 en 0.36s `cubic-bezier(0.55, 0, 0.25, 1)`. Al pasar el cursor el borde cambia a `lapicero`. Con movimiento reducido el visto aparece por opacidad en 0.2s.

### Tachón
Trazo SVG ondulado en `rojo` de 2.6px y puntas redondas, que cubre el 106% del renglón manuscrito desde −3%. Se dibuja de izquierda a derecha (`strokeDashoffset` 1→0, 0.5s, `power2.inOut`). Solo existe en la demo de la portada.

### Resaltador
`<span class="resalte">` sobre texto en limpio: fondo de gradiente en `resaltador` con puntas más claras, radio irregular y relleno horizontal de 0.18em. Se pinta de izquierda a derecha animando `background-size` de 0% a 100% (0.55s `power2.out` en la demo; 0.6s con escalonado de 0.35s en los casos).

### Tapa cobalto
Sección de ancho completo en `cobalto` con grano, brillo y lomo. El texto va en `sobre-tapa`, los titulares y énfasis en blanco y los separadores en `rgba(255,255,255,0.24)`. Se usa dos veces: «Por qué hago esto» y el cierre. La contratapa (pie) es la misma idea en `cobalto-hondo`, con lomo pero sin grano.

### Etiqueta de nombre
La etiqueta escolar pegada en la tapa: papel blanco de 440px de ancho máximo, radio de 18px, línea interior cobalto y rotación de −1.5°. Arriba, la marca (logotipo de 38px de alto y «por mis dos hijos» debajo), con filete de 2px en cobalto. Debajo, campos de formulario impreso: rótulo en Schibsted 700 a 0.78rem en mayúsculas con 0.06em de espaciado y `tinta-3`, y valor manuscrito en Kalam 700 a 1.35rem en `lapicero`, sobre una línea de 1.5px en `renglon`. Cierra con un botón principal a todo el ancho. Las mayúsculas pequeñas del rótulo son propias de esta etiqueta impresa y no son un estilo de rótulo general.

### Foto con cinta
Captura de un trabajo como foto pegada: marco blanco de 10px (12px abajo), radio de 3px, sombra «papel pegado», rotación leve y una o dos cintas adhesivas. El medio va a 4:3 con `object-fit: cover`. Si es video, un control circular blanco de 44px abajo a la derecha alterna reproducir, pausar y volver a ver.

### Pick
La barra que junta lo marcado en dolores. Es un trozo de hoja cuadriculada pegado al borde inferior (`position: sticky; bottom: 16px`), con filetes de 1.5px en `renglon` arriba y abajo y sombra hacia arriba. A la izquierda, el contador en Kalam 700 a 1.3rem en `lapicero` («Toca los renglones que te pasan.» o «Marcaste N.»). A la derecha, el botón principal, que empieza «sin tinta» y se entinta al marcar el primer renglón. Anuncia los cambios con `aria-live="polite"`.

### Comparador
Hoja incrustada de radio 14px y borde de 1.5px en `renglon` con dos capas: un Excel genérico (paleta gris propia, filas de 40px, nota a mano rotada) y «tu sistema» (cabecera cobalto alineada fila por fila con el Excel, estados con ícono). Desde 1024px las capas se superponen y una manija cobalto de 48px con línea de 3px las separa mediante `clip-path: inset(0 0 0 var(--pos))`. Lo controla un `input range` invisible, y al tener foco aparece un contorno de 3px en `lapicero` en el marco. La primera vez que se ve, la manija entra de 88% a 50% (1.4s `expo.out`). Por debajo de 1024px se convierte en dos pestañas Kalam con forma de lengüeta de 10px arriba («Antes / Después»), accesibles con las flechas, Inicio y Fin.

### Inputs / Fields
**La cuenta a mano (calculadora).** Cada fila tiene un operador Kalam de 1.9rem («+», «×»), una etiqueta, el número Kalam de 1.8rem en `lapicero` a la derecha y un control deslizante. El riel mide 4px, va en `#C5D3E8` y se rellena en `lapicero` hasta `--lleno`. La perilla es un círculo cobalto con borde blanco de 3px: 28px en WebKit y 22px en Firefox. Una raya de suma SVG cierra la cuenta y el resultado sale como cifra en Archivo.

### Logotipo

«La casilla marcada»: la palabra «abiel» en minúscula, trazada como vector, con el punto de la i convertido en una casilla cobalto (#1D3FAE) cuyo visto se sale del cuadro. Se usa siempre como imagen, nunca como texto: `assets/logo.svg` sobre fondo claro (tinta #111318) y `assets/logo-claro.svg` en blanco sobre cobalto; proporción 3,045:1, con `width` y `height` puestos. Alturas: 32px en cabecera y pie, 38px en la etiqueta. El isotipo (solo la casilla con el visto) es `assets/favicon.svg`, y de él salen `logo-512.png` (datos estructurados) y `apple-touch-icon.png`.

### Navigation
**Nav-renglón.** El encabezado es el renglón de fecha de la hoja: fijo, de 64px, transparente sobre la cuadrícula y con borde inferior de 1.5px en `renglon`. Al bajar más de 8px toma fondo `hoja` y sombra suave (0.25 y 0.3s). Contiene el logotipo (32px de alto), «Fecha: dd/mm» en Kalam `lapicero` con la fecha real del día (oculto por debajo de 360px), los enlaces en Schibsted 600 con subrayado de 2px que aparece al pasar el cursor (visibles desde 1200px), el botón principal chico (desde 768px) y un botón de menú de 48px con borde en `renglon` y radio de 10px. El menú móvil es una lista de renglones sobre `hoja`, se cierra con Escape y termina en el botón principal.

### Botón flotante
Círculo cobalto de 58px con el logo de WhatsApp. Está oculto mientras se ve la primera pantalla o la sección de dolores, que ya tiene su propia barra de envío. Aparece subiendo 14px desde 0.92 de escala (opacidad 0.3s y transformación 0.4s con `--ease`).

### Papel del rubro
La primera pantalla de un rubro muestra el papel propio de su negocio en vez de la lista de hoy, cuando `rubros.json` le declara `papel` (`familia` + `escena` de `dispositivos.json`). Cada familia es un papel pegado (blanco, cinta, rotación entre −1.2° y 1.2°, sombra «papel pegado») con la mecánica «pasar en limpio»: lo anotado en Kalam se tacha en rojo, debajo aparece la línea en limpio y el resaltador va solo en lo que se hizo solo.
- **Libreta:** hoja rayada con su propio margen rojo a 38px; título Kalam subrayado, nombre y nota a mano por renglón, pie en limpio con la cifra de la escena.
- **Agenda:** semana con mañana encerrada a mano, hora en limpio, paciente a mano y casilla con visto por cita; al pie, el pendiente tachado y el total resaltado.
- **Talonario:** hoja con el borde de arriba picado (máscara), número y líneas en limpio, total en Archivo y el pendiente tachado al pie. Con libreta, se monta sobre el pie de la libreta.
- **Carnet:** tarjeta de radio 12px con banda cobalto, rótulos impresos en mayúsculas como la etiqueta y el estado tachado y pasado en limpio.
La hoja del sistema puede leer también una escena (`hoja`): **cuenta** (cuenta a mano con operadores Kalam, raya de suma y total en Archivo) o **lista** (renglones en limpio con lo que se hizo solo resaltado). El orden de las secciones bajo la primera pantalla sale de `orden`; el precio queda siempre antes de la mitad de la página. La agenda del sistema dibuja un corte discontinuo cuando entre dos horas seguidas hay más de una hora.

### Movimiento
- **Curva base:** `--ease: cubic-bezier(0.16, 1, 0.3, 1)` para todas las transiciones de CSS. En GSAP los equivalentes son `expo.out` para revelados, `power2.inOut` para trazos y `power2.out` para el resaltador.
- **Duraciones:** 0.15s al pulsar; 0.2s para color y fondo; 0.25–0.3s para subrayados, sombra del encabezado y giro del FAQ; 0.35–0.4s para despliegues, el visto y la entrada del flotante; 0.5–0.9s para trazos y revelados de la demo; 1.4s para la pista del comparador.
- **Demo «pasar en limpio»:** cada renglón empieza a los `0.6 + i × 1.55`s. Primero el tachón (0.5s), a los +0.42s el recorte en limpio se abre de izquierda a derecha (`clip-path`, 0.7s `expo.out`), a los +0.7s se pinta el resaltador (0.55s) y a los +0.6s el contador «Te ahorraste» sube (0.9s `expo.out`). Se reproduce una sola vez al estar visible en un 20%, se pausa fuera de pantalla o con la pestaña oculta, y «Pasar en limpio otra vez» la repite. El HTML ya trae el estado final, así que sin JS o sin GSAP se ve completa.
- **Movimiento reducido:** no hay trazos, recortes ni desplazamientos; solo opacidad lineal (0.3–0.4s, renglones cada 0.7s). Tampoco hay scroll suave, ni la pista del comparador, ni el resaltador animado en los casos, ni reproducción automática del video.

## Do's and Don'ts

### Do:
- **Do** dibujar toda superficie nueva sobre la hoja: fondo `hoja` con cuadrícula de 1px en `cuadro` cada 24px y el margen rojo de 2px continuo en `left: var(--m)`.
- **Do** alinear el contenido con `--izq` y `--der`, no con un contenedor centrado de ancho fijo.
- **Do** escribir en Kalam y en `lapicero` lo que una persona anota a mano, y en Archivo o Schibsted y en `tinta` lo que el sistema ya resolvió.
- **Do** reservar el `rojo` para tachar y el `resaltador` para lo que se hizo solo.
- **Do** construir listas como renglones con borde inferior de 1px en `renglon`.
- **Do** usar una tapa cobalto a todo el ancho, con grano y lomo, para las secciones de peso, con el texto en `sobre-tapa` y los titulares en blanco.
- **Do** presentar las capturas como fotos pegadas: marco blanco, radio de 3px, rotación entre −1.5° y 1.5°, cinta y sombra «papel pegado».
- **Do** animar como se escribe (trazo, revelado de izquierda a derecha, resaltador que se pinta) con `--ease` y dejar el estado final en el HTML.
- **Do** dar a cada animación una versión de solo opacidad para `prefers-reduced-motion: reduce`.
- **Do** mantener los objetivos táctiles en 44px o más y el contorno de foco de 3px en `lapicero` (blanco sobre tapas).

### Don't:
- **Don't** hacer la portada SaaS de titular a la izquierda y celular a la derecha sobre fondo crema con mancha de degradado (rechazo del contrato de dirección).
- **Don't** usar el rojo o el amarillo para alertas, errores, insignias o decoración.
- **Don't** poner titulares de sección en Kalam, ni texto manuscrito en tinta negra.
- **Don't** usar sombras duras desplazadas ni sombras negras; toda sombra es difusa y teñida de azul tinta.
- **Don't** meter los renglones en tarjetas con borde y fondo. Solo los objetos pegados (foto, etiqueta, precio) son papel.
- **Don't** usar un gris de sistema para el estado desactivado; se usa el lapicero sin tinta.
- **Don't** reutilizar fuera del comparador la paleta gris del Excel.
- **Don't** copiar tokens, tipos (Bricolage Grotesque, Onest) ni el acento naranja de `style.css`: pertenecen al sistema anterior, que ya ninguna página usa.
