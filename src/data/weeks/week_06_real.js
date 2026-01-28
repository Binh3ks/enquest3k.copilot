const week6RealData = {
  // === METADATA ===
  week_id: 6,
  phase: 1,
  block: "A",
  unit: 1,
  week_number: 6,
  
  // === OFFICIAL SYLLABUS DATA ===
  title: "Week 6: Treasure Hunt at Home",
  week_title_en: "Treasure Hunt at Home (Location)",
  week_title_vi: "Truy tìm Kho báu (Vị trí)",
  
  topic: "Prepositions - Hiding and finding objects",
  topic_vi: "Giới từ - Ẩn và tìm đồ vật",
  
  // === KEY LEARNING OUTCOME ===
  learning_outcome: "Describe location using prepositions In, On, Under, Next to.",
  learning_outcome_vi: "Miêu tả vị trí sử dụng giới từ In, On, Under, Next to.",
  
  // === GRAMMAR FOCUS (IMPLICIT) ===
  grammar_focus: "Prepositions of Place",
  grammar_pattern: "[Object] is [in/on/under/next to] the [place]",
  grammar_examples: [
    "The box is on the desk.",
    "The cat is under the table.",
    "The book is in the box.",
    "The chair is next to the door."
  ],
  
  // === TARGET VOCABULARY (TIER 1 - A0++ EASY MODE = SYLLABUS BASE) ===
  target_vocab: [
    {
      word: "box",
      pronunciation: "/bɒks/",
      definition_vi: "hộp",
      definition_en: "a container for storing things",
      example: "The toy is in the box.",
      syllabus_context: "Objects"
    },
    {
      word: "desk",
      pronunciation: "/desk/",
      definition_vi: "bàn học",
      definition_en: "a table for working or studying",
      example: "The book is on the desk.",
      syllabus_context: "Furniture"
    },
    {
      word: "floor",
      pronunciation: "/flɔːr/",
      definition_vi: "sàn nhà",
      definition_en: "the surface you walk on inside a room",
      example: "The ball is on the floor.",
      syllabus_context: "House Parts"
    },
    {
      word: "wall",
      pronunciation: "/wɔːl/",
      definition_vi: "tường",
      definition_en: "the side of a room or building",
      example: "The picture is on the wall.",
      syllabus_context: "House Parts"
    },
    {
      word: "window",
      pronunciation: "/ˈwɪn.doʊ/",
      definition_vi: "cửa sổ",
      definition_en: "an opening in a wall with glass",
      example: "Look out the window.",
      syllabus_context: "House Parts"
    },
    {
      word: "door",
      pronunciation: "/dɔːr/",
      definition_vi: "cửa",
      definition_en: "an opening for entering or leaving a room",
      example: "Close the door.",
      syllabus_context: "House Parts"
    },
    {
      word: "hide",
      pronunciation: "/haɪd/",
      definition_vi: "ẩn, giấu",
      definition_en: "to put something where no one can see it",
      example: "Let's hide the treasure.",
      syllabus_context: "Action"
    },
    {
      word: "seek",
      pronunciation: "/siːk/",
      definition_vi: "tìm kiếm",
      definition_en: "to look for something",
      example: "Now seek the treasure!",
      syllabus_context: "Action"
    },
    {
      word: "treasure",
      pronunciation: "/ˈtreʒ.ər/",
      definition_vi: "kho báu",
      definition_en: "something very special and valuable",
      example: "We found the treasure!",
      syllabus_context: "Theme"
    },
    {
      word: "hunt",
      pronunciation: "/hʌnt/",
      definition_vi: "săn tìm",
      definition_en: "to search carefully for something",
      example: "Let's go on a treasure hunt.",
      syllabus_context: "Action"
    }
  ],
  
  global_vocab: ["box", "desk", "floor", "wall", "window", "door", "hide", "seek", "treasure", "hunt"],
  
  // === 3 STORY MISSIONS ===
  story_missions: [
    {
      mission_id: 1,
      title: "The Treasure Map",
      title_vi: "Bản đồ Kho báu",
      theme: "Location & Prepositions",
      
      // 🎭 STORY CHARACTER (like roleplay ai_role)
      story_character: {
        name: "Captain Nova",
        personality: "Adventurous, playful, loves treasure hunts",
        backstory: "Captain Nova is a treasure hunter who travels the world looking for hidden treasures. Today, she needs YOUR help to find treasures in your house!",
        speaking_style: "Excited, uses treasure hunt language, gives location clues",
        facts: {
          ship_name: "Golden Star",
          favorite_treasure: "golden coin",
          has_map: true,
          map_color: "brown",
          treasure_found: 100,
          favorite_place: "under the desk",
          pet_parrot: true,
          parrot_name: "Coco"
        }
      },
      
      // 🎬 OPENING NARRATIVE (replaces nova_greeting)
      opening_narrative: "Ahoy! I'm Captain Nova! I'm a treasure hunter! I have a treasure map for YOUR house! There are treasures hiding everywhere! Will you help me find them? Say: Yes, Captain! Let's find the treasure!",
      
      nova_greeting: "Hi! Let's find treasures together!", // DEPRECATED - use opening_narrative
      
      mission_context: `This is Week 6 Mission 1 - Treasure Hunt. STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level. LANGUAGE RULES: Use VERY SIMPLE words. Max 8 words per sentence. ONLY ask about LOCATION using WHERE questions. GRAMMAR: Prepositions (in/on/under/next to). Give FULL scaffolding: "Say: The treasure is ON the desk" or "Say: I hide it UNDER the box". VOCABULARY: box, desk, floor, wall, window, door, hide, seek, treasure, hunt. STRICT FOCUS: LOCATION ONLY - Every question must be about WHERE something is. FORBIDDEN: Do NOT ask "Do you like...?", "What color...?", "Is it big?", "Do you want...?". ONLY allowed questions: "Where is...?", "Where do you hide...?", "Where can we find...?", "Which location...?". NEVER ask about preferences, feelings, or descriptions - ONLY LOCATION.`,
      
      target_vocab: ["box", "desk", "floor", "wall", "window", "door"],
      
      grammar_pattern: "[Object] is [in/on/under/next to] the [place]",
      
      // 📖 STORY ARC (phases with turn ranges)
      story_arc: [
        {
          phase: "introduction",
          turns: "1-5",
          goal: "Learn student's name, start treasure hunt",
          required_vocab: [],
          phase_questions: [
            "What do I call you, young treasure hunter?",
            "Look at my map! 🗺️ It shows treasures in YOUR house! Are you ready? Say: Yes, Captain!",
            "First treasure: It's in a BOX! Do you have a box at home? Say: Yes, I have a box OR No, I don't have a box.",
            "Great! Let's start! Where can we find boxes? In your room, under a desk, or in a closet? Say: In my room OR Under the desk.",
            "Perfect! Now let's look for treasure NUMBER ONE! 🏆"
          ]
        },
        {
          phase: "treasure_hunting",
          turns: "6-12",
          goal: "Find treasures using prepositions (in, on, under, next to)",
          required_vocab: ["box", "desk", "floor", "door", "window"],
          phase_questions: [
            "🔍 Treasure #1: Look ON your desk! Is there something special? Say: Yes, there is a [item] on the desk OR No, there isn't.",
            "🔍 Treasure #2: Look UNDER your desk! What do you see? Say: I see a [item] under the desk OR There is a [item] under the desk.",
            "🔍 Treasure #3: Look at the FLOOR! Is there treasure on the floor? Say: Yes, there is a [item] on the floor.",
            "🔍 Treasure #4: Look NEXT TO the door! Is there something? Say: There is a [item] next to the door OR Yes, next to the door.",
            "🔍 Treasure #5: Look IN a box! Open it! What's inside? Say: There is a [item] IN the box.",
            "Amazing! You found FIVE treasures! Let's find more!",
            "Where is your favorite treasure? ON the desk, UNDER the desk, or IN the box? Say: My favorite is [location]."
          ]
        },
        {
          phase: "hiding_game",
          turns: "13-17",
          goal: "Student describes where THEY hide treasures",
          required_vocab: ["hide", "seek"],
          phase_questions: [
            "Now YOU hide a treasure! Where will you hide it? Say: I hide it ON/UNDER/IN the [place].",
            "Good hiding spot! Is it UNDER something? ON something? Or IN something? Say: It is UNDER/ON/IN the [place].",
            "I will try to find it! Give me a clue! Say: It is next to the [item] OR It is under the [item].",
            "Is it near the window? Near the door? Or near the desk? Say: It is near the [place].",
            "Found it! You are a great treasure hider! 🎉"
          ]
        },
        {
          phase: "conclusion",
          turns: "18-20",
          goal: "Celebrate treasure hunt, say goodbye",
          required_vocab: [],
          phase_questions: [
            "We found SO MANY treasures! Which was your favorite? The one ON the desk or UNDER the desk? Say: My favorite was [location].",
            "You are an AMAZING treasure hunter! Thank you for helping Captain Nova! 🏴‍☠️",
            "Goodbye, treasure hunter! See you on our next adventure! Say: Goodbye, Captain!"
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
              question: "What do I call you, treasure hunter?",
              hints: ["name", "is", "My", "I", "am"]
            },
            {
              question: "What is your name?",
              hints: ["is", "My", "name", "I"]
            },
            {
              question: "Tell me your name, young adventurer!",
              hints: ["call", "me", "You", "can", "My", "name"]
            }
          ],
          target_keywords: ["my", "name", "is", "I", "am"],
          ack_options: ["Ahoy!", "Welcome aboard!", "Great to meet you!"],
          recast_templates: [
            "Your name is {name}!",
            "Captain {name} reporting for duty!"
          ],
          success_criteria: "Student says their name"
        },
        {
          stepKey: "treasure_on_desk",
          category: "Location - ON",
          question_variants: [
            {
              question: "Look ON your desk! Where is the treasure?",
              hints: ["The", "treasure", "is", "on", "the", "desk"]
            },
            {
              question: "I see something ON the desk! Where is it?",
              hints: ["is", "It", "on", "the", "desk"]
            },
            {
              question: "Where is this treasure? (pointing at desk)",
              hints: ["on", "desk", "the", "is", "treasure", "The"]
            }
          ],
          target_keywords: ["on", "desk", "treasure", "is", "the"],
          ack_options: ["Found it!", "Great!", "Shiver me timbers!"],
          recast_templates: [
            "The treasure is ON the desk!",
            "You found it ON the desk!"
          ],
          success_criteria: "Student uses 'on the desk'"
        },
        {
          stepKey: "treasure_under_desk",
          category: "Location - UNDER",
          question_variants: [
            {
              question: "Look UNDER your desk! Where is the treasure?",
              hints: ["The", "treasure", "is", "under", "the", "desk"]
            },
            {
              question: "Something is hiding UNDER the desk! Where?",
              hints: ["is", "It", "under", "the", "desk"]
            },
            {
              question: "Where is this treasure? (pointing under)",
              hints: ["under", "desk", "the", "is", "treasure"]
            }
          ],
          target_keywords: ["under", "desk", "treasure", "is"],
          ack_options: ["Found it!", "Excellent!", "Well done!"],
          recast_templates: [
            "The treasure is UNDER the desk!",
            "You found it UNDER the desk!"
          ],
          success_criteria: "Student uses 'under the desk'"
        },
        {
          stepKey: "treasure_in_box",
          category: "Location - IN",
          question_variants: [
            {
              question: "Look IN the box! Where is the treasure?",
              hints: ["The", "treasure", "is", "in", "the", "box"]
            },
            {
              question: "Open the box! Where is it?",
              hints: ["is", "It", "in", "the", "box"]
            },
            {
              question: "Where is this treasure? (pointing at box)",
              hints: ["in", "box", "the", "is", "treasure"]
            }
          ],
          target_keywords: ["in", "box", "treasure", "is", "the"],
          ack_options: ["Amazing!", "You found it!", "Brilliant!"],
          recast_templates: [
            "The treasure is IN the box!",
            "You found it IN the box!"
          ],
          success_criteria: "Student uses 'in the box'"
        },
        {
          stepKey: "treasure_next_to_door",
          category: "Location - NEXT TO",
          question_variants: [
            {
              question: "Look NEXT TO the door! Where is the treasure?",
              hints: ["The", "treasure", "is", "next", "to", "the", "door"]
            },
            {
              question: "Something is beside the door! Where?",
              hints: ["is", "It", "next", "to", "the", "door"]
            },
            {
              question: "Where is this treasure? (pointing beside door)",
              hints: ["next", "to", "door", "the", "is", "treasure"]
            }
          ],
          target_keywords: ["next", "to", "door", "treasure", "is", "beside"],
          ack_options: ["Perfect!", "You got it!", "Excellent!"],
          recast_templates: [
            "The treasure is NEXT TO the door!",
            "You found it NEXT TO the door!"
          ],
          success_criteria: "Student uses 'next to the door'"
        },
        {
          stepKey: "where_you_hide",
          category: "Student Hiding",
          question_variants: [
            {
              question: "Where will YOU hide the treasure?",
              hints: ["I", "hide", "it", "on", "the", "desk"]
            },
            {
              question: "Where are you hiding it?",
              hints: ["hide", "I", "it", "under", "the", "table"]
            },
            {
              question: "Tell me your hiding spot!",
              hints: ["hiding", "am", "I", "it", "in", "box"]
            }
          ],
          target_keywords: ["hide", "on", "under", "in", "next", "to", "desk", "box", "floor"],
          ack_options: ["Good spot!", "Clever!", "Great hiding place!"],
          recast_templates: [
            "You're hiding it {location}!",
            "The treasure is {location}!"
          ],
          success_criteria: "Student describes hiding location with preposition"
        },
        {
          stepKey: "favorite_treasure_location",
          category: "Preference",
          question_variants: [
            {
              question: "Which treasure was your favorite? The one ON the desk or UNDER the desk?",
              hints: ["favorite", "My", "was", "on", "the", "desk"]
            },
            {
              question: "Where was the best treasure?",
              hints: ["was", "It", "under", "the", "table"]
            },
            {
              question: "Which location did you like best?",
              hints: ["liked", "I", "the", "one", "in", "box"]
            }
          ],
          target_keywords: ["on", "under", "in", "next", "favorite", "best", "liked"],
          ack_options: ["Great choice!", "That was a good one!", "I liked that too!"],
          recast_templates: [
            "Your favorite was {location}!",
            "You liked the treasure {location}!"
          ],
          success_criteria: "Student names favorite treasure location"
        },
        {
          stepKey: "house_for_hunting",
          category: "House Context",
          question_variants: [
            {
              question: "Is your house big or small for treasure hunting?",
              hints: ["house", "My", "is", "big"]
            },
            {
              question: "Do you have many rooms to hide treasures?",
              hints: ["Yes", "I", "have", "many", "rooms"]
            },
            {
              question: "What is your house like?",
              hints: ["is", "It", "small", "but", "nice"]
            }
          ],
          target_keywords: ["big", "small", "many", "rooms", "house", "nice"],
          ack_options: ["Perfect for treasure hunting!", "Great!", "Wonderful!"],
          recast_templates: [
            "Your house is {size}!",
            "You have a {size} house for hunting!"
          ],
          success_criteria: "Student describes house"
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
          goodbye_en: "Amazing work, treasure hunter! We found SO many treasures! You are a true adventurer! Ahoy and goodbye! 🏴‍☠️",
          goodbye_vi: "Tuyệt vời, thợ săn kho báu! Chúng ta đã tìm thấy RẤT NHIỀU kho báu! Bạn là nhà thám hiểm thực thụ! Tạm biệt! 🏴‍☠️",
          success_criteria: "Mission complete"
        }
      ],
      
      minimum_turns: 15,
      maximum_turns: 20,
      expected_duration: "15+ minutes"
    },  // ← End of Mission 1
    {
      mission_id: 2,
      title: "Flashlight Treasure Hunt",
      title_vi: "Săn Kho Báu Bằng Đèn Pin",
      theme: "Location & Prepositions - Pointing Game",
      
      nova_greeting: "It's so dark! I have a flashlight! Let's find treasures!",
      default_hints: ["The", "treasure", "is", "on", "the", "desk"],
      
      mission_context: `This is Week 6 Mission 2 - Flashlight Treasure Hunt. STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level. LANGUAGE RULES: Use VERY SIMPLE words. Max 8 words per sentence. ONLY ask about LOCATION using WHERE questions. GRAMMAR: Prepositions (in/on/under/next to). Give FULL scaffolding: "Say: The treasure is ON the desk" or "Say: It is UNDER the box". VOCABULARY: box, desk, floor, wall, window, door, hide, seek, treasure, hunt. STRICT FOCUS: LOCATION ONLY - Every question must be about WHERE something is. FORBIDDEN: Do NOT ask "Do you like...?", "What color...?", "Is it big?", "Do you want...?", "How are you?", "What do you think?". ONLY allowed questions: "Where is the treasure?", "(Point 👉) Where is this?", "Look here! Where is it?". NEVER ask about preferences, feelings, or descriptions - ONLY LOCATION WITH PREPOSITIONS.`,
      
      target_vocab: ["box", "desk", "floor", "wall", "window", "door", "hide", "seek", "treasure", "hunt"],
      
      grammar_pattern: "The treasure is [preposition] the [place]",

      // === STORY MODE CONFIGURATION ===
      story_character: {
        name: "Captain Nova",
        personality: "adventurous, excited, loves treasure hunting in the dark",
        backstory: "It's night time! The house is dark! Good thing I have my treasure-hunting flashlight! Let's find hidden treasures!",
        speaking_style: "excited, uses pirate sounds (Ahoy! Shiver me timbers!), gives full scaffolding for prepositions",
        facts: [
          "I have a special treasure-hunting flashlight! 🔦",
          "I love finding treasures in dark places!",
          "I will shine my light on different treasures!",
          "I help you say IN, ON, UNDER, NEXT TO correctly!",
          "I found 50 treasures this week!"
        ],
        role: "Treasure hunter with flashlight discovering treasures in darkness"
      },

      opening_narrative: "Ahoy! It's so dark! 🌑 I have my flashlight! 🔦 (Shine on desk) Look! A treasure! Where is it? Say: The treasure is ON the desk!",

      story_arc: [
        {
          phase: "intro",
          turns: "1-4",
          phase_name: "Darkness and First Treasures",
          focus: "Establish preposition pattern with ON and IN",
          phase_questions: [
            "(Shine 🔦 on desk) Look! A treasure! Where is it? Say: The treasure is ON the desk",
            "(Shine 🔦 in box) Another one! Where? Say: The treasure is IN the box",
            "(Shine 🔦 on floor) Down here! Where? Say: The treasure is ON the floor",
            "(Shine 🔦 on wall) Up high! Where is it? Say: The treasure is ON the wall"
          ],
          example_answers: [
            "The treasure is on the desk",
            "The treasure is in the box",
            "The treasure is on the floor",
            "The treasure is on the wall"
          ]
        },
        {
          phase: "more_prepositions",
          turns: "5-10",
          phase_name: "UNDER and NEXT TO Challenge",
          focus: "Practice UNDER and NEXT TO prepositions",
          phase_questions: [
            "(Shine 🔦 under desk) Hidden! Where? Say: The treasure is UNDER the desk",
            "(Shine 🔦 next to door) Beside the door! Where? Say: The treasure is NEXT TO the door",
            "(Shine 🔦 under box) In the shadows! Where? Say: It is UNDER the box",
            "(Shine 🔦 next to window) By the window! Where? Say: It is NEXT TO the window",
            "(Shine 🔦 on desk) Again! Where? Say: The treasure is ON the desk",
            "(Shine 🔦 in box) Inside! Where? Say: The treasure is IN the box"
          ],
          example_answers: [
            "The treasure is under the desk",
            "The treasure is next to the door",
            "It is under the box",
            "It is next to the window",
            "The treasure is on the desk",
            "The treasure is in the box"
          ]
        },
        {
          phase: "speed_round",
          turns: "11-14",
          phase_name: "Quick Discovery",
          focus: "Fast-paced practice all prepositions",
          phase_questions: [
            "(Shine quickly on floor) Quick! Where? The treasure is...",
            "(Shine under something) Fast! Where? It is...",
            "(Shine next to door) Where? Next to...",
            "Amazing! Which location was hardest to find?"
          ]
        },
        {
          phase: "conclusion",
          turns: "15-16",
          phase_name: "Lights On",
          focus: "Celebrate treasure hunting success",
          phase_questions: [
            "The lights are back! ✨ Where was your favorite treasure? It was...",
            "Perfect! You found ALL the treasures! Great job! Ahoy! 🏴‍☠️"
          ]
        }
      ],
      
      minimum_turns: 12,
      maximum_turns: 18,
      expected_duration: "12+ minutes"
    },
    {
      mission_id: 3,
      title: "The Mystery Treasure Box",
      title_vi: "Chiếc Hộp Kho Báu Bí Ẩn",
      theme: "Guessing Game - Prepositions",
      
      nova_greeting: "Look! I found a mystery box! Where are the treasures? Let's guess!",
      default_hints: ["The", "treasure", "is", "in", "the", "box"],
      
      mission_context: `This is Week 6 Mission 3 - The Mystery Treasure Box. STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level. LANGUAGE RULES: Use VERY SIMPLE words. Max 8 words per sentence. ONLY ask about LOCATION using WHERE questions. GRAMMAR: Prepositions (in/on/under/next to). Give FULL scaffolding: "Say: The treasure is ON the desk" or "Say: It is UNDER the box". VOCABULARY: box, desk, floor, wall, window, door, hide, seek, treasure, hunt. STRICT FOCUS: LOCATION ONLY - Every question must be about WHERE something is. FORBIDDEN: Do NOT ask "Do you like...?", "What color...?", "Is it big?", "Do you want...?", "How are you?", "What do you think?". ONLY allowed questions: "Where is the treasure?", "Can you guess the location?", "Where do you think it is?". NEVER ask about preferences, feelings, or descriptions - ONLY LOCATION WITH PREPOSITIONS.`,
      
      target_vocab: ["box", "desk", "floor", "wall", "window", "door", "hide", "seek", "treasure", "hunt"],
      
      grammar_pattern: "The treasure is [preposition] the [place]",

      // === STORY MODE CONFIGURATION ===
      story_character: {
        name: "Captain Nova",
        personality: "mysterious, playful, loves treasure riddles and location puzzles",
        backstory: "I found a magic treasure box! I can't tell you where the treasures are, but I'll give you clues! Can you guess the locations?",
        speaking_style: "mysterious, uses location riddles, gives clear position clues, celebrates correct guesses with full scaffolding",
        facts: [
          "I found a mystery treasure box!",
          "I give clues about where treasures are hidden!",
          "I describe positions: up high, down low, hidden, beside!",
          "I love when you guess locations correctly!",
          "I help you say IN, ON, UNDER, NEXT TO perfectly!"
        ],
        role: "Mystery box host giving riddles for student to guess"
      },

      opening_narrative: "Look! 📦 A mystery treasure box! I have clues about WHERE treasures are! (Touch box) Hmm... I see something up high on something flat... Where is it? Say: The treasure is ON the desk!",

      story_arc: [
        {
          phase: "intro",
          turns: "1-3",
          phase_name: "Mystery Box Opens - First Location Clues",
          focus: "Introduce guessing game with ON and IN",
          phase_questions: [
            "(Clue: Up high on flat surface) Where is the treasure? Say: The treasure is ON the desk",
            "(Clue: Inside something square with lid) Where? Say: The treasure is IN the box",
            "(Clue: Down at the bottom where we walk) Where? Say: The treasure is ON the floor"
          ],
          example_answers: [
            "The treasure is on the desk",
            "The treasure is in the box",
            "The treasure is on the floor"
          ]
        },
        {
          phase: "harder_locations",
          turns: "4-8",
          phase_name: "UNDER and NEXT TO Clues",
          focus: "Guess locations with UNDER and NEXT TO",
          phase_questions: [
            "(Clue: Hidden below the desk, in shadows) Where? Say: The treasure is UNDER the desk",
            "(Clue: Beside the door, next to it) Where? Say: The treasure is NEXT TO the door",
            "(Clue: Hidden below something square) Where? Say: It is UNDER the box",
            "(Clue: Up high on flat vertical surface) Where? Say: It is ON the wall",
            "(Clue: Beside the window, close to it) Where? Say: It is NEXT TO the window"
          ],
          example_answers: [
            "The treasure is under the desk",
            "The treasure is next to the door",
            "It is under the box",
            "It is on the wall",
            "It is next to the window"
          ]
        },
        {
          phase: "speed_clues",
          turns: "9-14",
          phase_name: "Quick Location Riddles",
          focus: "Fast-paced location guessing with all prepositions",
          phase_questions: [
            "(Clue: Flat surface for working) ON the...? Say: ON the desk",
            "(Clue: Square container with lid) IN the...? Say: IN the box",
            "(Clue: Bottom surface, we walk on it) ON the...? Say: ON the floor",
            "(Clue: Hidden below desk) UNDER the...? Say: UNDER the desk",
            "(Clue: Beside the entrance) NEXT TO the...? Say: NEXT TO the door",
            "Which location was hardest to guess?"
          ],
          example_answers: [
            "On the desk",
            "In the box",
            "On the floor",
            "Under the desk",
            "Next to the door",
            "Under the desk was hard"
          ]
        },
        {
          phase: "conclusion",
          turns: "15-18",
          phase_name: "Mystery Box Complete!",
          focus: "Celebrate all location discoveries",
          phase_questions: [
            "You guessed ALL the treasure locations! 🎉 Which location was your favorite?",
            "Amazing job! You know IN, ON, UNDER, NEXT TO perfectly! Ready to say goodbye?",
            "Perfect! You're a true treasure hunter! Ahoy and goodbye! 🏴‍☠️"
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
    week_title: "Treasure Hunt at Home (Location)",
    week_number: 6,
    theme: "Location & Prepositions",
    
    knowledge_base: [
      "Prepositions of place: IN, ON, UNDER, NEXT TO",
      "Objects we can hide: box, treasure, toy, ball, book",
      "Places in a house: desk, floor, wall, window, door",
      "Grammar: [Object] is [IN/ON/UNDER/NEXT TO] the [place]",
      "IN means inside something (IN the box)",
      "ON means on top of a surface (ON the desk, ON the floor, ON the wall)",
      "UNDER means below something (UNDER the desk, UNDER the box)",
      "NEXT TO means beside something (NEXT TO the door, NEXT TO the window)",
      "Treasure hunting is fun! We hide and seek treasures",
      "We can describe WHERE things are using prepositions"
    ],
    
    example_opening_questions: [
      "Where do you usually hide things at home?",
      "What's your favorite treasure or toy?",
      "Where do you like to play hide and seek?",
      "Do you have a special hiding spot?",
      "Can you tell me about your desk or table?"
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
      id: 'week6_treasure_hunt',
      label_en: "Treasure Hunt Master 🏴‍☠️",
      label_vi: "Thợ Săn Kho Báu Chuyên Nghiệp 🏴‍☠️",
      icon: "🏴‍☠️",
      ai_role: "Treasure hunt organizer teaching location descriptions",
      user_role: "New treasure hunter learning to describe locations",
      intro: "Ahoy! Welcome to Treasure Hunt Training! I'll teach you how to describe WHERE treasures are hidden!",
      context: "Week 6 theme - Location & Prepositions. AI acts as experienced treasure hunter teaching beginner how to describe locations using IN, ON, UNDER, NEXT TO. Asks questions like 'Where should we hide this treasure?' or 'Where do you see treasures?' Uses pattern '[Object] is [preposition] the [place]'. Should be enthusiastic, encouraging, and use simple words for A0+ level."
    }
  },

  // ✨ DYNAMIC ROLEPLAY SCENARIOS (3 HIGH-QUALITY SCENARIOS ONLY)
  roleplay_scenarios: [
      {
        id: "rp_treasure_map",
        title: "Treasure Map Adventure 🗺️",
        title_en: "Treasure Map Adventure",
        title_vi: "Phiêu lưu Bản đồ Kho báu",
        emoji: "🗺️",
        description: "Follow Captain Nova's treasure map and find hidden treasures!",
        
        // AI Persona
        ai_role: "Pirate Captain (Captain Nova) - Shows map",
        user_role: "Treasure Hunter - Student describes locations",
        context: "Captain Nova shows treasure map with 5 treasures marked. Student must describe WHERE each treasure is using prepositions. CRITICAL: Questions must offer 2 location choices with OR.",
        
        // Pedagogical Focus
        vocab_focus: ["box", "desk", "floor", "wall", "window", "door", "on", "in", "under", "next to", "treasure"],
        
        // Opening (MUST have OR)
        opening_line: "Ahoy! 🏴‍☠️ Look at this treasure map! Treasure #1 is marked here. Is it ON the desk or UNDER the box? Say: It is ON the desk OR It is UNDER the box.",
        
        // Guide rules - SUPER STRICT
        guide_rules: "CRITICAL RULES: (1) Show treasure map with 5 treasures (1/5, 2/5, etc.). (2) EVERY question MUST use: 'Is it [preposition + place A] or [preposition + place B]?' (3) Student answers: 'It is ON the desk' or 'The treasure is UNDER the box'. (4) React: 'Ahoy! Correct! ⚓ Let's find treasure #2!' (5) Progress: treasure #1 → #2 → #3 → #4 → #5. (6) When 5/5: 'We found all treasures! 🎉' (7) Locations: ON desk/floor/wall, IN box, UNDER desk/box, NEXT TO door/window. (8) ONE question per turn. FORBIDDEN: 'Where is it?' without OR. 'Can you see it?' without choices. ONLY use: 'Is it [location A] or [location B]?' format.",
        
        // Backup questions (ALL use OR)
        backup_questions: [
          "Treasure #2! Is it IN the box or ON the floor? Say: It is IN the box OR It is ON the floor.",
          "Treasure #3! Is it UNDER the desk or NEXT TO the door? Say: It is UNDER the desk OR It is NEXT TO the door.",
          "Treasure #4! Is it ON the wall or IN the box? Say: It is ON the wall OR It is IN the box.",
          "Last treasure #5! Is it NEXT TO the window or UNDER the box? Say: It is NEXT TO the window OR It is UNDER the box.",
          "Bonus treasure! Is it ON the desk or UNDER the desk? Say: It is ON the desk OR It is UNDER the desk."
        ]
      },
      {
        id: "rp_location_helper",
        title: "Location Detective 🔍",
        title_en: "Location Detective",
        title_vi: "Thám tử Vị trí",
        emoji: "🔍",
        description: "Help Detective Nova find lost items!",
        
        ai_role: "Detective (Ms. Nova) - Looks for items",
        user_role: "Helper - Student tells locations",
        context: "Detective Nova lost 5 items! Student must help find them by describing WHERE they are. CRITICAL: Questions must offer 2 location choices with OR.",
        
        vocab_focus: ["box", "desk", "floor", "wall", "window", "door", "on", "in", "under", "next to"],
        
        opening_line: "Detective Nova here! 🔍 I lost my treasure map! Can you help? Is it ON the desk or IN the box? Say: It is ON the desk OR It is IN the box.",
        
        guide_rules: "CRITICAL DETECTIVE RULES: (1) Show lost items list (treasure map, key, coin, compass, gem - track 1/5 to 5/5). (2) Ask: 'Is the [item] [location A] or [location B]?' (3) Student answers with full sentence: 'It is ON/IN/UNDER/NEXT TO [place]'. (4) React: 'Found it! ⭐ Thank you! Next item...' (5) Progress through all 5 items. (6) ONE question per turn. FORBIDDEN: 'Where is it?' alone. 'Can you see?' without OR. 'Do you think?' ONLY use: 'Is it [location A] or [location B]?' format.",
        
        backup_questions: [
          "Where's my key? Is it UNDER the box or ON the floor? Say: It is UNDER the box OR It is ON the floor.",
          "My coin! Is it IN the box or NEXT TO the window? Say: It is IN the box OR It is NEXT TO the window.",
          "The compass! Is it ON the wall or UNDER the desk? Say: It is ON the wall OR It is UNDER the desk.",
          "My gem! Is it NEXT TO the door or ON the desk? Say: It is NEXT TO the door OR It is ON the desk.",
          "Last item - the map! Is it IN the box or ON the floor? Say: It is IN the box OR It is ON the floor."
        ]
      },
      {
        id: "rp_treasure_quiz",
        title: "Treasure Location Quiz 🎯",
        title_en: "Treasure Location Quiz",
        title_vi: "Đố vui Vị trí Kho báu",
        emoji: "🎯",
        description: "Take Captain Nova's quiz about where treasures are!",
        
        ai_role: "Quiz Master (Captain Nova) - Tests knowledge",
        user_role: "Quiz Taker - Student answers",
        context: "Captain Nova gives a 5-question quiz about treasure locations. Student must describe WHERE treasures should be hidden. CRITICAL: Questions offer 2 hiding spot choices with OR.",
        
        vocab_focus: ["box", "desk", "floor", "wall", "window", "door", "on", "in", "under", "next to", "hide", "treasure"],
        
        opening_line: "Welcome to Treasure Quiz! 🎯 Question 1/5: Where's the best place to hide a treasure? ON the desk or UNDER the desk? Say: UNDER the desk OR ON the desk.",
        
        guide_rules: "CRITICAL QUIZ RULES: (1) Show progress: Question 1/5, 2/5, etc. (2) Ask: 'Where should you hide [item]? [Location A] or [Location B]?' (3) Student answers: 'UNDER the desk', 'IN the box', etc. (4) React: 'Correct! Good hiding spot! ✓ Next question...' (5) ALL 5 questions about WHERE to hide treasures. (6) Locations: ON desk/floor/wall, IN box, UNDER desk/box, NEXT TO door/window. (7) ONE question per turn. FORBIDDEN: 'Where would you hide it?' without OR. 'What do you think?' ONLY use: 'Should you hide it [location A] or [location B]?' format.",
        
        backup_questions: [
          "Question 2/5: Hide a gold coin. IN the box or ON the floor? Say: IN the box OR ON the floor.",
          "Question 3/5: Hide a map. ON the wall or UNDER the box? Say: ON the wall OR UNDER the box.",
          "Question 4/5: Hide a key. NEXT TO the door or IN the box? Say: NEXT TO the door OR IN the box.",
          "Question 5/5: Hide a gem. UNDER the desk or ON the desk? Say: UNDER the desk OR ON the desk.",
          "Bonus! Where's best for treasure? IN box or NEXT TO window? Say: IN box OR NEXT TO window."
        ]
      }
    ]
};

export default week6RealData;
