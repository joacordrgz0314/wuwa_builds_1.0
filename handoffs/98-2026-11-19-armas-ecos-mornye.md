# Armas y Ecos de Mornye

- **Versión 0.13.5.** La ficha reutiliza el formato de Lynae para el efecto completo de Calibrador estelar R1 debajo del icono y para los cinco objetivos numerados de Ecos.
- **Ajuste posterior.** En 0.13.6, por indicación del usuario, la ficha pasó a mostrar DEF (3500), Daño CRIT (210%) y Prob. CRIT (20%). El [handoff 99](99-2026-11-19-subestadisticas-mornye.md) registra esas decisiones.
- **Archivos.** `src/data/builds.json`, `src/components/BuildSections.jsx`, `package.json` e índice de handoffs.
- **Verificación.** JSON y sintaxis JSX con esbuild. En Chrome a 1440 × 900 se comprobaron los cinco iconos, la alineación de los valores y el pasivo completo servido por Encore. En la captura de Ecos, los sets y ecos principales seguían cargando.
