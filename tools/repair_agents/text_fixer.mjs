/**
 * text_fixer.mjs — Stateless Micro-Agent for S5/S6 Repair
 *
 * Fixes:
 *   S5: Missing terminal punctuation (. ? !)
 *   S6: Non-uppercase sentence start
 *
 * Design:
 *   - Stateless: no conversation history, fresh API call per invocation
 *   - Uses resolveTransportModel() for gateway-aware model selection
 *   - Returns ONLY corrected sentences, no conversational filler
 */

import Anthropic from '@anthropic-ai/sdk';
import { resolveTransportModel } from '../resolve_transport_model.mjs';

const CANONICAL_MODEL = process.env.ANTHROPIC_SMALL_FAST_MODEL || 'claude-haiku-4-5-20251001';

// ─── Client (lazy singleton) ─────────────────────────────────────

let _client = null;

function getClient() {
  if (!_client) {
    _client = new Anthropic();
  }
  return _client;
}

// ─── Core Fix Function ───────────────────────────────────────────

/**
 * Fix S5/S6 issues in the given sentences via Claude.
 *
 * @param {Array<{id: number, text: string}>} failingSentences
 *   Sentences that failed S5 or S6 validation.
 * @param {Array<{id: number, text: string}>> allSentences
 *   All sentences in the script (for context).
 * @returns {Promise<Map<number, string>>} Map of sentence ID → corrected text
 */
export async function fixSentences(failingSentences, allSentences) {
  if (failingSentences.length === 0) return new Map();

  const client = getClient();
  const transportModel = await resolveTransportModel(CANONICAL_MODEL);

  const contextLines = allSentences.map(s => `${s.id}: ${s.text}`);
  const failingIds = new Set(failingSentences.map(s => s.id));

  const userPrompt = `Fix ONLY the sentences marked with [FIX] below.
All other sentences are context — do not modify them.

${contextLines.map(line => {
  const id = parseInt(line.split(':')[0]);
  return failingIds.has(id) ? `[FIX] ${line}` : `      ${line}`;
}).join('\n')}

Return a JSON object mapping ONLY the fixed IDs to corrected text.
No explanation. No markdown fences. Just JSON.`;

  const response = await client.messages.create({
    model: transportModel,
    max_tokens: 2048,
    temperature: 0,
    system: `You are a text quality fixer for English shadowing practice sentences.

RULES:
1. Each sentence MUST end with terminal punctuation: . ? or !
2. Each sentence MUST start with an uppercase letter
3. Do NOT change meaning, merge, or split sentences
4. Do NOT add or remove words — only fix punctuation and capitalization
5. Preserve original sentence boundaries exactly

OUTPUT: Only a JSON object { "id": "fixed text." } for the [FIX] sentences.`,
    messages: [{ role: 'user', content: userPrompt }],
  });

  const text = response.content.find(b => b.type === 'text')?.text ?? '';
  const cleaned = text.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();

  try {
    const parsed = JSON.parse(cleaned);
    const fixes = new Map();
    for (const [idStr, fixedText] of Object.entries(parsed)) {
      const id = parseInt(idStr);
      if (!isNaN(id) && typeof fixedText === 'string') {
        fixes.set(id, fixedText);
      }
    }
    return fixes;
  } catch (e) {
    throw new Error(`TextFixer: failed to parse LLM response as JSON: ${e.message}\nRaw: ${text.slice(0, 200)}`);
  }
}

/**
 * Auto-fix S5/S6 without LLM — deterministic rules for simple cases.
 *
 * @param {Array<{id: number, text: string}>} sentences
 * @returns {Map<number, string>} Map of ID → corrected text
 */
export function autoFixSimple(sentences) {
  const fixes = new Map();

  for (const s of sentences) {
    let text = s.text;
    let changed = false;

    // S6: capitalize first letter
    if (text.length > 0 && text[0] !== text[0].toUpperCase()) {
      text = text[0].toUpperCase() + text.slice(1);
      changed = true;
    }

    // S5: add terminal punctuation if missing
    if (text.length > 0 && !/[.!?]$/.test(text.trim())) {
      text = text.trim() + '.';
      changed = true;
    }

    if (changed) {
      fixes.set(s.id, text);
    }
  }

  return fixes;
}

/**
 * Apply fixes to a script array (mutates in place).
 *
 * @param {Array} script - The script array from shadowing.js
 * @param {Map<number, string>} fixes - Map of sentence ID → corrected text
 * @returns {number} Number of sentences actually modified
 */
export function applyFixes(script, fixes) {
  let modified = 0;
  for (const sentence of script) {
    if (fixes.has(sentence.id)) {
      sentence.text = fixes.get(sentence.id);
      modified++;
    }
  }
  return modified;
}
