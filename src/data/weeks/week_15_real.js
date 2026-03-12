const week15RealData = {
  // === METADATA ===
  week_id: 15,
  phase: 1,
  block: "A",
  unit: 1,
  week_number: 15,
  
  // === OFFICIAL SYLLABUS DATA ===
  title: "Week 15: The Busy Park",
  week_title_en: "The Busy Park (Actions Now)",
  week_title_vi: "Công viên Bận rộn (Hành động ngay lúc này)",
  
  topic: "Observing people in a park - describing actions happening now",
  topic_vi: "Quan sát mọi người trong công viên - miêu tả hành động đang diễn ra",
  
  // === KEY LEARNING OUTCOME ===
  learning_outcome: "Describe what is happening right now using Present Continuous",
  learning_outcome_vi: "Miêu tả những gì đang xảy ra ngay bây giờ bằng thì Hiện tại Tiếp diễn",
  
  // === GRAMMAR FOCUS ===
  grammar_focus: "Present Continuous: S + am/is/are + V-ing",
  grammar_pattern: "Subject + am/is/are + verb-ing + (object)",
  grammar_examples: [
    "A boy is running in the park.",
    "The children are playing soccer.",
    "An old man is sitting on the bench.",
    "A girl is eating ice cream.",
    "People are walking their dogs."
  ],
  
  // === TARGET VOCABULARY (10 SCHOOL SUPPLIES) ===
  target_vocab: [
    {
      word: "running",
      pronunciation: "/ˈrʌnɪŋ/",
      definition_vi: "chạy",
      definition_en: "moving fast on foot",
      example: "A boy is running in the park.",
      syllabus_context: "Action verbs"
    },
    {
      word: "walking",
      pronunciation: "/ˈwɔːkɪŋ/",
      definition_vi: "đi bộ",
      definition_en: "moving on foot at a normal speed",
      example: "People are walking in the park.",
      syllabus_context: "Action verbs"
    },
    {
      word: "sitting",
      pronunciation: "/ˈsɪtɪŋ/",
      definition_vi: "ngồi",
      definition_en: "resting on a chair or bench",
      example: "An old man is sitting on the bench.",
      syllabus_context: "Action verbs"
    },
    {
      word: "eating",
      pronunciation: "/ˈiːtɪŋ/",
      definition_vi: "ăn",
      definition_en: "having food",
      example: "A girl is eating ice cream.",
      syllabus_context: "Action verbs"
    },
    {
      word: "flying",
      pronunciation: "/ˈflaɪɪŋ/",
      definition_vi: "thả (diều)",
      definition_en: "making a kite move in the air",
      example: "The children are flying a kite.",
      syllabus_context: "Action verbs"
    },
    {
      word: "playing",
      pronunciation: "/ˈpleɪɪŋ/",
      definition_vi: "chơi",
      definition_en: "having fun with games or toys",
      example: "Kids are playing soccer.",
      syllabus_context: "Action verbs"
    },
    {
      word: "jogging",
      pronunciation: "/ˈdʒɒɡɪŋ/",
      definition_vi: "chạy bộ",
      definition_en: "running slowly for exercise",
      example: "A woman is jogging in the morning.",
      syllabus_context: "Exercise activities"
    },
    {
      word: "relaxing",
      pronunciation: "/rɪˈlæksɪŋ/",
      definition_vi: "thư giãn",
      definition_en: "resting and becoming calm",
      example: "Families are relaxing on the grass.",
      syllabus_context: "Leisure activities"
    },
    {
      word: "picnic",
      pronunciation: "/ˈpɪknɪk/",
      definition_vi: "dã ngoại",
      definition_en: "an outdoor meal",
      example: "They are having a picnic under the tree.",
      syllabus_context: "Park activities"
    },
    {
      word: "fountain",
      pronunciation: "/ˈfaʊntən/",
      definition_vi: "đài phun nước",
      definition_en: "a structure that shoots water into the air",
      example: "Children are playing near the fountain.",
      syllabus_context: "Park features"
    }
  ],
  
  global_vocab: ["running", "walking", "sitting", "eating", "flying", "playing", "jogging", "relaxing", "picnic", "fountain"],

  // === AI TUTOR BEHAVIOR (week-level tuning) ===
  nova_instructions: {
    persona: "Friendly English teacher, warm and observant like a park guide",
    tone: "Warm, curious, loves watching people enjoying the park",
    opening_lines_by_mission: {
      mission_1: "Hi! I am Ms. Nova! I am at the park right now! It is so busy here! So many people! Look! What is that boy doing? Say: He is...",
      mission_2: "Welcome back! Let's play 'Spot the Action'! I will describe someone, and you guess what they are doing! Ready? I see a girl with ice cream in her hand.",
      mission_3: "Wow! The park is full of surprises today! I see something colorful in the sky! What are the children flying? Let's describe all the amazing things happening!"
    },
    conversation_style: [
      "Natural and flowing - like watching the park together",
      "One clear question per turn",
      "Build on previous answers - show active listening",
      "NO emojis - text-to-speech will read them aloud",
      "Keep responses under 30 words",
      "Maintain conversation for minimum 10-15 turns per mission",
      "ONLY use Present Continuous: 'S + am/is/are + V-ing' - Week 15 grammar scope"
    ],
    recast_strategy: "ALWAYS recast student errors by modeling correct form naturally in your response",
    recast_example: {
      student: "Boy run park.",
      nova_recast: "Yes! The boy IS RUNNING in the park! He is running very fast! What else do you see?"
    },
    vocabulary_scaffolding: [
      "Mission 1: running, walking, sitting, eating - basic actions people do in parks",
      "Mission 2: flying, playing, jogging - more dynamic park activities",
      "Mission 3: relaxing, picnic, fountain - combine all vocab to describe the busy park scene"
    ],
    questioning_skill: [
      "What is the boy doing?",
      "Is the girl eating ice cream?",
      "What are the children playing?",
      "Who is sitting on the bench?",
      "What are people doing in the park?"
    ]
  },

  // === AI RESPONSE FORMAT CONTRACT (V28 standard) ===
  v28_format_notes: {
    response_format: "ack + recast + question (V28 ONLY - NOT V25)",
    ack_options: ["Nice!", "Great!", "Wonderful!", "Good job!", "Perfect!"],
    recast_max_words: 8,
    recast_rules: [
      "Mirror the student's key word back in the recast",
      "Fix grammar naturally without explanation",
      "Keep it conversational and encouraging"
    ],
    question_patterns_allowed: [
      "What is...?",
      "Where is...?",
      "Is...?",
      "Do you...?",
      "Can you...?"
    ],
    question_patterns_forbidden: [
      "Why...?",
      "What does... mean?",
      "Do you understand?"
    ],
    example_exchanges: [
      {
        student: "Pen in backpack.",
        tutor_response: "Great! There is a pen IN my backpack. What else is in your backpack?"
      },
      {
        student: "There is book.",
        tutor_response: "Nice! There is A book. Say: There is a book in my backpack!"
      },
      {
        student: "I have ruler.",
        tutor_response: "Wonderful! There is a ruler in my backpack. What is next to the ruler?"
      }
    ]
  },

  // === 3 STORY MISSIONS ===
  story_missions: [
    {
      mission_id: 1,
      title: "Busy Park Observation",
      title_vi: "Quan Sát Công Viên Sôi Động",
      theme: "Park Activities",
      
      // 🎭 STORY CHARACTER
      story_character: {
        name: "Ms. Nova",
        personality: "Friendly guide who loves watching people in the park",
        backstory: "Ms. Nova visits the park every day to see people having fun!",
        speaking_style: "Warm, describes actions, uses Present Continuous",
        facts: {
          loves_backpacks: true,
          has_backpack: true,
          favorite_item: "notebook",
          backpack_color: "blue",
          organized: true,
          checks_supplies: true
        }
      },
      
      // 🎬 OPENING NARRATIVE
      opening_narrative: "Hi! I'm Ms. Nova! I'm at the park! 🏞️ It's so busy here! Look! What is that boy doing? He is running! What is your name? Say: My name is [your name]",
      
      nova_greeting: "Hi! Let's watch the park together!", // DEPRECATED
      
      mission_context: `CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 2-3 hint choices: "Say: ___ or ___!" NEVER end a response without a question + choices. LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. This is Week 7 Mission 1 - Backpack Check. STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level. CHARACTER: Ms. Nova is packing her own backpack and loves checking what students have in theirs. OPENING: Ask student's name, then say "Let's check your backpack together! What is in your backpack? Say: There is a pen in my backpack." STRICT GAME RULES: 1. ONLY ask about items IN STUDENT'S BACKPACK. 2. Student MUST say "There is a [item] in my backpack." 3. If student gives yes/no only, prompt full sentence: "Say: There is a ruler in my backpack!" 4. Ask about ONE item per question. VOCABULARY TARGET: pen, ruler, eraser, book, notebook, pencil case, backpack. ALLOWED QUESTIONS: "What is in your backpack?", "Is there a ruler?", "What color is your book?", "Where is your pencil case?" GRAMMAR ENFORCEMENT: Every answer must practice "There is a [item]" - recast all errors naturally. GAME MECHANIC: Ask about ONE backpack item per turn → student says 'There is a [item] in my backpack' → confirm/recast → ask about next item. FORBIDDEN: Do NOT ask about feelings, preferences, or unrelated topics. NEVER say 'Tell me more!', 'What do you want to talk about?', or 'I see!' as filler. AVOID: Multiple items per turn, complex sentences. covering at least 5 different items. Do NOT ask another question on the last turn.`,
      
      target_vocab: ["pen", "ruler", "eraser", "book", "notebook", "pencil case", "backpack"],
      
      grammar_pattern: "There is a [item] in my backpack",
      
      // 📖 STORY ARC
      story_arc: [
        {
          phase: "introduction",
          turns: "1-4",
          goal: "Open backpack, check first items with scaffolding",
          required_vocab: [],
          phase_questions: [
            {
              template: "(After name) {student_answer}! Great name! Open your backpack! Can you see a pen or a ruler? Say: Yes, there is a pen or Yes, there is a ruler",
              hints: ["Yes", "there", "is", "a", "pen", "ruler", "No", "isn't"]
            },
            {
              template: "(After first item) {student_answer}! Good! Can you see a book or a notebook? Say: Yes, there is a book or Yes, there is a notebook",
              hints: ["Yes", "there", "is", "a", "book", "notebook", "No", "isn't"]
            },
            {
              template: "(After second item) {student_answer}! Great! What about an eraser? Do you have an eraser? Say: Yes, there is an eraser or No, there isn't an eraser",
              hints: ["Yes", "there", "is", "an", "eraser", "No", "isn't"]
            },
            {
              template: "(After eraser) {student_answer}! Perfect! Your backpack has many things! Let's check more! 📚",
              hints: ["Yes", "Okay", "Great"]
            }
          ]
        },
        {
          phase: "item_check",
          turns: "5-12",
          goal: "Check more items with full sentence practice",
          required_vocab: ["pen", "ruler", "eraser", "book", "notebook"],
          phase_questions: [
            {
              template: "Can you see a notebook? Say: Yes, there is a notebook or No, there isn't a notebook",
              hints: ["Yes", "there", "is", "a", "notebook", "No", "isn't"]
            },
            {
              template: "Can you see a pencil case? Say: Yes, there is a pencil case or No, there isn't a pencil case",
              hints: ["Yes", "there", "is", "a", "pencil", "case", "No", "isn't"]
            },
            {
              template: "Open the pencil case! What do you see inside? Say: There is a pen or There is an eraser",
              hints: ["There", "is", "a", "pen", "an", "eraser"]
            },
            {
              template: "How many pens are in the pencil case? Say: There is one pen or There are two pens",
              hints: ["There", "is", "one", "pen", "are", "two", "pens"]
            },
            {
              template: "What color is your notebook? Say: My notebook is blue or My notebook is red",
              hints: ["My", "notebook", "is", "blue", "red", "white"]
            },
            {
              template: "How many books do you have? Say: There is one book or There are two books",
              hints: ["There", "is", "one", "book", "are", "two", "books"]
            },
            {
              template: "Where is your ruler? Say: There is a ruler in my backpack or There is a ruler on the desk",
              hints: ["There", "is", "a", "ruler", "in", "my", "backpack", "on", "the", "desk"]
            },
            {
              template: "What else is in your backpack? Say: There is a pen or There is an eraser",
              hints: ["There", "is", "a", "pen", "an", "eraser", "ruler"]
            }
          ]
        },
        {
          phase: "favorite_item",
          turns: "13-16",
          goal: "Ask about favorite school supply",
          required_vocab: [],
          phase_questions: [
            {
              template: "What is your favorite item? Say: My favorite is the pen or My favorite is the book",
              hints: ["My", "favorite", "is", "the", "pen", "book", "ruler"]
            },
            {
              template: "Why do you like it? Say: I like it because it is useful or I like it because it is pretty",
              hints: ["I", "like", "it", "because", "is", "useful", "pretty", "good"]
            },
            {
              template: "What color is your favorite item? Say: It is blue or It is red",
              hints: ["It", "is", "blue", "red", "green", "yellow"]
            },
            {
              template: "Is your backpack full or empty? Say: My backpack is full or My backpack is empty",
              hints: ["My", "backpack", "is", "full", "empty"]
            }
          ]
        },
        {
          phase: "conclusion",
          turns: "17-18",
          goal: "Wrap up backpack check",
          required_vocab: [],
          phase_questions: [
            {
              template: "Your backpack has many items! Great job!",
              hints: ["Thank", "you", "Yes", "Great"]
            },
            {
              template: "Ready for school? Goodbye! Say: Goodbye!",
              hints: ["Goodbye", "Yes", "Bye", "See", "you"]
            }
          ]
        }
      ],
      
      
      minimum_turns: 10,
      maximum_turns: 12,
      expected_duration: "15+ minutes"
    },
    {
      mission_id: 2,
      title: "Spot the Action Game",
      title_vi: "Trò Chơi Đoán Hành Động",
      theme: "Park Action Guessing",
      
      nova_greeting: "Let's play Spot the Action! I describe, you guess!", // DEPRECATED
      default_hints: ["There", "is", "a", "whiteboard"],
      
      mission_context: `CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 2-3 hint choices: "Say: ___ or ___!" NEVER end a response without a question + choices. LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. This is Week 7 Mission 2 - Classroom Treasure Hunt. STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level. LANGUAGE RULES: Use VERY SIMPLE words. Max 8 words per sentence. ONLY ask about ITEMS using WHAT questions. GRAMMAR: "There is a [item]" pattern. Give FULL scaffolding: "Say: There is a whiteboard" or "Say: There is a desk". VOCABULARY: whiteboard, teacher, computer, pen, ruler, eraser, book, notebook, pencil case, backpack. STRICT FOCUS: ITEM IDENTIFICATION ONLY - Every question must be about WHAT item student sees. FORBIDDEN: Do NOT ask "Do you like...?", "What do you think...?", "How do you feel...?", "Do you want...?", "What color...?". ONLY allowed questions: "(Point 👉) What is this?", "(Point 👉) What do you see?", "Look here! What is it?". GAME MECHANIC: Point to ONE classroom item per turn → student says 'There is a [item]' → confirm/recast → point to next item. NEVER ask about preferences, feelings, or descriptions - ONLY IDENTIFY ITEMS WITH 'There is a...'. NEVER say 'Tell me more!', 'What do you want to talk about?', or 'I see!' as filler. Do NOT ask another question on the last turn.`,
      
      target_vocab: ["whiteboard", "computer", "desk", "chair", "book", "pen", "ruler", "teacher"],
      
      grammar_pattern: "There is a [item]",

      // === STORY MODE CONFIGURATION ===
      story_character: {
        name: "Ms. Nova",
        personality: "friendly teacher, loves pointing at classroom items",
        backstory: "I teach in this classroom! Let me show you around! There are many things here!",
        speaking_style: "excited, points at objects one by one, celebrates correct answers",
        facts: {
          loves_teaching: true,
          has_classroom: true,
          favorite_item: "whiteboard",
          desk_color: "brown",
          students: 20,
          teaches_English: true
        },
        role: "Teacher showing classroom items by pointing"
      },

      opening_narrative: "Hi! I'm Ms. Nova! 🔍 Let's play Spot the Action! I see someone with ice cream! What is she doing? Say: She is eating...",

      story_arc: [
        {
          phase: "treasure_hunt_start",
          turns: "1-4",
          phase_name: "Start Treasure Hunt!",
          focus: "Find first hidden items with full scaffolding",
          phase_questions: [
            "(Point 👉 at whiteboard) 🔍 Look! I found something at the front! What is this? Say: There is a...",
            "(Point 👉 at desk) Yay! I found another! What do you see? Say: There is a...",
            "(Point 👉 at chair) Wow! One more! What is it? Say: There is a...",
            "(Point 👉 at computer) Great! Look here! What is this? Say: There is a..."
          ],
          example_answers: [
            "There is a whiteboard",
            "There is a desk",
            "There is a chair",
            "There is a computer"
          ]
        },
        {
          phase: "more_treasures",
          turns: "5-12",
          phase_name: "Find More Treasures!",
          focus: "Keep finding items with excitement",
          phase_questions: [
            "(Point 👉 at book) 📖 I see something! What is it? Say: There is a...",
            "(Point 👉 at pen) ✏️ Look! For writing! What is this? Say: There is a...",
            "(Point 👉 at ruler) 📏 Yay! For measuring! What is this? Say: There is a...",
            "(Point 👉 under desk) 🔍 Under here! What do you see? Say: There is a...",
            "(Point 👉 on desk) ✨ On top! What is this? Say: There is a...",
            "(Point 👉 near window) By the window! What is it? Say: There is a...",
            "(Point 👉 in corner) In the corner! What do you see? Say: There is a...",
            "(Point 👉 on wall) On the wall! What is this? Say: There is a..."
          ],
          example_answers: [
            "There is a book",
            "There is a pen",
            "There is a ruler",
            "There is a desk",
            "There is a chair",
            "There is a whiteboard",
            "There is a computer",
            "There is a book"
          ]
        },
        {
          phase: "item_locations",
          turns: "13-16",
          phase_name: "Where Are Items",
          focus: "Ask about locations of items",
          phase_questions: [
            "Where is the whiteboard? At the front or at the back?",
            "Where is your desk? Near the door or near the window?",
            "Where is the pen? On the desk or in the bag?",
            "What is on the desk? A book, a pen, or a ruler?"
          ]
        },
        {
          phase: "conclusion",
          turns: "17-18",
          phase_name: "Wrap Up Tour",
          focus: "Celebrate learning classroom items",
          phase_questions: [
            "We saw many things in the classroom! What is your favorite? Whiteboard, computer, or desk?",
            "Great job! You know all the classroom items! Bye bye! 👋"
          ]
        }
      ],
      
      minimum_turns: 10,
      maximum_turns: 12,
      expected_duration: "12+ minutes"
    },
    {
      mission_id: 3,
      title: "The Magic Backpack",
      title_vi: "Chiếc Balo Phép Thuật",
      theme: "Magic Guessing Game",
      
      nova_greeting: "I have a magic backpack! Let's see what appears inside!", // DEPRECATED
      default_hints: ["There", "is", "a", "pen"],
      
      mission_context: `CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 2-3 hint choices: "Say: ___ or ___!" NEVER end a response without a question + choices. LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. This is Week 7 Mission 3 - The Magic Backpack. STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level. LANGUAGE RULES: Use VERY SIMPLE words. Max 8 words per sentence. ONLY ask about ITEMS using WHAT questions. GRAMMAR: "There is a [item]" pattern. Give FULL scaffolding: "Say: There is a pen" or "Say: There is a notebook". VOCABULARY: whiteboard, teacher, computer, pen, ruler, eraser, book, notebook, pencil case, backpack. STRICT FOCUS: ITEM IDENTIFICATION ONLY - Every question must be about WHAT item is in the backpack. FORBIDDEN: Do NOT ask "Do you like...?", "What do you think...?", "How do you feel...?", "Do you want...?", "What color...?", "Is it big?". ONLY allowed questions: "(Feel 👋) What is it?", "(Shake 🎒) What do you hear?", "What is this item?". GAME MECHANIC: Nova reaches in magic backpack → gives ONE clue → student guesses 'There is a/an [item]' → confirm/recast → next item. NEVER ask about preferences, feelings, or descriptions - ONLY GUESS ITEMS WITH 'There is a...'. NEVER say 'Tell me more!', 'What do you want to talk about?', or 'I see!' as filler. Do NOT ask another question on the last turn.`,
      
      target_vocab: ["pen", "ruler", "eraser", "book", "notebook", "pencil case", "backpack"],
      
      grammar_pattern: "There is a [item] in my backpack",

      // === STORY MODE CONFIGURATION ===
      story_character: {
        name: "Ms. Nova",
        personality: "mysterious, playful, loves magic tricks and surprises",
        backstory: "I have a MAGIC backpack! I can't see inside, but I can feel things! Let's guess together!",
        speaking_style: "mysterious, gives clues about what she feels, celebrates correct guesses",
        facts: {
          has_magic_backpack: true,
          cant_see_inside: true,
          loves_mysteries: true,
          feels_items: true,
          favorite_item: "notebook",
          backpack_color: "purple"
        },
        role: "Magic backpack host giving mystery clues for student to guess"
      },

      opening_narrative: "Look! 📦 I have a MAGIC backpack! I can't see inside! (Feel 👋) Hmm... I feel something... What is it? Say: There is a...",

      story_arc: [
        {
          phase: "intro",
          turns: "1-4",
          phase_name: "Magic Backpack Opens!",
          focus: "First mystery items with full scaffolding",
          phase_questions: [
            "(Feel 👋 something long and thin ✏️) I can't see! What is it? Say: There is a...",
            "(Feel 👋 something flat with pages 📖) Hmm... What is this? Say: There is a...",
            "(Feel 👋 something small and soft 🧽) For cleaning! What is it? Say: There is an...",
            "(Shake 🎒 pencil case rattles) I hear noise! What is inside? Say: There is a..."
          ],
          example_answers: [
            "There is a pen",
            "There is a book",
            "There is an eraser",
            "There is a pencil case"
          ]
        },
        {
          phase: "mystery_clues",
          turns: "5-12",
          phase_name: "More Mystery Items!",
          focus: "Keep guessing with excitement",
          phase_questions: [
            "(Feel 👋 something long and straight 📏) Hmm... long and hard! For measuring! What is it? Say: There is a...",
            "(Feel 👋 many pages 📓) Wow! So many blank pages! For writing notes! What is it? Say: There is a...",
            "(Hear click click 🖊️) Listen! Click click! Inside pencil case! What is it? Say: There is a...",
            "(Feel 👋 very thin 📐) So thin! Like paper! For drawing straight lines! What is it? Say: There is a...",
            "(Shake 🎒 hear rattle) Rattle rattle! Many things! What's inside? Say: There is a...",
            "(Feel 👋 thick and heavy 📚) So heavy! Hundreds of pages! What is it? Say: There is a...",
            "(Squeeze 🧽 soft and squishy) Squishy! For cleaning mistakes! What is it? Say: There is an...",
            "(Pull out mystery item) Ta-da! 🎉 Last item! What is this? Say: There is a..."
          ],
          example_answers: [
            "There is a ruler",
            "There is a notebook",
            "There is a pen",
            "There is a ruler",
            "There is a book",
            "There is a book",
            "There is an eraser",
            "There is a pencil case"
          ]
        },
        {
          phase: "verification",
          turns: "13-16",
          phase_name: "Check Everything",
          focus: "Verify all items are packed",
          phase_questions: [
            "Let's check! Is there a pen? Yes or no?",
            "Is there a ruler? Yes or no?",
            "Is there a notebook? Yes or no?",
            "Perfect! Your backpack is full! Ready for school?"
          ]
        },
        {
          phase: "conclusion",
          turns: "17-18",
          phase_name: "Ready for School",
          focus: "Celebrate being prepared",
          phase_questions: [
            "Great job! Your backpack has everything! You are ready for school! 🎒",
            "See you at school tomorrow! Goodbye! 👋"
          ]
        }
      ],
      
      minimum_turns: 10,
      maximum_turns: 12,
      expected_duration: "12+ minutes"
    }
  ],

  // === FREE TALK KNOWLEDGE BASE ===
  freetalk_knowledge: {
    week_title: "Inside My Backpack",
    week_number: 7,
    theme: "School Supplies",
    
    knowledge_base: [
      "School supplies: pen, ruler, eraser, book, notebook, pencil case, backpack",
      "Classroom items: whiteboard, computer, desk, chair, teacher",
      "Grammar: There is a... (There is a pen in my backpack)",
      "We use pens and pencils for writing",
      "We use rulers for measuring and drawing lines",
      "We use erasers to remove pencil marks",
      "Books and notebooks help us learn at school",
      "We carry school supplies in our backpacks",
      "The classroom has a whiteboard, desks, and chairs",
      "We need to pack our backpacks before school"
    ],
    
    example_opening_questions: [
      "What is in your backpack?",
      "Do you have a pen?",
      "What is your favorite school supply?",
      "What color is your backpack?",
      "What do you see in the classroom?",
      "Is there a whiteboard in your classroom?",
      "How many books do you have?"
    ],
    
    // ✅ FREE TALK 2.0: Starter prompts (Fixed buttons for all weeks)
    starter_prompts: [
      { text_en: "I want to play games! 🎮", text_vi: "Tôi muốn chơi game!", type: "game" },
      { text_en: "Translate this for me... 📖", text_vi: "Dịch giúp con câu/chữ này...", type: "help" },
      { text_en: "Let's do roleplay! 🎭", text_vi: "Chơi nhập vai đi cô!", type: "roleplay" },
      { text_en: "I have a question! ❓", text_vi: "Con có câu hỏi!", type: "ask_anything" }
    ],
    
    // Legacy bonus roleplay (kept for backward compatibility)
    bonus_roleplay: {
      id: 'week7_backpack_check',
      label_en: "Backpack Checker 🎒",
      label_vi: "Kiểm tra Balo 🎒",
      icon: "🎒",
      ai_role: "Teacher checking student's backpack",
      user_role: "Student showing backpack items",
      intro: "Hi! Let's check your backpack together! Open it! What do you have inside?",
      context: "Week 7 theme - School Supplies. AI acts as friendly teacher checking backpack items one by one (pen, ruler, eraser, book, notebook). Teacher asks 'Is there a...?' and student responds 'There is a...' patterns. Teacher should be encouraging and use simple words suitable for A0+ level."
    }
  },


  conversation_cards: [
    {
      id: "whats_in_my_bag",
      title: "What's In My Bag?",
      emoji: "🎒",
      theme: "School Supplies — There Is",
      difficulty: "easy",
      exchanges: [
        {
          ai: "Let's look in your school bag! Is there a book? Say: Yes, there is a book!",
          accept: ["Yes", "there is", "a book", "book"]
        },
        {
          ai: "What else is in your bag? Say: There is a ___",
          fill_blank: "There is a ___",
          accept_words: ["pen", "book", "pencil", "notebook", "ruler", "eraser", "there is"]
        },
        {
          ai: "Is there a ruler? Say: Yes, there is a ruler! or No, there is no ruler!",
          options: ["Yes, there is a ruler!", "No, there is no ruler!"]
        },
        {
          ai: "Remember: AN before vowels! Is there an eraser? Say: There is an ___",
          fill_blank: "There is an ___",
          accept_words: ["eraser", "an eraser", "umbrella", "apple"]
        },
        {
          ai: "Tell me one thing you have in your bag! Say: There is a ___",
          fill_blank: "There is a ___",
          accept_words: ["pen", "book", "pencil", "ruler", "eraser", "notebook", "bag", "there is"]
        }
      ],
      completion_message: "Your bag is ready for school! 🎒 You used: There is a pen/book/ruler/eraser!"
    },
    {
      id: "pencil_case_check",
      title: "Pencil Case Check!",
      emoji: "✏️",
      theme: "Counting School Supplies",
      difficulty: "medium",
      exchanges: [
        {
          ai: "Open your pencil case! Is there a pencil? Say: Yes, there is a pencil in my pencil case!",
          accept: ["Yes", "there is", "pencil", "a pencil"]
        },
        {
          ai: "Is there a red pen? Choose: Yes, there is a red pen or No, there is a blue pen or No, there is no pen",
          options: ["Yes, there is a red pen", "No, there is a blue pen", "No, there is no pen"]
        },
        {
          ai: "AN before vowel sounds! Say: There is an ___ in my pencil case!",
          fill_blank: "There is an ___",
          accept_words: ["eraser", "an eraser", "umbrella"]
        },
        {
          ai: "Is there a sharpener? Choose: Yes, there is a sharpener or No, there is no sharpener",
          options: ["Yes, there is a sharpener", "No, there is no sharpener"]
        },
        {
          ai: "What colour is your pencil case? Say: My pencil case is ___",
          fill_blank: "My pencil case is ___",
          accept_words: ["red", "blue", "green", "yellow", "pink", "black", "white", "purple", "pencil case"]
        },
        {
          ai: "Tell me TWO things in your pencil case! Say: There is a ___ and there is a ___",
          accept: ["there is", "and", "pencil", "pen", "eraser", "ruler", "sharpener"]
        }
      ],
      completion_message: "Pencil case ready! ✏️ You used: There is a pencil/eraser/ruler/sharpener!"
    },
    {
      id: "classroom_quest",
      title: "Classroom Quest!",
      emoji: "🏫",
      theme: "Finding Things in the Classroom",
      difficulty: "medium",
      exchanges: [
        {
          ai: "Look around your classroom! Is there a board? Say: Yes, there is a board!",
          accept: ["Yes", "there is", "a board", "board"]
        },
        {
          ai: "Look around! What do you see? Say: There is a ___ in my classroom",
          fill_blank: "There is a ___ in my classroom",
          accept_words: ["desk", "chair", "board", "window", "door", "computer", "book", "there is"]
        },
        {
          ai: "Is there a book on your desk right now? Say: Yes, there is a book! or No, there is no book!",
          options: ["Yes, there is a book!", "No, there is no book!"]
        },
        {
          ai: "Is there a pen on the desk? Choose: Yes, there is a pen or No, there is no pen",
          options: ["Yes, there is a pen", "No, there is no pen"]
        },
        {
          ai: "What do you see in your classroom? Say: There is a ___",
          fill_blank: "There is a ___",
          accept_words: ["board", "desk", "chair", "book", "pen", "pencil", "window", "door", "teacher", "there is"]
        },
        {
          ai: "Which school supply is most important? Choose: A book is most important or A pen is most important or A bag is most important",
          options: ["A book is most important", "A pen is most important", "A bag is most important"]
        }
      ],
      completion_message: "Quest complete! 🏫🏆 You found everything using: There is a pen/book/desk/board!"
    }
  ]
};

export default week15RealData;
