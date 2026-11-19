# Separación de filas desplazables

**Fecha** 2026-11-18  
**Versión** `0.8.3` → `0.8.4`  
**Nivel** Parche de presentación.  
**Estado** Espacios medidos en Chrome a 1440 × 900.

## Pedido y decisiones

Restaurar el degradado original de 20 px y aumentar el espacio físico entre las filas y los elementos vecinos.

## Cambios

- `src/styles.css` añade 12 px entre las filas de título e integrantes y el número del equipo. Las columnas de las variantes quedan separadas 16 px. Las estadísticas de armas tienen 10 px entre sí y 6 px libres al final de la fila.
- `package.json` e `handoffs/INDEX.md` registran el parche.

## Verificación

- Chrome a 1440 × 900 midió el espacio junto al número en una tarjeta del Errante Electro, entre las estadísticas de un arma de Suisui y entre las columnas de ambos paneles de Lily. Se comprobó el degradado de 20 px con desbordamiento forzado en las cuatro clases de fila.
- Se verificaron altura estable, puntero, teclado y movimiento reducido. El servidor temporal se cerró.
- `git diff --check` terminó sin errores.

## Pendientes

- Revisión responsive en su fase prevista.
