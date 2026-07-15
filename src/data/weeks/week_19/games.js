/**
 * Week 19 Game Data - Advanced Mode (GameHub)
 * Theme: When I Was Small - Was/Were (Past State)
 */

export const week19GamesAdvanced = {
  vocabulary: [
    'baby', 'cute', 'little', 'noisy', 'quiet',
    'kindergarten', 'grow', 'past', 'young', 'small',
    'photo', 'album', 'memory'
  ],
  show_tell: {
    steps: 3,
    word_list: [
      'baby', 'cute', 'little', 'noisy', 'quiet',
      'kindergarten', 'grow', 'past', 'young', 'small',
      'photo', 'album', 'memory'
    ],
    instructions_easy: 'Say the word, add a phrase, then make a full sentence.',
    instructions_advanced: 'Say the word, add a phrase, then make a full sentence.',
    step_instructions: {
      1: 'Step 1: say the word clearly.',
      2: 'Step 2: add a short phrase with the word.',
      3: 'Step 3: make a full sentence.'
    },
    frames_easy: ['I was ___ when I was small', 'My family was ___ in the past'],
    frames_advanced: ['I was ___ when I was younger', 'My childhood memories were ___'],
    details_easy: [],
    details_advanced: [],
    detail_map: {
      'baby': ['baby', 'a baby', 'I was a baby', 'I was a baby when I was one year old and very small'],
      'cute': ['cute', 'very cute', 'I was cute', 'I was cute when I was little and everyone smiled at me'],
      'little': ['little', 'very little', 'I was little', 'I was little when I was young and could not reach high places'],
      'noisy': ['noisy', 'very noisy', 'I was noisy', 'I was noisy when I was small and cried loudly all the time'],
      'quiet': ['quiet', 'very quiet', 'I was quiet', 'I was quiet when I was a baby and slept peacefully'],
      'kindergarten': ['kindergarten', 'in kindergarten', 'I was in kindergarten', 'I was in kindergarten when I was five years old and learned many things'],
      'grow': ['grow', 'growing up', 'I grow', 'I grow bigger every year and now I am tall and strong'],
      'past': ['past', 'in the past', 'It was in the past', 'It was in the past when I was small and things were different'],
      'young': ['young', 'very young', 'I was young', 'I was young when I could not write my name yet'],
      'small': ['small', 'very small', 'I was small', 'I was small when I was little and my clothes were tiny'],
      'photo': ['photo', 'old photo', 'I see a photo', 'I see a photo of myself when I was a baby in the album'],
      'album': ['album', 'family album', 'I look at the album', 'I look at the album and see pictures of my childhood memories'],
      'memory': ['memory', 'happy memory', 'I have a memory', 'I have a memory of when I was small and played with my toys']
    },
    distractor_map: {
      'baby': ['running fast', 'playing sports', 'cooking dinner'],
      'cute': ['very tall', 'working hard', 'driving car'],
      'little': ['very big', 'very old', 'very strong'],
      'noisy': ['sleeping', 'reading', 'quiet'],
      'quiet': ['shouting', 'running', 'jumping']
    },
    frame_map: {
      'baby': ['I was a baby when I was small.'],
      'cute': ['I was cute when I was little.'],
      'young': ['I was young in the past.']
    },
    sentence_hints_map: {
      'baby': ['I was a baby.', 'She was a baby.', 'He was a cute baby.'],
      'cute': ['I was cute.', 'She was very cute.', 'The baby was cute.'],
      'little': ['I was little.', 'She was little then.', 'He was very little.'],
      'noisy': ['I was noisy.', 'The baby was noisy.', 'We were noisy.'],
      'quiet': ['I was quiet.', 'She was very quiet.', 'The baby was quiet.'],
      'kindergarten': ['I was in kindergarten.', 'She was in kindergarten.', 'We were in kindergarten together.'],
      'grow': ['I grow every year.', 'Children grow fast.', 'I grew bigger.'],
      'past': ['It was in the past.', 'That was in the past.', 'We were young in the past.'],
      'young': ['I was young.', 'She was very young.', 'We were young then.'],
      'small': ['I was small.', 'She was very small.', 'He was small then.'],
      'photo': ['I see a photo.', 'This photo was old.', 'The photo was from the past.'],
      'album': ['I look at the album.', 'The album was full.', 'Our album has memories.'],
      'memory': ['I have a memory.', 'This memory was happy.', 'My memory was clear.']
    },
    definitions: {
      'baby': 'Very young child.',
      'cute': 'Pretty and sweet.',
      'little': 'Small in size.',
      'noisy': 'Loud sounds.',
      'quiet': 'Not loud.',
      'kindergarten': 'School for age 5.',
      'grow': 'Get bigger.',
      'past': 'Time before now.',
      'young': 'Not old.',
      'small': 'Not big.',
      'photo': 'Picture image.',
      'album': 'Photo book.',
      'memory': 'Remember past.'
    },
    emoji_map: {
      'baby': '👶',
      'cute': '🥰',
      'little': '🤏',
      'noisy': '📢',
      'quiet': '🤫',
      'kindergarten': '🏫',
      'grow': '📈',
      'past': '⏪',
      'young': '🧒',
      'small': '🐁',
      'photo': '📷',
      'album': '📔',
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
      { scrambled: ['I', 'see', 'a', 'photo'], answer: 'I see a photo.' },
      { scrambled: ['I', 'have', 'a', 'memory'], answer: 'I have a memory.' },
      { scrambled: ['I', 'grow', 'bigger'], answer: 'I grow bigger.' }
    ],
    sentences_advanced: [
      { scrambled: ['I', 'was', 'a', 'baby', 'when', 'I', 'was', 'small'], answer: 'I was a baby when I was small.', base_words: ['i', 'was', 'a', 'baby', 'when', 'i', 'was', 'small'], time_phrases: ['in the past', 'long ago', 'when I was one'], location_phrases: ['at home', 'with my family', 'in my crib'] },
      { scrambled: ['I', 'was', 'very', 'cute', 'when', 'I', 'was', 'little'], answer: 'I was very cute when I was little.', base_words: ['i', 'was', 'very', 'cute', 'when', 'i', 'was', 'little'], time_phrases: ['in the past', 'long ago', 'when I was young'], location_phrases: ['in the photo', 'as a child', 'everyone said so'] },
      { scrambled: ['I', 'was', 'very', 'little', 'in', 'the', 'past'], answer: 'I was very little in the past.', base_words: ['i', 'was', 'very', 'little', 'in', 'the', 'past'], time_phrases: ['long ago', 'before', 'when I was small'], location_phrases: ['in the past', 'years ago', 'in my childhood'] },
      { scrambled: ['I', 'was', 'noisy', 'when', 'I', 'was', 'a', 'baby'], answer: 'I was noisy when I was a baby.', base_words: ['i', 'was', 'noisy', 'when', 'i', 'was', 'a', 'baby'], time_phrases: ['in the past', 'long ago', 'when I was small'], location_phrases: ['at home', 'all the time', 'my mom said'] },
      { scrambled: ['I', 'was', 'quiet', 'when', 'I', 'slept'], answer: 'I was quiet when I slept.', base_words: ['i', 'was', 'quiet', 'when', 'i', 'slept'], time_phrases: ['at night', 'in the past', 'as a baby'], location_phrases: ['in my bed', 'peacefully', 'every night'] },
      { scrambled: ['I', 'was', 'in', 'kindergarten', 'when', 'I', 'was', 'five'], answer: 'I was in kindergarten when I was five.', base_words: ['i', 'was', 'in', 'kindergarten', 'when', 'i', 'was', 'five'], time_phrases: ['in the past', 'years ago', 'when I was five'], location_phrases: ['at school', 'in kindergarten', 'with my friends'] },
      { scrambled: ['I', 'grow', 'bigger', 'every', 'year'], answer: 'I grow bigger every year.', base_words: ['i', 'grow', 'bigger', 'every', 'year'], time_phrases: ['every year', 'as time passes', 'now'], location_phrases: ['taller and stronger', 'year by year', 'gradually'] },
      { scrambled: ['I', 'was', 'very', 'young', 'in', 'the', 'past'], answer: 'I was very young in the past.', base_words: ['i', 'was', 'very', 'young', 'in', 'the', 'past'], time_phrases: ['in the past', 'long ago', 'before'], location_phrases: ['years ago', 'when I was small', 'in my childhood'] },
      { scrambled: ['I', 'see', 'my', 'photo', 'in', 'the', 'album'], answer: 'I see my photo in the album.', base_words: ['i', 'see', 'my', 'photo', 'in', 'the', 'album'], time_phrases: ['now', 'today', 'when I look'], location_phrases: ['in the album', 'from the past', 'of my childhood'] },
      { scrambled: ['I', 'have', 'a', 'happy', 'memory', 'from', 'the', 'past'], answer: 'I have a happy memory from the past.', base_words: ['i', 'have', 'a', 'happy', 'memory', 'from', 'the', 'past'], time_phrases: ['from the past', 'from long ago', 'from my childhood'], location_phrases: ['in my mind', 'of when I was small', 'that I remember'] }
    ]
  },
  ask_me: {
    instructions_easy: 'Ask a question that matches the context.',
    instructions_advanced: 'Ask a question that matches the context.',
    contexts_easy: [
      {
        id: 'w19_how_was_i',
        task_type: 'find_question',
        topic: 'past memories',
        intro: 'I was a cute baby. Ask me how I was when I was small.',
        acceptedQuestions: ['How were you when you were small?', 'How were you as a baby?', 'What were you like?'],
        answer: 'I was a cute baby.',
        question_hints: ['How were you when you were small?', 'What were you like?'],
        required_question_words: ['how', 'were'],
        required_keywords: ['you'],
        hints: { words: ['how', 'were', 'you', 'when', 'small'], tricky: ['what', 'where'] }
      },
      {
        id: 'w19_where_was_i',
        task_type: 'find_question',
        topic: 'past memories',
        intro: 'I was in kindergarten when I was five. Ask me where I was when I was five.',
        acceptedQuestions: ['Where were you when you were five?', 'Where were you?'],
        answer: 'I was in kindergarten.',
        question_hints: ['Where were you when you were five?'],
        required_question_words: ['where', 'were'],
        required_keywords: ['you'],
        hints: { words: ['where', 'were', 'you', 'when', 'five'], tricky: ['what', 'who'] }
      }
    ],
    contexts_advanced: [
      {
        id: 'w19_adv_how_was_i',
        task_type: 'find_question',
        topic: 'past memories',
        intro: 'I was very small and noisy when I was a baby. Ask how I was when I was a baby.',
        acceptedQuestions: ['How were you when you were a baby?', 'What were you like as a baby?'],
        answer: 'I was very small and noisy.',
        question_hints: ['How were you when you were a baby?'],
        required_question_words: ['how', 'were'],
        required_keywords: ['you', 'baby'],
        hints: { words: ['how', 'were', 'you', 'when', 'baby'], tricky: ['where', 'who'] }
      }
    ]
  }
};

export default week19GamesAdvanced;
