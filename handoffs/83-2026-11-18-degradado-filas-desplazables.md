# Inicio del degradado en filas desplazables

**Fecha** 2026-11-18  
**Versión** `0.8.1` → `0.8.2`  
**Nivel** Parche por ajuste visual.  
**Estado** Verificado en Chrome a 1440 × 900.

## Pedido y decisiones

Adelantar el desvanecimiento de la derecha en todos los apartados que comparten filas desplazables. El usuario aprobó pasar de 20 a 28 px desde el borde.

## Cambios

- `src/styles.css` fija el inicio del degradado compartido en `1.75rem` para estadísticas de armas, títulos de equipo, integrantes y variantes.
- `package.json` e `handoffs/INDEX.md` registran el parche.

## Verificación

- Chrome a 1440 × 900 verificó el valor calculado de 28 px con desbordamiento forzado en los cuatro usos. También comprobó altura estable, puntero, teclado y movimiento reducido.
- `git diff --check` terminó sin errores. El servidor temporal se cerró.

## Pendientes

- Revisión responsive en su fase prevista.
