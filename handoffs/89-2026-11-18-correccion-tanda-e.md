# Corrección de la tanda E

**Fecha** 2026-11-18  
**Versión** `0.10.0` → `0.11.0`  
**Nivel** Menor por corregir la selección de equipos y el comportamiento compartido de modos y variantes.  
**Estado** Datos y sintaxis verificados. Revisión visual a 1440 × 900 pendiente.

## Pedido y decisiones

Cada personaje muestra como máximo cuatro dúos, elegidos por el mejor DPR de cada uno, con todas sus variantes verificadas. Las combinaciones 1 + 2 + 2 y 3 + 2 no muestran signos `+`. Los selectores de modo se ocultan por sección cuando el resultado coincide. Cada configuración alternativa larga conserva su propia fila desplazable y su desvanecido.

## Cambios

- Denia, Hiyuki y Sigrika quedan limitadas a sus cuatro mejores dúos por DPR.
- Sigrika muestra Regen. de energía + ATQ en coste 3 y doble ATQ en coste 1 para el objetivo de 130 %. La nota conserva el cambio a doble ATQ en coste 3 desde 132 %.
- Ecos muestra cada parte de una combinación mediante icono y cantidad de piezas, sin signos `+`.
- Los selectores de Ecos, Armas y Equipos aparecen únicamente cuando cambia el contenido de esa sección.
- Las configuraciones múltiples del panel «Ver variantes» utilizan filas desplazables independientes con desvanecido cuando corresponde.
- `AGENTS.md` y ambos Death Note registran estas reglas como prioridad permanente.

## Archivos tocados

- `src/data/builds.json`: cuatro equipos por ficha y costes de Sigrika.
- `src/components/BuildSections.jsx`: sets, selectores por sección y filas de variantes.
- `src/styles.css`: ancho y desplazamiento de configuraciones múltiples.
- `AGENTS.md`, `package.json`, ambos Death Note e índice: reglas, versión y seguimiento.

## Verificación

- Node validó `builds.json`, la versión `0.11.0` y exactamente cuatro equipos en cada una de las tres fichas.
- Se conservaron todas las variantes de los doce dúos seleccionados. Sigrika + Qiuyuan + Guardacostas mantiene sus configuraciones S0R1 y S0R0 en filas independientes.
- La comparación de modos confirmó selector de Ecos solo para Denia, selector de Armas para las tres fichas y ningún selector de Equipos cuando el contenido coincide.
- esbuild validó la sintaxis de `BuildSections.jsx`.
- La revisión visual a 1440 × 900 no se realizó en esta sesión.

## Pendientes

- Revisar visualmente Ecos, los selectores y las variantes de Sigrika a 1440 × 900.
