#!/usr/bin/env node
/**
 * scripts/audit_round74_source_b_baseline.mjs
 * 
 * Round 74 Task A.2, A.3, A.4 Deliverable:
 * 100% computed forensic audit of all production weeks (22 weeks)
 * and staged weeks (8 weeks) against Source B.
 * 
 * STRICT COMPLIANCE (C15/C16):
 * - AST parsing for singapore_math array length (no regex 'id:').
 * - 3-tier theme matching: EXACT / NORMALIZED_EQUAL / CẦN ESL REVIEW (substring/overlap) / MISMATCH.
 * - 100% computed summary at the end (zero hand-typed text).
 * - Output saved to docs/agent_artifacts/round74_production_audit_raw.txt.
 */

import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const KHUNG_CT_PATH = path.join(ROOT_DIR, 'docs/1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt');
const OUT_FILE = path.join(ROOT_DIR, 'docs/agent_artifacts/round74_production_audit_raw.txt');

const txtContent = fs.readFileSync(KHUNG_CT_PATH, 'utf8');
const txtLines = txtContent.split('\n');
const part2Start = txtLines.findIndex(l => l.includes('PART II'));

// Helper: Parse Source B block for week N
function parseSourceBWeek(w) {
  // 1. Single week match
  for (let i = part2Start; i < txtLines.length; i++) {
    const l = txtLines[i];
    const m = l.match(new RegExp(`^[ \\t]*•[ \\t]*Week[ \\t]*${w}[ \\t]*:[ \\t]*([^\\n]+)`, 'i'));
    if (m) {
      const lineNum = i + 1;
      const rawTitle = m[1].trim();
      const titleEn = rawTitle.replace(/\(Tuần\s*[\d\-]+:[^)]+\)/gi, '').trim().replace(/^[.\s"'\*`]+|[.\s"'\*`]+$/g, '');
      
      let topicEn = null;
      let grammarFocus = null;
      let mathTopic = null;
      let vocabWords = [];

      for (let j = i + 1; j < Math.min(txtLines.length, i + 25); j++) {
        const jl = txtLines[j];
        if (jl.match(/^[ \t]*•[ \t]*Weeks?\s*\d+/i) || jl.includes('UNIT') || jl.includes('PROJECT CYCLE')) break;

        const tm = jl.match(/Topic(?:\s*\([^)]*\))?:\s*([^\n]+)/i);
        if (tm && !topicEn && !jl.includes('(Math)')) {
          topicEn = tm[1].replace(/\((?:Chủ đề|Tuần)[^)]*\)/gi, '').trim().replace(/^[.\s"']+|[.\s"']+$/g, '');
        }

        const gm = jl.match(/Grammar\s*(?:Focus|Review)?(?:\s*\([^)]*\))?:\s*([^\n]+)/i);
        if (gm && !grammarFocus) {
          grammarFocus = gm[1].replace(/\((?:Ngữ pháp|Tuần)[^)]*\)/gi, '').trim().replace(/^[.\s"']+|[.\s"']+$/g, '');
        }

        const mm = jl.match(/Topic\s*\(Math\):\s*([^\n]+)/i);
        if (mm && !mathTopic) {
          mathTopic = mm[1].replace(/\((?:Toán|Tuần)[^)]*\)/gi, '').trim().replace(/^[.\s"']+|[.\s"']+$/g, '');
        }

        const vmMatch = jl.match(/Vocabulary\s*Focus:\s*([^\n]+)/i);
        if (vmMatch && vocabWords.length === 0) {
          vocabWords = vmMatch[1]
            .split(/[,;\/]/)
            .map(w => w.replace(/\([^)]*\)/g, '').replace(/\./g, '').trim().toLowerCase())
            .filter(w => w.length > 0 && !w.includes('->'));
        }
      }

      return {
        lineNum,
        titleEn,
        theme: topicEn || titleEn,
        topicEn,
        grammarFocus: grammarFocus || 'N/A',
        mathTopic: mathTopic || 'N/A',
        vocabWords,
        isRange: false,
        rawHeader: l.trim()
      };
    }
  }

  // 2. Multi-week range match
  for (let i = part2Start; i < txtLines.length; i++) {
    const l = txtLines[i];
    const m = l.match(/(?:•\s*)?Weeks?\s*(\d+)\s*[-–—]\s*(\d+)\s*:\s*([^\n]+)/i);
    if (m) {
      const s = parseInt(m[1], 10);
      const e = parseInt(m[2], 10);
      if (w >= s && w <= e) {
        if (/Content\s*\(Unit/i.test(m[3])) continue;
        const lineNum = i + 1;
        const rawTitle = m[3].trim();
        const titleEn = rawTitle.replace(/\(Tuần\s*[\d\-]+:[^)]+\)/gi, '').trim().replace(/^[.\s"'\*`]+|[.\s"'\*`]+$/g, '');

        let topicEn = null;
        let grammarFocus = null;
        let mathTopic = null;
        let vocabWords = [];

        for (let j = i + 1; j < Math.min(txtLines.length, i + 25); j++) {
          const jl = txtLines[j];
          if (jl.match(/^[ \t]*•[ \t]*Weeks?\s*\d+/i) || jl.includes('UNIT') || jl.includes('PROJECT CYCLE')) break;

          const tm = jl.match(/Topic(?:\s*\([^)]*\))?:\s*([^\n]+)/i);
          if (tm && !topicEn && !jl.includes('(Math)')) {
            topicEn = tm[1].replace(/\((?:Chủ đề|Tuần)[^)]*\)/gi, '').trim().replace(/^[.\s"']+|[.\s"']+$/g, '');
          }

          const gm = jl.match(/Grammar\s*(?:Focus|Review)?(?:\s*\([^)]*\))?:\s*([^\n]+)/i);
          if (gm && !grammarFocus) {
            grammarFocus = gm[1].replace(/\((?:Ngữ pháp|Tuần)[^)]*\)/gi, '').trim().replace(/^[.\s"']+|[.\s"']+$/g, '');
          }

          const mm = jl.match(/Topic\s*\(Math\):\s*([^\n]+)/i);
          if (mm && !mathTopic) {
            mathTopic = mm[1].replace(/\((?:Toán|Tuần)[^)]*\)/gi, '').trim().replace(/^[.\s"']+|[.\s"']+$/g, '');
          }

          const vmMatch = jl.match(/Vocabulary\s*Focus:\s*([^\n]+)/i);
          if (vmMatch && vocabWords.length === 0) {
            vocabWords = vmMatch[1]
              .split(/[,;\/]/)
              .map(w => w.replace(/\([^)]*\)/g, '').replace(/\./g, '').trim().toLowerCase())
              .filter(w => w.length > 0 && !w.includes('->'));
          }
        }

        return {
          lineNum,
          titleEn,
          theme: topicEn || titleEn,
          topicEn,
          grammarFocus: grammarFocus || 'N/A',
          mathTopic: mathTopic || 'N/A',
          vocabWords,
          isRange: true,
          rangeStr: `W${s}-W${e}`,
          rawHeader: l.trim()
        };
      }
    }
  }

  return null;
}

// AST Hub File Evaluator
function parseHubFile(filePath, varName) {
  if (!fs.existsSync(filePath)) return null;
  const content = fs.readFileSync(filePath, 'utf8');
  let code = content.replace(/import\s+[^;]+;?/g, '');
  code = code.replace(/export\s+default\s+/g, 'var __default__ = ');
  code = code.replace(/export\s+(?:const|let|var)\s+/g, 'var ');

  const sandbox = {
    read_explore: { story_scenes: [] },
    vocabList: [],
    singapore_math: [],
    readingHubData: {},
    listeningHubData: {},
    writingHubData: {},
    speakingHubData: {},
    skillPracticeHubData: {}
  };

  try {
    vm.createContext(sandbox);
    vm.runInContext(code, sandbox);
    if (varName) return sandbox[varName] || sandbox.__default__;
    return sandbox.__default__ || sandbox.readingHubData || sandbox.vocab || sandbox.listeningHubData || sandbox.skillPracticeHubData || sandbox;
  } catch (e) {
    return null;
  }
}

// AST Singapore Math Array Length Counter (Invariant 10 / Task A.3)
function countMathProblemsAST(dir) {
  // 1. Check singapore_math.js
  const smPath = path.join(dir, 'singapore_math.js');
  if (fs.existsSync(smPath)) {
    const sm = parseHubFile(smPath, 'singaporeMathData') || parseHubFile(smPath, 'singapore_math');
    if (Array.isArray(sm)) return sm.length;
    if (Array.isArray(sm?.problems)) return sm.problems.length;
    if (Array.isArray(sm?.questions)) return sm.questions.length;
  }

  // 2. Check skill_practice_hub.js
  const sphPath = path.join(dir, 'skill_practice_hub.js');
  if (fs.existsSync(sphPath)) {
    const sph = parseHubFile(sphPath, 'skillPracticeHubData');
    if (Array.isArray(sph?.singapore_math)) return sph.singapore_math.length;
    if (Array.isArray(sph?.math_quest?.problems)) return sph.math_quest.problems.length;
  }

  // 3. Check listening_hub.js
  const lhPath = path.join(dir, 'listening_hub.js');
  if (fs.existsSync(lhPath)) {
    const lh = parseHubFile(lhPath, 'listeningHubData');
    if (Array.isArray(lh?.math_quest?.problems)) return lh.math_quest.problems.length;
    if (Array.isArray(lh?.singapore_math)) return lh.singapore_math.length;
  }

  // 4. Check reading_hub.js
  const rhPath = path.join(dir, 'reading_hub.js');
  if (fs.existsSync(rhPath)) {
    const rh = parseHubFile(rhPath, 'readingHubData');
    if (Array.isArray(rh?.singapore_math)) return rh.singapore_math.length;
    if (Array.isArray(rh?.math_quest?.problems)) return rh.math_quest.problems.length;
  }

  return 0;
}

// 3-Tier Theme Matcher (Task A.4)
function matchTheme3Tier(sourceBTheme, sourceBTitle, realTheme) {
  if (!realTheme || realTheme === 'MISSING_IN_FILE') {
    return { status: 'MISMATCH', tier: 'MISMATCH', label: '❌ LỆCH', note: 'Missing file or theme field' };
  }

  const sTheme = (sourceBTheme || '').trim(); // Primary: Topic
  const sTitle = (sourceBTitle || '').trim(); // Secondary: Week Header / Title
  const rTheme = realTheme.trim();

  // Tier 1: EXACT match with Source B Topic
  if (rTheme === sTheme) {
    return { status: 'EXACT', tier: 'EXACT', label: '✅ EXACT', note: 'Khớp 100% từng ký tự với Topic' };
  }

  const normSTheme = sTheme.toLowerCase().replace(/[^a-z0-9]/g, '');
  const normSTitle = sTitle.toLowerCase().replace(/[^a-z0-9]/g, '');
  const normRTheme = rTheme.toLowerCase().replace(/[^a-z0-9]/g, '');

  // Tier 2: NORMALIZED_EQUAL with Source B Topic
  if (normRTheme === normSTheme && normSTheme.length > 0) {
    return { status: 'NORMALIZED_EQUAL', tier: 'NORMALIZED_EQUAL', label: '✅ NORMALIZED', note: 'Khớp sau chuẩn hoá chữ thường / dấu câu với Topic' };
  }

  // Tier 3: CẦN ESL REVIEW
  // Case A: Matches Week Header / Title but diverges from specific Topic
  if (sTitle && (rTheme === sTitle || normRTheme === normSTitle)) {
    return {
      status: 'CẦN ESL REVIEW',
      tier: 'CẦN ESL REVIEW',
      label: '⚠️ CẦN ESL REVIEW',
      note: `Khớp Title tuần ("${sTitle.slice(0, 25)}..."), khác Topic chi tiết ("${sTheme.slice(0, 25)}...")`
    };
  }

  // Case B: Substring or significant token overlap
  const isSubstring = (
    (normSTheme.length > 5 && (normRTheme.includes(normSTheme) || normSTheme.includes(normRTheme))) ||
    (normSTitle.length > 5 && (normRTheme.includes(normSTitle) || normSTitle.includes(normRTheme)))
  );

  const tokensS = (sTheme + ' ' + sTitle).toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(t => t.length >= 4);
  const tokensR = rTheme.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(t => t.length >= 4);
  const sharedTokens = tokensS.filter(t => tokensR.includes(t));
  const uniqueShared = [...new Set(sharedTokens)];
  const hasTokenOverlap = uniqueShared.length >= 2;

  if (isSubstring || hasTokenOverlap) {
    return {
      status: 'CẦN ESL REVIEW',
      tier: 'CẦN ESL REVIEW',
      label: '⚠️ CẦN ESL REVIEW',
      note: `Substring/Token overlap (${uniqueShared.join(', ') || 'substring'})`
    };
  }

  return { status: 'MISMATCH', tier: 'MISMATCH', label: '❌ LỆCH', note: 'Lệch hoàn toàn với Topic và Title' };
}

// Targets: 22 production weeks + 8 staged weeks
const prodWeeks = [33, 34, 35, 36, 37, 38, 39, 41, 43, 45, 46, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 125];
const stagedWeeks = [79, 126, 127, 129, 130, 131, 133, 134];

let logOutput = '';
function log(msg = '') {
  console.log(msg);
  logOutput += msg + '\n';
}

log('========================================================================================================');
log('🔍 AUDIT DỮ LIỆU THẬT: SOURCE B MASTER SYLLABUS vs PRODUCTION & STAGED CONTENT (ROUND 74)');
log('Căn cứ: 100% AST/DOM parsing; Cột Toán đếm độ dài mảng AST; So khớp theme 3 cấp (Exact / Normalized / Cần ESL review)');
log('========================================================================================================\n');

log('| Vị trí | Tuần | Source B Dòng | Source B Theme / Topic | File Thật Theme (reading_hub) | Theme Match Tier | Vocab Source B Khớp Thật | Math Items (AST) | Phân Loại Đo Thật |');
log('| :---: | :---: | :---: | :--- | :--- | :---: | :---: | :---: | :--- |');

const auditResults = [];

function auditTarget(w, isStaged) {
  const loc = isStaged ? 'STAGED' : 'PROD';
  const targetDir = isStaged
    ? path.join(ROOT_DIR, `docs/agent_artifacts/staging/week_${w}`)
    : path.join(ROOT_DIR, `src/data/weeks/week_${w}`);

  const rhPath = path.join(targetDir, 'reading_hub.js');
  const vPath = path.join(targetDir, 'vocab.js');

  const b = parseSourceBWeek(w);
  if (!b) {
    log(`| ${loc} | W${w} | N/A | NOT FOUND IN SOURCE B | N/A | N/A | N/A | N/A | ERROR |`);
    return;
  }

  // 1. Read real theme from reading_hub.js
  let rhData = parseHubFile(rhPath, 'readingHubData');
  let realTheme = rhData?.theme;
  if (!realTheme) {
    const raw = fs.existsSync(rhPath) ? fs.readFileSync(rhPath, 'utf8') : '';
    const m = raw.match(/theme\s*:\s*["']([^"']+)["']/i);
    realTheme = m ? m[1].trim() : 'MISSING_IN_FILE';
  }

  // 2. Read real vocab from vocab.js or reading_hub.js
  let vData = parseHubFile(vPath, 'vocab');
  if (!vData || !Array.isArray(vData)) {
    vData = rhData?.vocab || [];
  }
  let realWords = Array.isArray(vData) ? vData.map(x => (x.word || '').toLowerCase()) : [];

  // Calculate vocab overlap with Source B target words
  let matchedVocab = [];
  let missingVocab = [];
  for (const bw of b.vocabWords) {
    if (realWords.some(rw => rw === bw || rw.includes(bw) || bw.includes(rw))) {
      matchedVocab.push(bw);
    } else {
      missingVocab.push(bw);
    }
  }

  const vocabStat = b.vocabWords.length > 0
    ? `${matchedVocab.length}/${b.vocabWords.length} (${Math.round((matchedVocab.length / b.vocabWords.length) * 100)}%)`
    : `0 Source B words defined`;

  // 3. Count math problems via AST
  const mathCount = countMathProblemsAST(targetDir);

  // 4. Determine 3-tier theme match
  const themeMatch = matchTheme3Tier(b.theme, b.titleEn, realTheme);

  // 5. Computed classification
  let classification = '';
  if (themeMatch.tier === 'EXACT' || themeMatch.tier === 'NORMALIZED_EQUAL') {
    if (mathCount >= 5 && (b.vocabWords.length === 0 || matchedVocab.length >= b.vocabWords.length * 0.7)) {
      classification = 'TOÀN VẸN (Pass)';
    } else if (mathCount < 5) {
      classification = `THIẾU TOÁN (${mathCount}/5 items)`;
    } else {
      classification = `THIẾU TỪ VỰNG (${matchedVocab.length}/${b.vocabWords.length})`;
    }
  } else if (themeMatch.tier === 'CẦN ESL REVIEW') {
    classification = `CẦN ESL REVIEW (Lệch chi tiết: "${b.theme.slice(0, 18)}..." vs "${realTheme.slice(0, 18)}...")`;
  } else {
    classification = `LỆCH THEME (Source B: "${b.theme.slice(0, 18)}..." vs Thật: "${realTheme.slice(0, 18)}...")`;
  }

  const resultRow = {
    loc,
    week: w,
    lineNum: b.lineNum,
    sourceBTheme: b.theme,
    realTheme,
    themeMatch,
    vocabStat,
    matchedVocabCount: matchedVocab.length,
    totalVocabCount: b.vocabWords.length,
    mathCount,
    classification
  };
  auditResults.push(resultRow);

  log(`| **${loc}** | **W${w}** | L${b.lineNum} | ${b.theme.replace(/\|/g, '\\/')} | ${realTheme.replace(/\|/g, '\\/')} | ${themeMatch.label} | ${vocabStat} | ${mathCount}/5 items | ${classification} |`);
}

log('\n--- 1. CÁC TUẦN PRODUCTION TRONG SRC/DATA/WEEKS (22 TUẦN) ---');
for (const w of prodWeeks) {
  auditTarget(w, false);
}

log('\n--- 2. CÁC TUẦN STAGED TRONG DOCS/AGENT_ARTIFACTS/STAGING (8 TUẦN) ---');
for (const w of stagedWeeks) {
  auditTarget(w, true);
}

// 100% COMPUTED SUMMARY BLOCK (Task A.2)
log('\n========================================================================================================');
log('📊 BÁO CÁO TỔNG HỢP FORENSIC TOÀN DIỆN (100% COMPUTED BY SCRIPT)');
log('========================================================================================================');

const prodResults = auditResults.filter(r => r.loc === 'PROD');
const stagedResults = auditResults.filter(r => r.loc === 'STAGED');

const prodExact = prodResults.filter(r => r.themeMatch.tier === 'EXACT');
const prodNorm = prodResults.filter(r => r.themeMatch.tier === 'NORMALIZED_EQUAL');
const prodEslReview = prodResults.filter(r => r.themeMatch.tier === 'CẦN ESL REVIEW');
const prodMismatch = prodResults.filter(r => r.themeMatch.tier === 'MISMATCH');
const prodMathDeficit = prodResults.filter(r => r.mathCount < 5);

const stagedExact = stagedResults.filter(r => r.themeMatch.tier === 'EXACT');
const stagedNorm = stagedResults.filter(r => r.themeMatch.tier === 'NORMALIZED_EQUAL');
const stagedEslReview = stagedResults.filter(r => r.themeMatch.tier === 'CẦN ESL REVIEW');
const stagedMismatch = stagedResults.filter(r => r.themeMatch.tier === 'MISMATCH');

log(`1. THỐNG KÊ THEME MATCH PRODUCTION (Tổng: ${prodResults.length} tuần):`);
log(`   - EXACT (Khớp 100% từng ký tự): ${prodExact.length} tuần (${prodExact.map(r => `W${r.week}`).join(', ') || 'None'})`);
log(`   - NORMALIZED_EQUAL (Khớp sau chuẩn hóa): ${prodNorm.length} tuần (${prodNorm.map(r => `W${r.week}`).join(', ') || 'None'})`);
log(`   - CẦN ESL REVIEW (Substring / có token chung): ${prodEslReview.length} tuần (${prodEslReview.map(r => `W${r.week}`).join(', ') || 'None'})`);
log(`   - MISMATCH (Lệch hoàn toàn): ${prodMismatch.length} tuần (${prodMismatch.map(r => `W${r.week}`).join(', ') || 'None'})`);

log(`\n2. THỐNG KÊ THEME MATCH STAGED (Tổng: ${stagedResults.length} tuần):`);
log(`   - EXACT: ${stagedExact.length} tuần (${stagedExact.map(r => `W${r.week}`).join(', ') || 'None'})`);
log(`   - NORMALIZED_EQUAL: ${stagedNorm.length} tuần (${stagedNorm.map(r => `W${r.week}`).join(', ') || 'None'})`);
log(`   - CẦN ESL REVIEW: ${stagedEslReview.length} tuần (${stagedEslReview.map(r => `W${r.week}`).join(', ') || 'None'})`);
log(`   - MISMATCH: ${stagedMismatch.length} tuần (${stagedMismatch.map(r => `W${r.week}`).join(', ') || 'None'})`);

log(`\n3. THỐNG KÊ TOÁN THEO AST (singapore_math array length):`);
log(`   - Đạt chuẩn >= 5 bài toán: ${prodResults.filter(r => r.mathCount >= 5).map(r => `W${r.week} (${r.mathCount}/5)`).join(', ') || 'None'}`);
log(`   - Thiếu toán (< 5 bài): ${prodMathDeficit.length} tuần (${prodMathDeficit.map(r => `W${r.week} (${r.mathCount}/5)`).join(', ')})`);
log(`   - Staged có 5 bài toán: ${stagedResults.filter(r => r.mathCount >= 5).map(r => `W${r.week}`).join(', ')}`);

log('========================================================================================================\n');

fs.writeFileSync(OUT_FILE, logOutput, 'utf8');
console.log(`✓ Real computed audit saved to: ${path.relative(ROOT_DIR, OUT_FILE)}`);
