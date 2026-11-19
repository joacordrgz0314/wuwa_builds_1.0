function Group({ label, options, value, onChange }) {
  return (
    <div className="filter-group" role="group" aria-label={label}>
      {options.map((opt) => (
        <button
          key={opt.id}
          type="button"
          className="filter-chip"
          aria-pressed={value === opt.id}
          onClick={() => onChange(value === opt.id ? null : opt.id)}
        >
          {opt.icon && <img src={opt.icon} alt="" onError={(e) => { e.currentTarget.style.display = 'none' }} />}
          {opt.name}
        </button>
      ))}
    </div>
  )
}

// Selección única por grupo: elegir una opción quita la anterior; volver a pulsarla la quita.
export default function FilterBar({ elements, weapons, element, weapon, query, count, total, onQuery, onElement, onWeapon }) {
  return (
    <nav className="filters" aria-label="Filtros">
      <div className="filter-top">
        <input
          type="search"
          className="search-input"
          placeholder="Buscar personaje…"
          aria-label="Buscar personaje"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
        />
        <p className="filter-count" aria-live="polite">
          {count === total ? `${total} personajes` : `${count} de ${total} personajes`}
        </p>
      </div>
      <div className="filter-row">
        <Group label="Elemento" options={elements} value={element} onChange={onElement} />
        <Group label="Arma" options={weapons} value={weapon} onChange={onWeapon} />
      </div>
    </nav>
  )
}
