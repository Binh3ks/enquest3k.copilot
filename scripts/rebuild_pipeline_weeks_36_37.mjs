// Master Pipeline Matrix Rebuilder for Week 36 & Week 37
import fs from 'fs';
import path from 'path';

const root = process.cwd();

function ensureDir(d) {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
}

function shuffleOptionsAndAnswer(item) {
  const options = [...item.options];
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  return {
    ...item,
    options,
    answer: item.answer
  };
}

// ---------------------------------------------------------------------------
// DATA DEFINITION FOR WEEK 36 & WEEK 37
// ---------------------------------------------------------------------------

const WEEKS_FULL_DATA = {
  36: {
    weekId: 36,
    title_en: "The Secret Cave — Adventure & Exploration",
    title_vi: "Hang Động Bí Mật — Cuộc Phiêu Lưu & Khám Phá",
    grammar_title: "Past Continuous & Clauses of Purpose in Cave Adventures",
    grammar_focus: "While + WAS/WERE + V-ing, So that + Subject + could",
    
    // STEM Story (~160 words, 3-step STEM Problem-Solving Cycle)
    stem_title: "Leo and Mia's Hidden Cave Discovery",
    stem_content: `Early on a **sunny Saturday morning**, Leo and Mia went hiking in the **green pine forest**. While they were **walking along the rocky path**, they **discovered a hidden entrance** to a **mysterious cave**.

They **turned on their bright flashlights** and **stepped inside carefully**. Inside the cave, **cool drops of water** dripped from the **rocky ceiling**, and **dark grey shadows** danced on the walls.

Suddenly, Mia **spotted a dusty wooden box** tucked behind a large stone. They opened it gently and **found an ancient map** with a **shiny brass compass**.

Their **hearts beat fast** with excitement. They realized it was a **historical treasure map** left by old explorers. They **felt extremely excited** and **burst into laughter**, ready for their next big adventure.`,
    stem_vi: `Sáng **thứ Bảy nắng đẹp rực rỡ**, Leo và Mia đi bộ đường dài trong **rừng thông xanh**. Khi họ đang **đi dọc theo con đường đá**, họ **phát hiện ra một lối vào ẩn** dẫn đến **hang động bí mật**.

Họ **bật chiếc đèn pin sáng** và **cẩn thận bước vào trong**. Bên trong hang động, **những giọt nước mát lạnh** nhỏ xuống từ **trần đá**, và **bóng xám tối** nhảy múa trên tường.

Đột nhiên, Mia **phát hiện ra một chiếc hộp gỗ bám bụi** giấu sau một hòn đá lớn. Họ mở nó ra nhẹ nhàng và **tìm thấy một bản đồ cổ** cùng **la bàn đồng sáng bóng**.

**Tim họ đập nhanh** vì phấn khích. Họ nhận ra đó là **bản đồ kho báu lịch sử** do các nhà khám phá xưa để lại. Họ **cảm thấy cực kỳ hào hứng** và **bật cười vui vẻ**, sẵn sàng cho cuộc phiêu lưu lớn tiếp theo.`,

    // Social Studies (~155 words, 3-part History & Geography Framework)
    social_title: "Son Doong & World Subterranean Wonders",
    social_content: `Caves are extraordinary underground wonderlands formed over millions of years by acidic water slowly carving through solid limestone. Throughout history, ancient explorers used parchment maps and brass compasses to navigate these dark, uncharted subterranean passages. In Central Vietnam, **Son Doong Cave** in Phong Nha-Ke Bang National Park stands as the largest natural cave on Earth, spanning over nine kilometers in length and reaching heights of 200 meters. Inside Son Doong, scientists discovered a thriving **underground jungle** with tall trees, subterranean rivers, and unique animal species that live in total darkness. Protected as a UNESCO World Heritage Site, Son Doong reminds us of the critical importance of preserving delicate natural habitats and respecting Earth's geological treasures for future generations.`,
    social_vi: `Hang động là những vùng đất kỳ diệu dưới lòng đất được hình thành qua hàng triệu năm bởi nước axit từ từ khắc qua đá vôi cứng. Trong suốt lịch sử, các nhà khám phá cổ đại đã sử dụng bản đồ giấy da và la bàn đồng để định vị các lối đi ngầm tối đen chưa được khai phá. Ở Miền Trung Việt Nam, Hang Sơn Đoòng thuộc Vườn quốc gia Phong Nha-Kẻ Bàng là hang động tự nhiên lớn nhất trên Trái đất. Bên trong Sơn Đoòng, các nhà khoa học đã khám phá ra một khu rừng rậm dưới lòng đất phát triển mạnh mẽ với những cây cao, dòng sông ngầm và các loài động vật độc đáo sống trong bóng tối hoàn toàn. Được bảo tồn như một Di sản Thế giới UNESCO, Sơn Đoòng nhắc nhở chúng ta về tầm quan trọng cốt yếu của việc bảo vệ các sinh cảnh tự nhiên và tôn trọng kho báu địa chất của Trái đất.`,

    stem_questions: [
      { id: 1, question_en: "Where were Leo and Mia hiking on Saturday morning?", options: ["In the green pine forest", "On the sandy beach", "In the school garden", "Around the city center"], answer: "In the green pine forest" },
      { id: 2, question_en: "What did they discover while walking along the rocky path?", options: ["A hidden entrance to a mysterious cave", "A lost dog", "A small red bicycle", "A wooden bench"], answer: "A hidden entrance to a mysterious cave" },
      { id: 3, question_en: "What was inside the dusty wooden box?", options: ["An ancient map and a shiny brass compass", "Gold coins and diamonds", "Old books and letters", "A toy train"], answer: "An ancient map and a shiny brass compass" },
      { id: 4, question_en: "How did their hearts react to the discovery?", options: ["Their hearts beat fast with excitement", "They felt scared and ran home", "They went to sleep", "They cried loudly"], answer: "Their hearts beat fast with excitement" }
    ],

    social_questions: [
      { id: 1, question_en: "Which is the largest cave in the world?", options: ["Son Doong Cave in Vietnam", "Mammoth Cave in USA", "Blue Cave in Italy", "Waitomo Cave in New Zealand"], answer: "Son Doong Cave in Vietnam" },
      { id: 2, question_en: "What unique natural feature exists inside Son Doong Cave?", options: ["An underground jungle with trees and animals", "A floating city", "A giant ice castle", "A volcanic lake"], answer: "An underground jungle with trees and animals" },
      { id: 3, question_en: "How are most caves formed over long periods of time?", options: ["By moving acidic water over thousands of years", "By strong winds in one day", "By falling meteorites", "By heavy traffic"], answer: "By moving acidic water over thousands of years" },
      { id: 4, question_en: "Why should explorers protect ancient caves?", options: ["To preserve rare natural beauty and habitats", "To build shopping malls inside", "To leave trash behind", "To block natural water"], answer: "To preserve rare natural beauty and habitats" }
    ],

    // Explore Station (Global World Horizon Standard, ~155 words)
    explore: {
      title_en: "Subterranean World Wonders — Global Cave Exploration",
      title_vi: "Kỳ Quan Thế Giới Underground — Khám Phá Hang Động Toàn Cầu",
      content_en: "Deep beneath Earth's surface lie vast subterranean worlds formed by moving water over thousands of years. In Vietnam, **Son Doong Cave** features giant stalactites over 70 meters high and its own underground cloud weather system. In the United States, **Mammoth Cave** in Kentucky stretches over 680 kilometers, making it the longest recorded cave system in the world. Meanwhile, in Austria, the **Eisriesenwelt Ice Cave** holds giant frozen ice palaces inside limestone cliffs. In New Zealand, the **Waitomo Glowworm Caves** sparkle with thousands of tiny bioluminescent creatures hanging from rocky ceilings. Exploring these natural wonders teaches scientists about Earth's ancient climate, underground ecosystems, and the importance of global conservation.",
      content_vi: "Sâu dưới bề mặt Trái đất là những thế giới dưới lòng đất bao la được tạo thành bởi nước chảy qua hàng ngàn năm. Tại Việt Nam, Hang Sơn Đoòng có những khối nhũ đá khổng lồ cao hơn 70 mét và hệ thống thời tiết mây mù riêng dưới lòng đất. Tại Hoa Kỳ, Hang Mammoth ở Kentucky trải dài hơn 680 km, trở thành hệ thống hang động dài nhất thế giới. Trong khi đó, tại Áo, Hang Băng Eisriesenwelt sở hữu những cung điện băng giá khổng lồ bên trong các vách đá vôi. Tại New Zealand, Hang Động Đom Đóm Waitomo lấp lánh với hàng ngàn sinh vật phát quang sinh học nhỏ bé treo trên trần đá. Việc khám phá những kỳ quan thiên nhiên này dạy các nhà khoa học về khí hậu cổ đại của Trái đất, hệ sinh thái dưới lòng đất và tầm quan trọng của việc bảo tồn toàn cầu.",
      questions: [
        { id: 1, question_en: "Which cave in the United States is the longest recorded cave system in the world?", options: ["Mammoth Cave in Kentucky", "Son Doong Cave in Vietnam", "Waitomo Caves in New Zealand", "Eisriesenwelt Cave in Austria"], answer: "Mammoth Cave in Kentucky" },
        { id: 2, question_en: "What creates the sparkling light on the ceiling of Waitomo Caves in New Zealand?", options: ["Bioluminescent glowworms", "Electric lanterns", "Gold coins", "Reflecting ice crystals"], answer: "Bioluminescent glowworms" },
        { id: 3, question_en: "What unique natural feature is found inside Austria's Eisriesenwelt Cave?", options: ["Giant frozen ice palaces", "Tropical palm trees", "Active volcanoes", "Hot desert sand"], answer: "Giant frozen ice palaces" },
        { id: 4, question_en: "Why do scientists explore subterranean cave systems around the world?", options: ["To study Earth's climate and preserve underground habitats", "To mine for modern plastic", "To build fast subway trains", "To burn ancient trees"], answer: "To study Earth's climate and preserve underground habitats" }
      ],
      question: {
        text_en: "If you could explore one famous underground cave system in the world, which one would you choose and why?",
        text_vi: "Nếu bạn có thể khám phá một hệ thống hang động nổi tiếng dưới lòng đất trên thế giới, bạn sẽ chọn hang động nào và tại sao?",
        min_words: 25,
        hint_en: "I would like to explore Son Doong Cave because it has a hidden underground jungle and giant stalactites...",
        hint_vi: "Tôi muốn khám phá Hang Sơn Đoòng vì nó có rừng rậm ẩn dưới lòng đất và những khối nhũ đá khổng lồ..."
      }
    },

    // Logic Lab (3 Tabs x 5 DISTINCT Questions = 15 Questions)
    logic_lab: {
      logic_science: {
        title: "Cave Science & Geology Lab — Week 36",
        questions: [
          { id: 1, question_en: "How does acidic rainwater form stalactites over thousands of years?", options: ["By dissolving limestone rock and depositing minerals drop by drop", "By melting winter ice crystals", "By blowing desert sand", "By heating volcanic lava"], answer: "By dissolving limestone rock and depositing minerals drop by drop" },
          { id: 2, question_en: "If a stalactite grows at a rate of 0.1 mm per year, how long will it take to grow 10 mm?", options: ["100 years", "10 years", "50 years", "500 years"], answer: "100 years" },
          { id: 3, question_en: "Why is a brass magnetic compass effective inside a deep limestone cave?", options: ["Because Earth's magnetic field penetrates rock, guiding north", "Because brass shines in the dark", "Because limestone turns into gold", "Because water attracts magnets"], answer: "Because Earth's magnetic field penetrates rock, guiding north" },
          { id: 4, question_en: "What is the main source of light and energy for ecosystems in total darkness?", options: ["Chemosynthesis and organic matter carried by rivers", "Direct sunlight from solar panels", "Electric lightning strikes", "Moonlight through thick soil"], answer: "Chemosynthesis and organic matter carried by rivers" },
          { id: 5, question_en: "Why is flashlight brightness measured in lumens important for explorers?", options: ["It provides clear visibility to navigate safely past sharp rocks", "It heats up cold cave air", "It creates loud echo sounds", "It changes rock colors"], answer: "It provides clear visibility to navigate safely past sharp rocks" }
        ]
      },
      singapore_math: {
        title: "Singapore Bar Models — Cave Distance & Time — Week 36",
        problems: [
          { id: 1, text: "Explorers walked inside a cave tunnel at a speed of 40 meters per minute. If they walked for 12 minutes, how far did they travel?", answer: "480 meters", svg_url: "/images/week36/barmodel_w36_adv_p1.svg" },
          { id: 2, text: "A stalactite grew 2 millimeters every 10 years. How many millimeters will it grow in 200 years?", answer: "40 millimeters", svg_url: "/images/week36/barmodel_w36_adv_p2.svg" },
          { id: 3, text: "Mia has 4 batteries for her flashlight. Each battery lasts for 3 hours. How many total hours of light can she get?", answer: "12 hours", svg_url: "/images/week36/barmodel_w36_adv_p3.svg" },
          { id: 4, text: "On a parchment map, 1 centimeter represents 50 meters in real life. If the cave trail measures 6 centimeters on the map, what is the actual distance?", answer: "300 meters", svg_url: "/images/week36/barmodel_w36_adv_p4.svg" },
          { id: 5, text: "Outside the cave, the temperature was 28°C. Deep inside the cave, it was 16°C. What was the temperature difference?", answer: "12°C", svg_url: "/images/week36/barmodel_w36_adv_p5.svg" }
        ]
      },
      social_quiz: {
        title: "Global Cave History & Conservation — Week 36",
        questions: [
          { id: 1, question_en: "In what year was Son Doong Cave first discovered by local man Ho Khanh?", options: ["1991", "2009", "1975", "2020"], answer: "1991" },
          { id: 2, question_en: "Which international organization protects Phong Nha-Ke Bang National Park?", options: ["UNESCO World Heritage", "UNICEF", "WHO", "WWF"], answer: "UNESCO World Heritage" },
          { id: 3, question_en: "Which country is home to Mammoth Cave, the longest recorded cave system?", options: ["United States", "Vietnam", "Australia", "Canada"], answer: "United States" },
          { id: 4, question_en: "What bioluminescent animal lives inside the Waitomo Caves in New Zealand?", options: ["Glowworms", "Fireflies", "Jellyfish", "Bats"], answer: "Glowworms" },
          { id: 5, question_en: "Why must visitors follow strict eco-rules when entering delicate caves?", options: ["To prevent damage to ancient stalactites and wildlife", "To speed up walking time", "To make loud echoes", "To leave trash behind"], answer: "To prevent damage to ancient stalactites and wildlife" }
        ]
      }
    },

    // Mindmap Speaking (6 Stems x 6 Branch Labels = 36 Branches)
    mindmap: {
      centerStems: [
        { id: "stem_1", label: "Beginning Scene: Forest Hike", icon: "🌲" },
        { id: "stem_2", label: "Problem: Hidden Entrance", icon: "⛰️" },
        { id: "stem_3", label: "Science Tool: Flashlights", icon: "🔦" },
        { id: "stem_4", label: "Discovery: Wooden Box", icon: "📦" },
        { id: "stem_5", label: "Artifact: Brass Compass", icon: "🧭" },
        { id: "stem_6", label: "Reaction: Joyful Laughter", icon: "😄" }
      ],
      branchLabels: {
        stem_1: [
          { id: "b1_1", label: "hiked in green pine forest" },
          { id: "b1_2", label: "on a sunny Saturday morning" },
          { id: "b1_3", label: "followed the rocky path" },
          { id: "b1_4", label: "heard singing birds" },
          { id: "b1_5", label: "saw tall green trees" },
          { id: "b1_6", label: "enjoyed fresh mountain air" }
        ],
        stem_2: [
          { id: "b2_1", label: "spotted a small opening" },
          { id: "b2_2", label: "hidden behind large rock" },
          { id: "b2_3", label: "felt a cool air breeze" },
          { id: "b2_4", label: "saw dark grey shadows" },
          { id: "b2_5", label: "stepped inside carefully" },
          { id: "b2_6", label: "held hands tightly" }
        ],
        stem_3: [
          { id: "b3_1", label: "turned on bright lights" },
          { id: "b3_2", label: "illuminated rocky ceiling" },
          { id: "b3_3", label: "saw dripping water drops" },
          { id: "b3_4", label: "lit up cavern walls" },
          { id: "b3_5", label: "guided every step safely" },
          { id: "b3_6", label: "kept path clearly visible" }
        ],
        stem_4: [
          { id: "b4_1", label: "found ancient wooden chest" },
          { id: "b4_2", label: "covered with thick dust" },
          { id: "b4_3", label: "unlocked old metal latch" },
          { id: "b4_4", label: "opened lid very gently" },
          { id: "b4_5", label: "looked inside together" },
          { id: "b4_6", label: "shined light below" }
        ],
        stem_5: [
          { id: "b5_1", label: "pulled out brass compass" },
          { id: "b5_2", label: "unfolded parchment map" },
          { id: "b5_3", label: "pointed magnetic north" },
          { id: "b5_4", label: "showed secret trail routes" },
          { id: "b5_5", label: "marked historical path" },
          { id: "b5_6", label: "guided explorers out" }
        ],
        stem_6: [
          { id: "b6_1", label: "felt extremely excited" },
          { id: "b6_2", label: "burst into cheerful laughter" },
          { id: "b6_3", label: "smiled with great joy" },
          { id: "b6_4", label: "celebrated safe journey" },
          { id: "b6_5", label: "shared secret adventure" },
          { id: "b6_6", label: "planned next exploration" }
        ]
      }
    },

    // Ask AI (5 Prompts)
    ask_ai: [
      {
        id: 1,
        title_en: "Situation 1: Cave Stalactite Science",
        context_en: "Ask Nova how acidic water forms stalactites over thousands of years.",
        context_vi: "Hỏi Nova cách nước axit tạo thành nhũ đá qua hàng ngàn năm.",
        sample_question_en: "How does water form stalactites inside limestone caves over time?",
        sample_question_vi: "Nước tạo thành nhũ đá trong hang đá vôi theo thời gian như thế nào?",
        answer: "How does water form stalactites inside limestone caves over time?",
        word_bank: ["How", "does", "water", "form", "stalactites", "inside", "caves"]
      },
      {
        id: 2,
        title_en: "Situation 2: Magnetic Compass Navigation",
        context_en: "Ask Nova why a brass compass always points toward Earth's magnetic north.",
        context_vi: "Hỏi Nova tại sao la bàn đồng luôn chỉ về hướng Bắc từ tính.",
        sample_question_en: "Why does a magnetic compass always point toward Earth's north pole?",
        sample_question_vi: "Tại sao la bàn từ tính luôn chỉ về cực Bắc của Trái đất?",
        answer: "Why does a magnetic compass always point toward Earth's north pole?",
        word_bank: ["Why", "does", "a", "compass", "point", "north"]
      },
      {
        id: 3,
        title_en: "Situation 3: Son Doong Underground Jungle",
        context_en: "Ask Nova about the unique weather and jungle inside Vietnam's Son Doong Cave.",
        context_vi: "Hỏi Nova về thời tiết và rừng rậm độc đáo bên trong Hang Sơn Đoòng.",
        sample_question_en: "What unique natural features exist inside Son Doong Cave in Vietnam?",
        sample_question_vi: "Những đặc điểm tự nhiên độc đáo nào tồn tại bên trong Hang Sơn Đoòng?",
        answer: "What unique natural features exist inside Son Doong Cave in Vietnam?",
        word_bank: ["What", "features", "exist", "inside", "Son Doong", "Cave"]
      },
      {
        id: 4,
        title_en: "Situation 4: Historical Explorer Maps",
        context_en: "Ask Nova how ancient explorers drew parchment maps before GPS existed.",
        context_vi: "Hỏi Nova cách các nhà khám phá cổ đại vẽ bản đồ giấy da trước khi có GPS.",
        sample_question_en: "How did historical explorers create detailed parchment maps long ago?",
        sample_question_vi: "Các nhà khám phá lịch sử đã tạo ra bản đồ giấy da chi tiết như thế nào ngày xưa?",
        answer: "How did historical explorers create detailed parchment maps long ago?",
        word_bank: ["How", "did", "explorers", "create", "parchment", "maps"]
      },
      {
        id: 5,
        title_en: "Situation 5: Wilderness Safety Rules",
        context_en: "Ask Nova what safety gear kids should prepare for a forest hike.",
        context_vi: "Hỏi Nova những thiết bị an toàn trẻ em nên chuẩn bị khi đi bộ trong rừng.",
        sample_question_en: "What safety equipment should explorers bring when hiking in forests?",
        sample_question_vi: "Nhà khám phá nên mang theo thiết bị an toàn nào khi đi bộ đường dài trong rừng?",
        answer: "What safety equipment should explorers bring when hiking in forests?",
        word_bank: ["What", "safety", "equipment", "should", "explorers", "bring"]
      }
    ],

    // Shadowing (10 Sentences)
    shadowing: [
      { id: 1, text: "Early on a sunny Saturday morning, Leo and Mia went hiking in the pine forest.", start_time: 0, end_time: 4 },
      { id: 2, text: "While they were walking along the rocky path, they discovered a hidden entrance.", start_time: 4, end_time: 9 },
      { id: 3, text: "They turned on their bright flashlights and stepped inside the mysterious cave.", start_time: 9, end_time: 14 },
      { id: 4, text: "Cool drops of water dripped silently from the rocky ceiling above.", start_time: 14, end_time: 18 },
      { id: 5, text: "Dark grey shadows danced on the stone walls as they walked forward.", start_time: 18, end_time: 23 },
      { id: 6, text: "Mia spotted a dusty wooden box tucked carefully behind a large stone.", start_time: 23, end_time: 28 },
      { id: 7, text: "They opened the heavy lid gently and found an ancient parchment map.", start_time: 28, end_time: 33 },
      { id: 8, text: "A shiny brass compass lay next to the map pointing strictly to the north.", start_time: 33, end_time: 38 },
      { id: 9, text: "Their hearts beat fast with excitement as they realized it was a treasure map.", start_time: 38, end_time: 43 },
      { id: 10, text: "They felt extremely excited and burst into cheerful laughter together.", start_time: 43, end_time: 48 }
    ],

    // AI Tutor V28 Format (2 Cards Spark Talk)
    real: {
      weekId: 36,
      title: "The Secret Cave — Adventure & Exploration",
      title_vi: "Hang Động Bí Mật — Cuộc Phiêu Lưu & Khám Phá",
      spark_talk: [
        { id: 1, topic_en: "What safety equipment did Leo and Mia bring to explore the cave?", topic_vi: "Leo và Mia mang thiết bị an toàn nào để khám phá hang động?" },
        { id: 2, topic_en: "How does a brass compass help explorers find their way in the dark?", topic_vi: "La bàn đồng giúp nhà khám phá tìm đường trong bóng tối như thế nào?" }
      ],
      story_missions: [
        { id: 1, title: "Mission 1: Retell STEM Story", prompt: "Retell how Leo and Mia used flashlights and a brass compass to explore the secret cave." },
        { id: 2, title: "Mission 2: Retell Social Story", prompt: "Explain the global importance of Vietnam's Son Doong Cave and World Heritage conservation." },
        { id: 3, title: "Mission 3: Personal Connection", prompt: "Share an outdoor hiking or nature trip experience you had with your friends or family." }
      ]
    }
  },

  37: {
    weekId: 37,
    title_en: "The Sports Day Challenge — Teamwork & Speed",
    title_vi: "Ngày Hội Thể Thao — Tinh Thần Đồng Đội & Tốc Độ",
    grammar_title: "Past Continuous & Comparative Adverbs in Sports",
    grammar_focus: "While + WAS/WERE + V-ing, Comparative Adverbs (faster/more smoothly)",
    
    // STEM Story (~160 words, 3-step STEM Problem-Solving Cycle)
    stem_title: "The 4x100m Relay Handoff Victory",
    stem_content: `On a **sunny Saturday morning**, the **annual Sports Day** took place. The **crowded sports stadium** was filled with the **cheering of students and parents**.

Leo and his team were in the **final 4x100m relay race**. The **first runner was sprinting fast** down the track. Leo **prepared carefully** for the baton exchange.

When his teammate reached the zone, Leo **passed the baton cleanly** and **accelerated smoothly on the track**. He **ran as fast as the wind** toward the finish line.

Leo **crossed the finish line first** and **smiled happily**. The crowd **erupted into cheers**. The team **received shiny gold medals** and **felt extremely proud** of their **scientific teamwork**.`,
    stem_vi: `Sáng **thứ Bảy nắng đẹp rực rỡ**, **Ngày Hội Thể Thao hàng năm** đã diễn ra. **Sân vận động thể thao đông đúc** ngập tràn **tiếng reo hò của học sinh và phụ huynh**.

Leo và đội của mình tham gia **trận chung kết tiếp sức 4x100m**. **Vận động viên đầu tiên đang chạy nước rút nhanh** trên đường chạy. Leo **chuẩn bị cẩn thận** cho màn trao gậy.

Khi đồng đội đến khu vực giao gậy, Leo **trao gậy tiếp sức mượt mà** và **tăng tốc êm ái trên đường chạy**. Chú **chạy nhanh như gió** về phía vạch đích.

Leo **cán đích đầu tiên** và **mỉm cười hạnh phúc**. Đám đông **bật lên tiếng reo hò**. Cả đội **nhận được những tấm huy chương vàng sáng bóng** và **cảm thấy cực kỳ tự hào** về **tinh thần đồng đội khoa học**.`,

    // Social Studies (~155 words, 3-part History & Geography Framework)
    social_title: "The Olympic Truce & World Relays",
    social_content: `Relay races have a rich global history originating from ancient messenger runners who carried urgent news and lighted torches across Greek city-states. During the ancient Olympic Games, Greeks established the **Olympic Truce (*Ekecheiria*)**, a historic peace agreement where all conflict ceased so athletes and spectators could travel safely. In the modern era, more than 200 nations gather peacefully every four years at the Olympic Games to celebrate human achievement, stamina, and international unity. Global relay events demonstrate that individual athletic speed is meaningless without synchronized teamwork and mutual respect. By passing the baton smoothly from one generation to the next, athletes across the world inspire young people to practice fair play, cultural diversity, and lifelong friendship.`,
    social_vi: `Chạy tiếp sức có lịch sử toàn cầu phong phú bắt nguồn từ những người đưa tin cổ đại mang tin tức cấp báo và ngọn đuốc thắp sáng qua các thành phố Hy Lạp. Trong Thế vận hội Olympic cổ đại, người Hy Lạp đã thiết lập Thỏa thuận Ngừng bắn Olympic (Ekecheiria), một hòa ước lịch sử nơi mọi xung đột chấm dứt để các vận động viên và khán giả đi lại an toàn. Trong thời kỳ hiện đại, hơn 200 quốc gia tập hợp hòa bình bốn năm một lần tại Thế vận hội Olympic để tôn vinh thành tựu, sức bền và sự đoàn kết quốc tế của con người. Các sự kiện tiếp sức toàn cầu chứng minh rằng tốc độ cá nhân sẽ không có ý nghĩa nếu không có sự phối hợp đồng đội và sự tôn trọng lẫn nhau. Bằng cách trao gậy tiếp sức mượt mà từ thế hệ này sang thế hệ khác, các vận động viên trên thế giới truyền cảm hứng cho người trẻ thực hành chơi đẹp, đa dạng văn hóa và tình bạn vĩnh cửu.`,

    stem_questions: [
      { id: 1, question_en: "What event took place on Saturday morning?", options: ["Annual Sports Day", "School Science Fair", "Music Concert", "Art Exhibition"], answer: "Annual Sports Day" },
      { id: 2, question_en: "What was the crowded sports stadium filled with?", options: ["Cheering students and parents", "Empty wooden chairs", "Rain drops", "Flying birds"], answer: "Cheering students and parents" },
      { id: 3, question_en: "How did Leo pass the baton to his teammate?", options: ["Passed the baton cleanly", "Dropped it on the grass", "Threw it far away", "Forgot the baton"], answer: "Passed the baton cleanly" },
      { id: 4, question_en: "What award did the relay team receive?", options: ["Shiny gold medals", "Paper certificates", "Silver cups", "Wooden trophies"], answer: "Shiny gold medals" }
    ],

    social_questions: [
      { id: 1, question_en: "How many nations compete in the Olympic Games?", options: ["Over 200 nations", "50 nations", "10 nations", "100 nations"], answer: "Over 200 nations" },
      { id: 2, question_en: "What main lesson do relay races teach athletes?", options: ["Working as one team leads to success", "Running alone is always better", "Winning is the only thing", "Speed does not matter"], answer: "Working as one team leads to success" },
      { id: 3, question_en: "What symbol represents peace during ancient Olympic Games?", options: ["The Olympic Truce Ekecheiria", "Golden crowns", "Red flags", "Bronze shields"], answer: "The Olympic Truce Ekecheiria" },
      { id: 4, question_en: "Why is passing the baton smoothly important in a relay?", options: ["It maintains running velocity and momentum", "It stops the race", "It slows down the team", "It confuses the judges"], answer: "It maintains running velocity and momentum" }
    ],

    // Explore Station (Global World Horizon Standard, ~155 words)
    explore: {
      title_en: "Global Running Cultures — From Kenya to the Olympic Torch",
      title_vi: "Văn Hóa Chạy Toàn Cầu — Từ Kenya Đến Ngọn Đuốc Olympic",
      content_en: "Running is one of the oldest and most universal sports practiced across human civilizations. In Kenya's high-altitude **Rift Valley**, world-champion marathon runners train daily along red dirt paths, developing extraordinary cardiovascular stamina and running efficiency. In northern Mexico, the indigenous **Tarahumara people** are famous for running non-stop over 200 kilometers through steep mountain canyons wearing thin handmade sandals. In ancient Greece, messenger Pheidippides ran 42 kilometers from the battlefield of Marathon to Athens, inspiring the modern **Marathon race**. Today, the **Olympic Torch Relay** travels across multiple continents, bringing people together in a spirit of peace, endurance, and international unity.",
      content_vi: "Chạy bộ là một trong những môn thể thao lâu đời và phổ biến nhất trên khắp các nền văn minh nhân loại. Tại Thung lũng Rift cao nguyên của Kenya, các nhà vô địch marathon thế giới tập luyện hàng ngày trên những con đường đất đỏ, phát triển sức bền tim mạch và hiệu suất chạy vượt trội. Ở miền bắc Mexico, người Tarahumara bản địa nổi tiếng với khả năng chạy liên tục hơn 200 km qua các hẻm núi dốc đứng với đôi dép thủ công mỏng. Tại Hy Lạp cổ đại, người đưa tin Pheidippides đã chạy 42 km từ chiến trường Marathon đến Athens, truyền cảm hứng cho giải Marathon hiện đại. Ngày nay, Hành trình Ngọn đuốc Olympic đi qua nhiều châu lục, kết nối mọi người trong tinh thần hòa bình, sức bền và sự đoàn kết quốc tế.",
      questions: [
        { id: 1, question_en: "Where do world-champion marathon runners train in Kenya?", options: ["High-altitude Rift Valley", "Coastal beaches", "City shopping centers", "Indoor gymnasiums"], answer: "High-altitude Rift Valley" },
        { id: 2, question_en: "What are the Tarahumara people of Mexico famous for?", options: ["Running long distances through steep canyons", "Riding fast bicycles", "Swimming across oceans", "Flying gliders"], answer: "Running long distances through steep canyons" },
        { id: 3, question_en: "Which historical event inspired the modern 42km Marathon race?", options: ["Pheidippides running from Marathon to Athens", "Ancient Olympic chariot races", "The invention of synthetic running tracks", "The first balloon flight"], answer: "Pheidippides running from Marathon to Athens" },
        { id: 4, question_en: "What is the global mission of the Olympic Torch Relay?", options: ["Uniting nations in a spirit of peace and endurance", "Selling sports equipment", "Testing fast sports cars", "Building new stadiums"], answer: "Uniting nations in a spirit of peace and endurance" }
      ],
      question: {
        text_en: "How can regular exercise and teamwork help you achieve your personal goals at school?",
        text_vi: "Tập thể dục thường xuyên và tinh thần đồng đội có thể giúp bạn đạt được mục tiêu cá nhân ở trường như thế nào?",
        min_words: 25,
        hint_en: "Regular exercise gives me energy, while teamwork helps me solve problems faster with my classmates...",
        hint_vi: "Tập thể dục thường xuyên giúp tôi có năng lượng, trong khi làm việc nhóm giúp tôi giải quyết vấn đề nhanh hơn cùng bạn học..."
      }
    },

    // Logic Lab (3 Tabs x 5 DISTINCT Questions = 15 Questions)
    logic_lab: {
      logic_science: {
        title: "Relay Velocity & Motion Science — Week 37",
        questions: [
          { id: 1, question_en: "Why is accelerating before receiving the baton crucial in a relay race?", options: ["It matches the runner's speed to maintain kinetic momentum", "It stops the runner from falling", "It changes the track color", "It cools down body temperature"], answer: "It matches the runner's speed to maintain kinetic momentum" },
          { id: 2, question_en: "If a runner covers 100 meters in 12.5 seconds, what is their average speed?", options: ["8 meters per second", "10 meters per second", "6 meters per second", "12 meters per second"], answer: "8 meters per second" },
          { id: 3, question_en: "Why do runners line up in a drafting line during long distance races?", options: ["To reduce aerodynamic air resistance and conserve energy", "To talk with each other", "To block the referee", "To hear music"], answer: "To reduce aerodynamic air resistance and conserve energy" },
          { id: 4, question_en: "How does shoe friction on a synthetic track surface prevent slipping?", options: ["Spikes grip the rubber track to maximize push force", "Smooth soles slide faster", "Ice cools the shoes", "Water makes track slippery"], answer: "Spikes grip the rubber track to maximize push force" },
          { id: 5, question_en: "What happens to human heart rate during a 100m sprint?", options: ["It increases rapidly to pump oxygenated blood to leg muscles", "It slows down completely", "It stays at rest rate", "It stops temporarily"], answer: "It increases rapidly to pump oxygenated blood to leg muscles" }
        ]
      },
      singapore_math: {
        title: "Singapore Bar Models — Relay Times & Speed — Week 37",
        problems: [
          { id: 1, text: "A 4x100m relay team had individual leg times of 12 seconds, 11.5 seconds, 12 seconds, and 10.5 seconds. What was their total team time?", answer: "46 seconds", svg_url: "/images/week37/barmodel_w37_adv_p1.svg" },
          { id: 2, text: "The baton handoff zone measures 20 meters long. If a runner enters the zone at 8 meters per second, how many seconds does it take to cross the zone?", answer: "2.5 seconds", svg_url: "/images/week37/barmodel_w37_adv_p2.svg" },
          { id: 3, text: "Runner A runs at a speed of 8.5 m/s. Runner B runs at 7.8 m/s. How much faster is Runner A over a 100-meter distance?", answer: "0.7 m/s faster", svg_url: "/images/week37/barmodel_w37_adv_p3.svg" },
          { id: 4, text: "A standard stadium running track has 2 straights of 100m each and 2 curved bends of 100m each. What is the perimeter of 1 full lap?", answer: "400 meters", svg_url: "/images/week37/barmodel_w37_adv_p4.svg" },
          { id: 5, text: "Leo practiced 5 relay handoffs every day for 2 weeks. How many total handoffs did he practice?", answer: "70 handoffs", svg_url: "/images/week37/barmodel_w37_adv_p5.svg" }
        ]
      },
      social_quiz: {
        title: "Global Athletics & Olympic History — Week 37",
        questions: [
          { id: 1, question_en: "What was the historical purpose of the ancient Greek Olympic Truce Ekecheiria?", options: ["To halt all wars so athletes could travel safely to the games", "To buy gold crowns", "To build fast ships", "To train army soldiers"], answer: "To halt all wars so athletes could travel safely to the games" },
          { id: 2, question_en: "Why do marathon runners from Kenya's Rift Valley train at high altitudes?", options: ["High altitude increases red blood cells for higher stamina", "It is cooler near beaches", "There are no roads", "To avoid rainy weather"], answer: "High altitude increases red blood cells for higher stamina" },
          { id: 3, question_en: "What do the five interlocking rings on the Olympic flag symbolize?", options: ["Five inhabited continents united in peaceful competition", "Five gold medals", "Five sports equipment brands", "Five running tracks"], answer: "Five inhabited continents united in peaceful competition" },
          { id: 4, question_en: "From which ancient Greek site is the Olympic Flame lit before traveling worldwide?", options: ["Olympia", "Athens", "Sparta", "Corinth"], answer: "Olympia" },
          { id: 5, question_en: "What primary social value does team relay racing instill in young athletes?", options: ["Synchronized teamwork and mutual trust", "Running alone", "Ignoring rules", "Arguing with judges"], answer: "Synchronized teamwork and mutual trust" }
        ]
      }
    },

    // Mindmap Speaking (6 Stems x 6 Branch Labels = 36 Branches)
    mindmap: {
      centerStems: [
        { id: "stem_1", label: "Beginning Scene: Sports Day", icon: "🏟️" },
        { id: "stem_2", label: "Problem: Relay Challenge", icon: "🏃" },
        { id: "stem_3", label: "Science: Smooth Handoff", icon: "⚡" },
        { id: "stem_4", label: "Sprint Finish: Full Speed", icon: "🏁" },
        { id: "stem_5", label: "Ceremony: Gold Podium", icon: "🥇" },
        { id: "stem_6", label: "Ending Value: Teamwork", icon: "🤝" }
      ],
      branchLabels: {
        stem_1: [
          { id: "b1_1", label: "held on sunny Saturday morning" },
          { id: "b1_2", label: "packed sports stadium" },
          { id: "b1_3", label: "heard cheering spectators" },
          { id: "b1_4", label: "waved colourful team banners" },
          { id: "b1_5", label: "prepared red track lanes" },
          { id: "b1_6", label: "wore official school uniforms" }
        ],
        stem_2: [
          { id: "b2_1", label: "needed smooth baton handoff" },
          { id: "b2_2", label: "avoided dropping heavy baton" },
          { id: "b2_3", label: "maintained maximum running speed" },
          { id: "b2_4", label: "timed acceleration in exchange zone" },
          { id: "b2_5", label: "stayed strictly in assigned lane" },
          { id: "b2_6", label: "focused on teammate signal call" }
        ],
        stem_3: [
          { id: "b3_1", label: "accelerated smoothly before handoff" },
          { id: "b3_2", label: "matched teammate running velocity" },
          { id: "b3_3", label: "passed baton cleanly into hand" },
          { id: "b3_4", label: "kept kinetic momentum going" },
          { id: "b3_5", label: "ran powerfully down straight track" },
          { id: "b3_6", label: "minimized energy loss in exchange" }
        ],
        stem_4: [
          { id: "b4_1", label: "sprinted down final straight path" },
          { id: "b4_2", label: "ran as fast as the wind" },
          { id: "b4_3", label: "pushed past rival competitors" },
          { id: "b4_4", label: "focused eyes on finish line" },
          { id: "b4_5", label: "maintained full physical stamina" },
          { id: "b4_6", label: "crossed finish line first" }
        ],
        stem_5: [
          { id: "b5_1", label: "stood on gold winner podium" },
          { id: "b5_2", label: "received shiny gold medals" },
          { id: "b5_3", label: "smiled with immense team pride" },
          { id: "b5_4", label: "waved to cheering crowd" },
          { id: "b5_5", label: "heard school victory song" },
          { id: "b5_6", label: "held trophy high together" }
        ],
        stem_6: [
          { id: "b6_1", label: "celebrated relay victory happily" },
          { id: "b6_2", label: "valued synchronized teamwork" },
          { id: "b6_3", label: "learned physics of speed" },
          { id: "b6_4", label: "respected all competing runners" },
          { id: "b6_5", label: "practiced true sportsmanship" },
          { id: "b6_6", label: "shared unforgettable moment" }
        ]
      }
    },

    // Ask AI (5 Prompts)
    ask_ai: [
      {
        id: 1,
        title_en: "Situation 1: Relay Handoff Physics",
        context_en: "Ask Nova how accelerating in the exchange zone maintains running momentum.",
        context_vi: "Hỏi Nova cách tăng tốc trong vùng giao gậy giúp duy trì động năng.",
        sample_question_en: "How does smooth acceleration in the exchange zone help relay runners?",
        sample_question_vi: "Tăng tốc mượt mà trong khu vực giao gậy giúp các vận động viên tiếp sức như thế nào?",
        answer: "How does smooth acceleration in the exchange zone help relay runners?",
        word_bank: ["How", "does", "acceleration", "help", "relay", "runners"]
      },
      {
        id: 2,
        title_en: "Situation 2: High Altitude Stamina",
        context_en: "Ask Nova why runners from Kenya's Rift Valley excel at marathon stamina.",
        context_vi: "Hỏi Nova tại sao các vận động viên từ Thung lũng Rift ở Kenya lại có sức bền tuyệt vời.",
        sample_question_en: "Why do athletes training at high altitudes develop greater stamina?",
        sample_question_vi: "Tại sao các vận động viên tập luyện ở vùng cao nguyên lại phát triển sức bền tốt hơn?",
        answer: "Why do athletes training at high altitudes develop greater stamina?",
        word_bank: ["Why", "do", "athletes", "develop", "greater", "stamina"]
      },
      {
        id: 3,
        title_en: "Situation 3: Olympic Truce History",
        context_en: "Ask Nova about the history and purpose of the ancient Olympic Truce Ekecheiria.",
        context_vi: "Hỏi Nova về lịch sử và mục đích của Thỏa thuận Ngừng bắn Olympic Ekecheiria.",
        sample_question_en: "What was the purpose of the ancient Olympic Truce Ekecheiria?",
        sample_question_vi: "Mục đích của Thỏa thuận Ngừng bắn Olympic Ekecheiria cổ đại là gì?",
        answer: "What was the purpose of the ancient Olympic Truce Ekecheiria?",
        word_bank: ["What", "was", "the", "purpose", "of", "Olympic", "Truce"]
      },
      {
        id: 4,
        title_en: "Situation 4: Track Friction Science",
        context_en: "Ask Nova how running spikes create friction to prevent slipping.",
        context_vi: "Hỏi Nova cách đinh giày chạy tạo ma sát để chống trượt.",
        sample_question_en: "How do athletic shoe spikes increase friction on synthetic tracks?",
        sample_question_vi: "Đinh giày thể thao tăng ma sát trên đường chạy tổng hợp như thế nào?",
        answer: "How do athletic shoe spikes increase friction on synthetic tracks?",
        word_bank: ["How", "do", "shoe", "spikes", "increase", "friction"]
      },
      {
        id: 5,
        title_en: "Situation 5: Values of Teamwork",
        context_en: "Ask Nova what key values of teamwork relay races teach young students.",
        context_vi: "Hỏi Nova những giá trị làm việc nhóm cốt lõi mà chạy tiếp sức dạy cho học sinh.",
        sample_question_en: "What essential teamwork values do relay races promote among students?",
        sample_question_vi: "Chạy tiếp sức thúc đẩy những giá trị làm việc nhóm thiết yếu nào giữa các học sinh?",
        answer: "What essential teamwork values do relay races promote among students?",
        word_bank: ["What", "teamwork", "values", "do", "relays", "promote"]
      }
    ],

    // Shadowing (10 Sentences)
    shadowing: [
      { id: 1, text: "On a sunny Saturday morning, the annual Sports Day took place at our school.", start_time: 0, end_time: 4 },
      { id: 2, text: "The crowded sports stadium was filled with the loud cheering of excited spectators.", start_time: 4, end_time: 9 },
      { id: 3, text: "Leo and his team were running in the final four-by-one-hundred-meter relay race.", start_time: 9, end_time: 14 },
      { id: 4, text: "The first runner was sprinting fast down the red track lane.", start_time: 14, end_time: 18 },
      { id: 5, text: "When his teammate reached the exchange zone, Leo accelerated smoothly forward.", start_time: 18, end_time: 23 },
      { id: 6, text: "Leo passed the baton cleanly without losing any running momentum.", start_time: 23, end_time: 28 },
      { id: 7, text: "He ran as fast as the wind toward the finish line down the straight track.", start_time: 28, end_time: 33 },
      { id: 8, text: "Leo crossed the finish line first and raised his arms happily.", start_time: 33, end_time: 37 },
      { id: 9, text: "The team stood on the gold podium and received shiny gold medals.", start_time: 37, end_time: 42 },
      { id: 10, text: "They felt extremely proud of their scientific teamwork and mutual support.", start_time: 42, end_time: 47 }
    ],

    // AI Tutor V28 Format (2 Cards Spark Talk)
    real: {
      weekId: 37,
      title: "The Sports Day Challenge — Teamwork & Speed",
      title_vi: "Ngày Hội Thể Thao — Tinh Thần Đồng Đội & Tốc Độ",
      spark_talk: [
        { id: 1, topic_en: "How did Leo prepare for a smooth baton handoff in the relay race?", topic_vi: "Leo đã chuẩn bị như thế nào cho màn trao gậy tiếp sức mượt mà?" },
        { id: 2, topic_en: "Why is working as a synchronized team better than running alone?", topic_vi: "Tại sao làm việc như một đội ăn ý lại tốt hơn chạy một mình?" }
      ],
      story_missions: [
        { id: 1, title: "Mission 1: Retell STEM Story", prompt: "Retell how Leo and his relay team used smooth acceleration to win the 4x100m gold medal." },
        { id: 2, title: "Mission 2: Retell Social Story", prompt: "Explain the ancient Greek Olympic Truce and how the Olympic Games bring nations together." },
        { id: 3, title: "Mission 3: Personal Connection", prompt: "Share a sports day or team relay experience where you worked together with your friends." }
      ]
    }
  }
};

