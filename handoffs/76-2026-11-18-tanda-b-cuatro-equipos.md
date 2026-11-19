# Tanda B · Lynae, Jingran y Qingxiao

**Fecha** 2026-11-18  
**Versión** `0.6.5` → `0.7.0`  
**Nivel** Menor por incorporar tres builds al catálogo.  
**Estado** Datos y paneles de equipos verificados a 1440 × 900.

## Pedido y decisiones

El usuario validó visualmente Hsin, Suoming y Lily en escritorio. Lily sigue en preparación. Para la tanda B se aprobaron cuatro tarjetas por ficha, con un dúo DPS principal + sub-DPS por tarjeta y sus cambios de apoyo en «Variantes».

## Cambios

- `src/data/builds.json` incorpora Ecos, cinco armas y cuatro equipos para Lynae, Jingran y Qingxiao. Cada tarjeta se ordena por el DPR de su mejor composición. Los rótulos de equipos se basan en los integrantes del cálculo. Qingxiao + Lucy ocupa la cuarta tarjeta de Qingxiao para mantenerla como DPS principal.
- Suoming + Lynae usa el mismo grupo en las dos fichas, incluidas Chisa y Youhu. Qingxiao + Lynae comparte sus diez composiciones. Se reúnen las dos condiciones publicadas de Hiyuki + Lynae con Chisa en una sola variante, ya que el DPR coincide.
- `package.json`, ambos Death Note y `handoffs/INDEX.md` reflejan la carga y su versión.

## Verificación

- Node validó los JSON, cinco armas por ficha, dos F2P con refinamiento, una permanente, cuatro tarjetas ordenadas por DPR y coincidencia de los grupos compartidos.
- Chrome a 1440 × 900 verificó cuatro tarjetas por ficha, ausencia de desbordamiento horizontal y apertura y cierre de un panel de variantes por ficha. La comprobación fue automatizada sobre el navegador.

## Pendientes

- Seleccionar la siguiente tanda del catálogo.
- Retirar el aviso de Lily cuando termine su ficha.
