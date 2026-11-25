import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import BuildSections from '../components/BuildSections.jsx'
import { loadCatalog, mainStats, subStats } from './catalog.js'
import { changeTeamRole, draftFrom, maxWeapons, previewBuild, secondaryCost4, teamTitle, toBuild, validateBuild } from './model.js'
import '../styles.css'
import './editor.css'

const tabs = [['ecos', 'Ecos'], ['armas', 'Armas'], ['equipos', 'Equipos']]
const initialTeam = (id) => ({ pivot: 0, pair: [{ id, sets: [] }, { id: null, sets: [] }], supports: [] })
const normalize = (value) => value.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()

function Picture({ item }) {
  return item?.icon && <img src={item.icon} alt="" loading="lazy" onError={(event) => { event.currentTarget.hidden = true }} />
}

function Picker({ label, items, value, onChange, disabled, inline, revealOnOpen }) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [placement, setPlacement] = useState(null)
  const toggle = useRef(null)
  const input = useRef(null)
  const menu = useRef(null)
  const results = useRef(null)

  useLayoutEffect(() => {
    if (!open) return undefined
    input.current.focus({ preventScroll: true })
    if (inline) {
      if (revealOnOpen) revealEditorPanel(toggle.current, menu.current)
      return undefined
    }

    const viewport = window.visualViewport
    function positionMenu() {
      const bounds = toggle.current.getBoundingClientRect()
      const viewportTop = viewport?.offsetTop ?? 0
      const viewportHeight = viewport?.height ?? window.innerHeight
      const above = bounds.top - viewportTop - 12
      const below = viewportTop + viewportHeight - bounds.bottom - 12
      const chrome = menu.current.offsetHeight - results.current.offsetHeight
      const rootSize = Number.parseFloat(getComputedStyle(document.documentElement).fontSize)
      const preferred = chrome + Math.min(results.current.scrollHeight, window.innerHeight * 0.4, rootSize * 18)
      const up = below < preferred && above > below
      const height = Math.max(0, Math.floor((up ? above : below) - chrome))
      setPlacement((previous) => previous?.up === up && previous.height === height ? previous : { up, height })
    }

    positionMenu()
    window.addEventListener('resize', positionMenu)
    window.addEventListener('scroll', positionMenu, { passive: true })
    viewport?.addEventListener('resize', positionMenu)
    viewport?.addEventListener('scroll', positionMenu)
    return () => {
      window.removeEventListener('resize', positionMenu)
      window.removeEventListener('scroll', positionMenu)
      viewport?.removeEventListener('resize', positionMenu)
      viewport?.removeEventListener('scroll', positionMenu)
    }
  }, [open, inline, revealOnOpen])

  const closePicker = () => {
    setOpen(false)
    toggle.current?.focus({ preventScroll: true })
  }
  const selected = items.find(({ id }) => id === value)
  const matches = open ? items.filter(({ name }) => normalize(name).includes(normalize(search.trim()))) : []
  return (
    <div className={inline ? "editor-picker is-inline" : "editor-picker"} onKeyDown={(event) => {
      if (open && event.key === 'Escape') closePicker()
    }} onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false)
    }}>
      <button type="button" className="editor-picker-toggle" ref={toggle} disabled={disabled} aria-expanded={open}
        onClick={() => { setSearch(''); setOpen(!open) }}>
        <Picture key={selected?.id} item={selected} /><span>{selected?.name ?? label}</span><span aria-hidden="true">▾</span>
      </button>
      {open && <div ref={menu} className={`editor-picker-menu${!inline && placement?.up ? ' opens-up' : ''}`}
        style={!inline && placement ? { '--picker-results-height': `${placement.height}px` } : undefined}>
        <input ref={input} aria-label={`Buscar: ${label}`} placeholder="Buscar por nombre" value={search}
          onChange={(event) => setSearch(event.target.value)} />
        <div ref={results} className="editor-picker-results">
          {matches.map((item) => <button type="button" key={item.id} aria-pressed={item.id === value}
            onClick={() => { onChange(item.id); closePicker() }}>
            <Picture item={item} /><span className="editor-picker-name">{item.name}</span>
            {item.rarity > 0 && <span className={`editor-picker-stars build-stars rarity-${item.rarity}`} role="img"
              aria-label={`${item.rarity} ${item.rarity === 1 ? 'estrella' : 'estrellas'}`}>{'★'.repeat(item.rarity)}</span>}
          </button>)}
          {matches.length === 0 && <p>Sin resultados</p>}
        </div>
      </div>}
    </div>
  )
}

