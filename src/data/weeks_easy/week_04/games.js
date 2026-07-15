/**
 * Week 4 Game Data - Easy Mode (New GameHub)
 */

export const week4GamesEasy = {
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
    frames_easy: ['I like ___', 'I love ___'],
    frames_advanced: ['I like ___', 'I love ___'],
    details_easy: [],
    details_advanced: [],
    detail_map: {
      like: ['I like it', 'I like toys', 'I like books', 'I like fun'],
      love: ['I love it', 'I love toys', 'I love books', 'I love fun'],
      smile: ['I smile', 'my smile', 'a big smile', 'smile now'],
      laugh: ['I laugh', 'my laugh', 'a big laugh', 'laugh now'],
      play: ['I play', 'play now', 'play here', 'play games'],
      draw: ['I draw', 'draw now', 'draw here', 'draw pictures'],
      read: ['I read', 'read now', 'read here', 'read books'],
      jump: ['I jump', 'jump now', 'jump high', 'jump here'],
      run: ['I run', 'run now', 'run fast', 'run here'],
      fun: ['it is fun', 'so fun', 'very fun', 'fun games']
    },
    distractors_easy: [],
    distractors_advanced: [],
    distractor_map: {
      like: ['I run', 'a big smile', 'the door'],
      love: ['I jump', 'a laugh', 'the book']
    },
    frame_map: {
      like: ['I like ___'],
      love: ['I love ___']
    },
    sentence_hints_map: {
      like: ['I like toys.', 'I like books.', 'I like fun.'],
      love: ['I love toys.', 'I love books.', 'I love fun.'],
      smile: ['I smile.', 'I like to smile.', 'I have a smile.'],
      laugh: ['I laugh.', 'I like to laugh.', 'I have a laugh.'],
      play: ['I play.', 'I like to play.', 'I play games.'],
      draw: ['I draw.', 'I like to draw.', 'I draw pictures.'],
      read: ['I read.', 'I like to read.', 'I read books.'],
      jump: ['I jump.', 'I like to jump.', 'I jump high.'],
      run: ['I run.', 'I like to run.', 'I run fast.'],
      fun: ['It is fun.', 'This is fun.', 'I like fun.']
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
      love: 'To enjoy something very much.'
    }
  },
  make_sentence: {
    instructions_easy: 'Unscramble the words to make a correct sentence.',
    instructions_advanced: 'Unscramble the words to make a correct sentence.',
    sentences_easy: [
      { scrambled: ['I', 'like', 'toys'], answer: 'I like toys.', base_words: ['i', 'like', 'toys'], time_phrases: ['every day', 'always', 'now', 'so much'], location_phrases: ['at home', 'in my room', 'at the store', 'everywhere'] },
      { scrambled: ['I', 'like', 'books'], answer: 'I like books.', base_words: ['i', 'like', 'books'], time_phrases: ['every day', 'always', 'now', 'so much'], location_phrases: ['at home', 'at school', 'in the library', 'in my room'] },
      { scrambled: ['I', 'like', 'fun'], answer: 'I like fun.', base_words: ['i', 'like', 'fun'], time_phrases: ['every day', 'always', 'now', 'all the time'], location_phrases: ['at school', 'at home', 'in the park', 'everywhere'] },
      { scrambled: ['I', 'like', 'games'], answer: 'I like games.', base_words: ['i', 'like', 'games'], time_phrases: ['every day', 'always', 'now', 'after school'], location_phrases: ['at home', 'at school', 'in my room', 'with friends'] },
      { scrambled: ['I', 'love', 'toys'], answer: 'I love toys.', base_words: ['i', 'love', 'toys'], time_phrases: ['every day', 'always', 'now', 'so much'], location_phrases: ['at home', 'in my room', 'at the store', 'everywhere'] },
      { scrambled: ['I', 'love', 'books'], answer: 'I love books.', base_words: ['i', 'love', 'books'], time_phrases: ['every day', 'always', 'now', 'so much'], location_phrases: ['at home', 'at school', 'in the library', 'in my room'] },
      { scrambled: ['I', 'like', 'to', 'play'], answer: 'I like to play.', base_words: ['i', 'like', 'to', 'play'], time_phrases: ['every day', 'after school', 'now', 'on weekends'], location_phrases: ['at home', 'in the park', 'at school', 'outside'] },
      { scrambled: ['I', 'like', 'to', 'draw'], answer: 'I like to draw.', base_words: ['i', 'like', 'to', 'draw'], time_phrases: ['every day', 'after school', 'now', 'in my free time'], location_phrases: ['at home', 'at school', 'in my room', 'in art class'] },
      { scrambled: ['I', 'like', 'to', 'read'], answer: 'I like to read.', base_words: ['i', 'like', 'to', 'read'], time_phrases: ['every day', 'at night', 'now', 'after school'], location_phrases: ['at home', 'at school', 'in the library', 'in bed'] },
      { scrambled: ['I', 'like', 'to', 'run'], answer: 'I like to run.', base_words: ['i', 'like', 'to', 'run'], time_phrases: ['every day', 'in the morning', 'now', 'after school'], location_phrases: ['in the park', 'at school', 'outside', 'in the playground'] }
    ],
    sentences_advanced: [
      { scrambled: ['I', 'like', 'toys'], answer: 'I like toys.', base_words: ['i', 'like', 'toys'], time_phrases: ['every day', 'always', 'now', 'so much'], location_phrases: ['at home', 'in my room', 'at the store', 'everywhere'] },
      { scrambled: ['I', 'like', 'books'], answer: 'I like books.', base_words: ['i', 'like', 'books'], time_phrases: ['every day', 'always', 'now', 'so much'], location_phrases: ['at home', 'at school', 'in the library', 'in my room'] },
      { scrambled: ['I', 'love', 'games'], answer: 'I love games.', base_words: ['i', 'love', 'games'], time_phrases: ['every day', 'always', 'now', 'after school'], location_phrases: ['at home', 'at school', 'in my room', 'with friends'] },
      { scrambled: ['I', 'like', 'to', 'smile'], answer: 'I like to smile.', base_words: ['i', 'like', 'to', 'smile'], time_phrases: ['every day', 'always', 'now', 'all the time'], location_phrases: ['at school', 'at home', 'everywhere', 'with friends'] },
      { scrambled: ['I', 'like', 'to', 'laugh'], answer: 'I like to laugh.', base_words: ['i', 'like', 'to', 'laugh'], time_phrases: ['every day', 'always', 'now', 'all the time'], location_phrases: ['at school', 'at home', 'everywhere', 'with friends'] },
      { scrambled: ['I', 'like', 'to', 'jump'], answer: 'I like to jump.', base_words: ['i', 'like', 'to', 'jump'], time_phrases: ['every day', 'after school', 'now', 'in the morning'], location_phrases: ['in the park', 'at school', 'outside', 'in the playground'] },
      { scrambled: ['like', 'I', 'to', 'play'], answer: 'I like to play.', base_words: ['i', 'like', 'to', 'play'], time_phrases: ['every day', 'after school', 'now', 'on weekends'], location_phrases: ['at home', 'in the park', 'at school', 'outside'] },
      { scrambled: ['like', 'I', 'to', 'draw'], answer: 'I like to draw.', base_words: ['i', 'like', 'to', 'draw'], time_phrases: ['every day', 'after school', 'now', 'in my free time'], location_phrases: ['at home', 'at school', 'in my room', 'in art class'] },
      { scrambled: ['love', 'I', 'to', 'read'], answer: 'I love to read.', base_words: ['i', 'love', 'to', 'read'], time_phrases: ['every day', 'at night', 'now', 'after school'], location_phrases: ['at home', 'at school', 'in the library', 'in bed'] },
      { scrambled: ['like', 'I', 'fun'], answer: 'I like fun.', base_words: ['i', 'like', 'fun'], time_phrases: ['every day', 'always', 'now', 'all the time'], location_phrases: ['at school', 'at home', 'in the park', 'everywhere'] }
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
        intro: 'I like toys. Ask me what I like.',
        acceptedQuestions: [
          'What do you like?',
          'What does he like?',
          'What does she like?'
        ],
        answer: 'I like toys.',
        question_hints: ['What do you like?', 'What does he like?', 'What does she like?'],
        required_question_words: ['what'],
        required_keywords: ['like'],
        hints: {
          words: ['what', 'do', 'like'],
          tricky: ['who', 'where']
        }
      },
      {
        id: 'w4_play_doyou',
        task_type: 'find_question',
        topic: 'play',
        intro: 'I like to play. Ask me if I like to play.',
        acceptedQuestions: [
          'Do you like to play?',
          'Do you like playing?',
          'Do you play?'
        ],
        answer: 'Yes, I like to play.',
        question_hints: ['Do you like to play?', 'Do you play?', 'Do you like playing?'],
        required_question_words: ['do'],
        required_keywords: ['you', 'play'],
        hints: {
          words: ['do', 'you', 'play', 'like'],
          tricky: ['what', 'where']
        }
      },
      {
        id: 'w4_read_what',
        task_type: 'find_question',
        topic: 'read',
        intro: 'I like to read. Ask me what I like.',
        acceptedQuestions: [
          'What do you like?',
          'What do you like to do?',
          'What does he like?'
        ],
        answer: 'I like to read.',
        question_hints: ['What do you like?', 'What do you like to do?', 'What does he like?'],
        required_question_words: ['what'],
        required_keywords: ['like'],
        hints: {
          words: ['what', 'do', 'like'],
          tricky: ['who', 'when']
        }
      },
      {
        id: 'w4_draw_doyou',
        task_type: 'find_question',
        topic: 'draw',
        intro: 'I like to draw. Ask me if I like to draw.',
        acceptedQuestions: [
          'Do you like to draw?',
          'Do you like drawing?',
          'Do you draw?'
        ],
        answer: 'Yes, I like to draw.',
        question_hints: ['Do you like to draw?', 'Do you draw?', 'Do you like drawing?'],
        required_question_words: ['do'],
        required_keywords: ['you', 'draw'],
        hints: {
          words: ['do', 'you', 'draw', 'like'],
          tricky: ['what', 'where']
        }
      },
      {
        id: 'w4_run_what',
        task_type: 'find_question',
        topic: 'run',
        intro: 'I like to run. Ask me what I like to do.',
        acceptedQuestions: [
          'What do you like to do?',
          'What do you like?',
          'What does he like?'
        ],
        answer: 'I like to run.',
        question_hints: ['What do you like to do?', 'What do you like?', 'What does he like?'],
        required_question_words: ['what'],
        required_keywords: ['like'],
        hints: {
          words: ['what', 'do', 'like'],
          tricky: ['who', 'where']
        }
      },
      {
        id: 'w4_jump_doyou',
        task_type: 'find_question',
        topic: 'jump',
        intro: 'I like to jump. Ask me if I like to jump.',
        acceptedQuestions: [
          'Do you like to jump?',
          'Do you like jumping?',
          'Do you jump?'
        ],
        answer: 'Yes, I like to jump.',
        question_hints: ['Do you like to jump?', 'Do you jump?', 'Do you like jumping?'],
        required_question_words: ['do'],
        required_keywords: ['you', 'jump'],
        hints: {
          words: ['do', 'you', 'jump', 'like'],
          tricky: ['what', 'when']
        }
      },
      {
        id: 'w4_smile_what',
        task_type: 'find_question',
        topic: 'smile',
        intro: 'I like to smile. Ask me what I like.',
        acceptedQuestions: [
          'What do you like?',
          'What do you like to do?',
          'What does she like?'
        ],
        answer: 'I like to smile.',
        question_hints: ['What do you like?', 'What do you like to do?', 'What does she like?'],
        required_question_words: ['what'],
        required_keywords: ['like'],
        hints: {
          words: ['what', 'do', 'like'],
          tricky: ['who', 'where']
        }
      },
      {
        id: 'w4_love_what',
        task_type: 'find_question',
        topic: 'love',
        intro: 'I love books. Ask me what I love.',
        acceptedQuestions: [
          'What do you love?',
          'What does he love?',
          'What does she love?'
        ],
        answer: 'I love books.',
        question_hints: ['What do you love?', 'What does he love?', 'What does she love?'],
        required_question_words: ['what'],
        required_keywords: ['love'],
        hints: {
          words: ['what', 'do', 'love'],
          tricky: ['who', 'where']
        }
      },
      {
        id: 'w4_mini_likes',
        task_type: 'mini_interview',
        topic: 'likes',
        intro: 'Interview me: ask what I like, then ask what I love.',
        steps: [
          {
            prompt: 'Ask what I like.',
            acceptedQuestions: [
              'What do you like?',
              'What does he like?',
              'What does she like?'
            ],
            required_question_words: ['what'],
            required_keywords: ['like'],
            question_hints: ['What do you like?', 'What does he like?', 'What does she like?']
          },
          {
            prompt: 'Ask what I love.',
            acceptedQuestions: [
              'What do you love?',
              'What does he love?',
              'What does she love?'
            ],
            required_question_words: ['what'],
            required_keywords: ['love'],
            question_hints: ['What do you love?', 'What does he love?', 'What does she love?']
          }
        ],
        hints: {
          words: ['what', 'do', 'like', 'love'],
          tricky: ['where', 'when']
        }
      }
    ],
    contexts_advanced: [
      {
        id: 'w4_like_what',
        task_type: 'find_question',
        topic: 'like',
        intro: 'I like toys. Ask me what I like.',
        acceptedQuestions: [
          'What do you like?',
          'What does he like?',
          'What does she like?'
        ],
        answer: 'I like toys.',
        question_hints: ['What do you like?', 'What does he like?', 'What does she like?'],
        required_question_words: ['what'],
        required_keywords: ['like'],
        hints: {
          words: ['what', 'do', 'like'],
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
    required_question_words_easy: ['what', 'do'],
    required_question_words_advanced: ['what', 'do', 'why']
  }
};

export default week4GamesEasy;
