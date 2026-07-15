export const week26GamesAdvanced = {
  title: "Games: My Weekend Comic Strip",
  image_url: null,
  audio_url: "/audio/week26/games_main.mp3",
  games: [
    {
      id: "comic_vocab_match",
      type: "matching",
      title_en: "Comic Strip Vocabulary Match",
      instruction_en: "Match each comic strip term to its Vietnamese meaning.",
      instruction_vi: "Noi moi thuat ngu truyen tranh voi nghia tieng Viet.",
      cards: [
        { id: "a1", type: "word", value: "comic strip" }, { id: "a2", type: "meaning", value: "truyen tranh khung" },
        { id: "b1", type: "word", value: "caption" }, { id: "b2", type: "meaning", value: "chu thich" },
        { id: "c1", type: "word", value: "speech bubble" }, { id: "c2", type: "meaning", value: "bong bong loi thoai" },
        { id: "d1", type: "word", value: "panel" }, { id: "d2", type: "meaning", value: "khung ve" },
        { id: "e1", type: "word", value: "character" }, { id: "e2", type: "meaning", value: "nhan vat" },
        { id: "f1", type: "word", value: "sketch" }, { id: "f2", type: "meaning", value: "phac thao" },
        { id: "g1", type: "word", value: "scene" }, { id: "g2", type: "meaning", value: "canh / khung canh" }
      ]
    },
    {
      id: "panel_sort",
      type: "sorting",
      title_en: "Sort the Comic Panels!",
      instruction_en: "Drag each caption to the correct panel position.",
      instruction_vi: "Keo moi chu thich vao dung vi tri khung.",
      categories: ["Panel 1 (First)", "Panel 2 (Then)", "Panel 3 (After that)", "Panel 4 (Finally)"],
      items: [
        { text: "Finally, we returned home tired but happy.", correct: "Panel 4 (Finally)" },
        { text: "First, Leo woke up and wrote the comic title.", correct: "Panel 1 (First)" },
        { text: "After that, they watched a street performance.", correct: "Panel 3 (After that)" },
        { text: "Then, Max played with a ball at the park.", correct: "Panel 2 (Then)" },
        { text: "First, Mia picked up her pencils and paper.", correct: "Panel 1 (First)" },
        { text: "Finally, she showed her finished comic to the class.", correct: "Panel 4 (Finally)" },
        { text: "Then, she sketched the second panel of her story.", correct: "Panel 2 (Then)" },
        { text: "After that, she added captions and speech bubbles.", correct: "Panel 3 (After that)" }
      ]
    }
  ],
  show_tell: {
    steps: 3,
    word_list: ["comic strip", "panel", "caption", "speech bubble", "character", "sketch", "scene", "adventure", "describe", "create", "title", "express"],
    instructions_easy: "Say the word clearly, then add a short phrase, then use it in a Past Simple sentence.",
    instructions_advanced: "Use the word in a full sentence about Leo's comic strip weekend adventure.",
    step_instructions: {
      1: "Step 1: say the word clearly.",
      2: "Step 2: add a short phrase with the word.",
      3: "Step 3: make a full Past Simple sentence about the comic strip."
    },
    frames_easy: ["In Panel One, I ___.", "The caption said: ___"],
    frames_advanced: ["First, I ___. Then, I ___. Finally, I ___."],
    details_easy: [],
    details_advanced: [],
    detail_map: {
      "comic strip": ["comic strip", "a weekend comic strip", "Leo created a comic strip", "Leo created a comic strip about his weekend adventure with his dog Max."],
      "panel": ["panel", "each panel", "In Panel One, Leo drew", "In Panel One, Leo drew the scene where he and Max walked to the park on Saturday morning."],
      "caption": ["caption", "write a caption", "Leo wrote a caption", "Leo wrote a caption under each panel to describe the past action using simple verbs."],
      "speech bubble": ["speech bubble", "a speech bubble", "Max had a speech bubble", "Max had a speech bubble in Panel Two that said: I played all day!"],
      "character": ["character", "the main character", "The main character was", "The main character in Leo's comic strip was his loyal and energetic dog Max."],
      "sketch": ["sketch", "a rough sketch", "First, Leo made a sketch", "First, Leo made a rough sketch of each panel before adding color and captions."],
      "scene": ["scene", "describe the scene", "Leo described the scene", "Leo described the scene in Panel Three where everyone stopped to watch the street musician."],
      "adventure": ["adventure", "a weekend adventure", "Leo had an adventure", "Leo had a wonderful weekend adventure in the park that became the story of his comic strip."],
      "describe": ["describe", "describe a moment", "Leo described the moment", "Leo carefully described the moment the street musician arrived using a vivid Past Simple caption."],
      "create": ["create", "create a story", "Leo decided to create", "Leo decided to create a four-panel comic strip to show everything he and Max did last weekend."],
      "title": ["title", "write the title", "Leo wrote the title", "Leo wrote the title 'My Weekend Adventure' at the very top of his comic strip with a big proud smile."],
      "express": ["express", "express your ideas", "The comic strip expressed", "The comic strip expressed Leo's feelings perfectly, showing he was happy, surprised, and finally tired."]
    },
    distractor_map: {
      "comic strip": ["newspaper", "magazine", "poster"],
      "panel": ["page", "chapter", "book"],
      "caption": ["title", "heading", "label"],
      "speech bubble": ["thought cloud", "text box", "caption box"],
      "character": ["actor", "author", "narrator"],
      "sketch": ["painting", "photograph", "poster"],
      "scene": ["chapter", "paragraph", "sentence"],
      "adventure": ["journey", "mistake", "lesson"],
      "describe": ["explain", "compare", "predict"],
      "create": ["copy", "erase", "delete"],
      "title": ["subtitle", "caption", "label"],
      "express": ["hide", "forget", "ignore"]
    }
  },
  make_sentence: {
    instructions_easy: "Unscramble the words to make a Past Simple sentence about Leo's comic strip.",
    instructions_advanced: "Unscramble the words to make a correct Past Simple sentence using comic strip vocabulary.",
    sentences_easy: [
      { scrambled: ["Leo", "a", "created", "comic", "strip"], answer: "Leo created a comic strip." },
      { scrambled: ["He", "the", "wrote", "title", "on", "top"], answer: "He wrote the title on top." },
      { scrambled: ["Max", "with", "played", "his", "ball"], answer: "Max played with his ball." },
      { scrambled: ["They", "home", "returned", "happy"], answer: "They returned home happy." },
      { scrambled: ["Mia", "the", "described", "scene"], answer: "Mia described the scene." }
    ],
    sentences_advanced: [
      { scrambled: ["a", "Leo", "weekend", "strip", "created", "comic", "his", "about", "adventure"], answer: "Leo created a comic strip about his weekend adventure." },
      { scrambled: ["caption", "a", "he", "wrote", "each", "under", "panel"], answer: "He wrote a caption under each panel." },
      { scrambled: ["bubble", "Leo", "added", "speech", "a", "above", "Max"], answer: "Leo added a speech bubble above Max." },
      { scrambled: ["home", "tired", "returned", "happy", "but", "they"], answer: "They returned home tired but happy." },
      { scrambled: ["Mia", "comic", "a", "sketch", "made", "first", "strip", "of", "the"], answer: "First Mia made a sketch of the comic strip." }
    ]
  }
};

