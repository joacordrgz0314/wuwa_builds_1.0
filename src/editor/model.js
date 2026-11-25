import { isBuildInPreparation } from '../constants.js'

export const sections = ['ecos', 'armas', 'equipos']
export const maxWeapons = 5

export const secondaryCost4 = 'second4'

const identity = (member) => ({
  id: member.id,
  sets: member.sets ?? (member.setId ? [{ id: member.setId, piezas: 5 }] : []),
})

export function readTeam(team, characterId) {
  const members = team.configuracion?.length ? team.configuracion : team.miembros ?? []
  const pair = members.slice(0, 2)
  const firstSupport = members[2]
  const alternatives = (team.variantes ?? []).filter((variant) => variant.id !== firstSupport?.id)
  return {
    title: team.nombre ?? '',
    pivot: Math.max(0, members.findIndex(({ id }) => id === characterId)),
    pair: pair.map(identity),
    supports: [
      ...(firstSupport ? [{ ...identity(firstSupport) }] : []),
      ...alternatives.map((variant) => ({
        id: variant.id,
        sets: identity(variant.configuraciones?.[0]?.find((member) => member.id === variant.id) ?? variant).sets,
        variant,
      })),
    ],
    original: team,
  }
}

export function changeTeamRole(team, pivot) {
  if (team.pivot === pivot) return team
  const [main, ...alternatives] = team.supports
  const slots = [...team.pair, main ?? { id: null, sets: [] }]
  const previous = slots[team.pivot]
  slots[team.pivot] = slots[pivot]
  slots[pivot] = previous
  const support = slots[2]
  return {
    ...team,
    pivot,
    pair: slots.slice(0, 2).map(identity),
    supports: support.id || alternatives.length ? [support, ...alternatives] : [],
  }
}

export function draftFrom(build, characterId, { fresh = false } = {}) {
  const enPreparacion = isBuildInPreparation(build, characterId)
  if (fresh) build = {}
  const ecos = build.ecos ?? {}
  const stats = ecos.stats ?? []
  const costs = Object.fromEntries([4, secondaryCost4, 3, 1].flatMap((key) => {
    const cost = key === secondaryCost4 ? 4 : key
    const prefix = `Coste ${cost}:`
    const line = stats.filter((item) => item.startsWith(prefix))[key === secondaryCost4 ? 1 : 0]
    if (key === secondaryCost4 && !line) return []
    const text = line?.slice(prefix.length).trim()
    const note = text?.match(/\(([^)]*)\)\s*$/)?.[1] ?? ''
    const rows = text?.replace(/\s*\([^)]*\)\s*$/, '').split(/\s*\+\s*/).map((value) => {
      const match = value.match(/^(\d+)\s*[×x]\s*(.+)$/i)
      return { name: match?.[2] ?? value, quantity: Number(match?.[1] ?? 1) }
    }) ?? []
    return [[key, { rows, note }]]
  }))
  return {
    enPreparacion,
    ecos: {
      ...ecos,
      ...(ecos.subestadisticas && {
        subestadisticas: ecos.subestadisticas.map((stat) => {
          if (/ataque pesado|ataque cargado/i.test(stat.nombre)) {
            return { ...stat, nombre: stat.nombre.replace(/ataque pesado/i, 'ataque cargado'), iconKey: 'chargedAttack' }
          }
          if (/habilidad de resonancia/i.test(stat.nombre)) return { ...stat, iconKey: 'resonanceSkill' }
          return stat
        }),
      }),
    },
    costs,
    extraStats: stats.filter((line) => !/^Coste [431]:/.test(line)),
    armas: build.armas ?? [],
    equipos: (build.equipos ?? []).map((team) => readTeam(team, characterId)),
  }
}

export function teamTitle(team, names) {
  return team.title?.trim() || team.pair.map(({ id }) => names.get(id)).filter(Boolean).join(' + ')
}

function writeTeam(team, names) {
  const [main, ...alternatives] = team.supports
  const members = main ? [...team.pair, { id: main.id, sets: main.sets }] : team.pair
  return {
    nombre: teamTitle(team, names),
    miembros: members.map(({ id }, index) => ({ id, rol: ['DPS principal', 'Sub-DPS', 'Apoyo'][index] })),
    configuracion: members,
    variantes: alternatives.map(({ id, sets, variant }) => {
      const configurations = variant?.configuraciones?.length ? variant.configuraciones : [[]]
      return {
        id,
        rol: variant?.rol ?? 'Apoyo',
        configuraciones: configurations.map((config) => [
          ...team.pair.map((member, index) => {
            const original = team.original?.configuracion?.[index]
            const alternative = config.find((entry) => entry.id === member.id)
            return original?.id === member.id && alternative &&
              JSON.stringify(identity(original).sets) === JSON.stringify(member.sets)
              ? identity(alternative) : member
          }),
          { id, sets },
        ]),
      }
    }),
  }
}

