import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const caseStudyDir = path.join(root, 'src/data/caseStudies')
const slugs = ['drop', 'tradieshome', 'leadhead', 'calilio']

const updates = slugs.map((slug) => {
  const caseStudy = JSON.parse(fs.readFileSync(path.join(caseStudyDir, `${slug}.json`), 'utf8'))
  const json = JSON.stringify(caseStudy).replace(/'/g, "''")
  return { slug, json, caseStudy }
})

let seed = fs.readFileSync(path.join(root, 'supabase/seed.sql'), 'utf8')

for (const { slug, json } of updates) {
  const pattern = new RegExp(`('${slug}',[\\s\\S]*?,\\s*\\d+,\\s*)'(?:\\{[\\s\\S]*?\\})'::jsonb`)
  if (!pattern.test(seed)) {
    console.warn(`Could not patch seed.sql for ${slug}`)
    continue
  }
  seed = seed.replace(pattern, `$1'${json}'::jsonb`)
}

fs.writeFileSync(path.join(root, 'supabase/seed.sql'), seed)

const sql = `-- Update all project case studies (run in Supabase SQL Editor)
${updates
  .map(
    ({ slug, json }) => `update public.projects
set case_study = '${json}'::jsonb, updated_at = now()
where slug = '${slug}';`,
  )
  .join('\n\n')}
`

fs.writeFileSync(path.join(root, 'supabase/update-all-case-studies.sql'), sql)
console.log('Updated supabase/seed.sql and supabase/update-all-case-studies.sql')
