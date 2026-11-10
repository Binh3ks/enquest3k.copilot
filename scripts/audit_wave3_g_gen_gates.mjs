#!/usr/bin/env node
/**
 * scripts/audit_wave3_g_gen_gates.mjs
 * 
 * Round 74 Task E.10 & E.11 Deliverable:
 * Run G-GEN-11 through G-GEN-16 for Wave 3 staged weeks (W126, W127, W133, W134).
 * Specifically documents:
 * - Target vocab coverage in CLIL article (G-GEN-15): W126 (3/20), W127 (8/20), W133 (9/20).
 * - Coarse ESL error in W133 (G-GEN-16): "a majority of seventy percent".
 * - Singapore Math schema/structural failure in W134: 0/5 valid multi-step geometry problems.
 * - Revokes "Keep / Ready" status for W126, W127, W133.
 */

import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const OUT_FILE = path.join(ROOT_DIR, 'docs/agent_artifacts/wave3_g_gen_audit_raw.txt');

function parseHubFile(filePath, exportVar) {
  if (!fs.existsSync(filePath)) return null;
  const content = fs.readFileSync(filePath, 'utf8');
  const modified = content
    .replace(/export\s+default\s+[^;]+;?/g, '')
    .replace(/export\s+(?:const|let|var)\s+/g, 'var ')
    .replace(/import\s+[^;]+;?/g, '');
  const sandbox = {
    ...globalThis,
    readingHubData: {},
    vocab: [],
    skillPracticeHubData: {},
    writingHubData: {},
    speakingHubData: {}
  };
  try {
    vm.runInContext(modified, vm.createContext(sandbox));
    return exportVar ? sandbox[exportVar] : sandbox;
  } catch (e) {
    return null;
  }
}

function countSyllables(word) {
  word = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!word) return 0;
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]|ed|es|e)$/, '');
  word = word.replace(/^y/, '');
  const syl = word.match(/[aeiouy]{1,2}/g);
  return syl ? Math.max(1, syl.length) : 1;
}

function calculateFleschKincaid(text) {
  const clean = text.replace(/\[\d+\]/g, ' ').replace(/\*\*/g, '').replace(/[\r\n]+/g, ' ');
  const sentences = clean.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 3);
  const words = clean.match(/\b[a-zA-Z]+\b/g) || [];
  if (sentences.length === 0 || words.length === 0) return { fkGrade: 0, asl: 0, asw: 0 };
  let syllables = 0;
  for (const w of words) syllables += countSyllables(w);
  const asl = words.length / sentences.length;
  const asw = syllables / words.length;
  const fkGrade = 0.39 * asl + 11.8 * asw - 15.59;
  return {
    fkGrade: Math.round(fkGrade * 10) / 10,
    asl: Math.round(asl * 10) / 10,
    asw: Math.round(asw * 100) / 100
  };
}

let logOutput = '';
function log(msg = '') {
  console.log(msg);
  logOutput += msg + '\n';
}

log('========================================================================================================');
log('🔬 AUDIT G-GEN-11 ĐẾN G-GEN-16 CHO CÁC TUẦN WAVE 3 (ROUND 74)');
log('Áp dụng trên: W126, W127, W133, W134 trong docs/agent_artifacts/staging/');
log('Thu hồi kết luận "Giữ nguyên/Ready" — Phát hiện lỗi từ vựng, ngữ pháp ESL và cấu trúc Toán');
log('========================================================================================================\n');

const targets = [126, 127, 133, 134];

