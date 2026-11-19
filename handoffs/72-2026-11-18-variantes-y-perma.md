# Variantes de equipos y etiquetas PERMA

**Fecha:** 18 de noviembre de 2026  
**Versión:** `0.6.1` → `0.6.2`  
**Nivel:** parche; corrige color, variantes y clasificación de armas.  
**Estado:** datos y consistencia verificados; revisión visual a 1440 × 900 pendiente.

## Pedido y decisiones

- Devolver `×2` al color normal dentro de las stats de Ecos.
- Mantener completas y consistentes las variantes de un mismo dúo DPS principal + sub-DPS.
- Completar las variantes de Hsin + Suoming y Suoming + Lynae sin mostrar DPS.

## Qué se hizo

- Se retiró el color de elemento aplicado a `×2`.
- Se auditaron las armas: solo Cosmic Ripples, Emerald of Genesis y Phasic Homogenizer permanecen marcadas como `PERMA`.
- La ficha de Suoming ahora comparte las ocho variantes publicadas del dúo Hsin + Suoming.
- Se añadieron las reglas futuras a `AGENTS.md` y se actualizaron ambos Death Note.

## Archivos

- `src/styles.css`: color heredado para `×2`.
- `src/data/builds.json`: variantes y condiciones de equipos.
- `AGENTS.md`: consistencia entre fichas y uso literal de `PERMA`.
- `docs/DEATH-NOTE.md`, `docs/DEATH-NOTE-CATALOGO.md`: estado y evidencia.
- `package.json`: versión `0.6.2`.

## Verificación

- `builds.json` y `package.json` cargaron correctamente.
- Las variantes de Hsin + Suoming coinciden por ID, DPR y condiciones en ambas fichas.
- Suoming + Lynae contiene el apoyo principal y seis variantes.
- `git diff --check` sin errores.

## Pendientes

- Revisar visualmente los paneles de variantes y el `×2` a 1440 × 900.
- Mantener esta comprobación al cargar las builds de los siguientes personajes.