function revealEditorPanel(heading, panel) {
  requestAnimationFrame(() => {
    if (!heading.isConnected || !panel.getClientRects().length) return

    const toolbar = heading.closest('.build-editor')?.querySelector('.editor-toolbar')
    const toolbarHeight = toolbar && getComputedStyle(toolbar).position === 'sticky' ? toolbar.offsetHeight : 0
    const headingBounds = heading.getBoundingClientRect()
    const panelBounds = panel.getBoundingClientRect()
    const top = toolbarHeight + 12
    const bottom = window.innerHeight - 12
    const previewBottom = Math.min(panelBounds.bottom, headingBounds.bottom + 180)
    const availableScroll = headingBounds.top - top
    const delta = Math.min(Math.max(0, previewBottom - bottom), availableScroll)

    if (Math.abs(delta) >= 1) window.scrollBy({ top: delta, behavior: 'instant' })
  })
}

function OrderedRows({ items, onChange, add, addLabel, limit = Infinity, render, rowTitle }) {
  const [activeIndex, setActiveIndex] = useState(items.length ? 0 : null)
  const accordionId = useId()
  const replace = (index, item) => onChange(items.map((current, position) => position === index ? item : current))
  const move = (index, delta) => {
    const next = [...items]
    const swap = index + delta
    next[index] = items[swap]
    next[swap] = items[index]
    setActiveIndex((current) => current === index ? swap : current === swap ? index : current)
    onChange(next)
  }
  const remove = (index) => {
    setActiveIndex((current) => {
      if (current === index) return null
      return current > index ? current - 1 : current
    })
    onChange(items.filter((_, position) => index !== position))
  }
  const append = () => {
    setActiveIndex(items.length)
    onChange([...items, add()])
  }
  return (
    <div className="editor-list">
      {items.map((item, index) => {
        const panelId = `${accordionId}-${index}`
        const title = rowTitle?.(item, index)
        const expanded = !title || activeIndex === index
        return (
          <div className="editor-item" key={index}>
            <div className="editor-item-content">
              {title && <button type="button" className="editor-row-toggle" aria-expanded={expanded}
                aria-controls={panelId} onClick={(event) => {
                  setActiveIndex(expanded ? null : index)
                  if (!expanded) revealEditorPanel(event.currentTarget, event.currentTarget.nextElementSibling)
                }}>
                <span>{title}</span><span aria-hidden="true">{expanded ? '▴' : '▾'}</span>
              </button>}
              <div id={title ? panelId : undefined} hidden={!expanded} className={title ? 'editor-row-panel' : undefined}>
                {expanded && render(item, (next) => replace(index, next), index)}
              </div>
            </div>
            <div className="editor-item-actions">
              <button type="button" aria-label={`Subir opción ${index + 1}`} disabled={index === 0} onClick={() => move(index, -1)}>↑</button>
              <button type="button" aria-label={`Bajar opción ${index + 1}`} disabled={index === items.length - 1} onClick={() => move(index, 1)}>↓</button>
              <button type="button" aria-label={`Quitar opción ${index + 1}`} onClick={() => remove(index)}>×</button>
            </div>
          </div>
        )
      })}
      {items.length < limit && <button type="button" className="editor-add" onClick={append}>{addLabel}</button>}
    </div>
  )
}

function Pieces({ value, onChange, max = 5, label = 'Piezas' }) {
  return <label className="editor-field editor-number">{label}
    <select value={value} onChange={(event) => onChange(Number(event.target.value))}>
      {Array.from({ length: max }, (_, index) => index + 1).map((number) => <option key={number}>{number}</option>)}
    </select>
  </label>
}

