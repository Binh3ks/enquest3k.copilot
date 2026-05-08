export default {
  title: "Writing: How a Seed Grows into a Plant",
  min_words: 40,
  model_sentence: "Here is how a seed grows into a plant. First, a seed is planted in warm, moist soil. It needs water and warmth to germinate. Next, the seed germinates and a tiny green sprout pushes through the soil. After that, the stem grows taller toward the sunlight. The roots absorb water and nutrients from the soil. The leaves open and use sunlight to make food through photosynthesis. Finally, a beautiful flower blooms at the top of the plant. It is amazing that a tiny seed grows into something so beautiful!",
  instruction_en: "Use Present Simple for facts: A seed needs... / It grows... / Roots go... / The plant becomes...",
  instruction_vi: "Dùng Present Simple: A seed needs... / It grows... / Roots go... / The plant becomes...",
  prompt_en: "Write about how a seed grows into a plant! Where does a seed start? What does it need — water, sunlight, soil? What happens first, then next? What does the plant look like in the end?",
  prompt_vi: "Viết về cách một hạt giống lớn thành cây! Hạt giống bắt đầu từ đâu? Nó cần gì — nước, ánh nắng, đất? Điều gì xảy ra trước, sau đó là gì? Cây trông như thế nào cuối cùng?",
  keywords: ["seed", "soil", "root", "stem", "leaf", "flower", "sunlight", "germinate", "absorb", "nutrients", "sprout", "photosynthesis", "observe", "grows", "needs", "first", "next", "after that", "finally", "water"],
  topic_talk_prompt: "Tell me about a plant, garden, or living thing you have watched or taken care of. What changed over time?",
  sentence_frames: [{"template":"First, a seed needs ___, ___, and ___ to grow."},{"template":"Then, the ___ pushes through the soil."},{"template":"After that, the ___ grows toward the sunlight."},{"template":"The leaves use sunlight to make ___."},{"template":"Finally, a ___ blooms and the plant is beautiful."}],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need words? Click here",
      label_vi: "💡 Cần từ? Bấm đây",
      show_by_default: false,
      words: [
        {word: "seed", vi: "hạt giống", distractor: false},
        {word: "soil", vi: "đất", distractor: false},
        {word: "root", vi: "rễ cây", distractor: false},
        {word: "grow", vi: "lớn", distractor: true},
        {word: "stem", vi: "thân cây", distractor: false},
        {word: "leaf", vi: "lá", distractor: false},
        {word: "flower", vi: "hoa", distractor: false},
        {word: "need", vi: "cần", distractor: true},
        {word: "sunlight", vi: "ánh sáng mặt trời", distractor: false},
        {word: "germinates", vi: "nảy mầm", distractor: false},
        {word: "grows", vi: "lớn lên", distractor: false},
        {word: "needs", vi: "cần", distractor: false},
        {word: "absorb", vi: "hấp thụ", distractor: false},
        {word: "sprout", vi: "mầm non", distractor: false},
        {word: "water", vi: "nước", distractor: false}
      ]
    },
    model_paragraph: {
      label_en: "📖 See example? (Try writing first!)",
      label_vi: "📖 Xem mẫu? (Thử viết trước nhé!)",
      show_by_default: false,
      warning_en: "⚠️ Try writing first before looking!",
      warning_vi: "⚠️ Hãy thử viết trước khi xem!",
      text: "Here is how a seed grows into a plant. First, a seed is planted in warm, moist soil. It needs water and warmth to germinate. Next, the seed germinates and a tiny green sprout pushes through the soil. After that, the stem grows taller toward the sunlight. The roots absorb water and nutrients from the soil. The leaves open and use sunlight to make food through photosynthesis. Finally, a beautiful flower blooms at the top of the plant. It is amazing that a tiny seed grows into something so beautiful!"
    }
  }
};
