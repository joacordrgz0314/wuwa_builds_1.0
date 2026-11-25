import { STAT_ICON_FILES } from "./constants";
import releaseGroups from "./data/character-releases.json";

// Único punto de contacto con la API de encore.moe. Si el formato cambia, se ajusta aquí.
const BASE = "https://api-v2.encore.moe/api";
const ORIGIN = "https://api-v2.encore.moe";
const LANG = "es";
const LILY_ID = 1512;
const releaseDates = new Map(
  Object.entries(releaseGroups).flatMap(([date, ids]) => ids.map((id, position) => [id, { date, position }])),
);

async function fetchJson(path, lang = LANG) {
  const res = await fetch(`${BASE}/${lang}${path}`);
  if (!res.ok)
    throw new Error(`La API respondió ${res.status} en ${lang}${path}`);
  return res.json();
}

// Las rutas de imagen del listado vienen sin dominio.
// Iconos de stat (carpeta IconAttribute), los mismos que traen las armas y las Properties del personaje.

export function statIconUrl(key) {
  const file = STAT_ICON_FILES[key];
  return file
    ? `${ORIGIN}/resource/Data/Game/Aki/UI/UIResources/Common/Image/IconAttribute/${file}.webp`
    : "";
}

export function assetUrl(path) {
  if (!path) return "";
  return path.startsWith("http")
    ? path
    : `${ORIGIN}${path.startsWith("/") ? "" : "/"}${path}`;
}

// El listado repite al Errante (una entrada por género); se deja una por nombre.
function uniqueByName(list) {
  const seen = new Set();
  return list.filter((c) => {
    if (seen.has(c.Name)) return false;
    seen.add(c.Name);
    return true;
  });
}

