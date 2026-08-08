import fs from 'fs';
import path from 'path';

console.log("🚀 STARTING WEEK 37 COMPLETE PRODUCTION PIPELINE...");

const pubDir = './public/images/week37';
const advDir = './src/data/weeks/week_37';
const easyDir = './src/data/weeks_easy/week_37';

if (!fs.existsSync(pubDir)) fs.mkdirSync(pubDir, { recursive: true });
if (!fs.existsSync(advDir)) fs.mkdirSync(advDir, { recursive: true });
if (!fs.existsSync(easyDir)) fs.mkdirSync(easyDir, { recursive: true });

// ==========================================
// 1. GENERATE DEDICATED SVG BAR MODELS
// ==========================================

// ADV SVG P1: Comparison Model (Leo 12s vs Maya 10s)
const advSvgP1 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 240" width="100%" height="100%">
  <rect width="600" height="240" fill="#f8fafc" rx="12"/>
  <text x="300" y="30" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1e293b" text-anchor="middle">Comparison Bar Model: Relay Lap Speed</text>
  
  <!-- Leo Bar -->
  <text x="60" y="75" font-family="sans-serif" font-size="14" font-weight="bold" fill="#334155">Leo</text>
  <rect x="110" y="55" width="400" height="35" fill="#f59e0b" rx="6"/>
  <text x="310" y="78" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">12 seconds</text>

  <!-- Maya Bar -->
  <text x="60" y="135" font-family="sans-serif" font-size="14" font-weight="bold" fill="#334155">Maya</text>
  <rect x="110" y="115" width="333" height="35" fill="#10b981" rx="6"/>
  <text x="276" y="138" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">? seconds</text>

  <!-- Difference Bracket -->
  <path d="M 445 115 L 445 95 L 510 95 L 510 115" stroke="#ef4444" stroke-width="2" fill="none" stroke-dasharray="4,4"/>
  <text x="477" y="90" font-family="sans-serif" font-size="12" font-weight="bold" fill="#ef4444" text-anchor="middle">2s faster</text>

  <text x="300" y="200" font-family="sans-serif" font-size="14" font-weight="bold" fill="#475569" text-anchor="middle">Equation: 12 - 2 = ? seconds</text>
</svg>`;

// ADV SVG P2: Part-Whole Division (400m / 4 laps)
const advSvgP2 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 240" width="100%" height="100%">
  <rect width="600" height="240" fill="#f8fafc" rx="12"/>
  <text x="300" y="30" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1e293b" text-anchor="middle">Part-Whole Bar Model: Equal Lap Distances</text>
  
  <!-- Total Bracket Top -->
  <path d="M 60 65 L 60 55 L 540 55 L 540 65 M 300 55 L 300 45" stroke="#2563eb" stroke-width="3" fill="none"/>
  <text x="300" y="40" font-family="sans-serif" font-size="15" font-weight="bold" fill="#2563eb" text-anchor="middle">Total Distance = 400 metres</text>

  <!-- 4 Equal Blocks -->
  <rect x="60" y="70" width="118" height="60" fill="#3b82f6" rx="6" stroke="#1d4ed8" stroke-width="2"/>
  <text x="119" y="105" font-family="sans-serif" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle">Lap 1 (? m)</text>

  <rect x="180" y="70" width="118" height="60" fill="#3b82f6" rx="6" stroke="#1d4ed8" stroke-width="2"/>
  <text x="239" y="105" font-family="sans-serif" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle">Lap 2 (? m)</text>

  <rect x="300" y="70" width="118" height="60" fill="#3b82f6" rx="6" stroke="#1d4ed8" stroke-width="2"/>
  <text x="359" y="105" font-family="sans-serif" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle">Lap 3 (? m)</text>

  <rect x="420" y="70" width="120" height="60" fill="#3b82f6" rx="6" stroke="#1d4ed8" stroke-width="2"/>
  <text x="480" y="105" font-family="sans-serif" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle">Lap 4 (? m)</text>

  <text x="300" y="195" font-family="sans-serif" font-size="14" font-weight="bold" fill="#475569" text-anchor="middle">Equation: 400 ÷ 4 = ? metres</text>
</svg>`;

