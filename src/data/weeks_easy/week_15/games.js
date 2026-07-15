/**
 * Week 15 Game Data - Easy Mode (New GameHub)
 * Theme: My Day at the Park - Present Continuous
 */

export const week15GamesEasy = {
  vocabulary: [
    'running', 'walking', 'sitting', 'eating', 'flying',
    'playing', 'jogging', 'relaxing', 'picnic', 'fountain'
  ],
  show_tell: {
    steps: 3,
    word_list: [
      'running', 'walking', 'sitting', 'eating', 'flying',
      'playing', 'jogging', 'relaxing', 'picnic', 'fountain'
    ],
    instructions_easy: 'Say the word, add a phrase, then make a full sentence.',
    instructions_advanced: 'Say the word, add a phrase, then make a full sentence.',
    step_instructions: {
      1: 'Step 1: say the word clearly.',
      2: 'Step 2: add a short phrase with the word.',
      3: 'Step 3: make a full sentence.'
    },
    frames_easy: ['I am ___', 'I see ___'],
    frames_advanced: ['I am ___ at the park', 'My family is ___'],
    details_easy: [],
    details_advanced: [],
    detail_map: {
      'running': ['running', 'running fast', 'I am running', 'I am running fast at the park'],
      'walking': ['walking', 'walking slow', 'I am walking', 'I am walking with my mom'],
      'sitting': ['sitting', 'sitting down', 'I am sitting', 'I am sitting on the grass'],
      'eating': ['eating', 'eating food', 'I am eating', 'I am eating yummy sandwiches'],
      'flying': ['flying', 'flying kites', 'I am flying', 'My sister is flying a red kite'],
      'playing': ['playing', 'playing games', 'I am playing', 'I am playing at the park'],
      'jogging': ['jogging', 'jogging fast', 'Dad is jogging', 'My dad is jogging in the park'],
      'relaxing': ['relaxing', 'relaxing now', 'I am relaxing', 'I am relaxing on the grass'],
      'picnic': ['picnic', 'a picnic', 'We are having a picnic', 'My family is having a picnic'],
      'fountain': ['fountain', 'the fountain', 'I see the fountain', 'I see kids playing at the fountain']
    },
    distractors_easy: [],
    distractors_advanced: [],
    emoji_map: {
      'running': '🏃',
      'walking': '🚶',
      'sitting': '🪑',
      'eating': '🍽️',
      'flying': '🪁',
      'playing': '⚽',
      'jogging': '🏃‍♂️',
      'relaxing': '😌',
      'picnic': '🧺',
      'fountain': '⛲'
    }
  },
  make_sentence: {
    instructions_easy: 'Unscramble the words to make a sentence.',
    instructions_advanced: 'Unscramble the words to make a sentence.',
    sentences_easy: [
      { scrambled: ['I', 'am', 'running'], answer: 'I am running.' },
      { scrambled: ['I', 'am', 'walking'], answer: 'I am walking.' },
      { scrambled: ['I', 'am', 'sitting'], answer: 'I am sitting.' },
      { scrambled: ['I', 'am', 'eating'], answer: 'I am eating.' },
      { scrambled: ['I', 'am', 'playing'], answer: 'I am playing.' },
      { scrambled: ['Mom', 'is', 'sitting'], answer: 'Mom is sitting.' },
      { scrambled: ['Dad', 'is', 'jogging'], answer: 'Dad is jogging.' },
      { scrambled: ['I', 'see', 'the', 'fountain'], answer: 'I see the fountain.' },
      { scrambled: ['We', 'are', 'having', 'fun'], answer: 'We are having fun.' },
      { scrambled: ['I', 'love', 'the', 'park'], answer: 'I love the park.' }
    ],
    sentences_advanced: [
      { scrambled: ['I', 'am', 'running', 'at', 'the', 'park'], answer: 'I am running at the park.', base_words: ['i', 'am', 'running', 'at', 'the', 'park'], time_phrases: ['now', 'today', 'right now'], location_phrases: ['at the park', 'with friends', 'outside'] },
      { scrambled: ['I', 'am', 'walking', 'with', 'my', 'mom'], answer: 'I am walking with my mom.', base_words: ['i', 'am', 'walking', 'with', 'my', 'mom'], time_phrases: ['now', 'today', 'right now'], location_phrases: ['at the park', 'outside', 'together'] },
      { scrambled: ['Mom', 'is', 'sitting', 'on', 'a', 'bench'], answer: 'Mom is sitting on a bench.', base_words: ['mom', 'is', 'sitting', 'on', 'a', 'bench'], time_phrases: ['now', 'right now', 'today'], location_phrases: ['on a bench', 'at the park', 'resting'] },
      { scrambled: ['We', 'are', 'eating', 'sandwiches'], answer: 'We are eating sandwiches.', base_words: ['we', 'are', 'eating', 'sandwiches'], time_phrases: ['now', 'right now', 'today'], location_phrases: ['at the picnic', 'together', 'at the park'] },
      { scrambled: ['My', 'sister', 'is', 'flying', 'a', 'kite'], answer: 'My sister is flying a kite.', base_words: ['my', 'sister', 'is', 'flying', 'a', 'kite'], time_phrases: ['now', 'today', 'right now'], location_phrases: ['at the park', 'in the sky', 'outside'] },
      { scrambled: ['Kids', 'are', 'playing', 'at', 'the', 'fountain'], answer: 'Kids are playing at the fountain.', base_words: ['kids', 'are', 'playing', 'at', 'the', 'fountain'], time_phrases: ['now', 'today', 'right now'], location_phrases: ['at the fountain', 'with water', 'together'] },
      { scrambled: ['Dad', 'is', 'jogging', 'in', 'the', 'park'], answer: 'Dad is jogging in the park.', base_words: ['dad', 'is', 'jogging', 'in', 'the', 'park'], time_phrases: ['now', 'today', 'right now'], location_phrases: ['in the park', 'on the path', 'outside'] },
      { scrambled: ['I', 'am', 'relaxing', 'on', 'the', 'grass'], answer: 'I am relaxing on the grass.', base_words: ['i', 'am', 'relaxing', 'on', 'the', 'grass'], time_phrases: ['now', 'right now', 'today'], location_phrases: ['on the grass', 'at the park', 'outside'] },
      { scrambled: ['My', 'family', 'is', 'having', 'a', 'picnic'], answer: 'My family is having a picnic.', base_words: ['my', 'family', 'is', 'having', 'a', 'picnic'], time_phrases: ['now', 'today', 'right now'], location_phrases: ['at the park', 'on the grass', 'together'] },
      { scrambled: ['I', 'am', 'having', 'fun'], answer: 'I am having fun.', base_words: ['i', 'am', 'having', 'fun'], time_phrases: ['now', 'today', 'right now'], location_phrases: ['at the park', 'outside', 'with my family'] }
    ]
  },
  ask_me: {
    instructions_easy: 'Ask a question that matches the context.',
    instructions_advanced: 'Ask a question that matches the context.',
    contexts_easy: [
      {
        id: 'w15_doing_what',
        task_type: 'find_question',
        topic: 'activities',
        intro: 'I am running. Ask me what I am doing.',
        acceptedQuestions: ['What are you doing?', 'Are you running?', 'What are you playing?'],
        answer: 'I am running.',
        question_hints: ['What are you doing?', 'Are you running?'],
        required_question_words: ['what', 'are'],
        required_keywords: ['doing', 'you'],
        hints: { words: ['what', 'are', 'you', 'doing'], tricky: ['where', 'who'] }
      },
      {
        id: 'w15_eating_what',
        task_type: 'find_question',
        topic: 'food',
        intro: 'I am eating sandwiches. Ask me what I am eating.',
        acceptedQuestions: ['What are you eating?', 'What food?', 'Are you eating?'],
        answer: 'I am eating sandwiches.',
        question_hints: ['What are you eating?', 'What food?'],
        required_question_words: ['what', 'are'],
        required_keywords: ['eating'],
        hints: { words: ['what', 'are', 'you', 'eating'], tricky: ['where', 'who'] }
      },
      {
        id: 'w15_where_playing',
        task_type: 'find_question',
        topic: 'location',
        intro: 'I am at the park. Ask me where I am.',
        acceptedQuestions: ['Where are you?', 'Where are you playing?', 'Are you at the park?'],
        answer: 'I am at the park.',
        question_hints: ['Where are you?', 'Are you at the park?'],
        required_question_words: ['where', 'are'],
        required_keywords: ['you'],
        hints: { words: ['where', 'are', 'you'], tricky: ['what', 'who'] }
      },
      {
        id: 'w15_kite_color',
        task_type: 'find_question',
        topic: 'colors',
        intro: 'My kite is red. Ask me what color it is.',
        acceptedQuestions: ['What color is your kite?', 'What color?', 'Is it red?'],
        answer: 'My kite is red.',
        question_hints: ['What color is your kite?', 'What color?'],
        required_question_words: ['what', 'color'],
        required_keywords: ['color'],
        hints: { words: ['what', 'color', 'is'], tricky: ['where', 'who'] }
      },
      {
        id: 'w15_like_park',
        task_type: 'find_question',
        topic: 'preferences',
        intro: 'I love the park. Ask me if I like the park.',
        acceptedQuestions: ['Do you like the park?', 'Do you love the park?', 'Is it fun?'],
        answer: 'Yes, I love the park.',
        question_hints: ['Do you like the park?', 'Do you love the park?'],
        required_question_words: ['do', 'you'],
        required_keywords: ['like', 'love', 'park'],
        hints: { words: ['do', 'you', 'like', 'park'], tricky: ['what', 'where'] }
      }
    ],
    contexts_advanced: []
  }
};

export default week15GamesEasy;
