/**
 * Week 35 Gold Standard Data — Speaking Hub
 * Theme: "The Best Day Ever: Mountain Camping"
 */

import mindmap from './mindmap.js';
import ask_ai, { INFORMATION_EXCHANGE_P2, CUE_CARD_PROMPTS } from './ask_ai.js';
import shadowing from './shadowing.js';

export const speakingHubData = {
  week: 35,
  theme: "The Best Day Ever: Mountain Camping",
  mindmap,
  ask_ai,
  talkshow_turns: [
    { turn_number: 1, nova_question: "Welcome to Nova Live Talk Show! Today we are sharing our best memories. Where did you go for your best adventure?" },
    { turn_number: 2, nova_question: "How exciting! What did you do while setting up the campsite in the morning?" },
    { turn_number: 3, nova_question: "What interesting wildlife did you spot while hiking along the forest stream?" },
    { turn_number: 4, nova_question: "How did your family spend the cozy evening around the warm campfire?" },
    { turn_number: 5, nova_question: "Why was stargazing under the clear night sky such a memorable moment?" }
  ],
  cue_card_info_exchange: INFORMATION_EXCHANGE_P2,
  cue_card_prompts: CUE_CARD_PROMPTS,

  shadowing_sentences: shadowing.sentences,
  podcast_shadowing: {
    long_paragraph: {
      text: "Last Saturday was the most memorable day of my summer holiday. Our family packed our backpacks and drove to Pine Valley Mountain. While my parents were pitching our large blue tent, we collected firewood. In the afternoon, we hiked along a cool forest stream. In the evening, we roasted sweet marshmallows by the warm campfire under the starry sky.",
      audio_url: '/audio/week35/shadowing_full_paragraph.mp3'
    }
  },

  // Cambridge Speaking Part 1 (Find Differences - 6 Hotspots)
  find_differences: {
    picA: { title: 'Picture A (Original Campsite)', image_url: '/images/week35/w35_diff_scene_a.jpg' },
    picB: { title: 'Picture B (Difference Campsite)', image_url: '/images/week35/w35_diff_scene_b.jpg' },
    hotspots: [
      { id: 'diff1', name: 'Tent Color', x: 30, y: 55, prompt_en: 'In Picture A, the tent is blue, but in Picture B, it is green.' },
      { id: 'diff2', name: 'Backpack on Log', x: 50, y: 65, prompt_en: 'In Picture A, the backpack is red, but in Picture B, it is yellow.' },
      { id: 'diff3', name: 'Tree Squirrel', x: 75, y: 35, prompt_en: 'In Picture A, there is one squirrel, but in Picture B, there are two squirrels.' },
      { id: 'diff4', name: 'Flashlight on Table', x: 40, y: 48, prompt_en: 'In Picture A, the flashlight is turned on, but in Picture B, it is turned off.' },
      { id: 'diff5', name: 'Mountain Moon', x: 80, y: 20, prompt_en: 'In Picture A, there is a crescent moon, but in Picture B, there is a full moon.' },
      { id: 'diff6', name: 'Guitar beside Log', x: 65, y: 60, prompt_en: 'In Picture A, there is a guitar on the log, but in Picture B, there is no guitar.' }
    ]
  },

  // Cambridge Speaking Part 3 (5 Sequential Pictures Invariant)
  picture_story_continuation: {
    title: "The Mountain Camping Trip",
    intro_audio_text: "Look at the five pictures. They tell a story called 'The Mountain Camping Trip'. Just look at Picture 1 first. Early on Saturday morning, the family arrived at Pine Valley to go camping.",
    pictures: [
      { id: 1, title: "Picture 1: Setting up the tent", image: "/images/week35/webtoon_scene_1.png", is_intro: true, script: "Early on Saturday morning, the family arrived at Pine Valley to go camping." },
      { id: 2, title: "Picture 2: Hiking by the stream", image: "/images/week35/webtoon_scene_2.png", prompt_en: "Now you tell the story! What did the children do in Picture 2?", key_chunks: ["went hiking along stream", "crystal clear water"] },
      { id: 3, title: "Picture 3: Spotting tree squirrels", image: "/images/week35/webtoon_scene_3.png", prompt_en: "What wildlife did they discover in Picture 3?", key_chunks: ["spotted two squirrels", "jumping between branches"] },
      { id: 4, title: "Picture 4: Roasting marshmallows", image: "/images/week35/webtoon_scene_4.png", prompt_en: "What happened around the campfire in Picture 4?", key_chunks: ["lit warm campfire", "roasted sweet marshmallows"] },
      { id: 5, title: "Picture 5: Stargazing under the sky", image: "/images/week35/webtoon_scene_5.png", prompt_en: "How does the story end in Picture 5?", key_chunks: ["clear starry sky", "truly the best day ever"] }
    ]
  },

  // Cambridge AI Debate Arena
  debate_topics: [
    {
      id: "debate_w35_01",
      topic_title: "Camping Outdoors vs Staying at Home on Holidays",
      nova_statement: "I think staying at home during holidays is much better because you have comfortable beds and video games!",
      expected_counter_points: [
        "Camping in nature allows you to explore fresh air and mountain trails",
        "Outdoor activities help families bond and work together",
        "Stargazing and campfires create unforgettable lifelong memories"
      ],
      suggested_discourse_markers: [
        "I disagree with Nova because...",
        "In my opinion, camping outdoors is...",
        "For example, when you camp, you can roast marshmallows and..."
      ],
      sample_rebuttal: "I disagree with Nova because camping in nature gives fresh air and exciting adventures. You can hike along clear streams, roast marshmallows, and stargaze together with your family."
    }
  ]
};

export default speakingHubData;
