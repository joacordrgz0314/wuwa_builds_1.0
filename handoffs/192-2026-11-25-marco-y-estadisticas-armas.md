# Marco y estadísticas del detalle de armas

- Fecha y versión. 2026-11-25. Se conserva `0.20.0` como iteración de las fichas de armas.
- Pedido y decisión. Enmarcar el arte cuadrado de Encore con un fondo oscuro y un borde de rareza. Usar el estilo de estadísticas de Personajes, con icono, etiqueta y valor en Cinzel.
- Archivos. `src/components/WeaponPage.jsx`, `src/styles.css` e índice de handoffs.
- Verificación. esbuild y `git diff --check`. En Chrome a 1440 × 900 se revisó Pacto de sangre con Encore en vivo. El marco midió 265 × 265, ambas tarjetas de estadísticas tuvieron el mismo tamaño y «Regen. de energía» cupo completa. Se conservó el hash de builds y se detuvo Vite.
- Pendiente. Revisión visual móvil en la fase responsive.
