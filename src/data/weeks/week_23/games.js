/**
 * Week 23 Game Data - Advanced Mode (GameHub)
 * Theme: The Art Class - Creative Regular Verbs
 * Grammar: Regular Past Tense (-ed)
 */

export const week23GamesAdvanced = {
  vocabulary: [
    'paint', 'color', 'glue', 'fold', 'cut',
    'picture', 'scissors', 'brush', 'create', 'carefully'
  ],
  show_tell: {
    steps: 3,
    word_list: [
      'paint', 'color', 'glue', 'fold', 'cut',
      'picture', 'scissors', 'brush', 'create', 'carefully'
    ],
    instructions_easy: 'Say the art word clearly, then add a phrase, then make a full art sentence.',
    instructions_advanced: 'Use the word in a sentence about the art class yesterday.',
    step_instructions: {
      1: 'Step 1: say the art word clearly.',
      2: 'Step 2: add a short phrase with the word.',
      3: 'Step 3: make a full sentence about the art class.'
    },
    frames_easy: ['Mia ___ in art class', 'She used the ___'],
    frames_advanced: ['Yesterday Mia ___ her picture', 'She carefully ___'],
    details_easy: [],
    details_advanced: [],
    detail_map: {
      'paint': ['paint', 'paint a picture', 'Mia painted a picture', 'Yesterday Mia painted a beautiful garden picture using red and blue pigment.'],
      'color': ['color', 'color the flowers', 'She colored carefully', 'Mia colored the flowers in her picture very carefully using a small brush.'],
      'glue': ['glue', 'glue the pieces', 'She glued carefully', 'Yesterday Mia glued all the cut leaf shapes carefully around her picture border.'],
      'fold': ['fold', 'fold the paper', 'She folded carefully', 'Mia folded the paper carefully into a butterfly shape to check its symmetry.'],
      'cut': ['cut', 'cut with scissors', 'She cut carefully', 'Mia cut small leaf shapes with scissors to glue around the edge of her picture.'],
      'picture': ['picture', 'a painted picture', 'Mia has a picture', 'Mia painted a picture of a garden with flowers and left it on the display board.'],
      'scissors': ['scissors', 'sharp scissors', 'Mia used scissors', 'Mia used scissors to cut carefully around the edge of the folded butterfly shape.'],
      'brush': ['brush', 'a paint brush', 'She used a brush', 'Mia dipped her brush in red pigment and painted the flower petals in her picture.'],
      'create': ['create', 'create a masterpiece', 'Mia created art', 'Yesterday Mia created a masterpiece using paint pigment texture and symmetry.'],
      'carefully': ['carefully', 'worked carefully', 'She worked carefully', 'Mia glued and folded everything carefully to create her best art class picture ever.']
    },
    distractor_map: {
      'paint': ['eraser', 'ruler', 'diary'],
      'color': ['notebook', 'dictionary', 'calculator'],
      'glue': ['pencil case', 'lunch box', 'school bag'],
      'fold': ['stapler', 'rubber band', 'paper clip'],
      'cut': ['tape measure', 'pin board', 'chalk']
    },
    frame_map: {
      'paint': ['Mia painted a picture yesterday.'],
      'glue': ['She glued the pieces carefully.'],
      'scissors': ['She cut with scissors.']
    },
    sentence_hints_map: {
      'paint': ['Mia painted a picture.', 'She painted flowers.', 'I painted yesterday.'],
      'color': ['She colored the flowers.', 'Mia colored carefully.', 'I colored my picture.'],
      'glue': ['She glued the pieces.', 'Mia glued the leaves.', 'I glued paper.'],
      'fold': ['She folded the paper.', 'Mia folded carefully.', 'I folded a butterfly.'],
      'cut': ['She cut the paper.', 'Mia cut with scissors.', 'I cut shapes.'],
      'picture': ['Mia has a picture.', 'She painted a picture.', 'I drew a picture.'],
      'scissors': ['She used scissors.', 'Mia cut with scissors.', 'I need scissors.'],
      'brush': ['She used a brush.', 'Mia dipped her brush.', 'I used a big brush.'],
      'create': ['She created art.', 'Mia created a masterpiece.', 'I created a picture.'],
      'carefully': ['She worked carefully.', 'Mia glued carefully.', 'I folded carefully.']
    }
  },

  make_sentence: {
    instructions_easy: 'Unscramble the words to make an art class sentence.',
    instructions_advanced: 'Unscramble the words to make an art past tense sentence.',
    sentences_easy: [
      { scrambled: ['Mia', 'painted', 'a', 'picture'], answer: 'Mia painted a picture.' },
      { scrambled: ['She', 'folded', 'the', 'paper'], answer: 'She folded the paper.' },
      { scrambled: ['I', 'used', 'scissors', 'to', 'cut'], answer: 'I used scissors to cut.' },
      { scrambled: ['She', 'glued', 'the', 'leaves'], answer: 'She glued the leaves.' },
      { scrambled: ['She', 'colored', 'the', 'flowers'], answer: 'She colored the flowers.' },
      { scrambled: ['I', 'used', 'a', 'brush'], answer: 'I used a brush.' },
      { scrambled: ['She', 'created', 'a', 'picture'], answer: 'She created a picture.' },
      { scrambled: ['Mia', 'cut', 'the', 'paper'], answer: 'Mia cut the paper.' },
      { scrambled: ['She', 'worked', 'carefully'], answer: 'She worked carefully.' },
      { scrambled: ['I', 'painted', 'flowers', 'yesterday'], answer: 'I painted flowers yesterday.' }
    ],
    sentences_advanced: [
      { scrambled: ['Mia', 'painted', 'a', 'colorful', 'picture', 'of', 'a', 'garden'], answer: 'Mia painted a colorful picture of a garden.', base_words: ['mia', 'painted', 'a', 'colorful', 'picture', 'of', 'a', 'garden'], time_phrases: ['yesterday', 'in art class', 'last week'], location_phrases: ['at school', 'in the art room', 'on the table'] },
      { scrambled: ['She', 'folded', 'the', 'paper', 'carefully', 'to', 'check', 'its', 'symmetry'], answer: 'She folded the paper carefully to check its symmetry.', base_words: ['she', 'folded', 'the', 'paper', 'carefully', 'to', 'check', 'its', 'symmetry'], time_phrases: ['yesterday', 'in art class', 'during the lesson'], location_phrases: ['on her desk', 'in the art room', 'at the table'] },
      { scrambled: ['Mia', 'used', 'scissors', 'to', 'cut', 'small', 'leaf', 'shapes'], answer: 'Mia used scissors to cut small leaf shapes.', base_words: ['mia', 'used', 'scissors', 'to', 'cut', 'small', 'leaf', 'shapes'], time_phrases: ['yesterday', 'in art class', 'after painting'], location_phrases: ['from green paper', 'for her picture', 'carefully'] },
      { scrambled: ['She', 'glued', 'the', 'leaves', 'around', 'her', 'picture', 'carefully'], answer: 'She glued the leaves around her picture carefully.', base_words: ['she', 'glued', 'the', 'leaves', 'around', 'her', 'picture', 'carefully'], time_phrases: ['yesterday', 'after cutting', 'in art class'], location_phrases: ['around the border', 'onto the paper', 'near the flowers'] },
      { scrambled: ['Mia', 'dipped', 'her', 'brush', 'into', 'red', 'pigment'], answer: 'Mia dipped her brush into red pigment.', base_words: ['mia', 'dipped', 'her', 'brush', 'into', 'red', 'pigment'], time_phrases: ['yesterday', 'in art class', 'first'], location_phrases: ['in the bowl', 'on the palette', 'at the start'] },
      { scrambled: ['The', 'picture', 'had', 'wonderful', 'texture', 'and', 'symmetry'], answer: 'The picture had wonderful texture and symmetry.', base_words: ['the', 'picture', 'had', 'wonderful', 'texture', 'and', 'symmetry'], time_phrases: ['yesterday', 'at the end', 'when finished'], location_phrases: ['on the display board', 'in the art room', 'for the class'] },
      { scrambled: ['She', 'colored', 'the', 'flowers', 'carefully', 'with', 'blue', 'and', 'yellow'], answer: 'She colored the flowers carefully with blue and yellow.', base_words: ['she', 'colored', 'the', 'flowers', 'carefully', 'with', 'blue', 'and', 'yellow'], time_phrases: ['yesterday', 'in art class', 'after painting'], location_phrases: ['in her picture', 'on the paper', 'with a brush'] },
      { scrambled: ['Mia', 'created', 'a', 'masterpiece', 'with', 'texture', 'and', 'pigment'], answer: 'Mia created a masterpiece with texture and pigment.', base_words: ['mia', 'created', 'a', 'masterpiece', 'with', 'texture', 'and', 'pigment'], time_phrases: ['yesterday', 'in art class', 'last week'], location_phrases: ['in the art room', 'for the display', 'for her teacher'] },
      { scrambled: ['She', 'brushed', 'pigment', 'onto', 'the', 'canvas', 'carefully'], answer: 'She brushed pigment onto the canvas carefully.', base_words: ['she', 'brushed', 'pigment', 'onto', 'the', 'canvas', 'carefully'], time_phrases: ['yesterday', 'in the lesson', 'after mixing'], location_phrases: ['onto the paper', 'onto the canvas', 'over the picture'] },
      { scrambled: ['The', 'teacher', 'clapped', 'when', 'Mia', 'created', 'her', 'art'], answer: 'The teacher clapped when Mia created her art.', base_words: ['the', 'teacher', 'clapped', 'when', 'mia', 'created', 'her', 'art'], time_phrases: ['yesterday', 'at the end', 'after class'], location_phrases: ['in the art room', 'at the display', 'in front of everyone'] }
    ]
  },
  ask_me: {
    instructions_easy: 'Ask a question that matches the art class context.',
    instructions_advanced: 'Ask an art question that matches the context.',
    contexts_easy: [
      {
        id: 'w23_mia_painted',
        task_type: 'find_question',
        topic: 'art class',
        intro: 'Mia painted a picture yesterday. Ask what she painted.',
        acceptedQuestions: ['What did Mia paint?', 'Did Mia paint a picture?', 'What did she paint yesterday?'],
        answer: 'Mia painted a colorful garden picture.',
        question_hints: ['What did Mia paint?', 'Did Mia paint?'],
        required_question_words: ['did', 'what'],
        required_keywords: ['paint', 'mia'],
        hints: { words: ['what', 'did', 'mia', 'paint', 'picture'], tricky: ['where', 'when'] }
      },
      {
        id: 'w23_folded_symmetry',
        task_type: 'find_question',
        topic: 'art symmetry',
        intro: 'Mia folded paper to check its symmetry. Ask what she checked.',
        acceptedQuestions: ['What did Mia check?', 'Did she fold the paper?', 'What did she fold the paper to check?'],
        answer: 'She folded the paper to check its symmetry.',
        question_hints: ['What did Mia check?', 'Did she fold the paper?'],
        required_question_words: ['did', 'what'],
        required_keywords: ['fold', 'paper'],
        hints: { words: ['what', 'did', 'she', 'fold', 'check'], tricky: ['how', 'why'] }
      }
    ],
    contexts_advanced: [
      {
        id: 'w23_adv_pigment',
        task_type: 'find_question',
        topic: 'art pigment mixing',
        intro: 'Mia mixed red and blue pigment together. Ask what color she created.',
        acceptedQuestions: ['What color did she create?', 'What did she mix?', 'Did she mix red and blue pigment?'],
        answer: 'She mixed red and blue pigment to create purple.',
        question_hints: ['What color did she create?', 'What did she mix?'],
        required_question_words: ['what', 'did'],
        required_keywords: ['pigment', 'color'],
        hints: { words: ['what', 'color', 'did', 'she', 'create'], tricky: ['who', 'where'] }
      }
    ]
  }
};

