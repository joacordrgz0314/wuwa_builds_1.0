# Fondo del inicio tipo Rinascita

**Fecha:** 2026-11-16
**Estado:** escrito. Solo CSS; el usuario prueba con `pnpm dev` y opina después.

## Pedido
Cerrar el lado del inicio con un fondo tipo Rinascita, sutil y sin robar atención a las tarjetas. El usuario aprobó el plan con las tres recomendaciones.

## Qué se hizo
- `src/styles.css`: bloque nuevo al final `/* ---- fondo del inicio: atardecer de Rinascita ---- */`.
  - `body`: resplandor dorado arriba, franja ámbar en el horizonte (46 %), turquesa abajo y degradado de cielo a mar; capa oscura encima (0,3 a 0,5).
  - `body::before` (estrellas): opacidad 0,25, máscara que las deja solo en el 45 % superior y titileo propio más suave (`star-twinkle-soft`, 0,15 a 0,3).
- Decisiones: solo CSS (sin imagen de la API), estrellas tenues arriba, fondo estático.

## Notas
- La página de personaje no cambia: su `.char-bg` fijo tapa el fondo del `body`.
- Los bloques anteriores de `body` y `body::before` siguen arriba; el nuevo los sobrescribe.
- Si no gusta, se quita el bloque final y vuelve el fondo anterior.

## Pendientes
- Que el usuario opine sobre colores e intensidad; ajustar según eso.
