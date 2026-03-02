/**
 * Week 8 Game Data - Advanced Mode (New GameHub)
 */

export const week8GamesAdvanced = {
  vocabulary: [
    'desk', 'pencil', 'student', 'bag', 'marker',
    'chair', 'board', 'paper', 'shelf', 'crayon'
  ],
  show_tell: {
    steps: 3,
    word_list: [
      'desk', 'pencil', 'student', 'bag', 'marker',
      'chair', 'board', 'paper', 'shelf', 'crayon'
    ],
    instructions_easy: 'Say the word, add a phrase, then make a full sentence with There are.',
    instructions_advanced: 'Say the word, add a phrase, then make a full sentence with There are.',
    step_instructions: {
      1: 'Step 1: say the word clearly.',
      2: 'Step 2: add a short phrase with the word.',
      3: 'Step 3: make a full sentence using There are.'
    },
    frames_easy: ['There are ___ in the classroom', 'There are ___ on the desk'],
    frames_advanced: ['There are many ___ in our school', 'There are ___ for every student'],
    details_easy: [],
    details_advanced: [],
    detail_map: {
      desk: ['my desk', 'a big desk', 'the desk', 'there are desks for everyone'],
      pencil: ['my pencil', 'a sharp pencil', 'the pencil', 'there are pencils in the case'],
      student: ['one student', 'a good student', 'the student', 'there are students in class'],
      bag: ['my bag', 'a heavy bag', 'the bag', 'there are bags on the floor'],
      marker: ['a red marker', 'the marker', 'big marker', 'there are markers on the board'],
      chair: ['my chair', 'a small chair', 'the chair', 'there are chairs in rows'],
      board: ['the board', 'a big board', 'our board', 'there are words on the board'],
      paper: ['white paper', 'my paper', 'the paper', 'there are papers on the desk'],
      shelf: ['the shelf', 'a big shelf', 'our shelf', 'there are books on the shelf'],
      crayon: ['a red crayon', 'my crayon', 'the crayon', 'there are crayons in the box']
    },
    emoji_map: {
      desk: '🪑',
      pencil: '✏️',
      student: '🧑‍🎓',
      bag: '🎒',
      marker: '🖊️',
      chair: '💺',
      board: '📋',
      paper: '📄',
      shelf: '📚',
      crayon: '🖍️'
    },
    sentence_hints_map: {
      desk: ['There are desks in the classroom.', 'There are 20 desks in our room.', 'There are desks for every student.'],
      pencil: ['There are pencils in the pencil case.', 'There are many pencils on the desk.', 'There are pencils for everyone.'],
      student: ['There are 30 students in my class.', 'There are many students at school.', 'There are students learning today.'],
      bag: ['There are bags on the floor.', 'There are bags on the hooks.', 'There are 30 bags in our classroom.'],
      marker: ['There are markers on the board tray.', 'There are 5 markers today.', 'There are markers in the art box.'],
      chair: ['There are chairs in neat rows.', 'There are chairs for every student.', 'There are many chairs in the room.'],
      board: ['There are words on the board.', 'There are boards in every classroom.', 'There are markers for the board.'],
      paper: ['There are papers on the desks.', 'There are many papers on the shelf.', 'There are papers for art class.'],
      shelf: ['There are books on the shelf.', 'There are 3 shelves on the wall.', 'There are supplies on the shelf.'],
      crayon: ['There are crayons in the art box.', 'There are 12 crayons in the set.', 'There are many crayons for drawing.']
    },
    definitions: {
      marker: 'A thick pen used to write on boards.',
      shelf: 'A flat board on a wall to hold things.',
      crayon: 'A colored stick for drawing.',
      student: 'A person who studies at school.'
    }
  },
  make_sentence: {
    instructions_easy: 'Unscramble the words to make a correct "There are" sentence.',
    instructions_advanced: 'Unscramble the words to make a correct "There are" sentence.',
    sentences_easy: [
      { scrambled: ['are', 'There', 'desks', 'in', 'the', 'classroom'], answer: 'There are desks in the classroom.' },
      { scrambled: ['are', 'There', 'pencils', 'in', 'the', 'bag'], answer: 'There are pencils in the bag.' },
      { scrambled: ['are', 'There', 'chairs', 'for', 'every', 'student'], answer: 'There are chairs for every student.' },
      { scrambled: ['are', 'There', 'markers', 'on', 'the', 'board'], answer: 'There are markers on the board.' },
      { scrambled: ['are', 'There', 'books', 'on', 'the', 'shelf'], answer: 'There are books on the shelf.' },
      { scrambled: ['are', 'There', '30', 'students', 'in', 'my', 'class'], answer: 'There are 30 students in my class.' },
      { scrambled: ['are', 'There', 'crayons', 'in', 'the', 'art', 'box'], answer: 'There are crayons in the art box.' },
      { scrambled: ['are', 'There', 'papers', 'on', 'my', 'desk'], answer: 'There are papers on my desk.' },
      { scrambled: ['bags', 'There', 'are', 'on', 'the', 'floor'], answer: 'There are bags on the floor.' },
      { scrambled: ['3', 'are', 'There', 'shelves', 'on', 'the', 'wall'], answer: 'There are 3 shelves on the wall.' }
    ],
    sentences_advanced: [
      { scrambled: ['are', 'There', 'desks', 'in', 'the', 'classroom'], answer: 'There are desks in the classroom.', base_words: ['there', 'are', 'desks', 'in', 'the', 'classroom'], time_phrases: ['every Monday', 'this morning', 'on school days', 'right now', 'today'], location_phrases: ['in neat rows', 'near the window', 'by the board', 'for every student', 'in the back'] },
      { scrambled: ['are', 'There', '30', 'students', 'in', 'my', 'class'], answer: 'There are 30 students in my class.', base_words: ['there', 'are', '30', 'students', 'in', 'my', 'class'], time_phrases: ['every day', 'this Monday', 'on weekdays', 'right now', 'today'], location_phrases: ['in the classroom', 'at school', 'in room 5', 'learning English', 'in the morning'] },
      { scrambled: ['are', 'There', 'crayons', 'in', 'the', 'art', 'box'], answer: 'There are crayons in the art box.', base_words: ['there', 'are', 'crayons', 'in', 'the', 'art', 'box'], time_phrases: ['for art class', 'right now', 'today', 'this morning', 'for drawing'], location_phrases: ['on the shelf', 'in the corner', 'near the window', 'on the table', 'in the room'] }
    ]
  },
  ask_me: {
    instructions_easy: 'Ask a "How many" question that matches the context.',
    instructions_advanced: 'Ask a "How many" or "Are there" question that matches the context.',
    contexts_easy: [
      {
        id: 'w8_desks_how_many',
        task_type: 'find_question',
        topic: 'desk',
        intro: 'There are 20 desks in the classroom. Ask how many desks there are.',
        acceptedQuestions: ['How many desks are there?', 'How many desks?', 'Are there desks?'],
        answer: 'There are 20 desks in the classroom.',
        question_hints: ['How many desks are there?', 'How many desks?', 'Are there desks?'],
        required_question_words: ['how many', 'are there'],
        required_keywords: ['desk'],
        hints: { words: ['how', 'many', 'desks', 'are', 'there'], tricky: ['what', 'who'] }
      },
      {
        id: 'w8_students_how_many',
        task_type: 'find_question',
        topic: 'student',
        intro: 'There are 30 students in the class. Ask how many students there are.',
        acceptedQuestions: ['How many students are there?', 'How many students?', 'Are there many students?'],
        answer: 'There are 30 students in the class.',
        question_hints: ['How many students are there?', 'How many students?', 'Are there many students?'],
        required_question_words: ['how many', 'are there'],
        required_keywords: ['student'],
        hints: { words: ['how', 'many', 'students', 'are', 'there'], tricky: ['what', 'who'] }
      },
      {
        id: 'w8_markers_how_many',
        task_type: 'find_question',
        topic: 'marker',
        intro: 'There are 5 markers. Ask how many markers are on the board.',
        acceptedQuestions: ['How many markers are there?', 'How many markers?', 'Are there markers?'],
        answer: 'There are 5 markers on the board.',
        question_hints: ['How many markers are there?', 'How many markers?', 'Are there markers?'],
        required_question_words: ['how many', 'are there'],
        required_keywords: ['marker'],
        hints: { words: ['how', 'many', 'markers', 'are', 'there'], tricky: ['what', 'who'] }
      },
      {
        id: 'w8_shelves_how_many',
        task_type: 'find_question',
        topic: 'shelf',
        intro: 'There are 3 shelves on the wall. Ask about the shelves.',
        acceptedQuestions: ['How many shelves are there?', 'How many shelves?', 'Are there shelves?'],
        answer: 'There are 3 shelves on the wall.',
        question_hints: ['How many shelves are there?', 'How many shelves?', 'Are there shelves?'],
        required_question_words: ['how many', 'are there'],
        required_keywords: ['shelf', 'shelves'],
        hints: { words: ['how', 'many', 'shelves', 'are', 'there'], tricky: ['what', 'who'] }
      },
      {
        id: 'w8_crayons_are_there',
        task_type: 'find_question',
        topic: 'crayon',
        intro: 'You need crayons for art. Ask if there are crayons in the box.',
        acceptedQuestions: ['Are there crayons?', 'Are there crayons in the box?', 'How many crayons are there?'],
        answer: 'Yes, there are crayons in the art box!',
        question_hints: ['Are there crayons?', 'Are there crayons in the box?', 'How many crayons?'],
        required_question_words: ['are there', 'how many'],
        required_keywords: ['crayon'],
        hints: { words: ['are', 'there', 'crayons', 'in', 'the', 'box'], tricky: ['what', 'who'] }
      }
    ],
    contexts_advanced: [
      {
        id: 'w8_desks_adv',
        task_type: 'find_question',
        topic: 'desk',
        intro: 'There are 20 desks in neat rows. Ask how many desks there are.',
        acceptedQuestions: ['How many desks are there in the classroom?', 'How many desks are there?', 'How many desks?'],
        answer: 'There are 20 desks in the classroom.',
        question_hints: ['How many desks are there?', 'Are there many desks?', 'How many desks in the classroom?'],
        required_question_words: ['how many', 'are there'],
        required_keywords: ['desk'],
        hints: { words: ['how', 'many', 'desks', 'are', 'there'], tricky: ['what', 'who'] }
      }
    ]
  }
};
