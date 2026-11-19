# Proyecto y datos

## 1. Identidad del proyecto

Nombre: WuWa Builds (wuwa-builds)
Tipo: Web personal sobre Wuthering Waves.
Objetivo: Catálogo de personajes (Resonadores), sus builds y materiales.

Los datos se consumen en vivo desde la API Encore. No se copian ni se almacenan datasets en el repositorio.

El nombre del proyecto es provisional.

Alcance funcional
Inicio: grilla de tarjetas con arte de cuerpo completo, nombre, elemento y tipo de arma. Filtros por elemento y arma. Fondo temático de Wuthering Waves (espacio o paisaje del mundo).
Página de personaje: guía, sets de ecos recomendados, mejores armas, mejores equipos, materiales de ascensión, talentos y materiales de su arma personal.
Arma personal: únicamente los personajes de 5 estrellas tienen esta sección. Los personajes de 4 estrellas y Rover (cualquier elemento) no muestran materiales de arma personal.

## 5. Fases e hitos del proyecto

Las fases son propuestas y pueden ajustarse con el usuario.

Base del proyecto y cliente API: reconocimiento de endpoints y formatos de datos.
Inicio: grilla de tarjetas, filtros y fondo temático.
Página de personaje: guía, ecos, armas y equipos.
Materiales: ascensión, talentos y arma personal.
Pulido: revisión responsive y acabados visuales.
### Avisos de hitos

Al terminar una fase o una parte importante, el asistente avisa explícitamente:

Hito completado: <qué>. Buen momento para generar un resumen y continuar en un chat nuevo.

También recomienda cambiar de chat cuando sea conveniente:

Conversaciones demasiado largas.
Muchas imágenes o páginas pesadas en el contexto.
Cierre de una tanda de trabajo.

No esperes a que el usuario lo solicite.

Ofrece generar un resumen de traspaso, pero solo lo generes cuando el usuario lo pida.

El resumen debe incluir:

Estado actual.
Decisiones tomadas.
Archivos clave.
Formato de los datos de la API.
Pendientes.

## 6. Stack y estructura

Stack propuesto, pendiente de confirmación durante la fase 0.

React 18.
Vite 5.
JavaScript (no TypeScript).
ESM.
Sin backend propio.
### Estructura propuesta

```text
src/
├── main.jsx
├── App.jsx
├── api.js
├── components/
└── styles.css
```

Responsabilidades:

main.jsx: monta <App /> dentro de StrictMode.
App.jsx: rutas de inicio y personaje.
api.js: único cliente de la API Encore y responsable de los mapeos de datos.
components/: tarjetas, filtros, secciones de guía y materiales.
styles.css: todos los estilos.

La estructura definitiva se confirma con el usuario.

### Convenciones de código
Componentes funcionales con hooks.
Sin punto y coma.
Comillas simples.
Indentación de 2 espacios.
Coma final en listas multilínea.
Comentarios y textos de interfaz en español.
Comentarios breves que expliquen el porqué de una decisión.

No agregues dependencias npm sin aprobación.

### Comandos

Utiliza siempre pnpm, nunca npm.

```bash
pnpm install
pnpm dev
pnpm build
pnpm preview
```

No hay tests ni linter configurados. No los agregues sin aprobación.

## 7. Datos y API Encore

### 7.1. Integración

Toda la integración con Encore debe vivir en api.js.

Si cambia el formato de la API, los ajustes se realizan ahí y únicamente ahí, salvo que exista una decisión aprobada que indique lo contrario.

Los datos se solicitan en vivo. No se guardan datasets en el repositorio.

Se permite caché en memoria durante la sesión para evitar peticiones repetidas.

Cualquier otro almacenamiento requiere aprobación.

### 7.2. Almacenamiento local

Si se utiliza localStorage:

Todas las claves deben llevar el prefijo wuwa-builds:.
Todo acceso debe estar dentro de try/catch.
La aplicación debe seguir funcionando si el almacenamiento está bloqueado.
### 7.3. Estados y errores

Todas las vistas deben gestionar:

Estado de carga.
Estado de error.
Ausencia de datos.

La aplicación no debe romperse si Encore falla.

### 7.4. Imágenes y endpoints

Las imágenes deben enlazarse desde las fuentes indicadas por la API.

Antes de proponer una imagen o un endpoint, comprueba que exista.

No inventes rutas, identificadores ni recursos.

### 7.5. Inspección de respuestas

Al investigar la API:

Utiliza un personaje como muestra.
Inspecciona únicamente los campos necesarios.
Comprueba la estructura real de las respuestas.
Evita imprimir listas completas en el chat.
Documenta en el handoff la forma de los datos descubierta.
