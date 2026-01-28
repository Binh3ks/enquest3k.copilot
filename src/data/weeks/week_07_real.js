const week7RealData = {
  // === METADATA ===
  week_id: 7,
  phase: 1,
  block: "A",
  unit: 1,
  week_number: 7,
  
  // === OFFICIAL SYLLABUS DATA ===
  title: "Week 7: Inside My Backpack",
  week_title_en: "Inside My Backpack (Singular)",
  week_title_vi: "Trong Balo của tôi (Số ít)",
  
  topic: "School supplies - Stating what exists (singular)",
  topic_vi: "Đồ dùng học tập - Nêu sự tồn tại (số ít)",
  
  // === KEY LEARNING OUTCOME ===
  learning_outcome: "State what exists using 'There is a...' for singular items",
  learning_outcome_vi: "Nêu sự tồn tại bằng 'There is a...' cho vật số ít",
  
  // === GRAMMAR FOCUS ===
  grammar_focus: "There is a... (Singular)",
  grammar_pattern: "There is a [item] in my [place]",
  grammar_examples: [
    "There is a pen in my backpack.",
    "There is a book on the desk.",
    "There is a ruler in the pencil case.",
    "There is a computer in the classroom."
  ],
  
  // === TARGET VOCABULARY (10 SCHOOL SUPPLIES) ===
  target_vocab: [
    {
      word: "whiteboard",
      pronunciation: "/ˈwaɪtbɔːrd/",
      definition_vi: "bảng trắng",
      definition_en: "a white board for writing with markers",
      example: "There is a whiteboard in the classroom.",
      syllabus_context: "Classroom items"
    },
    {
      word: "teacher",
      pronunciation: "/ˈtiːtʃər/",
      definition_vi: "giáo viên",
      definition_en: "a person who teaches students",
      example: "There is a teacher in the school.",
      syllabus_context: "People"
    },
    {
      word: "computer",
      pronunciation: "/kəmˈpjuːtər/",
      definition_vi: "máy tính",
      definition_en: "an electronic device for work and study",
      example: "There is a computer on the desk.",
      syllabus_context: "Technology"
    },
    {
      word: "pen",
      pronunciation: "/pen/",
      definition_vi: "bút mực",
      definition_en: "a tool for writing with ink",
      example: "There is a pen in my pencil case.",
      syllabus_context: "Writing tools"
    },
    {
      word: "ruler",
      pronunciation: "/ˈruːlər/",
      definition_vi: "thước kẻ",
      definition_en: "a tool for measuring and drawing straight lines",
      example: "There is a ruler in my backpack.",
      syllabus_context: "Measuring tools"
    },
    {
      word: "eraser",
      pronunciation: "/ɪˈreɪzər/",
      definition_vi: "cục tẩy",
      definition_en: "a tool for removing pencil marks",
      example: "There is an eraser on my desk.",
      syllabus_context: "Writing tools"
    },
    {
      word: "book",
      pronunciation: "/bʊk/",
      definition_vi: "sách",
      definition_en: "something you read to learn",
      example: "There is a book in my bag.",
      syllabus_context: "Reading materials"
    },
    {
      word: "notebook",
      pronunciation: "/ˈnoʊtbʊk/",
      definition_vi: "vở ghi chép",
      definition_en: "a book with empty pages for writing notes",
      example: "There is a notebook on the table.",
      syllabus_context: "Writing materials"
    },
    {
      word: "pencil case",
      pronunciation: "/ˈpensəl keɪs/",
      definition_vi: "hộp bút",
      definition_en: "a bag or box for holding pens and pencils",
      example: "There is a pencil case in my backpack.",
      syllabus_context: "Storage items"
    },
    {
      word: "backpack",
      pronunciation: "/ˈbækpæk/",
      definition_vi: "ba lô",
      definition_en: "a bag you carry on your back",
      example: "There is a backpack on the chair.",
      syllabus_context: "School items"
    }
  ],
  
  global_vocab: ["whiteboard", "teacher", "computer", "pen", "ruler", "eraser", "book", "notebook", "pencil case", "backpack"],
  
  // === 3 STORY MISSIONS ===
  story_missions: [
    {
      mission_id: 1,
      title: "What's in My Backpack",
      title_vi: "Trong Balo của Tôi",
      theme: "Backpack Items",
      
      // 🎭 STORY CHARACTER
      story_character: {
        name: "Ms. Nova",
        personality: "Curious teacher, loves organizing backpacks",
        backstory: "Ms. Nova helps students check their backpacks before school starts!",
        speaking_style: "Friendly, asks one item at a time, uses full sentence patterns",
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
      opening_narrative: "Hi! I'm Ms. Nova! Let's check your backpack! 🎒 Open it! What is in your backpack? Say: There is a...",
      
      nova_greeting: "Hi! Let's check your backpack!", // DEPRECATED
      
      mission_context: `This is Week 7 Mission 1 - Backpack Check. 

STRICT GAME RULES:
1. ONLY ask about items IN STUDENT'S BACKPACK
2. Student MUST say: "There is a [item] in my backpack"
3. If yes/no only → prompt full sentence  
4. ONE item per question

FORBIDDEN - NEVER ASK:
- "What do you think?" ❌
- "How do you feel?" ❌
- "Do you like...?" ❌
- Personal questions ❌
- Yes/No without grammar practice ❌

ALLOWED QUESTIONS ONLY:
- "What is in your backpack?"
- "Is there a [item]?"
- "Where is your [item]?"
- "What color is your [item]?"

LANGUAGE: VERY SIMPLE. Max 8 words/sentence. 
GRAMMAR: "There is a [item]" pattern enforcement.
VOCABULARY: pen, ruler, eraser, book, notebook, pencil case, backpack.`,
      
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
            "Open your backpack! Can you see a pen? Say: Yes, there is a pen OR No, there isn't a pen.",
            "Good! Can you see a ruler? Say: Yes, there is a ruler OR No, there isn't a ruler.",
            "Great! What about a book? Say: Yes, there is a book OR No, there isn't a book.",
            "Perfect! Can you see an eraser? Say: Yes, there is an eraser OR No, there isn't an eraser."
          ]
        },
        {
          phase: "item_check",
          turns: "5-12",
          goal: "Check more items with full sentence practice",
          required_vocab: ["pen", "ruler", "eraser", "book", "notebook"],
          phase_questions: [
            "Can you see a notebook? Say: Yes, there is a notebook OR No, there isn't a notebook.",
            "Can you see a pencil case? Say: Yes, there is a pencil case OR No, there isn't a pencil case.",
            "Open the pencil case! What do you see inside? Say: There is a...",
            "How many pens are in the pencil case? Say: There is one pen OR There are two pens.",
            "What color is your notebook? Blue, red, or white?",
            "How many books do you have? Say: There is one book OR There are two books.",
            "Where is your ruler? Say: There is a ruler in my backpack OR There is a ruler on the desk.",
            "What else is in your backpack? A pen, an eraser, or a ruler? Say: There is a..."
          ]
        },
        {
          phase: "favorite_item",
          turns: "13-16",
          goal: "Ask about favorite school supply",
          required_vocab: [],
          phase_questions: [
            "What is your favorite item? A pen, a book, or a ruler?",
            "Why do you like it?",
            "What color is your favorite item?",
            "Is your backpack full or empty?"
          ]
        },
        {
          phase: "conclusion",
          turns: "17-18",
          goal: "Wrap up backpack check",
          required_vocab: [],
          phase_questions: [
            "Your backpack has many items! Great job!",
            "Ready for school? Goodbye!"
          ]
        }
      ],
      
      objectives: [
        {
          stepKey: "backpack_has_items",
          category: "Items",
          question_variants: [
            {
              question: "What is in your backpack?",
              hints: ["There", "is", "a", "pen", "in", "my", "backpack"]
            },
            {
              question: "Open your backpack! What do you see?",
              hints: ["see", "I", "a", "book", "and", "notebook"]
            },
            {
              question: "Tell me about your backpack.",
              hints: ["has", "It", "a", "ruler", "and", "eraser"]
            }
          ],
          target_keywords: ["pen", "ruler", "eraser", "book", "notebook", "pencil case", "backpack", "there", "is"],
          ack_options: ["Nice!", "Great!", "Wonderful!"],
          recast_templates: [
            "There is a {item} in your backpack!",
            "You have a {item}!"
          ],
          success_criteria: "Student names at least one item"
        },
        {
          stepKey: "has_pen",
          category: "Specific Item",
          question_variants: [
            {
              question: "Is there a pen in your backpack?",
              hints: ["There", "is", "a", "pen", "in", "my", "backpack"]
            },
            {
              question: "Do you have a pen?",
              hints: ["Yes", "there", "is", "a", "pen"]
            },
            {
              question: "Where is your pen?",
              hints: ["pen", "My", "is", "in", "the", "backpack"]
            }
          ],
          target_keywords: ["pen", "there", "is", "backpack", "yes", "have"],
          ack_options: ["Good!", "Great!", "Nice!"],
          recast_templates: [
            "There is a pen in your backpack!",
            "You have a pen!"
          ],
          success_criteria: "Student mentions pen"
        },
        {
          stepKey: "has_ruler",
          category: "Specific Item",
          question_variants: [
            {
              question: "Is there a ruler?",
              hints: ["There", "is", "a", "ruler", "in", "my", "backpack"]
            },
            {
              question: "Do you have a ruler in your backpack?",
              hints: ["Yes", "there", "is", "a", "ruler"]
            },
            {
              question: "Where is your ruler?",
              hints: ["ruler", "My", "is", "in", "the", "pencil", "case"]
            }
          ],
          target_keywords: ["ruler", "there", "is", "yes"],
          ack_options: ["Good!", "Great!", "Perfect!"],
          recast_templates: [
            "There is a ruler!",
            "You have a ruler!"
          ],
          success_criteria: "Student mentions ruler"
        },
        {
          stepKey: "student_question_1",
          category: "Student Inquiry",
          type: "invitation",
          question_variants: [
            {
              question: "Do you have a question for me?",
              hints: []
            },
            {
              question: "What do you want to ask me?",
              hints: []
            },
            {
              question: "Ask me anything!",
              hints: []
            }
          ],
          target_keywords: ["question", "ask", "want", "know", "what", "how", "why", "yes", "no"],
          ack_options: ["Great question!", "Good question!", "Nice question!"],
          recast_templates: [
            "You asked about {topic}!",
            "That's a great question!"
          ],
          success_criteria: "Student asks a question or says no",
          allow_skip: true
        },
        {
          stepKey: "has_book",
          category: "Specific Item",
          question_variants: [
            {
              question: "Is there a book?",
              hints: ["There", "is", "a", "book", "in", "my", "backpack"]
            },
            {
              question: "Do you have a book in your backpack?",
              hints: ["Yes", "there", "is", "a", "book"]
            },
            {
              question: "What book is in your backpack?",
              hints: ["book", "My", "English", "is", "in", "the", "backpack"]
            }
          ],
          target_keywords: ["book", "there", "is", "yes", "English", "math"],
          ack_options: ["Good!", "Great!", "Wonderful!"],
          recast_templates: [
            "There is a book!",
            "You have a book!"
          ],
          success_criteria: "Student mentions book"
        },
        {
          stepKey: "has_notebook",
          category: "Specific Item",
          question_variants: [
            {
              question: "Is there a notebook?",
              hints: ["There", "is", "a", "notebook", "in", "my", "backpack"]
            },
            {
              question: "Do you have a notebook?",
              hints: ["Yes", "there", "is", "a", "notebook"]
            },
            {
              question: "What color is your notebook?",
              hints: ["notebook", "My", "is", "blue", "and", "big"]
            }
          ],
          target_keywords: ["notebook", "there", "is", "yes", "blue", "red", "white"],
          ack_options: ["Nice!", "Great!", "Perfect!"],
          recast_templates: [
            "There is a notebook!",
            "Your notebook is {color}!"
          ],
          success_criteria: "Student mentions notebook"
        },
        {
          stepKey: "has_eraser",
          category: "Specific Item",
          question_variants: [
            {
              question: "Is there an eraser?",
              hints: ["There", "is", "an", "eraser", "in", "my", "backpack"]
            },
            {
              question: "Do you have an eraser?",
              hints: ["Yes", "there", "is", "an", "eraser"]
            },
            {
              question: "Where is your eraser?",
              hints: ["eraser", "My", "is", "in", "the", "pencil", "case"]
            }
          ],
          target_keywords: ["eraser", "there", "is", "yes"],
          ack_options: ["Good!", "Great!", "Nice!"],
          recast_templates: [
            "There is an eraser!",
            "You have an eraser!"
          ],
          success_criteria: "Student mentions eraser"
        },
        {
          stepKey: "student_question_2",
          category: "Student Inquiry",
          type: "invitation",
          question_variants: [
            {
              question: "Do you have another question?",
              hints: []
            },
            {
              question: "What else do you want to ask?",
              hints: []
            },
            {
              question: "You can ask me something!",
              hints: []
            }
          ],
          target_keywords: ["question", "ask", "want", "know", "what", "how", "why", "yes", "no"],
          ack_options: ["Great question!", "Good question!", "Nice question!"],
          recast_templates: [
            "You asked about {topic}!",
            "That's a great question!"
          ],
          success_criteria: "Student asks a question or says no",
          allow_skip: true
        },
        {
          stepKey: "favorite_item",
          category: "Preference",
          question_variants: [
            {
              question: "What is your favorite item? A pen, a book, or a ruler?",
              hints: ["favorite", "My", "item", "is", "the", "pen"]
            },
            {
              question: "Which item do you like most?",
              hints: ["like", "I", "the", "notebook", "most"]
            },
            {
              question: "What do you love in your backpack?",
              hints: ["love", "I", "my", "book"]
            }
          ],
          target_keywords: ["pen", "book", "ruler", "notebook", "favorite", "like", "love"],
          ack_options: ["Nice!", "Great!", "Wonderful!"],
          recast_templates: [
            "The {item} is your favorite!",
            "You love your {item}!"
          ],
          success_criteria: "Student names favorite item"
        },
        {
          stepKey: "backpack_ready",
          category: "Closing",
          question_variants: [
            {
              question: "Is your backpack ready for school?",
              hints: ["Yes", "my", "backpack", "is", "ready"]
            },
            {
              question: "Do you have everything you need?",
              hints: ["Yes", "I", "have", "everything"]
            },
            {
              question: "Are you ready for school?",
              hints: ["Yes", "I", "am", "ready"]
            }
          ],
          target_keywords: ["yes", "ready", "have", "everything"],
          ack_options: ["Perfect!", "Great!", "Wonderful!"],
          recast_templates: [
            "Your backpack is ready!",
            "You are ready for school!"
          ],
          success_criteria: "Student confirms readiness"
        },
        {
          stepKey: "goodbye",
          category: "Closing",
          type: "termination",
          canonical_question: "",
          target_keywords: [],
          ack_options: ["Wonderful!"],
          hints: [],
          recast_templates: [],
          goodbye_en: "Great job! Your backpack has many items! You are ready for school! Bye!",
          goodbye_vi: "Tuyệt lắm! Balo của bạn có nhiều đồ! Bạn sẵn sàng đi học! Tạm biệt!",
          success_criteria: "Mission complete"
        }
      ],
      
      minimum_turns: 15,
      maximum_turns: 20,
      expected_duration: "15+ minutes"
    },
    {
      mission_id: 2,
      title: "Classroom Treasure Hunt",
      title_vi: "Săn Kho Báu trong Lớp",
      theme: "Classroom Pointing Game",
      
      nova_greeting: "Let's play Treasure Hunt! I hide things in the classroom!", // DEPRECATED
      default_hints: ["There", "is", "a", "whiteboard"],
      
      mission_context: `This is Week 7 Mission 2 - Classroom Treasure Hunt. STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level. LANGUAGE RULES: Use VERY SIMPLE words. Max 8 words per sentence. ONLY ask about ITEMS using WHAT questions. GRAMMAR: "There is a [item]" pattern. Give FULL scaffolding: "Say: There is a whiteboard" or "Say: There is a desk". VOCABULARY: whiteboard, teacher, computer, pen, ruler, eraser, book, notebook, pencil case, backpack. STRICT FOCUS: ITEM IDENTIFICATION ONLY - Every question must be about WHAT item student sees. FORBIDDEN: Do NOT ask "Do you like...?", "What do you think...?", "How do you feel...?", "Do you want...?", "What color...?". ONLY allowed questions: "(Point 👉) What is this?", "(Point 👉) What do you see?", "Look here! What is it?". NEVER ask about preferences, feelings, or descriptions - ONLY IDENTIFY ITEMS WITH 'There is a...'.`,
      
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

      opening_narrative: "Hi! I'm Ms. Nova! 🔍 Let's play Treasure Hunt in my classroom! I hide many things! (Point 👉 at whiteboard) Look! I found something at the front! What is this? Say: There is a...",

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
      
      minimum_turns: 12,
      maximum_turns: 18,
      expected_duration: "12+ minutes"
    },
    {
      mission_id: 3,
      title: "The Magic Backpack",
      title_vi: "Chiếc Balo Phép Thuật",
      theme: "Magic Guessing Game",
      
      nova_greeting: "I have a magic backpack! Let's see what appears inside!", // DEPRECATED
      default_hints: ["There", "is", "a", "pen"],
      
      mission_context: `This is Week 7 Mission 3 - The Magic Backpack. STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level. LANGUAGE RULES: Use VERY SIMPLE words. Max 8 words per sentence. ONLY ask about ITEMS using WHAT questions. GRAMMAR: "There is a [item]" pattern. Give FULL scaffolding: "Say: There is a pen" or "Say: There is a notebook". VOCABULARY: whiteboard, teacher, computer, pen, ruler, eraser, book, notebook, pencil case, backpack. STRICT FOCUS: ITEM IDENTIFICATION ONLY - Every question must be about WHAT item is in the backpack. FORBIDDEN: Do NOT ask "Do you like...?", "What do you think...?", "How do you feel...?", "Do you want...?", "What color...?", "Is it big?". ONLY allowed questions: "(Feel 👋) What is it?", "(Shake 🎒) What do you hear?", "What is this item?". NEVER ask about preferences, feelings, or descriptions - ONLY GUESS ITEMS WITH 'There is a...'.`,
      
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
      
      minimum_turns: 12,
      maximum_turns: 18,
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

  // ✨ DYNAMIC ROLEPLAY SCENARIOS (3 HIGH-QUALITY SCENARIOS ONLY)
  roleplay_scenarios: [
      {
        id: "rp_backpack_check",
        title: "Backpack Checklist 🎒",
        title_en: "Backpack Checklist",
        title_vi: "Kiểm tra Balo",
        emoji: "🎒",
        description: "Check if you have all school supplies with Ms. Nova!",
        
        // AI Persona
        ai_role: "Teacher (Ms. Nova) - Checks supplies",
        user_role: "Student - Shows backpack contents",
        context: "School starts tomorrow! Ms. Nova helps check if student has all 5 supplies in backpack. CRITICAL: Questions must offer 2 item choices with OR.",
        
        // Pedagogical Focus
        vocab_focus: ["pen", "ruler", "eraser", "book", "notebook", "pencil case", "backpack"],
        
        // Opening (MUST have OR)
        opening_line: "Good morning! Let's check your backpack for tomorrow! 🎒 First check (1/5): Do you have a pen or a ruler in your backpack? Say: There is a pen OR There is a ruler.",
        
        // Guide rules - SUPER STRICT
        guide_rules: "CRITICAL CHECKLIST RULES: (1) Check 5 supplies (track 1/5 to 5/5). (2) EVERY question MUST use: 'Do you have a [item A] or a [item B]?' (3) Student answers: 'There is a [item]' or 'There is a [item] in my backpack'. (4) React: 'Great! ✓ Check 2/5: Next item...' (5) Progress through checklist: pen → ruler → eraser → book → notebook. (6) When 5/5: 'All done! Your backpack is ready! 🎉' (7) ONE question per turn. FORBIDDEN: 'Can you see?' alone. 'Do you have?' without OR. 'What's in your backpack?' ONLY use: 'Do you have [item A] or [item B]?' format.",
        
        // Backup questions (ALL use OR)
        backup_questions: [
          "Check 2/5: Do you have a ruler or an eraser? Say: There is a ruler OR There is an eraser.",
          "Check 3/5: Do you have an eraser or a book? Say: There is an eraser OR There is a book.",
          "Check 4/5: Do you have a book or a notebook? Say: There is a book OR There is a notebook.",
          "Check 5/5: Last one! Do you have a notebook or a pencil case? Say: There is a notebook OR There is a pencil case.",
          "Bonus check: Do you have a pen or a book? Say: There is a pen OR There is a book."
        ]
      },
      {
        id: "rp_classroom_quiz",
        title: "Classroom Item Quiz 📝",
        title_en: "Classroom Item Quiz",
        title_vi: "Đố vui Đồ vật Lớp học",
        emoji: "📝",
        description: "Take Ms. Nova's quiz about classroom items!",
        
        ai_role: "Quiz Master (Ms. Nova) - Asks questions",
        user_role: "Quiz Taker - Student answers",
        context: "Ms. Nova gives a 5-question quiz: 'What is this?' Student answers using 'There is a...' pattern. CRITICAL: Questions show 2 items with OR.",
        
        vocab_focus: ["whiteboard", "computer", "desk", "chair", "book", "pen", "ruler", "teacher"],
        
        opening_line: "Classroom Quiz Time! 📝 Question 1/5: (Show picture) Is this a whiteboard or a computer? Say: There is a whiteboard OR There is a computer.",
        
        guide_rules: "CRITICAL QUIZ RULES: (1) Show progress: Question 1/5, 2/5, etc. (2) Show item (use emoji or 'picture') and ask: 'Is this a [item A] or a [item B]?' (3) Student answers: 'There is a [item]'. (4) React: 'Correct! ✓ Question 2/5...' (5) Quiz items: whiteboard, computer, desk, chair, book, pen, ruler. (6) ONE question per turn. FORBIDDEN: 'What is this?' without OR. 'Can you tell me?' alone. ONLY use: 'Is this a [item A] or a [item B]?' format.",
        
        backup_questions: [
          "Question 2/5: (📚) Is this a book or a pen? Say: There is a book OR There is a pen.",
          "Question 3/5: (✏️) Is this a pen or a ruler? Say: There is a pen OR There is a ruler.",
          "Question 4/5: (📐) Is this a ruler or an eraser? Say: There is a ruler OR There is an eraser.",
          "Question 5/5: (🪑) Is this a desk or a chair? Say: There is a desk OR There is a chair.",
          "Bonus! (💻) Is this a computer or a whiteboard? Say: There is a computer OR There is a whiteboard."
        ]
      },
      {
        id: "rp_supply_hunt",
        title: "Supply Treasure Hunt 🔍",
        title_en: "Supply Treasure Hunt",
        title_vi: "Săn kho báu Đồ dùng",
        emoji: "🔍",
        description: "Find hidden school supplies in the classroom!",
        
        ai_role: "Game Master (Ms. Nova) - Hides supplies",
        user_role: "Finder - Student searches",
        context: "Ms. Nova hid 5 school supplies around classroom. Student finds them and describes what they found using 'There is a...' CRITICAL: Questions offer 2 item choices with OR.",
        
        vocab_focus: ["pen", "book", "ruler", "eraser", "notebook", "desk", "chair", "drawer"],
        
        opening_line: "Supply Treasure Hunt! 🔍 I hid 5 items! Find #1 (1/5): Look on the desk! Do you see a pen or a book? Say: There is a pen OR There is a book.",
        
        guide_rules: "CRITICAL HUNT RULES: (1) Track progress: Item 1/5 to 5/5. (2) Tell location to search: 'Look on the desk!', 'Check in the drawer!' (3) Ask: 'Do you see a [item A] or a [item B]?' (4) Student answers: 'There is a [item]'. (5) React: 'You found it! ⭐ Item 2/5: Look in the drawer!' (6) When 5/5: 'All supplies found! You win! 🏆' (7) Hide spots: on desk, in drawer, under chair, on floor, in bag. (8) ONE question per turn. FORBIDDEN: 'What do you see?' alone. 'Can you find?' without OR. ONLY use: 'Do you see [item A] or [item B]?' format.",
        
        backup_questions: [
          "Item 2/5: Look in the drawer! Do you see a ruler or an eraser? Say: There is a ruler OR There is an eraser.",
          "Item 3/5: Check under the chair! Do you see a book or a notebook? Say: There is a book OR There is a notebook.",
          "Item 4/5: Look on the floor! Do you see an eraser or a pen? Say: There is an eraser OR There is a pen.",
          "Item 5/5: Last one! Check in the bag! Do you see a notebook or a pencil case? Say: There is a notebook OR There is a pencil case.",
          "Bonus item! Look on the desk! Do you see a ruler or a book? Say: There is a ruler OR There is a book."
        ]
      }
    ]
};

export default week7RealData;
