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
    { id: 1,  text: "I look in the mirror every day.",       vi: "Tôi nhìn vào gương mỗi ngày." },
    { id: 2,  text: "I see my face there.",                  vi: "Tôi thấy khuôn mặt của mình ở đó." },
    { id: 3,  text: "I have two brown eyes.",                vi: "Tôi có hai mắt nâu." },
    { id: 4,  text: "I have hair on my head.",               vi: "Tôi có tóc trên đầu." },
    { id: 5,  text: "My hair is straight and black.",        vi: "Tóc tôi thẳng và đen." },
    { id: 6,  text: "I am not very tall yet.",               vi: "Tôi chưa cao lắm." },
    { id: 7,  text: "I am short for my age.",                vi: "Tôi thấp so với tuổi." },
    { id: 8,  text: "I have a happy smile today.",           vi: "Hôm nay tôi có nụ cười vui." },
    { id: 9,  text: "My friend wears glasses to read.",      vi: "Bạn tôi đeo kính để đọc." },
    { id: 10, text: "Her hair is curly and long.",           vi: "Tóc bạn ấy xoăn và dài." },
    { id: 11, text: "We are good friends and look different from each other.", vi: "Chúng tôi là bạn thân và trông rất khác nhau." },
  ],
};
