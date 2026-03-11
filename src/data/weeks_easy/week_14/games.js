/**
 * Week 14 Game Data - Easy Mode
 */

export const week14GamesEasy = {
  vocabulary: [
    'show', 'tell', 'name', 'family', 'can',
    'help', 'draw', 'sing', 'play', 'friend'
  ],
  show_tell: {
    steps: 3,
    word_list: [
      'show', 'tell', 'name', 'family', 'can',
      'help', 'draw', 'sing', 'play', 'friend'
    ],
    instructions_easy: 'Say the word, add a phrase, then make a sentence.',
    instructions_advanced: 'Say the word, add a phrase, then make a sentence.',
    step_instructions: {
      1: 'Step 1: say the word.',
      2: 'Step 2: add more words.',
      3: 'Step 3: make a sentence.'
    },
    frames_easy: ['I ___', 'I ___ every day'],
    frames_advanced: ['I ___ every day', 'I like to ___'],
    details_easy: [],
    details_advanced: [],
    detail_map: {
      'show': ['show', 'I show', 'I show my picture'],
      'tell': ['tell', 'I tell', 'I tell about my family'],
      'name': ['name', 'my name', 'My name is Emma'],
      'family': ['family', 'my family', 'I love my family'],
      'can': ['can', 'I can', 'I can draw pictures'],
      'help': ['help', 'I help', 'I help my mom'],
      'draw': ['draw', 'I draw', 'I draw beautiful pictures'],
      'sing': ['sing', 'I sing', 'I sing happy songs'],
      'play': ['play', 'I play', 'I play with friends'],
      'friend': ['friend', 'my friend', 'My friend is Lily']
    },
    distractors_easy: [],
    distractors_advanced: [],
    emoji_map: {
      'show': '👀',
      'tell': '💬',
      'name': '📛',
      'family': '👨‍👩‍👧‍👦',
      'can': '✅',
      'help': '🤝',
      'draw': '🎨',
      'sing': '🎤',
      'play': '🎮',
      'friend': '👫'
    }
  },
  make_sentence: {
    instructions_easy: 'Unscramble the words to make a correct sentence.',
    instructions_advanced: 'Unscramble the words to make a correct sentence.',
    sentences_easy: [
      { scrambled: ['I', 'show', 'my', 'picture'], answer: 'I show my picture.' },
      { scrambled: ['I', 'tell', 'about', 'my', 'family'], answer: 'I tell about my family.' },
      { scrambled: ['My', 'name', 'is', 'Emma'], answer: 'My name is Emma.' },
      { scrambled: ['I', 'love', 'my', 'family'], answer: 'I love my family.' },
      { scrambled: ['I', 'can', 'draw'], answer: 'I can draw.' },
      { scrambled: ['I', 'help', 'mom'], answer: 'I help mom.' },
      { scrambled: ['I', 'draw', 'pictures'], answer: 'I draw pictures.' },
      { scrambled: ['I', 'sing', 'songs'], answer: 'I sing songs.' },
      { scrambled: ['I', 'play', 'with', 'friends'], answer: 'I play with friends.' },
      { scrambled: ['My', 'friend', 'is', 'Lily'], answer: 'My friend is Lily.' }
    ],
    sentences_advanced: [
      { scrambled: ['I', 'show', 'my', 'picture', 'to', 'mom'], answer: 'I show my picture to mom.' },
      { scrambled: ['I', 'tell', 'about', 'my', 'family', 'every', 'day'], answer: 'I tell about my family every day.' },
      { scrambled: ['My', 'name', 'is', 'Emma', 'and', 'I', 'am', '7'], answer: 'My name is Emma and I am 7.' },
      { scrambled: ['My', 'family', 'has', 'four', 'people'], answer: 'My family has four people.' },
      { scrambled: ['I', 'can', 'draw', 'beautiful', 'pictures'], answer: 'I can draw beautiful pictures.' },
      { scrambled: ['I', 'help', 'my', 'mom', 'cook'], answer: 'I help my mom cook.' },
      { scrambled: ['I', 'draw', 'flowers', 'and', 'stars'], answer: 'I draw flowers and stars.' },
      { scrambled: ['I', 'sing', 'happy', 'songs'], answer: 'I sing happy songs.' },
      { scrambled: ['I', 'play', 'with', 'my', 'friend', 'Lily'], answer: 'I play with my friend Lily.' },
      { scrambled: ['My', 'best', 'friend', 'is', 'Lily'], answer: 'My best friend is Lily.' }
    ]
  },
  ask_me: {
    instructions_easy: 'Ask a question that matches the context.',
    instructions_advanced: 'Ask a question that matches the context.',
    contexts_easy: [
      {
        id: 'w14e_show',
        task_type: 'find_question',
        topic: 'show',
        intro: 'I show my picture. Ask me what I show.',
        acceptedQuestions: ['What do you show?', 'Do you show your picture?', 'What picture?'],
        answer: 'I show my picture.',
        question_hints: ['What do you show?', 'Do you show your picture?'],
        required_question_words: ['what', 'do'],
        required_keywords: ['show'],
        hints: { words: ['what', 'do', 'you', 'show'], tricky: ['where', 'who'] }
      },
      {
        id: 'w14e_family',
        task_type: 'find_question',
        topic: 'family',
        intro: 'I have a family. Ask me how many people.',
        acceptedQuestions: ['How many people?', 'How many in your family?', 'How big is your family?'],
        answer: 'My family has four people.',
        question_hints: ['How many people?', 'How many in your family?'],
        required_question_words: ['how'],
        required_keywords: ['many', 'family'],
        hints: { words: ['how', 'many', 'people', 'family'], tricky: ['where', 'who'] }
      },
      {
        id: 'w14e_can',
        task_type: 'find_question',
        topic: 'can',
        intro: 'I can draw. Ask me what I can do.',
        acceptedQuestions: ['What can you do?', 'Can you draw?', 'What can you draw?'],
        answer: 'I can draw pictures.',
        question_hints: ['What can you do?', 'Can you draw?'],
        required_question_words: ['what', 'can'],
        required_keywords: ['can'],
        hints: { words: ['what', 'can', 'you', 'do'], tricky: ['where', 'who'] }
      },
      {
        id: 'w14e_help',
        task_type: 'find_question',
        topic: 'help',
        intro: 'I help my mom. Ask me who I help.',
        acceptedQuestions: ['Who do you help?', 'Do you help mom?', 'Who helps you?'],
        answer: 'I help my mom.',
        question_hints: ['Who do you help?', 'Do you help mom?'],
        required_question_words: ['who', 'do'],
        required_keywords: ['help'],
        hints: { words: ['who', 'do', 'you', 'help'], tricky: ['where', 'what'] }
      },
      {
        id: 'w14e_play',
        task_type: 'find_question',
        topic: 'play',
        intro: 'I play with my friend. Ask me who I play with.',
        acceptedQuestions: ['Who do you play with?', 'Do you play with friends?', 'Who is your friend?'],
        answer: 'I play with my friend Lily.',
        question_hints: ['Who do you play with?', 'Do you play with friends?'],
        required_question_words: ['who', 'do'],
        required_keywords: ['play'],
        hints: { words: ['who', 'do', 'you', 'play'], tricky: ['where', 'what'] }
      }
    ],
    required_question_words_easy: ['what', 'how', 'who', 'do', 'can'],
    required_question_words_advanced: ['what', 'how', 'who', 'do', 'can']
  }
};

export default week14GamesEasy;
