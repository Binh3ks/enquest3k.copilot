export default {
  title: "The Farm Adventure",
  image_url: "/images/week10/read_cover_w10.jpg",
  audio_url: "/audio/week10/read_explore_main.mp3",
  content_en: "Today I visit my uncle's farm **in the countryside**. The city is noisy, but the farm is quiet. I am so happy! **In the city**, **there are** many cars, but here **there are** **many animals**. I see a big cow. The cow is eating fresh grass. I see a chicken. The chicken **run very fast**! The chicken **run quickly** across the yard. The city is dirty, but the farm is clean. The air is fresh. I **walk in** the **big green field**. The **big green field** is beautiful. **There are** **many trees**. The trees are **very tall**. The city is **very busy**, but the **countryside is peaceful**. I love the farm! My uncle says: 'The city is big, but the farm is beautiful. The city has buildings, but the farm has nature.' I agree! **Next time**, I want to stay longer. The farm is the **best place**!",
  content_vi: "Hôm nay tôi đến thăm trang trại của chú trong vùng nông thôn. Thành phố ồn ào, nhưng trang trại yên tĩnh. Tôi rất vui! Ở thành phố có nhiều xe hơi, nhưng ở đây có nhiều động vật. Tôi thấy một con bò lớn. Con bò đang ăn cỏ. Tôi thấy một con gà. Con gà chạy nhanh! Thành phố bẩn, nhưng trang trại sạch sẽ. Không khí trong lành. Tôi đi bộ trên cánh đồng xanh rộng lớn. Cánh đồng đẹp quá. Có nhiều cây. Những cây cao. Thành phố bận rộn, nhưng vùng nông thôn yên bình. Tôi yêu trang trại! Chú tôi nói: 'Thành phố lớn, nhưng trang trại đẹp. Thành phố có toà nhà, nhưng trang trại có thiên nhiên.' Tôi đồng ý! Lần sau, tôi muốn ở lại lâu hơn. Trang trại là nơi tuyệt nhất!",
  comprehension_questions: [
    { id: 1, question_en: "Where does the child visit?", answer: ["farm", "uncle's farm", "the farm"], clue_statement: "The child visits uncle's farm.", hint_en: "A place in the countryside...", hint_vi: "Một nơi ở vùng nông thôn..." },
    { id: 2, question_en: "Is the farm noisy or quiet?", answer: ["quiet", "the farm is quiet"], clue_statement: "The farm is quiet.", hint_en: "Not noisy...", hint_vi: "Không ồn..." },
    { id: 3, question_en: "Where do I walk?", answer: ["in the big green field", "the big green field"], clue_statement: "I walk in the big green field.", hint_en: "A place...", hint_vi: "Một nơi..." }
  ],
  question: {
    text_en: "Do you like the city or the countryside? Why?",
    text_vi: "Bạn thích thành phố hay nông thôn? Tại sao?",
    min_words: 30,
    hint_en: "Talk about differences between city and countryside...",
    hint_vi: "Nói về sự khác biệt giữa thành phố và nông thôn..."
  }
  };

export const chunk_focus = [
  "in the countryside",
  "In the city",
  "there are",
  "many animals",
  "run very fast",
  "run quickly",
  "walk in",
  "big green field",
  "There are",
  "many trees",
  "very tall",
  "very busy",
  "countryside is peaceful",
  "Next time",
  "best place"
];

export const dictionary = {
    'In the city': { word: 'In the city', pronunciation: '/in the city/', definition_vi: 'ở thành phố', definition_en: 'meaning of in the city', example: 'In the city, there are many cars, but here there are many animals.' },
    'Next time': { word: 'Next time', pronunciation: '/next time/', definition_vi: 'Lần sau', definition_en: 'meaning of next time', example: 'Next time, I will hide the treasure next to the door!' },
    'There are': { word: 'There are', pronunciation: '/ðeər ɑːr/', definition_vi: 'có (nhiều)', definition_en: 'English collocation / phrase: there are', example: 'There are forty students in our class.' },
    'best place': { word: 'best place', pronunciation: '/best place/', definition_vi: 'nơi tốt nhất', definition_en: 'Multi-word phrase: best place', example: 'The phrase \'best place\' is commonly used in conversation.' },
    'big green field': { word: 'big green field', pronunciation: '/big green field/', definition_vi: 'cánh đồng xanh lớn', definition_en: 'meaning of big green field', example: 'Children love to run and play in the big green field near the park.' },
    'countryside is peaceful': { word: 'countryside is peaceful', pronunciation: '/countryside is peaceful/', definition_vi: 'đồng quê yên bình', definition_en: 'meaning of countryside is peaceful', example: 'The countryside is peaceful with green fields, singing birds and blue skies.' },
    'in the countryside': { word: 'in the countryside', pronunciation: '/in the countryside/', definition_vi: 'ở nông thôn', definition_en: 'meaning of in the countryside', example: 'Today I visit my uncle\'s farm in the countryside.' },
    'many animals': { word: 'many animals', pronunciation: '/many animals/', definition_vi: 'nhiều động vật', definition_en: 'meaning of many animals', example: 'In the city, there are many cars, but here there are many animals.' },
    'many trees': { word: 'many trees', pronunciation: '/many trees/', definition_vi: 'nhiều cây', definition_en: 'meaning of many trees', example: 'There are many trees.' },
    'run quickly': { word: 'run quickly', pronunciation: '/run quickly/', definition_vi: 'chạy nhanh chóng', definition_en: 'meaning of run quickly', example: 'When the bell rang, the children ran quickly to the playground.' },
    'run very fast': { word: 'run very fast', pronunciation: '/run very fast/', definition_vi: 'chạy rất nhanh', definition_en: 'meaning of run very fast', example: 'The chicken run very fast!' },
    'there are': { word: 'there are', pronunciation: '/ðeər ɑːr/', definition_vi: 'có (nhiều)', definition_en: 'English collocation / phrase: there are', example: 'There are forty students in our class.' },
    'very busy': { word: 'very busy', pronunciation: '/very busy/', definition_vi: 'rất bận', definition_en: 'meaning of very busy', example: 'The kitchen was very busy with everyone cooking and preparing for the feast.' },
    'very tall': { word: 'very tall', pronunciation: '/very tall/', definition_vi: 'rất cao', definition_en: 'meaning of very tall', example: 'The giraffe is very tall and can eat leaves from the highest branches.' },
    'walk in': { word: 'walk in', pronunciation: '/walk in/', definition_vi: 'đi bộ in', definition_en: 'English phrase: walk in', example: 'The phrase \'walk in\' means đi bộ in.' }
};
