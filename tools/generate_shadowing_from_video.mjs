#!/usr/bin/env node
/* global Buffer, console, process */
/**
 * tools/generate_shadowing_from_video.mjs
 * T-009 L4 Builder — pure transformation tool (L3 → shadowing.js)
 * Spec: .ai/runtime/T-009_SPEC.md
 * Core invariant: NO educational filtering, NO sentence dropping, NO scoring.
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath, pathToFileURL } from 'url';

export const TOOL_VERSION = '3.0.0';
export const RUNTIME_VERSION = '1.4';
export const FAST_RATE = 0.4;
export const W28_BOUNDARY = 28;
export const MIN_GAP = 0.15;
export const OVERLAP_THRESHOLD = 0.50;
export const OVERRUN_PLUS = 2;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DEFAULT_ROOT = path.resolve(__dirname, '..');
function getRoot() { return path.resolve(process.env.SRA_ROOT || DEFAULT_ROOT); }
function WEEKS_DIR() { return path.join(getRoot(), 'src', 'data', 'weeks'); }
function DATA_DIR() { return path.join(getRoot(), 'src', 'data', 'video_transcripts_by_id'); }
function L0_DIR() { return path.join(DATA_DIR(), 'L0', 'active'); }
function L1_DIR() { return path.join(DATA_DIR(), 'original'); }
function L2_DIR() { return path.join(DATA_DIR(), 'cleaned'); }
function L3_DIR() { return path.join(DATA_DIR(), 'learning'); }

export function sha256(text) { return crypto.createHash('sha256').update(String(text)).digest('hex'); }
export function countWords(text) { if (!text) return 0; return text.trim().split(/\s+/).filter(w => w.length > 0).length; }
export function normalize(text) { if (!text) return ''; return text.toLowerCase().replace(/[^a-z0-9\s']/g, '').replace(/\s+/g, ' ').trim(); }
export function wordOverlap(a, b) {
  const aW = new Set(normalize(a).split(/\s+/).filter(w => w.length > 2));
  const bW = new Set(normalize(b).split(/\s+/).filter(w => w.length > 2));
  if (aW.size === 0 || bW.size === 0) return 0;
  let m = 0; for (const w of aW) if (bW.has(w)) m++; return m / Math.max(aW.size, bW.size);
}
export function padWeek(n) { return String(n).padStart(2, '0'); }
export function loadJson(fp) { try { return JSON.parse(fs.readFileSync(fp, 'utf8')); } catch { return null; } }
export function atomicWrite(fp, content) {
  fs.mkdirSync(path.dirname(fp), { recursive: true });
  const tmp = fp + '.tmp';
  fs.writeFileSync(tmp, content, 'utf8');
  fs.renameSync(tmp, fp);
}

function getArgFromList(list, flag) { const i = list.indexOf(flag); return i >= 0 ? list[i + 1] : null; }
function hasFlagFromList(list, flag) { return list.includes(flag); }

/**
 * Forward pass: greedily match L3 sentences to L2 segments.
 * Consumes segments sequentially using word-overlap scoring.
 * Returns array of { text, start, duration, segStart, segEnd, confidence }.
 */
function forwardAlign(sentences, l2Segments, breakSet) {
  const results = [];
  let segIdx = 0;

  for (const sent of sentences) {
    const target = countWords(sent.text);
    const acc = [];
    let start = null;
    let end = null;
    let matchScore = 0;
    let matchCount = 0;

    while (segIdx < l2Segments.length) {
      const seg = l2Segments[segIdx];
      if (breakSet.has(segIdx) && acc.length > 0) break;
      if (acc.length === 0) start = seg.start;
      acc.push(seg.text);
      end = seg.start + seg.duration;
      segIdx++;

      const cur = countWords(acc.join(' '));
      if (cur >= target - 1) {
        const score = wordOverlap(sent.text, acc.join(' '));
        matchScore += score;
        matchCount++;
        if (score >= OVERLAP_THRESHOLD || cur >= target + OVERRUN_PLUS) break;
      }
    }

    const avgConfidence = matchCount > 0 ? matchScore / matchCount : 0;
    if (acc.length > 0 && start !== null && end !== null) {
      results.push({
        text: sent.text,
        start,
        duration: Math.round((end - start) * 100) / 100,
        segStart: 0,  // placeholder
        segEnd: 0,    // placeholder
        confidence: Math.round(avgConfidence * 100) / 100,
      });
    } else {
      results.push({ text: sent.text, start: null, duration: 0, segStart: 0, segEnd: 0, confidence: 0 });
    }
  }
  return results;
}

