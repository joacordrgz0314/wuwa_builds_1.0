# Portada y selector de refinamiento en Armas

- Fecha y versión. 2026-11-25. Se conserva `0.20.0` como iteración de las fichas de armas.
- Pedido y decisión. Dar al detalle el ancho de Personajes. La portada comparte la tipografía y las etiquetas de Personajes, con el arte de Encore a la derecha, las estadísticas a la izquierda y la pasiva debajo. El indicador de refinamiento se desliza y solo se animan las cifras que cambian. Con movimiento reducido, el cambio es inmediato.
- Archivos. `src/components/WeaponPage.jsx`, `src/styles.css` e índice de handoffs.
- Verificación. esbuild y `git diff --check`. En Chrome a 1440 × 900 se compararon Pacto de sangre y Jiyan con Encore en vivo, se comprobó el ancho y la alineación de ambas fichas y se revisaron las capturas. Se probaron R1–R5 con Tab y flechas, la posición del indicador, las cifras variables y constantes de una pasiva larga, y el movimiento reducido. Se conservó el hash de builds y se detuvo Vite.
- Pendiente. Revisión móvil en la fase responsive. La portada de armas utiliza la imagen de Encore con su encuadre original.
