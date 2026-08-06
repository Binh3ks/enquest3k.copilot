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
              template: "Awesome! First, do you remember how deep our submarine dove into the ocean? Say: We dove down 300 metres, or We dove deep into the ocean",
              hints: ["dove", "down", "300 metres", "deep", "ocean"]
            },
            {
              template: "That was a deep dive! What magnificent things did we see underwater? Say: We saw colourful fish, or We saw magnificent coral reefs",
              hints: ["saw", "coral reefs", "colourful", "fish", "magnificent"]
            },
            {
              template: "It was beautiful! What unexpected place did we find inside the ocean? Say: We found an underwater cave, or We found a hidden passage",
              hints: ["found", "underwater", "cave", "unexpected", "secret"]
            },
            {
              template: "Exciting! What special treasure did we find inside the cave? Say: We found a gold compass, or We found ancient objects",
              hints: ["found", "gold", "compass", "ancient", "objects"]
            },
            {
              template: "What an incredible discovery! What did we take of the compass and cave? Say: We took many photos, or We took pictures of everything",
              hints: ["took", "photos", "pictures", "compass", "discovery"]
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
              template: "Where did those old objects come from? Say: They came from ancient ships, or They came from sunken ships",
              hints: ["came", "from", "ancient", "ships", "sunken"]
            },
            {
              template: "What happened when we came back to the surface? Say: We came back safely, or We came back to the surface",
              hints: ["came", "came back", "safely", "surface"]
            },
            {
              template: "What did we give to the museum when we returned? Say: We gave our findings to the museum, or We gave the gold compass to the museum",
              hints: ["gave", "findings", "museum", "gold compass"]
            },
            {
              template: "What did we make from our ocean trip? Say: We made an important discovery, or We made great memories",
              hints: ["made", "important", "discovery", "memories"]
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
              template: "I love exploring with you! What do you want to plan for our next adventure? Say: I want to plan another dive, or I want to explore a new island",
              hints: ["began", "plan", "next", "dive", "adventure"]
            },
            {
              template: "Finish this sentence: I ___ on an adventure I will never forget! Say: went on, or had",
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
              template: "Fantastic! Where did I go on my long journey in the 1200s? Say: You went from Italy to China, or You went on the Silk Road",
              hints: ["went", "from Italy", "to China", "Silk Road"]
            },
            {
              template: "That was a long trip! How many years did my journey take? Say: Your journey took almost 24 years, or It took 24 years",
              hints: ["took", "24 years", "almost"]
            },
            {
              template: "Indeed! How did I travel across high mountains and hot deserts? Say: You rode horses across mountains, or You rode across deserts",
              hints: ["rode", "horses", "across", "mountains", "deserts"]
            },
            {
              template: "It was a challenging ride! Who did I meet along the Silk Road? Say: You met merchants and kings, or You met famous artists",
              hints: ["met", "merchants", "kings", "artists"]
            },
            {
              template: "Fascinating people! What did I do after seeing all those amazing places? Say: You wrote about everything you saw, or You wrote a famous book",
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
              template: "What did the emperor in China give me? Say: He gave you an important job, or He gave you a special mission",
              hints: ["gave", "important", "job", "special", "mission"]
            },
            {
              template: "How did I do my job in China? Say: You took the job very seriously, or You became a government official",
              hints: ["took", "job", "seriously", "government", "official"]
            },
            {
              template: "What did I become in China? Say: You became a trusted messenger, or You became an official",
              hints: ["became", "trusted", "messenger", "official"]
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
              template: "What happened when people found my writings years later? Say: They found your writings and knew it was true, or Your book inspired many explorers",
              hints: ["found", "writings", "knew", "everything", "true"]
            },
            {
              template: "I am glad my journey inspired so many! If you met me back then, what would you ask me? Say: I would ask about China, or I would ask about your horses",
              hints: ["inspired", "explorers", "book", "Asia", "told"]
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
      opening_narrative: "Now it is YOUR turn! Tell me about an adventure YOU went on. Where did you go? What did you see? Say: I went on a trip to the beach, or We went on a camping trip",
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
      title: "My Greatest Adventure",
      emoji: "🌋",
      seed_question: "Tell me about an adventure or trip you went on in your life! Where did you go?",
      text_en: "What adventures have you had?",
      text_vi: "Bạn đã có những cuộc phiêu lưu nào?",
      hint_en: "I went to the beach... We went camping in the mountains...",
      hint_vi: "Tôi đi bãi biển... Tôi đi cắm trại ở núi...",
      frames: [
        {
          frame: 1,
          prompt_en: "Tell me about an adventure or trip you went on in your life! Where did you go? Say: I went to the beach, or We went camping in the mountains",
          hint_en: "I went to the beach... We went camping in the mountains...",
          target_vocab: ["went", "beach", "trip", "mountains"]
        },
        {
          frame: 2,
          prompt_en: "That sounds exciting! How did you travel on your trip? Say: We went by car, or We rode bicycles",
          hint_en: "We went by car... We rode bicycles...",
          target_vocab: ["went", "by car", "rode", "bicycles"]
        },
        {
          frame: 3,
          prompt_en: "Fun way to travel! What amazing things did you see or do there? Say: I saw beautiful mountains, or We found a campfire",
          hint_en: "I saw beautiful mountains... We found a campfire...",
          target_vocab: ["saw", "beautiful", "mountains", "found", "campfire"]
        },
        {
          frame: 4,
          prompt_en: "What great memories! Who did you share this trip with? Say: I went with my family, or I went with my best friends",
          hint_en: "I went with my family... I went with my best friends...",
          target_vocab: ["went", "family", "friends"]
        }
      ]
    },
    {
      id: 2,
      title: "Places to Explore",
      emoji: "🧭",
      seed_question: "If you could explore anywhere in the world, where would you go?",
      text_en: "Where would you like to explore?",
      text_vi: "Bạn muốn khám phá ở đâu?",
      hint_en: "I would explore the deep ocean... I would explore the jungle...",
      hint_vi: "Tôi muốn khám phá đại dương... Tôi muốn khám phá rừng rậm...",
      frames: [
        {
          frame: 1,
          prompt_en: "If you could explore anywhere in the world, where would you go? Say: I would explore the deep ocean, or I would explore the jungle",
          hint_en: "I would explore the deep ocean... I would explore the jungle...",
          target_vocab: ["explore", "deep ocean", "jungle"]
        },
        {
          frame: 2,
          prompt_en: "Great destination! Why would you like to explore there? Say: Because I want to find hidden treasure, or Because I want to see wild animals",
          hint_en: "Because I want to find hidden treasure... Because I want to see wild animals...",
          target_vocab: ["find", "hidden", "treasure", "wild", "animals"]
        },
        {
          frame: 3,
          prompt_en: "Awesome! What special gear would you take with you? Say: I would take a camera and compass, or I would take a flashlight and backpack",
          hint_en: "I would take a camera and compass... I would take a flashlight...",
          target_vocab: ["take", "camera", "compass", "flashlight", "backpack"]
        },
        {
          frame: 4,
          prompt_en: "Exciting! Who would you bring as your exploration partner? Say: I would bring my best friend, or I would go with a guide",
          hint_en: "I would bring my best friend... I would go with a guide...",
          target_vocab: ["bring", "best friend", "go", "guide"]
        }
      ]
    }
  ]
};

export default week_36RealData;
