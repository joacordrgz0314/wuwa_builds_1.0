# Títulos de sección con el estilo de Materiales

**Fecha**: 2026-11-16
**Estado**: escrito, sin probar en `pnpm dev`. Sin verificar: aspecto de los títulos en Guía, Sets de ecos, Armas y Equipos; 390×844.

## Pedido
Poner el mismo diseño del título «Materiales» a las demás secciones, solo los títulos.

## Qué se hizo
- `styles.css` (bloque `materiales-centrados-titulos`): la regla `.mat-section > h3` pasa a `.char-page-section > h3` (Cinzel 600, 1.3 rem, centrado, espaciado 0.1 em, 16 px abajo; en ≤600 px 1.1 rem). El color sigue siendo el del elemento (regla existente).
- `CLAUDE.md`: línea nueva sobre los títulos.

## Datos descubiertos (para Ecos, sin aplicar)
`GET /{lang}/echo` → `Echo[]`: `Id, Name, Rarity, Icon (IconMonsterHead), IconMiddle, IconSmall, PhantomType, Element{Id,Name,Icon}, Type, Attributes, FetterGroups[]`. Cada set: `{ Id, Name, Icon (por personaje, p. ej. ...AttriXin.webp), Fetters[{ Id, Key: 2|5, Name, EffectDescription }] }`. `EffectDescription` trae marcadores `{0}`, `{1}`, `{2}` sin valores en esta respuesta (sin coste del eco ni valores).
