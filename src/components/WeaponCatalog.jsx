import { useEffect, useState } from 'react'
import { getWeapons, weaponIconUrl } from '../api.js'
import builds from '../data/builds.json'
import releases from '../data/character-releases.json'
import ScrollableRow from './ScrollableRow.jsx'

const normalize = (value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
const characterOrder = Object.keys(releases).sort().reverse().flatMap((date) => releases[date])
const signatureOrder = new Map(
  characterOrder.slice(0, characterOrder.indexOf(1404) + 1)
    .flatMap((characterId, position) => {
      // El Errante Aero comparte arma entre sus dos variantes. Basta su primera aparición.
      const weaponId = builds._armaPersonal[characterId] ?? (characterId === 1406 ? 21020046 : null)
      return weaponId == null ? [] : [[weaponId, position]]
    }),
)

function compareWeapons(a, b) {
  return b.QualityId - a.QualityId
    || (signatureOrder.get(a.Id) ?? characterOrder.length) - (signatureOrder.get(b.Id) ?? characterOrder.length)
    || a.Name.localeCompare(b.Name, 'es')
}

export default function WeaponCatalog({ filters, onFilterChange }) {
  const [weapons, setWeapons] = useState(null)
  const [error, setError] = useState(false)
  const { query, type, rarity } = filters
  function changeFilter(key, value) {
    onFilterChange((previous) => ({ ...previous, [key]: value }))
  }

  useEffect(() => {
    let active = true
    getWeapons().then((result) => {
      if (!active) return
      setWeapons([...result.values()].sort(compareWeapons))
    }).catch(() => {
      if (active) setError(true)
    })
    return () => { active = false }
  }, [])

  const types = [...new Map(weapons?.map(({ Type, TypeName, TypeIcon }) => [Type, {
    id: Type,
    name: TypeName,
    icon: weaponIconUrl({ WeaponType: { Icon: TypeIcon?.split('.')[0] } }),
  }])).values()].sort((a, b) => a.id - b.id)
  const rarities = [...new Set(weapons?.map((weapon) => weapon.QualityId))]
    .sort((a, b) => b - a)
    .map((id) => ({
      id,
      name: <>{id} <span aria-hidden="true" className={`build-stars rarity-${id}`}>★</span></>,
      label: `${id} ${id === 1 ? 'estrella' : 'estrellas'}`,
    }))
  const filterGroups = [
    { key: 'type', label: 'Tipo de arma', options: types, value: type },
    { key: 'rarity', label: 'Rareza', options: rarities, value: rarity },
  ]
  const search = normalize(query.trim())
  const visible = weapons?.filter((weapon) => (
    (type == null || weapon.Type === type)
    && (rarity == null || weapon.QualityId === rarity)
    && normalize(weapon.Name).includes(search)
  ))

  return (
    <section className="weapon-catalog" aria-labelledby="weapon-catalog-title">
      <h2 className="catalog-title" id="weapon-catalog-title">Armas</h2>
      {error && <p className="app-msg" role="alert">No se pudieron cargar las armas. Recarga la página para reintentar.</p>}
      {!weapons && !error && <p className="app-msg" role="status">Cargando armas…</p>}
      {visible && (
        <>
          <nav className="filters" aria-label="Filtros de armas">
            <div className="filter-top">
              <input type="search" className="search-input" aria-label="Buscar arma" placeholder="Buscar arma…" value={query} onChange={(event) => changeFilter('query', event.target.value)} />
              <p className="filter-count" aria-live="polite">
                {visible.length === weapons.length ? `${weapons.length} armas` : `${visible.length} de ${weapons.length} armas`}
              </p>
            </div>
            <div className="filter-row">
              {filterGroups.map(({ key, label, options, value }) => (
                <div className="filter-group" role="group" aria-label={label} key={key}>
                  {options.map((option) => (
                    <button
                      key={option.id}
                      className="filter-chip"
                      type="button"
                      aria-label={option.label}
                      aria-pressed={value === option.id}
                      onClick={() => changeFilter(key, value === option.id ? null : option.id)}
                    >
                      {option.icon && <img src={option.icon} alt="" onError={(event) => { event.currentTarget.hidden = true }} />}
                      {option.name}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </nav>
          <div className="grid-rule" aria-hidden="true" />
          {visible.length === 0 ? (
            <p className="app-msg">Ningún arma coincide. Cambia la búsqueda o quita un filtro.</p>
          ) : (
            <ul className="weapon-catalog-grid build-weapons">
              {visible.map(({ Id, Name, Icon, TypeName, QualityId }) => (
                <li key={Id}>
                  <a className={`char-card-link weapon-card weapon-catalog-link rarity-${QualityId}`} href={`#/armas/${Id}`} aria-label={Name}>
                    <div className="weapon-icon">
                      {Icon && <img src={Icon} alt="" loading="lazy" onError={(event) => { event.currentTarget.hidden = true }} />}
                    </div>
                    <div className="weapon-catalog-info">
                      <ScrollableRow focusable={false}>
                        <strong>{Name}</strong>
                      </ScrollableRow>
                      <span className="weapon-catalog-type">{TypeName}</span>
                      <span className={`build-stars rarity-${QualityId}`} role="img" aria-label={`${QualityId} ${QualityId === 1 ? 'estrella' : 'estrellas'}`}>
                        {'★'.repeat(QualityId)}
                      </span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  )
}
