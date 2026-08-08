import fs from 'fs';
import path from 'path';

console.log('🚀 Creating src/data/weeks/week_37_real.js (AI Tutor V28 Format)...');

const content = `// WEEK 37: The Sports Day Challenge
// AI Tutor V28 Format — Sports Day & Healthy Habits

const week_37RealData = {
  week_id: 37,
  week_number: 37,
  title: "The Sports Day Challenge",
  weekTitle_en: "The Sports Day Challenge",
  weekTitle_vi: "Thách Thức Ngày Hội Thể Thao",
  topic: "Outdoor sports, physical fitness, relay races, adverbs of manner (-ly)",
  topic_vi: "Thể thao ngoài trời, rèn luyện thể chất, đua tiếp sức, trạng từ chỉ cách thức (-ly)",
  theme: "sports_day_challenge",
  grammar_focus: "Past Simple & Adverbs of Manner (-ly)",
  grammar_pattern: "He ran very fast. She passed the baton smoothly. They worked together.",
  grammar_examples: [
    "Leo ran very fast along the track.",
    "Maya passed the baton cleanly to her teammate.",
    "They were tired but happy."
  ],

  chunk_focus: [
    "Saturday morning",
    "went to the sports stadium",
    "was sunny and warm",
    "First of all",
    "sat down with his coach",
    "ran very fast",
    "passed the baton",
    "In Panel One",
    "ran across the grass",
    "In Panel Two",
    "caught the baton",
    "watched and clapped",
    "At the very end",
    "were tired but happy",
    "teamwork brought victory",
    "smiled with pride"
  ],

  target_vocab: [
    { word: "athlete", pronunciation: "/ˈæθliːt/", definition_vi: "vận động viên", definition_en: "a person who is proficient in sports" },
    { word: "relay", pronunciation: "/ˈriːleɪ/", definition_vi: "cuộc đua tiếp sức", definition_en: "a race between teams passing a stick" },
    { word: "baton", pronunciation: "/bəˈtɒn/", definition_vi: "gậy tiếp sức", definition_en: "a short stick passed from runner to runner" },
    { word: "stadium", pronunciation: "/ˈsteɪdiəm/", definition_vi: "sân vận động", definition_en: "a large sports arena" },
    { word: "teamwork", pronunciation: "/ˈtiːmwɜːk/", definition_vi: "tinh thần đồng đội", definition_en: "the combined action of a group working together" }
  ],

  voice_character: {
    name: "Coach Leo - Sports Mentor",
    personality: "Energetic, encouraging, supportive, uses clear action verbs and adverbs of manner.",
    speaking_style: "Upbeat, motivating, uses past simple and adverbs like smoothly and fast.",
    v28_format_notes: "W37 follows V28 schema. Theme: sports_day_challenge. Grammar: Past Simple & Adverbs of Manner."
  },

  knowledge_base: [
    "Past Simple and Adverbs of Manner: ran fast, passed smoothly, caught cleanly, worked together",
    "Sports Vocabulary: athlete, relay race, baton, stadium, teamwork",
    "Fair play and encouraging teammates are core values in outdoor sports."
  ],

  story_character: {
    name: "Coach Leo - Sports Mentor",
    personality: "Energetic, supportive, motivating",
    backstory: "I am Coach Leo! I love sports, teamwork, and helping students stay active and healthy.",
    speaking_style: "Upbeat and friendly",
    facts: { loves_sports: true, teaches_teamwork: true },
    role: "Sports mentor guiding students through relay race stories"
  },

  story_missions: [
    {
      mission_id: 1,
      id: 1,
      title: "The Great School Relay",
      title_en: "The Great School Relay",
      title_vi: "Cuộc Đua Tiếp Sức Trường Học",
      theme: "Describing a relay race using past simple and adverbs of manner",
      type: "story",
      character: {
        name: "Coach Leo - Sports Mentor",
        role: "Sports mentor guiding students through the relay race story"
      },
      opening_narrative: "Hello! I am Coach Leo. On Saturday morning, our team went to the sports stadium for the big relay race. The weather was sunny and warm. Want to hear how we won the relay?",
      story_arc: [
        {
          phase: "the_race_start",
          turns: "1-5",
          phase_name: "The Race Start",
          focus: "Describing how the race started using past simple",
          goal: "Student retells the beginning of the relay race",
          phase_questions: [
            {
              template: "Awesome! Where did we go on Saturday morning? Say: We went to the sports stadium, or We went to the park",
              hints: ["went", "sports stadium", "Saturday morning"]
            },
            {
              template: "Great! How did Leo run along the track? Say: Leo ran very fast, or He ran smoothly",
              hints: ["ran", "very fast", "track", "smoothly"]
            },
            {
              template: "Wonderful! What did Leo pass to Maya? Say: He passed the baton, or He passed the relay stick",
              hints: ["passed", "baton", "cleanly"]
            }
          ]
        }
      ]
    }
  ],

  freetalk_topics: [
    {
      id: "freetalk_sports",
      title: "My Favourite Outdoor Sport",
      opening: "Hi there! I love playing outdoor sports. What is your favourite sport to play with friends?"
    }
  ]
};

export default week_37RealData;
`;

fs.writeFileSync('./src/data/weeks/week_37_real.js', content, 'utf8');
console.log('✅ Successfully created src/data/weeks/week_37_real.js!');
