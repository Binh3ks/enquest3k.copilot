/**
 * scripts/specs_w45.mjs
 * Week 45: Shape Detectives (Geometry)
 */

export const w45 = {
  week: 45,
  theme: "Shape Detectives (Geometry)",
  title_en: "Shape Detectives (Geometry)",
  title_vi: "Thám Tử Hình Khối — Khám Phá Hình Học Xung Quanh Ta",
  cefr_level: "A2 Flyers",
  grammar_focus: "Geometric Description: \"It has [number] sides\", \"It is round / flat\"",
  vocab_list: [
    { id: 1, word: "square", pos: "n", ipa: "/skwer/", definition_en: "A flat shape with four equal straight sides and four right angles", definition_vi: "hình vuông", example_en: "The floor tile is a smooth blue square.", example_vi: "Viên gạch lát sàn là một hình vuông màu xanh dương nhẵn bóng." },
    { id: 2, word: "circle", pos: "n", ipa: "/ˈsɜːrkəl/", definition_en: "A round flat shape whose boundary consists of points equidistant from the center", definition_vi: "hình tròn", example_en: "The classroom wall clock has a large white circle.", example_vi: "Chiếc đồng hồ treo tường lớp học có một hình tròn lớn màu trắng." },
    { id: 3, word: "triangle", pos: "n", ipa: "/ˈtraɪæŋɡəl/", definition_en: "A flat geometric shape with three straight sides and three corners", definition_vi: "hình tam giác", example_en: "The yellow warning sign is shaped like a bright triangle.", example_vi: "Biển báo cảnh báo màu vàng có hình dạng như một hình tam giác rực rỡ." },
    { id: 4, word: "rectangle", pos: "n", ipa: "/ˈrektæŋɡəl/", definition_en: "A four-sided shape where opposite sides are equal and parallel", definition_vi: "hình chữ nhật", example_en: "Our school whiteboard is a very wide white rectangle.", example_vi: "Bảng viết lớp học của chúng tôi là một hình chữ nhật màu trắng rất rộng." },
    { id: 5, word: "side", pos: "n", ipa: "/saɪd/", definition_en: "A straight line that forms an outer boundary of a polygon", definition_vi: "cạnh", example_en: "A square has four straight sides of the same length.", example_vi: "Một hình vuông có bốn cạnh thẳng có cùng độ dài." },
    { id: 6, word: "corner", pos: "n", ipa: "/ˈkɔːrnər/", definition_en: "A point where two edges or straight sides meet together", definition_vi: "góc, góc nhọn", example_en: "A triangle has three sharp corners pointing outward.", example_vi: "Một hình tam giác có ba góc nhọn chỉ ra ngoài." },
    { id: 7, word: "round", pos: "adj", ipa: "/raʊnd/", definition_en: "Shaped like a circle or cylinder without straight edges", definition_vi: "tròn", example_en: "The round wooden table can seat six young students.", example_vi: "Chiếc bàn gỗ tròn có thể ngồi đủ sáu học sinh nhỏ." },
    { id: 8, word: "straight", pos: "adj", ipa: "/streɪt/", definition_en: "Extending continuously in one direction without curving", definition_vi: "thẳng", example_en: "Use a plastic ruler to draw a perfectly straight line.", example_vi: "Hãy dùng thước kẻ nhựa để vẽ một đường thẳng hoàn hảo." },
    { id: 9, word: "oval", pos: "n", ipa: "/ˈoʊvəl/", definition_en: "A rounded elongated shape resembling the outline of an egg", definition_vi: "hình bầu dục", example_en: "The bathroom mirror is framed in a lovely wooden oval.", example_vi: "Chiếc gương phòng tắm được viền trong một hình bầu dục bằng gỗ đáng yêu." },
    { id: 10, word: "diamond", pos: "n", ipa: "/ˈdaɪəmənd/", definition_en: "A four-sided figure standing on one of its sharp points", definition_vi: "hình thoi", example_en: "Kites flying in the windy sky often have a diamond shape.", example_vi: "Những cánh diều bay trên bầu trời lộng gió thường có hình thoi." },
    { id: 11, word: "flat", pos: "adj", ipa: "/flæt/", definition_en: "Having a level and even surface without lumps or curves", definition_vi: "phẳng", example_en: "Lay the geometric cards flat on the classroom desk.", example_vi: "Hãy đặt các thẻ hình học phẳng trên bàn học lớp." },
    { id: 12, word: "detective", pos: "n", ipa: "/dɪˈtektɪv/", definition_en: "A person whose role is to investigate clues and solve puzzles", definition_vi: "thám tử", example_en: "Ben wore a detective hat to search for hidden shapes.", example_vi: "Ben đội chiếc mũ thám tử để tìm kiếm những hình khối ẩn giấu." },
    { id: 13, word: "clock", pos: "n", ipa: "/klɑːk/", definition_en: "An instrument that displays and measures the time of day", definition_vi: "đồng hồ treo tường", example_en: "The school clock ticked softly above the classroom door.", example_vi: "Chiếc đồng hồ của trường tích tắc êm ái phía trên cửa lớp học." },
    { id: 14, word: "window", pos: "n", ipa: "/ˈwɪndoʊ/", definition_en: "An opening in a wall fitted with glass to let in light", definition_vi: "cửa sổ", example_en: "Sunlight entered through the large rectangular window.", example_vi: "Ánh nắng tràn vào qua ô cửa sổ hình chữ nhật lớn." },
    { id: 15, word: "ruler", pos: "n", ipa: "/ˈruːlər/", definition_en: "A straight strip of wood or plastic used to measure length", definition_vi: "thước kẻ", example_en: "Zoe measured the sides of the paper with her ruler.", example_vi: "Zoe dùng thước kẻ của mình để đo các cạnh của tờ giấy." },
    { id: 16, word: "desk", pos: "n", ipa: "/desk/", definition_en: "A piece of furniture with a flat surface for writing", definition_vi: "bàn học", example_en: "Each student has a neat wooden desk in the classroom.", example_vi: "Mỗi học sinh đều có một chiếc bàn học gỗ ngăn nắp trong lớp." },
    { id: 17, word: "edge", pos: "n", ipa: "/edʒ/", definition_en: "The outside limit or dividing boundary of a solid object", definition_vi: "mép, đường viền", example_en: "Be careful not to drop pencils off the edge of the desk.", example_vi: "Hãy cẩn thận đừng để rơi bút chì khỏi mép bàn học." },
    { id: 18, word: "curved", pos: "adj", ipa: "/kɜːrvd/", definition_en: "Bending smoothly in a continuous line without sharp points", definition_vi: "cong", example_en: "A circle has one continuous curved edge all around.", example_vi: "Một hình tròn có một đường mép cong liên tục xung quanh." },
    { id: 19, word: "object", pos: "n", ipa: "/ˈɑːbdʒɪkt/", definition_en: "A material thing that can be seen, touched, and examined", definition_vi: "vật thể, đồ vật", example_en: "Look around the room to find an object with four corners.", example_vi: "Hãy nhìn quanh phòng để tìm một đồ vật có bốn góc." },
    { id: 20, word: "pattern", pos: "n", ipa: "/ˈpætərn/", definition_en: "A repeated decorative arrangement of geometric shapes", definition_vi: "hoa văn, họa tiết", example_en: "The floor rug has a colorful pattern of triangles.", example_vi: "Tấm thảm trải sàn có hoa văn hình tam giác nhiều màu sắc." }
  ],
  clil: {
    title_en: "Shape Detectives: Finding 2D Geometry Everywhere",
    title_vi: "Thám Tử Hình Khối: Khám Phá Hình Học 2D Mọi Nơi",
    content_en: "Geometry is the study of shapes, sizes, and space in our world. Everything you see around you is made of geometric shapes. When Ben and Zoe act as Shape Detectives, they look for clues in classroom objects. A flat shape can be described by counting its sides and corners. For example, a square has four straight sides of equal length and four corners. You can see squares in chessboards and floor tiles. In contrast, a rectangle has two long sides and two short sides. Picture frames and classroom doors are great examples of rectangles. A triangle is special because it has only three sides and three sharp corners. Finally, a circle has no straight sides or corners at all. It has one smooth curved edge that loops around. Becoming a shape detective helps us observe details accurately.",
    glossary: [
      { word: "square", definition_en: "A four-sided flat shape where every side has equal length", definition_vi: "hình bốn cạnh phẳng có các cạnh bằng nhau" },
      { word: "circle", definition_en: "A completely round shape with one curved outer boundary", definition_vi: "hình tròn hoàn hảo có đường biên cong" },
      { word: "triangle", definition_en: "A geometric polygon that has exactly three sides and corners", definition_vi: "hình đa giác có đúng ba cạnh và ba góc" },
      { word: "rectangle", definition_en: "A four-sided polygon with opposite sides of equal length", definition_vi: "hình bốn cạnh có các cặp cạnh đối diện bằng nhau" },
      { word: "corner", definition_en: "The intersection point where two edges meet together", definition_vi: "điểm giao nhau nơi hai cạnh gặp nhau" }
    ],
    check_questions: [
      { id: 1, question_en: "How many straight sides does a square have?", options: ["Four straight sides of equal length", "Three curved lines", "Zero sides"], answer: "Four straight sides of equal length" },
      { id: 2, question_en: "Why is a circle different from a square or rectangle?", options: ["It has ten corners", "It has no straight sides or corners, only a curved edge", "It is always made of wood"], answer: "It has no straight sides or corners, only a curved edge" },
      { id: 3, question_en: "Which shape has three sides and three sharp corners?", options: ["A triangle", "A rectangle", "A circle"], answer: "A triangle" }
    ]
  },
  shadowing_sentences: [
    { id: 1, text: "A square has four equal sides and four sharp corners.", en: "A square has four equal sides and four sharp corners.", vi: "Một hình vuông có bốn cạnh bằng nhau và bốn góc nhọn.", ipa: "/ə skwer hæz fɔːr ˈiːkwəl saɪdz ænd fɔːr ʃɑːrp ˈkɔːrnərz/", words: ["A", "square", "has", "four", "equal", "sides", "and", "four", "sharp", "corners"] },
    { id: 2, text: "The large classroom clock is round like a white circle.", en: "The large classroom clock is round like a white circle.", vi: "Chiếc đồng hồ lớn của lớp học tròn như một hình tròn màu trắng.", ipa: "/ðə lɑːrdʒ ˈklæsruːm klɑːk ɪz raʊnd laɪk ə waɪt ˈsɜːrkəl/", words: ["The", "large", "classroom", "clock", "is", "round", "like", "a", "white", "circle"] },
    { id: 3, text: "The yellow warning sign has three sides like a triangle.", en: "The yellow warning sign has three sides like a triangle.", vi: "Biển báo cảnh báo màu vàng có ba cạnh như một hình tam giác.", ipa: "/ðə ˈjeloʊ ˈwɔːrnɪŋ saɪn hæz θriː saɪdz laɪk ə ˈtraɪæŋɡəl/", words: ["The", "yellow", "warning", "sign", "has", "three", "sides", "like", "a", "triangle"] },
    { id: 4, text: "Our school whiteboard is a very wide rectangular board.", en: "Our school whiteboard is a very wide rectangular board.", vi: "Bảng trắng của trường chúng tôi là một chiếc bảng hình chữ nhật rất rộng.", ipa: "/ˈaʊər skuːl ˈwaɪtbɔːrd ɪz ə ˈveri waɪd rekˈtæŋɡjələr bɔːrd/", words: ["Our", "school", "whiteboard", "is", "a", "very", "wide", "rectangular", "board"] },
    { id: 5, text: "Detective Ben searches for hidden shapes in the classroom.", en: "Detective Ben searches for hidden shapes in the classroom.", vi: "Thám tử Ben tìm kiếm những hình khối ẩn giấu trong lớp học.", ipa: "/dɪˈtektɪv ben ˈsɜːrtʃɪz fɔːr ˈhɪdən ʃeɪps ɪn ðə ˈklæsruːm/", words: ["Detective", "Ben", "searches", "for", "hidden", "shapes", "in", "the", "classroom"] },
    { id: 6, text: "Zoe uses a wooden ruler to check the straight edges.", en: "Zoe uses a wooden ruler to check the straight edges.", vi: "Zoe dùng một chiếc thước kẻ gỗ để kiểm tra các mép thẳng.", ipa: "/ˈzoʊi ˈjuːzɪz ə ˈwʊdən ˈruːlər tuː tʃek ðə streɪt ˈedʒɪz/", words: ["Zoe", "uses", "a", "wooden", "ruler", "to", "check", "the", "straight", "edges"] },
    { id: 7, text: "A circle has one curved line and no sharp corners.", en: "A circle has one curved line and no sharp corners.", vi: "Một hình tròn có một đường cong và không có góc nhọn nào.", ipa: "/ə ˈsɜːrkəl hæz wʌn kɜːrvd laɪn ænd noʊ ʃɑːrp ˈkɔːrnərz/", words: ["A", "circle", "has", "one", "curved", "line", "and", "no", "sharp", "corners"] },
    { id: 8, text: "Can you describe this everyday object using shape words?", en: "Can you describe this everyday object using shape words?", vi: "Bạn có thể miêu tả đồ vật hàng ngày này bằng từ ngữ hình khối không?", ipa: "/kæn juː dɪˈskraɪb ðɪs ˈevrideɪ ˈɑːbdʒɪkt ˈjuːzɪŋ ʃeɪp wɜːrdz/", words: ["Can", "you", "describe", "this", "everyday", "object", "using", "shape", "words"] }
  ],
  story_scenes: [
    { id: 1, scene_id: "scene_1", scene_number: 1, title_en: "The Shape Detective Mission", title_vi: "Nhiệm Vụ Thám Tử Hình Khối", description_en: "Ben and Zoe put on detective hats and hold magnifying glasses at their classroom table.", description: "Ben and Zoe put on detective hats and hold magnifying glasses at their classroom table.", image_url: "/images/week45/webtoon_scene_1.png", audio_url: "/audio/week45/scene_1.mp3" },
    { id: 2, scene_id: "scene_2", scene_number: 2, title_en: "Investigating the Wall Clock", title_vi: "Điều Tra Chiếc Đồng Hồ Treo Tường", description_en: "Ben points to the wall clock above the teacher's desk and notes that it has a round circle shape.", description: "Ben points to the wall clock above the teacher's desk and notes that it has a round circle shape.", image_url: "/images/week45/webtoon_scene_2.png", audio_url: "/audio/week45/scene_2.mp3" },
    { id: 3, scene_id: "scene_3", scene_number: 3, title_en: "Measuring the Whiteboard", title_vi: "Đo Đạc Chiếc Bảng Trắng", description_en: "Zoe uses a wooden meter ruler to trace the four straight sides of the rectangular whiteboard.", description: "Zoe uses a wooden meter ruler to trace the four straight sides of the rectangular whiteboard.", image_url: "/images/week45/webtoon_scene_3.png", audio_url: "/audio/week45/scene_3.mp3" },
    { id: 4, scene_id: "scene_4", scene_number: 4, title_en: "The Triangular Caution Sign", title_vi: "Biển Báo Tam Giác Cẩn Thận", description_en: "Art teacher Detective Ray shows a triangular easel board with three sharp wooden corners.", description: "Art teacher Detective Ray shows a triangular easel board with three sharp wooden corners.", image_url: "/images/week45/webtoon_scene_4.png", audio_url: "/audio/week45/scene_4.mp3" },
    { id: 5, scene_id: "scene_5", scene_number: 5, title_en: "The Shape Detective Badges", title_vi: "Huy Hiệu Thám Tử Hình Khối", description_en: "Detective Ray awards Ben and Zoe gold badges after they complete their geometric classroom map.", description: "Detective Ray awards Ben and Zoe gold badges after they complete their geometric classroom map.", image_url: "/images/week45/webtoon_scene_5.png", audio_url: "/audio/week45/scene_5.mp3" }
  ],
  writing_data: {
    title: "Ben and Zoe: Shape Detectives in the Classroom",
    prompt_en: "Look at the four pictures. Tell a story about Ben and Zoe finding shapes in their classroom. Write 20 or more words.",
    prompt_vi: "Nhìn vào 4 bức tranh. Kể câu chuyện về Ben và Zoe tìm kiếm hình khối trong lớp học (từ 20 từ trở lên).",
    min_sentences: 3,
    min_words: 20,
    max_words: 80,
    model_sentence: "Ben and Zoe played shape detectives during math class on Friday morning. First, they looked at the wall clock and observed that it is round. Next, Zoe measured the rectangular whiteboard with a wooden ruler. In the end, they found squares, circles, and triangles all over the room.",
    word_bank: ["square", "circle", "triangle", "rectangle", "sides", "corners", "round", "straight", "ruler", "detective"],
    sentence_frames: [
      "In the beginning, Ben and Zoe put on their ___ hats.",
      "First, they saw that the wall clock is a round ___.",
      "Next, Zoe measured the whiteboard with four straight ___.",
      "In the end, they discovered geometric shapes in every ___."
    ],
    panels: [
      {
        panel_id: "panel_1",
        title_en: "Scene 1: Starting the Detective Game",
        title_vi: "Cảnh 1: Bắt Đầu Trò Chơi Thám Tử",
        image_url: "/images/week45/writing_panel_1.png",
        image_prompt: "Two young students wearing detective hats looking at a clipboard with shape drawings in a classroom.",
        caption: "Ben and Zoe started their shape detective hunt in the classroom.",
        sentence_frame: "First, Ben and Zoe [started their shape hunt] on [Friday morning].",
        pills: ["started their shape hunt", "Friday morning", "detective hats", "looked around"],
        connectors: ["First,", "On Friday morning,", "In the beginning,"]
      },
      {
        panel_id: "panel_2",
        title_en: "Scene 2: Examining the Round Clock",
        title_vi: "Cảnh 2: Quan Sát Chiếc Đồng Hồ Tròn",
        image_url: "/images/week45/writing_panel_2.png",
        image_prompt: "A boy pointing at a circular wall clock and noting that it has no straight corners.",
        caption: "They noticed that the wall clock was round like a circle.",
        sentence_frame: "Next, they saw that the [wall clock was round] like a [large white circle].",
        pills: ["wall clock was round", "large white circle", "curved edge", "no sharp corners"],
        connectors: ["Next,", "Then,", "Also,"]
      },
      {
        panel_id: "panel_3",
        title_en: "Scene 3: Measuring the Whiteboard",
        title_vi: "Cảnh 3: Đo Đạc Chiếc Bảng Trắng",
        image_url: "/images/week45/writing_panel_3.png",
        image_prompt: "A girl using a straight wooden ruler to measure the long side of the classroom whiteboard.",
        caption: "Zoe measured the rectangular whiteboard with her long ruler.",
        sentence_frame: "After that, Zoe [measured the whiteboard] with her [straight wooden ruler].",
        pills: ["measured the whiteboard", "straight wooden ruler", "four straight sides", "two long edges"],
        connectors: ["After that,", "Later,", "Also,"]
      },
      {
        panel_id: "panel_4",
        title_en: "Scene 4: Completing the Shape Poster",
        title_vi: "Cảnh 4: Hoàn Thành Tấm Áp Phích Hình Khối",
        image_url: "/images/week45/writing_panel_4.png",
        image_prompt: "Two smiling students presenting a colorful shape poster to their teacher Detective Ray.",
        caption: "They completed their poster showing shapes all over the room.",
        sentence_frame: "In the end, they completed a [colorful shape poster] showing [every classroom object].",
        pills: ["colorful shape poster", "every classroom object", "Detective Ray", "smiled proudly"],
        connectors: ["In the end,", "Finally,", "At last,"]
      }
    ],
    ladder_stages: [
      {
        badge_label: "MODEL",
        title: "Scene 1: Starting the Detective Game",
        image_url: "/images/week45/writing_panel_1.png",
        caption: "Ben and Zoe started their shape detective hunt in the classroom.",
        frame_L1: "First, Ben and Zoe began their game. They wore detective hats to find geometric shapes.",
        connectors: ["First,", "On Friday morning,", "In the beginning,"],
        sentence_hint: "Write 2 sentences about starting the shape search.",
        ordered_chips: ["Ben and Zoe", "wore detective hats", "to search for", "shapes in the room"],
        pills: ["Ben and Zoe", "wore detective hats", "shape search", "Friday morning"],
        sentence_frame: "First, Ben and Zoe [began their shape search] in the [classroom]."
      },
      {
        badge_label: "BUILD",
        title: "Scene 2: Examining the Round Clock",
        image_url: "/images/week45/writing_panel_2.png",
        caption: "They noticed that the wall clock was round like a circle.",
        frame_L1: "Next, they observed the clock. It was completely round with no sharp corners.",
        connectors: ["Next,", "Then,", "Also,"],
        sentence_hint: "Write 2 sentences about the round clock.",
        pills: ["observed the clock", "completely round", "no sharp corners", "Ben"],
        sentence_frame: "Next, they saw that the [clock was round] with [no sharp corners]."
      },
      {
        badge_label: "WRITE",
        title: "Scene 3: Measuring the Whiteboard",
        image_url: "/images/week45/writing_panel_3.png",
        caption: "Zoe measured the rectangular whiteboard with her long ruler.",
        frame_L1: "After that, Zoe took a ruler. She checked the four straight sides of the whiteboard.",
        connectors: ["After that,", "Later,", "Also,"],
        sentence_hint: "Write 2 sentences about measuring the whiteboard.",
        pills: ["took a ruler", "four straight sides", "whiteboard", "Zoe"],
        sentence_frame: "After that, Zoe [measured the whiteboard] with [four straight sides]."
      },
      {
        badge_label: "EXPAND",
        title: "Scene 4: Completing the Shape Poster",
        image_url: "/images/week45/writing_panel_4.png",
        caption: "They completed their poster showing shapes all over the room.",
        frame_L1: "In the end, they finished their project. They proudly showed their shape poster to Detective Ray.",
        connectors: ["In the end,", "Finally,", "At last,"],
        sentence_hint: "Write 2 sentences about finishing the poster.",
        pills: ["finished their project", "shape poster", "Detective Ray", "cheered happily"],
        sentence_frame: "In the end, they completed their [shape poster] for [Detective Ray]."
      }
    ]
  },
  speaking_data: {
    talkshow_prompt: {
      topic: "Describing Classroom Objects with Shapes",
      question: "Hi Ben! How can you tell if an everyday object is a square or a rectangle?",
      model_response: "I check the straight sides with a ruler! Both shapes have four straight sides and four corners. But a square has four sides of the exact same length. A rectangle has two long sides and two short sides, like our classroom door or book!"
    },
    info_exchange_cards: {
      table_a: {
        title: "Ben's Classroom Square Study",
        subtitle: "Candidate's Question Card (Ask Examiner)",
        person: "Ben",
        fields: [
          { id: "field_a1", cue_prompt: "where / find square object?", cue_word: "where", is_missing: true, acceptable_questions: ["Where did Ben find a square object?", "Where did he find the square?", "Where was the square object located?"], nova_reply: "Ben found smooth square ceramic tiles on the classroom floor." },
          { id: "field_a2", cue_prompt: "how many / sides does square have?", cue_word: "how", is_missing: true, acceptable_questions: ["How many sides does the square have?", "How many straight sides are on the square?", "How many sides does it have?"], nova_reply: "It has four straight sides of the exact same length." },
          { id: "field_a3", cue_prompt: "how many / corners does it have?", cue_word: "how", is_missing: true, acceptable_questions: ["How many corners does it have?", "How many sharp corners are on the square?", "How many corners can you count?"], nova_reply: "It has four right-angle corners where the sides meet." },
          { id: "field_a4", cue_prompt: "what / color of floor tile?", cue_word: "what", is_missing: true, acceptable_questions: ["What color is the square floor tile?", "What color are the tiles?", "What is the color of the square?"], nova_reply: "The square floor tiles are bright sky-blue and white." },
          { id: "field_a5", cue_prompt: "why / squares good for floors?", cue_word: "why", is_missing: true, acceptable_questions: ["Why are squares good for floor tiles?", "Why do we use square tiles for floors?", "Why do squares fit together so well?"], nova_reply: "Square tiles fit together tightly without leaving any open gaps." }
        ]
      },
      table_b: {
        title: "Zoe's Wall Clock Circle Study",
        subtitle: "Information Card (Answer Examiner's Questions)",
        person: "Zoe",
        fields: [
          { id: "field_b1", cue_prompt: "what shape / classroom clock?", cue_word: "what", value: "A round circular shape with a curved metal frame.", nova_question: "What geometric shape is the classroom wall clock?", acceptable_answers: ["A round circular shape with a curved metal frame.", "A round circular shape.", "A circle."] },
          { id: "field_b2", cue_prompt: "how many / straight sides does circle have?", cue_word: "how", value: "Zero straight sides, it only has one continuous curved edge.", nova_question: "How many straight sides does Zoe's circle clock have?", acceptable_answers: ["Zero straight sides, it only has one continuous curved edge.", "Zero straight sides.", "None, it is curved."] },
          { id: "field_b3", cue_prompt: "how many / sharp corners on clock?", cue_word: "how", value: "No corners at all because circles bend smoothly.", nova_question: "How many sharp corners are on the round clock face?", acceptable_answers: ["No corners at all because circles bend smoothly.", "No corners at all.", "Zero corners."] },
          { id: "field_b4", cue_prompt: "where / hanging on wall?", cue_word: "where", value: "Directly above the wooden teacher's desk near the door.", nova_question: "Where is the round clock hanging in the room?", acceptable_answers: ["Directly above the wooden teacher's desk near the door.", "Above the teacher's desk.", "Near the door."] },
          { id: "field_b5", cue_prompt: "why / clocks usually round?", cue_word: "why", value: "Because the ticking clock hands sweep around in a circle.", nova_question: "Why are wall clocks usually shaped like a circle?", acceptable_answers: ["Because the ticking clock hands sweep around in a circle.", "Because clock hands turn in a circle.", "Hands sweep in a circle."] }
        ]
      }
    }
  },
  cambridge_rw: {
    part1_definitions: [
      { id: 1, text: "A flat shape with four equal straight sides and four corners.", target: "square" },
      { id: 2, text: "A round shape whose curved edge loops around without corners.", target: "circle" },
      { id: 3, text: "A geometric figure that has three sides and three sharp points.", target: "triangle" },
      { id: 4, text: "A four-sided shape with two long sides and two short sides.", target: "rectangle" },
      { id: 5, text: "A straight wooden or plastic tool used to measure lengths.", target: "ruler" }
    ],
    part2_dialogue: {
      title: "Ben & Zoe Discussing Geometric Shapes",
      turns: [
        {
          id: 1,
          speaker: "Ben",
          prompt: "Zoe, did you notice that the wall clock has no corners?",
          options: [
            "Yes, because it is completely round like a circle.",
            "No, I never eat cereal in the evening.",
            "The helicopter is flying very high."
          ],
          answer: "Yes, because it is completely round like a circle."
        },
        {
          id: 2,
          speaker: "Ben",
          prompt: "How many straight sides does the classroom whiteboard have?",
          options: [
            "It has four straight sides like a big rectangle.",
            "It has twelve round wheels.",
            "It is yellow like a banana."
          ],
          answer: "It has four straight sides like a big rectangle."
        },
        {
          id: 3,
          speaker: "Ben",
          prompt: "What shape is the yellow safety sign by the door?",
          options: [
            "It has three sides and three corners, so it is a triangle.",
            "It is a soft woolen blanket.",
            "It lives in the deep ocean."
          ],
          answer: "It has three sides and three corners, so it is a triangle."
        },
        {
          id: 4,
          speaker: "Ben",
          prompt: "Can we use a plastic ruler to measure the square floor tiles?",
          options: [
            "Yes, let's measure all four sides to see if they are equal!",
            "I played with my red toy boat yesterday.",
            "No, it is raining in the garden."
          ],
          answer: "Yes, let's measure all four sides to see if they are equal!"
        },
        {
          id: 5,
          speaker: "Ben",
          prompt: "Shall we present our shape detective poster to Detective Ray?",
          options: [
            "Yes, let's show him all the shapes we found!",
            "My grandmother lives forty miles away.",
            "I do not want an orange juice."
          ],
          answer: "Yes, let's show him all the shapes we found!"
        }
      ],
      exchanges: [
        { speaker: "Ben", text: "Zoe, did you notice that the wall clock has no corners?" },
        { speaker: "Zoe", text: "Yes, because it is completely round like a circle." },
        { speaker: "Ben", text: "How many straight sides does the classroom whiteboard have?" },
        { speaker: "Zoe", text: "It has four straight sides like a big rectangle." },
        { speaker: "Ben", text: "What shape is the yellow safety sign by the door?" },
        { speaker: "Zoe", text: "It has three sides and three corners, so it is a triangle." },
        { speaker: "Ben", text: "Can we use a plastic ruler to measure the square floor tiles?" },
        { speaker: "Zoe", text: "Yes, let's measure all four sides to see if they are equal!" },
        { speaker: "Ben", text: "Shall we present our shape detective poster to Detective Ray?" },
        { speaker: "Zoe", text: "Yes, let's show him all the shapes we found!" }
      ]
    },
    part6_cloze: {
      title: "Zoe's Detective Report: Classroom Shapes",
      instructions: "Read the report and write the missing words. Write one word on each line.",
      text_template: "Today we searched [1]_____ geometric shapes in our classroom. A square has four [2]_____ sides and four corners. The big wall clock [3]_____ round like a circle. We used a plastic [4]_____ to measure the long desk. Shapes are everywhere [5]_____ look around.",
      answers: { "1": "for", "2": "equal", "3": "is", "4": "ruler", "5": "when" }
    }
  },
  minigames: {
    math_problems: [
      {
        id: "w45_p1",
        type: "part_whole",
        title: "Perimeter of the Classroom Desk",
        question: "A student desk has two long sides of 60 centimeters each and two short sides of 40 centimeters each. What is the total perimeter around the desk?",
        storyContext: "Ben measures the perimeter around his rectangular classroom desk.",
        modelData: {
          bars: [
            { label: "Two Long Sides", value: 120, color: "#3b82f6" },
            { label: "Two Short Sides", value: 80, color: "#10b981" }
          ],
          total: 200,
          unit: "cm"
        },
        target_answer: 200,
        unit: "cm",
        steps: [
          "Add the two long sides: 60 + 60 = 120 cm.",
          "Add the two short sides: 40 + 40 = 80 cm.",
          "120 + 80 = 200 cm in total."
        ]
      },
      {
        id: "w45_p2",
        type: "comparison",
        title: "Counting Classroom Geometric Shapes",
        question: "The shape detectives found 28 rectangular objects and 16 circular objects in the room. How many more rectangles did they find than circles?",
        storyContext: "Zoe tallies her detective checklist after surveying the classroom library.",
        modelData: {
          bars: [
            { label: "Rectangles", value: 28, color: "#8b5cf6" },
            { label: "Circles", value: 16, color: "#f59e0b" }
          ],
          difference: 12,
          unit: "shapes"
        },
        target_answer: 12,
        unit: "shapes",
        steps: [
          "Start with the 28 rectangular objects.",
          "Subtract the 16 circular objects.",
          "28 - 16 = 12 more rectangles."
        ]
      }
    ],
    action_lab_scenarios: [
      {
        stage: 1,
        title: "Shape Sorter Machine",
        diagram_type: "shape_sorting_baskets",
        instruction: "Drag each classroom object into its correct geometric shape basket.",
        items: [
          { label: "Circular Wall Clock", target: "circle_basket" },
          { label: "Rectangular Whiteboard", target: "rectangle_basket" },
          { label: "Square Floor Tile", target: "square_basket" },
          { label: "Triangular Caution Cone", target: "triangle_basket" }
        ]
      },
      {
        stage: 2,
        title: "Sides and Corners Counter",
        diagram_type: "property_matrix_grid",
        instruction: "Match each shape name to its correct number of straight sides.",
        items: [
          { label: "Triangle -> 3 Straight Sides", target: "three_sides" },
          { label: "Square -> 4 Equal Sides", target: "four_equal_sides" },
          { label: "Circle -> 0 Straight Sides", target: "zero_sides" }
        ]
      },
      {
        stage: 3,
        title: "Geometric Pattern Builder",
        diagram_type: "pattern_tile_assembler",
        instruction: "Place the geometric shapes to complete the classroom window design.",
        items: [
          { label: "Bottom Base: Rectangle", target: "base_slot" },
          { label: "Center Pane: Square", target: "center_slot" },
          { label: "Top Arch: Semicircle", target: "arch_slot" }
        ]
      }
    ],
    grammar_drills: [
      { sentence: "A square has four equal straight sides.", options: ["has", "have", "having"], answer: "has", explanation: "Use singular verb 'has' with singular subject 'A square'." },
      { sentence: "The classroom wall clock is completely round.", options: ["round", "roundly", "rounds"], answer: "round", explanation: "Use predicate adjective 'round' after linking verb 'is'." },
      { sentence: "Use a plastic ruler to draw a straight line.", options: ["straight", "straightly", "straighten"], answer: "straight", explanation: "Use adjective 'straight' to modify noun 'line'." },
      { sentence: "A triangle has three sharp corners pointing out.", options: ["corners", "corner", "cornered"], answer: "corners", explanation: "Use plural noun 'corners' after the cardinal number 'three'." },
      { sentence: "Can you describe this object using shape words?", options: ["describe", "describes", "described"], answer: "describe", explanation: "Use bare infinitive 'describe' after modal verb 'can'." }
    ]
  }
};
