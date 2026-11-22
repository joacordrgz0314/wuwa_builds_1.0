import { useEffect, useId, useRef, useState } from "react";
import {
  assetUrl,
  getEchoData,
  getCharacterGuide,
  parseRichText,
  statIconUrl,
  getWeapons,
  getWeaponStats,
  getWeaponDesc,
} from "../api.js";

function hideOnError(e) {
  e.currentTarget.style.visibility = "hidden";
}

// Pide un recurso de la API solo si la build lo usa.
function useLoad(load, needed, key) {
  const [state, setState] = useState({
    status: needed ? "loading" : "idle",
    data: null,
  });
  useEffect(() => {
    if (!needed) return undefined;
    let cancelled = false;
    load(key)
      .then((data) => !cancelled && setState({ status: "ok", data }))
      .catch(() => !cancelled && setState({ status: "error", data: null }));
    return () => {
      cancelled = true;
    };
  }, [load, needed, key]);
  if (!needed) return { status: "idle", data: null };
  return state.status === "idle" ? { status: "loading", data: null } : state;
}

function Section({ title, content }) {
  return (
    <section className="char-page-section">
      <h3>{title}</h3>
      {content ?? <p className="app-msg">Aún sin build.</p>}
    </section>
  );
}

function Status({ state }) {
  if (state.status === "loading") return <p className="app-msg">Cargando…</p>;
  return (
    <p className="app-msg">No se pudieron cargar los nombres desde la API.</p>
  );
}

// Interpreta ecos.stats: «Coste N: A o B (nota)» y «Subestadísticas: A > B > C»; lo demás queda como línea suelta.
function parseEchoStats(lines = []) {
  const costs = [];
  let subs = [];
  const extra = [];
  for (const line of lines) {
    const c = line.match(/^Coste\s+(\d+)\s*:\s*(.+)$/i);
    const sub = line.match(/^Subestad[ií]sticas\s*:\s*(.+)$/i);
    if (c) {
      let rest = c[2];
      let note = "";
      const par = rest.match(/\(([^)]*)\)\s*$/);
      if (par) {
        note = par[1].trim();
        rest = rest.slice(0, par.index).trim();
      }
      const alternatives = rest
        .split(/\s+o\s+/i)
        .map((option) => option.trim())
        .filter(Boolean);
      const options = alternatives.flatMap((alternative, alternativeIndex) =>
        alternative
          .split(/\s*\+\s*/)
          .map((option, optionIndex) => {
            const quantity = option.match(/^(\d+)\s*(?:x|\u00d7)\s*(.+)$/i);
            return {
              text: (quantity?.[2] ?? option).trim(),
              quantity: quantity ? Number(quantity[1]) : 1,
              alternative: alternativeIndex > 0 && optionIndex === 0,
            };
          })
          .filter(({ text }) => text),
      );
      const mergedOptions = Number(c[1]) === 3
        ? options.reduce((result, option) => {
            const repeated = result.find(
              (entry) =>
                !entry.alternative &&
                !option.alternative &&
                entry.text.toLowerCase() === option.text.toLowerCase(),
            );
            if (repeated) repeated.quantity += option.quantity;
            else result.push({ ...option });
            return result;
          }, [])
        : options;
      costs.push({
        cost: Number(c[1]),
        options: mergedOptions,
        note,
      });
    } else if (sub) {
      subs = sub[1]
        .split(">")
        .map((x) => x.trim())
        .filter(Boolean);
    } else {
      extra.push(line);
    }
  }
  costs.sort((a, b) => b.cost - a.cost);
  return { costs, subs, extra };
}

// Icono de un stat a partir de su texto; «Daño <elemento>» usa el icono de bono de ese elemento (respaldo: el del elemento). Sin icono conocido: ''.
const ELEMENT_BY_NAME = [
  [/glacio|gelio/, 1],
  [/fusi[oó]n/, 2],
  [/electro/, 3],
  [/aero/, 4],
  [/espectro/, 5],
  [/destrucci[oó]n/, 6],
];
function statIcon(text, elementIcons) {
  const t = text.toLowerCase();
  if (/ataque (cargado|pesado)/.test(t)) return statIconUrl('chargedAttack')
  if (/habilidad de resonancia/.test(t)) return statIconUrl('resonanceSkill')
  if (/da[ñn]o de ataque b[aá]sico|basic attack/.test(t))
    return statIconUrl("basicAttack");
  if (/bonificaci[oó]n de liberaci[oó]n de resonancia/.test(t))
    return statIconUrl('liberation')
  if (/da[ñn]o\s*cr[ií]t|cr[ií]t\w*\s*da[ñn]o/.test(t))
    return statIconUrl("critDmg");
  if (/prob\w*\.?\s*cr[ií]t|cr[ií]t\w*\s*prob/.test(t))
    return statIconUrl("critProb");
  if (/energ[ií]a|regen/.test(t)) return statIconUrl("energia");
  if (/cura/.test(t)) return statIconUrl("cura");
  if (/da[ñn]o/.test(t)) {
    const el = ELEMENT_BY_NAME.find(([re]) => re.test(t));
    return el ? statIconUrl(`bono${el[1]}`) || elementIcons?.[el[1]] || "" : "";
  }
  if (/^(atq|atk|ataque)/.test(t)) return statIconUrl("atq");
  if (/^(hp|ps|vida)/.test(t)) return statIconUrl("ps");
  if (/^def/.test(t)) return statIconUrl("def");
  return "";
}

