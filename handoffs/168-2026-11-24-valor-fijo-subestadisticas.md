# Valor fijo en subestadísticas móviles

- Fecha y versión. 2026-11-24. Se conserva `0.18.7` como iteración del punto 7.
- Pedido y decisión. Mantener visible el valor a la derecha. Solo el icono y el nombre se deslizan y se desvanecen cuando hay contenido pendiente. El número de prioridad sigue fijo.
- Archivos. `src/components/BuildSections.jsx`, `src/styles.css` e índice de handoffs.
- Verificación. esbuild y `git diff --check`. En una muestra React en Chrome a 390 × 844, los valores cortos y largos quedaron visibles y el valor y la prioridad mantuvieron su posición durante el desplazamiento. A 1440 × 900 se comprobó el encaje de escritorio. La prueba se hizo con movimiento reducido. Se conservó el hash de `src/data/builds.json`.
- Pendiente. Confirmar el gesto táctil en la aplicación completa.
