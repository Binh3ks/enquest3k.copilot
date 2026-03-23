/**
 * Week 17 Game Data - Easy Mode (GameHub)
 * Theme: Weather & Clothes - Cause and Effect
 * Tier 1 Vocabulary - Simple, Personal Context
 */

export const week17GamesEasy = {
  vocabulary: [
    'raining', 'snowing', 'sunny', 'cold', 'warm',
    'coat', 'boots', 'hat', 'umbrella', 'wearing'
  ],
  show_tell: {
    steps: 3,
    word_list: [
      'raining', 'snowing', 'sunny', 'cold', 'warm',
      'coat', 'boots', 'hat', 'umbrella', 'wearing'
    ],
    instructions_easy: 'Say the word, add a phrase, then make a full sentence.',
    instructions_advanced: 'Say the word, add a phrase, then make a full sentence.',
    step_instructions: {
      1: 'Step 1: say the word clearly.',
      2: 'Step 2: add a short phrase with the word.',
      3: 'Step 3: make a full sentence.'
    },
    frames_easy: ['It is ___ today', 'I am ___ a coat'],
    frames_advanced: ['It is ___, so I am wearing', 'The weather is ___'],
    details_easy: [],
    details_advanced: [],
    detail_map: {
      'raining': ['rain', 'raining', 'It is raining', 'It is raining today so I carry my umbrella'],
      'snowing': ['snow', 'snowing', 'It is snowing', 'It is snowing outside so I wear my big coat'],
      'sunny': ['sun', 'sunny', 'It is sunny', 'It is sunny today so I feel warm outside'],
      'cold': ['cold', 'very cold', 'It is cold', 'It is cold today so I wear my coat and hat'],
      'warm': ['warm', 'nice and warm', 'It is warm', 'It is warm today so I wear light clothes'],
      'coat': ['coat', 'my coat', 'I wear a coat', 'I wear a coat because it is raining and cold'],
      'boots': ['boots', 'my boots', 'I wear boots', 'I wear boots to keep my feet dry in the rain'],
      'hat': ['hat', 'my hat', 'I wear a hat', 'I wear a hat to keep my head warm when it is cold'],
      'umbrella': ['umbrella', 'my umbrella', 'I carry an umbrella', 'I carry my umbrella because it is raining today'],
      'wearing': ['wear', 'wearing', 'I am wearing', 'I am wearing my coat because it is cold and rainy']
    },
    distractor_map: {
      'raining': ['hair', 'eyes', 'smile'],
      'sunny': ['tall', 'short', 'face'],
      'cold': ['glasses', 'curly', 'long']
    },
    frame_map: {
      'raining': ['It is raining today.'],
      'coat': ['I am wearing a coat.'],
      'sunny': ['It is sunny outside.']
    },
    sentence_hints_map: {
      'raining': ['It is raining today.', 'It is raining and cold.', 'It is raining outside.'],
      'snowing': ['It is snowing today.', 'It is snowing outside.', 'It is snowing and cold.'],
      'sunny': ['It is sunny today.', 'It is sunny and warm.', 'The weather is sunny.'],
      'cold': ['It is cold today.', 'The weather is cold.', 'It is very cold outside.'],
      'warm': ['It is warm today.', 'The weather is warm.', 'It is warm and sunny.'],
      'coat': ['I wear a coat.', 'I have my coat.', 'My coat is warm.'],
      'boots': ['I wear boots.', 'My boots are dry.', 'I have my boots on.'],
      'hat': ['I wear a hat.', 'My hat is warm.', 'I have a hat on.'],
      'umbrella': ['I carry an umbrella.', 'My umbrella is blue.', 'I have my umbrella.'],
      'wearing': ['I am wearing a coat.', 'She is wearing boots.', 'He is wearing a hat.']
    },
    definitions: {
      'raining': 'Water falling down.',
      'snowing': 'White flakes falling.',
      'sunny': 'Bright and clear.',
      'cold': 'Low temperature.',
      'warm': 'Nice temperature.',
      'coat': 'Thick jacket.',
      'boots': 'Waterproof shoes.',
      'hat': 'Head covering.',
      'umbrella': 'Keeps you dry.',
      'wearing': 'Having clothes on.'
    },
    emoji_map: {
      'raining': '🌧️',
      'snowing': '❄️',
      'sunny': '☀️',
      'cold': '🥶',
      'warm': '🌤️',
      'coat': '🧥',
      'boots': '👢',
      'hat': '🧢',
      'umbrella': '☂️',
      'wearing': '👗'
    }
  },
  make_sentence: {
    instructions_easy: 'Unscramble the words to make a sentence.',
    instructions_advanced: 'Unscramble the words to make a sentence.',
    sentences_easy: [
      { scrambled: ['It', 'is', 'raining'], answer: 'It is raining.' },
      { scrambled: ['It', 'is', 'sunny'], answer: 'It is sunny.' },
      { scrambled: ['It', 'is', 'cold'], answer: 'It is cold.' },
      { scrambled: ['I', 'wear', 'a', 'coat'], answer: 'I wear a coat.' },
      { scrambled: ['I', 'wear', 'boots'], answer: 'I wear boots.' },
      { scrambled: ['I', 'wear', 'a', 'hat'], answer: 'I wear a hat.' },
      { scrambled: ['I', 'am', 'warm'], answer: 'I am warm.' },
      { scrambled: ['I', 'have', 'an', 'umbrella'], answer: 'I have an umbrella.' },
      { scrambled: ['It', 'is', 'snowing'], answer: 'It is snowing.' },
      { scrambled: ['It', 'is', 'warm', 'today'], answer: 'It is warm today.' }
    ],
    sentences_advanced: [
      { scrambled: ['It', 'is', 'raining', 'today'], answer: 'It is raining today.', base_words: ['it', 'is', 'raining', 'today'], time_phrases: ['today', 'right now'], location_phrases: ['outside', 'at school', 'in my city'] },
      { scrambled: ['I', 'am', 'wearing', 'a', 'coat'], answer: 'I am wearing a coat.', base_words: ['i', 'am', 'wearing', 'a', 'coat'], time_phrases: ['today', 'right now'], location_phrases: ['to school', 'outside', 'in the rain'] },
      { scrambled: ['It', 'is', 'cold', 'so', 'I', 'wear', 'a', 'hat'], answer: 'It is cold so I wear a hat.', base_words: ['it', 'is', 'cold', 'so', 'i', 'wear', 'a', 'hat'], time_phrases: ['today', 'right now'], location_phrases: ['outside', 'to school', 'in the morning'] },
      { scrambled: ['I', 'carry', 'my', 'umbrella'], answer: 'I carry my umbrella.', base_words: ['i', 'carry', 'my', 'umbrella'], time_phrases: ['today', 'right now'], location_phrases: ['to school', 'in the rain', 'outside'] },
      { scrambled: ['It', 'is', 'snowing', 'so', 'I', 'wear', 'boots'], answer: 'It is snowing so I wear boots.', base_words: ['it', 'is', 'snowing', 'so', 'i', 'wear', 'boots'], time_phrases: ['today', 'this morning'], location_phrases: ['outside', 'to school', 'in the snow'] },
      { scrambled: ['The', 'weather', 'is', 'warm', 'today'], answer: 'The weather is warm today.', base_words: ['the', 'weather', 'is', 'warm', 'today'], time_phrases: ['today', 'right now'], location_phrases: ['outside', 'in my city', 'at school'] },
      { scrambled: ['I', 'am', 'wearing', 'my', 'coat', 'and', 'boots'], answer: 'I am wearing my coat and boots.', base_words: ['i', 'am', 'wearing', 'my', 'coat', 'and', 'boots'], time_phrases: ['today', 'right now'], location_phrases: ['in the rain', 'to school', 'outside'] },
      { scrambled: ['It', 'is', 'sunny', 'and', 'warm'], answer: 'It is sunny and warm.', base_words: ['it', 'is', 'sunny', 'and', 'warm'], time_phrases: ['today', 'right now'], location_phrases: ['outside', 'in the sky', 'at the park'] },
      { scrambled: ['My', 'coat', 'keeps', 'me', 'warm'], answer: 'My coat keeps me warm.', base_words: ['my', 'coat', 'keeps', 'me', 'warm'], time_phrases: ['today', 'right now'], location_phrases: ['in the rain', 'outside', 'in the cold'] },
      { scrambled: ['I', 'dress', 'for', 'the', 'weather'], answer: 'I dress for the weather.', base_words: ['i', 'dress', 'for', 'the', 'weather'], time_phrases: ['every day', 'today'], location_phrases: ['every morning', 'before school', 'to go outside'] }
    ]
  },
  ask_me: {
    instructions_easy: 'Ask a question that matches the context.',
    instructions_advanced: 'Ask a question that matches the context.',
    contexts_easy: [
      {
        id: 'w17_easy_wearing_what',
        task_type: 'find_question',
        topic: 'weather',
        intro: 'I am wearing a coat. Ask me what I am wearing.',
        acceptedQuestions: ['What are you wearing?', 'Are you wearing a coat?'],
        answer: 'I am wearing a coat.',
        question_hints: ['What are you wearing?'],
        required_question_words: ['what', 'are'],
        required_keywords: ['wearing', 'you'],
        hints: { words: ['what', 'are', 'you', 'wearing'], tricky: ['where', 'who'] }
      },
      {
        id: 'w17_easy_weather_how',
        task_type: 'find_question',
        topic: 'weather',
        intro: 'It is cold and raining today. Ask me how the weather is.',
        acceptedQuestions: ['How is the weather?', 'What is the weather?', 'Is it raining?'],
        answer: 'It is cold and raining today.',
        question_hints: ['How is the weather?'],
        required_question_words: ['how'],
        required_keywords: ['weather'],
        hints: { words: ['how', 'is', 'the', 'weather'], tricky: ['what', 'where'] }
      }
    ],
    contexts_advanced: [
      {
        id: 'w17_easy_adv_why_coat',
        task_type: 'find_question',
        topic: 'weather',
        intro: 'I am wearing a coat because it is raining. Ask why I am wearing a coat.',
        acceptedQuestions: ['Why are you wearing a coat?', 'Why do you have a coat on?'],
        answer: 'I am wearing a coat because it is raining.',
        question_hints: ['Why are you wearing a coat?'],
        required_question_words: ['why', 'are'],
        required_keywords: ['wearing', 'coat'],
        hints: { words: ['why', 'are', 'you', 'wearing', 'a', 'coat'], tricky: ['what', 'where'] }
      }
    ]
  }
};

export default week17GamesEasy;
