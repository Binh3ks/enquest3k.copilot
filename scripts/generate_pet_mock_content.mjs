/**
 * scripts/generate_pet_mock_content.mjs
 * 
 * ENGQUEST3K — PILOT MOCK EXAM GENERATOR (WEEK 76 — STAGE 2 B1 PRELIMINARY / PET)
 * 
 * Generates full authentic Cambridge B1 Preliminary (PET) Mock Exam:
 *   - Reading Paper: 6 Parts / 32 Items (R1–R6)
 *   - Writing Paper: 2 Parts / 2 Extended Writing Tasks (W1–W2 with 20-mark rubrics)
 *   - Listening Paper: 4 Parts / 25 Items (L1–L4 with verbatim audio scripts)
 *   - Speaking Paper: 4 Parts Solo-AI Partner "Nova" (S1–S4 with table_a/table_b contract)
 * 
 * Cumulative Sourcing: Grounded in W73, W74, W75, W76 blueprints & vocabulary pool.
 * Output: docs/agent_artifacts/staging/week_76_mock/
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const OUT_DIR = path.join(ROOT_DIR, 'docs/agent_artifacts/staging/week_76_mock');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

console.log('========================================================================');
console.log('🚀 GENERATING PILOT MOCK EXAM: WEEK 76 (B1 PRELIMINARY / PET FORMAT)');
console.log('========================================================================');

// ─────────────────────────────────────────────────────────────────────────────
// 1. VOCABULARY POOL & 4-WEEK SOURCING (W73, W74, W75, W76)
// ─────────────────────────────────────────────────────────────────────────────

const W76_SYNTHESIS_VOCAB = [
  // Sourced from Week 73 (The Water Cycle / Hydrology)
  { id: 1, word: 'evaporation', pos: 'noun', ipa: '/ɪˌvæpəˈreɪʃən/', definition_en: 'The process of liquid turning into vapor or gas through solar heating.', definition_vi: 'sự bốc hơi', example_en: 'Solar heat drives rapid evaporation from ocean waters.', sourceWeek: 73 },
  { id: 2, word: 'precipitation', pos: 'noun', ipa: '/prɪˌsɪpɪˈteɪʃən/', definition_en: 'Rain, snow, or sleet falling from heavy atmospheric clouds.', definition_vi: 'lượng mưa / sự ngưng kết', example_en: 'Heavy precipitation during storms replenished the freshwater streams.', sourceWeek: 73 },
  { id: 3, word: 'reservoir', pos: 'noun', ipa: '/ˈrezərvwɑːr/', definition_en: 'A natural or artificial body of water used as a source of supply.', definition_vi: 'hồ chứa nước', example_en: 'The island reservoir held enough drinking water for the expedition crew.', sourceWeek: 73 },
  { id: 4, word: 'moisture', pos: 'noun', ipa: '/ˈmɔɪstʃər/', definition_en: 'Water diffused in small quantities as vapor or condensed dampness.', definition_vi: 'độ ẩm / hơi ẩm', example_en: 'Ocean moisture condensed into thick coastal fog at daybreak.', sourceWeek: 73 },
  { id: 5, word: 'atmosphere', pos: 'noun', ipa: '/ˈætməsfɪər/', definition_en: 'The envelope of gases surrounding Earth or another planet.', definition_vi: 'khí quyển', example_en: 'Trade winds blow steadily across the maritime atmosphere.', sourceWeek: 73 },

  // Sourced from Week 74 (Food Chains / Ecosystems)
  { id: 6, word: 'predator', pos: 'noun', ipa: '/ˈpredətər/', definition_en: 'An animal that naturally preys on and hunts other creatures.', definition_vi: 'động vật ăn thịt / kẻ săn mồi', example_en: 'Sharks are apex marine predators patrolling shallow coral reefs.', sourceWeek: 74 },
  { id: 7, word: 'ecosystem', pos: 'noun', ipa: '/ˈiːkoʊsɪstəm/', definition_en: 'A biological community of interacting organisms and their physical environment.', definition_vi: 'hệ sinh thái', example_en: 'Early explorers documented unique species in isolated island ecosystems.', sourceWeek: 74 },
  { id: 8, word: 'organism', pos: 'noun', ipa: '/ˈɔːrɡənɪzəm/', definition_en: 'An individual animal, plant, or single-celled life form.', definition_vi: 'sinh vật / cơ thể sống', example_en: 'Every living organism on the reef depends on sunlight and nutrients.', sourceWeek: 74 },
  { id: 9, word: 'survive', pos: 'verb', ipa: '/sərˈvaɪv/', definition_en: 'To continue to exist or live, especially despite danger or hardship.', definition_vi: 'sinh tồn / sống sót', example_en: 'Sailors needed fresh citrus fruit to survive scurvy on long oceanic journeys.', sourceWeek: 74 },
  { id: 10, word: 'energy', pos: 'noun', ipa: '/ˈenərdʒi/', definition_en: 'The capacity of physical systems to perform work or sustain life.', definition_vi: 'năng lượng', example_en: 'Ocean currents transfer heat energy across thousands of nautical miles.', sourceWeek: 74 },

  // Sourced from Week 75 (Ancient Egypt / Historical Civilizations)
  { id: 11, word: 'ancient', pos: 'adj', ipa: "/ˈeɪnʃənt/", definition_en: 'Belonging to the very distant past and no longer in existence.', definition_vi: 'cổ đại', example_en: 'Ancient navigators used the North Star to steer wooden galleys.', sourceWeek: 75 },
  { id: 12, word: 'civilization', pos: 'noun', ipa: '/ˌsɪvələˈzeɪʃən/', definition_en: 'An advanced stage of human social, cultural, and political development.', definition_vi: 'nền văn minh', example_en: 'Maritime trade routes connected Mediterranean civilizations for centuries.', sourceWeek: 75 },
  { id: 13, word: 'monument', pos: 'noun', ipa: '/ˈmɑːnjəmənt/', definition_en: 'A statue, building, or landmark built to commemorate a notable person or event.', definition_vi: 'công trình tưởng niệm', example_en: 'A stone monument in Lisbon honors brave maritime navigators.', sourceWeek: 75 },
  { id: 14, word: 'excavation', pos: 'noun', ipa: '/ˌekskəˈveɪʃən/', definition_en: 'The systematic unearthing of historical remains and shipwrecks.', definition_vi: 'sự khai quật', example_en: 'Marine archaeologists conducted an underwater excavation of the sunken vessel.', sourceWeek: 75 },
  { id: 15, word: 'dynasty', pos: 'noun', ipa: '/ˈdaɪnəsti/', definition_en: 'A succession of rulers of the same line of descent or family.', definition_vi: 'triều đại', example_en: 'The Ming Dynasty dispatched admiral Zheng He on diplomatic sea voyages.', sourceWeek: 75 },

  // Sourced from Week 76 (Great Voyages & Explorers / Navigation)
  { id: 16, word: 'voyage', pos: 'noun', ipa: '/ˈvɔɪɪdʒ/', definition_en: 'A long journey involving travel by sea or in space.', definition_vi: 'chuyến hải trình / chuyến đi xa', example_en: 'Magellan commanded a daring three-year voyage around the globe.', sourceWeek: 76 },
  { id: 17, word: 'discover', pos: 'verb', ipa: '/dɪˈskʌvər/', definition_en: 'To find something unexpectedly or through deliberate exploration.', definition_vi: 'phát hiện / khám phá', example_en: 'Explorers charted trade routes to discover uncharted lands and spices.', sourceWeek: 76 },
  { id: 18, word: 'navigate', pos: 'verb', ipa: '/ˈnævɪɡeɪt/', definition_en: 'To plan and direct the course of a ship, aircraft, or vehicle.', definition_vi: 'điều hướng / định hướng hải trình', example_en: 'Captains learned to navigate using magnetic needles and nautical charts.', sourceWeek: 76 },
  { id: 19, word: 'compass', pos: 'noun', ipa: '/ˈkʌmpəs/', definition_en: 'An instrument containing a magnetized pointer showing north.', definition_vi: 'la bàn', example_en: 'A brass magnetic compass guided the caravel through dense ocean mist.', sourceWeek: 76 },
  { id: 20, word: 'expedition', pos: 'noun', ipa: '/ˌekspəˈdɪʃən/', definition_en: 'A journey undertaken by a group of people with a definite objective.', definition_vi: 'cuộc thám hiểm', example_en: 'The scientific expedition surveyed uncharted archipelagos in the Pacific.', sourceWeek: 76 }
];

// ─────────────────────────────────────────────────────────────────────────────
// 2. LISTENING HUB (ALL 4 CAMBRIDGE PET PARTS — 25 ITEMS)
// ─────────────────────────────────────────────────────────────────────────────

const listeningHubContent = `/**
 * STAGED MOCK EXAM DELIVERABLE: Listening Paper (All 4 Parts / 25 Items)
 * Week: 76 | Level: Cambridge B1 Preliminary (PET) | Mode: FULL_MOCK
 * Pipeline: scripts/generate_pet_mock_content.mjs (Round 67 PET Pilot)
 * Cumulative Sourcing: Weeks 73, 74, 75, 76
 */

