// WEEK 33: THE MISTAKE — Irregular Verbs 5: Accidents
// Explore Station — Easy Mode
// Theme: Staying Safe at School
// Simple version: Personal safety awareness and school rules
// ~140 words (Blueprint Block E, W32-35)

export default {
  title_en: "Staying Safe at School",
  title_vi: "Giữ An Toàn Ở Trường",
  content_en: `Why do **accidents happen** **at school**?

Most school **accidents happen** in the corridor or on the playground. Students run when they are late or excited. But running can be dangerous — you might fall and **get hurt**.

How can we **stay safe**?

1. **Walk carefully** — **always walk**, never run, in the corridor.
2. Look where you are going — watch the floor and the people **in front of** you.
3. **Tell a teacher** if someone gets hurt.
4. **Stay calm** — if you **have an accident**, do not panic.

**What to do** if someone gets hurt:

First, **stay calm**. Then **tell a teacher** or an adult. Do not try to move the injured person. If the person has a bump, a **cold pack** can help. **Put it on** for 15-20 minutes. This helps **reduce swelling**.

Jake's lesson: Jake fell because he **ran in the corridor**. **The nurse** helped him with a **cold pack**. Jake understood that walking carefully is the most important rule. We can all learn from his lesson!`,
  content_vi: `Tại sao tai nạn xảy ra ở trường?

Hầu hết tai nạn xảy ra trong hành lang hoặc sân chơi. Học sinh chạy khi muộn hoặc hào hứng. Nhưng chạy có thể nguy hiểm — bạn có thể ngã và bị thương.

Làm thế nào để giữ an toàn?

1. Đi bộ cẩn thận — luôn đi bộ, không chạy, trong hành lang.
2. Nhìn nơi bạn đang đi — theo dõi sàn và người phía trước.
3. Nói với giáo viên nếu ai đó bị thương.
4. Bình tĩnh — nếu bạn gặp tai nạn, không hoảng loạn.

Làm gì khi ai đó bị thương:

Đầu tiên, bình tĩnh. Sau đó nói với giáo viên hoặc người lớn. Không cố di chuyển người bị thương. Nếu người đó bị va đập, túi chườm lạnh có thể giúp. Đặt lên trong 15-20 phút. Điều này giúp giảm sưng.

Bài học của Jake: Jake ngã vì cậu chạy trong hành lang. Y tá giúp cậu với túi chườm lạnh. Jake hiểu rằng đi bộ cẩn thận là quy tắc quan trọng nhất. Tất cả chúng ta có thể học được từ bài học của cậu ấy!`,
  audio_narration: "/audio/week33_easy/explore_narration.mp3",
  image_url: "https://pub-6b5486dcbb554a6694b6c7032a43dcae.r2.dev/images/week33/explore_cover_w33.jpg",
  check_questions: [
    {
      id: 1,
      question_en: "Why should we walk carefully in the school corridor?",
      answer: ["To stay safe and avoid accidents", "So we do not fall or hurt others", "Running can cause accidents"],
      hint_en: "Think about what happened to Jake.",
      hint_vi: "Hãy nghĩ về chuyện gì đã xảy ra với Jake.",
      audio_url: "/audio/week33_easy/explore_q1.mp3"
    },
    {
      id: 2,
      question_en: "What should you do first if someone gets hurt at school?",
      answer: ["Stay calm and tell a teacher", "Stay calm first", "Call for help from a teacher or adult"],
      hint_en: "The text says: ___ — do not panic. Tell a teacher.",
      hint_vi: "Bài đọc nói: ___ — không hoảng loạn. Nói với giáo viên.",
      audio_url: "/audio/week33_easy/explore_q2.mp3"
    },
    {
      id: 3,
      question_en: "How long should you put a cold pack on a bump or bruise?",
      answer: ["15-20 minutes", "For 15 to 20 minutes", "Put it on for about 15-20 minutes"],
      hint_en: "The text says: Put the cold pack on for ___ minutes.",
      hint_vi: "Bài đọc nói: Đặt túi chườm lạnh trong ___ phút.",
      audio_url: "/audio/week33_easy/explore_q3.mp3"
    },
    {
      id: 99,
      type: "critical_thinking",
      question_en: "Jake ran in the corridor and got hurt. What safety rule should Jake follow next time? Give one reason why this rule is important.",
      answer: [
        "Walk carefully in the corridor because running can cause accidents",
        "Never run in the corridor because you might fall and hurt yourself",
        "Always follow school rules because safety rules keep everyone safe"
      ],
      hint_en: "Think about what happened to Jake and what rule he should follow.",
      hint_vi: "Hãy nghĩ về chuyện gì đã xảy ra với Jake và quy tắc nào cậu nên tuân theo.",
      audio_url: "/audio/week33_easy/explore_q4.mp3"
    }
  ],
  writing_prompt_en: "Write 3 safety rules for the school corridor. Then write one sentence about what you would do if you saw someone get hurt.",
  writing_prompt_vi: "Viết 3 quy tắc an toàn cho hành lang trường. Sau đó viết một câu về điều bạn sẽ làm nếu thấy ai đó bị thương.",
  question: {
    text_en: "What safety rule is most important at YOUR school? Why?",
    text_vi: "Quy tắc an toàn nào quan trọng nhất ở trường của bạn? Tại sao?",
    min_words: 15,
    hint_en: "I think walking carefully is important because... If someone gets hurt, I will...",
    hint_vi: "Tôi nghĩ đi bộ cẩn thận quan trọng vì... Nếu ai đó bị thương, tôi sẽ..."
  }
};

