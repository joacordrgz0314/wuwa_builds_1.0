# Portada: retrato de cuerpo completo (RolePortrait) con respaldo

**Fecha:** 2026-11-15
**Estado:** escrito; sintaxis JSX revisada con esbuild. NO verificado con `pnpm build` ni en pantalla.

## Pedido
Retomar la portada de la página de personaje. El usuario marcó que la cabecera se ve vacía o poco vistosa (opción B) y eligió probar `RolePortrait` primero (opción A).

## Decisiones del usuario
- Probar `RolePortrait` pidiendo el detalle al abrir la página, con respaldo al arte actual.
- El diseño de la cabecera (emblema del elemento, marco) queda para un paso aparte, con plan y «aplica».

## Qué se hizo
- `src/api.js`: `getDetailInfo` guarda `portrait` (`d.RolePortrait`); nueva `getCharacterPortrait(id)` que devuelve la URL completa (usa el mismo detalle en caché).
- `src/components/CharacterPage.jsx`: al abrir se pide el retrato; se precarga con `new Image()` y solo si carga se muestra (sin parpadeo ni imagen rota). Si falla el detalle, no existe el archivo o no carga, queda el arte de siempre. Con retrato, el `<img>` usa la clase `is-portrait` y no dispara `loadFromDetail`.
- `src/styles.css`: bloque `/* ---- retrato completo ---- */` (marco cuadrado, `object-fit: contain`, abajo-centro; ancho `min(380px, 45vw)`, y `min(320px, 100%)` a ≤600 px).

## Verificación pendiente (usuario)
`pnpm build`. Abrir Yinlin, Lili y un personaje que falla (Augusta, Iuno, Suoming) y comprobar: retrato de cuerpo completo en los que lo tienen, arte de siempre en los demás, cuánto tarda en cambiar (≈0,6 s esperado) y que no salta el ancho entre pestañas. Si Yinlin no cambia, mirar la pestaña Network al abrirla (la causa del intento anterior quedó sin confirmar). 1440×900, 390×844 y 844×390.

## Pendientes
- Diseño de la cabecera (emblema grande y tenue del elemento a la izquierda, ajuste de marco): falta plan y «aplica».
- Los del handoff 16 y anteriores (12 a 14) siguen abiertos.
