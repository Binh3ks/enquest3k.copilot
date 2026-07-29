// Week 3 (PRE-A1, EASY) — Shadowing lesson uses the original "Looking in
// the Mirror" script (mirror + face + body parts). This is the lesson text
// for TTS playback — separate from the curated YouTube video which plays
// a different story ("What does she look like?" missing-child story).
// Per June 30 update: lesson and video content are kept fully isolated so
// TTS-mode users always hear the lesson script (mirror story), not the
// video's content. When user toggles to video mode (useTranscriptSource=
// true), the right panel switches to the video transcript segments from
// src/data/video_transcripts_cleaned.json. Chunks (**bold**) follow
// chunk-first ESL convention from CLAUDE.md.
export default {
  title: "Looking in the Mirror",
  videoId: "zT5IiE9m9oY",
  content_en: "I **look in** the mirror **every day**. I **see my face**. I **have two brown eyes**. I **have hair on my head**. My hair is **straight and black**. I **am not very tall** yet. I **am short for my age**. I **have a happy smile** today. **My friend wears glasses** to read. Her hair is **curly and long**. **We are good friends** and **look different** **from each other**.",
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
  ],
};
