/**
 * Week 20 Game Data - Easy Mode (GameHub)
 * Theme: My Neighborhood Then and Now
 * Grammar: There was / There were (Past Existence)
 * Tier 1 Vocabulary - Simple, Personal Context
 */

export const week20GamesEasy = {
  vocabulary: [
    'old', 'new', 'building', 'tree', 'river',
    'road', 'bridge', 'market', 'temple', 'village'
  ],
  show_tell: {
    steps: 3,
    word_list: [
      'old', 'new', 'building', 'tree', 'river',
      'road', 'bridge', 'market', 'temple', 'village'
    ],
    instructions_easy: 'Say the word, add a phrase, then make a full sentence.',
    instructions_advanced: 'Say the word, add a phrase, then make a full sentence.',
    step_instructions: {
      1: 'Step 1: say the word clearly.',
      2: 'Step 2: add a short phrase.',
      3: 'Step 3: make a sentence with There was or There were.'
    },
    frames_easy: ['There was a ___ near my house', 'There were ___ in my town'],
    frames_advanced: ['There was a ___ in the old town', 'There were ___ near the river'],
    details_easy: [],
    details_advanced: [],
    detail_map: {
      'old': ['old', 'very old', 'There was old...', 'There was an old building near my house.'],
      'new': ['new', 'brand new', 'There is new...', 'There is a new road near my house.'],
      'building': ['building', 'big building', 'There was a building', 'There was a building near the market.'],
      'tree': ['tree', 'big tree', 'There were trees', 'There were trees on my road.'],
      'river': ['river', 'clean river', 'There was a river', 'There was a river near my town.'],
      'road': ['road', 'long road', 'There was a road', 'There was one road in the village.'],
      'bridge': ['bridge', 'old bridge', 'There was a bridge', 'There was a bridge over the river.'],
      'market': ['market', 'old market', 'There was a market', 'There was a market near my house.'],
      'temple': ['temple', 'old temple', 'There was a temple', 'There was a temple in the village.'],
      'village': ['village', 'small village', 'There was a village', 'There was a village here before.']
    },
    distractor_map: {
      'old': ['brand new', 'just made', 'very modern'],
      'new': ['very old', 'broken down', 'ancient'],
      'building': ['open field', 'empty land', 'river bank'],
      'tree': ['road sign', 'building wall', 'bridge rail'],
      'river': ['dry sand', 'mountain', 'open field']
    },
    sentence_hints_map: {
      'old': ['There was an old market.', 'There was an old bridge.', 'There were old buildings.'],
      'new': ['There is a new road.', 'There is a new bridge.', 'There are new buildings.'],
      'building': ['There was a building.', 'There were buildings.', 'There was a big building.'],
      'tree': ['There were trees.', 'There was a tree.', 'There were big trees.'],
      'river': ['There was a river.', 'There is a river.', 'The river was clean.'],
      'road': ['There was a road.', 'There is a new road.', 'There were roads.'],
      'bridge': ['There was a bridge.', 'There is a bridge.', 'The bridge was old.'],
      'market': ['There was a market.', 'There is a market.', 'There were markets.'],
      'temple': ['There was a temple.', 'The temple is old.', 'The temple is still there.'],
      'village': ['There was a village.', 'There is a village.', 'The village was small.']
    },
    definitions: {
      'old': 'Not new; from long ago.',
      'new': 'Recently made.',
      'building': 'A house or big structure.',
      'tree': 'A big plant with a trunk.',
      'river': 'A big water flow.',
      'road': 'A path for cars.',
      'bridge': 'To cross a river.',
      'market': 'A place to buy things.',
      'temple': 'A place to pray.',
      'village': 'A small town.'
    },
    audio_map: {
      'old': '/audio/week20_easy/vocab_old.mp3',
      'new': '/audio/week20_easy/vocab_new.mp3',
      'building': '/audio/week20_easy/vocab_building.mp3',
      'tree': '/audio/week20_easy/vocab_tree.mp3',
      'river': '/audio/week20_easy/vocab_river.mp3',
      'road': '/audio/week20_easy/vocab_road.mp3',
      'bridge': '/audio/week20_easy/vocab_bridge.mp3',
      'market': '/audio/week20_easy/vocab_market.mp3',
      'temple': '/audio/week20_easy/vocab_temple.mp3',
      'village': '/audio/week20_easy/vocab_village.mp3'
    }
  },
  memory_flip: {
    pairs: [
      { word: 'old', image: '/images/week20/old.jpg' },
      { word: 'new', image: '/images/week20/new.jpg' },
      { word: 'building', image: '/images/week20/building.jpg' },
      { word: 'tree', image: '/images/week20/tree.jpg' },
      { word: 'river', image: '/images/week20/river.jpg' },
      { word: 'road', image: '/images/week20/road.jpg' },
      { word: 'bridge', image: '/images/week20/bridge.jpg' },
      { word: 'market', image: '/images/week20/market.jpg' },
      { word: 'temple', image: '/images/week20/temple.jpg' },
      { word: 'village', image: '/images/week20/village.jpg' }
    ]
  },
  sentence_builder: {
    sentences: [
      { words: ['There', 'was', 'a', 'market', 'near', 'my', 'house', '.'], answer: 'There was a market near my house.' },
      { words: ['There', 'were', 'trees', 'on', 'the', 'road', '.'], answer: 'There were trees on the road.' },
      { words: ['There', 'was', 'a', 'bridge', 'over', 'the', 'river', '.'], answer: 'There was a bridge over the river.' },
      { words: ['There', 'was', 'a', 'temple', 'in', 'the', 'village', '.'], answer: 'There was a temple in the village.' },
      { words: ['There', 'is', 'a', 'new', 'road', 'now', '.'], answer: 'There is a new road now.' }
    ]
  },
  make_sentence: {
    instructions_easy: 'Unscramble the words to make a sentence.',
    instructions_advanced: 'Unscramble the words to make a sentence.',
    sentences_easy: [
      { scrambled: ['There', 'was', 'a', 'market'], answer: 'There was a market.' },
      { scrambled: ['There', 'were', 'trees'], answer: 'There were trees.' },
      { scrambled: ['There', 'was', 'a', 'bridge'], answer: 'There was a bridge.' },
      { scrambled: ['There', 'was', 'a', 'temple'], answer: 'There was a temple.' },
      { scrambled: ['There', 'was', 'a', 'river'], answer: 'There was a river.' },
      { scrambled: ['There', 'were', 'buildings'], answer: 'There were buildings.' },
      { scrambled: ['There', 'was', 'a', 'road'], answer: 'There was a road.' },
      { scrambled: ['There', 'was', 'a', 'village'], answer: 'There was a village.' },
      { scrambled: ['There', 'were', 'old', 'trees'], answer: 'There were old trees.' },
      { scrambled: ['There', 'is', 'a', 'new', 'road'], answer: 'There is a new road.' }
    ],
    sentences_advanced: [
      { scrambled: ['There', 'was', 'a', 'market', 'near', 'my', 'house'], answer: 'There was a market near my house.' },
      { scrambled: ['There', 'were', 'trees', 'on', 'the', 'road'], answer: 'There were trees on the road.' },
      { scrambled: ['There', 'was', 'a', 'bridge', 'over', 'the', 'river'], answer: 'There was a bridge over the river.' },
      { scrambled: ['There', 'was', 'an', 'old', 'temple', 'next', 'to', 'the', 'market'], answer: 'There was an old temple next to the market.' },
      { scrambled: ['There', 'is', 'a', 'new', 'road', 'now'], answer: 'There is a new road now.' },
      { scrambled: ['There', 'were', 'many', 'trees', 'before'], answer: 'There were many trees before.' },
      { scrambled: ['There', 'was', 'a', 'village', 'here'], answer: 'There was a village here.' },
      { scrambled: ['There', 'were', 'buildings', 'near', 'the', 'bridge'], answer: 'There were buildings near the bridge.' },
      { scrambled: ['There', 'was', 'a', 'river', 'in', 'my', 'neighborhood'], answer: 'There was a river in my neighborhood.' },
      { scrambled: ['Now', 'there', 'are', 'new', 'buildings'], answer: 'Now there are new buildings.' }
    ]
  },
  ask_me: {
    instructions_easy: 'Ask a question that matches the context.',
    instructions_advanced: 'Ask a question that matches the context.',
    contexts_easy: [
      {
        id: 'w20e_was_there_market',
        task_type: 'find_question',
        topic: 'my neighborhood',
        intro: 'There was a market near my house. Ask me what was near my house.',
        acceptedQuestions: ['What was near your house?', 'Was there a market near your house?', 'What was there near your house?'],
        answer: 'There was a market near my house.',
        question_hints: ['What was near your house?', 'Was there a market?'],
        required_question_words: ['was', 'there'],
        required_keywords: ['house'],
        hints: { words: ['what', 'was', 'near', 'your', 'house'], tricky: ['where', 'who'] }
      },
      {
        id: 'w20e_were_there_trees',
        task_type: 'find_question',
        topic: 'my neighborhood',
        intro: 'There were trees on the road. Ask me what was on the road.',
        acceptedQuestions: ['What was on the road?', 'Were there trees on the road?', 'What were there on the road?'],
        answer: 'There were trees on the road.',
        question_hints: ['What was on the road?', 'Were there trees?'],
        required_question_words: ['were', 'there'],
        required_keywords: ['road'],
        hints: { words: ['what', 'were', 'on', 'the', 'road'], tricky: ['where', 'who'] }
      }
    ],
    contexts_advanced: [
      {
        id: 'w20e_adv_what_was_near',
        task_type: 'find_question',
        topic: 'neighborhood changes',
        intro: 'There was an old market and a temple near my home. Ask what there was near my home.',
        acceptedQuestions: ['What was there near your home?', 'What was near your home?', 'Were there buildings near your home?'],
        answer: 'There was an old market and a temple.',
        question_hints: ['What was there near your home?'],
        required_question_words: ['what', 'was'],
        required_keywords: ['home'],
        hints: { words: ['what', 'was', 'there', 'near', 'your', 'home'], tricky: ['where', 'who'] }
      }
    ]
  }
};

export default week20GamesEasy;
