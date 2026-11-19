# Sets combinados de Lucy y Rebecca

**Fecha** 2026-11-18  
**Versión** `0.9.0` → `0.9.1`  
**Nivel** Parche por corregir datos y presentación de Ecos y equipos.  
**Estado** Datos y JSX verificados. Revisión visual en Chrome pendiente.

## Pedido y decisiones

Las combinaciones que no usan cinco piezas deben mostrar todos sus sets con icono y cantidad. Las combinaciones 1 + 2 + 2 usan tres iconos y las 3 + 2 usan dos. En coste 3, dos estadísticas iguales se agrupan en una burbuja con `×2`.

## Cambios

- `src/data/builds.json` define Lucy como Shadow of Shattered Dreams 1 + Celestial Light 2 + Eternal Radiance 2, y Rebecca como Shadow of Shattered Dreams 1 + Void Thunder 2 + Lingering Tunes 2. Las mismas combinaciones sustituyen `SPECx2` y `ELECx1` en 70 configuraciones de equipos y variantes.
- `src/components/BuildSections.jsx` muestra todos los iconos de una combinación tanto en Ecos como junto a cada integrante. Cada icono de equipo conserva nombre y piezas en `title`. El analizador agrupa estadísticas idénticas de coste 3.
- `src/styles.css` alinea las insignias de sets y compacta los iconos contiguos de equipos.
- `AGENTS.md`, ambos Death Note, `package.json` e `INDEX.md` registran la regla y el parche.

## Verificación

- Encore confirmó los IDs `32` Shadow of Shattered Dreams, `5` Celestial Light, `11` Eternal Radiance, `3` Void Thunder y `9` Lingering Tunes, incluidos sus efectos de una o dos piezas.
- Node validó el JSON, las 70 configuraciones migradas y la ausencia de los códigos provisionales.
- esbuild validó la sintaxis JSX.

## Pendientes

- Revisar visualmente Ecos, títulos de equipos y paneles de variantes a 1440 × 900.
- Continuar la fase 4 en un chat nuevo con el resumen de cierre.
