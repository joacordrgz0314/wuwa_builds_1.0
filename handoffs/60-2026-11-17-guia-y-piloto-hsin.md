# 60 · Ajustes de Guía y piloto de Hsin

**Fecha** 2026-11-17  
**Versión** 0.3.0 → 0.4.0. Menor por el panel de variantes, el ranking por modo y la ampliación compatible de la build. La entrega conjunta incluye los ajustes de Guía.  
**Estado** JSX y comportamiento responsive comprobados. Rotaciones por variante pendientes.

## Pedido y decisiones


## Cambios

- `src/components/BuildSections.jsx` y `src/styles.css`: alturas de Guía por panel de referencia, recorte expandible, nombres de modos sin prefijo y popover de tags. Panel independiente de variantes de apoyo y selector de armas por modo.
- `src/data/builds.json`: cuatro equipos de Hsin con DPR, 31 variantes de apoyo, cinco armas por modo y prioridades de Ecos. La rotación general se muestra donde está verificado el modo. Las builds anteriores siguen usando su estructura existente.
- `package.json`: versión 0.4.0. `docs/DEATH-NOTE.md`: avance y pendientes.

## Verificación

- Encore, `/es/character/1212?v=Beta`: `Properties` incluye DEF con `BaseValue: 0` y `GrowthValues` de nivel 90 con `value: 0`. El mapeo presenta el dato recibido. Los listados en inglés confirmaron los IDs de armas y de los apoyos añadidos.
- esbuild transformó el JSX. La comprobación de datos confirmó cuatro equipos con tres miembros y cinco armas por modo.
- Chrome con Vite y Encore en vivo, 1440×900, 390×844 y 844×390: popover al activar el tag, panel de ocho apoyos del primer equipo dentro de la pantalla, cambio del quinto puesto y ausencia de desbordamiento horizontal en las vistas revisadas. Descripción y Stats dieron igual altura en ambos tamaños con dos columnas. En 390 px las alternativas de armas conservan una columna.

## Pendientes

- Verificación manual de aspecto, navegación del popover por teclado y toque real.