// ---------------------------------------------------------------------------
// EXECUTE GENERATION FOR WEEKS 36 & 37
// ---------------------------------------------------------------------------

console.log("🚀 EXECUTING MASTER PIPELINE REBUILD FOR WEEK 36 & WEEK 37...");

for (const wId of [36, 37]) {
  const wData = WEEKS_FULL_DATA[wId];
  console.log(`\n📌 Rebuilding Week ${wId}: ${wData.title_en}...`);

  const folders = [
    path.join(root, `src/data/weeks/week_${wId}`),
    path.join(root, `src/data/weeks_easy/week_${wId}`)
  ];

  for (const dir of folders) {
    ensureDir(dir);

    // 1. read.js
    const readObj = {
      title_en: wData.title_en,
      title_vi: wData.title_vi,
      read_stem: {
        title_en: wData.stem_title,
        title_vi: wData.stem_title,
        content_en: wData.stem_content,
        content_vi: wData.stem_vi,
        questions: wData.stem_questions.map(q => shuffleOptionsAndAnswer(q))
      },
      read_social: {
        title_en: wData.social_title,
        title_vi: wData.social_title,
        content_en: wData.social_content,
        content_vi: wData.social_vi,
        questions: wData.social_questions.map(q => shuffleOptionsAndAnswer(q))
      }
    };
    fs.writeFileSync(path.join(dir, 'read.js'), `// Cambridge A2 Flyers read.js — Week ${wId}\nexport default ${JSON.stringify(readObj, null, 2)};\n`);

    // 2. explore.js
    const shuffledQs = wData.explore.questions.map(q => shuffleOptionsAndAnswer(q));
    const exploreObj = {
      ...wData.explore,
      check_questions: shuffledQs,
      comprehension_questions: shuffledQs,
      questions: shuffledQs
    };
    fs.writeFileSync(path.join(dir, 'explore.js'), `// Cambridge A2 Flyers explore.js — Week ${wId}\nexport default ${JSON.stringify(exploreObj, null, 2)};\n`);

    // 3. logic_lab.js
    const logicLabObj = {
      logic_science: {
        title: wData.logic_lab.logic_science.title,
        questions: wData.logic_lab.logic_science.questions.map(q => shuffleOptionsAndAnswer(q))
      },
      singapore_math: wData.logic_lab.singapore_math,
      social_quiz: {
        title: wData.logic_lab.social_quiz.title,
        questions: wData.logic_lab.social_quiz.questions.map(q => shuffleOptionsAndAnswer(q))
      }
    };
    fs.writeFileSync(path.join(dir, 'logic_lab.js'), `// Cambridge A2 Flyers logic_lab.js — Week ${wId}\nexport default ${JSON.stringify(logicLabObj, null, 2)};\n`);

    // 4. mindmap.js
    fs.writeFileSync(path.join(dir, 'mindmap.js'), `// Cambridge A2 Flyers mindmap.js — Week ${wId}\nexport default ${JSON.stringify(wData.mindmap, null, 2)};\n`);

    // 5. ask_ai.js
    fs.writeFileSync(path.join(dir, 'ask_ai.js'), `// Cambridge A2 Flyers ask_ai.js — Week ${wId}\nexport default {\n  prompts: ${JSON.stringify(wData.ask_ai, null, 2)},\n  situations: ${JSON.stringify(wData.ask_ai, null, 2)}\n};\n`);

    // 6. shadowing.js
    fs.writeFileSync(path.join(dir, 'shadowing.js'), `// Cambridge A2 Flyers shadowing.js — Week ${wId}\nexport default {\n  videoId: ${JSON.stringify("shadowing_w" + wId)},\n  title: ${JSON.stringify(wData.title_en + " — Shadowing")},\n  sentences: ${JSON.stringify(wData.shadowing, null, 2)}\n};\n`);
  }

  // 7. week_XX_real.js (AI Tutor)
  const realObj = {
    weekId: wId,
    title: wData.title_en,
    title_vi: wData.title_vi,
    spark_talk: wData.real.spark_talk,
    story_missions: wData.real.story_missions
  };
  
  // Read existing real files to keep target_vocab & sentences if available
  const existingReal = path.join(root, `src/data/weeks/week_${wId}_real.js`);
  if (fs.existsSync(existingReal)) {
    try {
      const existing = (await import(`file://${existingReal}`)).default;
      realObj.target_vocab = existing.target_vocab || [];
      realObj.sentences = existing.sentences || wData.shadowing;
    } catch (e) {
      realObj.target_vocab = [];
      realObj.sentences = wData.shadowing;
    }
  }

  const realContent = `// Cambridge A2 Flyers week_${wId}_real.js\nexport default ${JSON.stringify(realObj, null, 2)};\n`;
  fs.writeFileSync(path.join(root, `src/data/weeks/week_${wId}_real.js`), realContent);
  fs.writeFileSync(path.join(root, `src/data/weeks/week_${wId}/week_${wId}_real.js`), realContent);

  console.log(`  ✅ Successfully updated Week ${wId} with 100% Pipeline Standards!`);
}

console.log("\n🎉 WEEK 36 & WEEK 37 PIPELINE MASTER REBUILD COMPLETE!");
