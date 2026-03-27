#!/usr/bin/env python3
"""Write all 16 Easy station files + video_queries.json for Week 21."""

import json, os

BASE = "src/data/weeks_easy/week_21"

files = {}

# ─── 1. vocab.js ──────────────────────────────────────────────────────────────
files["vocab.js"] = """\
export default {
  vocab: [
    {
      id: 1,
      word: "walked",
      pronunciation: "/wɔːkt/",
      definition_vi: "đã đi bộ",
      definition_en: "moved on foot in the past",
      example: "I walked to school.",
      collocation: "walked to school",
      image_url: "/images/week21/walked.jpg",
      audio_word: "/audio/week21_easy/vocab_walked.mp3"
    },
    {
      id: 2,
      word: "looked",
      pronunciation: "/lʊkt/",
      definition_vi: "đã nhìn",
      definition_en: "used your eyes to see",
      example: "I looked at the sky.",
      collocation: "looked at",
      image_url: "/images/week21/looked.jpg",
      audio_word: "/audio/week21_easy/vocab_looked.mp3"
    },
    {
      id: 3,
      word: "cooked",
      pronunciation: "/kʊkt/",
      definition_vi: "đã nấu ăn",
      definition_en: "made food with heat",
      example: "My mom cooked dinner.",
      collocation: "cooked dinner",
      image_url: "/images/week21/cooked.jpg",
      audio_word: "/audio/week21_easy/vocab_cooked.mp3"
    },
    {
      id: 4,
      word: "played",
      pronunciation: "/pleɪd/",
      definition_vi: "đã chơi",
      definition_en: "had fun with a game",
      example: "We played in the park.",
      collocation: "played in the park",
      image_url: "/images/week21/played.jpg",
      audio_word: "/audio/week21_easy/vocab_played.mp3"
    },
    {
      id: 5,
      word: "watched",
      pronunciation: "/wɒtʃt/",
      definition_vi: "đã xem",
      definition_en: "looked at something for a while",
      example: "I watched TV.",
      collocation: "watched TV",
      image_url: "/images/week21/watched.jpg",
      audio_word: "/audio/week21_easy/vocab_watched.mp3"
    },
    {
      id: 6,
      word: "cleaned",
      pronunciation: "/kliːnd/",
      definition_vi: "đã dọn dẹp",
      definition_en: "made something tidy",
      example: "I cleaned my room.",
      collocation: "cleaned my room",
      image_url: "/images/week21/cleaned.jpg",
      audio_word: "/audio/week21_easy/vocab_cleaned.mp3"
    },
    {
      id: 7,
      word: "helped",
      pronunciation: "/hɛlpt/",
      definition_vi: "đã giúp đỡ",
      definition_en: "made things easier for someone",
      example: "I helped my mom.",
      collocation: "helped my mom",
      image_url: "/images/week21/helped.jpg",
      audio_word: "/audio/week21_easy/vocab_helped.mp3"
    },
    {
      id: 8,
      word: "talked",
      pronunciation: "/tɔːkt/",
      definition_vi: "đã nói chuyện",
      definition_en: "spoke to someone",
      example: "I talked to my friend.",
      collocation: "talked to",
      image_url: "/images/week21/talked.jpg",
      audio_word: "/audio/week21_easy/vocab_talked.mp3"
    },
    {
      id: 9,
      word: "listened",
      pronunciation: "/ˈlɪsənd/",
      definition_vi: "đã lắng nghe",
      definition_en: "paid attention to a sound",
      example: "I listened to music.",
      collocation: "listened to music",
      image_url: "/images/week21/listened.jpg",
      audio_word: "/audio/week21_easy/vocab_listened.mp3"
    },
    {
      id: 10,
      word: "opened",
      pronunciation: "/ˈoʊpənd/",
      definition_vi: "đã mở",
      definition_en: "made something not closed",
      example: "I opened my book.",
      collocation: "opened the door",
      image_url: "/images/week21/opened.jpg",
      audio_word: "/audio/week21_easy/vocab_opened.mp3"
    },
    {
      id: 11,
      word: "washed",
      pronunciation: "/wɒʃt/",
      definition_vi: "đã rửa",
      definition_en: "cleaned with water",
      example: "I washed my hands.",
      collocation: "washed my hands",
      image_url: "/images/week21/washed.jpg",
      audio_word: "/audio/week21_easy/vocab_washed.mp3"
    },
    {
      id: 12,
      word: "finished",
      pronunciation: "/ˈfɪnɪʃt/",
      definition_vi: "đã hoàn thành",
      definition_en: "completed something",
      example: "I finished my homework.",
      collocation: "finished my homework",
      image_url: "/images/week21/finished.jpg",
      audio_word: "/audio/week21_easy/vocab_finished.mp3"
    },
    {
      id: 13,
      word: "started",
      pronunciation: "/ˈstɑːrtɪd/",
      definition_vi: "đã bắt đầu",
      definition_en: "began something new",
      example: "We started a new game.",
      collocation: "started a new game",
      image_url: "/images/week21/started.jpg",
      audio_word: "/audio/week21_easy/vocab_started.mp3"
    }
  ]
};
"""

# ─── 2. read.js ───────────────────────────────────────────────────────────────
files["read.js"] = """\
export default {
  title: "Max's Diary - Yesterday",
  image_url: "/images/week21/read_cover_w21.jpg",
  content_en: "Yesterday was a fun day! In the morning, I **walked** to school. I **looked** at the blue sky. I **talked** to my friends. At lunchtime, I **helped** my mom. She **cooked** rice and soup. We **cleaned** the table together. In the afternoon, I **played** in the park. I **watched** my friend ride a bike. I **listened** to the birds sing. Then I **washed** my hands. I **finished** my homework. We **started** a new game. Yesterday was the best day!",
  content_vi: "Hôm qua là một ngày vui! Buổi sáng, tôi **đã đi bộ** đến trường. Tôi **đã nhìn** bầu trời xanh. Tôi **đã nói chuyện** với bạn bè. Đến trưa, tôi **đã giúp** mẹ. Mẹ **đã nấu** cơm và súp. Chúng tôi **đã dọn** bàn cùng nhau. Buổi chiều, tôi **đã chơi** ở công viên. Tôi **đã xem** bạn đạp xe. Tôi **đã lắng nghe** tiếng chim hót. Rồi tôi **đã rửa** tay. Tôi **đã hoàn thành** bài tập. Chúng tôi **đã bắt đầu** một trò chơi mới. Hôm qua là ngày tuyệt vời nhất!",
  audio_url: "/audio/week21_easy/read_main.mp3",
  comprehension_questions: [
    { id: 1, question_en: "Where did Max walk in the morning?", answer: ["To school", "He walked to school", "School"], hint_en: "He walked to...", hint_vi: "Cậu ấy đi bộ đến..." },
    { id: 2, question_en: "What did his mom cook?", answer: ["Rice and soup", "She cooked rice and soup"], hint_en: "She cooked...", hint_vi: "Mẹ nấu..." },
    { id: 3, question_en: "What did Max do in the park?", answer: ["He played", "He played in the park", "Played"], hint_en: "He...", hint_vi: "Cậu ấy..." }
  ]
};
"""

