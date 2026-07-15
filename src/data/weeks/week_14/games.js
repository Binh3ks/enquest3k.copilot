/**
 * Week 14 Game Data - Advanced Mode (New GameHub)
 * Theme: My World - Presentation & Self-Introduction
 */

export const week14GamesAdvanced = {
  vocabulary: [
    'present', 'poster', 'introduce', 'family', 'talented',
    'confident', 'proud', 'describe', 'audience', 'project'
  ],
  show_tell: {
    steps: 3,
    word_list: [
      'present', 'poster', 'introduce', 'family', 'talented',
      'confident', 'proud', 'describe', 'audience', 'project'
    ],
    instructions_easy: 'Say the word, add a phrase, then make a full sentence.',
    instructions_advanced: 'Say the word, add a phrase, then make a full sentence.',
    step_instructions: {
      1: 'Step 1: say the word clearly.',
      2: 'Step 2: add a short phrase with the word.',
      3: 'Step 3: make a full sentence.'
    },
    frames_easy: ['I ___ my poster', 'I ___ my family'],
    frames_advanced: ['I ___ to the audience', 'I feel ___ when I present'],
    details_easy: [],
    details_advanced: [],
    detail_map: {
      'present': ['present', 'present my poster', 'I present my poster', 'I present my poster to the class today'],
      'poster': ['poster', 'my poster', 'my colorful poster', 'My poster has pictures of my family and talents'],
      'introduce': ['introduce', 'introduce myself', 'I introduce myself', 'I introduce myself to the audience with confidence'],
      'family': ['family', 'my family', 'I love my family', 'My family has four people mom dad sister and me'],
      'talented': ['talented', 'very talented', 'I am talented', 'I am talented at singing and drawing pictures'],
      'confident': ['confident', 'feel confident', 'I feel confident', 'I feel confident when I present to the audience'],
      'proud': ['proud', 'so proud', 'I am proud', 'I am proud of my poster and my hard work'],
      'describe': ['describe', 'describe my family', 'I describe my family', 'I describe my family and tell about their jobs'],
      'audience': ['audience', 'the audience', 'the audience listens', 'The audience listens carefully and asks good questions'],
      'project': ['project', 'my project', 'my special project', 'My project is about my world and what I love']
    },
    distractors_easy: [],
    distractors_advanced: [],
    emoji_map: {
      'present': '🎤',
      'poster': '📊',
      'introduce': '👋',
      'family': '👨‍👩‍👧‍👦',
      'talented': '⭐',
      'confident': '💪',
      'proud': '🏆',
      'describe': '💬',
      'audience': '👥',
      'project': '📋'
    }
  },
  make_sentence: {
    instructions_easy: 'Unscramble the words to make a sentence.',
    instructions_advanced: 'Unscramble the words to make a sentence.',
    sentences_easy: [
      { scrambled: ['I', 'present', 'my', 'poster'], answer: 'I present my poster.' },
      { scrambled: ['My', 'name', 'is', 'Emma'], answer: 'My name is Emma.' },
      { scrambled: ['I', 'am', '8', 'years', 'old'], answer: 'I am 8 years old.' },
      { scrambled: ['My', 'family', 'has', '4', 'people'], answer: 'My family has 4 people.' },
      { scrambled: ['I', 'can', 'sing'], answer: 'I can sing.' },
      { scrambled: ['I', 'can', 'dance'], answer: 'I can dance.' },
      { scrambled: ['I', 'can', 'draw'], answer: 'I can draw.' },
      { scrambled: ['I', 'feel', 'confident'], answer: 'I feel confident.' },
      { scrambled: ['I', 'am', 'proud'], answer: 'I am proud.' },
      { scrambled: ['Thank', 'you', 'for', 'listening'], answer: 'Thank you for listening.' }
    ],
    sentences_advanced: [
      { scrambled: ['I', 'present', 'my', 'poster', 'today'], answer: 'I present my poster today.', base_words: ['i', 'present', 'my', 'poster', 'today'], time_phrases: ['today', 'now', 'this morning', 'right now', 'at this moment'], location_phrases: ['to the class', 'in front of everyone', 'at school', 'in the classroom', 'to my friends'] },
      { scrambled: ['My', 'name', 'is', 'Emma', 'and', 'I', 'am', '8', 'years', 'old'], answer: 'My name is Emma and I am 8 years old.', base_words: ['my', 'name', 'is', 'emma', 'and', 'i', 'am', '8', 'years', 'old'], time_phrases: ['now', 'today', 'this year', 'currently', 'at present'], location_phrases: ['in this class', 'at this school', 'here', 'in my presentation', 'to you'] },
      { scrambled: ['I', 'want', 'to', 'share', 'my', 'world', 'with', 'you'], answer: 'I want to share my world with you.', base_words: ['i', 'want', 'to', 'share', 'my', 'world', 'with', 'you'], time_phrases: ['today', 'now', 'right now', 'this morning', 'at this time'], location_phrases: ['here', 'with everyone', 'to the class', 'in my presentation', 'through my poster'] },
      { scrambled: ['My', 'family', 'has', '4', 'people'], answer: 'My family has 4 people.', base_words: ['my', 'family', 'has', '4', 'people'], time_phrases: ['always', 'now', 'currently', 'at home', 'together'], location_phrases: ['at home', 'together', 'in our house', 'as a family', 'in my life'] },
      { scrambled: ['I', 'can', 'sing', 'very', 'well'], answer: 'I can sing very well.', base_words: ['i', 'can', 'sing', 'very', 'well'], time_phrases: ['always', 'every day', 'at any time', 'when I practice', 'now'], location_phrases: ['at home', 'at school', 'on stage', 'anywhere', 'for my family'] },
      { scrambled: ['I', 'can', 'also', 'dance', 'when', 'I\'m', 'happy'], answer: 'I can also dance when I\'m happy.', base_words: ['i', 'can', 'also', 'dance', 'when', 'i\'m', 'happy'], time_phrases: ['when I\'m happy', 'every day', 'sometimes', 'often', 'after singing'], location_phrases: ['at home', 'with my family', 'in my room', 'anywhere', 'to music'] },
      { scrambled: ['I', 'am', 'good', 'at', 'drawing', 'too'], answer: 'I am good at drawing too.', base_words: ['i', 'am', 'good', 'at', 'drawing', 'too'], time_phrases: ['always', 'every day', 'in my free time', 'after school', 'on weekends'], location_phrases: ['at home', 'at school', 'in art class', 'at my desk', 'with my friends'] },
      { scrambled: ['I', 'feel', 'very', 'confident', 'today'], answer: 'I feel very confident today.', base_words: ['i', 'feel', 'very', 'confident', 'today'], time_phrases: ['today', 'now', 'right now', 'this morning', 'always'], location_phrases: ['here', 'on stage', 'in front of you', 'during my presentation', 'at school'] },
      { scrambled: ['The', 'audience', 'listens', 'to', 'me'], answer: 'The audience listens to me.', base_words: ['the', 'audience', 'listens', 'to', 'me'], time_phrases: ['now', 'right now', 'during my presentation', 'today', 'at this moment'], location_phrases: ['here', 'in the classroom', 'carefully', 'with attention', 'quietly'] },
      { scrambled: ['I', 'am', 'proud', 'of', 'my', 'work'], answer: 'I am proud of my work.', base_words: ['i', 'am', 'proud', 'of', 'my', 'work'], time_phrases: ['always', 'now', 'today', 'after finishing', 'every day'], location_phrases: ['here', 'at school', 'with my poster', 'in my presentation', 'to everyone'] }
    ]
  },
  ask_me: {
    instructions_easy: 'Ask a question that matches the context.',
    instructions_advanced: 'Ask a question that matches the context.',
    contexts_easy: [
      {
        id: 'w14_name_what',
        task_type: 'find_question',
        topic: 'name',
        intro: 'My name is Emma. Ask me what my name is.',
        acceptedQuestions: ['What is your name?', 'What\'s your name?', 'Your name?'],
        answer: 'My name is Emma.',
        question_hints: ['What is your name?', 'What\'s your name?'],
        required_question_words: ['what'],
        required_keywords: ['name'],
        hints: { words: ['what', 'is', 'your', 'name'], tricky: ['where', 'who'] }
      },
      {
        id: 'w14_family_how_many',
        task_type: 'find_question',
        topic: 'family',
        intro: 'I have 4 people in my family. Ask me how many people.',
        acceptedQuestions: ['How many people in your family?', 'How many people?', 'How many?'],
        answer: 'I have 4 people in my family.',
        question_hints: ['How many people in your family?', 'How many people?'],
        required_question_words: ['how'],
        required_keywords: ['many', 'family'],
        hints: { words: ['how', 'many', 'people', 'family'], tricky: ['what', 'who'] }
      },
      {
        id: 'w14_can_what',
        task_type: 'find_question',
        topic: 'abilities',
        intro: 'I can sing and dance. Ask me what I can do.',
        acceptedQuestions: ['What can you do?', 'What can you sing?', 'Can you sing?'],
        answer: 'I can sing and dance.',
        question_hints: ['What can you do?', 'Can you sing?'],
        required_question_words: ['what', 'can'],
        required_keywords: ['can', 'you'],
        hints: { words: ['what', 'can', 'you', 'do'], tricky: ['where', 'who'] }
      },
      {
        id: 'w14_draw_can',
        task_type: 'find_question',
        topic: 'drawing',
        intro: 'I am good at drawing. Ask me if I can draw.',
        acceptedQuestions: ['Can you draw?', 'Do you draw?', 'Are you good at drawing?'],
        answer: 'Yes, I am good at drawing.',
        question_hints: ['Can you draw?', 'Are you good at drawing?'],
        required_question_words: ['can', 'do', 'are'],
        required_keywords: ['draw'],
        hints: { words: ['can', 'you', 'draw', 'do'], tricky: ['what', 'where'] }
      },
      {
        id: 'w14_feel_how',
        task_type: 'find_question',
        topic: 'feelings',
        intro: 'I feel confident today. Ask me how I feel.',
        acceptedQuestions: ['How do you feel?', 'How are you?', 'Do you feel confident?'],
        answer: 'I feel confident.',
        question_hints: ['How do you feel?', 'Do you feel confident?'],
        required_question_words: ['how', 'do'],
        required_keywords: ['feel'],
        hints: { words: ['how', 'do', 'you', 'feel'], tricky: ['what', 'where'] }
      },
      {
        id: 'w14_mini_present',
        task_type: 'mini_interview',
        topic: 'presentation',
        intro: 'Interview me: ask what my name is, then ask what I can do.',
        steps: [
          {
            prompt: 'Ask what my name is.',
            required_question_words: ['what'],
            required_keywords: ['name'],
            question_hints: ['What is your name?', 'What\'s your name?']
          },
          {
            prompt: 'Ask what I can do.',
            acceptedQuestions: ['What can you do?', 'Can you sing?', 'What do you do?'],
            required_question_words: ['what', 'can'],
            required_keywords: ['can', 'do'],
            question_hints: ['What can you do?', 'Can you sing?']
          }
        ],
        hints: { words: ['what', 'is', 'your', 'name', 'can', 'you', 'do'], tricky: ['where', 'who'] }
      }
    ],
    contexts_advanced: [
      {
        id: 'w14_present_what_adv',
        task_type: 'find_question',
        topic: 'presentation',
        intro: 'I present my poster to share my world with you. Ask me what I present.',
        acceptedQuestions: ['What do you present?', 'What are you presenting?', 'What is your presentation about?'],
        answer: 'I present my poster about my world.',
        question_hints: ['What do you present?', 'What are you presenting?'],
        required_question_words: ['what'],
        required_keywords: ['present'],
        hints: { words: ['what', 'do', 'you', 'present', 'poster'], tricky: ['where', 'who'] }
      },
      {
        id: 'w14_family_size_adv',
        task_type: 'find_question',
        topic: 'family',
        intro: 'My family has 4 people: my mom, my dad, my sister, and me. Ask me how many people are in my family.',
        acceptedQuestions: ['How many people are in your family?', 'How many people in your family?', 'How big is your family?'],
        answer: 'My family has 4 people.',
        question_hints: ['How many people are in your family?', 'How many people in your family?'],
        required_question_words: ['how'],
        required_keywords: ['many', 'family'],
        hints: { words: ['how', 'many', 'people', 'are', 'in', 'your', 'family'], tricky: ['what', 'who'] }
      },
      {
        id: 'w14_talents_adv',
        task_type: 'find_question',
        topic: 'talents',
        intro: 'I can sing very well, and I can also dance when I\'m happy. Ask me about my talents.',
        acceptedQuestions: ['What are your talents?', 'What can you do?', 'Can you sing?'],
        answer: 'I can sing and dance very well.',
        question_hints: ['What are your talents?', 'What can you do?'],
        required_question_words: ['what', 'can'],
        required_keywords: ['talents', 'can', 'you'],
        hints: { words: ['what', 'are', 'your', 'talents', 'can', 'you', 'do'], tricky: ['where', 'who'] }
      },
      {
        id: 'w14_drawing_adv',
        task_type: 'find_question',
        topic: 'drawing',
        intro: 'I am good at drawing, so I made beautiful pictures of animals and flowers. Ask me if I can draw.',
        acceptedQuestions: ['Can you draw?', 'Are you good at drawing?', 'What do you draw?'],
        answer: 'Yes, I am good at drawing animals and flowers.',
        question_hints: ['Can you draw?', 'Are you good at drawing?'],
        required_question_words: ['can', 'are'],
        required_keywords: ['draw'],
        hints: { words: ['can', 'you', 'draw', 'are', 'good', 'at'], tricky: ['where', 'who'] }
      },
      {
        id: 'w14_confident_adv',
        task_type: 'find_question',
        topic: 'feelings',
        intro: 'When I stand here, I feel very confident. Ask me how I feel.',
        acceptedQuestions: ['How do you feel?', 'Do you feel confident?', 'Are you confident?'],
        answer: 'I feel very confident.',
        question_hints: ['How do you feel?', 'Do you feel confident?'],
        required_question_words: ['how', 'do'],
        required_keywords: ['feel'],
        hints: { words: ['how', 'do', 'you', 'feel', 'confident'], tricky: ['what', 'where'] }
      },
      {
        id: 'w14_audience_adv',
        task_type: 'find_question',
        topic: 'audience',
        intro: 'The audience listens to me, and this makes me happy. Ask me who listens to me.',
        acceptedQuestions: ['Who listens to you?', 'Who is listening?', 'Who is the audience?'],
        answer: 'The audience listens to me.',
        question_hints: ['Who listens to you?', 'Who is listening?'],
        required_question_words: ['who'],
        required_keywords: ['listen'],
        hints: { words: ['who', 'listens', 'to', 'you', 'audience'], tricky: ['what', 'where'] }
      },
      {
        id: 'w14_proud_adv',
        task_type: 'find_question',
        topic: 'proud',
        intro: 'I am proud of my poster because I worked very hard on it. Ask me if I am proud.',
        acceptedQuestions: ['Are you proud?', 'Are you proud of your work?', 'Do you feel proud?'],
        answer: 'Yes, I am proud of my work.',
        question_hints: ['Are you proud?', 'Are you proud of your work?'],
        required_question_words: ['are', 'do'],
        required_keywords: ['proud'],
        hints: { words: ['are', 'you', 'proud', 'do', 'feel'], tricky: ['what', 'where'] }
      },
      {
        id: 'w14_describe_adv',
        task_type: 'find_question',
        topic: 'describe family',
        intro: 'I describe my family to everyone because I love them so much. Ask me what I describe.',
        acceptedQuestions: ['What do you describe?', 'What are you describing?', 'What do you tell about?'],
        answer: 'I describe my family to everyone.',
        question_hints: ['What do you describe?', 'What are you describing?'],
        required_question_words: ['what'],
        required_keywords: ['describe'],
        hints: { words: ['what', 'do', 'you', 'describe', 'family'], tricky: ['where', 'who'] }
      },
      {
        id: 'w14_mini_presentation',
        task_type: 'mini_interview',
        topic: 'presentation',
        intro: 'Interview me about my presentation: ask what I present, then ask how I feel.',
        steps: [
          {
            prompt: 'Ask what I present.',
            required_question_words: ['what'],
            required_keywords: ['present'],
            question_hints: ['What do you present?', 'What are you presenting?']
          },
          {
            prompt: 'Ask how I feel.',
            acceptedQuestions: ['How do you feel?', 'Do you feel confident?', 'Are you happy?'],
            required_question_words: ['how', 'do'],
            required_keywords: ['feel'],
            question_hints: ['How do you feel?', 'Do you feel confident?']
          }
        ],
        hints: { words: ['what', 'do', 'you', 'present', 'how', 'feel'], tricky: ['where', 'who'] }
      }
    ],
    required_question_words_easy: ['what', 'how', 'can'],
    required_question_words_advanced: ['what', 'how', 'can', 'who', 'are']
  }
};

export default week14GamesAdvanced;
