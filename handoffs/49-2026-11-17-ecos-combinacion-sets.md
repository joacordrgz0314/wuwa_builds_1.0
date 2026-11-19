# Ecos: combinación de sets, alternativas y eco principal

**Fecha**: 2026-11-17
**Estado**: escrito, sin probar en `pnpm dev`. Solo sintaxis verificada (esbuild). Sin verificar: aspecto de la combinación 3 + 2 (ninguna build la usa todavía), alternativas (ninguna cargada), 390×844 y 844×390.

## Pedido
Sets en combinación (3 + 2): icono del set principal y abajo «+ 2» con el icono del otro set en pequeño; sets distintos según el equipo; solo imagen del eco principal (el de combate); buscar iconos de estadísticas.

## Qué se hizo
- `BuildSections.jsx`: `SetCombo` (primer set grande con «N piezas», los demás en `.echo-plus` con «+ N», icono y nombre); `Echoes` usa `SetCombo` para `ecos.sets` y para `ecos.alternativas` (`[{ etiqueta, sets }]`, tarjetas pequeñas); sin eco principal o sin sets muestra marcos vacíos «Sin definir».
- `builds.json`: `ecos.ecoPrincipal` = 6000225 («Reminiscencia: Suhsin, la Inevitable») en Hsin (1311) y Suoming (1312).
- `styles.css` (bloque `ecos-combinacion-sets`).
- `CLAUDE.md`: regla de Ecos actualizada.

## Pendiente
- Iconos de estadísticas: no se pudieron buscar desde el sandbox (sin red); se pidió un script de consola para ver `Properties` del personaje y otras rutas.
- Lily: sin set ni eco principal (marcos vacíos). Alternativas de sets por equipo: añadir en la fase de contenido.
