# Reglas de entrega

## 14. Versionado obligatorio

La versión oficial vive exclusivamente en package.json, campo version, con formato X.Y.Z.

La web debe mostrarla en:

Al final del menú lateral en escritorio.
En el pie de página en móvil, junto al enlace de Encore.

En App.jsx se importa mediante:

```js
import { version } from '../package.json'
```

No escribir manualmente la versión en ningún otro lugar de la aplicación.

### 14.1. Criterios de versionado

| Nivel | Cuándo se utiliza | Ejemplos |
| --- | --- | --- |
| Parche `0.0.Z` | Cambios pequeños | Nombre, icono, texto, margen o bug |
| Menor `0.Y.0` | Cambio importante dentro de lo existente o nueva funcionalidad | Rediseñar Ecos o Equipos, añadir sección de Armas |
| Mayor `X.0.0` | Cambio muy grande o incompatible | Publicación `1.0.0`, rehacer el sitio, cambiar incompatiblemente la estructura de `builds.json` |

Al subir un número, los de la derecha vuelven a cero.

Ejemplo: 0.1.3 → 0.2.0.

Si un cambio mezcla niveles, se utiliza el nivel más alto.

Si hay dudas entre dos niveles, El asistente propone el menor y consulta al usuario en el plan.

### 14.2. Actualización obligatoria

- Al iniciar un ajuste nuevo e independiente de la web, propone el nivel de versión en el plan y actualiza `package.json` en el mismo cambio aprobado. Esto aplica aunque el ajuste anterior todavía esté pendiente de publicar.
- Las iteraciones del mismo ajuste abierto conservan la versión asignada. Si el alcance crece y pasa a un nivel superior, propone ese nivel en el plan y actualiza `package.json` en el cambio aprobado.
- Dar por terminado un ajuste lo cierra. Publicar en producción cierra los ajustes incluidos en esa versión. Cualquier cambio posterior sobre un ajuste cerrado se versiona como un ajuste nuevo.
- Registra cada iteración aplicada en su handoff y en el índice con la versión correspondiente, aunque se repita.

Por ejemplo, si «Próximamente» pasa de `0.16.45` a `0.16.46`, las revisiones de su diseño conservan `0.16.46` mientras el ajuste siga abierto. Si después se inicia una corrección independiente en Armas, sube a `0.16.47` como parche, incluso antes de publicar.

Conserva la versión para cambios exclusivos de documentación, reglas, handoffs o del editor local. Registra los cambios del editor local en su handoff con la versión vigente. Si un cambio del editor afecta los datos que consume la web pública o cómo se muestran, aplica el nivel de versión correspondiente al impacto público.

Mientras el primer número sea 0, el proyecto sigue en desarrollo.

Solo se cambia a 1.0.0 cuando el usuario indique que se publica.

### 14.3. Línea base histórica

El versionado comenzó tarde, en el handoff 52, con 0.1.0.

Los handoffs 01 a 51 son historial previo al versionado. No se reasignan ni modifican.

La versión debe aparecer en:

Handoff.
INDEX.md.
Resumen de traspaso.

## 15. Verificación obligatoria

No se exige ejecutar pnpm build.

El sandbox no dispone del entorno local ni de la red necesarios. El usuario prueba la aplicación con pnpm dev.

No repitas esta limitación en cada respuesta. Basta con dejar constancia en el handoff de las verificaciones realizadas.

### 15.1. Cambios de código

Si cambia JSX:

Revisar sintaxis mediante esbuild.

No afirmar que se ha comprobado algo que no se ha ejecutado.

### 15.2. Cambios visuales

Durante la fase actual, revisar en escritorio a 1440 × 900. La revisión de móvil vertical a 390 × 844 y móvil horizontal a 844 × 390 queda para la fase responsive al final del proyecto.

Si existen animaciones, revisar también prefers-reduced-motion.

### 15.3. Reporte

el asistente debe indicar de forma honesta:

Qué se verificó.
Qué no se pudo verificar.
Riesgos concretos.

Por ejemplo, si no fue posible probar una respuesta real de la API, indicarlo.

No repetir limitaciones generales del sandbox.

### 15.4. Limpieza

Al finalizar:

Eliminar dist/ si se generó.
Detener los servidores que se hayan levantado.

## 16. Handoff obligatorio al terminar un cambio

Todo cambio aplicado y verificado debe cerrarse con un handoff breve.

### Numeración

Cada handoff utiliza el formato:

NN-YYYY-MM-DD-slug.md

Donde:

NN es el número más alto existente más uno.
Debe tener dos dígitos.
Empieza en 01.

Nunca reutilices un número.

### Contenido obligatorio

El handoff se escribe en español y de forma concisa.

Debe incluir:

Título.
Fecha.
Versión anterior → nueva.
Nivel de versión y motivo.
Estado: qué quedó verificado y qué no.
Pedido.
Decisiones del usuario.
Qué se hizo.
Archivos tocados y propósito.
Verificación.
Pendientes.
### Actualización del índice

Añade la entrada nueva al principio de INDEX.md.

Formato:

```md
- **YYYY-MM-DD** — [resumen en una frase](NN-YYYY-MM-DD-slug.md) — estado · vX.Y.Z
```

Las entradas anteriores al handoff 52 no llevan versión.

Nunca edites entradas anteriores.

Si algo cambia respecto a un handoff previo, crea una entrada nueva que documente la actualización.

### Entrega de ZIP

Si se entrega un ZIP, los handoffs deben incluirse en:

```text
handoffs/
├── INDEX.md
├── 01-YYYY-MM-DD-slug.md
└── ...
```

Los archivos deben estar directamente dentro de handoffs/, sin crear una subcarpeta wuwa-builds/.

Así el usuario puede copiarlos de una sola vez a la carpeta central.

## 17. Git

Actualmente el proyecto no utiliza Git.

Si el usuario aprueba inicializarlo:

Mensajes en inglés.
Mensajes breves.
Formato Conventional Commits.
Sin trailer Co-Authored-By.

Nunca:

Crees tags.
Crees commits de release.
Hagas push.

Estas acciones corresponden al usuario.

### Revisión del catálogo antes de un commit

Antes de preparar un commit, comprueba si `src/data/builds.json` cambió frente a `HEAD`, aunque el usuario no haya mencionado las builds. Resume las entradas nuevas, las fichas editadas por sección y los demás cambios del sitio. Distingue lo preparado en Git de los cambios posteriores en el árbol de trabajo. Si el alcance es ambiguo, confirma con el usuario qué builds incluir antes de prepararlas. Consulta el [Death Note del catálogo](DEATH-NOTE-CATALOGO.md#revisión-antes-de-un-commit).

Las builds nuevas o actualizadas por el usuario se consideran terminadas para el seguimiento del catálogo. Las correcciones de metadatos por sí solas se informan aparte. El alcance del commit se determina por el pedido del usuario.
