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
    { id: 1, text: "What does she look like?", vi: "Cô ấy trông như thế nào?" },
    { id: 2, text: "Where is Rora?", vi: "Rora ở đâu?" },
    { id: 3, text: "I don't know.", vi: "Tôi không biết." },
    { id: 4, text: "Oh, no!", vi: "Ôi không!" },
    { id: 5, text: "Excuse me.", vi: "Xin lỗi." },
    { id: 6, text: "I'm looking for my little sister.", vi: "Tôi đang tìm em gái của mình." },
    { id: 7, text: "Don't worry.", vi: "Đừng lo." },
    { id: 8, text: "What's her name?", vi: "Tên em ấy là gì?" },
    { id: 9, text: "Rora.", vi: "Rora." },
    { id: 10, text: "She's six years old.", vi: "Bé sáu tuổi." },
    { id: 11, text: "What does she look like?", vi: "Bé trông như thế nào?" },
    { id: 12, text: "She has short curly hair.", vi: "Bé có mái tóc ngắn xoăn." },
    { id: 13, text: "What is she wearing?", vi: "Bé đang mặc gì?" },
    { id: 14, text: "She's wearing a pink shirt and blue pants.", vi: "Bé mặc áo hồng và quần xanh." },
    { id: 15, text: "And she is wearing a white cap.", vi: "Và bé đang đội một chiếc mũ trắng." },
  ]
};
