/**
 * Word Class Duel (I7 mini-game) Annotated Content for Week 33
 * Target words with dual-class usage (Noun vs Verb) in Cambridge context.
 * Note: Round 1 (grip) is verbatim from W33 CLIL; Rounds 2-4 (slide, care, help) are authored draft context pending pedagogy review before release.
 */
export const WEEK_33_WORD_CLASS_DUEL = [
  {
    id: 'w33_wcd_1',
    word: 'grip',
    targetRole: 'VERB',
    prompt: "Which sentence uses 'grip' as a VERB (hành động)?",
    cards: [
      { id: 'c1', text: "Your rubber shoes grip firmly on dry corridor tiles.", role: 'VERB', isCorrect: true },
      { id: 'c2', text: "Rubber gives a strong grip on clean floors.", role: 'NOUN', isCorrect: false },
      { id: 'c3', text: "Plastic soles with no grip can cause accidents.", role: 'NOUN', isCorrect: false },
      { id: 'c4', text: "The friendly grip between soles and floor keeps you safe.", role: 'NOUN', isCorrect: false },
    ],
    hint: "Look for the sentence where 'grip' describes an action done by the shoes."
  },
  {
    id: 'w33_wcd_2',
    word: 'slide',
    targetRole: 'NOUN',
    prompt: "Which sentence uses 'slide' as a NOUN (danh từ)?",
    cards: [
      { id: 'c1', text: "Water turns safe corridors into a dangerous slide.", role: 'NOUN', isCorrect: true },
      { id: 'c2', text: "Smooth soles slide easily across wet tiles.", role: 'VERB', isCorrect: false },
      { id: 'c3', text: "Children might slide and fall when running.", role: 'VERB', isCorrect: false },
      { id: 'c4', text: "Friction stops you before you slide too far.", role: 'VERB', isCorrect: false },
    ],
    hint: "Notice 'a dangerous slide' — 'slide' is preceded by an article and adjective."
  },
  {
    id: 'w33_wcd_3',
    word: 'care',
    targetRole: 'VERB',
    prompt: "Which sentence uses 'care' as a VERB (hành động)?",
    cards: [
      { id: 'c1', text: "Teachers care deeply about student safety.", role: 'VERB', isCorrect: true },
      { id: 'c2', text: "Take great care when walking down the corridor.", role: 'NOUN', isCorrect: false },
      { id: 'c3', text: "School safety and care are our responsibility.", role: 'NOUN', isCorrect: false },
      { id: 'c4', text: "The nurse provided gentle medical care.", role: 'NOUN', isCorrect: false },
    ],
    hint: "Find the sentence where 'care' tells what teachers do."
  },
  {
    id: 'w33_wcd_4',
    word: 'help',
    targetRole: 'NOUN',
    prompt: "Which sentence uses 'help' as a NOUN (danh từ)?",
    cards: [
      { id: 'c1', text: "Jake called the nurse for immediate help.", role: 'NOUN', isCorrect: true },
      { id: 'c2', text: "Good students help each other when someone falls.", role: 'VERB', isCorrect: false },
      { id: 'c3', text: "Cold packs help reduce painful swelling.", role: 'VERB', isCorrect: false },
      { id: 'c4', text: "Warning signs help students stay alert.", role: 'VERB', isCorrect: false },
    ],
    hint: "'immediate help' — 'help' functions as the object of the preposition 'for'."
  }
];

export default WEEK_33_WORD_CLASS_DUEL;
