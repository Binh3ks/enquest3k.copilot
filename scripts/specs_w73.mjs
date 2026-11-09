/**
 * scripts/specs_w73.mjs
 * Week 73: Science/ELA: The Water Cycle (Advanced) / Math: Volume
 * Stage 2: Cambridge Lower Secondary & B1 Preliminary
 */

export const w73 = {
  week: 73,
  theme: "Science/ELA: The Water Cycle (Advanced) / Math: Volume",
  title_en: "The Never-Ending Journey: The Water Cycle",
  title_vi: "Hành Trình Bất Tận: Vòng Tuần Hoàn Của Nước",
  cefr_level: "B1 Preliminary",
  grammar_focus: "Sequence Connectors (Advanced): 'Subsequently', 'Following this', 'Eventually'",
  vocab_list: [
    { id: 1, word: "evaporation", pos: "n", ipa: "/ɪˌvæpəˈreɪʃən/", definition_en: "The process of a liquid turning into vapor or gas through heating", definition_vi: "sự bốc hơi", example_en: "Solar heat causes rapid evaporation of water from the lake surface.", example_vi: "Nhiệt lượng mặt trời gây ra sự bốc hơi nước nhanh chóng từ mặt hồ." },
    { id: 2, word: "condensation", pos: "n", ipa: "/ˌkɑːndenˈseɪʃən/", definition_en: "The conversion of water vapor into liquid water droplets when cooled", definition_vi: "sự ngưng tụ", example_en: "Condensation occurs when warm moist air rises and cools high in the sky.", example_vi: "Sự ngưng tụ xảy ra khi không khí ấm ẩm bốc lên và lạnh đi trên bầu trời cao." },
    { id: 3, word: "precipitation", pos: "n", ipa: "/prɪˌsɪpɪˈteɪʃən/", definition_en: "Water that falls to Earth as rain, snow, sleet, or hail", definition_vi: "lượng mưa / sự kết tủa nước", example_en: "Heavy precipitation in the mountains fills streams and reservoirs.", example_vi: "Lượng mưa lớn trên vùng núi làm đầy các dòng suối và hồ chứa." },
    { id: 4, word: "collection", pos: "n", ipa: "/kəˈlekʃən/", definition_en: "The stage where fallen water gathers in rivers, lakes, and oceans", definition_vi: "sự tập hợp / tụ nước", example_en: "Water collection happens naturally in low valleys and underground aquifers.", example_vi: "Sự tụ nước diễn ra tự nhiên tại các thung lũng thấp và các tầng chứa nước ngầm." },
    { id: 5, word: "vapor", pos: "n", ipa: "/ˈveɪpər/", definition_en: "Water in the form of an invisible gas suspended in the air", definition_vi: "hơi nước", example_en: "Invisible water vapor rises steadily into the cool upper atmosphere.", example_vi: "Hơi nước vô hình bốc lên đều đặn vào tầng khí quyển mát mẻ bên trên." },
    { id: 6, word: "cycle", pos: "n", ipa: "/ˈsaɪkəl/", definition_en: "A continuous series of repeating events or processes", definition_vi: "chu trình / vòng tuần hoàn", example_en: "The global hydrologic cycle maintains Earth's freshwater balance.", example_vi: "Chu trình thủy văn toàn cầu duy trì sự cân bằng nước ngọt của Trái Đất." },
    { id: 7, word: "atmosphere", pos: "n", ipa: "/ˈætməsfɪər/", definition_en: "The protective envelope of gases surrounding our planet", definition_vi: "khí quyển", example_en: "Moisture travels thousands of miles through the windy atmosphere.", example_vi: "Hơi ẩm di chuyển hàng ngàn dặm qua bầu khí quyển lộng gió." },
    { id: 8, word: "droplet", pos: "n", ipa: "/ˈdrɑːplət/", definition_en: "A very tiny sphere of liquid water", definition_vi: "giọt nước nhỏ", example_en: "Millions of tiny droplets combine to form thick cumulus clouds.", example_vi: "Hàng triệu giọt nước nhỏ kết hợp lại để tạo thành những đám mây tích dày." },
    { id: 9, word: "groundwater", pos: "n", ipa: "/ˈɡraʊndwɔːtər/", definition_en: "Water stored beneath Earth's surface in soil pores and rock crevices", definition_vi: "nước ngầm", example_en: "Deep wells pump groundwater to supply farms during summer droughts.", example_vi: "Các giếng sâu bơm nước ngầm để cung cấp cho nông trại trong các đợt hạn hán mùa hè." },
    { id: 10, word: "reservoir", pos: "n", ipa: "/ˈrezərvwɑːr/", definition_en: "A large natural or artificial lake used as a source of water supply", definition_vi: "hồ chứa nước", example_en: "The mountain reservoir stores drinking water for the entire valley.", example_vi: "Hồ chứa trên núi tích trữ nước uống cho toàn bộ thung lũng." },
    { id: 11, word: "transpiration", pos: "n", ipa: "/ˌtrænspɪˈreɪʃən/", definition_en: "The release of water vapor from plant leaves into the atmosphere", definition_vi: "sự thoát hơi nước (ở thực vật)", example_en: "Forest trees release large amounts of moisture through plant transpiration.", example_vi: "Cây rừng giải phóng một lượng lớn hơi ẩm thông qua sự thoát hơi nước của thực vật." },
    { id: 12, word: "glacier", pos: "n", ipa: "/ˈɡleɪʃər/", definition_en: "A massive, slow-moving mass of compacted ice on land", definition_vi: "sông băng", example_en: "Melting glaciers gradually feed freshwater rivers throughout spring.", example_vi: "Những dòng sông băng tan chảy dần dần nuôi dưỡng các dòng sông nước ngọt suốt mùa xuân." },
    { id: 13, word: "saturate", pos: "v", ipa: "/ˈsætʃəreɪt/", definition_en: "To cause something to become completely soaked with liquid", definition_vi: "làm bão hòa / thấm đẫm", example_en: "Persistent rains saturate the soil, leading to rapid surface runoff.", example_vi: "Mưa dai dẳng làm thấm đẫm đất đai, dẫn đến dòng chảy bề mặt nhanh chóng." },
    { id: 14, word: "transform", pos: "v", ipa: "/trænsˈfɔːrm/", definition_en: "To change completely in form, appearance, or character", definition_vi: "chuyển hóa / biến đổi", example_en: "Rising heat transforms liquid water into invisible expanding gas.", example_vi: "Nhiệt lượng tăng cao biến đổi nước lỏng thành chất khí vô hình giãn nở." },
    { id: 15, word: "dense", pos: "adj", ipa: "/dens/", definition_en: "Closely compacted together and crowded with particles", definition_vi: "dày đặc / đậm đặc", example_en: "Dense storm clouds gather over the mountain ridge before dusk.", example_vi: "Những đám mây giông dày đặc tích tụ trên đỉnh núi trước khi hoàng hôn buông xuống." },
    { id: 16, word: "circulate", pos: "v", ipa: "/ˈsɜːrkjəleɪt/", definition_en: "To move continuously through a closed system or circuit", definition_vi: "luân chuyển / tuần hoàn", example_en: "Ocean currents circulate warm moisture around the entire globe.", example_vi: "Các dòng hải lưu luân chuyển hơi ẩm ấm áp đi khắp địa cầu." },
    { id: 17, word: "moisture", pos: "n", ipa: "/ˈmɔɪstʃər/", definition_en: "Water diffused in small quantities as vapor or dampness", definition_vi: "độ ẩm / hơi ẩm", example_en: "Morning moisture on the leaves glistened brightly in the sunlight.", example_vi: "Hơi ẩm buổi sáng trên những tán lá lấp lánh rực rỡ dưới ánh mặt trời." },
    { id: 18, word: "absorb", pos: "v", ipa: "/əbˈzɔːrb/", definition_en: "To take in or soak up energy, liquid, or other substances", definition_vi: "hấp thụ / thấm hút", example_en: "Forest roots absorb groundwater to nourish growing branches.", example_vi: "Rễ cây rừng hấp thụ nước ngầm để nuôi dưỡng các cành nhánh đang phát triển." },
    { id: 19, word: "ascend", pos: "v", ipa: "/əˈsend/", definition_en: "To rise up or move upward through the air", definition_vi: "bốc lên / bay lên", example_en: "Heated air currents ascend rapidly above the sunlit valley floor.", example_vi: "Các luồng không khí bị đốt nóng bốc lên nhanh chóng phía trên đáy thung lũng ngập tràn ánh nắng." },
    { id: 20, word: "continuous", pos: "adj", ipa: "/kənˈtɪnjuəs/", definition_en: "Forming an unbroken whole without interruption", definition_vi: "liên tục / không ngừng", example_en: "The water cycle is a continuous natural process that never stops.", example_vi: "Vòng tuần hoàn nước là một tiến trình tự nhiên liên tục không bao giờ ngừng lại." }
  ],
  clil: {
    title_en: "The Hydrologic Cycle: Nature's Endless Recycling Mechanism",
    title_vi: "Chu Trình Thủy Văn: Cơ Chế Tái Chế Vô Tận Của Tự Nhiên",
    content_en: "Water is the lifeblood of our planet, constantly moving through a remarkable recycling loop called the hydrologic cycle. First, solar energy warms oceans and rivers, driving evaporation. At the same time, forest plants release moisture through transpiration. Subsequently, this invisible vapor ascends into the cooler upper atmosphere. Following this upward journey, cooling air causes condensation, forming dense clouds made of billions of tiny droplets. Eventually, these droplets grow heavy enough to fall as precipitation, nourishing valleys and recharging groundwater reserves. Surface runoff flows back into lakes and oceans for collection, completing the continuous cycle.",
    glossary: [
      { word: "evaporation", definition_en: "The transformation of liquid water into airborne vapor", definition_vi: "sự bốc hơi nước thành khí" },
      { word: "transpiration", definition_en: "The biological release of water vapor from plant foliage", definition_vi: "sự thoát hơi nước ở lá cây" },
      { word: "condensation", definition_en: "The cooling of vapor into liquid cloud droplets", definition_vi: "sự ngưng tụ hơi ẩm thành hạt nước" },
      { word: "precipitation", definition_en: "Moisture falling to Earth as rain, sleet, or snow", definition_vi: "nước rơi xuống bề mặt đất (mưa, tuyết)" },
      { word: "groundwater", definition_en: "Freshwater stored deep within underground rock strata", definition_vi: "nước ngọt tích trữ sâu dưới lòng đất" }
    ],
    check_questions: [
      { id: 1, question_en: "What primary energy source powers evaporation across global oceans?", options: ["Solar energy from the sun", "Deep underground volcanic vents", "Wind turbines along coastal plains"], answer: "Solar energy from the sun" },
      { id: 2, question_en: "Which sequence connector describes what happens after water vapor ascends into the atmosphere?", options: ["Subsequently, it condenses into clouds", "Prior to this, it was snow", "Never, it stays in the ocean"], answer: "Subsequently, it condenses into clouds" },
      { id: 3, question_en: "Where does precipitation flow during the collection stage?", options: ["Back into rivers, lakes, oceans, and groundwater aquifers", "Directly into deep outer space", "Into sealed metal tanks only"], answer: "Back into rivers, lakes, oceans, and groundwater aquifers" }
    ],
    critical_thinking: {
      question_en: "Why is the water cycle considered a closed system, and how does human activity affect groundwater collection?",
      hint_en: "Think about how Earth does not gain new water from space, so polluting rivers harms drinking water reserves."
    }
  },
  shadowing_sentences: [
    { id: 1, text: "Solar heat warms the ocean, driving continuous evaporation into the air.", en: "Solar heat warms the ocean, driving continuous evaporation into the air.", vi: "Nhiệt mặt trời sưởi ấm đại dương, thúc đẩy sự bốc hơi liên tục vào không khí.", ipa: "/ˈsoʊlər hiːt wɔːrmz ði ˈoʊʃən ˈdraɪvɪŋ kənˈtɪnjuəs ɪˌvæpəˈreɪʃən ˈɪntuː ði er/", words: ["Solar", "heat", "warms", "the", "ocean", "driving", "continuous", "evaporation", "into", "the", "air"] },
    { id: 2, text: "Forest trees also release valuable moisture through plant transpiration.", en: "Forest trees also release valuable moisture through plant transpiration.", vi: "Cây rừng cũng giải phóng hơi ẩm quý giá thông qua sự thoát hơi nước.", ipa: "/ˈfɔːrɪst triːz ˈɔːlsoʊ rɪˈliːs ˈvæljuəbəl ˈmɔɪstʃər θruː plænt ˌtrænspɪˈreɪʃən/", words: ["Forest", "trees", "also", "release", "valuable", "moisture", "through", "plant", "transpiration"] },
    { id: 3, text: "Subsequently, warm vapor ascends toward the cooler upper atmosphere.", en: "Subsequently, warm vapor ascends toward the cooler upper atmosphere.", vi: "Sau đó, hơi nước ấm bốc lên hướng về tầng khí quyển mát mẻ bên trên.", ipa: "/ˈsʌbsɪkwəntli wɔːrm ˈveɪpər əˈsendz təˈwɔːrd ðə ˈkuːlər ˈʌpər ˈætməsfɪər/", words: ["Subsequently", "warm", "vapor", "ascends", "toward", "the", "cooler", "upper", "atmosphere"] },
    { id: 4, text: "Cooling air causes condensation, forming billions of tiny cloud droplets.", en: "Cooling air causes condensation, forming billions of tiny cloud droplets.", vi: "Không khí mát mẻ gây ra sự ngưng tụ, tạo thành hàng tỷ giọt mây nhỏ xíu.", ipa: "/ˈkuːlɪŋ er ˈkɔːzɪz ˌkɑːndenˈseɪʃən ˈfɔːrmɪŋ ˈbɪljənz əv ˈtaɪni klaʊd ˈdrɑːpləts/", words: ["Cooling", "air", "causes", "condensation", "forming", "billions", "of", "tiny", "cloud", "droplets"] },
    { id: 5, text: "Following this cooling process, heavy clouds produce mountain precipitation.", en: "Following this cooling process, heavy clouds produce mountain precipitation.", vi: "Tiếp nối quá trình làm mát này, những đám mây nặng trĩu tạo ra mưa trên núi.", ipa: "/ˈfɑːloʊɪŋ ðɪs ˈkuːlɪŋ ˈprɑːses ˈhevi klaʊdz prəˈduːs ˈmaʊntn prɪˌsɪpɪˈteɪʃən/", words: ["Following", "this", "cooling", "process", "heavy", "clouds", "produce", "mountain", "precipitation"] },
    { id: 6, text: "Rainwater soaks into fertile soil to replenish precious groundwater.", en: "Rainwater soaks into fertile soil to replenish precious groundwater.", vi: "Nước mưa thấm vào đất màu mỡ để bổ sung nguồn nước ngầm quý giá.", ipa: "/ˈreɪnwɔːtər soʊks ˈɪntuː ˈfɜːrtl sɔɪl tuː rɪˈplenɪʃ ˈpreʃəs ˈɡraʊndwɔːtər/", words: ["Rainwater", "soaks", "into", "fertile", "soil", "to", "replenish", "precious", "groundwater"] },
    { id: 7, text: "Eventually, mountain streams carry collected water into the valley reservoir.", en: "Eventually, mountain streams carry collected water into the valley reservoir.", vi: "Cuối cùng, các dòng suối núi dẫn nước thu gom được vào hồ chứa thung lũng.", ipa: "/ɪˈventʃuəli ˈmaʊntn striːmz ˈkæri kəˈlektɪd ˈwɔːtər ˈɪntuː ðə ˈvæli ˈrezərvwɑːr/", words: ["Eventually", "mountain", "streams", "carry", "collected", "water", "into", "the", "valley", "reservoir"] },
    { id: 8, text: "This perpetual cycle ensures that freshwater circulates around the globe.", en: "This perpetual cycle ensures that freshwater circulates around the globe.", vi: "Chu trình bất tận này đảm bảo rằng nước ngọt luôn luân chuyển quanh địa cầu.", ipa: "/ðɪs pərˈpetʃuəl ˈsaɪkəl ɪnˈʃʊrz ðæt ˈfreʃwɔːtər ˈsɜːrkjəleɪts əˈraʊnd ðə ɡloʊb/", words: ["This", "perpetual", "cycle", "ensures", "that", "freshwater", "circulates", "around", "the", "globe"] }
  ],
  story_scenes: [
    { id: 1, scene_id: "scene_1", scene_number: 1, title_en: "Mount Jade Weather Station", title_vi: "Trạm Khí Tượng Núi Ngọc", description_en: "Dr. Aris and Maya inspect the solar evaporation pan at the mountain weather observatory.", description: "Dr. Aris and Maya inspect the solar evaporation pan at the mountain weather observatory.", image_url: "/images/week73/webtoon_scene_1.png", audio_url: "/audio/week73/scene_1.mp3" },
    { id: 2, scene_id: "scene_2", scene_number: 2, title_en: "Ascending Moisture Over Valley", title_vi: "Hơi Nước Bốc Lên Trên Thung Lũng", description_en: "Sensors detect warm water vapor ascending from the forest canopy into cool morning air.", description: "Sensors detect warm water vapor ascending from the forest canopy into cool morning air.", image_url: "/images/week73/webtoon_scene_2.png", audio_url: "/audio/week73/scene_2.mp3" },
    { id: 3, scene_id: "scene_3", scene_number: 3, title_en: "Dense Cloud Condensation", title_vi: "Sự Ngưng Tụ Mây Dày Đặc", description_en: "Microscopic droplets gather into thick rain clouds over the rugged granite peaks.", description: "Microscopic droplets gather into thick rain clouds over the rugged granite peaks.", image_url: "/images/week73/webtoon_scene_3.png", audio_url: "/audio/week73/scene_3.mp3" },
    { id: 4, scene_id: "scene_4", scene_number: 4, title_en: "Torrential Mountain Precipitation", title_vi: "Cơn Mưa Rào Xối Xả Vùng Núi", description_en: "Heavy raindrops fall across the pine forests, saturating the rocky mountain slope.", description: "Heavy raindrops fall across the pine forests, saturating the rocky mountain slope.", image_url: "/images/week73/webtoon_scene_4.png", audio_url: "/audio/week73/scene_4.mp3" },
    { id: 5, scene_id: "scene_5", scene_number: 5, title_en: "Collection at the Valley Dam", title_vi: "Tụ Nước Tại Đập Hồ Chứa Thung Lũng", description_en: "Maya monitors the surging freshwater level flowing into the main valley reservoir.", description: "Maya monitors the surging freshwater level flowing into the main valley reservoir.", image_url: "/images/week73/webtoon_scene_5.png", audio_url: "/audio/week73/scene_5.mp3" }
  ],
  writing_data: {
    title: "Explaining the Stages of the Water Cycle",
    prompt_en: "Look at the four panels. Write an expository paragraph explaining the stages of the water cycle using sequence connectors such as 'first', 'subsequently', 'following this', and 'eventually'. Write 20 or more words.",
    prompt_vi: "Nhìn vào 4 khung tranh. Viết một đoạn văn giải thích các giai đoạn của vòng tuần hoàn nước sử dụng từ nối trình tự ('first', 'subsequently', 'following this', 'eventually'). Viết từ 20 từ trở lên.",
    min_sentences: 3,
    min_words: 20,
    max_words: 90,
    model_sentence: "First, solar heat causes liquid water to evaporate from rivers and oceans. Subsequently, this invisible vapor ascends into the cool atmosphere and condenses into dense clouds. Following this condensation process, clouds release heavy precipitation over mountain forests. Eventually, runoff collects in reservoirs and groundwater aquifers, sustaining Earth's water cycle.",
    word_bank: ["evaporation", "vapor", "condensation", "precipitation", "reservoir", "groundwater", "ascend", "cycle", "droplet", "collection"],
    sentence_frames: [
      "First, solar heat turns liquid water into invisible ___.",
      "Subsequently, warm vapor rises into the atmosphere and causes ___.",
      "Following this stage, dense clouds release heavy ___ over the valley.",
      "Eventually, collected runoff fills the mountain ___."
    ],
    panels: [
      {
        panel_id: "panel_1",
        title_en: "Panel 1: Solar Evaporation",
        title_vi: "Khung 1: Bốc Hơi Do Nhiệt Mặt Trời",
        image_url: "/images/week73/writing_panel_1.png",
        image_prompt: "Bright sunshine heating a calm lake while arrows show invisible water vapor rising into the air.",
        caption: "First, sunlight heats surface water, transforming liquid into airborne vapor.",
        sentence_frame: "First, sunlight [heats surface water] to drive [rapid evaporation].",
        pills: ["heats surface water", "rapid evaporation", "warm sunny lake", "invisible vapor"],
        connectors: ["First,", "Initially,", "In the beginning,"]
      },
      {
        panel_id: "panel_2",
        title_en: "Panel 2: Cloud Condensation",
        title_vi: "Khung 2: Ngưng Tụ Tạo Mây",
        image_url: "/images/week73/writing_panel_2.png",
        image_prompt: "Rising vapor cooling in high altitudes and condensing into billowing cumulus clouds.",
        caption: "Subsequently, the rising vapor cools and condenses into clouds.",
        sentence_frame: "Subsequently, the rising vapor [cools in high altitudes] and [forms dense clouds].",
        pills: ["cools in high altitudes", "forms dense clouds", "tiny water droplets", "cool atmosphere"],
        connectors: ["Subsequently,", "Next,", "After that,"]
      },
      {
        panel_id: "panel_3",
        title_en: "Panel 3: Mountain Precipitation",
        title_vi: "Khung 3: Lượng Mưa Trên Núi",
        image_url: "/images/week73/writing_panel_3.png",
        image_prompt: "Heavy rain pouring from dark clouds over mountain slopes and tall pine trees.",
        caption: "Following this, heavy droplets fall to Earth as rainfall.",
        sentence_frame: "Following this process, heavy clouds [release abundant precipitation] over [mountain pine forests].",
        pills: ["release abundant precipitation", "mountain pine forests", "saturating the soil", "falling rain"],
        connectors: ["Following this,", "Later,", "Soon afterwards,"]
      },
      {
        panel_id: "panel_4",
        title_en: "Panel 4: Reservoir Collection",
        title_vi: "Khung 4: Thu Nước Vào Hồ Chứa",
        image_url: "/images/week73/writing_panel_4.png",
        image_prompt: "Crystal clear mountain river flowing into a large concrete dam and deep reservoir.",
        caption: "Eventually, collected water flows into reservoirs and replenishes aquifers.",
        sentence_frame: "Eventually, mountain runoff [flows into the valley reservoir] to [replenish groundwater].",
        pills: ["flows into the valley reservoir", "replenish groundwater", "completing the cycle", "freshwater collection"],
        connectors: ["Eventually,", "In the end,", "Finally,"]
      }
    ],
    ladder_stages: [
      {
        badge_label: "MODEL",
        title: "Stage 1: Solar Evaporation",
        image_url: "/images/week73/writing_panel_1.png",
        caption: "First, sunlight heats surface water, transforming liquid into airborne vapor.",
        frame_L1: "First, solar heat warms the valley lake. Liquid water transforms into invisible vapor.",
        connectors: ["First,", "Initially,", "To begin with,"],
        sentence_hint: "Write 2 sentences explaining how heat triggers evaporation.",
        ordered_chips: ["First, solar heat", "transforms lake water", "into rising vapor", "through evaporation."],
        pills: ["solar heat", "transforms lake water", "rising vapor", "evaporation"],
        sentence_frame: "First, solar heat [warms the valley lake] to [produce rising vapor]."
      },
      {
        badge_label: "BUILD",
        title: "Stage 2: Cloud Condensation",
        image_url: "/images/week73/writing_panel_2.png",
        caption: "Subsequently, the rising vapor cools and condenses into clouds.",
        frame_L1: "Subsequently, vapor ascends high into the atmosphere. Cooling temperatures form thick clouds.",
        connectors: ["Subsequently,", "Next,", "Following this,"],
        sentence_hint: "Write 2 sentences describing condensation in the cool sky.",
        pills: ["vapor ascends", "cool atmosphere", "tiny droplets", "condenses into clouds"],
        sentence_frame: "Subsequently, warm vapor [ascends into the cool air] and [condenses into clouds]."
      },
      {
        badge_label: "WRITE",
        title: "Stage 3: Precipitation Falls",
        image_url: "/images/week73/writing_panel_3.png",
        caption: "Following this, heavy droplets fall to Earth as rainfall.",
        frame_L1: "Following this stage, dark clouds produce heavy precipitation. Rain soaks the mountain forest.",
        connectors: ["Following this,", "Afterwards,", "Then,"],
        sentence_hint: "Write 2 sentences about rain falling on the mountains.",
        pills: ["heavy precipitation", "soaks the soil", "mountain slope", "rainwater falls"],
        sentence_frame: "Following this stage, clouds [produce heavy precipitation] that [soaks mountain slopes]."
      },
      {
        badge_label: "EXPAND",
        title: "Stage 4: Collection and Storage",
        image_url: "/images/week73/writing_panel_4.png",
        caption: "Eventually, collected water flows into reservoirs and replenishes aquifers.",
        frame_L1: "Eventually, rushing streams gather into the valley reservoir. Clean groundwater ensures life continues.",
        connectors: ["Eventually,", "In the end,", "Finally,"],
        sentence_hint: "Write 2 sentences summarizing runoff collection and the water cycle.",
        pills: ["valley reservoir", "replenishes aquifers", "continuous cycle", "freshwater collection"],
        sentence_frame: "Eventually, mountain streams [flow into the reservoir] and [replenish groundwater]."
      }
    ]
  },
  speaking_data: {
    talkshow_prompt: {
      topic: "The Importance of the Global Water Cycle",
      question: "Dr. Aris, how do advanced sequence connectors help us explain the continuous movement of water?",
      model_response: "Sequence connectors like 'subsequently' and 'eventually' allow scientists to explain each transition clearly! First, solar energy drives evaporation over lakes. Subsequently, cooling temperatures in the upper atmosphere trigger condensation. Following this stage, precipitation replenishes rivers and groundwater reserves. Without these connected steps, freshwater could not circulate to sustain life on Earth!"
    },
    info_exchange_cards: {
      table_a: {
        title: "Maya's Mountain Stream Project",
        subtitle: "Candidate's Question Card (Ask Examiner)",
        person: "Maya",
        fields: [
          { id: "field_a1", cue_prompt: "where / measure water volume?", cue_word: "where", is_missing: true, acceptable_questions: ["Where does Maya measure the water volume?", "Where is the water measured?", "Where does she test the stream?"], nova_reply: "Maya measures water volume at the Jade Creek gauging station." },
          { id: "field_a2", cue_prompt: "how much / rainfall recorded yesterday?", cue_word: "how much", is_missing: true, acceptable_questions: ["How much rainfall was recorded yesterday?", "How much rain fell yesterday?", "What was yesterday's rainfall measurement?"], nova_reply: "The rain gauge recorded forty-five millimeters of precipitation yesterday." },
          { id: "field_a3", cue_prompt: "what / instruments used for testing?", cue_word: "what", is_missing: true, acceptable_questions: ["What instruments are used for testing?", "What tools does she use?", "What equipment does Maya use?"], nova_reply: "She uses digital flow meters, water cylinders, and temperature sensors." },
          { id: "field_a4", cue_prompt: "who / manages the valley reservoir?", cue_word: "who", is_missing: true, acceptable_questions: ["Who manages the valley reservoir?", "Who is in charge of the reservoir?", "Who supervises the dam?"], nova_reply: "Chief Hydrologist Dr. Aris manages the valley reservoir gates." },
          { id: "field_a5", cue_prompt: "why / monitoring groundwater important?", cue_word: "why", is_missing: true, acceptable_questions: ["Why is monitoring groundwater important?", "Why do they check groundwater?", "Why monitor underground water?"], nova_reply: "Because local farms rely on groundwater during dry summer periods." }
        ]
      },
      table_b: {
        title: "Dr. Aris's Cloud Observation Lab",
        subtitle: "Information Card (Answer Examiner's Questions)",
        person: "Dr. Aris",
        fields: [
          { id: "field_b1", cue_prompt: "where / cloud observation tower?", cue_word: "where", value: "On the highest granite ridge of Mount Jade.", nova_question: "Where is Dr. Aris's cloud observation tower located?", acceptable_answers: ["On the highest granite ridge of Mount Jade.", "On Mount Jade.", "On the highest granite ridge."] },
          { id: "field_b2", cue_prompt: "what / type of clouds observed?", cue_word: "what", value: "Dense rain clouds carrying mountain precipitation.", nova_question: "What type of clouds does the radar monitor today?", acceptable_answers: ["Dense rain clouds carrying mountain precipitation.", "Dense rain clouds.", "Rain clouds carrying precipitation."] },
          { id: "field_b3", cue_prompt: "how / measure atmospheric moisture?", cue_word: "how", value: "By launching automated weather balloons with humidity sensors.", nova_question: "How does the research team measure atmospheric moisture?", acceptable_answers: ["By launching automated weather balloons with humidity sensors.", "With weather balloons.", "Using humidity sensors on balloons."] },
          { id: "field_b4", cue_prompt: "who / analyzes the daily data?", cue_word: "who", value: "A dedicated team of university climate researchers.", nova_question: "Who analyzes the daily water cycle measurements?", acceptable_answers: ["A dedicated team of university climate researchers.", "University climate researchers.", "Climate researchers."] },
          { id: "field_b5", cue_prompt: "why / study evaporation rates?", cue_word: "why", value: "To predict reservoir water storage for the coming summer.", nova_question: "Why do scientists study regional evaporation rates?", acceptable_answers: ["To predict reservoir water storage for the coming summer.", "To predict reservoir storage.", "To plan water storage for summer."] }
        ]
      }
    }
  },
  cambridge_rw: {
    part1_definitions: [
      { id: 1, text: "The natural process where liquid water turns into invisible airborne vapor.", target: "evaporation" },
      { id: 2, text: "The stage where water vapor cools and turns into liquid cloud droplets.", target: "condensation" },
      { id: 3, text: "Rain, snow, or sleet that falls from heavy clouds to the ground.", target: "precipitation" },
      { id: 4, text: "The thick layer of air and gases that surrounds our planet.", target: "atmosphere" },
      { id: 5, text: "A large artificial lake constructed to store water for cities and farms.", target: "reservoir" }
    ],
    part2_dialogue: {
      title: "Maya & Dr. Aris Analyzing the Water Cycle",
      turns: [
        {
          id: 1,
          speaker: "Maya",
          prompt: "Dr. Aris, what happens first when the hot sun shines over the lake?",
          options: [
            "First, solar heat causes surface water to evaporate into the air.",
            "Yes, the lake turns into solid green stone.",
            "The clouds fall into the deep water."
          ],
          answer: "First, solar heat causes surface water to evaporate into the air."
        },
        {
          id: 2,
          speaker: "Maya",
          prompt: "What happens subsequently to all that rising water vapor?",
          options: [
            "Subsequently, it ascends into cooler air and condenses into clouds.",
            "It turns into dry sand immediately.",
            "It stays inside the soil forever."
          ],
          answer: "Subsequently, it ascends into cooler air and condenses into clouds."
        },
        {
          id: 3,
          speaker: "Maya",
          prompt: "Following condensation, why does precipitation begin to fall?",
          options: [
            "Because cloud droplets become too heavy to remain suspended in the air.",
            "Because the birds push the clouds down.",
            "No, it never rains in the mountains."
          ],
          answer: "Because cloud droplets become too heavy to remain suspended in the air."
        },
        {
          id: 4,
          speaker: "Maya",
          prompt: "Where does the fallen rainwater go during the collection stage?",
          options: [
            "It flows down mountain streams into our reservoir and groundwater.",
            "It disappears completely from the universe.",
            "It only stays on tree leaves."
          ],
          answer: "It flows down mountain streams into our reservoir and groundwater."
        },
        {
          id: 5,
          speaker: "Maya",
          prompt: "Shall we record the water volume in the reservoir right now?",
          options: [
            "Excellent idea! Let's check the digital gauge together.",
            "I prefer to bake a chocolate cake.",
            "The bicycle is very fast."
          ],
          answer: "Excellent idea! Let's check the digital gauge together."
        }
      ],
      exchanges: [
        { speaker: "Maya", text: "Dr. Aris, what happens first when the hot sun shines over the lake?" },
        { speaker: "Dr. Aris", text: "First, solar heat causes surface water to evaporate into the air." },
        { speaker: "Maya", text: "What happens subsequently to all that rising water vapor?" },
        { speaker: "Dr. Aris", text: "Subsequently, it ascends into cooler air and condenses into clouds." },
        { speaker: "Maya", text: "Following condensation, why does precipitation begin to fall?" },
        { speaker: "Dr. Aris", text: "Because cloud droplets become too heavy to remain suspended in the air." },
        { speaker: "Maya", text: "Where does the fallen rainwater go during the collection stage?" },
        { speaker: "Dr. Aris", text: "It flows down mountain streams into our reservoir and groundwater." },
        { speaker: "Maya", text: "Shall we record the water volume in the reservoir right now?" },
        { speaker: "Dr. Aris", text: "Excellent idea! Let's check the digital gauge together." }
      ]
    },
    part6_cloze: {
      title: "Maya's Science Journal: The Water Cycle",
      instructions: "Read the scientific journal and write the missing words. Write one word on each line.",
      text_template: "Water travels on an endless journey across [1]_____ planet. First, heat causes liquid water to [2]_____ into vapor. Subsequently, this vapor rises high into the sky [3]_____ forms dense clouds. When the clouds become heavy, water falls back [4]_____ precipitation. Eventually, the water collects in rivers and flows [5]_____ into the ocean.",
      answers: { "1": "our", "2": "evaporate", "3": "and", "4": "as", "5": "back" }
    }
  },
  minigames: {
    math_problems: [
      {
        id: "w73_p1",
        type: "part_whole",
        title: "Calculating Reservoir Water Volume in Cubic Units",
        question: "A water storage section at the Jade Creek Reservoir is built using cubic blocks. The lower level contains 120 cubic units of storage and the upper expansion adds 80 cubic units. What is the total volume in cubic units?",
        storyContext: "Dr. Aris calculates the total capacity of the concrete holding tank before the rainy season begins.",
        modelData: {
          bars: [
            { label: "Lower Section", value: 120, color: "#0ea5e9" },
            { label: "Upper Expansion", value: 80, color: "#38bdf8" }
          ],
          total: 200,
          unit: "cubic units"
        },
        target_answer: 200,
        unit: "cubic units",
        steps: [
          "Take the lower storage section: 120 cubic units.",
          "Add the upper expansion volume: 80 cubic units.",
          "120 + 80 = 200 cubic units in total capacity."
        ]
      },
      {
        id: "w73_p2",
        type: "comparison",
        title: "Comparing Precipitation in Two Valley Sectors",
        question: "Sector A collected 155 cubic meters of rainwater while Sector B collected 95 cubic meters. How many more cubic meters of water did Sector A collect than Sector B?",
        storyContext: "Maya compares rainfall collection across two valley monitoring stations.",
        modelData: {
          bars: [
            { label: "Sector A Collection", value: 155, color: "#0284c7" },
            { label: "Sector B Collection", value: 95, color: "#64748b" }
          ],
          difference: 60,
          unit: "cubic meters"
        },
        target_answer: 60,
        unit: "cubic meters",
        steps: [
          "Start with Sector A's collection: 155 cubic meters.",
          "Subtract Sector B's collection: 95 cubic meters.",
          "155 - 95 = 60 cubic meters difference."
        ]
      }
    ],
    action_lab_scenarios: [
      {
        stage: 1,
        title: "Evaporation & Transpiration Energy",
        diagram_type: "evaporation_chamber",
        instruction: "Select the correct atmospheric inputs that cause water to turn into vapor.",
        items: [
          { label: "Solar Thermal Energy", target: "heat_source" },
          { label: "Plant Stomata Release", target: "transpiration" },
          { label: "Rising Warm Vapor", target: "gas_phase" }
        ]
      },
      {
        stage: 2,
        title: "Condensation & Cloud Droplet Formation",
        diagram_type: "condensation_column",
        instruction: "Sequence the steps of cloud condensation in high altitudes.",
        items: [
          { label: "Warm Vapor Ascends", target: "step_1" },
          { label: "Cool Air Temperature", target: "step_2" },
          { label: "Droplets Combine into Clouds", target: "step_3" }
        ]
      },
      {
        stage: 3,
        title: "Runoff & Aquifer Collection",
        diagram_type: "basin_collection",
        instruction: "Route precipitation into surface reservoirs and subterranean groundwater.",
        items: [
          { label: "Surface River Inflow", target: "reservoir" },
          { label: "Soil Water Infiltration", target: "groundwater" },
          { label: "Evaporation Loop Reset", target: "cycle" }
        ]
      }
    ],
    grammar_drills: [
      { sentence: "The sun warms the lake; subsequently, water vapor ascends into the sky.", options: ["subsequently", "prior", "yesterday"], answer: "subsequently", explanation: "Use 'subsequently' as an advanced sequence connector to show what happens next." },
      { sentence: "Following this condensation stage, heavy clouds produce precipitation.", options: ["Following", "Followed", "Follows"], answer: "Following", explanation: "Use 'Following this [noun]' as a formal sequence transition phrase." },
      { sentence: "Eventually, mountain runoff collects in the valley reservoir.", options: ["Eventually", "Eventual", "Events"], answer: "Eventually", explanation: "Use the adverb 'Eventually' to introduce the final outcome of a process." },
      { sentence: "Millions of tiny droplets combine to form dense clouds.", options: ["droplets", "dropsy", "drop"], answer: "droplets", explanation: "The noun 'droplets' refers to microscopic spheres of condensed liquid." },
      { sentence: "The water cycle is a continuous process that circulates around the globe.", options: ["continuous", "continually", "continuation"], answer: "continuous", explanation: "Use the adjective 'continuous' before the noun 'process'." }
    ]
  }
};
