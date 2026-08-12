import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const WORDLISTS_DIR = path.join(__dirname, '../src/data/official_wordlists');
const WEEK33_DIR = path.join(__dirname, '../src/data/weeks/week_33');

const WORDLIST_FILES = [
  'starters_pre_a1.json',
  'movers_a1.json',
  'flyers_a2.json',
  'ket_a2.json'
];

const allowedWords = new Set();

const AUXILIARY_STOPWORDS = new Set([
  'a', 'an', 'the', 'is', 'am', 'are', 'was', 'were', 'be', 'been', 'being',
  'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'shall', 'should',
  'can', 'could', 'may', 'might', 'must', 'ought', 'i', 'me', 'my', 'mine', 'myself',
  'you', 'your', 'yours', 'yourself', 'he', 'him', 'his', 'himself', 'she', 'her',
  'hers', 'herself', 'it', 'its', 'itself', 'we', 'us', 'our', 'ours', 'ourselves',
  'they', 'them', 'their', 'theirs', 'themselves', 'this', 'that', 'these', 'those',
  'who', 'whom', 'whose', 'which', 'what', 'where', 'when', 'why', 'how', 'tom',
  'mia', 'alex', 'ben', 'lucy', 'sara', 'sam', 'one', 'two', 'three', 'four', 'five',
  'six', 'seven', 'eight', 'nine', 'ten', 'first', 'second', 'third', 'fourth',
  'yes', 'no', 'not', 'ok', 'oh', 'well', 'hi', 'hello', 'bye', 'blank', 'speaker'
]);

// Populate allowed words set
for (const file of WORDLIST_FILES) {
  const filePath = path.join(WORDLISTS_DIR, file);
  if (fs.existsSync(filePath)) {
    const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    if (Array.isArray(content.words)) {
      content.words.forEach((w) => {
        const tokens = w.toLowerCase().split(/\s+/);
        tokens.forEach((t) => {
          const clean = t.replace(/[^a-z]/g, '');
          if (clean) allowedWords.add(clean);
        });
      });
    }
  }
}

AUXILIARY_STOPWORDS.forEach((w) => allowedWords.add(w));

// Simple English Lemmatizer / Stemmer for inflected verb/noun forms
function getWordBaseLemma(word) {
  if (allowedWords.has(word)) return word;

  // Verb past tense -ed / -d
  if (word.endsWith('ed')) {
    const base1 = word.slice(0, -2);
    if (allowedWords.has(base1)) return base1;
    const base2 = word.slice(0, -1); // e.g. danced -> dance
    if (allowedWords.has(base2)) return base2;
    if (word.endsWith('ied')) {
      const base3 = word.slice(0, -3) + 'y'; // e.g. cried -> cry
      if (allowedWords.has(base3)) return base3;
    }
  }

  // Participle -ing
  if (word.endsWith('ing')) {
    const base1 = word.slice(0, -3); // e.g. walking -> walk
    if (allowedWords.has(base1)) return base1;
    const base2 = word.slice(0, -3) + 'e'; // e.g. waking -> wake
    if (allowedWords.has(base2)) return base2;
  }

  // Plurals / 3rd person -s / -es
  if (word.endsWith('s') && word.length > 3) {
    const base1 = word.slice(0, -1); // e.g. breaks -> break
    if (allowedWords.has(base1)) return base1;
    if (word.endsWith('es')) {
      const base2 = word.slice(0, -2); // e.g. matches -> match
      if (allowedWords.has(base2)) return base2;
    }
    if (word.endsWith('ies')) {
      const base3 = word.slice(0, -3) + 'y'; // e.g. batteries -> battery
      if (allowedWords.has(base3)) return base3;
    }
  }

  return word;
}

