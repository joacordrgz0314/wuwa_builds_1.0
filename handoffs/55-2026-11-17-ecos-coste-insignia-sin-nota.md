# 55 · Ecos: coste como insignia y sin la nota final

**Fecha**: 2026-11-17
**Versión**: 0.1.2 → **0.1.3** (parche: aspecto del coste y quitar un texto)
**Estado**: escrito, sin probar en pantalla.

## Pedido
El recuadro de coste (1, 2, 3) se veía pesado; el usuario eligió la opción recomendada (insignia). Además pidió quitar la descripción del final de la sección Ecos.

## Qué se hizo
- `BuildSections.jsx`: `EchoRow` pone el número en `<b>` y «Coste» en `<small>` después; ya no se muestra `ecos.nota` (el dato sigue en `builds.json`, solo no se pinta) y `hasEcos` ya no la cuenta.
- `styles.css`: bloque `ecos-coste-insignia` (círculo de 36 px con número dorado y borde del color del elemento, «Coste» al lado; vacío en gris).
- `package.json`: 0.1.3.

## Verificación
Sintaxis con esbuild, sin errores. Sin probar en pantalla.

## Pendientes
Probar el aspecto de la insignia en la fila de 3 costes (desde 1100 px) y en móvil.