function StatChip({ text, quantity = 1, value, elementIcons, iconKey }) {
  const icon = statIconUrl(iconKey) || statIcon(text, elementIcons)
  return (
    <span className="echo-chip">
      {icon && (
        <img
          className="echo-chip-icon"
          src={icon}
          alt=""
          referrerPolicy="no-referrer"
          onError={hideOnError}
        />
      )}
      <span>{text.replace(/^ATK/i, "ATQ")}</span>
      {quantity > 1 && <strong className="echo-chip-quantity">{"\u00d7"}{quantity}</strong>}
      {value != null && <strong className="echo-target-value">{value}</strong>}
    </span>
  );
}

function EchoCard({ icon, name, badge, main, empty }) {
  return (
    <div
      className={`echo-card${main ? " is-main" : ""}${empty ? " is-empty" : ""}`}
    >
      <div className={`echo-icon${empty ? " is-empty" : ""}`}>
        {icon && (
          <img
            src={icon}
            alt=""
            referrerPolicy="no-referrer"
            loading="lazy"
            decoding="async"
            onError={hideOnError}
          />
        )}
      </div>
      <div className="weapon-body">
        <div className="weapon-badges">
          <span className={`weapon-badge${main ? "" : " is-alt"}`}>
            {badge}
          </span>
        </div>
        {empty ? (
          <p className="app-msg">Sin definir</p>
        ) : (
          <strong className="weapon-name">{name}</strong>
        )}
      </div>
    </div>
  );
}

function EchoRow({ cost, children, empty }) {
  return (
    <div className={`echo-row${empty ? " is-empty" : ""}`}>
      <span className="echo-cost">
        <b>{cost}</b>
        <small>Coste</small>
      </span>
      <div className="echo-chips">{children}</div>
    </div>
  );
}

// Combinación de sets: el primero identifica la tarjeta y todos muestran icono y piezas juntos.
function SetCombo({ combo, sets }) {
  const [first, ...rest] = combo;
  const main = sets.get(first.id);
  return (
    <div className="echo-card">
      <div className="echo-icon">
        {main?.Icon && (
          <img
            src={main.Icon}
            alt=""
            referrerPolicy="no-referrer"
            loading="lazy"
            decoding="async"
            onError={hideOnError}
          />
        )}
      </div>
      <div className="weapon-body">
        <div className="weapon-badges">
          <span className="weapon-badge">
            {first.piezas} {first.piezas === 1 ? "pieza" : "piezas"}
          </span>
          {rest.map((item) => {
            const set = sets.get(item.id);
            return (
              <span
                className="weapon-badge echo-combo-badge"
                key={item.id}
                title={set?.Name ?? `Set #${item.id}`}
              >
                {set?.Icon && (
                  <img
                    src={set.Icon}
                    alt=""
                    referrerPolicy="no-referrer"
                    onError={hideOnError}
                  />
                )}
                {item.piezas} {item.piezas === 1 ? "pieza" : "piezas"}
              </span>
            );
          })}
        </div>
        <strong className="weapon-name">
          {main?.Name ?? `Set #${first.id}`}
        </strong>
      </div>
    </div>
  );
}

// Eco principal de una fila: icono con brillo, icono del set arriba a la derecha y nombre al lado.
function EchoShow({ eco, setIcon, empty }) {
  return (
    <div className="echo-show" title={eco?.name}>
      <div className="echo-show-wrap">
        <div className={`echo-icon${empty ? " is-empty" : ""}`}>
          {eco && (
            <img
              src={eco.icon}
              alt=""
              referrerPolicy="no-referrer"
              loading="lazy"
              decoding="async"
              onError={hideOnError}
            />
          )}
        </div>
        {setIcon && (
          <img
            className="echo-set-badge"
            src={setIcon}
            alt=""
            referrerPolicy="no-referrer"
            onError={hideOnError}
          />
        )}
      </div>
      {empty ? (
        <p className="app-msg">Sin definir</p>
      ) : (
        <strong className="echo-show-name">{eco.name}</strong>
      )}
    </div>
  );
}

// Zona de abajo: stats recomendadas (costes, subestadísticas y líneas sueltas), centradas.
function EchoTargets({ items, elementIcons }) {
  return (
    <div className="echo-targets">
      <h4 className="echo-zone">Subestadísticas</h4>
      <ol className="echo-targets-list">
        {items.map(({ nombre, valor, iconKey }, index) => (
          <li key={nombre}>
            <span className={`echo-target-rank rank-${index + 1}`}>{index + 1}</span>
            <StatChip text={nombre} value={valor || undefined} iconKey={iconKey} elementIcons={elementIcons} />
          </li>
        ))}
      </ol>
    </div>
  );
}

