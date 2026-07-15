/**
 * Week 18 Game Data - Advanced Mode (GameHub)
 * Theme: The Live Reporter — Present Continuous Review
 */

export const week18GamesAdvanced = {
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
    frames_easy: ['I am ___ the news', 'The ___ is filming'],
    frames_advanced: ['The reporter is ___ the scene', 'Right now, it is ___ because ___'],
    details_easy: [],
    details_advanced: [],
    detail_map: {
      'reporter': ['reporter', 'a reporter', 'Alex is a reporter', 'Alex is a reporter who describes exciting scenes for the school news audience'],
      'camera': ['camera', 'a camera', 'holding a camera', 'The camera is pointing at the reporter who is standing in the studio'],
      'microphone': ['microphone', 'a microphone', 'into the microphone', 'She is speaking clearly into the microphone so everyone can hear her report'],
      'news': ['news', 'the news', 'on the news', 'The reporter is reading the exciting news about what is happening in the school right now'],
      'live': ['live', 'live report', 'going live', 'We are going live right now so the audience can see what is happening in the studio'],
      'describe': ['describe', 'describing', 'I am describing', 'I am describing the exciting scene for the audience who are watching on live TV'],
      'scene': ['scene', 'the scene', 'filming the scene', 'The camera is filming the scene where Alex is interviewing his friend Maya'],
      'studio': ['studio', 'in the studio', 'inside the studio', 'Inside the studio, the reporters are getting ready for the live news show to begin'],
      'report': ['report', 'a report', 'giving a report', 'Alex is giving a live report about the exciting things happening in Room 5 today'],
      'exciting': ['exciting', 'so exciting', 'really exciting', 'It is really exciting to watch the live report because we can see everything happening now'],
      'happening': ['happening', 'what is happening', 'happening right now', 'Look at what is happening right now — Alex is interviewing Maya in front of the camera'],
      'audience': ['audience', 'the audience', 'for the audience', 'The audience is watching the live report and cheering loudly for the school news team'],
      'interview': ['interview', 'an interview', 'doing an interview', 'Alex is doing an interview with Maya and asking her what she is writing about today']
    },
    distractor_map: {
      'reporter': ['long hair', 'blue shoes', 'big smile'],
      'camera': ['old book', 'red pen', 'green bag'],
      'microphone': ['yellow chair', 'big clock', 'white eraser'],
      'news': ['quiet music', 'cold water', 'tired yawn'],
      'live': ['slow walk', 'dark night', 'soft pillow']
    },
    frame_map: {
      'reporter': ['Alex is a reporter who is describing the scene.'],
      'camera': ['The camera is filming what is happening.'],
      'microphone': ['She is speaking into the microphone.']
    },
    sentence_hints_map: {
      'reporter': ['Alex is a reporter.', 'The reporter is describing the scene.', 'She is a school reporter.'],
      'camera': ['He is holding a camera.', 'The camera is on.', 'The camera is filming the scene.'],
      'microphone': ['She is holding a microphone.', 'He is speaking into the microphone.', 'I need a microphone.'],
      'news': ['The news is on TV.', 'I am watching the news.', 'She is reading the news.'],
      'live': ['We are going live.', 'It is a live report.', 'The show is live right now.'],
      'describe': ['She is describing the scene.', 'I am describing what I see.', 'Tell me what you see.'],
      'scene': ['He is filming the scene.', 'What is happening in the scene?', 'The scene is exciting.'],
      'studio': ['They are in the studio.', 'The studio is ready.', 'She is standing in the studio.'],
      'report': ['He is giving a report.', 'It is a live report.', 'The report is exciting.'],
      'exciting': ['The news is exciting.', 'What an exciting scene!', 'It is so exciting to watch.'],
      'happening': ['What is happening?', 'Look at what is happening.', 'Something exciting is happening.'],
      'audience': ['The audience is watching.', 'The audience is cheering.', 'Thank you, audience!'],
      'interview': ['She is doing an interview.', 'Alex is interviewing Maya.', 'Can I interview you?']
    },
    definitions: {
      'reporter': 'Person who tells the news.',
      'camera': 'Device for taking pictures or video.',
      'microphone': 'Device that makes voice louder.',
      'news': 'Information about what is happening.',
      'live': 'Happening right now, not recorded.',
      'describe': 'Use words to explain what you see.',
      'scene': 'A view or situation to describe.',
      'studio': 'Room where TV shows are made.',
      'report': 'Tell about an event in detail.',
      'exciting': 'Makes you feel happy and interested.',
      'happening': 'Taking place right now.',
      'audience': 'People watching a show or performance.',
      'interview': 'Ask someone questions to learn more.'
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
      { scrambled: ['Alex', 'is', 'a', 'reporter'], answer: 'Alex is a reporter.' },
      { scrambled: ['She', 'is', 'holding', 'a', 'microphone'], answer: 'She is holding a microphone.' },
      { scrambled: ['The', 'news', 'is', 'exciting'], answer: 'The news is exciting.' },
      { scrambled: ['I', 'am', 'watching', 'the', 'news'], answer: 'I am watching the news.' },
      { scrambled: ['He', 'is', 'filming', 'the', 'scene'], answer: 'He is filming the scene.' },
      { scrambled: ['They', 'are', 'in', 'the', 'studio'], answer: 'They are in the studio.' },
      { scrambled: ['What', 'is', 'happening', 'now'], answer: 'What is happening now?' },
      { scrambled: ['She', 'is', 'doing', 'an', 'interview'], answer: 'She is doing an interview.' },
      { scrambled: ['The', 'audience', 'is', 'watching'], answer: 'The audience is watching.' },
      { scrambled: ['It', 'is', 'a', 'live', 'report'], answer: 'It is a live report.' }
    ],
    sentences_advanced: [
      { scrambled: ['Alex', 'is', 'describing', 'the', 'exciting', 'scene', 'for', 'the', 'audience'], answer: 'Alex is describing the exciting scene for the audience.', base_words: ['alex', 'is', 'describing', 'the', 'exciting', 'scene', 'for', 'the', 'audience'], time_phrases: ['right now', 'today', 'at this moment'], location_phrases: ['in the studio', 'in Room 5', 'on live TV'] },
      { scrambled: ['The', 'reporter', 'is', 'speaking', 'into', 'the', 'microphone'], answer: 'The reporter is speaking into the microphone.', base_words: ['the', 'reporter', 'is', 'speaking', 'into', 'the', 'microphone'], time_phrases: ['right now', 'today', 'at this moment'], location_phrases: ['in the studio', 'on the stage', 'in Room 5'] },
      { scrambled: ['The', 'camera', 'is', 'filming', 'what', 'is', 'happening', 'outside'], answer: 'The camera is filming what is happening outside.', base_words: ['the', 'camera', 'is', 'filming', 'what', 'is', 'happening', 'outside'], time_phrases: ['right now', 'today', 'this afternoon'], location_phrases: ['in the school', 'in the studio', 'near the door'] },
      { scrambled: ['The', 'audience', 'is', 'watching', 'the', 'live', 'news', 'report'], answer: 'The audience is watching the live news report.', base_words: ['the', 'audience', 'is', 'watching', 'the', 'live', 'news', 'report'], time_phrases: ['right now', 'at home', 'this evening'], location_phrases: ['on TV', 'in the classroom', 'in the studio'] },
      { scrambled: ['Alex', 'is', 'interviewing', 'Maya', 'about', 'ocean', 'animals'], answer: 'Alex is interviewing Maya about ocean animals.', base_words: ['alex', 'is', 'interviewing', 'maya', 'about', 'ocean', 'animals'], time_phrases: ['right now', 'today', 'at this moment'], location_phrases: ['in Room 5', 'in the studio', 'for the news'] },
      { scrambled: ['She', 'is', 'giving', 'a', 'live', 'report', 'from', 'the', 'studio'], answer: 'She is giving a live report from the studio.', base_words: ['she', 'is', 'giving', 'a', 'live', 'report', 'from', 'the', 'studio'], time_phrases: ['right now', 'today', 'this morning'], location_phrases: ['in the studio', 'for the school', 'on TV'] },
      { scrambled: ['Look', 'at', 'what', 'is', 'happening', 'in', 'the', 'classroom', 'right', 'now'], answer: 'Look at what is happening in the classroom right now.', base_words: ['look', 'at', 'what', 'is', 'happening', 'in', 'the', 'classroom', 'right', 'now'], time_phrases: ['right now', 'at this moment', 'today'], location_phrases: ['in Room 5', 'in the school', 'in the studio'] },
      { scrambled: ['He', 'is', 'holding', 'a', 'camera', 'and', 'filming', 'the', 'scene'], answer: 'He is holding a camera and filming the scene.', base_words: ['he', 'is', 'holding', 'a', 'camera', 'and', 'filming', 'the', 'scene'], time_phrases: ['right now', 'today', 'this morning'], location_phrases: ['outside', 'in the studio', 'in Room 5'] },
      { scrambled: ['The', 'reporter', 'is', 'describing', 'the', 'exciting', 'news', 'to', 'the', 'audience'], answer: 'The reporter is describing the exciting news to the audience.', base_words: ['the', 'reporter', 'is', 'describing', 'the', 'exciting', 'news', 'to', 'the', 'audience'], time_phrases: ['right now', 'today', 'on live TV'], location_phrases: ['in the studio', 'in the classroom', 'on television'] },
      { scrambled: ['Sara', 'is', 'reading', 'quietly', 'while', 'Alex', 'is', 'reporting'], answer: 'Sara is reading quietly while Alex is reporting.', base_words: ['sara', 'is', 'reading', 'quietly', 'while', 'alex', 'is', 'reporting'], time_phrases: ['right now', 'today', 'at this moment'], location_phrases: ['in the classroom', 'in Room 5', 'at school'] }
    ]
  },
  ask_me: {
    instructions_easy: 'Ask a question that matches the context.',
    instructions_advanced: 'Ask a question that matches the context.',
    contexts_easy: [
      {
        id: 'w18_what_doing',
        task_type: 'find_question',
        topic: 'reporter',
        intro: 'Alex is holding a microphone. Ask what he is doing.',
        acceptedQuestions: ['What are you doing?', 'What is Alex doing?', 'What is he doing?'],
        answer: 'I am holding a microphone and giving a live report.',
        question_hints: ['What are you doing?', 'What is he doing?'],
        required_question_words: ['what', 'is', 'are'],
        required_keywords: ['doing'],
        hints: { words: ['what', 'are', 'you', 'doing'], tricky: ['where', 'why'] }
      },
      {
        id: 'w18_what_happening',
        task_type: 'find_question',
        topic: 'news',
        intro: 'Something exciting is happening in Room 5. Ask what is happening.',
        acceptedQuestions: ['What is happening?', 'What is happening in Room 5?', 'What is going on?'],
        answer: 'Alex is giving a live report from the classroom!',
        question_hints: ['What is happening?', 'What is happening here?'],
        required_question_words: ['what', 'is'],
        required_keywords: ['happening'],
        hints: { words: ['what', 'is', 'happening'], tricky: ['who', 'where'] }
      }
    ],
    contexts_advanced: [
      {
        id: 'w18_adv_running',
        task_type: 'find_question',
        topic: 'reporter',
        intro: 'The reporter is running to the scene. Ask why they are running.',
        acceptedQuestions: ['Why are you running?', 'Why is the reporter running?', 'Why are they running?'],
        answer: 'I am running because there is breaking news happening right now!',
        question_hints: ['Why are you running?', 'Why is the reporter running?'],
        required_question_words: ['why', 'are', 'is'],
        required_keywords: ['running'],
        hints: { words: ['why', 'are', 'you', 'running'], tricky: ['what', 'where'] }
      },
      {
        id: 'w18_adv_interview',
        task_type: 'find_question',
        topic: 'interview',
        intro: 'Alex is interviewing someone. Ask who he is interviewing.',
        acceptedQuestions: ['Who are you interviewing?', 'Who is Alex interviewing?', 'Who is he talking to?'],
        answer: 'I am interviewing my friend Maya about ocean animals.',
        question_hints: ['Who are you interviewing?', 'Who is he interviewing?'],
        required_question_words: ['who', 'are', 'is'],
        required_keywords: ['interviewing'],
        hints: { words: ['who', 'are', 'you', 'interviewing'], tricky: ['what', 'why'] }
      }
    ]
  }
};

export default week18GamesAdvanced;
