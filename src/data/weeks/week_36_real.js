// WEEK 36: Adventure Stories (Irregular Verbs)
// AI Tutor V28 Format — Adventure Stories
// DO NOT USE PYTHON TO CREATE THIS FILE

const week_36RealData = {
  week_id: 36,
  week_number: 36,
  title: "Adventure Stories",
  weekTitle_en: "Adventure Stories",
  weekTitle_vi: "Những Câu Chuyện Phiêu Lưu",
  topic: "Adventure stories — submarine dives, underwater caves, Marco Polo on the Silk Road, irregular past tense verbs",
  topic_vi: "Câu chuyện phiêu lưu — tàu ngầm, hang động dưới nước, Marco Polo trên Con đường Tơ lụa, động từ bất quy tắc quá khứ",
  theme: "adventure_stories",
  grammar_focus: "Irregular Verbs (5 groups: go/went, see/saw, take/took, come/came, find/found)",
  grammar_pattern: "I went to the museum. We saw amazing things. He took many photos.",
  grammar_examples: [
    "I went on a submarine adventure.",
    "We saw beautiful coral reefs underwater.",
    "They found a gold compass from the 1500s."
  ],

  chunk_focus: [
    "went on an adventure",
    "dove down into",
    "magnificent coral reefs",
    "found something unexpected",
    "wrote down",
    "came back",
    "gave all our findings",
    "made an important discovery",
    "began to plan",
    "took our breath away",
    "spoke many languages",
    "inspired many adventurers"
  ],

  target_vocab: [
    { word: "submarine", pronunciation: "/ˈsʌbməriːn/", definition_vi: "tàu ngầm", definition_en: "a ship that can travel underwater" },
    { word: "coral reef", pronunciation: "/ˈkɔrəl riːf/", definition_vi: "rạn san hô", definition_en: "colourful underwater structures built by tiny sea animals" },
    { word: "compass", pronunciation: "/ˈkʌmpəs/", definition_vi: "la bàn", definition_en: "a tool that shows direction using a magnetic needle" },
    { word: "museum", pronunciation: "/mjuːˈziːəm/", definition_vi: "bảo tàng", definition_en: "a place where old and interesting objects are kept and shown" },
    { word: "discovery", pronunciation: "/dɪˈskʌvəri/", definition_vi: "phát hiện", definition_en: "something new and exciting that someone finds" }
  ],

  voice_character: {
    name: "Nova - Adventure Guide",
    personality: "Excited, adventurous, patient, uses British expressions like brilliant, lovely, well done.",
    speaking_style: "Warm, encouraging, uses irregular verbs in every response, empathetic about challenges",
    v28_format_notes: "W36 follows V28 schema. Theme: adventure_stories. Grammar: Irregular Verbs (went/saw/took/came/found). IMPORTANT: Never say Great! after a student describes a scary or negative experience. Use Oh no! or That sounds scary! or I am sorry to hear that."
  },

  knowledge_base: [
    "Irregular past tense verbs: go→went, see→saw, take→took, come→came, find→found, write→wrote, give→gave, ride→rode, speak→spoke, make→made",
    "IMPORTANT — Use these chunks in conversation: 'went on an adventure', 'dove down into', 'saw magnificent', 'found something unexpected', 'wrote down everything', 'came back to the surface', 'gave our findings to', 'made an important discovery'",
    "IMPORTANT — Empathetic responses required. When a student describes a scary or negative experience, say 'I am sorry to hear that' or 'That sounds scary'. NEVER say 'Great!' after a student describes injury, fear, or negative events.",
    "Adventure vocabulary: submarine, coral reef, compass, museum, discovery, Silk Road, merchant, explorer",
    "Marco Polo traveled from Venice to China along the Silk Road. He saw amazing things, met merchants, and wrote about his journey.",
    "Everyone can be an explorer — even in your own town, you can discover new things every day"
  ],

  story_character: {
    name: "Nova - Adventure Guide",
    personality: "Excited about adventures, patient, uses irregular verbs naturally, empathetic about scary experiences",
    backstory: "I am Nova, your AI English teacher. I love adventures and exploring new places. Today we will learn about amazing adventures using irregular past tense verbs!",
    speaking_style: "Warm, encouraging, uses irregular verbs in every response, empathetic when students describe difficulties",
    facts: {
      loves_adventures: true,
      teaches_irregular_verbs: true,
      cares_about_students: true,
      favorite_phrase: "What an adventure!"
    },
    role: "Adventure guide who helps students practice irregular verbs through storytelling"
  },

  story_missions: [
    {
      mission_id: 1,
      id: 1,
      title: "The Underwater Cave",
      title_en: "The Underwater Cave",
      title_vi: "Hang Động Dưới Nước",
      theme: "Describing an underwater adventure using irregular verbs",
      type: "story",
      character: {
        name: "Nova - Adventure Guide",
        role: "Guide who explored a submarine cave and found treasures"
      },
      opening_narrative: "Hello! I am Nova. Last summer, I went on an amazing submarine adventure. We dove down 300 metres into the deep ocean. We saw magnificent coral reefs and colourful fish. Then we found something unexpected — an underwater cave! Want to hear about my adventure?",
      story_arc: [
        {
          phase: "the_dive",
          turns: "1-5",
          phase_name: "Going Underwater",
          focus: "Describing the dive using irregular verbs: went, dove, saw",
          goal: "Student retells the dive using irregular past tense",
          phase_questions: [
            {
              template: "Where did we go on our submarine trip? That sounds amazing! Say: We went to the deep ocean, or We went on a submarine trip",
              hints: ["went", "submarine", "trip", "deep ocean", "adventure"]
            },
            {
              template: "How deep did we dive? Wow! Say: We dove down 300 metres, or We dove deep into the ocean",
              hints: ["dove", "down", "300 metres", "deep", "ocean"]
            },
            {
              template: "What did we see underwater? That sounds beautiful! Say: We saw magnificent coral reefs, or We saw colourful fish",
              hints: ["saw", "coral reefs", "colourful", "fish", "magnificent"]
            },
            {
              template: "Did we find anything unexpected inside the ocean? That is exciting! Say: We found an underwater cave, or We found an ancient secret",
              hints: ["found", "underwater", "cave", "unexpected", "secret"]
            },
            {
              template: "What did we write in our notebook? Say: We wrote down everything we saw, or We wrote down our findings",
              hints: ["wrote", "wrote down", "everything", "saw", "findings"]
            }
          ]
        },
        {
          phase: "inside_the_cave",
          turns: "6-9",
          phase_name: "Inside the Cave",
          focus: "Finding treasure using irregular verbs: found, took, came",
          goal: "Student describes treasures using irregular past tense",
          phase_questions: [
            {
              template: "What did we find inside the underwater cave? That sounds incredible! Say: We found a gold compass, or We found ancient objects",
              hints: ["found", "gold", "compass", "ancient", "objects"]
            },
            {
              template: "Where did those old objects come from? Fascinating! Say: They came from ancient ships, or They came from sunken ships",
              hints: ["came", "from", "ancient", "ships", "sunken"]
            },
            {
              template: "What did we take of everything in the cave? That is a great discovery! Say: We took many photos, or We took pictures of the compass",
              hints: ["took", "photos", "pictures", "compass", "discovery"]
            },
            {
              template: "Finish this sentence: The best find ___ our breath away! Say: took our breath away, or took our breath",
              hints: ["took", "our", "breath", "away", "find"]
            }
          ]
        },
        {
          phase: "back_home",
          turns: "10-14",
          phase_name: "Coming Back Home",
          focus: "Returning and sharing the discovery using irregular verbs: came, gave, made",
          goal: "Student describes returning home and giving findings to museum",
          phase_questions: [
            {
              template: "What happened when we came back to the surface? That is wonderful! Say: We came back safely, or We came back to the surface",
              hints: ["came", "came back", "safely", "surface"]
            },
            {
              template: "What did we give to the museum? That is generous! Say: We gave our findings to the museum, or We gave the gold compass to the museum",
              hints: ["gave", "findings", "museum", "gold compass"]
            },
            {
              template: "What did we make from our ocean trip? What a great adventure! Say: We made an important discovery, or We made great memories",
              hints: ["made", "important", "discovery", "memories"]
            },
            {
              template: "What did we begin to plan next? Say: We began to plan our next dive, or We began to plan another adventure",
              hints: ["began", "plan", "next", "dive", "adventure"]
            },
            {
              template: "Finish: I ___ on an adventure I will never forget! Say: went on, or had",
              hints: ["went", "went on", "adventure", "never forget"]
            }
          ]
        }
      ],
      minimum_turns: 10,
      maximum_turns: 15,
      story_text: "Last summer, my family and I went on a submarine adventure. We dove down 300 metres into the deep ocean. It was dark, but our lights showed us amazing things. We saw magnificent coral reefs. Thousands of colourful fish swam around us. Then we found something unexpected — an underwater cave! We rode into the cave and saw old objects. They came from ancient ships. The best find was a gold compass from the 1500s. We gave our findings to the museum. When we came back to the surface, we knew we had made an important discovery.",
      story_text_vi: "Mùa hè năm ngoái, gia đình tôi đi phiêu lưu bằng tàu ngầm. Chúng tôi lặn xuống 300 mét dưới đáy đại dương. Chúng tôi thấy rạn san hô hùng vĩ và cá nhiều màu. Rồi chúng tôi tìm thấy một hang động dưới nước! Chúng tôi vào hang và thấy những vật cổ. Chúng đến từ những tàu cũ. Phát hiện hay nhất là một la bàn vàng từ thế kỷ 16. Chúng tôi trao phát hiện cho bảo tàng. Khi trở về mặt nước, chúng tôi biết mình đã tạo ra một phát hiện quan trọng."
    },
    {
      mission_id: 2,
      id: 2,
      title: "Marco Polo Journey",
      title_en: "Marco Polo Journey",
      title_vi: "Hành Trình Marco Polo",
      theme: "Telling Marco Polo story using irregular verbs",
      type: "practice",
      character: {
        name: "Marco Polo - Explorer",
        role: "A famous explorer who travelled on the Silk Road"
      },
      opening_narrative: "Hello! I am Marco Polo. I went from Italy to China in the 1200s. My journey took almost 24 years! I rode across mountains and deserts. I met merchants, kings, and artists. I spoke many languages and wrote about everything I saw. Want to hear my story?",
      story_arc: [
        {
          phase: "the_journey",
          turns: "1-5",
          phase_name: "Travelling the Silk Road",
          focus: "Describing travel using irregular verbs: went, rode, saw, met",
          goal: "Student retells journey using irregular past tense",
          phase_questions: [
            {
              template: "Where did I go on my long journey? That sounds long! Say: You went from Italy to China, or You went on the Silk Road",
              hints: ["went", "from Italy", "to China", "Silk Road"]
            },
            {
              template: "How did I travel across mountains and deserts? Say: You rode horses across mountains, or You rode across hot deserts",
              hints: ["rode", "horses", "across", "mountains", "deserts"]
            },
            {
              template: "What did I see on the Silk Road? Amazing! Say: You saw magnificent markets, or You saw amazing cities",
              hints: ["saw", "magnificent", "markets", "cities", "Silk Road"]
            },
            {
              template: "Who did I meet during my 24-year journey? Say: You met merchants and kings, or You met famous artists",
              hints: ["met", "merchants", "kings", "artists"]
            },
            {
              template: "What did I write after I saw everything? Say: You wrote about everything you saw, or You wrote a famous book",
              hints: ["wrote", "book", "everything", "saw"]
            }
          ]
        },
        {
          phase: "in_china",
          turns: "6-9",
          phase_name: "Life in China",
          focus: "Using irregular verbs: gave, took, became, won",
          goal: "Student describes Marco Polo in China using irregular verbs",
          phase_questions: [
            {
              template: "What did the emperor in China give me? That is important! Say: He gave you an important job, or He gave you a special mission",
              hints: ["gave", "important", "job", "special", "mission"]
            },
            {
              template: "How did I do my job in China? Say: You took the job very seriously, or You became a government official",
              hints: ["took", "job", "seriously", "government", "official"]
            },
            {
              template: "What did I become in China? Excellent! Say: You became a trusted messenger, or You became an official",
              hints: ["became", "trusted", "messenger", "official"]
            },
            {
              template: "Use WON to describe my trust! Say: You won the emperor trust, or You won his trust completely",
              hints: ["won", "emperor", "trust", "completely"]
            }
          ]
        },
        {
          phase: "coming_home",
          turns: "10-14",
          phase_name: "Coming Back to Venice",
          focus: "Returning and inspiring others: came, found, told, inspired",
          goal: "Student describes return and legacy using irregular verbs",
          phase_questions: [
            {
              template: "What happened when I came back to Venice? Say: You came back to Venice after 24 years, or You came home safely",
              hints: ["came", "came back", "Venice", "24 years", "safely"]
            },
            {
              template: "Did people believe my stories at first? Say: Nobody believed you at first, or People thought you made up stories",
              hints: ["believed", "stories", "made up", "at first"]
            },
            {
              template: "What happened when people found my writings later? Say: They found your writings and knew everything was true",
              hints: ["found", "writings", "knew", "everything", "true"]
            },
            {
              template: "What did my book do for future explorers? Say: Your book inspired many explorers, or Your book told people about Asia",
              hints: ["inspired", "explorers", "book", "Asia", "told"]
            },
            {
              template: "Finish this sentence: Marco Polo ___ on to become one of history most famous explorers! Say: went on, or continued",
              hints: ["went", "went on", "famous", "explorers"]
            }
          ]
        }
      ],
      minimum_turns: 10,
      maximum_turns: 15,
      story_text: "Marco Polo went from Italy to China in the 1200s. His journey took almost 24 years. He rode across high mountains and hot deserts on the Silk Road. He saw amazing and unusual things. He met merchants, kings, and artists. He spoke many languages and wrote about everything. In China, Kublai Khan gave Marco an important job. Marco took the job very seriously. When he came back to Venice, people said he made up his stories. But they found his writings and knew everything was true.",
      story_text_vi: "Marco Polo đi từ Ý đến Trung Quốc vào thế kỷ 13. Hành trình gần 24 năm. Ông cưỡi ngựa qua núi cao và sa mạc nóng trên Con đường Tơ lụa. Ông thấy nhiều thứ tuyệt vời. Ông gặp thương nhân, vua, và nghệ sĩ. Ông nói nhiều ngôn ngữ và viết về mọi thứ. Ông trở thành quan chức chính phủ."
    },
    {
      mission_id: 3,
      id: 3,
      title: "Your Adventure Story",
      title_en: "Your Adventure Story",
      title_vi: "Câu Chuyện Phiêu Lưu Của Bạn",
      theme: "Student creates their own adventure story using irregular verbs",
      type: "creative",
      character: {
        name: "Nova - Adventure Guide",
        role: "A guide who encourages students to tell their own adventure stories"
      },
      opening_narrative: "Now it is YOUR turn! Tell me about an adventure YOU went on. Where did you go? What did you see? What did you find? Use irregular verbs: went, saw, found, took, came, gave, made. I cannot wait to hear your story!",
      story_arc: [
        {
          phase: "where_you_went",
          turns: "1-4",
          phase_name: "Where You Went",
          focus: "Using WENT, CAME to describe destination",
          goal: "Student describes their adventure destination using irregular verbs",
          phase_questions: [
            {
              template: "Where did you go on your adventure? Tell me! Say: I went to the beach, or We went on a trip to the mountains",
              hints: ["went", "beach", "trip", "mountains", "adventure"]
            },
            {
              template: "How did you travel there? That sounds exciting! Say: We rode bicycles, or We drove by car, or We went by bus",
              hints: ["rode", "drove", "went", "bicycles", "car", "bus"]
            },
            {
              template: "Who did you go with on your adventure? Say: I went with my family, or My friends and I went together",
              hints: ["went", "family", "friends", "together"]
            },
            {
              template: "What happened when you came to your destination? Say: When I came there, I saw amazing things",
              hints: ["came", "saw", "amazing", "things"]
            }
          ]
        },
        {
          phase: "what_you_saw",
          turns: "5-8",
          phase_name: "What You Saw",
          focus: "Using SAW, FOUND to describe discoveries",
          goal: "Student describes what they saw using irregular verbs",
          phase_questions: [
            {
              template: "What did you see on your adventure? Amazing! Say: I saw beautiful nature, or We saw old buildings",
              hints: ["saw", "beautiful", "nature", "buildings"]
            },
            {
              template: "Did you find anything special? That sounds incredible! Say: I found a colourful shell, or We found something unexpected",
              hints: ["found", "colourful", "shell", "unexpected"]
            },
            {
              template: "Did you take photos of your discovery? Say: I took many photos, or I took pictures of everything",
              hints: ["took", "photos", "pictures", "discovery"]
            },
            {
              template: "What did you write in your journal? Say: I wrote down everything I saw, or I wrote a daily story",
              hints: ["wrote", "wrote down", "everything", "journal"]
            }
          ]
        },
        {
          phase: "coming_back",
          turns: "9-12",
          phase_name: "Coming Back",
          focus: "Using CAME, GAVE, MADE to describe return",
          goal: "Student describes returning home and sharing discoveries",
          phase_questions: [
            {
              template: "When you came back home, how did you feel? Say: I came back home feeling happy, or I came back with great memories",
              hints: ["came", "came back", "happy", "memories"]
            },
            {
              template: "What did you give to your friends or family? Say: I gave my photos to my mother, or I gave a gift to my friend",
              hints: ["gave", "photos", "mother", "gift", "friend"]
            },
            {
              template: "What did you make from this adventure? Say: I made great memories, or I made new friends",
              hints: ["made", "great", "memories", "friends"]
            },
            {
              template: "Tell me one last thing about your trip! Say: I went on the best trip ever, or I began to plan my next adventure",
              hints: ["went", "began", "plan", "best", "adventure"]
            }
          ]
        }
      ],
      minimum_turns: 8,
      maximum_turns: 12,
      story_text: "This is YOUR adventure! You went somewhere exciting. You saw amazing things. You found unexpected treasures. You took photos. You came back home. You gave your findings to someone. You made great memories. What an incredible adventure it was!",
      story_text_vi: "Đây là cuộc phiêu lưu của BẠN! Bạn đi nơi thú vị. Bạn thấy những thứ tuyệt vời. Bạn tìm thấy kho báu bất ngờ. Bạn chụp ảnh. Bạn trở về nhà. Bạn trao phát hiện cho người khác. Bạn tạo ra kỷ niệm tuyệt vời."
    }
  ],

  spark_talk: [
    {
      id: 1,
      text_en: "What adventures have you had?",
      text_vi: "Bạn đã có những cuộc phiêu lưu nào?",
      hint_en: "I went on... I saw...",
      hint_vi: "Tôi đi... Tôi thấy..."
    },
    {
      id: 2,
      text_en: "Where would you like to explore?",
      text_vi: "Bạn muốn khám phá ở đâu?",
      hint_en: "I would go to... I would find...",
      hint_vi: "Tôi sẽ đến... Tôi sẽ tìm..."
    },
    {
      id: 3,
      text_en: "What is the most exciting place you have seen?",
      text_vi: "Nơi thú vị nhất bạn đã thấy là ở đâu?",
      hint_en: "I saw... It was amazing because...",
      hint_vi: "Tôi thấy... Nó tuyệt vời vì..."
    },
    {
      id: 4,
      text_en: "Tell me about a time you found something special.",
      text_vi: "Hãy kể cho tôi nghe về lần bạn tìm thấy điều gì đặc biệt.",
      hint_en: "I found... I took photos...",
      hint_vi: "Tôi tìm thấy... Tôi chụp ảnh..."
    },
    {
      id: 5,
      text_en: "If you could travel anywhere, where would you go?",
      text_vi: "Nếu bạn có thể đi bất cứ đâu, bạn sẽ đến đâu?",
      hint_en: "I would go to... I would see...",
      hint_vi: "Tôi sẽ đến... Tôi sẽ thấy..."
    }
  ]
};

export default week_36RealData;
