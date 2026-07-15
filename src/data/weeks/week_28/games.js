export const week28GamesAdvanced = {
  title: "Games: The Tortoise and the Hare",
  image_url: null,
  audio_url: "/audio/week28/games_main.mp3",
  games: [
    {
      id: "fable_vocab_match",
      type: "matching",
      title_en: "Fable Vocabulary Match",
      instruction_en: "Match each word to its Vietnamese meaning.",
      instruction_vi: "Noi moi tu voi nghia tieng Viet.",
      cards: [
        { id: "a1", type: "word", value: "tortoise" }, { id: "a2", type: "meaning", value: "con rua" },
        { id: "b1", type: "word", value: "hare" }, { id: "b2", type: "meaning", value: "con tho" },
        { id: "c1", type: "word", value: "race" }, { id: "c2", type: "meaning", value: "cuoc dua" },
        { id: "d1", type: "word", value: "boast" }, { id: "d2", type: "meaning", value: "tu hao khoe khoang" },
        { id: "e1", type: "word", value: "moral" }, { id: "e2", type: "meaning", value: "bai hoc dao duc" },
        { id: "f1", type: "word", value: "persevere" }, { id: "f2", type: "meaning", value: "kien tri" },
        { id: "g1", type: "word", value: "fable" }, { id: "g2", type: "meaning", value: "truyen ngu ngon" }
      ]
    },
    {
      id: "fable_sequence",
      type: "sorting",
      title_en: "Fable Story Sequence!",
      instruction_en: "Drag each event into the correct order of the story.",
      instruction_vi: "Keo moi su kien vao dung thu tu cua cau chuyen.",
      categories: ["Step 1 (First)", "Step 2 (Next)", "Step 3 (After that)", "Step 4 (Finally)"],
      items: [
        { text: "The hare boasted that he was the fastest animal.", correct: "Step 1 (First)" },
        { text: "The tortoise challenged the hare to a race.", correct: "Step 1 (First)" },
        { text: "The hare ran so fast he got very far ahead.", correct: "Step 2 (Next)" },
        { text: "The hare stopped and took a nap under a tree.", correct: "Step 2 (Next)" },
        { text: "The tortoise kept walking slowly and steadily.", correct: "Step 3 (After that)" },
        { text: "The tortoise walked past the sleeping hare.", correct: "Step 3 (After that)" },
        { text: "The tortoise crossed the finish line and won.", correct: "Step 4 (Finally)" },
        { text: "Everyone learned: slow and steady wins the race.", correct: "Step 4 (Finally)" }
      ]
    }
  ],
  show_tell: {
    steps: 3,
    word_list: ["tortoise", "hare", "race", "boast", "steady", "nap", "determined", "cheer", "confident", "moral", "overtake", "fable", "persevere", "car", "bus", "train", "boat", "bicycle", "taxi", "motorbike", "ship"],
    instructions_easy: "Say the word clearly, then add a short phrase, then use it in a Past Simple sentence about the fable.",
    instructions_advanced: "Use the word in a full Past Simple sentence about the story of the tortoise and the hare.",
    step_instructions: {
      1: "Step 1: say the word clearly.",
      2: "Step 2: add a short phrase with the word.",
      3: "Step 3: make a full Past Simple sentence about the fable."
    },
    frames_easy: ["The ___ was ___.", "The ___ ___ (past verb)."],
    frames_advanced: ["First, the ___. Then, the ___. Finally, ___."],
    details_easy: [],
    details_advanced: [],
    detail_map: {
      "tortoise": ["tortoise", "the slow tortoise", "The tortoise won the race", "The slow but determined tortoise walked steadily and never gave up — he won the race against the confident hare."],
      "hare": ["hare", "the fast hare", "The hare lost the race", "The fast hare boasted about his speed but stopped to nap mid-race — he lost because of his overconfidence."],
      "race": ["race", "the big race", "They ran a race through the forest", "The tortoise challenged the hare to a race through the forest — and it became the most famous race in all of fable history."],
      "boast": ["boast", "boast about winning", "The hare boasted about his speed", "The hare boasted to all the forest animals that nobody could ever beat him in a race — but the tortoise proved him wrong."],
      "steady": ["steady", "slow and steady", "The tortoise kept a steady pace", "The tortoise kept a slow and steady pace the entire race — he never rushed, and that steady effort brought him victory."],
      "nap": ["nap", "took a nap", "The hare took a long nap", "The hare felt so confident that he stopped under a shady tree and took a long nap — and that nap cost him the race."],
      "determined": ["determined", "a determined tortoise", "The tortoise was determined to finish", "Even when everyone laughed at him, the determined tortoise refused to quit — his determination was stronger than the hare's speed."],
      "cheer": ["cheer", "cheer for someone", "The animals cheered for the tortoise", "All the forest animals cheered loudly as the tortoise crossed the finish line — nobody had expected him to win."],
      "confident": ["confident", "too confident", "The hare was too confident", "The hare was so confident in his speed that he did not think he needed to run hard — and that overconfidence led to his defeat."],
      "moral": ["moral", "the moral of the story", "The moral is slow and steady wins", "The moral of this fable is that slow and steady wins the race — it is more important to be persistent than to be fast."],
      "overtake": ["overtake", "overtake the hare", "The tortoise overtook the sleeping hare", "While the hare slept, the tortoise slowly overtook him — step by step, he passed the hare and moved toward the finish."],
      "fable": ["fable", "an Aesop fable", "This is a famous fable by Aesop", "A fable is a short story with a moral lesson — this fable by Aesop has been told for thousands of years because its lesson is so wise."],
      "persevere": ["persevere", "persevere to the end", "The tortoise persevered to the finish", "The tortoise persevered all the way to the finish line — he never stopped, never doubted himself, and that is why he won."]
    }
  },
  make_sentence: {
    instructions_easy: "Unscramble the words to make a Past Simple sentence about the fable.",
    instructions_advanced: "Unscramble the words to make a correct Past Simple sentence using fable vocabulary.",
    sentences_easy: [
      { scrambled: ["The", "hare", "ran", "very", "fast"], answer: "The hare ran very fast." },
      { scrambled: ["The", "tortoise", "won", "the", "race"], answer: "The tortoise won the race." },
      { scrambled: ["The", "hare", "slept", "under", "a", "tree"], answer: "The hare slept under a tree." },
      { scrambled: ["The", "animals", "cheered", "for", "the", "tortoise"], answer: "The animals cheered for the tortoise." },
      { scrambled: ["They", "ran", "through", "the", "forest"], answer: "They ran through the forest." }
    ],
    sentences_advanced: [
      { scrambled: ["the", "hare", "boasted", "about", "speed", "his", "to", "animals", "all", "the"], answer: "The hare boasted about his speed to all the animals." },
      { scrambled: ["determined", "the", "tortoise", "was", "and", "nap", "a", "took", "never"], answer: "The determined tortoise never took a nap." },
      { scrambled: ["the", "hare", "overtook", "sleeping", "the", "tortoise", "quietly"], answer: "The tortoise quietly overtook the sleeping hare." },
      { scrambled: ["hare", "the", "overconfident", "because", "lost", "he", "too", "was"], answer: "The hare lost because he was too overconfident." },
      { scrambled: ["the", "moral", "this", "of", "fable", "is", "that", "steady", "slow", "and", "wins"], answer: "The moral of this fable is that slow and steady wins." }
    ]
  },
  ask_me: {
    instructions_easy: "Ask a simple question about the fable using who, what, where, or why.",
    instructions_advanced: "Ask a Past Simple question about the fable that uses advanced vocabulary.",
    contexts_easy: [
      {
        id: "w28_who_won",
        task_type: "find_question",
        topic: "fable characters",
        intro: "In the race, the tortoise crossed the finish line first. Ask who won the race.",
        acceptedQuestions: ["Who won the race?", "Who won?", "Who crossed the finish line first?"],
        answer: "The tortoise won the race.",
        question_hints: ["Who won the race?", "Who crossed the finish line?"],
        required_question_words: ["who"],
        required_keywords: ["win", "won", "race"],
        hints: { words: ["who", "won", "the", "race"], tricky: ["what", "where"] }
      },
      {
        id: "w28_why_hare_lost",
        task_type: "find_question",
        topic: "story events",
        intro: "The hare stopped to sleep in the middle of the race. Ask why the hare lost.",
        acceptedQuestions: ["Why did the hare lose?", "Why did the hare lose the race?", "Why did the hare stop?"],
        answer: "The hare lost because he stopped to take a nap.",
        question_hints: ["Why did the hare lose?", "Why did the hare stop?"],
        required_question_words: ["why"],
        required_keywords: ["hare", "lose", "lost"],
        hints: { words: ["why", "did", "the", "hare", "lose"], tricky: ["who", "what"] }
      },
      {
        id: "w28_what_moral",
        task_type: "find_question",
        topic: "fable lesson",
        intro: "The story teaches us that slow and steady wins the race. Ask what the moral is.",
        acceptedQuestions: ["What is the moral of the story?", "What is the moral?", "What does the fable teach us?"],
        answer: "The moral is: slow and steady wins the race.",
        question_hints: ["What is the moral?", "What does this story teach?"],
        required_question_words: ["what"],
        required_keywords: ["moral", "lesson", "teach"],
        hints: { words: ["what", "is", "the", "moral", "of", "the", "story"], tricky: ["who", "where"] }
      }
    ],
    contexts_advanced: [
      {
        id: "w28_adv_boast",
        task_type: "find_question",
        topic: "character traits",
        intro: "The hare boasted about his speed because he was overconfident. Ask what caused the hare to boast.",
        acceptedQuestions: ["What caused the hare to boast?", "Why did the hare boast about his speed?", "What made the hare so overconfident?"],
        answer: "The hare boasted because he was overconfident about his speed.",
        question_hints: ["What caused the hare to boast?", "Why did the hare boast?"],
        required_question_words: ["what", "why"],
        required_keywords: ["boast", "hare", "confident", "overconfident"],
        hints: { words: ["what", "caused", "the", "hare", "to", "boast"], tricky: ["who", "when"] }
      },
      {
        id: "w28_adv_persevere",
        task_type: "find_question",
        topic: "fable theme",
        intro: "The tortoise persevered despite being much slower than the hare. Ask how the tortoise managed to win.",
        acceptedQuestions: ["How did the tortoise manage to win?", "How did the tortoise win the race?", "How did the tortoise overtake the hare?"],
        answer: "The tortoise won by persevering and walking steadily without stopping.",
        question_hints: ["How did the tortoise win?", "How did the tortoise manage to win?"],
        required_question_words: ["how"],
        required_keywords: ["tortoise", "win", "won", "persevere"],
        hints: { words: ["how", "did", "the", "tortoise", "manage", "to", "win"], tricky: ["why", "who"] }
      },
      {
        id: "w28_adv_moral_lesson",
        task_type: "find_question",
        topic: "moral and fable genre",
        intro: "This fable by Aesop teaches that perseverance is more powerful than overconfidence. Ask what we can learn from the tortoise's behavior.",
        acceptedQuestions: ["What can we learn from the tortoise's behavior?", "What does the tortoise's behavior teach us?", "What lesson does the tortoise demonstrate?"],
        answer: "The tortoise's behavior teaches us that determination and steady effort lead to success.",
        question_hints: ["What can we learn from the tortoise?", "What lesson does the tortoise show us?"],
        required_question_words: ["what"],
        required_keywords: ["tortoise", "learn", "lesson", "teach"],
        hints: { words: ["what", "can", "we", "learn", "from", "the", "tortoise"], tricky: ["who", "how"] }
      }
    ]
  }
};
