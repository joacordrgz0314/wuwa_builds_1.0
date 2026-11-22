# Reglas de fichas

## 8. Reglas de contenido de las builds

### 8.1. Orden de los equipos

Todos los equipos deben seguir siempre este orden:

DPS principal.
Sub-DPS.
Apoyo.

Esta regla prevalece sobre el orden que indique cualquier fuente.

Cada personaje puede mostrar los dúos y apoyos que se recomienden para su ficha. El título de cada equipo puede editarse.

Cada ranking de armas sigue la selección de cinco opciones definida en la sección 10.3.

### 8.2. Roles

Cada integrante de un equipo debe tener su rol en builds.json.

El rol se muestra en pantalla únicamente como title del icono.

Ejemplos:

DPS principal
Daño extra y sinergia Unison
Curación, agrupa enemigos y buffs
### 8.3. Textos de las builds

Nunca escribas frases como:

«Según la guía».
«Según las guías».
«La guía consultada».

Tampoco cites fuentes dentro de los textos. El texto mostrado constituye directamente la guía.

### 8.4. Campo `guia`

En builds.json, guia admite:

Un texto suelto.
Una lista de bloques con estructura { titulo, texto }.

Se prefieren bloques cortos con título.

El bloque guia ya no se muestra en pantalla, pero el dato se conserva.

Todo el contenido visible de la sección Guía debe proceder de la API. No se escribe manualmente.

### 8.5. Actualidad de los equipos

Los equipos deben reflejar las mejores composiciones actuales.

Ejemplo: Lily como apoyo de Suoming y Hsin.

Revisa que no queden equipos desactualizados.

## 9. Reglas generales de diseño

### 9.1. Iconografía

Los iconos de personajes, armas y materiales deben utilizar:

Marco blanco neutro.
Ningún color de elemento en el marco.

El color del elemento se reserva para:

Ambiente.
Nombre del personaje.
Pestañas.
Paneles.
### 9.2. Prioridad de escritorio y responsive

Hasta cerrar el proyecto, el diseño, la implementación visual y la revisión se enfocan exclusivamente en escritorio a 1440 × 900.

Los demás dispositivos se revisan al final del proyecto en una fase propia. Durante el trabajo de escritorio no se dedican tandas a pulir móvil ni horizontal, salvo que un cambio compartido rompa una interacción esencial.

La interfaz debe conservar su base responsive existente y evitar desbordamientos nuevos, pero la validación visual obligatoria de esta etapa es escritorio a 1440 × 900.

### 9.3. Accesibilidad y rendimiento
Las animaciones deben respetar prefers-reduced-motion.
El fondo temático no debe perjudicar la legibilidad.
Las imágenes de fondo deben estar optimizadas.
Los textos deben mantener contraste suficiente.
### 9.4. Estilos

Utiliza exclusivamente CSS plano en src/styles.css.

No utilizar:

Preprocesadores CSS.
CSS-in-JS.

Los colores deben definirse como tokens en :root.

Si existe tema claro, sus valores se redefinen en:

```css
@media (prefers-color-scheme: light)
```

Cada bloque nuevo debe añadirse al final del archivo, con un comentario identificador:

```css
/* ---- nombre ---- */
```

Las clases deben tener un prefijo propio para evitar conflictos.

## 10. Diseño de la página de personaje

### 10.1. Títulos de sección

Todos los títulos de sección de la página de personaje (.char-page-section > h3) deben seguir el estilo de «Materiales»:

Tipografía Cinzel.
Centrados.
Espaciado entre letras.
Tono claro del color del elemento.

Separación entre título y cuerpo:

Escritorio: 22 px.
Móvil: 18 px.
### 10.2. Equipos

Los equipos se presentan en tarjetas con:

Número.
Título.
Nombres de los integrantes junto al título.

Dentro de la tarjeta aparecen exclusivamente iconos de cabeza (RoleHeadIcon).

Características:

Iconos pequeños.
Sin nombres visibles dentro.
Sin roles visibles dentro.
Puede haber entre uno y cuatro equipos.
Equipos centrados.
Máximo dos tarjetas por fila.
Los equipos con el mismo DPS principal y sub-DPS se agrupan en una tarjeta; los apoyos alternativos se muestran dentro de «Variantes».
Cada configuración dentro de «Variantes» ocupa su propia fila desplazable. Si supera el ancho disponible, muestra su propio desvanecido y conserva el desplazamiento horizontal.

Cada dúo puede tener un apoyo principal y las alternativas que se recomienden en la ficha.

### 10.3. Armas

La jerarquía visual debe distinguir claramente:

Mejor arma:

