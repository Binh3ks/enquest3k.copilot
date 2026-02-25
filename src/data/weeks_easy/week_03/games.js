/**
 * Week 3 Game Data - Easy Mode (New GameHub)
 * Grammar Focus: Is vs has
 * Scaffolding: W3 - "He is ___." "He has ___."
 */

export const week3GamesEasy = {
  vocabulary: [
    'tall', 'short', 'hair', 'eyes', 'long',
    'curly', 'straight', 'glasses', 'face', 'smile'
  ],
  show_tell: {
    steps: 3,
    word_list: [
      'tall', 'short', 'hair', 'eyes', 'long',
      'curly', 'straight', 'glasses', 'face', 'smile'
    ],
    instructions_easy: 'Say the word, add a phrase, then make a full sentence.',
    instructions_advanced: 'Say the word, add a phrase, then make a full sentence.',
    step_instructions: {
      1: 'Step 1: say the word clearly.',
      2: 'Step 2: add a short phrase with the word.',
      3: 'Step 3: make a full sentence.'
    },
    frames_easy: ['He is ___', 'He has ___'],
    frames_advanced: ['He is ___', 'He has ___'],
    details_easy: [],
    details_advanced: [],
    detail_map: {
      tall: ['very tall', 'so tall', 'tall boy', 'tall girl'],
      short: ['very short', 'so short', 'short hair', 'short boy'],
      hair: ['long hair', 'short hair', 'black hair', 'brown hair'],
      eyes: ['blue eyes', 'brown eyes', 'big eyes', 'small eyes'],
      long: ['very long', 'so long', 'long hair', 'long arms'],
      curly: ['curly hair', 'very curly', 'so curly', 'curly style'],
      straight: ['straight hair', 'very straight', 'so straight', 'straight line'],
      glasses: ['big glasses', 'small glasses', 'round glasses', 'wear glasses'],
      face: ['happy face', 'round face', 'pretty face', 'sad face'],
      smile: ['big smile', 'happy smile', 'nice smile', 'bright smile']
    },
    distractors_easy: [],
    distractors_advanced: [],
    distractor_map: {
      tall: ['short hair', 'blue eyes', 'big smile'],
      short: ['long hair', 'brown eyes', 'round face'],
      hair: ['tall boy', 'big glasses', 'happy smile']
    },
    frame_map: {
      tall: ['He is tall.', 'She is tall.'],
      hair: ['He has hair.', 'She has long hair.']
    },
    sentence_hints_map: {
      tall: ['He is tall.', 'She is tall.', 'My friend is tall.'],
      short: ['He is short.', 'She is short.', 'My brother is short.'],
      hair: ['He has hair.', 'She has long hair.', 'I have black hair.'],
      eyes: ['He has brown eyes.', 'She has blue eyes.', 'I have big eyes.'],
      long: ['He has long hair.', 'She has long hair.', 'My hair is long.'],
      curly: ['He has curly hair.', 'She has curly hair.', 'My hair is curly.'],
      straight: ['He has straight hair.', 'She has straight hair.', 'My hair is straight.'],
      glasses: ['He has glasses.', 'She has glasses.', 'I wear glasses.'],
      face: ['He has a happy face.', 'She has a pretty face.', 'I have a round face.'],
      smile: ['He has a smile.', 'She has a big smile.', 'I have a happy smile.']
    },
    emoji_map: {
      tall: '📏',
      short: '🔬',
      hair: '💇',
      eyes: '👀',
      long: '↔️',
      curly: '🌀',
      straight: '➡️',
      glasses: '👓',
      face: '😊',
      smile: '😄'
    },
    definitions: {
      tall: 'High, not short.',
      short: 'Not high, small.'
    }
  },
  make_sentence: {
    instructions_easy: 'Unscramble the words to make a correct sentence.',
    instructions_advanced: 'Unscramble the words to make a correct sentence.',
    sentences_easy: [
      { scrambled: ['tall', 'is', 'He'], answer: 'He is tall.', base_words: ['he', 'is', 'tall'], time_phrases: ['today', 'now', 'right now', 'always'], location_phrases: ['at school', 'in class', 'here', 'in the photo'] },
      { scrambled: ['short', 'is', 'She'], answer: 'She is short.', base_words: ['she', 'is', 'short'], time_phrases: ['today', 'now', 'right now', 'always'], location_phrases: ['at school', 'in class', 'here', 'in the photo'] },
      { scrambled: ['hair', 'has', 'He'], answer: 'He has hair.', base_words: ['he', 'has', 'hair'], time_phrases: ['today', 'now', 'always', 'right now'], location_phrases: ['here', 'at school', 'in the photo', 'everywhere'] },
      { scrambled: ['eyes', 'has', 'She'], answer: 'She has eyes.', base_words: ['she', 'has', 'eyes'], time_phrases: ['today', 'now', 'always', 'right now'], location_phrases: ['here', 'at school', 'in the photo', 'everywhere'] },
      { scrambled: ['glasses', 'has', 'He'], answer: 'He has glasses.', base_words: ['he', 'has', 'glasses'], time_phrases: ['today', 'now', 'every day', 'always'], location_phrases: ['at school', 'in class', 'here', 'at home'] },
      { scrambled: ['smile', 'has', 'She', 'a'], answer: 'She has a smile.', base_words: ['she', 'has', 'a', 'smile'], time_phrases: ['today', 'now', 'right now', 'always'], location_phrases: ['here', 'at school', 'in class', 'everywhere'] },
      { scrambled: ['long', 'is', 'hair', 'My'], answer: 'My hair is long.', base_words: ['my', 'hair', 'is', 'long'], time_phrases: ['today', 'now', 'right now', 'always'], location_phrases: ['here', 'at school', 'at home', 'everywhere'] },
      { scrambled: ['curly', 'is', 'hair', 'My'], answer: 'My hair is curly.', base_words: ['my', 'hair', 'is', 'curly'], time_phrases: ['today', 'now', 'right now', 'always'], location_phrases: ['here', 'at school', 'at home', 'everywhere'] },
      { scrambled: ['straight', 'is', 'hair', 'My'], answer: 'My hair is straight.', base_words: ['my', 'hair', 'is', 'straight'], time_phrases: ['today', 'now', 'right now', 'always'], location_phrases: ['here', 'at school', 'at home', 'everywhere'] },
      { scrambled: ['face', 'happy', 'a', 'has', 'He'], answer: 'He has a happy face.', base_words: ['he', 'has', 'a', 'happy', 'face'], time_phrases: ['today', 'now', 'right now', 'always'], location_phrases: ['at school', 'in class', 'here', 'at home'] }
    ],
    sentences_advanced: [
      { scrambled: ['tall', 'is', 'He'], answer: 'He is tall.', base_words: ['he', 'is', 'tall'], time_phrases: ['today', 'now', 'right now', 'always'], location_phrases: ['at school', 'in class', 'here', 'in the photo'] },
      { scrambled: ['short', 'is', 'She'], answer: 'She is short.', base_words: ['she', 'is', 'short'], time_phrases: ['today', 'now', 'right now', 'always'], location_phrases: ['at school', 'in class', 'here', 'in the photo'] },
      { scrambled: ['hair', 'long', 'has', 'He'], answer: 'He has long hair.', base_words: ['he', 'has', 'long', 'hair'], time_phrases: ['today', 'now', 'right now', 'always'], location_phrases: ['at school', 'in class', 'here', 'everywhere'] },
      { scrambled: ['eyes', 'blue', 'has', 'She'], answer: 'She has blue eyes.', base_words: ['she', 'has', 'blue', 'eyes'], time_phrases: ['today', 'now', 'always', 'forever'], location_phrases: ['at school', 'in class', 'here', 'everywhere'] },
      { scrambled: ['glasses', 'big', 'has', 'He'], answer: 'He has big glasses.', base_words: ['he', 'has', 'big', 'glasses'], time_phrases: ['today', 'now', 'every day', 'always'], location_phrases: ['at school', 'in class', 'here', 'at home'] },
      { scrambled: ['smile', 'happy', 'a', 'has', 'She'], answer: 'She has a happy smile.', base_words: ['she', 'has', 'a', 'happy', 'smile'], time_phrases: ['today', 'now', 'right now', 'always'], location_phrases: ['at school', 'in class', 'here', 'everywhere'] },
      { scrambled: ['long', 'is', 'hair', 'My'], answer: 'My hair is long.', base_words: ['my', 'hair', 'is', 'long'], time_phrases: ['today', 'now', 'right now', 'always'], location_phrases: ['here', 'at school', 'at home', 'everywhere'] },
      { scrambled: ['curly', 'is', 'hair', 'My'], answer: 'My hair is curly.', base_words: ['my', 'hair', 'is', 'curly'], time_phrases: ['today', 'now', 'right now', 'always'], location_phrases: ['here', 'at school', 'at home', 'everywhere'] },
      { scrambled: ['straight', 'and', 'long', 'is', 'hair', 'My'], answer: 'My hair is long and straight.', base_words: ['my', 'hair', 'is', 'long', 'and', 'straight'], time_phrases: ['today', 'now', 'right now', 'always'], location_phrases: ['here', 'at school', 'at home', 'everywhere'] },
      { scrambled: ['face', 'pretty', 'a', 'has', 'She'], answer: 'She has a pretty face.', base_words: ['she', 'has', 'a', 'pretty', 'face'], time_phrases: ['today', 'now', 'always', 'right now'], location_phrases: ['at school', 'in class', 'here', 'everywhere'] }
    ]
  },
  ask_me: {
    instructions_easy: 'Ask a question that matches the context.',
    instructions_advanced: 'Ask a question that matches the context.',
    contexts_easy: [
      {
        id: 'w3_tall_ishe',
        task_type: 'find_question',
        topic: 'tall',
        intro: 'He is tall. Ask me about him.',
        answer: 'Yes, he is tall.',
        question_hints: ['Is he tall?', 'Is he short?', 'Is he big?'],
        required_question_words: ['is'],
        required_keywords: ['he', 'tall'],
        hints: {
          words: ['is', 'he', 'tall'],
          tricky: ['what', 'who']
        }
      },
      {
        id: 'w3_hair_what',
        task_type: 'find_question',
        topic: 'hair',
        intro: 'He has long hair. Ask me about his hair.',
        answer: 'He has long hair.',
        acceptedQuestions: [
          'What hair does he have?',
          'Does he have long hair?',
          'Is his hair long?',
          'What does his hair look like?'
        ],
        question_hints: ['What hair does he have?', 'Does he have long hair?', 'Is his hair long?'],
        required_question_words: ['what'],
        required_keywords: ['he', 'have', 'hair'],
        hints: {
          words: ['what', 'does', 'he', 'have'],
          tricky: ['who', 'where']
        }
      },
      {
        id: 'w3_eyes_what',
        task_type: 'find_question',
        topic: 'eyes',
        intro: 'She has brown eyes. Ask me what color her eyes are.',
        answer: 'She has brown eyes.',
        acceptedQuestions: [
          'What color are her eyes?',
          'What color eyes does she have?',
          'Does she have brown eyes?',
          'What eyes does she have?'
        ],
        question_hints: ['What color are her eyes?', 'What color eyes does she have?', 'Does she have brown eyes?'],
        required_question_words: ['what'],
        required_keywords: ['she', 'have', 'eyes'],
        hints: {
          words: ['what', 'does', 'she', 'have'],
          tricky: ['who', 'where']
        }
      },
      {
        id: 'w3_glasses_ishe',
        task_type: 'find_question',
        topic: 'glasses',
        intro: 'He has glasses. Ask me if he has glasses.',
        answer: 'Yes, he has glasses.',
        acceptedQuestions: [
          'Does he have glasses?',
          'Is he wearing glasses?',
          'Does he wear glasses?'
        ],
        question_hints: ['Does he have glasses?', 'Is he wearing glasses?', 'Does he wear glasses?'],
        required_question_words: ['does', 'is'],
        required_keywords: ['he', 'have', 'glasses'],
        hints: {
          words: ['does', 'he', 'have'],
          tricky: ['what', 'who']
        }
      },
      {
        id: 'w3_short_ishe',
        task_type: 'find_question',
        topic: 'short',
        intro: 'She is short. Ask me if she is short.',
        answer: 'Yes, she is short.',
        acceptedQuestions: [
          'Is she short?',
          'Is she tall?',
          'Is she small?'
        ],
        question_hints: ['Is she short?', 'Is she tall?', 'Is she small?'],
        required_question_words: ['is'],
        required_keywords: ['she', 'short'],
        hints: {
          words: ['is', 'she', 'short'],
          tricky: ['what', 'who']
        }
      },
      {
        id: 'w3_curly_what',
        task_type: 'find_question',
        topic: 'curly',
        intro: 'She has curly hair. Ask me what kind of hair she has.',
        answer: 'She has curly hair.',
        acceptedQuestions: [
          'What hair does she have?',
          'Is her hair curly?',
          'What kind of hair does she have?',
          'Does she have curly hair?'
        ],
        question_hints: ['What hair does she have?', 'Is her hair curly?', 'What kind of hair does she have?'],
        required_question_words: ['what', 'is'],
        required_keywords: ['hair', 'curly', 'she'],
        hints: {
          words: ['what', 'is', 'hair'],
          tricky: ['who', 'where']
        }
      },
      {
        id: 'w3_smile_what',
        task_type: 'find_question',
        topic: 'smile',
        intro: 'He has a big smile. Ask me about his smile.',
        answer: 'He has a big smile.',
        acceptedQuestions: [
          'What smile does he have?',
          'Does he have a smile?',
          'Does he have a big smile?',
          'What kind of smile does he have?'
        ],
        question_hints: ['What smile does he have?', 'Does he have a big smile?', 'What kind of smile does he have?'],
        required_question_words: ['what', 'does'],
        required_keywords: ['he', 'have', 'smile'],
        hints: {
          words: ['what', 'does', 'he', 'have'],
          tricky: ['who', 'where']
        }
      },
      {
        id: 'w3_face_what',
        task_type: 'find_question',
        topic: 'face',
        intro: 'She has a pretty face. Ask me about her face.',
        answer: 'She has a pretty face.',
        acceptedQuestions: [
          'What face does she have?',
          'Is she pretty?',
          'Does she have a pretty face?',
          'What does her face look like?'
        ],
        question_hints: ['What face does she have?', 'Is she pretty?', 'Does she have a pretty face?'],
        required_question_words: ['what', 'does', 'is'],
        required_keywords: ['she', 'have', 'face'],
        hints: {
          words: ['what', 'does', 'she', 'have'],
          tricky: ['who', 'where']
        }
      },
      {
        id: 'w3_mini_appearance',
        task_type: 'mini_interview',
        topic: 'appearance',
        intro: 'Interview me: ask if I am tall, then ask what hair I have.',
        steps: [
          {
            prompt: 'Ask if I am tall.',
            acceptedQuestions: [
              'Are you tall?',
              'Are you short?'
            ],
            required_question_words: ['are', 'is'],
            required_keywords: ['you', 'tall'],
            question_hints: ['Are you tall?', 'Are you short?']
          },
          {
            prompt: 'Ask what hair I have.',
            acceptedQuestions: [
              'What hair do you have?',
              'What color is your hair?',
              'Do you have long hair?'
            ],
            required_question_words: ['what', 'do'],
            required_keywords: ['you', 'have'],
            question_hints: ['What hair do you have?', 'What color is your hair?']
          }
        ],
        hints: {
          words: ['are', 'is', 'what', 'do', 'you', 'have'],
          tricky: ['where', 'when']
        }
      }
    ],
    contexts_advanced: [
      {
        id: 'w3_tall_ishe',
        task_type: 'find_question',
        topic: 'tall',
        intro: 'He is tall. Ask me if he is tall.',
        answer: 'Yes, he is tall.',
        acceptedQuestions: [
          'Is he tall?',
          'Is he short?',
          'How tall is he?'
        ],
        question_hints: ['Is he tall?', 'Is he short?', 'How tall is he?'],
        required_question_words: ['is', 'how'],
        required_keywords: ['he', 'tall'],
        hints: {
          words: ['is', 'he', 'tall'],
          tricky: ['what', 'who']
        }
      },
      {
        id: 'w3_mini_appearance',
        task_type: 'mini_interview',
        topic: 'appearance',
        intro: 'Interview me: ask what hair I have, then ask what eyes I have.',
        steps: [
          {
            prompt: 'Ask what hair I have.',
            acceptedQuestions: [
              'What hair do you have?',
              'What color is your hair?',
              'Do you have long hair?'
            ],
            required_question_words: ['what'],
            required_keywords: ['hair', 'have'],
            question_hints: ['What hair do you have?', 'What color is your hair?']
          },
          {
            prompt: 'Ask what eyes I have.',
            acceptedQuestions: [
              'What eyes do you have?',
              'What color are your eyes?',
              'Do you have brown eyes?'
            ],
            required_question_words: ['what'],
            required_keywords: ['eyes', 'have'],
            question_hints: ['What eyes do you have?', 'What color are your eyes?']
          }
        ],
        hints: {
          words: ['what', 'do', 'you', 'have', 'hair', 'eyes'],
          tricky: ['where', 'when']
        }
      }
    ],
    required_question_words_easy: ['what', 'is', 'does'],
    required_question_words_advanced: ['what', 'is', 'does', 'how']
  }
};

export default week3GamesEasy;
