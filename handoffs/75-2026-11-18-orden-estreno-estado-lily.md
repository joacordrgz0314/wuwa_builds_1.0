# Orden de estreno y estado de la ficha de Lily

**Fecha:** 2026-11-18  
**Versión:** `0.6.4` → `0.6.5`  
**Nivel:** parche por corrección del orden y texto de estado de la tarjeta.  
**Estado:** orden completo y respaldos verificados en Chrome.

## Pedido y decisiones

- Mostrar arriba los estrenos que Encore publique primero.
- Indicar «Ficha en preparación» debajo del nombre de Lily porque faltan el arte definitivo y parte de la build.

## Cambios

- `src/components/CharacterCard.jsx`: muestra el estado de Lily y enlaza el texto al vínculo mediante `aria-describedby`.
- `src/styles.css`: sitúa el estado debajo del nombre con tipografía secundaria.
- `package.json`: versión `0.6.5`.

## Verificación

- Se comprobó que la nota aparece una sola vez, dentro de la tarjeta de Lily y asociada al enlace.
- esbuild validó la sintaxis y `git diff --check` no encontró errores. El servidor temporal se cerró.

## Pendientes

- Retirar el aviso cuando terminen el arte y la build de Lily.
