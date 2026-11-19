# Retrato directo (sin salto de arte) y bordes del arte de respaldo

**Fecha:** 2026-11-15
**Estado:** escrito. Solo se revisó la sintaxis de `CharacterPage.jsx` con esbuild; el usuario prueba con `pnpm dev`.

## Pedido
Al abrir un personaje se veía primero el arte de tarjeta y luego el de cuerpo completo; quería ver directamente el completo. Además, desvanecer los bordes superior y derecho del arte de respaldo.

## Decisiones del usuario
- Opción A (no mostrar imagen hasta saber si hay retrato, con fundido). Sin B (caché del retrato en `localStorage`) ni C (precarga al pasar el mouse) por ahora.
- Aprobó el desvanecido de los bordes del arte de respaldo.

## Qué se hizo
- `src/components/CharacterPage.jsx`: nuevo estado `portraitDone`. Mientras se pide el detalle y se precarga el retrato se renderiza un marcador vacío `char-page-art is-portrait is-pending` (mantiene el layout y el brillo, sin imagen). Al terminar (retrato cargado, sin retrato, error o 6 s de espera) se muestra la imagen: retrato o, si no hay, el arte de respaldo. Si el retrato llega después de los 6 s, reemplaza al respaldo.
- `src/styles.css`: bloque `/* ---- portada: entrada suave y bordes del arte de respaldo ---- */`: marcador oculto, fundido de opacidad de 0,4 s (desactivado con `prefers-reduced-motion`) y máscara del arte `is-card` que ahora desvanece arriba, abajo, izquierda y derecha.

## Efecto esperado
Personajes con retrato: entra directo. Sin retrato: el arte de respaldo aparece tras la consulta del detalle (algo más tarde que antes). Si molesta, opciones B y C.

## Pendientes
- Probar: sin salto en Lily, Yinlin, Aemeath, Lupa y Hsin; respaldo en Suoming y Jingran; Rover y 4★.
- Fondo tipo Rinascita en el inicio; fase 2c (builds del resto); rediseño final.
