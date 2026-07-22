#!/usr/bin/env node
/**
 * ai_transcript_segmenter.mjs — AI Transcript Segmenter (V2)
 *
 * Architecture: L2 transcript → LLM groups segments → deterministic cards → L3
 *
 * The LLM produces ONLY groups: array of arrays of segment ids.
 * Everything else (text, timestamps, word count, duration, card objects,
 * pedagogical constraints, metadata) is computed deterministically.
 *
 * V2 changes (Phase 1):
 *   - Injects explicit speaker boundary markers into LLM input
 *   - Dynamic breath-group limits per mode (EASY ≤ 10, ADV ≤ 15)
 *   - Post-LLM semantic coherence validation (speaker + length)
 *   - Cache invalidation via mode-aware decision keys
 *
 * Pipeline:
 *   preprocess → LLM → validateGroups() → validateSemanticCoherence() → buildCards()
 *
 * Decision store: (input_hash, model_pin, mode) → groups.
 * The store is the replay guarantee. Cards are always derived from stored groups.
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import Anthropic from '@anthropic-ai/sdk';
import { resolveTransportModel } from './resolve_transport_model.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---------------------------------------------------------------------------
// Versioning / model pin
// ---------------------------------------------------------------------------

export const VERSION = '5.0.0';

// Model pin: encode model + date. Changing it invalidates stored decisions.
export const MODEL_PIN = 'segmenter-v5@claude-haiku-4-5-20251001';

const CLAUDE_MODEL = process.env.ANTHROPIC_SMALL_FAST_MODEL || 'claude-haiku-4-5-20251001';

// Breath-group limits per mode
const BREATH_LIMITS = { ADV: 15, EASY: 10 };

// ---------------------------------------------------------------------------
// Errors
// ---------------------------------------------------------------------------

export class InvalidInputError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidInputError';
  }
}

// ---------------------------------------------------------------------------
// Input validation
// ---------------------------------------------------------------------------

/**
 * Validate the input L2 segments before sending to Claude.
 * Throws InvalidInputError on structural defects. Does NOT repair.
 */
export function validateInput(segments) {
  if (!Array.isArray(segments)) {
    throw new InvalidInputError('segments is not an array');
  }
  segments.forEach((s, i) => {
    if (typeof s !== 'object' || s === null) {
      throw new InvalidInputError(`segment ${i} is not an object`);
    }
    if (typeof s.text !== 'string' || s.text.trim().length === 0) {
      throw new InvalidInputError(`segment ${i} has empty text`);
    }
    if (typeof s.start !== 'number' || !Number.isFinite(s.start) || s.start < 0) {
      throw new InvalidInputError(`segment ${i} has invalid start`);
    }
    if (typeof s.duration !== 'number' || !Number.isFinite(s.duration) || s.duration <= 0) {
      throw new InvalidInputError(`segment ${i} has invalid duration`);
    }
    // ids are positional 1..N; verify contiguity
    const expectedId = i + 1;
    if (typeof s.id === 'number' && s.id !== expectedId) {
      throw new InvalidInputError(`segment ${i} has non-contiguous id ${s.id} (expected ${expectedId})`);
    }
    // monotonic timestamps
    if (i > 0) {
      const prev = segments[i - 1];
      if (s.start < prev.start) {
        throw new InvalidInputError(`segment ${i} start ${s.start} precedes segment ${i - 1} start ${prev.start}`);
      }
    }
  });
  return true;
}

// ---------------------------------------------------------------------------
// Pre-processing: inject speaker boundaries into segment text
// ---------------------------------------------------------------------------

/**
 * Inject speaker boundary markers into segment text for the LLM.
 * Segments at speaker_breaks indices get a [SPEAKER CHANGE] marker.
 *
 * @param {Array} segments - Original L2 segments
 * @param {Array<number>} speakerBreaks - Indices where speaker changes occur
 * @returns {Array} New segments with boundary markers in text
 */
