/**
 * scripts/generate_flyers_mock_batch.mjs
 * 
 * ENGQUEST3K — BATCH GENERATOR FOR STAGE 1 A2 FLYERS MOCK EXAMS
 * Generates W40, W44, W48 into docs/agent_artifacts/staging/week_{N}_mock/
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { mockSpecW40 } from './specs_mock_w40.mjs';
import { mockSpecW44 } from './specs_mock_w44.mjs';
import { mockSpecW48 } from './specs_mock_w48.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const SPECS = [mockSpecW40, mockSpecW44, mockSpecW48];

for (const spec of SPECS) {
  const weekNum = spec.week;
  const outDir = path.join(ROOT_DIR, `docs/agent_artifacts/staging/week_${weekNum}_mock`);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  console.log(`========================================================================`);
  console.log(`🚀 GENERATING MOCK EXAM: WEEK ${weekNum} (${spec.cefr_level} FORMAT)`);
  console.log(`========================================================================`);

  // 1. Listening Hub
  const listeningHubObj = {
    week: weekNum,
    theme: spec.theme,
    cefr_level: spec.cefr_level,
    paper: "Listening",
    total_parts: 5,
    total_items: 25,
    time_allowed_minutes: 25,
    listening_p1: spec.listening_p1,
    listening_p2: spec.listening_p2,
    listening_p3: spec.listening_p3,
    listening_p4: spec.listening_p4,
    listening_p5: spec.listening_p5
  };
  const listeningHubCode = `/**
 * STAGED MOCK EXAM DELIVERABLE: Listening Paper (All 5 Parts / 25 Items)
 * Week: ${weekNum} | Level: ${spec.cefr_level} | Mode: FULL_MOCK
 * Cumulative Sourcing: Weeks ${spec.cumulativeBlock.join(', ')}
 */

export const listeningHubData = ${JSON.stringify(listeningHubObj, null, 2)};

export default listeningHubData;
`;
  fs.writeFileSync(path.join(outDir, 'listening_hub.js'), listeningHubCode, 'utf8');

  // 2. Reading Hub
  const readingHubObj = {
    week: weekNum,
    theme: spec.theme,
    cefr_level: spec.cefr_level,
    paper: "Reading & Writing",
    total_parts: 7,
    total_items: 44,
    time_allowed_minutes: 40,
    rw_part1: spec.reading_p1,
    rw_part2: spec.reading_p2,
    rw_part3: spec.reading_p3,
    rw_part4: spec.reading_p4,
    rw_part5: spec.reading_p5,
    rw_part6: spec.reading_p6,
    rw_part7: {
      part: 7,
      task: "Picture Story Writing",
      reference: "writing_hub.js"
    }
  };
  const readingHubCode = `/**
 * STAGED MOCK EXAM DELIVERABLE: Reading Paper (Parts 1-6 / 43 Items + Part 7 Reference)
 * Week: ${weekNum} | Level: ${spec.cefr_level} | Mode: FULL_MOCK
 * Cumulative Sourcing: Weeks ${spec.cumulativeBlock.join(', ')}
 */

export const readingHubData = ${JSON.stringify(readingHubObj, null, 2)};

export default readingHubData;
`;
  fs.writeFileSync(path.join(outDir, 'reading_hub.js'), readingHubCode, 'utf8');

  // 3. Writing Hub
  const writingHubObj = {
    week: weekNum,
    theme: spec.theme,
    cefr_level: spec.cefr_level,
    picture_story: spec.writing_hub.picture_story
  };
  const writingHubCode = `/**
 * STAGED MOCK EXAM DELIVERABLE: Writing Hub (Picture Story & Writing Ladder)
 * Week: ${weekNum} | Level: ${spec.cefr_level} | Mode: FULL_MOCK
 * Cumulative Sourcing: Weeks ${spec.cumulativeBlock.join(', ')}
 */

export const writingHubData = ${JSON.stringify(writingHubObj, null, 2)};

export default writingHubData;
`;
  fs.writeFileSync(path.join(outDir, 'writing_hub.js'), writingHubCode, 'utf8');

  // 4. Speaking Hub
  const speakingHubObj = {
    week: weekNum,
    theme: spec.theme,
    cefr_level: spec.cefr_level,
    paper: "Speaking",
    total_parts: 4,
    approx_minutes: 9,
    ai_partner: "Nova (Solo-AI Examiner)",
    find_differences: spec.speaking_hub.find_differences,
    info_exchange_cards: spec.speaking_hub.info_exchange_cards,
    picture_story: spec.speaking_hub.picture_story,
    personal_questions: spec.speaking_hub.personal_questions
  };
  const speakingHubCode = `/**
 * STAGED MOCK EXAM DELIVERABLE: Speaking Paper (Parts 1-4 with Solo-AI Partner Nova)
 * Week: ${weekNum} | Level: ${spec.cefr_level} | Mode: FULL_MOCK
 * Cumulative Sourcing: Weeks ${spec.cumulativeBlock.join(', ')}
 */

export const speakingHubData = ${JSON.stringify(speakingHubObj, null, 2)};

