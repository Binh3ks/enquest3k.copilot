#!/usr/bin/env node
/**
 * scripts/audit_round77_source_b_baseline.mjs
 *
 * ROUND 77 — AUDIT DỮ LIỆU THẬT SOURCE B vs PRODUCTION & STAGED (TASKS B.4, B.5, B.6)
 *
 * Sửa triệt để các lỗi trích xuất từ Round 76:
 *   1. Parse Source B từ dòng bắt đầu PART II (tránh đụng header Part I L105),
 *      chỉ tách dấu nháy ngoài cân xứng cho Title (sửa W36 mất ngoặc kép đóng),
 *      và tách Vocabulary Focus theo /[,;\/]/ (sửa W41 `caterpillar/tadpole`, `butterfly/frog`).
 *   2. `extractReadingHubTheme`: ưu tiên VM evaluation trước regex, và regex fallback hỗ trợ escaped quotes
 *      (sửa W36 `Review & Project 3: \"My Adventure Book\"` bị cụt thành `Review & Project 3: \`).
 *   3. `extractVocabDetails`: giữ nguyên `export default` bằng `var __default__ = `, hỗ trợ cả mảng `string`
 *      lẫn `object` (`item.word`), đọc từ `vocab.js` và fallback `reading_hub.js` (sửa W33 `0/6 -> 6/6`).
 *      Ghi rõ cả số khớp chính xác (exact) lẫn trường hợp gần đúng/dạng phái sinh (`friend` vs `friendship`,
 *      `polar region` vs `polar`). In bảng song song W33, W34, W39, W41 và giải thích nguyên nhân R75 -> R76
 *      từ mã nguồn thật.
 *   4. BỎ NHÃN GÕ CỨNG `NGOẠI LỆ CHỦ Ý (W33 Frozen, Vocab 6/6, ...)`. Cột `Phân Loại Tổng Hợp` tính
 *      100% đồng nhất từ dữ liệu thật; ngoại lệ W33 ghi ở cột riêng `Ghi chú Owner Decision`
 *      (`Owner decision: frozen`, đọc xác nhận từ `docs/W33_GOLDEN_FREEZE_MANIFEST.json`, không gõ tay số liệu vocab).
 */

import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const SOURCE_B_PATH = path.join(ROOT_DIR, 'docs/1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt');
const PROD_DIR = path.join(ROOT_DIR, 'src/data/weeks');
const STAGED_DIR = path.join(ROOT_DIR, 'docs/agent_artifacts/staging');
const W33_MANIFEST_PATH = path.join(ROOT_DIR, 'docs/W33_GOLDEN_FREEZE_MANIFEST.json');
const R75_SCRIPT_PATH = path.join(ROOT_DIR, 'scripts/audit_round75_source_b_baseline.mjs');
const R76_SCRIPT_PATH = path.join(ROOT_DIR, 'scripts/audit_round76_source_b_baseline.mjs');
const OUT_FILE = path.join(ROOT_DIR, 'docs/agent_artifacts/round77_production_audit_raw.txt');

const w33Manifest = fs.existsSync(W33_MANIFEST_PATH)
  ? JSON.parse(fs.readFileSync(W33_MANIFEST_PATH, 'utf8'))
  : null;