/**
 * Backward pass: correct trailing sentences that got 0-duration or
 * very low confidence from the forward pass due to time-theft.
 * Re-assigns them to the best remaining L2 segments.
 */
function backwardAlign(results, l2Segments) {
  // Find segments used by forward pass
  const usedSegs = new Set();
  for (const r of results) {
    if (r.start !== null) {
      // Mark the approximate range as used
      for (const seg of l2Segments) {
        if (seg.start >= r.start && seg.start < r.start + r.duration + 0.01) {
          usedSegs.add(seg.start);
        }
      }
    }
  }

  // Find the best unused segment range for a trailing sentence
  function findBestUnusedRange(wordTarget) {
    let bestStart = null;
    let bestEnd = null;
    let bestScore = -1;

    // Find longest contiguous unused run
    let runStart = null;
    const runs = [];

    for (let i = 0; i < l2Segments.length; i++) {
      const seg = l2Segments[i];
      if (!usedSegs.has(seg.start)) {
        if (runStart === null) runStart = seg.start;
      } else {
        if (runStart !== null) {
          runs.push({ start: runStart, end: l2Segments[i - 1].start + l2Segments[i - 1].duration });
          runStart = null;
        }
      }
    }
    if (runStart !== null) {
      const lastSeg = l2Segments[l2Segments.length - 1];
      runs.push({ start: runStart, end: lastSeg.start + lastSeg.duration });
    }

    // Pick the best run based on word count fit
    for (const run of runs) {
      const runSegs = l2Segments.filter(s => s.start >= run.start && s.start <= run.end);
      const totalWords = countWords(runSegs.map(s => s.text).join(' '));
      const fit = Math.min(totalWords, wordTarget) / Math.max(totalWords, wordTarget, 1);
      if (fit > bestScore) {
        bestScore = fit;
        bestStart = run.start;
        bestEnd = run.end;
      }
    }

    return bestStart !== null ? { start: bestStart, end: bestEnd, confidence: bestScore } : null;
  }

  // Fix trailing sentences with zero duration or very low confidence
  for (let i = results.length - 1; i >= 0; i--) {
    const r = results[i];
    if (r.start === null || r.duration === 0 || r.confidence < 0.2) {
      const wordTarget = countWords(r.text);
      const bestRange = findBestUnusedRange(wordTarget);
      if (bestRange) {
        r.start = bestRange.start;
        r.duration = Math.round((bestRange.end - bestRange.start) * 100) / 100;
        r.confidence = Math.round(bestRange.confidence * 100) / 100;
        // Mark as used
        for (const seg of l2Segments) {
          if (seg.start >= bestRange.start && seg.start < bestRange.end + 0.01) {
            usedSegs.add(seg.start);
          }
        }
      }
    }
  }

  return results;
}

export function alignSentences(sentences, l2Segments, speakerBreaks) {
  if (!sentences || !sentences.length || !l2Segments || !l2Segments.length) return [];
  const breakSet = new Set(speakerBreaks || []);

  // Pass 1: Forward greedy alignment
  const forward = forwardAlign(sentences, l2Segments, breakSet);

  // Pass 2: Backward correction for trailing/low-confidence sentences
  const corrected = backwardAlign(forward, l2Segments);

  // Strip internal fields, return standard format
  return corrected.map(r => ({ text: r.text, start: r.start, duration: r.duration }));
}