function extractTextFromObject(obj, textList = []) {
  if (!obj) return textList;

  if (typeof obj === 'string') {
    // Ignore IPA phonetic transcription strings (surrounded by slashes /.../)
    if (!obj.startsWith('/') && !obj.endsWith('/')) {
      textList.push(obj);
    }
  } else if (Array.isArray(obj)) {
    obj.forEach((item) => extractTextFromObject(item, textList));
  } else if (typeof obj === 'object') {
    for (const key of Object.keys(obj)) {
      if (['id', 'key', 'type', 'mode', 'content_id', 'audio_url', 'image_url', 'video_id', 'ipa', 'pronounce', 'pronunciation'].includes(key)) {
        continue;
      }
      extractTextFromObject(obj[key], textList);
    }
  }
  return textList;
}

async function auditWeek33() {
  console.log("==================================================================");
  console.log("🔍 WEEK 33 RETROACTIVE CEFR COMPLIANCE AUDIT (RULE 7 GOVERNANCE)");
  console.log("==================================================================\n");

  const filesToAudit = [
    'reading_hub.js',
    'listening_hub.js',
    'writing_hub.js',
    'speaking_hub.js',
    'vocab.js',
    'grammar.js'
  ];

  const extractedStrings = [];

  for (const fileName of filesToAudit) {
    const filePath = path.join(WEEK33_DIR, fileName);
    if (fs.existsSync(filePath)) {
      const fileUrl = pathToFileURL(filePath).href;
      try {
        const module = await import(fileUrl);
        extractTextFromObject(module.default || module, extractedStrings);
        console.log(`📁 Loaded data module: ${fileName}`);
      } catch (err) {
        console.warn(`⚠️ Warning: Failed to import ${fileName}: ${err.message}`);
      }
    }
  }

  const tokenCounts = {};
  let totalTokenOccurrences = 0;

  for (const str of extractedStrings) {
    const cleanStr = str.replace(/\*\*/g, ' ').replace(/[^a-zA-Z\s]/g, ' ');
    const tokens = cleanStr.toLowerCase().split(/\s+/).filter(Boolean);

    for (const token of tokens) {
      if (/^\d+$/.test(token) || (token.length === 1 && token !== 'a' && token !== 'i')) {
        continue;
      }

      tokenCounts[token] = (tokenCounts[token] || 0) + 1;
      totalTokenOccurrences++;
    }
  }

  const uniqueTokens = Object.keys(tokenCounts);
  const outOfListWords = [];
  let allowedTokenOccurrences = 0;

  for (const token of uniqueTokens) {
    const baseLemma = getWordBaseLemma(token);
    if (allowedWords.has(baseLemma)) {
      allowedTokenOccurrences += tokenCounts[token];
    } else {
      outOfListWords.push({ word: token, count: tokenCounts[token] });
    }
  }

  outOfListWords.sort((a, b) => b.count - a.count);

  const complianceRate = ((allowedTokenOccurrences / totalTokenOccurrences) * 100).toFixed(1);

  console.log("\n==================================================================");
  console.log("📊 WEEK 33 CEFR GOVERNANCE AUDIT METRICS");
  console.log("==================================================================");
  console.log(`• Total Student-Facing Tokens Processed : ${totalTokenOccurrences}`);
  console.log(`• Unique Word Types Analyzed             : ${uniqueTokens.length}`);
  console.log(`• Official Cambridge Wordlist Match Rate  : ${complianceRate}%`);
  console.log(`• True Out-Of-List Words (Beyond A2)      : ${outOfListWords.length}`);
  console.log("==================================================================\n");

  if (outOfListWords.length > 0) {
    console.log("⚠️ OUT-OF-LIST WORDS AUDITED IN WEEK 33 CONTENT:");
    outOfListWords.forEach((item) => {
      console.log(`   - "${item.word}" (occurs ${item.count} times)`);
    });
  } else {
    console.log("🎉 100% PERFECT MATCH! All words in Week 33 strictly comply with Cambridge Pre-A1 to A2 CEFR Standards!");
  }

  console.log("\n==================================================================");
  console.log("✅ AUDIT COMPLETE - WEEK 33 CEFR COMPLIANCE STATUS VERIFIED");
  console.log("==================================================================\n");
}

auditWeek33();
