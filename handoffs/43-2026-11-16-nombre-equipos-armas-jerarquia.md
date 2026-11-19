# Nombre de Yangyang, equipos en tarjetas, armas con jerarquía y stats

**Fecha**: 2026-11-16
**Estado**: escrito, sin probar en `pnpm dev`. Verificada solo la sintaxis (esbuild). Sin verificar: aspecto, wrap del nombre en pantallas angostas, que el icono de las stats cargue.

## Pedido
Icono de elemento al lado de «Xuanling»; armas sin descripción y con stats; equipos solo con iconos, título y nombres de los integrantes; soportar 1 o más de 3 equipos; jerarquía clara en las armas.

## Decisiones del usuario
- Equipos: no ancho completo (le parecía raro); se eligió tarjetas de ancho cómodo con número grande tenue, título y nombres.
- Stats de arma al nv. 90; las armas alternativas pequeñas debajo de la mejor, también con stats.

## Qué se hizo
- `styles.css` (bloque `nombre-equipos-armas-jerarquia`): `nowrap` en `.char-page-name-end` y `.char-page-name { width: max-content; max-width: calc(70 * var(--vw)) }` (en ≤600 px vuelve a `auto`); tarjetas de equipo (`auto-fill`, máx. 400 px, no se estiran con 1 equipo); `.team-grid` flex; `.weapon-main` grande y `.weapon-alts` pequeñas; chips de stats.
- `BuildSections.jsx`: `Teams` con número, título, nombres y solo iconos (el rol queda en `title`); `Weapons` con `WeaponCard`, `WeaponStats` y jerarquía Mejor / 2.ª opción; la `nota` ya no se muestra; `WeaponsEmpty` con el mismo formato.
- `api.js`: `getWeaponDetail` (una sola petición por arma para materiales y stats), `getWeaponStats`, `getWeaponMaterials` reutiliza el detalle.
- `CLAUDE.md`: reglas de equipos (sin rol visible, 1 o más de 3) y armas (jerarquía, sin descripción, stats).

## Datos descubiertos
`/weapon/{id}` → `Properties[0..1]`: `{ Name, Icon, BaseValue, GrowthValues[{ Level, Value }] }` (principal y secundaria; valor al nv. 90 = último de `GrowthValues`; ATQ como "587.50" y Prob. CRIT como "24.30%"). `FirstPropId`/`SecondPropId` solo traen Id y valor base. `Icon` viene como `/Game/.../T_X.T_X`; se pide como `/resource/Data/Game/.../T_X.webp` (sin comprobar).

## Verificación
Sintaxis JSX con esbuild y prueba de la regex del icono. No revisado: 1440×900, 390×844, 844×390.

## Pendientes
- Probar y confirmar nombre de Yangyang, equipos, armas y stats (si el icono de la stat no carga, queda solo el texto).
- `builds.json`: la `nota` de las armas sigue en los datos (limpiar en la fase de contenido).
- Ecos y Guía (diseño), después contenido de las builds.
