/**
 * Week 12 Game Data - Advanced Mode (New GameHub)
 */

export const week12GamesAdvanced = {
  vocabulary: [
    'perform', 'talent', 'ability', 'showcase', 'demonstrate',
    'skill', 'practice', 'achieve', 'improve', 'confident'
  ],
  show_tell: {
    steps: 3,
    word_list: [
      'perform', 'talent', 'ability', 'showcase', 'demonstrate',
      'skill', 'practice', 'achieve', 'improve', 'confident'
    ],
    instructions_easy: 'Say the word, add a phrase, then make a full sentence.',
    instructions_advanced: 'Say the word, add a phrase, then make a full sentence.',
    step_instructions: {
      1: 'Step 1: say the word clearly.',
      2: 'Step 2: add a short phrase with the word.',
      3: 'Step 3: make a full sentence.'
    },
    frames_easy: ['I can ___ well', 'I can ___'],
    frames_advanced: ['I can ___ very well', 'I can demonstrate my ___'],
    details_easy: [],
    details_advanced: [],
    detail_map: {
      perform: ['I perform', 'perform well', 'perform on stage', 'can perform'],
      talent: ['my talent', 'great talent', 'show talent', 'have talent'],
      ability: ['my ability', 'special ability', 'show ability', 'have ability'],
      showcase: ['I showcase', 'showcase talent', 'showcase skills', 'can showcase'],
      demonstrate: ['I demonstrate', 'demonstrate skills', 'demonstrate talent', 'can demonstrate'],
      skill: ['my skill', 'special skill', 'new skill', 'have skill'],
      practice: ['I practice', 'practice daily', 'practice hard', 'must practice'],
      achieve: ['I achieve', 'achieve goals', 'achieve success', 'can achieve'],
      improve: ['I improve', 'improve skills', 'improve daily', 'can improve'],
      confident: ['feel confident', 'very confident', 'be confident', 'stay confident']
    },
    distractors_easy: [],
    distractors_advanced: [],
    distractor_map: {
      perform: ['my talent', 'showcase skills', 'can practice'],
      talent: ['perform well', 'can achieve', 'improve skills']
    },
    frame_map: {
      perform: ['I can ___ well'],
      talent: ['My ___ is singing']
    },
    sentence_hints_map: {
      perform: ['I can perform.', 'I can perform on stage.', 'I can perform well.'],
      talent: ['My talent is singing.', 'I have great talent.', 'I show my talent.'],
      ability: ['My ability is special.', 'I have this ability.', 'I show my ability.'],
      showcase: ['I can showcase my talent.', 'I can showcase my skills.', 'I showcase on stage.'],
      demonstrate: ['I can demonstrate my skills.', 'I demonstrate my talent.', 'I demonstrate on stage.'],
      skill: ['My skill is drawing.', 'I have special skills.', 'I practice my skill.'],
      practice: ['I practice every day.', 'I practice my skills.', 'I practice singing.'],
      achieve: ['I can achieve my goals.', 'I achieve success.', 'I achieve great things.'],
      improve: ['I can improve my skills.', 'I improve every day.', 'I improve my talent.'],
      confident: ['I feel confident.', 'I am very confident.', 'I stay confident on stage.']
    },
    emoji_map: {
      perform: '🎭',
      talent: '⭐',
      ability: '💪',
      showcase: '🌟',
      demonstrate: '👏',
      skill: '🎯',
      practice: '📝',
      achieve: '🏆',
      improve: '📈',
      confident: '😊'
    },
    definitions: {
      perform: 'To do something in front of people, like singing or dancing.',
      talent: 'A special ability you are born with or develop.',
      ability: 'Something you can do.',
      skill: 'Something you learn to do well through practice.'
    }
  },
  make_sentence: {
    instructions_easy: 'Unscramble the words to make a correct sentence.',
    instructions_advanced: 'Unscramble the words to make a correct sentence.',
    sentences_easy: [
      { scrambled: ['I', 'can', 'perform'], answer: 'I can perform.' },
      { scrambled: ['My', 'talent', 'is', 'singing'], answer: 'My talent is singing.' },
      { scrambled: ['I', 'have', 'the', 'ability'], answer: 'I have the ability.' },
      { scrambled: ['I', 'can', 'showcase', 'my', 'skills'], answer: 'I can showcase my skills.' },
      { scrambled: ['I', 'can', 'demonstrate', 'my', 'talent'], answer: 'I can demonstrate my talent.' },
      { scrambled: ['My', 'skill', 'is', 'dancing'], answer: 'My skill is dancing.' },
      { scrambled: ['I', 'practice', 'every', 'day'], answer: 'I practice every day.' },
      { scrambled: ['I', 'can', 'achieve', 'my', 'goals'], answer: 'I can achieve my goals.' },
      { scrambled: ['I', 'can', 'improve', 'my', 'skills'], answer: 'I can improve my skills.' },
      { scrambled: ['I', 'feel', 'confident'], answer: 'I feel confident.' }
    ],
    sentences_advanced: [
      { scrambled: ['I', 'can', 'perform', 'on', 'stage'], answer: 'I can perform on stage.', base_words: ['i', 'can', 'perform', 'on', 'stage'], time_phrases: ['today', 'tomorrow', 'next week', 'this Sunday', 'very soon'], location_phrases: ['at school', 'at the theater', 'in the auditorium', 'for everyone', 'with my friends'] },
      { scrambled: ['My', 'talent', 'is', 'special'], answer: 'My talent is special.', base_words: ['my', 'talent', 'is', 'special'], time_phrases: ['always', 'right now', 'today', 'every day', 'naturally'], location_phrases: ['on stage', 'in my performance', 'everywhere', 'in the show', 'for everyone'] },
      { scrambled: ['I', 'have', 'great', 'ability'], answer: 'I have great ability.', base_words: ['i', 'have', 'great', 'ability'], time_phrases: ['always', 'right now', 'today', 'naturally', 'forever'], location_phrases: ['on stage', 'in singing', 'in dancing', 'in sports', 'everywhere'] },
      { scrambled: ['can', 'I', 'showcase', 'my', 'talent'], answer: 'I can showcase my talent.', base_words: ['i', 'can', 'showcase', 'my', 'talent'], time_phrases: ['today', 'tomorrow', 'next week', 'this weekend', 'very soon'], location_phrases: ['on stage', 'at school', 'in the show', 'for everyone', 'in the competition'] },
      { scrambled: ['demonstrate', 'I', 'can', 'my', 'skills'], answer: 'I can demonstrate my skills.', base_words: ['i', 'can', 'demonstrate', 'my', 'skills'], time_phrases: ['today', 'right now', 'tomorrow', 'very soon', 'next time'], location_phrases: ['on stage', 'at school', 'in class', 'for you', 'in the performance'] },
      { scrambled: ['My', 'singing', 'skill', 'is', 'excellent'], answer: 'My singing skill is excellent.', base_words: ['my', 'singing', 'skill', 'is', 'excellent'], time_phrases: ['always', 'now', 'today', 'naturally', 'certainly'], location_phrases: ['on stage', 'in my performance', 'in the show', 'for everyone', 'always'] },
      { scrambled: ['I', 'practice', 'hard', 'every', 'day'], answer: 'I practice hard every day.', base_words: ['i', 'practice', 'hard', 'every', 'day'], time_phrases: ['every day', 'daily', 'always', 'regularly', 'constantly'], location_phrases: ['at home', 'at school', 'in my room', 'at the studio', 'everywhere'] },
      { scrambled: ['achieve', 'I', 'can', 'great', 'things'], answer: 'I can achieve great things.', base_words: ['i', 'can', 'achieve', 'great', 'things'], time_phrases: ['soon', 'in the future', 'someday', 'with practice', 'eventually'], location_phrases: ['on stage', 'in my life', 'in competitions', 'with hard work', 'anywhere'] },
      { scrambled: ['improve', 'skills', 'I', 'my', 'can'], answer: 'I can improve my skills.', base_words: ['i', 'can', 'improve', 'my', 'skills'], time_phrases: ['now', 'today', 'every day', 'with practice', 'over time'], location_phrases: ['at home', 'at school', 'with my teacher', 'in class', 'anywhere'] },
      { scrambled: ['confident', 'feel', 'I', 'on', 'stage'], answer: 'I feel confident on stage.', base_words: ['i', 'feel', 'confident', 'on', 'stage'], time_phrases: ['always', 'now', 'today', 'every time', 'forever'], location_phrases: ['on stage', 'in performances', 'in shows', 'during talent shows', 'anywhere'] }
    ]
  },
  ask_me: {
    instructions_easy: 'Ask a question that matches the context.',
    instructions_advanced: 'Ask a question that matches the context.',
    contexts_easy: [
      {
        id: 'w12_perform_what',
        task_type: 'find_question',
        topic: 'perform',
        intro: 'I can perform on stage. Ask me what I can do.',
        acceptedQuestions: [
          'What can you do?',
          'Can you perform?',
          'What do you do?'
        ],
        answer: 'I can perform on stage.',
        question_hints: ['What can you do?', 'Can you perform?', 'What do you do?'],
        required_question_words: ['what', 'can'],
        required_keywords: ['you'],
        hints: {
          words: ['what', 'can', 'you', 'do'],
          tricky: ['where', 'who']
        }
      },
      {
        id: 'w12_talent_what',
        task_type: 'find_question',
        topic: 'talent',
        intro: 'My talent is singing. Ask me what my talent is.',
        acceptedQuestions: [
          'What is your talent?',
          'What can you do?',
          'What is your skill?'
        ],
        answer: 'My talent is singing.',
        question_hints: ['What is your talent?', 'What can you do?', 'What is your skill?'],
        required_question_words: ['what'],
        required_keywords: ['talent', 'you'],
        hints: {
          words: ['what', 'is', 'your', 'talent'],
          tricky: ['where', 'who']
        }
      },
      {
        id: 'w12_ability_what',
        task_type: 'find_question',
        topic: 'ability',
        intro: 'I have the ability to dance. Ask me what ability I have.',
        acceptedQuestions: [
          'What ability do you have?',
          'What can you do?',
          'What is your ability?'
        ],
        answer: 'I have the ability to dance.',
        question_hints: ['What ability do you have?', 'What can you do?', 'What is your ability?'],
        required_question_words: ['what'],
        required_keywords: ['ability', 'you'],
        hints: {
          words: ['what', 'ability', 'do', 'you', 'have'],
          tricky: ['where', 'who']
        }
      },
      {
        id: 'w12_showcase_can',
        task_type: 'find_question',
        topic: 'showcase',
        intro: 'I can showcase my skills. Ask me if I can showcase.',
        acceptedQuestions: [
          'Can you showcase?',
          'Can you showcase your skills?',
          'What can you do?'
        ],
        answer: 'Yes, I can showcase my skills.',
        question_hints: ['Can you showcase?', 'Can you showcase your skills?', 'What can you do?'],
        required_question_words: ['can'],
        required_keywords: ['you', 'showcase'],
        hints: {
          words: ['can', 'you', 'showcase'],
          tricky: ['where', 'what']
        }
      },
      {
        id: 'w12_demonstrate_can',
        task_type: 'find_question',
        topic: 'demonstrate',
        intro: 'I can demonstrate my talent. Ask me if I can demonstrate.',
        acceptedQuestions: [
          'Can you demonstrate?',
          'Can you demonstrate your talent?',
          'What can you do?'
        ],
        answer: 'Yes, I can demonstrate my talent.',
        question_hints: ['Can you demonstrate?', 'Can you demonstrate your talent?', 'What can you do?'],
        required_question_words: ['can'],
        required_keywords: ['you', 'demonstrate'],
        hints: {
          words: ['can', 'you', 'demonstrate'],
          tricky: ['where', 'who']
        }
      },
      {
        id: 'w12_skill_what',
        task_type: 'find_question',
        topic: 'skill',
        intro: 'My skill is drawing. Ask me what my skill is.',
        acceptedQuestions: [
          'What is your skill?',
          'What can you do?',
          'What skill do you have?'
        ],
        answer: 'My skill is drawing.',
        question_hints: ['What is your skill?', 'What can you do?', 'What skill do you have?'],
        required_question_words: ['what'],
        required_keywords: ['skill', 'you'],
        hints: {
          words: ['what', 'is', 'your', 'skill'],
          tricky: ['where', 'who']
        }
      },
      {
        id: 'w12_practice_how',
        task_type: 'find_question',
        topic: 'practice',
        intro: 'I practice every day. Ask me how often I practice.',
        acceptedQuestions: [
          'How often do you practice?',
          'When do you practice?',
          'Do you practice?'
        ],
        answer: 'I practice every day.',
        question_hints: ['How often do you practice?', 'When do you practice?', 'Do you practice?'],
        required_question_words: ['how', 'when', 'do'],
        required_keywords: ['you', 'practice'],
        hints: {
          words: ['how', 'often', 'do', 'you', 'practice'],
          tricky: ['where', 'what']
        }
      },
      {
        id: 'w12_achieve_can',
        task_type: 'find_question',
        topic: 'achieve',
        intro: 'I can achieve my goals. Ask me if I can achieve them.',
        acceptedQuestions: [
          'Can you achieve your goals?',
          'Can you achieve?',
          'What can you do?'
        ],
        answer: 'Yes, I can achieve my goals.',
        question_hints: ['Can you achieve your goals?', 'Can you achieve?', 'What can you do?'],
        required_question_words: ['can'],
        required_keywords: ['you', 'achieve'],
        hints: {
          words: ['can', 'you', 'achieve'],
          tricky: ['where', 'who']
        }
      },
      {
        id: 'w12_mini_talents',
        task_type: 'mini_interview',
        topic: 'talents',
        intro: 'Interview me: ask what my talent is, then ask if I can perform.',
        steps: [
          {
            prompt: 'Ask what my talent is.',
            required_question_words: ['what'],
            required_keywords: ['talent'],
            question_hints: ['What is your talent?', 'What can you do?', 'What is your skill?']
          },
          {
            prompt: 'Ask if I can perform.',
            acceptedQuestions: [
              'Can you perform?',
              'Do you perform?',
              'Can you perform on stage?'
            ],
            required_question_words: ['can'],
            required_keywords: ['you', 'perform'],
            question_hints: ['Can you perform?', 'Do you perform?', 'Can you perform on stage?']
          }
        ],
        hints: {
          words: ['what', 'is', 'your', 'talent', 'can', 'you', 'perform'],
          tricky: ['where', 'who']
        }
      }
    ],
    contexts_advanced: [
      {
        id: 'w12_perform_what_adv',
        task_type: 'find_question',
        topic: 'perform',
        intro: 'I can perform excellently on stage. Ask me about my abilities.',
        acceptedQuestions: [
          'What can you do?',
          'Can you perform?',
          'What are your abilities?'
        ],
        answer: 'I can perform excellently on stage.',
        question_hints: ['What can you do?', 'Can you perform?', 'What are your abilities?'],
        required_question_words: ['what', 'can'],
        required_keywords: ['you'],
        hints: {
          words: ['what', 'can', 'you', 'do', 'perform'],
          tricky: ['where', 'who']
        }
      },
      {
        id: 'w12_talent_what_adv',
        task_type: 'find_question',
        topic: 'talent',
        intro: 'My talent is singing beautifully. Ask me what my talent is.',
        acceptedQuestions: [
          'What is your talent?',
          'What can you do?',
          'What special ability do you have?'
        ],
        answer: 'My talent is singing beautifully.',
        question_hints: ['What is your talent?', 'What can you do?', 'What special ability do you have?'],
        required_question_words: ['what'],
        required_keywords: ['talent', 'you'],
        hints: {
          words: ['what', 'is', 'your', 'talent'],
          tricky: ['where', 'who']
        }
      },
      {
        id: 'w12_ability_what_adv',
        task_type: 'find_question',
        topic: 'ability',
        intro: 'I have a special ability to dance gracefully. Ask me about my ability.',
        acceptedQuestions: [
          'What ability do you have?',
          'What can you do?',
          'What is your special ability?'
        ],
        answer: 'I have a special ability to dance gracefully.',
        question_hints: ['What ability do you have?', 'What can you do?', 'What is your special ability?'],
        required_question_words: ['what'],
        required_keywords: ['ability', 'you'],
        hints: {
          words: ['what', 'ability', 'do', 'you', 'have'],
          tricky: ['where', 'who']
        }
      },
      {
        id: 'w12_showcase_can_adv',
        task_type: 'find_question',
        topic: 'showcase',
        intro: 'I can showcase my skills in the talent show. Ask me if I can showcase them.',
        acceptedQuestions: [
          'Can you showcase your skills?',
          'Can you showcase?',
          'What can you do?'
        ],
        answer: 'Yes, I can showcase my skills in the talent show.',
        question_hints: ['Can you showcase your skills?', 'Can you showcase?', 'What can you do?'],
        required_question_words: ['can'],
        required_keywords: ['you', 'showcase'],
        hints: {
          words: ['can', 'you', 'showcase', 'skills'],
          tricky: ['where', 'what']
        }
      },
      {
        id: 'w12_demonstrate_can_adv',
        task_type: 'find_question',
        topic: 'demonstrate',
        intro: 'I can demonstrate my talent confidently. Ask me if I can demonstrate it.',
        acceptedQuestions: [
          'Can you demonstrate your talent?',
          'Can you demonstrate?',
          'What can you do?'
        ],
        answer: 'Yes, I can demonstrate my talent confidently.',
        question_hints: ['Can you demonstrate your talent?', 'Can you demonstrate?', 'What can you do?'],
        required_question_words: ['can'],
        required_keywords: ['you', 'demonstrate'],
        hints: {
          words: ['can', 'you', 'demonstrate', 'talent'],
          tricky: ['where', 'who']
        }
      },
      {
        id: 'w12_skill_what_adv',
        task_type: 'find_question',
        topic: 'skill',
        intro: 'My skill is drawing beautiful pictures. Ask me about my skill.',
        acceptedQuestions: [
          'What is your skill?',
          'What can you do?',
          'What skill do you have?'
        ],
        answer: 'My skill is drawing beautiful pictures.',
        question_hints: ['What is your skill?', 'What can you do?', 'What skill do you have?'],
        required_question_words: ['what'],
        required_keywords: ['skill', 'you'],
        hints: {
          words: ['what', 'is', 'your', 'skill'],
          tricky: ['where', 'who']
        }
      },
      {
        id: 'w12_practice_how_adv',
        task_type: 'find_question',
        topic: 'practice',
        intro: 'I practice diligently every single day. Ask me about my practice routine.',
        acceptedQuestions: [
          'How often do you practice?',
          'When do you practice?',
          'Do you practice every day?'
        ],
        answer: 'I practice diligently every single day.',
        question_hints: ['How often do you practice?', 'When do you practice?', 'Do you practice every day?'],
        required_question_words: ['how', 'when', 'do'],
        required_keywords: ['you', 'practice'],
        hints: {
          words: ['how', 'often', 'do', 'you', 'practice'],
          tricky: ['where', 'what']
        }
      },
      {
        id: 'w12_achieve_can_adv',
        task_type: 'find_question',
        topic: 'achieve',
        intro: 'I can achieve great success with hard work. Ask me if I can achieve my goals.',
        acceptedQuestions: [
          'Can you achieve your goals?',
          'Can you achieve success?',
          'What can you achieve?'
        ],
        answer: 'Yes, I can achieve great success with hard work.',
        question_hints: ['Can you achieve your goals?', 'Can you achieve success?', 'What can you achieve?'],
        required_question_words: ['can'],
        required_keywords: ['you', 'achieve'],
        hints: {
          words: ['can', 'you', 'achieve', 'goals'],
          tricky: ['where', 'who']
        }
      },
      {
        id: 'w12_mini_talents_adv',
        task_type: 'mini_interview',
        topic: 'talents',
        intro: 'Interview me: ask what special talent I have, then ask if I can showcase it.',
        steps: [
          {
            prompt: 'Ask what special talent I have.',
            required_question_words: ['what'],
            required_keywords: ['talent'],
            question_hints: ['What special talent do you have?', 'What is your talent?', 'What can you do?']
          },
          {
            prompt: 'Ask if I can showcase it.',
            acceptedQuestions: [
              'Can you showcase it?',
              'Can you showcase your talent?',
              'Can you perform?'
            ],
            required_question_words: ['can'],
            required_keywords: ['you', 'showcase'],
            question_hints: ['Can you showcase it?', 'Can you showcase your talent?', 'Can you perform?']
          }
        ],
        hints: {
          words: ['what', 'talent', 'do', 'you', 'have', 'can', 'showcase'],
          tricky: ['where', 'who']
        }
      }
    ],
    required_question_words_easy: ['what', 'can'],
    required_question_words_advanced: ['what', 'can']
  }
};

export default week12GamesAdvanced;
