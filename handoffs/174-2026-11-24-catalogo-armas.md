# Catálogo de armas con búsqueda y filtros

- Fecha y versión. 2026-11-24, `0.18.9` → `0.19.0`. Versión menor por sección nueva.
- Pedido y decisión. Habilitar Armas en `#/armas` con icono, nombre, tipo y estrellas. Se ordena por rareza descendente y nombre. La búsqueda admite nombres sin tildes y se combina con los filtros de tipo y rareza. Los datos se cargan en vivo mediante el cliente de Encore existente.
- Archivos. `src/App.jsx`, `src/components/WeaponCatalog.jsx`, `src/styles.css`, `package.json` e índice de handoffs.
- Verificación. Encore devolvió 125 armas con nombre, tipo, icono y rarezas de 1 a 5. esbuild y `git diff --check`. Chrome probó la ruta directa, el menú móvil, la búsqueda, los filtros, el historial y los estados de carga, error y resultados vacíos en una muestra React a 1440 × 900 y 390 × 844 con movimiento reducido. El hash de `src/data/builds.json` se conserva.
- Pendiente. Ver el catálogo completo con las imágenes de Encore en vivo. La ficha individual de arma queda para otro ajuste.
