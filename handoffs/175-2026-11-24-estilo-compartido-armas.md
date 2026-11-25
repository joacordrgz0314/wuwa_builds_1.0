# Fondo y filtros compartidos en Armas y Personajes

- Fecha y versión. 2026-11-24. Se conserva `0.19.0` como iteración del catálogo de armas.
- Pedido y decisión. Mantener las tarjetas y compartir el ambiente, el estilo de los filtros y el separador con Personajes. La misma instancia del fondo permanece al cambiar de sección.
- Archivos. `src/App.jsx`, `src/components/WeaponCatalog.jsx`, `src/styles.css` e índice de handoffs.
- Verificación. esbuild y `git diff --check`. Chrome con una muestra React comprobó el fondo continuo, los filtros combinados y el encaje a 1440 × 900 y 390 × 844 con movimiento normal y reducido. Un icono de tipo de Encore respondió como WebP.
- Pendiente. Revisar el catálogo con todas las imágenes de Encore en vivo.