function SetRows({ value = [], onChange, catalog, revealOnOpen }) {
  return <OrderedRows items={value} onChange={onChange} limit={5} addLabel="Añadir set"
    add={() => ({ id: null, piezas: 1 })}
    render={(entry, update) => <div className="editor-inline">
      <Picker inline revealOnOpen={revealOnOpen} label="Elegir set" items={catalog} value={entry.id}
        onChange={(id) => update({ ...entry, id })} />
      <Pieces value={entry.piezas} onChange={(piezas) => update({ ...entry, piezas })} />
    </div>} />
}

function EchoCombination({ value, update, catalog }) {
  return <div className="editor-fields">
    <div className="editor-inline">
      <Picker label="Elegir eco principal" items={catalog.echoes} value={value.ecoPrincipal}
        onChange={(ecoPrincipal) => update({ ...value, ecoPrincipal })} />
      {value.ecoPrincipal && <button type="button" onClick={() => update({ ...value, ecoPrincipal: undefined })}>Quitar eco</button>}
    </div>
    <SetRows value={value.sets} onChange={(sets) => update({ ...value, sets })} catalog={catalog.sets} />
  </div>
}

function EchoForm({ draft, update, catalog }) {
  const group = useId()
  const { ecos, costs } = draft
  const updateEcho = (next) => update({ ecos: next })
  return <div className="editor-fields">
    <details open name={group} className="editor-echo-group">
      <summary>Eco principal y sets</summary>
      <p className="editor-help">Elige un eco y hasta cinco piezas de set. Puedes repartir las piezas entre varios sets.</p>
      <EchoCombination value={ecos} update={updateEcho} catalog={catalog} />
    </details>
    <details name={group} className="editor-echo-group"><summary>Combinaciones alternativas</summary>
      <OrderedRows items={ecos.alternativas ?? []} onChange={(alternativas) => updateEcho({ ...ecos, alternativas })}
        addLabel="Añadir combinación" add={() => ({ sets: [] })}
        render={(item, change) => <EchoCombination value={item} update={change} catalog={catalog} />} />
    </details>
    <details name={group} className="editor-echo-group"><summary>Estadísticas por coste</summary>
      <p className="editor-help">Añade la estadística recomendada para cada coste e indica cuántos ecos la deben llevar.</p>
      {[4, secondaryCost4, 3, 1].map((key) => {
        const entry = costs[key]
        if (!entry) return null
        const second = key === secondaryCost4
        const cost = second ? 4 : key
        const change = (next) => update({ costs: { ...costs, [key]: next } })
        return <div className="editor-cost" data-cost={cost} key={key}>
          <h3>{second ? 'Segundo coste 4' : `Coste ${cost}`}</h3>
          <OrderedRows items={entry.rows} onChange={(rows) => change({ ...entry, rows })} addLabel="Añadir estadística"
            add={() => ({ name: '', quantity: 1 })}
            render={(stat, setStat) => <div className="editor-inline editor-stat-row">
              <Picker label="Elegir estadística principal" items={mainStats[cost]} value={stat.name}
                onChange={(name) => setStat({ ...stat, name })} />
              <Pieces label="Ecos" max={cost === 4 ? 2 : cost === 3 ? 2 : 5} value={stat.quantity}
                onChange={(quantity) => setStat({ ...stat, quantity })} />
            </div>} />
          {key === 4 && !costs[secondaryCost4] && <button type="button" className="editor-cost-action" onClick={() =>
            update({ costs: { ...costs, [secondaryCost4]: { rows: [{ name: '', quantity: 1 }], note: '' } } })
          }>Añadir segundo coste 4</button>}
          {second && <button type="button" className="editor-cost-action" onClick={() => {
            const next = { ...costs }
            delete next[secondaryCost4]
            update({ costs: next })
          }}>Quitar segundo coste 4</button>}
        </div>
      })}
    </details>
    <details name={group} className="editor-echo-group"><summary>Subestadísticas</summary>
      <OrderedRows items={ecos.subestadisticas ?? []} onChange={(subestadisticas) => updateEcho({ ...ecos, subestadisticas })}
        addLabel="Añadir subestadística" limit={subStats.length} add={() => ({ nombre: '', valor: '' })}
        render={(stat, change) => <div className="editor-inline">
          <Picker label="Elegir subestadística" items={subStats} value={stat.nombre}
            onChange={(nombre) => change({ ...stat, nombre, iconKey: subStats.find(({ id }) => id === nombre).key })} />
          <label className="editor-field">Objetivo (opcional)<input placeholder="70%" value={stat.valor ?? ''}
            onChange={(event) => change({ ...stat, valor: event.target.value })} /></label>
        </div>} />
    </details>
    <label className="editor-field">Nota de Ecos (opcional)
      <textarea rows={3} value={ecos.nota ?? ''} onChange={(event) => updateEcho({ ...ecos, nota: event.target.value })} />
    </label>
  </div>
}

