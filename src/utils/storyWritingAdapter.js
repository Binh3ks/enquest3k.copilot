/**
 * storyWritingAdapter.js — Normalizes Cambridge A2 Flyers Picture Story schemas
 * ─────────────────────────────────────────────────────────────────────────────
 * Normalizes picture story schemas across all production & staged weeks (W33–W82+)
 * into a uniform `steps[]` shape consumable by StoryWriting.jsx and CreatorStudioZone.jsx.
 *
 * Supported schemas:
 * 1. Standard steps[] (W33, W34, W35, W78, W125)
 * 2. ladder_stages[] + panels[] (W39, W41, W43, W45, W46, W73, W74, W75, W77, W79, W81, W82, etc.)
 * 3. panels[] with description & sentence_frames (W36, W40, W42, W44)
 * 4. image_panels[] with guiding_questions & sample_response (W47–W54)
 * 5. sentence_starters[] with model_story_en & word_bank (W55–W72)
 */

/**
 * Extracts meaningful keyword/collocation chips from descriptive sentences or model texts.
 * Avoids single-letter tokens and filters out common grammar particles unless part of phrases.
 * @param {string} text
 * @param {string[]} [wordBank=[]]
 * @param {number} [maxPills=5]
 * @returns {string[]}
 */
export function extractPillsFromText(text, wordBank = [], maxPills = 5) {
  const pills = [];
  if (!text || typeof text !== 'string') return pills;

  // Split on clause/preposition boundaries to get natural ESL collocations
  const clean = text.replace(/[.,!?;:]/g, ' ').trim();
  const chunks = clean.split(/\s+(?:at|in|on|with|by|near|after|before|to|into|from|for|and|during)\s+/i)
    .map(c => c.trim())
    .filter(c => c.length >= 3 && c.split(/\s+/).length <= 4);

  for (const c of chunks) {
    if (!pills.some(p => p.toLowerCase() === c.toLowerCase())) {
      pills.push(c);
    }
  }

  // Backfill from wordBank
  if (Array.isArray(wordBank)) {
    for (const w of wordBank) {
      if (pills.length >= maxPills) break;
      if (typeof w === 'string' && w.trim().length > 1 && !pills.some(p => p.toLowerCase() === w.trim().toLowerCase())) {
        pills.push(w.trim());
      }
    }
  }

  return pills.slice(0, maxPills);
}

/**
 * Normalizes an authored picture_story object into a standard array of 3–5 scene steps.
 * Returns null if no valid authored scene structure is found.
 * @param {object} rawStory - The picture_story object from writing_hub
 * @param {number} [currentWeek=33] - Week number for fallback media assets
 * @returns {Array<object>|null}
 */
