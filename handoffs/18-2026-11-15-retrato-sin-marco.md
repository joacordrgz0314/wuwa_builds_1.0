# Retrato sin tarjeta: el arte integrado en la página

**Fecha:** 2026-11-15
**Estado:** escrito (solo CSS). NO verificado con `pnpm build` ni en pantalla.

## Pedido
Lili y Yinlin ya se ven de cuerpo completo (handoff 17), pero dentro de la tarjeta se ve mal; el arte debe quedar integrado en la página.

## Decisiones del usuario
- Aprobó el plan: quitar el marco del retrato, agrandarlo, desvanecer los pies y solapar un poco con las pestañas. Sin brillo de color extra por ahora.

## Qué se hizo
- `src/styles.css`: se reemplazó el bloque `/* ---- retrato completo ---- */`. `.is-portrait` sin borde, fondo ni esquinas; ancho `min(520px, 50vw)`; máscara que desvanece hacia abajo; `margin-bottom: -70px` para solapar con las pestañas; cabecera centrada en vertical (`:has(.is-portrait)`). A ≤600 px: `min(360px, 100%)`, centrado, margen -40px. El arte de respaldo conserva su tarjeta.

## Verificación pendiente (usuario)
`pnpm build`; 1440×900, 390×844 y 844×390. Ver que los pies se disuelvan sin corte, que el solape con las pestañas no tape texto y que funcione `:has` en tu navegador.

## Pendientes
- Brillo de color del elemento tras el personaje (opcional).
- Verificaciones abiertas de los handoffs 12 a 17.
