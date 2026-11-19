import { useEffect, useState } from 'react'
import { getCharacterMaterials, getItems, getWeaponMaterials, getWeapons } from '../api.js'

const COIN = 2 // Moneda Caparazón

// Icono propio (línea blanca) para Habilidades: la API no trae uno general, cada habilidad tiene el suyo.
const SkillsIcon = (
  <svg className="mat-title-icon" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 2.5 14.2 9.8 21.5 12 14.2 14.2 12 21.5 9.8 14.2 2.5 12 9.8 9.8Z" />
  </svg>
)

function hideOnError(e) {
  e.currentTarget.style.visibility = 'hidden'
}

const fmt = (n) => n.toLocaleString('es')

// Totales por material de una lista de pasos [{label, items[{Key, Value}]}].
function sumSteps(steps) {
  const totals = new Map()
  steps.forEach((s) => s.items.forEach(({ Key, Value }) => totals.set(Key, (totals.get(Key) ?? 0) + Value)))
  return totals
}

// Cuadro de material: color de rareza, borde blanco, cantidad abajo a la derecha.
function Tile({ item, qty, id }) {
  const name = item?.name ?? `Material #${id}`
  return (
    <li className={`mat-tile q${item?.quality || 1}`} title={name}>
      {item?.icon && <img src={item.icon} alt={name} loading="lazy" onError={hideOnError} />}
      <span className="mat-qty">{fmt(qty)}</span>
    </li>
  )
}

function Group({ title, icon, steps, items, bonuses }) {
  const totals = sumSteps(steps)
  const coins = totals.get(COIN) ?? 0
  // De menor a mayor rareza; la moneda va al final.
  const rows = [...totals]
    .filter(([key]) => key !== COIN)
    .sort((a, b) => (items.get(a[0])?.quality ?? 0) - (items.get(b[0])?.quality ?? 0) || a[0] - b[0])
  return (
    <div className="mat-group">
      <h4>
        {typeof icon === 'string'
          ? icon && <img className="mat-title-icon" src={icon} alt="" referrerPolicy="no-referrer" onError={hideOnError} />
          : icon}
        {title}
      </h4>
      <ul className="mat-grid">
        {rows.map(([key, qty]) => <Tile key={key} id={key} item={items.get(key)} qty={qty} />)}
        {coins > 0 && <Tile id={COIN} item={items.get(COIN)} qty={coins} />}
      </ul>
      {bonuses?.length > 0 && (
        <ul className="mat-bonus-grid">
          {bonuses.map((b, i) => (
            <li key={i} className="mat-bonus">
              <strong>{b.title}</strong>
              <span>{b.desc}</span>
            </li>
          ))}
        </ul>
      )}
      <details className="mat-steps">
        <summary>Desglose por paso</summary>
        <ol>
          {steps.map((s) => (
            <li key={s.label}>
              <strong>{s.label}</strong>:{' '}
              {s.items.map(({ Key, Value }) => `${items.get(Key)?.name ?? `#${Key}`} × ${fmt(Value)}`).join(', ')}
            </li>
          ))}
        </ol>
      </details>
    </div>
  )
}

// Materiales de ascensión del arma personal (solo 5★; sin arma, no se monta).
function WeaponMaterials({ weaponId, icon }) {
  const [state, setState] = useState({ status: 'loading' })

  useEffect(() => {
    let cancelled = false
    setState({ status: 'loading' })
    Promise.all([getWeaponMaterials(weaponId), getWeapons().catch(() => null)])
      .then(async ([breaches, weapons]) => {
        const steps = breaches
          .filter((b) => b.items.length)
          .map((b) => ({ label: `Ascensión ${b.level} (hasta nv. ${b.max})`, items: b.items }))
        const items = await getItems([...steps.flatMap((s) => s.items.map((i) => i.Key)), COIN])
        if (!cancelled) setState({ status: 'ok', steps, items, name: weapons?.get(weaponId)?.Name })
      })
      .catch(() => !cancelled && setState({ status: 'error' }))
    return () => { cancelled = true }
  }, [weaponId])

  if (state.status === 'loading') return <p className="app-msg">Cargando arma personal…</p>
  if (state.status === 'error') return <p className="app-msg">No se pudieron cargar los materiales del arma personal.</p>
  if (!state.steps.length) return null
  return <Group icon={icon} title={`Arma personal${state.name ? `: ${state.name}` : ''}`} steps={state.steps} items={state.items} />
}

export default function Materials({ id, weaponId, headIcon, weaponIcon }) {
  const [state, setState] = useState({ status: 'loading' })

  useEffect(() => {
    let cancelled = false
    setState({ status: 'loading' })
    getCharacterMaterials(id)
      .then(async (m) => {
        const ascension = m.breaches
          .filter((b) => b.items.length)
          .map((b) => ({ label: `Ascensión ${b.level} (hasta nv. ${b.max})`, items: b.items }))
        const talents = m.skillTree
          .filter((n) => n.consume.length)
          .map((n) => ({ label: `${n.title} ${n.desc}`.trim(), title: n.title, desc: n.desc, items: n.consume }))
        const levels = m.skills.flatMap((sk) => sk.levels
          .filter((l) => l.items.length)
          .map((l) => ({ label: `${sk.name} · nv. ${l.level}`, items: l.items })))
        const keys = [...ascension, ...talents, ...levels].flatMap((s) => s.items.map((i) => i.Key))
        const items = await getItems([...keys, COIN])
        if (!cancelled) setState({ status: 'ok', ascension, talents, levels, items })
      })
      .catch(() => !cancelled && setState({ status: 'error' }))
    return () => { cancelled = true }
  }, [id])

  return (
    <section className="char-page-section mat-section">
      <h3>Materiales</h3>
      {state.status === 'loading' && <p className="app-msg">Cargando…</p>}
      {state.status === 'error' && <p className="app-msg">No se pudieron cargar los materiales desde la API.</p>}
      {state.status === 'ok' && (
        <>
          {state.ascension.length > 0 && <Group icon={headIcon} title="Ascensión del personaje" steps={state.ascension} items={state.items} />}
          {(state.levels.length > 0 || state.talents.length > 0) && (
            <Group
              icon={SkillsIcon}
              title="Habilidades y talentos"
              steps={[...state.levels, ...state.talents]}
              items={state.items}
              bonuses={state.talents.map((t) => ({ title: t.title, desc: t.desc }))}
            />
          )}
        </>
      )}
      {weaponId && <WeaponMaterials weaponId={weaponId} icon={weaponIcon} />}
    </section>
  )
}
