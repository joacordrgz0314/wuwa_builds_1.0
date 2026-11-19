# Desplazamiento al pasar el puntero y sets de Lily

**Fecha** 2026-11-18  
**Versión** `0.7.3` → `0.7.4`  
**Nivel** Parche de interacción y corrección de datos.  
**Estado** Verificado en Chrome a 1440 × 900.

## Pedido y decisiones

Desplazar de ida y vuelta las filas que desbordan al pasar el puntero. Conservar el acceso por teclado, respetar movimiento reducido y preservar las dos configuraciones de Chisa. Corregir el set de Lucilla y Qiuyuan en los equipos de Habilidad de Eco de Lily.

## Cambios

- `src/components/BuildSections.jsx` desplaza las filas aplicables a 32 px/s, pausa 650 ms en cada extremo y se detiene al retirar el puntero. El movimiento también se detiene al pulsar una tecla en la fila.
- `package.json` e `INDEX.md` registran el parche.

## Verificación

- esbuild validó el JSX. Node comprobó ambos sets y DPR. `git diff --check` terminó sin errores.
- Chrome a 1440 × 900 comprobó la ida y vuelta, la detención al retirar el puntero, movimiento reducido, una variante de una sola configuración, las dos filas de Chisa y la carga de ambos iconos de Nubes iluminadas.

## Pendientes

- Revisión responsive en la fase prevista.
