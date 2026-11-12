import fs from 'fs';
import path from 'path';

const STAGING_DIR = path.resolve('docs/agent_artifacts/staging');
const OUT_FILE = path.resolve('docs/agent_artifacts/round83_wave3_gate_raw.txt');

const WEEKS = [
  { num: 126, sbWords: [], expectedMathStrand: 'Logic Puzzles', useStaticSvg: false },
  { num: 127, sbWords: ['disagree', 'counter', 'point', 'false', 'true'], expectedMathStrand: 'Critical Thinking Math', useStaticSvg: false },
  { num: 133, sbWords: ['statistic', 'percent', 'study', 'data', 'majority', 'minority', 'survey', 'population'], expectedMathStrand: 'Geometry: Angles', useStaticSvg: true },
  { num: 134, sbWords: ['fallacy', 'generalization', 'assumption', 'true', 'false', 'valid', 'invalid', 'logic'], expectedMathStrand: 'Geometry: Triangles', useStaticSvg: true },
];

const ESL_ANOMALY_PATTERNS = [
  { name: 'majority/minority + exact percent', regex: /\b(?:a\s+)?(?:small\s+|large\s+)?(?:majority|minority)\s+of\s+(?:seventy|sixty|eighty|ninety|fifty|forty|thirty|twenty|fifteen|ten|five|\d+)\s*(?:percent|%)/gi },
  { name: 'uncountable plural misuse', regex: /\b(?:datas|informations|advices|evidences|equipments)\b/gi },
  { name: 'double comparative/superlative', regex: /\b(?:more\s+better|most\s+best|more\s+easier)\b/gi },
  { name: 'preposition redundancy', regex: /\b(?:discuss\s+about|explain\s+about|according\s+to\s+me)\b/gi },
];

const BOILERPLATE_RE = /\b(?:TODO|TBD|FIXME|lorem\s+ipsum)\b|\[placeholder\]/i;
const VI_DIACRITICS_RE = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;

const lines = [];
const log = (s = '') => lines.push(s);

log('========================================================================');
log('ROUND 83 WAVE 3 STAGING GATE AUDIT (DYNAMIC COMPUTATION — ZERO LITERALS)');
log(`Generated: ${new Date().toISOString()}`);
log('========================================================================\n');

let overallPass = true;

