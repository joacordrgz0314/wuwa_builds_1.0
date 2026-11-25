# Portada de armas en móvil vertical

- Fecha y versión. 2026-11-25. Se conserva `0.20.0` como iteración de Armas.
- Pedido y decisión. En pantallas estrechas, mantener nombre, estrellas y tipo a la izquierda y centrar el arte encima de las estadísticas. El refinamiento y la pasiva siguen alineados a la izquierda. En tamaños más anchos se conservan las dos columnas.
- Archivos. `src/components/WeaponPage.jsx`, `src/styles.css` e índice de handoffs.
- Verificación. esbuild y `git diff --check`. En Chrome con Encore en vivo se revisó Milésima liberación a 390 × 844, 844 × 390 y 1440 × 900. En vertical se confirmó el centrado, el arte visible y la selección de R5 mediante toque emulado. Se conservó el hash de builds y se detuvo Vite.
- Pendiente. Revisión en dispositivo físico si se requiere.