// ADV SVG P3: Comparison Addition (150 + 50 = 200)
const advSvgP3 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 240" width="100%" height="100%">
  <rect width="600" height="240" fill="#f8fafc" rx="12"/>
  <text x="300" y="30" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1e293b" text-anchor="middle">Comparison Bar Model: Olympic Athletes</text>
  
  <!-- Race A -->
  <text x="45" y="75" font-family="sans-serif" font-size="14" font-weight="bold" fill="#334155">Race A</text>
  <rect x="110" y="55" width="300" height="35" fill="#8b5cf6" rx="6"/>
  <text x="260" y="78" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">150 athletes</text>

  <!-- Race B -->
  <text x="45" y="135" font-family="sans-serif" font-size="14" font-weight="bold" fill="#334155">Race B</text>
  <rect x="110" y="115" width="300" height="35" fill="#3b82f6" rx="6"/>
  <rect x="412" y="115" width="100" height="35" fill="#ec4899" rx="6"/>
  <text x="260" y="138" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">150</text>
  <text x="462" y="138" font-family="sans-serif" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle">+ 50</text>

  <text x="300" y="195" font-family="sans-serif" font-size="14" font-weight="bold" fill="#475569" text-anchor="middle">Equation: 150 + 50 = ? athletes</text>
</svg>`;

// ADV SVG P4: Missing Part Subtraction (500 - 320 = 180)
const advSvgP4 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 240" width="100%" height="100%">
  <rect width="600" height="240" fill="#f8fafc" rx="12"/>
  <text x="300" y="30" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1e293b" text-anchor="middle">Part-Whole Bar Model: Stadium Seats</text>
  
  <!-- Total Bracket Top -->
  <path d="M 60 65 L 60 55 L 540 55 L 540 65 M 300 55 L 300 45" stroke="#2563eb" stroke-width="3" fill="none"/>
  <text x="300" y="40" font-family="sans-serif" font-size="15" font-weight="bold" fill="#2563eb" text-anchor="middle">Total Seats = 500</text>

  <!-- Part 1: Filled (320) -->
  <rect x="60" y="70" width="307" height="60" fill="#f59e0b" rx="6"/>
  <text x="213" y="105" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">Filled: 320 seats</text>

  <!-- Part 2: Empty (?) -->
  <rect x="370" y="70" width="170" height="60" fill="#10b981" rx="6" stroke="#059669" stroke-width="2" stroke-dasharray="6,4"/>
  <text x="455" y="105" font-family="sans-serif" font-size="15" font-weight="extrabold" fill="#ffffff" text-anchor="middle">Empty: ?</text>

  <text x="300" y="195" font-family="sans-serif" font-size="14" font-weight="bold" fill="#475569" text-anchor="middle">Equation: 500 - 320 = ? seats</text>
</svg>`;

// ADV SVG P5: Equal Groups Multiplication (6 x 4 = 24)
const advSvgP5 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 240" width="100%" height="100%">
  <rect width="600" height="240" fill="#f8fafc" rx="12"/>
  <text x="300" y="30" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1e293b" text-anchor="middle">Equal Groups Bar Model: Relay Teams</text>
  
  <!-- 6 Blocks -->
  <g fill="#06b6d4" rx="6" stroke="#0891b2" stroke-width="2">
    <rect x="60" y="70" width="75" height="60" rx="6"/>
    <rect x="140" y="70" width="75" height="60" rx="6"/>
    <rect x="220" y="70" width="75" height="60" rx="6"/>
    <rect x="300" y="70" width="75" height="60" rx="6"/>
    <rect x="380" y="70" width="75" height="60" rx="6"/>
    <rect x="465" y="70" width="75" height="60" rx="6"/>
  </g>
  <g font-family="sans-serif" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">
    <text x="97" y="105">4 runners</text>
    <text x="177" y="105">4 runners</text>
    <text x="257" y="105">4 runners</text>
    <text x="337" y="105">4 runners</text>
    <text x="417" y="105">4 runners</text>
    <text x="502" y="105">4 runners</text>
  </g>

  <!-- Total Bracket Bottom -->
  <path d="M 60 145 L 60 155 L 540 155 L 540 145 M 300 155 L 300 165" stroke="#0891b2" stroke-width="3" fill="none"/>
  <text x="300" y="180" font-family="sans-serif" font-size="15" font-weight="bold" fill="#0891b2" text-anchor="middle">Total = ? runners</text>
  <text x="300" y="210" font-family="sans-serif" font-size="14" font-weight="bold" fill="#475569" text-anchor="middle">Equation: 6 × 4 = ? runners</text>
