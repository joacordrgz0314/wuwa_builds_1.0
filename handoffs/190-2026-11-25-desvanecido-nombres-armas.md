# Desvanecido de los nombres largos en Armas

- Fecha y versión. 2026-11-25. Se conserva `0.20.0` como iteración de las fichas de armas.
- Pedido y decisión. Recuperar el desvanecido y el desplazamiento al pasar el mouse para que los nombres largos ocupen una sola línea y la tarjeta conserve su altura. La tarjeta completa sigue siendo el enlace y su nombre accesible conserva el texto completo.
- Archivos. `src/components/WeaponCatalog.jsx`, `src/components/ScrollableRow.jsx`, `src/styles.css` e índice de handoffs.
- Verificación. esbuild y `git diff --check`. Se conservó el hash de builds.
- Pendiente. El usuario revisará visualmente las tarjetas.