export const chunk_focus = [
  "accidents happen",
  "at school",
  "get hurt",
  "stay safe",
  "Walk carefully",
  "always walk",
  "in front of",
  "Tell a teacher",
  "Stay calm",
  "have an accident",
  "What to do",
  "stay calm",
  "tell a teacher",
  "cold pack",
  "Put it on",
  "reduce swelling",
  "ran in the corridor",
  "The nurse"
];

export const dictionary = {
    'Put it on': { word: 'Put it on', pronunciation: '/put it on/', definition_vi: 'đặt lên trên', definition_en: 'meaning of put it on', example: 'After you wash your hands, put it on the towel to dry them.' },
    'Stay calm': { word: 'Stay calm', pronunciation: '/stay calm/', definition_vi: 'cụm từ vựng: stay calm', definition_en: 'Collocation: stay calm', example: 'The students learned \'stay calm\' in their English lesson.' },
    'Tell a teacher': { word: 'Tell a teacher', pronunciation: '/tell a teacher/', definition_vi: 'kể a teacher', definition_en: 'English phrase: tell a teacher', example: 'The phrase \'tell a teacher\' means kể a teacher.' },
    'The nurse': { word: 'The nurse', pronunciation: '/the nurse/', definition_vi: 'y tá', definition_en: 'meaning of the nurse', example: 'The nurse put a bandage on the child’s scraped knee gently.' },
    'Walk carefully': { word: 'Walk carefully', pronunciation: '/walk carefully/', definition_vi: 'đi cẩn thận', definition_en: 'meaning of walk carefully', example: 'He forgot to walk carefully.' },
    'What to do': { word: 'What to do', pronunciation: '/what to do/', definition_vi: 'what to thực hiện', definition_en: 'English phrase: what to do', example: 'The phrase \'what to do\' means what to thực hiện.' },
    'accidents happen': { word: 'accidents happen', pronunciation: '/accidents happen/', definition_vi: 'tai nạn xảy ra', definition_en: 'meaning of accidents happen', example: 'This is an example: accidents happen.' },
    'always walk': { word: 'always walk', pronunciation: '/always walk/', definition_vi: 'luôn đi bộ', definition_en: 'Multi-word phrase: always walk', example: 'The phrase \'always walk\' is commonly used in conversation.' },
    'at school': { word: 'at school', pronunciation: '/æt skuːl/', definition_vi: 'ở trường học', definition_en: 'English collocation / phrase: at school', example: 'Children learn many subjects at school.' },
    'cold pack': { word: 'cold pack', pronunciation: '/cold pack/', definition_vi: 'túi chườm lạnh', definition_en: 'meaning of cold pack', example: 'The nurse put a cold pack on Jake\'s knee.' },
    'get hurt': { word: 'get hurt', pronunciation: '/get hurt/', definition_vi: 'bị thương', definition_en: 'meaning of get hurt', example: 'This is an example: get hurt.' },
    'have an accident': { word: 'have an accident', pronunciation: '/have an accident/', definition_vi: 'bị tai nạn', definition_en: 'meaning of have an accident', example: 'This is an example: have an accident.' },
    'in front of': { word: 'in front of', pronunciation: '/in front of/', definition_vi: 'phía trước', definition_en: 'meaning of in front of', example: 'This is an example: in front of.' },
    'ran in the corridor': { word: 'ran in the corridor', pronunciation: '/ran in the corridor/', definition_vi: 'chạy trong hành lang', definition_en: 'meaning of ran in the corridor', example: 'You should never run in the corridor because it is dangerous.' },
    'reduce swelling': { word: 'reduce swelling', pronunciation: '/reduce swelling/', definition_vi: 'giảm sưng', definition_en: 'meaning of reduce swelling', example: 'This is an example: reduce swelling.' },
    'stay calm': { word: 'stay calm', pronunciation: '/stay calm/', definition_vi: 'cụm từ vựng: stay calm', definition_en: 'Collocation: stay calm', example: 'The students learned \'stay calm\' in their English lesson.' },
    'stay safe': { word: 'stay safe', pronunciation: '/stay safe/', definition_vi: 'giữ an toàn', definition_en: 'meaning of stay safe', example: 'This is an example: stay safe.' },
    'tell a teacher': { word: 'tell a teacher', pronunciation: '/tell a teacher/', definition_vi: 'kể a teacher', definition_en: 'English phrase: tell a teacher', example: 'The phrase \'tell a teacher\' means kể a teacher.' }
};
