# Ajuste vertical del retrato de Suoming

**Fecha:** 2026-11-16
**Estado:** escrito. Solo se revisó la sintaxis con esbuild; el usuario prueba con `pnpm dev`.

## Pedido
Con las rutas del handoff 26 todo se ve bien, pero el retrato de Suoming (1312) queda más arriba que los demás. Se aplica solo si no cambia la altura de nada más.

## Hallazgo
Todos los retratos usan el mismo CSS (ancho `min(900px, 70vw)`, `translateY(-8%)`); la diferencia viene del encuadre de cada archivo. `transform` es solo visual: no altera el layout (secciones, nombre, elemento y arma).

## Qué se hizo
- `src/styles.css`: el `translateY(-8%)` de la portada pasa a `translateY(var(--art-shift, -8%))`; sin variable, todo igual que antes.
- `src/components/CharacterPage.jsx`: `PORTRAIT_SHIFT = { 1312: '-2%' }` y la cabecera pone `--art-shift` solo si el personaje está en el mapa.

## Notas
- Solo aplica en pantallas de más de 600 px (en móvil el retrato no lleva ese desplazamiento).
- El valor `-2%` es inicial; se afina probando y otros personajes se agregan al mismo mapa.
