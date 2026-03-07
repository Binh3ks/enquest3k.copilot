/**
 * Week 12 Game Data - Easy Mode (New GameHub)
 */

export const week12GamesEasy = {
  vocabulary: [
    'sing', 'dance', 'run', 'jump', 'swim',
    'draw', 'play', 'cook', 'climb', 'ride'
  ],
  show_tell: {
    steps: 3,
    word_list: [
      'sing', 'dance', 'run', 'jump', 'swim',
      'draw', 'play', 'cook', 'climb', 'ride'
    ],
    instructions_easy: 'Say the word, add a phrase, then make a full sentence.',
    instructions_advanced: 'Say the word, add a phrase, then make a full sentence.',
    step_instructions: {
      1: 'Step 1: say the word clearly.',
      2: 'Step 2: add a short phrase with the word.',
      3: 'Step 3: make a full sentence.'
    },
    frames_easy: ['I can ___ well', 'I can ___'],
    frames_advanced: ['I can ___ very well', 'I can ___'],
    details_easy: [],
    details_advanced: [],
    detail_map: {
      sing: ['I sing', 'sing well', 'sing songs', 'can sing'],
      dance: ['I dance', 'dance well', 'dance today', 'can dance'],
     run: ['I run', 'run fast', 'run today', 'can run'],
      jump: ['I jump', 'jump high', 'jump well', 'can jump'],
      swim: ['I swim', 'swim well', 'swim today', 'can swim'],
      draw: ['I draw', 'draw pictures', 'draw well', 'can draw'],
      play: ['I play', 'play well', 'play games', 'can play'],
      cook: ['I cook', 'cook well', 'cook food', 'can cook'],
      climb: ['I climb', 'climb high', 'climb trees', 'can climb'],
      ride: ['I ride', 'ride a bike', 'ride well', 'can ride']
    },
    distractors_easy: [],
    distractors_advanced: [],
    distractor_map: {
      sing: ['I dance', 'play games', 'can run'],
      dance: ['I sing', 'can jump', 'swim well']
    },
    frame_map: {
      sing: ['I can ___ well'],
      dance: ['I can ___ every day']
    },
    sentence_hints_map: {
      sing: ['I can sing.', 'I can sing well.', 'I can sing songs.'],
      dance: ['I can dance.', 'I can dance well.', 'I can dance every day.'],
      run: ['I can run.', 'I can run fast.', 'I can run every day.'],
      jump: ['I can jump.', 'I can jump high.', 'I can jump well.'],
      swim: ['I can swim.', 'I can swim well.', 'I can swim every day.'],
      draw: ['I can draw.', 'I can draw pictures.', 'I can draw well.'],
      play: ['I can play.', 'I can play games.', 'I can play every day.'],
      cook: ['I can cook.', 'I can cook food.', 'I can cook well.'],
      climb: ['I can climb.', 'I can climb trees.', 'I can climb high.'],
      ride: ['I can ride.', 'I can ride a bike.', 'I can ride well.']
    },
    emoji_map: {
      sing: '🎤',
      dance: '💃',
      run: '🏃',
      jump: '🦘',
      swim: '🏊',
      draw: '🎨',
      play: '🎮',
      cook: '👨‍🍳',
      climb: '🧗',
      ride: '🚴'
    },
    definitions: {
      sing: 'To make music with your voice.',
      dance: 'To move your body to music.',
      swim: 'To move through water.'
    }
  },
  make_sentence: {
    instructions_easy: 'Unscramble the words to make a correct sentence.',
    instructions_advanced: 'Unscramble the words to make a correct sentence.',
    sentences_easy: [
      { scrambled: ['I', 'can', 'sing'], answer: 'I can sing.', base_words: ['i', 'can', 'sing'], time_phrases: ['today', 'every day', 'now', 'well'], location_phrases: ['at home', 'at school', 'here', 'on stage'] },
      { scrambled: ['I', 'can', 'dance'], answer: 'I can dance.', base_words: ['i', 'can', 'dance'], time_phrases: ['today', 'every day', 'now', 'well'], location_phrases: ['at home', 'at school', 'here', 'on stage'] },
      { scrambled: ['I', 'can', 'run'], answer: 'I can run.', base_words: ['i', 'can', 'run'], time_phrases: ['today', 'every day', 'now', 'fast'], location_phrases: ['at home', 'at school', 'here', 'in the park'] },
      { scrambled: ['I', 'can', 'jump'], answer: 'I can jump.', base_words: ['i', 'can', 'jump'], time_phrases: ['today', 'every day', 'now', 'high'], location_phrases: ['at home', 'at school', 'here', 'in the park'] },
      { scrambled: ['I', 'can', 'swim'], answer: 'I can swim.', base_words: ['i', 'can', 'swim'], time_phrases: ['today', 'every day', 'now', 'well'], location_phrases: ['at home', 'at school', 'here', 'in the pool'] },
      { scrambled: ['I', 'can', 'draw'], answer: 'I can draw.', base_words: ['i', 'can', 'draw'], time_phrases: ['today', 'every day', 'now', 'well'], location_phrases: ['at home', 'at school', 'here', 'in class'] },
      { scrambled: ['I', 'can', 'play'], answer: 'I can play.', base_words: ['i', 'can', 'play'], time_phrases: ['today', 'every day', 'now', 'well'], location_phrases: ['at home', 'at school', 'here', 'outside'] },
      { scrambled: ['I', 'can', 'cook'], answer: 'I can cook.', base_words: ['i', 'can', 'cook'], time_phrases: ['today', 'every day', 'now', 'well'], location_phrases: ['at home', 'at school', 'here', 'in the kitchen'] },
      { scrambled: ['I', 'can', 'climb'], answer: 'I can climb.', base_words: ['i', 'can', 'climb'], time_phrases: ['today', 'every day', 'now', 'high'], location_phrases: ['at home', 'at school', 'here', 'outside'] },
      { scrambled: ['I', 'can', 'ride'], answer: 'I can ride.', base_words: ['i', 'can', 'ride'], time_phrases: ['today', 'every day', 'now', 'well'], location_phrases: ['at home', 'at school', 'here', 'in the park'] }
    ],
    sentences_advanced: [
      { scrambled: ['I', 'can', 'sing', 'well'], answer: 'I can sing well.', base_words: ['i', 'can', 'sing', 'well'], time_phrases: ['today', 'every day', 'now'], location_phrases: ['at home', 'at school', 'here', 'on stage'] },
      { scrambled: ['I', 'can', 'dance', 'well'], answer: 'I can dance well.', base_words: ['i', 'can', 'dance', 'well'], time_phrases: ['today', 'every day', 'now'], location_phrases: ['at home', 'at school', 'here', 'on stage'] },
      { scrambled: ['I', 'can', 'run', 'fast'], answer: 'I can run fast.', base_words: ['i', 'can', 'run', 'fast'], time_phrases: ['today', 'every day', 'now'], location_phrases: ['at home', 'at school', 'here', 'in the park'] },
      { scrambled: ['can', 'I', 'jump', 'high'], answer: 'I can jump high.', base_words: ['i', 'can', 'jump', 'high'], time_phrases: ['today', 'every day', 'now'], location_phrases: ['at home', 'at school', 'here', 'in the park'] },
      { scrambled: ['can', 'I', 'swim', 'well'], answer: 'I can swim well.', base_words: ['i', 'can', 'swim', 'well'], time_phrases: ['today', 'every day', 'now'], location_phrases: ['at home', 'at school', 'here', 'in the pool'] },
      { scrambled: ['can', 'I', 'draw', 'pictures'], answer: 'I can draw pictures.', base_words: ['i', 'can', 'draw', 'pictures'], time_phrases: ['today', 'every day', 'now'], location_phrases: ['at home', 'at school', 'here', 'in class'] },
      { scrambled: ['can', 'I', 'play', 'games'], answer: 'I can play games.', base_words: ['i', 'can', 'play', 'games'], time_phrases: ['today', 'every day', 'now'], location_phrases: ['at home', 'at school', 'here', 'outside'] },
      { scrambled: ['I', 'can', 'cook', 'food'], answer: 'I can cook food.', base_words: ['i', 'can', 'cook', 'food'], time_phrases: ['today', 'every day', 'now'], location_phrases: ['at home', 'at school', 'here', 'in the kitchen'] },
      { scrambled: ['climb', 'I', 'can', 'trees'], answer: 'I can climb trees.', base_words: ['i', 'can', 'climb', 'trees'], time_phrases: ['today', 'every day', 'now'], location_phrases: ['at home', 'at school', 'here', 'outside'] },
      { scrambled: ['ride', 'I', 'can', 'a', 'bike'], answer: 'I can ride a bike.', base_words: ['i', 'can', 'ride', 'a', 'bike'], time_phrases: ['today', 'every day', 'now'], location_phrases: ['at home', 'at school', 'here', 'in the park'] }
    ]
  },
  ask_me: {
    instructions_easy: 'Ask a question that matches the context.',
    instructions_advanced: 'Ask a question that matches the context.',
    contexts_easy: [
      {
        id: 'w12_can_sing',
        task_type: 'find_question',
        topic: 'sing',
        intro: 'I can sing. Ask me what I can do.',
        acceptedQuestions: [
          'What can you do?',
          'Can you sing?',
          'What do you do?'
        ],
        answer: 'I can sing.',
        question_hints: ['What can you do?', 'Can you sing?', 'What do you do?'],
        required_question_words: ['what', 'can'],
        required_keywords: ['you'],
        hints: {
          words: ['what', 'can', 'you', 'do'],
          tricky: ['where', 'who']
        }
      },
      {
        id: 'w12_can_dance',
        task_type: 'find_question',
        topic: 'dance',
        intro: 'I can dance. Ask me if I can dance.',
        acceptedQuestions: [
          'Can you dance?',
          'What can you do?',
          'Do you dance?'
        ],
        answer: 'Yes, I can dance.',
        question_hints: ['Can you dance?', 'What can you do?', 'Do you dance?'],
        required_question_words: ['can'],
        required_keywords: ['you', 'dance'],
        hints: {
          words: ['can', 'you', 'dance'],
          tricky: ['where', 'what']
        }
      },
      {
        id: 'w12_can_run',
        task_type: 'find_question',
        topic: 'run',
        intro: 'I can run fast. Ask me what I can do.',
        acceptedQuestions: [
          'What can you do?',
          'Can you run?',
          'Can you run fast?'
        ],
        answer: 'I can run fast.',
        question_hints: ['What can you do?', 'Can you run?', 'Can you run fast?'],
        required_question_words: ['what', 'can'],
        required_keywords: ['you'],
        hints: {
          words: ['what', 'can', 'you', 'do'],
          tricky: ['where', 'who']
        }
      },
      {
        id: 'w12_can_jump',
        task_type: 'find_question',
        topic: 'jump',
        intro: 'I can jump high. Ask me if I can jump.',
        acceptedQuestions: [
          'Can you jump?',
          'Can you jump high?',
          'What can you do?'
        ],
        answer: 'Yes, I can jump high.',
        question_hints: ['Can you jump?', 'Can you jump high?', 'What can you do?'],
        required_question_words: ['can'],
        required_keywords: ['you', 'jump'],
        hints: {
          words: ['can', 'you', 'jump'],
          tricky: ['where', 'what']
        }
      },
      {
        id: 'w12_can_swim',
        task_type: 'find_question',
        topic: 'swim',
        intro: 'I can swim. Ask me if I can swim.',
        acceptedQuestions: [
          'Can you swim?',
          'What can you do?',
          'Do you swim?'
        ],
        answer: 'Yes, I can swim.',
        question_hints: ['Can you swim?', 'What can you do?', 'Do you swim?'],
        required_question_words: ['can'],
        required_keywords: ['you', 'swim'],
        hints: {
          words: ['can', 'you', 'swim'],
          tricky: ['where', 'who']
        }
      },
      {
        id: 'w12_can_draw',
        task_type: 'find_question',
        topic: 'draw',
        intro: 'I can draw pictures. Ask me what I can do.',
        acceptedQuestions: [
          'What can you do?',
          'Can you draw?',
          'Can you draw pictures?'
        ],
        answer: 'I can draw pictures.',
        question_hints: ['What can you do?', 'Can you draw?', 'Can you draw pictures?'],
        required_question_words: ['what', 'can'],
        required_keywords: ['you'],
        hints: {
          words: ['what', 'can', 'you', 'do'],
          tricky: ['where', 'who']
        }
      },
      {
        id: 'w12_can_play',
        task_type: 'find_question',
        topic: 'play',
        intro: 'I can play games. Ask me if I can play.',
        acceptedQuestions: [
          'Can you play?',
          'Can you play games?',
          'What can you do?'
        ],
        answer: 'Yes, I can play games.',
        question_hints: ['Can you play?', 'Can you play games?', 'What can you do?'],
        required_question_words: ['can'],
        required_keywords: ['you', 'play'],
        hints: {
          words: ['can', 'you', 'play'],
          tricky: ['where', 'what']
        }
      },
      {
        id: 'w12_can_cook',
        task_type: 'find_question',
        topic: 'cook',
        intro: 'I can cook food. Ask me if I can cook.',
        acceptedQuestions: [
          'Can you cook?',
          'Can you cook food?',
          'What can you do?'
        ],
        answer: 'Yes, I can cook food.',
        question_hints: ['Can you cook?', 'Can you cook food?', 'What can you do?'],
        required_question_words: ['can'],
        required_keywords: ['you', 'cook'],
        hints: {
          words: ['can', 'you', 'cook'],
          tricky: ['where', 'who']
        }
      },
      {
        id: 'w12_mini_abilities',
        task_type: 'mini_interview',
        topic: 'abilities',
        intro: 'Interview me: ask what I can do, then ask if I can sing.',
        steps: [
          {
            prompt: 'Ask what I can do.',
            required_question_words: ['what', 'can'],
            required_keywords: ['you'],
            question_hints: ['What can you do?', 'What do you do?', 'What can you do well?']
          },
          {
            prompt: 'Ask if I can sing.',
            acceptedQuestions: [
              'Can you sing?',
              'Do you sing?',
              'Can you sing well?'
            ],
            required_question_words: ['can'],
            required_keywords: ['you', 'sing'],
            question_hints: ['Can you sing?', 'Do you sing?', 'Can you sing well?']
          }
        ],
        hints: {
          words: ['what', 'can', 'you', 'do', 'sing'],
          tricky: ['where', 'who']
        }
      }
    ],
    contexts_advanced: [
      {
        id: 'w12_can_sing_adv',
        task_type: 'find_question',
        topic: 'sing',
        intro: 'I can sing beautifully. Ask me what I can do.',
        acceptedQuestions: [
          'What can you do?',
          'Can you sing?',
          'What are your abilities?'
        ],
        answer: 'I can sing beautifully.',
        question_hints: ['What can you do?', 'Can you sing?', 'What are your abilities?'],
        required_question_words: ['what', 'can'],
        required_keywords: ['you'],
        hints: {
          words: ['what', 'can', 'you', 'do'],
          tricky: ['where', 'who']
        }
      },
      {
        id: 'w12_can_dance_adv',
        task_type: 'find_question',
        topic: 'dance',
        intro: 'I can dance very well. Ask me if I can dance.',
        acceptedQuestions: [
          'Can you dance?',
          'What can you do?',
          'Can you dance well?'
        ],
        answer: 'Yes, I can dance very well.',
        question_hints: ['Can you dance?', 'What can you do?', 'Can you dance well?'],
        required_question_words: ['can'],
        required_keywords: ['you', 'dance'],
        hints: {
          words: ['can', 'you', 'dance'],
          tricky: ['where', 'what']
        }
      },
      {
        id: 'w12_can_run_adv',
        task_type: 'find_question',
        topic: 'run',
        intro: 'I can run very fast. Ask me what abilities I have.',
        acceptedQuestions: [
          'What can you do?',
          'Can you run?',
          'Can you run fast?'
        ],
        answer: 'I can run very fast.',
        question_hints: ['What can you do?', 'Can you run?', 'Can you run fast?'],
        required_question_words: ['what', 'can'],
        required_keywords: ['you'],
        hints: {
          words: ['what', 'can', 'you', 'do'],
          tricky: ['where', 'who']
        }
      },
      {
        id: 'w12_can_jump_adv',
        task_type: 'find_question',
        topic: 'jump',
        intro: 'I can jump very high. Ask me if I can jump high.',
        acceptedQuestions: [
          'Can you jump?',
          'Can you jump high?',
          'What can you do?'
        ],
        answer: 'Yes, I can jump very high.',
        question_hints: ['Can you jump?', 'Can you jump high?', 'What can you do?'],
        required_question_words: ['can'],
        required_keywords: ['you', 'jump'],
        hints: {
          words: ['can', 'you', 'jump'],
          tricky: ['where', 'what']
        }
      },
      {
        id: 'w12_can_swim_adv',
        task_type: 'find_question',
        topic: 'swim',
        intro: 'I can swim well. Ask me if I can swim.',
        acceptedQuestions: [
          'Can you swim?',
          'What can you do?',
          'Can you swim well?'
        ],
        answer: 'Yes, I can swim well.',
        question_hints: ['Can you swim?', 'What can you do?', 'Can you swim well?'],
        required_question_words: ['can'],
        required_keywords: ['you', 'swim'],
        hints: {
          words: ['can', 'you', 'swim'],
          tricky: ['where', 'who']
        }
      },
      {
        id: 'w12_can_draw_adv',
        task_type: 'find_question',
        topic: 'draw',
        intro: 'I can draw beautiful pictures. Ask me what I can do.',
        acceptedQuestions: [
          'What can you do?',
          'Can you draw?',
          'Can you draw pictures?'
        ],
        answer: 'I can draw beautiful pictures.',
        question_hints: ['What can you do?', 'Can you draw?', 'Can you draw pictures?'],
        required_question_words: ['what', 'can'],
        required_keywords: ['you'],
        hints: {
          words: ['what', 'can', 'you', 'do'],
          tricky: ['where', 'who']
        }
      },
      {
        id: 'w12_can_play_adv',
        task_type: 'find_question',
        topic: 'play',
        intro: 'I can play many games. Ask me if I can play games.',
        acceptedQuestions: [
          'Can you play?',
          'Can you play games?',
          'What can you do?'
        ],
        answer: 'Yes, I can play many games.',
        question_hints: ['Can you play?', 'Can you play games?', 'What can you do?'],
        required_question_words: ['can'],
        required_keywords: ['you', 'play'],
        hints: {
          words: ['can', 'you', 'play'],
          tricky: ['where', 'what']
        }
      },
      {
        id: 'w12_can_cook_adv',
        task_type: 'find_question',
        topic: 'cook',
        intro: 'I can cook delicious food. Ask me if I can cook.',
        acceptedQuestions: [
          'Can you cook?',
          'Can you cook food?',
          'What can you do?'
        ],
        answer: 'Yes, I can cook delicious food.',
        question_hints: ['Can you cook?', 'Can you cook food?', 'What can you do?'],
        required_question_words: ['can'],
        required_keywords: ['you', 'cook'],
        hints: {
          words: ['can', 'you', 'cook'],
          tricky: ['where', 'who']
        }
      },
      {
        id: 'w12_mini_abilities_adv',
        task_type: 'mini_interview',
        topic: 'abilities',
        intro: 'Interview me: ask what I can do well, then ask if I can perform on stage.',
        steps: [
          {
            prompt: 'Ask what I can do well.',
            required_question_words: ['what', 'can'],
            required_keywords: ['you'],
            question_hints: ['What can you do well?', 'What can you do?', 'What are your abilities?']
          },
          {
            prompt: 'Ask if I can perform on stage.',
            acceptedQuestions: [
              'Can you perform?',
              'Can you sing on stage?',
              'Can you perform on stage?'
            ],
            required_question_words: ['can'],
            required_keywords: ['you'],
            question_hints: ['Can you perform?', 'Can you sing on stage?', 'Can you perform on stage?']
          }
        ],
        hints: {
          words: ['what', 'can', 'you', 'do', 'perform'],
          tricky: ['where', 'who']
        }
      }
    ],
    required_question_words_easy: ['what', 'can'],
    required_question_words_advanced: ['what', 'can']
  }
};

export default week12GamesEasy;
