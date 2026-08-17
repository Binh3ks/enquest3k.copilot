/**
 * Week 33 Gold Standard Data — Speaking Hub
 * Theme: "Corridor Safety & School Care"
 */

import mindmap from './mindmap.js';
import ask_ai, { INFORMATION_EXCHANGE_P2, CUE_CARD_PROMPTS } from './ask_ai.js';
import shadowing from './shadowing.js';

export const speakingHubData = {
  week: 33,
  theme: "Corridor Safety & School Care",
  mindmap,
  ask_ai,
  cue_card_info_exchange: INFORMATION_EXCHANGE_P2,
  cue_card_prompts: CUE_CARD_PROMPTS,

  // Podcast / Shadowing Station Data
  shadowing_sentences: shadowing.sentences,
  podcast_shadowing: {
    long_paragraph: {
      text: "Jake was walking carefully down the school corridor after science class when he suddenly noticed a boy running fast. The boy slipped on the wet floor and fell down heavily, hurting his knee. Jake stopped immediately and called the school nurse. The nurse arrived quickly with a clean bandage and a cold pack. Everyone felt relieved and praised Jake for following the safety rules.",
      audio_url: '/audio/week33/shadowing_full_paragraph.mp3'
    }
  },

  // Cambridge Speaking Part 1 (Find Differences)
  find_differences: {
    picA: { title: 'Picture A (Original Scene)', image_url: '/images/week33/w33_diff_scene_a.jpg' },
    picB: { title: 'Picture B (Difference Scene)', image_url: '/images/week33/w33_diff_scene_b.jpg' },
    hotspots: [
      { id: 'diff1', name: 'Left Bench Backpack Color', x: 11, y: 70, prompt_en: 'In Picture A, the backpack on the bench is blue, but in Picture B, it is red.' },
      { id: 'diff2', name: 'Walking Boy Shirt Color', x: 50, y: 60, prompt_en: 'In Picture A, the boy is wearing a red shirt, but in Picture B, he is wearing a blue shirt.' },
      { id: 'diff3', name: 'Wall Clock Time', x: 61, y: 19, prompt_en: 'In Picture A, the wall clock shows 9:00, but in Picture B, it shows 10:00.' },
      { id: 'diff4', name: 'Wet Floor Warning Sign Color', x: 30, y: 62, prompt_en: 'In Picture A, the wet floor warning sign is yellow, but in Picture B, it is orange.' },
      { id: 'diff5', name: 'Hanging Coat Color', x: 73, y: 51, prompt_en: 'In Picture A, the coat hanging on the wall is red, but in Picture B, it is green.' },
      { id: 'diff6', name: 'Corner Potted Plant', x: 6, y: 85, prompt_en: 'In Picture A, there is no plant by the front bench, but in Picture B, there is a potted plant on the floor.' }
    ]
  },

  // Cambridge Speaking Part 3 (Picture Story - 5 Sequential Pictures Invariant)
  picture_story_continuation: {
    title: "Safety First at School",
    intro_audio_text: "Look at the five pictures. They tell a story called 'Safety First at School'. Just look at Picture 1 first. Jake was walking carefully down the corridor after science class.",
    pictures: [
      { id: 1, title: "Picture 1: Walking down corridor", image: "/images/week33/webtoon_scene_1.png", is_intro: true, script: "Jake was walking carefully down the corridor after science class." },
      { id: 2, title: "Picture 2: Slipping on wet floor", image: "/images/week33/webtoon_scene_2.png", prompt_en: "Now you tell the story! What happened next in Picture 2?", key_chunks: ["slipped on wet floor", "fell down heavily"] },
      { id: 3, title: "Picture 3: Calling the school nurse", image: "/images/week33/webtoon_scene_3.png", prompt_en: "What quick action did Jake take in Picture 3?", key_chunks: ["called school nurse", "stopped immediately"] },
      { id: 4, title: "Picture 4: Applying clean bandage", image: "/images/week33/webtoon_scene_4.png", prompt_en: "How did the nurse treat Tom in Picture 4?", key_chunks: ["clean bandage", "cold pack"] },
      { id: 5, title: "Picture 5: Feeling relieved & praised", image: "/images/week33/webtoon_scene_5.png", prompt_en: "How does the story end in Picture 5?", key_chunks: ["felt relieved", "praised by principal"] }
    ]
  }
};

export default speakingHubData;