// Nombre en inglés -> texto para la URL del arte: minúsculas, solo letras y números.
function slug(name) {
  return String(name ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

// Caché en memoria de la sesión; el listado se pide en es (datos) y en en (nombre para derivar el arte).
let listPromise = null;
export function getCharacters() {
  if (!listPromise) {
    // Si falla el listado en inglés, las tarjetas caen al detalle (más lento, pero funciona).
    const english = fetchJson("/character", "en")
      .then((d) => d.roleList ?? [])
      .catch(() => []);
    listPromise = Promise.all([fetchJson("/character"), english])
      .then(([data, en]) => {
        const names = new Map(en.map((c) => [c.Id, c.Name]));
        const list = uniqueByName(data.roleList ?? []).map((c) => ({
          ...c,
          EnName: names.get(c.Id) ?? "",
        }));
        return list.sort((a, b) => {
          const first = releaseDates.get(a.Id);
          const second = releaseDates.get(b.Id);
          const byDate = (second?.date ?? "").localeCompare(first?.date ?? "");
          return byDate || (first && second ? first.position - second.position : a.Id - b.Id);
        });
      })
      .catch((err) => {
        listPromise = null;
        throw err;
      });
  }
  return listPromise;
}

// Caché mínima en localStorage (24 h): prefijo de las URLs de arte, iconos de elemento y arte de
// los pocos personajes cuya URL derivada no existe. Solo cadenas cortas; sin datasets.
const STORE_KEY = "wuwa-builds:cache";
const STORE_TTL = 24 * 60 * 60 * 1000;
let store = null;
let storeAt = Date.now();
let dirty = false;

function readStore() {
  if (store) return store;
  store = { base: "", elements: {}, art: {}, portrait: {}, items: {} };
  try {
    localStorage.removeItem("wuwa-builds:art"); // caché anterior, de otro formato
    const raw = JSON.parse(localStorage.getItem(STORE_KEY) ?? "null");
    if (raw && Date.now() - raw.t < STORE_TTL) {
      store = {
        base: raw.data?.base ?? "",
        elements: raw.data?.elements ?? {},
        art: raw.data?.art ?? {},
        portrait: raw.data?.portrait ?? {},
        items: raw.data?.items ?? {},
      };
      storeAt = raw.t;
    }
  } catch {
    // almacenamiento bloqueado o dañado: la app sigue sin caché
  }
  return store;
}

function writeStore() {
  if (!dirty) return;
  dirty = false;
  try {
    localStorage.setItem(
      STORE_KEY,
      JSON.stringify({ t: storeAt, data: store }),
    );
  } catch {
    // sin almacenamiento disponible
  }
}

// El detalle pesa mucho (~340 KB): se pide solo cuando hace falta y se recuerda en memoria.
const detailCache = new Map();
function getDetailInfo(id) {
  if (!detailCache.has(id)) {
    // Lily ya tiene sus recursos definitivos en Release. Beta conserva los de Ciaccona.
    const version = id === LILY_ID ? "" : "?v=Beta";
    const promise = fetchJson(`/character/${id}${version}`)
      .then((d) => ({
        art: d.FormationRoleCard || d.Skins?.[0]?.FormationRoleCard || "",
        // Cuerpo completo (2048×2032); en algunos personajes el archivo no existe
        portrait: d.RolePortrait || "",
        elementIcon: d.ElementIcon || "",
        // Solo Key y Value (el resto del detalle pesa mucho y no se usa en materiales).
        breaches: (d.Breaches ?? []).map((b) => ({
          level: b.BreachLevel,
          max: b.MaxLevel,
          items: (b.Items ?? []).map(({ Key, Value }) => ({ Key, Value })),
        })),
        skillTree: (d.SkillTree ?? []).map((n) => ({
          title: n.PropertyNodeTitle,
          desc: n.PropertyNodeDescribe,
          consume: (n.Consume ?? []).map(({ Key, Value }) => ({ Key, Value })),
        })),
        // Stats base para la Guía: GrowthValues = [{ growthId, level, value }] (minúscula); el último es el nv. 90.
        // BaseValue de CRIT viene sin escalar (500 = 5 %), por eso solo es respaldo.
        stats: (d.Properties ?? []).slice(0, 5).map((p) => {
          const last = Array.isArray(p.GrowthValues)
            ? p.GrowthValues.at(-1)
            : undefined;
          const v =
            last && typeof last === "object"
              ? (last.value ?? last.Value)
              : last;
          const icon = !p.Icon
            ? ""
            : p.Icon.startsWith("http")
              ? p.Icon
              : `${ORIGIN}/resource/Data${p.Icon.replace(/\.[^./]+$/, "")}.webp`;
          return { name: p.Name, icon, value: formatStat(v ?? p.BaseValue) };
        }),
        // Ficha ampliada: descripción, tags, Forte (Basic Mechanics) y modos de resonancia; todo opcional.
        intro: d.Introduction?.Content ?? "",
        tags: (d.Tags ?? [])
          .filter((t) => t?.TagName)
          .map((t) => ({
            name: t.TagName,
            desc: t.TagDesc ?? "",
            icon: t.TagIcon
              ? t.TagIcon.startsWith("http")
                ? t.TagIcon
                : `${ORIGIN}/resource/Data${t.TagIcon}`
              : "",
          })),
        forte: (() => {
          const f = d.SkillInputs?.[0];
          const texts = (list) =>
            (Array.isArray(list) ? list : [])
              .map((x) =>
                typeof x === "string" ? x : (x?.Desc ?? x?.Content ?? ""),
              )
              .filter(Boolean);
          return {
            general: texts(f?.SkillDescList),
            details: texts(f?.DescList),
            images: (Array.isArray(f?.IconList) ? f.IconList : [])
              .filter((url) => typeof url === "string" && url.trim())
              .map((url) =>
                id === 1312
                  ? url.replace(/\/T_RoleSkillTreeSuoming(?=[123]\.webp$)/, "/T_RoleSkillTreeSuoMing")
                  : url,
              ),
          };
        })(),
        modes: (d.SkillBranches ?? [])
          .filter((m) => m?.Name)
          .map((m) => ({
            id: m.Id,
            name: m.Name,
            icon: m.Icon ? assetUrl(m.Icon) : "",
            desc: m.Desc ?? "",
            isDefault: Boolean(m.IsDefault),
          })),
        // Subir habilidades: Skills[].Consumes = [{ SkillId: nivel, Consume[] }].
        skills: (d.Skills ?? []).map((s) => ({
          name: s.SkillName,
          icon: s.Icon ? assetUrl(s.Icon) : "",
          type: s.SkillType,
          levels: (s.Consumes ?? []).map((c) => ({
            level: c.SkillId,
            items: (c.Consume ?? []).map(({ Key, Value }) => ({ Key, Value })),
          })),
        })),
      }))
      .catch((err) => {
        detailCache.delete(id);
        throw err;
      });
    detailCache.set(id, promise);
  }
  return detailCache.get(id);
}

// Respaldo: arte real de un personaje cuya URL derivada no cargó; se recuerda en la caché.
export function getCharacterArt(id) {
  return getDetailInfo(id).then((info) => {
    if (info.art) {
      readStore().art[id] = info.art;
      dirty = true;
      writeStore();
    }
    return info;
  });
}

// Retrato de cuerpo completo (puede no existir); sale del mismo detalle, en caché.
// El API trae para el Errante Electro (1309) el retrato de otro personaje: se usa el del Errante
// Espectro (1501), que es el mismo modelo masculino.
const PORTRAIT_FROM = { 1309: 1501 };
export function getCharacterPortrait(id) {
  return getDetailInfo(PORTRAIT_FROM[id] ?? id).then((info) =>
    assetUrl(info.portrait),
  );
}

// Retratos de 13 personajes cuya ruta del API da 404: nombre de archivo verificado (ojo con las mayúsculas).
const PORTRAIT_DIR =
  "https://api-v2.encore.moe/resource/Data/Game/Aki/UI/UIResources/Common/Image/PixActivity/";
const PORTRAIT_FILES = {
  1312: "T_ActivityRoleSuoMing.webp",
  1212: "T_ActivityRoleJingRan.webp",
  1413: "T_ActivityRoleQingXiao.webp",
  1110: "T_ActivityRoleSuiSui.webp",
  1610: "T_ActivityRoleXuanLing.webp",
  1108: "T_ActivityRoleFeiXue.webp",
  1511: "T_ActivityRoleLuXi.webp",
  1308: "T_ActivityRoleLiBeiKa.webp",
  1109: "T_ActivityRoleLuoSeLa.webp",
  1211: "T_ActivityRoleDaNiYa.webp",
  1208: "T_ActivityRoleJiabeilina.webp",
  1410: "T_ActivityRoleyounuo.webp",
  1306: "T_ActivityRoleaogusita.webp",
};

// Retrato recordado (24 h, junto al resto de la caché): la URL, '-' si no hay retrato, undefined si no se sabe.
// Los 13 de la lista de arriba usan siempre su ruta verificada (ignora lo recordado antes).
export function knownPortrait(id) {
  if (id === LILY_ID) {
    const known = readStore().portrait[id];
    return known?.endsWith("/T_ActivityRoleLili.webp") ? known : undefined;
  }
  const file = PORTRAIT_FILES[id];
  return file ? PORTRAIT_DIR + file : readStore().portrait[id];
}

export function rememberPortrait(id, url) {
  readStore().portrait[id] = url || "-";
  dirty = true;
  writeStore();
}

// Ficha de la Guía: stats, habilidades, descripción, tags, Forte y modos (mismo detalle, en caché).
export function getCharacterGuide(id) {
  return getDetailInfo(id).then(
    ({ stats, skills, intro, tags, forte, modes }) => ({
      stats,
      skills,
      intro,
      tags,
      forte,
      modes,
    }),
  );
}

// Texto del API con etiquetas (<br>, <span>, <color=…>, <b>): devuelve segmentos { text, hl } sin etiquetas.
export function parseRichText(html) {
  if (!html) return [];
  const s = String(html).replace(/<br\s*\/?>/gi, "\n");
  const clean = (t) => t.replace(/<[^>]+>/g, "");
  const parts = [];
  let last = 0;
  for (const m of s.matchAll(/<(span|color|b)\b[^>]*>([\s\S]*?)<\/\1>/gi)) {
    if (m.index > last)
      parts.push({ text: clean(s.slice(last, m.index)), hl: false });
    parts.push({ text: clean(m[2]), hl: true });
    last = m.index + m[0].length;
  }
  if (last < s.length) parts.push({ text: clean(s.slice(last)), hl: false });
  return parts.filter((p) => p.text);
}

// Materiales de ascensión, nodos de talento y niveles de habilidad del personaje (salen del mismo detalle, en caché).
export function getCharacterMaterials(id) {
  return getDetailInfo(id).then(({ breaches, skillTree, skills }) => ({
    breaches,
    skillTree,
    skills,
  }));
}

// Detalle de arma: /weapon/{id}, una sola petición para materiales y stats (en caché de sesión).
// Breaches[{ Level, LevelLimit, GoldConsume, Items[] }]: las monedas van en GoldConsume (se devuelven como Key 2).
// Properties[0] = stat principal y Properties[1] = secundaria: { Name, Icon, GrowthValues[{ Level, Value }] }.
const weaponDetailCache = new Map();

// Valor al nivel máximo (último de GrowthValues): "587.50" -> "587", "24.30%" -> "24,3 %".
function formatStat(value) {
  const n = parseFloat(value);
  if (Number.isNaN(n)) return String(value ?? "");
  return String(value).includes("%")
    ? `${n.toLocaleString("es", { maximumFractionDigits: 1 })} %`
    : Math.round(n).toLocaleString("es");
}

// Desc trae HTML con grupos "a/b/c/d/e" para los refinamientos 1 a 5.
function parseWeaponDesc(html) {
  if (!html) return [];
  const clean = html.replace(/<br\s*\/?>/gi, "\n");
  const parts = [];
  let last = 0;
  for (const m of clean.matchAll(/<span[^>]*>([\s\S]*?)<\/span>/gi)) {
    const before = clean.slice(last, m.index).replace(/<[^>]+>/g, "");
    if (before) parts.push({ text: before, hl: false });
    const value = m[1].replace(/<[^>]+>/g, '')
    const values = value.split('/')
    parts.push({
      text: value,
      hl: true,
      ...(values.length === 5 ? { values } : {}),
    })
    last = m.index + m[0].length;
  }
  const rest = clean.slice(last).replace(/<[^>]+>/g, "");
  if (rest) parts.push({ text: rest, hl: false });
  return parts;
}

export function getWeaponDetail(id) {
  if (!weaponDetailCache.has(id)) {
    const promise = fetchJson(`/weapon/${id}`)
      .then((d) => ({
        passive: d.ResonName ?? "",
        desc: parseWeaponDesc(d.Desc),
        breaches: (d.Breaches ?? []).map((b) => {
          const items = (b.Items ?? []).map(({ Key, Value }) => ({
            Key,
            Value,
          }));
          if (b.GoldConsume > 0) items.push({ Key: 2, Value: b.GoldConsume });
          return { level: b.Level, max: b.LevelLimit, items };
        }),
        stats: (d.Properties ?? []).slice(0, 2).map((p) => {
          const last = (p.GrowthValues ?? []).at(-1);
          // Encore devuelve UiResources para algunos iconos de PS, pero la ruta distingue mayúsculas.
          const icon = p.Icon
            ? `${ORIGIN}/resource/Data${p.Icon.replace('/UiResources/', '/UIResources/').replace(/\.[^./]+$/, '')}.webp`
            : ''
          return {
            name: p.Name,
            icon,
            value: formatStat(last?.Value ?? p.BaseValue),
            level: last?.Level,
          };
        }),
      }))
      .catch((err) => {
        weaponDetailCache.delete(id);
        throw err;
      });
    weaponDetailCache.set(id, promise);
  }
  return weaponDetailCache.get(id);
}

export function getWeaponMaterials(id) {
  return getWeaponDetail(id).then((d) => d.breaches);
}

export function getWeaponStats(id) {
  return getWeaponDetail(id).then((d) => d.stats);
}

// Nombre e icono de cada material (/item/{id}); concurrencia limitada y caché en memoria.
const itemCache = new Map();

// Los nombres e iconos ya vistos se guardan en la caché de 24 h (se escribe una vez, con una pequeña espera).
let saveTimer = null;
function saveItem(id, item) {
  readStore().items[id] = item;
  dirty = true;
  if (saveTimer) return;
  saveTimer = setTimeout(() => {
    saveTimer = null;
    writeStore();
  }, 300);
}

function fetchItem(id) {
  return fetchJson(`/item/${id}`)
    .then((d) => {
      const item = {
        name: d.Name || `Material #${id}`,
        icon: d.Icon || "",
        quality: d.QualityId ?? 0,
      };
      if (d.Name) saveItem(id, item);
      return item;
    })
    .catch(() => {
      itemCache.delete(id);
      return { name: `Material #${id}`, icon: "" };
    });
}

export async function getItems(ids) {
  const saved = readStore().items;
  for (const id of ids) {
    // Los guardados sin rareza (versión anterior) se vuelven a pedir.
    if (!itemCache.has(id) && saved[id]?.quality !== undefined)
      itemCache.set(id, Promise.resolve(saved[id]));
  }
  const queue = [...new Set(ids)].filter((id) => !itemCache.has(id));
  const worker = async () => {
    while (queue.length) {
      const id = queue.shift();
      const promise = fetchItem(id);
      itemCache.set(id, promise);
      await promise;
    }
  };
  await Promise.all(Array.from({ length: Math.min(6, queue.length) }, worker));
  const pairs = await Promise.all(
    ids.map((id) =>
      (itemCache.get(id) ?? fetchItem(id)).then((it) => [id, it]),
    ),
  );
  return new Map(pairs);
}

// Armas y sets de ecos para las builds: se piden una vez por sesión, solo al abrir una página con
// build, y se indexan por Id.
let weaponsPromise = null;
export function getWeapons() {
  if (!weaponsPromise) {
    weaponsPromise = fetchJson("/weapon")
      .then((d) => new Map((d.weapons ?? []).map((w) => [w.Id, w])))
      .catch((err) => {
        weaponsPromise = null;
        throw err;
      });
  }
  return weaponsPromise;
}

// Los sets (FetterGroups) vienen dentro de cada eco; se juntan por Id del set. Los ecos se indexan por Id.
let echoPromise = null;
export function getEchoData() {
  if (!echoPromise) {
    echoPromise = fetchJson("/echo")
      .then((d) => {
        const sets = new Map();
        const echoes = new Map();
        for (const echo of d.Echo ?? []) {
          echoes.set(echo.Id, {
            name: echo.Name,
            icon: echo.Icon || echo.IconMiddle || "",
          });
          for (const g of echo.FetterGroups ?? []) {
            if (!sets.has(g.Id)) sets.set(g.Id, g);
          }
        }
        return { sets, echoes };
      })
      .catch((err) => {
        echoPromise = null;
        throw err;
      });
  }
  return echoPromise;
}

// Prefijo de las URLs de arte (carpeta), sacado de un arte real: .../IconRolePile/
function baseFrom(art) {
  return /\/T_IconRole_Pile_[^/]+_UI\.webp$/i.test(art)
    ? art.slice(0, art.lastIndexOf("/") + 1)
    : "";
}

// URL del arte: la real si ya se conoce; si no, la derivada del nombre en inglés ('' si no se puede).
export function artUrl(character, base) {
  const known = readStore().art[character.Id];
  if (character.Id === LILY_ID) return known?.endsWith("/T_IconRole_Pile_Lili_UI.webp") ? known : "";
  if (known) return known;
  const name = slug(character.EnName);
  return base && name ? `${base}T_IconRole_Pile_${name}_UI.webp` : "";
}

// El icono de arma sale del listado (coincide con el del detalle).
export function weaponIconUrl(character) {
  const icon = character.WeaponType?.Icon;
  if (!icon) return "";
  return `${ORIGIN}/resource/Data${icon.startsWith("/") ? "" : "/"}${icon}.webp`;
}

// Pide el detalle de un personaje por elemento (en paralelo) para sacar los iconos de elemento y el
// prefijo del arte. Resuelve con el prefijo en cuanto se conoce (o '' si no se pudo).
export function bootstrap(list, onElementIcon) {
  const cache = readStore();
  const firsts = new Map();
  list.forEach((c) => {
    if (c.Element?.Id != null && !firsts.has(c.Element.Id))
      firsts.set(c.Element.Id, c.Id);
  });
  let settle;
  const baseReady = cache.base
    ? Promise.resolve(cache.base)
    : new Promise((resolve) => {
        settle = resolve;
      });
  const jobs = [];
  firsts.forEach((id, elementId) => {
    if (cache.elements[elementId]) {
      onElementIcon(elementId, cache.elements[elementId]);
      return;
    }
    jobs.push(
      getDetailInfo(id)
        .then((info) => {
          if (info.elementIcon) {
            cache.elements[elementId] = info.elementIcon;
            dirty = true;
            onElementIcon(elementId, info.elementIcon);
          }
          const base = cache.base || baseFrom(info.art);
          if (base && !cache.base) {
            cache.base = base;
            dirty = true;
          }
          if (base) settle?.(base);
        })
        .catch(() => {}),
    );
  });
  Promise.all(jobs).then(() => {
    settle?.(cache.base);
    writeStore();
  });
  return baseReady;
}

function preloadImage(url) {
  if (!url) return Promise.resolve();
  return new Promise((resolve) => {
    const img = new Image();
    img.referrerPolicy = "no-referrer";
    img.onload = resolve;
    img.onerror = resolve;
    setTimeout(resolve, 10000);
    img.src = url;
  });
}

// Precarga arte e icono de arma de los primeros personajes (los visibles al abrir).
export function preloadFirst(list, base) {
  const urls = new Set();
  list.forEach((c) => {
    urls.add(artUrl(c, base));
    urls.add(weaponIconUrl(c));
  });
  return Promise.all([...urls].map(preloadImage));
}

// Nombre del pasivo y descripción del efecto en refinamiento 1.
export function getWeaponDesc(id) {
  return getWeaponDetail(id).then((d) => ({
    passive: d.passive,
    desc: d.desc.map(({ text, hl }) => ({ text: hl ? text.split('/')[0] : text, hl })),
  }));
}