</svg>`;

fs.writeFileSync(path.join(pubDir, 'barmodel_w37_adv_p1.svg'), advSvgP1);
fs.writeFileSync(path.join(pubDir, 'barmodel_w37_adv_p2.svg'), advSvgP2);
fs.writeFileSync(path.join(pubDir, 'barmodel_w37_adv_p3.svg'), advSvgP3);
fs.writeFileSync(path.join(pubDir, 'barmodel_w37_adv_p4.svg'), advSvgP4);
fs.writeFileSync(path.join(pubDir, 'barmodel_w37_adv_p5.svg'), advSvgP5);

// EASY SVG P1: Comparison Subtraction (10s vs 8s)
const easySvgP1 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 240" width="100%" height="100%">
  <rect width="600" height="240" fill="#f8fafc" rx="12"/>
  <text x="300" y="30" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1e293b" text-anchor="middle">Easy Bar Model: Comparing Run Times</text>
  
  <text x="60" y="75" font-family="sans-serif" font-size="14" font-weight="bold" fill="#334155">Leo</text>
  <rect x="110" y="55" width="400" height="35" fill="#f59e0b" rx="6"/>
  <text x="310" y="78" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">10 seconds</text>

  <text x="60" y="135" font-family="sans-serif" font-size="14" font-weight="bold" fill="#334155">Maya</text>
  <rect x="110" y="115" width="320" height="35" fill="#10b981" rx="6"/>
  <text x="270" y="138" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">8 seconds</text>

  <text x="300" y="200" font-family="sans-serif" font-size="14" font-weight="bold" fill="#475569" text-anchor="middle">Equation: 10 - 8 = ? seconds</text>
</svg>`;

// EASY SVG P2: Part-Whole Addition (5 + 4)
const easySvgP2 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 240" width="100%" height="100%">
  <rect width="600" height="240" fill="#f8fafc" rx="12"/>
  <text x="300" y="30" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1e293b" text-anchor="middle">Easy Bar Model: Total Batons Passed</text>
  
  <path d="M 60 65 L 60 55 L 540 55 L 540 65 M 300 55 L 300 45" stroke="#2563eb" stroke-width="3" fill="none"/>
  <text x="300" y="40" font-family="sans-serif" font-size="15" font-weight="bold" fill="#2563eb" text-anchor="middle">Total = ? batons</text>

  <rect x="60" y="70" width="260" height="60" fill="#3b82f6" rx="6"/>
  <text x="190" y="105" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">Monday: 5 batons</text>

  <rect x="325" y="70" width="215" height="60" fill="#8b5cf6" rx="6"/>
  <text x="432" y="105" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">Tuesday: 4 batons</text>

  <text x="300" y="195" font-family="sans-serif" font-size="14" font-weight="bold" fill="#475569" text-anchor="middle">Equation: 5 + 4 = ? batons</text>
</svg>`;

// EASY SVG P3: Equal Groups (4 x 3)
const easySvgP3 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 240" width="100%" height="100%">
  <rect width="600" height="240" fill="#f8fafc" rx="12"/>
  <text x="300" y="30" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1e293b" text-anchor="middle">Easy Bar Model: 4 Teams of 3</text>
  
  <g fill="#06b6d4" stroke="#0891b2" stroke-width="2">
    <rect x="60" y="70" width="110" height="60" rx="6"/>
    <rect x="180" y="70" width="110" height="60" rx="6"/>
    <rect x="300" y="70" width="110" height="60" rx="6"/>
    <rect x="420" y="70" width="120" height="60" rx="6"/>
  </g>
  <g font-family="sans-serif" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle">
    <text x="115" y="105">3 runners</text>
    <text x="235" y="105">3 runners</text>
    <text x="355" y="105">3 runners</text>
    <text x="480" y="105">3 runners</text>
  </g>

  <text x="300" y="195" font-family="sans-serif" font-size="14" font-weight="bold" fill="#475569" text-anchor="middle">Equation: 4 × 3 = ? runners</text>
</svg>`;

// EASY SVG P4: Missing Part (20 - 12)
const easySvgP4 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 240" width="100%" height="100%">
  <rect width="600" height="240" fill="#f8fafc" rx="12"/>
  <text x="300" y="30" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1e293b" text-anchor="middle">Easy Bar Model: Free Seats</text>
  
  <path d="M 60 65 L 60 55 L 540 55 L 540 65 M 300 55 L 300 45" stroke="#2563eb" stroke-width="3" fill="none"/>
  <text x="300" y="40" font-family="sans-serif" font-size="15" font-weight="bold" fill="#2563eb" text-anchor="middle">Total Seats = 20</text>

  <rect x="60" y="70" width="280" height="60" fill="#f59e0b" rx="6"/>
  <text x="200" y="105" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">Taken: 12</text>

  <rect x="345" y="70" width="195" height="60" fill="#10b981" rx="6" stroke="#059669" stroke-width="2" stroke-dasharray="6,4"/>
  <text x="442" y="105" font-family="sans-serif" font-size="15" font-weight="extrabold" fill="#ffffff" text-anchor="middle">Free: ?</text>

  <text x="300" y="195" font-family="sans-serif" font-size="14" font-weight="bold" fill="#475569" text-anchor="middle">Equation: 20 - 12 = ? seats</text>
