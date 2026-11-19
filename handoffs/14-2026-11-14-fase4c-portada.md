# Fase 4c: portada de la página de personaje (arte como fondo) y fix de salto de ancho

**Fecha:** 2026-11-14
**Estado:** CSS escrito (con ajustes posteriores del arte). NO verificado con `pnpm build` ni en pantalla.

## Pedido
- El ancho de la página saltaba al cambiar de pestaña.
- Sacar el arte del marco de la cabecera y usarlo como fondo, grande y al centro, con nombre, estrellas y etiquetas (elemento y arma) como presentación. Solo en la página de personaje; las tarjetas del inicio no cambian.

## Decisiones del usuario
- Arte al centro; si no queda bien, pasarlo a la derecha.
- Las cartas del inicio se quedan como están.

## Qué se hizo
- `src/styles.css`: bloque `/* ---- portada ---- */` al final. `html { overflow-y: scroll }` (causa probable del salto: aparece y desaparece la barra de scroll; no confirmada). Cabecera como portada de ~68% de la altura, arte absoluto, centrado y sin marco, desvanecido hacia abajo con máscara; icono redondo de respaldo si no hay arte; nombre y estrellas más grandes y etiquetas centradas.
- El JSX no cambió: se reutiliza el `<img className="char-page-art">` de la cabecera.
- No se subió la opacidad de los paneles de las secciones (se decidirá al ver el resultado).

## Ajuste posterior (mismo chat)
- El usuario vio que el arte se cortaba por los lados y parecía una tarjeta sin marco. Se cambió la caja del arte a `width: min(100%, 720px)` con `object-fit: cover` y `object-position: top center` (el recorte queda abajo, no a los lados), máscara radial en vez de lineal (bordes disueltos) y `opacity: 0.9`.

## Intentos de arte completo (revertidos, pendientes para el chat siguiente)
- Se probó `RoleStand` (genérico: el mismo arte de Jiyan en todos; descartado) y luego `RolePortrait`. Ambos se revirtieron: el código quedó como tras el ajuste 1 (recorte vertical y máscara radial).
- Hallazgos de la API (muestra de 13 personajes con ids repartidos): `RolePortrait` (`.../PixActivity/T_ActivityRoleXxx.webp`, 2048×2032) carga en 10; falla en Augusta, Hiyuki y Qingxiao (campo con dirección, archivo inexistente). Lili y Yinlin se ven de cuerpo completo (confirmado por el usuario). `Skins[0].PreviewRoleCard` es una tira de 216×968 (no sirve de portada).
- Con `RolePortrait` solo Lili cambió en pantalla; hipótesis: el detalle (~340 KB) de los demás tarda en llegar, o falla en silencio (el `.catch` lo ignora). Sin confirmar: falta ver la pestaña Network al abrir Yinlin.
- Alternativa si no hay arte completo fiable: diseño dividido (texto y emblema del elemento a la izquierda, arte actual a la derecha).

## Verificación
- Pendiente (usuario): `pnpm build`; 1440×900, 390×844 y 844×390; comprobar que ya no salta el ancho al cambiar de pestaña, que el nombre se lee sobre el arte y un personaje sin arte (icono de respaldo). Si el centro no convence, pasar el arte a la derecha.

## Pendientes
- Fondo tipo Rinascita en el inicio; luego fase 2c (builds del resto).
- Posible: subir opacidad de `.char-page-section` si el arte estorba la lectura.
