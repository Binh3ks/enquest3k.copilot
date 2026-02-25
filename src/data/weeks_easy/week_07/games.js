/**
 * Week 7 Game Data - Easy Mode (New GameHub)
 */

export const week7GamesEasy = {
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
    frames_easy: ['There is a ___', 'I have a ___'],
    frames_advanced: ['There is a ___', 'I have a ___'],
    details_easy: [],
    details_advanced: [],
    detail_map: {
      pencil: ['my pencil', 'a red pencil', 'the pencil', 'your pencil'],
      crayon: ['my crayon', 'a red crayon', 'the crayon', 'your crayon'],
      scissors: ['my scissors', 'big scissors', 'the scissors', 'your scissors'],
      glue: ['my glue', 'the glue', 'some glue', 'your glue'],
      paper: ['my paper', 'white paper', 'the paper', 'your paper'],
      marker: ['my marker', 'a red marker', 'the marker', 'your marker'],
      'lunch box': ['my lunch box', 'a big lunch box', 'the lunch box', 'your lunch box'],
      'water bottle': ['my water bottle', 'a blue water bottle', 'the water bottle', 'your water bottle'],
      'school bag': ['my school bag', 'a big school bag', 'the school bag', 'your school bag'],
      folder: ['my folder', 'a red folder', 'the folder', 'your folder']
    },
    distractors_easy: [],
    distractors_advanced: [],
    distractor_map: {
      pencil: ['my scissors', 'the glue', 'the door'],
      crayon: ['my marker', 'the paper', 'the book']
    },
    frame_map: {
      pencil: ['There is a ___'],
      crayon: ['I have a ___']
    },
    sentence_hints_map: {
      pencil: ['There is a pencil.', 'I have a pencil.', 'This is a pencil.'],
      crayon: ['There is a crayon.', 'I have a crayon.', 'This is a crayon.'],
      scissors: ['There is scissors.', 'I have scissors.', 'This is scissors.'],
      glue: ['There is glue.', 'I have glue.', 'This is glue.'],
      paper: ['There is paper.', 'I have paper.', 'This is paper.'],
      marker: ['There is a marker.', 'I have a marker.', 'This is a marker.'],
      'lunch box': ['There is a lunch box.', 'I have a lunch box.', 'This is a lunch box.'],
      'water bottle': ['There is a water bottle.', 'I have a water bottle.', 'This is a water bottle.'],
      'school bag': ['There is a school bag.', 'I have a school bag.', 'This is a school bag.'],
      folder: ['There is a folder.', 'I have a folder.', 'This is a folder.']
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
      glue: 'Something sticky to join things together.'
    }
  },
  make_sentence: {
    instructions_easy: 'Unscramble the words to make a correct sentence.',
    instructions_advanced: 'Unscramble the words to make a correct sentence.',
    sentences_easy: [
      { scrambled: ['There', 'is', 'a', 'pencil'], answer: 'There is a pencil.', base_words: ['there', 'is', 'a', 'pencil'], time_phrases: ['right now', 'today', 'now', 'at this moment'], location_phrases: ['on the desk', 'here', 'at school', 'in the classroom'] },
      { scrambled: ['There', 'is', 'a', 'crayon'], answer: 'There is a crayon.', base_words: ['there', 'is', 'a', 'crayon'], time_phrases: ['right now', 'today', 'now', 'at this moment'], location_phrases: ['on the desk', 'here', 'at school', 'in the classroom'] },
      { scrambled: ['There', 'is', 'a', 'marker'], answer: 'There is a marker.', base_words: ['there', 'is', 'a', 'marker'], time_phrases: ['right now', 'today', 'now', 'at this moment'], location_phrases: ['on the desk', 'here', 'at school', 'in the classroom'] },
      { scrambled: ['There', 'is', 'a', 'folder'], answer: 'There is a folder.', base_words: ['there', 'is', 'a', 'folder'], time_phrases: ['right now', 'today', 'now', 'at this moment'], location_phrases: ['on the desk', 'here', 'at school', 'in my bag'] },
      { scrambled: ['There', 'is', 'a', 'lunch', 'box'], answer: 'There is a lunch box.', base_words: ['there', 'is', 'a', 'lunch', 'box'], time_phrases: ['right now', 'today', 'now', 'at lunch time'], location_phrases: ['on the desk', 'here', 'at school', 'in my bag'] },
      { scrambled: ['There', 'is', 'a', 'water', 'bottle'], answer: 'There is a water bottle.', base_words: ['there', 'is', 'a', 'water', 'bottle'], time_phrases: ['right now', 'today', 'now', 'at this moment'], location_phrases: ['on the desk', 'here', 'at school', 'in my bag'] },
      { scrambled: ['There', 'is', 'a', 'school', 'bag'], answer: 'There is a school bag.', base_words: ['there', 'is', 'a', 'school', 'bag'], time_phrases: ['right now', 'today', 'now', 'every day'], location_phrases: ['on the desk', 'here', 'at school', 'in the classroom'] },
      { scrambled: ['There', 'is', 'paper'], answer: 'There is paper.', base_words: ['there', 'is', 'paper'], time_phrases: ['right now', 'today', 'now', 'at this moment'], location_phrases: ['on the desk', 'here', 'at school', 'in the classroom'] },
      { scrambled: ['There', 'is', 'glue'], answer: 'There is glue.', base_words: ['there', 'is', 'glue'], time_phrases: ['right now', 'today', 'now', 'at this moment'], location_phrases: ['on the desk', 'here', 'at school', 'in the classroom'] },
      { scrambled: ['There', 'is', 'scissors'], answer: 'There is scissors.', base_words: ['there', 'is', 'scissors'], time_phrases: ['right now', 'today', 'now', 'at this moment'], location_phrases: ['on the desk', 'here', 'at school', 'in the classroom'] }
    ],
    sentences_advanced: [
      { scrambled: ['There', 'is', 'a', 'pencil'], answer: 'There is a pencil.', base_words: ['there', 'is', 'a', 'pencil'], time_phrases: ['right now', 'today', 'now', 'at this moment'], location_phrases: ['on the desk', 'here', 'at school', 'in the classroom'] },
      { scrambled: ['There', 'is', 'a', 'crayon'], answer: 'There is a crayon.', base_words: ['there', 'is', 'a', 'crayon'], time_phrases: ['right now', 'today', 'now', 'at this moment'], location_phrases: ['on the desk', 'here', 'at school', 'in the classroom'] },
      { scrambled: ['There', 'is', 'a', 'marker'], answer: 'There is a marker.', base_words: ['there', 'is', 'a', 'marker'], time_phrases: ['right now', 'today', 'now', 'at this moment'], location_phrases: ['on the desk', 'here', 'at school', 'in the classroom'] },
      { scrambled: ['is', 'There', 'a', 'folder'], answer: 'There is a folder.', base_words: ['there', 'is', 'a', 'folder'], time_phrases: ['right now', 'today', 'now', 'at this moment'], location_phrases: ['on the desk', 'here', 'at school', 'in my bag'] },
      { scrambled: ['is', 'There', 'a', 'lunch', 'box'], answer: 'There is a lunch box.', base_words: ['there', 'is', 'a', 'lunch', 'box'], time_phrases: ['right now', 'today', 'now', 'at lunch time'], location_phrases: ['on the desk', 'here', 'at school', 'in my bag'] },
      { scrambled: ['is', 'There', 'a', 'water', 'bottle'], answer: 'There is a water bottle.', base_words: ['there', 'is', 'a', 'water', 'bottle'], time_phrases: ['right now', 'today', 'now', 'at this moment'], location_phrases: ['on the desk', 'here', 'at school', 'in my bag'] },
      { scrambled: ['is', 'There', 'a', 'school', 'bag'], answer: 'There is a school bag.', base_words: ['there', 'is', 'a', 'school', 'bag'], time_phrases: ['right now', 'today', 'now', 'every day'], location_phrases: ['on the desk', 'here', 'at school', 'in the classroom'] },
      { scrambled: ['is', 'There', 'paper'], answer: 'There is paper.', base_words: ['there', 'is', 'paper'], time_phrases: ['right now', 'today', 'now', 'at this moment'], location_phrases: ['on the desk', 'here', 'at school', 'in the classroom'] },
      { scrambled: ['is', 'There', 'glue'], answer: 'There is glue.', base_words: ['there', 'is', 'glue'], time_phrases: ['right now', 'today', 'now', 'at this moment'], location_phrases: ['on the desk', 'here', 'at school', 'in the classroom'] },
      { scrambled: ['is', 'There', 'scissors'], answer: 'There is scissors.', base_words: ['there', 'is', 'scissors'], time_phrases: ['right now', 'today', 'now', 'at this moment'], location_phrases: ['on the desk', 'here', 'at school', 'in the classroom'] }
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
        intro: 'There is a pencil on the desk. Ask me if there is a pencil.',
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
        intro: 'There is a crayon in my bag. Ask me if there is a crayon.',
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
        intro: 'There is scissors on the table. Ask me if there is scissors.',
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
        intro: 'There is a marker in my bag. Ask me if there is one.',
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
        intro: 'There is paper on the desk. Ask me if there is paper.',
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
        intro: 'There is a lunch box in my bag. Ask me if there is one.',
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
        intro: 'There is a water bottle in my bag. Ask me if there is one.',
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
        intro: 'There is a folder on the desk. Ask me if there is a folder.',
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
        id: 'w7_mini_supplies',
        task_type: 'mini_interview',
        topic: 'supplies',
        intro: 'Interview me: ask if there is a pencil, then ask if there is paper.',
        steps: [
          {
            prompt: 'Ask if there is a pencil.',
            required_question_words: ['is'],
            required_keywords: ['there', 'pencil'],
            question_hints: ['Is there a pencil?', 'Is there a crayon?', 'Is there a marker?']
          },
          {
            prompt: 'Ask if there is paper.',
            acceptedQuestions: [
              'Is there paper?',
              'Is there glue?',
              'Is there scissors?'
            ],
            required_question_words: ['is'],
            required_keywords: ['there', 'paper'],
            question_hints: ['Is there paper?', 'Is there glue?', 'Is there scissors?']
          }
        ],
        hints: {
          words: ['is', 'there', 'pencil', 'paper'],
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
        id: 'w7_crayon_isthere_adv',
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
        id: 'w7_scissors_isthere_adv',
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
        id: 'w7_marker_isthere_adv',
        task_type: 'find_question',
        topic: 'marker',
        intro: 'There is a marker in the folder. Ask me if there is one.',
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
        id: 'w7_paper_isthere_adv',
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
        id: 'w7_lunchbox_isthere_adv',
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
        id: 'w7_waterbottle_isthere_adv',
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
        id: 'w7_folder_isthere_adv',
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
    required_question_words_easy: ['is', 'there'],
    required_question_words_advanced: ['is', 'there']
  }
};

export default week7GamesEasy;
