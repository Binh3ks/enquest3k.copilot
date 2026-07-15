/**
 * Week 9 Game Data - Easy Mode (New GameHub)
 */

export const week9GamesEasy = {
  vocabulary: [
    'city', 'street', 'noisy', 'busy', 'tall',
    'modern', 'car', 'bus', 'building', 'traffic'
  ],
  show_tell: {
    steps: 3,
    word_list: [
      'city', 'street', 'noisy', 'busy', 'tall',
      'modern', 'car', 'bus', 'building', 'traffic'
    ],
    instructions_easy: 'Say the word, add a phrase, then make a full sentence.',
    instructions_advanced: 'Say the word, add a phrase, then make a full sentence.',
    step_instructions: {
      1: 'Step 1: say the word clearly.',
      2: 'Step 2: add a short phrase with the word.',
      3: 'Step 3: make a full sentence.'
    },
    frames_easy: ['Put the ___ in the ___', 'Put the ___ on the ___'],
    frames_advanced: ['Put the ___ on the ___', 'Put the ___ under the ___'],
    details_easy: [],
    details_advanced: [],
    detail_map: {
      city: ['big city', 'the city', 'my city', 'I live in the city'],
      street: ['busy street', 'the street', 'a street', 'I walk on the street'],
      noisy: ['very noisy', 'so noisy', 'the city is noisy', 'it is noisy'],
      busy: ['very busy', 'so busy', 'the street is busy', 'it is busy'],
      tall: ['very tall', 'so tall', 'the building is tall', 'it is tall'],
      modern: ['very modern', 'so modern', 'the city is modern', 'it is modern'],
      car: ['red car', 'the car', 'a car', 'I see a car'],
      bus: ['big bus', 'the bus', 'a bus', 'I take the bus'],
      building: ['tall building', 'the building', 'a building', 'I see a building'],
      traffic: ['heavy traffic', 'the traffic', 'bad traffic', 'I see traffic']
    },
    distractors_easy: [],
    distractors_advanced: [],
    distractor_map: {
      city: ['quiet', 'peaceful', 'farm'],
      street: ['field', 'countryside', 'farm']
    },
    frame_map: {
      city: ['The ___ is ___'],
      car: ['I see ___ on the ___']
    },
    sentence_hints_map: {
      city: ['The city is noisy.', 'The city is busy.', 'I live in the city.'],
      street: ['The street is busy.', 'I walk on the street.', 'I see cars on the street.'],
      noisy: ['The city is noisy.', 'It is noisy.', 'The street is noisy.'],
      busy: ['The street is busy.', 'The city is busy.', 'It is busy.'],
      tall: ['The building is tall.', 'It is tall.', 'The building is very tall.'],
      modern: ['The city is modern.', 'It is modern.', 'The building is modern.'],
      car: ['I see a car.', 'The car is on the street.', 'I see cars.'],
      bus: ['I take the bus.', 'I see a bus.', 'The bus is on the street.'],
      building: ['The building is tall.', 'I see a building.', 'The building is modern.'],
      traffic: ['The traffic is heavy.', 'The traffic is busy.', 'I see traffic.']
    },
    emoji_map: {
      city: '🏙️',
      street: '🛣️',
      noisy: '🔊',
      busy: '🚦',
      tall: '📏',
      modern: '✨',
      car: '🚗',
      bus: '🚌',
      building: '🏢',
      traffic: '🚥'
    },
    definitions: {
      city: 'A large town with many people.',
      street: 'A road in a city or town.',
      noisy: 'With a lot of loud sounds.',
      traffic: 'Cars, buses moving on roads.'
    }
  },
  make_sentence: {
    instructions_easy: 'Unscramble the words to make a correct sentence.',
    instructions_advanced: 'Unscramble the words to make a correct sentence.',
    sentences_easy: [
      { scrambled: ['Put', 'the', 'ball', 'on', 'the', 'floor'], answer: 'Put the ball on the floor.' },
      { scrambled: ['Put', 'the', 'toy', 'in', 'the', 'box'], answer: 'Put the toy in the box.' },
      { scrambled: ['Put', 'the', 'box', 'on', 'the', 'desk'], answer: 'Put the box on the desk.' },
      { scrambled: ['Put', 'the', 'ball', 'under', 'the', 'desk'], answer: 'Put the ball under the desk.' },
      { scrambled: ['Put', 'the', 'toy', 'on', 'the', 'desk'], answer: 'Put the toy on the desk.' },
      { scrambled: ['Put', 'the', 'ball', 'in', 'the', 'box'], answer: 'Put the ball in the box.' },
      { scrambled: ['Put', 'the', 'toy', 'under', 'the', 'chair'], answer: 'Put the toy under the chair.' },
      { scrambled: ['Put', 'the', 'box', 'on', 'the', 'floor'], answer: 'Put the box on the floor.' },
      { scrambled: ['Put', 'the', 'ball', 'on', 'the', 'desk'], answer: 'Put the ball on the desk.' },
      { scrambled: ['Put', 'the', 'toy', 'on', 'the', 'floor'], answer: 'Put the toy on the floor.' }
    ],
    sentences_advanced: [
      { scrambled: ['Put', 'the', 'ball', 'on', 'the', 'floor'], answer: 'Put the ball on the floor.', base_words: ['put', 'the', 'ball', 'on', 'the', 'floor'], time_phrases: ['right now', 'in a moment', 'after playing', 'before leaving', 'this time'], location_phrases: ['in the room', 'near the door', 'by the wall', 'in the corner', 'over there'] },
      { scrambled: ['Put', 'the', 'toy', 'in', 'the', 'box'], answer: 'Put the toy in the box.', base_words: ['put', 'the', 'toy', 'in', 'the', 'box'], time_phrases: ['right now', 'after playing', 'before bedtime', 'in a minute', 'this evening'], location_phrases: ['in the bedroom', 'on the shelf', 'in the closet', 'near the bed', 'over here'] },
      { scrambled: ['Put', 'the', 'box', 'under', 'the', 'desk'], answer: 'Put the box under the desk.', base_words: ['put', 'the', 'box', 'under', 'the', 'desk'], time_phrases: ['right now', 'after class', 'before leaving', 'in a moment', 'this afternoon'], location_phrases: ['in the classroom', 'in the office', 'in the study', 'near the chair', 'by the window'] },
      { scrambled: ['ball', 'Put', 'the', 'in', 'the', 'box'], answer: 'Put the ball in the box.', base_words: ['put', 'the', 'ball', 'in', 'the', 'box'], time_phrases: ['right now', 'after playing', 'before going home', 'in a minute', 'this time'], location_phrases: ['in the room', 'on the shelf', 'in the storage', 'near the toys', 'over there'] },
      { scrambled: ['toy', 'Put', 'the', 'on', 'the', 'desk'], answer: 'Put the toy on the desk.', base_words: ['put', 'the', 'toy', 'on', 'the', 'desk'], time_phrases: ['right now', 'after playing', 'before class', 'in a moment', 'this morning'], location_phrases: ['in the classroom', 'in the bedroom', 'in the study', 'near the window', 'by the chair'] },
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

export default week9GamesEasy;
