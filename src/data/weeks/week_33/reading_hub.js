/**
 * Week 33 Gold Standard Reference Data — Reading Hub
 * Theme: "The Accident File" (Irregular Verbs Group 5)
 */

export const readingHubData = {
  week: 33,
  theme: "The Accident File",
  cefr_level: "A2 Flyers",

  // Interactive Gap-Fill Story Reading (Cambridge Reading Part 4 & Part 6 Standard)
  interactive_story: {
    mode: "open_cloze",
    title: "Interactive Story: Tom's Clumsy Morning",
    text_template: "Tom had a very bad morning today. First, he accidentally ____1____ his alarm clock because he was feeling ____2____. Then, he rushed downstairs and slipped on a wet ____3____ on the kitchen floor. To make things worse, he ____4____ his backpack on the bus! His mother told him not to worry, but Tom promised to be more ____5____ next time.",
    gaps: [
      { id: 1, target: "broke", hint: "past of break" },
      { id: 2, target: "clumsy", hint: "moving awkwardly" },
      { id: 3, target: "puddle", hint: "small pool of liquid" },
      { id: 4, target: "lost", hint: "past of lose" },
      { id: 5, target: "careful", hint: "paying attention to avoid mistakes" }
    ],
    word_bank: ["broke", "clumsy", "puddle", "lost", "careful", "spilled", "dropped"]
  },

  // Cambridge Flyers Reading Part 3 — 5 Sentence Completion Questions (A/B/C)
  reading_part3_story: {
    title: "Cambridge Flyers Reading Part 3 — Tom's Morning Adventure",
    questions: [
      {
        id: "r3_q01",
        question: "When Tom's alarm clock rang, he was feeling clumsy and...",
        options: [
          { label: "A", text: "accidentally knocked it off the table.", isCorrect: true },
          { label: "B", text: "threw it out of the window.", isCorrect: false },
          { label: "C", text: "went back to sleep immediately.", isCorrect: false }
        ],
        answerIndex: 0
      },
      {
        id: "r3_q02",
        question: "While Tom was rushing downstairs for breakfast, he...",
        options: [
          { label: "A", text: "slipped on a wet puddle on the floor.", isCorrect: true },
          { label: "B", text: "met his friends outside the house.", isCorrect: false },
          { label: "C", text: "dropped his backpack on the stairs.", isCorrect: false }
        ],
        answerIndex: 0
      },
      {
        id: "r3_q03",
        question: "To make his morning even worse, Tom...",
        options: [
          { label: "A", text: "spilled his glass of juice over his English notebook.", isCorrect: true },
          { label: "B", text: "lost his shoes under the kitchen table.", isCorrect: false },
          { label: "C", text: "broke another alarm clock.", isCorrect: false }
        ],
        answerIndex: 0
      },
      {
        id: "r3_q04",
        question: "When Tom's sister, Mia, saw the mess, she...",
        options: [
          { label: "A", text: "helped him clean the wet floor.", isCorrect: true },
          { label: "B", text: "laughed at him because he was clumsy.", isCorrect: false },
          { label: "C", text: "called the school bus driver.", isCorrect: false }
        ],
        answerIndex: 0
      },
      {
        id: "r3_q05",
        question: "After everything that happened, Tom promised his mother that...",
        options: [
          { label: "A", text: "he would be more careful next time.", isCorrect: true },
          { label: "B", text: "he would never drink juice again.", isCorrect: false },
          { label: "C", text: "he would buy a new alarm clock.", isCorrect: false }
        ],
        answerIndex: 0
      }
    ]
  },

  // Full Story Reading & Interactive Click-to-Learn Dictionary
  full_story_reading: {
    title: "Tom's Bad Day — Full Narrative Story",
    paragraph: "Tom had a terrible morning today! First, he woke up late and accidentally broke his alarm clock because he was feeling clumsy. Next, he rushed downstairs in a hurry, slipped on a wet puddle, and fell onto the rug. While making breakfast, he dropped a glass of orange juice and damaged his notebook. To make things worse, he lost his backpack on the bus! Later, Mia found his bag and returned it. Tom apologized to his mom and promised to be more cautious next time."
  },

  story_dictionary: [
    {
      id: "dict_01",
      word: "broke",
      ipa: "/broʊk/",
      meaning_vi: "đã làm vỡ / gãy",
      example_en: "He accidentally broke his alarm clock in the morning."
    },
    {
      id: "dict_02",
      word: "clumsy",
      ipa: "/ˈklʌmzi/",
      meaning_vi: "vụng về / bất cẩn",
      example_en: "Tom felt so clumsy when he reached for his glasses."
    },
    {
      id: "dict_03",
      word: "slipped",
      ipa: "/slɪpt/",
      meaning_vi: "đã trượt chân",
      example_en: "He slipped on a wet puddle on the kitchen floor."
    },
    {
      id: "dict_04",
      word: "puddle",
      ipa: "/ˈpʌd.əl/",
      meaning_vi: "vũng nước",
      example_en: "There was a wet puddle near the back door."
    },
    {
      id: "dict_05",
      word: "fell",
      ipa: "/fɛl/",
      meaning_vi: "đã ngã / rơi",
      example_en: "He fell onto the rug after slipping."
    },
    {
      id: "dict_06",
      word: "dropped",
      ipa: "/drɑːpt/",
      meaning_vi: "đã đánh rơi",
      example_en: "He dropped a glass of orange juice while making breakfast."
    },
    {
      id: "dict_07",
      word: "damaged",
      ipa: "/ˈdæm.ɪdʒd/",
      meaning_vi: "bị hư hại / hỏng",
      example_en: "The spilled juice damaged his school notebook."
    },
    {
      id: "dict_08",
      word: "lost",
      ipa: "/lɔːst/",
      meaning_vi: "đã làm mất",
      example_en: "Tom lost his backpack on the school bus."
    },
    {
      id: "dict_09",
      word: "apologized",
      ipa: "/əˈpɑː.lə.dʒaɪzd/",
      meaning_vi: "đã xin lỗi",
      example_en: "Tom apologized to his mom for being clumsy."
    },
    {
      id: "dict_10",
      word: "cautious",
      ipa: "/ˈkɑː.ʃəs/",
      meaning_vi: "cẩn trọng / cẩn thận",
      example_en: "He promised to be more cautious next time."
    }
  ],

  // 1. Array of EXACTLY 20 Vocab items (10 Core + 10 Extended)
  vocab: [
    // --- 10 CORE WORDS ---
    {
      id: "w33_v01",
      word: "broke",
      part_of_speech: "verb",
      phonetic: "/broʊk/",
      definition_en: "Damaged something into pieces by accident.",
      definition_vi: "đã làm vỡ / làm gãy",
      audio_word: "/audio/words/broke.mp3"
    },
    {
      id: "w33_v02",
      word: "fell",
      part_of_speech: "verb",
      phonetic: "/fɛl/",
      definition_en: "Dropped down to the ground suddenly.",
      definition_vi: "đã ngã / đã rơi",
      audio_word: "/audio/words/fell.mp3"
    },
    {
      id: "w33_v03",
      word: "lost",
      part_of_speech: "verb",
      phonetic: "/lɔːst/",
      definition_en: "Could not find something owned.",
      definition_vi: "đã làm mất",
      audio_word: "/audio/words/lost.mp3"
    },
    {
      id: "w33_v04",
      word: "found",
      part_of_speech: "verb",
      phonetic: "/faʊnd/",
      definition_en: "Discovered something after looking for it.",
      definition_vi: "đã tìm thấy",
      audio_word: "/audio/words/found.mp3"
    },
    {
      id: "w33_v05",
      word: "mistake",
      part_of_speech: "noun",
      phonetic: "/mɪˈsteɪk/",
      definition_en: "An action that is incorrect or unwise.",
      definition_vi: "sai lầm / lỗi sai",
      audio_word: "/audio/words/mistake.mp3"
    },
    {
      id: "w33_v06",
      word: "accident",
      part_of_speech: "noun",
      phonetic: "/ˈæk.sə.dənt/",
      definition_en: "An unexpected event that causes harm or damage.",
      definition_vi: "tai nạn / sự cố bất ngờ",
      audio_word: "/audio/words/accident.mp3"
    },
    {
      id: "w33_v07",
      word: "fix",
      part_of_speech: "verb",
      phonetic: "/fɪks/",
      definition_en: "To repair something that is broken.",
      definition_vi: "sửa chữa / khắc phục",
      audio_word: "/audio/words/fix.mp3"
    },
    {
      id: "w33_v08",
      word: "sorry",
      part_of_speech: "adjective",
      phonetic: "/ˈsɑː.ri/",
      definition_en: "Feeling sadness or regret for a mistake.",
      definition_vi: "hối hận / xin lỗi",
      audio_word: "/audio/words/sorry.mp3"
    },
    {
      id: "w33_v09",
      word: "careful",
      part_of_speech: "adjective",
      phonetic: "/ˈker.fəl/",
      definition_en: "Giving attention to avoid danger or mistakes.",
      definition_vi: "cẩn thận",
      audio_word: "/audio/words/careful.mp3"
    },
    {
      id: "w33_v10",
      word: "clumsy",
      part_of_speech: "adjective",
      phonetic: "/ˈklʌm.zi/",
      definition_en: "Moving or doing things in a careless way.",
      definition_vi: "vụng về",
      audio_word: "/audio/words/clumsy.mp3"
    },
    // --- 10 EXTENDED A2/B1+ WORDS ---
    {
      id: "w33_v11",
      word: "dropped",
      part_of_speech: "verb",
      phonetic: "/drɑːpt/",
      definition_en: "Let something fall to the ground.",
      definition_vi: "đã đánh rơi",
      audio_word: "/audio/words/dropped.mp3"
    },
    {
      id: "w33_v12",
      word: "damaged",
      part_of_speech: "verb",
      phonetic: "/ˈdæm.ɪdʒd/",
      definition_en: "Hurt or spoiled something.",
      definition_vi: "bị hư hại",
      audio_word: "/audio/words/damaged.mp3"
    },
    {
      id: "w33_v13",
      word: "searched",
      part_of_speech: "verb",
      phonetic: "/sɜːrtʃt/",
      definition_en: "Looked carefully to find something.",
      definition_vi: "đã tìm kiếm",
      audio_word: "/audio/words/searched.mp3"
    },
    {
      id: "w33_v14",
      word: "apologized",
      part_of_speech: "verb",
      phonetic: "/əˈpɑː.lə.dʒaɪzd/",
      definition_en: "Said sorry for doing something wrong.",
      definition_vi: "đã xin lỗi",
      audio_word: "/audio/words/apologized.mp3"
    },
    {
      id: "w33_v15",
      word: "trip",
      part_of_speech: "verb",
      phonetic: "/trɪp/",
      definition_en: "Catch one's foot on something and stumble.",
      definition_vi: "vấp chân",
      audio_word: "/audio/words/trip.mp3"
    },
    {
      id: "w33_v16",
      word: "slip",
      part_of_speech: "verb",
      phonetic: "/slɪp/",
      definition_en: "Slide unintentionally on a wet surface.",
      definition_vi: "trượt chân",
      audio_word: "/audio/words/slip.mp3"
    },
    {
      id: "w33_v17",
      word: "repair",
      part_of_speech: "verb",
      phonetic: "/rɪˈper/",
      definition_en: "Fix something that is damaged or broken.",
      definition_vi: "sửa sang / tu sửa",
      audio_word: "/audio/words/repair.mp3"
    },
    {
      id: "w33_v18",
      word: "cautious",
      part_of_speech: "adjective",
      phonetic: "/ˈkɑː.ʃəs/",
      definition_en: "Being very careful to avoid risks.",
      definition_vi: "thận trọng",
      audio_word: "/audio/words/cautious.mp3"
    },
    {
      id: "w33_v19",
      word: "careless",
      part_of_speech: "adjective",
      phonetic: "/ˈker.ləs/",
      definition_en: "Not taking enough care or attention.",
      definition_vi: "bất cẩn",
      audio_word: "/audio/words/careless.mp3"
    },
    {
      id: "w33_v20",
      word: "ignore",
      part_of_speech: "verb",
      phonetic: "/ɪɡˈnɔːr/",
      definition_en: "Refuse to pay attention to something.",
      definition_vi: "ngó lơ / xem thường",
      audio_word: "/audio/words/ignore.mp3"
    }
  ],

  // Dedicated Array of 12 Lexical Chunks
  lexical_chunks: [
    { chunk: "broke his alarm clock", vi: "đã làm vỡ đồng hồ báo thức" },
    { chunk: "reached clumsily", vi: "với tay vụng về" },
    { chunk: "slipped on a puddle", vi: "trượt chân trên vũng nước" },
    { chunk: "fell onto the rug", vi: "ngã xuống tấm thảm" },
    { chunk: "dropped a glass", vi: "đánh rơi ly nước" },
    { chunk: "damaged his notebook", vi: "làm hư hại cuốn vở" },
    { chunk: "lost his backpack", vi: "làm mất chiếc cặp" },
    { chunk: "searched everywhere", vi: "tìm kiếm khắp nơi" },
    { chunk: "found the backpack", vi: "tìm thấy chiếc cặp" },
    { chunk: "apologized for the mistake", vi: "xin lỗi vì sai lầm" },
    { chunk: "be more cautious", vi: "thận trọng hơn" },
    { chunk: "avoid careless accidents", vi: "tránh các tai nạn bất cẩn" }
  ],

  // 2. Array of 6 Webtoon Scene Frames (Gold Standard Pixar 3D)
  story_scenes: [
    {
      scene_id: "scene_1",
      title_en: "Scene 1: The Waking Mistake",
      title_vi: "Cảnh 1: Lỗi Sai Lúc Thức Dậy",
      description_en: "Tom reached clumsily for his glasses on the nightstand and accidentally broke his alarm clock.",
      description_vi: "Tom với tay vụng về lấy kính trên bàn đầu giường và vô tình làm vỡ chiếc đồng hồ báo thức.",
      image_url: "/images/week33/webtoon_scene_1.png",
      audio_sfx_url: "/audio/sfx/glass_shatter.mp3",
      lexical_chunks: [
        { word: "broke", chunk: "broke his alarm clock", x: 45, y: 55, vi: "đã làm vỡ đồng hồ" },
        { word: "clumsy", chunk: "reached clumsily", x: 25, y: 40, vi: "với tay vụng về" }
      ]
    },
    {
      scene_id: "scene_2",
      title_en: "Scene 2: Slipping on the Floor",
      title_vi: "Cảnh 2: Trượt Chân Trên Sàn",
      description_en: "He rushed downstairs in a hurry, slipped on a wet puddle, and fell onto the rug.",
      description_vi: "Cậu vội vã chạy xuống nhà, trượt chân trên vũng nước và ngã xuống tấm thảm.",
      image_url: "/images/week33/webtoon_scene_2.png",
      audio_sfx_url: "/audio/sfx/thud_fall.mp3",
      lexical_chunks: [
        { word: "slipped", chunk: "slipped on a puddle", x: 30, y: 65, vi: "đã trượt chân trên vũng nước" },
        { word: "fell", chunk: "fell onto the rug", x: 65, y: 75, vi: "đã ngã xuống thảm" }
      ]
    },
    {
      scene_id: "scene_3",
      title_en: "Scene 3: The Dropped Juice",
      title_vi: "Cảnh 3: Đánh Rơi Ly Nước",
      description_en: "While making breakfast, he dropped a glass of orange juice and damaged his notebook.",
      description_vi: "Trong lúc làm bữa sáng, cậu làm rơi ly nước cam và làm hư hại cuốn vở bài tập.",
      image_url: "/images/week33/webtoon_scene_3.png",
      audio_sfx_url: "/audio/sfx/liquid_splash.mp3",
      lexical_chunks: [
        { word: "dropped", chunk: "dropped a glass", x: 50, y: 50, vi: "đã đánh rơi ly nước" },
        { word: "damaged", chunk: "damaged his notebook", x: 70, y: 60, vi: "bị hư hại cuốn vở" }
      ]
    },
    {
      scene_id: "scene_4",
      title_en: "Scene 4: The Lost Backpack",
      title_vi: "Cảnh 4: Chiếc Cặp Bị Mất",
      description_en: "When he arrived at school, Tom realized he had lost his backpack on the bus.",
      description_vi: "Khi đến trường, Tom nhận ra mình đã làm mất chiếc cặp xách trên xe buýt.",
      image_url: "/images/week33/webtoon_scene_4.png",
      audio_sfx_url: "/audio/sfx/gasp_giggle.mp3",
      lexical_chunks: [
        { word: "lost", chunk: "lost his backpack", x: 35, y: 60, vi: "đã làm mất chiếc cặp" },
        { word: "searched", chunk: "searched everywhere", x: 60, y: 40, vi: "tìm kiếm khắp nơi" }
      ]
    },
    {
      scene_id: "scene_5",
      title_en: "Scene 5: The Kind Friend",
      title_vi: "Cảnh 5: Người Bạn Tốt Bụng",
      description_en: "Luckily, his friend Mia found the backpack on the bus seat and brought it to class.",
      description_vi: "May mắn thay, bạn Mia đã tìm thấy chiếc cặp trên ghế xe buýt và mang vào lớp.",
      image_url: "/images/week33/webtoon_scene_5.png",
      audio_sfx_url: "/audio/sfx/bell_chime.mp3",
      lexical_chunks: [
        { word: "found", chunk: "found the backpack", x: 50, y: 45, vi: "đã tìm thấy chiếc cặp" },
        { word: "sorry", chunk: "felt very sorry", x: 30, y: 50, vi: "cảm thấy rất có lỗi" }
      ]
    },
    {
      scene_id: "scene_6",
      title_en: "Scene 6: Learning to be Cautious",
      title_vi: "Cảnh 6: Bài Học Về Sự Thận Trọng",
      description_en: "Tom apologized to his teacher for the mistake and promised to be more cautious next time.",
      description_vi: "Tom đã xin lỗi cô giáo vì sự cố và hứa sẽ thận trọng hơn trong những lần sau.",
      image_url: "/images/week33/webtoon_scene_6.png",
      audio_sfx_url: "/audio/sfx/applause_soft.mp3",
      lexical_chunks: [
        { word: "apologized", chunk: "apologized for the mistake", x: 40, y: 40, vi: "đã xin lỗi vì sai lầm" },
        { word: "cautious", chunk: "be more cautious", x: 65, y: 50, vi: "thận trọng hơn" }
      ]
    }
  ],

  // 3. Array of 10 Cambridge Reading MCQ Comprehension Drills (Check Mode)
  check_mode_drills: [
    {
      id: "chk_w33_01",
      question: "What happened to Tom's alarm clock in the morning?",
      options: [
        "A) It stopped working because of rain.",
        "B) He broke it by accident when he woke up.",
        "C) Mia borrowed it for school.",
        "D) He fixed it with new batteries."
      ],
      answerIndex: 1
    },
    {
      id: "chk_w33_02",
      question: "Why did Tom fall on his way downstairs?",
      options: [
        "A) He slipped on a wet puddle on the floor.",
        "B) He tripped over his dog.",
        "C) He dropped his heavy shoes.",
        "D) He ran too fast with Mia."
      ],
      answerIndex: 0
    },
    {
      id: "chk_w33_03",
      question: "What was damaged when Tom dropped the orange juice?",
      options: [
        "A) His alarm clock.",
        "B) His school shoes.",
        "C) His homework notebook.",
        "D) The bus seat."
      ],
      answerIndex: 2
    },
    {
      id: "chk_w33_04",
      question: "Who found Tom's lost backpack on the bus?",
      options: [
        "A) The bus driver.",
        "B) His friend Mia.",
        "C) His teacher.",
        "D) Tom found it himself."
      ],
      answerIndex: 1
    },
    {
      id: "chk_w33_05",
      question: "What lesson did Tom learn at the end of the story?",
      options: [
        "A) To ignore his mistakes.",
        "B) To stay at home on bad days.",
        "C) To be more cautious and careful in the future.",
        "D) To buy a new backpack every week."
      ],
      answerIndex: 2
    },
    {
      id: "chk_w33_06",
      question: "What adjective best describes Tom's behavior in the morning?",
      options: [
        "A) Clumsy and in a hurry.",
        "B) Slow and calm.",
        "C) Angry and loud.",
        "D) Cautious and prepared."
      ],
      answerIndex: 0
    },
    {
      id: "chk_w33_07",
      question: "Where did Tom leave his lost backpack?",
      options: [
        "A) In the kitchen.",
        "B) On the bus seat.",
        "C) Under his bed.",
        "D) At the front gate."
      ],
      answerIndex: 1
    },
    {
      id: "chk_w33_08",
      question: "What did Tom do when he realized he made a mistake?",
      options: [
        "A) He blamed his friend Mia.",
        "B) He apologized to his teacher.",
        "C) He ran out of the classroom.",
        "D) He broke another clock."
      ],
      answerIndex: 1
    },
    {
      id: "chk_w33_09",
      question: "Which irregular verb is the past tense of 'fall'?",
      options: [
        "A) fallen",
        "B) fell",
        "C) falling",
        "D) falled"
      ],
      answerIndex: 1
    },
    {
      id: "chk_w33_10",
      question: "Which word means 'being very careful to avoid danger or mistakes'?",
      options: [
        "A) Careless",
        "B) Clumsy",
        "C) Cautious",
        "D) Ignore"
      ],
      answerIndex: 2
    }
  ]
};
