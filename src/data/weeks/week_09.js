const weekData = {
  weekId: 9,
  weekTitle_en: "Urban Environments",
  weekTitle_vi: "Môi trường Đô thị",
  grammar_focus: "Adjectives (Describing Cities)",
  global_vocab: [],
  stations: {
    // 1. READ & EXPLORE
    read_explore: {
      title: "City Life",
      image_url: "/images/week9/read_cover_w09.jpg",
      content_en: "Living in the **city** is exciting **but** it can be **noisy**. There are many tall **buildings** and busy **streets**. People walk on the **sidewalk** **because** the roads are full of cars. I like the city **because** there are many parks **and** shops. At night, the city is **bright** with many lights. However, the air can be **polluted** due to traffic.",
      content_vi: "Sống ở thành phố rất thú vị nhưng có thể ồn ào. Có nhiều tòa nhà cao tầng và đường phố đông đúc. Mọi người đi bộ trên vỉa hè vì đường đầy xe hơi. Tôi thích thành phố vì có nhiều công viên và cửa hàng. Vào ban đêm, thành phố rực rỡ với nhiều ánh đèn. Tuy nhiên, không khí có thể bị ô nhiễm do giao thông.",
      audio_url: "/audio/week9/read_explore_main.mp3",
      comprehension_questions: [
        {
          id: 1,
          question_en: "Why do people walk on the sidewalk?",
          answer: ["Because the roads are full of cars."],
          hint_en: "Because the roads...",
          hint_vi: "Vì đường..."
        },
        {
          id: 2,
          question_en: "What is the city like at night?",
          answer: ["It is bright with lights."],
          hint_en: "It is bright...",
          hint_vi: "Nó rực rỡ..."
        },
        {
          id: 3,
          question_en: "Why can the air be polluted?",
          answer: ["Due to traffic.", "Because of cars."],
          hint_en: "Due to...",
          hint_vi: "Do..."
        }
      ]
    },
    // 2. NEW WORDS
    new_words: {
      vocab: [
        {
          id: 1, word: "city", image_url: "/images/week9/city.jpg",
          definition_en: "A large town where people live and work.", definition_vi: "Thành phố",
          pronunciation: "/ˈsɪti/", example: "New York is a big city.", collocation: "busy city",
          audio_word: "/audio/week9/vocab_city.mp3", audio_def: "/audio/week9/vocab_def_city.mp3", audio_coll: "/audio/week9/vocab_coll_city.mp3"
        },
        {
          id: 2, word: "building", image_url: "/images/week9/building.jpg",
          definition_en: "A structure with a roof and walls.", definition_vi: "Tòa nhà",
          pronunciation: "/ˈbɪldɪŋ/", example: "The building is very tall.", collocation: "tall building",
          audio_word: "/audio/week9/vocab_building.mp3", audio_def: "/audio/week9/vocab_def_building.mp3", audio_coll: "/audio/week9/vocab_coll_building.mp3"
        },
        {
          id: 3, word: "street", image_url: "/images/week9/street.jpg",
          definition_en: "A public road in a city.", definition_vi: "Đường phố",
          pronunciation: "/striːt/", example: "Don't play in the street.", collocation: "crowded street",
          audio_word: "/audio/week9/vocab_street.mp3", audio_def: "/audio/week9/vocab_def_street.mp3", audio_coll: "/audio/week9/vocab_coll_street.mp3"
        },
        {
          id: 4, word: "sidewalk", image_url: "/images/week9/sidewalk.jpg",
          definition_en: "A path for people to walk on.", definition_vi: "Vỉa hè",
          pronunciation: "/ˈsʌɪdwɔːk/", example: "Walk on the sidewalk.", collocation: "paved sidewalk",
          audio_word: "/audio/week9/vocab_sidewalk.mp3", audio_def: "/audio/week9/vocab_def_sidewalk.mp3", audio_coll: "/audio/week9/vocab_coll_sidewalk.mp3"
        },
        {
          id: 5, word: "traffic", image_url: "/images/week9/traffic.jpg",
          definition_en: "Vehicles moving on a road.", definition_vi: "Giao thông",
          pronunciation: "/ˈtrafɪk/", example: "There is heavy traffic today.", collocation: "heavy traffic",
          audio_word: "/audio/week9/vocab_traffic.mp3", audio_def: "/audio/week9/vocab_def_traffic.mp3", audio_coll: "/audio/week9/vocab_coll_traffic.mp3"
        },
        {
          id: 6, word: "noisy", image_url: "/images/week9/noisy.jpg",
          definition_en: "Making a lot of sound.", definition_vi: "Ồn ào",
          pronunciation: "/ˈnɔɪzi/", example: "The market is noisy.", collocation: "noisy place",
          audio_word: "/audio/week9/vocab_noisy.mp3", audio_def: "/audio/week9/vocab_def_noisy.mp3", audio_coll: "/audio/week9/vocab_coll_noisy.mp3"
        },
        {
          id: 7, word: "crowded", image_url: "/images/week9/crowded.jpg",
          definition_en: "Full of people.", definition_vi: "Đông đúc",
          pronunciation: "/ˈkraʊdɪd/", example: "The bus is crowded.", collocation: "crowded bus",
          audio_word: "/audio/week9/vocab_crowded.mp3", audio_def: "/audio/week9/vocab_def_crowded.mp3", audio_coll: "/audio/week9/vocab_coll_crowded.mp3"
        },
        {
          id: 8, word: "pollution", image_url: "/images/week9/pollution.jpg",
          definition_en: "Damage to the environment.", definition_vi: "Sự ô nhiễm",
          pronunciation: "/pəˈluːʃ(ə)n/", example: "Cars cause air pollution.", collocation: "air pollution",
          audio_word: "/audio/week9/vocab_pollution.mp3", audio_def: "/audio/week9/vocab_def_pollution.mp3", audio_coll: "/audio/week9/vocab_coll_pollution.mp3"
        },
        {
          id: 9, word: "modern", image_url: "/images/week9/modern.jpg",
          definition_en: "New and current.", definition_vi: "Hiện đại",
          pronunciation: "/ˈmɒd(ə)n/", example: "We live in a modern city.", collocation: "modern technology",
          audio_word: "/audio/week9/vocab_modern.mp3", audio_def: "/audio/week9/vocab_def_modern.mp3", audio_coll: "/audio/week9/vocab_coll_modern.mp3"
        },
        {
          id: 10, word: "bridge", image_url: "/images/week9/bridge.jpg",
          definition_en: "A structure over a river.", definition_vi: "Cây cầu",
          pronunciation: "/brɪdʒ/", example: "Cross the bridge carefully.", collocation: "long bridge",
          audio_word: "/audio/week9/vocab_bridge.mp3", audio_def: "/audio/week9/vocab_def_bridge.mp3", audio_coll: "/audio/week9/vocab_coll_bridge.mp3"
        }
      ]
    },
    word_match: { pairs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
    // 3. GRAMMAR
    grammar: {
      grammar_explanation: {
        title_en: "Describing Places",
        title_vi: "Miêu tả nơi chốn",
        rules: [
          { type: "rule", icon: "🏙️", rule_en: "It is + **Adjective**", rule_vi: "Nó thì + **Tính từ**", example: "It is **noisy**." },
          { type: "rule", icon: "⚖️", rule_en: "**Too** + Adjective (Negative)", rule_vi: "**Quá** (Tiêu cực)", example: "It is **too crowded**." },
          { type: "rule", icon: "🌆", rule_en: "There are + **Many/A lot of**", rule_vi: "Có + **Nhiều**", example: "There are **many** cars." }
        ]
      },
      exercises: [
        { id: 1, type: "fill", question: "The city is very _____ (noise/noisy).", answer: "noisy", hint: "Adjective -> noisy" },
        { id: 2, type: "mc", question: "There are _____ cars on the street.", options: ["many", "much"], answer: "many", hint: "Countable -> many" },
        { id: 3, type: "unscramble", question: "Sort:", words: ["is", "crowded", "The", "bus"], answer: "The bus is crowded.", hint: "The bus..." },
        { id: 4, type: "fill", question: "The air is _____ (pollute/polluted).", answer: "polluted", hint: "Adjective -> polluted" },
        { id: 5, type: "mc", question: "It is _____ hot today.", options: ["too", "two"], answer: "too", hint: "Too + Adj" },
        { id: 6, type: "fill", question: "This building is _____ (height/high).", answer: "high", hint: "Adjective -> high" },
        { id: 7, type: "unscramble", question: "Sort:", words: ["modern", "We", "a", "live", "city", "in"], answer: "We live in a modern city.", hint: "We live..." },
        { id: 8, type: "fill", question: "Make sentence: 'Street / busy / is'", answer: ["The street is busy.", "the street is busy."], customCheck: true, hint: "Use 'is'" },
        { id: 9, type: "mc", question: "Are there _____ parks?", options: ["some", "any"], answer: "any", hint: "Question -> any" },
        { id: 10, type: "fill", question: "The bridge is _____ (long/length).", answer: "long", hint: "Adjective -> long" },
        { id: 11, type: "unscramble", question: "Sort:", words: ["lot", "a", "There", "of", "lights", "are"], answer: "There are a lot of lights.", hint: "There are..." },
        { id: 12, type: "fill", question: "The sidewalk is _____ (width/wide).", answer: "wide", hint: "Adjective -> wide" },
        { id: 13, type: "mc", question: "The city is big _____ noisy.", options: ["and", "or"], answer: "and", hint: "Add info -> and" },
        { id: 14, type: "fill", question: "It is _____ (to/too) noisy to sleep.", answer: "too", hint: "Too + adj" },
        { id: 15, type: "unscramble", question: "Sort:", words: ["beautiful", "is", "view", "The"], answer: "The view is beautiful.", hint: "The view..." },
        { id: 16, type: "fill", question: "There are _____ (much/many) tall buildings.", answer: "many", hint: "Countable -> many" },
        { id: 17, type: "fill", question: "Make sentence: 'City / bright / at / night'", answer: ["The city is bright at night.", "the city is bright at night."], customCheck: true, hint: "Use 'is'" },
        { id: 18, type: "mc", question: "I like the park _____ it is quiet.", options: ["so", "because"], answer: "because", hint: "Reason -> because" },
        { id: 19, type: "fill", question: "The traffic is _____ (bad/badly).", answer: "bad", hint: "Adjective -> bad" },
        { id: 20, type: "unscramble", question: "Sort:", words: ["safe", "is", "neighborhood", "This"], answer: "This neighborhood is safe.", hint: "This..." }
      ]
    },
    // 4. ASK AI (CONTEXT)
    ask_ai: {
      prompts: [
        { id: 1, context_vi: "Bạn bị lạc đường. Hãy hỏi chú cảnh sát đường đến công viên.", context_en: "You are lost. Ask the police officer for the way to the park.", answer: ["Where is the park?", "Can you show me the way to the park?"], hint: "Where is..." },
        { id: 2, context_vi: "Bạn muốn biết tòa nhà này cao bao nhiêu.", context_en: "You want to know the height of this building.", answer: ["How tall is this building?", "How high is it?"], hint: "How tall..." },
        { id: 3, context_vi: "Hỏi bạn xem thành phố có ồn ào không.", context_en: "Ask your friend if the city is noisy.", answer: ["Is the city noisy?", "Is it noisy here?"], hint: "Is the..." },
        { id: 4, context_vi: "Bạn muốn biết xe buýt có đông không.", context_en: "You want to know if the bus is crowded.", answer: ["Is the bus crowded?"], hint: "Is the..." },
        { id: 5, context_vi: "Hỏi mẹ xem chúng ta có thể đi bộ trên vỉa hè không.", context_en: "Ask mom if we can walk on the sidewalk.", answer: ["Can we walk on the sidewalk?", "Mom, can we use the sidewalk?"], hint: "Can we..." }
      ]
    },
    // 5. LOGIC LAB (CONTEXT)
    logic_lab: {
      puzzles: [
        { id: 1, type: "logic", title_en: "City Sounds", question_en: "I am loud. I have a siren. I help people. What vehicle am I?", answer: ["Ambulance", "Fire truck", "Police car"], hint_en: "Emergency vehicle", audio_url: "/audio/week9/logic_1.mp3" },
        { id: 2, type: "math", title_en: "Building Height", question_en: "Building A has 10 floors. Building B has 5 floors more than A. How many floors does Building B have?", answer: ["15 floors", "15"], target_number: 15, unit: "floors", audio_url: "/audio/week9/logic_2.mp3" },
        { id: 3, type: "logic", title_en: "Traffic Light", question_en: "The light is Red. Should you Stop or Go?", options: ["Stop", "Go"], answer: "Stop", audio_url: "/audio/week9/logic_3.mp3" },
        { id: 4, type: "pattern", title_en: "Street Pattern", question_en: "Car, Bus, Car, Bus, Car... What comes next?", options: ["Bus", "Car"], answer: "Bus", audio_url: "/audio/week9/logic_4.mp3" },
        { id: 5, type: "logic", title_en: "Safe Place", question_en: "You want to play soccer. Should you play in the Street or the Park?", options: ["Park", "Street"], answer: "Park", hint_en: "Safe place", audio_url: "/audio/week9/logic_5.mp3" }
      ]
    },
    // 6. DICTATION
    dictation: {
      sentences: [
        { id: 1, text: "The city streets are very busy.", meaning: "Đường phố thành phố rất bận rộn.", audio_url: "/audio/week9/dictation_1.mp3" },
        { id: 2, text: "There are many tall buildings.", meaning: "Có nhiều tòa nhà cao tầng.", audio_url: "/audio/week9/dictation_2.mp3" },
        { id: 3, text: "The air is polluted by cars.", meaning: "Không khí bị ô nhiễm bởi xe hơi.", audio_url: "/audio/week9/dictation_3.mp3" },
        { id: 4, text: "We walk on the safe sidewalk.", meaning: "Chúng tôi đi bộ trên vỉa hè an toàn.", audio_url: "/audio/week9/dictation_4.mp3" },
        { id: 5, text: "It is too noisy at night.", meaning: "Nó quá ồn ào vào ban đêm.", audio_url: "/audio/week9/dictation_5.mp3" }
      ]
    },
    // 7. SHADOWING
    shadowing: {
      title: "Bonus: Town (Introduction of my town / village) - Kids vocabulary - educational video for kids",
      script: [
        { id: 1, text: "Living in the city is exciting but noisy.", vi: "Sống ở thành phố thú vị nhưng ồn ào.", audio_url: "/audio/week9/shadowing_1.mp3" },
        { id: 2, text: "There are many tall buildings and busy streets.", vi: "Có nhiều tòa nhà cao và đường phố đông đúc.", audio_url: "/audio/week9/shadowing_2.mp3" },
        { id: 3, text: "People walk on the sidewalk to be safe.", vi: "Mọi người đi trên vỉa hè để an toàn.", audio_url: "/audio/week9/shadowing_3.mp3" },
        { id: 4, text: "I like the city because it has many parks.", vi: "Tôi thích thành phố vì nó có nhiều công viên.", audio_url: "/audio/week9/shadowing_4.mp3" },
        { id: 5, text: "However, the air can be polluted.", vi: "Tuy nhiên, không khí có thể bị ô nhiễm.", audio_url: "/audio/week9/shadowing_5.mp3" }
      ]
    },
    // 8. EXPLORE
    explore: {
      title_en: "Urban Planning",
      title_vi: "Quy hoạch Đô thị",
      image_url: "/images/week9/explore_cover_w09.jpg",
      content_en: "Cities are planned carefully. Engineers build **roads** for cars and **sidewalks** for people. They build **parks** so people can relax. Good cities have **public transport** like buses and trains **to reduce** traffic. We must keep our city clean **by not** throwing trash on the street.",
      content_vi: "Các thành phố được quy hoạch cẩn thận. Kỹ sư xây đường cho xe và vỉa hè cho người đi bộ. Họ xây công viên để mọi người thư giãn. Thành phố tốt có phương tiện công cộng như xe buýt và tàu hỏa để giảm giao thông. Chúng ta phải giữ thành phố sạch bằng cách không vứt rác ra đường.",
      audio_url: "/audio/week9/explore_main.mp3",
      check_questions: [
        { id: 1, question_en: "Why do engineers build parks?", answer: ["So people can relax."], hint_en: "So people...", hint_vi: "Để mọi người..." },
        { id: 2, question_en: "What helps reduce traffic?", answer: ["Public transport.", "Buses and trains."], hint_en: "Public...", hint_vi: "Phương tiện..." },
        { id: 3, question_en: "How can we keep the city clean?", answer: ["By not throwing trash."], hint_en: "By not...", hint_vi: "Bằng cách không..." }
      ],
      question: { text_en: "What do you like most about your city?", text_vi: "Bạn thích gì nhất ở thành phố của mình?", min_words: 10, model_answer: "I like the parks because I can play soccer there." }
    },
    word_power: {
      words: [
        { id: 1, word: "urban", definition_en: "Relating to a town or city.", definition_vi: "Thuộc về đô thị", example: "Urban life is fast.", cefr_level: "B1", collocation: "urban area", image_url: "/images/week9/urban.jpg", audio_word: "/audio/week9/power_word_urban.mp3", audio_def: "/audio/week9/power_def_urban.mp3", audio_coll: "/audio/week9/power_coll_urban.mp3" },
        { id: 2, word: "vehicle", definition_en: "A machine used for transporting people.", definition_vi: "Phương tiện/Xe cộ", example: "A car is a vehicle.", cefr_level: "A2", collocation: "motor vehicle", image_url: "/images/week9/vehicle.jpg", audio_word: "/audio/week9/power_word_vehicle.mp3", audio_def: "/audio/week9/power_def_vehicle.mp3", audio_coll: "/audio/week9/power_coll_vehicle.mp3" },
        { id: 3, word: "population", definition_en: "All the people living in a town.", definition_vi: "Dân số", example: "The city has a large population.", cefr_level: "B1", collocation: "growing population", image_url: "/images/week9/population.jpg", audio_word: "/audio/week9/power_word_population.mp3", audio_def: "/audio/week9/power_def_population.mp3", audio_coll: "/audio/week9/power_coll_population.mp3" }
      ]
    },
    daily_watch: {
      videos: [
        { id: 1, query: "Places in the city vocabulary", videoId: "EfD2k9beP-4", duration: "3:00" },
        { id: 2, query: "Adjectives big small tall short", videoId: "3JZi2oDvPs4", duration: "2:30" },
        { id: 3, query: "Counting cars and trucks", videoId: "Hpk1lrRVRvM", duration: "3:00" },
        { id: 4, query: "Sounds of the city for kids", videoId: "EsWIJj04oQw", duration: "4:00" },
        { id: 5, query: "Places in the city vocabulary song", videoId: "SxcFXDeH4uU", duration: "3:00" }
      ],
      bonus_games: [{ id: 1, title: "Bonus: Places Vocabulary in English (Easy English)", url: "https://www.gamestolearnenglish.com/prepositions-game/", description: "Build a city." }]
    },
    writing: {
      title: "Video Challenge: My City",
      prompt_en: "Describe your city. Is it noisy or quiet? What do you see?",
      prompt_vi: "Mô tả thành phố của bạn. Nó ồn ào hay yên tĩnh?",
      min_words: 20,
      keywords: ["city", "noisy", "cars", "parks"]
    }
  }
};
export default weekData;