# ─── 3. explore.js ────────────────────────────────────────────────────────────
files["explore.js"] = """\
export default {
  title_en: "Time Detectives: How Do Diaries Work?",
  title_vi: "Thám Tử Thời Gian: Nhật Ký Hoạt Động Như Thế Nào?",
  image_url: "/images/week21/explore_cover_w21.jpg",
  audio_url: "/audio/week21_easy/explore_main.mp3",

  content_en: `
    A **diary** is a special book. You write about your day in it.

    Every day, you do many things. You **walk**, **talk**, **eat**, and **play**.
    After the day is **finished**, you write it in your diary!

    You use past tense: "I **walked**. I **played**. I **cooked**."

    Diaries help you remember happy days. They are like a time machine for your memories!

    Scientists also keep diaries. They write what they **watched** and **listened** to.
    This is called a **science log**!

    Time detectives read old diaries. They find clues about the past.
    Can you be a time detective? Look at the clues: "I **cleaned** my room. I **helped** my mom."
    What kind of day was it?
  `,

  content_vi: `
    **Nhật ký** là một cuốn sách đặc biệt. Bạn viết về ngày của mình trong đó.

    Mỗi ngày, bạn làm nhiều việc. Bạn **đi bộ**, **nói chuyện**, **ăn**, và **chơi**.
    Sau khi ngày **kết thúc**, bạn viết vào nhật ký!

    Bạn dùng thì quá khứ: "Tôi **đã đi bộ**. Tôi **đã chơi**. Tôi **đã nấu**."

    Nhật ký giúp bạn nhớ những ngày vui. Chúng giống như cỗ máy thời gian cho ký ức của bạn!

    Các nhà khoa học cũng giữ nhật ký. Họ viết những gì họ **đã xem** và **đã lắng nghe**.
    Điều này gọi là **nhật ký khoa học**!

    Các thám tử thời gian đọc nhật ký cũ. Họ tìm manh mối về quá khứ.
    Bạn có thể là thám tử thời gian không?
  `,

  check_questions: [
    {
      id: 1,
      question_en: "What do you write in a diary?",
      question_vi: "Bạn viết gì trong nhật ký?",
      answer: ["About your day", "Your day", "What you did"],
      hint_en: "A...",
      hint_vi: "Về..."
    },
    {
      id: 2,
      question_en: "What tense do you use in a diary?",
      question_vi: "Bạn dùng thì nào trong nhật ký?",
      answer: ["Past tense", "Past"],
      hint_en: "P...",
      hint_vi: "Thì..."
    },
    {
      id: 3,
      question_en: "What is a science log?",
      question_vi: "Nhật ký khoa học là gì?",
      answer: ["A diary for scientists", "Scientists write what they watched"],
      hint_en: "A diary...",
      hint_vi: "Nhật ký..."
    }
  ],

  question: {
    text_en: "If you wrote a diary about yesterday, what would you write?",
    text_vi: "Nếu bạn viết nhật ký về hôm qua, bạn sẽ viết gì?",
    min_words: 15,
    hint_en: "Yesterday, I walked...",
    hint_vi: "Hôm qua, tôi đã..."
  }
};
"""

# ─── 4. grammar.js ────────────────────────────────────────────────────────────
files["grammar.js"] = """\
export default {
  grammar_explanation: {
    title_en: "Past Simple: I walked",
    title_vi: "Thì Quá Khứ Đơn: I walked",
    rules: [
      {
        id: 1,
        rule_en: "Add -ed to make past: walk → walked",
        rule_vi: "Thêm -ed để tạo quá khứ: walk → walked",
        example_en: "I walked to school.",
        example_vi: "Tôi đã đi bộ đến trường."
      },
      {
        id: 2,
        rule_en: "I/You/He/She/We/They + verb-ed",
        rule_vi: "I/You/He/She/We/They + động từ-ed",
        example_en: "She cooked dinner.",
        example_vi: "Cô ấy đã nấu bữa tối."
      },
      {
        id: 3,
        rule_en: "Time words: yesterday, last night, in the morning",
        rule_vi: "Từ chỉ thời gian: yesterday, last night, in the morning",
        example_en: "Yesterday, I played in the park.",
        example_vi: "Hôm qua, tôi đã chơi trong công viên."
      }
    ]
  },
  exercises: [
    { id: 1, type: "fill", question: "Yesterday, I ___ (walk) to school.", answer: "walked", hint: "walk → walked" },
    { id: 2, type: "fill", question: "She ___ (cook) dinner last night.", answer: "cooked", hint: "cook → cooked" },
    { id: 3, type: "fill", question: "We ___ (play) in the park.", answer: "played", hint: "play → played" },
    { id: 4, type: "fill", question: "He ___ (watch) TV yesterday.", answer: "watched", hint: "watch → watched" },
    { id: 5, type: "fill", question: "I ___ (clean) my room.", answer: "cleaned", hint: "clean → cleaned" },
    { id: 6, type: "fill", question: "They ___ (help) their mom.", answer: "helped", hint: "help → helped" },
    { id: 7, type: "fill", question: "She ___ (talk) to her friend.", answer: "talked", hint: "talk → talked" },
    { id: 8, type: "fill", question: "I ___ (listen) to music.", answer: "listened", hint: "listen → listened" },
    { id: 9, type: "fill", question: "He ___ (open) the door.", answer: "opened", hint: "open → opened" },
    { id: 10, type: "fill", question: "We ___ (wash) our hands.", answer: "washed", hint: "wash → washed" },
    { id: 11, type: "mc", question: "I ___ my homework last night.", options: ["finish", "finished", "finishing"], answer: "finished", hint: "past tense" },
    { id: 12, type: "mc", question: "The game ___ at 3 o'clock.", options: ["start", "started", "starting"], answer: "started", hint: "past tense" },
    { id: 13, type: "fill", question: "He ___ (look) at the stars.", answer: "looked", hint: "look → looked" },
    { id: 14, type: "fill", question: "She ___ (finish) early.", answer: "finished", hint: "finish → finished" },
    { id: 15, type: "mc", question: "Yesterday, we ___ soccer.", options: ["play", "played", "plays"], answer: "played", hint: "yesterday = past" },
    { id: 16, type: "unscramble", question: "Order:", words: ["walked", "I", "school", "to"], answer: "I walked to school.", hint: "I walked..." },
    { id: 17, type: "unscramble", question: "Order:", words: ["dinner", "cooked", "Mom"], answer: "Mom cooked dinner.", hint: "Mom cooked..." },
    { id: 18, type: "fill", question: "The birds ___ (start) to sing.", answer: "started", hint: "start → started" },
    { id: 19, type: "fill", question: "We ___ (clean) the table.", answer: "cleaned", hint: "clean → cleaned" },
    { id: 20, type: "unscramble", question: "Order:", words: ["I", "music", "listened", "to"], answer: "I listened to music.", hint: "I listened..." }
  ]
};
"""

