/**
 * Week 15 Game Data - Advanced Mode (New GameHub)
 * Theme: The Busy Park - Present Continuous
 */

export const week15GamesAdvanced = {
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
    frames_easy: ['I am ___ at the park', 'We are ___ together'],
    frames_advanced: ['The children are ___ near the fountain', 'People are ___ in the park'],
    details_easy: [],
    details_advanced: [],
    detail_map: {
      'running': ['running', 'running fast', 'I am running', 'I am running fast in the park with my friends'],
      'walking': ['walking', 'walking slowly', 'I am walking', 'I am walking slowly with my mom in the park'],
      'sitting': ['sitting', 'sitting down', 'I am sitting', 'I am sitting down on the bench to rest'],
      'eating': ['eating', 'eating lunch', 'We are eating', 'We are eating lunch at our picnic on the grass'],
      'flying': ['flying', 'flying kites', 'They are flying', 'They are flying colorful kites in the open field'],
      'playing': ['playing', 'playing games', 'Children are playing', 'Children are playing games and laughing near the fountain'],
      'jogging': ['jogging', 'jogging around', 'People are jogging', 'People are jogging around the park path for exercise'],
      'relaxing': ['relaxing', 'relaxing peacefully', 'We are relaxing', 'We are relaxing peacefully under the shade of big trees'],
      'picnic': ['picnic', 'having a picnic', 'My family is having a picnic', 'My family is having a picnic on the green grass'],
      'fountain': ['fountain', 'the fountain', 'at the fountain', 'Children are playing at the fountain and splashing water']
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
      { scrambled: ['She', 'is', 'walking'], answer: 'She is walking.' },
      { scrambled: ['We', 'are', 'sitting'], answer: 'We are sitting.' },
      { scrambled: ['They', 'are', 'eating'], answer: 'They are eating.' },
      { scrambled: ['He', 'is', 'playing'], answer: 'He is playing.' },
      { scrambled: ['I', 'am', 'jogging'], answer: 'I am jogging.' },
      { scrambled: ['We', 'are', 'relaxing'], answer: 'We are relaxing.' },
      { scrambled: ['They', 'are', 'flying', 'kites'], answer: 'They are flying kites.' },
      { scrambled: ['We', 'are', 'having', 'a', 'picnic'], answer: 'We are having a picnic.' },
      { scrambled: ['I', 'see', 'the', 'fountain'], answer: 'I see the fountain.' }
    ],
    sentences_advanced: [
      { scrambled: ['I', 'am', 'running', 'fast', 'in', 'the', 'park'], answer: 'I am running fast in the park.', base_words: ['i', 'am', 'running', 'fast', 'in', 'the', 'park'], time_phrases: ['now', 'right now', 'today', 'this morning', 'at this moment'], location_phrases: ['in the park', 'on the path', 'near the trees', 'around the fountain', 'with my friends'] },
      { scrambled: ['She', 'is', 'walking', 'slowly', 'with', 'her', 'mom'], answer: 'She is walking slowly with her mom.', base_words: ['she', 'is', 'walking', 'slowly', 'with', 'her', 'mom'], time_phrases: ['now', 'today', 'this afternoon', 'right now', 'currently'], location_phrases: ['in the park', 'on the grass', 'near the fountain', 'under the trees', 'around the path'] },
      { scrambled: ['We', 'are', 'sitting', 'on', 'the', 'bench'], answer: 'We are sitting on the bench.', base_words: ['we', 'are', 'sitting', 'on', 'the', 'bench'], time_phrases: ['now', 'right now', 'today', 'at this moment', 'currently'], location_phrases: ['on the bench', 'in the park', 'under the tree', 'near the fountain', 'by the path'] },
      { scrambled: ['My', 'family', 'is', 'eating', 'lunch', 'together'], answer: 'My family is eating lunch together.', base_words: ['my', 'family', 'is', 'eating', 'lunch', 'together'], time_phrases: ['now', 'right now', 'today', 'at lunchtime', 'this afternoon'], location_phrases: ['in the park', 'on the grass', 'at our picnic', 'under the tree', 'together'] },
      { scrambled: ['Children', 'are', 'playing', 'near', 'the', 'fountain'], answer: 'Children are playing near the fountain.', base_words: ['children', 'are', 'playing', 'near', 'the', 'fountain'], time_phrases: ['now', 'today', 'right now', 'this afternoon', 'happily'], location_phrases: ['near the fountain', 'at the park', 'in the water', 'together', 'with friends'] },
      { scrambled: ['He', 'is', 'jogging', 'around', 'the', 'park', 'path'], answer: 'He is jogging around the park path.', base_words: ['he', 'is', 'jogging', 'around', 'the', 'park', 'path'], time_phrases: ['now', 'every morning', 'today', 'right now', 'for exercise'], location_phrases: ['around the park path', 'in the park', 'near the trees', 'by the fountain', 'alone'] },
      { scrambled: ['We', 'are', 'relaxing', 'under', 'the', 'big', 'trees'], answer: 'We are relaxing under the big trees.', base_words: ['we', 'are', 'relaxing', 'under', 'the', 'big', 'trees'], time_phrases: ['now', 'today', 'right now', 'this afternoon', 'peacefully'], location_phrases: ['under the big trees', 'in the shade', 'in the park', 'on the grass', 'together'] },
      { scrambled: ['Teenagers', 'are', 'flying', 'colorful', 'kites', 'in', 'the', 'field'], answer: 'Teenagers are flying colorful kites in the field.', base_words: ['teenagers', 'are', 'flying', 'colorful', 'kites', 'in', 'the', 'field'], time_phrases: ['now', 'today', 'right now', 'this afternoon', 'happily'], location_phrases: ['in the field', 'in the park', 'in the open area', 'under the sky', 'together'] },
      { scrambled: ['A', 'family', 'is', 'having', 'a', 'picnic', 'on', 'the', 'grass'], answer: 'A family is having a picnic on the grass.', base_words: ['a', 'family', 'is', 'having', 'a', 'picnic', 'on', 'the', 'grass'], time_phrases: ['now', 'today', 'right now', 'this afternoon', 'together'], location_phrases: ['on the grass', 'in the park', 'under the tree', 'near the fountain', 'in the shade'] },
      { scrambled: ['Everyone', 'is', 'having', 'a', 'wonderful', 'time'], answer: 'Everyone is having a wonderful time.', base_words: ['everyone', 'is', 'having', 'a', 'wonderful', 'time'], time_phrases: ['now', 'today', 'right now', 'this afternoon', 'at the park'], location_phrases: ['at the park', 'in the park', 'together', 'outside', 'in the sunshine'] }
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
        intro: 'I am running at the park. Ask me what I am doing.',
        acceptedQuestions: ['What are you doing?', 'What are you doing at the park?', 'Are you running?'],
        answer: 'I am running at the park.',
        question_hints: ['What are you doing?', 'Are you running?'],
        required_question_words: ['what', 'are'],
        required_keywords: ['doing', 'you'],
        hints: { words: ['what', 'are', 'you', 'doing'], tricky: ['where', 'who'] }
      },
      {
        id: 'w15_eating_what',
        task_type: 'find_question',
        topic: 'food',
        intro: 'We are eating sandwiches. Ask me what we are eating.',
        acceptedQuestions: ['What are you eating?', 'What food?', 'Are you eating sandwiches?'],
        answer: 'We are eating sandwiches.',
        question_hints: ['What are you eating?', 'What food?'],
        required_question_words: ['what', 'are'],
        required_keywords: ['eating'],
        hints: { words: ['what', 'are', 'you', 'eating'], tricky: ['where', 'who'] }
      },
      {
        id: 'w15_playing_where',
        task_type: 'find_question',
        topic: 'location',
        intro: 'Children are playing at the fountain. Ask me where they are playing.',
        acceptedQuestions: ['Where are they playing?', 'Where are the children?', 'Are they at the fountain?'],
        answer: 'They are playing at the fountain.',
        question_hints: ['Where are they playing?', 'Where are the children?'],
        required_question_words: ['where', 'are'],
        required_keywords: ['playing', 'they'],
        hints: { words: ['where', 'are', 'they', 'playing'], tricky: ['what', 'who'] }
      },
      {
        id: 'w15_jogging_who',
        task_type: 'find_question',
        topic: 'people',
        intro: 'My dad is jogging. Ask me who is jogging.',
        acceptedQuestions: ['Who is jogging?', 'Who is running?', 'Is your dad jogging?'],
        answer: 'My dad is jogging.',
        question_hints: ['Who is jogging?', 'Is your dad jogging?'],
        required_question_words: ['who', 'is'],
        required_keywords: ['jogging'],
        hints: { words: ['who', 'is', 'jogging'], tricky: ['what', 'where'] }
      },
      {
        id: 'w15_kite_color',
        task_type: 'find_question',
        topic: 'colors',
        intro: 'My sister is flying a red kite. Ask me what color the kite is.',
        acceptedQuestions: ['What color is the kite?', 'What color?', 'Is it red?'],
        answer: 'The kite is red.',
        question_hints: ['What color is the kite?', 'What color?'],
        required_question_words: ['what', 'color'],
        required_keywords: ['color', 'kite'],
        hints: { words: ['what', 'color', 'is', 'kite'], tricky: ['where', 'who'] }
      }
    ],
    contexts_advanced: []
  }
};

export default week15GamesAdvanced;
