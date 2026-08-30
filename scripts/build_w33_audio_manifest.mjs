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
    const fsPath = entry.filesystem_path || entry.file;
    const urlPath = fsPath.replace(/^public/, '');
    manifest.assets.push({
      asset: urlPath,
      filesystem_path: fsPath,
      file: fsPath,
      absolute_or_repo_path: fsPath,
      category: entry.category,
      part: entry.part,
      source_file: entry.source_file,
      source_key: entry.source_key,
      transcript: entry.transcript,
      expected_transcript: entry.transcript,
      canonical_transcript: entry.transcript,
      transcript_provenance: entry.transcript_provenance,
      required_anchors: entry.required_anchors || [],
      optional_anchors: entry.optional_anchors || [],
      required: true
    });
  }

  // 1. CLIL Article
  add({
    file: 'public/audio/week33/clil_friction.mp3',
    category: 'SOURCE_DATA_AUDIO',
    part: 'CLIL',
    source_file: 'src/data/weeks/week_33/reading_hub.js',
    source_key: 'clil_article.content_en',
    transcript: readHub.clil_article.content_en,
    transcript_provenance: 'SOURCE_DATA',
    required_anchors: ['friction', 'slip', 'wet floors', 'tiles', 'corridor', 'Jake', 'Tom', 'warning signs'],
    optional_anchors: ['rubber soles', 'cleaner', 'balanced']
  });

  // 2. STEM Story
  add({
    file: 'public/audio/week33/read_stem.mp3',
    category: 'SOURCE_DATA_AUDIO',
    part: 'STORY',
    source_file: 'src/data/weeks/week_33/read.js',
    source_key: 'text_en',
    transcript: readJs.text_en,
    transcript_provenance: 'SOURCE_DATA',
    required_anchors: ['Jake', 'corridor', 'science class', 'slipped', 'wet floor', 'nurse', 'bandage', 'friction', 'warning signs'],
    optional_anchors: ['cold pack', 'headmaster', 'relieved']
  });

  const staticAudioTasks = (await import(path.join(rootDir, 'tools/generate_w33_all_audio.mjs'))).STATIC_AUDIO_TASKS;
  const readSocialTask = staticAudioTasks.find(t => t.filename === 'read_social.mp3');
  if (!readSocialTask || !readSocialTask.text) {
    throw new Error('Could not find read_social.mp3 task in tools/generate_w33_all_audio.mjs');
  }

  // 3. Social Studies Story
  add({
    file: 'public/audio/week33/read_social.mp3',
    category: 'SOURCE_DATA_AUDIO',
    part: 'STORY',
    source_file: 'tools/generate_w33_all_audio.mjs',
    source_key: 'STATIC_AUDIO_TASKS[read_social.mp3].text',
    transcript: readSocialTask.text,
    transcript_provenance: 'SOURCE_DATA',
    required_anchors: ['safety rules', 'protect', 'student', 'peaceful environment', 'hallways', 'accidents', 'kindness', 'responsibility'],
    optional_anchors: ['citizens', 'care']
  });

  // 4. Knowledge Explorer
  add({
    file: 'public/audio/week33/explore.mp3',
    category: 'SOURCE_DATA_AUDIO',
    part: 'EXPLORE',
    source_file: 'src/data/weeks/week_33/explore.js',
    source_key: 'content_en',
    transcript: exploreJs.content_en,
    transcript_provenance: 'SOURCE_DATA',
    required_anchors: ['slipped', 'wet floor', 'friction', 'tiles', 'Jake', 'corridor', 'warning signs', 'Japan', 'Australia'],
    optional_anchors: ['cleaner', 'rubber mats']
  });

  // 5. Dictation (1-5)
  skillPractice.dictation.forEach(d => {
    add({
      file: `public${d.audio_url}`,
      category: 'SOURCE_DATA_AUDIO',
      part: 'DICTATION',
      source_file: 'src/data/weeks/week_33/skill_practice_hub.js',
      source_key: `skillPracticeHub.dictation[${d.id - 1}].text`,
      transcript: d.text,
      transcript_provenance: 'SOURCE_DATA',
      required_anchors: d.text.replace(/[.,]/g, '').split(' ').filter(w => w.length > 3),
      optional_anchors: []
    });
  });

  // 6. Exam Rubric Intros (L1-L5, S1-S4)
  const examIntros = [
    { file: 'exam_intro_L1.mp3', part: 'L1', text: 'Listen and draw lines. There is one example.', reqAnchors: ['draw lines', 'example'], optAnchors: ['listen'] },
    { file: 'exam_intro_L2.mp3', part: 'L2', text: 'Listen and write. There is one example.', reqAnchors: ['listen', 'write', 'example'], optAnchors: [] },
    { file: 'exam_intro_L3.mp3', part: 'L3', text: 'Listen and write a letter in each box. There is one example.', reqAnchors: ['letter', 'box', 'example'], optAnchors: ['listen'] },
    { file: 'exam_intro_L4.mp3', part: 'L4', text: 'Listen and tick the box. There is one example.', reqAnchors: ['tick', 'box', 'example'], optAnchors: ['listen'] },
    { file: 'exam_intro_L5.mp3', part: 'L5', text: 'Listen and colour and write. There is one example.', reqAnchors: ['colour', 'write', 'example'], optAnchors: ['listen'] },
    { file: 'exam_intro_S1.mp3', part: 'S1', text: 'Look at the two pictures. They are the same, but there are some differences. Tell me about the differences.', reqAnchors: ['pictures', 'differences'], optAnchors: ['same'] },
    {
      file: 'exam_intro_S2.mp3',
      part: 'S2',
      text: "Now I'd like you to ask and answer some questions about the school accident. I have a card with some information and so do you. Let's start. I'll ask you first. Where did the accident happen exactly? It happened in the school corridor near the science room. Good. And which part of Tom's body was hurt? He hurt his right knee. It was quite swollen. Right. Now it's your turn. Ask me about Jake's information on your card. Okay. What first aid item did Jake use to help Tom? Jake used a clean bandage and a cold pack to treat Tom's knee. And who praised Jake afterwards? The headmaster praised Jake in the school assembly. He was very proud of him.",
      reqAnchors: ['questions', 'school accident', 'corridor', 'science room', 'knee', 'clean bandage', 'headmaster'],
      optAnchors: ['card', 'swollen', 'assembly']
    },
    { file: 'exam_intro_S3.mp3', part: 'S3', text: 'Look at the pictures. They tell a story. Look at the pictures first and tell the story.', reqAnchors: ['pictures', 'story'], optAnchors: ['look'] },
    { file: 'exam_intro_S4.mp3', part: 'S4', text: "Now let's talk about you and your daily life. Answer the questions.", reqAnchors: ['talk', 'daily life', 'questions'], optAnchors: ['answer'] }
  ];

  examIntros.forEach(intro => {
    add({
      file: `public/audio/week33/${intro.file}`,
      category: 'CAMBRIDGE_STANDARD_AUDIO',
      part: intro.part,
      source_file: 'CAMBRIDGE_FLYERS_AUDIO_BLUEPRINT.md',
      source_key: `cambridge_audio_blueprint.${intro.file.replace('.mp3', '')}`,
      transcript: intro.text,
      transcript_provenance: 'CAMBRIDGE_BLUEPRINT',
      required_anchors: intro.reqAnchors,
      optional_anchors: intro.optAnchors
    });
  });

  // 7. Speaking P2 Questions (info_exchange_q1 to q4)
  spkHub.info_exchange_cards.table_b.fields.forEach((f, idx) => {
    add({
      file: `public${f.audio_url}`,
      category: 'QUESTION_AUDIO',
      part: 'S2',
      source_file: 'src/data/weeks/week_33/speaking_hub.js',
      source_key: `speakingHub.info_exchange_cards.table_b.fields[${idx}].nova_question`,
      transcript: f.nova_question,
      transcript_provenance: 'SOURCE_DATA',
      required_anchors: f.nova_question.replace(/[?.,]/g, '').split(' ').filter(w => w.length > 3),
      optional_anchors: []
    });
  });

  // 8. Listening P1 Full
  add({
    file: 'public/audio/week33/listening_p1_full.mp3',
    category: 'COMPOSITE_AUDIO',
    part: 'L1',
    source_file: 'src/data/weeks/week_33/listening_hub.js',
    source_key: 'listeningHub.listening_p1.passage_audio_script',
    transcript: listHub.listening_p1.passage_audio_script,
    transcript_provenance: 'SOURCE_DATA',
    required_anchors: ['Jake', 'Tom', 'Nurse Sarah', 'Headmaster Brown', 'Maria', 'David', 'corridor', 'mop', 'warning sign', 'water bottle'],
    optional_anchors: ['carrying', 'walking', 'relieved']
  });

  // 9. Listening P2 Full
  const p2Text = listHub.listening_p2.dialogue_script.map(d => d.text).join(' ');
  add({
    file: 'public/audio/week33/listening_p2_full.mp3',
    category: 'COMPOSITE_AUDIO',
    part: 'L2',
    source_file: 'src/data/weeks/week_33/listening_hub.js',
    source_key: 'listeningHub.listening_p2.dialogue_script',
    transcript: p2Text,
    transcript_provenance: 'SOURCE_DATA',
    required_anchors: ['Jake', 'Room 4B', 'Science', 'school corridor', '2 minutes', 'clean bandage', 'Headmaster Brown', 'safety badge'],
    optional_anchors: ['incident', 'assembly']
  });

  // 10. Listening P3 (Example, Full, Items 1-5)
  add({
    file: 'public/audio/week33/listening_p3_example.mp3',
    category: 'EXAMPLE_AUDIO',
    part: 'L3',
    source_file: 'src/data/weeks/week_33/listening_hub.js',
    source_key: 'listeningHub.listening_p3.example.dialogue_script',
    transcript: listHub.listening_p3.example.dialogue_script.map(d => d.text).join(' '),
    transcript_provenance: 'SOURCE_DATA',
    required_anchors: ['backpack', 'playground bench', 'letter H'],
    optional_anchors: ['blue', 'morning']
  });

  add({
    file: 'public/audio/week33/listening_p3_full.mp3',
    category: 'COMPOSITE_AUDIO',
    part: 'L3',
    source_file: 'src/data/weeks/week_33/listening_hub.js',
    source_key: 'listeningHub.listening_p3.passage_audio_script',
    transcript: listHub.listening_p3.passage_audio_script,
    transcript_provenance: 'SOURCE_DATA',
    required_anchors: ['backpack', 'Nurse Sarah', 'bandage', 'glass cabinet', 'cold pack', 'first-aid table', 'notebook', 'water bottle', 'alarm clock'],
    optional_anchors: ['playground bench', 'bedroom']
  });

  listHub.listening_p3.items.forEach(item => {
    add({
      file: `public${item.audio_url}`,
      category: 'QUESTION_AUDIO',
      part: 'L3',
      source_file: 'src/data/weeks/week_33/listening_hub.js',
      source_key: `listeningHub.listening_p3.items[${item.id - 1}].audio_text`,
      transcript: item.audio_text,
      transcript_provenance: 'SOURCE_DATA',
      required_anchors: [item.name, ...item.audio_text.replace(/[.,?]/g, '').split(' ').filter(w => w.length > 4)],
      optional_anchors: []
    });
  });

  // 11. Listening P4 (Example, Full, Q1-Q5)
  const p4ExampleText = listHub.listening_p4.questions[0].dialogue_script.map(d => d.text).join(' ');
  add({
    file: 'public/audio/week33/listening_p4_example.mp3',
    category: 'EXAMPLE_AUDIO',
    part: 'L4',
    source_file: 'src/data/weeks/week_33/listening_hub.js',
    source_key: 'listeningHub.listening_p4.questions[0].dialogue_script',
    transcript: p4ExampleText,
    transcript_provenance: 'SOURCE_DATA',
    required_anchors: ['Jake', 'corridor', 'picture A'],
    optional_anchors: ['carefully']
  });

  const p4FullText = listHub.listening_p4.questions.map(q => q.dialogue_script.map(d => d.text).join(' ')).join('\n');
  add({
    file: 'public/audio/week33/listening_p4_full.mp3',
    category: 'COMPOSITE_AUDIO',
    part: 'L4',
    source_file: 'src/data/weeks/week_33/listening_hub.js',
    source_key: 'listeningHub.listening_p4.questions[*].dialogue_script',
    transcript: p4FullText,
    transcript_provenance: 'SOURCE_DATA',
    required_anchors: ['Jake', 'corridor', 'cleaner', 'slipped', 'nurse', 'bandage', 'cold pack', 'headmaster'],
    optional_anchors: ['tiles', 'assembly']
  });

  listHub.listening_p4.questions.slice(1).forEach((q, idx) => {
    const qText = q.dialogue_script.map(d => d.text).join(' ');
    add({
      file: `public${q.audio_url}`,
      category: 'QUESTION_AUDIO',
      part: 'L4',
      source_file: 'src/data/weeks/week_33/listening_hub.js',
      source_key: `listeningHub.listening_p4.questions[${idx + 1}].dialogue_script`,
      transcript: qText,
      transcript_provenance: 'SOURCE_DATA',
      required_anchors: q.question_en.replace(/[.,?]/g, '').split(' ').filter(w => w.length > 4),
      optional_anchors: []
    });
  });

  // 12. Listening P5 (Full, Inst 1-5)
  add({
    file: 'public/audio/week33/listening_p5_full.mp3',
    category: 'COMPOSITE_AUDIO',
    part: 'L5',
    source_file: 'src/data/weeks/week_33/listening_hub.js',
    source_key: 'listeningHub.listening_p5.audio_script',
    transcript: listHub.listening_p5.audio_script,
    transcript_provenance: 'SOURCE_DATA',
    required_anchors: ['notebook', 'yellow', 'backpack', 'blue', 'warning sign', 'wet', 'doorframe', 'green', 'notice board', 'care', 'nurse', 'red'],
    optional_anchors: ['corridor', 'lockers']
  });

  // Scored production instructions: inst_1 through inst_5 (inst_0 is example)
  const scoredP5Instructions = listHub.listening_p5.instructions.filter(inst => !inst.isExample);
  scoredP5Instructions.forEach((inst, idx) => {
    const reqAnchors = [];
    if (inst.color) reqAnchors.push(inst.color.toLowerCase());
    if (inst.word) reqAnchors.push(inst.word.toLowerCase());
    const textWords = inst.text.replace(/[^a-zA-Z]/g, ' ').split(/\s+/).filter(w => w.length > 3 && !['color', 'colour', 'write', 'word'].includes(w.toLowerCase()));
    reqAnchors.push(...textWords.map(w => w.toLowerCase()));

    add({
      file: `public/audio/week33/listening_p5_inst${idx + 1}.mp3`,
      category: 'INSTRUCTION_AUDIO',
      part: 'L5',
      source_file: 'src/data/weeks/week_33/listening_hub.js',
      source_key: `listeningHub.listening_p5.instructions[${idx + 1}].text`,
      transcript: inst.text,
      transcript_provenance: 'SOURCE_DATA',
      required_anchors: Array.from(new Set(reqAnchors)),
      optional_anchors: []
    });
  });

  // 13. Cambridge Standard Reference (Replay 1-5, End 1-5)
  for (let i = 1; i <= 5; i++) {
    add({
      file: `public/audio/cambridge/flyers_replay_p${i}.mp3`,
      category: 'REPLAY_AUDIO',
      part: `L${i}`,
      source_file: 'CAMBRIDGE_FLYERS_AUDIO_BLUEPRINT.md',
      source_key: `cambridge_audio_blueprint.flyers_replay_p${i}`,
      transcript: `Now listen to Part ${i} again.`,
      transcript_provenance: 'CAMBRIDGE_BLUEPRINT',
      required_anchors: ['listen', 'part', String(i), 'again'],
      optional_anchors: []
    });
    add({
      file: `public/audio/cambridge/flyers_end_p${i}.mp3`,
      category: 'END_AUDIO',
      part: `L${i}`,
      source_file: 'CAMBRIDGE_FLYERS_AUDIO_BLUEPRINT.md',
      source_key: `cambridge_audio_blueprint.flyers_end_p${i}`,
      transcript: `That is the end of Part ${i}.`,
      transcript_provenance: 'CAMBRIDGE_BLUEPRINT',
      required_anchors: ['end', 'part', String(i)],
      optional_anchors: []
    });
  }

  const auditDir = path.join(rootDir, 'docs/audit/w33');
  fs.mkdirSync(auditDir, { recursive: true });
  const outputPathAudit = path.join(auditDir, 'W33_AUDIO_SEMANTIC_MANIFEST.json');
  const outputPathLegacy = path.join(rootDir, 'docs/W33_AUDIO_SEMANTIC_MANIFEST.json');
  const manifestJson = JSON.stringify(manifest, null, 2);
  fs.writeFileSync(outputPathAudit, manifestJson);
  fs.writeFileSync(outputPathLegacy, manifestJson);
  console.log(`✅ Generated canonical audio semantic manifest: ${outputPathAudit} (${manifest.assets.length} assets)`);
}

buildManifest().catch(err => {
  console.error('❌ Manifest generation error:', err);
  process.exit(1);
});
