# Materiales en bloques enmarcados, iconos neutros y fuente de títulos

**Fecha**: 2026-11-16
**Estado**: escrito, sin probar en `pnpm dev`. Solo sintaxis verificada (esbuild). Sin verificar: espaciado de los bloques, 390×844 y 844×390, que la cabeza del Errante se vea bien en blanco, que Cinzel cargue.

## Pedido
El icono de cabeza propio de cada personaje no gustó (irregular). Usar el del Errante en todos; icono general para habilidades (o inventarlo); materiales en bloques enmarcados como las armas, uno bajo otro y centrados; fuente más atractiva en los títulos.

## Qué se hizo
- `CharacterPage.jsx`: `roverHead` = `RoleHeadIcon` del Errante Electro (1309) tomado de `characters`; se pasa como `headIcon`.
- `Materials.jsx`: `Group` acepta `icon` como URL o como nodo; `SkillsIcon` (estrella de cuatro puntas, SVG propio) para Habilidades.
- `styles.css` (bloque `materiales-centrados-titulos`, reescrito): `.mat-group` como tarjeta (borde y degradado del color del elemento, máx. 620 px, relleno 18 px, 18 px entre bloques, línea bajo el título); títulos en Cinzel; ajustes en ≤600 px.
- `index.html`: Cinzel 500/600 desde Google Fonts (sin descargar nada).
- `CLAUDE.md`: regla de Materiales reescrita.

## Datos descubiertos
`Skills[].Icon` ya es URL completa (`.../SkillIconNor/SP_IconNorGun.webp` para el ataque normal; los demás dependen del personaje). No hay icono general de habilidades. `/character/{id}` también trae `RoleHeadIconCircle`, `RoleHeadIconLarge`, `RoleHeadIconBig`, `WeaponTypeIcon`, `ElementIcon6`. No apareció el icono de línea blanca de la captura del usuario.

## Pendientes
- Si el Errante no sale bien en blanco, probar otra variante de cabeza o un SVG propio.
- Si Cinzel no gusta: alternativas Cormorant Garamond o Philosopher.
