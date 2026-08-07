// WEEK 33: THE MISTAKE — Irregular Verbs 5: Accidents
// Reading Station — Advanced Mode

export default {
  title: "Jake's Bad Day",
  image_url: "/images/week33/read_cover_w33.jpg",
  audio_url: "/audio/week33/read_main.mp3",
  content_en: `Something terrible happened **at school** last Monday. Jake was running in the corridor because he was late for class. He forgot to **walk carefully**.

Suddenly, Jake **hit his knee** on the corner of a table. He **fell down** hard and broke the **glass cup** that another student was holding. His arm hurt when he tried to catch the falling cup.

Jake bit his tongue when he **fell down**, and his hand hit the floor. He began to cry because everything hurt **at once**. **His teacher** **came quickly** and called the school nurse.

**The nurse** **put a cold pack** on Jake's knee and arm. She told Jake it was an **important lesson** — **everyone must** **walk carefully** in the corridor. Jake understood that running in the corridor was dangerous.

**At home**, Jake recovered quickly. He learned one very **important lesson**: always **walk carefully**, even when you are late.`,
  content_vi: `Một điều kinh khủng đã xảy ra ở trường vào thứ Hai tuần trước. Jake đang chạy trong hành lang vì cậu bị muộn. Cậu quên đi cẩn thận.

Đột nhiên, Jake đập đầu gối vào góc bàn. Cậu ngã mạnh xuống và làm vỡ chiếc cốc thủy tinh mà một học sinh khác đang cầm. Cánh tay cậu bị đau khi cậu cố bắt chiếc cốc đang rơi.

Jake cắn lưỡi khi ngã, và bàn tay cậu đập xuống sàn. Cậu bắt đầu khóc vì mọi thứ đau cùng một lúc. Giáo viên đến nhanh và gọi y tá trường.

Y tá đặt túi chườm lạnh lên đầu gối và cánh tay của Jake. Cô ấy nói với Jake đó là một bài học quan trọng — mọi người phải đi cẩn thận trong hành lang. Jake hiểu rằng chạy trong hành lang rất nguy hiểm.

Ở nhà, Jake hồi phục nhanh. Cậu học được một bài học quan trọng: luôn đi cẩn thận, kể cả khi bị muộn.`,
  comprehension_questions: [
    { id: 1, question_en: "Why did Jake run in the corridor?", answer: ["Because he was late"], clue_statement: "Jake was late, so he ran in the corridor.", hint_en: "Jake was ___ , so he ran.", hint_vi: "Jake bi ___ , nen cậu chạy.", audio_url: "/audio/week33/read_q1.mp3" },
    { id: 2, question_en: "What happened when Jake hit the table?", answer: ["He fell down and broke a glass cup", "Jake fell and broke a cup"], clue_statement: "Jake fell down and broke a glass cup when he hit the table.", hint_en: "Jake ___ down and ___ a glass ___.", hint_vi: "Jake ___ xuống và ___ mộtChiếc ___ thủy tinh.", audio_url: "/audio/week33/read_q2.mp3" },
    { id: 3, question_en: "What lesson did Jake learn?", answer: ["Always walk carefully in the corridor", "Walk carefully in the corridor", "Always be careful"], clue_statement: "Jake learned an important lesson: always walk carefully in the corridor.", hint_en: "Always ___ ___ in the ___.", hint_vi: "Luon ___ ___ trong ___.", audio_url: "/audio/week33/read_q3.mp3" }
  ]
};

export const chunk_focus = [
  "at school",
  "walk carefully",
  "hit his knee",
  "fell down",
  "glass cup",
  "at once",
  "His teacher",
  "came quickly",
  "The nurse",
  "put a cold pack",
  "important lesson",
  "everyone must",
  "At home"
];

export const dictionary = {
    'At home': { word: 'At home', pronunciation: '/at home/', definition_vi: 'ở nhà', definition_en: 'meaning of at home', example: 'I have a happy jar at home.' },
    'His teacher': { word: 'His teacher', pronunciation: '/his teacher/', definition_vi: '(cụm từ: his teacher)', definition_en: 'Multi-word phrase: his teacher', example: 'Use of \'his teacher\' in natural context.' },
    'The nurse': { word: 'The nurse', pronunciation: '/the nurse/', definition_vi: 'y tá', definition_en: 'meaning of the nurse', example: 'The nurse put a bandage on the child’s scraped knee gently.' },
    'at once': { word: 'at once', pronunciation: '/at once/', definition_vi: 'ngay lập tức', definition_en: 'meaning of at once', example: 'This is an example: at once.' },
    'at school': { word: 'at school', pronunciation: '/at school/', definition_vi: 'ở trường', definition_en: 'meaning of at school', example: 'At school, there is a whiteboard in the classroom.' },
    'came quickly': { word: 'came quickly', pronunciation: '/came quickly/', definition_vi: 'đến nhanh', definition_en: 'meaning of came quickly', example: 'When the fire alarm rang, the firefighters came quickly with their trucks.' },
    'everyone must': { word: 'everyone must', pronunciation: '/everyone must/', definition_vi: 'mọi người phải', definition_en: 'Multi-word phrase: everyone must', example: 'The phrase \'everyone must\' is commonly used in conversation.' },
    'fell down': { word: 'fell down', pronunciation: '/fell down/', definition_vi: 'ngã xuống', definition_en: 'meaning of fell down', example: 'He fell down hard and broke the glass cup that another student was holding.' },
    'glass cup': { word: 'glass cup', pronunciation: '/glass cup/', definition_vi: 'cốc thủy tinh', definition_en: 'Multi-word phrase: glass cup', example: 'The phrase \'glass cup\' is commonly used in conversation.' },
    'hit his knee': { word: 'hit his knee', pronunciation: '/hit his knee/', definition_vi: 'đập đầu gối', definition_en: 'meaning of hit his knee', example: 'He fell off his bike and hit his knee hard on the ground.' },
    'important lesson': { word: 'important lesson', pronunciation: '/important lesson/', definition_vi: 'bài học quan trọng', definition_en: 'Multi-word phrase: important lesson', example: 'The phrase \'important lesson\' is commonly used in conversation.' },
    'put a cold pack': { word: 'put a cold pack', pronunciation: '/put a cold pack/', definition_vi: 'đặt túi chườm lạnh', definition_en: 'meaning of put a cold pack', example: 'The nurse put a cold pack on his swollen ankle to reduce the pain.' },
    'walk carefully': { word: 'walk carefully', pronunciation: '/walk carefully/', definition_vi: 'đi cẩn thận', definition_en: 'meaning of walk carefully', example: 'He forgot to walk carefully.' }
};
