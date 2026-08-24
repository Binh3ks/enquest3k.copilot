import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const W35_DIR = path.join(__dirname, '../src/data/weeks/week_35');

// 1. Fix logic_science.js: replace 'thermal' with 'safety'
const logicScienceCode = `// Week 35 Action Lab: Campfire Thermodynamics & Extinguishment
export default {
  title: "Action Lab: The Science of Campfires & Fire Safety",
  steps: [
    {
      id: 1,
      title: "Step 1: Fire Triangle Components",
      instruction: "Select the three things needed for a healthy campfire.",
      options: ["Heat, Fuel (dry wood), Oxygen (air)", "Water, Stones, Glass", "Cold ice, Plastic, Metal"],
      answer: "Heat, Fuel (dry wood), Oxygen (air)",
      explanation: "Fire needs heat to ignite, fuel to burn, and oxygen to stay alive."
    },
    {
      id: 2,
      title: "Step 2: Safe Fire Containment",
      instruction: "Why do campers arrange stones in a circle around the fire?",
      options: ["To block wind and prevent burning embers from spreading", "To cook food faster", "To make the fire colorful"],
      answer: "To block wind and prevent burning embers from spreading",
      explanation: "A stone ring acts as a safe protective wall to keep burning embers inside."
    },
    {
      id: 3,
      title: "Step 3: Complete Extinguishment",
      instruction: "What is the proper scientific way to put out a campfire completely?",
      options: ["Drown with water, stir coals with a stick, feel until cold", "Blow on it with mouth", "Cover with dry leaves"],
      answer: "Drown with water, stir coals with a stick, feel until cold",
      explanation: "Water rapidly cools heat below burning levels, eliminating all hidden embers."
    }
  ]
};
`;
fs.writeFileSync(path.join(W35_DIR, 'logic_science.js'), logicScienceCode);

// 2. Fix CLIL in explore.js & reading_hub.js (expanding from 85w to 135w)
const clilArticleContent = "Camping in nature is an exciting outdoor adventure for the whole family. When setting up your camp, always choose a flat and dry area away from tall dry bushes. Keep your campfire inside a circle of smooth stones to prevent flying sparks from spreading to trees. While cooking delicious food over the fire, always stay at a safe distance and never leave the flames alone. At night, look up at the clear starry sky to discover famous constellations. Stars create wonderful shapes that help night explorers find north easily. When you are ready to leave, always pour clean water over the campfire until the wood is completely cold and wet. Protecting the forest keeps wild nature safe for everyone!";
const clilArticleContentVi = "Cắm trại trong tự nhiên là một chuyến phiêu lưu ngoài trời thú vị cho cả gia đình. Khi dựng trại, hãy luôn chọn vùng đất phẳng và khô ráo, tránh xa các bụi cây khô. Giữ lửa trại bên trong một vòng đá nhẵn để ngăn các tia lửa bay lan sang cây cối. Trong khi nấu những món ăn ngon trên lửa, hãy luôn giữ khoảng cách an toàn và không bao giờ để ngọn lửa cháy mà không có người trông. Vào ban đêm, hãy ngước nhìn bầu trời sao để khám phá các chòm sao nổi tiếng. Các ngôi sao tạo nên những hình dạng tuyệt đẹp giúp các nhà thám hiểm định hướng phương bắc dễ dàng. Khi chuẩn bị rời đi, hãy luôn dập tắt lửa bằng nước sạch cho đến khi củi nguội hẳn và ướt đẫm. Bảo vệ khu rừng giúp giữ an toàn cho thiên nhiên hoang dã!";

const exploreCode = `// Week 35 Explore / CLIL — Camping Safety & Star Constellations
export const exploreData = {
  theme: "Camping Safety & Stargazing",
  title_en: "Camping Safety & Stargazing in Nature",
  title_vi: "An Toàn Cắm Trại & Ngắm Sao Trong Tự Nhiên",
  content_en: "${clilArticleContent}",
  content_vi: "${clilArticleContentVi}",
  audio_url: "/audio/week35/explore.mp3",
  check_questions: [
    { id: 1, question_en: "Where should you place a campfire to keep it safe?", options: ["Inside a circle of stones away from dry grass", "Under dry tree leaves", "Inside the sleeping tent"], answer: "Inside a circle of stones away from dry grass" },
    { id: 2, question_en: "How do star constellations help explorers at night?", options: ["They create shapes that help find north", "They make loud whistling sounds", "They change into shooting stars"], answer: "They create shapes that help find north" },
    { id: 3, question_en: "What must you do before leaving the campsite?", options: ["Pour water on the campfire until it is cold", "Leave the campfire burning brightly", "Hide the tent in the bushes"], answer: "Pour water on the campfire until it is cold" }
  ],
  critical_thinking: {
    question_en: "Why is it important to extinguish campfires completely before leaving?",
    hint_en: "Think about forest fire safety: hot coals can relight with wind and harm trees and wildlife."
  }
};

export default exploreData;
`;
fs.writeFileSync(path.join(W35_DIR, 'explore.js'), exploreCode);

