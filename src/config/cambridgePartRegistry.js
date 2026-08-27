/**
 * Cambridge Part Registry
 * ────────────────────────────────────────────────────────────────────────────
 * SINGLE SOURCE OF TRUTH for all 16 Cambridge A2 Flyers Parts.
 *
 * Domain model:
 *   Cambridge Part  = atomic exam task (16 Parts: L1–L5, R1–R7, S1–S4)
 *   Shield          = Cambridge PAPER performance score (0–5 per Paper, max 15)
 *                     Shield ≠ Cambridge Part.
 *
 * Papers → Shield scoring:
 *   Listening Paper:          5 Parts (L1–L5)  → 0–5 Shields
 *   Reading & Writing Paper:  7 Parts (R1–R7)  → 0–5 Shields
 *   Speaking Paper:           4 Parts (S1–S4)  → 0–5 Shields
 *   TOTAL MAXIMUM:                               15 Shields
 *
 * Do NOT equate Part count (16) with Shield count (max 15).
 */

// ── Paper identifiers ─────────────────────────────────────────────────────────
export const PAPER = {
  LISTENING:          'Listening',
  READING_WRITING:    'Reading & Writing',
  SPEAKING:           'Speaking',
};

// ── Component identifier keys (map to actual JSX imports in BossBattleZone) ──
export const COMPONENT_KEY = {
  SVG_LINE_MATCHER:          'SVGLineMatcher',
  NOTEPAD_NOTE_COMPLETER:    'NotepadNoteCompleter',
  VISUAL_MATCHING_AH:        'VisualMatchingAH',
  MULTIPLE_CHOICE_3PIC:      'MultipleChoice3Pic',
  SVG_COLOR_AND_WRITE:       'SVGColorAndWrite',
  WORD_BANK_MATCHING_GRID:   'WordBankMatchingGrid',
  DIALOGUE_AH_COMPLETER:     'DialogueAHCompleter',
  RW_PART3_CLOZE_WITH_TITLE: 'RWPart3ClozeWithTitle',
  INLINE_TEXT_CLOZE:         'InlineTextClozeDropdown',
  TEXT_EXTRACTION_COMPLETER: 'TextExtractionCompleter',
  OPEN_CLOZE_COMPLETER:      'OpenClozeCompleter',
  STORY_WRITING:             'StoryWriting',
  FIND_DIFFERENCES:          'FindDifferencesInteractive',
  INFO_EXCHANGE_P2:          'InformationExchangeP2',
  PICTURE_STORY:             'PictureStoryContinuation',
  PERSONAL_QUESTIONS:        'PersonalQuestionsCompleter',
};