</svg>`;

// EASY SVG P5: Addition Comparison (6 + 4)
const easySvgP5 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 240" width="100%" height="100%">
  <rect width="600" height="240" fill="#f8fafc" rx="12"/>
  <text x="300" y="30" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1e293b" text-anchor="middle">Easy Bar Model: Gold Medals</text>
  
  <text x="45" y="75" font-family="sans-serif" font-size="14" font-weight="bold" fill="#334155">Kenya</text>
  <rect x="110" y="55" width="300" height="35" fill="#f59e0b" rx="6"/>
  <text x="260" y="78" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">6 medals</text>

  <text x="45" y="135" font-family="sans-serif" font-size="14" font-weight="bold" fill="#334155">Greece</text>
  <rect x="110" y="115" width="200" height="35" fill="#8b5cf6" rx="6"/>
  <text x="210" y="138" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">4 medals</text>

  <text x="300" y="195" font-family="sans-serif" font-size="14" font-weight="bold" fill="#475569" text-anchor="middle">Equation: 6 + 4 = ? medals</text>
</svg>`;

fs.writeFileSync(path.join(pubDir, 'barmodel_w37_easy_p1.svg'), easySvgP1);
fs.writeFileSync(path.join(pubDir, 'barmodel_w37_easy_p2.svg'), easySvgP2);
fs.writeFileSync(path.join(pubDir, 'barmodel_w37_easy_p3.svg'), easySvgP3);
fs.writeFileSync(path.join(pubDir, 'barmodel_w37_easy_p4.svg'), easySvgP4);
fs.writeFileSync(path.join(pubDir, 'barmodel_w37_easy_p5.svg'), easySvgP5);

console.log("✅ Generated 10 unique SVG Bar Models in public/images/week37/");

// ==========================================
// 2. BUILD ADVANCED STATIONS (src/data/weeks/week_37/)
// ==========================================

// ADV MINDMAP: 6 Stems with '___' + 6 Branches per Stem (36 branches total)
const advMindmap = `export default {
  "centerStems": [
    {
      "id": "stem_1",
      "text": "Yesterday, Leo ___ the baton cleanly to Maya.",
      "type": "affirmative",
      "audio": null
    },
    {
      "id": "stem_2",
      "text": "In ancient Greece, leaders ___ a sacred truce during games.",
      "type": "affirmative",
      "audio": null
    },
    {
      "id": "stem_3",
      "text": "Athletes from 200 nations ___ across the stadium.",
      "type": "affirmative",
      "audio": null
    },
    {
      "id": "stem_4",
      "text": "Kenyan runners ___ on red dirt mountain paths.",
      "type": "affirmative",
      "audio": null
    },
    {
      "id": "stem_5",
      "text": "Sportsmanship means runners ___ hands politely with opponents.",
      "type": "affirmative",
      "audio": null
    },
    {
      "id": "stem_6",
      "text": "Scientific teamwork ___ victory to the relay team.",
      "type": "affirmative",
      "audio": null
    }
  ],
  "branchLabels": {
    "Yesterday, Leo ___ the baton cleanly to Maya.": [
      { "text": "passed", "text_vi": "đã truyền" },
      { "text": "handed", "text_vi": "đã giao" },
      { "text": "transferred", "text_vi": "đã chuyển" },
      { "text": "carried", "text_vi": "đã mang" },
      { "text": "delivered", "text_vi": "đã trao" },
      { "text": "gave", "text_vi": "đã đưa" }
    ],
    "In ancient Greece, leaders ___ a sacred truce during games.": [
      { "text": "declared", "text_vi": "đã tuyên bố" },
      { "text": "signed", "text_vi": "đã ký kết" },
      { "text": "announced", "text_vi": "đã thông báo" },
      { "text": "honored", "text_vi": "đã tôn vinh" },
      { "text": "accepted", "text_vi": "đã chấp nhận" },
      { "text": "created", "text_vi": "đã tạo ra" }
    ],
    "Athletes from 200 nations ___ across the stadium.": [
      { "text": "marched", "text_vi": "đã diễu hành" },
      { "text": "paraded", "text_vi": "đã diễu hành" },
      { "text": "walked", "text_vi": "đã đi bộ" },
      { "text": "gathered", "text_vi": "đã tập hợp" },
      { "text": "assembled", "text_vi": "đã tụ họp" },
      { "text": "entered", "text_vi": "đã tiến vào" }
    ],
    "Kenyan runners ___ on red dirt mountain paths.": [
      { "text": "trained", "text_vi": "đã tập luyện" },
      { "text": "ran", "text_vi": "đã chạy" },
      { "text": "sprinted", "text_vi": "đã bứt tốc" },
      { "text": "practiced", "text_vi": "đã rèn luyện" },
      { "text": "prepared", "text_vi": "đã chuẩn bị" },
      { "text": "exercised", "text_vi": "đã tập thể dục" }
    ],
    "Sportsmanship means runners ___ hands politely with opponents.": [
      { "text": "shake", "text_vi": "bắt" },
      { "text": "clasp", "text_vi": "nắm" },
      { "text": "join", "text_vi": "nối" },
      { "text": "hold", "text_vi": "giữ" },
      { "text": "touch", "text_vi": "chạm" },
      { "text": "reach", "text_vi": "với" }
    ],
    "Scientific teamwork ___ victory to the relay team.": [
      { "text": "brought", "text_vi": "đã mang lại" },
      { "text": "earned", "text_vi": "đã giành được" },
      { "text": "created", "text_vi": "đã tạo nên" },
      { "text": "secured", "text_vi": "đã đảm bảo" },
      { "text": "achieved", "text_vi": "đã đạt được" },
      { "text": "won", "text_vi": "đã chiến thắng" }
    ]
  }
};
`;

