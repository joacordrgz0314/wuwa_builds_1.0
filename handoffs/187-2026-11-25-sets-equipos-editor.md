# Desplazamiento al abrir sets de Equipos en el editor

- Fecha y versión. 2026-11-25. Se conserva 0.19.1. Iteración exclusiva del editor local.
- Pedido y decisión. Los selectores de sets de integrantes y apoyos siguen en línea. Al abrirlos cerca del borde inferior, la página se desplaza hasta mostrar el buscador y los primeros resultados. El selector de sets de Ecos conserva su comportamiento.
- Archivos. src/editor/main.jsx e índice de handoffs.
- Verificación. esbuild y git diff --check. Una muestra React en Chrome a 1440 × 900 y 390 × 844 con movimiento reducido comprobó el buscador y las opciones visibles, la posición estable cuando sobra espacio, Escape y el caso de Ecos.
- Pendiente. Confirmar el flujo con Encore en el editor completo.
