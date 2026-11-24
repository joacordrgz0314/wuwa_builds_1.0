# Enlace de Encore sin subrayado en reposo

- Fecha y versión. 2026-11-24. Se mantiene `0.18.4` como iteración del pie.
- Pedido y decisión. Conservar el turquesa y mostrar el subrayado al pasar el cursor o con foco visible.
- Archivos. `src/styles.css` e índice de handoffs.
- Verificación. esbuild y `git diff --check`. Una muestra aislada en Chrome a 1440 × 900 y 390 × 844 confirmó el color y el subrayado en reposo y con foco visible.
- Pendiente. Confirmación en la aplicación completa con el cursor.
