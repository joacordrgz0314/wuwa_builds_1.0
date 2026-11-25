# Fecha de última actualización por ficha

- Fecha y versión. 2026-11-23, `0.16.46` → `0.17.0`. Versión menor por la función de fechado automático del editor.
- Pedido y decisión. Mostrar la última actualización debajo de las etiquetas de elemento y arma. El editor registra el día de Santiago al guardar un cambio real de la ficha. Las fichas antiguas muestran la fecha tras su primer cambio guardado.
- Archivos. `src/editor/local-server.js` guarda la fecha en la ficha editada. `src/components/CharacterPage.jsx` y `src/styles.css` la muestran. `package.json` registra la versión.
- Verificación. esbuild y guardado en una copia aislada. Se comprobaron el guardado con y sin cambios, una ficha nueva, el rechazo de una revisión obsoleta y la conservación de la Guía y las otras fichas. Chrome a 1440 × 900 mostró la fecha debajo de las etiquetas con datos de muestra, también con movimiento reducido.
- Pendientes. Ninguno.
