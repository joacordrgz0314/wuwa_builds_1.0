# Ecos, arma y sets de Aemeath

- **Versión 0.13.8.** Parche limitado a la ficha de Aemeath. El coste 4 ofrece Daño CRIT o Prob. CRIT. Las cinco subestadísticas usan las burbujas de Lynae. El objetivo de 2800 se muestra como ATQ total.
- **Armas y equipos.** El arma principal R1 muestra el efecto completo debajo del icono. Las cuatro tarjetas y sus 37 variantes tienen iconos de set para los tres integrantes.
- **Archivos.** `src/data/builds.json`, `src/components/BuildSections.jsx`, `src/constants.js`, `package.json` e índice de handoffs.
- **Verificación.** Node validó los datos y esbuild transformó el JSX. Encore sirvió el arma y los nueve iconos de set. El icono de Liberación coincide con el recurso identificado en la ficha de Sigillum de Akademiya. Chrome a 1440 × 900 con movimiento reducido mostró las opciones de coste 4, los cinco objetivos con sus iconos, el efecto R1 completo y los 123 iconos de sets entre tarjetas y variantes. Vite se detuvo al terminar.
