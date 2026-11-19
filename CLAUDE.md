# WuWa Builds (wuwa-builds)

Web personal sobre Wuthering Waves: catálogo de personajes (Resonadores) con sus builds y materiales.
Los datos se consumen en vivo desde la API Encore; no se copian ni se guardan localmente en el repo.
El nombre del proyecto es provisional.

## Alcance

- **Inicio**: grilla de tarjetas con arte de cuerpo completo, nombre, elemento y tipo de arma. Filtros por
  elemento y por arma. Fondo con temática de Wuthering Waves (espacio o un paisaje del mundo de WuWa).
- **Página de personaje**: guía, sets de ecos recomendados, mejores armas, mejores equipos, materiales de
  ascensión, talentos y materiales de su arma personal.
- **Arma personal**: solo los personajes de 5 estrellas la tienen. En 4 estrellas y en Rover (cualquier
  elemento) no se muestra la sección de materiales de arma.

## Antes de actuar: leer estas reglas

Lee este archivo completo **siempre** antes de proponer o tocar algo: al empezar un chat y antes de cada tarea nueva. No te fíes de lo que recuerdes de él.

## Regla principal: ningún cambio sin aprobación previa

Nunca crees, edites, muevas ni borres archivos del proyecto sin que el usuario lo haya aprobado
explícitamente ("sí", "aplica", "ejecuta", "hazlo").

1. Investiga en modo lectura: archivos afectados, causa, alternativas.
2. Propón el plan y, cuando aplique, el diff exacto. Si hay decisiones abiertas, pregúntalas en el
   mismo mensaje con una opción recomendada.
3. Detente y espera la aprobación.
4. Aplica solo lo aprobado.
5. Verifica (ver abajo) y reporta qué se comprobó y qué no.
6. Cierra con un handoff (ver abajo). Es parte del cambio aprobado y no necesita otra aprobación.

- Una aprobación cubre solo el cambio propuesto. Un cambio nuevo necesita una aprobación nueva.
- Una pregunta ("¿se puede…?", "¿cómo haría…?") no es una aprobación.
- Si el usuario pide "solo el plan", entrega solo el plan, sin tocar archivos.
- Lo que aparezca fuera del plan aprobado (un bug ajeno, una mejora, una dependencia) se reporta
  y se pregunta; no se arregla de paso.
- Los subagentes con permisos de escritura deben recibir en su prompt: "NO edites ni escribas
  archivos, solo propón el diff".
- Esta regla también cubre la configuración, las dependencias, los permisos y los borrados.

## Ahorro de tokens (sin perder calidad)

Ahorrar es no gastar de más, nunca recortar verificación, honestidad del reporte ni cuidado del diff.

- Respuestas cortas y directas: sin preámbulos, sin repetir lo ya dicho ni re-explicar un plan aprobado.
- Lee lo mínimo: busca con grep o lee por rangos de líneas antes que archivos enteros; no releas lo que
  ya está en el chat.
- Edita con cambios mínimos (reemplazos puntuales), no reescribas archivos completos.
- Agrupa todas las preguntas en un solo mensaje, cada una con opción recomendada.
- Respuestas de la API: inspecciona con muestras acotadas (un personaje, los campos clave); nunca
  vuelques listas completas al chat. Anota en el handoff la forma de los datos que se descubrió.
- Verificación proporcional: no se corre `pnpm build` (el sandbox no es el equipo del usuario); si cambia JSX, revisar sintaxis con esbuild.
- Reportes de cierre en pocas líneas; el detalle va al handoff, no al chat.
- Al empezar una tarea, lee `INDEX.md` y abre solo las entradas relevantes.

## Fases e hitos

El proyecto avanza por fases. Fases propuestas (se ajustan con el usuario):

0. Base del proyecto y cliente de la API (sondeo de endpoints y formato de datos).
1. Inicio: grilla de tarjetas, filtros y fondo temático.
2. Página de personaje: guía, ecos, armas y equipos.
3. Materiales: ascensión, talentos y arma personal.
4. Pulido y revisión responsive.

**Aviso de hito**: al terminar una fase o una parte importante, avisa explícitamente al usuario con una
línea: "Hito completado: <qué>. Buen momento para generar un resumen y continuar en un chat nuevo."
Avisa también, **cada vez que sea necesario**, que conviene cambiar de chat (chat largo, imágenes o páginas pesadas en el contexto, cierre de una tanda de trabajo), sin esperar a que el usuario pregunte. El resumen de traspaso solo se genera
cuando el usuario lo pide (ofrécelo en el aviso) e incluye: estado, decisiones tomadas, archivos
clave, formato de la API y pendientes.

