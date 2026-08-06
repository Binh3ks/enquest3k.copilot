const week24RealData = {
  week_id: 24,
  week_number: 24,
  title: "Feelings in the Past",
  weekTitle_en: "Feelings in the Past",
  weekTitle_vi: "Cam Xuc Trong Qua Khu",
  topic: "Describing past feelings using Was/Were + Adjective",
  topic_vi: "Mieu ta cam xuc trong qua khu dung Was/Were + Tinh tu",

  chunk_focus: [
    "emotional day",
    "her friends",
    "In the morning",
    "felt very worried",
    "Her brother",
    "looked angry",
    "because someone took",
    "stayed calm",
    "felt relieved",
    "homework inside",
    "school bag",
    "At school",
    "excited because",
    "there was",
    "special visitor"
  ],
  theme: "Emotions, feelings, was/were + adjective, scared, excited, tired, relieved, cheerful",

  grammar_focus: "Was / Were + Adjective (Past Simple)",
  grammar_pattern: "Subject + was/were + adjective. Example: I was scared because it was dark.",
  grammar_examples: [
    "I was scared when the lights went out.",
    "She was excited about the surprise visitor.",
    "They were all surprised when the author arrived.",
    "Leo was upset because no one found his pencil.",
    "By the end of the day, Mia was tired but cheerful."
  ],

  target_vocab: [
    { word: "scared", pronunciation: "/skɛəd/", definition_vi: "sợ hãi", definition_en: "feeling frightened or afraid of something" },
    { word: "tired", pronunciation: "/taɪəd/", definition_vi: "mệt mỏi", definition_en: "feeling a need to rest or sleep because of effort" },
    { word: "hungry", pronunciation: "/ˈhʌŋɡri/", definition_vi: "đói", definition_en: "feeling the need to eat because the stomach is empty" },
    { word: "thirsty", pronunciation: "/ˈθɜːsti/", definition_vi: "khát nước", definition_en: "needing to drink because the body lacks water" },
    { word: "excited", pronunciation: "/ɪkˈsaɪtɪd/", definition_vi: "phấn khởi", definition_en: "feeling very happy and enthusiastic about something" },
    { word: "bored", pronunciation: "/bɔːd/", definition_vi: "chán nản", definition_en: "feeling uninterested because there is nothing fun to do" },
    { word: "surprised", pronunciation: "/səˈpraɪzd/", definition_vi: "ngạc nhiên", definition_en: "feeling sudden wonder because something unexpected happened" },
    { word: "worried", pronunciation: "/ˈwʌrid/", definition_vi: "lo lắng", definition_en: "feeling anxious or troubled about something that might go wrong" },
    { word: "angry", pronunciation: "/ˈæŋɡri/", definition_vi: "tức giận", definition_en: "feeling strong displeasure because of something unfair" },
    { word: "calm", pronunciation: "/kɑːm/", definition_vi: "bình tĩnh", definition_en: "feeling peaceful and relaxed, not upset or anxious" },
    { word: "cheerful", pronunciation: "/ˈtʃɪəfəl/", definition_vi: "vui vẻ", definition_en: "noticeably happy and optimistic in the way you behave" },
    { word: "upset", pronunciation: "/ʌpˈsɛt/", definition_vi: "buồn phiền", definition_en: "feeling unhappy or disappointed because of something bad that happened" },
    { word: "relieved", pronunciation: "/rɪˈliːvd/", definition_vi: "nhẹ nhõm", definition_en: "feeling glad that a worry or difficult situation is over" }
  ],

  nova_instructions: {
    persona: "Nova - friendly bilingual AI tutor",
    language_mix: "English-dominant with Vietnamese scaffolding",
    key_correction: "was/were agreement and adjective placement",
    nova_recast: "Yes! Mia WAS excited! Say: She was excited about the visitor. How did the class feel?",
    grammar_guard: "Always correct was/were confusion. They was → They WERE. She were → She WAS."
  },

  v28_format_notes: {
    response_format: "ack + recast + question (V28 ONLY - NOT V25)",
    ack_options: ["Oh!", "I see!", "Nice!", "Wow!", "Really?", "Interesting!"],
    recast_max_words: 8,
    recast_rules: [
      "Mirror the student adjective back with correct was/were",
      "Fix grammar naturally without explanation",
      "Keep it creative and encouraging"
    ],
    question_patterns_allowed: [
      "How did you feel?",
      "Were you scared?",
      "What made you excited?",
      "Was Mia worried?",
      "How did the class feel?"
    ],
    question_patterns_forbidden: [
      "Why do you think...?",
      "What does... mean?",
      "Do you understand?"
    ],
    example_exchanges: [
      { student: "Mia was scare", tutor_response: "Nice! Mia WAS SCARED! Say: Mia was scared. What happened next?" },
      { student: "They was excited", tutor_response: "Wow! They WERE excited! Say: They were excited. Why were they excited?" },
      { student: "I feel tired", tutor_response: "Great! You WERE tired! Say: I was tired. When were you tired?" }
    ]
  },

  story_missions: [
    {
      mission_id: 1,
      id: 1,
      title: "Mia Emotional Monday - Story",
      title_en: "Mia Emotional Monday - Story",
      title_vi: "Thu Hai Nhieu Cam Xuc Cua Mia",
      theme: "Following Mia through her emotional Monday at school",
      nova_greeting: "Feelings class is open! I have Mia's emotional Monday story! Let us find out how she felt!",
      mission_context: "CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 1-2 hint choices if student seems stuck: Say: ___ or ___! LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. Week 24 Mission 1. Student practices was/were + adjective by answering questions about Mia's day. GRAMMAR FOCUS: was/were + adjective. VOCAB: scared, worried, excited, surprised, relieved, cheerful, tired.",

      story_character: {
        name: "Mia",
        personality: "curious, expressive, shares feelings openly",
        backstory: "Mia had a big emotional day on Monday — she was worried in the morning, excited at school, and relieved by the end!",
        speaking_style: "honest and expressive, uses was/were + adjective patterns naturally",
        facts: {
          was_worried_morning: true,
          was_excited_at_school: true,
          was_relieved_at_end: true,
          favorite_phrase: "I was so excited!"
        },
        role: "Student who experienced many emotions on one Monday"
      },

      opening_narrative: "Feelings class starts now! Monday was a big day for Mia! First question — how did Mia feel in the morning? Say: Mia was worried or She was nervous about her homework",

      story_arc: [
        {
          phase: "morning_worry",
          turns: "1-4",
          phase_name: "Worried Morning",
          focus: "worried, scared, calm, angry",
          goal: "Student follows Mia's worried morning at home",
          phase_questions: [
            "Morning time! Was Mia worried when she could not find her homework? Say: Yes Mia was worried or She was scared about her missing homework",
            "Homework missing! Was Leo angry at breakfast because someone took his pencil? Say: Yes Leo was angry or He was upset about his pencil",
            "Leo is upset! Was Mum calm when she helped them look for things? Say: Yes Mum was calm or She was not worried — she helped them look",
            "Mum helps! Was Mia relieved when she finally found her homework? Say: Yes Mia was relieved or She was so happy when she found it"
          ]
        },
        {
          phase: "school_excitement",
          turns: "5-8",
          phase_name: "Excited at School",
          focus: "excited, surprised, bored, cheerful",
          goal: "Student discovers Mia's exciting moments at school",
          phase_questions: [
            "School time! Was the class excited when they heard about a special visitor? Say: Yes the class was excited or They were all excited about the visitor",
            "Visitor coming! Was Mia surprised when the visitor was a real author? Say: Yes Mia was surprised or She was shocked to see a real author",
            "Author visit! Was everyone cheerful during the author's talk? Say: Yes everyone was cheerful or They were all smiling and happy",
            "Happy class! Was anyone in the class bored during the author visit? Say: No no one was bored or Everyone was interested — no one was bored"
          ]
        },
        {
          phase: "afternoon_relief",
          turns: "9-12",
          phase_name: "Tired but Cheerful Ending",
          focus: "tired, thirsty, hungry, relieved, cheerful",
          goal: "Student follows Mia through the end of her emotional day",
          phase_questions: [
            "After school! Was Mia hungry when she got home after the long day? Say: Yes Mia was hungry or She was thirsty and hungry after school",
            "Time to rest! Was she tired after such a big emotional day? Say: Yes she was tired or She was really tired but happy",
            "Almost done! Was Mia still worried at the end of the day? Say: No she was not worried anymore or She was relieved and calm by evening",
            "Day complete! Was Mia cheerful when she told her family about the author? Say: Yes Mia was cheerful or She was so excited to tell her family everything!"
          ]
        }
      ],

      minimum_turns: 8,
      maximum_turns: 10
    },

    {
      mission_id: 2,
      id: 2,
      title: "My Emotional Day - Personal Story",
      title_en: "My Emotional Day - Personal Story",
      title_vi: "Ngay Nhieu Cam Xuc Cua Toi",
      theme: "Student shares their own past emotional experiences",
      nova_greeting: "Now let us talk about YOUR feelings! Can you tell me about a time you were excited or scared?",
      mission_context: "CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 1-2 hint choices if student seems stuck: Say: ___ or ___! LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. Week 24 Mission 2. Student practices was/were + adjective by talking about their own emotional experiences.",

      story_character: {
        name: "Student (You!)",
        personality: "brave storyteller, shares honest feelings",
        backstory: "The student experienced many feelings this week — now it is time to share them with Nova!",
        speaking_style: "personal, uses I was/we were + adjective, past tense throughout",
        facts: {
          is_first_person: true,
          uses_I_was: true,
          uses_we_were: true,
          favorite_phrase: "I was excited because..."
        },
        role: "Main storyteller sharing their own emotional week"
      },

      opening_narrative: "Your feelings story starts now! Think about this week. Were you excited about anything? Were you worried about something? Let us find out! Say: I was excited about... or I was worried about...",

      story_arc: [
        {
          phase: "scary_moments",
          turns: "1-4",
          phase_name: "Scared and Worried",
          focus: "scared, worried, upset",
          goal: "Student talks about a time they felt scared or worried",
          phase_questions: [
            "Brave storyteller! Were you ever scared of something this week? Say: Yes I was scared of... or I was a little scared when...",
            "Scary moment! Were you worried before a test or presentation at school this week? Say: Yes I was worried about... or I was nervous but I tried",
            "Almost there! Were you or a friend upset about anything at school? Say: I was upset because... or My friend was upset when...",
            "Feeling better! Were you still scared at the end of that scary moment? Say: No I was not scared anymore or I was relieved after it was over"
          ]
        },
        {
          phase: "exciting_moments",
          turns: "5-8",
          phase_name: "Excited and Surprised",
          focus: "excited, surprised, cheerful, happy",
          goal: "Student shares exciting and surprising moments",
          phase_questions: [
            "Exciting news! Were you excited about anything that happened this week? Say: Yes I was excited because... or I was really excited when...",
            "Big surprise! Were you surprised by anything at school or at home this week? Say: Yes I was surprised when... or We were all surprised by...",
            "Happy day! Were you and your friends cheerful together this week? Say: Yes we were cheerful because... or We were all happy when...",
            "Wonderful! Were your parents excited about your news this week? Say: Yes my parents were excited or They were happy when I told them"
          ]
        },
        {
          phase: "end_of_day_feelings",
          turns: "9-12",
          phase_name: "Tired but Relieved",
          focus: "tired, hungry, thirsty, calm, relieved",
          goal: "Student reflects on how they felt at the end of the day",
          phase_questions: [
            "End of day! Were you tired after school yesterday? Say: Yes I was tired after school or I was really tired and hungry",
            "Hungry and thirsty! Were you very hungry or thirsty when you got home? Say: Yes I was hungry and thirsty or I was so thirsty after the school day",
            "Rest time! Were you calm when you relaxed at home in the evening? Say: Yes I was calm when I rested or I was relaxed and not worried anymore",
            "Day complete! Were you relieved that the school day was over? Say: Yes I was relieved or I was tired but cheerful — it was a good day!"
          ]
        }
      ],

      minimum_turns: 8,
      maximum_turns: 10
    },

    {
      mission_id: 3,
      id: 3,
      title: "Family Feelings - Home Story",
      title_en: "Family Feelings - Home Story",
      title_vi: "Cam Xuc Gia Dinh - Truyen Nha",
      theme: "Talking about family members past emotions at home",
      nova_greeting: "Let us find out about YOUR family! What feelings did you notice at home last week?",
      mission_context: "CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 1-2 hint choices if student seems stuck: Say: ___ or ___! LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. Week 24 Mission 3. Student practices was/were + adjective by talking about family members' feelings.",

      story_character: {
        name: "Family Members",
        personality: "caring, expressive family who share their feelings",
        backstory: "The student's family had lots of emotions at home last week — Mum was busy, Dad was excited, and everyone had feelings to share!",
        speaking_style: "describe family with was/were + adjective, use names when possible",
        facts: {
          family_setting: "home",
          uses_was_were: true,
          uses_family_names: true,
          favorite_phrase: "Mum was calm when..."
        },
        role: "The student describes family members emotions at home"
      },

      opening_narrative: "Family feelings story starts! Think about your family at home last week. Who was happy? Who was tired? Let us find out! Say: Mum was tired after work or Dad was excited about...",

      story_arc: [
        {
          phase: "family_tired_calm",
          turns: "1-4",
          phase_name: "Tired and Calm at Home",
          focus: "tired, calm, hungry, thirsty",
          goal: "Student describes family members feeling tired and calm",
          phase_questions: [
            "Home time! Was anyone in your family tired after work or school last week? Say: Yes Mum was tired after work or Dad was really tired in the evening",
            "Tired family! Was your family calm when everyone sat down for dinner? Say: Yes everyone was calm at dinner or We were all relaxed and quiet",
            "Dinner time! Was anyone hungry or thirsty when they got home? Say: Yes I was hungry when I got home or My brother was thirsty after football",
            "Eating together! Was the dinner time cheerful and happy for your family? Say: Yes everyone was cheerful at dinner or We were all happy to eat together"
          ]
        },
        {
          phase: "family_excited_surprised",
          turns: "5-8",
          phase_name: "Excited and Surprised Together",
          focus: "excited, surprised, cheerful, relieved",
          goal: "Student shares exciting family moments",
          phase_questions: [
            "Exciting news! Was anyone in your family excited about something last week? Say: Yes Dad was excited because... or My sister was excited about...",
            "Big surprise! Was anyone in your family surprised by good news? Say: Yes Mum was surprised or We were all surprised when...",
            "Happy family! Were you and your family all cheerful together at any point? Say: Yes we were all cheerful or We were happy when we heard the news",
            "Relieved moment! Was anyone in your family worried and then relieved? Say: Yes Mum was worried but then relieved or Dad was anxious but became calm"
          ]
        },
        {
          phase: "family_feelings_summary",
          turns: "9-12",
          phase_name: "Feelings Summary",
          focus: "All emotions — summary and goodbye",
          goal: "Student summarizes the week's family feelings",
          phase_questions: [
            "Almost done! Was your family generally happy and cheerful last week? Say: Yes my family was cheerful or We were mostly happy last week",
            "Feelings week! Were there any times when your family was upset or worried? Say: Yes sometimes we were worried or My family was upset once but we talked about it",
            "Family love! Was your family calm and supportive when someone was upset? Say: Yes my family was calm and supportive or We were all there to help each other",
            "Week complete! Were you glad to share your family feelings story? Say: Yes I was glad to talk about my family or I was happy to share our feelings!"
          ]
        }
      ],

      minimum_turns: 10,
      maximum_turns: 10
    }
  ],

  // 💬 SPARK TALK: AI-driven personal expression, bridged from the week's story
  spark_talk: [
    {
      id: 'spark_so_happy',
      emoji: '😊',
      title: 'I Was So Happy!',
      bridge: 'The character felt so many emotions — excited, scared, proud, and finally relieved! 🌈',
      seed_question: 'When were you very happy? Was it your birthday or a special day?',
      frames: [
        { template: 'It was ___', follow_up_q: 'When was it? Was it your birthday or a special day?', hints: ['my birthday', 'a special day', 'a holiday'] },
        { template: 'I was so ___!', follow_up_q: 'Were you so happy or so excited?', hints: ['happy', 'excited', 'surprised'] },
        { template: 'My mum was ___ for me', follow_up_q: 'What was your mum feeling? Was she happy or proud?', hints: ['happy', 'proud', 'so excited'] },
        { template: 'Everyone was ___', follow_up_q: 'What was everyone? Were they happy or surprised?', hints: ['happy', 'surprised', 'excited'] },
        { template: 'I was the happiest because ___', follow_up_q: 'Why were you the happiest?', hints: ['it was my birthday', 'my family was all there', 'I got a great gift'] },
        { template: 'I was not ___, I was happy!', follow_up_q: 'You were NOT what? Not sad or not tired?', hints: ['sad', 'tired', 'scared'] },
        { template: 'We were all ___ together', follow_up_q: 'What were you all feeling together?', hints: ['happy', 'excited', 'proud'] },
        { template: 'That day I was the most ___', follow_up_q: 'How did you feel most that day?', hints: ['happy', 'grateful', 'joyful'] }
      ],
      scaffold_frames: ['I felt happy when ___', 'I was ___ because ___', 'I remember feeling ___'],
      vocab_focus: ['happy', 'excited', 'proud', 'relieved', 'felt'],
      turns: 8,
    },
    {
      id: 'spark_biggest_surprise',
      emoji: '😮',
      title: 'My Biggest Surprise',
      bridge: 'The surprise made the character laugh, cry, and jump all at the same time! 🎊',
      seed_question: 'What was your biggest surprise? Was it a gift or a party?',
      frames: [
        { template: 'I was so surprised when ___', follow_up_q: 'When were you surprised? When someone gave you a gift?', hints: ['someone gave me a gift', 'I saw my friend', 'I got the highest score'] },
        { template: 'I was ___', follow_up_q: 'What were you at the moment of the surprise?', hints: ['speechless', 'very happy', 'shaking with excitement'] },
        { template: 'My family was ___ for me', follow_up_q: 'What was your family feeling for you?', hints: ['proud', 'happy', 'excited'] },
        { template: 'The surprise was so ___', follow_up_q: 'What made the surprise special? Was it big or wonderful?', hints: ['big', 'special', 'wonderful'] },
        { template: 'At first I was ___, but then I was happy!', follow_up_q: 'At first, what were you? Confused or nervous?', hints: ['confused', 'nervous', 'very quiet'] },
        { template: 'My friends were ___ when they saw me', follow_up_q: 'What were your friends feeling?', hints: ['happy', 'excited', 'proud'] },
        { template: 'It was ___ and everyone was happy', follow_up_q: 'How was the moment? Was it perfect or magical?', hints: ['perfect', 'magical', 'wonderful'] },
        { template: 'I will never forget because I was so ___', follow_up_q: 'Why will you never forget that moment?', hints: ['happy', 'surprised', 'grateful'] }
      ],
      scaffold_frames: ['I was surprised when ___', 'I felt ___', "I couldn't believe ___"],
      vocab_focus: ['surprised', 'shocked', 'excited', 'emotional', 'incredible'],
      turns: 8,
    },
  ],

  conversation_cards: [
    {
      id: "feelings_emotions_past",
      title: "Feelings and Emotions in the Past",
      emoji: "😊",
      theme: "Talking about past feelings using was/were + adjective",
      difficulty: "easy",
      exchanges: [
        {
          ai: "Feelings time! I am your feelings guide Nova! Were you excited about anything at school this week? Say: Yes I was excited about... or I was really excited when...",
          options: ["Yes I was excited about a new book", "I was really excited when we had a surprise"]
        },
        {
          ai: "Wonderful excitement! Were you ever scared or worried this week? Say: I was a little scared of... or I was worried about my homework",
          options: ["I was a little scared of the dark", "I was worried about my homework"]
        },
        {
          ai: "Brave sharing! Were you tired after school yesterday? Say: Yes I was tired after school or I was really tired and hungry",
          options: ["Yes I was tired after school", "I was really tired and hungry when I got home"]
        },
        {
          ai: "Rest is important! Were you and your friends cheerful at school today? Say: Yes we were cheerful or My friends were all happy today",
          options: ["Yes we were cheerful at break time", "My friends were all happy today"]
        },
        {
          ai: "Great feelings! Was anyone in your family surprised by good news this week? Say: Yes my family was surprised or We were all surprised when we heard...",
          options: ["Yes my family was surprised by good news", "We were all surprised when my sister won a prize"]
        },
        {
          ai: "Amazing! Last question — were you relieved at the end of this feelings class? Say: Yes I was relieved or I was happy and calm after sharing my feelings",
          options: ["Yes I was relieved after sharing my feelings", "I was happy and calm now"]
        }
      ],
      completion_message: "Feelings conversation complete! You used was and were perfectly with adjectives!"
    },
    {
      id: "was_were_grammar_practice",
      title: "Was and Were Grammar Practice",
      emoji: "📝",
      theme: "Practicing was/were agreement with different subjects",
      difficulty: "easy",
      exchanges: [
        {
          ai: "Grammar time! Let us practice was and were! I say a subject — you add was or were! Ready? I — was or were? Say: I was excited or I was calm",
          options: ["I was excited about the trip", "I was calm during the test"]
        },
        {
          ai: "Perfect I WAS! Now try: She — was or were? Say: She was surprised or She was tired",
          options: ["She was surprised by the news", "She was tired after the long day"]
        },
        {
          ai: "Great SHE WAS! Now try: They — was or were? Say: They were worried or They were cheerful",
          options: ["They were worried about the test", "They were cheerful at the party"]
        },
        {
          ai: "Excellent THEY WERE! Now try: We — was or were? Say: We were hungry or We were relieved",
          options: ["We were hungry after football", "We were relieved when the exam was over"]
        },
        {
          ai: "Superb WE WERE! Last one: He — was or were? Say: He was angry or He was bored",
          options: ["He was angry about the broken toy", "He was bored in the waiting room"]
        }
      ],
      completion_message: "Was/Were grammar practice complete! You matched every subject perfectly!"
    },
    {
      id: "mia_feelings_story_cards",
      title: "Mia Feelings Story Questions",
      emoji: "📖",
      theme: "Answering questions about Mia's emotional Monday using was/were",
      difficulty: "medium",
      exchanges: [
        {
          ai: "Story time! Let us talk about Mia's emotional Monday! How did Mia feel in the morning? Say: Mia was worried or She was scared about her homework",
          options: ["Mia was worried about her homework", "She was scared she would be late"]
        },
        {
          ai: "Worried morning! Was Leo calm or angry at breakfast? Say: Leo was angry or He was upset about his pencil",
          options: ["Leo was angry about his missing pencil", "He was upset because he could not find it"]
        },
        {
          ai: "Upset Leo! Was Mum worried or calm when she helped them? Say: Mum was calm or She was not worried — she just helped",
          options: ["Mum was calm and helped them look", "She was not worried — she found a way to help"]
        },
        {
          ai: "Calm Mum! Was Mia still worried when she got to school? Say: No she was relieved or Mia was not worried anymore — she found her homework",
          options: ["No she was relieved — she found her homework", "Mia was not worried anymore after she found it"]
        },
        {
          ai: "Relieved Mia! Was the class excited about the special visitor? Say: Yes the class was excited or Everyone was excited about the author",
          options: ["Yes the class was very excited", "Everyone was excited to meet the real author"]
        },
        {
          ai: "Exciting visitor! Was Mia cheerful at the end of her big emotional day? Say: Yes Mia was cheerful or She was tired but happy — it was a great day!",
          options: ["Yes Mia was cheerful despite being tired", "She was tired but happy — it was a great day!"]
        }
      ],
      completion_message: "Mia feelings story complete! You used was and were to tell the whole emotional story perfectly!"
    }
  ],

  metadata: {
    week: 24,
    phase: 1,
    cefr_level: "A1",
    grammar_guard: {
      target_tense: "was/were + adjective (past simple with adjective)",
      forbidden_structures: ["will + verb", "have + verb-ed", "am/is/are + verb-ing"],
      focus_adjectives: ["scared", "tired", "hungry", "thirsty", "excited", "bored", "surprised", "worried", "angry", "calm", "cheerful", "upset", "relieved"]
    }
  },
  freetalk_knowledge: {
    week_title: "Feelings in the Past",
    week_number: 24,
    theme: "Emotions and feelings in the past — was/were + adjective",

    knowledge_base: [
      "Emotions vocabulary: scared, tired, hungry, excited, bored, surprised, worried, angry, calm, happy, sad, proud, nervous, relieved",
      "Grammar: Was / Were + Adjective (Past Simple)",
      "Pattern: Subject + was/were + adjective (+ because + reason)",
      "Examples: I was excited. She was scared because it was dark. They were happy at the party.",
      "I / He / She / It → was | You / We / They → were",
      "Adding reason: I was tired because I played football all day.",
      "Feelings questions: How were you feeling? Were you happy or sad?",
      "Contrast: I was nervous before the test but I was relieved after."
    ],

    example_opening_questions: [
      "How were you feeling this morning?",
      "Were you ever scared of something when you were younger?",
      "Were you happy or sad after school today?",
      "Were you excited about something last week?",
      "Were you tired last night? Why?",
      "Were you ever surprised by a birthday party or a gift?"
    ],

    // FREE TALK 2.0: Starter prompts
    starter_prompts: [
      { text_en: "I want to play games! 🎮", text_vi: "Tôi muốn chơi game!", type: "game" },
      { text_en: "Translate this for me... 📖", text_vi: "Dịch giúp con câu/chữ này...", type: "help" },
      { text_en: "I have a question! ❓", text_vi: "Con có câu hỏi!", type: "ask" }
    ]
  },
};

export default week24RealData;
