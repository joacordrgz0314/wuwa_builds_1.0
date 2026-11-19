# 35 · Pie del menú con aviso de sitio de fans (2026-11-16)

Estado: escrito, sin probar (sintaxis revisada con esbuild).

## Pedido
Añadir abajo del menú algo más que «Datos: encore.moe»: aviso de sitio de fans y propiedad de Kuro Games. La lluvia se queda como está (el usuario explicó que sube por el mar etérico del lore; no se agrega ningún mar).

## Qué se hizo
- `App.jsx`: `.side-foot` pasa a `div` con línea fina y rombo (`.side-rule`), «Sitio de fans, no oficial», «Wuthering Waves es propiedad de Kuro Games» y «Datos: encore.moe». Párrafo `.app-legal` con el mismo texto al final de `main` (solo en ≤ 800 px, donde el pie del menú está oculto).
- `styles.css`: `.side-foot`, `.side-rule` y `.app-legal` (en el bloque «menú lateral»).

## Contexto legal (informativo, no es asesoría)
Condiciones y guía de obras derivadas de Kuro (wutheringwaves.kurogames.com/p/en/produce.html): cubren textos, imágenes y videos; excluyen juegos, software y obras comerciales; Kuro puede pedir retirar contenido; sin permiso escrito no se usan marcas, logos ni dominios. Por eso: web gratis, sin publicidad ni donaciones, sin logos de Kuro, sin copiar contenido del juego al proyecto. Se evita el símbolo © a propósito.
