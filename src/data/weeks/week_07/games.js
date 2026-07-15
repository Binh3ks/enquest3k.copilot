/**
 * Week 7 Game Data - Advanced Mode (New GameHub)
 */

export const week7GamesAdvanced = {
  vocabulary: [
    'pencil', 'crayon', 'scissors', 'glue', 'paper',
    'marker', 'lunch box', 'water bottle', 'school bag', 'folder'
  ],
  show_tell: {
    steps: 3,
    word_list: [
      'pencil', 'crayon', 'scissors', 'glue', 'paper',
      'marker', 'lunch box', 'water bottle', 'school bag', 'folder'
    ],
    instructions_easy: 'Say the word, add a phrase, then make a full sentence.',
    instructions_advanced: 'Say the word, add a phrase, then make a full sentence.',
    step_instructions: {
      1: 'Step 1: say the word clearly.',
      2: 'Step 2: add a short phrase with the word.',
      3: 'Step 3: make a full sentence.'
    },
    frames_easy: ['There is a ___ in the ___', 'I have a ___ in my ___'],
    frames_advanced: ['There is a ___ in the ___', 'I have a ___ in my ___'],
    details_easy: [],
    details_advanced: [],
    detail_map: {
      pencil: ['my pencil', 'a red pencil', 'the pencil', 'a pencil in the bag'],
      crayon: ['my crayon', 'a red crayon', 'the crayon', 'a crayon in the box'],
      scissors: ['my scissors', 'big scissors', 'the scissors', 'scissors in the bag'],
      glue: ['my glue', 'the glue', 'some glue', 'glue in the bag'],
      paper: ['my paper', 'white paper', 'the paper', 'paper in the folder'],
      marker: ['my marker', 'a red marker', 'the marker', 'a marker in the bag'],
      'lunch box': ['my lunch box', 'a big lunch box', 'the lunch box', 'a lunch box in the bag'],
      'water bottle': ['my water bottle', 'a blue water bottle', 'the water bottle', 'a water bottle in the bag'],
      'school bag': ['my school bag', 'a big school bag', 'the school bag', 'your school bag'],
      folder: ['my folder', 'a red folder', 'the folder', 'a folder in the bag']
    },
    distractors_easy: [],
    distractors_advanced: [],
    distractor_map: {
      pencil: ['my scissors', 'the glue', 'the door'],
      crayon: ['my marker', 'the paper', 'the book']
    },
    frame_map: {
      pencil: ['There is a ___ in the ___'],
      crayon: ['I have a ___ in my ___']
    },
    sentence_hints_map: {
      pencil: ['There is a pencil in the school bag.', 'There is a pencil in the folder.', 'There is a pencil.'],
      crayon: ['There is a crayon in the school bag.', 'There is a crayon in the box.', 'There is a crayon.'],
      scissors: ['There is scissors in the school bag.', 'There is scissors in the box.', 'There is scissors.'],
      glue: ['There is glue in the school bag.', 'There is glue in the box.', 'There is glue.'],
      paper: ['There is paper in the folder.', 'There is paper in the school bag.', 'There is paper.'],
      marker: ['There is a marker in the school bag.', 'There is a marker in the folder.', 'There is a marker.'],
      'lunch box': ['There is a lunch box in the school bag.', 'There is a lunch box.', 'I have a lunch box.'],
      'water bottle': ['There is a water bottle in the school bag.', 'There is a water bottle.', 'I have a water bottle.'],
      'school bag': ['There is a school bag.', 'I have a school bag.', 'This is a school bag.'],
      folder: ['There is a folder in the school bag.', 'There is a folder.', 'I have a folder.']
    },
    emoji_map: {
      pencil: '✏️',
      crayon: '🖍️',
      scissors: '✂️',
      glue: '📎',
      paper: '📄',
      marker: '🖊️',
      'lunch box': '🍱',
      'water bottle': '💧',
      'school bag': '🎒',
      folder: '📁'
    },
    definitions: {
      pencil: 'A tool for writing or drawing.',
      scissors: 'A tool for cutting paper.',
      glue: 'Something sticky to join things together.',
      folder: 'A thing to keep papers organized.'
    }
  },
  make_sentence: {
    instructions_easy: 'Unscramble the words to make a correct sentence.',
    instructions_advanced: 'Unscramble the words to make a correct sentence.',
    sentences_easy: [
      { scrambled: ['There', 'is', 'a', 'pencil', 'in', 'the', 'school', 'bag'], answer: 'There is a pencil in the school bag.' },
      { scrambled: ['There', 'is', 'a', 'crayon', 'in', 'the', 'folder'], answer: 'There is a crayon in the folder.' },
      { scrambled: ['There', 'is', 'a', 'marker', 'in', 'the', 'school', 'bag'], answer: 'There is a marker in the school bag.' },
      { scrambled: ['There', 'is', 'a', 'folder', 'in', 'the', 'school', 'bag'], answer: 'There is a folder in the school bag.' },
      { scrambled: ['There', 'is', 'paper', 'in', 'the', 'folder'], answer: 'There is paper in the folder.' },
      { scrambled: ['There', 'is', 'glue', 'in', 'the', 'school', 'bag'], answer: 'There is glue in the school bag.' },
      { scrambled: ['There', 'is', 'scissors', 'in', 'the', 'school', 'bag'], answer: 'There is scissors in the school bag.' },
      { scrambled: ['There', 'is', 'a', 'lunch', 'box', 'in', 'the', 'school', 'bag'], answer: 'There is a lunch box in the school bag.' },
      { scrambled: ['There', 'is', 'a', 'water', 'bottle', 'in', 'the', 'school', 'bag'], answer: 'There is a water bottle in the school bag.' },
      { scrambled: ['There', 'is', 'a', 'pencil', 'in', 'the', 'folder'], answer: 'There is a pencil in the folder.' }
    ],
    sentences_advanced: [
      { scrambled: ['There', 'is', 'a', 'pencil', 'in', 'the', 'school', 'bag'], answer: 'There is a pencil in the school bag.', base_words: ['there', 'is', 'a', 'pencil', 'in', 'the', 'school', 'bag'], time_phrases: ['right now', 'every day', 'this morning', 'before class', 'on Monday'], location_phrases: ['at school', 'in the classroom', 'on the desk', 'near the books', 'at my seat'] },
      { scrambled: ['There', 'is', 'a', 'crayon', 'in', 'the', 'folder'], answer: 'There is a crayon in the folder.', base_words: ['there', 'is', 'a', 'crayon', 'in', 'the', 'folder'], time_phrases: ['right now', 'every day', 'this afternoon', 'during art class', 'on Tuesday'], location_phrases: ['at school', 'in the classroom', 'on the table', 'near the supplies', 'at my desk'] },
      { scrambled: ['There', 'is', 'a', 'marker', 'in', 'the', 'school', 'bag'], answer: 'There is a marker in the school bag.', base_words: ['there', 'is', 'a', 'marker', 'in', 'the', 'school', 'bag'], time_phrases: ['right now', 'every day', 'this week', 'before class', 'on Wednesday'], location_phrases: ['at school', 'in the classroom', 'on the desk', 'near the pencils', 'at my seat'] },
      { scrambled: ['is', 'There', 'a', 'folder', 'in', 'the', 'school', 'bag'], answer: 'There is a folder in the school bag.', base_words: ['there', 'is', 'a', 'folder', 'in', 'the', 'school', 'bag'], time_phrases: ['right now', 'every day', 'this morning', 'before school', 'on Thursday'], location_phrases: ['at school', 'in the classroom', 'on the table', 'near the books', 'at my desk'] },
      { scrambled: ['is', 'There', 'paper', 'in', 'the', 'folder'], answer: 'There is paper in the folder.', base_words: ['there', 'is', 'paper', 'in', 'the', 'folder'], time_phrases: ['right now', 'every day', 'this week', 'during class', 'on Friday'], location_phrases: ['at school', 'in the classroom', 'on the desk', 'near the notebook', 'at my seat'] },
      { scrambled: ['is', 'There', 'glue', 'in', 'the', 'school', 'bag'], answer: 'There is glue in the school bag.', base_words: ['there', 'is', 'glue', 'in', 'the', 'school', 'bag'], time_phrases: ['right now', 'every day', 'this morning', 'during art class', 'on Monday'], location_phrases: ['at school', 'in the classroom', 'on the table', 'near the scissors', 'at my desk'] },
      { scrambled: ['is', 'There', 'scissors', 'in', 'the', 'school', 'bag'], answer: 'There is scissors in the school bag.', base_words: ['there', 'is', 'scissors', 'in', 'the', 'school', 'bag'], time_phrases: ['right now', 'every day', 'this afternoon', 'during art class', 'on Tuesday'], location_phrases: ['at school', 'in the classroom', 'on the desk', 'near the glue', 'at my seat'] },
      { scrambled: ['is', 'There', 'a', 'lunch', 'box', 'in', 'the', 'school', 'bag'], answer: 'There is a lunch box in the school bag.', base_words: ['there', 'is', 'a', 'lunch', 'box', 'in', 'the', 'school', 'bag'], time_phrases: ['right now', 'every day', 'this morning', 'before lunch', 'at noon'], location_phrases: ['at school', 'in the classroom', 'on the desk', 'near the water bottle', 'at my seat'] },
      { scrambled: ['is', 'There', 'a', 'water', 'bottle', 'in', 'the', 'school', 'bag'], answer: 'There is a water bottle in the school bag.', base_words: ['there', 'is', 'a', 'water', 'bottle', 'in', 'the', 'school', 'bag'], time_phrases: ['right now', 'every day', 'this morning', 'before class', 'at break time'], location_phrases: ['at school', 'in the classroom', 'on the desk', 'near the lunch box', 'at my seat'] },
      { scrambled: ['is', 'There', 'a', 'pencil', 'in', 'the', 'folder'], answer: 'There is a pencil in the folder.', base_words: ['there', 'is', 'a', 'pencil', 'in', 'the', 'folder'], time_phrases: ['right now', 'every day', 'this week', 'during class', 'on Friday'], location_phrases: ['at school', 'in the classroom', 'on the table', 'near the paper', 'at my desk'] }
    ]
  },
  ask_me: {
    instructions_easy: 'Ask a question that matches the context.',
    instructions_advanced: 'Ask a question that matches the context.',
    contexts_easy: [
      {
        id: 'w7_pencil_isthere',
        task_type: 'find_question',
        topic: 'pencil',
        intro: 'There is a pencil in the school bag. Ask me if there is a pencil.',
        acceptedQuestions: [
          'Is there a pencil?',
          'Is there a crayon?',
          'Is there a marker?'
        ],
        answer: 'Yes, there is a pencil.',
        question_hints: ['Is there a pencil?', 'Is there a crayon?', 'Is there a marker?'],
        required_question_words: ['is'],
        required_keywords: ['there', 'pencil'],
        hints: {
          words: ['is', 'there', 'pencil'],
          tricky: ['what', 'where']
        }
      },
      {
        id: 'w7_crayon_isthere',
        task_type: 'find_question',
        topic: 'crayon',
        intro: 'There is a crayon in the folder. Ask me if there is a crayon.',
        acceptedQuestions: [
          'Is there a crayon?',
          'Is there a pencil?',
          'Is there a marker?'
        ],
        answer: 'Yes, there is a crayon.',
        question_hints: ['Is there a crayon?', 'Is there a pencil?', 'Is there a marker?'],
        required_question_words: ['is'],
        required_keywords: ['there', 'crayon'],
        hints: {
          words: ['is', 'there', 'crayon'],
          tricky: ['what', 'where']
        }
      },
      {
        id: 'w7_scissors_isthere',
        task_type: 'find_question',
        topic: 'scissors',
        intro: 'There is scissors in the school bag. Ask me if there is scissors.',
        acceptedQuestions: [
          'Is there scissors?',
          'Is there glue?',
          'Is there paper?'
        ],
        answer: 'Yes, there is scissors.',
        question_hints: ['Is there scissors?', 'Is there glue?', 'Is there paper?'],
        required_question_words: ['is'],
        required_keywords: ['there', 'scissors'],
        hints: {
          words: ['is', 'there', 'scissors'],
          tricky: ['what', 'do']
        }
      },
      {
        id: 'w7_marker_isthere',
        task_type: 'find_question',
        topic: 'marker',
        intro: 'There is a marker in the school bag. Ask me if there is one.',
        acceptedQuestions: [
          'Is there a marker?',
          'Is there a pencil?',
          'Is there a crayon?'
        ],
        answer: 'Yes, there is a marker.',
        question_hints: ['Is there a marker?', 'Is there a pencil?', 'Is there a crayon?'],
        required_question_words: ['is'],
        required_keywords: ['there', 'marker'],
        hints: {
          words: ['is', 'there', 'marker'],
          tricky: ['what', 'where']
        }
      },
      {
        id: 'w7_paper_isthere',
        task_type: 'find_question',
        topic: 'paper',
        intro: 'There is paper in the folder. Ask me if there is paper.',
        acceptedQuestions: [
          'Is there paper?',
          'Is there glue?',
          'Is there scissors?'
        ],
        answer: 'Yes, there is paper.',
        question_hints: ['Is there paper?', 'Is there glue?', 'Is there scissors?'],
        required_question_words: ['is'],
        required_keywords: ['there', 'paper'],
        hints: {
          words: ['is', 'there', 'paper'],
          tricky: ['what', 'where']
        }
      },
      {
        id: 'w7_lunchbox_isthere',
        task_type: 'find_question',
        topic: 'lunch box',
        intro: 'There is a lunch box in the school bag. Ask me if there is one.',
        acceptedQuestions: [
          'Is there a lunch box?',
          'Is there a water bottle?',
          'Is there a school bag?'
        ],
        answer: 'Yes, there is a lunch box.',
        question_hints: ['Is there a lunch box?', 'Is there a water bottle?', 'Is there a school bag?'],
        required_question_words: ['is'],
        required_keywords: ['there', 'lunch'],
        hints: {
          words: ['is', 'there', 'lunch', 'box'],
          tricky: ['what', 'do']
        }
      },
      {
        id: 'w7_waterbottle_isthere',
        task_type: 'find_question',
        topic: 'water bottle',
        intro: 'There is a water bottle in the school bag. Ask me if there is one.',
        acceptedQuestions: [
          'Is there a water bottle?',
          'Is there a lunch box?',
          'Is there a school bag?'
        ],
        answer: 'Yes, there is a water bottle.',
        question_hints: ['Is there a water bottle?', 'Is there a lunch box?', 'Is there a school bag?'],
        required_question_words: ['is'],
        required_keywords: ['there', 'water'],
        hints: {
          words: ['is', 'there', 'water', 'bottle'],
          tricky: ['what', 'where']
        }
      },
      {
        id: 'w7_folder_isthere',
        task_type: 'find_question',
        topic: 'folder',
        intro: 'There is a folder in the school bag. Ask me if there is a folder.',
        acceptedQuestions: [
          'Is there a folder?',
          'Is there a pencil?',
          'Is there paper?'
        ],
        answer: 'Yes, there is a folder.',
        question_hints: ['Is there a folder?', 'Is there a pencil?', 'Is there paper?'],
        required_question_words: ['is'],
        required_keywords: ['there', 'folder'],
        hints: {
          words: ['is', 'there', 'folder'],
          tricky: ['what', 'where']
        }
      },
      {
        id: 'w7_mini_schoolbag',
        task_type: 'mini_interview',
        topic: 'schoolbag',
        intro: 'Interview me: ask if there is a pencil, then ask if there is a folder.',
        steps: [
          {
            prompt: 'Ask if there is a pencil.',
            required_question_words: ['is'],
            required_keywords: ['there', 'pencil'],
            question_hints: ['Is there a pencil?', 'Is there a crayon?', 'Is there a marker?']
          },
          {
            prompt: 'Ask if there is a folder.',
            acceptedQuestions: [
              'Is there a folder?',
              'Is there paper?',
              'Is there glue?'
            ],
            required_question_words: ['is'],
            required_keywords: ['there', 'folder'],
            question_hints: ['Is there a folder?', 'Is there paper?', 'Is there glue?']
          }
        ],
        hints: {
          words: ['is', 'there', 'pencil', 'folder'],
          tricky: ['what', 'where']
        }
      }
    ],
    contexts_advanced: [
      {
        id: 'w7_pencil_isthere_adv',
        task_type: 'find_question',
        topic: 'pencil',
        intro: 'There is a pencil in the school bag. Ask me if there is a pencil.',
        acceptedQuestions: [
          'Is there a pencil?',
          'Is there a crayon?',
          'Is there a marker?'
        ],
        answer: 'Yes, there is a pencil in the school bag.',
        question_hints: ['Is there a pencil?', 'Is there a crayon?', 'Is there a marker?'],
        required_question_words: ['is'],
        required_keywords: ['there', 'pencil'],
        hints: {
          words: ['is', 'there', 'pencil'],
          tricky: ['what', 'where']
        }
      },
      {
        id: 'w7_crayon_isthere_adv',
        task_type: 'find_question',
        topic: 'crayon',
        intro: 'There is a crayon in the folder. Ask me if there is a crayon.',
        acceptedQuestions: [
          'Is there a crayon?',
          'Is there a pencil?',
          'Is there a marker?'
        ],
        answer: 'Yes, there is a crayon in the folder.',
        question_hints: ['Is there a crayon?', 'Is there a pencil?', 'Is there a marker?'],
        required_question_words: ['is'],
        required_keywords: ['there', 'crayon'],
        hints: {
          words: ['is', 'there', 'crayon'],
          tricky: ['what', 'where']
        }
      },
      {
        id: 'w7_scissors_isthere_adv',
        task_type: 'find_question',
        topic: 'scissors',
        intro: 'There is scissors in the school bag. Ask me if there is scissors.',
        acceptedQuestions: [
          'Is there scissors?',
          'Is there glue?',
          'Is there paper?'
        ],
        answer: 'Yes, there is scissors in the school bag.',
        question_hints: ['Is there scissors?', 'Is there glue?', 'Is there paper?'],
        required_question_words: ['is'],
        required_keywords: ['there', 'scissors'],
        hints: {
          words: ['is', 'there', 'scissors'],
          tricky: ['what', 'do']
        }
      },
      {
        id: 'w7_marker_isthere_adv',
        task_type: 'find_question',
        topic: 'marker',
        intro: 'There is a marker in the folder. Ask me if there is one.',
        acceptedQuestions: [
          'Is there a marker?',
          'Is there a pencil?',
          'Is there a crayon?'
        ],
        answer: 'Yes, there is a marker in the folder.',
        question_hints: ['Is there a marker?', 'Is there a pencil?', 'Is there a crayon?'],
        required_question_words: ['is'],
        required_keywords: ['there', 'marker'],
        hints: {
          words: ['is', 'there', 'marker'],
          tricky: ['what', 'where']
        }
      },
      {
        id: 'w7_paper_isthere_adv',
        task_type: 'find_question',
        topic: 'paper',
        intro: 'There is paper in the folder. Ask me if there is paper.',
        acceptedQuestions: [
          'Is there paper?',
          'Is there glue?',
          'Is there scissors?'
        ],
        answer: 'Yes, there is paper in the folder.',
        question_hints: ['Is there paper?', 'Is there glue?', 'Is there scissors?'],
        required_question_words: ['is'],
        required_keywords: ['there', 'paper'],
        hints: {
          words: ['is', 'there', 'paper'],
          tricky: ['what', 'where']
        }
      },
      {
        id: 'w7_lunchbox_isthere_adv',
        task_type: 'find_question',
        topic: 'lunch box',
        intro: 'There is a lunch box in the school bag. Ask me if there is one.',
        acceptedQuestions: [
          'Is there a lunch box?',
          'Is there a water bottle?',
          'Is there a school bag?'
        ],
        answer: 'Yes, there is a lunch box in the school bag.',
        question_hints: ['Is there a lunch box?', 'Is there a water bottle?', 'Is there a school bag?'],
        required_question_words: ['is'],
        required_keywords: ['there', 'lunch'],
        hints: {
          words: ['is', 'there', 'lunch', 'box'],
          tricky: ['what', 'do']
        }
      },
      {
        id: 'w7_waterbottle_isthere_adv',
        task_type: 'find_question',
        topic: 'water bottle',
        intro: 'There is a water bottle in the school bag. Ask me if there is one.',
        acceptedQuestions: [
          'Is there a water bottle?',
          'Is there a lunch box?',
          'Is there a school bag?'
        ],
        answer: 'Yes, there is a water bottle in the school bag.',
        question_hints: ['Is there a water bottle?', 'Is there a lunch box?', 'Is there a school bag?'],
        required_question_words: ['is'],
        required_keywords: ['there', 'water'],
        hints: {
          words: ['is', 'there', 'water', 'bottle'],
          tricky: ['what', 'where']
        }
      },
      {
        id: 'w7_folder_isthere_adv',
        task_type: 'find_question',
        topic: 'folder',
        intro: 'There is a folder in the school bag. Ask me if there is a folder.',
        acceptedQuestions: [
          'Is there a folder?',
          'Is there a pencil?',
          'Is there paper?'
        ],
        answer: 'Yes, there is a folder in the school bag.',
        question_hints: ['Is there a folder?', 'Is there a pencil?', 'Is there paper?'],
        required_question_words: ['is'],
        required_keywords: ['there', 'folder'],
        hints: {
          words: ['is', 'there', 'folder'],
          tricky: ['what', 'where']
        }
      },
      {
        id: 'w7_mini_organized',
        task_type: 'mini_interview',
        topic: 'organized',
        intro: 'Interview me: ask if there is a pencil, then ask if there is a folder.',
        steps: [
          {
            prompt: 'Ask if there is a pencil.',
            required_question_words: ['is'],
            required_keywords: ['there', 'pencil'],
            question_hints: ['Is there a pencil?', 'Is there a crayon?', 'Is there a marker?']
          },
          {
            prompt: 'Ask if there is a folder.',
            acceptedQuestions: [
              'Is there a folder?',
              'Is there paper?',
              'Is there glue?'
            ],
            required_question_words: ['is'],
            required_keywords: ['there', 'folder'],
            question_hints: ['Is there a folder?', 'Is there paper?', 'Is there glue?']
          }
        ],
        hints: {
          words: ['is', 'there', 'pencil', 'folder'],
          tricky: ['what', 'where']
        }
      }
    ],
    required_question_words_easy: ['is', 'there'],
    required_question_words_advanced: ['is', 'there']
  }
};

export default week7GamesAdvanced;
