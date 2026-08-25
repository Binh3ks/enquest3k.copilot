// Pure Generated Speaking Hub for Week 34
export const speakingHub = {
  talkshow_video: {
    video_id: "forest_cooperation_w34",
    title: "Animal Friendship & Teamwork in Nature"
  },
  info_exchange_cards: {
    candidate_card: {
      title: "The Lion's Home (Candidate)",
      fields: [
        { label: "Location", value: "Green Valley Forest", known: true },
        { label: "Favorite Food", value: null, known: false },
        { label: "Resting Time", value: "Sunny Afternoons", known: true },
        { label: "Helper Animal", value: null, known: false }
      ]
    },
    examiner_card: {
      title: "The Mouse's Home (Examiner)",
      fields: [
        { label: "Location", value: "Under the Tall Oak Tree", known: true },
        { label: "Special Skill", value: null, known: false },
        { label: "Friendship Bond", value: "Mighty Forest Lion", known: true },
        { label: "Rescue Tool", value: null, known: false }
      ]
    },
    full_answers: {
      "Location": ["Green Valley Forest", "Under the Tall Oak Tree"],
      "Favorite Food": ["Fresh Wild Berries & Meat", "Small Grass Seeds"],
      "Resting Time": ["Sunny Afternoons", "Cool Evenings"],
      "Helper Animal": ["Brave Tiny Mouse", "Wise Forest Owl"],
      "Special Skill": ["Chewing Strong Ropes", "Running Fast on Grass"],
      "Friendship Bond": ["Mighty Forest Lion", "Gentle Forest Animals"],
      "Rescue Tool": ["Sharp Front Teeth", "Wooden Stick Lever"]
    },
    prompt_questions: [
      "Where does the lion live?",
      "What is the lion's favorite food?",
      "How did the mouse help the lion?"
    ],
    examiner_questions: [
      { id: "eq1", text: "Where does the mouse live?", audio_url: "/audio/week34/exam_intro_S2.mp3" },
      { id: "eq2", text: "What is the mouse's special skill?", audio_url: "/audio/week34/exam_intro_S3.mp3" },
      { id: "eq3", text: "What did the mouse use to rescue the lion?", audio_url: "/audio/week34/exam_intro_S4.mp3" }
    ]
  },
  picture_story: {
    title: "The Lion and the Little Mouse",
    examiner_intro: "Look at these five pictures. They tell a story about a lion and a little mouse. First, I'll tell you about picture one. Then you tell me about pictures two, three, four, and five.",
    images: [
      { id: 1, image_url: "/images/week34/webtoon_scene_1.png", narrator_prompt: "The lion was sleeping peacefully under a big tree in the forest." },
      { id: 2, image_url: "/images/week34/webtoon_scene_2.png", narrator_prompt: "A tiny mouse ran across his paw and woke him up." },
      { id: 3, image_url: "/images/week34/webtoon_scene_3.png", narrator_prompt: "The lion caught him, but let him go after the mouse promised to help." },
      { id: 4, image_url: "/images/week34/webtoon_scene_4.png", narrator_prompt: "Later, hunters trapped the lion in a heavy rope net." },
      { id: 5, image_url: "/images/week34/webtoon_scene_5.png", narrator_prompt: "The brave mouse chewed the ropes and freed the lion completely." }
    ]
  },
  find_differences: {
    picA: {
      title: "Picture A (Forest Afternoon)",
      image_url: "/images/week34/w34_diff_scene_a.jpg"
    },
    picB: {
      title: "Picture B (Forest Afternoon Difference)",
      image_url: "/images/week34/w34_diff_scene_b.jpg"
    },
    differences: [
      { id: "d1", name: "Mouse Tail Direction", x: 80, y: 19, prompt_en: "In Picture A, the mouse tail points up, but in Picture B, it points down." },
      { id: "d2", name: "Tree Flower Color", x: 26, y: 20, prompt_en: "In Picture A, the flower is pink, but in Picture B, it is yellow." },
      { id: "d3", name: "Butterfly on Rock", x: 56, y: 68, prompt_en: "In Picture A, there is a blue butterfly, but in Picture B, there is no butterfly." },
      { id: "d4", name: "Sun Position", x: 82, y: 73, prompt_en: "In Picture A, the sun is high, but in Picture B, it is behind a cloud." }
    ]
  }
};

export const speakingHubData = speakingHub;
export default speakingHub;
