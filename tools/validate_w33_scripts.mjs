import { listeningHubData } from '../src/data/weeks/week_33/listening_hub.js';

function parseDialogue(rawText) {
  const speakerPattern = /(Nova|Girl|Boy|Man|Woman|Teacher|Nurse|Headmaster|Jake|Tom):\s*/gi;
  const tagMatches = [...rawText.matchAll(speakerPattern)];
  const lines = [];

  if (tagMatches.length > 0) {
    if (tagMatches[0].index > 0) {
      const intro = rawText.substring(0, tagMatches[0].index).trim();
      if (intro) {
        lines.push({ speaker: 'nova', text: intro });
      }
    }

    for (let i = 0; i < tagMatches.length; i++) {
      const currentMatch = tagMatches[i];
      const speaker = currentMatch[1].toLowerCase();
      const startPos = currentMatch.index + currentMatch[0].length;
      const endPos = (i + 1 < tagMatches.length) ? tagMatches[i + 1].index : rawText.length;
      const speechContent = rawText.substring(startPos, endPos).trim();
      if (speechContent) {
        lines.push({ speaker, text: speechContent });
      }
    }
  }
  return lines;
}

console.log("=== Testing Part 1 Script ===");
const p1Lines = parseDialogue(listeningHubData.listening_p1.passage_audio_script);
console.log(`Part 1 turns: ${p1Lines.length}`);
p1Lines.forEach((l, i) => console.log(` [${i+1}] ${l.speaker.toUpperCase()}: ${l.text.substring(0, 50)}...`));

console.log("\n=== Testing Part 3 Script ===");
const p3Lines = parseDialogue(listeningHubData.listening_p3.passage_audio_script);
console.log(`Part 3 turns: ${p3Lines.length}`);

console.log("\n=== Testing Part 4 Questions (Distractors) ===");
listeningHubData.listening_p4_questions.forEach((q, idx) => {
  const lines = parseDialogue(q.audio_script);
  console.log(` Q${idx + 1} (${q.id}) turns: ${lines.length} | Script: ${q.audio_script.replace(/\n/g, ' ')}`);
});
