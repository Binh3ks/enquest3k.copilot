const week5RealData = {
  // === METADATA ===
  week_id: 5,
  phase: 1,
  block: "A",
  unit: 1,
  week_number: 5,
  
  // === OFFICIAL SYLLABUS DATA ===
  title: "Week 5: The Mystery House",
  week_title_en: "The Mystery House (Rooms & Furniture)",
  week_title_vi: "Ngôi nhà Bí ẩn (Phòng & Đồ đạc)",
  
  topic: "Nouns - Exploring rooms and furniture",
  topic_vi: "Danh từ - Khám phá phòng và đồ đạc",
  
  // === KEY LEARNING OUTCOME ===
  learning_outcome: "Label parts of a house correctly using articles A/An.",
  learning_outcome_vi: "Gọi tên các bộ phận của ngôi nhà chính xác bằng mạo từ A/An.",
  
  // === GRAMMAR FOCUS (IMPLICIT) ===
  grammar_focus: "Articles 'A/An'",
  grammar_pattern: "A/An [noun]",
  grammar_examples: [
    "This is a bedroom.",
    "There is an apple.",
    "I see a chair.",
    "It is a kitchen."
  ],
  
  // === TARGET VOCABULARY (TIER 1 - A0++ EASY MODE = SYLLABUS BASE) ===
  target_vocab: [
    {
      word: "bedroom",
      pronunciation: "/ˈbed.ruːm/",
      definition_vi: "phòng ngủ",
      definition_en: "a room for sleeping",
      example: "This is a bedroom.",
      syllabus_context: "Rooms"
    },
    {
      word: "kitchen",
      pronunciation: "/ˈkɪtʃ.ən/",
      definition_vi: "nhà bếp",
      definition_en: "a room for cooking",
      example: "Mom is in the kitchen.",
      syllabus_context: "Rooms"
    },
    {
      word: "bathroom",
      pronunciation: "/ˈbæθ.ruːm/",
      definition_vi: "phòng tắm",
      definition_en: "a room for washing",
      example: "The bathroom is clean.",
      syllabus_context: "Rooms"
    },
    {
      word: "living_room",
      pronunciation: "/ˈlɪv.ɪŋ ruːm/",
      definition_vi: "phòng khách",
      definition_en: "a room where family sits together",
      example: "We watch TV in the living room.",
      syllabus_context: "Rooms"
    },
    {
      word: "bed",
      pronunciation: "/bed/",
      definition_vi: "giường",
      definition_en: "furniture for sleeping",
      example: "I sleep on a bed.",
      syllabus_context: "Furniture"
    },
    {
      word: "chair",
      pronunciation: "/tʃer/",
      definition_vi: "ghế",
      definition_en: "furniture for sitting",
      example: "Sit on the chair.",
      syllabus_context: "Furniture"
    },
    {
      word: "table",
      pronunciation: "/ˈteɪ.bəl/",
      definition_vi: "bàn",
      definition_en: "furniture with a flat top",
      example: "The book is on the table.",
      syllabus_context: "Furniture"
    },
    {
      word: "house",
      pronunciation: "/haʊs/",
      definition_vi: "ngôi nhà",
      definition_en: "a building where people live",
      example: "This is my house.",
      syllabus_context: "Building"
    },
    {
      word: "mystery",
      pronunciation: "/ˈmɪs.tər.i/",
      definition_vi: "bí ẩn",
      definition_en: "something strange and interesting",
      example: "It is a mystery house.",
      syllabus_context: "Theme"
    },
    {
      word: "explore",
      pronunciation: "/ɪkˈsplɔːr/",
      definition_vi: "khám phá",
      definition_en: "to look around and discover",
      example: "Let's explore the house.",
      syllabus_context: "Action"
    }
  ],
  
  global_vocab: ["bedroom", "kitchen", "bathroom", "living_room", "bed", "chair", "table", "house", "mystery", "explore"],
  
  // === 3 STORY MISSIONS ===
  story_missions: [
    {
      mission_id: 1,
      title: "Exploring My House",
      title_vi: "Khám phá Ngôi nhà",
      theme: "Rooms",
      
      // 🎭 STORY CHARACTER (like roleplay ai_role)
      story_character: {
        name: "Ms. Nova",
        personality: "Curious, enthusiastic, loves visiting houses",
        backstory: "Ms. Nova travels the world visiting different houses. She's excited to see YOUR house today!",
        speaking_style: "Friendly, asks follow-up questions, shares details about her own house",
        facts: {
          house_size: "small",
          house_color: "blue",
          favorite_room: "bedroom",
          bedroom_color: "blue",
          has_pet: true,
          pet_type: "cat",
          pet_name: "Whiskers",
          favorite_furniture: "bed"
        }
      },
      
      // 🎬 OPENING NARRATIVE (replaces nova_greeting)
      opening_narrative: "Hi! I'm Ms. Nova! I travel around the world looking at cool houses. Today I'm visiting YOUR house! I'm so excited! What do I call you?",
      
      nova_greeting: "Hi! Let's explore your house together!", // DEPRECATED - use opening_narrative
      
      mission_context: `This is Week 5 Mission 1 - Room Exploration. STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level (just starting English). LANGUAGE RULES: Use VERY SIMPLE words. Max 8 words per sentence. Ask OPEN-ENDED questions (What...? Tell me about...?) NOT Yes/No. GRAMMAR: Articles A/An (This is a kitchen). VOCABULARY: bedroom, kitchen, bathroom, living_room, bed, chair, table. ENCOURAGE: Invite student to ask YOU questions every 3-4 turns. AVOID: Complex grammar, past tense. FOCUS: Rooms and basic furniture only.`,
      
      target_vocab: ["bedroom", "kitchen", "bathroom", "living_room", "bed", "chair"],
      
      grammar_pattern: "This is a/an [noun]",
      
      // 📖 STORY ARC (phases with turn ranges)
      story_arc: [
        {
          phase: "introduction",
          turns: "1-5",
          goal: "Learn student's name, basic house info",
          required_vocab: [],
          phase_questions: [
            "What do I call you?",
            "Is your house big or small?",
            "What color is your house? Blue, white, or red?",
            "Do you live in a house or an apartment?",
            "How many rooms are in your house? Two, three, or more?"
          ]
        },
        {
          phase: "room_exploration",
          turns: "6-12",
          goal: "Explore DIFFERENT rooms (bedroom, living room, kitchen)",
          required_vocab: ["bedroom", "kitchen", "bathroom", "living_room"],
          phase_questions: [
            "What is your favorite room? Bedroom, living room, or kitchen?",
            "What is in the living room? A sofa, a TV, or a table?",
            "What is in the kitchen? A fridge, a table, or chairs?",
            "Do you have a bathroom? Is it big or small?",
            "Where do you eat? In the kitchen or living room?"
          ]
        },
        {
          phase: "family_and_activities",
          turns: "13-17",
          goal: "Ask about people and activities",
          required_vocab: [],
          phase_questions: [
            "Who lives in your house? Mom, Dad, or siblings?",
            "Where do you play? In your bedroom or living room?",
            "What do you do in your bedroom? Sleep, play, or read?",
            "Do you have a pet? A dog, a cat, or a fish?",
            "Where does your pet sleep? In your room or another room?"
          ]
        },
        {
          phase: "conclusion",
          turns: "18-20",
          goal: "Wrap up, say goodbye",
          required_vocab: [],
          phase_questions: [
            "Your house is wonderful! What is your favorite thing in your house?",
            "Thank you for showing me your house! I had fun!",
            "Goodbye! I hope to visit again!"
          ]
        }
      ],
      
      // 🎯 TURN LIMIT (like roleplay)
      minimum_turns: 15,
      maximum_turns: 20,
      
      objectives: [
        {
          stepKey: "student_name",
          category: "Identity",
          question_variants: [
            {
              question: "What is your name?",
              hints: ["name", "is", "My", "I", "am"]
            },
            {
              question: "Can you tell me your name?",
              hints: ["is", "My", "name", "tell", "you", "I"]
            },
            {
              question: "What do I call you?",
              hints: ["call", "me", "You", "can", "My", "name"]
            }
          ],
          target_keywords: ["my", "name", "is", "I", "am"],
          ack_options: ["Nice!", "Great!", "Wonderful!"],
          recast_templates: [
            "Your name is {name}!",
            "You are {name}!"
          ],
          success_criteria: "Student says their name"
        },
        {
          stepKey: "house_has_rooms",
          category: "Rooms",
          question_variants: [
            {
              question: "What rooms are in your house?",
              hints: ["My", "house", "has", "a", "bedroom", "and", "kitchen"]
            },
            {
              question: "Tell me about your house.",
              hints: ["has", "It", "a", "living", "room", "and", "bathroom"]
            },
            {
              question: "What does your house have?",
              hints: ["has", "My", "house", "rooms", "many"]
            }
          ],
          target_keywords: ["bedroom", "kitchen", "bathroom", "living", "room", "rooms", "house"],
          ack_options: ["Nice!", "Great!", "Wonderful!"],
          recast_templates: [
            "Your house has a {room}!",
            "You have a {room} in your house!"
          ],
          success_criteria: "Student names at least one room"
        },
        {
          stepKey: "favorite_room",
          category: "Preference",
          question_variants: [
            {
              question: "What is your favorite room?",
              hints: ["favorite", "My", "room", "is", "the", "bedroom"]
            },
            {
              question: "Which room do you like?",
              hints: ["like", "I", "the", "living", "room", "most"]
            },
            {
              question: "What room do you love?",
              hints: ["love", "I", "my", "bedroom", "the", "most"]
            }
          ],
          target_keywords: ["bedroom", "kitchen", "bathroom", "living room", "favorite", "like", "love"],
          ack_options: ["Nice!", "Great!", "Wonderful!"],
          recast_templates: [
            "The {room} is your favorite!",
            "You love the {room}!"
          ],
          success_criteria: "Student names favorite room"
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
          stepKey: "bedroom_has_what",
          category: "Furniture",
          question_variants: [
            {
              question: "What is in your bedroom?",
              hints: ["In", "my", "bedroom", "is", "a", "bed"]
            },
            {
              question: "What does your bedroom have?",
              hints: ["has", "It", "a", "bed", "and", "chair"]
            },
            {
              question: "Tell me about your bedroom.",
              hints: ["bedroom", "My", "has", "a", "bed", "big"]
            }
          ],
          target_keywords: ["bed", "chair", "table", "desk", "lamp", "has", "in"],
          ack_options: ["Nice!", "Great!", "Wonderful!"],
          recast_templates: [
            "Your bedroom has a {item}!",
            "There is a {item} in your bedroom!"
          ],
          success_criteria: "Student names furniture in bedroom"
        },
        {
          stepKey: "kitchen_has_what",
          category: "Kitchen Items",
          question_variants: [
            {
              question: "What is in the kitchen?",
              hints: ["In", "the", "kitchen", "is", "a", "table"]
            },
            {
              question: "What does your kitchen have?",
              hints: ["has", "It", "a", "big", "table", "and", "chairs"]
            },
            {
              question: "Tell me about the kitchen.",
              hints: ["kitchen", "The", "has", "table", "and", "chairs"]
            }
          ],
          target_keywords: ["table", "chair", "chairs", "stove", "sink", "fridge", "has"],
          ack_options: ["Nice!", "Great!", "Wonderful!"],
          recast_templates: [
            "The kitchen has a {item}!",
            "There is a {item} in the kitchen!"
          ],
          success_criteria: "Student names items in kitchen"
        },
        {
          stepKey: "where_do_you_sleep",
          category: "Activity Location",
          question_variants: [
            {
              question: "Where do you sleep?",
              hints: ["sleep", "I", "in", "the", "bedroom", "on", "bed"]
            },
            {
              question: "Which room do you sleep in?",
              hints: ["I", "sleep", "in", "my", "bedroom"]
            },
            {
              question: "Where is your bed?",
              hints: ["bed", "My", "is", "in", "the", "bedroom"]
            }
          ],
          target_keywords: ["bedroom", "bed", "sleep", "in", "my"],
          ack_options: ["Nice!", "Great!", "Wonderful!"],
          recast_templates: [
            "You sleep in the {room}!",
            "Your bed is in the {room}!"
          ],
          success_criteria: "Student says they sleep in bedroom"
        },
        {
          stepKey: "student_question_2",
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
              question: "You can ask me a question now!",
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
          stepKey: "where_do_you_eat",
          category: "Activity Location",
          question_variants: [
            {
              question: "Where do you eat?",
              hints: ["eat", "I", "in", "the", "kitchen", "at", "table"]
            },
            {
              question: "Which room do you eat in?",
              hints: ["I", "eat", "in", "the", "kitchen"]
            },
            {
              question: "Where is your table?",
              hints: ["table", "My", "is", "in", "the", "kitchen"]
            }
          ],
          target_keywords: ["kitchen", "table", "eat", "dining room", "in"],
          ack_options: ["Nice!", "Great!", "Wonderful!"],
          recast_templates: [
            "You eat in the {room}!",
            "The table is in the {room}!"
          ],
          success_criteria: "Student says where they eat"
        },
        {
          stepKey: "house_is_big_or_small",
          category: "Description",
          question_variants: [
            {
              question: "Is your house big or small?",
              hints: ["house", "My", "is", "big", "and", "nice"]
            },
            {
              question: "What is your house like?",
              hints: ["is", "It", "small", "but", "cozy"]
            },
            {
              question: "Tell me about your house size.",
              hints: ["house", "My", "is", "medium", "size"]
            }
          ],
          target_keywords: ["big", "small", "large", "tiny", "medium", "nice", "beautiful"],
          ack_options: ["Nice!", "Great!", "Wonderful!"],
          recast_templates: [
            "Your house is {size}!",
            "You have a {size} house!"
          ],
          success_criteria: "Student describes house size"
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
          goodbye_en: "Great job! You showed me all the rooms! Your house is wonderful! Bye!",
          goodbye_vi: "Tuyệt lắm! Bạn đã chỉ tất cả các phòng! Ngôi nhà của bạn thật tuyệt! Tạm biệt!",
          success_criteria: "Mission complete"
        }
      ],
      
      minimum_turns: 15,
      maximum_turns: 20,
      expected_duration: "15+ minutes"
    },
    {
      mission_id: 2,
      title: "The Dark Room",
      title_vi: "Căn Phòng Tối",
      theme: "Grammar a/an Game",
      
      nova_greeting: "Oh no! The house is so dark! I have a flashlight. Let's look!",
      default_hints: ["There", "is", "a", "table"],
      
      mission_context: `This is Week 5 Mission 2 - The Dark Room (Flashlight Game). 

STRICT GAME RULES:
1. Ms. Nova ONLY shines flashlight on objects and asks "What is this?" or "What do you see?"
2. Student MUST answer: "There is a/an [object]"
3. Ms. Nova corrects a/an errors: "Oops! AN apple. Say again!"
4. Then shine on NEXT object immediately

FORBIDDEN:
- Do NOT ask personal questions (age, name, feelings)
- Do NOT change topic
- STAY IN CHARACTER as flashlight explorer

GRAMMAR ENFORCEMENT: Every student answer must use "There is a/an..."
VOCABULARY: apple, egg, umbrella, octopus, spider, cat, book, lamp (test vowels!)
EXCITEMENT: Use sounds (Wow! Eww! Oh!) and emojis 🔦🍎🥚☂️`,
      
      target_vocab: ["book", "notebook", "chair", "table", "bed", "bedroom", "kitchen", "bathroom", "living_room", "house"],
      
      grammar_pattern: "There is a/an [noun]",

      // === STORY MODE CONFIGURATION ===
      story_character: {
        name: "Ms. Nova",
        personality: "adventurous, playful, loves surprises and discoveries",
        backstory: "The house has a blackout! It's so dark! Good thing I have a flashlight. Let's explore together!",
        speaking_style: "excited, uses sound effects (Wow! Eww! Oh!), corrects a/an errors gently but immediately",
        facts: [
          "I have a flashlight to explore dark rooms!",
          "I love finding surprise objects in the dark!",
          "I will shine my light on different things!",
          "I help you say 'a' or 'an' correctly!",
          "I love adventure and surprises!"
        ],
        role: "Explorer with flashlight discovering objects in darkness"
      },

      opening_narrative: "Oh no! So dark! 🌑 I have a flashlight! 🔦 (Shine on table) Wow! What is this? There is a...",

      story_arc: [
        {
          phase: "intro",
          turns: "1-4",
          phase_name: "Darkness and Flashlight",
          focus: "Establish grammar pattern with simple objects",
          phase_questions: [
            "(Shine 🔦 on book 📖) What is this? There is a...",
            "(Shine 🔦 on chair 🪑) What do you see? There is a...",
            "(Shine 🔦 on bed 🛏️) For sleeping! There is a...",
            "(Shine 🔦 on kitchen 🍳) A room! There is a..."
          ],
          example_answers: [
            "There is a book",
            "There is a chair", 
            "There is a table",
            "There is a bed"
          ]
        },
        {
          phase: "vowel_trap",
          turns: "5-12",
          phase_name: "More Objects Challenge",
          focus: "Practice with more furniture and objects",
          phase_questions: [
            "(Shine 🔦 on notebook 📓) For writing! There is a...",
            "(Shine 🔦 on bedroom 🚪) A room for sleeping! There is a...",
            "(Shine 🔦 on bathroom 🚿) A room for washing! There is a...",
            "(Shine 🔦 on living room 🛋️) A room for family! There is a...",
            "(Shine 🔦 on chair 🪑) You sit here! There is a...",
            "(Shine 🔦 on table 🪑) You eat here! There is a...",
            "(Shine 🔦 on book 📖) You read this! There is a...",
            "(Shine 🔦 on house 🏠) Where you live! There is a..."
          ],
          example_answers: [
            "There is a notebook",
            "There is a bed",
            "There is a chair", 
            "There is a table",
            "There is a book",
            "There is a bedroom",
            "There is a kitchen",
            "There is a bathroom"
          ]
        },
        {
          phase: "speed_round",
          turns: "13-16",
          phase_name: "Quick Discovery",
          focus: "Fast-paced practice",
          phase_questions: [
            "(Shine quickly) What is this? Quick! There is...",
            "(Shine on floor) What do you see? There is...",
            "(Shine in corner) Surprise! What is it? There is...",
            "Great job! What was the hardest word?"
          ]
        },
        {
          phase: "conclusion",
          turns: "17-18",
          phase_name: "Lights On",
          focus: "Celebrate learning a/an",
          phase_questions: [
            "The lights are back! ✨ Tell me one thing we found. There is...",
            "Perfect! You learned A and AN! Bye bye! 👋"
          ]
        }
      ],
      
      minimum_turns: 12,
      maximum_turns: 18,
      expected_duration: "12+ minutes"
    },
    {
      mission_id: 3,
      title: "The Mystery Box",
      title_vi: "Chiếc Hộp Bí Ẩn",
      theme: "Guessing Game",
      
      nova_greeting: "Look! I found an old mystery box! Let's see what's inside!",
      default_hints: ["There", "is", "a", "book"],
      
      mission_context: `This is Week 5 Mission 3 - The Mystery Box (Riddle Game). STUDENT PROFILE: 6-12 years old, A0+ level. LANGUAGE: SIMPLE, PLAYFUL words, max 8 words/sentence. GRAMMAR FOCUS: "There is a/an..." - Student guesses objects in mystery box. VOCABULARY: book, notebook, chair, table, bed, bedroom, kitchen, bathroom, house, living_room. THEME: Mystery box riddle game. MECHANIC: Ms. Nova describes what she feels WITHOUT looking, student guesses using "There is...". CLUES: Use touch (flat, soft, hard), shapes (square, round), function (for sleeping, for sitting). CORRECT a/an ERRORS: "Oops! A bedroom. Try again!" ENCOURAGE: Excitement when they guess correctly. AVOID: Making it too hard. FOCUS: Turn grammar practice into exciting guessing game.`,
      
      target_vocab: ["book", "notebook", "chair", "table", "bed", "bedroom", "kitchen", "bathroom", "house", "living_room"],
      
      grammar_pattern: "There is a/an [noun]",

      // === STORY MODE CONFIGURATION ===
      story_character: {
        name: "Ms. Nova",
        personality: "mysterious, playful, loves riddles and surprises",
        backstory: "I found an old magic box in the Mystery House! I can't see inside, but I can feel and hear things. Let's guess together!",
        speaking_style: "mysterious, uses riddle language, gives clear clues, celebrates correct guesses",
        facts: [
          "I found a mystery box in an old house!",
          "I reach inside but can't see the objects!",
          "I describe what I feel or hear!",
          "I love when you guess correctly!",
          "I help you say 'a' or 'an' correctly!"
        ],
        role: "Mystery box host giving riddles for student to guess"
      },

      opening_narrative: "Look! 📦 A mystery box! (Touch touch) I feel something flat with pages... There is a...",

      story_arc: [
        {
          phase: "intro",
          turns: "1-3",
          phase_name: "Mystery Box Opens",
          focus: "Introduce guessing game with school objects",
          phase_questions: [
            "(Feel 👋 flat with pages 📖) What is it? There is a...",
            "(Feel 👋 small for writing 📓) What is this? There is a...",
            "(Feel 👋 has four legs 🪑) You sit here! There is a..."
          ],
          example_answers: [
            "There is a book",
            "There is a notebook",
            "There is a chair"
          ]
        },
        {
          phase: "sound_clues",
          turns: "4-8",
          phase_name: "More Objects",
          focus: "Guess more objects from the house",
          phase_questions: [
            "(Feel 👋 flat and big 🪑) You eat here! There is a...",
            "(Feel 👋 soft and big 🛏️) You sleep here! There is a...",
            "(Feel 👋 a room with door 🚪) For sleeping! There is a...",
            "(Feel 👋 a room 🍳) For cooking! There is a...",
            "(Feel 👋 a room 🚿) For washing! There is a..."
          ],
          example_answers: [
            "There is a table",
            "There is a bed",
            "There is a bedroom",
            "There is a kitchen",
            "There is a bathroom"
          ]
        },
        {
          phase: "feeling_clues",
          turns: "9-14",
          phase_name: "Final Objects",
          focus: "Complete the mystery box game",
          phase_questions: [
            "(Feel 👋 big building 🏠) Where you live! There is a...",
            "(Feel 👋 a room 🛋️) For family time! There is a...",
            "(Feel 👋 in bedroom 🛏️) You sleep here! There is a...",
            "(Feel 👋 flat surface 🪑) You eat here! There is a...",
            "(Feel 👋 has four legs 🪑) You sit here! There is a...",
            "(Feel 👋 has pages 📖) You read this! There is a..."
          ],
          example_answers: [
            "There is a house",
            "There is a book",
            "There is a chair",
            "There is a bed",
            "There is a table",
            "There is a notebook"
          ]
        },
        {
          phase: "conclusion",
          turns: "15-18",
          phase_name: "Mystery Box Complete!",
          focus: "Celebrate all the discoveries",
          phase_questions: [
            "We found everything in the mystery box! 🎉 What was your favorite?",
            "Great job! You learned so many words! Ready to say goodbye?",
            "Perfect! See you next time! 👋"
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
    week_title: "The Mystery House",
    week_number: 5,
    theme: "Rooms and Furniture",
    
    knowledge_base: [
      "Rooms in a house: bedroom, kitchen, bathroom, living room",
      "Furniture: bed, chair, table, desk, lamp, mirror",
      "Grammar: Articles A/An (This is a bedroom, There is an apple)",
      "We sleep in the bedroom on a bed",
      "We cook and eat in the kitchen at a table",
      "We wash in the bathroom",
      "We relax in the living room with family",
      "Different houses have different numbers of rooms",
      "Furniture helps us live comfortably",
      "We can explore and describe our house in English"
    ],
    
    example_opening_questions: [
      "What rooms are in your house?",
      "What is your favorite room?",
      "Where do you sleep?",
      "What furniture is in your bedroom?",
      "Do you have a big house?",
      "What color is your house?",
      "Who lives in your house?"
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
      id: 'week5_house_tour',
      label_en: "House Tour Guide 🏠",
      label_vi: "Hướng dẫn viên Tham quan Nhà 🏠",
      icon: "🏠",
      ai_role: "Friendly house tour guide showing a mystery house",
      user_role: "Visitor exploring the house",
      intro: "Welcome! I'm your guide today. This is a very special mystery house. Let me show you around!",
      context: "Week 5 theme - Rooms & Furniture. AI acts as enthusiastic tour guide pointing out rooms (bedroom, kitchen, bathroom, living room) and furniture (bed, chair, table). Guide asks visitor what they see, what they like, and teaches names using 'This is a...', 'There is a...' patterns. Guide should be friendly, encouraging, and use simple words suitable for A0+ level."
    }
  },

  // ✨ DYNAMIC ROLEPLAY SCENARIOS (Data-Driven Architecture) - TOP LEVEL!
  roleplay_scenarios: [
      {
        id: "rp_designer",
        title: "Room Designer 🎨",
        emoji: "🎨",
        description: "Design a beautiful room for Ms. Nova!",
        
        // AI Persona
        ai_role: "Client (Ms. Nova)",
        user_role: "Interior Designer",
        context: "Ms. Nova wants to redesign her empty room. She needs furniture suggestions and color choices.",
        
        // Pedagogical Focus
        vocab_focus: ["bed", "sofa", "lamp", "table", "chair", "mirror", "rug", "blue", "white", "red", "green", "big", "small"],
        
        // Opening (MUST be a question)
        opening_line: "Hello Designer! My room is empty. What furniture should I put in it first? A bed, a sofa, or a table?",
        
        // Guide rules for AI behavior
        guide_rules: "Accept any furniture suggestion. React positively. Then ask about color ('What color do you like?') or size ('Do you want a big one or a small one?'). Use complete sentences. Always end with a question.",
        
        // CRITICAL: Backup questions for code enforcement
        backup_questions: [
          "What color do you like? Blue, white, or red?",
          "Do you want a big one or a small one?",
          "What else do you need? A lamp, a mirror, or a rug?",
          "Where should I put it? Near the door or near the window?",
          "Do you like it? Should I add more things?"
        ]
      },
      {
        id: "rp_tour",
        title: "House Tour 🏠",
        emoji: "🏠",
        description: "Show Ms. Nova your house!",
        
        ai_role: "Visitor (Ms. Nova)",
        user_role: "House Owner / Host",
        context: "Ms. Nova is visiting the student's house for the first time. She is curious about every room.",
        
        vocab_focus: ["bedroom", "kitchen", "bathroom", "living room", "door", "window", "bed", "table", "chair", "sofa"],
        
        opening_line: "Ding-dong! Hello! Your house looks nice! Which room can we see first? The bedroom, the kitchen, or the living room?",
        
        guide_rules: "Be curious and polite. Ask 'What is this?' or 'Where is the...?' questions. React with interest ('Wow!' 'Beautiful!'). Always end with a question to keep conversation going.",
        
        backup_questions: [
          "What can you see in this room? A bed, a chair, or a table?",
          "What color is it? Is it blue, white, or brown?",
          "Where is the kitchen? Can we see it next?",
          "Do you have a big bedroom or a small bedroom?",
          "What do you like most? The bed, the lamp, or the window?"
        ]
      },
      {
        id: "rp_shop",
        title: "Furniture Shop 🛋️",
        emoji: "🛋️",
        description: "Buy furniture with Ms. Nova at the shop!",
        
        ai_role: "Shopkeeper",
        user_role: "Customer",
        context: "The student wants to buy furniture for their house. Ms. Nova is the friendly shopkeeper helping them choose.",
        
        vocab_focus: ["sofa", "bed", "table", "chair", "lamp", "mirror", "blue", "white", "red", "expensive", "cheap", "big", "small"],
        
        opening_line: "Welcome to my Furniture Shop! We have sofas, beds, tables, and lamps. What do you want to buy today?",
        
        guide_rules: "Be helpful and friendly. Suggest items. Ask about color, size, and quantity ('How many do you need?'). Mention prices if student asks. Always end with a question.",
        
        backup_questions: [
          "What color do you want? We have blue, white, and red.",
          "Do you want a big sofa or a small sofa?",
          "How many chairs do you need? One, two, or three?",
          "Do you like this lamp? It is cheap!",
          "What else do you want to buy? A table, a mirror, or a rug?"
        ]
      }
    ]
};

export default week5RealData;
