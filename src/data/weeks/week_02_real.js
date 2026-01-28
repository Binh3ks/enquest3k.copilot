/**
 * ✅ WEEK 2 REAL SYLLABUS DATA
 * 
 * Source: 1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt
 * Phase 1 - Block A: Week 2
 * 
 * Generated per: WEEK_PRODUCTION_PROMPT_V2.1.md (Jan 27, 2026)
 * - Cloned from Week 5 structure (proven template)
 * - Story Missions với story_arc (4 phases each)
 * - Natural question phrasing với {student_answer} placeholders
 * - Full scaffolding patterns
 */

const week2RealData = {
  // === METADATA ===
  week_id: 2,
  phase: 1,
  block: "A",
  unit: 1,
  week_number: 2,
  
  // === OFFICIAL SYLLABUS DATA ===
  title: "Week 2: My Family Squad",
  week_title_en: "My Family Squad (Relationships)",
  week_title_vi: "Biệt đội Gia đình (Mối quan hệ)",
  
  topic: "Family members and relationships",
  topic_vi: "Các thành viên gia đình và mối quan hệ",
  
  // === KEY LEARNING OUTCOME ===
  learning_outcome: "Describe family members using possessive adjectives (my, your) and simple present tense.",
  learning_outcome_vi: "Mô tả các thành viên gia đình bằng cách sử dụng tính từ sở hữu (my, your) và thì hiện tại đơn.",
  
  // === GRAMMAR FOCUS ===
  grammar_focus: "Possessive Adjectives (My, Your)",
  grammar_pattern: "My [family member] is [adjective].",
  grammar_examples: [
    "My mother is kind.",
    "My father is strong.",
    "My brother is funny.",
    "My sister is smart.",
    "My family is happy."
  ],
  
  // === TARGET VOCABULARY (TIER 1 - A0++) ===
  target_vocab: [
    {
      word: "mother",
      pronunciation: "/ˈmʌðər/",
      definition_vi: "Mẹ",
      definition_en: "A female parent.",
      example: "My mother is kind.",
      syllabus_context: "Family members"
    },
    {
      word: "father",
      pronunciation: "/ˈfɑːðər/",
      definition_vi: "Bố",
      definition_en: "A male parent.",
      example: "My father is strong.",
      syllabus_context: "Family members"
    },
    {
      word: "brother",
      pronunciation: "/ˈbrʌðər/",
      definition_vi: "Anh/Em trai",
      definition_en: "A male sibling.",
      example: "My brother is funny.",
      syllabus_context: "Family members"
    },
    {
      word: "sister",
      pronunciation: "/ˈsɪstər/",
      definition_vi: "Chị/Em gái",
      definition_en: "A female sibling.",
      example: "My sister is smart.",
      syllabus_context: "Family members"
    },
    {
      word: "family",
      pronunciation: "/ˈfæməli/",
      definition_vi: "Gia đình",
      definition_en: "People related by blood who live together.",
      example: "My family is happy.",
      syllabus_context: "Family concept"
    },
    {
      word: "home",
      pronunciation: "/hoʊm/",
      definition_vi: "Nhà",
      definition_en: "The place where you live.",
      example: "My home is nice.",
      syllabus_context: "Family setting"
    },
    {
      word: "kind",
      pronunciation: "/kaɪnd/",
      definition_vi: "Tốt bụng",
      definition_en: "Friendly and caring.",
      example: "My mother is kind.",
      syllabus_context: "Personality traits"
    },
    {
      word: "happy",
      pronunciation: "/ˈhæpi/",
      definition_vi: "Hạnh phúc, vui vẻ",
      definition_en: "Feeling joy and contentment.",
      example: "My family is happy.",
      syllabus_context: "Emotions"
    },
    {
      word: "love",
      pronunciation: "/lʌv/",
      definition_vi: "Yêu",
      definition_en: "Strong affection for someone.",
      example: "I love my family.",
      syllabus_context: "Emotions"
    },
    {
      word: "together",
      pronunciation: "/təˈɡeðər/",
      definition_vi: "Cùng nhau",
      definition_en: "With each other, as a group.",
      example: "We play together.",
      syllabus_context: "Family activities"
    }
  ],
  
  // === 3 STORY MISSIONS ===
  missions: [
    {
      mission_id: 1,
      title: "Meet My Family",
      title_en: "Meet My Family",
      title_vi: "Gặp Gỡ Gia Đình Tôi",
      theme: "Introducing Family Members",
      
      nova_greeting: "Hi! I want to learn about your family! Tell me about your family!",
      default_hints: ["My", "mother", "father", "is", "kind"],
      
      mission_context: `This is Week 2 Mission 1 - Meet My Family (Introduction).

🚨 CRITICAL: USE EXACT TEXT FROM phase_questions ARRAY
- DON'T modify or shorten the questions
- COPY question text word-for-word from phase_questions
- Each student answer = Move to NEXT question in phase_questions array

🚨🚨🚨 ABSOLUTELY FORBIDDEN QUESTIONS - NEVER EVER ASK THESE: 🚨🚨🚨
❌ "What do you think?" - FORBIDDEN!
❌ "How do you feel?" - FORBIDDEN!
❌ "Do you like...?" (without options) - FORBIDDEN!
❌ "What can I do for you?" - FORBIDDEN!
❌ Personal opinion questions - FORBIDDEN!
❌ Breaking character - FORBIDDEN!

✅ ONLY ASK QUESTIONS FROM THE phase_questions ARRAY BELOW!

GRAMMAR: "My [family member] is [adjective]" pattern
VOCABULARY: mother, father, brother, sister, family, home, kind, happy, love, together`,
      
      target_vocab: ["mother", "father", "brother", "sister", "family", "home", "kind", "happy"],
      grammar_pattern: "My [family member] is [adjective].",

      story_character: {
        name: "Ms. Nova",
        personality: "warm, curious about families, encouraging",
        backstory: "I love learning about different families! Every family is special and unique!",
        speaking_style: "asks about family members one by one, celebrates each answer, uses 'my' and 'your' correctly",
        facts: [
          "I think families are wonderful teams!",
          "Every family member is important!",
          "Families help each other and love each other!",
          "I love hearing students describe their families!"
        ],
        role: "Family conversation guide"
      },

      opening_narrative: "🏠 Hi! I'm Ms. Nova! I want to learn about YOUR family! First, who do you live with? Say: I live with my mother, my father... Tell me!",

      story_arc: [
        {
          phase: "intro",
          turns: "1-5",
          phase_name: "Family Members Introduction",
          focus: "Name family members and start describing",
          phase_questions: [
            "(After student says who they live with) Great! Tell me about your mother! What is your mother like? Say: My mother is kind OR My mother is nice OR My mother is beautiful",
            "(After describing mother) Wonderful! Your mother is {student_answer}! ❤️ Now tell me about your father! What is your father like? Say: My father is strong OR My father is kind OR My father is tall",
            "(After describing father) Excellent! Your father is {student_answer}! 💪 Do you have brothers or sisters? Say: Yes, I have a brother OR Yes, I have a sister OR No, I don't have brothers or sisters",
            "(After sibling answer) I see! Now, tell me about your brother or sister! What are they like? Say: My brother is funny OR My sister is smart OR My brother is kind",
            "(After sibling description) Nice! {student_answer}! ✨ Now tell me - is your family big or small? Say: My family is big OR My family is small"
          ]
        },
        {
          phase: "family_details",
          turns: "6-11",
          phase_name: "Family Characteristics",
          focus: "Describe family personality and relationships",
          phase_questions: [
            "(After family size) Good! Your family is {student_answer}! 👨‍👩‍👧‍👦 What does your mother do at home? Say: My mother cooks OR My mother cleans OR My mother helps me",
            "(After mother's activities) Great! She {student_answer}! 🍳 What about your father? What does your father do? Say: My father works OR My father plays with me OR My father helps me",
            "(After father's activities) Excellent! He {student_answer}! 💼 Do you help your family? Say: Yes, I help my mother OR Yes, I help my father OR Yes, I help clean",
            "(After helping answer) Wonderful! You {student_answer}! 👏 What do you do together with your family? Say: We eat together OR We play together OR We watch TV together",
            "(After family activities) Nice! You {student_answer}! 🎉 Is your home big or small? Say: My home is big OR My home is small",
            "(After home size) Good! Your home is {student_answer}! 🏠 Is your family happy? Say: Yes, my family is happy OR Yes, my family is very happy"
          ]
        },
        {
          phase: "family_love",
          turns: "12-17",
          phase_name: "Family Love and Togetherness",
          focus: "Express feelings about family",
          phase_questions: [
            "(After happiness answer) Wonderful! {student_answer}! 😊 Who is your favorite in your family? Say: My mother is my favorite OR My father is my favorite OR My brother is my favorite",
            "(After favorite person) I see! {student_answer}! ❤️ Why do you love your mother? Say: I love my mother because she is kind OR because she helps me OR because she cooks for me",
            "(After mother love reason) Beautiful! You love her because {student_answer}! 💝 Why do you love your father? Say: I love my father because he is strong OR because he plays with me OR because he is kind",
            "(After father love reason) Perfect! You love him because {student_answer}! 💙 Do your brothers or sisters play with you? Say: Yes, they play with me OR Yes, we play together OR No, I don't have brothers or sisters",
            "(After sibling play) Great! {student_answer}! 🎮 What makes your family happy? Say: We are happy when we eat together OR when we play together OR when we help each other",
            "(After what makes family happy) Beautiful! Your family is happy when {student_answer}! 🌟 Do you love your family? Say: Yes, I love my family very much!"
          ]
        },
        {
          phase: "closing",
          turns: "18-20",
          phase_name: "Celebration and Gratitude",
          focus: "Wrap up with appreciation for family",
          phase_questions: [
            "(After expressing love) Wonderful! You said: {student_answer}! ❤️❤️❤️ Tell me one more thing - what is special about your family? Say: My family is special because we love each other OR because we are happy OR because we help each other",
            "(After what's special) Perfect! Your family is special because {student_answer}! ✨ Last question - can you say thank you to your family? Say: Thank you mother, thank you father, thank you family!",
            "(After thank you) Beautiful! 🎉 You have a wonderful family! Thank you for telling me about them! Your family is lucky to have you! Great job! Goodbye!"
          ]
        }
      ],
      
      minimum_turns: 15,
      maximum_turns: 20
    },
    {
      mission_id: 2,
      title: "Family Photos",
      title_en: "Family Photos",
      title_vi: "Ảnh Gia Đình",
      theme: "Family Description Game",
      
      nova_greeting: "📸 Wow! I found your family photos! Let's play a guessing game!",
      default_hints: ["My", "mother", "is", "kind", "father"],
      
      mission_context: `This is Week 2 Mission 2 - Family Photos (Guessing Game).

🚨 CRITICAL: USE EXACT TEXT FROM phase_questions ARRAY
- DON'T modify or shorten the questions
- COPY question text word-for-word from phase_questions
- Each student answer = Move to NEXT question in phase_questions array

STRICT GAME RULES:
1. Ms. Nova looks at a family photo and gives clues about a family member
2. Student guesses who it is or describes them
3. Ms. Nova confirms and moves to NEXT photo/person
4. NEVER ask the same question twice

FORBIDDEN:
❌ Asking about same person twice
❌ "Tell me more" (too vague!)
❌ Personal questions about student's feelings

CORRECT FORMAT:
✅ "This person is kind. Who is it? Your mother or your father?"
✅ "Look! This person has a big smile. Is it your brother or your sister?"
✅ Natural acknowledgment: "Yes! Your {family member}!"

VOCABULARY: mother, father, brother, sister, family, kind, happy, love, together
GRAMMAR: "My [family member] is [adjective]"
PATTERN: Guess family members from photo clues`,
      
      target_vocab: ["mother", "father", "brother", "sister", "kind", "happy", "love", "together"],
      grammar_pattern: "My [family member] is [adjective].",

      objectives: [
        {
          stepKey: "guess_kind_person",
          category: "Family Member",
          question_variants: [
            {
              question: "Look at this photo! I see someone kind. Who is kind in your family?",
              hints: ["My", "mother", "is", "kind", "father"]
            },
            {
              question: "This person looks kind! Is it your mother or your father?",
              hints: ["mother", "My", "is", "kind"]
            }
          ],
          target_keywords: ["mother", "father", "kind"],
          ack_options: ["Yes!", "Correct!", "Good!"],
          recast_templates: [
            "Your {family_member} is kind!",
            "{family_member}! Great!"
          ],
          success_criteria: "Student identifies kind person"
        },
        {
          stepKey: "describe_mother",
          category: "Description",
          question_variants: [
            {
              question: "What is your mother like?",
              hints: ["My", "mother", "is", "kind", "nice", "beautiful"]
            },
            {
              question: "Tell me about your mother!",
              hints: ["mother", "My", "is", "kind"]
            }
          ],
          target_keywords: ["kind", "nice", "beautiful", "happy", "good"],
          ack_options: ["Wonderful!", "Beautiful!", "Great!"],
          recast_templates: [
            "Your mother is {adjective}!",
            "{adjective}! Great!"
          ],
          success_criteria: "Student describes mother"
        },
        {
          stepKey: "guess_strong_person",
          category: "Family Member",
          question_variants: [
            {
              question: "New photo! I see someone strong. Who is strong?",
              hints: ["My", "father", "is", "strong"]
            },
            {
              question: "This person is strong! Your father or your brother?",
              hints: ["father", "My", "is", "strong"]
            }
          ],
          target_keywords: ["father", "brother", "strong"],
          ack_options: ["Yes!", "Correct!", "Good!"],
          recast_templates: [
            "Your {family_member}! Good!",
            "{family_member} is strong!"
          ],
          success_criteria: "Student identifies strong person"
        },
        {
          stepKey: "describe_father",
          category: "Description",
          question_variants: [
            {
              question: "What is your father like?",
              hints: ["My", "father", "is", "strong", "kind"]
            },
            {
              question: "Tell me about your father!",
              hints: ["father", "My", "is", "strong"]
            }
          ],
          target_keywords: ["strong", "kind", "hardworking", "nice"],
          ack_options: ["Great!", "Excellent!", "Perfect!"],
          recast_templates: [
            "Your father is {adjective}!",
            "{adjective}! Wonderful!"
          ],
          success_criteria: "Student describes father"
        },
        {
          stepKey: "family_happy",
          category: "Family Feeling",
          question_variants: [
            {
              question: "Look! Everyone together! Is your family happy?",
              hints: ["Yes", "my", "family", "is", "happy"]
            },
            {
              question: "Are they happy together?",
              hints: ["Yes", "happy", "family", "my"]
            }
          ],
          target_keywords: ["yes", "happy", "family"],
          ack_options: ["Wonderful!", "Beautiful!", "Great!"],
          recast_templates: [
            "Your family is happy!",
            "Yes! Happy family!"
          ],
          success_criteria: "Student says family is happy"
        },
        {
          stepKey: "do_you_love_family",
          category: "Family Love",
          question_variants: [
            {
              question: "Do you love your family?",
              hints: ["Yes", "I", "love", "my", "family"]
            },
            {
              question: "Do you love them?",
              hints: ["Yes", "love", "I", "them"]
            }
          ],
          target_keywords: ["yes", "love", "family"],
          ack_options: ["Beautiful!", "Wonderful!", "Perfect!"],
          recast_templates: [
            "You love your family!",
            "Yes! You love them!"
          ],
          success_criteria: "Student expresses love for family"
        },
        {
          stepKey: "have_sibling",
          category: "Siblings",
          question_variants: [
            {
              question: "Do you have a brother or a sister?",
              hints: ["I", "have", "a", "brother", "sister"]
            },
            {
              question: "Any brothers or sisters?",
              hints: ["Yes", "I", "have", "brother"]
            }
          ],
          target_keywords: ["yes", "no", "brother", "sister", "have"],
          ack_options: ["Nice!", "I see!", "Good!"],
          recast_templates: [
            "You have a {sibling}!",
            "A {sibling}! Great!"
          ],
          success_criteria: "Student tells about siblings",
          allow_skip: true
        },
        {
          stepKey: "describe_sibling",
          category: "Description",
          question_variants: [
            {
              question: "What is your brother/sister like?",
              hints: ["My", "brother", "is", "funny", "smart"]
            },
            {
              question: "Tell me about your brother or sister!",
              hints: ["sister", "My", "is", "smart"]
            }
          ],
          target_keywords: ["funny", "smart", "kind", "nice"],
          ack_options: ["Nice!", "Great!", "Wonderful!"],
          recast_templates: [
            "Your {sibling} is {adjective}!",
            "{adjective}! Good!"
          ],
          success_criteria: "Student describes sibling",
          conditional: "if has sibling"
        },
        {
          stepKey: "where_is_family",
          category: "Location",
          question_variants: [
            {
              question: "Where is your family in this photo?",
              hints: ["At", "home", "park", "in", "the"]
            },
            {
              question: "Where are they?",
              hints: ["At", "home", "They", "are"]
            }
          ],
          target_keywords: ["home", "park", "house", "at"],
          ack_options: ["Good!", "Nice!", "I see!"],
          recast_templates: [
            "At {place}! Good!",
            "Your family is at {place}!"
          ],
          success_criteria: "Student tells location"
        },
        {
          stepKey: "what_family_do",
          category: "Activities",
          question_variants: [
            {
              question: "What does your family do together?",
              hints: ["We", "play", "eat", "watch", "TV"]
            },
            {
              question: "What do you do together?",
              hints: ["play", "We", "together"]
            }
          ],
          target_keywords: ["play", "eat", "watch", "together"],
          ack_options: ["Nice!", "Wonderful!", "Great!"],
          recast_templates: [
            "You {activity} together!",
            "{activity}! Fun!"
          ],
          success_criteria: "Student names activity"
        },
        {
          stepKey: "who_cooks",
          category: "Family Roles",
          question_variants: [
            {
              question: "Who cooks in your family?",
              hints: ["My", "mother", "cooks", "father"]
            },
            {
              question: "Who makes food?",
              hints: ["mother", "My", "cooks"]
            }
          ],
          target_keywords: ["mother", "father", "cooks"],
          ack_options: ["Good!", "I see!", "Nice!"],
          recast_templates: [
            "Your {family_member} cooks!",
            "{family_member} cooks! Good!"
          ],
          success_criteria: "Student tells who cooks"
        },
        {
          stepKey: "tell_about_mother",
          category: "Free Description",
          question_variants: [
            {
              question: "Your turn! Tell me about your mother!",
              hints: ["My", "mother", "is", "kind", "nice"]
            },
            {
              question: "Describe your mother for me!",
              hints: ["mother", "My", "is", "kind"]
            }
          ],
          target_keywords: ["mother", "kind", "nice", "beautiful"],
          ack_options: ["Wonderful!", "Beautiful!", "Perfect!"],
          recast_templates: [
            "Your mother is {adjective}!",
            "{adjective}! Wonderful!"
          ],
          success_criteria: "Student describes mother freely"
        },
        {
          stepKey: "tell_about_father",
          category: "Free Description",
          question_variants: [
            {
              question: "Now tell me about your father!",
              hints: ["My", "father", "is", "strong", "kind"]
            },
            {
              question: "Describe your father!",
              hints: ["father", "My", "is", "strong"]
            }
          ],
          target_keywords: ["father", "strong", "kind", "hardworking"],
          ack_options: ["Great!", "Excellent!", "Perfect!"],
          recast_templates: [
            "Your father is {adjective}!",
            "{adjective}! Great!"
          ],
          success_criteria: "Student describes father freely"
        },
        {
          stepKey: "do_you_help",
          category: "Family Help",
          question_variants: [
            {
              question: "Do you help your family at home?",
              hints: ["Yes", "I", "help", "my", "family"]
            },
            {
              question: "Do you help them?",
              hints: ["Yes", "help", "I", "them"]
            }
          ],
          target_keywords: ["yes", "help", "family"],
          ack_options: ["Good job!", "Wonderful!", "Great!"],
          recast_templates: [
            "You help your family!",
            "You help them! Good!"
          ],
          success_criteria: "Student tells if they help"
        },
        {
          stepKey: "what_do_you_say",
          category: "Expressions",
          question_variants: [
            {
              question: "What do you say to your family?",
              hints: ["I", "love", "you", "thank", "you"]
            },
            {
              question: "What words do you say to them?",
              hints: ["love", "I", "you"]
            }
          ],
          target_keywords: ["love", "thank", "you"],
          ack_options: ["Perfect!", "Beautiful!", "Wonderful!"],
          recast_templates: [
            "You say {expression}!",
            "{expression}! Beautiful!"
          ],
          success_criteria: "Student expresses love/thanks"
        },
        {
          stepKey: "what_makes_family_happy",
          category: "Family Happiness",
          question_variants: [
            {
              question: "What makes your family happy?",
              hints: ["When", "we", "are", "together", "play"]
            },
            {
              question: "When is your family happy?",
              hints: ["together", "When", "we", "are"]
            }
          ],
          target_keywords: ["together", "play", "love", "eat"],
          ack_options: ["Beautiful!", "Wonderful!", "Perfect!"],
          recast_templates: [
            "Your family is happy when {reason}!",
            "When {reason}! Beautiful!"
          ],
          success_criteria: "Student tells what makes family happy"
        },
        {
          stepKey: "say_thank_you",
          category: "Gratitude",
          question_variants: [
            {
              question: "Your photos are wonderful! Say thank you!",
              hints: ["Thank", "you", "My", "family", "great"]
            },
            {
              question: "What do you say about your family?",
              hints: ["Thank", "you", "family", "great"]
            }
          ],
          target_keywords: ["thank", "you", "family", "great"],
          ack_options: ["Perfect!", "Beautiful!", "Wonderful!"],
          recast_templates: [
            "You said {expression}!",
            "{expression}! Perfect!"
          ],
          success_criteria: "Student says thank you"
        },
        {
          stepKey: "who_love_most",
          category: "Family Love",
          question_variants: [
            {
              question: "Who do you love most in your family?",
              hints: ["I", "love", "my", "mother", "father", "family"]
            },
            {
              question: "Who is your favorite?",
              hints: ["mother", "My", "father", "love"]
            }
          ],
          target_keywords: ["love", "mother", "father", "family"],
          ack_options: ["Beautiful!", "Wonderful!", "Perfect!"],
          recast_templates: [
            "You love your {family_member}!",
            "Your {family_member}! Beautiful!"
          ],
          success_criteria: "Student expresses who they love"
        },
        {
          stepKey: "they_love_you",
          category: "Mutual Love",
          question_variants: [
            {
              question: "Do they love you too?",
              hints: ["Yes", "they", "love", "me"]
            },
            {
              question: "Does your family love you?",
              hints: ["Yes", "love", "they", "me"]
            }
          ],
          target_keywords: ["yes", "love", "me"],
          ack_options: ["Perfect!", "Beautiful!", "Wonderful!"],
          recast_templates: [
            "Yes! They love you!",
            "They love you! Perfect!"
          ],
          success_criteria: "Student confirms mutual love"
        },
        {
          stepKey: "goodbye_family_photos",
          category: "Closing",
          question_variants: [
            {
              question: "Your family is amazing! Thank you for sharing! Great job! Goodbye!",
              hints: []
            }
          ],
          target_keywords: ["goodbye", "bye", "thank", "you"],
          ack_options: ["Goodbye!", "Bye!", "See you!"],
          recast_templates: [
            "Goodbye! Great job!",
            "Thank you! Bye!"
          ],
          success_criteria: "Mission complete"
        }
      ],

      story_character: {
        name: "Ms. Nova",
        personality: "curious, playful, loves guessing games about families",
        backstory: "I found your family photo album! Let's play a guessing game with the photos!",
        speaking_style: "gives clues, asks who/what, celebrates correct guesses",
        facts: [
          "I love looking at family photos!",
          "Each family member is special!",
          "I'll give you clues and you guess!",
          "We use 'My mother is...' and 'My father is...' patterns!"
        ],
        role: "Photo game host giving family member clues"
      },

      opening_narrative: "📸 Wow! I found your family photos! Look at this one! I see someone who is kind. Who is kind in your family? Say: My mother is kind OR My father is kind",

      story_arc: [
        {
          phase: "intro",
          turns: "1-5",
          phase_name: "First Photo Clues",
          focus: "Guess family members from descriptions",
          phase_questions: [
            "(After student says mother) Yes! Your mother! ❤️ What is your mother like? Say: My mother is kind OR My mother is nice OR My mother is beautiful",
            "(After describing mother) Beautiful! Your mother is {student_answer}! 💖 Next photo! I see someone who is strong. Who is strong in your family? Say: My father is strong OR My brother is strong",
            "(After student says father) Correct! Your father! 💪 What is your father like? Say: My father is strong OR My father is kind OR My father is hardworking",
            "(After describing father) Great! Your father is {student_answer}! 👔 Look! This photo shows everyone together! Are they happy together? Say: Yes, my family is happy together OR My family is very happy",
            "(After family happy) Wonderful! {student_answer}! 👨‍👩‍👧‍👦 Do you love your family? Say: Yes, I love my family OR Yes, I love them very much"
          ]
        },
        {
          phase: "middle",
          turns: "6-11",
          phase_name: "More Family Members",
          focus: "Continue guessing siblings and family",
          phase_questions: [
            "(After happy family) Wonderful! {student_answer}! 😊 New photo! This person plays with you at home. Do you have a brother or a sister? Say: I have a brother OR I have a sister OR I have both",
            "(After sibling) Nice! {student_answer}! 👫 What is your brother/sister like? Say: My brother is funny OR My sister is smart OR My brother is kind",
            "(After describing sibling) {student_answer}! Great! 🎮 Look at this photo! Your family is together. Where is your family? Say: At home OR In the park OR At a restaurant",
            "(After location) You are {student_answer}! 🏠 What does your family do together? Say: We play OR We eat OR We watch TV",
            "(After activity) You {student_answer} together! 📺 Does your family love each other? Say: Yes, we love each other OR Yes, my family loves each other",
            "(After love) Beautiful! {student_answer}! ❤️ Who cooks in your family? Say: My mother cooks OR My father cooks OR My mother and father cook"
          ]
        },
        {
          phase: "your_turn",
          turns: "12-16",
          phase_name: "You Describe Photos",
          focus: "Student describes family members",
          phase_questions: [
            "(After cooking) {student_answer}! 🍳 Now YOUR turn! Tell me about your mother! What is she like? Say: My mother is kind OR My mother is beautiful OR My mother is nice",
            "(After mother description) Your mother is {student_answer}! Wonderful! ❤️ Now tell me about your father! What is he like? Say: My father is strong OR My father is kind OR My father is hardworking",
            "(After father description) Your father is {student_answer}! Great! 💪 Do you help your mother and father at home? Say: Yes, I help them OR Yes, I help my mother OR Yes, I help my father",
            "(After helping) Good job! {student_answer}! 🙌 What do you say to your family? Say: I love you OR Thank you OR I love my family",
            "(After what you say) Perfect! {student_answer}! 💕 Last photo question! What makes your family happy? Say: When we are together OR When we play together OR When we love each other"
          ]
        },
        {
          phase: "closing",
          turns: "17-20",
          phase_name: "Celebration",
          focus: "Celebrate family love",
          phase_questions: [
            "(After family happy) Beautiful! {student_answer}! 😊 Your family photos are wonderful! Say: Thank you! OR My family is great!",
            "(After thank you) {student_answer}! ❤️ One more time - who do you love most? Say: I love my mother OR I love my father OR I love my family",
            "(After love) You {student_answer}! 💖 And they love you too! Say: Yes, they love me!",
            "(After they love) Perfect! 👨‍👩‍👧‍👦 Your family is amazing! Thank you for sharing your photos with me! Great job! Goodbye!"
          ]
        }
      ],
      
      minimum_turns: 12,
      maximum_turns: 18
    },
    {
      mission_id: 3,
      title: "Mixed Up Family",
      title_en: "Mixed Up Family",
      title_vi: "Gia Đình Lẫn Lộn",
      theme: "My vs Your Grammar Game",
      
      nova_greeting: "🤔 Oh no! I keep saying the wrong words! Can you fix my mistakes?",
      default_hints: ["mother", "Your", "sister", "My", "Your", "brother"],
      
      mission_context: `This is Week 2 Mission 3 - Mixed Up Family (Grammar Correction Game).

STRICT GAME RULES:
1. Ms. Nova says WRONG sentence mixing "My" and "Your"
2. Student fixes it
3. Ms. Nova confirms: "Yes! Fixed! MY mother is kind! ✅"
4. IMMEDIATELY ask next question with NEW mixed-up sentence

RESPONSE FORMAT - MUST FOLLOW:
STEP 1: Acknowledge fix: "Yes! Fixed! [CORRECT SENTENCE]! ✅"
STEP 2: Give next error: "🤔 I said: [WRONG SENTENCE]. Can you fix this?"

FORBIDDEN:
❌ "Good job!" without giving next sentence
❌ Explaining grammar rules (game only!)
❌ Asking "Do you understand?"
❌ Breaking character

CORRECT PATTERN:
✅ "Yes! MY mother is kind! ✅ Error: '🤔 Your father works.' But I'm talking about MY father! Fix it!"
✅ "Perfect! MY father works! ✅ Next error: '🤔 My sister is smart' but I'm asking about YOUR sister! What should I say?"

VOCABULARY: My, Your, mother, father, brother, sister, family, kind, happy
GRAMMAR: "My vs Your" possessive adjectives
PATTERN: Fix possessive adjective errors in family sentences`,
      
      target_vocab: ["mother", "father", "brother", "sister", "family", "kind", "happy", "love"],
      grammar_pattern: "My [family member] is... / Your [family member] is...",

      objectives: [
        {
          stepKey: "fix_my_mother_kind",
          category: "Grammar Fix",
          question_variants: [
            {
              question: "Oh no! I said 'Your mother is kind' but I mean MY mother! Fix it!",
              hints: ["My", "mother", "is", "kind"]
            },
            {
              question: "Wrong! 'Your mother...' - but this is MY mother! Help me!",
              hints: ["My", "mother", "is", "kind"]
            }
          ],
          target_keywords: ["my", "mother", "kind"],
          ack_options: ["Yes! Fixed!", "Perfect!", "Correct!"],
          recast_templates: [
            "Yes! MY mother is kind! ✅",
            "Fixed! MY mother is kind! ✅"
          ],
          success_criteria: "Student fixes 'my' vs 'your' error"
        },
        {
          stepKey: "fix_your_father_strong",
          category: "Grammar Fix",
          question_variants: [
            {
              question: "I said 'My father is strong' but I want to ask about YOUR father! Fix!",
              hints: ["Your", "father", "is", "strong"]
            },
            {
              question: "Error! 'My father...' - but I mean YOUR father! What's correct?",
              hints: ["Your", "father", "strong"]
            }
          ],
          target_keywords: ["your", "father", "strong"],
          ack_options: ["Perfect!", "Yes!", "Great!"],
          recast_templates: [
            "Perfect! YOUR father is strong! ✅",
            "Fixed! YOUR father is strong! ✅"
          ],
          success_criteria: "Student fixes possessive error"
        },
        {
          stepKey: "fix_my_brother_funny",
          category: "Grammar Fix",
          question_variants: [
            {
              question: "Mistake! 'Your brother is funny' but this is MY brother! Fix it!",
              hints: ["My", "brother", "is", "funny"]
            },
            {
              question: "Wrong word! I said 'Your brother...' - but MY brother! Help!",
              hints: ["My", "brother", "funny"]
            }
          ],
          target_keywords: ["my", "brother", "funny"],
          ack_options: ["Great!", "Yes!", "Perfect!"],
          recast_templates: [
            "Great! MY brother is funny! ✅",
            "Fixed! MY brother is funny! ✅"
          ],
          success_criteria: "Student corrects possessive"
        },
        {
          stepKey: "fix_your_sister_smart",
          category: "Grammar Fix",
          question_variants: [
            {
              question: "I said 'My sister is smart' but I'm asking about YOUR sister! Fix!",
              hints: ["Your", "sister", "is", "smart"]
            },
            {
              question: "Error! 'My sister...' - but YOUR sister! What should I say?",
              hints: ["Your", "sister", "smart"]
            }
          ],
          target_keywords: ["your", "sister", "smart"],
          ack_options: ["Excellent!", "Yes!", "Perfect!"],
          recast_templates: [
            "Excellent! YOUR sister is smart! ✅",
            "Fixed! YOUR sister is smart! ✅"
          ],
          success_criteria: "Student fixes possessive error"
        },
        {
          stepKey: "fix_my_family_happy",
          category: "Grammar Fix",
          question_variants: [
            {
              question: "Wrong! 'Your family is happy' but I mean MY family! Correct it!",
              hints: ["My", "family", "is", "happy"]
            },
            {
              question: "Mistake! I said 'Your family...' - but MY family! Fix!",
              hints: ["My", "family", "happy"]
            }
          ],
          target_keywords: ["my", "family", "happy"],
          ack_options: ["Yes!", "Perfect!", "Great!"],
          recast_templates: [
            "Yes! MY family is happy! ✅",
            "Fixed! MY family is happy! ✅"
          ],
          success_criteria: "Student fixes family possessive"
        },
        {
          stepKey: "fix_your_mother_cooks",
          category: "Grammar Fix",
          question_variants: [
            {
              question: "I said 'My mother cooks' but I want to know about YOUR mother! Fix!",
              hints: ["Your", "mother", "cooks"]
            },
            {
              question: "Error! 'My mother...' - but YOUR mother! What's right?",
              hints: ["Your", "mother", "cooks"]
            }
          ],
          target_keywords: ["your", "mother", "cooks"],
          ack_options: ["Perfect!", "Yes!", "Great!"],
          recast_templates: [
            "Perfect! YOUR mother cooks! ✅",
            "Fixed! YOUR mother cooks! ✅"
          ],
          success_criteria: "Student corrects possessive"
        },
        {
          stepKey: "fix_my_father_works",
          category: "Grammar Fix",
          question_variants: [
            {
              question: "Mistake! 'Your father works' but this is MY father! Fix it!",
              hints: ["My", "father", "works"]
            },
            {
              question: "Wrong! I said 'Your father...' - but MY father! Correct?",
              hints: ["My", "father", "works"]
            }
          ],
          target_keywords: ["my", "father", "works"],
          ack_options: ["Great!", "Yes!", "Perfect!"],
          recast_templates: [
            "Great! MY father works! ✅",
            "Fixed! MY father works! ✅"
          ],
          success_criteria: "Student fixes possessive"
        },
        {
          stepKey: "fix_your_family_loves_you",
          category: "Grammar Fix",
          question_variants: [
            {
              question: "I said 'My family loves me' but I mean YOUR family! Fix!",
              hints: ["Your", "family", "loves", "you"]
            },
            {
              question: "Error! 'My family loves me' - but YOUR family! What's correct?",
              hints: ["Your", "family", "loves", "you"]
            }
          ],
          target_keywords: ["your", "family", "loves", "you"],
          ack_options: ["Excellent!", "Perfect!", "Yes!"],
          recast_templates: [
            "Excellent! YOUR family loves you! ✅",
            "Fixed! YOUR family loves you! ✅"
          ],
          success_criteria: "Student corrects complex possessive"
        },
        {
          stepKey: "fix_my_brother_kind",
          category: "Grammar Fix",
          question_variants: [
            {
              question: "Wrong! 'Your brother is kind' but this is MY brother! Fix!",
              hints: ["My", "brother", "is", "kind"]
            },
            {
              question: "Mistake! I said 'Your brother...' - but MY brother! Correct it!",
              hints: ["My", "brother", "kind"]
            }
          ],
          target_keywords: ["my", "brother", "kind"],
          ack_options: ["Yes!", "Great!", "Perfect!"],
          recast_templates: [
            "Yes! MY brother is kind! ✅",
            "Fixed! MY brother is kind! ✅"
          ],
          success_criteria: "Student fixes possessive"
        },
        {
          stepKey: "fix_your_sister_beautiful",
          category: "Grammar Fix",
          question_variants: [
            {
              question: "I said 'My sister is beautiful' but I mean YOUR sister! Fix!",
              hints: ["Your", "sister", "is", "beautiful"]
            },
            {
              question: "Error! 'My sister...' - but YOUR sister! What should I say?",
              hints: ["Your", "sister", "beautiful"]
            }
          ],
          target_keywords: ["your", "sister", "beautiful"],
          ack_options: ["Perfect!", "Yes!", "Great!"],
          recast_templates: [
            "Perfect! YOUR sister is beautiful! ✅",
            "Fixed! YOUR sister is beautiful! ✅"
          ],
          success_criteria: "Student corrects possessive"
        },
        {
          stepKey: "fix_my_mother_nice",
          category: "Grammar Fix",
          question_variants: [
            {
              question: "Wrong sentence! 'Your mother is nice' but I mean MY mother! Fix!",
              hints: ["My", "mother", "is", "nice"]
            },
            {
              question: "Mistake! I said 'Your mother...' - but MY mother! What's right?",
              hints: ["My", "mother", "nice"]
            }
          ],
          target_keywords: ["my", "mother", "nice"],
          ack_options: ["Great!", "Yes!", "Perfect!"],
          recast_templates: [
            "Great! MY mother is nice! ✅",
            "Fixed! MY mother is nice! ✅"
          ],
          success_criteria: "Student fixes possessive"
        },
        {
          stepKey: "fix_your_father_hardworking",
          category: "Grammar Fix",
          question_variants: [
            {
              question: "I said 'My father is hardworking' but I'm asking about YOUR father! Fix!",
              hints: ["Your", "father", "is", "hardworking"]
            },
            {
              question: "Error! 'My father...' - but YOUR father! Correct sentence?",
              hints: ["Your", "father", "hardworking"]
            }
          ],
          target_keywords: ["your", "father", "hardworking"],
          ack_options: ["Excellent!", "Perfect!", "Yes!"],
          recast_templates: [
            "Excellent! YOUR father is hardworking! ✅",
            "Fixed! YOUR father is hardworking! ✅"
          ],
          success_criteria: "Student fixes possessive"
        },
        {
          stepKey: "fix_my_family_together",
          category: "Grammar Fix",
          question_variants: [
            {
              question: "Tricky one! 'Your family is together' but I mean MY family! Fix!",
              hints: ["My", "family", "is", "together"]
            },
            {
              question: "Wrong! I said 'Your family...' - but MY family! What's correct?",
              hints: ["My", "family", "together"]
            }
          ],
          target_keywords: ["my", "family", "together"],
          ack_options: ["Yes!", "Great!", "Perfect!"],
          recast_templates: [
            "Yes! MY family is together! ✅",
            "Fixed! MY family is together! ✅"
          ],
          success_criteria: "Student corrects possessive"
        },
        {
          stepKey: "fix_your_brother_helps_you",
          category: "Grammar Fix",
          question_variants: [
            {
              question: "I said 'My brother helps me' but I mean YOUR brother! Fix!",
              hints: ["Your", "brother", "helps", "you"]
            },
            {
              question: "Mistake! 'My brother helps me' - but YOUR brother! Correct?",
              hints: ["Your", "brother", "helps", "you"]
            }
          ],
          target_keywords: ["your", "brother", "helps", "you"],
          ack_options: ["Perfect!", "Yes!", "Excellent!"],
          recast_templates: [
            "Perfect! YOUR brother helps you! ✅",
            "Fixed! YOUR brother helps you! ✅"
          ],
          success_criteria: "Student fixes complex possessive"
        },
        {
          stepKey: "fix_my_sister_plays",
          category: "Grammar Fix",
          question_variants: [
            {
              question: "Error! 'Your sister plays' but this is MY sister! Fix it!",
              hints: ["My", "sister", "plays"]
            },
            {
              question: "Wrong! I said 'Your sister...' - but MY sister! What's right?",
              hints: ["My", "sister", "plays"]
            }
          ],
          target_keywords: ["my", "sister", "plays"],
          ack_options: ["Great!", "Yes!", "Perfect!"],
          recast_templates: [
            "Great! MY sister plays! ✅",
            "Fixed! MY sister plays! ✅"
          ],
          success_criteria: "Student fixes possessive"
        },
        {
          stepKey: "fix_your_family_at_home",
          category: "Grammar Fix",
          question_variants: [
            {
              question: "I said 'My family is at home' but I mean YOUR family! Fix!",
              hints: ["Your", "family", "is", "at", "home"]
            },
            {
              question: "Wrong! 'My family is at home' - but YOUR family! Correct?",
              hints: ["Your", "family", "at", "home"]
            }
          ],
          target_keywords: ["your", "family", "home"],
          ack_options: ["Excellent!", "Perfect!", "Yes!"],
          recast_templates: [
            "Excellent! YOUR family is at home! ✅",
            "Fixed! YOUR family is at home! ✅"
          ],
          success_criteria: "Student corrects possessive"
        },
        {
          stepKey: "fix_last_tricky_one",
          category: "Grammar Fix",
          question_variants: [
            {
              question: "Last one! 'Your mother and father love me' but they love YOU! Fix!",
              hints: ["Your", "mother", "and", "father", "love", "you"]
            },
            {
              question: "Tricky! 'Your parents love me' - but they love YOU! Correct?",
              hints: ["Your", "mother", "father", "love", "you"]
            }
          ],
          target_keywords: ["your", "love", "you"],
          ack_options: ["Excellent!", "Perfect!", "Amazing!"],
          recast_templates: [
            "Excellent! YOUR mother and father love you! ✅",
            "Perfect! They love YOU! ✅"
          ],
          success_criteria: "Student fixes final complex error"
        },
        {
          stepKey: "celebrate_all_fixed",
          category: "Victory",
          question_variants: [
            {
              question: "Amazing! You fixed all my mistakes! You're a grammar champion! Great job! Goodbye!",
              hints: []
            }
          ],
          target_keywords: ["goodbye", "bye", "thank", "you"],
          ack_options: ["Goodbye!", "Bye!", "See you!"],
          recast_templates: [
            "Goodbye! Great job!",
            "Thank you! Bye!"
          ],
          success_criteria: "Mission complete"
        }
      ],

      story_character: {
        name: "Ms. Nova",
        personality: "silly, makes mistakes, needs help fixing sentences",
        backstory: "Oh no! I keep mixing up MY and YOUR! Please help me fix my mistakes!",
        speaking_style: "makes deliberate errors with 'my' vs 'your', thanks student for corrections, immediately gives next error",
        facts: [
          "I keep saying the wrong words!",
          "I mix up MY and YOUR!",
          "You're so smart at fixing my mistakes!",
          "Let's fix all the sentences together!"
        ],
        role: "Grammar mistake maker who needs corrections"
      },

      opening_narrative: "🤔 Oh no! I keep making mistakes! Listen: 'Your mother is kind' - but I'm talking about MY mother! Can you fix this? Say: My mother is kind",

      story_arc: [
        {
          phase: "intro",
          turns: "1-5",
          phase_name: "First Mistakes",
          focus: "Learn to fix My vs Your",
          phase_questions: [
            "(After fix) Yes! Fixed! MY mother is kind! ✅ Next error: '🤔 My father is strong' but I want to ask about YOUR father! Fix it! Say: Your father is strong",
            "(After fix) Perfect! YOUR father is strong! ✅ Error: '🤔 Your brother is funny' but this is MY brother! What should I say? Say: My brother is funny",
            "(After fix) Great! MY brother is funny! ✅ Mistake: '🤔 My sister is smart' but I'm asking about YOUR sister! Fix this! Say: Your sister is smart",
            "(After fix) Excellent! YOUR sister is smart! ✅ Wrong sentence: '🤔 Your family is happy' but I'm talking about MY family! Correct it! Say: My family is happy",
            "(After fix) Yes! MY family is happy! ✅ Error: '🤔 My mother cooks' but I want to know about YOUR mother! Fix! Say: Your mother cooks"
          ]
        },
        {
          phase: "middle",
          turns: "6-11",
          phase_name: "More Mixed Up Sentences",
          focus: "Continue fixing grammar",
          phase_questions: [
            "(After fix) Perfect! YOUR mother cooks! ✅ Mistake: '🤔 Your father works' but this is about MY father! What's correct? Say: My father works",
            "(After fix) Great! MY father works! ✅ Error: '🤔 My family loves me' but I'm talking about YOUR family! Fix it! Say: Your family loves you",
            "(After fix) Excellent! YOUR family loves you! ✅ Wrong: '🤔 Your brother is kind' but this is MY brother! Correct sentence? Say: My brother is kind",
            "(After fix) Yes! MY brother is kind! ✅ Mistake: '🤔 My sister is beautiful' but I mean YOUR sister! Fix! Say: Your sister is beautiful",
            "(After fix) Perfect! YOUR sister is beautiful! ✅ Error: '🤔 Your mother is nice' but I'm describing MY mother! What should I say? Say: My mother is nice",
            "(After fix) Great! MY mother is nice! ✅ Wrong sentence: '🤔 My father is hardworking' but I'm asking about YOUR father! Fix this! Say: Your father is hardworking"
          ]
        },
        {
          phase: "tricky",
          turns: "12-16",
          phase_name: "Tricky Ones",
          focus: "Harder mixed-up sentences",
          phase_questions: [
            "(After fix) Excellent! YOUR father is hardworking! ✅ Tricky error: '🤔 Your family is together' but I mean MY family! Fix! Say: My family is together",
            "(After fix) Yes! MY family is together! ✅ Mistake: '🤔 My brother helps me' but I'm talking about YOUR brother! Correct? Say: Your brother helps you",
            "(After fix) Perfect! YOUR brother helps you! ✅ Error: '🤔 Your sister plays' but this is MY sister! Fix it! Say: My sister plays",
            "(After fix) Great! MY sister plays! ✅ Wrong: '🤔 My family is at home' but I mean YOUR family! What's right? Say: Your family is at home",
            "(After fix) Excellent! YOUR family is at home! ✅ Last tricky one: '🤔 Your mother and father love me' but they love YOU! Fix! Say: Your mother and father love you"
          ]
        },
        {
          phase: "victory",
          turns: "17-20",
          phase_name: "All Fixed!",
          focus: "Celebration and final check",
          phase_questions: [
            "(After fix) Perfect! YOUR mother and father love you! ✅ Amazing! You fixed all my mistakes! Now YOU make a sentence using MY! Say: My mother is... OR My father is...",
            "(After student sentence) Great sentence! {student_answer}! ✅ Now make a sentence using YOUR! Say: Your mother is... OR Your father is...",
            "(After your sentence) Perfect! {student_answer}! ✅ You're a grammar expert! You know MY vs YOUR perfectly! 🎉 Thank you for fixing all my mistakes! Great job! Goodbye!",
            "(Backup celebration) You're amazing! All mistakes fixed! Goodbye! 🌟"
          ]
        }
      ],
      
      minimum_turns: 12,
      maximum_turns: 18
    }
  ],
  
  // 🔥 ALIAS for compatibility with StoryMissionTab
  get story_missions() {
    return this.missions;
  },

  // === FREE TALK KNOWLEDGE BASE ===
  freetalk_knowledge: {
    week_title: "My Family Squad",
    week_number: 2,
    theme: "Family Members and Relationships",
    
    knowledge_base: [
      "Family members: mother, father, brother, sister, family",
      "Adjectives: kind, happy, strong, smart, funny, beautiful, nice",
      "Grammar: Possessive Adjectives (My mother is kind, Your father is strong)",
      "Mothers are kind and loving - they cook, clean, and help us",
      "Fathers are strong and hardworking - they work and protect us",
      "Brothers and sisters play with us - we are friends",
      "Family members live together at home",
      "We love our family - family is important",
      "We use 'My' to talk about our family (My mother, My father)",
      "We describe family using adjectives (kind, happy, beautiful)"
    ],
    
    example_opening_questions: [
      "Who do you live with?",
      "What is your mother like?",
      "What is your father like?",
      "Do you have a brother or sister?",
      "What does your mother do?",
      "Where does your father work?",
      "Do you love your family?"
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
      id: 'week2_family_intro',
      label_en: "Family Introduction 👨‍👩‍👧‍👦",
      label_vi: "Giới thiệu Gia đình 👨‍👩‍👧‍👦",
      icon: "👨‍👩‍👧‍👦",
      ai_role: "Friendly visitor asking about student's family",
      user_role: "Student introducing their family",
      intro: "Hello! I want to learn about your family! Tell me - who do you live with?",
      context: "Week 2 theme - Family Members. AI acts as curious visitor asking about family members (mother, father, brother, sister). AI asks what they look like, what they do, and how student feels about them. Uses 'My...' patterns and adjectives (kind, happy, beautiful). Should be warm, encouraging, and use simple words suitable for A0+ level."
    }
  },

  // ✨ DYNAMIC ROLEPLAY SCENARIOS (Data-Driven Architecture) - TOP LEVEL!
  roleplay_scenarios: [
      {
        id: "rp_family_photo",
        title: "Family Photo Album 📷",
        title_en: "Family Photo Album",
        title_vi: "Album ảnh gia đình",
        emoji: "📷",
        description: "Show Ms. Nova your family photos!",
        
        // AI Persona
        ai_role: "Curious friend (Ms. Nova)",
        user_role: "Family photo presenter",
        context: "Ms. Nova is looking at the student's family photo album. She wants to know about each family member.",
        
        // Pedagogical Focus
        vocab_focus: ["mother", "father", "brother", "sister", "family", "kind", "happy", "beautiful", "strong", "smart", "funny"],
        
        // Opening (MUST be a question)
        opening_line: "Wow! Your family photo! I see someone kind in this photo. Who is kind? Your mother or your father?",
        
        // Guide rules for AI behavior
        guide_rules: "Accept any family member answer. React warmly ('Beautiful!', 'Wonderful!'). Ask follow-up questions about PERSONALITY using 'What is [person] like?' or 'Is [person] [adjective]?'. Focus on adjectives: kind, happy, strong, smart, funny. Use 'My mother is...' and 'My father is...' patterns. Always end with a question.",
        
        // CRITICAL: Backup questions for code enforcement
        backup_questions: [
          "What is your mother like? Is your mother kind?",
          "What is your father like? Is your father strong?",
          "Do you have a brother? What is your brother like?",
          "Do you have a sister? What is your sister like?",
          "Is your family happy? Do you love your family?"
        ]
      },
      {
        id: "rp_family_dinner",
        title: "Family Dinner Time 🍽️",
        title_en: "Family Dinner Time",
        title_vi: "Bữa tối gia đình",
        emoji: "🍽️",
        description: "Have dinner with your family!",
        
        ai_role: "Dinner guest (Ms. Nova)",
        user_role: "Family member",
        context: "Ms. Nova is having dinner with the student's family. She wants to know what everyone does and how they help.",
        
        vocab_focus: ["mother", "father", "cook", "help", "eat", "together", "happy", "kind", "love"],
        
        opening_line: "Dinner smells good! Who cooked this food? Your mother, your father, or you?",
        
        guide_rules: "Be polite and curious. Ask about family routines ('Who helps clean?', 'What does father do?'). React positively ('Delicious!', 'Your family is so kind!'). Always end with a question.",
        
        backup_questions: [
          "What does your mother cook? Is it good?",
          "Does your father help in the kitchen?",
          "Who cleans the table? You or your brother?",
          "Do you eat together every day?",
          "What do you like most about your family?"
        ]
      },
      {
        id: "rp_weekend_family",
        title: "Weekend with Family 🎉",
        title_en: "Weekend with Family",
        title_vi: "Cuối tuần cùng gia đình",
        emoji: "🎉",
        description: "Tell Ms. Nova about your weekend with family!",
        
        ai_role: "Curious friend",
        user_role: "Family storyteller",
        context: "The student shares weekend activities with family. Ms. Nova asks about what they do together and how they feel.",
        
        vocab_focus: ["family", "together", "play", "happy", "love", "mother", "father", "brother", "sister", "home"],
        
        opening_line: "It's the weekend! What do you do with your family? Play together, eat together, or watch TV together?",
        
        guide_rules: "Be enthusiastic and supportive. Ask about activities ('What do you play?', 'Where do you go?'). Ask about feelings ('Are you happy?', 'Do you love your family?'). Always end with a question.",
        
        backup_questions: [
          "What do you play with your brother or sister?",
          "Does your mother play with you?",
          "Where does your father take you on weekends?",
          "Are you happy when your family is together?",
          "What do you love most about your family?"
        ]
      }
    ]
};

export { week2RealData };
export default week2RealData;
