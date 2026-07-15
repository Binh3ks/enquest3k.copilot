const weekData = {
  weekId: 16,
  weekTitle_en: "The Time Traveler",
  weekTitle_vi: "Nhà Du Hành Thời Gian",
  grammar_focus: "Past Simple (Irregular Verbs)",
  global_vocab: [
    { word: "timeline", definition_en: "Events in order.", definition_vi: "Dòng thời gian" },
    { word: "ancient", definition_en: "Very old.", definition_vi: "Cổ đại" },
    { word: "future", definition_en: "Time to come.", definition_vi: "Tương lai" },
    { word: "travel", definition_en: "Go to places.", definition_vi: "Du hành" },
    { word: "machine", definition_en: "Device with parts.", definition_vi: "Cỗ máy" },
    { word: "dinosaur", definition_en: "Big old reptile.", definition_vi: "Khủng long" },
    { word: "castle", definition_en: "Big stone house.", definition_vi: "Lâu đài" },
    { word: "event", definition_en: "Something happens.", definition_vi: "Sự kiện" },
    { word: "century", definition_en: "100 years.", definition_vi: "Thế kỷ" },
    { word: "return", definition_en: "Come back.", definition_vi: "Trở về" }
  ],
  stations: {
    read_explore: {
      title: "Lost in Time",
      image_url: "/images/week16/read_cover_w16.jpg",
      content_en: "Max built a time **machine**. He wanted to see the **past**. He pressed a button and **went** back 1000 years. **(Beginning)**. He **saw** a big stone **castle**. Knights **rode** horses. Then he went back further. He **saw** a huge **dinosaur**! It **had** sharp teeth. Max felt scared. He **ran** to his machine. **(Middle)**. He pressed the 'Home' button. The machine shook. Finally, he **came** back to his room. He **was** safe. It was a crazy adventure! **(End)**.",
      content_vi: "Max chế tạo một cỗ máy thời gian. Cậu muốn xem quá khứ. Cậu nhấn nút và đi ngược lại 1000 năm. Cậu thấy một lâu đài đá lớn. Các hiệp sĩ cưỡi ngựa. Rồi cậu đi xa hơn nữa. Cậu thấy một con khủng long khổng lồ! Nó có răng sắc nhọn. Max thấy sợ. Cậu chạy về cỗ máy. Cậu nhấn nút 'Về nhà'. Cỗ máy rung lắc. Cuối cùng, cậu trở về phòng mình. Cậu đã an toàn. Thật là một chuyến phiêu lưu điên rồ!",
      audio_url: null,
      comprehension_questions: [
        { id: 1, question_en: "What did Max build?", answer: ["A time machine."], hint_en: "A time...", hint_vi: "Một cỗ máy..." },
        { id: 2, question_en: "What did he see first?", answer: ["A castle."], hint_en: "A stone...", hint_vi: "Một lâu đài..." },
        { id: 3, question_en: "Did he come back safe?", answer: ["Yes."], hint_en: "Yes...", hint_vi: "Có..." }
      ]
    },
    new_words: {
      vocab: [
        { id: 1, word: "machine", pronunciation: "/məˈʃiːn/", definition_vi: "Cỗ máy", definition_en: "Mechanical device.", example: "The machine works well.", collocation: "time machine", image_url: "/images/week16/machine.jpg" },
        { id: 2, word: "dinosaur", pronunciation: "/ˈdʌɪnəsɔː/", definition_vi: "Khủng long", definition_en: "Extinct reptile.", example: "T-Rex is a dinosaur.", collocation: "big dinosaur", image_url: "/images/week16/dinosaur.jpg" },
        { id: 3, word: "castle", pronunciation: "/ˈkɑːs(ə)l/", definition_vi: "Lâu đài", definition_en: "Fortified building.", example: "Kings live in a castle.", collocation: "old castle", image_url: "/images/week16/castle.jpg" },
        { id: 4, word: "knight", pronunciation: "/nʌɪt/", definition_vi: "Hiệp sĩ", definition_en: "Soldier on horse.", example: "The knight is brave.", collocation: "brave knight", image_url: "/images/week16/knight.jpg" },
        { id: 5, word: "went", pronunciation: "/wɛnt/", definition_vi: "Đã đi", definition_en: "Past of go.", example: "He went home.", collocation: "went back", image_url: "/images/week16/went.jpg" },
        { id: 6, word: "saw", pronunciation: "/sɔː/", definition_vi: "Đã thấy", definition_en: "Past of see.", example: "I saw a bird.", collocation: "saw it", image_url: "/images/week16/saw.jpg" },
        { id: 7, word: "ran", pronunciation: "/ran/", definition_vi: "Đã chạy", definition_en: "Past of run.", example: "He ran fast.", collocation: "ran away", image_url: "/images/week16/ran.jpg" },
        { id: 8, word: "had", pronunciation: "/had/", definition_vi: "Đã có", definition_en: "Past of have.", example: "I had a toy.", collocation: "had fun", image_url: "/images/week16/had.jpg" },
        { id: 9, word: "came", pronunciation: "/keɪm/", definition_vi: "Đã đến", definition_en: "Past of come.", example: "She came late.", collocation: "came home", image_url: "/images/week16/came.jpg" },
        { id: 10, word: "timeline", pronunciation: "/ˈtʌɪmlʌɪn/", definition_vi: "Dòng thời gian", definition_en: "Line of events.", example: "Draw a timeline.", collocation: "make a timeline", image_url: "/images/week16/timeline.jpg" }
      ]
    },
    word_match: { pairs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
    grammar: {
      grammar_explanation: {
        title_en: "Irregular Verbs", title_vi: "Động từ Bất quy tắc",
        rules: [
          { type: "go", icon: "🚶", rule_en: "go -> went", rule_vi: "đi -> đã đi" },
          { type: "see", icon: "👀", rule_en: "see -> saw", rule_vi: "thấy -> đã thấy" }
        ]
      },
      exercises: [
        { id: 1, type: "mc", question: "I _____ to the park.", options: ["went", "go"], answer: "went", hint: "Past go" },
        { id: 2, type: "fill", question: "He _____ (see) a dino.", answer: "saw", hint: "Past see" },
        { id: 3, type: "mc", question: "She _____ fast.", options: ["ran", "run"], answer: "ran", hint: "Past run" },
        { id: 4, type: "fill", question: "We _____ (have) fun.", answer: "had", hint: "Past have" },
        { id: 5, type: "unscramble", question: "Sort:", words: ["came", "He", "back"], answer: "He came back.", hint: "He..." },
        { id: 6, type: "fill", question: "I _____ (go) home.", answer: "went", hint: "Past go" },
        { id: 7, type: "mc", question: "They _____ a castle.", options: ["saw", "see"], answer: "saw", hint: "Past see" },
        { id: 8, type: "fill", question: "It _____ (be) big.", answer: "was", hint: "Past be" },
        { id: 9, type: "mc", question: "We _____ lunch.", options: ["had", "have"], answer: "had", hint: "Past have" },
        { id: 10, type: "fill", question: "She _____ (come) late.", answer: "came", hint: "Past come" },
        { id: 11, type: "fill", question: "He _____ (do) homework.", answer: "did", hint: "Past do" },
        { id: 12, type: "mc", question: "I _____ pizza.", options: ["ate", "eat"], answer: "ate", hint: "Past eat" },
        { id: 13, type: "fill", question: "We _____ (make) a cake.", answer: "made", hint: "Past make" },
        { id: 14, type: "fill", question: "They _____ (give) gifts.", answer: "gave", hint: "Past give" },
        { id: 15, type: "unscramble", question: "Sort:", words: ["flew", "bird", "The"], answer: "The bird flew.", hint: "The..." },
        { id: 16, type: "mc", question: "She _____ a song.", options: ["sang", "sing"], answer: "sang", hint: "Past sing" },
        { id: 17, type: "fill", question: "I _____ (write) it.", answer: "wrote", hint: "Past write" },
        { id: 18, type: "fill", question: "He _____ (swim).", answer: "swam", hint: "Past swim" },
        { id: 19, type: "mc", question: "We _____ juice.", options: ["drank", "drink"], answer: "drank", hint: "Past drink" },
        { id: 20, type: "fill", question: "It _____ (begin).", answer: "began", hint: "Past begin" }
      ]
    },
    ask_ai: {
      prompts: [
        { id: 1, context_vi: "Bạn gặp một hiệp sĩ từ quá khứ. Hãy hỏi tên ông ấy.", context_en: "You meet a knight. Ask his name.", answer: ["What is your name?"], hint: "What is..." },
        { id: 2, context_vi: "Bạn thấy một con khủng long. Hãy hỏi nó ăn gì.", context_en: "You see a dinosaur. Ask what it eats.", answer: ["What do you eat?"], hint: "What do..." },
        { id: 3, context_vi: "Bạn muốn biết lâu đài ở đâu.", context_en: "You want to find the castle. Ask where it is.", answer: ["Where is the castle?"], hint: "Where is..." },
        { id: 4, context_vi: "Bạn hỏi cỗ máy thời gian hoạt động thế nào.", context_en: "Ask how the time machine works.", answer: ["How does it work?"], hint: "How does..." },
        { id: 5, context_vi: "Bạn muốn về nhà. Hãy hỏi đường.", context_en: "You want to go home. Ask for the way.", answer: ["Which way is home?"], hint: "Which way..." }
      ]
    },
    logic_lab: {
      puzzles: [
        { id: 1, type: "math", title_en: "Years", title_vi: "Năm", question_en: "I go back 100 years from 2000. What year is it?", question_vi: "Tôi lùi 100 năm từ năm 2000. Là năm nào?", answer: ["1900"], target_number: 1900, unit: "year", hint_en: "2000 - 100", hint_vi: "Trừ đi" },
        { id: 2, type: "logic", title_en: "Knights", title_vi: "Hiệp sĩ", question_en: "Knights have horses. I see 4 legs. How many horses?", question_vi: "Hiệp sĩ có ngựa. Tôi thấy 4 chân. Mấy con ngựa?", answer: ["1 horse"], target_number: 1, unit: "horse", hint_en: "4 / 4", hint_vi: "Chia 4" },
        { id: 3, type: "pattern", title_en: "Time", title_vi: "Thời gian", question_en: "Past, Present, Future, Past, Present... What is next?", question_vi: "Quá khứ, Hiện tại, Tương lai... Tiếp theo?", answer: ["Future"], target_number: 0, unit: "", hint_en: "Next step", hint_vi: "Bước tiếp" },
        { id: 4, type: "math", title_en: "Castles", title_vi: "Lâu đài", question_en: "There are 2 castles. Each has 3 towers. Total towers?", question_vi: "Có 2 lâu đài. Mỗi cái 3 tháp. Tổng tháp?", answer: ["6 towers"], target_number: 6, unit: "towers", hint_en: "2 x 3", hint_vi: "2 nhân 3" },
        { id: 5, type: "logic", title_en: "Dino", title_vi: "Khủng long", question_en: "T-Rex eats meat. Is T-Rex a vegetarian?", question_vi: "T-Rex ăn thịt. Nó có ăn chay không?", answer: ["No"], target_number: 0, unit: "", hint_en: "Meat eater", hint_vi: "Ăn thịt" }
      ]
    },
    dictation: {
      sentences: [
        { id: 1, text: "Max built a time machine.", meaning: "Max chế tạo cỗ máy thời gian." },
        { id: 2, text: "He went back to the past.", meaning: "Cậu ấy quay về quá khứ." },
        { id: 3, text: "He saw a big stone castle.", meaning: "Cậu thấy lâu đài đá lớn." },
        { id: 4, text: "The dinosaur had sharp teeth.", meaning: "Con khủng long có răng sắc." },
        { id: 5, text: "He came back home safely.", meaning: "Cậu trở về nhà an toàn." }
      ]
    },
    shadowing: {
      title: "Time Travel",
      script: [
        { id: 1, text: "Max built a time machine.", vi: "Max làm cỗ máy thời gian." },
        { id: 2, text: "He pressed a button.", vi: "Cậu nhấn nút." },
        { id: 3, text: "He saw a dinosaur.", vi: "Cậu thấy khủng long." },
        { id: 4, text: "He ran to his machine.", vi: "Cậu chạy về máy." },
        { id: 5, text: "He came back safe.", vi: "Cậu về an toàn." }
      ]
    },
    // FIX: KEY 'writing'
    writing: {
      title: "My Time Travel",
      min_words: 40,
      model_sentence: "I built a time machine. I went to the future. I saw flying cars. Robots walked on streets. It was amazing. I met a robot friend. Then I came home.",
      instruction_en: "Write a story about time travel (Start, Middle, End).",
      instruction_vi: "Viết chuyện du hành thời gian (Đầu, Giữa, Cuối).",
      prompt_en: "Where did you go? What did you see?",
      prompt_vi: "Bạn đi đâu? Bạn thấy gì?",
      keywords: ["went", "saw", "future", "robots"]
    },
    explore: {
      title_en: "History of Toys", title_vi: "Lịch sử Đồ chơi",
      image_url: "/images/week16/explore_cover_w16.jpg",
      content_en: "Toys have a long **history**. In **ancient** times, kids played with stones and sticks. Then, they made dolls from corn. In the last **century**, plastic toys became popular. We had cars and action figures. Now, in the **modern** world, we have video games and robots. Toys change, but fun stays the same.",
      content_vi: "Đồ chơi có lịch sử dài. Thời cổ đại, trẻ em chơi đá và gậy. Sau đó, họ làm búp bê từ ngô. Thế kỷ trước, đồ chơi nhựa phổ biến. Ta có xe và mô hình. Bây giờ, thế giới hiện đại, ta có game và robot. Đồ chơi thay đổi, nhưng niềm vui vẫn vậy.",
      check_questions: [
        { id: 1, question_en: "What did ancient kids play with?", answer: ["Stones and sticks."], hint_en: "S...", hint_vi: "Đá..." },
        { id: 2, question_en: "What became popular last century?", answer: ["Plastic toys."], hint_en: "P...", hint_vi: "Nhựa..." },
        { id: 3, question_en: "What do we have now?", answer: ["Video games."], hint_en: "V...", hint_vi: "Game..." }
      ],
      question: { text_en: "What is your favorite toy? Why?", text_vi: "Đồ chơi yêu thích của bạn là gì? Tại sao?", min_words: 10, hint_en: "I like...", hint_vi: "Tôi thích...", model_answer: "I like Lego because I can build." }
    },
    word_power: {
      words: [
        { id: 1, word: "discover", pronunciation: "/dɪˈskʌvə/", cefr_level: "A2", definition_en: "Find new thing.", definition_vi: "Khám phá", example: "Discover a place.", model_sentence: "We discover treasure.", collocation: "discover secret", image_url: "/images/week16/discover.jpg" },
        { id: 2, word: "journey", pronunciation: "/ˈdʒəːni/", cefr_level: "A2", definition_en: "Long trip.", definition_vi: "Hành trình", example: "A long journey.", model_sentence: "Start the journey.", collocation: "safe journey", image_url: "/images/week16/journey.jpg" },
        { id: 3, word: "return", pronunciation: "/rɪˈtəːn/", cefr_level: "A2", definition_en: "Go back.", definition_vi: "Trở về", example: "Return home.", model_sentence: "I return book.", collocation: "return to", image_url: "/images/week16/return.jpg" }
      ]
    },
    daily_watch: {
      videos: [
        { id: 1, title: "Time Travel Story", videoId: "n1VBke5Y2co", duration: "3:30", sim_duration: 210 },
        { id: 2, title: "Irregular Verbs Song", videoId: "C229LUk380Q", duration: "3:00", sim_duration: 180 },
        { id: 3, title: "Dinosaurs for Kids", videoId: "U-r-xHln6nE", duration: "2:30", sim_duration: 150 },
        { id: 4, title: "Castles and Knights", videoId: "Xj_t_3y6f4Q", duration: "4:00", sim_duration: 240 },
        { id: 5, title: "History of Toys", videoId: "aj632WmQnZc", duration: "3:00", sim_duration: 180 }
      ],
      bonus_games: []
    }
  }
};
export default weekData;
