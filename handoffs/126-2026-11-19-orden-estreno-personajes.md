# Orden de personajes por fecha de estreno

- **Versión 0.16.7.** La portada y el selector del editor ordenan los personajes de más recientes a más antiguos por fecha del primer lanzamiento. Si dos estrenaron el mismo día, se usa el ID como desempate. Los IDs sin fecha quedan al final.
- **Datos.** `src/data/character-releases.json` agrupa los IDs actuales de Encore por fecha del servidor. Los anuncios de lanzamiento de Kuro distinguen estrenos, fases y regresos. [Versión 3.8](https://wutheringwaves.kurogames.com/en/main/news/detail/5705) · [Versión 3.7](https://wutheringwaves.kurogames.com/en/main/news/detail/5571) · [Versión 3.5](https://wutheringwaves.kurogames.com/m/en/main/news/detail/5091)
- **Archivos.** `src/api.js`, `src/data/character-releases.json`, `package.json` e índice de handoffs.
- **Verificación.** Entre los IDs actuales de Encore no hubo faltantes. Chrome a 1440 × 900 con movimiento reducido comprobó las 61 tarjetas, un filtro de elemento y el mismo orden en el selector.
