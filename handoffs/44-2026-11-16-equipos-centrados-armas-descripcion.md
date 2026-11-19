# Equipos centrados y armas con descripción

**Fecha**: 2026-11-16
**Estado**: escrito, sin probar en `pnpm dev`. Verificada solo la sintaxis (esbuild) y el parseo de `Desc` con un texto de ejemplo. Sin verificar: aspecto, 1440×900, 390×844, 844×390, que las stats quepan una al lado de otra en las alternativas.

## Pedido
Centrar los equipos (2 por fila); arma principal con la descripción del efecto en el espacio vacío de la derecha; alternativas más anchas, 2 por fila, centradas, stats lado a lado e icono llenando el marco.

## Decisiones del usuario
- Equipos: ancho actual (hasta 400 px), solo centrar.
- Principal igual que antes, con descripción a la derecha; si es larga, unas 5 líneas con «Ver más». Refinamiento 1 en el personaje. En el futuro apartado de Armas: ver por refinamiento, ajustable (aún no se trabaja).
- Alternativas: marco más ancho y stats lado a lado bastan; icono al 100 % del marco.

## Qué se hizo
- `api.js`: `parseWeaponDesc` (quita HTML, deja el primer valor de cada grupo «a/b/c/d/e» y devuelve segmentos `{ text, hl }`); `getWeaponDetail` guarda `passive` (`ResonName`) y `desc`; nuevo `getWeaponDesc`.
- `BuildSections.jsx`: `WeaponDesc` (nombre del pasivo, texto con valores en dorado, «Ver más / Ver menos» si pasa de 5 líneas) solo en la mejor arma; sin `dangerouslySetInnerHTML`.
- `styles.css` (bloque `arma-descripcion-centrado` y ajustes en el bloque anterior): `.build-teams` flex centrado (máx. 814 px, 2 por fila); `.weapon-tiers` máx. 800 px centrado; `.weapon-alts` flex centrado, 2 por fila (1 en ≤600 px), icono 84 px con imagen al 100 %; en la principal la descripción baja debajo en ≤600 px.
- `CLAUDE.md`: regla de armas y equipos actualizada.

## Datos descubiertos
`/weapon/{id}` → `Desc` (HTML con `<span>` dorados y valores «a/b/c/d/e» por refinamiento), `DescParams[{ ArrayString[] }]`, `ResonName` (nombre del pasivo), `ResonLevelLimit` (5), `IconBig`/`IconMiddle`/`IconSmall`.

## Pendientes
- Probar; si un arma trae un «/» ajeno a los refinamientos, el texto saldría cortado.
- Futuro apartado de Armas: refinamientos ajustables (`DescParams` permite construirlo).
