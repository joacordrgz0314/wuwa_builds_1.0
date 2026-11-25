# Rareza azul para armas de tres estrellas

- Fecha y versión. 2026-11-24, `0.18.8` → `0.18.9`. Parche visual.
- Pedido y decisión. Aplicar azul a las estrellas, el borde y el fondo del icono de armas de 3 estrellas. Permitir su inclusión si el rendimiento o la utilidad lo justifican.
- Archivos. `src/styles.css`, `docs/REGLAS-FICHAS.md`, `package.json` e índice de handoffs.
- Verificación. Encore devolvió «Espada de guardián», ID 21020053 y rareza 3. esbuild y `git diff --check`. Chrome comprobó las tres rarezas y el fondo azul en una muestra del componente a 1440 × 900 y 390 × 844 con movimiento reducido. El hash de `src/data/builds.json` se conserva.
- Pendiente. Confirmar el estilo en una ficha del catálogo que incluya un arma de 3 estrellas.
