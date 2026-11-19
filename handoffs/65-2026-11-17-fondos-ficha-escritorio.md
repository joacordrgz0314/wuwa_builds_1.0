# 65 · Fondos de la ficha en escritorio

**Fecha** 2026-11-17

**Versión** 0.5.1 → 0.5.2. Parche visual para mejorar la legibilidad de los paneles.

**Estado** CSS aplicado y navegación verificada. Aspecto pendiente de revisión por el usuario.

## Pedido y decisiones del usuario

Aplicar al contenido de la ficha el tratamiento de fondo más opaco aprobado para las pestañas. Solo en escritorio, desde 1100 px.

## Qué se hizo

- `src/styles.css`: bloque final `ficha-escritorio-fondos`. Se oscurecieron el panel exterior y las tarjetas de Guía, Ecos, Armas, Equipos y Materiales. La mejor arma conserva mayor acento de elemento.
- `package.json`: versión 0.5.2.
- `docs/DEATH-NOTE.md`, `docs/DEATH-NOTE-CATALOGO.md` e `INDEX.md`: estado y versión actualizados.

## Verificación

Chrome con Vite confirmó la navegación por las cinco pestañas con clic y teclado en 1440×900 y 844×390, y toque emulado y teclado en 390×844. El CSS nuevo está dentro de `min-width: 1100px`. `git diff --check` no encontró errores de espacios. El servidor temporal se detuvo.

## Pendientes

Revisión visual de contraste y legibilidad por el usuario en escritorio. La fase 04 del catálogo conserva sus pendientes.
