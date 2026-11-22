# Destello en los bordes del adelanto

- Pedido y decisión. Probar un destello de 600 ms en el borde de color de Anna y Lucielle. Se reproduce una vez al entrar al inicio, tras desaparecer la pantalla de carga. Con movimiento reducido el borde queda estático.
- Archivos. `src/styles.css` y `package.json`. Versión 0.16.31.
- Verificación. esbuild y `git diff --check`. En Chrome a 1440 × 900, una muestra aislada con la hoja real confirmó la espera de la pantalla de carga, la duración, los colores y el comportamiento con movimiento reducido.
- Pendiente. Evaluar el destello en la portada completa.
