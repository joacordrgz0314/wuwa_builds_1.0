# AGENTS.md — WuWa Builds

Sitio personal de Wuthering Waves. React 18, Vite 5, JavaScript ESM y CSS plano. Datos en vivo desde Encore.

## Antes de actuar

- Lee estas reglas y revisa los archivos afectados. Busca por personaje, componente o tema en `handoffs/INDEX.md` con `rg` y abre las entradas pertinentes. La decisión explícita más reciente del usuario prevalece.
- Para tareas puntuales basta el contexto directamente relacionado. Consulta los Death Note para retomar el estado general o una tanda del catálogo.
- Investiga en lectura y presenta un plan proporcional al cambio, incluidos archivos, verificación y versión si corresponde. Espera la aprobación explícita antes de editar, crear, mover o borrar archivos. Aplica únicamente lo aprobado y consulta cualquier ampliación. Si se pide solo un plan, entrega el plan.
- El modelo activo puede planificar y ejecutar. Si hay delegación autorizada, los subagentes investigan en lectura durante la planificación y ejecutan solo el alcance aprobado.

## Consultas según la tarea

| Tema | Documento |
| --- | --- |
| Proyecto, hitos, stack y Encore | [Proyecto y datos](docs/REGLAS-PROYECTO.md) |
| Builds, diseño general, Equipos, Armas, Materiales, Ecos y Guía | [Reglas de fichas](docs/REGLAS-FICHAS.md) |
| Versionado, verificación, handoffs y Git | [Reglas de entrega](docs/REGLAS-ENTREGA.md) |
| Estado y próximos pasos | [Death Note](docs/DEATH-NOTE.md) |
| Builds manuales, plantilla y revisión antes de un commit | [Death Note del catálogo](docs/DEATH-NOTE-CATALOGO.md) |

## Implementación y cierre

- Usa pnpm, hooks, dos espacios, comillas simples, comas finales multilínea y código sin punto y coma. Interfaz y comentarios en español. Dependencias, tests y linter requieren aprobación.
- Integra Encore en `src/api.js`, verifica los recursos y consulta muestras acotadas. Los datos se consumen en vivo. Usa caché en memoria cuando corresponda. Cualquier otro almacenamiento requiere aprobación.
- Cada ajuste nuevo e independiente de la web sube la versión en `package.json` según su alcance. Las iteraciones del mismo ajuste abierto conservan la versión hasta el cierre o la publicación, salvo que el alcance requiera un salto mayor. La documentación y los cambios exclusivos del editor local conservan la versión. Si un cambio del editor afecta los datos que consume la web pública o cómo se muestran, se versiona según ese impacto.
- Si cambia JSX, verifica con esbuild. Para cambios visuales, revisa escritorio a 1440 × 900 y el movimiento reducido si aplica. Evita `pnpm build` en el sandbox. Reporta las verificaciones pendientes y detén los servidores que hayas iniciado.
- Cierra con un handoff breve y añade su entrada al principio de `handoffs/INDEX.md`. Para cambios pequeños bastan pedido, decisión, archivos, versión, verificación y pendientes. Conserva el historial.
- Git requiere aprobación para inicializar. Los tags, commits de release y push corresponden al usuario.
