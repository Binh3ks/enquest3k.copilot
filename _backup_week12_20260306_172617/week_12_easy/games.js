/**
 * Week 12 Game Data - Advanced Mode (New GameHub)  
 * Theme: The Talent Show (Abilities)
 * Grammar: Modal "can" for abilities
 */

export const week12GamesAdvanced = {
  vocabulary: [
    'sing', 'dance', 'run', 'jump', 'climb', 'ride a bike',
    'draw', 'swim', 'cook', 'play'
  ],
  show_tell: {
    steps: 3,
    word_list: [
      'sing', 'dance', 'run', 'jump', 'climb', 'ride a bike',
      'draw', 'swim', 'cook', 'play'
    ],
    instructions_easy: 'Say the word, add a phrase, then make a full sentence.',
    instructions_advanced: 'Say the word, add details, then create a complete sentence.',
    step_instructions: {
      1: 'Step 1: say the word clearly with correct pronunciation.',
      2: 'Step 2: add descriptive details about the word.',
      3: 'Step 3: create a complete, grammatically correct sentence.'
    },
    frames_easy: ['I can ___', 'I can ___ well'],
    frames_advanced: ['I can ___ very well', 'I love to ___', 'At the talent show, I can ___'],
    details_easy: [],
    details_advanced: [],
    detail_map: {
      sing: ['sing a song', 'sing beautifully', 'sing well', 'sing loudly'],
      dance: ['dance to music', 'dance well', 'dance beautifully', 'dance fast'],
      run: ['run fast', 'run quickly', 'run every day', 'run well'],
      jump: ['jump high', 'jump far', 'jump well', 'jump over things'],
      climb: ['climb a tree', 'climb mountains', 'climb well', 'climb high'],
      'ride a bike': ['ride my bike', 'ride a bike fast', 'ride a bike well', 'ride every day'],
      draw: ['draw pictures', 'draw well', 'draw animals', 'draw beautifully'],
      swim: ['swim fast', 'swim well', 'swim in the pool', 'swim every week'],
      cook: ['cook food', 'cook well', 'cook dinner', 'cook delicious meals'],
      play: ['play soccer', 'play games', 'play basketball', 'play with friends']
    },
    distractors_easy: [],
    distractors_advanced: [],
    distractor_map: {
      sing: ['dance', 'run', 'jump'],
      dance: ['sing', 'swim', 'draw'],
      run: ['jump', 'climb', 'swim'],
      jump: ['run', 'climb', 'dance'],
      climb: ['jump', 'run', 'swim']
    },
    frame_map: {
      sing: ['I can sing', 'I love to sing', 'I can sing a song'],
      dance: ['I can dance', 'I love to dance', 'I can dance well'],
      run: ['I can run', 'I can run fast', 'I love to run'],
      jump: ['I can jump', 'I can jump high', 'I love to jump'],
      climb: ['I can climb', 'I can climb a tree', 'I love to climb'],
      'ride a bike': ['I can ride a bike', 'I love to ride a bike', 'I can ride my bike'],
      draw: ['I can draw', 'I can draw pictures', 'I love to draw'],
      swim: ['I can swim', 'I can swim fast', 'I love to swim'],
      cook: ['I can cook', 'I can cook food', 'I love to cook'],
      play: ['I can play', 'I can play soccer', 'I love to play']
    },
    sentence_hints_map: {
      sing: ['I can sing very well.', 'I love to sing at the talent show.', 'I can sing a beautiful song.'],
      dance: ['I can dance to music.', 'I love to dance at parties.', 'I can dance very well.'],
      run: ['I can run very fast.', 'I love to run every morning.', 'I can run faster than my friends.'],
      jump: ['I can jump very high.', 'I love to jump rope.', 'I can jump over the box.'],
      climb: ['I can climb a tall tree.', 'I love to climb mountains.', 'I can climb very well.'],
      'ride a bike': ['I can ride a bike fast.', 'I love to ride my bike in the park.', 'I can ride a bike without help.'],
      draw: ['I can draw beautiful pictures.', 'I love to draw animals.', 'I can draw very well.'],
      swim: ['I can swim in the pool.', 'I love to swim in summer.', 'I can swim very fast.'],
      cook: ['I can cook delicious food.', 'I love to cook with my mom.', 'I can cook simple meals.'],
      play: ['I can play soccer well.', 'I love to play with my friends.', 'I can play basketball too.']
    },
    emoji_map: {
      sing: '🎤',
      dance: '💃',
      run: '🏃',
      jump: '🤸',
      climb: '🧗',
      'ride a bike': '🚴',
      draw: '🎨',
      swim: '🏊',
      cook: '👨‍🍳',
      play: '⚽'
    },
    definitions: {
      sing: 'To make music with your voice.',
      dance: 'To move your body to music.',
      run: 'To move fast on your feet.',
      jump: 'To push yourself up into the air.',
      climb: 'To go up using your hands and feet.',
      'ride a bike': 'To travel on a bicycle.',
      draw: 'To make pictures with a pencil or pen.',
      swim: 'To move through water.',
      cook: 'To make food using heat.',
      play: 'To have fun with games or sports.'
    }
  },
  make_sentence: {
    instructions_easy: 'Unscramble the words to make a correct sentence.',
    instructions_advanced: 'Unscramble the words to form grammatically correct sentences.',
    sentences_easy: [
      { scrambled: ['I', 'can', 'sing'], answer: 'I can sing.', base_words: ['I', 'can', 'sing'], time_phrases: ['every day', 'always', 'now'], location_phrases: ['at home', 'on stage', 'here'] },
      { scrambled: ['I', 'can', 'dance'], answer: 'I can dance.', base_words: ['I', 'can', 'dance'], time_phrases: ['every day', 'always', 'now'], location_phrases: ['at home', 'at parties', 'here'] },
      { scrambled: ['I', 'can', 'run', 'fast'], answer: 'I can run fast.', base_words: ['I', 'can', 'run', 'fast'], time_phrases: ['every day', 'always', 'now'], location_phrases: ['in the park', 'at school', 'here'] },
      { scrambled: ['I', 'can', 'jump', 'high'], answer: 'I can jump high.', base_words: ['I', 'can', 'jump', 'high'], time_phrases: ['every day', 'always', 'now'], location_phrases: ['here', 'outside', 'at school'] },
      { scrambled: ['I', 'can', 'draw'], answer: 'I can draw.', base_words: ['I', 'can', 'draw'], time_phrases: ['every day', 'always', 'now'], location_phrases: ['at home', 'at school', 'here'] },
      { scrambled: ['I', 'can', 'swim'], answer: 'I can swim.', base_words: ['I', 'can', 'swim'], time_phrases: ['every week', 'in summer', 'now'], location_phrases: ['in the pool', 'at the beach', 'here'] },
      { scrambled: ['I', 'can', 'ride', 'a', 'bike'], answer: 'I can ride a bike.', base_words: ['I', 'can', 'ride', 'a', 'bike'], time_phrases: ['every day', 'on weekends', 'now'], location_phrases: ['in the park', 'outside', 'here'] },
      { scrambled: ['I', 'can', 'climb'], answer: 'I can climb.', base_words: ['I', 'can', 'climb'], time_phrases: ['every day', 'always', 'now'], location_phrases: ['trees', 'mountains', 'here'] },
      { scrambled: ['I', 'can', 'cook'], answer: 'I can cook.', base_words: ['I', 'can', 'cook'], time_phrases: ['every day', 'on weekends', 'now'], location_phrases: ['at home', 'in the kitchen', 'here'] },
      { scrambled: ['I', 'can', 'play'], answer: 'I can play.', base_words: ['I', 'can', 'play'], time_phrases: ['every day', 'always', 'now'], location_phrases: ['outside', 'at the park', 'here'] }
    ],
    sentences_advanced: [
      { scrambled: ['I', 'can', 'sing', 'a', 'song'], answer: 'I can sing a song.', base_words: ['I', 'can', 'sing', 'a', 'song'], time_phrases: ['at the talent show', 'on stage', 'now'], location_phrases: ['beautifully', 'well', 'loudly'] },
      { scrambled: ['I', 'can', 'dance', 'to', 'music'], answer: 'I can dance to music.', base_words: ['I', 'can', 'dance', 'to', 'music'], time_phrases: ['at parties', 'at the show', 'now'], location_phrases: ['beautifully', 'well', 'fast'] },
      { scrambled: ['I', 'can', 'run', 'very', 'fast'], answer: 'I can run very fast.', base_words: ['I', 'can', 'run', 'very', 'fast'], time_phrases: ['every morning', 'in races', 'now'], location_phrases: ['in the park', 'at school'] },
      { scrambled: ['I', 'can', 'jump', 'very', 'high'], answer: 'I can jump very high.', base_words: ['I', 'can', 'jump', 'very', 'high'], time_phrases: ['at the gym', 'in class', 'now'], location_phrases: ['over things', 'far'] },
      { scrambled: ['I', 'can', 'draw', 'beautiful', 'pictures'], answer: 'I can draw beautiful pictures.', base_words: ['I', 'can', 'draw', 'beautiful', 'pictures'], time_phrases: ['every day', 'at school', 'now'], location_phrases: ['of animals', 'of people'] },
      { scrambled: ['I', 'can', 'swim', 'in', 'the', 'pool'], answer: 'I can swim in the pool.', base_words: ['I', 'can', 'swim', 'in', 'the', 'pool'], time_phrases: ['every week', 'in summer', 'now'], location_phrases: ['fast', 'well'] },
      { scrambled: ['I', 'can', 'ride', 'a', 'bike', 'fast'], answer: 'I can ride a bike fast.', base_words: ['I', 'can', 'ride', 'a', 'bike', 'fast'], time_phrases: ['every day', 'on weekends', 'now'], location_phrases: ['in the park', 'outside'] },
      { scrambled: ['I', 'can', 'climb', 'a', 'tree'], answer: 'I can climb a tree.', base_words: ['I', 'can', 'climb', 'a', 'tree'], time_phrases: ['at the park', 'on weekends', 'now'], location_phrases: ['high', 'easily'] },
      { scrambled: ['I', 'can', 'cook', 'delicious', 'food'], answer: 'I can cook delicious food.', base_words: ['I', 'can', 'cook', 'delicious', 'food'], time_phrases: ['every day', 'on weekends', 'now'], location_phrases: ['at home', 'in the kitchen'] },
      { scrambled: ['I', 'can', 'play', 'soccer', 'well'], answer: 'I can play soccer well.', base_words: ['I', 'can', 'play', 'soccer', 'well'], time_phrases: ['every day', 'at school', 'now'], location_phrases: ['in the field', 'with friends'] }
    ]
  },
  ask_me: {
    instructions_easy: 'Ask a question that matches the context.',
    instructions_advanced: 'Formulate an appropriate question based on the given context.',
    contexts_easy: [
      {
        id: 'w12_sing_can',
        task_type: 'find_question',
        topic: 'sing',
        intro: 'I can sing a song. Ask me if I can sing.',
        acceptedQuestions: [
          'Can you sing?',
          'Can you sing a song?',
          'Can you sing well?'
        ],
        answer: 'Yes, I can sing.',
        question_hints: ['Can you sing?', 'Can you sing a song?', 'Can you sing well?'],
        required_question_words: ['can'],
        required_keywords: ['sing'],
        hints: {
          words: ['can', 'you', 'sing'],
          tricky: ['do', 'are']
        }
      },
      {
        id: 'w12_dance_can',
        task_type: 'find_question',
        topic: 'dance',
        intro: 'I can dance to music. Ask me if I can dance.',
        acceptedQuestions: [
          'Can you dance?',
          'Can you dance to music?',
          'Can you dance well?'
        ],
        answer: 'Yes, I can dance.',
        question_hints: ['Can you dance?', 'Can you dance to music?', 'Can you dance well?'],
        required_question_words: ['can'],
        required_keywords: ['dance'],
        hints: {
          words: ['can', 'you', 'dance'],
          tricky: ['do', 'are']
        }
      },
      {
        id: 'w12_run_can',
        task_type: 'find_question',
        topic: 'run',
        intro: 'I can run very fast. Ask me if I can run fast.',
        acceptedQuestions: [
          'Can you run fast?',
          'Can you run?',
          'Can you run very fast?'
        ],
        answer: 'Yes, I can run fast.',
        question_hints: ['Can you run fast?', 'Can you run?', 'Can you run very fast?'],
        required_question_words: ['can'],
        required_keywords: ['run'],
        hints: {
          words: ['can', 'you', 'run', 'fast'],
          tricky: ['do', 'are']
        }
      },
      {
        id: 'w12_draw_can',
        task_type: 'find_question',
        topic: 'draw',
        intro: 'I can draw pictures. Ask me if I can draw.',
        acceptedQuestions: [
          'Can you draw?',
          'Can you draw pictures?',
          'Can you draw well?'
        ],
        answer: 'Yes, I can draw.',
        question_hints: ['Can you draw?', 'Can you draw pictures?', 'Can you draw well?'],
        required_question_words: ['can'],
        required_keywords: ['draw'],
        hints: {
          words: ['can', 'you', 'draw'],
          tricky: ['do', 'are']
        }
      },
      {
        id: 'w12_swim_can',
        task_type: 'find_question',
        topic: 'swim',
        intro: 'I can swim in the pool. Ask me if I can swim.',
        acceptedQuestions: [
          'Can you swim?',
          'Can you swim in the pool?',
          'Can you swim well?'
        ],
        answer: 'Yes, I can swim.',
        question_hints: ['Can you swim?', 'Can you swim in the pool?', 'Can you swim well?'],
        required_question_words: ['can'],
        required_keywords: ['swim'],
        hints: {
          words: ['can', 'you', 'swim'],
          tricky: ['do', 'are']
        }
      }
    ],
    contexts_advanced: [
      {
        id: 'w12_talent_what',
        task_type: 'find_question',
        topic: 'talent',
        intro: 'My talent is singing. Ask me what my talent is.',
        acceptedQuestions: [
          'What is your talent?',
          'What can you do?',
          'What is your special talent?'
        ],
        answer: 'My talent is singing.',
        question_hints: ['What is your talent?', 'What can you do?', 'What is your special talent?'],
        required_question_words: ['what'],
        required_keywords: ['talent'],
        hints: {
          words: ['what', 'is', 'your', 'talent'],
          tricky: ['who', 'when']
        }
      },
      {
        id: 'w12_best_what',
        task_type: 'find_question',
        topic: 'best talent',
        intro: 'I can sing best. Ask me what I can do best.',
        acceptedQuestions: [
          'What can you do best?',
          'What is your best talent?',
          'What can you do well?'
        ],
        answer: 'I can sing best.',
        question_hints: ['What can you do best?', 'What is your best talent?', 'What can you do well?'],
        required_question_words: ['what'],
        required_keywords: ['best', 'talent'],
        hints: {
          words: ['what', 'can', 'you', 'do', 'best'],
          tricky: ['who', 'when']
        }
      }
    ]
  }
};
