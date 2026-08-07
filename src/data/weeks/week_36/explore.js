// WEEK 36: Adventure Stories (Irregular Verbs)
// Explore Station — Advanced Mode
// Theme: Exploration, Discovery, Adventure

export default {
  title_en: "Adventure and Discovery: The World of Explorers",
  title_vi: "Phieu luu va Kham pha: The gioi cua cac Nha Tham hiem",
  content_en: `Exploration has **changed the world** in many important ways. Brave explorers **went on** dangerous journeys to **find new** places. They **saw amazing** things and **made great** discoveries that shaped how people understood the world.

When Marco Polo **rode across** Asia, he **met merchants** from many different countries. He **spoke to** people in different languages and **wrote about** everything he **saw** in a famous book. His book **inspired other** explorers to **begin their** own adventures and travel to distant lands.

Modern explorers **use technology** to **help them** travel safely. Submarines **dive down** into the deep ocean, where they **find new** species and underwater treasures. Satellites **give us** information about distant places from space. Scientists **discover new** things about our planet every single year.

Exploration is **not just** about going somewhere new. It is **about learning** about the world and **about meeting** new people who think and live differently. When explorers **came back** home, they **told their** stories to everyone. Their adventures **inspired us** to **dream of** our own great discoveries and to keep exploring the world around us.`,

  content_vi: "Kham pha da thay doi the gioi theo nhieu cach quan trong. Cac nha tham hiem duong cam di nhung hanh trinh nguy hiem de tim nhung noi moi. Ho nhin thay nhung thu tuyet voi va tao ra nhung phat hien tuyet voi.",

  audio_narration: "/audio/week36/explore_narration.mp3",
  image_url: "/images/week36/explore_cover_w36.jpg",

  check_questions: [
    { id: 1, question_en: "What did Marco Polo do on his long journey?", answer: ["He wrote a famous book about his travels", "He wrote a book", "Wrote a book about his travels"], hint_en: "He ___ about his travels.", hint_vi: "Ong ___ ve nhung chuyen di cua minh.", audio_url: "/audio/week36/explore_q1.mp3" },
    { id: 2, question_en: "What did explorers bring back from their travels?", answer: ["Maps, foods, and stories", "Maps and stories", "New things and stories"], hint_en: "Explorers brought back ___ and ___.", hint_vi: "Cac nha tham hiem mang ve ___ va ___.", audio_url: "/audio/week36/explore_q2.mp3" },
    { id: 3, question_en: "What did Marco Polo find amazing on the Silk Road?", answer: ["He saw many different cultures and languages", "Different cultures", "Many languages and people"], hint_en: "He ___ many different people.", hint_vi: "Ong ___ rat nhieu nguoi khac nhau.", audio_url: "/audio/week36/explore_q3.mp3" },
    { id: 99, type: "critical_thinking", question_en: "Think about a famous explorer you would like to be. Where did they go, and what did they find? Explain in 2-3 sentences using irregular verbs (went, saw, found, gave).", answer: ["I would like to be Marco Polo. He went on the Silk Road and saw many amazing places. He wrote a famous book about his travels.", "I want to be a deep sea explorer. I would go down to the ocean floor and find treasures from old ships. I would give my discoveries to a museum.", "I would like to be Amelia Earhart. She flew across oceans and saw the whole world from above. She inspired many young women to follow their dreams."], hint_en: "Think about the place, what you would find, and how you would share it.", hint_vi: "Hay nghi ve noi, thu ban se tim, va cach ban se chia se.", audio_url: "/audio/week36/explore_q4.mp3" }
  ],
  writing_prompt_en: "Write about an adventure you dream of having. Use at least 5 irregular verbs (went, saw, took, came, gave, made, found, wrote, spoke, made).",
  writing_prompt_vi: "Viet ve mot cuoc phieu luu ban mo co. Dung it nhat 5 dong tu bat quy tac (went, saw, took, came, gave, made, found, wrote, spoke).",
  question: {
    text_en: "Where would you like to go on an adventure? What would you do there? Use these words: went, saw, found, took, came, gave.",
    text_vi: "Ban muon di dau trong mot cuoc phieu luu? Ban se lam gi o do? Dung cac tu: went, saw, found, took, came, gave.",
    min_words: 25,
    hint_en: "I went to... I saw... I found... I took... I gave... I came back...",
    hint_vi: "Toi di... Toi thay... Toi tim... Toi chup... Toi trao... Toi tro lai..."
  }
};

export const chunk_focus = [
  "changed the world",
  "went on",
  "find new",
  "saw amazing",
  "made great",
  "rode across",
  "met merchants",
  "spoke to",
  "wrote about",
  "saw",
  "inspired other",
  "begin their",
  "use technology",
  "help them",
  "dive down",
  "give us",
  "discover new",
  "not just",
  "about learning",
  "about meeting",
  "came back",
  "told their",
  "inspired us",
  "dream of"
];

