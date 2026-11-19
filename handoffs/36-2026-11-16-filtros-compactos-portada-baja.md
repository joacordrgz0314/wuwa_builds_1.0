# 36 · Barra de filtros compacta y portada más abajo (2026-11-16)

Estado: escrito, sin probar (sintaxis revisada con esbuild).

## Pedido
1. Barra de arriba del inicio más profesional, **conservando el texto** de los chips (sin pasar a solo iconos).
2. En la página de personaje, los retratos tocaban el borde superior desde que se quitó el título `h1` (su alto, ≈ 54 px, empujaba todo hacia abajo).

## Qué se hizo
- `FilterBar.jsx`: fila 1 = buscador + contador («61 personajes» o «N de 61 personajes», `aria-live`); fila 2 = grupos Elemento y Arma. Props nuevas `count` y `total` (desde `App.jsx`).
- `styles.css` (bloque «barra de filtros compacta» al final): buscador más ancho (hasta 420 px), chips más compactos, separador vertical entre elementos y armas desde 1500 px (por debajo, los grupos se acomodan en filas).
- Portada: `margin-top` de `.char-page-head:has(.is-portrait)` pasa de `-48px` a `6px` (≈ restaura la posición que tenía con el título). Es un solo número: si hace falta más o menos, se ajusta ahí. Los ajustes por personaje (`PORTRAIT_SHIFT`) no se tocaron.
