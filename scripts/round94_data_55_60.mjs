/**
 * scripts/round94_data_55_60.mjs
 * Curated Pedagogical Data for Weeks 55 to 60 (CEFR A2 Flyers Standard)
 * 100% Grounded in Source B Master Syllabus (docs/1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt)
 */

export const ROUND94_WEEKS_55_60 = {
  55: {
    week: 55,
    theme: "ELA: Cause & Effect (Sentences) / Math: Addition with Regrouping",
    title_vi: "ELA: Nguyên nhân & Kết quả (Câu) / Toán: Phép cộng có nhớ",
    grammar_focus: "Conjunctions of Cause and Effect: because, so, therefore",
    syllabus_words: ["cause", "effect", "reason", "result", "happen", "connect", "therefore"],
    vocab: [
      { id: 1, word: "cause", pos: "n", ipa: "/kɔːz/", definition_en: "The reason why something happens.", definition_vi: "nguyên nhân", example_en: "Heavy rain was the main cause of the puddle.", example_vi: "Mưa lớn là nguyên nhân chính tạo nên vũng nước." },
      { id: 2, word: "effect", pos: "n", ipa: "/ɪˈfɛkt/", definition_en: "A result produced by a cause.", definition_vi: "kết quả, tác động", example_en: "One effect of the storm was a fallen tree branch.", example_vi: "Một tác động của cơn bão là cành cây bị gãy." },
      { id: 3, word: "reason", pos: "n", ipa: "/ˈriːzən/", definition_en: "An explanation for why an event occurred.", definition_vi: "lý do", example_en: "The reason the bell rang was that class finished.", example_vi: "Lý do chuông reo là giờ học đã kết thúc." },
      { id: 4, word: "result", pos: "n", ipa: "/rɪˈzʌlt/", definition_en: "Something that happens because of something else.", definition_vi: "kết quả", example_en: "His high score was the result of good practice.", example_vi: "Điểm cao của bạn ấy là kết quả của việc luyện tập chăm chỉ." },
      { id: 5, word: "happen", pos: "v", ipa: "/ˈhæpən/", definition_en: "To take place or occur.", definition_vi: "xảy ra", example_en: "What will happen when you tap the first block?", example_vi: "Điều gì sẽ xảy ra khi bạn chạm vào khối gỗ đầu tiên?" },
      { id: 6, word: "connect", pos: "v", ipa: "/kəˈnɛkt/", definition_en: "To join two or more things together.", definition_vi: "kết nối", example_en: "We use words like because to connect two ideas.", example_vi: "Chúng ta dùng các từ như because để nối hai ý." },
      { id: 7, word: "therefore", pos: "adv", ipa: "/ˈðɛrfɔːr/", definition_en: "For that reason or as a result.", definition_vi: "do đó, vì vậy", example_en: "The floor was wet; therefore, everyone walked carefully.", example_vi: "Sàn nhà bị ướt; do đó, mọi người đi lại cẩn thận." },
      { id: 8, word: "column", pos: "n", ipa: "/ˈkɑːləm/", definition_en: "A straight vertical line of numbers.", definition_vi: "cột số", example_en: "Write the numbers neatly in each column.", example_vi: "Hãy viết các số thẳng hàng trong từng cột." },
      { id: 9, word: "digit", pos: "n", ipa: "/ˈdɪdʒɪt/", definition_en: "Any of the numerals from 0 to 9.", definition_vi: "chữ số", example_en: "The number twenty-four has two digits.", example_vi: "Số hai mươi tư có hai chữ số." },
      { id: 10, word: "carry over", pos: "v", ipa: "/ˈkæri ˈoʊvər/", definition_en: "To move a ten to the next column in addition.", definition_vi: "nhớ sang cột kế tiếp", example_en: "When adding seven and five, carry over one ten.", example_vi: "Khi cộng bảy với năm, hãy nhớ một chục sang cột bên." },
      { id: 11, word: "sum", pos: "n", ipa: "/sʌm/", definition_en: "The total when two numbers are added.", definition_vi: "tổng số", example_en: "The sum of eight and six is fourteen.", example_vi: "Tổng của tám và sáu là mười bốn." },
      { id: 12, word: "ones", pos: "n", ipa: "/wʌnz/", definition_en: "The place value of single units.", definition_vi: "hàng đơn vị", example_en: "Always add the ones column first.", example_vi: "Luôn luôn cộng hàng đơn vị trước." },
      { id: 13, word: "tens", pos: "n", ipa: "/tɛnz/", definition_en: "The place value representing groups of ten.", definition_vi: "hàng chục", example_en: "There are three tens in the number thirty-two.", example_vi: "Có ba chục trong số ba mươi hai." },
      { id: 14, word: "place value", pos: "n", ipa: "/ˈpleɪs ˈvæljuː/", definition_en: "The value of a digit based on where it sits.", definition_vi: "giá trị hàng", example_en: "Place value helps us understand big numbers.", example_vi: "Giá trị hàng giúp chúng ta hiểu các số lớn." },
      { id: 15, word: "domino", pos: "n", ipa: "/ˈdɑːmɪnoʊ/", definition_en: "A small flat rectangular game block.", definition_vi: "quân cờ domino", example_en: "Sam lined up forty domino tiles on the rug.", example_vi: "Sam xếp bốn mươi quân domino trên thảm." },
      { id: 16, word: "action", pos: "n", ipa: "/ˈækʃən/", definition_en: "Something that a person or object does.", definition_vi: "hành động", example_en: "One quick action can start a long chain reaction.", example_vi: "Một hành động nhanh có thể bắt đầu phản ứng dây chuyền dài." },
      { id: 17, word: "fall", pos: "v", ipa: "/fɔːl/", definition_en: "To drop down from an upright position.", definition_vi: "ngã, đổ", example_en: "Watch the colorful blocks fall down in order.", example_vi: "Hãy nhìn các khối gỗ nhiều màu đổ xuống theo thứ tự." },
      { id: 18, word: "block", pos: "n", ipa: "/blɑːk/", definition_en: "A solid piece of wood or plastic.", definition_vi: "khối gỗ, khối nhựa", example_en: "He built a neat line with wooden blocks.", example_vi: "Cậu ấy xếp một hàng ngay ngắn bằng các khối gỗ." },
      { id: 19, word: "step", pos: "n", ipa: "/stɛp/", definition_en: "One action in a series of actions.", definition_vi: "bước thực hiện", example_en: "Follow each step to solve the addition puzzle.", example_vi: "Làm theo từng bước để giải câu đố phép cộng." },
      { id: 20, word: "rule", pos: "n", ipa: "/ruːl/", definition_en: "An instruction that guides how to do something.", definition_vi: "quy tắc", example_en: "The math rule says to add ones before tens.", example_vi: "Quy tắc toán học nói rằng phải cộng hàng đơn vị trước hàng chục." }
    ],
    clil_article: {
      title_en: "The Domino Chain Reaction",
      title_vi: "Phản ứng Dây chuyền của Domino",
      content_en: "Have you ever set up a long line of domino blocks? When you push the first block, an exciting event begins. This is called a chain reaction (a series of linked events). The push is the main cause (the reason something happens). The falling tile is the direct effect (the result of the action). Each block knocks down the next block in line. Therefore, one small push can knock down hundreds of tiles. In English, we use words like 'because' and 'so' to connect these ideas. The first block fell because Leo tapped it. The blocks were close together, so every block fell down. In math, we also see steps that connect together. When we add big numbers, the sum in the ones column can be ten or more. Therefore, we carry over one ten to the tens column. Understanding cause and effect helps us solve puzzles and see how things connect.",
      readability_target: "A2 Flyers (FK 5.5 - 6.5)",
      check_questions: [
        { id: "q1", question_en: "What starts the chain reaction in a domino line?", question_vi: "Điều gì khởi đầu phản ứng dây chuyền trong hàng domino?", options: ["The first push", "A loud whistle", "A bucket of water"], answer: "The first push" },
        { id: "q2", question_en: "Which word links a reason to an event?", question_vi: "Từ nào nối một lý do với một sự kiện?", options: ["Because", "Under", "Behind"], answer: "Because" },
        { id: "q3", question_en: "What do we do in addition when the ones column makes ten or more?", question_vi: "Chúng ta làm gì trong phép cộng khi hàng đơn vị bằng mười trở lên?", options: ["Carry over one ten", "Erase the numbers", "Subtract five"], answer: "Carry over one ten" }
      ],
      glossary: [
        { term: "chain reaction", definition_en: "A series of events where each event causes the next." },
        { term: "cause", definition_en: "The reason why something happens." },
        { term: "effect", definition_en: "The result of an action or event." },
        { term: "carry over", definition_en: "To move a ten to the next column in addition." },
        { term: "connect", definition_en: "To link ideas or objects together." }
      ]
    },
    shadowing_sentences: [
      { id: 1, text: "Leo set up a long line of domino blocks.", ipa: "/ˈli.oʊ sɛt ʌp ə lɔŋ laɪn ʌv ˈdɑmɪnoʊ blɑks/", vietnamese: "Leo đã xếp một hàng dài các khối domino." },
      { id: 2, text: "He pushed the first block with his finger.", ipa: "/hi pʊʃt ðə fɜrst blɑk wɪð hɪz ˈfɪŋɡər/", vietnamese: "Cậu ấy đã đẩy khối đầu tiên bằng ngón tay." },
      { id: 3, text: "One small action caused a big reaction.", ipa: "/wʌn smɔl ˈækʃən kɔzd ə bɪɡ riˈækʃən/", vietnamese: "Một hành động nhỏ đã gây ra phản ứng lớn." },
      { id: 4, text: "All the colorful blocks fell down in order.", ipa: "/ɔl ðə ˈkʌlərfəl blɑks fɛl daʊn ɪn ˈɔrdər/", vietnamese: "Tất cả các khối màu sắc đã đổ xuống theo thứ tự." },
      { id: 5, text: "We use 'because' to explain the reason.", ipa: "/wi juz bɪˈkɔz tu ɪkˈspleɪn ðə ˈrizən/", vietnamese: "Chúng ta dùng 'because' để giải thích lý do." },
      { id: 6, text: "The sum of eight and seven is fifteen.", ipa: "/ðə sʌm ʌv eɪt ænd ˈsɛvən ɪz fɪfˈtin/", vietnamese: "Tổng của tám và bảy là mười lăm." },
      { id: 7, text: "Remember to carry over one ten to the left.", ipa: "/rɪˈmɛmbər tu ˈkæri ˈoʊvər wʌn tɛn tu ðə lɛft/", vietnamese: "Hãy nhớ chuyển một chục sang cột bên trái." },
      { id: 8, text: "Following each step helps us solve the problem.", ipa: "/ˈfɑloʊɪŋ itʃ stɛp hɛlps ʌs sɑlv ðə ˈprɑbləm/", vietnamese: "Làm theo từng bước giúp chúng ta giải quyết bài toán." }
    ],
    speaking_info_exchange: {
      title: "Oliver and Emma's Science Lab Exchange",
      table_a: {
        title: "Oliver's Domino Record",
        person: "Oliver",
        fields: [
          {
            id: "field_a1",
            label: "where / build domino line?",
            cue_prompt: "where / build domino line?",
            cue_word: "where",
            is_missing: true,
            value: "In the school gym",
            acceptable_questions: [
              "Where did Oliver build the domino line?",
              "Where was the domino line built?",
              "Where did he build it?"
            ],
            nova_reply: "Oliver built the long domino line on the floor of the school gym."
          },
          {
            id: "field_a2",
            label: "how many / domino blocks?",
            cue_prompt: "how many / domino blocks?",
            cue_word: "how many",
            is_missing: true,
            value: "450 domino blocks",
            acceptable_questions: [
              "How many domino blocks did he use?",
              "How many blocks were there?",
              "How many dominoes did he set up?"
            ],
            nova_reply: "Oliver set up 450 domino blocks in a long curved line."
          },
          {
            id: "field_a3",
            label: "what / cause first block to fall?",
            cue_prompt: "what / cause first block to fall?",
            cue_word: "what",
            is_missing: true,
            value: "A rolling red marble",
            acceptable_questions: [
              "What caused the first block to fall?",
              "What started the chain reaction?",
              "What hit the first domino?"
            ],
            nova_reply: "A small rolling red marble hit the first block and started the chain reaction."
          },
          {
            id: "field_a4",
            label: "how long / take to finish?",
            cue_prompt: "how long / take to finish?",
            cue_word: "how long",
            is_missing: true,
            value: "35 seconds",
            acceptable_questions: [
              "How long did it take to finish?",
              "How much time did it take?",
              "How long was the chain reaction?"
            ],
            nova_reply: "The whole chain reaction took 35 seconds to finish."
          },
          {
            id: "field_a5",
            label: "who / helped Oliver?",
            cue_prompt: "who / helped Oliver?",
            cue_word: "who",
            is_missing: true,
            value: "His friend Lucas",
            acceptable_questions: [
              "Who helped Oliver?",
              "Who helped him set up the blocks?",
              "Who was his partner?"
            ],
            nova_reply: "His friend Lucas helped him line up all the blocks carefully."
          }
        ]
      },
      table_b: {
        title: "Emma's Science Experiment",
        person: "Emma",
        fields: [
          {
            id: "field_b1",
            label: "what / Emma's experiment?",
            cue_prompt: "what / Emma's experiment?",
            cue_word: "what",
            is_missing: false,
            value: "A water tube chain reaction",
            nova_question: "What was Emma's science experiment about?",
            acceptable_answers: [
              "A water tube chain reaction",
              "A water tube chain reaction.",
              "It was about a water tube chain reaction.",
              "Water tube chain reaction"
            ]
          },
          {
            id: "field_b2",
            label: "where / test experiment?",
            cue_prompt: "where / test experiment?",
            cue_word: "where",
            is_missing: false,
            value: "In the science classroom",
            nova_question: "Where did Emma test her experiment?",
            acceptable_answers: [
              "In the science classroom",
              "In the science classroom.",
              "She tested it in the science classroom.",
              "Science classroom"
            ]
          },
          {
            id: "field_b3",
            label: "what time / test start?",
            cue_prompt: "what time / test start?",
            cue_word: "what time",
            is_missing: false,
            value: "At 2:30 PM",
            nova_question: "What time did her test start?",
            acceptable_answers: [
              "At 2:30 PM",
              "At 2:30",
              "It started at 2:30 PM.",
              "2:30 PM"
            ]
          },
          {
            id: "field_b4",
            label: "how many / tubes used?",
            cue_prompt: "how many / tubes used?",
            cue_word: "how many",
            is_missing: false,
            value: "14 plastic tubes",
            nova_question: "How many tubes did Emma use for the test?",
            acceptable_answers: [
              "14 plastic tubes",
              "Fourteen plastic tubes",
              "She used 14 plastic tubes.",
              "14 tubes"
            ]
          },
          {
            id: "field_b5",
            label: "who / checked the result?",
            cue_prompt: "who / checked the result?",
            cue_word: "who",
            is_missing: false,
            value: "Mr. Davis",
            nova_question: "Who checked the result of her experiment?",
            acceptable_answers: [
              "Mr. Davis",
              "Her teacher Mr. Davis",
              "Mr. Davis checked it.",
              "Teacher Mr. Davis"
            ]
          }
        ]
      }
    }
  },

  56: {
    week: 56,
    theme: "ELA: Cause & Effect (Paragraph) / Math: Subtraction with Regrouping",
    title_vi: "ELA: Nguyên nhân & Kết quả (Đoạn văn) / Toán: Phép trừ có nhớ",
    grammar_focus: "Sentence Connectors: This leads to..., As a result...",
    syllabus_words: ["lead to", "due to", "consequently", "start", "end", "first", "finally"],
    vocab: [
      { id: 1, word: "lead to", pos: "phrase", ipa: "/lid tu/", definition_en: "To cause something to happen as a result.", definition_vi: "dẫn đến", example_en: "Sunny weather will lead to sweet, ripe tomatoes.", example_vi: "Thời tiết nắng sẽ dẫn đến những quả cà chua chín ngọt." },
      { id: 2, word: "due to", pos: "phrase", ipa: "/du tu/", definition_en: "Because of a reason or event.", definition_vi: "do, bởi vì", example_en: "The dry soil was due to the hot sun.", example_vi: "Đất khô cằn là do ánh nắng mặt trời gay gắt." },
      { id: 3, word: "consequently", pos: "adv", ipa: "/ˈkɑːnsəkwəntli/", definition_en: "As a result of what just happened.", definition_vi: "hậu quả là, kết quả là", example_en: "The plants had no rain; consequently, they wilted.", example_vi: "Cây cối không có mưa; kết quả là chúng bị héo." },
      { id: 4, word: "start", pos: "v", ipa: "/stɑːrt/", definition_en: "To begin an action or process.", definition_vi: "bắt đầu", example_en: "We start planting seeds in early spring.", example_vi: "Chúng tôi bắt đầu gieo hạt vào đầu mùa xuân." },
      { id: 5, word: "end", pos: "n", ipa: "/ɛnd/", definition_en: "The final part of a process or period.", definition_vi: "kết thúc", example_en: "At the end of summer, the garden was full of beans.", example_vi: "Vào cuối mùa hè, khu vườn đầy những quả đậu." },
      { id: 6, word: "first", pos: "adv", ipa: "/fɜːrst/", definition_en: "Before anything else in time or order.", definition_vi: "đầu tiên", example_en: "First, dig small holes in the rich soil.", example_vi: "Đầu tiên, hãy đào những hố nhỏ trên đất màu mỡ." },
      { id: 7, word: "finally", pos: "adv", ipa: "/ˈfaɪnəli/", definition_en: "After a long time or at the last step.", definition_vi: "cuối cùng", example_en: "Finally, the green sprouts pushed through the dirt.", example_vi: "Cuối cùng, những mầm xanh đã nhú lên qua mặt đất." },
      { id: 8, word: "borrow", pos: "v", ipa: "/ˈbɑːroʊ/", definition_en: "To take a ten from the tens column to regroup.", definition_vi: "mượn (trong phép trừ)", example_en: "We borrow one ten when the top digit is too small.", example_vi: "Chúng ta mượn một chục khi chữ số bên trên quá nhỏ." },
      { id: 9, word: "regroup", pos: "v", ipa: "/riːˈɡruːp/", definition_en: "To change groups of ones and tens in math.", definition_vi: "đổi nhóm", example_en: "Regroup forty into three tens and ten ones.", example_vi: "Đổi nhóm bốn mươi thành ba chục và mười đơn vị." },
      { id: 10, word: "difference", pos: "n", ipa: "/ˈdɪfərəns/", definition_en: "The result of subtracting one number from another.", definition_vi: "hiệu số", example_en: "The difference between nine and four is five.", example_vi: "Hiệu giữa chín và bốn là năm." },
      { id: 11, word: "minus", pos: "prep", ipa: "/ˈmaɪnəs/", definition_en: "Used to show subtraction.", definition_vi: "trừ", example_en: "Fifteen minus seven leaves eight.", example_vi: "Mười lăm trừ bảy còn tám." },
      { id: 12, word: "subtract", pos: "v", ipa: "/səbˈtrækt/", definition_en: "To take one number away from another.", definition_vi: "thực hiện phép trừ", example_en: "Subtract the ones column first.", example_vi: "Hãy trừ hàng đơn vị trước." },
      { id: 13, word: "bottom number", pos: "phrase", ipa: "/ˈbɑːtəm ˈnʌmbər/", definition_en: "The number being subtracted in a column.", definition_vi: "số trừ bên dưới", example_en: "Compare the top number with the bottom number.", example_vi: "So sánh chữ số bên trên với chữ số bên dưới." },
      { id: 14, word: "garden", pos: "n", ipa: "/ˈɡɑːrdən/", definition_en: "A plot of ground where plants and flowers grow.", definition_vi: "khu vườn", example_en: "The children water the school garden every morning.", example_vi: "Các em nhỏ tưới nước cho vườn trường mỗi sáng." },
      { id: 15, word: "plant", pos: "n", ipa: "/plænt/", definition_en: "A living thing that grows in earth and has leaves.", definition_vi: "cây cối", example_en: "Every green plant needs sunlight and clean water.", example_vi: "Mỗi cây xanh đều cần ánh nắng và nước sạch." },
      { id: 16, word: "water", pos: "v", ipa: "/ˈwɔːtər/", definition_en: "To pour water on plants.", definition_vi: "tưới nước", example_en: "Remember to water the young carrots today.", example_vi: "Hãy nhớ tưới nước cho những cây cà rốt non hôm nay." },
      { id: 17, word: "grow", pos: "v", ipa: "/ɡroʊ/", definition_en: "To get bigger or taller over time.", definition_vi: "phát triển, lớn lên", example_en: "Warm sunny days help the beans grow quickly.", example_vi: "Những ngày nắng ấm giúp đậu lớn rất nhanh." },
      { id: 18, word: "seed", pos: "n", ipa: "/siːd/", definition_en: "A small hard part from which a new plant grows.", definition_vi: "hạt giống", example_en: "Place two tiny seeds inside each hole.", example_vi: "Đặt hai hạt giống nhỏ vào từng lỗ." },
      { id: 19, word: "weather", pos: "n", ipa: "/ˈwɛðər/", definition_en: "The state of the air like sun, rain, or heat.", definition_vi: "thời tiết", example_en: "Dry weather makes the garden ground hard.", example_vi: "Thời tiết khô hanh làm đất vườn bị cứng." },
      { id: 20, word: "dry", pos: "adj", ipa: "/draɪ/", definition_en: "Having no water or moisture.", definition_vi: "khô ráo", example_en: "Dry leaves fell from the thirsty sunflower.", example_vi: "Những chiếc lá khô rụng xuống từ cây hướng dương đang khát nước." }
    ],
    clil_article: {
      title_en: "The Community Garden Chain",
      title_vi: "Chuỗi Sự kiện trong Vườn Cộng đồng",
      content_en: "A school garden shows how actions connect in a natural chain. At the start of summer, dry weather made the garden ground thirsty. This dry soil was due to hot sunny weeks with no rain. Consequently, the young tomato plants began to wilt. The children noticed this problem right away. First, they brought big watering cans from the school tap. They watered every dry bed carefully. Regular watering will lead to moist soil around each green plant. Healthy roots absorb cool water quickly. Finally, at the end of the season, bright red tomatoes grew on every vine. In math, subtraction also follows connected steps. When the top digit is smaller than the bottom number, we cannot subtract right away. Therefore, we borrow one ten and regroup. Understanding cause, effect, and subtraction helps our garden and our math grow strong.",
      readability_target: "A2 Flyers (FK 5.5 - 6.5)",
      check_questions: [
        { id: "q1", question_en: "Why was the garden soil very dry?", question_vi: "Tại sao đất trong vườn lại rất khô?", options: ["Due to hot sun and no rain", "Because of a river flood", "Because students brought ice"], answer: "Due to hot sun and no rain" },
        { id: "q2", question_en: "What did the students do first to help the plants?", question_vi: "Các em học sinh đã làm gì đầu tiên để giúp cây?", options: ["Watered every dry bed", "Painted the garden fence", "Sold the vegetables"], answer: "Watered every dry bed" },
        { id: "q3", question_en: "What math step do we take when the top digit is too small?", question_vi: "Chúng ta làm bước toán nào khi chữ số bên trên quá nhỏ?", options: ["Borrow and regroup", "Add forty", "Skip the column"], answer: "Borrow and regroup" }
      ],
      glossary: [
        { term: "due to", definition_en: "Because of a specific reason." },
        { term: "consequently", definition_en: "As a result of what happened before." },
        { term: "lead to", definition_en: "To cause a result to happen." },
        { term: "regroup", definition_en: "To rearrange groups of tens and ones in math." },
        { term: "borrow", definition_en: "To take one ten from the next column to subtract." }
      ]
    },
    shadowing_sentences: [
      { id: 1, text: "Dry weather made the garden soil very thirsty.", ipa: "/draɪ ˈwɛðər meɪd ðə ˈɡɑrdən sɔɪl ˈvɛri ˈθɜrsti/", vietnamese: "Thời tiết khô hanh khiến đất vườn rất khát nước." },
      { id: 2, text: "The wilting leaves were due to no rain.", ipa: "/ðə ˈwɪltɪŋ livz wɜr du tu noʊ reɪn/", vietnamese: "Những chiếc lá héo là do không có mưa." },
      { id: 3, text: "Consequently, the children brought big watering cans.", ipa: "/ˈkɑnsəkwəntli ðə ˈtʃɪldrən brɔt bɪɡ ˈwɔtərɪŋ kænz/", vietnamese: "Kết quả là các em nhỏ đã mang những bình tưới lớn tới." },
      { id: 4, text: "First, they watered each small green plant.", ipa: "/fɜrst ðeɪ ˈwɔtərd itʃ smɔl ɡrin plænt/", vietnamese: "Đầu tiên, các em tưới nước cho từng cây xanh nhỏ." },
      { id: 5, text: "This careful work led to fresh sweet fruit.", ipa: "/ðɪs ˈkɛrfəl wɜrk lɛd tu frɛʃ swit frut/", vietnamese: "Công việc cẩn thận này đã mang lại quả ngọt tươi ngon." },
      { id: 6, text: "Finally, red tomatoes grew on every vine.", ipa: "/ˈfaɪnəli rɛd təˈmeɪtoʊz ɡru ɑn ˈɛvri vaɪn/", vietnamese: "Cuối cùng, những quả cà chua đỏ đã lớn trên từng cành." },
      { id: 7, text: "Remember to borrow one ten when subtracting.", ipa: "/rɪˈmɛmbər tu ˈbɑroʊ wʌn tɛn wɛn səbˈtræktɪŋ/", vietnamese: "Hãy nhớ mượn một chục khi làm phép trừ." },
      { id: 8, text: "Regrouping numbers makes difficult math problems easy.", ipa: "/riˈɡrupɪŋ ˈnʌmbərz meɪks ˈdɪfəkəlt mæθ ˈprɑbləmz ˈizi/", vietnamese: "Đổi nhóm các số giúp các bài toán khó trở nên dễ dàng." }
    ],
    speaking_info_exchange: {
      title: "David and Maya's Garden Project Exchange",
      table_a: {
        title: "David's School Garden",
        person: "David",
        fields: [
          {
            id: "field_a1",
            label: "where / David's garden?",
            cue_prompt: "where / David's garden?",
            cue_word: "where",
            is_missing: true,
            value: "Behind the school cafeteria",
            acceptable_questions: [
              "Where is David's garden?",
              "Where did David make the garden?",
              "Where is his garden located?"
            ],
            nova_reply: "David's garden is located right behind the school cafeteria."
          },
          {
            id: "field_a2",
            label: "what vegetables / plant?",
            cue_prompt: "what vegetables / plant?",
            cue_word: "what",
            is_missing: true,
            value: "Tomatoes and carrots",
            acceptable_questions: [
              "What vegetables did he plant?",
              "What did David grow?",
              "What kind of vegetables are in the garden?"
            ],
            nova_reply: "David planted sweet red tomatoes and crunchy orange carrots."
          },
          {
            id: "field_a3",
            label: "when / water the plants?",
            cue_prompt: "when / water the plants?",
            cue_word: "when",
            is_missing: true,
            value: "At 8:00 AM every morning",
            acceptable_questions: [
              "When does David water the plants?",
              "What time does he water them?",
              "When do they water the garden?"
            ],
            nova_reply: "He waters the plants at 8:00 AM every morning before class."
          },
          {
            id: "field_a4",
            label: "how many / tomato plants?",
            cue_prompt: "how many / tomato plants?",
            cue_word: "how many",
            is_missing: true,
            value: "25 tomato plants",
            acceptable_questions: [
              "How many tomato plants are there?",
              "How many plants did he grow?",
              "How many tomatoes did they plant?"
            ],
            nova_reply: "There are 25 healthy tomato plants growing in his garden bed."
          },
          {
            id: "field_a5",
            label: "who / helped David?",
            cue_prompt: "who / helped David?",
            cue_word: "who",
            is_missing: true,
            value: "His teacher Mrs. Green",
            acceptable_questions: [
              "Who helped David?",
              "Who helped him in the garden?",
              "Who worked with David?"
            ],
            nova_reply: "His science teacher Mrs. Green helped him set up the watering cans."
          }
        ]
      },
      table_b: {
        title: "Maya's Vegetable Patch",
        person: "Maya",
        fields: [
          {
            id: "field_b1",
            label: "what / Maya's favorite plant?",
            cue_prompt: "what / Maya's favorite plant?",
            cue_word: "what",
            is_missing: false,
            value: "Green bean plants",
            nova_question: "What is Maya's favorite plant in her vegetable patch?",
            acceptable_answers: [
              "Green bean plants",
              "Green bean plants.",
              "Her favorite plant is green bean plants.",
              "Green beans"
            ]
          },
          {
            id: "field_b2",
            label: "where / patch located?",
            cue_prompt: "where / patch located?",
            cue_word: "where",
            is_missing: false,
            value: "Next to the sunny playground",
            nova_question: "Where is Maya's vegetable patch located?",
            acceptable_answers: [
              "Next to the sunny playground",
              "Next to the playground.",
              "It is next to the sunny playground.",
              "Near the playground"
            ]
          },
          {
            id: "field_b3",
            label: "how many / bean pods picked?",
            cue_prompt: "how many / bean pods picked?",
            cue_word: "how many",
            is_missing: false,
            value: "60 bean pods",
            nova_question: "How many bean pods did Maya pick yesterday?",
            acceptable_answers: [
              "60 bean pods",
              "Sixty bean pods",
              "She picked 60 bean pods.",
              "60 pods"
            ]
          },
          {
            id: "field_b4",
            label: "what time / pick beans?",
            cue_prompt: "what time / pick beans?",
            cue_word: "what time",
            is_missing: false,
            value: "At 3:45 PM",
            nova_question: "What time did she pick the beans?",
            acceptable_answers: [
              "At 3:45 PM",
              "At 3:45",
              "She picked them at 3:45 PM.",
              "3:45 PM"
            ]
          },
          {
            id: "field_b5",
            label: "who / ate the fresh beans?",
            cue_prompt: "who / ate the fresh beans?",
            cue_word: "who",
            is_missing: false,
            value: "Her family at dinner",
            nova_question: "Who ate the fresh beans from her patch?",
            acceptable_answers: [
              "Her family at dinner",
              "Her family",
              "Her family ate them at dinner.",
              "Maya's family"
            ]
          }
        ]
      }
    }
  },

  57: {
    week: 57,
    theme: "ELA: Problem & Solution (Sentences) / Math: Multiplication Concepts",
    title_vi: "ELA: Vấn đề & Giải pháp (Câu) / Toán: Khái niệm Phép nhân",
    grammar_focus: "Modals of Possibility: We can..., We could..., We should...",
    syllabus_words: ["problem", "solution", "fix", "solve", "idea", "suggest", "broken", "repair"],
    vocab: [
      { id: 1, word: "problem", pos: "n", ipa: "/ˈprɑːbləm/", definition_en: "A difficulty that needs to be resolved.", definition_vi: "vấn đề, khó khăn", example_en: "A leaky faucet is a small home problem.", example_vi: "Vòi nước bị rò rỉ là một vấn đề nhỏ trong nhà." },
      { id: 2, word: "solution", pos: "n", ipa: "/səˈluːʃən/", definition_en: "An answer or way to fix a problem.", definition_vi: "giải pháp", example_en: "Tightening the screw was the best solution.", example_vi: "Vặn chặt ốc vít là giải pháp tốt nhất." },
      { id: 3, word: "fix", pos: "v", ipa: "/fɪks/", definition_en: "To repair or make something work again.", definition_vi: "sửa chữa", example_en: "Dad can fix the broken bicycle chain.", example_vi: "Bố có thể sửa xích xe đạp bị hỏng." },
      { id: 4, word: "solve", pos: "v", ipa: "/sɑːlv/", definition_en: "To find an answer to a problem or puzzle.", definition_vi: "giải quyết", example_en: "We can solve the math puzzle together.", example_vi: "Chúng ta có thể cùng nhau giải câu đố toán học." },
      { id: 5, word: "idea", pos: "n", ipa: "/aɪˈdiːə/", definition_en: "A thought or plan formed in the mind.", definition_vi: "ý tưởng", example_en: "Anna had a clever idea to save water.", example_vi: "Anna có một ý tưởng thông minh để tiết kiệm nước." },
      { id: 6, word: "suggest", pos: "v", ipa: "/səɡˈdʒɛst/", definition_en: "To put forward an idea for consideration.", definition_vi: "gợi ý, đề xuất", example_en: "I suggest we put labels on the storage boxes.", example_vi: "Tôi gợi ý chúng ta nên dán nhãn lên các hộp chứa đồ." },
      { id: 7, word: "broken", pos: "adj", ipa: "/ˈbroʊkən/", definition_en: "Damaged or not working properly.", definition_vi: "bị hỏng, bị vỡ", example_en: "Do not sit on the broken wooden chair.", example_vi: "Đừng ngồi lên chiếc ghế gỗ bị hỏng." },
      { id: 8, word: "repair", pos: "v", ipa: "/rɪˈpɛr/", definition_en: "To mend something that is broken.", definition_vi: "sửa chữa, hàn gắn", example_en: "The mechanic will repair the wagon wheel.", example_vi: "Người thợ sẽ sửa bánh xe kéo." },
      { id: 9, word: "multiply", pos: "v", ipa: "/ˈmʌltɪplaɪ/", definition_en: "To add a number to itself many times.", definition_vi: "nhân", example_en: "Multiply four by three to get twelve.", example_vi: "Nhân bốn với ba để được mười hai." },
      { id: 10, word: "times", pos: "prep", ipa: "/taɪmz/", definition_en: "Multiplied by.", definition_vi: "lần (phép nhân)", example_en: "Five times two equals ten.", example_vi: "Năm nhân hai bằng mười." },
      { id: 11, word: "groups of", pos: "phrase", ipa: "/ɡrups ʌv/", definition_en: "Equal sets of items.", definition_vi: "các nhóm gồm", example_en: "Three groups of four make twelve apples.", example_vi: "Ba nhóm bốn quả tạo thành mười hai quả táo." },
      { id: 12, word: "product", pos: "n", ipa: "/ˈprɑːdʌkt/", definition_en: "The result of multiplying two numbers.", definition_vi: "tích số", example_en: "The product of six and two is twelve.", example_vi: "Tích của sáu và hai là mười hai." },
      { id: 13, word: "array", pos: "n", ipa: "/əˈreɪ/", definition_en: "An arrangement of objects in rows and columns.", definition_vi: "mảng hàng và cột", example_en: "The stamps were arranged in a neat three-by-four array.", example_vi: "Những con tem được xếp thành một mảng ba nhân bốn ngay ngắn." },
      { id: 14, word: "repeated addition", pos: "phrase", ipa: "/rɪˈpitɪd əˈdɪʃən/", definition_en: "Adding the same number over and over.", definition_vi: "phép cộng lặp lại", example_en: "We use repeated addition to count equal groups of apples.", example_vi: "Phép nhân thực chất là phép cộng lặp lại." },
      { id: 15, word: "tool", pos: "n", ipa: "/tuːl/", definition_en: "An instrument used to do practical work.", definition_vi: "dụng cụ", example_en: "A screwdriver is a useful repair tool.", example_vi: "Tua vít là một dụng cụ sửa chữa hữu ích." },
      { id: 16, word: "machine", pos: "n", ipa: "/məˈʃiːn/", definition_en: "An apparatus using power to perform work.", definition_vi: "máy móc", example_en: "A sewing machine helps mend torn clothes.", example_vi: "Máy may giúp vá quần áo bị rách." },
      { id: 17, word: "help", pos: "v", ipa: "/hɛlp/", definition_en: "To give assistance or support.", definition_vi: "giúp đỡ", example_en: "Good tools help us fix broken toys.", example_vi: "Dụng cụ tốt giúp chúng ta sửa đồ chơi hỏng." },
      { id: 18, word: "build", pos: "v", ipa: "/bɪld/", definition_en: "To construct something by putting parts together.", definition_vi: "xây dựng, lắp ráp", example_en: "Students build wooden birdhouses in workshop class.", example_vi: "Học sinh lắp ráp chuồng chim bằng gỗ trong giờ thực hành." },
      { id: 19, word: "work", pos: "v", ipa: "/wɜːrk/", definition_en: "To function correctly.", definition_vi: "hoạt động tốt", example_en: "After oiling the gears, the clock will work.", example_vi: "Sau khi tra dầu vào bánh răng, đồng hồ sẽ hoạt động tốt." },
      { id: 20, word: "clever", pos: "adj", ipa: "/ˈklɛvər/", definition_en: "Smart and quick at learning or solving things.", definition_vi: "thông minh, khéo léo", example_en: "She found a clever solution to carry books.", example_vi: "Bạn ấy tìm ra giải pháp thông minh để mang sách." }
    ],
    clil_article: {
      title_en: "The Fix-It Squad: Inventions and Arrays",
      title_vi: "Biệt đội Sửa chữa: Sáng chế và Mảng số",
      content_en: "Every day, people meet small problems that need smart thinking. A wheel might break, or a desk may wobble. When a tool is broken (not working), we look for a practical solution (a way to fix it). In English, we use modal words like 'can', 'could', and 'should' to suggest ideas. For example, we could tighten the bolts, or we should replace the wooden peg. Creative thinkers work together to fix and repair broken things. In math, multiplication helps us organize our tools. Multiplication is repeated addition (adding equal groups). If we put four wrenches in each toolbox, three toolboxes have twelve wrenches. We can show this with an array (rows and columns). Three rows of four give a product of twelve. Clever ideas and math arrays help us solve problems every day.",
      readability_target: "A2 Flyers (FK 5.5 - 6.5)",
      check_questions: [
        { id: "q1", question_en: "What do we look for when something is broken?", question_vi: "Chúng ta tìm kiếm điều gì khi một đồ vật bị hỏng?", options: ["A practical solution", "A bucket of sand", "A loud whistle"], answer: "A practical solution" },
        { id: "q2", question_en: "What is multiplication in simple terms?", question_vi: "Phép nhân theo cách hiểu đơn giản là gì?", options: ["Repeated addition", "Subtraction", "A compass direction"], answer: "Repeated addition" },
        { id: "q3", question_en: "What do rows and columns form in math?", question_vi: "Các hàng và cột tạo thành gì trong toán học?", options: ["An array", "A circle", "A triangle"], answer: "An array" }
      ],
      glossary: [
        { term: "problem", definition_en: "A situation that causes difficulty." },
        { term: "solution", definition_en: "An answer or method to fix a difficulty." },
        { term: "repair", definition_en: "To fix something that is broken." },
        { term: "array", definition_en: "An arrangement of objects in equal rows and columns." },
        { term: "product", definition_en: "The total result in multiplication." }
      ]
    },
    shadowing_sentences: [
      { id: 1, text: "A broken tool is a problem we can solve.", ipa: "/ə ˈbroʊkən tul ɪz ə ˈprɑbləm wi kæn sɑlv/", vietnamese: "Một dụng cụ hỏng là vấn đề chúng ta có thể giải quyết." },
      { id: 2, text: "We should suggest a clever new idea.", ipa: "/wi ʃʊd səɡˈdʒɛst ə ˈklɛvər nu aɪˈdiə/", vietnamese: "Chúng ta nên đề xuất một ý tưởng mới thông minh." },
      { id: 3, text: "The mechanic will repair the loose wheel.", ipa: "/ðə məˈkænɪk wɪl rɪˈpɛr ðə lus wil/", vietnamese: "Người thợ sẽ sửa chiếc bánh xe bị lỏng." },
      { id: 4, text: "Multiplication means repeated addition of equal groups.", ipa: "/ˌmʌltəpləˈkeɪʃən minz rɪˈpitɪd əˈdɪʃən ʌv ˈikwəl ɡrups/", vietnamese: "Phép nhân nghĩa là phép cộng lặp lại của các nhóm bằng nhau." },
      { id: 5, text: "Three groups of four make twelve pencils.", ipa: "/θri ɡrups ʌv fɔr meɪk twɛlv ˈpɛnsəlz/", vietnamese: "Ba nhóm bốn tạo thành mười hai chiếc bút chì." },
      { id: 6, text: "We can arrange our blocks in a neat array.", ipa: "/wi kæn əˈreɪndʒ ˈaʊər blɑks ɪn ə nit əˈreɪ/", vietnamese: "Chúng ta có thể xếp các khối gỗ thành một mảng ngay ngắn." },
      { id: 7, text: "Four times three gives a product of twelve.", ipa: "/fɔr taɪmz θri ɡɪvz ə ˈprɑdʌkt ʌv twɛlv/", vietnamese: "Bốn nhân ba cho ra tích số là mười hai." },
      { id: 8, text: "Good tools help people work together and fix things.", ipa: "/ɡʊd tulz hɛlp ˈpipəl wɜrk təˈɡɛðər ænd fɪks θɪŋz/", vietnamese: "Dụng cụ tốt giúp mọi người làm việc cùng nhau và sửa chữa đồ vật." }
    ],
    speaking_info_exchange: {
      title: "Sam and Lily's Fix-It Invention Exchange",
      table_a: {
        title: "Sam's Robot Helper",
        person: "Sam",
        fields: [
          {
            id: "field_a1",
            label: "what / Sam's invention?",
            cue_prompt: "what / Sam's invention?",
            cue_word: "what",
            is_missing: true,
            value: "A rolling tool robot",
            acceptable_questions: [
              "What is Sam's invention?",
              "What did Sam invent?",
              "What kind of robot did Sam make?"
            ],
            nova_reply: "Sam invented a small rolling robot that carries repair tools."
          },
          {
            id: "field_a2",
            label: "what problem / solve?",
            cue_prompt: "what problem / solve?",
            cue_word: "what",
            is_missing: true,
            value: "Carrying heavy toolboxes",
            acceptable_questions: [
              "What problem does it solve?",
              "What does it help fix?",
              "Why did he build it?"
            ],
            nova_reply: "It solves the problem of carrying heavy toolboxes around the workshop."
          },
          {
            id: "field_a3",
            label: "how many / wheels on robot?",
            cue_prompt: "how many / wheels on robot?",
            cue_word: "how many",
            is_missing: true,
            value: "4 rubber wheels",
            acceptable_questions: [
              "How many wheels does it have?",
              "How many wheels are on the robot?",
              "How many wheels did he put on it?"
            ],
            nova_reply: "The robot rolls smoothly on 4 sturdy rubber wheels."
          },
          {
            id: "field_a4",
            label: "where / test the robot?",
            cue_prompt: "where / test the robot?",
            cue_word: "where",
            is_missing: true,
            value: "In the school workshop",
            acceptable_questions: [
              "Where did he test the robot?",
              "Where was the robot tested?",
              "Where does it work?"
            ],
            nova_reply: "Sam tested the robot in the school workshop yesterday afternoon."
          },
          {
            id: "field_a5",
            label: "who / helped Sam build it?",
            cue_prompt: "who / helped Sam build it?",
            cue_word: "who",
            is_missing: true,
            value: "His older brother Alex",
            acceptable_questions: [
              "Who helped Sam build it?",
              "Who helped him make the robot?",
              "Who was his partner?"
            ],
            nova_reply: "His older brother Alex helped him connect the robot's electric wires."
          }
        ]
      },
      table_b: {
        title: "Lily's Solar Light Fix",
        person: "Lily",
        fields: [
          {
            id: "field_b1",
            label: "what / Lily's invention?",
            cue_prompt: "what / Lily's invention?",
            cue_word: "what",
            is_missing: false,
            value: "A solar reading lamp",
            nova_question: "What is Lily's new invention?",
            acceptable_answers: [
              "A solar reading lamp",
              "A solar reading lamp.",
              "It is a solar reading lamp.",
              "Solar lamp"
            ]
          },
          {
            id: "field_b2",
            label: "where / lamp placed?",
            cue_prompt: "where / lamp placed?",
            cue_word: "where",
            is_missing: false,
            value: "On the outdoor study desk",
            nova_question: "Where is her solar reading lamp placed?",
            acceptable_answers: [
              "On the outdoor study desk",
              "On the study desk.",
              "It is on the outdoor study desk.",
              "Study desk"
            ]
          },
          {
            id: "field_b3",
            label: "how many / LED bulbs?",
            cue_prompt: "how many / LED bulbs?",
            cue_word: "how many",
            is_missing: false,
            value: "6 bright LED bulbs",
            nova_question: "How many LED bulbs are inside the lamp?",
            acceptable_answers: [
              "6 bright LED bulbs",
              "Six bright LED bulbs",
              "There are 6 LED bulbs.",
              "6 bulbs"
            ]
          },
          {
            id: "field_b4",
            label: "what time / light turn on?",
            cue_prompt: "what time / light turn on?",
            cue_word: "what time",
            is_missing: false,
            value: "At 6:30 PM",
            nova_question: "What time does her solar lamp turn on?",
            acceptable_answers: [
              "At 6:30 PM",
              "At 6:30",
              "It turns on at 6:30 PM.",
              "6:30 PM"
            ]
          },
          {
            id: "field_b5",
            label: "who / tested the light?",
            cue_prompt: "who / tested the light?",
            cue_word: "who",
            is_missing: false,
            value: "Her friend Maya",
            nova_question: "Who tested the solar reading lamp with her?",
            acceptable_answers: [
              "Her friend Maya",
              "Maya",
              "Her friend Maya tested it.",
              "Friend Maya"
            ]
          }
        ]
      }
    }
  },

  58: {
    week: 58,
    theme: "ELA: Problem & Solution (Paragraph) / Math: Division Concepts",
    title_vi: "ELA: Vấn đề & Giải pháp (Đoạn văn) / Toán: Khái niệm Phép chia",
    grammar_focus: "First Conditional (Simple): If we [fix it], it will be [better].",
    syllabus_words: ["plan", "step", "improve", "better", "success", "fail", "strategy"],
    vocab: [
      { id: 1, word: "plan", pos: "n", ipa: "/plæn/", definition_en: "A set of actions decided on beforehand.", definition_vi: "kế hoạch", example_en: "Our class made a clear plan to clean the playground.", example_vi: "Lớp chúng tôi lập kế hoạch rõ ràng để dọn sạch sân chơi." },
      { id: 2, word: "step", pos: "n", ipa: "/stɛp/", definition_en: "One of a series of actions taken to achieve a goal.", definition_vi: "bước đi, biện pháp", example_en: "The first step was to sort all the recycling bins.", example_vi: "Bước đầu tiên là phân loại tất cả các thùng tái chế." },
      { id: 3, word: "improve", pos: "v", ipa: "/ɪmˈpruːv/", definition_en: "To make or become better.", definition_vi: "cải thiện, nâng cao", example_en: "Reading every day helps children improve their English skills.", example_vi: "Đọc sách hàng ngày sẽ cải thiện vốn từ vựng của bạn." },
      { id: 4, word: "better", pos: "adj", ipa: "/ˈbɛtər/", definition_en: "Of a higher quality or more suitable.", definition_vi: "tốt hơn", example_en: "A shared schedule will make library time better.", example_vi: "Một thời gian biểu dùng chung sẽ giúp thời gian đọc sách tốt hơn." },
      { id: 5, word: "success", pos: "n", ipa: "/səkˈsɛs/", definition_en: "The achievement of an aim or purpose.", definition_vi: "sự thành công", example_en: "The school book fair was a wonderful success.", example_vi: "Hội chợ sách của trường là một thành công tuyệt vời." },
      { id: 6, word: "fail", pos: "v", ipa: "/feɪl/", definition_en: "To be unsuccessful in achieving an aim.", definition_vi: "thất bại, không thành công", example_en: "If we forget our plan, our effort might fail.", example_vi: "Nếu quên kế hoạch, nỗ lực của chúng ta có thể không thành công." },
      { id: 7, word: "strategy", pos: "n", ipa: "/ˈstrætədʒi/", definition_en: "A smart plan to achieve a goal.", definition_vi: "chiến lược", example_en: "Dividing tasks fairly is a great team strategy.", example_vi: "Chia đều nhiệm vụ là một chiến lược làm việc nhóm tuyệt vời." },
      { id: 8, word: "divide", pos: "v", ipa: "/dɪˈvaɪd/", definition_en: "To separate into equal parts.", definition_vi: "chia", example_en: "Divide twelve pencils among three students.", example_vi: "Chia mười hai chiếc bút chì cho ba học sinh." },
      { id: 9, word: "share equally", pos: "phrase", ipa: "/ʃɛr ˈikwəli/", definition_en: "To distribute items so everyone has the same.", definition_vi: "chia đều", example_en: "Let us share the red apples equally.", example_vi: "Hãy chia đều những quả táo đỏ." },
      { id: 10, word: "split", pos: "v", ipa: "/splɪt/", definition_en: "To divide something into parts or groups.", definition_vi: "tách ra, chia phần", example_en: "Split the class into four equal teams.", example_vi: "Tách cả lớp thành bốn đội bằng nhau." },
      { id: 11, word: "quotient", pos: "n", ipa: "/ˈkwoʊʃənt/", definition_en: "The result of dividing one number by another.", definition_vi: "thương số", example_en: "The quotient of eight divided by two is four.", example_vi: "Thương số của tám chia hai là bốn." },
      { id: 12, word: "equal", pos: "adj", ipa: "/ˈiːkwəl/", definition_en: "Being the same in quantity or value.", definition_vi: "bằng nhau", example_en: "Each box holds an equal number of chalks.", example_vi: "Mỗi hộp chứa số lượng phấn bằng nhau." },
      { id: 13, word: "fair share", pos: "phrase", ipa: "/fɛr ʃɛr/", definition_en: "An equal and honest portion for each person.", definition_vi: "phần chia công bằng", example_en: "Every child received a fair share of grapes.", example_vi: "Mỗi bạn nhỏ đều nhận được một phần nho công bằng." },
      { id: 14, word: "group", pos: "n", ipa: "/ɡruːp/", definition_en: "A number of people or things gathered together.", definition_vi: "nhóm", example_en: "Each study group needs five reading books.", example_vi: "Mỗi nhóm học tập cần năm cuốn sách đọc." },
      { id: 15, word: "class", pos: "n", ipa: "/klæs/", definition_en: "A group of students learning together.", definition_vi: "lớp học", example_en: "Our class planned a playground schedule.", example_vi: "Lớp chúng tôi đã lên thời khóa biểu cho sân chơi." },
      { id: 16, word: "team", pos: "n", ipa: "/tiːm/", definition_en: "A group of people working toward a common goal.", definition_vi: "đội, nhóm làm việc", example_en: "The green team gathered all the footballs.", example_vi: "Đội xanh lá đã thu gom tất cả quả bóng đá." },
      { id: 17, word: "together", pos: "adv", ipa: "/təˈɡɛðər/", definition_en: "With or in proximity to another person.", definition_vi: "cùng nhau", example_en: "When we work together, tasks finish faster.", example_vi: "Khi làm việc cùng nhau, các nhiệm vụ hoàn thành nhanh hơn." },
      { id: 18, word: "rule", pos: "n", ipa: "/ruːl/", definition_en: "A statement of what you must do.", definition_vi: "luật lệ", example_en: "A simple sharing rule makes recess peaceful.", example_vi: "Một quy tắc chia sẻ đơn giản giúp giờ ra chơi êm ấm." },
      { id: 19, word: "fruit", pos: "n", ipa: "/fruːt/", definition_en: "Sweet food that grows on trees or plants.", definition_vi: "hoa quả", example_en: "We divided the fresh fruit among four bowls.", example_vi: "Chúng tôi đã chia hoa quả tươi vào bốn chiếc bát." },
      { id: 20, word: "snack", pos: "n", ipa: "/snæk/", definition_en: "A small portion of food eaten between meals.", definition_vi: "món ăn nhẹ", example_en: "Healthy snacks give students good energy.", example_vi: "Đồ ăn nhẹ lành mạnh mang lại năng lượng tốt cho học sinh." }
    ],
    clil_article: {
      title_en: "Sharing Resources: The Master Plan",
      title_vi: "Chia sẻ Tài nguyên: Kế hoạch Lớn",
      content_en: "When students share equipment, problems can happen if there is no plan. If two groups want the same football, an argument begins. To solve this, our class wrote a fair sharing strategy (a smart action plan). First, we identified the problem: there were only six footballs for twelve students. Next, we suggested a clear solution: divide the balls equally. In math, division means sharing equally among groups. If we divide six balls among three teams, each team gets two balls. The number two is the quotient (the result of division). When everyone gets a fair share, our game is a success. If we follow this plan, play will be better and nobody will fail. Good division and teamwork make our playground a happy place.",
      readability_target: "A2 Flyers (FK 5.5 - 6.5)",
      check_questions: [
        { id: "q1", question_en: "What was the problem on the playground?", question_vi: "Vấn đề trên sân chơi là gì?", options: ["Not enough footballs for everyone", "The grass was too wet", "The school bell was broken"], answer: "Not enough footballs for everyone" },
        { id: "q2", question_en: "What does division mean in math?", question_vi: "Phép chia có nghĩa là gì trong toán học?", options: ["Sharing equally among groups", "Adding big numbers", "Drawing circles"], answer: "Sharing equally among groups" },
        { id: "q3", question_en: "What is the result of division called?", question_vi: "Kết quả của phép chia được gọi là gì?", options: ["The quotient", "The sum", "The corner"], answer: "The quotient" }
      ],
      glossary: [
        { term: "plan", definition_en: "A decided set of actions to achieve a goal." },
        { term: "strategy", definition_en: "A clever plan for success." },
        { term: "divide", definition_en: "To separate into equal parts." },
        { term: "quotient", definition_en: "The answer when you divide numbers." },
        { term: "fair share", definition_en: "An equal portion for every person." }
      ]
    },
    shadowing_sentences: [
      { id: 1, text: "Our class made a fair plan to share equipment.", ipa: "/ˈaʊər klæs meɪd ə fɛr plæn tu ʃɛr ɪˈkwɪpmənt/", vietnamese: "Lớp chúng tôi lập kế hoạch công bằng để chia sẻ dụng cụ." },
      { id: 2, text: "Each step of the strategy helped our group.", ipa: "/itʃ stɛp ʌv ðə ˈstrætədʒi hɛlpt ˈaʊər ɡrup/", vietnamese: "Từng bước của chiến lược đã giúp nhóm chúng tôi." },
      { id: 3, text: "If we share equally, our games will be better.", ipa: "/ɪf wi ʃɛr ˈikwəli ˈaʊər ɡeɪmz wɪl bi ˈbɛtər/", vietnamese: "Nếu chúng ta chia sẻ đều, các trò chơi sẽ vui hơn." },
      { id: 4, text: "Division means sharing items into equal groups.", ipa: "/dɪˈvɪʒən minz ˈʃɛrɪŋ ˈaɪtəmz ˈɪntu ˈikwəl ɡrups/", vietnamese: "Phép chia có nghĩa là chia các đồ vật thành các nhóm bằng nhau." },
      { id: 5, text: "Six footballs divided by three teams equals two.", ipa: "/sɪks ˈfʊtˌbɔlz dɪˈvaɪdɪd baɪ θri timz ˈikwəlz tu/", vietnamese: "Sáu quả bóng chia cho ba đội thì bằng hai." },
      { id: 6, text: "The quotient of this division problem is two.", ipa: "/ðə ˈkwoʊʃənt ʌv ðɪs dɪˈvɪʒən ˈprɑbləm ɪz tu/", vietnamese: "Thương số của bài toán chia này là hai." },
      { id: 7, text: "Working together makes our school day a success.", ipa: "/ˈwɜrkɪŋ təˈɡɛðər meɪks ˈaʊər skul deɪ ə səkˈsɛs/", vietnamese: "Làm việc cùng nhau khiến ngày học của chúng ta thành công." },
      { id: 8, text: "Everyone is happy when they receive a fair share.", ipa: "/ˈɛvriˌwʌn ɪz ˈhæpi wɛn ðeɪ rəˈsiv ə fɛr ʃɛr/", vietnamese: "Ai cũng vui khi họ nhận được phần chia công bằng." }
    ],
    speaking_info_exchange: {
      title: "Ben and Chloe's Sports Equipment Exchange",
      table_a: {
        title: "Ben's Book Sharing Club",
        person: "Ben",
        fields: [
          {
            id: "field_a1",
            label: "what / Ben's sharing club?",
            cue_prompt: "what / Ben's sharing club?",
            cue_word: "what",
            is_missing: true,
            value: "A comic book sharing club",
            acceptable_questions: [
              "What is Ben's club?",
              "What kind of club did Ben start?",
              "What does his club share?"
            ],
            nova_reply: "Ben started a comic book sharing club for his classmates."
          },
          {
            id: "field_a2",
            label: "how many / books divided?",
            cue_prompt: "how many / books divided?",
            cue_word: "how many",
            is_missing: true,
            value: "24 comic books",
            acceptable_questions: [
              "How many books did they divide?",
              "How many comic books are there?",
              "How many books did he share?"
            ],
            nova_reply: "They divided 24 comic books equally among the reading groups."
          },
          {
            id: "field_a3",
            label: "how many / groups in club?",
            cue_prompt: "how many / groups in club?",
            cue_word: "how many",
            is_missing: true,
            value: "4 student groups",
            acceptable_questions: [
              "How many groups are in the club?",
              "How many teams share the books?",
              "How many groups did they make?"
            ],
            nova_reply: "There are 4 student groups, so each group receives 6 books."
          },
          {
            id: "field_a4",
            label: "where / meet each week?",
            cue_prompt: "where / meet each week?",
            cue_word: "where",
            is_missing: true,
            value: "In the school library corner",
            acceptable_questions: [
              "Where do they meet?",
              "Where does the club meet each week?",
              "Where is the meeting place?"
            ],
            nova_reply: "The book club meets in the quiet corner of the school library."
          },
          {
            id: "field_a5",
            label: "who / organized the schedule?",
            cue_prompt: "who / organized the schedule?",
            cue_word: "who",
            is_missing: true,
            value: "Mrs. Clark the librarian",
            acceptable_questions: [
              "Who organized the schedule?",
              "Who helped them make the plan?",
              "Who is the club leader?"
            ],
            nova_reply: "Mrs. Clark the librarian organized the weekly sharing schedule."
          }
        ]
      },
      table_b: {
        title: "Chloe's Sports Equipment Plan",
        person: "Chloe",
        fields: [
          {
            id: "field_b1",
            label: "what / equipment shared?",
            cue_prompt: "what / equipment shared?",
            cue_word: "what",
            is_missing: false,
            value: "Jump ropes and cones",
            nova_question: "What sports equipment is shared in Chloe's plan?",
            acceptable_answers: [
              "Jump ropes and cones",
              "Jump ropes and cones.",
              "They share jump ropes and cones.",
              "Ropes and cones"
            ]
          },
          {
            id: "field_b2",
            label: "where / kept during recess?",
            cue_prompt: "where / kept during recess?",
            cue_word: "where",
            is_missing: false,
            value: "In the blue playground shed",
            nova_question: "Where is the equipment kept during recess?",
            acceptable_answers: [
              "In the blue playground shed",
              "In the blue shed.",
              "It is in the blue playground shed.",
              "Playground shed"
            ]
          },
          {
            id: "field_b3",
            label: "how many / jump ropes?",
            cue_prompt: "how many / jump ropes?",
            cue_word: "how many",
            is_missing: false,
            value: "18 jump ropes",
            nova_question: "How many jump ropes does her class share?",
            acceptable_answers: [
              "18 jump ropes",
              "Eighteen jump ropes",
              "There are 18 jump ropes.",
              "18 ropes"
            ]
          },
          {
            id: "field_b4",
            label: "what time / returned to shed?",
            cue_prompt: "what time / returned to shed?",
            cue_word: "what time",
            is_missing: false,
            value: "At 11:45 AM",
            nova_question: "What time is the equipment returned to the shed?",
            acceptable_answers: [
              "At 11:45 AM",
              "At 11:45",
              "It is returned at 11:45 AM.",
              "11:45 AM"
            ]
          },
          {
            id: "field_b5",
            label: "who / checks the ropes?",
            cue_prompt: "who / checks the ropes?",
            cue_word: "who",
            is_missing: false,
            value: "Coach Evans",
            nova_question: "Who checks the ropes at the end of recess?",
            acceptable_answers: [
              "Coach Evans",
              "Coach Evans checks them.",
              "Her gym teacher Coach Evans",
              "Teacher Coach Evans"
            ]
          }
        ]
      }
    }
  },

  59: {
    week: 59,
    theme: "ELA: Message in a Bottle (Informal Writing) / Math: Remainders",
    title_vi: "ELA: Thông điệp trong Chai - Viết Thân mật / Toán: Số dư",
    grammar_focus: "Informal Letter Conventions: Friendly greetings, contractions, chatty tone",
    syllabus_words: ["dear", "best", "friend", "write", "news", "fun", "reply", "miss you"],
    vocab: [
      { id: 1, word: "dear", pos: "adj", ipa: "/dɪr/", definition_en: "Used as a friendly greeting in a letter.", definition_vi: "thân gửi, kính gửi", example_en: "She began her letter with 'Dear Leo'.", example_vi: "Bạn ấy bắt đầu bức thư bằng 'Leo thân mến'." },
      { id: 2, word: "best", pos: "adj", ipa: "/bɛst/", definition_en: "Of the highest quality or excellence.", definition_vi: "tốt nhất, thân nhất", example_en: "Mia is my best friend in third grade.", example_vi: "Mia là bạn thân nhất của tôi ở lớp ba." },
      { id: 3, word: "friend", pos: "n", ipa: "/frɛnd/", definition_en: "A person whom one knows and likes well.", definition_vi: "người bạn", example_en: "A good friend shares books and laughs with you.", example_vi: "Một người bạn tốt luôn chia sẻ sách và cười đùa cùng bạn." },
      { id: 4, word: "write", pos: "v", ipa: "/raɪt/", definition_en: "To mark letters and words on paper.", definition_vi: "viết", example_en: "I will write a long letter about my holiday.", example_vi: "Tôi sẽ viết một bức thư dài kể về kỳ nghỉ của mình." },
      { id: 5, word: "news", pos: "n", ipa: "/nuːz/", definition_en: "Information about recent events that you hear or read.", definition_vi: "tin tức", example_en: "I have exciting news about our school puppy.", example_vi: "Tôi có tin tức thú vị về chú cún con của trường chúng ta." },
      { id: 6, word: "fun", pos: "n", ipa: "/fʌn/", definition_en: "Enjoyment, happy play, or having a good time.", definition_vi: "niềm vui", example_en: "Playing in the waves was so much fun.", example_vi: "Chơi đùa trong những con sóng thật là nhiều niềm vui." },
      { id: 7, word: "reply", pos: "v", ipa: "/rɪˈplaɪ/", definition_en: "To write or say something in response.", definition_vi: "trả lời, hồi âm", example_en: "Please reply quickly to my friendly letter.", example_vi: "Xin hãy sớm hồi âm bức thư thân mật của mình nhé." },
      { id: 8, word: "miss you", pos: "phrase", ipa: "/mɪs ju/", definition_en: "Feeling sadness because someone is away.", definition_vi: "nhớ bạn", example_en: "I miss you very much and hope you visit soon.", example_vi: "Mình nhớ bạn rất nhiều và mong bạn sớm đến thăm." },
      { id: 9, word: "remainder", pos: "n", ipa: "/rɪˈmeɪndər/", definition_en: "The amount left over after division.", definition_vi: "số dư", example_en: "Thirteen divided by four is three with a remainder of one.", example_vi: "Mười ba chia bốn bằng ba và có số dư là một." },
      { id: 10, word: "left over", pos: "phrase", ipa: "/lɛft ˈoʊvər/", definition_en: "Remaining after other parts have been used.", definition_vi: "còn sót lại", example_en: "There was one shiny shell left over.", example_vi: "Còn sót lại một vỏ sò lấp lánh." },
      { id: 11, word: "divide", pos: "v", ipa: "/dɪˈvaɪd/", definition_en: "To split something into equal groups or parts.", definition_vi: "chia thành các phần", example_en: "We divide fifteen apples into four baskets.", example_vi: "Chúng tôi chia mười lăm quả táo vào bốn chiếc giỏ." },
      { id: 12, word: "equal group", pos: "phrase", ipa: "/ˈikwəl ɡrup/", definition_en: "Sets that contain the exact same number.", definition_vi: "nhóm bằng nhau", example_en: "Each equal group had three green stones.", example_vi: "Mỗi nhóm bằng nhau đều có ba viên đá xanh." },
      { id: 13, word: "bottle", pos: "n", ipa: "/ˈbɑːtl/", definition_en: "A glass or plastic container with a narrow neck.", definition_vi: "chai, lọ", example_en: "A glass bottle rolled in with the ocean tide.", example_vi: "Một chai thủy tinh trôi dạt vào cùng thủy triều biển." },
      { id: 14, word: "letter", pos: "n", ipa: "/ˈlɛtər/", definition_en: "A written message sent in an envelope or tube.", definition_vi: "bức thư", example_en: "She found a handwritten letter inside the bottle.", example_vi: "Cô bé tìm thấy một bức thư viết tay bên trong chai." },
      { id: 15, word: "paper", pos: "n", ipa: "/ˈpeɪpər/", definition_en: "Thin sheets used for writing or drawing.", definition_vi: "giấy viết", example_en: "The rolled paper was tied with yellow yarn.", example_vi: "Tờ giấy cuộn lại được buộc bằng sợi len vàng." },
      { id: 16, word: "message", pos: "n", ipa: "/ˈmɛsɪdʒ/", definition_en: "Words or news sent from one person to another.", definition_vi: "thông điệp, tin nhắn", example_en: "The secret message said 'Meet me at the lighthouse.'", example_vi: "Thông điệp bí mật ghi là 'Hãy gặp mình ở ngọn hải đăng'." },
      { id: 17, word: "island", pos: "n", ipa: "/ˈaɪlənd/", definition_en: "A piece of land surrounded completely by water.", definition_vi: "hòn đảo", example_en: "The letter came from an explorer on Green Island.", example_vi: "Bức thư được gửi từ một nhà thám hiểm trên Đảo Xanh." },
      { id: 18, word: "beach", pos: "n", ipa: "/bitʃ/", definition_en: "A sandy shore near an ocean or lake.", definition_vi: "bãi biển", example_en: "Footprints led along the sunny beach.", example_vi: "Những dấu chân trải dài dọc theo bãi biển đầy nắng." },
      { id: 19, word: "sailor", pos: "n", ipa: "/ˈseɪlər/", definition_en: "A person who works on or navigates a ship.", definition_vi: "thủy thủ", example_en: "An old sailor tossed the glass bottle into the sea.", example_vi: "Một bác thủy thủ già đã thả chai thủy tinh xuống biển." },
      { id: 20, word: "ocean", pos: "n", ipa: "/ˈoʊʃən/", definition_en: "A very large expanse of sea water.", definition_vi: "đại dương", example_en: "Gentle ocean waves carried the bottle ashore.", example_vi: "Những con sóng đại dương êm đềm đã đưa chiếc chai vào bờ." }
    ],
    clil_article: {
      title_en: "The Ocean Bottle Mystery",
      title_vi: "Bí ẩn Chiếc chai Đại dương",
      content_en: "Walking along the sandy beach, Leo spotted a green glass bottle in the surf. Inside was a rolled paper letter from a friendly sailor on a distant island. An informal letter has a friendly tone (warm, chatty words between friends). It starts with a warm greeting like 'Dear friend' and shares fun news about daily life. The sailor wrote: 'I miss you, my friend! I found fourteen shiny seashells on the beach today.' He wanted to divide the seashells equally among four small gift boxes. In math, fourteen divided by four gives three shells in each box. But two shells were left over. This leftover number is called the remainder (the amount remaining after division). Leo smiled, folded the paper, and decided to write a friendly reply with his own news.",
      readability_target: "A2 Flyers (FK 5.5 - 6.5)",
      check_questions: [
        { id: "q1", question_en: "Where did Leo find the green glass bottle?", question_vi: "Leo đã tìm thấy chiếc chai thủy tinh màu xanh ở đâu?", options: ["In the ocean surf on the beach", "Under a classroom desk", "Inside a library book"], answer: "In the ocean surf on the beach" },
        { id: "q2", question_en: "What greeting starts an informal letter?", question_vi: "Lời chào nào mở đầu một bức thư thân mật?", options: ["Dear friend", "Goodbye sir", "Stop here"], answer: "Dear friend" },
        { id: "q3", question_en: "What is the amount left over in division called?", question_vi: "Phần còn sót lại trong phép chia được gọi là gì?", options: ["The remainder", "The sum", "The corner"], answer: "The remainder" }
      ],
      glossary: [
        { term: "informal letter", definition_en: "A friendly, casual letter written to someone you know well." },
        { term: "remainder", definition_en: "The amount left over when numbers do not divide evenly." },
        { term: "reply", definition_en: "An answer to a letter or question." },
        { term: "left over", definition_en: "Remaining after everything else is shared." },
        { term: "island", definition_en: "Land completely surrounded by water." }
      ]
    },
    shadowing_sentences: [
      { id: 1, text: "Leo found a green glass bottle on the beach.", ipa: "/ˈli.oʊ faʊnd ə ɡrin ɡlæs ˈbɑtəl ɑn ðə bitʃ/", vietnamese: "Leo đã tìm thấy một chai thủy tinh xanh trên bãi biển." },
      { id: 2, text: "Dear friend, I hope you are having fun today.", ipa: "/dɪr frɛnd aɪ hoʊp ju ɑr ˈhævɪŋ fʌn təˈdeɪ/", vietnamese: "Bạn thân mến, mình mong bạn có một ngày thật nhiều niềm vui." },
      { id: 3, text: "The sailor wrote exciting news about his island.", ipa: "/ðə ˈseɪlər roʊt ɪkˈsaɪtɪŋ nuz əˈbaʊt hɪz ˈaɪlənd/", vietnamese: "Bác thủy thủ đã viết tin tức thú vị về hòn đảo của mình." },
      { id: 4, text: "I miss you and hope to visit your town soon.", ipa: "/aɪ mɪs ju ænd hoʊp tu ˈvɪzɪt jʊər taʊn sun/", vietnamese: "Mình nhớ bạn và mong sớm đến thăm thị trấn của bạn." },
      { id: 5, text: "Fourteen seashells divided by four leaves a remainder of two.", ipa: "/ˈfɔrˈtin ˈsiˌʃɛlz dɪˈvaɪdɪd baɪ fɔr livz ə rɪˈmeɪndər ʌv tu/", vietnamese: "Mười bốn vỏ sò chia cho bốn thì còn dư hai." },
      { id: 6, text: "The leftover shells could not fit equally.", ipa: "/ðə ˈlɛftˌoʊvər ʃɛlz kʊd nɑt fɪt ˈikwəli/", vietnamese: "Những chiếc vỏ sò còn sót lại không thể chia đều." },
      { id: 7, text: "Please write a quick reply to my letter.", ipa: "/pliz raɪt ə kwɪk rɪˈplaɪ tu maɪ ˈlɛtər/", vietnamese: "Làm ơn hãy viết một lá thư hồi âm nhanh cho mình nhé." },
      { id: 8, text: "Gentle ocean waves carried the bottle ashore safely.", ipa: "/ˈdʒɛntəl ˈoʊʃən weɪvz ˈkærid ðə ˈbɑtəl əˈʃɔr ˈseɪfli/", vietnamese: "Những con sóng đại dương êm đềm đã đưa chiếc chai vào bờ an toàn." }
    ],
    speaking_info_exchange: {
      title: "Liam and Grace's Island Message Exchange",
      table_a: {
        title: "Liam's Island Letter",
        person: "Liam",
        fields: [
          {
            id: "field_a1",
            label: "where / find the bottle?",
            cue_prompt: "where / find the bottle?",
            cue_word: "where",
            is_missing: true,
            value: "Near the rocky tide pool",
            acceptable_questions: [
              "Where did Liam find the bottle?",
              "Where was the bottle found?",
              "Where did he see the bottle?"
            ],
            nova_reply: "Liam found the floating bottle near the rocky tide pool on Sandy Beach."
          },
          {
            id: "field_a2",
            label: "what / inside the bottle?",
            cue_prompt: "what / inside the bottle?",
            cue_word: "what",
            is_missing: true,
            value: "A rolled paper map and note",
            acceptable_questions: [
              "What was inside the bottle?",
              "What did he find inside?",
              "What was in the glass bottle?"
            ],
            nova_reply: "Inside the bottle was a rolled paper map and a friendly handwritten note."
          },
          {
            id: "field_a3",
            label: "who / wrote the message?",
            cue_prompt: "who / wrote the message?",
            cue_word: "who",
            is_missing: true,
            value: "A young sailor named Toby",
            acceptable_questions: [
              "Who wrote the message?",
              "Who sent the bottle?",
              "Who was the letter from?"
            ],
            nova_reply: "A young sailor named Toby wrote the message from his sailboat."
          },
          {
            id: "field_a4",
            label: "how many / days at sea?",
            cue_prompt: "how many / days at sea?",
            cue_word: "how many",
            is_missing: true,
            value: "15 days at sea",
            acceptable_questions: [
              "How many days was the bottle at sea?",
              "How long was it floating?",
              "How many days did it take?"
            ],
            nova_reply: "The note said the bottle had floated for 15 days across the bay."
          },
          {
            id: "field_a5",
            label: "what / Toby's favorite news?",
            cue_prompt: "what / Toby's favorite news?",
            cue_word: "what",
            is_missing: true,
            value: "Spotting two playful dolphins",
            acceptable_questions: [
              "What was Toby's favorite news?",
              "What news did he share?",
              "What did Toby see?"
            ],
            nova_reply: "His favorite news was spotting two playful dolphins swimming beside his boat."
          }
        ]
      },
      table_b: {
        title: "Grace's Beach Discovery",
        person: "Grace",
        fields: [
          {
            id: "field_b1",
            label: "what / Grace's discovery?",
            cue_prompt: "what / Grace's discovery?",
            cue_word: "what",
            is_missing: false,
            value: "A blue corked glass bottle",
            nova_question: "What did Grace discover on the beach?",
            acceptable_answers: [
              "A blue corked glass bottle",
              "A blue glass bottle.",
              "She discovered a blue corked glass bottle.",
              "Blue glass bottle"
            ]
          },
          {
            id: "field_b2",
            label: "where / bottle washed ashore?",
            cue_prompt: "where / bottle washed ashore?",
            cue_word: "where",
            is_missing: false,
            value: "By the tall white lighthouse",
            nova_question: "Where did the bottle wash ashore?",
            acceptable_answers: [
              "By the tall white lighthouse",
              "By the lighthouse.",
              "It washed ashore by the tall white lighthouse.",
              "Near the lighthouse"
            ]
          },
          {
            id: "field_b3",
            label: "how many / shells inside?",
            cue_prompt: "how many / shells inside?",
            cue_word: "how many",
            is_missing: false,
            value: "5 tiny purple shells",
            nova_question: "How many shells were inside the bottle with the note?",
            acceptable_answers: [
              "5 tiny purple shells",
              "Five tiny purple shells",
              "There were 5 tiny purple shells.",
              "5 shells"
            ]
          },
          {
            id: "field_b4",
            label: "what time / found the bottle?",
            cue_prompt: "what time / found the bottle?",
            cue_word: "what time",
            is_missing: false,
            value: "At 10:15 AM",
            nova_question: "What time did Grace find the bottle?",
            acceptable_answers: [
              "At 10:15 AM",
              "At 10:15",
              "She found it at 10:15 AM.",
              "10:15 AM"
            ]
          },
          {
            id: "field_b5",
            label: "who / helped Grace read it?",
            cue_prompt: "who / helped Grace read it?",
            cue_word: "who",
            is_missing: false,
            value: "Her grandfather",
            nova_question: "Who helped Grace read the letter?",
            acceptable_answers: [
              "Her grandfather",
              "Her grandfather helped her.",
              "Grandfather",
              "Her granddad"
            ]
          }
        ]
      }
    }
  },

  60: {
    week: 60,
    theme: "ELA: The Mayor's Request (Formal Writing) / Math: Order of Operations",
    title_vi: "ELA: Yêu cầu gửi Thị trưởng - Viết Trang trọng / Toán: Thứ tự phép tính",
    grammar_focus: "Formal Letter Conventions: Dear Sir/Madam, Sincerely, polite requests",
    syllabus_words: ["Sir", "Madam", "sincerely", "request", "improve", "community", "library", "park"],
    vocab: [
      { id: 1, word: "Sir", pos: "n", ipa: "/sɜːr/", definition_en: "A polite and formal title for a man.", definition_vi: "thưa Ông", example_en: "Dear Sir, I am writing to ask about the new park bench.", example_vi: "Thưa Ông, tôi viết thư này để hỏi về chiếc ghế đá mới trong công viên." },
      { id: 2, word: "Madam", pos: "n", ipa: "/ˈmædəm/", definition_en: "A polite and formal title for a woman.", definition_vi: "thưa Bà", example_en: "Dear Madam, thank you for your kind reply.", example_vi: "Thưa Bà, cảm ơn bà vì đã hồi âm tốt lành." },
      { id: 3, word: "sincerely", pos: "adv", ipa: "/sɪnˈsɪrli/", definition_en: "Used as a formal sign-off at the end of a letter.", definition_vi: "trân trọng", example_en: "He signed the letter 'Yours sincerely, Jack'.", example_vi: "Cậu ấy ký tên vào cuối thư 'Trân trọng, Jack'." },
      { id: 4, word: "request", pos: "n", ipa: "/rɪˈkwɛst/", definition_en: "An act of asking politely for something.", definition_vi: "lời yêu cầu trang trọng", example_en: "Our class sent a polite request for new sports balls.", example_vi: "Lớp chúng tôi đã gửi một lời đề nghị lịch sự để xin bóng thể thao mới." },
      { id: 5, word: "improve", pos: "v", ipa: "/ɪmˈpruːv/", definition_en: "To make something better than before.", definition_vi: "cải thiện", example_en: "Planting trees will improve our town air.", example_vi: "Trồng cây sẽ cải thiện không khí của thị trấn chúng ta." },
      { id: 6, word: "community", pos: "n", ipa: "/kəˈmjuːnəti/", definition_en: "A group of people living in the same area.", definition_vi: "cộng đồng", example_en: "Everyone in our community helped pick up litter.", example_vi: "Mọi người trong cộng đồng của chúng tôi đều giúp nhặt rác." },
      { id: 7, word: "library", pos: "n", ipa: "/ˈlaɪbrɛri/", definition_en: "A building where books are kept for reading.", definition_vi: "thư viện", example_en: "We study books quietly together at the town library.", example_vi: "Chúng tôi học tập yên tĩnh tại thư viện khu phố." },
      { id: 8, word: "park", pos: "n", ipa: "/pɑːrk/", definition_en: "A public green area used for recreation.", definition_vi: "công viên", example_en: "Children ride bicycles around the green park.", example_vi: "Trẻ em đạp xe đạp quanh công viên xanh mát." },
      { id: 9, word: "order", pos: "n", ipa: "/ˈɔːrdər/", definition_en: "The arrangement or sequence of things.", definition_vi: "thứ tự", example_en: "Follow the correct order to solve the math puzzle.", example_vi: "Làm theo đúng thứ tự để giải câu đố toán." },
      { id: 10, word: "calculate", pos: "v", ipa: "/ˈkælkjəleɪt/", definition_en: "To find an answer using mathematics.", definition_vi: "tính toán", example_en: "Calculate the numbers inside the brackets first.", example_vi: "Hãy tính toán các số trong ngoặc đơn trước." },
      { id: 11, word: "parentheses", pos: "n", ipa: "/pəˈrɛnθəsiːz/", definition_en: "Curved marks ( ) used around numbers.", definition_vi: "dấu ngoặc đơn", example_en: "Always solve the math problem inside the parentheses first.", example_vi: "Luôn luôn tính các phép tính trong ngoặc đơn trước." },
      { id: 12, word: "first", pos: "adv", ipa: "/fɜːrst/", definition_en: "Coming before all others in time or order.", definition_vi: "đầu tiên", example_en: "First, solve inside the curved brackets.", example_vi: "Đầu tiên, hãy giải phần trong dấu ngoặc tròn." },
      { id: 13, word: "then", pos: "adv", ipa: "/ðɛn/", definition_en: "Next in order or time.", definition_vi: "sau đó", example_en: "Add the numbers first, then multiply by two.", example_vi: "Cộng các số trước, sau đó nhân với hai." },
      { id: 14, word: "mayor", pos: "n", ipa: "/ˈmeɪər/", definition_en: "The elected head of a city or town.", definition_vi: "thị trưởng", example_en: "The town mayor visited our school on Friday.", example_vi: "Thị trưởng thị trấn đã đến thăm trường chúng tôi vào thứ Sáu." },
      { id: 15, word: "town", pos: "n", ipa: "/taʊn/", definition_en: "An urban area with houses and shops.", definition_vi: "thị trấn", example_en: "Our small town has three friendly schools.", example_vi: "Thị trấn nhỏ của chúng tôi có ba ngôi trường thân thiện." },
      { id: 16, word: "clean", pos: "adj", ipa: "/klin/", definition_en: "Free from dirt or pollution.", definition_vi: "sạch sẽ", example_en: "Keep the park paths clean and tidy.", example_vi: "Hãy giữ cho các lối đi trong công viên sạch sẽ và ngăn nắp." },
      { id: 17, word: "letter", pos: "n", ipa: "/ˈlɛtər/", definition_en: "A formal written message to an official.", definition_vi: "bức thư", example_en: "The students drafted a polite letter to the mayor.", example_vi: "Các em học sinh đã soạn một bức thư lịch sự gửi thị trưởng." },
      { id: 18, word: "help", pos: "v", ipa: "/hɛlp/", definition_en: "To make something easier for someone.", definition_vi: "giúp đỡ", example_en: "New benches will help older citizens rest.", example_vi: "Những chiếc ghế mới sẽ giúp người lớn tuổi nghỉ chân." },
      { id: 19, word: "street", pos: "n", ipa: "/strit/", definition_en: "A public road in a city or town.", definition_vi: "đường phố", example_en: "We walked down Elm Street to town hall.", example_vi: "Chúng tôi đi bộ xuống phố Elm tới tòa thị chính." },
      { id: 20, word: "playground", pos: "n", ipa: "/ˈpleɪɡraʊnd/", definition_en: "An outdoor area provided for children to play.", definition_vi: "sân chơi", example_en: "The neighborhood playground needs two new swings.", example_vi: "Sân chơi khu phố cần thêm hai chiếc xích đu mới." }
    ],
    clil_article: {
      title_en: "The Mayor's Request: Order in Action",
      title_vi: "Yêu cầu gửi Thị trưởng: Trật tự trong Hành động",
      content_en: "When citizens want to improve their community, writing a formal letter to the mayor is a powerful tool. A formal letter uses polite language. It begins with 'Dear Sir or Madam' and ends with 'Yours sincerely'. In the letter, students explain a request clearly. For example, our class asked for new swings in the town park and extra reading desks at the community library. In math, clear order is also essential. When solving math expressions, we follow the order of operations (rules telling which math step comes first). We always calculate inside parentheses first. Then, we do multiplication and addition. For example, in two times (three plus four), we add three and four first to get seven. Then, we multiply by two to get fourteen. Following rules with care helps both civic projects and math problems succeed.",
      readability_target: "A2 Flyers (FK 5.5 - 6.5)",
      check_questions: [
        { id: "q1", question_en: "How does a formal letter to a city leader start?", question_vi: "Bức thư trang trọng gửi lãnh đạo thành phố bắt đầu như thế nào?", options: ["Dear Sir or Madam", "Hey there friend", "See you later"], answer: "Dear Sir or Madam" },
        { id: "q2", question_en: "What math step do we always calculate first?", question_vi: "Bước toán nào chúng ta luôn tính toán đầu tiên?", options: ["Inside parentheses", "The last number", "Any random number"], answer: "Inside parentheses" },
        { id: "q3", question_en: "What ending phrase is used in a formal letter?", question_vi: "Cụm từ kết thúc nào được dùng trong thư trang trọng?", options: ["Yours sincerely", "Catch you soon", "By the way"], answer: "Yours sincerely" }
      ],
      glossary: [
        { term: "formal letter", definition_en: "A serious, polite letter written to an official or business." },
        { term: "request", definition_en: "An act of politely asking for something." },
        { term: "order of operations", definition_en: "Rules that state which mathematical calculation to do first." },
        { term: "parentheses", definition_en: "Curved symbols ( ) showing numbers to calculate first." },
        { term: "community", definition_en: "People living together in a town or neighborhood." }
      ]
    },
    shadowing_sentences: [
      { id: 1, text: "Dear Sir, I am writing to improve our park.", ipa: "/dɪr sɜr aɪ æm ˈraɪtɪŋ tu ɪmˈpruv ˈaʊər pɑrk/", vietnamese: "Thưa Ông, tôi viết thư này để xin nâng cấp công viên của chúng ta." },
      { id: 2, text: "Our community library needs new reading desks.", ipa: "/ˈaʊər kəˈmjunəti ˈlaɪˌbrɛri nidz nu ˈridɪŋ dɛsks/", vietnamese: "Thư viện cộng đồng của chúng ta cần thêm bàn đọc sách mới." },
      { id: 3, text: "We sent a polite request to the town mayor.", ipa: "/wi sɛnt ə pəˈlaɪt rɪˈkwɛst tu ðə taʊn ˈmeɪər/", vietnamese: "Chúng tôi đã gửi một lời đề nghị lịch sự tới thị trưởng thị trấn." },
      { id: 4, text: "Yours sincerely, the third grade students.", ipa: "/jʊərz sɪnˈsɪrli ðə θɜrd ɡreɪd ˈstudənts/", vietnamese: "Trân trọng, các em học sinh lớp ba." },
      { id: 5, text: "In math, always calculate inside parentheses first.", ipa: "/ɪn mæθ ˈɔlˌweɪz ˈkælkjəˌleɪt ɪnˈsaɪd pəˈrɛnθəsiːz fɜrst/", vietnamese: "Trong toán học, luôn luôn tính toán trong ngoặc đơn trước." },
      { id: 6, text: "Then multiply the numbers to find the answer.", ipa: "/ðɛn ˈmʌltəˌplaɪ ðə ˈnʌmbərz tu faɪnd ðə ˈænsər/", vietnamese: "Sau đó nhân các số để tìm ra câu trả lời." },
      { id: 7, text: "Following the right order solves the problem easily.", ipa: "/ˈfɑloʊɪŋ ðə raɪt ˈɔrdər sɑlvz ðə ˈprɑbləm ˈizəli/", vietnamese: "Làm theo đúng thứ tự giúp giải quyết bài toán dễ dàng." },
      { id: 8, text: "Polite letters help citizens make their town better.", ipa: "/pəˈlaɪt ˈlɛtərz hɛlp ˈsɪtəzənz meɪk ðɛr taʊn ˈbɛtər/", vietnamese: "Những bức thư lịch thiệp giúp người dân làm cho thị trấn của mình tốt hơn." }
    ],
    speaking_info_exchange: {
      title: "Jack and Sophia's Town Hall Exchange",
      table_a: {
        title: "Jack's Letter to the Mayor",
        person: "Jack",
        fields: [
          {
            id: "field_a1",
            label: "who / Jack write to?",
            cue_prompt: "who / Jack write to?",
            cue_word: "who",
            is_missing: true,
            value: "Mayor Baker",
            acceptable_questions: [
              "Who did Jack write to?",
              "Who was the letter sent to?",
              "Who received Jack's letter?"
            ],
            nova_reply: "Jack wrote a polite formal letter to Town Mayor Baker."
          },
          {
            id: "field_a2",
            label: "what / Jack request?",
            cue_prompt: "what / Jack request?",
            cue_word: "what",
            is_missing: true,
            value: "New wooden benches for the park",
            acceptable_questions: [
              "What did Jack request?",
              "What did he ask for?",
              "What was his letter request?"
            ],
            nova_reply: "Jack requested 4 new wooden benches for the community park paths."
          },
          {
            id: "field_a3",
            label: "where / park located?",
            cue_prompt: "where / park located?",
            cue_word: "where",
            is_missing: true,
            value: "On Oak Street beside the school",
            acceptable_questions: [
              "Where is the park located?",
              "Where is the town park?",
              "Where is Oak Street park?"
            ],
            nova_reply: "The community park is located on Oak Street, right beside the school."
          },
          {
            id: "field_a4",
            label: "how many / students signed?",
            cue_prompt: "how many / students signed?",
            cue_word: "how many",
            is_missing: true,
            value: "32 students signed",
            acceptable_questions: [
              "How many students signed the letter?",
              "How many names were on the letter?",
              "How many students supported it?"
            ],
            nova_reply: "Thirty-two students signed their names at the bottom of the letter."
          },
          {
            id: "field_a5",
            label: "when / receive a reply?",
            cue_prompt: "when / receive a reply?",
            cue_word: "when",
            is_missing: true,
            value: "On Friday morning",
            acceptable_questions: [
              "When did Jack receive a reply?",
              "What day did the reply come?",
              "When did the mayor answer?"
            ],
            nova_reply: "The mayor sent a kind reply letter on Friday morning."
          }
        ]
      },
      table_b: {
        title: "Sophia's Library Petition",
        person: "Sophia",
        fields: [
          {
            id: "field_b1",
            label: "what / Sophia's request?",
            cue_prompt: "what / Sophia's request?",
            cue_word: "what",
            is_missing: false,
            value: "Extra science books for the library",
            nova_question: "What did Sophia request in her petition?",
            acceptable_answers: [
              "Extra science books for the library",
              "Extra science books.",
              "She requested extra science books for the library.",
              "Science books"
            ]
          },
          {
            id: "field_b2",
            label: "where / library located?",
            cue_prompt: "where / library located?",
            cue_word: "where",
            is_missing: false,
            value: "Opposite the town hall",
            nova_question: "Where is the community library located?",
            acceptable_answers: [
              "Opposite the town hall",
              "Opposite town hall.",
              "It is opposite the town hall.",
              "Near town hall"
            ]
          },
          {
            id: "field_b3",
            label: "how many / books requested?",
            cue_prompt: "how many / books requested?",
            cue_word: "how many",
            is_missing: false,
            value: "50 new science books",
            nova_question: "How many new books did her group request?",
            acceptable_answers: [
              "50 new science books",
              "Fifty new science books",
              "They requested 50 new science books.",
              "50 books"
            ]
          },
          {
            id: "field_b4",
            label: "what time / meeting with mayor?",
            cue_prompt: "what time / meeting with mayor?",
            cue_word: "what time",
            is_missing: false,
            value: "At 3:15 PM",
            nova_question: "What time was Sophia's meeting with the mayor?",
            acceptable_answers: [
              "At 3:15 PM",
              "At 3:15",
              "The meeting was at 3:15 PM.",
              "3:15 PM"
            ]
          },
          {
            id: "field_b5",
            label: "who / went with Sophia?",
            cue_prompt: "who / went with Sophia?",
            cue_word: "who",
            is_missing: false,
            value: "Her teacher Mr. Hall",
            nova_question: "Who went to town hall with Sophia?",
            acceptable_answers: [
              "Her teacher Mr. Hall",
              "Mr. Hall",
              "Her teacher Mr. Hall went with her.",
              "Teacher Mr. Hall"
            ]
          }
        ]
      }
    }
  }
};
