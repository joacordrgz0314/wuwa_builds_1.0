# DEATH NOTE · WuWa Builds

**18 de noviembre de 2026 · Versión `0.12.0` · Último handoff `90`**

**Próxima entrada recomendada: revisar la tanda F y las rotaciones en escritorio y seleccionar la siguiente tanda del catálogo.**

`[x]` Hecho · `[ ]` Pendiente · **Bloqueado** indica que falta una decisión o evidencia.

## Páginas cerradas

- [x] **Prioridad de escritorio.** El diseño y la verificación visual se enfocan en 1440 × 900 hasta el cierre del proyecto. La revisión de los demás dispositivos queda para la fase final.
- [x] **Diseño compartido de builds.** Sets del mismo tamaño, Ecos principales alineados a la izquierda, coste 4 con alternativas separadas, rankings de cinco armas con porcentajes y dos F2P, y «Ver más» en panel flotante. [Handoff 70](../../handoffs/70-2026-11-17-builds-escritorio-unificadas.md)
- [x] **Corrección compartida de builds.** Paneles con cierre arriba a la derecha; stats de costes 3 y 1 separadas, con iconos y cantidades; rankings sin armas de 3 estrellas, con permanente competitiva y dos F2P; DPR completado para Suoming DPS. [Handoff 71](../../handoffs/71-2026-11-18-correccion-builds-escritorio.md)
- [x] **Variantes y etiquetas contrastadas.** Suoming comparte todas las variantes del dúo Hsin + Suoming y reúne las alternativas publicadas de Suoming + Lynae. «Permanente» queda reservado a armas etiquetadas `PERMA`; `×2` recupera el color normal. [Handoff 72](../../handoffs/72-2026-11-18-variantes-y-perma.md)
- [x] **IDs PERMA corregidos.** Ondas cósmicas y Esmeralda del Génesis sustituyen los IDs que mostraban Maestro de cuerdas y Brillo abrasador. Homogeneizador fásico ya era correcto. [Handoff 73](../../handoffs/73-2026-11-18-ids-perma-corregidos.md)

- [x] **Inicio y navegación.** Grilla, filtros, carga, menú lateral y ambiente.
- [x] **Ficha de personaje.** Pestañas, Materiales y diseño base de Ecos, Armas y Equipos.
- [x] **Selección de pestañas.** Barra corregida y verificada con clic, toque emulado y teclado. [Handoff 61](../../handoffs/61-2026-11-17-pestanas-personaje.md)
- [x] **Ajuste visual de escritorio.** Barra, panel principal y controles con jerarquía más clara desde 1100 px. [Handoff 63](../../handoffs/63-2026-11-17-ficha-escritorio.md)
- [x] **Fondo de pestañas en escritorio.** Panel azul oscuro translúcido aprobado y aplicado. [Handoff 64](../../handoffs/64-2026-11-17-fondo-pestanas-escritorio.md)
- [x] **Fondos de la ficha en escritorio.** Paneles y tarjetas más opacos para mejorar la lectura. [Handoff 65](../../handoffs/65-2026-11-17-fondos-ficha-escritorio.md)
- [x] **Retrato en la ficha.** Menor opacidad del panel exterior desde 1100 px. [Handoff 66](../../handoffs/66-2026-11-17-opacidad-panel-exterior.md)
- [x] **Retrato y títulos.** Panel exterior a 0.55 y fondo oscuro en títulos, solo en escritorio. [Handoff 67](../../handoffs/67-2026-11-17-panel-titulos-escritorio.md)
- [x] **Títulos sin fondo.** El fondo oscuro del título se sustituyó por una sombra de texto en escritorio. [Handoff 68](../../handoffs/68-2026-11-17-titulos-sin-fondo.md)
- [x] **Guía en vivo desde Encore.** Tags, descripción, stats al nivel 90, Forte, habilidades y modos. El [handoff 59](../../handoffs/59-2026-11-17-guia-ficha-ampliada.md) registra la revisión de sintaxis. El resumen de traspaso posterior registra la prueba en pantalla del usuario.

## 01 · Hsin — prueba de extracción

- [x] **Equipos.** Selección de cuatro composiciones, con DPR y apoyos agrupados.
- [x] **Armas.** Top cinco por modo con cuatro puestos en común. Freeze Frame ocupa el quinto en Unison y Rime-Draped Sprouts ocupa el quinto en Electro Flare.
- [x] **Ecos.** Heart of Sworn Vigil es el set recomendado. Void Thunder figura como comparación desaconsejada. Se extrajeron el Eco principal, los costes, las prioridades y los objetivos publicados.
- [x] **Informe.** Ficha piloto entregada en el chat con los datos ausentes y ambiguos.

## 02 · Guía — pendientes de la ficha