# ─── 5. word_power.js ─────────────────────────────────────────────────────────
files["word_power.js"] = """\
export default {
  words: [
    {
      id: 1,
      word: "walked to school",
      pronunciation: "/wɔːkt tə skuːl/",
      cefr_level: "A1",
      definition_en: "went to school on foot",
      definition_vi: "đi bộ đến trường",
      example: "I walked to school yesterday.",
      model_sentence: "I walked to school with my friend every morning.",
      collocation: "walked to school",
      image_url: "/images/week21/wordpower_walked_to_school.jpg",
      audio_word: "/audio/week21_easy/wordpower_walked_to_school.mp3",
      audio_definition: "/audio/week21_easy/wordpower_def_walked_to_school.mp3",
      audio_example: "/audio/week21_easy/wordpower_ex_walked_to_school.mp3",
      audio_collocation: "/audio/week21_easy/wordpower_coll_walked_to_school.mp3",
      audio_model: "/audio/week21_easy/wordpower_model_walked_to_school.mp3"
    },
    {
      id: 2,
      word: "played with friends",
      pronunciation: "/pleɪd wɪð frɛndz/",
      cefr_level: "A1",
      definition_en: "had fun together with friends",
      definition_vi: "chơi cùng bạn bè",
      example: "I played with friends in the park.",
      model_sentence: "I played with friends and we had lots of fun.",
      collocation: "played with friends",
      image_url: "/images/week21/wordpower_played_with_friends.jpg",
      audio_word: "/audio/week21_easy/wordpower_played_with_friends.mp3",
      audio_definition: "/audio/week21_easy/wordpower_def_played_with_friends.mp3",
      audio_example: "/audio/week21_easy/wordpower_ex_played_with_friends.mp3",
      audio_collocation: "/audio/week21_easy/wordpower_coll_played_with_friends.mp3",
      audio_model: "/audio/week21_easy/wordpower_model_played_with_friends.mp3"
    },
    {
      id: 3,
      word: "watched TV",
      pronunciation: "/wɒtʃt tiːˈviː/",
      cefr_level: "A1",
      definition_en: "looked at the television",
      definition_vi: "xem TV",
      example: "I watched TV after dinner.",
      model_sentence: "I watched TV with my family last night.",
      collocation: "watched TV",
      image_url: "/images/week21/wordpower_watched_tv.jpg",
      audio_word: "/audio/week21_easy/wordpower_watched_tv.mp3",
      audio_definition: "/audio/week21_easy/wordpower_def_watched_tv.mp3",
      audio_example: "/audio/week21_easy/wordpower_ex_watched_tv.mp3",
      audio_collocation: "/audio/week21_easy/wordpower_coll_watched_tv.mp3",
      audio_model: "/audio/week21_easy/wordpower_model_watched_tv.mp3"
    },
    {
      id: 4,
      word: "cleaned my room",
      pronunciation: "/kliːnd maɪ ruːm/",
      cefr_level: "A1",
      definition_en: "made my room tidy",
      definition_vi: "dọn dẹp phòng của tôi",
      example: "I cleaned my room before dinner.",
      model_sentence: "I cleaned my room and my mom was very happy.",
      collocation: "cleaned my room",
      image_url: "/images/week21/wordpower_cleaned_my_room.jpg",
      audio_word: "/audio/week21_easy/wordpower_cleaned_my_room.mp3",
      audio_definition: "/audio/week21_easy/wordpower_def_cleaned_my_room.mp3",
      audio_example: "/audio/week21_easy/wordpower_ex_cleaned_my_room.mp3",
      audio_collocation: "/audio/week21_easy/wordpower_coll_cleaned_my_room.mp3",
      audio_model: "/audio/week21_easy/wordpower_model_cleaned_my_room.mp3"
    },
    {
      id: 5,
      word: "listened to music",
      pronunciation: "/ˈlɪsənd tə ˈmjuːzɪk/",
      cefr_level: "A1",
      definition_en: "heard and enjoyed music",
      definition_vi: "nghe nhạc",
      example: "I listened to music in my room.",
      model_sentence: "I listened to music and danced with my sister.",
      collocation: "listened to music",
      image_url: "/images/week21/wordpower_listened_to_music.jpg",
      audio_word: "/audio/week21_easy/wordpower_listened_to_music.mp3",
      audio_definition: "/audio/week21_easy/wordpower_def_listened_to_music.mp3",
      audio_example: "/audio/week21_easy/wordpower_ex_listened_to_music.mp3",
      audio_collocation: "/audio/week21_easy/wordpower_coll_listened_to_music.mp3",
      audio_model: "/audio/week21_easy/wordpower_model_listened_to_music.mp3"
    },
    {
      id: 6,
      word: "finished my homework",
      pronunciation: "/ˈfɪnɪʃt maɪ ˈhoʊmwɜːrk/",
      cefr_level: "A1",
      definition_en: "completed all my schoolwork",
      definition_vi: "hoàn thành bài tập về nhà",
      example: "I finished my homework at 5 pm.",
      model_sentence: "I finished my homework and then I played outside.",
      collocation: "finished my homework",
      image_url: "/images/week21/wordpower_finished_my_homework.jpg",
      audio_word: "/audio/week21_easy/wordpower_finished_my_homework.mp3",
      audio_definition: "/audio/week21_easy/wordpower_def_finished_my_homework.mp3",
      audio_example: "/audio/week21_easy/wordpower_ex_finished_my_homework.mp3",
      audio_collocation: "/audio/week21_easy/wordpower_coll_finished_my_homework.mp3",
      audio_model: "/audio/week21_easy/wordpower_model_finished_my_homework.mp3"
    }
  ]
};
"""

