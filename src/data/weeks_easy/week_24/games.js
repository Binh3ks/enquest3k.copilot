export const week24GamesEasy = {
  title: "Games: Feelings in the Past",
  image_url: null,
  audio_url: "/audio/week24_easy/games_main.mp3",
  games: [
    {
      id: "emotion_match",
      type: "matching",
      title_en: "Emotion Card Match",
      instruction_en: "Match each feeling word to its Vietnamese meaning.",
      instruction_vi: "Noi moi tu cam xuc voi nghia tieng Viet.",
      cards: [
        { id: "a1", type: "word", value: "scared" }, { id: "a2", type: "meaning", value: "so hai" },
        { id: "b1", type: "word", value: "excited" }, { id: "b2", type: "meaning", value: "hao hung" },
        { id: "c1", type: "word", value: "calm" }, { id: "c2", type: "meaning", value: "binh tinh" },
        { id: "d1", type: "word", value: "tired" }, { id: "d2", type: "meaning", value: "met moi" }
      ]
    },
    {
      id: "was_were_sort",
      type: "sorting",
      title_en: "Was or Were? Sort It!",
      instruction_en: "Drag each subject to the correct column: WAS or WERE.",
      instruction_vi: "Keo moi chu ngu vao cot dung: WAS hoac WERE.",
      categories: ["WAS", "WERE"],
      items: [
        { text: "I", correct: "WAS" }, { text: "She", correct: "WAS" },
        { text: "He", correct: "WAS" }, { text: "You", correct: "WERE" },
        { text: "We", correct: "WERE" }, { text: "They", correct: "WERE" }
      ]
    }
  ],
  show_tell: {
    steps: 2,
    word_list: ['scared', 'excited', 'tired', 'happy', 'calm', 'bored'],
    instructions_easy: 'Say the feeling word, then make a short sentence.',
    instructions_advanced: 'Use the feeling word in a sentence about yesterday.',
    step_instructions: {
      1: 'Step 1: say the feeling word clearly.',
      2: 'Step 2: make a sentence with was or were.'
    },
    frames_easy: ['I was ___', 'She was ___'],
    frames_advanced: ['Yesterday I was ___ because ___', 'She was ___ when ___'],
    details_easy: [],
    details_advanced: [],
    detail_map: {
      'scared': ['scared', 'was scared', 'I was scared', 'I was scared last night because it was dark.'],
      'excited': ['excited', 'was excited', 'I was excited', 'I was excited about the game yesterday.'],
      'tired': ['tired', 'was tired', 'I was tired', 'I was tired yesterday after running.'],
      'happy': ['happy', 'was happy', 'I was happy', 'I was happy when my mum came home.'],
      'calm': ['calm', 'was calm', 'I was calm', 'I was calm because I was ready for the test.'],
      'bored': ['bored', 'was bored', 'I was bored', 'I was bored because there was nothing to do.']
    },
    distractor_map: {
      'scared': ['happy', 'hungry'], 'excited': ['tired', 'upset'],
      'tired': ['cheerful', 'calm'], 'happy': ['sad', 'angry'],
      'calm': ['scared', 'angry'], 'bored': ['excited', 'cheerful']
    }
  },
  make_sentence: {
    instructions_easy: 'Unscramble the words to make a feelings sentence.',
    instructions_advanced: 'Unscramble the words to make a feelings sentence.',
    sentences_easy: [
      { scrambled: ['I', 'was', 'scared'], answer: 'I was scared.' },
      { scrambled: ['She', 'was', 'tired'], answer: 'She was tired.' },
      { scrambled: ['We', 'were', 'happy'], answer: 'We were happy.' },
      { scrambled: ['He', 'was', 'calm'], answer: 'He was calm.' },
      { scrambled: ['I', 'was', 'excited'], answer: 'I was excited.' },
      { scrambled: ['They', 'were', 'bored'], answer: 'They were bored.' },
      { scrambled: ['She', 'was', 'not', 'angry'], answer: 'She was not angry.' },
      { scrambled: ['We', 'were', 'surprised'], answer: 'We were surprised.' },
      { scrambled: ['I', 'was', 'relieved'], answer: 'I was relieved.' },
      { scrambled: ['He', 'was', 'worried'], answer: 'He was worried.' }
    ],
    sentences_advanced: [
      { scrambled: ['I', 'was', 'scared', 'because', 'it', 'was', 'dark'], answer: 'I was scared because it was dark.', base_words: ['i', 'was', 'scared', 'because', 'it', 'was', 'dark'], time_phrases: ['yesterday', 'last night'], location_phrases: ['at home', 'in my room'] },
      { scrambled: ['She', 'was', 'excited', 'about', 'the', 'trip'], answer: 'She was excited about the trip.', base_words: ['she', 'was', 'excited', 'about', 'the', 'trip'], time_phrases: ['yesterday', 'that morning'], location_phrases: ['at school', 'in class'] }
    ]
  },
  ask_me: {
    instructions_easy: 'Ask a simple question about feelings.',
    instructions_advanced: 'Ask a question about past feelings.',
    contexts_easy: [
      {
        id: 'w24_easy_mia',
        task_type: 'find_question',
        topic: 'feelings',
        intro: 'Mia was tired yesterday. Ask how she felt.',
        acceptedQuestions: ['Was Mia tired?', 'How did Mia feel?', 'Was she tired?'],
        answer: 'Mia was tired yesterday.',
        question_hints: ['Was Mia tired?', 'How did she feel?'],
        required_question_words: ['was', 'how'],
        required_keywords: ['mia', 'tired'],
        hints: { words: ['was', 'mia', 'tired', 'how', 'feel'], tricky: ['where', 'when'] }
      },
      {
        id: 'w24_easy_excited',
        task_type: 'find_question',
        topic: 'feelings',
        intro: 'Leo was excited yesterday. Ask why.',
        acceptedQuestions: ['Why was Leo excited?', 'Was Leo excited?', 'Why was he excited?'],
        answer: 'Leo was excited because it was a special day.',
        question_hints: ['Why was Leo excited?', 'Was Leo excited?'],
        required_question_words: ['why', 'was'],
        required_keywords: ['excited'],
        hints: { words: ['why', 'was', 'leo', 'excited'], tricky: ['who', 'where'] }
      },
      {
        id: 'w24_easy_calm',
        task_type: 'find_question',
        topic: 'feelings',
        intro: 'Mum was calm. Ask how mum felt.',
        acceptedQuestions: ['Was mum calm?', 'How did mum feel?', 'Was she calm?'],
        answer: 'Mum was calm and helped everyone.',
        question_hints: ['Was mum calm?', 'How did she feel?'],
        required_question_words: ['was', 'how'],
        required_keywords: ['mum', 'calm'],
        hints: { words: ['was', 'mum', 'calm', 'how', 'feel'], tricky: ['where', 'when'] }
      }
    ],
    contexts_advanced: [
      {
        id: 'w24_easy_adv_scared',
        task_type: 'find_question',
        topic: 'feelings',
        intro: 'Mia was scared when the lights went out. Ask why she was scared.',
        acceptedQuestions: ['Why was Mia scared?', 'What made her scared?', 'Was Mia scared?'],
        answer: 'Mia was scared because the lights went out.',
        question_hints: ['Why was Mia scared?', 'What made her scared?'],
        required_question_words: ['why', 'what', 'was'],
        required_keywords: ['scared', 'mia'],
        hints: { words: ['why', 'was', 'mia', 'scared', 'lights'], tricky: ['who', 'when'] }
      }
    ]
  }
};

export default week24GamesEasy;