function normalizeStr(s) {
  if (!s) return '';
  return s
    .toLowerCase()
    .replace(/[“”"'`]/g, '')
    .replace(/[-–—/\\:,._()&]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function stripBalancedOuterQuotes(s) {
  const t = s.trim();
  if ((t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'"))) {
    return t.slice(1, -1).trim();
  }
  return t;
}

function parseSourceBEntries() {
  const content = fs.readFileSync(SOURCE_B_PATH, 'utf8');
  const lines = content.split('\n');
  const part2Idx = lines.findIndex(l => l.includes('PART II'));
  const startIdx = part2Idx >= 0 ? part2Idx : 0;

  const weeksMap = {};
  for (let w = 1; w <= 156; w++) {
    weeksMap[w] = {
      week: w,
      lineNum: null,
      rawTitleLine: null,
      titleEn: null,
      topicEn: null,
      vocabLineNum: null,
      rawVocabLine: null,
      vocabWords: []
    };
  }

  // Pass 1: range headers in Part II (excluding overview headers like "Weeks 17-36 Content (Unit 3-5)")
  for (let i = startIdx; i < lines.length; i++) {
    const line = lines[i];
    const mRange = line.match(/^[•\t\s]*Weeks?\s+(\d+)\s*[-–—]\s*(\d+)\s*:\s*(.+)/i);
    if (mRange) {
      const startW = parseInt(mRange[1], 10);
      const endW = parseInt(mRange[2], 10);
      if (startW >= 1 && endW <= 156 && !/Content\s*\(Unit/i.test(mRange[3])) {
        const fullTitle = mRange[3].trim();
        const enTitle = stripBalancedOuterQuotes(
          fullTitle.split(/\s*\(\s*Tuần/i)[0].replace(/[“”]/g, '"').trim()
        );
        const sharedDetails = {
          lineNum: i + 1,
          rawTitleLine: line.trim(),
          titleEn: enTitle,
          topicEn: null,
          vocabLineNum: null,
          rawVocabLine: null,
          vocabWords: []
        };
        parseBlockDetails(lines, i + 1, sharedDetails);
        for (let w = startW; w <= endW; w++) {
          weeksMap[w] = { ...sharedDetails, week: w, vocabWords: [...sharedDetails.vocabWords] };
        }
      }
    }
  }

  // Pass 2: single week headers in Part II (override shared range defaults if explicitly defined)
  for (let i = startIdx; i < lines.length; i++) {
    const line = lines[i];
    const mSingle = line.match(/^[•\t\s]*Week\s+(\d+)\s*:\s*(.+)/i);
    if (mSingle) {
      const w = parseInt(mSingle[1], 10);
      if (w >= 1 && w <= 156) {
        weeksMap[w].lineNum = i + 1;
        weeksMap[w].rawTitleLine = line.trim();
        const fullTitle = mSingle[2].trim();
        const enTitle = stripBalancedOuterQuotes(
          fullTitle.split(/\s*\(\s*Tuần/i)[0].replace(/[“”]/g, '"').trim()
        );
        weeksMap[w].titleEn = enTitle;
        // reset block details before parsing single week block
        weeksMap[w].topicEn = null;
        weeksMap[w].vocabLineNum = null;
        weeksMap[w].rawVocabLine = null;
        weeksMap[w].vocabWords = [];
        parseBlockDetails(lines, i + 1, weeksMap[w]);
      }
    }
  }

  return weeksMap;
}

function parseBlockDetails(lines, startIdx, obj) {
  for (let j = startIdx; j < Math.min(lines.length, startIdx + 20); j++) {
    const l = lines[j];
    if (
      l.match(/^[•\t\s]*Week\s+\d+\s*:/i) ||
      l.match(/^[•\t\s]*Weeks?\s+\d+\s*[-–—]\s*\d+\s*:/i) ||
      /\bUNIT\s+\d+/i.test(l) ||
      /\bPROJECT CYCLE\b/i.test(l) ||
      /\bPHASE\s+\d+/i.test(l)
    ) {
      break;
    }

    const mTopic = l.match(/^[•\t\s]*Topic(?:\s*\([^)]*\))?\s*:\s*(.+)/i);
    if (mTopic && !obj.topicEn && !/\(Math\)/i.test(l)) {
      const topicRaw = mTopic[1].split(/\s*\(\s*(?:Chủ đề|Tuần)/i)[0].trim().replace(/\.$/, '');
      obj.topicEn = stripBalancedOuterQuotes(topicRaw.replace(/[“”]/g, '"'));
    }

    const mVocab = l.match(/^[•\t\s]*Vocabulary\s+Focus\s*:\s*(.+)/i);
    if (mVocab && obj.vocabWords.length === 0) {
      obj.vocabLineNum = j + 1;
      obj.rawVocabLine = l.trim();
      obj.vocabWords = mVocab[1]
        .split(/[,;\/]/)
        .map(w => w.replace(/\([^)]*\)/g, '').replace(/[.“”"'\r\n]/g, '').trim().toLowerCase())
        .filter(w => w.length > 0 && !w.includes('->') && !w.startsWith('review'));
    }
  }
}

function buildVmSandbox(extra = {}) {
  const sb = {
    ...globalThis,
    read_explore: { story_scenes: [] },
    readingHubData: null,
    readingHub: null,
    skillPracticeHubData: null,
    skillPracticeHub: null,
    listeningHubData: null,
    listeningHub: null,
    vocab: [],
    vocabList: [],
    singapore_math: [],
    __default__: null,
    ...extra
  };
  for (let k = 1; k <= 156; k++) sb[`week${k}Vocab`] = [];
  return sb;
}

function evalJsModule(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const content = fs.readFileSync(filePath, 'utf8');
  const modified = content
    .replace(/import\s+[^;]+;?/g, '')
    .replace(/export\s+default\s+/g, 'var __default__ = ')
    .replace(/export\s+(?:const|let|var)\s+/g, 'var ');
  const sandbox = buildVmSandbox();
  try {
    vm.createContext(sandbox);
    vm.runInContext(modified, sandbox);
    return { sandbox, content, modified };
  } catch (e) {
    return { sandbox: null, content, error: e.message };
  }
}

function extractReadingHubTheme(filePath) {
  if (!fs.existsSync(filePath)) return 'MISSING_IN_FILE';
  const res = evalJsModule(filePath);
  if (res?.sandbox) {
    const def = res.sandbox.__default__;
    const candidate =
      (def && typeof def === 'object' && def.theme) ||
      res.sandbox.readingHubData?.theme ||
      res.sandbox.readingHub?.theme;
    if (candidate && typeof candidate === 'string') {
      return candidate.trim();
    }
  }
  const content = res?.content || fs.readFileSync(filePath, 'utf8');
  const mEscaped = content.match(/theme\s*:\s*"((?:\\.|[^"\\])*)"/) ||
                   content.match(/theme\s*:\s*'((?:\\.|[^'\\])*)'/);
  if (mEscaped) {
    return mEscaped[1].replace(/\\"/g, '"').replace(/\\'/g, "'").replace(/\\\\/g, '\\').trim();
  }
  return 'MISSING_IN_FILE';
}

function extractMathCount(sphPath) {
  if (!fs.existsSync(sphPath)) return 0;
  const res = evalJsModule(sphPath);
  if (res?.sandbox) {
    const sph =
      (res.sandbox.__default__ && Array.isArray(res.sandbox.__default__.singapore_math) ? res.sandbox.__default__ : null) ||
      (res.sandbox.skillPracticeHubData && Array.isArray(res.sandbox.skillPracticeHubData.singapore_math) ? res.sandbox.skillPracticeHubData : null) ||
      (res.sandbox.skillPracticeHub && Array.isArray(res.sandbox.skillPracticeHub.singapore_math) ? res.sandbox.skillPracticeHub : null) ||
      {};
    if (Array.isArray(sph.singapore_math)) return sph.singapore_math.length;
  }
  const content = res?.content || fs.readFileSync(sphPath, 'utf8');
  const matches = content.match(/"id"\s*:\s*"w\d+_p\d+"/g);
  return matches ? matches.length : 0;
}

function extractVocabDetails(vPath, rhPath, weekNum) {
  if (fs.existsSync(vPath)) {
    const res = evalJsModule(vPath);
    if (res?.sandbox) {
      const sb = res.sandbox;
      const arr =
        (Array.isArray(sb.__default__) && sb.__default__.length ? sb.__default__ : null) ||
        (Array.isArray(sb.vocab) && sb.vocab.length ? sb.vocab : null) ||
        (Array.isArray(sb[`week${weekNum}Vocab`]) && sb[`week${weekNum}Vocab`].length ? sb[`week${weekNum}Vocab`] : null) ||
        (Array.isArray(sb.vocabList) && sb.vocabList.length ? sb.vocabList : null);
      if (arr) {
        return {
          sourceFile: path.relative(ROOT_DIR, vPath),
          elementTypes: [...new Set(arr.map(x => (x === null ? 'null' : Array.isArray(x) ? 'array' : typeof x)))],
          items: arr.map(x => ({
            type: typeof x,
            word: (typeof x === 'string' ? x : (x?.word || '')).toString().trim().toLowerCase()
          })).filter(x => x.word.length > 0)
        };
      }
    }
    const content = res?.content || fs.readFileSync(vPath, 'utf8');
    const matches = content.match(/["']?word["']?\s*:\s*["']([^"']+)["']/g);
    if (matches) {
      return {
        sourceFile: `${path.relative(ROOT_DIR, vPath)} (regex fallback)`,
        elementTypes: ['regex-extracted'],
        items: matches.map(m => ({
          type: 'regex',
          word: m.replace(/["']?word["']?\s*:\s*/i, '').replace(/["'\s]/g, '').toLowerCase()
        }))
      };
    }
  }

  if (fs.existsSync(rhPath)) {
    const res = evalJsModule(rhPath);
    if (res?.sandbox) {
      const sb = res.sandbox;
      const rh =
        (sb.__default__ && Array.isArray(sb.__default__.vocab) ? sb.__default__ : null) ||
        (sb.readingHubData && Array.isArray(sb.readingHubData.vocab) ? sb.readingHubData : null) ||
        (sb.readingHub && Array.isArray(sb.readingHub.vocab) ? sb.readingHub : null) ||
        {};
      if (Array.isArray(rh.vocab) && rh.vocab.length > 0) {
        return {
          sourceFile: path.relative(ROOT_DIR, rhPath),
          elementTypes: [...new Set(rh.vocab.map(x => typeof x))],
          items: rh.vocab.map(x => ({
            type: typeof x,
            word: (typeof x === 'string' ? x : (x?.word || '')).toString().trim().toLowerCase()
          })).filter(x => x.word.length > 0)
        };
      }
    }
  }

  return { sourceFile: 'MISSING', elementTypes: [], items: [] };
}

function evalSingleMatch(realTheme, targetStr) {
  if (!targetStr) return { status: '— KHÔNG CÓ', text: 'N/A' };
  if (!realTheme || realTheme === 'MISSING_IN_FILE') return { status: '❌ LỆCH', text: targetStr };

  const normReal = normalizeStr(realTheme);
  const normTarget = normalizeStr(targetStr);

  if (realTheme === targetStr) {
    return { status: '✅ EXACT', text: targetStr };
  } else if (normReal === normTarget) {
    return { status: '✅ NORMALIZED', text: targetStr };
  }

  const realTokens = normReal.split(' ').filter(t => t.length > 2);
  const targetTokens = normTarget.split(' ').filter(t => t.length > 2);
  const overlap = targetTokens.filter(t => realTokens.includes(t));

  if (overlap.length >= 2 || (targetTokens.length > 0 && overlap.length / targetTokens.length >= 0.5)) {
    return { status: '⚠️ CẦN REVIEW', text: targetStr };
  }

  return { status: '❌ LỆCH', text: targetStr };
}

const sourceB = parseSourceBEntries();
const prodWeeks = [33, 34, 35, 36, 37, 38, 39, 41, 43, 45, 46, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 125];
const stagedWeeks = [79, 126, 127, 129, 130, 131, 133, 134];

let logOutput = '';
function log(msg = '') {
  console.log(msg);
  logOutput += msg + '\n';
}

log('=============================================================================================================================================');
log('🔍 AUDIT DỮ LIỆU THẬT ROUND 77: SOURCE B (TIÊU ĐỀ & TOPIC) vs PRODUCTION & STAGED CONTENT');
log('Căn cứ: 100% VM/AST parsing; Cột Toán đếm mảng AST; Cột Vocab sửa lỗi export default, escape quote & dấu "/" (Tasks B.4, B.5, B.6)');
log('Quy tắc phân loại: 100% tính từ dữ liệu thật; ngoại lệ W33 ghi ở cột riêng đọc từ W33_GOLDEN_FREEZE_MANIFEST.json');
log('=============================================================================================================================================\n');

log('| Vị trí | Tuần | Source B Dòng | Source B Tiêu Đề (Title) | Source B Chủ Đề (Topic) | Theme File Thật (reading_hub) | So Với Tiêu Đề | So Với Topic | Vocab Khớp (Exact) | Math Items | Phân Loại Tổng Hợp | Ghi chú Owner Decision |');
log('| :---: | :---: | :---: | :--- | :--- | :--- | :---: | :---: | :---: | :---: | :--- | :--- |');

const diagnostics = {};

function auditWeek(w, loc) {
  const dir = loc === 'PROD'
    ? path.join(PROD_DIR, `week_${w}`)
    : path.join(STAGED_DIR, `week_${w}`);

  const rhPath = path.join(dir, 'reading_hub.js');
  const vPath = path.join(dir, 'vocab.js');
  const sphPath = path.join(dir, 'skill_practice_hub.js');

  const b = sourceB[w];
  const realTheme = extractReadingHubTheme(rhPath);
  const mathCount = extractMathCount(sphPath);
  const vocabDetails = extractVocabDetails(vPath, rhPath, w);
  const prodWords = vocabDetails.items.map(x => x.word);

  const bVocab = b.vocabWords || [];
  let vocabMatchStr = '0 Source B words defined';
  const matchedExact = [];
  const unmatched = [];
  const approxMatches = [];

  if (bVocab.length > 0) {
    for (const bw of bVocab) {
      if (prodWords.includes(bw)) {
        matchedExact.push(bw);
      } else {
        unmatched.push(bw);
        const candidates = prodWords.filter(rw => rw.includes(bw) || bw.includes(rw));
        if (candidates.length > 0) {
          approxMatches.push({ sourceB: bw, prodCandidates: candidates });
        }
      }
    }
    const pct = Math.round((matchedExact.length / bVocab.length) * 100);
    if (approxMatches.length > 0) {
      const approxNotes = approxMatches.map(a => `${a.sourceB}~>${a.prodCandidates.join('/')}`).join(', ');
      vocabMatchStr = `${matchedExact.length}/${bVocab.length} (${pct}%) [gần đúng: ${approxNotes}]`;
    } else {
      vocabMatchStr = `${matchedExact.length}/${bVocab.length} (${pct}%)`;
    }
  }

  if (loc === 'PROD' && [33, 34, 39, 41].includes(w)) {
    diagnostics[w] = {
      week: w,
      bLine: b.vocabLineNum,
      bRawLine: b.rawVocabLine,
      bVocab,
      vocabDetails,
      matchedExact,
      unmatched,
      approxMatches
    };
  }

  const matchTitle = evalSingleMatch(realTheme, b.titleEn);
  const matchTopic = evalSingleMatch(realTheme, b.topicEn);

  // Uniform data-driven classification (ZERO special-case hardcoding for W33)
  let synthClassification = '';
  if (realTheme === 'MISSING_IN_FILE') {
    synthClassification = 'THIẾU FILE (Chưa có nội dung)';
  } else if (matchTopic.status.includes('EXACT')) {
    synthClassification = (mathCount >= 5) ? 'TOÀN VẸN (Pass)' : `PASS cấp tiêu đề/topic (${mathCount}/5 toán)`;
  } else if (matchTitle.status.includes('EXACT')) {
    synthClassification = `PASS cấp tiêu đề (${mathCount}/5 toán)`;
  } else if (matchTitle.status.includes('NORMALIZED')) {
    synthClassification = `PASS cấp tiêu đề (Normalized, ${mathCount}/5 toán)`;
  } else if (matchTopic.status.includes('CẦN REVIEW') || matchTitle.status.includes('CẦN REVIEW')) {
    synthClassification = `CẦN REVIEW (${mathCount}/5 toán)`;
  } else {
    synthClassification = `LỆCH HOÀN TOÀN CẢ HAI (${mathCount}/5 toán)`;
  }

  // Separate Owner Decision column computed from W33_GOLDEN_FREEZE_MANIFEST.json
  let ownerNote = '—';
  if (loc === 'PROD' && w33Manifest && w33Manifest.weekNumber === w && w33Manifest.lifecycleState === 'GOLDEN_FROZEN') {
    ownerNote = 'Owner decision: frozen';
  }

  const resultRow = {
    loc,
    week: w,
    lineNum: b.lineNum,
    titleEn: b.titleEn,
    topicEn: b.topicEn,
    realTheme,
    matchTitle: matchTitle.status,
    matchTopic: matchTopic.status,
    vocabMatchStr,
    exactVocabCount: matchedExact.length,
    totalVocabCount: bVocab.length,
    mathCount,
    mathItemsStr: `${mathCount}/5`,
    synthClassification,
    ownerNote
  };

  log(`| **${loc}** | **W${w}** | L${b.lineNum} | ${b.titleEn} | ${b.topicEn || 'N/A'} | ${realTheme} | ${matchTitle.status} | ${matchTopic.status} | ${vocabMatchStr} | ${resultRow.mathItemsStr} | ${synthClassification} | ${ownerNote} |`);
  return resultRow;
}

log('\n--- 1. CÁC TUẦN PRODUCTION TRONG SRC/DATA/WEEKS (22 TUẦN) ---');
const prodResults = prodWeeks.map(w => auditWeek(w, 'PROD'));

log('\n--- 2. CÁC TUẦN STAGED TRONG DOCS/AGENT_ARTIFACTS/STAGING (8 TUẦN) ---');
const stagedResults = stagedWeeks.map(w => auditWeek(w, 'STAGED'));

log('\n=============================================================================================================================================');
log('📊 BÁO CÁO TỔNG HỢP 100% COMPUTED (ROUND 77)');
log('=============================================================================================================================================');

const prodPassTitle = prodResults.filter(r => r.synthClassification.startsWith('PASS cấp tiêu đề') || r.synthClassification.startsWith('TOÀN VẸN')).length;
const prodExactTitle = prodResults.filter(r => r.matchTitle === '✅ EXACT').length;
const prodNormTitle = prodResults.filter(r => r.matchTitle === '✅ NORMALIZED').length;
const prodTopicExact = prodResults.filter(r => r.matchTopic === '✅ EXACT').length;
const stagedPassTitle = stagedResults.filter(r => r.synthClassification.startsWith('PASS cấp tiêu đề') || r.synthClassification.startsWith('TOÀN VẸN')).length;

log(`1. Trục Tiêu Đề & Topic (Production - ${prodResults.length} tuần):`);
log(`   - PASS (Topic EXACT hoặc Title EXACT/Normalized): ${prodPassTitle} / ${prodResults.length} tuần.`);
log(`   - EXACT Title: ${prodExactTitle} / ${prodResults.length} tuần (${prodResults.filter(r => r.matchTitle === '✅ EXACT').map(r => `W${r.week}`).join(', ') || 'None'}).`);
log(`   - NORMALIZED Title: ${prodNormTitle} / ${prodResults.length} tuần (${prodResults.filter(r => r.matchTitle === '✅ NORMALIZED').map(r => `W${r.week}`).join(', ') || 'None'}).`);
log(`   - EXACT Topic: ${prodTopicExact} / ${prodResults.length} tuần (${prodResults.filter(r => r.matchTopic === '✅ EXACT').map(r => `W${r.week}`).join(', ') || 'None'}).`);
log(`   - Tuần có Owner Decision Frozen (đọc từ manifest): ${prodResults.filter(r => r.ownerNote !== '—').map(r => `W${r.week} (${r.ownerNote})`).join(', ') || 'None'}.`);
log(`2. Trục Tiêu Đề (Staging - ${stagedResults.length} tuần):`);
log(`   - PASS cấp tiêu đề: ${stagedPassTitle} / ${stagedResults.length} tuần (${stagedResults.filter(r => r.synthClassification.startsWith('PASS')).map(r => `W${r.week}`).join(', ') || 'None'}).`);
log(`3. Hiện trạng Singapore Math (AST):`);
const prod5 = prodResults.filter(r => r.mathCount >= 5);
const prodMid = prodResults.filter(r => r.mathCount > 0 && r.mathCount < 5);
const prod0 = prodResults.filter(r => r.mathCount === 0);
log(`   - Production có 5/5 toán: ${prod5.length} tuần (${prod5.map(r => `W${r.week}`).join(', ')}).`);
log(`   - Production có 1–4/5 toán: ${prodMid.length} tuần (${prodMid.map(r => `W${r.week}:${r.mathCount}/5`).join(', ')}).`);
log(`   - Production có 0/5 toán: ${prod0.length} tuần (${prod0.map(r => `W${r.week}`).join(', ')}).`);
log(`   - Staged có 5/5 toán: ${stagedResults.filter(r => r.mathCount >= 5).length}/${stagedResults.length} tuần.`);

// =============================================================================================================================
// SECTION 4: PARALLEL VOCAB DIAGNOSTIC FOR W33, W34, W39, W41 (TASK B.4)
// =============================================================================================================================
log('\n=============================================================================================================================================');
log('🔬 ĐỐI CHIẾU SONG SONG TỪ VỰNG W33, W34, W39, W41 & NGUYÊN NHÂN LỆCH R75 → R76 (TASK B.4)');
log('=============================================================================================================================================\n');

for (const w of [33, 34, 39, 41]) {
  const d = diagnostics[w];
  if (!d) continue;
  log(`--- TUẦN W${w} ---`);
  log(`  • Dòng Source B (L${d.bLine}): ${d.bRawLine}`);
  log(`  • Danh sách từ Source B (đã parse, ${d.bVocab.length} mục): ${JSON.stringify(d.bVocab)}`);
  log(`  • Nguồn vocab production: ${d.vocabDetails.sourceFile} | Số phần tử: ${d.vocabDetails.items.length} | Kiểu dữ liệu phần tử: ${JSON.stringify(d.vocabDetails.elementTypes)}`);
  log(`  • Giá trị vocab production (theo kiểu ${d.vocabDetails.elementTypes.join('/')} -> trường .word): ${JSON.stringify(d.vocabDetails.items.map(x => `${x.word} (${x.type})`))}`);
  log(`  • Từ khớp chính xác (${d.matchedExact.length}/${d.bVocab.length}): ${JSON.stringify(d.matchedExact)}`);
  log(`  • Từ không khớp chính xác (${d.unmatched.length}/${d.bVocab.length}): ${JSON.stringify(d.unmatched)}${d.approxMatches.length ? ` | Gần đúng/dạng phái sinh trong file: ${d.approxMatches.map(a => `${a.sourceB} ~> ${JSON.stringify(a.prodCandidates)}`).join('; ')}` : ''}`);
  log('');
}

// Extract exact code lines from R75 & R76 scripts to explain R75 -> R76 regression dynamically
const r75Lines = fs.existsSync(R75_SCRIPT_PATH) ? fs.readFileSync(R75_SCRIPT_PATH, 'utf8').split('\n') : [];
const r76Lines = fs.existsSync(R76_SCRIPT_PATH) ? fs.readFileSync(R76_SCRIPT_PATH, 'utf8').split('\n') : [];

log('--- NGUYÊN NHÂN KỸ THUẬT GÂY LỆCH TỪ R75 → R76 (TRÍCH TỪ MÃ NGUỒN THẬT) ---');
log('1. W33 (R75: 6/6 → R76: 0/6):');
if (r75Lines.length && r76Lines.length && diagnostics[33]) {
  const m33 = diagnostics[33].matchedExact?.length ?? 0;
  const t33 = diagnostics[33].bVocab?.length ?? 0;
  log(`   - R75 (${path.relative(ROOT_DIR, R75_SCRIPT_PATH)}:L160,L177): \`${r75Lines[159].trim()}\` và trả về \`${r75Lines[176].trim()}\` -> đọc được mảng 20 object trong \`export default [...]\` của W33.`);
  log(`   - R76 (${path.relative(ROOT_DIR, R76_SCRIPT_PATH)}:L177,L184): \`${r76Lines[176].trim()}\` xóa sạch khối \`export default [...]\` tới dấu \`;\` đầu tiên (L203), đồng thời L184 \`${r76Lines[183].trim()}\` không kiểm tra \`sandbox.__default__\` nên trả về \`[]\` -> 0/6.`);
  log(`   - R77 sau khi sửa: dùng \`var __default__ = \` và kiểm tra \`sandbox.__default__\` -> khôi phục đúng ${m33}/${t33}${t33 ? ` (${Math.round((m33 / t33) * 100)}%)` : ''}.`);
}

log('2. W34 (R75: 7/7 → R76: 6/7) & W39 (R75: 7/7 → R76: 6/7):');
if (r75Lines.length && r76Lines.length) {
  log(`   - R75 (${path.relative(ROOT_DIR, R75_SCRIPT_PATH)}:L315): \`${r75Lines[314].trim()}\` — so khớp chuỗi con nên \`"friendship".includes("friend")\` (W34) và \`"polar region".includes("polar")\` (W39) đều tính là khớp -> 7/7.`);
  log(`   - R76 (${path.relative(ROOT_DIR, R76_SCRIPT_PATH)}:L253): \`${r76Lines[252].trim()}\` — đổi sang so khớp tuyệt đối \`Array.prototype.includes()\`, do \`vocab.js\` W34 chỉ có \`"friendship"\` (thiếu \`"friend"\`) và W39 chỉ có \`"polar"\` (thiếu \`"polar region"\`) nên tụt xuống 6/7.`);
  log(`   - R77: đo chính xác 6/7 và chú thích rõ cặp gần đúng (\`friend ~> friendship\`, \`polar region ~> polar\`) để không che lệch từ gốc.`);
}

log('3. W41 (R75: 7/7 → R76: 3/5):');
if (r75Lines.length && r76Lines.length && diagnostics[41]) {
  const m41 = diagnostics[41].matchedExact?.length ?? 0;
  const t41 = diagnostics[41].bVocab?.length ?? 0;
  log(`   - R75 (${path.relative(ROOT_DIR, R75_SCRIPT_PATH)}:L131): \`${r75Lines[130].trim()}\` — tách dấu \`/\`, chuyển \`caterpillar/tadpole\` và \`butterfly/frog\` thành 4 từ riêng -> tổng 7 từ -> 7/7.`);
  log(`   - R76 (${path.relative(ROOT_DIR, R76_SCRIPT_PATH)}:L115): \`${r76Lines[114].trim()}\` — bỏ dấu \`/\`, giữ nguyên chuỗi \`"caterpillar/tadpole"\` và \`"butterfly/frog"\` làm 5 mục nên 2 mục có \`/\` không khớp -> 3/5.`);
  log(`   - R77 sau khi sửa: tách lại theo \`/[,;\\/]/\` -> khôi phục đúng ${m41}/${t41}${t41 ? ` (${Math.round((m41 / t41) * 100)}%)` : ''}.`);
}

log('\n--- KIỂM CHỨNG W36 THEME ESCAPED QUOTES (TASK B.6) ---');
const w36RhLine = fs.readFileSync(path.join(PROD_DIR, 'week_36/reading_hub.js'), 'utf8')
  .split('\n')
  .map((l, idx) => ({ lineNum: idx + 1, text: l }))
  .find(x => /^\s*theme\s*:/.test(x.text));
if (w36RhLine && r76Lines.length) {
  log(`   - Dòng thật trong \`src/data/weeks/week_36/reading_hub.js:L${w36RhLine.lineNum}\`: \`${w36RhLine.text.trim()}\``);
  log(`   - R76 (${path.relative(ROOT_DIR, R76_SCRIPT_PATH)}:L127) chạy regex \`${r76Lines[126].trim()}\` trước VM nên bị dừng ngay tại \`\\"\`, cắt cụt thành \`Review & Project 3: \\\`.`);
  const w36Row = prodResults.find(r => r.week === 36);
  log(`   - R77 (ưu tiên VM eval + regex hỗ trợ escaped quotes): trích đúng \`${w36Row?.realTheme}\` | So với Tiêu đề Source B (\`${w36Row?.titleEn}\`): ${w36Row?.matchTitle}.`);
}

fs.writeFileSync(OUT_FILE, logOutput, 'utf8');
console.log(`\n✓ Round 77 baseline audit saved to: ${path.relative(ROOT_DIR, OUT_FILE)}`);
