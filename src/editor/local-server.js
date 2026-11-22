import { createHash, randomUUID } from 'node:crypto'
import { readFile, rename, rm, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { sections, validateBuild } from './model.js'

const dataPath = fileURLToPath(new URL('../data/builds.json', import.meta.url))
const localHosts = new Set(['localhost', '127.0.0.1', '[::1]'])
const endpoint = '/__build-editor/data'
const maxBytes = 512 * 1024
const revision = (value) => value ? createHash('sha256').update(JSON.stringify(value)).digest('hex') : null

const snapshot = (builds) => ({
  builds,
  revisions: Object.fromEntries(Object.entries(builds).map(([id, build]) => [id, revision(build)])),
})

function respond(response, status, body) {
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  })
  response.end(JSON.stringify(body))
}

function isLocal(request) {
  try {
    const host = new URL(`http://${request.headers.host}`)
    if (!localHosts.has(host.hostname)) return false
    const origin = request.headers.origin
    if (!origin) return request.method === 'GET'
    return new URL(origin).host === host.host && /^https?:\/\//.test(origin)
  } catch {
    return false
  }
}

async function readBody(request) {
  const chunks = []
  let size = 0
  for await (const chunk of request) {
    size += chunk.length
    if (size > maxBytes) return null
    chunks.push(chunk)
  }
  return JSON.parse(Buffer.concat(chunks).toString('utf8'))
}

async function saveData(builds) {
  const temporary = `${dataPath}.${randomUUID()}.tmp`
  try {
    await writeFile(temporary, JSON.stringify(builds, null, 2) + '\n', { encoding: 'utf8', flag: 'wx' })
    await rename(temporary, dataPath)
  } finally {
    await rm(temporary, { force: true })
  }
}

export default function localBuildEditor() {
  let writing = Promise.resolve()
  return {
    name: 'wuwa-local-build-editor',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        const path = request.url?.split('?')[0]
        if (path !== endpoint && path !== '/editor.html') return next()
        if (!isLocal(request)) return respond(response, 403, { error: 'Abre el editor en localhost.' })
        if (path === '/editor.html') return next()
        try {
          if (request.method === 'GET') {
            const builds = JSON.parse(await readFile(dataPath, 'utf8'))
            return respond(response, 200, snapshot(builds))
          }
          if (request.method !== 'PUT') return respond(response, 405, { error: 'Método no admitido.' })
          if (!request.headers['content-type']?.startsWith('application/json')) {
            return respond(response, 415, { error: 'Se esperaba una ficha en formato JSON.' })
          }
          let payload
          try {
            payload = await readBody(request)
            if (!payload || !Number.isSafeInteger(payload.characterId) || payload.characterId <= 0 ||
              typeof payload.fresh !== 'boolean' || (payload.revision !== null && typeof payload.revision !== 'string')) {
              throw new Error('Formato inválido')
            }
            const error = validateBuild(payload.build, payload.characterId)
            if (error) return respond(response, 400, { error })
          } catch {
            return respond(response, 400, { error: 'La ficha enviada no tiene un formato válido.' })
          }
          const save = async () => {
            const { characterId, build, fresh } = payload
            const builds = JSON.parse(await readFile(dataPath, 'utf8'))
            const previous = builds[characterId]
            if (revision(previous) !== payload.revision) {
              return respond(response, 409, { error: 'Esta ficha cambió en el archivo. Recarga el editor antes de volver a guardar.' })
            }
            const updated = { ...previous }
            if (fresh) {
              delete updated.modosBuild
              delete updated.armasPorModo
            }
            for (const section of sections) updated[section] = build[section]
            if (typeof build.enPreparacion === 'boolean') updated.enPreparacion = build.enPreparacion
            builds[characterId] = updated
            await saveData(builds)
            return respond(response, 200, snapshot(builds))
          }
          const pending = writing.then(save)
          writing = pending.catch(() => {})
          await pending
        } catch (error) {
          server.config.logger.error(error.message)
          if (!response.headersSent) respond(response, 500, { error: 'No se pudo leer o guardar el archivo de fichas.' })
        }
      })
    },
  }
}
