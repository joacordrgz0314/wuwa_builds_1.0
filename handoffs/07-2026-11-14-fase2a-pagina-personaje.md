# Fase 2a: ruteo por hash y página de personaje (esqueleto)

**Fecha:** 2026-11-14
**Estado:** código escrito; sintaxis JSX revisada con `tsc` (sin errores de sintaxis); NO verificado con `pnpm build` ni en navegador (sin red).

## Pedido
Fase 2, parte 2a: ruteo, cabecera de personaje y secciones vacías. Las builds llegan en 2b.

## Decisiones del usuario
- Ruteo por hash sin dependencia nueva (`#/personaje/<id>`).
- Esta tanda solo cubre 2a; luego se revisa antes de seguir.
- Formato de builds: un solo `src/data/builds.json` por `Id` (se crea en 2b).
- Primeros personajes con build (2b): los últimos 2 o 3 del listado (hoy Lily, Suoming, Hsin; se confirma al empezar 2b).

## Qué se hizo
- `src/App.jsx`: `readRoute()` lee el hash; estado `routeId` + listener `hashchange` (sube al inicio de la página); con ruta muestra `CharacterPage`, sin ruta la grilla. Filtros y búsqueda se conservan al volver porque `App` no se desmonta.
- `src/components/CharacterCard.jsx`: la tarjeta va envuelta en `<a href="#/personaje/<Id>">` con `aria-label` del nombre.
- `src/components/CharacterPage.jsx` (nuevo): enlace «← Volver», arte (misma derivación y respaldo por detalle que la tarjeta), nombre, estrellas, elemento y arma; secciones Guía, Sets de ecos, Mejores armas y Mejores equipos con «Aún sin build». Si el Id no existe: «No se encontró ese personaje.»
- `src/styles.css`: bloque «char-page» al final (cabecera en fila; en ≤600 px en columna).

## Verificación
- Hecho: revisión de sintaxis con `tsc`; la regex de ruta se probó en Node.
- Pendiente (usuario): `pnpm build`; abrir una tarjeta y volver (filtros intactos); abrir un link directo `#/personaje/<id>` y recargar; Id inexistente; 1440×900, 390×844 y 844×390.

## Pendientes
- 2b: `builds.json`, muestras acotadas de `/echo` y `/weapon` desde la consola, y 2–3 personajes de ejemplo.
- Al volver desde una página, la grilla no recuerda el scroll.
- Rover: solo una entrada por nombre en la grilla; el link usa el Id de esa entrada.
