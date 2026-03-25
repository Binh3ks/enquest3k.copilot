/**
 * Week 19 Game Data - Easy Mode (GameHub)
 * Theme: When I Was Small - Was/Were (Past State)
 * Tier 1 Vocabulary - Simple, Personal Context
 */

export const week19GamesEasy = {
  vocabulary: [
    'baby', 'cute', 'little', 'noisy', 'quiet',
    'kindergarten', 'grow', 'young', 'small', 'memory'
  ],
  show_tell: {
    steps: 3,
    word_list: [
      'baby', 'cute', 'little', 'noisy', 'quiet',
      'kindergarten', 'grow', 'young', 'small', 'memory'
    ],
    instructions_easy: 'Say the word, add a phrase, then make a full sentence.',
    instructions_advanced: 'Say the word, add a phrase, then make a full sentence.',
    step_instructions: {
      1: 'Step 1: say the word clearly.',
      2: 'Step 2: add a short phrase with the word.',
      3: 'Step 3: make a full sentence.'
    },
    frames_easy: ['I was ___ when I was small', 'I was ___ in the past'],
    frames_advanced: ['I was ___ when I was a baby', 'I was ___ when I was young'],
    details_easy: [],
    details_advanced: [],
    detail_map: {
      'baby': ['baby', 'a baby', 'I was a baby', 'I was a baby when I was small'],
      'cute': ['cute', 'very cute', 'I was cute', 'I was cute when I was a baby'],
      'little': ['little', 'very little', 'I was little', 'I was little when I was young'],
      'noisy': ['noisy', 'very noisy', 'I was noisy', 'I was noisy when I was a baby'],
      'quiet': ['quiet', 'very quiet', 'I was quiet', 'I was quiet when I slept'],
      'kindergarten': ['kindergarten', 'in kindergarten', 'I was in kindergarten', 'I was in kindergarten when I was five'],
      'grow': ['grow', 'I grow', 'I grow bigger', 'I grow bigger every year'],
      'young': ['young', 'very young', 'I was young', 'I was young in the past'],
      'small': ['small', 'very small', 'I was small', 'I was small when I was little'],
      'memory': ['memory', 'a memory', 'I have a memory', 'I have a memory of when I was small']
    },
    distractor_map: {
      'baby': ['old', 'big', 'tall'],
      'cute': ['ugly', 'bad', 'mean'],
      'little': ['big', 'large', 'huge']
    },
    frame_map: {
      'baby': ['I was a baby.'],
      'cute': ['I was cute.'],
      'small': ['I was small.']
    },
    sentence_hints_map: {
      'baby': ['I was a baby.', 'She was a baby.', 'He was a baby.'],
      'cute': ['I was cute.', 'She was cute.', 'The baby was cute.'],
      'little': ['I was little.', 'She was little.', 'He was little.'],
      'noisy': ['I was noisy.', 'The baby was noisy.', 'We were noisy.'],
      'quiet': ['I was quiet.', 'She was quiet.', 'He was very quiet.'],
      'kindergarten': ['I was in kindergarten.', 'She was in kindergarten.', 'We were in kindergarten.'],
      'grow': ['I grow bigger.', 'I grow every year.', 'Children grow fast.'],
      'young': ['I was young.', 'She was young.', 'We were young.'],
      'small': ['I was small.', 'She was small.', 'He was small.'],
      'memory': ['I have a memory.', 'I have happy memories.', 'This is my memory.']
    },
    definitions: {
      'baby': 'Very young child.',
      'cute': 'Pretty, sweet.',
      'little': 'Small.',
      'noisy': 'Loud.',
      'quiet': 'Not loud.',
      'kindergarten': 'School age 5.',
      'grow': 'Get bigger.',
      'young': 'Not old.',
      'small': 'Not big.',
      'memory': 'Remember.'
    },
    emoji_map: {
      'baby': '👶',
      'cute': '🥰',
      'little': '🤏',
      'noisy': '📢',
      'quiet': '🤫',
      'kindergarten': '🏫',
      'grow': '📈',
      'young': '🧒',
      'small': '🐁',
      'memory': '💭'
    }
  },
  make_sentence: {
    instructions_easy: 'Unscramble the words to make a sentence.',
    instructions_advanced: 'Unscramble the words to make a sentence.',
    sentences_easy: [
      { scrambled: ['I', 'was', 'a', 'baby'], answer: 'I was a baby.' },
      { scrambled: ['I', 'was', 'cute'], answer: 'I was cute.' },
      { scrambled: ['I', 'was', 'little'], answer: 'I was little.' },
      { scrambled: ['I', 'was', 'noisy'], answer: 'I was noisy.' },
      { scrambled: ['I', 'was', 'quiet'], answer: 'I was quiet.' },
      { scrambled: ['I', 'was', 'young'], answer: 'I was young.' },
      { scrambled: ['I', 'was', 'small'], answer: 'I was small.' },
      { scrambled: ['I', 'grow', 'bigger'], answer: 'I grow bigger.' },
      { scrambled: ['I', 'have', 'a', 'memory'], answer: 'I have a memory.' },
      { scrambled: ['I', 'was', 'in', 'kindergarten'], answer: 'I was in kindergarten.' }
    ],
    sentences_advanced: [
      { scrambled: ['I', 'was', 'a', 'baby', 'when', 'I', 'was', 'small'], answer: 'I was a baby when I was small.', base_words: ['i', 'was', 'a', 'baby', 'when', 'i', 'was', 'small'], time_phrases: ['in the past', 'long ago'], location_phrases: ['at home', 'with my mom', 'when I was small'] },
      { scrambled: ['I', 'was', 'cute', 'when', 'I', 'was', 'little'], answer: 'I was cute when I was little.', base_words: ['i', 'was', 'cute', 'when', 'i', 'was', 'little'], time_phrases: ['in the past', 'long ago'], location_phrases: ['in the photo', 'as a baby', 'when I was little'] },
      { scrambled: ['I', 'was', 'very', 'little'], answer: 'I was very little.', base_words: ['i', 'was', 'very', 'little'], time_phrases: ['in the past', 'before'], location_phrases: ['when I was small', 'long ago', 'as a baby'] },
      { scrambled: ['I', 'was', 'noisy', 'when', 'I', 'was', 'a', 'baby'], answer: 'I was noisy when I was a baby.', base_words: ['i', 'was', 'noisy', 'when', 'i', 'was', 'a', 'baby'], time_phrases: ['in the past', 'long ago'], location_phrases: ['at home', 'when I cried', 'as a baby'] },
      { scrambled: ['I', 'was', 'quiet', 'when', 'I', 'slept'], answer: 'I was quiet when I slept.', base_words: ['i', 'was', 'quiet', 'when', 'i', 'slept'], time_phrases: ['at night', 'in the past'], location_phrases: ['in my bed', 'when I slept', 'at home'] },
      { scrambled: ['I', 'was', 'in', 'kindergarten', 'when', 'I', 'was', 'five'], answer: 'I was in kindergarten when I was five.', base_words: ['i', 'was', 'in', 'kindergarten', 'when', 'i', 'was', 'five'], time_phrases: ['in the past', 'long ago'], location_phrases: ['at school', 'when I was five', 'with my friends'] },
      { scrambled: ['I', 'grow', 'bigger', 'every', 'year'], answer: 'I grow bigger every year.', base_words: ['i', 'grow', 'bigger', 'every', 'year'], time_phrases: ['every year', 'now'], location_phrases: ['taller', 'stronger', 'every year'] },
      { scrambled: ['I', 'was', 'very', 'young'], answer: 'I was very young.', base_words: ['i', 'was', 'very', 'young'], time_phrases: ['in the past', 'before'], location_phrases: ['long ago', 'when I was small', 'as a child'] },
      { scrambled: ['I', 'was', 'small', 'before'], answer: 'I was small before.', base_words: ['i', 'was', 'small', 'before'], time_phrases: ['before', 'in the past'], location_phrases: ['long ago', 'when I was little', 'as a baby'] },
      { scrambled: ['I', 'have', 'a', 'happy', 'memory'], answer: 'I have a happy memory.', base_words: ['i', 'have', 'a', 'happy', 'memory'], time_phrases: ['now', 'from the past'], location_phrases: ['of my childhood', 'from long ago', 'when I was small'] }
    ]
  },
  ask_me: {
    instructions_easy: 'Ask a question that matches the context.',
    instructions_advanced: 'Ask a question that matches the context.',
    contexts_easy: [
      {
        id: 'w19_easy_how_was_i',
        task_type: 'find_question',
        topic: 'past',
        intro: 'I was a cute baby. Ask me how I was.',
        acceptedQuestions: ['How were you?', 'How were you as a baby?'],
        answer: 'I was a cute baby.',
        question_hints: ['How were you?'],
        required_question_words: ['how', 'were'],
        required_keywords: ['you'],
        hints: { words: ['how', 'were', 'you'], tricky: ['what', 'where'] }
      },
      {
        id: 'w19_easy_what_was_i',
        task_type: 'find_question',
        topic: 'past',
        intro: 'I was in kindergarten. Ask me where I was.',
        acceptedQuestions: ['Where were you?', 'Where were you before?'],
        answer: 'I was in kindergarten.',
        question_hints: ['Where were you?'],
        required_question_words: ['where', 'were'],
        required_keywords: ['you'],
        hints: { words: ['where', 'were', 'you'], tricky: ['what', 'who'] }
      }
    ],
    contexts_advanced: [
      {
        id: 'w19_easy_adv_how_was_i',
        task_type: 'find_question',
        topic: 'past',
        intro: 'I was small and cute. Ask how I was when I was small.',
        acceptedQuestions: ['How were you when you were small?', 'How were you?'],
        answer: 'I was small and cute.',
        question_hints: ['How were you when you were small?'],
        required_question_words: ['how', 'were'],
        required_keywords: ['you'],
        hints: { words: ['how', 'were', 'you', 'when', 'small'], tricky: ['where', 'who'] }
      }
    ]
  }
};

export default week19GamesEasy;
