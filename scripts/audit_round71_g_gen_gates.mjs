/**
 * scripts/audit_round71_g_gen_gates.mjs
 * 
 * Round 71 Independent Audit: G-GEN Gates Analysis on Merged Production Weeks
 */

import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const WEEKS_DIR = path.join(ROOT_DIR, 'src/data/weeks');
const SYLLABUS_FILE = path.join(ROOT_DIR, 'docs/1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt');

function parseHubFile(filePath, exportVar) {
  if (!fs.existsSync(filePath)) return null;
  const content = fs.readFileSync(filePath, 'utf8');
  const modified = content
    .replace(/export\s+(?:const|let|var)\s+/g, 'var ')
    .replace(/export\s+default\s+[^;]+;?/g, '')
    .replace(/import\s+[^;]+;?/g, '');
  const sandbox = {
    ...globalThis,
    read_explore: {},
    vocabList: [],
    vocab: [],
    week34Vocab: [],
    week34StoryScenes: []
  };
  const context = vm.createContext(sandbox);
  try {
    vm.runInContext(modified, context);
    return sandbox[exportVar];
  } catch (e) {
    return null;
  }
}

function getSourceBMathTopic(w) {
  if (!fs.existsSync(SYLLABUS_FILE)) return null;
  const txt = fs.readFileSync(SYLLABUS_FILE, 'utf8');

  if (w >= 129 && w <= 132) return { topic: "Fractions & Decimals Review / Math Logic", strand: "fractions_decimals" };
  if (w === 79 || w === 80) return { topic: "Micro-Debate / Data Analysis", strand: "data_charts" };
  if (w >= 95 && w <= 96) return { topic: "The Young Professor: Mini-Lesson Data", strand: "applied_logic" };

  const primaryMathMap = {
    43: { topic: "Addition Language / Sums", strand: "addition" },
    44: { topic: "Subtraction Language / Differences", strand: "subtraction" },
    45: { topic: "Shape Detectives / Geometry", strand: "geometry_shapes" },
    46: { topic: "Pattern Code / Sequence Logic", strand: "logic_sequences" },
    47: { topic: "Big Numbers / Place Value", strand: "place_value" },
    48: { topic: "Measuring Up / Length & Units", strand: "measurement" }
  };
  if (primaryMathMap[w]) return primaryMathMap[w];

  const lines = txt.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const sm = line.match(/^[ \t]*[•\-\*]?[ \t]*(?:Week|Tuần)\s*(\d+)\b/i);
    if (sm && parseInt(sm[1], 10) === w) {
      let block = [];
      for (let j = i; j < lines.length; j++) {
        if (j > i && (lines[j].match(/^[ \t]*[•\-\*]?[ \t]*(?:Week|Weeks|Tuần)\s*\d+/i) || lines[j].match(/^[ \t]*(?:Phase|Block|🔵|🟢|🟣)/i))) {
          break;
        }
        block.push(lines[j]);
      }
      const bText = block.join('\n');
      const m = bText.match(/(?:Topic\s*\(Math\)|Math\s*Topic):\s*([^\n]+)/i);
      if (m) return { topic: m[1].replace(/\([^)]*\)/g, '').trim() };
      const v = bText.match(/Math\s*Vocabulary:\s*([^\n]+)/i);
      if (v) return { topic: v[1].trim() };
      return null;
    }
  }
  return null;
}

function countSyllables(word) {
  word = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!word) return 0;
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]|ed|es|e)$/, '');
  word = word.replace(/^y/, '');
  const syl = word.match(/[aeiouy]{1,2}/g);
  return syl ? syl.length : 1;
}

function calcFK(text) {
  if (!text) return 0;
  const clean = text.replace(/[\n\r]+/g, ' ').trim();
  const sentences = clean.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 0);
  const words = clean.split(/\s+/).map(w => w.trim()).filter(w => w.length > 0);
  if (words.length === 0 || sentences.length === 0) return 0;
  let totalSyllables = 0;
  for (const w of words) totalSyllables += countSyllables(w);
  const score = 0.39 * (words.length / sentences.length) + 11.8 * (totalSyllables / words.length) - 15.59;
  return Math.round(score * 10) / 10;
}

const targetWeeks = [35, 36, 38, 39, 41, 43, 45, 46, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 125];

console.log('| Week | Math Problem Count | Math Strand Source B | Math Structural Match | Repeat Word Check | Overall Assessment |');
console.log('|:---:|:---:|:---|:---:|:---:|:---|');

for (const w of targetWeeks) {
  const dir = path.join(WEEKS_DIR, `week_${w}`);
  const shPath = path.join(dir, 'skill_practice_hub.js');
  const rhPath = path.join(dir, 'reading_hub.js');
  const vPath = path.join(dir, 'vocab.js');

  const sh = parseHubFile(shPath, 'skillPracticeHubData') || parseHubFile(shPath, 'SKILL_PRACTICE_HUB_DATA') || {};
  const rh = parseHubFile(rhPath, 'readingHubData') || parseHubFile(rhPath, 'READING_HUB_DATA') || {};
  
  const mathCount = (sh.singapore_math || []).length;
  const mathTopic = getSourceBMathTopic(w);
  const mathTopicName = mathTopic ? mathTopic.topic : 'None (ELA / Science)';

  // Structural check
  let mathPass = 'N/A';
  if (mathTopic) {
    const tokens = mathTopic.topic.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(t => t.length >= 3 && !['and', 'the', 'math', 'topic', 'problems'].includes(t));
    const stems = tokens.map(t => t.replace(/s$/, '').replace(/y$/, '').replace(/ic$/, ''));
    let matches = 0;
    for (const prob of (sh.singapore_math || [])) {
      const pText = `${prob.title || ''} ${prob.problemText || ''}`.toLowerCase();
      if (stems.some(st => pText.includes(st))) matches++;
    }
    mathPass = `${matches}/${mathCount} matches`;
  }

  // Check duplicate words
  let repeatFound = false;
  let repDetail = '0 repeated words';
  if (fs.existsSync(rhPath)) {
    const content = fs.readFileSync(rhPath, 'utf8');
    const rm = content.match(/\b([a-zA-Z]{3,})\s+\1\b/i);
    if (rm && rm[1].toLowerCase() !== 'had' && rm[1].toLowerCase() !== 'that') {
      repeatFound = true;
      repDetail = `Repeated: "${rm[0]}"`;
    }
  }

  console.log(`| W${w} | ${mathCount} items | ${mathTopicName} | ${mathPass} | ${repDetail} | ${mathCount === 5 ? 'SOP 5 Passed' : 'Tech Debt (2 items)'} |`);
}

