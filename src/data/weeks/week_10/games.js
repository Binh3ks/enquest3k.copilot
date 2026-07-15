/**
 * Week 10 Game Data - Advanced Mode (New GameHub)
 */

export const week10GamesAdvanced = {
  vocabulary: [
    'countryside', 'farm', 'quiet', 'clean', 'peaceful',
    'animals', 'cow', 'chicken', 'field', 'tree'
  ],
  show_tell: {
    steps: 3,
    word_list: [
      'countryside', 'farm', 'quiet', 'clean', 'peaceful',
      'animals', 'cow', 'chicken', 'field', 'tree'
    ],
    instructions_easy: 'Say the word, add a phrase, then make a full sentence.',
    instructions_advanced: 'Say the word, add a phrase, then make a full sentence.',
    step_instructions: {
      1: 'Step 1: say the word clearly.',
      2: 'Step 2: add a short phrase with the word.',
      3: 'Step 3: make a full sentence.'
    },
    frames_easy: ['The ___ is ___', 'I see a ___'],
    frames_advanced: ['The city is ___, but the farm is ___', 'The ___ has ___'],
    details_easy: [],
    details_advanced: [],
    detail_map: {
      countryside: ['peaceful countryside', 'green countryside', 'the countryside', 'the countryside is peaceful'],
      farm: ['big farm', 'clean farm', 'the farm', 'the farm is quiet'],
      quiet: ['very quiet', 'so quiet', 'quiet place', 'the farm is quiet'],
      clean: ['very clean', 'so clean', 'clean air', 'the farm is clean'],
      peaceful: ['very peaceful', 'so peaceful', 'peaceful place', 'the farm is peaceful'],
      animals: ['farm animals', 'many animals', 'the animals', 'I see animals on the farm'],
      cow: ['big cow', 'the cow', 'a cow', 'I see a cow on the farm'],
      chicken: ['small chicken', 'the chicken', 'a chicken', 'I see a chicken on the farm'],
      field: ['green field', 'big field', 'the field', 'the field is green'],
      tree: ['tall tree', 'green tree', 'the tree', 'the tree is tall']
    },
    distractors_easy: [],
    distractors_advanced: [],
    distractor_map: {
      farm: ['noisy', 'city', 'buildings'],
      cow: ['car', 'bus', 'train']
    },
    frame_map: {
      farm: ['The city is ___, but the farm is ___'],
      animals: ['The ___ has ___']
    },
    sentence_hints_map: {
      countryside: ['The countryside is peaceful.', 'The countryside is quiet.', 'The countryside is clean.'],
      farm: ['The farm is quiet.', 'The farm is clean.', 'The farm is peaceful.'],
      quiet: ['The farm is quiet.', 'The countryside is quiet.', 'It is quiet.'],
      clean: ['The farm is clean.', 'The countryside is clean.', 'The air is clean.'],
      peaceful: ['The farm is peaceful.', 'The countryside is peaceful.', 'It is peaceful.'],
      animals: ['I see animals on the farm.', 'The farm has animals.', 'The animals are cute.'],
      cow: ['I see a cow.', 'The cow is big.', 'The cow eats grass.'],
      chicken: ['I see a chicken.', 'The chicken runs fast.', 'The chicken is small.'],
      field: ['The field is green.', 'I walk in the field.', 'The field is big.'],
      tree: ['The tree is tall.', 'I see a tree.', 'The tree is green.']
    },
    emoji_map: {
      countryside: '🌾',
      farm: '🚜',
      quiet: '🤫',
      clean: '✨',
      peaceful: '☮️',
      animals: '🐾',
      cow: '🐄',
      chicken: '🐔',
      field: '🌱',
      tree: '🌳'
    },
    definitions: {
      countryside: 'The land outside cities.',
      farm: 'A place where people grow food.',
      quiet: 'With little or no noise.',
      peaceful: 'Quiet and calm.'
    }
  },
  make_sentence: {
    instructions_easy: 'Unscramble the words to make a correct sentence.',
    instructions_advanced: 'Unscramble the words to make a correct sentence.',
    sentences_easy: [
      { scrambled: ['The', 'farm', 'is', 'quiet'], answer: 'The farm is quiet.' },
      { scrambled: ['I', 'see', 'a', 'cow'], answer: 'I see a cow.' },
      { scrambled: ['The', 'countryside', 'is', 'peaceful'], answer: 'The countryside is peaceful.' },
      { scrambled: ['I', 'see', 'a', 'chicken'], answer: 'I see a chicken.' },
      { scrambled: ['The', 'field', 'is', 'green'], answer: 'The field is green.' },
      { scrambled: ['The', 'farm', 'is', 'clean'], answer: 'The farm is clean.' },
      { scrambled: ['The', 'tree', 'is', 'tall'], answer: 'The tree is tall.' },
      { scrambled: ['I', 'see', 'animals'], answer: 'I see animals.' },
      { scrambled: ['The', 'farm', 'has', 'cows'], answer: 'The farm has cows.' },
      { scrambled: ['The', 'countryside', 'is', 'clean'], answer: 'The countryside is clean.' }
    ],
    sentences_advanced: [
      { scrambled: ['The', 'city', 'is', 'noisy', 'but', 'the', 'farm', 'is', 'quiet'], answer: 'The city is noisy, but the farm is quiet.', base_words: ['the', 'city', 'is', 'noisy', 'but', 'the', 'farm', 'is', 'quiet'], time_phrases: [], location_phrases: [] },
      { scrambled: ['The', 'city', 'is', 'dirty', 'but', 'the', 'farm', 'is', 'clean'], answer: 'The city is dirty, but the farm is clean.', base_words: ['the', 'city', 'is', 'dirty', 'but', 'the', 'farm', 'is', 'clean'], time_phrases: [], location_phrases: [] },
      { scrambled: ['The', 'city', 'is', 'busy', 'but', 'the', 'countryside', 'is', 'peaceful'], answer: 'The city is busy, but the countryside is peaceful.', base_words: ['the', 'city', 'is', 'busy', 'but', 'the', 'countryside', 'is', 'peaceful'], time_phrases: [], location_phrases: [] },
      { scrambled: ['The', 'farm', 'has', 'animals'], answer: 'The farm has animals.', base_words: ['the', 'farm', 'has', 'animals'], time_phrases: [], location_phrases: [] },
      { scrambled: ['I', 'see', 'a', 'cow', 'on', 'the', 'farm'], answer: 'I see a cow on the farm.', base_words: ['I', 'see', 'a', 'cow', 'on', 'the', 'farm'], time_phrases: [], location_phrases: [] },
      { scrambled: ['I', 'see', 'a', 'chicken', 'in', 'the', 'field'], answer: 'I see a chicken in the field.', base_words: ['I', 'see', 'a', 'chicken', 'in', 'the', 'field'], time_phrases: [], location_phrases: [] },
      { scrambled: ['The', 'tree', 'is', 'tall', 'and', 'green'], answer: 'The tree is tall and green.', base_words: ['the', 'tree', 'is', 'tall', 'and', 'green'], time_phrases: [], location_phrases: [] },
      { scrambled: ['The', 'cow', 'eats', 'grass', 'on', 'the', 'farm'], answer: 'The cow eats grass on the farm.', base_words: ['the', 'cow', 'eats', 'grass', 'on', 'the', 'farm'], time_phrases: [], location_phrases: [] },
      { scrambled: ['The', 'countryside', 'has', 'many', 'animals'], answer: 'The countryside has many animals.', base_words: ['the', 'countryside', 'has', 'many', 'animals'], time_phrases: [], location_phrases: [] },
      { scrambled: ['The', 'farm', 'is', 'quiet', 'and', 'peaceful'], answer: 'The farm is quiet and peaceful.', base_words: ['the', 'farm', 'is', 'quiet', 'and', 'peaceful'], time_phrases: [], location_phrases: [] }
    ]
  },
  ask_me: {
    instructions_easy: 'Ask a question that matches the context.',
    instructions_advanced: 'Ask a question that matches the context.',
    contexts_easy: [
      {
        id: 'w10_cow_where',
        task_type: 'find_question',
        topic: 'cow',
        intro: 'The cow is on the farm. Ask me where the cow is.',
        acceptedQuestions: [
          'Where is the cow?',
          'Where is it?',
          'Where is the chicken?'
        ],
        answer: 'The cow is on the farm.',
        question_hints: ['Where is the cow?', 'Where is it?', 'Where is the animal?'],
        required_question_words: ['where'],
        required_keywords: ['cow'],
        hints: {
          words: ['where', 'is', 'the', 'cow'],
          tricky: ['what', 'who']
        }
      },
      {
id: 'w10_chicken_where',
        task_type: 'find_question',
        topic: 'chicken',
        intro: 'The chicken is in the field. Ask me where the chicken is.',
        acceptedQuestions: [
          'Where is the chicken?',
          'Where is it?',
          'Where is the cow?'
        ],
        answer: 'The chicken is in the field.',
        question_hints: ['Where is the chicken?', 'Where is it?', 'Where is the animal?'],
        required_question_words: ['where'],
        required_keywords: ['chicken'],
        hints: {
          words: ['where', 'is', 'the', 'chicken'],
          tricky: ['what', 'who']
        }
      },
      {
        id: 'w10_farm_what',
        task_type: 'find_question',
        topic: 'farm',
        intro: 'The farm is quiet and clean. Ask me what the farm is like.',
        acceptedQuestions: [
          'What is the farm like?',
          'How is the farm?',
          'What is it like?'
        ],
        answer: 'The farm is quiet and clean.',
        question_hints: ['What is the farm like?', 'How is the farm?', 'What is it like?'],
        required_question_words: ['what', 'how'],
        required_keywords: ['farm'],
        hints: {
          words: ['what', 'is', 'the', 'farm', 'like'],
          tricky: ['where', 'who']
        }
      },
      {
        id: 'w10_see_what',
        task_type: 'find_question',
        topic: 'see',
        intro: 'I see animals on the farm. Ask me what I see.',
        acceptedQuestions: [
          'What do you see?',
          'What do you see on the farm?',
          'What is there?'
        ],
        answer: 'I see animals on the farm.',
        question_hints: ['What do you see?', 'What do you see on the farm?', 'What is there?'],
        required_question_words: ['what'],
        required_keywords: ['see', 'you'],
        hints: {
          words: ['what', 'do', 'you', 'see'],
          tricky: ['where', 'who']
        }
      },
      {
        id: 'w10_cow_eat',
        task_type: 'find_question',
        topic: 'eat',
        intro: 'The cow eats grass. Ask me what the cow eats.',
        acceptedQuestions: [
          'What does the cow eat?',
          'What does it eat?',
          'What do cows eat?'
        ],
        answer: 'The cow eats grass.',
        question_hints: ['What does the cow eat?', 'What does it eat?', 'What do they eat?'],
        required_question_words: ['what'],
        required_keywords: ['eat', 'cow'],
        hints: {
          words: ['what', 'does', 'the', 'cow', 'eat'],
          tricky: ['where', 'who']
        }
      },
      {
        id: 'w10_tree_where',
        task_type: 'find_question',
        topic: 'tree',
        intro: 'The tree is in the field. Ask me where the tree is.',
        acceptedQuestions: [
          'Where is the tree?',
          'Where is it?',
          'Where are the trees?'
        ],
        answer: 'The tree is in the field.',
        question_hints: ['Where is the tree?', 'Where is it?', 'Where are the trees?'],
        required_question_words: ['where'],
        required_keywords: ['tree'],
        hints: {
          words: ['where', 'is', 'the', 'tree'],
          tricky: ['what', 'who']
        }
      },
      {
        id: 'w10_field_color',
        task_type: 'find_question',
        topic: 'field',
        intro: 'The field is green. Ask me what color the field is.',
        acceptedQuestions: [
          'What color is the field?',
          'What color is it?',
          'How is the field?'
        ],
        answer: 'The field is green.',
        question_hints: ['What color is the field?', 'What color is it?', 'How is the field?'],
        required_question_words: ['what', 'color', 'how'],
        required_keywords: ['field'],
        hints: {
          words: ['what', 'color', 'is', 'the', 'field'],
          tricky: ['where', 'who']
        }
      },
      {
        id: 'w10_animals_where',
        task_type: 'find_question',
        topic: 'animals',
        intro: 'The animals are on the farm. Ask me where the animals are.',
        acceptedQuestions: [
          'Where are the animals?',
          'Where are they?',
          'Where is the cow?'
        ],
        answer: 'The animals are on the farm.',
        question_hints: ['Where are the animals?', 'Where are they?', 'Where is the cow?'],
        required_question_words: ['where'],
        required_keywords: ['animals'],
        hints: {
          words: ['where', 'are', 'the', 'animals'],
          tricky: ['what', 'who']
        }
      },
      {
        id: 'w10_mini_farm',
        task_type: 'mini_interview',
        topic: 'farm',
        intro: 'Interview me: ask what I see, then ask where the cow is.',
        steps: [
          {
            prompt: 'Ask what I see on the farm.',
            required_question_words: ['what'],
            required_keywords: ['see'],
            question_hints: ['What do you see?', 'What do you see on the farm?', 'What is there?']
          },
          {
            prompt: 'Ask where the cow is.',
            acceptedQuestions: [
              'Where is the cow?',
              'Where is it?',
              'Where are the animals?'
            ],
            required_question_words: ['where'],
            required_keywords: ['cow'],
            question_hints: ['Where is the cow?', 'Where is it?', 'Where is the animal?']
          }
        ],
        hints: {
          words: ['what', 'do', 'you', 'see', 'where', 'is', 'cow'],
          tricky: ['who', 'when']
        }
      }
    ],
    contexts_advanced: [
      {
        id: 'w10_cow_where_adv',
        task_type: 'find_question',
        topic: 'cow',
        intro: 'The cow is on the farm. Ask me where the cow is.',
        acceptedQuestions: [
          'Where is the cow?',
          'Where is it?',
          'Where can I see a cow?'
        ],
        answer: 'The cow is on the farm.',
        question_hints: ['Where is the cow?', 'Where is it?', 'Where can I see a cow?'],
        required_question_words: ['where'],
        required_keywords: ['cow'],
        hints: {
          words: ['where', 'is', 'the', 'cow'],
          tricky: ['what', 'who']
        }
      },
      {
        id: 'w10_chicken_where_adv',
        task_type: 'find_question',
        topic: 'chicken',
        intro: 'The chicken is in the field. Ask me where the chicken is.',
        acceptedQuestions: [
          'Where is the chicken?',
          'Where is it?',
          'Where can I find a chicken?'
        ],
        answer: 'The chicken is in the field.',
        question_hints: ['Where is the chicken?', 'Where is it?', 'Where can I find a chicken?'],
        required_question_words: ['where'],
        required_keywords: ['chicken'],
        hints: {
          words: ['where', 'is', 'the', 'chicken'],
          tricky: ['what', 'who']
        }
      },
      {
        id: 'w10_difference_what',
        task_type: 'find_question',
        topic: 'difference',
        intro: 'The city is noisy, but the farm is quiet. Ask me what the difference is.',
        acceptedQuestions: [
          'What is the difference?',
          'How is the farm different?',
          'How is the farm different from the city?'
        ],
        answer: 'The city is noisy, but the farm is quiet.',
        question_hints: ['What is the difference?', 'How is the farm different?', 'How is it different?'],
        required_question_words: ['what', 'how'],
        required_keywords: ['difference', 'different'],
        hints: {
          words: ['what', 'is', 'the', 'difference', 'how', 'different'],
          tricky: ['where', 'who']
        }
      },
      {
        id: 'w10_countryside_what',
        task_type: 'find_question',
        topic: 'countryside',
        intro: 'The countryside is peaceful and clean. Ask me what the countryside is like.',
        acceptedQuestions: [
          'What is the countryside like?',
          'How is the countryside?',
          'What is it like?'
        ],
        answer: 'The countryside is peaceful and clean.',
        question_hints: ['What is the countryside like?', 'How is the countryside?', 'What is it like?'],
        required_question_words: ['what', 'how'],
        required_keywords: ['countryside'],
        hints: {
          words: ['what', 'is', 'the', 'countryside', 'like'],
          tricky: ['where', 'who']
        }
      },
      {
        id: 'w10_animals_see',
        task_type: 'find_question',
        topic: 'animals_see',
        intro: 'I see cows and chickens on the farm. Ask me what animals I see.',
        acceptedQuestions: [
          'What animals do you see?',
          'What do you see on the farm?',
          'What animals are there?'
        ],
        answer: 'I see cows and chickens on the farm.',
        question_hints: ['What animals do you see?', 'What do you see?', 'What animals are there?'],
        required_question_words: ['what'],
        required_keywords: ['animals', 'see'],
        hints: {
          words: ['what', 'animals', 'do', 'you', 'see'],
          tricky: ['where', 'who']
        }
      },
      {
        id: 'w10_cow_eat_adv',
        task_type: 'find_question',
        topic: 'eat_adv',
        intro: 'The cow eats grass in the field. Ask me what the cow eats.',
        acceptedQuestions: [
          'What does the cow eat?',
          'What does it eat?',
          'What do cows eat?'
        ],
        answer: 'The cow eats grass in the field.',
        question_hints: ['What does the cow eat?', 'What does it eat?', 'What do they eat?'],
        required_question_words: ['what'],
        required_keywords: ['eat', 'cow'],
        hints: {
          words: ['what', 'does', 'the', 'cow', 'eat'],
          tricky: ['where', 'who']
        }
      },
      {
        id: 'w10_tree_color',
        task_type: 'find_question',
        topic: 'tree_color',
        intro: 'The tree is green and tall. Ask me what color the tree is.',
        acceptedQuestions: [
          'What color is the tree?',
          'What color is it?',
          'How is the tree?'
        ],
        answer: 'The tree is green and tall.',
        question_hints: ['What color is the tree?', 'What color is it?', 'How is the tree?'],
        required_question_words: ['what', 'color', 'how'],
        required_keywords: ['tree', 'color'],
        hints: {
          words: ['what', 'color', 'is', 'the', 'tree'],
          tricky: ['where', 'who']
        }
      },
      {
        id: 'w10_animals_where_adv',
        task_type: 'find_question',
        topic: 'animals_where',
        intro: 'The animals are on the farm. Ask me where the animals are.',
        acceptedQuestions: [
          'Where are the animals?',
          'Where are they?',
          'Where can I see animals?'
        ],
        answer: 'The animals are on the farm.',
        question_hints: ['Where are the animals?', 'Where are they?', 'Where can I see animals?'],
        required_question_words: ['where'],
        required_keywords: ['animals'],
        hints: {
          words: ['where', 'are', 'the', 'animals'],
          tricky: ['what', 'who']
        }
      },
      {
        id: 'w10_farm_why',
        task_type: 'find_question',
        topic: 'farm_why',
        intro: 'The farm is quiet because it is in the countryside. Ask me why the farm is quiet.',
        acceptedQuestions: [
          'Why is the farm quiet?',
          'Why is it quiet?',
          'Why is the farm so peaceful?'
        ],
        answer: 'The farm is quiet because it is in the countryside.',
        question_hints: ['Why is the farm quiet?', 'Why is it quiet?', 'Why is it peaceful?'],
        required_question_words: ['why'],
        required_keywords: ['farm', 'quiet'],
        hints: {
          words: ['why', 'is', 'the', 'farm', 'quiet'],
          tricky: ['where', 'what']
        }
      },
      {
        id: 'w10_mini_farm_adv',
        task_type: 'mini_interview',
        topic: 'farm_adv',
        intro: 'Interview me: ask what the farm has, then ask what the countryside is like.',
        steps: [
          {
            prompt: 'Ask what the farm has.',
            required_question_words: ['what'],
            required_keywords: ['farm', 'has'],
            question_hints: ['What does the farm have?', 'What is on the farm?', 'What is there?']
          },
          {
            prompt: 'Ask what the countryside is like.',
            acceptedQuestions: [
              'What is the countryside like?',
              'How is the countryside?',
              'What is it like?'
            ],
            required_question_words: ['what', 'how'],
            required_keywords: ['countryside'],
            question_hints: ['What is the countryside like?', 'How is the countryside?', 'What is it like?']
          }
        ],
        hints: {
          words: ['what', 'does', 'farm', 'have', 'countryside', 'like'],
          tricky: ['where', 'who']
        }
      }
    ],
    required_question_words_easy: ['where', 'what', 'how'],
    required_question_words_advanced: ['where', 'what', 'how', 'why']
  }
};

export default week10GamesAdvanced;
