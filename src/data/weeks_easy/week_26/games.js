export const week26GamesEasy = {
  title: "Games: My Weekend Comic Strip",
  image_url: null,
  audio_url: "/audio/week26_easy/games_main.mp3",
  games: [
    {
      id: "past_simple_match",
      type: "matching",
      title_en: "Past Simple Match",
      instruction_en: "Match each present tense verb to its past tense form.",
      instruction_vi: "Nối mỗi động từ hiện tại với dạng quá khứ của nó.",
      cards: [
        { id: "a1", type: "word", value: "visit" }, { id: "a2", type: "meaning", value: "visited" },
        { id: "b1", type: "word", value: "play" }, { id: "b2", type: "meaning", value: "played" },
        { id: "c1", type: "word", value: "watch" }, { id: "c2", type: "meaning", value: "watched" },
        { id: "d1", type: "word", value: "return" }, { id: "d2", type: "meaning", value: "returned" }
      ]
    },
    {
      id: "was_were_sort",
      type: "sorting",
      title_en: "WAS or WERE? Sort It!",
      instruction_en: "Drag each sentence to the correct column: WAS or WERE.",
      instruction_vi: "Kéo mỗi câu vào cột đúng: WAS hoặc WERE.",
      categories: ["WAS", "WERE"],
      items: [
        { text: "It was sunny.", correct: "WAS" },
        { text: "They were happy.", correct: "WERE" },
        { text: "Leo was tired.", correct: "WAS" },
        { text: "Leo and Max were at the park.", correct: "WERE" }
      ]
    }
  ],
  show_tell: {
    steps: 2,
    word_list: ["comic strip", "panel", "caption", "speech bubble", "character", "weekend"],
    instructions_easy: "Say the word, then make a short sentence.",
    instructions_advanced: "Use the word in a Past Simple sentence.",
    step_instructions: {
      1: "Step 1: say the word clearly.",
      2: "Step 2: make a Past Simple sentence with that word."
    },
    frames_easy: ["It was ___", "Leo ___-ed"],
    frames_advanced: ["Leo visited ___ and it was ___", "They were ___ when Leo ___-ed"],
    details_easy: [],
    details_advanced: [],
    detail_map: {
      "comic strip": ["comic strip", "create a comic strip", "Leo created a comic strip", "Leo created a comic strip about his weekend adventure."],
      "panel": ["panel", "four panels", "Leo sketched four panels", "Leo sketched four panels and added captions to each one."],
      "caption": ["caption", "write a caption", "Leo wrote a caption", "Leo wrote a caption under each panel to describe the scene."],
      "speech bubble": ["speech bubble", "add a speech bubble", "Max had a speech bubble", "Max had a speech bubble that said I played all day!"],
      "character": ["character", "main character", "Leo was the main character", "Leo was the main character in his own comic strip."],
      "weekend": ["weekend", "last weekend", "last weekend Leo visited", "Last weekend Leo visited the park and had a great adventure."]
    },
    distractor_map: {
      "comic strip": ["recipe", "letter"],
      "panel": ["page", "cover"],
      "caption": ["title", "question"],
      "speech bubble": ["caption", "label"],
      "character": ["author", "artist"],
      "weekend": ["morning", "evening"]
    }
  },
  make_sentence: {
    instructions_easy: "Unscramble the words to make a Past Simple sentence.",
    instructions_advanced: "Unscramble the words to make a correct Past Simple sentence.",
    sentences_easy: [
      { scrambled: ["Leo", "visited", "the", "park"], answer: "Leo visited the park." },
      { scrambled: ["Max", "played", "ball"], answer: "Max played ball." },
      { scrambled: ["It", "was", "sunny"], answer: "It was sunny." },
      { scrambled: ["They", "were", "happy"], answer: "They were happy." },
      { scrambled: ["Leo", "created", "strip", "a", "comic"], answer: "Leo created a comic strip." },
      { scrambled: ["They", "home", "returned"], answer: "They returned home." },
      { scrambled: ["Leo", "watched", "show", "a"], answer: "Leo watched a show." },
      { scrambled: ["Leo", "sketched", "panels", "four"], answer: "Leo sketched four panels." }
    ],
    sentences_advanced: [
      { scrambled: ["Leo", "visited", "Saturday", "park", "on", "the"], answer: "Leo visited the park on Saturday." },
      { scrambled: ["Max", "played", "ball", "his", "red", "with"], answer: "Max played with his red ball." },
      { scrambled: ["It", "warm", "was", "and", "sunny"], answer: "It was sunny and warm." },
      { scrambled: ["tired", "were", "They", "happy", "but"], answer: "They were tired but happy." },
      { scrambled: ["Leo", "comic", "a", "created", "strip", "his", "about", "weekend"], answer: "Leo created a comic strip about his weekend." }
    ]
  },
  ask_me: {
    instructions_easy: 'Ask a simple question about Leo\'s comic strip or weekend.',
    instructions_advanced: 'Ask a was/were or -ed verb question about the comic strip.',
    contexts_easy: [
      {
        id: 'w26e_leo_went',
        task_type: 'find_question',
        topic: 'weekend past simple',
        intro: 'Leo visited the park on Saturday. Ask where Leo went.',
        acceptedQuestions: ['Where did Leo go?', 'Where did Leo go on Saturday?', 'Where did he go?'],
        answer: 'Leo visited the park on Saturday.',
        question_hints: ['Where did Leo go?', 'Where did he go?'],
        required_question_words: ['where', 'did'],
        required_keywords: ['leo', 'go'],
        hints: { words: ['where', 'did', 'leo', 'go'], tricky: ['what', 'when'] }
      },
      {
        id: 'w26e_was_sunny',
        task_type: 'find_question',
        topic: 'past simple was',
        intro: 'The weather at the park was nice. Ask what the weather was like.',
        acceptedQuestions: ['What was the weather like?', 'How was the weather?', 'Was it sunny?'],
        answer: 'It was sunny and warm.',
        question_hints: ['What was the weather like?', 'How was the weather?'],
        required_question_words: ['what', 'was', 'weather'],
        required_keywords: ['weather', 'was'],
        hints: { words: ['what', 'was', 'the', 'weather', 'like'], tricky: ['is', 'are'] }
      },
      {
        id: 'w26e_how_many_panels',
        task_type: 'find_question',
        topic: 'comic strip',
        intro: 'Leo made a comic strip with four panels. Ask how many panels it had.',
        acceptedQuestions: ['How many panels did Leo draw?', 'How many panels are there?', 'How many panels does the comic have?'],
        answer: 'Leo drew four panels in his comic strip.',
        question_hints: ['How many panels did Leo draw?', 'How many panels are there?'],
        required_question_words: ['how', 'many', 'panels'],
        required_keywords: ['panels', 'how', 'many'],
        hints: { words: ['how', 'many', 'panels', 'did', 'leo', 'draw'], tricky: ['what', 'where'] }
      }
    ],
    contexts_advanced: [
      {
        id: 'w26e_adv_was_were',
        task_type: 'find_question',
        topic: 'was were grammar',
        intro: 'Leo and Max came home tired. Ask if they were happy too.',
        acceptedQuestions: ['Were Leo and Max happy?', 'Were they happy?', 'Were Leo and Max tired but happy?'],
        answer: 'Yes, they were tired but very happy!',
        question_hints: ['Were Leo and Max happy?', 'Were they happy?'],
        required_question_words: ['were', 'happy'],
        required_keywords: ['were', 'happy'],
        hints: { words: ['were', 'leo', 'max', 'happy'], tricky: ['was', 'is'] }
      }
    ]
  }
};

export default week26GamesEasy;
