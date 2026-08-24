/**
 * Week 34 Gold Standard Data — Speaking Hub
 * Theme: "The Lion and the Mouse"
 */

import mindmap from './mindmap.js';
import ask_ai, { INFORMATION_EXCHANGE_P2, CUE_CARD_PROMPTS } from './ask_ai.js';
import shadowing from './shadowing.js';

export const speakingHubData = {
  week: 34,
  theme: "The Lion and the Mouse",
  mindmap,
  ask_ai,
  talkshow_turns: [
    { turn_number: 1, nova_question: "Welcome to Nova Live Talk Show! Today we are exploring animal fables. What was the huge lion doing under the tree?" },
    { turn_number: 2, nova_question: "Oh my! What happened when the tiny mouse accidentally ran across his big front paw?" },
    { turn_number: 3, nova_question: "How did the lion react when the little mouse made a brave promise to help him?" },
    { turn_number: 4, nova_question: "What dangerous trouble did the lion face when the forest hunters arrived?" },
    { turn_number: 5, nova_question: "How did the mouse chew the thick ropes and what moral lesson did we learn?" }
  ],
  cue_card_info_exchange: INFORMATION_EXCHANGE_P2,
  cue_card_prompts: CUE_CARD_PROMPTS,

  // Shadowing & Podcast Data
  shadowing_sentences: shadowing.sentences,
  podcast_shadowing: {
    long_paragraph: {
      text: "One warm afternoon, a huge lion was sleeping peacefully under a shady tree in the forest. While he was sleeping, a tiny mouse accidentally ran across his front paw. The lion caught the mouse but let him go free. A few days later, hunters trapped the lion in a heavy rope net. The brave mouse chewed through the thick ropes with his sharp teeth and freed the lion safely.",
      audio_url: '/audio/week34/shadowing_full_paragraph.mp3'
    }
  },

  // Cambridge Speaking Part 1 (Find Differences - 6 Hotspots)
  find_differences: {
    picA: { title: 'Picture A (Original Scene)', image_url: '/images/week34/w34_diff_scene_a.jpg' },
    picB: { title: 'Picture B (Difference Scene)', image_url: '/images/week34/w34_diff_scene_b.jpg' },
    hotspots: [
      { id: 'diff1', name: 'Tree Leaf Color', x: 25, y: 30, prompt_en: 'In Picture A, the tree leaves are green, but in Picture B, they are yellow.' },
      { id: 'diff2', name: 'Sleeping Lion Paw', x: 45, y: 55, prompt_en: 'In Picture A, the lion paw is on grass, but in Picture B, it is on a flat rock.' },
      { id: 'diff3', name: 'Running Mouse Color', x: 30, y: 70, prompt_en: 'In Picture A, the mouse is grey, but in Picture B, the mouse is brown.' },
      { id: 'diff4', name: 'Flying Songbird', x: 60, y: 20, prompt_en: 'In Picture A, there is one flying bird, but in Picture B, there are two birds.' },
      { id: 'diff5', name: 'Monkey Fruit', x: 75, y: 35, prompt_en: 'In Picture A, the monkey is holding a banana, but in Picture B, he is holding an apple.' },
      { id: 'diff6', name: 'River Water Flower', x: 15, y: 80, prompt_en: 'In Picture A, there is a pink water lily, but in Picture B, there is no flower.' }
    ]
  },

  // Cambridge Speaking Part 3 (5 Sequential Pictures Invariant)
  picture_story_continuation: {
    title: "The Lion and the Mouse Fable",
    intro_audio_text: "Look at the five pictures. They tell a story called 'The Lion and the Mouse'. Just look at Picture 1 first. A huge lion was sleeping peacefully under a shady tree in the green forest.",
    pictures: [
      { id: 1, title: "Picture 1: Sleeping under the tree", image: "/images/week34/webtoon_scene_1.png", is_intro: true, script: "A huge lion was sleeping peacefully under a shady tree in the green forest." },
      { id: 2, title: "Picture 2: Caught by the lion's paw", image: "/images/week34/webtoon_scene_2.png", prompt_en: "Now you tell the story! What happened next in Picture 2?", key_chunks: ["woke up angrily", "caught the tiny mouse"] },
      { id: 3, title: "Picture 3: The mouse's promise", image: "/images/week34/webtoon_scene_3.png", prompt_en: "What did the scared mouse say in Picture 3?", key_chunks: ["made a brave promise", "let him go free"] },
      { id: 4, title: "Picture 4: Trapped in the rope net", image: "/images/week34/webtoon_scene_4.png", prompt_en: "What trouble happened to the lion in Picture 4?", key_chunks: ["trapped in heavy net", "roared loudly for help"] },
      { id: 5, title: "Picture 5: Chewing ropes & best friends", image: "/images/week34/webtoon_scene_5.png", prompt_en: "How does the story end in Picture 5?", key_chunks: ["chewed through ropes", "freed the lion safely", "became best friends"] }
    ]
  },

  // Cambridge AI Debate Arena
  debate_topics: [
    {
      id: "debate_w34_01",
      topic_title: "Can Small Friends Help Big Friends?",
      nova_statement: "I think big, strong animals never need help from tiny animals because they have strong muscles and loud roars!",
      expected_counter_points: [
        "Small animals have special abilities like sharp teeth to cut ropes",
        "Tiny friends can reach small places where big animals cannot fit",
        "Cooperation and kindness make everyone stronger together"
      ],
      suggested_discourse_markers: [
        "I disagree with Nova because...",
        "In my opinion, even small friends can...",
        "For example, in the fable, the mouse..."
      ],
      sample_rebuttal: "I disagree with Nova because even small friends have special talents. In the fable, the tiny mouse chewed through the heavy rope net with his sharp teeth and saved the mighty lion."
    }
  ]
};

export default speakingHubData;