export const week23GamesEasy = {
  vocabulary: [
    'paint', 'color', 'glue', 'fold', 'cut',
    'picture', 'scissors', 'brush', 'create', 'carefully'
  ],
  show_tell: {
    steps: 3,
    word_list: [
      'paint', 'color', 'glue', 'fold', 'cut',
      'picture', 'scissors', 'brush', 'create', 'carefully'
    ],
    instructions_easy: 'Say the art word then make a simple sentence.',
    instructions_advanced: 'Use the word in a past tense sentence.',
    step_instructions: {
      1: 'Step 1: say the art word.',
      2: 'Step 2: add a phrase.',
      3: 'Step 3: make a full sentence.'
    },
    frames_easy: ['I ___ in art class', 'I used ___ to ___'],
    frames_advanced: ['Yesterday I ___ a picture', 'I carefully ___'],
    details_easy: [],
    details_advanced: [],
    detail_map: {
      'paint': ['paint', 'paint a picture', 'I painted a picture', 'Yesterday I painted a big colorful picture in art class.'],
      'color': ['color', 'color a drawing', 'I colored flowers', 'I colored the flowers in my picture blue and yellow.'],
      'glue': ['glue', 'use glue', 'I used glue', 'I glued the paper pieces onto my picture.'],
      'fold': ['fold', 'fold paper', 'I folded paper', 'I folded the paper carefully to make a butterfly.'],
      'cut': ['cut', 'cut paper', 'I cut paper', 'I cut the paper with scissors to make leaf shapes.'],
      'picture': ['picture', 'my picture', 'I drew a picture', 'I painted a picture of flowers in art class.'],
      'scissors': ['scissors', 'use scissors', 'I used scissors', 'I used scissors to cut the paper carefully.'],
      'brush': ['brush', 'paint brush', 'I used a brush', 'I dipped my brush in paint and colored the flowers.'],
      'create': ['create', 'create art', 'I created art', 'I created a beautiful picture with paint and paper.'],
      'carefully': ['carefully', 'work carefully', 'I worked carefully', 'I folded and cut everything carefully.']
    },
    distractor_map: {
      'paint': ['eraser', 'ruler', 'lunchbox'],
      'color': ['notebook', 'schoolbag', 'water bottle'],
      'glue': ['book', 'pencil case', 'chair'],
      'fold': ['stapler', 'rubber', 'desk'],
      'cut': ['whiteboard', 'chalk', 'door']
    },
    frame_map: {
      'paint': ['I painted a picture.'],
      'scissors': ['I used scissors.'],
      'fold': ['I folded the paper.']
    },
    sentence_hints_map: {
      'paint': ['I painted a picture.', 'I painted flowers.'],
      'color': ['I colored my picture.', 'I colored the flowers.'],
      'glue': ['I glued the paper.', 'I used glue.'],
      'fold': ['I folded the paper.', 'I folded carefully.'],
      'cut': ['I cut the paper.', 'I used scissors to cut.'],
      'picture': ['I have a picture.', 'I painted a picture.'],
      'scissors': ['I used scissors.', 'I cut with scissors.'],
      'brush': ['I used a brush.', 'My brush is small.'],
      'create': ['I created art.', 'I created a picture.'],
      'carefully': ['I worked carefully.', 'I cut carefully.']
    }
  },
  make_sentence: {
    instructions_easy: 'Unscramble the words to make an art sentence.',
    instructions_advanced: 'Make a past tense art sentence.',
    sentences_easy: [
      { scrambled: ['I', 'painted', 'a', 'picture'], answer: 'I painted a picture.' },
      { scrambled: ['She', 'folded', 'the', 'paper'], answer: 'She folded the paper.' },
      { scrambled: ['I', 'used', 'scissors'], answer: 'I used scissors.' },
      { scrambled: ['She', 'glued', 'the', 'leaves'], answer: 'She glued the leaves.' },
      { scrambled: ['I', 'colored', 'the', 'flowers'], answer: 'I colored the flowers.' }
    ],
    sentences_advanced: [
      { scrambled: ['I', 'painted', 'flowers', 'yesterday'], answer: 'I painted flowers yesterday.' },
      { scrambled: ['She', 'folded', 'the', 'paper', 'carefully'], answer: 'She folded the paper carefully.' },
      { scrambled: ['I', 'cut', 'paper', 'with', 'scissors'], answer: 'I cut paper with scissors.' },
      { scrambled: ['She', 'glued', 'the', 'pieces', 'together'], answer: 'She glued the pieces together.' },
      { scrambled: ['I', 'created', 'a', 'picture', 'in', 'art', 'class'], answer: 'I created a picture in art class.' }
    ]
  },
  ask_me: {
    instructions_easy: 'Ask a simple question about art class.',
    instructions_advanced: 'Ask a past tense art question.',
    contexts_easy: [
      {
        id: 'w23_easy_paint',
        task_type: 'find_question',
        topic: 'art class',
        intro: 'Your friend painted a picture. Ask what they painted.',
        acceptedQuestions: ['What did you paint?', 'Did you paint a picture?', 'What did you draw?'],
        answer: 'I painted a garden picture.',
        question_hints: ['What did you paint?', 'Did you paint?'],
        required_question_words: ['did', 'what'],
        required_keywords: ['paint'],
        hints: { words: ['what', 'did', 'you', 'paint'], tricky: ['where', 'when'] }
      }
    ],
    contexts_advanced: [
      {
        id: 'w23_adv_easy_fold',
        task_type: 'find_question',
        topic: 'art folding',
        intro: 'Mia folded paper into a butterfly. Ask what shape she made.',
        acceptedQuestions: ['What shape did she make?', 'What did she fold it into?', 'Did she fold a butterfly?'],
        answer: 'She folded the paper into a butterfly shape.',
        question_hints: ['What shape did she make?', 'What did she fold?'],
        required_question_words: ['what', 'did'],
        required_keywords: ['fold', 'shape'],
        hints: { words: ['what', 'shape', 'did', 'she', 'make'], tricky: ['how', 'who'] }
      }
    ]
  }
};

export default week23GamesAdvanced;
