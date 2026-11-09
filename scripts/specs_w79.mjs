/**
 * scripts/specs_w79.mjs
 * Week 79: Social Studies/ELA: Space Exploration vs Earth Restoration / Math: Micro-Debate
 * Stage 2: Cambridge Lower Secondary & B1 Preliminary
 */

export const w79 = {
  week: 79,
  theme: "Social Studies/ELA: Space Exploration vs Earth Restoration / Math: Micro-Debate",
  title_en: "Space Exploration vs. Earth Restoration: The Great Debate",
  title_vi: "Khám Phá Vũ Trụ Hay Khôi Phục Trái Đất: Cuộc Tranh Luận Lớn",
  cefr_level: "B1 Preliminary",
  grammar_focus: "Rebuttal Connectors ('Yes, but...'), Passive Voice & Comparative Structures",
  vocab_list: [
    { id: 1, word: "exploration", pos: "n", ipa: "/ˌekspləˈreɪʃən/", definition_en: "The action of traveling in or through an unfamiliar area in order to learn about it", definition_vi: "sự thám hiểm / khám phá", example_en: "Deep space exploration inspires scientific breakthroughs in communications and materials.", example_vi: "Sự thám hiểm không gian sâu truyền cảm hứng cho những đột phá khoa học về truyền thông và vật liệu." },
    { id: 2, word: "restoration", pos: "n", ipa: "/ˌrestəˈreɪʃən/", definition_en: "The action of returning something to a former condition, health, or normal state", definition_vi: "sự phục hồi / khôi phục", example_en: "Ecological restoration of damaged coral reefs protects coastal marine biodiversity.", example_vi: "Sự phục hồi sinh thái các rạn san hô bị tổn hại bảo vệ đa dạng sinh học biển ven bờ." },
    { id: 3, word: "planet", pos: "n", ipa: "/ˈplænɪt/", definition_en: "A celestial body moving in an elliptical orbit around a star, such as Earth", definition_vi: "hành tinh", example_en: "Earth is the only habitable planet known to harbor complex biological life.", example_vi: "Trái Đất là hành tinh có thể sinh sống duy nhất được biết đến là nơi trú ngụ của sự sống sinh học phức tạp." },
    { id: 4, word: "investment", pos: "n", ipa: "/ɪnˈvestmənt/", definition_en: "The action or process of investing money, resources, or effort for future return", definition_vi: "sự đầu tư", example_en: "Heavy public investment in clean solar energy will reduce harmful atmospheric carbon.", example_vi: "Sự đầu tư công mạnh mẽ vào năng lượng mặt trời sạch sẽ làm giảm lượng carbon khí quyển có hại." },
    { id: 5, word: "atmosphere", pos: "n", ipa: "/ˈætməsfɪər/", definition_en: "The envelope of gases surrounding Earth or another celestial body", definition_vi: "bầu khí quyển", example_en: "Orbital satellites measure rising greenhouse gas levels within our planet's atmosphere.", example_vi: "Các vệ tinh trên quỹ đạo đo lường mức độ khí nhà kính đang gia tăng bên trong bầu khí quyển hành tinh chúng ta." },
    { id: 6, word: "satellite", pos: "n", ipa: "/ˈsætəlaɪt/", definition_en: "An artificial body placed in orbit around the earth or another planet to collect data", definition_vi: "vệ tinh nhân tạo", example_en: "Weather satellites track tropical hurricanes and monitor deforestation in real time.", example_vi: "Các vệ tinh thời tiết theo dõi các cơn bão nhiệt đới và giám sát nạn phá rừng theo thời gian thực." },
    { id: 7, word: "priority", pos: "n", ipa: "/praɪˈɔːrəti/", definition_en: "The fact or condition of being regarded or treated as more important than others", definition_vi: "sự ưu tiên / việc ưu tiên", example_en: "Many scientists argue that repairing climate damage should be our highest priority.", example_vi: "Nhiều nhà khoa học lập luận rằng việc khắc phục thiệt hại khí hậu nên là ưu tiên hàng đầu của chúng ta." },
    { id: 8, word: "renewable", pos: "adj", ipa: "/rɪˈnuːəbəl/", definition_en: "Capable of being replenished naturally within a human timescale, such as wind or solar power", definition_vi: "tái tạo được", example_en: "Transitioning to renewable energy sources is vital to counteract global warming.", example_vi: "Chuyển đổi sang các nguồn năng lượng tái tạo là điều sống còn để đối phó với hiện tượng ấm lên toàn cầu." },
    { id: 9, word: "biodiversity", pos: "n", ipa: "/ˌbaɪoʊdaɪˈvɜːrsəti/", definition_en: "The variety of plant and animal life in the world or in a particular habitat", definition_vi: "đa dạng sinh học", example_en: "Reforestation projects restore rich biodiversity across vulnerable tropical valleys.", example_vi: "Các dự án trồng rừng khôi phục sự đa dạng sinh học phong phú trên khắp các thung lũng nhiệt đới dễ bị tổn thương." },
    { id: 10, word: "debate", pos: "n", ipa: "/dɪˈbeɪt/", definition_en: "A formal discussion on a particular topic in a public meeting or legislative assembly", definition_vi: "cuộc tranh luận", example_en: "The student debate team presented well-researched arguments about budget priorities.", example_vi: "Đội tranh luận học sinh đã trình bày các luận điểm được nghiên cứu kỹ lưỡng về các ưu tiên ngân sách." },
    { id: 11, word: "argument", pos: "n", ipa: "/ˈɑːrɡjəmənt/", definition_en: "A reason or set of reasons given with the aim of persuading others that an action is right", definition_vi: "luận điểm / lý lẽ", example_en: "Her central argument was supported by statistical evidence from international climate reports.", example_vi: "Luận điểm trọng tâm của cô ấy được củng cố bằng bằng chứng thống kê từ các báo cáo khí hậu quốc tế." },
    { id: 12, word: "evidence", pos: "n", ipa: "/ˈevɪdəns/", definition_en: "The available body of facts or information indicating whether a belief or proposition is true", definition_vi: "bằng chứng / chứng cứ", example_en: "Satellite photography provides undeniable evidence of shrinking polar ice caps.", example_vi: "Ảnh chụp vệ tinh cung cấp bằng chứng không thể phủ nhận về sự tan chảy các chỏm băng vùng cực." },
    { id: 13, word: "fund", pos: "v", ipa: "/fʌnd/", definition_en: "To provide financial resources or money for a specific purpose or venture", definition_vi: "tài trợ / cấp vốn", example_en: "Governments must decide whether to fund lunar bases or ocean conservation initiatives.", example_vi: "Các chính phủ phải quyết định nên cấp vốn cho các căn cứ trên mặt trăng hay các sáng kiến bảo tồn đại dương." },
    { id: 14, word: "perspective", pos: "n", ipa: "/pərˈspektɪv/", definition_en: "A particular attitude toward or way of regarding something; point of view", definition_vi: "góc nhìn / quan điểm", example_en: "Looking down at Earth from orbit gives astronauts a profound ecological perspective.", example_vi: "Nhìn xuống Trái Đất từ quỹ đạo mang lại cho các phi hành gia một góc nhìn sinh thái sâu sắc." },
    { id: 15, word: "ecosystem", pos: "n", ipa: "/ˈiːkoʊsɪstəm/", definition_en: "A biological system composed of living organisms interacting with their physical surroundings", definition_vi: "hệ sinh thái", example_en: "Human industrial emissions threaten fragile freshwater and marine ecosystems.", example_vi: "Khí thải công nghiệp của con người đe dọa các hệ sinh thái nước ngọt và biển mỏng manh." },
    { id: 16, word: "telescope", pos: "n", ipa: "/ˈtelɪskoʊp/", definition_en: "An optical instrument designed to make distant objects in space appear nearer and clearer", definition_vi: "kính thiên văn", example_en: "The James Webb Space Telescope captures brilliant infrared images of distant nebulae.", example_vi: "Kính thiên văn không gian James Webb chụp được những bức ảnh hồng ngoại rực rỡ của các tinh vân xa xôi." },
    { id: 17, word: "cosmic", pos: "adj", ipa: "/ˈkɑːzmɪk/", definition_en: "Relating to the universe, space, or celestial cosmos as distinct from Earth", definition_vi: "thuộc vũ trụ / bao la", example_en: "Robotic space probes travel across cosmic distances to analyze Martian rock soil.", example_vi: "Các tàu thăm dò không gian robot di chuyển qua những khoảng cách vũ trụ để phân tích đất đá sao Hỏa." },
    { id: 18, word: "allocate", pos: "v", ipa: "/ˈæləkeɪt/", definition_en: "To distribute resources or duties for a particular purpose according to a plan", definition_vi: "phân bổ / chia định mức", example_en: "Budget directors allocate fifty million dollars toward community reforestation programs.", example_vi: "Các giám đốc ngân sách phân bổ năm mươi triệu đô la cho các chương trình trồng lại rừng cộng đồng." },
    { id: 19, word: "counteract", pos: "v", ipa: "/ˌkaʊntərˈækt/", definition_en: "To act against something in order to reduce its force or neutralize it", definition_vi: "ngăn chặn / đối phó / trung hòa", example_en: "Planting urban trees helps counteract the harmful effects of air pollution.", example_vi: "Trồng cây xanh đô thị giúp đối phó với những tác hại của ô nhiễm không khí." },
    { id: 20, word: "urgent", pos: "adj", ipa: "/ˈɜːrdʒənt/", definition_en: "Requiring immediate action, decision, or attention; critically pressing", definition_vi: "cấp bách / khẩn cấp", example_en: "Saving endangered wetlands is an urgent environmental responsibility.", example_vi: "Cứu vãn các vùng đất ngập nước có nguy cơ tuyệt chủng là một trách nhiệm môi trường cấp bách." }
  ],
  clil: {
    title_en: "Space Exploration vs. Earth Restoration: The Resource Debate",
    title_vi: "Khám Phá Vũ Trụ Hay Khôi Phục Trái Đất: Cuộc Tranh Luận Về Nguồn Lực",
    content_en: "In modern science policy, a passionate debate centers on whether humanity should allocate major financial resources toward exploring deep space or restoring Earth's wounded ecosystems. Proponents of space research argue that cosmic exploration pioneers transformative technologies. Sophisticated satellites orbiting high above our atmosphere track forest fires, calculate sea level rises, and locate fresh groundwater reserves. Conversely, environmental advocates assert that ecological restoration must remain our primary urgent priority. They argue that billions of dollars should be allocated to expand renewable solar grids, replant deforested tropical rainforests, and protect fragile ocean biodiversity. In debate rebuttals, speakers frequently use phrases like 'Yes, but...' to acknowledge valid technological benefits while vigorously defending the irreplaceable value of our home planet.",
    glossary: [
      { word: "exploration", definition_en: "Systematic investigation of unfamiliar geographic or cosmic areas", definition_vi: "sự điều tra có hệ thống các vùng địa lý hoặc vũ trụ" },
      { word: "restoration", definition_en: "Active rehabilitation of damaged ecological habitats", definition_vi: "hoạt động phục hồi môi trường sống bị tổn hại" },
      { word: "priority", definition_en: "A primary objective that takes precedence over other concerns", definition_vi: "mục tiêu hàng đầu được ưu tiên trước" },
      { word: "satellite", definition_en: "An orbital observational platform collecting planetary telemetry", definition_vi: "nền tảng quan sát trên quỹ đạo thu thập dữ liệu hành tinh" },
      { word: "counteract", definition_en: "To neutralize or reduce the damaging impact of an adverse force", definition_vi: "làm giảm bớt hoặc trung hòa tác động bất lợi" }
    ],
    check_questions: [
      { id: 1, question_en: "How do orbiting satellites assist in protecting Earth's environment?", options: ["They track forest fires, monitor rising sea levels, and detect greenhouse gases", "They harvest gold from distant asteroids", "They prevent clouds from forming rain"], answer: "They track forest fires, monitor rising sea levels, and detect greenhouse gases" },
      { id: 2, question_en: "What central argument do environmental restoration advocates present?", options: ["Funds should be allocated to renewable energy and reforestation to save our home planet", "All money should be spent on rocket fuel only", "Humans should immediately abandon Earth and live on Mars"], answer: "Funds should be allocated to renewable energy and reforestation to save our home planet" },
      { id: 3, question_en: "Which rebuttal connector acknowledges an opponent's point before providing counter-evidence?", options: ["Yes, but...", "Never, because...", "Obviously, so..."], answer: "Yes, but..." }
    ],
    critical_thinking: {
      question_en: "Using the rebuttal structure 'Yes, but...', formulate a counter-argument to the statement: 'Space exploration is a waste of money.'",
      hint_en: "Yes, deep space missions are expensive, but satellite technology developed for space is essential to track climate change on Earth."
    }
  },
  shadowing_sentences: [
    { id: 1, text: "Some scientists argue that space exploration pioneers vital technologies for all humanity.", en: "Some scientists argue that space exploration pioneers vital technologies for all humanity.", vi: "Một số nhà khoa học lập luận rằng thám hiểm vũ trụ tiên phong cho các công nghệ sống còn của nhân loại.", ipa: "/sʌm ˈsaɪəntɪsts ˈɑːrɡjuː ðæt speɪs ˌekspləˈreɪʃən ˌpaɪəˈnɪərz ˈvaɪtl tekˈnɑːlədʒiz fɔːr ɔːl hjuːˈmænəti/", words: ["Some", "scientists", "argue", "that", "space", "exploration", "pioneers", "vital", "technologies", "for", "all", "humanity"] },
    { id: 2, text: "Yes, cosmic research is inspiring, but restoring Earth's environment is more urgent.", en: "Yes, cosmic research is inspiring, but restoring Earth's environment is more urgent.", vi: "Đúng vậy, nghiên cứu vũ trụ rất truyền cảm hứng, nhưng khôi phục môi trường Trái Đất cấp bách hơn.", ipa: "/jes ˈkɑːzmɪk rɪˈsɜːrtʃ ɪz ɪnˈspaɪərɪŋ bʌt rɪˈstɔːrɪŋ ɜːrθs ɪnˈvaɪrənmənt ɪz mɔːr ˈɜːrdʒənt/", words: ["Yes", "cosmic", "research", "is", "inspiring", "but", "restoring", "Earth's", "environment", "is", "more", "urgent"] },
    { id: 3, text: "Weather satellites orbiting in the upper atmosphere track dangerous forest fires.", en: "Weather satellites orbiting in the upper atmosphere track dangerous forest fires.", vi: "Các vệ tinh thời tiết quay quanh tầng khí quyển bên trên theo dõi các vụ cháy rừng nguy hiểm.", ipa: "/ˈweðər ˈsætəlaɪts ˈɔːrbɪtɪŋ ɪn ði ˈʌpər ˈætməsfɪər træk ˈdeɪndʒərəs ˈfɔːrɪst ˈfaɪərz/", words: ["Weather", "satellites", "orbiting", "in", "the", "upper", "atmosphere", "track", "dangerous", "forest", "fires"] },
    { id: 4, text: "Clean renewable energy must be prioritized to counteract severe climate change.", en: "Clean renewable energy must be prioritized to counteract severe climate change.", vi: "Năng lượng tái tạo sạch phải được ưu tiên để đối phó với biến đổi khí hậu khắc nghiệt.", ipa: "/kliːn rɪˈnuːəbəl ˈenərdʒi mʌst bi praɪˈɔːrətaɪzd tuː ˌkaʊntərˈækt sɪˈvɪər ˈklaɪmət tʃeɪndʒ/", words: ["Clean", "renewable", "energy", "must", "be", "prioritized", "to", "counteract", "severe", "climate", "change"] },
    { id: 5, text: "Millions of trees are being planted to rebuild lost tropical biodiversity.", en: "Millions of trees are being planted to rebuild lost tropical biodiversity.", vi: "Hàng triệu cây xanh đang được trồng để tái tạo lại sự đa dạng sinh học nhiệt đới đã mất.", ipa: "/ˈmɪljənz əv triːz ɑːr ˈbiːɪŋ ˈplæntɪd tuː ˌriːˈbɪld lɔːst ˈtrɑːpɪkəl ˌbaɪoʊdaɪˈvɜːrsəti/", words: ["Millions", "of", "trees", "are", "being", "planted", "to", "rebuild", "lost", "tropical", "biodiversity"] },
    { id: 6, text: "Public funds should be allocated toward preserving our only living planet.", en: "Public funds should be allocated toward preserving our only living planet.", vi: "Ngân sách công nên được phân bổ cho việc bảo tồn hành tinh có sự sống duy nhất của chúng ta.", ipa: "/ˈpʌblɪk fʌndz ʃʊd bi ˈæləkeɪtɪd təˈwɔːrd prɪˈzɜːrvɪŋ ˈaʊər ˈoʊnli ˈlɪvɪŋ ˈplænɪt/", words: ["Public", "funds", "should", "be", "allocated", "toward", "preserving", "our", "only", "living", "planet"] },
    { id: 7, text: "Both perspectives offer valuable evidence during our competitive science debate.", en: "Both perspectives offer valuable evidence during our competitive science debate.", vi: "Cả hai góc nhìn đều đưa ra bằng chứng có giá trị trong cuộc tranh luận khoa học cạnh tranh của chúng ta.", ipa: "/boʊθ pərˈspektɪvz ˈɔːfər ˈvæljuəbəl ˈevɪdəns ˈdʊrɪŋ ˈaʊər kəmˈpetətɪv ˈsaɪəns dɪˈbeɪt/", words: ["Both", "perspectives", "offer", "valuable", "evidence", "during", "our", "competitive", "science", "debate"] },
    { id: 8, text: "Protecting our shared planetary home remains our ultimate moral responsibility.", en: "Protecting our shared planetary home remains our ultimate moral responsibility.", vi: "Bảo vệ ngôi nhà hành tinh chung của chúng ta vẫn là trách nhiệm đạo đức tối thượng.", ipa: "/prəˈtektɪŋ ˈaʊər ʃerd ˈplænəteri hoʊm rɪˈmeɪnz ˈaʊər ˈʌltəmət ˈmɔːrəl rɪˌspɑːnsəˈbɪləti/", words: ["Protecting", "our", "shared", "planetary", "home", "remains", "our", "ultimate", "moral", "responsibility"] }
  ],
  story_scenes: [
    { id: 1, scene_id: "scene_1", scene_number: 1, title_en: "Science Forum Auditorium", title_vi: "Hội Trường Diễn Đàn Khoa Học", description_en: "Kevin and Nora stand at modern debate podiums beneath banners displaying Earth and orbital space stations.", description: "Kevin and Nora stand at modern debate podiums beneath banners displaying Earth and orbital space stations.", image_url: "/images/week79/webtoon_scene_1.png", audio_url: "/audio/week79/scene_1.mp3" },
    { id: 2, scene_id: "scene_2", scene_number: 2, title_en: "Kevin Presents Satellite Data", title_vi: "Kevin Trình Bày Dữ Liệu Vệ Tinh", description_en: "Kevin points to digital Earth telemetry screens showing how orbital satellites detect deforestation in the Amazon.", description: "Kevin points to digital Earth telemetry screens showing how orbital satellites detect deforestation in the Amazon.", image_url: "/images/week79/webtoon_scene_2.png", audio_url: "/audio/week79/scene_2.mp3" },
    { id: 3, scene_id: "scene_3", scene_number: 3, title_en: "Nora's Reforestation Argument", title_vi: "Luận Điểm Trồng Rừng Của Nora", description_en: "Nora displays photos of newly planted mangrove forests and solar panels generating clean energy.", description: "Nora displays photos of newly planted mangrove forests and solar panels generating clean energy.", image_url: "/images/week79/webtoon_scene_3.png", audio_url: "/audio/week79/scene_3.mp3" },
    { id: 4, scene_id: "scene_4", scene_number: 4, title_en: "The Dynamic Rebuttal Round", title_vi: "Vòng Phản Biện Sôi Nổi", description_en: "Nora acknowledges satellite value with 'Yes, but...', emphasizing that climate action cannot wait decades.", description: "Nora acknowledges satellite value with 'Yes, but...', emphasizing that climate action cannot wait decades.", image_url: "/images/week79/webtoon_scene_4.png", audio_url: "/audio/week79/scene_4.mp3" },
    { id: 5, scene_id: "scene_5", scene_number: 5, title_en: "Synthesizing Solutions Together", title_vi: "Cùng Tổng Hợp Giải Pháp", description_en: "Judges applaud as Kevin and Nora agree that space technologies must directly serve Earth's restoration.", description: "Judges applaud as Kevin and Nora agree that space technologies must directly serve Earth's restoration.", image_url: "/images/week79/webtoon_scene_5.png", audio_url: "/audio/week79/scene_5.mp3" }
  ],
  writing_data: {
    title: "Structuring a Rebuttal in an Environmental Debate",
    prompt_en: "Look at the four panels. Write a debate rebuttal paragraph comparing space exploration with Earth restoration. Use rebuttal transition signals (such as 'Yes, but...'), passive voice ('funds are allocated'), and comparatives ('more urgent than...'). Write 20 or more words.",
    prompt_vi: "Nhìn vào 4 khung tranh. Viết một đoạn văn phản biện so sánh thám hiểm không gian với khôi phục Trái Đất. Sử dụng từ nối phản biện ('Yes, but...'), câu bị động ('funds are allocated'), và so sánh hơn ('more urgent than...'). Viết từ 20 từ trở lên.",
    min_sentences: 3,
    min_words: 20,
    max_words: 90,
    model_sentence: "Yes, space exploration develops advanced satellite technologies that monitor climate change, but restoring Earth's environment is far more urgent. Public funds should be allocated toward planting forests and building renewable solar farms. Protecting our only habitable planet is more critical than funding distant cosmic voyages.",
    word_bank: ["exploration", "restoration", "planet", "investment", "priority", "renewable", "biodiversity", "debate", "evidence", "urgent"],
    sentence_frames: [
      "Yes, space exploration is valuable, but ecological ___ is more urgent.",
      "Weather satellites are placed in the ___ to monitor climate patterns.",
      "Public investment should be allocated toward clean ___ energy.",
      "Protecting Earth's ___ is our primary moral responsibility."
    ],
    panels: [
      {
        panel_id: "panel_1",
        title_en: "Panel 1: The Space Exploration Argument",
        title_vi: "Khung 1: Luận Điểm Thám Hiểm Không Gian",
        image_url: "/images/week79/writing_panel_1.png",
        image_prompt: "A modern spacecraft launching into starry space while orbital satellites beam scientific data back to Earth.",
        caption: "Space research develops satellites that monitor atmospheric changes.",
        sentence_frame: "Space exploration [develops advanced orbital satellites] that [monitor planetary climate change].",
        pills: ["develops advanced orbital satellites", "monitor planetary climate change", "cosmic research", "technological breakthroughs"],
        connectors: ["First,", "On one hand,", "Proponents argue that"]
      },
      {
        panel_id: "panel_2",
        title_en: "Panel 2: Earth's Urgent Ecological Need",
        title_vi: "Khung 2: Nhu Cầu Sinh Thái Cấp Bách Của Trái Đất",
        image_url: "/images/week79/writing_panel_2.png",
        image_prompt: "A dry cracked riverbed contrasting with green workers planting fresh tree seedlings.",
        caption: "Ecological restoration is needed to rebuild degraded forests and oceans.",
        sentence_frame: "Ecological restoration [is urgently required] to [rebuild vulnerable natural ecosystems].",
        pills: ["is urgently required", "rebuild vulnerable natural ecosystems", "degraded habitats", "biodiversity protection"],
        connectors: ["However,", "In contrast,", "On the other hand,"]
      },
      {
        panel_id: "panel_3",
        title_en: "Panel 3: Formulating the Rebuttal",
        title_vi: "Khung 3: Thiết Lập Lời Phản Biện",
        image_url: "/images/week79/writing_panel_3.png",
        image_prompt: "A student speaker raising a hand at a debate podium delivering a confident rebuttal with data slides.",
        caption: "Speakers acknowledge satellite value with 'Yes, but...' to introduce rebuttals.",
        sentence_frame: "Yes, satellite technology is helpful, [but protecting Earth's climate] is [far more pressing].",
        pills: ["but protecting Earth's climate", "far more pressing", "acknowledged the argument", "delivered a strong rebuttal"],
        connectors: ["Yes, but...", "Nevertheless,", "While this is true,"]
      },
      {
        panel_id: "panel_4",
        title_en: "Panel 4: Balanced Planetary Action",
        title_vi: "Khung 4: Hành Động Hành Tinh Cân Bằng",
        image_url: "/images/week79/writing_panel_4.png",
        image_prompt: "Solar panels and wind turbines shining on a green hillside with an Earth observation satellite overhead.",
        caption: "Funds should be allocated to preserve our only living planet.",
        sentence_frame: "Public resources [should be allocated] toward [protecting our only living planet].",
        pills: ["should be allocated", "protecting our only living planet", "renewable energy investments", "sustainable future"],
        connectors: ["In conclusion,", "Ultimately,", "Therefore,"]
      }
    ],
    ladder_stages: [
      {
        badge_label: "MODEL",
        title: "Stage 1: Acknowledging Technology",
        image_url: "/images/week79/writing_panel_1.png",
        caption: "Space research develops satellites that monitor atmospheric changes.",
        frame_L1: "Space exploration produces helpful technologies. Satellites monitor atmospheric temperatures and ocean levels.",
        connectors: ["First,", "On one hand,", "Initially,"],
        sentence_hint: "Write 2 sentences about how satellites assist science.",
        ordered_chips: ["Space exploration develops", "valuable orbital satellites", "to monitor temperatures", "across Earth's atmosphere."],
        pills: ["develops orbital satellites", "monitor temperatures", "space exploration", "Earth's atmosphere"],
        sentence_frame: "Space exploration [develops advanced orbital satellites] that [monitor planetary climate change]."
      },
      {
        badge_label: "BUILD",
        title: "Stage 2: Highlighting Climate Urgency",
        image_url: "/images/week79/writing_panel_2.png",
        caption: "Ecological restoration is needed to rebuild degraded forests and oceans.",
        frame_L1: "Restoring Earth's environment is more urgent than Mars missions. Forests and oceans need protection.",
        connectors: ["However,", "In contrast,", "On the other hand,"],
        sentence_hint: "Write 2 sentences comparing ecological urgency with space travel.",
        pills: ["more urgent than Mars", "forests and oceans", "need protection", "ecological restoration"],
        sentence_frame: "Restoring Earth's ecosystems [is far more urgent] than [funding distant space voyages]."
      },
      {
        badge_label: "WRITE",
        title: "Stage 3: Delivering the Rebuttal",
        image_url: "/images/week79/writing_panel_3.png",
        caption: "Speakers acknowledge satellite value with 'Yes, but...' to introduce rebuttals.",
        frame_L1: "Yes, space science is inspiring, but Earth is our only home. Funds must be allocated to clean energy.",
        connectors: ["Yes, but...", "Nevertheless,", "Even so,"],
        sentence_hint: "Write 2 sentences using 'Yes, but...' to introduce your counter-claim.",
        pills: ["Yes, but...", "our only home", "funds must be allocated", "clean energy"],
        sentence_frame: "Yes, space research is helpful, [but protecting our home planet] is [our primary duty]."
      },
      {
        badge_label: "EXPAND",
        title: "Stage 4: Concluding the Argument",
        image_url: "/images/week79/writing_panel_4.png",
        caption: "Funds should be allocated to preserve our only living planet.",
        frame_L1: "Ultimately, space technology must serve Earth restoration. We must preserve our living planet for future generations.",
        connectors: ["Ultimately,", "In conclusion,", "Therefore,"],
        sentence_hint: "Write 2 sentences synthesizing space technology and planetary care.",
        pills: ["serve Earth restoration", "preserve our living planet", "future generations", "balanced investment"],
        sentence_frame: "Public resources [should be allocated] to [ensure a sustainable living planet]."
      }
    ]
  },
  speaking_data: {
    talkshow_prompt: {
      topic: "Defending Environmental Priorities in Micro-Debates",
      question: "Nora, why is the 'Yes, but...' rebuttal structure so effective in competitive science debates?",
      model_response: "The 'Yes, but...' structure is effective because it demonstrates that you listened to your opponent's perspective before presenting a stronger counter-argument! You show intellectual respect by conceding: 'Yes, satellite sensors developed for space provide vital climate data.' Then you deliver the compelling rebuttal: 'But investing billions in planting trees and expanding renewable energy is far more urgent for saving Earth right now!'"
    },
    info_exchange_cards: {
      table_a: {
        title: "Kevin's Space Research Mission",
        subtitle: "Candidate's Question Card (Ask Examiner)",
        person: "Kevin",
        fields: [
          { id: "field_a1", cue_prompt: "where / satellite control station located?", cue_word: "where", is_missing: true, acceptable_questions: ["Where is the satellite control station located?", "Where is the control station?", "Where does Kevin monitor satellites?"], nova_reply: "The orbital telemetry center is located in Houston, Texas." },
          { id: "field_a2", cue_prompt: "what / primary satellite mission?", cue_word: "what", is_missing: true, acceptable_questions: ["What is the primary satellite mission?", "What do the satellites do?", "What is their main purpose?"], nova_reply: "The satellites monitor global greenhouse emissions and ocean heat levels." },
          { id: "field_a3", cue_prompt: "how much / annual space program budget?", cue_word: "how much", is_missing: true, acceptable_questions: ["How much is the annual space program budget?", "What is the budget?", "How much money is allocated?"], nova_reply: "Congress allocated twenty-four billion dollars to the federal space program." },
          { id: "field_a4", cue_prompt: "who / leads the climate satellite division?", cue_word: "who", is_missing: true, acceptable_questions: ["Who leads the climate satellite division?", "Who is the division director?", "Who supervises the project?"], nova_reply: "Dr. Evelyn Vance leads the Earth observation satellite team." },
          { id: "field_a5", cue_prompt: "why / orbital telescopes valuable?", cue_word: "why", is_missing: true, acceptable_questions: ["Why are orbital telescopes valuable?", "Why do we need space telescopes?", "Why fund orbital telescopes?"], nova_reply: "Because they capture infrared radiation without atmospheric distortion." }
        ]
      },
      table_b: {
        title: "Nora's Rainforest Reforestation Campaign",
        subtitle: "Information Card (Answer Examiner's Questions)",
        person: "Nora",
        fields: [
          { id: "field_b1", cue_prompt: "where / ecological restoration reserve?", cue_word: "where", value: "Across the Atlantic Forest coastal belt in Brazil.", nova_question: "Where is Nora's reforestation reserve located?", acceptable_answers: ["Across the Atlantic Forest coastal belt in Brazil.", "In Brazil.", "The Atlantic Forest in Brazil."] },
          { id: "field_b2", cue_prompt: "what / species of trees planted?", cue_word: "what", value: "Thirty native broadleaf species to maximize biodiversity.", nova_question: "What species of trees are planted in the nursery?", acceptable_answers: ["Thirty native broadleaf species to maximize biodiversity.", "Thirty native broadleaf species.", "Native broadleaf species."] },
          { id: "field_b3", cue_prompt: "how / measure annual carbon capture?", cue_word: "how", value: "By analyzing soil core samples and trunk growth diameters.", nova_question: "How does the research team measure annual carbon capture?", acceptable_answers: ["By analyzing soil core samples and trunk growth diameters.", "Through soil cores and tree trunk measurements.", "Using soil samples and trunk diameters."] },
          { id: "field_b4", cue_prompt: "who / funds the forest restoration project?", cue_word: "who", value: "An international coalition of green climate foundations.", nova_question: "Who funds the coastal reforestation campaign?", acceptable_answers: ["An international coalition of green climate foundations.", "Green climate foundations.", "International climate foundations."] },
          { id: "field_b5", cue_prompt: "why / restore mangrove wetlands first?", cue_word: "why", value: "To shield coastal communities from severe storm surges.", nova_question: "Why does the campaign prioritize restoring mangrove wetlands?", acceptable_answers: ["To shield coastal communities from severe storm surges.", "To protect coastal communities from storms.", "To shield against storm surges."] }
        ]
      }
    }
  },
  cambridge_rw: {
    part1_definitions: [
      { id: 1, text: "The scientific traveling into distant space or uncharted territories to gather knowledge.", target: "exploration" },
      { id: 2, text: "The dedicated ecological process of repairing damaged forests, rivers, or coral reefs.", target: "restoration" },
      { id: 3, text: "An artificial electronic machine placed in orbit around Earth to transmit radio signals and weather photos.", target: "satellite" },
      { id: 4, text: "An urgent matter or task that must be attended to before any other consideration.", target: "priority" },
      { id: 5, text: "The wide variety of plant, insect, and animal species living within a balanced habitat.", target: "biodiversity" }
    ],
    part2_dialogue: {
      title: "Kevin & Nora Debating Science Funding Priorities",
      turns: [
        {
          id: 1,
          speaker: "Kevin",
          prompt: "Nora, isn't space exploration essential for developing modern digital technologies?",
          options: [
            "Yes, but restoring our damaged climate is far more urgent for human survival.",
            "No, computers were invented by stone age hunters.",
            "Space exploration only builds plastic toys."
          ],
          answer: "Yes, but restoring our damaged climate is far more urgent for human survival."
        },
        {
          id: 2,
          speaker: "Kevin",
          prompt: "Don't orbital satellites help us monitor deforestation and ocean temperatures?",
          options: [
            "Yes, they do, which proves space tools must directly assist Earth conservation.",
            "Satellites only play loud dance music in the clouds.",
            "No, satellites cannot see through the air."
          ],
          answer: "Yes, they do, which proves space tools must directly assist Earth conservation."
        },
        {
          id: 3,
          speaker: "Kevin",
          prompt: "How should governments allocate their limited annual science budgets?",
          options: [
            "Funds should be prioritized for renewable energy, reforestation, and clean water.",
            "Governments should hide all their money in wooden chests.",
            "They should spend everything on buying chocolate candy."
          ],
          answer: "Funds should be prioritized for renewable energy, reforestation, and clean water."
        },
        {
          id: 4,
          speaker: "Kevin",
          prompt: "Can human beings relocate to Mars if Earth becomes uninhabitable?",
          options: [
            "No, Mars is a barren desert without a breathable atmosphere; Earth is our only home.",
            "Yes, we can all walk to Mars tomorrow morning.",
            "Mars has swimming pools on every corner."
          ],
          answer: "No, Mars is a barren desert without a breathable atmosphere; Earth is our only home."
        },
        {
          id: 5,
          speaker: "Kevin",
          prompt: "Shall we summarize our debate points into a joint recommendations proposal?",
          options: [
            "Excellent proposal! Let's combine satellite tracking with active reforestation.",
            "I prefer to play video games until midnight.",
            "The train leaves the station at five."
          ],
          answer: "Excellent proposal! Let's combine satellite tracking with active reforestation."
        }
      ],
      exchanges: [
        { speaker: "Kevin", text: "Nora, isn't space exploration essential for developing modern digital technologies?" },
        { speaker: "Nora", text: "Yes, but restoring our damaged climate is far more urgent for human survival." },
        { speaker: "Kevin", text: "Don't orbital satellites help us monitor deforestation and ocean temperatures?" },
        { speaker: "Nora", text: "Yes, they do, which proves space tools must directly assist Earth conservation." },
        { speaker: "Kevin", text: "How should governments allocate their limited annual science budgets?" },
        { speaker: "Nora", text: "Funds should be prioritized for renewable energy, reforestation, and clean water." },
        { speaker: "Kevin", text: "Can human beings relocate to Mars if Earth becomes uninhabitable?" },
        { speaker: "Nora", text: "No, Mars is a barren desert without a breathable atmosphere; Earth is our only home." },
        { speaker: "Kevin", text: "Shall we summarize our debate points into a joint recommendations proposal?" },
        { speaker: "Nora", text: "Excellent proposal! Let's combine satellite tracking with active reforestation." }
      ]
    },
    part6_cloze: {
      title: "Kevin & Nora's Joint Debate Summary: Planetary Priorities",
      instructions: "Read the debate summary and write the missing words. Write one word on each line.",
      text_template: "Scientists debate whether space exploration or Earth restoration [1]_____ be our top priority. Weather satellites orbit high [2]_____ our atmosphere to track climate change. Yes, space research is exciting, [3]_____ protecting our home planet is far more urgent. Public funds must [4]_____ allocated to renewable energy and reforestation. Earth is the only planet [5]_____ can support human life.",
      answers: { "1": "should", "2": "in", "3": "but", "4": "be", "5": "that" }
    }
  },
  minigames: {
    math_problems: [
      {
        id: "w79_p1",
        type: "part_whole",
        title: "Comparing Budget Allocations between Space Research and Clean Energy",
        question: "A national science council allocates 65 million dollars to satellite climate monitoring and 85 million dollars to community reforestation. What is the total environmental budget in millions of dollars?",
        storyContext: "Kevin analyzes public budget graphs for his debate rebuttal on environmental priorities.",
        modelData: {
          bars: [
            { label: "Satellite Observation", value: 65, color: "#3b82f6" },
            { label: "Reforestation Grants", value: 85, color: "#10b981" }
          ],
          total: 150,
          unit: "million dollars"
        },
        target_answer: 150,
        unit: "million dollars",
        steps: [
          "Take the satellite monitoring allocation: 65 million dollars.",
          "Add the reforestation allocation: 85 million dollars.",
          "65 + 85 = 150 million dollars in total."
        ]
      },
      {
        id: "w79_p2",
        type: "comparison",
        title: "Comparing Tree Planting Target vs Actual Progress",
        question: "Nora's reforestation team set a target to plant 190 thousand trees this season. By October, they had planted 125 thousand trees. How many more trees must be planted to meet the target?",
        storyContext: "Nora tallies coastal mangrove saplings on a progress comparison chart.",
        modelData: {
          bars: [
            { label: "Seasonal Target", value: 190, color: "#047857" },
            { label: "Planted to Date", value: 125, color: "#10b981" }
          ],
          difference: 65,
          unit: "thousand trees"
        },
        target_answer: 65,
        unit: "thousand trees",
        steps: [
          "Start with the seasonal target: 190 thousand trees.",
          "Subtract the trees planted to date: 125 thousand trees.",
          "190 - 125 = 65 thousand trees remaining."
        ]
      }
    ],
    action_lab_scenarios: [
      {
        stage: 1,
        title: "Satellite Telemetry & Earth Monitoring",
        diagram_type: "orbital_satellite_telemetry",
        instruction: "Select orbital data layers that assist climate scientists on Earth.",
        items: [
          { label: "Atmospheric CO2 Sensors", target: "telemetry" },
          { label: "Thermal Forest Fire Scanners", target: "infrared" },
          { label: "Radar Sea Level Altimeters", target: "oceanography" }
        ]
      },
      {
        stage: 2,
        title: "Biodiversity & Reforestation Carbon Sinks",
        diagram_type: "reforestation_carbon_plot",
        instruction: "Route agricultural land into multi-tiered native rainforest restoration.",
        items: [
          { label: "Pioneer Broadleaf Seedlings", target: "canopy_layer" },
          { label: "Wetland Mangrove Buffer", target: "coastal_protection" },
          { label: "Soil Humus Carbon Storage", target: "carbon_sink" }
        ]
      },
      {
        stage: 3,
        title: "Synthesizing Space and Earth Funding",
        diagram_type: "integrated_budget_flow",
        instruction: "Balance public funds between space-based observation and terrestrial conservation.",
        items: [
          { label: "Orbital Climate Monitoring", target: "space_tech" },
          { label: "Renewable Energy Grid Transition", target: "earth_action" },
          { label: "Sustainable Planetary Harmony", target: "equilibrium" }
        ]
      }
    ],
    grammar_drills: [
      { sentence: "Yes, space research is inspiring, but Earth restoration is more urgent.", options: ["Yes, but", "Because so", "Although if"], answer: "Yes, but", explanation: "Use 'Yes, but...' as a conversational rebuttal structure to acknowledge a point before disagreeing." },
      { sentence: "Public funds should be allocated toward preserving our only planet.", options: ["allocated", "allocate", "allocating"], answer: "allocated", explanation: "After 'should be' in passive voice, use the past participle 'allocated'." },
      { sentence: "Weather satellites are designed to monitor atmospheric changes.", options: ["are designed", "designed", "designing"], answer: "are designed", explanation: "Use present passive 'are designed' when the subject receives the action." },
      { sentence: "Restoring biodiversity is far more critical than building lunar colonies.", options: ["more critical", "most critical", "critical"], answer: "more critical", explanation: "Use the comparative 'more critical' followed by 'than' to compare two priorities." },
      { sentence: "Saving endangered wetlands is an urgent environmental responsibility.", options: ["urgent", "urgently", "urgency"], answer: "urgent", explanation: "Use the adjective 'urgent' before the noun phrase 'environmental responsibility'." }
    ]
  }
};
