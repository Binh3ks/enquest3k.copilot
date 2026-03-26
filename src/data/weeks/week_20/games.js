/**
 * Week 20 Game Data - Advanced Mode (GameHub)
 * Theme: Time Detective Agency - The Old Town Mystery
 * Grammar: There was / There were (Past Existence)
 */

export const week20GamesAdvanced = {
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
    instructions_advanced: 'Use There was / There were to describe the old town.',
    step_instructions: {
      1: 'Step 1: say the word clearly.',
      2: 'Step 2: add a short phrase with the word.',
      3: 'Step 3: make a full sentence using There was or There were.'
    },
    frames_easy: ['There was a ___ in the old town', 'There were many ___ near the river'],
    frames_advanced: ['There was a ___ where the park is now', 'There were ___ along the old road'],
    details_easy: [],
    details_advanced: [],
    detail_map: {
      'old': ['old', 'very old', 'There was an old...', 'There was an old building near the river in the past.'],
      'new': ['new', 'brand new', 'There is a new...', 'There is a new bridge where the old one used to be.'],
      'building': ['building', 'tall building', 'There was a building', 'There was a tall building near the market in the old town.'],
      'tree': ['tree', 'big tree', 'There were trees', 'There were many big trees along the road in the old village.'],
      'river': ['river', 'clean river', 'There was a river', 'There was a clean river flowing through the middle of the town.'],
      'road': ['road', 'long road', 'There was a road', 'There was a long road from the market to the temple.'],
      'bridge': ['bridge', 'wooden bridge', 'There was a bridge', 'There was a wooden bridge over the river one hundred years ago.'],
      'market': ['market', 'old market', 'There was a market', 'There was a busy market near the old temple in the past.'],
      'temple': ['temple', 'old temple', 'There was a temple', 'There was a beautiful old temple in the center of the village.'],
      'village': ['village', 'small village', 'There was a village', 'There was a small village here before the city was built.']
    },
    distractor_map: {
      'old': ['brand new', 'just built', 'modern design'],
      'new': ['very old', 'one hundred years old', 'ancient'],
      'building': ['open field', 'river bank', 'empty land'],
      'tree': ['concrete road', 'tall building', 'empty space'],
      'river': ['dry land', 'sand desert', 'mountain top']
    },
    frame_map: {
      'old': ['There was an old building in the town.'],
      'bridge': ['There was a bridge over the river.'],
      'market': ['There was a market near the temple.']
    },
    sentence_hints_map: {
      'old': ['There was an old market.', 'There was an old bridge.', 'There were old buildings.'],
      'new': ['There is a new road.', 'There is a new bridge.', 'There are new buildings.'],
      'building': ['There was a building.', 'There were buildings.', 'There was a tall building.'],
      'tree': ['There were trees.', 'There were many trees.', 'There was a big tree.'],
      'river': ['There was a river.', 'There was a clean river.', 'The river was beautiful.'],
      'road': ['There was a road.', 'There was one road.', 'There were new roads.'],
      'bridge': ['There was a bridge.', 'There was a wooden bridge.', 'There were no bridges.'],
      'market': ['There was a market.', 'There was a busy market.', 'There were markets.'],
      'temple': ['There was a temple.', 'There was an old temple.', 'The temple was beautiful.'],
      'village': ['There was a village.', 'There was a small village.', 'There were villages.']
    },
    definitions: {
      'old': 'Existing for a long time.',
      'new': 'Recently made or built.',
      'building': 'A structure with walls and roof.',
      'tree': 'A tall plant with a trunk.',
      'river': 'A large natural water flow.',
      'road': 'A path for travel.',
      'bridge': 'A structure to cross a river.',
      'market': 'A place to buy and sell.',
      'temple': 'A building for worship.',
      'village': 'A small community.'
    },
    audio_map: {
      'old': '/audio/week20/vocab_old.mp3',
      'new': '/audio/week20/vocab_new.mp3',
      'building': '/audio/week20/vocab_building.mp3',
      'tree': '/audio/week20/vocab_tree.mp3',
      'river': '/audio/week20/vocab_river.mp3',
      'road': '/audio/week20/vocab_road.mp3',
      'bridge': '/audio/week20/vocab_bridge.mp3',
      'market': '/audio/week20/vocab_market.mp3',
      'temple': '/audio/week20/vocab_temple.mp3',
      'village': '/audio/week20/vocab_village.mp3'
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
      { words: ['There', 'was', 'a', 'market', 'near', 'the', 'river', '.'], answer: 'There was a market near the river.' },
      { words: ['There', 'were', 'trees', 'along', 'the', 'road', '.'], answer: 'There were trees along the road.' },
      { words: ['There', 'was', 'a', 'bridge', 'over', 'the', 'river', '.'], answer: 'There was a bridge over the river.' },
      { words: ['There', 'was', 'a', 'temple', 'in', 'the', 'village', '.'], answer: 'There was a temple in the village.' },
      { words: ['There', 'were', 'buildings', 'near', 'the', 'old', 'market', '.'], answer: 'There were buildings near the old market.' }
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
      { scrambled: ['There', 'was', 'a', 'new', 'bridge'], answer: 'There was a new bridge.' }
    ],
    sentences_advanced: [
      { scrambled: ['There', 'was', 'a', 'market', 'near', 'the', 'river'], answer: 'There was a market near the river.', base_words: ['there', 'was', 'a', 'market', 'near', 'the', 'river'], time_phrases: ['in the past', 'one hundred years ago', 'long ago'], location_phrases: ['near the river', 'in the old town', 'by the road'] },
      { scrambled: ['There', 'were', 'trees', 'along', 'the', 'road'], answer: 'There were trees along the road.', base_words: ['there', 'were', 'trees', 'along', 'the', 'road'], time_phrases: ['in the past', 'long ago', 'before'], location_phrases: ['along the road', 'near the river', 'in the village'] },
      { scrambled: ['There', 'was', 'a', 'wooden', 'bridge', 'over', 'the', 'river'], answer: 'There was a wooden bridge over the river.', base_words: ['there', 'was', 'a', 'wooden', 'bridge', 'over', 'the', 'river'], time_phrases: ['one hundred years ago', 'in the past', 'long ago'], location_phrases: ['over the river', 'in the old town', 'near the market'] },
      { scrambled: ['There', 'was', 'an', 'old', 'temple', 'in', 'the', 'village'], answer: 'There was an old temple in the village.', base_words: ['there', 'was', 'an', 'old', 'temple', 'in', 'the', 'village'], time_phrases: ['in the past', 'long ago', 'before'], location_phrases: ['in the village', 'at the end of the road', 'near the river'] },
      { scrambled: ['There', 'were', 'small', 'buildings', 'around', 'the', 'market'], answer: 'There were small buildings around the market.', base_words: ['there', 'were', 'small', 'buildings', 'around', 'the', 'market'], time_phrases: ['in the past', 'one hundred years ago', 'before'], location_phrases: ['around the market', 'near the river', 'in the old town'] },
      { scrambled: ['There', 'was', 'a', 'river', 'through', 'the', 'town'], answer: 'There was a river through the town.', base_words: ['there', 'was', 'a', 'river', 'through', 'the', 'town'], time_phrases: ['in the past', 'long ago', 'one hundred years ago'], location_phrases: ['through the town', 'near the market', 'beside the road'] },
      { scrambled: ['There', 'were', 'many', 'trees', 'in', 'the', 'old', 'village'], answer: 'There were many trees in the old village.', base_words: ['there', 'were', 'many', 'trees', 'in', 'the', 'old', 'village'], time_phrases: ['in the past', 'before', 'long ago'], location_phrases: ['in the old village', 'along the road', 'near the river'] },
      { scrambled: ['There', 'was', 'a', 'road', 'from', 'the', 'market', 'to', 'the', 'temple'], answer: 'There was a road from the market to the temple.', base_words: ['there', 'was', 'a', 'road', 'from', 'the', 'market', 'to', 'the', 'temple'], time_phrases: ['in the past', 'one hundred years ago', 'long ago'], location_phrases: ['from the market to the temple', 'in the old town', 'through the village'] },
      { scrambled: ['There', 'was', 'a', 'new', 'tall', 'building', 'now'], answer: 'There was a new tall building now.', base_words: ['there', 'was', 'a', 'new', 'tall', 'building', 'now'], time_phrases: ['now', 'today', 'in the present'], location_phrases: ['where the market was', 'near the river', 'in the town center'] },
      { scrambled: ['There', 'were', 'no', 'tall', 'buildings', 'in', 'the', 'past'], answer: 'There were no tall buildings in the past.', base_words: ['there', 'were', 'no', 'tall', 'buildings', 'in', 'the', 'past'], time_phrases: ['in the past', 'one hundred years ago', 'long ago'], location_phrases: ['in the past', 'in the old town', 'in the village'] }
    ]
  },
  ask_me: {
    instructions_easy: 'Ask a question that matches the context.',
    instructions_advanced: 'Ask a question that matches the context.',
    contexts_easy: [
      {
        id: 'w20_was_there_market',
        task_type: 'find_question',
        topic: 'old town',
        intro: 'There was a market near the river. Ask me what was near the river.',
        acceptedQuestions: ['What was near the river?', 'Was there a market near the river?', 'What was there near the river?'],
        answer: 'There was a market near the river.',
        question_hints: ['What was near the river?', 'Was there a market?'],
        required_question_words: ['was', 'there'],
        required_keywords: ['river'],
        hints: { words: ['what', 'was', 'there', 'near', 'river'], tricky: ['where', 'who'] }
      },
      {
        id: 'w20_were_there_trees',
        task_type: 'find_question',
        topic: 'old town',
        intro: 'There were trees along the road. Ask me what was along the road.',
        acceptedQuestions: ['What was along the road?', 'Were there trees along the road?', 'What were there along the road?'],
        answer: 'There were trees along the road.',
        question_hints: ['What was along the road?', 'Were there trees?'],
        required_question_words: ['were', 'there'],
        required_keywords: ['road'],
        hints: { words: ['what', 'were', 'there', 'along', 'road'], tricky: ['where', 'who'] }
      }
    ],
    contexts_advanced: [
      {
        id: 'w20_adv_what_was_there',
        task_type: 'find_question',
        topic: 'old town investigation',
        intro: 'There was an old market and a wooden bridge in the town. Ask what there was in the old town.',
        acceptedQuestions: ['What was there in the old town?', 'What was in the old town?', 'What were there in the old town?'],
        answer: 'There was an old market and a wooden bridge.',
        question_hints: ['What was there in the old town?'],
        required_question_words: ['what', 'was'],
        required_keywords: ['town'],
        hints: { words: ['what', 'was', 'there', 'in', 'old', 'town'], tricky: ['where', 'who', 'when'] }
      }
    ]
  }
};

export default week20GamesAdvanced;