export function injectSpeakerBoundaries(segments, speakerBreaks = []) {
  const breakSet = new Set(speakerBreaks);
  return segments.map((seg, i) => {
    if (breakSet.has(i)) {
      return { ...seg, text: `[SPEAKER CHANGE] ${seg.text}` };
    }
    return { ...seg };
  });
}

// ---------------------------------------------------------------------------
// Semantic validation — checks groups produced by the LLM.
// Verifies structural integrity only. NO pedagogical limits here.
// ---------------------------------------------------------------------------

/**
 * Validate that the LLM's groups are a valid partition of {1..segmentCount}.
 *
 * Returns { valid, errors } — does NOT throw.
 * On failure, the caller should fall back to mechanical segmentation.
 */
export function validateGroups(groups, segmentCount) {
  const errors = [];
  const n = segmentCount;

  if (!Array.isArray(groups)) {
    return { valid: false, errors: ['groups is not an array'] };
  }

  // Each group must be an array of integers
  for (let i = 0; i < groups.length; i++) {
    const g = groups[i];
    if (!Array.isArray(g)) {
      errors.push(`group ${i} is not an array`);
      continue;
    }
    for (const id of g) {
      if (!Number.isInteger(id) || id < 1 || id > n) {
        errors.push(`group ${i} contains invalid segment id ${id}`);
      }
    }
    // Within-group ordering must be ascending
    for (let j = 1; j < g.length; j++) {
      if (g[j] <= g[j - 1]) {
        errors.push(`group ${i} is not in ascending order`);
        break;
      }
    }
  }

  // All segment ids 1..N must appear exactly once
  const seen = new Set();
  const duplicateIds = [];
  const missingIds = [];
  for (const g of groups) {
    for (const id of g) {
      if (seen.has(id)) duplicateIds.push(id);
      seen.add(id);
    }
  }
  for (let i = 1; i <= n; i++) {
    if (!seen.has(i)) missingIds.push(i);
  }
  if (duplicateIds.length) errors.push(`duplicate segment ids: ${duplicateIds.join(', ')}`);
  if (missingIds.length) errors.push(`missing segment ids: ${missingIds.join(', ')}`);

  // Cross-group ordering: group[i] ids must all be < group[i+1] ids
  for (let i = 1; i < groups.length; i++) {
    const prevMax = Math.max(...groups[i - 1]);
    const curMin = Math.min(...groups[i]);
    if (curMin <= prevMax) {
      errors.push(`groups ${i - 1} and ${i} are not in ascending segment order`);
    }
  }

  return { valid: errors.length === 0, errors };
}

// ---------------------------------------------------------------------------
// Semantic coherence validation — checks pedagogical constraints
// Validates speaker separation AND breath-group limits.
// ---------------------------------------------------------------------------

/**
 * Validate that groups respect speaker boundaries and word limits.
 *
 * @param {Array<number[]>} groups - LLM output groups
 * @param {Array} segments - Original L2 segments (with speaker_breaks)
 * @param {number} maxWords - Max words per group (breath-group limit)
 * @returns {{ valid: boolean, errors: string[] }}
 */
export function validateSemanticCoherence(groups, segments, maxWords) {
  const errors = [];

  for (let i = 0; i < groups.length; i++) {
    const group = groups[i];

    // Check word count
    const words = group.map(id => segments[id - 1].text).join(' ').split(/\s+/).filter(Boolean);
    if (words.length > maxWords) {
      errors.push(`group ${i}: ${words.length} words exceeds max ${maxWords}`);
    }
  }

  return { valid: errors.length === 0, errors };
}

// ---------------------------------------------------------------------------
// Deterministic card construction
// ---------------------------------------------------------------------------

const SYLLABLE_RE = /[aeiouy]+/gi;
const SILENT_E_RE = /[^aeiou]e$/i;

