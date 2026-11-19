# 39 · Detalle de personaje: ambiente y color del elemento (2026-11-16)

Estado: escrito, sin probar.

Pedido del usuario: la página de personaje se veía «sosa» frente al inicio. Alcance aprobado: piel (ambiente y color) y composición; la Guía (contenido) queda para después. Que las secciones tapen los pies del retrato está aceptado.

- Nuevo `components/Ambient.jsx`: `AMBIENT_PARTICLES`, `Drop` y el componente `Ambient` (movidos desde `App.jsx`, sin cambios de lógica). `App.jsx` lo usa en el inicio (`routeId == null`).
- `CharacterPage.jsx`: `<Ambient />` reemplaza a `.char-bg`. La lluvia y las gotas se ven igual que en el inicio pero con `--elem-rgb`.
- `styles.css`, bloque final `/* ---- detalle de personaje: ambiente y color del elemento ---- */`: fondo, estelas, anillos y destello teñidos; nombre en Marcellus (más grande, brillo y línea de acento); etiquetas, pestañas (activa con degradado y glow como el menú lateral) y paneles (borde izquierdo y glow del elemento) con el color del elemento; `margin-bottom` negativo de la cabecera con retrato para subir pestañas y panel sin mover nombre ni retrato (≥ 601 px).
- `.char-bg` y su CSS quedan sin uso (se conservan; `star-twinkle` sigue definido). Se puede borrar en otra pasada.
- Pendiente de probar: contraste del texto del panel sobre el retrato, elementos con color claro (Espectro, Aero), móvil 390×844 y 844×390.