function WeaponsForm({ value, onChange, catalog, character }) {
  const weapons = catalog.weapons.filter(({ type }) => !character?.WeaponType?.Id || type === character.WeaponType.Id)
  return <OrderedRows items={value} onChange={onChange} limit={maxWeapons} addLabel="Añadir arma"
    add={() => ({ id: null, refinamiento: 'R1' })}
    render={(weapon, change, index) => <div className="editor-fields">
      <h3>{index === 0 ? 'Arma principal' : `Alternativa ${index}`}</h3>
      <div className="editor-inline">
        <Picker label={index === 0 ? 'Elegir arma principal' : 'Elegir arma alternativa'} items={weapons} value={weapon.id}
          onChange={(id) => change({ ...weapon, id })} />
        <label className="editor-field">Refinamiento
          <select value={weapon.refinamiento ?? 'R1'} onChange={(event) => change({ ...weapon, refinamiento: event.target.value })}>
            {['R1', 'R2', 'R3', 'R4', 'R5'].map((rank) => <option key={rank}>{rank}</option>)}
          </select>
        </label>
      </div>
      <div className="editor-flags">
        {Object.entries({ bp: 'BP', f2p: 'F2P', permanente: 'Permanente' }).map(([field, label]) =>
          <label key={field}><input type="checkbox" checked={Boolean(weapon[field])}
            onChange={(event) => change({ ...weapon, [field]: event.target.checked })} /> {label}</label>,
        )}
      </div>
    </div>} />
}

function TeamSupports({ team, onChange, catalog }) {
  const [main, ...alternatives] = team.supports
  const canChangeMain = team.pivot !== 2

  const fields = (support, update, label, disabled = false) => {
    const excluded = new Set([
      ...team.pair.map(({ id }) => id),
      ...team.supports.filter((entry) => entry !== support).map(({ id }) => id),
    ])
    return <div className="editor-fields">
      <Picker label={label} items={catalog.people.filter(({ id }) => !excluded.has(id))}
        value={support.id} disabled={disabled} onChange={(id) => update({ id, sets: [] })} />
      <SetRows value={support.sets} catalog={catalog.sets} revealOnOpen
        onChange={(sets) => update({ ...support, sets })} />
    </div>
  }

  return <div className="editor-supports">
    <fieldset className="editor-team-role" data-role="support">
      <legend>Apoyo principal</legend>
      {main ? fields(main, (next) => onChange([next, ...alternatives]), 'Elegir apoyo principal', !canChangeMain) : (
        <Picker label="Elegir apoyo principal" items={catalog.people.filter(({ id }) => !team.pair.some((member) => member.id === id))}
          onChange={(id) => onChange([{ id, sets: [] }])} />
      )}
    </fieldset>
    {main?.id && <details className="editor-support-alternatives" onToggle={(event) => {
      const panel = event.currentTarget
      if (panel.open) revealEditorPanel(panel.firstElementChild, panel)
    }}>
      <summary>Apoyos alternativos <span>{alternatives.length}</span></summary>
      <OrderedRows items={alternatives} onChange={(next) => onChange([main, ...next])}
        addLabel="Añadir alternativa" add={() => ({ id: null, sets: [] })}
        render={(support, update) => fields(support, update, 'Elegir apoyo alternativo')} />
    </details>}
  </div>
}

