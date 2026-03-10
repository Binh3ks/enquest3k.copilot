/**
 * Week 13 Game Data - Advanced Mode (New GameHub)
 */

export const week13GamesAdvanced = {
  vocabulary: [
    'wake up', 'brush teeth', 'eat breakfast', 'go to school', 'have lunch',
    'play', 'do homework', 'have dinner', 'watch TV', 'go to bed'
  ],
  show_tell: {
    steps: 3,
    word_list: [
      'wake up', 'brush teeth', 'eat breakfast', 'go to school', 'have lunch',
      'play', 'do homework', 'have dinner', 'watch TV', 'go to bed'
    ],
    instructions_easy: 'Say the word, add a phrase, then make a full sentence.',
    instructions_advanced: 'Say the word, add a phrase, then make a full sentence.',
    step_instructions: {
      1: 'Step 1: say the word clearly.',
      2: 'Step 2: add a short phrase with the word.',
      3: 'Step 3: make a full sentence.'
    },
    frames_easy: ['I ___ every day', 'I ___ in the morning'],
    frames_advanced: ['I ___ at ___ o\'clock', 'Every day I ___ and then I ___'],
    details_easy: [],
    details_advanced: [],
    detail_map: {
      'wake up': ['wake up', 'wake up early', 'I wake up early', 'I wake up at 7 o\'clock every morning'],
      'brush teeth': ['brush teeth', 'brush my teeth', 'I brush my teeth', 'I brush my teeth with my toothbrush'],
      'eat breakfast': ['eat breakfast', 'eat a big breakfast', 'I eat breakfast', 'I eat breakfast with my family'],
      'go to school': ['go to school', 'go to school early', 'I go to school', 'I go to school at 8 o\'clock'],
      'have lunch': ['have lunch', 'have lunch at school', 'I have lunch', 'I have lunch at 12 o\'clock'],
      'play': ['play', 'play with friends', 'I play with friends', 'I play with my friends after school'],
      'do homework': ['do homework', 'do my homework', 'I do my homework', 'I do my homework after dinner'],
      'have dinner': ['have dinner', 'have dinner together', 'I have dinner', 'I have dinner with my family at 7'],
      'watch TV': ['watch TV', 'watch TV before bed', 'I watch TV', 'I watch TV after dinner'],
      'go to bed': ['go to bed', 'go to bed early', 'I go to bed', 'I go to bed at 9 o\'clock']
    },
    distractors_easy: [],
    distractors_advanced: [],
    emoji_map: {
      'wake up': '⏰',
      'brush teeth': '🦷',
      'eat breakfast': '🍳',
      'go to school': '🏫',
      'have lunch': '🍱',
      'play': '⚽',
      'do homework': '📚',
      'have dinner': '🍽️',
      'watch TV': '📺',
      'go to bed': '🛏️'
    }
  },
  make_sentence: {
    instructions_easy: 'Unscramble the words to make a correct sentence.',
    instructions_advanced: 'Unscramble the words to make a correct sentence.',
    sentences_easy: [
      { scrambled: ['I', 'wake', 'up', 'at', '7', 'o\'clock'], answer: 'I wake up at 7 o\'clock.' },
      { scrambled: ['I', 'brush', 'my', 'teeth', 'every', 'morning'], answer: 'I brush my teeth every morning.' },
      { scrambled: ['I', 'eat', 'breakfast', 'with', 'my', 'family'], answer: 'I eat breakfast with my family.' },
      { scrambled: ['I', 'go', 'to', 'school', 'at', '8'], answer: 'I go to school at 8.' },
      { scrambled: ['I', 'have', 'lunch', 'at', '12', 'o\'clock'], answer: 'I have lunch at 12 o\'clock.' },
      { scrambled: ['I', 'play', 'with', 'my', 'friends', 'after', 'school'], answer: 'I play with my friends after school.' },
      { scrambled: ['I', 'do', 'my', 'homework', 'in', 'the', 'evening'], answer: 'I do my homework in the evening.' },
      { scrambled: ['I', 'have', 'dinner', 'with', 'my', 'family'], answer: 'I have dinner with my family.' },
      { scrambled: ['I', 'watch', 'TV', 'before', 'bed'], answer: 'I watch TV before bed.' },
      { scrambled: ['I', 'go', 'to', 'bed', 'at', '9', 'o\'clock'], answer: 'I go to bed at 9 o\'clock.' }
    ],
    sentences_advanced: [
      { scrambled: ['I', 'wake', 'up', 'at', '7', 'o\'clock'], answer: 'I wake up at 7 o\'clock.', base_words: ['i', 'wake', 'up', 'at', '7', 'o\'clock'], time_phrases: ['every morning', 'every day', 'on weekdays', 'on Monday', 'this morning'], location_phrases: ['in my room', 'in my bed', 'at home', 'in the morning', 'by myself'] },
      { scrambled: ['I', 'brush', 'my', 'teeth', 'every', 'morning'], answer: 'I brush my teeth every morning.', base_words: ['i', 'brush', 'my', 'teeth', 'every', 'morning'], time_phrases: ['every morning', 'every night', 'before school', 'after eating', 'at 7'], location_phrases: ['in the bathroom', 'at the sink', 'at home', 'before bed', 'with toothpaste'] },
      { scrambled: ['I', 'eat', 'breakfast', 'with', 'my', 'family'], answer: 'I eat breakfast with my family.', base_words: ['i', 'eat', 'breakfast', 'with', 'my', 'family'], time_phrases: ['every morning', 'at 7', 'before school', 'at 8 o\'clock', 'on weekdays'], location_phrases: ['in the kitchen', 'at the table', 'at home', 'in the dining room', 'together'] },
      { scrambled: ['go', 'I', 'to', 'school', 'at', '8'], answer: 'I go to school at 8.', base_words: ['i', 'go', 'to', 'school', 'at', '8'], time_phrases: ['every morning', 'on weekdays', 'at 8 o\'clock', 'after breakfast', 'on Monday'], location_phrases: ['by bus', 'by bike', 'on foot', 'with my friends', 'with my mom'] },
      { scrambled: ['have', 'I', 'lunch', 'at', '12', 'o\'clock'], answer: 'I have lunch at 12 o\'clock.', base_words: ['i', 'have', 'lunch', 'at', '12', 'o\'clock'], time_phrases: ['every day', 'at noon', 'at 12', 'on weekdays', 'after class'], location_phrases: ['at school', 'in the cafeteria', 'with my friends', 'in the classroom', 'at the canteen'] },
      { scrambled: ['play', 'I', 'with', 'my', 'friends', 'after', 'school'], answer: 'I play with my friends after school.', base_words: ['i', 'play', 'with', 'my', 'friends', 'after', 'school'], time_phrases: ['every day', 'after school', 'in the afternoon', 'at 4 o\'clock', 'on weekends'], location_phrases: ['at the park', 'at school', 'in the yard', 'outside', 'near my house'] },
      { scrambled: ['do', 'I', 'my', 'homework', 'in', 'the', 'evening'], answer: 'I do my homework in the evening.', base_words: ['i', 'do', 'my', 'homework', 'in', 'the', 'evening'], time_phrases: ['every evening', 'at 6 o\'clock', 'after dinner', 'before TV', 'on weekdays'], location_phrases: ['at my desk', 'in my room', 'at home', 'in the living room', 'by myself'] },
      { scrambled: ['have', 'I', 'dinner', 'with', 'my', 'family'], answer: 'I have dinner with my family.', base_words: ['i', 'have', 'dinner', 'with', 'my', 'family'], time_phrases: ['every evening', 'at 7 o\'clock', 'after homework', 'at night', 'on weekdays'], location_phrases: ['in the kitchen', 'at the table', 'at home', 'in the dining room', 'together'] },
      { scrambled: ['watch', 'I', 'TV', 'before', 'bed'], answer: 'I watch TV before bed.', base_words: ['i', 'watch', 'tv', 'before', 'bed'], time_phrases: ['every night', 'at 8 o\'clock', 'after dinner', 'before sleep', 'on weekdays'], location_phrases: ['in the living room', 'in my room', 'on the sofa', 'at home', 'with my family'] },
      { scrambled: ['go', 'I', 'to', 'bed', 'at', '9', 'o\'clock'], answer: 'I go to bed at 9 o\'clock.', base_words: ['i', 'go', 'to', 'bed', 'at', '9', 'o\'clock'], time_phrases: ['every night', 'at 9', 'after TV', 'on weekdays', 'on school nights'], location_phrases: ['in my room', 'in my bed', 'at home', 'after brushing teeth', 'after reading'] }
    ]
  },
  ask_me: {
    instructions_easy: 'Ask a question that matches the context.',
    instructions_advanced: 'Ask a question that matches the context.',
    contexts_easy: [
      {
        id: 'w13_wake_time',
        task_type: 'find_question',
        topic: 'wake up',
        intro: 'I wake up at 7 o\'clock. Ask me what time I wake up.',
        acceptedQuestions: ['What time do you wake up?', 'When do you wake up?', 'What time?'],
        answer: 'I wake up at 7 o\'clock.',
        question_hints: ['What time do you wake up?', 'When do you wake up?'],
        required_question_words: ['what', 'when'],
        required_keywords: ['wake'],
        hints: { words: ['what', 'time', 'do', 'you', 'wake', 'up'], tricky: ['where', 'who'] }
      },
      {
        id: 'w13_breakfast_what',
        task_type: 'find_question',
        topic: 'breakfast',
        intro: 'I eat breakfast every morning. Ask me what I eat.',
        acceptedQuestions: ['What do you eat for breakfast?', 'What do you eat?', 'What is your breakfast?'],
        answer: 'I eat rice and eggs for breakfast.',
        question_hints: ['What do you eat for breakfast?', 'What do you eat?'],
        required_question_words: ['what'],
        required_keywords: ['eat'],
        hints: { words: ['what', 'do', 'you', 'eat', 'breakfast'], tricky: ['where', 'who'] }
      },
      {
        id: 'w13_school_time',
        task_type: 'find_question',
        topic: 'school',
        intro: 'I go to school every day. Ask me what time I go.',
        acceptedQuestions: ['What time do you go to school?', 'When do you go to school?', 'What time?'],
        answer: 'I go to school at 8 o\'clock.',
        question_hints: ['What time do you go to school?', 'When do you go to school?'],
        required_question_words: ['what', 'when'],
        required_keywords: ['school'],
        hints: { words: ['what', 'time', 'do', 'you', 'go', 'school'], tricky: ['where', 'who'] }
      },
      {
        id: 'w13_after_school',
        task_type: 'find_question',
        topic: 'after school',
        intro: 'After school I do many things. Ask me what I do after school.',
        acceptedQuestions: ['What do you do after school?', 'What do you do?', 'Do you play after school?'],
        answer: 'I play with friends after school.',
        question_hints: ['What do you do after school?', 'Do you play after school?'],
        required_question_words: ['what', 'do'],
        required_keywords: ['after', 'school'],
        hints: { words: ['what', 'do', 'you', 'after', 'school'], tricky: ['where', 'who'] }
      },
      {
        id: 'w13_bed_time',
        task_type: 'find_question',
        topic: 'bedtime',
        intro: 'I go to bed every night. Ask me what time I go to bed.',
        acceptedQuestions: ['What time do you go to bed?', 'When do you go to bed?', 'What time do you sleep?'],
        answer: 'I go to bed at 9 o\'clock.',
        question_hints: ['What time do you go to bed?', 'When do you go to bed?'],
        required_question_words: ['what', 'when'],
        required_keywords: ['bed', 'sleep'],
        hints: { words: ['what', 'time', 'do', 'you', 'go', 'bed'], tricky: ['where', 'who'] }
      },
      {
        id: 'w13_mini_routine',
        task_type: 'mini_interview',
        topic: 'routine',
        intro: 'Interview me: ask what time I wake up, then ask what I eat for breakfast.',
        steps: [
          {
            prompt: 'Ask what time I wake up.',
            required_question_words: ['what', 'when'],
            required_keywords: ['wake'],
            question_hints: ['What time do you wake up?', 'When do you wake up?']
          },
          {
            prompt: 'Ask what I eat for breakfast.',
            acceptedQuestions: ['What do you eat for breakfast?', 'What do you eat?'],
            required_question_words: ['what'],
            required_keywords: ['eat', 'breakfast'],
            question_hints: ['What do you eat for breakfast?', 'What do you eat?']
          }
        ],
        hints: { words: ['what', 'time', 'do', 'you', 'wake', 'eat', 'breakfast'], tricky: ['where', 'who'] }
      }
    ],
    contexts_advanced: [
      {
        id: 'w13_wake_time_adv',
        task_type: 'find_question',
        topic: 'wake up',
        intro: 'I wake up at 7 o\'clock every morning. Ask me what time I wake up.',
        acceptedQuestions: ['What time do you wake up?', 'When do you wake up?', 'What time do you wake up every morning?'],
        answer: 'I wake up at 7 o\'clock every morning.',
        question_hints: ['What time do you wake up?', 'When do you wake up?'],
        required_question_words: ['what', 'when'],
        required_keywords: ['wake'],
        hints: { words: ['what', 'time', 'do', 'you', 'wake', 'up'], tricky: ['where', 'who'] }
      },
      {
        id: 'w13_breakfast_adv',
        task_type: 'find_question',
        topic: 'breakfast',
        intro: 'I eat breakfast with my family every morning. Ask me what I eat.',
        acceptedQuestions: ['What do you eat for breakfast?', 'What do you eat in the morning?', 'What is your breakfast?'],
        answer: 'I eat rice and eggs for breakfast.',
        question_hints: ['What do you eat for breakfast?', 'What do you eat in the morning?'],
        required_question_words: ['what'],
        required_keywords: ['eat', 'breakfast'],
        hints: { words: ['what', 'do', 'you', 'eat', 'breakfast', 'morning'], tricky: ['where', 'who'] }
      },
      {
        id: 'w13_school_adv',
        task_type: 'find_question',
        topic: 'school',
        intro: 'I go to school at 8 o\'clock. Ask me what time I go to school.',
        acceptedQuestions: ['What time do you go to school?', 'When do you go to school?', 'What time do you leave for school?'],
        answer: 'I go to school at 8 o\'clock.',
        question_hints: ['What time do you go to school?', 'When do you go to school?'],
        required_question_words: ['what', 'when'],
        required_keywords: ['school', 'go'],
        hints: { words: ['what', 'time', 'do', 'you', 'go', 'to', 'school'], tricky: ['where', 'who'] }
      },
      {
        id: 'w13_lunch_adv',
        task_type: 'find_question',
        topic: 'lunch',
        intro: 'I have lunch at school at 12 o\'clock. Ask me what time I have lunch.',
        acceptedQuestions: ['What time do you have lunch?', 'When do you have lunch?', 'What time do you eat lunch?'],
        answer: 'I have lunch at 12 o\'clock.',
        question_hints: ['What time do you have lunch?', 'When do you have lunch?'],
        required_question_words: ['what', 'when'],
        required_keywords: ['lunch'],
        hints: { words: ['what', 'time', 'do', 'you', 'have', 'lunch'], tricky: ['where', 'who'] }
      },
      {
        id: 'w13_homework_adv',
        task_type: 'find_question',
        topic: 'homework',
        intro: 'I do my homework every evening. Ask me when I do homework.',
        acceptedQuestions: ['When do you do homework?', 'What time do you do homework?', 'Do you do homework every day?'],
        answer: 'I do my homework in the evening.',
        question_hints: ['When do you do homework?', 'What time do you do homework?'],
        required_question_words: ['when', 'what'],
        required_keywords: ['homework'],
        hints: { words: ['when', 'do', 'you', 'homework', 'what', 'time'], tricky: ['where', 'who'] }
      },
      {
        id: 'w13_dinner_adv',
        task_type: 'find_question',
        topic: 'dinner',
        intro: 'I have dinner with my family every evening. Ask me what time I have dinner.',
        acceptedQuestions: ['What time do you have dinner?', 'When do you have dinner?', 'What do you eat for dinner?'],
        answer: 'I have dinner at 7 o\'clock.',
        question_hints: ['What time do you have dinner?', 'When do you have dinner?'],
        required_question_words: ['what', 'when'],
        required_keywords: ['dinner'],
        hints: { words: ['what', 'time', 'do', 'you', 'have', 'dinner'], tricky: ['where', 'who'] }
      },
      {
        id: 'w13_bed_adv',
        task_type: 'find_question',
        topic: 'bedtime',
        intro: 'I go to bed at 9 o\'clock every night. Ask me what time I go to bed.',
        acceptedQuestions: ['What time do you go to bed?', 'When do you go to bed?', 'What time do you go to sleep?'],
        answer: 'I go to bed at 9 o\'clock.',
        question_hints: ['What time do you go to bed?', 'When do you go to bed?'],
        required_question_words: ['what', 'when'],
        required_keywords: ['bed', 'sleep'],
        hints: { words: ['what', 'time', 'do', 'you', 'go', 'bed', 'sleep'], tricky: ['where', 'who'] }
      },
      {
        id: 'w13_tv_adv',
        task_type: 'find_question',
        topic: 'TV',
        intro: 'I watch TV after dinner. Ask me if I watch TV.',
        acceptedQuestions: ['Do you watch TV?', 'Do you watch TV after dinner?', 'What do you watch?'],
        answer: 'Yes, I watch TV after dinner.',
        question_hints: ['Do you watch TV?', 'Do you watch TV after dinner?'],
        required_question_words: ['do'],
        required_keywords: ['watch', 'TV'],
        hints: { words: ['do', 'you', 'watch', 'TV', 'after', 'dinner'], tricky: ['where', 'who'] }
      },
      {
        id: 'w13_mini_daily',
        task_type: 'mini_interview',
        topic: 'daily routine',
        intro: 'Interview me about my day: ask what time I wake up, then ask what I do after school.',
        steps: [
          {
            prompt: 'Ask what time I wake up.',
            required_question_words: ['what', 'when'],
            required_keywords: ['wake'],
            question_hints: ['What time do you wake up?', 'When do you wake up?']
          },
          {
            prompt: 'Ask what I do after school.',
            acceptedQuestions: ['What do you do after school?', 'Do you play after school?'],
            required_question_words: ['what', 'do'],
            required_keywords: ['after', 'school'],
            question_hints: ['What do you do after school?', 'Do you play after school?']
          }
        ],
        hints: { words: ['what', 'time', 'do', 'you', 'wake', 'after', 'school'], tricky: ['where', 'who'] }
      }
    ],
    required_question_words_easy: ['what', 'when', 'do'],
    required_question_words_advanced: ['what', 'when', 'do']
  }
};

export default week13GamesAdvanced;
