# 68 · Títulos de sección sin fondo en escritorio

**Fecha** 2026-11-17

**Versión** 0.5.4 → 0.5.5. Parche visual para mejorar la lectura sin tapar el retrato.

**Estado** CSS aplicado y comprobación estática realizada. Aspecto pendiente de revisión visual.

## Pedido y decisiones del usuario

Quitar el fondo oscuro de los títulos de sección y reemplazarlo por una sombra de texto breve. Mantener el panel exterior a 0.55 y las tarjetas interiores.

## Qué se hizo

- `src/styles.css`: se retiraron fondo, relleno y geometría del título en el bloque de escritorio; se añadió `text-shadow` oscuro.
- `package.json`: versión 0.5.5.
- `docs/DEATH-NOTE.md`, `docs/DEATH-NOTE-CATALOGO.md` y `handoffs/INDEX.md`: estado y versión actualizados.

## Verificación

`git diff --check` sin errores. La regla modificada está dentro de `min-width: 1100px`, por lo que 390×844 y 844×390 conservan sus estilos; 1440×900 recibe la sombra. No se inspeccionaron capturas ni se probó la respuesta visual en navegador.

## Pendientes

Revisar el contraste del título sobre el retrato en escritorio. La fase 04 del catálogo sigue pendiente.
