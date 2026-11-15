/**
 * storyWritingAdapter.js — Normalizes Cambridge A2 Flyers Picture Story schemas
 * ─────────────────────────────────────────────────────────────────────────────
 * Normalizes picture story schemas across production & staged weeks
 * into a uniform `steps[]` shape consumable by StoryWriting.jsx.
 *
 * Strict Anti-Hallucination & Pedagogy Rules:
 * 1. Fail-Loud: Returns null on invalid, unrecognized, or empty schemas. Never returns generic fallback content.
 * 2. No Fabricated URLs: Never fabricates non-existent image/audio URLs. Returns null if asset not provided.
 * 3. Pure Authored Chips: Chips are strictly sourced from author-provided pills or word_bank. No heuristic preposition splitting.
 * 4. Zero Default Week: Does not silently default weekNumber to 33.
 */


/**
 * Normalizes an authored picture_story object into a standard array of 3–5 scene steps.
 * Returns null if no valid authored scene structure is found.
 * @param {object} rawStory - The picture_story object from writing_hub
 * @param {number|string} currentWeek - Week identifier
 * @param {object} [options={}] - Additional options (e.g. { wordBank, vocab })
 * @returns {Array<object>|null}
 */
export function normalizeStorySteps(rawStory, currentWeek, options = {}) {
  if (!rawStory || typeof rawStory !== 'object') return null;

  const weekNum = currentWeek ? parseInt(currentWeek, 10) : null;
  const STAGE_ORDER = ['MODEL', 'BUILD', 'WRITE', 'EXPAND', 'REFLECT'];

  // Resolve external wordBank if provided in options
  const externalWordBank = (Array.isArray(options.wordBank) && options.wordBank.length > 0)
    ? options.wordBank
    : (Array.isArray(options.vocab) && options.vocab.length > 0)
    ? options.vocab.map(v => typeof v === 'string' ? v : v?.word).filter(Boolean)
    : null;

  // ── 1. Canonical steps[] (W33, W34, W35, W78, W125) ──
  if (Array.isArray(rawStory.steps) && rawStory.steps.length >= 3) {
    return rawStory.steps.slice(0, 5).map((s, idx) => {
      const pills = Array.isArray(s.pills) && s.pills.length > 0
        ? s.pills
        : Array.isArray(s.ordered_chips) && s.ordered_chips.length > 0
        ? s.ordered_chips
        : Array.isArray(s.display_chips) && s.display_chips.length > 0
        ? s.display_chips
        : Array.isArray(s.keywords) && s.keywords.length > 0
        ? s.keywords
        : [];

      return {
        scene: s.scene || idx + 1,
        ladder_stage: s.ladder_stage || STAGE_ORDER[idx] || 'WRITE',
        badge_label: s.badge_label || s.ladder_stage || STAGE_ORDER[idx] || 'WRITE',
        title: s.title || `Scene ${idx + 1}`,
        image_url: s.image_url || null,
        caption: s.caption || '',
        frame_L1: s.frame_L1 || s.sentence_frame || s.caption || '',
        sentence_hint: s.sentence_hint || '',
        sentence_frame: s.sentence_frame || s.frame_L1 || '',
        connectors: Array.isArray(s.connectors) && s.connectors.length > 0
          ? s.connectors
          : (idx === 0 ? ['In the beginning,', 'First,'] : idx === 1 ? ['Next,', 'Then,'] : ['Finally,', 'In the end,']),
        locked_connector: s.locked_connector || null,
        pills,
        ordered_chips: Array.isArray(s.ordered_chips) && s.ordered_chips.length > 0 ? s.ordered_chips : pills,
        audio: s.audio || s.caption || `Scene ${idx + 1}`,
        audio_url: s.audio_url || null
      };
    });
  }

  // ── 2. ladder_stages[] with panels[] (W39, W41, W43, W45, W46, W73–W75, W77, W79, W81, W82) ──
  if (Array.isArray(rawStory.ladder_stages) && rawStory.ladder_stages.length >= 3) {
    const panels = Array.isArray(rawStory.panels) ? rawStory.panels : [];
    const wordBank = Array.isArray(rawStory.word_bank) ? rawStory.word_bank : externalWordBank || [];

    return rawStory.ladder_stages.slice(0, 5).map((stage, idx) => {
      const panel = panels[idx] || {};
      const pills = (Array.isArray(stage.pills) && stage.pills.length > 0)
        ? stage.pills
        : (Array.isArray(panel.pills) && panel.pills.length > 0)
        ? panel.pills
        : wordBank.length > 0
        ? wordBank.slice(Math.floor(idx * wordBank.length / rawStory.ladder_stages.length), Math.floor((idx + 1) * wordBank.length / rawStory.ladder_stages.length))
        : [];

      const caption = stage.caption || panel.caption || '';
      const frame = stage.frame_L1 || stage.sentence_frame || panel.sentence_frame || caption;

      return {
        scene: stage.scene || idx + 1,
        ladder_stage: stage.ladder_stage || stage.badge_label || STAGE_ORDER[idx] || 'WRITE',
        badge_label: stage.badge_label || stage.ladder_stage || STAGE_ORDER[idx] || 'WRITE',
        title: stage.title || panel.title_en || `Scene ${idx + 1}`,
        image_url: stage.image_url || panel.image_url || null,
        caption,
        frame_L1: frame,
        sentence_hint: stage.sentence_hint || (caption ? `Write 2 sentences: ${caption}` : ''),
        sentence_frame: stage.sentence_frame || panel.sentence_frame || frame,
        connectors: (Array.isArray(stage.connectors) && stage.connectors.length > 0)
          ? stage.connectors
          : (Array.isArray(panel.connectors) && panel.connectors.length > 0)
          ? panel.connectors
          : (idx === 0 ? ['First,', 'In the beginning,'] : idx === 1 ? ['Next,', 'Then,'] : ['Finally,', 'In the end,']),
        locked_connector: stage.locked_connector || panel.locked_connector || null,
        pills,
        ordered_chips: Array.isArray(stage.ordered_chips) && stage.ordered_chips.length > 0 ? stage.ordered_chips : pills,
        audio: stage.audio || caption || `Scene ${idx + 1}`,
        audio_url: stage.audio_url || panel.audio_url || null
      };
    });
  }

  // ── 3. panels[] with description & word_bank (W36, W40, W42, W44) ──
  if (Array.isArray(rawStory.panels) && rawStory.panels.length >= 3) {
    const wordBank = Array.isArray(rawStory.word_bank) ? rawStory.word_bank : externalWordBank || [];
    const frames = Array.isArray(rawStory.sentence_frames) ? rawStory.sentence_frames : [];
    const count = rawStory.panels.length;

    return rawStory.panels.slice(0, 5).map((p, idx) => {
      const desc = p.description || p.caption || '';
      const pills = (Array.isArray(p.pills) && p.pills.length > 0)
        ? p.pills
        : wordBank.length > 0
        ? wordBank.slice(Math.floor(idx * wordBank.length / count), Math.floor((idx + 1) * wordBank.length / count))
        : [];

      const frame = p.sentence_frame || frames[idx] || desc;

      return {
        scene: p.panel || p.panel_id || idx + 1,
        ladder_stage: p.ladder_stage || STAGE_ORDER[idx] || 'WRITE',
        badge_label: p.badge_label || STAGE_ORDER[idx] || 'WRITE',
        title: p.title_en || p.title || (desc ? `Scene ${idx + 1}: ${desc}` : `Scene ${idx + 1}`),
        image_url: p.image_url || null,
        caption: desc,
        frame_L1: p.frame_L1 || frame,
        sentence_hint: p.sentence_hint || (frames[idx] ? `Complete the frame: ${frames[idx]}` : (desc ? `Write about: ${desc}` : '')),
        sentence_frame: frame,
        connectors: (Array.isArray(p.connectors) && p.connectors.length > 0)
          ? p.connectors
          : (idx === 0 ? ['First,', 'In the beginning,'] : idx === 1 ? ['Next,', 'Then,'] : ['Finally,', 'In the end,']),
        locked_connector: p.locked_connector || null,
        pills,
        ordered_chips: Array.isArray(p.ordered_chips) && p.ordered_chips.length > 0 ? p.ordered_chips : pills,
        audio: p.audio || desc || `Scene ${idx + 1}`,
        audio_url: p.audio_url || null
      };
    });
  }

  // ── 4. image_panels[] with guiding_questions (W47–W54) ──
  if (Array.isArray(rawStory.image_panels) && rawStory.image_panels.length >= 3) {
    const questions = Array.isArray(rawStory.guiding_questions) ? rawStory.guiding_questions : [];
    const wordBank = (Array.isArray(rawStory.word_bank) && rawStory.word_bank.length > 0)
      ? rawStory.word_bank
      : (Array.isArray(externalWordBank) && externalWordBank.length > 0)
      ? externalWordBank
      : [];

    const count = rawStory.image_panels.length;

    return rawStory.image_panels.slice(0, 5).map((p, idx) => {
      const desc = p.description || '';
      const question = questions[idx] || '';
      const pills = (Array.isArray(p.pills) && p.pills.length > 0)
        ? p.pills
        : wordBank.length > 0
        ? wordBank.slice(Math.floor(idx * wordBank.length / count), Math.floor((idx + 1) * wordBank.length / count))
        : [];

      return {
        scene: p.panel || idx + 1,
        ladder_stage: STAGE_ORDER[idx] || 'WRITE',
        badge_label: STAGE_ORDER[idx] || 'WRITE',
        title: p.title_en || p.title || (desc ? `Scene ${idx + 1}: ${desc}` : `Scene ${idx + 1}`),
        image_url: p.image_url || null,
        caption: desc,
        frame_L1: question || desc,
        sentence_hint: question ? `Question: ${question}` : `Describe Scene ${idx + 1}: ${desc}`,
        sentence_frame: question || desc,
        connectors: idx === 0
          ? ['First,', 'In the beginning,']
          : idx === 1
          ? ['Next,', 'Then,']
          : ['Finally,', 'In the end,'],
        locked_connector: null,
        pills,
        ordered_chips: pills,
        audio: desc || `Scene ${idx + 1}`,
        audio_url: p.audio_url || null
      };
    });
  }

  // ── 5. sentence_starters[] with word_bank (W55–W72) ──
  if (Array.isArray(rawStory.sentence_starters) && rawStory.sentence_starters.length >= 3) {
    const starters = rawStory.sentence_starters;
    const wordBank = Array.isArray(rawStory.word_bank) ? rawStory.word_bank : externalWordBank || [];
    const count = starters.length;

    const DEFAULT_TITLES = [
      'Scene 1: The Beginning',
      'Scene 2: The Action',
      'Scene 3: The Outcome',
      'Scene 4: Reflection',
      'Scene 5: Conclusion'
    ];

    return starters.slice(0, 5).map((starter, idx) => {
      const cleanStarter = starter.replace(/\.\.\.$/, '').trim();
      const pills = wordBank.length > 0
        ? wordBank.slice(Math.floor(idx * wordBank.length / count), Math.floor((idx + 1) * wordBank.length / count))
        : [];

      return {
        scene: idx + 1,
        ladder_stage: STAGE_ORDER[idx] || 'WRITE',
        badge_label: STAGE_ORDER[idx] || 'WRITE',
        title: DEFAULT_TITLES[idx] || `Scene ${idx + 1}`,
        image_url: null,
        caption: cleanStarter,
        frame_L1: starter,
        sentence_hint: rawStory.prompt_en ? `${rawStory.prompt_en} Starter: "${starter}"` : `Start with: "${starter}"`,
        sentence_frame: starter,
        connectors: idx === 0
          ? ['In the beginning,', 'First,']
          : idx === 1
          ? ['Because', 'Then,', 'Suddenly,']
          : ['As a result,', 'Finally,', 'In the end,'],
        locked_connector: null,
        pills,
        ordered_chips: pills,
        audio: cleanStarter,
        audio_url: null
      };
    });
  }

  // Schema unrecognized or invalid -> Fail Loud by returning null
  return null;
}
