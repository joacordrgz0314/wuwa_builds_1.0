# Portada compacta y arte de respaldo con el mismo tratamiento

**Fecha:** 2026-11-15
**Estado:** escrito. Solo se revisó la sintaxis de `CharacterPage.jsx` con esbuild. NO verificado con `pnpm build` ni en pantalla.

## Pedido
Subir más las secciones (pestañas y panel), agrandar un poco el arte y que el diseño se aplique a todos los personajes, también a los que no tienen retrato.

## Decisiones del usuario
- Aprobó el plan con las opciones recomendadas: cabecera `clamp(220px, 27vw, 340px)`, arte `min(900px, 70vw)` y opción A para el arte de respaldo (no Splash de Fandom).
- Constancia: el usuario probó con `pnpm dev` los handoffs 12 a 19 y dijo que se ven y funcionan bien (`pnpm build` no se confirmó por separado). Los estados «sin verificar» de 12 a 19 quedan corregidos por esta nota; las entradas anteriores no se editan.

## Qué se hizo
- `src/components/CharacterPage.jsx`: `artClass` usa `char-page-art is-portrait is-card` cuando no hay retrato pero sí `FormationRoleCard`, para heredar todas las reglas del retrato. El respaldo de cabeza (`is-head`) no cambia.
- `src/styles.css`: bloque nuevo al final `/* ---- portada compacta ---- */`:
  - Margen inferior de la cabecera 28 px a 8 px; en >600 px `min-height` baja a `clamp(220px, 27vw, 340px)`.
  - Retrato y brillo: ancho `min(900px, 70vw)` (>600 px). Desvanecido de 45 % a 85 %.
  - `is-card`: aspecto 2/3, `object-fit: cover`, desvanecido abajo y por el borde izquierdo (`mask-composite`), ancho `min(500px, 45vw)` (>600 px) y `min(300px, 70%)` en ≤600 px. El brillo `::before` toma el mismo ancho y aspecto 2/3.
  - Los anchos van dentro de `@media` para no pisar las reglas móviles del bloque anterior.

## Verificación pendiente (usuario)
`pnpm build`; 1440×900, 390×844 y 844×390. Revisar: que las pestañas suban sin tapar el texto del nombre; tamaño del retrato; en personajes sin retrato (Augusta, Iuno, Galbrena, Denia, Lucilla, Rebecca, Lucy, Hiyuki, Yangyang: Xuanling, Suisui, Qingxiao, Jingran, Suoming y quizá Rover o 4★) cómo se ve el arte 2:3: si trae fondo opaco puede verse el rectángulo aun con el desvanecido; anchos medios (~700 a 1000 px); que no haya scroll horizontal.

## Pendientes
- Ajustar valores según lo que se vea (altura, tamaño, máscaras). Anotar qué personajes caen hoy al arte de respaldo.
- Fondo tipo Rinascita en el inicio; fase 2c (builds del resto); rediseño final (pedir referencias en un solo mensaje).
