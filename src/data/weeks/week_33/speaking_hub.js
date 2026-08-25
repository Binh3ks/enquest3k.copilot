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
  talkshow_turns: [
    { turn_number: 1, nova_question: "Welcome to Nova Live Talk Show! Today we are discussing school safety. What happened while Jake was walking down the school corridor?" },
    { turn_number: 2, nova_question: "Oh dear! How did Tom slip on the wet floor near the science lab?" },
    { turn_number: 3, nova_question: "What responsible action did Jake take right away when he saw Tom fall down?" },
    { turn_number: 4, nova_question: "How did the school nurse help Tom with the clean bandage and cold pack?" },
    { turn_number: 5, nova_question: "What lesson did all the students learn about walking safely in the school corridor?" }
  ],
  cue_card_info_exchange: INFORMATION_EXCHANGE_P2,
  cue_card_prompts: CUE_CARD_PROMPTS,
  info_exchange_cards: {
    candidate_card: {
      title: "Tom's Accident at School",
      items: [
        { label: "What happened?", value: "slipped on the wet floor" },
        { label: "Where?", value: "down the school corridor" },
        { label: "Who helped?", value: "Jake and the school nurse" },
        { label: "What treatment?", value: "clean bandage and cold pack" }
      ]
    },
    examiner_card: {
      title: "Jake's Safety Helper Actions",
      items: [
        { label: "Where was Jake walking?", value: "down the school corridor" },
        { label: "What did Jake notice?", value: "a yellow warning sign" },
        { label: "Who did Jake call?", value: "the school nurse" },
        { label: "How did everyone feel?", value: "relieved and safe" }
      ]
    },
    examiner_questions: [
      { text: "Where was Jake walking after science class?", audio_url: "/audio/week33/ie_examiner_q1.mp3" },
      { text: "What did Jake notice near the wet puddle?", audio_url: "/audio/week33/ie_examiner_q2.mp3" },
      { text: "Who did Jake call immediately?", audio_url: "/audio/week33/ie_examiner_q3.mp3" }
    ]
  },

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
      { id: 'diff1', name: 'Safety Poster on Left Wall', x: 20, y: 22, prompt_en: 'In Picture A, there is a plain wall, but in Picture B, there is a blue safety badge poster.' },
      { id: 'diff2', name: 'Emergency Bell on Right Wall', x: 78, y: 22, prompt_en: 'In Picture A, there is a plain wall, but in Picture B, there is a red emergency bell.' },
      { id: 'diff3', name: 'Walking Boy Shirt Color', x: 30, y: 64, prompt_en: 'In Picture A, the walking boy wears a blue shirt, but in Picture B, he wears a purple shirt.' },
      { id: 'diff4', name: 'Backpack on Bench Color', x: 80, y: 70, prompt_en: 'In Picture A, the backpack on the bench is blue, but in Picture B, it is bright green.' }
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
  },

  // Cambridge AI Debate Arena (A2 Flyers Critical Thinking & Spoken Argumentation)
  debate_topics: [
    {
      id: "debate_w33_01",
      topic_title: "School Corridors: Running vs Walking",
      nova_statement: "I think running in the corridor is fun! It is a great way to get to the playground quickly and play with friends.",
      expected_counter_points: ["Running on wet floors causes dangerous slips", "You can bump into friends or teachers", "Walking calmly keeps everyone safe"],
      suggested_discourse_markers: [
        "I disagree with Nova because...",
        "In my opinion, running inside is...",
        "For example, if you run on a wet floor, you can..."
      ],
      sample_rebuttal: "I disagree with Nova because running inside is dangerous. If the floor is wet, you can slip, fall down, and hurt your knee."
    }
  ]
};

export default speakingHubData;