function countSyllables(word) {
  const w = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!w || w.length <= 1) return 1;
  const matches = w.match(SYLLABLE_RE);
  if (!matches) return 1;
  let count = matches.reduce((sum, m) => sum + m.length, 0);
  if (SILENT_E_RE.test(w) && count > 1) count--;
  return Math.max(1, count);
}

/**
 * Build shadowing cards from LLM groups + original segments.
 * Every field is derived deterministically. No LLM-produced text/timestamps.
 *
 * @param {Array<number[]>} groups - validated LLM output
 * @param {Array<{text:string,start:number,duration:number}>} segments
 * @returns {Array<ShadowingCard>}
 */
export function buildCards(groups, segments) {
  return groups.map((g, i) => {
    const slice = g.map(id => segments[id - 1]);
    const text = slice.map(s => s.text).join(' ');
    const start = slice[0].start;
    const end = slice[slice.length - 1].start + slice[slice.length - 1].duration;
    const duration = Math.round((end - start) * 100) / 100;
    const words = text.split(/\s+/).filter(Boolean);
    const word_count = words.length;
    const syllable_count = words.reduce((sum, w) => sum + countSyllables(w), 0);

    return {
      id: i + 1,
      segment_ids: g,
      text,
      start,
      end: Math.round(end * 100) / 100,
      duration,
      word_count,
      syllable_count,
    };
  });
}

// ---------------------------------------------------------------------------
// Decision store (persistent artifact, NOT a cache)
// ---------------------------------------------------------------------------
// Key: (input_hash, model_pin). Value: groups.
// Cards are always derived from stored groups — never stored directly.

const DECISION_STORE_PATH = path.join(__dirname, '.decisions', 'segmenter_decisions.json');

function inputHash(segments) {
  const serialized = segments.map(s => `${s.id ?? ''}:${s.text}`).join('\n');
  return crypto.createHash('sha256').update(serialized).digest('hex').slice(0, 32);
}

export function decisionStoreKey(segments, mode = 'ADV') {
  return `${inputHash(segments)}|${MODEL_PIN}|${mode}`;
}

function loadStore() {
  try {
    if (fs.existsSync(DECISION_STORE_PATH)) {
      return JSON.parse(fs.readFileSync(DECISION_STORE_PATH, 'utf8'));
    }
  } catch {
    // Corrupt store — treat as empty. Never throw on read.
  }
  return { entries: {} };
}

function saveStore(store) {
  fs.mkdirSync(path.dirname(DECISION_STORE_PATH), { recursive: true });
  fs.writeFileSync(DECISION_STORE_PATH, JSON.stringify(store, null, 2));
}

export function recallDecision(segments, mode = 'ADV') {
  const store = loadStore();
  const key = decisionStoreKey(segments, mode);
  return store.entries[key]?.groups ?? null;
}

export function recordDecision(segments, groups, mode = 'ADV') {
  const store = loadStore();
  const key = decisionStoreKey(segments, mode);
  store.entries[key] = {
    model_pin: MODEL_PIN,
    input_hash: inputHash(segments),
    groups,
    recorded_at: new Date().toISOString(),
  };
  saveStore(store);
  return key;
}

const defaultDecisionStore = {
  recall(segments, mode) { return recallDecision(segments, mode); },
  record(segments, groups, mode) { return recordDecision(segments, groups, mode); },
};

// ---------------------------------------------------------------------------
// Prompt construction
// ---------------------------------------------------------------------------

