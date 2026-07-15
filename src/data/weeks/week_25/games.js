export const week25GamesAdvanced = {
  title: "Games: Sequencing Actions",
  image_url: null,
  audio_url: "/audio/week25/games_main.mp3",
  games: [
    {
      id: "sequence_match",
      type: "matching",
      title_en: "Connector Match",
      instruction_en: "Match each sequence connector to its Vietnamese meaning.",
      instruction_vi: "Noi moi tu noi trinh tu voi nghia tieng Viet.",
      cards: [
        { id: "a1", type: "word", value: "First" }, { id: "a2", type: "meaning", value: "dau tien" },
        { id: "b1", type: "word", value: "Next" }, { id: "b2", type: "meaning", value: "tiep theo" },
        { id: "c1", type: "word", value: "Then" }, { id: "c2", type: "meaning", value: "sau do" },
        { id: "d1", type: "word", value: "Finally" }, { id: "d2", type: "meaning", value: "cuoi cung" },
        { id: "e1", type: "word", value: "sequence" }, { id: "e2", type: "meaning", value: "trinh tu" },
        { id: "f1", type: "word", value: "step" }, { id: "f2", type: "meaning", value: "buoc" },
        { id: "g1", type: "word", value: "spread" }, { id: "g2", type: "meaning", value: "phet / dan deu" }
      ]
    },
    {
      id: "step_sort",
      type: "sorting",
      title_en: "Sort by Step!",
      instruction_en: "Drag each sentence to the correct position: FIRST, MIDDLE, or LAST.",
      instruction_vi: "Keo moi cau vao dung vi tri: FIRST (dau), MIDDLE (giua), hoac LAST (cuoi).",
      categories: ["FIRST", "MIDDLE", "LAST"],
      items: [
        { text: "Finally, cut the sandwich.", correct: "LAST" },
        { text: "First, get the bread.", correct: "FIRST" },
        { text: "Then, press slices together.", correct: "MIDDLE" },
        { text: "Next, spread the jam.", correct: "MIDDLE" },
        { text: "First, squeeze toothpaste.", correct: "FIRST" },
        { text: "Finally, tidy up.", correct: "LAST" },
        { text: "Then, rinse your mouth.", correct: "MIDDLE" },
        { text: "Next, brush your teeth.", correct: "MIDDLE" }
      ]
    }
  ],
  show_tell: {
    steps: 3,
    word_list: ['bread', 'jam', 'spread', 'knife', 'toothpaste', 'brush', 'rinse', 'squeeze', 'step', 'sequence', 'pour', 'tidy'],
    instructions_easy: 'Say the word clearly, then add a short phrase, then use it in a sequence sentence.',
    instructions_advanced: 'Use the word in a full sentence with a sequence connector.',
    step_instructions: {
      1: 'Step 1: say the word clearly.',
      2: 'Step 2: add a short phrase with the word.',
      3: 'Step 3: make a full sequence sentence.'
    },
    frames_easy: ['First, I ___', 'Then, I ___'],
    frames_advanced: ['First, I ___. Next, I ___. Finally, I ___.'],
    details_easy: [],
    details_advanced: [],
    detail_map: {
      'bread': ['bread', 'two slices of bread', 'First, I take the bread', 'First, I took two slices of bread from the bag before I spread the jam.'],
      'jam': ['jam', 'strawberry jam', 'Next, I spread the jam', 'Next, I spread strawberry jam on one slice of bread with a knife.'],
      'spread': ['spread', 'spread jam on', 'Next, I spread the jam', 'Next, I used a knife to spread jam evenly on the bread.'],
      'knife': ['knife', 'use a knife', 'Next, I used the knife', 'Next, I picked up the knife and spread jam on the slice.'],
      'toothpaste': ['toothpaste', 'squeeze toothpaste', 'First, I squeezed the toothpaste', 'First, I squeezed a little toothpaste onto my toothbrush.'],
      'brush': ['brush', 'brush my teeth', 'Next, I brushed my teeth', 'Next, I brushed all my teeth carefully for two full minutes.'],
      'rinse': ['rinse', 'rinse my mouth', 'Then, I rinsed my mouth', 'Then, I rinsed my mouth thoroughly with clean cold water.'],
      'squeeze': ['squeeze', 'squeeze out', 'First, I squeezed', 'First, I squeezed some toothpaste out of the tube onto my brush.'],
      'step': ['step', 'each step', 'I followed each step', 'I followed each step in the right order to make a perfect sandwich.'],
      'sequence': ['sequence', 'the right sequence', 'follow the sequence', 'Mia told Leo to follow the sequence: First, Next, Then, Finally.'],
      'pour': ['pour', 'pour into a glass', 'Then, I poured', 'Then, I poured the juice carefully into the glass without spilling.'],
      'tidy': ['tidy', 'tidy up', 'Finally, I tidied up', 'Finally, I tidied up the kitchen and washed my hands after cooking.']
    },
    distractor_map: {
      'bread': ['juice', 'toothpaste', 'water'],
      'jam': ['butter', 'cheese', 'honey'],
      'spread': ['squeeze', 'pour', 'rinse'],
      'knife': ['spoon', 'fork', 'plate'],
      'toothpaste': ['jam', 'cream', 'butter'],
      'brush': ['knife', 'spoon', 'cloth'],
      'rinse': ['spread', 'squeeze', 'slice'],
      'squeeze': ['pour', 'spread', 'rinse'],
      'step': ['jump', 'run', 'skip'],
      'sequence': ['chapter', 'story', 'sentence'],
      'pour': ['spread', 'squeeze', 'brush'],
      'tidy': ['squeeze', 'spread', 'rinse']
    }
  },
  make_sentence: {
    instructions_easy: 'Unscramble the words to make a sequence sentence.',
    instructions_advanced: 'Unscramble the words to make a correct sequence sentence.',
    sentences_easy: [
      { scrambled: ['First', 'I', 'the', 'bread', 'got'], answer: 'First I got the bread.' },
      { scrambled: ['Next', 'I', 'jam', 'spread', 'the'], answer: 'Next I spread the jam.' },
      { scrambled: ['Then', 'I', 'them', 'pressed', 'together'], answer: 'Then I pressed them together.' },
      { scrambled: ['Finally', 'I', 'the', 'sandwich', 'cut'], answer: 'Finally I cut the sandwich.' },
      { scrambled: ['First', 'I', 'toothpaste', 'squeezed'], answer: 'First I squeezed toothpaste.' }
    ],
    sentences_advanced: [
      { scrambled: ['slices', 'two', 'First', 'took', 'I', 'of', 'bread'], answer: 'First I took two slices of bread.' },
      { scrambled: ['knife', 'the', 'I', 'a', 'used', 'Next', 'to', 'spread', 'jam'], answer: 'Next I used a knife to spread jam.' },
      { scrambled: ['squeezed', 'First', 'toothpaste', 'some', 'I', 'onto', 'brush', 'my'], answer: 'First I squeezed some toothpaste onto my brush.' },
      { scrambled: ['mouth', 'Then', 'I', 'rinsed', 'clean', 'my', 'water', 'with'], answer: 'Then I rinsed my mouth with clean water.' },
      { scrambled: ['up', 'tidied', 'I', 'kitchen', 'Finally', 'the'], answer: 'Finally I tidied up the kitchen.' }
    ]
  },
  ask_me: {
    instructions_easy: 'Ask a simple question about the sequence of steps.',
    instructions_advanced: 'Ask a sequencing question that matches the context and uses the correct connector.',
    contexts_easy: [
      {
        id: 'w25_leo_first_step',
        task_type: 'find_question',
        topic: 'sequencing actions',
        intro: 'Leo made a sandwich. Ask what he did FIRST.',
        acceptedQuestions: ['What did Leo do first?', 'What was the first step?', 'What did he do first?'],
        answer: 'First, Leo took two slices of bread.',
        question_hints: ['What did Leo do first?', 'What was the first step?'],
        required_question_words: ['what', 'first'],
        required_keywords: ['leo', 'first'],
        hints: { words: ['what', 'did', 'leo', 'do', 'first'], tricky: ['where', 'when'] }
      },
      {
        id: 'w25_mia_last_step',
        task_type: 'find_question',
        topic: 'sequencing actions',
        intro: 'Mia brushed her teeth. Ask what she did FINALLY.',
        acceptedQuestions: ['What did Mia do finally?', 'What was the last step?', 'What did she do at the end?'],
        answer: 'Finally, Mia tidied up the bathroom and washed her hands.',
        question_hints: ['What did Mia do finally?', 'What was the last step?'],
        required_question_words: ['what', 'finally'],
        required_keywords: ['mia', 'finally'],
        hints: { words: ['what', 'did', 'mia', 'do', 'finally'], tricky: ['why', 'how'] }
      },
      {
        id: 'w25_order_matters',
        task_type: 'find_question',
        topic: 'sequencing actions',
        intro: 'The order of steps matters when making food. Ask why the order is important.',
        acceptedQuestions: ['Why does the order matter?', 'Why is the order important?', 'Why must steps be in order?'],
        answer: 'The order matters because each step depends on the one before it.',
        question_hints: ['Why does the order matter?', 'Why is the order important?'],
        required_question_words: ['why', 'order'],
        required_keywords: ['order', 'why'],
        hints: { words: ['why', 'does', 'the', 'order', 'matter'], tricky: ['what', 'where'] }
      }
    ],
    contexts_advanced: [
      {
        id: 'w25_adv_sequence_step',
        task_type: 'find_question',
        topic: 'sequencing actions',
        intro: 'Leo pressed the two slices of bread together. Ask which connector describes this step.',
        acceptedQuestions: ['Which connector goes here?', 'What connector does Leo use for this step?', 'Is this step First Next Then or Finally?'],
        answer: 'Then is used — it is a middle step between spreading the jam and cutting the sandwich.',
        question_hints: ['Which connector goes here?', 'Is this step First Next Then or Finally?'],
        required_question_words: ['which', 'connector', 'step'],
        required_keywords: ['connector', 'step', 'then'],
        hints: { words: ['which', 'connector', 'step', 'then', 'middle'], tricky: ['first', 'finally'] }
      }
    ]
  }
};

export default week25GamesAdvanced;
