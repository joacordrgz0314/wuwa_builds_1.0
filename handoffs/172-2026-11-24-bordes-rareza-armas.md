# Bordes de rareza y marco blanco en Armas

- Fecha y versión. 2026-11-24. Se conserva `0.18.9` como iteración de la rareza.
- Pedido y decisión. Restaurar el fondo común de la tarjeta. El borde exterior usa dorado, morado o azul según rareza. El icono conserva el marco blanco y el fondo de su rareza.
- Archivos. `src/styles.css` e índice de handoffs.
- Verificación. esbuild y `git diff --check`. Una muestra del ranking de Cartethyia en Chrome confirmó el fondo compartido entre alternativas, los tres bordes y el marco blanco y fondo del icono a 1440 × 900 y 390 × 844. El hash de `src/data/builds.json` coincide con el anterior.
- Pendiente. Revisión con Encore en vivo en la ficha completa.
