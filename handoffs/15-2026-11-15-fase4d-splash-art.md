# Fase 4d: Splash Art en la portada del personaje

**Fecha:** 2026-11-15
**Estado:** escrito; sintaxis JSX revisada con esbuild. NO verificado con `pnpm build`, ni en pantalla, ni el enlace directo a Fandom desde la web (sin red en el sandbox).

## Pedido
Usar como portada el «Resonator Splash Art» de la galería de Convene del wiki de Fandom (ilustraciones promocionales), no renders genéricos. Si un personaje no lo tiene (Rover, 4★), mantener el arte actual e indicarlo.

## Hallazgos (consola del usuario)
- Encore no lo expone: `RolePortrait` falla en 13 personajes, `GachaViewInfo[].UnderBgTexturePath` es solo un fondo vacío, `FormationRoleCard` está recortado. Ningún otro campo del detalle sirve.
- La galería (`Convene/Gallery`) lista 45 archivos `Nombre_Splash_Art.png` (2048 px, 4 a 6 MB, 187 MB en total) y 13 `_Cutout` (no se usan).
- La API de Fandom (`api.php`, `origin=*`) responde desde el navegador. Con `iiurlwidth=1024` da una URL reducida; añadiendo `format=webp` carga bien (≈0,5 a 0,7 s).
- Emparejado por nombre en inglés: 45 de 61 personajes, ningún archivo huérfano.

## Decisiones del usuario
1. Enlazar desde Fandom (no guardar imágenes), con el arte actual de respaldo.
2. Caché de las URLs en `localStorage` (24 h), dentro de la caché existente.
3. Portada dividida: texto a la izquierda y splash a la derecha; en móvil, splash arriba.

## Qué se hizo
- `src/data/splash.json` (nuevo): 45 entradas, nombre en inglés sin signos (`slug`) → nombre de archivo. Va por nombre y no por `Id` porque el sandbox no tiene red para leer los Id; el emparejado se verificó por nombre exacto.
- `src/api.js`: `splashKey(character)` (usa `EnName`, sin «The » inicial) y `getSplashUrls()` (una petición a Fandom para los 45; resultado en `store.splash`; si falla devuelve `{}` y se reintenta en la siguiente página). `readStore` incluye `splash`.
- `src/components/CharacterPage.jsx`: efecto que precarga el splash y solo lo usa si cargó; la cabecera pasa a `char-page-head has-splash` con `<img className="char-page-splash">`. Sin splash o si falla, queda el arte anterior sin cambios.
- `src/styles.css`: bloque `/* ---- splash ---- */` al final (dividido en escritorio; columna con splash arriba a ≤700 px; máscara radial suave en el borde).

## Sin splash (se queda el arte actual)
- Rover: Espectro (1501), Aniquilación (1604), Aero (1406), Electro (1309).
- 4★: Yangyang (1402), Chixia (1202), Sanhua (1102), Taoqi (1601), Baizhi (1103), Danjin (1602), Aalto (1403), Mortefi (1204), Yuanwu (1303), Lumi (1504), Youhu (1106), Buling (1307).

## Verificación pendiente (usuario)
`pnpm build`; en `pnpm dev` comprobar que el splash carga enlazado desde la web (si Fandom lo bloqueara, queda el arte actual); revisar que cada imagen sea del personaje correcto; 1440×900, 390×844, 844×390. Al cargar el splash la cabecera cambia de diseño (un salto visual único).

## Pendientes
- Si los splash se ven cortados o muy grandes, ajustar `.char-page-splash`.
- Riesgo conocido: URLs de Fandom ajenas al proyecto (pueden cambiar o bloquearse). Alternativa guardada: alojar los webp en el proyecto (requiere aprobación).
- Fondo tipo Rinascita del inicio y fase 2c siguen pendientes.
