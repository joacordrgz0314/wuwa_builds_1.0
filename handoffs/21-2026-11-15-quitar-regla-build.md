# Se quita la exigencia de `pnpm build` en CLAUDE.md

**Fecha:** 2026-11-15
**Estado:** aplicado (solo documentación). Sin cambios de código.

## Pedido
El usuario pidió quitar la regla de correr `pnpm build` antes de dar algo por terminado: el trabajo no es local, y así se evita repetir en cada respuesta que no se puede.

## Decisiones del usuario
- Se quita la exigencia de `build`. Él prueba con `pnpm dev` y reporta.
- Observación de la prueba del handoff 20: la portada le agrada; quiere el personaje más arriba, manteniendo el espaciado actual entre cabecera y pestañas. Solo Lily y Yinlin se ven con el nuevo tratamiento; en los demás «siguen iguales» (pendiente de diagnóstico).

## Qué se hizo
- `CLAUDE.md`: se reescribieron tres puntos (ahorro de tokens, verificación antes de terminar y reporte honesto). Ya no se exige `pnpm build`; basta revisar sintaxis con esbuild si cambia JSX, y no se repite la limitación del sandbox.

## Pendientes
- Subir el personaje en la cabecera (propuesto, a la espera de «aplica»).
- Diagnosticar por qué los personajes sin retrato no muestran el tratamiento nuevo.
