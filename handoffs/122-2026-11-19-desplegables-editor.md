# Desplegables de equipos y sets en el editor

- **Versión 0.16.3.** Solo se abre un equipo a la vez. Añadir un dúo lo abre y cierra el anterior. Al reordenar, el equipo abierto conserva su estado.
- **Sets.** El selector abre dentro del formulario y amplía la página. Los resultados se pueden desplazar dentro de la lista.
- **Archivos.** `src/editor/main.jsx`, `src/editor/editor.css`, `package.json` e índice de handoffs.
- **Verificación.** esbuild validó el JSX. Chrome a 1440 × 900 con movimiento reducido comprobó la apertura, el reordenamiento, la conservación del set elegido y la expansión de la página. La prueba se hizo en un borrador sin guardar.
