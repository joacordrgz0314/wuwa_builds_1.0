# Corrección visual de Lynae y rotaciones enteras

**Fecha:** 19 de noviembre de 2026  
**Versión:** 0.13.0 → 0.13.1  
**Nivel:** parche por corregir presentación y restaurar duraciones.  
**Estado:** datos y sintaxis JSX verificados; revisión visual a 1440 × 900 pendiente.

## Pedido y decisiones

- Mantener el alcance exclusivo en Lynae.
- Igualar el divisor de subestadísticas al divisor superior de Ecos.
- Adaptar los objetivos al lenguaje visual de WuWa Builds.
- Acercar el efecto de la mejor arma al icono.
- Restaurar todas las duraciones de rotación a segundos enteros.

## Qué se hizo

- El bloque de subestadísticas reutiliza el degradado de Ecos, los iconos y las burbujas de stats. La prioridad usa intensidades del color del elemento.
- El efecto completo del arma principal conserva su fila inferior con menos separación vertical.
- Se retiró el mapa de rotaciones decimales. Las 37 composiciones vuelven a usar su campo `rotacion` entero.

## Archivos tocados

- `src/components/BuildSections.jsx`: presentación de objetivos y rotaciones originales.
- `src/styles.css`: divisor, filas de objetivos y separación del efecto del arma.
- `src/data/builds.json`: retirada de las rotaciones decimales de Lynae.
- `package.json`: versión 0.13.1.
- `handoffs/INDEX.md`: registro de esta corrección.

## Verificación

- Node confirmó 37 composiciones y 37 duraciones enteras, sin `rotacionesExactas`.
- Esbuild transformó `BuildSections.jsx` sin errores.

## Pendientes

- Revisar visualmente Ecos y la mejor arma de Lynae a 1440 × 900.
