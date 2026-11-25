# Rareza y apertura adaptable en los selectores del editor

- Fecha y versión. 2026-11-25. Se conserva 0.19.1. Ajuste exclusivo del editor local.
- Pedido y decisión. Mostrar las estrellas a la derecha de las opciones de armas, ordenadas de mayor a menor rareza y por nombre en los empates. Los selectores flotantes abren hacia arriba si falta espacio abajo y disponen de desplazamiento interno. El selector de sets mantiene su apertura en línea.
- Archivos. src/editor/catalog.js, src/editor/main.jsx, src/editor/editor.css e índice de handoffs.
- Verificación. esbuild y git diff --check. Chrome a 1440 × 900 y 390 × 430 con movimiento reducido verificó ambas direcciones de apertura, foco, Escape, estrellas alineadas, orden, búsqueda, selección y sets en línea. La prueba usó los componentes del editor con datos simulados, sin guardar. Se conservaron el hash de builds y la versión.
- Pendiente. Confirmar el comportamiento en el editor completo con Encore en vivo.
