# Tarjetas de Armas con enlace completo

- Fecha y versión. 2026-11-25. Se conserva `0.20.0` como iteración de las fichas de armas.
- Pedido y decisión. Toda la tarjeta abre la ficha y se eleva 3 px al pasar el mouse, como en Personajes. El nombre queda sin subrayado y admite varias líneas. La ficha usa «← Volver» con el mismo estilo de Personajes.
- Archivos. `src/components/WeaponCatalog.jsx`, `src/components/WeaponPage.jsx`, `src/styles.css` e índice de handoffs.
- Verificación. esbuild y `git diff --check`. Chrome a 1440 × 900 con Encore en vivo comprobó el clic sobre el icono y el borde, Tab y Enter, el movimiento normal y reducido, y el texto y estilo de «Volver». Se conservó el hash de builds y se detuvo Vite.
- Pendiente. Revisión móvil en la fase responsive.
