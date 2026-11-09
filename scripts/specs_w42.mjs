/**
 * scripts/specs_w42.mjs
 * Week 42: The Water Journey (Cycle)
 * CEFR Standard: A2 Flyers (Stage 1)
 */

export const w42 = {
  week: 42,
  theme: "The Water Journey (Cycle)",
  title_en: "The Water Journey and the Water Cycle",
  title_vi: "Hành Trình của Nước và Vòng Tuần Hoàn",
  cefr_level: "A2 Flyers",
  grammar_focus: "Review Sequencing + Present Tense: 'First, the sun warms the water. Then, vapor goes up into the sky.'",
  vocab_list: [
    { id: 1, word: "sun", pos: "n", ipa: "/sʌn/", definition_en: "The star that provides light and heat to Earth", definition_vi: "mặt trời", example_en: "Warm rays from the sun shine down upon the quiet lake.", example_vi: "Những tia nắng ấm áp từ mặt trời chiếu xuống mặt hồ yên ả." },
    { id: 2, word: "cloud", pos: "n", ipa: "/klaʊd/", definition_en: "A visible mass of condensed water vapor floating in the sky", definition_vi: "đám mây", example_en: "Fluffy white clouds float gently across the summer sky.", example_vi: "Những đám mây trắng xốp trôi nhẹ nhàng trên bầu trời mùa hè." },
    { id: 3, word: "rain", pos: "n", ipa: "/reɪn/", definition_en: "Moisture condensed from the atmosphere that falls visibly in separate drops", definition_vi: "cơn mưa, nước mưa", example_en: "Fresh cool rain watered the thirsty village garden.", example_vi: "Cơn mưa mát lành đã tưới mát cho khu vườn làng đang khát nước." },
    { id: 4, word: "river", pos: "n", ipa: "/ˈrɪvər/", definition_en: "A large natural stream of water flowing in a channel to the sea", definition_vi: "dòng sông", example_en: "The blue river winds through green mountain valleys.", example_vi: "Dòng sông xanh uốn lượn qua những thung lũng núi non xanh tươi." },
    { id: 5, word: "ocean", pos: "n", ipa: "/ˈoʊʃən/", definition_en: "A very large expanse of sea covering much of Earth's surface", definition_vi: "đại dương", example_en: "Dolphins swim through the vast and salty ocean.", example_vi: "Cá heo bơi lội qua vùng đại dương bao la và mặn mòi." },
    { id: 6, word: "evaporation", pos: "n", ipa: "/ɪˌvæpəˈreɪʃən/", definition_en: "The process of liquid water turning into invisible gas", definition_vi: "sự bốc hơi nước", example_en: "Warm sunshine causes evaporation from puddles on the road.", example_vi: "Ánh nắng ấm áp gây ra sự bốc hơi nước từ những vũng nước trên đường." },
    { id: 7, word: "go up", pos: "v", ipa: "/ɡoʊ ʌp/", definition_en: "Ascend or rise to a higher place", definition_vi: "bốc lên, đi lên", example_en: "Warm invisible water vapor begins to go up into the air.", example_vi: "Hơi nước ấm vô hình bắt đầu bốc lên vào trong không khí." },
    { id: 8, word: "come down", pos: "v", ipa: "/kʌm daʊn/", definition_en: "Descend or fall from the sky", definition_vi: "rơi xuống, đi xuống", example_en: "Heavy raindrops come down over the quiet forest path.", example_vi: "Những hạt mưa nặng hạt rơi xuống trên con đường rừng yên tĩnh." },
    { id: 9, word: "water", pos: "n", ipa: "/ˈwɔːtər/", definition_en: "The clear liquid that forms the seas, lakes, and rivers", definition_vi: "nước", example_en: "Clean drinking water keeps our bodies healthy and hydrated.", example_vi: "Nước uống sạch giữ cho cơ thể chúng ta khỏe mạnh và đủ nước." },
    { id: 10, word: "sky", pos: "n", ipa: "/skaɪ/", definition_en: "The region of the atmosphere seen from Earth", definition_vi: "bầu trời", example_en: "Birds spread their wings and fly across the clear blue sky.", example_vi: "Những chú chim dang rộng đôi cánh và bay qua bầu trời xanh trong." },
    { id: 11, word: "wind", pos: "n", ipa: "/wɪnd/", definition_en: "Moving air across the surface of the Earth", definition_vi: "gió", example_en: "A gentle mountain wind blew the gray storm clouds east.", example_vi: "Một làn gió núi nhẹ nhàng đã thổi những đám mây giông xám về phía đông." },
    { id: 12, word: "warm", pos: "adj", ipa: "/wɔːrm/", definition_en: "At a comfortable and moderate temperature", definition_vi: "ấm áp", example_en: "Warm summer air heats the water in shallow ponds.", example_vi: "Không khí ấm áp mùa hè làm nóng nước trong những chiếc ao nông." },
    { id: 13, word: "drop", pos: "n", ipa: "/drɑːp/", definition_en: "A small round particle of liquid", definition_vi: "giọt nước", example_en: "A single round drop of morning dew glistened on the petal.", example_vi: "Một giọt sương mai tròn xoe lấp lánh trên cánh hoa." },
    { id: 14, word: "stream", pos: "n", ipa: "/striːm/", definition_en: "A small, narrow river of clean flowing water", definition_vi: "dòng suối nhỏ", example_en: "Cold water bubbles happily down the rocky mountain stream.", example_vi: "Nước lạnh sủi bọt vui vẻ chảy xuống dòng suối núi đầy đá." },
    { id: 15, word: "lake", pos: "n", ipa: "/leɪk/", definition_en: "A large body of fresh water surrounded by land", definition_vi: "hồ nước", example_en: "We paddled our small red canoe across the peaceful lake.", example_vi: "Chúng tôi chèo chiếc ca-nô nhỏ màu đỏ qua hồ nước thanh bình." },
    { id: 16, word: "cool", pos: "v", ipa: "/kuːl/", definition_en: "Become lower in temperature", definition_vi: "làm mát, nguội đi", example_en: "As rising water vapor reaches high air, it begins to cool.", example_vi: "Khi hơi nước bốc lên đạt đến tầng không khí trên cao, nó bắt đầu nguội đi." },
    { id: 17, word: "flow", pos: "v", ipa: "/floʊ/", definition_en: "Move steadily and continuously in a current", definition_vi: "chảy đều", example_en: "Fresh mountain streams flow steadily toward the valley below.", example_vi: "Những con suối núi trong lành chảy đều đặn về phía thung lũng bên dưới." },
    { id: 18, word: "fall", pos: "v", ipa: "/fɔːl/", definition_en: "Move downward under the force of gravity", definition_vi: "rơi xuống", example_en: "Gentle raindrops fall upon the green leaves of the forest.", example_vi: "Những hạt mưa nhẹ nhàng rơi xuống trên những chiếc lá xanh của khu rừng." },
    { id: 19, word: "sea", pos: "n", ipa: "/siː/", definition_en: "An expanse of salt water that covers part of Earth's surface", definition_vi: "biển", example_en: "Fishermen steer wooden fishing boats out into the open sea.", example_vi: "Các ngư dân lái những con thuyền gỗ ra khơi biển khơi bao la." },
    { id: 20, word: "nature", pos: "n", ipa: "/ˈneɪtʃər/", definition_en: "The physical world and living things not made by humans", definition_vi: "tự nhiên, thiên nhiên", example_en: "The water cycle is an essential recycling system in nature.", example_vi: "Vòng tuần hoàn nước là một hệ thống tái chế thiết yếu trong thiên nhiên." }
  ],
  clil: {
    title_en: "The Never-Ending Water Journey: How Nature Recycles",
    title_vi: "Hành Trình Bất Tận Của Nước: Cách Tự Nhiên Tái Chế",
    content_en: "Every drop of water on Earth is part of an endless recycling journey called the water cycle. First, the warm sun shines down on oceans, lakes, and rivers. The heat turns liquid water into invisible gas through evaporation. Next, this light water vapor begins to go up into the cool sky. As the warm vapor rises higher, it begins to cool and condense into fluffy white clouds. When clouds become heavy with millions of water droplets, rain begins to come down over mountains, forests, and towns. Finally, fresh rainwater collects into mountain streams, joins large rushing rivers, and flows back home into the deep blue ocean. Then the wonderful cycle begins again!",
    glossary: [
      { word: "evaporation", definition_en: "When liquid water heats up and turns into vapor", definition_vi: "quá trình bốc hơi nước thành khí" },
      { word: "cloud", definition_en: "A mass of tiny water droplets floating in the sky", definition_vi: "đám mây chứa giọt nước nhỏ" },
      { word: "rain", definition_en: "Water falling from clouds down to Earth", definition_vi: "nước mưa rơi từ trên mây xuống" },
      { word: "stream", definition_en: "A small channel of fresh water flowing through hills", definition_vi: "dòng suối nước ngọt nhỏ" },
      { word: "cycle", definition_en: "A series of events that repeat continuously", definition_vi: "chu trình lặp đi lặp lại liên tục" }
    ],
    check_questions: [
      { id: 1, question_en: "What happens first when the warm sun heats the ocean surface?", options: ["Water turns into invisible vapor through evaporation", "Clouds fall into the water", "The ocean turns into ice immediately"], answer: "Water turns into invisible vapor through evaporation" },
      { id: 2, question_en: "Why does water vapor go up into the sky and form clouds?", options: ["Because warm vapor is light and rises before it cools", "Because wind pulls it down into the earth", "Because fish push it upward"], answer: "Because warm vapor is light and rises before it cools" },
      { id: 3, question_en: "Where does rainwater flow after it falls on mountain slopes?", options: ["It collects into streams and rivers flowing to the ocean", "It stays frozen on the hill forever", "It disappears from Earth completely"], answer: "It collects into streams and rivers flowing to the ocean" }
    ]
  },
  shadowing_sentences: [
    { id: 1, text: "The warm sun shines brightly on the surface of the blue lake.", en: "The warm sun shines brightly on the surface of the blue lake.", vi: "Mặt trời ấm áp chiếu sáng rực rỡ trên mặt hồ nước xanh biếc.", ipa: "/ðə wɔːrm sʌn ʃaɪnz ˈbraɪtli ɑːn ðə ˈsɜːrfɪs əv ðə bluː leɪk/", words: ["The", "warm", "sun", "shines", "brightly", "on", "the", "surface", "of", "the", "blue", "lake"] },
    { id: 2, text: "Warm water turns into vapor through a process called evaporation.", en: "Warm water turns into vapor through a process called evaporation.", vi: "Nước ấm biến thành hơi qua một tiến trình gọi là sự bốc hơi.", ipa: "/wɔːrm ˈwɔːtər tɜːrnz ˈɪntuː ˈveɪpər θruː ə ˈprɑːses kɔːld ɪˌvæpəˈreɪʃən/", words: ["Warm", "water", "turns", "into", "vapor", "through", "a", "process", "called", "evaporation"] },
    { id: 3, text: "Invisible water vapor begins to go up into the cool sky.", en: "Invisible water vapor begins to go up into the cool sky.", vi: "Hơi nước vô hình bắt đầu bốc lên vào bầu trời mát mẻ.", ipa: "/ɪnˈvɪzəbəl ˈwɔːtər ˈveɪpər bɪˈɡɪnz tuː ɡoʊ ʌp ˈɪntuː ðə kuːl skaɪ/", words: ["Invisible", "water", "vapor", "begins", "to", "go", "up", "into", "the", "cool", "sky"] },
    { id: 4, text: "As rising air cools down, fluffy white clouds form above.", en: "As rising air cools down, fluffy white clouds form above.", vi: "Khi không khí bốc lên lạnh đi, những đám mây trắng xốp hình thành phía trên.", ipa: "/æz ˈraɪzɪŋ er kuːlz daʊn ˈflʌfi waɪt klaʊdz fɔːrm əˈbʌv/", words: ["As", "rising", "air", "cools", "down", "fluffy", "white", "clouds", "form", "above"] },
    { id: 5, text: "When heavy clouds gather, fresh rain will come down soon.", en: "When heavy clouds gather, fresh rain will come down soon.", vi: "Khi những đám mây nặng trĩu tụ lại, cơn mưa mát sẽ sớm rơi xuống.", ipa: "/wen ˈhevi klaʊdz ˈɡæðər freʃ reɪn wɪl kʌm daʊn suːn/", words: ["When", "heavy", "clouds", "gather", "fresh", "rain", "will", "come", "down", "soon"] },
    { id: 6, text: "Cool raindrops fall over the green mountain trees and flowers.", en: "Cool raindrops fall over the green mountain trees and flowers.", vi: "Những hạt mưa mát rơi xuống cây cối và hoa cỏ trên núi xanh.", ipa: "/kuːl ˈreɪndrɑːps fɔːl ˈoʊvər ðə ɡriːn ˈmaʊntn triːz ænd ˈflaʊərz/", words: ["Cool", "raindrops", "fall", "over", "the", "green", "mountain", "trees", "and", "flowers"] },
    { id: 7, text: "Small mountain streams flow steadily into the rushing river.", en: "Small mountain streams flow steadily into the rushing river.", vi: "Những con suối núi nhỏ chảy đều đặn vào dòng sông đang cuộn chảy.", ipa: "/smɔːl ˈmaʊntn striːmz floʊ ˈstedɪli ˈɪntuː ðə ˈrʌʃɪŋ ˈrɪvər/", words: ["Small", "mountain", "streams", "flow", "steadily", "into", "the", "rushing", "river"] },
    { id: 8, text: "The river carries water back to the vast blue ocean.", en: "The river carries water back to the vast blue ocean.", vi: "Dòng sông mang nước quay trở về đại dương xanh bao la.", ipa: "/ðə ˈrɪvər ˈkæriz ˈwɔːtər bæk tuː ðə væst bluː ˈoʊʃən/", words: ["The", "river", "carries", "water", "back", "to", "the", "vast", "blue", "ocean"] }
  ],
  story_scenes: [
    { id: 1, scene_id: "scene_1", scene_number: 1, title_en: "Sunshine on the Lake", title_vi: "Ánh Nắng Chiếu Trên Mặt Hồ", description_en: "Maya and Noah stand by the lake as warm sunshine causes water to evaporate.", description: "Maya and Noah stand by the lake as warm sunshine causes water to evaporate.", image_url: "/images/week42/webtoon_scene_1.png", audio_url: "/audio/week42/scene_1.mp3" },
    { id: 2, scene_id: "scene_2", scene_number: 2, title_en: "Vapor Going Up", title_vi: "Hơi Nước Bốc Lên Cao", description_en: "They watch imaginary droplet Dewy rise up into the blue sky as invisible vapor.", description: "They watch imaginary droplet Dewy rise up into the blue sky as invisible vapor.", image_url: "/images/week42/webtoon_scene_2.png", audio_url: "/audio/week42/scene_2.mp3" },
    { id: 3, scene_id: "scene_3", scene_number: 3, title_en: "Clouds Over the Mountain", title_vi: "Những Đám Mây Trên Đỉnh Núi", description_en: "A gentle breeze blows clouds together over the peak until they turn dark and heavy.", description: "A gentle breeze blows clouds together over the peak until they turn dark and heavy.", image_url: "/images/week42/webtoon_scene_3.png", audio_url: "/audio/week42/scene_3.mp3" },
    { id: 4, scene_id: "scene_4", scene_number: 4, title_en: "Rain Falling Down", title_vi: "Cơn Mưa Rơi Xuống Đất", description_en: "Rain comes down over the forest path while Maya and Noah shelter under their umbrella.", description: "Rain comes down over the forest path while Maya and Noah shelter under their umbrella.", image_url: "/images/week42/webtoon_scene_4.png", audio_url: "/audio/week42/scene_4.mp3" },
    { id: 5, scene_id: "scene_5", scene_number: 5, title_en: "Flowing to the Ocean", title_vi: "Chảy Về Với Đại Dương", description_en: "Clean rainwater flows into the valley river and journeys back home to the open sea.", description: "Clean rainwater flows into the valley river and journeys back home to the open sea.", image_url: "/images/week42/webtoon_scene_5.png", audio_url: "/audio/week42/scene_5.mp3" }
  ],
  writing_data: {
    title: "Tracking a Water Droplet's Journey",
    prompt_en: "Look at the four pictures. Tell a story about Maya and Noah tracking the journey of water from the lake to the sea. Write 20 or more words.",
    prompt_vi: "Nhìn vào 4 bức tranh. Kể câu chuyện về Maya và Noah theo dõi hành trình của nước từ hồ ra biển (từ 20 từ trở lên).",
    min_sentences: 3,
    min_words: 20,
    max_words: 80,
    model_sentence: "Maya and Noah tracked the water cycle on a sunny afternoon. First, the warm sun heated the lake water, causing evaporation. Next, vapor went up into the sky and formed thick clouds. After that, rain came down over the mountain forest. In the end, the river carried the water back to the vast blue ocean.",
    word_bank: ["sun", "evaporation", "go up", "cloud", "rain", "come down", "river", "ocean", "stream", "nature"],
    sentence_frames: [
      "First, the warm sun shines upon the calm ___.",
      "Then, invisible water vapor begins to go ___ into the sky.",
      "Next, cool raindrops fall upon the green ___.",
      "Finally, the rushing river flows back into the deep ___."
    ],
    panels: [
      {
        panel_id: "panel_1",
        title_en: "Scene 1: Sunshine on the Lake",
        title_vi: "Cảnh 1: Ánh Nắng Trên Mặt Hồ",
        image_url: "/images/week42/writing_panel_1.png",
        image_prompt: "Two children standing on a wooden pier watching morning sunlight glistening on a tranquil lake with rising steam vapor.",
        caption: "The warm sun heated the lake water and started evaporation.",
        sentence_frame: "First, the warm sun [heated the blue lake] on a [calm sunny morning].",
        pills: ["heated the blue lake", "calm sunny morning", "Maya and Noah", "evaporation began"],
        connectors: ["First,", "On a sunny morning,", "In the beginning,"]
      },
      {
        panel_id: "panel_2",
        title_en: "Scene 2: Clouds Gathering Above",
        title_vi: "Cảnh 2: Mây Tụ Lại Trên Cao",
        image_url: "/images/week42/writing_panel_2.png",
        image_prompt: "Fluffy white clouds gathering and turning into darker rain clouds over a forested mountain peak.",
        caption: "Water vapor went up into the cold sky and formed thick clouds.",
        sentence_frame: "Next, water vapor [went up into the sky] and [formed thick rain clouds].",
        pills: ["went up into the sky", "formed thick rain clouds", "cooled down", "gentle breeze"],
        connectors: ["Next,", "Then,", "Soon afterwards,"]
      },
      {
        panel_id: "panel_3",
        title_en: "Scene 3: Rain Coming Down",
        title_vi: "Cảnh 3: Mưa Rơi Xuống Con Đường",
        image_url: "/images/week42/writing_panel_3.png",
        image_prompt: "Two smiling children holding a large yellow umbrella while cool rain falls on mountain pine trees.",
        caption: "Heavy raindrops came down over the forest trees and village path.",
        sentence_frame: "After that, cool rain [came down over the forest] and [watered thirsty plants].",
        pills: ["came down over the forest", "watered thirsty plants", "held an umbrella", "fresh raindrops"],
        connectors: ["After that,", "Later,", "Meanwhile,"]
      },
      {
        panel_id: "panel_4",
        title_en: "Scene 4: Journey Back to Ocean",
        title_vi: "Cảnh 4: Hành Trình Trở Lại Đại Dương",
        image_url: "/images/week42/writing_panel_4.png",
        image_prompt: "A wide river opening into the deep blue ocean with seabirds flying over sunny coastline waters.",
        caption: "The rushing river flowed back into the vast blue ocean.",
        sentence_frame: "In the end, the river [flowed into the ocean] to [complete the water cycle].",
        pills: ["flowed into the ocean", "complete the water cycle", "Maya and Noah smiled", "endless journey"],
        connectors: ["In the end,", "Finally,", "At last,"]
      }
    ],
    ladder_stages: [
      {
        badge_label: "MODEL",
        title: "Scene 1: Sun and Lake",
        image_url: "/images/week42/writing_panel_1.png",
        caption: "The warm sun heated the lake water and started evaporation.",
        frame_L1: "First, Maya and Noah observed the lake. The warm sun caused liquid water to evaporate into the air.",
        connectors: ["First,", "In the beginning,", "On Sunday morning,"],
        sentence_hint: "Write 2 sentences about the sun heating the lake water.",
        ordered_chips: ["The warm sun", "heated the lake water", "and started evaporation", "into the sky"],
        pills: ["warm sun", "lake water", "started evaporation", "Maya and Noah"],
        sentence_frame: "First, the warm sun [heated the lake water] and [started evaporation]."
      },
      {
        badge_label: "BUILD",
        title: "Scene 2: Clouds Forming",
        image_url: "/images/week42/writing_panel_2.png",
        caption: "Water vapor went up into the cold sky and formed thick clouds.",
        frame_L1: "Next, light vapor went up toward the sky. It cooled down and gathered into fluffy clouds.",
        connectors: ["Next,", "Then,", "Soon afterwards,"],
        sentence_hint: "Write 2 sentences about clouds forming in the sky.",
        pills: ["went up", "cool sky", "formed clouds", "mountain peak"],
        sentence_frame: "Next, water vapor [went up into the cool sky] to [form fluffy clouds]."
      },
      {
        badge_label: "WRITE",
        title: "Scene 3: Rain Falling",
        image_url: "/images/week42/writing_panel_3.png",
        caption: "Heavy raindrops came down over the forest trees and village path.",
        frame_L1: "After that, gray clouds turned heavy. Fresh raindrops came down over the green mountain trees.",
        connectors: ["After that,", "Later,", "Meanwhile,"],
        sentence_hint: "Write 2 sentences about rain falling from clouds.",
        pills: ["fresh raindrops", "came down", "forest trees", "held umbrella"],
        sentence_frame: "After that, fresh raindrops [came down from clouds] onto the [forest trees]."
      },
      {
        badge_label: "EXPAND",
        title: "Scene 4: Reaching the Ocean",
        image_url: "/images/week42/writing_panel_4.png",
        caption: "The rushing river flowed back into the vast blue ocean.",
        frame_L1: "In the end, rainwater collected into a stream. It flowed into a river and traveled home to the ocean.",
        connectors: ["In the end,", "Finally,", "At last,"],
        sentence_hint: "Write 2 sentences about the river reaching the ocean.",
        pills: ["rainwater collected", "rushing river", "flowed to the ocean", "cycle completed"],
        sentence_frame: "In the end, the river [flowed steadily] back into the [vast blue ocean]."
      }
    ]
  },
  speaking_data: {
    talkshow_prompt: {
      topic: "The Never-Ending Water Journey",
      question: "Hello Noah! Can you explain the four main stages of the water cycle to our listeners?",
      model_response: "Hello! First, the warm sun shines on lakes and oceans, causing evaporation. Next, invisible water vapor goes up into the cool sky and forms fluffy clouds. After that, when the clouds become heavy, rain comes down over the hills and forests. Finally, the rainwater collects into streams and rivers, flowing all the way back into the ocean. That is how nature recycles water every day!"
    },
    info_exchange_cards: {
      table_a: {
        title: "Maya's Rain Cloud Experiment",
        subtitle: "Candidate's Question Card (Ask Examiner)",
        person: "Maya",
        fields: [
          { id: "field_a1", cue_prompt: "where / clouds form?", cue_word: "where", is_missing: true, acceptable_questions: ["Where do clouds form in the sky?", "Where do clouds form?", "Where are clouds made?"], nova_reply: "Clouds form high in the cool upper atmosphere when water vapor cools down." },
          { id: "field_a2", cue_prompt: "what / inside a cloud?", cue_word: "what", is_missing: true, acceptable_questions: ["What is inside a rain cloud?", "What is a cloud made of?", "What is inside it?"], nova_reply: "A cloud is made of millions of tiny condensed water droplets and ice particles." },
          { id: "field_a3", cue_prompt: "why / clouds turn dark gray?", cue_word: "why", is_missing: true, acceptable_questions: ["Why do clouds turn dark gray?", "Why are rain clouds gray?", "Why do they look dark?"], nova_reply: "They turn dark gray because they become packed with billions of heavy water drops that block the sunlight." },
          { id: "field_a4", cue_prompt: "when / rain come down?", cue_word: "when", is_missing: true, acceptable_questions: ["When does rain come down from clouds?", "When does it start to rain?", "When do drops fall?"], nova_reply: "Rain comes down when water droplets grow too heavy to float in the sky." },
          { id: "field_a5", cue_prompt: "how / clouds float?", cue_word: "how", is_missing: true, acceptable_questions: ["How do heavy clouds float in the air?", "How do clouds float?", "How do they stay up?"], nova_reply: "Rising currents of warm air push gently upward against the tiny droplets to keep them floating." }
        ]
      },
      table_b: {
        title: "Noah's Mountain Stream Project",
        subtitle: "Information Card (Answer Examiner's Questions)",
        person: "Noah",
        fields: [
          { id: "field_b1", cue_prompt: "where / stream start?", cue_word: "where", value: "The stream starts high on the snowy rocky mountain peak.", nova_question: "Where does Noah's mountain stream begin its journey?", acceptable_answers: ["The stream starts high on the snowy rocky mountain peak.", "High on the snowy mountain peak.", "On the rocky mountain peak."] },
          { id: "field_b2", cue_prompt: "what direction / water flow?", cue_word: "what direction", value: "It flows steadily downhill through green valleys toward the river.", nova_question: "What direction does the mountain stream water flow?", acceptable_answers: ["It flows steadily downhill through green valleys toward the river.", "Downhill through green valleys.", "Downhill toward the river."] },
          { id: "field_b3", cue_prompt: "why / stream water cold?", cue_word: "why", value: "Because it comes from melting winter snow and deep underground springs.", nova_question: "Why is the mountain stream water so cold and fresh?", acceptable_answers: ["Because it comes from melting winter snow and deep underground springs.", "It comes from melting snow.", "From melting winter snow and springs."] },
          { id: "field_b4", cue_prompt: "where / river empty?", cue_word: "where", value: "The large river empties into the vast blue ocean along the coast.", nova_question: "Where does the large river finally empty its water?", acceptable_answers: ["The large river empties into the vast blue ocean along the coast.", "Into the vast blue ocean.", "Into the ocean along the coast."] },
          { id: "field_b5", cue_prompt: "how many / fish live in stream?", cue_word: "how many", value: "Noah counted twenty-four silvery trout swimming in the clear pools.", nova_question: "How many wild fish did Noah count in the stream pools?", acceptable_answers: ["Noah counted twenty-four silvery trout swimming in the clear pools.", "Twenty-four silvery trout.", "Twenty-four fish."] }
        ]
      }
    }
  },
  cambridge_rw: {
    part1_definitions: [
      { id: 1, definition_en: "The bright star in our solar system that gives heat and light to Earth.", options: ["sun", "ocean", "cloud"], answer: "sun" },
      { id: 2, definition_en: "A huge body of salt water covering most of the Earth's surface.", options: ["ocean", "river", "lake"], answer: "ocean" },
      { id: 3, definition_en: "A large stream of fresh water that moves across land into the sea.", options: ["river", "cloud", "rain"], answer: "river" },
      { id: 4, definition_en: "A white or gray shape floating in the sky made of tiny water drops.", options: ["cloud", "sun", "wind"], answer: "cloud" },
      { id: 5, definition_en: "Water that falls from the sky in drops when clouds become heavy.", options: ["rain", "evaporation", "stream"], answer: "rain" },
      { id: 6, definition_en: "The space above the Earth where clouds, the sun, and airplanes appear.", options: ["sky", "water", "lake"], answer: "sky" },
      { id: 7, definition_en: "Natural moving air that blows across hills and bends tree branches.", options: ["wind", "ocean", "sun"], answer: "wind" },
      { id: 8, definition_en: "A large area of water that has land all around it.", options: ["lake", "sea", "stream"], answer: "lake" },
      { id: 9, definition_en: "A small narrow river flowing down a mountain.", options: ["stream", "ocean", "sky"], answer: "stream" },
      { id: 10, definition_en: "The scientific process where warm water turns into invisible airborne gas.", options: ["evaporation", "rain", "flow"], answer: "evaporation" }
    ],
    part2_dialogue: {
      topic: "Tracing the Water Journey",
      turns: [
        {
          speaker: "Maya",
          text: "Noah, what happens first when the warm sun shines on the lake?",
          options: [
            "Water heats up and turns into vapor through evaporation.",
            "I ate a bowl of noodle soup yesterday evening.",
            "The yellow bus stopped at the school gates."
          ],
          answer: "Water heats up and turns into vapor through evaporation."
        },
        {
          speaker: "Noah",
          text: "Where does the invisible water vapor go after it leaves the lake?",
          options: [
            "It begins to go up into the cool blue sky.",
            "My father bought three new books at the store.",
            "No, I do not like drawing with purple crayons."
          ],
          answer: "It begins to go up into the cool blue sky."
        },
        {
          speaker: "Maya",
          text: "How do white fluffy clouds form high in the mountain air?",
          options: [
            "Rising vapor cools down and condenses into water droplets.",
            "We played basketball in the sports hall.",
            "The train leaves the station at half past two."
          ],
          answer: "Rising vapor cools down and condenses into water droplets."
        },
        {
          speaker: "Noah",
          text: "What happens when rain clouds become too heavy with drops?",
          options: [
            "Fresh raindrops come down over the hills and forests.",
            "My sister enjoys playing the acoustic guitar.",
            "Yes, there are twelve pencils in the wooden box."
          ],
          answer: "Fresh raindrops come down over the hills and forests."
        },
        {
          speaker: "Maya",
          text: "Shall we walk to the river and watch the water flow to the sea?",
          options: [
            "Yes, let's go see the rushing river right now!",
            "I forgot to bring my warm winter gloves today.",
            "The green salad was very tasty at dinner."
          ],
          answer: "Yes, let's go see the rushing river right now!"
        }
      ],
      exchanges: [
        { speaker: "Maya", text: "Noah, what happens first when the warm sun shines on the lake?" },
        { speaker: "Noah", text: "Water heats up and turns into vapor through evaporation." },
        { speaker: "Maya", text: "Where does the invisible water vapor go after it leaves the lake?" },
        { speaker: "Noah", text: "It begins to go up into the cool blue sky." },
        { speaker: "Maya", text: "How do white fluffy clouds form high in the mountain air?" },
        { speaker: "Noah", text: "Rising vapor cools down and condenses into water droplets." },
        { speaker: "Maya", text: "What happens when rain clouds become too heavy with drops?" },
        { speaker: "Noah", text: "Fresh raindrops come down over the hills and forests." },
        { speaker: "Maya", text: "Shall we walk to the river and watch the water flow to the sea?" },
        { speaker: "Noah", text: "Yes, let's go see the rushing river right now!" }
      ]
    },
    part6_cloze: {
      title: "Maya's Science Journal: The Water Cycle",
      instructions: "Read the diary and write the missing words. Write one word on each line.",
      text_template: "Dear Journal, today Noah and I studied [1]_____ water cycle. First, warm sunshine makes lake water evaporate [2]_____ the air. Next, water vapor goes up and forms [3]_____ fluffy cloud. Soon after, heavy rain begins to come [4]_____ over the valley. Finally, rivers carry water back [5]_____ the ocean.",
      answers: { "1": "the", "2": "into", "3": "a", "4": "down", "5": "to" }
    }
  },
  minigames: {
    math_problems: [
      {
        id: "w42_p1",
        type: "part_whole",
        title: "Measuring Valley Stream Rainfall",
        question: "A mountain rainstorm added 46 liters of water to the north stream and 54 liters to the south stream. How many liters of rainwater were collected in total?",
        storyContext: "Maya checks the stream collection rain gauges after a gentle afternoon shower.",
        modelData: {
          bars: [
            { label: "North Stream Gauge", value: 46, color: "#0ea5e9" },
            { label: "South Stream Gauge", value: 54, color: "#3b82f6" }
          ],
          total: 100,
          unit: "liters"
        },
        target_answer: 100,
        unit: "liters",
        steps: [
          "Record 46 liters from the north stream.",
          "Add 54 liters from the south stream.",
          "46 + 54 = 100 liters of water collected."
        ]
      },
      {
        id: "w42_p2",
        type: "comparison",
        title: "Lake Water Level Comparison",
        question: "The lake water level rose by 38 centimeters during rainy spring, but dropped by 15 centimeters during hot sunny summer evaporation. How many centimeters higher is the lake now compared to winter?",
        storyContext: "Noah reads the water level measuring ruler anchored near the wooden lake pier.",
        modelData: {
          bars: [
            { label: "Spring Rise", value: 38, color: "#10b981" },
            { label: "Summer Evaporation", value: 15, color: "#f59e0b" }
          ],
          difference: 23,
          unit: "centimeters"
        },
        target_answer: 23,
        unit: "centimeters",
        steps: [
          "Start with 38 centimeters of spring rain rise.",
          "Subtract 15 centimeters lost to summer evaporation.",
          "38 - 15 = 23 centimeters higher."
        ]
      }
    ],
    action_lab_scenarios: [
      {
        stage: 1,
        title: "Sequencing the Water Journey",
        diagram_type: "water_cycle_wheel",
        instruction: "Place the four natural water cycle stages in chronological order.",
        items: [
          { label: "Sunlight Causes Evaporation", target: "phase_1" },
          { label: "Vapor Goes Up and Cools into Clouds", target: "phase_2" },
          { label: "Rain Comes Down Over Mountains", target: "phase_3" },
          { label: "River Flows Water to the Ocean", target: "phase_4" }
        ]
      },
      {
        stage: 2,
        title: "Temperature and Water States",
        diagram_type: "temperature_chamber",
        instruction: "Match each temperature condition to its correct water transformation.",
        items: [
          { label: "Warm Sun -> Liquid Water Evaporates", target: "evaporation" },
          { label: "Cool Sky -> Water Vapor Condenses", target: "condensation" },
          { label: "Heavy Droplets -> Precipitation Falls", target: "precipitation" }
        ]
      },
      {
        stage: 3,
        title: "Protecting Watershed Health",
        diagram_type: "clean_water_action",
        instruction: "Select the three positive community actions that keep rivers clean.",
        items: [
          { label: "Plant Trees Along Stream Banks", target: "protect_banks" },
          { label: "Clean Up Plastic Bottles Near Shore", target: "remove_waste" },
          { label: "Monitor Rain Gauges Regularly", target: "track_data" }
        ]
      }
    ],
    grammar_drills: [
      { sentence: "First, the warm sun heats the surface of the lake.", options: ["heats", "heating", "heated"], answer: "heats", explanation: "Use 3rd person singular present tense 'heats' with singular subject 'the warm sun'." },
      { sentence: "Next, invisible water vapor begins to go up into the sky.", options: ["go up", "goes up", "going up"], answer: "go up", explanation: "After infinitive marker 'to', use base verb form 'go up'." },
      { sentence: "As the rising air cools, fluffy white clouds form above.", options: ["cools", "cool", "cooling"], answer: "cools", explanation: "Use singular verb form 'cools' with non-count singular noun 'air'." },
      { sentence: "Heavy raindrops come down when clouds gather over the hills.", options: ["come down", "comes down", "came down"], answer: "come down", explanation: "Use plural verb form 'come down' with plural subject 'heavy raindrops'." },
      { sentence: "Finally, the wide river flows steadily into the ocean.", options: ["flows", "flow", "flowing"], answer: "flows", explanation: "Use 3rd person singular present tense 'flows' with singular subject 'the wide river'." }
    ]
  }
};

export default w42;