## Reglas de contenido de las builds

- **Orden del equipo, siempre**: DPS principal, sub-DPS, apoyo. Vale para todo equipo, sin importar qué diga la fuente.
- Si una fuente reporta más de 2 equipos o más de 2 armas, se añaden todos (no se recorta a 2).
- Cada miembro lleva su rol (`rol`) en `builds.json`; en pantalla solo aparece como `title` del icono. Ejemplo (Lily): «DPS principal», «Daño extra y sinergia Unison», «Curación, agrupa enemigos y buffs».
- Nunca escribir frases del tipo «según la guía», «según las guías», «la guía consultada» ni citar fuentes en los textos: el texto es la guía.
- `guia` en `builds.json` es un texto suelto o una lista de bloques `[{ titulo, texto }]`; se prefieren bloques cortos con título. El bloque `guia` ya no se muestra en pantalla (el dato se conserva). Todo lo que ve la Guía sale de la API (no se escribe a mano).
- Un equipo debe reflejar el mejor equipo actual (por ejemplo, Lily como apoyo de Suoming y Hsin); revisar que no queden equipos desactualizados.

## Reglas de diseño del detalle de personaje

- Iconos de personajes, armas y materiales: marco blanco neutro, sin color de elemento. El color de elemento solo va en el ambiente, el nombre, las pestañas y el panel.
- Equipos: tarjeta con número, título y, junto al título, los nombres de los integrantes; dentro solo iconos de cabeza (`RoleHeadIcon`), pequeños, sin nombre ni rol visibles. Puede haber 1 equipo o más de 3.
- Armas: jerarquía visible: la mejor, grande; las alternativas, más pequeñas y debajo. Alternativas centradas, de 2 por fila. La `nota` no se muestra. Todas llevan stat principal y secundaria al nv. 90 (`Properties` de `/weapon/{id}`); solo la mejor lleva la descripción del efecto en refinamiento 1 (`Desc`, con «Ver más» pasadas 5 líneas). Equipos centrados, máximo 2 por fila.
- Mientras el usuario lo indique, el foco es el diseño; la búsqueda de guías sólidas va después. Donde aún no hay build, se muestra el marco con la imagen vacía y el mismo formato.

## Versionado (regla obligatoria)

La versión vive en `package.json` (campo `"version"`, formato `X.Y.Z`) y se muestra en la web: al final del menú lateral (`v0.1.0`, bajo «Datos: encore.moe») y, en móvil, al final de la línea legal. Se lee con `import { version } from '../package.json'` en `App.jsx`; no se escribe a mano en ningún otro sitio.

| Número         | Cuándo sube                                                | Ejemplos                                                                                                    |
| -------------- | ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `0.0.Z` parche | Cambios pequeños                                           | un nombre, un icono, un texto, un margen, un bug                                                            |
| `0.Y.0` menor  | Cambio mayor, pero dentro de lo ya existente, o algo nuevo | rediseñar una sección completa (Ecos, Equipos), agregar un apartado o función (la página de Armas)          |
| `X.0.0` mayor  | Cambio muy grande o que rompe lo anterior                  | lanzamiento público (1.0.0), rehacer el sitio, cambiar la estructura de `builds.json` de forma incompatible |

- Al subir un número, los de la derecha vuelven a 0 (`0.1.3` → `0.2.0`).
- Un cambio que mezcla niveles sube el más alto. Si dudas entre dos niveles, propón el menor y pregunta en el plan.
- **Cada cambio aplicado decide su nivel, lo propone en el plan** y, con el «aplica», actualiza `package.json` en ese mismo cambio. Nunca queda para después.
- Cambios solo de reglas, documentación o handoffs (sin tocar la web) no suben versión.
- Mientras el primer número sea 0 el proyecto está en desarrollo; pasa a `1.0.0` solo cuando el usuario diga que se publica.
- **Línea base**: el versionado se empezó tarde (handoff 52, `0.1.0`). Los handoffs 01 a 51 son historial sin versión y no se reasignan.
- El handoff y `INDEX.md` llevan la versión (ver «Handoff al terminar un cambio») y el resumen de traspaso la incluye.

