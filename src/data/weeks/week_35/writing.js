// Week 35 Writing Studio Data
export default {
  title: "The Best Day Ever — Camping Story",
  prompt_en: "Look at the three pictures. Write the story. Write 20 or more words.",
  prompt_vi: "Nhìn vào 3 bức tranh. Viết câu chuyện kể lại chuyến cắm trại (20 từ trở lên).",
  min_sentences: 3,
  min_words: 20,
  max_words: 60,
  model_sentence: "Last weekend, my family went camping in Pine Valley. While my parents were setting up our tent, we collected dry wood. In the evening, we sat around the warm campfire, roasted sweet marshmallows, and looked at the bright starry sky. It was truly the best day ever.",
  picture_story: [
    { panel_id: 'panel_1', title_en: 'Panel 1: Pitching the Tent', title_vi: 'Cảnh 1: Dựng Lều Cắm Trại', image_url: '/images/week35/writing_panel_1.png' },
    { panel_id: 'panel_2', title_en: 'Panel 2: Hiking by the Stream', title_vi: 'Cảnh 2: Đi Bộ Dọc Con Suối', image_url: '/images/week35/writing_panel_2.png' },
    { panel_id: 'panel_3', title_en: 'Panel 3: Campfire Under Stars', title_vi: 'Cảnh 3: Lửa Trại Dưới Bầu Trời Sao', image_url: '/images/week35/writing_panel_3.png' }
  ],
  word_bank_pills: {
    action_verbs: ['packed backpacks', 'pitched tent', 'hiked along stream', 'lit campfire', 'roasted marshmallows', 'looked at stars'],
    connectors: ['early in the morning', 'in the afternoon', 'when evening arrived', 'while', 'because', 'finally'],
    cumulative_chunks: ['went camping in the mountains', 'set up the blue tent', 'hiked along the stream', 'roasted sweet marshmallows', 'clear starry sky'],
    grammar_boosters: ['were setting up', 'was hiking', 'were roasting', 'had gathered']
  },
  sentence_frames: [
    { template: "Early in the morning, we drove to Pine Valley to go ___.", answers: ["camping"] },
    { template: "While parents set up the tent, we gathered dry ___.", answers: ["wood"] },
    { template: "In the afternoon, we hiked along a cool forest ___.", answers: ["stream"] },
    { template: "We roasted sweet ___ over the warm campfire.", answers: ["marshmallows"] },
    { template: "Looking at the starry sky, we celebrated the best ___ ever.", answers: ["day"] }
  ],
  picture_mode: {
    type: "picture",
    image_url: "/images/week35/writing_panel_1.png",
    panels: [
      {
        id: 1,
        image_url: "/images/week35/writing_panel_1.png",
        caption: "Panel 1: Arriving at the campsite and pitching the tent",
        character_guide: "Family (pitching tent together) in the green pine valley",
        action_tags: ["camping", "tent", "mountain", "pine trees"],
        nova_question_en: "What was the family doing when they arrived at the campsite in Panel 1?",
        pills: ["early on Saturday morning,", "were setting up the tent,", "in the green valley,", "packed their backpacks,"],
        grammar_hint: "Past Continuous: were setting up",
        sentence_frame: "Early in the morning, the family arrived at the campsite and set up their tent.",
        pill_color: "blue"
      },
      {
        id: 2,
        image_url: "/images/week35/writing_panel_2.png",
        caption: "Panel 2: Hiking along the clear forest stream",
        character_guide: "Children (hiking with walking sticks) spotting wildlife",
        action_tags: ["hiking", "stream", "nature", "squirrels"],
        nova_question_en: "Where did the children go hiking in Panel 2 and what did they see?",
        pills: ["hiked along the stream,", "spotted two squirrels,", "the water was crystal clear,", "in the cool afternoon,"],
        grammar_hint: "Past Simple: hiked, spotted",
        sentence_frame: "In the afternoon, they hiked along the forest stream and saw playful squirrels.",
        pill_color: "amber"
      },
      {
        id: 3,
        image_url: "/images/week35/writing_panel_3.png",
        caption: "Panel 3: Enjoying the warm campfire under the starry sky",
        character_guide: "Family (roasting marshmallows & stargazing)",
        action_tags: ["campfire", "marshmallows", "starry sky", "best day"],
        nova_question_en: "How did the family spend their evening in Panel 3?",
        pills: ["sat around the campfire,", "roasted sweet marshmallows,", "under the starry night sky,", "the best day ever,"],
        grammar_hint: "Past Simple: sat, roasted, celebrated",
        sentence_frame: "In the evening, they roasted marshmallows by the warm campfire under the starry sky.",
        pill_color: "emerald"
      }
    ]
  }
};