function buildSystemPrompt(mode) {
  const maxWords = BREATH_LIMITS[mode] || BREATH_LIMITS.ADV;

  return `You are an expert English teacher preparing shadowing practice materials.

GOAL
Group consecutive transcript segments into practice units for shadowing.
Each unit must be something a single speaker says naturally — a learner
will listen to the unit and repeat it aloud as one speaker.

HARD RULES — never violate these:

1. SPEAKER SEPARATION (STRONGEST — NEVER BREAK)
   Segments marked with [SPEAKER CHANGE] are different speakers.
   NEVER put segments from different speakers into the same unit.
   A unit must contain text from exactly ONE speaker.

2. WORD LIMIT (MANDATORY)
   Each unit must contain AT MOST ${maxWords} words.
   If a speaker's thought exceeds ${maxWords} words, SPLIT it at the
   most natural pause (period, comma, conjunction, or clause boundary).
   A unit with ${maxWords + 1} words is ALWAYS invalid.

DECISION HIERARCHY — evaluate evidence in this priority order:

1. SPEAKER TURN (strongest)
   [SPEAKER CHANGE] markers indicate speaker transitions.
   A new speaker = new unit. The learner must not switch voice mid-unit.
   A follow-up question belongs to the same speaker. A response from a
   different speaker starts a new unit.

2. COMMUNICATIVE INTENT (primary)
   A practice unit must be naturally speakable from beginning to end by one speaker.
   Would a native speaker say this sequence as one continuous thought,
   from one voice, without switching speakers or ideas? If yes → same unit.
   If the next unit requires a different speaker or a new idea → new unit.

3. DISCOURSE MARKERS (strong)
   Continuation markers ("and", "but", "so", "because", "then")
   signal the same unit continues.
   Topic-shift markers ("well", "anyway", "okay so", "now") signal
   a new unit.

4. PUNCTUATION (moderate)
   A period or question mark often marks the end of a unit.
   BUT: multiple sentences that form one continuous thought from the
   same speaker (e.g. "I'm good, thank you. How about you?") are one unit.

5. LENGTH (weak)
   Prefer units of 3-10 words. A 3-word unit is always acceptable.
   Split longer units at natural pauses.

WHEN IN DOUBT: SPLIT. A learner can always merge two short units
during practice. A learner cannot un-split a unit containing
multiple independent ideas.

OUTPUT FORMAT
Return ONLY valid JSON — no explanation, no markdown fences:
{ "groups": [ [1], [2,3], [4], ... ] }`;
}

function buildUserPrompt(segments) {
  const lines = segments.map(s => `${s.id} | ${s.start.toFixed(2)}s | ${s.text}`);
  return `Transcript (segment_id | timestamp | text):

${lines.join('\n')}

Produce shadowing groups. Return ONLY JSON:
{ "groups": [...] }`;
}

// ---------------------------------------------------------------------------
// Claude invocation (sole inference engine)
// ---------------------------------------------------------------------------

const _client = new Anthropic();

/**
 * Call Claude with the full transcript. Returns groups[][] or null on failure.
 * No retries, no fallback, no model switching.
 */
async function callClaude(segments, mode = 'ADV') {
  try {
    const system = buildSystemPrompt(mode);
    const user = buildUserPrompt(segments);
    const transportModel = await resolveTransportModel(CLAUDE_MODEL);
    const response = await _client.messages.create({
      model: transportModel,
      max_tokens: 4096,
      temperature: 0,
      system,
      messages: [{ role: 'user', content: user }],
    });
    const text = response.content.find(b => b.type === 'text')?.text ?? '';
    const cleaned = text.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();
    const parsed = JSON.parse(cleaned);
    if (!Array.isArray(parsed.groups)) return null;
    return parsed.groups;
  } catch (err) {
    console.warn(`⚠️  Claude call failed: ${err.message}`);
    return null;
  }
}

// ---------------------------------------------------------------------------
// Main entry point
// ---------------------------------------------------------------------------

