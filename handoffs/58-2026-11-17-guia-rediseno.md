# 58 · Guía rediseñada: chips, stats base, habilidades y texto en bloques

**Fecha**: 2026-11-17
**Versión**: 0.1.5 → **0.2.0** (menor: rediseño completo de una sección)
**Estado**: escrito, sin probar en pantalla ni contra la API real.

## Pedido
Opción A de la Guía (chips rápidos, stats base nv. 90, iconos de habilidades, texto en tarjetas) más el texto en bloques. Recomendaciones aceptadas: solo las habilidades principales y el rol tomado del primer equipo.

## Qué se hizo
- `api.js`: `getDetailInfo` suma `stats` (`Properties` del personaje, hasta 5; valor = último de `GrowthValues` o `BaseValue`) y `icon` en cada habilidad; nuevo `getCharacterGuide(id)`.
- `BuildSections.jsx`: componentes `Guide` y `GuideLive` (con `key` por personaje). Chips: rol (del primer equipo donde aparece), elemento, tipo de arma y estrellas. Stats con iconos (primero `statIcon` por nombre, respaldo el icono de la API). Habilidades: solo las que tienen materiales de nivel (las 5 subibles; no depende de `SkillType`).
- `builds.json`: `guia` acepta texto o bloques; Lily (3 bloques), Hsin (2) y Suoming (1) repartidos sin añadir contenido. En el texto de Lily, «ATK» pasó a «ATQ».
- `styles.css`: bloque `guia-diseno`. Los títulos de bloque no llevan línea inferior (como en Ecos).
- `CLAUDE.md`: nota sobre el formato de `guia`.
- `package.json`: 0.2.0.

## Supuestos sin confirmar (verificar al probar)
- Forma de `Properties[].GrowthValues` del personaje (se asume lista de números o de `{ Level, Value }`) y si los valores de CRIT salen como «5 %». Si los números se ven raros, hay que pedir una muestra de `/character/{id}` → `Properties`.
- Que `Skills[].Icon` sea una URL válida (o ruta que `assetUrl` complete).

## Pendientes
Probar la Guía en 1440×900, ~1000 px, 844×390 y 390×844; revisar los iconos de habilidades y los valores de las stats.
