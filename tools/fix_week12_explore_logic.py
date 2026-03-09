"""Fix Week 12 explore.js schema issues and advanced logic.js MC -> text-input."""
import pathlib

BASE_ADV = pathlib.Path("src/data/weeks/week_12")
BASE_EASY = pathlib.Path("src/data/weeks_easy/week_12")

# ── ADVANCED EXPLORE.JS ───────────────────────────────────────────────────────
# 10 bold words: talents, dance, run, practice, draw, play, skill, sing, perform, tradition
# 10 sentences (Advanced: 8-12 required)
EXPLORE_ADV = r"""export default {
  title_en: "Talents Around the World",
  title_vi: "Tai Nang Tren The Gioi",
  image_url: "/images/week12/explore_cover_w12.jpg",
  audio_url: "/audio/week12/explore_main.mp3",
  content_en: `People around the world have amazing **talents**! In Spain, children learn to **dance** flamenco with passion and energy. In Kenya, many children can **run** long distances every day — they **practice** very hard to build their strength. In Japan, students learn calligraphy and can **draw** beautiful characters with brushes. In Brazil, kids **play** football with incredible **skill** from a very young age. In India, young people **sing** classical music beautifully in large concerts. People from all nations **perform** their special abilities with pride. Every culture has a different **tradition** of celebrating talent. No matter where you live, you can discover and develop your own amazing abilities!`,
  content_vi: `Con nguoi tren the gioi co nhung tai nang tuyet voi! O Tay Ban Nha, tre em hoc nhay flamenco voi dam me va nang luong. O Kenya, nhieu tre em co the chay duong dai moi ngay - chung luyen tap rat cham chi. O Nhat Ban, hoc sinh hoc thu phap va co the ve nhung chu dep. O Brazil, tre em choi bong da voi ky nang dang kinh ngac tu rat nho. O An Do, nguoi tre hat nhac co dien tuyet dep trong nhung buoi hoa nhac lon. Nguoi tu tat ca cac quoc gia bieu dien kha nang dac biet cua ho voi su tu hao. Moi nen van hoa co mot truyen thong khac nhau de ton vinh tai nang. Du ban song o dau, ban cung co the kham pha va phat trien nhung kha nang tuyet voi cua rieng minh!`,
  check_questions: [
    {
      id: 1,
      question_en: "Which country is famous for flamenco dancing?",
      answer: ["Spain"],
      hint_en: "This country is in Europe, famous for this special dance...",
      hint_vi: "Day la mot quoc gia o chau Au, noi tieng voi dieu nhay dac biet nay..."
    },
    {
      id: 2,
      question_en: "What do students in Japan practice with brushes?",
      answer: ["calligraphy", "drawing characters", "calligraphy and drawing"],
      hint_en: "In Japan, students use brushes to draw beautiful writing...",
      hint_vi: "O Nhat Ban, hoc sinh dung but long de ve chu dep..."
    },
    {
      id: 3,
      question_en: "What is the main message of this article?",
      answer: ["people everywhere have talents", "everyone has a talent", "people around the world have amazing talents", "talents"],
      hint_en: "Think about what the last sentence says...",
      hint_vi: "Hay nghi ve dieu cau cuoi muon noi..."
    }
  ],
  question: {
    text_en: "Which country and talent from the article interests you the most? Why?",
    text_vi: "Quoc gia va tai nang nao trong bai viet thu vi nhat doi voi ban? Tai sao?",
    min_words: 30,
    hint_en: "I am interested in... because... I think...",
    hint_vi: "Toi thich... vi... Toi nghi..."
  }
};
"""

# ── EASY EXPLORE.JS ───────────────────────────────────────────────────────────
# 10 bold words: hobbies, sing, dance, ride, draw, pets, swim, cook, try, practice
# 8 sentences (Easy: 6-8 required)
EXPLORE_EASY = r"""export default {
  title_en: "Hobbies I Love",
  title_vi: "So Thich Cua Toi",
  image_url: "/images/week12_easy/explore_cover_w12.jpg",
  audio_url: "/audio/week12_easy/explore_main.mp3",
  content_en: `I have many **hobbies**! I can **sing** my favorite songs at home. I can **dance** when I listen to music. On weekends, I **ride** my bike in the park. Sometimes I **draw** pictures of my family and **pets**. I like to **swim** in the summer. I also **cook** simple food with my mom. I love to **try** new things and **practice** every day!`,
  content_vi: `Toi co nhieu so thich! Toi co the hat nhung bai hat yeu thich o nha. Toi co the nhay khi nghe nhac. Cuoi tuan, toi dap xe trong cong vien. Doi khi toi ve tranh gia dinh va thu cung. Toi thich boi vao mua he. Toi cung nau mon an don gian voi me. Toi thich thu nhung dieu moi va luyen tap moi ngay!`,
  check_questions: [
    {
      id: 1,
      question_en: "What can the writer do when listening to music?",
      answer: ["dance", "dancing"],
      hint_en: "Read the sentence about music...",
      hint_vi: "Doc cau ve nhac..."
    },
    {
      id: 2,
      question_en: "Where does the writer ride a bike?",
      answer: ["in the park", "park"],
      hint_en: "Read the sentence about weekends...",
      hint_vi: "Doc cau ve cuoi tuan..."
    },
    {
      id: 3,
      question_en: "Who does the writer cook food with?",
      answer: ["mom", "my mom", "mother"],
      hint_en: "Read the sentence about cooking...",
      hint_vi: "Doc cau ve nau an..."
    }
  ],
  question: {
    text_en: "What hobbies do YOU have? Write 2 or 3 things you can do.",
    text_vi: "Ban co so thich gi? Viet 2 hoac 3 dieu ban co the lam.",
    min_words: 20,
    hint_en: "I can sing... I can dance... I can...",
    hint_vi: "Toi co the hat... Toi co the nhay... Toi co the..."
  }
};
"""

