# Corrección de builds de escritorio

**Fecha:** 18 de noviembre de 2026  
**Versión:** `0.6.0` → `0.6.1`  
**Nivel:** parche; corrige datos y presentación compartida sin ampliar el catálogo.  
**Estado:** código y datos verificados; revisión visual a 1440 × 900 pendiente.

## Pedido y decisiones

- Mantener el foco exclusivo en escritorio.
- Colocar «Cerrar» arriba a la derecha en todos los paneles flotantes.
- Separar las stats combinadas de coste 3 y mostrar icono y `×2` en coste 1.
- Limitar cada ranking a cinco armas: mejores opciones, permanente competitiva y dos F2P; ninguna de 3 estrellas.
- Mostrar solo DPR y completar el faltante de Suoming DPS principal.

## Qué se hizo

- El parser compartido de Ecos reconoce combinaciones con `+` y cantidades `×N`; cada stat conserva su icono y burbuja.
- Los diálogos mantienen el cierre separado del título y anclado arriba a la derecha.
- Se corrigieron los seis rankings de Hsin, Suoming y Lily, con porcentaje individual, permanente y F2P R5.
- Se actualizaron `AGENTS.md`, ambos Death Note y la versión.

## Archivos

- `src/components/BuildSections.jsx`: parser, burbujas, cierre y distintivos de armas.
- `src/styles.css`: posición del cierre, cantidad de stat y distintivo permanente.
- `src/data/builds.json`: rankings y DPR.
- `AGENTS.md`, `docs/DEATH-NOTE.md`, `docs/DEATH-NOTE-CATALOGO.md`: reglas y estado.
- `package.json`: versión `0.6.1`.

## Verificación

- JSON cargado correctamente.
- JSX de `BuildSections.jsx` y `CharacterPage.jsx` transformado con esbuild.
- Encore confirmó que cada ranking tiene cinco armas de 4 o 5 estrellas, exactamente dos F2P y ninguna de 3 estrellas.
- Los seis rankings y el DPR faltante se comprobaron mediante script.
- Vite respondió HTTP 200 y el servidor temporal fue detenido.
- `git diff --check` sin errores.

## Pendientes

- Revisar visualmente Hsin, Suoming y Lily a 1440 × 900 con datos reales de Encore.
- No extender todavía las builds al resto del catálogo; hacerlo en tandas posteriores aprobadas.
