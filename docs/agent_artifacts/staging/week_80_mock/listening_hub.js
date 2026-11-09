/**
 * STAGED MOCK EXAM DELIVERABLE: Listening Paper (All 4 Parts / 25 Items)
 * Week: 80 | Level: Cambridge B1 Preliminary (PET) | Mode: FULL_MOCK
 * Pipeline: scripts/generate_pet_mock_content.mjs (Round 67 PET Pilot)
 * Cumulative Sourcing: Weeks 77, 78, 79, 80
 */

export const listeningHubData = {
  week: 80,
  theme: "Supply, Demand & Market Prices / Math: Market Equilibrium Graphs",
  cefr_level: "B1 Preliminary",
  paper: "Listening",
  total_parts: 4,
  total_items: 25,
  time_allowed_minutes: 35,

  // ── Part 1: Short Monologues / Dialogues (7 items) ─────────────────────────
  listening_p1: {
    part: 1,
    instructions: "For each question, choose the correct answer (A, B, or C). There are seven questions.",
    audio_script: "Narrator: Cambridge B1 Preliminary Listening Part 1. For each question, choose the correct answer.\n\n[Question 1]\nWoman: What time does the documentary about Captain James Cook begin tonight?\nMan: The TV guide says the historical film starts at seven forty-five, but the local news was delayed by fifteen minutes, so it won't begin until eight o'clock.\nWoman: Good, that gives us time to finish dinner before eight.\n\n[Question 2]\nGirl: Which navigation instrument did you choose for your history presentation, Alex?\nBoy: I wanted to talk about the brass astrolabe, but someone else took it. So I brought an antique magnetic compass with a floating needle.\nGirl: That looks fascinating! It must be over two hundred years old.\n\n[Question 3]\nMan: What will the weather be like when the exploration ship departs tomorrow morning?\nWoman: It will be very misty along the coast at dawn, followed by clearing skies and strong northerly winds by midday.\nMan: Excellent. Clear wind is exactly what the captain needs to sail out of the harbor.\n\n[Question 4]\nWoman: How much did the student ticket to the Maritime Museum exhibition cost?\nBoy: The regular adult admission was twelve pounds, but with my school library card I received a four-pound discount, so I paid eight pounds.\nWoman: That was a reasonable price for such a large exhibition.\n\n[Question 5]\nMan: Where did the team locate the ancient sunken caravel?\nWoman: Divers searched near the rocky headland first, but they eventually located the wooden timbers resting on a sandy seabed just south of the reef.\nMan: That explains why the hull was so remarkably well preserved.\n\n[Question 6]\nGirl: What item did Maria forget to pack for the mountain navigation trek?\nBoy: Did she leave her waterproof jacket behind?\nGirl: No, she had her jacket and walking boots, but she left her map scale ruler on the study table!\nBoy: We'll have to share mine to calculate distance along the trail.\n\n[Question 7]\nMan: Which animal did the naturalists observe feeding on the tidal mudflats?\nWoman: We hoped to see sea otters, but we only spotted a flock of migrating herons catching small fish in the shallow pools.\nMan: Herons are magnificent predators in wetland ecosystems.",
    items: [
      { id: 1, question: "What time will the explorer documentary start tonight?", options: ["7:45", "8:00", "8:15"], answer: "8:00" },
      { id: 2, question: "Which instrument did Alex bring for his history presentation?", options: ["An antique magnetic compass", "A brass astrolabe", "A digital GPS receiver"], answer: "An antique magnetic compass" },
      { id: 3, question: "What weather is expected when the ship departs tomorrow morning?", options: ["Heavy torrential rain", "Coastal mist followed by strong wind", "Thunder and lightning"], answer: "Coastal mist followed by strong wind" },
      { id: 4, question: "How much did the student pay for the museum admission ticket?", options: ["4 pounds", "8 pounds", "12 pounds"], answer: "8 pounds" },
      { id: 5, question: "Where was the ancient shipwreck discovered?", options: ["On a sandy seabed south of the reef", "Inside a deep underwater cave", "On the rocky headland shore"], answer: "On a sandy seabed south of the reef" },
      { id: 6, question: "Which tool did Maria forget to bring on the trek?", options: ["Her waterproof jacket", "Her map scale ruler", "Her leather hiking boots"], answer: "Her map scale ruler" },
      { id: 7, question: "Which animal did the researchers watch feeding in the wetlands?", options: ["Migrating herons catching small fish", "Playful sea otters", "Wild mountain wolves"], answer: "Migrating herons catching small fish" }
    ]
  },

  // ── Part 2: Short Dialogue Gist & Feelings (6 items) ───────────────────────
  listening_p2: {
    part: 2,
    instructions: "For each question, choose the correct answer (A, B, or C). You will hear six short dialogues.",
    audio_script: "Narrator: Part 2. Listen to six short conversations. For each question, choose the correct answer.\n\n[Question 8]\nGirl: Did you read the article about Magellan's voyage across the Pacific?\nBoy: Yes! I couldn't believe how calm the ocean was after passing the stormy strait. They named it 'Pacific' meaning peaceful, even though the crew was starving.\nGirl: What struck me most was their courage to sail into completely uncharted waters without knowing where the next island was.\nNarrator: What impressed the girl most about Magellan's voyage?\n\n[Question 9]\nMan: How was the navigation workshop at the science academy yesterday?\nWoman: The teacher explained map scales clearly, but measuring curved river routes with string took longer than I expected. Still, working in small teams made it very enjoyable.\nNarrator: How did the woman feel about the navigation workshop?\n\n[Question 10]\nBoy: Look at this diagram of the island's water cycle. It shows how rain collects in deep volcanic reservoirs.\nGirl: Yes, and that fresh groundwater was what allowed shipwrecked sailors to survive for months on remote Pacific islands.\nNarrator: What are the two speakers discussing?\n\n[Question 11]\nWoman: I really enjoyed the museum's new wing dedicated to ancient Egyptian trade.\nMan: Me too. Seeing the actual bundles of dried papyrus that merchants used to wrap goods was fascinating. It showed how connected the ancient world was.\nNarrator: What did the man find most interesting about the exhibition?\n\n[Question 12]\nGirl: Our teacher asked us whether exploring deep space is more important than studying the ocean floor.\nBoy: I think both require similar engineering, but ocean exploration reveals living organisms that help medical science right now.\nNarrator: Why does the boy prefer ocean exploration?\n\n[Question 13]\nMan: Have you finished planning our coastal survey expedition?\nWoman: Almost. The tide tables look favorable for Wednesday morning, but we need to verify the map scale so we don't hike more kilometers than planned.\nNarrator: What does the woman still need to check?",
    items: [
      { id: 8, question: "What impressed the girl most about Magellan's Pacific voyage?", options: ["The enormous size of the sailing caravels", "The courage of the crew to sail into uncharted waters", "The pleasant warm weather they enjoyed"], answer: "The courage of the crew to sail into uncharted waters" },
      { id: 9, question: "How did the woman feel about the map scale workshop?", options: ["She found the team activities enjoyable despite the slow measurements", "She thought the explanations were confusing", "She was disappointed by the lack of materials"], answer: "She found the team activities enjoyable despite the slow measurements" },
      { id: 10, question: "What are the two speakers discussing?", options: ["How groundwater reservoirs enabled stranded sailors to survive", "The best season to visit volcanic islands", "How ocean currents cause storms"], answer: "How groundwater reservoirs enabled stranded sailors to survive" },
      { id: 11, question: "What did the man find most interesting about the Egyptian exhibition?", options: ["Gold statues of ancient pharaohs", "Authentic papyrus bundles showing ancient trade links", "The large scale model of the Giza pyramid"], answer: "Authentic papyrus bundles showing ancient trade links" },
      { id: 12, question: "Why does the boy favor ocean exploration over space missions?", options: ["Ocean life provides discoveries that benefit medical science directly", "Deep space missions are too dangerous for astronauts", "Rockets are much more expensive than research ships"], answer: "Ocean life provides discoveries that benefit medical science directly" },
      { id: 13, question: "What does the woman still need to check before the coastal trek?", options: ["The morning weather forecast", "The map scale to avoid walking too far", "The boat rental fees at the harbor"], answer: "The map scale to avoid walking too far" }
    ]
  },

  // ── Part 3: Note Completion Monologue (6 items) ───────────────────────────
  listening_p3: {
    part: 3,
    instructions: "You will hear a museum curator giving a talk about Captain Cook's navigational instruments. For each question, fill in the missing information in the numbered space.",
    audio_script: "Narrator: Part 3. You will hear a museum curator giving a talk about historic navigation. For each question, fill in the missing information.\n\nCurator: Welcome to the National Maritime Museum. Today we examine the instruments carried on Captain James Cook's famous voyage aboard HMS Resolution in 1772. \n\nFirst, calculation of longitude was solved using a new marine chronometer crafted by clockmaker Kendall. This instrument was housed in a padded wooden box to protect it from ocean vibration. Second, Cook carried an accurate brass sextant, which allowed navigators to measure the angle between the sun and the horizon. \n\nTo prevent disease among the crew, Cook introduced pickled cabbage and malt into their daily diet, meaning almost zero sailors died of scurvy during the three-year voyage. The ship's artist, William Hodges, painted over two hundred watercolor sketches of Pacific island landscapes and coral reefs. \n\nFinally, students wishing to inspect the original sea charts should visit Gallery 4 on the second floor. Please note that flash photography is prohibited inside the manuscript archives.",
    notes_template: "Talk on Captain Cook's 1772 Navigational Voyage\n- Marine chronometer was kept inside a [14] _____ box to prevent damage.\n- Navigators used a brass [15] _____ to measure angles above the horizon.\n- The voyage lasted for [16] _____ years across the southern oceans.\n- Scurvy was prevented by giving sailors pickled [17] _____ and malt.\n- Artist William Hodges painted over two hundred [18] _____ sketches.\n- Original nautical charts are displayed in Gallery [19] _____ on the second floor.",
    items: [
      { id: 14, prompt: "chronometer box material", answer: "wooden", target: "wooden" },
      { id: 15, prompt: "angle measuring instrument", answer: "sextant", target: "sextant" },
      { id: 16, prompt: "duration of voyage in years", answer: "three", target: "three" },
      { id: 17, prompt: "vegetable fed to sailors", answer: "cabbage", target: "cabbage" },
      { id: 18, prompt: "type of artwork painted by Hodges", answer: "watercolor", target: "watercolor" },
      { id: 19, prompt: "gallery number for chart display", answer: "4", target: "4" }
    ]
  },

  // ── Part 4: Extended Interview (6 items) ───────────────────────────────────
  listening_p4: {
    part: 4,
    instructions: "You will hear an interview with marine archaeologist Dr. Sarah Lin about discovering an ancient spice trade shipwreck. For each question, choose the correct answer (A, B, or C).",
    audio_script: "Narrator: Part 4. You will hear an interview with marine archaeologist Dr. Sarah Lin. For each question, choose the correct answer.\n\nInterviewer: Today we are speaking with Dr. Sarah Lin, who recently led an underwater excavation in the Indian Ocean. Dr. Lin, what first drew your team to this specific coastal reef?\nDr. Lin: We were studying sixteenth-century port records in Lisbon and noticed that a merchant caravel carrying cloves and cinnamon had disappeared near the Chagos Archipelago in 1542. Satellite sonar scans later detected an unusual magnetic anomaly along the barrier reef.\n\nInterviewer: What was the greatest challenge your divers encountered during the excavation?\nDr. Lin: The water was warm and clear, but strong tidal currents swept across the reef twice a day. We had to anchor heavy safety lines and could only excavate for ninety minutes at slack water before the surge returned.\n\nInterviewer: Did you uncover any well-preserved navigational instruments?\nDr. Lin: Yes! We discovered an intact bronze mariner's astrolabe embedded in hardened coral. Finding it was astonishing because fewer than one hundred surviving examples exist worldwide today.\n\nInterviewer: What did the ship's cargo teach historians about ancient trade ecosystems?\nDr. Lin: It proved that trading expeditions exchanged not just spices, but also Chinese porcelain, Egyptian linen, and African ivory. It was truly a global economic network five hundred years ago.\n\nInterviewer: How does modern technology assist your marine archaeology work today?\nDr. Lin: Autonomous underwater drones equipped with lidar cameras map the wreckage in high-definition 3D without disturbing fragile organic wood. This preserves the site intact for future generations.\n\nInterviewer: What advice do you give to young students interested in exploration science?\nDr. Lin: Learn foreign languages and master mathematics! Calculating map scales, coordinates, and navigation geometry is just as important as knowing history.",
    items: [
      { id: 20, question: "Why did Dr. Lin's team choose to search near the Chagos Archipelago?", options: ["Local fishermen found antique coins on the beach", "Historical port archives and satellite sonar indicated a lost 1542 caravel", "A deep-sea submarine detected oil leaks"], answer: "Historical port archives and satellite sonar indicated a lost 1542 caravel" },
      { id: 21, question: "What was the main physical difficulty faced by the diving team?", options: ["Extremely cold water temperatures", "Powerful tidal currents that limited diving to ninety minutes", "Sharks patrolling the excavation site"], answer: "Powerful tidal currents that limited diving to ninety minutes" },
      { id: 22, question: "Which rare navigational discovery surprised the archaeologists most?", options: ["An intact bronze mariner's astrolabe", "A preserved wooden steering wheel", "A paper nautical map in a sealed bottle"], answer: "An intact bronze mariner's astrolabe" },
      { id: 23, question: "What did the salvaged cargo reveal about sixteenth-century trade?", options: ["Trading routes exchanged goods between Asia, the Middle East, and Africa", "Merchant ships carried only dry spices and silver coins", "Europeans had no contact with Asian civilizations"], answer: "Trading routes exchanged goods between Asia, the Middle East, and Africa" },
      { id: 24, question: "How do underwater drones benefit marine archaeological sites?", options: ["They raise heavy stone cannons to the surface automatically", "They capture 3D maps without disturbing fragile historical wood", "They scare away predatory marine wildlife"], answer: "They capture 3D maps without disturbing fragile historical wood" },
      { id: 25, question: "What advice does Dr. Lin offer students interested in exploration?", options: ["Focus solely on athletic endurance training", "Master languages and mathematical navigation skills", "Avoid reading old historical documents"], answer: "Master languages and mathematical navigation skills" }
    ]
  }
};

export default listeningHubData;