// 3. Fix reading_hub.js
const readingHubPath = path.join(W35_DIR, 'reading_hub.js');
let rhContent = fs.readFileSync(readingHubPath, 'utf8');
rhContent = rhContent.replace(/content_en:\s*"[^"]+"/, `content_en: "${clilArticleContent}"`);
rhContent = rhContent.replace(/content_vi:\s*"[^"]+"/, `content_vi: "${clilArticleContentVi}"`);
fs.writeFileSync(readingHubPath, rhContent);

// 4. Fix listening_hub.js passage_audio_script
const listeningHubPath = path.join(W35_DIR, 'listening_hub.js');
const listeningHubCode = `/**
 * Week 35 Gold Standard Data — Listening Hub
 * Theme: "The Best Day Ever: Mountain Camping"
 * Cambridge A2 Flyers Full Exam Standard Audio & Scripts
 */

import dictation from './dictation.js';
import shadowing from './shadowing.js';
import singaporeMath from './singapore_math.js';
import logicScience from './logic_science.js';

export const listeningHubData = {
  week: 35,
  theme: "The Best Day Ever: Mountain Camping",
  dictation,
  shadowing,
  singapore_math: singaporeMath,
  science_lab: logicScience,

  // Cambridge Listening Part 2 (Secret Notes / Notepad Note Completer)
  listening_p2_notes: [
    { id: 1, label: "Trip Destination", hint: "Where did they go?", target: "Pine Valley", audio_text: "The family went camping at Pine Valley Mountain." },
    { id: 2, label: "Tent Color", hint: "What color was the tent?", target: "blue", audio_text: "Dad and the boys set up a large blue tent on the grass." },
    { id: 3, label: "Afternoon Activity", hint: "What did they do near stream?", target: "hiking", audio_text: "In the afternoon, they went hiking along the forest stream." },
    { id: 4, label: "Evening Treat", hint: "What did they roast?", target: "marshmallows", audio_text: "They sat around the fire and roasted sweet marshmallows." },
    { id: 5, label: "Night View", hint: "What was shining above?", target: "starry sky", audio_text: "Everyone looked up at the clear starry sky before bed." }
  ],

  // Cambridge Listening Part 1 (SVG Line Matcher — Campsite Scene)
  listening_p1: {
    image_url: '/images/week35/w35_listening_p1_scene.jpg',
    audio_url: '/audio/week35/listening_p1_full.mp3',
    passage_audio_script: \`Nova: Look at Part 1. Now look at the picture. Listen and look. There is one example.
Girl: Look at our family campsite in Pine Valley! It was such a wonderful day.
Man: Oh yes! I can see a boy pitching the blue tent with his father. Is that Oliver?
Girl: Yes, that is Oliver. He is holding the tent pole carefully.
Man: That is very helpful of him.
Nova: Can you see the line? This is an example. Now you listen and draw lines.
Girl: Can you see the girl holding a wooden stick with a marshmallow?
Man: Ah yes! She is wearing a green sweater and smiling by the fire.
Girl: That's Lily! She loves roasting marshmallows over the warm campfire.
Man: Look near the forest stream! There is a boy carrying a red backpack.
Girl: That is Harry. He just finished hiking along the mountain trail.
Man: Who is that man sitting on the wooden log playing a guitar?
Girl: That is Uncle Robert. He was singing cheerful campfire songs for us.
Man: Look near the tall pine tree. Is that a woman taking photographs?
Girl: Yes, that is Aunt Sarah. She was photographing the golden sunset over the lake.
Man: Now look at the boy shining a flashlight into the tent.
Girl: That is Jack. He is looking for his cozy sleeping bag before bedtime.\`,
    names: [
      { id: 'n1', text: 'Oliver', target_id: 't1', isExample: true },
      { id: 'n2', text: 'Lily', target_id: 't2' },
      { id: 'n3', text: 'Harry', target_id: 't3' },
      { id: 'n4', text: 'Uncle Robert', target_id: 't4' },
      { id: 'n5', text: 'Aunt Sarah', target_id: 't5' },
      { id: 'n6', text: 'Jack', target_id: 't6' }
    ],
    targets: [
      { id: 't1', label: 'Oliver (Boy holding blue tent pole on left)', x: 30, y: 55, isExample: true },
      { id: 't2', label: 'Lily (Girl roasting marshmallow by fire)', x: 55, y: 65 },
      { id: 't3', label: 'Harry (Boy with red backpack by stream)', x: 18, y: 70 },
      { id: 't4', label: 'Uncle Robert (Man playing guitar on log)', x: 70, y: 60 },
      { id: 't5', label: 'Aunt Sarah (Woman taking sunset photos)', x: 82, y: 40 },
      { id: 't6', label: 'Jack (Boy shining flashlight near tent)', x: 40, y: 48 }
    ]
  },

  // Cambridge Listening Part 3 (Visual Matching A-H — Campsite Items)
  listening_p3: {
    passage_audio_script: \`Teacher: Hello Oliver! Where did you keep all your camping supplies during the trip?
Oliver: I organized everything carefully, Mrs. Taylor! I remember where all the items were.
Teacher: First, where was the bright flashlight kept? Was it inside your backpack?
Oliver: No! The flashlight was placed on the wooden picnic table near the campfire.
Teacher: Excellent. And what about your warm sleeping bag? Where did you put that?
Oliver: My sleeping bag was unrolled inside the blue family tent on the soft mat.
Teacher: Right. And where did Dad keep the box of sweet marshmallows?
Oliver: Dad kept the marshmallows inside the metal cooler box near the car.
Teacher: Good idea! What about your camera? Did you take photos of the wildlife?
Oliver: Yes! My camera was hanging on the pine branch beside our tent.
Teacher: And what about your water bottle? Was that in your hand while hiking?
Oliver: Yes, my water bottle was in the side pocket of my green hiking backpack!\`,
    items: [
      { id: 1, name: 'Bright Flashlight', target_letter: 'A', audio_url: '/audio/week35/listening_p3_item1.mp3', audio_text: "Teacher: Where was the bright flashlight kept?\\nOliver: The flashlight was placed on the wooden picnic table near the campfire." },
      { id: 2, name: 'Warm Sleeping Bag', target_letter: 'B', audio_url: '/audio/week35/listening_p3_item2.mp3', audio_text: "Teacher: And what about your warm sleeping bag?\\nOliver: My sleeping bag was unrolled inside the blue family tent on the soft mat." },
      { id: 3, name: 'Sweet Marshmallows', target_letter: 'C', audio_url: '/audio/week35/listening_p3_item3.mp3', audio_text: "Teacher: Where did Dad keep the box of sweet marshmallows?\\nOliver: Dad kept the marshmallows inside the metal cooler box near the car." },
      { id: 4, name: 'Digital Camera', target_letter: 'D', audio_url: '/audio/week35/listening_p3_item4.mp3', audio_text: "Teacher: Where was your camera?\\nOliver: My camera was hanging on the pine branch beside our tent." },
      { id: 5, name: 'Water Bottle', target_letter: 'E', audio_url: '/audio/week35/listening_p3_item5.mp3', audio_text: "Teacher: And what about your water bottle?\\nOliver: My water bottle was in the side pocket of my green hiking backpack!" }
    ],
    cards: [
      { letter: 'A', name: 'Wooden Picnic Table', location_name: 'Picnic Table', image_url: '/images/week35/picnic_table.jpg' },
      { letter: 'B', name: 'Inside Blue Tent', location_name: 'Blue Tent', image_url: '/images/week35/inside_tent.jpg' },
      { letter: 'C', name: 'Metal Cooler Box', location_name: 'Cooler Box', image_url: '/images/week35/cooler_box.jpg' },
      { letter: 'D', name: 'Pine Tree Branch', location_name: 'Tree Branch', image_url: '/images/week35/tree_branch.jpg' },
      { letter: 'E', name: 'Green Backpack Pocket', location_name: 'Backpack Pocket', image_url: '/images/week35/backpack_pocket.jpg' },
      { letter: 'F', name: 'Rocky Stream Bank', location_name: 'Stream Bank', image_url: '/images/week35/stream_bank.jpg' },
      { letter: 'G', name: 'Car Trunk', location_name: 'Car Trunk', image_url: '/images/week35/car_trunk.jpg' },
      { letter: 'H', name: 'Campfire Circle', location_name: 'Campfire Circle', image_url: '/images/week35/campfire_circle.jpg' }
    ]
  },

  // Cambridge Listening Part 4 (3-Picture Options with Distractors)
  listening_p4_questions: [
    {
      id: 1,
      question: "What was the weather like when the family arrived?",
      audio_text: "Boy: Was it raining when you reached Pine Valley?\\nGirl: No, it was warm and sunny with a gentle mountain breeze.",
      correct_option: "A",
      options: [
        { id: "A", label: "Sunny and warm", image_url: "/images/week35/p4_q1_a.jpg" },
        { id: "B", label: "Rainy thunderstorm", image_url: "/images/week35/p4_q1_b.jpg" },
        { id: "C", label: "Snowy cold", image_url: "/images/week35/p4_q1_c.jpg" }
      ]
    },
    {
      id: 2,
      question: "What animals did the children spot during their hike?",
      audio_text: "Boy: Did you see any wild deer near the stream?\\nGirl: No, we saw two playful squirrels jumping in the pine trees.",
      correct_option: "B",
      options: [
        { id: "A", label: "Two brown bears", image_url: "/images/week35/p4_q2_a.jpg" },
        { id: "B", label: "Two playful squirrels", image_url: "/images/week35/p4_q2_b.jpg" },
        { id: "C", label: "Wild mountain deer", image_url: "/images/week35/p4_q2_c.jpg" }
      ]
    },
    {
      id: 3,
      question: "What did Dad cook for dinner over the campfire?",
      audio_text: "Boy: Did Dad cook fish from the stream?\\nGirl: No, we cooked delicious sweet corn and roasted sausages on sticks.",
      correct_option: "C",
      options: [
        { id: "A", label: "Fried fish", image_url: "/images/week35/p4_q3_a.jpg" },
        { id: "B", label: "Chicken soup", image_url: "/images/week35/p4_q3_b.jpg" },
        { id: "C", label: "Sweet corn and sausages", image_url: "/images/week35/p4_q3_c.jpg" }
      ]
    },
    {
      id: 4,
      question: "What musical instrument did Uncle Robert play?",
      audio_text: "Boy: Was Uncle Robert playing a flute by the fire?\\nGirl: No, he was playing an acoustic guitar and singing songs.",
      correct_option: "A",
      options: [
        { id: "A", label: "Acoustic guitar", image_url: "/images/week35/p4_q4_a.jpg" },
        { id: "B", label: "Wooden flute", image_url: "/images/week35/p4_q4_b.jpg" },
        { id: "C", label: "Silver trumpet", image_url: "/images/week35/p4_q4_c.jpg" }
      ]
    },
    {
      id: 5,
      question: "What did they see in the clear night sky before bed?",
      audio_text: "Boy: Did you see the full moon rising?\\nGirl: Yes, and we saw bright starry constellations above the mountain.",
      correct_option: "B",
      options: [
        { id: "A", label: "Dark storm clouds", image_url: "/images/week35/p4_q5_a.jpg" },
        { id: "B", label: "Starry constellations", image_url: "/images/week35/p4_q5_b.jpg" },
        { id: "C", label: "Hot air balloon", image_url: "/images/week35/p4_q5_c.jpg" }
      ]
    }
  ],

  // Cambridge Listening Part 5 (Color & Write)
  listening_p5: {
    image_url: "/images/week35/w35_listening_p5_scene.jpg",
    instructions: [
      { id: 1, item: "Family Tent", color: "blue", target_desc: "Color the family tent blue", audio_text: "Look at the large tent on the grass. Color it blue." },
      { id: 2, item: "Campfire Flames", color: "orange", target_desc: "Color the warm campfire flames orange", audio_text: "Can you see the campfire? Color the flames orange." },
      { id: 3, item: "Hiking Backpack", color: "red", target_desc: "Color the backpack by the log red", audio_text: "Now find the backpack beside the wooden log. Color it red." },
      { id: 4, item: "Signboard", write_word: "CAMP", target_desc: "Write the word CAMP on the wooden trail sign", audio_text: "Look at the wooden sign by the path. Write the word CAMP on it." },
      { id: 5, item: "Shining Flashlight", color: "yellow", target_desc: "Color the flashlight on the table yellow", audio_text: "Look at the flashlight on the picnic table. Color it yellow." }
    ]
  }
};

export default listeningHubData;
`;
fs.writeFileSync(listeningHubPath, listeningHubCode);

console.log('✅ Week 35 fixes applied.');
