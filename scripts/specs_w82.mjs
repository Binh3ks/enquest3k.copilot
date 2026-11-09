/**
 * scripts/specs_w82.mjs
 * Week 82: ELA: The Travel Vlogger (Drafting) / Math: Analyzing Data
 * Stage 2: Cambridge Lower Secondary & B1 Preliminary
 */

export const w82 = {
  week: 82,
  theme: "ELA: The Travel Vlogger (Drafting) / Math: Analyzing Data",
  title_en: "The Travel Vlogger: Drafting Vivid Experiences",
  title_vi: "Vlogger Du Lịch: Viết Nháp Những Trải Nghiệm Sinh Động",
  cefr_level: "B1 Preliminary",
  grammar_focus: "Descriptive Sensory Adjectives (Sight, Sound, Smell, Touch)",
  vocab_list: [
    { id: 1, word: "vlogger", pos: "n", ipa: "/ˈvlɑːɡər/", definition_en: "A person who creates and produces video blogs documenting travels and experiences", definition_vi: "vlogger / người làm vlog du lịch", example_en: "The popular travel vlogger filmed the sun rising over the misty mountain ridge.", example_vi: "Vlogger du lịch nổi tiếng đã quay lại cảnh mặt trời mọc trên đỉnh núi mù sương." },
    { id: 2, word: "spectacular", pos: "adj", ipa: "/spekˈtækjələr/", definition_en: "Beautiful in a dramatic and eye-catching way; magnificent to behold", definition_vi: "ngoạn mục / tuyệt đẹp", example_en: "The view from the suspension bridge was absolutely spectacular at dawn.", example_vi: "Quang cảnh nhìn từ cây cầu treo thực sự ngoạn mục vào lúc bình minh." },
    { id: 3, word: "landscape", pos: "n", ipa: "/ˈlændskeɪp/", definition_en: "All the visible features of an area of land, often considered in terms of aesthetic appeal", definition_vi: "phong cảnh / cảnh quan", example_en: "Emerald terraced rice fields formed a picturesque rural landscape.", example_vi: "Những thửa ruộng bậc thang màu ngọc lục bảo tạo nên một cảnh quan nông thôn tuyệt đẹp như tranh vẽ." },
    { id: 4, word: "panoramic", pos: "adj", ipa: "/ˌpænəˈræmɪk/", definition_en: "Providing an unbroken view of the whole region surrounding an observer", definition_vi: "toàn cảnh / góc rộng", example_en: "The observation deck offered a panoramic vista across the sparkling bay.", example_vi: "Đài quan sát mang lại một tầm nhìn toàn cảnh ra khắp vịnh biển lấp lánh." },
    { id: 5, word: "vibrant", pos: "adj", ipa: "/ˈvaɪbrənt/", definition_en: "Full of energy, enthusiasm, and bright, vivid colors", definition_vi: "sôi động / rực rỡ", example_en: "The evening market was vibrant with colorful lanterns and laughing crowds.", example_vi: "Khu chợ đêm thật sôi động với những chiếc đèn lồng rực rỡ sắc màu và đám đông cười nói." },
    { id: 6, word: "bustling", pos: "adj", ipa: "/ˈbʌslɪŋ/", definition_en: "Full of energetic and noisy activity; lively and crowded", definition_vi: "nhộn nhịp / hối hả", example_en: "Street vendors called out to customers along the bustling cobblestone alley.", example_vi: "Những người bán hàng rong cất tiếng gọi khách dọc theo con ngõ lát đá cuội nhộn nhịp." },
    { id: 7, word: "fragrance", pos: "n", ipa: "/ˈfreɪɡrəns/", definition_en: "A pleasant, sweet, or delicate scent or smell", definition_vi: "hương thơm ngào ngạt", example_en: "The sweet fragrance of blossoming jasmine filled the warm night air.", example_vi: "Hương thơm ngọt ngào của hoa nhài nở rộ ngập tràn bầu không khí đêm ấm áp." },
    { id: 8, word: "crisp", pos: "adj", ipa: "/krɪsp/", definition_en: "Pleasantly cool, fresh, and invigorating, especially air or weather", definition_vi: "mát lành / trong trẻo", example_en: "We took a deep breath of the crisp autumn mountain breeze.", example_vi: "Chúng tôi hít một hơi thật sâu làn gió núi mùa thu mát lành trong trẻo." },
    { id: 9, word: "picturesque", pos: "adj", ipa: "/ˌpɪktʃəˈresk/", definition_en: "Visually attractive, especially in a quaint, charming, or pretty style", definition_vi: "đẹp như tranh vẽ", example_en: "Whitewashed houses with red tile roofs made the harbor town picturesque.", example_vi: "Những ngôi nhà quét vôi trắng với mái ngói đỏ làm cho thị trấn bến cảng đẹp như tranh vẽ." },
    { id: 10, word: "capture", pos: "v", ipa: "/ˈkæptʃər/", definition_en: "To record an experience, image, or atmosphere accurately in words or on video", definition_vi: "ghi lại / bắt trọn khoảnh khắc", example_en: "A good travel writer uses sensory adjectives to capture the true spirit of a place.", example_vi: "Một người viết du lịch giỏi sử dụng các tính từ chỉ giác quan để bắt trọn tinh thần đích thực của một vùng đất." },
    { id: 11, word: "breathtaking", pos: "adj", ipa: "/ˈbreθˌteɪkɪŋ/", definition_en: "Astonishing or awe-inspiring in quality, beauty, or grandeur", definition_vi: "đẹp đến nghẹt thở / ngoạn mục", example_en: "The snowy mountain peaks looked breathtaking under the golden morning light.", example_vi: "Những đỉnh núi tuyết phủ trông đẹp đến nghẹt thở dưới ánh sáng buổi sớm mai vàng rực." },
    { id: 12, word: "footage", pos: "n", ipa: "/ˈfʊtɪdʒ/", definition_en: "A length of film or digital video recording a specific event or scene", definition_vi: "thước phim / đoạn phim ghi hình", example_en: "The creator reviewed hours of high-definition video footage before editing.", example_vi: "Người sáng tạo đã xem lại nhiều giờ các thước phim video độ phân giải cao trước khi chỉnh sửa." },
    { id: 13, word: "aroma", pos: "n", ipa: "/əˈroʊmə/", definition_en: "A distinctive, typically pleasant smell, especially of food, coffee, or spices", definition_vi: "mùi thơm nồng đượm (thức ăn, đồ uống)", example_en: "The rich aroma of freshly roasted coffee drifted from the open cafe door.", example_vi: "Mùi thơm nồng đượm của cà phê mới rang thoang thoảng bay ra từ cánh cửa quán cà phê mở rộng." },
    { id: 14, word: "serenity", pos: "n", ipa: "/səˈrenəti/", definition_en: "The state of being calm, peaceful, untroubled, and tranquil", definition_vi: "sự thanh bình / thanh tịnh", example_en: "The mirror-like surface of the alpine lake offered complete serenity.", example_vi: "Mặt hồ trên núi phẳng lặng như gương mang lại sự thanh bình tuyệt đối." },
    { id: 15, word: "echo", pos: "v", ipa: "/ˈekoʊ/", definition_en: "To reverberate or repeat sound back from walls, hills, or rocks", definition_vi: "vang vọng / vọng lại", example_en: "Church bells echo clearly across the peaceful stone valley at sunrise.", example_vi: "Tiếng chuông nhà thờ ngân vang rõ ràng khắp thung lũng đá thanh bình lúc mặt trời mọc." },
    { id: 16, word: "vivid", pos: "adj", ipa: "/ˈvɪvɪd/", definition_en: "Producing powerful, intense, and distinct feelings or mental images", definition_vi: "sống động / rõ nét", example_en: "Her travel essay contained vivid descriptions of ocean waves and salty sea spray.", example_vi: "Bài luận du lịch của cô ấy chứa đựng những miêu tả sống động về những con sóng đại dương và bọt biển mặn mà." },
    { id: 17, word: "describe", pos: "v", ipa: "/dɪˈskraɪb/", definition_en: "To give an account in words of someone or something, including all characteristics", definition_vi: "miêu tả / mô tả", example_en: "Writers use all five senses to describe unfamiliar travel destinations vividly.", example_vi: "Người viết sử dụng cả năm giác quan để miêu tả những điểm đến du lịch mới lạ một cách sống động." },
    { id: 18, word: "horizon", pos: "n", ipa: "/həˈraɪzn/", definition_en: "The line at which the earth's surface and the sky appear to meet", definition_vi: "đường chân trời", example_en: "A gentle pink glow spread across the eastern horizon before dawn.", example_vi: "Một vệt sáng hồng dịu dàng lan tỏa khắp đường chân trời phía đông trước bình minh." },
    { id: 19, word: "wander", pos: "v", ipa: "/ˈwɑːndər/", definition_en: "To walk or move in a leisurely, casual, or aimless way", definition_vi: "tản bộ / dạo bước", example_en: "Visitors love to wander through narrow medieval stone streets lined with bakeries.", example_vi: "Du khách thích tản bộ qua những con phố đá thời trung cổ hẹp rải rác các tiệm bánh." },
    { id: 20, word: "narration", pos: "n", ipa: "/næˈreɪʃən/", definition_en: "The act or process of narrating a story, commentary, or video voiceover", definition_vi: "lời tường thuật / lời thuyết minh", example_en: "Chloe recorded an expressive voiceover narration to accompany her travel footage.", example_vi: "Chloe đã thu âm một lời thuyết minh biểu cảm để đồng hành cùng những thước phim du lịch của mình." }
  ],
  clil: {
    title_en: "The Travel Vlogger: Bringing Destinations to Life with Sensory Language",
    title_vi: "Vlogger Du Lịch: Thổi Hồn Vào Điểm Đến Bằng Ngôn Ngữ Giác Quan",
    content_en: "Travel writing and video blogging are powerful artistic forms that transport readers to distant places. However, simply listing what you did produces a dry, uninspiring report. Skilled vloggers and travel essayists draft their experiences using rich sensory adjectives that activate all five human senses. To engage sight, writers describe breathtaking panoramic horizons and vibrant market lanterns. For sound, they record the gentle whisper of mountain pines or how cathedral bells echo across peaceful valleys. For smell and taste, they capture the crisp autumn air and the rich aroma of freshly roasted coffee beans. For touch, they convey the warmth of smooth river stones or the chill of alpine breezes. By combining vivid sensory details with thoughtful reflection, a travel writer turns raw video footage into an unforgettable literary journey.",
    glossary: [
      { word: "spectacular", definition_en: "Dramatically beautiful and visually stunning", definition_vi: "đẹp ngoạn mục và ấn tượng" },
      { word: "vibrant", definition_en: "Pulsating with energetic color and lively spirit", definition_vi: "tràn đầy năng lượng và màu sắc rực rỡ" },
      { word: "picturesque", definition_en: "Charming and scenic, like an artist's landscape painting", definition_vi: "đẹp như tranh phong cảnh của họa sĩ" },
      { word: "aroma", definition_en: "A fragrant, distinctive culinary scent", definition_vi: "hương thơm ẩm thực nồng nàn đặc trưng" },
      { word: "serenity", definition_en: "A state of pure, undisturbed tranquility", definition_vi: "trạng thái yên bình thanh tịnh không vướng bận" }
    ],
    check_questions: [
      { id: 1, question_en: "Why do travel vloggers use sensory adjectives in their drafts?", options: ["To activate readers' five senses and bring destinations vividly to life", "To make their video files smaller", "To avoid using English words"], answer: "To activate readers' five senses and bring destinations vividly to life" },
      { id: 2, question_en: "Which sensory word describes an appealing culinary smell like roasted coffee?", options: ["Aroma", "Silent", "Square"], answer: "Aroma" },
      { id: 3, question_en: "What visual adjective describes an unbroken, sweeping view of an entire region?", options: ["Panoramic", "Microscopic", "Invisible"], answer: "Panoramic" }
    ],
    critical_thinking: {
      question_en: "Why is sensory language (sight, sound, smell, taste, touch) more persuasive than generic adjectives like 'good' or 'nice'?",
      hint_en: "Generic adjectives tell an opinion, but sensory adjectives show the physical reality so readers experience the scene for themselves."
    }
  },
  shadowing_sentences: [
    { id: 1, text: "The travel vlogger filmed the breathtaking sunrise over the misty mountain ridge.", en: "The travel vlogger filmed the breathtaking sunrise over the misty mountain ridge.", vi: "Vlogger du lịch đã quay cảnh bình minh ngoạn mục trên đỉnh núi mù sương.", ipa: "/ðə ˈtrævəl ˈvlɑːɡər fɪlmd ðə ˈbreθˌteɪkɪŋ ˈsʌnraɪz ˈoʊvər ðə ˈmɪsti ˈmaʊntn rɪdʒ/", words: ["The", "travel", "vlogger", "filmed", "the", "breathtaking", "sunrise", "over", "the", "misty", "mountain", "ridge"] },
    { id: 2, text: "A crisp morning breeze carried the sweet fragrance of pine needles.", en: "A crisp morning breeze carried the sweet fragrance of pine needles.", vi: "Một làn gió sớm mai mát lành mang theo hương thơm ngọt ngào của lá thông.", ipa: "/ə krɪsp ˈmɔːrnɪŋ briːz ˈkærid ðə swiːt ˈfreɪɡrəns əv paɪn ˈniːdlz/", words: ["A", "crisp", "morning", "breeze", "carried", "the", "sweet", "fragrance", "of", "pine", "needles"] },
    { id: 3, text: "Visitors enjoyed a panoramic view across the sparkling emerald bay below.", en: "Visitors enjoyed a panoramic view across the sparkling emerald bay below.", vi: "Du khách tận hưởng tầm nhìn toàn cảnh ra khắp vịnh ngọc lục bảo lấp lánh bên dưới.", ipa: "/ˈvɪzɪtərz ɪnˈdʒɔɪd ə ˌpænəˈræmɪk vjuː əˈkrɔːs ðə ˈspɑːrklɪŋ ˈemərəld beɪ bɪˈloʊ/", words: ["Visitors", "enjoyed", "a", "panoramic", "view", "across", "the", "sparkling", "emerald", "bay", "below"] },
    { id: 4, text: "The bustling evening market was vibrant with laughter and colorful lanterns.", en: "The bustling evening market was vibrant with laughter and colorful lanterns.", vi: "Khu chợ tối nhộn nhịp rực rỡ với tiếng cười và những chiếc đèn lồng nhiều màu.", ipa: "/ðə ˈbʌslɪŋ ˈiːvnɪŋ ˈmɑːrkɪt wəz ˈvaɪbrənt wɪð ˈlæftər ænd ˈkʌlərfəl ˈlæntərnz/", words: ["The", "bustling", "evening", "market", "was", "vibrant", "with", "laughter", "and", "colorful", "lanterns"] },
    { id: 5, text: "The rich aroma of roasted coffee beans drifted from charming cobblestone cafes.", en: "The rich aroma of roasted coffee beans drifted from charming cobblestone cafes.", vi: "Mùi thơm nồng đượm của hạt cà phê rang thoang thoảng bay ra từ các quán cà phê đá cuội duyên dáng.", ipa: "/ðə rɪtʃ əˈroʊmə əv ˈroʊstɪd ˈkɔːfi biːnz ˈdrɪftɪd frəm ˈtʃɑːrmɪŋ ˈkɑːblstoʊn kæˈfeɪz/", words: ["The", "rich", "aroma", "of", "roasted", "coffee", "beans", "drifted", "from", "charming", "cobblestone", "cafes"] },
    { id: 6, text: "Church bells echo softly across the valley, bringing a feeling of serenity.", en: "Church bells echo softly across the valley, bringing a feeling of serenity.", vi: "Tiếng chuông nhà thờ ngân vang êm dịu khắp thung lũng, mang lại cảm giác thanh bình.", ipa: "/tʃɜːrtʃ belz ˈekoʊ ˈsɔːftli əˈkrɔːs ðə ˈvæli ˈbrɪŋɪŋ ə ˈfiːlɪŋ əv səˈrenəti/", words: ["Church", "bells", "echo", "softly", "across", "the", "valley", "bringing", "a", "feeling", "of", "serenity"] },
    { id: 7, text: "Writers use vivid sensory words to describe their authentic travel experiences.", en: "Writers use vivid sensory words to describe their authentic travel experiences.", vi: "Người viết sử dụng các từ chỉ giác quan sống động để miêu tả những trải nghiệm du lịch chân thực.", ipa: "/ˈraɪtərz juːz ˈvɪvɪd ˈsensəri wɜːrdz tuː dɪˈskraɪb ðer ɔːˈθentɪk ˈtrævəl ɪkˈspɪriənsɪz/", words: ["Writers", "use", "vivid", "sensory", "words", "to", "describe", "their", "authentic", "travel", "experiences"] },
    { id: 8, text: "Capturing these unforgettable sights and sounds makes every destination come alive.", en: "Capturing these unforgettable sights and sounds makes every destination come alive.", vi: "Bắt trọn những cảnh sắc và âm thanh khó quên này làm cho mọi điểm đến như sống lại.", ipa: "/ˈkæptʃərɪŋ ðiːz ˌʌnfərˈɡetəbəl saɪts ænd saʊndz meɪks ˈevri ˌdestɪˈneɪʃən kʌm əˈlaɪv/", words: ["Capturing", "these", "unforgettable", "sights", "and", "sounds", "makes", "every", "destination", "come", "alive"] }
  ],
  story_scenes: [
    { id: 1, scene_id: "scene_1", scene_number: 1, title_en: "Sunrise at Jade Mountain Summit", title_vi: "Bình Minh Trên Đỉnh Núi Ngọc", description_en: "Chloe sets up her camera tripod on the wooden scenic deck as pink dawn breaks across the horizon.", description: "Chloe sets up her camera tripod on the wooden scenic deck as pink dawn breaks across the horizon.", image_url: "/images/week82/webtoon_scene_1.png", audio_url: "/audio/week82/scene_1.mp3" },
    { id: 2, scene_id: "scene_2", scene_number: 2, title_en: "Walking through Terraced Valleys", title_vi: "Tản Bộ Qua Thung Lũng Bậc Thang", description_en: "Liam and Chloe wander through emerald rice terraces, smelling the fresh crisp morning air and damp earth.", description: "Liam and Chloe wander through emerald rice terraces, smelling the fresh crisp morning air and damp earth.", image_url: "/images/week82/webtoon_scene_2.png", audio_url: "/audio/week82/scene_2.mp3" },
    { id: 3, scene_id: "scene_3", scene_number: 3, title_en: "The Bustling Old Town Market", title_vi: "Khu Chợ Phố Cổ Nhộn Nhịp", description_en: "Street musicians play bamboo flutes while vendors roast spiced nuts, creating a vibrant feast of sound and smell.", description: "Street musicians play bamboo flutes while vendors roast spiced nuts, creating a vibrant feast of sound and smell.", image_url: "/images/week82/webtoon_scene_3.png", audio_url: "/audio/week82/scene_3.mp3" },
    { id: 4, scene_id: "scene_4", scene_number: 4, title_en: "Sunset by the Historic Harbor", title_vi: "Hoàng Hôn Bên Bến Cảng Lịch Sử", description_en: "Gentle waves lap against wooden fishing boats as church bells echo across the tranquil harbor.", description: "Gentle waves lap against wooden fishing boats as church bells echo across the tranquil harbor.", image_url: "/images/week82/webtoon_scene_4.png", audio_url: "/audio/week82/scene_4.mp3" },
    { id: 5, scene_id: "scene_5", scene_number: 5, title_en: "Editing the Travel Vlog Episode", title_vi: "Chỉnh Sửa Tập Vlog Du Lịch", description_en: "Chloe and Liam review viewer survey data and write expressive voiceover narration in their editing studio.", description: "Chloe and Liam review viewer survey data and write expressive voiceover narration in their editing studio.", image_url: "/images/week82/webtoon_scene_5.png", audio_url: "/audio/week82/scene_5.mp3" }
  ],
  writing_data: {
    title: "Drafting a Descriptive Travel Essay with Sensory Words",
    prompt_en: "Look at the four panels. Write a descriptive essay draft of a visit to a scenic mountain town using sensory adjectives (sight, sound, smell, touch). Write 20 or more words.",
    prompt_vi: "Nhìn vào 4 khung tranh. Viết một bản thảo bài văn miêu tả chuyến thăm thị trấn vùng núi tuyệt đẹp sử dụng các tính từ chỉ giác quan (thị giác, thính giác, khứu giác, xúc giác). Viết từ 20 từ trở lên.",
    min_sentences: 3,
    min_words: 20,
    max_words: 90,
    model_sentence: "At dawn, the mountain summit offered a breathtaking panoramic view of the golden horizon. Walking through the valley, a crisp autumn breeze carried the sweet fragrance of pine needles. In the bustling old town, the rich aroma of roasted coffee drifted through lively cobblestone streets. As sunset painted the sky, church bells echoed across the tranquil harbor, bringing total serenity.",
    word_bank: ["spectacular", "landscape", "panoramic", "vibrant", "bustling", "fragrance", "crisp", "picturesque", "aroma", "serenity"],
    sentence_frames: [
      "At dawn, we marveled at the ___ panoramic view from the summit.",
      "A crisp mountain breeze carried the sweet ___ of fresh pine trees.",
      "We wandered through the ___ marketplace filled with colorful lanterns.",
      "In the evening, church bells echoed across the valley, bringing peaceful ___."
    ],
    panels: [
      {
        panel_id: "panel_1",
        title_en: "Panel 1: Breathtaking Mountain Sunrise",
        title_vi: "Khung 1: Bình Minh Ngoạn Mục Vùng Núi",
        image_url: "/images/week82/writing_panel_1.png",
        image_prompt: "A travel vlogger with a camera recording a glorious golden sunrise over mountain peaks and mist.",
        caption: "At dawn, the summit offered a breathtaking panoramic vista.",
        sentence_frame: "At dawn, the mountain summit [offered a breathtaking panoramic view] of [the glowing golden horizon].",
        pills: ["offered a breathtaking panoramic view", "the glowing golden horizon", "misty mountain peaks", "travel vlogger"],
        connectors: ["At dawn,", "Early in the morning,", "First,"]
      },
      {
        panel_id: "panel_2",
        title_en: "Panel 2: Crisp Valley Breeze",
        title_vi: "Khung 2: Làn Gió Thung Lũng Mát Lành",
        image_url: "/images/week82/writing_panel_2.png",
        image_prompt: "Two young travelers walking on a stone path through green pine trees with sunbeams streaming through leaves.",
        caption: "A crisp breeze carried the sweet fragrance of forest trees.",
        sentence_frame: "Walking through the valley, [a crisp morning breeze] carried [the sweet fragrance of pine needles].",
        pills: ["a crisp morning breeze", "the sweet fragrance of pine needles", "emerald terraced fields", "scenic stone path"],
        connectors: ["Next,", "As we walked,", "Soon afterwards,"]
      },
      {
        panel_id: "panel_3",
        title_en: "Panel 3: Bustling Market Aromas",
        title_vi: "Khung 3: Hương Vị Chợ Phố Nhộn Nhịp",
        image_url: "/images/week82/writing_panel_3.png",
        image_prompt: "A vibrant market street with wooden stalls, smiling food vendors, roasted nuts, and warm pastries.",
        caption: "The bustling market was filled with rich aromas and laughter.",
        sentence_frame: "In the bustling old town, [the rich aroma of roasted coffee] filled [the vibrant market square].",
        pills: ["the rich aroma of roasted coffee", "the vibrant market square", "cheerful street musicians", "bustling cobblestone alleys"],
        connectors: ["Later,", "In the town center,", "Meanwhile,"]
      },
      {
        panel_id: "panel_4",
        title_en: "Panel 4: Serene Harbor Sunset",
        title_vi: "Khung 4: Hoàng Hôn Bến Cảng Thanh Bình",
        image_url: "/images/week82/writing_panel_4.png",
        image_prompt: "Small wooden fishing boats floating on calm pink water while church bells echo across the harbor.",
        caption: "Church bells echoed softly across the peaceful harbor at dusk.",
        sentence_frame: "As dusk fell, church bells [echoed softly across the harbor], bringing [a sense of pure serenity].",
        pills: ["echoed softly across the harbor", "a sense of pure serenity", "tranquil fishing boats", "picturesque sunset"],
        connectors: ["Finally,", "As dusk fell,", "In the end,"]
      }
    ],
    ladder_stages: [
      {
        badge_label: "MODEL",
        title: "Stage 1: Sight (Visual Horizon)",
        image_url: "/images/week82/writing_panel_1.png",
        caption: "At dawn, the summit offered a breathtaking panoramic vista.",
        frame_L1: "At dawn, the mountain summit was breathtaking. The golden sunrise provided a panoramic view.",
        connectors: ["At dawn,", "Early in the morning,", "To start with,"],
        sentence_hint: "Write 2 sentences describing the sight of sunrise.",
        ordered_chips: ["At dawn, the mountain summit", "offered a breathtaking", "panoramic view across", "the glowing horizon."],
        pills: ["breathtaking sunrise", "panoramic view", "golden horizon", "mountain summit"],
        sentence_frame: "At dawn, the summit [offered a breathtaking view] of [the golden mountain horizon]."
      },
      {
        badge_label: "BUILD",
        title: "Stage 2: Touch & Smell (Crisp Air & Fragrance)",
        image_url: "/images/week82/writing_panel_2.png",
        caption: "A crisp breeze carried the sweet fragrance of forest trees.",
        frame_L1: "A crisp breeze touched our faces. The air smelled of sweet pine needles and wet earth.",
        connectors: ["As we walked,", "Next,", "Following this,"],
        sentence_hint: "Write 2 sentences describing the crisp touch of wind and smell of pine.",
        pills: ["crisp breeze", "touched our faces", "sweet pine needles", "fragrant forest"],
        sentence_frame: "A crisp morning breeze [cooled our faces] and carried [the sweet fragrance of pines]."
      },
      {
        badge_label: "WRITE",
        title: "Stage 3: Sound & Taste (Bustling Market Aromas)",
        image_url: "/images/week82/writing_panel_3.png",
        caption: "The bustling market was filled with rich aromas and laughter.",
        frame_L1: "The old town was bustling and vibrant. The rich aroma of fresh coffee beans filled the street.",
        connectors: ["In the afternoon,", "Later,", "Meanwhile,"],
        sentence_hint: "Write 2 sentences describing market sounds and delicious aromas.",
        pills: ["bustling and vibrant", "rich aroma", "fresh coffee beans", "laughing crowds"],
        sentence_frame: "The bustling market [was vibrant with laughter] and [the rich aroma of roasted coffee]."
      },
      {
        badge_label: "EXPAND",
        title: "Stage 4: Serenity & Reflection",
        image_url: "/images/week82/writing_panel_4.png",
        caption: "Church bells echoed softly across the peaceful harbor at dusk.",
        frame_L1: "As dusk fell, church bells echoed across the tranquil harbor. Total serenity settled over the town.",
        connectors: ["As dusk fell,", "Finally,", "In conclusion,"],
        sentence_hint: "Write 2 sentences about peaceful harbor sounds and serenity.",
        pills: ["church bells echoed", "tranquil harbor", "total serenity", "picturesque destination"],
        sentence_frame: "As dusk fell, bells [echoed across the tranquil water], creating [a feeling of pure serenity]."
      }
    ]
  },
  speaking_data: {
    talkshow_prompt: {
      topic: "Crafting Travel Vlogs with Sensory Storytelling",
      question: "Chloe, how do sensory adjectives make a travel vlog more captivating for your viewers?",
      model_response: "Sensory adjectives turn a flat video into a multidimensional experience! When I describe the crisp mountain air on my skin, the sweet fragrance of wild pines, and the rich aroma of roasted coffee drifting through bustling alleys, viewers don't just watch the video—they feel like they are walking right beside me! Using all five senses creates genuine emotional connection and vivid memories!"
    },
    info_exchange_cards: {
      table_a: {
        title: "Chloe's Mountain Sunrise Vlog",
        subtitle: "Candidate's Question Card (Ask Examiner)",
        person: "Chloe",
        fields: [
          { id: "field_a1", cue_prompt: "where / film the sunrise episode?", cue_word: "where", is_missing: true, acceptable_questions: ["Where does Chloe film the sunrise episode?", "Where was the sunrise filmed?", "Where did she film the episode?"], nova_reply: "Chloe filmed the sunrise at the Jade Peak Observation Deck." },
          { id: "field_a2", cue_prompt: "what / camera lens used for landscape?", cue_word: "what", is_missing: true, acceptable_questions: ["What camera lens was used for the landscape?", "What lens did she use?", "Which lens was used?"], nova_reply: "She used a wide-angle panoramic lens with a polarizing filter." },
          { id: "field_a3", cue_prompt: "what time / reach the scenic summit?", cue_word: "what time", is_missing: true, acceptable_questions: ["What time did she reach the scenic summit?", "What time did she arrive?", "When did she reach the summit?"], nova_reply: "She reached the summit at five-thirty in the morning before sunrise." },
          { id: "field_a4", cue_prompt: "who / composed the acoustic background music?", cue_word: "who", is_missing: true, acceptable_questions: ["Who composed the acoustic background music?", "Who made the music?", "Who wrote the soundtrack?"], nova_reply: "Her musical partner Liam composed the gentle acoustic guitar track." },
          { id: "field_a5", cue_prompt: "why / sensory narration so popular?", cue_word: "why", is_missing: true, acceptable_questions: ["Why is sensory narration so popular?", "Why do viewers love sensory narration?", "Why is it popular with viewers?"], nova_reply: "Because vivid sensory descriptions make viewers feel like they are traveling too." }
        ]
      },
      table_b: {
        title: "Liam's Coastal Harbor Episode",
        subtitle: "Information Card (Answer Examiner's Questions)",
        person: "Liam",
        fields: [
          { id: "field_b1", cue_prompt: "where / coastal fishing village located?", cue_word: "where", value: "In St. Ives Harbor on the southwestern coast of England.", nova_question: "Where is the coastal fishing village located?", acceptable_answers: ["In St. Ives Harbor on the southwestern coast of England.", "In St. Ives Harbor.", "Southwestern coast of England."] },
          { id: "field_b2", cue_prompt: "what / sounds recorded in the harbor?", cue_word: "what", value: "Calling seabirds, lapping waves, and distant church bells.", nova_question: "What ambient sounds were recorded in the harbor?", acceptable_answers: ["Calling seabirds, lapping waves, and distant church bells.", "Seabirds, waves, and church bells.", "Lapping waves and bells."] },
          { id: "field_b3", cue_prompt: "how / record sound in windy weather?", cue_word: "how", value: "By attaching a furry directional windscreen over the microphone.", nova_question: "How did Liam capture clear audio in windy weather?", acceptable_answers: ["By attaching a furry directional windscreen over the microphone.", "With a windscreen over the microphone.", "Using a directional windscreen."] },
          { id: "field_b4", cue_prompt: "who / guided the walking tour?", cue_word: "who", value: "Captain Donald, a retired local fishing harbor master.", nova_question: "Who guided the team through the historic fishing alleys?", acceptable_answers: ["Captain Donald, a retired local fishing harbor master.", "Captain Donald.", "A retired local harbor master."] },
          { id: "field_b5", cue_prompt: "why / harbor sunset so picturesque?", cue_word: "why", value: "Because golden light reflects off calm water and pastel cottages.", nova_question: "Why was the harbor sunset especially picturesque?", acceptable_answers: ["Because golden light reflects off calm water and pastel cottages.", "Golden light reflects off water and cottages.", "Because of golden water reflections."] }
        ]
      }
    }
  },
  cambridge_rw: {
    part1_definitions: [
      { id: 1, text: "A breathtaking and dramatically magnificent view of natural scenery.", target: "spectacular" },
      { id: 2, text: "All the visible geographic features of an open countryside or mountain area.", target: "landscape" },
      { id: 3, text: "A sweet, pleasant, and delicate scent produced by blooming flowers or pine trees.", target: "fragrance" },
      { id: 4, text: "A distinct, appetizing aroma of food, spices, or brewed drinks.", target: "aroma" },
      { id: 5, text: "The state of complete calmness, peaceful silence, and tranquility.", target: "serenity" }
    ],
    part2_dialogue: {
      title: "Chloe & Liam Reviewing Their Travel Vlog Draft",
      turns: [
        {
          id: 1,
          speaker: "Chloe",
          prompt: "Liam, how can we make our mountain vlog script sound more descriptive?",
          options: [
            "We should use sensory adjectives describing sights, sounds, smells, and crisp air.",
            "We should only count how many trees we saw.",
            "Yes, we should paint our camera with yellow paint."
          ],
          answer: "We should use sensory adjectives describing sights, sounds, smells, and crisp air."
        },
        {
          id: 2,
          speaker: "Chloe",
          prompt: "What words best describe the view from the sunrise summit deck?",
          options: [
            "It was a spectacular panoramic landscape with a glowing golden horizon.",
            "It looked like a broken clock.",
            "No, there was no scenery outside."
          ],
          answer: "It was a spectacular panoramic landscape with a glowing golden horizon."
        },
        {
          id: 3,
          speaker: "Chloe",
          prompt: "How did the air feel and smell as we walked through the pine forest?",
          options: [
            "The autumn breeze was delightfully crisp, carrying the sweet fragrance of pine needles.",
            "The air smelled like wet cardboard boxes.",
            "It was completely freezing with no wind at all."
          ],
          answer: "The autumn breeze was delightfully crisp, carrying the sweet fragrance of pine needles."
        },
        {
          id: 4,
          speaker: "Chloe",
          prompt: "What sensory details made the old town market feel so vibrant?",
          options: [
            "The bustling streets were filled with the rich aroma of roasted coffee and laughing voices.",
            "Nobody was there and all lights were off.",
            "The market was completely underwater."
          ],
          answer: "The bustling streets were filled with the rich aroma of roasted coffee and laughing voices."
        },
        {
          id: 5,
          speaker: "Chloe",
          prompt: "Shall we analyze viewer comments to see which scene had the highest rating?",
          options: [
            "Great idea! Let's interpret our survey data to see which episode was most popular.",
            "I want to jump into the cold river now.",
            "The bus departs at ten o'clock."
          ],
          answer: "Great idea! Let's interpret our survey data to see which episode was most popular."
        }
      ],
      exchanges: [
        { speaker: "Chloe", text: "Liam, how can we make our mountain vlog script sound more descriptive?" },
        { speaker: "Liam", text: "We should use sensory adjectives describing sights, sounds, smells, and crisp air." },
        { speaker: "Chloe", text: "What words best describe the view from the sunrise summit deck?" },
        { speaker: "Liam", text: "It was a spectacular panoramic landscape with a glowing golden horizon." },
        { speaker: "Chloe", text: "How did the air feel and smell as we walked through the pine forest?" },
        { speaker: "Liam", text: "The autumn breeze was delightfully crisp, carrying the sweet fragrance of pine needles." },
        { speaker: "Chloe", text: "What sensory details made the old town market feel so vibrant?" },
        { speaker: "Liam", text: "The bustling streets were filled with the rich aroma of roasted coffee and laughing voices." },
        { speaker: "Chloe", text: "Shall we analyze viewer comments to see which scene had the highest rating?" },
        { speaker: "Liam", text: "Great idea! Let's interpret our survey data to see which episode was most popular." }
      ]
    },
    part6_cloze: {
      title: "Chloe's Travel Vlogger Diary: Mountain Memories",
      instructions: "Read the diary entry and write the missing words. Write one word on each line.",
      text_template: "Filming our mountain travel vlog was [1]_____ unforgettable experience. The summit offered a spectacular view [2]_____ the golden horizon. As we walked, a crisp breeze [3]_____ the sweet fragrance of pine trees. In the market, the delicious aroma [4]_____ roasted nuts filled the air. Capturing these sensory details brings our travels [5]_____ life for everyone.",
      answers: { "1": "an", "2": "of", "3": "carried", "4": "of", "5": "to" }
    }
  },
  minigames: {
    math_problems: [
      {
        id: "w82_p1",
        type: "part_whole",
        title: "Analyzing Travel Vlog Video Views across Two Episodes",
        question: "Chloe's mountain sunrise vlog received 280 viewer likes, while her harbor tour episode received 220 viewer likes. How many total likes did the two episodes receive combined?",
        storyContext: "Liam compiles viewer engagement statistics for their video analytics report.",
        modelData: {
          bars: [
            { label: "Mountain Sunrise", value: 280, color: "#f59e0b" },
            { label: "Harbor Tour", value: 220, color: "#06b6d4" }
          ],
          total: 500,
          unit: "likes"
        },
        target_answer: 500,
        unit: "likes",
        steps: [
          "Take the mountain sunrise likes: 280 likes.",
          "Add the harbor tour likes: 220 likes.",
          "280 + 220 = 500 total likes."
        ]
      },
      {
        id: "w82_p2",
        type: "comparison",
        title: "Comparing Most and Least Watched Video Clips",
        question: "The most watched clip (Sunrise Panorama) received 310 views, while the least watched clip (Map Discussion) received 140 views. What is the difference in views between the most and least watched clips?",
        storyContext: "Chloe interprets audience retention data to see which scenery viewers preferred most.",
        modelData: {
          bars: [
            { label: "Most Watched (Panorama)", value: 310, color: "#ec4899" },
            { label: "Least Watched (Map)", value: 140, color: "#94a3b8" }
          ],
          difference: 170,
          unit: "views"
        },
        target_answer: 170,
        unit: "views",
        steps: [
          "Start with the most watched views: 310 views.",
          "Subtract the least watched views: 140 views.",
          "310 - 140 = 170 views difference."
        ]
      }
    ],
    action_lab_scenarios: [
      {
        stage: 1,
        title: "Sensory Detail Classification",
        diagram_type: "five_senses_sorting",
        instruction: "Classify descriptive travel terms into the correct sensory categories.",
        items: [
          { label: "Panoramic Golden Horizon", target: "sight" },
          { label: "Crisp Mountain Breeze", target: "touch" },
          { label: "Echoing Church Bells", target: "sound" }
        ]
      },
      {
        stage: 2,
        title: "Culinary Aroma & Taste Matching",
        diagram_type: "aroma_flavor_palette",
        instruction: "Associate local marketplace experiences with smell and taste vocabulary.",
        items: [
          { label: "Roasted Coffee Bean Vapor", target: "aroma" },
          { label: "Wild Pine Needle Scent", target: "fragrance" },
          { label: "Freshly Baked Warm Pastry", target: "taste" }
        ]
      },
      {
        stage: 3,
        title: "Atmospheric Serenity & Voiceover Pacing",
        diagram_type: "voiceover_timeline_sync",
        instruction: "Match voiceover descriptive pacing to scenic video footage.",
        items: [
          { label: "Quiet Dawn Time-Lapse", target: "slow_pacing" },
          { label: "Bustling Street Market", target: "energetic_pacing" },
          { label: "Peaceful Harbor Sunset", target: "tranquil_reflection" }
        ]
      }
    ],
    grammar_drills: [
      { sentence: "The observation deck offered a spectacular panoramic view.", options: ["panoramic", "panorama", "panoramas"], answer: "panoramic", explanation: "Use the adjective 'panoramic' before the noun 'view'." },
      { sentence: "A crisp morning breeze carried the sweet fragrance of flowers.", options: ["crisp", "crisply", "crispness"], answer: "crisp", explanation: "Use the sensory adjective 'crisp' to describe refreshing, cool air." },
      { sentence: "The rich aroma of roasted coffee drifted across the square.", options: ["aroma", "aromas", "aromatic"], answer: "aroma", explanation: "The noun 'aroma' refers to a distinctive pleasant food or drink smell." },
      { sentence: "Church bells echo softly across the peaceful valley at dusk.", options: ["echo", "echos", "echoing"], answer: "echo", explanation: "Use the plural present verb 'echo' with the plural subject 'Church bells'." },
      { sentence: "Writers use vivid adjectives to describe authentic experiences.", options: ["vivid", "vividly", "vividness"], answer: "vivid", explanation: "Use the adjective 'vivid' to describe powerful, distinct imagery." }
    ]
  }
};
