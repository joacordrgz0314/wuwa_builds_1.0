# 53 · Ecos: columnas izquierda/derecha también en pantallas medianas

**Fecha**: 2026-11-17
**Versión**: 0.1.0 → **0.1.1** (parche: corrección de un breakpoint)
**Estado**: escrito, sin probar en pantalla.

## Pedido
El usuario vio el set arriba y el eco principal debajo (apilados) en vez de izquierda, derecha y stats abajo.

## Causa
Las dos columnas solo se activaban desde 1100 px de ancho; en pantallas más angostas (con el menú de 240 px) se apilaban. Error mío: el 1100 px venía de un diseño anterior.

## Qué se hizo
- `styles.css` (bloque `ecos-tres-zonas`): columnas, subgrid, divisor vertical y marcadores de fila desde 700 px; la fila de costes en 3 tarjetas sigue desde 1100 px.
- `CLAUDE.md`: breakpoint de columnas actualizado a 700 px.
- `package.json`: 0.1.1.

## Verificación
Solo revisión del CSS; sin probar en pantalla. Apilado solo por debajo de 700 px (móvil vertical).

## Pendientes
Probar 1440×900, ~1000 px de ancho, 844×390 y 390×844.
