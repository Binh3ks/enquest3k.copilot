#!/usr/bin/env node
/**
 * Complete example generator - uses smart rules to generate examples for ALL words
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DICT_PATH = path.join(__dirname, '../src/data/dictionary.json');

/**
 * Smart example generator based on word properties and patterns
 */
function generateSmartExample(entry) {
  const { word, meaning, first_taught_week, definition_en } = entry;
  const w = word.toLowerCase();
  const week = first_taught_week || 10;
  
  // Skip if already has good example
  if (entry.example && !entry.example.includes('is important to me')) {
    return entry.example;
  }
  
  // No meaning and no definition = skip
  if (!meaning && !definition_en) {
    return null;
  }

  // VERB PATTERNS - detect from definition
  const isVerb = definition_en && (
    definition_en.match(/^To /) ||
    definition_en.match(/verb/i) ||
    ['do', 'make', 'go', 'come', 'take', 'give', 'get', 'see', 'know', 'think', 'want', 'use', 'find', 'work', 'call', 'try', 'ask', 'need', 'feel', 'become', 'leave', 'put', 'mean', 'keep', 'let', 'begin', 'seem', 'help', 'show', 'hear', 'play', 'run', 'move', 'live', 'believe', 'bring', 'happen', 'write', 'sit', 'stand', 'lose', 'pay', 'meet', 'include', 'continue', 'set', 'learn', 'change', 'lead', 'understand', 'watch', 'follow', 'stop', 'create', 'speak', 'read', 'spend', 'grow', 'open', 'walk', 'win', 'teach', 'offer', 'remember', 'consider', 'appear', 'buy', 'wait', 'serve', 'die', 'send', 'build', 'stay', 'fall', 'cut', 'reach', 'kill', 'raise', 'pass', 'sell', 'decide', 'return', 'explain', 'hope', 'develop', 'carry', 'break', 'receive', 'agree', 'support', 'hit', 'produce', 'eat', 'cover', 'catch', 'draw', 'choose', 'study', 'prepare', 'wear'].includes(w)
  );

  const isNoun = definition_en && (
    definition_en.match(/^A /) ||
    definition_en.match(/^An /) ||
    definition_en.match(/^The /) ||
    definition_en.match(/noun/i) ||
    ['person', 'people', 'time', 'year', 'day', 'thing', 'man', 'world', 'life', 'hand', 'part', 'child', 'eye', 'woman', 'place', 'work', 'week', 'case', 'point', 'government', 'company', 'number', 'group', 'problem', 'fact', 'idea', 'water', 'room', 'money', 'story', 'book', 'home', 'school', 'family', 'student', 'teacher', 'friend', 'door', 'house', 'mother', 'father', 'head', 'name', 'car', 'city', 'country', 'food', 'table', 'boy', 'girl', 'body', 'face', 'air', 'line', 'area', 'question', 'answer', 'street', 'study', 'hour', 'night', 'word', 'month', 'moment', 'program', 'community', 'development', 'education', 'national', 'power'].includes(w)
  );

  const isAdjective = definition_en && (
    definition_en.match(/adjective/i) ||
    ['good', 'new', 'first', 'last', 'long', 'great', 'little', 'own', 'other', 'old', 'right', 'big', 'high', 'different', 'small', 'large', 'next', 'early', 'young', 'important', 'few', 'public', 'bad', 'same', 'able', 'happy', 'sad', 'angry', 'beautiful', 'strong', 'weak', 'fast', 'slow', 'hot', 'cold', 'warm', 'cool', 'easy', 'difficult', 'hard', 'soft', 'loud', 'quiet', 'clean', 'dirty', 'full', 'empty', 'heavy', 'light', 'dark', 'bright', 'cheap', 'expensive', 'rich', 'poor', 'kind', 'mean', 'brave', 'afraid', 'careful', 'careless', 'comfortable', 'useful', 'helpful', 'wonderful', 'terrible', 'amazing', 'boring', 'interesting', 'exciting', 'nervous', 'tired', 'hungry', 'thirsty', 'sick', 'healthy', 'dangerous', 'safe', 'polite', 'rude', 'honest', 'fair', 'unfair', 'friendly', 'lucky', 'unlucky', 'strange', 'normal', 'special', 'general', 'particular', 'certain', 'sure', 'clear', 'simple', 'complex', 'true', 'false'].includes(w)
  );

  // BEGINNER LEVEL (W1-5)
  if (week <= 5) {
    if (isVerb) {
      return `I ${w} every day.`;
    }
    if (isNoun) {
      return `I have a ${w}.`;
    }
    if (isAdjective) {
      return `This is very ${w}.`;
    }
    // Default for beginner
    return `I like this ${w}.`;
  }

  // ELEMENTARY (W6-14)
  if (week <= 14) {
    if (isVerb) {
      return `She ${w}s at school every day.`;
    }
    if (isNoun) {
      return `The ${w} is very important to us.`;
    }
    if (isAdjective) {
      return `My friend is very ${w} and kind.`;
    }
    // Default for elementary
    return `This ${w} helps me every day.`;
  }

  // INTERMEDIATE (W15+)
  if (isVerb) {
    return `We have been ${w}ing for many years now.`;
  }
  if (isNoun) {
    return `The ${w} has become increasingly important in modern society.`;
  }
  if (isAdjective) {
    return `It was a very ${w} experience for everyone.`;
  }

  // NO WEEK INFO - Use smart generic patterns
  if (isVerb) {
    return `I ${w} when I have time.`;
  }
  if (isNoun) {
    return `The ${w} is something we should know.`;
  }
  if (isAdjective) {
    return `It looks very ${w} to me.`;
  }

  // Ultimate fallback - use meaning if available
  if (meaning) {
    return `I know about ${w} now.`;
  }
  if (definition_en) {
    return `This ${w} is useful.`;
  }

  return null;
}

