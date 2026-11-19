# Subestadísticas finales de Lynae

**Fecha:** 19 de noviembre de 2026  
**Versión:** 0.13.1 → 0.13.2  
**Nivel:** parche por ajustar icono y distribución de valores.  
**Estado:** datos, recurso y sintaxis JSX verificados; revisión visual a 1440 × 900 pendiente.

## Pedido y decisiones

- Mantener el número de prioridad fuera de la burbuja.
- Colocar icono, nombre y valor dentro de una sola burbuja.
- Alinear el valor al extremo derecho.
- Añadir el icono de daño de ataque básico.

## Qué se hizo

- `StatChip` admite un valor opcional dentro de la misma burbuja.
- Las cinco subestadísticas de Lynae ocupan todo el ancho disponible y alinean su objetivo a la derecha.
- Daño de ataque básico utiliza el icono oficial de ataque normal de pistolas de Encore.

## Archivos tocados

- `src/api.js`: URL verificada del icono de ataque básico.
- `src/components/BuildSections.jsx`: reconocimiento del stat y valor dentro de `StatChip`.
- `src/styles.css`: ancho completo y alineación del valor.
- `package.json`: versión 0.13.2.
- `handoffs/INDEX.md`: registro del parche.

## Verificación

- El recurso `SP_IconNorGun.webp` respondió HTTP 200.
- Esbuild transformó `BuildSections.jsx` sin errores.
- Node confirmó cinco objetivos y la versión 0.13.2.

## Pendientes

- Revisar visualmente las subestadísticas de Lynae a 1440 × 900.
