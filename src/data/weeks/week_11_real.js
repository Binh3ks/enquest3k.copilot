/**
 * ✅ WEEK 11 REAL SYLLABUS DATA (Rule 11 Golden Standard)
 * Topic: Weekend Fun Spots (Places)
 * Theme: Weekend Places Explorer & Personal Weekend Application
 */

export const week11RealData = {
  week_id: 11,
  phase: 1,
  block: "B",
  unit: 11,
  
  week_title_en: "Weekend Fun Spots (Places)",
  week_title_vi: "Địa Điểm Vui Chơi Cuối Tuần",
  
  topic: "Weekend Fun Spots (Places)",
  topic_vi: "Địa Điểm Vui Chơi Cuối Tuần",
  
  learning_outcome: "Identify and talk about fun weekend places using 'at the park'.",
  learning_outcome_vi: "Nhận biết và nói về các địa điểm vui chơi cuối tuần dùng 'at the park'.",
  
  grammar_focus: "Pattern 'I go to / I play at...'",
  grammar_pattern: "I go to the park / I play at the park",
  
  target_vocab: [
    { word: "park", pronunciation: "/pɑːrk/", definition_vi: "Công viên" },
    { word: "library", pronunciation: "/ˈlaɪbreri/", definition_vi: "Thư viện" },
    { word: "supermarket", pronunciation: "/ˈsuːpərmɑːrkɪt/", definition_vi: "Siêu thị" },
    { word: "playground", pronunciation: "/ˈpleɪɡraʊnd/", definition_vi: "Sân chơi" },
    { word: "zoo", pronunciation: "/zuː/", definition_vi: "Sở thú" },
    { word: "restaurant", pronunciation: "/ˈrestrɑːnt/", definition_vi: "Nhà hàng" }
  ],
  
  story_missions: [
    {
      mission_id: 1,
      title: "My Weekend Adventure",
      title_vi: "Cuộc Phiêu Lưu Cuối Tuần",
      theme: "Reading Passage 1 Retell - My Weekend Adventure",
      type: "retell",
      turns: 8,
      story_character: {
        name: "Nova - Explorer",
        role: "AI English Teacher guiding reading retell"
      },
      opening_narrative: "Hi! I am Nova! Today let's talk about My Weekend Adventure! On Saturday, the child goes to many fun places. Want to retell the weekend story with me?",
      story_arc: [
        {
          phase: "saturday_places",
          turns: "1-4",
          phase_name: "Saturday Fun Spots",
          focus: "Retelling park, library, supermarket, and playground",
          phase_questions: [
            {
              template: "Awesome! Where does the child go first on Saturday morning? Say: He goes to the park, or He plays at the park",
              hints: ["goes to", "park", "plays at"]
            },
            {
              template: "Great! Who does he play at the park with? Say: He plays with his friends, or He plays with his mum",
              hints: ["plays with", "friends", "mum"]
            },
            {
              template: "Nice! Where does he go next to read a story book? Say: He goes to the library, or He reads at the library",
              hints: ["goes to", "library", "reads book"]
            },
            {
              template: "Super! Where do he and his mom buy food after that? Say: They go to the supermarket, or They buy food at the supermarket",
              hints: ["supermarket", "buy food"]
            }
          ]
        },
        {
          phase: "sunday_places",
          turns: "5-8",
          phase_name: "Sunday Fun Spots",
          focus: "Retelling playground, zoo, and restaurant",
          phase_questions: [
            {
              template: "Awesome! What does he do at the playground? Say: He slides down the slide, or He plays on the swings",
              hints: ["slides down", "slide", "playground"]
            },
            {
              template: "Wonderful! On Sunday, where does he see a lion and a monkey? Say: He goes to the zoo, or He sees animals at the zoo",
              hints: ["goes to zoo", "lion and monkey"]
            },
            {
              template: "Incredible! Where do they have a delicious lunch together? Say: They eat at a restaurant, or They have lunch at a restaurant",
              hints: ["restaurant", "delicious lunch"]
            },
            {
              template: "What a fun weekend! Why does the child love weekends? Say: Every place is special and fun, or He loves exploring new places",
              hints: ["special and fun", "loves exploring"]
            }
          ]
        }
      ]
    },
    {
      mission_id: 2,
      title: "City Fun Map",
      title_vi: "Bản Đồ Vui Chơi Thành Phố",
      theme: "Reading Passage 2 Retell - City Fun Map",
      type: "retell",
      turns: 8,
      story_character: {
        name: "Nova - Guide",
        role: "Guide explaining city spots and map"
      },
      opening_narrative: "Welcome back! In our second story, we look at a map of city fun spots! Let's retell how different places connect on the map!",
      story_arc: [
        {
          phase: "map_spots",
          turns: "1-4",
          phase_name: "Map Spots",
          focus: "Retelling places on the city map",
          phase_questions: [
            {
              template: "Super! What is next to the green park on our city map? Say: The library is next to the park, or The playground is next to the park",
              hints: ["library", "next to", "park"]
            },
            {
              template: "Awesome! Where do people buy sweet bread and cakes on the map? Say: At the bakery, or They go to the bakery",
              hints: ["bakery", "sweet bread"]
            },
            {
              template: "Cool! Where is the big blue swimming pool on the map? Say: It is behind the school, or It is near the playground",
              hints: ["swimming pool", "behind school"]
            },
            {
              template: "Great! How do children travel from home to the zoo? Say: They go by bus, or They ride bicycles",
              hints: ["by bus", "bicycles"]
            }
          ]
        },
        {
          phase: "city_actions",
          turns: "5-8",
          phase_name: "City Actions",
          focus: "Retelling city actions and safety",
          phase_questions: [
            {
              template: "Wonderful! What do people do at the quiet library? Say: They read books quietly, or They study English",
              hints: ["read books", "study English"]
            },
            {
              template: "Nice! Where do families eat dinner on Saturday night? Say: At a nice restaurant, or At the food corner",
              hints: ["restaurant", "food corner"]
            },
            {
              template: "Super! What should you do before crossing the street near the park? Say: Look left and right, or Walk carefully",
              hints: ["look left and right", "walk carefully"]
            },
            {
              template: "Incredible! Why is the city fun map useful for everyone? Say: It helps people find fun places, or It shows all city spots",
              hints: ["find fun places", "city spots"]
            }
          ]
        }
      ]
    },
    {
      mission_id: 3,
      title: "Your Favorite Weekend Places",
      title_vi: "Địa Điểm Cuối Tuần Yêu Thích Của Bạn",
      theme: "Student Personal Application - Favorite Weekend Spots",
      type: "personal",
      turns: 6,
      story_character: {
        name: "Nova - Friend",
        role: "Friend chatting about weekend plans"
      },
      opening_narrative: "Now it is YOUR turn! Where do YOU love going on weekends? Say: I like going to the park, or I like going to the zoo",
      story_arc: [
        {
          phase: "personal_weekend",
          turns: "1-6",
          phase_name: "My Weekend Life",
          focus: "Student introducing personal weekend habits and places",
          phase_questions: [
            {
              template: "Awesome! Who do you go to the park with? Say: I go with my family, or I go with my best friends",
              hints: ["family", "best friends"]
            },
            {
              template: "Cool! What fun things do you do at the park? Say: I play games and run, or I ride my bicycle",
              hints: ["play games", "ride bicycle"]
            },
            {
              template: "Nice! Do you like reading books at the library? Say: Yes I love books, or I read story books",
              hints: ["love books", "story books"]
            },
            {
              template: "Super! What delicious food do you like eating at the restaurant? Say: I like eating pizza, or I like eating noodles",
              hints: ["pizza", "noodles", "ice cream"]
            },
            {
              template: "Wonderful! Which place do you want to visit next weekend? Say: I want to visit the zoo, or I want to visit the beach",
              hints: ["zoo", "beach", "water park"]
            },
            {
              template: "Incredible weekend plan! Are you excited for next weekend? Say: Yes I am excited, or Next weekend will be fun",
              hints: ["excited", "weekend fun"]
            }
          ]
        }
      ]
    }
  ],

  spark_talk: [
    {
      id: 1,
      title: "My Favorite Weekend Spot",
      emoji: "🏞️",
      seed_question: "Where do you love going on weekends? Tell Nova!",
      text_en: "Talk about your favorite weekend place!",
      text_vi: "Nói về địa điểm cuối tuần yêu thích của bạn!",
      hint_en: "I like going to the park... I like going to the zoo...",
      hint_vi: "Tôi thích đi công viên... Tôi thích đi sở thú...",
      turns: 6,
      frames: [
        {
          frame: 1,
          prompt_en: "Where do you love going on weekends? Say: I like going to the park, or I like going to the zoo",
          hint_en: "I like going to the park... I like going to the zoo...",
          target_vocab: ["park", "zoo"]
        },
        {
          frame: 2,
          prompt_en: "Awesome! What do you do there? Say: I play with my friends, or I see cute animals",
          hint_en: "I play with my friends... I see cute animals...",
          target_vocab: ["play with friends", "see animals"]
        },
        {
          frame: 3,
          prompt_en: "Cool! Who goes with you on weekends? Say: I go with my parents, or I go with my brother",
          hint_en: "I go with my parents... I go with my brother...",
          target_vocab: ["parents", "brother"]
        },
        {
          frame: 4,
          prompt_en: "Nice! What is your favorite snack at this place? Say: I eat ice cream, or I drink fresh juice",
          hint_en: "I eat ice cream... I drink fresh juice...",
          target_vocab: ["ice cream", "fresh juice"]
        },
        {
          frame: 5,
          prompt_en: "Super! Is this place near your home or far away? Say: It is near my home, or It is far away",
          hint_en: "It is near my home... It is far away...",
          target_vocab: ["near my home", "far away"]
        },
        {
          frame: 6,
          prompt_en: "Wonderful weekend spot! Do you want to go there this Saturday? Say: Yes I will go this Saturday, or Yes I am excited",
          hint_en: "Yes I will go this Saturday... Yes I am excited...",
          target_vocab: ["go this Saturday", "excited"]
        }
      ]
    },
    {
      id: 2,
      title: "Fun Day Out",
      emoji: "🍦",
      seed_question: "Plan a fun day out with Nova!",
      text_en: "Plan a fun day out in the city!",
      text_vi: "Lập kế hoạch dạo chơi thành phố!",
      hint_en: "Let's visit the library... Let's visit the supermarket...",
      hint_vi: "Hãy đi thăm thư viện... Hãy đi thăm siêu thị...",
      turns: 6,
      frames: [
        {
          frame: 1,
          prompt_en: "Let me plan a fun day out in the city with you! Where should we start? Say: Let's visit the library first, or Let's visit the park first",
          hint_en: "Let's visit the library first... Let's visit the park first...",
          target_vocab: ["visit library", "visit park"]
        },
        {
          frame: 2,
          prompt_en: "Great choice! After that, where should we go for lunch? Say: Let's eat at a pizza restaurant, or Let's eat at a bakery",
          hint_en: "Let's eat at a pizza restaurant... Let's eat at a bakery...",
          target_vocab: ["pizza restaurant", "bakery"]
        },
        {
          frame: 3,
          prompt_en: "Delicious! What drink would you like to order? Say: I want orange juice, or I want chocolate milk",
          hint_en: "I want orange juice... I want chocolate milk...",
          target_vocab: ["orange juice", "chocolate milk"]
        },
        {
          frame: 4,
          prompt_en: "Awesome! In the afternoon, should we see animals at the zoo? Say: Yes let's see the lions, or Yes let's see the monkeys",
          hint_en: "Yes let's see the lions... Yes let's see the monkeys...",
          target_vocab: ["see lions", "see monkeys"]
        },
        {
          frame: 5,
          prompt_en: "Super fun! How should we travel back home? Say: We can ride a bus, or We can walk back home",
          hint_en: "We can ride a bus... We can walk back home...",
          target_vocab: ["ride a bus", "walk home"]
        },
        {
          frame: 6,
          prompt_en: "What a perfect fun day out! Did you enjoy our city trip? Say: Yes it was amazing, or I loved our trip",
          hint_en: "Yes it was amazing... I loved our trip...",
          target_vocab: ["amazing", "loved trip"]
        }
      ]
    }
  ]
};

export default week11RealData;
