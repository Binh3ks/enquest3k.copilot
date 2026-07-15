/**
 * Week 23 Game Data - Easy Mode (standalone)
 * Theme: The Art Class - Regular Past Tense Verbs
 * Grammar: Subject + verb-ed (painted, colored, glued, folded, created)
 */

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

export default week23GamesEasy;