# ─── 6. word_match.js ─────────────────────────────────────────────────────────
files["word_match.js"] = """\
export default {
  pairs: [
    { left_id: 1, right_match: "moved on foot in the past" },
    { left_id: 2, right_match: "used your eyes to see" },
    { left_id: 3, right_match: "made food with heat" },
    { left_id: 4, right_match: "had fun with a game" },
    { left_id: 5, right_match: "looked at something for a while" },
    { left_id: 6, right_match: "made something tidy" },
    { left_id: 7, right_match: "made things easier for someone" },
    { left_id: 8, right_match: "spoke to someone" },
    { left_id: 9, right_match: "paid attention to a sound" },
    { left_id: 10, right_match: "made something not closed" },
    { left_id: 11, right_match: "cleaned with water" },
    { left_id: 12, right_match: "completed something" },
    { left_id: 13, right_match: "began something new" }
  ]
};
"""

# ─── 7. ask_ai.js ─────────────────────────────────────────────────────────────
files["ask_ai.js"] = """\
export default {
  prompts: [
    {
      id: 1,
      context_en: "Your friend wrote in their diary: 'I walked to school.' You want to know WHERE they walked to. Ask them.",
      context_vi: "Bạn viết trong nhật ký: 'Tôi đã đi bộ đến trường.' Bạn muốn biết họ đi bộ ĐẾN ĐÂU. Hỏi họ.",
      audio_url: "/audio/week21_easy/ask_ai_1.mp3",
      answer: ["Where did you walk?", "Where did you walk to?", "Did you walk to school?"],
      hint: "Where did you..."
    },
    {
      id: 2,
      context_en: "Max says: 'I cooked something yesterday.' You want to know WHAT he cooked. Ask him.",
      context_vi: "Max nói: 'Hôm qua tôi đã nấu gì đó.' Bạn muốn biết anh ấy đã nấu GÌ. Hỏi anh ấy.",
      audio_url: "/audio/week21_easy/ask_ai_2.mp3",
      answer: ["What did you cook?", "What did you make?"],
      hint: "What did you..."
    },
    {
      id: 3,
      context_en: "Your sister says she played a game yesterday. You want to know WHO she played with. Ask her.",
      context_vi: "Chị bạn nói chị đã chơi trò chơi hôm qua. Bạn muốn biết chị đã chơi VỚI AI. Hỏi chị.",
      audio_url: "/audio/week21_easy/ask_ai_3.mp3",
      answer: ["Who did you play with?", "Who was playing with you?"],
      hint: "Who did you..."
    },
    {
      id: 4,
      context_en: "Your friend says they watched something last night. You want to know WHAT they watched. Ask them.",
      context_vi: "Bạn của bạn nói họ đã xem gì đó tối qua. Bạn muốn biết họ đã xem GÌ. Hỏi họ.",
      audio_url: "/audio/week21_easy/ask_ai_4.mp3",
      answer: ["What did you watch?", "What did you watch last night?"],
      hint: "What did you..."
    },
    {
      id: 5,
      context_en: "You see Max write in a diary. You want to know WHY he writes in a diary. Ask him.",
      context_vi: "Bạn thấy Max viết nhật ký. Bạn muốn biết TẠI SAO anh ấy viết nhật ký. Hỏi anh ấy.",
      audio_url: "/audio/week21_easy/ask_ai_5.mp3",
      answer: ["Why do you write a diary?", "Why are you writing a diary?", "Why did you write that?"],
      hint: "Why do you..."
    }
  ]
};
"""

# ─── 8. dictation.js ──────────────────────────────────────────────────────────
files["dictation.js"] = """\
// ✅ EXTRACTED FROM read.js - Max's Diary - Yesterday (100% extraction per Mass Production rules)
export default {
  sentences: [
    { id: 1, text: "Yesterday was a fun day!" },
    { id: 2, text: "In the morning, I walked to school." },
    { id: 3, text: "I looked at the blue sky." },
    { id: 4, text: "I talked to my friends." },
    { id: 5, text: "At lunchtime, I helped my mom." },
    { id: 6, text: "She cooked rice and soup." },
    { id: 7, text: "We cleaned the table together." },
    { id: 8, text: "In the afternoon, I played in the park." },
    { id: 9, text: "I watched my friend ride a bike." },
    { id: 10, text: "I listened to the birds sing." },
    { id: 11, text: "Then I washed my hands." },
    { id: 12, text: "I finished my homework." },
    { id: 13, text: "We started a new game." },
    { id: 14, text: "Yesterday was the best day!" }
  ]
};
"""

# ─── 9. shadowing.js ──────────────────────────────────────────────────────────
files["shadowing.js"] = """\
// ✅ EXTRACTED FROM read.js - Max's Diary - Yesterday (100% extraction per Mass Production rules)
// 🔧 audio_url removed — TTS generates on-demand with voiceConfig (Neural2-F → aura-asteria-en)
export default {
  title: "Max's Diary - Yesterday",
  script: [
    { id: 1, text: "Yesterday was a fun day!", vi: "Hôm qua là một ngày vui!" },
    { id: 2, text: "In the morning, I walked to school.", vi: "Buổi sáng, tôi đã đi bộ đến trường." },
    { id: 3, text: "I looked at the blue sky.", vi: "Tôi đã nhìn bầu trời xanh." },
    { id: 4, text: "I talked to my friends.", vi: "Tôi đã nói chuyện với bạn bè." },
    { id: 5, text: "At lunchtime, I helped my mom.", vi: "Đến trưa, tôi đã giúp mẹ." },
    { id: 6, text: "She cooked rice and soup.", vi: "Mẹ đã nấu cơm và súp." },
    { id: 7, text: "We cleaned the table together.", vi: "Chúng tôi đã dọn bàn cùng nhau." },
    { id: 8, text: "In the afternoon, I played in the park.", vi: "Buổi chiều, tôi đã chơi ở công viên." },
    { id: 9, text: "I watched my friend ride a bike.", vi: "Tôi đã xem bạn đạp xe." },
    { id: 10, text: "I listened to the birds sing.", vi: "Tôi đã lắng nghe tiếng chim hót." },
    { id: 11, text: "Then I washed my hands.", vi: "Rồi tôi đã rửa tay." },
    { id: 12, text: "I finished my homework.", vi: "Tôi đã hoàn thành bài tập." },
    { id: 13, text: "We started a new game.", vi: "Chúng tôi đã bắt đầu một trò chơi mới." },
    { id: 14, text: "Yesterday was the best day!", vi: "Hôm qua là ngày tuyệt vời nhất!" }
  ]
};
"""

