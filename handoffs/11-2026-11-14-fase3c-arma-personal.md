# Fase 3c: materiales del arma personal (5★)

**Fecha:** 2026-11-14
**Estado:** código escrito; sintaxis revisada con esbuild; `getWeaponMaterials` probada en Node con `fetch` simulado. NO verificado con `pnpm build` ni contra la API real en el navegador. Supuesto sin confirmar: que `/weapon/{id}` devuelve `Breaches` en la raíz con `Level`, `LevelLimit`, `GoldConsume` e `Items[{Key,Value}]` (así lo describía el resumen de traspaso; no se vio una muestra en este chat).

## Pedido
Sección de materiales del arma personal en la página de los personajes 5★.

## Decisiones del usuario
- Aprobó la lista completa de armas personales y confirmó las 6 dudosas: Lucilla, Yangyang: Xuanling, Luuk Herssen y Sigrika por descarte; Rebecca = Skull Thrasher y Lucy = Spectral Trigger.
- Los Errantes y los 5★ estándar sin arma propia (Verina, Encore, Calcharo, Jianxin, Lingyang) no llevan la sección. Yinlin sí (Stringmaster).

## Qué se hizo
- `src/data/builds.json`: clave `_armaPersonal` (Id de personaje → Id de arma, 40 entradas) al final. Va aparte de las builds para que `builds[Id]` no se vuelva truthy en personajes sin build.
- `src/api.js`: `getWeaponMaterials(id)` (caché por Id; guarda `level`, `max` e `items`; suma `GoldConsume` como `Key: 2`).
- `src/components/Materials.jsx`: componente `WeaponMaterials` (grupo «Arma personal: <nombre>» con totales, monedas y desglose) tras los grupos del personaje; recibe `weaponId`.
- `src/components/CharacterPage.jsx`: pasa `weaponId` solo si `QualityId === 5` y hay entrada en `_armaPersonal`.

## Fuentes de las parejas
Dos fuentes o más: Lynae, Cartethyia, Ciaccona, Galbrena, Mornye, Aemeath, Denia, Hiyuki, Suisui, Qingxiao, Jingran, Suoming, Jiyan, Jinhsi, Xiangli Yao, Changli, Camellya, Zhezhi, Shorekeeper, Roccia, Carlotta, Brant, Phoebe, Cantarella, Zani, Lupa, Phrolova, Augusta, Iuno, Yinlin. Hsin y Lily: `builds.json`.
Una sola fuente o por descarte: Chisa (Kumokiri) y Qiuyuan (Emerald Sentence), más las 6 que confirmó el usuario.

## Ids de armas
Ver `_armaPersonal`; los Ids salen de `GET /en/weapon` (QualityId 5).

## Verificación
- Pendiente (usuario): `pnpm build`; abrir Hsin (arma 21050116) y un 5★ antiguo (p. ej. Jiyan) y comprobar el grupo «Arma personal» (nombre, totales, monedas); un 4★ y el Errante no deben mostrarlo; probar un 5★ sin arma (Encore). Si sale error, pedir muestra de `/weapon/21050116` con `Breaches[1]`.

## Pendientes
- Fase 4 (diseño final y responsive), luego fase 2c (builds del resto).
