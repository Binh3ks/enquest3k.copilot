// WEEK 34: STORYTELLING PRACTICE 1 — The Ant and the Grasshopper
// AI Tutor V28 Format — Fable Storytelling
// DO NOT USE PYTHON TO CREATE THIS FILE

const week34RealData = {
  week_id: 34,
  week_number: 34,
  title: "The Ant and the Grasshopper",
  weekTitle_en: "The Ant and the Grasshopper (Fable)",
  weekTitle_vi: "Kiến và Châu Chấu (Truyện Ngụ Ngôn)",
  topic: "Storytelling Practice with a classic fable — The Ant and the Grasshopper — teaching the importance of hard work and preparation",
  topic_vi: "Luyện kể chuyện với truyện ngụ ngôn cổ điển — Kiến và Châu Chấu — dạy về tầm quan trọng của sự chăm chỉ và chuẩn bị trước",
  theme: "storytelling_fable",
  grammar_focus: "Relative Clauses — WHO, WHICH, THAT",
  grammar_pattern: "The ant WHO worked hard was happy. The story WHICH we read is a fable. The winter THAT came was very cold.",
  grammar_examples: [
    "The ant is an insect WHO works very hard.",
    "The fable WHICH we read teaches an important lesson.",
    "The winter THAT came was very cold and long."
  ],

  // Chunks/collocations AI must reinforce — from read.js bold chunks
  chunk_focus: [
    "Long ago",
    "there was",
    "working ant",
    "who lived",
    "small hill",
    "There was",
    "lazy grasshopper",
    "green leaf",
    "always busy",
    "always playing",
    "In the summer sun",
    "ant went",
    "every day",
    "gathered seeds",
    "stored food",
    "Ant and the Grasshopper",
    "in the world",
    "animal characters",
    "hard-working insects",
    "ancient Greece",
    "coming winter",
    "jumped around",
    "sang songs",
    "all day",
    "never worked"
  ],

  target_vocab: [
    { word: "ant", pronunciation: "/ænt/", definition_vi: "con kiến", definition_en: "a small insect that works very hard and stores food" },
    { word: "grasshopper", pronunciation: "/ˈɡræsˌhɒpər/", definition_vi: "con châu chấu", definition_en: "an insect that jumps and makes sounds, often associated with singing" },
    { word: "fable", pronunciation: "/ˈfeɪbəl/", definition_vi: "truyện ngụ ngôn", definition_en: "a short story that teaches a moral lesson" },
    { word: "shelter", pronunciation: "/ˈʃeltər/", definition_vi: "nơi trú ẩn", definition_en: "a safe place that protects from weather or danger" },
    { word: "gather", pronunciation: "/ˈɡæðər/", definition_vi: "thu thập, nhặt", definition_en: "to collect things together" },
    { word: "prepare", pronunciation: "/prɪˈpeər/", definition_vi: "chuẩn bị", definition_en: "to make something ready before you need it" },
    { word: "share", pronunciation: "/ʃeər/", definition_vi: "chia sẻ", definition_en: "to give part of something to others" },
    { word: "frost", pronunciation: "/frɒst/", definition_vi: "sương giá", definition_en: "very cold ice that appears on surfaces in winter" },
    { word: "famine", pronunciation: "/ˈfæmɪn/", definition_vi: "cơn đói, mất mùa", definition_en: "a time when there is not enough food" },
    { word: "future", pronunciation: "/ˈfjuːtʃər/", definition_vi: "tương lai", definition_en: "the time that comes after now" },
    { word: "lazy", pronunciation: "/ˈleɪzi/", definition_vi: "lười biếng", definition_en: "not willing to work or put in effort" }
  ],

  nova_instructions: {
    role: "Nova is a friendly British English teacher (female, age 28) who speaks in a warm, encouraging British accent.",
    personality: "Patient, supportive, uses British expressions like 'brilliant', 'lovely', 'well done'. For fable themes: engaging, loves storytelling, uses expressive voices for characters.",
    language: "British English (RP accent)",
    correction_style: "Gentle and constructive — never criticise mistakes harshly",
    feedback: "Always praise effort first, then gently correct"
  },

  v28_format_notes: "W34 follows V28 schema: story_missions[], spark_talk[], freetalk_knowledge{}. Theme: storytelling_fable. Grammar: Relative Clauses (WHO/WHICH/THAT). IMPORTANT: Never say 'Great!' after a student describes the grasshopper's suffering.",

  // ── Story Missions ────────────────────────────────────────────────────────────
  story_missions: [
    {
      mission_id: 1,
      id: 1,
      title: "The Ant and the Grasshopper — Retell the Fable",
      title_en: "The Ant and the Grasshopper — Retell the Fable",
      title_vi: "Kiến và Châu Chấu — Kể Lại Truyện Ngụ Ngôn",
      theme: "Retelling the classic fable using key chunks and relative clauses",
      type: "story",
      character: {
        name: "The Fable Characters",
        attributes: {
          ant_is_hard_working: true,
          grasshopper_is_lazy: true,
          ant_gathered_seeds: true,
          ant_stored_food: true,
          grasshopper_sang_songs: true,
          winter_came: true,
          grasshopper_was_hungry: true,
          ant_shared_food: true,
          grasshopper_learned_lesson: true,
          worked_hard_together_after: true
        },
        role: "Two animals who teach us about hard work and planning ahead"
      },
      opening_narrative: "Today we are going to read a very famous fable — The Ant and the Grasshopper! This is one of the most famous stories in the world. The ant works very hard every day, but the grasshopper only plays and sings. Let us retell this wonderful story together! First — where did the ant and the grasshopper live?",
      story_arc: [
        {
          phase: "summer_days",
          turns: "1-5",
          phase_name: "In the Summer (gathered, stored, sang, jumped)",
          focus: "Summer actions: the ant worked hard while the grasshopper played — contrast the two characters",
          goal: "Student describes what the ant and grasshopper did in summer using past tense and chunks",
          phase_questions: [
            "Where did the hard-working ant live? That is a lovely image! Say: The ant lived in a small hill, or The ant lived under the warm ground",
            "What did the ant do every day in the bright warm sunshine? Such dedication! Say: She gathered seeds and stored food, or The ant gathered seeds and built a warm shelter every day",
            "And what did the lazy grasshopper do? That sounds like fun — but also a problem! Say: The grasshopper jumped around and sang songs all day long, or He only played games and never worked",
            "Use a relative clause — WHO — to describe the ant! Say: The ant WHO gathered seeds was very clever, or The ant WHO worked hard was always happy",
            "Use a relative clause — WHO — to describe the grasshopper! Say: The grasshopper WHO never worked was lazy, or The grasshopper WHO only sang songs had nothing to eat in winter"
          ]
        },
        {
          phase: "winter_arrives",
          turns: "6-9",
          phase_name: "Winter Came (frost, hungry, no food)",
          focus: "Winter arrival: frost appeared, grasshopper was cold and hungry — empathy for the grasshopper's suffering",
          goal: "Student describes winter's arrival and the grasshopper's situation using chunks with empathy",
          phase_questions: [
            "What happened when the first frost appeared? That sounds very cold! Say: When the first frost appeared, the grasshopper felt very cold and very hungry",
            "Was the ant ready for winter? She was so clever! Say: Yes, the ant was ready — she had gathered seeds and stored food, or The ant WHO had prepared was safe and warm",
            "Was the grasshopper ready? Poor grasshopper — that must have been frightening! Say: No, the grasshopper WHO never worked had nothing to eat, or He was very cold and very hungry because he had no food",
            "Use a relative clause with THAT or WHICH to describe winter! Say: The winter THAT came was very cold, or The cold days THAT arrived were very difficult for the grasshopper"
          ]
        },
        {
          phase: "the_lesson",
          turns: "10-13",
          phase_name: "The Lesson (shared, learned, worked together)",
          focus: "The resolution: ant shared food, grasshopper learned lesson, they worked hard together",
          goal: "Student explains the moral of the fable using chunks and relative clauses",
          phase_questions: [
            "What did the kind ant do? That was very generous of her! Say: The ant gave the grasshopper some food, or She shared her food with the grasshopper WHO was hungry",
            "What important lesson did the grasshopper learn? This is the heart of the fable! Say: The grasshopper learned that he must prepare for the future, or He learned a lesson: always work hard and prepare",
            "Use the chunk PREPARE FOR THE FUTURE in your answer! Say: The grasshopper learned to prepare for the future, or We should always prepare for the future",
            "What happened after that? That is a wonderful ending! Say: The ant and grasshopper worked hard together for the rest of the year, or They learned to work together and stayed happy and healthy",
            "What does this fable teach us? This is such an important lesson for everyone! Say: The fable teaches us to prepare for the future, or We should always work hard when we can"
          ]
        }
      ],
      minimum_turns: 10,
      maximum_turns: 12,
      story_text: "A very long time ago, there was a hard-working ant who lived in a small hill. There was also a lazy grasshopper who lived under a big green leaf. In the warm summer sun, the ant went to the field every day. She gathered seeds and stored food for the coming winter. The grasshopper jumped around and sang songs all day long. He never worked and never worried about tomorrow. Day after day, the ant worked very hard all summer long. She carried heavy seeds and built a warm shelter in the hill. The grasshopper just kept playing and danced happily in the beautiful warm sunshine. Then one cold day in autumn, the first frost appeared. The grasshopper felt very cold and very hungry. He came to the ant's house and asked for food. The ant gave the grasshopper some food and invited him inside, saying he should work with her next summer. All winter long, the two animals shared food together. The grasshopper learned an important lesson: always work hard and prepare for the future. From that day on, both the ant and the grasshopper worked hard together and stayed happy and healthy for the rest of the year.",
      story_text_vi: "Rất lâu trước đây, có một con kiến chăm chỉ sống trên một gò đất nhỏ. Cũng có một con châu chấu lười biếng sống dưới một chiếc lá xanh lớn. Dưới ánh nắng mùa hè ấm áp, con kiến đi ra đồng mỗi ngày. Cô ấy nhặt hạt và dự trữ thức ăn cho mùa đông sắp tới. Con châu chấu nhảy tung tăng và hát ríu rít cả ngày. Nó không bao giờ làm việc và không bao giờ lo lắng về ngày mai. Ngày này qua ngày khác, con kiến làm việc rất chăm chỉ cả mùa hè. Cô ấy mang những hạt nặng và xây một ngôi nhà ấm trong gò đất. Con châu chấu chỉ tiếp tục chơi và nhảy múa vui vẻ dưới ánh nắng ấm đẹp. Rồi một ngày lạnh vào mùa thu, sương giá đầu tiên xuất hiện. Con châu chấu cảm thấy rất lạnh và rất đói. Nó đến nhà con kiến và xin thức ăn. Con kiến cho châu chấu một ít thức ăn và mời nó vào trong, nói rằng nó nên làm việc cùng cô mùa hè tới. Suốt mùa đông, hai con vật chia sẻ thức ăn cùng nhau. Con châu chấu học được một bài học quan trọng: luôn làm việc chăm chỉ và chuẩn bị cho tương lai. Từ ngày đó, cả kiến và châu chấu làm việc chăm chỉ cùng nhau và sống vui vẻ khỏe mạnh suốt phần còn lại của năm."
    },
    {
      mission_id: 2,
      id: 2,
      title: "Relative Clauses — Practice with Fable Characters",
      title_en: "Relative Clauses — Practice with Fable Characters",
      title_vi: "Mệnh Đề Quan Hệ — Luyện Tập Với Nhân Vật Ngụ Ngôn",
      theme: "Practice using WHO, WHICH, THAT with fable characters and events",
      type: "practice",
      character: {
        name: "Fable Practice",
        role: "Practising relative clauses with story characters and events"
      },
      opening_narrative: "Now let us practice the relative clauses WHO, WHICH, and THAT using the fable characters! This is a very important grammar point. WHO is for people and animals, WHICH is for things, and THAT works for both. Let us make some sentences together!",
      story_arc: [
        {
          phase: "who_practice",
          turns: "1-5",
          phase_name: "WHO for Characters",
          focus: "Using WHO for the ant and grasshopper — animals are people in stories",
          goal: "Student makes sentences with WHO to describe the fable characters",
          phase_questions: [
            "Make a sentence with WHO about the ant! Remember — WHO is for the ant! Say: The ant WHO gathered seeds was clever, or The ant WHO worked hard was always ready",
            "Make a sentence with WHO about the grasshopper! Say: The grasshopper WHO never worked was lazy, or The grasshopper WHO sang songs all day was happy in summer",
            "Which sentence is correct: The ant WHICH worked hard — or The ant WHO worked hard? Yes, WHO is correct because the ant is an animal! Say: The ant WHO worked hard was clever",
            "Make your own sentence with WHO about a character! Be creative! Say: The animals WHO prepared for winter were safe, or The summer WHICH was warm and long was perfect for the ant"
          ]
        },
        {
          phase: "which_that_practice",
          turns: "6-10",
          phase_name: "WHICH and THAT for Things",
          focus: "Using WHICH and THAT for things like stories, seasons, food, and lessons",
          goal: "Student makes sentences with WHICH and THAT for story elements",
          phase_questions: [
            "Make a sentence with WHICH about the fable! WHICH is for things! Say: The fable WHICH we read teaches a great lesson, or The story WHICH tells about the ant is very famous",
            "Make a sentence with THAT — remember, THAT works for everything! Say: The winter THAT came was very cold, or The lesson THAT we learned was very important",
            "Which is better: The food WHICH the ant stored OR The food THAT the ant stored? Both are correct! Say: The food THAT the ant stored was enough for winter",
            "Use THAT or WHICH to describe the season! Say: The summer THAT was warm helped the ant gather many seeds, or The autumn WHICH brought the frost changed everything"
          ]
        }
      ],
      minimum_turns: 10,
      maximum_turns: 12,
      story_text: "The Ant and the Grasshopper is a famous fable WHICH teaches an important lesson. The ant WHO worked very hard was always ready for winter. The grasshopper WHO only played had nothing to eat. The winter THAT came was very cold. The lesson WHICH we learned is to always prepare for the future.",
      discussion_prompts: [
        {
          id: 1,
          question_en: "Compare the ant and the grasshopper using WHO and THAT. How are they different?",
          prompt_vi: "So sánh kiến và châu chấu dùng WHO và THAT. Chúng khác nhau như thế nào?",
          grammar_hint: "The ant WHO worked hard was always ready. The grasshopper WHO never worked was always hungry. The winter THAT came was hard for the grasshopper.",
          example_answer: "The ant WHO worked hard gathered seeds every day and was always ready for winter. The grasshopper WHO never worked only sang songs and had nothing to eat when the winter THAT came. The fable WHICH we read teaches us that we should always prepare for the future!"
        },
        {
          id: 2,
          question_en: "Do you think the grasshopper deserved the ant's help? Why or why not? Use WHO, WHICH, or THAT in your answer.",
          prompt_vi: "Bạn có nghĩ châu chấu xứng đáng được kiến giúp không? Tại sao? Dùng WHO, WHICH hoặc THAT trong câu trả lời.",
          grammar_hint: "The ant WHO helped the grasshopper was very kind. The lesson WHICH we learn is important. Everyone SHOULD prepare for the future THAT is coming.",
          example_answer: "I think the ant WHO shared food with the grasshopper was very kind. The grasshopper WHO never worked did not deserve help, but the ant was generous. The lesson WHICH we learn is that we should help others even when they made mistakes. The future THAT is coming is unpredictable, so we should all prepare for it!"
        }
      ]
    },
    {
      mission_id: 3,
      id: 3,
      title: "Design Your Own Fable",
      title_en: "Design Your Own Fable",
      title_vi: "Thiết Kế Truyện Ngụ Ngôn Của Riêng Bạn",
      theme: "Student creates their own fable using the ant and grasshopper moral",
      type: "creative",
      character: {
        name: "Young Storyteller",
        role: "A creative storyteller who understands the value of hard work and planning ahead"
      },
      opening_narrative: "Imagine YOU are writing a fable! Think of two animals or characters — one who works hard and plans ahead, and one who only plays and forgets to prepare. What lesson does your fable teach? Tell me your story!",
      story_arc: [
        {
          phase: "your_characters",
          turns: "1-4",
          phase_name: "Create Your Characters",
          focus: "Student invents two characters — one hardworking, one lazy — using WHO",
          ai_prompts: [
            "Who is the first character in your fable? Give them a name and tell me what they do every day! Say: There was a ___ WHO always..., or The ___ WHO worked hard was very smart",
            "Who is the second character? How are they different from the first? Say: There was also a ___ WHO never..., or The ___ WHO only played had problems later",
            "Use WHO to describe both your characters! Say: The character WHO planned ahead was safe, or The character WHO was lazy learned a lesson"
          ]
        },
        {
          phase: "the_problem",
          turns: "3-4",
          phase_name: "The Problem Comes",
          focus: "Student describes what happened when the lazy character's problem arrived",
          ai_prompts: [
            "What problem came? Was it winter, or something else? Say: When ___ came, the ___ was very ___ and ___",
            "Was the hardworking character ready? That character was so wise! Say: The character WHO prepared was safe and warm, or The character THAT had worked hard was ready",
            "How did the lazy character feel? Use a sentence with WHO or THAT! Say: The character WHO was not ready felt very sad, or The situation THAT was difficult taught a lesson"
          ]
        },
        {
          phase: "your_moral",
          turns: "3-4",
          phase_name: "The Lesson",
          focus: "Student explains the moral of their own fable",
          ai_prompts: [
            "What lesson does your fable teach? This is the most important part! Say: My fable teaches us to always ___, or The lesson WHICH we learn is ___",
            "Did the two characters become friends at the end? That is a wonderful ending! Say: At the end, both characters WHO worked hard were happy, or They learned to work together THAT changed everything",
            "Finish this sentence — and be proud of your story: My fable is about characters WHO learned that ___ always ___."
          ]
        }
      ],
      minimum_turns: 10,
      maximum_turns: 12,
      story_text: "Fables are wonderful stories WHICH teach us important lessons. The Ant and the Grasshopper is a famous example of a fable THAT shows us why we should prepare for the future. Characters WHO work hard are usually ready for challenges. Characters WHO only play may have problems later. But the best fables teach us that we can always learn and change. The lesson WHICH every fable teaches is to be wise, kind, and prepared!",
      discussion_prompts: [
        {
          id: 1,
          question_en: "Create a title for your fable. Use WHO or THAT in the title if possible!",
          prompt_vi: "Tạo một tiêu đề cho truyện ngụ ngôn của bạn. Dùng WHO hoặc THAT trong tiêu đề nếu có thể!",
          grammar_hint: "The ___ WHO Learned: A Fable. The ___ THAT Changed: A Story About ___.",
          example_answer: "The Squirrel Who Prepared: A Fable About Wisdom! Or The Two Friends That Learned: A Story About Planning Ahead!"
        }
      ]
    }
  ],

  // ── Spark Talk ──────────────────────────────────────────────────────────────
  spark_talk: [
    {
      id: 'spark_planning',
      emoji: '📦',
      title: 'Planning Ahead',
      bridge: 'The ant is famous for always being prepared! What about YOU? 🌟',
      seed_question: 'Are you the ant type or the grasshopper type? Do you usually prepare for things, or do you sometimes forget? Say: I am more like the ant because I always..., or I am more like the grasshopper because I sometimes...',
      frames: [
        {
          template: 'I usually prepare for ___ by ___ early.',
                    hint_en: "I usually prepare for school by packing my bag early.",
          follow_up_q: 'That is very smart! What do you prepare for most often? 📋',
          hints: ['school', 'exams', 'trips', 'birthday parties', 'family events']
        },
        {
          template: 'I sometimes forget to prepare for ___ because I am too busy ___ .',
                    hint_en: "I sometimes forget to prepare for tests because I am too busy playing.",
          follow_up_q: 'That is very honest! What could help you remember next time? 💡',
          hints: ['playing games', 'watching videos', 'watching TV', 'hanging out with friends']
        },
        {
          template: 'Preparing for the future means ___ today.',
                    hint_en: "Preparing for the future means working hard today.",
          follow_up_q: 'That is such a wise answer! You think like the clever ant! 🐜',
          hints: ['working hard', 'storing food', 'finishing homework early', 'being organised']
        },
        {
          template: 'I ___ my ___ the ___ before so I never ___ anything.',
                    hint_en: "I packed my bag the night before so I never forget anything.",
          follow_up_q: 'That is such an ant-like habit! Do you plan your clothes or lunch the night before too? 🌙',
          hints: ['packed', 'prepared', 'night before', 'morning', 'forget', 'miss']
        },
        {
          template: 'The ant WHO ___ ___ was ready for ___ .',
                    hint_en: "The ant WHO worked hard all summer was ready for winter.",
          follow_up_q: 'Do you think the ant was happy at the end of the story? Why or why not? 🐜',
          hints: ['worked', 'gathered', 'stored', 'prepared', 'winter', 'summer']
        },
        {
          template: 'I ___ homework ___ and never ___ it until the last ___ .',
                    hint_en: "I finish homework early and never leave it until the last minute.",
          follow_up_q: 'That is brilliant time management! How do you feel when you finish your homework early? 😊',
          hints: ['finish', 'complete', 'do', 'early', 'quickly', 'on time', 'leave', 'last minute']
        },
        {
          template: 'My teacher says I must ___ ___ for my ___ and tests.',
                    hint_en: "My teacher says I must prepare well for my lessons and tests.",
          follow_up_q: 'Do you have a special way to prepare for tests? Do you study alone or with someone? 📚',
          hints: ['prepare', 'study', 'review', 'lessons', 'tests', 'exams', 'well']
        },
        {
          template: 'Preparing today means I can ___ ___ tomorrow without ___ .',
                    hint_en: "Preparing today means I can relax tomorrow without worry.",
          follow_up_q: 'That is a wonderful way to think about it! Do you agree that being organised reduces stress? 🌟',
          hints: ['relax', 'rest', 'enjoy', 'free', 'tomorrow', 'later', 'worry', 'stress']
        }
      ],
      scaffold_frames: [
        'I usually prepare for ___ by ___ early.',
        'I sometimes forget to prepare for ___ because I am too busy ___.',
        'Preparing for the future means ___ today.',
        'I ___ my ___ the ___ before so I never ___ anything.',
        'The ant WHO ___ ___ was ready for ___.',
        'I ___ homework ___ and never ___ it until the last ___.'
      ],
      vocab_focus: ['prepare', 'future', 'lesson', 'gather', 'shelter'],
      turns: 8
    },
    {
      id: 'spark_lazy',
      emoji: '🦗',
      title: 'Hard Work vs Laziness',
      bridge: 'The grasshopper only played and sang songs all summer — but look what happened! Let us talk about it! 🌻',
      seed_question: 'Is it bad to play games and have fun? Say: Playing games is good for you because..., or Sometimes it is important to work hard AND play hard, or I balance work and fun by...',
      frames: [
        {
          template: 'It is important to work hard, but also to ___ with friends.',
                    hint_en: "It is important to work hard, but also to rest with friends.",
          follow_up_q: 'Exactly right! Balance is everything! What do you like to do for fun? 🎮',
          hints: ['play games', 'watch videos', 'listen to music', 'hang out', 'dance']
        },
        {
          template: 'The grasshopper WHO ___ should have ___ more.',
                    hint_en: "The grasshopper WHO works hard should have food for winter.",
          follow_up_q: 'You are so right! What should the grasshopper have done differently? 🧠',
          hints: ['never worked', 'only played', 'gathered seeds', 'prepared for winter', 'worked hard']
        },
        {
          template: 'Working hard together with someone is fun because ___ .',
                    hint_en: "Working hard together with someone is fun because they help each other.",
          follow_up_q: 'That is a wonderful perspective! Who do you like to work hard with? 👫',
          hints: ['friends make it fun', 'we help each other', 'we learn from each other', 'we finish faster together']
        },
        {
          template: 'The grasshopper WHO only ___ all summer should have ___ more ___ for winter.',
                    hint_en: "The grasshopper WHO only played all summer should have stored more food for winter.",
          follow_up_q: 'That sounds frightening — being cold and hungry is not fun. What would you say to help the grasshopper feel better? 🦗',
          hints: ['played', 'sang', 'relaxed', 'enjoyed', 'danced', 'stored', 'gathered', 'saved', 'food', 'seeds', 'nuts']
        },
        {
          template: 'But the kind ant WHO ___ the grasshopper because they ___ friends.',
                    hint_en: "But the kind ant WHO helped the grasshopper because they became friends.",
          follow_up_q: 'That is such a heartwarming ending! Do you think the grasshopper learned his lesson? What will he do next summer? 💛',
          hints: ['helped', 'shared', 'saved', 'invited', 'welcomed', 'became', 'were', 'are', 'friends', 'neighbours']
        },
        {
          template: 'I sometimes ___ a little too much ___ instead of ___ ___ first.',
                    hint_en: "I sometimes watch a little too much TV instead of working first.",
          follow_up_q: 'That is very honest! What helps you stay focused and finish work before playing? 🎯',
          hints: ['watch', 'play', 'listen', 'do', 'TV', 'games', 'videos', 'music', 'work', 'study', 'first']
        },
        {
          template: 'My ___ says I should always ___ ___ before I ___ ___ ___ .',
                    hint_en: "My mum says I should always finish homework before I play video games.",
          follow_up_q: 'Do you agree with that rule? What would be a fair balance between work and fun for you? 🎮',
          hints: ['mum', 'dad', 'teacher', 'parent', 'finish', 'complete', 'do', 'homework', 'chores', 'first', 'play', 'games']
        },
        {
          template: 'I balance work and fun by ___ my tasks ___ and then ___ myself as a ___ .',
                    hint_en: "I balance work and fun by finishing my tasks first and then rewarding myself as a treat.",
          follow_up_q: 'That is a fantastic strategy! What do you reward yourself with after finishing hard work? 🌟',
          hints: ['finishing', 'completing', 'doing', 'first', 'early', 'rewarding', 'treating', 'fun', 'treat', 'break', 'gift']
        }
      ],
      scaffold_frames: [
        'It is important to work hard, but also to ___ with friends.',
        'The grasshopper WHO ___ should have ___ more.',
        'Working hard together with someone is fun because ___.',
        'The grasshopper WHO only ___ all summer should have ___ more ___ for winter.',
        'But the kind ant WHO ___ the grasshopper because they ___ friends.',
        'I balance work and fun by ___ my tasks ___ and then ___ myself as a ___.'
      ],
      vocab_focus: ['hard-working', 'lazy', 'lesson', 'share', 'future'],
      turns: 8
    }
  ],

  // ── Free Talk Knowledge Base ────────────────────────────────────────────────
  freetalk_knowledge: {
    week_title: "The Ant and the Grasshopper",
    week_number: 34,
    theme: "storytelling_fable",
    knowledge_base: [
      "Fables are short stories that teach a moral lesson",
      "Relative clauses: WHO for people/animals, WHICH for things, THAT for both",
      "IMPORTANT — Use these chunks in story_text: 'hard-working ant', 'lazy grasshopper', 'gathered seeds', 'stored food', 'learned a lesson', 'prepare for the future', 'worked hard together', 'was very cold and very hungry'",
      "IMPORTANT — Empathetic responses required. When a student describes the grasshopper being cold and hungry, say 'I am sorry to hear that' or 'That sounds frightening'. NEVER say 'Great!' after a student describes the grasshopper's suffering in winter.",
      "The moral of the fable: always work hard and prepare for the future",
      "Both characters end up working hard together — this shows we can always change and improve",
      "Summer is the time to prepare; winter is when we need what we saved",
      "Sharing food and helping others is kind, but the best lesson is to prepare ourselves"
    ],
    example_opening_questions: [
      "Do you think the grasshopper learned an important lesson?",
      "What would you have done if you were the ant?",
      "Should the ant have shared food with the grasshopper? Why or why not?"
    ],
    starter_prompts: [
      "I think the grasshopper WHO never worked should have...",
      "The lesson WHICH we learn from this fable is...",
      "If I were the ant, I would..."
    ]
  }
};

export default week34RealData;