export const week26GamesEasy = {
  title: "Games: My Weekend Story",
  image_url: null,
  audio_url: "/audio/week26/games_main.mp3",
  games: [
    {
      id: "word_match_easy",
      type: "matching",
      title_en: "Word Match",
      instruction_en: "Match each English word to its Vietnamese meaning.",
      instruction_vi: "Noi moi tu tieng Anh voi nghia tieng Viet.",
      cards: [
        { id: "a1", type: "word", value: "weekend" }, { id: "a2", type: "meaning", value: "cuoi tuan" },
        { id: "b1", type: "word", value: "comic" }, { id: "b2", type: "meaning", value: "truyen tranh" },
        { id: "c1", type: "word", value: "panel" }, { id: "c2", type: "meaning", value: "khung ve" },
        { id: "d1", type: "word", value: "happy" }, { id: "d2", type: "meaning", value: "hanh phuc" }
      ]
    },
    {
      id: "panel_sequence_easy",
      type: "sorting",
      title_en: "Put the Panels in Order!",
      instruction_en: "Drag each sentence to the correct position: FIRST, MIDDLE, or LAST.",
      instruction_vi: "Keo moi cau vao dung vi tri: FIRST, MIDDLE, hoac LAST.",
      categories: ["FIRST", "MIDDLE", "LAST"],
      items: [
        { text: "Finally, I went to bed happy.", correct: "LAST" },
        { text: "First, I woke up on Saturday.", correct: "FIRST" },
        { text: "Then, I played at the park.", correct: "MIDDLE" },
        { text: "First, Leo picked up his pencil.", correct: "FIRST" },
        { text: "Finally, Leo finished his comic strip.", correct: "LAST" },
        { text: "Then, Leo drew the second panel.", correct: "MIDDLE" }
      ]
    }
  ],
  show_tell: {
    steps: 3,
    word_list: ["comic", "panel", "caption", "weekend", "happy", "tired", "park", "draw", "write", "create", "friend", "play"],
    instructions_easy: "Say the word clearly, then add a short phrase, then use it in a simple sentence.",
    instructions_advanced: "Use the word in a full sentence about your weekend.",
    step_instructions: {
      1: "Step 1: say the word clearly.",
      2: "Step 2: add a short phrase.",
      3: "Step 3: make a simple Past Simple sentence."
    },
    frames_easy: ["I ___ last weekend.", "It was ___."],
    frames_advanced: ["Last weekend, I ___. It was ___."],
    details_easy: [],
    details_advanced: [],
    detail_map: {
      "comic": ["comic", "a comic strip", "I drew a comic", "I drew a comic about my weekend."],
      "panel": ["panel", "each panel", "I drew each panel", "I drew four panels for my comic strip."],
      "caption": ["caption", "write a caption", "I wrote a caption", "I wrote a caption under each panel."],
      "weekend": ["weekend", "last weekend", "Last weekend I", "Last weekend I played at the park with my friend."],
      "happy": ["happy", "very happy", "I was happy", "I was happy because I had a good weekend."],
      "tired": ["tired", "very tired", "I was tired", "I was tired but happy after my long day."],
      "park": ["park", "the park", "I went to the park", "I went to the park and played on Saturday."],
      "draw": ["draw", "draw a picture", "I drew a picture", "I drew a picture of the park in my comic strip."],
      "write": ["write", "write a sentence", "I wrote a sentence", "I wrote a sentence under each picture."],
      "create": ["create", "create a story", "I created a story", "I created a story about my weekend."],
      "friend": ["friend", "my friend", "I played with my friend", "I played with my friend at the park on Saturday."],
      "play": ["play", "play at the park", "I played at the park", "I played at the park all morning on Saturday."]
    },
    distractor_map: {
      "comic": ["book", "film", "game"],
      "panel": ["page", "box", "circle"],
      "caption": ["title", "word", "letter"],
      "weekend": ["weekday", "morning", "holiday"],
      "happy": ["sad", "tired", "angry"],
      "tired": ["happy", "excited", "proud"],
      "park": ["school", "home", "shop"],
      "draw": ["write", "read", "eat"],
      "write": ["draw", "run", "sleep"],
      "create": ["erase", "copy", "delete"],
      "friend": ["teacher", "parent", "stranger"],
      "play": ["sleep", "study", "eat"]
    }
  },
  make_sentence: {
    instructions_easy: "Put the words in order to make a sentence about the weekend.",
    instructions_advanced: "Unscramble to make a correct Past Simple sentence.",
    sentences_easy: [
      { scrambled: ["I", "the", "went", "to", "park"], answer: "I went to the park." },
      { scrambled: ["It", "sunny", "was"], answer: "It was sunny." },
      { scrambled: ["I", "happy", "was"], answer: "I was happy." },
      { scrambled: ["I", "home", "returned"], answer: "I returned home." },
      { scrambled: ["We", "all", "played", "day"], answer: "We played all day." }
    ],
    sentences_advanced: [
      { scrambled: ["Leo", "strip", "comic", "made", "a"], answer: "Leo made a comic strip." },
      { scrambled: ["They", "the", "park", "at", "played"], answer: "They played at the park." },
      { scrambled: ["I", "a", "drew", "panel", "comic"], answer: "I drew a comic panel." },
      { scrambled: ["We", "home", "went", "happy"], answer: "We went home happy." },
      { scrambled: ["Leo", "the", "wrote", "caption"], answer: "Leo wrote the caption." }
    ]
  },
  ask_me: {
    instructions_easy: 'Ask a simple question about Leo\'s comic strip or weekend.',
    instructions_advanced: 'Ask a Past Simple question about Leo\'s weekend comic strip that matches the context.',
    contexts_easy: [
      {
        id: 'w26_leo_panel_one',
        task_type: 'find_question',
        topic: 'comic strip panels',
        intro: 'Leo drew Panel One about the park visit. Ask where Leo and Max went.',
        acceptedQuestions: ['Where did Leo and Max go?', 'Where did they go on Saturday?', 'Where did Leo go?'],
        answer: 'Leo and Max visited the park on Saturday morning.',
        question_hints: ['Where did Leo and Max go?', 'Where did they go?'],
        required_question_words: ['where', 'did'],
        required_keywords: ['leo', 'max', 'go'],
        hints: { words: ['where', 'did', 'leo', 'max', 'go'], tricky: ['what', 'when'] }
      },
      {
        id: 'w26_max_ball',
        task_type: 'find_question',
        topic: 'comic strip panels',
        intro: 'Max played with his ball in Panel Two. Ask what Max played with.',
        acceptedQuestions: ['What did Max play with?', 'What did Max have?', 'What was Max doing?'],
        answer: 'Max played with his ball for one hour.',
        question_hints: ['What did Max play with?', 'What did Max have?'],
        required_question_words: ['what', 'did'],
        required_keywords: ['max', 'play'],
        hints: { words: ['what', 'did', 'max', 'play', 'with'], tricky: ['where', 'why'] }
      },
      {
        id: 'w26_how_they_felt',
        task_type: 'find_question',
        topic: 'emotions past tense',
        intro: 'Leo and Max went home tired but happy. Ask how they felt.',
        acceptedQuestions: ['How did they feel?', 'How did Leo and Max feel?', 'Were they happy?'],
        answer: 'They were tired but very happy.',
        question_hints: ['How did they feel?', 'Were they happy?'],
        required_question_words: ['how', 'feel'],
        required_keywords: ['they', 'feel'],
        hints: { words: ['how', 'did', 'they', 'feel'], tricky: ['what', 'where'] }
      }
    ],
    contexts_advanced: [
      {
        id: 'w26_adv_caption_panel',
        task_type: 'find_question',
        topic: 'comic strip grammar',
        intro: 'Leo wrote \'It was sunny and warm\' as a caption. Ask which grammar rule he used.',
        acceptedQuestions: ['Which grammar rule did Leo use?', 'Why did Leo use WAS?', 'What tense did Leo write in?'],
        answer: 'Leo used Past Simple — WAS because IT is a singular subject.',
        question_hints: ['Which grammar rule did Leo use?', 'Why did Leo use WAS?'],
        required_question_words: ['which', 'grammar', 'why'],
        required_keywords: ['was', 'grammar', 'past'],
        hints: { words: ['which', 'grammar', 'rule', 'was', 'tense'], tricky: ['is', 'are'] }
      }
    ]
  }
};

export default week26GamesAdvanced;
