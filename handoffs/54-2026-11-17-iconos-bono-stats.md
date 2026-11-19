# 54 · Iconos de bono (elemento y curación) en las stats de Ecos

**Fecha**: 2026-11-17
**Versión**: 0.1.1 → **0.1.2** (parche: iconos)
**Estado**: escrito, sin probar en pantalla.

## Pedido
El usuario encontró en Encore los iconos de bono de daño por elemento y de bono de curación y ordenó añadirlos al sistema de iconos de stats, con URL remotas (sin descargar).

## Qué se hizo
- `api.js`: `STAT_ICON_FILES` suma `cura` y `bono1` a `bono6` (clave = `Element.Id`: 1 Gelio `redice`, 2 Fusión `redhot`, 3 Electro `redmine`, 4 Aero `redwind`, 5 Espectro `redlight`, 6 Destrucción `reddark`; curación `greencure`). Carpeta `IconAttribute`.
- `BuildSections.jsx` (`statIcon`): «Daño <elemento>» usa el icono de bono; si falla usa el del elemento. Texto con «cura» usa el de curación.
- `package.json`: 0.1.2.

## Verificación
Sintaxis con esbuild, sin errores. Sin probar en pantalla.

## Pendientes
Coste 1/2/3: el usuario no está conforme con su aspecto; propuesta pendiente de su «aplica».
