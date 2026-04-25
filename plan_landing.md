# Plan de desarrollo de la landing

## 1. Objetivo
Crear una landing page profesional en HTML + CSS + JS puro, con animaciones modernas usando GSAP y ScrollTrigger, basada en el estilo premium oscuro/amarillo naranja de referencia, pero con una paleta de colores más amigable y varias alternativas.

La landing tendrá:
- Hero con tu foto de portada
- Mensaje claro de servicios de software
- Secciones de servicios, módulos, integraciones, beneficios y contacto
- Efectos de entrada y scroll suaves
- Diseño 100% responsive

---

## 2. Stack técnico

### Base obligatoria
- HTML5
- CSS3 (Flexbox / Grid / variables CSS)
- JavaScript puro

### Librerías recomendadas
- GSAP
- ScrollTrigger (plugin de GSAP)
- Lenis (opcional, para scroll suave)

---

## 3. Estructura de la landing

### 3.1 Hero
- Bloque principal dividido en dos columnas.
- Izquierda: texto principal, subtítulo, CTA y datos clave.
- Derecha: tu foto de portada con marco/naranja y efectos de entrada.
- Fondo oscuro con detalles geométricos y líneas sutiles.

### 3.2 Sección de servicios
- Título corto y descriptivo.
- Tarjetas de servicios con iconos simples.
- Hover suave y animación de entrada.

### 3.3 Sección de módulos / soluciones
- Grid de módulos principales.
- Cada módulo con ícono, nombre y breve descripción.
- Estilo tipo cards con sombra ligera.

### 3.4 Sección de integraciones
- Texto corto explicando conexiones.
- Logos o iconos de integraciones alineados.
- Posible línea de tiempo horizontal.

### 3.5 Beneficios
- Lista con puntos clave.
- Iconos de check o números.
- Texto orientado a resultados: ahorro, control, automatización.

### 3.6 Casos de uso / clientes
- Bloques para clínicas, tiendas, empresas.
- Texto breve y claro.
- Puede ser un carrusel simple o grid responsive.

### 3.7 Contacto / formulario
- Formulario de captación.
- Campos: nombre, correo, teléfono, tipo de negocio, mensaje.
- Botón CTA claro y visible.
- Mensaje adicional de confianza.

### 3.8 Sección Sobre nosotros
- Foto tuya en un segundo bloque.
- Texto de founder / colaborador.
- Mensaje personal: “Soy [tu nombre], ayudo a empresas con soluciones de software a medida.”

### 3.9 Footer
- Datos de contacto breves.
- Enlaces rápidos.
- Mensaje final.

---

## 4. Plan de trabajo

### Fase 1: Estructura HTML
1. Crear `index.html` con todas las secciones.
2. Añadir estructura semántica: `header`, `main`, `section`, `footer`.
3. Incluir la imagen de portada en el hero.

### Fase 2: Estilos CSS
1. Definir variables CSS para paleta y tipografías.
2. Diseñar layout responsivo con Grid y Flexbox.
3. Estilizar hero, cards, botones y formularios.
4. Ajustar mobile-first y puntos de quiebre.

### Fase 3: Animaciones con GSAP
1. Instalar GSAP y ScrollTrigger.
2. Animar la entrada del hero y texto.
3. Animar tarjetas al hacer scroll.
4. Añadir efecto suave a la imagen y CTA.

### Fase 4: Scroll suave y detalles
1. Opcional: integrar Lenis si se desea scroll premium.
2. Añadir microinteracciones en hover de botones.
3. Mejorar la experiencia en móviles.

### Fase 5: Revisión final
1. Probar en escritorio y móvil.
2. Ajustar contraste y legibilidad.
3. Optimizar tiempos de carga.
4. Validar formulario y CTA.

---

## 5. Paleta de colores propuesta

### Alternativa 1: Tonos claros / medio oscuros
- Fondo principal: #111827 (gris azul oscuro)
- Fondo secundario: #1F2937 (gris medio)
- Texto principal: #F8FAFC (blanco suave)
- Texto secundario: #CBD5E1 (gris claro)
- Acento principal: #FF8A3D (naranja tibio)
- Acento secundario: #F59E0B (ámbar)
- Borde / detalle: #E2E8F0 (gris claro)

### Alternativa 2: Tonos cálidos amigables
- Fondo principal: #0F172A (azul gris oscuro)
- Fondo secundario: #111827 (gris profundo)
- Texto principal: #F9FAFB (blanco)
- Texto secundario: #E2E8F0 (gris claro)
- Acento principal: #FF7A26 (naranja cálido)
- Acento secundario: #FBBF24 (amarillo suave)
- Suave: #334155 (gris azulado)

### Alternativa 3: Tonos equilibrados claros
- Fondo principal: #131A2A (azul muy oscuro)
- Fondo secundario: #1E293B (gris azulado)
- Texto principal: #F5F7FA (blanco suave)
- Texto secundario: #94A3B8 (gris frío)
- Acento principal: #F97316 (naranja brillante)
- Acento secundario: #FB923C (naranja claro)
- Neutro: #475569 (gris carbón)

---

## 6. Recomendación de estilo final
- Usa la foto de portada en el hero con un marco o recorte en naranja.
- Mantén los botones y CTA en naranja para contraste.
- Prefiere fondos oscuros con textos claros para un estilo premium.
- Añade secciones con fondos ligeramente distintos para separar bloques.
- Usa sombras suaves y bordes redondeados ligeros.

---

## 7. Notas adicionales
- La landing puede construirse solo con HTML/CSS/JS y GSAP.
- Si quieres más adelante, se puede migrar este diseño a Angular sin problemas.
- El objetivo es tener un MVP funcional rápido, luego perfeccionar animaciones.
- Usa el prompt anterior para inspirar diseño visual y mantener coherencia.
