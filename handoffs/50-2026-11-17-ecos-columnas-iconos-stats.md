# Ecos en dos columnas, divisor e iconos de stats

**Fecha**: 2026-11-17
**Estado**: escrito, sin probar en `pnpm dev`. Solo sintaxis verificada (esbuild) y la función que asigna icono a cada texto de stat (probada con 11 textos). Sin verificar: aspecto de las columnas y del divisor, 1100 px de corte, 390×844 y 844×390.

## Pedido
Sets a la izquierda; eco principal y stats a la derecha; probar una línea divisora; iconos de estadísticas desde la API; coste 3 libre (elemento, ATQ%, recarga de energía u otro).

## Qué se hizo
- `BuildSections.jsx`: `Echoes` y `EchoesEmpty` en dos columnas (`.echo-col-sets` y `.echo-col-stats`), nota debajo; `statIcon` + `StatChip` (icono según el texto); `BuildSections` recibe `elementIcons` para «Daño <elemento>».
- `api.js`: `statIconUrl(key)` con los 6 iconos hallados en `IconAttribute` (script sobre las armas).
- `styles.css` (bloque `ecos-columnas-divisor`): grilla de 2 columnas desde 1100 px, divisor vertical (o horizontal al apilar) con degradado del color del elemento, icono de chip; `.echo-block` hasta 960 px.
- `CLAUDE.md`: regla de composición de Ecos.

## Datos descubiertos
- `Properties` del personaje (y de las armas) traen `Icon` de `IconAttribute`: `T_Iconpropertygreenlife_UI` (PS), `...redattack_UI` (ATQ), `...greendefense_UI` (DEF), `...redbaoji_UI` (Prob. CRIT), `...redcrit_UI` (Daño CRIT), `...greenenergy_UI` (Regen. de energía), `T_IconpropertywpMastery_UI` (Impulso de Ruptura de Tonalidad, solo en el personaje).
- Las armas solo traen 6 stats distintos; faltan iconos de bono de curación y bonos de daño por elemento (el elemento usa el icono del elemento).
- `/property` no es una ruta de la API (devuelve la web). `/echo/{id}` trae `Rarity`, `MainProp`, `SkillId`, `Icon`; no se vio el coste.
- Sets en `builds.json`: `ecos.sets` = una combinación; `ecos.alternativas` = otras combinaciones (p. ej. set Electro ×5; set Nubes ×5; set Electro + Ataque 3 + 2).

## Pendientes
- Si el divisor no gusta, quitar `.echo-col-stats::before`.
- Hsin sin subestadísticas (falta el dato). Lily sin set ni eco principal.
