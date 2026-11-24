# Emblema circular en el menú y la pestaña

- Fecha y versión. 2026-11-24. Se conserva `0.18.3` como iteración del icono.
- Pedido y decisión. Usar el emblema aprobado de brújula, libro y olas con aro circular. Mostrarlo junto a «Tacet Builds» en el menú y emplear el mismo símbolo en los favicons de 16 y 32 px.
- Archivos. `src/App.jsx`, `src/styles.css`, tres PNG en `public/` e índice de handoffs.
- Verificación. esbuild y `git diff --check`. Chrome cargó el emblema en una muestra aislada del menú a 1440 × 900 y 390 × 844. Se comprobó el encaje y el movimiento reducido. Se revisaron los dos favicons a tamaño nativo. El hash de `src/data/builds.json` coincide con el previo.
- Pendiente. Confirmar el favicon en una pestaña real y el menú en la aplicación completa.
