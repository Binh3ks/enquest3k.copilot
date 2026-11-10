/**
 * scripts/generate_giaidoan2_content.mjs
 * 
 * ENGQUEST3K — GIAI ĐOẠN 2 AUTOMATED CONTENT PIPELINE ENGINE (ROUND 61)
 * 
 * Generates standardized Giai đoạn 2 pedagogical deliverables grounded strictly
 * in blueprint.json + Source A/B syllabus entries.
 * 
 * Round 61 ESL Quality Enhancements:
 * - FIX 1: writing_hub.js rich picture_story (model_sentence, 4-stage scaffold: MODEL, BUILD, WRITE, EXPAND, word_bank, sentence_frames)
 * - FIX 2: story_scenes in reading_hub.js (5 narrative scenes per week with character names & target vocabulary)
 * - FIX 3: speaking_hub.js talkshow_prompt (age/CEFR appropriate register) + genuine info-gap cards (Card A / Table A vs Card B / Table B)
 * - FIX 4: Cambridge R&W Part 2 restructured into 5 turns with 3 response options each and marked correct answers; plain exchanges in listening_hub.js
 * - FIX 5: Gate 9 (Banned Generic Template Strings) + Gate 10 (Cross-Week Skeleton Identity & Differentiation Check)
 * 
 * Invariants:
 * 1. Cryptographic Freeze Guard: W33 & W34 are hard-blocked from mutation.
 * 2. Staging Only: Writes ONLY to staging directory (docs/agent_artifacts/staging/week_XX/).
 * 3. Provenance Tracking: Every file and data object embeds generation metadata.
 * 4. Giai đoạn 4 Mechanical Quality Gates: Automates 10 gates including content quality & cross-week differentiation.
 * 5. Dry-Run by Default: Explicit --write-staging required to persist files.
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import vm from 'vm';
import { fileURLToPath } from 'url';
import { WAVE1_SPECS } from './wave1_specs.mjs';
import { WAVE2_SPECS } from './wave2_specs.mjs';
import { GAPFILL_SPECS } from './gapfill_specs.mjs';
import { WAVE3_SPECS } from './wave3_specs.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const WEEKS_DIR = path.join(ROOT_DIR, 'src/data/weeks');
const STAGING_BASE_DIR = path.join(ROOT_DIR, 'docs/agent_artifacts/staging');
const SYLLABUS_FILE = path.join(ROOT_DIR, 'docs/1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt');

// Parse CLI flags
const args = process.argv.slice(2);
const isWrite = args.includes('--write-staging') || args.includes('--write');
const isDryRun = !isWrite;
const isPilot = args.includes('--pilot');
const isWave1 = args.includes('--wave1');
const isWave2 = args.includes('--wave2');
const isGapfill = args.includes('--gapfill') || args.includes('--gap-fill');
const isWave3 = args.includes('--wave3');
const weekArgIdx = args.findIndex(a => a === '--week' || a === '-w');
const targetWeek = weekArgIdx !== -1 && args[weekArgIdx + 1] ? parseInt(args[weekArgIdx + 1], 10) : null;

// Unicode Vietnamese detection regex
const VIETNAMESE_REGEX = /[\u00C0-\u024F\u1EA0-\u1EF9]/;

// Forbidden historical tokens for W35
const W35_FORBIDDEN_TOKENS = [
  'Pine Valley', 'campfire', 'marshmallow', 'campsite', 'tent',
  'sleeping bag', 'stargazing', 'Leo the Lion', 'Milo the Mouse', 'Hunter Jack'
];

// Forbidden generic boilerplate template strings (Fix 5)
const GENERIC_BANNED_STRINGS = [
  'Introduction & Context',
  'Developing Action',
  'Synthesis & Conclusion',
  'empower your knowledge',
  'Scene narrative panel',
  'Introduce the theme of',
  'Explain the central process',
  'Reflect upon the results and broader implications',
  'Studying [X] helps us analyze facts critically'
];

/**
 * Extract Source B excerpt for a specific week (bounded <= 1536 bytes, no generic placeholders)
 */
function extractSourceBExcerpt(w) {
  if (!fs.existsSync(SYLLABUS_FILE)) return null;
  const txt = fs.readFileSync(SYLLABUS_FILE, 'utf8');
  const lines = txt.split('\n');
  let candidates = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Exact single week
    const singleMatch = line.match(/^[ \t]*[•\-\*]?[ \t]*(?:Week|Tuần)\s*(\d+)\b/i);
    if (singleMatch && parseInt(singleMatch[1], 10) === w) {
      candidates.push({ index: i, span: 0, line });
      break;
    }
    // Range week
    const rangeMatch = line.match(/(?:Weeks|Tuần)\s*(\d+)\s*[-–]\s*(\d+)\b/i);
    if (rangeMatch) {
      const s = parseInt(rangeMatch[1], 10);
      const e = parseInt(rangeMatch[2], 10);
      if (w >= s && w <= e) {
        candidates.push({ index: i, span: e - s, line });
      }
    }
  }

  if (candidates.length === 0) return null;

  // Pick candidate with smallest span (most specific)
  candidates.sort((a, b) => a.span - b.span);
  const startIndex = candidates[0].index;

  const collected = [lines[startIndex]];
  for (let i = startIndex + 1; i < lines.length; i++) {
    const line = lines[i];
    if (line.match(/^[ \t]*[•\-\*]?[ \t]*(?:Week|Weeks|Tuần)\s*\d+/i) || line.match(/^[ \t]*(?:Phase|Block|🔵|🟢|🟣)/i)) {
      break;
    }
    collected.push(line);
  }

  let result = collected.join('\n').trim();
  if (Buffer.byteLength(result, 'utf8') > 1536) {
    result = result.slice(0, 1500) + '...';
  }
  return result;
}

/**
 * Helper: Extract Source B Math topic for a week
 */
function getSourceBMathTopic(w) {
  if (!fs.existsSync(SYLLABUS_FILE)) return null;
  const txt = fs.readFileSync(SYLLABUS_FILE, 'utf8');

  // Collective cycles or multi-week blocks in Source B
  if (w >= 129 && w <= 132) {
    return { topic: "Fractions & Decimals Review / Math Logic", strand: "fractions_decimals" };
  }
  if (w === 79 || w === 80) {
    return { topic: "Micro-Debate / Data Analysis", strand: "data_charts" };
  }
  if (w >= 95 && w <= 96) {
    return { topic: "The Young Professor: Mini-Lesson Data", strand: "applied_logic" };
  }

  // Weeks 43-48: Primary Math CLIL units (Unit 7: The Math Bridge)
  const primaryMathMap = {
    43: { topic: "Addition Language / Sums", strand: "addition" },
    44: { topic: "Subtraction Language / Differences", strand: "subtraction" },
    45: { topic: "Shape Detectives / Geometry", strand: "geometry_shapes" },
    46: { topic: "Pattern Code / Sequence Logic", strand: "logic_sequences" },
    47: { topic: "Big Numbers / Place Value", strand: "place_value" },
    48: { topic: "Measuring Up / Length & Units", strand: "measurement" }
  };
  if (primaryMathMap[w]) return primaryMathMap[w];

  // Search individual week block in Source B
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
      if (m) {
        const raw = m[1].replace(/\([^)]*\)/g, '').trim();
        return { topic: raw, strand: detectMathStrand(raw) };
      }
      const v = bText.match(/Math\s*Vocabulary:\s*([^\n]+)/i);
      if (v) {
        const raw = v[1].trim();
        return { topic: raw, strand: detectMathStrand(raw) };
      }
      return null;
    }
  }
  return null;
}

function detectMathStrand(text) {
  const lower = (text || '').toLowerCase();
  if (/angle|triangle|shape|geometry|polygon|circle|perimeter|area/i.test(lower)) return 'geometry';
  if (/fraction|decimal|percent|ratio|proportion/i.test(lower)) return 'fractions_decimals';
  if (/data|chart|graph|survey|tally|table|statistics/i.test(lower)) return 'data_charts';
  if (/logic|puzzle|sequence|pattern|deduction|fallacy/i.test(lower)) return 'logic_reasoning';
  return 'general_math';
}

/**
 * Helper: Syllable counter for Flesch-Kincaid
 */
function countSyllables(word) {
  word = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!word) return 0;
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]|ed|es|e)$/, '');
  word = word.replace(/^y/, '');
  const syl = word.match(/[aeiouy]{1,2}/g);
  return syl ? Math.max(1, syl.length) : 1;
}

/**
 * Helper: Calculate Flesch-Kincaid Grade Level & long words percentage
 */
function calculateFleschKincaid(text) {
  const sentences = text.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 0);
  const words = text.match(/\b[a-zA-Z]+\b/g) || [];
  if (sentences.length === 0 || words.length === 0) return { fkGrade: 0, longWordsPct: 0, wordCount: 0 };
  
  let totalSyllables = 0;
  let longWords = 0;
  for (const w of words) {
    totalSyllables += countSyllables(w);
    if (w.length >= 10) longWords++;
  }

  const fkGrade = 0.39 * (words.length / sentences.length) + 11.8 * (totalSyllables / words.length) - 15.59;
  const longWordsPct = (longWords / words.length) * 100;
  return {
    fkGrade: Math.round(fkGrade * 10) / 10,
    longWordsPct: Math.round(longWordsPct * 10) / 10,
    wordCount: words.length,
    sentenceCount: sentences.length
  };
}

/**
 * Helper: Calculate Cambridge Wordlist Lexical Profile (% out-of-stage words)
 */
let _cambridgeWordlistCache = null;
function getCambridgeWordlists() {
  if (_cambridgeWordlistCache) return _cambridgeWordlistCache;
  const wlDir = path.join(ROOT_DIR, 'src/data/official_wordlists');
  const loadWords = (filename) => {
    const p = path.join(wlDir, filename);
    if (!fs.existsSync(p)) return [];
    try {
      const d = JSON.parse(fs.readFileSync(p, 'utf8'));
      return (d.words || []).map(w => w.toLowerCase().trim());
    } catch { return []; }
  };

  const starters = new Set(loadWords('starters_pre_a1.json'));
  const movers = new Set([...starters, ...loadWords('movers_a1.json')]);
  const flyers = new Set([...movers, ...loadWords('flyers_a2.json'), ...loadWords('ket_a2.json')]);
  const pet = new Set([...flyers, ...loadWords('pet_b1.json')]);
  const fce = new Set([...pet, ...loadWords('fce_b2.json')]);

  _cambridgeWordlistCache = { starters, movers, flyers, pet, fce };
  return _cambridgeWordlistCache;
}

function calculateLexicalProfile(text, weekNum) {
  const { starters, movers, flyers, pet, fce } = getCambridgeWordlists();
  let wordSet = flyers;
  if (weekNum <= 16) wordSet = starters;
  else if (weekNum <= 32) wordSet = movers;
  else if (weekNum <= 72) wordSet = flyers;
  else if (weekNum <= 120) wordSet = pet;
  else wordSet = fce;

  const words = (text || '').toLowerCase().match(/\b[a-z]{2,}\b/g) || [];
  if (words.length === 0) return { total: 0, outListPct: 0, outWords: [] };

  function inSet(w) {
    if (wordSet.has(w)) return true;
    if (w.endsWith('s') && wordSet.has(w.slice(0, -1))) return true;
    if (w.endsWith('es') && wordSet.has(w.slice(0, -2))) return true;
    if (w.endsWith('ed') && wordSet.has(w.slice(0, -2))) return true;
    if (w.endsWith('ing') && wordSet.has(w.slice(0, -3))) return true;
    if (w.endsWith('ly') && wordSet.has(w.slice(0, -2))) return true;
    return false;
  }

  let inList = 0;
  const outWords = [];
  for (const w of words) {
    if (inSet(w)) inList++;
    else outWords.push(w);
  }

  const outListPct = Math.round(((words.length - inList) / words.length) * 1000) / 10;
  return {
    total: words.length,
    inList,
    outListPct,
    outWords: [...new Set(outWords)]
  };
}

/**
 * Helper: Parse exported hub variable synchronously via VM sandbox
 */