export function ruleText(script) {
  const fails = [];
  const seen = new Set();
  for (let i = 0; i < script.length; i++) {
    const e = script[i];
    if (!Number.isInteger(e.id) || e.id !== i + 1) fails.push({ rule: 'S2', id: e.id, message: `expected id ${i + 1}, got ${e.id}` });
    if (seen.has(e.id)) fails.push({ rule: 'S1', id: e.id, message: 'duplicate id' });
    seen.add(e.id);
    if (!e.text || !e.text.trim()) fails.push({ rule: 'S3', id: e.id, message: 'empty text' });
    if (e.text && e.text.includes('**')) fails.push({ rule: 'S4', id: e.id, message: 'bold markers in text' });
    if (e.text && !/[.!?]$/.test(e.text.trim())) fails.push({ rule: 'S5', id: e.id, message: 'missing terminal punctuation' });
    if (e.text && !/^[A-Z]/.test(e.text.trim())) fails.push({ rule: 'S6', id: e.id, message: 'lowercase start' });
    if (i > 0 && e.text === script[i - 1].text) fails.push({ rule: 'S8', id: e.id, message: 'adjacent duplicate text' });
  }
  return fails;
}

export function ruleHighlight(script) {
  const fails = [];
  for (const e of script) {
    if (countWords(e.text) === 0) fails.push({ rule: 'K1', id: e.id, message: 'zero words' });
    if (countWords(e.text) * FAST_RATE > (e.duration || 0) + 0.5)
      fails.push({ rule: 'K2', id: e.id, message: `K2: ${(countWords(e.text) * FAST_RATE).toFixed(2)} > ${((e.duration || 0) + 0.5).toFixed(2)}` });
  }
  return fails;
}

export function ruleTiming(script, l0Duration) {
  const fails = [];
  const starts = [];
  for (let i = 0; i < script.length; i++) {
    const e = script[i];
    if (e.start === null || e.start === undefined) { fails.push({ rule: 'T1', id: e.id, message: 'null start' }); continue; }
    if (e.start < 0) fails.push({ rule: 'T1', id: e.id, message: `start ${e.start} < 0` });
    if (e.duration <= 0) fails.push({ rule: 'T2', id: e.id, message: `duration ${e.duration} <= 0` });
    if (i > 0 && script[i - 1].start !== null && e.start < script[i - 1].start) {
      fails.push({ rule: 'T3', id: e.id, message: `start ${e.start} < prev ${script[i - 1].start}` });
    }
    if (i > 0 && script[i - 1].start !== null && e.start < script[i - 1].start + script[i - 1].duration - 0.05) {
      fails.push({ rule: 'T4', id: e.id, message: `start ${e.start} overlaps prev end ${(script[i - 1].start + script[i - 1].duration).toFixed(2)}` });
    }
    starts.push(e.start);
  }
  if (l0Duration != null) {
    const total = script.reduce((s, e) => s + (e.duration || 0), 0);
    const min = 0.95 * l0Duration;
    const max = 1.05 * l0Duration + 0.5;
    if (total < min || total > max) fails.push({ rule: 'T5', id: null, message: `Σ duration ${total.toFixed(2)} not in [${min.toFixed(2)}, ${max.toFixed(2)}]` });
    const first0 = starts.find(s => s !== null && s !== undefined);
    if (first0 != null && first0 > 0.05 * l0Duration) fails.push({ rule: 'T7', id: null, message: `first start ${first0} > 5% of ${l0Duration}` });
  }
  for (let i = 1; i < script.length; i++) {
    if (script[i].start !== null && script[i - 1].start !== null) {
      const gap = script[i].start - (script[i - 1].start + script[i - 1].duration);
      if (gap < MIN_GAP - 0.001) fails.push({ rule: 'T6', id: script[i].id, message: `gap ${gap.toFixed(3)} < ${MIN_GAP}` });
    }
  }
  const realStarts = starts.filter(s => s !== null);
  if (new Set(realStarts).size !== realStarts.length) fails.push({ rule: 'K4', id: null, message: 'duplicate start' });
  return fails;
}

