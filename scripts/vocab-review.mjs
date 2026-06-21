// Generates a native-Hindi review sheet from the curriculum data.
//   node scripts/vocab-review.mjs
// Writes curriculum/vocab-review.csv (open in Excel/Numbers) for a Hindi
// educator to sign off — every word, with gender-sensitive items flagged.

import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { LEVELS, CORE } from '../src/data/curriculum.js'

const here = dirname(fileURLToPath(import.meta.url))
const out = join(here, '..', 'curriculum', 'vocab-review.csv')

// Adjectives ending in ा (-aa) inflect for gender (बड़ा→बड़ी); flag for review.
const genderSensitive = (b) => b.type === 'adjective' && /ा$/.test(b.target_script)

const rows = [
  ['Level', 'Unit', 'Type', 'English', 'Devanagari', 'Transliteration', 'Gender-sensitive?', 'OK? (Y/N)', 'Correction'],
]

for (const lvl of LEVELS) {
  for (const u of lvl.units) {
    for (const b of u.blocks) {
      rows.push([
        lvl.title,
        `${u.title} (${u.hindi})`,
        b.type,
        b.english_meaning,
        b.target_script,
        b.target_transliteration,
        genderSensitive(b) ? 'YES — check बड़ा/बड़ी form' : '',
        '',
        '',
      ])
    }
  }
}
for (const b of CORE) {
  rows.push(['(shared)', 'Core function words', b.type, b.english_meaning, b.target_script, b.target_transliteration, '', '', ''])
}

const esc = (s) => (/[",\n]/.test(s) ? `"${String(s).replace(/"/g, '""')}"` : String(s))
const csv = rows.map((r) => r.map(esc).join(',')).join('\n')
writeFileSync(out, '﻿' + csv, 'utf8') // BOM so Excel reads Devanagari/UTF-8

const total = rows.length - 1
const flagged = rows.filter((r) => r[6]).length
console.log(`Wrote ${out}\n${total} words, ${flagged} flagged gender-sensitive.`)
