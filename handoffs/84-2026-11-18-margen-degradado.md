# Degradado más temprano con margen transparente

**Fecha** 2026-11-18  
**Versión** `0.8.2` → `0.8.3`  
**Nivel** Parche de presentación.  
**Estado** Verificado en Chrome a 1440 × 900.

## Pedido y decisiones

El usuario indicó que el ajuste anterior apenas se distinguía y aprobó iniciar el degradado a 44 px del borde y dejar los últimos 8 px transparentes.

## Cambios

- `src/styles.css` ajusta los dos puntos del degradado compartido por estadísticas de armas, títulos de equipo, integrantes y variantes.
- `package.json` e `handoffs/INDEX.md` registran el parche.

## Verificación

- Chrome comprobó los dos puntos calculados y comparó capturas de las mismas filas con los valores de ambas versiones. Hubo diferencias en los cuatro usos con desbordamiento forzado.
- Se verificaron altura estable, puntero, teclado y movimiento reducido. El servidor temporal se cerró.
- `git diff --check` terminó sin errores.

## Pendientes

- Revisión responsive en su fase prevista.
