/**
 * scripts/specs_w41.mjs
 * Week 41: Life Cycles (Process)
 */

export const w41 = {
  week: 41,
  theme: "Life Cycles (Process)",
  title_en: "Life Cycles (Process)",
  title_vi: "Vòng Đời Tự Nhiên — Sự Biến Đổi Kỳ Diệu",
  cefr_level: "A2 Flyers",
  grammar_focus: "Present Simple 3rd Person (It changes, It grows, It becomes)",
  vocab_list: [
    { id: 1, word: "egg", pos: "n", ipa: "/eɡ/", definition_en: "An oval object produced by a female insect, bird, or reptile", definition_vi: "trứng", example_en: "The mother butterfly laid a tiny green egg on the leaf.", example_vi: "Bướm mẹ đẻ một quả trứng xanh nhỏ xíu trên chiếc lá." },
    { id: 2, word: "hatch", pos: "v", ipa: "/hætʃ/", definition_en: "Break out of an egg when ready to live", definition_vi: "nở", example_en: "Small caterpillars hatch after several sunny days.", example_vi: "Những chú sâu bướm nhỏ nở ra sau vài ngày nắng." },
    { id: 3, word: "caterpillar", pos: "n", ipa: "/ˈkætərpɪlər/", definition_en: "The worm-like young stage of a butterfly or moth", definition_vi: "sâu bướm", example_en: "The hungry caterpillar munched on fresh green leaves.", example_vi: "Chú sâu bướm đói bụng gặm những chiếc lá xanh tươi." },
    { id: 4, word: "chrysalis", pos: "n", ipa: "/ˈkrɪsəlɪs/", definition_en: "A hard protective case inside which a caterpillar changes", definition_vi: "nhộng, kén nhộng", example_en: "The caterpillar hung upside down and formed a chrysalis.", example_vi: "Chú sâu bướm treo ngược mình và hình thành một chiếc kén nhộng." },
    { id: 5, word: "butterfly", pos: "n", ipa: "/ˈbʌtərflaɪ/", definition_en: "An insect with four large, often brightly colored wings", definition_vi: "bươm bướm", example_en: "A colorful butterfly flitted gently above the flowers.", example_vi: "Một chú bươm bướm rực rỡ sắc màu bay lượn nhẹ nhàng trên những bông hoa." },
    { id: 6, word: "tadpole", pos: "n", ipa: "/ˈtædpoʊl/", definition_en: "The small aquatic larva of a frog with a tail", definition_vi: "nòng nọc", example_en: "Tiny tadpoles swam through the clear pond water.", example_vi: "Những chú nòng nọc tí hon bơi qua làn nước hồ trong vắt." },
    { id: 7, word: "frog", pos: "n", ipa: "/frɔːɡ/", definition_en: "A small tailless amphibian with long hind legs for leaping", definition_vi: "chú ếch", example_en: "The spotted frog jumped onto a floating water lily.", example_vi: "Chú ếch đốm nhảy lên một bông hoa súng đang trôi." },
    { id: 8, word: "stage", pos: "n", ipa: "/steɪdʒ/", definition_en: "A distinct period or step in a process of development", definition_vi: "giai đoạn", example_en: "Each stage of the life cycle brings dramatic changes.", example_vi: "Mỗi giai đoạn của vòng đời đều mang lại những thay đổi rõ rệt." },
    { id: 9, word: "grow", pos: "v", ipa: "/ɡroʊ/", definition_en: "Increase in physical size and strength over time", definition_vi: "phát triển, lớn lên", example_en: "Caterpillars grow rapidly because they eat day and night.", example_vi: "Sâu bướm lớn nhanh vì chúng ăn cả ngày lẫn đêm." },
    { id: 10, word: "change", pos: "v", ipa: "/tʃeɪndʒ/", definition_en: "Become different in form, nature, or appearance", definition_vi: "biến đổi", example_en: "Insects change their body shapes during their life cycles.", example_vi: "Các loài côn trùng biến đổi hình dạng cơ thể trong suốt vòng đời." },
    { id: 11, word: "leaf", pos: "n", ipa: "/liːf/", definition_en: "A flat green part of a plant growing from a stem", definition_vi: "chiếc lá", example_en: "The caterpillar chewed small round holes in the leafy plant.", example_vi: "Chú sâu bướm gặm những lỗ tròn nhỏ trên cây nhiều lá." },
    { id: 12, word: "wing", pos: "n", ipa: "/wɪŋ/", definition_en: "One of the paired parts on an insect or bird used for flying", definition_vi: "đôi cánh", example_en: "The newly emerged butterfly dried its delicate wings.", example_vi: "Chú bướm mới chui ra làm khô đôi cánh mỏng manh của mình." },
    { id: 13, word: "tail", pos: "n", ipa: "/teɪl/", definition_en: "The back part of an animal's body extending beyond the trunk", definition_vi: "chiếc đuôi", example_en: "The growing tadpole slowly absorbs its swimming tail.", example_vi: "Chú nòng nọc đang lớn dần tiêu biến chiếc đuôi bơi của mình." },
    { id: 14, word: "pond", pos: "n", ipa: "/pɑːnd/", definition_en: "A small body of still water formed naturally", definition_vi: "ao nước", example_en: "Dozens of young frogs live near the peaceful school pond.", example_vi: "Hàng chục chú ếch non sống gần ao nước yên bình của trường." },
    { id: 15, word: "swim", pos: "v", ipa: "/swɪm/", definition_en: "Propel oneself through water using bodily movement", definition_vi: "bơi", example_en: "Tadpoles swim swiftly away when a shadow moves over them.", example_vi: "Nòng nọc bơi nhanh đi khi có bóng đen di chuyển phía trên chúng." },
    { id: 16, word: "feed", pos: "v", ipa: "/fiːd/", definition_en: "Take food into the body for nourishment", definition_vi: "ăn, kiếm ăn", example_en: "Young caterpillars feed on fresh milkweed leaves.", example_vi: "Sâu bướm non kiếm ăn trên những chiếc lá bông tai tươi tốt." },
    { id: 17, word: "adult", pos: "n", ipa: "/əˈdʌlt/", definition_en: "A fully grown animal capable of reproduction", definition_vi: "cá thể trưởng thành", example_en: "The adult butterfly can fly long distances to lay eggs.", example_vi: "Bướm trưởng thành có thể bay những quãng đường dài để đẻ trứng." },
    { id: 18, word: "cycle", pos: "n", ipa: "/ˈsaɪkəl/", definition_en: "A series of biological events that are regularly repeated", definition_vi: "chu trình, vòng tuần hoàn", example_en: "The natural life cycle repeats every warm spring season.", example_vi: "Vòng đời tự nhiên lặp lại vào mỗi mùa xuân ấm áp." },
    { id: 19, word: "develop", pos: "v", ipa: "/dɪˈveləp/", definition_en: "Grow and become more mature or advanced", definition_vi: "phát triển", example_en: "Frog eggs develop into tadpoles inside the sunny water.", example_vi: "Trứng ếch phát triển thành nòng nọc bên trong làn nước đầy nắng." },
    { id: 20, word: "cocoon", pos: "n", ipa: "/kəˈkuːn/", definition_en: "A silky protective case spun by many insect larvae", definition_vi: "kén tơ", example_en: "Silkworms spin a soft silk cocoon before transforming.", example_vi: "Tằm nhả một chiếc kén tơ mềm mại trước khi biến đổi." }
  ],
  clil: {
    title_en: "The Miracle of Insect and Amphibian Life Cycles",
    title_vi: "Kỳ Diệu Vòng Đời Côn Trùng và Động Vật Lưỡng Cư",
    content_en: "Nature has amazing ways of growing living creatures. A life cycle describes how an animal is born, grows into an adult, and produces offspring. For example, a monarch butterfly begins as a tiny round egg on a green leaf. First, the egg hatches into a hungry caterpillar. The caterpillar eats fresh leaves day and night. Next, it forms a protective chrysalis around its soft body. Inside the chrysalis, its tissues change completely. Finally, a colorful butterfly emerges with strong wings. In ponds, frogs follow a similar process. A jelly egg develops into a swimming tadpole with gills. Then, the tadpole grows strong hind legs and loses its tail. It becomes a hopping adult frog. Understanding these sequence stages helps us appreciate how wildlife survives.",
    glossary: [
      { word: "cycle", definition_en: "A repeating sequence of biological development stages", definition_vi: "chu trình phát triển sinh học" },
      { word: "caterpillar", definition_en: "The worm-like eating stage of a young butterfly", definition_vi: "sâu bướm ăn lá" },
      { word: "chrysalis", definition_en: "The firm shell inside which a caterpillar changes", definition_vi: "vỏ kén nhộng biến hình" },
      { word: "tadpole", definition_en: "A swimming aquatic creature that grows into a frog", definition_vi: "nòng nọc sống dưới nước" },
      { word: "stage", definition_en: "A single distinct phase in a creature's life process", definition_vi: "giai đoạn biến đổi" }
    ],
    check_questions: [
      { id: 1, question_en: "What hatches from a butterfly egg?", options: ["A hungry caterpillar", "A flying adult bird", "A swimming tadpole"], answer: "A hungry caterpillar" },
      { id: 2, question_en: "What happens inside the chrysalis?", options: ["The caterpillar sleeps forever", "The caterpillar changes into a butterfly with wings", "The caterpillar lays small eggs"], answer: "The caterpillar changes into a butterfly with wings" },
      { id: 3, question_en: "How does a swimming tadpole become an adult frog?", options: ["It grows wings and flies into the clouds", "It grows strong legs and loses its swimming tail", "It moves into a desert burrow"], answer: "It grows strong legs and loses its swimming tail" }
    ]
  },
  shadowing_sentences: [
    { id: 1, text: "A tiny caterpillar hatches from an egg on the green leaf.", en: "A tiny caterpillar hatches from an egg on the green leaf.", vi: "Một chú sâu bướm tí hon nở ra từ quả trứng trên chiếc lá xanh.", ipa: "/ə ˈtaɪni ˈkætərpɪlər ˈhætʃɪz frʌm ən eɡ ɑːn ðə ɡriːn liːf/", words: ["A", "tiny", "caterpillar", "hatches", "from", "an", "egg", "on", "the", "green", "leaf"] },
    { id: 2, text: "The hungry caterpillar eats sweet green leaves every day.", en: "The hungry caterpillar eats sweet green leaves every day.", vi: "Chú sâu bướm đói bụng ăn những chiếc lá xanh ngọt ngào mỗi ngày.", ipa: "/ðə ˈhʌŋɡri ˈkætərpɪlər iːts swiːt ɡriːn liːvz ˈevri deɪ/", words: ["The", "hungry", "caterpillar", "eats", "sweet", "green", "leaves", "every", "day"] },
    { id: 3, text: "Next, the caterpillar builds a hard protective chrysalis.", en: "Next, the caterpillar builds a hard protective chrysalis.", vi: "Tiếp theo, sâu bướm tạo nên một chiếc kén nhộng cứng cáp để bảo vệ.", ipa: "/nekst ðə ˈkætərpɪlər bɪldz ə hɑːrd prəˈtektɪv ˈkrɪsəlɪs/", words: ["Next", "the", "caterpillar", "builds", "a", "hard", "protective", "chrysalis"] },
    { id: 4, text: "Inside the chrysalis, its body changes in amazing ways.", en: "Inside the chrysalis, its body changes in amazing ways.", vi: "Bên trong kén nhộng, cơ thể nó biến đổi theo những cách kỳ diệu.", ipa: "/ɪnˈsaɪd ðə ˈkrɪsəlɪs ɪts ˈbɑːdi ˈtʃeɪndʒɪz ɪn əˈmeɪzɪŋ weɪz/", words: ["Inside", "the", "chrysalis", "its", "body", "changes", "in", "amazing", "ways"] },
    { id: 5, text: "Finally, a colorful butterfly spreads its bright new wings.", en: "Finally, a colorful butterfly spreads its bright new wings.", vi: "Cuối cùng, một chú bươm bướm rực rỡ xòe đôi cánh mới tươi sáng.", ipa: "/ˈfaɪnəli ə ˈkʌlərfəl ˈbʌtərflaɪ spredz ɪts braɪt nuː wɪŋz/", words: ["Finally", "a", "colorful", "butterfly", "spreads", "its", "bright", "new", "wings"] },
    { id: 6, text: "In the pond, a tiny swimming tadpole grows longer legs.", en: "In the pond, a tiny swimming tadpole grows longer legs.", vi: "Dưới ao, chú nòng nọc bơi lội tí hon mọc thêm những chiếc chân dài hơn.", ipa: "/ɪn ðə pɑːnd ə ˈtaɪni ˈswɪmɪŋ ˈtædpoʊl ɡroʊz ˈlɔːŋɡər leɡz/", words: ["In", "the", "pond", "a", "tiny", "swimming", "tadpole", "grows", "longer", "legs"] },
    { id: 7, text: "Then, the tadpole loses its tail and becomes a frog.", en: "Then, the tadpole loses its tail and becomes a frog.", vi: "Sau đó, nòng nọc tiêu biến chiếc đuôi và trở thành chú ếch.", ipa: "/ðen ðə ˈtædpoʊl ˈluːzɪz ɪts teɪl ænd bɪˈkʌmz ə frɔːɡ/", words: ["Then", "the", "tadpole", "loses", "its", "tail", "and", "becomes", "a", "frog"] },
    { id: 8, text: "Every living creature completes its own unique life cycle.", en: "Every living creature completes its own unique life cycle.", vi: "Mọi sinh vật sống đều hoàn thành vòng đời độc đáo của riêng mình.", ipa: "/ˈevri ˈlɪvɪŋ ˈkriːtʃər kəmˈpliːts ɪts oʊn juːˈniːk laɪf ˈsaɪkəl/", words: ["Every", "living", "creature", "completes", "its", "own", "unique", "life", "cycle"] }
  ],
  story_scenes: [
    { id: 1, scene_id: "scene_1", scene_number: 1, title_en: "The School Biology Garden", title_vi: "Khu Vườn Sinh Học Của Trường", description_en: "Oliver and Sophia explore plant leaves with magnifying glasses beside the green glass greenhouse.", description: "Oliver and Sophia explore plant leaves with magnifying glasses beside the green glass greenhouse.", image_url: "/images/week41/webtoon_scene_1.png", audio_url: "/audio/week41/scene_1.mp3" },
    { id: 2, scene_id: "scene_2", scene_number: 2, title_en: "Discovering the Tiny Egg", title_vi: "Phát Hiện Quả Trứng Tí Hon", description_en: "Sophia spots a shiny white butterfly egg stuck to the underside of a milkweed leaf.", description: "Sophia spots a shiny white butterfly egg stuck to the underside of a milkweed leaf.", image_url: "/images/week41/webtoon_scene_2.png", audio_url: "/audio/week41/scene_2.mp3" },
    { id: 3, scene_id: "scene_3", scene_number: 3, title_en: "The Golden Chrysalis", title_vi: "Chiếc Kén Nhộng Ánh Vàng", description_en: "Oliver observes a calm chrysalis hanging securely under a wooden garden planter box.", description: "Oliver observes a calm chrysalis hanging securely under a wooden garden planter box.", image_url: "/images/week41/webtoon_scene_3.png", audio_url: "/audio/week41/scene_3.mp3" },
    { id: 4, scene_id: "scene_4", scene_number: 4, title_en: "Pond Tadpole Observation", title_vi: "Quan Sát Nòng Nọc Dưới Ao", description_en: "Science teacher Miss Parker shows the children tadpoles sprouting hind legs in the clear pond water.", description: "Science teacher Miss Parker shows the children tadpoles sprouting hind legs in the clear pond water.", image_url: "/images/week41/webtoon_scene_4.png", audio_url: "/audio/week41/scene_4.mp3" },
    { id: 5, scene_id: "scene_5", scene_number: 5, title_en: "The Flying Butterfly Farewell", title_vi: "Tạm Biệt Chú Bướm Bay Cao", description_en: "A gorgeous monarch butterfly gently rests on Oliver's finger before fluttering toward the sunny sky.", description: "A gorgeous monarch butterfly gently rests on Oliver's finger before fluttering toward the sunny sky.", image_url: "/images/week41/webtoon_scene_5.png", audio_url: "/audio/week41/scene_5.mp3" }
  ],
  writing_data: {
    title: "Oliver and Sophia's Butterfly Observation Project",
    prompt_en: "Look at the four pictures. Tell a story about Oliver and Sophia observing the life cycle of a butterfly in the garden. Write 20 or more words.",
    prompt_vi: "Nhìn vào 4 bức tranh. Kể câu chuyện về Oliver và Sophia quan sát vòng đời bươm bướm trong vườn (từ 20 từ trở lên).",
    min_sentences: 3,
    min_words: 20,
    max_words: 80,
    model_sentence: "Oliver and Sophia studied the garden plants during science class on Tuesday. First, they discovered a tiny egg on a leaf. Next, a hungry caterpillar hatched and ate daily. Then, it formed a protective chrysalis. In the end, a colorful butterfly flew gracefully into the sunny sky.",
    word_bank: ["caterpillar", "butterfly", "chrysalis", "hatched", "leaf", "stage", "cycle", "wings", "grows", "changes"],
    sentence_frames: [
      "In the morning, Oliver and Sophia found a tiny ___ on a leaf.",
      "Soon, a green caterpillar hatched and began to ___.",
      "Next, it hung upside down and formed a green ___.",
      "In the end, a bright butterfly emerged with colorful ___."
    ],
    panels: [
      {
        panel_id: "panel_1",
        title_en: "Scene 1: Finding the Egg",
        title_vi: "Cảnh 1: Tìm Thấy Quả Trứng",
        image_url: "/images/week41/writing_panel_1.png",
        image_prompt: "Two young students using hand lenses to look at a tiny butterfly egg on a broad green plant leaf.",
        caption: "Oliver and Sophia discovered a tiny round egg resting on a garden leaf.",
        sentence_frame: "First, Oliver and Sophia [discovered a tiny egg] on a [broad green leaf].",
        pills: ["discovered a tiny egg", "broad green leaf", "looked with lenses", "Tuesday morning"],
        connectors: ["First,", "On Tuesday morning,", "In the beginning,"]
      },
      {
        panel_id: "panel_2",
        title_en: "Scene 2: The Feeding Caterpillar",
        title_vi: "Cảnh 2: Chú Sâu Bướm Kiếm Ăn",
        image_url: "/images/week41/writing_panel_2.png",
        image_prompt: "A striped caterpillar chewing fresh green leaves inside an observation jar with air holes.",
        caption: "A striped caterpillar hatched from the egg and fed on fresh green leaves.",
        sentence_frame: "Next, a striped [caterpillar hatched] and [fed on fresh leaves].",
        pills: ["caterpillar hatched", "fed on fresh leaves", "grew bigger", "every day"],
        connectors: ["Next,", "Then,", "Also,"]
      },
      {
        panel_id: "panel_3",
        title_en: "Scene 3: The Hanging Chrysalis",
        title_vi: "Cảnh 3: Kén Nhộng Treo Ngược",
        image_url: "/images/week41/writing_panel_3.png",
        image_prompt: "A jade-green chrysalis with tiny golden dots hanging from a twig under the wooden lid of the cage.",
        caption: "The caterpillar formed a peaceful chrysalis to undergo metamorphosis.",
        sentence_frame: "After that, it [formed a green chrysalis] and [stayed very quiet].",
        pills: ["formed a green chrysalis", "stayed very quiet", "inside the case", "changed slowly"],
        connectors: ["After that,", "Later,", "Also,"]
      },
      {
        panel_id: "panel_4",
        title_en: "Scene 4: The Butterfly Flight",
        title_vi: "Cảnh 4: Chú Bướm Bay Lượn",
        image_url: "/images/week41/writing_panel_4.png",
        image_prompt: "An orange and black monarch butterfly taking off into the bright garden air as the children cheer.",
        caption: "A magnificent butterfly emerged and flew toward the sunny flower garden.",
        sentence_frame: "In the end, an [adult butterfly emerged] and [spread its colorful wings].",
        pills: ["adult butterfly emerged", "spread its colorful wings", "flew into the garden", "cheered happily"],
        connectors: ["In the end,", "Finally,", "At last,"]
      }
    ],
    ladder_stages: [
      {
        badge_label: "MODEL",
        title: "Scene 1: Finding the Egg",
        image_url: "/images/week41/writing_panel_1.png",
        caption: "Oliver and Sophia discovered a tiny round egg resting on a garden leaf.",
        frame_L1: "First, Oliver and Sophia explored the garden. They found a tiny butterfly egg on a green plant leaf.",
        connectors: ["First,", "On Tuesday morning,", "In the beginning,"],
        sentence_hint: "Write 2 sentences about finding the tiny egg in the garden.",
        ordered_chips: ["Oliver and Sophia", "found a tiny egg", "resting on a leaf", "in the garden"],
        pills: ["Oliver and Sophia", "tiny butterfly egg", "garden leaf", "Tuesday morning"],
        sentence_frame: "First, Oliver and Sophia found a [tiny butterfly egg] on a [garden leaf]."
      },
      {
        badge_label: "BUILD",
        title: "Scene 2: The Feeding Caterpillar",
        image_url: "/images/week41/writing_panel_2.png",
        caption: "A striped caterpillar hatched from the egg and fed on fresh green leaves.",
        frame_L1: "Next, a hungry caterpillar hatched out. It ate green leaves quickly and grew bigger every day.",
        connectors: ["Next,", "Then,", "Also,"],
        sentence_hint: "Write 2 sentences about the caterpillar hatching and eating.",
        pills: ["hungry caterpillar", "ate green leaves", "grew bigger", "every day"],
        sentence_frame: "Next, a [hungry caterpillar] hatched and [ate green leaves] to grow."
      },
      {
        badge_label: "WRITE",
        title: "Scene 3: The Hanging Chrysalis",
        image_url: "/images/week41/writing_panel_3.png",
        caption: "The caterpillar formed a peaceful chrysalis to undergo metamorphosis.",
        frame_L1: "After that, the caterpillar hung from a branch. It built a firm chrysalis where its body changed.",
        connectors: ["After that,", "Later,", "Also,"],
        sentence_hint: "Write 2 sentences about forming the chrysalis.",
        pills: ["hung from a branch", "firm chrysalis", "body changed", "stayed quiet"],
        sentence_frame: "After that, the caterpillar [built a firm chrysalis] where its [body changed]."
      },
      {
        badge_label: "EXPAND",
        title: "Scene 4: The Butterfly Flight",
        image_url: "/images/week41/writing_panel_4.png",
        caption: "A magnificent butterfly emerged and flew toward the sunny flower garden.",
        frame_L1: "In the end, a lovely butterfly flew out. It dried its orange wings and flew toward the bright flowers.",
        connectors: ["In the end,", "Finally,", "At last,"],
        sentence_hint: "Write 2 sentences about the butterfly drying its wings and flying.",
        pills: ["lovely butterfly", "dried its orange wings", "flew into the sunlight", "smiled proudly"],
        sentence_frame: "In the end, a [lovely butterfly] emerged and [flew into the sunlight]."
      }
    ]
  },
  speaking_data: {
    talkshow_prompt: {
      topic: "The Life Cycle of a Butterfly",
      question: "Hi Oliver! Can you explain how a tiny caterpillar changes into a flying butterfly?",
      model_response: "Yes! First, a mother butterfly lays an egg on a green leaf. When the egg hatches, a hungry caterpillar crawls out and eats leaves to grow big. Next, it builds a protective chrysalis around itself. Inside, its body changes completely. Finally, a colorful butterfly emerges and spreads its wings to fly!"
    },
    info_exchange_cards: {
      table_a: {
        title: "Oliver's Butterfly Life Cycle Study",
        subtitle: "Candidate's Question Card (Ask Examiner)",
        person: "Oliver",
        fields: [
          { id: "field_a1", cue_prompt: "where / butterfly lay egg?", cue_word: "where", is_missing: true, acceptable_questions: ["Where does the mother butterfly lay her egg?", "Where does the butterfly lay an egg?", "Where is the egg laid?"], nova_reply: "The butterfly lays a tiny round egg on the underside of a green leaf." },
          { id: "field_a2", cue_prompt: "what / caterpillar eat?", cue_word: "what", is_missing: true, acceptable_questions: ["What does the caterpillar eat?", "What food does the caterpillar eat?", "What does it eat after hatching?"], nova_reply: "It eats fresh green plant leaves day and night to grow." },
          { id: "field_a3", cue_prompt: "how long / inside chrysalis?", cue_word: "how", is_missing: true, acceptable_questions: ["How long does it stay inside the chrysalis?", "How many days does it spend in the chrysalis?", "How long does it take inside the chrysalis?"], nova_reply: "It stays inside the protective chrysalis for about ten to fourteen days." },
          { id: "field_a4", cue_prompt: "what color / newly emerged wings?", cue_word: "what", is_missing: true, acceptable_questions: ["What color are the butterfly's wings?", "What color are its new wings?", "What pattern does it have on its wings?"], nova_reply: "It has bright orange wings with striking black lines and white spots." },
          { id: "field_a5", cue_prompt: "why / dry wings before flying?", cue_word: "why", is_missing: true, acceptable_questions: ["Why must it dry its wings before flying?", "Why does it dry its wings?", "Why can't it fly immediately?"], nova_reply: "Its wings are wet and soft, so it must pump fluid into them to dry and harden." }
        ]
      },
      table_b: {
        title: "Sophia's Pond Frog Life Cycle Study",
        subtitle: "Information Card (Answer Examiner's Questions)",
        person: "Sophia",
        fields: [
          { id: "field_b1", cue_prompt: "where / mother frog lay eggs?", cue_word: "where", value: "In shallow calm water among floating pond plants.", nova_question: "Where does the mother frog lay her jelly-like eggs?", acceptable_answers: ["In shallow calm water among floating pond plants.", "In shallow calm water.", "In the pond water."] },
          { id: "field_b2", cue_prompt: "what / hatch from frog egg?", cue_word: "what", value: "A tiny swimming tadpole with gills and a long tail.", nova_question: "What creature hatches out of the frog egg?", acceptable_answers: ["A tiny swimming tadpole with gills and a long tail.", "A tiny swimming tadpole.", "A tadpole."] },
          { id: "field_b3", cue_prompt: "how / tadpole breathe underwater?", cue_word: "how", value: "Through delicate gills that absorb air from water.", nova_question: "How does the young tadpole breathe underwater?", acceptable_answers: ["Through delicate gills that absorb air from water.", "Through delicate gills.", "With its gills."] },
          { id: "field_b4", cue_prompt: "what legs / grow first?", cue_word: "what", value: "Two strong hind legs appear first near its tail.", nova_question: "Which legs appear first as the tadpole develops?", acceptable_answers: ["Two strong hind legs appear first near its tail.", "Two strong hind legs.", "Its hind legs."] },
          { id: "field_b5", cue_prompt: "how / adult frog move on land?", cue_word: "how", value: "It leaps powerfully using its long muscular legs.", nova_question: "How does the adult frog move when it leaves the pond?", acceptable_answers: ["It leaps powerfully using its long muscular legs.", "It leaps powerfully.", "By jumping and leaping."] }
        ]
      }
    }
  },
  cambridge_rw: {
    part1_definitions: [
      { id: 1, text: "A tiny oval object laid on a leaf that begins an insect's life.", target: "egg" },
      { id: 2, text: "A small striped creature with many legs that munches plant leaves.", target: "caterpillar" },
      { id: 3, text: "The firm shell inside which a caterpillar transforms its body.", target: "chrysalis" },
      { id: 4, text: "An insect with four delicate wings covered in colorful patterns.", target: "butterfly" },
      { id: 5, text: "A small water creature that hatches from frog spawn and swims with a tail.", target: "tadpole" }
    ],
    part2_dialogue: {
      title: "Oliver & Sophia Discussing the Butterfly Life Cycle",
      turns: [
        {
          id: 1,
          speaker: "Oliver",
          prompt: "Sophia, did you see the tiny green egg on the milkweed leaf?",
          options: [
            "Yes, Miss Parker showed us with a magnifying glass.",
            "No, I never play football after school.",
            "The train leaves at four o'clock."
          ],
          answer: "Yes, Miss Parker showed us with a magnifying glass."
        },
        {
          id: 2,
          speaker: "Oliver",
          prompt: "What does the caterpillar do as soon as it hatches?",
          options: [
            "It begins eating fresh plant leaves right away.",
            "It flies into a high tree canopy.",
            "It swims in deep ocean water."
          ],
          answer: "It begins eating fresh plant leaves right away."
        },
        {
          id: 3,
          speaker: "Oliver",
          prompt: "How does the caterpillar protect itself while changing?",
          options: [
            "It hangs upside down and forms a hard chrysalis.",
            "It builds a warm wooden box.",
            "It burrows into the dry desert sand."
          ],
          answer: "It hangs upside down and forms a hard chrysalis."
        },
        {
          id: 4,
          speaker: "Oliver",
          prompt: "Does the butterfly fly immediately after emerging?",
          options: [
            "No, it must wait for its wet wings to dry and harden.",
            "Yes, it flies faster than an eagle.",
            "It has no wings to fly."
          ],
          answer: "No, it must wait for its wet wings to dry and harden."
        },
        {
          id: 5,
          speaker: "Oliver",
          prompt: "Shall we draw this complete life cycle in our science books?",
          options: [
            "Yes, let's draw every stage carefully right now!",
            "I ate a ham sandwich for lunch.",
            "It was fifty kilometers away."
          ],
          answer: "Yes, let's draw every stage carefully right now!"
        }
      ],
      exchanges: [
        { speaker: "Oliver", text: "Sophia, did you see the tiny green egg on the milkweed leaf?" },
        { speaker: "Sophia", text: "Yes, Miss Parker showed us with a magnifying glass." },
        { speaker: "Oliver", text: "What does the caterpillar do as soon as it hatches?" },
        { speaker: "Sophia", text: "It begins eating fresh plant leaves right away." },
        { speaker: "Oliver", text: "How does the caterpillar protect itself while changing?" },
        { speaker: "Sophia", text: "It hangs upside down and forms a hard chrysalis." },
        { speaker: "Oliver", text: "Does the butterfly fly immediately after emerging?" },
        { speaker: "Sophia", text: "No, it must wait for its wet wings to dry and harden." },
        { speaker: "Oliver", text: "Shall we draw this complete life cycle in our science books?" },
        { speaker: "Sophia", text: "Yes, let's draw every stage carefully right now!" }
      ]
    },
    part6_cloze: {
      title: "Sophia's Science Journal: From Egg to Butterfly",
      instructions: "Read the science journal and write the missing words. Write one word on each line.",
      text_template: "A butterfly begins its life [1]_____ a tiny egg. When it hatches, the caterpillar [2]_____ green leaves to grow. After two weeks, it [3]_____ a shiny chrysalis. Inside, its body [4]_____ into an adult insect. At last, the butterfly [5]_____ its wings and flies away.",
      answers: { "1": "as", "2": "eats", "3": "becomes", "4": "changes", "5": "spreads" }
    }
  },
  minigames: {
    math_problems: [
      {
        id: "w41_p1",
        type: "part_whole",
        title: "Caterpillar Leaf Consumption",
        question: "A hungry caterpillar ate 18 small leaves on Monday and 24 leaves on Tuesday. How many leaves did it eat altogether?",
        storyContext: "Sophia tracks how much foliage the growing caterpillar needs each day.",
        modelData: {
          bars: [
            { label: "Monday Leaves", value: 18, color: "#22c55e" },
            { label: "Tuesday Leaves", value: 24, color: "#16a34a" }
          ],
          total: 42,
          unit: "leaves"
        },
        target_answer: 42,
        unit: "leaves",
        steps: [
          "Add the leaves from Monday: 18 leaves.",
          "Add the leaves from Tuesday: 24 leaves.",
          "18 + 24 = 42 leaves in total."
        ]
      },
      {
        id: "w41_p2",
        type: "comparison",
        title: "Pond Tadpole Stage Comparison",
        question: "In the garden pond, there are 35 swimming tadpoles and 15 young frogs. How many more tadpoles are there than frogs?",
        storyContext: "Oliver counts the amphibians at different development stages near the water lily pads.",
        modelData: {
          bars: [
            { label: "Tadpoles", value: 35, color: "#06b6d4" },
            { label: "Young Frogs", value: 15, color: "#84cc16" }
          ],
          difference: 20,
          unit: "amphibians"
        },
        target_answer: 20,
        unit: "amphibians",
        steps: [
          "Start with the 35 tadpoles.",
          "Subtract the 15 young frogs.",
          "35 - 15 = 20 more tadpoles."
        ]
      }
    ],
    action_lab_scenarios: [
      {
        stage: 1,
        title: "Butterfly Stage Sequence",
        diagram_type: "cycle_sequencing_ring",
        instruction: "Arrange the four butterfly life cycle stages in correct order.",
        items: [
          { label: "Step 1: Leaf Egg", target: "egg_stage" },
          { label: "Step 2: Feeding Caterpillar", target: "larva_stage" },
          { label: "Step 3: Resting Chrysalis", target: "pupa_stage" },
          { label: "Step 4: Flying Butterfly", target: "adult_stage" }
        ]
      },
      {
        stage: 2,
        title: "Frog Metamorphosis Lab",
        diagram_type: "amphibian_transformation_slots",
        instruction: "Match each amphibian body feature to its stage of life.",
        items: [
          { label: "Swimming Tail & Gills", target: "early_tadpole" },
          { label: "Sprouting Hind Legs", target: "developing_tadpole" },
          { label: "Leaping Muscular Legs & Lungs", target: "adult_frog" }
        ]
      },
      {
        stage: 3,
        title: "Habitat Needs for Metamorphosis",
        diagram_type: "lifecycle_habitat_board",
        instruction: "Assign each creature to the habitat it needs to transform safely.",
        items: [
          { label: "Monarch Caterpillar -> Milkweed Plant", target: "garden_leaves" },
          { label: "Spotted Tadpole -> Calm Freshwater Pond", target: "clean_pond" },
          { label: "Adult Butterfly -> Sunny Nectar Flowers", target: "flower_bed" }
        ]
      }
    ],
    grammar_drills: [
      { sentence: "A tiny caterpillar hatches from an egg on the leaf.", options: ["hatches", "hatch", "hatching"], answer: "hatches", explanation: "Use 3rd person singular 'hatches' with singular subject 'caterpillar'." },
      { sentence: "Inside the chrysalis, its body changes completely.", options: ["changes", "change", "changing"], answer: "changes", explanation: "Use 3rd person singular present tense 'changes' with 'its body'." },
      { sentence: "The tadpole grows strong legs before leaving the water.", options: ["grows", "grow", "growing"], answer: "grows", explanation: "Use 3rd person singular 'grows' with singular subject 'the tadpole'." },
      { sentence: "Finally, the insect becomes a colorful adult butterfly.", options: ["becomes", "become", "becoming"], answer: "becomes", explanation: "Use 3rd person singular 'becomes' with subject 'the insect'." },
      { sentence: "First, the mother frog lays her eggs in the pond.", options: ["lays", "lay", "laying"], answer: "lays", explanation: "Use 3rd person singular 'lays' with singular subject 'the mother frog'." }
    ]
  }
};
