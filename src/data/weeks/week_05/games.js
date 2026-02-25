/**
 * Week 5 Game Data - Advanced Mode (New GameHub)
 */

export const week5GamesAdvanced = {
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
    frames_easy: ['There is a ___', 'There is an ___'],
    frames_advanced: ['There is a ___ in the ___', 'There is an ___ in the ___'],
    details_easy: [],
    details_advanced: [],
    detail_map: {
      bedroom: ['my bedroom', 'a big bedroom', 'the bedroom', 'your bedroom'],
      kitchen: ['my kitchen', 'a big kitchen', 'the kitchen', 'your kitchen'],
      bathroom: ['my bathroom', 'a small bathroom', 'the bathroom', 'your bathroom'],
      'living room': ['my living room', 'a big living room', 'the living room', 'your living room'],
      bed: ['my bed', 'a big bed', 'the bed', 'a bed in the bedroom'],
      chair: ['my chair', 'a small chair', 'the chair', 'a chair in the kitchen'],
      table: ['my table', 'a big table', 'the table', 'a table in the kitchen'],
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
      bedroom: ['There is a ___ in the ___'],
      kitchen: ['There is a ___ in the ___']
    },
    sentence_hints_map: {
      bedroom: ['There is a bedroom in the house.', 'There is a big bedroom.', 'There is a bedroom.'],
      kitchen: ['There is a kitchen in the house.', 'There is a big kitchen.', 'There is a kitchen.'],
      bathroom: ['There is a bathroom in the house.', 'There is a small bathroom.', 'There is a bathroom.'],
      'living room': ['There is a living room in the house.', 'There is a big living room.', 'There is a living room.'],
      bed: ['There is a bed in the bedroom.', 'There is a big bed.', 'There is a bed.'],
      chair: ['There is a chair in the kitchen.', 'There is a small chair.', 'There is a chair.'],
      table: ['There is a table in the kitchen.', 'There is a big table.', 'There is a table.'],
      house: ['There is a house.', 'There is a big house.', 'This is a house.'],
      mystery: ['There is a mystery.', 'I see a mystery.', 'I find a mystery.'],
      explore: ['I explore the house.', 'I explore the bedroom.', 'I explore the kitchen.']
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
      bathroom: 'A room with a toilet and sink.',
      explore: 'To look around and discover.'
    }
  },
  make_sentence: {
    instructions_easy: 'Unscramble the words to make a correct sentence.',
    instructions_advanced: 'Unscramble the words to make a correct sentence.',
    sentences_easy: [
      { scrambled: ['There', 'is', 'a', 'bedroom'], answer: 'There is a bedroom.' },
      { scrambled: ['There', 'is', 'a', 'kitchen'], answer: 'There is a kitchen.' },
      { scrambled: ['There', 'is', 'a', 'bathroom'], answer: 'There is a bathroom.' },
      { scrambled: ['There', 'is', 'a', 'bed'], answer: 'There is a bed.' },
      { scrambled: ['There', 'is', 'a', 'chair'], answer: 'There is a chair.' },
      { scrambled: ['There', 'is', 'a', 'table'], answer: 'There is a table.' },
      { scrambled: ['There', 'is', 'a', 'house'], answer: 'There is a house.' },
      { scrambled: ['There', 'is', 'a', 'living', 'room'], answer: 'There is a living room.' },
      { scrambled: ['is', 'There', 'a', 'bedroom'], answer: 'There is a bedroom.' },
      { scrambled: ['is', 'There', 'a', 'kitchen'], answer: 'There is a kitchen.' }
    ],
    sentences_advanced: [
      { scrambled: ['There', 'is', 'a', 'bedroom', 'in', 'the', 'house'], answer: 'There is a bedroom in the house.', base_words: ['there', 'is', 'a', 'bedroom', 'in', 'the', 'house'], time_phrases: ['right now', 'every day', 'this year', 'in the morning', 'on weekends'], location_phrases: ['upstairs', 'on the second floor', 'down the hall', 'next to the bathroom', 'near the stairs'] },
      { scrambled: ['There', 'is', 'a', 'kitchen', 'in', 'the', 'house'], answer: 'There is a kitchen in the house.', base_words: ['there', 'is', 'a', 'kitchen', 'in', 'the', 'house'], time_phrases: ['right now', 'every day', 'this week', 'in the morning', 'on weekdays'], location_phrases: ['downstairs', 'on the first floor', 'next to the living room', 'near the dining room', 'at the back'] },
      { scrambled: ['There', 'is', 'a', 'bed', 'in', 'the', 'bedroom'], answer: 'There is a bed in the bedroom.', base_words: ['there', 'is', 'a', 'bed', 'in', 'the', 'bedroom'], time_phrases: ['right now', 'every night', 'this week', 'in the evening', 'at bedtime'], location_phrases: ['upstairs', 'near the window', 'against the wall', 'in the corner', 'on the second floor'] },
      { scrambled: ['There', 'is', 'a', 'chair', 'in', 'the', 'kitchen'], answer: 'There is a chair in the kitchen.', base_words: ['there', 'is', 'a', 'chair', 'in', 'the', 'kitchen'], time_phrases: ['right now', 'every day', 'this morning', 'at mealtime', 'during breakfast'], location_phrases: ['downstairs', 'near the table', 'by the window', 'at the counter', 'on the first floor'] },
      { scrambled: ['There', 'is', 'a', 'table', 'in', 'the', 'kitchen'], answer: 'There is a table in the kitchen.', base_words: ['there', 'is', 'a', 'table', 'in', 'the', 'kitchen'], time_phrases: ['right now', 'every day', 'this week', 'at dinnertime', 'during meals'], location_phrases: ['downstairs', 'in the center', 'near the chairs', 'by the window', 'on the first floor'] },
      { scrambled: ['There', 'is', 'a', 'bathroom', 'in', 'the', 'house'], answer: 'There is a bathroom in the house.', base_words: ['there', 'is', 'a', 'bathroom', 'in', 'the', 'house'], time_phrases: ['right now', 'every day', 'this week', 'in the morning', 'at night'], location_phrases: ['upstairs', 'on the second floor', 'down the hall', 'next to the bedroom', 'near the stairs'] },
      { scrambled: ['is', 'There', 'a', 'living', 'room', 'in', 'the', 'house'], answer: 'There is a living room in the house.', base_words: ['there', 'is', 'a', 'living', 'room', 'in', 'the', 'house'], time_phrases: ['right now', 'every day', 'this evening', 'on weekends', 'in the afternoon'], location_phrases: ['downstairs', 'on the first floor', 'near the kitchen', 'at the front', 'by the entrance'] },
      { scrambled: ['is', 'There', 'a', 'bed', 'in', 'the', 'bedroom'], answer: 'There is a bed in the bedroom.', base_words: ['there', 'is', 'a', 'bed', 'in', 'the', 'bedroom'], time_phrases: ['right now', 'every night', 'this month', 'at bedtime', 'in the evening'], location_phrases: ['upstairs', 'near the window', 'against the wall', 'in the middle', 'on the second floor'] },
      { scrambled: ['is', 'There', 'a', 'chair', 'in', 'the', 'kitchen'], answer: 'There is a chair in the kitchen.', base_words: ['there', 'is', 'a', 'chair', 'in', 'the', 'kitchen'], time_phrases: ['right now', 'every meal', 'this week', 'at breakfast', 'during dinner'], location_phrases: ['downstairs', 'near the table', 'by the counter', 'at the island', 'on the first floor'] },
      { scrambled: ['is', 'There', 'a', 'table', 'in', 'the', 'kitchen'], answer: 'There is a table in the kitchen.', base_words: ['there', 'is', 'a', 'table', 'in', 'the', 'kitchen'], time_phrases: ['right now', 'every day', 'this year', 'at lunchtime', 'during meals'], location_phrases: ['downstairs', 'in the center', 'near the window', 'by the door', 'on the first floor'] }
    ]
  },
  ask_me: {
    instructions_easy: 'Ask a question that matches the context.',
    instructions_advanced: 'Ask a question that matches the context.',
    contexts_easy: [
      {
        id: 'w5_bedroom_isthere',
        task_type: 'find_question',
        topic: 'bedroom',
        intro: 'There is a bedroom in the house. Ask me if there is one.',
        acceptedQuestions: [
          'Is there a bedroom?',
          'Is there a kitchen?',
          'Is there a bathroom?'
        ],
        answer: 'Yes, there is a bedroom.',
        question_hints: ['Is there a bedroom?', 'Is there a kitchen?', 'Is there a bathroom?'],
        required_question_words: ['is'],
        required_keywords: ['there', 'bedroom'],
        hints: {
          words: ['is', 'there', 'bedroom'],
          tricky: ['what', 'where']
        }
      },
      {
        id: 'w5_kitchen_whatin',
        task_type: 'find_question',
        topic: 'kitchen',
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
        id: 'w5_bed_isthere',
        task_type: 'find_question',
        topic: 'bed',
        intro: 'There is a bed in the bedroom. Ask me if there is a bed.',
        acceptedQuestions: [
          'Is there a bed?',
          'Is there a chair?',
          'Is there a table?'
        ],
        answer: 'Yes, there is a bed.',
        question_hints: ['Is there a bed?', 'Is there a chair?', 'Is there a table?'],
        required_question_words: ['is'],
        required_keywords: ['there', 'bed'],
        hints: {
          words: ['is', 'there', 'bed'],
          tricky: ['what', 'do']
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
        answer: 'Yes, there is a table.',
        question_hints: ['Is there a table?', 'Is there a chair?', 'Is there a bed?'],
        required_question_words: ['is'],
        required_keywords: ['there', 'table'],
        hints: {
          words: ['is', 'there', 'table'],
          tricky: ['what', 'where']
        }
      },
      {
        id: 'w5_house_whatin',
        task_type: 'find_question',
        topic: 'house',
        intro: 'There is a bedroom in my house. Ask me what is in it.',
        acceptedQuestions: [
          'What is in the house?',
          'What is there?',
          'What rooms are there?'
        ],
        answer: 'There is a bedroom in my house.',
        question_hints: ['What is in the house?', 'What is there?', 'What rooms are there?'],
        required_question_words: ['what'],
        required_keywords: ['in', 'house'],
        hints: {
          words: ['what', 'is', 'in', 'house'],
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
        id: 'w5_mini_house_rooms',
        task_type: 'mini_interview',
        topic: 'house',
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
    contexts_advanced: [
      {
        id: 'w5_bedroom_isthere_adv',
        task_type: 'find_question',
        topic: 'bedroom',
        intro: 'There is a bedroom in the house. Ask me if there is one.',
        acceptedQuestions: [
          'Is there a bedroom?',
          'Is there a kitchen?',
          'Is there a bathroom?'
        ],
        answer: 'Yes, there is a bedroom in the house.',
        question_hints: ['Is there a bedroom?', 'Is there a kitchen?', 'Is there a bathroom?'],
        required_question_words: ['is'],
        required_keywords: ['there', 'bedroom'],
        hints: {
          words: ['is', 'there', 'bedroom'],
          tricky: ['what', 'where']
        }
      },
      {
        id: 'w5_kitchen_whatin_adv',
        task_type: 'find_question',
        topic: 'kitchen',
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
        id: 'w5_bed_isthere_adv',
        task_type: 'find_question',
        topic: 'bed',
        intro: 'There is a bed in the bedroom. Ask me if there is a bed.',
        acceptedQuestions: [
          'Is there a bed?',
          'Is there a chair?',
          'Is there a table?'
        ],
        answer: 'Yes, there is a bed in the bedroom.',
        question_hints: ['Is there a bed?', 'Is there a chair?', 'Is there a table?'],
        required_question_words: ['is'],
        required_keywords: ['there', 'bed'],
        hints: {
          words: ['is', 'there', 'bed'],
          tricky: ['what', 'do']
        }
      },
      {
        id: 'w5_bathroom_whatin_adv',
        task_type: 'find_question',
        topic: 'bathroom',
        intro: 'There is a bathroom in the house. Ask me what is in the house.',
        acceptedQuestions: [
          'What is in the house?',
          'What is there?',
          'What rooms are there?'
        ],
        answer: 'There is a bathroom in the house.',
        question_hints: ['What is in the house?', 'What is there?', 'What rooms are there?'],
        required_question_words: ['what'],
        required_keywords: ['in', 'house'],
        hints: {
          words: ['what', 'is', 'in', 'house'],
          tricky: ['who', 'where']
        }
      },
      {
        id: 'w5_chair_isthere_adv',
        task_type: 'find_question',
        topic: 'chair',
        intro: 'There is a chair in the living room. Ask me if there is one.',
        acceptedQuestions: [
          'Is there a chair?',
          'Is there a table?',
          'Is there a bed?'
        ],
        answer: 'Yes, there is a chair in the living room.',
        question_hints: ['Is there a chair?', 'Is there a table?', 'Is there a bed?'],
        required_question_words: ['is'],
        required_keywords: ['there', 'chair'],
        hints: {
          words: ['is', 'there', 'chair'],
          tricky: ['what', 'where']
        }
      },
      {
        id: 'w5_table_whatin_adv',
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
        id: 'w5_house_isthere_adv',
        task_type: 'find_question',
        topic: 'house',
        intro: 'There is a bedroom in my house. Ask me if there is one.',
        acceptedQuestions: [
          'Is there a bedroom?',
          'Is there a kitchen?',
          'Is there a living room?'
        ],
        answer: 'Yes, there is a bedroom in my house.',
        question_hints: ['Is there a bedroom?', 'Is there a kitchen?', 'Is there a living room?'],
        required_question_words: ['is'],
        required_keywords: ['there', 'bedroom'],
        hints: {
          words: ['is', 'there', 'bedroom'],
          tricky: ['what', 'where']
        }
      },
      {
        id: 'w5_livingroom_whatin_adv',
        task_type: 'find_question',
        topic: 'living room',
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
        id: 'w5_mini_explore',
        task_type: 'mini_interview',
        topic: 'explore',
        intro: 'Interview me: ask if there is a kitchen, then ask what is in it.',
        steps: [
          {
            prompt: 'Ask if there is a kitchen.',
            required_question_words: ['is'],
            required_keywords: ['there', 'kitchen'],
            question_hints: ['Is there a kitchen?', 'Is there a bedroom?', 'Is there a bathroom?']
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

export default week5GamesAdvanced;
