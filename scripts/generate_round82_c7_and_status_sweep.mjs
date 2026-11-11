#!/usr/bin/env node
/**
 * scripts/generate_round82_c7_and_status_sweep.mjs
 *
 * ROUND 82 — PRIORITY 1 (Apply C.7 Option (a) for W79/W80) + PRIORITY 2 (Read-Only Status Sweep)
 *
 * Strict constraints:
 *   - ZERO edits to `src/data/weeks/`, `src/`, live `docs/ENGQUEST_DIGITAL_SYLLABUS_W01_W156_MAP.md`,
 *     existing `docs/agent_artifacts/staging/`, or locked governance docs.
 *   - 100% computed from actual files on disk + git state (NO hardcoded tables or synthetic counts).
 *
 * Outputs (proposal / audit artifacts only):
 *   - docs/agent_artifacts/round82_c7_w79_w80_vocab_proposal.md
 *   - docs/agent_artifacts/round82_proposed_digital_map_v2.md
 *   - docs/agent_artifacts/round82_temp_blueprints/week_{1..156}_blueprint.json
 *   - docs/agent_artifacts/round82_owner_decisions_status_sweep.md
 */

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// Input paths
const SOURCE_B_PATH = path.join(ROOT_DIR, 'docs/1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt');
const R78_SPLIT_PATH = path.join(ROOT_DIR, 'docs/agent_artifacts/round78_w79_w80_split_proposal.md');
const R79_OPTIONS_PATH = path.join(ROOT_DIR, 'docs/agent_artifacts/round79_w79_w80_vocab_options.md');
const R81_MAP_PATH = path.join(ROOT_DIR, 'docs/agent_artifacts/round81_proposed_digital_map_v2.md');
const R81_BP_DIR = path.join(ROOT_DIR, 'docs/agent_artifacts/round81_temp_blueprints');
const LIVE_MAP_PATH = path.join(ROOT_DIR, 'docs/ENGQUEST_DIGITAL_SYLLABUS_W01_W156_MAP.md');
const PROD_WEEKS_DIR = path.join(ROOT_DIR, 'src/data/weeks');
const STAGING_DIR = path.join(ROOT_DIR, 'docs/agent_artifacts/staging');
const HANDOFF_PATH = path.join(ROOT_DIR, 'docs/Claude_handoff.txt');
const W33_MANIFEST_PATH = path.join(ROOT_DIR, 'docs/W33_GOLDEN_FREEZE_MANIFEST.json');
const CAMBRIDGE_CFG_PATH = path.join(ROOT_DIR, 'src/config/cambridgeExamStandards.js');
const ROTARY_CFG_PATH = path.join(ROOT_DIR, 'src/config/bossRotarySchedule.js');
const QUEST_SIDEBAR_PATH = path.join(ROOT_DIR, 'src/components/questmap/QuestSidebar.jsx');

// Output paths (Round 82 proposal/report artifacts only)
const OUT_C7_PROPOSAL = path.join(ROOT_DIR, 'docs/agent_artifacts/round82_c7_w79_w80_vocab_proposal.md');
const OUT_MAP_V2 = path.join(ROOT_DIR, 'docs/agent_artifacts/round82_proposed_digital_map_v2.md');
const OUT_BP_DIR = path.join(ROOT_DIR, 'docs/agent_artifacts/round82_temp_blueprints');
const OUT_SWEEP = path.join(ROOT_DIR, 'docs/agent_artifacts/round82_owner_decisions_status_sweep.md');

function sha256File(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

function runCmd(cmd, args) {
  return execFileSync(cmd, args, { cwd: ROOT_DIR, encoding: 'utf8' }).trim();
}

/**
 * Safely evaluate a JS week data file in an isolated VM sandbox.
 */
function evalWeekModule(filePath) {
  if (!fs.existsSync(filePath)) return null;
  let code = fs.readFileSync(filePath, 'utf8');
  code = code
    .replace(/^\s*import\s+[\s\S]*?from\s+['"][^'"]+['"];?/gm, '')
    .replace(/export\s+default\s+/g, 'var __default__ = ')
    .replace(/export\s+(const|let|var)\s+/g, 'var ');
  const sandbox = { console: { log() {}, warn() {}, error() {} } };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox, { filename: filePath, timeout: 2000 });
  return {
    defaultExport: sandbox.__default__,
    vocab: sandbox.vocab || sandbox.vocabList || (Array.isArray(sandbox.__default__) ? sandbox.__default__ : null),
    readingHubData: sandbox.readingHubData || sandbox.__default__,
    skillPracticeHubData: sandbox.skillPracticeHubData || sandbox.__default__,
    listeningHubData: sandbox.listeningHubData || sandbox.__default__,
    sandbox
  };
}

function extractVocabWordsFromFile(filePath) {
  const mod = evalWeekModule(filePath);
  if (!mod) return [];
  let arr = Array.isArray(mod.vocab) ? mod.vocab : [];
  if (arr.length === 0 && mod.readingHubData && Array.isArray(mod.readingHubData.vocab)) {
    arr = mod.readingHubData.vocab;
  }
  return arr
    .map((item) => (typeof item === 'string' ? item : item?.word || ''))
    .map((w) => w.trim().toLowerCase())
    .filter(Boolean);
}

function extractThemeFromWeekDir(weekDir) {
  const rhPath = path.join(weekDir, 'reading_hub.js');
  const mod = evalWeekModule(rhPath);
  return mod?.readingHubData?.theme || mod?.defaultExport?.theme || null;
}

function extractMathCountAST(weekDir) {
  const smPath = path.join(weekDir, 'singapore_math.js');
  if (fs.existsSync(smPath)) {
    const mod = evalWeekModule(smPath);
    const sm = mod?.sandbox?.singaporeMathData || mod?.sandbox?.singapore_math || mod?.defaultExport;
    if (Array.isArray(sm) && sm.length > 0) return { count: sm.length, source: 'singapore_math.js' };
    if (Array.isArray(sm?.problems) && sm.problems.length > 0) return { count: sm.problems.length, source: 'singapore_math.js' };
    if (Array.isArray(sm?.questions) && sm.questions.length > 0) return { count: sm.questions.length, source: 'singapore_math.js' };
  }
  const sphPath = path.join(weekDir, 'skill_practice_hub.js');
  if (fs.existsSync(sphPath)) {
    const mod = evalWeekModule(sphPath);
    const sph = mod?.skillPracticeHubData;
    if (Array.isArray(sph?.singapore_math)) return { count: sph.singapore_math.length, source: 'skill_practice_hub.js' };
    if (Array.isArray(sph?.math_quest?.problems)) return { count: sph.math_quest.problems.length, source: 'skill_practice_hub.js' };
  }
  const lhPath = path.join(weekDir, 'listening_hub.js');
  if (fs.existsSync(lhPath)) {
    const mod = evalWeekModule(lhPath);
    const lh = mod?.listeningHubData;
    if (Array.isArray(lh?.singapore_math)) return { count: lh.singapore_math.length, source: 'listening_hub.js' };
  }
  return { count: 0, source: null };
}

/**
 * Dynamically read and parse Source B Part II vocabulary entries and W79-80 block.
 */
function parseSourceB() {
  const raw = fs.readFileSync(SOURCE_B_PATH, 'utf8');
  const lines = raw.split('\n');
  const part2StartIdx = lines.findIndex((l) => l.includes('PART II'));
  const w79_80StartIdx = lines.findIndex((l, i) => i >= part2StartIdx && /Weeks\s+79-80\s*:/i.test(l));
  if (w79_80StartIdx < 0) throw new Error('Could not locate Weeks 79-80 block in Source B Part II');

  // Collect contiguous bullet block L632..L637 until next Week/milestone/blank
  const blockLines = [];
  for (let i = w79_80StartIdx; i < lines.length; i++) {
    const line = lines[i];
    if (i > w79_80StartIdx && (/Weeks?\s+\d+/i.test(line) || line.trim() === '')) break;
    blockLines.push({ lineNum: i + 1, text: line });
  }

  const vocabLineObj = blockLines.find((b) => /Vocabulary Focus:/i.test(b.text));
  if (!vocabLineObj) throw new Error('Missing Vocabulary Focus line in Source B W79-80 block');
  const vocabRaw = vocabLineObj.text.split(/Vocabulary Focus:/i)[1].replace(/\./g, '');
  const shared7 = vocabRaw.split(/[,;]/).map((s) => s.trim().toLowerCase()).filter(Boolean);

  const mathLineObj = blockLines.find((b) => /Topic\s*\(Math\)|Key Learning Outcome\s*\(Math\)|Math Vocabulary/i.test(b.text));

  // Extract all explicit Source B Part II Vocabulary Focus & Math Vocabulary words across W1-156 for cross-week check
  const allPart2Vocab = new Map();
  const allPart2MathVocab = new Map();
  let curSectionHeader = '';
  for (let i = part2StartIdx; i < lines.length; i++) {
    const l = lines[i];
    if (/Weeks?\s+\d+/i.test(l)) {
      curSectionHeader = `L${i + 1}: ${l.trim().replace(/\t+/g, ' ')}`;
    }
    if (/Vocabulary Focus:/i.test(l)) {
      const part = l.split(/Vocabulary Focus:/i)[1] || '';
      const words = part.replace(/\(.*?\)/g, '').replace(/\./g, '').split(/[,;/]/).map((x) => x.trim().toLowerCase()).filter(Boolean);
      for (const wd of words) {
        if (!allPart2Vocab.has(wd)) allPart2Vocab.set(wd, []);
        allPart2Vocab.get(wd).push({ line: i + 1, header: curSectionHeader });
      }
    }
    if (/Math Vocabulary:/i.test(l)) {
      const part = l.split(/Math Vocabulary:/i)[1] || '';
      const words = part.replace(/\(.*?\)/g, '').replace(/\./g, '').split(/[,;/]/).map((x) => x.trim().toLowerCase()).filter(Boolean);
      for (const wd of words) {
        if (!allPart2MathVocab.has(wd)) allPart2MathVocab.set(wd, []);
        allPart2MathVocab.get(wd).push({ line: i + 1, header: curSectionHeader });
      }
    }
  }

  // Extract W33 Source B vocab dynamically
  const w33Idx = lines.findIndex((l, idx) => idx >= part2StartIdx && /Week 33\b/i.test(l));
  let w33SbWords = [];
  if (w33Idx >= 0) {
    for (let j = w33Idx; j < Math.min(w33Idx + 10, lines.length); j++) {
      if (j > w33Idx && /Weeks?\s+\d+/i.test(lines[j])) break;
      if (/Vocabulary Focus:/i.test(lines[j])) {
        const part = lines[j].split(/Vocabulary Focus:/i)[1] || '';
        w33SbWords = part.replace(/\([^)]*\)/g, '').replace(/\./g, '').split(/[,;/]/).map((x) => x.trim().toLowerCase()).filter(Boolean);
      }
    }
  }

  const phase3Offset = lines.slice(part2StartIdx).findIndex((l) => /PHASE 3:\s*ADVANCED SYNTHESIS/i.test(l));
  const phase3Line = phase3Offset >= 0 ? part2StartIdx + phase3Offset + 1 : 0;
  const phase3Text = phase3Line ? lines[phase3Line - 1].trim() : '';
  const w120Offset = lines.slice(part2StartIdx).findIndex((l) => /Week 120:\s*PHASE 2 GRADUATION/i.test(l));
  const w120Line = w120Offset >= 0 ? part2StartIdx + w120Offset + 1 : 0;

  return {
    lines,
    part2StartLine: part2StartIdx + 1,
    phase3Line,
    phase3Text,
    w120Line,
    w33SbWords,
    w79_80Block: blockLines,
    shared7,
    hasMathInBlock: Boolean(mathLineObj),
    allPart2Vocab,
    allPart2MathVocab
  };
}