async function main() {
  console.log('🤖 Smart Example Generator - Completing ALL words...\n');

  // Load dictionary
  const dictData = await fs.readFile(DICT_PATH, 'utf-8');
  const dictionary = JSON.parse(dictData);

  let updated = 0;
  let already = 0;

  for (const entry of dictionary) {
    const currentExample = entry.example;
    
    // Skip if good example
    if (currentExample && !currentExample.includes('is important to me') && !currentExample.includes('helps me every day')) {
      already++;
      continue;
    }

    // Skip entries with no meaning AND no definition
    if (!entry.meaning && !entry.definition_en) {
      continue;
    }

    const newExample = generateSmartExample(entry);
    if (newExample && newExample !== currentExample) {
      entry.example = newExample;
      updated++;
      
      if (updated % 100 === 0) {
        console.log(`✅ Generated ${updated} examples...`);
      }
    }
  }

  // Save
  await fs.writeFile(
    DICT_PATH,
    JSON.stringify(dictionary, null, 2),
    'utf-8'
  );

  const newSize = (await fs.stat(DICT_PATH)).size / 1024;

  console.log(`\n✅ Dictionary completed!`);
  console.log(`   📈 Generated: ${updated} new examples`);
  console.log(`   ✓  Already good: ${already} examples`);
  console.log(`   💾 File size: ${newSize.toFixed(1)}KB`);
  console.log(`   📁 Saved to: ${DICT_PATH}`);
  
  // Stats
  const withExamples = dictionary.filter(e => e.example).length;
  console.log(`\n📊 Coverage: ${withExamples}/${dictionary.length} words (${(withExamples/dictionary.length*100).toFixed(1)}%)`);
  
  // Show samples
  console.log(`\n📖 Sample examples by level:`);
  const beginner = dictionary.find(e => e.example && e.first_taught_week <= 5 && !['a', 'am', 'is'].includes(e.word.toLowerCase()));
  const elementary = dictionary.find(e => e.example && e.first_taught_week > 5 && e.first_taught_week <= 14);
  const intermediate = dictionary.find(e => e.example && e.first_taught_week > 14);
  
  if (beginner) console.log(`   [W1-5]  ${beginner.word.padEnd(15)} | "${beginner.example}"`);
  if (elementary) console.log(`   [W6-14] ${elementary.word.padEnd(15)} | "${elementary.example}"`);
  if (intermediate) console.log(`   [W15+]  ${intermediate.word.padEnd(15)} | "${intermediate.example}"`);
}

main().catch(console.error);
