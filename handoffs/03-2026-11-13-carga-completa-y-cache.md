# Carga completa de la grilla, corrección de iconos y caché

**Fecha:** 2026-11-13
**Estado:** código escrito; NO verificado (sin red en el entorno, no se corrió `pnpm build`).

## Pedido
Que la grilla cargue completa de una vez y que los iconos de arma y elemento aparezcan siempre (en la prueba del usuario faltaban en algunas tarjetas y desaparecían al limpiar el filtro).

## Decisiones del usuario
- Aprobó: carga previa de todos los detalles con avance, corrección de iconos y caché de 24 h en `localStorage`.

## Causa del fallo de iconos
El listado trae `Element.Icon` y `WeaponType.Icon` como rutas de Unreal sin extensión (`/Game/Aki/UI/...`), que no cargan. Los iconos válidos están en el detalle (`ElementIcon`, `WeaponTypeIcon`). El listado tampoco trae arte de cuerpo completo (campos: Id, Name, QualityId, Element, RoleHeadIcon, WeaponType).

## Qué se hizo
- `src/api.js`: `loadAllArt` pide el detalle de todos (6 a la vez), precarga arte e iconos y reporta avance; caché `wuwa-builds:art` (24 h, solo rutas) con `try/catch`.
- `src/App.jsx`: pantalla de carga con avance; muestra la grilla al terminar; iconos de los chips tomados del detalle.
- `src/components/CharacterCard.jsx`: sin IntersectionObserver; recibe `info` ya cargada.
- `src/styles.css`: bloque `/* ---- carga ---- */`.

## Verificación
Pendiente: `pnpm build`; primera carga (con progreso), recarga con caché, iconos en tarjetas y chips, 390×844, 844×390.

## Pendientes
- Medir el tiempo de la primera carga (65 detalles de ~340 KB).
- Fase 2: página de personaje y archivo propio de builds.
