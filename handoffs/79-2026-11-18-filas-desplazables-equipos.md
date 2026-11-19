# Filas desplazables en equipos

**Fecha** 2026-11-18  
**Versión** `0.7.2` → `0.7.3`  
**Nivel** Parche de presentación e interacción.  
**Estado** Verificado en Chrome a 1440 × 900.

## Pedido y decisiones

Mantener el nombre, la secuencia, el refinamiento y el set de cada integrante en una sola línea en las tarjetas principales y en variantes con una sola configuración. Las variantes con dos configuraciones publicadas, como Chisa con `S0 R1` y `S0 R0`, mantienen filas separadas.

## Cambios

- `src/components/BuildSections.jsx` comparte la fila desplazable y detecta desbordamiento. Cuando hay contenido fuera de vista, la fila admite foco y desplazamiento con las flechas.
- `src/styles.css` mantiene los integrantes en una línea e indica con un degradado si queda contenido a la derecha.
- `package.json` e `INDEX.md` registran el parche.

## Verificación

- esbuild validó el JSX. `git diff --check` terminó sin errores.
- Chrome a 1440 × 900 forzó desbordamiento en una tarjeta de Lynae y una variante de una sola configuración. La altura de ambas filas permaneció estable. Se comprobó el desplazamiento por teclado, la desaparición del degradado al llegar al final y las dos filas de Chisa.

## Pendientes

- Revisión responsive en la fase prevista.
