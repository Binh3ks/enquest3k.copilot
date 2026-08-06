/**
 * ✅ WEEK 1 REAL SYLLABUS DATA (Rule 11 Golden Standard)
 * Topic: Introduction & Superheroes (Creating a 'Hero Identity')
 * Theme: Hello, World! (Identity)
 */

export const week1RealData = {
  week_id: 1,
  phase: 1,
  block: "A",
  unit: 1,
  
  week_title_en: "Hello, World! (Identity)",
  week_title_vi: "Chào Thế giới! (Danh tính)",
  
  topic: "Introduction & Superheroes (Creating a 'Hero Identity')",
  topic_vi: "Giới thiệu & Siêu anh hùng (Tạo 'Danh tính Anh hùng')",

  chunk_focus: [
    "My name",
    "new student",
    "elementary school",
    "Every morning",
    "wake up early",
    "get ready for school",
    "story book",
    "small notebook",
    "every day",
    "my classroom",
    "there are",
    "My teacher",
    "very kind and patient",
    "learning new things",
    "studying every day",
    "learn about",
    "look at",
    "tiny insects",
    "observe very small things",
    "write down"
  ],
  
  learning_outcome: "Say and write sentences introducing name/age naturally.",
  learning_outcome_vi: "Nói và viết câu giới thiệu tên/tuổi một cách tự nhiên.",
  
  grammar_focus: "Pattern 'I am...' (Identity)",
  grammar_pattern: "I am [name/adjective]",
  grammar_examples: [
    "I am Alex.",
    "I am a student.",
    "I am 7 years old.",
    "I am a hero!"
  ],
  
  target_vocab: [
    { word: "name", pronunciation: "/neɪm/", definition_vi: "Tên", definition_en: "What someone is called." },
    { word: "age", pronunciation: "/eɪdʒ/", definition_vi: "Tuổi", definition_en: "How old someone is." },
    { word: "student", pronunciation: "/ˈstuːdənt/", definition_vi: "Học sinh", definition_en: "A person who is learning at a school." },
    { word: "hero", pronunciation: "/ˈhɪroʊ/", definition_vi: "Anh hùng", definition_en: "A brave person who helps others." },
    { word: "power", pronunciation: "/ˈpaʊər/", definition_vi: "Sức mạnh", definition_en: "Special strength or ability." }
  ],
  
  story_missions: [
    {
      mission_id: 1,
      title: "Alex's School Day",
      title_vi: "Ngày Đi Học Của Alex",
      theme: "Reading Passage 1 Retell - Alex's School Day",
      type: "retell",
      turns: 8,
      story_character: {
        name: "Nova - Teacher",
        role: "English Teacher guiding reading retell"
      },
      opening_narrative: "Hello! I am Nova. Today let's talk about Alex's School Day! Alex is a new student at Greenwood Elementary School. Want to retell Alex's story with me?",
      story_arc: [
        {
          phase: "school_intro",
          turns: "1-4",
          phase_name: "Alex at School",
          focus: "Retelling Alex's name, school, teacher, and classroom",
          phase_questions: [
            {
              template: "Awesome! What is the new student's name in our story? Say: His name is Alex, or The student is Alex",
              hints: ["name", "Alex", "student"]
            },
            {
              template: "Great! Which school does Alex go to? Say: He goes to Greenwood School, or He goes to Elementary School",
              hints: ["goes to", "Greenwood", "School"]
            },
            {
              template: "Nice! What does Alex carry in his heavy backpack every day? Say: He carries his story book, or He carries a small notebook",
              hints: ["carries", "story book", "notebook"]
            },
            {
              template: "Indeed! How many desks are there in Alex's classroom? Say: There are twenty desks, or There is a big whiteboard",
              hints: ["twenty desks", "whiteboard"]
            }
          ]
        },
        {
          phase: "teacher_and_future",
          turns: "5-8",
          phase_name: "Teacher & Future Goals",
          focus: "Retelling Ms. Johnson and Alex's future dream",
          phase_questions: [
            {
              template: "Super! Who is Alex's kind and patient teacher? Say: His teacher is Ms. Johnson, or Ms. Johnson is very kind",
              hints: ["teacher", "Ms. Johnson", "kind"]
            },
            {
              template: "Wonderful! What subjects does Ms. Johnson teach Alex? Say: She teaches English and Math, or She teaches Science",
              hints: ["teaches", "English", "Math", "Science"]
            },
            {
              template: "Awesome! Where does Alex go after school to read books? Say: He goes to the library, or He reads at the library",
              hints: ["goes to", "library", "read"]
            },
            {
              template: "What a great story! What does Alex want to become when he grows up? Say: He wants to become a scientist, or He wants to be a young scientist",
              hints: ["wants to be", "scientist", "grows up"]
            }
          ]
        }
      ]
    },
    {
      mission_id: 2,
      title: "Alex's Hero Identity",
      title_vi: "Danh Tính Anh Hùng Của Alex",
      theme: "Reading Passage 2 Retell - Alex's Hero Identity",
      type: "retell",
      turns: 8,
      story_character: {
        name: "Nova - Hero Guide",
        role: "Guide exploring Alex's hero story"
      },
      opening_narrative: "Welcome back! In our story, Alex dreams of having a superhero identity to help others. Let me ask you about Alex's hero story!",
      story_arc: [
        {
          phase: "hero_beginning",
          turns: "1-4",
          phase_name: "Hero Dreams",
          focus: "Retelling Alex's hero identity, powers, suit, and mission",
          phase_questions: [
            {
              template: "Super! What does Alex want to be in his imagination? Say: He wants to be a hero, or He wants to be a brave hero",
              hints: ["wants to be", "hero", "brave"]
            },
            {
              template: "Awesome! What is Alex's superhero power? Say: His power is being smart, or His power is running fast",
              hints: ["power", "smart", "running fast"]
            },
            {
              template: "Cool! What color is Alex's superhero suit? Say: His suit is red and blue, or His suit is bright red",
              hints: ["suit", "red and blue", "bright red"]
            },
            {
              template: "Great! Who does Alex want to save as a hero? Say: He wants to save people, or He wants to save animals",
              hints: ["save", "people", "animals"]
            }
          ]
        },
        {
          phase: "hero_values",
          turns: "5-8",
          phase_name: "Hero Values",
          focus: "Retelling tools, feelings, real-life heroes, and motto",
          phase_questions: [
            {
              template: "Wonderful! What special tool does Alex carry? Say: He carries a magic compass, or He carries a hero badge",
              hints: ["carries", "magic compass", "badge"]
            },
            {
              template: "Nice! How does Alex feel when he helps others? Say: He feels happy and strong, or He feels brave",
              hints: ["feels", "happy", "strong", "brave"]
            },
            {
              template: "Super! Who is Alex's favorite real-life hero? Say: His hero is his teacher, or His hero is his mum",
              hints: ["hero", "teacher", "mum"]
            },
            {
              template: "Incredible! What motto does Alex say when he finishes his hero mission? Say: I am a hero, or We can help everyone",
              hints: ["motto", "hero", "help everyone"]
            }
          ]
        }
      ]
    },
    {
      mission_id: 3,
      title: "Your Hero Identity",
      title_vi: "Danh Tính Anh Hùng Của Bạn",
      theme: "Student Personal Application - Self & Hero Intro",
      type: "personal",
      turns: 4,
      story_character: {
        name: "Nova - Teacher",
        role: "Teacher learning about the student"
      },
      opening_narrative: "Now it is YOUR turn! Let me get to know YOU! What is your name and how old are you? Say: My name is Alex and I am 8 years old, or I am Ben and I am 7 years old",
      story_arc: [
        {
          phase: "personal_intro",
          turns: "1-4",
          phase_name: "Getting to Know You",
          focus: "Student introducing name, age, qualities, and hero power",
          phase_questions: [
            {
              template: "Nice to meet you! Are you a student at school? Say: I am a student, or I am a great student",
              hints: ["student", "great student"]
            },
            {
              template: "Awesome! What are you like? Are you brave or smart? Say: I am brave and smart, or I am kind and happy",
              hints: ["brave", "smart", "kind", "happy"]
            },
            {
              template: "Cool! If you were a superhero, what would your power be? Say: I can run fast, or I can fly high",
              hints: ["power", "run fast", "fly high"]
            },
            {
              template: "Super hero! What is your favorite thing to do at school? Say: I like learning English, or I like playing with my friends",
              hints: ["learning English", "playing", "friends"]
            }
          ]
        }
      ]
    }
  ],

  spark_talk: [
    {
      id: 1,
      title: "Hello, Nova!",
      emoji: "👋",
      seed_question: "Hi! I am Nova! What is your name and how old are you?",
      text_en: "Introduce yourself to Nova!",
      text_vi: "Giới thiệu bản thân với Nova!",
      hint_en: "My name is Alex and I am 8 years old... I am Ben and I am 7 years old...",
      hint_vi: "Tên tôi là Alex và tôi 8 tuổi... Tôi là Ben và tôi 7 tuổi...",
      turns: 4,
      frames: [
        {
          frame: 1,
          prompt_en: "Hi! I am Nova! What is your name and how old are you? Say: My name is Alex and I am 8 years old, or I am Ben and I am 7 years old",
          hint_en: "My name is Alex and I am 8 years old... I am Ben and I am 7 years old...",
          target_vocab: ["name", "age", "years old"]
        },
        {
          frame: 2,
          prompt_en: "Nice to meet you! How are you feeling today? Say: I am happy today, or I am excited today",
          hint_en: "I am happy today... I am excited today...",
          target_vocab: ["happy", "excited", "today"]
        },
        {
          frame: 3,
          prompt_en: "Awesome! What grade are you in at school? Say: I am in grade 1, or I am in grade 2",
          hint_en: "I am in grade 1... I am in grade 2...",
          target_vocab: ["grade 1", "grade 2", "school"]
        },
        {
          frame: 4,
          prompt_en: "Wonderful! Do you like learning English with me? Say: Yes I love English, or English is fun",
          hint_en: "Yes I love English... English is fun...",
          target_vocab: ["love English", "fun"]
        }
      ]
    },
    {
      id: 2,
      title: "My Hero Self",
      emoji: "🦸",
      seed_question: "Imagine you are a superhero today! What is your hero name?",
      text_en: "Create your superhero identity!",
      text_vi: "Tạo danh tính siêu anh hùng của bạn!",
      hint_en: "My hero name is Captain Brave... My hero name is Star Girl...",
      hint_vi: "Tên anh hùng của tôi là Captain Brave... Tên tôi là Star Girl...",
      turns: 4,
      frames: [
        {
          frame: 1,
          prompt_en: "Imagine you are a superhero today! What is your hero name? Say: My hero name is Captain Brave, or My hero name is Star Girl",
          hint_en: "My hero name is Captain Brave... My hero name is Star Girl...",
          target_vocab: ["hero name", "Captain Brave", "Star Girl"]
        },
        {
          frame: 2,
          prompt_en: "Awesome hero! What color is your hero suit? Say: My suit is red and blue, or My suit is gold and black",
          hint_en: "My suit is red and blue... My suit is gold and black...",
          target_vocab: ["suit", "red and blue", "gold and black"]
        },
        {
          frame: 3,
          prompt_en: "Cool suit! What is your special hero power? Say: My power is running fast, or My power is helping friends",
          hint_en: "My power is running fast... My power is helping friends...",
          target_vocab: ["power", "running fast", "helping friends"]
        },
        {
          frame: 4,
          prompt_en: "Incredible hero! Who is your favorite hero in real life? Say: My hero is my mum, or My hero is my teacher",
          hint_en: "My hero is my mum... My hero is my teacher...",
          target_vocab: ["hero", "mum", "teacher"]
        }
      ]
    }
  ]
};

export default week1RealData;
