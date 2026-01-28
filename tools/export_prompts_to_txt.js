import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join('src', 'data', 'weeks');
const OUT_DIR = path.join('MASS_Final');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

// Utility: Normalize file name for Asset Inventory
function getFileName(type, word, weekNum) {
  if (type === 'vocab') return `${word}.jpg`;
  if (type === 'wordpower') return `wordpower_${word.replace(/\s+/g, '_')}.jpg`;
  if (type === 'read_cover') return `read_cover_w${weekNum}.jpg`;
  if (type === 'explore_cover') return `explore_cover_w${weekNum}.jpg`;
  return `${word}.jpg`;
}

// Utility: Build prompt (simple version, can be replaced with Art Bible logic)
function buildPrompt(word, definition, type) {
  if (type === 'wordpower') {
    return `Flat vector, 2D, minimalist. Scene: ${word}.`;
  }
  if (type === 'read_cover') {
    return 'Flat vector, 2D, minimalist. Scene: Children reading a book together, bright pastel colors.';
  }
  if (type === 'explore_cover') {
    return 'Flat vector, 2D, minimalist. Scene: Children exploring with magnifying glass, bright pastel colors.';
  }
  // Default for vocab
  return `Flat vector, 2D, minimalist. ${definition}`;
}

function exportPromptsForWeek(weekDir, weekNum) {
  let lines = [
    'Hãy tạo ảnh và ghi mã định danh vào góc dưới bên trái',
    ''
  ];
  // Vocab
  const vocabPath = path.join(weekDir, 'vocab.js');
  if (fs.existsSync(vocabPath)) {
    const vocabData = require(path.resolve(vocabPath)).default.vocab;
    for (const v of vocabData) {
      const fname = getFileName('vocab', v.word, weekNum);
      const prompt = buildPrompt(v.word, v.definition_en, 'vocab');
      lines.push(`Filename: ${fname}`);
      lines.push(prompt);
      lines.push('');
    }
  }
  // Word Power
  const wpPath = path.join(weekDir, 'word_power.js');
  if (fs.existsSync(wpPath)) {
    const wpData = require(path.resolve(wpPath)).default.words;
    for (const w of wpData) {
      const fname = getFileName('wordpower', w.word, weekNum);
      const prompt = buildPrompt(w.word, w.definition_en, 'wordpower');
      lines.push(`Filename: ${fname}`);
      lines.push(prompt);
      lines.push('');
    }
  }
  // Covers
  lines.push(`Filename: ${getFileName('read_cover', '', weekNum)}`);
  lines.push(buildPrompt('', '', 'read_cover'));
  lines.push('');
  lines.push(`Filename: ${getFileName('explore_cover', '', weekNum)}`);
  lines.push(buildPrompt('', '', 'explore_cover'));
  lines.push('');
  // Write to file
  const outPath = path.join(OUT_DIR, `weeks_${weekNum}_prompts.txt`);
  fs.writeFileSync(outPath, lines.join('\n'), 'utf-8');
  console.log(`✅ Exported prompts for week ${weekNum} to ${outPath}`);
}

function main() {
  const weekDirs = fs.readdirSync(DATA_DIR).filter(f => f.startsWith('week_'));
  for (const dir of weekDirs) {
    const weekNum = dir.match(/week_(\d+)/)[1];
    exportPromptsForWeek(path.join(DATA_DIR, dir), weekNum);
  }
}

main();
