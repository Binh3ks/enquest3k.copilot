/**
 * Week 22 Game Data - Easy Mode (GameHub)
 * Theme: Yesterday's Diary - Past Simple Regular Verbs (-ed)
 * Tier 1 Vocabulary - Simple, Personal Context
 */

export const week22GamesEasy = {
  vocabulary: [
    'walked', 'looked', 'cooked', 'played', 'watched',
    'cleaned', 'helped', 'talked', 'listened', 'opened'
  ],
  show_tell: {
    steps: 3,
    word_list: [
      'walked', 'looked', 'cooked', 'played', 'watched',
      'cleaned', 'helped', 'talked', 'listened', 'opened'
    ],
    instructions_easy: 'Say the word, add a phrase, then make a full sentence.',
    instructions_advanced: 'Say the word, add a phrase, then make a full sentence.',
    step_instructions: {
      1: 'Step 1: say the word clearly.',
      2: 'Step 2: add a short phrase with the word.',
      3: 'Step 3: make a full sentence.'
    },
    frames_easy: ['Yesterday, I ___ to/at/in...', 'I ___ my/the...'],
    frames_advanced: ['Yesterday, I ___ with my friends', 'In the morning, I ___'],
    details_easy: [],
    details_advanced: [],
    detail_map: {
      'walked': ['walked', 'walked to school', 'I walked to school', 'Yesterday, I walked to school with my friend'],
      'looked': ['looked', 'looked at the sky', 'I looked at the sky', 'Yesterday, I looked at the blue sky in the morning'],
      'cooked': ['cooked', 'cooked dinner', 'Mom cooked dinner', 'My mom cooked rice and soup for our family'],
      'played': ['played', 'played in the park', 'I played in the park', 'Yesterday, I played in the park with my friends'],
      'watched': ['watched', 'watched TV', 'I watched TV', 'Yesterday, I watched TV with my family after dinner'],
      'cleaned': ['cleaned', 'cleaned my room', 'I cleaned my room', 'Yesterday, I cleaned my room and it looks neat'],
      'helped': ['helped', 'helped my mom', 'I helped my mom', 'Yesterday, I helped my mom cook dinner at home'],
      'talked': ['talked', 'talked to friends', 'I talked to friends', 'Yesterday, I talked to my friends at school'],
      'listened': ['listened', 'listened to music', 'I listened to music', 'Yesterday, I listened to music in my room'],
      'opened': ['opened', 'opened the window', 'I opened the window', 'Yesterday, I opened the window and felt the fresh air']
    },
    distractor_map: {
      'walked': ['hair', 'eyes', 'smile'],
      'cooked': ['tall', 'short', 'face'],
      'played': ['glasses', 'curly', 'long']
    },
    frame_map: {
      'walked': ['I walked to school.'],
      'cooked': ['Mom cooked dinner.'],
      'played': ['We played together.']
    },
    sentence_hints_map: {
      'walked': ['I walked to school.', 'She walked home.', 'We walked together.'],
      'looked': ['I looked at the sky.', 'She looked happy.', 'He looked outside.'],
      'cooked': ['Mom cooked dinner.', 'She cooked rice.', 'Dad cooked soup.'],
      'played': ['We played outside.', 'I played a game.', 'They played together.'],
      'watched': ['I watched TV.', 'She watched a movie.', 'We watched the stars.'],
      'cleaned': ['I cleaned my room.', 'She cleaned the table.', 'We cleaned together.'],
      'helped': ['I helped my mom.', 'He helped his friend.', 'They helped clean up.'],
      'talked': ['I talked to my friend.', 'She talked a lot.', 'We talked and laughed.'],
      'listened': ['I listened to music.', 'She listened carefully.', 'They listened to the teacher.'],
      'opened': ['I opened the door.', 'She opened her book.', 'He opened the window.']
    },
    definitions: {
      'walked': 'Went on foot.',
      'looked': 'Used eyes to see.',
      'cooked': 'Made food with heat.',
      'played': 'Had fun.',
      'watched': 'Looked at a screen.',
      'cleaned': 'Made tidy.',
      'helped': 'Gave support.',
      'talked': 'Spoke to someone.',
      'listened': 'Heard carefully.',
      'opened': 'Made not closed.'
    },
    emoji_map: {
      'walked': '🚶',
      'looked': '👀',
      'cooked': '🍳',
      'played': '🎮',
      'watched': '📺',
      'cleaned': '🧹',
      'helped': '🤝',
      'talked': '💬',
      'listened': '🎵',
      'opened': '🚪'
    }
  },
  make_sentence: {
    instructions_easy: 'Unscramble the words to make a sentence.',
    instructions_advanced: 'Unscramble the words to make a sentence.',
    sentences_easy: [
      { scrambled: ['I', 'walked', 'to', 'school'], answer: 'I walked to school.' },
      { scrambled: ['I', 'looked', 'at', 'the sky'], answer: 'I looked at the sky.' },
      { scrambled: ['Mom', 'cooked', 'dinner'], answer: 'Mom cooked dinner.' },
      { scrambled: ['I', 'played', 'in', 'the park'], answer: 'I played in the park.' },
      { scrambled: ['I', 'watched', 'TV'], answer: 'I watched TV.' },
      { scrambled: ['I', 'cleaned', 'my room'], answer: 'I cleaned my room.' },
      { scrambled: ['I', 'helped', 'my mom'], answer: 'I helped my mom.' },
      { scrambled: ['I', 'talked', 'to', 'my friend'], answer: 'I talked to my friend.' },
      { scrambled: ['I', 'listened', 'to', 'music'], answer: 'I listened to music.' },
      { scrambled: ['I', 'opened', 'the door'], answer: 'I opened the door.' }
    ],
    sentences_advanced: [
      { scrambled: ['I', 'walked', 'to', 'school', 'yesterday'], answer: 'I walked to school yesterday.', base_words: ['i', 'walked', 'to', 'school', 'yesterday'], time_phrases: ['yesterday', 'in the morning'], location_phrases: ['to school', 'with my friend', 'and felt happy'] },
      { scrambled: ['I', 'looked', 'at', 'the', 'blue', 'sky'], answer: 'I looked at the blue sky.', base_words: ['i', 'looked', 'at', 'the', 'blue', 'sky'], time_phrases: ['yesterday', 'in the morning'], location_phrases: ['at the sky', 'and smiled', 'outside'] },
      { scrambled: ['My', 'mom', 'cooked', 'rice', 'and', 'soup'], answer: 'My mom cooked rice and soup.', base_words: ['my', 'mom', 'cooked', 'rice', 'and', 'soup'], time_phrases: ['yesterday', 'for dinner'], location_phrases: ['at home', 'for us', 'in the kitchen'] },
      { scrambled: ['I', 'played', 'in', 'the', 'park', 'yesterday'], answer: 'I played in the park yesterday.', base_words: ['i', 'played', 'in', 'the', 'park', 'yesterday'], time_phrases: ['yesterday', 'in the afternoon'], location_phrases: ['in the park', 'with friends', 'and had fun'] },
      { scrambled: ['I', 'watched', 'TV', 'after', 'dinner'], answer: 'I watched TV after dinner.', base_words: ['i', 'watched', 'tv', 'after', 'dinner'], time_phrases: ['after dinner', 'yesterday'], location_phrases: ['at home', 'with my family', 'on the sofa'] },
      { scrambled: ['I', 'cleaned', 'my', 'room', 'yesterday'], answer: 'I cleaned my room yesterday.', base_words: ['i', 'cleaned', 'my', 'room', 'yesterday'], time_phrases: ['yesterday', 'in the morning'], location_phrases: ['my room', 'and felt proud', 'with mom'] },
      { scrambled: ['I', 'helped', 'my', 'mom', 'cook', 'dinner'], answer: 'I helped my mom cook dinner.', base_words: ['i', 'helped', 'my', 'mom', 'cook', 'dinner'], time_phrases: ['yesterday', 'at night'], location_phrases: ['in the kitchen', 'together', 'at home'] },
      { scrambled: ['I', 'talked', 'to', 'my', 'friend', 'at', 'school'], answer: 'I talked to my friend at school.', base_words: ['i', 'talked', 'to', 'my', 'friend', 'at', 'school'], time_phrases: ['yesterday', 'in class'], location_phrases: ['at school', 'and laughed', 'during lunch'] },
      { scrambled: ['I', 'listened', 'to', 'music', 'in', 'my', 'room'], answer: 'I listened to music in my room.', base_words: ['i', 'listened', 'to', 'music', 'in', 'my', 'room'], time_phrases: ['yesterday', 'after school'], location_phrases: ['in my room', 'and danced', 'quietly'] },
      { scrambled: ['I', 'opened', 'the', 'window', 'in', 'the', 'morning'], answer: 'I opened the window in the morning.', base_words: ['i', 'opened', 'the', 'window', 'in', 'the', 'morning'], time_phrases: ['in the morning', 'yesterday'], location_phrases: ['in my room', 'and felt the air', 'early'] }
    ]
  },
  ask_me: {
    instructions_easy: 'Ask a question that matches the context.',
    instructions_advanced: 'Ask a question that matches the context.',
    contexts_easy: [
      {
        id: 'w21_easy_what_did',
        task_type: 'find_question',
        topic: 'diary',
        intro: 'I walked to school yesterday. Ask me what I did yesterday.',
        acceptedQuestions: ['What did you do yesterday?', 'Where did you go?'],
        answer: 'I walked to school.',
        question_hints: ['What did you do yesterday?'],
        required_question_words: ['what', 'did'],
        required_keywords: ['do', 'you'],
        hints: { words: ['what', 'did', 'you', 'do'], tricky: ['where', 'who'] }
      },
      {
        id: 'w21_easy_where_walked',
        task_type: 'find_question',
        topic: 'diary',
        intro: 'I walked to school. Ask me where I walked.',
        acceptedQuestions: ['Where did you walk?', 'Where did you go?'],
        answer: 'I walked to school.',
        question_hints: ['Where did you walk?'],
        required_question_words: ['where', 'did'],
        required_keywords: ['walk', 'you'],
        hints: { words: ['where', 'did', 'you', 'walk'], tricky: ['what', 'who'] }
      }
    ],
    contexts_advanced: [
      {
        id: 'w21_easy_adv_diary',
        task_type: 'find_question',
        topic: 'diary',
        intro: 'I cleaned my room yesterday. Ask me what I did.',
        acceptedQuestions: ['What did you do yesterday?', 'Did you clean your room?'],
        answer: 'I cleaned my room yesterday.',
        question_hints: ['What did you do yesterday?'],
        required_question_words: ['what', 'did'],
        required_keywords: ['do', 'you'],
        hints: { words: ['what', 'did', 'you', 'do'], tricky: ['where', 'who'] }
      }
    ]
  }
};

export default week22GamesEasy;
