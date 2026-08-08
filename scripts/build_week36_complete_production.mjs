import fs from 'fs';
import path from 'path';

console.log("🚀 RE-BUILDING WEEK 36 PRODUCTION DATA WITH 8 WORD POWER & FULL STATIONS...");

const pubDir = './public/images/week36';
const advDir = './src/data/weeks/week_36';

if (!fs.existsSync(pubDir)) fs.mkdirSync(pubDir, { recursive: true });
if (!fs.existsSync(advDir)) fs.mkdirSync(advDir, { recursive: true });

// ==========================================
// 1. GENERATE DEDICATED SVG BAR MODELS
// ==========================================

const advSvgP1 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 240" width="100%" height="100%">
  <rect width="600" height="240" fill="#f8fafc" rx="12"/>
  <text x="300" y="30" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1e293b" text-anchor="middle">Part-Whole Bar Model: Submarine Diving Depth</text>
  <path d="M 60 65 L 60 55 L 540 55 L 540 65 M 300 55 L 300 45" stroke="#2563eb" stroke-width="3" fill="none"/>
  <text x="300" y="40" font-family="sans-serif" font-size="15" font-weight="bold" fill="#2563eb" text-anchor="middle">Total Target Cavern Depth = 300 metres</text>
  <rect x="60" y="70" width="288" height="55" fill="#3b82f6" rx="6"/>
  <text x="204" y="103" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">Current Depth: 180m</text>
  <rect x="348" y="70" width="192" height="55" fill="#94a3b8" rx="6" stroke="#64748b" stroke-dasharray="4,4"/>
  <text x="444" y="103" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">? metres left</text>
  <text x="300" y="195" font-family="sans-serif" font-size="14" font-weight="bold" fill="#475569" text-anchor="middle">Equation: 300 - 180 = 120 metres</text>
</svg>`;

const advSvgP2 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 240" width="100%" height="100%">
  <rect width="600" height="240" fill="#f8fafc" rx="12"/>
  <text x="300" y="30" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1e293b" text-anchor="middle">Equal Shares Model: Buoyancy Lift Bag Capacity</text>
  <path d="M 60 65 L 60 55 L 540 55 L 540 65 M 300 55 L 300 45" stroke="#059669" stroke-width="3" fill="none"/>
  <text x="300" y="40" font-family="sans-serif" font-size="15" font-weight="bold" fill="#059669" text-anchor="middle">Total Ancient Chest Weight = 150 kg</text>
  <rect x="60" y="70" width="155" height="55" fill="#10b981" rx="6"/>
  <text x="137" y="103" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">Bag 1: ? kg</text>
  <rect x="222" y="70" width="155" height="55" fill="#10b981" rx="6"/>
  <text x="299" y="103" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">Bag 2: ? kg</text>
  <rect x="385" y="70" width="155" height="55" fill="#10b981" rx="6"/>
  <text x="462" y="103" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">Bag 3: ? kg</text>
  <text x="300" y="195" font-family="sans-serif" font-size="14" font-weight="bold" fill="#475569" text-anchor="middle">Equation: 150 ÷ 3 = 50 kg per bag</text>
</svg>`;

const advSvgP3 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 240" width="100%" height="100%">
  <rect width="600" height="240" fill="#f8fafc" rx="12"/>
  <text x="300" y="30" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1e293b" text-anchor="middle">Part-Whole Model: Silk Road Journey Distance</text>
  <path d="M 60 65 L 60 55 L 540 55 L 540 65 M 300 55 L 300 45" stroke="#d97706" stroke-width="3" fill="none"/>
  <text x="300" y="40" font-family="sans-serif" font-size="15" font-weight="bold" fill="#d97706" text-anchor="middle">Total Silk Road Distance = 8,000 km</text>
  <rect x="60" y="70" width="210" height="55" fill="#f59e0b" rx="6"/>
  <text x="165" y="103" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">Overland: 3,500 km</text>
  <rect x="270" y="70" width="270" height="55" fill="#fbbf24" rx="6"/>
  <text x="405" y="103" font-family="sans-serif" font-size="14" font-weight="bold" fill="#1e293b" text-anchor="middle">Desert: ? km</text>
  <text x="300" y="195" font-family="sans-serif" font-size="14" font-weight="bold" fill="#475569" text-anchor="middle">Equation: 8,000 - 3,500 = 4,500 km</text>
</svg>`;

const advSvgP4 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 240" width="100%" height="100%">
  <rect width="600" height="240" fill="#f8fafc" rx="12"/>
  <text x="300" y="30" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1e293b" text-anchor="middle">3-Part Whole Model: Museum Artifact Collection</text>
  <rect x="60" y="70" width="288" height="55" fill="#6366f1" rx="6"/>
  <text x="204" y="103" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">60 Gold Coins</text>
  <rect x="348" y="70" width="115" height="55" fill="#818cf8" rx="6"/>
  <text x="405" y="103" font-family="sans-serif" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle">24 Plates</text>
  <rect x="463" y="70" width="77" height="55" fill="#c7d2fe" rx="6"/>
  <text x="501" y="103" font-family="sans-serif" font-size="12" font-weight="bold" fill="#1e293b" text-anchor="middle">16 Compasses</text>
  <path d="M 60 135 L 60 145 L 540 145 L 540 135 M 300 145 L 300 155" stroke="#4f46e5" stroke-width="3" fill="none"/>
  <text x="300" y="175" font-family="sans-serif" font-size="15" font-weight="bold" fill="#4f46e5" text-anchor="middle">Total Artifacts = 60 + 24 + 16 = 100</text>
</svg>`;

const advSvgP5 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 240" width="100%" height="100%">
  <rect width="600" height="240" fill="#f8fafc" rx="12"/>
  <text x="300" y="30" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1e293b" text-anchor="middle">Part-Whole Model: Submersible Expedition Hours</text>
  <rect x="60" y="70" width="160" height="55" fill="#0284c7" rx="6"/>
  <text x="140" y="103" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">Transit: 8 hours</text>
  <rect x="220" y="70" width="320" height="55" fill="#38bdf8" rx="6"/>
  <text x="380" y="103" font-family="sans-serif" font-size="14" font-weight="bold" fill="#0f172a" text-anchor="middle">Seafloor Research: ? hours</text>
  <path d="M 60 135 L 60 145 L 540 145 L 540 135 M 300 145 L 300 155" stroke="#0369a1" stroke-width="3" fill="none"/>
  <text x="300" y="175" font-family="sans-serif" font-size="15" font-weight="bold" fill="#0369a1" text-anchor="middle">Total Expedition Time = 24 hours</text>
</svg>`;

fs.writeFileSync(`${pubDir}/barmodel_w36_adv_p1.svg`, advSvgP1);
fs.writeFileSync(`${pubDir}/barmodel_w36_adv_p2.svg`, advSvgP2);
fs.writeFileSync(`${pubDir}/barmodel_w36_adv_p3.svg`, advSvgP3);
fs.writeFileSync(`${pubDir}/barmodel_w36_adv_p4.svg`, advSvgP4);
fs.writeFileSync(`${pubDir}/barmodel_w36_adv_p5.svg`, advSvgP5);

// --- read.js ---
const readCode = `// WEEK 36: Adventure Stories (Irregular Verbs)
// Reading Station — Advanced Mode

