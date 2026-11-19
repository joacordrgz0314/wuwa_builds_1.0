# 34 · Menú sin adorno central y gotas vistas de frente (2026-11-16)

Estado: escrito, sin probar (sintaxis revisada con esbuild).

## Pedido
El usuario quiere quitar el adorno central del menú (anillos), no le convence que abajo solo diga «Datos: encore.moe» (se ve vacío; pidió añadir otra cosa, pendiente de definir) y rechaza la gota que cae hacia abajo: quiere la gota vista de frente, como antes, pero conservando la forma de estallar y expandirse. La lluvia ascendente queda como está.

## Qué se hizo
- `App.jsx`: fuera `div.side-deco` y el `<i className="drop-fall" />` del `Drop`.
- `styles.css`: fuera `.side-deco` y `side-breathe`; `.side-nav` con `margin-bottom: auto` para que el pie quede abajo del todo. Gotas: se quita `drop-fall`; los anillos ya no son elípticos (`scale(1)`, circulares) y empiezan sin el retardo de la caída (desfase 0, .35, .7 y 1.05 s); el destello central (`.drop-splash`) pasa a círculo de 52 px que estalla y se expande.
- Pendiente: qué añadir abajo del menú (propuesto, sin aplicar).
