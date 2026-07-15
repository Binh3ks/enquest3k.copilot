/**
 * Week 5 Game Data - Easy Mode (New GameHub)
 */

export const week5GamesEasy = {
  vocabulary: [
    'bedroom', 'kitchen', 'bathroom', 'living room', 'bed',
    'chair', 'table', 'house', 'mystery', 'explore'
  ],
  show_tell: {
    steps: 3,
    word_list: [
      'bedroom', 'kitchen', 'bathroom', 'living room', 'bed',
      'chair', 'table', 'house', 'mystery', 'explore'
    ],
    instructions_easy: 'Say the word, add a phrase, then make a full sentence.',
    instructions_advanced: 'Say the word, add a phrase, then make a full sentence.',
    step_instructions: {
      1: 'Step 1: say the word clearly.',
      2: 'Step 2: add a short phrase with the word.',
      3: 'Step 3: make a full sentence.'
    },
    frames_easy: ['This is a ___', 'This is the ___'],
    frames_advanced: ['This is a ___', 'This is the ___'],
    details_easy: [],
    details_advanced: [],
    detail_map: {
      bedroom: ['my bedroom', 'a big bedroom', 'the bedroom', 'your bedroom'],
      kitchen: ['my kitchen', 'a big kitchen', 'the kitchen', 'your kitchen'],
      bathroom: ['my bathroom', 'a small bathroom', 'the bathroom', 'your bathroom'],
      'living room': ['my living room', 'a big living room', 'the living room', 'your living room'],
      bed: ['my bed', 'a big bed', 'the bed', 'your bed'],
      chair: ['my chair', 'a small chair', 'the chair', 'your chair'],
      table: ['my table', 'a big table', 'the table', 'your table'],
      house: ['my house', 'a big house', 'the house', 'your house'],
      mystery: ['a mystery', 'the mystery', 'my mystery', 'your mystery'],
      explore: ['explore it', 'explore now', 'explore here', 'explore the house']
    },
    distractors_easy: [],
    distractors_advanced: [],
    distractor_map: {
      bedroom: ['my kitchen', 'a big table', 'the door'],
      kitchen: ['my bed', 'a chair', 'the bathroom']
    },
    frame_map: {
      bedroom: ['This is a ___'],
      kitchen: ['This is a ___']
    },
    sentence_hints_map: {
      bedroom: ['This is a bedroom.', 'This is my bedroom.', 'This is the bedroom.'],
      kitchen: ['This is a kitchen.', 'This is my kitchen.', 'This is the kitchen.'],
      bathroom: ['This is a bathroom.', 'This is my bathroom.', 'This is the bathroom.'],
      'living room': ['This is a living room.', 'This is my living room.', 'This is the living room.'],
      bed: ['This is a bed.', 'This is my bed.', 'This is the bed.'],
      chair: ['This is a chair.', 'This is my chair.', 'This is the chair.'],
      table: ['This is a table.', 'This is my table.', 'This is the table.'],
      house: ['This is a house.', 'This is my house.', 'This is the house.'],
      mystery: ['This is a mystery.', 'I see a mystery.', 'I find a mystery.'],
      explore: ['I explore.', 'I explore the house.', 'I explore the bedroom.']
    },
    emoji_map: {
      bedroom: '🛏️',
      kitchen: '🍳',
      bathroom: '🚿',
      'living room': '🛋️',
      bed: '🛌',
      chair: '💺',
      table: '🪑',
      house: '🏠',
      mystery: '🔍',
      explore: '🗺️'
    },
    definitions: {
      bedroom: 'A room where you sleep.',
      kitchen: 'A room where you cook food.',
      explore: 'To look around and discover.'
    }
  },
  make_sentence: {
    instructions_easy: 'Unscramble the words to make a correct sentence.',
    instructions_advanced: 'Unscramble the words to make a correct sentence.',
    sentences_easy: [
      { scrambled: ['This', 'is', 'a', 'bedroom'], answer: 'This is a bedroom.', base_words: ['this', 'is', 'a', 'bedroom'], time_phrases: ['right now', 'today', 'now', 'at this moment'], location_phrases: ['in the house', 'upstairs', 'here', 'at home'] },
      { scrambled: ['This', 'is', 'a', 'kitchen'], answer: 'This is a kitchen.', base_words: ['this', 'is', 'a', 'kitchen'], time_phrases: ['right now', 'today', 'now', 'at this moment'], location_phrases: ['in the house', 'downstairs', 'here', 'at home'] },
      { scrambled: ['This', 'is', 'a', 'bathroom'], answer: 'This is a bathroom.', base_words: ['this', 'is', 'a', 'bathroom'], time_phrases: ['right now', 'today', 'now', 'at this moment'], location_phrases: ['in the house', 'upstairs', 'here', 'at home'] },
      { scrambled: ['This', 'is', 'a', 'bed'], answer: 'This is a bed.', base_words: ['this', 'is', 'a', 'bed'], time_phrases: ['right now', 'today', 'now', 'always'], location_phrases: ['in the bedroom', 'upstairs', 'here', 'at home'] },
      { scrambled: ['This', 'is', 'a', 'chair'], answer: 'This is a chair.', base_words: ['this', 'is', 'a', 'chair'], time_phrases: ['right now', 'today', 'now', 'at this moment'], location_phrases: ['in the room', 'here', 'at home', 'at school'] },
      { scrambled: ['This', 'is', 'a', 'table'], answer: 'This is a table.', base_words: ['this', 'is', 'a', 'table'], time_phrases: ['right now', 'today', 'now', 'at this moment'], location_phrases: ['in the room', 'here', 'at home', 'in the kitchen'] },
      { scrambled: ['This', 'is', 'a', 'house'], answer: 'This is a house.', base_words: ['this', 'is', 'a', 'house'], time_phrases: ['right now', 'today', 'now', 'always'], location_phrases: ['here', 'on this street', 'in this place', 'nearby'] },
      { scrambled: ['This', 'is', 'my', 'bedroom'], answer: 'This is my bedroom.', base_words: ['this', 'is', 'my', 'bedroom'], time_phrases: ['right now', 'today', 'now', 'always'], location_phrases: ['in the house', 'upstairs', 'here', 'at home'] },
      { scrambled: ['This', 'is', 'my', 'kitchen'], answer: 'This is my kitchen.', base_words: ['this', 'is', 'my', 'kitchen'], time_phrases: ['right now', 'today', 'now', 'always'], location_phrases: ['in the house', 'downstairs', 'here', 'at home'] },
      { scrambled: ['This', 'is', 'my', 'house'], answer: 'This is my house.', base_words: ['this', 'is', 'my', 'house'], time_phrases: ['right now', 'today', 'now', 'always'], location_phrases: ['here', 'on this street', 'in this place', 'nearby'] }
    ],
    sentences_advanced: [
      { scrambled: ['This', 'is', 'a', 'bedroom'], answer: 'This is a bedroom.', base_words: ['this', 'is', 'a', 'bedroom'], time_phrases: ['right now', 'today', 'now', 'at this moment'], location_phrases: ['in the house', 'upstairs', 'here', 'at home'] },
      { scrambled: ['This', 'is', 'a', 'kitchen'], answer: 'This is a kitchen.', base_words: ['this', 'is', 'a', 'kitchen'], time_phrases: ['right now', 'today', 'now', 'at this moment'], location_phrases: ['in the house', 'downstairs', 'here', 'at home'] },
      { scrambled: ['This', 'is', 'a', 'living', 'room'], answer: 'This is a living room.', base_words: ['this', 'is', 'a', 'living', 'room'], time_phrases: ['right now', 'today', 'now', 'at this moment'], location_phrases: ['in the house', 'downstairs', 'here', 'at home'] },
      { scrambled: ['This', 'is', 'my', 'bathroom'], answer: 'This is my bathroom.', base_words: ['this', 'is', 'my', 'bathroom'], time_phrases: ['right now', 'today', 'now', 'always'], location_phrases: ['in the house', 'upstairs', 'here', 'at home'] },
      { scrambled: ['is', 'This', 'a', 'bed'], answer: 'This is a bed.', base_words: ['this', 'is', 'a', 'bed'], time_phrases: ['right now', 'today', 'now', 'always'], location_phrases: ['in the bedroom', 'upstairs', 'here', 'at home'] },
      { scrambled: ['is', 'This', 'a', 'chair'], answer: 'This is a chair.', base_words: ['this', 'is', 'a', 'chair'], time_phrases: ['right now', 'today', 'now', 'at this moment'], location_phrases: ['in the room', 'here', 'at home', 'at school'] },
      { scrambled: ['is', 'This', 'a', 'table'], answer: 'This is a table.', base_words: ['this', 'is', 'a', 'table'], time_phrases: ['right now', 'today', 'now', 'at this moment'], location_phrases: ['in the room', 'here', 'at home', 'in the kitchen'] },
      { scrambled: ['is', 'This', 'a', 'house'], answer: 'This is a house.', base_words: ['this', 'is', 'a', 'house'], time_phrases: ['right now', 'today', 'now', 'always'], location_phrases: ['here', 'on this street', 'in this place', 'nearby'] },
      { scrambled: ['is', 'This', 'my', 'bedroom'], answer: 'This is my bedroom.', base_words: ['this', 'is', 'my', 'bedroom'], time_phrases: ['right now', 'today', 'now', 'always'], location_phrases: ['in the house', 'upstairs', 'here', 'at home'] },
      { scrambled: ['is', 'This', 'my', 'kitchen'], answer: 'This is my kitchen.', base_words: ['this', 'is', 'my', 'kitchen'], time_phrases: ['right now', 'today', 'now', 'always'], location_phrases: ['in the house', 'downstairs', 'here', 'at home'] }
    ]
  },
  ask_me: {
    instructions_easy: 'Ask a question that matches the context.',
    instructions_advanced: 'Ask a question that matches the context.',
    contexts_easy: [
      {
        id: 'w5_bedroom_what',
        task_type: 'find_question',
        topic: 'bedroom',
        intro: 'This is a bedroom. Ask me what it is.',
        acceptedQuestions: [
          'What is this?',
          'What is that?',
          'What is it?'
        ],
        answer: 'This is a bedroom.',
        question_hints: ['What is this?', 'What is that?', 'What is it?'],
        required_question_words: ['what'],
        required_keywords: ['this', 'that', 'it'],
        hints: {
          words: ['what', 'is', 'this'],
          tricky: ['who', 'where']
        }
      },
      {
        id: 'w5_kitchen_isthere',
        task_type: 'find_question',
        topic: 'kitchen',
        intro: 'There is a kitchen in my house. Ask me about it.',
        acceptedQuestions: [
          'Is there a kitchen?',
          'Is there a bathroom?',
          'Is there a bedroom?'
        ],
        answer: 'Yes, there is a kitchen.',
        question_hints: ['Is there a kitchen?', 'Is there a bathroom?', 'Is there a bedroom?'],
        required_question_words: ['is'],
        required_keywords: ['there', 'kitchen'],
        hints: {
          words: ['is', 'there', 'kitchen'],
          tricky: ['what', 'where']
        }
      },
      {
        id: 'w5_bed_what',
        task_type: 'find_question',
        topic: 'bed',
        intro: 'This is a bed. Ask me what this is.',
        acceptedQuestions: [
          'What is this?',
          'What is that?',
          'What is it?'
        ],
        answer: 'This is a bed.',
        question_hints: ['What is this?', 'What is that?', 'What is it?'],
        required_question_words: ['what'],
        required_keywords: ['this', 'that', 'it'],
        hints: {
          words: ['what', 'is', 'this'],
          tricky: ['who', 'where']
        }
      },
      {
        id: 'w5_bathroom_isthere',
        task_type: 'find_question',
        topic: 'bathroom',
        intro: 'There is a bathroom in my house. Ask me if there is one.',
        acceptedQuestions: [
          'Is there a bathroom?',
          'Is there a kitchen?',
          'Is there a bedroom?'
        ],
        answer: 'Yes, there is a bathroom.',
        question_hints: ['Is there a bathroom?', 'Is there a kitchen?', 'Is there a bedroom?'],
        required_question_words: ['is'],
        required_keywords: ['there', 'bathroom'],
        hints: {
          words: ['is', 'there', 'bathroom'],
          tricky: ['what', 'do']
        }
      },
      {
        id: 'w5_chair_what',
        task_type: 'find_question',
        topic: 'chair',
        intro: 'This is a chair. Ask me what it is.',
        acceptedQuestions: [
          'What is this?',
          'What is that?',
          'What is it?'
        ],
        answer: 'This is a chair.',
        question_hints: ['What is this?', 'What is that?', 'What is it?'],
        required_question_words: ['what'],
        required_keywords: ['this', 'that', 'it'],
        hints: {
          words: ['what', 'is', 'this'],
          tricky: ['who', 'where']
        }
      },
      {
        id: 'w5_table_whatroom',
        task_type: 'find_question',
        topic: 'table',
        intro: 'There is a table in the kitchen. Ask me what is in the kitchen.',
        acceptedQuestions: [
          'What is in the kitchen?',
          'What is there?',
          'What do you see?'
        ],
        answer: 'There is a table in the kitchen.',
        question_hints: ['What is in the kitchen?', 'What is there?', 'What do you see?'],
        required_question_words: ['what'],
        required_keywords: ['in', 'kitchen'],
        hints: {
          words: ['what', 'is', 'in', 'kitchen'],
          tricky: ['who', 'where']
        }
      },
      {
        id: 'w5_house_what',
        task_type: 'find_question',
        topic: 'house',
        intro: 'This is my house. Ask me what this is.',
        acceptedQuestions: [
          'What is this?',
          'What is that?',
          'What is it?'
        ],
        answer: 'This is my house.',
        question_hints: ['What is this?', 'What is that?', 'What is it?'],
        required_question_words: ['what'],
        required_keywords: ['this', 'that', 'it'],
        hints: {
          words: ['what', 'is', 'this'],
          tricky: ['who', 'where']
        }
      },
      {
        id: 'w5_livingroom_isthere',
        task_type: 'find_question',
        topic: 'living room',
        intro: 'There is a living room in my house. Ask me if there is one.',
        acceptedQuestions: [
          'Is there a living room?',
          'Is there a bedroom?',
          'Is there a kitchen?'
        ],
        answer: 'Yes, there is a living room.',
        question_hints: ['Is there a living room?', 'Is there a bedroom?', 'Is there a kitchen?'],
        required_question_words: ['is'],
        required_keywords: ['there', 'living'],
        hints: {
          words: ['is', 'there', 'living', 'room'],
          tricky: ['what', 'do']
        }
      },
      {
        id: 'w5_mini_house',
        task_type: 'mini_interview',
        topic: 'house',
        intro: 'Interview me: ask what this is, then ask what is in it.',
        steps: [
          {
            prompt: 'Ask what this is.',
            required_question_words: ['what'],
            required_keywords: ['this'],
            question_hints: ['What is this?', 'What is that?', 'What is it?']
          },
          {
            prompt: 'Ask what is in it.',
            acceptedQuestions: [
              'What is in it?',
              'What is inside?',
              'What is there?'
            ],
            required_question_words: ['what'],
            required_keywords: ['in'],
            question_hints: ['What is in it?', 'What is inside?', 'What is there?']
          }
        ],
        hints: {
          words: ['what', 'is', 'this', 'in'],
          tricky: ['where', 'when']
        }
      }
    ],
    contexts_advanced: [
      {
        id: 'w5_bedroom_what_adv',
        task_type: 'find_question',
        topic: 'bedroom',
        intro: 'This is a bedroom. Ask me what it is.',
        acceptedQuestions: [
          'What is this?',
          'What is that?',
          'What is it?'
        ],
        answer: 'This is a bedroom.',
        question_hints: ['What is this?', 'What is that?', 'What is it?'],
        required_question_words: ['what'],
        required_keywords: ['this', 'that', 'it'],
        hints: {
          words: ['what', 'is', 'this'],
          tricky: ['who', 'where']
        }
      },
      {
        id: 'w5_kitchen_isthere_adv',
        task_type: 'find_question',
        topic: 'kitchen',
        intro: 'There is a kitchen in my house. Ask me about it.',
        acceptedQuestions: [
          'Is there a kitchen?',
          'Is there a bathroom?',
          'Is there a bedroom?'
        ],
        answer: 'Yes, there is a kitchen.',
        question_hints: ['Is there a kitchen?', 'Is there a bathroom?', 'Is there a bedroom?'],
        required_question_words: ['is'],
        required_keywords: ['there', 'kitchen'],
        hints: {
          words: ['is', 'there', 'kitchen'],
          tricky: ['what', 'where']
        }
      },
      {
        id: 'w5_bed_whatin',
        task_type: 'find_question',
        topic: 'bed',
        intro: 'There is a bed in the bedroom. Ask me what is in the bedroom.',
        acceptedQuestions: [
          'What is in the bedroom?',
          'What is there?',
          'What do you see?'
        ],
        answer: 'There is a bed in the bedroom.',
        question_hints: ['What is in the bedroom?', 'What is there?', 'What do you see?'],
        required_question_words: ['what'],
        required_keywords: ['in', 'bedroom'],
        hints: {
          words: ['what', 'is', 'in', 'bedroom'],
          tricky: ['who', 'where']
        }
      },
      {
        id: 'w5_bathroom_isthere_adv',
        task_type: 'find_question',
        topic: 'bathroom',
        intro: 'There is a bathroom in my house. Ask me if there is one.',
        acceptedQuestions: [
          'Is there a bathroom?',
          'Is there a kitchen?',
          'Is there a bedroom?'
        ],
        answer: 'Yes, there is a bathroom.',
        question_hints: ['Is there a bathroom?', 'Is there a kitchen?', 'Is there a bedroom?'],
        required_question_words: ['is'],
        required_keywords: ['there', 'bathroom'],
        hints: {
          words: ['is', 'there', 'bathroom'],
          tricky: ['what', 'do']
        }
      },
      {
        id: 'w5_chair_whatin',
        task_type: 'find_question',
        topic: 'chair',
        intro: 'There is a chair in the living room. Ask me what is in the living room.',
        acceptedQuestions: [
          'What is in the living room?',
          'What is there?',
          'What do you see?'
        ],
        answer: 'There is a chair in the living room.',
        question_hints: ['What is in the living room?', 'What is there?', 'What do you see?'],
        required_question_words: ['what'],
        required_keywords: ['in', 'living'],
        hints: {
          words: ['what', 'is', 'in', 'living', 'room'],
          tricky: ['who', 'where']
        }
      },
      {
        id: 'w5_table_isthere',
        task_type: 'find_question',
        topic: 'table',
        intro: 'There is a table in the kitchen. Ask me if there is one.',
        acceptedQuestions: [
          'Is there a table?',
          'Is there a chair?',
          'Is there a bed?'
        ],
        answer: 'Yes, there is a table in the kitchen.',
        question_hints: ['Is there a table?', 'Is there a chair?', 'Is there a bed?'],
        required_question_words: ['is'],
        required_keywords: ['there', 'table'],
        hints: {
          words: ['is', 'there', 'table'],
          tricky: ['what', 'where']
        }
      },
      {
        id: 'w5_house_what_adv',
        task_type: 'find_question',
        topic: 'house',
        intro: 'This is my house. Ask me what this is.',
        acceptedQuestions: [
          'What is this?',
          'What is that?',
          'What is it?'
        ],
        answer: 'This is my house.',
        question_hints: ['What is this?', 'What is that?', 'What is it?'],
        required_question_words: ['what'],
        required_keywords: ['this', 'that', 'it'],
        hints: {
          words: ['what', 'is', 'this'],
          tricky: ['who', 'where']
        }
      },
      {
        id: 'w5_livingroom_whatin',
        task_type: 'find_question',
        topic: 'living room',
        intro: 'There is a living room in my house. Ask me what is in it.',
        acceptedQuestions: [
          'What is in the house?',
          'What is there?',
          'What rooms are there?'
        ],
        answer: 'There is a living room in my house.',
        question_hints: ['What is in the house?', 'What is there?', 'What rooms are there?'],
        required_question_words: ['what'],
        required_keywords: ['in'],
        hints: {
          words: ['what', 'is', 'in'],
          tricky: ['who', 'where']
        }
      },
      {
        id: 'w5_mini_rooms',
        task_type: 'mini_interview',
        topic: 'rooms',
        intro: 'Interview me: ask if there is a bedroom, then ask what is in it.',
        steps: [
          {
            prompt: 'Ask if there is a bedroom.',
            required_question_words: ['is'],
            required_keywords: ['there', 'bedroom'],
            question_hints: ['Is there a bedroom?', 'Is there a kitchen?', 'Is there a bathroom?']
          },
          {
            prompt: 'Ask what is in it.',
            acceptedQuestions: [
              'What is in it?',
              'What is inside?',
              'What is there?'
            ],
            required_question_words: ['what'],
            required_keywords: ['in'],
            question_hints: ['What is in it?', 'What is inside?', 'What is there?']
          }
        ],
        hints: {
          words: ['is', 'there', 'what', 'in'],
          tricky: ['where', 'when']
        }
      }
    ],
    required_question_words_easy: ['what', 'is'],
    required_question_words_advanced: ['what', 'is']
  }
};

export default week5GamesEasy;
