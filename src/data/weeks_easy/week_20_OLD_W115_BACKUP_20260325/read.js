export default {
  title: "Grandma's Attic",
  image_url: "/images/week20_easy/read_cover_w20.jpg",
  content_en: "Yesterday, I went to **Grandma's** house. I climbed up to the attic. It was very **old** and **dirty**. **There was** a **broken** chair in the corner. **There were** many **boxes** on the floor. I opened one box. Inside, **there was** a **teddy bear**. It was cute but **dusty**. I cleaned it and played with it.",
  content_vi: "Hôm qua, tớ đến nhà Bà. Tớ leo lên gác xép. Nó rất cũ và bẩn. Có một cái ghế gãy ở trong góc. Có nhiều cái hộp trên sàn. Tớ mở một hộp. Bên trong, có một con gấu bông. Nó dễ thương nhưng đầy bụi. Tớ đã lau sạch và chơi với nó.",
  audio_url: null,
  comprehension_questions: [
    { id: 1, question_en: "Where did he go?", answer: ["He went to Grandma's house.", "Grandma's house.", "To Grandma's house.", "He went to the attic.", "Grandma's attic.", "The attic."], hint_en: "He went to Grandma's...", hint_vi: "Cậu ấy đi đến nhà..." },
    { id: 2, question_en: "What was broken?", answer: ["A chair.", "The chair.", "A broken chair.", "The chair was broken.", "A chair was broken."], hint_en: "A broken...", hint_vi: "Một cái ghế..." },
    { id: 3, question_en: "What was inside the box?", answer: ["A teddy bear.", "The teddy bear.", "There was a teddy bear.", "A bear.", "Teddy bear."], hint_en: "A teddy...", hint_vi: "Một con gấu..." }
  ]
};

export const chunk_focus = [
  "Grandma's",
  "old",
  "dirty",
  "There was",
  "broken",
  "There were",
  "boxes",
  "there was",
  "teddy bear",
  "dusty"
];

export const dictionary = {
    'Grandma\'s': { word: 'Grandma\'s', pronunciation: '/grandma\'s/', definition_vi: 'bà', definition_en: 'meaning of grandma\'s', example: 'I love eating grandma\'s cooking.' },
    'There was': { word: 'There was', pronunciation: '/there was/', definition_vi: 'có (nghĩa tồn tại)', definition_en: 'meaning of there was', example: 'There was a big market near the river.' },
    'There were': { word: 'There were', pronunciation: '/there were/', definition_vi: 'có (nhiều)', definition_en: 'meaning of there were', example: 'There were tall trees along the road.' },
    'boxes': { word: 'boxes', pronunciation: '/boxes/', definition_vi: 'Hộp', definition_en: 'meaning of boxes', example: 'Pack the items in boxes.' },
    'broken': { word: 'broken', pronunciation: '/broken/', definition_vi: 'bị gãy, bị vỡ', definition_en: 'meaning of broken', example: 'They had courage to fix the broken parts and try again.' },
    'dirty': { word: 'dirty', pronunciation: '/dirty/', definition_vi: 'bẩn', definition_en: 'meaning of dirty', example: 'Your hands are very dirty.' },
    'dusty': { word: 'dusty', pronunciation: '/dusty/', definition_vi: 'đầy bụi', definition_en: 'meaning of dusty', example: 'This involves dusty in some way.' },
    'old': { word: 'old', pronunciation: '/old/', definition_vi: 'già', definition_en: 'having lived for a long time', example: 'I am ten years old.' },
    'teddy bear': { word: 'teddy bear', pronunciation: '/teddy bear/', definition_vi: 'gấu bông', definition_en: 'meaning of teddy bear', example: 'Inside, there was a teddy bear.' },
    'there was': { word: 'there was', pronunciation: '/there was/', definition_vi: 'có (nghĩa tồn tại)', definition_en: 'meaning of there was', example: 'There was a big market near the river.' }
};
