# Desplazamiento al abrir paneles de Equipos en el editor

- Fecha y versión. 2026-11-25. Se conserva 0.19.1. Iteración exclusiva del editor local.
- Pedido y decisión. Al abrir un equipo o sus apoyos alternativos cerca del borde inferior, desplazar la página para mostrar el encabezado y el comienzo del formulario. Si el panel ya cabe, conservar la posición.
- Archivos. src/editor/main.jsx e índice de handoffs.
- Verificación. esbuild y git diff --check. Chrome verificó ambos paneles a 1440 × 900 y 390 × 844 con movimiento reducido, en una muestra React sin guardar. Se comprobó que el equipo anterior sigue cerrado y que la página permanece en su posición cuando hay espacio. La prueba no guardó builds. El hash de builds cambió durante la sesión por cambios ajenos a esta edición documental y de interfaz.
- Pendiente. Confirmar el flujo en el editor completo.