export const dictionary = {
    'about learning': { word: 'about learning', pronunciation: '/əˈbaʊt ˈlɜːrnɪŋ/', definition_vi: 'về việc học hỏi', definition_en: 'concerning the acquisition of knowledge', example: 'It is about learning new cultures.' },
    'about meeting': { word: 'about meeting', pronunciation: '/əˈbaʊt ˈmiːtɪŋ/', definition_vi: 'về việc gặp gỡ', definition_en: 'concerning encountering new people', example: 'It is about meeting people.' },
    'begin their': { word: 'begin their', pronunciation: '/bɪˈɡɪn ðeər/', definition_vi: 'bắt đầu hành trình của họ', definition_en: 'start their own journey', example: 'Adventurers begin their journey.' },
    'came back': { word: 'came back', pronunciation: '/keɪm bæk/', definition_vi: 'quay trở lại', definition_en: 'English collocation / phrase: came back', example: 'He came back home after school.' },
    'changed the world': { word: 'changed the world', pronunciation: '/tʃeɪndʒd ðə wɜːrld/', definition_vi: 'thay đổi thế giới', definition_en: 'made a profound impact on earth', example: 'Their discoveries changed the world.' },
    'discover new': { word: 'discover new', pronunciation: '/dɪˈskʌvər njuː/', definition_vi: 'khám phá điều mới', definition_en: 'find new lands or facts', example: 'Scientists discover new sea species.' },
    'dive down': { word: 'dive down', pronunciation: '/daɪv daʊn/', definition_vi: 'lặn sâu xuống', definition_en: 'plunge underwater', example: 'Divers dive down deep.' },
    'dream of': { word: 'dream of', pronunciation: '/driːm əv/', definition_vi: 'mơ ước về', definition_en: 'English collocation / phrase: dream of', example: 'Children dream of going on adventures.' },
    'find new': { word: 'find new', pronunciation: '/faɪnd njuː/', definition_vi: 'tìm kiếm điều mới', definition_en: 'discover new objects or places', example: 'Scientists find new sea life.' },
    'give us': { word: 'give us', pronunciation: '/ɡɪv ʌs/', definition_vi: 'mang lại cho chúng ta', definition_en: 'provide us with insights', example: 'Discoveries give us knowledge.' },
    'help them': { word: 'help them', pronunciation: '/help them/', definition_vi: 'giúp đỡ them', definition_en: 'English phrase: help them', example: 'The phrase \'help them\' means giúp đỡ them.' },
    'inspired other': { word: 'inspired other', pronunciation: '/ɪnˈspaɪərd ˈʌðər/', definition_vi: 'truyền cảm hứng cho người khác', definition_en: 'motivated other travelers', example: 'His story inspired other explorers.' },
    'inspired us': { word: 'inspired us', pronunciation: '/ɪnˈspaɪərd ʌs/', definition_vi: 'truyền cảm hứng cho chúng tôi', definition_en: 'motivated us to learn', example: 'Their courage inspired us.' },
    'made great': { word: 'made great', pronunciation: '/meɪd ɡreɪt/', definition_vi: 'tạo ra những điều tuyệt vời', definition_en: 'achieved great accomplishments', example: 'They made great discoveries.' },
    'met merchants': { word: 'met merchants', pronunciation: '/met ˈmɜːtʃənts/', definition_vi: 'gặp gỡ các thương gia', definition_en: 'English collocation / phrase: met merchants', example: 'He met merchants from many countries.' },
    'not just': { word: 'not just', pronunciation: '/nɒt dʒʌst/', definition_vi: 'không chỉ là', definition_en: 'more than simply', example: 'Exploration is not just traveling.' },
    'rode across': { word: 'rode across', pronunciation: '/rode across/', definition_vi: 'cưỡi ngựa băng qua', definition_en: 'traveled across land on animals or transport', example: 'He rode across high mountains and deserts.' },
    'saw': { word: 'saw', pronunciation: '/saw/', definition_vi: 'đã thấy', definition_en: 'meaning of saw', example: 'This involves saw in some way.' },
    'saw amazing': { word: 'saw amazing', pronunciation: '/sɔː əˈmeɪzɪŋ/', definition_vi: 'nhìn thấy những điều tuyệt vời', definition_en: 'spotted wonderful things', example: 'We saw amazing sights.' },
    'spoke to': { word: 'spoke to', pronunciation: '/spoke to/', definition_vi: 'nói chuyện với', definition_en: 'meaning of spoke to', example: 'The headmaster spoke to the whole school about being kind to each other.' },
    'told their': { word: 'told their', pronunciation: '/toʊld ðeər/', definition_vi: 'kể những câu chuyện của họ', definition_en: 'narrated their experiences', example: 'Explorers told their stories.' },
    'use technology': { word: 'use technology', pronunciation: '/juːz tekˈnɒlədʒi/', definition_vi: 'sử dụng công nghệ', definition_en: 'employ modern devices', example: 'Explorers use technology underwater.' },
    'went on': { word: 'went on', pronunciation: '/went ɒn/', definition_vi: 'đi / tham gia vào', definition_en: 'English collocation / phrase: went on', example: 'They went on an exciting trip.' },
    'wrote about': { word: 'wrote about', pronunciation: '/wrote about/', definition_vi: 'viết về', definition_en: 'documented in writing', example: 'He wrote about everything he saw.' }
};
