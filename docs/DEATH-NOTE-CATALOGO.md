# Death Note del catálogo de personajes

El usuario prepara y edita las builds de personajes de forma manual, en el editor local o en `src/data/builds.json`. Si hay una build nueva o actualizada por el usuario, se considera terminada. El asistente revisa, valida o aplica cambios de datos únicamente cuando el usuario lo pide y aprueba el alcance.

## Seguimiento de builds

**Punto de partida · 25 de noviembre de 2026**

Las fichas trabajadas por el usuario pasan a **Listo** con `[x]`. **En curso** queda disponible para trabajo parcial que el usuario identifique expresamente. Las correcciones de metadatos por sí solas, como un ID o una fecha, se registran aparte. El orden dentro de cada bloque sigue el catálogo por estreno y sirve de referencia.

- **Armas.** Revisa el ranking, los nombres, los IDs y los refinamientos según [Reglas de fichas](REGLAS-FICHAS.md).
- **Ecos.** Revisa el set, el Eco principal, los costes y las subestadísticas.
- **Equipos.** Revisa la composición y los retratos de sus integrantes.

### Listo

28 fichas confirmadas por el usuario.

- [x] **Lily** (`1512`)
- [x] **Suoming** (`1312`)
- [x] **Hsin** (`1311`)
- [x] **Jingran** (`1212`)
- [x] **Qingxiao** (`1413`)
- [x] **Suisui** (`1110`)
- [x] **Errante: Electro** (`1309`)
- [x] **Yangyang: Xuanling** (`1610`)
- [x] **Lucilla** (`1109`)
- [x] **Rebecca** (`1308`)
- [x] **Lucy** (`1511`)
- [x] **Denia** (`1211`)
- [x] **Hiyuki** (`1108`)
- [x] **Sigrika** (`1412`)
- [x] **Luuk Herssen** (`1510`)
- [x] **Aemeath** (`1210`)
- [x] **Mornye** (`1209`)
- [x] **Lynae** (`1509`)
- [x] **Buling** (`1307`)
- [x] **Chisa** (`1508`)
- [x] **Qiuyuan** (`1411`)
- [x] **Galbrena** (`1208`)
- [x] **Iuno** (`1410`)
- [x] **Augusta** (`1306`)
- [x] **Phrolova** (`1608`)
- [x] **Lupa** (`1207`)
- [x] **Cartethyia** (`1409`)
- [x] **Ciaccona** (`1407`)

### En curso

Sin fichas en curso registradas. Si el usuario indica que una ficha está en curso, se pueden abrir casillas de Armas, Ecos y Equipos para seguirla.

### Lo que viene

33 fichas pendientes. El usuario elige en qué orden trabajarlas.

- [ ] **Zani** (`1507`)
- [ ] **Errante: Aero** (`1406`)
- [ ] **Cantarella** (`1607`)
- [ ] **Brant** (`1206`)
- [ ] **Phoebe** (`1506`)
- [ ] **Roccia** (`1606`)
- [ ] **Carlotta** (`1107`)
- [ ] **Lumi** (`1504`)
- [ ] **Camellya** (`1603`)
- [ ] **Youhu** (`1106`)
- [ ] **Guardacostas** (`1505`)
- [ ] **Xiangli Yao** (`1305`)
- [ ] **Zhezhi** (`1105`)
- [ ] **Changli** (`1205`)
- [ ] **Jinhsi** (`1304`)
- [ ] **Yinlin** (`1302`)
- [ ] **Jiyan** (`1404`)
- [ ] **Sanhua** (`1102`)
- [ ] **Baizhi** (`1103`)
- [ ] **Lingyang** (`1104`)
- [ ] **Chixia** (`1202`)
- [ ] **Encore** (`1203`)
- [ ] **Mortefi** (`1204`)
- [ ] **Calcharo** (`1301`)
- [ ] **Yuanwu** (`1303`)
- [ ] **Yangyang** (`1402`)
- [ ] **Aalto** (`1403`)
- [ ] **Jianxin** (`1405`)
- [ ] **Errante: Espectro** (`1501`)
- [ ] **Verina** (`1503`)
- [ ] **Taoqi** (`1601`)
- [ ] **Danjin** (`1602`)
- [ ] **Errante: Destrucción** (`1604`)

## Revisión antes de un commit

1. Revisar el estado de Git y comparar `src/data/builds.json` con `HEAD`, incluyendo los cambios preparados y los pendientes. Si existe una versión preparada del archivo, distinguirla de los cambios posteriores del árbol de trabajo.
2. Resumir qué personajes tienen entradas nuevas y qué fichas existentes cambiaron. En las fichas editadas, indicar qué secciones cambiaron, por ejemplo, Armas, Ecos o Equipos, incluidas sus variantes por modo. Informar aparte las bajas o los cambios de metadatos si aparecen.
3. Reflejar en el tablero las builds nuevas o actualizadas por el usuario y señalar aparte las correcciones de metadatos. Identificar qué cambios de la web acompañan al catálogo. Si el alcance del commit está claro, seguirlo. Si hay dudas sobre qué archivos incluir, confirmarlo antes de prepararlos.

Consulta también [Reglas de entrega](REGLAS-ENTREGA.md#revisión-del-catálogo-antes-de-un-commit).

## Entregas anteriores

Los handoffs documentan lo que se entregó en cada momento. Para el estado de una ficha, consulta los datos actuales.

- [Piloto de Hsin](../handoffs/60-2026-11-17-guia-y-piloto-hsin.md) y [Suoming, Hsin y Lily](../handoffs/70-2026-11-17-builds-escritorio-unificadas.md).
- [Tanda B](../handoffs/76-2026-11-18-tanda-b-cuatro-equipos.md) · [Tanda C](../handoffs/81-2026-11-18-tanda-c-builds.md) · [Tanda D](../handoffs/86-2026-11-18-tanda-d-builds.md).
- [Tanda E](../handoffs/88-2026-11-18-tanda-e-builds.md) · [Tanda F](../handoffs/90-2026-11-18-tanda-f-rotaciones-armas.md).
- [Reinicio del catálogo](../handoffs/118-2026-11-19-reinicio-catalogo.md) · [Índice completo de handoffs](../handoffs/INDEX.md).
