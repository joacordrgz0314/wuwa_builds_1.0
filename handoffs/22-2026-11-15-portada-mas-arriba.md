# Portada: todo más arriba

**Fecha:** 2026-11-15
**Estado:** escrito (solo CSS). No probado en pantalla por mí; el usuario prueba con `pnpm dev`.

## Pedido
Tras probar el handoff 20 (le agrada): el personaje debe verse más arriba; si hace falta, subir todo (nombre, etiquetas y, si es imprescindible, las secciones). El handoff 20 no movía el personaje; la subida propuesta no se había aplicado.

## Observaciones del usuario
- Con retrato completo se ven Lily, Yinlin, Aemeath, Lupa y Hsin, entre otros; Suoming y Jingran (y otros) caen al arte de respaldo 2:3, que se ve con el borde derecho y superior marcados (solo se desvanece abajo y a la izquierda).

## Qué se hizo
- `src/styles.css`: bloque `/* ---- portada: todo más arriba ---- */` (solo >600 px): la cabecera sube con `margin-top: -48px` (nombre, etiquetas, pestañas y panel suben juntos, sin cambiar su espaciado); el retrato completo y su brillo suben además `translateY(-8%)`. El arte de respaldo no se desplaza extra (ya empieza arriba y se cortaría). `.char-page-back` pasa a `position: relative; z-index: 2` para que la cabecera, que se solapa con su fila, no tape el enlace «Volver».

## Pendientes (propuestos, esperan «aplica»)
- Cargar directamente el retrato en lugar de mostrar primero el arte de tarjeta.
- Desvanecer también los bordes superior y derecho del arte de respaldo.
