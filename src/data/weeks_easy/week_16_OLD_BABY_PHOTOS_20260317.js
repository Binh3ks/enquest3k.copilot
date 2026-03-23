// isEasy: true
const weekData = {
  weekId: 16,
  weekTitle_en: "My Baby Photos",
  weekTitle_vi: "Ảnh Hồi Bé Của Tôi",
  grammar_focus: "Past Simple (Irregular)",
  global_vocab: [
    { word: "photo", definition_en: "Picture.", definition_vi: "Bức ảnh" },
    { word: "baby", definition_en: "Very young child.", definition_vi: "Em bé" },
    { word: "grow", definition_en: "Get bigger.", definition_vi: "Lớn lên" },
    { word: "learn", definition_en: "Get knowledge.", definition_vi: "Học" },
    { word: "crawl", definition_en: "Move on hands knees.", definition_vi: "Bò" },
    { word: "walk", definition_en: "Move on feet.", definition_vi: "Đi" },
    { word: "cute", definition_en: "Looking nice.", definition_vi: "Dễ thương" },
    { word: "small", definition_en: "Not big.", definition_vi: "Nhỏ" },
    { word: "remember", definition_en: "Think of past.", definition_vi: "Nhớ" },
    { word: "funny", definition_en: "Makes you laugh.", definition_vi: "Buồn cười" }
  ],
  stations: {
    read_explore: {
      title: "When I Was Little",
      image_url: "/images/week16/read_cover_easy_w16.jpg",
      content_en: "I looked at my baby **photos** with Mom. \"Look!\" Mom said. \"You were so **small**.\" In the photo, I **crawled** on the floor. I **had** a teddy bear. Then I saw another photo. I **stood** up. \"You **learnt** to walk here,\" Mom said. I **grew** up fast. Now I am big. It is funny to see me as a **baby**.",
      content_vi: "Tôi xem ảnh hồi bé với mẹ. \"Nhìn này!\" mẹ nói. \"Con bé xíu.\" Trong ảnh, tôi đang bò trên sàn. Tôi có một con gấu bông. Rồi tôi thấy ảnh khác. Tôi đứng dậy. \"Con học đi ở đây,\" mẹ nói. Tôi lớn nhanh. Giờ tôi đã lớn. Thật buồn cười khi thấy mình là em bé.",
      audio_url: null,
      comprehension_questions: [
        { id: 1, question_en: "What did they look at?", answer: ["Baby photos."], hint_en: "Photos of...", hint_vi: "Ảnh của..." },
        { id: 2, question_en: "Was he big or small?", answer: ["Small."], hint_en: "S...", hint_vi: "Nhỏ" },
        { id: 3, question_en: "What did he learn?", answer: ["To walk."], hint_en: "To w...", hint_vi: "Để đi..." }
      ]
    },
    new_words: {
      vocab: [
        { id: 1, word: "photo", pronunciation: "/ˈfəʊtəʊ/", definition_vi: "Bức ảnh", definition_en: "Picture.", example: "Nice photo.", collocation: "take a photo", image_url: "/images/week16/photo.jpg" },
        { id: 2, word: "baby", pronunciation: "/ˈbeɪbi/", definition_vi: "Em bé", definition_en: "Little child.", example: "Cute baby.", collocation: "baby boy", image_url: "/images/week16/baby.jpg" },
        { id: 3, word: "crawl", pronunciation: "/krɔːl/", definition_vi: "Bò", definition_en: "Move low.", example: "Babies crawl.", collocation: "crawl fast", image_url: "/images/week16/crawl.jpg" },
        { id: 4, word: "stand", pronunciation: "/stand/", definition_vi: "Đứng", definition_en: "On feet.", example: "Stand up.", collocation: "stand still", image_url: "/images/week16/stand.jpg" },
        { id: 5, word: "grow", pronunciation: "/ɡrəʊ/", definition_vi: "Lớn lên", definition_en: "Get big.", example: "Plants grow.", collocation: "grow up", image_url: "/images/week16/grow.jpg" },
        { id: 6, word: "learn", pronunciation: "/ləːn/", definition_vi: "Học", definition_en: "Know new things.", example: "Learn English.", collocation: "learn to", image_url: "/images/week16/learn.jpg" },
        { id: 7, word: "small", pronunciation: "/smɔːl/", definition_vi: "Nhỏ", definition_en: "Little size.", example: "Small ant.", collocation: "very small", image_url: "/images/week16/small.jpg" },
        { id: 8, word: "cute", pronunciation: "/kjuːt/", definition_vi: "Dễ thương", definition_en: "Lovely.", example: "Cute cat.", collocation: "so cute", image_url: "/images/week16/cute.jpg" },
        { id: 9, word: "fast", pronunciation: "/fɑːst/", definition_vi: "Nhanh", definition_en: "Quick.", example: "Run fast.", collocation: "very fast", image_url: "/images/week16/fast.jpg" },
        { id: 10, word: "funny", pronunciation: "/ˈfʌni/", definition_vi: "Buồn cười", definition_en: "Haha.", example: "Funny clown.", collocation: "funny face", image_url: "/images/week16/funny.jpg" }
      ]
    },
    word_match: { pairs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
    grammar: {
      grammar_explanation: {
        title_en: "Did -> Done", title_vi: "Đã làm",
        rules: [
          { type: "irr", icon: "⭐", rule_en: "Special words.", rule_vi: "Từ đặc biệt.", example: "stand -> stood" }
        ]
      },
      exercises: [
        { id: 1, type: "fill", question: "I _____ (stand) up.", answer: "stood", hint: "Past stand" },
        { id: 2, type: "fill", question: "I _____ (have) a toy.", answer: "had", hint: "Past have" },
        { id: 3, type: "mc", question: "She _____ (grow) tall.", options: ["grew", "growed"], answer: "grew", hint: "Past grow" },
        { id: 4, type: "fill", question: "We _____ (eat) cake.", answer: "ate", hint: "Past eat" },
        { id: 5, type: "unscramble", question: "Sort:", words: ["saw", "I", "mom"], answer: "I saw mom.", hint: "I..." },
        { id: 6, type: "fill", question: "He _____ (drink) milk.", answer: "drank", hint: "Past drink" },
        { id: 7, type: "mc", question: "I _____ (go) to bed.", options: ["went", "go"], answer: "went", hint: "Past go" },
        { id: 8, type: "fill", question: "She _____ (sit) down.", answer: "sat", hint: "Past sit" },
        { id: 9, type: "fill", question: "They _____ (run).", answer: "ran", hint: "Past run" },
        { id: 10, type: "fill", question: "We _____ (sing).", answer: "sang", hint: "Past sing" },
        { id: 11, type: "mc", question: "He _____ (fall).", options: ["fell", "falled"], answer: "fell", hint: "Past fall" },
        { id: 12, type: "fill", question: "I _____ (draw).", answer: "drew", hint: "Past draw" },
        { id: 13, type: "unscramble", question: "Sort:", words: ["happy", "was", "I"], answer: "I was happy.", hint: "I..." },
        { id: 14, type: "fill", question: "She _____ (read).", answer: "read", hint: "Same" },
        { id: 15, type: "fill", question: "We _____ (swim).", answer: "swam", hint: "Past swim" },
        { id: 16, type: "mc", question: "I _____ (make) it.", options: ["made", "make"], answer: "made", hint: "Past make" },
        { id: 17, type: "fill", question: "He _____ (say) hi.", answer: "said", hint: "Past say" },
        { id: 18, type: "fill", question: "They _____ (come).", answer: "came", hint: "Past come" },
        { id: 19, type: "fill", question: "I _____ (buy) candy.", answer: "bought", hint: "Past buy" },
        { id: 20, type: "fill", question: "It _____ (fly).", answer: "flew", hint: "Past fly" }
      ]
    },
    ask_ai: {
      prompts: [
        { id: 1, context_vi: "Bạn muốn xem ảnh hồi bé của mẹ.", context_en: "You want to see mom's baby photo.", answer: ["Can I see your baby photo?"], hint: "Can I..." },
        { id: 2, context_vi: "Bạn hỏi bố xem hồi bé bố có nghịch không.", context_en: "Ask dad if he was naughty as a baby.", answer: ["Were you naughty?"], hint: "Were you..." },
        { id: 3, context_vi: "Bạn hỏi xem mình biết đi lúc mấy tuổi.", context_en: "Ask when you learned to walk.", answer: ["When did I walk?"], hint: "When did..." },
        { id: 4, context_vi: "Bạn hỏi mẹ từ đầu tiên bạn nói là gì.", context_en: "Ask mom what your first word was.", answer: ["What was my first word?"], hint: "What was..." },
        { id: 5, context_vi: "Bạn muốn biết ai bế bạn nhiều nhất.", context_en: "Ask who held you the most.", answer: ["Who held me most?"], hint: "Who held..." }
      ]
    },
    logic_lab: {
      puzzles: [
        { id: 1, type: "math", title_en: "Age", title_vi: "Tuổi", question_en: "I am 7. My brother is 2 years older. How old is he?", question_vi: "Tôi 7 tuổi. Anh tôi hơn 2 tuổi. Anh ấy mấy tuổi?", answer: ["9 years old"], target_number: 9, unit: "years old", hint_en: "7 + 2", hint_vi: "7 + 2" },
        { id: 2, type: "logic", title_en: "Baby", title_vi: "Em bé", question_en: "Babies drink milk. Do babies eat steak?", question_vi: "Em bé uống sữa. Em bé có ăn bít tết không?", answer: ["No"], target_number: 0, unit: "", hint_en: "No teeth", hint_vi: "Không răng" },
        { id: 3, type: "math", title_en: "Steps", title_vi: "Bước đi", question_en: "Baby takes 2 steps. Then 3 steps. Total steps?", question_vi: "Bé đi 2 bước. Rồi 3 bước. Tổng?", answer: ["5 steps"], target_number: 5, unit: "steps", hint_en: "2 + 3", hint_vi: "2 + 3" },
        { id: 4, type: "pattern", title_en: "Size", title_vi: "Kích thước", question_en: "Small, Big, Small, Big... What is next?", question_vi: "Nhỏ, To, Nhỏ, To... Tiếp theo?", answer: ["Small"], target_number: 0, unit: "", hint_en: "Pattern", hint_vi: "Quy luật" },
        { id: 5, type: "math", title_en: "Toys", title_vi: "Đồ chơi", question_en: "I have 4 bears. I lose 1. How many left?", question_vi: "Tôi có 4 gấu. Mất 1. Còn mấy?", answer: ["3 bears"], target_number: 3, unit: "bears", hint_en: "4 - 1", hint_vi: "4 - 1" }
      ]
    },
    dictation: {
      sentences: [
        { id: 1, text: "I looked at photos.", meaning: "Tôi đã xem ảnh." },
        { id: 2, text: "I was very small.", meaning: "Tôi rất nhỏ." },
        { id: 3, text: "I crawled on the floor.", meaning: "Tôi bò trên sàn." },
        { id: 4, text: "I grew up fast.", meaning: "Tôi lớn nhanh." },
        { id: 5, text: "It is funny to see.", meaning: "Thật buồn cười khi xem." }
      ]
    },
    shadowing: {
      title: "Baby Me",
      script: [
        { id: 1, text: "I looked at photos.", vi: "Tôi xem ảnh." },
        { id: 2, text: "I was small.", vi: "Tôi bé xíu." },
        { id: 3, text: "I crawled.", vi: "Tôi bò." },
        { id: 4, text: "I stood up.", vi: "Tôi đứng dậy." },
        { id: 5, text: "I grew up.", vi: "Tôi lớn lên." }
      ]
    },
    // FIX: KEY 'writing'
    writing: {
      title: "When I Was A Baby",
      min_words: 30,
      model_sentence: "When I was a baby, I was small. I crawled everywhere. I slept a lot. I drank milk. I did not walk. I was cute.",
      instruction_en: "Write about when you were a baby (Small, Sleep, Milk).",
      instruction_vi: "Viết về hồi bạn còn bé (Nhỏ, Ngủ, Sữa).",
      prompt_en: "Were you small? What did you drink?",
      prompt_vi: "Bạn có nhỏ không? Bạn uống gì?",
      keywords: ["small", "crawled", "milk", "cute"]
    },
    explore: {
      title_en: "Growing Up", title_vi: "Lớn Lên",
      image_url: "/images/week16/explore_easy_w16.jpg",
      content_en: "Everyone **grows**. First, you are a **baby**. You sleep and drink milk. Then you are a **toddler**. You learn to **walk** and talk. Next, you are a **child**. You go to school and play. One day, you will be an **adult**. You will be tall and strong. Growing up is an adventure.",
      content_vi: "Mọi người đều lớn lên. Đầu tiên, bạn là em bé. Bạn ngủ và uống sữa. Sau đó bạn là trẻ mới biết đi. Bạn học đi và nói. Tiếp theo, bạn là trẻ con. Bạn đi học và chơi. Một ngày, bạn sẽ là người lớn. Bạn sẽ cao và khỏe. Lớn lên là một cuộc phiêu lưu.",
      check_questions: [
        { id: 1, question_en: "What do babies do?", answer: ["Sleep and drink milk."], hint_en: "Sleep...", hint_vi: "Ngủ..." },
        { id: 2, question_en: "What do toddlers learn?", answer: ["To walk and talk."], hint_en: "Walk...", hint_vi: "Đi..." },
        { id: 3, question_en: "Will you be an adult?", answer: ["Yes."], hint_en: "Yes...", hint_vi: "Có..." }
      ],
      question: { text_en: "Do you want to be big? Why?", text_vi: "Bạn muốn lớn không? Tại sao?", min_words: 5, hint_en: "I want to be big because...", hint_vi: "Tôi muốn lớn vì...", model_answer: "I want to be big to drive a car." }
    },
    word_power: {
      words: [
        { id: 1, word: "tall", pronunciation: "/tɔːl/", cefr_level: "A1", definition_en: "Big height.", definition_vi: "Cao", example: "Tall tree.", model_sentence: "He is tall.", collocation: "very tall", image_url: "/images/week16/tall.jpg" },
        { id: 2, word: "strong", pronunciation: "/strɒŋ/", cefr_level: "A1", definition_en: "Power.", definition_vi: "Khỏe", example: "Strong lion.", model_sentence: "I am strong.", collocation: "so strong", image_url: "/images/week16/strong.jpg" },
        { id: 3, word: "young", pronunciation: "/jʌŋ/", cefr_level: "A1", definition_en: "Not old.", definition_vi: "Trẻ", example: "Young boy.", model_sentence: "She is young.", collocation: "too young", image_url: "/images/week16/young.jpg" }
      ]
    },
    daily_watch: {
      videos: [
        { id: 1, title: "Baby to Adult", videoId: "7cG9XXBHYtY", duration: "3:00", sim_duration: 180 },
        { id: 2, title: "Growing Up Song", videoId: "qOUBcwlnTyc", duration: "2:30", sim_duration: 150 },
        { id: 3, title: "I Can Walk", videoId: "ool2Whw--7Y", duration: "3:00", sim_duration: 180 },
        { id: 4, title: "Human Life Cycle", videoId: "WDg85KdxFHU", duration: "3:30", sim_duration: 210 },
        { id: 5, title: "When I was a Baby", videoId: "tGWiowdjnHk", duration: "2:30", sim_duration: 150 }
      ],
      bonus_games: []
    }
  }
};
export default weekData;