// ADV GRAMMAR: EXACTLY 20 EXERCISES
const advGrammar = `export default {
  title: 'Past Simple & Speed Science — Grammar Station',
  theme: 'sports_day',
  rule: {
    en: 'Past Simple indicates completed actions. Form: regular (verb+-ed) or irregular (go→went, run→ran, pass→passed, declare→declared, bring→brought). Example: Leo ran very fast and passed the baton cleanly.',
    vi: 'Thì quá khứ đơn diễn tả hành động đã hoàn thành. Động từ có quy tắc thêm -ed, bất quy tắc thay đổi dạng (go→went, run→ran, pass→passed, declare→declared, bring→brought).'
  },
  exercises: [
    { id: 1, type: 'fill_blank', question_en: 'Leo ___ (run) very fast along the red track.', answer: 'ran', hint: 'run → ran' },
    { id: 2, type: 'fill_blank', question_en: 'He ___ (pass) the baton cleanly to Maya.', answer: 'passed', hint: 'pass → passed' },
    { id: 3, type: 'fill_blank', question_en: 'Maya ___ (sprint) early in the exchange zone.', answer: 'sprinted', hint: 'sprint → sprinted' },
    { id: 4, type: 'fill_blank', question_en: 'They ___ (calculate) velocity using distance over time.', answer: 'calculated', hint: 'calculate → calculated' },
    { id: 5, type: 'fill_blank', question_en: 'Ancient Greek leaders ___ (declare) a sacred truce.', answer: 'declared', hint: 'declare → declared' },
    { id: 6, type: 'fill_blank', question_en: 'Athletes ___ (travel) safely across warring lands.', answer: 'traveled', hint: 'travel → traveled' },
    { id: 7, type: 'fill_blank', question_en: 'Over 200 nations ___ (march) across the stadium.', answer: 'marched', hint: 'march → marched' },
    { id: 8, type: 'fill_blank', question_en: 'Kenyan runners ___ (train) high in the mountains.', answer: 'trained', hint: 'train → trained' },
    { id: 9, type: 'fill_blank', question_en: 'Their bodies ___ (produce) extra red blood cells.', answer: 'produced', hint: 'produce → produced' },
    { id: 10, type: 'fill_blank', question_en: 'Teamwork ___ (bring) victory to the relay squad.', answer: 'brought', hint: 'bring → brought' },
    { id: 11, type: 'multiple_choice', question_en: 'Choose correct past tense: Leo ___ his lap in 12 seconds.', options: ['ran', 'runned', 'running'], answer: 'ran' },
    { id: 12, type: 'multiple_choice', question_en: 'Choose correct past tense: Maya ___ the baton smoothly.', options: ['catched', 'caught', 'catch'], answer: 'caught' },
    { id: 13, type: 'multiple_choice', question_en: 'Choose correct past tense: Leaders ___ a truce for peace.', options: ['declared', 'declaring', 'declares'], answer: 'declared' },
    { id: 14, type: 'multiple_choice', question_en: 'Choose correct past tense: The spectators ___ loudly.', options: ['clapped', 'clap', 'clapping'], answer: 'clapped' },
    { id: 15, type: 'multiple_choice', question_en: 'Choose correct past tense: Everyone ___ tired but happy.', options: ['was', 'were', 'is'], answer: 'was' },
    { id: 16, type: 'unscramble', question_en: 'Unscramble the sentence:', words: ['Leo', 'passed', 'the', 'baton'], answer: 'Leo passed the baton' },
    { id: 17, type: 'unscramble', question_en: 'Unscramble the sentence:', words: ['They', 'calculated', 'their', 'running', 'velocity'], answer: 'They calculated their running velocity' },
    { id: 18, type: 'unscramble', question_en: 'Unscramble the sentence:', words: ['Greek', 'leaders', 'declared', 'a', 'truce'], answer: 'Greek leaders declared a truce' },
    { id: 19, type: 'sentence_correct', question_en: 'Correct the sentence: Everyone were happy at the finish line.', answer: 'Everyone was happy at the finish line', hint: 'Everyone đi với WAS' },
    { id: 20, type: 'sentence_correct', question_en: 'Correct the sentence: He runned fast on the track.', answer: 'He ran fast on the track', hint: 'run → ran' }
  ]
};
`;

