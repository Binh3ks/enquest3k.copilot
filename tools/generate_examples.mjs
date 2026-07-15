#!/usr/bin/env node
/**
 * Generate example sentences for all dictionary words using AI
 * Batches by week level to ensure appropriate complexity
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OPENAI_API_KEY = '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';
const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';

const DICT_PATH = path.join(__dirname, '../src/data/dictionary.json');

// Complexity levels by week
const COMPLEXITY_LEVELS = {
  beginner: { weeks: [1, 2, 3, 4, 5], description: 'Pre-A1, simple present, I/you/we, 4-6 words' },
  elementary: { weeks: [6, 7, 8, 9, 10, 11, 12, 13, 14], description: 'A1, present continuous, he/she/it, 5-8 words' },
  intermediate: { weeks: Array.from({length: 50}, (_, i) => i + 15), description: 'A1+, multiple tenses, 6-10 words' },
};

async function generateExamplesWithAI(words, level) {
  const prompt = `Generate natural, simple English example sentences for beginner ESL students.

Level: ${COMPLEXITY_LEVELS[level].description}

Rules:
- Use simple vocabulary appropriate for the week level
- Natural, everyday usage (not textbook definitions)
- One clear example per word
- Format: word|example sentence

Words to generate examples for:
${words.map(w => `${w.word} (${w.meaning})`).join('\n')}

Output format (one per line):
WORD|Example sentence here.

Generate now:`;

  try {
    const response = await fetch(OPENAI_URL, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{
          role: 'user',
          content: prompt
        }],
        temperature: 0.7,
        max_tokens: 2048,
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`OpenAI API error: ${response.status} - ${error}`);
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || '';
    
    // Parse response
    const examples = {};
    const lines = text.split('\n').filter(line => line.includes('|'));
    
    for (const line of lines) {
      const [word, example] = line.split('|').map(s => s.trim());
      if (word && example) {
        examples[word.toUpperCase()] = example;
      }
    }
    
    return examples;
  } catch (error) {
    console.error(`❌ API Error: ${error.message}`);
    return {};
  }
}

async function main() {
  console.log('🤖 AI Example Generator Starting...\n');

  // Load dictionary
  const dictData = await fs.readFile(DICT_PATH, 'utf-8');
  const dictionary = JSON.parse(dictData);

  // Find words without examples
  const wordsNeedingExamples = dictionary.filter(entry => !entry.example);
  
  console.log(`📚 Total dictionary entries: ${dictionary.length}`);
  console.log(`📝 Words with examples: ${dictionary.length - wordsNeedingExamples.length}`);
  console.log(`🎯 Words needing examples: ${wordsNeedingExamples.length}\n`);

  if (wordsNeedingExamples.length === 0) {
    console.log('✅ All words already have examples!');
    return;
  }

  // Group by complexity level
  const grouped = {
    beginner: [],
    elementary: [],
    intermediate: [],
    unknown: []
  };

  for (const entry of wordsNeedingExamples) {
    const week = entry.first_taught_week;
    if (!week) {
      grouped.unknown.push(entry);
    } else if (week <= 5) {
      grouped.beginner.push(entry);
    } else if (week <= 14) {
      grouped.elementary.push(entry);
    } else {
      grouped.intermediate.push(entry);
    }
  }

  console.log('📊 Grouped by level:');
  console.log(`   Beginner (W1-5):      ${grouped.beginner.length} words`);
  console.log(`   Elementary (W6-14):   ${grouped.elementary.length} words`);
  console.log(`   Intermediate (W15+):  ${grouped.intermediate.length} words`);
  console.log(`   Unknown week:         ${grouped.unknown.length} words\n`);

  // Process in batches - prioritize beginner and elementary (W1-14)
  const BATCH_SIZE = 20;
  let totalGenerated = 0;

  // Only process beginner and elementary for now (to save API costs)
  const levelsToProcess = ['beginner', 'elementary'];

  for (const [level, words] of Object.entries(grouped)) {
    if (words.length === 0 || level === 'unknown') continue;
    if (!levelsToProcess.includes(level)) {
      console.log(`\n⏭️  Skipping ${level} words (${words.length} total) - use definition_en as fallback`);
      continue;
    }

    console.log(`\n🎯 Processing ${level} words (${words.length} total)...`);
    
    for (let i = 0; i < words.length; i += BATCH_SIZE) {
      const batch = words.slice(i, i + BATCH_SIZE);
      
      process.stdout.write(`   Batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(words.length / BATCH_SIZE)}: Generating ${batch.length} examples...`);
      
      const examples = await generateExamplesWithAI(batch, level);
      
      // Update dictionary
      let updated = 0;
      for (const entry of batch) {
        const example = examples[entry.word];
        if (example) {
          entry.example = example;
          updated++;
          totalGenerated++;
        }
      }
      
      console.log(` ✅ ${updated}/${batch.length} generated`);
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  // Skip unknown week words (too many, will use definition_en as fallback in UI)
  if (grouped.unknown.length > 0) {
    console.log(`\n⏭️  Skipping ${grouped.unknown.length} unknown-week words - use definition_en as fallback`);
  }

  // Save updated dictionary
  await fs.writeFile(
    DICT_PATH,
    JSON.stringify(dictionary, null, 2),
    'utf-8'
  );

  const newSize = (await fs.stat(DICT_PATH)).size / 1024;

  console.log(`\n✅ Dictionary updated!`);
  console.log(`   📈 Generated: ${totalGenerated} examples`);
  console.log(`   💾 File size: ${newSize.toFixed(1)}KB`);
  console.log(`   📁 Saved to: ${DICT_PATH}`);
  
  // Show samples
  console.log(`\n📖 Sample examples:`);
  const samples = dictionary.filter(e => e.example).slice(0, 10);
  for (const entry of samples) {
    console.log(`   ${entry.word.padEnd(15)} | "${entry.example}"`);
  }
}

main().catch(console.error);
