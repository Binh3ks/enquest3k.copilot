// WEEK 34: STORYTELLING PRACTICE 1 — The Ant and the Grasshopper
// Explore Station — Easy Mode
// Theme: Storytelling Fable
// Simple version: Fable storytelling and moral lessons
// ~140 words (Blueprint Block E, W32-35)

export default {
  title_en: "The Ant and the Grasshopper Fable",
  title_vi: "Truyện Ngụ Ngôn Con Kiến và Con Châu Chấu",
  content_en: `What is a fable?

A fable is a **short story** that **teaches a lesson**. In a fable, animals can talk and think like people. The most famous fables **come from** a man named Aesop **who lived** a very **long time ago**.

The **ant and the grasshopper** fable:

**Once upon a time**, **there was** a hard-**working ant** and a **lazy grasshopper**. The ant **gathered seeds** **every day** in the summer. It prepared food for the future. The grasshopper only **sang songs** and danced **all day**.



When winter came and frost covered everything, the ant was safe in its warm shelter with **lots of** food. The grasshopper was cold and hungry. It had **nowhere to go** and **nothing to eat**.

The kind ant shared its food with the grasshopper. The grasshopper **learned an important lesson**: always **prepare for the future**!

**Fable lesson**: **work hard** when you can, so you are ready when you need to be.`,
  content_vi: `Fable là gì?

Fable (truyện ngụ ngôn) là một câu chuyện ngắn dạy một bài học. Trong truyện ngụ ngôn, động vật có thể nói chuyện và suy nghĩ như con người. Những truyện ngụ ngôn nổi tiếng nhất đến từ một người đàn ông tên Aesop sống rất lâu trước đây.

Truyện Con Kiến và Con Châu Chấu:

Ngày xửa ngày xưa, có một con kiến chăm chỉ và một con châu chấu lười biếng. Con kiến nhặt hạt mỗi ngày trong mùa hè. Nó chuẩn bị thức ăn cho tương lai. Con châu chấu chỉ hát và nhảy cả ngày.

Khi mùa đông đến và sương giá phủ khắp nơi, con kiến an toàn trong nơi trú ẩn ấm áp với nhiều thức ăn. Con châu chấu lạnh và đói. Nó không có nơi đến và không có gì ăn.

Con kiến tốt bụng chia sẻ thức ăn với con châu chấu. Con châu chấu học được một bài học quan trọng: luôn chuẩn bị cho tương lai!

Bài học: Làm việc chăm chỉ khi có thể, để sẵn sàng khi bạn cần.`,
  audio_narration: "/audio/week34_easy/explore_narration.mp3",
  image_url: "/images/week34/explore_cover_w34.jpg",
  check_questions: [
    {
      id: 1,
      question_en: "Why is The Ant and the Grasshopper called a fable?",
      answer: ["Because it is a short story that teaches a lesson with animals", "It teaches a lesson about animals that can talk", "Fables always have animals as characters who teach a moral"],
      hint_en: "The text says: A ___ is a short story that teaches a ___.",
      hint_vi: "Bài đọc nói: Một ___ là một câu chuyện ngắn dạy một ___.",
      audio_url: "/audio/week34_easy/explore_q1.mp3"
    },
    {
      id: 2,
      question_en: "What was the ant doing while the grasshopper was singing?",
      answer: ["Gathering seeds and preparing food for the future", "The ant was also singing and dancing", "The ant was sleeping in its shelter"],
      hint_en: "The text says: The ant ___ seeds every day and ___ food for the future.",
      hint_vi: "Bài đọc nói: Con kiến ___ hạt mỗi ngày và ___ thức ăn cho tương lai.",
      audio_url: "/audio/week34_easy/explore_q2.mp3"
    },
    {
      id: 3,
      question_en: "What lesson does the fable teach us?",
      answer: ["Always prepare for the future and work hard when you can", "Never sing songs or dance", "Winter is always bad for animals"],
      hint_en: "The grasshopper learned: always ___ for the ___.",
      hint_vi: "Con châu chấu học: luôn ___ cho ___.",
      audio_url: "/audio/week34_easy/explore_q3.mp3"
    },
    {
      id: 99,
      type: "critical_thinking",
      question_en: "Do you think the ant should have shared its food with the grasshopper? Give one reason for your answer.",
      answer: [
        "Yes, because sharing is kind and we should help others even if they made mistakes",
        "No, because the grasshopper was lazy and did not work for its food",
        "Yes, because the ant had enough food to share and it was the right thing to do"
      ],
      hint_en: "Think about the ant's kindness and the grasshopper's mistake.",
      hint_vi: "Hãy nghĩ về lòng tốt của con kiến và sai lầm của con châu chấu.",
      audio_url: "/audio/week34_easy/explore_q4.mp3"
    }
  ],
  writing_prompt_en: "Write 3 things you would do to prepare for a cold winter like the ant. Then write one sentence about whether you would share your food like the ant did.",
  writing_prompt_vi: "Viết 3 điều bạn sẽ làm để chuẩn bị cho mùa đông lạnh như con kiến. Sau đó viết một câu về việc bạn có chia sẻ thức ăn như con kiến không.",
  question: {
    text_en: "What is one lesson from a fable that you try to follow in your life? Why?",
    text_vi: "Bài học nào từ truyện ngụ ngôn mà bạn cố gắng theo trong cuộc sống? Tại sao?",
    min_words: 15,
    hint_en: "I try to ___ because... The Ant and the Grasshopper teaches me to...",
    hint_vi: "Tôi cố gắng ___ vì... Con Kiến và Con Châu Chấu dạy tôi...",
  }
};

