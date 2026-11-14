/**
 * scripts/audit_section_b_r93_closure.mjs
 * 
 * Generates Section B: ĐÓNG R93 — BẢNG BẰNG CHỨNG
 * Measures 6 specific items across:
 * - W55–W72 (18 weeks)
 * - W40, W42, W44, W47–W54 (11 weeks)
 * 
 * 6 Measured Items:
 * (1) Provenance quality_gates_passed: kết quả chạy thật (pass count / 17 gates)
 * (2) Speaking Part 2: hoàn chỉnh (10/10 fields compliant, 0 placeholders)
 * (3) CLIL mức A2 Flyers: FK grade & % từ dài (>=10 chars)
 * (4) Vocab đủ Source B: tỷ lệ phủ syllabus_words (100% hoặc liệt kê)
 * (5) Theme Source B: khớp tiêu đề Source B, clean blueprint
 * (6) Shadowing dễ đọc ở A2: avg words/sentence & max sentence length
 */
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const STAGING_DIR = path.join(ROOT, 'docs/agent_artifacts/staging');
const SYLLABUS_FILE = path.join(ROOT, 'docs/1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt');
const lines = fs.readFileSync(SYLLABUS_FILE, 'utf8').split('\n');

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
  if (!text) return { fkGrade: 0, words: 0, sentences: 0, longWordsPct: 0 };
  const clean = text.replace(/[\n\r]+/g, ' ').trim();
  const sentences = clean.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 2);
  const words = clean.split(/\s+/).map(w => w.replace(/[^a-zA-Z]/g, '').toLowerCase()).filter(w => w.length > 0);
  if (words.length === 0 || sentences.length === 0) return { fkGrade: 0, words: 0, sentences: 0, longWordsPct: 0 };
  let totalSyllables = 0;
  let longWords = 0;
  for (const w of words) {
    totalSyllables += countSyllables(w);
    if (w.length >= 10) longWords++;
  }
  const score = 0.39 * (words.length / sentences.length) + 11.8 * (totalSyllables / words.length) - 15.59;
  return {
    fkGrade: Math.round(score * 10) / 10,
    words: words.length,
    sentences: sentences.length,
    longWordsPct: Math.round((longWords / words.length) * 1000) / 10
  };
}

function getSourceBTitle(w) {
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    const sm = l.match(/^[ \t]*[•\-\*]?[ \t]*(?:Week|Tuần)\s*(\d+)\s*:\s*([^(\n\r]+)/i);
    if (sm && parseInt(sm[1], 10) === w) {
      return sm[2].trim();
    }
  }
  return '';
}

