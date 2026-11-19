# Tanda D · Lucilla, Lucy y Rebecca

**Fecha** 2026-11-18  
**Versión** `0.8.4` → `0.9.0`  
**Nivel** Menor por incorporar tres builds al catálogo.  
**Estado** Datos, JSON, consistencia de equipos y portadas verificados. Recorrido visual de las pestañas pendiente.

## Pedido y decisiones

Se aprobó cargar Lucilla, Lucy y Rebecca con los equipos, Ecos y rankings investigados. Lucilla abre «Con Hiyuki» y ofrece «Habilidad de Eco». La fila Rebecca + Hsin + Suoming queda fuera hasta confirmar el orden de roles. También se aprobó añadir a `AGENTS.md` el aviso obligatorio cada vez que el flujo requiera cambiar de modelo.

## Cambios

- `src/data/builds.json` incorpora las fichas `1109`, `1511` y `1308`. Lucilla reparte cuatro dúos entre sus dos modos. Lucy y Rebecca muestran cuatro tarjetas cada una y comparten la lista completa de Lucy + Rebecca.
- Los rankings contienen cinco armas, una permanente verificada y dos F2P. Los IDs de armas y Ecos se cruzaron con Encore en inglés.
- `SPECx2` y `ELECx1` se conservan en las configuraciones y como pendientes porque su equivalencia exacta no está confirmada.
- `package.json`, ambos Death Note, `AGENTS.md` e `INDEX.md` registran la tanda y la versión.

## Verificación

- Node leyó el JSON y comprobó tres fichas nuevas, cinco armas por ranking, cuatro dúos por ficha contando los modos de Lucilla y coincidencia de los equipos compartidos.
- Chrome a 1440 × 900 cargó las portadas y la Guía de Lucilla, Lucy y Rebecca, con retratos, datos dinámicos y versión `0.9.0`. La automatización interactiva necesaria para recorrer Ecos, Armas, Equipos y paneles no estuvo disponible en esta sesión.

## Pendientes

- Confirmar las equivalencias exactas de `SPECx2` y `ELECx1` en Encore.
- Revisar Ecos, Armas, Equipos y paneles de las tres fichas en Chrome a 1440 × 900.
- Seleccionar la siguiente tanda del catálogo.
