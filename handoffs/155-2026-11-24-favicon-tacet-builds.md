# Favicon de Tacet Builds

- Fecha y versión. 2026-11-24, `0.18.2` → `0.18.3`. Parche de identidad visual.
- Pedido y decisión. Usar un rombo hueco y una onda turquesa sobre fondo azul oscuro como icono de la pestaña.
- Archivos. `public/favicon-16.png`, `public/favicon-32.png`, `index.html`, `package.json` e índice de handoffs.
- Verificación. Se revisaron ambas imágenes a tamaño nativo. Vite sirvió el HTML con los dos enlaces y respondió con PNG en ambas rutas. El servidor temporal se cerró. `git diff --check` correcto y hash de `src/data/builds.json` intacto.
- Pendiente. Confirmar la presentación del icono en una pestaña del navegador.