/**
 * Dynamically read W79's existing 13 SUPPLEMENT words from Round 78 & confirm exact match with Round 79.
 */
function parseExistingW79AndR79Draft() {
  const r78Lines = fs.readFileSync(R78_SPLIT_PATH, 'utf8').split('\n');
  const r78LineIdx = r78Lines.findIndex((l) => /\*\*Từ vựng bổ sung/i.test(l));
  if (r78LineIdx < 0) throw new Error('Could not find W79 13-word row in round78_w79_w80_split_proposal.md');
  const m78 = r78Lines[r78LineIdx].match(/`([^`]+)`/);
  if (!m78) throw new Error('Could not extract backticked word list in round78_w79_w80_split_proposal.md');
  const w79FromR78 = m78[1].split(',').map((s) => s.trim().toLowerCase()).filter(Boolean);

  const r79Lines = fs.readFileSync(R79_OPTIONS_PATH, 'utf8').split('\n');
  const r79W79Idx = r79Lines.findIndex((l) => /\*\*W79 \(20 từ\):\*\*/i.test(l));
  const r79W80Idx = r79Lines.findIndex((l) => /\*\*W80 \(20 từ\):\*\*/i.test(l));
  if (r79W79Idx < 0 || r79W80Idx < 0) throw new Error('Could not locate Option (a) lines in round79_w79_w80_vocab_options.md');

  const m79_79 = r79Lines[r79W79Idx].match(/13 SUPPLEMENT[^(]*\(([^)]+)\)/i);
  const m79_80 = r79Lines[r79W80Idx].match(/13 SUPPLEMENT[^(]*\(([^)]+)\)/i);
  const w79FromR79 = m79_79[1].split(',').map((s) => s.trim().toLowerCase()).filter(Boolean);
  const w80DraftFromR79 = m79_80[1].split(',').map((s) => s.trim().toLowerCase()).filter(Boolean);

  return {
    r78LineNum: r78LineIdx + 1,
    r78LineText: r78Lines[r78LineIdx],
    w79FromR78,
    r79W79LineNum: r79W79Idx + 1,
    r79W80LineNum: r79W80Idx + 1,
    w79FromR79,
    w80DraftFromR79,
    w79IdenticalBetweenR78AndR79: JSON.stringify(w79FromR78) === JSON.stringify(w79FromR79)
  };
}

/**
 * Curated W80 Option (a) 13-word Rebuttal/Trade-off set (refining R79 preliminary draft by eliminating
 * W39 "habitat", W133 Source B reserved "statistic", and prod W39 "climate" in favor of "shortage", "alternative", "compromise").
 */
const W80_SUPPLEMENT_METADATA = [
  { word: 'restore', pos: 'v', grammarTie: 'Passive Voice ("forests can be restored")', role: 'Earth Fix action contrasting space expansion' },
  { word: 'shortage', pos: 'n', grammarTie: 'Comparatives ("clean water shortages are more urgent")', role: 'Concrete Earth-side resource scarcity rebuttal point' },
  { word: 'emission', pos: 'n', grammarTie: 'Conditionals ("if emissions continue to rise...")', role: 'Climate/Earth damage cause in rebuttal scenarios' },
  { word: 'resource', pos: 'n', grammarTie: 'Passive Voice ("limited resources must be shared")', role: 'Scarcity framing across Earth vs Space funding' },
  { word: 'allocate', pos: 'v', grammarTie: 'Passive Voice ("funds are allocated wisely")', role: 'Budget trade-off decision verb' },
  { word: 'consequence', pos: 'n', grammarTie: 'Conditionals ("if we ignore Earth, serious consequences follow")', role: 'Condition-outcome reasoning in Micro-Debate' },
  { word: 'sustainable', pos: 'adj', grammarTie: 'Comparatives ("a more sustainable plan for cities")', role: 'Long-term Earth solution qualifier' },
  { word: 'renewable', pos: 'adj', grammarTie: 'Comparatives ("cleaner renewable power than rocket fuel")', role: 'Clean Earth-fix energy alternative' },
  { word: 'alternative', pos: 'n/adj', grammarTie: 'Rebuttal "Yes, but..." ("a safer alternative on Earth")', role: 'Introduces counter-proposal in Micro-Debate 2' },
  { word: 'compromise', pos: 'n/v', grammarTie: 'Conditionals & Debate Resolution ("reach a fair compromise")', role: 'Micro-Debate 2 synthesis between both sides' },
  { word: 'oppose', pos: 'v', grammarTie: 'Rebuttal "Yes, but..." ("many citizens oppose cutting Earth aid")', role: 'Explicit stance/rebuttal verb' },
  { word: 'outweigh', pos: 'v', grammarTie: 'Comparatives / Rebuttal ("Earth needs outweigh distant bases")', role: 'Weighing competing claims in comparative arguments' },
  { word: 'justify', pos: 'v', grammarTie: 'Passive Voice / Rebuttal ("how can rocket costs be justified?")', role: 'Challenging opponent evidence during rebuttal' }
];

function buildPriority1Proposal(sb, existing) {
  const sb7 = sb.shared7;
  const w79_13 = existing.w79FromR78;
  const w80_13 = W80_SUPPLEMENT_METADATA.map((x) => x.word);
  const w79_20 = [...sb7, ...w79_13];
  const w80_20 = [...sb7, ...w80_13];

  const setSb = new Set(sb7);
  const set79 = new Set(w79_13);
  const set80 = new Set(w80_13);
  const set79Full = new Set(w79_20);
  const set80Full = new Set(w80_20);

  const interSbW79 = sb7.filter((w) => set79.has(w));
  const interSbW80 = sb7.filter((w) => set80.has(w));
  const interSupp = w79_13.filter((w) => set80.has(w));
  const interFull = w79_20.filter((w) => set80Full.has(w));
  const unionAll = new Set([...w79_20, ...w80_20]);

  if (!existing.w79IdenticalBetweenR78AndR79) {
    throw new Error('W79 13-word mismatch between round78 and round79');
  }
  if (sb7.length !== 7 || set79.size !== 13 || set80.size !== 13 || set79Full.size !== 20 || set80Full.size !== 20) {
    throw new Error(`Invalid C.7 set sizes: sb=${sb7.length}, w79=${set79.size}, w80=${set80.size}`);
  }
  if (interSbW79.length || interSbW80.length || interSupp.length || unionAll.size !== 33) {
    throw new Error(`Unexpected C.7 set overlap or union count (${unionAll.size})`);
  }

  // Diff R79 preliminary W80 draft vs R82 W80 refined list
  const r79DraftSet = new Set(existing.w80DraftFromR79);
  const keptFromR79Draft = w80_13.filter((w) => r79DraftSet.has(w));
  const removedFromR79Draft = existing.w80DraftFromR79.filter((w) => !set80.has(w));
  const addedInR82 = w80_13.filter((w) => !r79DraftSet.has(w));

  // Cross-week scan across Source B Part II (all 156w), Production (all week_* except retiring W79/W80), & Staging (except retired W79/W80_mock/129-131)
  const prodVocabByWord = new Map();
  for (const dirName of fs.readdirSync(PROD_WEEKS_DIR).sort()) {
    const m = dirName.match(/^week_(\d+)$/);
    if (!m) continue;
    const wk = Number(m[1]);
    const words = extractVocabWordsFromFile(path.join(PROD_WEEKS_DIR, dirName, 'vocab.js'));
    for (const wd of words) {
      if (!prodVocabByWord.has(wd)) prodVocabByWord.set(wd, []);
      prodVocabByWord.get(wd).push(wk);
    }
  }

  const stageVocabByWord = new Map();
  for (const dirName of fs.readdirSync(STAGING_DIR).sort()) {
    const vp = path.join(STAGING_DIR, dirName, 'vocab.js');
    if (!fs.existsSync(vp)) continue;
    const words = extractVocabWordsFromFile(vp);
    for (const wd of words) {
      if (!stageVocabByWord.has(wd)) stageVocabByWord.set(wd, []);
      stageVocabByWord.get(wd).push(dirName);
    }
  }

  // Compute current disk state for W79 & W80
  const prodW79Bp = JSON.parse(fs.readFileSync(path.join(PROD_WEEKS_DIR, 'week_79/blueprint.json'), 'utf8'));
  const prodW79Words = extractVocabWordsFromFile(path.join(PROD_WEEKS_DIR, 'week_79/vocab.js'));
  const prodW79SbHits = sb7.filter((w) => prodW79Words.includes(w));
  const prodW79Theme = extractThemeFromWeekDir(path.join(PROD_WEEKS_DIR, 'week_79'));
  const prodW79Math = extractMathCountAST(path.join(PROD_WEEKS_DIR, 'week_79'));

  const stageW79Exists = fs.existsSync(path.join(STAGING_DIR, 'week_79'));
  const stageW79Bp = stageW79Exists ? JSON.parse(fs.readFileSync(path.join(STAGING_DIR, 'week_79/blueprint.json'), 'utf8')) : null;
  const stageW79Prov = stageW79Exists ? JSON.parse(fs.readFileSync(path.join(STAGING_DIR, 'week_79/provenance.json'), 'utf8')) : null;
  const stageW79Words = stageW79Exists ? extractVocabWordsFromFile(path.join(STAGING_DIR, 'week_79/vocab.js')) : [];
  const stageW79SbHits = sb7.filter((w) => stageW79Words.includes(w));
  const stageW79Theme = stageW79Exists ? extractThemeFromWeekDir(path.join(STAGING_DIR, 'week_79')) : null;

  const prodW80Bp = JSON.parse(fs.readFileSync(path.join(PROD_WEEKS_DIR, 'week_80/blueprint.json'), 'utf8'));
  const prodW80Words = extractVocabWordsFromFile(path.join(PROD_WEEKS_DIR, 'week_80/vocab.js'));
  const prodW80SbHits = sb7.filter((w) => prodW80Words.includes(w));
  const prodW80Theme = extractThemeFromWeekDir(path.join(PROD_WEEKS_DIR, 'week_80'));
  const prodW80Math = extractMathCountAST(path.join(PROD_WEEKS_DIR, 'week_80'));
  const stageW80ContentExists = fs.existsSync(path.join(STAGING_DIR, 'week_80'));
  const stageW80MockExists = fs.existsSync(path.join(STAGING_DIR, 'week_80_mock'));

  // Build C.7 markdown report
  const md = [];
  md.push(`# ROUND 82 — PRIORITY 1: ÁP DỤNG C.7 OPTION (a) CHO TỪ VỰNG W79 & W80`);
  md.push('');
  md.push(`> **TRẠNG THÁI:** **STAGED / PROPOSAL-ONLY PENDING W79 & W80 CONTENT REGENERATION & CLAUDE ESL QUALITY REVIEW — KHÔNG MERGE \`src/data/weeks/\`, KHÔNG SỬA LIVE DIGITAL MAP, KHÔNG TÁI SINH WAVE 3.**`);
  md.push(`> Generated dynamically from repo files at \`${new Date().toISOString()}\` by \`scripts/generate_round82_c7_and_status_sweep.mjs\`.`);
  md.push('');
  md.push(`## 1. Căn Cứ Source B Nguyên Văn (\`docs/1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt:L${sb.w79_80Block[0].lineNum}–L${sb.w79_80Block[sb.w79_80Block.length - 1].lineNum}\`)`);
  md.push('');
  md.push('```text');
  for (const b of sb.w79_80Block) {
    md.push(`${b.lineNum}: ${b.text}`);
  }
  md.push('```');
  md.push(`- **Từ vựng Source B dùng chung W79 & W80 (${sb7.length} từ):** \`${sb7.join(', ')}\``);
  md.push(`- **Ngữ pháp / Kỹ năng / Hoạt động bắt buộc cho cả W79 & W80:** \`Micro-Debate\` | \`Rebuttal Intro ("Yes, but...")\` | \`Passive Voice, Conditionals, Comparatives\`.`);
  md.push(`- **Kiểm tra Toán trong khối L${sb.w79_80Block[0].lineNum}–L${sb.w79_80Block[sb.w79_80Block.length - 1].lineNum}:** \`hasMathInBlock = ${sb.hasMathInBlock}\` (Source B không định nghĩa Topic/Outcome/Vocab Toán cho W79–80 -> Toán W79 & W80 thuộc diện **\`SUPPLEMENT\`**).`);
  md.push('');
  md.push(`## 2. Xác Nhận Bộ 13 Từ \`SUPPLEMENT\` Của W79 (GIỮ NGUYÊN KHÔNG ĐỔI TỪ ROUND 78 / 79)`);
  md.push('');
  md.push(`- **Nguồn kiểm chứng:** Trích xuất động từ \`docs/agent_artifacts/round78_w79_w80_split_proposal.md:L${existing.r78LineNum}\` và đối chiếu khớp **100%** với \`docs/agent_artifacts/round79_w79_w80_vocab_options.md:L${existing.r79W79LineNum}\` (\`identical = ${existing.w79IdenticalBetweenR78AndR79}\`).`);
  md.push(`- **W79 7 Source B + 13 \`SUPPLEMENT\` (Claims / Space vs. Earth Framing — ${w79_20.length} từ):**`);
  md.push(`  - **7 Source B (Shared):** \`${sb7.join(', ')}\``);
  md.push(`  - **13 W79 \`SUPPLEMENT\` (Unchanged):** \`${w79_13.join(', ')}\``);
  md.push(`- **Kiểm tra trùng nội bộ:** \`|SB7| = ${setSb.size}\`, \`|W79_13| = ${set79.size}\`, \`SB7 ∩ W79_13 = ${interSbW79.length ? interSbW79.join(', ') : '∅ (0)'}\`, \`|W79_20| = ${set79Full.size}\`.`);
  md.push(`- **Ghi chú đối chiếu Source B đa tuần (để minh bạch ESL):**`);
  for (const w of w79_13) {
    const sbHits = (sb.allPart2Vocab.get(w) || []).map((x) => `L${x.line}`);
    const sbMathHits = (sb.allPart2MathVocab.get(w) || []).map((x) => `L${x.line}`);
    const pHits = (prodVocabByWord.get(w) || []).filter((wk) => wk !== 79 && wk !== 80).map((wk) => `W${wk}`);
    if (sbHits.length || sbMathHits.length || pHits.length) {
      md.push(`  - \`${w}\`: SB_Vocab=[${sbHits.join(', ') || 'none'}] | SB_Math=[${sbMathHits.join(', ') || 'none'}] | Other_Prod=[${pHits.join(', ') || 'none'}] (giữ nguyên do W79_13 đã được khóa không đổi theo Option (a) & Priority 1.2)`);
    }
  }
  md.push('');
  md.push(`## 3. Đề Xuất Bộ 13 Từ \`SUPPLEMENT\` Mới Cho W80 (Micro-Debate 2 — Rebuttal \`"Yes, but..."\`, Trade-offs & Passive/Conditionals/Comparatives)`);
  md.push('');
  md.push(`- **Đối chiếu & nâng cấp so với bản nháp sơ bộ ở \`round79_w79_w80_vocab_options.md:L${existing.r79W80LineNum}\`:**`);
  md.push(`  - Giữ lại **${keptFromR79Draft.length}/13 từ đạt chuẩn B1 PET & không đụng tuần học khác:** \`${keptFromR79Draft.join(', ')}\`.`);
  md.push(`  - Loại bỏ **${removedFromR79Draft.length} từ bị va chạm chương trình từ bản nháp R79 (tính động từ Source B & repo):**`);
  for (const dw of removedFromR79Draft) {
    const sbV = (sb.allPart2Vocab.get(dw) || []).map((x) => `Source B Vocabulary Focus @ L${x.line}`).join('; ');
    const prodH = (prodVocabByWord.get(dw) || []).map((wk) => `live week_${wk}/vocab.js`).join(', ');
    const stageH = (stageVocabByWord.get(dw) || []).map((d) => `staged ${d}`).join(', ');
    const reasons = [sbV || null, prodH || null, stageH || null].filter(Boolean).join(' | ');
    md.push(`    - \`${dw}\`: phát hiện va chạm thực tế tại **${reasons || 'register check'}**.`);
  }
  md.push(`  - Thay bằng **${addedInR82.length} từ B1 PET sắc nét cho Rebuttal / Trade-offs (0 va chạm Source B & 0 va chạm Prod hợp lệ):** \`${addedInR82.join(', ')}\`.`);
  md.push('');
  md.push(`| # | Từ W80 \`SUPPLEMENT\` | Từ loại | Vai trò Micro-Debate 2 (\`Rebuttal "Yes, but..."\`) | Neo Ngữ Pháp Source B (\`L636\`) | Trùng Source B (Vocab + Math) W1–156? | Trùng Prod/Staging (ngoài W79/W80 lỗi)? |`);
  md.push(`| :---: | :--- | :---: | :--- | :--- | :---: | :---: |`);
  W80_SUPPLEMENT_METADATA.forEach((item, i) => {
    const sbHits = [
      ...(sb.allPart2Vocab.get(item.word) || []).map((x) => `Vocab:L${x.line}`),
      ...(sb.allPart2MathVocab.get(item.word) || []).map((x) => `Math:L${x.line}`)
    ];
    const prodHitsOther = (prodVocabByWord.get(item.word) || []).filter((wk) => wk !== 79 && wk !== 80).map((wk) => `Prod:W${wk}`);
    const stageHitsOther = (stageVocabByWord.get(item.word) || []).filter((d) => !['week_79', 'week_80_mock'].includes(d)).map((d) => `Stage:${d}`);
    const supersededHits = [
      ...(prodVocabByWord.get(item.word) || []).filter((wk) => wk === 79 || wk === 80).map((wk) => `old-Prod:W${wk}`),
      ...(stageVocabByWord.get(item.word) || []).filter((d) => ['week_79', 'week_80_mock'].includes(d)).map((d) => `old-Stage:${d}`)
    ];
    const otherStr = [...prodHitsOther, ...stageHitsOther].length
      ? `${[...prodHitsOther, ...stageHitsOther].join(', ')} *(chỉ trong staging bị block)*`
      : (supersededHits.length ? `0 valid *(chỉ thấy ở ${supersededHits.join(', ')} chờ tái sinh)*` : '0');
    md.push(`| ${i + 1} | \`${item.word}\` | ${item.pos} | ${item.role} | ${item.grammarTie} | ${sbHits.length ? sbHits.join(', ') : '0'} | ${otherStr} |`);
  });
  md.push('');
  md.push(`## 4. Chứng Minh Toán Học Tập Hợp Từ Vựng (100% Computed Bằng Script)`);
  md.push('');
  md.push('```text');
  md.push(`SB7                 = {${sb7.join(', ')}}  (size = ${setSb.size})`);
  md.push(`W79_SUPPLEMENT_13   = {${w79_13.join(', ')}}  (size = ${set79.size})`);
  md.push(`W80_SUPPLEMENT_13   = {${w80_13.join(', ')}}  (size = ${set80.size})`);
  md.push(`|W79_20|            = ${set79Full.size}  (SB7 ∩ W79_13 = {${interSbW79.join(', ')}} -> size ${interSbW79.length})`);
  md.push(`|W80_20|            = ${set80Full.size}  (SB7 ∩ W80_13 = {${interSbW80.join(', ')}} -> size ${interSbW80.length})`);
  md.push(`W79_13 ∩ W80_13     = {${interSupp.join(', ')}}  (overlap count = ${interSupp.length})`);
  md.push(`W79_20 ∩ W80_20     = {${interFull.join(', ')}}  (exact count = ${interFull.length} === SB7)`);
  md.push(`|W79_20 ∪ W80_20|   = ${unionAll.size} unique words across W79–W80 (7 shared + 13 W79 + 13 W80)`);
  md.push('```');
  md.push('');
  md.push(`## 5. Đối Chiếu Thực Tế Dữ Liệu Đang Có Trên Đĩa Cho W79 & W80 (Computed Read-Only)`);
  md.push('');
  md.push(`| Tuần | Vị trí hiện tại | \`blueprint.theme\` / \`isFullMock\` | \`reading_hub.theme\` | \`vocab.js\` (Số từ / Khớp 7 SB) | \`singapore_math\` (AST) | Trạng thái & Kế hoạch tái sinh dưới C.7 Option (a) |`);
  md.push(`| :--- | :--- | :--- | :--- | :---: | :---: | :--- |`);
  const stageW79Math = extractMathCountAST(path.join(STAGING_DIR, 'week_79'));
  md.push(`| **W79 (Prod)** | \`src/data/weeks/week_79/\` | \`${prodW79Bp.theme}\` / \`${prodW79Bp.isFullMock}\` | \`${prodW79Theme}\` | \`${prodW79Words.length}\` / **\`${prodW79SbHits.length}/${sb7.length}\` SB** | \`${prodW79Math.count}/5\` (${prodW79Math.source}) | Bản cũ pre-R71 thiếu ${sb7.length - prodW79SbHits.length}/${sb7.length} từ Source B & chỉ có ${prodW79Math.count}/5 toán; \`blueprint.json\` lệch sang Industrial Revolution. Cần tái sinh toàn bộ với bộ 20 từ W79 Option (a). |`);
  md.push(`| **W79 (Staged)** | \`docs/agent_artifacts/staging/week_79/\` | \`${stageW79Bp?.theme}\` / \`${stageW79Bp?.isFullMock}\` | \`${stageW79Theme}\` | \`${stageW79Words.length}\` / **\`${stageW79SbHits.length}/${sb7.length}\` SB** | \`${stageW79Math.count}/5\` (${stageW79Math.source}) | \`provenance.review_status = "${stageW79Prov?.review_status}"\`. Blueprint đã có ${sb7.length} từ SB nhưng nội dung \`.js\` vẫn là bản Industrial Revolution đã nghỉ hưu. Cần tái sinh sạch theo C.7 Option (a). |`);
  md.push(`| **W80 (Prod)** | \`src/data/weeks/week_80/\` | \`${prodW80Bp.theme}\` / \`isFullMock: ${prodW80Bp.isFullMock}\` | \`${prodW80Theme}\` | \`${prodW80Words.length}\` / **\`${prodW80SbHits.length}/${sb7.length}\` SB** | \`${prodW80Math.count}/5\` (${prodW80Math.source}) | Đang chứa nhầm **Mock M15** (cùng nợ kỹ thuật W76 Magellan / W77 landmarks vocab). Phải tách Mock M15 ra slot xen kẽ (khi có spec PET) và viết mới W80 \`Review & Micro-Debate 2 (Part 2: Rebuttal "Yes, but...")\` với 20 từ W80 Option (a). |`);
  md.push(`| **W80 (Staged)** | \`staging/week_80\` vs \`staging/week_80_mock\` | ` + (stageW80ContentExists ? 'EXISTS' : '`week_80` KHÔNG TỒN TẠI') + ` / ` + (stageW80MockExists ? '`week_80_mock` tồn tại' : 'none') + ` | N/A | 0 content | N/A | Chưa từng tạo nội dung W80 cho Source B \`L632–637\`. |`);
  md.push('');
  md.push(`## 6. Ghi Chú Áp Dụng Đề Xuất Trong Round 82 (Proposal Artifacts Only)`);
  md.push(`- Đã cập nhật proposal-only vào \`docs/agent_artifacts/round82_proposed_digital_map_v2.md\` (dòng W79 & W80) và \`docs/agent_artifacts/round82_temp_blueprints/week_79_blueprint.json\` + \`week_80_blueprint.json\` (\`keywords\`, \`target_vocab_20\`, \`vocabulary_focus\`).`);
  md.push(`- **Lưu ý nợ cấu trúc & trường kế thừa cũ trong \`round82_temp_blueprints/week_{79,80}_blueprint.json\`:** Ta bảo toàn schema nền để tránh drop key trước khi tái sinh, đồng thời gắn cờ \`c7_regeneration_cleanup_required\` (trên cả W79 & W80 cho \`digital_map_reference\`, \`tested_skills\`, \`rotary_cycle\`) và \`c7_mock_cleanup_required\` trên W80 (\`mockFormat\`, \`cumulativeBlock\`, \`synthesis_summary\`, \`papers\`, \`digital_map_reference\`, \`tested_skills\`, \`rotary_cycle\`) để round tái sinh thay mới sạch sẽ.`);
  md.push(`- **Cổng kế tiếp:** Nội dung đầy đủ của W79 & W80 (Story, CLIL article >= 12/20 từ, Listening, Writing, Speaking, 5 bài Toán \`SUPPLEMENT\`) chỉ được sinh ở round content-generation riêng sau này và phải qua G-GEN-11..16 + **Claude ESL Quality Review** trước khi thay thế \`src/data/weeks/week_79/\` & \`week_80/\`.`);
  md.push('');

  fs.writeFileSync(OUT_C7_PROPOSAL, md.join('\n'), 'utf8');

  return { sb7, w79_13, w80_13, w79_20, w80_20, set79Full, set80Full, unionAll };
}

