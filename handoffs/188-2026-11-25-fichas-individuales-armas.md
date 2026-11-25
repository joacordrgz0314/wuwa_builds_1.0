# Fichas individuales de armas con refinamiento

- Fecha y versión. 2026-11-25, `0.19.1` → `0.20.0`. Versión menor por la nueva vista pública.
- Pedido y decisión. Abrir una ficha desde el nombre del arma en el catálogo y admitir acceso directo por `#/armas/:id`. Mostrar icono, tipo, rareza, estadísticas al nivel máximo y pasiva con R1–R5 cuando Encore entrega valores por refinamiento.
- Implementación. `src/api.js` comparte la caché de detalle y conserva R1 para las fichas de personajes. `src/App.jsx` mantiene la búsqueda y los filtros en memoria. `src/components/WeaponCatalog.jsx`, `src/components/WeaponPage.jsx` y `src/styles.css` cubren navegación, presentación y estados de carga, arma inexistente y reintento. `package.json` registra la versión.
- Verificación. esbuild y `git diff --check`. Chrome a 1440 × 900 con movimiento reducido y Encore en vivo comprobó Pacto de sangre, arte, R1–R5 por teclado, una sola consulta de detalle, R1 a través del acceso usado por las builds, enlace directo, regreso con Atrás, filtros recuperados y arma inexistente. Se simuló un fallo de red y se recuperó una ficha de tres estrellas al reintentar. Se conservó el hash de `src/data/builds.json` y se detuvo Vite.
- Pendientes. Revisión visual móvil en la fase responsive. La publicación corresponde al usuario.
