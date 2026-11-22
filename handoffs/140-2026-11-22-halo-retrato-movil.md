# Halo más tenue detrás del retrato en móvil

- Pedido y decisión. A 600 px o menos, el halo del personaje va detrás del retrato y baja de 32 % a 20 % de opacidad en el centro.
- Archivos. `src/styles.css` y `package.json`. Versión 0.16.39.
- Verificación. esbuild y `git diff --check`. Chrome con Hsin y Lily a 360, 390 y 1440 px confirmó la intensidad y el orden de capas, sin desborde horizontal. Vite se detuvo.
