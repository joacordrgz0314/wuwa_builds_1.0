# 37 · Portadas de Lucy, Galbrena, Lupa y Zhezhi más abajo; aire y línea en el inicio (2026-11-16)

Estado: escrito, sin probar (sintaxis revisada con esbuild).

## Pedido
1. Lucy, Galbrena, Lupa y Zhezhi quedaban casi tocando el borde superior en su página.
2. En el inicio, la barra de filtros se veía muy pegada arriba y a la grilla: más espacio arriba y una línea con el estilo de la web entre los filtros y los personajes.

## Qué se hizo
- `CharacterPage.jsx`: `PORTRAIT_SHIFT` suma `1511` (Lucy) y `1208` (Galbrena) con `-4%` (antes `-8%` por defecto; Suoming sigue en `-2%`). Mapa nuevo `PORTRAIT_SHIFT_BY_NAME` para Lupa y Zhezhi por `EnName` en minúsculas (su Id no está verificado). Variable `artShift` alimenta `--art-shift`. Si alguno no se mueve, hay que pasar su Id (de la URL) y moverlo al mapa por Id.
- `App.jsx`: `div.grid-rule` entre `FilterBar` y la grilla.
- `styles.css` (bloque «inicio: más aire arriba y línea separadora»): `.filters { margin: 28px 0 0 }`; `.grid-rule` = línea turquesa con degradado y rombo central (mismo motivo que `.side-rule`), margen 22 px arriba y 28 px abajo.