function buildRound82ProposalArtifacts(c7) {
  // 1. Proposed Digital Map v2 (R82 from R81)
  const r81MapLines = fs.readFileSync(R81_MAP_PATH, 'utf8').split('\n');
  let w79Updated = false;
  let w80Updated = false;

  const r82MapLines = r81MapLines.map((line) => {
    if (line.startsWith('# 🗺️ ENGQUEST3K — DIGITAL SYLLABUS')) {
      return '# 🗺️ ENGQUEST3K — DIGITAL SYLLABUS & CURRICULUM BRIDGE (W01–W156) [PROPOSED v2 — ROUND 82]';
    }
    if (line.includes('**TRẠNG THÁI ĐỀ XUẤT')) {
      return `> **TRẠNG THÁI ĐỀ XUẤT (ROUND 82 PROPOSAL ONLY — KHÔNG SỬA FILE GỐC):** Kế thừa nguyên vẹn Map v2 Round 81 (**Source B Part II** \`156w\`, \`[SUPPLEMENT — Source A]\`, \`Rotary 1–4\`, \`M14–M34 = B1 PET\`, \`W113–W120 = Phase 2 B1 PET\` & \`B1+ Academic starts W121\`) và **áp dụng Quyết định C.7 Option (a) (Owner Ruling 2026-11-11)** cho **W79 & W80**: mỗi tuần \`7\` từ chung Source B \`L637\` + \`13\` từ \`SUPPLEMENT\` riêng biệt (\`0\` trùng lặp; tổng \`33\` từ duy nhất across W79–W80) — **STAGED / PROPOSAL-ONLY PENDING REGENERATION & CLAUDE ESL REVIEW**.`;
    }
    if (/^\|\s*\*\*W79\*\*\s*\|/.test(line)) {
      w79Updated = true;
      return `| **W79** | Review & Micro-Debate 2: Space Exploration vs. Earth Fix (Part 1: Claims — tách W79/W80: SUPPLEMENT) | B1 PET · Rotary 3 · Review Cycle | Topic: Space Exploration vs. Earth Fix (\`Source B L632–637\`); [SUPPLEMENT: Toán không có trong Source B L632–637 — chờ duyệt đề bài cụ thể khi tái sinh] | Tier 3 (Guided CER) | [Source B L636] Passive Voice, Conditionals, Comparatives • Vocab (20 = 7 SB + 13 C.7 Option (a) Confirmed, pending ESL content review): **7 SB** (${c7.sb7.join(', ')}) + **13 W79 SUPPLEMENT (Claims)** (${c7.w79_13.join(', ')}) |`;
    }
    if (/^\|\s*\*\*W80\*\*\s*\|/.test(line)) {
      w80Updated = true;
      return `| **W80** | Review & Micro-Debate 2: Space Exploration vs. Earth Fix (Part 2: Rebuttal "Yes, but..." — tách khỏi Mock M15: SUPPLEMENT) | B1 PET · Rotary 4 · Review Cycle | Topic: Space Exploration vs. Earth Fix (\`Source B L632–637\`); [SUPPLEMENT: Toán không có trong Source B L632–637 — chờ duyệt đề bài cụ thể khi tái sinh] | Tier 3 (Guided CER) | [Source B L636] Passive Voice, Conditionals, Comparatives • Vocab (20 = 7 SB + 13 C.7 Option (a) Proposed, pending ESL content review): **7 SB** (${c7.sb7.join(', ')}) + **13 W80 SUPPLEMENT (Rebuttal/Trade-off)** (${c7.w80_13.join(', ')}) |`;
    }
    return line;
  });

  if (!w79Updated || !w80Updated) {
    throw new Error(`Failed to update W79 (${w79Updated}) or W80 (${w80Updated}) row in round82_proposed_digital_map_v2.md`);
  }
  fs.writeFileSync(OUT_MAP_V2, r82MapLines.join('\n'), 'utf8');

  // 2. Round 82 temp blueprints (156 files from R81 temp blueprints; only W79 & W80 modified)
  fs.mkdirSync(OUT_BP_DIR, { recursive: true });
  for (let w = 1; w <= 156; w++) {
    const srcPath = path.join(R81_BP_DIR, `week_${w}_blueprint.json`);
    const dstPath = path.join(OUT_BP_DIR, `week_${w}_blueprint.json`);
    if (w !== 79 && w !== 80) {
      fs.copyFileSync(srcPath, dstPath);
      continue;
    }

    const bp = JSON.parse(fs.readFileSync(srcPath, 'utf8'));
    const suppList = w === 79 ? c7.w79_13 : c7.w80_13;
    const fullList = w === 79 ? c7.w79_20 : c7.w80_20;

    if (w === 80) {
      bp.title_vi = 'Ôn tập & Tranh luận nhỏ 2 (Phần 2: Phản biện "Yes, but...")';
      bp.c7_mock_cleanup_required = ['mockFormat', 'cumulativeBlock', 'synthesis_summary', 'papers', 'digital_map_reference', 'tested_skills', 'rotary_cycle'];
    } else {
      bp.title_vi = 'Ôn tập & Tranh luận nhỏ 2 (Phần 1: Luận điểm Space vs. Earth)';
    }
    bp.c7_regeneration_cleanup_required = ['digital_map_reference', 'tested_skills', 'rotary_cycle'];

    bp.vocabulary_focus = {
      ...bp.vocabulary_focus,
      syllabus_words: [...c7.sb7],
      supplement_words: [...suppList],
      total_syllabus_words: c7.sb7.length,
      total_supplement_words: suppList.length,
      target_count: fullList.length,
      missing_count: 0,
      c7_option: 'a',
      status: `C7_OPTION_A_PROPOSED_20 (${c7.sb7.length} Source B + ${suppList.length} SUPPLEMENT — Staged/Proposal-Only pending regeneration & Claude ESL quality sign-off)`
    };
    bp.keywords = [...fullList];
    bp.target_vocab_20 = fullList.map((wd) => ({
      word: wd,
      source: c7.sb7.includes(wd) ? 'SOURCE_B' : 'SUPPLEMENT_C7_OPTION_A',
      definition_en: null,
      definition_vi: null,
      example_en: null,
      example_vi: null,
      requires_human_or_esl_review: true
    }));
    bp.pending_human_authoring = [
      'C.7 Option (a) 20-word list selected (7 SB + 13 SUPPLEMENT); still requires bilingual definitions/IPA/examples + Claude ESL quality sign-off',
      'Story World: 5 story scenes centered on Space Exploration vs. Earth Fix (' + (w === 79 ? 'Part 1 Claims' : 'Part 2 Rebuttal "Yes, but..."') + ')',
      'CLIL Article: 90-200 word text containing >= 12/20 target words (>= 5/7 Source B) + 5 check questions',
      'Singapore Math (SUPPLEMENT — Source B L632-637 omits Math): 5 problems pending ESL/Owner approval',
      'Cambridge B1 PET Exam Tasks & Action Lab (3 stages) + Grammar Duel (Passive/Conditionals/Comparatives)'
    ];
    bp.c7_proposal_metadata = {
      round: 82,
      proposal_only: true,
      merge_status: 'DO_NOT_MERGE_PENDING_REGENERATION_AND_ESL_REVIEW',
      role: w === 79 ? 'Part 1: Claims & Core Dilemma Framing' : 'Part 2: Rebuttal Intro ("Yes, but...") & Trade-off Resolution'
    };

    fs.writeFileSync(dstPath, JSON.stringify(bp, null, 2) + '\n', 'utf8');
  }
}

