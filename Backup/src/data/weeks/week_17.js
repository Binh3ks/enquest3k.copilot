const weekData = {
  weekId: 17,
  weekTitle_en: "The Boy Who Asked Why",
  weekTitle_vi: "Cậu Bé Hay Hỏi Tại Sao",
  grammar_focus: "Sequencing (First, Next, Then)",
  global_vocab: [
    { word: "curious", definition_en: "Wanting to know.", definition_vi: "Tò mò" },
    { word: "question", definition_en: "Asking something.", definition_vi: "Câu hỏi" },
    { word: "answer", definition_en: "Reply to question.", definition_vi: "Câu trả lời" },
    { word: "experiment", definition_en: "Scientific test.", definition_vi: "Thí nghiệm" },
    { word: "laboratory", definition_en: "Place for science.", definition_vi: "Phòng thí nghiệm" },
    { word: "explode", definition_en: "Blow up.", definition_vi: "Nổ" },
    { word: "famous", definition_en: "Known by many.", definition_vi: "Nổi tiếng" },
    { word: "inventor", definition_en: "A creator.", definition_vi: "Nhà phát minh" },
    { word: "hardworking", definition_en: "Working a lot.", definition_vi: "Chăm chỉ" },
    { word: "genius", definition_en: "Very smart.", definition_vi: "Thiên tài" }
  ],
  stations: {
    read_explore: {
      title: "Young Thomas Edison",
      image_url: "/images/week17/read_cover_w17.jpg",
      content_en: "Thomas Edison was a very **curious** boy. He asked \"Why?\" about everything. **First**, he tried to hatch eggs himself! He sat on them, but they broke. **Next**, he built a **laboratory** in his basement. He did many **experiments**. Sometimes, things **exploded**! His mom was worried, but she helped him learn. **Then**, he became a **famous** **inventor**. He worked hard all his life. He showed us that asking questions is good.",
      content_vi: "Thomas Edison là một cậu bé rất tò mò. Cậu hỏi \"Tại sao?\" về mọi thứ. Đầu tiên, cậu thử tự ấp trứng! Cậu ngồi lên chúng, nhưng chúng vỡ. Tiếp theo, cậu xây một phòng thí nghiệm dưới tầng hầm. Cậu làm nhiều thí nghiệm. Đôi khi, mọi thứ phát nổ! Mẹ cậu lo lắng, nhưng bà giúp cậu học. Sau đó, cậu trở thành nhà phát minh nổi tiếng. Cậu làm việc chăm chỉ cả đời. Cậu cho chúng ta thấy hỏi câu hỏi là tốt.",
      audio_url: null,
      comprehension_questions: [
        { id: 1, question_en: "What did Thomas ask?", answer: ["Why?", "He asked Why."], hint_en: "He asked...", hint_vi: "Cậu hỏi..." },
        { id: 2, question_en: "Where was his laboratory?", answer: ["In his basement."], hint_en: "In his b...", hint_vi: "Trong..." },
        { id: 3, question_en: "Did his mom help him?", answer: ["Yes."], hint_en: "Yes...", hint_vi: "Có..." }
      ]
    },
    new_words: {
      vocab: [
        { id: 1, word: "curious", pronunciation: "/ˈkjʊərɪəs/", definition_vi: "Tò mò", definition_en: "Want to know.", example: "The cat is curious.", collocation: "curious boy", image_url: "/images/week17/curious.jpg" },
        { id: 2, word: "hatch", pronunciation: "/hatʃ/", definition_vi: "Nở (trứng)", definition_en: "Come out of egg.", example: "The chick hatches.", collocation: "hatch eggs", image_url: "/images/week17/hatch.jpg" },
        { id: 3, word: "basement", pronunciation: "/ˈbeɪsm(ə)nt/", definition_vi: "Tầng hầm", definition_en: "Room under house.", example: "Go to the basement.", collocation: "dark basement", image_url: "/images/week17/basement.jpg" },
        { id: 4, word: "laboratory", pronunciation: "/ləˈbɒrət(ə)ri/", definition_vi: "Phòng thí nghiệm", definition_en: "Science room.", example: "Work in a laboratory.", collocation: "science laboratory", image_url: "/images/week17/laboratory.jpg" },
        { id: 5, word: "explode", pronunciation: "/ɪkˈspləʊd/", definition_vi: "Nổ", definition_en: "Go boom.", example: "The bomb explodes.", collocation: "loud explode", image_url: "/images/week17/explode.jpg" },
        { id: 6, word: "worried", pronunciation: "/ˈwʌrid/", definition_vi: "Lo lắng", definition_en: "Not calm.", example: "Mom is worried.", collocation: "feel worried", image_url: "/images/week17/worried.jpg" },
        { id: 7, word: "famous", pronunciation: "/ˈfeɪməs/", definition_vi: "Nổi tiếng", definition_en: "Known by all.", example: "Famous singer.", collocation: "very famous", image_url: "/images/week17/famous.jpg" },
        { id: 8, word: "hardworking", pronunciation: "/hɑːdˈwəːkɪŋ/", definition_vi: "Chăm chỉ", definition_en: "Work a lot.", example: "Ants are hardworking.", collocation: "hardworking student", image_url: "/images/week17/hardworking.jpg" },
        { id: 9, word: "ask", pronunciation: "/ɑːsk/", definition_vi: "Hỏi", definition_en: "Say a question.", example: "Ask teacher.", collocation: "ask why", image_url: "/images/week17/ask.jpg" },
        { id: 10, word: "become", pronunciation: "/bɪˈkʌm/", definition_vi: "Trở thành", definition_en: "Turn into.", example: "Become a doctor.", collocation: "become famous", image_url: "/images/week17/become.jpg" }
      ]
    },
    word_match: { pairs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
    grammar: {
      grammar_explanation: {
        title_en: "Sequence Words", title_vi: "Từ chỉ trình tự",
        rules: [
          { type: "1", icon: "1️⃣", rule_en: "First", rule_vi: "Đầu tiên" },
          { type: "2", icon: "👉", rule_en: "Next / Then", rule_vi: "Tiếp theo / Sau đó" },
          { type: "3", icon: "🏁", rule_en: "Finally", rule_vi: "Cuối cùng" }
        ]
      },
      exercises: [
        { id: 1, type: "mc", question: "_____, I wake up.", options: ["First", "Finally"], answer: "First", hint: "Start" },
        { id: 2, type: "fill", question: "_____, I brush teeth.", answer: "Next", hint: "2nd" },
        { id: 3, type: "fill", question: "_____, I eat.", answer: "Then", hint: "3rd" },
        { id: 4, type: "mc", question: "_____, I sleep.", options: ["First", "Finally"], answer: "Finally", hint: "End" },
        { id: 5, type: "unscramble", question: "Sort:", words: ["First,", "look"], answer: "First, look.", hint: "First..." },
        { id: 6, type: "fill", question: "_____, mix eggs.", answer: "First", hint: "Start" },
        { id: 7, type: "fill", question: "_____, cook.", answer: "Next", hint: "2nd" },
        { id: 8, type: "mc", question: "_____, eat.", options: ["Finally", "First"], answer: "Finally", hint: "End" },
        { id: 9, type: "unscramble", question: "Sort:", words: ["Next,", "run"], answer: "Next, run.", hint: "Next..." },
        { id: 10, type: "fill", question: "_____, read.", answer: "Then", hint: "3rd" },
        { id: 11, type: "fill", question: "_____, write.", answer: "Next", hint: "2nd" },
        { id: 12, type: "mc", question: "Start with _____.", options: ["First", "End"], answer: "First", hint: "1" },
        { id: 13, type: "fill", question: "_____, play.", answer: "Then", hint: "3rd" },
        { id: 14, type: "fill", question: "_____, stop.", answer: "Finally", hint: "End" },
        { id: 15, type: "unscramble", question: "Sort:", words: ["Then,", "jump"], answer: "Then, jump.", hint: "Then..." },
        { id: 16, type: "mc", question: "After First comes _____.", options: ["Next", "Finally"], answer: "Next", hint: "2" },
        { id: 17, type: "fill", question: "_____, sit.", answer: "First", hint: "1" },
        { id: 18, type: "fill", question: "_____, stand.", answer: "Next", hint: "2" },
        { id: 19, type: "fill", question: "_____, walk.", answer: "Then", hint: "3" },
        { id: 20, type: "mc", question: "Last is _____.", options: ["Finally", "First"], answer: "Finally", hint: "End" }
      ]
    },
    ask_ai: {
      prompts: [
        { id: 1, context_vi: "Bạn thấy bóng đèn bị tắt. Hãy hỏi bố tại sao.", context_en: "The light is off. Ask dad why.", answer: ["Dad, why is the light off?"], hint: "Dad, why..." },
        { id: 2, context_vi: "Bạn muốn làm thí nghiệm núi lửa. Hãy hỏi mẹ cách làm.", context_en: "You want to make a volcano. Ask mom how.", answer: ["How do I make a volcano?"], hint: "How do I..." },
        { id: 3, context_vi: "Bạn tò mò tại sao bầu trời màu xanh. Hãy hỏi AI.", context_en: "You wonder why the sky is blue. Ask AI.", answer: ["Why is the sky blue?"], hint: "Why is..." },
        { id: 4, context_vi: "Bạn hỏi giáo viên ai phát minh ra điện thoại.", context_en: "Ask teacher who invented the phone.", answer: ["Who invented the phone?"], hint: "Who invented..." },
        { id: 5, context_vi: "Bạn làm vỡ cốc. Hãy hỏi mẹ phải làm gì đầu tiên.", context_en: "You broke a cup. Ask mom what to do first.", answer: ["What do I do first?"], hint: "What do I..." }
      ]
    },
    logic_lab: {
      puzzles: [
        { id: 1, type: "logic", title_en: "Steps", title_vi: "Bước", question_en: "To eat an apple: 1. Eat. 2. Wash. 3. Buy. Order?", question_vi: "Ăn táo: 1. Ăn. 2. Rửa. 3. Mua. Thứ tự?", answer: ["3, 2, 1"], target_number: 0, unit: "", hint_en: "Buy first", hint_vi: "Mua trước" },
        { id: 2, type: "math", title_en: "Eggs", title_vi: "Trứng", question_en: "Edison sat on 10 eggs. 6 broke. How many left?", question_vi: "Edison ngồi lên 10 trứng. 6 vỡ. Còn mấy?", answer: ["4 eggs"], target_number: 4, unit: "eggs", hint_en: "10 - 6", hint_vi: "10 - 6" },
        { id: 3, type: "logic", title_en: "Safe", title_vi: "An toàn", question_en: "Is fire safe to play with?", question_vi: "Lửa có an toàn để chơi không?", answer: ["No"], target_number: 0, unit: "", hint_en: "Dangerous", hint_vi: "Nguy hiểm" },
        { id: 4, type: "pattern", title_en: "Lab", title_vi: "Phòng Lab", question_en: "Test, Fail, Test, Fail... Next?", question_vi: "Thử, Hỏng, Thử, Hỏng... Tiếp?", answer: ["Test"], target_number: 0, unit: "", hint_en: "Try again", hint_vi: "Thử lại" },
        { id: 5, type: "math", title_en: "Time", title_vi: "Thời gian", question_en: "Start at 1:00. Work for 2 hours. End time?", question_vi: "Bắt đầu 1 giờ. Làm 2 tiếng. Kết thúc?", answer: ["3:00"], target_number: 3, unit: ":00", hint_en: "1 + 2", hint_vi: "1 + 2" }
      ]
    },
    dictation: {
      sentences: [
        { id: 1, text: "Thomas was curious.", meaning: "Thomas rất tò mò." },
        { id: 2, text: "He asked why.", meaning: "Cậu ấy hỏi tại sao." },
        { id: 3, text: "He did experiments.", meaning: "Cậu làm thí nghiệm." },
        { id: 4, text: "He became famous.", meaning: "Cậu trở nên nổi tiếng." },
        { id: 5, text: "He worked hard.", meaning: "Cậu làm việc chăm chỉ." }
      ]
    },
    shadowing: {
      title: "Young Tom",
      script: [
        { id: 1, text: "Thomas was curious.", vi: "Thomas tò mò." },
        { id: 2, text: "He sat on eggs.", vi: "Cậu ngồi lên trứng." },
        { id: 3, text: "He built a lab.", vi: "Cậu xây phòng lab." },
        { id: 4, text: "Things exploded.", vi: "Mọi thứ nổ tung." },
        { id: 5, text: "He never stopped.", vi: "Cậu không dừng lại." }
      ]
    },
    // FIX: KEY 'writing'
    writing: {
      title: "Making A Sandwich",
      min_words: 30,
      model_sentence: "I can make a sandwich. First, I get bread. Next, I put ham and cheese. Then, I add sauce. Finally, I eat it. It is yummy.",
      instruction_en: "Write how to make something (First, Next, Finally).",
      instruction_vi: "Viết cách làm cái gì đó (Đầu, Tiếp, Cuối).",
      prompt_en: "What do you make? Is it good?",
      prompt_vi: "Bạn làm gì? Có ngon không?",
      keywords: ["First", "Next", "eat", "good"]
    },
    explore: {
      title_en: "Great Thinkers", title_vi: "Những Nhà Tư Duy Lớn",
      image_url: "/images/week17/explore_cover_w17.jpg",
      content_en: "Many people change the world. Alexander Bell **invented** the telephone. Now we can call friends. The Wright Brothers **invented** the airplane. Now we can fly. Marie Curie was a great scientist. She helped sick people. They all had one thing in common: they were **curious** and never gave up.",
      content_vi: "Nhiều người thay đổi thế giới. Alexander Bell phát minh điện thoại. Giờ ta gọi được bạn bè. Anh em Wright phát minh máy bay. Giờ ta bay được. Marie Curie là nhà khoa học vĩ đại. Bà giúp người bệnh. Họ có một điểm chung: họ tò mò và không bao giờ bỏ cuộc.",
      check_questions: [
        { id: 1, question_en: "Who invented the telephone?", answer: ["Alexander Bell."], hint_en: "A...", hint_vi: "A..." },
        { id: 2, question_en: "Who invented the airplane?", answer: ["Wright Brothers."], hint_en: "W... Brothers", hint_vi: "Anh em..." },
        { id: 3, question_en: "Were they curious?", answer: ["Yes."], hint_en: "Yes...", hint_vi: "Có..." }
      ],
      question: { text_en: "Who is your hero? Why?", text_vi: "Ai là người hùng của bạn? Tại sao?", min_words: 5, hint_en: "My hero is... because...", hint_vi: "Người hùng của tôi là... vì...", model_answer: "My hero is mom because she helps me." }
    },
    word_power: {
      words: [
        { id: 1, word: "think", pronunciation: "/θɪŋk/", cefr_level: "A1", definition_en: "Use brain.", definition_vi: "Nghĩ", example: "Think hard.", model_sentence: "I think so.", collocation: "think about", image_url: "/images/week17/think.jpg" },
        { id: 2, word: "try", pronunciation: "/trʌɪ/", cefr_level: "A1", definition_en: "Attempt.", definition_vi: "Thử", example: "Try again.", model_sentence: "I try my best.", collocation: "try hard", image_url: "/images/week17/try.jpg" },
        { id: 3, word: "smart", pronunciation: "/smɑːt/", cefr_level: "A1", definition_en: "Clever.", definition_vi: "Thông minh", example: "Smart dog.", model_sentence: "He is smart.", collocation: "very smart", image_url: "/images/week17/smart.jpg" }
      ]
    },
    daily_watch: {
      videos: [
        { id: 1, title: "Thomas Edison Story", videoId: "7cG9XXBHYtY", duration: "4:00", sim_duration: 240 },
        { id: 2, title: "Sequence Song", videoId: "qOUBcwlnTyc", duration: "3:00", sim_duration: 180 },
        { id: 3, title: "Alexander Bell", videoId: "ool2Whw--7Y", duration: "3:30", sim_duration: 210 },
        { id: 4, title: "Wright Brothers", videoId: "WDg85KdxFHU", duration: "4:00", sim_duration: 240 },
        { id: 5, title: "Science for Kids", videoId: "tGWiowdjnHk", duration: "3:00", sim_duration: 180 }
      ],
      bonus_games: []
    }
  }
};
export default weekData;