function TeamForm({ value, onChange, catalog, characterId }) {
  const roleGroup = useId()
  const names = new Map(catalog.people.map(({ id, name }) => [id, name]))
  return <OrderedRows items={value} onChange={onChange} addLabel="Añadir dúo"
    add={() => initialTeam(characterId)}
    rowTitle={(team, index) => {
      const title = teamTitle(team, names)
      return `Equipo ${index + 1}${title ? ' · ' + title : ''}`
    }}
    render={(team, change) => <div className="editor-fields">
      <label className="editor-field">Título del equipo
        <input value={team.title ?? teamTitle(team, names)} placeholder="Nombres del dúo"
          onChange={(event) => change({ ...team, title: event.target.value })} />
      </label>
      <fieldset className="editor-role-picker">
        <legend>Papel del personaje de la ficha</legend>
        <div className="editor-role-options">
          {[
            ['main', 'DPS principal'],
            ['sub', 'Sub-DPS'],
            ['support', 'Apoyo'],
          ].map(([role, label], pivot) => (
            <label key={role} data-role={role}>
              <input type="radio" name={roleGroup} checked={team.pivot === pivot}
                onChange={() => change(changeTeamRole(team, pivot))} />
              {label}
            </label>
          ))}
        </div>
      </fieldset>
      {team.pair.map((member, position) => <fieldset className="editor-team-role" data-role={position === 0 ? 'main' : 'sub'} key={position}>
        <legend>{position === 0 ? 'DPS principal' : 'Sub-DPS'}</legend>
        <Picker label="Elegir integrante" items={catalog.people} value={member.id}
          disabled={position === team.pivot} onChange={(id) => {
            const pair = team.pair.map((item, slot) => position === slot ? { id, sets: [] } : item)
            change({ ...team, pair })
          }} />
        <SetRows value={member.sets} catalog={catalog.sets} revealOnOpen
          onChange={(sets) => change({ ...team, pair: team.pair.map((item, slot) => position === slot ? { ...item, sets } : item) })} />
      </fieldset>)}
      <TeamSupports team={team} onChange={(supports) => change({ ...team, supports })} catalog={catalog} />
    </div>} />
}

async function editorRequest(options) {
  const response = await fetch('/__build-editor/data', options)
  const data = await response.json()
  if (!response.ok) throw new Error(data.error)
  return data
}

