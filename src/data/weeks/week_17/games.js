/**
 * Week 17 Game Data - Advanced Mode (GameHub)
 * Theme: Weather & Clothes - Cause and Effect
 */

export const week17GamesAdvanced = {
  vocabulary: [
    'raining', 'snowing', 'sunny', 'cold', 'warm',
    'coat', 'boots', 'hat', 'umbrella', 'wearing',
    'evaporation', 'atmosphere', 'precipitation'
  ],
  show_tell: {
    steps: 3,
    word_list: [
      'raining', 'snowing', 'sunny', 'cold', 'warm',
      'coat', 'boots', 'hat', 'umbrella', 'wearing',
      'evaporation', 'atmosphere', 'precipitation'
    ],
    instructions_easy: 'Say the word, add a phrase, then make a full sentence.',
    instructions_advanced: 'Say the word, add a phrase, then make a full sentence.',
    step_instructions: {
      1: 'Step 1: say the word clearly.',
      2: 'Step 2: add a short phrase with the word.',
      3: 'Step 3: make a full sentence.'
    },
    frames_easy: ['It is ___ today', 'I am ___ a coat'],
    frames_advanced: ['It is ___, so I am wearing ___', 'The weather is ___ because of ___'],
    details_easy: [],
    details_advanced: [],
    detail_map: {
      'raining': ['rain', 'raining', 'It is raining', 'It is raining heavily today so I am carrying my umbrella'],
      'snowing': ['snow', 'snowing', 'It is snowing', 'It is snowing outside so I am wearing my warm coat and boots'],
      'sunny': ['sun', 'sunny', 'It is sunny', 'It is sunny and warm so I am wearing a light shirt today'],
      'cold': ['cold', 'very cold', 'The weather is cold', 'The weather is cold today so I am wearing my heavy coat'],
      'warm': ['warm', 'quite warm', 'The weather is warm', 'The weather is warm and sunny so I am wearing light clothes'],
      'coat': ['coat', 'my coat', 'wearing a coat', 'I am wearing my coat because it is cold and rainy outside'],
      'boots': ['boots', 'rubber boots', 'wearing boots', 'I am wearing boots because it is raining and the ground is wet'],
      'hat': ['hat', 'my hat', 'wearing a hat', 'I am wearing my hat to keep my head warm in the cold weather'],
      'umbrella': ['umbrella', 'an umbrella', 'carrying an umbrella', 'I am carrying an umbrella because the sky looks gray and rainy'],
      'wearing': ['wear', 'wearing', 'I am wearing', 'I am wearing a warm coat and boots because it is snowing outside'],
      'evaporation': ['evaporation', 'water evaporation', 'evaporation happens', 'Evaporation happens when the sun heats water and it rises into the atmosphere'],
      'atmosphere': ['atmosphere', 'the atmosphere', 'into the atmosphere', 'Water vapour rises into the atmosphere and forms clouds high above us'],
      'precipitation': ['precipitation', 'heavy precipitation', 'precipitation falls', 'Precipitation falls when water droplets in clouds become too heavy to stay up']
    },
    distractor_map: {
      'raining': ['long hair', 'blue eyes', 'happy smile'],
      'snowing': ['curly hair', 'tall boy', 'round face'],
      'sunny': ['short girl', 'big glasses', 'pretty face'],
      'cold': ['black hair', 'small eyes', 'nice smile'],
      'warm': ['straight hair', 'brown eyes', 'cute face']
    },
    frame_map: {
      'raining': ['It is raining, so I am wearing my coat.'],
      'snowing': ['It is snowing, so I am wearing boots.'],
      'sunny': ['It is sunny, so I am feeling warm.']
    },
    sentence_hints_map: {
      'raining': ['It is raining, so I am wearing a coat.', 'It is raining heavily today.', 'It is raining and I have an umbrella.'],
      'snowing': ['It is snowing, so I am wearing boots.', 'It is snowing outside today.', 'It is snowing heavily in winter.'],
      'sunny': ['It is sunny and warm today.', 'It is sunny, so I feel warm.', 'The weather is sunny and bright.'],
      'cold': ['It is cold, so I am wearing a coat.', 'The weather is cold today.', 'It is cold and I need a hat.'],
      'warm': ['It is warm and sunny today.', 'The weather is warm outside.', 'It is warm, so I wear light clothes.'],
      'coat': ['I am wearing a coat today.', 'My coat keeps me warm.', 'I need a coat because it is cold.'],
      'boots': ['I am wearing boots today.', 'My boots keep my feet dry.', 'I wear boots when it is raining.'],
      'hat': ['I am wearing a hat today.', 'My hat keeps my head warm.', 'I wear a hat in the cold.'],
      'umbrella': ['I am carrying an umbrella.', 'My umbrella keeps me dry.', 'I need an umbrella when it rains.'],
      'wearing': ['I am wearing my coat today.', 'She is wearing a warm hat.', 'They are wearing boots outside.'],
      'evaporation': ['Evaporation happens every day.', 'Water evaporation fills the atmosphere.', 'The sun causes evaporation.'],
      'atmosphere': ['Water rises into the atmosphere.', 'The atmosphere holds water vapour.', 'Clouds form in the atmosphere.'],
      'precipitation': ['Precipitation falls from clouds.', 'Rain is a type of precipitation.', 'Heavy precipitation means heavy rain.']
    },
    definitions: {
      'raining': 'Water falling from clouds.',
      'snowing': 'White flakes falling from sky.',
      'sunny': 'Bright and clear weather.',
      'cold': 'Low temperature.',
      'warm': 'Pleasantly high temperature.',
      'coat': 'Long jacket for cold weather.',
      'boots': 'Shoes covering the ankle.',
      'hat': 'Head covering.',
      'umbrella': 'Tool to stay dry in rain.',
      'wearing': 'Having clothes on body.',
      'evaporation': 'Water turning into vapour.',
      'atmosphere': 'Layer of air around Earth.',
      'precipitation': 'Rain or snow from clouds.'
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
      'wearing': '👗',
      'evaporation': '💧',
      'atmosphere': '🌍',
      'precipitation': '🌨️'
    }
  },
  make_sentence: {
    instructions_easy: 'Unscramble the words to make a sentence.',
    instructions_advanced: 'Unscramble the words to make a sentence.',
    sentences_easy: [
      { scrambled: ['It', 'is', 'raining'], answer: 'It is raining.' },
      { scrambled: ['It', 'is', 'snowing'], answer: 'It is snowing.' },
      { scrambled: ['I', 'am', 'wearing', 'a', 'coat'], answer: 'I am wearing a coat.' },
      { scrambled: ['I', 'need', 'an', 'umbrella'], answer: 'I need an umbrella.' },
      { scrambled: ['It', 'is', 'cold', 'today'], answer: 'It is cold today.' },
      { scrambled: ['I', 'am', 'wearing', 'boots'], answer: 'I am wearing boots.' },
      { scrambled: ['It', 'is', 'sunny', 'outside'], answer: 'It is sunny outside.' },
      { scrambled: ['I', 'wear', 'a', 'hat'], answer: 'I wear a hat.' },
      { scrambled: ['The', 'weather', 'is', 'warm'], answer: 'The weather is warm.' },
      { scrambled: ['It', 'is', 'raining', 'and', 'cold'], answer: 'It is raining and cold.' }
    ],
    sentences_advanced: [
      { scrambled: ['It', 'is', 'raining', 'so', 'I', 'am', 'wearing', 'a', 'coat'], answer: 'It is raining so I am wearing a coat.', base_words: ['it', 'is', 'raining', 'so', 'i', 'am', 'wearing', 'a', 'coat'], time_phrases: ['today', 'right now', 'this morning'], location_phrases: ['outside', 'in the rain', 'to school'] },
      { scrambled: ['It', 'is', 'snowing', 'so', 'I', 'am', 'wearing', 'boots'], answer: 'It is snowing so I am wearing boots.', base_words: ['it', 'is', 'snowing', 'so', 'i', 'am', 'wearing', 'boots'], time_phrases: ['today', 'right now', 'this morning'], location_phrases: ['outside', 'in the snow', 'to school'] },
      { scrambled: ['I', 'am', 'carrying', 'an', 'umbrella', 'because', 'it', 'is', 'raining'], answer: 'I am carrying an umbrella because it is raining.', base_words: ['i', 'am', 'carrying', 'an', 'umbrella', 'because', 'it', 'is', 'raining'], time_phrases: ['today', 'right now', 'this afternoon'], location_phrases: ['outside', 'to class', 'in the rain'] },
      { scrambled: ['Water', 'rises', 'into', 'the', 'atmosphere', 'through', 'evaporation'], answer: 'Water rises into the atmosphere through evaporation.', base_words: ['water', 'rises', 'into', 'the', 'atmosphere', 'through', 'evaporation'], time_phrases: ['every day', 'constantly', 'in the sun'], location_phrases: ['from rivers', 'from the ocean', 'from lakes'] },
      { scrambled: ['Precipitation', 'falls', 'when', 'clouds', 'become', 'heavy'], answer: 'Precipitation falls when clouds become heavy.', base_words: ['precipitation', 'falls', 'when', 'clouds', 'become', 'heavy'], time_phrases: ['every time', 'always', 'usually'], location_phrases: ['from the sky', 'over mountains', 'near the coast'] },
      { scrambled: ['It', 'is', 'cold', 'and', 'raining', 'so', 'I', 'am', 'wearing', 'my', 'hat'], answer: 'It is cold and raining so I am wearing my hat.', base_words: ['it', 'is', 'cold', 'and', 'raining', 'so', 'i', 'am', 'wearing', 'my', 'hat'], time_phrases: ['today', 'this morning', 'right now'], location_phrases: ['outside', 'on the walk', 'to school'] },
      { scrambled: ['She', 'is', 'wearing', 'warm', 'boots', 'because', 'it', 'is', 'snowing'], answer: 'She is wearing warm boots because it is snowing.', base_words: ['she', 'is', 'wearing', 'warm', 'boots', 'because', 'it', 'is', 'snowing'], time_phrases: ['today', 'right now', 'this morning'], location_phrases: ['outside', 'in the snow', 'to play'] },
      { scrambled: ['The', 'atmosphere', 'holds', 'water', 'vapour', 'from', 'evaporation'], answer: 'The atmosphere holds water vapour from evaporation.', base_words: ['the', 'atmosphere', 'holds', 'water', 'vapour', 'from', 'evaporation'], time_phrases: ['all the time', 'every day', 'constantly'], location_phrases: ['above the earth', 'high in the sky', 'around the planet'] },
      { scrambled: ['It', 'is', 'sunny', 'and', 'warm', 'today'], answer: 'It is sunny and warm today.', base_words: ['it', 'is', 'sunny', 'and', 'warm', 'today'], time_phrases: ['today', 'right now', 'this morning'], location_phrases: ['outside', 'in our city', 'at the park'] },
      { scrambled: ['I', 'am', 'wearing', 'my', 'coat', 'and', 'umbrella', 'in', 'the', 'rain'], answer: 'I am wearing my coat and umbrella in the rain.', base_words: ['i', 'am', 'wearing', 'my', 'coat', 'and', 'umbrella', 'in', 'the', 'rain'], time_phrases: ['right now', 'today', 'this afternoon'], location_phrases: ['outside school', 'on the street', 'going home'] }
    ]
  },
  ask_me: {
    instructions_easy: 'Ask a question that matches the context.',
    instructions_advanced: 'Ask a question that matches the context.',
    contexts_easy: [
      {
        id: 'w17_wearing_what',
        task_type: 'find_question',
        topic: 'weather',
        intro: 'I am wearing a coat. Ask me what I am wearing.',
        acceptedQuestions: ['What are you wearing?', 'Are you wearing a coat?', 'What do you have on?'],
        answer: 'I am wearing a coat.',
        question_hints: ['What are you wearing?', 'Are you wearing a coat?'],
        required_question_words: ['what', 'are'],
        required_keywords: ['wearing', 'you'],
        hints: { words: ['what', 'are', 'you', 'wearing'], tricky: ['where', 'who'] }
      },
      {
        id: 'w17_weather_how',
        task_type: 'find_question',
        topic: 'weather',
        intro: 'The weather is cold today. Ask me how the weather is.',
        acceptedQuestions: ['How is the weather?', 'What is the weather like?', 'Is it cold today?'],
        answer: 'The weather is cold today.',
        question_hints: ['How is the weather?', 'What is the weather like?'],
        required_question_words: ['how'],
        required_keywords: ['weather'],
        hints: { words: ['how', 'is', 'the', 'weather'], tricky: ['what', 'where'] }
      }
    ],
    contexts_advanced: [
      {
        id: 'w17_adv_why_coat',
        task_type: 'find_question',
        topic: 'weather',
        intro: 'I am wearing a coat because it is raining. Ask why I am wearing a coat.',
        acceptedQuestions: ['Why are you wearing a coat?', 'Why do you have a coat on?'],
        answer: 'I am wearing a coat because it is raining.',
        question_hints: ['Why are you wearing a coat?'],
        required_question_words: ['why', 'are'],
        required_keywords: ['wearing', 'coat'],
        hints: { words: ['why', 'are', 'you', 'wearing', 'a', 'coat'], tricky: ['what', 'where'] }
      },
      {
        id: 'w17_adv_precipitation',
        task_type: 'find_question',
        topic: 'science',
        intro: 'Precipitation falls from clouds. Ask me what precipitation is.',
        acceptedQuestions: ['What is precipitation?', 'What does precipitation mean?'],
        answer: 'Precipitation is rain or snow that falls from clouds.',
        question_hints: ['What is precipitation?'],
        required_question_words: ['what', 'is'],
        required_keywords: ['precipitation'],
        hints: { words: ['what', 'is', 'precipitation'], tricky: ['where', 'how'] }
      }
    ]
  }
};

export default week17GamesAdvanced;
