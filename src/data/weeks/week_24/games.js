export const week24GamesAdvanced = {
  title: "Games: Feelings in the Past",
  image_url: null,
  audio_url: "/audio/week24/games_main.mp3",
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
        { id: "d1", type: "word", value: "relieved" }, { id: "d2", type: "meaning", value: "nhe nhom" },
        { id: "e1", type: "word", value: "cheerful" }, { id: "e2", type: "meaning", value: "vui ve" },
        { id: "f1", type: "word", value: "bored" }, { id: "f2", type: "meaning", value: "chan nan" },
        { id: "g1", type: "word", value: "surprised" }, { id: "g2", type: "meaning", value: "ngac nhien" }
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
        { text: "He", correct: "WAS" }, { text: "It", correct: "WAS" },
        { text: "You", correct: "WERE" }, { text: "We", correct: "WERE" },
        { text: "They", correct: "WERE" }, { text: "The children", correct: "WERE" },
        { text: "Mia", correct: "WAS" }, { text: "My friends", correct: "WERE" }
      ]
    }
  ],
  show_tell: {
    steps: 3,
    word_list: ['scared', 'excited', 'tired', 'relieved', 'cheerful', 'calm', 'worried', 'surprised'],
    instructions_easy: 'Say the feeling word clearly, then add a phrase, then make a full sentence.',
    instructions_advanced: 'Use the feeling word in a sentence about the past.',
    step_instructions: {
      1: 'Step 1: say the feeling word clearly.',
      2: 'Step 2: add a short phrase with the word.',
      3: 'Step 3: make a full past tense sentence.'
    },
    frames_easy: ['I was ___ because ___', 'She was ___ when ___'],
    frames_advanced: ['Yesterday I was ___ because ___', 'She was not ___ — she was ___'],
    details_easy: [],
    details_advanced: [],
    detail_map: {
      'scared': ['scared', 'was scared', 'I was scared', 'I was scared because the lights went out and it was very dark.'],
      'excited': ['excited', 'was excited', 'She was excited', 'She was excited about the school trip and could not sleep the night before.'],
      'tired': ['tired', 'was tired', 'He was tired', 'He was tired after the long sports day and went to sleep very early.'],
      'relieved': ['relieved', 'was relieved', 'I was relieved', 'I was relieved when I found my homework inside my bag before class.'],
      'cheerful': ['cheerful', 'was cheerful', 'She was cheerful', 'She was cheerful all morning because she got a sticker from the teacher.'],
      'calm': ['calm', 'stayed calm', 'Mum was calm', 'Mum was calm and helped us look everywhere for the missing homework.'],
      'worried': ['worried', 'was worried', 'I was worried', 'I was worried before the test but I took a deep breath and stayed calm.'],
      'surprised': ['surprised', 'was surprised', 'We were surprised', 'We were all surprised when a famous author walked into our classroom.']
    },
    distractor_map: {
      'scared': ['happy', 'hungry', 'bored'],
      'excited': ['angry', 'tired', 'upset'],
      'tired': ['excited', 'cheerful', 'calm'],
      'relieved': ['scared', 'angry', 'surprised'],
      'cheerful': ['bored', 'worried', 'tired'],
      'calm': ['scared', 'angry', 'surprised'],
      'worried': ['cheerful', 'calm', 'relieved'],
      'surprised': ['bored', 'tired', 'calm']
    }
  },
  make_sentence: {
    instructions_easy: 'Unscramble the words to make a feelings sentence.',
    instructions_advanced: 'Unscramble the words to make a past feelings sentence.',
    sentences_easy: [
      { scrambled: ['I', 'was', 'scared'], answer: 'I was scared.' },
      { scrambled: ['She', 'was', 'excited'], answer: 'She was excited.' },
      { scrambled: ['He', 'was', 'tired'], answer: 'He was tired.' },
      { scrambled: ['We', 'were', 'surprised'], answer: 'We were surprised.' },
      { scrambled: ['I', 'was', 'relieved'], answer: 'I was relieved.' },
      { scrambled: ['She', 'was', 'cheerful'], answer: 'She was cheerful.' },
      { scrambled: ['They', 'were', 'bored'], answer: 'They were bored.' },
      { scrambled: ['I', 'was', 'not', 'angry'], answer: 'I was not angry.' },
      { scrambled: ['He', 'was', 'calm'], answer: 'He was calm.' },
      { scrambled: ['She', 'was', 'worried'], answer: 'She was worried.' }
    ],
    sentences_advanced: [
      { scrambled: ['I', 'was', 'scared', 'because', 'the', 'lights', 'went', 'out'], answer: 'I was scared because the lights went out.', base_words: ['i', 'was', 'scared', 'because', 'the', 'lights', 'went', 'out'], time_phrases: ['yesterday', 'last night', 'in the evening'], location_phrases: ['in my room', 'at home', 'in the hall'] },
      { scrambled: ['She', 'was', 'excited', 'about', 'the', 'school', 'trip'], answer: 'She was excited about the school trip.', base_words: ['she', 'was', 'excited', 'about', 'the', 'school', 'trip'], time_phrases: ['yesterday', 'last week', 'on Friday'], location_phrases: ['at school', 'in class', 'that morning'] },
      { scrambled: ['I', 'was', 'relieved', 'when', 'I', 'found', 'my', 'homework'], answer: 'I was relieved when I found my homework.', base_words: ['i', 'was', 'relieved', 'when', 'i', 'found', 'my', 'homework'], time_phrases: ['yesterday', 'that morning', 'before school'], location_phrases: ['in my bag', 'on my desk', 'at home'] },
      { scrambled: ['They', 'were', 'all', 'surprised', 'when', 'the', 'author', 'arrived'], answer: 'They were all surprised when the author arrived.', base_words: ['they', 'were', 'all', 'surprised', 'when', 'the', 'author', 'arrived'], time_phrases: ['yesterday', 'that day', 'in the morning'], location_phrases: ['at school', 'in the classroom', 'in the hall'] },
      { scrambled: ['Mia', 'was', 'tired', 'but', 'cheerful', 'at', 'the', 'end'], answer: 'Mia was tired but cheerful at the end.', base_words: ['mia', 'was', 'tired', 'but', 'cheerful', 'at', 'the', 'end'], time_phrases: ['yesterday', 'at the end of the day', 'by the evening'], location_phrases: ['of the day', 'at school', 'at home'] },
      { scrambled: ['Mum', 'was', 'calm', 'and', 'helped', 'us', 'look'], answer: 'Mum was calm and helped us look.', base_words: ['mum', 'was', 'calm', 'and', 'helped', 'us', 'look'], time_phrases: ['yesterday', 'that morning', 'right away'], location_phrases: ['at home', 'in the kitchen', 'upstairs'] },
      { scrambled: ['I', 'was', 'worried', 'about', 'the', 'test'], answer: 'I was worried about the test.', base_words: ['i', 'was', 'worried', 'about', 'the', 'test'], time_phrases: ['yesterday', 'last week', 'that morning'], location_phrases: ['at school', 'before class', 'in the hall'] },
      { scrambled: ['Were', 'you', 'scared', 'yesterday', '?'], answer: 'Were you scared yesterday?', base_words: ['were', 'you', 'scared', 'yesterday'], time_phrases: ['yesterday', 'last night', 'before bedtime'], location_phrases: ['at home', 'in school', 'outside'] },
      { scrambled: ['Leo', 'was', 'upset', 'about', 'his', 'missing', 'pencil'], answer: 'Leo was upset about his missing pencil.', base_words: ['leo', 'was', 'upset', 'about', 'his', 'missing', 'pencil'], time_phrases: ['yesterday', 'that day', 'all morning'], location_phrases: ['at school', 'in class', 'at his desk'] },
      { scrambled: ['She', 'was', 'not', 'bored', '—', 'she', 'was', 'reading'], answer: 'She was not bored — she was reading.', base_words: ['she', 'was', 'not', 'bored', 'she', 'was', 'reading'], time_phrases: ['yesterday', 'in the afternoon', 'all evening'], location_phrases: ['at home', 'in her room', 'on the sofa'] }
    ]
  },
  ask_me: {
    instructions_easy: 'Ask a simple question about past feelings.',
    instructions_advanced: 'Ask a past feelings question that matches the context.',
    contexts_easy: [
      {
        id: 'w24_mia_scared',
        task_type: 'find_question',
        topic: 'past feelings',
        intro: 'Mia was scared yesterday morning. Ask how she felt.',
        acceptedQuestions: ['Was Mia scared?', 'How did Mia feel?', 'Was she scared yesterday?'],
        answer: 'Mia was scared yesterday morning.',
        question_hints: ['Was Mia scared?', 'How did she feel?'],
        required_question_words: ['was', 'how'],
        required_keywords: ['mia', 'scared'],
        hints: { words: ['was', 'mia', 'scared', 'how', 'feel'], tricky: ['where', 'when'] }
      },
      {
        id: 'w24_class_excited',
        task_type: 'find_question',
        topic: 'past feelings',
        intro: 'The class was excited about the visitor. Ask why they were excited.',
        acceptedQuestions: ['Why were they excited?', 'What were they excited about?', 'Were they excited about the visitor?'],
        answer: 'They were excited because there was a special visitor.',
        question_hints: ['Why were they excited?', 'What were they excited about?'],
        required_question_words: ['why', 'were', 'what'],
        required_keywords: ['excited', 'class'],
        hints: { words: ['why', 'were', 'they', 'excited', 'visitor'], tricky: ['who', 'where'] }
      },
      {
        id: 'w24_leo_upset',
        task_type: 'find_question',
        topic: 'past feelings',
        intro: 'Leo was upset about his pencil. Ask what Leo was upset about.',
        acceptedQuestions: ['What was Leo upset about?', 'Was Leo upset?', 'Why was Leo upset?'],
        answer: 'Leo was upset because no one found his pencil.',
        question_hints: ['What was Leo upset about?', 'Why was Leo upset?'],
        required_question_words: ['what', 'was', 'why'],
        required_keywords: ['leo', 'upset'],
        hints: { words: ['what', 'was', 'leo', 'upset', 'about'], tricky: ['how', 'when'] }
      }
    ],
    contexts_advanced: [
      {
        id: 'w24_adv_relieved',
        task_type: 'find_question',
        topic: 'past feelings',
        intro: 'Mia was relieved when she found her homework. Ask when she felt relieved.',
        acceptedQuestions: ['When was Mia relieved?', 'Why was she relieved?', 'What made Mia feel relieved?'],
        answer: 'Mia was relieved when she found her homework inside her bag.',
        question_hints: ['When was Mia relieved?', 'Why was she relieved?'],
        required_question_words: ['when', 'why', 'what'],
        required_keywords: ['relieved', 'mia'],
        hints: { words: ['when', 'was', 'mia', 'relieved', 'homework'], tricky: ['who', 'how'] }
      }
    ]
  }
};

export default week24GamesAdvanced;
