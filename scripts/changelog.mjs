#!/usr/bin/env node
/**
 * Prepends a changelog entry. Usage: npm run changelog -- "Your message"
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const changelogPath = join(__dirname, '..', 'CHANGELOG.md')
const message = process.argv.slice(2).join(' ').trim()

if (!message) {
  console.error('Usage: npm run changelog -- "Description of the change"')
  process.exit(1)
}

const date = new Date().toISOString().slice(0, 10)
const entry = `\n## ${date}\n\n- ${message}\n`
let content = readFileSync(changelogPath, 'utf8')

const marker = '\n---\n\n## '
const insertAt = content.indexOf(marker)
if (insertAt === -1) {
  content += entry
} else {
  content = content.slice(0, insertAt + 5) + entry + content.slice(insertAt + 5)
}

writeFileSync(changelogPath, content)
console.log(`CHANGELOG.md updated: ${message}`)