# ─── 10. writing.js ───────────────────────────────────────────────────────────
files["writing.js"] = """\
export default {
  title: "My Yesterday",
  min_words: 30,
  model_sentence: "Yesterday was great! I walked to school. I talked to my friends. I helped my mom. She cooked dinner. I finished my homework. I listened to music and watched TV. It was a wonderful day!",
  instruction_en: "Write about your yesterday. What did you do?",
  instruction_vi: "Viết về hôm qua của bạn. Bạn đã làm gì?",
  prompt_en: "What did you do yesterday? Use -ed verbs!",
  prompt_vi: "Bạn đã làm gì hôm qua? Dùng động từ thêm -ed!",
  keywords: ["walked", "talked", "played", "cooked", "cleaned", "helped", "watched", "listened", "washed", "finished", "started", "looked", "opened"]
};
"""

# ─── 11. mindmap.js ───────────────────────────────────────────────────────────
files["mindmap.js"] = """\
const mindMapContent = {
  centerStems: [
    { text: "Yesterday, I ___.", audio: "/audio/week21_easy/mindmap_stem_1.mp3" },
    { text: "My friend ___.", audio: "/audio/week21_easy/mindmap_stem_2.mp3" },
    { text: "In the morning, I ___.", audio: "/audio/week21_easy/mindmap_stem_3.mp3" },
    { text: "I really enjoy ___.", audio: "/audio/week21_easy/mindmap_stem_4.mp3" },
    { text: "At home, I ___.", audio: "/audio/week21_easy/mindmap_stem_5.mp3" },
    { text: "My best day ___.", audio: "/audio/week21_easy/mindmap_stem_6.mp3" }
  ],
  branchLabels: {
    "Yesterday, I ___.": [
      { text: "walked to school", audio: "/audio/week21_easy/mindmap_branch_1.mp3" },
      { text: "played in the park", audio: "/audio/week21_easy/mindmap_branch_2.mp3" },
      { text: "watched TV", audio: "/audio/week21_easy/mindmap_branch_3.mp3" },
      { text: "listened to music", audio: "/audio/week21_easy/mindmap_branch_4.mp3" },
      { text: "finished my homework", audio: "/audio/week21_easy/mindmap_branch_5.mp3" },
      { text: "cleaned my room", audio: "/audio/week21_easy/mindmap_branch_6.mp3" }
    ],
    "My friend ___.": [
      { text: "talked to me", audio: "/audio/week21_easy/mindmap_branch_7.mp3" },
      { text: "played with me", audio: "/audio/week21_easy/mindmap_branch_8.mp3" },
      { text: "helped me", audio: "/audio/week21_easy/mindmap_branch_9.mp3" },
      { text: "looked at the stars", audio: "/audio/week21_easy/mindmap_branch_10.mp3" },
      { text: "started a game", audio: "/audio/week21_easy/mindmap_branch_11.mp3" },
      { text: "walked with me", audio: "/audio/week21_easy/mindmap_branch_12.mp3" }
    ],
    "In the morning, I ___.": [
      { text: "walked to school", audio: "/audio/week21_easy/mindmap_branch_13.mp3" },
      { text: "looked at the sky", audio: "/audio/week21_easy/mindmap_branch_14.mp3" },
      { text: "opened my window", audio: "/audio/week21_easy/mindmap_branch_15.mp3" },
      { text: "talked to mom", audio: "/audio/week21_easy/mindmap_branch_16.mp3" },
      { text: "washed my face", audio: "/audio/week21_easy/mindmap_branch_17.mp3" },
      { text: "started my day", audio: "/audio/week21_easy/mindmap_branch_18.mp3" }
    ],
    "I really enjoy ___.": [
      { text: "playing in the park", audio: "/audio/week21_easy/mindmap_branch_19.mp3" },
      { text: "watching movies", audio: "/audio/week21_easy/mindmap_branch_20.mp3" },
      { text: "listening to music", audio: "/audio/week21_easy/mindmap_branch_21.mp3" },
      { text: "talking to friends", audio: "/audio/week21_easy/mindmap_branch_22.mp3" },
      { text: "helping my mom", audio: "/audio/week21_easy/mindmap_branch_23.mp3" },
      { text: "cooking with dad", audio: "/audio/week21_easy/mindmap_branch_24.mp3" }
    ],
    "At home, I ___.": [
      { text: "cleaned my room", audio: "/audio/week21_easy/mindmap_branch_25.mp3" },
      { text: "helped with dinner", audio: "/audio/week21_easy/mindmap_branch_26.mp3" },
      { text: "washed the dishes", audio: "/audio/week21_easy/mindmap_branch_27.mp3" },
      { text: "finished my homework", audio: "/audio/week21_easy/mindmap_branch_28.mp3" },
      { text: "talked to my family", audio: "/audio/week21_easy/mindmap_branch_29.mp3" },
      { text: "watched a movie", audio: "/audio/week21_easy/mindmap_branch_30.mp3" }
    ],
    "My best day ___.": [
      { text: "was yesterday", audio: "/audio/week21_easy/mindmap_branch_31.mp3" },
      { text: "happened last week", audio: "/audio/week21_easy/mindmap_branch_32.mp3" },
      { text: "started early", audio: "/audio/week21_easy/mindmap_branch_33.mp3" },
      { text: "included my friends", audio: "/audio/week21_easy/mindmap_branch_34.mp3" },
      { text: "ended with stars", audio: "/audio/week21_easy/mindmap_branch_35.mp3" },
      { text: "made me happy", audio: "/audio/week21_easy/mindmap_branch_36.mp3" }
    ]
  }
};

export default mindMapContent;
"""

# ─── 12. daily_watch.js ───────────────────────────────────────────────────────
files["daily_watch.js"] = """\
export default {
  videos: [
    { id: 1, title: "Past Tense Song for Kids | -ed Verbs | Jack Hartmann", videoId: "T0v3u2_hRjI", duration: "03:15", sim_duration: 195, thumb: "https://img.youtube.com/vi/T0v3u2_hRjI/mqdefault.jpg" },
    { id: 2, title: "Past Simple Regular Verbs | Easy English for Kids", videoId: "M6VsBhkfvPA", duration: "04:02", sim_duration: 242, thumb: "https://img.youtube.com/vi/M6VsBhkfvPA/mqdefault.jpg" },
    { id: 3, title: "My Day - Daily Routine Story for Kids | ESL Read Aloud", videoId: "YSLfSO0_N1Y", duration: "03:48", sim_duration: 228, thumb: "https://img.youtube.com/vi/YSLfSO0_N1Y/mqdefault.jpg" },
    { id: 4, title: "Yesterday Song for Kids | What Did You Do Yesterday?", videoId: "RqvMWCgxkDk", duration: "02:45", sim_duration: 165, thumb: "https://img.youtube.com/vi/RqvMWCgxkDk/mqdefault.jpg" },
    { id: 5, title: "What is a Diary? | Science Log for Kids | Easy Science", videoId: "2Byx7jPvvdI", duration: "04:30", sim_duration: 270, thumb: "https://img.youtube.com/vi/2Byx7jPvvdI/mqdefault.jpg" }
  ],
  bonus_games: [{title: "Game", url: "#", description: "Review"}]
};
"""

