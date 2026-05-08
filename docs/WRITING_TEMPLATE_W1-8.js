// TEMPLATE FOR WEEK 1-8: HIGH SCAFFOLDING WITH NUMBERED BANKS
// Use this template when implementing retroactive scaffolding for early weeks
// Copy structure and adjust content per week

export default {
  id: 3,
  title: "My Weekend Adventure",
  image_url: "/images/week3/writing_cover.jpg",
  min_words: 25,
  max_words: 50,
  grammar_focus: "Past Simple (regular verbs -ed + was/were)",
  topic_talk_prompt: "Tell me about your weekend. What did you do?",
  
  sentence_frames: [
    {"template":"Hello! My ___ is ___."},                    // Blanks 1, 2
    {"template":"Last ___, I ___ to the ___."},             // Blanks 3, 4, 5
    {"template":"The ___ was very ___."},                   // Blanks 6, 7
    {"template":"I ___ ___ with my ___."},                  // Blanks 8, 9, 10
    {"template":"It was very ___ and ___."}                 // Blanks 11, 12
  ],
  
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click for word bank",
      label_vi: "💡 Cần trợ giúp? Bấm để xem từ",
      show_by_default: false,
      scaffolding_stage: "high", // W1-8: numbered guide
      
      // NOTE: Numbers [1], [2], etc. match blank order in templates above
      // This 1:1 mapping reduces cognitive load for absolute beginners
      words: [
        {word: "[1] name", vi: "tên", distractor: false},
        {word: "[2] Max", vi: "Max (tên)", distractor: false},
        {word: "[3] Saturday", vi: "thứ Bảy", distractor: false},
        {word: "[4] walked", vi: "đã đi bộ", distractor: false},
        {word: "walk", vi: "đi bộ (sai dạng)", distractor: true}, // Distractor mixed in
        {word: "[5] park", vi: "công viên", distractor: false},
        {word: "[6] weather", vi: "thời tiết", distractor: false},
        {word: "[7] sunny", vi: "nắng", distractor: false},
        {word: "[8] played", vi: "đã chơi", distractor: false},
        {word: "play", vi: "chơi (sai dạng)", distractor: true}, // Distractor
        {word: "[9] soccer", vi: "bóng đá", distractor: false},
        {word: "[10] friend", vi: "bạn", distractor: false},
        {word: "[11] fun", vi: "vui", distractor: false},
        {word: "[12] happy", vi: "hạnh phúc", distractor: false},
        {word: "tired", vi: "mệt", distractor: false} // Extra words for variety
      ]
    },
    
    model_paragraph: {
      label_en: "📖 See example paragraph",
      label_vi: "📖 Xem bài mẫu",
      show_by_default: false,
      warning_en: "⚠️ Try writing first before looking!",
      warning_vi: "⚠️ Hãy thử viết trước khi xem!",
      text: "Hello! My name is Max. Last Saturday, I walked to the park. The weather was very sunny. I played soccer with my friend. It was very fun and happy!"
    }
  }
};

// ============================================
// SCAFFOLDING PROGRESSION NOTES
// ============================================

// WEEK 1-8: HIGH SUPPORT (numbered banks)
// - Numbers [1] [2] [3] match exact blank order
// - Students follow: "Fill blank 1 with word #1"
// - Distractors: 15% (gentle introduction)
// - Blanks: 50-60% given

// WEEK 9-18: MEDIUM SUPPORT (grouped by category)
// - Remove numbers, add grouping:
//   === VERBS === walked, played, cooked
//   === NOUNS === park, ball, kitchen
//   === ADJECTIVES === happy, tired, sunny
// - Distractors: 20%
// - Blanks: 40-50% given

// WEEK 19-25: MEDIUM-LOW SUPPORT (partial grouping)
// - Core words grouped, others shuffled
// - Distractors: 20%
// - Blanks: 35-45% given

// WEEK 26+: LOW SUPPORT (fully shuffled)
// - No numbers, no grouping
// - Add cumulative_review_words from previous week
// - Distractors: 20%
// - Blanks: 40-50% (Easy), 30-40% (Advanced)

// ============================================
// IMPLEMENTATION CHECKLIST FOR W1-25
// ============================================

// [ ] Review each week's content (read.js, explore.js)
// [ ] Ensure writing topic aligns with read/explore themes
// [ ] Create 8-10 sentence_frames matching grammar focus
// [ ] Add numbered words [1] [2] [3]... for W1-8
// [ ] Group by category for W9-18
// [ ] Implement partial grouping for W19-25
// [ ] Set appropriate blank ratios (50-60% W1-8 → 35-45% W19-25)
// [ ] Add 15-20% distractors (wrong verb forms)
// [ ] Test build: npm run build
// [ ] Commit with detailed message referencing scaffolding stage
