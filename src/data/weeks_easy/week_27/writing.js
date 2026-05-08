export default {
  title: "Writing: How a Seed Grows",
  min_words: 30,
  model_sentence: "Here is how a seed grows into a plant. First, a seed is planted in the soil. It needs water and sunlight to grow. Next, a tiny green sprout appears. After that, the stem grows taller and leaves open up. A leaf uses sunlight to make food. Finally, a beautiful flower blooms at the top. A plant is amazing!",
  instruction_en: "Use Present Simple for facts: A seed needs... / It grows... / Roots go... / The plant becomes...",
  instruction_vi: "Dùng Present Simple: A seed needs... / It grows... / Roots go... / The plant becomes...",
  prompt_en: "Write about how a seed grows into a plant! Where does a seed start? What does it need — water, sunlight, soil? What happens first, then next? What does the plant look like in the end?",
  prompt_vi: "Viết về cách một hạt giống lớn thành cây! Hạt giống bắt đầu từ đâu? Nó cần gì — nước, ánh nắng, đất? Điều gì xảy ra trước, sau đó là gì? Cây trông như thế nào cuối cùng?",
  keywords: ["seed", "soil", "root", "stem", "leaf", "flower", "sunlight", "water", "grows", "needs", "absorbs", "sprout", "first", "next", "after that", "finally", "plant"],
  topic_talk_prompt: "Tell me about a plant or animal you have watched grow or change.",
  sentence_frames: [{"template":"A seed starts in the ___. It needs ___, ___, and ___."},{"template":"First, the roots grow ___. Then, a small ___ appears."},{"template":"After that, the ___ grows toward the sunlight."},{"template":"The plant needs ___ water and ___ sunlight."},{"template":"Finally, a ___ blooms."},{"template":"A plant is important because ___."}],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Word Bank",
      label_vi: "💡 Ngân hàng từ",
      show_by_default: true,
      words: [
        {word: "seed", vi: "hạt giống", distractor: false},
        {word: "soil", vi: "đất", distractor: false},
        {word: "root", vi: "rễ cây", distractor: false},
        {word: "stem", vi: "thân cây", distractor: false},
        {word: "leaf", vi: "lá", distractor: false},
        {word: "flower", vi: "hoa", distractor: false},
        {word: "sunlight", vi: "ánh sáng mặt trời", distractor: false},
        {word: "grows", vi: "lớn lên", distractor: false},
        {word: "needs", vi: "cần", distractor: false},
        {word: "sprout", vi: "mầm non", distractor: false},
        {word: "water", vi: "nước", distractor: false},
        {word: "grow", vi: "lớn (sai dạng)", distractor: true},
        {word: "need", vi: "cần (sai dạng)", distractor: true}
      ]
    },
    model_paragraph: {
      label_en: "📖 See example paragraph",
      label_vi: "📖 Xem bài mẫu",
      show_by_default: false,
      warning_en: "⚠️ Try writing first before looking!",
      warning_vi: "⚠️ Hãy thử viết trước khi xem!",
      text: "Here is how a seed grows into a plant. First, a seed is planted in the soil. It needs water and sunlight to grow. Next, a tiny green sprout appears. After that, the stem grows taller and leaves open up. A leaf uses sunlight to make food. Finally, a beautiful flower blooms at the top. A plant is amazing!"
    }
  }
};