# ─── 13. logic_science.js ─────────────────────────────────────────────────────
files["logic_science.js"] = """\
export default {
  questions: [
    {
      id: 1,
      question_en: "Max walked to school. He arrived at 7:30. School started at 8:00. Was he early?",
      question_vi: "Max đã đi bộ đến trường. Anh ấy đến lúc 7:30. Trường bắt đầu lúc 8:00. Anh ấy có đến sớm không?",
      options_en: ["A. Yes", "B. No", "C. On time", "D. Late"],
      options_vi: ["A. Có", "B. Không", "C. Đúng giờ", "D. Trễ"],
      correct_answer: "A",
      explanation_en: "7:30 is before 8:00. So Max arrived early!",
      explanation_vi: "7:30 trước 8:00. Vậy Max đến sớm!",
      audio_url: "/audio/week21_easy/logic_q1.mp3"
    },
    {
      id: 2,
      question_en: "Anna cooked 4 cups of rice. Her family ate 3 cups. How many cups are left?",
      question_vi: "Anna đã nấu 4 bát cơm. Gia đình cô ăn 3 bát. Còn lại bao nhiêu bát?",
      options_en: ["A. 1 cup", "B. 2 cups", "C. 7 cups", "D. 4 cups"],
      options_vi: ["A. 1 bát", "B. 2 bát", "C. 7 bát", "D. 4 bát"],
      correct_answer: "A",
      explanation_en: "4 - 3 = 1. There is 1 cup of rice left.",
      explanation_vi: "4 - 3 = 1. Còn lại 1 bát cơm.",
      audio_url: "/audio/week21_easy/logic_q2.mp3"
    },
    {
      id: 3,
      question_en: "Tom cleaned 2 rooms. Lisa cleaned 3 rooms. Who cleaned more rooms?",
      question_vi: "Tom đã dọn 2 phòng. Lisa đã dọn 3 phòng. Ai dọn nhiều phòng hơn?",
      options_en: ["A. Tom", "B. Lisa", "C. Same", "D. No one"],
      options_vi: ["A. Tom", "B. Lisa", "C. Bằng nhau", "D. Không ai"],
      correct_answer: "B",
      explanation_en: "Lisa cleaned 3 rooms. Tom cleaned 2. 3 is more than 2. Lisa cleaned more!",
      explanation_vi: "Lisa dọn 3 phòng. Tom dọn 2. 3 nhiều hơn 2. Lisa dọn nhiều hơn!",
      audio_url: "/audio/week21_easy/logic_q3.mp3"
    }
  ]
};
"""

# ─── 14. singapore_math.js ────────────────────────────────────────────────────
files["singapore_math.js"] = """\
export default {
  problems: [
    {
      id: 1,
      type: "part_whole",
      question_en: "Max drew 3 circles and 4 squares yesterday. How many shapes did he draw in total?",
      question_vi: "Max đã vẽ 3 hình tròn và 4 hình vuông hôm qua. Tổng cộng anh ấy đã vẽ bao nhiêu hình?",
      answer: ["7", "seven", "7 shapes"],
      bar_model: "/images/week21/barmodel_w21_p1.jpg",
      cpa_stage: "pictorial",
      math_vocab: ["total", "add", "shapes"],
      hint_en: "3 + 4 = ?",
      hint_vi: "3 + 4 = ?",
      audio_url: "/audio/week21_easy/singapore_math_q1.mp3"
    },
    {
      id: 2,
      type: "comparison",
      question_en: "Anna finished 8 pages of homework. Ben finished 5 pages. How many more pages did Anna finish?",
      question_vi: "Anna đã làm xong 8 trang bài tập. Ben làm xong 5 trang. Anna làm nhiều hơn bao nhiêu trang?",
      answer: ["3", "three", "3 pages"],
      bar_model: "/images/week21/barmodel_w21_p2.jpg",
      cpa_stage: "pictorial",
      math_vocab: ["more than", "difference", "pages"],
      hint_en: "8 - 5 = ?",
      hint_vi: "8 - 5 = ?",
      audio_url: "/audio/week21_easy/singapore_math_q2.mp3"
    },
    {
      id: 3,
      type: "part_whole",
      question_en: "Mom cooked 2 dishes in the morning and 3 dishes in the evening. How many dishes did she cook?",
      question_vi: "Mẹ đã nấu 2 món buổi sáng và 3 món buổi tối. Mẹ đã nấu bao nhiêu món?",
      answer: ["5", "five", "5 dishes"],
      bar_model: "/images/week21/barmodel_w21_p3.jpg",
      cpa_stage: "pictorial",
      math_vocab: ["morning", "evening", "total"],
      hint_en: "2 + 3 = ?",
      hint_vi: "2 + 3 = ?",
      audio_url: "/audio/week21_easy/singapore_math_q3.mp3"
    },
    {
      id: 4,
      type: "part_whole",
      question_en: "I walked 4 blocks to the park and 2 more to the shop. How many blocks did I walk in total?",
      question_vi: "Tôi đã đi bộ 4 ô đến công viên và thêm 2 ô đến cửa hàng. Tổng cộng tôi đã đi bao nhiêu ô?",
      answer: ["6", "six", "6 blocks"],
      bar_model: "/images/week21/barmodel_w21_p4.jpg",
      cpa_stage: "pictorial",
      math_vocab: ["blocks", "total", "add"],
      hint_en: "4 + 2 = ?",
      hint_vi: "4 + 2 = ?",
      audio_url: "/audio/week21_easy/singapore_math_q4.mp3"
    },
    {
      id: 5,
      type: "comparison",
      question_en: "I watched 9 minutes of TV. My sister watched 6 minutes. How many more minutes did I watch?",
      question_vi: "Tôi đã xem TV 9 phút. Chị tôi xem 6 phút. Tôi xem nhiều hơn bao nhiêu phút?",
      answer: ["3", "three", "3 minutes"],
      bar_model: "/images/week21/barmodel_w21_p5.jpg",
      cpa_stage: "pictorial",
      math_vocab: ["minutes", "more than", "difference"],
      hint_en: "9 - 6 = ?",
      hint_vi: "9 - 6 = ?",
      audio_url: "/audio/week21_easy/singapore_math_q5.mp3"
    }
  ]
};
"""