# ── ADVANCED LOGIC.JS ─────────────────────────────────────────────────────────
# Blueprint: text-input (production of language), NOT MC buttons
# Advanced Phase 1: deductive reasoning with CAN/CANNOT, requires logic chain
LOGIC_ADV = r"""export default {
  puzzles: [
    {
      id: 1,
      question_en: "Sarah can sing. Tom can dance. Singing uses your VOICE. Who performs with voice and music? (Write one name)",
      question_vi: "Sarah co the hat. Tom co the nhay. Hat dung GIONG HAT. Ai bieu dien bang giong hat va am nhac? (Viet mot ten)",
      answer: ["Sarah"],
      hint_en: "Which talent uses the voice? Singing or dancing?",
      hint_vi: "Tai nang nao dung giong hat? Hat hay nhay?",
      audio_url: "/audio/week12/logic_1.mp3"
    },
    {
      id: 2,
      question_en: "Mike can run very fast. Lily can jump very high. They race 100 meters. Running fast wins a race. Who wins? (Write one name)",
      question_vi: "Mike co the chay rat nhanh. Lily co the nhay rat cao. Ho thi chay 100 met. Chay nhanh thang cuoc dua. Ai thang? (Viet mot ten)",
      answer: ["Mike"],
      hint_en: "Running fast helps in a 100-meter race, not jumping high...",
      hint_vi: "Chay nhanh giup ich trong cuoc dua 100 met, khong phai nhay cao...",
      audio_url: "/audio/week12/logic_2.mp3"
    },
    {
      id: 3,
      question_en: "Ben can climb trees with his hands and feet. Emma can ride a bike to school every day. One person's talent uses wheels. Who is it? (Write one name)",
      question_vi: "Ben co the leo cay bang tay va chan. Emma co the di xe dap den truong moi ngay. Mot tai nang dung banh xe. Do la ai? (Viet mot ten)",
      answer: ["Emma"],
      hint_en: "A bike has wheels. Climbing trees does not need wheels...",
      hint_vi: "Xe dap co banh xe. Leo cay khong can banh xe...",
      audio_url: "/audio/week12/logic_3.mp3"
    },
    {
      id: 4,
      question_en: "Jack's talent is drawing colorful pictures on paper. Mia's talent is swimming in a pool. One person's talent cannot happen in a dry room. Who is it? (Write one name)",
      question_vi: "Tai nang cua Jack la ve tranh mau sac tren giay. Tai nang cua Mia la boi loi trong ho. Mot nguoi khong the thuc hien tai nang trong phong kho. Do la ai? (Viet mot ten)",
      answer: ["Mia"],
      hint_en: "Swimming NEEDS water. Drawing on paper does NOT need water...",
      hint_vi: "Boi loi CAN nuoc. Ve tren giay KHONG can nuoc...",
      audio_url: "/audio/week12/logic_4.mp3"
    },
    {
      id: 5,
      question_en: "Anna can sing and cook. Leo can only cook. At a talent show, Anna sings on stage. Leo watches from his seat. Who PERFORMS on stage? (Write one name)",
      question_vi: "Anna co the hat va nau an. Leo chi co the nau an. Tai buoi thi tai nang, Anna hat tren san khau. Leo xem tu ghe ngoi. Ai BIEU DIEN tren san khau? (Viet mot ten)",
      answer: ["Anna"],
      hint_en: "Who sings on stage? Singing on stage is performing...",
      hint_vi: "Ai hat tren san khau? Hat tren san khau la bieu dien...",
      audio_url: "/audio/week12/logic_5.mp3"
    }
  ]
};
"""

(BASE_ADV / "explore.js").write_text(EXPLORE_ADV, encoding="utf-8")
print("Advanced explore.js written OK")

(BASE_EASY / "explore.js").write_text(EXPLORE_EASY, encoding="utf-8")
print("Easy explore.js written OK")

(BASE_ADV / "logic.js").write_text(LOGIC_ADV, encoding="utf-8")
print("Advanced logic.js written OK")

# Verify all UTF-8 clean
for path in [BASE_ADV / "explore.js", BASE_EASY / "explore.js", BASE_ADV / "logic.js"]:
    text = path.read_text(encoding="utf-8")
    print(f"{path}: {len(text)} chars UTF-8 OK")
