# Pantalla de carga centrada con anillo orbital

**Fecha:** 2026-11-14
**Estado:** código escrito; NO verificado (sin red ni navegador en el entorno; `pnpm build` no corrido). Pendiente que el usuario lo pruebe.

## Pedido
Cambiar la barra pequeña en una esquina por una pantalla de carga centrada y más bonita.

## Decisiones del usuario
- Aprobó el diseño propuesto tal como estaba en el resumen de traspaso.

## Qué se hizo
- `src/App.jsx`: el bloque de carga ahora es un contenedor con `role="status"` y `aria-live="polite"`, un anillo (`.app-orbit`), el título «Cargando personajes…» y el subtexto «La primera vez puede tardar un poco». Se quitó el `<progress>`.
- `src/styles.css` (bloque «carga»): contenedor flex centrado (~60 vh); anillo de dos arcos girando en sentidos opuestos (`--tide` y `--violet`, con resplandor); con `prefers-reduced-motion: reduce` no gira y solo pulsa suave. Se eliminó `.app-progress`.

## Verificación
- Hecho: sin referencias restantes a `app-progress`.
- Pendiente (usuario): `pnpm build`; ver la carga en 1440×900, 390×844 y 844×390; probar con reduced motion.

## Pendientes
- Orden de la grilla: falta la salida de la consola (claves del objeto y filas de los dos personajes con nombres exactos).
- Fase 2: página de personaje.
