/**
 * Week 4 Game Data - Advanced Mode (New GameHub)
 */

export const week4GamesAdvanced = {
  vocabulary: [
    'like', 'love', 'smile', 'laugh', 'play',
    'draw', 'read', 'jump', 'run', 'fun'
  ],
  show_tell: {
    steps: 3,
    word_list: [
      'like', 'love', 'smile', 'laugh', 'play',
      'draw', 'read', 'jump', 'run', 'fun'
    ],
    instructions_easy: 'Say the word, add a phrase, then make a full sentence.',
    instructions_advanced: 'Say the word, add a phrase, then make a full sentence.',
    step_instructions: {
      1: 'Step 1: say the word clearly.',
      2: 'Step 2: add a short phrase with the word.',
      3: 'Step 3: make a full sentence.'
    },
    frames_easy: ['I like ___ing', 'I love ___ing'],
    frames_advanced: ['I like ___ing because ___', 'I love ___ing because ___'],
    details_easy: [],
    details_advanced: [],
    detail_map: {
      like: ['I like it', 'I like reading', 'I like playing', 'I like drawing'],
      love: ['I love it', 'I love reading', 'I love playing', 'I love drawing'],
      smile: ['smiling now', 'smiling here', 'smiling happily', 'keep smiling'],
      laugh: ['laughing now', 'laughing here', 'laughing happily', 'keep laughing'],
      play: ['playing now', 'playing games', 'playing here', 'playing happily'],
      draw: ['drawing now', 'drawing pictures', 'drawing here', 'drawing carefully'],
      read: ['reading now', 'reading books', 'reading here', 'reading carefully'],
      jump: ['jumping now', 'jumping high', 'jumping here', 'jumping happily'],
      run: ['running now', 'running fast', 'running here', 'running happily'],
      fun: ['it is fun', 'so much fun', 'very fun', 'fun activities']
    },
    distractors_easy: [],
    distractors_advanced: [],
    distractor_map: {
      like: ['running fast', 'a big smile', 'the door'],
      love: ['jumping high', 'a laugh', 'the book']
    },
    frame_map: {
      like: ['I like ___ing because ___'],
      love: ['I love ___ing because ___']
    },
    sentence_hints_map: {
      like: ['I like reading because it is fun.', 'I like playing because it is fun.', 'I like drawing.'],
      love: ['I love reading because it is fun.', 'I love playing because it is fun.', 'I love drawing.'],
      smile: ['I like smiling.', 'I like smiling because it is fun.', 'I am smiling.'],
      laugh: ['I like laughing.', 'I like laughing because it is fun.', 'I am laughing.'],
      play: ['I like playing.', 'I like playing because it is fun.', 'I am playing games.'],
      draw: ['I like drawing.', 'I like drawing because it is fun.', 'I am drawing pictures.'],
      read: ['I like reading.', 'I like reading because it is fun.', 'I am reading books.'],
      jump: ['I like jumping.', 'I like jumping because it is fun.', 'I am jumping high.'],
      run: ['I like running.', 'I like running because it is fun.', 'I am running fast.'],
      fun: ['It is fun.', 'This is fun.', 'Reading is fun.']
    },
    emoji_map: {
      like: '👍',
      love: '❤️',
      smile: '😊',
      laugh: '😄',
      play: '🎮',
      draw: '✏️',
      read: '📖',
      jump: '🤸',
      run: '🏃',
      fun: '🎉'
    },
    definitions: {
      like: 'To enjoy something.',
      love: 'To enjoy something very much.',
      fun: 'Something enjoyable or entertaining.'
    }
  },
  make_sentence: {
    instructions_easy: 'Unscramble the words to make a correct sentence.',
    instructions_advanced: 'Unscramble the words to make a correct sentence.',
    sentences_easy: [
      { scrambled: ['I', 'like', 'reading'], answer: 'I like reading.' },
      { scrambled: ['I', 'like', 'playing'], answer: 'I like playing.' },
      { scrambled: ['I', 'like', 'drawing'], answer: 'I like drawing.' },
      { scrambled: ['I', 'like', 'running'], answer: 'I like running.' },
      { scrambled: ['I', 'love', 'reading'], answer: 'I love reading.' },
      { scrambled: ['I', 'love', 'playing'], answer: 'I love playing.' },
      { scrambled: ['I', 'like', 'jumping'], answer: 'I like jumping.' },
      { scrambled: ['I', 'like', 'smiling'], answer: 'I like smiling.' },
      { scrambled: ['I', 'like', 'laughing'], answer: 'I like laughing.' },
      { scrambled: ['I', 'love', 'running'], answer: 'I love running.' }
    ],
    sentences_advanced: [
      { scrambled: ['I', 'like', 'reading', 'because', 'it', 'is', 'fun'], answer: 'I like reading because it is fun.', base_words: ['i', 'like', 'reading', 'because', 'it', 'is', 'fun'], time_phrases: ['every day', 'in the afternoon', 'on weekends', 'after school', 'before bed'], location_phrases: ['at home', 'in the library', 'in my room', 'at school', 'on the couch'] },
      { scrambled: ['I', 'like', 'playing', 'because', 'it', 'is', 'fun'], answer: 'I like playing because it is fun.', base_words: ['i', 'like', 'playing', 'because', 'it', 'is', 'fun'], time_phrases: ['every day', 'in the afternoon', 'on Saturday', 'after school', 'in the morning'], location_phrases: ['at home', 'in the park', 'in the backyard', 'at school', 'on the playground'] },
      { scrambled: ['I', 'like', 'drawing', 'because', 'it', 'is', 'fun'], answer: 'I like drawing because it is fun.', base_words: ['i', 'like', 'drawing', 'because', 'it', 'is', 'fun'], time_phrases: ['every day', 'in the afternoon', 'on Sunday', 'after school', 'in art class'], location_phrases: ['at home', 'in my room', 'at school', 'in the classroom', 'at the table'] },
      { scrambled: ['I', 'like', 'running', 'because', 'it', 'is', 'fun'], answer: 'I like running because it is fun.', base_words: ['i', 'like', 'running', 'because', 'it', 'is', 'fun'], time_phrases: ['every morning', 'in the afternoon', 'on weekends', 'after school', 'before dinner'], location_phrases: ['at the park', 'in the playground', 'at school', 'on the field', 'in the gym'] },
      { scrambled: ['I', 'love', 'reading', 'because', 'it', 'is', 'fun'], answer: 'I love reading because it is fun.', base_words: ['i', 'love', 'reading', 'because', 'it', 'is', 'fun'], time_phrases: ['every day', 'in the evening', 'on weekends', 'after dinner', 'before bed'], location_phrases: ['at home', 'in the library', 'in my room', 'at school', 'on the sofa'] },
      { scrambled: ['I', 'like', 'jumping', 'because', 'it', 'is', 'fun'], answer: 'I like jumping because it is fun.', base_words: ['i', 'like', 'jumping', 'because', 'it', 'is', 'fun'], time_phrases: ['every day', 'in the morning', 'on weekends', 'after school', 'in gym class'], location_phrases: ['at the park', 'on the trampoline', 'in the playground', 'at school', 'in the gym'] },
      { scrambled: ['like', 'I', 'smiling'], answer: 'I like smiling.', base_words: ['i', 'like', 'smiling'], time_phrases: ['every day', 'in the morning', 'all the time', 'right now', 'on Monday'], location_phrases: ['at school', 'at home', 'in the classroom', 'at the park', 'everywhere'] },
      { scrambled: ['like', 'I', 'laughing'], answer: 'I like laughing.', base_words: ['i', 'like', 'laughing'], time_phrases: ['every day', 'all the time', 'right now', 'on weekends', 'after jokes'], location_phrases: ['at school', 'at home', 'in the classroom', 'with friends', 'everywhere'] },
      { scrambled: ['love', 'I', 'playing'], answer: 'I love playing.', base_words: ['i', 'love', 'playing'], time_phrases: ['every day', 'in the afternoon', 'on weekends', 'after school', 'all the time'], location_phrases: ['at home', 'in the park', 'at school', 'in the backyard', 'on the playground'] },
      { scrambled: ['like', 'I', 'drawing'], answer: 'I like drawing.', base_words: ['i', 'like', 'drawing'], time_phrases: ['every day', 'in the afternoon', 'on Sunday', 'after school', 'right now'], location_phrases: ['at home', 'in my room', 'at school', 'in the classroom', 'at the desk'] }
    ]
  },
  ask_me: {
    instructions_easy: 'Ask a question that matches the context.',
    instructions_advanced: 'Ask a question that matches the context.',
    contexts_easy: [
      {
        id: 'w4_like_what',
        task_type: 'find_question',
        topic: 'like',
        intro: 'I like reading. Ask me what I like doing.',
        acceptedQuestions: [
          'What do you like doing?',
          'What do you like?',
          'What does he like doing?'
        ],
        answer: 'I like reading.',
        question_hints: ['What do you like doing?', 'What do you like?', 'What does he like doing?'],
        required_question_words: ['what'],
        required_keywords: ['like'],
        hints: {
          words: ['what', 'do', 'like', 'doing'],
          tricky: ['who', 'where']
        }
      },
      {
        id: 'w4_reading_why',
        task_type: 'find_question',
        topic: 'reading',
        intro: 'I like reading because it is fun. Ask me why I like it.',
        acceptedQuestions: [
          'Why do you like reading?',
          'Why do you like it?',
          'Why does he like it?'
        ],
        answer: 'I like reading because it is fun.',
        question_hints: ['Why do you like reading?', 'Why do you like it?', 'Why does he like it?'],
        required_question_words: ['why'],
        required_keywords: ['like'],
        hints: {
          words: ['why', 'do', 'like'],
          tricky: ['what', 'where']
        }
      },
      {
        id: 'w4_playing_what',
        task_type: 'find_question',
        topic: 'playing',
        intro: 'I like playing games. Ask me what I like doing.',
        acceptedQuestions: [
          'What do you like doing?',
          'What does he like doing?',
          'What do you like?'
        ],
        answer: 'I like playing games.',
        question_hints: ['What do you like doing?', 'What does he like doing?', 'What do you like?'],
        required_question_words: ['what'],
        required_keywords: ['like'],
        hints: {
          words: ['what', 'do', 'like', 'doing'],
          tricky: ['who', 'where']
        }
      },
      {
        id: 'w4_drawing_why',
        task_type: 'find_question',
        topic: 'drawing',
        intro: 'I like drawing because it is fun. Ask me why.',
        acceptedQuestions: [
          'Why do you like drawing?',
          'Why do you like it?',
          'Why does she like it?'
        ],
        answer: 'I like drawing because it is fun.',
        question_hints: ['Why do you like drawing?', 'Why do you like it?', 'Why does she like it?'],
        required_question_words: ['why'],
        required_keywords: ['like'],
        hints: {
          words: ['why', 'do', 'like'],
          tricky: ['what', 'when']
        }
      },
      {
        id: 'w4_running_what',
        task_type: 'find_question',
        topic: 'running',
        intro: 'I like running. Ask me what I like doing.',
        acceptedQuestions: [
          'What do you like doing?',
          'What do you like?',
          'What does he like doing?'
        ],
        answer: 'I like running.',
        question_hints: ['What do you like doing?', 'What do you like?', 'What does he like doing?'],
        required_question_words: ['what'],
        required_keywords: ['like'],
        hints: {
          words: ['what', 'do', 'like', 'doing'],
          tricky: ['who', 'where']
        }
      },
      {
        id: 'w4_jumping_why',
        task_type: 'find_question',
        topic: 'jumping',
        intro: 'I like jumping because it is fun. Ask me why I like it.',
        acceptedQuestions: [
          'Why do you like jumping?',
          'Why do you like it?',
          'Why does he like it?'
        ],
        answer: 'I like jumping because it is fun.',
        question_hints: ['Why do you like jumping?', 'Why do you like it?', 'Why does he like it?'],
        required_question_words: ['why'],
        required_keywords: ['like'],
        hints: {
          words: ['why', 'do', 'like'],
          tricky: ['what', 'where']
        }
      },
      {
        id: 'w4_smiling_what',
        task_type: 'find_question',
        topic: 'smiling',
        intro: 'I like smiling. Ask me what I like.',
        acceptedQuestions: [
          'What do you like?',
          'What do you like doing?',
          'What does she like?'
        ],
        answer: 'I like smiling.',
        question_hints: ['What do you like?', 'What do you like doing?', 'What does she like?'],
        required_question_words: ['what'],
        required_keywords: ['like'],
        hints: {
          words: ['what', 'do', 'like'],
          tricky: ['who', 'where']
        }
      },
      {
        id: 'w4_laughing_why',
        task_type: 'find_question',
        topic: 'laughing',
        intro: 'I like laughing because it is fun. Ask me why.',
        acceptedQuestions: [
          'Why do you like laughing?',
          'Why do you like it?',
          'Why does he like it?'
        ],
        answer: 'I like laughing because it is fun.',
        question_hints: ['Why do you like laughing?', 'Why do you like it?', 'Why does he like it?'],
        required_question_words: ['why'],
        required_keywords: ['like'],
        hints: {
          words: ['why', 'do', 'like'],
          tricky: ['what', 'when']
        }
      },
      {
        id: 'w4_mini_activities',
        task_type: 'mini_interview',
        topic: 'activities',
        intro: 'Interview me: ask what I like doing, then ask why I like it.',
        steps: [
          {
            prompt: 'Ask what I like doing.',
            required_question_words: ['what'],
            required_keywords: ['like'],
            question_hints: ['What do you like doing?', 'What do you like?', 'What does he like doing?']
          },
          {
            prompt: 'Ask why I like it.',
            acceptedQuestions: [
              'Why do you like it?',
              'Why does he like it?',
              'Why does she like it?'
            ],
            required_question_words: ['why'],
            required_keywords: ['like'],
            question_hints: ['Why do you like it?', 'Why does he like it?', 'Why does she like it?']
          }
        ],
        hints: {
          words: ['what', 'why', 'do', 'like'],
          tricky: ['where', 'when']
        }
      }
    ],
    contexts_advanced: [
      {
        id: 'w4_like_what_adv',
        task_type: 'find_question',
        topic: 'like',
        intro: 'I like reading. Ask me what I like doing.',
        acceptedQuestions: [
          'What do you like doing?',
          'What do you like?',
          'What does he like doing?'
        ],
        answer: 'I like reading.',
        question_hints: ['What do you like doing?', 'What do you like?', 'What does he like doing?'],
        required_question_words: ['what'],
        required_keywords: ['like'],
        hints: {
          words: ['what', 'do', 'like', 'doing'],
          tricky: ['who', 'where']
        }
      },
      {
        id: 'w4_reading_why_adv',
        task_type: 'find_question',
        topic: 'reading',
        intro: 'I like reading because it is fun. Ask me why I like it.',
        acceptedQuestions: [
          'Why do you like reading?',
          'Why do you like it?',
          'Why does he like it?'
        ],
        answer: 'I like reading because it is fun.',
        question_hints: ['Why do you like reading?', 'Why do you like it?', 'Why does he like it?'],
        required_question_words: ['why'],
        required_keywords: ['like'],
        hints: {
          words: ['why', 'do', 'like'],
          tricky: ['what', 'where']
        }
      },
      {
        id: 'w4_playing_what_adv',
        task_type: 'find_question',
        topic: 'playing',
        intro: 'I like playing games. Ask me what I like doing.',
        acceptedQuestions: [
          'What do you like doing?',
          'What does he like doing?',
          'What do you like?'
        ],
        answer: 'I like playing games.',
        question_hints: ['What do you like doing?', 'What does he like doing?', 'What do you like?'],
        required_question_words: ['what'],
        required_keywords: ['like'],
        hints: {
          words: ['what', 'do', 'like', 'doing'],
          tricky: ['who', 'where']
        }
      },
      {
        id: 'w4_drawing_why_adv',
        task_type: 'find_question',
        topic: 'drawing',
        intro: 'I like drawing because it is fun. Ask me why.',
        acceptedQuestions: [
          'Why do you like drawing?',
          'Why do you like it?',
          'Why does she like it?'
        ],
        answer: 'I like drawing because it is fun.',
        question_hints: ['Why do you like drawing?', 'Why do you like it?', 'Why does she like it?'],
        required_question_words: ['why'],
        required_keywords: ['like'],
        hints: {
          words: ['why', 'do', 'like'],
          tricky: ['what', 'when']
        }
      },
      {
        id: 'w4_running_what_adv',
        task_type: 'find_question',
        topic: 'running',
        intro: 'I like running because it is fun. Ask me what I like doing.',
        acceptedQuestions: [
          'What do you like doing?',
          'What do you like?',
          'What does he like doing?'
        ],
        answer: 'I like running because it is fun.',
        question_hints: ['What do you like doing?', 'What do you like?', 'What does he like doing?'],
        required_question_words: ['what'],
        required_keywords: ['like'],
        hints: {
          words: ['what', 'do', 'like', 'doing'],
          tricky: ['who', 'where']
        }
      },
      {
        id: 'w4_jumping_why_adv',
        task_type: 'find_question',
        topic: 'jumping',
        intro: 'I like jumping because it is fun. Ask me why I like it.',
        acceptedQuestions: [
          'Why do you like jumping?',
          'Why do you like it?',
          'Why does he like it?'
        ],
        answer: 'I like jumping because it is fun.',
        question_hints: ['Why do you like jumping?', 'Why do you like it?', 'Why does he like it?'],
        required_question_words: ['why'],
        required_keywords: ['like'],
        hints: {
          words: ['why', 'do', 'like'],
          tricky: ['what', 'where']
        }
      },
      {
        id: 'w4_smiling_what_adv',
        task_type: 'find_question',
        topic: 'smiling',
        intro: 'I like smiling because it makes me happy. Ask me what I like.',
        acceptedQuestions: [
          'What do you like?',
          'What do you like doing?',
          'What does she like?'
        ],
        answer: 'I like smiling.',
        question_hints: ['What do you like?', 'What do you like doing?', 'What does she like?'],
        required_question_words: ['what'],
        required_keywords: ['like'],
        hints: {
          words: ['what', 'do', 'like'],
          tricky: ['who', 'where']
        }
      },
      {
        id: 'w4_laughing_why_adv',
        task_type: 'find_question',
        topic: 'laughing',
        intro: 'I like laughing because it is fun. Ask me why.',
        acceptedQuestions: [
          'Why do you like laughing?',
          'Why do you like it?',
          'Why does he like it?'
        ],
        answer: 'I like laughing because it is fun.',
        question_hints: ['Why do you like laughing?', 'Why do you like it?', 'Why does he like it?'],
        required_question_words: ['why'],
        required_keywords: ['like'],
        hints: {
          words: ['why', 'do', 'like'],
          tricky: ['what', 'when']
        }
      },
      {
        id: 'w4_mini_preferences',
        task_type: 'mini_interview',
        topic: 'preferences',
        intro: 'Interview me: ask what I like doing, then ask why I like it.',
        steps: [
          {
            prompt: 'Ask what I like doing.',
            required_question_words: ['what'],
            required_keywords: ['like'],
            question_hints: ['What do you like doing?', 'What do you like?', 'What does he like doing?']
          },
          {
            prompt: 'Ask why I like it.',
            acceptedQuestions: [
              'Why do you like it?',
              'Why does he like it?',
              'Why does she like it?'
            ],
            required_question_words: ['why'],
            required_keywords: ['like'],
            question_hints: ['Why do you like it?', 'Why does he like it?', 'Why does she like it?']
          }
        ],
        hints: {
          words: ['what', 'why', 'do', 'like'],
          tricky: ['where', 'when']
        }
      }
    ],
    required_question_words_easy: ['what', 'do', 'why'],
    required_question_words_advanced: ['what', 'do', 'why']
  }
};

export default week4GamesAdvanced;
