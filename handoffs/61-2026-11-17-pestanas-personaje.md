# 61 · Selección de pestañas del personaje

**Fecha** 2026-11-17

**Versión** 0.4.0 → 0.4.1. Parche por la corrección de la clase de la barra.

**Estado** Verificado en Chrome con Hsin.

## Pedido y decisiones

Restaurar la selección de las pestañas. El usuario aprobó reutilizar la clase `char-tabs`.

## Cambios

- `src/components/CharacterPage.jsx`: restaurada `char-tabs` para aplicar el desplazamiento horizontal y la posición de la barra sobre la portada.
- `package.json`: versión 0.4.1.
- `docs/DEATH-NOTE.md` e `INDEX.md`: registrado el parche.

## Verificación

JSX comprobado con esbuild. En Chrome se activaron las cinco pestañas por coordenadas, con ratón en 1440×900 y 844×390 y con toque emulado en 390×844. En los tres tamaños también se comprobó el cambio por flecha derecha, Inicio y Fin. El servidor temporal se detuvo.

## Pendientes

Queda por confirmar el comportamiento en un teléfono físico.
