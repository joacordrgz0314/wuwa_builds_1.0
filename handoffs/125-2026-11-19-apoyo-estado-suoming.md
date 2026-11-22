# Apoyo, estado de ficha e imágenes de Suoming

- **Versión 0.16.6.** El editor permite que el personaje de la ficha sea el apoyo principal. Los roles y sets se conservan al guardar y reabrir el equipo.
- **Estado.** La casilla «Ficha en preparación» controla el aviso al lado de las pestañas y en la portada. Lily conserva el aviso por defecto hasta guardar una decisión distinta.
- **Suoming.** Se corrige la capitalización de las tres rutas de Mecánicas básicas para usar los recursos de Encore.
- **Archivos.** `src/editor/`, `src/api.js`, `src/constants.js`, `src/components/CharacterCard.jsx`, `src/components/CharacterPage.jsx`, `src/styles.css`, `package.json` e índice de handoffs.
- **Verificación.** esbuild validó JSX. Chrome a 1440 × 900 con movimiento reducido cargó las tres imágenes y comprobó el aviso, la casilla, el rol y la vista previa. Una copia aislada confirmó el guardado y la reapertura del rol y de ambos valores de la casilla.
