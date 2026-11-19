# Retrato como fondo de la cabecera

**Fecha:** 2026-11-15
**Estado:** escrito (solo CSS). NO verificado con `pnpm build` ni en pantalla.

## Pedido
En el handoff 18 el retrato quedó sin marco, pero sobraba mucho espacio vacío (el archivo es casi cuadrado y el personaje ocupa ~40 % del ancho). Pidió que el arte sea parte del fondo.

## Decisiones del usuario
- Opción A (retrato como capa grande de fondo) y que se mueva con el scroll (no fijo).

## Qué se hizo
- `src/styles.css`: se reemplazó el bloque `retrato completo` por `/* ---- retrato como fondo ---- */`. El retrato pasa a `position: absolute` en la cabecera, a la derecha, `min(780px, 62vw)`, con máscara que lo desvanece de 55 % a 92 % de alto. Brillo del color del elemento detrás (`::before`, radial con `--elem-rgb`). Cabecera con `min-height: clamp(300px, 36vw, 460px)`; texto con `z-index: 1` y `max-width: 46%`; pestañas y panel con `z-index: 1` para quedar sobre el arte. A ≤600 px el arte vuelve al flujo, arriba y centrado (`min(420px, 100%)`, margen -90px para que el texto se solape con el desvanecido) y el brillo se centra.
- Sin cambios en JSX. El arte de respaldo conserva su tarjeta.
- No se añadió desvanecido lateral: los bordes del archivo ya son transparentes.

## Verificación pendiente (usuario)
`pnpm build`; 1440×900, 390×844 y 844×390. Revisar: tamaño y posición del personaje, que las piernas se desvanezcan bajo las pestañas sin molestar la lectura, que el texto no choque con el arte en anchos medios (~700 a 1000 px) y que no haya scroll horizontal.

## Pendientes
- Ajustes finos según lo que se vea (tamaño, desvanecido, brillo).
- Verificaciones abiertas de los handoffs 12 a 18.
