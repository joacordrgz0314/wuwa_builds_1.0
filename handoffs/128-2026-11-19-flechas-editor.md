# Navegación por personajes en el editor

- **Versión 0.16.9.** Las flechas junto al selector permiten pasar al personaje anterior o siguiente en el orden de estreno. Se desactivan en los extremos y durante el guardado.
- **Borradores.** Las flechas y el desplegable llaman a la misma función de apertura, que solicita confirmación si hay cambios sin guardar.
- **Archivos.** `src/editor/main.jsx`, `src/editor/editor.css`, `package.json` e índice de handoffs.
- **Verificación.** esbuild validó JSX. La revisión en Chrome queda pendiente.
