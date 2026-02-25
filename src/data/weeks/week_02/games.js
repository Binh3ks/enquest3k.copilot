/**
 * Week 2 Game Data - Advanced Mode (New GameHub)
 * Grammar Focus: Possessive adjectives (my, your, his, her)
 * Scaffolding: W2 - "He is my ___." "She is my ___."
 */

export const week2GamesAdvanced = {
  vocabulary: [
    'mother', 'father', 'brother', 'sister', 'team',
    'leader', 'helper', 'love', 'family', 'home'
  ],
  show_tell: {
    steps: 3,
    word_list: [
      'mother', 'father', 'brother', 'sister', 'team',
      'leader', 'helper', 'love', 'family', 'home'
    ],
    instructions_easy: 'Say the word, add a phrase, then make a full sentence.',
    instructions_advanced: 'Say the word, add a phrase, then make a full sentence.',
    step_instructions: {
      1: 'Step 1: say the word clearly.',
      2: 'Step 2: add a short phrase with the word.',
      3: 'Step 3: make a full sentence.'
    },
    frames_easy: ['He is my ___', 'She is my ___'],
    frames_advanced: ['He is my ___', 'She is my ___'],
    details_easy: [],
    details_advanced: [],
    detail_map: {
      mother: ['my mother', 'his mother', 'her mother', 'your mother'],
      father: ['my father', 'his father', 'her father', 'your father'],
      brother: ['my brother', 'his brother', 'her brother', 'your brother'],
      sister: ['my sister', 'his sister', 'her sister', 'your sister'],
      team: ['my team', 'his team', 'her team', 'your team'],
      leader: ['my leader', 'the leader', 'a good leader', 'our leader'],
      helper: ['my helper', 'a good helper', 'the helper', 'your helper'],
      love: ['my love', 'true love', 'show love', 'feel love'],
      family: ['my family', 'his family', 'her family', 'your family'],
      home: ['my home', 'his home', 'her home', 'your home']
    },
    distractors_easy: [],
    distractors_advanced: [],
    distractor_map: {
      mother: ['my father', 'his sister', 'the team'],
      father: ['my mother', 'her brother', 'the leader'],
      brother: ['my sister', 'his father', 'the family']
    },
    frame_map: {
      mother: ['She is my mother.'],
      father: ['He is my father.']
    },
    sentence_hints_map: {
      mother: ['She is my mother.', 'My mother is kind.', 'She is kind.'],
      father: ['He is my father.', 'My father is strong.', 'He is strong.'],
      brother: ['He is my brother.', 'My brother is young.', 'He is young.'],
      sister: ['She is my sister.', 'My sister is smart.', 'She is smart.'],
      team: ['This is my team.', 'My team is strong.', 'We are a team.'],
      leader: ['She is my leader.', 'He is the leader.', 'The leader is good.'],
      helper: ['He is my helper.', 'She is a helper.', 'My helper is kind.'],
      love: ['I love my family.', 'Love is important.', 'I show love.'],
      family: ['They are my family.', 'My family is big.', 'I love my family.'],
      home: ['This is my home.', 'My home is warm.', 'I love my home.']
    },
    emoji_map: {
      mother: '👩',
      father: '👨',
      brother: '👦',
      sister: '👧',
      team: '👥',
      leader: '👑',
      helper: '🤝',
      love: '❤️',
      family: '👨‍👩‍👧‍👦',
      home: '🏠'
    },
    definitions: {
      mother: 'Your mom.',
      father: 'Your dad.'
    }
  },
  make_sentence: {
    instructions_easy: 'Unscramble the words to make a correct sentence.',
    instructions_advanced: 'Unscramble the words to make a correct sentence.',
    sentences_easy: [
      { scrambled: ['mother', 'my', 'is', 'She'], answer: 'She is my mother.' },
      { scrambled: ['father', 'my', 'is', 'He'], answer: 'He is my father.' },
      { scrambled: ['brother', 'my', 'is', 'He'], answer: 'He is my brother.' },
      { scrambled: ['sister', 'my', 'is', 'She'], answer: 'She is my sister.' },
      { scrambled: ['leader', 'my', 'is', 'He'], answer: 'He is my leader.' },
      { scrambled: ['helper', 'my', 'is', 'She'], answer: 'She is my helper.' },
      { scrambled: ['team', 'my', 'is', 'This'], answer: 'This is my team.' },
      { scrambled: ['family', 'my', 'are', 'They'], answer: 'They are my family.' },
      { scrambled: ['home', 'my', 'is', 'This'], answer: 'This is my home.' },
      { scrambled: ['family', 'my', 'love', 'I'], answer: 'I love my family.' }
    ],
    sentences_advanced: [
      { scrambled: ['mother', 'my', 'is', 'She'], answer: 'She is my mother.', base_words: ['she', 'is', 'my', 'mother'], time_phrases: ['every day', 'right now', 'in the morning', 'on weekends', 'this week'], location_phrases: ['at home', 'in the living room', 'in the kitchen', 'at our house', 'in the garden'] },
      { scrambled: ['father', 'my', 'is', 'He'], answer: 'He is my father.', base_words: ['he', 'is', 'my', 'father'], time_phrases: ['every day', 'right now', 'in the evening', 'on weekdays', 'this month'], location_phrases: ['at home', 'in the living room', 'in the garage', 'at our house', 'at work'] },
      { scrambled: ['brother', 'my', 'is', 'He'], answer: 'He is my brother.', base_words: ['he', 'is', 'my', 'brother'], time_phrases: ['every day', 'right now', 'in the afternoon', 'on Saturday', 'this week'], location_phrases: ['at home', 'in his room', 'in the backyard', 'at school', 'at our house'] },
      { scrambled: ['sister', 'my', 'is', 'She'], answer: 'She is my sister.', base_words: ['she', 'is', 'my', 'sister'], time_phrases: ['every day', 'right now', 'in the morning', 'on Sunday', 'this weekend'], location_phrases: ['at home', 'in her room', 'in the living room', 'at school', 'at our house'] },
      { scrambled: ['leader', 'the', 'is', 'He'], answer: 'He is the leader.', base_words: ['he', 'is', 'the', 'leader'], time_phrases: ['right now', 'today', 'this week', 'every meeting', 'on Monday'], location_phrases: ['at school', 'in the classroom', 'on our team', 'in the group', 'at practice'] },
      { scrambled: ['helper', 'my', 'is', 'She'], answer: 'She is my helper.', base_words: ['she', 'is', 'my', 'helper'], time_phrases: ['every day', 'right now', 'in the afternoon', 'on weekdays', 'this week'], location_phrases: ['at school', 'in the classroom', 'at home', 'in the library', 'at our house'] },
      { scrambled: ['team', 'my', 'is', 'This'], answer: 'This is my team.', base_words: ['this', 'is', 'my', 'team'], time_phrases: ['right now', 'today', 'this season', 'every week', 'on Friday'], location_phrases: ['at school', 'in the gym', 'on the field', 'in the classroom', 'at practice'] },
      { scrambled: ['family', 'my', 'are', 'They'], answer: 'They are my family.', base_words: ['they', 'are', 'my', 'family'], time_phrases: ['every day', 'right now', 'on holidays', 'this weekend', 'in the evening'], location_phrases: ['at home', 'in the living room', 'at our house', 'at the park', 'in the garden'] },
      { scrambled: ['home', 'my', 'is', 'This'], answer: 'This is my home.', base_words: ['this', 'is', 'my', 'home'], time_phrases: ['right now', 'every day', 'this year', 'in the evening', 'on weekends'], location_phrases: ['in the city', 'in the neighborhood', 'on this street', 'near the school', 'in our town'] },
      { scrambled: ['mother', 'my', 'love', 'I'], answer: 'I love my mother.', base_words: ['i', 'love', 'my', 'mother'], time_phrases: ['every day', 'all the time', 'right now', 'on her birthday', 'this moment'], location_phrases: ['at home', 'everywhere', 'in the kitchen', 'at our house', 'in the living room'] }
    ]
  },
  ask_me: {
    instructions_easy: 'Ask a question that matches the context.',
    instructions_advanced: 'Ask a question that matches the context.',
    contexts_easy: [
      {
        id: 'w2_mother_who',
        task_type: 'find_question',
        topic: 'mother',
        intro: 'She is my mother. Ask me who she is.',
        answer: 'She is my mother.',
        acceptedQuestions: [
          'Who is she?',
          'Who is your mother?',
          'Who is that?'
        ],
        question_hints: ['Who is she?', 'Who is your mother?', 'Who is that?'],
        required_question_words: ['who'],
        required_keywords: ['she', 'your', 'that'],
        hints: {
          words: ['who', 'is', 'she'],
          tricky: ['what', 'where']
        }
      },
      {
        id: 'w2_father_isthis',
        task_type: 'find_question',
        topic: 'father',
        intro: 'He is my father. Ask me about him.',
        answer: 'Yes, he is my father.',
        question_hints: ['Is he your father?', 'Is that your father?', 'Is this your dad?'],
        required_question_words: ['is'],
        required_keywords: ['he', 'your', 'father'],
        hints: {
          words: ['is', 'he', 'your'],
          tricky: ['what', 'who']
        }
      },
      {
        id: 'w2_brother_who',
        task_type: 'find_question',
        topic: 'brother',
        intro: 'He is my brother. Ask me who he is.',
        answer: 'He is my brother.',
        question_hints: ['Who is he?', 'Who is your brother?', 'Who is that boy?'],
        required_question_words: ['who'],
        required_keywords: ['he', 'your', 'that'],
        hints: {
          words: ['who', 'is', 'he'],
          tricky: ['what', 'where']
        }
      },
      {
        id: 'w2_sister_isthis',
        task_type: 'find_question',
        topic: 'sister',
        intro: 'She is my sister. Ask me about her.',
        answer: 'Yes, she is my sister.',
        question_hints: ['Is she your sister?', 'Is that your sister?', 'Is this your sister?'],
        required_question_words: ['is'],
        required_keywords: ['she', 'your', 'sister'],
        hints: {
          words: ['is', 'she', 'your'],
          tricky: ['who', 'what']
        }
      },
      {
        id: 'w2_family_who',
        task_type: 'find_question',
        topic: 'family',
        intro: 'They are my family. Ask me who they are.',
        answer: 'They are my family.',
        question_hints: ['Who are they?', 'Who is your family?', 'Who are these people?'],
        required_question_words: ['who'],
        required_keywords: ['they', 'your', 'these'],
        hints: {
          words: ['who', 'are', 'they'],
          tricky: ['what', 'where']
        }
      },
      {
        id: 'w2_home_isthis',
        task_type: 'find_question',
        topic: 'home',
        intro: 'This is my home. Ask me about it.',
        answer: 'Yes, this is my home.',
        question_hints: ['Is this your home?', 'Is that your home?', 'Is this your house?'],
        required_question_words: ['is'],
        required_keywords: ['this', 'your', 'home'],
        hints: {
          words: ['is', 'this', 'your'],
          tricky: ['what', 'where']
        }
      },
      {
        id: 'w2_leader_who',
        task_type: 'find_question',
        topic: 'leader',
        intro: 'He is the leader. Ask me who he is.',
        answer: 'He is the leader.',
        question_hints: ['Who is he?', 'Who is the leader?', 'Who is that?'],
        required_question_words: ['who'],
        required_keywords: ['he', 'leader', 'that'],
        hints: {
          words: ['who', 'is', 'he'],
          tricky: ['what', 'where']
        }
      },
      {
        id: 'w2_team_isthis',
        task_type: 'find_question',
        topic: 'team',
        intro: 'We are a team. Ask me about it.',
        answer: 'Yes, we are a team.',
        question_hints: ['Are you a team?', 'Is this your team?', 'Are they a team?'],
        required_question_words: ['is', 'are'],
        required_keywords: ['you', 'team', 'they'],
        hints: {
          words: ['is', 'are', 'your'],
          tricky: ['what', 'who']
        }
      },
      {
        id: 'w2_mini_family',
        task_type: 'mini_interview',
        topic: 'family',
        intro: 'Interview me: ask who my mother is, then ask who my father is.',
        steps: [
          {
            prompt: 'Ask who my mother is.',
            acceptedQuestions: [
              'Who is your mother?',
              'Who is she?'
            ],
            required_question_words: ['who'],
            required_keywords: ['mother'],
            question_hints: ['Who is your mother?', 'Who is she?']
          },
          {
            prompt: 'Ask who my father is.',
            acceptedQuestions: [
              'Who is your father?',
              'Who is he?',
              'Who is your dad?'
            ],
            required_question_words: ['who'],
            required_keywords: ['father'],
            question_hints: ['Who is your father?', 'Who is he?']
          }
        ],
        hints: {
          words: ['who', 'is', 'your', 'mother', 'father'],
          tricky: ['what', 'where']
        }
      }
    ],
    contexts_advanced: [
      {
        id: 'w2_mother_who',
        task_type: 'find_question',
        topic: 'mother',
        intro: 'She is my mother. Ask me who she is.',
        answer: 'She is my mother.',
        acceptedQuestions: [
          'Who is she?',
          'Who is your mother?',
          'Who is that woman?'
        ],
        question_hints: ['Who is she?', 'Who is your mother?', 'Who is that woman?'],
        required_question_words: ['who'],
        required_keywords: ['she', 'your', 'that'],
        hints: {
          words: ['who', 'is', 'she'],
          tricky: ['what', 'where']
        }
      },
      {
        id: 'w2_father_isthis',
        task_type: 'find_question',
        topic: 'father',
        intro: 'He is my father. Ask me if he is my father.',
        answer: 'Yes, he is my father.',
        acceptedQuestions: [
          'Is he your father?',
          'Is that your father?',
          'Is this your dad?'
        ],
        question_hints: ['Is he your father?', 'Is that your father?', 'Is this your dad?'],
        required_question_words: ['is'],
        required_keywords: ['he', 'your', 'father'],
        hints: {
          words: ['is', 'he', 'your'],
          tricky: ['what', 'who']
        }
      },
      {
        id: 'w2_brother_who',
        task_type: 'find_question',
        topic: 'brother',
        intro: 'He is my brother. Ask me who he is.',
        answer: 'He is my brother.',
        acceptedQuestions: [
          'Who is he?',
          'Who is your brother?',
          'Who is that boy?'
        ],
        question_hints: ['Who is he?', 'Who is your brother?', 'Who is that boy?'],
        required_question_words: ['who'],
        required_keywords: ['he', 'your', 'that'],
        hints: {
          words: ['who', 'is', 'he'],
          tricky: ['what', 'where']
        }
      },
      {
        id: 'w2_sister_isthis',
        task_type: 'find_question',
        topic: 'sister',
        intro: 'She is my sister. Ask me if she is my sister.',
        answer: 'Yes, she is my sister.',
        acceptedQuestions: [
          'Is she your sister?',
          'Is that your sister?',
          'Is this your sister?'
        ],
        question_hints: ['Is she your sister?', 'Is that your sister?', 'Is this your sister?'],
        required_question_words: ['is'],
        required_keywords: ['she', 'your', 'sister'],
        hints: {
          words: ['is', 'she', 'your'],
          tricky: ['who', 'what']
        }
      },
      {
        id: 'w2_family_who',
        task_type: 'find_question',
        topic: 'family',
        intro: 'They are my family. Ask me who they are.',
        answer: 'They are my family.',
        acceptedQuestions: [
          'Who are they?',
          'Who is your family?',
          'Who are these people?'
        ],
        question_hints: ['Who are they?', 'Who is your family?', 'Who are these people?'],
        required_question_words: ['who'],
        required_keywords: ['they', 'your', 'these'],
        hints: {
          words: ['who', 'are', 'they'],
          tricky: ['what', 'where']
        }
      },
      {
        id: 'w2_home_isthis',
        task_type: 'find_question',
        topic: 'home',
        intro: 'This is my home. Ask me if this is my home.',
        answer: 'Yes, this is my home.',
        acceptedQuestions: [
          'Is this your home?',
          'Is that your home?',
          'Is this your house?'
        ],
        question_hints: ['Is this your home?', 'Is that your home?', 'Is this your house?'],
        required_question_words: ['is'],
        required_keywords: ['this', 'your', 'home'],
        hints: {
          words: ['is', 'this', 'your'],
          tricky: ['what', 'where']
        }
      },
      {
        id: 'w2_leader_who',
        task_type: 'find_question',
        topic: 'leader',
        intro: 'He is the leader. Ask me who he is.',
        answer: 'He is the leader.',
        acceptedQuestions: [
          'Who is he?',
          'Who is the leader?',
          'Who is that?'
        ],
        question_hints: ['Who is he?', 'Who is the leader?', 'Who is that?'],
        required_question_words: ['who'],
        required_keywords: ['he', 'leader', 'that'],
        hints: {
          words: ['who', 'is', 'he'],
          tricky: ['what', 'where']
        }
      },
      {
        id: 'w2_team_isthis',
        task_type: 'find_question',
        topic: 'team',
        intro: 'We are a team. Ask me if we are a team.',
        answer: 'Yes, we are a team.',
        acceptedQuestions: [
          'Are you a team?',
          'Is this your team?',
          'Are they a team?',
          'Are we a team?'
        ],
        question_hints: ['Are you a team?', 'Is this your team?', 'Are they a team?'],
        required_question_words: ['is', 'are'],
        required_keywords: ['you', 'team', 'they'],
        hints: {
          words: ['is', 'are', 'your'],
          tricky: ['what', 'who']
        }
      },
      {
        id: 'w2_mini_family',
        task_type: 'mini_interview',
        topic: 'family',
        intro: 'Interview me: ask who my brother is, then ask who my sister is.',
        steps: [
          {
            prompt: 'Ask who my brother is.',
            acceptedQuestions: [
              'Who is your brother?',
              'Who is he?'
            ],
            required_question_words: ['who'],
            required_keywords: ['brother'],
            question_hints: ['Who is your brother?', 'Who is he?']
          },
          {
            prompt: 'Ask who my sister is.',
            acceptedQuestions: [
              'Who is your sister?',
              'Who is she?'
            ],
            required_question_words: ['who'],
            required_keywords: ['sister'],
            question_hints: ['Who is your sister?', 'Who is she?']
          }
        ],
        hints: {
          words: ['who', 'is', 'your', 'brother', 'sister'],
          tricky: ['what', 'where']
        }
      }
    ],
    required_question_words_easy: ['who', 'is'],
    required_question_words_advanced: ['who', 'is', 'are']
  }
};

export default week2GamesAdvanced;
