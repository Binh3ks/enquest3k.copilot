// WEEK 33: THE MISTAKE — Irregular Verbs 5: Accidents
// Grammar Station — Advanced Mode
// Focus: Irregular Verbs Group 5 (Accident Verbs)
// 10 verbs: hit-hit, fall-fell, break-broke, hurt-hurt, bite-bit, begin-began, lose-lost, forget-forgot, tear-tore, shake-shook

export default {
  title: "Irregular Verbs — Group 5: Accidents",
  theme: "accidents_and_consequences",
  rule: {
    en: "Group 5 accident verbs: hit-hit, fall-fell, break-broke, hurt-hurt, bite-bit, begin-began, lose-lost, forget-forgot, tear-tore, shake-shook. Remember: hit and hurt are zero-change verbs — they look the same in present and past!",
    vi: "Nhóm 5 động từ bất quy tắc về tai nạn: hit-hit, fall-fell, break-broke, hurt-hurt, bite-bit, begin-began, lose-lost, forget-forgot, tear-tore, shake-shook. Lưu ý: hit và hurt là động từ không đổi — hình thức giống nhau ở hiện tại và quá khứ!"
  },
  exercises: [
    { id: 1, type: "fill_blank", question_en: "Jake ___ his knee on the table yesterday.", answer: "hit", hint: "hit-hit (đập vào)" },
    { id: 2, type: "fill_blank", question_en: "He ___ down and broke the glass cup.", answer: "fell", hint: "fall-fell (rơi, ngã)" },
    { id: 3, type: "fill_blank", question_en: "Jake ___ the glass cup when he fell.", answer: "broke", hint: "break-broke (làm vỡ)" },
    { id: 4, type: "fill_blank", question_en: "His knee ___ a lot after the fall.", answer: "hurt", hint: "hurt-hurt (làm đau)" },
    { id: 5, type: "fill_blank", question_en: "Jake ___ his tongue when he fell down.", answer: "bit", hint: "bite-bit (cắn)" },
    { id: 6, type: "fill_blank", question_en: "The class ___ at 8 o'clock this morning.", answer: "began", hint: "begin-began (bắt đầu)" },
    { id: 7, type: "fill_blank", question_en: "Jake ___ his homework at home yesterday.", answer: "lost", hint: "lose-lost (làm mất)" },
    { id: 8, type: "fill_blank", question_en: "He ___ to walk carefully in the corridor.", answer: "forgot", hint: "forget-forgot (quên)" },
    { id: 9, type: "sentence_match", question_en: "Match the base form to the past form:", pairs: [{ left: "hit", right: "hit" }, { left: "fall", right: "fell" }, { left: "break", right: "broke" }, { left: "hurt", right: "hurt" }, { left: "forget", right: "forgot" }] },
    { id: 10, type: "fill_blank", question_en: "Jake was running because he ___ to walk carefully.", answer: "forgot", hint: "forget-forgot (quên)" },
    { id: 11, type: "fill_blank", question_en: "The bell ___ loudly in the classroom.", answer: "rang", hint: "ring-rang (reo chuông)" },
    { id: 12, type: "fill_blank", question_en: "Jake ___ in the river last summer.", answer: "swam", hint: "swim-swam (bơi)" },
    { id: 13, type: "unscramble", question_en: "Unscramble the words:", words: ["hit", "Jake", "knee", "his", "on", "table", "the"], answer: "Jake hit his knee on the table" },
    { id: 14, type: "unscramble", question_en: "Unscramble the words:", words: ["fell", "down", "He", "and", "broke", "cup", "the", "glass"], answer: "He fell down and broke the glass cup" },
    { id: 15, type: "fill_blank", question_en: "I ___ my knee last week. It ___ a lot.", answer: ["hurt", "hurt"], hint: "hurt-hurt (làm đau)" },
    { id: 16, type: "sentence_correct", question_en: "Correct the sentence: Jake goed to the nurse.", answer: "Jake went to the nurse", hint: "go-went is from Group 4, not Group 5" },
    { id: 17, type: "fill_blank", question_en: "The mosquito ___ Tom's arm during the picnic yesterday.", answer: "bit", hint: "bite-bit (cắn)" },
    { id: 18, type: "fill_blank", question_en: "The movie ___ at 7 PM and ended at 9 PM last night.", answer: "began", hint: "begin-began (bắt đầu)" },
    { id: 19, type: "unscramble", question_en: "Unscramble the words:", words: ["forgot", "He", "to", "do", "his", "homework"], answer: "He forgot to do his homework" },
    { id: 20, type: "mc", question_en: "Which sentence is CORRECT?", options: ["Jake hitted the table.", "Jake hit the table.", "Jake hitting the table.", "Jake hits the table."], answer: "Jake hit the table.", hint: "hit-hit is an irregular verb" }
  ]
};