export default {
  content_en: "On a sunny **Sunday afternoon**, Leo and his marine biology team **dove down into** a deep ocean cavern 300 metres below the surface in a research submarine. They **found an ancient wooden chest** resting on the sandy floor. However, the chest **weighed 150 kilograms**—far too heavy for the submarine's mechanical arms to lift without overwhelming the thrusters and sinking the vehicle! To solve this engineering challenge, Leo **applied Archimedes buoyancy principle** (buoyant force = water density x displaced volume). He calculated that to generate 150 kilograms of upward lift, the team needed to displace 150 litres of seawater. Leo **attached inflatable lift bags** to the chest and pumped compressed air into them. As the water **was displaced by air**, the bags expanded and neutral buoyancy **was achieved**. The heavy chest **floated gently off** the seafloor and **rose smoothly to** the surface vessel. Inside the chest, they **discovered a preserved gold compass** from the 1500s, which they **presented to the maritime museum**.",
  sentences: [
    { id: 1, text: "On a sunny Sunday afternoon, Leo dove into the ocean in a submarine.", text_en: "On a sunny Sunday afternoon, Leo dove into the ocean in a submarine.", text_vi: "Vào một buổi chiều Chủ Nhật nắng đẹp, Leo đã lặn xuống đại dương bằng tàu ngầm." },
    { id: 2, text: "They found a heavy ancient wooden chest weighing 150 kilograms.", text_en: "They found a heavy ancient wooden chest weighing 150 kilograms.", text_vi: "Họ tìm thấy một rương gỗ cổ nặng 150kg." },
    { id: 3, text: "Leo applied Archimedes buoyancy principle to solve the problem.", text_en: "Leo applied Archimedes buoyancy principle to solve the problem.", text_vi: "Leo đã áp dụng nguyên lý lực đẩy Archimedes để giải quyết vấn đề." },
    { id: 4, text: "He calculated that displacing 150 litres of seawater created 150 kg of upward lift.", text_en: "He calculated that displacing 150 litres of seawater created 150 kg of upward lift.", text_vi: "Anh tính toán rằng làm dịch chuyển 150 lít nước biển tạo ra 150kg lực nâng lên." },
    { id: 5, text: "The lift bags expanded and brought the heavy chest safely to the surface.", text_en: "The lift bags expanded and brought the heavy chest safely to the surface.", text_vi: "Các túi nâng nở ra và đưa chiếc rương nặng lên bề mặt an toàn." },
    { id: 6, text: "Inside the chest, they found a valuable 16th-century gold compass.", text_en: "Inside the chest, they found a valuable 16th-century gold compass.", text_vi: "Bên trong chiếc rương, họ tìm thấy một chiếc la bàn vàng thế kỷ 16 quý giá." }
  ],
  read_stem: {
    title_en: "The Submarine Buoyancy Rescue",
    subtitle_en: "Applying Physics Underwater",
    image_url: "/images/week36/read_stem_w36.jpg",
    audio_url: "/audio/week36/read_stem.mp3",
    content_en: "On a sunny **Sunday afternoon**, Leo and his marine biology team **dove down into** a deep ocean cavern 300 metres below the surface in a research submarine. They **found an ancient wooden chest** resting on the sandy floor. However, the chest **weighed 150 kilograms**—far too heavy for the submarine's mechanical arms to lift without overwhelming the thrusters and sinking the vehicle! To solve this engineering challenge, Leo **applied Archimedes buoyancy principle** (buoyant force = water density x displaced volume). He calculated that to generate 150 kilograms of upward lift, the team needed to displace 150 litres of seawater. Leo **attached inflatable lift bags** to the chest and pumped compressed air into them. As the water **was displaced by air**, the bags expanded and neutral buoyancy **was achieved**. The heavy chest **floated gently off** the seafloor and **rose smoothly to** the surface vessel. Inside the chest, they **discovered a preserved gold compass** from the 1500s, which they **presented to the maritime museum**.",
    content_vi: "Vào một buổi chiều Chủ Nhật nắng đẹp, Leo và đội sinh học biển đã lặn xuống một hang động đại dương sâu 300 mét bằng tàu ngầm nghiên cứu. Họ tìm thấy một rương gỗ cổ nặng 150kg. Để nâng rương lên an toàn mà không làm chìm tàu ngầm, Leo áp dụng nguyên lý lực đẩy Archimedes (lực đẩy = khối lượng riêng của nước x thể tích nước bị chiếm chỗ). Anh gắn các túi nâng bơm hơi và làm dịch chuyển 150 lít nước biển. Chiếc rương nhẹ nhàng nổi lên bề mặt, hé lộ một chiếc la bàn vàng cổ thế kỷ 16.",
    key_vocabulary: [
      { word: "submarine", definition: "a vessel built to operate underwater", definition_vi: "tàu ngầm", example: "The submarine dove into the deep cavern." },
      { word: "buoyancy", definition: "the upward force exerted by a fluid on an object", definition_vi: "lực đẩy nổi", example: "Buoyancy helped float the heavy chest." },
      { word: "cavern", definition: "a large underwater cave", definition_vi: "hang động ngầm", example: "They found the chest inside a cavern." },
      { word: "displace", definition: "to push water out of the way", definition_vi: "làm dịch chuyển nước", example: "The air bags displace 150 litres of seawater." },
      { word: "compass", definition: "a tool with a magnetic needle that shows direction", definition_vi: "la bàn", example: "The gold compass was perfectly preserved." }
    ],
    comprehension_questions: [
      { id: 1, question_en: "How deep did Leo dive in the submarine?", answer: ["300 metres", "300 meters"], clue_statement: "300 metres below the surface.", hint_en: "300 m...", hint_vi: "300 m..." },
      { id: 2, question_en: "What physical principle did Leo apply to lift the chest?", answer: ["Archimedes buoyancy principle", "Buoyancy principle"], clue_statement: "Archimedes buoyancy principle.", hint_en: "Archimedes...", hint_vi: "Nguyen ly..." },
      { id: 3, question_en: "How much seawater needed to be displaced for 150 kg of lift?", answer: ["150 litres", "150 liters"], clue_statement: "150 litres of seawater.", hint_en: "150 l...", hint_vi: "150 lit..." },
      { id: 4, question_en: "What artifact was discovered inside the ancient chest?", answer: ["A gold compass", "A 16th-century gold compass"], clue_statement: "A preserved gold compass from the 1500s.", hint_en: "A gold...", hint_vi: "La ban..." }
    ]
  },
  read_social: {
    title_en: "Marco Polo's Silk Road Odyssey",
    subtitle_en: "Connecting Civilizations Across Continents",
    image_url: "/images/week36/read_social_w36.jpg",
    audio_url: "/audio/week36/read_social.mp3",
    content_en: "In 1271 AD, seventeen-year-old Marco Polo **left his home in Venice** to embark on an extraordinary journey across Asia. For example, on a sunny **Sunday afternoon** during his travel through Persia, he **observed thriving merchant bazaars** along the famous Silk Road. His epic expedition **took nearly 24 years**, crossing high Pamir mountains and the Gobi Desert to reach Khanbaliq (modern Beijing). In China, the great ruler Kublai Khan **appointed Marco Polo as an official diplomat**. Marco **spoke several languages** and **wrote detailed manuscripts** about paper currency, silk weaving, and coal fuel. When Marco **returned to Venice**, people initially doubted his stories, but historians later **confirmed his accurate accounts**. His book **inspired generations of global explorers** to respect cultural diversity and build diplomatic connections across nations.",
    content_vi: "Năm 1271, Marco Polo 17 tuổi rời quê hương Venice bắt đầu hành trình lịch sử băng qua châu Á. Ví dụ, vào một buổi chiều Chủ Nhật nắng đẹp trong chuyến đi qua Ba Tư, ông quan sát thấy các khu chợ thương gia sầm uất dọc theo Con đường Tơ lụa. Hành trình kéo dài gần 24 năm, vượt qua dãy núi Pamir và hoang mạc Gobi để đến Đại Đô (Bắc Kinh ngày nay). Hoàng đế Hốt Tất Liệt đã bổ nhiệm Marco làm sứ giả ngoại giao. Cuốn sách của ông đã truyền cảm hứng cho nhiều thế hệ nhà khám phá toàn cầu.",
    key_vocabulary: [
      { word: "Silk Road", definition: "an ancient trade network connecting Europe and Asia", definition_vi: "Con đường Tơ lụa", example: "Marco Polo traveled on the Silk Road." },
      { word: "merchant", definition: "a person who trades goods internationally", definition_vi: "thương gia", example: "Merchants traded silk and spices." },
      { word: "diplomat", definition: "an official representing a country abroad", definition_vi: "nhà ngoại giao", example: "Marco served as a diplomat for Kublai Khan." },
      { word: "explorer", definition: "a person who travels to discover new places", definition_vi: "nhà khám phá", example: "Marco Polo became a famous explorer." },
      { word: "manuscript", definition: "a handwritten document or record", definition_vi: "bản thảo", example: "His manuscript described paper money." }
    ],
    comprehension_questions: [
      { id: 1, question_en: "Where did Marco Polo start his journey in 1271 AD?", answer: ["Venice", "Venice Italy"], clue_statement: "Left his home in Venice.", hint_en: "Venice...", hint_vi: "Venice..." },
      { id: 2, question_en: "How long did Marco Polo's total journey take?", answer: ["Nearly 24 years", "24 years"], clue_statement: "Took nearly 24 years.", hint_en: "Nearly 24...", hint_vi: "Gan 24..." },
      { id: 3, question_en: "What role did Kublai Khan give to Marco Polo?", answer: ["Official diplomat", "An official diplomat"], clue_statement: "Appointed Marco Polo as an official diplomat.", hint_en: "Diplomat...", hint_vi: "Nha ngoai giao..." },
      { id: 4, question_en: "What social value did Marco Polo's book promote?", answer: ["Cultural diversity and global connections", "Respect cultural diversity"], clue_statement: "Inspired explorers to respect cultural diversity.", hint_en: "Cultural...", hint_vi: "Da dang van hoa..." }
    ]
  }
};