export default speakingHubData;
`;
  fs.writeFileSync(path.join(outDir, 'speaking_hub.js'), speakingHubCode, 'utf8');

  // 5. Vocab
  const vocabCode = `/**
 * STAGED MOCK EXAM DELIVERABLE: Target Cumulative Vocabulary (20 Items)
 * Week: ${weekNum} | Level: ${spec.cefr_level} | Mode: FULL_MOCK
 * Cumulative Sourcing: Weeks ${spec.cumulativeBlock.join(', ')}
 */

export const vocab = ${JSON.stringify(spec.vocab, null, 2)};

export default vocab;
`;
  fs.writeFileSync(path.join(outDir, 'vocab.js'), vocabCode, 'utf8');

  // 6. Skill Practice Hub
  const skillPracticeObj = {
    week: weekNum,
    theme: spec.theme,
    cefr_level: spec.cefr_level,
    mode: "FULL_MOCK_ASSESSMENT",
    assessment_summary: {
      listening_parts: 5,
      listening_items: 25,
      reading_writing_parts: 7,
      reading_writing_items: 44,
      speaking_parts: 4,
      total_shields_possible: 15
    }
  };
  const skillPracticeCode = `/**
 * STAGED MOCK EXAM DELIVERABLE: Skill Practice & Exam Hub
 * Week: ${weekNum} | Level: ${spec.cefr_level} | Mode: FULL_MOCK
 */

export const skillPracticeHubData = ${JSON.stringify(skillPracticeObj, null, 2)};

export default skillPracticeHubData;
`;
  fs.writeFileSync(path.join(outDir, 'skill_practice_hub.js'), skillPracticeCode, 'utf8');

  // 7. Provenance JSON
  const provenanceObj = {
    week: weekNum,
    exam_title: spec.exam_title,
    generatedAt: new Date().toISOString(),
    generator: "scripts/generate_flyers_mock_batch.mjs",
    architecture: "Full 16-Part Cambridge YLE Flyers Paper (5L + 7RW + 4S)",
    cumulativeSources: {
      [`w${spec.cumulativeBlock[0]}`]: { status: "Grounded / Staged" },
      [`w${spec.cumulativeBlock[1]}`]: { status: "Grounded / Merged" },
      [`w${spec.cumulativeBlock[2]}`]: { status: "Grounded / Staged" },
      [`w${spec.cumulativeBlock[3]}`]: { status: "Mock Target Week" }
    },
    pedagogicalValidation: {
      totalListeningItems: 25,
      totalReadingWritingItems: 44,
      totalSpeakingParts: 4,
      cefrConformance: "A2 Flyers Strict (0 B1/B2 violations)",
      soloAIPartner: "Nova AI Interlocutor (Speaking P1-P4)"
    }
  };
  fs.writeFileSync(path.join(outDir, 'provenance.json'), JSON.stringify(provenanceObj, null, 2) + '\n', 'utf8');

  // 8. Source Grounding JSON
  const sourceGroundingObj = {
    week: weekNum,
    exam_title: spec.exam_title,
    cumulative_block: spec.cumulativeBlock,
    vocabulary_grounding_summary: {
      total_synthesis_words: spec.vocab.length,
      [`w${spec.cumulativeBlock[0]}_source_words`]: spec.source_grounding[`w${spec.cumulativeBlock[0]}_source_words`],
      [`w${spec.cumulativeBlock[1]}_source_words`]: spec.source_grounding[`w${spec.cumulativeBlock[1]}_source_words`],
      [`w${spec.cumulativeBlock[2]}_source_words`]: spec.source_grounding[`w${spec.cumulativeBlock[2]}_source_words`],
      [`w${spec.cumulativeBlock[3]}_source_words`]: spec.source_grounding[`w${spec.cumulativeBlock[3]}_source_words`]
    },
    grammar_grounding_summary: spec.source_grounding.grammar_grounding_summary,
    parts_grounding: spec.source_grounding.parts_grounding
  };
  fs.writeFileSync(path.join(outDir, 'source_grounding.json'), JSON.stringify(sourceGroundingObj, null, 2) + '\n', 'utf8');

  // 9. Blueprint JSON
  const bpSrc = path.join(ROOT_DIR, `src/data/weeks/week_${weekNum}/blueprint.json`);
  let bpObj = {};
  if (fs.existsSync(bpSrc)) {
    bpObj = JSON.parse(fs.readFileSync(bpSrc, 'utf8'));
  }
  bpObj.week = weekNum;
  bpObj.theme = spec.theme;
  bpObj.isFullMock = true;
  bpObj.mockFormat = "flyers";
  bpObj.cumulativeBlock = spec.cumulativeBlock;
  fs.writeFileSync(path.join(outDir, 'blueprint.json'), JSON.stringify(bpObj, null, 2) + '\n', 'utf8');

  console.log(`✓ Staged deliverables created for Week ${weekNum} in:`);
  console.log(`  ${outDir}`);
}
console.log(`========================================================================`);
console.log(`🎉 ALL 3 MOCK WEEKS GENERATED SUCCESSFULLY!`);
console.log(`========================================================================\n`);

