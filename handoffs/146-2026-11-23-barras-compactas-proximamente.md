# Barras compactas en Próximamente

- Fecha y versión. 2026-11-23, `0.16.44` → `0.16.45`. Parche visual.
- Pedido y decisión. Limitar cada barra a 320 px, alinear el conjunto a la izquierda y acercar las 5★ al nombre.
- Archivos. `src/styles.css` ajusta el ancho y la distribución del encabezado. `package.json` registra la versión. Este handoff y `handoffs/INDEX.md` documentan el ajuste.
- Verificación. CSS procesado con esbuild y `git diff --check` correcto.
- Pendientes. Revisión visual a 1440 × 900 con movimiento normal y reducido. Se rechazó la solicitud de ejecución de Chrome.
