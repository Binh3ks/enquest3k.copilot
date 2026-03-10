/**
 * Week 13 Game Data - Easy Mode
 */

export const week13GamesEasy = {
  vocabulary: [
    'wake up', 'brush teeth', 'eat', 'go', 'school',
    'play', 'homework', 'dinner', 'TV', 'sleep'
  ],
  show_tell: {
    steps: 3,
    word_list: [
      'wake up', 'brush teeth', 'eat', 'go', 'school',
      'play', 'homework', 'dinner', 'TV', 'sleep'
    ],
    instructions_easy: 'Say the word, add a phrase, then make a sentence.',
    instructions_advanced: 'Say the word, add a phrase, then make a sentence.',
    step_instructions: {
      1: 'Step 1: say the word.',
      2: 'Step 2: add more words.',
      3: 'Step 3: make a sentence.'
    },
    frames_easy: ['I ___', 'I ___ every day'],
    frames_advanced: ['I ___ every day', 'I like to ___'],
    details_easy: [],
    details_advanced: [],
    detail_map: {
      'wake up': ['wake up', 'I wake up', 'I wake up now'],
      'brush teeth': ['brush teeth', 'I brush teeth', 'I brush my teeth'],
      'eat': ['eat', 'I eat', 'I eat breakfast'],
      'go': ['go', 'I go', 'I go to school'],
      'school': ['school', 'my school', 'I go to school'],
      'play': ['play', 'I play', 'I play with friends'],
      'homework': ['homework', 'do homework', 'I do homework'],
      'dinner': ['dinner', 'eat dinner', 'I eat dinner'],
      'TV': ['TV', 'watch TV', 'I watch TV'],
      'sleep': ['sleep', 'I sleep', 'I go to sleep']
    },
    distractors_easy: [],
    distractors_advanced: [],
    emoji_map: {
      'wake up': '⏰',
      'brush teeth': '🦷',
      'eat': '🍳',
      'go': '🚶',
      'school': '🏫',
      'play': '⚽',
      'homework': '📚',
      'dinner': '🍽️',
      'TV': '📺',
      'sleep': '🛏️'
    }
  },
  make_sentence: {
    instructions_easy: 'Unscramble the words to make a correct sentence.',
    instructions_advanced: 'Unscramble the words to make a correct sentence.',
    sentences_easy: [
      { scrambled: ['I', 'wake', 'up'], answer: 'I wake up.' },
      { scrambled: ['I', 'brush', 'my', 'teeth'], answer: 'I brush my teeth.' },
      { scrambled: ['I', 'eat', 'breakfast'], answer: 'I eat breakfast.' },
      { scrambled: ['I', 'go', 'to', 'school'], answer: 'I go to school.' },
      { scrambled: ['I', 'play', 'with', 'friends'], answer: 'I play with friends.' },
      { scrambled: ['I', 'do', 'homework'], answer: 'I do homework.' },
      { scrambled: ['I', 'eat', 'dinner'], answer: 'I eat dinner.' },
      { scrambled: ['I', 'watch', 'TV'], answer: 'I watch TV.' },
      { scrambled: ['I', 'go', 'to', 'bed'], answer: 'I go to bed.' },
      { scrambled: ['I', 'go', 'to', 'sleep'], answer: 'I go to sleep.' }
    ],
    sentences_advanced: [
      { scrambled: ['I', 'wake', 'up', 'every', 'day'], answer: 'I wake up every day.' },
      { scrambled: ['I', 'brush', 'my', 'teeth', 'every', 'morning'], answer: 'I brush my teeth every morning.' },
      { scrambled: ['eat', 'I', 'breakfast', 'with', 'my', 'family'], answer: 'I eat breakfast with my family.' },
      { scrambled: ['go', 'I', 'to', 'school', 'every', 'day'], answer: 'I go to school every day.' },
      { scrambled: ['play', 'I', 'with', 'my', 'friends'], answer: 'I play with my friends.' },
      { scrambled: ['do', 'I', 'homework', 'in', 'the', 'evening'], answer: 'I do homework in the evening.' },
      { scrambled: ['eat', 'I', 'dinner', 'with', 'my', 'family'], answer: 'I eat dinner with my family.' },
      { scrambled: ['watch', 'I', 'TV', 'every', 'night'], answer: 'I watch TV every night.' },
      { scrambled: ['go', 'I', 'to', 'bed', 'at', 'night'], answer: 'I go to bed at night.' },
      { scrambled: ['go', 'I', 'to', 'sleep', 'at', '9'], answer: 'I go to sleep at 9.' }
    ]
  },
  ask_me: {
    instructions_easy: 'Ask a question that matches the context.',
    instructions_advanced: 'Ask a question that matches the context.',
    contexts_easy: [
      {
        id: 'w13e_wake',
        task_type: 'find_question',
        topic: 'wake up',
        intro: 'I wake up at 7. Ask me what time.',
        acceptedQuestions: ['What time do you wake up?', 'When do you wake up?', 'What time?'],
        answer: 'I wake up at 7.',
        question_hints: ['What time do you wake up?', 'When do you wake up?'],
        required_question_words: ['what', 'when'],
        required_keywords: ['wake'],
        hints: { words: ['what', 'time', 'wake', 'up'], tricky: ['where', 'who'] }
      },
      {
        id: 'w13e_eat',
        task_type: 'find_question',
        topic: 'eat',
        intro: 'I eat breakfast. Ask me what I eat.',
        acceptedQuestions: ['What do you eat?', 'What do you eat for breakfast?'],
        answer: 'I eat breakfast.',
        question_hints: ['What do you eat?', 'What do you eat for breakfast?'],
        required_question_words: ['what'],
        required_keywords: ['eat'],
        hints: { words: ['what', 'do', 'you', 'eat'], tricky: ['where', 'who'] }
      },
      {
        id: 'w13e_school',
        task_type: 'find_question',
        topic: 'school',
        intro: 'I go to school. Ask me when.',
        acceptedQuestions: ['When do you go to school?', 'What time do you go to school?', 'Do you go to school?'],
        answer: 'I go to school in the morning.',
        question_hints: ['When do you go to school?', 'What time?'],
        required_question_words: ['when', 'what'],
        required_keywords: ['school'],
        hints: { words: ['when', 'do', 'you', 'go', 'school'], tricky: ['where', 'who'] }
      },
      {
        id: 'w13e_play',
        task_type: 'find_question',
        topic: 'play',
        intro: 'I play with friends. Ask me if I play.',
        acceptedQuestions: ['Do you play?', 'Do you play with friends?', 'What do you play?'],
        answer: 'Yes, I play with friends.',
        question_hints: ['Do you play?', 'Do you play with friends?'],
        required_question_words: ['do'],
        required_keywords: ['play'],
        hints: { words: ['do', 'you', 'play', 'friends'], tricky: ['where', 'who'] }
      },
      {
        id: 'w13e_sleep',
        task_type: 'find_question',
        topic: 'sleep',
        intro: 'I go to sleep at 9. Ask me what time.',
        acceptedQuestions: ['What time do you sleep?', 'When do you sleep?', 'What time do you go to bed?'],
        answer: 'I go to sleep at 9.',
        question_hints: ['What time do you sleep?', 'When do you sleep?'],
        required_question_words: ['what', 'when'],
        required_keywords: ['sleep', 'bed'],
        hints: { words: ['what', 'time', 'sleep', 'bed'], tricky: ['where', 'who'] }
      }
    ],
    required_question_words_easy: ['what', 'when', 'do'],
    required_question_words_advanced: ['what', 'when', 'do']
  }
};

export default week13GamesEasy;
