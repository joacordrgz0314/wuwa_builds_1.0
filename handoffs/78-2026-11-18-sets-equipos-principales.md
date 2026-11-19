# Sets de los equipos principales

**Fecha** 2026-11-18  
**Versión** `0.7.1` → `0.7.2`  
**Nivel** Parche de datos y presentación.  
**Estado** 21 tarjetas verificadas en Chrome a 1440 × 900.

## Pedido y decisiones

Mostrar nombre, secuencia, refinamiento e icono de set juntos bajo el título de cada equipo principal. Aplicar el criterio a fichas actuales y futuras, incluidas tarjetas sin variantes.

## Cambios

- `src/components/BuildSections.jsx` comparte el renderizado de cada integrante entre tarjetas y variantes. `src/styles.css` separa los integrantes con un punto medio y permite saltar de línea.
- `package.json`, ambos Death Note e `INDEX.md` registran la versión y la pauta de carga.

## Verificación

- esbuild validó el JSX. Node validó el orden de los integrantes, secuencias, refinamientos y configuraciones repetidas.
- Chrome comprobó las 21 tarjetas de seis fichas a 1440 × 900, incluidos los modos alternativos de Suoming y Lily. Se comprobó la presencia de los tres integrantes, la carga de iconos y la ausencia de desbordamiento horizontal.

## Pendiente

- `SPECx2` queda visible para Lucy en la composición principal de Qingxiao hasta identificar los sets exactos.