// ADV SINGAPORE MATH: 5 Word Problems referencing ADV SVG images
const advSgMath = `export default {
  title: "Sports Day Singapore Math Problems",
  theme: "sports_day_math",
  problems: [
    {
      id: 1,
      type: "comparison",
      question_en: "Leo ran his relay lap in 12 seconds. Maya ran her lap 2 seconds faster than Leo. How long did Maya take?",
      bar_model: "/images/week37/barmodel_w37_adv_p1.svg",
      answer: ["10"],
      hint_en: "Subtract 2 seconds from 12 seconds.",
      hint_vi: "Trừ 2 giây khỏi 12 giây."
    },
    {
      id: 2,
      type: "part_whole",
      question_en: "A relay team ran a total distance of 400 metres across 4 equal laps. How long is each lap?",
      bar_model: "/images/week37/barmodel_w37_adv_p2.svg",
      answer: ["100"],
      hint_en: "Divide total distance 400m by 4 laps.",
      hint_vi: "Chia tổng 400m cho 4 vòng."
    },
    {
      id: 3,
      type: "comparison",
      question_en: "In ancient Greece, 150 athletes competed in Race A. Race B had 50 more athletes than Race A. How many athletes competed in Race B?",
      bar_model: "/images/week37/barmodel_w37_adv_p3.svg",
      answer: ["200"],
      hint_en: "Add 50 to 150 athletes.",
      hint_vi: "Cộng 50 vào 150 vận động viên."
    },
    {
      id: 4,
      type: "missing_part",
      question_en: "The stadium has 500 total seats. 320 seats are filled with spectators. How many empty seats remain?",
      bar_model: "/images/week37/barmodel_w37_adv_p4.svg",
      answer: ["180"],
      hint_en: "Subtract 320 from 500 total seats.",
      hint_vi: "Trừ 320 khỏi tổng 500 ghế."
    },
    {
      id: 5,
      type: "groups",
      question_en: "There are 6 relay teams in the final race. Each team has 4 runners. How many runners are in the final race altogether?",
      bar_model: "/images/week37/barmodel_w37_adv_p5.svg",
      answer: ["24"],
      hint_en: "Multiply 6 teams by 4 runners.",
      hint_vi: "Nhân 6 đội với 4 người chạy."
    }
  ]
};
`;

// Write ADV Mindmap, Grammar, Math
fs.writeFileSync(path.join(advDir, 'mindmap.js'), advMindmap);
fs.writeFileSync(path.join(advDir, 'grammar.js'), advGrammar);
fs.writeFileSync(path.join(advDir, 'singapore_math.js'), advSgMath);

// ==========================================
// 3. BUILD EASY STATIONS (src/data/weeks_easy/week_37/)
// ==========================================