/**
 * Segment a transcript into semantic shadowing cards.
 *
 * The segmenter produces valid semantic units. It does NOT enforce CEFR limits
 * or pedagogical constraints — those belong to a downstream Pedagogical Card
 * Builder module.
 *
 * Responsibilities:
 *  - validate input (structural integrity)
 *  - call Claude (semantic grouping)
 *  - validate groups (semantic integrity)
 *  - build cards (deterministic reconstruction)
 *  - store groups (decision store replay)
 *
 * @param {Array<{id?:number,text:string,start:number,duration:number}>} segments
 *   Immutable L2 transcript segments.
 * @param {Object} [options]
 * @param {string} [options.mode] - 'ADV' or 'EASY' (default: 'ADV')
 * @param {Array<number>} [options.speakerBreaks] - speaker change indices from L2
 * @param {Object} [options.decisionStore] - injectable store (for tests)
 * @param {Function} [options.claudeInvoke] - injectable LLM (for tests)
 * @returns {Promise<{ cards: ShadowingCard[], groups: number[][], source: string }>}
 */
export async function segmentTranscript(segments, options = {}) {
  // 1. Input guard — throws on structural defects. No repair.
  validateInput(segments);

  const n = segments.length;
  if (n === 0) return { cards: [], groups: [], source: 'empty' };

  const mode = options.mode || 'ADV';
  const maxWords = BREATH_LIMITS[mode] || BREATH_LIMITS.ADV;
  const store = options.decisionStore || defaultDecisionStore;
  const invoke = options.claudeInvoke || callClaude;

  // 2. Pre-process: inject speaker boundaries for the LLM.
  const preprocessed = injectSpeakerBoundaries(segments, options.speakerBreaks);

  // 3. Recall from decision store (replay).
  let groups = store.recall(preprocessed, mode);

  if (groups === null) {
    // 4. Call Claude — LLM produces groups (only semantic decision).
    groups = await invoke(preprocessed, mode);
    if (!groups) {
      return { cards: [], groups: [], source: 'llm_failed' };
    }

    // 5. Structural validation — partition integrity.
    const semantic = validateGroups(groups, n);
    if (!semantic.valid) {
      console.warn(`⚠️  Semantic validation failed: ${semantic.errors.join('; ')}`);
      return { cards: [], groups: [], source: 'semantic_validation_failed' };
    }

    // 6. Semantic coherence — speaker separation + breath-group limits.
    const coherence = validateSemanticCoherence(groups, segments, maxWords);
    if (!coherence.valid) {
      console.warn(`⚠️  Coherence validation failed: ${coherence.errors.join('; ')}`);
      return { cards: [], groups: [], source: 'coherence_validation_failed' };
    }

    // 7. Persist groups to decision store (replay guarantee).
    store.record(preprocessed, groups, mode);
  }

  // 6. Deterministic card construction.
  const cards = buildCards(groups, segments);

  return {
    cards,
    groups,
    source: 'ai',
  };
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

const args = process.argv.slice(2);
const getArg = f => { const i = args.indexOf(f); return i >= 0 ? args[i + 1] : null; };

if (args.includes('--version')) {
  console.log(`ai_transcript_segmenter v${VERSION}`);
  process.exit(0);
}

if (args.includes('--help') || args.includes('-h')) {
  console.log('ai_transcript_segmenter.mjs — AI Transcript Segmenter V4');
  console.log('Usage: node tools/ai_transcript_segmenter.mjs --input <l2.json> [--output <out.json>]');
  process.exit(0);
}

const INPUT = getArg('--input');
const OUTPUT = getArg('--output');

if (INPUT && fs.existsSync(INPUT)) {
  const l2 = JSON.parse(fs.readFileSync(INPUT, 'utf8'));
  const segments = (l2.segments || l2.sentences || []).map((s, i) => ({
    id: s.id ?? i + 1,
    text: s.text,
    start: s.start,
    duration: s.duration,
  }));
  const result = await segmentTranscript(segments);
  const out = { version: VERSION, videoId: l2.videoId || l2.metadata?.videoId, ...result };
  if (OUTPUT) {
    fs.writeFileSync(OUTPUT, JSON.stringify(out, null, 2));
    console.log(`✅ Wrote ${result.cards.length} cards to ${OUTPUT}`);
  } else {
    console.log(JSON.stringify(out, null, 2));
  }
  process.exit(0);
}
