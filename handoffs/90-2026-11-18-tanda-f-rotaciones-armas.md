# Tanda F, rotaciones y armas de 4 estrellas

**Fecha:** 18 de noviembre de 2026  
**Versión:** 0.11.0 → 0.12.0  
**Nivel:** menor; amplía el catálogo y la presentación de builds.  
**Estado:** datos verificados; sintaxis JSX y revisión visual pendientes.

## Pedido y decisiones

- Añadir Luuk Herssen, Aemeath y Mornye con un máximo de cuatro dúos y todas sus variantes verificadas.
- Mostrar `DPR = cifra · N s` en equipos y variantes.
- Reservar los puestos 4 y 5 para las dos mejores armas de 4 estrellas, aunque otra ya aparezca arriba.
- Admitir como máximo una `BP` en esos puestos y priorizar la opción sin `BP` en empate.
- Mostrar el refinamiento de todas las armas junto al nombre.

## Qué se hizo

- Se cargaron las tres fichas de la tanda F con Ecos, armas, equipos, configuraciones, variantes y rotaciones.
- Se añadieron duraciones de rotación a los equipos y variantes de las 18 builds existentes.
- Se actualizaron todos los rankings y se corrigieron los casos afectados de Suisui, Errante Electro, Qingxiao, Jingran y Lily.
- Se añadieron las insignias `BP`, los refinamientos visibles y el nuevo formato de DPR.
- Se actualizaron las reglas, el catálogo y la versión.

## Archivos tocados

- `src/data/builds.json`: tanda F, rotaciones y rankings.
- `src/components/BuildSections.jsx`: duración, refinamiento e insignia BP.
- `AGENTS.md`: reglas aprobadas.
- `docs/DEATH-NOTE.md` y `docs/DEATH-NOTE-CATALOGO.md`: estado del catálogo.
- `package.json`: versión 0.12.0.

## Verificación

- JSON válido: 18 builds, 69 equipos y 462 variantes.
- Luuk Herssen, Aemeath y Mornye: cuatro equipos cada uno.
- Ningún equipo o variante sin duración; ningún arma sin refinamiento.
- Todos los rankings tienen cinco armas; los puestos 4 y 5 son de 4 estrellas y contienen como máximo una `BP`.
- La comprobación JSX con esbuild no pudo ejecutarse porque el binario no está instalado.
- Revisión visual a 1440 × 900 pendiente.

## Pendientes

- Revisar en escritorio el nuevo formato y la tanda F.
- Continuar con la siguiente tanda mediante un plan nuevo.
