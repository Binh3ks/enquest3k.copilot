/**
 * Week 12 Game Data - Advanced Mode (New GameHub)
 */

export const week12GamesAdvanced = {
  vocabulary: [
    'sing', 'dance', 'run', 'jump', 'climb',
    'draw', 'ride', 'swim', 'cook', 'play'
  ],
  show_tell: {
    steps: 3,
    word_list: [
      'sing', 'dance', 'run', 'jump', 'climb',
      'draw', 'ride', 'swim', 'cook', 'play'
    ],
    instructions_easy: 'Say the word, add a phrase, then make a full sentence.',
    instructions_advanced: 'Say the word, add a phrase, then make a full sentence.',
    step_instructions: {
      1: 'Step 1: say the word clearly.',
      2: 'Step 2: add a short phrase with the word.',
      3: 'Step 3: make a full sentence.'
    },
    frames_easy: ['I can ___', 'I can ___ well'],
    frames_advanced: ['I can ___ very well', 'She can ___ beautifully'],
    details_easy: [],
    details_advanced: [],
    detail_map: {
      sing: ['sing songs', 'sing well', 'I can sing', 'I can sing beautifully'],
      dance: ['dance to music', 'dance well', 'I can dance', 'She can dance very well'],
      run: ['run fast', 'run every day', 'I can run', 'He can run super fast'],
      jump: ['jump high', 'jump rope', 'I can jump', 'I can jump really high'],
      climb: ['climb trees', 'climb walls', 'I can climb', 'I can climb easily'],
      draw: ['draw pictures', 'draw well', 'I can draw', 'I can draw amazing pictures'],
      ride: ['ride a bike', 'ride well', 'I can ride', 'I can ride with one hand'],
      swim: ['swim fast', 'swim well', 'I can swim', 'I can swim like a fish'],
      cook: ['cook food', 'cook well', 'I can cook', 'I can cook delicious food'],
      play: ['play piano', 'play music', 'I can play', 'I can play the piano']
    }
  }
};

export default week12GamesAdvanced;
