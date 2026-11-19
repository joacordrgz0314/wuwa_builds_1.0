# Revertir Splash Art y portada; arte a la derecha

**Fecha:** 2026-11-15
**Estado:** escrito; sintaxis JSX revisada con esbuild. NO verificado con `pnpm build` ni en pantalla.

## Pedido
El splash cargó bien, pero en algunos personajes tardaba. Además, el recorte de la portada (4c) hacía zoom y solo se veía la cara. Volver al diseño anterior, con el arte a la derecha.

## Decisiones del usuario
- Quitar todo el código del splash (opción recomendada).
- Volver al arte de siempre (`FormationRoleCard`, marco 2:3), sin el recorte de la portada, y colocarlo a la derecha.

## Qué se hizo
- `src/api.js`: eliminados `splashKey`, `getSplashUrls`, el import de `splash.json` y el campo `splash` de la caché.
- `src/data/splash.json`: borrado.
- `src/components/CharacterPage.jsx`: eliminados el efecto y el estado del splash; la cabecera vuelve a ser `char-page-head` con el texto primero y el `<img>` del arte después (queda a la derecha).
- `src/styles.css`: eliminados los bloques `portada` y `splash`; nuevo bloque `/* ---- arte a la derecha ---- */` con `html { overflow-y: scroll }` (se conserva: evita el salto de ancho entre pestañas), `justify-content: space-between` y, a ≤600 px, el arte arriba (`order: -1`).

## Para retomar el splash (descartado, no borrado de la historia)
- Fuente: galería `Convene/Gallery` de wutheringwaves.fandom.com; 45 archivos `Nombre_Splash_Art.png` (2048 px, 4 a 6 MB). La API `api.php` con `iiurlwidth=1024` y `format=webp` daba la URL reducida (≈0,5 a 0,7 s en la prueba).
- Sin splash: los 4 Rover y 12 personajes de 4★ (Yangyang, Chixia, Sanhua, Taoqi, Baizhi, Danjin, Aalto, Mortefi, Yuanwu, Lumi, Youhu, Buling).
- Si se retoma, la lentitud se resolvería alojando los webp en el proyecto (requiere aprobación, por la regla de no guardar datos del juego).

## Verificación pendiente (usuario)
`pnpm build`; 1440×900, 390×844 y 844×390: arte a la derecha en escritorio, arriba en móvil, sin salto de ancho entre pestañas.

## Pendientes
- Fondo tipo Rinascita en el inicio; fase 2c (builds del resto).
- Los pendientes de los handoffs 12 a 14 (verificación del usuario) siguen abiertos.
