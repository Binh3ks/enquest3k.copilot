/**
 * Week 3 Game Data - Advanced Mode (New GameHub)
 * Grammar Focus: Is vs has (with "and")
 * Scaffolding: W3 - "She is ___ and has ___."
 */

export const week3GamesAdvanced = {
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
    frames_easy: ['She is ___ and has ___'],
    frames_advanced: ['She is ___ and has ___'],
    details_easy: [],
    details_advanced: [],
    detail_map: {
      tall: ['very tall', 'so tall', 'tall and pretty', 'tall and strong'],
      short: ['very short', 'so short', 'short and cute', 'short and happy'],
      hair: ['long hair', 'short hair', 'black hair', 'curly hair'],
      eyes: ['blue eyes', 'brown eyes', 'big eyes', 'pretty eyes'],
      long: ['very long', 'so long', 'long and straight', 'long and curly'],
      curly: ['curly hair', 'very curly', 'curly and long', 'curly and black'],
      straight: ['straight hair', 'very straight', 'straight and long', 'straight and brown'],
      glasses: ['big glasses', 'small glasses', 'round glasses', 'cool glasses'],
      face: ['happy face', 'round face', 'pretty face', 'smiling face'],
      smile: ['big smile', 'happy smile', 'bright smile', 'lovely smile']
    },
    distractors_easy: [],
    distractors_advanced: [],
    distractor_map: {
      tall: ['short hair', 'blue eyes', 'big smile'],
      short: ['long hair', 'brown eyes', 'round face'],
      hair: ['tall boy', 'big glasses', 'happy smile']
    },
    frame_map: {
      tall: ['She is tall and has long hair.'],
      hair: ['She is pretty and has curly hair.']
    },
    sentence_hints_map: {
      tall: ['She is tall and has blue eyes.', 'She is tall and has long hair.', 'He is tall and has glasses.'],
      short: ['She is short and has brown eyes.', 'She is short and has curly hair.', 'He is short and has glasses.'],
      hair: ['She is pretty and has long hair.', 'She is happy and has black hair.', 'She is tall and has curly hair.'],
      eyes: ['She is pretty and has blue eyes.', 'She is tall and has brown eyes.', 'He is short and has big eyes.'],
      long: ['She is tall and has long hair.', 'She is pretty and has long hair.', 'She is young and has long hair.'],
      curly: ['She is short and has curly hair.', 'She is pretty and has curly hair.', 'She is happy and has curly hair.'],
      straight: ['She is tall and has straight hair.', 'She is pretty and has straight hair.', 'She is young and has straight hair.'],
      glasses: ['She is smart and has glasses.', 'She is short and has glasses.', 'He is tall and has glasses.'],
      face: ['She is pretty and has a happy face.', 'She is young and has a round face.', 'She is tall and has a pretty face.'],
      smile: ['She is happy and has a big smile.', 'She is pretty and has a bright smile.', 'She is young and has a lovely smile.']
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
      { scrambled: ['eyes', 'blue', 'has', 'and', 'tall', 'is', 'She'], answer: 'She is tall and has blue eyes.' },
      { scrambled: ['hair', 'long', 'has', 'and', 'pretty', 'is', 'She'], answer: 'She is pretty and has long hair.' },
      { scrambled: ['glasses', 'has', 'and', 'short', 'is', 'He'], answer: 'He is short and has glasses.' },
      { scrambled: ['hair', 'curly', 'has', 'and', 'happy', 'is', 'She'], answer: 'She is happy and has curly hair.' },
      { scrambled: ['smile', 'big', 'a', 'has', 'and', 'young', 'is', 'She'], answer: 'She is young and has a big smile.' },
      { scrambled: ['eyes', 'brown', 'has', 'and', 'tall', 'is', 'He'], answer: 'He is tall and has brown eyes.' },
      { scrambled: ['hair', 'straight', 'has', 'and', 'pretty', 'is', 'She'], answer: 'She is pretty and has straight hair.' },
      { scrambled: ['face', 'happy', 'a', 'has', 'and', 'short', 'is', 'She'], answer: 'She is short and has a happy face.' },
      { scrambled: ['glasses', 'has', 'and', 'smart', 'is', 'He'], answer: 'He is smart and has glasses.' },
      { scrambled: ['hair', 'black', 'has', 'and', 'tall', 'is', 'She'], answer: 'She is tall and has black hair.' }
    ],
    sentences_advanced: [
      { scrambled: ['eyes', 'blue', 'has', 'and', 'tall', 'is', 'She'], answer: 'She is tall and has blue eyes.', base_words: ['she', 'is', 'tall', 'and', 'has', 'blue', 'eyes'], time_phrases: ['right now', 'every day', 'this year', 'in the morning', 'on Monday'], location_phrases: ['at school', 'in the classroom', 'at home', 'in the picture', 'at our school'] },
      { scrambled: ['hair', 'long', 'has', 'and', 'pretty', 'is', 'She'], answer: 'She is pretty and has long hair.', base_words: ['she', 'is', 'pretty', 'and', 'has', 'long', 'hair'], time_phrases: ['right now', 'every day', 'this week', 'in the photo', 'on Tuesday'], location_phrases: ['at school', 'in the classroom', 'at home', 'in the mirror', 'at the party'] },
      { scrambled: ['glasses', 'big', 'has', 'and', 'short', 'is', 'He'], answer: 'He is short and has big glasses.', base_words: ['he', 'is', 'short', 'and', 'has', 'big', 'glasses'], time_phrases: ['right now', 'every day', 'this month', 'in the afternoon', 'on Wednesday'], location_phrases: ['at school', 'in the classroom', 'at home', 'in the library', 'at our school'] },
      { scrambled: ['hair', 'curly', 'has', 'and', 'happy', 'is', 'She'], answer: 'She is happy and has curly hair.', base_words: ['she', 'is', 'happy', 'and', 'has', 'curly', 'hair'], time_phrases: ['right now', 'today', 'this week', 'in the morning', 'on Thursday'], location_phrases: ['at school', 'at home', 'in the classroom', 'at the park', 'at our house'] },
      { scrambled: ['smile', 'bright', 'a', 'has', 'and', 'young', 'is', 'She'], answer: 'She is young and has a bright smile.', base_words: ['she', 'is', 'young', 'and', 'has', 'a', 'bright', 'smile'], time_phrases: ['right now', 'every day', 'this year', 'in the photo', 'on Friday'], location_phrases: ['at school', 'at home', 'in the classroom', 'at the playground', 'at our school'] },
      { scrambled: ['eyes', 'brown', 'big', 'has', 'and', 'tall', 'is', 'He'], answer: 'He is tall and has big brown eyes.', base_words: ['he', 'is', 'tall', 'and', 'has', 'big', 'brown', 'eyes'], time_phrases: ['right now', 'every day', 'this semester', 'in the picture', 'on Saturday'], location_phrases: ['at school', 'in the classroom', 'at home', 'at the game', 'at our school'] },
      { scrambled: ['hair', 'straight', 'long', 'has', 'and', 'pretty', 'is', 'She'], answer: 'She is pretty and has long straight hair.', base_words: ['she', 'is', 'pretty', 'and', 'has', 'long', 'straight', 'hair'], time_phrases: ['right now', 'every day', 'this week', 'in the afternoon', 'on Sunday'], location_phrases: ['at school', 'at home', 'in the mirror', 'at the party', 'in the classroom'] },
      { scrambled: ['face', 'happy', 'a', 'has', 'and', 'short', 'is', 'She'], answer: 'She is short and has a happy face.', base_words: ['she', 'is', 'short', 'and', 'has', 'a', 'happy', 'face'], time_phrases: ['right now', 'today', 'every day', 'in the morning', 'this week'], location_phrases: ['at school', 'at home', 'in the classroom', 'at the park', 'at our house'] },
      { scrambled: ['glasses', 'cool', 'has', 'and', 'smart', 'is', 'He'], answer: 'He is smart and has cool glasses.', base_words: ['he', 'is', 'smart', 'and', 'has', 'cool', 'glasses'], time_phrases: ['right now', 'every day', 'this year', 'in the afternoon', 'on Monday'], location_phrases: ['at school', 'in the classroom', 'in the library', 'at home', 'at our school'] },
      { scrambled: ['hair', 'black', 'long', 'has', 'and', 'tall', 'is', 'She'], answer: 'She is tall and has long black hair.', base_words: ['she', 'is', 'tall', 'and', 'has', 'long', 'black', 'hair'], time_phrases: ['right now', 'every day', 'this week', 'in the picture', 'on Tuesday'], location_phrases: ['at school', 'at home', 'in the classroom', 'at the event', 'at our school'] }
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
        intro: 'She is tall and has blue eyes. Ask me about her.',
        answer: 'Yes, she is tall.',
        question_hints: ['Is she tall?', 'Is she short?', 'What does she have?'],
        required_question_words: ['is', 'what'],
        required_keywords: ['she', 'tall'],
        hints: {
          words: ['is', 'she', 'tall'],
          tricky: ['who', 'where']
        }
      },
      {
        id: 'w3_hair_what',
        task_type: 'find_question',
        topic: 'hair',
        intro: 'She is pretty and has long hair. Ask me what she has.',
        answer: 'She has long hair.',
        question_hints: ['What does she have?', 'What hair does she have?', 'Does she have long hair?'],
        required_question_words: ['what', 'does'],
        required_keywords: ['she', 'have', 'hair'],
        hints: {
          words: ['what', 'does', 'she', 'have'],
          tricky: ['who', 'where']
        }
      },
      {
        id: 'w3_eyes_what',
        task_type: 'find_question',
        topic: 'eyes',
        intro: 'He is tall and has brown eyes. Ask me what he has.',
        answer: 'He has brown eyes.',
        question_hints: ['What does he have?', 'What eyes does he have?', 'What color are his eyes?'],
        required_question_words: ['what'],
        required_keywords: ['he', 'have', 'eyes'],
        hints: {
          words: ['what', 'does', 'he', 'have'],
          tricky: ['who', 'where']
        }
      },
      {
        id: 'w3_glasses_ishe',
        task_type: 'find_question',
        topic: 'glasses',
        intro: 'She is smart and has glasses. Ask me about it.',
        answer: 'Yes, she has glasses.',
        question_hints: ['Does she have glasses?', 'Is she wearing glasses?', 'What does she have?'],
        required_question_words: ['does', 'is', 'what'],
        required_keywords: ['she', 'have', 'glasses'],
        hints: {
          words: ['does', 'she', 'have'],
          tricky: ['who', 'where']
        }
      },
      {
        id: 'w3_short_ishe',
        task_type: 'find_question',
        topic: 'short',
        intro: 'He is short and has curly hair. Ask me about him.',
        answer: 'Yes, he is short.',
        question_hints: ['Is he short?', 'Is he tall?', 'What does he have?'],
        required_question_words: ['is', 'what'],
        required_keywords: ['he', 'short'],
        hints: {
          words: ['is', 'he', 'short'],
          tricky: ['who', 'where']
        }
      },
      {
        id: 'w3_curly_what',
        task_type: 'find_question',
        topic: 'curly',
        intro: 'She is happy and has curly hair. Ask me what kind of hair.',
        answer: 'She has curly hair.',
        question_hints: ['What hair does she have?', 'Is her hair curly?', 'What does she have?'],
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
        intro: 'She is young and has a big smile. Ask me what she has.',
        answer: 'She has a big smile.',
        question_hints: ['What does she have?', 'What smile does she have?', 'Does she have a smile?'],
        required_question_words: ['what', 'does'],
        required_keywords: ['she', 'have', 'smile'],
        hints: {
          words: ['what', 'does', 'she', 'have'],
          tricky: ['who', 'where']
        }
      },
      {
        id: 'w3_face_what',
        task_type: 'find_question',
        topic: 'face',
        intro: 'She is pretty and has a round face. Ask me what she has.',
        answer: 'She has a round face.',
        question_hints: ['What does she have?', 'What face does she have?', 'Is she pretty?'],
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
            required_question_words: ['are', 'is'],
            required_keywords: ['you', 'tall'],
            question_hints: ['Are you tall?', 'Is he tall?']
          },
          {
            prompt: 'Ask what hair I have.',
            required_question_words: ['what'],
            required_keywords: ['hair', 'have'],
            question_hints: ['What hair do you have?', 'What does he have?']
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
        intro: 'She is tall and has blue eyes. Ask me about her.',
        answer: 'Yes, she is tall and has blue eyes.',
        question_hints: ['Is she tall?', 'What does she have?', 'What does she look like?'],
        required_question_words: ['is', 'what'],
        required_keywords: ['she', 'tall'],
        hints: {
          words: ['is', 'she', 'tall'],
          tricky: ['who', 'where']
        }
      },
      {
        id: 'w3_hair_what',
        task_type: 'find_question',
        topic: 'hair',
        intro: 'She is pretty and has long hair. Ask me what she has.',
        answer: 'She has long hair.',
        question_hints: ['What does she have?', 'What hair does she have?', 'Does she have long hair?'],
        required_question_words: ['what', 'does'],
        required_keywords: ['she', 'have', 'hair'],
        hints: {
          words: ['what', 'does', 'she', 'have'],
          tricky: ['who', 'where']
        }
      },
      {
        id: 'w3_eyes_what',
        task_type: 'find_question',
        topic: 'eyes',
        intro: 'He is tall and has brown eyes. Ask me what he has.',
        answer: 'He has brown eyes.',
        question_hints: ['What does he have?', 'What eyes does he have?', 'What color are his eyes?'],
        required_question_words: ['what'],
        required_keywords: ['he', 'have', 'eyes'],
        hints: {
          words: ['what', 'does', 'he', 'have'],
          tricky: ['who', 'where']
        }
      },
      {
        id: 'w3_glasses_ishe',
        task_type: 'find_question',
        topic: 'glasses',
        intro: 'She is smart and has glasses. Ask me about it.',
        answer: 'Yes, she has glasses.',
        question_hints: ['Does she have glasses?', 'Is she wearing glasses?', 'What does she have?'],
        required_question_words: ['does', 'is', 'what'],
        required_keywords: ['she', 'have', 'glasses'],
        hints: {
          words: ['does', 'she', 'have'],
          tricky: ['who', 'where']
        }
      },
      {
        id: 'w3_short_ishe',
        task_type: 'find_question',
        topic: 'short',
        intro: 'He is short and has curly hair. Ask me about him.',
        answer: 'Yes, he is short.',
        question_hints: ['Is he short?', 'Is he tall?', 'What does he have?'],
        required_question_words: ['is', 'what'],
        required_keywords: ['he', 'short'],
        hints: {
          words: ['is', 'he', 'short'],
          tricky: ['who', 'where']
        }
      },
      {
        id: 'w3_curly_what',
        task_type: 'find_question',
        topic: 'curly',
        intro: 'She is happy and has curly hair. Ask me what kind of hair.',
        answer: 'She has curly hair.',
        question_hints: ['What hair does she have?', 'Is her hair curly?', 'What does she have?'],
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
        intro: 'She is young and has a big smile. Ask me what she has.',
        answer: 'She has a big smile.',
        question_hints: ['What does she have?', 'What smile does she have?', 'Does she have a smile?'],
        required_question_words: ['what', 'does'],
        required_keywords: ['she', 'have', 'smile'],
        hints: {
          words: ['what', 'does', 'she', 'have'],
          tricky: ['who', 'where']
        }
      },
      {
        id: 'w3_face_what',
        task_type: 'find_question',
        topic: 'face',
        intro: 'She is pretty and has a round face. Ask me what she has.',
        answer: 'She has a round face.',
        question_hints: ['What does she have?', 'What face does she have?', 'Is she pretty?'],
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
        intro: 'Interview me: ask what hair I have, then ask what eyes I have.',
        steps: [
          {
            prompt: 'Ask what hair I have.',
            required_question_words: ['what'],
            required_keywords: ['hair', 'have'],
            question_hints: ['What hair do you have?', 'What hair does he have?', 'What hair does she have?']
          },
          {
            prompt: 'Ask what eyes I have.',
            required_question_words: ['what'],
            required_keywords: ['eyes', 'have'],
            question_hints: ['What eyes do you have?', 'What eyes does he have?', 'What eyes does she have?']
          }
        ],
        hints: {
          words: ['what', 'do', 'you', 'have', 'hair', 'eyes'],
          tricky: ['where', 'when']
        }
      }
    ],
    required_question_words_easy: ['what', 'is', 'does'],
    required_question_words_advanced: ['what', 'is', 'does']
  }
};

export default week3GamesAdvanced;
