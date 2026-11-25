import { useEffect, useState } from 'react'
import { getWeaponDetail, getWeapons, weaponIconUrl } from '../api.js'

const refinements = [1, 2, 3, 4, 5]

export default function WeaponPage({ weaponId }) {
  const [result, setResult] = useState({ status: 'loading' })
  const [attempt, setAttempt] = useState(0)
  const [{ rank, previousRank }, setRefinement] = useState({ rank: 1, previousRank: 1 })

  useEffect(() => {
    let active = true

    async function load() {
      if (!/^\d+$/.test(weaponId)) return { status: 'missing' }
      const weapons = await getWeapons()
      const weapon = weapons.get(Number(weaponId))
      if (!weapon) return { status: 'missing' }
      const detail = await getWeaponDetail(weapon.Id)
      return { status: 'ok', weapon, detail }
    }

    load().then((data) => {
      if (active) setResult(data)
    }).catch(() => {
      if (active) setResult({ status: 'error' })
    })
    return () => { active = false }
  }, [weaponId, attempt])

  const { status, weapon, detail } = result
  const typeIcon = weaponIconUrl({ WeaponType: { Icon: weapon?.TypeIcon?.split('.')[0] } })

  function hideImage(event) {
    event.currentTarget.hidden = true
  }

  return (
    <section className="weapon-page" aria-label={weapon?.Name ?? 'Ficha de arma'}>
      <a className="char-page-back" href="#/armas">← Volver</a>
      {status === 'loading' && <p className="app-msg" role="status">Cargando arma…</p>}
      {status === 'missing' && <p className="app-msg" role="status">No encontramos esta arma.</p>}
      {status === 'error' && (
        <div className="app-msg">
          <p role="alert">No se pudo cargar el arma.</p>
          <button className="filter-chip" type="button" onClick={() => {
            setResult({ status: 'loading' })
            setAttempt((previous) => previous + 1)
          }}>Reintentar</button>
        </div>
      )}
      {status === 'ok' && (
        <article className={`weapon-page-detail rarity-${weapon.QualityId}`}>
          <header className="weapon-page-head">
            <div className="weapon-page-summary">
              <div>
                <h2 className="char-page-name">{weapon.Name}</h2>
                <p className={`char-page-stars build-stars rarity-${weapon.QualityId}`} role="img" aria-label={`${weapon.QualityId} ${weapon.QualityId === 1 ? 'estrella' : 'estrellas'}`}>
                  {'★'.repeat(weapon.QualityId)}
                </p>
                <ul className="char-page-tags">
                  <li>{typeIcon && <img src={typeIcon} alt="" onError={hideImage} />}{weapon.TypeName}</li>
                </ul>
              </div>
              {detail.stats.length > 0 && (
                <div className="weapon-page-stat-block">
                  <h3>Estadísticas al nivel máximo</h3>
                  <dl className="weapon-page-stats">
                    {detail.stats.map(({ name, icon, value }, index) => (
                      <div className="guide-stat" key={index}>
                        <dt>
                          {icon && <img src={icon} alt="" onError={hideImage} />}
                          <span>{name}</span>
                        </dt>
                        <dd>{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </div>
            <div className="weapon-page-art" aria-hidden="true">
              {weapon.Icon && <img src={weapon.Icon} alt="" onError={hideImage} />}
            </div>
          </header>
          {(detail.passive || detail.desc.length > 0) && (
            <section className="weapon-page-passive">
              {detail.desc.some(({ values }) => values) && (
                <fieldset className="weapon-refinement">
                  <legend>Refinamiento</legend>
                  <div className="weapon-refinement-ranks" style={{ '--rank-offset': rank - 1 }}>
                    {refinements.map((option) => (
                      <label key={option}>
                        <input type="radio" name="refinamiento" value={option} checked={option === rank} onChange={() => {
                          setRefinement(({ rank: current }) => ({ rank: option, previousRank: current }))
                        }} />
                        <span>R{option}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              )}
              <div className="weapon-page-effect">
                <h3>{detail.passive || 'Pasiva'}</h3>
                <p className="weapon-page-description" aria-live="polite">
                  {detail.desc.map(({ text, hl, values }, index) => {
                    if (!hl) return text
                    const value = values?.[rank - 1] ?? text
                    const changed = values && value !== values[previousRank - 1]
                    return <strong key={`${index}-${value}`} className={changed ? 'is-changed' : undefined}>{value}</strong>
                  })}
                </p>
              </div>
            </section>
          )}
        </article>
      )}
    </section>
  )
}
