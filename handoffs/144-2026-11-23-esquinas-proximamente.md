# Esquinas suaves en las barras de Próximamente

- Fecha y versión. 2026-11-23, `0.16.42` → `0.16.43`. Parche visual.
- Pedido y decisión. Suavizar las barras de Próximamente con un radio de 6 px en las esquinas derechas y conservar el brillo de la línea del elemento.
- Archivos. `src/styles.css` aplica el radio al extremo opuesto a la línea. `package.json` registra la versión. Este handoff y `handoffs/INDEX.md` documentan el ajuste.
- Verificación. Chrome sin ventana en la portada a 1440 × 900 confirmó las dos esquinas de 6 px, la línea de 2 px y el avance del brillo dentro de su ciclo de tres segundos. Con movimiento reducido, la línea quedó fija.
- Pendientes. Ninguno para este ajuste.