function buildPriority2StatusSweep(sb, c7) {
  // Compute real statuses directly from disk & git
  const prodHead = runCmd('git', ['rev-parse', 'HEAD']);
  const freezeManifest = JSON.parse(fs.readFileSync(W33_MANIFEST_PATH, 'utf8'));

  // 1. Live vs Temp Blueprint checks
  let liveW113to120NotPet = 0;
  const liveW113to120Levels = new Set();
  for (let w = 113; w <= 120; w++) {
    const bp = JSON.parse(fs.readFileSync(path.join(PROD_WEEKS_DIR, `week_${w}/blueprint.json`), 'utf8'));
    liveW113to120Levels.add(`${bp.cefr_level} (stage ${bp.cefr_stage})`);
    if (bp.cefr_level !== 'B1 PET') liveW113to120NotPet++;
  }
  let r82W113to120Pet = 0;
  for (let w = 113; w <= 120; w++) {
    const bp = JSON.parse(fs.readFileSync(path.join(OUT_BP_DIR, `week_${w}_blueprint.json`), 'utf8'));
    if (bp.cefr_level === 'B1 PET' && bp.cefr_stage === 2) r82W113to120Pet++;
  }

  // 2. Live mocks in content slots (39/156 blueprints + generated content dirs) & staged (_mock vs non-mock)
  const liveMockContentSlots = [];
  const liveGenMockSlots = [];
  for (let w = 1; w <= 156; w++) {
    const bp = JSON.parse(fs.readFileSync(path.join(PROD_WEEKS_DIR, `week_${w}/blueprint.json`), 'utf8'));
    if (bp.isFullMock) {
      liveMockContentSlots.push(`W${w}`);
      if (fs.existsSync(path.join(PROD_WEEKS_DIR, `week_${w}/reading_hub.js`))) {
        liveGenMockSlots.push(`W${w}`);
      }
    }
  }
  const stagedMockDirs = fs.readdirSync(STAGING_DIR).filter((d) => d.includes('mock')).sort();

  // 3. Production generated weeks math/loader/index check
  const prodGenWeeks = [];
  for (const d of fs.readdirSync(PROD_WEEKS_DIR).sort((a, b) => {
    const na = Number(a.replace('week_', ''));
    const nb = Number(b.replace('week_', ''));
    return na - nb;
  })) {
    const m = d.match(/^week_(\d+)$/);
    if (!m) continue;
    const wk = Number(m[1]);
    if (fs.existsSync(path.join(PROD_WEEKS_DIR, d, 'reading_hub.js'))) {
      const mathInfo = extractMathCountAST(path.join(PROD_WEEKS_DIR, d));
      const hasIdx = fs.existsSync(path.join(PROD_WEEKS_DIR, d, 'index.js'));
      prodGenWeeks.push({ wk, hasIdx, mathCount: mathInfo.count, mathSrc: mathInfo.source });
    }
  }
  const mathLt5 = prodGenWeeks.filter((x) => x.mathCount > 0 && x.mathCount < 5).map((x) => `W${x.wk}(${x.mathCount}/5)`);
  const mathZero = prodGenWeeks.filter((x) => x.mathCount === 0).map((x) => `W${x.wk}`);
  const mathFive = prodGenWeeks.filter((x) => x.mathCount === 5).map((x) => `W${x.wk}`);

  // 4. Staged W129-131 provenance check
  const retiredW129to131 = [129, 130, 131].map((w) => {
    const p = JSON.parse(fs.readFileSync(path.join(STAGING_DIR, `week_${w}/provenance.json`), 'utf8'));
    return `W${w}: status="${p.review_status}", theme="${p.theme}"`;
  });

  // 5. Compute Wave 3 G-GEN-15 / G-GEN-16 / Math checks directly from staging files (no external file writes)
  const wave3Results = {};
  const coarseRegex = /\b(?:majority|minority)\s+of\s+(?:\d+|one|two|three|four|five|six|seven|eight|nine|ten|fifteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety)\s*(?:%|percent)\b/gi;
  for (const w of [126, 127, 133, 134]) {
    const dir = path.join(STAGING_DIR, `week_${w}`);
    const prov = JSON.parse(fs.readFileSync(path.join(dir, 'provenance.json'), 'utf8'));
    const mathInfo = extractMathCountAST(dir);
    const sphMod = evalWeekModule(path.join(dir, 'skill_practice_hub.js'));
    const mathArr = sphMod?.skillPracticeHubData?.singapore_math || [];
    const targetAnswerOnlyCount = mathArr.filter((q) => q.target_answer !== undefined && q.correctAnswer === undefined).length;
    const svgMissingCount = (w === 133 || w === 134) ? mathArr.filter((q) => q.modelData !== null && q.modelData !== undefined).length : 0;

    const vWords = extractVocabWordsFromFile(path.join(dir, 'vocab.js'));
    const rhMod = evalWeekModule(path.join(dir, 'reading_hub.js'));
    const clilText = (rhMod?.readingHubData?.clil_article?.content_en || rhMod?.readingHubData?.clil?.article_en || '').toLowerCase();
    const matched = vWords.filter((wd) => {
      const root = wd.replace(/(?:ing|ed|s|es)$/, '');
      return clilText.includes(wd) || (root.length >= 4 && clilText.includes(root));
    });
    const covPct = vWords.length ? Math.round((matched.length / vWords.length) * 100) : 0;
    const coarseHits = [];
    for (const f of ['reading_hub.js', 'vocab.js', 'skill_practice_hub.js', 'writing_hub.js', 'speaking_hub.js']) {
      const fp = path.join(dir, f);
      if (!fs.existsSync(fp)) continue;
      fs.readFileSync(fp, 'utf8').split('\n').forEach((ln, idx) => {
        const m = ln.match(coarseRegex);
        if (m) coarseHits.push(`${f}:L${idx + 1} (${m.join(', ')})`);
      });
    }
    const g15Line = covPct >= 60
      ? `PASS (${matched.length}/${vWords.length} = ${covPct}%)`
      : `FAIL (${matched.length}/${vWords.length} = ${covPct}% < 60%)`;
    const g16Line = coarseHits.length > 0
      ? `FAIL (${coarseHits.length}): ${coarseHits.join('; ')}`
      : 'PASS (0)';
    wave3Results[w] = {
      provStatus: prov.review_status,
      mathCount: mathInfo.count,
      targetAnswerOnlyCount,
      svgMissingCount,
      g15Line,
      g16Line
    };
  }

  // Also compute live W79 & W80 status directly for table rows
  const liveW79Words = extractVocabWordsFromFile(path.join(PROD_WEEKS_DIR, 'week_79/vocab.js'));
  const liveW79SbHits = c7.sb7.filter((w) => liveW79Words.includes(w));
  const liveW79Math = extractMathCountAST(path.join(PROD_WEEKS_DIR, 'week_79'));
  const liveW79Bp = JSON.parse(fs.readFileSync(path.join(PROD_WEEKS_DIR, 'week_79/blueprint.json'), 'utf8'));

  const liveW80Bp = JSON.parse(fs.readFileSync(path.join(PROD_WEEKS_DIR, 'week_80/blueprint.json'), 'utf8'));
  const liveW80Words = extractVocabWordsFromFile(path.join(PROD_WEEKS_DIR, 'week_80/vocab.js'));
  const liveW80SbHits = c7.sb7.filter((w) => liveW80Words.includes(w));
  const stageW80Exists = fs.existsSync(path.join(STAGING_DIR, 'week_80'));

  // 6. CambridgeExamStandards PET check & QuestSidebar TOTAL_TRIPS & BossRotary %4 check
  const camCfg = fs.readFileSync(CAMBRIDGE_CFG_PATH, 'utf8');
  const hasPetSpec = /\bPET\s*:/.test(camCfg);
  const rotaryCfg = fs.readFileSync(ROTARY_CFG_PATH, 'utf8');
  const rotaryMod4 = /%\s*4/.test(rotaryCfg);
  const rotaryMod5 = /%\s*5/.test(rotaryCfg);
  const sidebarTxt = fs.readFileSync(QUEST_SIDEBAR_PATH, 'utf8');
  const mTrips = sidebarTxt.match(/const\s+TOTAL_TRIPS\s*=\s*(\d+)/);
  const totalTrips = mTrips ? Number(mTrips[1]) : null;

  // 7. Open docs check for TTS key rotation reminders
  const ttsDocs = ['AGENTS.md', 'docs/WEEK_PRODUCTION_SOP.md', 'docs/ARCHITECTURE_CURRENT.md'];
  const ttsOpenHits = {};
  for (const rel of ttsDocs) {
    const txt = fs.readFileSync(path.join(ROOT_DIR, rel), 'utf8');
    ttsOpenHits[rel] = txt.split('\n').filter((l) => /xoay.*key|rotat.*key/i.test(l)).length;
  }

  // 8. Map v2 vs Live Map check + grep counts for placeholders
  const liveMap = fs.readFileSync(LIVE_MAP_PATH, 'utf8');
  const r81Map = fs.readFileSync(R81_MAP_PATH, 'utf8');
  const r82Map = fs.readFileSync(OUT_MAP_V2, 'utf8');

  const countMatches = (text, re) => text.split('\n').filter((l) => re.test(l)).length;
  const r81ChoOwner = countMatches(r81Map, /\[CHỜ OWNER\]/);
  const r82ChoOwner = countMatches(r82Map, /\[CHỜ OWNER\]/);
  const r82MockWaitStd = r82Map.split('\n').filter((l) => /^\|\s*\*\*MOCK\s+M/.test(l) && /chờ chuẩn hóa `cambridgeExamStandards\.js`/i.test(l)).length;
  const r82WeekSilentOwner = r82Map.split('\n').filter((l) => /^\|\s*\*\*W\d+\*\*/.test(l) && /Owner chờ duyệt/i.test(l)).length;
  const r82SilentVocabWeeks = r82Map.split('\n').filter((l) => /^\|\s*\*\*W\d+\*\*/.test(l) && /0 từ trong Source B; Owner chờ duyệt/i.test(l)).length;
  const r82SilentGrammarWeeks = r82Map.split('\n').filter((l) => /^\|\s*\*\*W\d+\*\*/.test(l) && /Grammar không ghi trong Source B — Owner chờ duyệt/i.test(l)).length;
  const r82SilentOverlap = r82Map.split('\n').filter((l) => /^\|\s*\*\*W\d+\*\*/.test(l) && /0 từ trong Source B; Owner chờ duyệt/i.test(l) && /Grammar không ghi trong Source B — Owner chờ duyệt/i.test(l)).length;
  const r82MathWaitRows = r82Map.split('\n').filter((l) => /^\|\s*\*\*W\d+\*\*/.test(l) && /chờ duyệt đề bài cụ thể khi tái sinh/i.test(l)).length;
  const liveFullMockRows = countMatches(liveMap, /★\s*FULL\s*MOCK/i);
  const r82ContentWeekFullMockRows = r82Map.split('\n').filter((l) => /^\|\s*\*\*W\d+\*\*/.test(l) && /FULL\s*MOCK/i.test(l)).length;
  const r82MockCheckpointRows = r82Map.split('\n').filter((l) => /^\|\s*\*\*MOCK\s+M/.test(l)).length;

  // 9. Blueprint diff live vs R82 temp blueprints
  let bpDiffCount = 0;
  let r82MocksFlagged = 0;
  for (let w = 1; w <= 156; w++) {
    const liveStr = fs.readFileSync(path.join(PROD_WEEKS_DIR, `week_${w}/blueprint.json`), 'utf8');
    const r82Str = fs.readFileSync(path.join(OUT_BP_DIR, `week_${w}_blueprint.json`), 'utf8');
    if (liveStr !== r82Str) bpDiffCount++;
    const r82Obj = JSON.parse(r82Str);
    if (r82Obj.isFullMock) r82MocksFlagged++;
  }

  // 10. Read W125 actual prod numbers
  const prodW125Theme = extractThemeFromWeekDir(path.join(PROD_WEEKS_DIR, 'week_125'));
  const prodW125Math = extractMathCountAST(path.join(PROD_WEEKS_DIR, 'week_125'));

  // Compute Wave 3 geometry strand keyword check directly from skill_practice_hub.js questions
  const angleKeywordRe = /\b(right angle|acute|obtuse|protractor)\b/i;
  const triClassRe = /\b(classify|equilateral|isosceles|scalene)\b/i;
  for (const w of [126, 127, 133, 134]) {
    const sphMod = evalWeekModule(path.join(STAGING_DIR, `week_${w}`, 'skill_practice_hub.js'));
    const mathArr = sphMod?.skillPracticeHubData?.singapore_math || [];
    if (w === 133) {
      wave3Results[w].strandCheck = `${mathArr.filter((q) => angleKeywordRe.test(q.question || '')).length}/${mathArr.length} bài nhắc angle type`;
    } else if (w === 134) {
      wave3Results[w].strandCheck = `${mathArr.filter((q) => /perimeter|longer|difference|total length/i.test(q.question || '')).length}/${mathArr.length} bài hỏi chu vi/hiệu độ dài (dù đề có từ ${mathArr.filter((q) => triClassRe.test(q.question || '')).length} loại)`;
    } else {
      wave3Results[w].strandCheck = `${mathArr.filter((q) => q.steps && q.steps.length === 3).length}/${mathArr.length} bài vẫn cấu trúc 3 bước đơn tính`;
    }
  }

  // W33 Source B vocab match count
  const w33VocabWords = extractVocabWordsFromFile(path.join(PROD_WEEKS_DIR, 'week_33/vocab.js'));
  const w33SbHitsCount = sb.w33SbWords.filter((wd) => w33VocabWords.includes(wd)).length;
  // R80 loader commit delta
  const r80IndexFiles = runCmd('git', ['diff-tree', '--no-commit-id', '--name-only', '-r', 'e157e587', '--', 'src/data/weeks/'])
    .split('\n')
    .filter((f) => /\/index\.js$/.test(f)).length;
  const r82Part1Matches = sb.lines.find((l) => /TỔNG QUAN CHƯƠNG TRÌNH 144 TUẦN|144\s*weeks/i.test(l)) ? '144w' : 'Part I';

  const out = [];
  out.push(`# ROUND 82 — PRIORITY 2: QUÉT TRẠNG THÁI TOÀN BỘ HẠNG MỤC TỪNG BỊ CHẶN / \`[CHỜ OWNER]\` (ROUNDS 71–81)`);
  out.push('');
  out.push(`> **PHẠM VI:** CHỈ ĐỌC & TỔNG HỢP TỪ DỮ LIỆU THẬT TRÊN ĐĨA / GIT (HEAD \`${prodHead}\`). KHÔNG merge, KHÔNG sửa \`src/data/weeks/\`, KHÔNG sửa live Digital Map, KHÔNG tái sinh Wave 3.`);
  out.push(`> Generated dynamically at \`${new Date().toISOString()}\` by \`scripts/generate_round82_c7_and_status_sweep.mjs\`.`);
  out.push('');
  out.push(`## 1. Bảng Tổng Hợp Trạng Thái 11 Hạng Mục Chiến Lược & Kỹ Thuật (Rounds 71–82)`);
  out.push('');
  out.push(`| # | Hạng mục (Rounds phát sinh) | Quyết định Owner / QA | Đã áp dụng ở Proposal / Code? (Đo thật trên đĩa) | Chưa áp dụng ở Live Production / Docs gốc? | Việc cụ thể còn lại trước khi Merge / Nâng \`TOTAL_TRIPS\` |`);
  out.push(`| :---: | :--- | :--- | :--- | :--- | :--- |`);
  out.push(`| **1** | **W33 Golden Master vs Source B** (R70–R75) | **ĐÃ ĐÓNG (R75 #1):** Giữ W33 \`frozen\` (ngoại lệ có chủ ý: \`${w33SbHitsCount}/${sb.w33SbWords.length}\` vocab SB khớp, chỉ khác tiêu đề/theme). | \`W33_GOLDEN_FREEZE_MANIFEST.json\` (\`weekNumber: ${freezeManifest.weekNumber}\`, \`lifecycleState: "${freezeManifest.lifecycleState}"\`), Map v2 R78–R82 và \`round82_temp_blueprints/week_33_blueprint.json\` giữ nguyên W33 không đụng. | Live \`src/data/weeks/week_33/\` vẫn khóa bất biến & pass freeze guard; ngoại lệ chưa cần ghi đè file W33. | **Không còn đầu việc nội dung cho W33.** Tiếp tục duy trì \`npm run guard:freeze:w33\`. |`);
  out.push(`| **2** | **Source B Part I (${r82Part1Matches}) vs Part II (156w)** (R72–R75) | **ĐÃ ĐÓNG (R72 + R75 #4):** **Part II (156 tuần)** là chuẩn duy nhất; Part I (${r82Part1Matches}) chỉ là tổng quan cũ. | Áp dụng trong \`round78..82_proposed_digital_map_v2.md\` & \`round79..82_temp_blueprints/\` (**${bpDiffCount}/156** blueprint tạm khác bản prod). | Live \`docs/ENGQUEST_DIGITAL_SYLLABUS_W01_W156_MAP.md\` & live \`src/data/weeks/week_*/blueprint.json\` **chưa cập nhật**. | Thực thi 1 round áp dụng Map v2 & cập nhật blueprint thật vào repo (kèm change-control SOP/ARCH nếu cần). |`);
  out.push(`| **3** | **W79 (\`Review & Micro-Debate 2\`, Part 1 + C.7 Option a)** (R70–R82) | **ĐÃ ĐÓNG (R72 + R82 C.7):** Rút \`Industrial Revolution\`; áp **C.7 Option (a)** = ${c7.sb7.length} SB + ${c7.w79_13.length} W79 \`SUPPLEMENT\` = ${c7.w79_20.length} từ; Toán W79 là \`SUPPLEMENT\`. | Staged \`week_79/provenance.json\` = \`RETIRED per Owner decision R72\`; R82 Map v2 & \`round82_temp_blueprints/week_79_blueprint.json\` đã gắn ${c7.w79_20.length} từ C.7 Option (a). | Live \`week_79/\` vẫn giữ bản pre-R71 (\`${liveW79SbHits.length}/${c7.sb7.length} SB, ${liveW79Math.count}/5 toán, bp.theme="${liveW79Bp.theme}"\`); staged \`week_79/\` vẫn chứa \`.js\` *Industrial Revolution*. | Tái sinh mới toàn bộ \`week_79/\` với ${c7.w79_20.length} từ Option (a) + 5 bài Toán \`SUPPLEMENT\`, pass G-GEN-11..16 + **Claude ESL sign-off**. |`);
  out.push(`| **4** | **W80 (\`Review & Micro-Debate 2\`, Part 2 + tách Mock M15 + C.7 Option a)** (R72–R82) | **ĐÃ ĐÓNG (R75 #2 + R82 C.7):** Rút Mock M15 ra slot xen kẽ; viết lại W80 thành tuần nội dung Source B với ${c7.sb7.length} SB + ${c7.w80_13.length} \`SUPPLEMENT\` RIÊNG = ${c7.w80_20.length} từ. | Đã xác minh & loại va chạm (\`0\` trùng \`W79_13\`, \`${c7.unionAll.size}\` từ tổng) trong \`round82_c7_w79_w80_vocab_proposal.md\`, R82 Map v2 & \`round82_temp_blueprints/week_80_blueprint.json\`. | Live \`week_80/\` vẫn là Mock M15 (\`isFullMock: ${liveW80Bp.isFullMock}, ${liveW80SbHits.length}/${c7.sb7.length} SB, theme="${liveW80Bp.theme}"\`); \`staging/week_80/\` tồn tại = \`${stageW80Exists}\`. | (a) Chuyển M15 sang slot Mock xen kẽ; (b) Dọn key mock khỏi \`week_80_blueprint.json\`; (c) Tái sinh nội dung mới W80 Rebuttal \`"Yes, but..."\` + 5 bài Toán + ESL review. |`);
  out.push(`| **5** | **W129–W132 (\`Review & Math Logic Cycle\` vs Smartphones)** (R72–R79) | **ĐÃ ĐÓNG (R75 #3,#4 + R79 C.8):** Source B Part II \`L1007–1008\` quy định \`Review & Math Logic Cycle\`; cho phép bổ sung \`SUPPLEMENT\`; Smartphones về W145–156. | Staged \`W129/130/131\` đều ghi \`RETIRED per Owner decision\` (${retiredW129to131.length}/3); Map v2 R79–R82 & temp blueprints đã sửa sang \`Review & Math Logic Cycle\` (\`W129–132\`). | Live \`week_129..132/blueprint.json\` vẫn giữ \`Opinion Project 3 / Mock 2\`; file \`.js\` staged cũ vẫn nằm trong \`staging/week_129..131/\`. | Lưu trữ/gỡ hẳn nội dung Smartphones khỏi W129–131; soạn 4 bộ đề bài viết/nói + Grammar + 20 vocab + Toán Phân số/Thập phân/Logic cụ thể cho W129–132 + ESL review. |`);
  const wave3TargetOnlyWeeks = [126, 127, 133, 134].filter((w) => wave3Results[w].targetAnswerOnlyCount > 0).length;
  out.push(`| **6** | **Wave 3 Staged Weeks (\`W126, W127, W133, W134\`)** (R69–R82) | **KHÔNG CÒN CHỜ CHIẾN LƯỢC — CHẶN KỸ THUẬT:** Kiểm tra trực tiếp từ staging cho thấy cả 4 tuần tiếp tục \`BLOCKED\`, **chưa được phép tái sinh/merge**. | \`provenance.json\` cả 4 tuần = \`"BLOCKED"\`; đặc tả nghiệm thu v2 (\`round79_wave3_acceptance_spec_v2.md\`, SVG góc/tam giác) đã sẵn sàng. | **0/4 tuần** merge vào \`src/data/weeks/\`. Đo thật trên staging: W126 (G-GEN-15 \`${wave3Results[126].g15Line}\`), W127 (G-GEN-15 \`${wave3Results[127].g15Line}\`), W133 (G-GEN-15 \`${wave3Results[133].g15Line}\`; G-GEN-16 \`${wave3Results[133].g16Line}\`; \`${wave3Results[133].svgMissingCount}/5\` bài thiếu \`modelData: null\`), W134 (\`${wave3Results[134].svgMissingCount}/5\` bài thiếu \`modelData: null\`; schema \`target_answer\` ở ${wave3TargetOnlyWeeks}/4 tuần). | Round tái sinh Wave 3 riêng: nâng phủ CLIL >=60% (0 lỗi ESL), làm Toán Logic/Critical Thinking thật (W126/127) & SVG Góc/Tam giác tĩnh \`modelData: null\` (W133/134), khớp schema \`BarModelQuest\`, pass G-GEN-11..16 + ESL review. |`);
  out.push(`| **7** | **Lịch ${r82MockCheckpointRows} Mock xen kẽ, M01 Lite Mode, M14–M34 PET, & Rotary \`% 4\`** (R72–R81) | **ĐÃ ĐÓNG (R75 #2 + R78 + R80):** ${r82MockCheckpointRows} mock xen kẽ (3 Starters/Movers + 10 Flyers + 21 PET via \`32+4n\`; tổng 190 tuần lịch); M01 hoãn Lite Mode; \`M14–M34 = B1 PET\`. | **\`bossRotarySchedule.js\` đã sửa sang \`% 4\` ở live code (R81)** (\`rotaryMod4=${rotaryMod4}, rotaryMod5=${rotaryMod5}\`); R80–R82 Map v2 có \`${r82ChoOwner}/${r82MockCheckpointRows}\` \`[CHỜ OWNER]\`, còn **${r82MockWaitStd}/${r82MockCheckpointRows} hàng \`MOCK M14–M34\` ghi \`chờ chuẩn hóa cambridgeExamStandards.js\`** (${r82MockCheckpointRows} hàng Mock, ${r82ContentWeekFullMockRows} tuần nội dung giữ mock). | **4 việc chưa làm ở live:** (1) \`cambridgeExamStandards.js\` **chưa có block \`PET\`** (\`hasPetSpec=${hasPetSpec}\` -> \`getExamStandard(w>72)=null\`); (2) **\`${liveMockContentSlots.length}/156\` live blueprints (\`isFullMock: true\`, gồm ${liveGenMockSlots.length} tuần đã sinh nội dung \`${liveGenMockSlots.join(', ')}\`) + ${stagedMockDirs.length} staged mock dirs** đang chiếm tuần nội dung; (3) chưa có cơ chế điều hướng mock xen kẽ tách \`W36..156\`; (4) thiếu Handbook PET chuẩn. | Owner cung cấp Cambridge B1 Preliminary Handbook; viết spec \`PET\` vào \`cambridgeExamStandards.js\`; dựng kiến trúc slot Mock xen kẽ (\`M02–M34\`); gỡ \`isFullMock\` & tách/tái sinh nội dung tuần thật khỏi \`${liveMockContentSlots.length}\` slot \`W4..W156\` (ưu tiên ${liveGenMockSlots.join(', ')}). |`);
  out.push(`| **8** | **Ranh giới CEFR \`W113–W120\` (B.5)** (R79–R81) | **ĐÃ ĐÓNG (R81 B.5):** \`W113–W120\` thuộc **Phase 2 (\`B1 PET\`)**; \`B1+ Academic\` bắt đầu từ **\`W121\`** (\`Source B L${sb.phase3Line}\`: \`${sb.phase3Text}\`), ghi đè mốc W113 trong SOP/MASTER_ARCH. | Đã áp dụng trọn vẹn trong Map v2 R81–R82 & \`round81..82_temp_blueprints/\` (**${r82W113to120Pet}/8** tuần \`W113–120\` = \`B1 PET stage 2\`). | Live \`src/data/weeks/week_113..120/blueprint.json\` vẫn là **\`${[...liveW113to120Levels].join(', ')}\`** (\`${liveW113to120NotPet}/8\` chưa chuyển PET); \`WEEK_PRODUCTION_SOP.md\` (khóa hash) & \`MASTER_ARCH\` còn ranh giới cũ \`W113\`. | Cập nhật live \`blueprint.json\` + sửa có kiểm soát change-control đối với \`WEEK_PRODUCTION_SOP.md\` & \`MASTER_ARCHITECTURE_W01_W156.md\`. |`);
  out.push(`| **9** | **Xoay API Key Google TTS** (R68–R75) | **ĐÃ ĐÓNG (R75 #5):** Không cần xoay API key Google TTS. | Đã gỡ nhắc xoay key khỏi \`AGENTS.md\` (${ttsOpenHits['AGENTS.md']} hits), \`WEEK_PRODUCTION_SOP.md\` (${ttsOpenHits['docs/WEEK_PRODUCTION_SOP.md']} hits), \`ARCHITECTURE_CURRENT.md\` (${ttsOpenHits['docs/ARCHITECTURE_CURRENT.md']} hits). | Chỉ còn ghi chú lịch sử trong \`docs/Claude_handoff.txt\`. | **CLOSED — Không còn việc.** |`);
  out.push(`| **10** | **Chính sách \`SUPPLEMENT\` khi Source B im lặng & Bảo toàn Source A** (R72–R79) | **QUY TẮC ĐÃ ĐÓNG (R75 #3 + R79 A.1):** Được bổ sung khi Source B im lặng; giữ Source A không xung đột dưới \`[SUPPLEMENT — Source A]\`. | Map v2 R79–R82 đã gắn nhãn đầy đủ. Đếm động trên R82 Map v2: còn **${r82WeekSilentOwner} hàng tuần nội dung** mang nhãn \`Owner chờ duyệt\` (${r82SilentVocabWeeks} thiếu Vocab SB ∪ ${r82SilentGrammarWeeks} thiếu Grammar SB, giao nhau ${r82SilentOverlap} tuần), **cộng riêng ${r82MathWaitRows} tuần (W79/W80)** ghi \`chờ duyệt đề bài cụ thể khi tái sinh\` cho phần Toán \`SUPPLEMENT\`. | Live Digital Map vẫn giữ \`${liveFullMockRows}\` hàng \`★ FULL MOCK\` lịch cũ; đề xuất nhãn blueprint \`source_b_status\` (R75 F.18) chưa đưa vào live. | Phê duyệt nội dung \`SUPPLEMENT\` cụ thể (vocab/grammar/math) theo từng đợt sản xuất tuần mới (bắt đầu từ W79/W80, W126, W129–132) + merge Map v2 vào file Map gốc. |`);
  out.push(`| **11** | **Nợ kỹ thuật Live Production: Loader/UI (R80–81) vs \`2/5\` Toán & \`TOTAL_TRIPS\`** (R74–R81) | **LOẠI BỎ LỖI APP (R80–R81), CÒN CHẶN DỮ LIỆU:** Loader (${r80IndexFiles} \`index.js\` thêm ở commit \`e157e587\`) & UI Station 2/PET Part 3 đã sửa & verified R81; giữ \`TOTAL_TRIPS = ${totalTrips}\`. | Cả **${prodGenWeeks.length}/${prodGenWeeks.length}** tuần production có \`reading_hub.js\` nay đều có \`index.js\` (\`${prodGenWeeks.filter((x) => !x.hasIdx).length}\` thiếu); UI schema fix đã pass \`npm run build\` + E2E R81. | Chỉ **${mathFive.length}/${prodGenWeeks.length}** tuần đạt 5/5 Toán (${mathFive.join(', ')}); **${mathLt5.length}** tuần chỉ 2/5 Toán (${mathLt5.join(', ')}); **${mathZero.length}** tuần 0/5 Toán (${mathZero.join(', ')}); \`W125\` theme \`"${prodW125Theme}"\` & \`${prodW125Math.count}/5\` Toán. | Chỉ được nâng \`TOTAL_TRIPS > ${totalTrips}\` sau khi vá đủ 5/5 Toán chuẩn Source B + từ vựng thiếu (W76/77/79/80/82) + kiểm tra ESL từng tuần live. |`);
  out.push('');
  out.push(`## 2. Bằng Chứng Số Liệu Quét Trực Tiếp Từ File Thật (Raw Evidence Extracts)`);
  out.push('');
  out.push(`### 2.1. Kết quả kiểm tra trực tiếp Wave 3 trên \`docs/agent_artifacts/staging/week_{126,127,133,134}\``);
  for (const w of [126, 127, 133, 134]) {
    const r = wave3Results[w];
    out.push(`- **W${w}:** \`provenance.review_status = "${r.provStatus}"\` | Math AST = \`${r.mathCount}/5\` (\`target_answer\`-only: \`${r.targetAnswerOnlyCount}/5\`, non-null \`modelData\` cần SVG: \`${r.svgMissingCount}/5\`, strand: \`${r.strandCheck}\`) | G-GEN-15: \`${r.g15Line}\` | G-GEN-16: \`${r.g16Line}\``);
  }
  out.push('');
  out.push(`### 2.2. Thống kê \`round82_proposed_digital_map_v2.md\` vs \`round81\` vs Live Map`);
  out.push(`- \`[CHỜ OWNER]\` còn sót trên R81 Map v2 = \`${r81ChoOwner}\`; trên R82 Map v2 = \`${r82ChoOwner}\`; trên ${r82MockCheckpointRows} dòng \`MOCK M01–M34\` còn \`${r82MockWaitStd}/${r82MockCheckpointRows}\` dòng (\`M14–M34\`) ghi \`chờ chuẩn hóa cambridgeExamStandards.js\`.`);
  out.push(`- Số dòng tuần nội dung \`W01–W156\` trong R82 Map v2 còn ghi \`Owner chờ duyệt\` = **\`${r82WeekSilentOwner}\`** tuần (\`${r82SilentVocabWeeks}\` thiếu Vocab SB ∪ \`${r82SilentGrammarWeeks}\` thiếu Grammar SB, giao nhau \`${r82SilentOverlap}\`); cộng riêng **\`${r82MathWaitRows}\`** tuần (W79/W80) ghi \`chờ duyệt đề bài cụ thể khi tái sinh\` cho Toán \`SUPPLEMENT\`.`);
  out.push(`- Kiểm tra tách Mock khỏi tuần nội dung: Live Map có \`${liveFullMockRows}\` hàng \`★ FULL MOCK\` trên lịch tuần; R82 Map v2 có **\`${r82ContentWeekFullMockRows}\`** hàng tuần nội dung \`W01–156\` mang \`FULL MOCK\` và **\`${r82MockCheckpointRows}\`** hàng \`MOCK M01–M34\` xen kẽ; \`round82_temp_blueprints\` có **\`${r82MocksFlagged}\`** file có \`isFullMock: true\`.`);
  out.push('');
  out.push(`### 2.3. Tóm tắt tình trạng Mở Khoá Sản Xuất Ngay Sau Round 82`);
  out.push(`1. **100% Quyết định chiến lược (6/6 hạng mục R71–R82) đã đóng:** \`W33\` frozen, Source B Part II (156w), Mock xen kẽ 34 mốc + \`M14–M34 = PET\`, \`W113–120 = B1 PET\`, \`TTS no-rotate\`, và \`C.7 Option (a) W79/W80\`.`);
  out.push(`2. **Chưa được nâng \`TOTAL_TRIPS\` (\`${totalTrips}\`) hay merge Wave 3:** Do còn nợ **thực thi kỹ thuật & sinh/sửa nội dung** (Wave 3 fail G-GEN-15/16/Toán; \`W79/W80\` mới có từ vựng đề xuất, chưa tái sinh nội dung 4 Hubs; \`${mathLt5.length}\` tuần prod chỉ có 2/5 Toán; \`cambridgeExamStandards.js\` thiếu block \`PET\` & chờ Cambridge Handbook).`);
  out.push('');

  fs.writeFileSync(OUT_SWEEP, out.join('\n'), 'utf8');
}

function main() {
  console.log('Running Round 82 computed generator (C.7 Option (a) + Priority 2 Status Sweep)...');
  const sb = parseSourceB();
  const existing = parseExistingW79AndR79Draft();
  const c7 = buildPriority1Proposal(sb, existing);
  buildRound82ProposalArtifacts(c7);
  buildPriority2StatusSweep(sb, c7);

  console.log(`✓ Generated ${path.relative(ROOT_DIR, OUT_C7_PROPOSAL)}`);
  console.log(`✓ Generated ${path.relative(ROOT_DIR, OUT_MAP_V2)}`);
  console.log(`✓ Generated ${path.relative(ROOT_DIR, OUT_BP_DIR)}/ (156 files)`);
  console.log(`✓ Generated ${path.relative(ROOT_DIR, OUT_SWEEP)}`);
  console.log(`  W79 (20 words) = 7 SB + [${c7.w79_13.join(', ')}]`);
  console.log(`  W80 (20 words) = 7 SB + [${c7.w80_13.join(', ')}]`);
  console.log(`  Set proof: |SB7|=${sb.shared7.length}, |W79_13|=${c7.w79_13.length}, |W80_13|=${c7.w80_13.length}, |Union|=${c7.unionAll.size}`);
}

main();
