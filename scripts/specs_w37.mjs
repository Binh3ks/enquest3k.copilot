/**
 * scripts/specs_w37.mjs
 * Week 37: Living vs. Non-Living (Reasoning)
 * CEFR Standard: A2 Flyers (Stage 1)
 */

export const w37 = {
  week: 37,
  theme: "Living vs. Non-Living (Reasoning)",
  title_en: "Living and Non-Living Things in Nature",
  title_vi: "Vật Sống và Vật Không Sống Trong Tự Nhiên",
  cefr_level: "A2 Flyers",
  grammar_focus: "It is living because it breathes/grows / It is non-living because it does not need food or water.",
  vocab_list: [
    { id: 1, word: "living", pos: "adj", ipa: "/ˈlɪvɪŋ/", definition_en: "Alive and able to grow, breathe, and reproduce", definition_vi: "sống, còn sống", example_en: "Green plants and singing birds are living things in our garden.", example_vi: "Cây xanh và chim hót là những vật sống trong vườn của chúng ta." },
    { id: 2, word: "non-living", pos: "adj", ipa: "/nɑːn ˈlɪvɪŋ/", definition_en: "Not alive and never having had life", definition_vi: "không sống, vô sinh", example_en: "A heavy gray stone is a non-living object.", example_vi: "Một hòn đá xám nặng là một vật thể không sống." },
    { id: 3, word: "breathe", pos: "v", ipa: "/briːð/", definition_en: "Take air into the lungs or body to absorb oxygen", definition_vi: "thở, hô hấp", example_en: "All active animals breathe fresh air to stay healthy.", example_vi: "Tất cả các loài động vật hoạt động đều thở không khí trong lành để khỏe mạnh." },
    { id: 4, word: "grow", pos: "v", ipa: "/ɡroʊ/", definition_en: "Become larger or more advanced over time", definition_vi: "lớn lên, phát triển", example_en: "Tiny green seedlings grow into tall oak trees.", example_vi: "Những cây mầm xanh nhỏ bé lớn lên thành những cây sồi cao lớn." },
    { id: 5, word: "need", pos: "v", ipa: "/niːd/", definition_en: "Require something because it is essential", definition_vi: "cần", example_en: "Living creatures need clean drinking water every day.", example_vi: "Các sinh vật sống cần nước uống sạch mỗi ngày." },
    { id: 6, word: "food", pos: "n", ipa: "/fuːd/", definition_en: "Substances that living things eat to get energy", definition_vi: "thức ăn", example_en: "Hungry caterpillars look for green leaf food.", example_vi: "Những chú sâu bướm đói bụng tìm kiếm thức ăn là lá cây xanh." },
    { id: 7, word: "water", pos: "n", ipa: "/ˈwɔːtər/", definition_en: "A clear liquid essential for all plant and animal life", definition_vi: "nước", example_en: "Plants absorb fresh water through their underground roots.", example_vi: "Cây cối hút nước ngọt qua rễ cây dưới lòng đất." },
    { id: 8, word: "rock", pos: "n", ipa: "/rɑːk/", definition_en: "A hard, solid piece of the Earth's surface", definition_vi: "hòn đá, tảng đá", example_en: "Mia found a smooth gray rock near the pond.", example_vi: "Mia tìm thấy một hòn đá xám nhẵn bóng gần bờ ao." },
    { id: 9, word: "plastic", pos: "n", ipa: "/ˈplæstɪk/", definition_en: "A synthetic material made by humans that does not rot", definition_vi: "chất dẻo, nhựa", example_en: "The broken toy was made of hard red plastic.", example_vi: "Món đồ chơi vỡ được làm bằng nhựa đỏ cứng." },
    { id: 10, word: "animal", pos: "n", ipa: "/ˈænɪməl/", definition_en: "A living creature that can move and feeds on organic matter", definition_vi: "động vật", example_en: "A rabbit is a lively animal that hops through the grass.", example_vi: "Thỏ là một loài động vật hoạt bát nhảy qua bãi cỏ." },
    { id: 11, word: "plant", pos: "n", ipa: "/plænt/", definition_en: "A living organism that absorbs water and makes food from sunlight", definition_vi: "thực vật, cây cỏ", example_en: "Sunflower is a tall plant with bright yellow petals.", example_vi: "Hoa hướng dương là một loài thực vật cao với cánh hoa vàng tươi." },
    { id: 12, word: "move", pos: "v", ipa: "/muːv/", definition_en: "Change position or go from one place to another", definition_vi: "di chuyển", example_en: "Frogs move quickly by jumping into cool pond water.", example_vi: "Ếch di chuyển nhanh bằng cách nhảy vào làn nước mát của ao." },
    { id: 13, word: "change", pos: "v", ipa: "/tʃeɪndʒ/", definition_en: "Become different over time", definition_vi: "thay đổi", example_en: "Living things change and develop as they get older.", example_vi: "Các sinh vật sống thay đổi và phát triển khi chúng già đi." },
    { id: 14, word: "creature", pos: "n", ipa: "/ˈkriːtʃər/", definition_en: "Any living animal or insect", definition_vi: "sinh vật", example_en: "A ladybug is a helpful garden creature.", example_vi: "Bọ rùa là một sinh vật có ích cho khu vườn." },
    { id: 15, word: "feed", pos: "v", ipa: "/fiːd/", definition_en: "Give food to or take food for nutrition", definition_vi: "cho ăn, ăn", example_en: "Parent birds feed hungry baby chicks in their nest.", example_vi: "Chim bố mẹ mớm thức ăn cho chim non đói trong tổ." },
    { id: 16, word: "survive", pos: "v", ipa: "/sərˈvaɪv/", definition_en: "Continue to live through difficult conditions", definition_vi: "sống sót, sinh tồn", example_en: "Plants need sunlight and soil moisture to survive.", example_vi: "Cây cối cần ánh sáng mặt trời và độ ẩm của đất để sinh tồn." },
    { id: 17, word: "natural", pos: "adj", ipa: "/ˈnætʃərəl/", definition_en: "Existing in nature and not made or caused by humans", definition_vi: "tự nhiên", example_en: "Fallen autumn leaves are natural fertilizer for soil.", example_vi: "Lá mùa thu rụng là phân bón tự nhiên cho đất." },
    { id: 18, word: "air", pos: "n", ipa: "/er/", definition_en: "The invisible mixture of gases surrounding the Earth", definition_vi: "không khí", example_en: "We breathe fresh morning air when walking in the woods.", example_vi: "Chúng ta hít thở không khí buổi sáng trong lành khi đi dạo trong rừng." },
    { id: 19, word: "soil", pos: "n", ipa: "/sɔɪl/", definition_en: "The upper layer of earth in which plants grow", definition_vi: "đất trồng", example_en: "Worms dig deep tunnels through rich garden soil.", example_vi: "Giun đào những đường hầm sâu xuyên qua lớp đất màu mỡ của khu vườn." },
    { id: 20, word: "energy", pos: "n", ipa: "/ˈenərdʒi/", definition_en: "Power obtained from food or sunlight used for activity", definition_vi: "năng lượng", example_en: "Green plants convert bright sunlight into growth energy.", example_vi: "Cây xanh chuyển hóa ánh sáng mặt trời rực rỡ thành năng lượng tăng trưởng." }
  ],
  clil: {
    title_en: "The Living World: What Makes Something Alive?",
    title_vi: "Thế Giới Sự Sống: Điều Gì Khiến Một Vật Còn Sống?",
    content_en: "Look around our school garden and notice the amazing variety of objects. Scientists classify everything on Earth into two main groups: living things and non-living things. Living things include animals, plants, and insects. A caterpillar is living because it breathes air, eats green leaves for food, and grows larger every day. Plants are living too because they absorb fresh water from soil and use sunlight for energy. In contrast, rocks, soil pebbles, and plastic toy cars are non-living objects. A rock does not breathe, does not need food, and cannot reproduce. By observing how things change, we learn to classify nature with clear reasons.",
    glossary: [
      { word: "living", definition_en: "Things that grow, take in food, and reproduce", definition_vi: "những vật sống và phát triển" },
      { word: "non-living", definition_en: "Objects that do not grow and do not need food", definition_vi: "những vật vô sinh không sống" },
      { word: "breathe", definition_en: "Taking air into the body for oxygen", definition_vi: "hít thở không khí" },
      { word: "energy", definition_en: "Power from food or sun used for living activities", definition_vi: "năng lượng duy trì sự sống" },
      { word: "classify", definition_en: "Sorting items into groups based on shared features", definition_vi: "phân loại theo nhóm" }
    ],
    check_questions: [
      { id: 1, question_en: "Why is a garden caterpillar classified as a living thing?", options: ["Because it breathes air, eats food, and grows", "Because it is made of plastic", "Because it stays still like a rock"], answer: "Because it breathes air, eats food, and grows" },
      { id: 2, question_en: "What essential things do green plants need to survive?", options: ["Sunlight, fresh water, and soil nutrients", "Plastic toys and metal spoons", "Dry gray rocks only"], answer: "Sunlight, fresh water, and soil nutrients" },
      { id: 3, question_en: "Why is a heavy gray pebble called a non-living object?", options: ["It does not breathe and does not need food", "It hops across the lawn", "It eats green garden leaves"], answer: "It does not breathe and does not need food" }
    ]
  },
  shadowing_sentences: [
    { id: 1, text: "A green plant is living because it grows taller every week.", en: "A green plant is living because it grows taller every week.", vi: "Một cái cây xanh là vật sống bởi vì nó lớn cao hơn mỗi tuần.", ipa: "/ə ɡriːn plænt ɪz ˈlɪvɪŋ bɪˈkɔːz ɪt ɡroʊz ˈtɔːlər ˈevri wiːk/", words: ["A", "green", "plant", "is", "living", "because", "it", "grows", "taller", "every", "week"] },
    { id: 2, text: "All wild animals breathe fresh air to stay healthy and strong.", en: "All wild animals breathe fresh air to stay healthy and strong.", vi: "Mọi động vật hoang dã đều thở không khí trong lành để khỏe mạnh.", ipa: "/ɔːl waɪld ˈænɪməlz briːð freʃ er tuː steɪ ˈhelθi ænd strɔːŋ/", words: ["All", "wild", "animals", "breathe", "fresh", "air", "to", "stay", "healthy", "and", "strong"] },
    { id: 3, text: "A gray rock is non-living because it does not need food.", en: "A gray rock is non-living because it does not need food.", vi: "Hòn đá xám là vật không sống vì nó không cần thức ăn.", ipa: "/ə ɡreɪ rɑːk ɪz nɑːn ˈlɪvɪŋ bɪˈkɔːz ɪt dʌz nɑːt niːd fuːd/", words: ["A", "gray", "rock", "is", "non-living", "because", "it", "does", "not", "need", "food"] },
    { id: 4, text: "The hungry caterpillar feeds on tender green leaves each morning.", en: "The hungry caterpillar feeds on tender green leaves each morning.", vi: "Chú sâu bướm đói bụng ăn lá cây xanh non mỗi buổi sáng.", ipa: "/ðə ˈhʌŋɡri ˈkætərˌpɪlər fiːdz ɑːn ˈtendər ɡriːn liːvz iːtʃ ˈmɔːrnɪŋ/", words: ["The", "hungry", "caterpillar", "feeds", "on", "tender", "green", "leaves", "each", "morning"] },
    { id: 5, text: "Plastic bottles never grow or breathe like natural creatures do.", en: "Plastic bottles never grow or breathe like natural creatures do.", vi: "Chai nhựa không bao giờ lớn lên hay hô hấp như các sinh vật tự nhiên.", ipa: "/ˈplæstɪk ˈbɑːtəlz ˈnevər ɡroʊ ɔːr briːð laɪk ˈnætʃərəl ˈkriːtʃərz duː/", words: ["Plastic", "bottles", "never", "grow", "or", "breathe", "like", "natural", "creatures", "do"] },
    { id: 6, text: "We need clean water and healthy soil for our vegetables.", en: "We need clean water and healthy soil for our vegetables.", vi: "Chúng ta cần nước sạch và đất tốt cho các loại rau củ.", ipa: "/wiː niːd kliːn ˈwɔːtər ænd ˈhelθi sɔɪl fɔːr ˈaʊər ˈvedʒtəbəlz/", words: ["We", "need", "clean", "water", "and", "healthy", "soil", "for", "our", "vegetables"] },
    { id: 7, text: "Living things move and change throughout their wonderful lives.", en: "Living things move and change throughout their wonderful lives.", vi: "Các vật thể sống di chuyển và thay đổi suốt cuộc đời tuyệt vời.", ipa: "/ˈlɪvɪŋ θɪŋz muːv ænd tʃeɪndʒ θruːˈaʊt ðer ˈwʌndərfəl laɪvz/", words: ["Living", "things", "move", "and", "change", "throughout", "their", "wonderful", "lives"] },
    { id: 8, text: "Mia and Oliver classify garden items using very clear reasons.", en: "Mia and Oliver classify garden items using very clear reasons.", vi: "Mia và Oliver phân loại đồ vật trong vườn bằng những lý do rất rõ ràng.", ipa: "/ˈmiːə ænd ˈɑːlɪvər ˈklæsɪfaɪ ˈɡɑːrdən ˈaɪtəmz ˈjuːzɪŋ ˈveri klɪr ˈriːzənz/", words: ["Mia", "and", "Oliver", "classify", "garden", "items", "using", "very", "clear", "reasons"] }
  ],
  story_scenes: [
    { id: 1, scene_id: "scene_1", scene_number: 1, title_en: "Garden Detective Mission", title_vi: "Nhiệm Vụ Thám Tử Vườn", description_en: "Mia and Oliver put on hats to find living and non-living things in the school garden.", description: "Mia and Oliver put on hats to find living and non-living things in the school garden.", image_url: "/images/week37/webtoon_scene_1.png", audio_url: "/audio/week37/scene_1.mp3" },
    { id: 2, scene_id: "scene_2", scene_number: 2, title_en: "The Crawling Caterpillar", title_vi: "Chú Sâu Bướm Bò Trên Lá", description_en: "Mia spots a green caterpillar eating a cabbage leaf and observes it breathing air.", description: "Mia spots a green caterpillar eating a cabbage leaf and observes it breathing air.", image_url: "/images/week37/webtoon_scene_2.png", audio_url: "/audio/week37/scene_2.mp3" },
    { id: 3, scene_id: "scene_3", scene_number: 3, title_en: "Pebbles by the Pond", title_vi: "Những Hòn Sỏi Bên Bờ Ao", description_en: "Oliver picks up a smooth gray rock and explains that it does not need food.", description: "Oliver picks up a smooth gray rock and explains that it does not need food.", image_url: "/images/week37/webtoon_scene_3.png", audio_url: "/audio/week37/scene_3.mp3" },
    { id: 4, scene_id: "scene_4", scene_number: 4, title_en: "The Plastic Toy Truck", title_vi: "Chiếc Xe Tải Nhựa Đồ Chơi", description_en: "They find a dropped plastic toy and confirm that man-made plastic never grows.", description: "They find a dropped plastic toy and confirm that man-made plastic never grows.", image_url: "/images/week37/webtoon_scene_4.png", audio_url: "/audio/week37/scene_4.mp3" },
    { id: 5, scene_id: "scene_5", scene_number: 5, title_en: "Presenting the Chart", title_vi: "Trình Bày Bảng Phân Loại", description_en: "Teacher Elena smiles as the children explain their nature classification chart.", description: "Teacher Elena smiles as the children explain their nature classification chart.", image_url: "/images/week37/webtoon_scene_5.png", audio_url: "/audio/week37/scene_5.mp3" }
  ],
  writing_data: {
    title: "Classifying Nature Clues in the Garden",
    prompt_en: "Look at the four pictures. Tell a story about Mia and Oliver discovering living and non-living things in the school garden. Write 20 or more words.",
    prompt_vi: "Nhìn vào 4 bức tranh. Kể câu chuyện về Mia và Oliver phát hiện các vật sống và không sống trong vườn trường (từ 20 từ trở lên).",
    min_sentences: 3,
    min_words: 20,
    max_words: 80,
    model_sentence: "Mia and Oliver explored the school garden on Monday morning. First, they observed a green caterpillar feeding on a plant leaf. Next, Oliver picked up a smooth gray rock near the pond. In the end, they explained to Teacher Elena that living things grow and need food, while rocks do not.",
    word_bank: ["living", "non-living", "breathe", "grow", "need", "food", "water", "rock", "plastic", "caterpillar"],
    sentence_frames: [
      "In the beginning, Mia and Oliver walked into the school ___.",
      "They found a green caterpillar that was ___ on a leaf.",
      "Next, Oliver held a heavy gray ___ that never needs food.",
      "In the end, both children completed their nature ___ chart."
    ],
    panels: [
      {
        panel_id: "panel_1",
        title_en: "Scene 1: Entering the Garden",
        title_vi: "Cảnh 1: Bước Vào Khu Vườn",
        image_url: "/images/week37/writing_panel_1.png",
        image_prompt: "Two young students holding clipboards and magnifying glasses entering a sunny school vegetable garden.",
        caption: "Mia and Oliver started their nature detective project in the school garden.",
        sentence_frame: "First, Mia and Oliver [entered the school garden] on a [bright sunny morning].",
        pills: ["entered the school garden", "bright sunny morning", "held clipboards", "Mia and Oliver"],
        connectors: ["First,", "On Monday morning,", "In the beginning,"]
      },
      {
        panel_id: "panel_2",
        title_en: "Scene 2: Spotting a Caterpillar",
        title_vi: "Cảnh 2: Nhìn Thấy Sâu Bướm",
        image_url: "/images/week37/writing_panel_2.png",
        image_prompt: "A close-up of a smiling girl looking at a green caterpillar crawling on a broad cabbage leaf.",
        caption: "Mia observed a living caterpillar crawling and feeding on a green leaf.",
        sentence_frame: "Next, they observed a [green caterpillar] eating a [tender vegetable leaf].",
        pills: ["green caterpillar", "tender vegetable leaf", "crawling slowly", "living creature"],
        connectors: ["Next,", "Then,", "Soon after,"]
      },
      {
        panel_id: "panel_3",
        title_en: "Scene 3: Examining Garden Stones",
        title_vi: "Cảnh 3: Kiểm Tra Những Viên Đá Vườn",
        image_url: "/images/week37/writing_panel_3.png",
        image_prompt: "A boy holding a smooth gray pebble near a garden pond with water lilies.",
        caption: "Oliver examined a smooth gray rock and explained that it never needs food.",
        sentence_frame: "After that, Oliver picked up a [smooth gray rock] near the [cool garden pond].",
        pills: ["smooth gray rock", "cool garden pond", "non-living item", "Oliver explained"],
        connectors: ["After that,", "Later,", "Meanwhile,"]
      },
      {
        panel_id: "panel_4",
        title_en: "Scene 4: Completing the Project",
        title_vi: "Cảnh 4: Hoàn Thành Dự Án",
        image_url: "/images/week37/writing_panel_4.png",
        image_prompt: "Two children showing a colorful classification poster with photos of caterpillars and stones to their teacher.",
        caption: "They presented their classification poster with clear scientific reasons.",
        sentence_frame: "In the end, they showed their [classification poster] to [Teacher Elena with big smiles].",
        pills: ["classification poster", "Teacher Elena with big smiles", "clear reasons", "proud children"],
        connectors: ["In the end,", "Finally,", "At last,"]
      }
    ],
    ladder_stages: [
      {
        badge_label: "MODEL",
        title: "Scene 1: Starting the Project",
        image_url: "/images/week37/writing_panel_1.png",
        caption: "Mia and Oliver started their nature detective project in the school garden.",
        frame_L1: "First, Mia and Oliver walked into the school garden. They carried notebooks to search for living things.",
        connectors: ["First,", "On Monday morning,", "In the beginning,"],
        sentence_hint: "Write 2 sentences about entering the school garden.",
        ordered_chips: ["Mia and Oliver", "walked into the school garden", "to search for", "living and non-living things"],
        pills: ["Mia and Oliver", "walked into the school garden", "held notebooks", "sunny morning"],
        sentence_frame: "First, Mia and Oliver [walked into the school garden] to find [living and non-living things]."
      },
      {
        badge_label: "BUILD",
        title: "Scene 2: Spotting the Caterpillar",
        image_url: "/images/week37/writing_panel_2.png",
        caption: "Mia observed a living caterpillar crawling and feeding on a green leaf.",
        frame_L1: "Next, they spotted a tiny green caterpillar. It was living because it moved and chewed the leaf.",
        connectors: ["Next,", "Then,", "Soon after,"],
        sentence_hint: "Write 2 sentences about the caterpillar eating leaves.",
        pills: ["green caterpillar", "tender leaf", "living creature", "breathes air"],
        sentence_frame: "Next, they spotted a [green caterpillar] that was [chewing a leaf]."
      },
      {
        badge_label: "WRITE",
        title: "Scene 3: Examining Garden Stones",
        image_url: "/images/week37/writing_panel_3.png",
        caption: "Oliver examined a smooth gray rock and explained that it never needs food.",
        frame_L1: "After that, Oliver found a smooth pebble. He noted that the stone was non-living because it does not grow.",
        connectors: ["After that,", "Later,", "Meanwhile,"],
        sentence_hint: "Write 2 sentences about the rock being non-living.",
        pills: ["smooth pebble", "non-living object", "does not grow", "Oliver held"],
        sentence_frame: "After that, Oliver found a [smooth pebble] that [does not grow or need food]."
      },
      {
        badge_label: "EXPAND",
        title: "Scene 4: Presenting the Poster",
        image_url: "/images/week37/writing_panel_4.png",
        caption: "They presented their classification poster with clear scientific reasons.",
        frame_L1: "In the end, the students shared their poster with Teacher Elena. She was delighted with their clear reasons.",
        connectors: ["In the end,", "Finally,", "At last,"],
        sentence_hint: "Write 2 sentences about presenting their project results.",
        pills: ["shared their poster", "Teacher Elena", "clear reasons", "proud smiles"],
        sentence_frame: "In the end, they [shared their poster] and explained their [clear scientific reasons]."
      }
    ]
  },
  speaking_data: {
    talkshow_prompt: {
      topic: "Living Things vs Non-Living Objects",
      question: "Hello Mia! Can you explain why a garden caterpillar is living, but a plastic toy car is not?",
      model_response: "Hello! A garden caterpillar is living because it breathes air, feeds on green leaves, and grows bigger every day. When it grows up, it turns into a butterfly and reproduces. In contrast, a plastic toy car never breathes, does not need water, and stays the exact same size forever. That is why the car is a non-living object!"
    },
    info_exchange_cards: {
      table_a: {
        title: "Mia's Garden Butterfly Project",
        subtitle: "Candidate's Question Card (Ask Examiner)",
        person: "Mia",
        fields: [
          { id: "field_a1", cue_prompt: "where / butterfly live?", cue_word: "where", is_missing: true, acceptable_questions: ["Where does the garden butterfly live?", "Where does the butterfly live?", "Where is its home?"], nova_reply: "The butterfly lives among colorful flowering bushes in our sunny school garden." },
          { id: "field_a2", cue_prompt: "what / eat for food?", cue_word: "what", is_missing: true, acceptable_questions: ["What does the butterfly eat for food?", "What food does it eat?", "What does it drink?"], nova_reply: "It sips sweet flower nectar with its long curled straw-like tongue." },
          { id: "field_a3", cue_prompt: "how / breathe air?", cue_word: "how", is_missing: true, acceptable_questions: ["How does the butterfly breathe air?", "How does it breathe?", "How does air enter its body?"], nova_reply: "It breathes fresh air through tiny openings called spiracles along its body." },
          { id: "field_a4", cue_prompt: "why / need warm sunshine?", cue_word: "why", is_missing: true, acceptable_questions: ["Why does it need warm sunshine?", "Why does the butterfly like the sun?", "Why does it need warmth?"], nova_reply: "Warm sunshine gives energy to its wing muscles so it can fly easily." },
          { id: "field_a5", cue_prompt: "when / lay tiny eggs?", cue_word: "when", is_missing: true, acceptable_questions: ["When does it lay tiny eggs?", "When does the butterfly reproduce?", "When are eggs laid?"], nova_reply: "It lays tiny round eggs on green leaves during warm spring afternoons." }
        ]
      },
      table_b: {
        title: "Oliver's Granite Rock Project",
        subtitle: "Information Card (Answer Examiner's Questions)",
        person: "Oliver",
        fields: [
          { id: "field_b1", cue_prompt: "where / rock found?", cue_word: "where", value: "Oliver found this heavy gray rock near the garden fish pond.", nova_question: "Where did Oliver discover this heavy gray rock?", acceptable_answers: ["Oliver found this heavy gray rock near the garden fish pond.", "Near the garden fish pond.", "By the fish pond."] },
          { id: "field_b2", cue_prompt: "what / made of?", cue_word: "what", value: "It is composed of hard natural minerals pressed together deep in Earth.", nova_question: "What natural materials is the rock made of?", acceptable_answers: ["It is composed of hard natural minerals pressed together deep in Earth.", "Hard natural minerals.", "Natural minerals from the Earth."] },
          { id: "field_b3", cue_prompt: "why / not grow bigger?", cue_word: "why", value: "Because it is non-living and does not absorb food or energy.", nova_question: "Why does the gray rock never grow larger?", acceptable_answers: ["Because it is non-living and does not absorb food or energy.", "It is non-living and does not absorb food.", "Because rocks are non-living."] },
          { id: "field_b4", cue_prompt: "how old / stone?", cue_word: "how old", value: "Scientists estimate this natural river pebble is over two thousand years old.", nova_question: "How old is Oliver's smooth garden pebble?", acceptable_answers: ["Scientists estimate this natural river pebble is over two thousand years old.", "Over two thousand years old.", "More than two thousand years old."] },
          { id: "field_b5", cue_prompt: "why / non-living object?", cue_word: "why", value: "It cannot breathe, cannot reproduce, and never moves by itself.", nova_question: "Why does Oliver classify this pebble as a non-living object?", acceptable_answers: ["It cannot breathe, cannot reproduce, and never moves by itself.", "Because it cannot breathe or move by itself.", "It does not breathe or reproduce."] }
        ]
      }
    }
  },
  cambridge_rw: {
    part1_definitions: [
      { id: 1, definition_en: "Take air into your lungs and push it out again.", options: ["breathe", "plastic", "rock"], answer: "breathe" },
      { id: 2, definition_en: "A synthetic material made by people that does not decay naturally.", options: ["plastic", "soil", "animal"], answer: "plastic" },
      { id: 3, definition_en: "The rich brown ground where flowers and trees put down roots.", options: ["soil", "air", "water"], answer: "soil" },
      { id: 4, definition_en: "A living creature that can move around and feeds on plants or other animals.", options: ["animal", "rock", "plastic"], answer: "animal" },
      { id: 5, definition_en: "A hard solid stone formed naturally inside the Earth.", options: ["rock", "food", "seedling"], answer: "rock" },
      { id: 6, definition_en: "A living thing with leaves and roots that makes food from sunshine.", options: ["plant", "water", "air"], answer: "plant" },
      { id: 7, definition_en: "Any bird, insect, or wild animal that lives in nature.", options: ["creature", "plastic", "mineral"], answer: "creature" },
      { id: 8, definition_en: "Things that people and animals eat to stay healthy and active.", options: ["food", "rock", "soil"], answer: "food" },
      { id: 9, definition_en: "The clear liquid that every living plant and animal must drink to survive.", options: ["water", "plastic", "metal"], answer: "water" },
      { id: 10, definition_en: "Get bigger and taller as time passes.", options: ["grow", "breathe", "move"], answer: "grow" }
    ],
    part2_dialogue: {
      topic: "Classifying Objects in the School Garden",
      turns: [
        {
          speaker: "Mia",
          text: "Look at this fuzzy green caterpillar, Oliver! Is it living or non-living?",
          options: [
            "It is living because it moves and eats green leaves.",
            "I like riding my yellow bicycle to school.",
            "No, the blue sky is very cloudy today."
          ],
          answer: "It is living because it moves and eats green leaves."
        },
        {
          speaker: "Oliver",
          text: "What about this smooth gray rock resting next to the pond?",
          options: [
            "It is non-living because it does not breathe or need food.",
            "My sister baked delicious apple cookies yesterday.",
            "Yes, we can swim in the swimming pool."
          ],
          answer: "It is non-living because it does not breathe or need food."
        },
        {
          speaker: "Mia",
          text: "Why do green plants in the vegetable patch need water and sunlight?",
          options: [
            "Because they are living things that need energy to grow.",
            "They wear thick winter coats when it rains.",
            "There are seven desks inside our English classroom."
          ],
          answer: "Because they are living things that need energy to grow."
        },
        {
          speaker: "Oliver",
          text: "Can a broken plastic toy car ever grow into a real truck?",
          options: [
            "No, plastic is non-living and can never grow or change.",
            "I usually eat breakfast at seven in the morning.",
            "We played soccer during physical education class."
          ],
          answer: "No, plastic is non-living and can never grow or change."
        },
        {
          speaker: "Mia",
          text: "Shall we show our nature classification chart to Teacher Elena now?",
          options: [
            "Yes, let's show her our chart right away!",
            "I do not want any tomato soup for lunch.",
            "The yellow train arrived at the station."
          ],
          answer: "Yes, let's show her our chart right away!"
        }
      ],
      exchanges: [
        { speaker: "Mia", text: "Look at this fuzzy green caterpillar, Oliver! Is it living or non-living?" },
        { speaker: "Oliver", text: "It is living because it moves and eats green leaves." },
        { speaker: "Mia", text: "What about this smooth gray rock resting next to the pond?" },
        { speaker: "Oliver", text: "It is non-living because it does not breathe or need food." },
        { speaker: "Mia", text: "Why do green plants in the vegetable patch need water and sunlight?" },
        { speaker: "Oliver", text: "Because they are living things that need energy to grow." },
        { speaker: "Mia", text: "Can a broken plastic toy car ever grow into a real truck?" },
        { speaker: "Oliver", text: "No, plastic is non-living and can never grow or change." },
        { speaker: "Mia", text: "Shall we show our nature classification chart to Teacher Elena now?" },
        { speaker: "Oliver", text: "Yes, let's show her our chart right away!" }
      ]
    },
    part6_cloze: {
      title: "Mia's Garden Detective Diary",
      instructions: "Read the diary and write the missing words. Write one word on each line.",
      text_template: "Dear Diary, today Oliver and I explored [1]_____ school vegetable garden. We found a caterpillar that [2]_____ living because it breathes air. Next to the pond, Oliver found [3]_____ smooth gray stone. A rock is non-living and does [4]_____ need water or food. We enjoyed learning how [5]_____ classify things in nature.",
      answers: { "1": "the", "2": "is", "3": "a", "4": "not", "5": "to" }
    }
  },
  minigames: {
    math_problems: [
      {
        id: "w37_p1",
        type: "part_whole",
        title: "Counting Living and Non-Living Objects",
        question: "Mia counted 28 living insects and 32 non-living garden stones along the path. How many objects did she count in total?",
        storyContext: "Mia tallies findings in her nature detective notebook during the science walk.",
        modelData: {
          bars: [
            { label: "Living Insects", value: 28, color: "#10b981" },
            { label: "Garden Stones", value: 32, color: "#64748b" }
          ],
          total: 60,
          unit: "objects"
        },
        target_answer: 60,
        unit: "objects",
        steps: [
          "Start with 28 living insects.",
          "Add 32 non-living garden stones.",
          "28 + 32 = 60 total items counted."
        ]
      },
      {
        id: "w37_p2",
        type: "comparison",
        title: "Seedling Growth Comparison",
        question: "Oliver planted 45 sunflower seedlings in the rich soil. Snails ate 17 seedlings before they grew tall. How many sunflower seedlings survived and continued to grow?",
        storyContext: "Oliver measures healthy sunflower seedlings thriving in the sunny patch.",
        modelData: {
          bars: [
            { label: "Planted Seedlings", value: 45, color: "#f59e0b" },
            { label: "Lost to Snails", value: 17, color: "#ef4444" }
          ],
          difference: 28,
          unit: "seedlings"
        },
        target_answer: 28,
        unit: "seedlings",
        steps: [
          "Take 45 planted sunflower seedlings.",
          "Subtract 17 seedlings eaten by snails.",
          "45 - 17 = 28 seedlings survived."
        ]
      }
    ],
    action_lab_scenarios: [
      {
        stage: 1,
        title: "Sorting Living vs Non-Living",
        diagram_type: "classification_baskets",
        instruction: "Drag each garden discovery into the Living or Non-Living container.",
        items: [
          { label: "Wiggling Earthworm", target: "living" },
          { label: "Smooth Gray Pebble", target: "non_living" },
          { label: "Blooming Rosebush", target: "living" },
          { label: "Cracked Plastic Pot", target: "non_living" }
        ]
      },
      {
        stage: 2,
        title: "Essential Needs of Living Things",
        diagram_type: "survival_needs_board",
        instruction: "Connect each living creature to the primary resource it needs to survive.",
        items: [
          { label: "Sunflower -> Fresh Water & Sunlight", target: "sun_water" },
          { label: "Caterpillar -> Fresh Green Leaves", target: "plant_food" },
          { label: "Garden Robin -> Garden Soil Worms", target: "protein_food" }
        ]
      },
      {
        stage: 3,
        title: "Nature Detective Action Plan",
        diagram_type: "investigation_steps",
        instruction: "Arrange the three investigation steps in correct logical order.",
        items: [
          { label: "Observe Movement and Breathing", target: "step_1" },
          { label: "Check if Object Needs Food or Water", target: "step_2" },
          { label: "Record Classification with Reasons", target: "step_3" }
        ]
      }
    ],
    grammar_drills: [
      { sentence: "The caterpillar is living because it breathes air and eats leaves.", options: ["breathes", "breathing", "breathed"], answer: "breathes", explanation: "Use 3rd person singular present tense 'breathes' with singular subject 'it'." },
      { sentence: "A gray rock is non-living because it does not need water.", options: ["does", "do", "doing"], answer: "does", explanation: "Use auxiliary 'does' with 3rd person singular 'it' in negative present tense." },
      { sentence: "Green plants grow taller when they receive warm sunlight.", options: ["grow", "grows", "growing"], answer: "grow", explanation: "Use base plural form 'grow' with plural subject 'plants'." },
      { sentence: "Plastic toys never change or develop over time.", options: ["never", "always", "every"], answer: "never", explanation: "Use frequency adverb 'never' to indicate inanimate objects do not develop." },
      { sentence: "Mia and Oliver classify garden items using clear scientific reasons.", options: ["classify", "classifies", "classified"], answer: "classify", explanation: "Use plural present tense verb 'classify' with compound subject 'Mia and Oliver'." }
    ]
  }
};

export default w37;