# ─── 15. games.js ─────────────────────────────────────────────────────────────
files["games.js"] = """\
/**
 * Week 21 Game Data - Easy Mode (GameHub)
 * Theme: Yesterday's Diary - Past Simple Regular Verbs (-ed)
 * Tier 1 Vocabulary - Simple, Personal Context
 */

export const week21GamesEasy = {
  vocabulary: [
    'walked', 'looked', 'cooked', 'played', 'watched',
    'cleaned', 'helped', 'talked', 'listened', 'opened'
  ],
  show_tell: {
    steps: 3,
    word_list: [
      'walked', 'looked', 'cooked', 'played', 'watched',
      'cleaned', 'helped', 'talked', 'listened', 'opened'
    ],
    instructions_easy: 'Say the word, add a phrase, then make a full sentence.',
    instructions_advanced: 'Say the word, add a phrase, then make a full sentence.',
    step_instructions: {
      1: 'Step 1: say the word clearly.',
      2: 'Step 2: add a short phrase with the word.',
      3: 'Step 3: make a full sentence.'
    },
    frames_easy: ['Yesterday, I ___ to/at/in...', 'I ___ my/the...'],
    frames_advanced: ['Yesterday, I ___ with my friends', 'In the morning, I ___'],
    details_easy: [],
    details_advanced: [],
    detail_map: {
      'walked': ['walked', 'walked to school', 'I walked to school', 'Yesterday, I walked to school with my friend'],
      'looked': ['looked', 'looked at the sky', 'I looked at the sky', 'Yesterday, I looked at the blue sky in the morning'],
      'cooked': ['cooked', 'cooked dinner', 'Mom cooked dinner', 'My mom cooked rice and soup for our family'],
      'played': ['played', 'played in the park', 'I played in the park', 'Yesterday, I played in the park with my friends'],
      'watched': ['watched', 'watched TV', 'I watched TV', 'Yesterday, I watched TV with my family after dinner'],
      'cleaned': ['cleaned', 'cleaned my room', 'I cleaned my room', 'Yesterday, I cleaned my room and it looks neat'],
      'helped': ['helped', 'helped my mom', 'I helped my mom', 'Yesterday, I helped my mom cook dinner at home'],
      'talked': ['talked', 'talked to friends', 'I talked to friends', 'Yesterday, I talked to my friends at school'],
      'listened': ['listened', 'listened to music', 'I listened to music', 'Yesterday, I listened to music in my room'],
      'opened': ['opened', 'opened the window', 'I opened the window', 'Yesterday, I opened the window and felt the fresh air']
    },
    distractor_map: {
      'walked': ['hair', 'eyes', 'smile'],
      'cooked': ['tall', 'short', 'face'],
      'played': ['glasses', 'curly', 'long']
    },
    frame_map: {
      'walked': ['I walked to school.'],
      'cooked': ['Mom cooked dinner.'],
      'played': ['We played together.']
    },
    sentence_hints_map: {
      'walked': ['I walked to school.', 'She walked home.', 'We walked together.'],
      'looked': ['I looked at the sky.', 'She looked happy.', 'He looked outside.'],
      'cooked': ['Mom cooked dinner.', 'She cooked rice.', 'Dad cooked soup.'],
      'played': ['We played outside.', 'I played a game.', 'They played together.'],
      'watched': ['I watched TV.', 'She watched a movie.', 'We watched the stars.'],
      'cleaned': ['I cleaned my room.', 'She cleaned the table.', 'We cleaned together.'],
      'helped': ['I helped my mom.', 'He helped his friend.', 'They helped clean up.'],
      'talked': ['I talked to my friend.', 'She talked a lot.', 'We talked and laughed.'],
      'listened': ['I listened to music.', 'She listened carefully.', 'They listened to the teacher.'],
      'opened': ['I opened the door.', 'She opened her book.', 'He opened the window.']
    },
    definitions: {
      'walked': 'Went on foot.',
      'looked': 'Used eyes to see.',
      'cooked': 'Made food with heat.',
      'played': 'Had fun.',
      'watched': 'Looked at a screen.',
      'cleaned': 'Made tidy.',
      'helped': 'Gave support.',
      'talked': 'Spoke to someone.',
      'listened': 'Heard carefully.',
      'opened': 'Made not closed.'
    },
    emoji_map: {
      'walked': '🚶',
      'looked': '👀',
      'cooked': '🍳',
      'played': '🎮',
      'watched': '📺',
      'cleaned': '🧹',
      'helped': '🤝',
      'talked': '💬',
      'listened': '🎵',
      'opened': '🚪'
    }
  },
  make_sentence: {
    instructions_easy: 'Unscramble the words to make a sentence.',
    instructions_advanced: 'Unscramble the words to make a sentence.',
    sentences_easy: [
      { scrambled: ['I', 'walked', 'to', 'school'], answer: 'I walked to school.' },
      { scrambled: ['I', 'looked', 'at', 'the sky'], answer: 'I looked at the sky.' },
      { scrambled: ['Mom', 'cooked', 'dinner'], answer: 'Mom cooked dinner.' },
      { scrambled: ['I', 'played', 'in', 'the park'], answer: 'I played in the park.' },
      { scrambled: ['I', 'watched', 'TV'], answer: 'I watched TV.' },
      { scrambled: ['I', 'cleaned', 'my room'], answer: 'I cleaned my room.' },
      { scrambled: ['I', 'helped', 'my mom'], answer: 'I helped my mom.' },
      { scrambled: ['I', 'talked', 'to', 'my friend'], answer: 'I talked to my friend.' },
      { scrambled: ['I', 'listened', 'to', 'music'], answer: 'I listened to music.' },
      { scrambled: ['I', 'opened', 'the door'], answer: 'I opened the door.' }
    ],
    sentences_advanced: [
      { scrambled: ['I', 'walked', 'to', 'school', 'yesterday'], answer: 'I walked to school yesterday.', base_words: ['i', 'walked', 'to', 'school', 'yesterday'], time_phrases: ['yesterday', 'in the morning'], location_phrases: ['to school', 'with my friend', 'and felt happy'] },
      { scrambled: ['I', 'looked', 'at', 'the', 'blue', 'sky'], answer: 'I looked at the blue sky.', base_words: ['i', 'looked', 'at', 'the', 'blue', 'sky'], time_phrases: ['yesterday', 'in the morning'], location_phrases: ['at the sky', 'and smiled', 'outside'] },
      { scrambled: ['My', 'mom', 'cooked', 'rice', 'and', 'soup'], answer: 'My mom cooked rice and soup.', base_words: ['my', 'mom', 'cooked', 'rice', 'and', 'soup'], time_phrases: ['yesterday', 'for dinner'], location_phrases: ['at home', 'for us', 'in the kitchen'] },
      { scrambled: ['I', 'played', 'in', 'the', 'park', 'yesterday'], answer: 'I played in the park yesterday.', base_words: ['i', 'played', 'in', 'the', 'park', 'yesterday'], time_phrases: ['yesterday', 'in the afternoon'], location_phrases: ['in the park', 'with friends', 'and had fun'] },
      { scrambled: ['I', 'watched', 'TV', 'after', 'dinner'], answer: 'I watched TV after dinner.', base_words: ['i', 'watched', 'tv', 'after', 'dinner'], time_phrases: ['after dinner', 'yesterday'], location_phrases: ['at home', 'with my family', 'on the sofa'] },
      { scrambled: ['I', 'cleaned', 'my', 'room', 'yesterday'], answer: 'I cleaned my room yesterday.', base_words: ['i', 'cleaned', 'my', 'room', 'yesterday'], time_phrases: ['yesterday', 'in the morning'], location_phrases: ['my room', 'and felt proud', 'with mom'] },
      { scrambled: ['I', 'helped', 'my', 'mom', 'cook', 'dinner'], answer: 'I helped my mom cook dinner.', base_words: ['i', 'helped', 'my', 'mom', 'cook', 'dinner'], time_phrases: ['yesterday', 'at night'], location_phrases: ['in the kitchen', 'together', 'at home'] },
      { scrambled: ['I', 'talked', 'to', 'my', 'friend', 'at', 'school'], answer: 'I talked to my friend at school.', base_words: ['i', 'talked', 'to', 'my', 'friend', 'at', 'school'], time_phrases: ['yesterday', 'in class'], location_phrases: ['at school', 'and laughed', 'during lunch'] },
      { scrambled: ['I', 'listened', 'to', 'music', 'in', 'my', 'room'], answer: 'I listened to music in my room.', base_words: ['i', 'listened', 'to', 'music', 'in', 'my', 'room'], time_phrases: ['yesterday', 'after school'], location_phrases: ['in my room', 'and danced', 'quietly'] },
      { scrambled: ['I', 'opened', 'the', 'window', 'in', 'the', 'morning'], answer: 'I opened the window in the morning.', base_words: ['i', 'opened', 'the', 'window', 'in', 'the', 'morning'], time_phrases: ['in the morning', 'yesterday'], location_phrases: ['in my room', 'and felt the air', 'early'] }
    ]
  },
  ask_me: {
    instructions_easy: 'Ask a question that matches the context.',
    instructions_advanced: 'Ask a question that matches the context.',
    contexts_easy: [
      {
        id: 'w21_easy_what_did',
        task_type: 'find_question',
        topic: 'diary',
        intro: 'I walked to school yesterday. Ask me what I did yesterday.',
        acceptedQuestions: ['What did you do yesterday?', 'Where did you go?'],
        answer: 'I walked to school.',
        question_hints: ['What did you do yesterday?'],
        required_question_words: ['what', 'did'],
        required_keywords: ['do', 'you'],
        hints: { words: ['what', 'did', 'you', 'do'], tricky: ['where', 'who'] }
      },
      {
        id: 'w21_easy_where_walked',
        task_type: 'find_question',
        topic: 'diary',
        intro: 'I walked to school. Ask me where I walked.',
        acceptedQuestions: ['Where did you walk?', 'Where did you go?'],
        answer: 'I walked to school.',
        question_hints: ['Where did you walk?'],
        required_question_words: ['where', 'did'],
        required_keywords: ['walk', 'you'],
        hints: { words: ['where', 'did', 'you', 'walk'], tricky: ['what', 'who'] }
      }
    ],
    contexts_advanced: [
      {
        id: 'w21_easy_adv_diary',
        task_type: 'find_question',
        topic: 'diary',
        intro: 'I cleaned my room yesterday. Ask me what I did.',
        acceptedQuestions: ['What did you do yesterday?', 'Did you clean your room?'],
        answer: 'I cleaned my room yesterday.',
        question_hints: ['What did you do yesterday?'],
        required_question_words: ['what', 'did'],
        required_keywords: ['do', 'you'],
        hints: { words: ['what', 'did', 'you', 'do'], tricky: ['where', 'who'] }
      }
    ]
  }
};

export default week21GamesEasy;
"""

