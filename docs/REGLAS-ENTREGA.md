# Reglas de entrega

## 14. Versionado obligatorio

La versión oficial vive exclusivamente en package.json, campo version, con formato X.Y.Z.

La web debe mostrarla en:

Final del menú lateral, debajo de «Datos: encore.moe».
En móvil, al final de la línea legal.

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

Cada cambio aplicado debe:

Determinar el nivel de versión.
Proponerlo en el plan.
Actualizar package.json en el mismo cambio aprobado.

Nunca dejes el versionado para después.

Los cambios exclusivos de documentación, reglas o handoffs no incrementan la versión si no modifican la web.

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