async function measureWeek(w) {
  const dir = path.join(STAGING_DIR, `week_${w}`);
  const bp = JSON.parse(fs.readFileSync(path.join(dir, 'blueprint.json'), 'utf8'));
  const prov = JSON.parse(fs.readFileSync(path.join(dir, 'provenance.json'), 'utf8'));
  const rh = (await import('file://' + path.join(dir, 'reading_hub.js'))).default || (await import('file://' + path.join(dir, 'reading_hub.js'))).readingHubData;
  const sh = (await import('file://' + path.join(dir, 'speaking_hub.js'))).default || (await import('file://' + path.join(dir, 'speaking_hub.js'))).speakingHubData;
  const vh = (await import('file://' + path.join(dir, 'vocab.js'))).default || (await import('file://' + path.join(dir, 'vocab.js'))).vocabData;

  // (1) Provenance real gates
  const realGatesCount = (prov.quality_gates_passed || []).length;
  const provVerified = prov.verified_at ? 'Chạy thật' : 'Chưa chạy';

  // (2) Speaking Part 2
  const ie = sh.info_exchange_cards || {};
  const ta = ie.table_a?.fields || [];
  const tb = ie.table_b?.fields || [];
  let sp2Compliant = tb.length === 5 && ta.length === 5;
  for (const f of tb) {
    if (!f.value || f.value.includes('on file') || !f.nova_question) sp2Compliant = false;
  }
  for (const f of ta) {
    if (!f.cue_prompt || !f.nova_reply || f.nova_reply.includes('is recorded for')) sp2Compliant = false;
  }
  const sp2Status = sp2Compliant ? '10/10 Chuẩn' : 'Chưa chuẩn';

  // (3) CLIL A2 Flyers metrics
  const clilText = rh.clil_article?.content_en || '';
  const clilStats = calcFK(clilText);
  const clilPass = clilStats.fkGrade >= 4.0 && clilStats.fkGrade <= 8.5 && clilStats.longWordsPct <= 10.0;
  const clilMetricStr = `FK ${clilStats.fkGrade} (${clilStats.longWordsPct}%) ${clilPass ? '✅' : '⚠️'}`;

  // (4) Vocab Source B coverage
  const sbWords = bp.vocabulary_focus?.syllabus_words || [];
  const vList = Array.isArray(vh) ? vh : (vh.vocab || vh.words || []);
  const vWordsSet = new Set(vList.map(v => (v.word || '').toLowerCase().trim()));
  const missingWords = sbWords.filter(sw => !vWordsSet.has(sw.toLowerCase().trim()));
  const vocabSbStr = missingWords.length === 0 ? `100% (${sbWords.length}/${sbWords.length})` : `Thiếu ${missingWords.length}/${sbWords.length}`;

  // (5) Theme vs Source B
  const sbTitle = getSourceBTitle(w);
  const rhTheme = (rh.theme || '').trim();
  const bpTheme = (bp.theme || '').trim();
  let themeStr = 'Tương đương';
  if (rhTheme.toLowerCase() === sbTitle.toLowerCase() || bpTheme.toLowerCase() === sbTitle.toLowerCase()) {
    themeStr = 'Exact 100%';
  } else if (rhTheme.toLowerCase().includes(sbTitle.toLowerCase()) || sbTitle.toLowerCase().includes(rhTheme.toLowerCase())) {
    themeStr = 'Tương đương';
  } else {
    themeStr = 'Khác';
  }

  // (6) Shadowing
  const shadSents = rh.shadowing || rh.shadowingData?.sentences || [];
  let shadAvg = 0;
  let shadMax = 0;
  if (shadSents.length > 0) {
    let tot = 0;
    for (const s of shadSents) {
      const c = (s.text || '').trim().split(/\s+/).filter(Boolean).length;
      tot += c;
      if (c > shadMax) shadMax = c;
    }
    shadAvg = Math.round((tot / shadSents.length) * 10) / 10;
  }
  const shadStr = `${shadAvg}w/câu (max ${shadMax}w)`;

  return {
    w,
    realGatesCount,
    provVerified,
    sp2Status,
    clilMetricStr,
    vocabSbStr,
    themeStr,
    shadStr
  };
}

async function main() {
  console.log('### BẢNG ĐO CHẤT LƯỢNG 6 TIÊU CHÍ R93 TRÊN 29 TUẦN STAGED\n');

  console.log('#### Lô 2: W55–W72 (18 tuần)');
  console.log('| Tuần | (1) Gates Thật | (2) Spk Part 2 | (3) CLIL Flyers FK | (4) Vocab Source B | (5) Theme Source B | (6) Shadowing A2 |');
  console.log('|:---:|:---:|:---:|:---:|:---:|:---:|:---:|');
  for (let w = 55; w <= 72; w++) {
    const r = await measureWeek(w);
    console.log(`| W${r.w.toString().padStart(2, '0')} | ${r.realGatesCount}/17 gates PASS | ${r.sp2Status.padEnd(14)} | ${r.clilMetricStr.padEnd(18)} | ${r.vocabSbStr.padEnd(18)} | ${r.themeStr.padEnd(18)} | ${r.shadStr} |`);
  }

  console.log('\n#### Lô 1: W40, W42, W44, W47–W54 (11 tuần)');
  console.log('| Tuần | (1) Gates Thật | (2) Spk Part 2 | (3) CLIL Flyers FK | (4) Vocab Source B | (5) Theme Source B | (6) Shadowing A2 |');
  console.log('|:---:|:---:|:---:|:---:|:---:|:---:|:---:|');
  for (const w of [40, 42, 44, 47, 48, 49, 50, 51, 52, 53, 54]) {
    const r = await measureWeek(w);
    console.log(`| W${r.w.toString().padStart(2, '0')} | ${r.realGatesCount}/17 gates PASS | ${r.sp2Status.padEnd(14)} | ${r.clilMetricStr.padEnd(18)} | ${r.vocabSbStr.padEnd(18)} | ${r.themeStr.padEnd(18)} | ${r.shadStr} |`);
  }
}

main().catch(console.error);
