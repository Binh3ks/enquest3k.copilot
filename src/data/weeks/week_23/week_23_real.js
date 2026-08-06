const week23RealData = {
  week_id: 23,
  week_number: 23,
  title: "The Art Class",
  weekTitle_en: "The Art Class",
  weekTitle_vi: "Lop Hoc My Thuat",
  topic: "Describing art class activities using regular past tense verbs",
  topic_vi: "Mieu ta cac hoat dong lop my thuat dung dong tu co quy tac thi qua khu",
  theme: "Art class activities, painting, folding, cutting, creating masterpieces",

  grammar_focus: "Regular Past Tense Verbs (-ed)",
  grammar_pattern: "Subject + verb-ed [+ art object + time]. Example: I painted a picture yesterday.",
  grammar_examples: [
    "I painted a colorful picture in art class yesterday.",
    "She folded the paper carefully and created a butterfly.",
    "We glued the pieces together and colored them beautifully.",
    "He cut the paper with scissors and brushed on the pigment.",
    "They created a masterpiece with texture and symmetry."
  ],

  target_vocab: [
    { word: "paint",      pronunciation: "/peInt/",        definition_vi: "ve son / son",       definition_en: "to put color on a surface using a brush",               example: "I paint pictures at school.",            syllabus_context: "Art activity" },
    { word: "color",      pronunciation: "/kVl@/",         definition_vi: "to mau",             definition_en: "to fill in a drawing with colors",                      example: "She colors her drawing carefully.",      syllabus_context: "Art activity" },
    { word: "glue",       pronunciation: "/gluE/",         definition_vi: "keo dan",            definition_en: "to stick things together using glue",                   example: "He glues the pieces onto the paper.",    syllabus_context: "Art craft" },
    { word: "fold",       pronunciation: "/f@Uld/",        definition_vi: "gap giay",           definition_en: "to bend paper so one part lies on another",             example: "We fold the paper into a boat shape.",   syllabus_context: "Art craft" },
    { word: "cut",        pronunciation: "/kVt/",          definition_vi: "cat",                definition_en: "to divide something using scissors or a blade",          example: "I cut the paper into small pieces.",     syllabus_context: "Art craft" },
    { word: "picture",    pronunciation: "/pIktS@/",       definition_vi: "buc tranh",          definition_en: "a drawing or painting that shows something",            example: "I drew a picture of my family.",         syllabus_context: "Art creation" },
    { word: "scissors",   pronunciation: "/sIz@z/",        definition_vi: "cai keo",            definition_en: "a tool with two sharp blades used for cutting",         example: "She used scissors to cut the paper.",    syllabus_context: "Art tool" },
    { word: "brush",      pronunciation: "/brVS/",         definition_vi: "co ve",              definition_en: "a tool with bristles used for painting",                example: "He dipped the brush in red paint.",      syllabus_context: "Art tool" },
    { word: "create",     pronunciation: "/krieIt/",       definition_vi: "tao ra",             definition_en: "to make something new using skill and imagination",     example: "We create art every Tuesday.",           syllabus_context: "Art process" },
    { word: "carefully",  pronunciation: "/kE@f@liE/",     definition_vi: "can than",           definition_en: "doing something with great attention to avoid mistakes", example: "She folded the paper carefully.",        syllabus_context: "Skill adverb" },
    { word: "pigment",    pronunciation: "/pIgm@nt/",      definition_vi: "chat tao mau",       definition_en: "a substance that gives color to paint or dye",          example: "Red pigment makes warm colors.",         syllabus_context: "STEM - Color science" },
    { word: "texture",    pronunciation: "/tEkstS@/",      definition_vi: "ket cau be mat",     definition_en: "the way a surface feels when you touch it",             example: "The paper has a rough texture.",         syllabus_context: "STEM - Materials science" },
    { word: "symmetry",   pronunciation: "/sIm@triE/",     definition_vi: "doi xung",           definition_en: "when both sides of a shape look exactly the same",      example: "A butterfly has perfect symmetry.",      syllabus_context: "STEM - Math/Art" }
  ],

  global_vocab: ["paint", "color", "glue", "fold", "cut", "picture", "scissors", "brush", "create", "carefully", "pigment", "texture", "symmetry"],

  nova_instructions: {
    persona: "Enthusiastic art teacher and creative guide who loves colorful art projects",
    tone: "Warm, encouraging, creative, playful, uses art imagery",
    opening_lines_by_mission: {
      mission_1: "Art time! I have Nova art class story! Did Mia paint a picture in art class yesterday? Say: Yes she painted a picture or She colored it carefully!",
      mission_2: "Welcome to YOUR art studio! Tell me about YOUR art class yesterday! Did you paint or color something beautiful? Say: Yes I painted or I folded the paper!",
      mission_3: "Let us discover art at home! Did anyone in your family create something with glue or scissors recently? Say: Yes my mum glued or My brother folded paper!"
    },
    conversation_style: [
      "Warm creative art-studio energy - discovering what students made",
      "One clear question per turn",
      "Model regular past tense (-ed) in every response",
      "NO emojis - text-to-speech will read them aloud",
      "Keep responses under 30 words",
      "Maintain conversation for minimum 10-12 turns per mission",
      "ONLY use regular -ed verbs - reinforce painted, colored, glued, folded, created",
      "Scaffold: Say: I painted... or I folded..."
    ],
    recast_strategy: "ALWAYS recast student errors by modeling correct -ed form naturally in art context",
    recast_example: {
      student: "Mia paint a picture.",
      nova_recast: "Yes! Mia PAINTED a picture! Say: Mia painted a picture in art class. What color did she use?"
    },
    vocabulary_scaffolding: [
      "Mission 1: paint, color, brush, picture, carefully - Mia art class story vocabulary",
      "Mission 2: glue, fold, cut, scissors, create - personal art craft vocabulary",
      "Mission 3: pigment, texture, symmetry, masterpiece - home art and STEM vocabulary"
    ],
    questioning_skill: [
      "What did you paint yesterday?",
      "Did you fold or cut the paper?",
      "What color did you use?",
      "How did you create your picture?",
      "Did you use a brush or scissors?"
    ]
  },

  v28_format_notes: {
    response_format: "ack + recast + question (V28 ONLY - NOT V25)",
    ack_options: ["Oh!", "I see!", "Nice!", "Wow!", "Really?", "Interesting!"],
    recast_max_words: 8,
    recast_rules: [
      "Mirror the student key verb back in correct -ed form",
      "Fix grammar naturally without explanation",
      "Keep it creative and encouraging"
    ],
    question_patterns_allowed: [
      "What did you paint?",
      "Did you fold...?",
      "What color did you use?",
      "How did you create...?",
      "Did you use scissors or glue?"
    ],
    question_patterns_forbidden: [
      "Why do you think...?",
      "What does... mean?",
      "Do you understand?"
    ],
    example_exchanges: [
      { student: "Mia paint a picture", tutor_response: "Nice! Mia PAINTED a picture! Say: She painted a picture. What color did she use?" },
      { student: "I fold the paper", tutor_response: "Wow! You FOLDED the paper! Say: I folded the paper. What shape did you make?" },
      { student: "She cut with scissor", tutor_response: "Great! She CUT with scissors! Say: She cut the paper carefully. What did she create?" }
    ]
  },

  story_missions: [
    {
      mission_id: 1,
      id: 1,
      title: "Mia Art Class - Yesterday Story",
      title_en: "Mia Art Class - Yesterday Story",
      title_vi: "Lop Hoc My Thuat Cua Mia - Cau Chuyen Hom Qua",
      theme: "Following Mia through her art class activities yesterday",

      nova_greeting: "Art class is open! I have Mia art class story from yesterday! Let us discover what she created!",

      mission_context: "CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 2-3 hint choices: Say: ___ or ___! NEVER end a response without a question + choices. LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. This is Week 23 Mission 1. STUDENT PROFILE: 6-12 years old Vietnamese children, A1 level. GRAMMAR FOCUS: Subject + verb-ed. VOCABULARY: painted, colored, glued, folded, created. STRICT FOCUS: REGULAR PAST TENSE ONLY. RECAST ERRORS: student says Mia paint - model: Yes! Mia PAINTED! Say: She painted the picture! Do NOT ask another question on the last turn.",

      target_vocab: ["paint", "color", "brush", "picture", "carefully"],
      target_pattern: "Subject + verb(-ed) [+ art object + time].",

      conversation_topics: [
        "Introduction: Art class started! Mia picked up her brush!",
        "Did Mia paint a colorful picture with her brush?",
        "Did she color the flowers in her picture carefully?",
        "Did Mia fold the paper before she glued it down?",
        "Did she cut the paper with scissors to add decorations?",
        "Did Mia create a texture on her picture using her brush?",
        "Did she carefully glue all the pieces together?",
        "Did the teacher say Mia created a beautiful picture?",
        "Did Mia add red pigment to make the flowers brighter?",
        "Did her picture have symmetry when she folded it in half?"
      ],

      story_character: {
        name: "Mia",
        personality: "creative, loves art, careful with her work",
        backstory: "Mia had art class yesterday and created a beautiful picture using paint, paper, and scissors!",
        speaking_style: "enthusiastic artist, shares step-by-step art process, uses -ed patterns always",
        facts: {
          loves_painting: true,
          uses_scissors: true,
          creates_carefully: true,
          favorite_phrase: "I painted this!"
        },
        role: "Student artist in yesterday art class"
      },

      opening_narrative: "Art class starts now! I am your art guide! First question - did Mia pick up her brush and start painting a picture yesterday? Say: Yes Mia painted a picture or She picked up her brush and painted",

      story_arc: [
        {
          phase: "morning_art",
          turns: "1-5",
          phase_name: "Starting the Art Class",
          focus: "paint, color, brush, picture, carefully",
          goal: "Student follows Mia painting and coloring her picture",
          phase_questions: [
            "Brush ready! Did Mia paint a big colorful picture on her paper yesterday? Say: Yes Mia painted a picture or She painted it with her brush carefully",
            "Colors out! Did she color the flowers in her picture very carefully? Say: Yes she colored the flowers or She used her brush to color them beautifully",
            "Looking good! Did Mia fold a piece of paper before she glued it to her picture? Say: Yes she folded the paper or She glued the folded paper onto the picture",
            "Folding done! Did she use scissors to cut small pieces of paper for decoration? Say: Yes she cut the paper or She carefully cut pieces with her scissors",
            "Cutting complete! Did Mia glue all the cut pieces carefully onto her picture? Say: Yes she glued them on or She carefully glued every piece onto the picture"
          ]
        },
        {
          phase: "afternoon_art",
          turns: "6-10",
          phase_name: "Creating the Masterpiece",
          focus: "create, texture, pigment, scissors, symmetry",
          goal: "Student discovers Mia creating art details and finishing",
          phase_questions: [
            "Glue dry! Did Mia use her brush to add interesting texture to the picture? Say: Yes she added texture or She brushed on texture to make the picture interesting",
            "Texture added! Did she mix a red pigment into her paint to make brighter colors? Say: Yes she used red pigment or She painted with bright red pigment",
            "Bright colors! Did Mia fold the picture in half to check if it had symmetry? Say: Yes she folded it to check symmetry or She checked both sides looked the same",
            "Symmetry checked! Did the teacher say Mia created a beautiful masterpiece? Say: Yes the teacher said it was beautiful or The teacher loved the picture Mia created",
            "Great work! Did Mia carefully place her finished picture on the display board? Say: Yes she placed it carefully or She put her picture on the board"
          ]
        },
        {
          phase: "closing",
          turns: "11-12",
          phase_name: "Art Class Finished!",
          focus: "Summary and goodbye",
          goal: "Wrap up Mia art class story",
          phase_questions: [
            "One last detail! Did Mia write her name carefully on her finished picture? Say: She wrote her name or She carefully signed her masterpiece",
            "Art class complete! Mia painted a picture, colored it carefully, folded and cut paper, glued it all together, and created a brilliant masterpiece with texture and symmetry! You are a wonderful art storyteller!"
          ]
        }
      ],

      minimum_turns: 8,
      maximum_turns: 12
    },

    {
      mission_id: 2,
      id: 2,
      title: "Your Art Class - What Did YOU Create?",
      title_en: "Your Art Class - What Did YOU Create?",
      title_vi: "Lop Hoc Cua Ban - Ban Da Tao Ra Gi?",
      theme: "Student sharing their own art class activities in past tense",

      nova_greeting: "Welcome to YOUR art studio! Now let us talk about YOUR art class! What did YOU create yesterday?",

      mission_context: "CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question, (3) give 2-3 hint choices: Say: ___ or ___! NEVER end a response without a question + choices. LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. This is Week 23 Mission 2. STUDENT PROFILE: 6-12 years old Vietnamese children, A1 level. GRAMMAR FOCUS: I + verb-ed. VOCABULARY: painted, colored, glued, folded, cut, created. RECAST errors naturally with art context.",

      target_vocab: ["glue", "fold", "cut", "scissors", "create"],
      target_pattern: "I + verb(-ed) [+ art object].",

      conversation_topics: [
        "Introduction: Tell me about YOUR art class!",
        "Did you paint something in your last art class?",
        "What color did you use the most?",
        "Did you fold any paper to make a shape?",
        "Did you use scissors to cut anything?",
        "Did you glue pieces together?",
        "What did you create in the end?",
        "Did you create it carefully?",
        "Did your picture have symmetry?",
        "Did your teacher like what you created?"
      ],

      story_character: {
        name: "Nova (as art guide)",
        personality: "encouraging, curious about student creations, celebrates creativity",
        backstory: "Nova wants to hear all about the student art class and what they created!",
        speaking_style: "curious art guide, asks about student personal art experience, models I+verb-ed patterns",
        facts: {
          loves_student_art: true,
          asks_about_colors: true,
          celebrates_creativity: true,
          favorite_phrase: "What did you create?"
        },
        role: "Art guide asking about student personal art experience"
      },

      opening_narrative: "Art studio time! It is your turn to be the artist! First question - did YOU paint something in your last art class? Say: Yes I painted a picture or I colored something beautiful",

      story_arc: [
        {
          phase: "personal_art_start",
          turns: "1-5",
          phase_name: "Your Art Activities",
          focus: "paint, color, brush, picture, carefully",
          goal: "Student describes their own painting and coloring activities",
          phase_questions: [
            "Art class open! Did you paint a picture in your last art class? Say: Yes I painted or I colored something in art class yesterday",
            "Painting time! What color did you use the most? Say: I used blue or I painted with red and yellow",
            "Colorful! Did you fold any paper to make a shape or design in art class? Say: Yes I folded paper or I folded it carefully to make a shape",
            "Folding skills! Did you use scissors to cut any paper in art class? Say: Yes I cut paper or I carefully cut pieces with scissors",
            "Cutting artist! Did you glue the pieces to make your picture? Say: Yes I glued them or I carefully glued each piece onto the paper"
          ]
        },
        {
          phase: "personal_art_finish",
          turns: "6-10",
          phase_name: "Your Masterpiece",
          focus: "create, texture, masterpiece, symmetry, carefully",
          goal: "Student describes finishing their artwork",
          phase_questions: [
            "Glue finished! Did you add any texture to your art with your brush? Say: Yes I added texture or I brushed on texture to make it interesting",
            "Texture artist! What did you create in the end? Say: I created a picture or I made a butterfly and colored it carefully",
            "Amazing creation! Did your picture have symmetry? Say: Yes it had symmetry or I folded it in half to check",
            "Symmetry checker! Did your teacher say you created something beautiful? Say: Yes she said it was beautiful or My teacher liked my picture",
            "Teacher approved! Did you feel proud when you finished your art project? Say: Yes I felt proud or I created my best picture ever"
          ]
        },
        {
          phase: "closing",
          turns: "11-12",
          phase_name: "Your Art Story Complete!",
          focus: "Summary and goodbye",
          goal: "Celebrate student art activities",
          phase_questions: [
            "One final thought! Did you take your finished picture home to show your family? Say: Yes I took it home or I showed my family the picture I painted",
            "Brilliant artist! You painted, colored, folded, cut, glued, and created your own masterpiece! Your art verbs in the past tense are wonderful!"
          ]
        }
      ],

      minimum_turns: 10,
      maximum_turns: 12
    },

    {
      mission_id: 3,
      id: 3,
      title: "Family Art at Home",
      title_en: "Family Art at Home",
      title_vi: "Nghe Thuat Gia Dinh o Nha",
      theme: "Student sharing art and creative activities done by family members",

      nova_greeting: "Art time at home! Let us find out what your family created! Did anyone paint or fold something beautiful at home?",

      mission_context: "CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question, (3) give 2-3 hint choices: Say: ___ or ___! NEVER end a response without a question + choices. LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. This is Week 23 Mission 3. STUDENT PROFILE: 6-12 years old Vietnamese children, A1 level. GRAMMAR FOCUS: Family + verb-ed. VOCABULARY: painted, glued, folded, cut, created, carefully, texture, symmetry. RECAST all errors with art context.",

      target_vocab: ["pigment", "texture", "symmetry", "carefully", "create"],
      target_pattern: "Family member + verb(-ed) [+ art object + time].",

      conversation_topics: [
        "Introduction: Did anyone in your family create something at home?",
        "Did your mum or dad paint anything recently?",
        "Did a family member fold paper to make something?",
        "Did anyone use scissors or glue at home?",
        "Did your family look at the texture of art together?",
        "Did anyone mix pigments or change colors?",
        "Did a family member create something with symmetry?",
        "Did you help someone in your family with an art project?",
        "Did you show your family your art class picture?",
        "Did your family member say your picture was beautiful?"
      ],

      story_character: {
        name: "Nova (as family art detective)",
        personality: "curious, warm, loves hearing about family creativity",
        backstory: "Nova is curious about art and creativity happening in the student home!",
        speaking_style: "warm family-art detective, asks about family creative activities, models family+verb-ed",
        facts: {
          loves_family_art: true,
          asks_about_home: true,
          connects_to_STEM: true,
          favorite_phrase: "What did your family create?"
        },
        role: "Art detective asking about family creative activities"
      },

      opening_narrative: "Art at home time! Let us discover what your family created! First question - did anyone in your family paint or color something beautiful at home recently? Say: Yes my mum painted or My dad colored a picture",

      story_arc: [
        {
          phase: "family_art_activities",
          turns: "1-5",
          phase_name: "Family Creates",
          focus: "paint, color, glue, fold, cut",
          goal: "Student describes family art and creative activities",
          phase_questions: [
            "Family art time! Did your mum or dad paint anything at home recently? Say: Yes my mum painted or My dad colored something beautiful",
            "Home artist! Did anyone in your family fold paper to make a shape or decoration? Say: Yes my sister folded paper or My brother made a paper boat",
            "Paper folding! Did a family member use scissors to cut anything for a project? Say: Yes my mum cut paper or My dad cut the material carefully",
            "Cutting time! Did anyone in your family glue pieces together to make something? Say: Yes my mum glued pieces or My dad carefully glued the parts together",
            "Glue master! Did your family look at the texture of any materials together? Say: Yes we felt the texture or My family touched the rough paper texture"
          ]
        },
        {
          phase: "family_STEM_art",
          turns: "6-10",
          phase_name: "Family STEM and Art",
          focus: "pigment, texture, symmetry, carefully, masterpiece",
          goal: "Student connects family art to STEM concepts",
          phase_questions: [
            "Texture explorers! Did anyone in your family mix paint pigments to create new colors? Say: Yes my mum mixed pigments or My dad created orange by mixing pigments",
            "Color science! Did a family member create something that has symmetry? Say: Yes my sister created a symmetrical butterfly or My dad folded a symmetrical shape",
            "Symmetry artists! Did you help a family member create their art project carefully? Say: Yes I helped carefully or I glued pieces to help with the project",
            "Helpful artist! Did you show your family the picture you created in art class? Say: Yes I showed them my picture or I showed my family what I painted",
            "Show time! Did your family say your art class picture was beautiful? Say: Yes they said it was beautiful or My family loved the picture I created"
          ]
        },
        {
          phase: "closing",
          turns: "11-12",
          phase_name: "Family Art Story Done!",
          focus: "Summary and goodbye",
          goal: "Celebrate family creativity",
          phase_questions: [
            "Almost done! Did you hang your picture or display it somewhere at home? Say: Yes I hung it up or I placed my picture on the wall carefully",
            "Wonderful family art story! Your family painted, folded, cut, glued, and created together! You used past tense art verbs perfectly. Keep creating beautiful things!"
          ]
        }
      ],

      minimum_turns: 12,
      maximum_turns: 12
    }
  ],

  // 💬 SPARK TALK: AI-driven personal expression, bridged from the week's story
  spark_talk: [
    {
      id: 'spark_my_drawing',
      emoji: '🎨',
      title: 'My Drawing',
      bridge: 'The art class made a beautiful painting of the thing they loved most in the world! 🖌️',
      seed_question: 'What did you draw or make? Was it a person or a place?',
      frames: [
        { template: 'I ___ed a beautiful picture', follow_up_q: 'What did you draw or paint? A house or a person?', hints: ['paint', 'colour', 'sketch'] },
        { template: 'I ___ed for a long time', follow_up_q: 'What did you spend a long time doing?', hints: ['paint', 'colour', 'work'] },
        { template: 'I ___ed with coloured pencils', follow_up_q: 'What did you use to make your art?', hints: ['paint', 'colour', 'sketch'] },
        { template: 'I ___ed and showed my mum', follow_up_q: 'What did you make and who did you show it to?', hints: ['paint', 'colour', 'sketch'] },
        { template: 'I ___ed something colourful', follow_up_q: 'What colourful thing did you create?', hints: ['paint', 'colour', 'sketch'] },
        { template: 'I ___ed my favourite animal', follow_up_q: 'What is your favourite thing to draw?', hints: ['paint', 'colour', 'sketch'] },
        { template: 'I mixed ___ and yellow colours', follow_up_q: 'What colours did you mix?', hints: ['red', 'blue', 'green'] },
        { template: 'I loved how it ___ed out', follow_up_q: 'How did your creation turn out? Beautifully or wonderfully?', hints: ['turn', 'work', 'play'] },
      ],
      scaffold_frames: ['I drew/made ___', 'In my picture there is ___', 'I chose this because ___'],
      vocab_focus: ['colour', 'draw', 'paint', 'shape', 'beautiful'],
      turns: 8,
    },
    {
      id: 'spark_art_critic',
      emoji: '🖼️',
      title: 'Art Critic',
      bridge: 'The art critic described every painting — the colours, shapes, feelings, and stories! 🎭',
      seed_question: 'What do you see? Is it colourful or interesting?',
      frames: [
        { template: 'I ___ this artwork', follow_up_q: 'What did you do with the artwork? Did you look at it or create it?', hints: ['created', 'studied', 'admired'] },
        { template: 'The artist ___ bright colours', follow_up_q: 'What did the artist do? Did they use bright colours or dark colours?', hints: ['used', 'painted', 'created'] },
        { template: 'I ___ that the colours were beautiful', follow_up_q: 'What did you notice about the colours?', hints: ['noticed', 'loved', 'discovered'] },
        { template: 'I ___ something interesting in the picture', follow_up_q: 'What interesting thing did you find?', hints: ['noticed', 'discovered', 'spotted'] },
        { template: 'The picture ___ me', follow_up_q: 'What did the picture remind you of?', hints: ['reminded', 'amazed', 'inspired'] },
        { template: 'I ___ that the artist was very talented', follow_up_q: 'What did you think about the artist? Were they talented or creative?', hints: ['noticed', 'believed', 'loved'] },
        { template: 'The art ___ my heart', follow_up_q: 'How did the art make you feel? Did it touch you?', hints: ['touched', 'warmed', 'inspired'] },
        { template: 'I ___ the artwork and felt inspired', follow_up_q: 'How did you feel when you looked at the art?', hints: ['studied', 'admired', 'loved'] }
      ],
      scaffold_frames: ['I can see ___', 'It is ___ and ___', 'I like it because ___'],
      vocab_focus: ['colourful', 'interesting', 'beautiful', 'I think', 'it looks like'],
      turns: 8,
    },
  ],

  conversation_cards: [
    {
      id: "art_class_painting",
      title: "Painting in Art Class",
      emoji: "🎨",
      theme: "Talking about painting and coloring using regular past tense",
      difficulty: "easy",
      exchanges: [
        {
          ai: "Art class time! I am your art teacher Nova! Did you paint anything yesterday? Say: Yes I painted a picture yesterday or I painted flowers in art class",
          options: ["Yes I painted a picture yesterday", "I painted flowers in art class"]
        },
        {
          ai: "Wonderful painting! What color did you use most? Say: I colored it red and yellow or I used blue and green to color it",
          options: ["I colored it red and yellow", "I used blue and green to color it"]
        },
        {
          ai: "Beautiful colors! Did you use a brush to paint carefully? Say: Yes I used a brush and painted carefully or I dipped my brush in the paint",
          options: ["Yes I used a brush and painted carefully", "I dipped my brush in the paint"]
        },
        {
          ai: "Great brushwork! What picture did you paint - flowers, animals or something else? Say: I painted a picture of flowers or I painted an animal picture",
          options: ["I painted a picture of flowers", "I painted an animal picture"]
        },
        {
          ai: "Lovely picture! Did your teacher say your picture looked beautiful? Say: Yes my teacher said it looked beautiful or My teacher smiled at my picture",
          options: ["Yes my teacher said it looked beautiful", "My teacher smiled at my picture"]
        },
        {
          ai: "Amazing! Last question - did you enjoy painting in art class? Say: Yes I enjoyed painting very much or I loved using the brush and colors",
          options: ["Yes I enjoyed painting very much", "I loved using the brush and colors"]
        }
      ],
      completion_message: "Art class conversation complete! You used painted, colored, and brushed perfectly in past tense!"
    },
    {
      id: "folding_cutting_art",
      title: "Folding and Cutting Paper",
      emoji: "✂️",
      theme: "Describing paper folding and cutting using regular past tense",
      difficulty: "easy",
      exchanges: [
        {
          ai: "Paper craft time! Did you fold paper in art class yesterday? Say: Yes I folded the paper carefully or I folded a butterfly shape yesterday",
          options: ["Yes I folded the paper carefully", "I folded a butterfly shape yesterday"]
        },
        {
          ai: "Nice folding! Did you check the symmetry of your shape when you folded it? Say: Yes I checked the symmetry carefully or I folded it in half to check",
          options: ["Yes I checked the symmetry carefully", "I folded it in half to check"]
        },
        {
          ai: "Perfect symmetry! Did you also use scissors to cut paper? Say: Yes I cut the paper with scissors or I used scissors to cut leaf shapes",
          options: ["Yes I cut the paper with scissors", "I used scissors to cut leaf shapes"]
        },
        {
          ai: "Careful cutting! What shapes did you cut - leaves, stars or flowers? Say: I cut leaf shapes from green paper or I cut small flower shapes",
          options: ["I cut leaf shapes from green paper", "I cut small flower shapes"]
        },
        {
          ai: "Beautiful shapes! Did you work carefully when you folded and cut? Say: Yes I worked very carefully or I cut and folded slowly and carefully",
          options: ["Yes I worked very carefully", "I cut and folded slowly and carefully"]
        }
      ],
      completion_message: "Paper craft talk complete! You used folded, cut, and worked brilliantly in past tense!"
    },
    {
      id: "creating_gluing_art",
      title: "Creating Art with Glue",
      emoji: "🖼️",
      theme: "Describing collage creation and texture using regular past tense",
      difficulty: "medium",
      exchanges: [
        {
          ai: "Collage artist time! Did you glue any pieces of paper together in art class? Say: Yes I glued paper pieces together or I glued leaves onto my picture",
          options: ["Yes I glued paper pieces together", "I glued leaves onto my picture"]
        },
        {
          ai: "Great gluing! What did you create when you glued everything together? Say: I created a colorful border or I created a beautiful picture with glue",
          options: ["I created a colorful border", "I created a beautiful picture with glue"]
        },
        {
          ai: "Amazing creation! Did you notice the texture of the paper when you pressed it? Say: Yes I felt the texture of the paper or I pressed the pieces and felt the texture",
          options: ["Yes I felt the texture of the paper", "I pressed the pieces and felt the texture"]
        },
        {
          ai: "Interesting texture! What pigment colors did you use in your art? Say: I used red and yellow pigment or I painted with bright blue pigment",
          options: ["I used red and yellow pigment", "I painted with bright blue pigment"]
        },
        {
          ai: "Vivid pigments! Did your picture turn out beautiful after you painted, cut, and glued? Say: Yes my picture looked beautiful or My picture had great texture and colors",
          options: ["Yes my picture looked beautiful", "My picture had great texture and colors"]
        }
      ],
      completion_message: "Collage creation talk complete! You used glued, created, and painted all in perfect past tense!"
    }
  ],

  metadata: {
    week: 23,
    phase: 1,
    cefr_level: "A1",
    grammar_guard: {
      target_tense: "regular past tense (-ed)",
      forbidden_structures: ["will + verb", "have + verb-ed", "am/is/are + verb-ing"],
      focus_verbs: ["painted", "colored", "glued", "folded", "created", "cut", "brushed"]
    }
  },
  freetalk_knowledge: {
    week_title: "The Art Class",
    week_number: 23,
    theme: "Art class activities — painting, folding, cutting, creating masterpieces",

    knowledge_base: [
      "Art vocabulary: paint, color, brush, picture, carefully, fold, cut, glue, draw, create, mix, canvas, palette",
      "Grammar: Regular Past Tense Verbs (-ed) — used to describe art activities",
      "Pattern: Subject + verb-ed + art object + time",
      "Examples: I painted a picture yesterday. She folded the paper carefully. We cut the shapes and glued them.",
      "Art action verbs: painted, colored, drew, created, folded, cut, glued, mixed, brushed",
      "Describing art: big/small, bright/dark, beautiful/funny, round/square",
      "Materials used in art: paper, scissors, glue, pencils, watercolors, clay",
      "Questions: What did you make? What colors did you use?"
    ],

    example_opening_questions: [
      "Did you draw or paint anything recently?",
      "What art project did you make at school?",
      "What colors did you use in your last drawing?",
      "Did you ever fold paper into an origami shape?",
      "What is your favourite thing to make or create?",
      "If you could paint anything, what would you paint?"
    ],

    // FREE TALK 2.0: Starter prompts
    starter_prompts: [
      { text_en: "I want to play games! 🎮", text_vi: "Tôi muốn chơi game!", type: "game" },
      { text_en: "Translate this for me... 📖", text_vi: "Dịch giúp con câu/chữ này...", type: "help" },
      { text_en: "I have a question! ❓", text_vi: "Con có câu hỏi!", type: "ask" }
    ]
  },
};

export default week23RealData;
