/**
 * scripts/specs_w46.mjs
 * Week 46: The Pattern Code (Logic)
 */

export const w46 = {
  week: 46,
  theme: "The Pattern Code (Logic)",
  title_en: "The Pattern Code (Logic)",
  title_vi: "Mật Mã Quy Luật — Tư Duy Logic và Dự Đoán Chuỗi",
  cefr_level: "A2 Flyers",
  grammar_focus: "Conditional & Sequence Logic: \"If [square], then [red]\", \"What comes next?\"",
  vocab_list: [
    { id: 1, word: "pattern", pos: "n", ipa: "/ˈpætərn/", definition_en: "A repeated decorative arrangement of figures, colors, or sounds", definition_vi: "quy luật, mẫu lặp", example_en: "This colorful necklace has an alternating bead pattern.", example_vi: "Chiếc vòng cổ rực rỡ này có một quy luật hạt cườm xen kẽ." },
    { id: 2, word: "next", pos: "adj", ipa: "/nekst/", definition_en: "Coming immediately after the present one in order or space", definition_vi: "tiếp theo", example_en: "What colored block comes next in the row?", example_vi: "Khối màu nào sẽ tiếp theo trong hàng?" },
    { id: 3, word: "repeat", pos: "v", ipa: "/rɪˈpiːt/", definition_en: "Occur or happen again in the exact same cyclical order", definition_vi: "lặp lại", example_en: "The colors red, blue, and yellow repeat four times.", example_vi: "Các màu đỏ, xanh dương và vàng lặp lại bốn lần." },
    { id: 4, word: "sequence", pos: "n", ipa: "/ˈsiːkwəns/", definition_en: "A particular order in which related events or things follow", definition_vi: "chuỗi, dãy thứ tự", example_en: "Follow the numbered sequence to unlock the secret chest.", example_vi: "Hãy làm theo chuỗi số thứ tự để mở khóa chiếc rương bí mật." },
    { id: 5, word: "before", pos: "prep", ipa: "/bɪˈfɔːr/", definition_en: "During the period of time preceding a particular event or place", definition_vi: "đằng trước, trước khi", example_en: "Check the pattern rule before placing your next tile.", example_vi: "Hãy kiểm tra quy luật mẫu trước khi đặt viên gạch tiếp theo." },
    { id: 6, word: "after", pos: "prep", ipa: "/ˈæftər/", definition_en: "In the time or space following something else", definition_vi: "đằng sau, sau khi", example_en: "A red circle comes after every green square.", example_vi: "Một hình tròn đỏ xuất hiện đằng sau mỗi hình vuông xanh lá." },
    { id: 7, word: "code", pos: "n", ipa: "/koʊd/", definition_en: "A system of symbols or letters used to represent secrets", definition_vi: "mật mã", example_en: "Noah cracked the visual code on the computer screen.", example_vi: "Noah đã giải được mật mã hình ảnh trên màn hình máy tính." },
    { id: 8, word: "order", pos: "n", ipa: "/ˈɔːrdər/", definition_en: "The arrangement or sequence of items following a rule", definition_vi: "thứ tự", example_en: "Arrange the wooden blocks in order from small to large.", example_vi: "Hãy sắp xếp các khối gỗ theo thứ tự từ nhỏ đến lớn." },
    { id: 9, word: "rule", pos: "n", ipa: "/ruːl/", definition_en: "An understood guide explaining how a sequence operates", definition_vi: "quy tắc, luật lệ", example_en: "The pattern rule is: two circles followed by one triangle.", example_vi: "Quy tắc của chuỗi là: hai hình tròn theo sau bởi một hình tam giác." },
    { id: 10, word: "color", pos: "n", ipa: "/ˈkʌlər/", definition_en: "The visual quality of things produced by light reflection", definition_vi: "màu sắc", example_en: "Each shape on the puzzle grid has a bright color.", example_vi: "Mỗi hình khối trên lưới câu đố đều có một màu sắc tươi sáng." },
    { id: 11, word: "bead", pos: "n", ipa: "/biːd/", definition_en: "A small piece of glass or plastic pierced for stringing", definition_vi: "hạt cườm", example_en: "Lily threaded a shiny purple bead onto the silver wire.", example_vi: "Lily xâu một hạt cườm màu tím sáng lấp lánh vào sợi dây bạc." },
    { id: 12, word: "stripe", pos: "n", ipa: "/straɪp/", definition_en: "A long band or line differing in color from the background", definition_vi: "sọc, dải màu", example_en: "The pattern flag has alternating yellow and white stripes.", example_vi: "Lá cờ quy luật có các sọc vàng và trắng xen kẽ nhau." },
    { id: 13, word: "solve", pos: "v", ipa: "/sɑːlv/", definition_en: "Find an answer to, explanation for, or way of dealing with", definition_vi: "giải quyết, giải mã", example_en: "Together, the students can solve any logic riddle.", example_vi: "Cùng nhau, các học sinh có thể giải bất kỳ câu đố logic nào." },
    { id: 14, word: "puzzle", pos: "n", ipa: "/ˈpʌzəl/", definition_en: "A game or problem designed to test ingenuity or knowledge", definition_vi: "câu đố", example_en: "Professor Bright created a challenging shape puzzle.", example_vi: "Giáo sư Bright đã tạo ra một câu đố hình khối đầy thử thách." },
    { id: 15, word: "follow", pos: "v", ipa: "/ˈfɑːloʊ/", definition_en: "Come after in a sequence, time, or logical position", definition_vi: "tuân theo, tiếp bước", example_en: "If you follow the pattern clues, you will find the answer.", example_vi: "Nếu bạn làm theo các gợi ý quy luật, bạn sẽ tìm ra đáp án." },
    { id: 16, word: "arrange", pos: "v", ipa: "/əˈreɪndʒ/", definition_en: "Put things in a neat, attractive, or required order", definition_vi: "sắp xếp", example_en: "Arrange the geometric tiles according to the rule.", example_vi: "Hãy sắp xếp các viên gạch hình học theo đúng quy tắc." },
    { id: 17, word: "alternate", pos: "v", ipa: "/ˈɔːltərneɪt/", definition_en: "Occur in turn repeatedly one after the other", definition_vi: "xen kẽ, luân phiên", example_en: "The lights alternate between bright red and sunny yellow.", example_vi: "Những ánh đèn luân phiên giữa màu đỏ tươi và vàng nắng." },
    { id: 18, word: "symbol", pos: "n", ipa: "/ˈsɪmbəl/", definition_en: "A mark or character used as a conventional representation", definition_vi: "ký hiệu, biểu tượng", example_en: "A question mark is a symbol that means something is missing.", example_vi: "Dấu chấm hỏi là một biểu tượng có nghĩa là còn thiếu thứ gì đó." },
    { id: 19, word: "predict", pos: "v", ipa: "/prɪˈdɪkt/", definition_en: "Say or estimate that a specified thing will happen next", definition_vi: "dự đoán", example_en: "Can you predict the next shape in this colored sequence?", example_vi: "Bạn có thể dự đoán hình khối tiếp theo trong chuỗi màu này không?" },
    { id: 20, word: "logic", pos: "n", ipa: "/ˈlɑːdʒɪk/", definition_en: "Reasoning conducted according to strict principles of validity", definition_vi: "tư duy logic", example_en: "Using math logic makes difficult problems easy to crack.", example_vi: "Sử dụng logic toán học giúp các bài toán khó trở nên dễ giải mã." }
  ],
  clil: {
    title_en: "The Pattern Code: How Sequences and Logic Work",
    title_vi: "Mật Mã Quy Luật: Cách Chuỗi Trật Tự và Logic Vận Hành",
    content_en: "Patterns are regular sequences that repeat according to a logical rule. In nature, patterns appear on tiger stripes, honeycomb cells, and snail shells. In Professor Bright's logic laboratory, Noah and Lily learn how to crack visual pattern codes. Every pattern has a basic repeating unit called the core. For example, look at this bead sequence: Red, Blue, Red, Blue. The core rule is simply one red bead followed by one blue bead. Once you find the core rule, you can easily predict what comes next. If the last bead is red, then the next bead must be blue! We can also use shapes instead of colors. A pattern might show: Square, Circle, Triangle, Square, Circle. Using conditional sentences like 'If square, then red' trains our brains to think with scientific precision. Logic helps us solve complex challenges.",
    glossary: [
      { word: "pattern", definition_en: "A consistent arrangement of items that repeats by a rule", definition_vi: "sự sắp xếp đồng nhất lặp lại theo quy tắc" },
      { word: "sequence", definition_en: "The specific chronological or spatial order of items", definition_vi: "trật tự thời gian hoặc không gian cụ thể của đồ vật" },
      { word: "repeat", definition_en: "To occur again in identical form or cyclical succession", definition_vi: "xuất hiện lại dưới dạng giống hệt hoặc kế tiếp chu kỳ" },
      { word: "predict", definition_en: "To determine what will come next using logical reasoning", definition_vi: "xác định cái gì sẽ tới tiếp theo bằng suy luận logic" },
      { word: "logic", definition_en: "Clear and systematic reasoning based on established rules", definition_vi: "suy luận rõ ràng và có hệ thống dựa trên quy tắc đã định" }
    ],
    check_questions: [
      { id: 1, question_en: "What is the core of a pattern?", options: ["The basic repeating unit that sets the rule", "A broken piece of plastic", "A type of fruit"], answer: "The basic repeating unit that sets the rule" },
      { id: 2, question_en: "In the sequence Red, Blue, Red, Blue, what comes next?", options: ["A red bead", "A blue bead", "A green star"], answer: "A red bead" },
      { id: 3, question_en: "How does finding pattern rules help students?", options: ["It trains our minds to predict outcomes logically", "It makes people sleepy", "It changes the colors into numbers"], answer: "It trains our minds to predict outcomes logically" }
    ]
  },
  shadowing_sentences: [
    { id: 1, text: "A pattern repeats shapes and colors using a clear rule.", en: "A pattern repeats shapes and colors using a clear rule.", vi: "Một quy luật lặp lại hình khối và màu sắc bằng quy tắc rõ ràng.", ipa: "/ə ˈpætərn rɪˈpiːts ʃeɪps ænd ˈkʌlərz ˈjuːzɪŋ ə klɪr ruːl/", words: ["A", "pattern", "repeats", "shapes", "and", "colors", "using", "a", "clear", "rule"] },
    { id: 2, text: "Look closely at the sequence to find what comes next.", en: "Look closely at the sequence to find what comes next.", vi: "Hãy nhìn kỹ vào chuỗi để tìm xem cái gì sẽ xuất hiện tiếp theo.", ipa: "/lʊk ˈkloʊsli æt ðə ˈsiːkwəns tuː faɪnd wʌt kʌmz nekst/", words: ["Look", "closely", "at", "the", "sequence", "to", "find", "what", "comes", "next"] },
    { id: 3, text: "Noah threaded a red bead and then a blue bead.", en: "Noah threaded a red bead and then a blue bead.", vi: "Noah xâu một hạt cườm đỏ và sau đó là một hạt cườm xanh dương.", ipa: "/ˈnoʊə ˈθredɪd ə red biːd ænd ðen ə bluː biːd/", words: ["Noah", "threaded", "a", "red", "bead", "and", "then", "a", "blue", "bead"] },
    { id: 4, text: "If the tile is a square, then the color is red.", en: "If the tile is a square, then the color is red.", vi: "Nếu viên gạch là hình vuông, thì màu sắc là màu đỏ.", ipa: "/ɪf ðə taɪl ɪz ə skwer ðen ðə ˈkʌlər ɪz red/", words: ["If", "the", "tile", "is", "a", "square", "then", "the", "color", "is", "red"] },
    { id: 5, text: "Lily solved the secret symbol code on the wooden board.", en: "Lily solved the secret symbol code on the wooden board.", vi: "Lily đã giải được mật mã ký hiệu bí mật trên bảng gỗ.", ipa: "/ˈlɪli sɑːlvd ðə ˈsiːkrət ˈsɪmbəl koʊd ɑːn ðə ˈwʊdən bɔːrd/", words: ["Lily", "solved", "the", "secret", "symbol", "code", "on", "the", "wooden", "board"] },
    { id: 6, text: "Arrange the geometric tokens in the exact right order.", en: "Arrange the geometric tokens in the exact right order.", vi: "Hãy sắp xếp các đồng xu hình học theo đúng trật tự chính xác.", ipa: "/əˈreɪndʒ ðə ˌdʒiːəˈmetrɪk ˈtoʊkənz ɪn ði ɪɡˈzækt raɪt ˈɔːrdər/", words: ["Arrange", "the", "geometric", "tokens", "in", "the", "exact", "right", "order"] },
    { id: 7, text: "Can you predict which colored shape completes the puzzle?", en: "Can you predict which colored shape completes the puzzle?", vi: "Bạn có thể dự đoán hình khối màu nào sẽ hoàn thành câu đố không?", ipa: "/kæn juː prɪˈdɪkt wɪtʃ ˈkʌlərd ʃeɪp kəmˈpliːts ðə ˈpʌzəl/", words: ["Can", "you", "predict", "which", "colored", "shape", "completes", "the", "puzzle"] },
    { id: 8, text: "Math logic helps us understand and solve tricky problems.", en: "Math logic helps us understand and solve tricky problems.", vi: "Logic toán học giúp chúng ta hiểu và giải quyết những bài toán hóc búa.", ipa: "/mæθ ˈlɑːdʒɪk helps ʌs ˌʌndərˈstænd ænd sɑːlv ˈtrɪki ˈprɑːbləmz/", words: ["Math", "logic", "helps", "us", "understand", "and", "solve", "tricky", "problems"] }
  ],
  story_scenes: [
    { id: 1, scene_id: "scene_1", scene_number: 1, title_en: "The Pattern Arcade Lab", title_vi: "Phòng Trò Chơi Mật Mã Quy Luật", description_en: "Noah and Lily meet Professor Bright beside an electronic arcade board with glowing colored lights.", description: "Noah and Lily meet Professor Bright beside an electronic arcade board with glowing colored lights.", image_url: "/images/week46/webtoon_scene_1.png", audio_url: "/audio/week46/scene_1.mp3" },
    { id: 2, scene_id: "scene_2", scene_number: 2, title_en: "The Bead String Sequence", title_vi: "Chuỗi Xâu Hạt Cườm", description_en: "Noah strings beads following the sequence: red circle, blue square, red circle, blue square.", description: "Noah strings beads following the sequence: red circle, blue square, red circle, blue square.", image_url: "/images/week46/webtoon_scene_2.png", audio_url: "/audio/week46/scene_2.mp3" },
    { id: 3, scene_id: "scene_3", scene_number: 3, title_en: "The Missing Shape Clue", title_vi: "Manh Mối Hình Khối Còn Thiếu", description_en: "Lily studies a wooden grid where a blinking white question mark replaces the fourth shape.", description: "Lily studies a wooden grid where a blinking white question mark replaces the fourth shape.", image_url: "/images/week46/webtoon_scene_3.png", audio_url: "/audio/week46/scene_3.mp3" },
    { id: 4, scene_id: "scene_4", scene_number: 4, title_en: "Cracking the Logic Code", title_vi: "Giải Mã Quy Tắc Logic", description_en: "Professor Bright smiles as the children use the rule: 'If square, then red' to insert the winning tile.", description: "Professor Bright smiles as the children use the rule: 'If square, then red' to insert the winning tile.", image_url: "/images/week46/webtoon_scene_4.png", audio_url: "/audio/week46/scene_4.mp3" },
    { id: 5, scene_id: "scene_5", scene_number: 5, title_en: "The Master Codebreaker Trophy", title_vi: "Cúp Vàng Bậc Thầy Phá Mã", description_en: "The arcade board flashes green victory stars, and Professor Bright awards the children the Codebreaker Cup.", description: "The arcade board flashes green victory stars, and Professor Bright awards the children the Codebreaker Cup.", image_url: "/images/week46/webtoon_scene_5.png", audio_url: "/audio/week46/scene_5.mp3" }
  ],
  writing_data: {
    title: "Noah and Lily Crack the Pattern Code",
    prompt_en: "Look at the four pictures. Tell a story about Noah and Lily solving visual pattern codes in Professor Bright's arcade lab. Write 20 or more words.",
    prompt_vi: "Nhìn vào 4 bức tranh. Kể câu chuyện về Noah và Lily giải mật mã quy luật trong phòng thí nghiệm của giáo sư Bright (từ 20 từ trở lên).",
    min_sentences: 3,
    min_words: 20,
    max_words: 80,
    model_sentence: "Noah and Lily visited the logic arcade laboratory on Monday afternoon. First, they observed a sequence of colored beads on the table. Next, Lily identified the repeating rule of red and blue. In the end, they placed the correct shape and solved the puzzle.",
    word_bank: ["pattern", "sequence", "repeat", "next", "rule", "code", "bead", "solve", "predict", "logic"],
    sentence_frames: [
      "In the beginning, Noah and Lily visited the ___ laboratory.",
      "First, they saw a colorful sequence of glass ___.",
      "Next, Lily identified the repeating pattern ___.",
      "In the end, they used logic to ___ the missing symbol."
    ],
    panels: [
      {
        panel_id: "panel_1",
        title_en: "Scene 1: Entering the Logic Arcade",
        title_vi: "Cảnh 1: Bước Vào Phòng Logic",
        image_url: "/images/week46/writing_panel_1.png",
        image_prompt: "Two young students standing before a colorful electronic arcade board with glowing colored geometric symbols.",
        caption: "Noah and Lily arrived at the arcade lab to solve pattern codes.",
        sentence_frame: "First, Noah and Lily [visited the arcade lab] on [Monday afternoon].",
        pills: ["visited the arcade lab", "Monday afternoon", "looked at screens", "Noah and Lily"],
        connectors: ["First,", "On Monday afternoon,", "In the beginning,"]
      },
      {
        panel_id: "panel_2",
        title_en: "Scene 2: Stringing Colored Beads",
        title_vi: "Cảnh 2: Xâu Những Hạt Cườm Màu",
        image_url: "/images/week46/writing_panel_2.png",
        image_prompt: "A boy threading alternating red and blue beads onto a wire following a chart on the desk.",
        caption: "Noah threaded red and blue beads following the repeating rule.",
        sentence_frame: "Next, Noah threaded [red and blue beads] following the [repeating rule].",
        pills: ["red and blue beads", "repeating rule", "threaded carefully", "red then blue"],
        connectors: ["Next,", "Then,", "Also,"]
      },
      {
        panel_id: "panel_3",
        title_en: "Scene 3: The Missing Question Mark",
        title_vi: "Cảnh 3: Dấu Chấm Hỏi Còn Thiếu",
        image_url: "/images/week46/writing_panel_3.png",
        image_prompt: "A girl pointing to a missing slot with a white question mark in a row of geometric wooden tiles.",
        caption: "Lily analyzed the sequence to predict which tile belonged next.",
        sentence_frame: "After that, Lily [analyzed the sequence] to [predict the next tile].",
        pills: ["analyzed the sequence", "predict the next tile", "question mark slot", "Lily smiled"],
        connectors: ["After that,", "Later,", "Also,"]
      },
      {
        panel_id: "panel_4",
        title_en: "Scene 4: Cracking the Secret Code",
        title_vi: "Cảnh 4: Phá Giải Mật Mã Bí Mật",
        image_url: "/images/week46/writing_panel_4.png",
        image_prompt: "Two children celebrating with an inventor holding a golden trophy as the game board flashes green.",
        caption: "They placed the final tile and solved the pattern code successfully.",
        sentence_frame: "In the end, they [placed the final tile] and [cracked the secret code].",
        pills: ["placed the final tile", "cracked the secret code", "Professor Bright", "cheered happily"],
        connectors: ["In the end,", "Finally,", "At last,"]
      }
    ],
    ladder_stages: [
      {
        badge_label: "MODEL",
        title: "Scene 1: Entering the Logic Arcade",
        image_url: "/images/week46/writing_panel_1.png",
        caption: "Noah and Lily arrived at the arcade lab to solve pattern codes.",
        frame_L1: "First, Noah and Lily entered the lab. They wanted to crack visual codes using math logic.",
        connectors: ["First,", "On Monday afternoon,", "In the beginning,"],
        sentence_hint: "Write 2 sentences about visiting the logic laboratory.",
        ordered_chips: ["Noah and Lily", "visited the arcade lab", "to crack visual codes", "using math logic"],
        pills: ["Noah and Lily", "visited the arcade lab", "crack visual codes", "Monday afternoon"],
        sentence_frame: "First, Noah and Lily [visited the arcade lab] to test [visual codes]."
      },
      {
        badge_label: "BUILD",
        title: "Scene 2: Stringing Colored Beads",
        image_url: "/images/week46/writing_panel_2.png",
        caption: "Noah threaded red and blue beads following the repeating rule.",
        frame_L1: "Next, Noah strung the beads. He followed the pattern of red circles and blue squares.",
        connectors: ["Next,", "Then,", "Also,"],
        sentence_hint: "Write 2 sentences about Noah stringing the colored beads.",
        pills: ["strung the beads", "red circles and blue squares", "repeating order", "Noah"],
        sentence_frame: "Next, Noah strung beads following the [repeating order]."
      },
      {
        badge_label: "WRITE",
        title: "Scene 3: The Missing Question Mark",
        image_url: "/images/week46/writing_panel_3.png",
        caption: "Lily analyzed the sequence to predict which tile belonged next.",
        frame_L1: "After that, Lily saw a question mark. She used logic to predict which colored tile was missing.",
        connectors: ["After that,", "Later,", "Also,"],
        sentence_hint: "Write 2 sentences about Lily predicting the missing tile.",
        pills: ["saw a question mark", "used logic to predict", "missing tile", "Lily"],
        sentence_frame: "After that, Lily [used logic to predict] the [missing tile]."
      },
      {
        badge_label: "EXPAND",
        title: "Scene 4: Cracking the Secret Code",
        image_url: "/images/week46/writing_panel_4.png",
        caption: "They placed the final tile and solved the pattern code successfully.",
        frame_L1: "In the end, they found the rule. They inserted the final tile and cracked the code with Professor Bright.",
        connectors: ["In the end,", "Finally,", "At last,"],
        sentence_hint: "Write 2 sentences about completing the code puzzle.",
        pills: ["found the rule", "cracked the code", "Professor Bright", "won the trophy"],
        sentence_frame: "In the end, they [cracked the secret code] with [Professor Bright]."
      }
    ]
  },
  speaking_data: {
    talkshow_prompt: {
      topic: "How to Predict the Next Item in a Pattern",
      question: "Hi Noah! What steps do you follow to predict what comes next in a color sequence?",
      model_response: "First, I look at the whole sequence and find the repeating unit. For example, if I see red, yellow, red, yellow, the rule is one red then one yellow! If the last bead is red, then I predict that the next item must be yellow. Finding the rule makes solving patterns easy!"
    },
    info_exchange_cards: {
      table_a: {
        title: "Noah's Colored Bead Sequence",
        subtitle: "Candidate's Question Card (Ask Examiner)",
        person: "Noah",
        fields: [
          { id: "field_a1", cue_prompt: "what / colors on Noah's bead string?", cue_word: "what", is_missing: true, acceptable_questions: ["What colors are on Noah's bead string?", "What colors did Noah use for his beads?", "What are the colors of the beads?"], nova_reply: "Noah used alternating bright red and sunny yellow beads." },
          { id: "field_a2", cue_prompt: "how many / beads in the core unit?", cue_word: "how", is_missing: true, acceptable_questions: ["How many beads are in the core unit?", "How many beads make up the repeating core?", "How many beads repeat?"], nova_reply: "There are two beads in the core: one red and one yellow." },
          { id: "field_a3", cue_prompt: "what color / comes after yellow?", cue_word: "what", is_missing: true, acceptable_questions: ["What color comes after yellow?", "What color follows after yellow?", "Which color comes next after yellow?"], nova_reply: "A red bead comes after every yellow bead according to the rule." },
          { id: "field_a4", cue_prompt: "how many / times does rule repeat?", cue_word: "how", is_missing: true, acceptable_questions: ["How many times does the rule repeat?", "How many times does the sequence repeat?", "How many repeats are on the string?"], nova_reply: "The two-bead pattern repeats five times along the silver wire." },
          { id: "field_a5", cue_prompt: "why / patterns useful in science?", cue_word: "why", is_missing: true, acceptable_questions: ["Why are patterns useful in science?", "Why do scientists study patterns?", "Why is finding patterns important?"], nova_reply: "Patterns help scientists predict future events and test hypotheses." }
        ]
      },
      table_b: {
        title: "Lily's Geometric Tile Puzzle",
        subtitle: "Information Card (Answer Examiner's Questions)",
        person: "Lily",
        fields: [
          { id: "field_b1", cue_prompt: "what shapes / on Lily's puzzle grid?", cue_word: "what", value: "A repeating sequence of green squares and purple triangles.", nova_question: "What geometric shapes appear on Lily's puzzle grid?", acceptable_answers: ["A repeating sequence of green squares and purple triangles.", "Green squares and purple triangles.", "Squares and triangles."] },
          { id: "field_b2", cue_prompt: "what / core rule of the sequence?", cue_word: "what", value: "Two green squares followed by one purple triangle.", nova_question: "What is the core rule that governs this tile sequence?", acceptable_answers: ["Two green squares followed by one purple triangle.", "Two squares and one triangle.", "Two green then one purple."] },
          { id: "field_b3", cue_prompt: "what symbol / marked the missing spot?", cue_word: "what", value: "A large blinking white question mark token.", nova_question: "What symbol marked the spot where a tile was missing?", acceptable_answers: ["A large blinking white question mark token.", "A white question mark token.", "A question mark."] },
          { id: "field_b4", cue_prompt: "what tile / belonged in the missing spot?", cue_word: "what", value: "A second green square tile completed the core.", nova_question: "Which geometric tile belonged in the question mark spot?", acceptable_answers: ["A second green square tile completed the core.", "A second green square tile.", "A green square."] },
          { id: "field_b5", cue_prompt: "who / presented the Codebreaker award?", cue_word: "who", value: "Professor Bright presented a golden star trophy.", nova_question: "Who presented the Codebreaker award to the children?", acceptable_answers: ["Professor Bright presented a golden star trophy.", "Professor Bright.", "The professor."] }
        ]
      }
    }
  },
  cambridge_rw: {
    part1_definitions: [
      { id: 1, text: "A regular and repeated arrangement of figures, shapes, or colors.", target: "pattern" },
      { id: 2, text: "The particular order in which related items or events follow each other.", target: "sequence" },
      { id: 3, text: "To say what will happen next by examining clear clues and evidence.", target: "predict" },
      { id: 4, text: "A small round piece of glass or plastic with a hole for stringing.", target: "bead" },
      { id: 5, text: "A mark, shape, or letter used to represent an idea or secret.", target: "symbol" }
    ],
    part2_dialogue: {
      title: "Noah & Lily Discussing the Pattern Code",
      turns: [
        {
          id: 1,
          speaker: "Noah",
          prompt: "Lily, look at this bead string: red, blue, red, blue. What comes next?",
          options: [
            "A red bead comes next according to the repeating rule.",
            "I have two pet cats at home.",
            "The weather is very hot in July."
          ],
          answer: "A red bead comes next according to the repeating rule."
        },
        {
          id: 2,
          speaker: "Noah",
          prompt: "How did you find the secret rule so quickly?",
          options: [
            "I found the core group that repeats over and over.",
            "I bought a new blue bicycle.",
            "Because the train is late."
          ],
          answer: "I found the core group that repeats over and over."
        },
        {
          id: 3,
          speaker: "Noah",
          prompt: "What does the question mark symbol on the wooden board mean?",
          options: [
            "It shows where a missing geometric tile belongs.",
            "It means the game is broken.",
            "It is a picture of an elephant."
          ],
          answer: "It shows where a missing geometric tile belongs."
        },
        {
          id: 4,
          speaker: "Noah",
          prompt: "If the first two tiles are squares, what comes after them?",
          options: [
            "A purple triangle comes after the two squares.",
            "An apple fell from the green tree.",
            "I went to sleep at eight o'clock."
          ],
          answer: "A purple triangle comes after the two squares."
        },
        {
          id: 5,
          speaker: "Noah",
          prompt: "Shall we show Professor Bright that we cracked the code?",
          options: [
            "Yes, let's show him our completed sequence right now!",
            "I do not like eating cold soup.",
            "The car drove thirty miles."
          ],
          answer: "Yes, let's show him our completed sequence right now!"
        }
      ],
      exchanges: [
        { speaker: "Noah", text: "Lily, look at this bead string: red, blue, red, blue. What comes next?" },
        { speaker: "Lily", text: "A red bead comes next according to the repeating rule." },
        { speaker: "Noah", text: "How did you find the secret rule so quickly?" },
        { speaker: "Lily", text: "I found the core group that repeats over and over." },
        { speaker: "Noah", text: "What does the question mark symbol on the wooden board mean?" },
        { speaker: "Lily", text: "It shows where a missing geometric tile belongs." },
        { speaker: "Noah", text: "If the first two tiles are squares, what comes after them?" },
        { speaker: "Lily", text: "A purple triangle comes after the two squares." },
        { speaker: "Noah", text: "Shall we show Professor Bright that we cracked the code?" },
        { speaker: "Lily", text: "Yes, let's show him our completed sequence right now!" }
      ]
    },
    part6_cloze: {
      title: "Noah's Codebreaker Diary: Finding Patterns",
      instructions: "Read the diary and write the missing words. Write one word on each line.",
      text_template: "Today we solved [1]_____ fun pattern code. The colored beads repeat in [2]_____ strict order. If a bead is red, [3]_____ the next bead is blue. We used logic to [4]_____ which tile was missing. Finding rules makes puzzles easy [5]_____ solve.",
      answers: { "1": "a", "2": "a", "3": "then", "4": "predict", "5": "to" }
    }
  },
  minigames: {
    math_problems: [
      {
        id: "w46_p1",
        type: "part_whole",
        title: "Beads in the Repeating Necklace",
        question: "Noah used 36 red beads and 24 blue beads to make a long pattern necklace. How many beads are on the necklace in total?",
        storyContext: "Noah counts all the beads threaded on the silver wire before tying the knot.",
        modelData: {
          bars: [
            { label: "Red Beads", value: 36, color: "#ef4444" },
            { label: "Blue Beads", value: 24, color: "#3b82f6" }
          ],
          total: 60,
          unit: "beads"
        },
        target_answer: 60,
        unit: "beads",
        steps: [
          "Count the red beads: 36 beads.",
          "Add the blue beads: 24 beads.",
          "36 + 24 = 60 beads in total."
        ]
      },
      {
        id: "w46_p2",
        type: "comparison",
        title: "Comparing Pattern Tile Counts",
        question: "The arcade puzzle board has 45 square tiles and 27 triangular tiles. How many more square tiles are there than triangular tiles?",
        storyContext: "Lily sorts the wooden puzzle pieces into compartments before starting the next challenge.",
        modelData: {
          bars: [
            { label: "Square Tiles", value: 45, color: "#10b981" },
            { label: "Triangular Tiles", value: 27, color: "#a855f7" }
          ],
          difference: 18,
          unit: "tiles"
        },
        target_answer: 18,
        unit: "tiles",
        steps: [
          "Start with the 45 square tiles.",
          "Subtract the 27 triangular tiles.",
          "45 - 27 = 18 more square tiles."
        ]
      }
    ],
    action_lab_scenarios: [
      {
        stage: 1,
        title: "Core Pattern Identifier",
        diagram_type: "sequence_core_selector",
        instruction: "Select the core repeating unit for this visual color sequence.",
        items: [
          { label: "Sequence: Red-Blue-Yellow-Red-Blue-Yellow", target: "full_sequence" },
          { label: "Core Unit: [Red - Blue - Yellow]", target: "core_block" },
          { label: "Prediction for Slot 7: Red", target: "next_item" }
        ]
      },
      {
        stage: 2,
        title: "Conditional Shape Rules",
        diagram_type: "logic_gate_distributor",
        instruction: "Apply the conditional logic rule: If Shape = Square -> Red; If Shape = Circle -> Blue.",
        items: [
          { label: "Input: Square Token", target: "assign_red" },
          { label: "Input: Circle Token", target: "assign_blue" },
          { label: "Input: Triangle Token", target: "assign_yellow" }
        ]
      },
      {
        stage: 3,
        title: "Pattern Code Vault Lock",
        diagram_type: "vault_dial_sequence",
        instruction: "Arrange the 4 colored geometric tiles in exact order to unlock the master vault.",
        items: [
          { label: "Slot 1: Red Square", target: "vault_slot_1" },
          { label: "Slot 2: Blue Circle", target: "vault_slot_2" },
          { label: "Slot 3: Yellow Triangle", target: "vault_slot_3" },
          { label: "Slot 4: Red Square", target: "vault_slot_4" }
        ]
      }
    ],
    grammar_drills: [
      { sentence: "A pattern repeats shapes and colors using a clear rule.", options: ["repeats", "repeat", "repeating"], answer: "repeats", explanation: "Use 3rd person singular 'repeats' with singular subject 'A pattern'." },
      { sentence: "If the tile is a square, then the color is red.", options: ["is", "are", "were"], answer: "is", explanation: "Use singular verb 'is' with singular subject 'the tile'." },
      { sentence: "Look closely at the sequence to find what comes next.", options: ["comes", "come", "coming"], answer: "comes", explanation: "Use 3rd person singular 'comes' with interrogative pronoun 'what'." },
      { sentence: "Arrange the geometric tokens in the exact right order.", options: ["order", "ordered", "ordering"], answer: "order", explanation: "Use noun 'order' in the prepositional phrase 'in the exact right order'." },
      { sentence: "Can you predict which colored shape completes the puzzle?", options: ["predict", "predicts", "predicted"], answer: "predict", explanation: "Use bare infinitive 'predict' after modal verb 'can'." }
    ]
  }
};
