/**
 * Week 19 Game Data - Advanced Mode (GameHub)
 * Theme: When I Was Small - Was/Were
 */

export const week19GamesAdvanced = {
  vocabulary: [
    'baby', 'cute', 'little', 'noisy', 'quiet',
    'kindergarten', 'grow', 'past', 'young', 'small',
    'was', 'were', 'before'
  ],
  show_tell: {
    steps: 3,
    word_list: [
      'baby', 'cute', 'little', 'noisy', 'quiet',
      'kindergarten', 'grow', 'past', 'young', 'small',
      'was', 'were', 'before'
    ],
    instructions_easy: 'Say the word, add a phrase, then make a full sentence.',
    instructions_advanced: 'Say the word, add a phrase, then make a full sentence.',
    step_instructions: {
      1: 'Step 1: say the word clearly.',
      2: 'Step 2: add a short phrase with the word.',
      3: 'Step 3: make a full sentence.'
    },
    frames_easy: ['I was ___.', 'I am ___ now.'],
    frames_advanced: ['When I was ___, I was ___.', 'In the past, I was ___.'],
    details_easy: [],
    details_advanced: [],
    detail_map: {}
  },
  game_links: [
    {
      id: 1,
      title: "Was Were Memory Game",
      url: "https://wordwall.net/resource/baby-was-were",
      type: "wordwall",
      description: "Match past and present states"
    },
    {
      id: 2,
      title: "When I Was Small Quiz",
      url: "https://quizizz.com/was-were-past",
      type: "quizizz",
      description: "Answer questions about the past"
    },
    {
      id: 3,
      title: "Baby Photos Race",
      url: "https://kahoot.it/baby-grow",
      type: "kahoot",
      description: "Fast-paced past tense game"
    }
  ]
};

export default week19GamesAdvanced;
