# Equipos sin límite y títulos editables

- **Versión 0.16.4.** El editor y el guardado admiten cualquier cantidad de equipos y variantes de apoyo. Cada equipo tiene un título editable. Al dejarlo vacío se usan los nombres del dúo.
- **Archivos.** `src/editor/`, `src/components/BuildSections.jsx`, `docs/REGLAS-FICHAS.md`, `package.json` e índice de handoffs.
- **Verificación.** Chrome a 1440 × 900 y con movimiento reducido comprobó cinco equipos y siete apoyos, además del título personalizado en el desplegable y la vista previa. Node verificó la validación del guardado y la reapertura del título. esbuild validó el JSX. Las pruebas se hicieron sin guardar cambios en el catálogo.