export const chunk_focus = [
  "Sunday afternoon",
  "dove down into",
  "found an ancient wooden chest",
  "weighed 150 kilograms",
  "applied Archimedes buoyancy principle",
  "attached inflatable lift bags",
  "was displaced by air",
  "was achieved",
  "floated gently off",
  "rose smoothly to",
  "discovered a preserved gold compass",
  "presented to the maritime museum",
  "left his home in Venice",
  "observed thriving merchant bazaars",
  "took nearly 24 years",
  "appointed Marco Polo as an official diplomat",
  "spoke several languages",
  "wrote detailed manuscripts",
  "returned to Venice",
  "confirmed his accurate accounts",
  "inspired generations of global explorers"
];
`;

// --- explore.js ---
const exploreCode = `// WEEK 36: Explore Station — Advanced Mode

export default {
  content_en: "Beyond shallow coastal waters lies the **Mariana Trench** in the Western Pacific Ocean, reaching a depth of nearly 11,000 metres at **Challenger Deep**. Exploring this extreme environment requires advanced **deep-sea submersibles** like the historic Trieste and Deepsea Challenger. Water **pressure at the trench floor** exceeds 1,000 atmospheres—strong enough to crush standard steel hulls instantly! To withstand such immense force, ocean engineers design **spherical titanium pressure hulls** and use specialized **syntactic foam for buoyant support**. Scientists operating these submersibles have **discovered bioluminescent organisms** and unique **hydrothermal vent ecosystems** that thrive without any sunlight. These remarkable submersibles have **opened new scientific horizons**, allowing researchers to **study ocean geology** and discover ancient secrets hidden in the deepest places on Earth. Each deep ocean dive **helps us understand** how marine life survives under extreme physical conditions and **expands human knowledge** of our mysterious ocean planet for future generations of oceanographers, marine biologists, and curious explorers worldwide.",
  content_vi: "Bên dưới những vùng nước nông ven biển là Rãnh Mariana ở Tây Thái Bình Dương, đạt độ sâu gần 11.000 mét tại vực thẳm Challenger. Khám phá môi trường cực hạn này đòi hỏi các tàu lặn ngầm tiên tiến như Trieste và Deepsea Challenger. Áp suất nước tại đáy rãnh vượt quá 1.000 bầu khí quyển—đủ mạnh để làm đè bẹp vỏ thép thông thường ngay lập tức! Các kỹ sư thiết kế khoang áp lực hình cầu bằng titan và sử dụng bọt tổng hợp để tạo lực nâng nổi. Các nhà khoa học lặn ngầm đã phát hiện ra các sinh vật phát quang sinh học và hệ sinh thái miệng phun thủy nhiệt độc đáo phát triển không cần ánh sáng mặt trời. Những tàu lặn xuất sắc này mở ra các chân trời khoa học mới.",
  key_vocabulary: [
    { word: "submersible", definition: "a craft designed to withstand deep underwater pressure", definition_vi: "tàu lặn ngầm sâu", example: "The submersible reached the bottom of the trench." },
    { word: "trench", definition: "a long steep-sided valley on the ocean floor", definition_vi: "rãnh đại dương", example: "The Mariana Trench is the deepest place on Earth." },
    { word: "pressure", definition: "continuous physical force exerted on an object", definition_vi: "áp suất", example: "Extreme pressure requires a titanium hull." },
    { word: "titanium", definition: "a strong lightweight metal resistant to pressure", definition_vi: "kim loại titan", example: "The sphere was built from thick titanium." },
    { word: "bioluminescent", definition: "producing natural light by living organisms", definition_vi: "phát quang sinh học", example: "Deep sea fish are often bioluminescent." }
  ],
  check_questions: [
    { id: 1, question_en: "What is the deepest point in the Mariana Trench?", answer: ["Challenger Deep", "The Challenger Deep"], clue_statement: "Challenger Deep at nearly 11,000 metres.", hint_en: "Challenger...", hint_vi: "Challenger..." },
    { id: 2, question_en: "How strong is water pressure at the trench floor?", answer: ["Exceeds 1000 atmospheres", "Over 1000 atmospheres"], clue_statement: "Exceeds 1,000 atmospheres.", hint_en: "1,000 atm...", hint_vi: "1.000 khi quyen..." },
    { id: 3, question_en: "What material is used to construct pressure spheres?", answer: ["Titanium", "Spherical titanium"], clue_statement: "Spherical titanium pressure spheres.", hint_en: "Titanium...", hint_vi: "Titan..." },
    { id: 4, question_en: "Why is deep-sea submersible exploration important for science?", answer: ["Discovers unique ecosystems and geological secrets", "Discovers bioluminescent organisms"], clue_statement: "Discovers unique ecosystems that thrive without sunlight.", hint_en: "Discovers...", hint_vi: "Kham pha he sinh thai..." }
  ],
  question: {
    text_en: "Why do engineers build submersibles with spherical titanium hulls for deep ocean exploration?",
    text_vi: "Tại sao các kỹ sư lại chế tạo tàu lặn với vỏ titan hình cầu để khám phá đại dương sâu?",
    min_words: 12,
    hint_en: "Spherical shapes distribute extreme water pressure evenly across the hull, and titanium is lightweight and strong.",
    hint_vi: "Hình cầu phân bổ áp suất nước cực hạn đều khắp thân tàu, và titan rất nhẹ và bền."
  },
  chunk_focus: [
    "Mariana Trench",
    "Challenger Deep",
    "deep-sea submersibles",
    "water pressure",
    "spherical titanium",
    "syntactic foam",
    "bioluminescent organisms",
    "hydrothermal vent"
  ],
  dictionary: {
    submarine: "tàu ngầm",
    buoyancy: "lực đẩy nổi",
    cavern: "hang động ngầm",
    displace: "dịch chuyển nước",
    compass: "la bàn",
    "Silk Road": "Con đường Tơ lụa",
    merchant: "thương gia",
    diplomat: "nhà ngoại giao",
    explorer: "nhà khám phá",
    manuscript: "bản thảo",
    submersible: "tàu lặn ngầm sâu",
    trench: "rãnh đại dương",
    pressure: "áp suất",
    titanium: "kim loại titan",
    bioluminescent: "phát quang sinh học"
  }
};
`;

// --- word_power.js --- EXACTLY 8 PHRASES / COLLOCATIONS FOR WORD POWER
const wordPowerCode = `// WEEK 36: Word Power Station — Advanced Mode