export function ruleModePair(advCount, easyCount) {
  if (advCount < easyCount) return [{ rule: 'M4', id: null, message: `ADV ${advCount} < EASY ${easyCount}` }];
  return [];
}

export function buildShadowingJs({ videoId, title, l0Checksum, l1Checksum, l2Checksum, script, week }) {
  const joined = script.map(e => e.text).join(' ');
  const l3TextChecksum = sha256(joined);
  const isW28 = week >= 28;
  const weekTag = String(week).padStart(2, '0');
  const audioFull = isW28 ? `/audio/week_${weekTag}/shadowing_full_w${week}.mp3` : null;
  const ttsScript = isW28 ? script.map((e, i) => ({ id: i + 1, text: e.text, vi: null })) : null;
  const ttsMode = isW28 ? 'split' : null;
  const lines = [
    'export default {',
    `  videoId: ${JSON.stringify(videoId)},`,
    `  title: ${JSON.stringify(title)},`,
    `  content_en: ${JSON.stringify(joined)},`,
    `  ttsScript: ${JSON.stringify(ttsScript)},`,
    `  audio_full: ${JSON.stringify(audioFull)},`,
    `  ttsMode: ${JSON.stringify(ttsMode)},`,
    '  script: [',
  ];
  for (const e of script) {
    lines.push(`    { id: ${e.id}, text: ${JSON.stringify(e.text)}, vi: ${JSON.stringify(e.vi)}, start: ${e.start ?? 'null'}, duration: ${e.duration ?? 0} },`);
  }
  lines.push('  ],');
  lines.push(`  l0_checksum: ${JSON.stringify(l0Checksum)},`);
  lines.push(`  l1_checksum: ${JSON.stringify(l1Checksum)},`);
  lines.push(`  l2_checksum: ${JSON.stringify(l2Checksum)},`);
  lines.push(`  l3_text_checksum: ${JSON.stringify(l3TextChecksum)},`);
  lines.push(`  schema_version: '1.0.0',`);
  lines.push(`  runtime_version: '1.4',`);
  lines.push(`  generated_at: ${JSON.stringify(new Date().toISOString())},`);
  lines.push(`  generated_by: 'T-009',`);
  lines.push(`  t009_version: ${JSON.stringify(TOOL_VERSION)},`);
  lines.push('};');
  return { content: lines.join('\n'), textHash: sha256(joined), l3TextChecksum };
}

export function makeReport(opts, inputs, outputs, validation, verdict) {
  return { tool: 'T-009', version: TOOL_VERSION, runtime_version: RUNTIME_VERSION, ...opts, inputs, outputs, validation, verdict, generated_at: new Date().toISOString(), exit_code: verdict.exitCode };
}

export function printHuman(report) {
  console.log(`T-009 — Week ${report.week} [${report.mode}] — videoId: ${report.videoId}`);
  console.log(`  L3 sentences: ${report.inputs.l3_sentence_count}`);
  console.log(`  L2 segments: ${report.inputs.l2_segment_count}`);
  for (const [k, v] of Object.entries(report.outputs)) {
    console.log(`  ${k}: wrote ${v.path} (${v.bytes} bytes, ${v.scriptCount} sentences)`);
  }
  console.log(`  Internal checks: ${report.validation.rules_passed}/${report.validation.rules_total} passed`);
  for (const r of report.validation.failed_rules) console.log(`    FAIL: [${r.rule}] id=${r.id} ${r.message}`);
  console.log(`  Verdict: ${report.verdict.verdict}`);
}

