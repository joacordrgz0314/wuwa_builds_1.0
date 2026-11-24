# Segundo bloque de coste 4 en el editor

- Fecha y versión. 2026-11-24, `0.17.0` → `0.18.0`. Versión menor por la función nueva del editor.
- Pedido y decisión. Añadir o quitar un segundo bloque de coste 4, con 10 px entre el botón de bloque y el de estadística. Coste 3 puede quedar vacío. Se retira el separador «o» de las estadísticas por coste. El catálogo actual carecía de entradas que lo usaran.
- Archivos. `src/editor/main.jsx`, `src/editor/model.js` y `src/editor/editor.css` cubren el formulario, persistencia y espaciado. `src/components/BuildSections.jsx` muestra dos tarjetas cuando se guardan dos líneas de coste 4. `docs/REGLAS-FICHAS.md` documenta el formato y `package.json` registra la versión.
- Verificación. esbuild y `git diff --check`. En una copia aislada se guardó y reabrió el doble coste 4 con coste 3 vacío. También se comprobó una ficha de formato anterior y la conservación de otra ficha. El puerto de Vite quedó cerrado.
- Pendiente. La comprobación visual a 1440 × 900 quedó sin resultado registrado.
