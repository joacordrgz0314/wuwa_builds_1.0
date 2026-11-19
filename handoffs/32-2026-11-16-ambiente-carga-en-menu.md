# Ambiente de la pantalla de carga en el menú de personajes

**Fecha:** 2026-11-16
**Estado:** escrito. Solo se revisó la sintaxis de `App.jsx` con esbuild; el usuario prueba con `pnpm dev`.

## Pedido
El usuario prefiere el fondo de la pantalla de carga para el menú de personajes: lluvia hacia arriba y el efecto de gota con anillos, repetido en puntos al azar. Además, el título de la carga debe ir en dos líneas: «Builds» / «Wuthering Waves».

## Qué se hizo
- `src/App.jsx`: componente `Drop` (anillo de agua que, al terminar cada ciclo, reaparece en otro punto al azar con `onAnimationIteration`) y un bloque `.ambient` que solo se monta en el inicio (`routeId == null`): 18 partículas ascendentes (las mismas `LOADER_PARTICLES`) y 5 gotas con retrasos escalonados. Título de la carga en dos `<span>`.
- `src/styles.css`: se elimina el bloque de la imagen y la niebla (handoff 31: `html::before`, `html::after`, `body::after`, `fog-a`, `fog-b`) y se agrega `.ambient` (mismo fondo oscuro con brillo turquesa de la carga), `.drop` (dos anillos, `drop-ring` de 7 s) y selectores compartidos con las partículas de la carga. Se mantiene `body { background-attachment: scroll }`.
  - Título de la carga: «Builds» pequeño con tracking amplio y «Wuthering Waves» en grande (`clamp(1.8rem, 6vw, 3rem)`).
  - Con `prefers-reduced-motion` se ocultan partículas y gotas.
- El `h1` del menú sigue «Builds WuWa».

## Notas
- `public/menu-bg.webp` (imagen del handoff 31) queda sin usar; se puede borrar o recuperar para volver a ese fondo. La niebla ya no existe (se puede reponer).
- La página de personaje no cambia (el `.ambient` no se monta ahí).

## Pendientes
- Que el usuario pruebe: cantidad y fuerza de las gotas, partículas y fluidez del scroll.
- Tacet Mark original para la carga.
