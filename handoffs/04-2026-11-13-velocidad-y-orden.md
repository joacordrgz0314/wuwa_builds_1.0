# Carga rápida de la grilla y orden del más nuevo al más antiguo

**Fecha:** 2026-11-13
**Estado:** código escrito; NO verificado contra la API real ni con `pnpm build` (sin red en el entorno). La lógica de `api.js` se probó solo con datos simulados en Node.

## Pedido
Acelerar la primera carga sin guardar datos del juego en el proyecto (la web se publicará gratis con un link) y mostrar primero al personaje más nuevo.

## Decisiones del usuario
- Aprobó el plan de velocidad con caché mínima en `localStorage` (sin servicio externo para redimensionar imágenes).
- Aprobó el orden inverso de la grilla, incluido en esta misma entrega.

## Qué se hizo
- `src/api.js`: listado en `es` y `en` en paralelo (el inglés solo da el nombre para derivar el arte; si falla, se cae al detalle); `reverse()` tras quitar duplicados; URL de arte derivada `<prefijo>T_IconRole_Pile_<nombre en minúscula sin símbolos>_UI.webp`, con el prefijo sacado en vivo de un arte real; icono de arma derivado del listado; `bootstrap` pide un detalle por elemento (6 en paralelo) para iconos de elemento y prefijo; `getCharacterArt` queda como respaldo por personaje; caché `wuwa-builds:cache` (24 h) solo con prefijo, iconos de elemento y respaldos; se borra la clave antigua `wuwa-builds:art`.
- `src/App.jsx`: sin barra de avance por conteo; precarga las primeras 14 tarjetas y muestra la grilla; las demás cargan diferidas; iconos de elemento llegan sin bloquear.
- `src/components/CharacterCard.jsx`: recibe `base`, `elementIcon` y `lazy`; si el arte derivado falla, pide el detalle solo de ese personaje (una vez) y, si falla otra vez, usa el icono de cabeza.

## Verificación
- Hecho: prueba en Node con fetch y localStorage simulados (orden inverso, derivación de URL, iconos, respaldo y caché).
- Pendiente (usuario): `pnpm build`; primera carga y recarga con caché; cuántas tarjetas caen al respaldo (pestaña Network, peticiones a `/character/<id>`); iconos en tarjetas y chips; 390×844 y 844×390.

## Pendientes
- Si falla el listado en inglés o no se obtiene el prefijo, todas las tarjetas piden su detalle a la vez (comportamiento lento, sin límite de concurrencia). Se puede limitar si ocurre.
- Medir el peso de un arte; si es alto, valorar aparte un redimensionado externo.
- Fase 2: página de personaje y archivo propio de builds.
