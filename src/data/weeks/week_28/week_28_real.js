const week28RealData = {
  week_id: 28,
  week_number: 28,
  title: "The Tortoise and the Hare",
  weekTitle_en: "The Tortoise and the Hare",
  weekTitle_vi: "Rua va Tho",
  topic: "Retelling a famous fable using Past Simple with irregular verbs (ran, slept, won) and sequence words (First, Then, After that, Finally)",
  topic_vi: "Ke lai truyen ngu ngon noi tieng dung Qua Khu Don voi dong tu bat quy tac (ran, slept, won) va tu chi trinh tu",
  theme: "The Tortoise and the Hare fable, animal adaptations, perseverance vs overconfidence, race story, moral lessons, forest animals",

  grammar_focus: "Past Simple with Irregular Verbs: ran (run), slept (sleep), won (win), lost (lose) — used naturally in fable retelling with sequence words",
  grammar_pattern: "The hare ran fast. The tortoise walked slowly. The hare slept under a tree. The tortoise won the race.",
  grammar_examples: [
    "The hare ran very fast at the start of the race.",
    "The tortoise walked slowly but never stopped.",
    "The hare slept under a big tree.",
    "The tortoise won the race.",
    "The hare lost because he was overconfident.",
    "First, they lined up at the start. Then, the race began. Finally, the tortoise crossed the finish line."
  ],
  // Chunks/collocations AI must use in story_text narrative
  // Source: read.js bold chunks — multi-word phrases and high-value vocabulary
  chunk_focus: [
        "fell asleep",
    "kept going",
    "was proud",
    "in the end",
    "every step",
    "waved back"
  ],
  target_vocab: [
    { word: "tortoise", pronunciation: "/ˈtɔːtəs/", definition_vi: "con rùa", definition_en: "a slow-moving reptile with a hard shell that lives on land" },
    { word: "hare", pronunciation: "/hɛər/", definition_vi: "con thỏ rừng", definition_en: "a wild animal like a large rabbit with long ears and long legs that can run very fast" },
    { word: "race", pronunciation: "/reɪs/", definition_vi: "cuộc đua", definition_en: "a competition to see who can run, swim, or travel fastest" },
    { word: "boast", pronunciation: "/bəʊst/", definition_vi: "khoe khoang", definition_en: "to talk too proudly about your abilities or achievements" },
    { word: "steady", pronunciation: "/ˈstɛdi/", definition_vi: "đều đặn, ổn định", definition_en: "moving or working at a regular, unchanging pace without stopping" },
    { word: "nap", pronunciation: "/næp/", definition_vi: "giấc ngủ ngắn", definition_en: "a short sleep taken during the day, especially in the afternoon" },
    { word: "determined", pronunciation: "/dɪˈtɜːmɪnd/", definition_vi: "quyết tâm", definition_en: "having a firm decision to achieve something even when it is difficult" },
    { word: "cheer", pronunciation: "/tʃɪər/", definition_vi: "cổ vũ, reo hò", definition_en: "to shout loudly to encourage someone or celebrate their success" },
    { word: "confident", pronunciation: "/ˈkɒnfɪdənt/", definition_vi: "tự tin", definition_en: "feeling certain that you can do something well" },
    { word: "moral", pronunciation: "/ˈmɒrəl/", definition_vi: "bài học đạo đức", definition_en: "the lesson about right and wrong that you learn from a story or experience" },
    { word: "overtake", pronunciation: "/ˌəʊvəˈteɪk/", definition_vi: "vượt qua", definition_en: "to go past someone who is moving more slowly than you" },
    { word: "fable", pronunciation: "/ˈfeɪbəl/", definition_vi: "truyện ngụ ngôn", definition_en: "a short story with animal characters that teaches a moral lesson" },
    { word: "persevere", pronunciation: "/ˌpɜːsɪˈvɪər/", definition_vi: "kiên trì", definition_en: "to continue doing something difficult without giving up" },
    { word: "car", pronunciation: "/kɑːr/", definition_vi: "ô tô", definition_en: "a four-wheeled motor vehicle used to carry passengers on roads" },
    { word: "bus", pronunciation: "/bʌs/", definition_vi: "xe buýt", definition_en: "a large vehicle with many seats that carries passengers along a regular route" },
    { word: "train", pronunciation: "/treɪn/", definition_vi: "tàu hỏa", definition_en: "a line of connected carriages pulled by an engine along railway tracks" },
    { word: "boat", pronunciation: "/bəʊt/", definition_vi: "thuyền", definition_en: "a small vessel used to travel on water, such as a river or lake" },
    { word: "bicycle", pronunciation: "/ˈbaɪsɪkəl/", definition_vi: "xe đạp", definition_en: "a two-wheeled vehicle powered by pedalling with your feet" },
    { word: "taxi", pronunciation: "/ˈtæksi/", definition_vi: "xe taxi", definition_en: "a car with a professional driver that you pay to take you to a destination" },
    { word: "motorbike", pronunciation: "/ˈməʊtəbaɪk/", definition_vi: "xe máy", definition_en: "a two-wheeled motor vehicle more powerful and faster than a bicycle" },
    { word: "ship", pronunciation: "/ʃɪp/", definition_vi: "tàu biển", definition_en: "a very large boat designed to carry people or cargo across the sea" }
  ],

  nova_instructions: {
    persona: "Nova - friendly bilingual AI tutor",
    language_mix: "English-dominant with Vietnamese scaffolding",
    key_correction: "Past Simple irregular verbs: run → ran, sleep → slept, win → won, lose → lost",
    nova_recast: "Great! The hare RAN fast! Say: The hare ran very fast. What did the tortoise do?",
    grammar_guard: "Always model the correct Past Simple form. Student says 'runned'? Recast: 'The hare RAN! Say: ran.' Student says 'sleeped'? Recast: 'The hare SLEPT! Say: slept.' Celebrate correct irregular forms."
  },

  v28_format_notes: {
    response_format: "ack + recast + question (V28 ONLY - NOT V25)",
    ack_options: ["Oh!", "I see!", "Nice!", "Wow!", "Really?", "Interesting!", "That is wonderful!"],
    recast_max_words: 8,
    recast_rules: [
      "Echo the past event with correct irregular verb form",
      "Stress the irregular form: RAN, SLEPT, WON",
      "Ask about the next event in the story sequence"
    ],
    question_patterns_allowed: [
      "What did the hare do next?",
      "What happened to the tortoise?",
      "Who won the race?",
      "What is the moral?",
      "What did he do after that?"
    ],
    question_patterns_forbidden: [
      "Why do you think...?",
      "What does... mean?",
      "Do you understand?"
    ],
    example_exchanges: [
      { student: "The hare runned fast", tutor_response: "Nice! The hare RAN fast! Say: The hare ran very fast at the start. What did the hare do next?" },
      { student: "Hare sleeped under tree", tutor_response: "Wow! The hare SLEPT under a tree! Say: The hare slept under a big tree. What did the tortoise do?" },
      { student: "Tortoise win the race", tutor_response: "Great! The tortoise WON! Say: The tortoise won the race. What is the moral of this fable?" }
    ]
  },

  story_missions: [
    {
      mission_id: 1,
      id: 1,
      title: "The Tortoise and the Hare — Story",
      title_en: "The Tortoise and the Hare — Story",
      title_vi: "Rua va Tho — Cau Chuyen",
      theme: "Retelling the classic fable using Past Simple and sequence words",
      type: "story",
      image_url: "/images/week28/mission1_cover.jpg",
      nova_greeting: "Story time! Today we retell a very famous fable — The Tortoise and the Hare! This story teaches us an important lesson. Let us begin from the very start. Are you ready?",
      mission_context: "CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 1-2 hint choices if student seems stuck: Say: ___ or ___! LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. Week 28 Mission 1. Student retells the fable using Past Simple irregular verbs. GRAMMAR FOCUS: ran, slept, won, lost. VOCAB: tortoise, hare, race, boast, steady, nap, determined, cheer, confident, moral, overtake, fable, persevere.",

      story_character: {
        name: "Hare",
        personality: "fast, boastful, overconfident, and impulsive",
        backstory: "The Hare was the fastest animal in the forest. He loved to boast about his speed. One day the Tortoise challenged him to a race. The Hare laughed — but he lost because he was too confident and took a nap.",
        speaking_style: "confident and boastful at first, then embarrassed at the end",
        facts: {
          ran_very_fast: true,
          boasted_before_race: true,
          took_a_nap_during_race: true,
          woke_up_too_late: true,
          lost_the_race: true
        },
        role: "The overconfident animal who lost the race because he did not persevere"
      },

      opening_narrative: "What an amazing story! Let us retell it together — once upon a time... in a green forest, the Hare loved to boast. He ran up and down shouting: I am the fastest! Nobody can beat me! One day, the quiet Tortoise heard this. He had a challenge for the Hare. Let us start the story! What did the Hare love to do? Say: The hare loved to boast or The hare always said he was the fastest",

      story_arc: [
        {
          phase: "the_challenge",
          turns: "1-3",
          phase_name: "The Challenge — Beginning",
          focus: "Past Simple regular: boasted, challenged, laughed, agreed",
          goal: "Student describes how the race challenge happened",
          phase_questions: [
            "What did the Hare love to do in the forest? Say: The hare loved to boast about his speed or He always boasted that he was the fastest animal",
            "What did the Tortoise do when he heard this? Say: The Tortoise challenged the Hare to a race or The Tortoise said: I challenge you to a race",
            "How did the Hare react to the Tortoise's challenge? Say: The Hare laughed because the Tortoise was so slow or He thought it was funny that the Tortoise wanted to race"
          ]
        },
        {
          phase: "the_race_begins",
          turns: "4-6",
          phase_name: "The Race Begins — Middle",
          focus: "Past Simple irregular: ran, walked",
          goal: "Student describes the start of the race using irregular past verbs",
          phase_questions: [
            "The race started! What did the Hare do? Say: The hare ran very fast or He ran at full speed and disappeared quickly",
            "What did the Tortoise do? Say: The tortoise walked slowly but steadily or The tortoise moved at a slow steady pace",
            "After running far ahead, what did the confident Hare decide to do? Say: The hare decided to take a nap or He thought he had time to rest under a tree"
          ]
        },
        {
          phase: "the_nap",
          turns: "7-8",
          phase_name: "The Nap — Turning Point",
          focus: "Past Simple irregular: slept, kept walking",
          goal: "Student narrates the critical turning point",
          phase_questions: [
            "Where did the Hare sleep? Say: The hare slept under a big shady tree or He slept in the shade near the middle of the race",
            "While the Hare slept, what did the Tortoise do? Say: The tortoise kept walking slowly and steadily or He never stopped — he walked past the sleeping hare"
          ]
        },
        {
          phase: "the_finish",
          turns: "9-12",
          phase_name: "The Finish — End and Moral",
          focus: "Past Simple irregular: won, woke up, cheered",
          goal: "Student completes the story and states the moral",
          phase_questions: [
            "When the Hare finally woke up, what did he see? Say: He saw that the tortoise was near the finish line or He woke up and the tortoise was almost there",
            "Who won the race? Say: The tortoise won the race or The tortoise crossed the finish line first",
            "How did the other animals react? Say: The animals cheered for the tortoise or They were very surprised and happy",
            "What is the moral of this fable? Say: Slow and steady wins the race or The moral is that perseverance is more important than speed",
            "What lesson does this story teach us? Say: It teaches us never to give up or We should always try our best even if we are not the fastest"
          ]
        }
      ],

      minimum_turns: 8,
      maximum_turns: 12,

      story_text: "Once upon a time in a green forest, a Hare loved to boast. Every day he ran through the trees shouting: I am the fastest animal in the world! Nobody can overtake me! The other animals were tired of his boasting. One quiet morning, a Tortoise heard the Hare. Slowly, the Tortoise walked forward. 'I challenge you to a race,' he said. The Hare laughed until his ears shook. 'A race? You are so slow — this will be easy!' But the Tortoise was determined. The next day, all the forest animals came to cheer. BANG! The race began. The Hare ran at full speed — he was gone in seconds. The Tortoise walked slowly but steadily, one step at a time. The confident Hare looked back and smiled. 'The Tortoise is so far behind! I have time for a nap.' He lay down under a shady tree and slept. The Tortoise kept walking. Slow. Steady. Step by step. He walked right past the sleeping Hare! The animals began to cheer loudly. The Tortoise was nearly at the finish line! The noise woke the Hare. He jumped up and ran as fast as he could — but it was too late. The Tortoise crossed the finish line and won the race! The moral of this fable was clear: slow and steady wins the race. A determined tortoise who chooses to persevere will always beat an overconfident hare who does not.",
      story_text_vi: "Ngay xua trong khu rung xanh, mot con Tho rat hay khoe khoang. Moi ngay no chay qua cac goc cay va reo to: Toi la con vat nhanh nhat the gioi! Khong ai co the vuot qua toi! Cac con vat khac that su chan nghe no khoe. Mot buoi sang yen tinh, con Rua nghe thay. No di cham cham ve phia Tho. 'Toi thach mi cuoc dua,' no noi. Con Tho cuoi den run ca tai. 'Cuoc dua a? Mi cham nhu vay — cai nay qua de!' Nhung con Rua rat quyet tam. Ngay hom sau, tat ca cac con vat trong rung den co vu. BANG! Cuoc dua bat dau. Con Tho chay het toc do — no bien mat chi trong vai giay. Con Rua di cham ma deu, tung buoc mot. Con Tho tu tin ngoai lai va cuoi. 'Rua con xa lam! Tao co the ngu mot chut.' No nam xuong duoi bong cay mat va ngu. Con Rua tiep tuc di. Cham. Deu. Tung buoc mot. No di qua con Tho dang ngu! Cac con vat bat dau co vu om. Con Rua suyt toi dich roi! Tieng on danh thuc con Tho day. No nhay len va chay het suc — nhung da muon mat roi. Con Rua vuot qua duong dich va thang cuoc dua! Bai hoc cua truyen ngu ngon nay that ro rang: cham ma deu thi cuoi cung cung se thang. Mot con Rua quyet tam va kien tri se luon thang mot con Tho qua tu tin.",
      discussion_prompts: [
        {
          id: 1,
          question_en: "Retell the beginning of the story using Past Simple. What did the Hare do and say?",
          prompt_vi: "Ke lai phan dau cua truyen dung Qua Khu Don. Con Tho da lam gi va noi gi?",
          grammar_hint: "The hare ran through the forest and boasted... He said... The tortoise challenged him...",
          example_answer: "Every day, the Hare ran through the forest and boasted about his speed. He said he was the fastest animal in the world. The Tortoise heard this and challenged him to a race. The Hare laughed because he thought the Tortoise was too slow to win."
        },
        {
          id: 2,
          question_en: "What happened in the middle of the race? Use the irregular verbs: ran, slept, kept walking.",
          prompt_vi: "Dieu gi xay ra o giua cuoc dua? Dung cac dong tu bat quy tac: ran, slept, kept walking.",
          grammar_hint: "The hare ran fast and then... He slept under... Meanwhile, the tortoise kept walking...",
          example_answer: "At the start, the Hare ran very fast and got far ahead. He was so confident that he stopped and slept under a big tree. Meanwhile, the Tortoise never stopped — he kept walking slowly and steadily. While the Hare slept, the Tortoise walked right past him."
        },
        {
          id: 3,
          question_en: "How did the race end? Who won and what is the moral? Use: won, woke up, cheered.",
          prompt_vi: "Cuoc dua ket thuc nhu the nao? Ai thang va bai hoc do duc la gi? Dung: won, woke up, cheered.",
          grammar_hint: "The tortoise crossed the finish line and won... The hare woke up too late... The animals cheered...",
          example_answer: "The animals cheered loudly when the Tortoise reached the finish line. The Hare finally woke up and ran as fast as he could, but it was too late. The Tortoise crossed the finish line and won the race. The moral of this fable is: slow and steady wins the race — perseverance is more powerful than speed."
        }
      ]
    },
    {
      mission_id: 2,
      id: 2,
      title: "Ben Retells the Fable — Practice",
      title_en: "Ben Retells the Fable — Practice",
      title_vi: "Ben Ke Lai Truyen — Luyen Tap",
      theme: "Ben practises retelling the fable to his class using Past Simple irregular verbs",
      type: "practice",
      image_url: "/images/week28/mission2_cover.jpg",
      nova_greeting: "Practice time! Ben is your classmate. He wants to retell the Tortoise and the Hare story to the class but he keeps making mistakes with the irregular verbs. Let us help him!",
      mission_context: "CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 1-2 hint choices if student seems stuck: Say: ___ or ___! LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. Week 28 Mission 2. Student practises Past Simple irregular verbs through Ben's fable retelling. GRAMMAR FOCUS: ran, slept, won, lost, woke up, kept. VOCAB: tortoise, hare, race, boast, steady, nap, determined, cheer.",

      story_character: {
        name: "Ben",
        personality: "enthusiastic but sometimes confused about irregular past verbs",
        backstory: "Ben loves the Tortoise and the Hare story. He wants to retell it for class but sometimes says 'runned' instead of 'ran' and 'sleeped' instead of 'slept'. He needs help getting the irregular verbs right.",
        speaking_style: "enthusiastic but makes irregular verb errors that need gentle correction",
        facts: {
          loves_the_fable: true,
          struggles_with_ran: true,
          struggles_with_slept: true,
          knows_the_moral: true,
          getting_better_with_practice: true
        },
        role: "Student who practises retelling the fable with correct irregular past verbs"
      },

      opening_narrative: "Let us help Ben retell the story! Ben starts: In the forest, there lived a hare. One day he... What did the hare do? Remind Ben to use the PAST form! Say: The hare ran through the forest or He boasted about his speed every day",

      story_arc: [
        {
          phase: "beginning_retell",
          turns: "1-3",
          phase_name: "Beginning — Setting the Scene",
          focus: "Past Simple: boasted, challenged, laughed",
          goal: "Student helps Ben retell the beginning with correct past forms",
          phase_questions: [
            "Ben says: The hare runned everywhere. What is the correct form? Say: The hare RAN everywhere or No, the correct past tense of run is ran — the hare ran everywhere",
            "How did the Hare feel about the challenge? Say: The hare laughed at the tortoise or He was very confident and said: this will be easy",
            "Why did the Tortoise accept the race? Say: The tortoise was determined to prove himself or He accepted because he knew slow and steady wins"
          ]
        },
        {
          phase: "nap_middle",
          turns: "4-7",
          phase_name: "Middle — The Nap",
          focus: "Past Simple irregular: slept, kept walking, walked past",
          goal: "Student corrects and uses the irregular past forms",
          phase_questions: [
            "Ben says: The hare sleeped under a tree. Help him! Say: The hare SLEPT under a tree or The correct past of sleep is slept — he slept",
            "What did the Tortoise do while the Hare slept? Say: The tortoise kept walking slowly and steadily or He never stopped — he walked right past the sleeping hare",
            "Ben asks: Was the Hare confident? Help him answer. Say: Yes, the Hare was too confident — he thought he could win easily or He was overconfident so he decided to nap",
            "Ben wonders: Did the Tortoise feel like stopping? Help answer. Say: No, the tortoise was determined to persevere or He never gave up even though the hare ran much faster"
          ]
        },
        {
          phase: "end_retell",
          turns: "8-10",
          phase_name: "End — Who Won?",
          focus: "Past Simple irregular: woke up, ran, won, cheered",
          goal: "Student retells the ending using correct irregular past forms",
          phase_questions: [
            "Ben says: The tortoise winned! Correct him! Say: The tortoise WON — win changes to won or No, it is not winned — won is the past tense",
            "What did the animals do when the Tortoise won? Say: The animals cheered loudly for the tortoise or They were all amazed when the tortoise crossed the finish line first",
            "Ben wants to say the moral. Help him say it. Say: Slow and steady wins the race or The moral is: never give up and always persevere"
          ]
        }
      ],

      minimum_turns: 10,
      maximum_turns: 12,

      story_text: "Ben stood up in class. 'I will retell the Tortoise and the Hare story!' he said. 'Once upon a time, the Hare runned — I mean RAN — everywhere in the forest. He always boasted: I am the fastest! One day the Tortoise challenged him. The Hare laughed. They started the race. The Hare ran — yes, RAN — very fast! But then he stopped for a nap. He sleeped — no wait, he SLEPT — under a big tree. Meanwhile, the Tortoise walked. Slow and steady. He never gave up. He kept going. The Hare woke up and ran again — but it was too late! The Tortoise won — W - O - N — won! The animals all cheered!' Ben grinned. 'The moral? Slow and steady wins the race. Perseverance beats speed every time!' His teacher smiled: 'Well done, Ben! You used the irregular verbs correctly this time — ran, slept, won!'",
      story_text_vi: "Ben dung len trong lop. 'Toi se ke lai cau chuyen Rua va Tho!' cau noi. 'Ngay xua, con Tho chay — ran — khap rung. No luc nao cung khoe khoang: Toi la nhanh nhat! Mot ngay con Rua thach no. Con Tho chi cuoi. Ho bat dau cuoc dua. Con Tho chay — ran — rat nhanh! Nhung sau do no dung lai de ngu. No ngu — slept — duoi goc cay lon. Trong khi do, con Rua di. Cham va deu. No khong bao gio bo cuoc. No tiep tuc di. Con Tho thuc day va chay lai — nhung da muon mat roi! Con Rua da thang — won! Cac con vat deu co vu!' Ben mim cuoi. 'Bai hoc? Cham ma deu thi cuoi cung cung thang. Kien tri danh bai toc do moi khi!' Thay giao mim cuoi: 'Lam tot lam, Ben! Em da dung dung cac dong tu bat quy tac lan nay — ran, slept, won!'",
      discussion_prompts: [
        {
          id: 1,
          question_en: "Help Ben correct these sentences. Change the underlined words to correct Past Simple: The hare (run) very fast. He (sleep) under a tree. The tortoise (win).",
          prompt_vi: "Giup Ben sua cac cau nay. Doi cac tu gach chan sang Qua Khu Don dung: The hare (run) very fast. He (sleep) under a tree. The tortoise (win).",
          grammar_hint: "run → ran | sleep → slept | win → won",
          example_answer: "The hare ran very fast. He slept under a tree. The tortoise won. These are all irregular verbs — they do not follow the normal -ed rule. We must memorise: run → ran, sleep → slept, win → won."
        },
        {
          id: 2,
          question_en: "Retell the MIDDLE part of the story in 3-4 sentences. Use: ran, slept, kept walking.",
          prompt_vi: "Ke lai phan GIUA cua truyen trong 3-4 cau. Dung: ran, slept, kept walking.",
          grammar_hint: "First, the hare ran... Then he slept... Meanwhile, the tortoise kept walking...",
          example_answer: "First, the Hare ran very fast and got far ahead of the Tortoise. He felt so confident that he stopped to rest. He slept under a tree in the shade. Meanwhile, the Tortoise kept walking slowly and steadily — he never stopped, not even for one moment."
        },
        {
          id: 3,
          question_en: "What irregular verbs did Ben use in his retelling? List them and give their base forms.",
          prompt_vi: "Ben da dung nhung dong tu bat quy tac nao trong bai ke chuyen? Liet ke chung va dang nguyen mau.",
          grammar_hint: "ran — base: run | slept — base: sleep | won — base: win",
          example_answer: "Ben used three irregular verbs: ran (base form: run), slept (base form: sleep), and won (base form: win). These are all irregular because they do not add -ed to make the past — they change their spelling completely. This is why we need to memorise them."
        }
      ]
    },
    {
      mission_id: 3,
      id: 3,
      title: "My Race Story — Free Talk",
      title_en: "My Race Story — Free Talk",
      title_vi: "Cau Chuyen Cuoc Dua Cua Toi — Noi Chuyen Tu Do",
      theme: "Student tells a real or imagined race story using Past Simple",
      type: "free_talk",
      image_url: "/images/week28/mission3_cover.jpg",
      nova_greeting: "Free Talk! Now YOU tell a race story! Think about a time you had to finish something difficult — a race, a test, a project. Use Past Simple: I ran, I tried, I won! Tell me your story!",
      mission_context: "CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 1-2 hint choices if student seems stuck: Say: ___ or ___! LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. Week 28 Mission 3. Student free-talks about a personal race or competition story using Past Simple irregular verbs. GRAMMAR FOCUS: ran, won, lost, kept going. VOCAB: race, determined, cheer, steady, persevere, moral.",

      story_character: {
        name: "Student (You!)",
        personality: "brave storyteller who shares a personal experience with a race or challenge",
        backstory: "The student thinks of a real or imagined experience — a sports race, a game, a class challenge, a project — where they had to keep going even when it was hard. They retell it using Past Simple.",
        speaking_style: "personal and engaging, uses past tense naturally, applies the lesson of the fable",
        facts: {
          is_first_person: true,
          real_or_imagined_race: true,
          uses_past_simple: true,
          applies_moral: true
        },
        role: "Young storyteller sharing a personal race or competition story"
      },

      opening_narrative: "Your turn to be the storyteller! Think of a time you had to try really hard to finish something. Maybe a race at school, a swimming competition, a game, or even finishing a big homework project. Tell me about it! What did you do? Say: I ran in a race or I competed in or I tried really hard to finish",

      story_arc: [
        {
          phase: "what_happened",
          turns: "1-3",
          phase_name: "What Was the Challenge?",
          focus: "Past Simple set-up: was, had, started, decided",
          goal: "Student introduces their race or challenge using Past Simple",
          phase_questions: [
            "What was your race or challenge? Say: I ran in a race at school or I competed in a swimming race or I had a big homework project to finish",
            "When did this happen? Say: It happened last year or This was in sports day at my school or It was a long time ago",
            "How did you feel at the start? Say: I felt nervous at the start or I was excited and a little scared or I was determined to do my best"
          ]
        },
        {
          phase: "the_middle",
          turns: "4-6",
          phase_name: "The Hard Part — Middle",
          focus: "Past Simple: ran, tried, kept going, wanted to stop",
          goal: "Student describes the difficult moments using Past Simple",
          phase_questions: [
            "What happened in the middle? Say: I ran as fast as I could or It got really hard and I wanted to stop or I fell behind but kept going",
            "Did you want to give up? Say: I wanted to stop but I remembered the tortoise or I felt like giving up but I kept going",
            "What did you tell yourself? Say: I told myself: never give up or I thought about the tortoise and stayed determined"
          ]
        },
        {
          phase: "the_result",
          turns: "7-9",
          phase_name: "The Result and Lesson",
          focus: "Past Simple: won, lost, finished, learned",
          goal: "Student tells the result and connects it to the fable's moral",
          phase_questions: [
            "What was the result? Say: I won first place or I did not win but I finished or I came second and I was proud",
            "How did you feel when it was over? Say: I felt so proud when I finished or I was exhausted but happy that I did not give up",
            "What lesson did YOU learn, like the tortoise? Say: I learned that slow and steady wins or I learned to never give up even when it gets hard",
            "If you were the Hare in real life — what would you do differently? Say: I would not stop and rest — I would keep going or I would not boast — I would focus on finishing"
          ]
        }
      ],

      minimum_turns: 12,
      maximum_turns: 12,

      story_text: "Now it is your turn to be the storyteller! Think about a time when you had a challenge — it could be a real race at school, a swimming competition, a maths test, finishing a book report, or even a video game level that was very hard to beat. Use the lesson from the Tortoise and the Hare to tell your story. Use Past Simple to retell what happened: I ran... I tried... I felt... I kept going... I won / I lost / I finished... Tell me about a time when you were like the determined Tortoise! Or even a time when you were a little bit like the overconfident Hare. What happened? What did you learn? Apply the moral: slow and steady wins the race — perseverance is the real winner.",
      story_text_vi: "Bay gio la luot ban ke chuyen! Hay nghi ve mot lan you co mot thu thach — co the la mot cuoc dua o truong, mot cuoc thi boi loi, mot bai kiem tra toan, hoan thanh mot bai bao cao, hoac tham chi mot cot moc game kho vuot. Dung bai hoc tu cau chuyen Rua va Tho de ke lai. Dung Qua Khu Don de ke lai nhung gi da xay ra: I ran... I tried... I felt... I kept going... I won / I lost / I finished... Ke cho toi nghe ve mot lan ban nhu con Rua quyet tam! Hoac tham chi mot lan ban hoi giong con Tho qua tu tin. Dieu gi da xay ra? Ban da hoc duoc gi? Ap dung bai hoc: cham ma deu thi cuoi cung cung thang — kien tri moi la nguoi chien thang that su.",
      discussion_prompts: [
        {
          id: 1,
          question_en: "Describe the start of your race or challenge. Use Past Simple. How did you feel?",
          prompt_vi: "Mo ta phan dau cua cuoc dua hoac thu thach cua ban. Dung Qua Khu Don. Ban cam thay the nao?",
          grammar_hint: "I had a race... I felt nervous / excited... I was determined... It started when...",
          example_answer: "I had a swimming race at my school's sports day. I felt very nervous at the start because everyone was watching. I was determined to do my best. It started with a whistle and all the swimmers jumped in at the same time."
        },
        {
          id: 2,
          question_en: "What was the hardest part? Did you want to give up? Use: ran, tried, kept going.",
          prompt_vi: "Phan kho nhat la gi? Ban co muon bo cuoc khong? Dung: ran, tried, kept going.",
          grammar_hint: "The hardest part was when... I tried my best but... I kept going because...",
          example_answer: "The hardest part was when I was halfway through and my arms were very tired. I thought about stopping. But I tried my best and kept going. I thought about the Tortoise — slow and steady! I did not stop. I just kept moving forward, one stroke at a time."
        },
        {
          id: 3,
          question_en: "How did your story end? What did you learn from it, like the tortoise?",
          prompt_vi: "Cau chuyen cua ban ket thuc nhu the nao? Ban da hoc duoc gi tu no, nhu con rua?",
          grammar_hint: "In the end, I... I felt proud / disappointed... I learned that... Like the tortoise, I...",
          example_answer: "In the end, I did not win first place — I came third. But I felt very proud because I did not give up. I learned that finishing is more important than winning. Like the tortoise, I showed that determination and perseverance matter more than being the fastest."
        }
      ]
    }
  ],

  // 💬 SPARK TALK: AI-driven personal expression, bridged from the week's story
  spark_talk: [
    {
      id: 'spark_tortoise_or_hare',
      emoji: '🐢',
      title: 'Tortoise or Hare?',
      bridge: 'The hare ran fast but gave up — the tortoise was slow but never stopped. Slow wins! 🏅',
      seed_question: 'Are YOU more like the tortoise or the hare in real life? Tell me why!',
      frames: [
        { template: 'I went to ___', follow_up_q: 'Where did you go? To the park or the race?', hints: ['the park', 'the race', 'school'] },
        { template: 'I ran ___', follow_up_q: 'How did you run? Fast or slowly?', hints: ['fast', 'slowly', 'as fast as I could'] },
        { template: 'I won ___', follow_up_q: 'What did you win? A race or a game?', hints: ['a race', 'a game', 'first place'] },
        { template: 'I ran and I won', follow_up_q: 'Did you run and win? What was the race?', hints: ['I ran in a school race and I won', 'I ran with my friend and I won', 'I ran every day and I won'] },
        { template: 'I went ___ and had a great time', follow_up_q: 'Where did you go and what did you see?', hints: ['to the zoo', 'to the park', 'to school'] },
        { template: 'I am more like the ___', follow_up_q: 'Are you more like the tortoise or the hare?', hints: ['tortoise because I am careful', 'hare because I am fast', 'tortoise because I never give up'] },
        { template: 'I went, I ran, and I ___', follow_up_q: 'What happened after you went and ran?', hints: ['won', 'felt proud', 'had fun'] },
        { template: 'My favourite story is about ___', follow_up_q: 'Who do you like more? The tortoise or the hare?', hints: ['the tortoise because it never gave up', 'the hare because it ran fast', 'any animal that never gives up'] }
      ],
      scaffold_frames: ['I am more like the ___', 'I am ___ at ___', 'I think slow/fast is better because ___'],
      vocab_focus: ['slow', 'fast', 'patient', 'determined', 'win'],
      turns: 8,
    },
    {
      id: 'spark_my_life_lesson',
      emoji: '🌟',
      title: 'My Best Life Lesson',
      bridge: 'Every fable teaches a lesson. This one said: never give up, no matter how slow you are! 💪',
      seed_question: 'What is your big life lesson? Is it never give up or always be kind?',
      frames: [
        { template: 'I went through ___', follow_up_q: 'What challenge did you go through? A hard time or a difficult test?', hints: ['a hard time', 'a difficult test', 'a big challenge'] },
        { template: 'I ran away from ___', follow_up_q: 'What did you run away from? A problem or a fear?', hints: ['a hard problem', 'a scary moment', 'something difficult'] },
        { template: 'I won because I ___', follow_up_q: 'Why did you win? Because you tried hard or never gave up?', hints: ['tried hard', 'never gave up', 'practised every day'] },
        { template: 'My life lesson is ___', follow_up_q: 'What is your life lesson? Never give up or always be kind?', hints: ['never give up', 'always be kind', 'work hard every day'] },
        { template: 'I went to ___ to learn new things', follow_up_q: 'Where did you go to find your lesson?', hints: ['school', 'the playground', 'life'] },
        { template: 'I won when I ___', follow_up_q: 'When did you win? When you stopped giving up?', hints: ['stopped giving up', 'kept trying', 'believed in myself'] },
        { template: 'I ran the race of ___', follow_up_q: 'What is the race of life about? Learning or growing?', hints: ['learning', 'growing every day', 'becoming better'] },
        { template: 'Like the tortoise, I ___', follow_up_q: 'How are you like the tortoise? Do you go slowly but surely?', hints: ['go slowly but surely', 'never give up', 'keep moving forward'] }
      ],
      scaffold_frames: ['I learned that ___', 'One time ___', 'Now I know ___'],
      vocab_focus: ['lesson', 'learned', 'mistake', 'try again', 'important'],
      turns: 8,
    },
  ],

  conversation_cards: [
    {
      id: "irregular_verbs_race",
      title: "Irregular Verbs: Race Story",
      emoji: "🏁",
      theme: "Practising Past Simple irregular verbs through the race story",
      difficulty: "easy",
      exchanges: [
        { ai: "Irregular verb challenge! The hare ___ (run) very fast. What is the past form? Say: The hare ran very fast or Ran is the past of run", options: ["The hare ran very fast", "Ran is the past tense of run"] },
        { ai: "Good! The hare ___ (sleep) under a tree. Past form? Say: The hare slept under a tree or Slept is the past of sleep", options: ["The hare slept under a tree", "Slept is the past tense of sleep"] },
        { ai: "Great! The tortoise ___ (win) the race. Past form? Say: The tortoise won the race or Won is the past of win", options: ["The tortoise won the race", "Won is the past tense of win"] },
        { ai: "Perfect! Now: The tortoise ___ (lose)? Or did the hare? Say: The hare lost the race or Lost is the past of lose", options: ["The hare lost the race", "Lost is the past tense of lose"] },
        { ai: "Amazing! Say the three irregular verbs together. Say: run ran, sleep slept, win won", options: ["Run ran, sleep slept, win won", "Ran, slept, won — all irregular past verbs!"] }
      ],
      completion_message: "Irregular verbs mastered! You know: ran, slept, won!"
    },
    {
      id: "fable_sequence",
      title: "Sequence the Fable",
      emoji: "📖",
      theme: "Retelling the fable in correct sequence",
      difficulty: "easy",
      exchanges: [
        { ai: "Story sequence! First — what happened at the beginning? Say: First, the hare boasted about his speed or First, the hare said he was the fastest", options: ["First, the hare boasted about his speed", "First, the hare said he was the fastest animal"] },
        { ai: "Then — what did the Tortoise do? Say: Then the tortoise challenged the hare to a race or Then the tortoise said: I challenge you!", options: ["Then the tortoise challenged the hare to a race", "Then the tortoise said he wanted to race"] },
        { ai: "After that — what did the Hare do during the race? Say: After that, the hare slept under a tree or After that, the hare stopped to take a nap", options: ["After that, the hare slept under a tree", "After that, the hare stopped and took a nap"] },
        { ai: "Finally — who won? Say: Finally, the tortoise crossed the finish line and won or Finally, the tortoise won because he never gave up", options: ["Finally, the tortoise crossed the finish line and won", "Finally, the tortoise won — he never gave up!"] },
        { ai: "Now say the moral! Say: Slow and steady wins the race or The moral is: never give up and persevere", options: ["Slow and steady wins the race!", "Never give up — perseverance wins!"] }
      ],
      completion_message: "Fable sequence complete! You can retell the whole story!"
    },
    {
      id: "who_did_what",
      title: "Who Did What? Hare vs Tortoise",
      emoji: "🐢",
      theme: "Comparing actions of the two characters using Past Simple",
      difficulty: "medium",
      exchanges: [
        { ai: "Character challenge! Who RAN very fast at the start? Say: The hare ran very fast or The hare was the one who ran at full speed", options: ["The hare ran very fast at the start", "The hare sprinted at full speed"] },
        { ai: "Who SLEPT during the race? Say: The hare slept under a tree or The hare stopped and slept in the shade", options: ["The hare slept under a big tree", "The hare stopped and slept during the race"] },
        { ai: "Who KEPT WALKING without stopping? Say: The tortoise kept walking steadily or The tortoise never stopped — he walked all the way", options: ["The tortoise kept walking steadily", "The tortoise never stopped walking"] },
        { ai: "Who WON the race? Say: The tortoise won the race or The slow but determined tortoise won", options: ["The tortoise won the race!", "The slow but determined tortoise won!"] },
        { ai: "Now YOU decide: who was smarter — the Hare or the Tortoise? Say why in Past Simple! Say: The tortoise was smarter because he never gave up or The hare was faster but the tortoise was wiser", options: ["The tortoise was smarter because he never gave up", "The tortoise was wiser even though the hare was faster"] }
      ],
      completion_message: "Character comparison complete! You used Past Simple perfectly!"
    }
  ],

  metadata: {
    week: 28,
    phase: 1,
    cefr_level: "A2",
    grammar_guard: {
      target_tense: "Past Simple with irregular verbs: ran, slept, won, lost",
      forbidden_structures: ["runned, sleeped, winned, losed", "present tense for past events"],
      focus_verbs: ["ran", "slept", "won", "lost", "kept", "woke", "cheered", "walked", "laughed", "boasted"]
    }
  },
  freetalk_knowledge: {
    week_title: "The Tortoise and the Hare",
    week_number: 28,
    theme: "Retelling the fable using Past Simple irregular verbs",

    knowledge_base: [
    "IMPORTANT — Always respond with empathy and understanding. Acknowledge student feelings before correcting. If a student shares something negative, say you are sorry or that sounds difficult.",
      "Irregular verbs in the fable: ran (run), slept (sleep), won (win), lost (lose), came (come), began (begin)",
      "Grammar: Past Simple with Irregular Verbs — no -ed ending, unique forms",
      "Pattern: The hare ran fast. The tortoise walked slowly. The hare slept. The tortoise won the race.",
      "Fable vocabulary: tortoise, hare, race, slowly, quickly, boastful, patient, perseverance, finish line",
      "The moral of the story: Slow and steady wins the race.",
      "Character contrast: hare = fast but lazy/boastful | tortoise = slow but patient and determined",
      "Sequence in the fable: First ran → got tired → slept → meanwhile tortoise kept walking → tortoise won",
      "Life lesson: Perseverance and patience are more important than natural speed or talent",
      "Cambridge transport vocabulary: car (ô tô), bus (xe buýt), train (tàu hỏa), boat (thuyền), bicycle (xe đạp), taxi (xe taxi), motorbike (xe máy), ship (tàu biển)"
    ],

    example_opening_questions: [
      "Do you know the story of the Tortoise and the Hare?",
      "Who do you think was smarter — the tortoise or the hare? Why?",
      "Can you retell the fable? What happened first?",
      "Have you ever worked slowly but finished something important?",
      "What is the lesson of the story? Do you agree?",
      "Which animal would you rather be — a fast hare or a slow tortoise?"
    ],

    // FREE TALK 2.0: Starter prompts
    starter_prompts: [
      { text_en: "I want to play games! 🎮", text_vi: "Tôi muốn chơi game!", type: "game" },
      { text_en: "Translate this for me... 📖", text_vi: "Dịch giúp con câu/chữ này...", type: "help" },
      { text_en: "I have a question! ❓", text_vi: "Con có câu hỏi!", type: "ask" }
    ]
  },
};

export default week28RealData;