// EASY MINDMAP: 6 Stems with '___' + 6 Branches per Stem (36 branches total, A1 level)
const easyMindmap = `export default {
  "centerStems": [
    {
      "id": "stem_1",
      "text": "Leo ___ fast along the red track.",
      "type": "affirmative",
      "audio": null
    },
    {
      "id": "stem_2",
      "text": "The runners ___ the gold medal together.",
      "type": "affirmative",
      "audio": null
    },
    {
      "id": "stem_3",
      "text": "The children ___ happily for their friends.",
      "type": "affirmative",
      "audio": null
    },
    {
      "id": "stem_4",
      "text": "Maya ___ the stick to Leo cleanly.",
      "type": "affirmative",
      "audio": null
    },
    {
      "id": "stem_5",
      "text": "They ___ water after the long race.",
      "type": "affirmative",
      "audio": null
    },
    {
      "id": "stem_6",
      "text": "We ___ our team at sports day.",
      "type": "affirmative",
      "audio": null
    }
  ],
  "branchLabels": {
    "Leo ___ fast along the red track.": [
      { "text": "ran", "text_vi": "đã chạy" },
      { "text": "walked", "text_vi": "đã đi bộ" },
      { "text": "sprinted", "text_vi": "đã bứt tốc" },
      { "text": "moved", "text_vi": "đã di chuyển" },
      { "text": "jumped", "text_vi": "đã nhảy" },
      { "text": "dashed", "text_vi": "đã lao nhanh" }
    ],
    "The runners ___ the gold medal together.": [
      { "text": "won", "text_vi": "đã chiến thắng" },
      { "text": "took", "text_vi": "đã nhận" },
      { "text": "held", "text_vi": "đã cầm" },
      { "text": "got", "text_vi": "đã có" },
      { "text": "loved", "text_vi": "đã yêu thích" },
      { "text": "showed", "text_vi": "đã khoe" }
    ],
    "The children ___ happily for their friends.": [
      { "text": "cheered", "text_vi": "đã cổ vũ" },
      { "text": "clapped", "text_vi": "đã vỗ tay" },
      { "text": "smiled", "text_vi": "đã mỉm cười" },
      { "text": "shouted", "text_vi": "đã reo hò" },
      { "text": "waved", "text_vi": "đã vẫy tay" },
      { "text": "sang", "text_vi": "đã hát" }
    ],
    "Maya ___ the stick to Leo cleanly.": [
      { "text": "passed", "text_vi": "đã truyền" },
      { "text": "gave", "text_vi": "đã đưa" },
      { "text": "handed", "text_vi": "đã trao" },
      { "text": "tossed", "text_vi": "đã quăng" },
      { "text": "moved", "text_vi": "đã chuyển" },
      { "text": "brought", "text_vi": "đã mang" }
    ],
    "They ___ water after the long race.": [
      { "text": "drank", "text_vi": "đã uống" },
      { "text": "took", "text_vi": "đã lấy" },
      { "text": "shared", "text_vi": "đã chia sẻ" },
      { "text": "poured", "text_vi": "đã rót" },
      { "text": "enjoyed", "text_vi": "đã thưởng thức" },
      { "text": "had", "text_vi": "đã có" }
    ],
    "We ___ our team at sports day.": [
      { "text": "helped", "text_vi": "đã giúp đỡ" },
      { "text": "loved", "text_vi": "đã yêu mến" },
      { "text": "joined", "text_vi": "đã gia nhập" },
      { "text": "supported", "text_vi": "đã ủng hộ" },
      { "text": "guided", "text_vi": "đã hướng dẫn" },
      { "text": "thanked", "text_vi": "đã cảm ơn" }
    ]
  }
};
`;

