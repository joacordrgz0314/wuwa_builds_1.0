# Menú móvil desplegable que se oculta al bajar

- Fecha y versión. 2026-11-24, `0.18.7` → `0.18.8`. Parche del menú móvil.
- Pedido y decisión. Hasta 800 px, barra de 49 px con emblema, nombre y botón de tres líneas. El panel se cierra con el botón, al elegir Personajes o con Escape. Cerrada, la barra vuelve al subir y permanece visible arriba. Abierta, permanece visible al desplazarse.
- Archivos. `src/App.jsx`, `src/styles.css`, `package.json` e índice de handoffs.
- Verificación. esbuild y `git diff --check`. Chrome probó App con datos simulados a 1440 × 900, 390 × 844 y 320 × 700, con movimiento normal y reducido. Se verificaron apertura, Escape con retorno del foco, selección de Personajes, transición a ficha, umbral, direcciones de desplazamiento y regreso al inicio. El hash del catálogo se conserva.
- Pendiente. Confirmar el gesto táctil y el aspecto en la aplicación con datos en vivo.
