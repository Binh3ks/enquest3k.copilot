/**
 * STAGED MOCK EXAM DELIVERABLE: Reading & Writing Paper (All 7 Parts / 44 Items)
 * Week: 36 | Level: Cambridge A2 Flyers | Mode: FULL_MOCK
 * Pipeline: scripts/generate_mock_exam_content.mjs (Round 65 Pilot Mock)
 * Cumulative Sourcing: Weeks 33, 34, 35, 36
 */

export const readingHubData = {
  week: 36,
  theme: "Review & Project 3: \"My Adventure Book\"",
  cefr_level: "A2 Flyers",
  paper: "Reading & Writing",
  total_parts: 7,
  total_items: 44,
  time_allowed_minutes: 40,

  // ── Part 1: Definitions to Word Bank (10 items / 15 candidates) ───────────
  rw_part1: {
    part: 1,
    instructions: "Look and read. Choose the correct words and write them on the lines. There is one example.",
    words_bank: [
      "a compass", "a bandage", "a backpack", "a forest", "a flashlight",
      "a corridor", "a tent", "a campfire", "a hunter", "a photograph",
      "an adventure", "a journey", "a net", "medicine", "a diary"
    ],
    example: { definition: "An instrument with a magnetic needle that points to the north.", word: "a compass" },
    items: [
      { id: 1, definition: "A long hallway in a school or hospital connecting classrooms and rooms.", answer: "a corridor" },
      { id: 2, definition: "A piece of soft white cloth used to wrap around a cut or a sprained wrist.", answer: "a bandage" },
      { id: 3, definition: "A portable cloth shelter that you sleep inside while camping outdoors.", answer: "a tent" },
      { id: 4, definition: "A strong bag with shoulder straps used for carrying books and hiking equipment.", answer: "a backpack" },
      { id: 5, definition: "A picture produced by taking a camera shot of family, nature, or places.", answer: "a photograph" },
      { id: 6, definition: "A person who tracks and catches wild animals in the woodland.", answer: "a hunter" },
      { id: 7, definition: "A small battery-operated lamp that gives light when you walk in the dark.", answer: "a flashlight" },
      { id: 8, definition: "A large natural area where thousands of tall trees and plants grow together.", answer: "a forest" },
      { id: 9, definition: "An outdoor fire built safely at a campsite for warmth, cooking, and singing.", answer: "a campfire" },
      { id: 10, definition: "An exciting or unusual journey that tests courage and teaches new lessons.", answer: "an adventure" }
    ]
  },

  // ── Part 2: Dialogue Turn Completion A–H (5 items) ────────────────────────
  // Dialogue between Alex and Ranger David preparing the Adventure Guidebook
  rw_part2: {
    part: 2,
    instructions: "Alex is talking to Ranger David about making their class adventure book. Read the conversation and choose the best answer (A–H). Write a letter (A–H) for each answer. You do not need to use all the letters. There is one example.",
    context: "Alex and Ranger David at the Ranger Station",
    example: { speaker_prompt: "Ranger David: Hello Alex! How is your class adventure book going?", response: "Alex: C (It is going very well, thank you!)" },
    options: [
      { letter: "A", text: "Because we must wear our boots and stay on the marked path." },
      { letter: "B", text: "I took twenty wonderful photographs of mountain flowers." },
      { letter: "C", text: "It is going very well, thank you!" },
      { letter: "D", text: "Yes, our teacher said we should include safety rules from Week 33." },
      { letter: "E", text: "We decided to write five chapters about our outdoor expeditions." },
      { letter: "F", text: "No, I forgot to bring my woollen socks yesterday." },
      { letter: "G", text: "Tomorrow morning after breakfast, before our final trek." },
      { letter: "H", text: "You must always carry a compass so you never get lost." }
    ],
    items: [
      { id: 1, speaker_prompt: "Ranger David: What exciting stories did you decide to write about?", answer: "E", explanation: "Answers what stories they chose: five chapters about outdoor expeditions." },
      { id: 2, speaker_prompt: "Ranger David: Did you also remember to include first aid and health tips?", answer: "D", explanation: "Confirms inclusion of safety rules learned from Week 33." },
      { id: 3, speaker_prompt: "Ranger David: Why is it important to teach young hikers about forest safety?", answer: "A", explanation: "Gives reason using 'Because': wearing boots and staying on paths." },
      { id: 4, speaker_prompt: "Ranger David: What pictures will you put on the front cover?", answer: "B", explanation: "Describes photographs taken of mountain flowers." },
      { id: 5, speaker_prompt: "Ranger David: When will the school showcase the finished books?", answer: "G", explanation: "Gives timing: tomorrow morning after breakfast." }
    ]
  },

  // ── Part 3: Story Cloze with Word Bank + Best Title (6 items) ─────────────
  rw_part3: {
    part: 3,
    instructions: "Read the story. Choose a word from the box. Write the correct word next to numbers 1–5. There is one example. Then choose the best title.",
    word_bank: ["tent", "compass", "frightened", "delighted", "bandage", "carefully", "explored", "shouted", "rope"],
    story_text: "Last Saturday, Leo and his sister Mia went camping in the valley with their uncle. Before setting off, Uncle David checked their gear. They packed a blue [tent] to sleep in and a sturdy brass [1] so they would not lose their way.\n\nIn the afternoon, the children walked along the forest path. Suddenly, they heard a rustling noise behind a fallen log. At first, Mia felt a little [2], thinking it was a fierce badger! But Leo looked [3] between the bushes and saw a tiny squirrel whose tail was tangled in a piece of garden string.\n\n\"Don't worry,\" whispered Leo. Gently, he freed the tiny animal. The squirrel scampered up an oak tree, and the children felt [4] that they had done a kind deed.\n\nThat evening, Uncle David lit a warm campfire. Together, they wrote about the squirrel rescue in their adventure diary. \"A true explorer must always be brave and kind,\" smiled Uncle David. Leo glued a nice [5] of the squirrel into his book before falling asleep under the stars.",
    example: { position: "example", word: "tent" },
    items: [
      { id: 1, gap: 1, answer: "compass", pos: "noun" },
      { id: 2, gap: 2, answer: "frightened", pos: "adj" },
      { id: 3, gap: 3, answer: "carefully", pos: "adv" },
      { id: 4, gap: 4, answer: "delighted", pos: "adj" },
      { id: 5, gap: 5, answer: "photograph", pos: "noun" }
    ],
    title_question: {
      id: 6,
      prompt: "Now choose the best name for this story.",
      options: [
        "A scary night in the hospital",
        "A kind rescue on the trail",
        "How Uncle David lost his backpack"
      ],
      correct_index: 1,
      answer: "A kind rescue on the trail"
    }
  },

  // ── Part 4: Factual Grammar Cloze (10 items) ──────────────────────────────
  // CLIL Article: How Scouts Use Compasses and Maps Safely
  rw_part4: {
    part: 4,
    instructions: "Read the text. Choose the right words and write them on the lines.",
    text_template: "Every year, thousands of boys and girls join outdoor clubs to learn about nature. When you travel through [1] large forest, you must always be prepared. Good scouts know that they [2] never walk alone into the mountains. Before leaving camp, you [3] tell an adult leader where your group is going.\n\nNavigating with a compass is an important skill. The magnetic needle always [4] towards the north. While hikers [5] walking along unfamiliar paths, they should check their map frequently. If a trail becomes slippery or rocky, you [6] to walk slowly and watch every step.\n\nWhat should you do if an accident happens? First, stay calm and do [7] panic. If someone scrapes their knee, clean the wound with pure water [8] put on a clean bandage. Carrying a flashlight is also essential [9] darkness falls quickly under dense trees. Finally, remember that true adventurers always [10] the forest clean by taking all rubbish home.",
    items: [
      { id: 1, options: ["a", "an", "the"], answer: "a", grammar_focus: "Indefinite article before consonant" },
      { id: 2, options: ["should", "must", "can"], answer: "should", grammar_focus: "Modal verb of advice: should never" },
      { id: 3, options: ["has", "must", "having"], answer: "must", grammar_focus: "Modal of obligation: must + bare infinitive" },
      { id: 4, options: ["point", "points", "pointing"], answer: "points", grammar_focus: "Present simple 3rd person singular" },
      { id: 5, options: ["was", "were", "are"], answer: "are", grammar_focus: "Present continuous plural auxiliary: while hikers are walking" },
      { id: 6, options: ["have", "has", "must"], answer: "have", grammar_focus: "Semi-modal phrase: have to walk" },
      { id: 7, options: ["not", "no", "never"], answer: "not", grammar_focus: "Negative imperative: do not panic" },
      { id: 8, options: ["and", "but", "so"], answer: "and", grammar_focus: "Coordinating conjunction of addition" },
      { id: 9, options: ["because", "although", "unless"], answer: "because", grammar_focus: "Subordinating causal connector" },
      { id: 10, options: ["keep", "keeps", "keeping"], answer: "keep", grammar_focus: "Present simple plural agreement: adventurers keep" }
    ]
  },

  // ── Part 5: Story Comprehension (7 items — 1 to 4 words) ──────────────────
  // Story: The Mystery of the Eagle Peak Map
  rw_part5: {
    part: 5,
    instructions: "Read the story and answer the questions. Write 1, 2, 3, or 4 words.",
    title: "The Mystery of the Eagle Peak Map",
    story_text: "Last summer holiday, Oliver and his best friend Chloe went to stay at their grandparents' countryside cottage near Eagle Peak. On their second morning, it was raining heavily, so the children went up to the attic to find an old board game. While searching inside an old wooden chest, Chloe discovered a rolled paper tied with green ribbon.\n\n\"Look, Oliver!\" cried Chloe. It was a hand-drawn map of the pine forest, dated thirty years ago! Across the top, their grandfather had written: 'Secret Treehouse Trail'. Below the drawing, three clues were written in neat blue ink. The first clue said: 'Walk forty paces past the old stone fountain.'\n\nWhen the sun came out after lunch, the excited children put on their sturdy hiking boots and took their compass. They found the stone fountain easily. Following the second clue, they walked carefully between two giant cedar trees until they reached a wooden ladder leaning against a massive oak. High in the leafy branches stood a wonderful wooden treehouse! Inside, they found a metal tin containing Grandpa's childhood nature diary and five shiny quartz stones. Grandpa was delighted when the children showed him the discovery. He helped them write a brand new page for their holiday adventure book.",
    example: { prompt: "Where did Oliver and Chloe stay during their summer holiday?", answer: "at their grandparents' cottage" },
    items: [
      { id: 1, prompt: "The children went up to the attic to look for", answer: "an old board game", alt_answers: ["a board game", "board game"] },
      { id: 2, prompt: "Chloe found the rolled paper inside", answer: "an old wooden chest", alt_answers: ["a wooden chest", "the wooden chest"] },
      { id: 3, prompt: "The trail map had been drawn thirty", answer: "years ago", alt_answers: ["years"] },
      { id: 4, prompt: "The first clue directed the children to walk past the", answer: "old stone fountain", alt_answers: ["stone fountain"] },
      { id: 5, prompt: "The wooden ladder was leaning against a", answer: "massive oak", alt_answers: ["massive oak tree", "tall oak tree"] },
      { id: 6, prompt: "Inside the treehouse, the children found a nature diary and", answer: "five shiny quartz stones", alt_answers: ["five quartz stones", "shiny quartz stones"] },
      { id: 7, prompt: "Grandpa was delighted and helped the children write a new page for their", answer: "holiday adventure book", alt_answers: ["adventure book", "book"] }
    ]
  },

  // ── Part 6: Open Cloze (5 items) ──────────────────────────────────────────
  // Diary entry: Writing about the camping project
  rw_part6: {
    part: 6,
    instructions: "Read the diary and write the missing words. Write one word on each line.",
    diary_text: "Dear Diary,\nToday was the most memorable day of our outdoor project! We woke up early [1] the birds were singing in the tall pine trees. After breakfast, Mr. Davis showed us how [2] use a compass to navigate across the rocky ridge.\n\nWhile we [3] walking along the river bank, we saw two otters swimming gracefully. We had to be very quiet [4] we did not want to frighten them. Tonight, we are sitting around the campfire. We [5] sleep in our warm sleeping bags under the stars soon. Goodnight!\n- Alex",
    items: [
      { id: 1, prompt: "early ___ the birds were singing", answer: "when", alt_answers: ["as", "while"], explanation: "Temporal conjunction linking waking up and bird singing" },
      { id: 2, prompt: "how ___ use a compass", answer: "to", alt_answers: [], explanation: "Infinitive marker: how to use" },
      { id: 3, prompt: "While we ___ walking along the river", answer: "were", alt_answers: [], explanation: "Past continuous auxiliary for plural subject 'we'" },
      { id: 4, prompt: "quiet ___ we did not want", answer: "because", alt_answers: ["as", "since"], explanation: "Causal conjunction explaining why they stayed quiet" },
      { id: 5, prompt: "We ___ sleep in our warm sleeping bags soon", answer: "will", alt_answers: ["must", "shall"], explanation: "Future auxiliary or modal expressing immediate plan" }
    ]
  },

  // ── Part 7: Picture Story Writing (1 task / 3 pictures) ───────────────────
  rw_part7: {
    part: 7,
    instructions: "Look at the three pictures. Write about this story. Write 20 or more words.",
    scenes: [
      {
        panel: 1,
        image_url: "/images/week36/writing_panel_1.png",
        caption: "Alex and Mia pack their backpacks with maps, flashlights, and a first-aid kit.",
        prompt_hint: "What are the scouts packing before their trip?"
      },
      {
        panel: 2,
        image_url: "/images/week36/writing_panel_2.png",
        caption: "The children carefully cross a suspension bridge over a mountain stream.",
        prompt_hint: "Where are they walking and how are they moving?"
      },
      {
        panel: 3,
        image_url: "/images/week36/writing_panel_3.png",
        caption: "They reach the hilltop campsite, pitch their tent, and look at the sunset.",
        prompt_hint: "What do they do when they reach the campsite?"
      }
    ],
    model_story: "One sunny morning, Alex and Mia packed their backpacks with a compass, food, and a warm blanket. They walked carefully across a wooden bridge over the river. Finally, they reached the hilltop, pitched their blue tent, and happily watched the sunset together.",
    rubric: {
      max_score: 5,
      breakdown: {
        content: "2 marks: All three pictures described with logical storyline",
        grammar_flow: "2 marks: Good past tense verbs and sentence connectors",
        vocabulary_spelling: "1 mark: Accurate A2 vocabulary and spelling"
      },
      min_words: 20
    }
  }
};

export default readingHubData;