- [x] Ajuste de **Descripción** con **Stats** y de **Modos** con **Habilidades** cuando están lado a lado. «Ver más» expande su propio panel. Se quitó el prefijo «Modo de resonancia:» del selector.
- [x] Popover de tags implementado con puntero, teclado y toque.
- [x] **DEF 0 de Jingran (`1212`)** diagnosticada. Encore devuelve `0` como base y al nivel 90.

## 03 · Hsin — llevar la ficha validada a la web

- [x] **Equipos.** Cuatro composiciones con DPR y tres retratos por tarjeta. El panel independiente muestra apoyos alternativos y condiciones.
- [x] **Armas.** Cinco opciones por modo. Unison abre por defecto y Electro Flare cambia el quinto puesto. Las estadísticas y el efecto del arma principal se cargan desde Encore.
- [x] **Ecos.** Heart of Sworn Vigil, prioridades por modo y objetivos con unidad clara en el diseño existente.
- [x] **Entrega de las fases 02 y 03.** Versión combinada **`0.4.0`**. [Handoff 60](../../handoffs/60-2026-11-17-guia-y-piloto-hsin.md)

## 04 · Después del piloto

- [x] Abrir **Suoming y Lily**, identificar sus modos y preparar informes preliminares. [Plan del catálogo](DEATH-NOTE-CATALOGO.md)
- [x] Revisar DPR, rankings de armas, sets y condiciones publicadas de **Suoming y Lily**. [Informe actualizado](DEATH-NOTE-CATALOGO.md)
- [x] Cargar **Suoming con Hsin** y **Lily en Unison** como vistas iniciales, conservando los demás modos seleccionables.
- [x] Agrupar apoyos alternativos de Suoming en «Variantes», mostrar solo DPR y limitar cada ranking a cinco armas con dos F2P.
- [x] Revisión visual de Hsin, Suoming y Lily a 1440 × 900 validada por el usuario. Lily sigue en preparación.
- [x] Cargar la tanda B de Lynae, Jingran y Qingxiao con cuatro equipos por ficha y sus variantes. [Handoff 76](../../handoffs/76-2026-11-18-tanda-b-cuatro-equipos.md)
- [x] Unificar las condiciones de los tres integrantes e incorporar iconos de set en «Ver variantes». [Handoff 77](../../handoffs/77-2026-11-18-sets-variantes.md)
- [x] Mostrar secuencia, refinamiento e icono de set junto a cada nombre en las tarjetas principales de equipos. [Handoff 78](../../handoffs/78-2026-11-18-sets-equipos-principales.md)
- [x] Cargar la tanda C con Errante Electro, Suisui y Yangyang: Xuanling. [Handoff 81](../../handoffs/81-2026-11-18-tanda-c-builds.md)
- [x] Cargar la tanda D con Lucilla, Lucy y Rebecca, incluidos modos, cuatro dúos por ficha en el conjunto aprobado y variantes compartidas. [Handoff 86](../../handoffs/86-2026-11-18-tanda-d-builds.md)
- [x] Completar los sets 1 + 2 + 2 de Lucy y Rebecca, mostrar todos sus iconos y compactar estadísticas repetidas de coste 3 con `×2`. [Handoff 87](../../handoffs/87-2026-11-18-sets-combinados.md)
- [x] Cargar la tanda E con Denia, Hiyuki y Sigrika, incluidos seis rankings por modo, 39 equipos agrupados y 283 configuraciones con DPR. [Handoff 88](../../handoffs/88-2026-11-18-tanda-e-builds.md)
- [x] Corregir la tanda E a cuatro equipos por ficha, completar los costes de Sigrika, simplificar las combinaciones de sets y desplazar cada configuración alternativa en su propia fila. [Handoff 89](../../handoffs/89-2026-11-18-correccion-tanda-e.md)
- [x] Cargar la tanda F con Luuk Herssen, Aemeath y Mornye; añadir duración a todas las rotaciones y actualizar los rankings con dos armas de 4 estrellas, máximo una `BP` y refinamiento visible. [Handoff 90](../../handoffs/90-2026-11-18-tanda-f-rotaciones-armas.md)
- [ ] Continuar con el resto del catálogo por tandas según el [plan de extracción](DEATH-NOTE-CATALOGO.md).
- [ ] Retomar la página de **Armas** con selector de refinamiento cuando cierre la tanda de builds.

## Traspaso para los agentes

El flujo vigente y las reglas de lectura están en [AGENTS.md](../../AGENTS.md).

El usuario confirmó `handoffs/` del repo como historial oficial en Windows.

```md
- [ ] Tarea · Estado: pendiente
  Evidencia: enlace, prueba o handoff
  Verificación pendiente:
  Próximo paso:
```
