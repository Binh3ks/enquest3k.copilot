import week4 from '../src/data/weeks/week_04.js';
import fs from 'fs';
import path from 'path';

const cleanText = (text) => text ? text.replace(/\*\*/g, '').replace(/"/g, "'").trim() : "";

const tasks = [];
const publicDir = `public/audio/week4`;

const add = (text, path, rate="+0%") => {
    if(text) tasks.push({ text: cleanText(text), path: `public${path}`, rate });
};

// Quét dữ liệu từ object week4 đã có
const d = week4.stations;

// 1. Read
add(d.read_explore.content_en, d.read_explore.audio_url);

// 2. Vocab
d.new_words.vocab.forEach(w => {
    add(w.word, w.audio_word);
    add(w.definition_en, w.audio_def);
    if (w.collocation) add(w.collocation, w.audio_coll);
    else if (w.example) add(w.example, w.audio_coll);
});

// 3. Word Power
d.word_power.words.forEach(w => {
    add(w.word, w.audio_word);
    add(w.definition_en, w.audio_def);
    add(w.collocation || w.model_sentence, w.audio_coll);
});

// 4. Dictation
d.dictation.sentences.forEach(s => add(s.text, s.audio_url));

// 5. Shadowing
const fullShadow = [];
d.shadowing.script.forEach(s => {
    add(s.text, s.audio_url);
    fullShadow.push(cleanText(s.text));
});
if(fullShadow.length) add(fullShadow.join(" "), "/audio/week4/shadow_full_slow.mp3", "-20%");

// 6. Logic & Explore
d.logic_lab.puzzles.forEach(p => { if(p.question_en) add(p.question_en, p.audio_url); });
if(d.explore.content_en) add(d.explore.content_en, d.explore.audio_url);

fs.writeFileSync('audio_tasks.json', JSON.stringify(tasks, null, 2));
console.log(`✅ Generated ${tasks.length} tasks for Python.`);
