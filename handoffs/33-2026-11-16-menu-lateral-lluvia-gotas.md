# 33 · Menú lateral, lluvia ascendente y gotas con ondas (2026-11-16)

Estado: escrito, sin probar (revisada la sintaxis con esbuild).

## Qué cambió
- **Limpieza**: borrados `public/menu-bg.webp` y la carpeta `public/`; fuera `body::before` (estrellas), su `media` y el `background-attachment: fixed` del `body`; fuera `.app-title` (CSS y `h1`). Se conserva `@keyframes star-twinkle` (lo usa `.char-bg::after`) y Marcellus.
- **Lluvia ascendente** (solo `.ambient`): `AMBIENT_PARTICLES` (48 estelas, valores fijos con `Math.sin`, sin aleatoriedad por render) con `--x --s --h --d --w`. Son líneas finas con cola hacia abajo (14 a 44 px de alto, 3 a 7 s) para que parezcan lluvia al revés. La carga conserva sus 18 partículas y su CSS.
- **Gotas**: `Drop` ahora lleva gotita que cae, 4 anillos elípticos escalonados (`scale(1, .42)`), salpicón y punto aleatorio por ciclo (`onAnimationIteration` solo si `e.target === e.currentTarget`). El desfase va en `--dl`. Solo `transform` y `opacity`. `prefers-reduced-motion` oculta gotas y lluvia.
- **Menú lateral** (`.shell > aside.side + main.app`): 240 px, sticky a pantalla completa, fondo `rgba(4,7,15,.6)` sin `backdrop-filter`. Arriba `.side-title` (dos líneas, Marcellus, luz que lo recorre; copia del estilo de la carga, que no se tocó). Entradas: «Personajes» (activa, borde turquesa y brillo; visible también en la página de personaje) y «Armas» deshabilitada con «Pronto» (sin ruta). Abajo anillos concéntricos que respiran y el pie «Datos: encore.moe».
- **Móvil (≤ 800 px)**: barra superior sticky con título compacto y las 2 entradas en línea; adorno y pie ocultos.
- **Página de personaje**: variable `--vw` (1vw; con menú, `(100vw - 240px) / 100`). Los anchos de retrato, arte y altura de cabecera (`70vw`, `45vw`, `27vw`, `62vw`, `40vw`, `36vw`) ahora usan `calc(N * var(--vw))` para escalar con el ancho útil.

## Archivos
`src/App.jsx`, `src/styles.css` (bloques nuevos al final: «lluvia ascendente», «gotas», «menú lateral»), `public/` eliminado.

## A probar
Escritorio e inicio (lluvia, gotas, menú), página de personaje (retrato y cabecera con el menú; Suoming con su ajuste), 390×844 y 844×390, scroll. Si el scroll sigue lento: apagar partículas y gotas por separado.
