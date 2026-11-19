# Fase 4a: pestañas en la página de personaje

**Fecha:** 2026-11-14
**Estado:** código escrito; sintaxis revisada con esbuild. NO verificado con `pnpm build` ni en pantalla.

## Pedido
Dividir la parte de build de la página de personaje en secciones tipo submenú, que cambien ahí mismo sin cambiar de ruta.

## Decisiones del usuario
- Pestañas: Guía, Ecos, Armas, Equipos y Materiales; la URL no cambia.
- La pestaña inicial siempre es Guía.
- Los títulos h3 de cada sección se dejan por ahora (se revisarán con el rediseño).

## Qué se hizo
- `src/components/CharacterPage.jsx`: estado `tab`, reinicio a Guía al cambiar de personaje, barra `role="tablist"` con navegación por flechas, Inicio y Fin, y panel `role="tabpanel"`. `Materials` solo se monta en su pestaña (los materiales se piden al abrirla).
- `src/components/BuildSections.jsx`: recibe `tab` y dibuja solo la sección activa. Los hooks `useLoad` no se movieron.
- `src/styles.css`: bloque `/* ---- pestañas ---- */` al final (barra con scroll horizontal sin barra visible, pestaña activa en `--tide`).

## Verificación
- Pendiente (usuario): `pnpm build`; abrir un personaje con build (Hsin) y otro sin build; cambiar entre las 5 pestañas (clic y flechas); en Materiales comprobar que carga; navegar desde un equipo a otro personaje y ver que vuelve a Guía; probar 1440×900, 390×844 (la barra no debe desbordar la página) y 844×390.

## Pendientes
- Fase 4: colores del elemento en fondo y tarjetas, fondo tipo Rinascita, arte del personaje como fondo.
- Luego fase 2c (builds del resto).
