# Materiales centrados, iconos en los títulos e insignia «2.ª opción»

**Fecha**: 2026-11-16
**Estado**: escrito, sin probar en `pnpm dev`. Solo sintaxis verificada (esbuild).

## Pedido
Insignia «2.ª opción» muy apagada; centrar la sección Materiales (no los iconos); icono pequeño a la izquierda de los títulos (cabeza del resonador en blanco, habilidades, tipo de arma solo con arma exclusiva).

## Qué se hizo
- `styles.css` (bloque `materiales-centrados-titulos`): `.weapon-badge.is-alt` con texto claro, borde 55 % y fondo suave; `.mat-section > h3` centrado; `.mat-group` de máx. 560 px centrado con su cuadrícula; `h4` en flex centrado con `.mat-title-icon` (22 px, blanco con `filter`).
- `Materials.jsx`: `Group` y `WeaponMaterials` aceptan `icon`; `Materials` recibe `headIcon` y `weaponIcon`.
- `CharacterPage.jsx`: pasa `RoleHeadIcon` (vía `assetUrl`) y el icono del tipo de arma ya calculado.
- `CLAUDE.md`: regla de Materiales.

## Pendiente
- Icono de «Habilidades y talentos»: falta el campo en `Skills[]` (hay que consultar sus claves en la API).
- El icono de ascensión es la cabeza del propio personaje en silueta blanca; el usuario enseñó un icono de línea blanca de otro estilo: falta ubicar su ruta en la API.
- Probar el centrado de h3 y h4; si queda raro, volver el h3 a la izquierda.
