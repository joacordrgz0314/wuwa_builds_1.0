import { assetUrl, getCharacters, getEchoData, getWeapons, statIconUrl } from '../api.js'

const percent = [
  ['ATQ %', 'atq'], ['PS %', 'ps'], ['DEF %', 'def'],
]
const critical = [['Prob. CRIT', 'critProb'], ['Daño CRIT', 'critDmg']]
const energy = ['Regen. de energía', 'energia']
const elemental = ['Glacio', 'Fusión', 'Electro', 'Aero', 'Espectro', 'Destrucción']
  .map((name, index) => [`Daño ${name} %`, `bono${index + 1}`])

const toStats = (entries) => entries.map(([name, key]) => ({ id: name, name, icon: statIconUrl(key), key }))

export const mainStats = {
  4: toStats([...percent, ...critical, ['Bonificación de curación', 'cura']]),
  3: toStats([...percent, energy, ...elemental]),
  1: toStats(percent),
}

export const subStats = toStats([
  ...critical, energy, ...percent, ['ATQ', 'atq'], ['PS', 'ps'], ['DEF', 'def'],
  ['Bonificación de daño de ataque básico', 'basicAttack'],
  ['Bonificación de daño de ataque cargado', 'chargedAttack'],
  ['Bonificación de daño de Habilidad de resonancia', 'resonanceSkill'],
  ['Bonificación de liberación de resonancia', 'liberation'],
])

export async function loadCatalog() {
  const [characters, weapons, { sets, echoes }] = await Promise.all([getCharacters(), getWeapons(), getEchoData()])
  return {
    characters,
    people: characters.map(({ Id, Name, RoleHeadIcon }) => ({ id: Id, name: Name, icon: assetUrl(RoleHeadIcon) })),
    weapons: [...weapons.values()]
      .map(({ Id, Name, Icon, Type, QualityId }) => ({ id: Id, name: Name, icon: assetUrl(Icon), type: Type, rarity: QualityId }))
      .sort((a, b) => (b.rarity ?? 0) - (a.rarity ?? 0) || a.name.localeCompare(b.name, 'es')),
    sets: [...sets.values()].map(({ Id, Name, Icon }) => ({ id: Id, name: Name, icon: assetUrl(Icon) })),
    echoes: [...echoes].map(([id, { name, icon }]) => ({ id, name, icon: assetUrl(icon) })),
  }
}
