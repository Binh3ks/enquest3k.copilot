import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function buildManifest() {
  const readHub = (await import(path.join(rootDir, 'src/data/weeks/week_33/reading_hub.js'))).readingHubData;
  const listHub = (await import(path.join(rootDir, 'src/data/weeks/week_33/listening_hub.js'))).listeningHub;
  const writeHub = (await import(path.join(rootDir, 'src/data/weeks/week_33/writing_hub.js'))).writingHubData;
  const spkHub = (await import(path.join(rootDir, 'src/data/weeks/week_33/speaking_hub.js'))).speakingHub;
  const readJs = (await import(path.join(rootDir, 'src/data/weeks/week_33/read.js'))).default;
  const exploreJs = (await import(path.join(rootDir, 'src/data/weeks/week_33/explore.js'))).default;
  const skillPractice = (await import(path.join(rootDir, 'src/data/weeks/week_33/skill_practice_hub.js'))).skillPracticeHub;

  const manifest = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'W33 Audio Semantic Manifest',
    version: '1.0.0',
    weekNumber: 33,
    governingStandard: 'W33 Golden Learning & Assessment Standard v1.0',
    totalAssets: 54,
    assets: []
  };

  function add(entry) {
    manifest.assets.push(entry);
  }

  // 1. CLIL
  add({
    asset: 'public/audio/week33/clil_friction.mp3',
    category: 'CLIL_ARTICLE',
    source_file: 'src/data/weeks/week_33/reading_hub.js',
    source_key: 'clil_article.content_en',
    expected_transcript: readHub.clil_article.content_en,
    semantic_anchors: ['friction', 'slip', 'wet floors', 'tiles', 'rubber soles', 'corridor', 'Jake', 'Tom', 'warning signs'],
    provenance: 'SOURCE_DATA',
    verification_policy: 'BOTH'
  });

  // 2. Stories & Knowledge Explorer
  add({
    asset: 'public/audio/week33/read_stem.mp3',
    category: 'STEM_STORY',
    source_file: 'src/data/weeks/week_33/read.js',
    source_key: 'read.text_en',
    expected_transcript: readJs.text_en,
    semantic_anchors: ['Jake', 'corridor', 'science class', 'slipped', 'wet floor', 'nurse', 'bandage', 'friction', 'warning signs'],
    provenance: 'SOURCE_DATA',
    verification_policy: 'BOTH'
  });

  add({
    asset: 'public/audio/week33/read_social.mp3',
    category: 'SOCIAL_STORY',
    source_file: 'tools/generate_w33_all_audio.mjs',
    source_key: 'read_social.text',
    expected_transcript: 'School safety rules help protect every student each day. In ancient schools and modern academies, following rules creates a peaceful environment. When students walk calmly in hallways, accidents do not happen. Helping an injured friend shows kindness and responsibility. Good citizens always care for others.',
    semantic_anchors: ['safety rules', 'protect', 'student', 'peaceful environment', 'hallways', 'accidents', 'kindness', 'responsibility'],
    provenance: 'SOURCE_DATA',
    verification_policy: 'BOTH'
  });

  add({
    asset: 'public/audio/week33/explore.mp3',
    category: 'KNOWLEDGE_EXPLORER',
    source_file: 'src/data/weeks/week_33/explore.js',
    source_key: 'explore.content_en',
    expected_transcript: exploreJs.content_en,
    semantic_anchors: ['slipped', 'wet floor', 'friction', 'tiles', 'Jake', 'corridor', 'warning signs', 'Japan', 'Australia'],
    provenance: 'SOURCE_DATA',
    verification_policy: 'BOTH'
  });

  // 3. Dictations (1-5)
  skillPractice.dictation.forEach(d => {
    add({
      asset: `public${d.audio_url}`,
      category: 'DICTATION',
      source_file: 'src/data/weeks/week_33/skill_practice_hub.js',
      source_key: `dictation[${d.id - 1}].text`,
      expected_transcript: d.text,
      semantic_anchors: d.text.replace(/[.,]/g, '').split(' ').filter(w => w.length > 3),
      provenance: 'SOURCE_DATA',
      verification_policy: 'BOTH'
    });
  });

  // 4. Exam intros (L1-L5, S1-S4)
  const examIntros = [
    { file: 'exam_intro_L1.mp3', text: 'Listen and draw lines. There is one example.', anchors: ['draw lines', 'example'] },
    { file: 'exam_intro_L2.mp3', text: 'Listen and write. There is one example.', anchors: ['listen', 'write', 'example'] },
    { file: 'exam_intro_L3.mp3', text: 'Listen and write a letter in each box. There is one example.', anchors: ['letter', 'box', 'example'] },
    { file: 'exam_intro_L4.mp3', text: 'Listen and tick the box. There is one example.', anchors: ['tick', 'box', 'example'] },
    { file: 'exam_intro_L5.mp3', text: 'Listen and colour and write. There is one example.', anchors: ['colour', 'write', 'example'] },
    { file: 'exam_intro_S1.mp3', text: 'Look at the two pictures. They are the same, but there are some differences. Tell me about the differences.', anchors: ['pictures', 'differences'] },
    {
      file: 'exam_intro_S2.mp3',
      text: "Now I'd like you to ask and answer some questions about the school accident. I have a card with some information and so do you. Let's start. I'll ask you first. Where did the accident happen exactly? It happened in the school corridor near the science room. Good. And which part of Tom's body was hurt? He hurt his right knee. It was quite swollen. Right. Now it's your turn. Ask me about Jake's information on your card. Okay. What first aid item did Jake use to help Tom? Jake used a clean bandage and a cold pack to treat Tom's knee. And who praised Jake afterwards? The headmaster praised Jake in the school assembly. He was very proud of him.",
      anchors: ['questions', 'school accident', 'corridor', 'science room', 'knee', 'clean bandage', 'headmaster']
    },
    { file: 'exam_intro_S3.mp3', text: 'Look at the pictures. They tell a story. Look at the pictures first and tell the story.', anchors: ['pictures', 'story'] },
    { file: 'exam_intro_S4.mp3', text: "Now let's talk about you and your daily life. Answer the questions.", anchors: ['talk', 'daily life', 'questions'] }
  ];

  examIntros.forEach(intro => {
    add({
      asset: `public/audio/week33/${intro.file}`,
      category: 'EXAM_RUBRIC',
      source_file: 'CAMBRIDGE_FLYERS_AUDIO_BLUEPRINT.md',
      source_key: `exam_intro.${intro.file.replace('.mp3', '')}`,
      expected_transcript: intro.text,
      semantic_anchors: intro.anchors,
      provenance: 'CAMBRIDGE_BLUEPRINT',
      verification_policy: 'BOTH'
    });
  });

  // 5. Speaking P2 Qs
  spkHub.info_exchange_cards.table_b.fields.forEach((f, idx) => {
    add({
      asset: `public${f.audio_url}`,
      category: 'SPEAKING_P2',
      source_file: 'src/data/weeks/week_33/speaking_hub.js',
      source_key: `info_exchange_cards.table_b.fields[${idx}].nova_question`,
      expected_transcript: f.nova_question,
      semantic_anchors: f.nova_question.replace(/[?.,]/g, '').split(' ').filter(w => w.length > 3),
      provenance: 'SOURCE_DATA',
      verification_policy: 'BOTH'
    });
  });

  // 6. Listening P1
  add({
    asset: 'public/audio/week33/listening_p1_full.mp3',
    category: 'LISTENING_P1',
    source_file: 'src/data/weeks/week_33/listening_hub.js',
    source_key: 'listening_p1.passage_audio_script',
    expected_transcript: listHub.listening_p1.passage_audio_script,
    semantic_anchors: ['Jake', 'Tom', 'Nurse Sarah', 'Headmaster Brown', 'Maria', 'David', 'corridor', 'mop', 'warning sign', 'water bottle'],
    provenance: 'SOURCE_DATA',
    verification_policy: 'BOTH'
  });

  // 7. Listening P2
  const p2Text = listHub.listening_p2.dialogue_script.map(d => `${d.speaker}: ${d.text}`).join('\n');
  add({
    asset: 'public/audio/week33/listening_p2_full.mp3',
    category: 'LISTENING_P2',
    source_file: 'src/data/weeks/week_33/listening_hub.js',
    source_key: 'listening_p2.dialogue_script',
    expected_transcript: p2Text,
    semantic_anchors: ['Jake', 'Room 4B', 'Science', 'school corridor', '2 minutes', 'clean bandage', 'Headmaster Brown', 'safety badge'],
    provenance: 'SOURCE_DATA',
    verification_policy: 'BOTH'
  });

  // 8. Listening P3 (Example, Full, Items 1-5)
  add({
    asset: 'public/audio/week33/listening_p3_example.mp3',
    category: 'LISTENING_P3',
    source_file: 'src/data/weeks/week_33/listening_hub.js',
    source_key: 'listening_p3.example.dialogue_script',
    expected_transcript: listHub.listening_p3.example.dialogue_script.map(d => d.text).join(' '),
    semantic_anchors: ['backpack', 'playground bench', 'letter H'],
    provenance: 'SOURCE_DATA',
    verification_policy: 'BOTH'
  });

  add({
    asset: 'public/audio/week33/listening_p3_full.mp3',
    category: 'LISTENING_P3',
    source_file: 'src/data/weeks/week_33/listening_hub.js',
    source_key: 'listening_p3.passage_audio_script',
    expected_transcript: listHub.listening_p3.passage_audio_script,
    semantic_anchors: ['backpack', 'Nurse Sarah', 'bandage', 'glass cabinet', 'cold pack', 'first-aid table', 'notebook', 'water bottle', 'alarm clock'],
    provenance: 'SOURCE_DATA',
    verification_policy: 'BOTH'
  });

  listHub.listening_p3.items.forEach(item => {
    add({
      asset: `public${item.audio_url}`,
      category: 'LISTENING_P3',
      source_file: 'src/data/weeks/week_33/listening_hub.js',
      source_key: `listening_p3.items[${item.id - 1}].audio_text`,
      expected_transcript: item.audio_text,
      semantic_anchors: [item.name, ...item.audio_text.replace(/[.,?]/g, '').split(' ').filter(w => w.length > 4)],
      provenance: 'SOURCE_DATA',
      verification_policy: 'BOTH'
    });
  });

  // 9. Listening P4 (Example, Full, Q1-Q5)
  const p4ExampleText = listHub.listening_p4.questions[0].dialogue_script.map(d => d.text).join(' ');
  add({
    asset: 'public/audio/week33/listening_p4_example.mp3',
    category: 'LISTENING_P4',
    source_file: 'src/data/weeks/week_33/listening_hub.js',
    source_key: 'listening_p4.questions[0].dialogue_script',
    expected_transcript: p4ExampleText,
    semantic_anchors: ['Jake', 'corridor', 'picture A'],
    provenance: 'SOURCE_DATA',
    verification_policy: 'BOTH'
  });

  const p4FullText = listHub.listening_p4.questions.map(q => q.dialogue_script.map(d => d.text).join(' ')).join('\n');
  add({
    asset: 'public/audio/week33/listening_p4_full.mp3',
    category: 'LISTENING_P4',
    source_file: 'src/data/weeks/week_33/listening_hub.js',
    source_key: 'listening_p4.questions[*].dialogue_script',
    expected_transcript: p4FullText,
    semantic_anchors: ['Jake', 'corridor', 'cleaner', 'slipped', 'nurse', 'bandage', 'cold pack', 'headmaster'],
    provenance: 'SOURCE_DATA',
    verification_policy: 'BOTH'
  });

  listHub.listening_p4.questions.slice(1).forEach((q, idx) => {
    const qText = q.dialogue_script.map(d => d.text).join(' ');
    add({
      asset: `public${q.audio_url}`,
      category: 'LISTENING_P4',
      source_file: 'src/data/weeks/week_33/listening_hub.js',
      source_key: `listening_p4.questions[${idx + 1}].dialogue_script`,
      expected_transcript: `Question ${idx + 1}. ${q.question_en} ${qText}`,
      semantic_anchors: q.question_en.replace(/[.,?]/g, '').split(' ').filter(w => w.length > 4),
      provenance: 'SOURCE_DATA',
      verification_policy: 'BOTH'
    });
  });

  // 10. Listening P5 (Full, Inst 1-5)
  add({
    asset: 'public/audio/week33/listening_p5_full.mp3',
    category: 'LISTENING_P5',
    source_file: 'src/data/weeks/week_33/listening_hub.js',
    source_key: 'listening_p5.audio_script',
    expected_transcript: listHub.listening_p5.audio_script,
    semantic_anchors: ['notebook', 'yellow', 'backpack', 'blue', 'warning sign', 'wet', 'doorframe', 'green', 'notice board', 'care', 'nurse', 'red'],
    provenance: 'SOURCE_DATA',
    verification_policy: 'BOTH'
  });

  const p5InstCanonical = [
    { text: "Color Jake's backpack blue.", anchors: ['backpack', 'blue'] },
    { text: "Write the word WET on the warning sign.", anchors: ['write', 'wet', 'warning', 'sign'] },
    { text: "Color the science lab doorframe bright green.", anchors: ['color', 'science', 'lab', 'doorframe', 'green'] },
    { text: "Write the word CARE on the notice board.", anchors: ['write', 'care', 'notice', 'board'] },
    { text: "Color the nurse's room door red.", anchors: ['color', 'nurse', 'door', 'red'] }
  ];

  p5InstCanonical.forEach((inst, idx) => {
    add({
      asset: `public/audio/week33/listening_p5_inst${idx + 1}.mp3`,
      category: 'LISTENING_P5',
      source_file: 'src/data/weeks/week_33/listening_hub.js',
      source_key: `listening_p5.instructions[${idx + 1}].text`,
      expected_transcript: inst.text,
      semantic_anchors: inst.anchors,
      provenance: 'SOURCE_DATA',
      verification_policy: 'BOTH'
    });
  });

  // 11. Cambridge Reference (End 1-5, Replay 1-5)
  for (let i = 1; i <= 5; i++) {
    add({
      asset: `public/audio/cambridge/flyers_replay_p${i}.mp3`,
      category: 'CAMBRIDGE_REPLAY',
      source_file: 'CAMBRIDGE_FLYERS_AUDIO_BLUEPRINT.md',
      source_key: `flyers_replay_p${i}`,
      expected_transcript: `Now listen to Part ${i} again.`,
      semantic_anchors: ['listen', 'part', String(i), 'again'],
      provenance: 'CAMBRIDGE_BLUEPRINT',
      verification_policy: 'BOTH'
    });
    add({
      asset: `public/audio/cambridge/flyers_end_p${i}.mp3`,
      category: 'CAMBRIDGE_END',
      source_file: 'CAMBRIDGE_FLYERS_AUDIO_BLUEPRINT.md',
      source_key: `flyers_end_p${i}`,
      expected_transcript: `That is the end of Part ${i}.`,
      semantic_anchors: ['end', 'part', String(i)],
      provenance: 'CAMBRIDGE_BLUEPRINT',
      verification_policy: 'BOTH'
    });
  }

  const outputPath = path.join(rootDir, 'docs/W33_AUDIO_SEMANTIC_MANIFEST.json');
  fs.writeFileSync(outputPath, JSON.stringify(manifest, null, 2));
  console.log(`✅ Generated canonical audio semantic manifest: ${outputPath} (${manifest.assets.length} assets)`);
}

buildManifest().catch(err => {
  console.error('❌ Manifest generation error:', err);
  process.exit(1);
});
