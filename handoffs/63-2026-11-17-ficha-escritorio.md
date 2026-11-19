# 63 · Jerarquía visual de la ficha en escritorio

**Fecha** 2026-11-17

**Versión** 0.4.1 → 0.5.0. Menor por el ajuste visual de la ficha, sus pestañas y tarjetas.

**Estado** CSS aplicado y navegación verificada. Revisión visual manual pendiente.

## Pedido

Aplicar la propuesta de frontend-design únicamente en escritorio y continuar la fase 04 de Death Note.

## Decisiones del usuario

El diseño se aplica desde 1100 px. Las builds de Suoming y Lily requieren informes completos y revisión antes de cargarse.

## Qué se hizo

- `src/styles.css`: bloque final `ficha-escritorio-jerarquia` con continuidad entre portada y pestañas, tratamiento más discreto del panel y tarjetas alternativas, y mejor diferenciación de DPR y controles.
- `package.json`: versión 0.5.0.
- `docs/DEATH-NOTE.md` y `docs/DEATH-NOTE-CATALOGO.md`: estado y versión actualizados.

## Verificación

Chrome con Vite confirmó las cinco pestañas por clic en 1440×900 y 844×390, toque emulado en 390×844 y teclado en los tres tamaños. El cambio CSS queda dentro de `min-width: 1100px`. No se inspeccionaron capturas ni se confirmó el resultado en pantalla física. El servidor temporal se detuvo.

## Pendientes

Completar DPR, rankings de armas y rotaciones por variante de Suoming y Lily. Revisar visualmente el ajuste en escritorio. Retomar la página de Armas tras las builds mediante un plan propio.
