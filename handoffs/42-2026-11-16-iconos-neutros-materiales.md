# Detalle: iconos neutros, equipos pequeños, materiales en cuadros

**Fecha**: 2026-11-16
**Estado**: escrito, sin probar en `pnpm dev`. Revisada solo la sintaxis (esbuild). Stats de armas pendientes (falta ver los datos).

## Pedido
Nombre de Yangyang sin nowrap; equipos con icono de cabeza y borde blanco; armas con borde blanco y stats; materiales como cuadros por rareza; marcos vacíos sin build.

## Decisiones del usuario
- Yangyang: lectura confirmada (quitar nowrap, icono al final del texto).
- Equipos: todos del mismo color, sin resalte dorado del personaje actual.
- Armas: aplicar el resto y dejar las stats para cuando pegue los datos.
- Materiales: tres bloques separados: ascensión del personaje, habilidades + talentos, arma personal (si tiene).
- Sin build: marcos vacíos (2 equipos de 3, 2 armas).

## Qué se hizo
- `styles.css`: quitada `.char-page-name-end`; bloques nuevos `detalle-iconos-neutros` y `materiales-cuadros` al final (el CSS viejo de `.team-art`, `.team-elem`, `.team-name` queda sin uso).
- `BuildSections.jsx`: `MemberArt` eliminado; `Teams` usa `RoleHeadIcon` (nombre en `title`/`aria-label`, rol debajo); `EMPTY_TEAMS` y `WeaponsEmpty` para personajes sin build.
- `api.js`: los ítems guardan `quality` (`QualityId`); los de la caché sin ese campo se vuelven a pedir.
- `Materials.jsx`: `Tile` (cuadro por rareza, cantidad abajo a la derecha); `Group` ordena por rareza y pone la moneda al final; bonos de talentos como cuadros de texto; desglose por paso conservado.

## Datos descubiertos
`GET /es/weapon/{id}` trae `FirstPropId`/`SecondPropId` (objetos `Id, Value, IsRatio`), `FirstCurve`/`SecondCurve`, `Properties[2]` (forma sin ver), `WeaponName`, `ResonName`, `Desc`, `Breaches[7]`.

## Verificación
Sintaxis JSX con esbuild. No revisado: aspecto, responsive (390×844, 844×390), que `QualityId` exista en `/item/{id}`.

## Pendientes
- Stats principal/secundaria de armas: pegar `Properties`, `FirstPropId` y `SecondPropId`.
- Revisar el nombre de Yangyang y el icono de elemento en el wrap.
