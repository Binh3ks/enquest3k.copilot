export default {
  title: "Writing: My Emotional Day",
  min_words: 40,
  model_sentence: "Yesterday was a very emotional day for me. In the morning I was scared because I could not find my bag, but my mum was calm and helped me look. I was relieved when we found it under my bed. At school I was excited because there was a surprise visitor. When the visitor walked in, everyone was surprised and cheerful. By the end of the day I was tired but happy.",
  instruction_en: "Use: I was (excited/scared/happy)... / I felt ___ when... / I was ___ because...",
  instruction_vi: "Dùng: I was (excited/scared/happy)... / I felt ___ when... / I was ___ because...",
  prompt_en: "Write about a day when you felt different emotions! When did you feel excited? When were you scared or nervous? When were you happy? What happened to make you feel that way?",
  prompt_vi: "Viết về một ngày với nhiều cảm xúc khác nhau! Khi nào bạn thấy hứng khởi? Khi nào sợ hoặc hồi hộp? Khi nào vui? Chuyện gì xảy ra?",
  keywords: ["was", "were", "scared", "excited", "tired", "relieved", "cheerful", "calm", "worried", "surprised", "bored", "hungry", "thirsty", "angry", "upset", "because", "when"],
  topic_talk_prompt: "Tell me about a time you felt very happy or very sad. What happened?",
  sentence_frames: [{"template":"Yesterday was a day of big feelings!"},{"template":"In the morning, I was ___ because ___."},{"template":"I was ___ when ___."},{"template":"Then I felt ___ because ___."},{"template":"Later, I was ___ when ___."},{"template":"At the end of the day, I was ___ because ___."},{"template":"I will remember this day because ___."}],
  
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "medium-low",
      words: [
        {word: "=== EMOTIONS (grouped) ===", vi: "", distractor: false},
        {word: "excited", vi: "hào hứng", distractor: false},
        {word: "scared", vi: "sợ", distractor: false},
        {word: "worried", vi: "lo lắng", distractor: false},
        {word: "relieved", vi: "nhẹ nhõm", distractor: false},
        {word: "surprised", vi: "ngạc nhiên", distractor: false},
        {word: "cheerful", vi: "vui vẻ", distractor: false},
        {word: "tired", vi: "mệt", distractor: false},
        {word: "happy", vi: "vui", distractor: false},
        {word: "calm", vi: "bình tĩnh", distractor: false},
        {word: "bored", vi: "chán", distractor: false},
        {word: "angry", vi: "tức giận", distractor: false},
        {word: "upset", vi: "buồn bã", distractor: false},
        {word: "=== REASONS (shuffled) ===", vi: "", distractor: false},
        {word: "I lost my bag", vi: "tôi mất cặp", distractor: false},
        {word: "I found it", vi: "tôi tìm thấy", distractor: false},
        {word: "there was a test", vi: "có bài kiểm tra", distractor: false},
        {word: "I got a good score", vi: "tôi được điểm cao", distractor: false},
        {word: "my friend came to visit", vi: "bạn đến thăm", distractor: false},
        {word: "I finished my homework", vi: "tôi làm xong bài", distractor: false},
        {word: "I played a lot", vi: "tôi chơi nhiều", distractor: false},
        {word: "the day was so special", vi: "ngày đặc biệt", distractor: false},
        {word: "I had many feelings", vi: "tôi có nhiều cảm xúc", distractor: false},
        {word: "excite", vi: "hào hứng (sai dạng)", distractor: true},
        {word: "surprising", vi: "ngạc nhiên (sai dạng)", distractor: true}
      ]
    }
  }
};
