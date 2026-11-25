# Orden de estreno, nombres largos y títulos de catálogo

- Fecha y versión. 2026-11-24. Se conserva `0.19.0` como iteración del catálogo de armas.
- Pedido y decisión. Ordenar primero por rareza y luego por el personaje asociado, desde Lily hasta Jiyan. Las armas restantes quedan al final de su rareza por nombre. Se reutilizan las 40 asociaciones del catálogo. Se suma Bloodpact's Pledge por ID 21020046 para el Errante Aero, verificado por nombre inglés en Encore y por asociación en la guía oficial. Los otros cinco IDs revisados quedan sin asociación confirmada para este orden.
- Presentación. Los nombres de armas comparten la fila desplazable de Equipos. Personajes y Armas comparten estilo de título.
- Archivos. `src/App.jsx`, `src/components/WeaponCatalog.jsx`, `src/components/ScrollableRow.jsx`, `src/components/BuildSections.jsx`, `src/styles.css` e índice de handoffs.
- Verificación. Node comprobó 41 asociaciones y prioridad de rareza. Chrome comprobó el orden de muestra, la altura estable, el desplazamiento, el desvanecido y ambos títulos a 1440 × 900 y 390 × 844 con movimiento normal y reducido. esbuild, `git diff --check` y hash del catálogo verificados.
- Pendiente. Revisión visual en la aplicación completa con las imágenes de Encore.
