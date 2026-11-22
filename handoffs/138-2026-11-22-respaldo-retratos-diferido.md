# Carga diferida del respaldo de retratos

- Pedido y decisión. Solicitar enseguida el detalle de respaldo de las tarjetas prioritarias y diferir el de las demás hasta que se acerquen a 200 px de la pantalla. Se usa la carga inmediata si el navegador carece de IntersectionObserver. La precarga y la caché existentes se conservan.
- Archivos. `src/components/CharacterCard.jsx` y `package.json`. Versión 0.16.37.
- Verificación. JSX con esbuild y `git diff --check`. Chrome con perfil nuevo a 1440 × 900 y Encore en vivo. La primera fila estuvo visible con siete imágenes a los 5,3 s. A los 600 ms siguientes dos seguían mostrando el icono de respaldo. Se observaron 27 consultas de detalle antes de bajar, frente a 47 en la prueba anterior. Lumi cargó al bajar y Jianxin al filtrar. Vite se detuvo.
- Pendiente. Comparar el tiempo de retrato definitivo entre versiones con la misma instrumentación.