export function normalizeStorySteps(rawStory, currentWeek = 33) {
  if (!rawStory || typeof rawStory !== 'object') return null;

  const weekNum = parseInt(currentWeek, 10) || 33;
  const STAGE_ORDER = ['MODEL', 'BUILD', 'WRITE', 'EXPAND', 'REFLECT'];

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
        image_url: s.image_url || `/images/week${weekNum}/writing_panel_${idx + 1}.png`,
        caption: s.caption || '',
        frame_L1: s.frame_L1 || s.sentence_frame || s.caption || '',
        sentence_hint: s.sentence_hint || '',
        sentence_frame: s.sentence_frame || s.frame_L1 || '',
        connectors: Array.isArray(s.connectors) && s.connectors.length > 0
          ? s.connectors
          : (idx === 0 ? ['In the beginning,', 'First,', 'On that day,'] : idx === 1 ? ['Next,', 'Then,', 'Suddenly,'] : ['Finally,', 'In the end,', 'At last,']),
        locked_connector: s.locked_connector || null,
        pills,
        ordered_chips: Array.isArray(s.ordered_chips) && s.ordered_chips.length > 0 ? s.ordered_chips : pills,
        audio: s.audio || s.caption || `Scene ${idx + 1}`,
        audio_url: s.audio_url || `/audio/week${weekNum}/scene_${idx + 1}.mp3`
      };
    });
  }

  // ── 2. ladder_stages[] with panels[] (W39, W41, W43, W45, W46, W73, etc.) ──
  if (Array.isArray(rawStory.ladder_stages) && rawStory.ladder_stages.length >= 3) {
    const panels = Array.isArray(rawStory.panels) ? rawStory.panels : [];
    const wordBank = Array.isArray(rawStory.word_bank) ? rawStory.word_bank : [];

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
        image_url: stage.image_url || panel.image_url || `/images/week${weekNum}/writing_panel_${idx + 1}.png`,
        caption,
        frame_L1: frame,
        sentence_hint: stage.sentence_hint || (caption ? `Write 2 sentences: ${caption}` : ''),
        sentence_frame: stage.sentence_frame || panel.sentence_frame || frame,
        connectors: (Array.isArray(stage.connectors) && stage.connectors.length > 0)
          ? stage.connectors
          : (Array.isArray(panel.connectors) && panel.connectors.length > 0)
          ? panel.connectors
          : (idx === 0 ? ['First,', 'In the beginning,', 'On that day,'] : idx === 1 ? ['Next,', 'Then,', 'Also,'] : ['Finally,', 'In the end,', 'At last,']),
        locked_connector: stage.locked_connector || panel.locked_connector || null,
        pills,
        ordered_chips: Array.isArray(stage.ordered_chips) && stage.ordered_chips.length > 0 ? stage.ordered_chips : pills,
        audio: stage.audio || caption || `Scene ${idx + 1}`,
        audio_url: stage.audio_url || `/audio/week${weekNum}/scene_${idx + 1}.mp3`
      };
    });
  }

  // ── 3. panels[] with description (W36, W40, W42, W44) ──
  if (Array.isArray(rawStory.panels) && rawStory.panels.length >= 3) {
    const wordBank = Array.isArray(rawStory.word_bank) ? rawStory.word_bank : [];
    const frames = Array.isArray(rawStory.sentence_frames) ? rawStory.sentence_frames : [];
    const count = rawStory.panels.length;

    return rawStory.panels.slice(0, 5).map((p, idx) => {
      const desc = p.description || p.caption || '';
      const bankSlice = wordBank.slice(Math.floor(idx * wordBank.length / count), Math.floor((idx + 1) * wordBank.length / count));
      const pills = (Array.isArray(p.pills) && p.pills.length > 0)
        ? p.pills
        : (desc ? extractPillsFromText(desc, bankSlice) : bankSlice);

      const frame = p.sentence_frame || frames[idx] || desc;

      return {
        scene: p.panel || p.panel_id || idx + 1,
        ladder_stage: p.ladder_stage || STAGE_ORDER[idx] || 'WRITE',
        badge_label: p.badge_label || STAGE_ORDER[idx] || 'WRITE',
        title: p.title_en || p.title || (desc ? `Scene ${idx + 1}: ${desc.slice(0, 32)}...` : `Scene ${idx + 1}`),
        image_url: p.image_url || `/images/week${weekNum}/writing_panel_${idx + 1}.png`,
        caption: desc,
        frame_L1: p.frame_L1 || frame,
        sentence_hint: p.sentence_hint || (frames[idx] ? `Complete the frame: ${frames[idx]}` : (desc ? `Write about: ${desc}` : '')),
        sentence_frame: frame,
        connectors: (Array.isArray(p.connectors) && p.connectors.length > 0)
          ? p.connectors
          : (idx === 0 ? ['First,', 'In the beginning,', 'On that day,'] : idx === 1 ? ['Next,', 'Then,', 'Meanwhile,'] : ['Finally,', 'In the end,', 'At last,']),
        locked_connector: p.locked_connector || null,
        pills,
        ordered_chips: Array.isArray(p.ordered_chips) && p.ordered_chips.length > 0 ? p.ordered_chips : pills,
        audio: p.audio || desc || `Scene ${idx + 1}`,
        audio_url: p.audio_url || `/audio/week${weekNum}/scene_${idx + 1}.mp3`
      };
    });
  }

  // ── 4. image_panels[] with guiding_questions (W47–W54) ──
  if (Array.isArray(rawStory.image_panels) && rawStory.image_panels.length >= 3) {
    const questions = Array.isArray(rawStory.guiding_questions) ? rawStory.guiding_questions : [];
    const sampleResp = rawStory.sample_response || '';
    const sampleSentences = typeof sampleResp === 'string' ? sampleResp.split(/(?<=[.!?])\s+/).filter(Boolean) : [];
    const wordBank = Array.isArray(rawStory.word_bank) ? rawStory.word_bank : [];

    return rawStory.image_panels.slice(0, 5).map((p, idx) => {
      const desc = p.description || '';
      const question = questions[idx] || '';
      const sampleSent = sampleSentences[idx] || '';
      const pills = (Array.isArray(p.pills) && p.pills.length > 0)
        ? p.pills
        : extractPillsFromText(desc, [...wordBank, ...extractPillsFromText(sampleSent)]);

      return {
        scene: p.panel || idx + 1,
        ladder_stage: STAGE_ORDER[idx] || 'WRITE',
        badge_label: STAGE_ORDER[idx] || 'WRITE',
        title: p.title || `Scene ${idx + 1}: ${desc.slice(0, 32)}...`,
        image_url: p.image_url || `/images/week${weekNum}/writing_panel_${idx + 1}.png`,
        caption: desc,
        frame_L1: question || desc,
        sentence_hint: question ? `Question: ${question}` : `Describe Scene ${idx + 1}: ${desc}`,
        sentence_frame: question || desc,
        connectors: idx === 0
          ? ['First,', 'On that day,', 'In the beginning,']
          : idx === 1
          ? ['Next,', 'Then,', 'While,']
          : ['Finally,', 'In the end,', 'At last,'],
        locked_connector: null,
        pills,
        ordered_chips: pills,
        audio: desc || `Scene ${idx + 1}`,
        audio_url: p.audio_url || `/audio/week${weekNum}/scene_${idx + 1}.mp3`
      };
    });
  }

  // ── 5. sentence_starters[] with model_story_en & word_bank (W55–W72) ──
  if (Array.isArray(rawStory.sentence_starters) && rawStory.sentence_starters.length >= 3) {
    const starters = rawStory.sentence_starters;
    const wordBank = Array.isArray(rawStory.word_bank) ? rawStory.word_bank : [];
    const modelStory = rawStory.model_story_en || rawStory.model_story || '';
    const modelSentences = typeof modelStory === 'string' ? modelStory.split(/(?<=[.!?])\s+/).filter(Boolean) : [];
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
      const bankSlice = wordBank.slice(Math.floor(idx * wordBank.length / count), Math.floor((idx + 1) * wordBank.length / count));
      const modelSent = modelSentences[idx] || '';
      const pills = extractPillsFromText(cleanStarter, [...bankSlice, ...extractPillsFromText(modelSent)]);

      return {
        scene: idx + 1,
        ladder_stage: STAGE_ORDER[idx] || 'WRITE',
        badge_label: STAGE_ORDER[idx] || 'WRITE',
        title: DEFAULT_TITLES[idx] || `Scene ${idx + 1}`,
        image_url: `/images/week${weekNum}/writing_panel_${idx + 1}.png`,
        caption: cleanStarter,
        frame_L1: starter,
        sentence_hint: rawStory.prompt_en ? `${rawStory.prompt_en} Starter: "${starter}"` : `Start with: "${starter}"`,
        sentence_frame: starter,
        connectors: idx === 0
          ? ['In the beginning,', 'First,', 'When']
          : idx === 1
          ? ['Because', 'Then,', 'Suddenly,', 'Next,']
          : ['As a result,', 'Finally,', 'In the end,', 'So'],
        locked_connector: null,
        pills,
        ordered_chips: pills,
        audio: cleanStarter,
        audio_url: `/audio/week${weekNum}/scene_${idx + 1}.mp3`
      };
    });
  }

  // ── 6. Fallback: split model_sentence or sample_response into at least 3 scenes ──
  const narrative = rawStory.model_sentence || rawStory.model_story_en || rawStory.model_story || rawStory.sample_response;
  if (typeof narrative === 'string') {
    const sentences = narrative.split(/(?<=[.!?])\s+/).map(s => s.trim()).filter(Boolean);
    if (sentences.length >= 3) {
      const wordBank = Array.isArray(rawStory.word_bank) ? rawStory.word_bank : [];
      const count = Math.min(5, sentences.length);
      return sentences.slice(0, count).map((sent, idx) => {
        const bankSlice = wordBank.slice(Math.floor(idx * wordBank.length / count), Math.floor((idx + 1) * wordBank.length / count));
        const pills = extractPillsFromText(sent, bankSlice);
        return {
          scene: idx + 1,
          ladder_stage: STAGE_ORDER[idx] || 'WRITE',
          badge_label: STAGE_ORDER[idx] || 'WRITE',
          title: `Scene ${idx + 1}`,
          image_url: `/images/week${weekNum}/writing_panel_${idx + 1}.png`,
          caption: sent,
          frame_L1: sent,
          sentence_hint: `Describe Scene ${idx + 1} based on: "${sent}"`,
          sentence_frame: sent,
          connectors: idx === 0 ? ['First,', 'In the beginning,'] : idx === 1 ? ['Next,', 'Then,'] : ['Finally,', 'In the end,'],
          locked_connector: null,
          pills,
          ordered_chips: pills,
          audio: sent,
          audio_url: `/audio/week${weekNum}/scene_${idx + 1}.mp3`
        };
      });
    }
  }

  return null;
}
