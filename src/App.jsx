import { useEffect, useMemo, useRef, useState } from 'react'
import { bootstrap, getCharacters, preloadFirst, weaponIconUrl } from './api.js'
import CharacterCard from './components/CharacterCard.jsx'
import FilterBar from './components/FilterBar.jsx'
import CharacterPage from './components/CharacterPage.jsx'
import WeaponCatalog from './components/WeaponCatalog.jsx'
import WeaponPage from './components/WeaponPage.jsx'
import Ambient from './components/Ambient.jsx'
import { version } from '../package.json'

// Cuántas tarjetas se precargan antes de mostrar la grilla; el resto carga diferida.
const EAGER = 14

const UPCOMING = [
  { name: 'Anna', elementId: 2, element: 'Fusión', weapon: 'Rectificador' },
  { name: 'Lucielle', elementId: 5, element: 'Espectro', weapon: 'Pistolas' },
]

// Partículas ascendentes de la pantalla de carga (posición, tamaño y tiempos fijos, sin aleatoriedad en cada render).
const LOADER_PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  '--x': `${(i * 37 + 8) % 100}%`,
  '--s': `${2 + (i % 3)}px`,
  '--d': `${7 + (i % 5) * 1.6}s`,
  '--w': `${-((i * 1.9) % 9)}s`,
}))

