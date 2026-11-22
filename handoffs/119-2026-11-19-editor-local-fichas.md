# Editor local de fichas

- **Versión 0.16.0.** En la rama `feat/build-editor`, abre `/editor.html` después de ejecutar `pnpm dev`. Selecciona un personaje para editar su ficha o usa «Empezar desde cero».
- **Formulario.** Armas, Ecos y Equipos usan los catálogos de Encore. Las estadísticas por coste y las subestadísticas muestran nombre e icono. Los objetivos y las notas son opcionales. Cada dúo admite hasta cinco apoyos.
- **Guardado.** Vite actualiza solo Armas, Ecos y Equipos del personaje elegido. Guía y los datos que usa Materiales se conservan. El editor solo acepta guardados locales y la versión publicada lo excluye.
- **Archivos.** `editor.html`, `src/editor/`, `src/components/BuildSections.jsx`, `vite.config.js`, `package.json` e índice de handoffs.
- **Verificación.** esbuild validó JSX. Chrome a 1440 × 900 y con movimiento reducido comprobó 19 iconos, vista previa y selectores de armas y equipos. Vite guardó una ficha existente y una nueva en una copia aislada, rechazó un origen externo y detectó una revisión obsoleta. La compilación en memoria excluyó el editor.
