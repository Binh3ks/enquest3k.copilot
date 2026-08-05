// WEEK 36: Adventure Stories (Irregular Verbs)
// AI Tutor V28 Format — Adventure Stories
// DO NOT USE PYTHON TO CREATE THIS FILE

const week_36RealData = {
  week_id: 36,
  week_number: 36,
  title: "Adventure Stories",
  weekTitle_en: "Adventure Stories",
  weekTitle_vi: "Nhung Cau Chuyen Phieu Luu",
  topic: "Adventure stories — submarine dives, underwater caves, Marco Polo on the Silk Road, irregular past tense verbs",
  topic_vi: "Cau chuyen phieu luu — tau ngam, hang dong duoi nuoc, Marco Polo tren Con duong To lua, dong tu bat quy tac qua khu",
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
    "saw magnificent",
    "found something unexpected",
    "wrote down everything",
    "came back to the surface",
    "gave our findings to",
    "made an important discovery",
    "began to plan",
    "took our breath away",
    "spoke many languages",
    "inspired many other adventurers"
  ],

  target_vocab: [
    { word: "submarine", pronunciation: "/ˈsʌbməriːn/", definition_vi: "tau ngam", definition_en: "a ship that can travel underwater" },
    { word: "coral reef", pronunciation: "/ˈkɔrəl riːf/", definition_vi: "ran san ho", definition_en: "colourful underwater structures built by tiny sea animals" },
    { word: "compass", pronunciation: "/ˈkʌmpəs/", definition_vi: "la ban", definition_en: "a tool that shows direction using a magnetic needle" },
    { word: "museum", pronunciation: "/mjuːˈziːəm/", definition_vi: "bao tang", definition_en: "a place where old and interesting objects are kept and shown" },
    { word: "discovery", pronunciation: "/dɪˈskʌvəri/", definition_vi: "phat hien", definition_en: "something new and exciting that someone finds" }
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
      title_vi: "Hang Dong Duoi Nuoc",
      theme: "Describing an underwater adventure using irregular verbs",
      type: "story",
      character: {
        name: "Nova - Adventure Guide",
        attributes: {
          found_cave: true,
          saw_coral_reefs: true,
          found_gold_compass: true,
          gave_to_museum: true
        },
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
            "Where did you go on your submarine adventure? That sounds amazing! Say: I went on a submarine trip, or We went to the deep ocean",
            "How deep did you dive? Wow! Say: We dove down 300 metres, or We dove deep into the ocean",
            "What did you see underwater? That sounds beautiful! Say: We saw coral reefs, or We saw colourful fish",
            "Did you see anything unexpected? That is exciting! Say: We found something unexpected, or We found a cave",
            "Use WROTE to describe your notebook! Say: We wrote down everything we found, or I wrote down all the things I saw"
          ]
        },
        {
          phase: "inside_the_cave",
          turns: "6-9",
          phase_name: "Inside the Cave",
          focus: "Finding treasure using irregular verbs: found, took, came",
          goal: "Student describes treasures using irregular past tense",
          phase_questions: [
            "What did you find inside the cave? That sounds incredible! Say: We found old objects, or We found a gold compass",
            "Where did the objects come from? Fascinating! Say: They came from ancient ships, or They came from ships that sank long ago",
            "What did you take? That is a great discovery! Say: We took many photos, or I took pictures of everything",
            "Finish this sentence: The best find ___ our breath! Say: took our breath away, or took our breath"
          ]
        },
        {
          phase: "back_home",
          turns: "10-14",
          phase_name: "Coming Back Home",
          focus: "Returning and sharing the discovery using irregular verbs: came, gave, made",
          goal: "Student describes returning home and giving findings to museum",
          phase_questions: [
            "What happened when you came back? That is wonderful! Say: We came back to the surface, or We came back home safely",
            "What did you give to the museum? That is generous! Say: We gave our findings to the museum, or I gave the compass to the museum",
            "What did you make? What a great adventure! Say: We made an important discovery, or I made a great memory",
            "What will you do next? I want to hear! Say: We began to plan our next dive, or I began to plan another trip",
            "Finish: I ___ an adventure I will never forget! Say: went on, or had"
          ]
        }
      ],
      minimum_turns: 10,
      maximum_turns: 15,
      story_text: "Last summer, my family and I went on a submarine adventure. We dove down 300 metres into the deep ocean. It was dark, but our lights showed us amazing things. We saw magnificent coral reefs. Thousands of colourful fish swam around us. Then we found something unexpected — an underwater cave! We rode into the cave and saw old objects. They came from ancient ships. The best find was a gold compass from the 1500s. We gave our findings to the museum. When we came back to the surface, we knew we had made an important discovery.",
      story_text_vi: "Mua he nam ngoai, gia dinh toi di phiieu luu bang tau ngam. Chung toi lan xuong 300 met duoi day dai duong. Chung toi thay ran san ho huy hon va ca nhieu mau. Roi chung toi tim thay mot hang dong duoi nuoc! Chung toi vao hang va thay nhung vat co. Chung den tu nhung tau cu. Phat hien hay nhat la mot la ban vang tu the ky 16. Chung toi trao phat hien cho bao tang. Khi tro ve mat nuoc, chung toi biet minh da tao ra mot phat hien quan trong."
    },
    {
      mission_id: 2,
      id: 2,
      title: "Marco Polo Journey",
      title_en: "Marco Polo Journey",
      title_vi: "Hanh Trinh Marco Polo",
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
            "Where did you go on your journey? That sounds long! Say: I went from Italy to China, or I went to China on the Silk Road",
            "How did you travel? That sounds hard! Say: I rode across mountains, or I rode horses on the Silk Road",
            "What did you see on the Silk Road? Amazing! Say: I saw many different things, or I saw amazing markets",
            "Who did you meet? That sounds interesting! Say: I met merchants and kings, or I met many interesting people",
            "Use WROTE to describe your book! Say: I wrote about everything I saw, or I wrote a famous book"
          ]
        },
        {
          phase: "in_china",
          turns: "6-9",
          phase_name: "Life in China",
          focus: "Using irregular verbs: gave, took, became, won",
          goal: "Student describes Marco Polo in China using irregular verbs",
          phase_questions: [
            "What did the emperor give you? That is important! Say: He gave me an important job, or He gave me a special mission",
            "How did you do the job? That is impressive! Say: I took the job very seriously, or I became a government official",
            "What did you become? Excellent! Say: I became a messenger, or I became a government official",
            "Use WON to describe trust! Say: I won the emperor trust, or I won his trust completely"
          ]
        },
        {
          phase: "coming_home",
          turns: "10-14",
          phase_name: "Coming Back to Venice",
          focus: "Returning and inspiring others: came, found, told, inspired",
          goal: "Student describes return and legacy using irregular verbs",
          phase_questions: [
            "When you came back, what happened? That is interesting! Say: I came back to Venice, or I came home after 24 years",
            "Did people believe your stories? Poor you! Say: People said I made up stories, or Nobody believed me at first",
            "But then what happened? That is wonderful! Say: People found my writings and knew everything was true",
            "Your book inspired many people! Say: My book told people about China, or My stories inspired many explorers",
            "Finish this sentence: Marco Polo ___ to become one of history most famous explorers! Say: went on"
          ]
        }
      ],
      minimum_turns: 10,
      maximum_turns: 15,
      story_text: "Marco Polo went from Italy to China in the 1200s. His journey took almost 24 years. He rode across high mountains and hot deserts on the Silk Road. He saw amazing and unusual things. He met merchants, kings, and artists. He spoke many languages and wrote about everything. In China, Kublai Khan gave Marco an important job. Marco took the job very seriously. When he came back to Venice, people said he made up his stories. But they found his writings and knew everything was true.",
      story_text_vi: "Marco Polo di tu Y den Trung Quoc vao the ky 13. Hanh trinh gan 24 nam. Ong cuoi ngua qua nui cao va sa mac nong tren Con duong To lua. Ong thay nhieu thu tuyet voi. Ong gap thuong nhan, vua, va nghe si. Ong noi nhieu ngon ngu va viet ve moi thu. Ong tro thanh quan chuc chinh phu."
    },
    {
      mission_id: 3,
      id: 3,
      title: "Your Adventure Story",
      title_en: "Your Adventure Story",
      title_vi: "Cau Chuyen Phieu Luu Cua Ban",
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
          ai_prompts: [
            "Where did you go on your adventure? Tell me about your trip! Say: I went to..., or We went on a trip to...",
            "How did you travel there? That sounds exciting! Say: I rode..., or We drove..., or We went by...",
            "Who did you go with? Nice! Say: I went with my..., or My friends and I went...",
            "What happened when you arrived? Tell me! Say: When I came to..., I saw..."
          ]
        },
        {
          phase: "what_you_saw",
          turns: "5-8",
          phase_name: "What You Saw",
          focus: "Using SAW, FOUND to describe discoveries",
          goal: "Student describes what they saw using irregular verbs",
          ai_prompts: [
            "What did you see on your adventure? Amazing! Say: I saw..., or We saw...",
            "Did you find anything special? That sounds incredible! Say: I found..., or We found something unexpected",
            "Did you take photos? What a memory! Say: I took many photos, or I took pictures of everything",
            "Use WROTE to describe your notes! Say: I wrote down everything I found"
          ]
        },
        {
          phase: "coming_back",
          turns: "9-12",
          phase_name: "Coming Back",
          focus: "Using CAME, GAVE, MADE to describe return",
          goal: "Student describes returning home and sharing discoveries",
          ai_prompts: [
            "When you came back, how did you feel? That sounds wonderful! Say: I came back home feeling happy, or I came back with many memories",
            "What did you give to someone? That is generous! Say: I gave my photos to..., or I gave my story to...",
            "What did you make from this adventure? Great thinking! Say: I made great memories, or I made new friends",
            "Tell me one last thing about your adventure! Say: It was the best adventure ever, or I began to plan my next trip"
          ]
        }
      ],
      minimum_turns: 8,
      maximum_turns: 12,
      story_text: "This is YOUR adventure! You went somewhere exciting. You saw amazing things. You found unexpected treasures. You took photos. You came back home. You gave your findings to someone. You made great memories. What an incredible adventure it was!",
      story_text_vi: "Day la cuoc phieu luu cua BAN! Ban di noi thu vi. Ban thay nhung thu tuyet voi. Ban tim thay kho bau bat ngo. Ban chup anh. Ban tro ve nha. Ban trao phat hien cho nguoi khac. Ban tao ra ky niem tuyet voi."
    }
  ],

  spark_talk: [
    {
      id: 1,
      text_en: "What adventures have you had?",
      text_vi: "Ban da co nhung cuoc phieu luu nao?",
      hint_en: "I went on... I saw...",
      hint_vi: "Toi di... Toi thay..."
    },
    {
      id: 2,
      text_en: "Where would you like to explore?",
      text_vi: "Ban muon kham pha o dau?",
      hint_en: "I would go to... I would find...",
      hint_vi: "Toi se den... Toi se tim..."
    },
    {
      id: 3,
      text_en: "What is the most exciting place you have seen?",
      text_vi: "Noi thu vi nhat ban da thay la o dau?",
      hint_en: "I saw... It was amazing because...",
      hint_vi: "Toi thay... No tuyet voi vi..."
    },
    {
      id: 4,
      text_en: "Tell me about a time you found something special.",
      text_vi: "Hay ke cho toi nghe ve lan ban tim thay dieu gi dac biet.",
      hint_en: "I found... I took photos...",
      hint_vi: "Toi tim thay... Toi chup anh..."
    },
    {
      id: 5,
      text_en: "If you could travel anywhere, where would you go?",
      text_vi: "Neu ban co the di bat cu dau, ban se den dau?",
      hint_en: "I would go to... I would see...",
      hint_vi: "Toi se den... Toi se thay..."
    }
  ],

  freetalk_knowledge: {
    vocabulary: ["submarine", "cave", "compass", "museum", "adventure", "explorer", "treasure", "journey"],
    irregular_verbs: ["went", "saw", "took", "came", "found", "wrote", "gave", "made", "rode", "spoke"],
    topics: ["underwater exploration", "Marco Polo", "Silk Road", "ancient ships", "gold compass", "coral reefs"]
  }
};

export default week_36RealData;
