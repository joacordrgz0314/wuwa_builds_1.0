# Armas de Suisui, variantes de Lily y filas desplazables

**Fecha** 2026-11-18  
**Versión** `0.8.0` → `0.8.1`  
**Nivel** Parche por correcciones de datos y presentación.  
**Estado** Datos y sintaxis verificados. Interacciones probadas en Chrome a 1440 × 900.

## Pedido y decisiones

Ordenar las armas de los apoyos por aporte al equipo, considerando rotación y regeneración de energía, y seguir mostrando el porcentaje individual publicado. Completar variantes de los dúos de apoyo ya cargados. Aplicar el desplazamiento de las filas de integrantes a los títulos de equipo y a las estadísticas de armas. Mostrar el selector de modo en Equipos cuando existan listas distintas.

## Cambios

- `src/components/BuildSections.jsx` y `src/styles.css` comparten el desplazamiento horizontal entre estadísticas, títulos y filas de integrantes. El selector del Errante Electro se conserva en Ecos y Armas. Equipos presenta su lista común directamente.
- `docs/DEATH-NOTE-CATALOGO.md` recoge la pauta de armas por rol. `package.json` y `handoffs/INDEX.md` registran el parche.

## Verificación

- Node comprobó cinco armas para Suisui y 18 variantes para Lily. esbuild validó el JSX y `git diff --check` terminó sin errores.
- Chrome a 1440 × 900 comprobó el desbordamiento forzado del título de Xuanling + Errante y de las estadísticas de un arma de Suisui. Se verificaron altura estable, desplazamiento con puntero y teclado, y movimiento reducido. Se abrieron ambos paneles de Lily con nueve variantes cada uno y se comprobó la doble configuración. Se verificó el selector del Errante en las tres pestañas.

## Pendientes

- Revisión responsive en su fase prevista.