for (const cfg of WEEKS) {
  const dir = path.join(STAGING_DIR, `week_${cfg.num}`);
  const rh = (await import(`${dir}/reading_hub.js?v=${Date.now()}`)).default;
  const vh = (await import(`${dir}/vocab.js?v=${Date.now()}`)).default;
  const sp = (await import(`${dir}/skill_practice_hub.js?v=${Date.now()}`)).default;
  const wr = (await import(`${dir}/writing_hub.js?v=${Date.now()}`)).default;
  const ls = (await import(`${dir}/listening_hub.js?v=${Date.now()}`)).default;
  const sk = (await import(`${dir}/speaking_hub.js?v=${Date.now()}`)).default;
  const prov = JSON.parse(fs.readFileSync(path.join(dir, 'provenance.json'), 'utf8'));

  log(`--- WEEK ${cfg.num} (${prov.theme}) [review_status=${prov.review_status}] ---`);

  // G-GEN-11: Theme & Source B fidelity
  const mathItems = sp.singapore_math || [];
  const g11Pass = Boolean(prov.theme && mathItems.length === 5);
  log(`  [G-GEN-11 Theme/Math Count]: ${g11Pass ? 'PASS' : 'FAIL'} (theme="${prov.theme}", mathItems=${mathItems.length}/5)`);

  // G-GEN-12: Structure, integer correctAnswer & problemText completeness
  const badMath = mathItems.filter((q) => {
    const text = q.problemText || q.question || '';
    return !text.trim() || !Number.isInteger(q.correctAnswer) || q.correctAnswer < 0;
  });
  const g12Pass = badMath.length === 0 && (rh.clil_article?.check_questions?.length || 0) >= 3;
  log(`  [G-GEN-12 Math/CLIL Schema]: ${g12Pass ? 'PASS' : 'FAIL'} (validMath=${mathItems.length - badMath.length}/5, clilQuestions=${rh.clil_article?.check_questions?.length || 0})`);

  // G-GEN-13: Vocabulary count & CLIL word count
  const vocabList = (vh.vocab || vh.vocabulary || vh || []).map((v) => String(v.word || v).toLowerCase());
  const clilText = String(rh.clil_article?.content_en || '');
  const clilWords = clilText.trim().split(/\s+/).filter(Boolean).length;
  const g13Pass = vocabList.length === 20 && clilWords >= 110;
  log(`  [G-GEN-13 Readability/Scope]: ${g13Pass ? 'PASS' : 'FAIL'} (vocabCount=${vocabList.length}, clilWords=${clilWords})`);

  // G-GEN-14: Zero Vietnamese leak in English fields & zero boilerplate
  const englishFields = [
    clilText,
    ...(rh.clil_article?.check_questions || []).map((q) => `${q.question_en} ${(q.options || []).join(' ')} ${q.answer}`),
    ...mathItems.map((q) => `${q.title} ${q.problemText} ${q.hintText} ${(q.steps || []).join(' ')}`),
  ];
  const viLeaks = englishFields.filter((t) => VI_DIACRITICS_RE.test(t));
  const boilerLeaks = englishFields.filter((t) => BOILERPLATE_RE.test(t));
  const g14Pass = viLeaks.length === 0 && boilerLeaks.length === 0;
  log(`  [G-GEN-14 Clean English/No Boilerplate]: ${g14Pass ? 'PASS' : 'FAIL'} (viLeaks=${viLeaks.length}, boilerplate=${boilerLeaks.length})`);

  // G-GEN-15: Vocabulary coverage in CLIL (>= 60% of 20 target words + SB coverage)
  const lowerClil = clilText.toLowerCase();
  const matched = [];
  const missing = [];
  for (const wd of vocabList) {
    const root = wd.replace(/(?:ing|ed|s|es)$/, '');
    if (lowerClil.includes(wd) || (root.length >= 4 && lowerClil.includes(root))) {
      matched.push(wd);
    } else {
      missing.push(wd);
    }
  }
  const pct = Math.round((matched.length / vocabList.length) * 100);
  const sbMatched = cfg.sbWords.filter((wd) => lowerClil.includes(wd));
  const sbPct = cfg.sbWords.length ? Math.round((sbMatched.length / cfg.sbWords.length) * 100) : 100;
  const g15Pass = pct >= 60 && sbPct >= 60;
  log(`  [G-GEN-15 Vocab Coverage in CLIL]: ${g15Pass ? 'PASS' : 'FAIL'} (${matched.length}/${vocabList.length} = ${pct}%, SB=${sbMatched.length}/${cfg.sbWords.length} = ${sbPct}%)`);
  log(`    Matched: ${matched.join(', ')}`);
  log(`    Missing: ${missing.length ? missing.join(', ') : '(none)'}`);

  // G-GEN-16: ESL collocation anomaly scan across ALL hub JS files
  const jsFiles = fs.readdirSync(dir).filter((f) => f.endsWith('.js'));
  const eslHits = [];
  for (const jf of jsFiles) {
    const raw = fs.readFileSync(path.join(dir, jf), 'utf8');
    for (const pat of ESL_ANOMALY_PATTERNS) {
      const m = raw.match(pat.regex);
      if (m) eslHits.push(`${jf} [${pat.name}]: ${m.join(' | ')}`);
    }
  }
  const g16Pass = eslHits.length === 0;
  log(`  [G-GEN-16 ESL Anomaly Scan]: ${g16Pass ? 'PASS' : 'FAIL'} (hits=${eslHits.length})`);
  for (const h of eslHits) log(`    HIT: ${h}`);

  // Round 83 Acceptance Spec v2: Math Strand & Geometry SVG contract
  let strandErrors = [];
  for (const [idx, q] of mathItems.entries()) {
    if (cfg.useStaticSvg) {
      if (q.modelData !== null) strandErrors.push(`P${idx + 1}: modelData must be null for ${cfg.expectedMathStrand}`);
      if (!q.svg_url || !q.svg_url.startsWith(`/images/week${cfg.num}/`)) {
        strandErrors.push(`P${idx + 1}: invalid svg_url (${q.svg_url})`);
      } else {
        const svgBase = path.basename(q.svg_url);
        const stagedSvg = path.join(dir, 'svg', svgBase);
        if (!fs.existsSync(stagedSvg)) {
          strandErrors.push(`P${idx + 1}: missing staged SVG ${stagedSvg}`);
        } else {
          const svgXml = fs.readFileSync(stagedSvg, 'utf8');
          if (!svgXml.includes('<svg') || !svgXml.includes('</svg>') || /NaN|undefined/.test(svgXml)) {
            strandErrors.push(`P${idx + 1}: malformed SVG XML in ${stagedSvg}`);
          }
        }
      }
      // Leak check: classification questions must list all 3 categories rather than leaking a single answer in the stem
      const lowerQ = q.problemText.toLowerCase();
      if (lowerQ.includes('classify') || lowerQ.includes('which angle category')) {
        if (cfg.num === 133 && !['acute', 'right', 'obtuse'].every((k) => lowerQ.includes(k))) {
          strandErrors.push(`P${idx + 1}: classification question missing symmetric options`);
        }
        if (cfg.num === 134 && !['equilateral', 'isosceles', 'scalene'].every((k) => lowerQ.includes(k))) {
          strandErrors.push(`P${idx + 1}: classification question missing symmetric options`);
        }
      } else if (cfg.num === 134 && /\b(?:equilateral|isosceles|scalene)\b/i.test(q.problemText)) {
        strandErrors.push(`P${idx + 1}: leaks triangle classification word in non-classification problem`);
      }
    } else {
      if (!q.modelData || !Array.isArray(q.modelData.bars) || q.modelData.bars.length < 2) {
        strandErrors.push(`P${idx + 1}: missing valid modelData.bars`);
      }
      if (q.modelData?.bars?.some((b) => !(Number(b.value) > 0))) {
        strandErrors.push(`P${idx + 1}: modelData bar value must be > 0`);
      }
    }
  }
  const strandPass = strandErrors.length === 0;
  log(`  [R83-STRAND ${cfg.expectedMathStrand}]: ${strandPass ? 'PASS' : 'FAIL'}`);
  for (const e of strandErrors) log(`    ERR: ${e}`);

  const weekPass = g11Pass && g12Pass && g13Pass && g14Pass && g15Pass && g16Pass && strandPass;
  if (!weekPass) overallPass = false;
  log(`  => WEEK ${cfg.num} VERDICT: ${weekPass ? 'PASS' : 'FAIL'}\n`);

  log(`  [WEEK ${cfg.num} MATH PROBLEMS VERBATIM]`);
  for (const [idx, q] of mathItems.entries()) {
    log(`    P${idx + 1} (${q.type}) | Title: ${q.title} | Answer: ${q.correctAnswer} ${q.unit || ''} | svg_url: ${q.svg_url || 'N/A (BarModelSVG)'}`);
    log(`       Prompt: ${q.problemText}`);
  }
  log('');

  // Keep references used cleanly
  void wr; void ls; void sk;
}

log('========================================================================');
log(`OVERALL WAVE 3 STAGING GATE STATUS: ${overallPass ? 'ALL_PASS' : 'HAS_FAILURES'}`);
log('========================================================================');

fs.writeFileSync(OUT_FILE, lines.join('\n') + '\n', 'utf8');
console.log(lines.join('\n'));
if (!overallPass) process.exit(1);

