/**
 * Week 1 Game Data - Advanced Mode (New GameHub)
 */

export const week1GamesAdvanced = {
  vocabulary: [
    'student', 'teacher', 'school', 'classroom', 'backpack',
    'book', 'notebook', 'library', 'scientist', 'name',
    'tools', 'world', 'discover', 'observe', 'magnifying glass',
    'brave', 'smart'
  ],
  show_tell: {
    steps: 3,
    word_list: [
      'student', 'teacher', 'school', 'classroom', 'backpack',
      'book', 'notebook', 'library', 'scientist', 'name',
      'tools', 'world', 'discover', 'observe', 'magnifying glass',
      'brave', 'smart'
    ],
    instructions_easy: 'Say the word, add a phrase, then make a full sentence.',
    instructions_advanced: 'Say the word, add a phrase, then make a full sentence.',
    step_instructions: {
      1: 'Step 1: say the word clearly.',
      2: 'Step 2: add a short phrase with the word.',
      3: 'Step 3: make a full sentence.',
      4: 'Step 4: add a second sentence about the same topic.',
      5: 'Step 5: tell a mini story using \'because\' or \'so\'.'
    },
    frames_easy: ['I am ___', 'This is ___'],
    frames_advanced: ['I am a ___', 'This is a ___'],
    details_easy: [],
    details_advanced: [],
    detail_map: {
      student: ['a brave student', 'a smart student', 'my student', 'the student'],
      teacher: ['a kind teacher', 'a smart teacher', 'my teacher', 'the teacher'],
      school: ['my school', 'the school', 'a big school', 'our school'],
      classroom: ['my classroom', 'the classroom', 'a big classroom', 'our classroom'],
      backpack: ['my backpack', 'a big backpack', 'the backpack', 'your backpack'],
      book: ['my book', 'a red book', 'the book', 'your book'],
      notebook: ['my notebook', 'a small notebook', 'the notebook', 'your notebook'],
      library: ['the library', 'my library', 'a big library', 'our library'],
      scientist: ['a smart scientist', 'a brave scientist', 'the scientist', 'your scientist'],
      name: ['my name', 'his name', 'her name', 'a nice name'],
      tools: ['my tools', 'the tools', 'some tools', 'your tools'],
      world: ['the world', 'our world', 'a big world', 'my world'],
      discover: ['discover it', 'discover now', 'discover more', 'discover the world'],
      observe: ['observe it', 'observe now', 'observe the world', 'observe closely'],
      'magnifying glass': ['a magnifying glass', 'my magnifying glass', 'the magnifying glass'],
      brave: ['very brave', 'so brave', 'brave today', 'brave and smart'],
      smart: ['very smart', 'so smart', 'smart today', 'smart and brave']
    },
    distractors_easy: [],
    distractors_advanced: [],
    distractor_map: {
      name: ['my backpack', 'a red book', 'the door'],
      student: ['my book', 'the door', 'a red pen']
    },
    frame_map: {
      name: ['My name is ___'],
      student: ['I am a student'],
      teacher: ['He is a teacher', 'She is a teacher']
    },
    sentence_hints_map: {
      student: ['I am a student.', 'He is a student.', 'She is a student.'],
      teacher: ['He is a teacher.', 'She is a teacher.', 'This is a teacher.'],
      school: ['This is my school.', 'My school is big.', 'The school is big.'],
      classroom: ['This is my classroom.', 'My classroom is big.', 'The classroom is big.'],
      backpack: ['This is my backpack.', 'My backpack is big.', 'The backpack is red.'],
      book: ['This is my book.', 'My book is red.', 'The book is small.'],
      notebook: ['This is my notebook.', 'My notebook is small.', 'The notebook is red.'],
      library: ['I am in the library.', 'The library is big.', 'This is the library.'],
      scientist: ['He is a scientist.', 'She is a scientist.', 'This is a scientist.'],
      name: ['My name is Alex.', 'His name is Ben.', 'Her name is Mia.'],
      tools: ['These are my tools.', 'The tools are here.', 'I have tools.'],
      world: ['The world is big.', 'This is the world.', 'Our world is big.'],
      discover: ['I discover the world.', 'I discover tools.', 'I discover books.'],
      observe: ['I observe the world.', 'I observe tools.', 'I observe books.'],
      'magnifying glass': ['This is a magnifying glass.', 'I have a magnifying glass.', 'The magnifying glass is here.'],
      brave: ['I am brave.', 'He is brave.', 'She is brave.'],
      smart: ['I am smart.', 'He is smart.', 'She is smart.']
    },
    emoji_map: {
      student: '👨‍🎓',
      teacher: '👨‍🏫',
      school: '🏫',
      classroom: '🏛️',
      backpack: '🎒',
      book: '📕',
      notebook: '📓',
      library: '📚',
      scientist: '🔬',
      tools: '🔨',
      world: '🌍',
      discover: '🔍',
      observe: '👀',
      'magnifying glass': '🔍'
    },
    definitions: {
      name: 'What people call you.',
      brave: 'Not afraid of danger.',
      smart: 'Quick to learn and understand.'
    }
  },
  make_sentence: {
    instructions_easy: 'Unscramble the words to make a correct sentence.',
    instructions_advanced: 'Unscramble the words to make a correct sentence.',
    sentences_easy: [
      { scrambled: ['am', 'I', 'a', 'student'], answer: 'I am a student.' },
      { scrambled: ['is', 'This', 'my', 'book'], answer: 'This is my book.' },
      { scrambled: ['a', 'teacher', 'am', 'I'], answer: 'I am a teacher.' },
      { scrambled: ['is', 'my', 'This', 'notebook'], answer: 'This is my notebook.' },
      { scrambled: ['am', 'I', 'a', 'scientist'], answer: 'I am a scientist.' },
      { scrambled: ['my', 'backpack', 'This', 'is'], answer: 'This is my backpack.' },
      { scrambled: ['student', 'a', 'am', 'I'], answer: 'I am a student.' },
      { scrambled: ['This', 'book', 'my', 'is'], answer: 'This is my book.' },
      { scrambled: ['teacher', 'am', 'I', 'a'], answer: 'I am a teacher.' },
      { scrambled: ['is', 'This', 'notebook', 'my'], answer: 'This is my notebook.' }
    ],
    sentences_advanced: [
      { scrambled: ['am', 'I', 'a', 'student'], answer: 'I am a student.', base_words: ['i', 'am', 'a', 'student'], time_phrases: ['every morning', 'this year', 'in the afternoon', 'on Monday', 'right now'], location_phrases: ['at school', 'in the classroom', 'in the library', 'at this school', 'in my school'] },
      { scrambled: ['is', 'This', 'my', 'library'], answer: 'This is my library.', base_words: ['this', 'is', 'my', 'library'], time_phrases: ['right now', 'today', 'this week', 'every day', 'on weekdays'], location_phrases: ['at school', 'in the building', 'near the classroom', 'on the first floor', 'in our school'] },
      { scrambled: ['a', 'teacher', 'am', 'I'], answer: 'I am a teacher.', base_words: ['i', 'am', 'a', 'teacher'], time_phrases: ['every day', 'this semester', 'in the morning', 'on weekdays', 'right now'], location_phrases: ['at school', 'in the classroom', 'in this building', 'at this school', 'in my classroom'] },
      { scrambled: ['is', 'my', 'This', 'classroom'], answer: 'This is my classroom.', base_words: ['this', 'is', 'my', 'classroom'], time_phrases: ['right now', 'today', 'this year', 'every morning', 'on Monday'], location_phrases: ['at school', 'in the building', 'on the second floor', 'near the library', 'in our school'] },
      { scrambled: ['am', 'I', 'a', 'scientist'], answer: 'I am a scientist.', base_words: ['i', 'am', 'a', 'scientist'], time_phrases: ['every day', 'right now', 'this week', 'in the afternoon', 'on Tuesday'], location_phrases: ['at school', 'in the lab', 'in the classroom', 'at this school', 'in the science room'] },
      { scrambled: ['my', 'backpack', 'This', 'is'], answer: 'This is my backpack.', base_words: ['this', 'is', 'my', 'backpack'], time_phrases: ['right now', 'today', 'this morning', 'every day', 'on Monday'], location_phrases: ['at school', 'in the classroom', 'on my desk', 'near the door', 'in the hallway'] },
      { scrambled: ['student', 'a', 'am', 'I'], answer: 'I am a student.', base_words: ['i', 'am', 'a', 'student'], time_phrases: ['every day', 'this year', 'in the morning', 'on weekdays', 'right now'], location_phrases: ['at school', 'in the classroom', 'in the library', 'at this school', 'in my school'] },
      { scrambled: ['This', 'library', 'my', 'is'], answer: 'This is my library.', base_words: ['this', 'is', 'my', 'library'], time_phrases: ['right now', 'today', 'this week', 'every afternoon', 'on Friday'], location_phrases: ['at school', 'in the building', 'near the classroom', 'on the first floor', 'in our school'] },
      { scrambled: ['teacher', 'am', 'I', 'a'], answer: 'I am a teacher.', base_words: ['i', 'am', 'a', 'teacher'], time_phrases: ['every day', 'this year', 'in the afternoon', 'on weekdays', 'right now'], location_phrases: ['at school', 'in the classroom', 'in this building', 'at this school', 'in my classroom'] },
      { scrambled: ['is', 'This', 'classroom', 'my'], answer: 'This is my classroom.', base_words: ['this', 'is', 'my', 'classroom'], time_phrases: ['right now', 'today', 'this semester', 'every morning', 'on Tuesday'], location_phrases: ['at school', 'in the building', 'on the second floor', 'near the library', 'in our school'] }
    ]
  },
  ask_me: {
    instructions_easy: 'Ask a question that matches the context.',
    instructions_advanced: 'Ask a question that matches the context.',
    contexts_easy: [
      {
        id: 'w1_student_find',
        task_type: 'find_question',
        topic: 'student',
        intro: 'I am a student. Ask me what I am.',
        answer: 'I am a student.',
        acceptedQuestions: [
          'What are you?',
          'What is he?',
          'What is she?'
        ],
        question_hints: ['What are you?', 'What is he?', 'What is she?'],
        required_question_words: ['what'],
        required_keywords: ['student'],
        hints: {
          words: ['what', 'student', 'school'],
          tricky: ['who', 'where']
        }
      },
      {
        id: 'w1_mini_profile',
        task_type: 'mini_interview',
        topic: 'identity',
        intro: 'Interview me: ask my name, then what I do at school.',
        steps: [
          {
            prompt: 'Ask my name.',
            acceptedQuestions: [
              'What is your name?',
              'What is his name?',
              'What is her name?'
            ],
            required_question_words: ['what'],
            required_keywords: ['name'],
            question_hints: ['What is your name?', 'What is his name?', 'What is her name?']
          },
          {
            prompt: 'Ask what I do at school.',
            acceptedQuestions: [
              'What do you do?',
              'What does he do?',
              'What does she do?',
              'What do you do at school?'
            ],
            required_question_words: ['what'],
            required_keywords: ['do'],
            question_hints: ['What do you do?', 'What does he do?', 'What does she do?']
          }
        ],
        hints: {
          words: ['what', 'name', 'do', 'school'],
          tricky: ['where', 'when']
        }
      }
    ],
    contexts_advanced: [
      {
        id: 'w1_student_find',
        task_type: 'find_question',
        topic: 'student',
        intro: 'I am a student. Ask me what I am.',
        answer: 'I am a student.',
        acceptedQuestions: [
          'What are you?',
          'What is he?',
          'What is she?'
        ],
        question_hints: ['What are you?', 'What is he?', 'What is she?'],
        required_question_words: ['what'],
        required_keywords: ['student'],
        hints: {
          words: ['what', 'student', 'school'],
          tricky: ['who', 'where']
        }
      },
      {
        id: 'w1_library_find',
        task_type: 'find_question',
        topic: 'library',
        intro: 'I am in the library. Ask me where I am.',
        answer: 'I am in the library.',
        acceptedQuestions: [
          'Where are you?',
          'Where is he?',
          'Where is she?'
        ],
        question_hints: ['Where are you?', 'Where is he?', 'Where is she?'],
        required_question_words: ['where'],
        required_keywords: ['library'],
        hints: {
          words: ['where', 'library', 'you'],
          tricky: ['who', 'what']
        }
      },
      {
        id: 'w1_teacher_find',
        task_type: 'find_question',
        topic: 'teacher',
        intro: 'She is a teacher. Ask me who she is.',
        answer: 'She is a teacher.',
        acceptedQuestions: [
          'Who is she?',
          'Who is he?',
          'Who is that?'
        ],
        question_hints: ['Who is she?', 'Who is he?', 'Who is that?'],
        required_question_words: ['who'],
        required_keywords: ['she', 'he', 'teacher'],
        hints: {
          words: ['who', 'she', 'teacher'],
          tricky: ['what', 'where']
        }
      },
      {
        id: 'w1_classroom_find',
        task_type: 'find_question',
        topic: 'classroom',
        intro: 'This is my classroom. Ask me what this is.',
        answer: 'This is my classroom.',
        acceptedQuestions: [
          'What is this?',
          'What is that?',
          'What is it?'
        ],
        question_hints: ['What is this?', 'What is that?', 'What is it?'],
        required_question_words: ['what'],
        required_keywords: ['this', 'that', 'it'],
        hints: {
          words: ['what', 'this', 'classroom'],
          tricky: ['who', 'where']
        }
      },
      {
        id: 'w1_book_find',
        task_type: 'find_question',
        topic: 'book',
        intro: 'I have a book. Ask me what I have.',
        answer: 'I have a book.',
        acceptedQuestions: [
          'What do you have?',
          'What does he have?',
          'What does she have?'
        ],
        question_hints: ['What do you have?', 'What does he have?', 'What does she have?'],
        required_question_words: ['what'],
        required_keywords: ['have'],
        hints: {
          words: ['what', 'have', 'book'],
          tricky: ['who', 'where']
        }
      },
      {
        id: 'w1_scientist_find',
        task_type: 'find_question',
        topic: 'scientist',
        intro: 'I am a scientist. Ask me what I am.',
        answer: 'I am a scientist.',
        acceptedQuestions: [
          'What are you?',
          'What is he?',
          'What is she?'
        ],
        question_hints: ['What are you?', 'What is he?', 'What is she?'],
        required_question_words: ['what'],
        required_keywords: ['you', 'he', 'she'],
        hints: {
          words: ['what', 'scientist', 'you'],
          tricky: ['who', 'where']
        }
      },
      {
        id: 'w1_tools_find',
        task_type: 'find_question',
        topic: 'tools',
        intro: 'I use tools to discover the world. Ask me what I use.',
        answer: 'I use tools.',
        acceptedQuestions: [
          'What do you use?',
          'What does he use?',
          'What does she use?'
        ],
        question_hints: ['What do you use?', 'What does he use?', 'What does she use?'],
        required_question_words: ['what'],
        required_keywords: ['use'],
        hints: {
          words: ['what', 'use', 'tools'],
          tricky: ['who', 'where']
        }
      },
      {
        id: 'w1_world_find',
        task_type: 'find_question',
        topic: 'world',
        intro: 'I observe the world. Ask me what I observe.',
        answer: 'I observe the world.',
        acceptedQuestions: [
          'What do you observe?',
          'What does he observe?',
          'What does she observe?'
        ],
        question_hints: ['What do you observe?', 'What does he observe?', 'What does she observe?'],
        required_question_words: ['what'],
        required_keywords: ['observe'],
        hints: {
          words: ['what', 'observe', 'world'],
          tricky: ['who', 'where']
        }
      },
      {
        id: 'w1_mini_profile',
        task_type: 'mini_interview',
        topic: 'identity',
        intro: 'Interview me: ask my name, then what I do at school.',
        steps: [
          {
            prompt: 'Ask my name.',
            acceptedQuestions: [
              'What is your name?',
              'What is his name?',
              'What is her name?'
            ],
            required_question_words: ['what'],
            required_keywords: ['name'],
            question_hints: ['What is your name?', 'What is his name?', 'What is her name?']
          },
          {
            prompt: 'Ask what I do at school.',
            acceptedQuestions: [
              'What do you do?',
              'What does he do?',
              'What does she do?',
              'What do you do at school?'
            ],
            required_question_words: ['what'],
            required_keywords: ['do'],
            question_hints: ['What do you do?', 'What does he do?', 'What does she do?']
          }
        ],
        hints: {
          words: ['what', 'name', 'do', 'school'],
          tricky: ['where', 'when']
        }
      },
      {
        id: 'w1_mini_science',
        task_type: 'mini_interview',
        topic: 'science',
        intro: 'Interview me: ask what I study, then what tools I use.',
        steps: [
          {
            prompt: 'Ask what I study.',
            acceptedQuestions: [
              'What do you study?',
              'What does he study?',
              'What does she study?'
            ],
            required_question_words: ['what'],
            required_keywords: ['study'],
            question_hints: ['What do you study?', 'What does he study?', 'What does she study?']
          },
          {
            prompt: 'Ask what tools I use.',
            acceptedQuestions: [
              'What tools do you use?',
              'What tools does he use?',
              'What tools does she use?',
              'What do you use?'
            ],
            required_question_words: ['what'],
            required_keywords: ['tools'],
            question_hints: ['What tools do you use?', 'What tools does he use?', 'What tools does she use?']
          }
        ],
        hints: {
          words: ['what', 'study', 'tools'],
          tricky: ['why', 'when']
        }
      }
    ],
    required_question_words_easy: ['what', 'is'],
    required_question_words_advanced: ['what', 'is', 'are']
  }
};

export default week1GamesAdvanced;