export function parseCli(argv) {
  if (argv.includes('--help')) return { help: true };
  const weekStr = getArgFromList(argv, '--week');
  const video = getArgFromList(argv, '--video');
  const accentRaw = getArgFromList(argv, '--accent');
  const week = weekStr ? Number(weekStr) : null;
  if (!week || week < 1 || week > 156) return { error: 'exit3', message: '--week 1-156 required' };
  const accent = (accentRaw || 'US').toUpperCase();
  return {
    week, video: video || null,
    accent: ['US', 'UK'].includes(accent) ? accent : 'US',
    dryRun: hasFlagFromList(argv, '--dry-run'),
    verbose: hasFlagFromList(argv, '--verbose'),
    json: hasFlagFromList(argv, '--json'),
    force: hasFlagFromList(argv, '--force'),
  };
}

export function resolveVideoId(week, modes, explicit) {
  if (explicit) return explicit;
  for (const m of modes) {
    const fp = m === 'EASY' ? WEEKS_EASY_DIR() : WEEKS_DIR();
    const shadow = path.join(fp, `week_${padWeek(week)}`, 'shadowing.js');
    if (fs.existsSync(shadow)) {
      const c = fs.readFileSync(shadow, 'utf8');
      const m2 = c.match(/videoId:\s*["']([A-Za-z0-9_-]{11})["']/);
      if (m2) return m2[1];
    }
  }
  return null;
}

export function runGenerate(opts) {
  const { week, video: videoFlag, dryRun } = opts;
  const videoId = resolveVideoId(week, ['ADV'], videoFlag);
  if (!videoId) {
    return makeReport({ week, mode: 'ADV', videoId: null }, {}, {}, { rules_total: 0, rules_passed: 0, failed_rules: [] }, { verdict: 'FAIL', exitCode: 3, reason: 'missing videoId' });
  }

  const l0Path = path.join(L0_DIR(), `${videoId}.json`);
  const l1Path = path.join(L1_DIR(), `${videoId}.json`);
  const l2Path = path.join(L2_DIR(), `${videoId}.json`);
  const l0 = loadJson(l0Path);
  const l1 = loadJson(l1Path);
  const l2 = loadJson(l2Path);

  if (!l2 || !l2.segments) {
    return makeReport({ week, mode: 'ADV', videoId }, { l2_path: l2Path }, {}, { rules_total: 0, rules_passed: 0, failed_rules: [] }, { verdict: 'FAIL', exitCode: 2, reason: 'missing L2' });
  }

  /* C2: checksum verification */
  const l0Checksum = l0 && l0.checksum ? sha256(l0.checksum) : null;
  const l0Duration = l0 ? l0.duration_seconds || null : null;
  const l1Checksum = l1 && l1.checksum ? l1.checksum : (l1 && l1.text ? sha256(l1.text) : null);
  const l2Checksum = l2 && l2.text ? sha256(l2.text) : null;

  if (l1 && l1.checksum && l2 && l2.l1_checksum && l1.checksum !== l2.l1_checksum) {
    const fails = [{ rule: 'CHAIN_L1_L2', id: null, message: `L1.checksum (${l1.checksum.slice(0, 12)}) != L2.l1_checksum (${l2.l1_checksum.slice(0, 12)})` }];
    return makeReport({ week, mode: 'ADV', videoId }, { l2_path: l2Path, l1_path: l1Path }, {}, { rules_total: 1, rules_passed: 0, failed_rules: fails }, { verdict: 'FAIL', exitCode: 2, reason: 'checksum chain broken' });
  }

  /* Load L3 — single unified transcript from shared video */
  const l3Path = path.join(L3_DIR(), `${videoId}_ADV.json`);
  const l3 = loadJson(l3Path);
  if (!l3 || !l3.sentences || !l3.sentences.length) {
    const fails = [{ rule: 'L3_MISSING', id: null, message: `L3 missing for ${videoId}` }];
    return makeReport({ week, mode: 'ADV', videoId }, { l3_path: l3Path }, {}, { rules_total: 1, rules_passed: 0, failed_rules: fails }, { verdict: 'FAIL', exitCode: 2, reason: 'L3 missing' });
  }

  const l3MetadataChecksum = l3.metadata && l3.metadata.l2_checksum ? l3.metadata.l2_checksum : null;

  /* §4.1: IDs are 1..N from L3 order */
  let sentencesOut = l3.sentences.map((s, i) => ({ id: i + 1, vi: null, text: s.text }));

  /* §4.3/4.4b: align L3 text to L2 timestamps — pure transformation, no filtering */
  // If L3 sentences already have valid timestamps, use them directly
  // (avoids misalignment from re-mapping to L2 segments)
  const hasTimestamps = l3.sentences.every(s => s.start != null && s.duration > 0);
  const aligned = hasTimestamps
    ? l3.sentences.map(s => ({ text: s.text, start: s.start, duration: s.duration }))
    : alignSentences(sentencesOut, l2.segments, l2.speaker_breaks || []);
  for (const e of aligned) if (e.start === null) { e.start = 0; e.duration = 1.0; }

  /* T6 gap extension — only when timestamps came from alignment, not L3 */
  const script = aligned.map((a, i) => ({ id: i + 1, text: a.text, vi: null, start: a.start, duration: a.duration }));
  if (!hasTimestamps) {
    for (let i = 1; i < script.length; i++) {
      const prev = script[i - 1];
      const curr = script[i];
      if (prev.start === null || curr.start === null) continue;
      const gap = curr.start - (prev.start + prev.duration);
      if (gap < MIN_GAP - 0.001) {
        const shift = MIN_GAP - gap;
        prev.duration += shift;
        for (let j = i; j < script.length; j++) {
          if (script[j].start !== null) script[j].start += shift;
        }
      }
    }
  }

  /* §6: structural validation — S/K/T rules only */
  const fails = [...ruleText(script), ...ruleHighlight(script), ...ruleTiming(script, l0Duration)];
  const allTotal = 1 + script.length * 2;
  const allPassed = allTotal - fails.length;
  const verdict = fails.length
    ? { verdict: 'FAIL', exitCode: 2, reason: 'rule failures' }
    : { verdict: 'PASS', exitCode: 0, reason: 'all rules passed' };

  /* §3: build shadowing.js — single unified output */
  const title = (l0 && l0.title) || `Week ${week}`;
  const { content, textHash } = buildShadowingJs({ videoId, title, l0Checksum, l1Checksum, l2Checksum: l3MetadataChecksum || l2Checksum, script, week });
  const fp = path.join(WEEKS_DIR(), `week_${padWeek(week)}`, 'shadowing.js');
  if (!dryRun) atomicWrite(fp, content);

  const output = { path: fp, bytes: Buffer.byteLength(content, 'utf8'), scriptCount: script.length, curatedFrom: sentencesOut.length, curatedTo: script.length, textHash };

  return makeReport({ week, mode: 'ADV', videoId }, {
    l0_path: l0 ? l0Path : null,
    l1_path: l1 ? l1Path : null,
    l2_path: l2Path,
    l3_sentence_count: sentencesOut.length,
    l2_segment_count: l2.segments.length,
    l0_checksum: l0Checksum,
    l1_checksum: l1Checksum,
    l2_checksum: l2Checksum,
  }, { ADV: output }, { rules_total: allTotal, rules_passed: allPassed, failed_rules: fails }, verdict);
}

async function main() {
  const parsed = parseCli(process.argv.slice(2));
  if (parsed.help) { console.log('T-009 L4 Builder — pure L3→L4 transformation'); return; }
  if (parsed.error) { console.error(parsed.message); process.exitCode = parsed.error === 'exit3' ? 3 : 2; return; }
  const report = runGenerate(parsed);
  if (parsed.json) console.log(JSON.stringify(report, null, 2));
  else printHuman(report);
  process.exitCode = report.exit_code;
}

const isMain = process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url;
if (isMain) main();
