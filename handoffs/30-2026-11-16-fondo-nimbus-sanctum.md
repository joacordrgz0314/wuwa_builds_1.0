# Fondo del inicio: Nimbus Sanctum (reemplaza el mar y Tacet del 29)

**Fecha:** 2026-11-16
**Estado:** escrito, sin probar. La imagen ya está en `public/menu-bg.webp`.

## Pedido
El mar con olas y la marca dibujada no gustaron. El usuario eligió esta imagen oficial de Kuro: `https://hw-media-cdn-mingchao.kurogame.com/akiwebsite/website2.0/images/1756310400000/novsexwx1h56nanrqf-1756378586386.jpeg`. Quiere un fondo de Nimbus Sanctum (mar de nubes, niebla, calma).

## Sobre la imagen
- El usuario la subió al chat (2048×1152, 560 KB, JPEG) y se guardó como `public/menu-bg.webp` (WebP calidad 80, 437 KB). Es local, como pide el documento.
- Muestra árboles rosados, ruinas, hierba clara y un charco con reflejo, con cielo azul y violeta. No se puede confirmar que sea Nimbus Sanctum (no hay mar de nubes) ni que coincida con «colores suaves»; por eso se añadió una capa azulada y más oscura.

## Qué se hizo
- `src/styles.css`: se elimina el bloque del 29 (olas y anillo Tacet dibujado, que era una aproximación) y se agrega `/* ---- fondo del inicio: paisaje de Nimbus Sanctum ---- */`.
  - `html::before`: la imagen con capa oscura (0,45 a 0,68), capa azulada (0,22) y degradado de respaldo; zoom lento (1 a 1,05 en 90 s).
  - `html::after` y `body::after`: dos capas de niebla (70 s y 110 s, sentidos opuestos), solo `transform`.
  - Las estrellas se ocultan en el inicio. La página de personaje no cambia (se ocultan las capas con `:has(.char-bg)`).
  - Sin animación con `prefers-reduced-motion`.
- `public/menu-bg.webp`: la imagen.

## Pendientes
- Que el usuario revise encuadre, saturación y fuerza de las capas; decidir si hace falta un brillo suave sobre el agua.
- Marcellus para el título: falta el archivo de la fuente y su OFL.
- Pantalla de carga y Tacet Mark: sin tocar (falta el recurso original o decidir el logo de texto temporal).
- El título en el código es «WuWa Builds»; el usuario escribió «Builds WuWa» (sin decidir).
