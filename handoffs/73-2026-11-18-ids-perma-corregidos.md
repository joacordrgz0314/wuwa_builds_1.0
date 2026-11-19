# IDs de armas PERMA corregidos

**Fecha:** 18 de noviembre de 2026  
**Versión:** `0.6.2` → `0.6.3`  
**Nivel:** parche; corrige IDs de armas mostradas con una clasificación equivocada.  
**Estado:** datos verificados contra Encore; revisión visual a 1440 × 900 pendiente.

## Pedido y decisiones

- No mostrar Brillo abrasador ni Maestro de cuerdas como permanentes.
- Cruzar siempre nombre e ID con Encore antes de guardar la selección.

## Qué se hizo

- Hsin usa Ondas cósmicas `21050015` al 100 % en ambos modos.
- Suoming usa Esmeralda del Génesis `21020015` al 100 % en ambos modos.
- Lily conserva Homogeneizador fásico `21030045`, cuyo ID ya era correcto.

## Archivos

- `src/data/builds.json`: cuatro referencias de IDs corregidas.
- `AGENTS.md`: regla de validación exacta de nombre e ID.
- `docs/DEATH-NOTE.md`, `docs/DEATH-NOTE-CATALOGO.md`: estado actualizado.
- `package.json`: versión `0.6.3`.

## Verificación

- Encore en español devolvió: `21050015` Ondas cósmicas, `21020015` Esmeralda del Génesis y `21030045` Homogeneizador fásico.
- Los IDs `21050016` Maestro de cuerdas y `21020016` Brillo abrasador ya no están marcados como permanentes.
- JSON cargado correctamente y `git diff --check` sin errores.

## Pendiente

- Confirmar visualmente los nombres y las insignias a 1440 × 900.