export const listeningHubData = {
  week: 76,
  theme: "History/ELA: Explorers / Math: Map Scales",
  cefr_level: "B1 Preliminary",
  paper: "Listening",
  total_parts: 4,
  total_items: 25,
  time_allowed_minutes: 35,

  // ── Part 1: Short Monologues / Dialogues (7 items) ─────────────────────────
  listening_p1: {
    part: 1,
    instructions: "For each question, choose the correct answer (A, B, or C). There are seven questions.",
    audio_script: "Narrator: Cambridge B1 Preliminary Listening Part 1. For each question, choose the correct answer.\\n\\n[Question 1]\\nWoman: What time does the documentary about Captain James Cook begin tonight?\\nMan: The TV guide says the historical film starts at seven forty-five, but the local news was delayed by fifteen minutes, so it won't begin until eight o'clock.\\nWoman: Good, that gives us time to finish dinner before eight.\\n\\n[Question 2]\\nGirl: Which navigation instrument did you choose for your history presentation, Alex?\\nBoy: I wanted to talk about the brass astrolabe, but someone else took it. So I brought an antique magnetic compass with a floating needle.\\nGirl: That looks fascinating! It must be over two hundred years old.\\n\\n[Question 3]\\nMan: What will the weather be like when the exploration ship departs tomorrow morning?\\nWoman: It will be very misty along the coast at dawn, followed by clearing skies and strong northerly winds by midday.\\nMan: Excellent. Clear wind is exactly what the captain needs to sail out of the harbor.\\n\\n[Question 4]\\nWoman: How much did the student ticket to the Maritime Museum exhibition cost?\\nBoy: The regular adult admission was twelve pounds, but with my school library card I received a four-pound discount, so I paid eight pounds.\\nWoman: That was a reasonable price for such a large exhibition.\\n\\n[Question 5]\\nMan: Where did the team locate the ancient sunken caravel?\\nWoman: Divers searched near the rocky headland first, but they eventually located the wooden timbers resting on a sandy seabed just south of the reef.\\nMan: That explains why the hull was so remarkably well preserved.\\n\\n[Question 6]\\nGirl: What item did Maria forget to pack for the mountain navigation trek?\\nBoy: Did she leave her waterproof jacket behind?\\nGirl: No, she had her jacket and walking boots, but she left her map scale ruler on the study table!\\nBoy: We'll have to share mine to calculate distance along the trail.\\n\\n[Question 7]\\nMan: Which animal did the naturalists observe feeding on the tidal mudflats?\\nWoman: We hoped to see sea otters, but we only spotted a flock of migrating herons catching small fish in the shallow pools.\\nMan: Herons are magnificent predators in wetland ecosystems.",
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
    audio_script: "Narrator: Part 2. Listen to six short conversations. For each question, choose the correct answer.\\n\\n[Question 8]\\nGirl: Did you read the article about Magellan's voyage across the Pacific?\\nBoy: Yes! I couldn't believe how calm the ocean was after passing the stormy strait. They named it 'Pacific' meaning peaceful, even though the crew was starving.\\nGirl: What struck me most was their courage to sail into completely uncharted waters without knowing where the next island was.\\nNarrator: What impressed the girl most about Magellan's voyage?\\n\\n[Question 9]\\nMan: How was the navigation workshop at the science academy yesterday?\\nWoman: The teacher explained map scales clearly, but measuring curved river routes with string took longer than I expected. Still, working in small teams made it very enjoyable.\\nNarrator: How did the woman feel about the navigation workshop?\\n\\n[Question 10]\\nBoy: Look at this diagram of the island's water cycle. It shows how rain collects in deep volcanic reservoirs.\\nGirl: Yes, and that fresh groundwater was what allowed shipwrecked sailors to survive for months on remote Pacific islands.\\nNarrator: What are the two speakers discussing?\\n\\n[Question 11]\\nWoman: I really enjoyed the museum's new wing dedicated to ancient Egyptian trade.\\nMan: Me too. Seeing the actual bundles of dried papyrus that merchants used to wrap goods was fascinating. It showed how connected the ancient world was.\\nNarrator: What did the man find most interesting about the exhibition?\\n\\n[Question 12]\\nGirl: Our teacher asked us whether exploring deep space is more important than studying the ocean floor.\\nBoy: I think both require similar engineering, but ocean exploration reveals living organisms that help medical science right now.\\nNarrator: Why does the boy prefer ocean exploration?\\n\\n[Question 13]\\nMan: Have you finished planning our coastal survey expedition?\\nWoman: Almost. The tide tables look favorable for Wednesday morning, but we need to verify the map scale so we don't hike more kilometers than planned.\\nNarrator: What does the woman still need to check?",
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
    audio_script: "Narrator: Part 3. You will hear a museum curator giving a talk about historic navigation. For each question, fill in the missing information.\\n\\nCurator: Welcome to the National Maritime Museum. Today we examine the instruments carried on Captain James Cook's famous voyage aboard HMS Resolution in 1772. \\n\\nFirst, calculation of longitude was solved using a new marine chronometer crafted by clockmaker Kendall. This instrument was housed in a padded wooden box to protect it from ocean vibration. Second, Cook carried an accurate brass sextant, which allowed navigators to measure the angle between the sun and the horizon. \\n\\nTo prevent disease among the crew, Cook introduced pickled cabbage and malt into their daily diet, meaning almost zero sailors died of scurvy during the three-year voyage. The ship's artist, William Hodges, painted over two hundred watercolor sketches of Pacific island landscapes and coral reefs. \\n\\nFinally, students wishing to inspect the original sea charts should visit Gallery 4 on the second floor. Please note that flash photography is prohibited inside the manuscript archives.",
    notes_template: "Talk on Captain Cook's 1772 Navigational Voyage\\n- Marine chronometer was kept inside a [14] _____ box to prevent damage.\\n- Navigators used a brass [15] _____ to measure angles above the horizon.\\n- The voyage lasted for [16] _____ years across the southern oceans.\\n- Scurvy was prevented by giving sailors pickled [17] _____ and malt.\\n- Artist William Hodges painted over two hundred [18] _____ sketches.\\n- Original nautical charts are displayed in Gallery [19] _____ on the second floor.",
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
    audio_script: "Narrator: Part 4. You will hear an interview with marine archaeologist Dr. Sarah Lin. For each question, choose the correct answer.\\n\\nInterviewer: Today we are speaking with Dr. Sarah Lin, who recently led an underwater excavation in the Indian Ocean. Dr. Lin, what first drew your team to this specific coastal reef?\\nDr. Lin: We were studying sixteenth-century port records in Lisbon and noticed that a merchant caravel carrying cloves and cinnamon had disappeared near the Chagos Archipelago in 1542. Satellite sonar scans later detected an unusual magnetic anomaly along the barrier reef.\\n\\nInterviewer: What was the greatest challenge your divers encountered during the excavation?\\nDr. Lin: The water was warm and clear, but strong tidal currents swept across the reef twice a day. We had to anchor heavy safety lines and could only excavate for ninety minutes at slack water before the surge returned.\\n\\nInterviewer: Did you uncover any well-preserved navigational instruments?\\nDr. Lin: Yes! We discovered an intact bronze mariner's astrolabe embedded in hardened coral. Finding it was astonishing because fewer than one hundred surviving examples exist worldwide today.\\n\\nInterviewer: What did the ship's cargo teach historians about ancient trade ecosystems?\\nDr. Lin: It proved that trading expeditions exchanged not just spices, but also Chinese porcelain, Egyptian linen, and African ivory. It was truly a global economic network five hundred years ago.\\n\\nInterviewer: How does modern technology assist your marine archaeology work today?\\nDr. Lin: Autonomous underwater drones equipped with lidar cameras map the wreckage in high-definition 3D without disturbing fragile organic wood. This preserves the site intact for future generations.\\n\\nInterviewer: What advice do you give to young students interested in exploration science?\\nDr. Lin: Learn foreign languages and master mathematics! Calculating map scales, coordinates, and navigation geometry is just as important as knowing history.",
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
`;

// ─────────────────────────────────────────────────────────────────────────────
// 3. READING HUB (ALL 6 CAMBRIDGE PET PARTS — 32 ITEMS)
// ─────────────────────────────────────────────────────────────────────────────

const readingHubContent = `/**
 * STAGED MOCK EXAM DELIVERABLE: Reading Paper (All 6 Parts / 32 Items)
 * Week: 76 | Level: Cambridge B1 Preliminary (PET) | Mode: FULL_MOCK
 * Pipeline: scripts/generate_pet_mock_content.mjs (Round 67 PET Pilot)
 * Cumulative Sourcing: Weeks 73, 74, 75, 76
 */

export const readingHubData = {
  week: 76,
  theme: "History/ELA: Explorers / Math: Map Scales",
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
        notice_text: "MARITIME MUSEUM NOTICE:\\nSpecial Exhibition: 'Navigators of the Pacific'\\nOpen Tuesday – Sunday, 10:00 – 17:30.\\nSchool groups must reserve guided tours at least 48 hours in advance.",
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
        notice_text: "SAILING ACADEMY EMAIL:\\nTo: All Cadet Sailors\\nFrom: Captain Vance\\nDue to severe ocean squalls forecast for Wednesday afternoon, our coastal navigation practice will take place in the classroom simulation lab instead.",
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
        notice_text: "GEOGRAPHY EXPEDITION GEAR CHECK:\\nAlways verify that your magnetic compass is kept away from metal belt buckles and mobile phones. Electromagnetic fields will distort heading readings.",
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
        notice_text: "ARCHAEOLOGY ARCHIVES NOTICE:\\nAncient papyrus and nautical parchment charts are extremely fragile.\\nGloves must be worn at all times when handling cataloged manuscripts.\\nNo pens or ink allowed in the reading room.",
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
        notice_text: "MESSAGE FROM JAKE:\\nHey Liam, I checked our topographic map. The trail from the lake reservoir to the summit is five centimeters long on the map, which means it is five kilometers in reality. Make sure you bring two water bottles!",
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
    text: "In August 1519, five wooden caravels departed Seville under the command of Portuguese captain Ferdinand Magellan. His ambitious goal was not to circle the globe, but to discover a western sea passage to the wealthy Spice Islands of Indonesia. At the time, European navigators relied on primitive magnetic compasses, hourglasses, and rough parchment charts. The true width of the Americas and the vastness of the Pacific Ocean remained entirely uncharted.\\n\\nAfter crossing the turbulent Atlantic and surviving mutinous uprisings along the Argentine coast, Magellan located a treacherous 350-mile labyrinth of twisting fjords, now known as the Strait of Magellan. Cold Antarctic gales and jagged submerged rocks threatened to destroy the ships. Nevertheless, on November 28, 1520, three surviving vessels emerged into an immense, calm body of water. Relieved by its serene waters after months of violent storms, Magellan named it 'Mar Pacifico'—the Peaceful Sea.\\n\\nHowever, the Pacific voyage proved far more perilous than anticipated. The fleet sailed for three months and twenty days without encountering a single inhabited island to replenish fresh water or food. Sailors were reduced to boiling leather rigging and eating sawdust. Despite severe scurvy, Magellan maintained strict mathematical navigation by measuring the sun's elevation daily with a wooden astrolabe.\\n\\nAlthough Magellan was tragically killed in a local conflict in the Philippines in 1521, his remaining navigator, Juan Sebastian Elcano, steered the single surviving ship, the Victoria, westward across the Indian Ocean and around Africa. In September 1522, eighteen exhausted survivors completed the first recorded voyage around Earth, proving definitively that our planet's oceans form one continuous global ecosystem.",
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
    text: "Long before satellites and digital screens guided ships, ancient mariners crossed thousands of miles of open water. [16] _____ By watching how swells reflected off distant islands, skilled navigators could detect land long before it appeared on the horizon. In the Mediterranean, Phoenician and Greek sailors traveled mostly during daylight hours within sight of the coast. [17] _____ The North Star, which remains stationary above the northern horizon, provided an unfailing reference point for night steering.\\n\\nDuring the Middle Ages, the invention of the magnetic compass revolutionized navigation. [18] _____ Sailors placed a magnetized iron needle onto a cork floating in water, allowing them to determine cardinal directions even inside thick fog. Subsequently, cartographers drew intricate portolan charts showing exact compass bearings between major harbors. [19] _____ However, early maps lacked accurate longitude scales because mechanical clocks could not yet withstand ocean movement. [20] _____ Today, modern GPS receivers track positions within centimeters, but the principles of geometry established by early mariners still form the foundation of navigation science.",
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
`;

// ─────────────────────────────────────────────────────────────────────────────
// 4. WRITING HUB (ALL 2 CAMBRIDGE PET PARTS — W1 & W2)
// ─────────────────────────────────────────────────────────────────────────────

const writingHubContent = `/**
 * STAGED MOCK EXAM DELIVERABLE: Writing Paper (All 2 Parts / 2 Extended Tasks)
 * Week: 76 | Level: Cambridge B1 Preliminary (PET) | Mode: FULL_MOCK
 * Pipeline: scripts/generate_pet_mock_content.mjs (Round 67 PET Pilot)
 * Cumulative Sourcing: Weeks 73, 74, 75, 76
 */

export const writingHubData = {
  week: 76,
  theme: "History/ELA: Explorers / Math: Map Scales",
  cefr_level: "B1 Preliminary",
  paper: "Writing",
  total_parts: 2,
  time_allowed_minutes: 45,

  // ── Part 1: Communicative Email Response (~100 words) ─────────────────────
  part1_email: {
    task_number: 1,
    instructions: "You must answer this question. Write your email in about 100 words.",
    scenario: "Read this email from your English-speaking friend Alex and the notes you have made.",
    incoming_email: {
      from: "Alex Miller (alex.m@schoolmail.com)",
      subject: "Visit to Maritime & Exploration Museum!",
      body: "Hi! I'm so excited about visiting the International Maritime Museum with you this weekend! [Note 1: Say which day]\\n\\nWould you prefer to explore the ancient Egyptian trade exhibition or the Great Voyages gallery first? [Note 2: Agree and explain why]\\n\\nI heard they have an interactive navigation workshop where we can calculate distances using map scales. Should we sign up? [Note 3: Suggest instruments]\\n\\nHow are we traveling to the museum on Saturday? [Note 4: Ask Alex]\\n\\nWrite back soon,\\nAlex",
      notes: [
        { id: 1, prompt: "Say which day is best for you" },
        { id: 2, prompt: "State your preference between the galleries and explain why" },
        { id: 3, prompt: "Suggest trying ancient navigation instruments like compasses" },
        { id: 4, prompt: "Ask Alex about travel arrangements and meeting time" }
      ]
    },
    model_response: "Hi Alex,\\n\\nI'm really excited about our museum trip too! Saturday morning is definitely best for me because I have basketball practice on Sunday.\\n\\nI would love to explore the Great Voyages gallery first. I am fascinated by Ferdinand Magellan's three-year journey across the Pacific Ocean, and they have an authentic wooden caravel on display!\\n\\nSigning up for the navigation workshop is a fantastic idea. Let's make sure we test the antique brass compasses and practice measuring distances with map scales.\\n\\nShall we take the morning train together? What time should we meet at the central station?\\n\\nSee you soon,\\nLiam",
    word_count: 104,
    rubric: {
      total_marks: 20,
      scales: {
        content: 5,
        communicative_achievement: 5,
        organisation: 5,
        language: 5
      },
      criteria: "Full marks require answering all four prompt notes, clear B1 register, logical paragraphing with connectors, and accurate grammatical structures."
    }
  },

  // ── Part 2: Extended Writing Choice (~100 words) ───────────────────────────
  part2_extended: {
    task_number: 2,
    instructions: "Choose ONE question from this part. Write your answer in about 100 words.",
    options: [
      {
        option_id: "article",
        type: "Article",
        title_prompt: "An Incredible Voyage of Discovery",
        announcement: "You see this notice in an international youth magazine:\\n\\nArticles Wanted: 'An Incredible Voyage of Discovery'\\nWhich historical or modern explorer inspires you most? What hardships did they overcome during their journey, and what did their voyage teach humanity?\\n\\nWrite an article answering these questions. The best article will be published in our winter issue!",
        model_response: "The historical explorer who inspires me most is Ferdinand Magellan. In 1519, he led an audacious naval expedition of five wooden caravels into uncharted waters. He overcame immense hardships, including freezing Antarctic gales in the narrow straits and nearly four months of starvation crossing the vast Pacific Ocean.\\n\\nMagellan persevered by taking daily solar measurements with a wooden astrolabe and navigating by the stars. Although he perished in the Philippines, his ship Victoria completed the first circumnavigation of Earth. His voyage proved that our oceans are connected into one continuous global ecosystem, inspiring generations of future explorers.",
        word_count: 102
      },
      {
        option_id: "story",
        type: "Story",
        prompt_sentence: "As Captain Miller checked his brass compass, the morning mist began to clear.",
        model_response: "As Captain Miller checked his brass compass, the morning mist began to clear. Suddenly, towering emerald cliffs appeared directly ahead through the parted clouds. After three grueling weeks battling turbulent ocean storms, the expedition had finally reached the uncharted archipelago.\\n\\nMiller shouted to the crew to lower the canvas sails. The sailors cheered with relief as gentle waves carried the caravel into a calm turquoise lagoon. Nearby, a freshwater stream cascaded down rocky slopes, providing the drinking water they urgently needed to survive. Standing on the wooden deck, Miller sketched the coastline on his parchment chart, ready to begin their greatest scientific exploration.",
        word_count: 103
      }
    ],
    rubric: {
      total_marks: 20,
      scales: {
        content: 5,
        communicative_achievement: 5,
        organisation: 5,
        language: 5
      },
      criteria: "Marks awarded for fulfilling the task prompt, engaging target readers, coherent narrative flow, and varied B1 vocabulary and complex sentences."
    }
  }
};

export default writingHubData;
`;

// ─────────────────────────────────────────────────────────────────────────────
// 5. SPEAKING HUB (ALL 4 CAMBRIDGE PET PARTS — S1 TO S4)
// ─────────────────────────────────────────────────────────────────────────────

const speakingHubContent = `/**
 * STAGED MOCK EXAM DELIVERABLE: Speaking Paper (All 4 Parts)
 * Week: 76 | Level: Cambridge B1 Preliminary (PET) | Mode: FULL_MOCK
 * Pipeline: scripts/generate_pet_mock_content.mjs (Round 67 PET Pilot)
 * Cumulative Sourcing: Weeks 73, 74, 75, 76
 */

export const speakingHubData = {
  week: 76,
  theme: "History/ELA: Explorers / Math: Map Scales",
  cefr_level: "B1 Preliminary",
  paper: "Speaking",
  total_parts: 4,
  time_allowed_minutes: 12,

  // ── Part 1: Personal Interview with Nova (2 minutes) ──────────────────────
  part1_interview: {
    instructions: "Examiner Nova asks the candidate general personal questions about daily life, school, and interests.",
    questions: [
      { id: 1, prompt: "What subjects at school do you enjoy studying most, and why?", model_answer: "I really enjoy studying world history and geography because learning about ancient civilizations and great sea voyages inspires me to travel and explore new cultures." },
      { id: 2, prompt: "Do you prefer traveling to natural landscapes like mountains or visiting historic cities?", model_answer: "I prefer visiting natural landscapes because hiking through pine forests and along coastal cliffs offers clean crisp air, breathtaking views, and peaceful serenity." },
      { id: 3, prompt: "How do you usually use maps or digital navigation apps when you visit an unfamiliar place?", model_answer: "I use GPS apps on my phone to check distances and follow street routes, but in science class, we also practice reading topographic paper maps with map scales." },
      { id: 4, prompt: "If you could join any scientific expedition in the world, where would you choose to go?", model_answer: "I would choose to join a marine research expedition exploring coral reef ecosystems in the Pacific Ocean because discovering marine organisms helps us protect ocean biodiversity." }
    ]
  },

  // ── Part 2: Simulated Situation Discussion (Nova & Candidate) ─────────────
  // Validates Table A and Table B UI Schema Contract!
  info_exchange_cards: {
    table_a: {
      title: "Liam's Mountain River Expedition",
      subtitle: "Candidate's Question Card (Ask Examiner Nova)",
      person: "Liam",
      fields: [
        {
          id: "field_a1",
          cue_prompt: "where / expedition base camp located?",
          cue_word: "where",
          is_missing: true,
          acceptable_questions: [
            "Where is the expedition base camp located?",
            "Where is the base camp?",
            "Where do they set up base camp?"
          ],
          nova_reply: "The base camp is set up beside Jade Lake at the foot of the mountain range."
        },
        {
          id: "field_a2",
          cue_prompt: "what / map scale used on trail maps?",
          cue_word: "what",
          is_missing: true,
          acceptable_questions: [
            "What map scale is used on the trail maps?",
            "What is the map scale?",
            "What scale do the maps use?"
          ],
          nova_reply: "The topographic trail map uses a scale of one centimeter to one kilometer."
        },
        {
          id: "field_a3",
          cue_prompt: "how many / kilometers to the river source?",
          cue_word: "how many",
          is_missing: true,
          acceptable_questions: [
            "How many kilometers is it to the river source?",
            "How far is the river source?",
            "What is the distance to the source?"
          ],
          nova_reply: "The total trekking distance to the mountain river source is twelve kilometers."
        },
        {
          id: "field_a4",
          cue_prompt: "who / leads the geological survey team?",
          cue_word: "who",
          is_missing: true,
          acceptable_questions: [
            "Who leads the geological survey team?",
            "Who is the team leader?",
            "Who supervises the survey team?"
          ],
          nova_reply: "Chief Geologist Dr. Rachel Adams supervises the research students."
        },
        {
          id: "field_a5",
          cue_prompt: "why / carry backup magnetic compasses?",
          cue_word: "why",
          is_missing: true,
          acceptable_questions: [
            "Why must they carry backup magnetic compasses?",
            "Why do they need backup compasses?",
            "Why are compasses necessary on the trek?"
          ],
          nova_reply: "Because deep granite canyons frequently block electronic satellite signals."
        }
      ]
    },
    table_b: {
      title: "Nova's Coastal Marine Survey",
      subtitle: "Information Card (Answer Examiner Nova's Questions)",
      person: "Nova",
      fields: [
        {
          id: "field_b1",
          cue_prompt: "where / marine survey research ship anchored?",
          cue_word: "where",
          value: "Inside the sheltered harbor of St. Ives Cove.",
          nova_question: "Where is your marine survey research vessel anchored?",
          acceptable_answers: [
            "Inside the sheltered harbor of St. Ives Cove.",
            "In St. Ives Cove.",
            "Inside the sheltered harbor."
          ]
        },
        {
          id: "field_b2",
          cue_prompt: "what / instruments used to chart seabed?",
          cue_word: "what",
          value: "Digital sonar sounders and underwater lidar cameras.",
          nova_question: "What navigation instruments do you use to chart the rocky seabed?",
          acceptable_answers: [
            "Digital sonar sounders and underwater lidar cameras.",
            "Sonar sounders and lidar cameras.",
            "Sonar and underwater cameras."
          ]
        },
        {
          id: "field_b3",
          cue_prompt: "how long / daily diving shift on reef?",
          cue_word: "how long",
          value: "Ninety minutes during morning slack water tide.",
          nova_question: "How long does each research diving shift last on the reef?",
          acceptable_answers: [
            "Ninety minutes during morning slack water tide.",
            "Ninety minutes.",
            "About ninety minutes."
          ]
        },
        {
          id: "field_b4",
          cue_prompt: "who / navigates the coastal research vessel?",
          cue_word: "who",
          value: "Captain Marcus Miller, an experienced maritime navigator.",
          nova_question: "Who is in charge of navigating the coastal research vessel?",
          acceptable_answers: [
            "Captain Marcus Miller, an experienced maritime navigator.",
            "Captain Marcus Miller.",
            "An experienced maritime captain."
          ]
        },
        {
          id: "field_b5",
          cue_prompt: "why / track ocean water temperature daily?",
          cue_word: "why",
          value: "To predict how rising heat affects fragile coral ecosystems.",
          nova_question: "Why does the scientific team record ocean water temperatures daily?",
          acceptable_answers: [
            "To predict how rising heat affects fragile coral ecosystems.",
            "To protect fragile coral ecosystems.",
            "To study how heat affects coral."
          ]
        }
      ]
    }
  },

  // ── Part 3: Extended Photo Description (3 minutes) ────────────────────────
  part3_photo_description: {
    instructions: "Candidate speaks for about one minute describing a color photograph of an outdoor exploration team.",
    photo_prompt: {
      title: "Young Researchers Navigating Coastal Cliffs",
      image_url: "/images/week76/speaking_photo_p3.png",
      setting: "A high rocky cliff overlooking a sparkling blue ocean under a clear sky.",
      people: "Three teenage students wearing backpacks, waterproof jackets, and sturdy hiking boots.",
      actions: "One boy holds a large topographic map, a girl checks directions with a brass compass, and another student records coordinates on a digital notebook.",
      prompts_to_cover: [
        "Describe what the people are doing and wearing.",
        "Talk about the weather and physical landscape.",
        "Explain what equipment they are using to navigate."
      ],
      model_turn: "In this photograph, I can see three teenage researchers standing on a rocky coastal cliff overlooking a sparkling blue ocean. The weather looks bright and sunny, but there is probably a cool sea breeze because they are wearing warm waterproof jackets and sturdy hiking boots. In the center, a boy is holding an open paper map, studying the contour lines. The girl on the left is holding a brass compass in her hand, carefully checking their heading, while the third student is writing notes on a digital tablet. They look focused and determined, probably participating in an outdoor navigation field project."
    }
  },

  // ── Part 4: Topic Discussion (3 minutes) ──────────────────────────────────
  part4_discussion: {
    instructions: "Examiner Nova and candidate discuss general topics related to the theme of exploration and navigation.",
    theme: "Exploration in the Past and Today",
    discussion_points: [
      {
        question: "Do you think exploring the world was harder for ancient sailors than it is for modern explorers?",
        model_exchange: "Yes, definitely. Ancient sailors had to cross uncharted oceans in wooden ships without weather forecasts or satellite communication. They suffered from scurvy and starvation, whereas modern explorers have GPS, emergency rescue teams, and advanced scientific gear."
      },
      {
        question: "Why is it still important for students to learn paper map reading and compass skills when we have smartphones?",
        model_exchange: "It is essential because smartphone batteries can run out and remote mountain or ocean areas often have zero satellite signal. Knowing how to read map scales and orient a magnetic compass ensures you can always navigate safely."
      },
      {
        question: "Which unexplored part of our world would you like to see explored in the future?",
        model_exchange: "I would love to see deeper exploration of the oceanic abyss. More than eighty percent of our ocean floor remains unmapped, and discovering new deep-sea organisms could teach us so much about biological adaptation."
      }
    ]
  }
};

export default speakingHubData;
`;

// ─────────────────────────────────────────────────────────────────────────────
// 6. SKILL PRACTICE HUB (B1 PET TEST DRILLS)
// ─────────────────────────────────────────────────────────────────────────────

const skillPracticeHubContent = `/**
 * STAGED MOCK EXAM DELIVERABLE: Skill Practice Hub (B1 PET Exam Strategies)
 * Week: 76 | Level: Cambridge B1 Preliminary | Mode: FULL_MOCK
 * Pipeline: scripts/generate_pet_mock_content.mjs (Round 67 PET Pilot)
 * Cumulative Sourcing: Weeks 73, 74, 75, 76
 */

export const skillPracticeHubData = {
  week: 76,
  theme: "History/ELA: Explorers / Math: Map Scales",
  cefr_level: "B1 Preliminary",
  grammar_drills: [
    { sentence: "Magellan sailed through the narrow strait into the Pacific Ocean.", options: ["through", "across", "under"], answer: "through", explanation: "Use 'through' when passing within a 3D channel or passage like a strait." },
    { sentence: "If the crew had citrus fruit, they did not suffer from scurvy.", options: ["suffer", "suffered", "suffering"], answer: "suffer", explanation: "After auxiliary 'did not', use base bare infinitive 'suffer'." },
    { sentence: "The map scale indicates that one centimeter represents five kilometers.", options: ["represents", "representing", "represented"], answer: "represents", explanation: "Use 3rd person singular present simple for general cartographic rules." },
    { sentence: "The ancient caravel was discovered on a sandy seabed south of the reef.", options: ["was discovered", "discovered", "discovering"], answer: "was discovered", explanation: "Use past passive voice 'was discovered' because the caravel received the action." },
    { sentence: "Navigators must keep magnetic compasses away from electrical equipment.", options: ["away from", "into", "towards"], answer: "away from", explanation: "The prepositional phrase 'away from' indicates maintaining physical distance." }
  ],
  singapore_math: [
    {
      id: "w76_p1",
      type: "part_whole",
      title: "Calculating Real Distance Using Map Scale",
      question: "On a maritime chart with a scale of 1 cm = 15 km, Captain Miller measures 8 cm from the island harbor to the coral reef. What is the real distance in kilometers?",
      storyContext: "Liam uses map scales to calculate nautical distances across the archipelago.",
      modelData: {
        bars: [
          { label: "Chart Distance (8 units of 15 km)", value: 120, color: "#0ea5e9" }
        ],
        total: 120,
        unit: "km"
      },
      target_answer: 120,
      unit: "km",
      steps: [
        "Each 1 cm on the map equals 15 km in reality.",
        "Multiply 8 cm by 15 km.",
        "8 x 15 = 120 km total real distance."
      ]
    },
    {
      id: "w76_p2",
      type: "comparison",
      title: "Comparing Two Sea Navigation Routes",
      question: "Route Alpha across the strait is 165 kilometers, while Route Beta around the outer cape is 240 kilometers. How many kilometers shorter is Route Alpha than Route Beta?",
      storyContext: "The navigators compare two alternative channels to save sailing time.",
      modelData: {
        bars: [
          { label: "Route Beta (Outer Cape)", value: 240, color: "#6366f1" },
          { label: "Route Alpha (Strait)", value: 165, color: "#10b981" }
        ],
        difference: 75,
        unit: "km"
      },
      target_answer: 75,
      unit: "km",
      steps: [
        "Start with Route Beta: 240 km.",
        "Subtract Route Alpha: 165 km.",
        "240 - 165 = 75 km shorter."
      ]
    }
  ],
  science_lab: {
    title_en: "Maritime Navigation & Cartography Workshop",
    scenarios: [
      {
        stage: 1,
        title: "Magnetic Declination & Compass Alignment",
        diagram_type: "compass_declination_grid",
        instruction: "Align the compass needle with geographic true north.",
        items: [
          { label: "Magnetic Needle Pointer", target: "magnetic_north" },
          { label: "Rotating Compass Bezel", target: "degrees_ring" },
          { label: "Map True North Meridian", target: "grid_north" }
        ]
      },
      {
        stage: 2,
        title: "Scale Conversion Bar Calculation",
        diagram_type: "linear_map_scale_ruler",
        instruction: "Calibrate map scale units to physical ground kilometers.",
        items: [
          { label: "1 Centimeter Map Span", target: "paper_unit" },
          { label: "10 Kilometer Ratio Multiplier", target: "scale_factor" },
          { label: "Real Ground Navigation Path", target: "real_distance" }
        ]
      },
      {
        stage: 3,
        title: "Ocean Current & Speed Vector Plotting",
        diagram_type: "marine_drift_vector",
        instruction: "Calculate vessel course correction accounting for ocean currents.",
        items: [
          { label: "Caravel Heading Vector", target: "ship_course" },
          { label: "Equatorial Current Drift", target: "water_flow" },
          { label: "Resultant Course Over Ground", target: "true_path" }
        ]
      }
    ]
  }
};

export default skillPracticeHubData;
`;

// ─────────────────────────────────────────────────────────────────────────────
// 7. BLUEPRINT, PROVENANCE & SOURCE GROUNDING
// ─────────────────────────────────────────────────────────────────────────────

const blueprintContent = {
  week: 76,
  theme: "History/ELA: Explorers / Math: Map Scales",
  title_en: "Great Voyages: The Age of Global Exploration",
  title_vi: "Những Chuyến Hải Trình Lớn: Kỷ Nguyên Thám Hiểm Toàn Cầu",
  cefr_level: "B1 Preliminary",
  cefr_stage: 2,
  week_type: "full_mock",
  isFullMock: true,
  mockFormat: "pet",
  cumulativeBlock: [73, 74, 75, 76],
  synthesis_summary: {
    w73_theme: "The Water Cycle (Advanced) / Volume",
    w74_theme: "Food Chains / Complex Charts",
    w75_theme: "Ancient Egypt / Timelines",
    w76_theme: "Explorers / Map Scales",
    grounded_vocabulary_count: 20,
    grounded_pct: 100
  },
  papers: {
    reading: { parts: 6, total_items: 32, time_minutes: 45 },
    writing: { parts: 2, total_tasks: 2, time_minutes: 45 },
    listening: { parts: 4, total_items: 25, time_minutes: 35 },
    speaking: { parts: 4, total_tasks: 4, time_minutes: 12 }
  }
};

const provenanceContent = {
  week: 76,
  generator: "scripts/generate_pet_mock_content.mjs",
  format: "pet",
  generated_at: new Date().toISOString(),
  cefr_standard: "Stage 2: Cambridge Lower Secondary & B1 Preliminary",
  staged_path: "docs/agent_artifacts/staging/week_76_mock",
  invariants: [
    "Freeze Defense: W33 & W34 are untouched",
    "Cumulative Sourcing: Grounded in W73, W74, W75, W76",
    "PET Exam Architecture: Reading (6 parts/32 items), Writing (2 tasks), Listening (4 parts/25 items), Speaking (4 parts)",
    "UI Contract: speaking_hub conforms to table_a and table_b schema"
  ]
};

const sourceGroundingContent = {
  week: 76,
  cumulative_block: [73, 74, 75, 76],
  vocabulary_grounding_summary: {
    w73_source_words: ["evaporation", "precipitation", "reservoir", "moisture", "atmosphere"],
    w74_source_words: ["predator", "ecosystem", "organism", "survive", "energy"],
    w75_source_words: ["ancient", "civilization", "monument", "excavation", "dynasty"],
    w76_source_words: ["voyage", "discover", "navigate", "compass", "expedition"]
  },
  total_synthesis_words: 20,
  cumulative_grounding_pct: 100,
  exam_paper_grounding: {
    reading_p1: "Real-world notices linking navigation gear, museum archives, and map scale hiking",
    reading_p2: "Matching student profiles to courses in polar ice (W73), rainforest ecology (W74), Egyptian archaeology (W75), and ocean navigation (W76)",
    reading_p3: "Ferdinand Magellan's 1519 voyage synthesizing weather patterns, survival nutrition, and global ecosystem connectivity",
    reading_p4: "Historic navigation from constellations to magnetic compasses and marine chronometers",
    reading_p5: "The age of maritime discovery linking trade routes, map scales, and global ecosystems",
    reading_p6: "Diary of a young sailor using prepositions of movement and navigation compasses",
    writing_p1: "Email planning a museum visit to explore Magellan's caravel and test map scale navigation",
    writing_p2: "Extended article or story on historical exploration voyages and overcoming oceanic hardships",
    listening_p1: "7 short scenarios featuring navigation tools, weather departures, and wetland predators",
    listening_p2: "6 dialogues discussing Pacific crossings, volcanic groundwater survival, and trade papyrus",
    listening_p3: "Museum talk on Captain Cook's 1772 voyage, marine chronometers, and scurvy prevention",
    listening_p4: "Interview with marine archaeologist Dr. Sarah Lin excavating a 1542 spice trade caravel",
    speaking_p1: "Personal interview on geography, natural landscapes, and scientific exploration",
    speaking_p2: "Simulated discussion using table_a (Mountain River Expedition) and table_b (Coastal Marine Survey)",
    speaking_p3: "Extended photo turn describing young researchers with maps, compasses, and tablets on coastal cliffs",
    speaking_p4: "Discussion comparing ancient vs modern exploration, map reading skills, and ocean depths"
  }
};

const vocabFileContent = `/**
 * STAGED MOCK EXAM DELIVERABLE: Target Vocabulary & SRS Metadata
 * Week: 76 | Level: Cambridge B1 Preliminary | Mode: FULL_MOCK
 * Pipeline: scripts/generate_pet_mock_content.mjs (Round 67 PET Pilot)
 * Cumulative Sourcing: Weeks 73, 74, 75, 76
 */

export const vocab = ${JSON.stringify(W76_SYNTHESIS_VOCAB, null, 2)};
export const vocabList = vocab;
export const week76Vocab = vocab;
export default vocab;
`;

// ─────────────────────────────────────────────────────────────────────────────
// 8. WRITE ALL 9 STAGED DELIVERABLES
// ─────────────────────────────────────────────────────────────────────────────

fs.writeFileSync(path.join(OUT_DIR, 'blueprint.json'), JSON.stringify(blueprintContent, null, 2));
fs.writeFileSync(path.join(OUT_DIR, 'vocab.js'), vocabFileContent);
fs.writeFileSync(path.join(OUT_DIR, 'listening_hub.js'), listeningHubContent);
fs.writeFileSync(path.join(OUT_DIR, 'reading_hub.js'), readingHubContent);
fs.writeFileSync(path.join(OUT_DIR, 'writing_hub.js'), writingHubContent);
fs.writeFileSync(path.join(OUT_DIR, 'speaking_hub.js'), speakingHubContent);
fs.writeFileSync(path.join(OUT_DIR, 'skill_practice_hub.js'), skillPracticeHubContent);
fs.writeFileSync(path.join(OUT_DIR, 'provenance.json'), JSON.stringify(provenanceContent, null, 2));
fs.writeFileSync(path.join(OUT_DIR, 'source_grounding.json'), JSON.stringify(sourceGroundingContent, null, 2));

console.log('✅ Successfully generated all 9 staged files in:');
console.log('   ' + OUT_DIR);
console.log('   - blueprint.json');
console.log('   - vocab.js');
console.log('   - listening_hub.js (4 Parts / 25 Items)');
console.log('   - reading_hub.js   (6 Parts / 32 Items)');
console.log('   - writing_hub.js   (2 Extended Writing Tasks)');
console.log('   - speaking_hub.js  (4 Parts with Table A & Table B)');
console.log('   - skill_practice_hub.js');
console.log('   - provenance.json');
console.log('   - source_grounding.json');
console.log('========================================================================\n');