// Texto sin acentos ni mayúsculas para comparar en el buscador.
const norm = (s) => String(s ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

function readRoute() {
  const hash = window.location.hash
  const character = /^#\/personaje\/(\d+)$/.exec(hash)
  const weaponDetail = /^#\/armas\/([^/]*)$/.exec(hash)
  return {
    routeId: character ? Number(character[1]) : null,
    isWeapons: hash === '#/armas' || Boolean(weaponDetail),
    weaponId: weaponDetail ? weaponDetail[1] : null,
  }
}

// Opciones únicas (por id) de los personajes.
function uniqueOptions(characters, pick, iconOf) {
  const map = new Map()
  characters.forEach((c) => {
    const item = pick(c)
    if (item?.Id == null || map.has(item.Id)) return
    map.set(item.Id, { id: item.Id, name: item.Name, icon: iconOf(c) })
  })
  return [...map.values()]
}

function UpcomingDetail({ label, icon }) {
  return (
    <span className="upcoming-detail">
      {icon && <img src={icon} alt="" width="14" height="14" onError={(e) => { e.currentTarget.hidden = true }} />}
      {label}
    </span>
  )
}

export default function App() {
  const [characters, setCharacters] = useState([])
  const [artBase, setArtBase] = useState('')
  const [elementIcons, setElementIcons] = useState({})
  const [state, setState] = useState('loading')
  const [phase, setPhase] = useState(0)
  const [loaderOn, setLoaderOn] = useState(true)
  const [element, setElement] = useState(null)
  const [weapon, setWeapon] = useState(null)
  const [query, setQuery] = useState('')
  const [{ routeId, isWeapons, weaponId }, setRoute] = useState(readRoute)
  const [weaponFilters, setWeaponFilters] = useState({ query: '', type: null, rarity: null })
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuHidden, setMenuHidden] = useState(false)
  const menuButton = useRef(null)

  useEffect(() => {
    if (isWeapons || state !== 'loading') return undefined
    let cancelled = false
    setPhase(0)
    getCharacters()
      .then(async (list) => {
        if (cancelled) return
        setPhase(1)
        const base = await bootstrap(list, (elementId, url) => {
          if (!cancelled) setElementIcons((prev) => ({ ...prev, [elementId]: url }))
        })
        setPhase(2)
        await preloadFirst(list.slice(0, EAGER), base)
        if (cancelled) return
        setPhase(3)
        setCharacters(list)
        setArtBase(base)
        setState('ok')
      })
      .catch(() => {
        if (!cancelled) setState('error')
      })
    return () => { cancelled = true }
  }, [isWeapons, state])

  // La pantalla de carga se desvanece y se desmonta cuando la app está lista (o falla).
  useEffect(() => {
    if (state === 'loading') return undefined
    const t = setTimeout(() => setLoaderOn(false), 800)
    return () => clearTimeout(t)
  }, [state])

  useEffect(() => {
    const onHash = () => {
      setRoute(readRoute())
      setMenuOpen(false)
      setMenuHidden(false)
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 800px)')
    let previousY = Math.max(0, window.scrollY)

    function resetMenu() {
      previousY = Math.max(0, window.scrollY)
      setMenuOpen(false)
      setMenuHidden(false)
    }

    function onScroll() {
      if (!mobile.matches || menuOpen) return
      const y = Math.max(0, window.scrollY)
      const delta = y - previousY
      if (y <= 2) {
        setMenuHidden(false)
      } else if (Math.abs(delta) >= 8) {
        setMenuHidden(delta > 0 && y >= 48)
      } else {
        return
      }
      previousY = y
    }

    mobile.addEventListener('change', resetMenu)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      mobile.removeEventListener('change', resetMenu)
      window.removeEventListener('scroll', onScroll)
    }
  }, [menuOpen])

  function onMenuKeyDown(event) {
    if (!menuOpen || event.key !== 'Escape') return
    event.preventDefault()
    setMenuOpen(false)
    menuButton.current.focus()
  }

  const elements = useMemo(
    () => uniqueOptions(characters, (c) => c.Element, (c) => elementIcons[c.Element?.Id] ?? ''),
    [characters, elementIcons],
  )
  const weapons = useMemo(
    () => uniqueOptions(characters, (c) => c.WeaponType, weaponIconUrl),
    [characters],
  )
  const q = norm(query.trim())
  const visible = characters.filter(
    (c) => (element == null || c.Element?.Id === element) && (weapon == null || c.WeaponType?.Id === weapon)
      && (q === '' || norm(c.Name).includes(q) || norm(c.EnName).includes(q)),
  )

  return (
    <div className="shell">
      <aside
        className={`side${menuOpen ? ' is-menu-open' : ''}${menuHidden ? ' is-menu-hidden' : ''}`}
        onKeyDown={onMenuKeyDown}
      >
        <div className="side-brand">
          <img className="side-emblem" src={`${import.meta.env.BASE_URL}tacet-emblem.png`} alt="" width="40" height="40" />
          <h1 className="side-title"><span>Tacet Builds</span><span>Guías de Wuthering Waves</span></h1>
        </div>
        <button
          className="side-toggle"
          type="button"
          ref={menuButton}
          aria-controls="site-navigation"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => {
            setMenuHidden(false)
            setMenuOpen(!menuOpen)
          }}
        >
          <span aria-hidden="true"><i /><i /><i /></span>
        </button>
        <nav className="side-nav" id="site-navigation" aria-label="Secciones">
          <span className="side-link is-disabled" aria-disabled="true">Inicio <em>Pronto</em></span>
          <a
            className={`side-link${isWeapons ? '' : ' is-active'}`}
            href="#/personajes"
            aria-current={!isWeapons && routeId == null ? 'page' : undefined}
            onClick={() => setMenuOpen(false)}
          >Personajes</a>
          <a
            className={`side-link${isWeapons ? ' is-active' : ''}`}
            href="#/armas"
            aria-current={isWeapons ? (weaponId == null ? 'page' : 'location') : undefined}
            onClick={() => setMenuOpen(false)}
          >Armas</a>
        </nav>
        <div className="side-foot">
          <span className="side-rule" aria-hidden="true" />
          <p className="side-version">v{version}</p>
        </div>
      </aside>
    <main className="app">
      {routeId == null && <Ambient />}
      {isWeapons && (weaponId == null
        ? <WeaponCatalog filters={weaponFilters} onFilterChange={setWeaponFilters} />
        : <WeaponPage key={weaponId} weaponId={weaponId} />)}
      {!isWeapons && loaderOn && (
        <div className={`loader${state === 'loading' ? '' : ' is-leaving'}`} role="status" aria-live="polite">
          <div className="loader-rings" aria-hidden="true"><span /><span /><span /></div>
          <div className="loader-particles" aria-hidden="true">
            {LOADER_PARTICLES.map((p, i) => <span key={i} style={p} />)}
          </div>
          <div className="loader-center">
            <p className="loader-title"><span>Tacet Builds</span><span>Guías de Wuthering Waves</span></p>
            <div className="loader-bar" aria-hidden="true">
              <span style={{ transform: `scaleX(${0.08 + phase * 0.3})` }} />
            </div>
            <p className="loader-sub">Cargando personajes…</p>
            <p className="loader-note">La primera vez puede tardar un poco</p>
          </div>
        </div>
      )}
      {!isWeapons && state === 'error' && (
        <p className="app-msg">No se pudo conectar con la API. Revisa tu conexión o recarga la página.</p>
      )}
      {!isWeapons && state === 'ok' && routeId != null && (
        <CharacterPage
          key={routeId}
          character={characters.find((c) => c.Id === routeId)}
          characters={characters}
          base={artBase}
          elementIcon={elementIcons[characters.find((c) => c.Id === routeId)?.Element?.Id]}
          elementIcons={elementIcons}
        />
      )}
      {!isWeapons && state === 'ok' && routeId == null && (
        <>
          {UPCOMING.length > 0 && (
            <section className="upcoming" aria-labelledby="upcoming-title">
              <h2 id="upcoming-title">Próximamente <span>Versión 4.0</span></h2>
              <ul className="upcoming-roster">
                {UPCOMING.map(({ name, elementId, element, weapon }) => (
                  <li key={name} className={`elem-${elementId}`}>
                    <div className="upcoming-character-heading">
                      <strong>{name}</strong>
                      <span className="upcoming-rarity" aria-label="5 estrellas">5★</span>
                    </div>
                    <span className="upcoming-details">
                      <UpcomingDetail label={element} icon={elementIcons[elementId]} />
                      <UpcomingDetail label={weapon} icon={weapons.find((option) => norm(option.name) === norm(weapon))?.icon} />
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}
          <h2 className="catalog-title">Personajes</h2>
          <FilterBar
            elements={elements}
            weapons={weapons}
            element={element}
            weapon={weapon}
            query={query}
            count={visible.length}
            total={characters.length}
            onQuery={setQuery}
            onElement={setElement}
            onWeapon={setWeapon}
          />
          <div className="grid-rule" aria-hidden="true" />
          {visible.length === 0 ? (
            <p className="app-msg">Ningún personaje coincide. Cambia la búsqueda o quita un filtro.</p>
          ) : (
            <section className="grid">
              {visible.map((c, i) => (
                <CharacterCard
                  key={c.Id}
                  character={c}
                  base={artBase}
                  elementIcon={elementIcons[c.Element?.Id]}
                  lazy={i >= EAGER}
                />
              ))}
            </section>
          )}
        </>
      )}
      <footer className="app-footer" role="contentinfo">
        <div>
          <p className="app-footer-name">
            <img src={`${import.meta.env.BASE_URL}tacet-emblem.png`} alt="" width="24" height="24" />
            Tacet Builds
          </p>
          <p>Sitio de fans, no oficial.</p>
          <p>Wuthering Waves es propiedad de Kuro Games.</p>
        </div>
        <div className="app-footer-actions">
          <p>Datos de <a href="https://encore.moe/">Encore</a><span className="app-footer-version"> · v{version}</span></p>
          <button type="button" onClick={() => window.scrollTo(0, 0)}>Volver arriba <span aria-hidden="true">↑</span></button>
        </div>
      </footer>
    </main>
    </div>
  )
}
