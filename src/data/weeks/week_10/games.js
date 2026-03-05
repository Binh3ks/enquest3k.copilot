/**
 * Week 10 Game Data - Advanced Mode (New GameHub)
 */

export const week10GamesAdvanced = {
  vocabulary: [
    'countryside', 'farm', 'quiet', 'clean', 'peaceful',
    'animals', 'cow', 'chicken', 'field', 'tree'
  ],
  show_tell: {
    steps: 3,
    word_list: [
      'countryside', 'farm', 'quiet', 'clean', 'peaceful',
      'animals', 'cow', 'chicken', 'field', 'tree'
    ],
    instructions_easy: 'Say the word, add a phrase, then make a full sentence.',
    instructions_advanced: 'Say the word, add a phrase, then make a full sentence.',
    step_instructions: {
      1: 'Step 1: say the word clearly.',
      2: 'Step 2: add a short phrase with the word.',
      3: 'Step 3: make a full sentence.'
    },
    frames_easy: ['The ___ is ___', 'I see a ___'],
    frames_advanced: ['The city is ___, but the farm is ___', 'The ___ has ___'],
    details_easy: [],
    details_advanced: [],
    detail_map: {
      countryside: ['peaceful countryside', 'green countryside', 'the countryside', 'the countryside is peaceful'],
      farm: ['big farm', 'clean farm', 'the farm', 'the farm is quiet'],
      quiet: ['very quiet', 'so quiet', 'quiet place', 'the farm is quiet'],
      clean: ['very clean', 'so clean', 'clean air', 'the farm is clean'],
      peaceful: ['very peaceful', 'so peaceful', 'peaceful place', 'the farm is peaceful'],
      animals: ['farm animals', 'many animals', 'the animals', 'I see animals on the farm'],
      cow: ['big cow', 'the cow', 'a cow', 'I see a cow on the farm'],
      chicken: ['small chicken', 'the chicken', 'a chicken', 'I see a chicken on the farm'],
      field: ['green field', 'big field', 'the field', 'the field is green'],
      tree: ['tall tree', 'green tree', 'the tree', 'the tree is tall']
    },
    distractors_easy: [],
    distractors_advanced: [],
    distractor_map: {
      farm: ['noisy', 'city', 'buildings'],
      cow: ['car', 'bus', 'train']
    },
    frame_map: {
      farm: ['The city is ___, but the farm is ___'],
      animals: ['The ___ has ___']
    },
    sentence_hints_map: {
      countryside: ['The countryside is peaceful.', 'The countryside is quiet.', 'The countryside is clean.'],
      farm: ['The farm is quiet.', 'The farm is clean.', 'The farm is peaceful.'],
      quiet: ['The farm is quiet.', 'The countryside is quiet.', 'It is quiet.'],
      clean: ['The farm is clean.', 'The countryside is clean.', 'The air is clean.'],
      peaceful: ['The farm is peaceful.', 'The countryside is peaceful.', 'It is peaceful.'],
      animals: ['I see animals on the farm.', 'The farm has animals.', 'The animals are cute.'],
      cow: ['I see a cow.', 'The cow is big.', 'The cow eats grass.'],
      chicken: ['I see a chicken.', 'The chicken runs fast.', 'The chicken is small.'],
      field: ['The field is green.', 'I walk in the field.', 'The field is big.'],
      tree: ['The tree is tall.', 'I see a tree.', 'The tree is green.']
    },
    emoji_map: {
      countryside: '🌾',
      farm: '🚜',
      quiet: '🤫',
      clean: '✨',
      peaceful: '☮️',
      animals: '🐾',
      cow: '🐄',
      chicken: '🐔',
      field: '🌱',
      tree: '🌳'
    },
    definitions: {
      countryside: 'The land outside cities.',
      farm: 'A place where people grow food.',
      quiet: 'With little or no noise.',
      peaceful: 'Quiet and calm.'
    }
  },
  make_sentence: {
    instructions_easy: 'Unscramble the words to make a correct sentence.',
    instructions_advanced: 'Unscramble the words to make a correct sentence.',
    sentences_easy: [
      { scrambled: ['The', 'farm', 'is', 'quiet'], answer: 'The farm is quiet.' },
      { scrambled: ['I', 'see', 'a', 'cow'], answer: 'I see a cow.' },
      { scrambled: ['The', 'countryside', 'is', 'peaceful'], answer: 'The countryside is peaceful.' },
      { scrambled: ['I', 'see', 'a', 'chicken'], answer: 'I see a chicken.' },
      { scrambled: ['The', 'field', 'is', 'green'], answer: 'The field is green.' },
      { scrambled: ['The', 'farm', 'is', 'clean'], answer: 'The farm is clean.' },
      { scrambled: ['The', 'tree', 'is', 'tall'], answer: 'The tree is tall.' },
      { scrambled: ['I', 'see', 'animals'], answer: 'I see animals.' },
      { scrambled: ['The', 'farm', 'has', 'cows'], answer: 'The farm has cows.' },
      { scrambled: ['The', 'countryside', 'is', 'clean'], answer: 'The countryside is clean.' }
    ],
    sentences_advanced: [
      { scrambled: ['The', 'city', 'is', 'noisy', 'but', 'the', 'farm', 'is', 'quiet'], answer: 'The city is noisy, but the farm is quiet.', base_words: ['the', 'city', 'is', 'noisy', 'but', 'the', 'farm', 'is', 'quiet'], time_phrases: [], location_phrases: [] },
      { scrambled: ['The', 'city', 'is', 'dirty', 'but', 'the', 'farm', 'is', 'clean'], answer: 'The city is dirty, but the farm is clean.', base_words: ['the', 'city', 'is', 'dirty', 'but', 'the', 'farm', 'is', 'clean'], time_phrases: [], location_phrases: [] },
      { scrambled: ['The', 'city', 'is', 'busy', 'but', 'the', 'countryside', 'is', 'peaceful'], answer: 'The city is busy, but the countryside is peaceful.', base_words: ['the', 'city', 'is', 'busy', 'but', 'the', 'countryside', 'is', 'peaceful'], time_phrases: [], location_phrases: [] },
      { scrambled: ['The', 'farm', 'has', 'animals'], answer: 'The farm has animals.', base_words: ['the', 'farm', 'has', 'animals'], time_phrases: [], location_phrases: [] },
      { scrambled: ['I', 'see', 'a', 'cow', 'on', 'the', 'farm'], answer: 'I see a cow on the farm.', base_words: ['I', 'see', 'a', 'cow', 'on', 'the', 'farm'], time_phrases: [], location_phrases: [] },
      { scrambled: ['the', 'Put', 'ball', 'under', 'the', 'chair'], answer: 'Put the ball under the chair.', base_words: ['put', 'the', 'ball', 'under', 'the', 'chair'], time_phrases: ['right now', 'after playing', 'before dinner', 'in a minute', 'this evening'], location_phrases: ['in the room', 'in the kitchen', 'in the dining area', 'near the table', 'over there'] },
      { scrambled: ['the', 'Put', 'toy', 'on', 'the', 'floor'], answer: 'Put the toy on the floor.', base_words: ['put', 'the', 'toy', 'on', 'the', 'floor'], time_phrases: ['right now', 'after playing', 'before cleaning', 'in a moment', 'this time'], location_phrases: ['in the room', 'in the bedroom', 'near the bed', 'by the door', 'in the corner'] },
      { scrambled: ['box', 'Put', 'the', 'on', 'the', 'desk'], answer: 'Put the box on the desk.', base_words: ['put', 'the', 'box', 'on', 'the', 'desk'], time_phrases: ['right now', 'after organizing', 'before class', 'in a moment', 'this morning'], location_phrases: ['in the classroom', 'in the office', 'in the bedroom', 'near the books', 'by the lamp'] },
      { scrambled: ['ball', 'Put', 'the', 'on', 'the', 'desk'], answer: 'Put the ball on the desk.', base_words: ['put', 'the', 'ball', 'on', 'the', 'desk'], time_phrases: ['right now', 'after playing', 'before leaving', 'in a minute', 'this afternoon'], location_phrases: ['in the classroom', 'in the bedroom', 'in the study', 'near the lamp', 'by the window'] },
      { scrambled: ['toy', 'Put', 'the', 'under', 'the', 'window'], answer: 'Put the toy under the window.', base_words: ['put', 'the', 'toy', 'under', 'the', 'window'], time_phrases: ['right now', 'after playing', 'before bedtime', 'in a moment', 'this evening'], location_phrases: ['in the bedroom', 'in the living room', 'in the playroom', 'near the curtain', 'by the wall'] }
    ]
  },
  ask_me: {
    instructions_easy: 'Ask a question that matches the context.',
    instructions_advanced: 'Ask a question that matches the context.',
    contexts_easy: [
      {
        id: 'w6_ball_where',
        task_type: 'find_question',
        topic: 'ball',
        intro: 'Put the ball on the floor. Ask me where to put the ball.',
        acceptedQuestions: [
          'Where is the ball?',
          'Where should I put the ball?',
          'Where is it?'
        ],
        answer: 'Put the ball on the floor.',
        question_hints: ['Where is the ball?', 'Where should I put the ball?', 'Where is it?'],
        required_question_words: ['where'],
        required_keywords: ['ball'],
        hints: {
          words: ['where', 'is', 'the', 'ball'],
          tricky: ['what', 'who']
        }
      },
      {
        id: 'w6_toy_where',
        task_type: 'find_question',
        topic: 'toy',
        intro: 'Put the toy in the box. Ask me where to put the toy.',
        acceptedQuestions: [
          'Where is the toy?',
          'Where should I put the toy?',
          'Where is it?'
        ],
        answer: 'Put the toy in the box.',
        question_hints: ['Where is the toy?', 'Where should I put the toy?', 'Where is it?'],
        required_question_words: ['where'],
        required_keywords: ['toy'],
        hints: {
          words: ['where', 'is', 'the', 'toy'],
          tricky: ['what', 'who']
        }
      },
      {
        id: 'w6_box_where',
        task_type: 'find_question',
        topic: 'box',
        intro: 'Put the box on the desk. Ask me where to put the box.',
        acceptedQuestions: [
          'Where is the box?',
          'Where should I put it?',
          'Where is the toy?'
        ],
        answer: 'Put the box on the desk.',
        question_hints: ['Where is the box?', 'Where should I put it?', 'Where is the toy?'],
        required_question_words: ['where'],
        required_keywords: ['box'],
        hints: {
          words: ['where', 'is', 'the', 'box'],
          tricky: ['what', 'who']
        }
      },
      {
        id: 'w6_desk_where',
        task_type: 'find_question',
        topic: 'desk',
        intro: 'Put the toy on the desk. Ask me where the toy is.',
        acceptedQuestions: [
          'Where is the toy?',
          'Where is the ball?',
          'Where is it?'
        ],
        answer: 'The toy is on the desk.',
        question_hints: ['Where is the toy?', 'Where is the ball?', 'Where is it?'],
        required_question_words: ['where'],
        required_keywords: ['toy'],
        hints: {
          words: ['where', 'is', 'the', 'toy'],
          tricky: ['what', 'who']
        }
      },
      {
        id: 'w6_floor_where',
        task_type: 'find_question',
        topic: 'floor',
        intro: 'Put the ball on the floor. Ask me where the ball is.',
        acceptedQuestions: [
          'Where is the ball?',
          'Where is it?',
          'Where is the toy?'
        ],
        answer: 'The ball is on the floor.',
        question_hints: ['Where is the ball?', 'Where is it?', 'Where is the toy?'],
        required_question_words: ['where'],
        required_keywords: ['ball', 'it'],
        hints: {
          words: ['where', 'is', 'the', 'ball'],
          tricky: ['what', 'who']
        }
      },
      {
        id: 'w6_door_where',
        task_type: 'find_question',
        topic: 'door',
        intro: 'Put the toy under the door. Ask me where the toy is.',
        acceptedQuestions: [
          'Where is the toy?',
          'Where is it?',
          'Where is the ball?'
        ],
        answer: 'The toy is under the door.',
        question_hints: ['Where is the toy?', 'Where is it?', 'Where is the ball?'],
        required_question_words: ['where'],
        required_keywords: ['toy'],
        hints: {
          words: ['where', 'is', 'the', 'toy'],
          tricky: ['what', 'who']
        }
      },
      {
        id: 'w6_window_where',
        task_type: 'find_question',
        topic: 'window',
        intro: 'Put the ball under the window. Ask me where the ball is.',
        acceptedQuestions: [
          'Where is the ball?',
          'Where is it?',
          'Where is the toy?'
        ],
        answer: 'The ball is under the window.',
        question_hints: ['Where is the ball?', 'Where is it?', 'Where is the toy?'],
        required_question_words: ['where'],
        required_keywords: ['ball'],
        hints: {
          words: ['where', 'is', 'the', 'ball'],
          tricky: ['what', 'who']
        }
      },
      {
        id: 'w6_hide_where',
        task_type: 'find_question',
        topic: 'hide',
        intro: 'I hide the toy in the box. Ask me where the toy is.',
        acceptedQuestions: [
          'Where is the toy?',
          'Where is it?',
          'Where is the ball?'
        ],
        answer: 'The toy is in the box.',
        question_hints: ['Where is the toy?', 'Where is it?', 'Where is the ball?'],
        required_question_words: ['where'],
        required_keywords: ['toy'],
        hints: {
          words: ['where', 'is', 'the', 'toy'],
          tricky: ['what', 'who']
        }
      },
      {
        id: 'w6_mini_position',
        task_type: 'mini_interview',
        topic: 'position',
        intro: 'Interview me: ask where the ball is, then ask where the toy is.',
        steps: [
          {
            prompt: 'Ask where the ball is.',
            required_question_words: ['where'],
            required_keywords: ['ball'],
            question_hints: ['Where is the ball?', 'Where is it?', 'Where is the toy?']
          },
          {
            prompt: 'Ask where the toy is.',
            acceptedQuestions: [
              'Where is the toy?',
              'Where is it?',
              'Where is the ball?'
            ],
            required_question_words: ['where'],
            required_keywords: ['toy'],
            question_hints: ['Where is the toy?', 'Where is it?', 'Where is the ball?']
          }
        ],
        hints: {
          words: ['where', 'is', 'the', 'ball', 'toy'],
          tricky: ['what', 'who']
        }
      }
    ],
    contexts_advanced: [
      {
        id: 'w6_ball_where_adv',
        task_type: 'find_question',
        topic: 'ball',
        intro: 'Put the ball on the floor. Ask me where to put the ball.',
        acceptedQuestions: [
          'Where should I put the ball?',
          'Where is the ball?',
          'Where is it?'
        ],
        answer: 'Put the ball on the floor.',
        question_hints: ['Where should I put the ball?', 'Where is the ball?', 'Where is it?'],
        required_question_words: ['where'],
        required_keywords: ['ball'],
        hints: {
          words: ['where', 'is', 'the', 'ball', 'put'],
          tricky: ['what', 'who']
        }
      },
      {
        id: 'w6_toy_where_adv',
        task_type: 'find_question',
        topic: 'toy',
        intro: 'Put the toy in the box. Ask me where to put the toy.',
        acceptedQuestions: [
          'Where should I put the toy?',
          'Where is the toy?',
          'Where is it?'
        ],
        answer: 'Put the toy in the box.',
        question_hints: ['Where should I put the toy?', 'Where is the toy?', 'Where is it?'],
        required_question_words: ['where'],
        required_keywords: ['toy'],
        hints: {
          words: ['where', 'is', 'the', 'toy', 'put'],
          tricky: ['what', 'who']
        }
      },
      {
        id: 'w6_box_where_adv',
        task_type: 'find_question',
        topic: 'box',
        intro: 'Put the box on the desk. Ask me where to put the box.',
        acceptedQuestions: [
          'Where should I put the box?',
          'Where is the box?',
          'Where is it?'
        ],
        answer: 'Put the box on the desk.',
        question_hints: ['Where should I put the box?', 'Where is the box?', 'Where is it?'],
        required_question_words: ['where'],
        required_keywords: ['box'],
        hints: {
          words: ['where', 'is', 'the', 'box', 'put'],
          tricky: ['what', 'who']
        }
      },
      {
        id: 'w6_desk_where_adv',
        task_type: 'find_question',
        topic: 'desk',
        intro: 'Put the toy on the desk. Ask me where the toy is.',
        acceptedQuestions: [
          'Where is the toy?',
          'Where is the ball?',
          'Where is it?'
        ],
        answer: 'The toy is on the desk.',
        question_hints: ['Where is the toy?', 'Where is the ball?', 'Where is it?'],
        required_question_words: ['where'],
        required_keywords: ['toy'],
        hints: {
          words: ['where', 'is', 'the', 'toy'],
          tricky: ['what', 'who']
        }
      },
      {
        id: 'w6_floor_where_adv',
        task_type: 'find_question',
        topic: 'floor',
        intro: 'Put the ball on the floor. Ask me where the ball is.',
        acceptedQuestions: [
          'Where is the ball?',
          'Where is it?',
          'Where is the toy?'
        ],
        answer: 'The ball is on the floor.',
        question_hints: ['Where is the ball?', 'Where is it?', 'Where is the toy?'],
        required_question_words: ['where'],
        required_keywords: ['ball', 'it'],
        hints: {
          words: ['where', 'is', 'the', 'ball'],
          tricky: ['what', 'who']
        }
      },
      {
        id: 'w6_door_where_adv',
        task_type: 'find_question',
        topic: 'door',
        intro: 'Put the toy under the door. Ask me where to put the toy.',
        acceptedQuestions: [
          'Where should I put the toy?',
          'Where is the toy?',
          'Where is it?'
        ],
        answer: 'Put the toy under the door.',
        question_hints: ['Where should I put the toy?', 'Where is the toy?', 'Where is it?'],
        required_question_words: ['where'],
        required_keywords: ['toy'],
        hints: {
          words: ['where', 'is', 'the', 'toy', 'put'],
          tricky: ['what', 'who']
        }
      },
      {
        id: 'w6_window_where_adv',
        task_type: 'find_question',
        topic: 'window',
        intro: 'Put the ball under the window. Ask me where the ball is.',
        acceptedQuestions: [
          'Where is the ball?',
          'Where is it?',
          'Where is the toy?'
        ],
        answer: 'The ball is under the window.',
        question_hints: ['Where is the ball?', 'Where is it?', 'Where is the toy?'],
        required_question_words: ['where'],
        required_keywords: ['ball'],
        hints: {
          words: ['where', 'is', 'the', 'ball'],
          tricky: ['what', 'who']
        }
      },
      {
        id: 'w6_hide_where_adv',
        task_type: 'find_question',
        topic: 'hide',
        intro: 'I hide the toy in the box. Ask me where the toy is.',
        acceptedQuestions: [
          'Where is the toy?',
          'Where is it?',
          'Where is the ball?'
        ],
        answer: 'The toy is in the box.',
        question_hints: ['Where is the toy?', 'Where is it?', 'Where is the ball?'],
        required_question_words: ['where'],
        required_keywords: ['toy'],
        hints: {
          words: ['where', 'is', 'the', 'toy'],
          tricky: ['what', 'who']
        }
      },
      {
        id: 'w6_mini_hideseek',
        task_type: 'mini_interview',
        topic: 'hideseek',
        intro: 'Interview me: ask where to put the ball, then ask where the toy is.',
        steps: [
          {
            prompt: 'Ask where to put the ball.',
            required_question_words: ['where'],
            required_keywords: ['ball'],
            question_hints: ['Where should I put the ball?', 'Where is the ball?', 'Where is it?']
          },
          {
            prompt: 'Ask where the toy is.',
            acceptedQuestions: [
              'Where is the toy?',
              'Where is it?',
              'Where is the ball?'
            ],
            required_question_words: ['where'],
            required_keywords: ['toy'],
            question_hints: ['Where is the toy?', 'Where is it?', 'Where is the ball?']
          }
        ],
        hints: {
          words: ['where', 'is', 'the', 'ball', 'toy', 'put'],
          tricky: ['what', 'who']
        }
      }
    ],
    required_question_words_easy: ['where', 'is'],
    required_question_words_advanced: ['where', 'is']
  }
};

export default week10GamesAdvanced;
