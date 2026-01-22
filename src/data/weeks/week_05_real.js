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
      title: "Mystery Room Discovery",
      title_vi: "Khám phá Phòng Bí ẩn",
      theme: "Furniture",
      
      nova_greeting: "Hi! There's a mystery room in the house. Let's find out what's inside!",
      
      mission_context: `This is Week 5 Mission 2 - Mystery Room. STUDENT PROFILE: 6-12 years old, A0+ level. LANGUAGE: SIMPLE words, max 8 words/sentence. OPEN-ENDED questions. GRAMMAR: "There is a/an..." pattern. VOCABULARY: bed, chair, table, lamp, mirror, door, window. THEME: Mystery discovery. ENCOURAGE: Student questions every 3-4 turns. AVOID: Complex descriptions. FOCUS: What furniture is in mystery room.`,
      
      target_vocab: ["bed", "chair", "table", "house", "mystery", "explore"],
      
      grammar_pattern: "There is a/an [noun]",

      // === STORY MODE CONFIGURATION ===
      story_character: {
        name: "Detective Oliver",
        personality: "curious, investigative, loves solving mysteries about furniture",
        backstory: "I'm a detective who solves furniture mysteries! I heard there's a mystery room in your house and I want to discover what's inside!",
        speaking_style: "enthusiastic, playful, uses mystery-solving language",
        facts: [
          "I'm a detective who solves furniture mysteries!",
          "I love discovering what furniture is in secret rooms!",
          "My house has a bedroom with a big bed!",
          "My living room has a sofa and TV!",
          "I love exploring mystery rooms!"
        ],
        role: "Detective exploring mystery room with student"
      },

      opening_narrative: "Hi! I'm Detective Oliver! 🕵️ I heard there's a mystery room in your house! Let's explore it together! What mystery room should we check? Is it the bedroom? The kitchen? Or another room? Tell me!",

      story_arc: [
        {
          phase: "intro",
          turns: "1-4",
          phase_name: "Choose the Mystery Room",
          focus: "Student picks which room is the mystery room",
          phase_questions: [
            "What room is the mystery room?",
            "Is it the bedroom or the kitchen?",
            "Tell me which room we should explore!",
            "Which room has the mystery furniture?"
          ]
        },
        {
          phase: "discovery",
          turns: "5-10",
          phase_name: "Discover the Furniture",
          focus: "Explore what furniture is in the mystery room",
          phase_questions: [
            "What furniture do you see in the mystery room?",
            "Is there a bed in the room?",
            "What other furniture is there?",
            "Do you see a chair or a table?",
            "Tell me about all the furniture!",
            "What's the biggest furniture in the room?"
          ]
        },
        {
          phase: "details",
          turns: "11-15",
          phase_name: "Furniture Details",
          focus: "Describe the furniture (color, size, position)",
          phase_questions: [
            "What color is the bed?",
            "Is the chair big or small?",
            "Where is the table?",
            "Tell me about the furniture color!",
            "What furniture do you like most?"
          ]
        },
        {
          phase: "conclusion",
          turns: "16-18",
          phase_name: "Mystery Solved!",
          focus: "Wrap up the mystery discovery",
          phase_questions: [
            "We found all the furniture! What did you like most?",
            "The mystery is solved! What was your favorite furniture?",
            "Great detective work! Should we explore another room next time?"
          ]
        }
      ],
      
      objectives: [
        {
          stepKey: "mystery_room_name",
          category: "Room Type",
          question_variants: [
            {
              question: "What room do you want to explore?",
              hints: ["want", "I", "to", "explore", "the", "bedroom"]
            },
            {
              question: "Which mystery room shall we check?",
              hints: ["check", "Let's", "the", "living", "room"]
            },
            {
              question: "What room is it?",
              hints: ["is", "It", "a", "kitchen", "room"]
            }
          ],
          target_keywords: ["bedroom", "kitchen", "bathroom", "living room", "room", "explore"],
          ack_options: ["Nice!", "Great!", "Wonderful!"],
          recast_templates: [
            "We will explore the {room}!",
            "The {room} is our mystery room!"
          ],
          success_criteria: "Student picks a room to explore"
        },
        {
          stepKey: "first_furniture",
          category: "Furniture Discovery",
          question_variants: [
            {
              question: "What do you see in the room?",
              hints: ["see", "I", "a", "big", "bed"]
            },
            {
              question: "What is in this room?",
              hints: ["In", "this", "room", "is", "a", "table"]
            },
            {
              question: "Tell me what you find.",
              hints: ["find", "I", "a", "chair", "and", "table"]
            }
          ],
          target_keywords: ["bed", "chair", "table", "desk", "lamp", "see", "find", "there"],
          ack_options: ["Nice!", "Great!", "Wonderful!"],
          recast_templates: [
            "You found a {item}!",
            "There is a {item} in the room!"
          ],
          success_criteria: "Student names first piece of furniture"
        },
        {
          stepKey: "furniture_color",
          category: "Description",
          question_variants: [
            {
              question: "What color is it?",
              hints: ["is", "It", "blue", "and", "white"]
            },
            {
              question: "What color is the chair?",
              hints: ["chair", "The", "is", "red"]
            },
            {
              question: "Tell me the color.",
              hints: ["color", "The", "is", "green"]
            }
          ],
          target_keywords: ["red", "blue", "green", "yellow", "white", "black", "brown", "color"],
          ack_options: ["Nice!", "Great!", "Wonderful!"],
          recast_templates: [
            "It is {color}!",
            "The {color} one looks nice!"
          ],
          success_criteria: "Student names a color"
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
              question: "Ask me anything about the room!",
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
          stepKey: "second_furniture",
          category: "More Furniture",
          question_variants: [
            {
              question: "What else is in the room?",
              hints: ["else", "There", "is", "a", "table"]
            },
            {
              question: "Do you see another thing?",
              hints: ["see", "I", "a", "chair", "too"]
            },
            {
              question: "What more do you find?",
              hints: ["find", "I", "more", "furniture", "here"]
            }
          ],
          target_keywords: ["chair", "table", "bed", "lamp", "desk", "another", "more", "also"],
          ack_options: ["Nice!", "Great!", "Wonderful!"],
          recast_templates: [
            "You found another {item}!",
            "There is also a {item}!"
          ],
          success_criteria: "Student names second piece of furniture"
        },
        {
          stepKey: "furniture_size",
          category: "Size Description",
          question_variants: [
            {
              question: "Is it big or small?",
              hints: ["is", "It", "big", "and", "nice"]
            },
            {
              question: "What size is the table?",
              hints: ["table", "The", "is", "small"]
            },
            {
              question: "Tell me about the size.",
              hints: ["size", "The", "is", "medium"]
            }
          ],
          target_keywords: ["big", "small", "large", "tiny", "medium", "huge", "size"],
          ack_options: ["Nice!", "Great!", "Wonderful!"],
          recast_templates: [
            "It is {size}!",
            "A {size} one is good!"
          ],
          success_criteria: "Student describes size"
        },
        {
          stepKey: "student_question_2",
          category: "Student Inquiry",
          type: "invitation",
          question_variants: [
            {
              question: "Do you have more questions?",
              hints: []
            },
            {
              question: "What else do you want to know?",
              hints: []
            },
            {
              question: "Ask me about the mystery!",
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
          stepKey: "who_uses_room",
          category: "Usage",
          question_variants: [
            {
              question: "Who uses this room?",
              hints: ["uses", "My", "mom", "this", "room"]
            },
            {
              question: "Who sleeps here?",
              hints: ["sleeps", "I", "here", "in", "bed"]
            },
            {
              question: "Who is this room for?",
              hints: ["is", "It", "for", "my", "sister"]
            }
          ],
          target_keywords: ["mom", "dad", "sister", "brother", "me", "family", "uses", "for"],
          ack_options: ["Nice!", "Great!", "Wonderful!"],
          recast_templates: [
            "{person} uses this room!",
            "This room is for {person}!"
          ],
          success_criteria: "Student says who uses the room"
        },
        {
          stepKey: "room_feeling",
          category: "Impression",
          question_variants: [
            {
              question: "Do you like this mystery room?",
              hints: ["like", "I", "Yes", "this", "room"]
            },
            {
              question: "Is the room nice?",
              hints: ["is", "Yes", "it", "very", "nice"]
            },
            {
              question: "What do you think about it?",
              hints: ["think", "I", "it", "is", "beautiful"]
            }
          ],
          target_keywords: ["like", "love", "nice", "beautiful", "good", "yes", "no", "think"],
          ack_options: ["Nice!", "Great!", "Wonderful!"],
          recast_templates: [
            "You like this room!",
            "It is a {feeling} room!"
          ],
          success_criteria: "Student expresses opinion about room"
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
          goodbye_en: "Great job! You explored the mystery room! You found all the furniture! Bye!",
          goodbye_vi: "Tuyệt lắm! Bạn đã khám phá phòng bí ẩn! Bạn tìm ra tất cả đồ đạc! Tạm biệt!",
          success_criteria: "Mission complete"
        }
      ],
      
      minimum_turns: 12,
      maximum_turns: 18,
      expected_duration: "12+ minutes"
    },
    {
      mission_id: 3,
      title: "My Dream House",
      title_vi: "Ngôi nhà Mơ ước",
      theme: "Imagination",
      
      nova_greeting: "Hi! Let's design your dream house together!",
      
      mission_context: `This is Week 5 Mission 3 - Dream House Design. STUDENT PROFILE: 6-12 years old, A0+ level. LANGUAGE: SIMPLE, WARM words, max 8 words/sentence. OPEN-ENDED: "What rooms DO YOU WANT?" "What furniture DO YOU WANT?" NOT Yes/No. THEME: Imagination and creativity - FUTURE TENSE ONLY! Ask "What do you WANT?" NOT "What do you HAVE?". ENCOURAGE: Student questions every 3-4 turns. AVOID: Complex grammar, technical terms, present tense questions. FOCUS: Dream house they WANT to build, furniture they WANT to have. USE: "want", "will have", "dream of" - NEVER use "have", "is", "are" when asking about their house.`,
      
      target_vocab: ["bedroom", "kitchen", "bathroom", "living_room", "house", "bed", "chair", "table", "explore"],
      
      grammar_pattern: "My house has a/an [noun]",

      // === STORY MODE CONFIGURATION ===
      story_character: {
        name: "Architect Emma",
        personality: "creative, imaginative, loves designing dream houses",
        backstory: "I'm an architect who helps kids design their perfect dream houses! I love imagination and creativity!",
        speaking_style: "warm, encouraging, enthusiastic about creativity. ALWAYS use WANT/DREAM language: 'What do you WANT?' NOT 'What do you HAVE?'",
        facts: [
          "I design dream houses for kids!",
          "I love imagination and creativity!",
          "I ask what you WANT not what you HAVE!",
          "I help you design your perfect dream house!",
          "I love colorful rooms and fun furniture!"
        ],
        role: "Architect helping student design their FUTURE dream house (use WANT language only)"
      },

      opening_narrative: "Hi! I'm Architect Emma! 🏠✨ I design dream houses! Let's create YOUR perfect dream house together! How many rooms do you want in your dream house? Tell me your imagination!",

      story_arc: [
        {
          phase: "planning",
          turns: "1-5",
          phase_name: "Dream House Planning",
          focus: "How many rooms and which rooms student wants",
          phase_questions: [
            "How many rooms do you want in your dream house?",
            "What is the first room you want?",
            "What other rooms do you want?",
            "Do you want a bedroom? A kitchen? A living room?",
            "Tell me all the rooms!"
          ]
        },
        {
          phase: "furniture",
          turns: "6-12",
          phase_name: "Furniture and Design",
          focus: "What furniture student WANTS in each room",
          phase_questions: [
            "What furniture do you WANT in your bedroom?",
            "What do you WANT in the kitchen?",
            "What furniture do you WANT in the living room?",
            "Do you WANT a big bed or a small bed?",
            "What color do you WANT the furniture?",
            "What special furniture do you WANT?",
            "What's the coolest furniture you WANT in your dream house?"
          ]
        },
        {
          phase: "creativity",
          turns: "13-17",
          phase_name: "Special Creative Touches",
          focus: "Colors, special rooms, unique ideas",
          phase_questions: [
            "What color is your dream house?",
            "Do you want a special room? Like a game room?",
            "What makes your house special?",
            "Tell me about the coolest part!",
            "Who will live in your dream house?"
          ]
        },
        {
          phase: "conclusion",
          turns: "18-20",
          phase_name: "Dream House Complete!",
          focus: "Wrap up the design",
          phase_questions: [
            "Your dream house is amazing! What do you love most?",
            "We designed a perfect house! What's your favorite room?",
            "Great job! When will you build this dream house?"
          ]
        }
      ],
      
      objectives: [
        {
          stepKey: "how_many_rooms",
          category: "House Planning",
          question_variants: [
            {
              question: "How many rooms in your dream house?",
              hints: ["house", "My", "has", "five", "rooms"]
            },
            {
              question: "How many rooms do you want?",
              hints: ["want", "I", "ten", "rooms", "big"]
            },
            {
              question: "Tell me about the rooms.",
              hints: ["rooms", "There", "are", "many", "in", "house"]
            }
          ],
          target_keywords: ["many", "rooms", "five", "ten", "three", "four", "has", "want"],
          ack_options: ["Nice!", "Great!", "Wonderful!"],
          recast_templates: [
            "Your house has {number} rooms!",
            "{number} rooms is great!"
          ],
          success_criteria: "Student says number of rooms"
        },
        {
          stepKey: "first_dream_room",
          category: "Room Choice",
          question_variants: [
            {
              question: "What is the first room you want?",
              hints: ["want", "I", "a", "big", "bedroom"]
            },
            {
              question: "Which room is most important?",
              hints: ["important", "Most", "is", "the", "kitchen"]
            },
            {
              question: "What room do you need?",
              hints: ["need", "I", "a", "nice", "living", "room"]
            }
          ],
          target_keywords: ["bedroom", "kitchen", "bathroom", "living room", "room", "want", "need"],
          ack_options: ["Nice!", "Great!", "Wonderful!"],
          recast_templates: [
            "A {room} is your first choice!",
            "You want a {room}!"
          ],
          success_criteria: "Student names first dream room"
        },
        {
          stepKey: "room_furniture",
          category: "Furniture Planning",
          question_variants: [
            {
              question: "What furniture goes in that room?",
              hints: ["goes", "A", "bed", "and", "chair"]
            },
            {
              question: "What do you put in the room?",
              hints: ["put", "I", "a", "table", "there"]
            },
            {
              question: "Tell me about the furniture.",
              hints: ["furniture", "The", "is", "a", "big", "bed"]
            }
          ],
          target_keywords: ["bed", "chair", "table", "desk", "lamp", "furniture", "put"],
          ack_options: ["Nice!", "Great!", "Wonderful!"],
          recast_templates: [
            "A {item} is perfect!",
            "You will put a {item} there!"
          ],
          success_criteria: "Student names furniture for room"
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
              question: "What do you want to ask?",
              hints: []
            },
            {
              question: "Ask me about my dream house!",
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
          stepKey: "second_dream_room",
          category: "More Rooms",
          question_variants: [
            {
              question: "What is another room you want?",
              hints: ["want", "I", "a", "big", "kitchen"]
            },
            {
              question: "What other room?",
              hints: ["other", "The", "room", "is", "bathroom"]
            },
            {
              question: "Tell me more rooms.",
              hints: ["more", "I", "want", "a", "living", "room"]
            }
          ],
          target_keywords: ["bedroom", "kitchen", "bathroom", "living room", "another", "more", "other"],
          ack_options: ["Nice!", "Great!", "Wonderful!"],
          recast_templates: [
            "A {room} is great!",
            "You also want a {room}!"
          ],
          success_criteria: "Student names second room"
        },
        {
          stepKey: "house_color",
          category: "House Design",
          question_variants: [
            {
              question: "What color is your dream house?",
              hints: ["house", "My", "is", "blue", "and", "white"]
            },
            {
              question: "What color do you want?",
              hints: ["want", "I", "a", "red", "house"]
            },
            {
              question: "Tell me the house color.",
              hints: ["color", "The", "is", "yellow"]
            }
          ],
          target_keywords: ["red", "blue", "green", "yellow", "white", "pink", "color", "house"],
          ack_options: ["Nice!", "Great!", "Wonderful!"],
          recast_templates: [
            "A {color} house is beautiful!",
            "{color} is a nice color!"
          ],
          success_criteria: "Student names house color"
        },
        {
          stepKey: "student_question_2",
          category: "Student Inquiry",
          type: "invitation",
          question_variants: [
            {
              question: "Do you have more questions?",
              hints: []
            },
            {
              question: "What else do you want to ask?",
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
          stepKey: "special_room",
          category: "Creativity",
          question_variants: [
            {
              question: "Do you want a special room?",
              hints: ["want", "I", "a", "game", "room"]
            },
            {
              question: "What fun room do you want?",
              hints: ["want", "I", "a", "play", "room"]
            },
            {
              question: "Any secret room?",
              hints: ["want", "I", "a", "secret", "room", "Yes"]
            }
          ],
          target_keywords: ["game", "play", "toy", "secret", "fun", "special", "room", "yes", "no"],
          ack_options: ["Nice!", "Great!", "Wonderful!"],
          recast_templates: [
            "A {room} sounds amazing!",
            "You want a {room}!"
          ],
          success_criteria: "Student says if they want special room"
        },
        {
          stepKey: "who_lives_there",
          category: "Family",
          question_variants: [
            {
              question: "Who will live in your dream house?",
              hints: ["will", "live", "My", "family", "there"]
            },
            {
              question: "Who lives with you?",
              hints: ["live", "I", "with", "mom", "and", "dad"]
            },
            {
              question: "Tell me about your family.",
              hints: ["family", "My", "has", "four", "people"]
            }
          ],
          target_keywords: ["family", "mom", "dad", "sister", "brother", "me", "live", "people"],
          ack_options: ["Nice!", "Great!", "Wonderful!"],
          recast_templates: [
            "Your {family} will live there!",
            "{family} will love the house!"
          ],
          success_criteria: "Student says who lives in house"
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
          goodbye_en: "Great job! Your dream house is amazing! I hope you build it one day! Bye!",
          goodbye_vi: "Tuyệt lắm! Ngôi nhà mơ ước của bạn tuyệt vời! Chúc bạn xây được nó! Tạm biệt!",
          success_criteria: "Mission complete"
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
