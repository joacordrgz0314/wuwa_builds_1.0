# Vista previa e iconos del editor de fichas

- **Versión 0.16.2.** La vista previa carga el catálogo cuando se añaden armas, ecos o sets a un borrador vacío. Las subestadísticas aparecen aunque todavía falten las estadísticas principales.
- **Iconos.** Ataque cargado usa `T_Iconpropertyredfoco_UI.webp` y Habilidad de resonancia usa `T_Iconpropertyredspeed_UI.webp`. Se cotejaron con las imágenes del usuario. Encore sirvió ambos recursos. El editor adapta la etiqueta anterior al abrir una ficha.
- **Formulario.** El personaje, Guardar ficha y la vista previa permanecen a la vista en escritorio. El formulario distingue el arma principal de las alternativas e indica los cambios sin guardar.
- **Archivos.** `src/components/BuildSections.jsx`, `src/constants.js`, `src/editor/`, `package.json` e índice de handoffs.
- **Verificación.** esbuild validó JSX. Chrome a 1440 × 900 con movimiento reducido mostró las armas y el eco guardados de Suoming y actualizó los iconos, el eco, el set y el arma de un borrador vacío. No se guardaron cambios en las fichas durante las pruebas.
