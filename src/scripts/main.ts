import { Glob, file, write } from 'bun'
import { join } from 'node:path'
import { XMLParser } from 'fast-xml-parser'

const cwd = process.env.CWF_PROJECT!

const glob = new Glob('Defs/**/*.xml')

const parser = new XMLParser({
  ignoreAttributes: true,
  isArray: (tag, path) =>
    tag === 'li' || (tag.endsWith('Def') && path === `Defs.${tag}`),
})

const defsByType: Record<string, unknown[]> = {}

for await (const path of glob.scan(cwd)) {
  const xml = await file(join(cwd, path)).text()
  const defs = normalize(parser.parse(xml).Defs) as Record<string, unknown[]>

  for (const [def, value] of Object.entries(defs)) {
    if (!Array.isArray(value)) {
      throw new Error(`${def} is not an array`)
    }

    const items = defsByType[def]

    if (items) {
      items.push(...value)
    } else {
      defsByType[def] = [...value]
    }
  }
}

const outputPath = join(import.meta.dir, '../../src/assets/defs.json')

await write(outputPath, JSON.stringify(defsByType, null, 2))
console.log('Done.')

// #regison Helper
function normalize(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(normalize)
  }

  if (typeof value !== 'object' || value === null) {
    return value
  }

  const entries = Object.entries(value)

  if (entries.length === 1 && entries[0][0] === 'li') {
    return normalize(entries[0][1])
  }

  return Object.fromEntries(
    entries.map(([key, item]) => [key, normalize(item)]),
  )
}
// #endregion
