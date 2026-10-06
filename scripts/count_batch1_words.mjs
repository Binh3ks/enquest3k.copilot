import fs from 'fs';

console.log('=== 1. QUESTION QUEST RUNNER WORD COUNT ===');
const qqCode = fs.readFileSync('src/modules/chronicles/games/QuestionQuestRunner.jsx', 'utf-8');
const qqMatch = qqCode.match(/export const DEFAULT_WH_KERNEL_ROUNDS = (\[[\s\S]*?\]);\s*function shuffleArray/);
if (qqMatch) {
  const rounds = eval(qqMatch[1]);
  rounds.forEach((round, i) => {
    const sentenceWords = round.sentence.trim().split(/\s+/).length;
    const optWords = round.options.map(o => o.text.trim().split(/\s+/).length);
    const totalScreenWords = sentenceWords + optWords.reduce((a, b) => a + b, 0);
    const maxOptWords = Math.max(...optWords);
    const delta = Math.max(...optWords) - Math.min(...optWords);
    console.log(`Round ${i + 1}: sentence="${round.sentence}" (${sentenceWords}w)`);
    console.log(`  Options: ${round.options.map(o => `"${o.text}" (${o.text.trim().split(/\s+/).length}w)`).join(', ')}`);
    console.log(`  delta = ${delta}, maxOptionWords = ${maxOptWords}`);
    console.log(`  Total words on screen (sentence + 3 options) = ${totalScreenWords}w\n`);
  });
}

// 2. SyntaxExpressRail
const syntaxCode = fs.readFileSync('src/modules/quest/SyntaxExpressRail.jsx', 'utf-8');
// Extract DEFAULT_SYNTAX_ROUNDS
console.log('=== 2. SYNTAX EXPRESS RAIL WORD COUNT ===');
// We can evaluate or parse the array
const match = syntaxCode.match(/const DEFAULT_SYNTAX_ROUNDS = (\[[\s\S]*?\]);/);
if (match) {
  const rounds = eval(match[1]);
  rounds.forEach((round, i) => {
    const stemWords = round.stem.trim().split(/\s+/).length;
    const fullWords = round.fullSentence.trim().split(/\s+/).length;
    const optWords = round.options.map(o => o.text.trim().split(/\s+/).length);
    const totalScreenWords = stemWords + optWords.reduce((a, b) => a + b, 0);
    const maxOptWords = Math.max(...optWords);
    const delta = Math.max(...optWords) - Math.min(...optWords);
    console.log(`Round ${i + 1}: stem="${round.stem}" (${stemWords}w), full="${round.fullSentence}" (${fullWords}w)`);
    console.log(`  Options: ${round.options.map(o => `"${o.text}" (${o.text.trim().split(/\s+/).length}w)`).join(', ')}`);
    console.log(`  delta = ${delta}, maxOptionWords = ${maxOptWords}`);
    console.log(`  Total words on screen (stem + 3 options) = ${totalScreenWords}w\n`);
  });
}
