// Week 3 (PRE-A1, ADVANCED) — Lesson script now matches the video transcript
// segments for videoId zT5IiE9m9oY ("What does she look like"). Pre-fix the
// lesson was an unrelated teacher description ("My teacher is Nova...")
// while the transcript was a 3rd-person dialogue, causing transcript mode
// to seek the wrong timestamps ("video jumps to sentence 2" symptom).
//
// This rewrite aligns lesson scripts with the actual video + transcript.
// Each script entry now includes `start` + `duration` so seekPlayback works
// correctly in both modes (lesson + transcript).
export default {
  title: "Finding Rora at the Park",
  videoId: "zT5IiE9m9oY",
  content_en: "What does she **look like**? Where is Rora? I **don't know**. Oh, **no**. Excuse me. I'm **looking for** my little sister. Don't worry. What's her name? Rora. She's **six years old**. What does she **look like**? She has **short curly hair**. What is she wearing? She's wearing **a pink shirt and blue pants**. And she is wearing a **white cap**.",
  script: [
    { id: 1, text: "What does she look like?",                         vi: "Cô ấy trông như thế nào?", start: 5.64,  duration: 1.94 },
    { id: 2, text: "Where is Rora?",                                     vi: "Rora ở đâu?",             start: 18.12, duration: 2.54 },
    { id: 3, text: "I don't know.",                                     vi: "Tôi không biết.",          start: 20.66, duration: 1.00 },
    { id: 4, text: "Oh, no!",                                           vi: "Ôi không!",                start: 22.40, duration: 1.56 },
    { id: 5, text: "Excuse me.",                                        vi: "Xin lỗi.",                 start: 27.84, duration: 1.77 },
    { id: 6, text: "I'm looking for my little sister.",                vi: "Tôi đang tìm em gái.",    start: 29.74, duration: 2.88 },
    { id: 7, text: "Don't worry.",                                      vi: "Đừng lo.",                 start: 34.82, duration: 0.72 },
    { id: 8, text: "What's her name?",                                  vi: "Tên em là gì?",            start: 36.08, duration: 1.02 },
    { id: 9, text: "Rora.",                                             vi: "Rora.",                    start: 37.96, duration: 1.92 },
    { id: 10, text: "She's six years old.",                             vi: "Bé sáu tuổi.",            start: 40.20, duration: 1.92 },
    { id: 11, text: "What does she look like?",                         vi: "Bé trông như thế nào?",   start: 42.45, duration: 2.15 },
    { id: 12, text: "She has short curly hair.",                         vi: "Bé có tóc ngắn xoăn.",    start: 44.86, duration: 2.44 },
    { id: 13, text: "What is she wearing?",                             vi: "Bé đang mặc gì?",         start: 47.90, duration: 1.48 },
    { id: 14, text: "She's wearing a pink shirt and blue pants.",        vi: "Bé mặc áo hồng quần xanh.", start: 49.98, duration: 3.06 },
    { id: 15, text: "And she is wearing a white cap.",                  vi: "Và đội một chiếc mũ trắng.", start: 53.68, duration: 2.50 },
  ]
};