export function toBuild(draft, people) {
  const stats = [4, secondaryCost4, 3, 1].flatMap((key) => {
    const entry = draft.costs[key]
    if (!entry?.rows.length) return []
    const { rows, note } = entry
    const cost = key === secondaryCost4 ? 4 : key
    const text = rows.map(({ name, quantity }) =>
      `${quantity > 1 ? quantity + ' × ' : ''}${name}`,
    ).join(' + ')
    return [`Coste ${cost}: ${text}${note.trim() ? ` (${note.trim()})` : ''}`]
  })
  const names = new Map(people.map(({ id, name }) => [id, name]))
  return {
    enPreparacion: draft.enPreparacion,
    ecos: { ...draft.ecos, stats: [...stats, ...draft.extraStats] },
    armas: draft.armas,
    equipos: draft.equipos.map((team) => writeTeam(team, names)),
  }
}

export function previewBuild(build) {
  const completeTeam = (team) => team.miembros.every(({ id }) => Number.isSafeInteger(id) && id > 0)
  return {
    ...build,
    ecos: {
      ...build.ecos,
      subestadisticas: (build.ecos.subestadisticas ?? []).filter(({ nombre }) => nombre?.trim()),
      alternativas: (build.ecos.alternativas ?? []).filter(({ ecoPrincipal, sets }) =>
        ecoPrincipal || sets?.some(({ id }) => id),
      ),
    },
    armas: build.armas.filter(({ id }) => id),
    equipos: build.equipos.filter(completeTeam).map((team) => ({
      ...team, variantes: team.variantes.filter(({ id }) => id),
    })),
  }
}

const validId = (value) => Number.isSafeInteger(value) && value > 0
const validSet = ({ id, piezas }) => validId(id) && Number.isInteger(piezas) && piezas >= 1 && piezas <= 5
const distinct = (items, field = 'id') => new Set(items.map((item) => item[field])).size === items.length
const validSets = (sets = []) => sets.every(validSet) && distinct(sets) && sets.reduce((sum, set) => sum + set.piezas, 0) <= 5
const validMembers = (members, min = 2) => Array.isArray(members) && members.length >= min && members.length <= 3 &&
  distinct(members) && members.every(({ id, sets }) => validId(id) && validSets(sets))

export function validateBuild(build, characterId) {
  const { ecos, armas, equipos, enPreparacion } = build
  if (enPreparacion !== undefined && typeof enPreparacion !== "boolean") return "El estado de la ficha no es válido."
  if (!ecos || !Array.isArray(armas) || !Array.isArray(equipos)) return 'La ficha no tiene un formato válido.'
  const combinations = [ecos, ...(ecos.alternativas ?? [])]
  if (combinations.some(({ ecoPrincipal, sets }) => (ecoPrincipal != null && !validId(ecoPrincipal)) || !validSets(sets))) {
    return 'Selecciona los sets de Ecos. Cada combinación admite hasta cinco piezas y cada set aparece una vez.'
  }
  const targets = ecos.subestadisticas ?? []
  if (!distinct(targets, 'nombre') || targets.some(({ nombre, valor }) => !nombre?.trim() || (valor != null && typeof valor !== 'string'))) {
    return 'Selecciona las subestadísticas y evita repetir una misma opción.'
  }
  if (armas.length > maxWeapons || !distinct(armas) || armas.some(({ id, refinamiento }) => !validId(id) || !/^R[1-5]$/.test(refinamiento))) {
    return 'Selecciona un arma distinta y su refinamiento en cada puesto.'
  }
  for (const team of equipos) {
    const members = team.configuracion
    const variants = team.variantes ?? []
    if (!validMembers(members) || !members.some(({ id }) => id === characterId)) {
      return 'Selecciona los dos integrantes del dúo y comprueba sus sets.'
    }
    const ids = [...members, ...variants]
    if (!distinct(ids) || variants.some(({ id, configuraciones }) =>
      !validId(id) || !configuraciones?.length || configuraciones.some((members) => !validMembers(members, 3)))) {
      return 'Selecciona apoyos distintos a los del dúo y comprueba sus sets.'
    }
  }
  return ''
}
