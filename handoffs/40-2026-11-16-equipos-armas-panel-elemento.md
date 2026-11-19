# 40 · Equipos y armas con tarjetas, panel más oscuro y elemento junto al nombre (2026-11-16)

Estado: escrito, sin probar.

- `BuildSections.jsx`: **Equipos** pasa a tarjetas altas por miembro (arte como en el inicio con `MemberArt`, fondo e anillo del elemento, icono de elemento, nombre en Marcellus y el rol debajo); el personaje actual va resaltado en dorado y sin enlace. **Armas** pasa a tarjetas con icono de 96 px, insignias «Mejor» / «Alternativa» (por orden) y «Exclusiva» (si coincide con `_armaPersonal`). Props nuevas: `base`, `elementIcons`, `characterId`, `personalWeaponId`.
- `CharacterPage.jsx`: recibe `elementIcons` (pasado desde `App.jsx`) y lo reenvía; el icono de elemento va junto al nombre, unido a la última palabra para que no quede solo en una línea (caso Yangyang: Xuanling).
- `styles.css`: panel (`.char-page-section`) con degradado más oscuro (0.62 a 0.8); bloque final `/* ---- detalle de personaje: nombre con elemento, equipos y armas ---- */`.
- Pendiente de probar: tamaño del icono junto al nombre, Qingxiao con el panel nuevo, equipos en móvil (3 columnas de ~100 px).
- Siguiente: pestaña Ecos (filas por coste leyendo el texto de `builds.json`, sets como tarjetas, subestadísticas en cadena). Idea del usuario aún sin resolver: eco principal de 4 coste recomendado por personaje (como Akademiya); requeriría un campo nuevo en `builds.json` y datos del eco desde la API.
