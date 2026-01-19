const week4RealData = {
  // === METADATA ===
  week_id: 4,
  phase: 1,
  block: "A",
  unit: 4,
  week_number: 4,
  
  // === OFFICIAL SYLLABUS DATA ===
  title: "Week 4: My Happy Jar",
  week_title_en: "My Happy Jar (Emotions & Likes)",
  week_title_vi: "Lọ Hạnh Phúc của Tôi (Cảm xúc & Sở thích)",
  
  topic: "Personality - Emotions and Likes",
  topic_vi: "Tính cách - Cảm xúc và Sở thích",
  
  // === KEY LEARNING OUTCOME ===
  learning_outcome: "Express emotions and preferences using 'I like + V-ing' naturally.",
  learning_outcome_vi: "Diễn đạt cảm xúc và sở thích bằng 'I like + V-ing' một cách tự nhiên.",
  
  // === GRAMMAR FOCUS (IMPLICIT) ===
  grammar_focus: "Pattern 'I like + V-ing'",
  grammar_pattern: "I like [verb]-ing",
  grammar_examples: [
    "I like playing.",
    "I like reading books.",
    "I like drawing pictures.",
    "I like singing songs."
  ],
  
  // === TARGET VOCABULARY (TIER 1 - A0++) ===
  target_vocab: [
    {
      word: "happy",
      pronunciation: "/ˈhæpi/",
      definition_vi: "vui vẻ",
      definition_en: "feeling very good and joyful",
      example: "I am happy today.",
      syllabus_context: "Emotions"
    },
    {
      word: "sad",
      pronunciation: "/sæd/",
      definition_vi: "buồn",
      definition_en: "feeling unhappy or not good",
      example: "She feels sad today.",
      syllabus_context: "Emotions"
    },
    {
      word: "funny",
      pronunciation: "/ˈfʌni/",
      definition_vi: "hài hước, vui nhộn",
      definition_en: "making people laugh and smile",
      example: "He is very funny.",
      syllabus_context: "Personality traits"
    },
    {
      word: "friendly",
      pronunciation: "/ˈfrendli/",
      definition_vi: "thân thiện",
      definition_en: "kind and nice to others",
      example: "My teacher is friendly.",
      syllabus_context: "Personality traits"
    },
    {
      word: "excited",
      pronunciation: "/ɪkˈsaɪtɪd/",
      definition_vi: "phấn khích",
      definition_en: "very happy about something coming",
      example: "I am excited about my birthday.",
      syllabus_context: "Emotions"
    },
    {
      word: "playing",
      pronunciation: "/ˈpleɪɪŋ/",
      definition_vi: "chơi",
      definition_en: "doing fun games or sports",
      example: "I like playing games.",
      syllabus_context: "Activities"
    },
    {
      word: "reading",
      pronunciation: "/ˈriːdɪŋ/",
      definition_vi: "đọc",
      definition_en: "looking at words in books",
      example: "I like reading books.",
      syllabus_context: "Activities"
    },
    {
      word: "drawing",
      pronunciation: "/ˈdrɔːɪŋ/",
      definition_vi: "vẽ",
      definition_en: "making pictures with pencils or crayons",
      example: "I like drawing pictures.",
      syllabus_context: "Activities"
    },
    {
      word: "singing",
      pronunciation: "/ˈsɪŋɪŋ/",
      definition_vi: "hát",
      definition_en: "making music with your voice",
      example: "She likes singing songs.",
      syllabus_context: "Activities"
    },
    {
      word: "dancing",
      pronunciation: "/ˈdænsɪŋ/",
      definition_vi: "nhảy",
      definition_en: "moving your body to music",
      example: "He likes dancing.",
      syllabus_context: "Activities"
    }
  ],
  
  global_vocab: ["happy", "sad", "funny", "friendly", "excited", "playing", "reading", "drawing", "singing", "dancing"],
  
  // === 3 STORY MISSIONS ===
  story_missions: [
    {
      mission_id: 1,
      title: "My Happy Feelings",
      title_vi: "Cảm xúc Hạnh phúc của tôi",
      theme: "Emotions",
      
      nova_greeting: "Hi! I'm Ms. Nova! Let's talk about feelings today!",
      
      mission_context: `This is Week 4 Mission 1 - My Happy Feelings. STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level (just starting English). LANGUAGE RULES: Use VERY SIMPLE words. Max 8 words per sentence. Ask OPEN-ENDED questions (What...? Tell me about...?) NOT Yes/No. GRAMMAR: "I like + V-ing" pattern. VOCABULARY: happy, sad, excited, funny, friendly, playing, reading, drawing. ENCOURAGE: Invite student to ask YOU questions every 3-4 turns. AVOID: Do NOT ask about teacher, backpack, school, or complex emotions. FOCUS: Feelings and simple activities only.`,
      
      target_vocab: ["happy", "sad", "excited", "playing", "reading", "drawing"],
      
      grammar_pattern: "I like + V-ing",
      
      objectives: [
        {
          stepKey: "student_name",
          category: "Identity",
          canonical_question: "What is your name?",
          target_keywords: ["my", "name", "is", "I", "am"],
          ack_options: ["Nice!", "Great!", "Wonderful!"],
          hints: ["My", "name", "is", "I", "am"],
          recast_templates: [
            "Your name is {name}!",
            "You are {name}!"
          ],
          success_criteria: "Student says their name"
        },
        {
          stepKey: "feeling_today",
          category: "Emotion Expression",
          canonical_question: "How are you feeling today?",
          target_keywords: ["happy", "sad", "good", "fine", "okay", "excited"],
          ack_options: ["Nice!", "Great!", "Wonderful!"],
          hints: ["I", "am", "happy", "sad", "good", "fine"],
          recast_templates: [
            "You are feeling {emotion}!",
            "You feel {emotion} today!"
          ],
          success_criteria: "Student expresses an emotion"
        },
        {
          stepKey: "personality_trait",
          category: "Personality",
          canonical_question: "Are you funny or friendly?",
          target_keywords: ["funny", "friendly", "kind", "nice", "happy"],
          ack_options: ["Nice!", "Great!", "Wonderful!"],
          hints: ["I", "am", "funny", "friendly", "kind"],
          recast_templates: [
            "You are {trait}!",
            "So you are a {trait} person!"
          ],
          success_criteria: "Student describes their personality"
        },
        {
          stepKey: "what_like_doing",
          category: "Likes - Activities",
          canonical_question: "What do you like doing?",
          target_keywords: ["like", "love", "playing", "reading", "drawing", "singing", "dancing"],
          ack_options: ["Nice!", "Great!", "Wonderful!"],
          hints: ["I", "like", "playing", "reading", "drawing"],
          recast_templates: [
            "You like {activity}!",
            "{activity} is fun for you!"
          ],
          success_criteria: "Student names an activity they like"
        },
        {
          stepKey: "what_else_like",
          category: "Likes - More Activities",
          canonical_question: "What else do you like?",
          target_keywords: ["also", "too", "like", "love", "playing", "reading", "drawing", "singing"],
          ack_options: ["Nice!", "Great!", "Wonderful!"],
          hints: ["I", "also", "like", "too", "love"],
          recast_templates: [
            "You also like {activity}!",
            "{activity} is fun too!"
          ],
          success_criteria: "Student names another activity"
        },
        {
          stepKey: "when_do_activity",
          category: "Timing",
          canonical_question: "When do you do that?",
          target_keywords: ["when", "after", "school", "morning", "afternoon", "weekend", "everyday"],
          ack_options: ["Nice!", "Great!", "Wonderful!"],
          hints: ["After", "school", "Weekend", "Everyday", "Morning"],
          recast_templates: [
            "You do it {time}!",
            "{time} is a good time!"
          ],
          success_criteria: "Student says when they do activity"
        },
        {
          stepKey: "with_whom",
          category: "Social Context",
          canonical_question: "Who do you do that with?",
          target_keywords: ["with", "my", "friends", "mother", "father", "brother", "sister", "alone"],
          ack_options: ["Nice!", "Great!", "Wonderful!"],
          hints: ["With", "my", "friends", "mother", "father", "alone"],
          recast_templates: [
            "You do it with {person}!",
            "{person} joins you!"
          ],
          success_criteria: "Student says who they do activity with"
        },
        {
          stepKey: "favorite_activity",
          category: "Favorite",
          canonical_question: "What is your favorite thing to do?",
          target_keywords: ["favorite", "like", "love", "playing", "reading", "drawing", "singing"],
          ack_options: ["Nice!", "Great!", "Wonderful!"],
          hints: ["My", "favorite", "is", "playing", "reading", "drawing"],
          recast_templates: [
            "Your favorite is {activity}!",
            "You love {activity} the most!"
          ],
          success_criteria: "Student states their favorite activity"
        },
        {
          stepKey: "why_favorite",
          category: "Reasoning",
          canonical_question: "Why is that your favorite?",
          target_keywords: ["because", "fun", "exciting", "happy", "like", "love"],
          ack_options: ["Nice!", "Great!", "Wonderful!"],
          hints: ["Because", "it", "is", "fun", "I", "like"],
          recast_templates: [
            "It's your favorite because {reason}!",
            "{reason} makes it special!"
          ],
          success_criteria: "Student explains why it's favorite"
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
          goodbye_en: "Great job! You told me about your feelings and things you like! Keep being happy! Bye!",
          goodbye_vi: "Tuyệt lắm! Bạn đã nói về cảm xúc và điều bạn thích! Hãy luôn vui vẻ nhé! Tạm biệt!",
          success_criteria: "Mission complete"
        }
      ],
      
      minimum_turns: 10,
      maximum_turns: 15,
      expected_duration: "10+ minutes"
    },
    {
      mission_id: 2,
      title: "My Favorite Activities",
      title_vi: "Hoạt động Yêu thích của tôi",
      theme: "Preferences",
      
      nova_greeting: "Hello! Let's talk about what you like to do!",
      
      mission_context: `This is Week 4 Mission 2 - Activity Details. STUDENT PROFILE: 6-12 years old Vietnamese, A0+ level. LANGUAGE: SIMPLE words, max 8 words/sentence. Ask OPEN-ENDED: "What do you play?" "Where do you play?" NOT "Do you play?". GRAMMAR: "I like + V-ing", prepositions "at/in/with". ENCOURAGE: Invite student questions every 3-4 turns. AVOID: Teacher, backpack, school items. FOCUS: Playing/reading details (what, where, when, with whom).`,
      
      target_vocab: ["playing", "reading", "drawing", "singing", "dancing", "like", "love"],
      
      grammar_pattern: "I like + V-ing",
      
      objectives: [
        {
          stepKey: "what_like_doing",
          category: "Activity Selection",
          canonical_question: "What do you like doing?",
          target_keywords: ["like", "love", "playing", "reading", "drawing", "singing", "both"],
          ack_options: ["Nice!", "Great!", "Wonderful!"],
          hints: ["I", "like", "playing", "reading", "drawing"],
          recast_templates: [
            "You like {activity}!",
            "{activity} is fun for you!"
          ],
          success_criteria: "Student says what they like doing"
        },
        {
          stepKey: "playing_details",
          category: "Activity Details",
          canonical_question: "What do you play?",
          target_keywords: ["games", "ball", "toys", "hide", "seek", "tag", "puzzles"],
          ack_options: ["Nice!", "Great!", "Wonderful!"],
          hints: ["I", "play", "games", "ball", "toys"],
          recast_templates: [
            "You play {thing}!",
            "{thing} sounds fun!"
          ],
          success_criteria: "Student says what they play"
        },
        {
          stepKey: "favorite_game",
          category: "Specific Game",
          canonical_question: "What is your favorite game?",
          target_keywords: ["favorite", "ball", "tag", "hide", "seek", "puzzles", "blocks", "toys"],
          ack_options: ["Nice!", "Great!", "Wonderful!"],
          hints: ["My", "favorite", "game", "is", "I", "love"],
          recast_templates: [
            "Your favorite game is {game}!",
            "{game} is your favorite!"
          ],
          success_criteria: "Student names favorite game"
        },
        {
          stepKey: "how_play_game",
          category: "Gameplay Details",
          canonical_question: "How do you play that game?",
          target_keywords: ["run", "jump", "throw", "catch", "hide", "find", "build"],
          ack_options: ["Nice!", "Great!", "Wonderful!"],
          hints: ["I", "run", "jump", "throw", "catch"],
          recast_templates: [
            "You {action} when playing!",
            "{action} is part of the game!"
          ],
          success_criteria: "Student describes how to play"
        },
        {
          stepKey: "reading_books",
          category: "Reading Details",
          canonical_question: "What books do you like reading?",
          target_keywords: ["story", "books", "animals", "adventure", "fairy", "tales", "comics"],
          ack_options: ["Nice!", "Great!", "Wonderful!"],
          hints: ["I", "like", "story", "books", "animal", "books"],
          recast_templates: [
            "You like reading {type} books!",
            "{type} books are interesting!"
          ],
          success_criteria: "Student says what books they read"
        },
        {
          stepKey: "favorite_book",
          category: "Specific Book",
          canonical_question: "What is your favorite book?",
          target_keywords: ["favorite", "story", "animal", "fairy", "tale", "comic", "book"],
          ack_options: ["Nice!", "Great!", "Wonderful!"],
          hints: ["My", "favorite", "book", "is", "I", "love"],
          recast_templates: [
            "Your favorite book is {book}!",
            "{book} is your favorite!"
          ],
          success_criteria: "Student names favorite book"
        },
        {
          stepKey: "drawing_what",
          category: "Drawing Details",
          canonical_question: "What do you like drawing?",
          target_keywords: ["animals", "flowers", "family", "friends", "houses", "pictures"],
          ack_options: ["Nice!", "Great!", "Wonderful!"],
          hints: ["I", "draw", "animals", "flowers", "family"],
          recast_templates: [
            "You like drawing {thing}!",
            "{thing} is fun to draw!"
          ],
          success_criteria: "Student says what they draw"
        },
        {
          stepKey: "drawing_colors",
          category: "Art Details",
          canonical_question: "What colors do you use?",
          target_keywords: ["red", "blue", "green", "yellow", "pink", "purple", "colors"],
          ack_options: ["Nice!", "Great!", "Wonderful!"],
          hints: ["I", "use", "red", "blue", "green", "yellow"],
          recast_templates: [
            "You use {color} colors!",
            "{color} is a nice color!"
          ],
          success_criteria: "Student names colors they use"
        },
        {
          stepKey: "singing_dancing",
          category: "Music Details",
          canonical_question: "Do you like singing or dancing?",
          target_keywords: ["singing", "dancing", "music", "songs", "both", "like"],
          ack_options: ["Nice!", "Great!", "Wonderful!"],
          hints: ["I", "like", "singing", "dancing", "both"],
          recast_templates: [
            "You like {activity}!",
            "{activity} is fun for you!"
          ],
          success_criteria: "Student says if they like singing or dancing"
        },
        {
          stepKey: "most_fun_activity",
          category: "Favorite",
          canonical_question: "Which activity is the most fun for you?",
          target_keywords: ["most", "fun", "favorite", "playing", "reading", "drawing", "singing"],
          ack_options: ["Nice!", "Great!", "Wonderful!"],
          hints: ["The", "most", "fun", "is", "I", "like"],
          recast_templates: [
            "{activity} is the most fun for you!",
            "You love {activity} the most!"
          ],
          success_criteria: "Student picks most fun activity"
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
          goodbye_en: "Great job! You told me all about your favorite activities! Keep having fun! Bye!",
          goodbye_vi: "Tuyệt lắm! Bạn đã kể hết về hoạt động yêu thích! Hãy tiếp tục vui chơi nhé! Tạm biệt!",
          success_criteria: "Mission complete"
        }
      ],
      
      minimum_turns: 10,
      maximum_turns: 15,
      expected_duration: "10+ minutes"
    },
    {
      mission_id: 3,
      title: "My Happy Jar",
      title_vi: "Lọ Hạnh phúc của tôi",
      theme: "Collecting Happy Moments",
      
      nova_greeting: "Hi! Let's make a Happy Jar together!",
      
      mission_context: `This is Week 4 Mission 3 - My Happy Jar Collection. STUDENT PROFILE: 6-12 years old Vietnamese, A0+ level. LANGUAGE: SIMPLE, WARM words, max 8 words/sentence. Ask OPEN-ENDED: "What makes you happy?" "Who makes you happy?" NOT Yes/No questions. THEME: Collecting happy moments in a jar (visual metaphor). ENCOURAGE: Invite student questions every 3-4 turns. AVOID: Teacher, school, complex abstract concepts. FOCUS: Concrete happy things (people, activities, moments).`,
      
      target_vocab: ["happy", "excited", "playing", "reading", "drawing", "singing", "dancing", "friendly"],
      
      grammar_pattern: "I like + V-ing",
      
      objectives: [
        {
          stepKey: "first_happy_thing",
          category: "Happy Collection",
          canonical_question: "What is one thing that makes you happy?",
          target_keywords: ["happy", "playing", "reading", "friends", "family", "games", "drawing"],
          ack_options: ["Nice!", "Great!", "Wonderful!"],
          hints: ["Playing", "Friends", "Family", "makes", "me", "happy"],
          recast_templates: [
            "{thing} makes you happy!",
            "Let's put {thing} in your jar!"
          ],
          success_criteria: "Student names one happy thing"
        },
        {
          stepKey: "second_happy_thing",
          category: "Happy Collection",
          canonical_question: "What else makes you happy?",
          target_keywords: ["also", "too", "and", "playing", "reading", "singing", "drawing", "dancing"],
          ack_options: ["Nice!", "Great!", "Wonderful!"],
          hints: ["I", "also", "like", "too", "and"],
          recast_templates: [
            "{thing} also makes you happy!",
            "Now your jar has {thing} too!"
          ],
          success_criteria: "Student names second happy thing"
        },
        {
          stepKey: "happy_with_people",
          category: "Social Happiness",
          canonical_question: "Who makes you happy?",
          target_keywords: ["mother", "father", "friends", "brother", "sister", "family", "teacher"],
          ack_options: ["Nice!", "Great!", "Wonderful!"],
          hints: ["My", "mother", "father", "friends", "family"],
          recast_templates: [
            "{person} makes you happy!",
            "{person} goes in your Happy Jar!"
          ],
          success_criteria: "Student says who makes them happy"
        },
        {
          stepKey: "happiest_moment",
          category: "Peak Happiness",
          canonical_question: "What is your happiest moment?",
          target_keywords: ["happiest", "birthday", "playing", "winning", "party", "gift", "fun"],
          ack_options: ["Nice!", "Great!", "Wonderful!"],
          hints: ["My", "birthday", "playing", "winning", "is"],
          recast_templates: [
            "{moment} is your happiest moment!",
            "That sounds so happy!"
          ],
          success_criteria: "Student describes happiest moment"
        },
        {
          stepKey: "jar_full",
          category: "Reflection",
          canonical_question: "Look! Your Happy Jar is full! How do you feel?",
          target_keywords: ["happy", "excited", "good", "great", "wonderful", "proud"],
          ack_options: ["Nice!", "Great!", "Wonderful!"],
          hints: ["I", "feel", "happy", "excited", "good"],
          recast_templates: [
            "You feel {emotion} about your jar!",
            "Your jar makes you {emotion}!"
          ],
          success_criteria: "Student expresses feeling about full jar"
        },
        {
          stepKey: "favorite_in_jar",
          category: "Favorite Selection",
          canonical_question: "What is your favorite thing in your jar?",
          target_keywords: ["favorite", "like", "best", "most", "playing", "friends", "family"],
          ack_options: ["Nice!", "Great!", "Wonderful!"],
          hints: ["My", "favorite", "is", "I", "like", "best"],
          recast_templates: [
            "Your favorite in the jar is {thing}!",
            "{thing} is special for you!"
          ],
          success_criteria: "Student picks favorite from jar"
        },
        {
          stepKey: "why_favorite_happy",
          category: "Reasoning",
          canonical_question: "Why does that make you happy?",
          target_keywords: ["because", "fun", "love", "like", "exciting", "happy"],
          ack_options: ["Nice!", "Great!", "Wonderful!"],
          hints: ["Because", "it", "is", "fun", "I", "love"],
          recast_templates: [
            "It makes you happy because {reason}!",
            "{reason} is why you love it!"
          ],
          success_criteria: "Student explains why it makes them happy"
        },
        {
          stepKey: "share_happiness",
          category: "Sharing",
          canonical_question: "Will you share your Happy Jar with your family?",
          target_keywords: ["yes", "share", "show", "family", "friends", "mother", "father"],
          ack_options: ["Nice!", "Great!", "Wonderful!"],
          hints: ["Yes", "I", "will", "share", "show", "family"],
          recast_templates: [
            "You will share your jar with {person}!",
            "Sharing happiness is beautiful!"
          ],
          success_criteria: "Student says they will share jar"
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
          goodbye_en: "Great job! Your Happy Jar is full! Keep collecting happy moments every day! Bye!",
          goodbye_vi: "Tuyệt lắm! Lọ Hạnh phúc của bạn đầy rồi! Hãy sưu tầm khoảnh khắc vui mỗi ngày nhé! Tạm biệt!",
          success_criteria: "Mission complete"
        }
      ],
      
      minimum_turns: 10,
      maximum_turns: 15,
      expected_duration: "10+ minutes"
    }
  ],

  // === FREE TALK KNOWLEDGE BASE ===
  freetalk_knowledge: {
    week_title: "My Happy Jar",
    week_number: 4,
    theme: "Emotions and Likes",
    
    knowledge_base: [
      "Emotions: happy, sad, excited, friendly, funny",
      "Activities: playing, reading, drawing, singing, dancing",
      "Grammar: I like + V-ing (I like playing, I like reading)",
      "Smiling makes you feel happy",
      "People have different hobbies and favorite activities",
      "Doing things you love makes you feel good",
      "You can express your feelings with words",
      "Happy things can be collected in a jar or notebook",
      "Being friendly and funny helps make friends",
      "Sharing hobbies with others is fun"
    ],
    
    example_opening_questions: [
      "How are you feeling today?",
      "What do you like to do?",
      "Do you like playing games?",
      "Do you like reading books?",
      "What makes you happy?",
      "Do you have a favorite hobby?",
      "What do you do for fun?"
    ]
  }
};

export default week4RealData;
