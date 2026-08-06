// WEEK 33: THE MISTAKE — Irregular Verbs 5: Accidents
// AI Tutor V28 Format — W32 Schema (Golden Standard)
// story_missions[] — matched by StoryMissionTab
// DO NOT USE PYTHON TO CREATE THIS FILE

const week33RealData = {
  week_id: 33,
  week_number: 33,
  title: "The Mistake",
  weekTitle_en: "The Mistake (Irregular Verbs 5)",
  weekTitle_vi: "Sai Lầm (Động Từ Bất Quy Tắc 5)",
  topic: "Accidents and consequences using Irregular Verbs Group 5: hit-hit, fall-fell, break-broke, hurt-hurt, bite-bit, begin-began, lose-lost, forget-forgot",
  topic_vi: "Tai nạn và hậu quả dùng Động Từ Bất Quy Tắc Nhóm 5: hit-hit, fall-fell, break-broke, hurt-hurt, bite-bit, begin-began, lose-lost, forget-forgot",
  theme: "accidents_and_consequences",
  grammar_focus: "Past Simple Irregular Verbs Group 5 — Accident Verbs",
  grammar_pattern: "Jake hit his knee. He fell down. He broke the cup. His knee hurt. He bit his tongue. The class began at 8. He forgot to walk carefully.",
  grammar_examples: [
    "Jake hit his knee on the table and fell down hard.",
    "He broke the glass cup when he fell.",
    "His knee hurt a lot after the fall.",
    "Jake bit his tongue when he hit the floor.",
    "The nurse began treating Jake's injuries.",
    "Jake forgot to walk carefully in the corridor.",
    "He lost his confidence after the accident."
  ],

  // Chunks/collocations AI must use in story_text narrative
  // Source: read.js bold chunks — only multi-word phrases + high-value single-word verbs
  chunk_focus: [
    "walk carefully",    // core safety chunk — appears 3x in read.js
    "fell down",         // key accident verb phrase
    "in the corridor",   // prepositional phrase — location of accident
    "was hurt",          // passive injury — W33 grammar collocation
  ],

  target_vocab: [
    { word: "accident", pronunciation: "/ˈæksɪdənt/", definition_vi: "tai nạn", definition_en: "something bad that happens by chance, not on purpose" },
    { word: "corridor", pronunciation: "/ˈkɒrɪdɔːr/", definition_vi: "hành lang", definition_en: "a long passage in a building with rooms on both sides" },
    { word: "cold pack", pronunciation: "/kəʊld pæk/", definition_vi: "túi chườm lạnh", definition_en: "a bag of cold material used to reduce swelling or pain" },
    { word: "lesson", pronunciation: "/ˈlesən/", definition_vi: "bài học", definition_en: "something learned from experience, often a mistake" },
    { word: "carefully", pronunciation: "/ˈkeəfəli/", definition_vi: "cẩn thận", definition_en: "with great attention to avoid danger or mistakes" },
    { word: "catch", pronunciation: "/kætʃ/", definition_vi: "bắt, nắm bắt", definition_en: "to stop and hold something that is moving" },
    { word: "terrible", pronunciation: "/ˈterəbəl/", definition_vi: "kinh khủng", definition_en: "extremely bad or unpleasant" },
    { word: "understand", pronunciation: "/ˌʌndəˈstænd/", definition_vi: "hiểu", definition_en: "to know the meaning of something" },
    { word: "explain", pronunciation: "/ɪkˈspleɪn/", definition_vi: "giải thích", definition_en: "to make something clear or easy to understand" },
    { word: "recover", pronunciation: "/rɪˈkʌvər/", definition_vi: "hồi phục", definition_en: "to get better after an illness or injury" },
    { word: "swelling", pronunciation: "/ˈswelɪŋ/", definition_vi: "sưng", definition_en: "the state of being larger than normal because of injury or infection" },
    { word: "crowding", pronunciation: "/ˈkraʊdɪŋ/", definition_vi: "chen lấn, đông đúc", definition_en: "too many people in one place" }
  ],

  nova_instructions: {
    role: "Nova is a friendly British English teacher (female, age 28) who speaks in a warm, encouraging British accent.",
    personality: "Patient, supportive, uses British expressions like 'brilliant', 'lovely', 'well done'",
    language: "British English (RP accent)",
    correction_style: "Gentle and constructive — never criticise mistakes harshly",
    feedback: "Always praise effort first, then gently correct"
  },

  v28_format_notes: "W33 follows W32 V28 schema: story_missions[], spark_talk[], freetalk_knowledge{}. Grammar focus: Irregular Verbs Group 5 (Accident Verbs).",

  // ── Story Missions ────────────────────────────────────────────────────────
  story_missions: [
    {
      mission_id: 1,
      id: 1,
      title: "Jake's Bad Day — The Accident",
      title_en: "Jake's Bad Day — The Accident",
      title_vi: "Ngày Tồi Tệ Của Jake — Tai Nạn",
      theme: "Jake's corridor accident — retelling the events using accident verbs",
      type: "story",
      character: {
        name: "Jake",
        attributes: {
          ran_in_corridor: true,
          hit_knee_on_table: true,
          fell_down_hard: true,
          broke_glass_cup: true,
          hurt_knee_and_arm: true,
          bit_tongue: true,
          began_to_cry: true,
          told_truth: true,
          promised_to_be_careful: true
        },
        role: "A student who learned an important lesson about school safety after an accident"
      },
      opening_narrative: "Jake had a really tough day at school — he was running because he was late, and then he fell and got hurt. It sounds like it was scary and painful. Let us retell Jake's story together and learn from what happened. First — why was Jake running in the corridor?",
      story_arc: [
        {
          phase: "the_fall",
          turns: "1-4",
          phase_name: "The Accident (ran, hit, fell, broke)",
          focus: "Accident verbs: ran, hit, fell, broke — what happened in the corridor",
          goal: "Student retells Jake's accident with empathy and accuracy",
          phase_questions: [
            "Why was Jake running in the corridor? That sounds stressful! Say: Jake ran in the corridor because he was late, or He was late so he ran to class",
            "Oh no — what did Jake hit? Say: Jake hit his knee on the corner of a table, or He hit the table with his knee",
            "What happened when Jake fell? That must have been really scary! Say: He fell down hard and broke the glass cup, or Jake fell and broke a cup that someone was holding",
            "Who was holding the cup? Poor Jake — so many things went wrong at once! Say: Another student was holding the glass cup, or A classmate had a cup and Jake broke it"
          ]
        },
        {
          phase: "the_injuries",
          turns: "5-7",
          phase_name: "The Injuries (hurt, bit, began)",
          focus: "Injury verbs: hurt, bit, began — what parts of the body were hurt",
          goal: "Student describes Jake's injuries with empathy and body-part vocabulary",
          phase_questions: [
            "What parts of Jake's body hurt after the fall? That must have hurt so much! Say: His knee hurt and his arm hurt, or Jake hurt his knee and his arm",
            "What happened to Jake's tongue? Poor Jake — so many injuries! Say: He bit his tongue when he fell, or Jake bit his tongue during the fall",
            "How did Jake feel? That sounds very frightening! Say: He began to cry because everything hurt at once, or He began crying because he was in pain",
            "What did the nurse do to help Jake? That was really kind of her! Say: The nurse put a cold pack on his knee, or She put a cold pack on his knee and his arm"
          ]
        },
        {
          phase: "the_lesson",
          turns: "8-10",
          phase_name: "The Lesson (forgot, understood, promised)",
          focus: "Learning verbs: forgot, understood, promised — what Jake learned",
          goal: "Student explains Jake's lesson with understanding and empathy",
          phase_questions: [
            "What did Jake forget to do? We all forget sometimes when we are in a hurry! Say: He forgot to walk carefully in the corridor, or Jake forgot to be careful",
            "What important lesson did the nurse teach Jake? That was a really good lesson for everyone! Say: Everyone must walk carefully in the corridor, or She taught him to walk carefully even when late",
            "How did Jake recover? I am glad he felt better! Say: He rested at home and recovered quickly, or Jake recovered at home and felt better",
            "What did Jake promise? Making that promise takes real courage! Say: He promised to walk carefully in the corridor, or Jake promised to be more careful from now on"
          ]
        }
      ],
      minimum_turns: 10,
      maximum_turns: 12,
      story_text: "Jake had a terrible day at school last Monday. He was running in the corridor because he was late for class. He forgot to walk carefully. Suddenly, Jake hit his knee on the corner of a table. He fell down hard and broke the glass cup that another student was holding. His arm hurt when he tried to catch the falling cup. Jake bit his tongue when he fell, and his hand hit the floor. He began to cry because everything hurt at once. His teacher came quickly and called the school nurse. The nurse put a cold pack on Jake's knee and his arm. She told Jake it was an important lesson — everyone must walk carefully in the corridor. Jake understood that running in the corridor was dangerous. At home, Jake recovered quickly. He learned one very important lesson: always walk carefully, even when you are late.",
      story_text_vi: "Jake có một ngày tồi tệ ở trường vào thứ Hai. Cậu đang chạy trong hành lang vì muộn. Cậu quên đi cẩn thận. Đột nhiên, Jake đập đầu gối vào góc bàn. Cậu ngã xuống và làm vỡ chiếc cốc thủy tinh của một học sinh khác. Cánh tay cậu đau khi cố bắt chiếc cốc đang rơi. Jake cắn lưỡi khi ngã, và bàn tay cậu đập xuống sàn. Cậu bắt đầu khóc vì mọi thứ đau cùng một lúc. Giáo viên nhanh chóng gọi y tá. Y tá đặt túi chườm lạnh lên đầu gối và cánh tay của Jake. Cô ấy bảo đó là một bài học quan trọng — mọi người phải đi cẩn thận trong hành lang. Jake hiểu rằng chạy trong hành lang là nguy hiểm. Ở nhà, Jake hồi phục nhanh. Cậu học được một bài học rất quan trọng: luôn đi cẩn thận, kể cả khi muộn."
    },
    {
      mission_id: 2,
      id: 2,
      title: "The Accident Verbs Practice — Sam's Story",
      title_en: "The Accident Verbs Practice — Sam's Story",
      title_vi: "Luyện Động Từ Tai Nạn — Câu Chuyện Của Sam",
      theme: "Practice accident verbs in a different context — Sam's playground accident",
      type: "practice",
      character: {
        name: "Sam",
        attributes: {
          ran_on_playground: true,
          fell_off_swings: true,
          hurt_elbow: true,
          began_crying: true,
          told_truth: true,
          understood_safety: true
        },
        role: "A student who also had an accident and learned the same lesson as Jake"
      },
      opening_narrative: "Sam had an accident too — but on the playground. That must have been frightening for her! Let us help Sam tell her story with the right accident verb forms. What happened to Sam first?",
      story_arc: [
        {
          phase: "playground_accident",
          turns: "1-5",
          phase_name: "The Fall (ran, fell, hurt)",
          focus: "Accident verbs in context: ran, fell, hurt, bit",
          goal: "Student uses correct past forms to describe Sam's playground accident with empathy",
          phase_questions: [
            "What happened when Sam ran on the playground? That sounds worrying! Say: Sam fell off the swings, or She ran too fast and fell down",
            "What part of Sam's body hurt? Poor Sam! That must have been very painful! Say: Her elbow hurt a lot, or Sam hurt her elbow when she fell",
            "Did Sam bite her tongue too? Oh dear — more than one injury! Say: Yes, she bit her tongue when she fell, or No, Sam only hurt her elbow",
            "What did Sam do first when she fell? That is such a natural reaction! Say: She began crying, or Sam began to cry because it hurt",
            "What did the teacher do to help? It is so good that teachers are there to help! Say: The teacher put a cold pack on her elbow, or The teacher came and comforted Sam"
          ]
        },
        {
          phase: "truth_and_lesson",
          turns: "6-10",
          phase_name: "Honesty and Recovery (told, understood, recovered)",
          focus: "Learning verbs: told, understood, recovered, promised",
          goal: "Student describes Sam's recovery and the lesson she learned with empathy",
          phase_questions: [
            "Did Sam tell the truth about the accident? It takes courage to be honest! Say: Yes, Sam told the truth, or She explained everything to the teacher honestly",
            "What lesson did Sam understand? That is such an important lesson for all of us! Say: She understood to be more careful, or Sam understood why walking carefully matters",
            "How did Sam recover? I am glad she felt better soon! Say: She rested at home and recovered quickly, or Sam recovered in a few days",
            "What did Sam promise? Making a promise after a mistake shows real growth! Say: She promised to walk carefully on the playground, or Sam promised to be more careful next time",
            "Were Sam's and Jake's lessons the same? Yes — both accidents taught the same important message! Say: Yes, both learned to walk carefully, or Yes, they both understood that safety rules keep us safe"
          ]
        }
      ],
      minimum_turns: 10,
      maximum_turns: 12,
      story_text: "Sam was also a careful student — until one afternoon on the playground. She was running to the swings because she wanted to be first in line. She forgot to look where she was going. Sam fell off the swings and hurt her elbow badly. She bit her tongue when she hit the ground. She began crying immediately. The playground teacher ran to Sam and put a cold pack on her elbow. Sam told the truth about running too fast. The teacher explained that walking carefully is important on the playground too. Sam understood the lesson. She recovered at home over the weekend and promised to always walk carefully, even when she wanted to be first.",
      discussion_prompts: [
        {
          id: 1,
          question_en: "Compare Jake's and Sam's accidents. What is the same and what is different?",
          prompt_vi: "So sánh tai nạn của Jake và Sam. Điều gì giống và khác nhau?",
          grammar_hint: "Both Jake and Sam forgot to... Jake hurt his... but Sam hurt her... They both promised to...",
          example_answer: "Both Jake and Sam forgot to be careful and had accidents. Jake fell in the corridor, but Sam fell on the playground. Jake hurt his knee and arm, but Sam hurt her elbow. They both promised to be more careful after their accidents. They both understood that walking carefully is very important!"
        },
        {
          id: 2,
          question_en: "Why do you think both Jake and Sam were running? What feeling made them run?",
          prompt_vi: "Tại sao bạn nghĩ Jake và Sam đều chạy? Cảm giác gì khiến họ chạy?",
          grammar_hint: "They were running because they were... or They forgot to... The feeling was being...",
          example_answer: "Both Jake and Sam were running because they were late or excited. Jake was late for class and ran in the corridor. Sam wanted to be first in line and ran on the playground. The feeling was being in a hurry — they forgot to be careful because they were thinking about being first or not being late!"
        }
      ]
    },
    {
      mission_id: 3,
      id: 3,
      title: "Design Your Safety Story",
      title_en: "Design Your Safety Story",
      title_vi: "Thiết Kế Câu Chuyện An Toàn Của Bạn",
      theme: "Student creates their own near-miss or lesson story using all accident verbs",
      type: "creative",
      character: {
        name: "Student",
        role: "A safety hero who understands the importance of walking carefully"
      },
      opening_narrative: "Imagine you were almost in an accident — you were in a hurry and almost made a mistake, but you remembered to be careful just in time! That takes real wisdom. What almost happened? Tell me your story!",
      story_arc: [
        {
          phase: "the_close_call",
          turns: 3,
          focus: "Student describes a near-miss or a lesson learned about school safety",
          ai_prompts: [
            "Were you ever in a hurry at school? That happens to all of us! Say: I was in a hurry once because..., or I almost ran in the corridor when...",
            "What did you almost do? That must have been a scary moment! Say: I almost hit a table, or I almost fell down the stairs",
            "Why did you stop? It takes wisdom to pause and be careful! Say: I remembered to walk carefully, or I thought about Jake's accident and slowed down"
          ]
        },
        {
          phase: "your_lesson",
          turns: 3,
          focus: "Student explains the safety lesson they learned",
          ai_prompts: [
            "What is the most important safety rule at your school? This is great advice! Say: The most important rule is to..., or At my school we must always...",
            "What did you learn from this experience? Learning from a near-miss is so smart! Say: I learned that walking carefully matters, or I understood why safety rules protect us",
            "What will you promise to do? Making this promise shows real growth! Say: I will promise to always..., or I promise to walk carefully in the..."
          ]
        },
        {
          phase: "teaching_others",
          turns: 3,
          focus: "Student gives advice to new students about school safety",
          ai_prompts: [
            "What advice would you give to a new student? This is wonderful — you are becoming a safety hero! Say: To new students, I would say: always..., or Remember to walk carefully because...",
            "Why should everyone follow safety rules? You are so wise! Say: We should follow rules because..., or Safety rules help us all to...",
            "Finish this sentence — and be proud of yourself: Walking carefully takes a little more time, but it means we can..."
          ]
        }
      ],
      minimum_turns: 10,
      maximum_turns: 12,
      story_text: "Walking carefully at school is one of the most important rules we can follow. When we are in a hurry, it is easy to forget and run. But running in corridors or on playgrounds can cause accidents. Jake hit his knee and fell. Sam fell off the swings and hurt her elbow. Both of them learned the same important lesson: always walk carefully, even when you are late or excited. We can all be safety heroes by following the rules, looking where we are going, and telling the truth when accidents happen. A few extra seconds of walking carefully can prevent hours of pain and weeks of recovery!",
      discussion_prompts: [
        {
          id: 1,
          question_en: "Create your own safety slogan. It should be short and easy to remember. Use at least 3 accident verbs in your answer.",
          prompt_vi: "Tạo khẩu hiệu an toàn của riêng bạn. Nó nên ngắn gọn và dễ nhớ. Dùng ít nhất 3 động từ tai nạn trong câu trả lời.",
          grammar_hint: "Walk carefully, don't run. If you fall, you might hurt your... Safety first!",
          example_answer: "Walk carefully, or you might fall and hurt yourself! Remember Jake and Sam — they forgot to be careful and had accidents. But if we remember to walk, we can stay safe and happy! Walk carefully, stay safe!"
        }
      ]
    }
  ],

  // ── Spark Talk ─────────────────────────────────────────────────────────────
  spark_talk: [
    {
      id: 'spark_accident',
      emoji: '🏥',
      title: 'Accidents',
      bridge: 'Jake had an accident in the corridor! And what about YOU? 👀 I am sorry to hear that — accidents can be scary!',
      seed_question: 'Have you ever had an accident? You can say: I hit my knee once, or I fell down and hurt myself, or Nothing bad like that ever happened to me!',
      frames: [
        {
          template: 'I hit my ___ once.',
                    hint_en: "I hit my knee once and it hurt a lot.",
          follow_up_q: 'Oh no! Did it hurt? What did you do after that? 🤕',
          hints: ['knee', 'elbow', 'head', 'arm', 'hand']
        },
        {
          template: 'I fell down and ___ my ___.',
                    hint_en: "I fell down and hurt my knee and my elbow.",
          follow_up_q: 'That sounds really painful! Were you okay? Did someone help you? 🏥',
          hints: ['broke', 'hurt', 'cut', 'knee', 'arm', 'leg']
        },
        {
          template: 'I was very ___ after the accident.',
                    hint_en: "I was very sad after the accident.",
          follow_up_q: 'That is completely understandable — accidents are scary! What did you learn from it? 💪',
          hints: ['careful', 'scared', 'sad', 'nervous']
        },
        {
          template: 'I ___ the ___ and it ___ very ___ for a ___ time.',
                    hint_en: "I fell the wrong way and it hurt very badly for a long time.",
          follow_up_q: 'That must have been so painful! Did you need to see a doctor or nurse? What did they do to help? 🩹',
          hints: ['fell', 'wrong way', 'hurt', 'badly', 'long', 'few days']
        },
        {
          template: 'My ___ ___ me to be ___ from then on.',
                    hint_en: "My mum told me to be careful from then on.",
          follow_up_q: 'That is what mums are best at — looking after us! What did your mum or dad say after your accident? 👩',
          hints: ['mum', 'dad', 'told', 'asked', 'reminded', 'careful']
        },
        {
          template: 'I ___ a ___ on my ___ to help it ___ better.',
                    hint_en: "I put a cold pack on my knee to help it heal better.",
          follow_up_q: 'That is very smart! Do you know other ways to help injuries heal? What do you usually do when someone gets hurt? 🏥',
          hints: ['put', 'placed', 'cold pack', 'ice', 'knee', 'arm', 'heal', 'get better']
        },
        {
          template: 'Now I always ___ ___ so I do not ___ another accident.',
                    hint_en: "Now I always walk carefully so I do not have another accident.",
          follow_up_q: 'That is a wonderful lesson learned! Do you think your accident made you more careful in general? 💪',
          hints: ['walk', 'am', 'careful', 'slow', 'slowly', 'have', 'get']
        },
        {
          template: 'The best thing about ___ from an accident is that you ___ from it.',
                    hint_en: "The best thing about learning from an accident is that you grow from it.",
          follow_up_q: 'Exactly right! Do you think it is important to tell the truth when an accident happens? Why or why not? 🤝',
          hints: ['learning', 'growing', 'healing', 'understand', 'grow', 'learn']
        }
      ],
      scaffold_frames: [
        'I hit my ___ once.',
        'I fell down and ___ my ___.',
        'I was very ___ after the accident.',
        'My ___ ___ me to be ___ from then on.',
        'I ___ a ___ on my ___ to help it ___ better.',
        'Now I always ___ ___ so I do not ___ another accident.'
      ],
      vocab_focus: ['accident', 'carefully', 'terrible', 'understand', 'recover'],
      turns: 8
    },
    {
      id: 'spark_safety',
      emoji: '🚸',
      title: 'School Safety',
      bridge: 'How can we stay safe at school? Let us talk about the rules! 🏫',
      seed_question: 'What safety rule is most important at your school? Say: We must always walk in the corridor or We cannot run near the playground!',
      frames: [
        {
          template: 'We must always ___ in the corridor.',
                    hint_en: "We must always walk carefully in the corridor.",
          follow_up_q: 'Good rule! Why is that important? 🧠',
          hints: ['walk', 'stay calm', 'look where we go', 'be careful']
        },
        {
          template: 'I ___ to be careful after Jake\'s accident.',
                    hint_en: "I learned to be careful after Jake fell.",
          follow_up_q: 'That is great! What lesson did you learn? 📝',
          hints: ['understood', 'promised', 'began', 'learned']
        },
        {
          template: 'Walking carefully is important because ___ .',
                    hint_en: "Walking carefully is important for everyone.",
          follow_up_q: 'Exactly! A few extra seconds can save us from pain. 💪',
          hints: ['it keeps us safe', 'we can avoid accidents', 'nobody gets hurt']
        },
        {
          template: 'We must ___ on the ___ and not on the ___ during break time.',
                    hint_en: "We must walk on the walkway and not on the grass during break time.",
          follow_up_q: 'That is a very important rule! Do you have other playground rules at your school? Tell me about them! 🏃',
          hints: ['walk', 'stay', 'run', 'playground', 'walkway', 'grass', 'veranda']
        },
        {
          template: 'At the ___ I always ___ my ___ so I do not ___ anything.',
                    hint_en: "At the cafeteria I always watch my tray so I do not drop anything.",
          follow_up_q: 'Good thinking! What other places need extra care? The hallway? The stairs? The science lab? 🧪',
          hints: ['cafeteria', 'lunchroom', 'watch', 'hold', 'tray', 'food', 'drink', 'drop']
        },
        {
          template: 'I ___ my ___ and ___ to be ___ at school.',
                    hint_en: "I remembered my lesson and promised to be careful at school.",
          follow_up_q: 'Keeping promises is so important! Have you ever reminded your friends to be careful too? 👫',
          hints: ['remembered', 'learned', 'promised', 'swore', 'teacher', 'lesson', 'rules', 'careful']
        },
        {
          template: 'Being ___ is more important than being ___ on the ___ .',
                    hint_en: "Being safe is more important than being fast on the stairs.",
          follow_up_q: 'That is such wise thinking! Do you think older students should help younger ones stay safe? 🌟',
          hints: ['safe', 'careful', 'slow', 'fast', 'quick', 'stairs', 'playground', 'corridor']
        },
        {
          template: 'Every student ___ know the safety ___ and ___ them every day.',
                    hint_en: "Every student must know the safety rules and follow them every day.",
          follow_up_q: 'Perfect! Do you think the school should teach more safety lessons? What would you add? 📝',
          hints: ['must', 'should', 'needs', 'rules', 'rules', 'guidelines', 'follow', 'remember', 'obey']
        }
      ],
      scaffold_frames: [
        'We must always ___ in the corridor.',
        'I ___ to be careful after Jake\'s accident.',
        'Walking carefully is important because ___.',
        'We must ___ on the ___ during break time.',
        'At the ___ I always ___ my ___ so I do not ___ anything.',
        'I ___ my ___ and ___ to be ___ at school.'
      ],
      vocab_focus: ['carefully', 'lesson', 'accident', 'explain', 'recover'],
      turns: 8
    }
  ],

  // ── Free Talk Knowledge Base ──────────────────────────────────────────────
  freetalk_knowledge: {
    week_title: "The Mistake",
    week_number: 33,
    theme: "accidents_and_consequences",
    knowledge_base: [
      "Irregular verbs: hit-hit, fall-fell, break-broke, hurt-hurt, bite-bit",
      "IMPORTANT — Must use these chunks in story_text: 'walk carefully', 'fell down', 'in the corridor', 'was hurt'",
      "IMPORTANT — Always respond with empathy. When a student shares an accident, say 'I am sorry' or 'That sounds painful/scary'. NEVER say 'Great!' after a student describes an injury. Safety topics should stay on safety theme.",
      "Accidents can happen when we run in corridors or on playgrounds",
      "A cold pack helps reduce swelling from injuries",
      "We learn important lessons from our mistakes — acknowledge this with empathy",
      "Being careful helps prevent accidents",
      "Doctors and nurses help us recover from injuries",
      "We should tell the truth when accidents happen",
      "Walking carefully takes only a few more seconds but saves hours of pain"
    ],
    example_opening_questions: [
      "Have you ever had an accident at school?",
      "What should you do if someone gets hurt?",
      "Why is it important to walk carefully in corridors?"
    ],
    starter_prompts: [
      "I once had an accident when...",
      "To prevent accidents, we should always...",
      "The most important lesson I learned was to..."
    ]
  }
};

export default week33RealData;
