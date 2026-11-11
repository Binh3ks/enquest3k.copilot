/**
 * Station 2 & Action Lab Schema Adapters
 * ──────────────────────────────────────────────────────────────────────────────
 * Normalizes schema variants across production weeks (W33–W125+) without
 * breaking the W33–W34 Golden Standard or requiring bulk rewrites of 14+ week
 * data files.
 */

/**
 * Parses a numeric value from a number or leading numeric string (e.g. "80 photographs" -> 80).
 * Preserves 0 as a valid number instead of treating it as falsy.
 * @param {unknown} val
 * @returns {number|null}
 */
export function parseNumericValue(val) {
  if (typeof val === 'number') {
    return Number.isFinite(val) ? val : null;
  }
  if (typeof val === 'string') {
    const trimmed = val.trim();
    if (!trimmed) return null;
    const match = trimmed.match(/^-?\d+(?:\.\d+)?/);
    if (!match) return null;
    const parsed = Number(match[0]);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

/**
 * Resolves the authoritative numeric answer from a singapore_math item across all
 * observed schemas (`correctAnswer`, `answer_value`, `target_answer`, `answer`).
 * Returns null if no numeric answer field is present (never defaults silently to 10).
 * @param {object} q
 * @returns {number|null}
 */
export function resolveNumericAnswer(q) {
  if (!q || typeof q !== 'object') return null;
  const candidates = [q.correctAnswer, q.answer_value, q.target_answer, q.answer];
  for (const candidate of candidates) {
    const parsed = parseNumericValue(candidate);
    if (parsed !== null) return parsed;
  }
  return null;
}

/**
 * Normalizes `modelData` so `BarModelSVG` renders both W35/W38/W125 and W39–W82
 * (`type` on question root, `total`/`difference` + `unit` on `modelData`) accurately.
 * @param {object} q
 * @returns {object|null}
 */
export function normalizeBarModelData(q) {
  if (!q?.modelData || typeof q.modelData !== 'object') return null;
  const md = q.modelData;
  const unitSuffix = md.unit ? ` ${md.unit}` : q.unit ? ` ${q.unit}` : '';
  const totalLabel = md.totalLabel !== undefined
    ? md.totalLabel
    : (md.total !== undefined && md.total !== null ? `${md.total}${unitSuffix}` : '');
  const differenceLabel = md.differenceLabel !== undefined
    ? md.differenceLabel
    : (md.difference !== undefined && md.difference !== null ? `${md.difference}${unitSuffix}` : '');

  return {
    ...md,
    type: md.type || q.type || 'part_whole',
    totalLabel,
    differenceLabel,
  };
}

/**
 * Normalizes one Singapore Bar Model item for `BarModelQuest`.
 * @param {object} q
 * @param {number} idx
 * @param {number} weekNumber
 */
export function normalizeBarModelQuestion(q, idx = 0, weekNumber = 33) {
  const hintFromSteps = Array.isArray(q?.steps) && q.steps.length > 0 ? q.steps.join(' ') : '';
  return {
    id: q?.id || idx + 1,
    title: q?.title || `Problem ${idx + 1}: Singapore Bar Model`,
    problemText: q?.problemText || q?.problem_en || q?.text || q?.question || 'Solve the Bar Model problem below:',
    storyContext: q?.storyContext || '',
    correctAnswer: resolveNumericAnswer(q),
    svg_url: q?.svg_url || q?.bar_model_svg || `/images/week${weekNumber}/barmodel_w${weekNumber}_adv_p${idx + 1}.svg`,
    modelData: normalizeBarModelData(q),
    hintText: q?.hintText || hintFromSteps || 'Check the bar model diagram to calculate the target answer!',
    unit: q?.unit || q?.modelData?.unit || '',
  };
}

function escapeRegExp(str) {
  return String(str).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Derives an interactive cloze prompt with blanks for MCQ grammar drills.
 * Supports pre-blanked `prompt` (`W35/W38/W78/W125`) and full-sentence `{ sentence, answer }` (`W39–W82`),
 * including split correlative answers such as `"Yes, but"`.
 * @param {object} drill
 * @returns {string}
 */
export function buildBlankedPrompt(drill) {
  if (!drill || typeof drill !== 'object') return '';
  if (typeof drill.prompt === 'string' && drill.prompt.trim().length > 0) {
    return drill.prompt.trim();
  }
  const sentence = typeof drill.sentence === 'string' ? drill.sentence.trim() : '';
  const answer = drill.answer !== undefined && drill.answer !== null ? String(drill.answer).trim() : '';
  if (!sentence) return answer ? 'Choose the correct grammar option:' : '';
  if (!answer) return sentence;

  // 1. Whole-phrase word-boundary replace (case-insensitive)
  const wordRegex = new RegExp(`\\b${escapeRegExp(answer)}\\b`, 'i');
  if (wordRegex.test(sentence)) {
    return sentence.replace(wordRegex, '______');
  }

  // 2. Exact literal substring replace (handles leading/trailing punctuation)
  const lowerIdx = sentence.toLowerCase().indexOf(answer.toLowerCase());
  if (lowerIdx !== -1) {
    return `${sentence.slice(0, lowerIdx)}______${sentence.slice(lowerIdx + answer.length)}`;
  }

  // 3. Split correlative structures (e.g. "Yes, but" -> "___, ... ___ ...")
  const parts = answer.split(/\s*(?:,|\.{3})\s*/).map(p => p.trim()).filter(Boolean);
  if (parts.length > 1) {
    let masked = sentence;
    let searchFrom = 0;
    let replacedCount = 0;
    for (const part of parts) {
      const slice = masked.slice(searchFrom);
      const partRegex = new RegExp(`\\b${escapeRegExp(part)}\\b`, 'i');
      const m = slice.match(partRegex);
      if (m && m.index !== undefined) {
        const absStart = searchFrom + m.index;
        masked = `${masked.slice(0, absStart)}___${masked.slice(absStart + m[0].length)}`;
        searchFrom = absStart + 3;
        replacedCount++;
      }
    }
    if (replacedCount > 0) return masked;
  }

  return `${sentence} (Fill: ______)`;
}

/**
 * Normalizes a `grammar_drills` entry into either `'word_blocks'` (W33–W34)
 * or `'mcq'` (W35, W38–W82, W125).
 * @param {object} drill
 * @param {number} idx
 */
export function normalizeGrammarDrill(drill, idx = 0) {
  if (!drill || typeof drill !== 'object') return null;
  if (Array.isArray(drill.word_blocks) && drill.word_blocks.length > 0) {
    return {
      ...drill,
      mode: 'word_blocks',
      id: drill.id || idx + 1,
    };
  }
  if (Array.isArray(drill.options) && drill.options.length > 0 && drill.answer !== undefined && drill.answer !== null) {
    return {
      ...drill,
      mode: 'mcq',
      id: drill.id || idx + 1,
      promptText: buildBlankedPrompt(drill),
      options: drill.options,
      answer: String(drill.answer),
      explanation: drill.explanation || '',
    };
  }
  return null;
}

/**
 * Formats snake_case target identifiers (`magnetic_north` -> `Magnetic North`) for Action Lab UI.
 * @param {string} targetId
 * @returns {string}
 */
export function formatScienceTargetName(targetId) {
  if (!targetId) return 'Target Zone';
  return String(targetId)
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (ch) => ch.toUpperCase());
}

/**
 * Normalizes `science_lab` data into an ordered array of stages with explicit `mode`:
 * - `'diagram_dnd'` (`W33–W34` stages/zones/targets/labels — preserved verbatim)
 * - `'match_pairs'` (`W39–W82` scenarios containing `{ label, target }` items, supporting N:1 buckets)
 * - `'inquiry_steps'` (`W35, W38, W78, W125` scenarios with `{ stage, title, instruction }`)
 * @param {object|null} scienceData
 * @returns {Array<object>}
 */
export function normalizeScienceLabStages(scienceData) {
  if (!scienceData || typeof scienceData !== 'object') return [];

  if (Array.isArray(scienceData.stages) && scienceData.stages.length > 0) {
    return scienceData.stages.map((s, idx) => ({
      ...s,
      stageNumber: s.stageNumber || idx + 1,
      mode: 'diagram_dnd',
    }));
  }

  if (Array.isArray(scienceData.scenarios) && scienceData.scenarios.length > 0) {
    return scienceData.scenarios.map((sc, idx) => {
      const items = Array.isArray(sc?.items) ? sc.items : [];
      if (items.length > 0) {
        const uniqueTargets = [...new Set(items.map((it) => it.target).filter(Boolean))];
        const targetBuckets = uniqueTargets.map((tId) => ({
          id: tId,
          name: formatScienceTargetName(tId),
        }));
        const pairs = items.map((it, pIdx) => ({
          id: `sc_${idx}_item_${pIdx}`,
          label: it.label,
          targetId: it.target,
        }));
        return {
          id: sc.id || `scenario_${sc.stage || idx + 1}`,
          stageNumber: sc.stage || idx + 1,
          mode: 'match_pairs',
          experimentTitle: scienceData.title_en || scienceData.experimentTitle || 'Interactive Action Lab',
          title: sc.title || `Scenario ${idx + 1}`,
          diagramType: sc.diagram_type || '',
          explanation: sc.instruction || scienceData.title_en || 'Match each item to its correct target category.',
          instruction: sc.instruction || '',
          targetBuckets,
          pairs,
        };
      }

      return {
        id: sc.id || `scenario_${sc.stage || idx + 1}`,
        stageNumber: sc.stage || idx + 1,
        mode: 'inquiry_steps',
        experimentTitle: scienceData.title_en || scienceData.experimentTitle || 'Interactive Action Lab',
        title: sc.title || `Scenario ${idx + 1}`,
        explanation: sc.instruction || 'Review the task instruction and confirm your investigation step.',
        instruction: sc.instruction || '',
      };
    });
  }

  const hasSingleDiagram = (Array.isArray(scienceData.zones) && scienceData.zones.length > 0)
    || (Array.isArray(scienceData.targets) && scienceData.targets.length > 0);
  if (!hasSingleDiagram) return [];

  return [{
    id: scienceData.id || 'stage_1',
    stageNumber: 1,
    mode: 'diagram_dnd',
    title: scienceData.title_en || scienceData.experimentTitle || 'Interactive Action Lab',
    experimentTitle: scienceData.title_en || scienceData.experimentTitle || 'Interactive Action Lab',
    diagramImage: scienceData.background_image || scienceData.diagramImage || '',
    explanation: scienceData.description_en || scienceData.explanation || 'Interactive action exploration.',
    zones: scienceData.zones || [],
    targets: scienceData.targets || [],
    labels: scienceData.labels || [],
  }];
}

