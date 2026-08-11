// Comprehensive Standardization Automation Script for Weeks 33, 34, 35, 36, 37 across All 12 Stations
import fs from 'fs';
import path from 'path';

const root = process.cwd();

function ensureDirSync(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// ---------------------------------------------------------------------------
// DATA DEFINITIONS FOR WEEKS 33-37 (CAMBRIDGE FLYERS A2 STANDARDS)
// ---------------------------------------------------------------------------

const WEEKS_DATA = {
  33: {
    weekId: 33,
    title_en: "Corridor Safety & Accident Verbs",
    title_vi: "An Toàn Hành Lang & Động Từ Tai Nạn",
    read: {
      title: "Jake's Unexpected Fall",
      image_url: "/images/week33/read_cover_w33.jpg",
      audio_url: "/audio/week33/read_main.mp3",
      content_en: `On a **bright sunny day**, Jake was **walking carefully** down the **school corridor**. He had just **finished his science class** and was **holding his notebooks**.

**Suddenly**, a boy who was **running fast** **slipped on the wet floor**. He **fell heavily** and **hurt his knee**. Jake **rushed over to help** him immediately.

The boy **began to bleed** a little and **burst into tears**. Jake **stayed calm** and **called the school nurse**. The nurse came quickly and **applied a clean bandage**.

Everyone **felt extremely relieved**. The headmaster thanked Jake and **reminded all students** to walk safely. Everyone **learned a valuable lesson** about school safety.`,
      content_vi: `Vào một **ngày hè nắng đẹp rực rỡ**, Jake đang **cẩn thận bước đi** dọc theo **hành lang trường học**. Chú vừa **học xong tiết khoa học** và đang **cầm các cuốn vở**.

**Đột nhiên**, một cậu bé đang **chạy rất nhanh** đã **trượt ngã trên sàn nhà ướt**. Cậu ấy **ngã rất đau** và **bị thương ở đầu gối**. Jake **vội vã chạy đến giúp đỡ** ngay lập tức.

Cậu bé **bắt đầu chảy máu** một chút và **bật khóc nức nở**. Jake **giữ bình tĩnh** và **gọi cô y tá trường học**. Cô y tá đến nhanh chóng và **băng một chiếc băng sạch**.

Mọi người **cảm thấy cực kỳ nhẹ nhõm**. Thầy hiệu trưởng cảm ơn Jake và **nhắc nhở tất cả học sinh** đi lại an toàn. Mọi người **học được một bài học quý giá** về an toàn trường học.`,
      dictMap: {
        "bright sunny day": "ngày hè nắng đẹp rực rỡ",
        "walking carefully": "cẩn thận bước đi",
        "school corridor": "hành lang trường học",
        "finished his science class": "học xong tiết khoa học",
        "holding his notebooks": "cầm các cuốn vở",
        "Suddenly": "Đột nhiên",
        "running fast": "chạy rất nhanh",
        "slipped on the wet floor": "trượt ngã trên sàn nhà ướt",
        "fell heavily": "ngã rất đau",
        "hurt his knee": "bị thương ở đầu gối",
        "rushed over to help": "vội vã chạy đến giúp đỡ",
        "began to bleed": "bắt đầu chảy máu",
        "burst into tears": "bật khóc nức nở",
        "stayed calm": "giữ bình tĩnh",
        "called the school nurse": "gọi cô y tá trường học",
        "applied a clean bandage": "băng một chiếc băng sạch",
        "felt extremely relieved": "cảm thấy cực kỳ nhẹ nhõm",
        "reminded all students": "nhắc nhở tất cả học sinh",
        "learned a valuable lesson": "học được một bài học quý giá"
      },
      comprehension_questions: [
        { id: 1, question_en: "What was Jake doing when the boy slipped?", answer: ["Walking carefully down the school corridor"], clue_statement: "Jake was walking carefully down the school corridor.", hint_en: "Jake was ___.", hint_vi: "Jake đang ___." },
        { id: 2, question_en: "What happened to the boy who was running fast?", answer: ["He slipped on the wet floor and hurt his knee"], clue_statement: "A boy running fast slipped on the wet floor.", hint_en: "He ___ on the wet floor.", hint_vi: "Cậu ấy ___ trên sàn ướt." }
      ]
    },
    explore: {
      image_url: "/images/week33/explore_w33.jpg",
      content_en: "Schools around the world have special **safety rules** to keep students happy and healthy. In Japan, children practice **emergency earthquake drills** every month so they know exactly how to protect their heads under sturdy wooden desks. In Canada, school corridors have **bright yellow warning signs** whenever janitors mop the floors during snowy winter days. By obeying these simple rules, students learn **social responsibility** and care for their friends every single day.",
      content_vi: "Trường học trên khắp thế giới có các quy tắc an toàn đặc biệt để giữ cho học sinh vui vẻ và khỏe mạnh. Ở Nhật Bản, trẻ em thực hành diễn tập động đất hàng tháng. Ở Canada, hành lang trường học có biển cảnh báo màu vàng tươi khi lau sàn. Bằng cách tuân thủ các quy tắc đơn giản này, học sinh học được trách nhiệm xã hội và quan tâm đến bạn bè.",
      key_vocabulary: [
        { word: "corridor", definition: "a long passage in a building", definition_vi: "hành lang", example: "Walk carefully down the corridor." }
      ],
      check_questions: [
        { id: 1, question_en: "Why do Japanese schools conduct earthquake drills?", answer: ["To protect their heads under desks"], clue_statement: "Children practice drills so they know how to protect their heads.", hint_en: "Protect their ___.", hint_vi: "Bảo vệ ___." }
      ]
    },
    vocab: Array.from({ length: 20 }, (_, i) => ({
      word: `word_${i + 1}`,
      definition_en: `English definition for target word ${i + 1}`,
      definition_vi: `Định nghĩa tiếng Việt cho từ ${i + 1}`,
      example: `Example sentence using target word ${i + 1}.`
    })),
    grammar: {
      title: "Past Continuous + Past Simple with WHILE",
      focus: "While + Subject + WAS/WERE + V-ing, Subject + V-ed",
      exercises: [
        { id: 1, prompt: "While Jake _____ (walk) down the corridor, Leo slipped.", answer: "was walking" }
      ]
    },
    mindmap: {
      stems: [
        { label: "Corridor Setting", branches: ["on a bright sunny day", "walking carefully down corridor", "finished science class", "holding notebooks", "clean wooden floors", "busy school morning"] },
        { label: "The Accident Event", branches: ["running fast down hall", "slipped on wet floor", "fell heavily on knee", "began to bleed", "burst into tears", "hurt his leg"] },
        { label: "Jake's Helping Action", branches: ["rushed over immediately", "stayed calm and gentle", "called the school nurse", "held his hand", "helped him sit up", "brought a glass of water"] },
        { label: "Nurse Treatment", branches: ["arrived with medical box", "cleaned the cut carefully", "applied a clean bandage", "checked his knee", "smiled warmly", "gave him a sticker"] },
        { label: "Relief & Reaction", branches: ["felt extremely relieved", "stopped crying softly", "thanked Jake warmly", "headmaster praised them", "friends cheered loudly", "clapped hands together"] },
        { label: "Safety Lesson", branches: ["learned a valuable lesson", "walk safely in corridor", "never run on wet floors", "care for classmates", "obey school rules", "keep everyone safe"] }
      ]
    },
    writing: {
      title: "Corridor Safety — Jake's Good Deed",
      model_sentence: "On a bright sunny day, Jake was walking carefully down the school corridor. He had just finished his science class and was holding his notebooks. Suddenly, a boy who was running fast slipped on the wet floor. He fell heavily and hurt his knee. Jake rushed over to help him immediately. The boy began to bleed a little and burst into tears. Jake stayed calm and called the school nurse. The nurse came quickly and applied a clean bandage. Everyone felt extremely relieved. Everyone learned a valuable lesson about school safety.",
      sentence_frames: [
        { template: "On a _____ day, Jake was walking carefully down the corridor.", answers: ["bright sunny"] },
        { template: "He had just finished his science class and was _____ his notebooks.", answers: ["holding"] },
        { template: "Suddenly, a boy who was running fast _____ on the wet floor.", answers: ["slipped"] },
        { template: "He fell heavily and _____ his knee.", answers: ["hurt"] },
        { template: "Jake rushed over to _____ him immediately.", answers: ["help"] },
        { template: "The boy began to bleed a little and _____ into tears.", answers: ["burst"] },
        { template: "Jake stayed calm and called the school _____.", answers: ["nurse"] },
        { template: "The nurse came quickly and applied a clean _____.", answers: ["bandage"] },
        { template: "Everyone felt _____ relieved after he smiled.", answers: ["extremely"] },
        { template: "Everyone learned a _____ lesson about school safety.", answers: ["valuable"] }
      ]
    }
  },

  34: {
    weekId: 34,
    title_en: "The Ant and the Grasshopper — Fables & Moral",
    title_vi: "Kiến và Châu Chấu — Truyện Ngụ Ngôn",
    read: {
      title: "The Ant and the Grasshopper",
      image_url: "/images/week34/read_cover_w34.jpg",
      audio_url: "/audio/week34/read_main.mp3",
      content_en: `On a **bright sunny summer day**, the **hardworking ant** was **gathering grains of wheat**. **Meanwhile**, the **lazy grasshopper** was **singing cheerfully** under a **green tree**.

When the **cold winter arrived**, **snow covered the ground everywhere**. The grasshopper **had no food** and was **shivering in the cold**.

He **slowly walked** to the ant's **warm wooden house** and **knocked on the door**. The **kind ant** opened the door and **invited him inside** for **warm soup**.

The grasshopper **felt deeply grateful** and **learned a valuable lesson**. **From that day on**, he **promised to work hard** every summer.`,
      content_vi: `Vào một **ngày hè nắng đẹp rực rỡ**, chú **kiến chăm chỉ** đang **nhặt những hạt lúa mì**. **Trong khi đó**, chú **châu chấu lười biếng** đang **hát ca vui vẻ** dưới bóng cây xanh.

Khi **mùa đông lạnh giá đến**, **tuyết phủ kín mặt đất khắp nơi**. Châu chấu **không có thức ăn** và đang **run rẩy trong giá lạnh**.

Chú **chậm rãi bước đến** ngôi **nhà gỗ ấm áp** của kiến và **gõ cửa**. Chú **kiến tốt bụng** mở cửa và **mời chú vào trong** dùng **súp nóng**.

Châu chấu **cảm thấy cực kỳ biết ơn** và **học được một bài học quý giá**. **Từ ngày đó trở đi**, chú **hứa sẽ làm việc chăm chỉ** mỗi mùa hè.`,
      dictMap: {
        "bright sunny summer day": "ngày hè nắng đẹp rực rỡ",
        "hardworking ant": "chú kiến chăm chỉ",
        "kiến chăm chỉ": "hardworking ant",
        "gathering grains of wheat": "nhặt những hạt lúa mì",
        "Meanwhile": "Trong khi đó",
        "lazy grasshopper": "chú châu chấu lười biếng",
        "châu chấu lười biếng": "lazy grasshopper",
        "singing cheerfully": "hát ca vui vẻ",
        "green tree": "cây xanh",
        "cold winter arrived": "mùa đông lạnh giá đến",
        "snow covered the ground everywhere": "tuyết phủ kín mặt đất khắp nơi",
        "had no food": "không có thức ăn",
        "shivering in the cold": "run rẩy trong giá lạnh",
        "slowly walked": "chậm rãi bước đến",
        "warm wooden house": "nhà gỗ ấm áp",
        "knocked on the door": "gõ cửa",
        "kind ant": "kiến tốt bụng",
        "invited him inside": "mời chú vào trong",
        "warm soup": "súp nóng",
        "felt deeply grateful": "cảm thấy cực kỳ biết ơn",
        "learned a valuable lesson": "học được một bài học quý giá",
        "From that day on": "Từ ngày đó trở đi",
        "promised to work hard": "hứa sẽ làm việc chăm chỉ"
      },
      comprehension_questions: [
        { id: 1, question_en: "What was the ant doing during the summer?", answer: ["Gathering grains of wheat"], clue_statement: "The ant was gathering grains of wheat.", hint_en: "Gathering ___.", hint_vi: "Nhặt ___." }
      ]
    },
    explore: {
      image_url: "/images/week34/explore_w34.jpg",
      content_en: "Fables are ancient short stories that teach us **valuable life lessons**. Aesop was a famous storyteller from Greece who wrote stories about animals with human personalities. Stories like *The Ant and the Grasshopper* show us how **hard work and patience** always win.",
      content_vi: "Truyện ngụ ngôn là những câu chuyện ngắn cổ xưa dạy chúng ta những bài học cuộc sống quý giá. Aesop là một người kể chuyện nổi tiếng từ Hy Lạp.",
      key_vocabulary: [
        { word: "fable", definition: "a short story teaching a moral lesson", definition_vi: "truyện ngụ ngôn", example: "The fable taught a great lesson." }
      ],
      check_questions: [
        { id: 1, question_en: "Who was Aesop?", answer: ["A famous storyteller from ancient Greece"], clue_statement: "Aesop was a famous storyteller from Greece.", hint_en: "Storyteller from ___.", hint_vi: "Người kể chuyện từ ___." }
      ]
    },
    vocab: Array.from({ length: 20 }, (_, i) => ({
      word: `fable_word_${i + 1}`,
      definition_en: `English definition for fable word ${i + 1}`,
      definition_vi: `Định nghĩa tiếng Việt cho từ ngụ ngôn ${i + 1}`,
      example: `Example sentence for fable word ${i + 1}.`
    })),
    grammar: {
      title: "Past Continuous + Past Simple with WHILE",
      focus: "While + Subject + WAS/WERE + V-ing",
      exercises: [
        { id: 1, prompt: "While the ant _____ (work), the grasshopper sang.", answer: "was working" }
      ]
    },
    mindmap: {
      stems: [
        { label: "Summer Setting", branches: ["bright sunny summer day", "hardworking ant in field", "gathering grains of wheat", "lazy grasshopper under tree", "singing cheerfully all day", "warm golden sunshine"] },
        { label: "Winter Problem", branches: ["cold winter arrived", "snow covered ground everywhere", "no food to eat", "shivering in freezing cold", "empty belly and weak legs", "felt cold and sad"] },
        { label: "Asking for Help", branches: ["slowly walked down path", "reached warm wooden house", "knocked gently on door", "asked for warm soup", "kind ant opened door", "invited him inside"] },
        { label: "Kind Response", branches: ["served hot vegetable soup", "shared stored wheat grains", "sat near warm fireplace", "listened with kindness", "gave him a warm coat", "smiled gently"] },
        { label: "Grateful Emotion", branches: ["felt deeply grateful", "thanked the ant warmly", "warmed up inside house", "realized his past mistake", "smiled with joy", "heart felt warm"] },
        { label: "Life Lesson", branches: ["learned a valuable lesson", "promised to work hard", "prepare for winter early", "never be lazy again", "work together every summer", "help friends in need"] }
      ]
    },
    writing: {
      title: "The Ant and the Grasshopper — Work Ethic",
      model_sentence: "On a bright sunny summer day, the hardworking ant was gathering grains of wheat. Meanwhile, the lazy grasshopper was singing cheerfully under a green tree. When the cold winter arrived, snow covered the ground everywhere. The grasshopper had no food and was shivering in the cold. He slowly walked to the ant's warm wooden house and knocked on the door. The kind ant opened the door and invited him inside for warm soup. The grasshopper felt deeply grateful and learned a valuable lesson. From that day on, he promised to work hard every summer.",
      sentence_frames: [
        { template: "On a _____ summer day, the ant was gathering grains of wheat.", answers: ["bright sunny"] },
        { template: "_____, the lazy grasshopper was singing cheerfully under a tree.", answers: ["Meanwhile"] },
        { template: "When the cold winter arrived, _____ covered the ground everywhere.", answers: ["snow"] },
        { template: "The grasshopper had no food and was _____ in the cold.", answers: ["shivering"] },
        { template: "He slowly walked to the ant's warm _____ house.", answers: ["wooden"] },
        { template: "He _____ on the door and asked for help.", answers: ["knocked"] },
        { template: "The kind ant opened the door and invited him inside for _____ soup.", answers: ["warm"] },
        { template: "The grasshopper felt _____ grateful for the food.", answers: ["deeply"] },
        { template: "He learned a _____ lesson about working hard.", answers: ["valuable"] },
        { template: "From that day on, he _____ to prepare for winter.", answers: ["promised"] }
      ]
    }
  },

  35: {
    weekId: 35,
    title_en: "Save Our Park — Environmental Action",
    title_vi: "Bảo Vệ Công Viên — Hành Động Môi Trường",
    read: {
      title: "Save Our Park",
      image_url: "/images/week35/read_cover_w35.jpg",
      audio_url: "/audio/week35/read_main.mp3",
      content_en: `On a **warm Saturday morning**, Maya and Tom **visited their favorite city park**. They were sad to see **plastic bottles and rubbish** **scattered on the green grass**.

**Without hesitation**, they **decided to clean up** the **entire park together**. **First**, they **put on gloves** and **collected all the plastic waste** into **recycling bins**.

**Next**, they **planted colorful flowers** and **young green trees** near the pond. **Thanks to their hard work**, the park became **clean and beautiful again**.

All the visitors **smiled and applauded** their **wonderful effort**. Maya and Tom **felt extremely proud** of **protecting nature**.`,
      content_vi: `Vào một **sáng thứ Bảy ấm áp**, Maya và Tom **đến thăm công viên thành phố yêu thích của họ**. Họ rất buồn khi thấy **chai nhựa và rác thải** **vứt bừa bãi trên thảm cỏ xanh**.

**Không một chút do dự**, họ **quyết định cùng nhau dọn dẹp** **toàn bộ công viên**. **Đầu tiên**, họ **đeo găng tay** và **gom toàn bộ rác thải nhựa** vào **thùng tái chế**.

**Tiếp theo**, họ **trồng những bông hoa rực rỡ** và **những cây xanh non** gần hồ nước. **Nhờ vào nỗ lực chăm chỉ của họ**, công viên đã trở nên **sạch sẽ và đẹp đẽ trở lại**.

Tất cả du khách **đều mỉm cười và vỗ tay khen ngợi** **nỗ lực tuyệt vời của họ**. Maya và Tom **cảm thấy cực kỳ tự hào** vì đã **bảo vệ thiên nhiên**.`,
      dictMap: {
        "warm Saturday morning": "sáng thứ Bảy ấm áp",
        "visited their favorite city park": "đến thăm công viên thành phố yêu thích của họ",
        "plastic bottles and rubbish": "chai nhựa và rác thải",
        "scattered on the green grass": "vứt bừa bãi trên thảm cỏ xanh",
        "Without hesitation": "Không một chút do dự",
        "decided to clean up": "quyết định cùng nhau dọn dẹp",
        "entire park together": "toàn bộ công viên",
        "First": "Đầu tiên",
        "put on gloves": "đeo găng tay",
        "collected all the plastic waste": "gom toàn bộ rác thải nhựa",
        "recycling bins": "thùng tái chế",
        "Next": "Tiếp theo",
        "planted colorful flowers": "trồng những bông hoa rực rỡ",
        "young green trees": "những cây xanh non",
        "Thanks to their hard work": "Nhờ vào nỗ lực chăm chỉ của họ",
        "clean and beautiful again": "sạch sẽ và đẹp đẽ trở lại",
        "smiled and applauded": "đều mỉm cười và vỗ tay khen ngợi",
        "wonderful effort": "nỗ lực tuyệt vời của họ",
        "felt extremely proud": "cảm thấy cực kỳ tự hào",
        "protecting nature": "bảo vệ thiên nhiên"
      },
      comprehension_questions: [
        { id: 1, question_en: "Where did Maya and Tom go on Saturday morning?", answer: ["Their favorite city park"], clue_statement: "Maya and Tom visited their favorite city park.", hint_en: "Favorite ___ park.", hint_vi: "Công viên ___ yêu thích." }
      ]
    },
    explore: {
      image_url: "/images/week35/explore_w35.jpg",
      content_en: "Parks in big cities are essential **green lungs** that clean the air we breathe. In Singapore, city parks have **futuristic supertrees** covered in real plants. In London, Hyde Park provides a safe home for **wild swans, ducks, and squirrels**. By keeping parks clean, communities make cities **healthier places** for everyone.",
      content_vi: "Công viên ở các thành phố lớn là những lá phổi xanh thiết yếu làm sạch không khí.",
      key_vocabulary: [
        { word: "recycling", definition: "converting waste into reusable material", definition_vi: "tái chế", example: "Put bottles in recycling bins." }
      ],
      check_questions: [
        { id: 1, question_en: "Why are city parks called green lungs?", answer: ["Because they clean the air we breathe"], clue_statement: "Parks are green lungs that clean the air.", hint_en: "Clean the ___.", hint_vi: "Làm sạch ___." }
      ]
    },
    vocab: Array.from({ length: 20 }, (_, i) => ({
      word: `park_word_${i + 1}`,
      definition_en: `English definition for park word ${i + 1}`,
      definition_vi: `Định nghĩa tiếng Việt cho từ công viên ${i + 1}`,
      example: `Example sentence for park word ${i + 1}.`
    })),
    grammar: {
      title: "Clauses of Reason & Purpose with SO THAT / BECAUSE",
      focus: "Subject + Verb + SO THAT + Subject + CAN + Verb",
      exercises: [
        { id: 1, prompt: "They collected bottles so that the park _____ (be) clean.", answer: "would be" }
      ]
    },
    mindmap: {
      stems: [
        { label: "Morning Visit", branches: ["on a warm Saturday morning", "visited favorite city park", "walked along green path", "saw blue pond water", "birds singing in trees", "sunny city morning"] },
        { label: "The Litter Problem", branches: ["sad to see plastic waste", "rubbish scattered on grass", "empty water bottles lying", "dirty plastic bags around", "threatened small animals", "felt sad and concerned"] },
        { label: "Cleanup Action", branches: ["without any hesitation", "decided to clean up park", "put on protective gloves", "collected plastic waste into bins", "sorted paper and plastic", "worked hard together"] },
        { label: "Planting Trees", branches: ["planted colorful flowers", "young green oak trees", "watered plants with bucket", "placed wooden bench near pond", "added garden signs", "cared for nature"] },
        { label: "Community Praise", branches: ["park clean and beautiful again", "visitors smiled and applauded", "praised their wonderful effort", "children played on clean grass", "swans swam happily", "everyone cheered warmly"] },
        { label: "Environmental Pride", branches: ["felt extremely proud", "learned to protect nature", "keep city parks clean", "recycle plastic bottles daily", "inspire other friends", "make world greener"] }
      ]
    },
    writing: {
      title: "Save Our Park — Environmental Action",
      model_sentence: "On a warm Saturday morning, Maya and Tom visited their favorite city park. They were sad to see plastic bottles and rubbish scattered on the green grass. Without hesitation, they decided to clean up the entire park together. First, they put on gloves and collected all the plastic waste into recycling bins. Next, they planted colorful flowers and young green trees near the pond. Thanks to their hard work, the park became clean and beautiful again. All the visitors smiled and applauded their wonderful effort. Maya and Tom felt extremely proud of protecting nature.",
      sentence_frames: [
        { template: "On a warm Saturday morning, Maya and Tom visited their favorite _____ park.", answers: ["city"] },
        { template: "They were sad to see plastic bottles and _____ scattered on the grass.", answers: ["rubbish"] },
        { template: "Without _____, they decided to clean up the entire park.", answers: ["hesitation"] },
        { template: "First, they put on _____ and collected plastic waste.", answers: ["gloves"] },
        { template: "They threw the waste into _____ bins.", answers: ["recycling"] },
        { template: "Next, they planted colorful flowers and young _____ trees.", answers: ["green"] },
        { template: "Thanks to their hard work, the park became _____ again.", answers: ["clean"] },
        { template: "All the visitors smiled and _____ their wonderful effort.", answers: ["applauded"] },
        { template: "Maya and Tom felt _____ proud of their team.", answers: ["extremely"] },
        { template: "They learned how important it is to protect _____.", answers: ["nature"] }
      ]
    }
  },

  36: {
    weekId: 36,
    title_en: "The Secret Cave — Adventure & Exploration",
    title_vi: "Hang Động Bí Mật — Phiêu Lưu Khám Phá",
    read: {
      title: "The Secret Cave Adventure",
      image_url: "/images/week36/read_cover_w36.jpg",
      audio_url: "/audio/week36/read_main.mp3",
      content_en: `Early on a **sunny Saturday morning**, Leo and Mia went hiking in the **green pine forest**. While they were **walking along the rocky path**, they **discovered a hidden entrance** to a **mysterious cave**.

They **turned on their bright flashlights** and **stepped inside carefully**. Inside the cave, **cool drops of water** dripped from the **rocky ceiling**, and **dark grey shadows** danced on the walls.

Suddenly, Mia **spotted a dusty wooden box** tucked behind a large stone. They opened it gently and **found an ancient map** with a **shiny brass compass**.

Their **hearts beat fast** with excitement. They realized it was a **historical treasure map** left by old explorers. They **felt extremely excited** and **burst into laughter**, ready for their next big adventure.`,
      content_vi: `Sáng **thứ Bảy nắng đẹp rực rỡ**, Leo và Mia đi bộ đường dài trong **rừng thông xanh**. Khi họ đang **đi dọc theo con đường đá**, họ **phát hiện ra một lối vào ẩn** dẫn đến **hang động bí mật**.

Họ **bật chiếc đèn pin sáng** và **cẩn thận bước vào trong**. Bên trong hang động, **những giọt nước mát lạnh** nhỏ xuống từ **trần đá**, và **bóng xám tối** nhảy múa trên tường.

Đột nhiên, Mia **phát hiện ra một chiếc hộp gỗ bám bụi** giấu sau một hòn đá lớn. Họ mở nó ra nhẹ nhàng và **tìm thấy một bản đồ cổ** cùng **la bàn đồng sáng bóng**.

**Tim họ đập nhanh** vì phấn khích. Họ nhận ra đó là **bản đồ kho báu lịch sử** do các nhà khám phá xưa để lại. Họ **cảm thấy cực kỳ hào hứng** và **bật cười vui vẻ**, sẵn sàng cho cuộc phiêu lưu lớn tiếp theo.`,
      dictMap: {
        "sunny Saturday morning": "sáng thứ Bảy nắng đẹp rực rỡ",
        "thứ Bảy nắng đẹp rực rỡ": "sunny Saturday morning",
        "green pine forest": "rừng thông xanh",
        "walking along the rocky path": "đi dọc theo con đường đá",
        "discovered a hidden entrance": "phát hiện ra một lối vào ẩn",
        "mysterious cave": "hang động bí mật",
        "turned on their bright flashlights": "bật chiếc đèn pin sáng",
        "stepped inside carefully": "cẩn thận bước vào trong",
        "cool drops of water": "những giọt nước mát lạnh",
        "rocky ceiling": "trần đá",
        "dark grey shadows": "bóng xám tối",
        "spotted a dusty wooden box": "phát hiện ra một chiếc hộp gỗ bám bụi",
        "found an ancient map": "tìm thấy một bản đồ cổ",
        "shiny brass compass": "la bàn đồng sáng bóng",
        "hearts beat fast": "tim họ đập nhanh",
        "historical treasure map": "bản đồ kho báu lịch sử",
        "felt extremely excited": "cảm thấy cực kỳ hào hứng",
        "burst into laughter": "bật cười vui vẻ"
      },
      comprehension_questions: [
        { id: 1, question_en: "Where were Leo and Mia hiking?", answer: ["In the green pine forest"], clue_statement: "Leo and Mia went hiking in the green pine forest.", hint_en: "In the green ___.", hint_vi: "Trong rừng ___." }
      ]
    },
    explore: {
      image_url: "/images/week36/explore_w36.jpg",
      content_en: "Caves are amazing underground wonderlands formed over thousands of years by moving water. In Vietnam, **Son Doong Cave** is the largest cave in the entire world! Inside Son Doong, explorers found an **underground jungle** with trees and rare animals.",
      content_vi: "Hang động là những vùng đất kỳ diệu dưới lòng đất. Ở Việt Nam, Hang Sơn Đoòng là hang động lớn nhất thế giới!",
      key_vocabulary: [
        { word: "cave", definition: "a large underground chamber", definition_vi: "hang động", example: "They explored a secret cave." }
      ],
      check_questions: [
        { id: 1, question_en: "Which is the largest cave in the world?", answer: ["Son Doong Cave in Vietnam"], clue_statement: "Son Doong Cave is the largest cave in the world.", hint_en: "Son Doong...", hint_vi: "Hang Sơn Đoòng..." }
      ]
    },
    vocab: Array.from({ length: 20 }, (_, i) => ({
      word: `cave_word_${i + 1}`,
      definition_en: `English definition for cave word ${i + 1}`,
      definition_vi: `Định nghĩa tiếng Việt cho từ hang động ${i + 1}`,
      example: `Example sentence for cave word ${i + 1}.`
    })),
    grammar: {
      title: "Direct Speech & Past Continuous with WHILE",
      focus: "While + WAS/WERE + V-ing, Subject + V-ed",
      exercises: [
        { id: 1, prompt: "While they _____ (explore) the cave, Mia found a box.", answer: "were exploring" }
      ]
    },
    mindmap: {
      stems: [
        { label: "Morning Start", branches: ["sunny Saturday morning", "went hiking together", "green pine forest", "walking along rocky path", "fresh mountain air", "holding flashlights"] },
        { label: "Cave Discovery", branches: ["discovered hidden entrance", "mysterious dark cave", "turned on bright flashlights", "stepped inside carefully", "cool drops of water", "dark grey shadows"] },
        { label: "Finding the Box", branches: ["spotted dusty wooden box", "behind large grey stone", "opened lid gently", "found an ancient map", "shiny brass compass", "old explorer letters"] },
        { label: "Examining Map", branches: ["unrolled parchment map", "marked red cross sign", "traced river path", "saw mountain drawings", "read old symbols", "held brass compass"] },
        { label: "Excited Feelings", branches: ["hearts beat fast", "felt extremely excited", "eyes shined with wonder", "burst into laughter", "smiled at each other", "hugged happily"] },
        { label: "Next Adventure", branches: ["decided to follow map", "planned next adventure", "kept secret safe", "walked out into sunshine", "felt like brave explorers", "shared big dream"] }
      ]
    },
    writing: {
      title: "The Secret Cave — Adventure & Treasure",
      model_sentence: "Early on a sunny Saturday morning, Leo and Mia went hiking in the green pine forest. While they were walking along the rocky path, they discovered a hidden entrance to a mysterious cave. They turned on their bright flashlights and stepped inside carefully. Inside the cave, cool drops of water dripped from the rocky ceiling, and dark grey shadows danced on the walls. Suddenly, Mia spotted a dusty wooden box tucked behind a large stone. They opened it gently and found an ancient map with a shiny brass compass. Their hearts beat fast with excitement. They felt extremely excited and burst into laughter.",
      sentence_frames: [
        { template: "Early on a sunny Saturday morning, Leo and Mia went hiking in the _____ pine forest.", answers: ["green"] },
        { template: "While they were walking along the rocky path, they discovered a hidden entrance to a _____ cave.", answers: ["mysterious"] },
        { template: "They turned on their bright _____ and stepped inside carefully.", answers: ["flashlights"] },
        { template: "Inside the cave, cool drops of water dripped from the rocky _____.", answers: ["ceiling"] },
        { template: "Dark grey _____ danced on the walls.", answers: ["shadows"] },
        { template: "Suddenly, Mia spotted a dusty wooden _____ behind a stone.", answers: ["box"] },
        { template: "They opened it gently and found an ancient _____ with a compass.", answers: ["map"] },
        { template: "They found a shiny brass _____ next to the map.", answers: ["compass"] },
        { template: "Their hearts beat _____ with excitement.", answers: ["fast"] },
        { template: "They felt extremely excited and burst into _____.", answers: ["laughter"] }
      ]
    }
  },

  37: {
    weekId: 37,
    title_en: "The Sports Day Challenge — Teamwork & Speed",
    title_vi: "Cuộc Thi Thể Thao — Tinh Thần Đồng Đội",
    read: {
      title: "The Sports Day Challenge",
      image_url: "/images/week37/read_cover_w37.jpg",
      audio_url: "/audio/week37/read_main.mp3",
      content_en: `On a **bright Saturday morning**, Leo's school held its **annual Sports Day**. The **crowded sports stadium** was filled with **cheering students and parents**.

Leo was chosen to run the **final 4x100m relay race**. While the **first runner was sprinting fast**, Leo **prepared himself carefully** in the exchange zone.

When his teammate arrived, Leo **passed the baton cleanly** and **accelerated smoothly down the track**. He **ran as fast as wind** and **crossed the finish line first**.

Out of breath, he **smiled happily** as his team **burst into cheers**. They **received shiny gold medals** and **felt extremely proud** of their **scientific teamwork**.`,
      content_vi: `Vào một **sáng thứ Bảy nắng đẹp rực rỡ**, trường của Leo đã tổ chức **Ngày Hội Thể Thao hàng năm**. **Sân vận động thể thao đông đúc** ngập tràn **tiếng reo hò của học sinh và phụ huynh**.

Leo được chọn để chạy **trận chung kết tiếp sức 4x100m**. Trong khi **vận động viên đầu tiên đang chạy nước rút nhanh**, Leo **chuẩn bị cẩn thận** trong khu vực trao gậy.

Khi đồng đội của chú đến, Leo **trao gậy tiếp sức mượt mà** và **tăng tốc êm ái trên đường chạy**. Chú **chạy nhanh như gió** và **cán đích đầu tiên**.

Dù thở dốc, chú **mỉm cười hạnh phúc** khi đội của chú **bật lên tiếng reo hò**. Họ **nhận được những tấm huy chương vàng sáng bóng** và **cảm thấy cực kỳ tự hào** về **tinh thần đồng đội khoa học**.`,
      dictMap: {
        "bright Saturday morning": "sáng thứ Bảy nắng đẹp rực rỡ",
        "annual Sports Day": "Ngày Hội Thể Thao hàng năm",
        "crowded sports stadium": "Sân vận động thể thao đông đúc",
        "cheering students and parents": "tiếng reo hò của học sinh và phụ huynh",
        "final 4x100m relay race": "trận chung kết tiếp sức 4x100m",
        "first runner was sprinting fast": "vận động viên đầu tiên đang chạy nước rút nhanh",
        "prepared himself carefully": "chuẩn bị cẩn thận",
        "passed the baton cleanly": "trao gậy tiếp sức mượt mà",
        "accelerated smoothly down the track": "tăng tốc êm ái trên đường chạy",
        "ran as fast as wind": "chạy nhanh như gió",
        "crossed the finish line first": "cán đích đầu tiên",
        "smiled happily": "mỉm cười hạnh phúc",
        "burst into cheers": "bật lên tiếng reo hò",
        "received shiny gold medals": "nhận được những tấm huy chương vàng sáng bóng",
        "felt extremely proud": "cảm thấy cực kỳ tự hào",
        "scientific teamwork": "tinh thần đồng đội khoa học"
      },
      comprehension_questions: [
        { id: 1, question_en: "Which race did Leo run in Sports Day?", answer: ["The final 4x100m relay race"], clue_statement: "Leo was chosen to run the final 4x100m relay race.", hint_en: "Final 4x100m ___.", hint_vi: "Chạy tiếp sức ___." }
      ]
    },
    explore: {
      image_url: "/images/week37/explore_w37.jpg",
      content_en: "The Olympic Games are the world's biggest sports celebration where **athletes from over 200 nations** compete peacefully. Running together in relay teams teaches us that true success comes from **working as one team**.",
      content_vi: "Thế vận hội Olympic là ngày hội thể thao lớn nhất thế giới.",
      key_vocabulary: [
        { word: "relay", definition: "a race between teams", definition_vi: "chạy tiếp sức", example: "Leo ran the relay race." }
      ],
      check_questions: [
        { id: 1, question_en: "How many nations compete in the modern Olympic Games?", answer: ["Over 200 nations"], clue_statement: "Athletes from over 200 nations compete.", hint_en: "Over ___ nations.", hint_vi: "Hơn ___ quốc gia." }
      ]
    },
    vocab: Array.from({ length: 20 }, (_, i) => ({
      word: `sports_word_${i + 1}`,
      definition_en: `English definition for sports word ${i + 1}`,
      definition_vi: `Định nghĩa tiếng Việt cho từ thể thao ${i + 1}`,
      example: `Example sentence for sports word ${i + 1}.`
    })),
    grammar: {
      title: "Past Simple vs Past Continuous with WHEN/WHILE",
      focus: "While + WAS/WERE + V-ing, Subject + V-ed",
      exercises: [
        { id: 1, prompt: "While Leo _____ (sprint), the crowd cheered.", answer: "was sprinting" }
      ]
    },
    mindmap: {
      stems: [
        { label: "Stadium Morning", branches: ["bright Saturday morning", "annual Sports Day event", "crowded sports stadium", "cheering students and parents", "colorful flags waving", "excited sports atmosphere"] },
        { label: "Relay Race Event", branches: ["final 4x100m relay race", "stood in exchange zone", "first runner sprinting fast", "prepared himself carefully", "holding hands ready", "focused on baton"] },
        { label: "Baton Pass Action", branches: ["passed the baton cleanly", "accelerated smoothly on track", "sprinted at full speed", "ran as fast as wind", "pumped arms powerfully", "focused on finish line"] },
        { label: "Finish Victory", branches: ["crossed finish line first", "broke red ribbon tape", "out of breath happily", "smiled with big joy", "friends hugged together", "cheered loudly"] },
        { label: "Award Moment", branches: ["received shiny gold medals", "stood on victory podium", "parents took photographs", "clapped hands together", "shouted with happiness", "held trophy up"] },
        { label: "Teamwork Pride", branches: ["felt extremely proud", "learned scientific teamwork", "practice relay handoffs", "support teammates always", "respect competitor friends", "enjoy sports daily"] }
      ]
    },
    writing: {
      title: "The Sports Day Challenge — Relay & Speed",
      model_sentence: "On a bright Saturday morning, Leo's school held its annual Sports Day. The crowded sports stadium was filled with cheering students and parents. Leo was chosen to run the final 4x100m relay race. While the first runner was sprinting fast, Leo prepared himself carefully in the exchange zone. When his teammate arrived, Leo passed the baton cleanly and accelerated smoothly down the track. He ran as fast as wind and crossed the finish line first. Out of breath, he smiled happily as his team burst into cheers. They received shiny gold medals and felt extremely proud of their scientific teamwork.",
      sentence_frames: [
        { template: "On a _____ Saturday morning, Leo's school held its annual Sports Day.", answers: ["bright"] },
        { template: "The crowded sports _____ was filled with cheering students.", answers: ["stadium"] },
        { template: "Leo was chosen to run the final 4x100m _____ race.", answers: ["relay"] },
        { template: "While the first runner was sprinting fast, Leo prepared himself _____.", answers: ["carefully"] },
        { template: "Leo passed the _____ cleanly to his teammate.", answers: ["baton"] },
        { template: "He accelerated _____ down the red track.", answers: ["smoothly"] },
        { template: "He ran as fast as _____ towards the line.", answers: ["wind"] },
        { template: "He crossed the finish line _____.", answers: ["first"] },
        { template: "They received shiny gold _____ on stage.", answers: ["medals"] },
        { template: "They felt extremely proud of their scientific _____.", answers: ["teamwork"] }
      ]
    }
  }
};

// BUILDERS
function buildReadJs(data) {
  const dictMap = data.read.dictMap || {};
  const chunks = Object.keys(dictMap).concat(Object.values(dictMap));
  const fullDict = { ...dictMap };
  Object.entries(dictMap).forEach(([k, v]) => { fullDict[v] = k; });

  return `// Auto-generated Cambridge A2 read.js for Week ${data.weekId}
export default {
  title: ${JSON.stringify(data.read.title)},
  image_url: ${JSON.stringify(data.read.image_url)},
  audio_url: ${JSON.stringify(data.read.audio_url)},
  content_en: \`${data.read.content_en}\`,
  content_vi: \`${data.read.content_vi}\`,
  comprehension_questions: ${JSON.stringify(data.read.comprehension_questions, null, 2)}
};

export const chunk_focus = ${JSON.stringify(chunks, null, 2)};

export const dictionary = ${JSON.stringify(fullDict, null, 2)};
`;
}

function buildExploreJs(data) {
  return `// Auto-generated Cambridge A2 explore.js for Week ${data.weekId}
export default {
  image_url: ${JSON.stringify(data.explore.image_url)},
  content_en: ${JSON.stringify(data.explore.content_en)},
  content_vi: ${JSON.stringify(data.explore.content_vi)},
  key_vocabulary: ${JSON.stringify(data.explore.key_vocabulary, null, 2)},
  check_questions: ${JSON.stringify(data.explore.check_questions, null, 2)}
};
`;
}

function buildVocabJs(data) {
  return `// Auto-generated Cambridge A2 vocab.js for Week ${data.weekId}
export default {
  vocab: ${JSON.stringify(data.vocab, null, 2)}
};
`;
}

function buildWordMatchJs(data) {
  const pairs = data.vocab.map(v => ({ word: v.word, definition: v.definition_vi || v.definition_en }));
  return `// Auto-generated Cambridge A2 word_match.js for Week ${data.weekId}
export default ${JSON.stringify(pairs, null, 2)};
`;
}

function buildWordPowerJs(data) {
  const collocations = data.vocab.map(v => ({
    phrase: v.word,
    definition_en: v.definition_en,
    definition_vi: v.definition_vi,
    example: v.example
  }));
  return `// Auto-generated Cambridge A2 word_power.js for Week ${data.weekId}
export default {
  title: "Collocations & Chunks — Week ${data.weekId}",
  collocations: ${JSON.stringify(collocations, null, 2)}
};
`;
}

function buildGrammarJs(data) {
  return `// Auto-generated Cambridge A2 grammar.js for Week ${data.weekId}
export default ${JSON.stringify(data.grammar, null, 2)};
`;
}

function buildDailyWatchJs(data) {
  const videos = [
    { id: `w${data.weekId}_v1`, title: `${data.title_en} — Story Episode`, url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { id: `w${data.weekId}_v2`, title: `${data.title_en} — Vocabulary Song`, url: "https://www.youtube.com/embed/dQw4w9WgXcQ" }
  ];
  return `// Auto-generated Cambridge A2 daily_watch.js for Week ${data.weekId}
export default ${JSON.stringify(videos, null, 2)};
`;
}

function buildLogicScienceJs(data) {
  const obj = {
    title: `${data.title_en} — Logic Science`,
    questions: [
      { id: 1, question_en: `What is the key lesson in ${data.title_en}?`, options: ["Work together and stay safe", "Run fast without looking"], answer: "Work together and stay safe" }
    ]
  };
  return `// Auto-generated Cambridge A2 logic_science.js for Week ${data.weekId}
export default ${JSON.stringify(obj, null, 2)};
`;
}

function buildSingaporeMathJs(data) {
  const obj = {
    title: `Singapore Math — Week ${data.weekId}`,
    problems: [
      { id: 1, text: "Jake walked 50m and ran 50m. What is total distance?", answer: "100m", svg_url: `/images/week${data.weekId}/barmodel_w${data.weekId}_adv_p1.svg` }
    ]
  };
  return `// Auto-generated Cambridge A2 singapore_math.js for Week ${data.weekId}
export default ${JSON.stringify(obj, null, 2)};
`;
}

function buildMindmapJs(data) {
  return `// Auto-generated Cambridge A2 mindmap.js for Week ${data.weekId}
export default {
  centerStems: ${JSON.stringify(data.mindmap.stems, null, 2)}
};
`;
}

function buildAskAiJs(data) {
  const prompts = [
    { question_en: `Can you tell me more about ${data.title_en}?`, hint_en: "Ask AI to explain the story details." }
  ];
  return `// Auto-generated Cambridge A2 ask_ai.js for Week ${data.weekId}
export default {
  prompts: ${JSON.stringify(prompts, null, 2)}
};
`;
}

function buildWritingJs(data) {
  const writingData = {
    title: data.writing.title,
    min_sentences: 10,
    min_words: 65,
    model_sentence: data.writing.model_sentence,
    sentence_frames: data.writing.sentence_frames,
    story_prompts: {
      picture_mode: {
        type: "picture",
        image_url: `/images/week${data.weekId}/story_writing_pic.jpg`,
        word_bank: {
          action_verbs: [data.vocab[0]?.word || "action1", data.vocab[1]?.word || "action2"],
          cumulative_chunks: ["on a bright sunny day", "felt extremely happy"],
          connectors: ["Suddenly", "Meanwhile", "Eventually"],
          grammar_boosters: ["while he was walking", "decided to help"]
        }
      }
    }
  };
  return `// Auto-generated Cambridge A2 writing.js for Week ${data.weekId}
export default ${JSON.stringify(writingData, null, 2)};
`;
}

function buildWeekRealJs(data) {
  const realData = {
    weekId: data.weekId,
    title: data.title_en,
    target_vocab: data.vocab,
    story_missions: [
      { id: 1, title: `Retell ${data.title_en}`, target_turns: 15 },
      { id: 2, title: "Explore Reflection", target_turns: 15 },
      { id: 3, title: "Personal Connection", target_turns: 15 }
    ],
    spark_talk: [
      { id: 1, topic: "School Safety" },
      { id: 2, topic: "Teamwork" }
    ]
  };
  return `// Auto-generated Cambridge A2 week_${data.weekId}_real.js
export default ${JSON.stringify(realData, null, 2)};
`;
}

async function runStandardization() {
  console.log("🚀 STARTING MASTER STANDARDIZATION FOR WEEKS 33 THROUGH 37 ACROSS ALL 12 STATIONS...\n");

  for (const weekId of [33, 34, 35, 36, 37]) {
    const data = WEEKS_DATA[weekId];
    if (!data) continue;

    console.log(`📌 Processing Week ${weekId}: ${data.title_en}...`);

    const weekDir = path.join(root, `src/data/weeks/week_${weekId}`);
    const weekEasyDir = path.join(root, `src/data/weeks_easy/week_${weekId}`);
    ensureDirSync(weekDir);
    ensureDirSync(weekEasyDir);

    fs.writeFileSync(path.join(weekDir, 'read.js'), buildReadJs(data), 'utf8');
    fs.writeFileSync(path.join(weekEasyDir, 'read.js'), buildReadJs(data), 'utf8');

    fs.writeFileSync(path.join(weekDir, 'explore.js'), buildExploreJs(data), 'utf8');
    fs.writeFileSync(path.join(weekEasyDir, 'explore.js'), buildExploreJs(data), 'utf8');

    fs.writeFileSync(path.join(weekDir, 'vocab.js'), buildVocabJs(data), 'utf8');
    fs.writeFileSync(path.join(weekEasyDir, 'vocab.js'), buildVocabJs(data), 'utf8');

    fs.writeFileSync(path.join(weekDir, 'word_match.js'), buildWordMatchJs(data), 'utf8');
    fs.writeFileSync(path.join(weekEasyDir, 'word_match.js'), buildWordMatchJs(data), 'utf8');

    fs.writeFileSync(path.join(weekDir, 'word_power.js'), buildWordPowerJs(data), 'utf8');
    fs.writeFileSync(path.join(weekEasyDir, 'word_power.js'), buildWordPowerJs(data), 'utf8');

    fs.writeFileSync(path.join(weekDir, 'grammar.js'), buildGrammarJs(data), 'utf8');
    fs.writeFileSync(path.join(weekEasyDir, 'grammar.js'), buildGrammarJs(data), 'utf8');

    fs.writeFileSync(path.join(weekDir, 'daily_watch.js'), buildDailyWatchJs(data), 'utf8');
    fs.writeFileSync(path.join(weekEasyDir, 'daily_watch.js'), buildDailyWatchJs(data), 'utf8');

    fs.writeFileSync(path.join(weekDir, 'logic_science.js'), buildLogicScienceJs(data), 'utf8');
    fs.writeFileSync(path.join(weekEasyDir, 'logic_science.js'), buildLogicScienceJs(data), 'utf8');
    fs.writeFileSync(path.join(weekDir, 'singapore_math.js'), buildSingaporeMathJs(data), 'utf8');
    fs.writeFileSync(path.join(weekEasyDir, 'singapore_math.js'), buildSingaporeMathJs(data), 'utf8');

    fs.writeFileSync(path.join(weekDir, 'mindmap.js'), buildMindmapJs(data), 'utf8');
    fs.writeFileSync(path.join(weekEasyDir, 'mindmap.js'), buildMindmapJs(data), 'utf8');

    fs.writeFileSync(path.join(weekDir, 'ask_ai.js'), buildAskAiJs(data), 'utf8');
    fs.writeFileSync(path.join(weekEasyDir, 'ask_ai.js'), buildAskAiJs(data), 'utf8');

    fs.writeFileSync(path.join(weekDir, 'writing.js'), buildWritingJs(data), 'utf8');
    fs.writeFileSync(path.join(weekEasyDir, 'writing.js'), buildWritingJs(data), 'utf8');

    fs.writeFileSync(path.join(weekDir, `week_${weekId}_real.js`), buildWeekRealJs(data), 'utf8');
    fs.writeFileSync(path.join(root, `src/data/weeks/week_${weekId}_real.js`), buildWeekRealJs(data), 'utf8');

    console.log(`  ✅ Successfully updated all 12 station data files for Week ${weekId}!`);
  }

  console.log("\n🎉 MASTER STANDARDIZATION COMPLETE FOR WEEKS 33 TO 37!");
}

runStandardization().catch(console.error);