# ─── 16. index.js ─────────────────────────────────────────────────────────────
files["index.js"] = """\
import read from './read.js';
import explore from './explore.js';
import vocab from './vocab.js';
import grammar from './grammar.js';
import dictation from './dictation.js';
import shadowing from './shadowing.js';
import writing from './writing.js';
import word_match from './word_match.js';
import word_power from './word_power.js';
import mindmap from './mindmap.js';
import ask_ai from './ask_ai.js';
import daily_watch from './daily_watch.js';
import logic_science from './logic_science.js';
import singapore_math from './singapore_math.js';
import games from './games.js';

const weekData = {
  weekId: 21,
  weekTitle_en: "Yesterday's Diary",
  weekTitle_vi: "Nhật Ký Hôm Qua",
  grammar_focus: "Past Simple Regular Verbs (verb-ed)",
  isEasy: true,

  global_vocab: vocab.vocab,

  voiceConfig: {
    narration: 'en-US-Neural2-H',
    vocabulary: 'en-US-Neural2-F',
    dictation: 'en-US-Neural2-F',
    shadowing: 'en-US-Neural2-F',
    questions: 'en-US-Neural2-B',
    mindmap: 'en-US-Neural2-B',
    logic_science: 'en-US-Neural2-B'
  },

  stations: {
    read_explore: read,
    new_words: vocab,
    word_match: word_match,
    grammar: grammar,
    mindmap_speaking: mindmap,
    ask_ai: ask_ai,
    dictation: dictation,
    shadowing: shadowing,
    writing: writing,
    logic_lab: { logic_science, singapore_math },
    word_power: word_power,
    daily_watch: daily_watch,
    explore: explore,
    game_hub: games
  }
};

export default weekData;
"""

# ─── 17. video_queries.json ───────────────────────────────────────────────────
video_queries = {
  "week": 21,
  "mode": "easy",
  "queries": [
    "past tense -ed verbs song kids",
    "yesterday what did you do English kids",
    "regular past simple verbs ESL children",
    "diary writing for kids English",
    "past simple regular verbs animation kids"
  ]
}
files["video_queries.json"] = json.dumps(video_queries, indent=2) + "\n"

# ─── Write all files ──────────────────────────────────────────────────────────
written = 0
for fname, content in files.items():
    path = os.path.join(BASE, fname)
    with open(path, "w") as f:
        f.write(content)
    print(f"{fname} OK")
    written += 1

total = len([f for f in os.listdir(BASE)])
print(f"\nTotal files in {BASE}: {total}")
for f in sorted(os.listdir(BASE)):
    print(f"  {f}")
