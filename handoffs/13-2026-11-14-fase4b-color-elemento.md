# Fase 4b: colores por elemento (tarjetas y página de personaje)

**Fecha:** 2026-11-14
**Estado:** código escrito; sintaxis JSX revisada con esbuild. NO verificado con `pnpm build` ni en pantalla.

## Pedido
Fondo estrellado del color del elemento en las tarjetas del inicio, y estrellas del color del elemento en el fondo de la página de personaje.

## Decisiones del usuario
- Aprobó el plan; las estrellas de la página conservan el parpadeo suave (apagado con `prefers-reduced-motion`).
- El arte del personaje como fondo y el fondo tipo Rinascita quedan para pasos siguientes.

## Datos confirmados
`Element.Id` según la API (muestra del usuario): 1 Gelio, 2 Fusión, 3 Electro, 4 Aero, 5 Espectro, 6 Destrucción. Los colores son propuesta mía (ajustables).

## Qué se hizo
- `src/components/CharacterCard.jsx`: clase `elem-<Id>` en el `<article>`.
- `src/components/CharacterPage.jsx`: todo envuelto en `<div className="char-page elem-<Id>">` con una capa `char-bg` fija detrás.
- `src/styles.css`: bloque `/* ---- elemento ---- */` al final: variables `--elem-rgb` y `--elem-deep` por elemento (con valores por defecto si el Id no existe), fondo de tarjeta con estrellas estáticas y degradado del elemento, capa `char-bg` (resplandores, base oscura y estrellas teñidas con parpadeo en `::after`) y marco del arte de la cabecera.

## Verificación
- Pendiente (usuario): `pnpm build`; mirar el inicio (una tarjeta de cada elemento, 5★ con borde dorado), abrir un personaje de cada elemento (fondo teñido, pestañas y Materiales legibles), y 1440×900, 390×844, 844×390. Revisar que `.char-bg` no tape las estrellas del inicio al volver.

## Pendientes
- Fondo tipo Rinascita en el inicio, arte del personaje como fondo (fase 4), luego fase 2c.
- Ajustar los colores si no convencen.
