# Inicio deshabilitado con etiqueta Pronto

- Fecha y versión. 2026-11-24. Se conserva `0.18.6` como iteración del menú.
- Pedido y decisión. «Inicio · Pronto» queda deshabilitado igual que Armas. Personajes es la sección activa y el catálogo sigue siendo la vista por defecto. Se conserva `#/personajes` y la navegación a fichas.
- Archivos. `src/App.jsx` e índice de handoffs.
- Verificación. esbuild y `git diff --check`. En una muestra de Chrome a 1440 × 900, 390 × 844 y 320 × 700 con movimiento reducido se verificaron el encaje y que Inicio no recibe foco ni cambia la ruta al pulsarlo. El hash de `src/data/builds.json` se conserva.
- Pendiente. Confirmar en la aplicación completa. La futura portada definirá el destino de Inicio.
