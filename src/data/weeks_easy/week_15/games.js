/**
 * Week 6 Game Data - Easy Mode (New GameHub)
 */

export const week6GamesEasy = {
  vocabulary: [
    'box', 'desk', 'floor', 'wall', 'window',
    'door', 'hide', 'seek', 'ball', 'toy'
  ],
  show_tell: {
    steps: 3,
    word_list: [
      'box', 'desk', 'floor', 'wall', 'window',
      'door', 'hide', 'seek', 'ball', 'toy'
    ],
    instructions_easy: 'Say the word, add a phrase, then make a full sentence.',
    instructions_advanced: 'Say the word, add a phrase, then make a full sentence.',
    step_instructions: {
      1: 'Step 1: say the word clearly.',
      2: 'Step 2: add a short phrase with the word.',
      3: 'Step 3: make a full sentence.'
    },
    frames_easy: ['The ___ is in the ___', 'The ___ is on the ___'],
    frames_advanced: ['The ___ is in the ___', 'The ___ is on the ___'],
    details_easy: [],
    details_advanced: [],
    detail_map: {
      box: ['my box', 'a big box', 'the box', 'your box'],
      desk: ['my desk', 'a big desk', 'the desk', 'your desk'],
      floor: ['my floor', 'the floor', 'clean floor', 'your floor'],
      wall: ['my wall', 'the wall', 'big wall', 'your wall'],
      window: ['my window', 'a big window', 'the window', 'your window'],
      door: ['my door', 'a red door', 'the door', 'your door'],
      hide: ['hide now', 'hide here', 'hide the toy', 'hide the ball'],
      seek: ['seek now', 'seek here', 'seek the toy', 'seek the ball'],
      ball: ['my ball', 'a red ball', 'the ball', 'your ball'],
      toy: ['my toy', 'a small toy', 'the toy', 'your toy']
    },
    distractors_easy: [],
    distractors_advanced: [],
    distractor_map: {
      box: ['my ball', 'the window', 'the door'],
      desk: ['my toy', 'the floor', 'the door']
    },
    frame_map: {
      box: ['The ___ is in the ___'],
      ball: ['The ___ is on the ___']
    },
    sentence_hints_map: {
      box: ['The box is on the desk.', 'The box is in the room.', 'The box is under the desk.'],
      desk: ['The desk is in the room.', 'The toy is on the desk.', 'The ball is under the desk.'],
      floor: ['The ball is on the floor.', 'The toy is on the floor.', 'The box is on the floor.'],
      wall: ['The picture is on the wall.', 'The window is on the wall.', 'The door is on the wall.'],
      window: ['The window is on the wall.', 'The ball is under the window.', 'The toy is under the window.'],
      door: ['The door is on the wall.', 'The toy is under the door.', 'The ball is under the door.'],
      hide: ['I hide the toy.', 'I hide the ball.', 'I hide in the box.'],
      seek: ['I seek the toy.', 'I seek the ball.', 'I seek under the desk.'],
      ball: ['The ball is on the floor.', 'The ball is in the box.', 'The ball is under the desk.'],
      toy: ['The toy is on the desk.', 'The toy is in the box.', 'The toy is under the chair.']
    },
    emoji_map: {
      box: '📦',
      desk: '🪑',
      floor: '⬛',
      wall: '🧱',
      window: '🪟',
      door: '🚪',
      hide: '🙈',
      seek: '🔍',
      ball: '⚽',
      toy: '🧸'
    },
    definitions: {
      hide: 'To put something where no one can see it.',
      seek: 'To look for something.',
      floor: 'The ground inside a room.'
    }
  },
  make_sentence: {
    instructions_easy: 'Unscramble the words to make a correct sentence.',
    instructions_advanced: 'Unscramble the words to make a correct sentence.',
    sentences_easy: [
      { scrambled: ['The', 'ball', 'is', 'on', 'the', 'floor'], answer: 'The ball is on the floor.', base_words: ['the', 'ball', 'is', 'on', 'the', 'floor'], time_phrases: ['right now', 'today', 'now', 'at this moment'], location_phrases: ['in the room', 'at home', 'here', 'in the bedroom'] },
      { scrambled: ['The', 'toy', 'is', 'in', 'the', 'box'], answer: 'The toy is in the box.', base_words: ['the', 'toy', 'is', 'in', 'the', 'box'], time_phrases: ['right now', 'today', 'now', 'at this moment'], location_phrases: ['in the room', 'at home', 'here', 'on the desk'] },
      { scrambled: ['The', 'box', 'is', 'on', 'the', 'desk'], answer: 'The box is on the desk.', base_words: ['the', 'box', 'is', 'on', 'the', 'desk'], time_phrases: ['right now', 'today', 'now', 'at this moment'], location_phrases: ['in the room', 'at home', 'here', 'in the bedroom'] },
      { scrambled: ['The', 'ball', 'is', 'under', 'the', 'desk'], answer: 'The ball is under the desk.', base_words: ['the', 'ball', 'is', 'under', 'the', 'desk'], time_phrases: ['right now', 'today', 'now', 'at this moment'], location_phrases: ['in the room', 'at home', 'here', 'at school'] },
      { scrambled: ['The', 'toy', 'is', 'on', 'the', 'desk'], answer: 'The toy is on the desk.', base_words: ['the', 'toy', 'is', 'on', 'the', 'desk'], time_phrases: ['right now', 'today', 'now', 'at this moment'], location_phrases: ['in the room', 'at home', 'here', 'at school'] },
      { scrambled: ['The', 'ball', 'is', 'in', 'the', 'box'], answer: 'The ball is in the box.', base_words: ['the', 'ball', 'is', 'in', 'the', 'box'], time_phrases: ['right now', 'today', 'now', 'at this moment'], location_phrases: ['in the room', 'at home', 'here', 'on the floor'] },
      { scrambled: ['The', 'toy', 'is', 'under', 'the', 'chair'], answer: 'The toy is under the chair.', base_words: ['the', 'toy', 'is', 'under', 'the', 'chair'], time_phrases: ['right now', 'today', 'now', 'at this moment'], location_phrases: ['in the room', 'at home', 'here', 'in the kitchen'] },
      { scrambled: ['The', 'box', 'is', 'on', 'the', 'floor'], answer: 'The box is on the floor.', base_words: ['the', 'box', 'is', 'on', 'the', 'floor'], time_phrases: ['right now', 'today', 'now', 'at this moment'], location_phrases: ['in the room', 'at home', 'here', 'in the bedroom'] },
      { scrambled: ['The', 'door', 'is', 'on', 'the', 'wall'], answer: 'The door is on the wall.', base_words: ['the', 'door', 'is', 'on', 'the', 'wall'], time_phrases: ['right now', 'today', 'now', 'always'], location_phrases: ['in the room', 'at home', 'here', 'in the house'] },
      { scrambled: ['The', 'window', 'is', 'on', 'the', 'wall'], answer: 'The window is on the wall.', base_words: ['the', 'window', 'is', 'on', 'the', 'wall'], time_phrases: ['right now', 'today', 'now', 'always'], location_phrases: ['in the room', 'at home', 'here', 'in the house'] }
    ],
    sentences_advanced: [
      { scrambled: ['The', 'ball', 'is', 'on', 'the', 'floor'], answer: 'The ball is on the floor.', base_words: ['the', 'ball', 'is', 'on', 'the', 'floor'], time_phrases: ['right now', 'today', 'now', 'at this moment'], location_phrases: ['in the room', 'at home', 'here', 'in the bedroom'] },
      { scrambled: ['The', 'toy', 'is', 'in', 'the', 'box'], answer: 'The toy is in the box.', base_words: ['the', 'toy', 'is', 'in', 'the', 'box'], time_phrases: ['right now', 'today', 'now', 'at this moment'], location_phrases: ['in the room', 'at home', 'here', 'on the desk'] },
      { scrambled: ['The', 'box', 'is', 'under', 'the', 'desk'], answer: 'The box is under the desk.', base_words: ['the', 'box', 'is', 'under', 'the', 'desk'], time_phrases: ['right now', 'today', 'now', 'at this moment'], location_phrases: ['in the room', 'at home', 'here', 'at school'] },
      { scrambled: ['ball', 'The', 'is', 'in', 'the', 'box'], answer: 'The ball is in the box.', base_words: ['the', 'ball', 'is', 'in', 'the', 'box'], time_phrases: ['right now', 'today', 'now', 'at this moment'], location_phrases: ['in the room', 'at home', 'here', 'on the floor'] },
      { scrambled: ['toy', 'The', 'is', 'on', 'the', 'desk'], answer: 'The toy is on the desk.', base_words: ['the', 'toy', 'is', 'on', 'the', 'desk'], time_phrases: ['right now', 'today', 'now', 'at this moment'], location_phrases: ['in the room', 'at home', 'here', 'at school'] },
      { scrambled: ['is', 'The', 'ball', 'under', 'the', 'chair'], answer: 'The ball is under the chair.', base_words: ['the', 'ball', 'is', 'under', 'the', 'chair'], time_phrases: ['right now', 'today', 'now', 'at this moment'], location_phrases: ['in the room', 'at home', 'here', 'in the kitchen'] },
      { scrambled: ['is', 'The', 'toy', 'on', 'the', 'floor'], answer: 'The toy is on the floor.', base_words: ['the', 'toy', 'is', 'on', 'the', 'floor'], time_phrases: ['right now', 'today', 'now', 'at this moment'], location_phrases: ['in the room', 'at home', 'here', 'in the bedroom'] },
      { scrambled: ['box', 'The', 'is', 'on', 'the', 'desk'], answer: 'The box is on the desk.', base_words: ['the', 'box', 'is', 'on', 'the', 'desk'], time_phrases: ['right now', 'today', 'now', 'at this moment'], location_phrases: ['in the room', 'at home', 'here', 'in the bedroom'] },
      { scrambled: ['window', 'The', 'is', 'on', 'the', 'wall'], answer: 'The window is on the wall.', base_words: ['the', 'window', 'is', 'on', 'the', 'wall'], time_phrases: ['right now', 'today', 'now', 'always'], location_phrases: ['in the room', 'at home', 'here', 'in the house'] },
      { scrambled: ['door', 'The', 'is', 'on', 'the', 'wall'], answer: 'The door is on the wall.', base_words: ['the', 'door', 'is', 'on', 'the', 'wall'], time_phrases: ['right now', 'today', 'now', 'always'], location_phrases: ['in the room', 'at home', 'here', 'in the house'] }
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
        intro: 'The ball is on the floor. Ask me where the ball is.',
        acceptedQuestions: [
          'Where is the ball?',
          'Where is the toy?',
          'Where is it?'
        ],
        answer: 'The ball is on the floor.',
        question_hints: ['Where is the ball?', 'Where is the toy?', 'Where is it?'],
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
        intro: 'The toy is in the box. Ask me where the toy is.',
        acceptedQuestions: [
          'Where is the toy?',
          'Where is the ball?',
          'Where is it?'
        ],
        answer: 'The toy is in the box.',
        question_hints: ['Where is the toy?', 'Where is the ball?', 'Where is it?'],
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
        intro: 'The box is on the desk. Ask me where the box is.',
        acceptedQuestions: [
          'Where is the box?',
          'Where is it?',
          'Where is the toy?'
        ],
        answer: 'The box is on the desk.',
        question_hints: ['Where is the box?', 'Where is it?', 'Where is the toy?'],
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
        intro: 'The toy is on the desk. Ask me where the toy is.',
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
        intro: 'The ball is on the floor. Ask me where it is.',
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
        intro: 'The toy is under the door. Ask me where the toy is.',
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
        intro: 'The ball is under the window. Ask me where the ball is.',
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
        id: 'w6_mini_location',
        task_type: 'mini_interview',
        topic: 'location',
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
        intro: 'The ball is on the floor. Ask me where the ball is.',
        acceptedQuestions: [
          'Where is the ball?',
          'Where is the toy?',
          'Where is it?'
        ],
        answer: 'The ball is on the floor.',
        question_hints: ['Where is the ball?', 'Where is the toy?', 'Where is it?'],
        required_question_words: ['where'],
        required_keywords: ['ball'],
        hints: {
          words: ['where', 'is', 'the', 'ball'],
          tricky: ['what', 'who']
        }
      },
      {
        id: 'w6_toy_where_adv',
        task_type: 'find_question',
        topic: 'toy',
        intro: 'The toy is in the box. Ask me where the toy is.',
        acceptedQuestions: [
          'Where is the toy?',
          'Where is the ball?',
          'Where is it?'
        ],
        answer: 'The toy is in the box.',
        question_hints: ['Where is the toy?', 'Where is the ball?', 'Where is it?'],
        required_question_words: ['where'],
        required_keywords: ['toy'],
        hints: {
          words: ['where', 'is', 'the', 'toy'],
          tricky: ['what', 'who']
        }
      },
      {
        id: 'w6_box_where_adv',
        task_type: 'find_question',
        topic: 'box',
        intro: 'The box is on the desk. Ask me where the box is.',
        acceptedQuestions: [
          'Where is the box?',
          'Where is it?',
          'Where is the toy?'
        ],
        answer: 'The box is on the desk.',
        question_hints: ['Where is the box?', 'Where is it?', 'Where is the toy?'],
        required_question_words: ['where'],
        required_keywords: ['box'],
        hints: {
          words: ['where', 'is', 'the', 'box'],
          tricky: ['what', 'who']
        }
      },
      {
        id: 'w6_desk_where_adv',
        task_type: 'find_question',
        topic: 'desk',
        intro: 'The toy is on the desk. Ask me where the toy is.',
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
        intro: 'The ball is on the floor. Ask me where it is.',
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
        intro: 'The toy is under the door. Ask me where the toy is.',
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
        id: 'w6_window_where_adv',
        task_type: 'find_question',
        topic: 'window',
        intro: 'The ball is under the window. Ask me where the ball is.',
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
        id: 'w6_mini_seek',
        task_type: 'mini_interview',
        topic: 'seek',
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
    required_question_words_easy: ['where', 'is'],
    required_question_words_advanced: ['where', 'is']
  }
};

export default week6GamesEasy;
