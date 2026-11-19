# 57 · Ecos: títulos de zona sin línea y etiquetas «Coste» y «Subestadísticas» más claras

**Fecha**: 2026-11-17
**Versión**: 0.1.4 → **0.1.5** (parche: estilos)
**Estado**: escrito, sin probar en pantalla.

## Pedido
En el 56 los títulos de zona de Ecos quedaron con una línea inferior que no se pidió (solo se quería la letra de los subtítulos de Materiales). Además, «Coste» y «Subestadísticas»: mismo color, un poco más claro, y cambio de letra.

## Qué se hizo
- `styles.css`: se quitó la línea y el relleno inferior de `.echo-zone` (la letra Cinzel y el color quedan). Bloque `ecos-etiquetas-claras`: `.echo-cost small` y `.echo-subs-label` en Cinzel 600 con el gris `--mute` mezclado 55 % con blanco; «Coste» a 0.8rem en mayúsculas.
- `package.json`: 0.1.5.

## Verificación
Solo CSS, sin probar en pantalla.
