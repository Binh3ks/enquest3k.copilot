/**
 * Week 9 Game Data - Advanced Mode (New GameHub)
 */

export const week9GamesAdvanced = {
  vocabulary: [
    'city', 'street', 'noisy', 'busy', 'tall',
    'modern', 'car', 'bus', 'building', 'traffic'
  ],
  show_tell: {
    steps: 3,
    word_list: [
      'city', 'street', 'noisy', 'busy', 'tall',
      'modern', 'car', 'bus', 'building', 'traffic'
    ],
    instructions_easy: 'Say the word, add a phrase, then make a full sentence.',
    instructions_advanced: 'Say the word, add a phrase, then make a full sentence.',
    step_instructions: {
      1: 'Step 1: say the word clearly.',
      2: 'Step 2: add a short phrase with the word.',
      3: 'Step 3: make a full sentence.'
    },
    frames_easy: ['Put the ___ in the ___', 'Put the ___ on the ___'],
    frames_advanced: ['Put the ___ on the ___', 'Put the ___ under the ___'],
    details_easy: [],
    details_advanced: [],
    detail_map: {
      city: ['big city', 'modern city', 'the city', 'I live in the city'],
      street: ['busy street', 'the street', 'a street', 'I walk on the street'],
      noisy: ['very noisy', 'so noisy', 'noisy city', 'the city is noisy'],
      busy: ['very busy', 'so busy', 'busy street', 'the street is busy'],
      tall: ['very tall', 'so tall', 'tall building', 'the building is tall'],
      modern: ['very modern', 'so modern', 'modern city', 'the city is modern'],
      car: ['red car', 'the car', 'a car', 'I see a car on the street'],
      bus: ['big bus', 'the bus', 'a bus', 'I take the bus to school'],
      building: ['tall building', 'the building', 'a building', 'I see a building'],
      traffic: ['heavy traffic', 'the traffic', 'bad traffic', 'the traffic is heavy']
    },
    distractors_easy: [],
    distractors_advanced: [],
    distractor_map: {
      city: ['quiet', 'peaceful', 'farm'],
      street: ['field', 'countryside', 'farm']
    },
    frame_map: {
      city: ['The ___ is ___'],
      car: ['I see ___ on the ___']
    },
    sentence_hints_map: {
      city: ['The city is noisy.', 'The city is busy.', 'The city is modern.'],
      street: ['The street is busy.', 'I walk on the street.', 'I see a car on the street.'],
      noisy: ['The city is noisy.', 'The street is noisy.', 'The traffic is noisy.'],
      busy: ['The street is busy.', 'The city is busy.', 'The traffic is busy.'],
      tall: ['The building is tall.', 'The building is very tall.', 'I see a tall building.'],
      modern: ['The city is modern.', 'The building is modern.', 'I live in a modern city.'],
      car: ['I see a car.', 'The car is on the street.', 'I see a car on the street.'],
      bus: ['I take the bus.', 'I see a bus.', 'The bus is on the street.'],
      building: ['The building is tall.', 'I see a building.', 'The building is modern.'],
      traffic: ['The traffic is heavy.', 'The traffic is busy.', 'I see traffic on the street.']
    },
    emoji_map: {
      city: '🏙️',
      street: '🛣️',
      noisy: '🔊',
      busy: '🚦',
      tall: '📏',
      modern: '✨',
      car: '🚗',
      bus: '🚌',
      building: '🏢',
      traffic: '🚥'
    },
    definitions: {
      city: 'A large town with many people.',
      street: 'A road in a city or town.',
      noisy: 'With a lot of loud sounds.',
      traffic: 'Cars, buses moving on roads.'
    }
  },
  make_sentence: {
    instructions_easy: 'Unscramble the words to make a correct sentence.',
    instructions_advanced: 'Unscramble the words to make a correct sentence.',
    sentences_easy: [
      { scrambled: ['The', 'city', 'is', 'noisy'], answer: 'The city is noisy.' },
      { scrambled: ['I', 'see', 'a', 'car'], answer: 'I see a car.' },
      { scrambled: ['The', 'building', 'is', 'tall'], answer: 'The building is tall.' },
      { scrambled: ['The', 'street', 'is', 'busy'], answer: 'The street is busy.' },
      { scrambled: ['I', 'take', 'the', 'bus'], answer: 'I take the bus.' },
      { scrambled: ['The', 'city', 'is', 'modern'], answer: 'The city is modern.' },
      { scrambled: ['The', 'traffic', 'is', 'heavy'], answer: 'The traffic is heavy.' },
      { scrambled: ['I', 'see', 'a', 'bus'], answer: 'I see a bus.' },
      { scrambled: ['The', 'car', 'is', 'on', 'the', 'street'], answer: 'The car is on the street.' },
      { scrambled: ['The', 'city', 'is', 'busy'], answer: 'The city is busy.' }
    ],
    sentences_advanced: [
      { scrambled: ['The', 'city', 'is', 'noisy', 'and', 'busy'], answer: 'The city is noisy and busy.', base_words: ['the', 'city', 'is', 'noisy', 'and', 'busy'], time_phrases: [], location_phrases: [] },
      { scrambled: ['The', 'city', 'is', 'modern', 'and', 'tall'], answer: 'The city is modern and tall.', base_words: ['the', 'city', 'is', 'modern', 'and', 'tall'], time_phrases: [], location_phrases: [] },
      { scrambled: ['I', 'see', 'cars', 'and', 'buses', 'on', 'the', 'street'], answer: 'I see cars and buses on the street.', base_words: ['I', 'see', 'cars', 'and', 'buses', 'on', 'the', 'street'], time_phrases: [], location_phrases: [] },
      { scrambled: ['The', 'building', 'is', 'tall', 'and', 'modern'], answer: 'The building is tall and modern.', base_words: ['the', 'building', 'is', 'tall', 'and', 'modern'], time_phrases: [], location_phrases: [] },
      { scrambled: ['I', 'take', 'the', 'bus', 'to', 'school'], answer: 'I take the bus to school.', base_words: ['I', 'take', 'the', 'bus', 'to', 'school'], time_phrases: [], location_phrases: [] },
      { scrambled: ['The', 'street', 'is', 'busy', 'with', 'traffic'], answer: 'The street is busy with traffic.', base_words: ['the', 'street', 'is', 'busy', 'with', 'traffic'], time_phrases: [], location_phrases: [] },
      { scrambled: ['I', 'see', 'a', 'tall', 'building', 'in', 'the', 'city'], answer: 'I see a tall building in the city.', base_words: ['I', 'see', 'a', 'tall', 'building', 'in', 'the', 'city'], time_phrases: [], location_phrases: [] },
      { scrambled: ['The', 'car', 'is', 'on', 'the', 'busy', 'street'], answer: 'The car is on the busy street.', base_words: ['the', 'car', 'is', 'on', 'the', 'busy', 'street'], time_phrases: [], location_phrases: [] },
      { scrambled: ['The', 'bus', 'is', 'on', 'the', 'street'], answer: 'The bus is on the street.', base_words: ['the', 'bus', 'is', 'on', 'the', 'street'], time_phrases: [], location_phrases: [] },
      { scrambled: ['The', 'traffic', 'is', 'heavy', 'in', 'the', 'city'], answer: 'The traffic is heavy in the city.', base_words: ['the', 'traffic', 'is', 'heavy', 'in', 'the', 'city'], time_phrases: [], location_phrases: [] }
    ]
  },
  ask_me: {
    instructions_easy: 'Ask a question that matches the context.',
    instructions_advanced: 'Ask a question that matches the context.',
    contexts_easy: [
      {
        id: 'w9_car_where',
        task_type: 'find_question',
        topic: 'car',
        intro: 'The car is on the street. Ask me where the car is.',
        acceptedQuestions: [
          'Where is the car?',
          'Where is it?',
          'Where is the bus?'
        ],
        answer: 'The car is on the street.',
        question_hints: ['Where is the car?', 'Where is it?', 'Where is the bus?'],
        required_question_words: ['where'],
        required_keywords: ['car'],
        hints: {
          words: ['where', 'is', 'the', 'car'],
          tricky: ['what', 'who']
        }
      },
      {
        id: 'w9_city_what',
        task_type: 'find_question',
        topic: 'city',
        intro: 'The city is noisy and busy. Ask me what the city is like.',
        acceptedQuestions: [
          'What is the city like?',
          'How is the city?',
          'What is it like?'
        ],
        answer: 'The city is noisy and busy.',
        question_hints: ['What is the city like?', 'How is the city?', 'What is it like?'],
        required_question_words: ['what', 'how'],
        required_keywords: ['city'],
        hints: {
          words: ['what', 'is', 'the', 'city', 'like'],
          tricky: ['where', 'who']
        }
      },
      {
        id: 'w9_bus_where',
        task_type: 'find_question',
        topic: 'bus',
        intro: 'The bus is on the street. Ask me where the bus is.',
        acceptedQuestions: [
          'Where is the bus?',
          'Where is it?',
          'Where is the car?'
        ],
        answer: 'The bus is on the street.',
        question_hints: ['Where is the bus?', 'Where is it?', 'Where is the car?'],
        required_question_words: ['where'],
        required_keywords: ['bus'],
        hints: {
          words: ['where', 'is', 'the', 'bus'],
          tricky: ['what', 'who']
        }
      },
      {
        id: 'w9_see_what',
        task_type: 'find_question',
        topic: 'see',
        intro: 'I see cars and buses. Ask me what I see.',
        acceptedQuestions: [
          'What do you see?',
          'What do you see on the street?',
          'What is there?'
        ],
        answer: 'I see cars and buses.',
        question_hints: ['What do you see?', 'What do you see on the street?', 'What is there?'],
        required_question_words: ['what'],
        required_keywords: ['see', 'you'],
        hints: {
          words: ['what', 'do', 'you', 'see'],
          tricky: ['where', 'who']
        }
      },
      {
        id: 'w9_building_how',
        task_type: 'find_question',
        topic: 'building',
        intro: 'The building is tall. Ask me how the building is.',
        acceptedQuestions: [
          'How is the building?',
          'What is the building like?',
          'How tall is it?'
        ],
        answer: 'The building is tall.',
        question_hints: ['How is the building?', 'What is the building like?', 'How tall is it?'],
        required_question_words: ['how', 'what'],
        required_keywords: ['building'],
        hints: {
          words: ['how', 'is', 'the', 'building'],
          tricky: ['where', 'who']
        }
      },
      {
        id: 'w9_street_what',
        task_type: 'find_question',
        topic: 'street',
        intro: 'The street is busy. Ask me what the street is like.',
        acceptedQuestions: [
          'What is the street like?',
          'How is the street?',
          'What is it like?'
        ],
        answer: 'The street is busy.',
        question_hints: ['What is the street like?', 'How is the street?', 'What is it like?'],
        required_question_words: ['what', 'how'],
        required_keywords: ['street'],
        hints: {
          words: ['what', 'is', 'the', 'street', 'like'],
          tricky: ['where', 'who']
        }
      },
      {
        id: 'w9_bus_take',
        task_type: 'find_question',
        topic: 'take_bus',
        intro: 'I take the bus on the street. Ask me where I take the bus.',
        acceptedQuestions: [
          'Where do you take the bus?',
          'Where is the bus?',
          'Where do you take it?'
        ],
        answer: 'I take the bus on the street.',
        question_hints: ['Where do you take the bus?', 'Where is the bus?', 'Where do you take it?'],
        required_question_words: ['where'],
        required_keywords: ['bus', 'take'],
        hints: {
          words: ['where', 'do', 'you', 'take', 'bus'],
          tricky: ['what', 'who']
        }
      },
      {
        id: 'w9_traffic_what',
        task_type: 'find_question',
        topic: 'traffic',
        intro: 'The traffic is heavy. Ask me what the traffic is like.',
        acceptedQuestions: [
          'What is the traffic like?',
          'How is the traffic?',
          'What is it like?'
        ],
        answer: 'The traffic is heavy.',
        question_hints: ['What is the traffic like?', 'How is the traffic?', 'What is it like?'],
        required_question_words: ['what', 'how'],
        required_keywords: ['traffic'],
        hints: {
          words: ['what', 'is', 'the', 'traffic', 'like'],
          tricky: ['where', 'who']
        }
      },
      {
        id: 'w9_mini_city',
        task_type: 'mini_interview',
        topic: 'city',
        intro: 'Interview me: ask what I see, then ask what the city is like.',
        steps: [
          {
            prompt: 'Ask what I see on the street.',
            required_question_words: ['what'],
            required_keywords: ['see'],
            question_hints: ['What do you see?', 'What do you see on the street?', 'What is there?']
          },
          {
            prompt: 'Ask what the city is like.',
            acceptedQuestions: [
              'What is the city like?',
              'How is the city?',
              'What is it like?'
            ],
            required_question_words: ['what', 'how'],
            required_keywords: ['city'],
            question_hints: ['What is the city like?', 'How is the city?', 'What is it like?']
          }
        ],
        hints: {
          words: ['what', 'do', 'you', 'see', 'city', 'like'],
          tricky: ['where', 'who']
        }
      }
    ],
    contexts_advanced: [
      {
        id: 'w9_car_where_adv',
        task_type: 'find_question',
        topic: 'car',
        intro: 'The car is on the street. Ask me where the car is.',
        acceptedQuestions: [
          'Where is the car?',
          'Where is it?',
          'Where can I see a car?'
        ],
        answer: 'The car is on the street.',
        question_hints: ['Where is the car?', 'Where is it?', 'Where can I see a car?'],
        required_question_words: ['where'],
        required_keywords: ['car'],
        hints: {
          words: ['where', 'is', 'the', 'car'],
          tricky: ['what', 'who']
        }
      },
      {
        id: 'w9_city_what_adv',
        task_type: 'find_question',
        topic: 'city',
        intro: 'The city is noisy and busy. Ask me what the city is like.',
        acceptedQuestions: [
          'What is the city like?',
          'How is the city?',
          'What is it like?'
        ],
        answer: 'The city is noisy and busy.',
        question_hints: ['What is the city like?', 'How is the city?', 'What is it like?'],
        required_question_words: ['what', 'how'],
        required_keywords: ['city'],
        hints: {
          words: ['what', 'is', 'the', 'city', 'like'],
          tricky: ['where', 'who']
        }
      },
      {
        id: 'w9_building_how_adv',
        task_type: 'find_question',
        topic: 'building',
        intro: 'The building is tall and modern. Ask me how the building is.',
        acceptedQuestions: [
          'How is the building?',
          'What is the building like?',
          'How tall is it?'
        ],
        answer: 'The building is tall and modern.',
        question_hints: ['How is the building?', 'What is the building like?', 'How tall is it?'],
        required_question_words: ['how', 'what'],
        required_keywords: ['building'],
        hints: {
          words: ['how', 'is', 'the', 'building'],
          tricky: ['where', 'who']
        }
      },
      {
        id: 'w9_street_what_adv',
        task_type: 'find_question',
        topic: 'street',
        intro: 'The street is busy with traffic. Ask me what the street is like.',
        acceptedQuestions: [
          'What is the street like?',
          'How is the street?',
          'What is it like?'
        ],
        answer: 'The street is busy with traffic.',
        question_hints: ['What is the street like?', 'How is the street?', 'What is it like?'],
        required_question_words: ['what', 'how'],
        required_keywords: ['street'],
        hints: {
          words: ['what', 'is', 'the', 'street', 'like'],
          tricky: ['where', 'who']
        }
      },
      {
        id: 'w9_see_what_adv',
        task_type: 'find_question',
        topic: 'see',
        intro: 'I see cars, buses, and tall buildings. Ask me what I see.',
        acceptedQuestions: [
          'What do you see?',
          'What do you see in the city?',
          'What is there?'
        ],
        answer: 'I see cars, buses, and tall buildings.',
        question_hints: ['What do you see?', 'What do you see in the city?', 'What is there?'],
        required_question_words: ['what'],
        required_keywords: ['see', 'you'],
        hints: {
          words: ['what', 'do', 'you', 'see'],
          tricky: ['where', 'who']
        }
      },
      {
        id: 'w9_bus_where_adv',
        task_type: 'find_question',
        topic: 'bus',
        intro: 'I take the bus to school on the street. Ask me where I take the bus.',
        acceptedQuestions: [
          'Where do you take the bus?',
          'Where is the bus?',
          'Where do you take it?'
        ],
        answer: 'I take the bus on the street.',
        question_hints: ['Where do you take the bus?', 'Where is the bus?', 'Where do you take it?'],
        required_question_words: ['where'],
        required_keywords: ['bus', 'take'],
        hints: {
          words: ['where', 'do', 'you', 'take', 'bus'],
          tricky: ['what', 'who']
        }
      },
      {
        id: 'w9_traffic_what_adv',
        task_type: 'find_question',
        topic: 'traffic',
        intro: 'The traffic is heavy in the city. Ask me what the traffic is like.',
        acceptedQuestions: [
          'What is the traffic like?',
          'How is the traffic?',
          'What is it like?'
        ],
        answer: 'The traffic is heavy in the city.',
        question_hints: ['What is the traffic like?', 'How is the traffic?', 'What is it like?'],
        required_question_words: ['what', 'how'],
        required_keywords: ['traffic'],
        hints: {
          words: ['what', 'is', 'the', 'traffic', 'like'],
          tricky: ['where', 'who']
        }
      },
      {
        id: 'w9_compare_what',
        task_type: 'find_question',
        topic: 'compare',
        intro: 'The city is noisy, but the farm is quiet. Ask me what the difference is.',
        acceptedQuestions: [
          'What is the difference?',
          'How is the city different?',
          'How is it different from the farm?'
        ],
        answer: 'The city is noisy, but the farm is quiet.',
        question_hints: ['What is the difference?', 'How is the city different?', 'How is it different?'],
        required_question_words: ['what', 'how'],
        required_keywords: ['difference', 'different'],
        hints: {
          words: ['what', 'is', 'difference', 'how', 'different'],
          tricky: ['where', 'who']
        }
      },
      {
        id: 'w9_modern_how',
        task_type: 'find_question',
        topic: 'modern',
        intro: 'The city is modern with tall buildings. Ask me why the city is modern.',
        acceptedQuestions: [
          'Why is the city modern?',
          'Why is it modern?',
          'How is the city modern?'
        ],
        answer: 'The city is modern with tall buildings.',
        question_hints: ['Why is the city modern?', 'Why is it modern?', 'How is the city modern?'],
        required_question_words: ['why', 'how'],
        required_keywords: ['city', 'modern'],
        hints: {
          words: ['why', 'is', 'the', 'city', 'modern'],
          tricky: ['where', 'what']
        }
      },
      {
        id: 'w9_mini_city_adv',
        task_type: 'mini_interview',
        topic: 'city_adv',
        intro: 'Interview me: ask what I see in the city, then ask how the city is.',
        steps: [
          {
            prompt: 'Ask what I see in the city.',
            required_question_words: ['what'],
            required_keywords: ['see', 'city'],
            question_hints: ['What do you see in the city?', 'What do you see?', 'What is there?']
          },
          {
            prompt: 'Ask how the city is.',
            acceptedQuestions: [
              'How is the city?',
              'What is the city like?',
              'How is it?'
            ],
            required_question_words: ['how', 'what'],
            required_keywords: ['city'],
            question_hints: ['How is the city?', 'What is the city like?', 'How is it?']
          }
        ],
        hints: {
          words: ['what', 'do', 'you', 'see', 'city', 'how'],
          tricky: ['where', 'who']
        }
      }
    ],
    required_question_words_easy: ['where', 'what', 'how'],
    required_question_words_advanced: ['where', 'what', 'how', 'why']
  }
};

export default week9GamesAdvanced;
