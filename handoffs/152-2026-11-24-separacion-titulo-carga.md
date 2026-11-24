# Separación del título y la barra de carga

- Fecha y versión. 2026-11-24, `0.18.1` → `0.18.2`. Parche visual independiente del cambio de nombre.
- Pedido y decisión. Subir 3 px el bloque de título y subtítulo de carga para despejar la barra.
- Archivos. `src/styles.css`, `package.json` e índice de handoffs.
- Verificación. CSS procesado con esbuild, `git diff --check` correcto y hash de `src/data/builds.json` intacto.
- Pendiente. Revisión visual de la aplicación en escritorio, móvil y con movimiento reducido.
