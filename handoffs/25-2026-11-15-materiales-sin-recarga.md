# Materiales: sin recarga al abrir la pestaña

**Fecha:** 2026-11-15
**Estado:** escrito. Solo se revisó la sintaxis con esbuild; el usuario prueba con `pnpm dev`.

## Pedido
Los materiales cargaban cada vez que se abría la pestaña. El usuario aprobó las tres medidas propuestas.

## Hallazgos (prueba del handoff 24)
- Confirmado por el usuario: retrato en caché funciona tras F5 (Lily, Hsin y otros) y el Errante Electro quedó bien.
- 12 de los 13 retratos faltantes dan 404 en Encore (los archivos no existen). Galbrena sí existe con otra mayúscula: `T_ActivityRoleJiabeilina.webp` (el API trae `...Rolejiabeilina...`), 2048×2032.
- Fandom tiene splash de los 13, pero también trae fondo ilustrado (no transparente) y es lento.

## Qué se hizo
- `src/components/CharacterPage.jsx`: `Materials` se monta cuando el arte ya se decidió (`portraitDone`) o al abrir su pestaña, dentro de un `div hidden` que ya no se desmonta al cambiar de pestaña. Así se piden los datos en segundo plano y volver a la pestaña es instantáneo.
- `src/api.js`: la caché de 24 h gana `items` (Id → `{ name, icon }`). Se guardan solo los ítems cargados bien (no los «Material #id»), con una escritura diferida de 300 ms. `getItems` siembra la caché en memoria con lo guardado.

## Pendientes
- Arte de los 12 personajes sin retrato en Encore (pendiente de decisión) y variante con mayúscula para Galbrena.
- Probar: abrir Materiales, cambiar de pestaña y volver; F5 y abrir Materiales.
