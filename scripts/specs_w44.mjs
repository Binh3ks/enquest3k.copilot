/**
 * scripts/specs_w44.mjs
 * Week 44: The Cookie Monster (Subtraction Language)
 */

export const w44 = {
  week: 44,
  theme: "The Cookie Monster (Subtraction Language)",
  title_en: "The Cookie Monster (Subtraction Language)",
  title_vi: "Quái Vật Bánh Quy — Ngôn Ngữ Phép Trừ và Chia Sẻ",
  cefr_level: "A2 Flyers",
  grammar_focus: "Subtraction Language: \"Take away\", \"Left\", \"Minus\"",
  vocab_list: [
    { id: 1, word: "minus", pos: "prep", ipa: "/ˈmaɪnəs/", definition_en: "With the subtraction of; less by a specified number", definition_vi: "trừ đi", example_en: "Ten minus three equals seven chocolate cookies.", example_vi: "Mười trừ ba bằng bảy chiếc bánh quy sô-cô-la." },
    { id: 2, word: "subtract", pos: "v", ipa: "/səbˈtrækt/", definition_en: "Take away a number or amount from another number", definition_vi: "làm phép trừ", example_en: "We can subtract the cookies eaten from the total batch.", example_vi: "Chúng ta có thể trừ số bánh đã ăn khỏi tổng mẻ bánh." },
    { id: 3, word: "take away", pos: "v", ipa: "/teɪk əˈweɪ/", definition_en: "Remove a specified quantity from a larger collection", definition_vi: "lấy bớt đi", example_en: "If you take away two muffins, four muffins remain.", example_vi: "Nếu bạn lấy bớt đi hai chiếc bánh nướng, còn lại bốn chiếc." },
    { id: 4, word: "left", pos: "adj", ipa: "/left/", definition_en: "Remaining behind after other parts have been removed", definition_vi: "còn lại", example_en: "How many delicious cookies are left on the blue tray?", example_vi: "Còn lại bao nhiêu chiếc bánh quy thơm ngon trên khay xanh?" },
    { id: 5, word: "lose", pos: "v", ipa: "/luːz/", definition_en: "Be deprived of or cease to have something in possession", definition_vi: "mất đi, bớt đi", example_en: "Do not lose any counting tokens under the table.", example_vi: "Đừng làm mất bất kỳ đồng xu đếm nào dưới gầm bàn." },
    { id: 6, word: "cookie", pos: "n", ipa: "/ˈkʊki/", definition_en: "A sweet baked biscuit that is flat and round", definition_vi: "bánh quy", example_en: "Grandma baked a batch of warm oatmeal cookies.", example_vi: "Bà đã nướng một mẻ bánh quy yến mạch ấm nóng." },
    { id: 7, word: "jar", pos: "n", ipa: "/dʒɑːr/", definition_en: "A wide-mouthed cylindrical container made of glass", definition_vi: "lọ, hũ", example_en: "Lucas reached his hand into the glass cookie jar.", example_vi: "Lucas thò tay vào chiếc hũ thủy tinh đựng bánh quy." },
    { id: 8, word: "plate", pos: "n", ipa: "/pleɪt/", definition_en: "A flat dish from which food is served or eaten", definition_vi: "đĩa thức ăn", example_en: "Chloe arranged eight butter cookies on the white plate.", example_vi: "Chloe xếp tám chiếc bánh quy bơ lên chiếc đĩa trắng." },
    { id: 9, word: "share", pos: "v", ipa: "/ʃer/", definition_en: "Distribute or give a portion of something to others", definition_vi: "chia sẻ", example_en: "It is kind to share your sweet snacks with friends.", example_vi: "Thật tử tế khi chia sẻ đồ ăn vặt ngọt ngào của bạn với bạn bè." },
    { id: 10, word: "remain", pos: "v", ipa: "/rɪˈmeɪn/", definition_en: "Continue to exist after other parts are taken away", definition_vi: "còn lại, duy trì", example_en: "Only five golden cookies remain on the baking sheet.", example_vi: "Chỉ còn lại năm chiếc bánh vàng óng trên khay nướng." },
    { id: 11, word: "remove", pos: "v", ipa: "/rɪˈmuːv/", definition_en: "Take something away from its current position", definition_vi: "lấy đi, dọn đi", example_en: "Please remove three cookies to share with grandpa.", example_vi: "Làm ơn lấy đi ba chiếc bánh quy để chia sẻ với ông." },
    { id: 12, word: "snack", pos: "n", ipa: "/snæk/", definition_en: "A small amount of food eaten between regular meals", definition_vi: "món ăn nhẹ, đồ ăn vặt", example_en: "Fresh fruit and cookies make a lovely afternoon snack.", example_vi: "Trái cây tươi và bánh quy làm nên một bữa ăn nhẹ buổi chiều đáng yêu." },
    { id: 13, word: "monster", pos: "n", ipa: "/ˈmɑːnstər/", definition_en: "A playful furry creature in a story or puppet game", definition_vi: "quái vật (đồ chơi/rối)", example_en: "The blue puppet monster pretended to eat all the crumbs.", example_vi: "Chú rối quái vật xanh giả vờ ăn hết tất cả các mẩu vụn bánh." },
    { id: 14, word: "bake", pos: "v", ipa: "/beɪk/", definition_en: "Cook sweet food using dry heat inside an oven", definition_vi: "nướng bánh", example_en: "Grandma loves to bake ginger biscuits on rainy days.", example_vi: "Bà thích nướng bánh quy gừng vào những ngày mưa." },
    { id: 15, word: "hungry", pos: "adj", ipa: "/ˈhʌŋɡri/", definition_en: "Feeling an urgent physical need to eat food", definition_vi: "đói bụng", example_en: "The hungry children smelled the warm vanilla baking.", example_vi: "Những đứa trẻ đói bụng ngửi thấy mùi thơm vani nướng ấm áp." },
    { id: 16, word: "fewer", pos: "adj", ipa: "/ˈfjuːər/", definition_en: "A smaller number of separate individual items", definition_vi: "ít hơn (cho danh từ đếm được)", example_en: "There are fewer cookies on the tray than before.", example_vi: "Có ít bánh quy trên khay hơn so với lúc trước." },
    { id: 17, word: "difference", pos: "n", ipa: "/ˈdɪfərəns/", definition_en: "The quantity remaining after one value is subtracted", definition_vi: "hiệu số", example_en: "The difference between ten and seven is three.", example_vi: "Hiệu số giữa mười và bảy là ba." },
    { id: 18, word: "delicious", pos: "adj", ipa: "/dɪˈlɪʃəs/", definition_en: "Highly pleasing to the sense of taste; yummy", definition_vi: "thơm ngon", example_en: "These crispy cinnamon cookies are truly delicious.", example_vi: "Những chiếc bánh quy quế giòn rụm này thực sự rất thơm ngon." },
    { id: 19, word: "tray", pos: "n", ipa: "/treɪ/", definition_en: "A flat shallow container used for holding food dishes", definition_vi: "khay đựng", example_en: "Grandma pulled a hot metal tray out of the oven.", example_vi: "Bà kéo một khay kim loại nóng hổi ra khỏi lò nướng." },
    { id: 20, word: "batch", pos: "n", ipa: "/bætʃ/", definition_en: "An amount of food produced together in one baking", definition_vi: "mẻ bánh", example_en: "This fresh batch of cookies has twelve sweet pieces.", example_vi: "Mẻ bánh quy mới này có mười hai chiếc ngọt ngào." }
  ],
  clil: {
    title_en: "The Story of Subtraction: Counting What Remains",
    title_vi: "Câu Chuyện Phép Trừ: Đếm Những Gì Còn Lại",
    content_en: "Subtraction is the math language we use when items are taken away or shared. While addition combines things, subtraction helps us find the difference between amounts. In Grandma Baker's sunny kitchen, Lucas and Chloe practice subtraction with baked treats. Imagine you have a fresh batch of ten crispy cookies on a tray. If a friendly puppet monster takes away four cookies for an afternoon snack, how many remain? To solve this puzzle, we count backward from ten. We say aloud: ten minus four equals six cookies left. We can also ask how many fewer cookies there are now. Using math words like minus, take away, and left helps us explain real everyday situations clearly. Math helps us share fairly with everyone.",
    glossary: [
      { word: "subtract", definition_en: "To take one number away from another to find the remainder", definition_vi: "lấy bớt một số khỏi số khác để tìm phần còn lại" },
      { word: "minus", definition_en: "A mathematical word meaning with the subtraction of", definition_vi: "từ chỉ phép trừ mang nghĩa trừ đi" },
      { word: "take away", definition_en: "To remove a certain quantity from a larger collection", definition_vi: "lấy bớt một lượng ra khỏi tập hợp lớn hơn" },
      { word: "left", definition_en: "Remaining behind after some pieces have been removed", definition_vi: "còn sót lại sau khi đã lấy bớt đi" },
      { word: "difference", definition_en: "The exact amount by which two numbers differ", definition_vi: "khoảng chênh lệch chính xác giữa hai số" }
    ],
    check_questions: [
      { id: 1, question_en: "What happens when you take away four cookies from ten?", options: ["Six cookies are left on the tray", "Fourteen cookies appear", "All the cookies turn into apples"], answer: "Six cookies are left on the tray" },
      { id: 2, question_en: "Which sentence explains 10 - 4 = 6 correctly in words?", options: ["Ten plus four equals six", "Ten minus four equals six", "Ten times four makes six"], answer: "Ten minus four equals six" },
      { id: 3, question_en: "Why do we use words like 'take away' and 'left'?", options: ["To describe real everyday sharing situations clearly", "To make math confusing", "To hide the cookies from friends"], answer: "To describe real everyday sharing situations clearly" }
    ]
  },
  shadowing_sentences: [
    { id: 1, text: "Grandma baked ten delicious cookies on a wide metal tray.", en: "Grandma baked ten delicious cookies on a wide metal tray.", vi: "Bà đã nướng mười chiếc bánh quy thơm ngon trên chiếc khay kim loại rộng.", ipa: "/ˈɡrænmɑː beɪkt ten dɪˈlɪʃəs ˈkʊkiz ɑːn ə waɪd ˈmetəl treɪ/", words: ["Grandma", "baked", "ten", "delicious", "cookies", "on", "a", "wide", "metal", "tray"] },
    { id: 2, text: "The playful puppet monster wants to take away four cookies.", en: "The playful puppet monster wants to take away four cookies.", vi: "Chú rối quái vật tinh nghịch muốn lấy bớt đi bốn chiếc bánh quy.", ipa: "/ðə ˈpleɪfəl ˈpʌpɪt ˈmɑːnstər wɑːnts tuː teɪk əˈweɪ fɔːr ˈkʊkiz/", words: ["The", "playful", "puppet", "monster", "wants", "to", "take", "away", "four", "cookies"] },
    { id: 3, text: "Ten minus four leaves six sweet cookies on the plate.", en: "Ten minus four leaves six sweet cookies on the plate.", vi: "Mười trừ bốn còn lại sáu chiếc bánh quy ngọt ngào trên đĩa.", ipa: "/ten ˈmaɪnəs fɔːr liːvz sɪks swiːt ˈkʊkiz ɑːn ðə pleɪt/", words: ["Ten", "minus", "four", "leaves", "six", "sweet", "cookies", "on", "the", "plate"] },
    { id: 4, text: "How many crunchy cookies are left after snack time?", en: "How many crunchy cookies are left after snack time?", vi: "Còn lại bao nhiêu chiếc bánh quy giòn sau giờ ăn nhẹ?", ipa: "/haʊ ˈmeni ˈkrʌntʃi ˈkʊkiz ɑːr left ˈæftər snæk taɪm/", words: ["How", "many", "crunchy", "cookies", "are", "left", "after", "snack", "time"] },
    { id: 5, text: "We subtract the cookies eaten from the total baking batch.", en: "We subtract the cookies eaten from the total baking batch.", vi: "Chúng tôi trừ số bánh đã ăn khỏi tổng mẻ bánh nướng.", ipa: "/wiː səbˈtrækt ðə ˈkʊkiz ˈiːtən frʌm ðə ˈtoʊtəl ˈbeɪkɪŋ bætʃ/", words: ["We", "subtract", "the", "cookies", "eaten", "from", "the", "total", "baking", "batch"] },
    { id: 6, text: "Lucas placed two treats into the glass cookie jar.", en: "Lucas placed two treats into the glass cookie jar.", vi: "Lucas đặt hai chiếc bánh vào trong chiếc hũ bánh quy thủy tinh.", ipa: "/ˈluːkəs pleɪst tuː triːts ˈɪntuː ðə ɡlæs ˈkʊki dʒɑːr/", words: ["Lucas", "placed", "two", "treats", "into", "the", "glass", "cookie", "jar"] },
    { id: 7, text: "Chloe loves to share her favorite snacks with friends.", en: "Chloe loves to share her favorite snacks with friends.", vi: "Chloe rất thích chia sẻ những món ăn vặt yêu thích với bạn bè.", ipa: "/ˈkloʊi lʌvz tuː ʃer hɜːr ˈfeɪvərɪt snæks wɪð frendz/", words: ["Chloe", "loves", "to", "share", "her", "favorite", "snacks", "with", "friends"] },
    { id: 8, text: "Subtracting numbers tells us how many items still remain.", en: "Subtracting numbers tells us how many items still remain.", vi: "Phép trừ các con số cho chúng ta biết còn lại bao nhiêu đồ vật.", ipa: "/səbˈtræktɪŋ ˈnʌmbərz telz ʌs haʊ ˈmeni ˈaɪtəmz stɪl rɪˈmeɪn/", words: ["Subtracting", "numbers", "tells", "us", "how", "many", "items", "still", "remain"] }
  ],
  story_scenes: [
    { id: 1, scene_id: "scene_1", scene_number: 1, title_en: "Grandma's Sunny Kitchen", title_vi: "Gian Bếp Ngập Nắng Của Bà", description_en: "Grandma Baker places a steaming tray of twelve round chocolate chip cookies on the table.", description: "Grandma Baker places a steaming tray of twelve round chocolate chip cookies on the table.", image_url: "/images/week44/webtoon_scene_1.png", audio_url: "/audio/week44/scene_1.mp3" },
    { id: 2, scene_id: "scene_2", scene_number: 2, title_en: "Counting the Fresh Batch", title_vi: "Đếm Mẻ Bánh Mới Nướng", description_en: "Lucas and Chloe count the twelve cookies proudly before putting them onto blue serving plates.", description: "Lucas and Chloe count the twelve cookies proudly before putting them onto blue serving plates.", image_url: "/images/week44/webtoon_scene_2.png", audio_url: "/audio/week44/scene_2.mp3" },
    { id: 3, scene_id: "scene_3", scene_number: 3, title_en: "The Cookie Monster Visits", title_vi: "Quái Vật Bánh Quy Ghé Thăm", description_en: "Lucas puts on a furry blue Cookie Monster puppet and pretends to take away four crunchy cookies.", description: "Lucas puts on a furry blue Cookie Monster puppet and pretends to take away four crunchy cookies.", image_url: "/images/week44/webtoon_scene_3.png", audio_url: "/audio/week44/scene_3.mp3" },
    { id: 4, scene_id: "scene_4", scene_number: 4, title_en: "Calculating How Many Left", title_vi: "Tính Xem Còn Lại Bao Nhiêu", description_en: "Chloe uses a wooden math slate to write the equation: twelve minus four equals eight cookies left.", description: "Chloe uses a wooden math slate to write the equation: twelve minus four equals eight cookies left.", image_url: "/images/week44/webtoon_scene_4.png", audio_url: "/audio/week44/scene_4.mp3" },
    { id: 5, scene_id: "scene_5", scene_number: 5, title_en: "Sharing with the Family", title_vi: "Chia Sẻ Cùng Cả Nhà", description_en: "Grandma smiles warmly as Lucas and Chloe share the remaining cookies with their happy grandfather.", description: "Grandma smiles warmly as Lucas and Chloe share the remaining cookies with their happy grandfather.", image_url: "/images/week44/webtoon_scene_5.png", audio_url: "/audio/week44/scene_5.mp3" }
  ],
  writing_data: {
    title: "Lucas and Chloe's Cookie Subtraction Story",
    prompt_en: "Look at the four pictures. Tell a story about Lucas and Chloe subtracting cookies in Grandma's kitchen. Write 20 or more words.",
    prompt_vi: "Nhìn vào 4 bức tranh. Kể câu chuyện về Lucas và Chloe làm phép trừ bánh quy trong bếp của bà (từ 20 từ trở lên).",
    min_sentences: 3,
    min_words: 20,
    max_words: 80,
    model_sentence: "Grandma Baker baked ten delicious cookies on Thursday afternoon. First, the children counted all ten cookies on a plate. Next, Lucas used a blue puppet monster to take away four cookies. In the end, they calculated six cookies left to share with grandpa.",
    word_bank: ["cookies", "minus", "take away", "left", "plate", "monster", "hungry", "baked", "share", "subtract"],
    sentence_frames: [
      "In the beginning, Grandma baked ten sweet ___ on a tray.",
      "First, Lucas and Chloe counted them on the kitchen ___.",
      "Next, a playful puppet monster came to ___ four cookies.",
      "In the end, ten minus four leaves six cookies ___ to share."
    ],
    panels: [
      {
        panel_id: "panel_1",
        title_en: "Scene 1: Fresh Batch of Cookies",
        title_vi: "Cảnh 1: Mẻ Bánh Quy Mới",
        image_url: "/images/week44/writing_panel_1.png",
        image_prompt: "Grandma Baker showing ten warm chocolate cookies on a metal baking tray to two smiling children.",
        caption: "Grandma baked ten delicious cookies on a shiny metal tray.",
        sentence_frame: "First, Grandma Baker [baked ten cookies] on a [shiny baking tray].",
        pills: ["baked ten cookies", "shiny baking tray", "smelled wonderful", "Thursday afternoon"],
        connectors: ["First,", "On Thursday afternoon,", "In the beginning,"]
      },
      {
        panel_id: "panel_2",
        title_en: "Scene 2: Counting on the Plate",
        title_vi: "Cảnh 2: Đếm Bánh Trên Đĩa",
        image_url: "/images/week44/writing_panel_2.png",
        image_prompt: "A boy and girl pointing and counting ten cookies arranged neatly on a ceramic plate.",
        caption: "Lucas and Chloe counted all ten cookies together on the plate.",
        sentence_frame: "Next, Lucas and Chloe [counted ten cookies] on the [white ceramic plate].",
        pills: ["counted ten cookies", "white ceramic plate", "counted aloud", "ten sweet treats"],
        connectors: ["Next,", "Then,", "Also,"]
      },
      {
        panel_id: "panel_3",
        title_en: "Scene 3: Monster Takes Away Four",
        title_vi: "Cảnh 3: Quái Vật Lấy Bớt Bốn Chiếc",
        image_url: "/images/week44/writing_panel_3.png",
        image_prompt: "Lucas using a blue furry puppet monster to take away four cookies from the plate into a napkin.",
        caption: "A playful puppet monster took away four cookies for snack time.",
        sentence_frame: "After that, the [puppet monster] took [away four cookies] for snack.",
        pills: ["puppet monster", "away four cookies", "took them away", "laughed cheerfully"],
        connectors: ["After that,", "Later,", "Also,"]
      },
      {
        panel_id: "panel_4",
        title_en: "Scene 4: Six Cookies Left",
        title_vi: "Cảnh 4: Còn Lại Sáu Chiếc Bánh",
        image_url: "/images/week44/writing_panel_4.png",
        image_prompt: "Children writing on a chalkboard 10 - 4 = 6 with six remaining cookies on the table.",
        caption: "They calculated that ten minus four equals six cookies left.",
        sentence_frame: "In the end, they [calculated that six cookies] were [left on the plate].",
        pills: ["calculated that six cookies", "left on the plate", "ten minus four", "shared with grandpa"],
        connectors: ["In the end,", "Finally,", "At last,"]
      }
    ],
    ladder_stages: [
      {
        badge_label: "MODEL",
        title: "Scene 1: Fresh Batch of Cookies",
        image_url: "/images/week44/writing_panel_1.png",
        caption: "Grandma baked ten delicious cookies on a shiny metal tray.",
        frame_L1: "First, Grandma baked ten sweet cookies. She placed the warm baking tray on the wooden table.",
        connectors: ["First,", "On Thursday afternoon,", "In the beginning,"],
        sentence_hint: "Write 2 sentences about Grandma baking ten sweet cookies.",
        ordered_chips: ["Grandma baked", "ten sweet cookies", "on the warm tray", "in the kitchen"],
        pills: ["Grandma baked", "ten sweet cookies", "warm baking tray", "wooden table"],
        sentence_frame: "First, Grandma baked [ten sweet cookies] on a [warm baking tray]."
      },
      {
        badge_label: "BUILD",
        title: "Scene 2: Counting on the Plate",
        image_url: "/images/week44/writing_panel_2.png",
        caption: "Lucas and Chloe counted all ten cookies together on the plate.",
        frame_L1: "Next, the children counted the cookies. There were ten round treats resting on the plate.",
        connectors: ["Next,", "Then,", "Also,"],
        sentence_hint: "Write 2 sentences about counting the ten cookies on the plate.",
        pills: ["counted the cookies", "ten round treats", "on the plate", "Lucas and Chloe"],
        sentence_frame: "Next, Lucas and Chloe [counted ten cookies] on the [serving plate]."
      },
      {
        badge_label: "WRITE",
        title: "Scene 3: Monster Takes Away Four",
        image_url: "/images/week44/writing_panel_3.png",
        caption: "A playful puppet monster took away four cookies for snack time.",
        frame_L1: "After that, Lucas put on a puppet. The blue Cookie Monster took away four cookies for tea.",
        connectors: ["After that,", "Later,", "Also,"],
        sentence_hint: "Write 2 sentences about taking away four cookies.",
        pills: ["puppet monster", "took away four cookies", "for afternoon tea", "Lucas laughed"],
        sentence_frame: "After that, the [puppet monster] took away [four sweet cookies]."
      },
      {
        badge_label: "EXPAND",
        title: "Scene 4: Six Cookies Left",
        image_url: "/images/week44/writing_panel_4.png",
        caption: "They calculated that ten minus four equals six cookies left.",
        frame_L1: "In the end, Chloe wrote the math problem. Ten minus four leaves six cookies left to share.",
        connectors: ["In the end,", "Finally,", "At last,"],
        sentence_hint: "Write 2 sentences about how many cookies are left to share.",
        pills: ["ten minus four", "leaves six cookies left", "shared with grandpa", "smiled proudly"],
        sentence_frame: "In the end, ten minus four leaves [six cookies left] to [share with grandpa]."
      }
    ]
  },
  speaking_data: {
    talkshow_prompt: {
      topic: "Explaining Subtraction with Snacks",
      question: "Hi Chloe! How do you use cookies to explain subtraction to your friends?",
      model_response: "I explain subtraction by taking cookies away from a plate! If we start with eight cookies and my brother eats three, we subtract three from eight. Eight minus three leaves five cookies left. Subtraction tells us the difference between what we had and what remains!"
    },
    info_exchange_cards: {
      table_a: {
        title: "Lucas's Cookie Monster Subtraction",
        subtitle: "Candidate's Question Card (Ask Examiner)",
        person: "Lucas",
        fields: [
          { id: "field_a1", cue_prompt: "how many / cookies on tray at start?", cue_word: "how", is_missing: true, acceptable_questions: ["How many cookies were on the tray at the start?", "How many cookies did Grandma bake?", "How many cookies were on the plate?"], nova_reply: "Grandma baked ten delicious chocolate cookies on the tray." },
          { id: "field_a2", cue_prompt: "who / took away four cookies?", cue_word: "who", is_missing: true, acceptable_questions: ["Who took away four cookies?", "Who took four cookies away?", "Who took the cookies for a snack?"], nova_reply: "The funny blue Cookie Monster puppet took away four cookies." },
          { id: "field_a3", cue_prompt: "what / subtraction equation?", cue_word: "what", is_missing: true, acceptable_questions: ["What is the subtraction equation?", "What math equation did they write?", "What was the subtraction sentence?"], nova_reply: "The subtraction equation is: ten minus four equals six." },
          { id: "field_a4", cue_prompt: "how many / cookies left?", cue_word: "how", is_missing: true, acceptable_questions: ["How many cookies were left?", "How many cookies remain on the plate?", "How many cookies are left on the tray?"], nova_reply: "There are six sweet cookies left on the ceramic plate." },
          { id: "field_a5", cue_prompt: "who / share remaining cookies with?", cue_word: "who", is_missing: true, acceptable_questions: ["Who did they share the remaining cookies with?", "Who did they give the remaining cookies to?", "Who ate the rest of the cookies?"], nova_reply: "They shared the remaining six cookies with their kind grandfather." }
        ]
      },
      table_b: {
        title: "Chloe's Fruit Tart Subtraction",
        subtitle: "Information Card (Answer Examiner's Questions)",
        person: "Chloe",
        fields: [
          { id: "field_b1", cue_prompt: "how many / strawberry tarts on plate?", cue_word: "how", value: "Eight small homemade strawberry tarts on a plate.", nova_question: "How many strawberry tarts were on Chloe's plate initially?", acceptable_answers: ["Eight small homemade strawberry tarts on a plate.", "Eight strawberry tarts.", "Eight tarts."] },
          { id: "field_b2", cue_prompt: "how many / tarts did friends eat?", cue_word: "how", value: "Three friends each ate one tart, so three were removed.", nova_question: "How many fruit tarts were eaten during break time?", acceptable_answers: ["Three friends each ate one tart, so three were removed.", "Three tarts were eaten.", "Three tarts."] },
          { id: "field_b3", cue_prompt: "what / math equation sentence?", cue_word: "what", value: "Eight minus three leaves five tarts left on the dish.", nova_question: "What subtraction sentence describes the remaining tarts?", acceptable_answers: ["Eight minus three leaves five tarts left on the dish.", "Eight minus three equals five.", "Five tarts left."] },
          { id: "field_b4", cue_prompt: "where / put remaining five tarts?", cue_word: "where", value: "Inside a cool glass container in the refrigerator.", nova_question: "Where did Chloe store the remaining five tarts?", acceptable_answers: ["Inside a cool glass container in the refrigerator.", "In the refrigerator.", "In a glass container."] },
          { id: "field_b5", cue_prompt: "why / subtraction important in kitchen?", cue_word: "why", value: "It helps us count ingredients and share food fairly.", nova_question: "Why is subtraction an important skill in the kitchen?", acceptable_answers: ["It helps us count ingredients and share food fairly.", "To share food fairly.", "It helps us count ingredients."] }
        ]
      }
    }
  },
  cambridge_rw: {
    part1_definitions: [
      { id: 1, text: "A preposition meaning with the subtraction of a specified amount.", target: "minus" },
      { id: 2, text: "A sweet flat biscuit baked in an oven that children love to eat.", target: "cookie" },
      { id: 3, text: "Remaining behind after other parts have been taken away.", target: "left" },
      { id: 4, text: "To give a portion of your food or toys to another person.", target: "share" },
      { id: 5, text: "A flat shallow dish used for serving food or snacks.", target: "plate" }
    ],
    part2_dialogue: {
      title: "Lucas & Chloe Discussing Cookie Subtraction",
      turns: [
        {
          id: 1,
          speaker: "Lucas",
          prompt: "Chloe, how many cookies did Grandma bake on the tray?",
          options: [
            "She baked ten delicious chocolate cookies.",
            "She bought three blue umbrellas.",
            "It is seven o'clock in the morning."
          ],
          answer: "She baked ten delicious chocolate cookies."
        },
        {
          id: 2,
          speaker: "Lucas",
          prompt: "What happened when the Cookie Monster puppet arrived?",
          options: [
            "He took away four cookies for an afternoon snack.",
            "He painted the kitchen ceiling green.",
            "He ran to the train station."
          ],
          answer: "He took away four cookies for an afternoon snack."
        },
        {
          id: 3,
          speaker: "Lucas",
          prompt: "How do we write that math problem as a sentence?",
          options: [
            "Ten minus four leaves six cookies on the plate.",
            "Ten plus four equals fourteen cookies.",
            "Four cookies are swimming in water."
          ],
          answer: "Ten minus four leaves six cookies on the plate."
        },
        {
          id: 4,
          speaker: "Lucas",
          prompt: "Shall we share the remaining six cookies with grandpa?",
          options: [
            "Yes, grandpa will love these warm vanilla cookies!",
            "No, I never wear yellow socks.",
            "The river is very deep."
          ],
          answer: "Yes, grandpa will love these warm vanilla cookies!"
        },
        {
          id: 5,
          speaker: "Lucas",
          prompt: "Can we write this subtraction story in our math notebooks?",
          options: [
            "Yes, let's draw the cookies and write the sentence now!",
            "I walked to the shop yesterday.",
            "The pencil is five centimeters long."
          ],
          answer: "Yes, let's draw the cookies and write the sentence now!"
        }
      ],
      exchanges: [
        { speaker: "Lucas", text: "Chloe, how many cookies did Grandma bake on the tray?" },
        { speaker: "Chloe", text: "She baked ten delicious chocolate cookies." },
        { speaker: "Lucas", text: "What happened when the Cookie Monster puppet arrived?" },
        { speaker: "Chloe", text: "He took away four cookies for an afternoon snack." },
        { speaker: "Lucas", text: "How do we write that math problem as a sentence?" },
        { speaker: "Chloe", text: "Ten minus four leaves six cookies on the plate." },
        { speaker: "Lucas", text: "Shall we share the remaining six cookies with grandpa?" },
        { speaker: "Chloe", text: "Yes, grandpa will love these warm vanilla cookies!" },
        { speaker: "Lucas", text: "Can we write this subtraction story in our math notebooks?" },
        { speaker: "Chloe", text: "Yes, let's draw the cookies and write the sentence now!" }
      ]
    },
    part6_cloze: {
      title: "Chloe's Kitchen Story: Subtracting Snacks",
      instructions: "Read the kitchen story and write the missing words. Write one word on each line.",
      text_template: "Grandma baked [1]_____ batch of ten cookies. A puppet monster took [2]_____ four cookies. Ten minus four [3]_____ six cookies left. We put the remaining cookies on [4]_____ plate. It is fun to [5]_____ snacks with family.",
      answers: { "1": "a", "2": "away", "3": "leaves", "4": "a", "5": "share" }
    }
  },
  minigames: {
    math_problems: [
      {
        id: "w44_p1",
        type: "comparison",
        title: "Cookie Jar Subtraction",
        question: "Grandma baked 45 cookies in total. The children ate 15 cookies during snack time. How many cookies are left in the jar?",
        storyContext: "Chloe tallies the remaining cookies before placing the glass lid on the jar.",
        modelData: {
          bars: [
            { label: "Total Baked", value: 45, color: "#d97706" },
            { label: "Eaten Cookies", value: 15, color: "#ef4444" }
          ],
          difference: 30,
          unit: "cookies"
        },
        target_answer: 30,
        unit: "cookies",
        steps: [
          "Start with the 45 baked cookies.",
          "Subtract the 15 eaten cookies.",
          "45 - 15 = 30 cookies left."
        ]
      },
      {
        id: "w44_p2",
        type: "comparison",
        title: "Bake Sale Plate Count",
        question: "The school bake sale started with 50 lemon cupcakes. Customers bought 22 cupcakes by noon. How many cupcakes remain for the afternoon?",
        storyContext: "Lucas counts the cupcakes on the table before the afternoon bell rings.",
        modelData: {
          bars: [
            { label: "Starting Cupcakes", value: 50, color: "#facc15" },
            { label: "Sold Cupcakes", value: 22, color: "#f97316" }
          ],
          difference: 28,
          unit: "cupcakes"
        },
        target_answer: 28,
        unit: "cupcakes",
        steps: [
          "Start with the 50 starting cupcakes.",
          "Subtract the 22 sold cupcakes.",
          "50 - 22 = 28 cupcakes remain."
        ]
      }
    ],
    action_lab_scenarios: [
      {
        stage: 1,
        title: "Cookie Take Away Lab",
        diagram_type: "take_away_tray_grid",
        instruction: "Drag 4 cookies from the tray to the Cookie Monster's plate and observe what remains.",
        items: [
          { label: "10 Cookies on Metal Tray", target: "original_group" },
          { label: "Remove 4 for Monster Snack", target: "subtraction_action" },
          { label: "6 Cookies Left on Tray", target: "remaining_group" }
        ]
      },
      {
        stage: 2,
        title: "Subtraction Equation Matching",
        diagram_type: "math_sentence_cards",
        instruction: "Match each word problem to its correct subtraction equation.",
        items: [
          { label: "Start with 8, take away 3", target: "8_minus_3_equals_5" },
          { label: "Start with 12, take away 5", target: "12_minus_5_equals_7" },
          { label: "Start with 15, take away 6", target: "15_minus_6_equals_9" }
        ]
      },
      {
        stage: 3,
        title: "Fair Sharing Balance",
        diagram_type: "snack_distribution_table",
        instruction: "Distribute the 6 remaining cookies equally between Lucas and Chloe.",
        items: [
          { label: "3 Cookies -> Lucas's Napkin", target: "plate_lucas" },
          { label: "3 Cookies -> Chloe's Napkin", target: "plate_chloe" },
          { label: "Fair Share: 3 each", target: "equal_share" }
        ]
      }
    ],
    grammar_drills: [
      { sentence: "Ten minus four equals six chocolate cookies.", options: ["minus", "plus", "times"], answer: "minus", explanation: "Use 'minus' to show subtraction between two numbers." },
      { sentence: "If you take away two treats, four treats remain.", options: ["take", "takes", "taking"], answer: "take", explanation: "Use base verb 'take' with pronoun 'you' in conditional clause." },
      { sentence: "How many delicious cookies are left on the tray?", options: ["left", "leave", "leaving"], answer: "left", explanation: "Use participle adjective 'left' meaning remaining." },
      { sentence: "Only five golden cookies remain on the baking sheet.", options: ["remain", "remains", "remained"], answer: "remain", explanation: "Use plural verb 'remain' with plural subject 'five golden cookies'." },
      { sentence: "There are fewer cookies on the table than before.", options: ["fewer", "less", "little"], answer: "fewer", explanation: "Use 'fewer' with countable plural nouns like 'cookies'." }
    ]
  }
};