const wordPowerList = [
  { id: "wp1", word: "Apply Archimedes Principle", definition_en: "to use the physics law of fluid buoyancy", definition_vi: "áp dụng nguyên lý Archimedes", example: "Leo applied Archimedes principle to float the 150 kg chest.", collocation_en: "buoyancy / water displacement" },
  { id: "wp2", word: "Displace Seawater", definition_en: "to push ocean water out of the way to create upward force", definition_vi: "dịch chuyển nước biển", example: "The air bags displaced 150 litres of seawater.", collocation_en: "upward lift / ocean physics" },
  { id: "wp3", word: "Achieve Neutral Buoyancy", definition_en: "to balance gravity and upward buoyant force perfectly", definition_vi: "đạt trạng thái cân bằng lực nổi", example: "They achieved neutral buoyancy to lift the heavy object.", collocation_en: "underwater floatation / physics balance" },
  { id: "wp4", word: "Embark on a Journey", definition_en: "to start an important or adventurous expedition", definition_vi: "bắt đầu chuyến hành trình", example: "Marco Polo embarked on a 24-year journey across Asia.", collocation_en: "Silk Road / expedition" },
  { id: "wp5", word: "Serve as a Diplomat", definition_en: "to work as an official representative between nations", definition_vi: "làm việc như một nhà ngoại giao", example: "Marco Polo served as a diplomat for Kublai Khan.", collocation_en: "international trust / governance" },
  { id: "wp6", word: "Withstand Extreme Pressure", definition_en: "to resist immense deep-sea force without collapsing", definition_vi: "chịu đựng áp suất cực hạn", example: "Titanium submersibles withstand extreme deep-sea pressure.", collocation_en: "deep ocean / titanium hull" },
  { id: "wp7", word: "Discover Ancient Artifacts", definition_en: "to find historical objects preserved underwater or in ruins", definition_vi: "phát hiện cổ vật lịch sử", example: "Explorers discovered ancient artifacts inside the cavern.", collocation_en: "gold compass / archaeology" },
  { id: "wp8", word: "Explore Deep Ocean Trenches", definition_en: "to investigate the deepest valleys on the ocean floor", definition_vi: "khám phá rãnh đại dương sâu", example: "Scientists explore deep ocean trenches using submersibles.", collocation_en: "Mariana Trench / Challenger Deep" }
];

