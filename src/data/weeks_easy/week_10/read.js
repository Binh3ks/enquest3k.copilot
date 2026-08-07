export default {
  title: "My Farm Visit",
  image_url: "/images/week10/read_cover_w10.jpg",
  audio_url: "/audio/week10_easy/read_explore_main.mp3",
  content_en: "Today I visit a farm. The farm is quiet. I am happy! I see a **big brown cow**. The animal **eats grass** **in the field**. I see a **small white chicken**. The bird **runs fast**! The farm is clean. The field is green. I see **tall trees**. The **countryside is peaceful**. I see **farm animals**. My uncle says the farm is nice. I agree!",
  content_vi: "Hôm nay tôi đến thăm một trang trại. Trang trại yên tĩnh. Tôi vui! Tôi thấy một con bò lớn màu nâu. Con bò ăn cỏ trong đồng. Tôi thấy một con gà trắng nhỏ. Con gà chạy nhanh! Trang trại sạch sẽ. Đồng xanh. Tôi thấy những cây cao. Vùng nông thôn yên bình. Tôi thấy nhiều động vật trên trang trại. Chú tôi nói trang trại đẹp. Tôi đồng ý!",
  comprehension_questions: [
    { id: 1, question_en: "Where do you visit?", answer: ["farm", "the farm", "a farm"], clue_statement: "You visit a farm.", hint_en: "A place with animals...", hint_vi: "Một nơi có động vật..." },
    { id: 2, question_en: "Is the farm quiet or noisy?", answer: ["quiet", "the farm is quiet"], clue_statement: "The farm is quiet.", hint_en: "Not loud...", hint_vi: "Không ồn..." },
    { id: 3, question_en: "What is the field like?", answer: ["green"], clue_statement: "The field is green.", hint_en: "Think about the field...", hint_vi: "Nghĩ về cánh đồng..." },
    { id: 4, question_en: "What do the animals do on the farm?", answer: ["eat grass", "run fast", "walk around", "sleep"], clue_statement: "They eat grass.", hint_en: "Farm animals do...", hint_vi: "Động vật trang trại..." }
  ],
  question: {
    text_en: "Do you like the farm? What do you see?",
    text_vi: "Bạn thích trang trại không? Bạn thấy gì?",
    min_words: 25,
    hint_en: "Talk about farm animals...",
    hint_vi: "Nói về động vật trang trại..."
  }
};

export const chunk_focus = [
  "big brown cow",
  "eats grass",
  "in the field",
  "small white chicken",
  "runs fast",
  "tall trees",
  "countryside is peaceful",
  "farm animals"
];

export const dictionary = {
    'big brown cow': { word: 'big brown cow', pronunciation: '/big brown cow/', definition_vi: 'con bò nâu to', definition_en: 'meaning of big brown cow', example: 'The farmer fed the big brown cow standing in the green meadow.' },
    'countryside is peaceful': { word: 'countryside is peaceful', pronunciation: '/countryside is peaceful/', definition_vi: 'đồng quê yên bình', definition_en: 'meaning of countryside is peaceful', example: 'The countryside is peaceful with green fields, singing birds and blue skies.' },
    'eats grass': { word: 'eats grass', pronunciation: '/eats grass/', definition_vi: 'ăn cỏ', definition_en: 'meaning of eats grass', example: 'The cow eats grass in the field.' },
    'farm animals': { word: 'farm animals', pronunciation: '/farm animals/', definition_vi: 'nông trại động vật', definition_en: 'Key collocation: farm animals', example: 'Natural usage of \'farm animals\' in sentence context.' },
    'in the field': { word: 'in the field', pronunciation: '/in the field/', definition_vi: 'trong cánh đồng', definition_en: 'meaning of in the field', example: 'The cow eats grass in the field.' },
    'runs fast': { word: 'runs fast', pronunciation: '/runs fast/', definition_vi: 'runs nhanh', definition_en: 'Key collocation: runs fast', example: 'Natural usage of \'runs fast\' in sentence context.' },
    'small white chicken': { word: 'small white chicken', pronunciation: '/small white chicken/', definition_vi: 'con gà trắng nhỏ', definition_en: 'meaning of small white chicken', example: 'A small white chicken pecked at the seeds in the farmyard.' },
    'tall trees': { word: 'tall trees', pronunciation: '/tall trees/', definition_vi: 'cây cao', definition_en: 'meaning of tall trees', example: 'Many tall trees grow along the riverbank.' }
};