export const chunk_focus = [
  "short story",
  "teaches a lesson",
  "come from",
  "who lived",
  "long time ago",
  "ant and the grasshopper",
  "Once upon a time",
  "there was",
  "working ant",
  "lazy grasshopper",
  "gathered seeds",
  "every day",
  "sang songs",
  "all day",
  "lots of",
  "nowhere to go",
  "nothing to eat",
  "learned an important lesson",
  "prepare for the future",
  "Fable lesson",
  "work hard"
];

export const dictionary = {
    'Fable lesson': { word: 'Fable lesson', pronunciation: '/fable lesson/', definition_vi: 'fable lesson', definition_en: 'meaning of fable lesson', example: 'This is an example: fable lesson.' },
    'Once upon a time': { word: 'Once upon a time', pronunciation: '/once upon a time/', definition_vi: 'once upon a time', definition_en: 'meaning of once upon a time', example: 'This is an example: once upon a time.' },
    'all day': { word: 'all day', pronunciation: '/all day/', definition_vi: 'cả ngày', definition_en: 'Multi-word phrase: all day', example: 'The phrase \'all day\' is commonly used in conversation.' },
    'ant and the grasshopper': { word: 'ant and the grasshopper', pronunciation: '/ant and the grasshopper/', definition_vi: 'ant and the grasshopper', definition_en: 'meaning of ant and the grasshopper', example: 'This is an example: ant and the grasshopper.' },
    'come from': { word: 'come from', pronunciation: '/come from/', definition_vi: 'đến từ', definition_en: 'meaning of come from', example: 'This is an example: come from.' },
    'every day': { word: 'every day', pronunciation: '/every day/', definition_vi: 'mỗi ngày', definition_en: 'meaning of every day', example: 'This is my family. My mother is kind. She makes food for us every day. My father is strong. He plays with me in the park.' },
    'gathered seeds': { word: 'gathered seeds', pronunciation: '/gathered seeds/', definition_vi: 'nhặt hạt', definition_en: 'collected seeds from the field', example: 'She gathered seeds and stored food for the coming winter.' },
    'lazy grasshopper': { word: 'lazy grasshopper', pronunciation: '/lazy grasshopper/', definition_vi: 'con châu chấu lười biếng', definition_en: 'Multi-word phrase: lazy grasshopper', example: 'The phrase \'lazy grasshopper\' is commonly used in conversation.' },
    'learned an important lesson': { word: 'learned an important lesson', pronunciation: '/learned an important lesson/', definition_vi: 'học được một bài học quan trọng', definition_en: 'gained understanding of something very important', example: 'The grasshopper learned an important lesson: always work hard.' },
    'long time ago': { word: 'long time ago', pronunciation: '/long time ago/', definition_vi: 'cách đây lâu', definition_en: 'Multi-word phrase: long time ago', example: 'The phrase \'long time ago\' is commonly used in conversation.' },
    'lots of': { word: 'lots of', pronunciation: '/lots of/', definition_vi: '(cụm từ: lots of)', definition_en: 'Multi-word phrase: lots of', example: 'Use of \'lots of\' in natural context.' },
    'nothing to eat': { word: 'nothing to eat', pronunciation: '/nothing to eat/', definition_vi: 'nothing to eat', definition_en: 'meaning of nothing to eat', example: 'This is an example: nothing to eat.' },
    'nowhere to go': { word: 'nowhere to go', pronunciation: '/nowhere to go/', definition_vi: 'nowhere to go', definition_en: 'meaning of nowhere to go', example: 'This is an example: nowhere to go.' },
    'prepare for the future': { word: 'prepare for the future', pronunciation: '/prepare for the future/', definition_vi: 'chuẩn bị cho tương lai', definition_en: 'get ready for what comes next', example: 'Always work hard and prepare for the future.' },
    'sang songs': { word: 'sang songs', pronunciation: '/sang songs/', definition_vi: 'hát ríu rít', definition_en: 'made music with the voice', example: 'The grasshopper jumped around and sang songs all day long.' },
    'short story': { word: 'short story', pronunciation: '/short story/', definition_vi: 'truyện ngắn', definition_en: 'meaning of short story', example: 'This is an example: short story.' },
    'teaches a lesson': { word: 'teaches a lesson', pronunciation: '/teaches a lesson/', definition_vi: 'teaches a lesson', definition_en: 'meaning of teaches a lesson', example: 'This is an example: teaches a lesson.' },
    'there was': { word: 'there was', pronunciation: '/there was/', definition_vi: 'có (nghĩa tồn tại)', definition_en: 'meaning of there was', example: 'There was a big market near the river.' },
    'who lived': { word: 'who lived', pronunciation: '/who lived/', definition_vi: 'người đã sống', definition_en: 'Multi-word phrase: who lived', example: 'The phrase \'who lived\' is commonly used in conversation.' },
    'work hard': { word: 'work hard', pronunciation: '/work hard/', definition_vi: 'làm việc chăm chỉ', definition_en: 'meaning of work hard', example: 'This is an example: work hard.' },
    'working ant': { word: 'working ant', pronunciation: '/working ant/', definition_vi: 'con kiến chăm chỉ', definition_en: 'Multi-word phrase: working ant', example: 'The phrase \'working ant\' is commonly used in conversation.' }
};
