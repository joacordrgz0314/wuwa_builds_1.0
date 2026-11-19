# Ajustes de Ecos, armas y equipos de Lynae

**Fecha:** 18 de noviembre de 2026  
**Versión:** 0.12.0 → 0.13.0  
**Nivel:** menor por incorporar una presentación nueva de objetivos de subestadísticas.  
**Estado:** datos y sintaxis JSX verificados; revisión visual a 1440 × 900 pendiente.

## Pedido y decisiones

- Limitar el cambio a la ficha de Lynae.
- Sustituir sus subestadísticas en cadena por cinco objetivos mínimos ordenados.
- Mostrar completo el efecto de su mejor arma debajo de sus estadísticas.
- Cambiar la quinta opción a Llama solar R1 del BP.
- Conservar un decimal en las duraciones verificadas y omitirlo cuando la fuente no lo publique.

## Qué se hizo

- Lynae muestra objetivos de Prob. CRIT, Daño CRIT, Regen. de energía, ATQ y Daño de ataque básico con prioridad visual.
- La descripción del arma principal de Lynae ocupa una fila completa, sin divisor ni «Ver más».
- Las cuatro tarjetas principales y 23 variantes muestran su rotación con un decimal. Diez variantes quedan sin duración por falta de una cifra publicada verificable.

## Archivos tocados

- `src/data/builds.json`: objetivos, ranking y rotaciones verificadas de Lynae.
- `src/components/BuildSections.jsx`: bloque de objetivos, descripción completa y formato decimal.
- `src/styles.css`: jerarquía visual de objetivos y disposición del efecto del arma.
- `package.json`: versión 0.13.0.
- `handoffs/INDEX.md`: registro de este cambio.

## Verificación

- Encore confirmó `21030104` como Llama solar de 4 estrellas en español.
- Node validó cinco objetivos, la quinta arma, cuatro equipos y cobertura explícita de las 37 composiciones.
- Esbuild transformó `BuildSections.jsx` sin errores.
- Vite no pudo iniciarse por una restricción de lectura del sandbox. No se realizó la revisión visual a 1440 × 900.

## Pendientes

- Revisar visualmente Ecos, la mejor arma y Equipos de Lynae a 1440 × 900.
- Completar las diez duraciones pendientes cuando una fuente publique cifras verificables.
