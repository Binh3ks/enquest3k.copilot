/**
 * Week 8 Game Data - Easy Mode (New GameHub)
 * Theme: The Busy Classroom — There are... (Plural)
 */

export const week8GamesEasy = {
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
    instructions_easy: 'Say the word, add a phrase, then make a sentence with There are.',
    instructions_advanced: 'Say the word, add a phrase, then make a sentence with There are.',
    step_instructions: {
      1: 'Step 1: say the word clearly.',
      2: 'Step 2: add a short phrase.',
      3: 'Step 3: make a sentence using There are.'
    },
    frames_easy: ['There are ___ in the classroom', 'There are ___ here'],
    frames_advanced: ['There are ___ in the classroom', 'There are ___ here'],
    details_easy: [],
    details_advanced: [],
    detail_map: {
      desk: ['my desk', 'a big desk', 'the desk', 'our desk'],
      pencil: ['my pencil', 'a pencil', 'the pencil', 'your pencil'],
      student: ['one student', 'a student', 'the student', 'my student'],
      bag: ['my bag', 'a bag', 'the bag', 'your bag'],
      marker: ['a marker', 'my marker', 'the marker', 'your marker'],
      chair: ['my chair', 'a chair', 'the chair', 'your chair'],
      board: ['the board', 'a board', 'our board', 'big board'],
      paper: ['my paper', 'white paper', 'the paper', 'your paper'],
      shelf: ['the shelf', 'a shelf', 'our shelf', 'big shelf'],
      crayon: ['a crayon', 'my crayon', 'the crayon', 'your crayon']
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
      desk: ['There are desks here.', 'There are many desks.', 'There are desks in the classroom.'],
      pencil: ['There are pencils here.', 'There are many pencils.', 'There are pencils on the desk.'],
      student: ['There are students here.', 'There are many students.', 'There are students in my class.'],
      bag: ['There are bags here.', 'There are bags on the floor.', 'There are many bags.'],
      marker: ['There are markers here.', 'There are many markers.', 'There are markers on the board.'],
      chair: ['There are chairs here.', 'There are many chairs.', 'There are chairs in the classroom.'],
      board: ['There are boards here.', 'There are boards in the classroom.', 'There are words on the board.'],
      paper: ['There are papers here.', 'There are papers on the desk.', 'There are many papers.'],
      shelf: ['There are shelves here.', 'There are books on the shelf.', 'There are many shelves.'],
      crayon: ['There are crayons here.', 'There are crayons in the box.', 'There are many crayons.']
    },
    definitions: {
      desk: 'A table for studying at school.',
      marker: 'A thick pen used on boards.',
      shelf: 'A flat board on a wall.',
      crayon: 'A colored stick for drawing.'
    }
  },
  make_sentence: {
    instructions_easy: 'Unscramble the words to make a "There are" sentence.',
    instructions_advanced: 'Unscramble the words to make a "There are" sentence.',
    sentences_easy: [
      { scrambled: ['There', 'are', 'desks'], answer: 'There are desks.', base_words: ['there', 'are', 'desks'], time_phrases: ['right now', 'today', 'now'], location_phrases: ['in the classroom', 'here', 'at school'] },
      { scrambled: ['There', 'are', 'pencils'], answer: 'There are pencils.', base_words: ['there', 'are', 'pencils'], time_phrases: ['right now', 'today', 'now'], location_phrases: ['on the desk', 'here', 'at school'] },
      { scrambled: ['There', 'are', 'chairs'], answer: 'There are chairs.', base_words: ['there', 'are', 'chairs'], time_phrases: ['right now', 'today', 'now'], location_phrases: ['in the room', 'here', 'at school'] },
      { scrambled: ['There', 'are', 'students'], answer: 'There are students.', base_words: ['there', 'are', 'students'], time_phrases: ['right now', 'today', 'now'], location_phrases: ['in the classroom', 'here', 'at school'] },
      { scrambled: ['There', 'are', 'markers'], answer: 'There are markers.', base_words: ['there', 'are', 'markers'], time_phrases: ['right now', 'today', 'now'], location_phrases: ['on the board', 'here', 'at school'] },
      { scrambled: ['are', 'There', 'bags'], answer: 'There are bags.', base_words: ['there', 'are', 'bags'], time_phrases: ['right now', 'today', 'now'], location_phrases: ['on the floor', 'here', 'at school'] },
      { scrambled: ['are', 'There', 'papers'], answer: 'There are papers.', base_words: ['there', 'are', 'papers'], time_phrases: ['right now', 'today', 'now'], location_phrases: ['on the desk', 'here', 'in the classroom'] },
      { scrambled: ['are', 'There', 'crayons'], answer: 'There are crayons.', base_words: ['there', 'are', 'crayons'], time_phrases: ['right now', 'today', 'now'], location_phrases: ['in the box', 'here', 'in the classroom'] },
      { scrambled: ['books', 'are', 'There'], answer: 'There are books.', base_words: ['there', 'are', 'books'], time_phrases: ['right now', 'today', 'now'], location_phrases: ['on the shelf', 'here', 'in the classroom'] },
      { scrambled: ['shelves', 'There', 'are'], answer: 'There are shelves.', base_words: ['there', 'are', 'shelves'], time_phrases: ['right now', 'today', 'now'], location_phrases: ['on the wall', 'here', 'in the classroom'] }
    ],
    sentences_advanced: [
      { scrambled: ['are', 'There', 'desks', 'in', 'the', 'classroom'], answer: 'There are desks in the classroom.', base_words: ['there', 'are', 'desks', 'in', 'the', 'classroom'], time_phrases: ['right now', 'today', 'now', 'every day'], location_phrases: ['in neat rows', 'near the window', 'by the board', 'for every student'] },
      { scrambled: ['are', 'There', 'students', 'in', 'my', 'class'], answer: 'There are students in my class.', base_words: ['there', 'are', 'students', 'in', 'my', 'class'], time_phrases: ['right now', 'today', 'now', 'every day'], location_phrases: ['in the classroom', 'at school', 'learning English', 'in the morning'] },
      { scrambled: ['are', 'There', 'crayons', 'in', 'the', 'box'], answer: 'There are crayons in the box.', base_words: ['there', 'are', 'crayons', 'in', 'the', 'box'], time_phrases: ['for art class', 'right now', 'today', 'this morning'], location_phrases: ['on the shelf', 'in the corner', 'near the window', 'on the table'] }
    ]
  },
  ask_me: {
    instructions_easy: 'Ask a question that matches the context.',
    instructions_advanced: 'Ask a question that matches the context.',
    contexts_easy: [
      {
        id: 'w8e_desks_how_many',
        task_type: 'find_question',
        topic: 'desk',
        intro: 'There are desks in the classroom. Ask me how many desks there are.',
        acceptedQuestions: ['How many desks are there?', 'How many desks?', 'Are there desks?'],
        answer: 'There are many desks.',
        question_hints: ['How many desks are there?', 'How many desks?', 'Are there desks?'],
        required_question_words: ['how many', 'are there'],
        required_keywords: ['desk'],
        hints: { words: ['how', 'many', 'desks', 'are', 'there'], tricky: ['what', 'who'] }
      },
      {
        id: 'w8e_pencils_how_many',
        task_type: 'find_question',
        topic: 'pencil',
        intro: 'There are pencils on the desk. Ask me how many pencils there are.',
        acceptedQuestions: ['How many pencils are there?', 'How many pencils?', 'Are there pencils?'],
        answer: 'There are many pencils.',
        question_hints: ['How many pencils are there?', 'How many pencils?', 'Are there pencils?'],
        required_question_words: ['how many', 'are there'],
        required_keywords: ['pencil'],
        hints: { words: ['how', 'many', 'pencils', 'are', 'there'], tricky: ['what', 'who'] }
      },
      {
        id: 'w8e_chairs_how_many',
        task_type: 'find_question',
        topic: 'chair',
        intro: 'There are many chairs in the room. Ask me about the chairs.',
        acceptedQuestions: ['How many chairs are there?', 'How many chairs?', 'Are there chairs?'],
        answer: 'There are many chairs.',
        question_hints: ['How many chairs are there?', 'How many chairs?', 'Are there chairs?'],
        required_question_words: ['how many', 'are there'],
        required_keywords: ['chair'],
        hints: { words: ['how', 'many', 'chairs', 'are', 'there'], tricky: ['what', 'who'] }
      },
      {
        id: 'w8e_students_how_many',
        task_type: 'find_question',
        topic: 'student',
        intro: 'There are students in the classroom. Ask how many students there are.',
        acceptedQuestions: ['How many students are there?', 'How many students?', 'Are there students?'],
        answer: 'There are many students.',
        question_hints: ['How many students are there?', 'How many students?', 'Are there students?'],
        required_question_words: ['how many', 'are there'],
        required_keywords: ['student'],
        hints: { words: ['how', 'many', 'students', 'are', 'there'], tricky: ['what', 'who'] }
      },
      {
        id: 'w8e_books_are_there',
        task_type: 'find_question',
        topic: 'shelf',
        intro: 'There are books on the shelf. Ask me if there are books.',
        acceptedQuestions: ['Are there books?', 'Are there books on the shelf?', 'How many books are there?'],
        answer: 'Yes, there are books on the shelf.',
        question_hints: ['Are there books?', 'Are there books on the shelf?', 'How many books?'],
        required_question_words: ['are there', 'how many'],
        required_keywords: ['book', 'shelf'],
        hints: { words: ['are', 'there', 'books', 'on', 'the', 'shelf'], tricky: ['what', 'who'] }
      },
      {
        id: 'w8e_crayons_are_there',
        task_type: 'find_question',
        topic: 'crayon',
        intro: 'There are crayons in the art box. Ask me if there are crayons.',
        acceptedQuestions: ['Are there crayons?', 'Are there crayons in the box?', 'How many crayons are there?'],
        answer: 'Yes, there are crayons in the box.',
        question_hints: ['Are there crayons?', 'Are there crayons in the box?', 'How many crayons?'],
        required_question_words: ['are there', 'how many'],
        required_keywords: ['crayon'],
        hints: { words: ['are', 'there', 'crayons', 'in', 'the', 'box'], tricky: ['what', 'who'] }
      }
    ],
    contexts_advanced: [
      {
        id: 'w8e_markers_adv',
        task_type: 'find_question',
        topic: 'marker',
        intro: 'There are 5 markers on the board tray. Ask how many markers there are.',
        acceptedQuestions: ['How many markers are there?', 'How many markers?', 'Are there markers on the board?'],
        answer: 'There are 5 markers on the board tray.',
        question_hints: ['How many markers are there?', 'Are there markers on the board?', 'How many markers?'],
        required_question_words: ['how many', 'are there'],
        required_keywords: ['marker'],
        hints: { words: ['how', 'many', 'markers', 'are', 'there'], tricky: ['what', 'who'] }
      }
    ]
  }
};

export default week8GamesEasy;