// ── Registry: all 16 Cambridge A2 Flyers Parts ──────────────────────────────
export const CAMBRIDGE_PART_REGISTRY = {

  // ── Listening Paper (5 Parts) ────────────────────────────────────────────
  list_p1: {
    partId:       'list_p1',
    paper:        PAPER.LISTENING,
    partNumber:   1,
    displayName:  'Listening Part 1: Draw Lines',
    shortLabel:   'L1 · Draw Lines',
    componentKey: COMPONENT_KEY.SVG_LINE_MATCHER,
    bossDataPath: 'listening.p1',
  },
  list_p2: {
    partId:       'list_p2',
    paper:        PAPER.LISTENING,
    partNumber:   2,
    displayName:  'Listening Part 2: Note Completion',
    shortLabel:   'L2 · Note Completion',
    componentKey: COMPONENT_KEY.NOTEPAD_NOTE_COMPLETER,
    bossDataPath: 'listening.p2',
  },
  list_p3: {
    partId:       'list_p3',
    paper:        PAPER.LISTENING,
    partNumber:   3,
    displayName:  'Listening Part 3: Match A–H',
    shortLabel:   'L3 · Match A–H',
    componentKey: COMPONENT_KEY.VISUAL_MATCHING_AH,
    bossDataPath: 'listening.p3',
  },
  list_p4: {
    partId:       'list_p4',
    paper:        PAPER.LISTENING,
    partNumber:   4,
    displayName:  'Listening Part 4: 3-Picture Quiz',
    shortLabel:   'L4 · 3-Picture Quiz',
    componentKey: COMPONENT_KEY.MULTIPLE_CHOICE_3PIC,
    bossDataPath: 'listening.p4',
  },
  list_p5: {
    partId:       'list_p5',
    paper:        PAPER.LISTENING,
    partNumber:   5,
    displayName:  'Listening Part 5: Colour & Write',
    shortLabel:   'L5 · Colour & Write',
    componentKey: COMPONENT_KEY.SVG_COLOR_AND_WRITE,
    bossDataPath: 'listening.p5',
  },

  // ── Reading & Writing Paper (7 Parts) ────────────────────────────────────
  rw_p1: {
    partId:       'rw_p1',
    paper:        PAPER.READING_WRITING,
    partNumber:   1,
    displayName:  'Reading & Writing Part 1: Word Bank Match',
    shortLabel:   'R1 · Word Bank',
    componentKey: COMPONENT_KEY.WORD_BANK_MATCHING_GRID,
    bossDataPath: 'readingWriting.p1',
  },
  rw_p2: {
    partId:       'rw_p2',
    paper:        PAPER.READING_WRITING,
    partNumber:   2,
    displayName:  'Reading & Writing Part 2: Dialogue A–H',
    shortLabel:   'R2 · Dialogue A–H',
    componentKey: COMPONENT_KEY.DIALOGUE_AH_COMPLETER,
    bossDataPath: 'readingWriting.p2',
  },
  rw_p3: {
    partId:       'rw_p3',
    paper:        PAPER.READING_WRITING,
    partNumber:   3,
    displayName:  'Reading & Writing Part 3: Cloze Story & Title',
    shortLabel:   'R3 · Cloze Story',
    componentKey: COMPONENT_KEY.RW_PART3_CLOZE_WITH_TITLE,
    bossDataPath: 'readingWriting.p3',
  },
  rw_p4: {
    partId:       'rw_p4',
    paper:        PAPER.READING_WRITING,
    partNumber:   4,
    displayName:  'Reading & Writing Part 4: Text Cloze',
    shortLabel:   'R4 · Text Cloze',
    componentKey: COMPONENT_KEY.INLINE_TEXT_CLOZE,
    bossDataPath: 'readingWriting.p4',
  },
  rw_p5: {
    partId:       'rw_p5',
    paper:        PAPER.READING_WRITING,
    partNumber:   5,
    displayName:  'Reading & Writing Part 5: Story Detective',
    shortLabel:   'R5 · Story Detective',
    componentKey: COMPONENT_KEY.TEXT_EXTRACTION_COMPLETER,
    bossDataPath: 'readingWriting.p5',
  },
  rw_p6: {
    partId:       'rw_p6',
    paper:        PAPER.READING_WRITING,
    partNumber:   6,
    displayName:  'Reading & Writing Part 6: Open Cloze',
    shortLabel:   'R6 · Open Cloze',
    componentKey: COMPONENT_KEY.OPEN_CLOZE_COMPLETER,
    bossDataPath: 'readingWriting.p6',
  },
  rw_p7: {
    partId:       'rw_p7',
    paper:        PAPER.READING_WRITING,
    partNumber:   7,
    displayName:  'Reading & Writing Part 7: Story Writing',
    shortLabel:   'R7 · Story Writing',
    componentKey: COMPONENT_KEY.STORY_WRITING,
    bossDataPath: 'readingWriting.p7',
  },

  // ── Speaking Paper (4 Parts) ─────────────────────────────────────────────
  spk_p1: {
    partId:       'spk_p1',
    paper:        PAPER.SPEAKING,
    partNumber:   1,
    displayName:  'Speaking Part 1: Find Differences',
    shortLabel:   'S1 · Find Differences',
    componentKey: COMPONENT_KEY.FIND_DIFFERENCES,
    bossDataPath: 'speaking.p1_findDiff',
  },
  spk_p2: {
    partId:       'spk_p2',
    paper:        PAPER.SPEAKING,
    partNumber:   2,
    displayName:  'Speaking Part 2: Ask & Answer',
    shortLabel:   'S2 · Ask & Answer',
    componentKey: COMPONENT_KEY.INFO_EXCHANGE_P2,
    bossDataPath: 'speaking.p2_cueCard',
  },
  spk_p3: {
    partId:       'spk_p3',
    paper:        PAPER.SPEAKING,
    partNumber:   3,
    displayName:  'Speaking Part 3: Picture Story',
    shortLabel:   'S3 · Picture Story',
    componentKey: COMPONENT_KEY.PICTURE_STORY,
    bossDataPath: 'speaking.p3_pictureStory',
  },
  spk_p4: {
    partId:       'spk_p4',
    paper:        PAPER.SPEAKING,
    partNumber:   4,
    displayName:  'Speaking Part 4: Personal Questions',
    shortLabel:   'S4 · Personal Questions',
    componentKey: COMPONENT_KEY.PERSONAL_QUESTIONS,
    bossDataPath: 'speaking.p4_personalQs',
  },
};

// ── Ordered list of all 16 Part IDs (authoritative) ─────────────────────────
export const ALL_PART_IDS = [
  'list_p1', 'list_p2', 'list_p3', 'list_p4', 'list_p5',
  'rw_p1', 'rw_p2', 'rw_p3', 'rw_p4', 'rw_p5', 'rw_p6', 'rw_p7',
  'spk_p1', 'spk_p2', 'spk_p3', 'spk_p4',
];

// ── Convenience helpers ──────────────────────────────────────────────────────

/**
 * Look up a Part by ID.
 * @param {string} partId
 * @returns {object|null}
 */
export function getPart(partId) {
  return CAMBRIDGE_PART_REGISTRY[partId] || null;
}

/**
 * All 16 Parts as an ordered array.
 * Used by Full Mock to build the complete task list.
 */
export function getAllParts() {
  return ALL_PART_IDS.map(id => CAMBRIDGE_PART_REGISTRY[id]);
}

/**
 * Parts belonging to a specific Paper.
 * @param {string} paper - Use PAPER.LISTENING | PAPER.READING_WRITING | PAPER.SPEAKING
 */
export function getPartsByPaper(paper) {
  return ALL_PART_IDS
    .map(id => CAMBRIDGE_PART_REGISTRY[id])
    .filter(p => p.paper === paper);
}

export default CAMBRIDGE_PART_REGISTRY;
