# Condiciones e iconos de sets en Ver variantes

**Fecha** 2026-11-18  
**Versión** `0.7.0` → `0.7.1`  
**Nivel** Parche de datos y presentación de los paneles.  
**Estado** 146 entradas cotejadas y 17 paneles comprobados por automatización en Chrome a 1440 × 900.

## Pedido y decisiones

El usuario pidió mostrar las condiciones de los tres integrantes y el icono pequeño del set junto a la secuencia y el refinamiento en todas las variantes, incluidas las de futuras tandas.

## Cambios

- `src/data/builds.json` guarda las configuraciones por integrante, en orden DPS principal, sub-DPS y apoyo. Se conservaron los DPR de las variantes y ambas configuraciones de Hiyuki + Lynae + Chisa.
- `src/components/BuildSections.jsx` usa el catálogo de Ecos existente para obtener nombre e icono de los sets. El código publicado queda como respaldo si falta la relación o falla la imagen. También admite el texto previo.
- `src/styles.css` muestra iconos de 16 px y permite que los integrantes salten de línea.
- `package.json`, ambos Death Note y `handoffs/INDEX.md` registran la versión y el criterio para futuras fichas.

## Verificación

- esbuild validó el JSX. Node validó las 146 entradas, el orden de integrantes y las configuraciones compartidas.
- Chrome comprobó a 1440 × 900 el ancho de los diálogos, tres integrantes por configuración, etiquetas de icono, la doble configuración y el respaldo mediante un error de imagen simulado. Se observó carga de iconos reales. El segundo modo de Suoming se verificó en los datos.

## Pendientes

- `SPECx2` aparece en ocho registros y se conserva como texto hasta confirmar los sets exactos que representa.
