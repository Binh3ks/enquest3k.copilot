// WEEK 36: Adventure Stories (Irregular Verbs)
// Explore Station — Easy Mode
// Theme: Adventure and Discovery (simplified)

export default {
  title_en: "Adventure and Discovery",
  title_vi: "Phieu luu va Kham pha",
  content_en: `Explorers **went on** exciting adventures. They **saw amazing** things on their trips. They **found new** lands and **wrote about** them in books for everyone to read.

Marco Polo **went from** Italy to China. He **took 24 years**! He **rode** horses on the Silk Road and **met many** interesting people from different countries. He **spoke** five different languages and **told** people about the wonderful things he **saw**.

Today, submarines **go down** deep into the ocean. Scientists **find new** things underwater every day. They **take photos** and **write** about what they **see** in their research books.

Exploration helps us **learn** about the world. When explorers **came back** home, they **told** their stories to everyone. Their adventures **made people dream** of going on their own journeys someday.

The ocean is still a big mystery. Scientists **began** to explore the deep sea only recently. They **found** strange creatures and beautiful coral reefs. The world still has many secrets waiting to be discovered.`,

  content_vi: "Cac nha tham hiem di nhung cuoc phieu luu thu vi. Ho nhin thay nhung thu tuyet voi tren chuyen di. Ho tim ra noi moi va viet ve chung.",

  audio_narration: "/audio/week36/explore_narration_easy.mp3",
  image_url: "/images/week36/explore_cover_w36.jpg",

  check_questions: [
    { id: 1, question_en: "What did Marco Polo do?", answer: ["Went on a journey to China", "Traveled to China", "Made a journey"], hint_en: "He went to China.", hint_vi: "Ong di Trung Quoc.", audio_url: "/audio/week36/explore_q1_easy.mp3" },
    { id: 2, question_en: "How long was Marco Polo journey?", answer: ["24 years", "About 24 years", "It took 24 years"], hint_en: "24 years.", hint_vi: "24 nam.", audio_url: "/audio/week36/explore_q2_easy.mp3" },
    { id: 3, question_en: "What did explorers do when they came back home?", answer: ["Told their stories", "They told stories", "Talked about their journey"], hint_en: "They told stories.", hint_vi: "Ho ke chuyen.", audio_url: "/audio/week36/explore_q3_easy.mp3" }
  ],
  question: {
    text_en: "What adventure would you like to go on? Use these words: went, saw, found, took.",
    text_vi: "Ban muon di cuoc phieu luu nao? Dung cac tu: went, saw, found, took.",
    min_words: 20,
    hint_en: "I went to... I saw... I found...",
    hint_vi: "Toi di... Toi thay... Toi tim..."
  }
};

export const chunk_focus = [
  "went on",
  "saw amazing",
  "found new",
  "wrote about",
  "went from",
  "took 24 years",
  "rode",
  "met many",
  "spoke",
  "told",
  "saw",
  "go down",
  "find new",
  "take photos",
  "write",
  "see",
  "learn",
  "came back",
  "made people dream",
  "began",
  "found"
];

export const dictionary = {
    'went on': { word: 'went on', pronunciation: '/went on/', definition_vi: 'đi (một chuyến đi)', definition_en: 'meaning of went on', example: 'Last summer, we went on a trip to the mountains with our class.' },
    'saw amazing': { word: 'saw amazing', pronunciation: '/sɔː əˈmeɪzɪŋ/', definition_vi: 'nhìn thấy những điều tuyệt vời', definition_en: 'spotted wonderful things', example: 'We saw amazing sights.' },
    'found new': { word: 'found new', pronunciation: '/faʊnd njuː/', definition_vi: 'tìm thấy miền đất mới', definition_en: 'discovered new lands or facts', example: 'Explorers found new places.' },
    'wrote about': { word: 'wrote about', pronunciation: '/wrote about/', definition_vi: 'viết về', definition_en: 'documented in writing', example: 'He wrote about everything he saw.' },
    'went from': { word: 'went from', pronunciation: '/went from/', definition_vi: 'đi từ (đâu đến đâu)', definition_en: 'traveled starting from a place', example: 'Marco Polo went from Italy to China.' },
    'took 24 years': { word: 'took 24 years', pronunciation: '/tʊk ˈtwenti fɔːr jɪərz/', definition_vi: 'mất 24 năm', definition_en: 'lasted for twenty-four years', example: 'His epic journey took 24 years.' },
    'rode': { word: 'rode', pronunciation: '/rode/', definition_vi: 'chưa có nghĩa', definition_en: 'meaning of rode', example: 'This involves rode in some way.' },
    'met many': { word: 'met many', pronunciation: '/met ˈmeni/', definition_vi: 'gặp nhiều người', definition_en: 'encountered numerous people', example: 'He met many merchants along the way.' },
    'spoke': { word: 'spoke', pronunciation: '/spoke/', definition_vi: 'đã nói', definition_en: 'meaning of spoke', example: 'This involves spoke in some way.' },
    'told': { word: 'told', pronunciation: '/told/', definition_vi: 'đã nói', definition_en: 'meaning of told', example: 'This involves told in some way.' },
    'saw': { word: 'saw', pronunciation: '/saw/', definition_vi: 'đã thấy', definition_en: 'meaning of saw', example: 'This involves saw in some way.' },
    'go down': { word: 'go down', pronunciation: '/ɡoʊ daʊn/', definition_vi: 'đi xuống sâu', definition_en: 'descend deep underwater', example: 'Submarines go down deep.' },
    'find new': { word: 'find new', pronunciation: '/faɪnd njuː/', definition_vi: 'tìm kiếm điều mới', definition_en: 'discover new objects or places', example: 'Scientists find new sea life.' },
    'take photos': { word: 'take photos', pronunciation: '/teɪk ˈfoʊtoʊz/', definition_vi: 'chụp ảnh', definition_en: 'capture pictures', example: 'Divers take photos of corals.' },
    'write': { word: 'write', pronunciation: '/write/', definition_vi: 'viết', definition_en: 'To make letters or words with a pen or pencil', example: 'I write my name.' },
    'see': { word: 'see', pronunciation: '/see/', definition_vi: 'Nhìn thấy', definition_en: 'meaning of see', example: 'I can see the mountains from here.' },
    'learn': { word: 'learn', pronunciation: '/learn/', definition_vi: 'học', definition_en: 'To gain knowledge or skill', example: 'I learn English every day.' },
    'came back': { word: 'came back', pronunciation: '/came back/', definition_vi: 'trở về', definition_en: 'returned from a place', example: 'When we came back to the surface, we were happy.' },
    'made people dream': { word: 'made people dream', pronunciation: '/meɪd ˈpiːpl driːm/', definition_vi: 'làm mọi người mơ ước', definition_en: 'inspired people to dream of adventure', example: 'Their stories made people dream.' },
    'began': { word: 'began', pronunciation: '/began/', definition_vi: 'đã bắt đầu', definition_en: 'meaning of began', example: 'The movie began at 7 pm.' },
    'found': { word: 'found', pronunciation: '/found/', definition_vi: 'đã tìm thấy', definition_en: 'meaning of found', example: 'This involves found in some way.' }
};
