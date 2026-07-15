export const week25GamesEasy = {
  title: "Games: Sequencing Actions",
  image_url: null,
  audio_url: "/audio/week25_easy/games_main.mp3",
  games: [
    {
      id: "connector_match",
      type: "matching",
      title_en: "Connector Match",
      instruction_en: "Match each sequence connector to its Vietnamese meaning.",
      instruction_vi: "Nối mỗi từ nối với nghĩa tiếng Việt.",
      cards: [
        { id: "a1", type: "word", value: "First" }, { id: "a2", type: "meaning", value: "đầu tiên" },
        { id: "b1", type: "word", value: "Next" }, { id: "b2", type: "meaning", value: "tiếp theo" },
        { id: "c1", type: "word", value: "Then" }, { id: "c2", type: "meaning", value: "sau đó" },
        { id: "d1", type: "word", value: "Finally" }, { id: "d2", type: "meaning", value: "cuối cùng" }
      ]
    },
    {
      id: "step_sort",
      type: "sorting",
      title_en: "First or Last? Sort It!",
      instruction_en: "Drag each sentence to the correct column: FIRST or LAST.",
      instruction_vi: "Kéo mỗi câu vào cột đúng: FIRST hoặc LAST.",
      categories: ["FIRST", "LAST"],
      items: [
        { text: "First, get the bread.", correct: "FIRST" },
        { text: "Finally, eat the sandwich.", correct: "LAST" },
        { text: "First, squeeze toothpaste.", correct: "FIRST" },
        { text: "Finally, tidy up.", correct: "LAST" }
      ]
    }
  ],
  show_tell: {
    steps: 2,
    word_list: ['bread', 'jam', 'spread', 'knife', 'toothpaste', 'brush'],
    instructions_easy: 'Say the word, then make a short sentence.',
    instructions_advanced: 'Use the word in a sentence with a sequence connector.',
    step_instructions: {
      1: 'Step 1: say the word clearly.',
      2: 'Step 2: make a sentence using First, Next, Then, or Finally.'
    },
    frames_easy: ['First I ___', 'Then I ___'],
    frames_advanced: ['First, I ___ the ___', 'Finally, I ___'],
    details_easy: [],
    details_advanced: [],
    detail_map: {
      'bread': ['bread', 'get the bread', 'First get the bread', 'First, I get two slices of bread from the bag.'],
      'jam': ['jam', 'spread jam', 'Next spread the jam', 'Next, I spread strawberry jam on the bread.'],
      'spread': ['spread', 'spread jam on', 'Next spread the jam', 'Next, I used a knife to spread jam on the slice.'],
      'knife': ['knife', 'use a knife', 'Next use the knife', 'Next, I picked up the knife to spread the jam.'],
      'toothpaste': ['toothpaste', 'squeeze toothpaste', 'First squeeze toothpaste', 'First, I squeezed toothpaste onto my brush.'],
      'brush': ['brush', 'brush my teeth', 'Next brush my teeth', 'Next, I brushed my teeth for two minutes.']
    },
    distractor_map: {
      'bread': ['juice', 'butter'], 'jam': ['butter', 'honey'],
      'spread': ['pour', 'rinse'], 'knife': ['spoon', 'fork'],
      'toothpaste': ['jam', 'soap'], 'brush': ['knife', 'cloth']
    }
  },
  make_sentence: {
    instructions_easy: 'Unscramble the words to make a sequence sentence.',
    instructions_advanced: 'Unscramble the words to make a correct sequence sentence.',
    sentences_easy: [
      { scrambled: ['First', 'I', 'got', 'bread'], answer: 'First I got bread.' },
      { scrambled: ['Next', 'I', 'spread', 'jam'], answer: 'Next I spread jam.' },
      { scrambled: ['Then', 'I', 'pressed', 'together'], answer: 'Then I pressed together.' },
      { scrambled: ['Finally', 'I', 'cut', 'it'], answer: 'Finally I cut it.' },
      { scrambled: ['First', 'I', 'squeezed', 'toothpaste'], answer: 'First I squeezed toothpaste.' },
      { scrambled: ['Then', 'I', 'rinsed', 'mouth'], answer: 'Then I rinsed mouth.' },
      { scrambled: ['Next', 'I', 'brushed', 'teeth'], answer: 'Next I brushed teeth.' },
      { scrambled: ['Finally', 'I', 'tidied', 'up'], answer: 'Finally I tidied up.' }
    ],
    sentences_advanced: [
      { scrambled: ['First', 'I', 'took', 'two', 'slices', 'of', 'bread'], answer: 'First I took two slices of bread.' },
      { scrambled: ['Next', 'I', 'spread', 'jam', 'with', 'a', 'knife'], answer: 'Next I spread jam with a knife.' },
      { scrambled: ['First', 'I', 'squeezed', 'toothpaste', 'onto', 'my', 'brush'], answer: 'First I squeezed toothpaste onto my brush.' },
      { scrambled: ['Then', 'I', 'rinsed', 'my', 'mouth', 'with', 'water'], answer: 'Then I rinsed my mouth with water.' },
      { scrambled: ['Finally', 'I', 'tidied', 'up', 'the', 'kitchen'], answer: 'Finally I tidied up the kitchen.' }
    ]
  },
  ask_me: {
    instructions_easy: 'Ask a simple question about the steps.',
    instructions_advanced: 'Ask a question about the sequence.',
    contexts_easy: [
      {
        id: 'w25_easy_first_step',
        task_type: 'find_question',
        topic: 'sequencing',
        intro: 'Sam made a sandwich. Ask what he did first.',
        acceptedQuestions: ['What did Sam do first?', 'What was the first step?', 'What did he do first?'],
        answer: 'First, Sam got two slices of bread.',
        question_hints: ['What did Sam do first?', 'What was first?'],
        required_question_words: ['what', 'first'],
        required_keywords: ['first'],
        hints: { words: ['what', 'did', 'sam', 'do', 'first'], tricky: ['where', 'when'] }
      },
      {
        id: 'w25_easy_last_step',
        task_type: 'find_question',
        topic: 'sequencing',
        intro: 'Sam finished making a sandwich. Ask what he did finally.',
        acceptedQuestions: ['What did Sam do finally?', 'What was the last step?', 'What happened last?'],
        answer: 'Finally, Sam cut the sandwich in half.',
        question_hints: ['What did Sam do finally?', 'What was last?'],
        required_question_words: ['what', 'finally'],
        required_keywords: ['finally'],
        hints: { words: ['what', 'did', 'sam', 'do', 'finally'], tricky: ['why', 'how'] }
      },
      {
        id: 'w25_easy_order',
        task_type: 'find_question',
        topic: 'sequencing',
        intro: 'The order of steps is important. Ask why.',
        acceptedQuestions: ['Why is the order important?', 'Why do steps need to be in order?', 'Why does order matter?'],
        answer: 'The order matters because each step depends on the one before.',
        question_hints: ['Why is the order important?', 'Why does the order matter?'],
        required_question_words: ['why', 'order'],
        required_keywords: ['order', 'why'],
        hints: { words: ['why', 'is', 'the', 'order', 'important'], tricky: ['what', 'where'] }
      }
    ],
    contexts_advanced: [
      {
        id: 'w25_easy_adv',
        task_type: 'find_question',
        topic: 'sequencing',
        intro: 'Sam pressed the slices together. Ask which step this is.',
        acceptedQuestions: ['Which step is pressing the slices?', 'Is this the third step?', 'What connector goes with pressing the slices?'],
        answer: 'Pressing the slices is the THEN step — it is in the middle.',
        question_hints: ['Is this First Next Then or Finally?', 'Which step is this?'],
        required_question_words: ['which', 'step'],
        required_keywords: ['step', 'then'],
        hints: { words: ['which', 'step', 'pressing', 'then', 'middle'], tricky: ['first', 'finally'] }
      }
    ]
  }
};

export default week25GamesEasy;
