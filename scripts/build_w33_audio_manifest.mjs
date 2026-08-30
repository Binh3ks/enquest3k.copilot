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
    week: 33,
    version: '1.0',
    total_assets: 54,
    governing_standard: 'W33 Golden Learning & Assessment Standard v1.0',
    assets: []
  };

  function add(entry) {
    manifest.assets.push(entry);
  }

  // 1. CLIL Article
  add({
    file: 'public/audio/week33/clil_friction.mp3',
    source_file: 'src/data/weeks/week_33/reading_hub.js',
    source_path: 'clil_article.content_en',
    source_type: 'source_data',
    category: 'SOURCE_DATA_AUDIO',
    part: 'CLIL',
    canonical_transcript: readHub.clil_article.content_en,
    semantic_anchors: ['friction', 'slip', 'wet floors', 'tiles', 'rubber soles', 'corridor', 'Jake', 'Tom', 'warning signs'],
    required: true
  });

  // 2. STEM Story
  add({
    file: 'public/audio/week33/read_stem.mp3',
    source_file: 'src/data/weeks/week_33/read.js',
    source_path: 'text_en',
    source_type: 'source_data',
    category: 'SOURCE_DATA_AUDIO',
    part: 'STORY',
    canonical_transcript: readJs.text_en,
    semantic_anchors: ['Jake', 'corridor', 'science class', 'slipped', 'wet floor', 'nurse', 'bandage', 'friction', 'warning signs'],
    required: true
  });

  // 3. Social Studies Story
  add({
    file: 'public/audio/week33/read_social.mp3',
    source_file: 'tools/generate_w33_all_audio.mjs',
    source_path: 'STATIC_AUDIO_TASKS[read_social.mp3]',
    source_type: 'source_data',
    category: 'SOURCE_DATA_AUDIO',
    part: 'STORY',
    canonical_transcript: 'School safety rules help protect every student each day. In ancient schools and modern academies, following rules creates a peaceful environment. When students walk calmly in hallways, accidents do not happen. Helping an injured friend shows kindness and responsibility. Good citizens always care for others.',
    semantic_anchors: ['safety rules', 'protect', 'student', 'peaceful environment', 'hallways', 'accidents', 'kindness', 'responsibility'],
    required: true
  });

  // 4. Knowledge Explorer
  add({
    file: 'public/audio/week33/explore.mp3',
    source_file: 'src/data/weeks/week_33/explore.js',
    source_path: 'content_en',
    source_type: 'source_data',
    category: 'SOURCE_DATA_AUDIO',
    part: 'EXPLORE',
    canonical_transcript: exploreJs.content_en,
    semantic_anchors: ['slipped', 'wet floor', 'friction', 'tiles', 'Jake', 'corridor', 'warning signs', 'Japan', 'Australia'],
    required: true
  });

  // 5. Dictation (1-5)
  skillPractice.dictation.forEach(d => {
    add({
      file: `public${d.audio_url}`,
      source_file: 'src/data/weeks/week_33/skill_practice_hub.js',
      source_path: `skillPracticeHub.dictation[${d.id - 1}].text`,
      source_type: 'source_data',
      category: 'SOURCE_DATA_AUDIO',
      part: 'DICTATION',
      canonical_transcript: d.text,
      semantic_anchors: d.text.replace(/[.,]/g, '').split(' ').filter(w => w.length > 3),
      required: true
    });
  });

  // 6. Exam Rubric Intros (L1-L5, S1-S4)
  const examIntros = [
    { file: 'exam_intro_L1.mp3', part: 'L1', text: 'Listen and draw lines. There is one example.', anchors: ['draw lines', 'example'] },
    { file: 'exam_intro_L2.mp3', part: 'L2', text: 'Listen and write. There is one example.', anchors: ['listen', 'write', 'example'] },
    { file: 'exam_intro_L3.mp3', part: 'L3', text: 'Listen and write a letter in each box. There is one example.', anchors: ['letter', 'box', 'example'] },
    { file: 'exam_intro_L4.mp3', part: 'L4', text: 'Listen and tick the box. There is one example.', anchors: ['tick', 'box', 'example'] },
    { file: 'exam_intro_L5.mp3', part: 'L5', text: 'Listen and colour and write. There is one example.', anchors: ['colour', 'write', 'example'] },
    { file: 'exam_intro_S1.mp3', part: 'S1', text: 'Look at the two pictures. They are the same, but there are some differences. Tell me about the differences.', anchors: ['pictures', 'differences'] },
    {
      file: 'exam_intro_S2.mp3',
      part: 'S2',
      text: "Now I'd like you to ask and answer some questions about the school accident. I have a card with some information and so do you. Let's start. I'll ask you first. Where did the accident happen exactly? It happened in the school corridor near the science room. Good. And which part of Tom's body was hurt? He hurt his right knee. It was quite swollen. Right. Now it's your turn. Ask me about Jake's information on your card. Okay. What first aid item did Jake use to help Tom? Jake used a clean bandage and a cold pack to treat Tom's knee. And who praised Jake afterwards? The headmaster praised Jake in the school assembly. He was very proud of him.",
      anchors: ['questions', 'school accident', 'corridor', 'science room', 'knee', 'clean bandage', 'headmaster']
    },
    { file: 'exam_intro_S3.mp3', part: 'S3', text: 'Look at the pictures. They tell a story. Look at the pictures first and tell the story.', anchors: ['pictures', 'story'] },
    { file: 'exam_intro_S4.mp3', part: 'S4', text: "Now let's talk about you and your daily life. Answer the questions.", anchors: ['talk', 'daily life', 'questions'] }
  ];

  examIntros.forEach(intro => {
    add({
      file: `public/audio/week33/${intro.file}`,
      source_file: 'CAMBRIDGE_FLYERS_AUDIO_BLUEPRINT.md',
      source_path: `cambridge_audio_blueprint.${intro.file.replace('.mp3', '')}`,
      source_type: 'cambridge_blueprint',
      category: 'CAMBRIDGE_STANDARD_AUDIO',
      part: intro.part,
      canonical_transcript: intro.text,
      semantic_anchors: intro.anchors,
      required: true
    });
  });

  // 7. Speaking P2 Questions (info_exchange_q1 to q4)
  spkHub.info_exchange_cards.table_b.fields.forEach((f, idx) => {
    add({
      file: `public${f.audio_url}`,
      source_file: 'src/data/weeks/week_33/speaking_hub.js',
      source_path: `speakingHub.info_exchange_cards.table_b.fields[${idx}].nova_question`,
      source_type: 'source_data',
      category: 'QUESTION_AUDIO',
      part: 'S2',
      canonical_transcript: f.nova_question,
      semantic_anchors: f.nova_question.replace(/[?.,]/g, '').split(' ').filter(w => w.length > 3),
      required: true
    });
  });

  // 8. Listening P1 Full
  add({
    file: 'public/audio/week33/listening_p1_full.mp3',
    source_file: 'src/data/weeks/week_33/listening_hub.js',
    source_path: 'listeningHub.listening_p1.passage_audio_script',
    source_type: 'source_data',
    category: 'COMPOSITE_AUDIO',
    part: 'L1',
    canonical_transcript: listHub.listening_p1.passage_audio_script,
    semantic_anchors: ['Jake', 'Tom', 'Nurse Sarah', 'Headmaster Brown', 'Maria', 'David', 'corridor', 'mop', 'warning sign', 'water bottle'],
    required: true
  });

  // 9. Listening P2 Full
  const p2Text = listHub.listening_p2.dialogue_script.map(d => `${d.speaker}: ${d.text}`).join('\n');
  add({
    file: 'public/audio/week33/listening_p2_full.mp3',
    source_file: 'src/data/weeks/week_33/listening_hub.js',
    source_path: 'listeningHub.listening_p2.dialogue_script',
    source_type: 'source_data',
    category: 'COMPOSITE_AUDIO',
    part: 'L2',
    canonical_transcript: p2Text,
    semantic_anchors: ['Jake', 'Room 4B', 'Science', 'school corridor', '2 minutes', 'clean bandage', 'Headmaster Brown', 'safety badge'],
    required: true
  });

  // 10. Listening P3 (Example, Full, Items 1-5)
  add({
    file: 'public/audio/week33/listening_p3_example.mp3',
    source_file: 'src/data/weeks/week_33/listening_hub.js',
    source_path: 'listeningHub.listening_p3.example.dialogue_script',
    source_type: 'source_data',
    category: 'EXAMPLE_AUDIO',
    part: 'L3',
    canonical_transcript: listHub.listening_p3.example.dialogue_script.map(d => d.text).join(' '),
    semantic_anchors: ['backpack', 'playground bench', 'letter H'],
    required: true
  });

  add({
    file: 'public/audio/week33/listening_p3_full.mp3',
    source_file: 'src/data/weeks/week_33/listening_hub.js',
    source_path: 'listeningHub.listening_p3.passage_audio_script',
    source_type: 'source_data',
    category: 'COMPOSITE_AUDIO',
    part: 'L3',
    canonical_transcript: listHub.listening_p3.passage_audio_script,
    semantic_anchors: ['backpack', 'Nurse Sarah', 'bandage', 'glass cabinet', 'cold pack', 'first-aid table', 'notebook', 'water bottle', 'alarm clock'],
    required: true
  });

  listHub.listening_p3.items.forEach(item => {
    add({
      file: `public${item.audio_url}`,
      source_file: 'src/data/weeks/week_33/listening_hub.js',
      source_path: `listeningHub.listening_p3.items[${item.id - 1}].audio_text`,
      source_type: 'source_data',
      category: 'QUESTION_AUDIO',
      part: 'L3',
      canonical_transcript: item.audio_text,
      semantic_anchors: [item.name, ...item.audio_text.replace(/[.,?]/g, '').split(' ').filter(w => w.length > 4)],
      required: true
    });
  });

  // 11. Listening P4 (Example, Full, Q1-Q5)
  const p4ExampleText = listHub.listening_p4.questions[0].dialogue_script.map(d => d.text).join(' ');
  add({
    file: 'public/audio/week33/listening_p4_example.mp3',
    source_file: 'src/data/weeks/week_33/listening_hub.js',
    source_path: 'listeningHub.listening_p4.questions[0].dialogue_script',
    source_type: 'source_data',
    category: 'EXAMPLE_AUDIO',
    part: 'L4',
    canonical_transcript: p4ExampleText,
    semantic_anchors: ['Jake', 'corridor', 'picture A'],
    required: true
  });

  const p4FullText = listHub.listening_p4.questions.map(q => q.dialogue_script.map(d => d.text).join(' ')).join('\n');
  add({
    file: 'public/audio/week33/listening_p4_full.mp3',
    source_file: 'src/data/weeks/week_33/listening_hub.js',
    source_path: 'listeningHub.listening_p4.questions[*].dialogue_script',
    source_type: 'source_data',
    category: 'COMPOSITE_AUDIO',
    part: 'L4',
    canonical_transcript: p4FullText,
    semantic_anchors: ['Jake', 'corridor', 'cleaner', 'slipped', 'nurse', 'bandage', 'cold pack', 'headmaster'],
    required: true
  });

  listHub.listening_p4.questions.slice(1).forEach((q, idx) => {
    const qText = q.dialogue_script.map(d => d.text).join(' ');
    add({
      file: `public${q.audio_url}`,
      source_file: 'src/data/weeks/week_33/listening_hub.js',
      source_path: `listeningHub.listening_p4.questions[${idx + 1}].dialogue_script`,
      source_type: 'source_data',
      category: 'QUESTION_AUDIO',
      part: 'L4',
      canonical_transcript: `Question ${idx + 1}. ${q.question_en} ${qText}`,
      semantic_anchors: q.question_en.replace(/[.,?]/g, '').split(' ').filter(w => w.length > 4),
      required: true
    });
  });

  // 12. Listening P5 (Full, Inst 1-5)
  add({
    file: 'public/audio/week33/listening_p5_full.mp3',
    source_file: 'src/data/weeks/week_33/listening_hub.js',
    source_path: 'listeningHub.listening_p5.audio_script',
    source_type: 'source_data',
    category: 'COMPOSITE_AUDIO',
    part: 'L5',
    canonical_transcript: listHub.listening_p5.audio_script,
    semantic_anchors: ['notebook', 'yellow', 'backpack', 'blue', 'warning sign', 'wet', 'doorframe', 'green', 'notice board', 'care', 'nurse', 'red'],
    required: true
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
      file: `public/audio/week33/listening_p5_inst${idx + 1}.mp3`,
      source_file: 'src/data/weeks/week_33/listening_hub.js',
      source_path: `listeningHub.listening_p5.instructions[${idx + 1}].text`,
      source_type: 'source_data',
      category: 'INSTRUCTION_AUDIO',
      part: 'L5',
      canonical_transcript: inst.text,
      semantic_anchors: inst.anchors,
      required: true
    });
  });

  // 13. Cambridge Standard Reference (Replay 1-5, End 1-5)
  for (let i = 1; i <= 5; i++) {
    add({
      file: `public/audio/cambridge/flyers_replay_p${i}.mp3`,
      source_file: 'CAMBRIDGE_FLYERS_AUDIO_BLUEPRINT.md',
      source_path: `cambridge_audio_blueprint.flyers_replay_p${i}`,
      source_type: 'cambridge_blueprint',
      category: 'REPLAY_AUDIO',
      part: `L${i}`,
      canonical_transcript: `Now listen to Part ${i} again.`,
      semantic_anchors: ['listen', 'part', String(i), 'again'],
      required: true
    });
    add({
      file: `public/audio/cambridge/flyers_end_p${i}.mp3`,
      source_file: 'CAMBRIDGE_FLYERS_AUDIO_BLUEPRINT.md',
      source_path: `cambridge_audio_blueprint.flyers_end_p${i}`,
      source_type: 'cambridge_blueprint',
      category: 'END_AUDIO',
      part: `L${i}`,
      canonical_transcript: `That is the end of Part ${i}.`,
      semantic_anchors: ['end', 'part', String(i)],
      required: true
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
