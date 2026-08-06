const week32RealData = {
  week_id: 32,
  week_number: 32,
  title: "Tom's Very Busy Saturday",
  weekTitle_en: "The Busy Day (Irregular Verbs 4)",
  weekTitle_vi: "Ngày Bận Rộn (Động Từ Bất Quy Tắc 4)",
  topic: "Retelling Saturday chores and tasks using Past Simple Irregular Task Verbs: wake/woke, make/made, do/did, write/wrote, cut/cut, build/built, put/put, keep/kept, choose/chose, pay/paid",
  topic_vi: "Kể lại các công việc ngày Thứ Bảy dùng Động Từ Bất Quy Tắc nhóm Nhiệm Vụ: wake/woke, make/made, do/did, write/wrote, cut/cut, build/built, put/put, keep/kept, choose/chose, pay/paid",
  theme: "Daily chores, Saturday tasks, responsibility, task irregular verbs in recount context",

  grammar_focus: "Past Simple Irregular Verbs 4 — Task Verbs: wake→woke, make→made, do→did, write→wrote, cut→cut, build→built, put→put, keep→kept, choose→chose, pay→paid",
  grammar_pattern: "Tom woke up early. He made his bed. She did her homework. They built a birdhouse.",
  grammar_examples: [
    "Tom woke up early and made his bed before breakfast.",
    "He did his homework carefully and wrote a letter to his grandmother.",
    "Tom cut the grass and built a birdhouse with his dad.",
    "He put away his toys and kept his room perfectly tidy.",
    "Tom chose his favourite outfit and paid for lunch at the café.",
    "She kept her diary and chose a new book from the shelf."
  ],
  // Chunks/collocations AI must use in story_text narrative
  // Source: read.js bold chunks — multi-word phrases and high-value vocabulary
  chunk_focus: [
    "Saturday morning",
    "woke up early",
    "got dressed quickly",
    "made his bed",
    "sat at",
    "wooden desk",
    "wrote a long letter",
    "lovely grandmother",
    "about school",
    "little birdhouse",
    "build with Dad",
    "put the letter",
    "stuck a stamp",
    "helped dad",
    "cut the long grass"
  ],
  target_vocab: [
    { word: "tidy", pronunciation: "/ˈtaɪdi/", definition_vi: "gọn gàng, ngăn nắp", definition_en: "neat and in good order; arranged carefully" },
    { word: "birdhouse", pronunciation: "/ˈbɜːdhaʊs/", definition_vi: "chuồng chim nhỏ", definition_en: "a small wooden box placed in a garden where birds can nest" },
    { word: "grandmother", pronunciation: "/ˈɡrænd mʌðər/", definition_vi: "bà nội/ngoại", definition_en: "the mother of your mother or father" },
    { word: "letter", pronunciation: "/ˈletər/", definition_vi: "lá thư", definition_en: "a written message sent from one person to another" },
    { word: "grass", pronunciation: "/ɡrɑːs/", definition_vi: "cỏ, bãi cỏ", definition_en: "the short green plants that cover lawns and fields" },
    { word: "café", pronunciation: "/ˈkæfeɪ/", definition_vi: "quán cà phê, tiệm ăn nhỏ", definition_en: "a small restaurant where you can buy drinks, snacks, and light meals" },
    { word: "choose", pronunciation: "/tʃuːz/", definition_vi: "chọn lựa", definition_en: "to decide which thing you want from two or more options" },
    { word: "Saturday", pronunciation: "/ˈsætədeɪ/", definition_vi: "thứ Bảy", definition_en: "the day of the week between Friday and Sunday" },
    { word: "early", pronunciation: "/ˈɜːli/", definition_vi: "sớm, dậy sớm", definition_en: "before the usual or expected time; at the beginning of the day" },
    { word: "asleep", pronunciation: "/əˈsliːp/", definition_vi: "đang ngủ, thiếp ngủ", definition_en: "in a state of sleep; not awake" },
    { word: "fabric", pronunciation: "/ˈfæbrɪk/", definition_vi: "vải, chất liệu vải", definition_en: "cloth or woven material used for making clothes and other items" },
    { word: "rubber", pronunciation: "/ˈrʌbər/", definition_vi: "cao su", definition_en: "a tough elastic material made from the latex of tropical plants or made synthetically" },
    { word: "leather", pronunciation: "/ˈleðər/", definition_vi: "da thuộc", definition_en: "a strong, smooth material made from the skin of animals, used for shoes and bags" }
  ],

  nova_instructions: {
    persona: "Nova - friendly bilingual AI tutor",
    language_mix: "English-dominant with Vietnamese scaffolding",
    key_correction: "Task irregular verb forms: wake->woke (NOT waked), make->made (NOT maked), do->did (NOT doed), write->wrote (NOT writed), build->built (NOT builded), keep->kept (NOT keeped), choose->chose (NOT choosed), pay->paid (NOT payed). IMPORTANT: cut->cut and put->put do NOT change — they are zero-change irregulars!",
    nova_recast: "Nice! Tom WOKE up early! Say: Tom woke up before sunrise. What did he make next?",
    grammar_guard: "Always model the correct task verb form. Student says 'maked'? Recast with 'made'. 'builded'? Recast with 'built'. 'keeped'? Recast with 'kept'. 'choosed'? Recast with 'chose'. For cut and put — they are zero-change! cut stays cut, put stays put. Keep encouraging!"
  },

  v28_format_notes: {
    response_format: "ack + recast + question (V28 ONLY - NOT V25)",
    ack_options: ["Oh!", "Wow!", "Nice!", "That is wonderful!", "I see!", "Really?", "Amazing!"],
    recast_max_words: 8,
    recast_rules: [
      "Correct the task verb form FIRST (woke NOT waked, made NOT maked, built NOT builded)",
      "Recast in max 8 words using the corrected form",
      "Then ask the next question from story_arc"
    ],
    forbidden: ["Do NOT say 'Incorrect'", "Do NOT explain grammar rules mid-story", "Do NOT recast more than 8 words"]
  },

  story_missions: [
    {
      mission_id: 1,
      id: 1,
      title: "Tom's Busy Saturday Story",
      title_en: "Tom's Busy Saturday Story",
      title_vi: "Câu chuyện Ngày Thứ Bảy Bận Rộn của Tom",
      theme: "Retelling Tom's Saturday using task irregular verbs: woke, made, did, wrote, cut, built, put, kept, chose, paid",
      type: "story",
      character: {
        name: "Tom",
        attributes: {
          woke_up_early: true,
          made_bed: true,
          did_homework: true,
          wrote_letter_to_grandmother: true,
          cut_grass: true,
          built_birdhouse: true,
          put_away_toys: true,
          kept_room_tidy: true,
          chose_outfit: true,
          paid_for_lunch: true,
          fell_asleep_early: true
        },
        role: "A responsible boy who completed many tasks on his Saturday"
      },

      opening_narrative: "Saturday can be so full and exciting! He woke up early and did so many things. Let's retell Tom's amazing Saturday together! What did Tom do first when he woke up? Say: Tom made his bed or He woke up early and made his bed straight away",

      story_arc: [
        {
          phase: "morning_chores",
          turns: "1-4",
          phase_name: "Tom's Morning (woke, made, did, wrote)",
          focus: "Task verbs: woke, made, did, wrote — morning chores and homework",
          goal: "Student retells what Tom did in the morning using task verbs",
          phase_questions: [
            "What did Tom make first after waking up? Say: Tom made his bed or He made every corner neat and tidy",
            "What did Tom do at his desk? Say: Tom did his homework or He did three pages of maths carefully",
            "Who did Tom write a letter to? Say: Tom wrote a letter to his grandmother or He wrote about school and his pet cat",
            "What was in Tom's letter? Say: He wrote about school and his cat or Tom told his grandmother all his news"
          ]
        },
        {
          phase: "outdoor_tasks",
          turns: "5-7",
          phase_name: "The Garden (cut, built, put)",
          focus: "Task verbs: cut, built, put — outdoor chores with dad",
          goal: "Student describes what Tom and his dad did in the garden",
          phase_questions: [
            "What did Tom cut in the garden? Say: Tom cut the long grass or He cut the grass while his dad helped",
            "What did Tom and his dad build together? Say: They built a wooden birdhouse or Tom and his dad built a birdhouse for the birds",
            "Where did they put the birdhouse? Say: They put it on the tall oak tree or Tom put the birdhouse up on the branch"
          ]
        },
        {
          phase: "afternoon_tasks",
          turns: "8-10",
          phase_name: "Afternoon and Evening (kept, chose, paid, fell)",
          focus: "Task verbs: kept, chose, paid, fell — afternoon chores and ending the day",
          goal: "Student retells Tom's afternoon tasks and how the day ended",
          phase_questions: [
            "How did Tom keep his room? Say: Tom kept his room perfectly tidy or He kept everything neat and clean",
            "What did Tom choose and where did he go? Say: Tom chose his blue shirt or He chose his outfit for the café trip",
            "How did the day end? Say: Tom fell asleep early or He paid for lunch then fell asleep at half past eight"
          ]
        }
      ],

      minimum_turns: 10,
      maximum_turns: 12,

      story_text: "Tom had a very busy Saturday. He woke up early, before the sun had fully risen. First, he made his bed — smoothing every corner until it looked neat and tidy. Then he sat at his desk and did his homework: three pages of maths and a science worksheet. After that, he wrote a long letter to his grandmother in the countryside. He told her about school and his pet cat. Outside, Tom cut the long grass with his dad while birds watched from the fence. Together, they built a small wooden birdhouse and put it on the tall oak tree in the garden. Back inside, Tom kept the whole room perfectly tidy. He chose his favourite blue shirt for the afternoon. At the local café, he paid for a cheese sandwich with his own saved pocket money. By evening, he closed his eyes and fell asleep before half past eight. Mum smiled and said: What a wonderful, busy boy you are!",
      story_text_vi: "Tom có một ngày Thứ Bảy rất bận rộn. Cậu dậy sớm trước khi mặt trời mọc hẳn. Đầu tiên, cậu dọn giường — vuốt thẳng từng góc cho đến khi trông gọn gàng và ngăn nắp. Rồi cậu ngồi vào bàn và làm bài tập về nhà: ba trang toán và một bài khoa học. Sau đó, cậu viết một lá thư dài cho bà của mình ở ngoại ô. Cậu kể cho bà nghe về trường học và chú mèo cưng. Bên ngoài, Tom cắt cỏ dài với bố trong khi những con chim đứng nhìn từ hàng rào. Hai bố con cùng nhau đóng một chuồng chim nhỏ bằng gỗ và treo lên cây sồi cao trong vườn. Trở vào nhà, Tom giữ cả phòng gọn gàng ngăn nắp. Cậu chọn chiếc áo xanh yêu thích cho buổi chiều. Tại quán cà phê gần nhà, cậu trả tiền mua một chiếc bánh sandwich phô mai bằng tiền tiết kiệm của mình. Đến tối, cậu nhắm mắt lại và ngủ thiếp trước 8 giờ rưỡi. Mẹ mỉm cười và nói: Con thật tuyệt vời và chăm chỉ!"
    },
    {
      mission_id: 2,
      id: 2,
      title: "The Chore Challenge — Maya's Sunday",
      title_en: "The Chore Challenge — Maya's Sunday",
      title_vi: "Thử Thách Công Việc Nhà",
      theme: "Maya practices task verbs in a different context",
      type: "practice",
      character: {
        name: "Maya",
        attributes: {
          woke_late: true,
          made_breakfast: true,
          did_chores: true,
          wrote_list: true,
          cut_paper: true,
          built_shelf: true,
          kept_diary: true,
          chose_book: true,
          paid_for_supplies: true
        },
        role: "A busy student who had a productive weekend"
      },

      opening_narrative: "Maya also had a busy Sunday! Let us help her tell her story with the right task verb forms. What did Maya do on Sunday morning? Say: Maya woke up late or She woke up at nine on Sunday",

      story_arc: [
        {
          phase: "morning_report",
          turns: "1-5",
          phase_name: "Maya's Morning (woke, made, did, wrote, cut)",
          focus: "Task verbs in context — woke, made, did, wrote, cut",
          goal: "Student uses correct past forms to describe Maya's morning",
          phase_questions: [
            "What did Maya make for her family? Say: Maya made breakfast for everyone or She made pancakes and put them on the table",
            "What did Maya do to help her mum? Say: Maya did the dishes or She did the laundry too",
            "What did Maya write in her notebook? Say: Maya wrote her shopping list or She wrote all her plans for the week",
            "How did Maya cut the paper? Say: Maya cut paper for her art project or She cut the shapes very carefully",
            "What did Maya put on the table? Say: She put the pancakes on the table or Maya put flowers in a vase"
          ]
        },
        {
          phase: "afternoon_projects",
          turns: "6-10",
          phase_name: "Afternoon Projects (built, kept, chose, paid)",
          focus: "Task verbs: built, kept, chose, paid — afternoon projects",
          goal: "Student uses task verbs to describe Maya's afternoon",
          phase_questions: [
            "What did Maya build with her brother? Say: Maya built a wooden shelf or They built a bookshelf together",
            "How did Maya keep her diary? Say: Maya kept her diary safe in her drawer or She kept all her notes inside",
            "What book did Maya choose at the library? Say: Maya chose a science book or She chose a story about animals",
            "What did Maya pay for at the shops? Say: Maya paid for her art supplies or She paid for the things on her list",
            "How did the day end for Maya? Say: Maya put away her things and fell asleep or She kept everything tidy and slept early"
          ]
        }
      ],

      minimum_turns: 10,
      maximum_turns: 12,

      story_text: "Maya had a productive Sunday. She woke up at nine and made a big breakfast for her whole family. After eating, she did the dishes and did the laundry with her mum. Then Maya wrote a shopping list and a to-do list in her notebook. In the afternoon, Maya and her brother cut paper shapes and built a small wooden shelf for her books. She kept her diary safely in her drawer and kept all her school notes in order. Before dinner, she chose a new science book at the local library and paid for it with her birthday money. That evening, Maya put all her things away and fell asleep with the new book on her pillow.",
      discussion_prompts: [
        {
          id: 1,
          question_en: "Retell Maya's morning. Use: woke, made, did, wrote, cut.",
          prompt_vi: "Kể lại buổi sáng của Maya. Dùng: woke, made, did, wrote, cut.",
          grammar_hint: "Maya woke... She made... She did... She wrote... She cut...",
          example_answer: "Maya woke up at nine on Sunday. She made pancakes for her family and put them on the table. She did the dishes and did the laundry with her mum. Then Maya wrote a shopping list and a to-do list. She cut paper shapes for an afternoon project."
        },
        {
          id: 2,
          question_en: "Retell Maya's afternoon. Use: built, kept, chose, paid.",
          prompt_vi: "Kể lại buổi chiều của Maya. Dùng: built, kept, chose, paid.",
          grammar_hint: "Maya and her brother built... She kept... She chose... She paid...",
          example_answer: "In the afternoon, Maya and her brother built a wooden shelf for her books. She kept her diary in her drawer and kept her school notes tidy. She chose a science book at the library and paid for it with her birthday money. That evening she fell asleep with the book on her pillow."
        },
        {
          id: 3,
          question_en: "Which task verbs do NOT change in past tense? Give two example sentences.",
          prompt_vi: "Những động từ nhiệm vụ nào KHÔNG thay đổi ở thì quá khứ? Cho hai ví dụ.",
          grammar_hint: "cut stays cut... put stays put...",
          example_answer: "Cut and put do not change in past tense! We say: She cut the paper carefully. He put the books on the shelf. We do NOT say cutted or putted — they are zero-change irregulars!"
        }
      ]
    },
    {
      mission_id: 3,
      id: 3,
      title: "Design Your Perfect Busy Day",
      title_en: "Design Your Perfect Busy Day",
      title_vi: "Thiết Kế Ngày Bận Rộn Hoàn Hảo Của Bạn",
      theme: "Student creates their own perfect busy day using all 10 task verbs",
      type: "creative",
      character: {
        name: "Student",
        role: "Designer of their own ideal busy and productive day"
      },

      opening_narrative: "Imagine your PERFECT busy day — a day when you did so many amazing things! What would you wake up and do first? Use the task verbs: woke, made, did, wrote, cut, built, put, kept, chose, paid. Say: I woke up at ___ and made ___",

      story_arc: [
        {
          phase: "morning_design",
          turns: 3,
          focus: "Student designs their perfect morning tasks using woke, made, did, wrote",
          ai_prompts: [
            "What time did you wake up in your perfect busy day? Say: I woke up at ___ or I woke up early at ___",
            "What did you make for breakfast or in the house? Say: I made ___ or I made ___ for ___",
            "What homework or project did you do? Say: I did ___ or I wrote ___ about ___"
          ]
        },
        {
          phase: "outdoor_build",
          turns: 3,
          focus: "Student designs outdoor activities using cut, built, put",
          ai_prompts: [
            "What did you cut or trim outside? Say: I cut ___ or I cut ___ in the garden",
            "What amazing thing did you build? Say: I built ___ or I built a ___ for ___",
            "Where did you put what you built? Say: I put it ___ or I put the ___ on ___"
          ]
        },
        {
          phase: "choices_and_end",
          turns: 3,
          focus: "Student wraps up their day using kept, chose, paid, fell",
          ai_prompts: [
            "How did you keep things tidy? Say: I kept ___ tidy or I kept my ___ neat",
            "What did you choose to do or buy? Say: I chose ___ or I chose to ___ at the ___",
            "How did your perfect busy day end? Say: I fell asleep at ___ or I paid for ___ then fell asleep"
          ]
        }
      ],

      minimum_turns: 10,
      maximum_turns: 12,

      story_text: "Imagine your perfect busy day! You woke up at six before anyone else. You made a healthy breakfast and put everything on the table. You did your favourite science project and wrote three pages about volcanoes. Outside, you cut the hedges and built a wooden flower box. You put it on the window ledge and kept it perfectly tidy. In the afternoon, you chose the best book from the shelf — a mystery story — and paid for a smoothie at the café. You put away everything in its right place, kept your room spotless, and fell asleep with the mystery book half-finished on your pillow.",
      discussion_prompts: [
        {
          id: 1,
          question_en: "Describe your perfect busy morning. Use: woke, made, did, wrote.",
          prompt_vi: "Mô tả buổi sáng bận rộn hoàn hảo của bạn. Dùng: woke, made, did, wrote.",
          grammar_hint: "I woke up... I made... I did... I wrote...",
          example_answer: "I woke up at six in the morning. I made scrambled eggs and toast for the family. I did my science project about volcanoes. I wrote three pages of notes in my neatest handwriting. It was a very productive morning!"
        },
        {
          id: 2,
          question_en: "Describe your outdoor tasks and choices. Use: cut, built, chose, paid.",
          prompt_vi: "Mô tả công việc ngoài trời và lựa chọn của bạn. Dùng: cut, built, chose, paid.",
          grammar_hint: "I cut... I built... I chose... I paid...",
          example_answer: "I cut the grass in the garden with a hand cutter. Then I built a small shelf for my toy collection. I chose a new art book at the bookshop and paid for it with my pocket money. It was a very creative afternoon!"
        },
        {
          id: 3,
          question_en: "How did you keep things tidy and end your day? Use: put, kept, fell.",
          prompt_vi: "Bạn dọn gọn đồ đạc và kết thúc ngày như thế nào? Dùng: put, kept, fell.",
          grammar_hint: "I put away... I kept my room... I fell asleep...",
          example_answer: "I put away all my tools and books in their right places. I kept my room perfectly tidy — every book on the shelf, every toy in its box. I fell asleep at nine o'clock with a big smile on my face!"
        }
      ]
    }
  ],

  spark_talk: [
    {
      id: "spark_w32_my_busy_day",
      emoji: "🌅",
      title: "My Busy Day",
      title_vi: "Ngày Bận Rộn Của Tôi",
      bridge: "Tom had an amazing busy Saturday — he woke early, built a birdhouse, and even paid for his own lunch! And what about YOUR busy days? What do YOU do when you have lots of tasks?",
      seed_question: "Tell me about your most recent busy day! What did you do? Say: I woke up early and I did...",
      frames: [
        {
          template: "I woke up ___ and made ___.",
                    hint_en: "I woke up early and made breakfast.",
          follow_up_q: "What time did you wake up? Did you make your bed or breakfast first? 🌞",
          hints: ["early", "at 6am", "my bed", "breakfast", "rice and soup"]
        },
        {
          template: "I did ___ and wrote ___.",
                    hint_en: "I did my homework and wrote a story.",
          follow_up_q: "What work or homework did you do? Did you write anything — a letter, a list, or a diary? ✏️",
          hints: ["homework", "chores", "a letter", "in my diary", "a shopping list"]
        },
        {
          template: "I put away ___ and kept my room ___.",
                    hint_en: "I put away my toys and kept my room clean.",
          follow_up_q: "How did you keep your things organised? Was your room tidy at the end of the day? 🏠",
          hints: ["toys", "books", "my uniform", "tidy", "clean and neat"]
        },
        {
          template: "I ___ my bed every morning before school.",
                    hint_en: "I made my bed every morning before school.",
          follow_up_q: "That is a wonderful habit! Who taught you to make your bed? Was it Mum, Dad, or did you learn it yourself? 🌅",
          hints: ["make", "tidy", "arrange", "fix", "do"]
        },
        {
          template: "I ___ the door and ___ my bag for school.",
                    hint_en: "I closed the door and packed my bag for school.",
          follow_up_q: "Do you pack your bag the night before or in the morning? What do you always put in your school bag? 🎒",
          hints: ["closed", "opened", "packed", "checked", "ready"]
        },
        {
          template: "At the ___ I ___ some money and ___ a snack.",
                    hint_en: "At the café I spent some money and bought a snack.",
          follow_up_q: "Do you ever buy snacks or drinks with your own money? What is your favourite thing to buy? 🍓",
          hints: ["café", "shop", "store", "spent", "bought", "paid"]
        },
        {
          template: "I ___ a ___ from the shelf and read it before bed.",
                    hint_en: "I chose a mystery book from the shelf and read it before bed.",
          follow_up_q: "That sounds like a perfect end to a busy day! What kind of books do you like to read before sleep? 📚",
          hints: ["chose", "read", "book", "story", "adventure"]
        },
        {
          template: "I ___ asleep ___ because I was so tired from the busy day.",
                    hint_en: "I fell asleep quickly because I was so tired from the busy day.",
          follow_up_q: "Do you usually sleep early after a busy day? Or do you like to stay up late even when you are tired? 😴",
          hints: ["fell", "quickly", "deeply", "soundly", "late"]
        }
      ],
      scaffold_frames: ["I woke up ___ and made ___.", "I did ___ and wrote ___.", "I put away ___ and kept my room ___.", "I ___ my bed every morning.", "I ___ the door and ___ my bag.", "At the ___ I ___ some money.", "I ___ a ___ from the shelf.", "I ___ asleep ___ from the busy day."],
      vocab_focus: ["tidy", "early", "choose", "letter", "asleep"],
      turns: 8
    },
    {
      id: "spark_w32_chores_and_building",
      emoji: "🔨",
      title: "Chores and Building",
      title_vi: "Công Việc Nhà và Xây Dựng",
      bridge: "Tom cut the grass AND built a birdhouse in one day — that is seriously impressive! Do you ever help with chores or build and make things at home?",
      seed_question: "What chores do you do at home? Say: I cut ___ or I put away ___ or I keep my ___ tidy!",
      frames: [
        {
          template: "I cut ___ at home.",
                    hint_en: "I cut paper at home for my project.",
          follow_up_q: "Do you help with gardening or cutting things? What do you cut or trim at your house? 🌿",
          hints: ["vegetables", "paper", "the grass", "nothing yet", "flowers"]
        },
        {
          template: "I built ___ before.",
                    hint_en: "I built a house with blocks before.",
          follow_up_q: "Have you ever built something with wood, paper, or blocks? What was it? 🪵",
          hints: ["a model", "a box", "a toy car", "a tower of blocks", "nothing yet"]
        },
        {
          template: "I chose ___ because ___.",
                    hint_en: "I chose the blue one because it was beautiful.",
          follow_up_q: "Tell me about a time you had to choose something — clothes, food, a book. Why did you choose it? 🤔",
          hints: ["my favourite shirt", "a book", "the food I wanted", "a gift for someone", "a snack"]
        },
        {
          template: "I ___ a birdhouse with wood and paint.",
                    hint_en: "I built a birdhouse with wood and paint.",
          follow_up_q: "That is amazing! Did you build it alone or with someone? What colour did you paint it? 🐦",
          hints: ["built", "made", "designed", "painted", "created"]
        },
        {
          template: "I ___ the hedges and ___ the garden ___.",
                    hint_en: "I cut the hedges and kept the garden tidy.",
          follow_up_q: "Do you help in the garden at home? What did you cut or trim? 🌿",
          hints: ["cut", "trimmed", "kept", "clean", "neat", "organised"]
        },
        {
          template: "I ___ the ___ on the window ledge.",
                    hint_en: "I put the flower box on the window ledge.",
          follow_up_q: "That is such a lovely thing to do! Do you grow flowers or plants at home? What is your favourite? 🌸",
          hints: ["put", "placed", "flower box", "plant", "vase", "picture"]
        },
        {
          template: "I ___ for my lunch and ___ it all by ___.",
                    hint_en: "I paid for my lunch and ate it all by myself.",
          follow_up_q: "That is very grown-up of you! Do you ever pay for your own food or drinks? Where do you usually spend your pocket money? 💰",
          hints: ["paid", "spent", "ate", "bought", "myself"]
        },
        {
          template: "I ___ everything away ___ everything was in the right ___.",
                    hint_en: "I put everything away so everything was in the right place.",
          follow_up_q: "That is such a great habit! Are you usually tidy, or is keeping things organised difficult for you? 😊",
          hints: ["put", "kept", "left", "place", "order"]
        }
      ],
      scaffold_frames: ["I cut ___ at home.", "I built ___ before.", "I chose ___ because ___.", "I ___ a birdhouse with wood.", "I ___ the hedges and ___ the garden.", "I ___ the ___ on the window ledge.", "I ___ for my lunch.", "I ___ everything away."],
      vocab_focus: ["grass", "birdhouse", "choose", "tidy", "café"],
      turns: 8
    }
  ],

  freetalk_knowledge: {
    week_title: "Tom's Very Busy Saturday",
    week_number: 32,
    theme: "Daily tasks, chores, and Saturday activities using irregular task verbs",
    knowledge_base: [
    "IMPORTANT — Always respond with empathy and understanding. Acknowledge student feelings before correcting. If a student shares something negative, say you are sorry or that sounds difficult.",
      "Tom's story is about a boy who completes many tasks in one day: woke up, made bed, did homework, wrote letter, cut grass, built birdhouse, put away toys, kept room tidy, chose outfit, paid for lunch, fell asleep",
      "The grammar focus is on Irregular Verbs Group 4 — Task Verbs: wake→woke, make→made, do→did, write→wrote, cut→cut (zero-change), build→built, put→put (zero-change), keep→kept, choose→chose, pay→paid",
      "Cut and put are zero-change irregulars — they have the SAME form in both present and past tense",
      "A birdhouse is a small wooden box placed in a garden or on a tree where birds can nest and raise their young",
      "Cambridge materials extension this week: fabric, rubber, leather, paper — completing the 10-material set started in W31",
      "Passive voice is seeded this week: 'The letter was written by Tom' and 'The birdhouse was built by Tom and his dad'",
      "The story context: household chores, garden work, writing letters to grandparents, paying for things with saved money",
      "Being responsible and completing tasks independently is a key character education theme this week"
    ],
    example_opening_questions: [
      "Do you help with chores at home? What do you usually do?",
      "Have you ever built something with your hands? What did you make?",
      "Do you write letters or messages to your grandparents or relatives?",
      "What do you do on Saturdays? Is it a busy day or a relaxing day for you?",
      "Which of the 10 task verbs is trickiest to remember? Why?"
    ],
    starter_prompts: [
      "Tell me about your Saturday routine — what do you usually do?",
      "Which of the 10 task verbs is easiest and which is hardest for you?",
      "If you could build anything this weekend, what would it be?"
    ]
  }
};

export { week32RealData };
export default week32RealData;
