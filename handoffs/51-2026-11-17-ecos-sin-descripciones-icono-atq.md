# Ecos: sin descripciones en stats y costes, arreglo del icono de ATQ

**Fecha**: 2026-11-17
**Estado**: escrito, sin probar en `pnpm dev`. Solo sintaxis verificada (esbuild) y que todos los textos de stats de `builds.json` resuelvan icono (solo «Bono de curación» queda sin icono, esperado).

## Pedido
Quitar las descripciones en las estadísticas y costes; arreglar los iconos que no aparecen (ATQ%).

## Qué se hizo
- `BuildSections.jsx`: `EchoRow` ya no muestra la nota entre paréntesis («ambos», explicaciones); `parseEchoStats` la sigue separando del stat, sin mostrarla. `statIcon` acepta «ATK» además de «ATQ» (la causa: Hsin tiene «ATK%» en `builds.json`) y `StatChip` muestra «ATK» como «ATQ» para coincidir con el juego.
- La nota general de la sección (`ecos.nota`) se mantiene.

## Pendientes
- Eco principal con el icono del set debajo y, si hay varios sets, eco principal por combinación (decisión del usuario pendiente).
- «Bono de curación» y bonos de daño sin elemento reconocible siguen sin icono.
