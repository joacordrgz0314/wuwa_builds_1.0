# Brillo recurrente en el adelanto

- Pedido y decisión. Sustituir el destello inicial por un brillo que recorre de arriba abajo el borde de color durante el primer segundo de cada ciclo de ocho segundos. Empieza tras la pantalla de carga. Con movimiento reducido el borde queda estático.
- Archivos. `src/styles.css` y `package.json`. Versión 0.16.32.
- Verificación. esbuild y `git diff --check`. Chrome a 1440 × 900 confirmó la pasada, pausa, repetición y movimiento reducido en una muestra aislada con la hoja real.
- Pendiente. Valorar el efecto en la portada completa.
