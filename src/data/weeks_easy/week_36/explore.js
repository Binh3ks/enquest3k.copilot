// WEEK 36: Adventure Stories (Irregular Verbs)
// Explore Station — Easy Mode
// Theme: Adventure and Discovery (simplified)

export default {
  title_en: "Adventure and Discovery",
  title_vi: "Phieu luu va Kham pha",
  content_en: `Explorers **went on** exciting adventures. They saw **amazing things** on their trips. They discovered new lands and **wrote about** them in books for everyone to read. Marco Polo **went from** Italy to China. He **took 24 years**! He rode horses on the **Silk Road** and **met merchants** from different countries. He spoke five different languages and told stories about things he saw. Today, submarines **go down** deep into the ocean to explore things underwater every day. They **take photos** and write research books. Exploration helps us learn about the world. When explorers **came back** home, they told their stories to everyone. Their adventures **inspired people** to dream of going on their own journeys someday. The ocean is still a big mystery. Scientists **began to plan** new missions to explore the deep sea. They found strange creatures and beautiful **coral reefs**. The world still has many secrets waiting to be discovered.`,

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
  "amazing things",
  "wrote about",
  "went from",
  "took 24 years",
  "Silk Road",
  "met merchants",
  "go down",
  "take photos",
  "came back",
  "inspired people",
  "began to plan",
  "coral reefs"
];

export const dictionary = {
    'Silk Road': { word: 'Silk Road', pronunciation: '/sɪlk rəʊd/', definition_vi: 'con đường tơ lụa', definition_en: 'English collocation / phrase: silk road', example: 'Marco Polo travelled along the Silk Road.' },
    'amazing things': { word: 'amazing things', pronunciation: '/əˈmeɪzɪŋ θɪŋz/', definition_vi: 'những điều kỳ diệu', definition_en: 'English collocation / phrase: amazing things', example: 'We saw amazing things underwater.' },
    'began to plan': { word: 'began to plan', pronunciation: '/bɪˈɡæn tuː plæn/', definition_vi: 'bắt đầu lên kế hoạch', definition_en: 'English collocation / phrase: began to plan', example: 'They began to plan their next expedition.' },
    'came back': { word: 'came back', pronunciation: '/keɪm bæk/', definition_vi: 'quay trở lại', definition_en: 'English collocation / phrase: came back', example: 'He came back home after school.' },
    'coral reefs': { word: 'coral reefs', pronunciation: '/ˈkɒrəl riːfs/', definition_vi: 'rạn san hô', definition_en: 'English collocation / phrase: coral reefs', example: 'Scuba divers explored the colorful coral reefs.' },
    'go down': { word: 'go down', pronunciation: '/ɡoʊ daʊn/', definition_vi: 'đi xuống sâu', definition_en: 'descend deep underwater', example: 'Submarines go down deep.' },
    'inspired people': { word: 'inspired people', pronunciation: '/ɪnˈspaɪəd ˈpiːpl/', definition_vi: 'truyền cảm hứng cho mọi người', definition_en: 'English collocation / phrase: inspired people', example: 'His stories inspired people for centuries.' },
    'met merchants': { word: 'met merchants', pronunciation: '/met ˈmɜːtʃənts/', definition_vi: 'gặp gỡ các thương gia', definition_en: 'English collocation / phrase: met merchants', example: 'He met merchants from many countries.' },
    'take photos': { word: 'take photos', pronunciation: '/teɪk ˈfoʊtoʊz/', definition_vi: 'chụp ảnh', definition_en: 'capture pictures', example: 'Divers take photos of corals.' },
    'took 24 years': { word: 'took 24 years', pronunciation: '/tʊk ˈtwenti fɔːr jɪərz/', definition_vi: 'mất 24 năm', definition_en: 'English collocation / phrase: took 24 years', example: 'His journey across Asia took 24 years.' },
    'went from': { word: 'went from', pronunciation: '/went from/', definition_vi: 'đi từ (đâu đến đâu)', definition_en: 'traveled starting from a place', example: 'Marco Polo went from Italy to China.' },
    'went on': { word: 'went on', pronunciation: '/went ɒn/', definition_vi: 'đi / tham gia vào', definition_en: 'English collocation / phrase: went on', example: 'They went on an exciting trip.' },
    'wrote about': { word: 'wrote about', pronunciation: '/wrote about/', definition_vi: 'viết về', definition_en: 'documented in writing', example: 'He wrote about everything he saw.' }
};
