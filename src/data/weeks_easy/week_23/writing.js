export default {
  title: "My Art Class",
  min_words: 30,
  model_sentence: "Yesterday in art class I painted a picture of flowers and leaves. First I picked up my brush and dipped it into red pigment. Then I carefully colored the petals blue and yellow. I folded the paper in half to check the symmetry of my butterfly shape. After that I cut small leaf pieces with scissors and glued them around my picture to create a colorful border. My teacher smiled and said it was beautiful!",
  instruction_en: "Use: In art class, I painted/drew... / I used... / I worked with... / My artwork looked...",
  instruction_vi: "Dùng: In art class, I painted/drew... / I used... / I worked with... / My artwork looked...",
  prompt_en: "Write a story about your last art class! What did you paint or draw? What colours did you use? Did you work alone or with friends? How did your artwork look in the end?",
  prompt_vi: "Viết câu chuyện về giờ học mỹ thuật gần nhất! Bạn vẽ gì? Dùng màu nào? Làm một mình hay với bạn? Tác phẩm trông như thế nào?",
  keywords: ["painted", "colored", "glued", "folded", "created", "cut", "picture", "scissors", "brush", "carefully"],
  topic_talk_prompt: "Tell me about a picture or drawing you like. What do you see?",
  sentence_frames: [{"template":"In art class yesterday, I painted/drew ___."},{"template":"I used ___ and ___ colours."},{"template":"First, I ___ed ___. Then I ___ed ___."},{"template":"I worked with ___ and we ___ed ___."},{"template":"My artwork showed ___."},{"template":"My artwork looked ___ and I felt ___ about it."},{"template":"My teacher said my artwork was ___."}],
  
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "medium-low",
      words: [
        {word: "=== ART VERBS (grouped) ===", vi: "", distractor: false},
        {word: "painted", vi: "đã vẽ (màu)", distractor: false},
        {word: "drew", vi: "đã vẽ (nét)", distractor: false},
        {word: "colored", vi: "đã tô màu", distractor: false},
        {word: "cut", vi: "đã cắt", distractor: false},
        {word: "glued", vi: "đã dán", distractor: false},
        {word: "folded", vi: "đã gấp", distractor: false},
        {word: "created", vi: "đã tạo", distractor: false},
        {word: "=== COLORS & OBJECTS (shuffled) ===", vi: "", distractor: false},
        {word: "red", vi: "đỏ", distractor: false},
        {word: "blue", vi: "xanh dương", distractor: false},
        {word: "yellow", vi: "vàng", distractor: false},
        {word: "green", vi: "xanh lá", distractor: false},
        {word: "a flower", vi: "hoa", distractor: false},
        {word: "a tree", vi: "cây", distractor: false},
        {word: "a butterfly", vi: "bướm", distractor: false},
        {word: "a house", vi: "nhà", distractor: false},
        {word: "my friend", vi: "bạn tôi", distractor: false},
        {word: "my partner", vi: "bạn cặp", distractor: false},
        {word: "a rainbow", vi: "cầu vồng", distractor: false},
        {word: "animals", vi: "động vật", distractor: false},
        {word: "beautiful", vi: "đẹp", distractor: false},
        {word: "colorful", vi: "nhiều màu", distractor: false},
        {word: "happy", vi: "vui", distractor: false},
        {word: "proud", vi: "tự hào", distractor: false},
        {word: "amazing", vi: "tuyệt vời", distractor: false},
        {word: "nice", vi: "đẹp", distractor: false},
        {word: "paint", vi: "vẽ (sai dạng)", distractor: true},
        {word: "colors", vi: "màu (sai dạng)", distractor: true}
      ]
    }
  }
};
