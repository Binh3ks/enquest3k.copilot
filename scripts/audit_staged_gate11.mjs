import fs from 'fs';
import path from 'path';
import vm from 'vm';

const ROOT_DIR = process.cwd();
const STAGING_DIR = path.join(ROOT_DIR, 'docs/agent_artifacts/staging');
const PROD_DIR = path.join(ROOT_DIR, 'src/data/weeks');
const TEMP_BP_DIR = path.join(ROOT_DIR, 'docs/agent_artifacts/temp_blueprints');
const SYLLABUS_FILE = path.join(ROOT_DIR, 'docs/1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt');

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

function getSourceBMathTopic(w) {
  if (!fs.existsSync(SYLLABUS_FILE)) return null;
  const txt = fs.readFileSync(SYLLABUS_FILE, 'utf8');
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
  if (w === 79) return { topic: "Representing Data" };
  return null;
}

function auditStagedWeek(w, useTempBaseline = true) {
  const stagedDir = path.join(STAGING_DIR, `week_${w}`);
  const rhPath = path.join(stagedDir, 'reading_hub.js');
  const shPath = path.join(stagedDir, 'skill_practice_hub.js');
  const bpPath = useTempBaseline 
    ? path.join(TEMP_BP_DIR, `week_${w}_blueprint.json`)
    : path.join(PROD_DIR, `week_${w}`, 'blueprint.json');

  if (!fs.existsSync(stagedDir)) {
    return { week: w, error: `Staged dir not found: ${stagedDir}` };
  }
  if (!fs.existsSync(rhPath)) {
    return { week: w, error: `Missing staged reading_hub.js: ${rhPath}` };
  }
  if (!fs.existsSync(bpPath)) {
    return { week: w, error: `Missing baseline blueprint.json: ${bpPath}` };
  }

  const bp = JSON.parse(fs.readFileSync(bpPath, 'utf8'));
  const rhData = parseHubFile(fs.readFileSync(rhPath, 'utf8'), 'readingHubData');
  const shData = fs.existsSync(shPath) ? parseHubFile(fs.readFileSync(shPath, 'utf8'), 'skillPracticeHubData') : null;
  const vData = rhData?.vocab || [];

  // Axis (i): Theme strict equality
  const bpTheme = (bp.theme || '').trim();
  const rhTheme = (rhData?.theme || '').trim();
  const normBp = bpTheme.toLowerCase().replace(/["']/g, '').replace(/\s+/g, ' ').trim();
  const normRh = rhTheme.toLowerCase().replace(/["']/g, '').replace(/\s+/g, ' ').trim();
  const axis1Pass = normBp === normRh && normBp.length > 0;

  // Axis (ii): CLIL topic keywords
  const bpClilTitle = bp.clil_topic?.title || '';
  const bpClilFocus = bp.clil_topic?.focus || '';
  const clilSearchText = `${rhData?.clil_article?.title_en || ''} ${rhData?.clil_article?.content_en || ''}`.toLowerCase();
  const stopWords = new Set(['and', 'the', 'for', 'with', 'from', 'into', 'about', 'practice', 'intro', 'module', 'unit', 'thế', 'giới', 'khoa', 'học', 'lịch', 'sử', 'dự', 'án']);
  const topicTokens = (bpClilTitle + ' ' + bpClilFocus)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length >= 3 && !stopWords.has(t));

  const matchedTokens = topicTokens.filter(t => clilSearchText.includes(t));
  const requiredMatches = topicTokens.length <= 1 ? topicTokens.length : Math.min(2, topicTokens.length);
  const axis2Pass = topicTokens.length === 0 ? true : (matchedTokens.length >= requiredMatches && requiredMatches > 0);

  // Axis (iii): Source B Math strand in >= 3/5 singapore_math
  const mathProblems = shData?.singapore_math || rhData?.singapore_math || [];
  const sourceBMath = getSourceBMathTopic(w);
  let axis3Pass = true;
  let axis3Detail = 'N/A (No Math Strand)';
  if (sourceBMath && sourceBMath.topic) {
    const mathTokens = sourceBMath.topic.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(t => t.length >= 3 && !['and', 'the', 'math', 'topic', 'problems'].includes(t));
    let matchCount = 0;
    for (const prob of mathProblems) {
      const pText = `${prob.title || ''} ${prob.problemText || ''}`.toLowerCase();
      if (mathTokens.some(t => pText.includes(t))) matchCount++;
    }
    axis3Pass = matchCount >= 3;
    axis3Detail = `${matchCount}/${mathProblems.length} matched ("${sourceBMath.topic}")`;
  }

  // Axis (iv): Syllabus words
  const syllabusWords = bp.vocabulary_focus?.syllabus_words || [];
  let axis4Pass = true;
  let axis4Detail = 'OK';
  if (syllabusWords.length === 0) {
    axis4Detail = '[NO_ANCHOR] 0/20 words';
  } else {
    const stagedWords = new Set((vData || []).map(v => (v.word || '').toLowerCase().trim()));
    const missing = syllabusWords.filter(sw => !stagedWords.has(sw.toLowerCase().trim()));
    axis4Pass = missing.length === 0;
    axis4Detail = missing.length === 0 ? `${syllabusWords.length}/${syllabusWords.length} OK` : `Missing: [${missing.join(', ')}]`;
  }

  const overallPass = axis1Pass && axis2Pass && axis3Pass && axis4Pass;

  return {
    week: w,
    bpTheme,
    rhTheme,
    axis1: axis1Pass ? 'PASS' : 'FAIL',
    axis2: axis2Pass ? 'PASS' : 'FAIL',
    axis3: axis3Pass ? 'PASS' : 'FAIL',
    axis3Detail,
    axis4: axis4Pass ? 'PASS' : 'FAIL',
    axis4Detail,
    overall: overallPass ? 'PASS' : 'FAIL'
  };
}

const weeksToAudit = [79, 126, 127, 129, 130, 131, 133, 134];

console.log('=== AUDIT AGAINST SOURCE B REVISED BASELINE (temp_blueprints) ===');
console.log('| Week | Axis (i) Theme Strict | Axis (ii) CLIL Grounding | Axis (iii) Math Strand | Axis (iv) Syllabus Vocab | Overall Gate 11 v2 | Recommendation |');
console.log('| :---: | :---: | :---: | :---: | :---: | :---: | :---: |');

for (const w of weeksToAudit) {
  const r = auditStagedWeek(w, true);
  if (r.error) {
    console.log(`| W${w} | ERROR: ${r.error} |`);
    continue;
  }
  const rec = r.overall === 'PASS' ? 'Keep / Ready' : 'DROP / RETIRE (Must Regenerate)';
  console.log(`| W${r.week} | ${r.axis1} (BP: "${r.bpTheme}" vs RH: "${r.rhTheme}") | ${r.axis2} | ${r.axis3} (${r.axis3Detail}) | ${r.axis4} (${r.axis4Detail}) | **${r.overall}** | ${rec} |`);
}
