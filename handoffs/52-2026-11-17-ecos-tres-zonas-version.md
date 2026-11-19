# 52 · Ecos en tres zonas, espacio de títulos y versión visible

**Fecha**: 2026-11-17
**Versión**: 0.0.1 → **0.1.0** (menor: rediseño completo de la sección Ecos y función nueva, la versión visible; línea base del versionado)
**Estado**: escrito, sintaxis revisada con esbuild, sin probar en pantalla.

## Pedido
Ecos en tres zonas (sets a la izquierda, ecos principales a la derecha, stats recomendadas abajo y centradas), eco principal más atractivo y menos invasivo, algo más de distancia entre título y cuerpo, y número de versión visible como regla permanente. Orden de arriba abajo tanto en sets como en ecos principales, aprovechando el lado derecho.

## Decisiones del usuario
«Aplica recomendado» a las 5 propuestas: dos columnas siempre (ecos unidos al set por el icono del set), nombre del eco al lado con `title` completo, `ecoPrincipal` opcional dentro de cada `alternativas[i]` (sin campo = mismo eco, no se repite), costes en fila, eco sin tarjeta con brillo. Añadió que los ecos también van hacia abajo (una fila por set, a la derecha de cada set). El versionado empieza ahora como línea base 0.1.0.

## Qué se hizo
- `BuildSections.jsx`: `Echoes` y `EchoesEmpty` reescritos con `EchoLayout` (columnas alineadas por fila), `EchoShow` (eco con insignia del set arriba a la derecha) y `EchoStats` (zona de abajo). Filas = combinación principal + `alternativas`; etiqueta «Eco principal» o «Ecos principales» según haya 1 o varios.
- `styles.css`: se quitaron las reglas muertas de `ecos-columnas-divisor` (queda `.echo-chip-icon`); bloques nuevos al final `ecos-tres-zonas`, `titulos-espaciado` (22 px, 18 px en móvil) y `version-visible`.
- `App.jsx`: `import { version } from '../package.json'`; se muestra bajo «Datos: encore.moe» y en la línea legal móvil.
- `package.json`: versión 0.1.0.
- `CLAUDE.md`: sección «Versionado» (regla obligatoria), formato de handoff e `INDEX` con versión, y reglas de diseño de Ecos actualizadas.

## Verificación
Sintaxis de `App.jsx` y `BuildSections.jsx` con esbuild. Sin revisar visualmente: alineación por subgrid (desde 1100 px), insignia del set, costes en fila, 390×844 y 844×390. Ninguna build usa aún varios ecos (`alternativas[i].ecoPrincipal`), así que ese modo no se ve hasta tener datos.

## Pendientes
- Probar y recoger feedback del nuevo diseño de Ecos.
- Llenar `ecoPrincipal` en alternativas cuando haya builds con varios sets.
- Costes en fila desde 1100 px (no 900 px): el ancho útil junto al menú de 240 px lo pedía.
- Guía: solo diseño primero; luego contenido.
