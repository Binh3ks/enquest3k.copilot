/**
 * Week 11 Game Data - Advanced Mode (New GameHub)  
 * Theme: Weekend Fun Spots (Places)
 * Grammar: Preposition "at"
 */

export const week11GamesAdvanced = {
  vocabulary: [
    'park', 'playground', 'school', 'library', 'supermarket',
    'restaurant', 'zoo', 'play', 'read', 'buy'
  ],
  show_tell: {
    steps: 3,
    word_list: [
      'park', 'playground', 'school', 'library', 'supermarket',
      'restaurant', 'zoo', 'play', 'read', 'buy'
    ],
    instructions_easy: 'Say the word, add a phrase, then make a full sentence.',
    instructions_advanced: 'Say the word, add details, then create a complete sentence.',
    step_instructions: {
      1: 'Step 1: say the word clearly with correct pronunciation.',
      2: 'Step 2: add descriptive details about the word.',
      3: 'Step 3: create a complete, grammatically correct sentence.'
    },
    frames_easy: ['I ___ at the ___', 'I go to the ___'],
    frames_advanced: ['I usually ___ at the ___', 'I like to go to the ___', 'On weekends, I ___ at the ___'],
    details_easy: [],
    details_advanced: [],
    detail_map: {
      park: ['the beautiful park', 'a park near my house', 'the city park', 'a large park'],
      playground: ['the fun playground', 'a playground nearby', 'the school playground', 'a big playground'],
      school: ['my school', 'a school near home', 'the elementary school', 'a big school'],
      library: ['the public library', 'a quiet library', 'the city library', 'a large library'],
      supermarket: ['the big supermarket', 'a supermarket nearby', 'the city supermarket', 'a large supermarket'],
      restaurant: ['my favorite restaurant', 'a nice restaurant', 'the Italian restaurant', 'a family restaurant'],
      zoo: ['the city zoo', 'a large zoo', 'the wildlife zoo', 'a famous zoo'],
      play: ['play games', 'play sports', 'play with friends', 'play outside'],
      read: ['read interesting books', 'read stories', 'read quietly', 'read every day'],
      buy: ['buy fresh food', 'buy groceries', 'buy things', 'buy with family']
    },
    distractors_easy: [],
    distractors_advanced: [],
    distractor_map: {
      park: ['the supermarket', 'the zoo', 'the library'],
      playground: ['the restaurant', 'the park', 'the school'],
      school: ['the zoo', 'the supermarket', 'the playground'],
      library: ['the restaurant', 'the school', 'the park'],
      supermarket: ['the zoo', 'the library', 'the restaurant']
    },
    frame_map: {
      park: ['I ___ at the park', 'I have fun at the park'],
      playground: ['I ___ at the playground', 'I play at the playground'],
      school: ['I go to school', 'I learn at school'],
      library: ['I ___ at the library', 'I read at the library'],
      supermarket: ['I ___ at the supermarket', 'I buy at the supermarket'],
      restaurant: ['I ___ at the restaurant', 'I eat at the restaurant'],
      zoo: ['I go to the zoo', 'I see animals at the zoo'],
      play: ['I play at the ___', 'I like to play at the ___'],
      read: ['I read at the ___', 'I love to read at the ___'],
      buy: ['I buy at the ___', 'I like to buy at the ___']
    },
    sentence_hints_map: {
      park: ['I play at the park on weekends.', 'I go to the park with my family.', 'I have fun at the park.'],
      playground: ['I play at the playground every day.', 'I go to the playground after school.', 'I meet friends at the playground.'],
      school: ['I go to school every morning.', 'I learn at school.', 'I meet my friends at school.'],
      library: ['I read books at the library.', 'I go to the library on Saturday.', 'I study at the library.'],
      supermarket: ['I buy food at the supermarket.', 'I go to the supermarket with my mom.', 'I shop at the supermarket on weekends.'],
      restaurant: ['I eat at the restaurant.', 'I go to the restaurant with my family.', 'I like the food at the restaurant.'],
      zoo: ['I see animals at the zoo.', 'I go to the zoo on weekends.', 'I have fun at the zoo.'],
      play: ['I play at the park.', 'I play at the playground after school.', 'I love to play with my friends.'],
      read: ['I read at the library.', 'I read books every day at school.', 'I enjoy reading interesting stories.'],
      buy: ['I buy food at the supermarket.', 'I buy things at the store.', 'I like to buy toys.']
    },
    emoji_map: {
      park: '🏞️',
      playground: '🛝',
      school: '🏫',
      library: '📚',
      supermarket: '🛒',
      restaurant: '🍽️',
      zoo: '🦁',
      play: '⚽',
      read: '📖',
      buy: '🛍️'
    },
    definitions: {
      park: 'A large outdoor area with grass and trees for recreation.',
      playground: 'A place with equipment like swings and slides for children.',
      library: 'A building with many books you can read or borrow.',
      supermarket: 'A large store where you buy food and household items.',
      restaurant: 'A place where you pay to eat prepared meals.',
      zoo: 'A place where wild animals are kept for people to see.'
    }
  },
  make_sentence: {
    instructions_easy: 'Unscramble the words to make a correct sentence.',
    instructions_advanced: 'Unscramble the words to form grammatically correct sentences.',
    sentences_easy: [
      { scrambled: ['I', 'play', 'at', 'the', 'park'], answer: 'I play at the park.', base_words: ['I', 'play', 'at', 'the', 'park'], time_phrases: ['on weekends', 'every day', 'today'], location_phrases: ['with friends', 'with family', 'alone'] },
      { scrambled: ['I', 'read', 'at', 'the', 'library'], answer: 'I read at the library.', base_words: ['I', 'read', 'at', 'the', 'library'], time_phrases: ['on Saturday', 'every week', 'today'], location_phrases: ['quietly', 'with friends', 'alone'] },
      { scrambled: ['I', 'go', 'to', 'school'], answer: 'I go to school.', base_words: ['I', 'go', 'to', 'school'], time_phrases: ['every morning', 'every day', 'today'], location_phrases: ['by bus', 'on foot', 'with friends'] },
      { scrambled: ['I', 'buy', 'at', 'the', 'supermarket'], answer: 'I buy at the supermarket.', base_words: ['I', 'buy', 'at', 'the', 'supermarket'], time_phrases: ['on Saturday', 'every week', 'today'], location_phrases: ['with mom', 'with dad', 'with family'] },
      { scrambled: ['I', 'go', 'to', 'the', 'zoo'], answer: 'I go to the zoo.', base_words: ['I', 'go', 'to', 'the', 'zoo'], time_phrases: ['on Sunday', 'on weekends', 'today'], location_phrases: ['with family', 'with friends', 'with class'] },
      { scrambled: ['I', 'play', 'at', 'the', 'playground'], answer: 'I play at the playground.', base_words: ['I', 'play', 'at', 'the', 'playground'], time_phrases: ['after school', 'every day', 'today'], location_phrases: ['with friends', 'with sister', 'alone'] },
      { scrambled: ['I', 'eat', 'at', 'the', 'restaurant'], answer: 'I eat at the restaurant.', base_words: ['I', 'eat', 'at', 'the', 'restaurant'], time_phrases: ['on Sunday', 'on weekends', 'today'], location_phrases: ['with family', 'with friends', 'with parents'] },
      { scrambled: ['I', 'see', 'animals', 'at', 'the', 'zoo'], answer: 'I see animals at the zoo.', base_words: ['I', 'see', 'animals', 'at', 'the', 'zoo'], time_phrases: ['on weekends', 'today', 'every month'], location_phrases: ['with family', 'with school', 'with friends'] },
      { scrambled: ['I', 'have', 'fun', 'at', 'the', 'park'], answer: 'I have fun at the park.', base_words: ['I', 'have', 'fun', 'at', 'the', 'park'], time_phrases: ['on Saturday', 'every weekend', 'today'], location_phrases: ['with friends', 'with family', 'with classmates'] },
      { scrambled: ['I', 'read', 'books', 'at', 'the', 'library'], answer: 'I read books at the library.', base_words: ['I', 'read', 'books', 'at', 'the', 'library'], time_phrases: ['every Saturday', 'every week', 'today'], location_phrases: ['quietly', 'with friends', 'alone'] }
    ],
    sentences_advanced: [
      { scrambled: ['play', 'I', 'at', 'the', 'park', 'on', 'weekends'], answer: 'I play at the park on weekends.', base_words: ['I', 'play', 'at', 'the', 'park'], time_phrases: ['on weekends', 'every Saturday', 'today'], location_phrases: ['with friends', 'with family'] },
      { scrambled: ['I', 'read', 'interesting', 'books', 'at', 'the', 'library'], answer: 'I read interesting books at the library.', base_words: ['I', 'read', 'books', 'at', 'the', 'library'], time_phrases: ['every week', 'on Saturday', 'today'], location_phrases: ['quietly', 'alone'] },
      { scrambled: ['go', 'I', 'to', 'school', 'every', 'morning'], answer: 'I go to school every morning.', base_words: ['I', 'go', 'to', 'school'], time_phrases: ['every morning', 'every day', 'today'], location_phrases: ['by bus', 'on foot'] },
      { scrambled: ['buy', 'I', 'fresh', 'food', 'at', 'the', 'supermarket'], answer: 'I buy fresh food at the supermarket.', base_words: ['I', 'buy', 'food', 'at', 'the', 'supermarket'], time_phrases: ['on Saturday', 'every week', 'today'], location_phrases: ['with mom', 'with family'] },
      { scrambled: ['the', 'zoo', 'I', 'go', 'to', 'on', 'Sunday'], answer: 'I go to the zoo on Sunday.', base_words: ['I', 'go', 'to', 'the', 'zoo'], time_phrases: ['on Sunday', 'on weekends', 'today'], location_phrases: ['with family', 'with friends'] },
      { scrambled: ['at', 'the', 'playground', 'I', 'play', 'after', 'school'], answer: 'I play at the playground after school.', base_words: ['I', 'play', 'at', 'the', 'playground'], time_phrases: ['after school', 'every day', 'today'], location_phrases: ['with friends', 'with classmates'] },
      { scrambled: ['eat', 'I', 'delicious', 'food', 'at', 'the', 'restaurant'], answer: 'I eat delicious food at the restaurant.', base_words: ['I', 'eat', 'food', 'at', 'the', 'restaurant'], time_phrases: ['on Sunday', 'on weekends', 'today'], location_phrases: ['with family', 'with parents'] },
      { scrambled: ['see', 'I', 'many', 'animals', 'at', 'the', 'zoo'], answer: 'I see many animals at the zoo.', base_words: ['I', 'see', 'animals', 'at', 'the', 'zoo'], time_phrases: ['on weekends', 'today', 'every month'], location_phrases: ['with family', 'with school'] },
      { scrambled: ['have', 'I', 'fun', 'at', 'the', 'park', 'with', 'friends'], answer: 'I have fun at the park with friends.', base_words: ['I', 'have', 'fun', 'at', 'the', 'park'], time_phrases: ['on Saturday', 'every weekend', 'today'], location_phrases: ['with friends', 'with classmates'] },
      { scrambled: ['books', 'I', 'read', 'at', 'the', 'library', 'every', 'Saturday'], answer: 'I read books at the library every Saturday.', base_words: ['I', 'read', 'books', 'at', 'the', 'library'], time_phrases: ['every Saturday', 'every week', 'today'], location_phrases: ['quietly', 'alone'] }
    ]
  },
  ask_me: {
    instructions_easy: 'Ask a question that matches the context.',
    instructions_advanced: 'Formulate an appropriate question based on the given context.',
    contexts_easy: [
      {
        id: 'w11_park_where',
        task_type: 'find_question',
        topic: 'park',
        intro: 'I play at the park on weekends. Ask me where I play.',
        acceptedQuestions: [
          'Where do you play?',
          'Where is the park?',
          'Where do you go on weekends?'
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
        intro: 'I read books at the library. Ask me where I read books.',
        acceptedQuestions: [
          'Where do you read books?',
          'Where is the library?',
          'Where do you read?'
        ],
        answer: 'I read books at the library.',
        question_hints: ['Where do you read books?', 'Where is the library?', 'Where do you read?'],
        required_question_words: ['where'],
        required_keywords: ['read', 'library'],
        hints: {
          words: ['where', 'do', 'you', 'read', 'books'],
          tricky: ['what', 'who']
        }
      },
      {
        id: 'w11_school_when',
        task_type: 'find_question',
        topic: 'school',
        intro: 'I go to school every morning. Ask me when I go to school.',
        acceptedQuestions: [
          'When do you go to school?',
          'When do you go?',
          'When is it?'
        ],
        answer: 'Every morning.',
        question_hints: ['When do you go to school?', 'When do you go?', 'When is it?'],
        required_question_words: ['when'],
        required_keywords: ['go', 'school'],
        hints: {
          words: ['when', 'do', 'you', 'go', 'to', 'school'],
          tricky: ['where', 'what']
        }
      },
      {
        id: 'w11_supermarket_where',
        task_type: 'find_question',
        topic: 'supermarket',
        intro: 'I buy food at the supermarket. Ask me where I buy food.',
        acceptedQuestions: [
          'Where do you buy food?',
          'Where is the supermarket?',
          'Where do you buy?'
        ],
        answer: 'I buy food at the supermarket.',
        question_hints: ['Where do you buy food?', 'Where is the supermarket?', 'Where do you buy?'],
        required_question_words: ['where'],
        required_keywords: ['buy', 'supermarket'],
        hints: {
          words: ['where', 'do', 'you', 'buy', 'food'],
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
        intro: 'I play at the playground after school. Ask me where I play.',
        acceptedQuestions: [
          'Where do you play?',
          'Where is the playground?',
          'Where do you go after school?'
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
        id: 'w11_restaurant_where',
        task_type: 'find_question',
        topic: 'restaurant',
        intro: 'I eat at the restaurant on Sunday. Ask me where I eat.',
        acceptedQuestions: [
          'Where do you eat?',
          'Where is the restaurant?',
          'Where do you go on Sunday?'
        ],
        answer: 'I eat at the restaurant.',
        question_hints: ['Where do you eat?', 'Where is the restaurant?', 'Where do you go?'],
        required_question_words: ['where'],
        required_keywords: ['eat', 'restaurant'],
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
        intro: 'I buy food at the supermarket. Ask me what I buy.',
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
        intro: 'I have a lot of fun at the park on weekends with my friends. Ask me where I have fun.',
        acceptedQuestions: [
          'Where do you have fun?',
          'Where is the park?',
          'Where do you go on weekends?'
        ],
        answer: 'I have fun at the park.',
        question_hints: ['Where do you have fun?', 'Where is the park?', 'Where do you go on weekends?'],
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
        intro: 'I read interesting books at the public library every Saturday. Ask me where I read books.',
        acceptedQuestions: [
          'Where do you read books?',
          'Where is the library?',
          'Where do you read?'
        ],
        answer: 'I read books at the library.',
        question_hints: ['Where do you read books?', 'Where is the library?', 'Where do you read?'],
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
        intro: 'I see many different animals at the city zoo. Ask me where I see animals.',
        acceptedQuestions: [
          'Where do you see animals?',
          'Where is the zoo?',
          'Where do you see different animals?'
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
        id: 'w11_adv_supermarket_when',
        task_type: 'find_question',
        topic: 'supermarket',
        intro: 'I buy fresh food at the supermarket on Saturday mornings. Ask me when I buy food.',
        acceptedQuestions: [
          'When do you buy food?',
          'When do you go to the supermarket?',
          'When do you buy fresh food?'
        ],
        answer: 'On Saturday mornings.',
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
        intro: 'I play exciting games at the playground with my classmates after school. Ask me what I do.',
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
      },
      {
        id: 'w11_adv_restaurant_who',
        task_type: 'find_question',
        topic: 'restaurant',
        intro: 'I eat delicious food at the restaurant with my family. Ask me who I eat with.',
        acceptedQuestions: [
          'Who do you eat with?',
          'Who are they?',
          'Who goes with you?'
        ],
        answer: 'With my family.',
        question_hints: ['Who do you eat with?', 'Who are they?', 'Who goes with you?'],
        required_question_words: ['who'],
        required_keywords: ['eat', 'with'],
        hints: {
          words: ['who', 'do', 'you', 'eat', 'with'],
          tricky: ['where', 'what']
        }
      },
      {
        id: 'w11_adv_school_what',
        task_type: 'find_question',
        topic: 'school',
        intro: 'I learn many interesting things at school every day. Ask me what I learn.',
        acceptedQuestions: [
          'What do you learn?',
          'What are they?',
          'What things do you learn?'
        ],
        answer: 'I learn many things.',
        question_hints: ['What do you learn?', 'What are they?', 'What is it?'],
        required_question_words: ['what'],
        required_keywords: ['learn', 'things'],
        hints: {
          words: ['what', 'do', 'you', 'learn'],
          tricky: ['where', 'who']
        }
      }
    ]
  }
};

export default week11GamesAdvanced;
