# 56 · Más aire bajo los títulos, número de equipo y títulos de zona de Ecos

**Fecha**: 2026-11-17
**Versión**: 0.1.3 → **0.1.4** (parche: márgenes y colores)
**Estado**: escrito, sin probar en pantalla.

## Pedido
Más espacio entre el título de cada sección y su cuerpo; número de equipo (01, 02) y títulos de zona de Ecos (Sets, Eco principal, Stats recomendadas) muy apagados. El usuario pidió que los títulos de zona queden iguales a los subtítulos de Materiales.

## Qué se hizo
- `styles.css`, bloque `titulos-zonas-numeros`: margen título-cuerpo 22 → 32 px (18 → 26 px en móvil); `.team-num` con el color de elemento aclarado al 65 % y opacidad 0.6; `.echo-zone` con el estilo de `.mat-group h4` (Cinzel 1.02rem, color de elemento aclarado, línea inferior fina, sin mayúsculas; 0.92rem en móvil).
- `package.json`: 0.1.4.

## Verificación
Solo CSS, sin probar en pantalla.

## Pendientes
Probar la alineación por filas de Ecos con los nuevos títulos (llevan línea y más alto, ambos iguales). Siguiente: rediseño de la Guía (v0.2.0), con su plan y «aplica».
