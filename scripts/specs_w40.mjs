/**
 * scripts/specs_w40.mjs
 * Week 40: Beast Battle (Comparisons)
 */

export const w40 = {
  week: 40,
  theme: "Beast Battle (Comparisons)",
  title_en: "Beast Battle (Animal Comparisons)",
  title_vi: "Đấu Trường Dã Thú — So Sánh Động Vật Săn Mồi",
  cefr_level: "A2 Flyers",
  grammar_focus: "Comparatives (-er than): faster, stronger, bigger",
  vocab_list: [
    { id: 1, word: "teeth", pos: "n", ipa: "/tiːθ/", definition_en: "Hard white structures in the mouth used for biting food", definition_vi: "răng", example_en: "The tiger showed its sharp white teeth.", example_vi: "Chú hổ nhe hàm răng trắng sắc nhọn của mình." },
    { id: 2, word: "claws", pos: "n", ipa: "/klɔːz/", definition_en: "Sharp curved nails on the feet of animals or birds", definition_vi: "móng vuốt", example_en: "Grizzly bears use their long claws to dig for roots.", example_vi: "Gấu xám dùng những móng vuốt dài để đào rễ cây." },
    { id: 3, word: "fur", pos: "n", ipa: "/fɜːr/", definition_en: "The thick soft hair that covers the body of an animal", definition_vi: "bộ lông mao", example_en: "The leopard has spotted fur to hide in tall grass.", example_vi: "Báo hoa mai có bộ lông đốm để ẩn mình trong cỏ cao." },
    { id: 4, word: "skin", pos: "n", ipa: "/skɪn/", definition_en: "The natural outer layer covering an animal's body", definition_vi: "da", example_en: "Crocodiles have thick tough skin to stay protected.", example_vi: "Cá sấu có lớp da dày và dai để bảo vệ cơ thể." },
    { id: 5, word: "heavy", pos: "adj", ipa: "/ˈhevi/", definition_en: "Weighing a lot; difficult to lift or carry", definition_vi: "nặng", example_en: "A grizzly bear is much heavier than a small wolf.", example_vi: "Một chú gấu xám nặng hơn nhiều so với một chú sói nhỏ." },
    { id: 6, word: "light", pos: "adj", ipa: "/laɪt/", definition_en: "Not heavy; having little physical weight", definition_vi: "nhẹ", example_en: "Birds have light hollow bones so they can fly easily.", example_vi: "Chim có xương rỗng nhẹ để chúng có thể bay dễ dàng." },
    { id: 7, word: "predator", pos: "n", ipa: "/ˈpredətər/", definition_en: "An animal that hunts and kills other animals for food", definition_vi: "động vật săn mồi", example_en: "The lion is a famous predator on the savanna plains.", example_vi: "Sư tử là loài động vật săn mồi nổi tiếng trên thảo nguyên." },
    { id: 8, word: "stronger", pos: "adj", ipa: "/ˈstrɔːŋɡər/", definition_en: "Having more physical power and muscular force", definition_vi: "khỏe hơn", example_en: "The tiger is stronger than the agile leopard.", example_vi: "Hổ khỏe hơn so với báo hoa mai nhanh nhẹn." },
    { id: 9, word: "faster", pos: "adj", ipa: "/ˈfæstər/", definition_en: "Moving with greater speed than another animal", definition_vi: "nhanh hơn", example_en: "The cheetah runs faster than any other land animal.", example_vi: "Báo săn chạy nhanh hơn bất kỳ loài động vật trên cạn nào khác." },
    { id: 10, word: "sharp", pos: "adj", ipa: "/ʃɑːrp/", definition_en: "Having a thin edge or fine point that cuts easily", definition_vi: "sắc nhọn", example_en: "Eagles have sharp talons to catch slippery fish.", example_vi: "Đại bàng có móng vuốt sắc nhọn để bắt cá trơn trượt." },
    { id: 11, word: "stripe", pos: "n", ipa: "/straɪp/", definition_en: "A long narrow band or line of different color", definition_vi: "sọc vằn", example_en: "Each tiger has a unique pattern of dark stripes.", example_vi: "Mỗi con hổ đều có một kiểu sọc vằn tối màu độc nhất." },
    { id: 12, word: "spot", pos: "n", ipa: "/spɑːt/", definition_en: "A small round mark of different color on an animal", definition_vi: "đốm", example_en: "The cheetah has black spots across its golden body.", example_vi: "Báo săn có những đốm đen trên khắp cơ thể màu vàng kim." },
    { id: 13, word: "powerful", pos: "adj", ipa: "/ˈpaʊərfəl/", definition_en: "Having great strength, force, or physical energy", definition_vi: "hùng mạnh, quyền lực", example_en: "Lions have powerful jaws that can crush bones.", example_vi: "Sư tử có bộ hàm mạnh mẽ có thể nghiền nát xương." },
    { id: 14, word: "leopard", pos: "n", ipa: "/ˈlepərd/", definition_en: "A large wild cat with spotted fur that climbs trees", definition_vi: "báo hoa mai", example_en: "The spotted leopard dragged its food up a tall tree.", example_vi: "Con báo hoa mai đốm kéo thức ăn lên một cái cây cao." },
    { id: 15, word: "grizzly", pos: "n", ipa: "/ˈɡrɪzli/", definition_en: "A very large brown bear found in northern forests", definition_vi: "gấu xám", example_en: "The grizzly caught fresh salmon in the rapid river.", example_vi: "Con gấu xám bắt cá hồi tươi trong dòng sông chảy xiết." },
    { id: 16, word: "muscle", pos: "n", ipa: "/ˈmʌsəl/", definition_en: "Body tissue that contracts to produce movement", definition_vi: "cơ bắp", example_en: "Running builds strong leg muscles in wild animals.", example_vi: "Chạy nhảy giúp xây dựng cơ bắp chân khỏe mạnh ở động vật hoang dã." },
    { id: 17, word: "compare", pos: "v", ipa: "/kəmˈper/", definition_en: "Look at two things to see how they are different", definition_vi: "so sánh", example_en: "We can compare the weights of different wild predators.", example_vi: "Chúng ta có thể so sánh cân nặng của những loài thú săn mồi khác nhau." },
    { id: 18, word: "jaw", pos: "n", ipa: "/dʒɔː/", definition_en: "The bony lower part of the face holding the teeth", definition_vi: "hàm", example_en: "The crocodile snapped its large jaws shut loudly.", example_vi: "Con cá sấu ngoạm mạnh bộ hàm to lớn của nó lại thật kêu." },
    { id: 19, word: "weigh", pos: "v", ipa: "/weɪ/", definition_en: "Have a specified heaviness or measurement", definition_vi: "cân nặng", example_en: "Adult male tigers can weigh over two hundred kilograms.", example_vi: "Hổ đực trưởng thành có thể nặng hơn hai trăm ki-lô-gam." },
    { id: 20, word: "swift", pos: "adj", ipa: "/swɪft/", definition_en: "Moving very fast and with graceful agility", definition_vi: "nhanh nhẹn", example_en: "The swift falcon swooped down from the clear sky.", example_vi: "Chú chim ưng nhanh nhẹn lao xuống từ bầu trời trong xanh." }
  ],
  clil: {
    title_en: "Apex Predators: Comparing Physical Adaptations",
    title_vi: "Động Vật Săn Mồi Đỉnh Cao: So Sánh Thích Nghi Thể Chất",
    content_en: "Wild predators have evolved specialized body parts to hunt successfully. Some animals rely on immense strength, while others use incredible speed. For example, a Siberian tiger is bigger and heavier than a cheetah. An adult tiger can weigh three hundred kilograms. Its powerful legs and sharp claws help it catch large prey in deep snow. In contrast, a cheetah is much lighter and leaner. Its lightweight body and flexible spine help it accelerate rapidly. A cheetah runs faster than any other land animal. However, a leopard is a better climber than both of them. It has strong curved claws to pull food up into tall branches. Comparing these physical traits helps us understand how predators survive.",
    glossary: [
      { word: "predator", definition_en: "An animal that hunts and catches other animals for food", definition_vi: "động vật săn mồi" },
      { word: "claws", definition_en: "Sharp curved nails on the paws of hunting animals", definition_vi: "móng vuốt sắc nhọn" },
      { word: "jaw", definition_en: "The strong bony frame of the mouth holding teeth", definition_vi: "khung xương hàm" },
      { word: "weigh", definition_en: "To have a certain measure of physical heaviness", definition_vi: "có trọng lượng, cân nặng" },
      { word: "compare", definition_en: "To examine two creatures to observe differences in size or speed", definition_vi: "so sánh đối chiếu" }
    ],
    check_questions: [
      { id: 1, question_en: "Why is a cheetah faster than a Siberian tiger?", options: ["Because its body is lighter and more flexible", "Because it has thicker fur", "Because it is much heavier"], answer: "Because its body is lighter and more flexible" },
      { id: 2, question_en: "How do leopards use their strong curved claws?", options: ["To swim deep in the ocean", "To pull food high up into tree branches", "To dig underground burrows in sand"], answer: "To pull food high up into tree branches" },
      { id: 3, question_en: "What helps tigers catch large prey in the snow?", options: ["Powerful legs and sharp claws", "Wings and hollow bones", "A long flexible tail"], answer: "Powerful legs and sharp claws" }
    ]
  },
  shadowing_sentences: [
    { id: 1, text: "The Siberian tiger is bigger and stronger than the cheetah.", en: "The Siberian tiger is bigger and stronger than the cheetah.", vi: "Hổ Siberia to lớn hơn và khỏe hơn loài báo săn.", ipa: "/ðə saɪˈbɪriən ˈtaɪɡər ɪz ˈbɪɡər ænd ˈstrɔːŋɡər ðæn ðə ˈtʃiːtə/", words: ["The", "Siberian", "tiger", "is", "bigger", "and", "stronger", "than", "the", "cheetah"] },
    { id: 2, text: "A cheetah is lighter and runs faster across open fields.", en: "A cheetah is lighter and runs faster across open fields.", vi: "Báo săn nhẹ hơn và chạy nhanh hơn qua những cánh đồng mở.", ipa: "/ə ˈtʃiːtə ɪz ˈlaɪtər ænd rʌnz ˈfæstər əˈkrɔːs ˈoʊpən fiːldz/", words: ["A", "cheetah", "is", "lighter", "and", "runs", "faster", "across", "open", "fields"] },
    { id: 3, text: "Grizzly bears have sharper claws for catching river fish.", en: "Grizzly bears have sharper claws for catching river fish.", vi: "Gấu xám có móng vuốt sắc nhọn hơn để bắt cá dưới sông.", ipa: "/ˈɡrɪzli berz hæv ˈʃɑːrpər klɔːz fɔːr ˈkætʃɪŋ ˈrɪvər fɪʃ/", words: ["Grizzly", "bears", "have", "sharper", "claws", "for", "catching", "river", "fish"] },
    { id: 4, text: "The spotted leopard climbs trees better than the heavy lion.", en: "The spotted leopard climbs trees better than the heavy lion.", vi: "Báo hoa mai đốm trèo cây giỏi hơn chú sư tử nặng nề.", ipa: "/ðə ˈspɑːtɪd ˈlepərd klaɪmz triːz ˈbetər ðæn ðə ˈhevi ˈlaɪən/", words: ["The", "spotted", "leopard", "climbs", "trees", "better", "than", "the", "heavy", "lion"] },
    { id: 5, text: "Crocodiles have thicker skin and more powerful jaws.", en: "Crocodiles have thicker skin and more powerful jaws.", vi: "Cá sấu có lớp da dày hơn và bộ hàm mạnh mẽ hơn.", ipa: "/ˈkrɑːkədaɪlz hæv ˈθɪkər skɪn ænd mɔːr ˈpaʊərfəl dʒɔːz/", words: ["Crocodiles", "have", "thicker", "skin", "and", "more", "powerful", "jaws"] },
    { id: 6, text: "An adult tiger can weigh three hundred heavy kilograms.", en: "An adult tiger can weigh three hundred heavy kilograms.", vi: "Một chú hổ trưởng thành có thể nặng ba trăm ki-lô-gam nặng nề.", ipa: "/ən əˈdʌlt ˈtaɪɡər kæn weɪ θriː ˈhʌndrəd ˈhevi ˈkɪləɡræmz/", words: ["An", "adult", "tiger", "can", "weigh", "three", "hundred", "heavy", "kilograms"] },
    { id: 7, text: "We can compare the speed and strength of wild beasts.", en: "We can compare the speed and strength of wild beasts.", vi: "Chúng ta có thể so sánh tốc độ và sức mạnh của các loài thú hoang dã.", ipa: "/wiː kæn kəmˈper ðə spiːd ænd streŋθ ʌv waɪld biːsts/", words: ["We", "can", "compare", "the", "speed", "and", "strength", "of", "wild", "beasts"] },
    { id: 8, text: "Every hunting predator uses its body tools to survive.", en: "Every hunting predator uses its body tools to survive.", vi: "Mọi loài thú săn mồi đều dùng các công cụ cơ thể để sinh tồn.", ipa: "/ˈevri ˈhʌntɪŋ ˈpredətər ˈjuːzɪz ɪts ˈbɑːdi tuːlz tuː sərˈvaɪv/", words: ["Every", "hunting", "predator", "uses", "its", "body", "tools", "to", "survive"] }
  ],
  story_scenes: [
    { id: 1, scene_id: "scene_1", scene_number: 1, title_en: "The Beast Arena Hall", title_vi: "Đại Sảnh Đấu Trường Dã Thú", description_en: "Marcus and Maya look up at life-size predator models in the museum hall.", description: "Marcus and Maya look up at life-size predator models in the museum hall.", image_url: "/images/week40/webtoon_scene_1.png", audio_url: "/audio/week40/scene_1.mp3" },
    { id: 2, scene_id: "scene_2", scene_number: 2, title_en: "Inspecting Sharp Claws", title_vi: "Quan Sát Móng Vuốt Sắc Nhọn", description_en: "Marcus looks closely at the curved claws of a brown grizzly bear paw cast.", description: "Marcus looks closely at the curved claws of a brown grizzly bear paw cast.", image_url: "/images/week40/webtoon_scene_2.png", audio_url: "/audio/week40/scene_2.mp3" },
    { id: 3, scene_id: "scene_3", scene_number: 3, title_en: "The Cheetah Sprint Display", title_vi: "Khu Trưng Bày Tốc Độ Báo Săn", description_en: "Maya presses an interactive button to compare the running speeds of wild animals.", description: "Maya presses an interactive button to compare the running speeds of wild animals.", image_url: "/images/week40/webtoon_scene_3.png", audio_url: "/audio/week40/scene_3.mp3" },
    { id: 4, scene_id: "scene_4", scene_number: 4, title_en: "The Tree Climbing Leopard", title_vi: "Báo Hoa Mai Leo Cây", description_en: "Zoologist Dr. Miller points to a spotted leopard model perched in an artificial tree.", description: "Zoologist Dr. Miller points to a spotted leopard model perched in an artificial tree.", image_url: "/images/week40/webtoon_scene_4.png", audio_url: "/audio/week40/scene_4.mp3" },
    { id: 5, scene_id: "scene_5", scene_number: 5, title_en: "Awarding the Predator Badges", title_vi: "Trao Huy Hiệu Thám Hiểm Dã Thú", description_en: "Dr. Miller presents Marcus and Maya with Junior Zoologist badges.", description: "Dr. Miller presents Marcus and Maya with Junior Zoologist badges.", image_url: "/images/week40/webtoon_scene_5.png", audio_url: "/audio/week40/scene_5.mp3" }
  ],
  writing_data: {
    title: "Comparing Wild Predators at the Museum",
    prompt_en: "Look at the four pictures. Tell a story about Marcus and Maya comparing animals at the Beast Arena exhibition. Write 20 or more words.",
    prompt_vi: "Nhìn vào 4 bức tranh. Kể câu chuyện về Marcus và Maya so sánh các loài thú săn mồi tại triển lãm (từ 20 từ trở lên).",
    min_sentences: 3,
    min_words: 20,
    max_words: 80,
    model_sentence: "Marcus and Maya visited the Natural History Museum on Friday afternoon. First, they looked at the Siberian tiger with its sharp teeth. Next, they saw that the cheetah was lighter and faster. In the end, they learned how each predator uses its strength to survive.",
    word_bank: ["tiger", "cheetah", "stronger", "faster", "heavier", "claws", "teeth", "fur", "compare", "predator"],
    sentence_frames: [
      "In the beginning, Marcus and Maya visited the museum's ___ exhibit.",
      "They observed that the Siberian tiger had very sharp ___.",
      "Beside it, the lean cheetah was much lighter and ___.",
      "In the end, they learned that each predator has a unique ___."
    ],
    panels: [
      {
        panel_id: "panel_1",
        title_en: "Scene 1: Museum Beast Exhibition",
        title_vi: "Cảnh 1: Triển Lãm Dã Thú",
        image_url: "/images/week40/writing_panel_1.png",
        image_prompt: "Two children looking at an informative museum wall chart comparing tiger, lion, and cheetah sizes.",
        caption: "Marcus and Maya arrived at the museum to compare wild predators.",
        sentence_frame: "First, Marcus and Maya [visited the museum exhibition] on [Friday afternoon].",
        pills: ["visited the museum exhibition", "Friday afternoon", "looked at the chart", "Marcus and Maya"],
        connectors: ["First,", "On Friday afternoon,", "In the beginning,"]
      },
      {
        panel_id: "panel_2",
        title_en: "Scene 2: Examining Tiger Strength",
        title_vi: "Cảnh 2: Khám Phá Sức Mạnh Loài Hổ",
        image_url: "/images/week40/writing_panel_2.png",
        image_prompt: "A life-size model of a striped Siberian tiger showing sharp teeth and heavy muscular paws.",
        caption: "They noticed that the tiger was bigger and heavier than other cats.",
        sentence_frame: "Next, they saw that the [Siberian tiger] was much [stronger and heavier].",
        pills: ["Siberian tiger", "stronger and heavier", "sharp white teeth", "heavy paws"],
        connectors: ["Next,", "Then,", "Also,"]
      },
      {
        panel_id: "panel_3",
        title_en: "Scene 3: Examining Cheetah Speed",
        title_vi: "Cảnh 3: Khám Phá Tốc Độ Báo Săn",
        image_url: "/images/week40/writing_panel_3.png",
        image_prompt: "A sleek cheetah model poised in a running stance showing black spots and lean muscular legs.",
        caption: "The cheetah had a lighter body that allowed it to run faster.",
        sentence_frame: "After that, they learned that the [cheetah was lighter] and [ran much faster].",
        pills: ["cheetah was lighter", "ran much faster", "black spots", "lean body"],
        connectors: ["After that,", "Later,", "Also,"]
      },
      {
        panel_id: "panel_4",
        title_en: "Scene 4: Completing Science Notes",
        title_vi: "Cảnh 4: Hoàn Thành Ghi Chép Khoa Học",
        image_url: "/images/week40/writing_panel_4.png",
        image_prompt: "Two happy children writing on clipboards with a zoologist holding a model paw print.",
        caption: "They completed their science notes comparing predator strength and speed.",
        sentence_frame: "In the end, they completed their [science project comparing] wild [animal predators].",
        pills: ["science project comparing", "animal predators", "wrote notes", "smiled proudly"],
        connectors: ["In the end,", "Finally,", "At last,"]
      }
    ],
    ladder_stages: [
      {
        badge_label: "MODEL",
        title: "Scene 1: Museum Beast Exhibition",
        image_url: "/images/week40/writing_panel_1.png",
        caption: "Marcus and Maya arrived at the museum to compare wild predators.",
        frame_L1: "First, Marcus and Maya visited the museum. They wanted to compare the size and speed of wild predators.",
        connectors: ["First,", "On Friday afternoon,", "In the beginning,"],
        sentence_hint: "Write 2 sentences about visiting the museum exhibition.",
        ordered_chips: ["Marcus and Maya", "visited the museum", "to compare size and speed", "of wild predators"],
        pills: ["Marcus and Maya", "visited the museum", "looked at charts", "Friday afternoon"],
        sentence_frame: "First, Marcus and Maya [visited the museum] to compare [wild predators]."
      },
      {
        badge_label: "BUILD",
        title: "Scene 2: Examining Tiger Strength",
        image_url: "/images/week40/writing_panel_2.png",
        caption: "They noticed that the tiger was bigger and heavier than other cats.",
        frame_L1: "Next, they observed the Siberian tiger. It was much heavier than a cheetah and had sharp teeth.",
        connectors: ["Next,", "Then,", "Also,"],
        sentence_hint: "Write 2 sentences about the tiger's strength and teeth.",
        pills: ["Siberian tiger", "heavier than a cheetah", "sharp white teeth", "Marcus"],
        sentence_frame: "Next, they saw that the [Siberian tiger] was [heavier than a cheetah]."
      },
      {
        badge_label: "WRITE",
        title: "Scene 3: Examining Cheetah Speed",
        image_url: "/images/week40/writing_panel_3.png",
        caption: "The cheetah had a lighter body that allowed it to run faster.",
        frame_L1: "After that, they looked at the spotted cheetah. Its light body helped it run faster across open plains.",
        connectors: ["After that,", "Later,", "Also,"],
        sentence_hint: "Write 2 sentences about the cheetah's speed.",
        pills: ["spotted cheetah", "ran faster", "light body", "open plains"],
        sentence_frame: "After that, they saw that the [spotted cheetah] ran [faster across open plains]."
      },
      {
        badge_label: "EXPAND",
        title: "Scene 4: Completing Science Notes",
        image_url: "/images/week40/writing_panel_4.png",
        caption: "They completed their science notes comparing predator strength and speed.",
        frame_L1: "In the end, they talked with Dr. Miller. They proudly completed their notes comparing predator traits.",
        connectors: ["In the end,", "Finally,", "At last,"],
        sentence_hint: "Write 2 sentences about completing the comparison project.",
        pills: ["Dr. Miller", "completed their notes", "comparing predator traits", "smiled proudly"],
        sentence_frame: "In the end, they completed their notes [comparing predator traits] with [Dr. Miller]."
      }
    ]
  },
  speaking_data: {
    talkshow_prompt: {
      topic: "Comparing the Strength and Speed of Predators",
      question: "Hi Marcus! Which predator do you think is more impressive: the Siberian tiger or the African cheetah?",
      model_response: "I think both are amazing in different ways! The tiger is much bigger and heavier, with powerful jaws that can hunt large animals in the snow. But the cheetah has a lighter body and runs faster than any creature on land! Each animal has evolved the perfect body for its home."
    },
    info_exchange_cards: {
      table_a: {
        title: "Marcus's Siberian Tiger Study",
        subtitle: "Candidate's Question Card (Ask Examiner)",
        person: "Marcus",
        fields: [
          { id: "field_a1", cue_prompt: "how heavy / adult tiger?", cue_word: "how", is_missing: true, acceptable_questions: ["How heavy is an adult Siberian tiger?", "How much does the tiger weigh?", "How heavy is the tiger?"], nova_reply: "An adult Siberian tiger can weigh up to three hundred kilograms." },
          { id: "field_a2", cue_prompt: "where / tiger hunt?", cue_word: "where", is_missing: true, acceptable_questions: ["Where does the Siberian tiger hunt?", "Where does the tiger live?", "Where does it hunt its prey?"], nova_reply: "It hunts in snowy birch forests and rocky northern mountains." },
          { id: "field_a3", cue_prompt: "what / color of fur stripes?", cue_word: "what", is_missing: true, acceptable_questions: ["What color are the tiger's fur stripes?", "What pattern does the fur have?", "What color are its stripes?"], nova_reply: "It has dark black stripes over a thick golden-orange coat." },
          { id: "field_a4", cue_prompt: "why / have sharp claws?", cue_word: "why", is_missing: true, acceptable_questions: ["Why does the tiger have sharp claws?", "Why are its claws so sharp?", "How does it use its claws?"], nova_reply: "Its sharp curved claws help it grip prey and walk on slippery snow." },
          { id: "field_a5", cue_prompt: "how fast / can run?", cue_word: "how", is_missing: true, acceptable_questions: ["How fast can the tiger run?", "What is the tiger's running speed?", "How fast does it move?"], nova_reply: "It can sprint up to sixty kilometers per hour in short bursts." }
        ]
      },
      table_b: {
        title: "Maya's African Cheetah Study",
        subtitle: "Information Card (Answer Examiner's Questions)",
        person: "Maya",
        fields: [
          { id: "field_b1", cue_prompt: "how heavy / cheetah weigh?", cue_word: "how", value: "Between forty and sixty kilograms, making it very light.", nova_question: "How heavy is the African cheetah compared to a tiger?", acceptable_answers: ["Between forty and sixty kilograms, making it very light.", "Forty to sixty kilograms.", "About fifty kilograms."] },
          { id: "field_b2", cue_prompt: "where / cheetah hunt?", cue_word: "where", value: "Across flat open grasslands and sunny savanna plains.", nova_question: "Where does the cheetah hunt its daily prey?", acceptable_answers: ["Across flat open grasslands and sunny savanna plains.", "Across flat grasslands.", "On sunny savanna plains."] },
          { id: "field_b3", cue_prompt: "what / pattern on fur?", cue_word: "what", value: "Solid round black spots over a tawny golden coat.", nova_question: "What distinct pattern covers the cheetah's fur coat?", acceptable_answers: ["Solid round black spots over a tawny golden coat.", "Solid black spots.", "Round black spots."] },
          { id: "field_b4", cue_prompt: "how fast / can cheetah sprint?", cue_word: "how", value: "Over one hundred kilometers per hour in quick sprints.", nova_question: "How fast can the cheetah sprint across open plains?", acceptable_answers: ["Over one hundred kilometers per hour in quick sprints.", "Over one hundred kilometers per hour.", "One hundred kilometers per hour."] },
          { id: "field_b5", cue_prompt: "why / tail so long?", cue_word: "why", value: "Its long muscular tail acts like a rudder to steer fast turns.", nova_question: "Why does the cheetah have such a long and muscular tail?", acceptable_answers: ["Its long muscular tail acts like a rudder to steer fast turns.", "To steer sharp turns.", "To balance while sprinting."] }
        ]
      }
    }
  },
  cambridge_rw: {
    part1_definitions: [
      { id: 1, text: "Sharp curved nails on the paws of wild hunting animals.", target: "claws" },
      { id: 2, text: "The thick soft hair covering an animal to keep it warm.", target: "fur" },
      { id: 3, text: "An animal that hunts and catches other wild creatures for food.", target: "predator" },
      { id: 4, text: "The strong bony mouth structure that holds sharp teeth.", target: "jaw" },
      { id: 5, text: "Hard white mouth parts used for biting and chewing food.", target: "teeth" }
    ],
    part2_dialogue: {
      title: "Marcus & Maya Comparing Wild Predators",
      turns: [
        {
          id: 1,
          speaker: "Marcus",
          prompt: "Maya, is a Siberian tiger bigger than a cheetah?",
          options: [
            "Yes, a tiger is much bigger and heavier.",
            "No, cheetahs are the biggest cats.",
            "They both fly in the sky."
          ],
          answer: "Yes, a tiger is much bigger and heavier."
        },
        {
          id: 2,
          speaker: "Marcus",
          prompt: "Which animal runs faster across the open grass?",
          options: [
            "The cheetah runs much faster than the tiger.",
            "Tigers run faster than eagles.",
            "Bears are the fastest swimmers."
          ],
          answer: "The cheetah runs much faster than the tiger."
        },
        {
          id: 3,
          speaker: "Marcus",
          prompt: "Why do leopards have such sharp curved claws?",
          options: [
            "To pull food high up into tall trees.",
            "To eat green grass in the field.",
            "To swim across cold ocean water."
          ],
          answer: "To pull food high up into tall trees."
        },
        {
          id: 4,
          speaker: "Marcus",
          prompt: "Does a grizzly bear weigh more than a leopard?",
          options: [
            "Yes, grizzly bears are much heavier.",
            "No, leopards are heavier than bears.",
            "Bears have light feathers."
          ],
          answer: "Yes, grizzly bears are much heavier."
        },
        {
          id: 5,
          speaker: "Marcus",
          prompt: "Shall we write these animal facts on our science poster?",
          options: [
            "Yes, let's start writing them now!",
            "I bought a red toy car yesterday.",
            "No, it is raining outside."
          ],
          answer: "Yes, let's start writing them now!"
        }
      ],
      exchanges: [
        { speaker: "Marcus", text: "Maya, is a Siberian tiger bigger than a cheetah?" },
        { speaker: "Maya", text: "Yes, a tiger is much bigger and heavier." },
        { speaker: "Marcus", text: "Which animal runs faster across the open grass?" },
        { speaker: "Maya", text: "The cheetah runs much faster than the tiger." },
        { speaker: "Marcus", text: "Why do leopards have such sharp curved claws?" },
        { speaker: "Maya", text: "To pull food high up into tall trees." },
        { speaker: "Marcus", text: "Does a grizzly bear weigh more than a leopard?" },
        { speaker: "Maya", text: "Yes, grizzly bears are much heavier." },
        { speaker: "Marcus", text: "Shall we write these animal facts on our science poster?" },
        { speaker: "Maya", text: "Yes, let's start writing them now!" }
      ]
    },
    part6_cloze: {
      title: "Marcus's Field Notes: Comparing Big Cats",
      instructions: "Read the field notes and write the missing words. Write one word on each line.",
      text_template: "A Siberian tiger is much [1]_____ than a spotted cheetah. The tiger has powerful [2]_____ that crush bones easily. In contrast, the cheetah runs much [3]_____ across the open plain. Its body has dark [4]_____ over golden fur. We can [5]_____ these animals to see how they hunt.",
      answers: { "1": "stronger", "2": "jaws", "3": "faster", "4": "spots", "5": "compare" }
    }
  },
  minigames: {
    math_problems: [
      {
        id: "w40_p1",
        type: "comparison",
        title: "Predator Body Weight Comparison",
        question: "A male Siberian tiger weighs 300 kilograms. A cheetah weighs 60 kilograms. How much heavier is the tiger than the cheetah?",
        storyContext: "Marcus examines the museum animal scales to compare big cat body weights.",
        modelData: {
          bars: [
            { label: "Siberian Tiger", value: 300, color: "#f97316" },
            { label: "Cheetah", value: 60, color: "#eab308" }
          ],
          difference: 240,
          unit: "kg"
        },
        target_answer: 240,
        unit: "kg",
        steps: [
          "Start with the tiger's weight: 300 kg.",
          "Subtract the cheetah's weight: 60 kg.",
          "300 - 60 = 240 kg heavier."
        ]
      },
      {
        id: "w40_p2",
        type: "part_whole",
        title: "Total Food for the Big Cats",
        question: "The zoo keepers prepared 28 kilograms of meat for the lions and 16 kilograms for the leopards. How much meat did they prepare in total?",
        storyContext: "Maya tallies the food buckets before the afternoon feeding time.",
        modelData: {
          bars: [
            { label: "Lion Meat", value: 28, color: "#ef4444" },
            { label: "Leopard Meat", value: 16, color: "#8b5cf6" }
          ],
          total: 44,
          unit: "kg"
        },
        target_answer: 44,
        unit: "kg",
        steps: [
          "Add the lion food: 28 kg.",
          "Add the leopard food: 16 kg.",
          "28 + 16 = 44 kg in total."
        ]
      }
    ],
    action_lab_scenarios: [
      {
        stage: 1,
        title: "Claws and Teeth Matching",
        diagram_type: "predator_weapon_slots",
        instruction: "Match each physical tool to its hunting function.",
        items: [
          { label: "Sharp Curved Claws", target: "tree_climbing" },
          { label: "Crushing Powerful Jaws", target: "bone_crushing" },
          { label: "Flexible Agile Spine", target: "high_speed_running" }
        ]
      },
      {
        stage: 2,
        title: "Speed vs Strength Sorting",
        diagram_type: "speed_strength_matrix",
        instruction: "Sort the predators by their main hunting advantage.",
        items: [
          { label: "African Cheetah", target: "speed_specialist" },
          { label: "Grizzly Bear", target: "strength_specialist" },
          { label: "Spotted Leopard", target: "climbing_specialist" }
        ]
      },
      {
        stage: 3,
        title: "Apex Predator Rank",
        diagram_type: "predator_ranking_board",
        instruction: "Place the three predators in order from heaviest to lightest.",
        items: [
          { label: "Grizzly Bear (400kg)", target: "rank_1_heaviest" },
          { label: "Siberian Tiger (300kg)", target: "rank_2_medium" },
          { label: "Cheetah (50kg)", target: "rank_3_lightest" }
        ]
      }
    ],
    grammar_drills: [
      { sentence: "A Siberian tiger is heavier than an African cheetah.", options: ["heavier", "heavy", "heaviest"], answer: "heavier", explanation: "Use comparative adjective 'heavier' with 'than'." },
      { sentence: "The cheetah runs faster than any other land animal.", options: ["faster", "fast", "fastest"], answer: "faster", explanation: "Use comparative 'faster' when comparing two entities." },
      { sentence: "Grizzly bears have stronger jaws than wolves.", options: ["stronger", "strong", "strongest"], answer: "stronger", explanation: "Use comparative 'stronger' followed by 'than'." },
      { sentence: "A leopard climbs trees better than a heavy lion.", options: ["better", "good", "best"], answer: "better", explanation: "'Better' is the comparative form of 'well/good'." },
      { sentence: "We can compare the physical size of wild predators.", options: ["compare", "comparing", "compared"], answer: "compare", explanation: "Use bare infinitive 'compare' after modal verb 'can'." }
    ]
  }
};
