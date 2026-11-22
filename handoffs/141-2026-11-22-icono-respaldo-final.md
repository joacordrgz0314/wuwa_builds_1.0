# Icono de tarjeta solo como respaldo final

- Pedido y decisión. Durante la espera del retrato se muestra el fondo de la tarjeta. El icono cuadrado aparece únicamente si no se consigue el arte de Encore o falla el intento final de cargarlo.
- Archivos. `src/components/CharacterCard.jsx` y `package.json`. Versión 0.16.40.
- Verificación. JSX con esbuild y `git diff --check`. Chrome confirmó que al pausar el arte de Lily no aparece el icono, que el arte carga al reanudarlo y que el icono aparece al bloquear el retrato. Revisión visual a 1440 × 900 y 390 × 844 con movimiento reducido. Vite se detuvo.
- Pendiente. Repetir la compilación de la copia limpia para esta versión antes de publicar.
