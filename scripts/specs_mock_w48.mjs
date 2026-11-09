/**
 * scripts/specs_mock_w48.mjs
 * 
 * SPECIFICATIONS FOR MOCK EXAM WEEK 48 (STAGE 1 A2 FLYERS)
 * Cumulative Grounding: Weeks 45, 46, 47, 48
 * Theme: "Measuring Up (Length) & Geometry Explorers"
 */

export const mockSpecW48 = {
  week: 48,
  theme: 'Measuring Up (Length)',
  exam_title: 'Cambridge A2 Flyers Full Mock 4 (Weeks 45-48 Synthesis)',
  cefr_level: 'A2 Flyers',
  cumulativeBlock: [45, 46, 47, 48],

  source_grounding: {
    w45_source_words: ['square', 'circle', 'triangle', 'rectangle', 'side'],
    w46_source_words: ['pattern', 'next', 'repeat', 'sequence', 'puzzle'],
    w47_source_words: ['twenty', 'thirty', 'hundred', 'count', 'number'],
    w48_source_words: ['long', 'short', 'tall', 'measure', 'ruler'],
    grammar_grounding_summary: {
      w45_grammar: 'Geometric properties and descriptive clauses (has four sides, is round)',
      w46_grammar: 'Pattern sequences and logical prediction (the next one will be...)',
      w47_grammar: 'Large cardinal numbers, counting, and place value structures',
      w48_grammar: 'Measurement expressions of dimension (is [number] centimeters long/tall)'
    },
    parts_grounding: {
      listening_p1: 'Junior Architecture & Design Studio with George, Holly, William, Penny, Oscar',
      listening_p2: 'Penny Davis registering for the Young Builders & Geometry Club',
      listening_p3: 'Matching student geometric models to their architectural designs (A-H)',
      listening_p4: '3-picture MCQs about the school tower building competition',
      listening_p5: 'Design studio diagram colouring shapes and writing DESIGN',
      reading_p1: '10 definitions matching geometry, logic pattern, and measurement vocabulary',
      reading_p2: 'George discussing playground wooden structures with Architect Helen',
      reading_p3: 'Story cloze on building a geometric treehouse with secret patterns',
      reading_p4: 'Factual article explaining how ancient builders used rulers and triangles',
      reading_p5: 'Extended story about measuring tree heights in the school arboretum project',
      reading_p6: 'Diary open cloze written by young builder William',
      reading_p7: '3-panel picture story writing: Building the Tallest Wooden Tower',
      speaking_p1: 'Spot 5 differences between Picture A and B in geometry craft studio',
      speaking_p2: 'Solo-AI cue cards: Table A Marcus\'s Tower Model / Table B Lily\'s Geometric Kite',
      speaking_p3: '5-frame picture story: The Lost Blue Ruler and the Craft Challenge',
      speaking_p4: '4 personal interview questions on favourite shapes, measuring, and building'
    }
  },

  vocab: [
    { id: 1, word: 'square', pos: 'noun', ipa: '/skweər/', definition_en: 'A flat shape with four equal straight sides and four right angles.', definition_vi: 'hình vuông', example_en: 'The craft table has a square wooden top with four straight edges.', sourceWeek: 45 },
    { id: 2, word: 'circle', pos: 'noun', ipa: '/ˈsɜːrkəl/', definition_en: 'A completely round flat shape without corners.', definition_vi: 'hình tròn', example_en: 'The clock on the classroom wall is shaped like a perfect circle.', sourceWeek: 45 },
    { id: 3, word: 'triangle', pos: 'noun', ipa: '/ˈtraɪæŋɡəl/', definition_en: 'A flat geometric shape with three straight sides and three angles.', definition_vi: 'hình tam giác', example_en: 'The roof of the playhouse forms a sturdy green triangle.', sourceWeek: 45 },
    { id: 4, word: 'rectangle', pos: 'noun', ipa: '/ˈrektæŋɡəl/', definition_en: 'A flat shape with four straight sides and four right angles, two longer.', definition_vi: 'hình chữ nhật', example_en: 'Our school whiteboard is a large white rectangle on the wall.', sourceWeek: 45 },
    { id: 5, word: 'side', pos: 'noun', ipa: '/saɪd/', definition_en: 'A straight outer boundary line of a flat geometric shape.', definition_vi: 'cạnh (hình học)', example_en: 'A square has four equal sides, but a triangle only has three.', sourceWeek: 45 },
    { id: 6, word: 'pattern', pos: 'noun', ipa: '/ˈpætərn/', definition_en: 'A repeated decorative design or ordered sequence of things.', definition_vi: 'hoa văn, quy luật lặp', example_en: 'The floor tiles form a neat pattern of alternating blue and white squares.', sourceWeek: 46 },
    { id: 7, word: 'next', pos: 'adj', ipa: '/nekst/', definition_en: 'Coming immediately after in time, order, or sequence.', definition_vi: 'tiếp theo, kế tiếp', example_en: 'Look at the pattern to predict which colour comes next.', sourceWeek: 46 },
    { id: 8, word: 'repeat', pos: 'verb', ipa: '/rɪˈpiːt/', definition_en: 'To happen or perform again in the same order.', definition_vi: 'lặp lại', example_en: 'The rhythm and colours repeat across the entire mosaic.', sourceWeek: 46 },
    { id: 9, word: 'sequence', pos: 'noun', ipa: '/ˈsiːkwəns/', definition_en: 'A particular order in which related things follow each other.', definition_vi: 'chuỗi thứ tự', example_en: 'Arrange the number cards in a correct ascending sequence.', sourceWeek: 46 },
    { id: 10, word: 'puzzle', pos: 'noun', ipa: '/ˈpʌzəl/', definition_en: 'A game or problem designed to test mental skill or logic.', definition_vi: 'câu đố, trò chơi trí tuệ', example_en: 'Solving the geometric tangram puzzle took twenty minutes.', sourceWeek: 46 },
    { id: 11, word: 'twenty', pos: 'num', ipa: '/ˈtwenti/', definition_en: 'The number equal to two tens (20).', definition_vi: 'số hai mươi', example_en: 'There were twenty wooden blocks inside the cardboard box.', sourceWeek: 47 },
    { id: 12, word: 'thirty', pos: 'num', ipa: '/ˈθɜːrti/', definition_en: 'The number equal to three tens (30).', definition_vi: 'số ba mươi', example_en: 'Our wooden ruler is thirty centimeters long.', sourceWeek: 47 },
    { id: 13, word: 'hundred', pos: 'num', ipa: '/ˈhʌndrəd/', definition_en: 'The number equal to ten tens (100).', definition_vi: 'một trăm', example_en: 'There are one hundred centimeters in a single meter.', sourceWeek: 47 },
    { id: 14, word: 'count', pos: 'verb', ipa: '/kaʊnt/', definition_en: 'To name numbers in order to find the total quantity.', definition_vi: 'đếm số lượng', example_en: 'Count how many red triangles you can see in the drawing.', sourceWeek: 47 },
    { id: 15, word: 'number', pos: 'noun', ipa: '/ˈnʌmbər/', definition_en: 'An arithmetical value showing an amount or order.', definition_vi: 'con số', example_en: 'Write the number of centimetres next to each shape.', sourceWeek: 47 },
    { id: 16, word: 'long', pos: 'adj', ipa: '/lɔːŋ/', definition_en: 'Measuring a great distance from end to end.', definition_vi: 'dài', example_en: 'The bridge over the park stream is six meters long.', sourceWeek: 48 },
    { id: 17, word: 'short', pos: 'adj', ipa: '/ʃɔːrt/', definition_en: 'Measuring a small distance from end to end.', definition_vi: 'ngắn', example_en: 'Use a short pencil to trace the little circular coins.', sourceWeek: 48 },
    { id: 18, word: 'tall', pos: 'adj', ipa: '/tɔːl/', definition_en: 'Having a greater than average height from bottom to top.', definition_vi: 'cao', example_en: 'The wooden tower was eighty centimeters tall.', sourceWeek: 48 },
    { id: 19, word: 'measure', pos: 'verb', ipa: '/ˈmeʒər/', definition_en: 'To find the exact size, length, or height of something.', definition_vi: 'đo lường', example_en: 'We will measure each wooden plank before cutting it.', sourceWeek: 48 },
    { id: 20, word: 'ruler', pos: 'noun', ipa: '/ˈruːlər/', definition_en: 'A straight strip of plastic or wood marked with centimeters.', definition_vi: 'thước kẻ', example_en: 'Use a plastic ruler to draw straight lines on your paper.', sourceWeek: 48 }
  ],

  listening_p1: {
    part: 1,
    instructions: "Listen and look. There is one example. Draw lines to match names to the correct people in the picture.",
    audio_script: "Narrator: Part 1. Listen and look. There is one example.\nMan: Look at the Young Architects Design Studio! The children are building incredible models.\nWoman: Yes! Who is that man near the front chalkboard?\nMan: The man holding a big yellow wooden triangle? That is Michael, our architecture teacher.\nWoman: He is explaining how triangles make structures strong.\nNarrator: Can you see the line? This is an example. Now you listen and draw lines.\n\n[1]\nWoman: Who is that boy measuring a long wooden plank at the craft bench?\nMan: The boy with the striped jumper? That is George. He is using a thirty-centimeter ruler to check the wood.\nWoman: He is measuring very carefully!\n\n[2]\nWoman: Look at that girl painting neat shapes on a square ceramic tile.\nMan: That is Holly. She is painting a repeating sequence of blue diamonds and red circles.\nWoman: Her tile pattern looks beautiful!\n\n[3]\nWoman: Who is the boy stacking wooden rectangular blocks into a tall tower?\nMan: Ah, that is William. He wants his tower to be one meter high.\nWoman: Goodness, that will be taller than the table!\n\n[4]\nWoman: Is that Penny sitting by the window counting shiny green beads?\nMan: Yes, Penny is counting twenty glass beads to complete her circular mosaic design.\nWoman: She has organized them in neat groups of five.\n\n[5]\nWoman: And who is the boy cutting cardboard triangles with silver safety scissors?\nMan: That is Oscar. He is building a cardboard pyramid for his history project.\nWoman: His cardboard edges look perfectly straight.",
    items: [
      { id: 1, name: "George", location: "boy in striped jumper measuring wooden plank with yellow ruler", x: 240, y: 350, target: "boy measuring plank with yellow ruler" },
      { id: 2, name: "Holly", location: "girl painting repeating pattern of shapes on ceramic tile", x: 490, y: 410, target: "girl painting pattern on ceramic tile" },
      { id: 3, name: "William", location: "boy stacking rectangular blocks into tall tower on table", x: 740, y: 260, target: "boy stacking blocks into tall tower" },
      { id: 4, name: "Penny", location: "girl by window counting green glass beads for mosaic", x: 380, y: 190, target: "girl counting green beads by window" },
      { id: 5, name: "Oscar", location: "boy cutting cardboard triangles with silver scissors", x: 860, y: 430, target: "boy cutting cardboard triangles with scissors" }
    ],
    example: { name: "Michael", location: "teacher holding big yellow wooden triangle near board", x: 130, y: 270 }
  },

  listening_p2: {
    part: 2,
    instructions: "Listen and look. There is one example. Read the notes and fill in the missing information.",
    audio_script: "Narrator: Part 2. Listen and look. There is one example.\nWoman: Hello! Welcome to the Young Builders and Geometry Club. May I take your details?\nGirl: Yes please, Miss Evans. My first name is Penny.\nWoman: Penny, lovely. Let me record your name.\nNarrator: Can you see the answer? Now you listen and write.\n\n[1]\nWoman: What is your surname, Penny?\nGirl: It is Davis. That is spelled D-A-V-I-S.\nWoman: Thank you, Penny Davis.\n\n[2]\nWoman: How old are you now?\nGirl: I was ten in August, so I am ten years old.\nWoman: Ten years old, excellent.\n\n[3]\nWoman: Which day would you like to come to our geometry workshop?\nGirl: I have swimming on Mondays, so Wednesday afternoon is best for me.\nWoman: Wednesday from four to five fifteen. That is booked.\n\n[4]\nWoman: Which classroom will our club meet in?\nGirl: Is it in Room 5B in the math wing?\nWoman: Yes, Room 5B on the first floor.\n\n[5]\nWoman: What tool must every builder bring to their first project class?\nGirl: Should I bring glue?\nWoman: No, the school provides glue. You must bring a wooden ruler for measuring.\nGirl: Wonderful! I have a sturdy thirty-centimeter wooden ruler in my pencil case.",
    example: { field: "First name", value: "Penny" },
    items: [
      { id: 1, question: "Surname", prompt: "Surname:", answer: "Davis" },
      { id: 2, question: "Age", prompt: "Age:", answer: "10" },
      { id: 3, question: "Day of workshop", prompt: "Day of workshop:", answer: "Wednesday" },
      { id: 4, question: "Meeting room", prompt: "Meeting room:", answer: "5B" },
      { id: 5, question: "Must bring", prompt: "Must bring:", answer: "wooden ruler" }
    ]
  },

  listening_p3: {
    part: 3,
    instructions: "Listen and look. Which model did each student construct? Match each student to their model letter (A–H).",
    audio_script: "Narrator: Part 3. Listen and look. There is one example. Which model did each student construct?\nGirl: Look at all the architectural models on the display table, Mr Foster!\nMan: Our young builders did fantastic work, Holly. George constructed that long suspension bridge using wooden sticks.\nGirl: That bridge has strong rectangular towers! That is letter E.\nNarrator: Can you see the letter E? Now you listen and write a letter in each box.\n\n[1]\nMan: Holly, tell me about your project on the display board.\nGirl: I made a ceramic mosaic star tile with a repeating pattern of triangles and diamonds.\nMan: That colourful star tile is letter B. The symmetry is very impressive!\n\n[2]\nGirl: What about William's model?\nMan: William designed a tall clock tower out of stacked cardboard rectangles and a circular dial.\nGirl: Ah, letter G! It stands eighty centimeters tall on the table.\n\n[3]\nGirl: Look at this neat triangular pyramid tent!\nMan: Penny built that geometric pyramid tent using balsa wood and canvas fabric.\nGirl: That is letter A. It looks like a real explorer camp!\n\n[4]\nMan: Did you see Oscar's clever logic project?\nGirl: The circular maze puzzle where you guide a marble through repeating paths?\nMan: Exactly! That round maze is letter D.\n\n[5]\nGirl: And who constructed that lovely green greenhouse with a triangular glass roof?\nMan: Chloe designed that model greenhouse. She measured every window frame to fit perfectly.\nGirl: Letter F! It looks so bright and sunny.",
    example: { day_or_item: "George", letter: "E" },
    letters_available: [
      { letter: "A", description: "Geometric pyramid tent with balsa wood frame" },
      { letter: "B", description: "Ceramic mosaic star tile with repeating patterns" },
      { letter: "C", description: "Cardboard checkerboard with twenty squares" },
      { letter: "D", description: "Circular maze puzzle with marble path" },
      { letter: "E", description: "Rectangular suspension bridge with towers" },
      { letter: "F", description: "Greenhouse model with triangular glass roof" },
      { letter: "G", description: "Tall clock tower model with round dial" },
      { letter: "H", description: "Cardboard windmill with rotating sails" }
    ],
    items: [
      { id: 1, day_or_item: "Holly", letter: "B", target: "mosaic star tile with repeating patterns" },
      { id: 2, day_or_item: "William", letter: "G", target: "tall clock tower model" },
      { id: 3, day_or_item: "Penny", letter: "A", target: "geometric pyramid tent" },
      { id: 4, day_or_item: "Oscar", letter: "D", target: "circular maze puzzle" },
      { id: 5, day_or_item: "Chloe", letter: "F", target: "greenhouse with triangular roof" }
    ]
  },

  listening_p4: {
    part: 4,
    instructions: "Listen and look. There is one example. Choose the correct answer (A, B, or C).",
    audio_script: "Narrator: Part 4. Listen and look. There is one example. What material did William use for his tower walls?\nWoman: Did you make your model tower from plastic bricks, William?\nBoy: No, we used sturdy balsa wood blocks because they are easy to measure and glue.\nWoman: Balsa wood is great for model building.\nNarrator: Can you see the tick? Now you listen and choose the correct answer.\n\n[1] Which shape did William use for the tower base?\nWoman: What shape was the foundation of your tower, William?\nBoy: We tried a circle first, but a wide square block kept the tower much more stable!\nWoman: Yes, a square base provides four strong corners.\n\n[2] How tall was the winning tower?\nWoman: How high was the winning tower in the competition?\nBoy: One team reached fifty centimeters, but George and William's tower measured seventy centimeters tall!\nWoman: Seventy centimeters! That is really tall for wooden blocks.\n\n[3] What colour was George's favorite wooden ruler?\nWoman: Which ruler did George use to measure the planks?\nBoy: He brought a bright yellow wooden ruler marked with millimeters and centimeters.\nWoman: That must have made measuring very clear.\n\n[4] How many blocks did Holly stack in her tower?\nWoman: Did Holly build a high tower as well?\nBoy: Yes! She counted exactly thirty wooden blocks in her sequence before it stopped.\nWoman: Thirty blocks is a lot of counting!\n\n[5] What prize did the best builders receive?\nWoman: Did the teachers give out prizes at the end of the competition?\nBoy: Yes, each winner received a shiny golden ruler award to keep.\nWoman: What a wonderful prize for young architects!",
    example: { question: "What material did William use for his tower walls?", answer: "C" },
    items: [
      {
        id: 1,
        question: "Which shape did William use for the tower base?",
        options: [
          { letter: "A", text: "A round circular disc" },
          { letter: "B", text: "A wide square block" },
          { letter: "C", text: "A narrow triangle" }
        ],
        answer: "B"
      },
      {
        id: 2,
        question: "How tall was the winning tower?",
        options: [
          { letter: "A", text: "Fifty centimeters tall" },
          { letter: "B", text: "Sixty centimeters tall" },
          { letter: "C", text: "Seventy centimeters tall" }
        ],
        answer: "C"
      },
      {
        id: 3,
        question: "What colour was George's favorite wooden ruler?",
        options: [
          { letter: "A", text: "Bright yellow" },
          { letter: "B", text: "Dark green" },
          { letter: "C", text: "Silver grey" }
        ],
        answer: "A"
      },
      {
        id: 4,
        question: "How many blocks did Holly stack in her tower?",
        options: [
          { letter: "A", text: "Twenty blocks" },
          { letter: "B", text: "Thirty blocks" },
          { letter: "C", text: "Forty blocks" }
        ],
        answer: "B"
      },
      {
        id: 5,
        question: "What prize did the best builders receive?",
        options: [
          { letter: "A", text: "A golden ruler award" },
          { letter: "B", text: "A box of coloured paints" },
          { letter: "C", text: "A certificate and book" }
        ],
        answer: "A"
      }
    ]
  },

  listening_p5: {
    part: 5,
    instructions: "Listen and look. There is one example. Colour and write.",
    audio_script: "Narrator: Part 5. Listen and look. There is one example.\nMan: Welcome to the Architecture and Craft Studio, Holly. Would you like to colour our workshop diagram?\nGirl: Yes please! May I colour the large model triangle sitting on the teacher's desk?\nMan: Sure! Colour that large triangle yellow.\nGirl: Yellow triangle on the desk. Doing that now.\nNarrator: Can you see the yellow triangle? This is an example. Now you listen and colour and write.\n\n[1]\nMan: Now look under the main craft table. There is a rectangular storage box for wooden blocks.\nGirl: I see it. It has two small handles.\nMan: Can you colour that rectangular storage box blue?\nGirl: Blue for the storage box, done!\n\n[2]\nMan: Look on the back wall near the calendar. There is a round clock shaped like a circle.\nGirl: Yes, showing half past two.\nMan: Please colour that round circle clock red.\nGirl: Red makes it stand out clearly.\n\n[3]\nMan: Now I would like you to write a word on the picture.\nGirl: Where should I write it?\nMan: Look at the long cloth banner hanging above the chalkboard.\nGirl: Above the chalkboard? Yes, I see the banner.\nMan: Write the word DESIGN on it in neat capital letters.\nGirl: D-E-S-I-G-N. I have written DESIGN on the banner.\nMan: Perfect!\n\n[4]\nGirl: What should I colour next?\nMan: Look beside the tall bookshelf. There is a long wooden meter ruler leaning against the wall.\nGirl: It is very tall!\nMan: Colour that tall wooden ruler brown.\nGirl: Brown like natural oak wood. Finished.\n\n[5]\nMan: For the last part, look at the square mosaic tile resting on the small display easel.\nGirl: The tile with the star pattern?\nMan: Yes! Colour that square mosaic tile purple.\nGirl: Purple looks brilliant! The whole architecture diagram is complete now.",
    example: { instruction: "Colour the large model triangle on the teacher's desk yellow", target: "large triangle on teacher's desk", colour: "yellow" },
    items: [
      { id: 1, type: "colour", target: "rectangular storage box under the table", colour: "blue", action: "Colour the rectangular storage box under the table blue" },
      { id: 2, type: "colour", target: "round circle clock on the wall", colour: "red", action: "Colour the round circle clock on the wall red" },
      { id: 3, type: "write", target: "banner hanging above the chalkboard", text: "DESIGN", action: "Write the word 'DESIGN' on the banner above the chalkboard" },
      { id: 4, type: "colour", target: "tall wooden ruler leaning against bookshelf", colour: "brown", action: "Colour the tall wooden ruler leaning against the bookshelf brown" },
      { id: 5, type: "colour", target: "square mosaic tile on the display easel", colour: "purple", action: "Colour the square mosaic tile on the display easel purple" }
    ]
  },

  reading_p1: {
    part: 1,
    instructions: "Look and read. Choose the correct words and write them on the lines. There is one example.",
    example: { definition: "A straight plastic or wooden tool marked in centimeters used to draw lines and measure.", answer: "ruler" },
    word_bank: [
      "square", "ruler", "pattern", "circle", "tall",
      "triangle", "measure", "rectangle", "puzzle", "hundred",
      "side", "long", "count", "sequence", "short"
    ],
    items: [
      { id: 1, definition: "A flat shape with four equal straight sides and four right angles.", answer: "square" },
      { id: 2, definition: "A repeated design or sequence of shapes and colors that follows a rule.", answer: "pattern" },
      { id: 3, definition: "A completely round flat shape that has no corners or straight edges.", answer: "circle" },
      { id: 4, definition: "Having a greater height from the ground than other objects.", answer: "tall" },
      { id: 5, definition: "A flat geometric shape with three straight sides and three sharp angles.", answer: "triangle" },
      { id: 6, definition: "To find the exact length, height, or width of something using a tool.", answer: "measure" },
      { id: 7, definition: "A flat shape with four straight sides and four right angles, two longer than the others.", answer: "rectangle" },
      { id: 8, definition: "A challenging game or problem that tests your mental skill or logic.", answer: "puzzle" },
      { id: 9, definition: "The number that comes after ninety-nine, equal to ten tens.", answer: "hundred" },
      { id: 10, definition: "One of the straight outer boundary lines that forms a flat geometric shape.", answer: "side" }
    ]
  },

  reading_p2: {
    part: 2,
    instructions: "George is talking to Architect Helen about designing playground structures. What does George say? Read the conversation and choose the best answer (A–H). There is one example.",
    example: { speaker_prompt: "Good morning George! What are you drawing in your sketchbook?", answer: "E" },
    options: [
      { letter: "A", text: "Because triangles form rigid structures that do not bend easily." },
      { letter: "B", text: "The wooden plank is seventy centimeters long and twenty wide." },
      { letter: "C", text: "We bought sandwiches and juice at the corner bakery." },
      { letter: "D", text: "I used my thirty-centimeter plastic ruler to draw straight lines." },
      { letter: "E", text: "I am designing a wooden playground tower with climbing ramps!" },
      { letter: "F", text: "The next beam in our repeating sequence will be bright red." },
      { letter: "G", text: "They will walk home together when school finishes." },
      { letter: "H", text: "It rained heavily last Tuesday afternoon." }
    ],
    items: [
      { id: 1, speaker_prompt: "Why did you choose triangular supports for the tower roof?", answer: "A" },
      { id: 2, speaker_prompt: "How long is the main climbing beam on your plan?", answer: "B" },
      { id: 3, speaker_prompt: "How did you make sure all your rectangular walls were straight?", answer: "D" },
      { id: 4, speaker_prompt: "What colour will come next in your wall fence pattern?", answer: "F" },
      { id: 5, speaker_prompt: "Did you take a break when your team finished measuring?", answer: "C" }
    ]
  },

  reading_p3: {
    part: 3,
    instructions: "Read the story. Choose a word from the box. Write the correct word next to numbers 1–5. There is one example.",
    text: "During the autumn holidays, William and his sister Holly decided to build a geometric treehouse in their garden oak tree. First, Dad helped them cut four sturdy wooden planks to make a strong [1] base for the floor. William took out his wooden [2] to check each edge. 'Every side must measure eighty centimeters exactly,' William explained. Next, Holly painted a colourful [3] of repeating circles and diamonds along the front railings. It looked like a lovely piece of art. For the roof, they assembled two sloping balsa wood planks into a sturdy [4]. Finally, William stepped back onto the lawn to inspect their creation. The treehouse stood proudly on a [5] branch four meters above the grass. Dad and the children smiled happily and climbed up the wooden rope ladder to celebrate.",
    word_bank: [
      { word: "square", pos: "noun" },
      { word: "ruler", pos: "noun" },
      { word: "pattern", pos: "noun" },
      { word: "triangle", pos: "noun" },
      { word: "tall", pos: "adj" },
      { word: "puzzle", pos: "noun" },
      { word: "hundred", pos: "num" },
      { word: "measure", pos: "verb" }
    ],
    items: [
      { id: 1, blank_id: 1, answer: "square" },
      { id: 2, blank_id: 2, answer: "ruler" },
      { id: 3, blank_id: 3, answer: "pattern" },
      { id: 4, blank_id: 4, answer: "triangle" },
      { id: 5, blank_id: 5, answer: "tall" }
    ],
    title_question: {
      id: 6,
      question: "Now choose the best name for the story.",
      options: [
        "A windy day at the ocean beach",
        "Building the geometric treehouse",
        "How to bake sweet berry biscuits"
      ],
      answer: "Building the geometric treehouse"
    }
  },

  reading_p4: {
    part: 4,
    instructions: "Read the text. Choose the right words and write them on the lines.",
    text: "Long ago, ancient builders used geometry and measurement to create [1] most famous monuments on Earth. The Great Pyramids of Egypt [2] built using huge stone blocks cut with incredible precision. Egyptian architects did not have modern digital tools, [3] they used knotted ropes and wooden measuring rods. Each side of a pyramid is shaped like a giant [4] that slopes up to a pointed summit. Triangles are very strong shapes [5] they distribute heavy weight evenly across their base. Roman builders later discovered [6] to use arches and circles to construct long aqueducts [7] carried fresh water across deep valleys. In medieval times, stone masons carved beautiful repeating [8] into church windows and marble floors. Today, modern architects still [9] mathematical rulers and geometric shapes to design towering skyscrapers. Geometry continues to shape the world we live [10] every single day.",
    items: [
      { id: 1, blank_id: 1, options: ["the", "a", "an"], answer: "the" },
      { id: 2, blank_id: 2, options: ["were", "was", "are"], answer: "were" },
      { id: 3, blank_id: 3, options: ["so", "or", "because"], answer: "so" },
      { id: 4, blank_id: 4, options: ["triangle", "triangles", "triangled"], answer: "triangle" },
      { id: 5, blank_id: 5, options: ["because", "although", "unless"], answer: "because" },
      { id: 6, blank_id: 6, options: ["how", "what", "which"], answer: "how" },
      { id: 7, blank_id: 7, options: ["that", "who", "whom"], answer: "that" },
      { id: 8, blank_id: 8, options: ["patterns", "pattern", "patterned"], answer: "patterns" },
      { id: 9, blank_id: 9, options: ["use", "uses", "used"], answer: "use" },
      { id: 10, blank_id: 10, options: ["in", "on", "at"], answer: "in" }
    ]
  },

  reading_p5: {
    part: 5,
    instructions: "Look at the picture and read the story. Write some words to complete the sentences about the story. You can use 1, 2, 3 or 4 words.",
    story: "Last Tuesday, the year five pupils at St. Matthew's Academy took part in the Great School Grounds Measurement Challenge. Their science teacher, Mr Cooper, wanted the class to map and measure the old garden orchard. He divided the students into teams of three and gave each group a clipboard, a fifty-meter measuring tape, and a wooden ruler. Holly, William, and Penny were in Team Gold. Their first task was to measure the perimeter of the school herb garden. Holly walked around the garden with the measuring tape while William recorded the lengths. The herb garden was a tidy rectangle measuring twenty meters long and ten meters wide. 'That means the total perimeter is sixty meters!' Penny calculated quickly. Next, the children had to measure the shadow cast by the ancient cedar tree. At two o'clock, the cedar's shadow measured fifteen meters long on the grass. Mr Cooper showed them how to use a cardboard triangle to estimate the tree's actual height. By comparing the triangle angles, Team Gold calculated that the cedar was twelve meters tall. Mr Cooper praised the children for their precise counting and math skills. Team Gold received a shiny wooden trophy shaped like a geometric compass.",
    example: { prompt: "The challenge took place at", answer: "St. Matthew's Academy" },
    items: [
      { id: 1, prompt: "Mr Cooper divided the pupils into teams of", answer: "three" },
      { id: 2, prompt: "Holly, William, and Penny were members of", answer: "Team Gold" },
      { id: 3, prompt: "The school herb garden was shaped like a", answer: "tidy rectangle" },
      { id: 4, prompt: "The herb garden was twenty meters long and", answer: "ten meters wide" },
      { id: 5, prompt: "At two o'clock, the cedar's shadow was fifteen", answer: "meters long" },
      { id: 6, prompt: "The children used a cardboard triangle to calculate the tree was", answer: "twelve meters tall" },
      { id: 7, prompt: "Team Gold won a trophy shaped like a", answer: "geometric compass" }
    ]
  },

  reading_p6: {
    part: 6,
    instructions: "Read the diary and write the missing words. Write one word on each line.",
    text: "Saturday, 20th October\nToday I built a brilliant model bridge with Grandpa in his garden workshop! First, we measured eight wooden sticks [1] a thirty-centimeter ruler. It [2] very satisfying to cut them into identical lengths. We glued the sticks together [3] make strong rectangular towers. Grandpa explained that triangles [4] the best shapes for bridge trusses. Tomorrow, we [5] paint our bridge dark green and test how many model cars it can carry!",
    items: [
      { id: 1, blank_id: 1, answer: "with" },
      { id: 2, blank_id: 2, answer: "was" },
      { id: 3, blank_id: 3, answer: "to" },
      { id: 4, blank_id: 4, answer: "are" },
      { id: 5, blank_id: 5, answer: "will" }
    ]
  },

  writing_hub: {
    picture_story: {
      title: "Building the Tallest Wooden Tower",
      instructions: "Look at the three pictures. Write the story. Write 20 or more words.",
      min_words: 20,
      model_sentence: "One sunny afternoon, William and Holly measured rectangular wooden blocks carefully using a thirty-centimeter ruler in their school craft studio. They stacked thirty blocks in a sturdy repeating pattern to build a very tall tower. Finally, the teacher measured their impressive tower at seventy centimeters, and the delighted children celebrated winning first prize.",
      rubric: {
        content: 2,
        grammar_flow: 2,
        vocab_spelling: 1,
        total: 5
      },
      panels: [
        {
          panel_id: 1,
          title: "Measuring the Blocks",
          image_url: "/images/week48/writing_panel_1.png",
          caption: "William and Holly measure wooden blocks with a plastic ruler on the craft table.",
          word_bank: ["measure", "blocks", "ruler", "careful", "centimeter"]
        },
        {
          panel_id: 2,
          title: "Stacking in Sequence",
          image_url: "/images/week48/writing_panel_2.png",
          caption: "They stack thirty rectangular blocks in a steady, repeating sequence.",
          word_bank: ["stack", "tower", "pattern", "sequence", "tall"]
        },
        {
          panel_id: 3,
          title: "Winning the Trophy",
          image_url: "/images/week48/writing_panel_3.png",
          caption: "Their seventy-centimeter tower wins first prize, and the children smile proudly.",
          word_bank: ["measured", "winner", "trophy", "delighted", "proud"]
        }
      ],
      ladder_steps: [
        { stage: "MODEL", focus: "Analyze 3-panel narrative using measurement descriptions and Past Simple" },
        { stage: "BUILD", focus: "Draft 1-2 sentences per panel connecting building steps and dimensions" },
        { stage: "WRITE", focus: "Compose complete paragraph narrative ensuring >= 20 words" },
        { stage: "EXPAND", focus: "Add descriptive details (sturdy blocks, repeating pattern, proud)" }
      ]
    }
  },

  speaking_hub: {
    find_differences: {
      part: 1,
      instructions: "Look at the two pictures. Find 5 differences and describe them to Nova.",
      examiner_script: "Here are two pictures of the Architecture and Geometry Studio. They look similar, but some things are different. In Picture A, the teacher is holding a big triangle, but in Picture B, the teacher is holding a big square. Now what other differences can you see?",
      differences: [
        { id: 1, picture_a: "The teacher is holding a big yellow triangle", picture_b: "The teacher is holding a big yellow square" },
        { id: 2, picture_a: "There is a blue rectangular storage box under the table", picture_b: "There is a red circular basket under the table" },
        { id: 3, picture_a: "The boy is measuring a wooden plank with a yellow ruler", picture_b: "The boy is cutting paper with silver scissors" },
        { id: 4, picture_a: "The clock on the wall shows half past two", picture_b: "The clock on the wall shows quarter past four" },
        { id: 5, picture_a: "The wooden tower on the bench has six blocks", picture_b: "The wooden tower on the bench has eight blocks" }
      ]
    },

    info_exchange_cards: {
      table_a: {
        title: "Marcus's Tower Model",
        person: "Marcus",
        fields: [
          {
            id: "location",
            cue_prompt: "Where / built",
            cue_word: "where",
            is_missing: true,
            acceptable_questions: [
              "Where did Marcus build his tower model?",
              "Where was Marcus's tower built?",
              "Where is the tower model?"
            ],
            nova_reply: "Marcus built his tower model in the school design laboratory."
          },
          {
            id: "height",
            cue_prompt: "How tall / tower",
            cue_word: "how tall",
            is_missing: true,
            acceptable_questions: [
              "How tall is the tower model?",
              "How tall is Marcus's tower?",
              "What is the height of the tower?"
            ],
            nova_reply: "His tower model is seventy-five centimeters tall."
          },
          {
            id: "material",
            cue_prompt: "What material / use",
            cue_word: "what material",
            is_missing: true,
            acceptable_questions: [
              "What material did Marcus use?",
              "What did he use to build the tower?",
              "What is the tower made of?"
            ],
            nova_reply: "He used thirty rectangular balsa wood blocks."
          },
          {
            id: "time_taken",
            cue_prompt: "How long / take",
            cue_word: "how long",
            is_missing: true,
            acceptable_questions: [
              "How long did it take to build?",
              "How long did Marcus take?",
              "How many hours did it take?"
            ],
            nova_reply: "It took Marcus two hours to assemble and glue the blocks."
          },
          {
            id: "prize_won",
            cue_prompt: "What prize / win",
            cue_word: "what prize",
            is_missing: true,
            acceptable_questions: [
              "What prize did Marcus win?",
              "Did Marcus win a prize?",
              "What award did he get?"
            ],
            nova_reply: "He won the Junior Architect Gold Badge."
          }
        ]
      },
      table_b: {
        title: "Lily's Geometric Kite",
        person: "Lily",
        fields: [
          {
            id: "shape",
            cue_prompt: "What shape / kite",
            cue_word: "what shape",
            value: "A diamond with two triangles",
            nova_question: "What shape is Lily's geometric kite?",
            acceptable_answers: [
              "Her kite is a diamond with two triangles.",
              "It is a diamond with two triangles.",
              "A diamond with two triangles."
            ]
          },
          {
            id: "tail_length",
            cue_prompt: "How long / tail",
            cue_word: "how long",
            value: "One meter and twenty centimeters",
            nova_question: "How long is the kite's ribbon tail?",
            acceptable_answers: [
              "The tail is one meter and twenty centimeters long.",
              "It is one meter and twenty centimeters.",
              "One meter twenty centimeters."
            ]
          },
          {
            id: "colors",
            cue_prompt: "What colours / kite",
            cue_word: "what colours",
            value: "Bright red and yellow stripes",
            nova_question: "What colours did Lily paint on her kite?",
            acceptable_answers: [
              "She painted bright red and yellow stripes.",
              "Her kite has red and yellow stripes.",
              "Bright red and yellow stripes."
            ]
          },
          {
            id: "location",
            cue_prompt: "Where / fly",
            cue_word: "where fly",
            value: "Sunny Hill Park",
            nova_question: "Where did Lily fly her geometric kite?",
            acceptable_answers: [
              "She flew her kite at Sunny Hill Park.",
              "At Sunny Hill Park.",
              "Sunny Hill Park."
            ]
          },
          {
            id: "cost",
            cue_prompt: "How much / cost",
            cue_word: "how much",
            value: "Five pounds",
            nova_question: "How much did the materials cost?",
            acceptable_answers: [
              "The materials cost five pounds.",
              "It cost five pounds.",
              "Five pounds."
            ]
          }
        ]
      }
    },

    picture_story: {
      part: 3,
      title: "The Lost Blue Ruler",
      instructions: "Look at the 5 pictures. They show a story about finding a lost ruler. Tell the story to Nova.",
      examiner_intro: "These pictures tell a story called 'The Lost Blue Ruler'. Look at picture 1 first. William is sitting at his craft desk, but he cannot find his blue measuring ruler. Now you tell the story.",
      frames: [
        {
          frame_id: 1,
          title: "Looking for the Ruler",
          narration_prompt: "William searches through his pencil case and under his drawing paper, but his blue ruler is missing.",
          cue_keywords: ["search", "pencil case", "blue ruler", "missing", "worried"]
        },
        {
          frame_id: 2,
          title: "Asking Friends",
          narration_prompt: "He asks Holly and Penny if they have seen his ruler on the geometry craft table.",
          cue_keywords: ["ask", "friends", "table", "help", "look"]
        },
        {
          frame_id: 3,
          title: "Spotting Something Blue",
          narration_prompt: "Holly spots a bright blue corner poking out from behind the tall wooden block tower.",
          cue_keywords: ["spot", "corner", "behind", "tower", "blocks"]
        },
        {
          frame_id: 4,
          title: "Carefully Retrieving It",
          narration_prompt: "William carefully slides the ruler out without knocking over the tall tower.",
          cue_keywords: ["slide", "careful", "steady", "balance", "relief"]
        },
        {
          frame_id: 5,
          title: "Measuring Together",
          narration_prompt: "With his ruler back, William and his friends finish measuring their project happily.",
          cue_keywords: ["measure", "finish", "project", "happy", "success"]
        }
      ]
    },

    personal_questions: {
      part: 4,
      instructions: "Answer Nova's questions about shapes, building, and measurement.",
      questions: [
        {
          id: 1,
          topic: "Favourite shapes",
          question: "What is your favourite geometric shape, and what objects around your home have that shape?",
          follow_up: "Do you prefer drawing circles or straight rectangles?"
        },
        {
          id: 2,
          topic: "Building models",
          question: "Do you like building things with toy blocks, cardboard, or wooden sticks?",
          follow_up: "What is the tallest or most interesting thing you have ever built?"
        },
        {
          id: 3,
          topic: "Measuring things",
          question: "When do you use a ruler at school or at home?",
          follow_up: "Have you ever measured how tall you are on a wall chart?"
        },
        {
          id: 4,
          topic: "Logic and puzzles",
          question: "Do you enjoy solving jigsaw puzzles or pattern games with friends?",
          follow_up: "Who helps you when a puzzle is very tricky?"
        }
      ]
    }
  }
};