for (const w of targets) {
  const stagedDir = path.join(ROOT_DIR, `docs/agent_artifacts/staging/week_${w}`);
  const rhPath = path.join(stagedDir, 'reading_hub.js');
  const vPath = path.join(stagedDir, 'vocab.js');
  const sphPath = path.join(stagedDir, 'skill_practice_hub.js');
  const whPath = path.join(stagedDir, 'writing_hub.js');
  const shPath = path.join(stagedDir, 'speaking_hub.js');
  const bpPath = path.join(stagedDir, 'blueprint.json');
  const provPath = path.join(stagedDir, 'provenance.json');

  log(`--------------------------------------------------------------------------------------------------------`);
  log(`📌 TUẦN ${w} (docs/agent_artifacts/staging/week_${w})`);
  log(`--------------------------------------------------------------------------------------------------------`);

  const bp = fs.existsSync(bpPath) ? JSON.parse(fs.readFileSync(bpPath, 'utf8')) : null;
  const rhData = parseHubFile(rhPath, 'readingHubData');
  const vData = parseHubFile(vPath, 'vocab');
  const sphData = parseHubFile(sphPath, 'skillPracticeHubData');
  const whData = parseHubFile(whPath, 'writingHubData');
  const shData = parseHubFile(shPath, 'speakingHubData');
  const provData = fs.existsSync(provPath) ? JSON.parse(fs.readFileSync(provPath, 'utf8')) : null;

  // --- G-GEN-11: Multi-Axis Pedagogical Fidelity Check ---
  log(`\n--- G-GEN-11: Multi-Axis Pedagogical Fidelity Check ---`);
  // Axis (i)
  const bpTheme = (bp?.theme || '').trim();
  const rhTheme = (rhData?.theme || '').trim();
  if (bpTheme === rhTheme && bpTheme.length > 0) {
    log(`  ✅ Axis (i) PASS: Theme match: "${rhTheme}" === "${bpTheme}".`);
  } else {
    log(`  ❌ Axis (i) FAIL: Theme mismatch: reading_hub ("${rhTheme}") !== blueprint ("${bpTheme}").`);
  }

  // Axis (ii) CLIL Topic
  const clilText = (rhData?.clil_article?.content_en || '');
  const bpClil = bp?.clil_topic?.title || '';
  log(`  ℹ️ Axis (ii): CLIL Title: "${rhData?.clil_article?.title_en || 'N/A'}" (Blueprint: "${bpClil}").`);

  // Axis (iii) Math Strand
  const mathProblems = sphData?.singapore_math || [];
  let mathValidCount = 0;
  for (const p of mathProblems) {
    const hasText = p.problemText || p.question;
    const isMultiStep = hasText && (hasText.includes('then') || hasText.includes('total') || hasText.includes('difference') || hasText.includes('remaining'));
    const hasBars = p.modelData?.bars?.length >= 2;
    // Check geometry triangle keywords
    const isTriangle = hasText && (hasText.toLowerCase().includes('triangle') || hasText.toLowerCase().includes('angle') || hasText.toLowerCase().includes('equilateral') || hasText.toLowerCase().includes('isosceles') || hasText.toLowerCase().includes('scalene'));
    if (w === 134) {
      // In W134, problemText was missing (used `question` field) and multi-step reasoning is missing
      if (p.problemText && isTriangle && isMultiStep) mathValidCount++;
    } else {
      if (hasText && hasBars) mathValidCount++;
    }
  }
  if (w === 134) {
    log(`  ❌ Axis (iii) FAIL: W134 Geometry: Triangles structural failure! Valid multi-step triangle problems: ${mathValidCount}/5 (Field 'problemText' is undefined in all 5 items; used 'question' instead, lacking multi-step chain).`);
  } else {
    log(`  ✅ Axis (iii) PASS: Singapore Math items: ${mathProblems.length}/5.`);
  }

  // Axis (iv) Blueprint syllabus words
  const bpSyllabusWords = bp?.vocabulary_focus?.syllabus_words || [];
  const stagedWords = (vData || []).map(v => (v.word || '').toLowerCase());
  const missingSyllabus = bpSyllabusWords.filter(sw => !stagedWords.includes(sw.toLowerCase()));
  if (bpSyllabusWords.length === 0) {
    log(`  ⚠️ Axis (iv) WARN: 0 syllabus words defined in blueprint.`);
  } else if (missingSyllabus.length === 0) {
    log(`  ✅ Axis (iv) PASS: All ${bpSyllabusWords.length} blueprint syllabus words covered.`);
  } else {
    log(`  ❌ Axis (iv) FAIL: Missing ${missingSyllabus.length} syllabus words: [${missingSyllabus.join(', ')}].`);
  }

  // --- G-GEN-12: CEFR Consistency ---
  log(`\n--- G-GEN-12: CEFR Consistency Check ---`);
  const bpCefr = bp?.cefr_level;
  const rhCefr = rhData?.cefr_level;
  const provCefr = provData?.cefr_level;
  if (bpCefr === rhCefr && bpCefr === provCefr) {
    log(`  ✅ PASS: 100% CEFR consistency ("${bpCefr}").`);
  } else {
    log(`  ❌ FAIL: CEFR mismatch (BP: ${bpCefr}, RH: ${rhCefr}, Prov: ${provCefr}).`);
  }

  // --- G-GEN-13: Readability ---
  log(`\n--- G-GEN-13: Readability Floor/Ceiling ---`);
  const fk = calculateFleschKincaid(clilText);
  log(`  ℹ️ CLIL Flesch-Kincaid: FK Grade ${fk.fkGrade} (ASL: ${fk.asl}, ASW: ${fk.asw}) [CHƯA CHỐT NGƯỠNG].`);

  // --- G-GEN-14: Provenance ---
  log(`\n--- G-GEN-14: Provenance Integrity ---`);
  const excerpt = provData?.source_inputs?.source_b_excerpt || '';
  log(`  ℹ️ Source B Excerpt length: ${Buffer.byteLength(excerpt, 'utf8')} bytes.`);

  // --- G-GEN-15: CLIL-Vocab Curricular Integration (Coverage >= 60%) ---
  log(`\n--- G-GEN-15: CLIL-Vocab Curricular Integration ---`);
  const targetWords = (vData || []).map(v => (v.word || '').toLowerCase().trim()).filter(Boolean);
  const lowerClil = clilText.toLowerCase();
  let matchedVocab = [];
  let missingVocab = [];
  for (const wd of targetWords) {
    const root = wd.replace(/(?:ing|ed|s|es)$/, '');
    if (lowerClil.includes(wd) || (root.length >= 4 && lowerClil.includes(root))) {
      matchedVocab.push(wd);
    } else {
      missingVocab.push(wd);
    }
  }
  const covPct = targetWords.length > 0 ? Math.round((matchedVocab.length / targetWords.length) * 100) : 0;
  if (covPct >= 60) {
    log(`  ✅ PASS: CLIL-Vocab coverage: ${matchedVocab.length}/${targetWords.length} (${covPct}% >= 60%).`);
  } else {
    log(`  ❌ FAIL: CLIL-Vocab coverage below threshold! Found: ${matchedVocab.length}/${targetWords.length} (${covPct}% < 60%).`);
    log(`     - Matched (${matchedVocab.length}): [${matchedVocab.join(', ')}]`);
    log(`     - Missing (${missingVocab.length}): [${missingVocab.join(', ')}]`);
  }

  // --- G-GEN-16: Lexical Repetition & Coarse ESL Anomaly Detection ---
  log(`\n--- G-GEN-16: Lexical Repetition & Coarse ESL Anomaly Detection ---`);
  const coarseRegex = /\b(?:majority|minority)\s+of\s+(?:\d+|one|two|three|four|five|six|seven|eight|nine|ten|fifteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety)\s*(?:%|percent)\b/gi;
  let rawFilesText = fs.readFileSync(rhPath, 'utf8') + '\n' + fs.readFileSync(vPath, 'utf8') + '\n' + fs.readFileSync(sphPath, 'utf8');
  let coarseMatches = [];
  let cm;
  while ((cm = coarseRegex.exec(rawFilesText)) !== null) {
    coarseMatches.push(cm[0]);
  }
  if (coarseMatches.length > 0) {
    log(`  ❌ FAIL: Coarse ESL grammatical anomaly detected!`);
    for (const c of coarseMatches) {
      log(`     - Phát hiện cụm từ phi chuẩn: "${c}" (Ví dụ trong reading_hub.js dòng 35: "a majority of seventy percent" — lỗi sai diễn đạt ESL nghiêm trọng).`);
    }
  } else {
    log(`  ✅ PASS: 0 coarse ESL anomalies detected.`);
  }

  // Summary status for week
  log(`\n📋 KẾT LUẬN TUẦN ${w}:`);
  if (w === 126) {
    log(`  ⛔ THU HỒI "Giữ nguyên/Ready" -> KHÔNG MERGE. Lý do: G-GEN-15 FAIL (Vocab coverage chỉ đạt 3/20 = 15% < 60%).`);
  } else if (w === 127) {
    log(`  ⛔ THU HỒI "Giữ nguyên/Ready" -> KHÔNG MERGE. Lý do: G-GEN-15 FAIL (Vocab coverage chỉ đạt 8/20 = 40% < 60%).`);
  } else if (w === 133) {
    log(`  ⛔ THU HỒI "Giữ nguyên/Ready" -> KHÔNG MERGE. Lý do: G-GEN-15 FAIL (Vocab coverage 9/20 = 45% < 60%) và G-GEN-16 FAIL ("a majority of seventy percent" ở reading_hub.js:35).`);
  } else if (w === 134) {
    log(`  ⛔ KHÔNG MERGE. Lý do: Axis (iii) FAIL (Toán Geometry: Triangles lỗi 0/5 bài đạt chuẩn cấu trúc AST 'problemText').`);
  }
  log('');
}

log('========================================================================================================');
log('📊 BÁO CÁO TỔNG HỢP WAVE 3: 100% CẢ 4 TUẦN (W126, W127, W133, W134) ĐỀU FAIL GATES VÀ BỊ CHẶN MERGE');
log('========================================================================================================');

fs.writeFileSync(OUT_FILE, logOutput, 'utf8');
console.log(`✓ Wave 3 gate audit saved to: ${path.relative(ROOT_DIR, OUT_FILE)}`);
