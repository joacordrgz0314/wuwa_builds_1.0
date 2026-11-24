# Desvanecido en subestadísticas de Ecos en móvil

- Fecha y versión. 2026-11-24, `0.18.6` → `0.18.7`. Parche visual.
- Pedido y decisión. Hasta 800 px, el contenido de cada barra queda en una línea deslizable. Se reutiliza el desvanecido de Equipos si queda contenido por ver y el número de prioridad queda fijo a la izquierda. Escritorio conserva el ajuste de texto.
- Archivos. `src/components/BuildSections.jsx`, `src/styles.css`, `package.json` e índice de handoffs.
- Verificación. esbuild y `git diff --check`. Prueba aislada de los componentes React en Chrome a 390 × 844 y 1440 × 900 con movimiento reducido. Se confirmaron las barras cortas y largas, la desaparición del desvanecido al final y la posición fija del número. Se conserva el hash de `src/data/builds.json`.
- Pendiente. Confirmar el gesto táctil en la aplicación completa.
