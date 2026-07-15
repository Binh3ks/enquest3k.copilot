/**
 * generate_sessions.mjs
 * 
 * Generates sessions_2, sessions_3, sessions_5 for all weeks in lessonPlans.json.
 * 
 * Strategy:
 *  - sessions_3 (default): If already present with content → keep. If missing → generate from quick_ref + methodology + vocab.
 *  - sessions_2: Merge S1+S2 content logically into Session A (Input + Grammar), S3 into Session B (Production + Review)
 *  - sessions_5: Split each of the 3 sessions into parts; assign 5 ~equal mini-sessions
 * 
 * Each session always has these parts (PARTS 1-9):
 *   Header | Spiral Review | PART 1: Reading | PART 2: Vocab | PART 3: Sentence Building
 *   PART 4: Listening | PART 5: Error Correction | PART 6: STEM/CLIL | PART 7: Production | PART 8: Portfolio | PART 9: Homework
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_PATH = path.join(__dirname, '../public/data/lessonPlans.json');

const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getTheme(w) {
  const qr = w.quick_ref || {};
  return qr['Unit / Theme'] || qr['Theme'] || qr.Theme || w.unit_theme || `Week ${w.week}`;
}

function getGrammar(w) {
  const qr = w.quick_ref || {};
  return qr['Grammar Focus'] || 'Grammar Focus';
}

function getPattern(w) {
  const qr = w.quick_ref || {};
  return qr['Key Pattern'] || '"[subject] + [verb]."';
}

function getSTEM(w) {
  const qr = w.quick_ref || {};
  return qr['STEM/CLIL Topic'] || 'Science / CLIL Topic';
}

function getSpiralReview(w) {
  const qr = w.quick_ref || {};
  return qr['Spiral Review'] || 'Review previous grammar patterns';
}

function getVcTargets(w, sessNum) {
  const qr = w.quick_ref || {};
  const targets = qr['VC Word Targets'] || '';
  // Extract S1/S2/S3 targets
  const match = targets.match(new RegExp(`S${sessNum}=(\\d+)w`));
  return match ? match[1] : '100';
}

// Get vocab words
function getVocabWords(w) {
  return (w.vocab_tiers || []).map(v => ({
    word: v.Word || v.word || '',
    vi: v.Vietnamese || v.vietnamese || '',
    colloc: v['Key Collocation(s)'] || v.collocations || '',
    trick: v['Memory Trick'] || v.memory_trick || '',
    base: v.Base || v.base || '',
    pos: v.POS || v.pos || 'Verb',
  })).filter(v => v.word);
}

// Get reading passage from existing session or generate placeholder
function getReadingPassage(w, sessNum) {
  // Try to pull from existing sessions_3 data
  const existing = (w.sessions || []).find(s => s.session === sessNum);
  if (existing) {
    const readingPart = existing.parts && existing.parts.find(p => p.title === 'PART 1: READING INPUT');
    if (readingPart && readingPart.content && readingPart.content.length > 0) {
      return readingPart.content;
    }
  }
  return null;
}

// ─── Session Part Generators ─────────────────────────────────────────────────

function makeHeaderParts(weekNum, sessNum, label = '') {
  return [
    { title: `Name: _________________________________ Date: _________________________`, content: [] },
  ];
}

function makeSpiralReview(w, sessNum) {
  const gram = getGrammar(w);
  const spiral = getSpiralReview(w);
  const vocab = getVocabWords(w);
  const v1 = vocab[0] ? `${vocab[0].vi}` : 'the action';
  const v2 = vocab[1] ? `${vocab[1].vi}` : 'another action';
  const spiralSentences = [
    { title: 'SPIRAL REVIEW (5 min)', content: [] },
    { title: `Translation: ${v1 ? `Đầu tiên, tôi đã ${v1}. Sau đó, tôi đã ${v2}. →` : 'Translate the sentence below. →'}`, content: [] },
    { title: `Error Correction: Fix the grammar mistake below. →`, content: [] },
    { title: `Fill-in: Complete with the correct form. _________________________________ `, content: [] },
  ];
  return spiralSentences;
}

function makeReadingPart(w, sessNum) {
  const passages = getBuildingPassages(w);
  const psg = passages[sessNum - 1] || passages[0];
  const theme = getTheme(w);
  const gram = getGrammar(w);
  const pattern = getPattern(w);
  return {
    title: 'PART 1: READING INPUT',
    content: [
      psg.text,
      `Stage 1 — Global: What is the main topic? ☐ A ☐ B ☐ C`,
      `Stage 2 — Detail: Answer with a full sentence:`,
      `What happened ${sessNum === 1 ? 'first' : sessNum === 2 ? 'next' : 'finally'}? ____________________________________________________`,
      `Stage 3A — Language focus: Find the ${gram} pattern. Example: "${pattern}"`,
      `Write your own example: ____________________________________________________`,
      `Word Count target: ${getVcTargets(w, sessNum)}w (read aloud, count words)`,
    ],
  };
}

function makeVocabPart(w, sessNum) {
  const vocab = getVocabWords(w);
  // Distribute vocab across sessions
  const perSession = Math.ceil(vocab.length / 3);
  const start = (sessNum - 1) * perSession;
  const sessionVocab = vocab.slice(start, start + perSession);
  if (sessionVocab.length === 0) {
    // fallback: review all vocab in S3
    return {
      title: 'PART 2: VOCABULARY BUILDING',
      content: [
        'Review: Write 1 sentence for each key word from this week.',
        ...vocab.slice(0, 5).map(v => `${v.word}: ____________________________________________________`),
      ],
    };
  }
  const lines = [];
  sessionVocab.forEach(v => {
    lines.push(`${v.word} (Vietnamese: ${v.vi}) → Write 3 times: ____________________ ____________________ ____________________`);
    lines.push(`→ Key Collocation: ${v.colloc}`);
    lines.push(`→ Your turn: I ${v.word} ____________________________________________________`);
  });
  return { title: 'PART 2: VOCABULARY BUILDING', content: lines };
}

function makeSentencePart(w, sessNum) {
  const gram = getGrammar(w);
  const pattern = getPattern(w);
  const vocab = getVocabWords(w);
  const v = vocab[0] || { word: 'verb', vi: 'action' };
  const v2 = vocab[1] || { word: 'verb2', vi: 'action2' };

  const l1Lines = [
    `L1 — Match the sentence halves (10 items)`,
    `${sessNum === 1 ? 'First' : sessNum === 2 ? 'Then' : 'Finally'}, I ${v.word} _________ a. with my friend.`,
    `She ${v2.word || 'helped'} _________ b. her mother.`,
  ];
  const l2Lines = [
    `[O] L2 — Older: Unscramble the sentence (10 items)`,
    `${v.word} / I / ${sessNum === 1 ? 'First,' : sessNum === 2 ? 'Then,' : 'Finally,'} → ____________________________________________________`,
    `${v2.word} / she / ${sessNum === 1 ? 'Then,' : sessNum === 2 ? 'Next,' : 'After that,'} → ____________________________________________________`,
  ];
  const l3Lines = [
    `[O] L3 — Older: Fill in the blank with 3 options (10 items)`,
    `${sessNum === 1 ? 'First' : sessNum === 2 ? 'Then' : 'Finally'}, I ____________ (${v.word} / ${v.word}s / ${v.word}ing) with my friend.`,
    `She ____________ (${v2.word || 'helped'} / ${(v2.word || 'help')}s / ${(v2.word || 'help')}ing) her mother.`,
  ];
  return [
    { title: 'PART 3: SENTENCE BUILDING', content: l1Lines },
    { title: `[O] L2 — Older: Unscramble the sentence (10 items)`, content: l2Lines.slice(1) },
    { title: `[O] L3 — Older: Fill in the blank with 3 options (10 items)`, content: l3Lines.slice(1) },
  ];
}

function makeListeningPart(w, sessNum) {
  const theme = getTheme(w);
  return {
    title: 'PART 4: LISTENING PRACTICE',
    content: [
      `A. Stage 1 — Global: ☐ The story is about school. ☐ The story is about ${theme.split('—')[1]?.trim() || 'the topic'}. ☐ The story is about something else.`,
      `B. Stage 2 — Detail: What happened? ____________________________________________________`,
      `C. Stage 3B — Inference: Why? ____________________________________________________`,
      `D. Dictation: Listen and write. ____________________________________________________`,
    ],
  };
}

function makeErrorCorrectionPart(w, sessNum) {
  const gram = getGrammar(w);
  const vocab = getVocabWords(w);
  const v1 = vocab[0] || { word: 'play', base: 'play' };
  return {
    title: 'PART 5: ERROR CORRECTION',
    content: [
      `Type A (verb form): ${sessNum === 1 ? 'First' : sessNum === 2 ? 'Then' : 'Finally'}, I ${v1.base || v1.word} yesterday. →`,
      `Type B (subject-verb): She ${v1.base || v1.word}s it last week. →`,
      `Type C (sequence word): ${sessNum === 3 ? 'First' : 'Finally'}, I woke up in the ${sessNum === 1 ? 'evening' : 'morning'}. →`,
    ],
  };
}

function makeSTEMPart(w, sessNum) {
  const stem = getSTEM(w);
  const theme = getTheme(w);
  const subtopics = ['Understanding the concept', 'Applying the concept', 'Connecting to real life'];
  return {
    title: 'PART 6: STEM/CLIL CONNECTION',
    content: [
      `Topic: ${stem} — ${subtopics[sessNum - 1]}`,
      `Read: [Short CLIL text about "${stem}" provided by teacher]`,
      `Write 2 sentences applying the CLIL concept:`,
      `1. ____________________________________________________`,
      `2. ____________________________________________________`,
      `Draw or label a diagram if applicable.`,
    ],
  };
}

function makeProductionPart(w, sessNum) {
  const gram = getGrammar(w);
  const vocab = getVocabWords(w);
  const v = vocab[0] || { word: 'verb', vi: 'action' };
  const v2 = vocab[1] || { word: 'verb2', vi: 'action' };
  return {
    title: 'PART 7: QUICK PRODUCTION CHECK',
    content: [
      `Write "${v.vi}" in English: ____________________________ Use it in 1 sentence: ____________________________________________________`,
      `Write a sentence with "${v2.word || 'the grammar pattern'}": ____________________________________________________`,
      `Write a sentence with "${sessNum === 1 ? 'First' : sessNum === 2 ? 'Then' : 'Finally'}": ____________________________________________________`,
      `Peer check: Read your sentence to a classmate. ☐ Done`,
      `Teacher check: ☐ Correct ☐ Needs revision`,
    ],
  };
}

function makePortfolioPart(w, sessNum, variant = 3) {
  const theme = getTheme(w);
  const labels = {
    3: ['Project Draft (Part 1) — Opening', 'Project Draft (Part 2) — Middle', 'Final Project — Complete'],
    2: ['Project Draft — Input & Grammar Work', 'Final Project — Complete & Reflect'],
    5: ['Warm-up & Grammar Note', 'Vocab & Reading Response', 'Sentence Practice', 'Listening & Error Fix', 'Production & Final Draft'],
  };
  const sessLabels = labels[variant] || labels[3];
  const label = sessLabels[sessNum - 1] || `Session ${sessNum}`;
  return {
    title: `PART 8: MY PORTFOLIO ENTRY — ${label.toUpperCase()} 📝 Week ${w.week} — Session ${sessNum}`,
    content: [
      `Today's goal: ${label}`,
      `Write ${sessNum < (variant === 5 ? 3 : 2) ? '2-3' : '4-5'} sentences using this week's grammar and vocabulary:`,
      `____________________________________________________`,
      `____________________________________________________`,
      sessNum >= Math.ceil(variant / 2) ? `____________________________________________________` : '',
      `☐ Did I use the grammar pattern correctly?`,
      `☐ Did I use vocabulary from this week?`,
    ].filter(Boolean),
  };
}

function makeHomeworkPart(w, sessNum) {
  const vocab = getVocabWords(w);
  const gram = getGrammar(w);
  const pattern = getPattern(w);
  const perSession = Math.ceil(vocab.length / 3);
  const start = (sessNum - 1) * perSession;
  const sessionVocab = vocab.slice(start, start + perSession);
  const allVocab = sessNum === 3 ? vocab : sessionVocab; // S3 reviews all

  const vocabLines = allVocab.slice(0, 5).map((v, i) =>
    `${String.fromCharCode(97 + i)}. ${v.word}: Vietnamese: ______________________________ | Sentence: ____________________________________________________`
  );

  return {
    title: 'PART 9: HOMEWORK',
    content: [
      `Vocabulary (${allVocab.slice(0, 5).length} words × 3 = ${allVocab.slice(0, 5).length * 3} items):`,
      ...vocabLines,
      ``,
      `Grammar sentences (5 items):`,
      `Write a sentence with ${pattern}: ____________________________________________________`,
      `Write a sentence with "First, I [past verb]": ____________________________________________________`,
      `Write a sentence with "Then, I [past verb]": ____________________________________________________`,
      `Write a sentence with "Finally, I [past verb]": ____________________________________________________`,
      `Write a sentence about yesterday: ____________________________________________________`,
      ``,
      `Reading Fluency: Read PART 1 aloud 3 times. Ask a parent to sign. Parent signature: ______________________`,
      `☐ Done ☐ Partially done ☐ Not done`,
    ],
  };
}

// ─── Reading Passages Per Week ────────────────────────────────────────────────

function getBuildingPassages(w) {
  // Try to get existing reading passages from sessions_3 data
  const existing = w.sessions || [];
  if (existing.length >= 3) {
    const gotten = existing.map(s => {
      const rp = (s.parts || []).find(p => p.title === 'PART 1: READING INPUT');
      if (rp && rp.content && rp.content.length > 0) {
        return { text: rp.content[0] };
      }
      return null;
    });
    if (gotten.every(g => g !== null)) return gotten;
  }

  // Generate scaffolded passages if missing
  const theme = getTheme(w);
  const gram = getGrammar(w);
  const pattern = getPattern(w);
  const vocab = getVocabWords(w);
  const stem = getSTEM(w);
  const v1 = vocab[0]?.word || 'did';
  const v2 = vocab[1]?.word || 'went';
  const v3 = vocab[2]?.word || 'saw';
  const v4 = vocab[3]?.word || 'came';
  const v5 = vocab[4]?.word || 'had';

  const themes = theme.split('—').map(t => t.trim());
  const storyName = themes[1] || themes[0];

  return [
    {
      text: `${storyName} — Part 1\nMax had a big adventure last weekend. First, he ${v1} something amazing. "Look!" he said. "I can see it!" Then, he ${v2} to a new place. He was very excited. It was the first time he did this. He wrote about it in his notebook. He drew a picture too.\nStage 1 — Global:\nStage 2 — Detail: What did Max do first? ____________________________________________________\nStage 3A — Language focus: Underline the past tense verbs.`,
    },
    {
      text: `${storyName} — Part 2\nThen, Max ${v3} something interesting. "This is amazing!" he said. He ${v4} back to check it again. He was happy. "I understand it now," he told his friend. His friend ${v5} the same idea. Together, they made a plan. The plan was about the CLIL topic: ${stem}.\nStage 1 — Global:\nStage 2 — Detail: What did Max and his friend make? ____________________________________________________\nStage 3A — Language focus: Find all the sequence words (First, Then, Next, Finally).`,
    },
    {
      text: `${storyName} — Part 3 (Wrap-up)\nFinally, Max presented his project to the class. He used the grammar pattern: ${pattern}. He spoke clearly. Everyone listened carefully. The teacher said, "Excellent work!" Max was proud. He put his project in his portfolio. Now he can show his parents what he learned about ${stem}.\nStage 1 — Global:\nStage 2 — Detail: What did Max use in his presentation? ____________________________________________________\nStage 3B — Inference: Why was Max proud? ____________________________________________________`,
    },
  ];
}

// ─── Build one session ────────────────────────────────────────────────────────

function buildSession(w, sessNum, variant = 3) {
  const passages = getBuildingPassages(w);
  const passage = passages[Math.min(sessNum - 1, passages.length - 1)];
  const readingPart = { title: 'PART 1: READING INPUT', content: passage.text.split('\n').filter(l => l.trim()) };
  const sentParts = makeSentencePart(w, sessNum);

  const parts = [
    ...makeHeaderParts(w.week, sessNum),
    ...makeSpiralReview(w, sessNum),
    readingPart,
    makeVocabPart(w, sessNum),
    sentParts[0],
    sentParts[1],
    sentParts[2],
    makeListeningPart(w, sessNum),
    makeErrorCorrectionPart(w, sessNum),
    makeSTEMPart(w, sessNum),
    makeProductionPart(w, sessNum),
    makePortfolioPart(w, sessNum, variant),
    makeHomeworkPart(w, sessNum),
  ];

  return { session: sessNum, parts };
}

// ─── Build sessions_3 ─────────────────────────────────────────────────────────

function buildSessions3(w) {
  // If already present with real content, preserve original
  const existing = w.sessions || [];
  const hasReal = existing.length >= 3 && existing.some(s =>
    (s.parts || []).some(p => (p.content || []).length > 0)
  );
  if (hasReal) return existing;

  return [1, 2, 3].map(n => buildSession(w, n, 3));
}

// ─── Build sessions_2 ─────────────────────────────────────────────────────────
// Session A (120 min): Reading + Vocab + Grammar structure (from S1 + S2)
// Session B (120 min): Error correction + STEM + Production + Full portfolio + Homework

function buildSessions2(w) {
  const s1 = buildSession(w, 1, 2);
  const s2 = buildSession(w, 2, 2);
  const s3 = buildSession(w, 3, 2);

  const passages = getBuildingPassages(w);
  const gram = getGrammar(w);
  const vocab = getVocabWords(w);

  // Session A: Header + Spiral Review + READING (both S1+S2 passages combined as Part A / Part B)
  //            + Full Vocab (all words) + Full Sentence Building + Listening
  const vocabAllLines = [];
  vocab.forEach(v => {
    vocabAllLines.push(`${v.word} (Vietnamese: ${v.vi}) → Write 3 times: ____________________ ____________________ ____________________`);
    vocabAllLines.push(`→ Key Collocation: ${v.colloc}`);
    vocabAllLines.push(`→ Your turn: I ${v.word} ____________________________________________________`);
  });

  const sessionA = {
    session: 1,
    session_label: 'Session A — Input & Grammar (120 min)',
    parts: [
      { title: `Name: _________________________________ Date: _________________________`, content: [] },
      ...makeSpiralReview(w, 1),
      {
        title: 'PART 1: READING INPUT — Text A',
        content: passages[0].text.split('\n').filter(l => l.trim()),
      },
      {
        title: 'PART 1B: READING INPUT — Text B',
        content: passages[1].text.split('\n').filter(l => l.trim()),
      },
      { title: 'PART 2: VOCABULARY BUILDING (Full Set)', content: vocabAllLines },
      ...makeSentencePart(w, 1),
      ...makeSentencePart(w, 2),
      makeListeningPart(w, 1),
      makePortfolioPart(w, 1, 2),
    ],
  };

  // Session B: Spiral Review + Text C + Error Correction × 2 + STEM + Production + Full Homework
  const sessionB = {
    session: 2,
    session_label: 'Session B — Production & Review (120 min)',
    parts: [
      { title: `Name: _________________________________ Date: _________________________`, content: [] },
      ...makeSpiralReview(w, 3),
      {
        title: 'PART 1: READING INPUT — Text C (Wrap-up)',
        content: passages[2].text.split('\n').filter(l => l.trim()),
      },
      makeErrorCorrectionPart(w, 2),
      makeErrorCorrectionPart(w, 3),
      makeSTEMPart(w, 2),
      makeProductionPart(w, 3),
      makePortfolioPart(w, 2, 2),
      makeHomeworkPart(w, 3),
    ],
  };

  return [sessionA, sessionB];
}

// ─── Build sessions_5 ─────────────────────────────────────────────────────────
// S1: Warm-up + Reading A + Vocab Set 1
// S2: Vocab Set 2 + Sentence Building (L1 + L2)
// S3: Listening + Error Correction + Sentence Building L3
// S4: STEM/CLIL + Reading B + Vocab review
// S5: Reading C + Full Production + Portfolio Final + Homework

function buildSessions5(w) {
  const passages = getBuildingPassages(w);
  const vocab = getVocabWords(w);
  const gram = getGrammar(w);

  // Split vocab into 3 groups
  const third = Math.ceil(vocab.length / 3);
  const vocabLines = (arr) => {
    const lines = [];
    arr.forEach(v => {
      lines.push(`${v.word} (Vietnamese: ${v.vi}) → Write 3 times: ____________________ ____________________ ____________________`);
      lines.push(`→ Key Collocation: ${v.colloc}`);
      lines.push(`→ Your turn: I ${v.word} ____________________________________________________`);
    });
    return lines;
  };

  const sentParts1 = makeSentencePart(w, 1);
  const sentParts2 = makeSentencePart(w, 2);
  const sentParts3 = makeSentencePart(w, 3);

  const sessions = [
    {
      session: 1,
      session_label: 'Session 1 — Warm-up & Reading Input (120 min)',
      parts: [
        { title: `Name: _________________________________ Date: _________________________`, content: [] },
        ...makeSpiralReview(w, 1),
        { title: 'PART 1: READING INPUT', content: passages[0].text.split('\n').filter(l => l.trim()) },
        { title: 'PART 2: VOCABULARY SET 1', content: vocabLines(vocab.slice(0, third)) },
        makePortfolioPart(w, 1, 5),
      ],
    },
    {
      session: 2,
      session_label: 'Session 2 — Vocabulary & Sentence Building (120 min)',
      parts: [
        { title: `Name: _________________________________ Date: _________________________`, content: [] },
        ...makeSpiralReview(w, 2),
        { title: 'PART 2: VOCABULARY SET 2', content: vocabLines(vocab.slice(third, third * 2)) },
        sentParts1[0], sentParts1[1],
        makePortfolioPart(w, 2, 5),
      ],
    },
    {
      session: 3,
      session_label: 'Session 3 — Listening & Error Correction (120 min)',
      parts: [
        { title: `Name: _________________________________ Date: _________________________`, content: [] },
        ...makeSpiralReview(w, 2),
        makeListeningPart(w, 2),
        makeErrorCorrectionPart(w, 2),
        sentParts2[2],
        makePortfolioPart(w, 3, 5),
      ],
    },
    {
      session: 4,
      session_label: 'Session 4 — STEM/CLIL & Grammar Deepening (120 min)',
      parts: [
        { title: `Name: _________________________________ Date: _________________________`, content: [] },
        ...makeSpiralReview(w, 3),
        { title: 'PART 1B: READING INPUT — Text B', content: passages[1].text.split('\n').filter(l => l.trim()) },
        makeSTEMPart(w, 2),
        { title: 'PART 2: VOCABULARY SET 3 (Review)', content: vocabLines(vocab.slice(third * 2)) },
        sentParts3[0], sentParts3[1],
        makePortfolioPart(w, 4, 5),
      ],
    },
    {
      session: 5,
      session_label: 'Session 5 — Production & Portfolio Final (120 min)',
      parts: [
        { title: `Name: _________________________________ Date: _________________________`, content: [] },
        ...makeSpiralReview(w, 3),
        { title: 'PART 1C: READING INPUT — Text C (Wrap-up)', content: passages[2].text.split('\n').filter(l => l.trim()) },
        makeErrorCorrectionPart(w, 3),
        makeProductionPart(w, 3),
        makePortfolioPart(w, 5, 5),
        makeHomeworkPart(w, 3),
      ],
    },
  ];

  return sessions;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

let generated3 = 0, generated2 = 0, generated5 = 0;
let preserved3 = 0;

for (const key of Object.keys(data).sort((a, b) => Number(a) - Number(b))) {
  const w = data[key];

  const s3 = buildSessions3(w);
  const s2 = buildSessions2(w);
  const s5 = buildSessions5(w);

  const wasEmpty = !(w.sessions || []).some(s => (s.parts || []).some(p => (p.content || []).length > 0));
  if (wasEmpty) generated3++; else preserved3++;
  generated2++;
  generated5++;

  data[key].sessions = s3;
  data[key].sessions_2 = s2;
  data[key].sessions_5 = s5;
}

fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), 'utf8');

console.log(`\n✅ Done!`);
console.log(`  sessions_3 (default): ${preserved3} preserved + ${generated3} newly generated`);
console.log(`  sessions_2: ${generated2} generated`);
console.log(`  sessions_5: ${generated5} generated`);
console.log(`  Total weeks: ${Object.keys(data).length}`);
