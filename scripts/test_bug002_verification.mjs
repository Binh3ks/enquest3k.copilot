import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Import weeks directly
const weeks = [
  { id: 33, mod: await import('../src/data/weeks/week_33/index.js') },
  { id: 34, mod: await import('../src/data/weeks/week_34/index.js') },
  { id: 35, mod: await import('../src/data/weeks/week_35/index.js') },
];

console.log('=== VERIFYING VOCAB EXTRACTION & PURITY (W33, W34, W35) ===\n');

for (const { id, mod } of weeks) {
  const weekData = mod.default;
  const reading_hub = weekData?.readingHub || weekData?.reading_hub;
  const listening_hub = weekData?.listeningHub || weekData?.listening_hub;
  const writing_hub = weekData?.writingHub || weekData?.writing_hub;
  const speaking_hub = weekData?.speakingHub || weekData?.speaking_hub;

  // Emulate extractVocabFromData logic with the fix
  let items = [];
  if (weekData?.stations?.new_words && Array.isArray(weekData.stations.new_words)) {
    items.push(...weekData.stations.new_words);
  } else if (weekData?.stations?.vocab && Array.isArray(weekData.stations.vocab)) {
    items.push(...weekData.stations.vocab);
  } else if (weekData?.vocab && Array.isArray(weekData.vocab)) {
    items.push(...weekData.vocab);
  } else if (weekData?.new_words && Array.isArray(weekData.new_words)) {
    items.push(...weekData.new_words);
  }

  if (writing_hub?.rw_part_1?.definitions && Array.isArray(writing_hub.rw_part_1.definitions)) {
    items.push(...writing_hub.rw_part_1.definitions.map(d => ({
      word: d.target,
      definition: d.text
    })));
  }

  // Filter sentences
  const pureVocab = items.filter(item => {
    if (!item) return false;
    if (typeof item === 'string') {
      return item.trim().split(/\s+/).length <= 4 && !/[.!?]$/.test(item.trim());
    }
    if (item.sentence || item.starter || item.completion) return false;
    const wordText = item.word || item.term || item.text || item.phrase || item.chunk || '';
    if (wordText.trim().split(/\s+/).length > 4 || /[.!?]$/.test(wordText.trim())) return false;
    return true;
  });

  // Count definitions
  const totalPure = pureVocab.length;
  const withDef = pureVocab.filter(v => v.definition_en || v.definition || v.meaning).length;
  const fillerCount = pureVocab.filter(v => (v.definition || '').startsWith('Related to')).length;
  const grammarCount = pureVocab.filter(v => v.sentence || (v.word || '').split(/\s+/).length > 4).length;

  console.log(`Week ${id}:`);
  console.log(`  Total pure vocab items: ${totalPure}`);
  console.log(`  With genuine English definitions: ${withDef}`);
  console.log(`  "Related to" fillers: ${fillerCount}`);
  console.log(`  Grammar sentences leaked: ${grammarCount}`);
  console.log(`  Sample item:`, {
    word: pureVocab[0]?.word,
    definition: pureVocab[0]?.definition_en || pureVocab[0]?.definition
  });
  console.log('');
}
