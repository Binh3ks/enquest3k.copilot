const weekData = {
  weekId: 8,
  weekTitle_en: "Classroom Inventory",
  weekTitle_vi: "Kiểm kê Lớp học",
  grammar_focus: "Quantifiers (How many / There are / Some / Any)",
  global_vocab: [],
  stations: {
    // 1. READ & EXPLORE (Câu ghép, từ vựng in đậm)
    read_explore: {
      title: "Counting Supplies",
      image_url: "/images/week8/read_cover_w08.jpg",
      content_en: "I am the class monitor, **so** I check the **inventory** every Friday. There are **many** books on the shelf, **but** there are not **any** pens in the cup. I see **a lot of** paper in the **cabinet** **because** we use it for art class. We have **some** new computers, **and** they are very fast. It is important to **count** everything **to keep** the room ready for learning.",
      content_vi: "Tôi là lớp trưởng, nên tôi kiểm tra kho đồ dùng mỗi thứ Sáu. Có nhiều sách trên kệ, nhưng không còn cái bút nào trong cốc. Tôi thấy rất nhiều giấy trong tủ vì chúng tôi dùng nó cho lớp mỹ thuật. Chúng tôi có vài cái máy tính mới, và chúng rất nhanh. Việc đếm mọi thứ là quan trọng để giữ phòng học sẵn sàng cho việc học.",
      audio_url: "/audio/week8/read_explore_main.mp3",
      comprehension_questions: [
        {
          id: 1,
          question_en: "When does the monitor check the inventory?",
          answer: ["Every Friday.", "He checks it every Friday."],
          hint_en: "I check... every...",
          hint_vi: "Tôi kiểm tra... mỗi..."
        },
        {
          id: 2,
          question_en: "Are there any pens in the cup?",
          answer: ["No, there are not any pens.", "No."],
          hint_en: "There are not...",
          hint_vi: "Không có..."
        },
        {
          id: 3,
          question_en: "Why is there a lot of paper?",
          answer: ["Because they use it for art class.", "For art class."],
          hint_en: "Because we use it...",
          hint_vi: "Vì chúng tôi dùng nó..."
        }
      ]
    },
    // 2. NEW WORDS (Có Collocation, Audio path đầy đủ)
    new_words: {
      vocab: [
        {
          id: 1, word: "inventory", image_url: "/images/week8/inventory.jpg",
          definition_en: "A complete list of items.", definition_vi: "Sự kiểm kê/Hàng tồn kho",
          pronunciation: "/ˈɪnv(ə)nt(ə)ri/", example: "We take inventory of the books.", collocation: "check inventory",
          audio_word: "/audio/week8/vocab_inventory.mp3", audio_def: "/audio/week8/vocab_def_inventory.mp3", audio_coll: "/audio/week8/vocab_coll_inventory.mp3"
        },
        {
          id: 2, word: "quantity", image_url: "/images/week8/quantity.jpg",
          definition_en: "The amount or number of something.", definition_vi: "Số lượng",
          pronunciation: "/ˈkwɒntɪti/", example: "A large quantity of paper.", collocation: "large quantity",
          audio_word: "/audio/week8/vocab_quantity.mp3", audio_def: "/audio/week8/vocab_def_quantity.mp3", audio_coll: "/audio/week8/vocab_coll_quantity.mp3"
        },
        {
          id: 3, word: "supply", image_url: "/images/week8/supply.jpg",
          definition_en: "Things needed for a purpose.", definition_vi: "Đồ dùng/Nguồn cung",
          pronunciation: "/səˈplʌɪ/", example: "We need more art supplies.", collocation: "school supplies",
          audio_word: "/audio/week8/vocab_supply.mp3", audio_def: "/audio/week8/vocab_def_supply.mp3", audio_coll: "/audio/week8/vocab_coll_supply.mp3"
        },
        {
          id: 4, word: "count", image_url: "/images/week8/count.jpg",
          definition_en: "To say numbers in order.", definition_vi: "Đếm",
          pronunciation: "/kaʊnt/", example: "Can you count the chairs?", collocation: "count carefully",
          audio_word: "/audio/week8/vocab_count.mp3", audio_def: "/audio/week8/vocab_def_count.mp3", audio_coll: "/audio/week8/vocab_coll_count.mp3"
        },
        {
          id: 5, word: "total", image_url: "/images/week8/total.jpg",
          definition_en: "The final number after counting.", definition_vi: "Tổng cộng",
          pronunciation: "/ˈtəʊt(ə)l/", example: "The total is twenty.", collocation: "grand total",
          audio_word: "/audio/week8/vocab_total.mp3", audio_def: "/audio/week8/vocab_def_total.mp3", audio_coll: "/audio/week8/vocab_coll_total.mp3"
        },
        {
          id: 6, word: "stack", image_url: "/images/week8/stack.jpg",
          definition_en: "A pile of things arranged neatly.", definition_vi: "Chồng/Đống (gọn)",
          pronunciation: "/stak/", example: "A stack of books.", collocation: "neat stack",
          audio_word: "/audio/week8/vocab_stack.mp3", audio_def: "/audio/week8/vocab_def_stack.mp3", audio_coll: "/audio/week8/vocab_coll_stack.mp3"
        },
        {
          id: 7, word: "empty", image_url: "/images/week8/empty.jpg",
          definition_en: "Containing nothing.", definition_vi: "Trống rỗng",
          pronunciation: "/ˈɛmpti/", example: "The box is empty.", collocation: "completely empty",
          audio_word: "/audio/week8/vocab_empty.mp3", audio_def: "/audio/week8/vocab_def_empty.mp3", audio_coll: "/audio/week8/vocab_coll_empty.mp3"
        },
        {
          id: 8, word: "full", image_url: "/images/week8/full.jpg",
          definition_en: "Holding as much as possible.", definition_vi: "Đầy",
          pronunciation: "/fʊl/", example: "The cup is full of pencils.", collocation: "full of",
          audio_word: "/audio/week8/vocab_full.mp3", audio_def: "/audio/week8/vocab_def_full.mp3", audio_coll: "/audio/week8/vocab_coll_full.mp3"
        },
        {
          id: 9, word: "available", image_url: "/images/week8/available.jpg",
          definition_en: "Ready to be used.", definition_vi: "Có sẵn",
          pronunciation: "/əˈveɪləb(ə)l/", example: "Is the room available?", collocation: "not available",
          audio_word: "/audio/week8/vocab_available.mp3", audio_def: "/audio/week8/vocab_def_available.mp3", audio_coll: "/audio/week8/vocab_coll_available.mp3"
        },
        {
          id: 10, word: "cabinet", image_url: "/images/week8/cabinet.jpg",
          definition_en: "A cupboard with shelves.", definition_vi: "Tủ đựng đồ",
          pronunciation: "/ˈkabɪnɪt/", example: "Put the files in the cabinet.", collocation: "file cabinet",
          audio_word: "/audio/week8/vocab_cabinet.mp3", audio_def: "/audio/week8/vocab_def_cabinet.mp3", audio_coll: "/audio/week8/vocab_coll_cabinet.mp3"
        }
      ]
    },
    word_match: { pairs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
    // 3. GRAMMAR (20 Câu, Strict Check)
    grammar: {
      grammar_explanation: {
        title_en: "Quantifiers",
        title_vi: "Từ chỉ số lượng",
        rules: [
          { type: "rule", icon: "❓", rule_en: "**How many** + Plural Noun?", rule_vi: "**Bao nhiêu** + Danh từ số nhiều?", example: "How many **books** are there?" },
          { type: "rule", icon: "🔢", rule_en: "**There is** (1) / **There are** (2+)", rule_vi: "Có 1 / Có nhiều", example: "There **are** five pens." },
          { type: "rule", icon: "📦", rule_en: "**Some** (+) / **Any** (-/?)", rule_vi: "Một vài / Bất cứ (trong câu phủ định/hỏi)", example: "I have **some** paper. Do you have **any**?" }
        ]
      },
      exercises: [
        { id: 1, type: "fill", question: "How _____ (much/many) students are there?", answer: "many", hint: "Countable -> many" },
        { id: 2, type: "mc", question: "There _____ two windows.", options: ["is", "are"], answer: "are", hint: "Two -> are" },
        { id: 3, type: "fill", question: "There is not _____ (some/any) ink left.", answer: "any", hint: "Negative -> any" },
        { id: 4, type: "unscramble", question: "Sort:", words: ["books", "many", "How", "there", "are", "?"], answer: "How many books are there?", hint: "How many..." },
        { id: 5, type: "fill", question: "I have _____ (some/any) pencils.", answer: "some", hint: "Positive -> some" },
        { id: 6, type: "mc", question: "_____ there a teacher in the room?", options: ["Is", "Are"], answer: "Is", hint: "One teacher -> Is" },
        { id: 7, type: "fill", question: "There are a lot _____ (of/in) books.", answer: "of", hint: "A lot of" },
        { id: 8, type: "unscramble", question: "Sort:", words: ["ten", "There", "desks", "are"], answer: "There are ten desks.", hint: "There are..." },
        { id: 9, type: "fill", question: "How many _____ (chair) do you see?", answer: "chairs", hint: "Many -> Plural" },
        { id: 10, type: "mc", question: "Do you have _____ glue?", options: ["some", "any"], answer: "any", hint: "Question -> any" },
        { id: 11, type: "fill", question: "There is _____ (one/many) clock on the wall.", answer: "one", hint: "Is -> one" },
        { id: 12, type: "unscramble", question: "Sort:", words: ["cabinet", "The", "full", "is"], answer: "The cabinet is full.", hint: "The cabinet..." },
        { id: 13, type: "fill", question: "There aren't _____ (many/much) students today.", answer: "many", hint: "Students (Countable) -> many" },
        { id: 14, type: "mc", question: "We have plenty _____ paper.", options: ["of", "for"], answer: "of", hint: "Plenty of" },
        { id: 15, type: "fill", question: "Make sentence: 'There / be / 5 / pen'", answer: ["There are 5 pens.", "there are 5 pens."], customCheck: true, hint: "Use 'are' and 's'" },
        { id: 16, type: "unscramble", question: "Sort:", words: ["some", "I", "buy", "need", "to", "supplies"], answer: "I need to buy some supplies.", hint: "I need..." },
        { id: 17, type: "fill", question: "Are there _____ (any/some) computers?", answer: "any", hint: "Question -> any" },
        { id: 18, type: "mc", question: "How _____ water is in the bottle?", options: ["many", "much"], answer: "much", hint: "Water (Uncountable) -> much" },
        { id: 19, type: "fill", question: "There is a _____ (pile/piles) of books.", answer: "pile", hint: "A -> singular" },
        { id: 20, type: "fill", question: "Make sentence: 'How / many / bag / ?'", answer: ["How many bags?", "how many bags are there?"], customCheck: true, hint: "Plural bag" }
      ]
    },
    // 4. ASK AI (CONTEXT - KHÔNG SHOW CÂU HỎI TRỰC TIẾP)
    ask_ai: {
      prompts: [
        { id: 1, context_vi: "Bạn muốn biết trong lớp có bao nhiêu học sinh. Hãy hỏi cô giáo.", context_en: "You want to know the number of students. Ask the teacher.", answer: ["How many students are there?", "How many students are in the class?"], hint: "How many..." },
        { id: 2, context_vi: "Bạn không thấy cái bút nào trên bàn. Hỏi bạn xem có cái nào không.", context_en: "You see no pens. Ask your friend if there are any.", answer: ["Are there any pens?", "Do you have any pens?"], hint: "Are there..." },
        { id: 3, context_vi: "Bạn thấy một chồng sách. Hỏi xem có bao nhiêu cuốn.", context_en: "You see a stack of books. Ask for the quantity.", answer: ["How many books are there?", "What is the total number of books?"], hint: "How many..." },
        { id: 4, context_vi: "Bạn muốn biết trong tủ có giấy không.", context_en: "You want to know if paper is in the cabinet.", answer: ["Is there any paper in the cabinet?", "Do we have paper?"], hint: "Is there..." },
        { id: 5, context_vi: "Bạn muốn đếm số ghế. Hãy rủ bạn cùng đếm.", context_en: "You want to count chairs. Ask your friend to count with you.", answer: ["Can we count the chairs?", "Let's count the chairs."], hint: "Can we..." }
      ]
    },
    // 5. LOGIC LAB (WORD PROBLEMS & OPTIONS)
    logic_lab: {
      puzzles: [
        { id: 1, type: "math", title_en: "Supply Count", question_en: "There are 10 pencils in the box. I take 3 out. How many pencils are left in the box?", answer: ["7 pencils", "7"], target_number: 7, unit: "pencils", audio_url: "/audio/week8/logic_1.mp3" },
        { id: 2, type: "logic", title_en: "Full or Empty", question_en: "The box has no toys inside. Is it full or empty?", options: ["Empty", "Full"], answer: "Empty", audio_url: "/audio/week8/logic_2.mp3" },
        { id: 3, type: "math", title_en: "Total Desks", question_en: "Row A has 5 desks. Row B has 5 desks. What is the total number of desks?", answer: ["10 desks", "10"], target_number: 10, unit: "desks", audio_url: "/audio/week8/logic_3.mp3" },
        { id: 4, type: "pattern", title_en: "Number Pattern", question_en: "2, 4, 6, 8... What comes next?", options: ["9", "10"], answer: "10", hint_en: "Skip counting by 2", audio_url: "/audio/week8/logic_4.mp3" },
        { id: 5, type: "logic", title_en: "Inventory Logic", question_en: "If we need 20 books but only have 15, do we have enough?", options: ["No", "Yes"], answer: "No", hint_en: "15 is less than 20", audio_url: "/audio/week8/logic_5.mp3" }
      ]
    },
    // 6. DICTATION (COMPOUND SENTENCES)
    dictation: {
      sentences: [
        { id: 1, text: "I count the supplies every Friday.", meaning: "Tôi đếm đồ dùng mỗi thứ Sáu.", audio_url: "/audio/week8/dictation_1.mp3" },
        { id: 2, text: "There are many books on the shelf.", meaning: "Có nhiều sách trên kệ.", audio_url: "/audio/week8/dictation_2.mp3" },
        { id: 3, text: "We do not have any pens left.", meaning: "Chúng tôi không còn cái bút nào.", audio_url: "/audio/week8/dictation_3.mp3" },
        { id: 4, text: "The cabinet is full of paper.", meaning: "Cái tủ đầy giấy.", audio_url: "/audio/week8/dictation_4.mp3" },
        { id: 5, text: "How many computers are available?", meaning: "Có bao nhiêu máy tính có sẵn?", audio_url: "/audio/week8/dictation_5.mp3" }
      ]
    },
    // 7. SHADOWING (KHỚP VỚI READ & EXPLORE)
    shadowing: {
      title: "Bonus: Learn Singular and Plural | Talking Flashcards...'RE 🤔 | What's the differ...",
      script: [
        { id: 1, text: "I am the class monitor, so I check the inventory every Friday.", vi: "Tôi là lớp trưởng, nên tôi kiểm tra kho mỗi thứ Sáu.", audio_url: "/audio/week8/shadowing_1.mp3" },
        { id: 2, text: "There are many books on the shelf, but there are not any pens.", vi: "Có nhiều sách trên kệ, nhưng không có bút.", audio_url: "/audio/week8/shadowing_2.mp3" },
        { id: 3, text: "I see a lot of paper in the cabinet because we use it for art.", vi: "Tôi thấy nhiều giấy trong tủ vì chúng tôi dùng cho môn vẽ.", audio_url: "/audio/week8/shadowing_3.mp3" },
        { id: 4, text: "We have some new computers, and they are very fast.", vi: "Chúng tôi có vài máy tính mới và chúng rất nhanh.", audio_url: "/audio/week8/shadowing_4.mp3" },
        { id: 5, text: "It is important to count everything to keep the room ready.", vi: "Việc đếm mọi thứ là quan trọng để giữ phòng sẵn sàng.", audio_url: "/audio/week8/shadowing_5.mp3" }
      ]
    },
    // 8. EXPLORE (CLIL - QUẢN LÝ TÀI NGUYÊN)
    explore: {
      title_en: "Managing Resources",
      title_vi: "Quản lý Tài nguyên",
      image_url: "/images/week8/explore_cover_w08.jpg",
      content_en: "In a classroom, we share many **supplies** like paper, glue, and markers. It is important to know the **quantity** of items **so** we do not run out. If a box is **empty**, we must refill it. Keeping an **inventory** helps the teacher buy more things when needed. We must use supplies carefully **to avoid** waste.",
      content_vi: "Trong lớp học, chúng ta chia sẻ nhiều đồ dùng như giấy, hồ dán và bút dạ. Việc biết số lượng đồ vật là quan trọng để chúng ta không bị hết. Nếu một cái hộp trống rỗng, chúng ta phải làm đầy nó. Việc giữ kiểm kê giúp giáo viên mua thêm đồ khi cần. Chúng ta phải sử dụng đồ dùng cẩn thận để tránh lãng phí.",
      audio_url: "/audio/week8/explore_main.mp3",
      check_questions: [
        { id: 1, question_en: "Why is knowing the quantity important?", answer: ["So we do not run out."], hint_en: "So we..." },
        { id: 2, question_en: "What should we do if a box is empty?", answer: ["Refill it.", "We must refill it."], hint_en: "Refill..." },
        { id: 3, question_en: "Why check inventory?", answer: ["To buy more things when needed."], hint_en: "To buy..." }
      ],
      question: { text_en: "Do you verify your school bag supplies?", text_vi: "Bạn có kiểm tra đồ dùng trong cặp không?", min_words: 10, model_answer: "Yes, I check my bag every night." }
    },
    // 9. WORD POWER (3 Từ khó + Collocation)
    word_power: {
      words: [
        { id: 1, word: "amount", definition_en: "A quantity of something.", definition_vi: "Lượng", example: "A large amount of work.", cefr_level: "A2", collocation: "small amount", image_url: "/images/week8/amount.jpg",
          audio_word: "/audio/week8/power_word_amount.mp3", audio_def: "/audio/week8/power_def_amount.mp3", audio_coll: "/audio/week8/power_coll_amount.mp3" },
        { id: 2, word: "shortage", definition_en: "A situation where there is not enough.", definition_vi: "Sự thiếu hụt", example: "There is a shortage of water.", cefr_level: "B1", collocation: "food shortage", image_url: "/images/week8/shortage.jpg",
          audio_word: "/audio/week8/power_word_shortage.mp3", audio_def: "/audio/week8/power_def_shortage.mp3", audio_coll: "/audio/week8/power_coll_shortage.mp3" },
        { id: 3, word: "plenty", definition_en: "A large amount; as much as needed.", definition_vi: "Nhiều/Đủ", example: "We have plenty of time.", cefr_level: "B1", collocation: "plenty of", image_url: "/images/week8/plenty.jpg",
          audio_word: "/audio/week8/power_word_plenty.mp3", audio_def: "/audio/week8/power_def_plenty.mp3", audio_coll: "/audio/week8/power_coll_plenty.mp3" }
      ]
    },
    // 10. DAILY WATCH
    daily_watch: {
      videos: [
        { id: 1, query: "Classroom rules", videoId: "xOXcnpCbr3I" },
        { id: 2, query: "Singular and Plural nouns grammar", videoId: "BI1Syz9I2n0" },
        { id: 3, query: "Counting in groups", videoId: "2KsY7-qLmd0" },
        { id: 4, query: "Living vs Non-living things", videoId: "m5oF8kVnxiY" },
        { id: 5, query: "Classroom rules song", videoId: "gy-ncSBEwB0" }
      ],
      bonus_games: [{ id: 1, title: "Bonus: Quiet Please - The Kiboomers Preschool Songs & Nursery Rhymes For Classroom (The Kiboomers - Kids Music Channel)", url: "https://www.gamestolearnenglish.com/numbers/", description: "Count objects." }]
    },
    writing: {
      title: "Video Challenge: Inventory",
      prompt_en: "Count 3 things in your room. Use 'There is/are'.",
      prompt_vi: "Đếm 3 vật trong phòng. Dùng cấu trúc 'There is/are'.",
      min_words: 20,
      keywords: ["there", "are", "count"]
    }
  }
};
export default weekData;
