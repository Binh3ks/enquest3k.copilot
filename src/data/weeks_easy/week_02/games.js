/**
 * Week 2 Game Data - Easy Mode (New GameHub)
 * Grammar Focus: Possessive adjectives (my, your, his, her)
 * Scaffolding: W2 - "This is my ___."
 */

export const week2GamesEasy = {
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
    frames_easy: ['This is my ___'],
    frames_advanced: ['This is my ___'],
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
      mother: ['This is my mother.'],
      father: ['This is my father.']
    },
    sentence_hints_map: {
      mother: ['This is my mother.', 'She is my mother.', 'My mother is here.'],
      father: ['This is my father.', 'He is my father.', 'My father is here.'],
      brother: ['This is my brother.', 'He is my brother.', 'My brother is small.'],
      sister: ['This is my sister.', 'She is my sister.', 'My sister is happy.'],
      team: ['This is my team.', 'My team is good.', 'We are a team.'],
      leader: ['This is my leader.', 'She is the leader.', 'He is the leader.'],
      helper: ['This is my helper.', 'He is a helper.', 'She is a good helper.'],
      love: ['I love my family.', 'This is love.', 'I love my mother.'],
      family: ['This is my family.', 'My family is big.', 'I love my family.'],
      home: ['This is my home.', 'My home is big.', 'I am at home.']
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
      { scrambled: ['mother', 'my', 'is', 'This'], answer: 'This is my mother.', base_words: ['this', 'is', 'my', 'mother'], time_phrases: ['today', 'now', 'right now', 'at this moment'], location_phrases: ['at home', 'here', 'in our house', 'in the living room'] },
      { scrambled: ['father', 'my', 'is', 'This'], answer: 'This is my father.', base_words: ['this', 'is', 'my', 'father'], time_phrases: ['today', 'now', 'right now', 'at this moment'], location_phrases: ['at home', 'here', 'in our house', 'in the living room'] },
      { scrambled: ['brother', 'my', 'is', 'This'], answer: 'This is my brother.', base_words: ['this', 'is', 'my', 'brother'], time_phrases: ['today', 'now', 'right now', 'at this moment'], location_phrases: ['at home', 'here', 'at school', 'in the park'] },
      { scrambled: ['sister', 'my', 'is', 'This'], answer: 'This is my sister.', base_words: ['this', 'is', 'my', 'sister'], time_phrases: ['today', 'now', 'right now', 'at this moment'], location_phrases: ['at home', 'here', 'at school', 'in the park'] },
      { scrambled: ['team', 'my', 'is', 'This'], answer: 'This is my team.', base_words: ['this', 'is', 'my', 'team'], time_phrases: ['today', 'now', 'this year', 'this season'], location_phrases: ['at school', 'in class', 'in the playground', 'at practice'] },
      { scrambled: ['family', 'my', 'is', 'This'], answer: 'This is my family.', base_words: ['this', 'is', 'my', 'family'], time_phrases: ['today', 'now', 'right now', 'always'], location_phrases: ['at home', 'here', 'in the photo', 'together'] },
      { scrambled: ['home', 'my', 'is', 'This'], answer: 'This is my home.', base_words: ['this', 'is', 'my', 'home'], time_phrases: ['today', 'now', 'right now', 'always'], location_phrases: ['here', 'in this house', 'in this place', 'nearby'] },
      { scrambled: ['leader', 'my', 'is', 'This'], answer: 'This is my leader.', base_words: ['this', 'is', 'my', 'leader'], time_phrases: ['today', 'now', 'this year', 'right now'], location_phrases: ['at school', 'in class', 'in our group', 'here'] },
      { scrambled: ['helper', 'my', 'is', 'This'], answer: 'This is my helper.', base_words: ['this', 'is', 'my', 'helper'], time_phrases: ['today', 'now', 'right now', 'always'], location_phrases: ['at school', 'in class', 'here', 'at home'] },
      { scrambled: ['family', 'my', 'love', 'I'], answer: 'I love my family.', base_words: ['i', 'love', 'my', 'family'], time_phrases: ['always', 'every day', 'forever', 'so much'], location_phrases: ['at home', 'everywhere', 'here', 'in my heart'] }
    ],
    sentences_advanced: [
      { scrambled: ['mother', 'my', 'is', 'She'], answer: 'She is my mother.', base_words: ['she', 'is', 'my', 'mother'], time_phrases: ['today', 'now', 'always', 'forever'], location_phrases: ['at home', 'here', 'with me', 'in our house'] },
      { scrambled: ['father', 'my', 'is', 'He'], answer: 'He is my father.', base_words: ['he', 'is', 'my', 'father'], time_phrases: ['today', 'now', 'always', 'forever'], location_phrases: ['at home', 'here', 'with me', 'at work'] },
      { scrambled: ['brother', 'my', 'is', 'He'], answer: 'He is my brother.', base_words: ['he', 'is', 'my', 'brother'], time_phrases: ['today', 'now', 'always', 'forever'], location_phrases: ['at home', 'here', 'at school', 'in the park'] },
      { scrambled: ['sister', 'my', 'is', 'She'], answer: 'She is my sister.', base_words: ['she', 'is', 'my', 'sister'], time_phrases: ['today', 'now', 'always', 'forever'], location_phrases: ['at home', 'here', 'at school', 'in the park'] },
      { scrambled: ['leader', 'my', 'is', 'He'], answer: 'He is my leader.', base_words: ['he', 'is', 'my', 'leader'], time_phrases: ['today', 'now', 'this year', 'right now'], location_phrases: ['at school', 'in class', 'in our group', 'here'] },
      { scrambled: ['helper', 'my', 'is', 'She'], answer: 'She is my helper.', base_words: ['she', 'is', 'my', 'helper'], time_phrases: ['today', 'now', 'always', 'right now'], location_phrases: ['at school', 'in class', 'here', 'at home'] },
      { scrambled: ['team', 'my', 'is', 'This'], answer: 'This is my team.', base_words: ['this', 'is', 'my', 'team'], time_phrases: ['today', 'now', 'this year', 'this season'], location_phrases: ['at school', 'in class', 'in the playground', 'at practice'] },
      { scrambled: ['family', 'my', 'is', 'This'], answer: 'This is my family.', base_words: ['this', 'is', 'my', 'family'], time_phrases: ['today', 'now', 'right now', 'always'], location_phrases: ['at home', 'here', 'in the photo', 'together'] },
      { scrambled: ['home', 'my', 'is', 'This'], answer: 'This is my home.', base_words: ['this', 'is', 'my', 'home'], time_phrases: ['today', 'now', 'right now', 'always'], location_phrases: ['here', 'in this house', 'in this place', 'nearby'] },
      { scrambled: ['mother', 'my', 'love', 'I'], answer: 'I love my mother.', base_words: ['i', 'love', 'my', 'mother'], time_phrases: ['always', 'every day', 'forever', 'so much'], location_phrases: ['at home', 'everywhere', 'here', 'in my heart'] }
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
        intro: 'This is my mother. Ask me who she is.',
        answer: 'She is my mother.',
        acceptedQuestions: [
          'Who is this?',
          'Who is she?',
          'Who is that?',
          'Who is your mother?'
        ],
        question_hints: ['Who is this?', 'Who is she?', 'Who is that?'],
        required_question_words: ['who'],
        required_keywords: ['this', 'she', 'that'],
        hints: {
          words: ['who', 'is', 'this'],
          tricky: ['what', 'where']
        }
      },
      {
        id: 'w2_father_isthis',
        task_type: 'find_question',
        topic: 'father',
        intro: 'Look! This is my father. Ask me if this is my father.',
        answer: 'Yes, this is your father.',
        acceptedQuestions: [
          'Is this your father?',
          'Is that your father?',
          'Is this your dad?',
          'Is he your father?'
        ],
        question_hints: ['Is this your father?', 'Is that your father?', 'Is this your dad?'],
        required_question_words: ['is'],
        required_keywords: ['this', 'that', 'your', 'father'],
        hints: {
          words: ['is', 'this', 'your'],
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
          'Who is this?',
          'Who is that boy?',
          'Who is your brother?'
        ],
        question_hints: ['Who is he?', 'Who is this?', 'Who is that boy?'],
        required_question_words: ['who'],
        required_keywords: ['he', 'this', 'that'],
        hints: {
          words: ['who', 'is', 'he'],
          tricky: ['what', 'where']
        }
      },
      {
        id: 'w2_sister_isthis',
        task_type: 'find_question',
        topic: 'sister',
        intro: 'This is my sister. Ask me if this is my sister.',
        answer: 'Yes, this is my sister.',
        acceptedQuestions: [
          'Is this your sister?',
          'Is that your sister?',
          'Is she your sister?'
        ],
        question_hints: ['Is this your sister?', 'Is that your sister?', 'Is she your sister?'],
        required_question_words: ['is'],
        required_keywords: ['this', 'that', 'your', 'sister'],
        hints: {
          words: ['is', 'this', 'your'],
          tricky: ['who', 'what']
        }
      },
      {
        id: 'w2_family_who',
        task_type: 'find_question',
        topic: 'family',
        intro: 'These are my family members. Ask me who they are.',
        answer: 'They are my family.',
        acceptedQuestions: [
          'Who are they?',
          'Who is this?',
          'Who are these people?',
          'Who are your family?'
        ],
        question_hints: ['Who are they?', 'Who is this?', 'Who are these people?'],
        required_question_words: ['who'],
        required_keywords: ['they', 'this', 'these'],
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
        required_keywords: ['this', 'that', 'your', 'home'],
        hints: {
          words: ['is', 'this', 'your'],
          tricky: ['what', 'where']
        }
      },
      {
        id: 'w2_leader_who',
        task_type: 'find_question',
        topic: 'leader',
        intro: 'She is the leader. Ask me who she is.',
        answer: 'She is the leader.',
        acceptedQuestions: [
          'Who is she?',
          'Who is the leader?',
          'Who is this?'
        ],
        question_hints: ['Who is she?', 'Who is the leader?', 'Who is this?'],
        required_question_words: ['who'],
        required_keywords: ['she', 'leader', 'this'],
        hints: {
          words: ['who', 'is', 'she'],
          tricky: ['what', 'where']
        }
      },
      {
        id: 'w2_team_isthis',
        task_type: 'find_question',
        topic: 'team',
        intro: 'We are a team. Ask me if we are a team.',
        answer: 'Yes, this is my team.',
        acceptedQuestions: [
          'Is this your team?',
          'Is that your team?',
          'Are you a team?',
          'Are we a team?'
        ],
        question_hints: ['Is this your team?', 'Is that your team?', 'Are you a team?'],
        required_question_words: ['is', 'are'],
        required_keywords: ['this', 'your', 'team'],
        hints: {
          words: ['is', 'this', 'your'],
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
          'Who is that?',
          'Who is this?'
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

export default week2GamesEasy;
