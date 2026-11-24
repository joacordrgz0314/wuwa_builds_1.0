# Espacio inferior del subtítulo de carga

- Fecha y versión. 2026-11-24. Se mantiene `0.18.2` por ser una iteración del punto 5.
- Pedido y decisión. Añadir 2 px de espacio inferior al subtítulo para despejar la cola de la «g» de Wuthering.
- Archivos. `src/styles.css` e índice de handoffs.
- Verificación. esbuild y comparación visual en una muestra aislada de Chrome a 1440 × 900 con movimiento reducido. La «g» se ve completa tanto con el degradado como con color sólido. El hash de `src/data/builds.json` se conserva.
- Pendiente. Confirmación visual en la aplicación completa y en móvil.
