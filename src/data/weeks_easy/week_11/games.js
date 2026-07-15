/**
 * Week 11 Game Data - Easy Mode (New GameHub)
 * Theme: Weekend Fun Spots (Places)
 * Grammar: Preposition "at"
 */

export const week11GamesEasy = {
  vocabulary: [
    'park', 'playground', 'school', 'library', 'store',
    'eat', 'zoo', 'play', 'read', 'buy'
  ],
  show_tell: {
    steps: 3,
    word_list: [
      'park', 'playground', 'school', 'library', 'store',
      'eat', 'zoo', 'play', 'read', 'buy'
    ],
    instructions_easy: 'Say the word, add a phrase, then make a full sentence.',
    instructions_advanced: 'Say the word, add a phrase, then make a full sentence.',
    step_instructions: {
      1: 'Step 1: say the word clearly.',
      2: 'Step 2: add a short phrase with the word.',
      3: 'Step 3: make a full sentence.'
    },
    frames_easy: ['I ___ at the ___', 'I go to the ___'],
    frames_advanced: ['I ___ at the ___', 'I go to the ___'],
    details_easy: [],
    details_advanced: [],
    detail_map: {
      park: ['the park', 'a big park', 'my park', 'fun park'],
      playground: ['the playground', 'a fun playground', 'my playground', 'big playground'],
      school: ['the school', 'my school', 'a big school', 'fun school'],
      library: ['the library', 'a big library', 'my library', 'fun library'],
      store: ['the store', 'a big store', 'my store', 'fun store'],
      eat: ['eat food', 'eat lunch', 'eat here', 'eat now'],
      zoo: ['the zoo', 'a big zoo', 'my zoo', 'fun zoo'],
      play: ['play now', 'play here', 'play ball', 'play fun'],
      read: ['read books', 'read now', 'read here', 'read fun'],
      buy: ['buy food', 'buy toys', 'buy now', 'buy here']
    },
    distractors_easy: [],
    distractors_advanced: [],
    distractor_map: {
      park: ['the store', 'the zoo', 'the school'],
      playground: ['the library', 'the park', 'the store'],
      school: ['the zoo', 'the park', 'the playground'],
      library: ['the store', 'the school', 'the park'],
      store: ['the zoo', 'the library', 'the park']
    },
    frame_map: {
      park: ['I ___ at the park'],
      playground: ['I ___ at the playground'],
      school: ['I go to the school'],
      library: ['I ___ at the library'],
      store: ['I ___ at the store'],
      zoo: ['I go to the zoo'],
      play: ['I play at the ___'],
      read: ['I read at the ___'],
      eat: ['I eat at the ___'],
      buy: ['I buy at the ___']
    },
    sentence_hints_map: {
      park: ['I play at the park.', 'I go to the park.', 'I run at the park.'],
      playground: ['I play at the playground.', 'I go to the playground.', 'I run at the playground.'],
      school: ['I go to school.', 'I play at school.', 'I learn at school.'],
      library: ['I read at the library.', 'I go to the library.', 'I study at the library.'],
      store: ['I buy at the store.', 'I go to the store.', 'I shop at the store.'],
      eat: ['I eat at the store.', 'I eat at school.', 'I eat food.'],
      zoo: ['I go to the zoo.', 'I see animals at the zoo.', 'I play at the zoo.'],
      play: ['I play at the park.', 'I play at the playground.', 'I play at school.'],
      read: ['I read at the library.', 'I read at school.', 'I read books.'],
      buy: ['I buy at the store.', 'I buy food.', 'I buy toys.']
    },
    emoji_map: {
      park: '🏞️',
      playground: '🛝',
      school: '🏫',
      library: '📚',
      store: '🏪',
      eat: '🍽️',
      zoo: '🦁',
      play: '⚽',
      read: '📖',
      buy: '🛒'
    },
    definitions: {
      park: 'A place to play outside.',
      playground: 'A place with swings.',
      library: 'A place with books.',
      store: 'A place to buy things.',
      zoo: 'A place with animals.'
    }
  },
  make_sentence: {
    instructions_easy: 'Unscramble the words to make a correct sentence.',
    instructions_advanced: 'Unscramble the words to make a correct sentence.',
    sentences_easy: [
      { scrambled: ['I', 'play', 'at', 'the', 'park'], answer: 'I play at the park.', base_words: ['I', 'play', 'at', 'the', 'park'], time_phrases: ['today', 'now', 'on weekends'], location_phrases: ['with friends', 'alone', 'with family'] },
      { scrambled: ['I', 'read', 'at', 'the', 'library'], answer: 'I read at the library.', base_words: ['I', 'read', 'at', 'the', 'library'], time_phrases: ['today', 'now', 'every day'], location_phrases: ['with friends', 'alone', 'quietly'] },
      { scrambled: ['I', 'go', 'to', 'school'], answer: 'I go to school.', base_words: ['I', 'go', 'to', 'school'], time_phrases: ['today', 'now', 'every day'], location_phrases: ['by bus', 'with friends', 'alone'] },
      { scrambled: ['I', 'buy', 'at', 'the', 'store'], answer: 'I buy at the store.', base_words: ['I', 'buy', 'at', 'the', 'store'], time_phrases: ['today', 'now', 'on weekends'], location_phrases: ['with mom', 'with dad', 'alone'] },
      { scrambled: ['I', 'go', 'to', 'the', 'zoo'], answer: 'I go to the zoo.', base_words: ['I', 'go', 'to', 'the', 'zoo'], time_phrases: ['today', 'now', 'on weekends'], location_phrases: ['with family', 'with friends', 'alone'] },
      { scrambled: ['I', 'play', 'at', 'the', 'playground'], answer: 'I play at the playground.', base_words: ['I', 'play', 'at', 'the', 'playground'], time_phrases: ['today', 'now', 'on Saturday'], location_phrases: ['with friends', 'alone', 'with sister'] },
      { scrambled: ['I', 'eat', 'at', 'school'], answer: 'I eat at school.', base_words: ['I', 'eat', 'at', 'school'], time_phrases: ['today', 'now', 'every day'], location_phrases: ['with friends', 'alone', 'at lunch'] },
      { scrambled: ['I', 'see', 'animals', 'at', 'the', 'zoo'], answer: 'I see animals at the zoo.', base_words: ['I', 'see', 'animals', 'at', 'the', 'zoo'], time_phrases: ['today', 'now', 'on weekends'], location_phrases: ['with family', 'with friends'] },
      { scrambled: [' play', 'I', 'at', 'school'], answer: 'I play at school.', base_words: ['I', 'play', 'at', 'school'], time_phrases: ['today', 'now', 'every day'], location_phrases: ['with friends', 'at recess'] },
      { scrambled: ['read', 'I', 'books', 'at', 'the', 'library'], answer: 'I read books at the library.', base_words: ['I', 'read', 'books', 'at', 'the', 'library'], time_phrases: ['today', 'now', 'on Saturday'], location_phrases: ['quietly', 'alone'] }
    ],
    sentences_advanced: [
      { scrambled: ['I', 'play', 'at', 'the', 'park'], answer: 'I play at the park.', base_words: ['I', 'play', 'at', 'the', 'park'], time_phrases: ['today', 'now', 'on weekends'], location_phrases: ['with friends', 'alone', 'with family'] },
      { scrambled: ['I', 'read', 'at', 'the', 'library'], answer: 'I read at the library.', base_words: ['I', 'read', 'at', 'the', 'library'], time_phrases: ['today', 'now', 'every day'], location_phrases: ['with friends', 'alone', 'quietly'] },
      { scrambled: ['go', 'I', 'to', 'school'], answer: 'I go to school.', base_words: ['I', 'go', 'to', 'school'], time_phrases: ['today', 'now', 'every day'], location_phrases: ['by bus', 'with friends', 'alone'] },
      { scrambled: ['I', 'buy', 'at', 'the', 'store'], answer: 'I buy at the store.', base_words: ['I', 'buy', 'at', 'the', 'store'], time_phrases: ['today', 'now', 'on weekends'], location_phrases: ['with mom', 'with dad', 'alone'] },
      { scrambled: ['I', 'go', 'zoo', 'to', 'the'], answer: 'I go to the zoo.', base_words: ['I', 'go', 'to', 'the', 'zoo'], time_phrases: ['today', 'now', 'on weekends'], location_phrases: ['with family', 'with friends', 'alone'] },
      { scrambled: ['play', 'I', 'at', 'the', 'playground'], answer: 'I play at the playground.', base_words: ['I', 'play', 'at', 'the', 'playground'], time_phrases: ['today', 'now', 'on Saturday'], location_phrases: ['with friends', 'alone', 'with sister'] },
      { scrambled: ['eat', 'I', 'at', 'school'], answer: 'I eat at school.', base_words: ['I', 'eat', 'at', 'school'], time_phrases: ['today', 'now', 'every day'], location_phrases: ['with friends', 'alone', 'at lunch'] },
      { scrambled: ['see', 'I', 'animals', 'at', 'the', 'zoo'], answer: 'I see animals at the zoo.', base_words: ['I', 'see', 'animals', 'at', 'the', 'zoo'], time_phrases: ['today', 'now', 'on weekends'], location_phrases: ['with family', 'with friends'] },
      { scrambled: ['I', 'play', 'school', 'at'], answer: 'I play at school.', base_words: ['I', 'play', 'at', 'school'], time_phrases: ['today', 'now', 'every day'], location_phrases: ['with friends', 'at recess'] },
      { scrambled: ['read', 'I', 'books', 'library', 'at', 'the'], answer: 'I read books at the library.', base_words: ['I', 'read', 'books', 'at', 'the', 'library'], time_phrases: ['today', 'now', 'on Saturday'], location_phrases: ['quietly', 'alone'] }
    ]
  },
  ask_me: {
    instructions_easy: 'Ask a question that matches the context.',
    instructions_advanced: 'Ask a question that matches the context.',
    contexts_easy: [
      {
        id: 'w11_park_where',
        task_type: 'find_question',
        topic: 'park',
        intro: 'I play at the park. Ask me where I play.',
        acceptedQuestions: [
          'Where do you play?',
          'Where is the park?',
          'Where do you go?'
        ],
        answer: 'I play at the park.',
        question_hints: ['Where do you play?', 'Where is the park?', 'Where do you go?'],
        required_question_words: ['where'],
        required_keywords: ['play', 'park'],
        hints: {
          words: ['where', 'do', 'you', 'play'],
          tricky: ['what', 'who']
        }
      },
      {
        id: 'w11_library_where',
        task_type: 'find_question',
        topic: 'library',
        intro: 'I read at the library. Ask me where I read.',
        acceptedQuestions: [
          'Where do you read?',
          'Where is the library?',
          'Where do you go?'
        ],
        answer: 'I read at the library.',
        question_hints: ['Where do you read?', 'Where is the library?', 'Where do you go?'],
        required_question_words: ['where'],
        required_keywords: ['read', 'library'],
        hints: {
          words: ['where', 'do', 'you', 'read'],
          tricky: ['what', 'who']
        }
      },
      {
        id: 'w11_school_where',
        task_type: 'find_question',
        topic: 'school',
        intro: 'I go to school. Ask me where I go.',
        acceptedQuestions: [
          'Where do you go?',
          'Where is school?',
          'Where is the school?'
        ],
        answer: 'I go to school.',
        question_hints: ['Where do you go?', 'Where is school?', 'Where is the school?'],
        required_question_words: ['where'],
        required_keywords: ['go', 'school'],
        hints: {
          words: ['where', 'do', 'you', 'go'],
          tricky: ['what', 'who']
        }
      },
      {
        id: 'w11_store_where',
        task_type: 'find_question',
        topic: 'store',
        intro: 'I buy at the store. Ask me where I buy.',
        acceptedQuestions: [
          'Where do you buy?',
          'Where is the store?',
          'Where do you go?'
        ],
        answer: 'I buy at the store.',
        question_hints: ['Where do you buy?', 'Where is the store?', 'Where do you go?'],
        required_question_words: ['where'],
        required_keywords: ['buy', 'store'],
        hints: {
          words: ['where', 'do', 'you', 'buy'],
          tricky: ['what', 'who']
        }
      },
      {
        id: 'w11_zoo_where',
        task_type: 'find_question',
        topic: 'zoo',
        intro: 'I see animals at the zoo. Ask me where I see animals.',
        acceptedQuestions: [
          'Where do you see animals?',
          'Where is the zoo?',
          'Where do you go?'
        ],
        answer: 'I see animals at the zoo.',
        question_hints: ['Where do you see animals?', 'Where is the zoo?', 'Where do you go?'],
        required_question_words: ['where'],
        required_keywords: ['see', 'animals', 'zoo'],
        hints: {
          words: ['where', 'do', 'you', 'see', 'animals'],
          tricky: ['what', 'who']
        }
      },
      {
        id: 'w11_playground_where',
        task_type: 'find_question',
        topic: 'playground',
        intro: 'I play at the playground. Ask me where I play.',
        acceptedQuestions: [
          'Where do you play?',
          'Where is the playground?',
          'Where do you go?'
        ],
        answer: 'I play at the playground.',
        question_hints: ['Where do you play?', 'Where is the playground?', 'Where do you go?'],
        required_question_words: ['where'],
        required_keywords: ['play', 'playground'],
        hints: {
          words: ['where', 'do', 'you', 'play'],
          tricky: ['what', 'who']
        }
      },
      {
        id: 'w11_eat_where',
        task_type: 'find_question',
        topic: 'eat',
        intro: 'I eat at school. Ask me where I eat.',
        acceptedQuestions: [
          'Where do you eat?',
          'Where is school?',
          'Where do you go?'
        ],
        answer: 'I eat at school.',
        question_hints: ['Where do you eat?', 'Where is school?', 'Where do you go?'],
        required_question_words: ['where'],
        required_keywords: ['eat', 'school'],
        hints: {
          words: ['where', 'do', 'you', 'eat'],
          tricky: ['what', 'who']
        }
      },
      {
        id: 'w11_play_what',
        task_type: 'find_question',
        topic: 'play',
        intro: 'I play at the park. Ask me what I do.',
        acceptedQuestions: [
          'What do you do?',
          'What do you play?',
          'What is it?'
        ],
        answer: 'I play.',
        question_hints: ['What do you do?', 'What do you play?', 'What is it?'],
        required_question_words: ['what'],
        required_keywords: ['do', 'play'],
        hints: {
          words: ['what', 'do', 'you', 'do'],
          tricky: ['where', 'who']
        }
      },
      {
        id: 'w11_read_what',
        task_type: 'find_question',
        topic: 'read',
        intro: 'I read books at the library. Ask me what I read.',
        acceptedQuestions: [
          'What do you read?',
          'What are they?',
          'What is it?'
        ],
        answer: 'I read books.',
        question_hints: ['What do you read?', 'What are they?', 'What is it?'],
        required_question_words: ['what'],
        required_keywords: ['read', 'books'],
        hints: {
          words: ['what', 'do', 'you', 'read'],
          tricky: ['where', 'who']
        }
      },
      {
        id: 'w11_buy_what',
        task_type: 'find_question',
        topic: 'buy',
        intro: 'I buy food at the store. Ask me what I buy.',
        acceptedQuestions: [
          'What do you buy?',
          'What is it?',
          'What are they?'
        ],
        answer: 'I buy food.',
        question_hints: ['What do you buy?', 'What is it?', 'What are they?'],
        required_question_words: ['what'],
        required_keywords: ['buy', 'food'],
        hints: {
          words: ['what', 'do', 'you', 'buy'],
          tricky: ['where', 'who']
        }
      }
    ],
    contexts_advanced: [
      {
        id: 'w11_adv_park_where',
        task_type: 'find_question',
        topic: 'park',
        intro: 'I have fun at the park on weekends. Ask me where I have fun.',
        acceptedQuestions: [
          'Where do you have fun?',
          'Where is the park?',
          'Where do you go on weekends?'
        ],
        answer: 'I have fun at the park.',
        question_hints: ['Where do you have fun?', 'Where is the park?', 'Where do you go?'],
        required_question_words: ['where'],
        required_keywords: ['fun', 'park'],
        hints: {
          words: ['where', 'do', 'you', 'have', 'fun'],
          tricky: ['what', 'who']
        }
      },
      {
        id: 'w11_adv_library_where',
        task_type: 'find_question',
        topic: 'library',
        intro: 'I read interesting books at the library. Ask me where I read books.',
        acceptedQuestions: [
          'Where do you read books?',
          'Where is the library?',
          'Where do you go?'
        ],
        answer: 'I read books at the library.',
        question_hints: ['Where do you read books?', 'Where is the library?', 'Where do you go?'],
        required_question_words: ['where'],
        required_keywords: ['read', 'library'],
        hints: {
          words: ['where', 'do', 'you', 'read', 'books'],
          tricky: ['what', 'who']
        }
      },
      {
        id: 'w11_adv_zoo_where',
        task_type: 'find_question',
        topic: 'zoo',
        intro: 'I see many animals at the zoo. Ask me where I see animals.',
        acceptedQuestions: [
          'Where do you see animals?',
          'Where is the zoo?',
          'Where do you go?'
        ],
        answer: 'I see animals at the zoo.',
        question_hints: ['Where do you see animals?', 'Where is the zoo?', 'Where do you go?'],
        required_question_words: ['where'],
        required_keywords: ['see', 'animals', 'zoo'],
        hints: {
          words: ['where', 'do', 'you', 'see', 'animals'],
          tricky: ['what', 'who']
        }
      },
      {
        id: 'w11_adv_store_when',
        task_type: 'find_question',
        topic: 'store',
        intro: 'I buy food at the store on Saturday. Ask me when I buy food.',
        acceptedQuestions: [
          'When do you buy food?',
          'When do you go?',
          'When is it?'
        ],
        answer: 'On Saturday.',
        question_hints: ['When do you buy food?', 'When do you go?', 'When is it?'],
        required_question_words: ['when'],
        required_keywords: ['buy', 'food'],
        hints: {
          words: ['when', 'do', 'you', 'buy', 'food'],
          tricky: ['where', 'who']
        }
      },
      {
        id: 'w11_adv_playground_what',
        task_type: 'find_question',
        topic: 'playground',
        intro: 'I play games at the playground with my friends. Ask me what I do.',
        acceptedQuestions: [
          'What do you do?',
          'What do you play?',
          'What games do you play?'
        ],
        answer: 'I play games.',
        question_hints: ['What do you do?', 'What do you play?', 'What games do you play?'],
        required_question_words: ['what'],
        required_keywords: ['do', 'play'],
        hints: {
          words: ['what', 'do', 'you', 'do'],
          tricky: ['where', 'who']
        }
      }
    ]
  }
};

export default week11GamesEasy;
