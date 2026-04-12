#!/usr/bin/env node
/**
 * fix_bad_examples.mjs
 * Replaces low-quality auto-generated examples with proper ESL sentences.
 * Bad patterns: "X is very important to us", "These X are interesting to study"
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DICT_PATH = resolve(__dirname, '../src/data/dictionary.json');

const GEMINI_API_KEY = 'AIzaSyBe8oZZS0FkyCB-8KcKLUWxm-t7ALtZoKg';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

function isBadExample(ex) {
  if (!ex) return true;
  return /interesting to study/i.test(ex) ||
         /important to us/i.test(ex) ||
         /important to me/i.test(ex) ||
         /good to know/i.test(ex);
}

async function generateBatch(words) {
  const prompt = `You are an expert ESL curriculum designer for children aged 6-12.

Generate ONE example sentence per word. Rules:
- Sentence must SHOW the word's meaning in context (not just "X is important")
- Short (5-10 words), natural, spoken English
- Relevant to real kids' lives: school, home, family, nature, sports, food
- Use simple grammar matching the word's week level
- For nouns: show the object being used/seen/heard
- For verbs: show the action happening naturally  
- For adjectives: describe something kids know
- For abstract/academic words: use a simple school context
- NO filler phrases like "interesting to study", "important to us", "good to know"

Words (format: word — Vietnamese meaning — week level):
${words.map(w => `${w.word} — ${w.meaning} — week ${w.week || '?'}`).join('\n')}

Reply ONLY with lines in this exact format:
WORD|Example sentence.

Generate now:`;

  const resp = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.8,
      max_tokens: 2048,
    }),
  });

  if (!resp.ok) {
    const err = await resp.text();
    throw new Error(`OpenAI error ${resp.status}: ${err}`);
  }

  const data = await resp.json();
  const text = data.choices?.[0]?.message?.content || '';
  const map = {};
  for (const line of text.split('\n')) {
    const idx = line.indexOf('|');
    if (idx === -1) continue;
    const word = line.slice(0, idx).trim().toLowerCase();
    const ex = line.slice(idx + 1).trim();
    if (word && ex) map[word] = ex;
  }
  return map;
}

const dictionary = JSON.parse(readFileSync(DICT_PATH, 'utf-8'));

const toFix = dictionary.filter(e => isBadExample(e.example));
console.log(`Found ${toFix.length} bad examples to fix.\n`);

// Process in batches of 30
const BATCH = 30;
let fixed = 0;

for (let i = 0; i < toFix.length; i += BATCH) {
  const batch = toFix.slice(i, i + BATCH);
  const batchNum = Math.floor(i / BATCH) + 1;
  const totalBatches = Math.ceil(toFix.length / BATCH);
  process.stdout.write(`Batch ${batchNum}/${totalBatches} (${batch.map(e=>e.word).join(', ').slice(0,60)}...)  `);

  try {
    const result = await generateBatch(batch.map(e => ({
      word: e.word,
      meaning: e.meaning,
      week: e.first_taught_week,
    })));

    for (const entry of batch) {
      const key = entry.word.toLowerCase();
      if (result[key]) {
        entry.example = result[key];
        fixed++;
      } else {
        // Try without possessive/hyphen/special chars
        const clean = key.replace(/['\u2019\-]/g, '');
        if (result[clean]) { entry.example = result[clean]; fixed++; }
        else console.log(`\n  ⚠ No result for "${entry.word}"`);
      }
    }
    console.log(`✓`);
  } catch (e) {
    console.log(`\n  ❌ Error: ${e.message}`);
  }

  // Small delay to avoid rate limit
  if (i + BATCH < toFix.length) await new Promise(r => setTimeout(r, 800));
}

writeFileSync(DICT_PATH, JSON.stringify(dictionary, null, 2), 'utf-8');
console.log(`\n✅ Fixed: ${fixed}/${toFix.length}`);
const still = dictionary.filter(e => isBadExample(e.example));
console.log(`Still bad: ${still.length}`);
if (still.length) still.forEach(e => console.log(`  - ${e.word}: ${e.example}`));
