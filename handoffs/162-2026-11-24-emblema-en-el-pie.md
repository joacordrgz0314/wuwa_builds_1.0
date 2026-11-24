# Emblema junto al nombre en el pie

- Fecha y versión. 2026-11-24. Se mantiene `0.18.4` por ser una iteración del pie.
- Pedido y decisión. Reutilizar el PNG del emblema a 24 px junto a «Tacet Builds».
- Archivos. `src/App.jsx`, `src/styles.css` e índice de handoffs.
- Verificación. esbuild y `git diff --check`. Chrome comprobó la carga, el tamaño y la alineación en una muestra aislada a 1440 × 900 y 390 × 844. El hash de `src/data/builds.json` se conserva.
- Pendiente. Revisión en la aplicación completa.
