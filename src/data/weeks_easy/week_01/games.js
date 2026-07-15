/**
 * Week 1 Game Data - Easy Mode (New GameHub)
 */

export const week1GamesEasy = {
  vocabulary: [
    'name', 'friend', 'desk', 'chair', 'pen',
    'bag', 'toy', 'picture', 'box', 'door',
    'big', 'small', 'red', 'happy', 'look'
  ],
  show_tell: {
    steps: 3,
    word_list: [
      'name', 'friend', 'desk', 'chair', 'pen',
      'bag', 'toy', 'picture', 'box', 'door',
      'big', 'small', 'red', 'happy', 'look'
    ],
    instructions_easy: 'Say the word, add a phrase, then make a full sentence.',
    instructions_advanced: 'Say the word, add a phrase, then make a full sentence.',
    step_instructions: {
      1: 'Step 1: say the word clearly.',
      2: 'Step 2: add a short phrase with the word.',
      3: 'Step 3: make a full sentence.',
      4: 'Step 4: add a second sentence about the same topic.',
      5: 'Step 5: tell a mini story using "because" or "so".'
    },
    frames_easy: ['I am ___', 'This is ___'],
    frames_advanced: ['I am a ___', 'This is a ___'],
    details_easy: [],
    details_advanced: [],
    detail_map: {
      name: ['my name', 'his name', 'her name', 'a nice name'],
      friend: ['my friend', 'his friend', 'her friend', 'a good friend'],
      desk: ['my desk', 'a big desk', 'the desk', 'your desk'],
      chair: ['my chair', 'a small chair', 'the chair', 'your chair'],
      pen: ['my pen', 'a red pen', 'the pen', 'your pen'],
      bag: ['my bag', 'a big bag', 'the bag', 'your bag'],
      toy: ['my toy', 'a small toy', 'the toy', 'your toy'],
      picture: ['my picture', 'a red picture', 'the picture', 'your picture'],
      box: ['my box', 'a big box', 'the box', 'your box'],
      door: ['my door', 'a red door', 'the door', 'your door'],
      big: ['very big', 'so big', 'big and red', 'big and small'],
      small: ['very small', 'so small', 'small and red', 'small and big'],
      red: ['very red', 'so red', 'red and big', 'red and small'],
      happy: ['very happy', 'so happy', 'happy today', 'happy now'],
      look: ['look at me', 'look here', 'look at it', 'look now']
    },
    distractors_easy: [],
    distractors_advanced: [],
    distractor_map: {
      name: ['my desk', 'a red pen', 'the door'],
      friend: ['my box', 'a red pen', 'the door'],
      desk: ['my friend', 'a happy toy', 'the door']
    },
    frame_map: {
      name: ['My name is ___'],
      friend: ['He is my friend', 'She is my friend']
    },
    sentence_hints_map: {
      name: ['My name is Tom.', 'His name is Ben.', 'Her name is Mia.'],
      friend: ['He is my friend.', 'She is my friend.', 'This is my friend.'],
      desk: ['This is my desk.', 'My desk is big.', 'The desk is red.'],
      chair: ['This is my chair.', 'My chair is small.', 'The chair is red.'],
      pen: ['This is my pen.', 'My pen is red.', 'The pen is small.'],
      bag: ['This is my bag.', 'My bag is big.', 'The bag is red.'],
      toy: ['This is my toy.', 'My toy is small.', 'The toy is red.'],
      picture: ['This is my picture.', 'My picture is big.', 'The picture is red.'],
      box: ['This is my box.', 'My box is big.', 'The box is red.'],
      door: ['This is my door.', 'The door is big.', 'The door is red.'],
      big: ['My bag is big.', 'The box is big.', 'The desk is big.'],
      small: ['My pen is small.', 'The toy is small.', 'The chair is small.'],
      red: ['My pen is red.', 'The door is red.', 'The box is red.'],
      happy: ['I am happy.', 'I am very happy.', 'I am happy today.'],
      look: ['I look happy.', 'I look at it.', 'I look at the door.']
    },
    emoji_map: {
      friend: '👫',
      chair: '💺',
      pen: '🖊️',
      bag: '👜',
      toy: '🧸',
      picture: '🖼️',
      box: '📦',
      door: '🚪',
      big: '📏',
      small: '🔬',
      red: '🔴',
      happy: '😊',
      look: '👀'
    },
    definitions: {
      name: 'What people call you.',
      desk: 'A table you use for studying or working.'
    }
  },
  make_sentence: {
    instructions_easy: 'Unscramble the words to make a correct sentence.',
    instructions_advanced: 'Unscramble the words to make a correct sentence.',
    sentences_easy: [
      { 
        scrambled: ['am', 'I', 'happy'], 
        answer: 'I am happy.',
        base_words: ['I', 'am', 'happy'],
        time_phrases: ['today', 'now', 'right now', 'every day', 'always'],
        location_phrases: ['at school', 'at home', 'in class', 'here', 'in the classroom']
      },
      { 
        scrambled: ['is', 'This', 'my', 'friend'], 
        answer: 'This is my friend.',
        base_words: ['This', 'is', 'my', 'friend'],
        time_phrases: ['today', 'now', 'right now'],
        location_phrases: ['at school', 'here', 'in class', 'in the classroom']
      },
      { 
        scrambled: ['is', 'my', 'This', 'desk'], 
        answer: 'This is my desk.',
        base_words: ['This', 'is', 'my', 'desk'],
        time_phrases: ['now', 'today'],
        location_phrases: ['at school', 'in the classroom', 'here', 'in my room']
      },
      { 
        scrambled: ['am', 'I', 'big'], 
        answer: 'I am big.',
        base_words: ['I', 'am', 'big'],
        time_phrases: ['now', 'today', 'this year'],
        location_phrases: ['at school', 'at home', 'here']
      },
      { 
        scrambled: ['is', 'This', 'my', 'chair'], 
        answer: 'This is my chair.',
        base_words: ['This', 'is', 'my', 'chair'],
        time_phrases: ['now', 'today'],
        location_phrases: ['at school', 'in the classroom', 'at home', 'in my room']
      },
      { 
        scrambled: ['am', 'I', 'small'], 
        answer: 'I am small.',
        base_words: ['I', 'am', 'small'],
        time_phrases: ['now', 'today'],
        location_phrases: ['at school', 'at home', 'here']
      },
      { 
        scrambled: ['is', 'This', 'my', 'pen'], 
        answer: 'This is my pen.',
        base_words: ['This', 'is', 'my', 'pen'],
        time_phrases: ['now', 'today'],
        location_phrases: ['on my desk', 'at school', 'here', 'in my bag']
      },
      { 
        scrambled: ['is', 'This', 'my', 'bag'], 
        answer: 'This is my bag.',
        base_words: ['This', 'is', 'my', 'bag'],
        time_phrases: ['now', 'today'],
        location_phrases: ['at school', 'here', 'in the classroom', 'at home']
      },
      { 
        scrambled: ['is', 'This', 'my', 'toy'], 
        answer: 'This is my toy.',
        base_words: ['This', 'is', 'my', 'toy'],
        time_phrases: ['now', 'today'],
        location_phrases: ['at home', 'in my room', 'here', 'on the floor']
      },
      { 
        scrambled: ['is', 'This', 'my', 'box'], 
        answer: 'This is my box.',
        base_words: ['This', 'is', 'my', 'box'],
        time_phrases: ['now', 'today'],
        location_phrases: ['at home', 'in my room', 'here', 'on the shelf']
      }
    ],
    sentences_advanced: [
      { 
        scrambled: ['am', 'I', 'happy'], 
        answer: 'I am happy.',
        base_words: ['I', 'am', 'happy'],
        time_phrases: ['today', 'now', 'right now', 'every day', 'always'],
        location_phrases: ['at school', 'at home', 'in class', 'here']
      },
      { 
        scrambled: ['is', 'This', 'my', 'picture'], 
        answer: 'This is my picture.',
        base_words: ['This', 'is', 'my', 'picture'],
        time_phrases: ['now', 'today'],
        location_phrases: ['on the wall', 'at home', 'in my room', 'here']
      },
      { 
        scrambled: ['am', 'I', 'big'], 
        answer: 'I am big.',
        base_words: ['I', 'am', 'big'],
        time_phrases: ['now', 'today', 'this year'],
        location_phrases: ['at school', 'at home', 'here']
      },
      { 
        scrambled: ['is', 'This', 'my', 'toy'], 
        answer: 'This is my toy.',
        base_words: ['This', 'is', 'my', 'toy'],
        time_phrases: ['now', 'today'],
        location_phrases: ['at home', 'in my room', 'here', 'on the floor']
      },
      { 
        scrambled: ['am', 'I', 'small'], 
        answer: 'I am small.',
        base_words: ['I', 'am', 'small'],
        time_phrases: ['now', 'today'],
        location_phrases: ['at school', 'at home', 'here']
      },
      { 
        scrambled: ['is', 'This', 'my', 'box'], 
        answer: 'This is my box.',
        base_words: ['This', 'is', 'my', 'box'],
        time_phrases: ['now', 'today'],
        location_phrases: ['at home', 'in my room', 'here', 'on the shelf']
      },
      { 
        scrambled: ['is', 'This', 'my', 'door'], 
        answer: 'This is my door.',
        base_words: ['This', 'is', 'my', 'door'],
        time_phrases: ['now', 'today'],
        location_phrases: ['at home', 'in my room', 'here', 'in my house']
      },
      { 
        scrambled: ['is', 'my', 'friend', 'This'], 
        answer: 'This is my friend.',
        base_words: ['This', 'is', 'my', 'friend'],
        time_phrases: ['today', 'now'],
        location_phrases: ['at school', 'here', 'in class', 'in the playground']
      },
      { 
        scrambled: ['am', 'happy', 'I'], 
        answer: 'I am happy.',
        base_words: ['I', 'am', 'happy'],
        time_phrases: ['today', 'now', 'every day', 'always'],
        location_phrases: ['at school', 'at home', 'here', 'everywhere']
      },
      { 
        scrambled: ['is', 'my', 'desk', 'This'], 
        answer: 'This is my desk.',
        base_words: ['This', 'is', 'my', 'desk'],
        time_phrases: ['now', 'today'],
        location_phrases: ['at school', 'in the classroom', 'here', 'in my room']
      }
    ]
  },
  ask_me: {
    instructions_easy: 'Ask a question that matches the context.',
    instructions_advanced: 'Ask a question that matches the context.',
    contexts_easy: [
      {
        id: 'w1_desk_what',
        task_type: 'find_question',
        topic: 'desk',
        intro: 'This is a desk. Ask me what it is.',
        answer: 'This is a desk.',
        acceptedQuestions: [
          'What is this?',
          'What is that?',
          'What is it?'
        ],
        question_hints: ['What is this?', 'What is that?', 'What is it?'],
        required_question_words: ['what'],
        required_keywords: ['this', 'that', 'it'],
        hints: {
          words: ['what', 'is', 'this'],
          tricky: ['who', 'where']
        }
      },
      {
        id: 'w1_friend_what',
        task_type: 'find_question',
        topic: 'friend',
        intro: 'Look! This is my friend. Ask me what you see.',
        answer: 'This is your friend.',
        acceptedQuestions: [
          'What is this?',
          'What is that?',
          'What do I see?'
        ],
        question_hints: ['What is this?', 'What is that?', 'What do I see?'],
        required_question_words: ['what'],
        required_keywords: ['this', 'that', 'see'],
        hints: {
          words: ['what', 'is', 'this'],
          tricky: ['who', 'where']
        }
      },
      {
        id: 'w1_happy_areyou',
        task_type: 'find_question',
        topic: 'happy',
        intro: 'I am happy today. Ask me if I am happy.',
        answer: 'Yes, I am happy.',
        acceptedQuestions: [
          'Are you happy?',
          'Are you sad?',
          'Are you okay?'
        ],
        question_hints: ['Are you happy?', 'Are you sad?', 'Are you okay?'],
        required_question_words: ['are'],
        required_keywords: ['you'],
        hints: {
          words: ['are', 'you', 'happy'],
          tricky: ['how', 'what']
        }
      },
      {
        id: 'w1_bag_isthis',
        task_type: 'find_question',
        topic: 'bag',
        intro: 'This is my bag. Ask me if this is my bag.',
        answer: 'Yes, this is my bag.',
        acceptedQuestions: [
          'Is this your bag?',
          'Is that your bag?',
          'Is this a bag?'
        ],
        question_hints: ['Is this your bag?', 'Is that your bag?', 'Is this a bag?'],
        required_question_words: ['is'],
        required_keywords: ['this', 'that', 'bag'],
        hints: {
          words: ['is', 'this', 'bag'],
          tricky: ['what', 'whose']
        }
      },
      {
        id: 'w1_pen_what',
        task_type: 'find_question',
        topic: 'pen',
        intro: 'I have a pen. Ask me what I have.',
        answer: 'This is a pen.',
        acceptedQuestions: [
          'What is this?',
          'What do you have?',
          'What is that?'
        ],
        question_hints: ['What is this?', 'What do you have?', 'What is that?'],
        required_question_words: ['what'],
        required_keywords: ['this', 'have', 'that'],
        hints: {
          words: ['what', 'is', 'have'],
          tricky: ['who', 'where']
        }
      },
      {
        id: 'w1_toy_isthis',
        task_type: 'find_question',
        topic: 'toy',
        intro: 'Look, this is a toy. Ask me if this is a toy.',
        answer: 'Yes, this is a toy.',
        acceptedQuestions: [
          'Is this a toy?',
          'Is that a toy?',
          'Is this your toy?'
        ],
        question_hints: ['Is this a toy?', 'Is that a toy?', 'Is this your toy?'],
        required_question_words: ['is'],
        required_keywords: ['this', 'that', 'toy'],
        hints: {
          words: ['is', 'this', 'toy'],
          tricky: ['what', 'do']
        }
      },
      {
        id: 'w1_big_areyou',
        task_type: 'find_question',
        topic: 'big',
        intro: 'I am big. Ask me if I am big.',
        answer: 'Yes, I am big.',
        acceptedQuestions: [
          'Are you big?',
          'Are you small?',
          'Are you tall?'
        ],
        question_hints: ['Are you big?', 'Are you small?', 'Are you tall?'],
        required_question_words: ['are'],
        required_keywords: ['you', 'big'],
        hints: {
          words: ['are', 'you', 'big'],
          tricky: ['what', 'how']
        }
      },
      {
        id: 'w1_picture_what',
        task_type: 'find_question',
        topic: 'picture',
        intro: 'This is a picture. Ask me what it is.',
        answer: 'This is a picture.',
        acceptedQuestions: [
          'What is this?',
          'What is that?',
          'What is it?'
        ],
        question_hints: ['What is this?', 'What is that?', 'What is it?'],
        required_question_words: ['what'],
        required_keywords: ['this', 'that', 'it'],
        hints: {
          words: ['what', 'is', 'this'],
          tricky: ['who', 'where']
        }
      },
      {
        id: 'w1_mini_intro',
        task_type: 'mini_interview',
        topic: 'identity',
        intro: 'Interview me: ask about my name, then my age.',
        steps: [
          {
            prompt: 'Ask about my name.',
            acceptedQuestions: [
              'What is your name?',
              'What is his name?',
              'What is her name?'
            ],
            required_question_words: ['what'],
            required_keywords: ['name'],
            question_hints: ['What is your name?', 'What is his name?', 'What is her name?']
          },
          {
            prompt: 'Ask about my age.',
            acceptedQuestions: [
              'How old are you?',
              'How old is he?',
              'How old is she?'
            ],
            required_question_words: ['how'],
            required_keywords: ['old'],
            question_hints: ['How old are you?', 'How old is he?', 'How old is she?']
          }
        ],
        hints: {
          words: ['what', 'how', 'name', 'old'],
          tricky: ['where', 'when']
        }
      }
    ],
    contexts_advanced: [
      {
        id: 'w1_school_find',
        task_type: 'find_question',
        topic: 'school',
        intro: 'I am at school. Ask me where I am.',
        answer: 'I am at school.',
        acceptedQuestions: [
          'Where are you?',
          'Where is he?',
          'Where is she?'
        ],
        answer_hints: ['I am at school.', 'He is at school.', 'She is at school.'],
        required_question_words: ['where'],
        required_keywords: ['school'],
        hints: {
          words: ['where', 'school', 'you'],
          tricky: ['who', 'what']
        }
      },
      {
        id: 'w1_mini_role',
        task_type: 'mini_interview',
        topic: 'student',
        intro: 'Interview me: ask who I am, then what I have.',
        steps: [
          {
            prompt: 'Ask who I am.',
            acceptedQuestions: [
              'Who are you?',
              'Who is he?',
              'Who is she?'
            ],
            required_question_words: ['who'],
            required_keywords: ['you']
          },
          {
            prompt: 'Ask what I have.',
            acceptedQuestions: [
              'What do you have?',
              'What does he have?',
              'What does she have?'
            ],
            required_question_words: ['what'],
            required_keywords: ['have']
          }
        ],
        hints: {
          words: ['who', 'what', 'you', 'have'],
          tricky: ['where', 'when']
        }
      }
    ],
    required_question_words_easy: ['what', 'is'],
    required_question_words_advanced: ['what', 'is', 'are']
  }
};

export default week1GamesEasy;
