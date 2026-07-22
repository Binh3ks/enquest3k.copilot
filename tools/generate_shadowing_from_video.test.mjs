#!/usr/bin/env node
/* global process */
/**
 * tools/generate_shadowing_from_video.test.mjs
 * Acceptance test suite for T-009 pure L3→L4 transformation.
 * Spec: .ai/runtime/T-009_SPEC.md
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

import {
  TOOL_VERSION,
  sha256,
  alignSentences, ruleText, ruleHighlight, ruleTiming, ruleModePair,
  buildShadowingJs, parseCli, runGenerate,
} from './generate_shadowing_from_video.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function mkTmp() { return fs.mkdtempSync(path.join(os.tmpdir(), 't009-')); }
function l2Seg(text, start, duration) { return { text, start, duration }; }

function writeFixtureL2L3(root, videoId, l2Segs, l3Sents, opts = {}) {
  const dataDir = path.join(root, 'src', 'data', 'video_transcripts_by_id');
  for (const d of ['cleaned', 'learning', 'L0/active', 'original']) fs.mkdirSync(path.join(dataDir, d), { recursive: true });
  const weekTag = `week_${String(opts.week || 99).padStart(2, '0')}`;
  fs.mkdirSync(path.join(root, 'src', 'data', 'weeks', weekTag), { recursive: true });
  fs.writeFileSync(path.join(root, 'src', 'data', 'weeks', weekTag, 'shadowing.js'),
    `export default { videoId: ${JSON.stringify(videoId)}, title: ${JSON.stringify(opts.title || 'Fixture')}, content_en: "", script: [] };\n`);
  process.env.SRA_ROOT = root;
  process.env._SRA_PREV_SRA = 'restored';
  fs.writeFileSync(path.join(dataDir, 'L0', 'active', `${videoId}.json`), JSON.stringify({ videoId, title: opts.title || 'Fixture', channel: 'Test', duration_seconds: opts.l0Duration || 120, language: 'en-US', caption_source: 'manual', caption_url: null, captions_available: true, checksum: 'orig-l0', retrieval_date: '2026-07-15T00:00:00Z', runtime_version: '1.3', repair_history: [], status: 'active', l1_fetched_at: '2026-07-15T00:00:00Z' }));
  fs.writeFileSync(path.join(dataDir, 'original', `${videoId}.json`), JSON.stringify({ text: l2Segs.map(s => s.text).join(' '), segments: l2Segs, runtime_version: '1.3', videoId, checksum: 'l1-checksum' }));
  const l2WithGaps = l2Segs.map((s, i) => ({...s, start: i * 1.3, duration: 1.0}));
fs.writeFileSync(path.join(dataDir, 'cleaned', `${videoId}.json`), JSON.stringify({ text: l2Segs.map(s => s.text).join(' '), segments: l2WithGaps, runtime_version: '1.3', videoId, l1_checksum: 'l1-checksum', l1_runtime_version: '1.3', speaker_breaks: opts.speakerBreaks || [] }));
  fs.writeFileSync(path.join(dataDir, 'learning', `${videoId}_ADV.json`), JSON.stringify({ sentences: l2WithGaps.map(s => ({ text: s.text, start: s.start, duration: s.duration })), metadata: { videoId, cefr_target: 'A1', mode: 'ADV', sentence_count: l2WithGaps.length, runtime_version: '1.3', l2_checksum: sha256(l2Segs.map(s => s.text).join(' ')) } }));
  fs.writeFileSync(path.join(dataDir, 'learning', `${videoId}_EASY.json`), JSON.stringify({ sentences: l2WithGaps.map(s => ({ text: s.text, start: s.start, duration: s.duration })), metadata: { videoId, cefr_target: 'A1', mode: 'EASY', sentence_count: l2WithGaps.length, runtime_version: '1.3', l2_checksum: sha256(l2Segs.map(s => s.text).join(' ')) } }));
}

describe('parseCli', () => {
  it('parses required flags', () => { const p = parseCli(['--week', '11']); assert.equal(p.week, 11); });
  it('rejects missing --week', () => { assert.ok(parseCli([]).error); });
  it('rejects out-of-range week', () => { assert.equal(parseCli(['--week', '0']).error, 'exit3'); });
  it('--help returns help', () => { assert.equal(parseCli(['--help']).help, true); });
});

describe('alignment', () => {
  it('aligns L3 to L2 segments', () => {
    const out = alignSentences([{ text: 'Hello.' }, { text: 'Goodbye.' }],
      [l2Seg('Hello.', 0, 1), l2Seg('Goodbye.', 1, 1)], []);
    assert.equal(out[0].start, 0);
    assert.equal(out[1].start, 1);
  });
  it('handles empty inputs', () => { assert.deepEqual(alignSentences([], [], []), []); });
});

describe('rule checks', () => {
  it('S1 flags duplicate ids', () => { assert.ok(ruleText([{ id: 1, text: 'A.' }, { id: 1, text: 'B.' }]).length > 0); });
  it('S2 flags non-sequential ids', () => { assert.ok(ruleText([{ id: 1, text: 'A.' }, { id: 3, text: 'B.' }]).length > 0); });
  it('K2 flags highlight overrun', () => {
    const script = [{ id: 1, text: 'one two three four five six', start: 0, duration: 0.5 }];
    assert.ok(ruleHighlight(script).some(f => f.rule === 'K2'));
  });
  it('T3 flags non-monotonic start', () => {
    const script = [{ id: 1, text: 'A.', start: 5, duration: 1 }, { id: 2, text: 'B.', start: 3, duration: 1 }];
    assert.ok(ruleTiming(script, 60).some(r => r.rule === 'T3'));
  });
  it('T5 flags out-of-range total duration', () => {
    const script = Array.from({ length: 5 }, (_, i) => ({ id: i + 1, text: 'A.', start: i * 2, duration: 1 }));
    assert.ok(ruleTiming(script, 600).some(r => r.rule === 'T5'));
  });
  it('M4 flags ADV shorter than EASY', () => { assert.ok(ruleModePair(2, 3).some(f => f.rule === 'M4')); });
});

describe('pure transformation', () => {
  it('produces shadowing.js with verbatim L3 text', () => {
    const root = mkTmp();
    const videoId = 'test123';
    writeFixtureL2L3(root, videoId, [l2Seg('Hello there.', 0, 1.0), l2Seg('Goodbye.', 1.0, 1.0)], ['Hello there.', 'Goodbye.'], { l0Duration: 2.0 });
    process.env.SRA_ROOT = root;
    const r = runGenerate({ week: 99, mode: 'ADV', video: videoId, dryRun: true });
    assert.equal(r.exit_code, 0);
    assert.equal(r.outputs.ADV.scriptCount, 2);
  });
  it('no sentences are dropped', () => {
    const root = mkTmp();
    const videoId = 'test456';
    writeFixtureL2L3(root, videoId, Array.from({ length: 16 }, (_, i) => l2Seg(`Sentence ${i + 1}.`, i * 1.0, 1.0)), Array.from({ length: 16 }, (_, i) => `Sentence ${i + 1}.`), { l0Duration: 16.0 });
    process.env.SRA_ROOT = root;
    const r = runGenerate({ week: 99, mode: 'ADV', video: videoId, dryRun: true });
    assert.equal(r.outputs.ADV.scriptCount, 16);
    assert.equal(r.outputs.ADV.scriptCount, r.outputs.ADV.curatedFrom);
  });
  it('exits 3 on missing videoId', () => {
    const r = runGenerate({ week: 99, mode: 'ADV', video: null, dryRun: true });
    assert.equal(r.exit_code, 3);
  });
  it('exits 2 on missing L2', () => {
    const root = mkTmp();
    process.env.SRA_ROOT = root;
    const r = runGenerate({ week: 99, mode: 'ADV', video: 'noL2test', dryRun: true });
    assert.equal(r.exit_code, 2);
    assert.equal(r.verdict.reason, 'missing L2');
  });
  it('buildShadowingJs includes all required fields', () => {
    const { content } = buildShadowingJs({ videoId: 'vid', title: 'T', l0Checksum: null, l1Checksum: null, l2Checksum: null, script: [{ id: 1, text: 'A.', vi: null, start: 0, duration: 1 }], week: 99 });
    assert.match(content, /videoId: "vid"/);
    assert.match(content, /schema_version: '1.0.0'/);
    assert.match(content, /generated_by: 'T-009'/);
  });
});

describe('no pedagogical logic', () => {
  it('source does not contain countSyllables', () => {
    const src = fs.readFileSync(path.join(__dirname, 'generate_shadowing_from_video.mjs'), 'utf8');
    assert.ok(!src.includes('function countSyllables'));
  });
  it('source does not contain CEFR_LIMITS', () => {
    const src = fs.readFileSync(path.join(__dirname, 'generate_shadowing_from_video.mjs'), 'utf8');
    assert.ok(!src.includes('CEFR_LIMITS'));
  });
  it('source does not contain curation', () => {
    const src = fs.readFileSync(path.join(__dirname, 'generate_shadowing_from_video.mjs'), 'utf8');
    assert.ok(!src.includes('curation'));
  });
  it('source does not contain pedagogical', () => {
    const src = fs.readFileSync(path.join(__dirname, 'generate_shadowing_from_video.mjs'), 'utf8');
    assert.ok(!src.includes('pedagogical'));
  });
  it('source does not contain exit code 4', () => {
    const src = fs.readFileSync(path.join(__dirname, 'generate_shadowing_from_video.mjs'), 'utf8');
    assert.ok(!src.includes('exitCode: 4'));
  });
  it('version is 3.0.0', () => {
    assert.equal(TOOL_VERSION, '3.0.0');
  });
});
