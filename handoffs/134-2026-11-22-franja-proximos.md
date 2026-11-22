# Franja de próximos personajes y brillo cada tres segundos

- Pedido y decisión. Retirar manualmente cada entrada de `UPCOMING` al estrenarse. La franja se oculta con la lista vacía. El brillo recorre los bordes durante aproximadamente un segundo por cada ciclo de tres segundos y se desactiva con movimiento reducido.
- Archivos. `src/App.jsx`, `src/styles.css` y `package.json`. Versión 0.16.33.
- Verificación. esbuild y `git diff --check`. Renderizado aislado del inicio con dos, una y cero tarjetas, con filtros presentes en los tres casos. Chrome confirmó la pasada, la pausa y la repetición en una muestra aislada a 1440 × 900. Con movimiento reducido, la animación quedó desactivada.
- Pendiente. Revisión visual en la portada completa.
