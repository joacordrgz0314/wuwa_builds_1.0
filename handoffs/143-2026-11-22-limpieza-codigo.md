# Limpieza de CSS de Equipos y catálogo de arte legado

- Pedido y decisión. Eliminar las tres reglas de cuadrícula que ya no aplicaban a `.build-teams` y retirar `src/data/splash.json`, sin consumidores en el proyecto.
- Archivos. `src/styles.css`, `src/data/splash.json` y `package.json`. Versión 0.16.42, rama `chore/limpieza-codigo` basada en `main` en el commit `c11be06`.
- Verificación. Compilación de Vite en memoria antes y después. El CSS bajó de 52.891 a 52.690 bytes y de 10.289 a 10.261 bytes con gzip. El JS mantuvo el tamaño. Los cuatro equipos de Hsin conservaron su geometría a 390 × 844 y 1440 × 900 en la web y a 1440 × 900 en la vista previa del editor. Movimiento reducido, esbuild para CSS y `git diff --check`. Vite se detuvo.
- Pendiente. Commit, push y Preview de Vercel.
