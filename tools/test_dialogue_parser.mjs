const fullListeningScript = "Look at Part 1. Listen and draw lines. Girl: Look at that boy in the corridor! Is he running? Man: No, the boy slipping on the wet floor in the red shirt is Tom! Look at the boy walking carefully in the blue shirt. Girl: Oh, I see him now. Is that Jake? Man: Yes, that's right. Jake is walking carefully. Girl: Who is the lady in the white uniform carrying a bandage? Man: That's the school nurse! She is rushing to help Tom. Girl: And who is the tall man in the blue suit talking to students? Man: That's the headmaster. He is making sure everyone stays safe. Girl: Look at the girl near the yellow wet floor sign holding a mop. Man: Ah, that's Mia. She is cleaning the wet floor so nobody else falls.";

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

const parsed = parseDialogue(fullListeningScript);
console.log("Total parsed turns:", parsed.length);
parsed.forEach((p, idx) => {
  console.log(`\n[Turn ${idx + 1}] ${p.speaker.toUpperCase()}: "${p.text}"`);
});
