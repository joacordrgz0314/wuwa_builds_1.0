# 59 · Guía: ficha ampliada con tags, descripción, stats nv. 90, Forte y modos

**Fecha**: 2026-11-17
**Versión**: 0.2.0 → **0.3.0** (menor: rediseño completo de la Guía con datos nuevos)
**Estado**: escrito, sin probar en pantalla. Solo se revisó la sintaxis con esbuild.

## Pedido
Quitar rol, prioridad de habilidades y sinergia de energía; solo tags arriba (borde y nombre en color de elemento); descripción, stats nv. 90 reales, Forte (Basic Mechanics + imágenes), habilidades y modos de resonancia, todo desde la API de Encore, dinámico por Id.

## Decisiones del usuario
Tags con borde y nombre en color de elemento (ignorando `TagNameColor`); bloques `guia` fuera de la pantalla (el dato queda en `builds.json`); stats malas por leer mal el valor (confirmado con script del personaje 1311).

## Qué se hizo
- `api.js`: el detalle se pide con `?v=Beta`; **corregido el bug de stats**: `GrowthValues[]` trae `value` en minúscula (`{growthId, level, value}`), el código leía `Value` y caía en `BaseValue` (500 y 15000). Nuevos campos: `intro`, `tags` (`TagIcon` + `/resource/Data`), `forte` (`SkillInputs[0]`, sin vacíos), `modes` (`SkillBranches`). `getCharacterGuide` los devuelve; nueva `parseRichText`.
- `BuildSections.jsx`: `Guide` reescrita (tags, descripción, stats, Forte, habilidades, `Modes`), `RichClamp` con «Ver más». Se quitan chips y bloques de texto.
- `styles.css`: bloque `guia-ficha`; se quitan los estilos de chips.
- `CLAUDE.md`: reglas de la Guía. `package.json`: 0.3.0.

## Verificación
Sintaxis de `api.js` y `BuildSections.jsx` con esbuild. No probado contra la API real.

## Supuestos sin confirmar
Forma exacta de `SkillDescList`/`DescList` (se asumen textos, con etiquetas `<span>`, `<color>`, `<b>` o `<br>` quitadas) y si traen `{0}` sin valores; `TagIcon` se usa tal cual con el prefijo. Si el Forte se ve raro, pedir muestra de `SkillInputs[0]`.

## Pendientes
Probar en 1440×900, 390×844 y 844×390 con Hsin (1311), Augusta (1306) y Aemeath (1210).
