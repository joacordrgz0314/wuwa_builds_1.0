# Prueba de espaciado y filtros del inicio

- Pedido y decisión. Acercar el contador al buscador, reducir el espacio antes de la cuadrícula y distinguir los grupos de elemento y arma. Separador vertical en escritorio ancho y horizontal en móvil. Se conservan los textos y la franja.
- Archivos. `src/styles.css` y `package.json`. Versión 0.16.34.
- Verificación. CSS procesado con esbuild y `git diff --check`. Portada real en Chrome a 1440 × 900, 390 × 900 y 360 × 900 con movimiento reducido. Se revisaron capturas con la franja y se comprobó la disposición al ocultarla en el navegador. Sin desbordamiento horizontal en los tres anchos. Vite se detuvo.
- Pendiente. Validación del diseño por el usuario. La prueba se puede revertir en el bloque de filtros del CSS.
