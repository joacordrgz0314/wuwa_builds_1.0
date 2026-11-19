# Retrato en caché y arreglo del Errante Electro

**Fecha:** 2026-11-15
**Estado:** escrito. Solo se revisó la sintaxis de `CharacterPage.jsx` con esbuild; el usuario prueba con `pnpm dev`.

## Pedido
Que el retrato de cuerpo completo se guarde en caché para que cargue de inmediato al recargar; arreglar el Errante Electro (mostraba el arte de Jiyan, pegado al borde superior).

## Hallazgos (script en consola del usuario)
- El API lista `RolePortrait` para los 13 personajes sin retrato visible (por ejemplo `T_ActivityRoleAogusita.webp`), pero la imagen no carga: falta confirmar si el archivo no existe o hay otra causa (pendiente de script de prueba de carga).
- Fandom tiene Splash Art de los 13 (y de ninguno de los 4 Errantes).
- Errante Electro: el listado trae dos entradas, 1309 (modelo masculino) y 1310 (femenino). El `RolePortrait` de 1309 es `T_IconChuanShuo1_UI.webp` (arte ajeno); su tarjeta (`zhujuenan`) es correcta. Los demás Errantes masculinos comparten `T_ActivityRoleNanzhu.webp`.

## Decisiones del usuario
- Guardar el retrato en la caché (opción B de la propuesta). Para el Errante Electro, reutilizar el arte de otro Errante con el brillo de su elemento.

## Qué se hizo
- `src/api.js`: la caché de 24 h (`wuwa-builds:cache`) gana `portrait` (Id → URL, o `'-'` si no hay retrato). Nuevas `knownPortrait(id)` y `rememberPortrait(id, url)`. `getCharacterPortrait` usa `PORTRAIT_FROM = { 1309: 1501 }`: el Errante Electro toma el retrato del Errante Espectro masculino (mismo modelo); el brillo sigue siendo el de Electro.
- `src/components/CharacterPage.jsx`: si el retrato ya se conoce, el estado inicial lo muestra desde el primer cuadro sin pedir el detalle. Se recuerda al cargar bien; se recuerda `'-'` solo cuando el API no trae retrato. Si un retrato recordado falla al cargar, se olvida y queda el arte de respaldo. Un error de carga al comprobar un retrato nuevo no se guarda como negativo (podría ser transitorio), así que los 13 siguen consultando el detalle cada vez.

## Pendientes
- Decidir qué hacer con los 13 sin retrato (esperando resultado de la prueba de carga; opción Splash de Fandom).
- Materiales: vuelven a cargar al abrir la pestaña (propuesta pendiente de «aplica»).
