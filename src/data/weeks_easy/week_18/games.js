/**
 * Week 18 Game Data - Easy Mode (GameHub)
 * Theme: The Live Reporter — Present Continuous
 * Tier 1 Vocabulary — Simple, Home Context
 */

export const week18GamesEasy = {
  vocabulary: [
    'reporter', 'camera', 'microphone', 'news', 'live',
    'describe', 'scene', 'studio', 'report', 'exciting',
    'happening', 'audience', 'interview'
  ],
  show_tell: {
    steps: 3,
    word_list: [
      'reporter', 'camera', 'microphone', 'news', 'live',
      'describe', 'scene', 'studio', 'report', 'exciting',
      'happening', 'audience', 'interview'
    ],
    instructions_easy: 'Say the word, add a phrase, then make a full sentence.',
    instructions_advanced: 'Say the word, add a phrase, then make a full sentence.',
    step_instructions: {
      1: 'Step 1: say the word clearly.',
      2: 'Step 2: add a short phrase with the word.',
      3: 'Step 3: make a full sentence.'
    },
    frames_easy: ['Alex is a ___', 'I am ___ the scene'],
    frames_advanced: ['The reporter is ___ the scene', 'The audience is ___ the news'],
    details_easy: [],
    details_advanced: [],
    detail_map: {
      'reporter': ['reporter', 'a reporter', 'Alex is a reporter', 'Alex is a reporter who describes what is happening at home'],
      'camera': ['camera', 'a camera', 'holding a camera', 'Alex is holding a toy camera and filming the scene at home'],
      'microphone': ['microphone', 'a microphone', 'into the microphone', 'He speaks into the microphone so everyone can hear his news report'],
      'news': ['news', 'the news', 'on the news', 'Alex watches the news every morning before he goes to school'],
      'live': ['live', 'live news', 'going live', 'Alex says: This is live news from my home right now!'],
      'describe': ['describe', 'describing', 'I am describing', 'I am describing the scene — my cat is sleeping on the sofa'],
      'scene': ['scene', 'the scene', 'the home scene', 'Alex describes the home scene — mum is cooking and the cat is sleeping'],
      'studio': ['studio', 'a studio', 'like a studio', 'Alex turns his living room into a studio for his home news show'],
      'report': ['report', 'a report', 'giving a report', 'Alex gives a report about everything that is happening at home today'],
      'exciting': ['exciting', 'so exciting', 'really exciting', 'Alex thinks being a reporter is really exciting and fun'],
      'happening': ['happening', 'what is happening', 'what is happening here', 'Alex describes what is happening — the cat is sleeping, mum is cooking'],
      'audience': ['audience', 'the audience', 'for the audience', 'Mum and his brother are the audience watching Alex do his news report'],
      'interview': ['interview', 'an interview', 'doing an interview', 'Alex does an interview with his cat, but the cat does not answer!']
    },
    distractor_map: {
      'reporter': ['long hair', 'blue shoes', 'big smile'],
      'camera': ['old book', 'red pen', 'green bag'],
      'microphone': ['yellow chair', 'big clock', 'white eraser']
    },
    frame_map: {
      'reporter': ['Alex is a reporter.'],
      'camera': ['He is holding a camera.'],
      'microphone': ['She is using a microphone.']
    },
    sentence_hints_map: {
      'reporter': ['Alex is a reporter.', 'She is a reporter.', 'I want to be a reporter.'],
      'camera': ['He is holding a camera.', 'The camera is ready.', 'I have a toy camera.'],
      'microphone': ['She has a microphone.', 'I am holding a microphone.', 'Speak into the microphone.'],
      'news': ['I watch the news.', 'The news is on TV.', 'She reads the news.'],
      'live': ['This is live news.', 'It is live right now.', 'We are going live!'],
      'describe': ['I describe the scene.', 'She is describing the cat.', 'Can you describe it?'],
      'scene': ['What a busy scene!', 'He films the scene.', 'The scene is at home.'],
      'studio': ['This is my studio.', 'The studio is ready.', 'She works in a studio.'],
      'report': ['He gives a report.', 'It is a live report.', 'My report is funny!'],
      'exciting': ['It is so exciting!', 'The news is exciting.', 'Being a reporter is exciting.'],
      'happening': ['What is happening?', 'See what is happening.', 'It is happening now.'],
      'audience': ['The audience is watching.', 'Mum is the audience.', 'They are the audience.'],
      'interview': ['I interview the cat.', 'She is doing an interview.', 'Can I interview you?']
    },
    definitions: {
      'reporter': 'Person who tells the news.',
      'camera': 'Device for taking video.',
      'microphone': 'Makes voice louder.',
      'news': 'What is happening today.',
      'live': 'Happening right now.',
      'describe': 'Tell what you see.',
      'scene': 'A view to describe.',
      'studio': 'Room for TV shows.',
      'report': 'Tell about an event.',
      'exciting': 'Makes you happy and interested.',
      'happening': 'Taking place now.',
      'audience': 'People watching a show.',
      'interview': 'Ask someone questions.'
    },
    emoji_map: {
      'reporter': '📰',
      'camera': '📷',
      'microphone': '🎤',
      'news': '📺',
      'live': '🔴',
      'describe': '🗣️',
      'scene': '🎬',
      'studio': '🏢',
      'report': '📋',
      'exciting': '🤩',
      'happening': '⚡',
      'audience': '👥',
      'interview': '🎙️'
    }
  },
  make_sentence: {
    instructions_easy: 'Unscramble the words to make a sentence.',
    instructions_advanced: 'Unscramble the words to make a sentence.',
    sentences_easy: [
      { scrambled: ['Alex', 'is', 'a', 'reporter'],         answer: 'Alex is a reporter.' },
      { scrambled: ['The', 'news', 'is', 'exciting'],        answer: 'The news is exciting.' },
      { scrambled: ['I', 'have', 'a', 'microphone'],         answer: 'I have a microphone.' },
      { scrambled: ['He', 'has', 'a', 'camera'],             answer: 'He has a camera.' },
      { scrambled: ['What', 'is', 'happening'],              answer: 'What is happening?' },
      { scrambled: ['She', 'is', 'the', 'audience'],         answer: 'She is the audience.' },
      { scrambled: ['I', 'am', 'a', 'reporter'],             answer: 'I am a reporter.' },
      { scrambled: ['The', 'cat', 'is', 'sleeping'],         answer: 'The cat is sleeping.' },
      { scrambled: ['Mum', 'is', 'cooking'],                 answer: 'Mum is cooking.' },
      { scrambled: ['It', 'is', 'live', 'news'],             answer: 'It is live news.' }
    ],
    sentences_advanced: [
      { scrambled: ['Alex', 'is', 'describing', 'the', 'scene'], answer: 'Alex is describing the scene.', base_words: ['alex', 'is', 'describing', 'the', 'scene'], time_phrases: ['right now', 'today'], location_phrases: ['at home', 'in the living room'] },
      { scrambled: ['He', 'is', 'holding', 'a', 'toy', 'microphone'], answer: 'He is holding a toy microphone.', base_words: ['he', 'is', 'holding', 'a', 'toy', 'microphone'], time_phrases: ['right now', 'today'], location_phrases: ['at home', 'in the living room'] },
      { scrambled: ['The', 'cat', 'is', 'sleeping', 'on', 'the', 'sofa'], answer: 'The cat is sleeping on the sofa.', base_words: ['the', 'cat', 'is', 'sleeping', 'on', 'the', 'sofa'], time_phrases: ['right now', 'today'], location_phrases: ['at home', 'in the living room'] },
      { scrambled: ['Mum', 'is', 'making', 'breakfast'], answer: 'Mum is making breakfast.', base_words: ['mum', 'is', 'making', 'breakfast'], time_phrases: ['right now', 'this morning'], location_phrases: ['in the kitchen', 'at home'] },
      { scrambled: ['The', 'audience', 'is', 'watching', 'Alex'], answer: 'The audience is watching Alex.', base_words: ['the', 'audience', 'is', 'watching', 'alex'], time_phrases: ['right now', 'today'], location_phrases: ['at home', 'in the living room'] },
      { scrambled: ['My', 'brother', 'is', 'playing', 'with', 'his', 'toy'], answer: 'My brother is playing with his toy.', base_words: ['my', 'brother', 'is', 'playing', 'with', 'his', 'toy'], time_phrases: ['right now', 'today'], location_phrases: ['at home', 'in the room'] },
      { scrambled: ['This', 'is', 'live', 'news', 'from', 'my', 'home'], answer: 'This is live news from my home.', base_words: ['this', 'is', 'live', 'news', 'from', 'my', 'home'], time_phrases: ['right now', 'today'], location_phrases: ['at home', 'on TV'] },
      { scrambled: ['I', 'am', 'doing', 'an', 'interview', 'with', 'my', 'cat'], answer: 'I am doing an interview with my cat.', base_words: ['i', 'am', 'doing', 'an', 'interview', 'with', 'my', 'cat'], time_phrases: ['right now', 'today'], location_phrases: ['at home', 'on the sofa'] },
      { scrambled: ['He', 'is', 'giving', 'a', 'live', 'report'], answer: 'He is giving a live report.', base_words: ['he', 'is', 'giving', 'a', 'live', 'report'], time_phrases: ['right now', 'today'], location_phrases: ['at home', 'in the living room'] },
      { scrambled: ['It', 'is', 'exciting', 'to', 'be', 'a', 'reporter'], answer: 'It is exciting to be a reporter.', base_words: ['it', 'is', 'exciting', 'to', 'be', 'a', 'reporter'], time_phrases: ['today', 'right now'], location_phrases: ['at home', 'at school'] }
    ]
  },
  ask_me: {
    instructions_easy: 'Ask a question that matches the context.',
    instructions_advanced: 'Ask a question that matches the context.',
    contexts_easy: [
      {
        id: 'w18_easy_what_doing',
        task_type: 'find_question',
        topic: 'reporter',
        intro: 'Alex is holding a microphone. Ask what he is doing.',
        acceptedQuestions: ['What are you doing?', 'What is Alex doing?', 'What is he doing?'],
        answer: 'I am holding a microphone and being a reporter!',
        question_hints: ['What are you doing?', 'What is he doing?'],
        required_question_words: ['what', 'are', 'is'],
        required_keywords: ['doing'],
        hints: { words: ['what', 'are', 'you', 'doing'], tricky: ['where', 'why'] }
      },
      {
        id: 'w18_easy_what_happening',
        task_type: 'find_question',
        topic: 'news',
        intro: 'The cat is sleeping and mum is cooking. Ask what is happening.',
        acceptedQuestions: ['What is happening?', 'What is going on?', 'What is happening at home?'],
        answer: 'My cat is sleeping and my mum is making breakfast!',
        question_hints: ['What is happening?', 'What is going on?'],
        required_question_words: ['what', 'is'],
        required_keywords: ['happening'],
        hints: { words: ['what', 'is', 'happening'], tricky: ['who', 'where'] }
      }
    ],
    contexts_advanced: [
      {
        id: 'w18_easy_adv_why_running',
        task_type: 'find_question',
        topic: 'reporter',
        intro: 'Alex is running with his microphone. Ask why he is running.',
        acceptedQuestions: ['Why are you running?', 'Why is Alex running?', 'Why is he running?'],
        answer: 'I am running because there is exciting news happening right now!',
        question_hints: ['Why are you running?', 'Why is he running?'],
        required_question_words: ['why', 'are', 'is'],
        required_keywords: ['running'],
        hints: { words: ['why', 'are', 'you', 'running'], tricky: ['what', 'where'] }
      },
      {
        id: 'w18_easy_adv_interview',
        task_type: 'find_question',
        topic: 'interview',
        intro: 'Alex is interviewing his cat. Ask who he is interviewing.',
        acceptedQuestions: ['Who are you interviewing?', 'Who is Alex interviewing?', 'Who is he talking to?'],
        answer: 'I am interviewing my cat! But the cat has no report today!',
        question_hints: ['Who are you interviewing?', 'Who is he interviewing?'],
        required_question_words: ['who', 'are', 'is'],
        required_keywords: ['interviewing'],
        hints: { words: ['who', 'are', 'you', 'interviewing'], tricky: ['what', 'why'] }
      }
    ]
  }
};

export default week18GamesEasy;
