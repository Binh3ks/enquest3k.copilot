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
  videoId: "Uwk_rJcTcBg",
  content_en: "What does she **look like**? Where is Rora? I **don't know**. Oh, **no**. Excuse me. I'm **looking for** my little sister. Don't worry. What's her name? Rora. She's **six years old**. What does she **look like**? She has **short curly hair**. What is she wearing? She's wearing **a pink shirt and blue pants**. And she is wearing a **white cap**.",
  script: [
    { id: 1, text: "Is this your family?", vi: null, start: 8, duration: 4.16 },
    { id: 2, text: "Who's this?", vi: null, start: 14.84, duration: 3.04 },
    { id: 3, text: "My brother.", vi: null, start: 16.16, duration: 5.56 },
    { id: 4, text: "So handsome.", vi: null, start: 18.77, duration: 1.78 },
    { id: 5, text: "How old He's 34.", vi: null, start: 20.55428571428571, duration: 4.89 },
    { id: 6, text: "He's a doctor.", vi: null, start: 25.44, duration: 3.96 },
    { id: 7, text: "That's his wife.", vi: null, start: 29.4, duration: 3.64 },
    { id: 8, text: "She's very pretty.", vi: null, start: 33.04, duration: 3 },
    { id: 9, text: "That's my mother.", vi: null, start: 37.92, duration: 3.68 },
    { id: 10, text: "Your mother?", vi: null, start: 39.84, duration: 5.2 },
    { id: 11, text: "But she's so old.", vi: null, start: 41.6, duration: 5.48 },
    { id: 12, text: "She's not old.", vi: null, start: 45.04, duration: 4.68 },
    { id: 13, text: "She's 58.", vi: null, start: 47.08, duration: 4.8 },
    { id: 14, text: "Okay.", vi: null, start: 49.72, duration: 5.12 },
    { id: 15, text: "He a doctor, too?", vi: null, start: 54.48514285714286, duration: 3.47 },
    { id: 16, text: "No, he's an architect.", vi: null, start: 54.84, duration: 6.88 },
    { id: 17, text: "That's my sister's husband.", vi: null, start: 57.96, duration: 3.76 },
    { id: 18, text: "That's my sister's son.", vi: null, start: 63.32, duration: 4.76 },
    { id: 19, text: "He's a university student.", vi: null, start: 65.64, duration: 5.56 },
    { id: 20, text: "So cute.", vi: null, start: 70.58666666666666, duration: 5.01 },
    { id: 21, text: "So young.", vi: null, start: 72.66666666666667, duration: 2.93 },
    { id: 22, text: "Who's this short old woman?", vi: null, start: 78.36, duration: 4 },
    { id: 23, text: "What? That is not a short old woman.", vi: null, start: 83.52, duration: 8.96 },
    { id: 24, text: "That's me.", vi: null, start: 89.56, duration: 2.92 },
    { id: 25, text: "Sorry.", vi: null, start: 95.2, duration: 2.52 }
  ]
};