export default {
  words: wordPowerList,
  phrases: wordPowerList,
  collocations: wordPowerList
};
`;

// --- ask_ai.js --- EXACTLY 4 SITUATIONS
const askAiCode = `export default {
  prompts: [
    {
      id: 1,
      context_en: "Leo calculated that displacing 150 litres of seawater gives 150 kg of buoyant lift.",
      nova_says: "How does compressed air inside lift bags help raise a heavy submarine chest?",
      hints: ["Air displaces water", "Displaced water creates buoyancy", "Buoyant force equals chest weight"]
    },
    {
      id: 2,
      context_en: "Marco Polo traveled for 24 years on the Silk Road connecting Europe and Asia.",
      nova_says: "What goods and ideas did Marco Polo discover during his Silk Road journey?",
      hints: ["Paper money and silk", "Persian merchant bazaars", "Chinese manuscripts"]
    },
    {
      id: 3,
      context_en: "Titanium submersibles dive nearly 11,000 metres into the Mariana Trench.",
      nova_says: "Why do ocean engineers build submersibles with spherical titanium hulls?",
      hints: ["Spheres distribute water pressure", "Titanium is strong and light", "Resists extreme pressure"]
    },
    {
      id: 4,
      context_en: "Leo's team donated the preserved 16th-century gold compass to the museum.",
      nova_says: "Why is it important to present ancient deep-sea artifacts to public museums?",
      hints: ["Preserves historical knowledge", "Teaches future generations", "Honors ancient explorers"]
    }
  ]
};`;

// --- daily_watch.js --- 5 VERIFIED WORKING YOUTUBE VIDEOS WITH HIGH QUALITY THUMBNAILS
const dailyWatchCode = `export default {
  videos: [
    {
      id: "v36_1",
      title: "Archimedes Principle & Buoyancy Explained",
      title_en: "Archimedes Principle & Buoyancy Explained",
      title_vi: "Giải Thích Nguyên Lý Archimedes & Lực Đẩy Nổi",
      youtube_id: "eQsmq3Hu9HA",
      thumb: "https://img.youtube.com/vi/eQsmq3Hu9HA/hqdefault.jpg",
      duration: "4:15",
      summary_en: "Learn how buoyant force allows heavy ships and submarines to float by displacing water.",
      summary_vi: "Tìm hiểu cách lực đẩy nổi giúp tàu lớn và tàu ngầm nổi lên bằng cách dịch chuyển nước."
    },
    {
      id: "v36_2",
      title: "Deep Sea Submersibles & Ocean Pressure",
      title_en: "Deep Sea Submersibles & Ocean Pressure",
      title_vi: "Tàu Lặn Đại Dương Sâu & Áp Suất Nước",
      youtube_id: "0a3cM09f5K0",
      thumb: "https://img.youtube.com/vi/0a3cM09f5K0/hqdefault.jpg",
      duration: "5:30",
      summary_en: "See how scientists build titanium submersibles to withstand extreme ocean pressure.",
      summary_vi: "Xem cách các nhà khoa học chế tạo tàu lặn titan để chịu đựng áp suất đại dương cực hạn."
    },
    {
      id: "v36_3",
      title: "Marco Polo's Journey on the Silk Road",
      title_en: "Marco Polo's Journey on the Silk Road",
      title_vi: "Hành Trình Marco Polo Trên Con Đường Tơ Lụa",
      youtube_id: "19h1vH1D574",
      thumb: "https://img.youtube.com/vi/19h1vH1D574/hqdefault.jpg",
      duration: "4:45",
      summary_en: "Discover the 24-year Silk Road expedition of Marco Polo in the 13th century.",
      summary_vi: "Khám phá cuộc thám hiểm Con đường Tơ lụa 24 năm của Marco Polo ở thế kỷ 13."
    },
    {
      id: "v36_4",
      title: "Exploring the Mariana Trench Challenger Deep",
      title_en: "Exploring the Mariana Trench Challenger Deep",
      title_vi: "Khám Phá Rãnh Đại Dương Mariana",
      youtube_id: "UU40gqM4R8s",
      thumb: "https://img.youtube.com/vi/UU40gqM4R8s/hqdefault.jpg",
      duration: "6:10",
      summary_en: "Dive nearly 11,000 metres down to Challenger Deep, the deepest point on Earth.",
      summary_vi: "Lặn xuống gần 11.000 mét tới Challenger Deep, điểm sâu nhất trên Trái Đất."
    },
    {
      id: "v36_5",
      title: "Irregular Verbs in English Storytelling",
      title_en: "Irregular Verbs in English Storytelling",
      title_vi: "Động Từ Bất Quy Tắc Trong Câu Chuyện Tiếng Anh",
      youtube_id: "MA3NFtLc22k",
      thumb: "https://img.youtube.com/vi/MA3NFtLc22k/hqdefault.jpg",
      duration: "3:50",
      summary_en: "Master past simple irregular verbs like went, dove, swam, and wrote through storytelling.",
      summary_vi: "Thành thạo động từ bất quy tắc quá khứ đơn qua các câu chuyện kể."
    }
  ]
};`;

// --- shadowing.js ---
const shadowingCode = `export default {
  script: [
    { id: 1, text: "On a sunny Sunday afternoon, Leo dove into the ocean in a submarine.", text_en: "On a sunny Sunday afternoon, Leo dove into the ocean in a submarine.", text_vi: "Vào một buổi chiều Chủ Nhật nắng đẹp, Leo đã lặn xuống đại dương bằng tàu ngầm.", audio_url: "/audio/week36/shadowing_1.mp3" },
    { id: 2, text: "They found a heavy ancient wooden chest weighing 150 kilograms.", text_en: "They found a heavy ancient wooden chest weighing 150 kilograms.", text_vi: "Họ tìm thấy một rương gỗ cổ nặng 150kg.", audio_url: "/audio/week36/shadowing_2.mp3" },
    { id: 3, text: "Leo applied Archimedes buoyancy principle to solve the problem.", text_en: "Leo applied Archimedes buoyancy principle to solve the problem.", text_vi: "Leo đã áp dụng nguyên lý lực đẩy Archimedes để giải quyết vấn đề.", audio_url: "/audio/week36/shadowing_3.mp3" },
    { id: 4, text: "He calculated that displacing 150 litres of seawater created 150 kg of upward lift.", text_en: "He calculated that displacing 150 litres of seawater created 150 kg of upward lift.", text_vi: "Anh tính toán rằng làm dịch chuyển 150 lít nước biển tạo ra 150kg lực nâng lên.", audio_url: "/audio/week36/shadowing_4.mp3" },
    { id: 5, text: "The lift bags expanded and brought the heavy chest safely to the surface.", text_en: "The lift bags expanded and brought the heavy chest safely to the surface.", text_vi: "Các túi nâng nở ra và đưa chiếc rương nặng lên bề mặt an toàn.", audio_url: "/audio/week36/shadowing_5.mp3" },
    { id: 6, text: "Inside the chest, they found a valuable 16th-century gold compass.", text_en: "Inside the chest, they found a valuable 16th-century gold compass.", text_vi: "Bên trong chiếc rương, họ tìm thấy một chiếc la bàn vàng thế kỷ 16 quý giá.", audio_url: "/audio/week36/shadowing_6.mp3" }
  ],
  sentences: [
    { id: 1, text: "On a sunny Sunday afternoon, Leo dove into the ocean in a submarine.", text_en: "On a sunny Sunday afternoon, Leo dove into the ocean in a submarine.", text_vi: "Vào một buổi chiều Chủ Nhật nắng đẹp, Leo đã lặn xuống đại dương bằng tàu ngầm.", audio_url: "/audio/week36/shadowing_1.mp3" },
    { id: 2, text: "They found a heavy ancient wooden chest weighing 150 kilograms.", text_en: "They found a heavy ancient wooden chest weighing 150 kilograms.", text_vi: "Họ tìm thấy một rương gỗ cổ nặng 150kg.", audio_url: "/audio/week36/shadowing_2.mp3" },
    { id: 3, text: "Leo applied Archimedes buoyancy principle to solve the problem.", text_en: "Leo applied Archimedes buoyancy principle to solve the problem.", text_vi: "Leo đã áp dụng nguyên lý lực đẩy Archimedes để giải quyết vấn đề.", audio_url: "/audio/week36/shadowing_3.mp3" },
    { id: 4, text: "He calculated that displacing 150 litres of seawater created 150 kg of upward lift.", text_en: "He calculated that displacing 150 litres of seawater created 150 kg of upward lift.", text_vi: "Anh tính toán rằng làm dịch chuyển 150 lít nước biển tạo ra 150kg lực nâng lên.", audio_url: "/audio/week36/shadowing_4.mp3" },
    { id: 5, text: "The lift bags expanded and brought the heavy chest safely to the surface.", text_en: "The lift bags expanded and brought the heavy chest safely to the surface.", text_vi: "Các túi nâng nở ra và đưa chiếc rương nặng lên bề mặt an toàn.", audio_url: "/audio/week36/shadowing_5.mp3" },
    { id: 6, text: "Inside the chest, they found a valuable 16th-century gold compass.", text_en: "Inside the chest, they found a valuable 16th-century gold compass.", text_vi: "Bên trong chiếc rương, họ tìm thấy một chiếc la bàn vàng thế kỷ 16 quý giá.", audio_url: "/audio/week36/shadowing_6.mp3" }
  ]
};`;

// --- logic_science.js, singapore_math.js, vocab.js, grammar.js, writing.js, mindmap.js, social_quiz.js, word_match.js, games.js ---
const logicScienceCode = `export default {
  title: "Physics of Ocean Buoyancy & Water Displacement",
  concept: "Archimedes Buoyancy Principle: Fb = density x volume x gravity",
  questions: [
    {
      id: 1,
      question_en: "What happens when compressed air pushes seawater out of an inflatable lift bag?",
      question_vi: "Điều gì xảy ra khi khí nén đẩy nước biển ra khỏi túi nâng bơm hơi?",
      answer: "Density decreases and buoyant force increases",
      options: [
        "Density decreases and buoyant force increases",
        "The bag becomes heavier and sinks",
        "Water pressure disappears completely",
        "The bag shrinks in size"
      ],
      explanation: "Air is much less dense than seawater. Displacing 150L of seawater creates 150kg of upward buoyant force."
    },
    {
      id: 2,
      question_en: "Why do engineers choose spherical titanium hulls for deep-sea submersibles instead of flat steel boxes?",
      question_vi: "Tại sao các kỹ sư chọn vỏ titan hình cầu cho tàu lặn thay vì hộp thép phẳng?",
      answer: "Spheres distribute extreme water pressure evenly from all directions",
      options: [
        "Spheres distribute extreme water pressure evenly from all directions",
        "Flat boxes are too heavy to paint",
        "Spheres float without any engines",
        "Titanium turns transparent underwater"
      ],
      explanation: "A sphere is the strongest geometric shape for distributing immense external hydrostatic pressure evenly."
    },
    {
      id: 3,
      question_en: "If an ancient wooden chest weighs 150 kg underwater and lift bags generate 150 kg of buoyant lift, what is the motion state of the chest?",
      question_vi: "Nếu rương gỗ cổ nặng 150kg dưới nước và túi nâng tạo 150kg lực đẩy nổi, trạng thái chuyển động của rương là gì?",
      answer: "Neutral buoyancy - it floats suspended without sinking or accelerating up",
      options: [
        "Neutral buoyancy - it floats suspended without sinking or accelerating up",
        "It crashes rapidly into the seabed",
        "It explodes from internal air pressure",
        "It turns into pure gold"
      ],
      explanation: "When upward buoyant force equals total downward weight (Fb = W), neutral buoyancy is achieved."
    },
    {
      id: 4,
      question_en: "How does water pressure change as a submersible dives from the surface down to 300 metres in a cavern?",
      question_vi: "Áp suất nước thay đổi thế nào khi tàu lặn lặn từ bề mặt xuống 300 mét trong hang động?",
      answer: "Pressure increases by 1 atmosphere for every 10 metres of depth",
      options: [
        "Pressure increases by 1 atmosphere for every 10 metres of depth",
        "Pressure decreases to zero at 300 metres",
        "Pressure remains constant throughout the ocean",
        "Pressure changes only when fish swim past"
      ],
      explanation: "Hydrostatic pressure increases linearly with depth due to the weight of the water column above."
    },
    {
      id: 5,
      question_en: "Why is syntactic foam added to deep submersibles alongside heavy titanium pressure spheres?",
      question_vi: "Tại sao bọt tổng hợp được thêm vào tàu lặn cùng với khoang áp lực titan nặng?",
      answer: "Syntactic foam contains tiny hollow glass spheres that provide positive buoyancy without crushing under pressure",
      options: [
        "Syntactic foam contains tiny hollow glass spheres that provide positive buoyancy without crushing under pressure",
        "It keeps the scientists warm inside the cabin",
        "It powers the submarine electric propellers",
        "It makes the submersible invisible to sea creatures"
      ],
      explanation: "Syntactic foam has high compressive strength and low density, giving submersibles vital buoyant lift."
    }
  ]
};`;

const singaporeMathCode = `export default {
  title: "Singapore Math Bar Models: Submarine & Expedition Mathematics",
  problems: [
    {
      id: 1,
      type: "part_whole",
      question_en: "Leo's submarine target cavern is at a depth of 300 metres. If the submarine has currently dived 180 metres down, how many metres remain until it reaches the cavern floor?",
      question_vi: "Hang động mục tiêu của tàu ngầm Leo ở độ sâu 300 mét. Nếu tàu ngầm hiện tại đã lặn xuống 180 mét, còn bao nhiêu mét nữa mới đến đáy hang động?",
      image_url: "/images/week36/barmodel_w36_adv_p1.svg",
      equation: "300 - 180 = 120",
      answer: ["120 metres", "120 meters", "120m", "120"],
      unit: "metres",
      explanation_en: "Total depth (300m) minus current depth (180m) equals remaining depth (120m)."
    },
    {
      id: 2,
      type: "equal_groups",
      question_en: "To lift a 150 kilogram ancient chest, Leo attached 3 equal buoyancy lift bags. How many kilograms of upward lift must each bag provide?",
      question_vi: "Để nâng một chiếc rương cổ nặng 150kg, Leo đã gắn 3 túi nâng nổi bằng nhau. Mỗi túi phải cung cấp bao nhiêu kilogram lực nâng lên?",
      image_url: "/images/week36/barmodel_w36_adv_p2.svg",
      equation: "150 / 3 = 50",
      answer: ["50 kg", "50 kilograms", "50kg", "50"],
      unit: "kg",
      explanation_en: "Total chest weight (150 kg) divided by 3 lift bags equals 50 kg per bag."
    },
    {
      id: 3,
      type: "part_whole",
      question_en: "Marco Polo's total journey from Venice to Khanbaliq was 8,000 kilometres. If 3,500 kilometres were traveled overland across Asia, how many kilometres were traveled through desert and mountains?",
      question_vi: "Tổng hành trình của Marco Polo từ Venice đến Bắc Kinh là 8.000 km. Nếu 3.500 km là đường bộ qua châu Á, bao nhiêu km đã đi qua hoang mạc và núi non?",
      image_url: "/images/week36/barmodel_w36_adv_p3.svg",
      equation: "8000 - 3500 = 4500",
      answer: ["4500 kilometres", "4500 km", "4,500 km", "4500"],
      unit: "km",
      explanation_en: "Total distance (8,000 km) minus overland distance (3,500 km) equals 4,500 km."
    },
    {
      id: 4,
      type: "three_part_whole",
      question_en: "The maritime museum received 60 gold coins, 24 silver plates, and 16 compasses from deep-sea recoveries. How many total artifacts were presented?",
      question_vi: "Bảo tàng hàng hải nhận được 60 đồng xu vàng, 24 đĩa bạc và 16 la bàn từ cuộc thám hiểm biển sâu. Tổng cộng bao nhiêu cổ vật đã được trình bày?",
      image_url: "/images/week36/barmodel_w36_adv_p4.svg",
      equation: "60 + 24 + 16 = 100",
      answer: ["100 artifacts", "100 items", "100"],
      unit: "artifacts",
      explanation_en: "Summing all 3 groups of artifacts: 60 + 24 + 16 = 100 total artifacts."
    },
    {
      id: 5,
      type: "part_whole",
      question_en: "A deep-sea submersible mission takes 24 hours in total. If 8 hours are spent descending and ascending, how many hours are available for research on the seafloor?",
      question_vi: "Một nhiệm vụ lặn sâu bằng tàu ngầm kéo dài tổng cộng 24 giờ. Nếu 8 giờ được dùng để lặn xuống và ngoi lên, còn bao nhiêu giờ nghiên cứu trên đáy biển?",
      image_url: "/images/week36/barmodel_w36_adv_p5.svg",
      equation: "24 - 8 = 16",
      answer: ["16 hours", "16 hrs", "16"],
      unit: "hours",
      explanation_en: "Total mission hours (24) minus transit hours (8) equals 16 research hours."
    }
  ]
};`;

const vocabCode = `export default {
  vocab: [
    { id: "v1", word: "submarine", definition_en: "a vessel built to operate deep underwater", definition_vi: "tàu ngầm", audio_word: "/audio/week36/vocab_submarine.mp3" },
    { id: "v2", word: "buoyancy", definition_en: "the upward force exerted by a fluid on an object", definition_vi: "lực đẩy nổi", audio_word: "/audio/week36/vocab_buoyancy.mp3" },
    { id: "v3", word: "cavern", definition_en: "a large underwater cave", definition_vi: "hang động ngầm", audio_word: "/audio/week36/vocab_cavern.mp3" },
    { id: "v4", word: "displace", definition_en: "to push water out of the way to create volume", definition_vi: "dịch chuyển nước", audio_word: "/audio/week36/vocab_displace.mp3" },
    { id: "v5", word: "artifact", definition_en: "an object made by humans in ancient times", definition_vi: "cổ vật lịch sử", audio_word: "/audio/week36/vocab_artifact.mp3" },
    { id: "v6", word: "compass", definition_en: "a navigation tool that points north", definition_vi: "la bàn hướng", audio_word: "/audio/week36/vocab_compass.mp3" },
    { id: "v7", word: "merchant", definition_en: "a person who trades goods internationally", definition_vi: "thương gia buôn bán", audio_word: "/audio/week36/vocab_merchant.mp3" },
    { id: "v8", word: "caravan", definition_en: "a group of travelers trading across deserts", definition_vi: "đoàn thương gia", audio_word: "/audio/week36/vocab_caravan.mp3" },
    { id: "v9", word: "submersible", definition_en: "a craft built to withstand deep sea pressure", definition_vi: "tàu lặn ngầm sâu", audio_word: "/audio/week36/vocab_trench.mp3" },
    { id: "v10", word: "trench", definition_en: "a deep valley on the ocean floor", definition_vi: "rãnh đại dương", audio_word: "/audio/week36/vocab_trench.mp3" },
    { id: "v11", word: "pressure", definition_en: "continuous force exerted on a surface", definition_vi: "áp suất vật lý", audio_word: "/audio/week36/vocab_pressure.mp3" },
    { id: "v12", word: "titanium", definition_en: "a strong lightweight metal resistant to pressure", definition_vi: "kim loại titan", audio_word: "/audio/week36/vocab_titanium.mp3" },
    { id: "v13", word: "diplomat", definition_en: "an official representing a country abroad", definition_vi: "nhà ngoại giao", audio_word: "/audio/week36/vocab_diplomat.mp3" },
    { id: "v14", word: "explorer", definition_en: "a person who travels to discover unknown lands", definition_vi: "nhà khám phá", audio_word: "/audio/week36/vocab_explorer.mp3" },
    { id: "v15", word: "expedition", definition_en: "an organized journey for exploration", definition_vi: "chuyến thám hiểm", audio_word: "/audio/week36/vocab_expedition.mp3" },
    { id: "v16", word: "discovery", definition_en: "the act of finding something new", definition_vi: "sự phát hiện mới", audio_word: "/audio/week36/vocab_discovery.mp3" },
    { id: "v17", word: "archaeology", definition_en: "the study of human history through artifacts", definition_vi: "khảo cổ học", audio_word: "/audio/week36/vocab_archaeology.mp3" },
    { id: "v18", word: "surface", definition_en: "the top layer of water or land", definition_vi: "bề mặt nước", audio_word: "/audio/week36/vocab_surface.mp3" },
    { id: "v19", word: "thruster", definition_en: "a small engine providing directional movement", definition_vi: "động cơ đẩy", audio_word: "/audio/week36/vocab_thruster.mp3" },
    { id: "v20", word: "manuscript", definition_en: "a handwritten historical document", definition_vi: "bản thảo cổ", audio_word: "/audio/week36/vocab_manuscript.mp3" }
  ]
};`;

const grammarCode = `export default {
  title: "Irregular Verbs in Past Simple",
  focus: "Past Simple forms of irregular action verbs (went, dove, swam, hid, found, came, wrote, gave, spoke, made)",
  exercises: [
    { id: 1, type: "fill_blank", question: "On Sunday afternoon, Leo ___ (go) into the ocean in a submarine.", answer: "went", hint: "Past tense of go" },
    { id: 2, type: "fill_blank", question: "The exploration team ___ (dive) 300 metres below the surface.", answer: "dove", hint: "Past tense of dive" },
    { id: 3, type: "fill_blank", question: "They ___ (find) a heavy ancient wooden chest in the cavern.", answer: "found", hint: "Past tense of find" },
    { id: 4, type: "fill_blank", question: "Marco Polo ___ (leave) Venice when he was seventeen years old.", answer: "left", hint: "Past tense of leave" },
    { id: 5, type: "fill_blank", question: "Marco Polo ___ (speak) several foreign languages during his travels.", answer: "spoke", hint: "Past tense of speak" },
    { id: 6, type: "fill_blank", question: "The team ___ (write) detailed notes in their research journal.", answer: "wrote", hint: "Past tense of write" },
    { id: 7, type: "fill_blank", question: "They ___ (give) the 16th-century gold compass to the museum.", answer: "gave", hint: "Past tense of give" },
    { id: 8, type: "fill_blank", question: "The ancient ship ___ (sink) hundreds of years ago.", answer: "sank", hint: "Past tense of sink" },
    { id: 9, type: "multiple_choice", question: "Which irregular past verb correctly completes: 'Tiny fish ___ between the rocks'?", options: ["swam", "swimmed", "swimming", "swams"], answer: "swam" },
    { id: 10, type: "multiple_choice", question: "Which verb is the past tense of 'hide'?", options: ["hid", "hided", "hidden", "hiding"], answer: "hid" },
    { id: 11, type: "multiple_choice", question: "Which verb completes: 'The gold coins ___ brightly under the spotlight'?", options: ["shone", "shined", "shining", "shines"], answer: "shone" },
    { id: 12, type: "multiple_choice", question: "Which past verb completes: 'Kublai Khan ___ Marco Polo an important job'?", options: ["gave", "gived", "given", "gives"], answer: "gave" },
    { id: 13, type: "unscramble", words: ["went", "Leo", "submarine", "a", "in", "underwater"], answer: "Leo went underwater in a submarine", hint: "Start with subject Leo" },
    { id: 14, type: "unscramble", words: ["found", "they", "compass", "a", "gold"], answer: "They found a gold compass", hint: "Start with They" },
    { id: 15, type: "unscramble", words: ["left", "Marco", "Polo", "Venice", "in", "1271"], answer: "Marco Polo left Venice in 1271", hint: "Start with Marco Polo" },
    { id: 16, type: "unscramble", words: ["spoke", "he", "languages", "many", "fluently"], answer: "He spoke many languages fluently", hint: "Start with He" },
    { id: 17, type: "sentence_correct", incorrect: "Leo and his team feeled very excited when they found the chest.", correct: "Leo and his team felt very excited when they found the chest.", explanation: "Past of feel is felt, not feeled." },
    { id: 18, type: "sentence_correct", incorrect: "Marco Polo writed a book about his Silk Road journey.", correct: "Marco Polo wrote a book about his Silk Road journey.", explanation: "Past of write is wrote, not writed." },
    { id: 19, type: "sentence_correct", incorrect: "The lift bags bringed the heavy chest to the surface.", correct: "The lift bags brought the heavy chest to the surface.", explanation: "Past of bring is brought." },
    { id: 20, type: "sentence_correct", incorrect: "They runned out of compressed air during the dive.", correct: "They ran out of compressed air during the dive.", explanation: "Past of run is ran." }
  ]
};`;

const writingCode = `export default {
  hints: {
    words: [
      { word: "submarine", meaning_vi: "tàu ngầm" },
      { word: "buoyancy", meaning_vi: "lực đẩy nổi" },
      { word: "displace", meaning_vi: "dịch chuyển nước" },
      { word: "cavern", meaning_vi: "hang động ngầm" },
      { word: "compass", meaning_vi: "la bàn" },
      { word: "merchant", meaning_vi: "thương gia" },
      { word: "diplomat", meaning_vi: "nhà ngoại giao" },
      { word: "airplane", meaning_vi: "máy bay", distractor: true },
      { word: "skyscraper", meaning_vi: "tòa nhà cao tầng", distractor: true }
    ]
  },
  story_prompts: {
    picture_mode: {
      type: "picture",
      image_url: "/images/week36/read_stem_w36.jpg",
      word_bank: ["submarine", "buoyancy", "displace", "chest", "compass"],
      sentence_frames: [
        "On Sunday afternoon, Leo dove into an underwater cavern in a ___.",
        "To float the 150 kg chest, he applied Archimedes ___ principle.",
        "He attached lift bags to ___ 150 litres of seawater."
      ],
      writing_prompts: {
        en: "Write a short paragraph about how Leo used buoyancy and physics to lift an ancient chest from the ocean floor.",
        vi: "Viết một đoạn văn ngắn về cách Leo sử dụng lực đẩy nổi và vật lý để nâng rương cổ lên từ đáy đại dương."
      }
    }
  }
};`;

const mindmapCode = `export default {
  centerStems: [
    "On Sunday afternoon, Leo dove into the ocean in a ___.",
    "The wooden chest rested inside a deep ocean ___.",
    "Leo applied Archimedes principle of ___.",
    "The lift bags displaced seawater to create upward ___.",
    "Inside the ancient chest, they discovered a gold ___.",
    "Marco Polo travelled along the famous ___."
  ],
  branchLabels: {
    "On Sunday afternoon, Leo dove into the ocean in a ___.": [
      { text: "submarine", text_vi: "tàu ngầm" },
      { text: "research vessel", text_vi: "tàu nghiên cứu" },
      { text: "deep submersible", text_vi: "tàu lặn ngầm sâu" },
      { text: "titanium craft", text_vi: "tàu vỏ titan" },
      { text: "exploration capsule", text_vi: "khoang thám hiểm" },
      { text: "diving vehicle", text_vi: "phương tiện lặn" }
    ],
    "The wooden chest rested inside a deep ocean ___.": [
      { text: "cavern", text_vi: "hang động ngầm" },
      { text: "underwater trench", text_vi: "rãnh ngầm" },
      { text: "rocky seabed", text_vi: "đáy biển đá" },
      { text: "shipwreck site", text_vi: "khu xác tàu đắm" },
      { text: "coral hollow", text_vi: "hốc san hô" },
      { text: "deep valley", text_vi: "thung lũng sâu" }
    ],
    "Leo applied Archimedes principle of ___.": [
      { text: "buoyancy", text_vi: "lực đẩy nổi" },
      { text: "fluid displacement", text_vi: "sự dịch chuyển chất lưu" },
      { text: "upward force", text_vi: "lực đẩy hướng lên" },
      { text: "water density", text_vi: "khối lượng riêng của nước" },
      { text: "neutral balance", text_vi: "cân bằng trung tính" },
      { text: "physics science", text_vi: "khoa học vật lý" }
    ],
    "The lift bags displaced seawater to create upward ___.": [
      { text: "lift", text_vi: "lực nâng" },
      { text: "buoyant force", text_vi: "lực đẩy nổi" },
      { text: "thrust", text_vi: "lực đẩy" },
      { text: "elevation", text_vi: "sự nâng cao" },
      { text: "support", text_vi: "sự hỗ trợ nổi" },
      { text: "momentum", text_vi: "động lực nổi" }
    ],
    "Inside the ancient chest, they discovered a gold ___.": [
      { text: "compass", text_vi: "la bàn" },
      { text: "artifact", text_vi: "cổ vật" },
      { text: "navigation tool", text_vi: "dụng cụ điều hướng" },
      { text: "16th-century relic", text_vi: "di vật thế kỷ 16" },
      { text: "historical treasure", text_vi: "báu vật lịch sử" },
      { text: "explorer coin", text_vi: "đồng xu nhà thám hiểm" }
    ],
    "Marco Polo travelled along the famous ___.": [
      { text: "Silk Road", text_vi: "Con đường Tơ lụa" },
      { text: "trade route", text_vi: "tuyến đường thương mại" },
      { text: "merchant path", text_vi: "con đường thương gia" },
      { text: "caravan trail", text_vi: "lối đi đoàn thương gia" },
      { text: "Asian highway", text_vi: "tuyến đường châu Á" },
      { text: "diplomatic passage", text_vi: "hành lang ngoại giao" }
    ]
  }
};`;

const socialQuizCode = `export default {
  title: "Marco Polo & Silk Road Geography",
  questions: [
    { id: 1, question_en: "Which modern city corresponds to Kublai Khan's capital Khanbaliq?", answer: "Beijing", options: ["Beijing", "Shanghai", "Tokyo", "Venice"], explanation: "Khanbaliq was the 13th-century Yuan dynasty capital, now Beijing." },
    { id: 2, question_en: "Which trade route connected Venice to Asian bazaars in 1271 AD?", answer: "The Silk Road", options: ["The Silk Road", "The Panama Canal", "The Trans-Siberian Railroad", "The Suez Canal"], explanation: "The Silk Road was the ancient overland network." },
    { id: 3, question_en: "How long was Marco Polo's total journey away from Venice?", answer: "Nearly 24 years", options: ["Nearly 24 years", "5 years", "10 months", "50 years"], explanation: "He left in 1271 AD at age 17 and returned in 1295 AD." },
    { id: 4, question_en: "What diplomatic role did Kublai Khan entrust to Marco Polo?", answer: "Official diplomat and messenger", options: ["Official diplomat and messenger", "Army general", "Ship captain", "Royal cook"], explanation: "Marco served as an envoy representing the Khan in foreign lands." },
    { id: 5, question_en: "What Chinese innovation did Marco Polo describe in his famous book?", answer: "Paper currency and silk weaving", options: ["Paper currency and silk weaving", "Steam engines", "Electric lights", "Submarines"], explanation: "Marco Polo documented paper money, silk, and coal fuel." }
  ]
};`;

const dictationCode = `export default {
  sentences: [
    { id: 1, text_en: "On a sunny Sunday afternoon, Leo dove into the ocean in a submarine.", text_vi: "Vào một buổi chiều Chủ Nhật nắng đẹp, Leo đã lặn xuống đại dương bằng tàu ngầm.", audio_url: "/audio/week36/dictation_1.mp3" },
    { id: 2, text_en: "They found a heavy ancient wooden chest weighing 150 kilograms.", text_vi: "Họ tìm thấy một rương gỗ cổ nặng 150kg.", audio_url: "/audio/week36/dictation_2.mp3" },
    { id: 3, text_en: "Leo applied Archimedes buoyancy principle to solve the problem.", text_vi: "Leo đã áp dụng nguyên lý lực đẩy Archimedes để giải quyết vấn đề.", audio_url: "/audio/week36/dictation_3.mp3" },
    { id: 4, text_en: "Marco Polo left Venice in 1271 to travel along the Silk Road.", text_vi: "Marco Polo rời Venice năm 1271 để du hành dọc Con đường Tơ lụa.", audio_url: "/audio/week36/dictation_4.mp3" },
    { id: 5, text_en: "He served as an official diplomat for emperor Kublai Khan.", text_vi: "Ông đã làm việc như một sứ giả ngoại giao cho hoàng đế Hốt Tất Liệt.", audio_url: "/audio/week36/dictation_5.mp3" },
    { id: 6, text_en: "Submersibles with titanium hulls withstand extreme water pressure.", text_vi: "Tàu lặn với vỏ titan chịu đựng áp suất nước cực hạn.", audio_url: "/audio/week36/dictation_6.mp3" }
  ]
};`;

const wordMatchCode = `export default {
  pairs: [
    { word: "submarine", definition_vi: "tàu ngầm" },
    { word: "buoyancy", definition_vi: "lực đẩy nổi" },
    { word: "compass", definition_vi: "la bàn" },
    { word: "merchant", definition_vi: "thương gia" },
    { word: "titanium", definition_vi: "kim loại titan" },
    { word: "submersible", definition_vi: "tàu lặn ngầm sâu" },
    { word: "pressure", definition_vi: "áp suất vật lý" },
    { word: "diplomat", definition_vi: "nhà ngoại giao" },
    { word: "manuscript", definition_vi: "bản thảo cổ" },
    { word: "artifact", definition_vi: "cổ vật lịch sử" }
  ]
};`;

const gamesCode = `export const week_36GamesAdvanced = {
  theme: "Adventure Stories & Ocean Physics",
  vocab: ["submarine", "buoyancy", "cavern", "displace", "compass", "merchant", "diplomat", "explorer"]
};
export default week_36GamesAdvanced;`;

// Write files
fs.writeFileSync(`${advDir}/read.js`, readCode);
fs.writeFileSync(`${advDir}/explore.js`, exploreCode);
fs.writeFileSync(`${advDir}/vocab.js`, vocabCode);
fs.writeFileSync(`${advDir}/grammar.js`, grammarCode);
fs.writeFileSync(`${advDir}/word_power.js`, wordPowerCode);
fs.writeFileSync(`${advDir}/dictation.js`, dictationCode);
fs.writeFileSync(`${advDir}/shadowing.js`, shadowingCode);
fs.writeFileSync(`${advDir}/singapore_math.js`, singaporeMathCode);
fs.writeFileSync(`${advDir}/writing.js`, writingCode);
fs.writeFileSync(`${advDir}/mindmap.js`, mindmapCode);
fs.writeFileSync(`${advDir}/daily_watch.js`, dailyWatchCode);
fs.writeFileSync(`${advDir}/ask_ai.js`, askAiCode);
fs.writeFileSync(`${advDir}/logic_science.js`, logicScienceCode);
fs.writeFileSync(`${advDir}/social_quiz.js`, socialQuizCode);
fs.writeFileSync(`${advDir}/word_match.js`, wordMatchCode);
fs.writeFileSync(`${advDir}/games.js`, gamesCode);

console.log("✅ Written all 16 station files with 8 Word Power & 4 Ask AI situations!");
