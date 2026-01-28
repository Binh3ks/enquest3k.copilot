import fs from 'fs';
import path from 'path';

async function main() {
  const vocabData = (await import('../src/data/weeks/week_06/vocab.js')).default;
  const wordPowerData = (await import('../src/data/weeks/week_06/word_power.js')).default;

// Asset Inventory name convention
function getFileName(type, word) {
  if (type === 'vocab') return `${word}.jpg`;
  if (type === 'wordpower') return `wordpower_${word.replace(/\s+/g, '_')}.jpg`;
  if (type === 'read_cover') return `read_cover_w06.jpg`;
  if (type === 'explore_cover') return `explore_cover_w06.jpg`;
  return `${word}.jpg`;
}

function buildPrompt(word, definition) {
  return `Flat vector, 2D, minimalist. ${definition}`;
}

  const lines = [
    'Hãy tạo ảnh và ghi mã định danh vào góc dưới bên trái',
    ''
  ];

  // Vocab images
  vocabData.vocab.forEach(v => {
    lines.push(`Filename: ${getFileName('vocab', v.word)}`);
    lines.push(buildPrompt(v.word, v.definition_en));
    lines.push('');
  });

  // Word Power images
  wordPowerData.words.forEach(w => {
    lines.push(`Filename: ${getFileName('wordpower', w.word)}`);
    lines.push(buildPrompt(w.word, w.definition_en));
    lines.push('');
  });

  // Cover images
  lines.push(`Filename: ${getFileName('read_cover')}`);
  lines.push('Flat vector, 2D, minimalist. Scene: Children reading a book together, bright pastel colors.');
  lines.push('');
  lines.push(`Filename: ${getFileName('explore_cover')}`);
  lines.push('Flat vector, 2D, minimalist. Scene: Children exploring with magnifying glass, bright pastel colors.');
  lines.push('');

  // Write to file
  const outDir = path.join(process.cwd(), 'MASS_Final', 'Image prompts');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, 'week_06_image_prompts.txt');
  fs.writeFileSync(outPath, lines.join('\n'), 'utf-8');
  console.log(`✅ Exported image prompts for week 6 to ${outPath}`);
}

main();
