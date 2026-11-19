# 70 · Builds de escritorio unificadas

**Fecha:** 2026-11-17

**Versión:** `0.5.6` → `0.6.0`. Incremento menor por unificar el diseño compartido de Ecos, Armas y contenido expandido, y cerrar las builds piloto de Suoming y Lily.

**Estado:** sintaxis, JSON, datos de rankings y entrada de Vite verificados. Revisión visual a 1440 × 900 pendiente.

## Pedido y decisiones del usuario

- Priorizar exclusivamente escritorio hasta el final del proyecto.
- Aplicar el diseño general a todos los personajes, usando Hsin, Suoming y Lily como pilotos antes de cargar las demás builds.
- Igualar los sets de Ecos, alinear Ecos principales a la izquierda y separar las alternativas de coste 4.
- Mostrar solo DPR y agrupar apoyos alternativos en «Variantes».
- Abrir Suoming con Hsin y Lily en Unison.
- Abrir todo «Ver más» en un panel flotante y separar los dos grupos de Mecánicas básicas con un divisor cuando ambos existen.

## Qué se hizo

- `src/components/BuildSections.jsx`: diseño compartido de Ecos, porcentajes y F2P en Armas, límite de cinco, panel flotante reutilizable, divisor de Forte y retirada de DPS visible.
- `src/styles.css`: alineación estable de Ecos, sets equivalentes, alternativas de coste 4 apiladas y estilos de panel flotante e insignias.
- `src/data/builds.json`: Hsin, Suoming y Lily con cinco armas y dos F2P por modo; porcentajes individuales; equipos de Suoming agrupados y sin DPS.
- `AGENTS.md`: Markdown estructurado, prioridad de escritorio, reglas futuras de builds y handoffs dentro del repositorio. Se retiró la antigua sección 16.1 de ubicación externa.
- `docs/DEATH-NOTE.md` y `docs/DEATH-NOTE-CATALOGO.md`: estado, decisiones y siguiente paso actualizados.
- `package.json`: versión `0.6.0`.

## Verificación

- `BuildSections.jsx` transformado correctamente mediante esbuild usando `transformWithEsbuild` de Vite.
- `builds.json` leído correctamente con Node.
- Cada modo de Hsin, Suoming y Lily contiene cinco armas, dos marcadas F2P y porcentaje individual en todas.
- Búsqueda sin campos `dps`, uso de `team.dps`, «Ver menos» ni referencias a la ubicación externa de handoffs.
- `git diff --check` sin errores.
- Vite inició por la entrada normal y respondió HTTP 200. El servidor temporal fue detenido.
- No se pudo inspeccionar visualmente 1440 × 900 porque el controlador de ventanas requerido no está disponible en esta sesión.

## Pendientes

- Revisar Hsin, Suoming y Lily a 1440 × 900 con datos reales de Encore y ajustar cualquier detalle visual mediante un plan nuevo.
- Tras aprobar las tres fichas piloto, preparar por tandas las builds de los demás personajes.
- Revisar móvil vertical y horizontal al final del proyecto.