function EchoStats({ costs, subs, extra, targets, elementIcons, iconosStats, empty }) {
  return (
    <div className="echo-stats">
      <h4 className="echo-zone">Stats recomendadas</h4>
      {empty ? (
        <div className="echo-costs" style={{ "--cols": 3 }}>
          {[4, 3, 1].map((c) => (
            <EchoRow key={c} cost={c} empty>
              <span className="echo-chip is-empty">Sin definir</span>
            </EchoRow>
          ))}
        </div>
      ) : (
        <>
          {costs.length > 0 && (
            <div
              className="echo-costs"
              style={{ "--cols": Math.min(costs.length, 3) }}
            >
              {costs.map(({ cost, options }) => (
                <EchoRow key={cost} cost={cost}>
                  <div className={options.length > 1 ? "echo-options is-stacked" : "echo-options"}>
                    {options.map((option, index) => (
                      <span key={`${option.text}-${index}`} className="echo-chips-item">
                        {cost !== 4 && option.alternative && <em>o</em>}
                        <StatChip
                          text={option.text}
                          quantity={option.quantity}
                          elementIcons={elementIcons}
                          iconKey={iconosStats?.[option.text]}
                        />
                      </span>
                    ))}
                  </div>
                </EchoRow>
              ))}
            </div>
          )}
          {subs.length > 0 && (
            <div className="echo-subs">
              <span className="echo-subs-label">Subestadísticas</span>
              <div className="echo-chips">
                {subs.map((x, i) => (
                  <span key={x} className="echo-chips-item">
                    {i > 0 && <em aria-hidden="true">›</em>}
                    <StatChip text={x} elementIcons={elementIcons} />
                  </span>
                ))}
              </div>
            </div>
          )}
          {extra.length > 0 && (
            <ul className="build-list">
              {extra.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          )}
          {targets?.length > 0 && (
            <EchoTargets items={targets} elementIcons={elementIcons} />
          )}
        </>
      )}
    </div>
  );
}

// Dos columnas alineadas por fila (sets a la izquierda, ecos principales a la derecha, ambos de arriba abajo por prioridad) y las stats debajo.
function EchoLayout({ rows, ecoLabel, stats, children }) {
  return (
    <div className="echo-block">
      <div className="echo-cols" style={{ "--rows": rows.length + 1 }}>
        <div className="echo-col echo-col-sets">
          <h4 className="echo-zone">Sets</h4>
          {rows.map((r) => r.set)}
        </div>
        <div className="echo-col echo-col-ecos">
          <h4 className="echo-zone">{ecoLabel}</h4>
          {rows.map((r) => r.eco)}
        </div>
      </div>
      {stats}
      {children}
    </div>
  );
}

function Echoes({ ecos, echoData, elementIcons }) {
  const { costs, subs, extra } = parseEchoStats(ecos.stats);
  const ready = echoData.status === "ok";
  const needsData = Boolean(ecos.ecoPrincipal || ecos.sets?.length);
  // Cada fila muestra el eco asociado a su combinación de sets.
  const cards = [
    { combo: ecos.sets, label: null, eco: ecos.ecoPrincipal },
    ...(ecos.alternativas ?? []).map((a) => ({
      combo: a.sets,
      label: a.etiqueta,
      eco: a.ecoPrincipal,
    })),
  ];
  const multi = cards.filter(({ eco }) => eco).length > 1;
  const rows = cards.map((c, i) => {
    const hasCombo = c.combo?.length > 0;
    let set;
    if (!hasCombo) set = <EchoCard key={`s${i}`} empty badge="Set" />;
    else if (ready)
      set = (
        <SetCombo
          key={`s${i}`}
          combo={c.combo}
          sets={echoData.data.sets}
        />
      );
    else set = <div key={`s${i}`} className="echo-ph" aria-hidden="true" />;
    let eco;
    if (c.eco) {
      const e = ready ? echoData.data.echoes.get(c.eco) : null;
      const setIcon =
        ready && hasCombo ? echoData.data.sets.get(c.combo[0].id)?.Icon : null;
      eco = e ? (
        <EchoShow key={`e${i}`} eco={e} setIcon={setIcon} />
      ) : (
        <div key={`e${i}`} className="echo-ph" aria-hidden="true" />
      );
    } else if (i === 0) {
      eco = <EchoShow key="e0" empty />;
    } else {
      eco = <div key={`e${i}`} className="echo-ph" aria-hidden="true" />;
    }
    return { set, eco };
  });
  const hasStats = costs.length > 0 || subs.length > 0 || extra.length > 0 || ecos.subestadisticas?.length > 0;
  return (
    <EchoLayout
      rows={rows}
      ecoLabel={multi ? "Ecos principales" : "Eco principal"}
      stats={
        hasStats && (
          <EchoStats
            costs={costs}
            subs={subs}
            extra={extra}
            targets={ecos.subestadisticas}
            iconosStats={ecos.iconosStats}
            elementIcons={elementIcons}
          />
        )
      }
    >
      {needsData && !ready && <Status state={echoData} />}
    </EchoLayout>
  );
}

// Marcos vacíos mientras no hay build de ecos.
function EchoesEmpty() {
  const rows = [
    {
      set: <EchoCard key="s0" empty badge="Set" />,
      eco: <EchoShow key="e0" empty />,
    },
  ];
  return (
    <EchoLayout
      rows={rows}
      ecoLabel="Eco principal"
      stats={<EchoStats empty />}
    />
  );
}

// Stat principal y secundaria del arma (al nivel máximo); si falla, la tarjeta se ve sin ellas.
function WeaponStats({ id }) {
  const [stats, setStats] = useState([]);
  useEffect(() => {
    let cancelled = false;
    getWeaponStats(id)
      .then((s) => !cancelled && setStats(s))
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [id]);
  if (!stats.length) return null;
  return (
    <ScrollableRow as="div" contentAs="ul" contentClassName="weapon-stats" label="Estadísticas al nivel máximo">
      {stats.map((st) => (
        <li key={st.name} className="weapon-stat">
          {st.icon && <img src={st.icon} alt="" onError={hideOnError} />}
          <span>{st.name}</span>
          <strong>{st.value}</strong>
        </li>
      ))}
    </ScrollableRow>
  );
}

function closeFromBackdrop(event) {
  const dialog = event.currentTarget;
  if (event.target !== dialog) return;
  const { top, right, bottom, left } = dialog.getBoundingClientRect();
  if (event.clientX < left || event.clientX > right ||
      event.clientY < top || event.clientY > bottom) {
    dialog.close();
  }
}

function MoreDialog({ title, children, buttonLabel = "Ver más" }) {
  const dialog = useRef(null);
  const titleId = useId();
  return (
    <>
      <button
        type="button"
        className="weapon-more"
        onClick={(event) => {
          event.currentTarget.focus({ preventScroll: true });
          dialog.current.showModal();
        }}
      >
        {buttonLabel}
      </button>
      <dialog ref={dialog} className="content-dialog" aria-labelledby={titleId} onClick={closeFromBackdrop}>
        <form method="dialog" className="content-dialog-actions">
          <button type="submit" className="weapon-more content-dialog-close">Cerrar</button>
        </form>
        <h4 id={titleId}>{title}</h4>
        <div className="content-dialog-body">{children}</div>
      </dialog>
    </>
  );
}

function RichParagraphs({ items, dividerAt }) {
  return items.map((text, index) => (
    <div key={`${index}-${text.slice(0, 20)}`}>
      {dividerAt === index && <hr className="guide-forte-divider" />}
      <p className="guide-text">
        {parseRichText(text).map((part, partIndex) =>
          part.hl ? <b key={partIndex}>{part.text}</b> : <span key={partIndex}>{part.text}</span>,
        )}
      </p>
    </div>
  ));
}

// Efecto completo del arma principal en refinamiento 1.
function WeaponDesc({ id }) {
  const [info, setInfo] = useState(null)
  useEffect(() => {
    let cancelled = false
    getWeaponDesc(id)
      .then((data) => !cancelled && setInfo(data))
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [id])
  if (!info?.desc.length) return null
  return (
    <div className="weapon-desc is-full">
      {info.passive && <strong className="weapon-passive">{info.passive}</strong>}
      <p className="weapon-desc-text is-full">
        {info.desc.map((part, index) =>
          part.hl ? <b key={index}>{part.text}</b> : <span key={index}>{part.text}</span>,
        )}
      </p>
    </div>
  )
}

function WeaponCard({ weapon, weapons, rank, personalWeaponId }) {
  const { id, porcentaje, f2p, bp, permanente, refinamiento } = weapon;
  const w = weapons.data.get(id);
  return (
    <li
      className={`weapon-card rarity-${w?.QualityId ?? 4}${rank === 0 ? " is-main" : ""}`}
    >
      <div className="weapon-icon">
        {w?.Icon && <img src={w.Icon} alt="" onError={hideOnError} />}
      </div>
      <div className="weapon-body">
        <div className="weapon-badges">
          <span className={`weapon-badge${rank === 0 ? "" : " is-alt"}`}>
            {rank === 0 ? "Mejor" : `${rank + 1}.ª opción`}
          </span>
          {id === personalWeaponId && (
            <span className="weapon-badge is-own">Exclusiva</span>
          )}
          {porcentaje != null && (
            <span className="weapon-badge is-performance">{String(porcentaje).replace(".", ",")} %</span>
          )}
          {permanente && <span className="weapon-badge is-permanent">Permanente</span>}
          {f2p && (
            <span className="weapon-badge is-f2p">
              F2P
            </span>
          )}
          {bp && <span className="weapon-badge is-f2p">BP</span>}
        </div>
        <strong className="weapon-name">
          {w?.Name ?? `Arma #${id}`}{refinamiento ? ` · ${refinamiento}` : ''}
        </strong>
        {w && (
          <span
            className={`build-stars rarity-${w.QualityId}`}
            aria-label={`${w.QualityId} estrellas`}
          >
            {"★".repeat(w.QualityId)}
          </span>
        )}
        <WeaponStats id={id} />
      </div>
      {rank === 0 && <WeaponDesc id={id} />}
    </li>
  );
}

// Jerarquía: la mejor arma grande arriba y las alternativas más pequeñas debajo.
function Weapons({ armas, armasPorModo, weapons, personalWeaponId }) {
  const [selected, setSelected] = useState(0);
  if (weapons.status !== "ok") return <Status state={weapons} />;
  const ranking = (armasPorModo?.[selected]?.armas ?? armas).slice(0, 5);
  const [main, ...rest] = ranking;
  return (
    <div className="weapon-tiers">
      {armasPorModo && (
        <div
          className="guide-modes"
          role="group"
          aria-label="Modo del ranking de armas"
        >
          {armasPorModo.map(({ modo }, index) => (
            <button
              key={modo}
              type="button"
              className={`guide-mode${selected === index ? " is-on" : ""}`}
              aria-pressed={selected === index}
              onClick={() => setSelected(index)}
            >
              {modo}
            </button>
          ))}
        </div>
      )}
      <ol className="build-weapons weapon-main">
        <WeaponCard
          key={main.id}
          weapon={main}
          weapons={weapons}
          rank={0}
          personalWeaponId={personalWeaponId}
        />
      </ol>
      {rest.length > 0 && (
        <ol className="build-weapons weapon-alts">
          {rest.map((weapon, i) => (
            <WeaponCard
              key={weapon.id}
              weapon={weapon}
              weapons={weapons}
              rank={i + 1}
              personalWeaponId={personalWeaponId}
            />
          ))}
        </ol>
      )}
    </div>
  );
}

// Equipos sin build: mismo formato con marcos vacíos.
const EMPTY_TEAMS = [1, 2].map((n) => ({
  nombre: `Equipo ${n}`,
  miembros: [null, null, null],
}));
const dprFormat = new Intl.NumberFormat("es-CL");

function WeaponsEmpty() {
  return (
    <div className="weapon-tiers">
      {[0, 1].map((i) => (
        <ol
          key={i}
          className={`build-weapons ${i === 0 ? "weapon-main" : "weapon-alts"}`}
        >
          <li className={`weapon-card is-empty${i === 0 ? " is-main" : ""}`}>
            <div className="weapon-icon is-empty" />
            <div className="weapon-body">
              <div className="weapon-badges">
                <span className={`weapon-badge${i === 0 ? "" : " is-alt"}`}>
                  {i === 0 ? "Mejor" : "2.ª opción"}
                </span>
              </div>
              <p className="app-msg">Sin definir</p>
            </div>
          </li>
        </ol>
      ))}
    </div>
  );
}

function TeamConfiguration({ members, characters, sets }) {
  return members.map(({ id, secuencia, refinamiento, setId, setCodigo, sets: memberSets }) => {
    const name = characters.find((character) => character.Id === id)?.Name
    const configuredSets = memberSets ?? (setId ? [{ id: setId }] : [])

    return (
      <span className="team-variant-member" key={id}>
        <span>{name ?? `Personaje #${id}`} {secuencia} {refinamiento}</span>
        {configuredSets.map(({ id: configuredSetId, piezas }) => {
          const set = sets?.get(configuredSetId)
          if (!set?.Icon) return null
          const pieces = piezas ? ` · ${piezas} ${piezas === 1 ? 'pieza' : 'piezas'}` : ''
          return (
            <img
              className="team-variant-set"
              key={configuredSetId}
              src={assetUrl(set.Icon)}
              alt={`${set.Name}${pieces}`}
              title={`${set.Name}${pieces}`}
              referrerPolicy="no-referrer"
              onError={(event) => { event.currentTarget.hidden = true }}
            />
          )
        })}
        <span className="team-variant-set-code">{setCodigo}</span>
      </span>
    )
  })
}

function VariantConditions({ configuraciones, condiciones, characters, sets }) {
  if (!configuraciones?.length) return condiciones && <small>{condiciones}</small>
  if (configuraciones.length === 1) {
    return (
      <small className="team-single-variant">
        <ScrollableTeamConfiguration members={configuraciones[0]} characters={characters} sets={sets} />
      </small>
    )
  }

  return configuraciones.map((members, index) => (
    <small className="team-variant-conditions" key={index}>
      <ScrollableTeamConfiguration members={members} characters={characters} sets={sets} />
    </small>
  ))
}

function ScrollableTeamConfiguration({ members, characters, sets, main = false }) {
  return (
    <span className={main ? 'team-names team-main-configuration' : undefined}>
      <ScrollableRow contentClassName="team-config-members" label="Integrantes del equipo">
        <TeamConfiguration members={members} characters={characters} sets={sets} />
      </ScrollableRow>
    </span>
  )
}

function ScrollableRow({ as: Row = 'span', contentAs: Content = 'span', contentClassName, label, children }) {
  const scroller = useRef(null)
  const content = useRef(null)
  const [scrollState, setScrollState] = useState({ overflow: false, more: false })
  const [hovered, setHovered] = useState(false)

  function measure() {
    const row = scroller.current
    const remaining = row.scrollWidth - row.clientWidth
    const overflow = remaining > 1
    const more = remaining - row.scrollLeft > 1
    setScrollState((previous) =>
      previous.overflow === overflow && previous.more === more ? previous : { overflow, more },
    )
  }

  useEffect(() => {
    const observer = new ResizeObserver(measure)
    observer.observe(scroller.current)
    observer.observe(content.current)
    measure()
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!hovered || !scrollState.overflow) return

    const row = scroller.current
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame
    let start
    let origin
    let direction

    function animate(now) {
      const end = row.scrollWidth - row.clientWidth
      const target = direction > 0 ? end : 0
      const distance = Math.max(0, now - start) * 0.032
      row.scrollLeft = direction > 0
        ? Math.min(target, origin + distance)
        : Math.max(target, origin - distance)

      if (distance >= Math.abs(target - origin)) {
        origin = target
        direction *= -1
        start = now + 650
      }
      frame = requestAnimationFrame(animate)
    }

    function updateMotion() {
      cancelAnimationFrame(frame)
      if (reducedMotion.matches) return
      origin = row.scrollLeft
      direction = row.scrollWidth - row.clientWidth - origin > 1 ? 1 : -1
      start = performance.now() + 400
      frame = requestAnimationFrame(animate)
    }

    updateMotion()
    reducedMotion.addEventListener('change', updateMotion)
    return () => {
      cancelAnimationFrame(frame)
      reducedMotion.removeEventListener('change', updateMotion)
    }
  }, [hovered, scrollState.overflow])

  return (
    <Row
      className={`team-config-scroll${scrollState.more ? ' has-more' : ''}`}
      ref={scroller}
      onScroll={measure}
      onPointerEnter={(event) => setHovered(event.pointerType !== 'touch')}
      onPointerLeave={() => setHovered(false)}
      onKeyDown={() => setHovered(false)}
      tabIndex={scrollState.overflow ? 0 : undefined}
      role={scrollState.overflow ? 'group' : undefined}
      aria-label={scrollState.overflow ? `${label}. Usa las flechas para desplazarte.` : undefined}
    >
      <Content className={['scrollable-row-content', contentClassName].filter(Boolean).join(' ')} ref={content}>
        {children}
      </Content>
    </Row>
  )
}

// Cada equipo es una tarjeta: número, título, nombres de los integrantes y solo iconos de cabeza.
function rotationText({ rotacion }) {
  return rotacion == null ? "" : ` · ${rotacion} s`;
}

function Teams({ equipos, characters, characterId, sets }) {
  const [selected, setSelected] = useState(null);
  const dialog = useRef(null);
  const titleId = useId();

  useEffect(() => {
    if (selected && !dialog.current.open) dialog.current.showModal();
  }, [selected]);

  return (
    <>
      <div className="build-teams">
        {equipos.map((team, n) => {
          const names = team.miembros
            .map((m) =>
              m ? characters.find((x) => x.Id === m.id)?.Name : null,
            )
            .filter(Boolean)
            .join(" · ");
          return (
            <div key={n} className="build-team">
              <span className="team-num" aria-hidden="true">
                {String(n + 1).padStart(2, "0")}
              </span>
              <h4><ScrollableRow label="Título del equipo">{team.nombre}</ScrollableRow></h4>
              {team.configuracion?.length ? (
                <ScrollableTeamConfiguration members={team.configuracion} characters={characters} sets={sets} main />
              ) : (
                <p className="team-names">{names || "Sin definir"}</p>
              )}
              <ul className="team-grid">
                {team.miembros.map((m, i) => {
                  if (!m) {
                    return (
                      <li key={i} className="team-slot">
                        <div className="team-tile is-empty" />
                      </li>
                    );
                  }
                  const c = characters.find((x) => x.Id === m.id);
                  const isCurrent = m.id === characterId;
                  const Tag = isCurrent ? "div" : "a";
                  const name = c?.Name ?? `Personaje #${m.id}`;
                  const label = m.rol ? `${name}: ${m.rol}` : name;
                  return (
                    <li key={`${m.id}-${i}`} className="team-slot">
                      <Tag
                        className="team-tile"
                        title={label}
                        aria-label={label}
                        {...(isCurrent
                          ? { "aria-current": "true" }
                          : { href: `#/personaje/${m.id}` })}
                      >
                        {c?.RoleHeadIcon && (
                          <img
                            className="team-head"
                            src={assetUrl(c.RoleHeadIcon)}
                            alt=""
                            referrerPolicy="no-referrer"
                            loading="lazy"
                            decoding="async"
                            onError={hideOnError}
                          />
                        )}
                      </Tag>
                    </li>
                  );
                })}
              </ul>
              {(team.dpr != null || team.variantes?.length > 0) && (
                <div className="team-simulation">
                  {team.dpr != null && <span>
                    DPR = {dprFormat.format(team.dpr)}
                    {rotationText(team)}
                  </span>}
                  {team.variantes?.length > 0 && (
                    <button
                      type="button"
                      className="weapon-more"
                      onClick={(event) => {
                        event.currentTarget.focus({ preventScroll: true });
                        setSelected(team);
                      }}
                    >
                      {team.dpr != null ? "Ver variantes" : "Ver apoyos alternativos"}
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <dialog
        ref={dialog}
        className="team-dialog"
        aria-labelledby={titleId}
        onClick={closeFromBackdrop}
        onClose={() => setSelected(null)}
      >
        {selected && (
          <>
            <form method="dialog">
              <button type="submit" className="weapon-more">
                Cerrar
              </button>
            </form>
            <h4 id={titleId}>{selected.nombre}</h4>
            {selected.dpr != null && <p>
              DPR = {dprFormat.format(selected.dpr)}
              {rotationText(selected)}
            </p>}
            <ul className="team-variants">
              {selected.variantes?.map((variant) => {
                const { id, rol, dpr, condiciones, configuraciones } = variant;
                const support = characters.find(
                  (character) => character.Id === id,
                );
                return (
                  <li key={id}>
                    <a
                      className="team-tile"
                      href={`#/personaje/${id}`}
                      title={rol}
                      aria-label={support?.Name ?? `Personaje #${id}`}
                      onClick={() => dialog.current.close()}
                    >
                      {support?.RoleHeadIcon && (
                        <img
                          className="team-head"
                          src={assetUrl(support.RoleHeadIcon)}
                          alt=""
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          onError={hideOnError}
                        />
                      )}
                    </a>
                    <span>
                      {support?.Name ?? `Personaje #${id}`}
                      <VariantConditions
                        configuraciones={configuraciones}
                        condiciones={condiciones}
                        characters={characters}
                        sets={sets}
                      />
                    </span>
                    {dpr != null && <strong>
                      DPR = {dprFormat.format(dpr)}{rotationText(variant)}
                    </strong>}
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </dialog>
    </>
  );
}

// Texto del API recortado; «Ver más» abre el contenido completo sin alterar la tarjeta.
function RichClamp({ items, lines, paired = false, dividerAt }) {
  const [clipped, setClipped] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const card = el.parentElement;
    const peer =
      paired && card.parentElement.querySelector(".guide-height-reference");
    const wide = window.matchMedia("(min-width: 700px)");
    function measure() {
      card.style.removeProperty("--guide-peer-height");
      el.style.removeProperty("--guide-text-height");
      if (peer && wide.matches) {
        const height = peer.offsetHeight;
        const borders = card.offsetHeight - card.clientHeight;
        const bottom = parseFloat(getComputedStyle(card).paddingBottom);
        const offset =
          el.getBoundingClientRect().top - card.getBoundingClientRect().top;
        const available = height - borders - offset - bottom;
        card.style.setProperty("--guide-peer-height", `${height}px`);
        const minimum =
          (lines === 8 ? 4 : 1) *
          parseFloat(getComputedStyle(el.firstElementChild ?? el).lineHeight);
        const limit = Math.max(available, minimum || 0);
        el.style.setProperty("--guide-text-height", `${limit}px`);
        if (el.scrollHeight > el.clientHeight + 1) {
          el.style.setProperty(
            "--guide-text-height",
            `${Math.max(limit - 36, minimum || 0)}px`,
          );
        }
      }
      setClipped(el.scrollHeight > el.clientHeight + 1);
    }
    measure();
    const observer = new ResizeObserver(measure);
    if (peer) observer.observe(peer);
    observer.observe(card.parentElement, { box: "border-box" });
    wide.addEventListener("change", measure);
    return () => {
      observer.disconnect();
      wide.removeEventListener("change", measure);
      card.style.removeProperty("--guide-peer-height");
      el.style.removeProperty("--guide-text-height");
    };
  }, [items, lines, paired]);
  return (
    <>
      <div
        ref={ref}
        className={`guide-clamp${paired ? " is-paired" : ""}`}
        style={{ "--lines": lines }}
      >
        <RichParagraphs items={items} dividerAt={dividerAt} />
      </div>
      {clipped && (
        <MoreDialog title="Información completa">
          <RichParagraphs items={items} dividerAt={dividerAt} />
        </MoreDialog>
      )}
    </>
  );
}

// Modos de resonancia: selector con icono y nombre; arranca en el modo por defecto y cambia la descripción.
function Modes({ modes }) {
  const [sel, setSel] = useState(
    (modes.find((m) => m.isDefault) ?? modes[0]).id,
  );
  const cur = modes.find((m) => m.id === sel) ?? modes[0];
  return (
    <div className="guide-card">
      <h4>Modos de resonancia</h4>
      <div className="guide-modes" role="tablist">
        {modes.map((m) => (
          <button
            key={m.id}
            type="button"
            role="tab"
            aria-selected={m.id === cur.id}
            className={`guide-mode${m.id === cur.id ? " is-on" : ""}`}
            onClick={() => setSel(m.id)}
          >
            {m.icon && (
              <img
                src={m.icon}
                alt=""
                referrerPolicy="no-referrer"
                onError={hideOnError}
              />
            )}
            <span>{m.name.replace(/^modo de resonancia\s*:\s*/i, "")}</span>
          </button>
        ))}
      </div>
      <RichClamp
        key={cur.id}
        items={String(cur.desc).split("\n").filter(Boolean)}
        lines={8}
        paired
      />
    </div>
  );
}

function GuideTag({ tag }) {
  const id = useId();
  const popup = useRef(null);
  const trigger = useRef(null);
  const icon = tag.icon && (
    <img
      src={tag.icon}
      alt=""
      referrerPolicy="no-referrer"
      onError={hideOnError}
    />
  );
  function show() {
    if (popup.current.matches(":popover-open")) return;
    const rect = trigger.current.getBoundingClientRect();
    popup.current.showPopover();
    const { offsetWidth: width, offsetHeight: height } = popup.current;
    popup.current.style.left = `${Math.max(8, Math.min(rect.left, window.innerWidth - width - 8))}px`;
    popup.current.style.top = `${rect.bottom + height + 16 <= window.innerHeight ? rect.bottom + 8 : Math.max(8, rect.top - height - 8)}px`;
  }
  function hide() {
    if (popup.current?.matches(":popover-open")) popup.current.hidePopover();
  }
  useEffect(() => {
    window.addEventListener("scroll", hide, true);
    window.addEventListener("resize", hide);
    return () => {
      window.removeEventListener("scroll", hide, true);
      window.removeEventListener("resize", hide);
    };
  }, []);
  return (
    <li>
      {tag.desc ? (
        <>
          <button
            type="button"
            ref={trigger}
            className="guide-tag"
            aria-describedby={id}
            onFocus={show}
            onBlur={hide}
            onClick={show}
            onPointerEnter={(event) => {
              if (event.pointerType === "mouse") show();
            }}
            onPointerLeave={() => {
              if (document.activeElement !== trigger.current) hide();
            }}
          >
            {icon}
            <span>{tag.name}</span>
          </button>
          <div
            id={id}
            ref={popup}
            popover="auto"
            className="guide-tag-popup"
            role="tooltip"
          >
            <strong>
              {icon}
              {tag.name}
            </strong>
            <p>
              {parseRichText(tag.desc)
                .map((part) => part.text)
                .join("")}
            </p>
          </div>
        </>
      ) : (
        <span className="guide-tag">
          {icon}
          <span>{tag.name}</span>
        </span>
      )}
    </li>
  );
}

// Guía: tags, descripción y stats nv. 90, Forte (Basic Mechanics), habilidades y modos. Todo sale de la API del personaje.
function Guide({ characterId }) {
  const state = useLoad(getCharacterGuide, true, characterId);
  if (state.status === "loading") return <p className="app-msg">Cargando…</p>;
  if (state.status !== "ok")
    return <p className="app-msg">No se pudo cargar la guía del personaje.</p>;
  const { stats, skills, intro, tags, forte, modes } = state.data;
  const main = skills.filter(
    (s) => s.name && s.levels.some((l) => l.items.length > 0),
  );
  const introItems = String(intro ?? "")
    .split("\n")
    .filter((t) => t.trim());
  const forteItems = [...forte.general, ...forte.details];
  const hasForte = forteItems.length > 0 || forte.images.length > 0;
  return (
    <div className="guide">
      {tags.length > 0 && (
        <ul className="guide-tags">
          {tags.map((t) => (
            <GuideTag key={t.name} tag={t} />
          ))}
        </ul>
      )}
      {(introItems.length > 0 || stats.length > 0) && (
        <div className="guide-top">
          {introItems.length > 0 && (
            <div className="guide-card">
              <h4>Descripción</h4>
              <RichClamp items={introItems} lines={9} paired />
            </div>
          )}
          {stats.length > 0 && (
            <div className="guide-card guide-height-reference">
              <h4>Stats · Nv. 90</h4>
              <ul className="guide-stats">
                {stats.map((st) => {
                  const icon = statIcon(st.name, {}) || st.icon;
                  return (
                    <li key={st.name} className="guide-stat">
                      {icon && (
                        <img
                          src={icon}
                          alt=""
                          referrerPolicy="no-referrer"
                          onError={hideOnError}
                        />
                      )}
                      <span>{st.name}</span>
                      <b>{st.value}</b>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      )}
      {hasForte && (
        <div className="guide-card guide-wide">
          <h4>Forte · Mecánicas básicas</h4>
          {forteItems.length > 0 && (
            <RichClamp
              items={forteItems}
              lines={8}
              dividerAt={forte.general.length > 0 && forte.details.length > 0 ? forte.general.length : undefined}
            />
          )}
          {forte.images.length > 0 && (
            <div className="guide-forte-imgs">
              {forte.images.map((u) => (
                <img
                  key={u}
                  src={u}
                  alt=""
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  onError={hideOnError}
                />
              ))}
            </div>
          )}
        </div>
      )}
      {(main.length > 0 || modes.length > 1) && (
        <div className={`guide-top${modes.length > 1 ? "" : " is-single"}`}>
          {main.length > 0 && (
            <div className="guide-card guide-height-reference">
              <h4>Habilidades</h4>
              <ul className="guide-skills">
                {main.map((s) => (
                  <li key={s.name} className="guide-skill" title={s.name}>
                    <span className="guide-skill-icon">
                      {s.icon && (
                        <img
                          src={s.icon}
                          alt=""
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          decoding="async"
                          onError={hideOnError}
                        />
                      )}
                    </span>
                    <span>{s.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {modes.length > 1 && <Modes modes={modes} />}
        </div>
      )}
    </div>
  );
}

export default function BuildSections({
  tab,
  build,
  characters,
  characterId,
  personalWeaponId,
  elementIcons,
}) {
  const [selectedMode, setSelectedMode] = useState(0);
  const modeBuild = build
    ? { ...build, ...build.modosBuild?.[selectedMode] }
    : null;
  const ecos = modeBuild?.ecos;
  const hasEcos = Boolean(
    ecos && (ecos.sets?.length || ecos.stats?.length || ecos.ecoPrincipal || ecos.alternativas?.length || ecos.subestadisticas?.length || ecos.nota),
  );
  const echoData = useLoad(
    getEchoData,
    Boolean(
      modeBuild?.ecos?.sets?.length ||
      modeBuild?.ecos?.ecoPrincipal ||
      modeBuild?.ecos?.alternativas?.some(({ ecoPrincipal, sets }) => ecoPrincipal || sets?.length) ||
      [build, ...(build?.modosBuild ?? [])].some((mode) =>
        mode?.equipos?.some((team) => team.configuracion?.length || team.variantes?.length),
      ),
    ),
  );
  const weapons = useLoad(getWeapons, Boolean(modeBuild?.armas?.length));
  const modeBuilds = build?.modosBuild?.map((mode) => ({ ...build, ...mode })) ?? [];
  const modesDiffer = (field) => modeBuilds.length > 1 && modeBuilds.some(
    (mode) => JSON.stringify(mode?.[field] ?? null) !== JSON.stringify(modeBuilds[0]?.[field] ?? null),
  );
  const modeSelector = build?.modosBuild?.length > 1 && (
    <div className="guide-modes" role="group" aria-label="Modo de la build">
      {build.modosBuild.map(({ modo }, index) => (
        <button
          key={modo}
          type="button"
          className={`guide-mode${selectedMode === index ? " is-on" : ""}`}
          aria-pressed={selectedMode === index}
          onClick={() => setSelectedMode(index)}
        >
          {modo}
        </button>
      ))}
    </div>
  );

  return (
    <>
      {tab === "guia" && (
        <Section
          title="Guía"
          content={<Guide key={characterId} characterId={characterId} />}
        />
      )}
      {tab === "ecos" && (
        <Section
          title="Ecos"
          content={
            <>
              {modesDiffer("ecos") && modeSelector}
              {hasEcos ? (
              <Echoes
                ecos={ecos}
                echoData={echoData}
                elementIcons={elementIcons}
              />
            ) : (
              <EchoesEmpty />
              )}
            </>
          }
        />
      )}
      {tab === "armas" && (
        <Section
          title="Mejores armas"
          content={
            <>
              {modesDiffer("armas") && modeSelector}
              {modeBuild?.armas?.length ? (
              <Weapons
                key={characterId}
                armas={modeBuild.armas}
                armasPorModo={modeBuild.armasPorModo}
                weapons={weapons}
                personalWeaponId={personalWeaponId}
              />
            ) : (
              <WeaponsEmpty />
              )}
            </>
          }
        />
      )}
      {tab === "equipos" && (
        <Section
          title="Mejores equipos"
          content={
            <>
              {modesDiffer("equipos") && modeSelector}
              <Teams
                equipos={modeBuild?.equipos?.length ? modeBuild.equipos : EMPTY_TEAMS}
                characters={characters}
                characterId={characterId}
                sets={echoData.data?.sets}
              />
            </>
          }
        />
      )}
    </>
  );
}