## Comandos

```bash
pnpm install
pnpm dev
pnpm build
pnpm preview
```

Usa siempre pnpm, nunca npm. No hay tests ni linter configurados; no los agregues sin aprobación.

## Stack y estructura (propuesto, por confirmar en la fase 0)

React 18 + Vite 5, JavaScript (no TypeScript), ESM, sin backend propio.

```
src/
  main.jsx            monta <App /> en StrictMode
  App.jsx             rutas: inicio y personaje
  api.js              único cliente de la API Encore y los mapeos de datos
  components/         tarjetas, filtros, secciones de la guía, materiales
  styles.css          todos los estilos
```

## Convenciones de código

- Componentes de función con hooks.
- Sin punto y coma, comillas simples, 2 espacios, coma final en listas multilínea.
- Comentarios y textos de interfaz en español. Comentarios breves que explican el porqué.
- No agregues dependencias npm sin aprobación.

### Estilos

- CSS plano en `src/styles.css`, sin preprocesadores ni CSS-in-JS.
- Colores como tokens en `:root`; si hay tema claro, se redefine en `@media (prefers-color-scheme: light)`.
- Cada bloque nuevo va al final con un comentario `/* ---- nombre ---- */` y clases con prefijo propio.
- La interfaz debe funcionar a 390 px de ancho sin desborde horizontal.
- Las animaciones respetan `prefers-reduced-motion`.
- El fondo temático no debe perjudicar la legibilidad ni el rendimiento (imagen optimizada, texto con
  contraste suficiente).

### Datos y API

- Toda la integración con la API Encore vive en `api.js`. Si el formato cambia, se ajusta ahí y solo ahí.
- Los datos se piden a la API en vivo; no se guardan datasets en el repo. Un caché en memoria durante la
  sesión para no repetir peticiones es aceptable; cualquier otro almacenamiento requiere aprobación.
- Si hay `localStorage`, claves con prefijo `wuwa-builds:`, todo acceso en `try/catch`, y la app debe
  funcionar aunque el almacenamiento esté bloqueado.
- Maneja estados de carga y error de la API en cada vista; la app no debe romperse si la API falla.
- Las imágenes se enlazan desde la fuente que indique la API. Antes de proponer una imagen o endpoint,
  comprueba que exista.

## Verificación antes de dar algo por terminado

- No se exige `pnpm build`: el sandbox no tiene red ni el entorno local, y el usuario prueba con `pnpm dev`. No lo repitas en cada respuesta; basta una línea en el handoff con lo que sí se revisó (por ejemplo, sintaxis con esbuild).
- Cambios visuales: revisar en escritorio (1440×900), móvil vertical (390×844) y móvil horizontal
  (844×390). Si hay animación, también con `prefers-reduced-motion`.
- Reporta con honestidad lo que se revisó, y avisa solo de riesgos concretos (por ejemplo, si no se pudo probar la API); no repitas la limitación general del sandbox.
- Al terminar, borra `dist/` si lo generaste y detén los servidores que levantaste.

## Handoff al terminar un cambio

Todo cambio aplicado y verificado se cierra con un handoff breve. Los handoffs viven fuera del proyecto:

`/Users/c.santamaria/Documents/tvup_projects/handoffs/wuwa-builds/`

- Si la carpeta no existe, créala con su `INDEX.md`.
- Crea un archivo nuevo `NN-YYYY-MM-DD-slug.md`, con NN = el número más alto existente + 1
  (dos dígitos, empezando en `01`).
- Escríbelo en español y conciso, con: título y cabecera con **Fecha**, **Versión** (`X.Y.Z` anterior → nueva, con el nivel y el porqué) y **Estado** (qué quedó verificado
  y qué no); **Pedido**; **Decisiones del usuario**; **Qué se hizo** (archivos tocados y para qué);
  **Verificación**; **Pendientes**.
- Añade su línea arriba del todo en `INDEX.md`, con este formato:
  `- **YYYY-MM-DD** — [resumen en una frase](NN-YYYY-MM-DD-slug.md) — estado · vX.Y.Z`
  (las líneas anteriores a la 52 no llevan versión: son historial previo al versionado).
- Nunca edites entradas anteriores. Si algo cambió, va en una entrada nueva.
- Al entregar un zip, los handoffs van en `handoffs/` en la raíz del proyecto, con los archivos directamente dentro (sin subcarpeta `wuwa-builds/`), para copiarlos de una vez a la carpeta central.

