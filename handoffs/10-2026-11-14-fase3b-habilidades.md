# Fase 3b-bis: materiales de subir habilidades

**Fecha:** 2026-11-14
**Estado:** código escrito; sintaxis revisada con esbuild; extracción probada en Node con datos simulados. NO verificado con `pnpm build` ni contra la API real. Supuesto sin confirmar: que `Consumes` cuelga de cada entrada de `Skills[]` (la muestra del usuario lo cortó justo después de `SkillAttributes`) y que `SkillId` dentro de `Consumes` es el nivel (1 a 10).

## Pedido
Incluir en «Materiales» lo necesario para subir las habilidades (nv. 1 a 10).

## Decisiones del usuario
- Aprobó agregarlo tras ver dónde estaban los datos («aplica»).

## Qué se hizo
- `src/api.js`: `getDetailInfo` guarda `skills` (`name`, `type`, `levels[{level, items[{Key,Value}]}]`); `getCharacterMaterials` lo devuelve.
- `src/components/Materials.jsx`: nuevo grupo «Habilidades (nv. 1 a 10)» antes de los nodos de stats, con totales y desglose «habilidad · nv. N».

## Datos de la API
- `Skills[i].Consumes = [{SkillId: nivel, Consume[{Key,Value,Icon,QualityId}]}]`; el nivel 1 viene con `Consume: []`. Las monedas (`Key: 2`) vienen dentro de `Consume`.

## Verificación
- Pendiente (usuario): abrir Hsin y comprobar que aparece el grupo de habilidades con totales razonables; si sale vacío o duplicado, revisar dónde cuelga `Consumes` (puede haber habilidades repetidas o pasivas sin costo).

## Pendientes
- Fase 3c: arma personal 5★.
