# Fondo del inicio: mar en movimiento y marca Tacet (reemplaza el atardecer del 28)

**Fecha:** 2026-11-16
**Estado:** escrito. Solo CSS; el usuario prueba con `pnpm dev` y opina.

## Pedido
El atardecer del handoff 28 no gustó. Quiere un fondo ligado a WuWa y al mar: mar en movimiento y marcas Tacet. Preguntó si había un fondo real de Rinascita en el API (sin sobrecargar la web).

## Hallazgos
- La raíz del API (`/api`) solo trae `apiList` y los idiomas; no lista fondos ni pantallas. Desde el sandbox no se puede buscar en los recursos de Encore, así que no hay fondo real todavía.
- Si apareciera una imagen real: `.webp` de menos de ~1 MB, cargada detrás de la grilla y con el fondo CSS de respaldo.

## Qué se hizo
- `src/styles.css`: se elimina el bloque «atardecer de Rinascita» (vuelven el fondo y las estrellas originales) y se agrega al final el bloque `/* ---- fondo del inicio: mar y marca Tacet ---- */`:
  - Dos capas de olas en SVG (turquesa y violeta, opacidad 0,3 y 0,35) en `html::after` y `body::after`, fijas abajo, a distinta velocidad y sentido (38 s y 26 s).
  - Anillo Tacet en `html::before` (SVG propio: círculos, marcas y rombo central), arriba a la derecha, opacidad 0,16, giro de 300 s.
  - Todo se oculta en la página de personaje (`:has(.char-bg)`) y se queda quieto con `prefers-reduced-motion`. Solo se anima `transform`.

## Pendientes
- Título con estilo WuWa: sin decidir (opción recomendada: buscar el logo en Encore; si no hay, fuente libre de Google Fonts, con aprobación).
- Que el usuario opine sobre intensidad y posición.