## Git

Hoy el proyecto no usa git. Si se inicializa:

- Mensajes en inglés, breves, con Conventional Commits, sin trailer `Co-Authored-By`.
- Nunca crees tags, commits de release ni hagas push: eso lo hace el usuario.
- Materiales: cada sección (personaje, habilidades, arma personal si hay) va en su propio marco con el estilo de las tarjetas de armas (borde y degradado del color del elemento), uno bajo otro y centrados (máx. 620 px), con la cuadrícula de iconos emparejada dentro. Títulos en Cinzel (Google Fonts) con icono blanco a la izquierda: cabeza del Errante (1309, igual en todos) en Ascensión, estrella propia (SVG en `Materials.jsx`) en Habilidades e icono del tipo de arma en Arma personal. Nada copiado al proyecto.
- Títulos de sección de la página de personaje (`.char-page-section > h3`): todos con el mismo estilo que «Materiales»: Cinzel, centrados, con espaciado de letras y tono claro del color del elemento.
- Ecos (sección «Ecos»), tres zonas (máx. 960 px). Arriba, dos columnas desde 700 px de ancho (izquierda y derecha, nunca una sobre otra salvo en móvil angosto) alineadas por fila (subgrid) con divisor vertical difuminado del color del elemento: **izquierda «Sets»** (`ecos.sets` = combinación principal: el primero grande con «N piezas», los demás pequeños con «+ N» e icono; y, opcional, `ecos.alternativas` = `[{ etiqueta, ecoPrincipal?, sets[{id, piezas}] }]` como tarjetas pequeñas) y **derecha «Eco principal» / «Ecos principales»**, ambos **de arriba abajo por prioridad**, una fila por set: el eco de cada fila va a la derecha de su set. Abajo, centrada y con divisor horizontal, **«Stats recomendadas»**: filas por coste (4, 3, 1), subestadísticas en cadena con «›» y nota pequeña. Por debajo de 700 px todo se apila y el divisor pasa a horizontal.
- Ecos, eco principal (`ecos.ecoPrincipal` = Id del eco; `alternativas[i].ecoPrincipal` opcional, si falta o es igual al principal no se repite): sin tarjeta, icono con marco blanco y brillo dorado suave, **icono del set arriba a la derecha** (insignia sin barra) y nombre al lado en Cinzel pequeño (completo en `title`). Etiqueta en singular con un solo eco y «Ecos principales» con dos o más. Sin build, marcos vacíos «Sin definir» (`EchoesEmpty`).
- Ecos, stats: se leen del texto de `ecos.stats` («Coste N: A o B (nota)», «Subestadísticas: A > B > C»; la nota entre paréntesis no se muestra). Desde 1100 px los costes van en una fila de hasta 3 tarjetas verticales centradas; debajo, apilados (máx. 560 px). Los chips llevan icono cuando se conoce (`statIconUrl` en `api.js`: ATQ, PS, DEF, Prob. CRIT, Daño CRIT, Regen. de energía; «Daño <elemento>» usa el icono del elemento); el resto va solo con texto. El coste 3 puede ser texto libre. Los efectos de 2 y 5 piezas no se muestran: `EffectDescription` trae `{0}` sin valores.
- Títulos de sección: margen inferior de 22 px (18 px en móvil) entre el título y el cuerpo.
- Guía (`/character/{id}?v=Beta`, todo dinámico y opcional): arriba **tags** (`Tags`, icono + nombre, borde y nombre en color de elemento, centrados con salto de fila; sin chips de rol, elemento, arma ni estrellas); después, en dos columnas desde 700 px, **Descripción** (`Introduction.Content`, «Ver más») y **Stats · Nv. 90** (`Properties[].GrowthValues` = `{growthId, level, value}` con `value` en minúscula; `BaseValue` de CRIT viene sin escalar, no usarlo); **Forte · Mecánicas básicas** a ancho completo (`SkillInputs[0]`: `SkillDescList` + `DescList` e `IconList` sin vacíos; nunca `InputDetails` ni `SkillTree`); al final **Habilidades** y **Modos de resonancia** (`SkillBranches`, selector icono + nombre, inicia en `IsDefault`); con menos de 2 modos solo habilidades, centradas. Sin imágenes locales.
