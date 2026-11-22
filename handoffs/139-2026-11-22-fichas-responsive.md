# Fichas sin desborde horizontal en móvil

- Pedido y decisión. Ajustar el ancho del contenido, permitir que las pestañas ocupen dos filas y limitar el ancho de las tarjetas de Armas. Las filas desplazables conservan el desplazamiento interno.
- Archivos. `src/styles.css` y `package.json`. Versión 0.16.38.
- Verificación. esbuild y `git diff --check`. Chrome con Encore en vivo y movimiento reducido en cinco tamaños entre 360 × 800 y 1440 × 900. Cuatro personajes y cinco pestañas en cada tamaño, con ascensión cargada y tres diálogos de variantes por tamaño. Sin desborde global. Materiales quedó visible y una fila de apoyos de Hsin se desplazó 29 px a 360 px. Vite se detuvo.
- Pendiente. Instalación limpia y prueba de publicación en Vercel Preview desde un teléfono real.
