export const week28GamesEasy = {
  title: "Games: The Tortoise and the Hare",
  image_url: null,
  audio_url: "/audio/week28_easy/games_main.mp3",
  games: [
    {
      id: "fable_vocab_match",
      type: "matching",
      title_en: "Fable Word Match",
      instruction_en: "Match each word to its Vietnamese meaning.",
      instruction_vi: "Nối mỗi từ với nghĩa tiếng Việt.",
      cards: [
        { id: "a1", type: "word", value: "tortoise" }, { id: "a2", type: "meaning", value: "con rua" },
        { id: "b1", type: "word", value: "hare" }, { id: "b2", type: "meaning", value: "con tho" },
        { id: "c1", type: "word", value: "race" }, { id: "c2", type: "meaning", value: "cuoc dua" },
        { id: "d1", type: "word", value: "nap" }, { id: "d2", type: "meaning", value: "ngu nghi" }
      ]
    },
    {
      id: "fable_sequence",
      type: "sorting",
      title_en: "Story Order!",
      instruction_en: "Drag each event into the correct order.",
      instruction_vi: "Kéo mỗi sự kiện vào đúng thứ tự.",
      categories: ["First", "Next", "After that", "Finally"],
      items: [
        { text: "The hare ran very fast ahead.", correct: "Next" },
        { text: "The hare boasted about his speed.", correct: "First" },
        { text: "The tortoise crossed the finish line.", correct: "Finally" },
        { text: "The tortoise walked past the sleeping hare.", correct: "After that" }
      ]
    }
  ],
  show_tell: {
    steps: 2,
    word_list: ["tortoise", "hare", "race", "fast", "slow", "nap", "win", "lose", "cheer", "steady", "start", "finish", "lesson", "car", "bus", "train", "boat", "bicycle", "taxi", "motorbike", "ship"],
    instructions_easy: "Say the word, then make a short sentence about the story.",
    instructions_advanced: "Use the word in a Past Simple sentence about the fable.",
    step_instructions: {
      1: "Step 1: say the word clearly.",
      2: "Step 2: make a sentence with that word."
    },
    frames_easy: ["The ___ ___.", "In the story, the ___ ___."],
    frames_advanced: ["First, the ___. Then, the ___. Finally, ___."],
    details_easy: [],
    details_advanced: [],
    detail_map: {
      "tortoise": ["tortoise", "the slow tortoise", "The tortoise won the race", "The slow tortoise walked steadily and never stopped — he won because he never gave up."],
      "hare": ["hare", "the fast hare", "The hare lost the race", "The fast hare ran ahead and stopped to sleep — he lost because he was too confident."],
      "race": ["race", "the big race", "They ran a race", "The tortoise and the hare ran a race through the forest — it was a very exciting race!"],
      "fast": ["fast", "very fast", "The hare was fast", "The hare was very fast but being fast was not enough to win the race."],
      "slow": ["slow", "slow and steady", "The tortoise was slow", "The tortoise was slow but steady — he never stopped and that is why he won."],
      "nap": ["nap", "took a nap", "The hare took a nap", "The hare was so confident he stopped and took a long nap — that is why he lost."],
      "win": ["win", "win the race", "The tortoise won", "The tortoise won the race because he was steady and never gave up."],
      "lose": ["lose", "lose the race", "The hare lost", "The hare lost the race because he was too proud and stopped to sleep."],
      "cheer": ["cheer", "cheer loudly", "The animals cheered", "All the forest animals cheered loudly when the tortoise crossed the finish line!"],
      "steady": ["steady", "slow and steady", "Slow and steady wins", "Slow and steady wins the race — this is the big lesson of the fable."],
      "start": ["start", "at the start", "At the start of the race", "At the start of the race, the hare ran very fast and the tortoise walked slowly."],
      "finish": ["finish", "cross the finish line", "The tortoise crossed the finish line", "The tortoise crossed the finish line before the hare and won the race!"],
      "lesson": ["lesson", "the lesson of the story", "The lesson is never give up", "The lesson of this fable is slow and steady wins the race — never give up!"]
    },
    distractor_map: {
      "tortoise": ["hare", "bird"],
      "hare": ["tortoise", "fish"],
      "race": ["game", "book"],
      "fast": ["slow", "big"],
      "slow": ["fast", "tall"],
      "nap": ["race", "book"],
      "win": ["lose", "start"],
      "lose": ["win", "finish"],
      "cheer": ["sleep", "run"],
      "steady": ["fast", "loud"],
      "start": ["finish", "nap"],
      "finish": ["start", "race"],
      "lesson": ["story", "race"]
    }
  },
  make_sentence: {
    instructions_easy: "Unscramble the words to make a Past Simple sentence about the story.",
    instructions_advanced: "Unscramble the words to make a correct Past Simple sentence.",
    sentences_easy: [
      { scrambled: ["The", "hare", "ran", "fast"], answer: "The hare ran fast." },
      { scrambled: ["The", "tortoise", "won", "race", "the"], answer: "The tortoise won the race." },
      { scrambled: ["The", "hare", "under", "slept", "tree", "a"], answer: "The hare slept under a tree." },
      { scrambled: ["The", "animals", "cheered", "loudly"], answer: "The animals cheered loudly." },
      { scrambled: ["Finally", "the", "finish", "crossed", "tortoise", "line", "the"], answer: "Finally, the tortoise crossed the finish line." },
      { scrambled: ["The", "hare", "did", "stop", "not"], answer: "The hare did not stop." },
      { scrambled: ["The", "lesson", "is", "never", "give", "up"], answer: "The lesson is never give up." },
      { scrambled: ["First", "hare", "boasted", "the"], answer: "First, the hare boasted." }
    ],
    sentences_advanced: [
      { scrambled: ["the", "fast", "ran", "hare", "and", "got", "very", "ahead", "far"], answer: "The hare ran very fast and got far ahead." },
      { scrambled: ["the", "tortoise", "steady", "kept", "slow", "a", "and", "pace"], answer: "The tortoise kept a slow and steady pace." },
      { scrambled: ["the", "line", "crossed", "finish", "tortoise", "won", "the", "and", "race", "the"], answer: "The tortoise crossed the finish line and won the race." },
      { scrambled: ["hare", "the", "lost", "the", "because", "race", "slept", "he"], answer: "The hare lost the race because he slept." }
    ]
  },
  ask_me: {
    instructions_easy: "Ask a simple question about the story using who, what, or why.",
    instructions_advanced: "Ask a Past Simple question about the fable.",
    contexts_easy: [
      {
        id: "w28e_who_won",
        task_type: "find_question",
        topic: "story events",
        intro: "The tortoise crossed the finish line first. Ask who won the race.",
        acceptedQuestions: ["Who won the race?", "Who won?", "Who crossed the finish line first?"],
        answer: "The tortoise won the race.",
        question_hints: ["Who won the race?", "Who crossed the finish line?"],
        required_question_words: ["who"],
        required_keywords: ["win", "won", "race"],
        hints: { words: ["who", "won", "the", "race"], tricky: ["what", "where"] }
      },
      {
        id: "w28e_why_hare_lost",
        task_type: "find_question",
        topic: "story events",
        intro: "The hare stopped to take a nap in the race. Ask why the hare lost.",
        acceptedQuestions: ["Why did the hare lose?", "Why did the hare lose the race?", "Why did the hare stop?"],
        answer: "The hare lost because he stopped to take a nap.",
        question_hints: ["Why did the hare lose?", "Why did the hare stop?"],
        required_question_words: ["why"],
        required_keywords: ["hare", "lose", "lost"],
        hints: { words: ["why", "did", "the", "hare", "lose"], tricky: ["who", "what"] }
      },
      {
        id: "w28e_what_lesson",
        task_type: "find_question",
        topic: "fable lesson",
        intro: "The story teaches a lesson about trying hard. Ask what the lesson is.",
        acceptedQuestions: ["What is the lesson?", "What is the lesson of the story?", "What does the story teach?"],
        answer: "The lesson is: slow and steady wins the race.",
        question_hints: ["What is the lesson?", "What does this story teach?"],
        required_question_words: ["what"],
        required_keywords: ["lesson", "teach", "moral"],
        hints: { words: ["what", "is", "the", "lesson", "of", "the", "story"], tricky: ["who", "where"] }
      }
    ],
    contexts_advanced: [
      {
        id: "w28e_adv_why_tortoise_won",
        task_type: "find_question",
        topic: "character behavior",
        intro: "The tortoise won even though he was slow. Ask how the tortoise managed to win.",
        acceptedQuestions: ["How did the tortoise win?", "How did the tortoise manage to win?", "How did the tortoise beat the hare?"],
        answer: "The tortoise won because he never stopped walking.",
        question_hints: ["How did the tortoise win?", "How did the tortoise beat the hare?"],
        required_question_words: ["how"],
        required_keywords: ["tortoise", "win", "won"],
        hints: { words: ["how", "did", "the", "tortoise", "win"], tricky: ["why", "who"] }
      },
      {
        id: "w28e_adv_what_hare_did",
        task_type: "find_question",
        topic: "story events",
        intro: "The hare was far ahead but he stopped. Ask what the hare did in the middle of the race.",
        acceptedQuestions: ["What did the hare do in the middle of the race?", "What did the hare do?", "What did the hare do when he was ahead?"],
        answer: "The hare stopped to take a nap under a tree.",
        question_hints: ["What did the hare do in the race?", "What did the hare do when he was ahead?"],
        required_question_words: ["what"],
        required_keywords: ["hare", "did", "race"],
        hints: { words: ["what", "did", "the", "hare", "do"], tricky: ["who", "why"] }
      },
      {
        id: "w28e_adv_irregular",
        task_type: "find_question",
        topic: "grammar review",
        intro: "The hare ran fast. That is Past Simple. Ask what the Past Simple of RUN is.",
        acceptedQuestions: ["What is the Past Simple of run?", "What is the past form of run?", "How do you say run in Past Simple?"],
        answer: "The Past Simple of run is ran.",
        question_hints: ["What is the Past Simple of run?", "How do you say run in the past?"],
        required_question_words: ["what", "how"],
        required_keywords: ["run", "past", "simple"],
        hints: { words: ["what", "is", "the", "past", "simple", "of", "run"], tricky: ["when", "where"] }
      }
    ]
  }
};
