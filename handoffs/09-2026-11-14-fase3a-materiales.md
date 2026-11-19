# Fase 3a/3b: materiales de ascensión y nodos de talento

**Fecha:** 2026-11-14
**Estado:** código escrito; sintaxis de `Materials.jsx`, `CharacterPage.jsx` y `api.js` revisada con esbuild; `getCharacterMaterials` y `getItems` probadas en Node con `fetch` simulado (concurrencia máxima 6, deduplicación, caché, respaldo si un ítem falla, totales). NO verificado con `pnpm build` ni contra la API real en el navegador.

## Pedido
Sección «Materiales» en la página de personaje: cantidad y costo en monedas de ascensión y de talentos.

## Decisiones del usuario
- Sección al final, después de «Mejores equipos» (el diseño final se decide en la fase 4).
- Ascensión y nodos de talento en un solo cambio.
- Los materiales de subir habilidades (nv. 1 a 10) quedan para un cambio aparte.

## Qué se hizo
- `src/api.js`: `getDetailInfo` guarda además `breaches` y `skillTree` (solo `Key` y `Value`). Nuevas `getCharacterMaterials(id)` y `getItems(ids)` (`/item/{id}`, concurrencia 6, caché en memoria; si un ítem falla se muestra «Material #id»).
- `src/components/Materials.jsx` (nuevo): totales por material con icono y nombre, monedas aparte, desglose por paso en `<details>`; estados de carga y error.
- `src/components/CharacterPage.jsx`: `<Materials id={Id} />` tras `BuildSections`.
- `src/styles.css`: bloque `/* ---- materiales ---- */` al final.

## Datos de la API descubiertos
- `Breaches[]` del personaje: `{Id, BreachGroupId, BreachLevel, MaxLevel, BreachConsume[{Key,Value}], Items[{Key,Value,Icon,QualityId}]}`. `Items` ya incluye las monedas (`Key: 2`), igual que `BreachConsume`: se suma solo `Items`. El nivel 0 viene vacío. Hsin: 7 pasos.
- `SkillTree[]` son nodos de stats: `{Id, PropertyNodeTitle, PropertyNodeDescribe, Consume[{Key,Value,Icon,QualityId}]}` (Hsin: 8).
- Materiales de subir habilidades: `Skills[i].Consumes = [{SkillId: nivel, Consume[{Key,Value,Icon,QualityId}]}]` (`SkillId` 1 a 10 sería el nivel; el 1 viene vacío). Hsin tiene 10 entradas en `Skills`.
- `/item/{id}`: `Name`, `Icon` (URL completa). Los `Icon` de `Items` y `Consume` son rutas internas sin dominio. `Key: 2` = «Moneda Caparazón».
- `/weapon/{id}`: `Breaches[{Level, LevelLimit, Consume[{Key,Value}], GoldConsume, Items[{Key,Value,Icon,QualityId}]}]`; las monedas van en `GoldConsume`, no en `Items`.

## Verificación
- Pendiente (usuario): `pnpm build`; abrir Hsin, Lily y Suoming (nombres, iconos, totales, desglose); un personaje de 4★; red lenta o API caída; 390×844 y 844×390.

## Pendientes
- Fase 3b-bis: materiales de subir habilidades desde `Skills[].Consumes` (cuidado: se perdería el resto de `Skills`, pedirlo solo con `Consumes`).
- Fase 3c: arma personal 5★ (campo `armaPersonal` en `builds.json` y `/weapon/{id}`).
