const weekData = {
  weekId: 10,
  weekTitle_en: "Rural Environments",
  weekTitle_vi: "Môi trường Nông thôn",
  grammar_focus: "Comparisons (Quieter, Less Crowded)",
  global_vocab: [],
  stations: {
    // 1. READ & EXPLORE (Câu ghép, từ vựng in đậm)
    read_explore: {
      title: "Life in the Countryside",
      image_url: "/images/week10/read_cover_w10.jpg",
      content_en: "The **countryside** is **quieter** than the city, **but** it is often **less** **crowded**. There are large green **fields** and few tall **buildings**. Life is **slower** here **because** there is **less** **traffic**. We breathe **cleaner** air **and** see many **farm animals**. My **village** is **safer** than the town, **so** I can play outside for a long time.",
      content_vi: "Vùng nông thôn thì yên tĩnh hơn thành phố, nhưng thường ít đông đúc hơn. Có những cánh đồng xanh rộng lớn và ít tòa nhà cao tầng. Cuộc sống ở đây chậm hơn vì có ít giao thông hơn. Chúng tôi hít thở không khí sạch hơn và nhìn thấy nhiều động vật nuôi ở nông trại. Làng của tôi an toàn hơn thị trấn, nên tôi có thể chơi bên ngoài lâu hơn.",
      audio_url: "/audio/week10/read_explore_main.mp3",
      comprehension_questions: [
        {
          id: 1,
          question_en: "Is the countryside more crowded than the city?",
          answer: ["No, it is less crowded."],
          hint_en: "No, it is less...",
          hint_vi: "Không, nó ít..."
        },
        {
          id: 2,
          question_en: "Why is life slower in the countryside?",
          answer: ["Because there is less traffic."],
          hint_en: "Because there is...",
          hint_vi: "Vì có ít..."
        },
        {
          id: 3,
          question_en: "What kind of animals can you see?",
          answer: ["Farm animals.", "Many farm animals."],
          hint_en: "Farm...",
          hint_vi: "Nông trại..."
        }
      ]
    },
    // 2. NEW WORDS
    new_words: {
      vocab: [
        { id: 1, word: "countryside", image_url: "/images/week10/countryside.jpg", definition_en: "The land outside cities.", definition_vi: "Vùng nông thôn", pronunciation: "/ˈkʌntrɪsaɪd/", example: "I live in the countryside.", collocation: "green countryside", audio_word: "/audio/week10/vocab_countryside.mp3", audio_def: "/audio/week10/vocab_def_countryside.mp3", audio_coll: "/audio/week10/vocab_coll_countryside.mp3" },
        { id: 2, word: "field", image_url: "/images/week10/field.jpg", definition_en: "An area of open land.", definition_vi: "Cánh đồng", pronunciation: "/fiːld/", example: "We walk across the field.", collocation: "green field", audio_word: "/audio/week10/vocab_field.mp3", audio_def: "/audio/week10/vocab_def_field.mp3", audio_coll: "/audio/week10/vocab_coll_field.mp3" },
        { id: 3, word: "quiet", image_url: "/images/week10/quiet.jpg", definition_en: "Making little noise.", definition_vi: "Yên tĩnh", pronunciation: "/ˈkwaɪət/", example: "The village is quiet.", collocation: "very quiet", audio_word: "/audio/week10/vocab_quiet.mp3", audio_def: "/audio/week10/vocab_def_quiet.mp3", audio_coll: "/audio/week10/vocab_coll_quiet.mp3" },
        { id: 4, word: "cleaner", image_url: "/images/week10/cleaner.jpg", definition_en: "More clean (air or water).", definition_vi: "Sạch hơn", pronunciation: "/ˈkliːnə/", example: "We breathe cleaner air.", collocation: "cleaner environment", audio_word: "/audio/week10/vocab_cleaner.mp3", audio_def: "/audio/week10/vocab_def_cleaner.mp3", audio_coll: "/audio/week10/vocab_coll_cleaner.mp3" },
        { id: 5, word: "farm", image_url: "/images/week10/farm.jpg", definition_en: "Land used for growing crops.", definition_vi: "Nông trại", pronunciation: "/fɑːm/", example: "There is a cow on the farm.", collocation: "local farm", audio_word: "/audio/week10/vocab_farm.mp3", audio_def: "/audio/week10/vocab_def_farm.mp3", audio_coll: "/audio/week10/vocab_coll_farm.mp3" },
        { id: 6, word: "safe", image_url: "/images/week10/safe.jpg", definition_en: "Protected from danger.", definition_vi: "An toàn", pronunciation: "/seɪf/", example: "The house is safe.", collocation: "safe place", audio_word: "/audio/week10/vocab_safe.mp3", audio_def: "/audio/week10/vocab_def_safe.mp3", audio_coll: "/audio/week10/vocab_coll_safe.mp3" },
        { id: 7, word: "slow", image_url: "/images/week10/slow.jpg", definition_en: "Moving at a low speed.", definition_vi: "Chậm", pronunciation: "/sləʊ/", example: "Snails are slow.", collocation: "move slow", audio_word: "/audio/week10/vocab_slow.mp3", audio_def: "/audio/week10/vocab_def_slow.mp3", audio_coll: "/audio/week10/vocab_coll_slow.mp3" },
        { id: 8, word: "village", image_url: "/images/week10/village.jpg", definition_en: "A small group of houses.", definition_vi: "Ngôi làng", pronunciation: "/ˈvɪlɪdʒ/", example: "My grandparents live in a village.", collocation: "peaceful village", audio_word: "/audio/week10/vocab_village.mp3", audio_def: "/audio/week10/vocab_def_village.mp3", audio_coll: "/audio/week10/vocab_coll_village.mp3" },
        { id: 9, word: "less", image_url: "/images/week10/less.jpg", definition_en: "A smaller amount.", definition_vi: "Ít hơn", pronunciation: "/lɛs/", example: "I have less money.", collocation: "less noise", audio_word: "/audio/week10/vocab_less.mp3", audio_def: "/audio/week10/vocab_def_less.mp3", audio_coll: "/audio/week10/vocab_coll_less.mp3" },
        { id: 10, word: "traffic", image_url: "/images/week10/traffic.jpg", definition_en: "Vehicles moving on a road.", definition_vi: "Giao thông", pronunciation: "/ˈtrafɪk/", example: "Heavy traffic in the city.", collocation: "heavy traffic", audio_word: "/audio/week10/vocab_traffic.mp3", audio_def: "/audio/week10/vocab_def_traffic.mp3", audio_coll: "/audio/week10/vocab_coll_traffic.mp3" }
      ]
    },
    word_match: { pairs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
    // 3. GRAMMAR (20 Câu, Comparisons)
    grammar: {
      grammar_explanation: {
        title_en: "Comparisons (Than / More / Less)",
        title_vi: "So sánh (Hơn / Kém)",
        rules: [
          { type: "rule", icon: "➕", rule_en: "The city is **busier** **than** the village.", rule_vi: "Thành phố **bận rộn hơn** làng.", example: "Short Adj + er + than" },
          { type: "rule", icon: "➖", rule_en: "The village has **less** traffic.", rule_vi: "Làng có **ít** giao thông **hơn**.", example: "Less + Uncountable Noun" },
          { type: "rule", icon: "🔗", rule_en: "The air is **cleaner** here, **so** I feel good.", rule_vi: "Không khí **sạch hơn**, **nên** tôi cảm thấy tốt.", example: "Compound Sentence with 'so'" }
        ]
      },
      exercises: [
        { id: 1, type: "fill", question: "The village is _____ (quiet) than the town.", answer: "quieter", hint: "Quiet -> Quieter" },
        { id: 2, type: "mc", question: "The city has _____ noise.", options: ["less", "more"], answer: "more", hint: "Noise is high -> more" },
        { id: 3, type: "unscramble", question: "Sort:", words: ["is", "less", "The", "traffic", "here"], answer: "There is less traffic here.", hint: "There is..." },
        { id: 4, type: "fill", question: "The air here is _____ (clean) than city air.", answer: "cleaner", hint: "Clean -> Cleaner" },
        { id: 5, type: "mc", question: "Is the village _____ crowded?", options: ["less", "more"], answer: "less", hint: "City is more crowded" },
        { id: 6, type: "fill", question: "We see _____ (more/less) green fields here.", answer: "more", hint: "Positive -> more" },
        { id: 7, type: "unscramble", question: "Sort:", words: ["is", "safer", "The", "village", "than", "town"], answer: "The village is safer than the town.", hint: "The village is..." },
        { id: 8, type: "fill", question: "The farm has _____ (more/fewer) buildings.", answer: "fewer", hint: "Buildings are countable -> fewer" },
        { id: 9, type: "mc", question: "Life is _____ in the countryside.", options: ["slow", "slower"], answer: "slower", hint: "Compare -> slower" },
        { id: 10, type: "fill", question: "There is _____ (less/more) water in the river.", answer: "more", hint: "Positive -> more" },
        { id: 11, type: "unscramble", question: "Sort:", words: ["is", "The", "air", "cleaner", "now"], answer: "The air is cleaner now.", hint: "The air..." },
        { id: 12, type: "mc", question: "I have _____ toys than my sister.", options: ["more", "less"], answer: "more", hint: "I have extra -> more" },
        { id: 13, type: "fill", question: "The rock is _____ (heavy) than the feather.", answer: "heavier", hint: "Heavy -> heavier" },
        { id: 14, type: "unscramble", question: "Sort:", words: ["village", "is", "The", "more", "beautiful"], answer: "The village is more beautiful.", hint: "The village is..." },
        { id: 15, type: "fill", question: "It is _____ (too/to) noisy to hear.", answer: "too", hint: "Too + Adj" },
        { id: 16, type: "mc", question: "The field is _____ wide.", options: ["so", "very"], answer: "very", hint: "Very + Adj" },
        { id: 17, type: "fill", question: "Make sentence: 'City / busy / village'", answer: ["The city is busier than the village.", "city is busier than village."], customCheck: true, hint: "Use 'busier than'" },
        { id: 18, type: "fill", question: "We have _____ (less/more) pollution here.", answer: "less", hint: "Less pollution" },
        { id: 19, type: "unscramble", question: "Sort:", words: ["is", "than", "My", "brother", "taller", "me"], answer: "My brother is taller than me.", hint: "My brother is..." },
        { id: 20, type: "fill", question: "Make sentence: 'Air / clean / water'", answer: ["The air is cleaner than the water.", "air is cleaner than water."], customCheck: true, hint: "Cleaner than" }
      ]
    },
    // 4. ASK AI (CONTEXT)
    ask_ai: {
      prompts: [
        { id: 1, context_vi: "Bạn muốn biết nơi nào yên tĩnh hơn: nông thôn hay thành phố.", context_en: "You want to know which place is quieter: the countryside or the city.", answer: ["Is the countryside quieter than the city?", "Which place is quieter?"], hint: "Is the countryside..." },
        { id: 2, context_vi: "Bạn muốn biết tại sao cuộc sống ở nông thôn lại chậm hơn.", context_en: "Ask why life in the country is slower.", answer: ["Why is life slower in the countryside?", "Why is it slower here?"], hint: "Why is..." },
        { id: 3, context_vi: "Bạn thấy một cánh đồng. Hỏi xem có bao nhiêu con bò ở đó.", context_en: "You see a field. Ask how many cows are there.", answer: ["How many cows are in the field?", "How many cows are there?"], hint: "How many..." },
        { id: 4, context_vi: "Hỏi bố xem không khí ở đây có sạch hơn ở thành phố không.", context_en: "Ask dad if the air here is cleaner than in the city.", answer: ["Is the air cleaner here?", "Is the air better than the city's?"], hint: "Is the air..." },
        { id: 5, context_vi: "Hỏi mẹ xem nhà mình có nhiều không gian hơn ở thành phố không.", context_en: "Ask mom if your house has more space than a city apartment.", answer: ["Do we have more space here?", "Is this house bigger than the apartment?"], hint: "Do we have..." }
      ]
    },
    // 5. LOGIC LAB (WORD PROBLEMS & OPTIONS)
    logic_lab: {
      puzzles: [
        { id: 1, type: "math", title_en: "Farm Animal Count", question_en: "The farmer has 5 cows and 3 sheep. How many animals does he have in total?", answer: ["8 animals", "8"], target_number: 8, unit: "animals", audio_url: "/audio/week10/logic_1.mp3" },
        { id: 2, type: "logic", title_en: "Traffic Comparison", question_en: "City A has 100 cars. Village B has 10 cars. Which place has less traffic?", options: ["Village B", "City A"], answer: "Village B", audio_url: "/audio/week10/logic_2.mp3" },
        { id: 3, type: "math", title_en: "Field Size", question_en: "A field is 20m long. Another field is 15m long. What is the difference in length?", answer: ["5m", "5"], target_number: 5, unit: "m", audio_url: "/audio/week10/logic_3.mp3" },
        { id: 4, type: "pattern", title_en: "Environment Pattern", question_en: "Quiet, Noisy, Quiet, Noisy... What comes next?", options: ["Quiet", "Noisy"], answer: "Quiet", audio_url: "/audio/week10/logic_4.mp3" },
        { id: 5, type: "logic", title_en: "Farm Product", question_en: "The farmer grows corn, but not fish. Which one is a farm product?", options: ["Corn", "Fish"], answer: "Corn", hint_en: "Farm product", audio_url: "/audio/week10/logic_5.mp3" }
      ]
    },
    // 6. DICTATION
    dictation: {
      sentences: [
        { id: 1, text: "The countryside is quieter than the city.", meaning: "Nông thôn yên tĩnh hơn thành phố.", audio_url: "/audio/week10/dictation_1.mp3" },
        { id: 2, text: "Life is slower because there is less traffic.", meaning: "Cuộc sống chậm hơn vì có ít giao thông.", audio_url: "/audio/week10/dictation_2.mp3" },
        { id: 3, text: "We see more farm animals than people.", meaning: "Chúng tôi thấy nhiều động vật nông trại hơn người.", audio_url: "/audio/week10/dictation_3.mp3" },
        { id: 4, text: "There are less buildings but more fields.", meaning: "Có ít tòa nhà hơn nhưng nhiều cánh đồng hơn.", audio_url: "/audio/week10/dictation_4.mp3" },
        { id: 5, text: "My village is safer, so I can play outside.", meaning: "Làng tôi an toàn hơn, nên tôi có thể chơi bên ngoài.", audio_url: "/audio/week10/dictation_5.mp3" }
      ]
    },
    // 7. SHADOWING (KHỚP VỚI READ & EXPLORE)
    shadowing: {
      title: "Math: Greater Than Less Than Song for Kids | Comparing Numbers to 1000 (Math Songs by NUMBEROCK)",
      script: [
        { id: 1, text: "The countryside is quieter than the city, but it is often less crowded.", vi: "Vùng nông thôn yên tĩnh hơn thành phố, nhưng thường ít đông đúc hơn.", audio_url: "/audio/week10/shadowing_1.mp3" },
        { id: 2, text: "There are large green fields and few tall buildings.", vi: "Có những cánh đồng xanh rộng lớn và ít tòa nhà cao tầng.", audio_url: "/audio/week10/shadowing_2.mp3" },
        { id: 3, text: "Life is slower here because there is less traffic.", vi: "Cuộc sống ở đây chậm hơn vì có ít giao thông hơn.", audio_url: "/audio/week10/shadowing_3.mp3" },
        { id: 4, text: "We breathe cleaner air and see many farm animals.", vi: "Chúng tôi hít thở không khí sạch hơn và nhìn thấy nhiều động vật nông trại.", audio_url: "/audio/week10/shadowing_4.mp3" },
        { id: 5, text: "My village is safer than the town, so I can play outside.", vi: "Làng tôi an toàn hơn thị trấn, nên tôi có thể chơi bên ngoài.", audio_url: "/audio/week10/shadowing_5.mp3" }
      ]
    },
    // 8. EXPLORE (CLIL - SẢN XUẤT THỰC PHẨM)
    explore: {
      title_en: "Farming and Food Production",
      title_vi: "Trồng trọt và Sản xuất Thực phẩm",
      image_url: "/images/week10/explore_cover_w10.jpg",
      content_en: "Farmers **grow** food for the **city**. They plant seeds in the **fields** **and** use water to help them grow. They also raise **farm animals** like cows, chickens, and pigs. Farming is important **because** it gives us **fresh** food, **so** we must respect the countryside.",
      content_vi: "Nông dân trồng thực phẩm cho thành phố. Họ gieo hạt trên cánh đồng và dùng nước để giúp chúng lớn. Họ cũng nuôi động vật nông trại như bò, gà và lợn. Trồng trọt là quan trọng vì nó mang lại cho chúng ta thực phẩm tươi, nên chúng ta phải tôn trọng vùng nông thôn.",
      audio_url: "/audio/week10/explore_main.mp3",
      check_questions: [
        { id: 1, question_en: "What do farmers grow?", answer: ["Food.", "They grow food."], hint_en: "Food for the..." },
        { id: 2, question_en: "What kind of animals do they raise?", answer: ["Farm animals (cows, chickens, pigs)."], hint_en: "Cows, chickens..." },
        { id: 3, question_en: "Why is farming important?", answer: ["Because it gives us fresh food."], hint_en: "Because it gives..." }
      ],
      question: { text_en: "What is your favorite farm animal? Why?", text_vi: "Động vật nông trại yêu thích của bạn là gì? Tại sao?", min_words: 10, model_answer: "I like chickens because they lay eggs." }
    },
    // 9. WORD POWER
    word_power: {
      words: [
        { id: 1, word: "rural", definition_en: "Relating to the country, not the city.", definition_vi: "Thuộc về nông thôn", example: "Rural life is quiet.", cefr_level: "B1", collocation: "rural area", image_url: "/images/week10/rural.jpg", audio_word: "/audio/week10/power_word_rural.mp3", audio_def: "/audio/week10/power_def_rural.mp3", audio_coll: "/audio/week10/power_coll_rural.mp3" },
        { id: 2, word: "harvest", definition_en: "The process of gathering crops.", definition_vi: "Thu hoạch", example: "Farmers harvest rice.", cefr_level: "B1", collocation: "rice harvest", image_url: "/images/week10/harvest.jpg", audio_word: "/audio/week10/power_word_harvest.mp3", audio_def: "/audio/week10/power_def_harvest.mp3", audio_coll: "/audio/week10/power_coll_harvest.mp3" },
        { id: 3, word: "traffic", definition_en: "Vehicles moving on a road.", definition_vi: "Giao thông", example: "Less traffic in the village.", cefr_level: "A2", collocation: "heavy traffic", image_url: "/images/week10/traffic.jpg", audio_word: "/audio/week10/power_word_traffic.mp3", audio_def: "/audio/week10/power_def_traffic.mp3", audio_coll: "/audio/week10/power_coll_traffic.mp3" }
      ]
    },
    // 10. DAILY WATCH
    daily_watch: {
      videos: [
        { id: 1, query: "Country Mouse and City Mouse story", videoId: "uXekuEIETRE" },
        { id: 2, query: "Comparative adjectives grammar", videoId: "UGzKzBsRKrs" },
        { id: 3, query: "Comparing numbers more and less", videoId: "3qisu9NF1_0" },
        { id: 4, query: "Farm to table for kids", videoId: "cRhGOdqWIIo" },
        { id: 5, query: "Country Mouse and City Mouse story song", videoId: "yNSf1SpId5w" }
      ],
      bonus_games: [{ id: 1, title: "Bonus: The Country Mouse and the City Mouse | Aesop's Fables | PINKFONG Story Time (Baby Shark - Pinkfong Kids’ Songs & Stories)'s Fables | PINKFONG Story Time (Baby Shark - Pinkfong Kids’ Songs & Stories)'s Build a Zoo and Play with a Toy Farm to Learn Animal Names! (Genevieve's Playhouse - Learning Videos for Kids)", url: "https://www.gamestolearnenglish.com/farm-game/", description: "Match farm animals." }]
    },
    writing: {
      title: "Video Challenge: Country vs City",
      prompt_en: "Compare the city and the countryside. Which one is quieter and which one is busier?",
      prompt_vi: "So sánh nông thôn và thành phố. Nơi nào yên tĩnh hơn, nơi nào bận rộn hơn?",
      min_words: 25,
      keywords: ["quieter", "busier", "because", "but"]
    }
  }
};
export default weekData;
