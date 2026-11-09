/**
 * STAGED MOCK EXAM DELIVERABLE: Reading Paper (All 6 Parts / 32 Items)
 * Week: 80 | Level: Cambridge B1 Preliminary (PET) | Mode: FULL_MOCK
 * Pipeline: scripts/generate_pet_mock_content.mjs (Round 67 PET Pilot)
 * Cumulative Sourcing: Weeks 77, 78, 79, 80
 */

export const readingHubData = {
  week: 80,
  theme: "Supply, Demand & Market Prices / Math: Market Equilibrium Graphs",
  cefr_level: "B1 Preliminary",
  paper: "Reading",
  total_parts: 6,
  total_items: 32,
  time_allowed_minutes: 45,

  // ── Part 1: Real-World Notices, Messages & Signs (5 items) ────────────────
  rw_part1: {
    part: 1,
    instructions: "For each question, choose the correct answer (A, B, or C). There are five questions.",
    items: [
      {
        id: 1,
        notice_text: "MARITIME MUSEUM NOTICE:\nSpecial Exhibition: 'Navigators of the Pacific'\nOpen Tuesday – Sunday, 10:00 – 17:30.\nSchool groups must reserve guided tours at least 48 hours in advance.",
        question: "What does this notice tell school groups?",
        options: [
          "They can visit on Monday mornings without booking.",
          "They need to book their guided tour two days ahead of their visit.",
          "Guided tours are free for groups that arrive before 10:00."
        ],
        answer: "They need to book their guided tour two days ahead of their visit."
      },
      {
        id: 2,
        notice_text: "SAILING ACADEMY EMAIL:\nTo: All Cadet Sailors\nFrom: Captain Vance\nDue to severe ocean squalls forecast for Wednesday afternoon, our coastal navigation practice will take place in the classroom simulation lab instead.",
        question: "Why has the sailing practice changed?",
        options: [
          "The sailing boats require routine maintenance.",
          "Adverse weather conditions make outdoor sailing unsafe.",
          "Captain Vance cannot attend Wednesday's lesson."
        ],
        answer: "Adverse weather conditions make outdoor sailing unsafe."
      },
      {
        id: 3,
        notice_text: "GEOGRAPHY EXPEDITION GEAR CHECK:\nAlways verify that your magnetic compass is kept away from metal belt buckles and mobile phones. Electromagnetic fields will distort heading readings.",
        question: "What warning is given about the compass?",
        options: [
          "It must be cleaned with special oil after every trek.",
          "Metal items and electronic devices can cause inaccurate readings.",
          "It will not function when hiking in mountainous terrain."
        ],
        answer: "Metal items and electronic devices can cause inaccurate readings."
      },
      {
        id: 4,
        notice_text: "ARCHAEOLOGY ARCHIVES NOTICE:\nAncient papyrus and nautical parchment charts are extremely fragile.\nGloves must be worn at all times when handling cataloged manuscripts.\nNo pens or ink allowed in the reading room.",
        question: "What rule must visitors follow in the archive room?",
        options: [
          "Only write notes using provided pencils while wearing gloves.",
          "Photography is permitted using bright flash lights.",
          "Manuscripts may be borrowed for home study."
        ],
        answer: "Only write notes using provided pencils while wearing gloves."
      },
      {
        id: 5,
        notice_text: "MESSAGE FROM JAKE:\nHey Liam, I checked our topographic map. The trail from the lake reservoir to the summit is five centimeters long on the map, which means it is five kilometers in reality. Make sure you bring two water bottles!",
        question: "What is Jake doing in his message?",
        options: [
          "Explaining the trail distance using the map scale and advising on water.",
          "Asking Liam to lend him a new compass.",
          "Canceling the mountain hike because of hot weather."
        ],
        answer: "Explaining the trail distance using the map scale and advising on water."
      }
    ]
  },

  // ── Part 2: Person-to-Profile Matching (5 items) ──────────────────────────
  rw_part2: {
    part: 2,
    instructions: "Match the five young people (6–10) to the most suitable summer exploration course (A–H).",
    people: [
      { id: 6, name: "Liam", needs: "Wants an oceanic sailing expedition where he can practice real celestial and compass navigation on a tall ship." },
      { id: 7, name: "Sophia", needs: "Is fascinated by ancient civilizations, hieroglyphics, and unearthing historical desert tombs with real archaeologists." },
      { id: 8, name: "Marcus", needs: "Wants to study diverse wildlife organisms and map plant ecosystems in a tropical rainforest reserve." },
      { id: 9, name: "Chloe", needs: "Loves travel photography and wants to capture panoramic mountain landscapes and picturesque coastal sunsets on video." },
      { id: 10, name: "Alex", needs: "Interested in climate science, polar glaciers, and measuring how ocean temperature affects iceberg melting." }
    ],
    profiles: [
      { id: "A", title: "Polar Ice Cap Odyssey", text: "Join climate researchers aboard an icebreaking vessel in the Arctic. Students measure sea temperatures, study melting glaciers, and monitor how polar ecosystems respond to atmospheric changes." },
      { id: "B", title: "Deep Ocean Tall Ship Sailing", text: "Spend two exciting weeks aboard a traditional three-masted schooner. Cadets learn to navigate across open waters using magnetic compasses, nautical charts, and celestial star positions." },
      { id: "C", title: "Ancient Nile Archaeologist Field Camp", text: "Travel to historic excavation sites near Luxor. Students work alongside professional archaeologists brushing away desert sand to examine buried tomb inscriptions and ancient papyrus." },
      { id: "D", title: "High Alpine Mountaineering Workshop", text: "Learn rock climbing and crevasse rescue techniques in the Swiss Alps. Ideal for athletes seeking high-altitude physical endurance and survival skills." },
      { id: "E", title: "Tropical Rainforest Biodiversity Quest", text: "Trek through the lush cloud forests of Costa Rica. Young biologists survey predator and prey interactions, document plant organisms, and map vibrant canopy ecosystems." },
      { id: "F", title: "Maritime Visual Arts & Photography Cruise", text: "Cruise along the scenic Mediterranean coastline with expert mentors. Learn to frame panoramic horizons, photograph bustling historic harbors, and edit breathtaking travel footage." },
      { id: "G", title: "Desert Camel Trekking Survival Course", text: "Experience traditional desert travel across Moroccan sand dunes. Learn how nomadic communities locate underground aquifers and navigate by night landmarks." },
      { id: "H", title: "Urban Architecture Walking Tours", text: "Explore famous European landmarks in Rome and Paris. Examine stone arches, marble facades, and Gothic cathedral domes with architectural historians." }
    ],
    items: [
      { id: 6, person: "Liam", matched_profile: "B", answer: "B" },
      { id: 7, person: "Sophia", matched_profile: "C", answer: "C" },
      { id: 8, person: "Marcus", matched_profile: "E", answer: "E" },
      { id: 9, person: "Chloe", matched_profile: "F", answer: "F" },
      { id: 10, person: "Alex", matched_profile: "A", answer: "A" }
    ]
  },

  // ── Part 3: Long Factual Reading Passage (5 items) ────────────────────────
  rw_part3: {
    part: 3,
    title: "The Audacious Voyage: Ferdinand Magellan and the First Circumnavigation",
    instructions: "Read the article and choose the correct answer (A, B, C, or D) for each question (11–15).",
    text: "In August 1519, five wooden caravels departed Seville under the command of Portuguese captain Ferdinand Magellan. His ambitious goal was not to circle the globe, but to discover a western sea passage to the wealthy Spice Islands of Indonesia. At the time, European navigators relied on primitive magnetic compasses, hourglasses, and rough parchment charts. The true width of the Americas and the vastness of the Pacific Ocean remained entirely uncharted.\n\nAfter crossing the turbulent Atlantic and surviving mutinous uprisings along the Argentine coast, Magellan located a treacherous 350-mile labyrinth of twisting fjords, now known as the Strait of Magellan. Cold Antarctic gales and jagged submerged rocks threatened to destroy the ships. Nevertheless, on November 28, 1520, three surviving vessels emerged into an immense, calm body of water. Relieved by its serene waters after months of violent storms, Magellan named it 'Mar Pacifico'—the Peaceful Sea.\n\nHowever, the Pacific voyage proved far more perilous than anticipated. The fleet sailed for three months and twenty days without encountering a single inhabited island to replenish fresh water or food. Sailors were reduced to boiling leather rigging and eating sawdust. Despite severe scurvy, Magellan maintained strict mathematical navigation by measuring the sun's elevation daily with a wooden astrolabe.\n\nAlthough Magellan was tragically killed in a local conflict in the Philippines in 1521, his remaining navigator, Juan Sebastian Elcano, steered the single surviving ship, the Victoria, westward across the Indian Ocean and around Africa. In September 1522, eighteen exhausted survivors completed the first recorded voyage around Earth, proving definitively that our planet's oceans form one continuous global ecosystem.",
    items: [
      {
        id: 11,
        question: "What was Ferdinand Magellan's original objective when he departed Spain?",
        options: [
          "To prove that planet Earth was completely circular",
          "To locate a western oceanic passage to the Asian Spice Islands",
          "To establish a new naval base in South America",
          "To map every island in the Pacific Ocean"
        ],
        answer: "To locate a western oceanic passage to the Asian Spice Islands"
      },
      {
        id: 12,
        question: "Why did Magellan name the new ocean 'Mar Pacifico'?",
        options: [
          "Because friendly islanders welcomed the ships with gifts",
          "Because its waters seemed peaceful after the violent Atlantic storms",
          "Because it was completely free of dangerous coral reefs",
          "Because Spanish royalty instructed him to use that name"
        ],
        answer: "Because its waters seemed peaceful after the violent Atlantic storms"
      },
      {
        id: 13,
        question: "What main hardship did the expedition endure while crossing the Pacific Ocean?",
        options: [
          "Constant pirate attacks from other European ships",
          "A complete lack of food and fresh water over nearly four months",
          "Freezing blizzards and icebergs blocking the route",
          "Damaged compasses that made steering impossible"
        ],
        answer: "A complete lack of food and fresh water over nearly four months"
      },
      {
        id: 14,
        question: "How did Magellan maintain accurate navigation during the crossing?",
        options: [
          "By following migrating seabirds every morning",
          "By calculating solar altitude daily with a wooden astrolabe",
          "By asking local fishermen for coastal directions",
          "By relying solely on wind direction indicators"
        ],
        answer: "By calculating solar altitude daily with a wooden astrolabe"
      },
      {
        id: 15,
        question: "What great scientific fact did the return of the Victoria establish?",
        options: [
          "That sailing across oceans was too hazardous for commerce",
          "That Earth's oceans are interconnected into a continuous global system",
          "That spice plants could grow in European soil",
          "That wooden ships could not survive long sea journeys"
        ],
        answer: "That Earth's oceans are interconnected into a continuous global system"
      }
    ]
  },

  // ── Part 4: Gapped Text (5 items) ─────────────────────────────────────────
  rw_part4: {
    part: 4,
    title: "Mapping the Uncharted: How Ancient Mariners Navigated the Seas",
    instructions: "Five sentences have been removed from the text below. Choose from the sentences (A–H) the one which fits each gap (16–20). There are three extra sentences.",
    text: "Long before satellites and digital screens guided ships, ancient mariners crossed thousands of miles of open water. [16] _____ By watching how swells reflected off distant islands, skilled navigators could detect land long before it appeared on the horizon. In the Mediterranean, Phoenician and Greek sailors traveled mostly during daylight hours within sight of the coast. [17] _____ The North Star, which remains stationary above the northern horizon, provided an unfailing reference point for night steering.\n\nDuring the Middle Ages, the invention of the magnetic compass revolutionized navigation. [18] _____ Sailors placed a magnetized iron needle onto a cork floating in water, allowing them to determine cardinal directions even inside thick fog. Subsequently, cartographers drew intricate portolan charts showing exact compass bearings between major harbors. [19] _____ However, early maps lacked accurate longitude scales because mechanical clocks could not yet withstand ocean movement. [20] _____ Today, modern GPS receivers track positions within centimeters, but the principles of geometry established by early mariners still form the foundation of navigation science.",
    sentences: [
      { id: "A", text: "They relied on close observation of ocean swells, wind directions, and animal behaviors." },
      { id: "B", text: "When night fell, they steered their vessels by observing prominent constellations." },
      { id: "C", text: "Originating in ancient China, this ingenious instrument soon spread to Arab and European fleets." },
      { id: "D", text: "These charts enabled merchant caravels to sail directly across open seas rather than hugging shorelines." },
      { id: "E", text: "Navigators had to wait until the eighteenth century for precise marine chronometers to solve this problem." },
      { id: "F", text: "Most ancient sailors refused to embark on voyages that lasted longer than two days." },
      { id: "G", text: "Steam engines completely replaced canvas sails on all transatlantic trade routes." },
      { id: "H", text: "Deep underground caves were used to store dry food during winter months." }
    ],
    items: [
      { id: 16, gap: 16, chosen_sentence: "A", answer: "A" },
      { id: 17, gap: 17, chosen_sentence: "B", answer: "B" },
      { id: 18, gap: 18, chosen_sentence: "C", answer: "C" },
      { id: 19, gap: 19, chosen_sentence: "D", answer: "D" },
      { id: 20, gap: 20, chosen_sentence: "E", answer: "E" }
    ]
  },

  // ── Part 5: Vocabulary Multiple Choice Cloze (6 items) ────────────────────
  rw_part5: {
    part: 5,
    title: "The Age of Maritime Discovery",
    instructions: "Read the text below and choose the correct word (A, B, C, or D) for each gap (21–26).",
    text: "During the fifteenth century, adventurous European captains began sailing beyond familiar coastal waters. Their primary ambition was to [21] _____ new trade passages to Asia. Courageous crews faced immense hardships, including fierce oceanic storms and months without [22] _____ water. Navigators learned to read nautical charts and calculate distances using map [23] _____. As they sailed across uncharted seas, they discovered that our planet's oceans form an interconnected [24] _____. The brave voyages undertaken during this era helped [25] _____ distant civilizations and transformed human understanding of Earth's [26] _____ geography.",
    items: [
      { id: 21, options: ["discover", "invent", "produce", "manufacture"], answer: "discover" },
      { id: 22, options: ["fresh", "salty", "solid", "frozen"], answer: "fresh" },
      { id: 23, options: ["scales", "weights", "rulers", "meters"], answer: "scales" },
      { id: 24, options: ["ecosystem", "monument", "dynasty", "quarry"], answer: "ecosystem" },
      { id: 25, options: ["connect", "divide", "separate", "weaken"], answer: "connect" },
      { id: 26, options: ["global", "tiny", "private", "subterranean"], answer: "global" }
    ]
  },

  // ── Part 6: Grammar Open Cloze (6 items) ──────────────────────────────────
  rw_part6: {
    part: 6,
    title: "Diary of a Young Sailor Aboard the Discovery",
    instructions: "Read the text below and write ONE word for each space (27–32).",
    text_template: "October 14th, 1774. Today our caravel sailed [27]_____ a narrow channel between two rocky islands. The captain used his brass compass to keep us [28]_____ course toward the north. A cool ocean breeze carried moisture [29]_____ the west, bringing welcome relief from the hot sun. If the wind continues to blow steadily, we [30]_____ arrive at the harbor before nightfall. The sailors are excited [31]_____ trade with the local villagers. We hope to replenish our water supply [32]_____ we continue our long voyage across the ocean.",
    items: [
      { id: 27, gap: 27, answer: "through" },
      { id: 28, gap: 28, answer: "on" },
      { id: 29, gap: 29, answer: "from" },
      { id: 30, gap: 30, answer: "will" },
      { id: 31, gap: 31, answer: "to" },
      { id: 32, gap: 32, answer: "before" }
    ]
  }
};

export default readingHubData;
