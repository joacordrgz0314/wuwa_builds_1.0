# Retratos de los 13 personajes: rutas verificadas de Encore

**Fecha:** 2026-11-15
**Estado:** escrito. Solo se revisó la sintaxis de `api.js` con esbuild; el usuario prueba con `pnpm dev`.

## Pedido
El usuario comprobó a mano las rutas que sí cargan (variantes de mayúsculas) para los 13 personajes sin retrato de cuerpo completo, solo con recursos de Encore, y pidió usarlas tal cual sin tocar nada más.

## Qué se hizo
- `src/api.js`: nuevas constantes `PORTRAIT_DIR` (carpeta `.../Common/Image/PixActivity/`) y `PORTRAIT_FILES` (Id -> archivo exacto de la tabla del usuario). `knownPortrait(id)` devuelve esa ruta para los 13 ids y, para el resto, lo recordado en la caché como antes.
- Con eso `CharacterPage.jsx` muestra el retrato desde el primer cuadro y no pide el detalle para esos 13, sin cambios en el componente.

## Ids y archivos
1312 `T_ActivityRoleSuoMing`, 1212 `...JingRan`, 1413 `...QingXiao`, 1110 `...SuiSui`, 1610 `...XuanLing`, 1108 `...FeiXue`, 1511 `...LuXi`, 1308 `...LiBeiKa`, 1109 `...LuoSeLa`, 1211 `...DaNiYa`, 1208 `...Jiabeilina`, 1410 `...younuo`, 1306 `...aogusita` (todos `.webp`).

## Notas
- Lily (1512) y el resto de personajes no se tocaron; los Errantes siguen con `PORTRAIT_FROM`.
- Se ignora lo recordado en la caché para estos 13 a propósito: así no pesa un valor viejo de hasta 24 h. Si una ruta fallara, queda el arte de respaldo.

## Pendientes
- Probar los 13 en `pnpm dev`.
- Tratamiento del arte de respaldo y fondo tipo Rinascita (sin cambios).
