// WEEK 34: STORYTELLING PRACTICE 1 — The Ant and the Grasshopper
// Grammar Station — Advanced Mode
// Focus: Relative Clauses (WHO / WHICH / THAT)

export default {
  title: "Relative Clauses — WHO, WHICH, THAT",
  theme: "storytelling_fable",
  rule: {
    en: "A relative clause gives more information about a noun. Use WHO for people, WHICH for things, THAT for both. Example: The ant is an insect THAT works very hard. The ant WHO gathered seeds was clever.",
    vi: "Mệnh đề quan hệ cung cấp thêm thông tin về danh từ. Dùng WHO cho người, WHICH cho vật, THAT cho cả hai. Ví dụ: Con kiến là một loài côn trùng LÀM VIỆC rất chăm chỉ. Con kiến NGƯỜI mà nhặt hạt rất thông minh."
  },
  exercises: [
    { id: 1, type: "fill_blank", question_en: "The ant is an insect ___ works very hard.", answer: "that", hint: "THAT cho cả người và vật" },
    { id: 2, type: "fill_blank", question_en: "The grasshopper is an animal ___ never works.", answer: "that", hint: "THAT cho động vật" },
    { id: 3, type: "fill_blank", question_en: "The ant ___ gathered seeds was very clever.", answer: "who", hint: "WHO cho người/động vật" },
    { id: 4, type: "fill_blank", question_en: "The grasshopper ___ sang songs all day was lazy.", answer: "who", hint: "WHO cho nhân vật trong câu chuyện" },
    { id: 5, type: "fill_blank", question_en: "Winter is the season ___ comes after autumn.", answer: "that", hint: "THAT cho mùa (vật)" },
    { id: 6, type: "fill_blank", question_en: "The story ___ teaches us about hard work is a fable.", answer: "which", hint: "WHICH cho vật/câu chuyện" },
    { id: 7, type: "fill_blank", question_en: "The ant lives in a small hill ___ is warm in winter.", answer: "that", hint: "THAT cho đồi nhỏ" },
    { id: 8, type: "fill_blank", question_en: "The grasshopper lives under a leaf ___ is green.", answer: "which", hint: "WHICH cho chiếc lá" },
    { id: 9, type: "unscramble", question_en: "Unscramble the words:", words: ["The", "ant", "who", "gathered", "seeds", "every", "day"], answer: "The ant who gathered seeds every day" },
    { id: 10, type: "unscramble", question_en: "Unscramble the words:", words: ["The", "grasshopper", "that", "never", "worked", "was", "lazy"], answer: "The grasshopper that never worked was lazy" },
    { id: 11, type: "sentence_correct", question_en: "Correct the sentence: The ant which gathered seeds was lazy.", answer: "The ant that/who gathered seeds was hard-working", hint: "Sửa 'lazy' thành mô tả tích cực, dùng THAT hoặc WHO" },
    { id: 12, type: "sentence_correct", question_en: "Correct the sentence: The grasshopper who never worked learned a lesson.", answer: "The grasshopper who never worked learned a lesson", hint: "Câu này đúng! WHO dùng cho grasshopper (person/character)" },
    { id: 13, type: "fill_blank", question_en: "Summer is the season ___ is warm and long.", answer: "that", hint: "THAT cho mùa hè" },
    { id: 14, type: "fill_blank", question_en: "The fable ___ we read is about an ant and a grasshopper.", answer: "which", hint: "WHICH cho truyện ngụ ngôn" },
    { id: 15, type: "rewrite_relative", question_en: "Rewrite using WHO: The ant worked hard. The ant gathered seeds.", answer: "The ant who gathered seeds worked hard", hint: "Kết hợp 2 câu dùng WHO" },
    { id: 16, type: "rewrite_relative", question_en: "Rewrite using THAT: The grasshopper was lazy. The grasshopper never worked.", answer: "The grasshopper that never worked was lazy", hint: "Kết hợp 2 câu dùng THAT" },
    { id: 17, type: "fill_blank", question_en: "The hill ___ the ant lived in was very small.", answer: "that", hint: "THAT cho gò đất" },
    { id: 18, type: "sentence_match", question_en: "Match the noun to the correct relative pronoun:", pairs: [{ left: "the ant", right: "who/that" }, { left: "the grasshopper", right: "who/that" }, { left: "the fable", right: "which/that" }, { left: "the winter", right: "which/that" }, { left: "the seeds", right: "which/that" }] },
    { id: 19, type: "fill_blank", question_en: "The food ___ the ant stored was in the little house.", answer: "that", hint: "THAT cho thức ăn" },
    { id: 20, type: "unscramble", question_en: "Unscramble the words:", words: ["A", "fable", "is", "a", "story", "which", "teaches", "a", "lesson"], answer: "A fable is a story which teaches a lesson" }
  ]
};
