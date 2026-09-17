import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const caseStudy = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../src/data/caseStudies/calilio.json'), 'utf8'),
)
const json = JSON.stringify(caseStudy).replace(/'/g, "''")

const sql = `-- Update Calilio case study (run in Supabase SQL Editor after schema + seed)
update public.projects
set
  description = 'Experience the future of Business Phone System with Calilio.',
  case_study = '${json}'::jsonb,
  updated_at = now()
where slug = 'calilio';
`

fs.writeFileSync(path.join(__dirname, '../supabase/update-calilio-case-study.sql'), sql)

const seedPath = path.join(__dirname, '../supabase/seed.sql')
let seed = fs.readFileSync(seedPath, 'utf8')

const calilioBlock = /(\s+\(\s*\n\s+'calilio',[\s\S]*?case_study\) values[\s\S]*?)(\s+\{\s*"overview"[\s\S]*?\}'::jsonb\s*\))/

// simpler: replace the calilio case_study json in seed
const calilioRegex =
  /('calilio',[\s\S]*?'Calilio unified callbox web interface',\s*\d+,\s*)'\{[^']*(?:''[^']*)*'\}'::jsonb/

if (calilioRegex.test(seed)) {
  seed = seed.replace(calilioRegex, `$1'${json}'::jsonb`)
  fs.writeFileSync(seedPath, seed)
  console.log('Updated supabase/seed.sql calilio case_study')
} else {
  console.warn('Could not patch seed.sql automatically — update calilio row manually.')
}

console.log('Wrote supabase/update-calilio-case-study.sql')
