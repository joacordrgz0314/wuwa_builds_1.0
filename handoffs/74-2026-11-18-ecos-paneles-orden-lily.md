# Coste 4, paneles, orden de estreno y respaldo de Lily

**Fecha:** 2026-11-18  
**Versión:** `0.6.3` → `0.6.4`  
**Nivel:** parche por correcciones de presentación, interacción y datos.  
**Estado:** interacciones de escritorio y muestra del orden verificadas con Encore real.

## Pedido y decisiones

- Mostrar solo las burbujas de estadísticas del coste 4.
- Conservar el scroll al abrir y cerrar «Ver más» y «Ver variantes», con cierre al pulsar fuera.
- Ordenar por debut, con los personajes más recientes primero.
- Usar temporalmente el icono de cabeza de Lily en la grilla y en su ficha.

## Cambios

- `src/components/BuildSections.jsx`: oculta el separador del coste 4 y añade cierre por clic en el fondo. El botón de apertura recibe foco con `preventScroll` para que el diálogo nativo se lo devuelva al cerrar.
- `src/styles.css`: fija ambos tipos de diálogo al viewport y contiene el desplazamiento interno.
- `src/api.js`: mueve a Jingran (3.6) antes de Hsin (3.7) en la secuencia ascendente de Encore, luego invierte el catálogo. El listado `roleList` incluye `Id`, `Name`, `QualityId`, `Element`, `RoleHeadIcon` y `WeaponType`, sin campo de estreno. Lily (1512) comparte `RolePortrait` con Ciaccona (1407) y su `FormationRoleCard` también apunta a Ciaccona. Se omiten esos dos campos para Lily, incluidas sus copias guardadas, y se usa su `RoleHeadIcon`.
- `package.json`: versión `0.6.4`.

## Verificación

- esbuild validó `BuildSections.jsx` y `api.js`. `git diff --check` terminó sin errores.
- Chrome a 1440 × 900 confirmó dos burbujas sin «o» en el coste 4 de Lily y su icono en la grilla y ficha. Se simuló una caché anterior con ambas rutas incorrectas y la ficha conservó el icono de Lily.
- Chrome confirmó el cierre por fondo, Escape y «Cerrar». Se midió el scroll y el retorno de foco con «Ver más» de Guía y Armas y con «Ver variantes». Para medir Variantes con scroll distinto de cero se amplió temporalmente la altura de la ficha desde el navegador.
- La grilla empieza por Lily, Suoming, Hsin, Jingran y Qingxiao. El filtro Electro conservó el orden relativo. El debut de Jingran y Hsin se contrastó con los anuncios oficiales de las versiones 3.6 y 3.7. Los servidores de prueba se detuvieron.

## Pendientes

- Retirar la excepción de Lily cuando Encore sirva su retrato y arte correctos.
- La comprobación oficial cubrió la corrección de Jingran y la muestra reciente. Queda pendiente una auditoría exhaustiva del orden histórico del catálogo.