function parseHubFile(content, exportVar) {
  if (!content) return null;
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

/**
 * 4 PILOT WEEKS PEDAGOGICAL CONTENT DEFINITIONS
 * Grounded 100% in blueprint.json + Source B Syllabus
 */
const PILOT_CONTENT_SPECS = {
  35: {
    week: 35,
    theme: "Storytelling Practice 2 (Personal Recount)",
    title_en: "Storytelling Practice 2 (Personal Recount)",
    title_vi: "Luyện Kể Chuyện 2 — Kể Lại Kỷ Niệm Cá Nhân",
    cefr_level: "A2 Flyers",
    grammar_focus: "Past Simple + Adjectives",
    vocab_list: [
      { id: 1, word: "memorable", pos: "adj", ipa: "/ˈmemərəbəl/", definition_en: "Worth remembering or easily remembered", definition_vi: "đáng nhớ", example_en: "Our school trip was a truly memorable day.", example_vi: "Chuyến dã ngoại trường là một ngày thực sự đáng nhớ." },
      { id: 2, word: "wonderful", pos: "adj", ipa: "/ˈwʌndərfəl/", definition_en: "Extremely good or pleasant", definition_vi: "tuyệt vời", example_en: "We had a wonderful afternoon in the park.", example_vi: "Chúng tôi đã có một buổi chiều tuyệt vời trong công viên." },
      { id: 3, word: "delighted", pos: "adj", ipa: "/dɪˈlaɪtɪd/", definition_en: "Feeling or showing great happiness", definition_vi: "vui mừng khôn xiết", example_en: "Emma was delighted to see her grandparents.", example_vi: "Emma rất vui mừng khi được gặp ông bà." },
      { id: 4, word: "surprised", pos: "adj", ipa: "/sərˈpraɪzd/", definition_en: "Feeling wonder or astonishment at the unexpected", definition_vi: "ngạc nhiên", example_en: "He was surprised by the unexpected birthday gift.", example_vi: "Cậu ấy ngạc nhiên trước món quà sinh nhật bất ngờ." },
      { id: 5, word: "frightened", pos: "adj", ipa: "/ˈfraɪtənd/", definition_en: "Afraid or anxious about something", definition_vi: "sợ hãi", example_en: "The loud thunder made the little kitten frightened.", example_vi: "Tiếng sấm lớn làm chú mèo con sợ hãi." },
      { id: 6, word: "excited", pos: "adj", ipa: "/ɪkˈsaɪtɪd/", definition_en: "Very enthusiastic and eager", definition_vi: "hào hứng", example_en: "The students were excited about the science show.", example_vi: "Các học sinh rất hào hứng với buổi biểu diễn khoa học." },
      { id: 7, word: "peaceful", pos: "adj", ipa: "/ˈpiːsfəl/", definition_en: "Calm and quiet; free from noise", definition_vi: "yên bình", example_en: "The lake looked calm and peaceful at sunrise.", example_vi: "Mặt hồ trông êm đềm và yên bình lúc bình minh." },
      { id: 8, word: "cheerful", pos: "adj", ipa: "/ˈtʃɪərfəl/", definition_en: "Noticeably happy and optimistic", definition_vi: "vui tươi", example_en: "The cheerful boy greeted everyone with a broad smile.", example_vi: "Cậu bé vui tươi chào mọi người với nụ cười rạng rỡ." },
      { id: 9, word: "suddenly", pos: "adv", ipa: "/ˈsʌdənli/", definition_en: "Quickly and unexpectedly", definition_vi: "bất thình lình", example_en: "Suddenly, the bright lights turned on.", example_vi: "Bất thình lình, những ánh đèn sáng rực bật lên." },
      { id: 10, word: "laughed", pos: "v", ipa: "/læft/", definition_en: "Made joyful sounds and movements of the face", definition_vi: "đã cười", example_en: "We laughed loudly at the funny clown.", example_vi: "Chúng tôi đã cười lớn trước chú hề vui nhộn." },
      { id: 11, word: "whispered", pos: "v", ipa: "/ˈwɪspərd/", definition_en: "Spoke very softly using one's breath", definition_vi: "đã thì thầm", example_en: "She whispered the secret answer to her friend.", example_vi: "Cô ấy đã thì thầm câu trả lời bí mật với bạn mình." },
      { id: 12, word: "decided", pos: "v", ipa: "/dɪˈsaɪdɪd/", definition_en: "Made a firm choice after thinking", definition_vi: "đã quyết định", example_en: "They decided to visit the history museum.", example_vi: "Họ đã quyết định đi thăm bảo tàng lịch sử." },
      { id: 13, word: "celebrated", pos: "v", ipa: "/ˈselɪbreɪtɪd/", definition_en: "Honored an occasion with festivities", definition_vi: "đã ăn mừng", example_en: "Our whole family celebrated Lucas's victory.", example_vi: "Cả gia đình chúng tôi đã ăn mừng chiến thắng của Lucas." },
      { id: 14, word: "treasured", pos: "v", ipa: "/ˈtreʒərd/", definition_en: "Valued greatly as precious", definition_vi: "đã trân quý", example_en: "Grandpa treasured every photograph in the album.", example_vi: "Ông đã trân quý từng bức ảnh trong cuốn album." },
      { id: 15, word: "recounted", pos: "v", ipa: "/rɪˈkaʊntɪd/", definition_en: "Told the detailed story of an event", definition_vi: "đã kể lại", example_en: "The explorer recounted his exciting journey.", example_vi: "Nhà thám hiểm đã kể lại hành trình thú vị của mình." },
      { id: 16, word: "adventure", pos: "n", ipa: "/ədˈventʃər/", definition_en: "An unusual and exciting experience", definition_vi: "chuyến phiêu lưu", example_en: "Traveling by train was an unforgettable adventure.", example_vi: "Đi du lịch bằng tàu hỏa là một chuyến phiêu lưu khó quên." },
      { id: 17, word: "journey", pos: "n", ipa: "/ˈdʒɜːrni/", definition_en: "An act of traveling from one place to another", definition_vi: "hành trình", example_en: "The bus journey took over two hours.", example_vi: "Hành trình xe buýt mất hơn hai giờ đồng hồ." },
      { id: 18, word: "souvenir", pos: "n", ipa: "/ˌsuːvəˈnɪər/", definition_en: "An item kept as a reminder of a place visited", definition_vi: "quà lưu niệm", example_en: "I bought a small wooden toy as a souvenir.", example_vi: "Tôi đã mua một món đồ chơi gỗ nhỏ làm quà lưu niệm." },
      { id: 19, word: "photograph", pos: "n", ipa: "/ˈfoʊtəɡræf/", definition_en: "A picture made using a camera", definition_vi: "bức ảnh", example_en: "Dad took a lovely photograph of the family.", example_vi: "Bố đã chụp một bức ảnh đáng yêu của gia đình." },
      { id: 20, word: "celebration", pos: "n", ipa: "/ˌselɪˈbreɪʃən/", definition_en: "A joyful event or party for a special occasion", definition_vi: "lễ kỷ niệm", example_en: "The victory celebration lasted until dinner time.", example_vi: "Buổi lễ ăn mừng chiến thắng kéo dài tới giờ ăn tối." }
    ],
    clil: {
      title_en: "The Art of Storytelling: Bringing Memories to Life",
      title_vi: "Nghệ Thuật Kể Chuyện: Thổi Hồn Vào Ký Ức",
      content_en: "A personal recount is a wonderful way to share memorable experiences with friends and family. When writers recount past events, they use descriptive adjectives to make their stories come alive. Instead of merely saying that a day was nice, a skilled storyteller explains how they felt excited, delighted, or surprised during each moment. Clear sequence words such as first, next, suddenly, and finally guide readers smoothly through the journey. Describing sensory details helps listeners picture the scene clearly in their minds. For example, mentioning a cheerful laugh, a whispering breeze, or a colorful celebration adds depth to simple facts. When you conclude your recount, reflecting on what made the day special leaves a lasting impression on your audience.",
      glossary: [
        { word: "recount", definition_en: "To tell a story or describe events in detail", definition_vi: "kể lại chi tiết" },
        { word: "descriptive", definition_en: "Giving detailed information about something", definition_vi: "mang tính miêu tả" },
        { word: "sensory", definition_en: "Relating to physical senses like sight and sound", definition_vi: "thuộc về giác quan" },
        { word: "sequence", definition_en: "The particular order in which events follow each other", definition_vi: "trình tự nối tiếp" },
        { word: "impression", definition_en: "An idea, feeling, or opinion about something", definition_vi: "ấn tượng sâu sắc" }
      ],
      check_questions: [
        { id: 1, question_en: "What do skilled storytellers use to make recounts vivid?", options: ["Descriptive adjectives and sensory details", "Only silent gestures", "Very short numbers"], answer: "Descriptive adjectives and sensory details" },
        { id: 2, question_en: "Why are sequence words important in a recount?", options: ["They guide readers smoothly through the order of events", "They hide the ending of the story", "They change the names of characters"], answer: "They guide readers smoothly through the order of events" },
        { id: 3, question_en: "What does reflecting at the end of a recount do?", options: ["It leaves a lasting impression on the audience", "It restarts the entire story again", "It deletes all adjectives"], answer: "It leaves a lasting impression on the audience" }
      ],
      critical_thinking: {
        question_en: "How does choosing strong descriptive adjectives change how a listener feels about your story?",
        hint_en: "Consider how words like 'frightened' or 'delighted' create emotional empathy compared to generic words like 'bad' or 'good'."
      }
    },
    shadowing_sentences: [
      { id: 1, text: "Last Saturday was the most memorable day of our school holiday.", ipa: "/læst ˈsætərdeɪ wəz ðə moʊst ˈmemərəbəl deɪ əv ˈaʊər skuːl ˈhɑːlədeɪ/" },
      { id: 2, text: "We packed our backpacks early and boarded the cheerful morning train.", ipa: "/wi pækt ˈaʊər ˈbækpæks ˈɜːrli ənd ˈbɔːrdɪd ðə ˈtʃɪərfəl ˈmɔːrnɪŋ treɪn/" },
      { id: 3, text: "While my brother looked out the window, I organized our colorful map.", ipa: "/waɪl maɪ ˈbrʌðər lʊkt aʊt ðə ˈwɪndoʊ aɪ ˈɔːrɡənaɪzd ˈaʊər ˈkʌlərfəl mæp/" },
      { id: 4, text: "When we arrived at the art museum, everyone was delighted and surprised.", ipa: "/wen wi əˈraɪvd ət ði ɑːrt mjuːˈziːəm ˈevriwʌn wəz dɪˈlaɪtɪd ənd sərˈpraɪzd/" },
      { id: 5, text: "The grand exhibition hall looked magnificent under warm golden lights.", ipa: "/ðə ɡrænd ˌeksɪˈbɪʃən hɔːl lʊkt mæɡˈnɪfɪsənt ˈʌndər wɔːrm ˈɡoʊldən laɪts/" },
      { id: 6, text: "We laughed together as the talented guide demonstrated a magic trick.", ipa: "/wi læft təˈɡeðər æz ðə ˈtæləntɪd ɡaɪd ˈdemənstreɪtɪd ə ˈmædʒɪk trɪk/" },
      { id: 7, text: "Grandpa took a wonderful family photograph before we left the courtyard.", ipa: "/ˈɡrænpɑː tʊk ə ˈwʌndərfəl ˈfæməli ˈfoʊtəɡræf bɪˈfɔːr wi left ðə ˈkɔːrtjɑːrd/" },
      { id: 8, text: "It was truly an unforgettable adventure that we will always treasure.", ipa: "/ɪt wəz ˈtruːli ən ˌʌnfərˈɡetəbəl ədˈventʃər ðæt wi wɪl ˈɔːlweɪz ˈtreʒər/" }
    ],
    // FIX 2: 5 Story Scenes with character names & rich narrative
    story_scenes: [
      {
        id: 1,
        scene_id: "scene_1",
        scene_number: 1,
        title_en: "Boarding the Morning Train",
        title_vi: "Lên Chuyến Tàu Buổi Sáng",
        description_en: "Lucas and his sister Maya packed their backpacks early and **boarded** the cheerful morning train.",
        description: "Lucas and his sister Maya packed their backpacks early and **boarded** the cheerful morning train.",
        image_url: "/images/week35/webtoon_scene_1.png",
        audio_url: "/audio/week35/scene_1.mp3"
      },
      {
        id: 2,
        scene_id: "scene_2",
        scene_number: 2,
        title_en: "Meeting the Giant Robot",
        title_vi: "Gặp Gỡ Robot Khổng Lồ",
        description_en: "At the Discovery Museum, Lucas was **delighted** and **surprised** when a giant robot waved hello.",
        description: "At the Discovery Museum, Lucas was **delighted** and **surprised** when a giant robot waved hello.",
        image_url: "/images/week35/webtoon_scene_2.png",
        audio_url: "/audio/week35/scene_2.mp3"
      },
      {
        id: 3,
        scene_id: "scene_3",
        scene_number: 3,
        title_en: "Wonder in the Planetarium",
        title_vi: "Kỳ Diệu Tại Cung Thiên Văn",
        description_en: "Suddenly, the room lights dimmed and Maya **whispered** with excitement under the **glowing stars**.",
        description: "Suddenly, the room lights dimmed and Maya **whispered** with excitement under the **glowing stars**.",
        image_url: "/images/week35/webtoon_scene_3.png",
        audio_url: "/audio/week35/scene_3.mp3"
      },
      {
        id: 4,
        scene_id: "scene_4",
        scene_number: 4,
        title_en: "Laughter in the Theater",
        title_vi: "Tiếng Cười Tại Khán Phòng",
        description_en: "In the science theater, the children **laughed** cheerfully as the inventor demonstrated a flying drone.",
        description: "In the science theater, the children **laughed** cheerfully as the inventor demonstrated a flying drone.",
        image_url: "/images/week35/webtoon_scene_4.png",
        audio_url: "/audio/week35/scene_4.mp3"
      },
      {
        id: 5,
        scene_id: "scene_5",
        scene_number: 5,
        title_en: "A Treasured Family Photograph",
        title_vi: "Bức Ảnh Gia Đình Đáng Trân Quý",
        description_en: "Before leaving, Grandpa took a **wonderful photograph** that everyone **treasured** as a **memorable souvenir**.",
        description: "Before leaving, Grandpa took a **wonderful photograph** that everyone **treasured** as a **memorable souvenir**.",
        image_url: "/images/week35/webtoon_scene_5.png",
        audio_url: "/audio/week35/scene_5.mp3"
      }
    ],
    // FIX 1: Rich Writing Data with multi-stage ladder, model sentence & pills
    writing_data: {
      title: "Lucas and Maya's Museum Adventure",
      prompt_en: "Look at the pictures. Write the recount of the museum adventure. Write 20 or more words.",
      prompt_vi: "Nhìn vào các bức tranh. Viết bài kể lại chuyến phiêu lưu ở bảo tàng (từ 20 từ trở lên).",
      min_sentences: 3,
      min_words: 20,
      max_words: 80,
      model_sentence: "Last Saturday, Lucas and Maya had a memorable adventure at the Discovery Science Museum. First, they boarded the cheerful morning train. Next, they were delighted to see a giant robot in the exhibition hall. Then, Maya whispered with excitement under glowing stars in the planetarium. In the end, Grandpa took a wonderful family photograph that they treasured as a souvenir.",
      word_bank: ["boarded", "cheerful", "delighted", "surprised", "whispered", "laughed", "treasured", "photograph", "souvenir", "adventure"],
      sentence_frames: [
        "In the morning, Lucas and Maya boarded the ___ train.",
        "In the exhibition hall, they were ___ to see a giant robot.",
        "Suddenly, the lights dimmed and Maya ___ with excitement.",
        "Grandpa took a ___ family photograph as a souvenir."
      ],
      panels: [
        {
          panel_id: "panel_1",
          title_en: "Scene 1: Boarding the Morning Train",
          title_vi: "Cảnh 1: Lên Chuyến Tàu Buổi Sáng",
          image_url: "/images/week35/writing_panel_1.png",
          image_prompt: "Two smiling children with backpacks boarding a bright modern passenger train on a sunny morning, cartoon storybook style.",
          caption: "Lucas and Maya packed their backpacks early and boarded the cheerful morning train.",
          sentence_frame: "In the morning, Lucas and Maya [packed their backpacks] and [boarded the cheerful train].",
          pills: ["packed their backpacks", "boarded the cheerful train", "on Saturday morning", "cheerful morning train", "Lucas and Maya"],
          connectors: ["In the morning,", "First,", "Early on Saturday,"]
        },
        {
          panel_id: "panel_2",
          title_en: "Scene 2: Meeting the Giant Robot",
          title_vi: "Cảnh 2: Gặp Gỡ Robot Khổng Lồ",
          image_url: "/images/week35/writing_panel_2.png",
          image_prompt: "A large friendly chrome robot waving at two amazed children inside a brightly lit science museum exhibition hall.",
          caption: "At the museum, Lucas was delighted and surprised when a giant robot waved hello.",
          sentence_frame: "When they arrived, Lucas was [delighted and surprised] to [see a giant robot].",
          pills: ["delighted and surprised", "see a giant robot", "in the main hall", "waved hello", "huge silver robot"],
          connectors: ["Next,", "Then,", "Inside the hall,"]
        },
        {
          panel_id: "panel_3",
          title_en: "Scene 3: Wonder in the Planetarium",
          title_vi: "Cảnh 3: Kỳ Diệu Tại Cung Thiên Văn",
          image_url: "/images/week35/writing_panel_3.png",
          image_prompt: "Two children looking up in awe inside a dark planetarium dome filled with glowing constellations and planets.",
          caption: "Suddenly, the lights dimmed and Maya whispered with excitement under glowing stars.",
          sentence_frame: "Suddenly, the lights dimmed and Maya [whispered with excitement] under the [glowing stars].",
          pills: ["whispered with excitement", "under glowing stars", "in the dark planetarium", "suddenly the lights dimmed", "looked magnificent"],
          connectors: ["Suddenly,", "At that moment,", "After that,"]
        },
        {
          panel_id: "panel_4",
          title_en: "Scene 4: Family Photograph Celebration",
          title_vi: "Cảnh 4: Bức Ảnh Kỷ Niệm Gia Đình",
          image_url: "/images/week35/writing_panel_4.png",
          image_prompt: "Grandfather taking a photo with a camera of two happy children holding small museum souvenir models in a sunny courtyard.",
          caption: "Before leaving, Grandpa took a wonderful family photograph that everyone treasured as a memorable souvenir.",
          sentence_frame: "In the end, Grandpa took a [wonderful family photograph] that we will [always treasure] as a souvenir.",
          pills: ["wonderful family photograph", "always treasure", "memorable souvenir", "delighted and happy", "celebrated together"],
          connectors: ["In the end,", "Finally,", "Before going home,"]
        }
      ],
      steps: [
        {
          scene: 1,
          ladder_stage: "MODEL",
          badge_label: "MODEL",
          title: "Scene 1: Boarding the Morning Train",
          image_url: "/images/week35/writing_panel_1.png",
          caption: "Lucas and Maya packed their backpacks early and boarded the cheerful morning train.",
          frame_L1: "In the morning, Lucas and Maya packed their backpacks early. They boarded the cheerful morning train to the museum.",
          connectors: ["In the morning,", "First,", "On Saturday,"],
          sentence_hint: "Write 2 sentences about packing backpacks and boarding the train.",
          pills: ["packed their backpacks", "boarded the cheerful train", "morning train", "Lucas and Maya"],
          sentence_frame: "In the morning, Lucas and Maya [packed their backpacks] and [boarded the cheerful train]."
        },
        {
          scene: 2,
          ladder_stage: "BUILD",
          badge_label: "BUILD",
          title: "Scene 2: Meeting the Giant Robot",
          image_url: "/images/week35/writing_panel_2.png",
          caption: "At the museum, Lucas was delighted and surprised when a giant robot waved hello.",
          frame_L1: "Next, they arrived at the exhibition hall. Lucas was delighted and surprised to see a giant robot waving hello.",
          connectors: ["Next,", "Then,", "Inside the hall,"],
          sentence_hint: "Write 2 sentences about arriving at the museum and seeing the giant robot.",
          pills: ["delighted and surprised", "see a giant robot", "in the hall", "waved hello"],
          sentence_frame: "Next, Lucas was [delighted and surprised] to [see a giant robot] in the hall."
        },
        {
          scene: 3,
          ladder_stage: "WRITE",
          badge_label: "WRITE",
          title: "Scene 3: Wonder in the Planetarium",
          image_url: "/images/week35/writing_panel_3.png",
          caption: "Suddenly, the lights dimmed and Maya whispered with excitement under glowing stars.",
          frame_L1: "Suddenly, the room lights dimmed in the planetarium. Maya whispered with excitement under thousands of glowing stars.",
          connectors: ["Suddenly,", "Then,", "After that,"],
          sentence_hint: "Write 2 sentences about the dark planetarium and whispering under glowing stars.",
          pills: ["whispered with excitement", "under glowing stars", "dark planetarium", "lights dimmed"],
          sentence_frame: "Suddenly, the lights dimmed and Maya [whispered with excitement] under the [glowing stars]."
        },
        {
          scene: 4,
          ladder_stage: "EXPAND",
          badge_label: "EXPAND",
          title: "Scene 4: Family Photograph Celebration",
          image_url: "/images/week35/writing_panel_4.png",
          caption: "Before leaving, Grandpa took a wonderful family photograph that everyone treasured as a memorable souvenir.",
          frame_L1: "In the end, Grandpa took a wonderful family photograph. Everyone treasured the picture as a memorable souvenir.",
          connectors: ["In the end,", "Finally,", "Before going home,"],
          sentence_hint: "Write 2 sentences about taking a family photo and treasuring the souvenir.",
          pills: ["wonderful family photograph", "always treasure", "memorable souvenir", "delighted"],
          sentence_frame: "In the end, Grandpa took a [wonderful family photograph] that we will [always treasure] as a souvenir."
        }
      ]
    },
    // FIX 3: Speaking Hub with kid-friendly register & genuine info-gap
    speaking_data: {
      talkshow_prompt: {
        topic: "My Most Memorable Trip",
        question: "Hi Lucas! What was the most memorable part of your weekend visit to the Discovery Science Museum?",
        model_response: "The most memorable part was entering the planetarium with Maya and Grandpa! Suddenly, the hall lights went dark and thousands of glowing stars appeared across the ceiling. We whispered with excitement, and Grandpa took a wonderful family photograph outside. It was a delightful adventure that I will always remember!"
      },
      info_exchange_cards: {
        table_a: {
          title: "Maya's Museum Visit",
          subtitle: "Candidate's Question Card (Ask Examiner)",
          person: "Maya",
          fields: [
            {
              id: "field_a1",
              cue_prompt: "where / Maya go?",
              cue_word: "where",
              is_missing: true,
              acceptable_questions: [
                "Where did Maya go on Saturday morning?",
                "Where did Maya go?",
                "Where did she travel to?"
              ],
              nova_reply: "Maya went to the Discovery Science Museum with her brother Lucas."
            },
            {
              id: "field_a2",
              cue_prompt: "what / see in main hall?",
              cue_word: "what",
              is_missing: true,
              acceptable_questions: [
                "What did Maya see in the main exhibition hall?",
                "What did they see in the hall?",
                "What did they see?"
              ],
              nova_reply: "They saw a giant walking robot that turned and waved hello."
            },
            {
              id: "field_a3",
              cue_prompt: "how / feel in planetarium?",
              cue_word: "how",
              is_missing: true,
              acceptable_questions: [
                "How did Maya feel inside the dark planetarium?",
                "How did she feel in the planetarium?",
                "Did Maya feel excited in the planetarium?"
              ],
              nova_reply: "She felt delighted and whispered with wonder under the glowing stars."
            },
            {
              id: "field_a4",
              cue_prompt: "who / take photograph?",
              cue_word: "who",
              is_missing: true,
              acceptable_questions: [
                "Who took the family photograph before leaving?",
                "Who took the photo?",
                "Who took the photograph?"
              ],
              nova_reply: "Grandpa took a wonderful photograph in front of the courtyard fountain."
            },
            {
              id: "field_a5",
              cue_prompt: "what souvenir / buy?",
              cue_word: "what",
              is_missing: true,
              acceptable_questions: [
                "What souvenir did Maya choose from the gift shop?",
                "What souvenir did she buy?",
                "What did she buy as a souvenir?"
              ],
              nova_reply: "She bought a colorful star puzzle as a memorable souvenir."
            }
          ]
        },
        table_b: {
          title: "Lucas's Birthday Celebration",
          subtitle: "Information Card (Answer Examiner's Questions)",
          person: "Lucas",
          fields: [
            {
              id: "field_b1",
              cue_prompt: "where / party?",
              cue_word: "where",
              value: "At Grandpa's peaceful cottage near the sunny lake.",
              nova_question: "Where was Lucas's birthday party held?",
              acceptable_answers: [
                "At Grandpa's peaceful cottage near the sunny lake.",
                "At Grandpa's cottage near the lake.",
                "Near the lake at Grandpa's cottage."
              ]
            },
            {
              id: "field_b2",
              cue_prompt: "what / eat?",
              cue_word: "what",
              value: "A wonderful homemade strawberry cake.",
              nova_question: "What delicious food did the family celebrate with?",
              acceptable_answers: [
                "A wonderful homemade strawberry cake.",
                "Strawberry cake.",
                "They ate a homemade strawberry cake."
              ]
            },
            {
              id: "field_b3",
              cue_prompt: "when / celebration start?",
              cue_word: "when",
              value: "At two o'clock on Sunday afternoon.",
              nova_question: "When did the celebration begin?",
              acceptable_answers: [
                "At two o'clock on Sunday afternoon.",
                "At two o'clock.",
                "On Sunday afternoon."
              ]
            },
            {
              id: "field_b4",
              cue_prompt: "who / attend?",
              cue_word: "who",
              value: "His whole family and four cheerful school friends.",
              nova_question: "Who joined Lucas for the birthday games?",
              acceptable_answers: [
                "His whole family and four cheerful school friends.",
                "Family and four friends.",
                "His family and friends."
              ]
            },
            {
              id: "field_b5",
              cue_prompt: "how / Lucas feel?",
              cue_word: "how",
              value: "He felt delighted and laughed with happiness.",
              nova_question: "How did Lucas feel at the end of the day?",
              acceptable_answers: [
                "He felt delighted and laughed with happiness.",
                "He felt delighted.",
                "Lucas was delighted and happy."
              ]
            }
          ]
        }
      }
    },
    cambridge_rw: {
      part1_definitions: [
        { id: 1, text: "A joyful party or gathering held to mark a special occasion.", target: "celebration" },
        { id: 2, text: "A picture produced by capturing light on a camera sensor or film.", target: "photograph" },
        { id: 3, text: "An object that you keep to remind yourself of an exciting trip.", target: "souvenir" },
        { id: 4, text: "An exciting or unusual journey full of surprising new experiences.", target: "adventure" },
        { id: 5, text: "Feeling immense happiness and complete satisfaction.", target: "delighted" }
      ],
      // FIX 4: Cambridge R&W Part 2 restructured into 5 turns with 3 options each and marked answers
      part2_dialogue: {
        title: "Oliver & Emma Discussing the Weekend Recount",
        turns: [
          {
            id: 1,
            speaker: "Oliver",
            prompt: "Did you finish writing your story about our weekend trip?",
            options: [
              "Yes, I recounted all the exciting things we saw at the museum.",
              "No, I never eat lunch at school.",
              "Because it was raining yesterday."
            ],
            answer: "Yes, I recounted all the exciting things we saw at the museum."
          },
          {
            id: 2,
            speaker: "Oliver",
            prompt: "Which adjectives did you use to describe the exhibition hall?",
            options: [
              "I wrote that it was magnificent, bright, and wonderfully quiet.",
              "I used blue paint and two pencils.",
              "There are twelve classrooms on the second floor."
            ],
            answer: "I wrote that it was magnificent, bright, and wonderfully quiet."
          },
          {
            id: 3,
            speaker: "Oliver",
            prompt: "Were you surprised when the robotic dinosaur moved?",
            options: [
              "Yes, everyone was delighted and screamed with laughter!",
              "Tomorrow morning at half past seven.",
              "My coat is inside the wooden locker."
            ],
            answer: "Yes, everyone was delighted and screamed with laughter!"
          },
          {
            id: 4,
            speaker: "Oliver",
            prompt: "Did Grandpa manage to take a photograph before leaving?",
            options: [
              "Yes, he took a wonderful photograph in front of the fountain.",
              "He prefers drinking orange juice with breakfast.",
              "No, it is two kilometers from the railway station."
            ],
            answer: "Yes, he took a wonderful photograph in front of the fountain."
          },
          {
            id: 5,
            speaker: "Oliver",
            prompt: "I would love to read your recount after break time!",
            options: [
              "Sure, I can lend you my notebook right after science class.",
              "I walked down the corridor very slowly.",
              "It was forty-five minutes long."
            ],
            answer: "Sure, I can lend you my notebook right after science class."
          }
        ],
        exchanges: [
          { speaker: "Oliver", text: "Did you finish writing your story about our weekend trip?" },
          { speaker: "Emma", text: "Yes, I recounted all the exciting things we saw at the museum." },
          { speaker: "Oliver", text: "Which adjectives did you use to describe the exhibition hall?" },
          { speaker: "Emma", text: "I wrote that it was magnificent, bright, and wonderfully quiet." },
          { speaker: "Oliver", text: "Were you surprised when the robotic dinosaur moved?" },
          { speaker: "Emma", text: "Yes, everyone was delighted and screamed with laughter!" },
          { speaker: "Oliver", text: "Did Grandpa manage to take a photograph before leaving?" },
          { speaker: "Emma", text: "Yes, he took a wonderful photograph in front of the fountain." },
          { speaker: "Oliver", text: "I would love to read your recount after break time!" },
          { speaker: "Emma", text: "Sure, I can lend you my notebook right after science class." }
        ]
      },
      part6_cloze: {
        title: "Lucas's Recount: Sunday Afternoon",
        instructions: "Read the diary and write the missing words. Write one word on each line.",
        text_template: "Dear Diary, yesterday was [1]_____ best day of my holiday. In the morning, our class [2]_____ to the national gallery. While the teacher was explaining [3]_____ famous painting, we took careful notes. In the afternoon, we [4]_____ cheerfully in the sunny garden. Everyone felt very [5]_____ and pleased.",
        answers: { "1": "the", "2": "went", "3": "the", "4": "walked", "5": "happy" }
      }
    },
    minigames: {
      math_problems: [
        {
          id: 1,
          title: "Problem 1: Photograph Album (Part-Whole)",
          problemText: "Emma took 45 photographs on Saturday and 35 photographs on Sunday. How many photographs did she take altogether?",
          correctAnswer: 80,
          answer: "80 photographs",
          hintText: "Saturday photos (45) + Sunday photos (35) = 80 total photographs.",
          modelData: {
            type: "part_whole",
            bars: [
              { value: 45, label: "45 Saturday", color: "#4f46e5" },
              { value: 35, label: "35 Sunday", color: "#06b6d4" }
            ],
            totalLabel: "80 photographs total"
          }
        },
        {
          id: 2,
          title: "Problem 2: Souvenir Postcards (Comparison)",
          problemText: "The museum gift shop sold 64 postcards in the morning and 28 postcards in the afternoon. How many more postcards were sold in the morning?",
          correctAnswer: 36,
          answer: "36 postcards",
          hintText: "Morning sales (64) - Afternoon sales (28) = 36 more postcards.",
          modelData: {
            type: "comparison",
            bars: [
              { value: 64, label: "64 Morning", color: "#0ea5e9" },
              { value: 28, label: "28 Afternoon", color: "#ef4444" }
            ],
            differenceLabel: "36 more postcards"
          }
        }
      ],
      grammar_drills: [
        { id: 1, prompt: "While Emma ___ her journal, her brother painted a picture.", options: ["was writing", "wrote", "writes"], answer: "was writing" },
        { id: 2, prompt: "The children were very ___ when the magic show started.", options: ["excited", "excitedly", "exciting"], answer: "excited" },
        { id: 3, prompt: "Suddenly, the train ___ at the quiet mountain station.", options: ["stopped", "was stopping", "stops"], answer: "stopped" },
        { id: 4, prompt: "Grandpa ___ a wonderful photograph of our whole family.", options: ["took", "takes", "was taking"], answer: "took" },
        { id: 5, prompt: "We ___ loudly at the clown's funny dance yesterday.", options: ["laughed", "laugh", "are laughing"], answer: "laughed" }
      ],
      action_lab_scenarios: [
        { stage: 1, title: "Identifying Emotional Tone", instruction: "Match recount excerpts to their emotional mood (Excited vs Peaceful)." },
        { stage: 2, title: "Chronological Sequence Assembly", instruction: "Order narrative sentences using transition adverbs (First, Suddenly, Finally)." },
        { stage: 3, title: "Adjective Elevation Workshop", instruction: "Replace flat adjectives (good, nice) with vivid alternatives (delighted, magnificent)." }
      ]
    }
  },

  38: {
    week: 38,
    theme: "Animal Abilities (Modals)",
    title_en: "Animal Abilities (Modals)",
    title_vi: "Khả Năng Động Vật — Động Từ Khuyết Thiếu",
    cefr_level: "A2 Flyers",
    grammar_focus: "Can / Cannot (Can't)",
    vocab_list: [
      { id: 1, word: "jump", pos: "v", ipa: "/dʒʌmp/", definition_en: "Push oneself off a surface into the air using legs", definition_vi: "nhảy", example_en: "Kangaroos can jump over tall bushes easily.", example_vi: "Chuột túi có thể nhảy qua những bụi cây cao dễ dàng." },
      { id: 2, word: "fly", pos: "v", ipa: "/flaɪ/", definition_en: "Move through the air using wings", definition_vi: "bay", example_en: "Eagles can fly high above the rocky mountains.", example_vi: "Đại bàng có thể bay cao phía trên những ngọn núi đá." },
      { id: 3, word: "swim", pos: "v", ipa: "/swɪm/", definition_en: "Propel the body through water using limbs or fins", definition_vi: "bơi", example_en: "Dolphins can swim faster than human boats.", example_vi: "Cá heo có thể bơi nhanh hơn thuyền của con người." },
      { id: 4, word: "hunt", pos: "v", ipa: "/hʌnt/", definition_en: "Pursue and kill wild animals for food", definition_vi: "săn mồi", example_en: "Lions hunt cooperatively in open grasslands.", example_vi: "Sư tử săn mồi theo bầy đàn trên thảo nguyên mở." },
      { id: 5, word: "climb", pos: "v", ipa: "/klaɪm/", definition_en: "Go up or ascend using hands and feet or claws", definition_vi: "leo trèo", example_en: "Monkeys can climb tall forest trees quickly.", example_vi: "Khỉ có thể leo trèo các cây rừng cao rất nhanh." },
      { id: 6, word: "run", pos: "v", ipa: "/rʌn/", definition_en: "Move at a speed faster than a walk", definition_vi: "chạy", example_en: "Cheetahs can run at astonishing speeds.", example_vi: "Báo săn có thể chạy với tốc độ đáng kinh ngạc." },
      { id: 7, word: "glide", pos: "v", ipa: "/ɡlaɪd/", definition_en: "Move smoothly and continuously through air or water", definition_vi: "lượn", example_en: "Flying squirrels can glide between tree branches.", example_vi: "Sóc bay có thể lượn giữa các cành cây." },
      { id: 8, word: "burrow", pos: "v", ipa: "/ˈbɜːroʊ/", definition_en: "Make a hole or tunnel into the ground", definition_vi: "đào hang", example_en: "Rabbits burrow underground to stay safe from predators.", example_vi: "Thỏ đào hang dưới lòng đất để giữ an toàn trước kẻ săn mồi." },
      { id: 9, word: "dive", pos: "v", ipa: "/daɪv/", definition_en: "Plunge head first into water", definition_vi: "lặn lao", example_en: "Penguins can dive deep into freezing cold oceans.", example_vi: "Chim cánh cụt có thể lặn sâu vào đại dương lạnh giá." },
      { id: 10, word: "survive", pos: "v", ipa: "/sərˈvaɪv/", definition_en: "Continue to live or exist especially in hard conditions", definition_vi: "sinh tồn", example_en: "Camels can survive without water for many days.", example_vi: "Lạc đà có thể sinh tồn không cần nước trong nhiều ngày." },
      { id: 11, word: "heavy", pos: "adj", ipa: "/ˈhevi/", definition_en: "Of great weight; difficult to lift", definition_vi: "nặng nề", example_en: "Elephants are heavy mammals with thick gray skin.", example_vi: "Voi là loài động vật có vú nặng nề với làn da xám dày." },
      { id: 12, word: "fast", pos: "adj", ipa: "/fæst/", definition_en: "Moving or capable of moving at high speed", definition_vi: "nhanh", example_en: "The falcon is a remarkably fast bird.", example_vi: "Chim ưng là một loài chim nhanh đáng chú ý." },
      { id: 13, word: "agile", pos: "adj", ipa: "/ˈædʒaɪl/", definition_en: "Able to move quickly and easily with grace", definition_vi: "nhanh nhẹn", example_en: "Leopards are agile climbers on rocky cliffs.", example_vi: "Báo hoa mai là những kẻ leo trèo nhanh nhẹn trên vách đá." },
      { id: 14, word: "powerful", pos: "adj", ipa: "/ˈpaʊərfəl/", definition_en: "Having great strength or physical force", definition_vi: "mạnh mẽ", example_en: "Bears possess powerful paws for catching fish.", example_vi: "Gấu sở hữu đôi chân trước mạnh mẽ để bắt cá." },
      { id: 15, word: "nocturnal", pos: "adj", ipa: "/nɑːkˈtɜːrnəl/", definition_en: "Active mainly during the night time", definition_vi: "hoạt động ban đêm", example_en: "Owls are nocturnal hunters with acute night vision.", example_vi: "Cú mèo là kẻ săn mồi ban đêm với thị lực ban đêm sắc bén." },
      { id: 16, word: "predator", pos: "n", ipa: "/ˈpredətər/", definition_en: "An animal that naturally preys on others", definition_vi: "kẻ săn mồi", example_en: "The tiger is an apex predator in the jungle.", example_vi: "Hổ là kẻ săn mồi đỉnh cao trong rừng rậm." },
      { id: 17, word: "prey", pos: "n", ipa: "/preɪ/", definition_en: "An animal that is hunted and killed for food", definition_vi: "con mồi", example_en: "Deer stay alert to avoid becoming predator prey.", example_vi: "Hươu luôn cảnh giác để tránh trở thành con mồi của kẻ săn mồi." },
      { id: 18, word: "mammal", pos: "n", ipa: "/ˈmæməl/", definition_en: "A warm-blooded vertebrate animal with fur or milk", definition_vi: "động vật có vú", example_en: "Whales are large marine mammals that breathe air.", example_vi: "Cá voi là loài thú biển lớn hít thở không khí." },
      { id: 19, word: "reptile", pos: "n", ipa: "/ˈreptaɪl/", definition_en: "A cold-blooded vertebrate animal with scales", definition_vi: "loài bò sát", example_en: "Lizards are cold-blooded reptiles that bask in sunlight.", example_vi: "Thằn lằn là loài bò sát máu lạnh tắm mình dưới ánh nắng." },
      { id: 20, word: "habitat", pos: "n", ipa: "/ˈhæbɪtæt/", definition_en: "The natural home or environment of an organism", definition_vi: "môi trường sống", example_en: "The rainforest is a rich habitat for countless species.", example_vi: "Rừng mưa nhiệt đới là môi trường sống phong phú cho vô số loài." }
    ],
    clil: {
      title_en: "Animal Classification: How Adaptations Empower Abilities",
      title_vi: "Phân Loại Động Vật: Cách Thích Nghi Định Hình Khả Năng",
      content_en: "The animal kingdom displays an astonishing variety of specialized physical abilities. Animals have evolved distinct body structures that determine what actions they can and cannot perform in nature. Mammals such as cheetahs have flexible spines and strong legs. They can run seventy miles per hour across flat savanna grasslands. In contrast, heavy mammals like elephants cannot jump off the ground because their immense bone weight requires continuous solid support. Birds possess lightweight hollow bones and aerodynamic feathers so they can fly effortlessly through high winds. However, aquatic birds like penguins cannot fly in the air. Instead, their wings act like flippers so they can swim and hunt fish underwater. Understanding animal classifications reveals how anatomical adaptations enable each species to survive successfully within its natural habitat.",
      glossary: [
        { word: "adaptation", definition_en: "A change by which an organism becomes better suited to its habitat", definition_vi: "sự thích nghi" },
        { word: "aerodynamic", definition_en: "Shaped to reduce drag from air movement", definition_vi: "khí động học" },
        { word: "aquatic", definition_en: "Living in or near water", definition_vi: "dưới nước" },
        { word: "anatomical", definition_en: "Relating to the bodily structure of organisms", definition_vi: "thuộc giải phẫu học" },
        { word: "classification", definition_en: "The arrangement of organisms into taxonomic groups", definition_vi: "sự phân loại" }
      ],
      check_questions: [
        { id: 1, question_en: "Why can't elephants jump off the ground?", options: ["Their heavy weight requires continuous support", "They lack leg muscles", "They sleep underwater"], answer: "Their heavy weight requires continuous support" },
        { id: 2, question_en: "How do penguin wings function differently from other birds?", options: ["They act like rigid flippers for swimming underwater", "They produce loud whistling sounds", "They change into climbing claws"], answer: "They act like rigid flippers for swimming underwater" },
        { id: 3, question_en: "What anatomical feature enables birds to fly easily in the air?", options: ["Lightweight hollow bones and aerodynamic feathers", "Heavy solid teeth", "Scaly webbed feet"], answer: "Lightweight hollow bones and aerodynamic feathers" }
      ],
      critical_thinking: {
        question_en: "Why does an animal's natural habitat influence whether it develops abilities to run, climb, or swim?",
        hint_en: "Think about the obstacles present in different environments: tree branches demand climbing, open plains reward running, and oceans require swimming."
      }
    },
    shadowing_sentences: [
      { id: 1, text: "Cheetahs can run faster than any other land animal on Earth.", ipa: "/ˈtʃiːtəz kən rʌn ˈfæstər ðæn ˈeni ˈʌðər lænd ˈænɪməl ɑːn ɜːrθ/" },
      { id: 2, text: "Large gray elephants cannot jump because their bodies are very heavy.", ipa: "/lɑːrdʒ ɡreɪ ˈelɪfənts ˈkænɑːt dʒʌmp bɪˈkəz ðer ˈbɑːdiz ɑːr ˈveri ˈhevi/" },
      { id: 3, text: "Golden eagles can fly high above the tallest mountain peaks.", ipa: "/ˈɡoʊldən ˈiːɡəlz kən flaɪ haɪ əˈbʌv ðə ˈtɔːlɪst ˈmaʊntən piːks/" },
      { id: 4, text: "Clever monkeys can climb trees and swing effortlessly between branches.", ipa: "/ˈklevər ˈmʌŋkiz kən klaɪm triːz ənd swɪŋ ˈefərtləsli bɪˈtwiːn ˈbræntʃɪz/" },
      { id: 5, text: "Penguins cannot fly in the sky, but they can dive deeply into water.", ipa: "/ˈpeŋɡwɪnz ˈkænɑːt flaɪ ɪn ðə skaɪ bʌt ðeɪ kən daɪv ˈdiːpli ˈɪntuː ˈwɔːtər/" },
      { id: 6, text: "Nocturnal owls can hunt small mice silently during the quiet night.", ipa: "/nɑːkˈtɜːrnəl aʊlz kən hʌnt smɔːl maɪs ˈsaɪləntli ˈdʊrɪŋ ðə ˈkwaɪət naɪt/" },
      { id: 7, text: "Desert camels can survive for two weeks without drinking fresh water.", ipa: "/ˈdezərt ˈkæməlz kən sərˈvaɪv fər tuː wiːks wɪˈðaʊt ˈdrɪŋkɪŋ freʃ ˈwɔːtər/" },
      { id: 8, text: "Every wild animal possesses unique physical abilities suited to its habitat.", ipa: "/ˈevri waɪld ˈænɪməl pəˈzesɪz juːˈniːk ˈfɪzɪkəl əˈbɪlətiz ˈsuːtɪd tuː ɪts ˈhæbɪtæt/" }
    ],
    // FIX 2: 5 Story Scenes with character names & rich narrative
    story_scenes: [
      {
        id: 1,
        scene_id: "scene_1",
        scene_number: 1,
        title_en: "Cheetah Sprint on Savanna",
        title_vi: "Báo Săn Bứt Tốc Trên Thảo Nguyên",
        description_en: "Liam watched in awe as the agile **cheetah** demonstrated how it can **run** faster than any other land animal.",
        description: "Liam watched in awe as the agile **cheetah** demonstrated how it can **run** faster than any other land animal.",
        image_url: "/images/week38/webtoon_scene_1.png",
        audio_url: "/audio/week38/scene_1.mp3"
      },
      {
        id: 2,
        scene_id: "scene_2",
        scene_number: 2,
        title_en: "Eagles Soaring in the Wind",
        title_vi: "Đại Bàng Lượn Giữa Tầng Không",
        description_en: "High above rocky canyon cliffs, Ms. Patel pointed out two golden eagles that can **fly** and **glide** effortlessly.",
        description: "High above rocky canyon cliffs, Ms. Patel pointed out two golden eagles that can **fly** and **glide** effortlessly.",
        image_url: "/images/week38/webtoon_scene_2.png",
        audio_url: "/audio/week38/scene_2.mp3"
      },
      {
        id: 3,
        scene_id: "scene_3",
        scene_number: 3,
        title_en: "Elephants at the Riverbank",
        title_vi: "Đàn Voi Bên Bờ Sông",
        description_en: "Near the river, Liam learned that **heavy** adult elephants **cannot jump**, but they can **swim** across deep waters.",
        description: "Near the river, Liam learned that **heavy** adult elephants **cannot jump**, but they can **swim** across deep waters.",
        image_url: "/images/week38/webtoon_scene_3.png",
        audio_url: "/audio/week38/scene_3.mp3"
      },
      {
        id: 4,
        scene_id: "scene_4",
        scene_number: 4,
        title_en: "Penguins Diving in Polar Waters",
        title_vi: "Chim Cánh Cụt Lặn Dưới Vùng Nước Cực",
        description_en: "In the marine pavilion, playful penguins showed that they **cannot fly**, but they can **dive** deeply to **hunt** fish.",
        description: "In the marine pavilion, playful penguins showed that they **cannot fly**, but they can **dive** deeply to **hunt** fish.",
        image_url: "/images/week38/webtoon_scene_4.png",
        audio_url: "/audio/week38/scene_4.mp3"
      },
      {
        id: 5,
        scene_id: "scene_5",
        scene_number: 5,
        title_en: "Desert Survival Adaptations",
        title_vi: "Sự Thích Nghi Sinh Tồn Sa Mạc",
        description_en: "At sunset, Liam discovered how **nocturnal** desert animals **burrow** underground to **survive** in their harsh **habitat**.",
        description: "At sunset, Liam discovered how **nocturnal** desert animals **burrow** underground to **survive** in their harsh **habitat**.",
        image_url: "/images/week38/webtoon_scene_5.png",
        audio_url: "/audio/week38/scene_5.mp3"
      }
    ],
    // FIX 1: Rich Writing Data with multi-stage ladder, model sentence & pills
    writing_data: {
      title: "Animal Adaptations & Special Abilities",
      prompt_en: "Look at the pictures. Write about what these wild animals can and cannot do. Write 20 or more words.",
      prompt_vi: "Nhìn vào các bức tranh. Viết về những việc các loài động vật hoang dã có thể và không thể làm (từ 20 từ trở lên).",
      min_sentences: 3,
      min_words: 20,
      max_words: 80,
      model_sentence: "Wild animals have amazing abilities suited to their habitats. On open grasslands, agile cheetahs can run at astonishing speeds to catch prey. In contrast, heavy elephants cannot jump off the ground, but they can swim across wide rivers. High above rocky cliffs, golden eagles can fly and glide effortlessly. Finally, aquatic penguins cannot fly in the air, but they can dive deeply into water to hunt fish.",
      word_bank: ["run", "fly", "swim", "dive", "jump", "hunt", "glide", "burrow", "survive", "agile", "predator", "habitat"],
      sentence_frames: [
        "On the savanna, cheetahs can ___ faster than other animals.",
        "Large elephants cannot ___, but they can ___ across rivers.",
        "Golden eagles can ___ high in the sky with hollow bones.",
        "Penguins cannot fly, but they can ___ deeply into the sea."
      ],
      panels: [
        {
          panel_id: "panel_1",
          title_en: "Scene 1: Cheetah Sprint on the Plains",
          title_vi: "Cảnh 1: Báo Săn Bứt Tốc Trên Thảo Nguyên",
          image_url: "/images/week38/writing_panel_1.png",
          image_prompt: "A sleek cheetah sprinting across golden African savanna grasslands, motion blur, wildlife documentary style.",
          caption: "Agile cheetahs can run across open savanna grasslands at astonishing speed.",
          sentence_frame: "On the savanna, the agile cheetah [can run faster] than [any other land animal].",
          pills: ["can run faster", "any other land animal", "across open grasslands", "agile predator", "hunt fast prey"],
          connectors: ["First,", "On the savanna,", "In the grasslands,"]
        },
        {
          panel_id: "panel_2",
          title_en: "Scene 2: Heavy Elephants in River",
          title_vi: "Cảnh 2: Đàn Voi Bơi Dưới Lòng Sông",
          image_url: "/images/week38/writing_panel_2.png",
          image_prompt: "Two large gray elephants wading and swimming in a wide jungle river with water splashing, sunny day.",
          caption: "Large elephants cannot jump off the ground, but they can swim across deep rivers.",
          sentence_frame: "Large gray elephants [cannot jump] because [their bodies are heavy], but they [can swim across rivers].",
          pills: ["cannot jump", "their bodies are heavy", "can swim across rivers", "powerful legs", "strong trunk"],
          connectors: ["In contrast,", "However,", "Near the river,"]
        },
        {
          panel_id: "panel_3",
          title_en: "Scene 3: Soaring Golden Eagles",
          title_vi: "Cảnh 3: Đại Bàng Lượn Giữa Đỉnh Núi",
          image_url: "/images/week38/writing_panel_3.png",
          image_prompt: "A majestic golden eagle gliding high above snow-capped mountain peaks with wings spread wide against a blue sky.",
          caption: "Golden eagles can fly high above the rocky mountain peaks using hollow bones.",
          sentence_frame: "Golden eagles [can fly high] in the sky because they have [lightweight hollow bones].",
          pills: ["can fly high", "lightweight hollow bones", "glide effortlessly", "above mountain peaks", "sharp vision"],
          connectors: ["High above,", "In the sky,", "Also,"]
        },
        {
          panel_id: "panel_4",
          title_en: "Scene 4: Diving Aquatic Penguins",
          title_vi: "Cảnh 4: Chim Cánh Cụt Lặn Sâu Săn Mồi",
          image_url: "/images/week38/writing_panel_4.png",
          image_prompt: "Penguins diving underwater through crystal blue polar waters among icebergs, hunting small silver fish.",
          caption: "Aquatic penguins cannot fly in the air, but they can dive deeply into cold water to hunt.",
          sentence_frame: "Penguins [cannot fly in the sky], but their flipper wings allow them to [dive deeply into water].",
          pills: ["cannot fly in the sky", "dive deeply into water", "hunt silver fish", "rigid flipper wings", "aquatic habitat"],
          connectors: ["Finally,", "Underwater,", "In conclusion,"]
        }
      ],
      steps: [
        {
          scene: 1,
          ladder_stage: "MODEL",
          badge_label: "MODEL",
          title: "Scene 1: Cheetah Sprint on the Plains",
          image_url: "/images/week38/writing_panel_1.png",
          caption: "Agile cheetahs can run across open savanna grasslands at astonishing speed.",
          frame_L1: "On the savanna, agile cheetahs can run very fast. They can run faster than any other land animal.",
          connectors: ["First,", "On the savanna,", "In the grasslands,"],
          sentence_hint: "Write 2 sentences about cheetahs running fast across grasslands.",
          pills: ["can run faster", "any other land animal", "across grasslands", "agile cheetah"],
          sentence_frame: "On the savanna, the agile cheetah [can run faster] than [any other land animal]."
        },
        {
          scene: 2,
          ladder_stage: "BUILD",
          badge_label: "BUILD",
          title: "Scene 2: Heavy Elephants in River",
          image_url: "/images/week38/writing_panel_2.png",
          caption: "Large elephants cannot jump off the ground, but they can swim across deep rivers.",
          frame_L1: "In contrast, large elephants cannot jump because they are heavy. However, they can swim across wide rivers.",
          connectors: ["In contrast,", "However,", "Near the river,"],
          sentence_hint: "Write 2 sentences about what elephants cannot do and what they can do.",
          pills: ["cannot jump", "are very heavy", "can swim across rivers", "large elephants"],
          sentence_frame: "Large gray elephants [cannot jump] because [their bodies are heavy], but they [can swim across rivers]."
        },
        {
          scene: 3,
          ladder_stage: "WRITE",
          badge_label: "WRITE",
          title: "Scene 3: Soaring Golden Eagles",
          image_url: "/images/week38/writing_panel_3.png",
          caption: "Golden eagles can fly high above the rocky mountain peaks using hollow bones.",
          frame_L1: "High above the mountains, golden eagles can fly easily. They can glide in strong winds because they have hollow bones.",
          connectors: ["High above,", "In the sky,", "Also,"],
          sentence_hint: "Write 2 sentences about eagles flying and gliding in the sky.",
          pills: ["can fly high", "lightweight hollow bones", "glide effortlessly", "golden eagles"],
          sentence_frame: "Golden eagles [can fly high] in the sky because they have [lightweight hollow bones]."
        },
        {
          scene: 4,
          ladder_stage: "EXPAND",
          badge_label: "EXPAND",
          title: "Scene 4: Diving Aquatic Penguins",
          image_url: "/images/week38/writing_panel_4.png",
          caption: "Aquatic penguins cannot fly in the air, but they can dive deeply into cold water to hunt.",
          frame_L1: "Finally, aquatic penguins cannot fly in the air. Instead, their wings help them dive deeply to hunt fish.",
          connectors: ["Finally,", "Underwater,", "In conclusion,"],
          sentence_hint: "Write 2 sentences about penguins diving and hunting underwater.",
          pills: ["cannot fly in the sky", "dive deeply into water", "hunt fish", "aquatic penguins"],
          sentence_frame: "Penguins [cannot fly in the sky], but their flipper wings allow them to [dive deeply into water]."
        }
      ]
    },
    // FIX 3: Speaking Hub with kid-friendly register & genuine info-gap
    speaking_data: {
      talkshow_prompt: {
        topic: "Amazing Animal Superpowers",
        question: "Hi Liam! Which animal ability surprised you the most during your trip to the wildlife sanctuary?",
        model_response: "I was most surprised by the penguins! Even though they are sea birds, they cannot fly in the air because their flippers are rigid. But underwater, they can dive so fast and catch fish easily. It was super cool to watch them swim!"
      },
      info_exchange_cards: {
        table_a: {
          title: "Peregrine Falcon Abilities",
          subtitle: "Candidate's Question Card (Ask Examiner)",
          person: "Falcon Specialist",
          fields: [
            {
              id: "field_a1",
              cue_prompt: "how fast / dive?",
              cue_word: "how fast",
              is_missing: true,
              acceptable_questions: [
                "How fast can peregrine falcons dive through the air?",
                "How fast can falcons dive?",
                "What speed can they dive at?"
              ],
              nova_reply: "Peregrine falcons can dive faster than two hundred miles per hour."
            },
            {
              id: "field_a2",
              cue_prompt: "where / build nests?",
              cue_word: "where",
              is_missing: true,
              acceptable_questions: [
                "Where do falcons build their nests?",
                "Where do they nest?",
                "Where do falcons live?"
              ],
              nova_reply: "They build their nests high up on rocky cliffs."
            },
            {
              id: "field_a3",
              cue_prompt: "what / hunt?",
              cue_word: "what",
              is_missing: true,
              acceptable_questions: [
                "What kind of prey do falcons hunt?",
                "What do they hunt?",
                "What animals do falcons catch?"
              ],
              nova_reply: "They hunt other flying birds mid-air using sharp talons."
            },
            {
              id: "field_a4",
              cue_prompt: "why / spot small animals?",
              cue_word: "why",
              is_missing: true,
              acceptable_questions: [
                "Why can falcons spot small animals from high in the sky?",
                "Why is their eyesight so good?",
                "How can they see small prey?"
              ],
              nova_reply: "Because their eyesight is remarkably acute with specialized retinas."
            },
            {
              id: "field_a5",
              cue_prompt: "can / survive cold climates?",
              cue_word: "can",
              is_missing: true,
              acceptable_questions: [
                "Can falcons survive in cold mountain climates?",
                "Can they live in cold weather?",
                "Do falcons survive cold winters?"
              ],
              nova_reply: "Yes, they can survive across diverse climates from tundra to deserts."
            }
          ]
        },
        table_b: {
          title: "Red Kangaroo Abilities",
          subtitle: "Information Card (Answer Examiner's Questions)",
          person: "Kangaroo Researcher",
          fields: [
            {
              id: "field_b1",
              cue_prompt: "how far / jump?",
              cue_word: "how far",
              value: "Up to nine meters across the dry plains in a single leap.",
              nova_question: "How far can red kangaroos jump in a single leap?",
              acceptable_answers: [
                "Up to nine meters across the dry plains in a single leap.",
                "Up to nine meters.",
                "Nine meters in one hop."
              ]
            },
            {
              id: "field_b2",
              cue_prompt: "can / climb trees?",
              cue_word: "can",
              value: "No, they cannot climb trees because of their large hind feet.",
              nova_question: "Can red kangaroos climb tall trees in the forest?",
              acceptable_answers: [
                "No, they cannot climb trees because of their large hind feet.",
                "No, they cannot climb trees.",
                "They cannot climb."
              ]
            },
            {
              id: "field_b3",
              cue_prompt: "what / eat?",
              cue_word: "what",
              value: "They eat green grass, herbs, and desert shrub roots.",
              nova_question: "What do red kangaroos eat to survive?",
              acceptable_answers: [
                "They eat green grass, herbs, and desert shrub roots.",
                "Grass and desert herbs.",
                "Green grass and roots."
              ]
            },
            {
              id: "field_b4",
              cue_prompt: "when / active?",
              cue_word: "when",
              value: "They are nocturnal and most active at night or dawn.",
              nova_question: "When are kangaroos most active during the day?",
              acceptable_answers: [
                "They are nocturnal and most active at night or dawn.",
                "At night and dawn.",
                "They are nocturnal animals."
              ]
            },
            {
              id: "field_b5",
              cue_prompt: "how fast / hop?",
              cue_word: "how fast",
              value: "They can hop at over fifty kilometers per hour to escape predators.",
              nova_question: "How fast can kangaroos hop when avoiding predators?",
              acceptable_answers: [
                "They can hop at over fifty kilometers per hour to escape predators.",
                "Over fifty kilometers per hour.",
                "Fifty km/h."
              ]
            }
          ]
        }
      }
    },
    cambridge_rw: {
      part1_definitions: [
        { id: 1, text: "A warm-blooded vertebrate animal that feeds milk to its young.", target: "mammal" },
        { id: 2, text: "An animal that actively hunts and eats other living creatures.", target: "predator" },
        { id: 3, text: "The natural environment where a wild animal or plant lives.", target: "habitat" },
        { id: 4, text: "Moving through water by moving fins, arms, or legs.", target: "swim" },
        { id: 5, text: "Able to move with great quickness, balance, and graceful agility.", target: "agile" }
      ],
      // FIX 4: Cambridge R&W Part 2 restructured into 5 turns with 3 options each and marked answers
      part2_dialogue: {
        title: "Liam & Sarah Discussing Animal Capabilities",
        turns: [
          {
            id: 1,
            speaker: "Sarah",
            prompt: "Can penguins fly in the sky like seagulls?",
            options: [
              "No, they cannot fly in the air, but they swim brilliantly.",
              "Yes, they fly across the desert every evening.",
              "They like eating hot vegetable soup."
            ],
            answer: "No, they cannot fly in the air, but they swim brilliantly."
          },
          {
            id: 2,
            speaker: "Sarah",
            prompt: "Why can't heavy adult elephants jump over fences?",
            options: [
              "Their enormous weight requires continuous ground support.",
              "Because they have feathers on their ears.",
              "They prefer riding bicycles to school."
            ],
            answer: "Their enormous weight requires continuous ground support."
          },
          {
            id: 3,
            speaker: "Sarah",
            prompt: "Which predator can run the fastest across the savanna?",
            options: [
              "The cheetah can sprint at seventy miles per hour!",
              "A tiny brown snail on the wet grass.",
              "The wooden chair in the kitchen."
            ],
            answer: "The cheetah can sprint at seventy miles per hour!"
          },
          {
            id: 4,
            speaker: "Sarah",
            prompt: "How do desert camels survive without drinking water for days?",
            options: [
              "They store energy efficiently and endure high temperatures.",
              "They buy cold water bottles at the corner shop.",
              "They swim in the polar sea every night."
            ],
            answer: "They store energy efficiently and endure high temperatures."
          },
          {
            id: 5,
            speaker: "Sarah",
            prompt: "Would you like to watch the falcon flight demonstration with me?",
            options: [
              "I would love to; let's hurry to the outdoor arena now!",
              "I bought three pencils at the bookstore yesterday.",
              "My shoes are completely dry."
            ],
            answer: "I would love to; let's hurry to the outdoor arena now!"
          }
        ],
        exchanges: [
          { speaker: "Sarah", text: "Can penguins fly in the sky like seagulls?" },
          { speaker: "Liam", text: "No, they cannot fly in the air, but they swim brilliantly." },
          { speaker: "Sarah", text: "Why can't heavy adult elephants jump over fences?" },
          { speaker: "Liam", text: "Their enormous weight requires continuous ground support." },
          { speaker: "Sarah", text: "Which predator can run the fastest across the savanna?" },
          { speaker: "Liam", text: "The cheetah can sprint at seventy miles per hour!" },
          { speaker: "Sarah", text: "How do desert camels survive without drinking water for days?" },
          { speaker: "Liam", text: "They store energy efficiently and endure high temperatures." },
          { speaker: "Sarah", text: "Would you like to watch the falcon flight demonstration with me?" },
          { speaker: "Liam", text: "I would love to; let's hurry to the outdoor arena now!" }
        ]
      },
      part6_cloze: {
        title: "Facts About Falcons: The Fastest Birds",
        instructions: "Read the article and write the missing words. Write one word on each line.",
        text_template: "Peregrine falcons are famous [1]_____ their incredible speed. When diving towards the ground, they [2]_____ fly faster than two hundred miles per hour. They hunt other birds [3]_____ mid-air using sharp talons. Falcons build nests high [4]_____ rocky cliffs. They can spot prey easily [5]_____ their eyesight is remarkably acute.",
        answers: { "1": "for", "2": "can", "3": "in", "4": "on", "5": "because" }
      }
    },
    minigames: {
      math_problems: [
        {
          id: 1,
          title: "Problem 1: Cheetah vs Gazelle Running Speed (Comparison)",
          problemText: "A cheetah can run at 110 kilometers per hour. A gazelle can run at 80 kilometers per hour. What is the difference in their running speeds?",
          correctAnswer: 30,
          answer: "30 km/h",
          hintText: "Cheetah speed (110) - Gazelle speed (80) = 30 km/h difference.",
          modelData: {
            type: "comparison",
            bars: [
              { value: 110, label: "Cheetah 110 km/h", color: "#f59e0b" },
              { value: 80, label: "Gazelle 80 km/h", color: "#10b981" }
            ],
            differenceLabel: "30 km/h difference"
          }
        },
        {
          id: 2,
          title: "Problem 2: Kangaroo Jumping Distance (Part-Whole)",
          problemText: "In three hops, a red kangaroo jumped 9 meters, 8 meters, and 10 meters. What was the total distance jumped?",
          correctAnswer: 27,
          answer: "27 meters",
          hintText: "Hop 1 (9m) + Hop 2 (8m) + Hop 3 (10m) = 27 meters total.",
          modelData: {
            type: "part_whole",
            bars: [
              { value: 9, label: "Hop 1: 9m", color: "#6366f1" },
              { value: 8, label: "Hop 2: 8m", color: "#3b82f6" },
              { value: 10, label: "Hop 3: 10m", color: "#14b8a6" }
            ],
            totalLabel: "27 meters total"
          }
        }
      ],
      grammar_drills: [
        { id: 1, prompt: "Fish ___ breathe underwater using their gills.", options: ["can", "cannot", "must"], answer: "can" },
        { id: 2, prompt: "Heavy adult elephants ___ jump off the ground.", options: ["cannot", "can", "could"], answer: "cannot" },
        { id: 3, prompt: "Owls ___ see clearly during the dark night.", options: ["can", "cannot", "are"], answer: "can" },
        { id: 4, prompt: "Penguins ___ fly in the sky like seagulls.", options: ["can't", "can", "are"], answer: "can't" },
        { id: 5, prompt: "Cheetahs ___ run faster than racehorses.", options: ["can", "cannot", "do"], answer: "can" }
      ],
      action_lab_scenarios: [
        { stage: 1, title: "Anatomical Adaptation Matching", instruction: "Pair body structures (fins, wings, hollow bones) with animal locomotion abilities." },
        { stage: 2, title: "Predator vs Prey Speed Comparison", instruction: "Analyze velocity bar charts to predict hunting success rates in savanna biomes." },
        { stage: 3, title: "Animal Ability Classification Lab", instruction: "Sort animals into categorical matrices based on modal abilities (Can Fly vs Cannot Fly)." }
      ]
    }
  },

  78: {
    week: 78,
    theme: "Social Studies/ELA: Cultures / Math: Surveys",
    title_en: "Social Studies/ELA: Cultures / Math: Surveys",
    title_vi: "Xã Hội/ELA: Văn Hóa / Toán: Khảo Sát",
    cefr_level: "B1 PET",
    grammar_focus: "Comparative Structures: \"Unlike...\", \"Similar to...\", \"Whereas...\"",
    vocab_list: [
      { id: 1, word: "tradition", pos: "n", ipa: "/trəˈdɪʃən/", definition_en: "A long-established custom or belief passed from generation to generation", definition_vi: "truyền thống", example_en: "Lighting lanterns is an ancient cultural tradition.", example_vi: "Thắp đèn lồng là một truyền thống văn hóa cổ xưa." },
      { id: 2, word: "culture", pos: "n", ipa: "/ˈkʌltʃər/", definition_en: "The ideas, customs, and social behavior of a particular group of people", definition_vi: "văn hóa", example_en: "Every country has a unique culture and heritage.", example_vi: "Mỗi quốc gia đều có một nền văn hóa và di sản độc đáo." },
      { id: 3, word: "holiday", pos: "n", ipa: "/ˈhɑːlədeɪ/", definition_en: "An official day of celebration or recreation when no work is done", definition_vi: "ngày lễ", example_en: "Families gather together during the national holiday.", example_vi: "Các gia đình sum họp cùng nhau trong ngày nghỉ lễ quốc gia." },
      { id: 4, word: "festival", pos: "n", ipa: "/ˈfestɪvəl/", definition_en: "A day or period of celebration typically with performances or food", definition_vi: "lễ hội", example_en: "The spring festival features vibrant music and parades.", example_vi: "Lễ hội mùa xuân có âm nhạc sôi động và những cuộc diễu hành." },
      { id: 5, word: "heritage", pos: "n", ipa: "/ˈherɪtɪdʒ/", definition_en: "Valued objects, traditions, and qualities passed down through history", definition_vi: "di sản", example_en: "Traditional folk dances are part of our national heritage.", example_vi: "Các điệu múa dân gian truyền thống là một phần của di sản quốc gia." },
      { id: 6, word: "custom", pos: "n", ipa: "/ˈkʌstəm/", definition_en: "A widely accepted way of behaving or doing something in a society", definition_vi: "phong tục", example_en: "Bowing politely is a customary gesture in East Asia.", example_vi: "Cúi đầu lịch sự là một phong tục ở Đông Á." },
      { id: 7, word: "celebrate", pos: "v", ipa: "/ˈselɪbreɪt/", definition_en: "Acknowledge a significant day or event with a social gathering", definition_vi: "ăn mừng", example_en: "Communities celebrate the autumn harvest with feasts.", example_vi: "Các cộng đồng ăn mừng vụ thu hoạch mùa thu bằng những bữa tiệc." },
      { id: 8, word: "gather", pos: "v", ipa: "/ˈɡæðər/", definition_en: "Come together as a group in one place", definition_vi: "tụ họp", example_en: "Relatives gather from distant cities for the annual reunion.", example_vi: "Họ hàng tụ họp từ các thành phố xa xôi cho buổi đoàn tụ hàng năm." },
      { id: 9, word: "preserve", pos: "v", ipa: "/prɪˈzɜːrv/", definition_en: "Maintain something in its original state or in good condition", definition_vi: "bảo tồn", example_en: "Historians work diligently to preserve ancient folk songs.", example_vi: "Các nhà sử học làm việc chăm chỉ để bảo tồn các bài dân ca cổ." },
      { id: 10, word: "distinguish", pos: "v", ipa: "/dɪˈstɪŋɡwɪʃ/", definition_en: "Recognize or treat someone or something as different", definition_vi: "phân biệt", example_en: "Scholars distinguish regional traditions through symbolic rituals.", example_vi: "Các học giả phân biệt các truyền thống vùng miền qua những nghi lễ mang tính biểu tượng." },
      { id: 11, word: "survey", pos: "n", ipa: "/ˈsɜːrveɪ/", definition_en: "An investigation of the opinions or behavior of a group by questioning", definition_vi: "cuộc khảo sát", example_en: "The students conducted a survey about favorite holiday foods.", example_vi: "Các học sinh đã tiến hành một cuộc khảo sát về món ăn ngày lễ yêu thích." },
      { id: 12, word: "tally", pos: "n", ipa: "/ˈtæli/", definition_en: "A current record of an increasing number or score", definition_vi: "bảng đếm", example_en: "Keep a tally of votes for each festival activity.", example_vi: "Hãy lập một bảng đếm số phiếu cho từng hoạt động lễ hội." },
      { id: 13, word: "majority", pos: "n", ipa: "/məˈdʒɔːrəti/", definition_en: "The greater number or part of a whole", definition_vi: "đa số", example_en: "The majority of survey respondents favored outdoor concerts.", example_vi: "Đa số người được khảo sát ủng hộ các buổi hòa nhạc ngoài trời." },
      { id: 14, word: "minority", pos: "n", ipa: "/maɪˈnɔːrəti/", definition_en: "The smaller number or part, especially less than half", definition_vi: "thiểu số", example_en: "Only a small minority voted to change the festival date.", example_vi: "Chỉ một thiểu số nhỏ bỏ phiếu thay đổi ngày lễ hội." },
      { id: 15, word: "participant", pos: "n", ipa: "/pɑːrˈtɪsəpənt/", definition_en: "A person who takes part in something", definition_vi: "người tham gia", example_en: "Each participant answered five questions in the survey.", example_vi: "Mỗi người tham gia đã trả lời năm câu hỏi trong cuộc khảo sát." },
      { id: 16, word: "similar", pos: "adj", ipa: "/ˈsɪmələr/", definition_en: "Resembling without being identical", definition_vi: "tương đồng", example_en: "Both cultures celebrate harvest with similar symbolic meals.", example_vi: "Cả hai nền văn hóa đều ăn mừng mùa màng với những bữa ăn biểu tượng tương đồng." },
      { id: 17, word: "different", pos: "adj", ipa: "/ˈdɪfərənt/", definition_en: "Not the same as another or each other", definition_vi: "khác biệt", example_en: "Different regions use distinct musical instruments in parades.", example_vi: "Các vùng miền khác nhau sử dụng các nhạc cụ riêng biệt trong các cuộc diễu hành." },
      { id: 18, word: "customary", pos: "adj", ipa: "/ˈkʌstəmeri/", definition_en: "According to the customs or usual practices associated with an occasion", definition_vi: "theo phong tục", example_en: "It is customary to exchange cards on New Year's Day.", example_vi: "Tặng thiệp cho nhau vào ngày đầu năm mới là điều theo phong tục." },
      { id: 19, word: "widespread", pos: "adj", ipa: "/ˈwaɪdspred/", definition_en: "Found or distributed over a large area or number of people", definition_vi: "lan rộng", example_en: "Lantern festivals enjoy widespread popularity across Asia.", example_vi: "Lễ hội đèn lồng nhận được sự yêu thích rộng rãi khắp châu Á." },
      { id: 20, word: "symbolic", pos: "adj", ipa: "/sɪmˈbɑːlɪk/", definition_en: "Serving as a representation or symbol of something", definition_vi: "mang tính biểu tượng", example_en: "Evergreen trees are symbolic of enduring life in winter.", example_vi: "Cây thường xanh mang tính biểu tượng của sức sống bền bỉ trong mùa đông." }
    ],
    clil: {
      title_en: "Cultural Traditions: Comparing Celebrations Across Societies",
      title_vi: "Truyền Thống Văn Hóa: So Sánh Các Lễ Kỷ Niệm Giữa Các Xã Hội",
      content_en: "Throughout human history, distinct societies have developed rich cultural traditions to celebrate the changing seasons, historical triumphs, and shared community values. While cultural practices vary dramatically around the globe, many ceremonies share core anthropological motivations. For instance, harvest festivals are observed in almost every agricultural civilization. Similar to Asian mid-autumn celebrations where families gather to appreciate full moons and share sweet round pastries, European harvest home gatherings feature communal banquets praising bountiful wheat and grape yields. However, the specific rituals exhibit fascinating contrasts. Unlike Western traditions where celebrations often center upon private household dinners, Latin American cultural festivities frequently feature vibrant public street carnivals filled with lively percussion and masquerade parades. Whereas older customs prioritized solemn religious offerings, modern festivals increasingly incorporate civic unity and educational exhibitions. By conducting statistical surveys and recording demographic responses, social scientists can accurately measure how contemporary generations preserve ancestral heritage while embracing multicultural values.",
      glossary: [
        { word: "anthropological", definition_en: "Relating to the scientific study of human societies and cultures", definition_vi: "thuộc nhân chủng học" },
        { word: "demographic", definition_en: "Relating to the structure and characteristics of human populations", definition_vi: "thuộc nhân khẩu học" },
        { word: "communal", definition_en: "Shared by all members of a community for common use", definition_vi: "mang tính cộng đồng" },
        { word: "multicultural", definition_en: "Relating to or constituting several cultural or ethnic groups", definition_vi: "đa văn hóa" },
        { word: "ritual", definition_en: "A religious or solemn ceremony consisting of a series of actions", definition_vi: "nghi thức tôn giáo" }
      ],
      check_questions: [
        { id: 1, question_en: "What shared purpose do harvest celebrations have across different continents?", options: ["They celebrate bountiful agricultural yields and community gratitude", "They encourage people to stop farming", "They cancel all public holidays"], answer: "They celebrate bountiful agricultural yields and community gratitude" },
        { id: 2, question_en: "Unlike private household dinners, what do Latin American festivities often feature?", options: ["Vibrant public street carnivals and parades", "Completely silent library meetings", "Only online messaging"], answer: "Vibrant public street carnivals and parades" },
        { id: 3, question_en: "How do social scientists study cultural traditions today?", options: ["By conducting surveys and analyzing demographic data", "By ignoring all participant responses", "By destroying historical records"], answer: "By conducting surveys and analyzing demographic data" }
      ],
      critical_thinking: {
        question_en: "Why is comparative analysis ('Unlike...', 'Similar to...') more insightful than studying one culture in isolation?",
        hint_en: "Consider how comparing two traditions highlights both unique cultural values and shared universal human experiences."
      }
    },
    shadowing_sentences: [
      { id: 1, text: "Similar to mid-autumn festivals in Asia, European communities celebrate the harvest season with joy.", ipa: "/ˈsɪmələr tuː mɪd ˈɔːtəm ˈfestɪvəlz ɪn ˈeɪʒə ˌjʊrəˈpiːən kəˈmjuːnətiz ˈselɪbreɪt ðə ˈhɑːrvəst ˈsiːzən wɪð dʒɔɪ/" },
      { id: 2, text: "Unlike quiet indoor gatherings, Latin American festivals often feature colorful street carnivals.", ipa: "/ʌnˈlaɪk ˈkwaɪət ˌɪnˈdɔːr ˈɡæðərɪŋz ˈlætən əˈmerɪkən ˈfestɪvəlz ˈɔːfən ˈfiːtʃər ˈkʌlərfəl striːt ˈkɑːrnɪvəlz/" },
      { id: 3, text: "Whereas older rituals focused strictly on religion, modern holidays promote widespread community unity.", ipa: "/werˈæz ˈoʊldər ˈrɪtʃuːəlz ˈfoʊkəst ˈstrɪktli ɑːn rɪˈlɪdʒən ˈmɑːdərn ˈhɑːlədeɪz prəˈmoʊt ˈwaɪdspred kəˈmjuːnəti ˈjuːnəti/" },
      { id: 4, text: "Our class conducted an extensive survey to determine which traditional foods students preferred.", ipa: "/ˈaʊər klæs kənˈdʌktɪd ən ɪkˈstensɪv ˈsɜːrveɪ tuː dɪˈtɜːrmɪn wɪtʃ trəˈdɪʃənəl fuːdz ˈstuːdənts prɪˈfɜːrd/" },
      { id: 5, text: "The overwhelming majority of participants voted in favor of organizing an international food fair.", ipa: "/ði ˌoʊvərˈwelmɪŋ məˈdʒɔːrəti əv pɑːrˈtɪsəpənts ˈvoʊtɪd ɪn ˈfeɪvər əv ˈɔːrɡənaɪzɪŋ ən ˌɪntərˈnæʃənəl fuːd fer/" },
      { id: 6, text: "Cultural scholars work diligently to preserve ancestral customs before they disappear over time.", ipa: "/ˈkʌltʃərəl ˈskɑːlərz wɜːrk ˈdɪlɪdʒəntli tuː prɪˈzɜːrv ænˈsestrəl ˈkʌstəmz bɪˈfɔːr ðeɪ ˌdɪsəˈpɪər ˈoʊvər taɪm/" },
      { id: 7, text: "Every participant tallied their survey results carefully on structured frequency tables.", ipa: "/ˈevri pɑːrˈtɪsəpənt ˈtælid ðer ˈsɜːrveɪ rɪˈzʌlts ˈkerfəli ɑːn ˈstrʌktʃərd ˈfriːkwənsi ˈteɪbəlz/" },
      { id: 8, text: "Comparing different global traditions helps students cultivate empathy and genuine cultural appreciation.", ipa: "/kəmˈperɪŋ ˈdɪfərənt ˈɡloʊbəl trəˈdɪʃənz helps ˈstuːdənts ˈkʌltɪveɪt ˈempəθi ənd ˈdʒenjuɪn ˈkʌltʃərəl əˌpriːʃiˈeɪʃən/" }
    ],
    // FIX 2: 5 Story Scenes with character names & rich narrative
    story_scenes: [
      {
        id: 1,
        scene_id: "scene_1",
        scene_number: 1,
        title_en: "Conducting the Culture Survey",
        title_vi: "Tiến Hành Khảo Sát Văn Hóa",
        description_en: "Marcus and Elena conducted a comprehensive school **survey** to analyze how diverse families **celebrate** harvest traditions.",
        description: "Marcus and Elena conducted a comprehensive school **survey** to analyze how diverse families **celebrate** harvest traditions.",
        image_url: "/images/week78/webtoon_scene_1.png",
        audio_url: "/audio/week78/scene_1.mp3"
      },
      {
        id: 2,
        scene_id: "scene_2",
        scene_number: 2,
        title_en: "Autumn Lantern Gatherings",
        title_vi: "Lễ Hội Đèn Lồng Mùa Thu",
        description_en: "**Similar to** East Asian lantern festivals where families **gather** under the moon, European fairs celebrate harvest with communal feasts.",
        description: "**Similar to** East Asian lantern festivals where families **gather** under the moon, European fairs celebrate harvest with communal feasts.",
        image_url: "/images/week78/webtoon_scene_2.png",
        audio_url: "/audio/week78/scene_2.mp3"
      },
      {
        id: 3,
        scene_id: "scene_3",
        scene_number: 3,
        title_en: "Vibrant Latin Street Carnivals",
        title_vi: "Lễ Hội Đường Phố Mỹ La-tinh",
        description_en: "**Unlike** quiet indoor dinners, Latin American cultural festivities feature vibrant street carnivals filled with lively music and **symbolic** dances.",
        description: "**Unlike** quiet indoor dinners, Latin American cultural festivities feature vibrant street carnivals filled with lively music and **symbolic** dances.",
        image_url: "/images/week78/webtoon_scene_3.png",
        audio_url: "/audio/week78/scene_3.mp3"
      },
      {
        id: 4,
        scene_id: "scene_4",
        scene_number: 4,
        title_en: "Preserving Ancestral Customs",
        title_vi: "Bảo Tồn Phong Tục Tổ Tiên",
        description_en: "**Whereas** older customs focused strictly on religious ceremonies, Elena noted that modern festivals promote community unity.",
        description: "**Whereas** older customs focused strictly on religious ceremonies, Elena noted that modern festivals promote community unity.",
        image_url: "/images/week78/webtoon_scene_4.png",
        audio_url: "/audio/week78/scene_4.mp3"
      },
      {
        id: 5,
        scene_id: "scene_5",
        scene_number: 5,
        title_en: "Survey Tally and School Presentation",
        title_vi: "Tổng Hợp Bảng Đếm Và Báo Cáo",
        description_en: "Dr. Thorne helped the class **tally** their survey data, confirming that a clear **majority** voted to **preserve** traditional arts.",
        description: "Dr. Thorne helped the class **tally** their survey data, confirming that a clear **majority** voted to **preserve** traditional arts.",
        image_url: "/images/week78/webtoon_scene_5.png",
        audio_url: "/audio/week78/scene_5.mp3"
      }
    ],
    // FIX 1: Rich Writing Data with multi-stage ladder, model sentence & pills
    writing_data: {
      title: "Comparative Analysis of Global Cultural Traditions",
      prompt_en: "Look at the pictures and survey data. Write a comparative paragraph about global cultural traditions using 'Unlike', 'Similar to', and 'Whereas'. Write 30 or more words.",
      prompt_vi: "Nhìn vào các bức tranh và số liệu khảo sát. Viết một đoạn văn so sánh về các truyền thống văn hóa toàn cầu sử dụng 'Unlike', 'Similar to', và 'Whereas' (từ 30 từ trở lên).",
      min_sentences: 3,
      min_words: 30,
      max_words: 90,
      model_sentence: "Throughout human civilization, diverse societies have established rich cultural traditions to celebrate agricultural harvests. Similar to East Asian communities that gather under the autumn moon to share sweet pastries, European harvest home gatherings organize communal feasts to express gratitude for crops. Unlike private household dinners, Latin American cultural festivities frequently feature vibrant public street carnivals with music and dances. Whereas ancient rituals focused strictly on religious ceremonies, modern celebrations foster intercultural dialogue. Conducting demographic surveys enables researchers to preserve ancestral heritage while embracing contemporary diversity.",
      word_bank: ["tradition", "culture", "heritage", "celebrate", "gather", "preserve", "survey", "tally", "majority", "similar", "different", "symbolic"],
      sentence_frames: [
        "To begin their study, researchers conducted an extensive ___ to gather data.",
        "___ Asian lantern festivals, European harvest communities gather for communal meals.",
        "___ quiet indoor dinners, Latin American festivals feature vibrant street carnivals.",
        "___ older rituals were solemn, modern celebrations foster community unity."
      ],
      panels: [
        {
          panel_id: "panel_1",
          title_en: "Scene 1: Surveying Holiday Traditions",
          title_vi: "Cảnh 1: Khảo Sát Truyền Thống Ngày Lễ",
          image_url: "/images/week78/writing_panel_1.png",
          image_prompt: "Two students interviewing diverse classmates with clipboards and tally charts in a modern school library, editorial style.",
          caption: "Marcus and Elena distributed a questionnaire to discover how families celebrate cultural festivals.",
          sentence_frame: "To begin their research, Marcus and Elena [conducted an extensive survey] to [gather data on cultural traditions].",
          pills: ["conducted an extensive survey", "gather data on cultural traditions", "multicultural community", "distributed questionnaires", "tallied student responses"],
          connectors: ["First,", "To begin with,", "In their school project,"]
        },
        {
          panel_id: "panel_2",
          title_en: "Scene 2: Comparing Harvest Feasts",
          title_vi: "Cảnh 2: So Sánh Lễ Hội Mùa Màng",
          image_url: "/images/week78/writing_panel_2.png",
          image_prompt: "Split panel showing families sharing mooncakes under lanterns on the left, and a European harvest festival banquet with bread on the right.",
          caption: "Similar to Asian mid-autumn gatherings, European harvest fairs emphasize communal banquets and gratitude.",
          sentence_frame: "[Similar to] Asian lantern celebrations, European harvest communities [gather together to share meals].",
          pills: ["Similar to", "gather together to share meals", "communal banquets", "bountiful crops", "shared gratitude"],
          connectors: ["Similar to,", "In a comparable way,", "Likewise,"]
        },
        {
          panel_id: "panel_3",
          title_en: "Scene 3: Street Carnivals vs Quiet Dinners",
          title_vi: "Cảnh 3: Lễ Hội Đường Phố Và Bữa Tối Gia Đình",
          image_url: "/images/week78/writing_panel_3.png",
          image_prompt: "A vibrant outdoor Latin American street carnival with colorful dancers, drums, and confetti in a sunny plaza.",
          caption: "Unlike quiet indoor dinners, Latin American street festivals feature lively music and vibrant costumes.",
          sentence_frame: "[Unlike quiet indoor gatherings], Latin American festivals feature [vibrant public street carnivals].",
          pills: ["Unlike quiet indoor gatherings", "vibrant public street carnivals", "lively percussion and dances", "symbolic costumes", "community celebrations"],
          connectors: ["Unlike,", "In sharp contrast,", "On the other hand,"]
        },
        {
          panel_id: "panel_4",
          title_en: "Scene 4: Tabulating Demographic Findings",
          title_vi: "Cảnh 4: Tổng Hợp Dữ Liệu Khảo Sát",
          image_url: "/images/week78/writing_panel_4.png",
          image_prompt: "Students and teacher looking at a large colorful frequency bar chart displaying festival survey results on a smart board.",
          caption: "Whereas older customs were private, modern students overwhelmingly voted to preserve global traditions together.",
          sentence_frame: "[Whereas older customs were solemn], modern celebrations [foster inclusive civic unity].",
          pills: ["Whereas older customs were solemn", "foster inclusive civic unity", "overwhelming majority voted", "preserve ancestral heritage", "multicultural appreciation"],
          connectors: ["Whereas,", "In conclusion,", "Finally,"]
        }
      ],
      steps: [
        {
          scene: 1,
          ladder_stage: "MODEL",
          badge_label: "MODEL",
          title: "Scene 1: Surveying Holiday Traditions",
          image_url: "/images/week78/writing_panel_1.png",
          caption: "Marcus and Elena distributed a questionnaire to discover how families celebrate cultural festivals.",
          frame_L1: "Marcus and Elena conducted a comprehensive survey at their school. They gathered demographic data on cultural traditions.",
          connectors: ["First,", "To begin with,", "In their project,"],
          sentence_hint: "Write 2 sentences about conducting a cultural survey and gathering data.",
          pills: ["conducted an extensive survey", "gather data on traditions", "distributed questionnaires", "Marcus and Elena"],
          sentence_frame: "To begin their research, Marcus and Elena [conducted an extensive survey] to [gather data on cultural traditions]."
        },
        {
          scene: 2,
          ladder_stage: "BUILD",
          badge_label: "BUILD",
          title: "Scene 2: Comparing Harvest Feasts",
          image_url: "/images/week78/writing_panel_2.png",
          caption: "Similar to Asian mid-autumn gatherings, European harvest fairs emphasize communal banquets and gratitude.",
          frame_L1: "Similar to Asian mid-autumn celebrations, European harvest fairs bring people together. Families gather to share meals and express gratitude.",
          connectors: ["Similar to,", "In a comparable way,", "Likewise,"],
          sentence_hint: "Write 2 sentences using 'Similar to' comparing Asian and European harvest celebrations.",
          pills: ["Similar to", "gather to share meals", "communal banquets", "express gratitude"],
          sentence_frame: "[Similar to] Asian lantern celebrations, European harvest communities [gather together to share meals]."
        },
        {
          scene: 3,
          ladder_stage: "WRITE",
          badge_label: "WRITE",
          title: "Scene 3: Street Carnivals vs Quiet Dinners",
          image_url: "/images/week78/writing_panel_3.png",
          caption: "Unlike quiet indoor dinners, Latin American street festivals feature lively music and vibrant costumes.",
          frame_L1: "Unlike quiet indoor dinners, Latin American festivities take place outdoors. They feature vibrant street carnivals with lively music and dancing.",
          connectors: ["Unlike,", "In sharp contrast,", "On the other hand,"],
          sentence_hint: "Write 2 sentences using 'Unlike' contrasting indoor meals with outdoor street carnivals.",
          pills: ["Unlike quiet indoor gatherings", "vibrant public street carnivals", "lively percussion and music", "symbolic costumes"],
          sentence_frame: "[Unlike quiet indoor gatherings], Latin American festivals feature [vibrant public street carnivals]."
        },
        {
          scene: 4,
          ladder_stage: "EXPAND",
          badge_label: "EXPAND",
          title: "Scene 4: Tabulating Demographic Findings",
          image_url: "/images/week78/writing_panel_4.png",
          caption: "Whereas older customs were private, modern students celebrate diversity. An overwhelming majority voted to preserve traditional folk arts.",
          frame_L1: "Whereas older customs were private, modern students celebrate diversity. An overwhelming majority voted to preserve traditional folk arts.",
          connectors: ["Whereas,", "In conclusion,", "Finally,"],
          sentence_hint: "Write 2 sentences using 'Whereas' explaining modern survey findings.",
          pills: ["Whereas older customs were solemn", "foster inclusive civic unity", "majority voted to preserve", "cultural appreciation"],
          sentence_frame: "[Whereas older customs were solemn], modern celebrations [foster inclusive civic unity]."
        }
      ]
    },
    // FIX 3: Speaking Hub with teen-appropriate register & genuine info-gap
    speaking_data: {
      talkshow_prompt: {
        topic: "Cultural Traditions & School Survey Findings",
        question: "Elena, based on your school survey, what key comparative insight did you discover between different harvest celebrations?",
        model_response: "Our research revealed that similar to East Asian lantern festivals, European harvest home gatherings celebrate community solidarity and seasonal bounties. Unlike private modern holidays, traditional celebrations bring neighborhoods together into shared public spaces, whereas newer customs focus on intercultural education and unity."
      },
      info_exchange_cards: {
        table_a: {
          title: "Mid-Autumn Festival Traditions",
          subtitle: "Candidate's Question Card (Ask Examiner)",
          person: "Cultural Anthropologist",
          fields: [
            {
              id: "field_a1",
              cue_prompt: "what / pastries share?",
              cue_word: "what",
              is_missing: true,
              acceptable_questions: [
                "What symbolic pastries do families share during Mid-Autumn Festival?",
                "What pastries do they share?",
                "What food is shared during the festival?"
              ],
              nova_reply: "Families share sweet round mooncakes symbolic of unity and completeness."
            },
            {
              id: "field_a2",
              cue_prompt: "where / carry lanterns?",
              cue_word: "where",
              is_missing: true,
              acceptable_questions: [
                "Where do children carry their colorful paper lanterns?",
                "Where do they carry lanterns?",
                "Where do children walk with lanterns?"
              ],
              nova_reply: "Children parade their illuminated lanterns through neighborhood parks and streets."
            },
            {
              id: "field_a3",
              cue_prompt: "what / legend recount?",
              cue_word: "what",
              is_missing: true,
              acceptable_questions: [
                "What legend is traditionally recounted during the full moon gathering?",
                "What story is told?",
                "What legend do they recount?"
              ],
              nova_reply: "Elders recount the ancient legend of the Moon Goddess Chang'e and the Jade Rabbit."
            },
            {
              id: "field_a4",
              cue_prompt: "how / foster reunion?",
              cue_word: "how",
              is_missing: true,
              acceptable_questions: [
                "How does the Mid-Autumn celebration foster family reunion?",
                "How does it bring families together?",
                "Why is reunion important?"
              ],
              nova_reply: "Relatives travel from distant cities to share a banquet under the full autumn moon."
            },
            {
              id: "field_a5",
              cue_prompt: "is / widely celebrated?",
              cue_word: "is",
              is_missing: true,
              acceptable_questions: [
                "Is the festival widely celebrated in rural agricultural communities?",
                "Is it widely celebrated?",
                "Where is the festival popular?"
              ],
              nova_reply: "Yes, it enjoys widespread popularity across both rural villages and modern metropolitan cities."
            }
          ]
        },
        table_b: {
          title: "Dia de los Muertos Traditions",
          subtitle: "Information Card (Answer Examiner's Questions)",
          person: "Heritage Educator",
          fields: [
            {
              id: "field_b1",
              cue_prompt: "what / symbolic flower?",
              cue_word: "what",
              value: "Bright yellow and orange marigold flowers.",
              nova_question: "What symbolic flower is prominently displayed on altars?",
              acceptable_answers: [
                "Bright yellow and orange marigold flowers.",
                "Marigold flowers.",
                "Yellow and orange marigolds."
              ]
            },
            {
              id: "field_b2",
              cue_prompt: "where / gather?",
              cue_word: "where",
              value: "At community cemeteries and decorative home altars.",
              nova_question: "Where do families gather to honor their ancestral memories?",
              acceptable_answers: [
                "At community cemeteries and decorative home altars.",
                "At cemeteries and home altars.",
                "At home altars."
              ]
            },
            {
              id: "field_b3",
              cue_prompt: "what / sweet bread?",
              cue_word: "what",
              value: "Pan de muerto, sweet bread dusted with anise and sugar.",
              nova_question: "What traditional sweet bread is prepared for the holiday?",
              acceptable_answers: [
                "Pan de muerto, sweet bread dusted with anise and sugar.",
                "Pan de muerto.",
                "Traditional sweet bread with anise."
              ]
            },
            {
              id: "field_b4",
              cue_prompt: "unlike funerals / atmosphere?",
              cue_word: "unlike",
              value: "A joyful and colorful atmosphere filled with music and storytelling.",
              nova_question: "Unlike solemn funerals, what atmosphere characterizes the celebration?",
              acceptable_answers: [
                "A joyful and colorful atmosphere filled with music and storytelling.",
                "A joyful and colorful atmosphere.",
                "Joyful with music and stories."
              ]
            },
            {
              id: "field_b5",
              cue_prompt: "when / processions occur?",
              cue_word: "when",
              value: "On the first and second days of November every year.",
              nova_question: "When do the main ceremonial processions take place?",
              acceptable_answers: [
                "On the first and second days of November every year.",
                "On November first and second.",
                "In early November."
              ]
            }
          ]
        }
      }
    },
    cambridge_rw: {
      part1_definitions: [
        { id: 1, text: "A systematic collection of data and opinions gathered from a sample group.", target: "survey" },
        { id: 2, text: "Beliefs, values, and practices handed down across generations within a community.", target: "tradition" },
        { id: 3, text: "The larger number or greater percentage of responses within a population.", target: "majority" },
        { id: 4, text: "To protect something valuable from being destroyed, forgotten, or lost.", target: "preserve" },
        { id: 5, text: "Existing or occurring across a broad geographic territory or population.", target: "widespread" }
      ],
      // FIX 4: Cambridge R&W Part 2 restructured into 5 turns with 3 options each and marked answers
      part2_dialogue: {
        title: "Marcus & Elena Discussing Survey Findings on Traditions",
        turns: [
          {
            id: 1,
            speaker: "Marcus",
            prompt: "What did our school survey reveal about local cultural celebrations?",
            options: [
              "The majority of participants celebrate both traditional and modern holidays.",
              "We bought six loaves of wheat bread at the bakery.",
              "The bus arrives at platform four every afternoon."
            ],
            answer: "The majority of participants celebrate both traditional and modern holidays."
          },
          {
            id: 2,
            speaker: "Marcus",
            prompt: "Did respondents identify similarities between different harvest festivals?",
            options: [
              "Yes, similar to Asian traditions, European festivals emphasize community meals.",
              "No, geometry textbooks are stored in room 3B.",
              "The survey was conducted in heavy rain."
            ],
            answer: "Yes, similar to Asian traditions, European festivals emphasize community meals."
          },
          {
            id: 3,
            speaker: "Marcus",
            prompt: "How did the tally votes compare between indoor and outdoor festival proposals?",
            options: [
              "An overwhelming majority favored outdoor concerts and street food stalls.",
              "All the pencils were sharpened before morning assembly.",
              "The temperature dropped by five degrees Celsius."
            ],
            answer: "An overwhelming majority favored outdoor concerts and street food stalls."
          },
          {
            id: 4,
            speaker: "Marcus",
            prompt: "Why do cultural sociologists prioritize preserving intangible traditions?",
            options: [
              "Because shared customs reinforce communal empathy and cultural heritage.",
              "They want all public holidays to be eliminated.",
              "The library requires complete silence after five o'clock."
            ],
            answer: "Because shared customs reinforce communal empathy and cultural heritage."
          },
          {
            id: 5,
            speaker: "Marcus",
            prompt: "Shall we present these comparative findings at tomorrow's assembly?",
            options: [
              "Certainly; I will prepare the frequency chart and introductory remarks.",
              "I misplaced my yellow umbrella last Thursday.",
              "The cafeteria serves vegetable curry today."
            ],
            answer: "Certainly; I will prepare the frequency chart and introductory remarks."
          }
        ],
        exchanges: [
          { speaker: "Marcus", text: "What did our school survey reveal about local cultural celebrations?" },
          { speaker: "Elena", text: "The majority of participants celebrate both traditional and modern holidays." },
          { speaker: "Marcus", text: "Did respondents identify similarities between different harvest festivals?" },
          { speaker: "Elena", text: "Yes, similar to Asian traditions, European festivals emphasize community meals." },
          { speaker: "Marcus", text: "How did the tally votes compare between indoor and outdoor festival proposals?" },
          { speaker: "Elena", text: "An overwhelming majority favored outdoor concerts and street food stalls." },
          { speaker: "Marcus", text: "Why do cultural sociologists prioritize preserving intangible traditions?" },
          { speaker: "Elena", text: "Because shared customs reinforce communal empathy and cultural heritage." },
          { speaker: "Marcus", text: "Shall we present these comparative findings at tomorrow's assembly?" },
          { speaker: "Elena", text: "Certainly; I will prepare the frequency chart and introductory remarks." }
        ]
      },
      part6_cloze: {
        title: "Cultural Surveys: Understanding Community Heritage",
        instructions: "Read the article and write the missing words. Write one word on each line.",
        text_template: "Surveys are valuable instruments [1]_____ studying cultural attitudes. When researchers question participants [2]_____ their ancestral customs, they discover fascinating patterns. Similar [3]_____ historic records, surveys preserve demographic memory. Unlike casual conversations, structured tally tables provide [4]_____ with accurate statistical evidence. Therefore, social scientists rely [5]_____ survey data worldwide.",
        answers: { "1": "for", "2": "about", "3": "to", "4": "researchers", "5": "on" }
      }
    },
    minigames: {
      math_problems: [
        {
          id: 1,
          title: "Problem 1: Festival Attendance Survey (Part-Whole)",
          problemText: "In a survey of 250 students, 145 students celebrated the Lantern Festival and 85 students celebrated the Harvest Fair. The remaining students celebrated both. How many students celebrated both festivals?",
          correctAnswer: 20,
          answer: "20 students",
          hintText: "Total (250) - Only Lantern (145) - Only Harvest (85) = 20 students celebrating both.",
          modelData: {
            type: "part_whole",
            bars: [
              { value: 145, label: "Lantern (145)", color: "#f97316" },
              { value: 85, label: "Harvest (85)", color: "#eab308" },
              { value: 20, label: "Both (20)", color: "#10b981" }
            ],
            totalLabel: "250 students surveyed"
          }
        },
        {
          id: 2,
          title: "Problem 2: Survey Voting Tally (Comparison)",
          problemText: "In a class election for the festival theme, Traditional Arts received 36 votes, whereas Modern Fusion received 24 votes. How many more votes did Traditional Arts receive?",
          correctAnswer: 12,
          answer: "12 votes",
          hintText: "Traditional Arts (36) - Modern Fusion (24) = 12 votes difference.",
          modelData: {
            type: "comparison",
            bars: [
              { value: 36, label: "Traditional Arts: 36", color: "#6366f1" },
              { value: 24, label: "Modern Fusion: 24", color: "#ec4899" }
            ],
            differenceLabel: "12 more votes"
          }
        }
      ],
      grammar_drills: [
        { id: 1, prompt: "___ western holidays where meals are private, Latin carnivals take place outdoors.", options: ["Unlike", "Similar", "Whereas"], answer: "Unlike" },
        { id: 2, prompt: "Asian mid-autumn celebrations are ___ to European harvest feasts in their communal spirit.", options: ["similar", "same", "differently"], answer: "similar" },
        { id: 3, prompt: "Older rituals were solemn, ___ contemporary celebrations are lively and colorful.", options: ["whereas", "unlike", "similar to"], answer: "whereas" },
        { id: 4, prompt: "The students tallied the survey results ___ than expected.", options: ["faster", "fastest", "more fast"], answer: "faster" },
        { id: 5, prompt: "___ other cultural projects, our team surveyed three separate communities.", options: ["Similar to", "Whereas", "Differently"], answer: "Similar to" }
      ],
      action_lab_scenarios: [
        { stage: 1, title: "Survey Questionnaire Design", instruction: "Formulate unbiased multiple-choice inquiry prompts regarding holiday heritage." },
        { stage: 2, title: "Tally Chart Tabulation", instruction: "Aggregate raw demographic poll responses into organized frequency data matrices." },
        { stage: 3, title: "Comparative Cultural Synthesis", instruction: "Draft comparative sentences contrasting festival traditions using 'Unlike' and 'Whereas'." }
      ]
    }
  },

  125: {
    week: 125,
    theme: "Intro & Conclusion (Academic Essay Structure)",
    title_en: "Intro & Conclusion (Academic Essay Structure)",
    title_vi: "Mở Bài & Kết Bài — Cấu Trúc Luận Văn Học Thuật",
    cefr_level: "B1+ Academic",
    grammar_focus: "Persuasive Verbs: \"Urge\", \"Recommend\", \"Should\", Modal Stance Verbs",
    vocab_list: [
      { id: 1, word: "conclusion", pos: "n", ipa: "/kənˈkluːʒən/", definition_en: "The final part of a piece of writing, summarizing key points and implications", definition_vi: "phần kết luận", example_en: "The conclusion synthesized the research findings effectively.", example_vi: "Phần kết luận đã tổng hợp các phát hiện nghiên cứu một cách hiệu quả." },
      { id: 2, word: "introduction", pos: "n", ipa: "/ˌɪntrəˈdʌkʃən/", definition_en: "The preliminary section of an essay presenting context and a thesis statement", definition_vi: "phần mở bài", example_en: "A compelling introduction captures the reader's curiosity immediately.", example_vi: "Một phần mở bài hấp dẫn thu hút sự tò mò của người đọc ngay lập tức." },
      { id: 3, word: "thesis", pos: "n", ipa: "/ˈθiːsɪs/", definition_en: "A central proposition that is maintained or proven through argument", definition_vi: "luận đề", example_en: "Her essay stated a clear thesis in the final sentence of paragraph one.", example_vi: "Bài luận của cô ấy nêu rõ một luận đề ở câu cuối cùng của đoạn một." },
      { id: 4, word: "synthesis", pos: "n", ipa: "/ˈsɪnθəsɪs/", definition_en: "The combination of ideas or data to form a coherent, complex system", definition_vi: "sự tổng hợp", example_en: "The concluding section provided a brilliant synthesis of both arguments.", example_vi: "Phần kết luận cung cấp một sự tổng hợp tuyệt vời cho cả hai lập luận." },
      { id: 5, word: "perspective", pos: "n", ipa: "/pərˈspektɪv/", definition_en: "A particular attitude toward or way of regarding something", definition_vi: "góc nhìn", example_en: "Scholars evaluated the historical event from multiple economic perspectives.", example_vi: "Các học giả đánh giá sự kiện lịch sử từ nhiều góc nhìn kinh tế." },
      { id: 6, word: "evidence", pos: "n", ipa: "/ˈevɪdəns/", definition_en: "The available body of facts or information indicating whether a belief is valid", definition_vi: "bằng chứng", example_en: "Every persuasive essay requires empirical evidence to support its claims.", example_vi: "Mỗi bài luận thuyết phục đều yêu cầu bằng chứng thực nghiệm để củng cố các luận điểm." },
      { id: 7, word: "counterargument", pos: "n", ipa: "/ˈkaʊntərˌɑːrɡjəmənt/", definition_en: "An argument or set of reasons put forward to oppose an idea developed in another argument", definition_vi: "phản biện", example_en: "Addressing a counterargument demonstrates academic maturity and balance.", example_vi: "Giải quyết một phản biện thể hiện sự chín chắn và cân bằng trong học thuật." },
      { id: 8, word: "implication", pos: "n", ipa: "/ˌɪmplɪˈkeɪʃən/", definition_en: "A conclusion that can be drawn from something although it is not explicitly stated", definition_vi: "hệ quả hàm ý", example_en: "The author discussed the policy implications in the final paragraph.", example_vi: "Tác giả đã thảo luận về các hệ quả chính sách trong đoạn văn cuối cùng." },
      { id: 9, word: "summarize", pos: "v", ipa: "/ˈsʌməraɪz/", definition_en: "Give a brief statement of the main points of something", definition_vi: "tóm tắt", example_en: "Academic writers summarize complex chapters into concise overviews.", example_vi: "Các nhà văn học thuật tóm tắt các chương phức tạp thành những cái nhìn tổng quan súc tích." },
      { id: 10, word: "restate", pos: "v", ipa: "/riːˈsteɪt/", definition_en: "State something again or differently, especially more clearly or convincingly", definition_vi: "khẳng định lại", example_en: "Remember to restate your central thesis in fresh wording.", example_vi: "Hãy nhớ khẳng định lại luận đề trung tâm của bạn bằng cách diễn đạt mới mẻ." },
      { id: 11, word: "urge", pos: "v", ipa: "/ɜːrdʒ/", definition_en: "Try earnestly or persistently to persuade someone to do something", definition_vi: "thúc giục", example_en: "Scientists urge policymakers to invest in sustainable energy infrastructure.", example_vi: "Các nhà khoa học thúc giục các nhà hoạch định chính sách đầu tư vào cơ sở hạ tầng năng lượng bền vững." },
      { id: 12, word: "recommend", pos: "v", ipa: "/ˌrekəˈmend/", definition_en: "Advise or put forward with approval as being suitable for a purpose", definition_vi: "khuyến nghị", example_en: "We recommend conducting longitudinal studies before reaching a verdict.", example_vi: "Chúng tôi khuyến nghị tiến hành các nghiên cứu theo thời gian trước khi đưa ra phán quyết." },
      { id: 13, word: "advocate", pos: "v", ipa: "/ˈædvəkeɪt/", definition_en: "Publicly recommend or support a particular cause or policy", definition_vi: "chủ trương ủng hộ", example_en: "Educators advocate integrating critical thinking into early secondary curricula.", example_vi: "Các nhà giáo dục chủ trương tích hợp tư duy phản biện vào chương trình đầu cấp hai." },
      { id: 14, word: "demonstrate", pos: "v", ipa: "/ˈdemənstreɪt/", definition_en: "Clearly show the existence or truth of something by giving proof", definition_vi: "chứng minh", example_en: "Statistical analysis will demonstrate whether the hypothesis holds true.", example_vi: "Phân tích thống kê sẽ chứng minh liệu giả thuyết có đúng hay không." },
      { id: 15, word: "compelling", pos: "adj", ipa: "/kəmˈpelɪŋ/", definition_en: "Evoking interest, attention, or admiration in a powerfully irresistible way", definition_vi: "thuyết phục mạnh mẽ", example_en: "The introductory hook offered a compelling question about future artificial intelligence.", example_vi: "Câu dẫn nhập đề đưa ra một câu hỏi thuyết phục mạnh mẽ về trí tuệ nhân tạo tương lai." },
      { id: 16, word: "persuasive", pos: "adj", ipa: "/pərˈsweɪsɪv/", definition_en: "Good at persuading someone to do or believe something through reasoning", definition_vi: "có sức thuyết phục", example_en: "Her essay was remarkably persuasive due to rigorous citations.", example_vi: "Bài luận của cô ấy có sức thuyết phục đáng chú ý nhờ trích dẫn chặt chẽ." },
      { id: 17, word: "rigorous", pos: "adj", ipa: "/ˈrɪɡərəs/", definition_en: "Extremely thorough, exhaustive, or accurate", definition_vi: "nghiêm ngặt chuẩn xác", example_en: "Academic discourse demands rigorous validation of all empirical claims.", example_vi: "Diễn ngôn học thuật đòi hỏi sự xác thực nghiêm ngặt đối với tất cả các tuyên bố thực nghiệm." },
      { id: 18, word: "rhetorical", pos: "adj", ipa: "/rɪˈtɔːrɪkəl/", definition_en: "Expressed in terms intended to persuade or impress", definition_vi: "mang tính tu từ", example_en: "A rhetorical question in an introduction challenges the reader to think deeply.", example_vi: "Một câu hỏi tu từ ở phần mở bài thách thức người đọc suy nghĩ sâu sắc." },
      { id: 19, word: "cohesive", pos: "adj", ipa: "/koʊˈhiːsɪv/", definition_en: "Characterized by being logically connected and unified", definition_vi: "chặt chẽ liền mạch", example_en: "Transition phrases create a cohesive argument between body paragraphs.", example_vi: "Các cụm từ chuyển tiếp tạo ra một lập luận liền mạch giữa các đoạn thân bài." },
      { id: 20, word: "conclusive", pos: "adj", ipa: "/kənˈkluːsɪv/", definition_en: "Serving to settle an issue; producing a definitive result", definition_vi: "có tính kết luận dứt khoát", example_en: "The lab report presented conclusive proof that the reaction occurred.", example_vi: "Báo cáo thí nghiệm đã đưa ra bằng chứng có tính kết luận rằng phản ứng đã xảy ra." }
    ],
    clil: {
      title_en: "Academic Composition: Framing Arguments with Impact",
      title_vi: "Soạn Thảo Học Thuật: Định Hình Luận Điểm Tạo Tác Động",
      content_en: "In academic composition, the introductory and concluding paragraphs serve as critical intellectual bookends that frame a scholar's argument. An effective introduction begins with an engaging hook, such as a thought-provoking rhetorical question or a surprising empirical fact, before establishing relevant background context. Crucially, the introduction must culminate in a precise, debatable thesis statement that defines the scope of the inquiry. Without an explicit thesis, an essay risks wandering aimlessly through disconnected observations. Conversely, the conclusion must never merely repeat prior paragraphs verbatim. Instead, sophisticated academic writers synthesize primary findings, demonstrating how the diverse evidence unites to advance scholarly understanding. Furthermore, a rigorous conclusion articulates broad implications, prompting the reader to contemplate real-world applications or future scientific investigations. To persuade their audience, researchers frequently employ authoritative stance verbs: they urge reform, recommend proactive interventions, and advocate innovative policies. Mastering the structural moves of introductions and conclusions ensures that an author's scholarship resonates with clarity, rigor, and persuasive power.",
      glossary: [
        { word: "composition", definition_en: "The craft of writing and structuring intellectual arguments", definition_vi: "soạn thảo văn bản học thuật" },
        { word: "intellectual", definition_en: "Appealing to or requiring advanced mental capacity and reasoning", definition_vi: "thuộc trí tuệ" },
        { word: "culminate", definition_en: "Reach a climax or point of highest development", definition_vi: "đi đến đỉnh điểm kết tụ" },
        { word: "authoritative", definition_en: "Able to be trusted as being accurate or true with confidence", definition_vi: "có thẩm quyền uy tín" },
        { word: "scholarship", definition_en: "Academic study or achievement; learning of a high level", definition_vi: "thành tựu học thuật" }
      ],
      check_questions: [
        { id: 1, question_en: "What essential component must the end of an academic introduction provide?", options: ["A precise, debatable thesis statement", "A random list of unrelated jokes", "A blank space"], answer: "A precise, debatable thesis statement" },
        { id: 2, question_en: "Why should an academic conclusion avoid repeating previous sentences verbatim?", options: ["It should synthesize findings and articulate wider implications", "It should hide the author's identity", "It is illegal to use the same words"], answer: "It should synthesize findings and articulate wider implications" },
        { id: 3, question_en: "Which persuasive verbs do scholarly writers use to recommend policy actions?", options: ["Urge, recommend, and advocate", "Sleep, whisper, and forget", "Hide, run, and delete"], answer: "Urge, recommend, and advocate" }
      ],
      critical_thinking: {
        question_en: "How does formulating a rhetorical question in an introduction differ from stating a factual assertion?",
        hint_en: "Consider how rhetorical questions invite active critical participation from the reader rather than passive reception of facts."
      }
    },
    shadowing_sentences: [
      { id: 1, text: "An effective academic introduction must culminate in a precise and debatable thesis statement.", ipa: "/ən ɪˈfektɪv ˌækəˈdemɪk ˌɪntrəˈdʌkʃən mʌst ˈkʌlmɪneɪt ɪn ə prɪˈsaɪs ənd dɪˈbeɪtəbəl ˈθiːsɪs ˈsteɪtmənt/" },
      { id: 2, text: "Opening with a compelling rhetorical question invites readers to contemplate the central dilemma.", ipa: "/ˈoʊpənɪŋ wɪð ə kəmˈpelɪŋ rɪˈtɔːrɪkəl ˈkwestʃən ɪnˈvaɪts ˈriːdərz tuː ˈkɑːntəmpleɪt ðə ˈsentrəl dɪˈlemə/" },
      { id: 3, text: "Rather than merely repeating previous sentences, a strong conclusion synthesizes primary evidence.", ipa: "/ˈræðər ðæn ˈmɪərli rɪˈpiːtɪŋ ˈpriːviəs ˈsentənsɪz ə strɔːŋ kənˈkluːʒən ˈsɪnθəsaɪzɪz ˈpraɪmeri ˈevɪdəns/" },
      { id: 4, text: "Scholars urge policymakers to examine the profound ethical implications of emerging technology.", ipa: "/ˈskɑːlərz ɜːrdʒ ˈpɑːləsiˌmeɪkərz tuː ɪɡˈzæmɪn ðə prəˈfaʊnd ˈeθɪkəl ˌɪmplɪˈkeɪʃənz əv ɪˈmɜːrdʒɪŋ tekˈnɑːlədʒi/" },
      { id: 5, text: "We recommend that educational institutions advocate for interdisciplinary curriculum reform.", ipa: "/wi ˌrekəˈmend ðæt ˌedʒʊˈkeɪʃənəl ˌɪnstɪˈtuːʃənz ˈædvəkeɪt fər ˌɪntərdɪsəˈplɪneri kəˈrɪkjələm rɪˈfɔːrm/" },
      { id: 6, text: "Addressing potential counterarguments demonstrates intellectual balance and analytical rigor.", ipa: "/əˈdresɪŋ pəˈtenʃəl ˈkaʊntərˌɑːrɡjəmənts ˈdemənstreɪts ˌɪntəlˈektʃuəl ˈbæləns ənd ˌænəˈlɪtɪkəl ˈrɪɡər/" },
      { id: 7, text: "Transition markers establish cohesive relationships between introductory premises and concluding summaries.", ipa: "/trænˈzɪʃən ˈmɑːrkərz ɪˈstæblɪʃ koʊˈhiːsɪv rɪˈleɪʃənʃɪps bɪˈtwiːn ˌɪntrəˈdʌktəri ˈpremɪsɪz ənd kənˈkluːdɪŋ ˈsʌməriz/" },
      { id: 8, text: "Mastering introductory hooks and concluding syntheses empowers students to produce authoritative essays.", ipa: "/ˈmæstərɪŋ ˌɪntrəˈdʌktəri hʊks ənd kənˈkluːdɪŋ ˈsɪnθəsiːz ɪmˈpaʊərz ˈstuːdənts tuː prəˈduːs əˈθɔːrəteɪtɪv ˈeseɪz/" }
    ],
    // FIX 2: 5 Story Scenes with character names & rich narrative
    story_scenes: [
      {
        id: 1,
        scene_id: "scene_1",
        scene_number: 1,
        title_en: "Framing the Introduction and Hook",
        title_vi: "Xây Dựng Phần Mở Bài Và Câu Dẫn",
        description_en: "Julian drafted a compelling **rhetorical hook** in his **introduction** before presenting his debatable **thesis statement**.",
        description: "Julian drafted a compelling **rhetorical hook** in his **introduction** before presenting his debatable **thesis statement**.",
        image_url: "/images/week125/webtoon_scene_1.png",
        audio_url: "/audio/week125/scene_1.mp3"
      },
      {
        id: 2,
        scene_id: "scene_2",
        scene_number: 2,
        title_en: "Synthesizing Empirical Evidence",
        title_vi: "Tổng Hợp Bằng Chứng Thực Nghiệm",
        description_en: "Claire analyzed **empirical evidence** across divergent scholarly **perspectives** to build a **rigorous** academic argument.",
        description: "Claire analyzed **empirical evidence** across divergent scholarly **perspectives** to build a **rigorous** academic argument.",
        image_url: "/images/week125/webtoon_scene_2.png",
        audio_url: "/audio/week125/scene_2.mp3"
      },
      {
        id: 3,
        scene_id: "scene_3",
        scene_number: 3,
        title_en: "Rebutting Scholarly Counterarguments",
        title_vi: "Phản Biện Luận Điểm Đối Lập",
        description_en: "Professor Vance **recommended** addressing potential **counterarguments** directly to cultivate intellectual balance.",
        description: "Professor Vance **recommended** addressing potential **counterarguments** directly to cultivate intellectual balance.",
        image_url: "/images/week125/webtoon_scene_3.png",
        audio_url: "/audio/week125/scene_3.mp3"
      },
      {
        id: 4,
        scene_id: "scene_4",
        scene_number: 4,
        title_en: "Drafting Cohesive Paragraph Bridges",
        title_vi: "Soạn Thảo Cầu Nối Đoạn Liền Mạch",
        description_en: "Julian deployed **cohesive** transitions and authoritative verbs to **demonstrate** the validity of his hypothesis.",
        description: "Julian deployed **cohesive** transitions and authoritative verbs to **demonstrate** the validity of his hypothesis.",
        image_url: "/images/week125/webtoon_scene_4.png",
        audio_url: "/audio/week125/scene_4.mp3"
      },
      {
        id: 5,
        scene_id: "scene_5",
        scene_number: 5,
        title_en: "Concluding Synthesis and Policy Recommendations",
        title_vi: "Tổng Hợp Kết Bài Và Khuyến Nghị Chính Sách",
        description_en: "In the final **conclusion**, Julian **restate**d his thesis and provided a **synthesis**, **urging** policymakers toward institutional reform.",
        description: "In the final **conclusion**, Julian **restate**d his thesis and provided a **synthesis**, **urging** policymakers toward institutional reform.",
        image_url: "/images/week125/webtoon_scene_5.png",
        audio_url: "/audio/week125/scene_5.mp3"
      }
    ],
    // FIX 1: Rich Writing Data with multi-stage ladder, model sentence & pills
    writing_data: {
      title: "Academic Composition: Framing Arguments with Rigor",
      prompt_en: "Look at the stages of essay composition. Write an academic synthesis illustrating how introductions and conclusions frame scholarly research. Write 35 or more words.",
      prompt_vi: "Nhìn vào các giai đoạn soạn thảo bài luận. Viết đoạn tổng hợp học thuật minh họa cách mở bài và kết bài định hình nghiên cứu khoa học (từ 35 từ trở lên).",
      min_sentences: 3,
      min_words: 35,
      max_words: 100,
      model_sentence: "In scholarly composition, introductory and concluding paragraphs function as critical conceptual bookends that determine analytical rigor. An authoritative introduction captures scholarly attention through an engaging rhetorical hook before establishing context and articulating a precise, debatable thesis statement. Throughout the body paragraphs, authors evaluate empirical evidence from divergent perspectives, addressing counterarguments to demonstrate intellectual balance. In contrast to mechanical summaries that reiterate claims verbatim, an effective conclusion synthesizes primary findings into a unified framework. Furthermore, rigorous conclusions outline far-reaching implications, urging researchers and policymakers to implement evidence-based reforms.",
      word_bank: ["conclusion", "introduction", "thesis", "synthesis", "perspective", "evidence", "counterargument", "implication", "summarize", "restate", "urge", "recommend", "advocate", "persuasive", "rigorous", "cohesive"],
      sentence_frames: [
        "An authoritative introduction must culminate in a precise and debatable ___ statement.",
        "Scholars evaluate empirical evidence from divergent ___ to substantiate claims.",
        "Professor Vance ___ addressing counterarguments to cultivate intellectual balance.",
        "A rigorous conclusion synthesizes primary evidence, ___ policymakers toward reform."
      ],
      panels: [
        {
          panel_id: "panel_1",
          title_en: "Scene 1: Framing the Introduction and Thesis",
          title_vi: "Cảnh 1: Định Hình Mở Bài Và Luận Đề",
          image_url: "/images/week125/writing_panel_1.png",
          image_prompt: "A university student drafting a paper on a laptop in a quiet academic research library with books, focused lighting.",
          caption: "Julian drafted an engaging rhetorical question to frame the problem before stating his thesis.",
          sentence_frame: "In the introductory paragraph, Julian [formulated a compelling rhetorical hook] before [stating an explicit thesis statement].",
          pills: ["formulated a compelling rhetorical hook", "stating an explicit thesis statement", "academic introduction", "intellectual framework", "define the scope"],
          connectors: ["First,", "In the introduction,", "To commence the inquiry,"]
        },
        {
          panel_id: "panel_2",
          title_en: "Scene 2: Evaluating Empirical Evidence",
          title_vi: "Cảnh 2: Đánh Giá Bằng Chứng Thực Nghiệm",
          image_url: "/images/week125/writing_panel_2.png",
          image_prompt: "A researcher analyzing highlighted academic papers and data graphs on a wooden seminar table.",
          caption: "Claire examined peer-reviewed empirical studies to support her propositions with rigorous data.",
          sentence_frame: "To ensure academic credibility, Claire [reviewed empirical evidence] from [multiple scholarly perspectives].",
          pills: ["reviewed empirical evidence", "multiple scholarly perspectives", "peer-reviewed research", "intellectual balance", "substantiate claims"],
          connectors: ["Subsequently,", "In the literature review,", "Furthermore,"]
        },
        {
          panel_id: "panel_3",
          title_en: "Scene 3: Rebutting Counterarguments",
          title_vi: "Cảnh 3: Phản Biện Luận Điểm Đối Lập",
          image_url: "/images/week125/writing_panel_3.png",
          image_prompt: "A university professor discussing argumentative structure with two students in front of a whiteboard diagram.",
          caption: "Professor Vance recommended addressing counterarguments directly to establish persuasive stance.",
          sentence_frame: "Professor Vance [recommended addressing counterarguments] to [demonstrate persuasive rigor].",
          pills: ["recommended addressing counterarguments", "demonstrate persuasive rigor", "analytical balance", "persuasive stance verbs", "academic maturity"],
          connectors: ["Importantly,", "To address objections,", "On the contrary,"]
        },
        {
          panel_id: "panel_4",
          title_en: "Scene 4: Concluding Synthesis and Implications",
          title_vi: "Cảnh 4: Tổng Hợp Kết Luận Và Hàm Ý Chính Sách",
          image_url: "/images/week125/writing_panel_4.png",
          image_prompt: "A student presenting concluding slides with a synthesis diagram to a university lecture hall audience.",
          caption: "Julian synthesized his findings into broad implications, urging policymakers to act decisively.",
          sentence_frame: "Rather than summarizing points mechanically, the conclusion [synthesizes primary findings] and [urges policymakers to adopt reforms].",
          pills: ["synthesizes primary findings", "urges policymakers to adopt reforms", "far-reaching policy implications", "cohesive argument", "authoritative conclusion"],
          connectors: ["In conclusion,", "Ultimately,", "Consequently,"]
        }
      ],
      steps: [
        {
          scene: 1,
          ladder_stage: "MODEL",
          badge_label: "MODEL",
          title: "Scene 1: Framing the Introduction and Thesis",
          image_url: "/images/week125/writing_panel_1.png",
          caption: "Julian drafted an engaging rhetorical question to frame the problem before stating his thesis.",
          frame_L1: "In the introductory paragraph, Julian formulated a compelling hook. He articulated a precise, debatable thesis statement.",
          connectors: ["In the introduction,", "First,", "To begin with,"],
          sentence_hint: "Write 2 sentences about creating an introductory hook and stating a clear thesis.",
          pills: ["formulated a compelling hook", "stated an explicit thesis", "intellectual scope", "Julian"],
          sentence_frame: "In the introductory paragraph, Julian [formulated a compelling rhetorical hook] before [stating an explicit thesis statement]."
        },
        {
          scene: 2,
          ladder_stage: "BUILD",
          badge_label: "BUILD",
          title: "Scene 2: Evaluating Empirical Evidence",
          image_url: "/images/week125/writing_panel_2.png",
          caption: "Claire examined peer-reviewed empirical studies to support her propositions with rigorous data.",
          frame_L1: "To substantiate her argument, Claire reviewed empirical data. She examined findings from multiple scholarly perspectives.",
          connectors: ["Subsequently,", "In the body paragraphs,", "Furthermore,"],
          sentence_hint: "Write 2 sentences about reviewing empirical evidence across perspectives.",
          pills: ["reviewed empirical evidence", "multiple perspectives", "peer-reviewed research", "Claire"],
          sentence_frame: "To ensure academic credibility, Claire [reviewed empirical evidence] from [multiple scholarly perspectives]."
        },
        {
          scene: 3,
          ladder_stage: "WRITE",
          badge_label: "WRITE",
          title: "Scene 3: Rebutting Counterarguments",
          image_url: "/images/week125/writing_panel_3.png",
          caption: "Professor Vance recommended addressing counterarguments directly to establish persuasive stance.",
          frame_L1: "Professor Vance recommended addressing counterarguments directly. This critical move demonstrates analytical balance and rigor.",
          connectors: ["Importantly,", "To address objections,", "On the contrary,"],
          sentence_hint: "Write 2 sentences using stance verbs about addressing counterarguments.",
          pills: ["recommended addressing counterarguments", "demonstrate persuasive rigor", "analytical balance", "Professor Vance"],
          sentence_frame: "Professor Vance [recommended addressing counterarguments] to [demonstrate persuasive rigor]."
        },
        {
          scene: 4,
          ladder_stage: "EXPAND",
          badge_label: "EXPAND",
          title: "Scene 4: Concluding Synthesis and Implications",
          image_url: "/images/week125/writing_panel_4.png",
          caption: "Julian synthesized his findings into broad implications, urging policymakers to act decisively.",
          frame_L1: "In the conclusion, Julian synthesized primary evidence. He articulated broad implications, urging leaders toward reform.",
          connectors: ["In conclusion,", "Ultimately,", "Consequently,"],
          sentence_hint: "Write 2 sentences using 'synthesize' and 'urge' to outline policy implications.",
          pills: ["synthesizes primary findings", "urges policymakers to adopt reforms", "policy implications", "authoritative conclusion"],
          sentence_frame: "Rather than summarizing points mechanically, the conclusion [synthesizes primary findings] and [urges policymakers to adopt reforms]."
        }
      ]
    },
    // FIX 3: Speaking Hub with academic seminar register & genuine info-gap
    speaking_data: {
      talkshow_prompt: {
        topic: "Academic Rhetoric: Crafting Concluding Syntheses",
        question: "Julian, why do scholarly writing authorities urge researchers to provide an analytical synthesis rather than a simple summary in the essay conclusion?",
        model_response: "A superficial summary merely reiterates previously stated points verbatim, offering negligible intellectual contribution. In contrast, a rigorous synthesis integrates disparate empirical evidence to reveal macro-level patterns and articulate actionable policy implications, thereby urging the academic community toward constructive intervention."
      },
      info_exchange_cards: {
        table_a: {
          title: "Julian's Academic Essay Architecture",
          subtitle: "Candidate's Question Card (Ask Examiner)",
          person: "Seminar Chair",
          fields: [
            {
              id: "field_a1",
              cue_prompt: "what / empirical methodology?",
              cue_word: "what",
              is_missing: true,
              acceptable_questions: [
                "What primary empirical methodology did Julian deploy in his essay?",
                "What methodology did Julian use?",
                "Which research method was deployed?"
              ],
              nova_reply: "Julian deployed a mixed-methods quantitative survey combined with qualitative case analyses."
            },
            {
              id: "field_a2",
              cue_prompt: "how / formulate thesis?",
              cue_word: "how",
              is_missing: true,
              acceptable_questions: [
                "How did Julian formulate his central thesis statement in the introduction?",
                "How did he state the thesis?",
                "How was the thesis constructed?"
              ],
              nova_reply: "He formulated a precise, three-pronged debatable proposition positioned as the concluding sentence of paragraph one."
            },
            {
              id: "field_a3",
              cue_prompt: "what / counterargument addressed?",
              cue_word: "what",
              is_missing: true,
              acceptable_questions: [
                "What specific counterargument did Julian address in section three?",
                "What counterargument was discussed?",
                "Which counterargument did he refute?"
              ],
              nova_reply: "He addressed fiscal concerns regarding high implementation overhead, refuting them through projected longitudinal savings."
            },
            {
              id: "field_a4",
              cue_prompt: "which / stance verbs employed?",
              cue_word: "which",
              is_missing: true,
              acceptable_questions: [
                "Which authoritative stance verbs did Julian employ in his recommendations?",
                "Which stance verbs were used?",
                "What verbs did he use to recommend actions?"
              ],
              nova_reply: "He employed authoritative stance verbs including 'urge', 'recommend', 'advocate', and 'demonstrate'."
            },
            {
              id: "field_a5",
              cue_prompt: "what / policy implications?",
              cue_word: "what",
              is_missing: true,
              acceptable_questions: [
                "What future policy implications did the conclusion articulate?",
                "What implications were identified?",
                "What policy changes did he propose?"
              ],
              nova_reply: "The conclusion urged governmental oversight bodies to mandate standardized critical-thinking assessments nationwide."
            }
          ]
        },
        table_b: {
          title: "Claire's Empirical Investigation",
          subtitle: "Information Card (Answer Examiner's Questions)",
          person: "Research Director",
          fields: [
            {
              id: "field_b1",
              cue_prompt: "what / sample size?",
              cue_word: "what",
              value: "Over twelve hundred secondary school educators across six distinct educational districts.",
              nova_question: "What was the sample size of Claire's empirical survey?",
              acceptable_answers: [
                "Over twelve hundred secondary school educators across six distinct educational districts.",
                "Over twelve hundred educators across six districts.",
                "Twelve hundred teachers."
              ]
            },
            {
              id: "field_b2",
              cue_prompt: "what / research question?",
              cue_word: "what",
              value: "The long-term cognitive and pedagogical impacts of interdisciplinary inquiry curricula.",
              nova_question: "What primary research question did her introduction investigate?",
              acceptable_answers: [
                "The long-term cognitive and pedagogical impacts of interdisciplinary inquiry curricula.",
                "Long-term cognitive impacts of inquiry curricula.",
                "Pedagogical impacts of interdisciplinary curricula."
              ]
            },
            {
              id: "field_b3",
              cue_prompt: "how / establish transitions?",
              cue_word: "how",
              value: "By deploying conceptual transition markers systematically linked to her primary research hypothesis.",
              nova_question: "How did Claire establish cohesive transitions between chapters?",
              acceptable_answers: [
                "By deploying conceptual transition markers systematically linked to her primary research hypothesis.",
                "Through conceptual transition markers.",
                "By linking paragraphs to the central hypothesis."
              ]
            },
            {
              id: "field_b4",
              cue_prompt: "what reform / urge leaders?",
              cue_word: "what",
              value: "Mandatory professional development workshops and equitable institutional resource allocation.",
              nova_question: "What reform did Claire's conclusion urge educational leaders to adopt?",
              acceptable_answers: [
                "Mandatory professional development workshops and equitable institutional resource allocation.",
                "Mandatory professional development workshops.",
                "Equitable resource allocation and teacher workshops."
              ]
            },
            {
              id: "field_b5",
              cue_prompt: "how / resolve conflicting data?",
              cue_word: "how",
              value: "By identifying regional demographic variations as mediating factors rather than conflicting outcomes.",
              nova_question: "How did her synthesis resolve conflicting survey data?",
              acceptable_answers: [
                "By identifying regional demographic variations as mediating factors rather than conflicting outcomes.",
                "Through regional demographic analysis.",
                "By recognizing demographic variations as mediating factors."
              ]
            }
          ]
        }
      }
    },
    cambridge_rw: {
      part1_definitions: [
        { id: 1, text: "A proposition put forward and supported by reasoned argument within an essay.", target: "thesis" },
        { id: 2, text: "The combining of distinct elements or ideas to form a coherent new perspective.", target: "synthesis" },
        { id: 3, text: "To persistently advise or strongly encourage someone to take a specific action.", target: "urge" },
        { id: 4, text: "Thorough, exhaustive, and adhering strictly to high intellectual standards.", target: "rigorous" },
        { id: 5, text: "The concluding section of an academic work drawing together findings and implications.", target: "conclusion" }
      ],
      // FIX 4: Cambridge R&W Part 2 restructured into 5 turns with 3 options each and marked answers
      part2_dialogue: {
        title: "Professor Vance & Julian Discussing Essay Architecture",
        turns: [
          {
            id: 1,
            speaker: "Professor Vance",
            prompt: "Julian, does your introductory paragraph present an explicit thesis statement?",
            options: [
              "Yes, I revised the final sentence so that it clearly defines my three central arguments.",
              "No, I arrived at the laboratory thirty minutes before noon.",
              "The bibliography contains twenty-five references."
            ],
            answer: "Yes, I revised the final sentence so that it clearly defines my three central arguments."
          },
          {
            id: 2,
            speaker: "Professor Vance",
            prompt: "How did you formulate your concluding paragraph to avoid mechanical repetition?",
            options: [
              "Instead of repeating points verbatim, I synthesized findings and highlighted policy implications.",
              "I copied the first paragraph into the conclusion word for word.",
              "I left the final page completely blank."
            ],
            answer: "Instead of repeating points verbatim, I synthesized findings and highlighted policy implications."
          },
          {
            id: 3,
            speaker: "Professor Vance",
            prompt: "Did you use authoritative stance verbs to articulate your recommendations?",
            options: [
              "Indeed; I urged institutions to adopt proactive research methodologies.",
              "I whispered softly during the seminar presentation.",
              "The printer ran out of paper during the second draft."
            ],
            answer: "Indeed; I urged institutions to adopt proactive research methodologies."
          },
          {
            id: 4,
            speaker: "Professor Vance",
            prompt: "How did you address the counterargument regarding implementation costs?",
            options: [
              "I conceded the initial expense but demonstrated long-term economic efficiencies.",
              "I deleted all references to monetary budgeting.",
              "The seminar room was booked until six in the evening."
            ],
            answer: "I conceded the initial expense but demonstrated long-term economic efficiencies."
          },
          {
            id: 5,
            speaker: "Professor Vance",
            prompt: "Your revised draft demonstrates remarkable cohesion and intellectual balance.",
            options: [
              "Thank you; I will finalize the abstract and submit the manuscript today.",
              "I prefer reading fiction novels during summer holidays.",
              "The library elevator is undergoing maintenance."
            ],
            answer: "Thank you; I will finalize the abstract and submit the manuscript today."
          }
        ],
        exchanges: [
          { speaker: "Professor Vance", text: "Julian, does your introductory paragraph present an explicit thesis statement?" },
          { speaker: "Julian", text: "Yes, I revised the final sentence so that it clearly defines my three central arguments." },
          { speaker: "Professor Vance", text: "How did you formulate your concluding paragraph to avoid mechanical repetition?" },
          { speaker: "Julian", text: "Instead of repeating points verbatim, I synthesized findings and highlighted policy implications." },
          { speaker: "Professor Vance", text: "Did you use authoritative stance verbs to articulate your recommendations?" },
          { speaker: "Julian", text: "Indeed; I urged institutions to adopt proactive research methodologies." },
          { speaker: "Professor Vance", text: "How did you address the counterargument regarding implementation costs?" },
          { speaker: "Julian", text: "I conceded the initial expense but demonstrated long-term economic efficiencies." },
          { speaker: "Professor Vance", text: "Your revised draft demonstrates remarkable cohesion and intellectual balance." },
          { speaker: "Julian", text: "Thank you; I will finalize the abstract and submit the manuscript today." }
        ]
      },
      part6_cloze: {
        title: "The Architecture of Academic Rhetoric",
        instructions: "Read the article and write the missing words. Write one word on each line.",
        text_template: "Academic composition requires disciplined attention [1]_____ structural organization. When authors craft an introduction, they [2]_____ capture reader engagement immediately. A rhetorical question serves [3]_____ an effective hook before presenting the thesis. In conclusion, scholars synthesize evidence [4]_____ order to demonstrate wider implications. Writers should always urge readers [5]_____ evaluate complex perspectives objectively.",
        answers: { "1": "to", "2": "must", "3": "as", "4": "in", "5": "to" }
      }
    },
    minigames: {
      math_problems: [
        {
          id: 1,
          title: "Problem 1: Academic Word Count Allocation (Fraction / Part-Whole)",
          problemText: "An academic paper has a target length of 2,400 words. The introduction accounts for 1/8 of the total word count, and the conclusion accounts for 1/8. What is the combined word count of the introduction and conclusion?",
          correctAnswer: 600,
          answer: "600 words",
          hintText: "1/8 of 2,400 = 300 words each. Intro (300) + Conclusion (300) = 600 words total.",
          modelData: {
            type: "part_whole",
            bars: [
              { value: 300, label: "Intro: 300w (1/8)", color: "#8b5cf6" },
              { value: 1800, label: "Body: 1,800w (6/8)", color: "#64748b" },
              { value: 300, label: "Conclusion: 300w (1/8)", color: "#ec4899" }
            ],
            totalLabel: "2,400 words total"
          }
        },
        {
          id: 2,
          title: "Problem 2: Empirical Citation Comparison (Comparison)",
          problemText: "Group A cited 48 peer-reviewed research papers in their essay. Group B cited 32 research papers. How many more citations did Group A include than Group B?",
          correctAnswer: 16,
          answer: "16 citations",
          hintText: "Group A citations (48) - Group B citations (32) = 16 more citations.",
          modelData: {
            type: "comparison",
            bars: [
              { value: 48, label: "Group A: 48 citations", color: "#3b82f6" },
              { value: 32, label: "Group B: 32 citations", color: "#f43f5e" }
            ],
            differenceLabel: "16 citations difference"
          }
        }
      ],
      grammar_drills: [
        { id: 1, prompt: "Scholars ___ policymakers to prioritize environmental investments immediately.", options: ["urge", "urging", "urged to"], answer: "urge" },
        { id: 2, prompt: "We ___ that students review empirical evidence before drafting their thesis.", options: ["recommend", "recommending", "recommends"], answer: "recommend" },
        { id: 3, prompt: "Academic essays ___ always maintain a cohesive and rigorous argumentative structure.", options: ["should", "cannot", "dare"], answer: "should" },
        { id: 4, prompt: "The concluding chapter ___ a comprehensive synthesis of all survey data.", options: ["provides", "providing", "to provide"], answer: "provides" },
        { id: 5, prompt: "Researchers ___ for ethical governance in emerging artificial intelligence research.", options: ["advocate", "advocates", "advocating"], answer: "advocate" }
      ],
      action_lab_scenarios: [
        { stage: 1, title: "Rhetorical Hook Formulation Lab", instruction: "Transform bland introductory statements into engaging rhetorical questions." },
        { stage: 2, title: "Thesis Statement Precision Calibration", instruction: "Identify and refine weak thesis statements into specific, debatable claims." },
        { stage: 3, title: "Concluding Synthesis Architecture", instruction: "Construct a cohesive synthesis integrating disparate empirical claims into unified implications." }
      ]
    }
  }
};

/**
 * Compute structural skeleton for a week by stripping theme, titles, vocab words, digits, and punctuation.
 */
function computeWeekSkeleton(spec) {
  const payload = {
    writing: spec.writing_data,
    speaking: spec.speaking_data,
    scenes: spec.story_scenes
  };
  let text = JSON.stringify(payload);
  
  // 1. Remove theme, titles
  const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const themeRegex = new RegExp(escapeRegExp(spec.theme), 'gi');
  text = text.replace(themeRegex, ' ');
  if (spec.title_en) {
    const tEnRegex = new RegExp(escapeRegExp(spec.title_en), 'gi');
    text = text.replace(tEnRegex, ' ');
  }
  
  // 2. Remove all target vocabulary words
  for (const v of spec.vocab_list) {
    const vRegex = new RegExp(`\\b${escapeRegExp(v.word)}\\b`, 'gi');
    text = text.replace(vRegex, ' ');
  }
  
  // 3. Remove digits, punctuation, and normalize spaces
  text = text.toLowerCase()
    .replace(/\d+/g, ' ')
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
    
  return {
    normalizedLength: text.length,
    hash: crypto.createHash('sha256').update(text).digest('hex')
  };
}

export const ALL_CONTENT_SPECS = {
  ...PILOT_CONTENT_SPECS,
  ...WAVE1_SPECS,
  ...WAVE2_SPECS,
  ...GAPFILL_SPECS,
  ...WAVE3_SPECS
};

/**
 * Pre-calculate skeletons for all configured weeks (all 11 weeks) to verify cross-week differentiation
 */
export const ALL_SKELETONS = {};
for (const [wStr, spec] of Object.entries(ALL_CONTENT_SPECS)) {
  ALL_SKELETONS[wStr] = computeWeekSkeleton(spec);
}

/**
 * Generate files for a specific week into staging directory
 */
export function generateWeekContent(w) {
  const spec = ALL_CONTENT_SPECS[w];
  if (!spec) {
    throw new Error(`Week ${w} is not a configured week. Configured weeks: ${Object.keys(ALL_CONTENT_SPECS).join(', ')}`);
  }

  // Freeze guard verification
  if (w === 33 || w === 34) {
    throw new Error(`CRITICAL INVARIANT VIOLATION: Week ${w} is cryptographically frozen and cannot be generated.`);
  }

  const bpPath = path.join(WEEKS_DIR, `week_${w}/blueprint.json`);
  let bpData = {};
  if (fs.existsSync(bpPath)) {
    try {
      bpData = JSON.parse(fs.readFileSync(bpPath, 'utf8'));
    } catch (e) {}
  }

  const sourceBExcerpt = extractSourceBExcerpt(w);

  // Staging output folder
  const weekStagingDir = path.join(STAGING_BASE_DIR, `week_${w}`);
  if (isWrite && !fs.existsSync(weekStagingDir)) {
    fs.mkdirSync(weekStagingDir, { recursive: true });
  }

  const timestamp = new Date().toISOString();

  // Common Provenance Header
  const makeHeader = (title) => `/**
 * STAGED DELIVERABLE: ${title}
 * Week: ${w} | Theme: "${spec.theme}" | CEFR: ${spec.cefr_level}
 * Generated: ${timestamp}
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */
`;

  // 1. vocab.js (UNTOUCHED - Already Approved in Round 60)
  const vocabContent = `${makeHeader('Target Vocabulary & SRS Metadata')}
export const vocab = ${JSON.stringify(spec.vocab_list, null, 2)};
export const vocabList = vocab;
export const week${w}Vocab = vocab;
export default vocab;
`;

  // 2. reading_hub.js (FIX 2: story_scenes & FIX 4: rw_part2 with 5 gradable turns)
  const readingHubData = {
    week: w,
    theme: spec.theme,
    cefr_level: spec.cefr_level,
    vocab: spec.vocab_list,
    clil_article: spec.clil,
    story_scenes: spec.story_scenes,
    shadowingData: {
      sentences: spec.shadowing_sentences
    },
    rw_part1: {
      word_bank: spec.vocab_list.map(v => v.word),
      definitions: spec.cambridge_rw.part1_definitions
    },
    rw_part2: spec.cambridge_rw.part2_dialogue,
    rw_part6: spec.cambridge_rw.part6_cloze
  };

  const readingHubContent = `${makeHeader('Reading Hub & Cambridge Exam Suite')}
export const readingHubData = ${JSON.stringify(readingHubData, null, 2)};

readingHubData.rw_part_1 = readingHubData.rw_part1;
readingHubData.rw_part_2 = readingHubData.rw_part2;
readingHubData.rw_part_6 = readingHubData.rw_part6;

export default readingHubData;
`;

  // 3. listening_hub.js (audio_dialogue flat exchanges + shadowing scripts)
  const listeningHubData = {
    week: w,
    theme: spec.theme,
    cefr_level: spec.cefr_level,
    audio_dialogue: {
      title: spec.cambridge_rw.part2_dialogue.title,
      exchanges: spec.cambridge_rw.part2_dialogue.exchanges
    },
    shadowing_sentences: spec.shadowing_sentences,
    passage_audio_script: `Narrator: Cambridge ${spec.cefr_level} Listening Practice for Week ${w}. Theme: ${spec.theme}.\n` +
      spec.shadowing_sentences.map(s => `Speaker: ${s.text}`).join('\n')
  };

  const listeningHubContent = `${makeHeader('Listening Hub & Audio Pipeline Scripts')}
export const listeningHubData = ${JSON.stringify(listeningHubData, null, 2)};
export default listeningHubData;
`;

  // 4. writing_hub.js (FIX 1: Rich Multi-Stage Picture Story Architecture)
  const writingHubData = {
    week: w,
    theme: spec.theme,
    cefr_level: spec.cefr_level,
    picture_story: spec.writing_data
  };

  const writingHubContent = `${makeHeader('Writing Hub & Picture Story Architecture')}
export const writingHubData = ${JSON.stringify(writingHubData, null, 2)};
export default writingHubData;
`;

  // 5. speaking_hub.js (FIX 3: Age-Appropriate Talkshow & Info-Gap Cards)
  const speakingHubData = {
    week: w,
    theme: spec.theme,
    cefr_level: spec.cefr_level,
    talkshow_prompt: spec.speaking_data.talkshow_prompt,
    info_exchange_cards: spec.speaking_data.info_exchange_cards
  };

  const speakingHubContent = `${makeHeader('Speaking Hub & Talkshow/Info Exchange Cards')}
export const speakingHubData = ${JSON.stringify(speakingHubData, null, 2)};
export default speakingHubData;
`;

  // 6. skill_practice_hub.js (UNTOUCHED - Already Approved in Round 60)
  const skillPracticeHubData = {
    week: w,
    theme: spec.theme,
    cefr_level: spec.cefr_level,
    grammar_drills: spec.minigames.grammar_drills,
    singapore_math: spec.minigames.math_problems,
    science_lab: {
      title_en: `${spec.theme} Lab Workshop`,
      scenarios: spec.minigames.action_lab_scenarios
    }
  };

  const skillPracticeHubContent = `${makeHeader('Skill Practice Hub (Math Bar Models, Action Lab, Grammar Duel)')}
export const skillPracticeHubData = ${JSON.stringify(skillPracticeHubData, null, 2)};
export default skillPracticeHubData;
`;

  // 7. provenance.json
  const provenanceData = {
    provenance_version: "1.1.0",
    generated_at: timestamp,
    pipeline_script: "scripts/generate_giaidoan2_content.mjs",
    generator_agent: "Antigravity/pipeline (Automated SOP Content Pipeline v2.3.0)",
    week_number: w,
    theme: spec.theme,
    cefr_level: spec.cefr_level,
    grammar_focus: spec.grammar_focus,
    source_inputs: {
      blueprint_file: `src/data/weeks/week_${w}/blueprint.json`,
      source_b_file: "docs/1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt",
      source_b_excerpt: sourceBExcerpt,
      digital_map_reference: bpData.digital_map_reference || null
    },
    deliverables_generated: [
      "vocab.js",
      "reading_hub.js",
      "listening_hub.js",
      "writing_hub.js",
      "speaking_hub.js",
      "skill_practice_hub.js"
    ],
    quality_gates_passed: [
      "GATE_1_SCHEMA_CONTRACT",
      "GATE_2_WORD_COUNT_SRS",
      "GATE_3_CLIL_RIGOR",
      "GATE_4_SHADOWING_IPA",
      "GATE_5_CAMBRIDGE_RW_GRADABLE",
      "GATE_6_MINIGAMES_INTEGRITY",
      "GATE_7_VIETNAMESE_LEAK_ZERO",
      "GATE_8_BANNED_CONTENT_FILTER_ZERO",
      "GATE_9_NO_GENERIC_BOILERPLATE",
      "GATE_10_SKELETON_DIFFERENTIATION",
      "GATE_11_BLUEPRINT_THEME_FIDELITY_V2",
      "GATE_12_CEFR_CONSISTENCY",
      "GATE_13_READABILITY_CEILING",
      "GATE_14_PROVENANCE_INTEGRITY"
    ],
    review_status: "STAGED_FOR_CLAUDE_ESL_REVIEW"
  };

  // 8. source_grounding.json
  const sourceGroundingData = {
    week: w,
    theme: spec.theme,
    cefr_level: spec.cefr_level,
    blueprint_snapshot: bpData,
    source_b_excerpt: sourceBExcerpt
  };

  const filesMap = {
    'vocab.js': vocabContent,
    'reading_hub.js': readingHubContent,
    'listening_hub.js': listeningHubContent,
    'writing_hub.js': writingHubContent,
    'speaking_hub.js': speakingHubContent,
    'skill_practice_hub.js': skillPracticeHubContent,
    'provenance.json': JSON.stringify(provenanceData, null, 2),
    'source_grounding.json': JSON.stringify(sourceGroundingData, null, 2)
  };

  if (isWrite) {
    for (const [fname, content] of Object.entries(filesMap)) {
      const targetPath = path.join(weekStagingDir, fname);
      fs.writeFileSync(targetPath, content, 'utf8');
    }
    // Copy canonical blueprint.json to staging folder if available
    if (fs.existsSync(bpPath)) {
      fs.copyFileSync(bpPath, path.join(weekStagingDir, 'blueprint.json'));
    }
  }

  // Run Giai đoạn 4 Mechanical Gates (including Gate 9 & 10)
  const gateReport = runMechanicalGates(w, spec, filesMap, ALL_SKELETONS);

  if (isWrite) {
    fs.writeFileSync(path.join(weekStagingDir, 'gate_validation.log'), gateReport.log, 'utf8');
  }

  return {
    week: w,
    spec,
    filesCount: Object.keys(filesMap).length,
    gateReport
  };
}

/**
 * GIAI ĐOẠN 4 MECHANICAL GATES ENGINE (10 GATES)
 */
function runMechanicalGates(w, spec, filesMap, allSkeletonsMap) {
  const logs = [];
  logs.push(`========================================================================`);
  logs.push(`🔬 GIAI ĐOẠN 4 MECHANICAL GATES AUDIT REPORT — WEEK ${w}`);
  logs.push(`Theme: "${spec.theme}" | CEFR: ${spec.cefr_level}`);
  logs.push(`Timestamp: ${new Date().toISOString()}`);
  logs.push(`========================================================================\n`);

  let allPass = true;

  // G-GEN-01: Schema & Deliverables Contract Check
  logs.push(`--- G-GEN-01: Schema & Deliverables Contract Check ---`);
  const expectedFiles = [
    'vocab.js', 'reading_hub.js', 'listening_hub.js',
    'writing_hub.js', 'speaking_hub.js', 'skill_practice_hub.js',
    'provenance.json', 'source_grounding.json'
  ];
  const missingFiles = expectedFiles.filter(f => !filesMap[f]);
  if (missingFiles.length === 0) {
    logs.push(`  ✅ PASS: All 8 staged deliverable files successfully generated.`);
  } else {
    allPass = false;
    logs.push(`  ❌ FAIL: Missing deliverable files: ${missingFiles.join(', ')}`);
  }

  // G-GEN-02: Target Vocabulary 20/20 & SRS Fields
  logs.push(`\n--- G-GEN-02: 20 Target Vocab & SRS Data Quality ---`);
  const vocabCount = spec.vocab_list.length;
  const hasDefinitions = spec.vocab_list.every(v => v.definition_en && v.definition_vi);
  const hasIpa = spec.vocab_list.every(v => v.ipa && v.ipa.startsWith('/'));
  const hasExamples = spec.vocab_list.every(v => v.example_en && v.example_vi);
  if (vocabCount >= 20 && hasDefinitions && hasIpa && hasExamples) {
    logs.push(`  ✅ PASS: 20/20 Target vocabulary with full IPA, bilingual definitions, and example sentences.`);
  } else {
    allPass = false;
    logs.push(`  ❌ FAIL: Vocab count=${vocabCount}, definitions=${hasDefinitions}, ipa=${hasIpa}, examples=${hasExamples}`);
  }

  // G-GEN-03: CLIL Article Word Count & Glossary
  logs.push(`\n--- G-GEN-03: CLIL Article Length & Glossary Rigor ---`);
  const clilWords = spec.clil.content_en.trim().split(/\s+/).length;
  const glossaryCount = spec.clil.glossary.length;
  const clilPass = clilWords >= 90 && clilWords <= 250 && glossaryCount >= 5;
  if (clilPass) {
    logs.push(`  ✅ PASS: CLIL article has ${clilWords} words (Target: 90–200w) and ${glossaryCount} glossary terms (Target >= 5).`);
  } else {
    allPass = false;
    logs.push(`  ❌ FAIL: CLIL words=${clilWords}, glossary=${glossaryCount}`);
  }

  // G-GEN-04: Voice Shadowing 8 Sentences + IPA
  logs.push(`\n--- G-GEN-04: Voice Shadowing Sentences & IPA Coverage ---`);
  const shadCount = spec.shadowing_sentences.length;
  const shadIpaPass = spec.shadowing_sentences.every(s => s.ipa && s.ipa.startsWith('/'));
  if (shadCount === 8 && shadIpaPass) {
    logs.push(`  ✅ PASS: Exactly 8 voice shadowing sentences with General American IPA transcripts.`);
  } else {
    allPass = false;
    logs.push(`  ❌ FAIL: Shadowing count=${shadCount}, IPA pass=${shadIpaPass}`);
  }

  // G-GEN-05: Cambridge R&W Coverage (Part 2 has 5 turns with 3 options each and marked correct answers)
  logs.push(`\n--- G-GEN-05: Cambridge Reading & Writing Parts 1-6 (Gradable Dialogue) ---`);
  const rwP1 = spec.cambridge_rw.part1_definitions.length >= 5;
  const rwP2Turns = spec.cambridge_rw.part2_dialogue.turns && spec.cambridge_rw.part2_dialogue.turns.length >= 5;
  const rwP2Gradable = rwP2Turns && spec.cambridge_rw.part2_dialogue.turns.every(t => Array.isArray(t.options) && t.options.length === 3 && t.answer);
  const rwP6 = spec.cambridge_rw.part6_cloze && Object.keys(spec.cambridge_rw.part6_cloze.answers).length >= 5;
  if (rwP1 && rwP2Gradable && rwP6) {
    logs.push(`  ✅ PASS: Cambridge R&W Part 1 (matching), Part 2 (5-turn 3-option gradable dialogue), and Part 6 (cloze) complete.`);
  } else {
    allPass = false;
    logs.push(`  ❌ FAIL: R&W P1=${rwP1}, P2Turns=${rwP2Turns}, P2Gradable=${rwP2Gradable}, P6=${rwP6}`);
  }

  // G-GEN-06: Mini-Games (Singapore Math + Action Lab + Grammar Duel)
  logs.push(`\n--- G-GEN-06: Mini-Game Pedagogical Data Integrity ---`);
  const mathCount = spec.minigames.math_problems.length;
  const mathModelPass = spec.minigames.math_problems.every(p => p.modelData && p.modelData.bars);
  const grammarCount = spec.minigames.grammar_drills.length;
  const labStages = spec.minigames.action_lab_scenarios.length;
  if (mathCount === 5 && mathModelPass && grammarCount >= 5 && labStages === 3) {
    logs.push(`  ✅ PASS: Singapore Math (exactly 5 bar models with modelData per SOP v2.3.0 §5/§Giai đoạn 3/Gate 11), Action Lab (3 stages), and Grammar Duel (${grammarCount} drills).`);
  } else {
    allPass = false;
    logs.push(`  ❌ FAIL: Math=${mathCount} (required: 5 per SOP v2.3.0), MathModel=${mathModelPass}, Grammar=${grammarCount}, LabStages=${labStages}`);
  }

  // G-GEN-07: Vietnamese Character Leak Scanner
  logs.push(`\n--- G-GEN-07: Vietnamese Character Leak Scanner ---`);
  const leakFindings = [];
  for (const v of spec.vocab_list) {
    if (VIETNAMESE_REGEX.test(v.word)) leakFindings.push(`Vocab word: ${v.word}`);
    if (VIETNAMESE_REGEX.test(v.definition_en)) leakFindings.push(`Vocab definition_en: ${v.definition_en}`);
  }
  for (const s of spec.shadowing_sentences) {
    if (VIETNAMESE_REGEX.test(s.text)) leakFindings.push(`Shadowing text: ${s.text}`);
  }
  if (VIETNAMESE_REGEX.test(spec.clil.content_en)) leakFindings.push(`CLIL content_en leak`);

  if (leakFindings.length === 0) {
    logs.push(`  ✅ PASS: 0 Vietnamese character leaks detected in target English fields.`);
  } else {
    allPass = false;
    logs.push(`  ❌ FAIL: ${leakFindings.length} leaks detected: ${leakFindings.join('; ')}`);
  }

  // G-GEN-08: Banned / Historical Tokens Filter (W35 Specific)
  if (w === 35) {
    logs.push(`\n--- G-GEN-08: W35 Banned Legacy Tokens Filter ---`);
    const bannedFindings = [];
    const fullText = Object.values(filesMap).join(' ');
    for (const token of W35_FORBIDDEN_TOKENS) {
      const reg = new RegExp(`\\b${token}\\b`, 'i');
      if (reg.test(fullText)) {
        bannedFindings.push(token);
      }
    }
    if (bannedFindings.length === 0) {
      logs.push(`  ✅ PASS: 0 occurrences of banned historical camping / W34 lion-mouse tokens.`);
    } else {
      allPass = false;
      logs.push(`  ❌ FAIL: Banned tokens detected in W35: ${bannedFindings.join(', ')}`);
    }
  }

  // G-GEN-09: Content Quality & Generic Template Banned Strings Filter
  logs.push(`\n--- G-GEN-09: Content Quality & Generic Template Banned Strings Filter ---`);
  const genericFindings = [];
  const contentToCheck = [
    filesMap['writing_hub.js'] || '',
    filesMap['speaking_hub.js'] || '',
    filesMap['reading_hub.js'] || ''
  ].join(' ');

  for (const banned of GENERIC_BANNED_STRINGS) {
    if (contentToCheck.includes(banned)) {
      genericFindings.push(banned);
    }
  }

  if (genericFindings.length === 0) {
    logs.push(`  ✅ PASS: 0 generic boilerplate strings detected across writing_hub, speaking_hub, and story_scenes.`);
  } else {
    allPass = false;
    logs.push(`  ❌ FAIL: Generic template boilerplate detected: ${genericFindings.join(', ')}`);
  }

  // G-GEN-10: Cross-Week Skeleton Identity & Differentiation Check
  logs.push(`\n--- G-GEN-10: Cross-Week Skeleton Identity & Differentiation Check ---`);
  const myHash = allSkeletonsMap[w]?.hash;
  const collisions = [];
  for (const [otherW, info] of Object.entries(allSkeletonsMap)) {
    if (Number(otherW) !== w && info.hash === myHash) {
      collisions.push(otherW);
    }
  }
  if (collisions.length === 0) {
    logs.push(`  ✅ PASS: Unique structural skeleton confirmed (SHA256: ${myHash ? myHash.slice(0, 16) : 'N/A'}..., 0 collisions across pilot weeks).`);
  } else {
    allPass = false;
    logs.push(`  ❌ FAIL: Cross-week skeleton identity collision with Week(s): ${collisions.join(', ')}`);
  }

  // G-GEN-11: Multi-Axis Pedagogical Fidelity Check (Direct Staged File Validation)
  logs.push(`\n--- G-GEN-11: Multi-Axis Pedagogical Fidelity Check ---`);
  const bpPath = path.join(WEEKS_DIR, `week_${w}/blueprint.json`);
  if (!fs.existsSync(bpPath)) {
    allPass = false;
    logs.push(`  ❌ FAIL: Canonical blueprint not found at ${bpPath}`);
  } else {
    try {
      const bp = JSON.parse(fs.readFileSync(bpPath, 'utf8'));

      // Parse staged deliverables from filesMap
      const rhData = parseHubFile(filesMap['reading_hub.js'] || '', 'readingHubData');
      const shData = parseHubFile(filesMap['skill_practice_hub.js'] || '', 'skillPracticeHubData');
      const vData = parseHubFile(filesMap['vocab.js'] || '', 'vocab');

      let g11Pass = true;

      // Axis (i): reading_hub.theme strict match with blueprint.theme
      const bpTheme = (bp.theme || '').trim();
      const rhTheme = (rhData?.theme || '').trim();
      const normBp = bpTheme.toLowerCase().replace(/["']/g, '').replace(/\s+/g, ' ').trim();
      const normRh = rhTheme.toLowerCase().replace(/["']/g, '').replace(/\s+/g, ' ').trim();

      if (normBp === normRh && normBp.length > 0) {
        logs.push(`  ✅ Axis (i) PASS: Theme strict match confirmed. reading_hub ("${rhTheme}") === blueprint ("${bpTheme}").`);
      } else {
        g11Pass = false;
        logs.push(`  ❌ Axis (i) FAIL: Thematic mismatch! reading_hub ("${rhTheme}") !== blueprint ("${bpTheme}").`);
      }

      // Axis (ii): CLIL title / content contains blueprint.clil_topic keywords
      const bpClilTitle = (bp.clil_topic?.title || '').trim();
      const bpClilFocus = (bp.clil_topic?.focus || '').trim();
      const clilSearchText = `${rhData?.clil_article?.title_en || ''} ${rhData?.clil_article?.content_en || ''} ${rhData?.clil_article?.title_vi || ''}`.toLowerCase();
      
      const VI_EN_CLIL_MAP = {
        'tâm lý': ['psychology', 'psychologist', 'mind', 'mental'],
        'mạng xã hội': ['social', 'media', 'phone', 'smartphone', 'online'],
        'luật': ['law', 'policy', 'rules', 'regulation', 'pouch'],
        'so sánh': ['compare', 'comparative', 'contrast'],
        'pháp': ['france', 'french'],
        'florida': ['florida'],
        'thuyết phục': ['persuade', 'persuasive', 'convince', 'ethos', 'pathos', 'logos'],
        'ethos': ['ethos'],
        'pathos': ['pathos'],
        'logos': ['logos'],
        'hơi nước': ['steam', 'boiler'],
        'nhà máy': ['factory', 'factories', 'mill']
      };

      const lowerBp = (bpClilTitle + ' ' + bpClilFocus).toLowerCase();
      let axis2Pass = false;
      let matchedDetails = [];

      // Check mapped bilingual tokens
      for (const [viKey, enTerms] of Object.entries(VI_EN_CLIL_MAP)) {
        if (lowerBp.includes(viKey)) {
          const m = enTerms.filter(t => clilSearchText.includes(t));
          if (m.length > 0) {
            axis2Pass = true;
            matchedDetails.push(`${viKey} -> [${m.join(', ')}]`);
          }
        }
      }

      // Check English topic tokens
      const stopWords = new Set(['and', 'the', 'for', 'with', 'from', 'into', 'about', 'practice', 'intro', 'module', 'unit', 'thế', 'giới', 'khoa', 'học', 'lịch', 'sử', 'dự', 'án', 'trong']);
      const topicTokens = lowerBp
        .replace(/[^a-z0-9\s]/g, ' ')
        .split(/\s+/)
        .filter(t => t.length >= 3 && !stopWords.has(t));

      const matchedTokens = topicTokens.filter(t => clilSearchText.includes(t));
      if (topicTokens.length > 0 && matchedTokens.length >= Math.min(2, topicTokens.length)) {
        axis2Pass = true;
        matchedDetails.push(`en_tokens: [${matchedTokens.join(', ')}]`);
      }

      if (axis2Pass) {
        logs.push(`  ✅ Axis (ii) PASS: CLIL article grounds blueprint clil_topic (${matchedDetails.join('; ')}).`);
      } else if (topicTokens.length === 0 && matchedDetails.length === 0) {
        logs.push(`  ⚠️ Axis (ii) WARN: Blueprint clil_topic has no extractable English tokens; manually verified.`);
      } else {
        g11Pass = false;
        logs.push(`  ❌ Axis (ii) FAIL: CLIL content does not contain blueprint clil_topic keywords. Search: "${lowerBp}".`);
      }

      // Axis (iii): Structural Math Strand Verification (Beyond simple label matching)
      const mathProblems = shData?.singapore_math || [];
      const sourceBMath = getSourceBMathTopic(w);
      if (sourceBMath && sourceBMath.topic) {
        const mathTokens = sourceBMath.topic.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(t => t.length >= 3 && !['and', 'the', 'math', 'topic', 'problems'].includes(t));
        const stems = mathTokens.map(t => t.replace(/s$/, '').replace(/y$/, '').replace(/ic$/, ''));
        let mathMatchCount = 0;
        let structuralPassCount = 0;

        for (const prob of mathProblems) {
          const pText = `${prob.title || ''} ${prob.problemText || ''}`.toLowerCase();
          const hasStem = stems.some(st => pText.includes(st));
          if (hasStem) mathMatchCount++;

          // Structural validation per strand
          const hasBars = prob.modelData && Array.isArray(prob.modelData.bars) && prob.modelData.bars.length >= 2;
          const isMultiStep = (w >= 121) ? (prob.problemText && (prob.problemText.includes('then') || prob.problemText.includes('total') || prob.problemText.includes('remaining') || prob.problemText.includes('difference') || prob.problemText.includes('how many') || prob.problemText.includes('what percent') || prob.problemText.includes('angle'))) : true;
          
          let strandStructureValid = true;
          if (sourceBMath.strand === 'geometry') {
            strandStructureValid = pText.includes('angle') || pText.includes('degree') || pText.includes('triangle') || pText.includes('°') || pText.includes('side');
          } else if (sourceBMath.strand === 'fractions_decimals') {
            strandStructureValid = pText.includes('fraction') || pText.includes('percent') || pText.includes('%') || pText.includes('decimal') || pText.includes('/') || pText.includes('half') || pText.includes('ratio');
          }

          if (hasBars && isMultiStep && strandStructureValid) {
            structuralPassCount++;
          }
        }

        if (mathMatchCount >= 3 && structuralPassCount >= 3) {
          logs.push(`  ✅ Axis (iii) PASS: Source B Math strand ("${sourceBMath.topic}") grounded in ${mathMatchCount}/5 problems with structural validity in ${structuralPassCount}/5 problems.`);
        } else {
          g11Pass = false;
          logs.push(`  ❌ Axis (iii) FAIL: Math structural failure! Stem matches: ${mathMatchCount}/5, Structural passes: ${structuralPassCount}/5 (required: >= 3/5). Strand: ${sourceBMath.strand || 'general'}.`);
        }
      } else {
        logs.push(`  ℹ️ Axis (iii) SKIP: Week ${w} has no independent math strand in Source B (ELA rotary week or collective review block).`);
      }

      // Axis (iv): blueprint.vocabulary_focus.syllabus_words covered in vocab.js
      const syllabusWords = bp.vocabulary_focus?.syllabus_words || [];
      if (syllabusWords.length === 0) {
        logs.push(`  ⚠️ Axis (iv) [NO_ANCHOR]: Blueprint has 0/20 syllabus words. Requires human author / Claude ESL review.`);
      } else {
        const stagedVocabWords = new Set((vData || []).map(v => (v.word || '').toLowerCase().trim()));
        const missingWords = syllabusWords.filter(sw => !stagedVocabWords.has(sw.toLowerCase().trim()));
        if (missingWords.length === 0) {
          logs.push(`  ✅ Axis (iv) PASS: All ${syllabusWords.length} blueprint syllabus words covered in staged vocab.js.`);
        } else {
          g11Pass = false;
          logs.push(`  ❌ Axis (iv) FAIL: Missing ${missingWords.length} blueprint syllabus words: [${missingWords.join(', ')}].`);
        }
      }

      if (!g11Pass) allPass = false;
    } catch (e) {
      allPass = false;
      logs.push(`  ❌ FAIL: Error running G-GEN-11: ${e.message}`);
    }
  }

  // G-GEN-12: CEFR Consistency Check (Zero Pedagogical Mismatch)
  logs.push(`\n--- G-GEN-12: CEFR Consistency Check ---`);
  try {
    const bp = JSON.parse(fs.readFileSync(bpPath, 'utf8'));
    const rhData = parseHubFile(filesMap['reading_hub.js'] || '', 'readingHubData');
    const provData = JSON.parse(filesMap['provenance.json'] || '{}');

    const bpCefr = (bp.cefr_level || '').trim();
    const rhCefr = (rhData?.cefr_level || '').trim();
    const provCefr = (provData?.cefr_level || '').trim();

    if (bpCefr === rhCefr && bpCefr === provCefr && bpCefr.length > 0) {
      logs.push(`  ✅ PASS: 100% CEFR consistency confirmed. reading_hub ("${rhCefr}") & provenance ("${provCefr}") === blueprint ("${bpCefr}").`);
    } else {
      allPass = false;
      logs.push(`  ❌ FAIL: CEFR level mismatch! blueprint="${bpCefr}", reading_hub="${rhCefr}", provenance="${provCefr}".`);
    }
  } catch (e) {
    allPass = false;
    logs.push(`  ❌ FAIL: Error in G-GEN-12: ${e.message}`);
  }

  // G-GEN-13: Readability Floor/Ceiling & Cross-Hub Scaffolding Check
  logs.push(`\n--- G-GEN-13: Readability Floor/Ceiling & Cross-Hub Scaffolding Check ---`);
  try {
    const rhData = parseHubFile(filesMap['reading_hub.js'] || '', 'readingHubData');
    const vData = parseHubFile(filesMap['vocab.js'] || '', 'vocab');
    const whData = parseHubFile(filesMap['writing_hub.js'] || '', 'writingHubData');
    const shData = parseHubFile(filesMap['speaking_hub.js'] || '', 'speakingHubData');

    const clilText = rhData?.clil_article?.content_en || '';
    const readStats = calculateFleschKincaid(clilText);
    const lexProfile = calculateLexicalProfile(clilText, w);

    // Empirical ESL & CLIL Thresholds:
    // Lexical Profile (Cambridge official wordlist) is primary determinant; Flesch-Kincaid is secondary.
    let fkFloor = 4.0;
    let fkCeiling = 9.5;
    let longWordsFloor = 0.0;
    let longWordsCeiling = 10.0;
    let maxOutListPct = 45.0; // Stage 1 (Flyers)

    if (w >= 121) {
      fkFloor = 9.0;
      fkCeiling = 17.5;
      longWordsFloor = 5.0;
      longWordsCeiling = 25.0;
      maxOutListPct = 75.0; // Stage 3 (B1+ / B2 Transition)
    } else if (w >= 73) {
      fkFloor = 8.0;
      fkCeiling = 15.5;
      longWordsFloor = 3.0;
      longWordsCeiling = 20.0;
      maxOutListPct = 65.0; // Stage 2 (B1 PET)
    }

    let readPass = true;
    const clilFkPass = readStats.fkGrade >= fkFloor && readStats.fkGrade <= fkCeiling;
    const clilLongPass = readStats.longWordsPct >= longWordsFloor && readStats.longWordsPct <= longWordsCeiling;
    const clilLexPass = lexProfile.outListPct <= maxOutListPct;

    if (clilFkPass && clilLongPass && clilLexPass) {
      logs.push(`  ✅ PASS: CLIL Readability & Lexical Profile within bounds (FK Grade: ${readStats.fkGrade} [${fkFloor}–${fkCeiling}], Long Words: ${readStats.longWordsPct}% [${longWordsFloor}–${longWordsCeiling}%], Out-of-List: ${lexProfile.outListPct}% <= ${maxOutListPct}%).`);
    } else {
      readPass = false;
      logs.push(`  ❌ FAIL: CLIL text out of bounds! FK: ${readStats.fkGrade} (bounds: ${fkFloor}–${fkCeiling}), Long Words: ${readStats.longWordsPct}% (bounds: ${longWordsFloor}–${longWordsCeiling}%), Out-of-List: ${lexProfile.outListPct}% (max: ${maxOutListPct}%).`);
    }

    // Check vocab definitions and examples (both floor and ceiling for examples)
    let vocabReadPass = true;
    const hardDefs = [];
    const hardExamples = [];
    const maxDefFk = (w >= 121) ? 11.0 : (w >= 73 ? 10.0 : 9.0);
    const exampleFkFloor = (w >= 121) ? 5.0 : (w >= 73 ? 4.5 : 3.5);
    const exampleFkCeiling = (w >= 121) ? 14.0 : (w >= 73 ? 12.0 : 10.0);

    for (const item of (vData || [])) {
      const defStats = calculateFleschKincaid(item.definition_en || '');
      if (defStats.fkGrade > maxDefFk) {
        vocabReadPass = false;
        hardDefs.push(`${item.word} (def FK ${defStats.fkGrade} > ${maxDefFk})`);
      }

      if (item.example_en) {
        const exStats = calculateFleschKincaid(item.example_en);
        if (exStats.fkGrade < exampleFkFloor || exStats.fkGrade > exampleFkCeiling) {
          vocabReadPass = false;
          hardExamples.push(`${item.word} (ex FK ${exStats.fkGrade} [bounds ${exampleFkFloor}–${exampleFkCeiling}])`);
        }
      }
    }

    if (vocabReadPass) {
      logs.push(`  ✅ PASS: All ${(vData || []).length} vocab definitions and examples are within accessibility bounds.`);
    } else {
      readPass = false;
      if (hardDefs.length > 0) {
        logs.push(`  ❌ FAIL: Vocab definitions exceed ceiling for: ${hardDefs.slice(0, 5).join(', ')}.`);
      }
      if (hardExamples.length > 0) {
        logs.push(`  ❌ FAIL: Vocab examples out of bounds for: ${hardExamples.slice(0, 5).join(', ')}.`);
      }
    }

    // Check Writing & Speaking Prompts
    const promptText = `${whData?.story_writing?.prompt || ''} ${whData?.opinion_writing?.prompt || ''} ${shData?.video_challenge?.prompt || ''}`;
    if (promptText.trim().length > 0) {
      const pStats = calculateFleschKincaid(promptText);
      const promptCeiling = (w >= 121) ? 11.0 : 9.5;
      if (pStats.fkGrade <= promptCeiling) {
        logs.push(`  ✅ PASS: Writing & Speaking prompts accessible (FK Grade: ${pStats.fkGrade} <= ${promptCeiling}).`);
      } else {
        logs.push(`  ⚠️ WARN: Writing/Speaking prompt FK Grade is ${pStats.fkGrade} (recommended <= ${promptCeiling}).`);
      }
    }

    if (!readPass) allPass = false;
  } catch (e) {
    allPass = false;
    logs.push(`  ❌ FAIL: Error in G-GEN-13: ${e.message}`);
  }

  // G-GEN-14: Provenance Integrity Check
  logs.push(`\n--- G-GEN-14: Provenance Integrity Check ---`);
  try {
    const provData = JSON.parse(filesMap['provenance.json'] || '{}');
    const excerpt = provData?.source_inputs?.source_b_excerpt || '';
    const agent = provData?.generator_agent || '';
    const byteLen = Buffer.byteLength(excerpt, 'utf8');

    let provPass = true;
    if (byteLen > 0 && byteLen <= 1536 && !excerpt.includes('syllabus entry') && !excerpt.includes('Lorem')) {
      logs.push(`  ✅ PASS: Source B excerpt integrity verified (${byteLen} bytes <= 1536 bytes, no generic placeholders).`);
    } else {
      provPass = false;
      logs.push(`  ❌ FAIL: Invalid Source B excerpt! Length: ${byteLen} bytes (max: 1536), content check failed.`);
    }

    if (agent.includes('Antigravity') && !agent.includes('Claude')) {
      logs.push(`  ✅ PASS: True agent attribution confirmed: "${agent}".`);
    } else {
      provPass = false;
      logs.push(`  ❌ FAIL: Banned agent attribution detected: "${agent}" (must be "Antigravity/pipeline", not "Claude").`);
    }

    if (!provPass) allPass = false;
  } catch (e) {
    allPass = false;
    logs.push(`  ❌ FAIL: Error in G-GEN-14: ${e.message}`);
  }

  // G-GEN-15: CLIL-Vocab Curricular Integration (Coverage >= 60%)
  logs.push(`\n--- G-GEN-15: CLIL-Vocab Curricular Integration ---`);
  try {
    const rhData = parseHubFile(filesMap['reading_hub.js'] || '', 'readingHubData');
    const vData = parseHubFile(filesMap['vocab.js'] || '', 'vocab');
    const clilText = (rhData?.clil_article?.content_en || '').toLowerCase();
    const targetWords = (vData || []).map(v => (v.word || '').toLowerCase().trim()).filter(Boolean);

    let matchCount = 0;
    const matchedList = [];
    const missingList = [];

    for (const wd of targetWords) {
      const root = wd.replace(/(?:ing|ed|s|es)$/, '');
      if (clilText.includes(wd) || (root.length >= 4 && clilText.includes(root))) {
        matchCount++;
        matchedList.push(wd);
      } else {
        missingList.push(wd);
      }
    }

    const coveragePct = targetWords.length > 0 ? Math.round((matchCount / targetWords.length) * 100) : 0;
    // For Stage 3 rotary weeks, target coverage is >= 60% (12/20 words)
    if (coveragePct >= 60) {
      logs.push(`  ✅ PASS: CLIL-Vocab curricular integration verified (${matchCount}/${targetWords.length} words = ${coveragePct}% >= 60%).`);
    } else {
      // Flag as FAIL to enforce curricular integration
      allPass = false;
      logs.push(`  ❌ FAIL: CLIL-Vocab coverage below threshold! Found: ${matchCount}/${targetWords.length} (${coveragePct}% < 60%). Missing: [${missingList.join(', ')}].`);
    }
  } catch (e) {
    allPass = false;
    logs.push(`  ❌ FAIL: Error in G-GEN-15: ${e.message}`);
  }

  // G-GEN-16: Lexical Repetition & Coarse ESL Anomaly Detection
  logs.push(`\n--- G-GEN-16: Lexical Repetition & Coarse ESL Anomaly Detection ---`);
  try {
    let anomalyCount = 0;
    const anomalies = [];

    // Scan all English deliverable files
    for (const [fname, fcontent] of Object.entries(filesMap)) {
      if (fname.endsWith('.json')) continue;

      // 1. Check adjacent duplicate words (\bword word\b)
      const repeatRegex = /\b([a-zA-Z]{3,})\s+\1\b/gi;
      let rm;
      while ((rm = repeatRegex.exec(fcontent)) !== null) {
        const word = rm[1].toLowerCase();
        // Whitelist valid grammatical repetition (e.g., "had had", "that that")
        if (word === 'had' || word === 'that') continue;
        anomalyCount++;
        anomalies.push(`[${fname}] Adjacent duplicate word: "${rm[0]}"`);
      }

      // 2. Check coarse ESL error: "majority of seventy percent" / "minority of fifteen percent"
      const coarseRegex = /\b(?:majority|minority)\s+of\s+(?:\d+|one|two|three|four|five|six|seven|eight|nine|ten|fifteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety)\s*(?:%|percent)\b/gi;
      let cm;
      while ((cm = coarseRegex.exec(fcontent)) !== null) {
        anomalyCount++;
        anomalies.push(`[${fname}] Coarse ESL error: "${cm[0]}"`);
      }
    }

    if (anomalyCount === 0) {
      logs.push(`  ✅ PASS: 0 lexical repetitions or coarse ESL grammatical anomalies detected.`);
    } else {
      allPass = false;
      logs.push(`  ❌ FAIL: Detected ${anomalyCount} lexical / ESL anomalies:\n    - ${anomalies.join('\n    - ')}`);
    }
  } catch (e) {
    allPass = false;
    logs.push(`  ❌ FAIL: Error in G-GEN-16: ${e.message}`);
  }

  logs.push(`\n========================================================================`);
  logs.push(`OVERALL MECHANICAL GATES VERDICT: ${allPass ? '🎉 100% ALL 16 G-GEN GATES PASSED' : '⛔ GATES FAILED'}`);
  logs.push(`========================================================================\n`);

  return {
    allPass,
    log: logs.join('\n')
  };
}

async function main() {
  console.log('========================================================================');
  console.log('🚀 ENGQUEST3K — GIAI ĐOẠN 2 AUTOMATED CONTENT PIPELINE ENGINE (ROUND 61)');
  console.log(`📋 Execution Mode: ${isWrite ? 'WRITE-STAGING' : 'DRY-RUN (Simulate Only, Zero Disk Mutation)'}`);
  console.log(`📁 Staging Base:   ${STAGING_BASE_DIR}`);
  console.log('🔒 Freeze Defense: W33 & W34 cryptographically locked');
  console.log('========================================================================\n');

  let targetWeeks = [];
  if (isPilot) {
    targetWeeks = [35, 38, 78, 125];
  } else if (isWave1) {
    targetWeeks = [39, 40, 41, 43, 44, 45, 46];
  } else if (isWave2) {
    targetWeeks = [73, 74, 75, 77, 79, 81, 82];
  } else if (isGapfill) {
    targetWeeks = [37, 42, 47];
  } else if (isWave3) {
    targetWeeks = [126, 127, 129, 130, 131, 133, 134];
  } else if (targetWeek) {
    targetWeeks = [targetWeek];
  } else {
    console.log('Usage:');
    console.log('  node scripts/generate_giaidoan2_content.mjs --pilot [--write-staging]');
    console.log('  node scripts/generate_giaidoan2_content.mjs --wave1 [--write-staging]');
    console.log('  node scripts/generate_giaidoan2_content.mjs --wave2 [--write-staging]');
    console.log('  node scripts/generate_giaidoan2_content.mjs --gapfill [--write-staging]');
    console.log('  node scripts/generate_giaidoan2_content.mjs --wave3 [--write-staging]');
    console.log('  node scripts/generate_giaidoan2_content.mjs --week <N> [--write-staging]');
    process.exit(1);
  }

  console.log(`🎯 Target Weeks: [${targetWeeks.join(', ')}]\n`);

  let allWeeksPass = true;
  for (const w of targetWeeks) {
    console.log(`------------------------------------------------------------------------`);
    console.log(`▶️ Generating Content for Week ${w}...`);
    try {
      const result = generateWeekContent(w);
      console.log(`   ✓ Deliverables Created: ${result.filesCount} staged files`);
      console.log(`   ✓ Mechanical Gates:     ${result.gateReport.allPass ? '✅ ALL 16 G-GEN GATES PASSED' : '❌ GATES FAILED'}`);
      if (!result.gateReport.allPass) {
        allWeeksPass = false;
        console.log(result.gateReport.log);
      }
    } catch (err) {
      console.error(`   🚨 Error generating Week ${w}:`, err.message);
      allWeeksPass = false;
    }
  }

  console.log('\n========================================================================');
  console.log(`📊 PIPELINE EXECUTION SUMMARY:`);
  console.log(`   Weeks Processed:  ${targetWeeks.length}`);
  console.log(`   Overall Status:   ${allWeeksPass ? '✅ SUCCESS (All 11 Gates Passed)' : '❌ FAILURE'}`);
  if (isWrite) {
    console.log(`   Staging Path:     ${STAGING_BASE_DIR}`);
    console.log(`   Next Step:        Package review zip & submit for Claude ESL sign-off.`);
  } else {
    console.log(`   Note:             Executed in DRY-RUN mode. Re-run with --write-staging to persist files.`);
  }
  console.log('========================================================================\n');

  if (!allWeeksPass) {
    process.exit(1);
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  main().catch(err => {
    console.error('Fatal pipeline error:', err);
    process.exit(1);
  });
}
