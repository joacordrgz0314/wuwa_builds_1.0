# Estrenos, estrellas de filtro y rareza verde en Armas

- Fecha y versión. 2026-11-24. Se mantiene `0.19.0` como iteración del catálogo.
- Pedido y decisión. Ordenar las exclusivas registradas desde el estreno más reciente hasta Jiyan dentro de su rareza. Las armas restantes van por nombre después. En los filtros solo la estrella toma el color de rareza. Las armas de dos estrellas usan verde y el brillo del icono se centra en el catálogo y las fichas.
- Archivos. `src/components/WeaponCatalog.jsx`, `src/styles.css` e índice de handoffs.
- Verificación. Node comprobó un estreno simulado por delante de Lily, Jiyan como cierre y permanentes en orden alfabético. Chrome comprobó el verde, el color del número, el marco blanco y el brillo centrado en una muestra a 1440 × 900 y 390 × 844 con movimiento normal y reducido. esbuild y `git diff --check` correctos.
- Pendiente. Revisar el aspecto en el catálogo con Encore en vivo.
