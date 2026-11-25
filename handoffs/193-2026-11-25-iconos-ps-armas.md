# Iconos de PS en las fichas de armas

- Fecha y versión. 2026-11-25. Se conserva `0.20.0` como iteración de las fichas de armas.
- Pedido y decisión. Corregir los iconos ausentes y revisar la ubicación del arte. Se conserva el recuadro a la derecha de la portada.
- Implementación. `src/api.js` normaliza `UiResources` a `UIResources` en las rutas de iconos de estadísticas de armas.
- Verificación. Se auditaron 125 armas y 250 estadísticas de Encore. Se detectaron cinco referencias de PS con respuesta 404 y se confirmó la ruta corregida como WebP. Chrome a 1440 × 900 comprobó los iconos en Milésima liberación, Originite: Tipo V, Espada de guardián, Llamarada de cometa y Espina de la Desafiadora. Se revisó el arte de Milésima liberación en captura. Pasaron esbuild y `git diff --check`. Se conservó el hash de builds y se detuvo Vite.
- Pendiente. Revisión visual móvil en la fase responsive.
