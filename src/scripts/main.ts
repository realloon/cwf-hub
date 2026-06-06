import { env, Glob, file } from 'bun'
import { join } from 'node:path'
import { XMLParser } from 'fast-xml-parser'

const cwd = env.CWF_PROJECT!

const glob = new Glob('Defs/**/*.xml')

const defs: Record<string, unknown[]>[] = []

const paser = new XMLParser({
  ignoreAttributes: true,
  isArray: tag => tag === 'li' || tag.endsWith('Def'),
})

for await (const path of glob.scan(cwd)) {
  const xml = await file(join(cwd, path)).text()
  defs.push(paser.parse(xml).Defs)
}

const defsByType: Record<string, unknown[]> = {}

for (const defsItem of defs) {
  for (const [def, value] of Object.entries(defsItem)) {
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

await Bun.write(outputPath, JSON.stringify(defsByType, null, 2))
console.log('Done.')
