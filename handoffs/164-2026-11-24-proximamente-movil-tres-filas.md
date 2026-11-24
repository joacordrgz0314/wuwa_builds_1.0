# Tres filas por personaje en Próximamente móvil

- Fecha y versión. 2026-11-24, `0.18.4` → `0.18.5`. Parche visual.
- Pedido y decisión. Hasta 600 px, cada tarjeta presenta nombre y rareza, elemento y arma en filas separadas. La cuadrícula conserva dos columnas y los iconos mantienen su ancho. En escritorio se conserva la distribución.
- Archivos. `src/styles.css`, `package.json` e índice de handoffs.
- Verificación. esbuild y `git diff --check`. En una muestra de Chrome a 390 × 844 se verificaron cuatro personajes de prueba, etiquetas largas y ausencia de desborde. A 1440 × 900 se verificó que los detalles quedan en horizontal. En ambos tamaños se comprobó el brillo con movimiento normal y reducido. El hash de `src/data/builds.json` coincide con el previo.
- Pendiente. Verificación visual en el catálogo completo.
