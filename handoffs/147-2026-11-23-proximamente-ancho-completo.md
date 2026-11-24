# Distribución a todo ancho en Próximamente

- Fecha y versión. 2026-11-23, `0.16.45` → `0.16.46`. Parche visual.
- Pedido y decisión. Usar todo el ancho de la franja. El nombre y las 5★ quedan a la izquierda y los iconos y etiquetas de elemento y arma, a la derecha. En pantallas estrechas los detalles bajan a una segunda línea.
- Archivos. `src/styles.css` ajusta la distribución. `package.json` registra la versión. Este handoff y `handoffs/INDEX.md` documentan el ajuste.
- Verificación. esbuild y `git diff --check`. Chrome a 1440 × 900 confirmó la distribución y el brillo. Con movimiento reducido la línea quedó fija. A 390 px se confirmó la segunda línea. Se usó el Vite que ya estaba activo en el puerto 5179.
- Pendientes. Ninguno para el ajuste visual.
