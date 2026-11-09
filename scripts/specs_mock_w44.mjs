/**
 * scripts/specs_mock_w44.mjs
 * 
 * SPECIFICATIONS FOR MOCK EXAM WEEK 44 (STAGE 1 A2 FLYERS)
 * Cumulative Grounding: Weeks 41, 42, 43, 44
 * Theme: "The Cookie Monster (Subtraction) & Nature Cycles"
 */

export const mockSpecW44 = {
  week: 44,
  theme: 'The Cookie Monster (Subtraction Language)',
  exam_title: 'Cambridge A2 Flyers Full Mock 3 (Weeks 41-44 Synthesis)',
  cefr_level: 'A2 Flyers',
  cumulativeBlock: [41, 42, 43, 44],

  source_grounding: {
    w41_source_words: ['egg', 'hatch', 'caterpillar', 'chrysalis', 'butterfly'],
    w42_source_words: ['cloud', 'rain', 'river', 'ocean', 'stream'],
    w43_source_words: ['add', 'plus', 'combine', 'total', 'together'],
    w44_source_words: ['minus', 'subtract', 'cookie', 'share', 'remain'],
    grammar_grounding_summary: {
      w41_grammar: 'Process sequencing clauses (first, next, then, finally)',
      w42_grammar: 'Present Simple natural cycle descriptions & transitions',
      w43_grammar: 'Addition mathematical expressions (plus, combine, total, together)',
      w44_grammar: 'Subtraction mathematical operations (minus, subtract, take away, remain)'
    },
    parts_grounding: {
      listening_p1: 'Discovery Science Fair with Lucas, Grace, Toby, Clara, Mark',
      listening_p2: 'Toby Evans registering for the Young Science & Math Workshop',
      listening_p3: 'Matching student science models to their experiment topics (A-H)',
      listening_p4: '3-picture MCQs about the school botanical garden field trip',
      listening_p5: 'Science lab diagram colouring models and writing CYCLE',
      reading_p1: '10 definitions matching nature cycle and arithmetic vocabulary',
      reading_p2: 'Toby discussing math bake sale calculations with Teacher Sarah',
      reading_p3: 'Story cloze on an apple orchard caterpillar transforming into a butterfly',
      reading_p4: 'Factual article explaining how water travels from oceans to clouds and rain',
      reading_p5: 'Extended story about solving cookie division puzzles at the school festival',
      reading_p6: 'Email open cloze written by young botanist Sophie',
      reading_p7: '3-panel picture story writing: The School Butterfly Garden',
      speaking_p1: 'Spot 5 differences between Picture A and B in science laboratory',
      speaking_p2: 'Solo-AI cue cards: Table A Leo\'s Butterfly Garden / Table B Anna\'s Water Cycle Project',
      speaking_p3: '5-frame picture story: The Cookie Monster Baker and the Missing Biscuits',
      speaking_p4: '4 personal interview questions on favourite subjects, insects, and baking'
    }
  },

  vocab: [
    { id: 1, word: 'egg', pos: 'noun', ipa: '/eɡ/', definition_en: 'An oval object laid by insects or birds from which young hatch.', definition_vi: 'quả trứng', example_en: 'A tiny green caterpillar hatched from the small round egg.', sourceWeek: 41 },
    { id: 2, word: 'hatch', pos: 'verb', ipa: '/hætʃ/', definition_en: 'To break open an egg and emerge as a young animal.', definition_vi: 'nở ra', example_en: 'The chicks will hatch after three weeks in the warm nest.', sourceWeek: 41 },
    { id: 3, word: 'caterpillar', pos: 'noun', ipa: '/ˈkætərpɪlər/', definition_en: 'A small worm-like insect larva that develops into a butterfly.', definition_vi: 'sâu bướm', example_en: 'The hungry caterpillar chewed three fresh leaves every day.', sourceWeek: 41 },
    { id: 4, word: 'chrysalis', pos: 'noun', ipa: '/ˈkrɪsəlɪs/', definition_en: 'The hard case in which a caterpillar transforms into an adult butterfly.', definition_vi: 'kén nhộng', example_en: 'Inside the green chrysalis, a wonderful change was taking place.', sourceWeek: 41 },
    { id: 5, word: 'butterfly', pos: 'noun', ipa: '/ˈbʌtərflaɪ/', definition_en: 'An insect with two pairs of large colourful wings.', definition_vi: 'con bướm', example_en: 'A yellow butterfly fluttered gently above the purple flowers.', sourceWeek: 41 },
    { id: 6, word: 'cloud', pos: 'noun', ipa: '/klaʊd/', definition_en: 'A visible white or grey mass of water drops floating in the sky.', definition_vi: 'đám mây', example_en: 'Dark storm clouds gathered quickly over the green hills.', sourceWeek: 42 },
    { id: 7, word: 'rain', pos: 'noun', ipa: '/reɪn/', definition_en: 'Drops of water falling from clouds in the sky.', definition_vi: 'cơn mưa, hạt mưa', example_en: 'Gentle spring rain helps the seeds in the garden grow.', sourceWeek: 42 },
    { id: 8, word: 'river', pos: 'noun', ipa: '/ˈrɪvər/', definition_en: 'A wide natural stream of fresh water flowing into a sea or lake.', definition_vi: 'dòng sông', example_en: 'The wide river flows past the town and down to the sea.', sourceWeek: 42 },
    { id: 9, word: 'ocean', pos: 'noun', ipa: '/ˈoʊʃən/', definition_en: 'A vast expanse of salt water covering much of Earth.', definition_vi: 'đại dương', example_en: 'Millions of wonderful sea creatures live in the deep ocean.', sourceWeek: 42 },
    { id: 10, word: 'stream', pos: 'noun', ipa: '/striːm/', definition_en: 'A small, narrow river with fresh flowing water.', definition_vi: 'con suối', example_en: 'We crossed the bubbling forest stream by stepping on flat stones.', sourceWeek: 42 },
    { id: 11, word: 'add', pos: 'verb', ipa: '/æd/', definition_en: 'To put two or more numbers or items together to find the sum.', definition_vi: 'cộng vào, thêm vào', example_en: 'If you add four and six, the answer is ten.', sourceWeek: 43 },
    { id: 12, word: 'plus', pos: 'prep', ipa: '/plʌs/', definition_en: 'With the addition of; sign showing an increase (+).', definition_vi: 'cộng, thêm', example_en: 'Five plus three equals eight shiny marbles.', sourceWeek: 43 },
    { id: 13, word: 'combine', pos: 'verb', ipa: '/kəmˈbaɪn/', definition_en: 'To join or mix two or more things together into a single whole.', definition_vi: 'kết hợp, gộp lại', example_en: 'The baker will combine flour, sugar, and milk in a bowl.', sourceWeek: 43 },
    { id: 14, word: 'total', pos: 'noun', ipa: '/ˈtoʊtəl/', definition_en: 'The complete amount obtained by adding all parts together.', definition_vi: 'tổng số', example_en: 'The total cost of our school books was twenty pounds.', sourceWeek: 43 },
    { id: 15, word: 'together', pos: 'adv', ipa: '/təˈɡeðər/', definition_en: 'In one place or into a single united group.', definition_vi: 'cùng nhau', example_en: 'The scouts worked together to pitch the camping tent.', sourceWeek: 43 },
    { id: 16, word: 'minus', pos: 'prep', ipa: '/ˈmaɪnəs/', definition_en: 'With the subtraction of; sign showing a decrease (-).', definition_vi: 'trừ, bớt', example_en: 'Ten minus two leaves eight tasty biscuits on the tray.', sourceWeek: 44 },
    { id: 17, word: 'subtract', pos: 'verb', ipa: '/səbˈtrækt/', definition_en: 'To take away a number or amount from another.', definition_vi: 'làm phép trừ', example_en: 'When you subtract three from nine, you get six.', sourceWeek: 44 },
    { id: 18, word: 'cookie', pos: 'noun', ipa: '/ˈkʊki/', definition_en: 'A sweet, flat baked biscuit often enjoyed as a snack.', definition_vi: 'bánh quy', example_en: 'Mum baked a warm batch of chocolate cookies for our picnic.', sourceWeek: 44 },
    { id: 19, word: 'share', pos: 'verb', ipa: '/ʃeər/', definition_en: 'To divide or distribute something equally among people.', definition_vi: 'chia sẻ', example_en: 'The kind children wanted to share their snacks with new friends.', sourceWeek: 44 },
    { id: 20, word: 'remain', pos: 'verb', ipa: '/rɪˈmeɪn/', definition_en: 'To stay behind after other parts have gone or been used.', definition_vi: 'còn lại', example_en: 'Only four ripe apples remain on the high branches.', sourceWeek: 44 }
  ],

  listening_p1: {
    part: 1,
    instructions: "Listen and look. There is one example. Draw lines to match names to the correct people in the picture.",
    audio_script: "Narrator: Part 1. Listen and look. There is one example.\nMan: Look at the school Science and Math Fair! The hall is full of exciting models.\nWoman: Yes! Who is that girl wearing a bright yellow apron over there?\nMan: The one arranging glass test tubes on the table? That is Daisy. She is preparing a water mixing test.\nWoman: Oh, she is very tidy.\nNarrator: Can you see the line? This is an example. Now you listen and draw lines.\n\n[1]\nWoman: Who is that boy with curly hair counting blue marbles?\nMan: The boy dropping marbles into a plastic jar? That is Lucas. He is demonstrating how addition machines work.\nWoman: He looks very focused on his counting!\n\n[2]\nWoman: Look at that girl examining something under a big magnifying glass.\nMan: That is Grace. She is observing a caterpillar forming a green chrysalis on a twig.\nWoman: Wow, she must be fascinated by life cycles!\n\n[3]\nWoman: Who is the boy drawing a big diagram on the whiteboard near the window?\nMan: Ah, that is Toby. He is illustrating how water evaporates from oceans into rain clouds.\nWoman: His drawing of the mountain stream looks wonderful!\n\n[4]\nWoman: Is that Clara by the corner table with the bakery tray?\nMan: Yes, Clara baked twelve star-shaped cookies to teach fractions and subtraction.\nWoman: That is a delicious way to learn math!\n\n[5]\nWoman: And who is the boy measuring clear water in that plastic cylinder?\nMan: That is Mark. He designed a simple rain gauge to measure weekly garden rainfall.\nWoman: He has recorded the numbers very neatly on his chart.",
    items: [
      { id: 1, name: "Lucas", location: "boy dropping blue marbles into plastic jar at math table", x: 260, y: 340, target: "boy counting marbles into plastic jar" },
      { id: 2, name: "Grace", location: "girl with magnifying glass looking at chrysalis on twig", x: 510, y: 280, target: "girl examining chrysalis with magnifying glass" },
      { id: 3, name: "Toby", location: "boy drawing water cycle diagram on whiteboard near window", x: 730, y: 220, target: "boy drawing diagram on whiteboard" },
      { id: 4, name: "Clara", location: "girl offering star cookies from bakery tray at corner table", x: 380, y: 440, target: "girl offering star cookies from tray" },
      { id: 5, name: "Mark", location: "boy measuring water in clear plastic rain cylinder", x: 850, y: 390, target: "boy measuring water in plastic cylinder" }
    ],
    example: { name: "Daisy", location: "girl in yellow apron arranging test tubes", x: 140, y: 310 }
  },

  listening_p2: {
    part: 2,
    instructions: "Listen and look. There is one example. Read the notes and fill in the missing information.",
    audio_script: "Narrator: Part 2. Listen and look. There is one example.\nWoman: Hello! Welcome to the Young Explorers Science and Math Club. Are you registering today?\nBoy: Yes please. My first name is Toby.\nWoman: Welcome, Toby! Let me write down your registration details.\nNarrator: Can you see the answer? Now you listen and write.\n\n[1]\nWoman: What is your surname, Toby?\nBoy: My surname is Evans. That is E-V-A-N-S.\nWoman: Thank you, Toby Evans.\n\n[2]\nWoman: How old are you now?\nBoy: I am eleven years old. My birthday was last Friday!\nWoman: Eleven, great age for our junior researchers.\n\n[3]\nWoman: Which day would you like to attend our laboratory session?\nBoy: I have football practice on Tuesdays, so Thursday afternoon suits me best.\nWoman: Perfect. The Thursday workshop meets from four to five.\n\n[4]\nWoman: Which classroom will the group meet in?\nBoy: Is it in Room 2A on the second floor?\nWoman: Yes, Room 2A, next to the botanical greenhouse.\n\n[5]\nWoman: What tool must every member bring to their first math and nature class?\nBoy: Should I bring my paint set?\nWoman: No, you must bring a small pocket calculator for recording numbers.\nBoy: Excellent, I have a solar calculator in my bag!",
    example: { field: "First name", value: "Toby" },
    items: [
      { id: 1, question: "Surname", prompt: "Surname:", answer: "Evans" },
      { id: 2, question: "Age", prompt: "Age:", answer: "11" },
      { id: 3, question: "Day of workshop", prompt: "Day of workshop:", answer: "Thursday" },
      { id: 4, question: "Meeting room", prompt: "Meeting room:", answer: "2A" },
      { id: 5, question: "Must bring", prompt: "Must bring:", answer: "calculator" }
    ]
  },

  listening_p3: {
    part: 3,
    instructions: "Listen and look. Which model did each student build for the science fair? Match each student to their model letter (A–H).",
    audio_script: "Narrator: Part 3. Listen and look. There is one example. Which model did each student build?\nGirl: Look at all the wonderful project models our classmates made for the Science Fair, Mr Lee!\nMan: They worked very hard, Clara. Lucas built that clever marble counting machine with wooden ramps.\nGirl: Oh yes, you drop marbles down and it adds them up! That is letter G.\nNarrator: Can you see the letter G? Now you listen and write a letter in each box.\n\n[1]\nMan: Grace spent two weeks observing caterpillars in her garden.\nGirl: Did she create that colourful butterfly life cycle box?\nMan: Yes, with real leaves, model eggs, and a hanging green chrysalis.\nGirl: That box is letter A. It looks beautiful!\n\n[2]\nGirl: What about Toby's project model?\nMan: Toby made a working rain cloud chamber using a glass jar and warm water vapour.\nGirl: Ah, letter D! You can see condensation forming tiny rain drops inside.\n\n[3]\nMan: Clara, tell me about your project with the biscuits.\nGirl: I baked round cookies with chocolate chips to show how subtraction works when friends share snacks!\nMan: That fraction tray model is letter B. Everyone loved it!\n\n[4]\nGirl: Who constructed that wooden water wheel spinning under the tap?\nMan: Mark designed that solar water wheel to show how rushing streams generate power.\nGirl: That is letter F. The wheel turns so smoothly.\n\n[5]\nGirl: And look at Lily's project with the layered sand and gravel.\nMan: Lily built a river stream water filter to purify muddy rainwater.\nGirl: Letter C! The water coming out at the bottom is completely clear.",
    example: { day_or_item: "Lucas", letter: "G" },
    letters_available: [
      { letter: "A", description: "Butterfly life cycle model box with chrysalis" },
      { letter: "B", description: "Cookie fraction and subtraction tray" },
      { letter: "C", description: "River stream sand water filter" },
      { letter: "D", description: "Glass rain cloud chamber with water vapour" },
      { letter: "E", description: "Cardboard solar system mobile" },
      { letter: "F", description: "Wooden water wheel powered by stream" },
      { letter: "G", description: "Marble addition counting machine with ramps" },
      { letter: "H", description: "Plastic dinosaur skeleton puzzle" }
    ],
    items: [
      { id: 1, day_or_item: "Grace", letter: "A", target: "butterfly life cycle model box" },
      { id: 2, day_or_item: "Toby", letter: "D", target: "glass rain cloud chamber" },
      { id: 3, day_or_item: "Clara", letter: "B", target: "cookie subtraction tray" },
      { id: 4, day_or_item: "Mark", letter: "F", target: "wooden water wheel model" },
      { id: 5, day_or_item: "Lily", letter: "C", target: "river stream water filter" }
    ]
  },

  listening_p4: {
    part: 4,
    instructions: "Listen and look. There is one example. Choose the correct answer (A, B, or C).",
    audio_script: "Narrator: Part 4. Listen and look. There is one example. What colour was Toby's school binder?\nWoman: Did you take your red school binder to the garden trip, Toby?\nBoy: No, I took my bright blue binder because it holds larger drawing sheets.\nWoman: That makes sense.\nNarrator: Can you see the tick? Now you listen and choose the correct answer.\n\n[1] What did Toby see on the green cabbage leaf?\nWoman: What was the first creature you observed in the botanical garden, Toby?\nBoy: The gardener pointed to a large green leaf. A tiny striped caterpillar was chewing a hole right through it!\nWoman: Did you see any eggs?\nBoy: We saw two tiny white eggs nearby, but the caterpillar was much easier to spot.\n\n[2] Where did the class measure the rainfall?\nWoman: Where was the school rain gauge set up?\nBoy: We walked past the open lawn, but Mr Lee placed the gauge inside the glass greenhouse beside the potted ferns.\nWoman: Was there much rainwater collected?\nBoy: Yes, about fifteen millimeters!\n\n[3] How many cookies were left in the picnic basket?\nWoman: Did everyone enjoy Clara's snack cookies at lunch?\nBoy: There were twelve cookies on the plate. Eight children each took one cookie.\nWoman: So twelve minus eight leaves four cookies!\nBoy: Exactly, four cookies remained for the teachers.\n\n[4] Which insect flew out of the chrysalis first?\nWoman: Did you see the butterflies inside the glass dome?\nBoy: Yes! A swallowtail butterfly with yellow and black wings flew out of its chrysalis first.\nWoman: What a magical sight!\n\n[5] What time did the school bus depart?\nWoman: What time did the bus bring you back from the garden?\nBoy: Our tour finished at three, but the bus departed at half past three.\nWoman: You had plenty of time to pack up your drawings then.",
    example: { question: "What colour was Toby's school binder?", answer: "B" },
    items: [
      {
        id: 1,
        question: "What did Toby see on the green cabbage leaf?",
        options: [
          { letter: "A", text: "A shiny black beetle" },
          { letter: "B", text: "A tiny striped caterpillar" },
          { letter: "C", text: "A yellow honeybee" }
        ],
        answer: "B"
      },
      {
        id: 2,
        question: "Where did the class measure the rainfall?",
        options: [
          { letter: "A", text: "Inside the glass greenhouse" },
          { letter: "B", text: "On the outdoor playing lawn" },
          { letter: "C", text: "On top of the school roof" }
        ],
        answer: "A"
      },
      {
        id: 3,
        question: "How many cookies were left in the picnic basket?",
        options: [
          { letter: "A", text: "Two cookies" },
          { letter: "B", text: "Three cookies" },
          { letter: "C", text: "Four cookies" }
        ],
        answer: "C"
      },
      {
        id: 4,
        question: "Which insect flew out of the chrysalis first?",
        options: [
          { letter: "A", text: "A spotted moth" },
          { letter: "B", text: "A yellow and black swallowtail butterfly" },
          { letter: "C", text: "A green grasshopper" }
        ],
        answer: "B"
      },
      {
        id: 5,
        question: "What time did the school bus depart?",
        options: [
          { letter: "A", text: "Half past three" },
          { letter: "B", text: "Three o'clock" },
          { letter: "C", text: "Quarter to four" }
        ],
        answer: "A"
      }
    ]
  },

  listening_p5: {
    part: 5,
    instructions: "Listen and look. There is one example. Colour and write.",
    audio_script: "Narrator: Part 5. Listen and look. There is one example.\nMan: Welcome to the Science and Math Lab, Clara. Would you like to colour our laboratory diagram?\nGirl: Yes please! May I colour the flower pot sitting on the windowsill?\nMan: Good choice. Colour that flower pot yellow.\nGirl: Yellow is a bright sunny colour.\nNarrator: Can you see the yellow flower pot? This is an example. Now you listen and colour and write.\n\n[1]\nMan: Now look at the large lab table in the middle. There is a model caterpillar made of clay.\nGirl: Oh yes, with tiny legs!\nMan: Can you colour that caterpillar model green?\nGirl: Green, like a fresh cabbage leaf. Doing that now.\n\n[2]\nMan: Next, find the big poster on the back wall showing water evaporation.\nGirl: I see a fluffy rain cloud on that poster.\nMan: Please colour that rain cloud blue.\nGirl: Blue for the rain cloud, wonderful.\n\n[3]\nMan: Look near the open window. There is a model butterfly suspended by a wire.\nGirl: Its wings have round spots.\nMan: Colour the wings of that butterfly orange.\nGirl: Orange makes it look like a monarch butterfly!\n\n[4]\nMan: Now it is time to write one word.\nGirl: Where should I write it?\nMan: Do you see the blank banner above the chalkboard?\nGirl: Yes, above the teacher's desk.\nMan: Write the word CYCLE on that banner.\nGirl: C-Y-C-L-E. I wrote CYCLE in capital letters.\nMan: Excellent spelling!\n\n[5]\nGirl: What should I colour for the last part?\nMan: Look at the stream diagram drawn on the paper sheet on the desk.\nGirl: The winding river that flows down from the hills?\nMan: Yes! Colour that winding stream light blue.\nGirl: Done! The whole science laboratory picture looks fantastic.",
    example: { instruction: "Colour the flower pot on the windowsill yellow", target: "flower pot on windowsill", colour: "yellow" },
    items: [
      { id: 1, type: "colour", target: "caterpillar model on the lab table", colour: "green", action: "Colour the caterpillar model on the lab table green" },
      { id: 2, type: "colour", target: "rain cloud on the poster", colour: "blue", action: "Colour the rain cloud on the poster blue" },
      { id: 3, type: "colour", target: "butterfly model near the window", colour: "orange", action: "Colour the butterfly model near the window orange" },
      { id: 4, type: "write", target: "banner above the chalkboard", text: "CYCLE", action: "Write the word 'CYCLE' on the banner above the chalkboard" },
      { id: 5, type: "colour", target: "winding stream on the paper sheet", colour: "light blue", action: "Colour the winding stream on the paper sheet light blue" }
    ]
  },

  reading_p1: {
    part: 1,
    instructions: "Look and read. Choose the correct words and write them on the lines. There is one example.",
    example: { definition: "A round or oval object laid by an insect or bird from which young hatch.", answer: "egg" },
    word_bank: [
      "butterfly", "rain", "subtract", "chrysalis", "cloud",
      "add", "river", "egg", "cookie", "share",
      "total", "hatch", "ocean", "minus", "stream"
    ],
    items: [
      { id: 1, definition: "An insect with four colourful wings that transforms from a caterpillar.", answer: "butterfly" },
      { id: 2, definition: "Drops of fresh water that fall from dark sky clouds onto the earth.", answer: "rain" },
      { id: 3, definition: "To take one number or quantity away from another number.", answer: "subtract" },
      { id: 4, definition: "The hard shell where a caterpillar rests before becoming a butterfly.", answer: "chrysalis" },
      { id: 5, definition: "A white or grey mass floating in the sky made of tiny water drops.", answer: "cloud" },
      { id: 6, definition: "To put two or more numbers together to find the sum.", answer: "add" },
      { id: 7, definition: "A wide natural channel of fresh water that flows down into a sea.", answer: "river" },
      { id: 8, definition: "A sweet, flat baked biscuit that children like to bake and eat.", answer: "cookie" },
      { id: 9, definition: "To divide food, toys, or points equally among your friends.", answer: "share" },
      { id: 10, definition: "The complete number or amount when you combine everything together.", answer: "total" }
    ]
  },

  reading_p2: {
    part: 2,
    instructions: "Toby is talking to Teacher Sarah about the school math bake sale. What does Toby say? Read the conversation and choose the best answer (A–H). There is one example.",
    example: { speaker_prompt: "Good morning Toby! How is our school bake sale going today?", answer: "D" },
    options: [
      { letter: "A", text: "Yes! Ten minus four leaves six chocolate cookies on the tray." },
      { letter: "B", text: "We need three cups of flour and two spoonfuls of sugar." },
      { letter: "C", text: "They will walk to the sports hall at five o'clock." },
      { letter: "D", text: "It is going brilliantly! Many students are buying homemade biscuits." },
      { letter: "E", text: "Because we watched a documentary about polar bears yesterday." },
      { letter: "F", text: "We baked forty star cookies and thirty round biscuits!" },
      { letter: "G", text: "Our team raised forty-five pounds for our garden butterfly flowers!" },
      { letter: "H", text: "I left my yellow pencil case in the library." }
    ],
    items: [
      { id: 1, speaker_prompt: "How many biscuits did your class bake altogether?", answer: "F" },
      { id: 2, speaker_prompt: "If you sell four cookies from a box of ten, how many remain?", answer: "A" },
      { id: 3, speaker_prompt: "What ingredients did you combine for the dough?", answer: "B" },
      { id: 4, speaker_prompt: "How much money has the bake sale raised so far?", answer: "G" },
      { id: 5, speaker_prompt: "Why are you raising funds for the school garden?", answer: "E" }
    ]
  },

  reading_p3: {
    part: 3,
    instructions: "Read the story. Choose a word from the box. Write the correct word next to numbers 1–5. There is one example.",
    text: "Early in May, Oliver was exploring his grandmother's orchard. On the underside of a green apple leaf, he found a tiny white [1]. A few days later, a hungry little [2] hatched out. It began to chew on the tender green leaves day after day. Oliver watched it grow much bigger. Soon, the creature spun a silky button and turned into a shiny green [3]. It stayed completely still for almost two weeks. One warm morning, Oliver saw the shell crack open. A gorgeous swallowtail [4] emerged into the sunlight! Oliver gently held out his finger. The creature rested on his hand while warm breeze dried its wings. Finally, it fluttered high over the garden [5] that flowed beside the orchard. Oliver smiled happily, amazed by the wonders of nature.",
    word_bank: [
      { word: "egg", pos: "noun" },
      { word: "caterpillar", pos: "noun" },
      { word: "chrysalis", pos: "noun" },
      { word: "butterfly", pos: "noun" },
      { word: "stream", pos: "noun" },
      { word: "cookie", pos: "noun" },
      { word: "subtract", pos: "verb" },
      { word: "total", pos: "noun" }
    ],
    items: [
      { id: 1, blank_id: 1, answer: "egg" },
      { id: 2, blank_id: 2, answer: "caterpillar" },
      { id: 3, blank_id: 3, answer: "chrysalis" },
      { id: 4, blank_id: 4, answer: "butterfly" },
      { id: 5, blank_id: 5, answer: "stream" }
    ],
    title_question: {
      id: 6,
      question: "Now choose the best name for the story.",
      options: [
        "A stormy journey across the ocean",
        "The amazing butterfly in the orchard",
        "How to bake chocolate biscuits"
      ],
      answer: "The amazing butterfly in the orchard"
    }
  },

  reading_p4: {
    part: 4,
    instructions: "Read the text. Choose the right words and write them on the lines.",
    text: "Water is one of the most important things on Earth [1] all living plants and animals need it. The water on our planet travels in an endless cycle [2] never stops. Warm sunlight heats water in the oceans, lakes, and [3]. This warm water turns into invisible vapour and rises [4] the cool sky. High above the ground, the vapour cools down and forms fluffy white [5]. When the clouds become very heavy with water drops, [6] falls back to the earth as rain or snow. Rainwater flows into bubbling mountain [7] and journeys into wide rivers. Eventually, rivers carry the fresh water back to the vast [8]. Without this constant water journey, plants could [9] grow and animals would have no water to drink. Nature works together in a perfect [10] every single day.",
    items: [
      { id: 1, blank_id: 1, options: ["because", "although", "unless"], answer: "because" },
      { id: 2, blank_id: 2, options: ["which", "who", "where"], answer: "which" },
      { id: 3, blank_id: 3, options: ["rivers", "river", "rivering"], answer: "rivers" },
      { id: 4, blank_id: 4, options: ["into", "onto", "under"], answer: "into" },
      { id: 5, blank_id: 5, options: ["clouds", "cloud", "clouding"], answer: "clouds" },
      { id: 6, blank_id: 6, options: ["it", "they", "them"], answer: "it" },
      { id: 7, blank_id: 7, options: ["streams", "stream", "streamed"], answer: "streams" },
      { id: 8, blank_id: 8, options: ["oceans", "ocean", "oceanic"], answer: "oceans" },
      { id: 9, blank_id: 9, options: ["not", "never", "no"], answer: "not" },
      { id: 10, blank_id: 10, options: ["cycle", "cycling", "cycled"], answer: "cycle" }
    ]
  },

  reading_p5: {
    part: 5,
    instructions: "Look at the picture and read the story. Write some words to complete the sentences about the story. You can use 1, 2, 3 or 4 words.",
    story: "Last Friday afternoon, St. Jude School organized a Great Math and Baking Festival in the school courtyard. Clara and her best friend Liam were in charge of the biscuit stall. Their goal was to raise thirty pounds for new gardening tools. Clara's mother had helped the children bake sixty delicious butter cookies shaped like stars, circles, and triangles. Each cookie cost fifty pence. At two o'clock, the courtyard gates opened and hungry pupils rushed towards the tables. Liam kept a neat notebook where he recorded every sale. If someone bought three cookies, Liam added fifty plus fifty plus fifty to find the total of one pound fifty. When a customer paid with a two-pound coin, Clara quickly subtracted one pound fifty to give fifty pence change. By three o'clock, fifty-two cookies had been sold and only eight remained on the silver tray! Clara's teacher, Mrs Bell, bought the last eight cookies to share with the music teachers. The children counted their money and discovered they had made thirty pounds in total. Clara and Liam felt proud because their math skills had helped their school garden.",
    example: { prompt: "The festival was organized in the", answer: "school courtyard" },
    items: [
      { id: 1, prompt: "The children wanted to raise thirty pounds for", answer: "new gardening tools" },
      { id: 2, prompt: "Clara's mother helped bake sixty", answer: "butter cookies" },
      { id: 3, prompt: "Each delicious cookie cost", answer: "fifty pence" },
      { id: 4, prompt: "Liam recorded every sale inside a", answer: "neat notebook" },
      { id: 5, prompt: "By three o'clock, only eight cookies", answer: "remained" },
      { id: 6, prompt: "The last eight cookies were bought by", answer: "Mrs Bell" },
      { id: 7, prompt: "The children were proud because their", answer: "math skills" }
    ]
  },

  reading_p6: {
    part: 6,
    instructions: "Read the email and write the missing words. Write one word on each line.",
    text: "Dear Grandma,\nThank you so much for the lovely caterpillar book you sent me! Today at school, we visited [1] botanical greenhouse. It [2] very warm and humid inside. We saw five green chrysalises hanging from a wooden twig. Our science teacher said they will hatch [3] colourful butterflies next week. I am learning [4] to calculate plant growth rates in math class. When you visit us on Saturday, I [5] show you my butterfly notebook.\nLots of love,\nSophie",
    items: [
      { id: 1, blank_id: 1, answer: "the" },
      { id: 2, blank_id: 2, answer: "was" },
      { id: 3, blank_id: 3, answer: "into" },
      { id: 4, blank_id: 4, answer: "how" },
      { id: 5, blank_id: 5, answer: "will" }
    ]
  },

  writing_hub: {
    picture_story: {
      title: "The School Butterfly Garden",
      instructions: "Look at the three pictures. Write the story. Write 20 or more words.",
      min_words: 20,
      model_sentence: "One bright morning, Sophie and Lucas planted colourful flower beds in their sunny school garden. A few weeks later, they noticed a tiny striped caterpillar chewing fresh cabbage leaves near a sturdy wooden fence. Finally, after resting inside a green chrysalis, a beautiful swallowtail butterfly emerged and fluttered happily across the blossoming garden into the sunshine.",
      rubric: {
        content: 2,
        grammar_flow: 2,
        vocab_spelling: 1,
        total: 5
      },
      panels: [
        {
          panel_id: 1,
          title: "Planting Garden Flowers",
          image_url: "/images/week44/writing_panel_1.png",
          caption: "Sophie and Lucas dig the rich soil and plant bright flower seedlings.",
          word_bank: ["plant", "soil", "garden", "flowers", "sunshine"]
        },
        {
          panel_id: 2,
          title: "Discovering the Caterpillar",
          image_url: "/images/week44/writing_panel_2.png",
          caption: "They find a green caterpillar chewing on a fresh leaf beside the fence.",
          word_bank: ["caterpillar", "chew", "leaf", "observe", "grow"]
        },
        {
          panel_id: 3,
          title: "The Butterfly Emerges",
          image_url: "/images/week44/writing_panel_3.png",
          caption: "A colourful butterfly flies out of its chrysalis into the warm summer breeze.",
          word_bank: ["chrysalis", "butterfly", "wings", "flutter", "delighted"]
        }
      ],
      ladder_steps: [
        { stage: "MODEL", focus: "Analyze 3-panel narrative using sequencing adverbs (first, then, finally)" },
        { stage: "BUILD", focus: "Draft 1-2 sentences per panel connecting nature cycle events" },
        { stage: "WRITE", focus: "Compose complete paragraph narrative ensuring >= 20 words" },
        { stage: "EXPAND", focus: "Add descriptive sensory details (fresh leaves, colourful wings, sunny)" }
      ]
    }
  },

  speaking_hub: {
    find_differences: {
      part: 1,
      instructions: "Look at the two pictures. Find 5 differences and describe them to Nova.",
      examiner_script: "Here are two pictures of the Science Discovery Laboratory. They look similar, but some things are different. In Picture A, there is one chrysalis hanging on the twig, but in Picture B, there are two chrysalises. Now what other differences can you see?",
      differences: [
        { id: 1, picture_a: "One chrysalis is hanging on the wooden twig", picture_b: "Two chrysalises are hanging on the wooden twig" },
        { id: 2, picture_a: "The boy is holding a round cookie on a plate", picture_b: "The boy is holding a glass test tube" },
        { id: 3, picture_a: "The poster on the wall shows a blue rain cloud", picture_b: "The poster on the wall shows a yellow sun" },
        { id: 4, picture_a: "There are four marbles on the wooden scale", picture_b: "There are six marbles on the wooden scale" },
        { id: 5, picture_a: "The clock on the wall shows half past two", picture_b: "The clock on the wall shows quarter past three" }
      ]
    },

    info_exchange_cards: {
      table_a: {
        title: "Leo's Butterfly Garden",
        person: "Leo",
        fields: [
          {
            id: "location",
            cue_prompt: "Where / garden",
            cue_word: "where",
            is_missing: true,
            acceptable_questions: [
              "Where is Leo's butterfly garden?",
              "Where did Leo go?",
              "Where is the garden?"
            ],
            nova_reply: "Leo's butterfly garden is at the Riverside Botanical Park."
          },
          {
            id: "ticket_price",
            cue_prompt: "How much / ticket",
            cue_word: "how much",
            is_missing: true,
            acceptable_questions: [
              "How much was the ticket?",
              "How much did Leo's ticket cost?",
              "What was the price of the ticket?"
            ],
            nova_reply: "The child ticket cost four pounds fifty."
          },
          {
            id: "activity",
            cue_prompt: "What / observe",
            cue_word: "what observe",
            is_missing: true,
            acceptable_questions: [
              "What did Leo observe?",
              "What did he see in the garden?",
              "What did Leo watch?"
            ],
            nova_reply: "He observed sixty colourful swallowtail butterflies feeding on nectar."
          },
          {
            id: "equipment",
            cue_prompt: "What / bring",
            cue_word: "what bring",
            is_missing: true,
            acceptable_questions: [
              "What did Leo bring with him?",
              "What equipment did he bring?",
              "What did he take?"
            ],
            nova_reply: "He brought a magnifying glass and a nature sketchbook."
          },
          {
            id: "opening_hours",
            cue_prompt: "What time / open",
            cue_word: "what time open",
            is_missing: true,
            acceptable_questions: [
              "What time does the garden open?",
              "When does it open?",
              "What are the opening hours?"
            ],
            nova_reply: "The botanical butterfly garden opens at ten o'clock every morning."
          }
        ]
      },
      table_b: {
        title: "Anna's Water Cycle Project",
        person: "Anna",
        fields: [
          {
            id: "topic",
            cue_prompt: "What / project topic",
            cue_word: "what topic",
            value: "How Clouds and Rain Form",
            nova_question: "What was the topic of Anna's science project?",
            acceptable_answers: [
              "Her topic was How Clouds and Rain Form.",
              "It was about How Clouds and Rain Form.",
              "How Clouds and Rain Form."
            ]
          },
          {
            id: "materials",
            cue_prompt: "What materials / use",
            cue_word: "materials",
            value: "A glass jar, warm water, and ice cubes",
            nova_question: "What materials did Anna use for her experiment?",
            acceptable_answers: [
              "She used a glass jar, warm water, and ice cubes.",
              "Anna used a glass jar, warm water, and ice cubes.",
              "A glass jar, warm water, and ice."
            ]
          },
          {
            id: "result",
            cue_prompt: "What / happened",
            cue_word: "what happened",
            value: "Tiny water drops fell like gentle rain",
            nova_question: "What happened during Anna's experiment?",
            acceptable_answers: [
              "Tiny water drops fell like gentle rain.",
              "Water drops fell inside the jar.",
              "Tiny water drops fell like rain."
            ]
          },
          {
            id: "room_number",
            cue_prompt: "Which / room",
            cue_word: "which room",
            value: "Science Lab 4B",
            nova_question: "Which room was Anna's project presented in?",
            acceptable_answers: [
              "It was presented in Science Lab 4B.",
              "In Science Lab 4B.",
              "Science Lab 4B."
            ]
          },
          {
            id: "award_won",
            cue_prompt: "What prize / win",
            cue_word: "what prize",
            value: "First Prize Gold Shield",
            nova_question: "What prize did Anna win for her project?",
            acceptable_answers: [
              "She won the First Prize Gold Shield.",
              "Anna won First Prize Gold Shield.",
              "The First Prize Gold Shield."
            ]
          }
        ]
      }
    },

    picture_story: {
      part: 3,
      title: "The Missing Biscuit Mystery",
      instructions: "Look at the 5 pictures. They show a story about missing biscuits. Tell the story to Nova.",
      examiner_intro: "These pictures tell a story called 'The Missing Biscuit Mystery'. Look at picture 1 first. Clara and Toby baked twelve warm chocolate cookies and left them on the kitchen table. Now you tell the story.",
      frames: [
        {
          frame_id: 1,
          title: "Baking the Cookies",
          narration_prompt: "Clara and Toby place a fresh tray of twelve chocolate biscuits on the kitchen table to cool.",
          cue_keywords: ["bake", "twelve cookies", "tray", "kitchen", "smell"]
        },
        {
          frame_id: 2,
          title: "The Sneaky Puppy",
          narration_prompt: "While the children are outside washing their hands, their mischievous puppy Barnaby sneaks into the kitchen.",
          cue_keywords: ["puppy", "sneak", "table", "hungry", "sniff"]
        },
        {
          frame_id: 3,
          title: "Counting the Leftovers",
          narration_prompt: "When the children return, Clara counts the cookies and realizes three are missing from the tray.",
          cue_keywords: ["count", "missing", "nine cookies", "subtract", "surprised"]
        },
        {
          frame_id: 4,
          title: "Following the Crumbs",
          narration_prompt: "Toby spots a trail of sweet chocolate crumbs leading under the dining room armchair.",
          cue_keywords: ["crumbs", "trail", "floor", "follow", "armchair"]
        },
        {
          frame_id: 5,
          title: "The Sleepy Cookie Monster",
          narration_prompt: "They find puppy Barnaby curled up asleep with a full tummy, looking like a little cookie monster.",
          cue_keywords: ["asleep", "tummy", "cookie monster", "laugh", "happy"]
        }
      ]
    },

    personal_questions: {
      part: 4,
      instructions: "Answer Nova's questions about nature, school subjects, and snacks.",
      questions: [
        {
          id: 1,
          topic: "Favourite school subject",
          question: "Do you prefer science experiments or math puzzles at school?",
          follow_up: "What is the most interesting project you have done in that subject?"
        },
        {
          id: 2,
          topic: "Insects and nature",
          question: "Have you ever observed a butterfly or caterpillar in your garden or a park?",
          follow_up: "What did it look like and what was it doing?"
        },
        {
          id: 3,
          topic: "Rainy days",
          question: "What do you like to do on days when it rains heavily outside?",
          follow_up: "Do you like playing board games or reading books indoors?"
        },
        {
          id: 4,
          topic: "Baking and sharing snacks",
          question: "Do you enjoy baking cookies or snacks with your family?",
          follow_up: "Who do you like to share your favourite treats with?"
        }
      ]
    }
  }
};