// EASY GRAMMAR: EXACTLY 20 EXERCISES (A1 Level)
const easyGrammar = `export default {
  title: 'Sports Day Fun — Easy Grammar Station',
  theme: 'sports_day_easy',
  rule: {
    en: 'Past Simple shows what happened earlier. Examples: run→ran, pass→passed, win→won, play→played, clap→clapped.',
    vi: 'Thì quá khứ đơn chỉ hành động xảy ra trước đó. Ví dụ: run→ran, pass→passed, win→won, play→played, clap→clapped.'
  },
  exercises: [
    { id: 1, type: 'fill_blank', question_en: 'Leo ___ (run) fast in the race.', answer: 'ran', hint: 'run → ran' },
    { id: 2, type: 'fill_blank', question_en: 'Maya ___ (pass) the stick to Leo.', answer: 'passed', hint: 'pass → passed' },
    { id: 3, type: 'fill_blank', question_en: 'The team ___ (win) a gold medal.', answer: 'won', hint: 'win → won' },
    { id: 4, type: 'fill_blank', question_en: 'We ___ (clap) happily for our team.', answer: 'clapped', hint: 'clap → clapped' },
    { id: 5, type: 'fill_blank', question_en: 'They ___ (play) sports on Saturday.', answer: 'played', hint: 'play → played' },
    { id: 6, type: 'fill_blank', question_en: 'Leo ___ (go) to the sports field.', answer: 'went', hint: 'go → went' },
    { id: 7, type: 'fill_blank', question_en: 'She ___ (see) her best friend.', answer: 'saw', hint: 'see → saw' },
    { id: 8, type: 'fill_blank', question_en: 'They ___ (drink) water after running.', answer: 'drank', hint: 'drink → drank' },
    { id: 9, type: 'fill_blank', question_en: 'We ___ (help) our teammate.', answer: 'helped', hint: 'help → helped' },
    { id: 10, type: 'fill_blank', question_en: 'The coach ___ (smile) with pride.', answer: 'smiled', hint: 'smile → smiled' },
    { id: 11, type: 'multiple_choice', question_en: 'Choose correct past tense: Leo ___ fast. (run)', options: ['ran', 'runned', 'running'], answer: 'ran' },
    { id: 12, type: 'multiple_choice', question_en: 'Choose correct past tense: They ___ the game! (win)', options: ['won', 'wined', 'winning'], answer: 'won' },
    { id: 13, type: 'multiple_choice', question_en: 'Choose correct past tense: She ___ the stick. (pass)', options: ['passed', 'passing', 'passes'], answer: 'passed' },
    { id: 14, type: 'multiple_choice', question_en: 'Choose correct past tense: We ___ on Saturday. (play)', options: ['played', 'play', 'playing'], answer: 'played' },
    { id: 15, type: 'multiple_choice', question_en: 'Choose correct past tense: Everyone ___ happy. (was)', options: ['was', 'were', 'be'], answer: 'was' },
    { id: 16, type: 'unscramble', question_en: 'Unscramble:', words: ['Leo', 'ran', 'very', 'fast'], answer: 'Leo ran very fast' },
    { id: 17, type: 'unscramble', question_en: 'Unscramble:', words: ['They', 'won', 'a', 'gold', 'medal'], answer: 'They won a gold medal' },
    { id: 18, type: 'unscramble', question_en: 'Unscramble:', words: ['We', 'clapped', 'for', 'our', 'team'], answer: 'We clapped for our team' },
    { id: 19, type: 'sentence_correct', question_en: 'Correct the word: Leo runned fast.', answer: 'Leo ran fast', hint: 'run → ran' },
    { id: 20, type: 'sentence_correct', question_en: 'Correct the word: They wined the race.', answer: 'They won the race', hint: 'win → won' }
  ]
};
`;

// EASY SINGAPORE MATH: 5 Simplified Word Problems (A1 Level) referencing EASY SVG images
const easySgMath = `export default {
  title: "Sports Day Easy Math Problems",
  theme: "sports_day_easy_math",
  problems: [
    {
      id: 1,
      type: "comparison",
      question_en: "Leo ran for 10 seconds. Maya ran for 8 seconds. How many seconds faster was Maya?",
      bar_model: "/images/week37/barmodel_w37_easy_p1.svg",
      answer: ["2"],
      hint_en: "Subtract 8 seconds from 10 seconds.",
      hint_vi: "Trừ 8 giây khỏi 10 giây."
    },
    {
      id: 2,
      type: "part_whole",
      question_en: "Leo passed 5 batons on Monday and 4 batons on Tuesday. How many batons did he pass in total?",
      bar_model: "/images/week37/barmodel_w37_easy_p2.svg",
      answer: ["9"],
      hint_en: "Add 5 and 4 batons.",
      hint_vi: "Cộng 5 và 4 chiếc gậy."
    },
    {
      id: 3,
      type: "groups",
      question_en: "There are 4 relay teams. Each team has 3 runners. How many runners are there in total?",
      bar_model: "/images/week37/barmodel_w37_easy_p3.svg",
      answer: ["12"],
      hint_en: "Multiply 4 teams by 3 runners.",
      hint_vi: "Nhân 4 đội với 3 người."
    },
    {
      id: 4,
      type: "missing_part",
      question_en: "There are 20 total seats in the stadium row. 12 seats are taken. How many seats are free?",
      bar_model: "/images/week37/barmodel_w37_easy_p4.svg",
      answer: ["8"],
      hint_en: "Subtract 12 from 20 seats.",
      hint_vi: "Trừ 12 khỏi 20 ghế."
    },
    {
      id: 5,
      type: "comparison",
      question_en: "Kenya won 6 gold medals. Greece won 4 gold medals. How many gold medals did they win altogether?",
      bar_model: "/images/week37/barmodel_w37_easy_p5.svg",
      answer: ["10"],
      hint_en: "Add 6 and 4 medals.",
      hint_vi: "Cộng 6 và 4 huy chương."
    }
  ]
};
`;

// Write EASY Mindmap, Grammar, Math
fs.writeFileSync(path.join(easyDir, 'mindmap.js'), easyMindmap);
fs.writeFileSync(path.join(easyDir, 'grammar.js'), easyGrammar);
fs.writeFileSync(path.join(easyDir, 'singapore_math.js'), easySgMath);

console.log("🎉 Complete production script executed! All 10 SVG Bar Models and station files updated successfully!");
