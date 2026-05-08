export default {
  title: "Writing: My Step-by-Step Guide",
  min_words: 30,
  model_sentence: "Here is how I make a jam sandwich step by step. First, I take two slices of bread. Next, I spread jam on one slice with a knife. Then, I press the two slices together. Finally, I cut the sandwich in half and eat it. The order is very important!",
  instruction_en: "Use: First, I ___ . Next, I ___ . Then, I ___ . Finally, I ___ .",
  instruction_vi: "Dùng: First, I ___ . Next, I ___ . Then, I ___ . Finally, I ___ .",
  prompt_en: "Write a step-by-step guide for doing something you know well — making a sandwich, getting ready for school, or playing a game. Use: First, Next, Then, Finally. Write at least 4 steps.",
  prompt_vi: "Viết hướng dẫn từng bước làm điều gì đó bạn biết — làm bánh mì kẹp, chuẩn bị đi học, hay chơi một trò chơi. Dùng: First, Next, Then, Finally. Viết ít nhất 4 bước.",
  keywords: ["first", "next", "then", "finally", "bread", "jam", "spread", "knife", "toothpaste", "brush", "rinse", "step", "sequence"],
  topic_talk_prompt: "Tell me about how you do something. What are the steps?",
  sentence_frames: [{"template":"Today I will show you how to ___."},{"template":"You will need: ___, ___, and ___."},{"template":"First, I ___."},{"template":"Next, I ___ and then I ___."},{"template":"Then, I carefully ___."},{"template":"Finally, I ___ and it was ___!"},{"template":"Here is a tip: always remember to ___."}],
  
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "medium-low",
      words: [
        {word: "=== SEQUENCE WORDS (grouped) ===", vi: "", distractor: false},
        {word: "First", vi: "Đầu tiên", distractor: false},
        {word: "Next", vi: "Tiếp theo", distractor: false},
        {word: "Then", vi: "Sau đó", distractor: false},
        {word: "Finally", vi: "Cuối cùng", distractor: false},
        {word: "=== TASKS & VERBS (shuffled) ===", vi: "", distractor: false},
        {word: "make a sandwich", vi: "làm bánh mì kẹp", distractor: false},
        {word: "brush my teeth", vi: "đánh răng", distractor: false},
        {word: "get ready for school", vi: "chuẩn bị đi học", distractor: false},
        {word: "bread", vi: "bánh mì", distractor: false},
        {word: "jam", vi: "mứt", distractor: false},
        {word: "a knife", vi: "con dao", distractor: false},
        {word: "toothpaste", vi: "kem đánh răng", distractor: false},
        {word: "a toothbrush", vi: "bàn chải", distractor: false},
        {word: "take two slices of bread", vi: "lấy 2 lát bánh mì", distractor: false},
        {word: "spread jam", vi: "phết mứt", distractor: false},
        {word: "press the slices together", vi: "ghép 2 lát lại", distractor: false},
        {word: "put toothpaste on the brush", vi: "bôi kem lên bàn chải", distractor: false},
        {word: "brush for 2 minutes", vi: "đánh răng 2 phút", distractor: false},
        {word: "rinse my mouth", vi: "súc miệng", distractor: false},
        {word: "cut the sandwich", vi: "cắt bánh", distractor: false},
        {word: "eat it", vi: "ăn nó", distractor: false},
        {word: "check the result", vi: "kiểm tra kết quả", distractor: false},
        {word: "delicious", vi: "ngon", distractor: false},
        {word: "perfect", vi: "hoàn hảo", distractor: false},
        {word: "be careful", vi: "cẩn thận", distractor: false},
        {word: "follow all steps", vi: "làm theo các bước", distractor: false},
        {word: "firsts", vi: "đầu tiên (sai dạng)", distractor: true},
        {word: "making", vi: "làm (sai dạng)", distractor: true}
      ]
    }
  }
};
