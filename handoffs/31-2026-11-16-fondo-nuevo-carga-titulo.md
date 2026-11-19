# Imagen nueva, scroll más fluido, título con Marcellus y pantalla de carga

**Fecha:** 2026-11-16
**Estado:** escrito. Solo se revisó la sintaxis de `App.jsx` con esbuild; el usuario prueba con `pnpm dev`.

## Pedido
Cambiar el fondo por otra imagen (mar de nubes, ruinas, árboles rosados, 1920×1080), mantener la niebla en movimiento, resolver que el scroll se siente lento, usar para el título una fuente cercana a la de WuWa sin descargar archivos, llamar al título «Builds WuWa» y acercar la pantalla de carga a WuWa.

## Qué se hizo
- `public/menu-bg.webp`: la imagen nueva (WebP calidad 80, ~136 KB, local). La anterior se descartó.
- `src/styles.css` (bloque «fondo del inicio»):
  - Se quita el zoom animado y se pone `body { background-attachment: scroll }` (el `fixed` original repinta al hacer scroll). Causas probables de la lentitud, sin medir: ese `fixed`, el zoom de una capa a pantalla completa y las animaciones continuas.
  - Niebla más visible (opacidad 0,16–0,3) y con `will-change: transform` y `translate3d`; dos capas (60 s y 95 s, sentidos opuestos).
  - Capa oscura 0,38 a 0,66; se quita la azulada que servía para la imagen anterior.
- Título: `index.html` carga Marcellus desde Google Fonts (`preconnect` + `display=swap`); `.app-title` usa `'Marcellus', Georgia, serif` con `letter-spacing: 0.04em`. Texto del `h1`: «Builds WuWa». El `<title>` de la pestaña sigue en «WuWa Builds».
- Pantalla de carga (`App.jsx` + bloque nuevo en `styles.css`): sustituye al `.app-loading` y `.app-orbit` (CSS viejo eliminado).
  - Fondo oscuro con brillo turquesa, título «Builds WuWa» en Marcellus con una luz que lo recorre, tres anillos de agua que se expanden, 18 partículas que suben y barra fina de progreso real por fases (0, 1, 2, 3 de `getCharacters`, `bootstrap` y `preloadFirst`).
  - Se muestra solo en la carga inicial; al terminar se desvanece (0,7 s) y se desmonta a los 800 ms. Con `prefers-reduced-motion` se quedan quietos los anillos, las partículas y la luz del título.
  - No incluye la Tacet Mark (no hay recurso original); los anillos son agua, no una aproximación de la marca.

## Notas
- Marcellus se pide a `fonts.googleapis.com` / `fonts.gstatic.com`; si el usuario prefiere local, hay que poner el `.woff2` y su OFL en `src/fonts/` y usar `@font-face`.
- La distorsión acuática del documento original no se hizo (filtro SVG costoso; queda opcional).

## Pendientes
- Que el usuario pruebe: scroll (si sigue lento, probar apagando la niebla para aislar la causa; las máscaras de las tarjetas también pesan), fuerza de la niebla y de la capa oscura, aspecto de la carga.
- Tacet Mark original para la carga.
