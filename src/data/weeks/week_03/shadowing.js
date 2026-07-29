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
    { id: 1, text: "What does she look like?", vi: null, start: 1.8, duration: 6.31 },
    { id: 2, text: "Where is Rora?", vi: null, start: 8.11, duration: 11.71 },
    { id: 3, text: "I don't know.", vi: null, start: 19.83, duration: 2.55 },
    { id: 4, text: "Excuse me.", vi: null, start: 25.6, duration: 5.75 },
    { id: 5, text: "I'm looking for my little sister.", vi: null, start: 31.35, duration: 3.32 },
    { id: 6, text: "Okay.", vi: null, start: 34.67, duration: 1.11 },
    { id: 7, text: "Don't worry.", vi: null, start: 35.79, duration: 2.23 },
    { id: 8, text: "What's her name?", vi: null, start: 38.01, duration: 1.26 },
    { id: 9, text: "Her name is Rora.", vi: null, start: 39.27, duration: 2.19 },
    { id: 10, text: "She's six years old.", vi: null, start: 41.46, duration: 2.29 },
    { id: 11, text: "She has short curly hair.", vi: null, start: 43.75, duration: 2.34 },
    { id: 12, text: "What is she wearing?", vi: null, start: 46.09, duration: 3.88 },
    { id: 13, text: "She's wearing a pink shirt and blue pants.", vi: null, start: 49.96, duration: 3.43 },
    { id: 14, text: "And she is wearing a white cap.", vi: null, start: 53.39, duration: 14.89 }
  ]
};
