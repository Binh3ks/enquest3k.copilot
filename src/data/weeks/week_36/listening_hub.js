/**
 * STAGED MOCK EXAM DELIVERABLE: Listening Paper (All 5 Parts / 25 Items)
 * Week: 36 | Level: Cambridge A2 Flyers | Mode: FULL_MOCK
 * Pipeline: scripts/generate_mock_exam_content.mjs (Round 65 Pilot Mock)
 * Cumulative Sourcing: Weeks 33, 34, 35, 36
 */

export const listeningHubData = {
  week: 36,
  theme: "Review & Project 3: \"My Adventure Book\"",
  cefr_level: "A2 Flyers",
  paper: "Listening",
  total_parts: 5,
  total_items: 25,
  time_allowed_minutes: 25,

  // ── Part 1: Draw Lines (5 items) ──────────────────────────────────────────
  // Scene: Adventure Camp activity ground near the forest lake
  listening_p1: {
    part: 1,
    instructions: "Listen and look. There is one example. Draw lines to match names to the correct people in the picture.",
    audio_script: "Narrator: Part 1. Listen and look. There is one example.\nMan: Look at this lovely photograph of our weekend adventure camp!\nWoman: Oh yes! Who is that boy holding the big compass?\nMan: That is Harry. He was showing the other scouts how to find north.\nNarrator: Can you see the line? This is an example. Now you listen and draw lines.\n\n[1]\nWoman: Who is the girl sitting near the yellow tent reading an adventure book?\nMan: The girl with glasses? That is Emma. She loves writing stories in her diary.\n\n[2]\nWoman: Look at that boy climbing carefully over the wooden bridge.\nMan: Ah, that is Oliver. He has a heavy blue backpack and a walking stick.\n\n[3]\nWoman: Is that Helen standing by the campfire with the first-aid box?\nMan: Yes! She helped Nurse Sarah bandage Jake's scraped knee earlier.\n\n[4]\nWoman: Who is the girl taking a photograph of the forest birds?\nMan: That is Sophia. She took lots of wonderful photos for our project.\n\n[5]\nWoman: And what about the boy packing a flashlight into his rucksack?\nMan: That is Richard. He always makes sure our team is ready before nightfall.",
    items: [
      { id: 1, name: "Emma", location: "sitting near the yellow tent reading a diary", x: 210, y: 340, target: "girl with glasses reading near tent" },
      { id: 2, name: "Oliver", location: "crossing the wooden bridge with a blue backpack", x: 520, y: 220, target: "boy walking on bridge with backpack" },
      { id: 3, name: "Helen", location: "standing by the campfire holding the first-aid box", x: 740, y: 380, target: "girl holding medical bandage box" },
      { id: 4, name: "Sophia", location: "taking a photograph of forest birds under a tall tree", x: 380, y: 160, target: "girl pointing camera upwards" },
      { id: 5, name: "Richard", location: "packing a flashlight into his bag beside the picnic table", x: 860, y: 410, target: "boy packing electric torch into bag" }
    ],
    example: { name: "Harry", location: "boy holding a big compass showing directions", x: 120, y: 290 }
  },

  // ── Part 2: Note Completion (5 items) ─────────────────────────────────────
  // Theme: Joining the Junior Adventure Book Club
  listening_p2: {
    part: 2,
    instructions: "Listen and look. There is one example. Read the notes and fill in the missing information.",
    audio_script: "Narrator: Part 2. Listen and look. There is one example.\nBoy: Hello, Miss Parker. May I join the Junior Adventure Book Club?\nWoman: Of course, Alex! Let me write down your details. Your first name is Alex, right?\nBoy: Yes, that is right.\nNarrator: Can you see the answer? Now you listen and write.\n\n[1]\nWoman: What is your surname, Alex?\nBoy: It is Miller. That is M-I-L-L-E-R.\nWoman: Thank you, Alex Miller.\n\n[2]\nWoman: How old are you now?\nBoy: I was ten last month, so I am ten years old.\n\n[3]\nWoman: Which day would you like to attend the storybook workshop?\nBoy: I have swimming on Tuesdays, so Friday afternoon is best for me.\nWoman: Great. The Friday club meets at four o'clock.\n\n[4]\nWoman: Which room in the school library does the club use?\nBoy: Is it in Room 4B?\nWoman: Yes, Room 4B, next to the science corridor.\n\n[5]\nWoman: What must you bring to your first adventure project class?\nBoy: Should I bring my camping tent?\nWoman: No, you must bring a sketchbook and two sharp pencils.\nBoy: Wonderful, I will bring my new sketchbook!",
    example: { field: "First name", value: "Alex" },
    items: [
      { id: 1, label: "Surname", prompt: "Alex's family name", answer: "Miller", alt_answers: ["miller"] },
      { id: 2, label: "Age", prompt: "Age of member", answer: "10", alt_answers: ["ten", "10 years old"] },
      { id: 3, label: "Club meeting day", prompt: "Day of the week", answer: "Friday", alt_answers: ["friday", "Friday afternoon"] },
      { id: 4, label: "Room number", prompt: "Library room", answer: "4B", alt_answers: ["Room 4B", "4b"] },
      { id: 5, label: "Must bring", prompt: "Required item to bring", answer: "sketchbook", alt_answers: ["a sketchbook", "sketch book"] }
    ]
  },

  // ── Part 3: Match A–H (5 items) ───────────────────────────────────────────
  // Theme: What did each person pack for the mountain exploration trip?
  listening_p3: {
    part: 3,
    instructions: "Listen and look. What did each explorer pack in their backpack? Write a letter (A–H) next to each person.",
    audio_script: "Narrator: Part 3. What did each scout pack for the mountain expedition?\nUncle David: Hello Lily! Did everyone pack their gear for the mountain hike?\nLily: Yes Uncle David! My brother Lucas packed a bright red flashlight so we can see in the caves.\n\nNarrator: Can you see the letter C for Lucas? Now you listen and write a letter in each box.\n\n[1]\nUncle David: What did your cousin Maya pack in her bag?\nLily: Maya was very sensible. She packed a small first-aid kit with clean bandages and plasters in case someone slips on the wet rocks.\n\n[2]\nUncle David: That is very wise. And what about your friend Ben?\nLily: Ben loves finding directions. He packed a brass compass and a trail map of the mountain paths.\n\n[3]\nUncle David: Did little Zoe pack anything useful?\nLily: Yes, Zoe packed a warm woollen blanket because the mountain tent gets very cold at night!\n\n[4]\nUncle David: What about Grandpa?\nLily: Grandpa packed a lovely black camera to take photographs of wild forest deer.\n\n[5]\nUncle David: And what did your teacher Mr. Davis pack?\nLily: Mr. Davis packed a sturdy water bottle and healthy dried fruit snacks for our journey.",
    items: [
      { id: 1, person: "Maya", packs: "first-aid kit with bandages", letter: "F", description: "First-aid medical box with bandages (Letter F)" },
      { id: 2, person: "Ben", packs: "brass compass and trail map", letter: "A", description: "Brass navigational compass (Letter A)" },
      { id: 3, person: "Zoe", packs: "warm woollen blanket", letter: "D", description: "Warm camping blanket (Letter D)" },
      { id: 4, person: "Grandpa", packs: "photograph camera", letter: "B", description: "Black camera for photographs (Letter B)" },
      { id: 5, person: "Mr. Davis", packs: "sturdy water bottle", letter: "G", description: "Blue stainless steel water bottle (Letter G)" }
    ],
    example: { person: "Lucas", packs: "bright red flashlight", letter: "C" },
    cards: [
      { letter: "A", name: "Brass compass" },
      { letter: "B", name: "Camera" },
      { letter: "C", name: "Flashlight" },
      { letter: "D", name: "Woollen blanket" },
      { letter: "E", name: "Binoculars" },
      { letter: "F", name: "First-aid bandage box" },
      { letter: "G", name: "Water bottle" },
      { letter: "H", name: "Pocket knife" }
    ]
  },

  // ── Part 4: 3-Picture Multiple Choice (5 items) ───────────────────────────
  // Questions 1 to 5 with 3 options (A, B, C)
  listening_p4: {
    part: 4,
    instructions: "Listen and look. There is one example. Choose the correct answer (A, B, or C).",
    audio_script: "Narrator: Part 4. Listen and look. There is one example.\nWoman: Where did the children go on their school excursion?\nBoy: Did you visit the city museum, Liam?\nLiam: No, our class went hiking across the green forest reserve!\nNarrator: Can you see the tick? Now you listen and tick the box.\n\n[1] Question 1: What did Liam lose during the hike?\nWoman: Liam, did you lose your woollen cap in the forest?\nLiam: No, my cap was in my bag. But my small metal compass slipped out of my pocket while I was crossing the creek!\n\n[2] Question 2: Which wild animal did the students spot near the rocks?\nWoman: Did you see any dangerous animals like a bear?\nLiam: No bears! But we saw a quick brown fox running into the bushes near the big rocks.\n\n[3] Question 3: What time did the scouts finish setting up their camp?\nWoman: Did it take a long time to build your tents?\nLiam: We started at three o'clock, and by quarter past four, all three tents were completely ready!\n\n[4] Question 4: What must the children eat for dinner at camp?\nWoman: Did you cook soup on the campfire?\nLiam: No, the ranger told us we must cook delicious baked potatoes with melted cheese over the hot coals.\n\n[5] Question 5: What is Liam writing about in his adventure book?\nWoman: Are you recounting a story about the mountain caves?\nLiam: No, I am writing about our brave rescue of a little bird caught in a garden net!",
    example: { question: "Where did the children go on their school excursion?", answer: "A", options: ["A: Forest nature reserve", "B: City art museum", "C: Sunny beach"] },
    items: [
      { id: 1, question: "What did Liam lose during the hike?", options: ["A: His woollen cap", "B: His metal compass", "C: His water bottle"], answer: "B", correct_index: 1 },
      { id: 2, question: "Which wild animal did the students spot near the rocks?", options: ["A: A quick brown fox", "B: A sleeping bear", "C: A giant eagle"], answer: "A", correct_index: 0 },
      { id: 3, question: "What time did the scouts finish setting up their camp?", options: ["A: 3:00 PM", "B: 4:15 PM", "C: 5:30 PM"], answer: "B", correct_index: 1 },
      { id: 4, question: "What must the children eat for dinner at camp?", options: ["A: Vegetable soup", "B: Cold sandwiches", "C: Baked potatoes with cheese"], answer: "C", correct_index: 2 },
      { id: 5, question: "What is Liam writing about in his adventure book?", options: ["A: A rescue of a bird from a net", "B: Exploring a dark mountain cave", "C: Sailing a wooden boat on a lake"], answer: "A", correct_index: 0 }
    ]
  },

  // ── Part 5: Colour and Write (5 items) ────────────────────────────────────
  // Scene: Campfire site in front of wooden log cabin
  listening_p5: {
    part: 5,
    instructions: "Listen and look. There is one example. Colour and write.",
    audio_script: "Narrator: Part 5. Listen and look. There is one example.\nMan: Would you like to colour this campsite picture?\nGirl: Yes please! Can I colour the big backpack lying on the grass?\nMan: Good idea. Colour the backpack green.\nNarrator: Can you see the green backpack? This is an example. Now you listen and colour and write.\n\n[1]\nMan: Now look at the two tents. Can you see the tent on the left?\nGirl: Yes, the smaller tent?\nMan: That's right. Please colour the smaller tent bright blue.\n\n[2]\nMan: Can you see the round flashlight on the wooden table?\nGirl: Yes! Beside the map?\nMan: Exactly. Colour that flashlight yellow.\n\n[3]\nMan: Now I would like you to write something.\nGirl: What should I write?\nMan: Look at the signpost on the tree. Above the arrow, please write the word 'CAMP'.\nGirl: C-A-M-P? Okay, I am writing 'CAMP' on the wooden signpost now.\n\n[4]\nMan: Can you see the heavy rope lying near the logs?\nGirl: Yes, it is coiled next to the campfire.\nMan: Excellent. Colour that rope brown.\n\n[5]\nMan: One more thing to colour. Look at the flag at the top of the cabin.\nGirl: Shall I colour it purple?\nMan: Yes, colour the flag purple. That completes our adventure scene!",
    example: { instruction: "Colour the backpack on the grass green", target: "backpack on grass", colour: "green" },
    items: [
      { id: 1, type: "colour", target: "smaller tent on the left", colour: "blue", action: "Colour the smaller tent on the left bright blue" },
      { id: 2, type: "colour", target: "round flashlight on wooden table", colour: "yellow", action: "Colour the flashlight on the table yellow" },
      { id: 3, type: "write", target: "wooden signpost on tree", text: "CAMP", action: "Write the word 'CAMP' on the wooden signpost" },
      { id: 4, type: "colour", target: "coiled rope near campfire logs", colour: "brown", action: "Colour the coiled rope near the logs brown" },
      { id: 5, type: "colour", target: "flag on top of cabin roof", colour: "purple", action: "Colour the flag on top of the cabin roof purple" }
    ]
  }
};

export default listeningHubData;