function Editor() {
  const [catalog, setCatalog] = useState(null)
  const [data, setData] = useState(null)
  const [characterId, setCharacterId] = useState(null)
  const [tab, setTab] = useState('ecos')
  const [mobilePreview, setMobilePreview] = useState(false)
  const [draft, setDraft] = useState(null)
  const [fresh, setFresh] = useState(false)
  const [dirty, setDirty] = useState(false)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState('')
  const [loadError, setLoadError] = useState('')
  useEffect(() => {
    Promise.all([loadCatalog(), editorRequest()]).then(([source, persisted]) => {
      setCatalog(source)
      setData(persisted)
    }).catch(() => setLoadError('No se pudo abrir el editor o cargar Encore. Comprueba tu conexión y recarga la página.'))
  }, [])
  useEffect(() => {
    if (!dirty) return undefined
    const stop = (event) => event.preventDefault()
    window.addEventListener('beforeunload', stop)
    return () => window.removeEventListener('beforeunload', stop)
  }, [dirty])

  const open = (id, empty = false) => {
    if (dirty && !window.confirm('¿Descartar los cambios sin guardar?')) return
    setCharacterId(id)
    setMobilePreview(false)
    setFresh(empty)
    setDraft(draftFrom(data.builds[id] ?? {}, id, { fresh: empty }))
    setDirty(empty)
    setStatus('')
  }
  const update = (change) => {
    setDraft((current) => ({ ...current, ...change }))
    setDirty(true)
    setStatus('')
  }
  const character = catalog?.characters.find(({ Id }) => Id === characterId)
  const characterIndex = catalog?.people.findIndex(({ id }) => id === characterId) ?? -1
  const previousCharacter = catalog?.people[characterIndex - 1]
  const nextCharacter = catalog?.people[characterIndex + 1]
  const build = draft && toBuild(draft, catalog.people)
  const save = async () => {
    const invalidCosts = Object.values(draft.costs).some(({ rows }) => rows.some(({ name }) => !name))
    const secondCost = draft.costs[secondaryCost4]
    const incompleteCost4 = secondCost && (!draft.costs[4].rows.length || !secondCost.rows.length)
    const error = incompleteCost4 ? 'Añade una estadística en cada bloque de coste 4.'
      : invalidCosts ? 'Selecciona todas las estadísticas principales añadidas.' : validateBuild(build, characterId)
    if (error) { setStatus(error); return }
    setSaving(true)
    setStatus('')
    try {
      const persisted = await editorRequest({
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ characterId, build, fresh, revision: data.revisions[characterId] ?? null }),
      })
      setData(persisted)
      setDirty(false)
      setFresh(false)
      setStatus('Ficha guardada.')
    } catch (error) {
      setStatus(error.message || 'No se pudo guardar la ficha.')
    } finally {
      setSaving(false)
    }
  }
  return <main className="build-editor">
    <header className="editor-header">
      <h1>Editor de fichas</h1>
      <a href="/">Ver WuWa Builds</a>
    </header>
    {loadError && <p role="alert">{loadError}</p>}
    {!catalog && !loadError && <p role="status">Cargando catálogo de Encore…</p>}
    {catalog && <div className="editor-toolbar">
      <div className="editor-character-nav" role="group" aria-label="Navegación de personajes">
        <button type="button" aria-label="Personaje anterior" title={previousCharacter?.name ?? 'Personaje anterior'}
          disabled={saving || !previousCharacter} onClick={() => open(previousCharacter.id)}>←</button>
        <Picker label="Elegir personaje" items={catalog.people} value={characterId} onChange={open} disabled={saving} />
        <button type="button" aria-label="Personaje siguiente" title={nextCharacter?.name ?? 'Personaje siguiente'}
          disabled={saving || !nextCharacter} onClick={() => open(nextCharacter.id)}>→</button>
      </div>
      {draft && <div className="editor-toolbar-actions">
        <label className="editor-preparation">
          <input type="checkbox" checked={draft.enPreparacion} disabled={saving}
            onChange={(event) => update({ enPreparacion: event.target.checked })} /> Ficha en preparación
        </label>
        
        <button type="button" disabled={saving} onClick={() => open(characterId, true)}>Empezar desde cero</button>
        <button type="button" className="editor-primary" disabled={!dirty || saving} onClick={save}>
          {saving ? 'Guardando…' : 'Guardar ficha'}
        </button>
        <p className="editor-status" data-error={Boolean(status && dirty)} role="status">{status || (saving ? 'Guardando…' : dirty ? 'Cambios sin guardar' : 'Al día')}</p>
      </div>}
    </div>}
    {catalog && !draft && <p className="editor-empty">Elige un personaje para abrir su ficha.</p>}
    {draft && <>
      <div className="editor-workspace" data-section={tab} data-preview={mobilePreview}>
        <section className="editor-editing" aria-label="Formulario de la ficha">
          <div className="editor-section-heading">
            <h2>{character?.Name}</h2>
            <button type="button" className="editor-mobile-view" onClick={() => setMobilePreview(true)}>
              Ver vista previa
            </button>
          </div>
          <nav className="editor-tabs" aria-label="Secciones de la ficha">
            {tabs.map(([id, label]) => (
              <button type="button" key={id} data-section={id} aria-pressed={tab === id} onClick={() => setTab(id)}>{label}</button>
            ))}
          </nav>
          <fieldset className="editor-form" aria-label={tabs.find(([id]) => id === tab)[1]}
            disabled={saving} key={`${characterId}-${tab}`}>
          {tab === 'ecos' && <EchoForm draft={draft} update={update} catalog={catalog} />}
          {tab === 'armas' && <WeaponsForm value={draft.armas} onChange={(armas) => update({ armas })} catalog={catalog} character={character} />}
          {tab === 'equipos' && <TeamForm value={draft.equipos} onChange={(equipos) => update({ equipos })} catalog={catalog} characterId={characterId} />}
          </fieldset>
        </section>
        <aside id="editor-preview" className="editor-preview" aria-labelledby="editor-preview-title">
          <div className="editor-section-heading">
            <h2 id="editor-preview-title">Vista previa</h2>
            <button type="button" className="editor-mobile-view" onClick={() => setMobilePreview(false)}>
              Volver a editar
            </button>
          </div>
          <BuildSections key={characterId} tab={tab} build={previewBuild(build)} characters={catalog.characters}
            characterId={characterId} personalWeaponId={data.builds._armaPersonal?.[characterId]} />
        </aside>
      </div>
    </>}
  </main>
}

createRoot(document.getElementById('editor-root')).render(<Editor />)