Tamaño grande.
Primera en la sección.
Muestra estadísticas y descripción del efecto.

Armas alternativas:

Tamaño más pequeño.
Debajo de la mejor arma.
Centradas.
Dos por fila.
Sin mostrar la nota.

Todas las armas deben mostrar:

Estadística principal al nivel 90.
Estadística secundaria al nivel 90.

Las estadísticas se obtienen de Properties de /weapon/{id}.

Solo la mejor arma muestra la descripción del efecto en refinamiento 1 (Desc).

La descripción debe incluir un «Ver más» cuando supere las cinco líneas.
Cada ranking tiene como máximo cinco armas. La selección incluye las dos mejores por rendimiento individual, una permanente de 5 estrellas competitiva y las dos mejores armas de 4 estrellas por rendimiento individual, tengan o no etiqueta `F2P`. Si un arma de 4 estrellas ya ocupa uno de los dos primeros puestos, se añaden igualmente las dos siguientes mejores de 4 estrellas en los puestos cuatro y cinco. Entre esos dos últimos puestos puede haber como máximo un arma `BP`; si las dos mejores fueran `BP`, se conserva la mejor y se salta a la siguiente opción sin `BP`. En igualdad de porcentaje, se prioriza el arma sin `BP`. No se usan armas de 3 estrellas.

Todas las armas muestran junto a su nombre el refinamiento usado en la comparación, de `R1` a `R5`.

Las armas permanentes se identifican como tales. Las F2P muestran el refinamiento usado en la comparación.
La insignia «Permanente» se usa cuando se ha confirmado que el arma pertenece al catálogo permanente.
Antes de guardar un arma `PERMA`, se cruzan su nombre e ID exactos con Encore en el idioma mostrado por la web. No se deduce el ID por patrones de numeración ni por armas vecinas.

### 10.4. Ausencia de builds

Mientras el usuario indique que el foco es el diseño, se prioriza la estructura visual frente a la búsqueda de guías sólidas.

Si un personaje todavía no tiene build:

Se conserva el marco.
Se muestra la imagen vacía.
Se mantiene el mismo formato visual.

No se debe eliminar una sección únicamente porque falten datos.

## 11. Sección Materiales

Cada sección debe tener su propio marco, con el estilo de las tarjetas de armas:

Borde.
Degradado del color del elemento.
Una sección debajo de otra.
Contenido centrado.
Ancho máximo de 620 px.
Cuadrícula de iconos emparejada dentro del marco.

Secciones posibles:

Ascensión del personaje.
Habilidades.
Arma personal, cuando corresponda.
Títulos e iconos

Todos los títulos utilizan Cinzel.

Cada título lleva un icono blanco a la izquierda:

Ascensión: cabeza del Errante, ID 1309, igual para todos.
Habilidades: estrella propia mediante SVG en Materials.jsx.
Arma personal: icono del tipo de arma.

No se deben copiar imágenes al proyecto.

## 12. Sección Ecos

### 12.1. Estructura general

La sección Ecos tiene tres zonas y un ancho máximo de 960 px.

Zona superior:

Desde 700 px de ancho:

Dos columnas.
Izquierda: Sets.
Derecha: Eco principal / Ecos principales.
Alineación por filas mediante subgrid.
Divisor vertical difuminado del color del elemento.

En móvil angosto:

Las columnas se apilan.
El divisor vertical pasa a horizontal.

Zona inferior:

Stats recomendadas.
Centrada.
Separada mediante divisor horizontal.
### 12.2. Sets

Se obtienen de ecos.sets.

Representan la combinación principal:

Todos los sets principales y alternativos se muestran con el mismo tamaño de tarjeta, icono y título.
Cada set muestra «N piezas».
No se muestra una etiqueta adicional en inglés cuando el título del set ya está disponible en español.
Cuando una build combine varios sets, se muestran juntos los iconos y la cantidad de piezas de cada uno. Una combinación 1 + 2 + 2 utiliza tres iconos; una combinación 3 + 2 utiliza dos.
En pantalla no se muestran signos `+` entre las partes de una combinación. Cada parte conserva únicamente su icono y su cantidad de piezas.

Opcionalmente puede existir ecos.alternativas:

```js
[
{
etiqueta,
ecoPrincipal?,
sets: [
{
id,
piezas,
},
],
},
]
```

Las alternativas mantienen la misma jerarquía visual que el set principal.

### 12.3. Eco principal

Se obtiene de ecos.ecoPrincipal, que contiene el ID del eco.

Las alternativas pueden tener su propio ecoPrincipal.

Reglas:

El eco principal se muestra a la derecha de su set correspondiente.
Los ecos se ordenan de arriba abajo por prioridad.
Cada fila contiene el set a la izquierda y su eco a la derecha.
Si una alternativa no tiene eco propio, no se repite el principal.
Si su eco coincide con el principal, tampoco se repite.

Presentación del eco:

Sin tarjeta.
Icono con marco blanco.
Brillo dorado suave.
Insignia del set arriba a la derecha, sin barra.
Nombre al lado, en Cinzel pequeño. La fila se alinea a la izquierda para que los iconos mantengan una columna estable aunque los nombres tengan distinta longitud.
El nombre completo debe estar disponible en title.

Etiquetas:

Un solo eco: «Eco principal».
Dos o más: «Ecos principales».

Si no existe build, utilizar marcos vacíos con el texto «Sin definir» mediante EchoesEmpty.

### 12.4. Stats recomendadas

Se leen del texto ecos.stats.

Formatos:

```text
Coste N: A o B (nota)
Subestadísticas: A > B > C
```

Reglas:

La nota entre paréntesis no se muestra.
Los costes se ordenan 4, 3, 1.
Las subestadísticas se muestran en cadena utilizando ›.
La nota pequeña se conserva cuando corresponda al formato visual definido.
Las alternativas de coste 4 se muestran en burbujas separadas y apiladas, cada una con su icono.
Las dos estadísticas del coste 3 se muestran en burbujas separadas y apiladas, cada una con su icono.
Si las dos estadísticas del coste 3 son iguales, se muestran en una sola burbuja con `×2`.
En coste 1 se muestra el icono de la estadística y la cantidad `×2` alineada a la derecha.

Distribución:

Desde 1100 px, los costes aparecen en una fila de hasta tres tarjetas verticales centradas.
Debajo se muestran las subestadísticas apiladas.
Ancho máximo de las subestadísticas: 560 px.

Iconos de estadísticas

En api.js, implementar statIconUrl para reconocer:

ATQ.
PS.
DEF.
Prob. CRIT.
Daño CRIT.
Regen. de energía.

«Daño [elemento]» utiliza el icono del elemento correspondiente.

Las estadísticas sin icono conocido se muestran únicamente como texto.

El coste 3 puede contener texto libre.

No mostrar los efectos de dos y cinco piezas: EffectDescription contiene {0} sin valores.

### 12.5. Modos compartidos

El selector de modo se muestra de forma independiente en Ecos, Armas y Equipos.

Si todos los modos producen el mismo resultado en una sección, esa sección muestra una sola versión y oculta el selector. Si el contenido cambia, conserva el selector y cada resultado correspondiente.

## 13. Sección Guía

Ruta:

/character/{id}?v=Beta

Todo el contenido es dinámico y opcional.

No se utilizan imágenes locales.

### 13.1. Tags

Aparecen en la parte superior.

Procedencia: Tags.

Presentación:

Icono y nombre.
Borde y nombre con el color del elemento.
Centrado.
Permite salto de fila.

No incluir chips de:

Rol.
Elemento.
Arma.
Estrellas.
### 13.2. Descripción y estadísticas

Desde 700 px, dos columnas:

Descripción

Procedencia: Introduction.Content.
Incluye «Ver más».

Stats · Nv. 90

Procedencia: Properties[].GrowthValues.
Cada entrada contiene { growthId, level, value }.
value se encuentra en minúscula.

No utilizar BaseValue de CRIT porque viene sin escalar.

### 13.3. Forte · Mecánicas básicas

Ocupa el ancho completo.

Fuente:

SkillInputs[0]

Utilizar:

SkillDescList.
DescList.
IconList, excluyendo elementos vacíos.

Nunca utilizar:

InputDetails.
SkillTree.

Cuando `SkillDescList` y `DescList` estén presentes, una línea divisora interna separa ambos grupos sin sacarlos de la tarjeta de Mecánicas básicas. Si solo existe uno de los grupos, no se añade divisor.

### 13.4. Habilidades y modos de resonancia

Fuente: SkillBranches.

Presentación:

Selector con icono y nombre.
Inicia en el modo que tenga IsDefault.

Si existen menos de dos modos:

Mostrar únicamente habilidades.
Centrarlas.

### 13.5. Paneles de contenido completo

Todo «Ver más» dentro de cuadros internos abre un panel flotante como «Ver variantes». La tarjeta conserva su altura y no se expande hacia abajo.

El botón «Cerrar» de todos estos paneles permanece separado del título y alineado en la esquina superior derecha.

El panel muestra el contenido completo, admite desplazamiento interno, se cierra con su botón o con Escape y devuelve el foco al control que lo abrió mediante el comportamiento nativo de `dialog`.
