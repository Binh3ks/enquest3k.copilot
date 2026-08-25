// Pure Generated Speaking Hub for Week 34
export const speakingHub = {
  talkshow_video: {
    video_id: "forest_cooperation_w34",
    title: "Animal Friendship & Teamwork in Nature"
  },
  info_exchange_cards: {
    candidate_card: {
      title: "The Lion's Home (Leo)",
      fields: [
        { label: "Location", value: "Green Valley Forest", known: true },
        { label: "Favorite Food", value: null, known: false },
        { label: "Resting Time", value: "Sunny Afternoons", known: true },
        { label: "Best Friend", value: null, known: false }
      ]
    },
    examiner_card: {
      title: "The Mouse's Home (Milo)",
      fields: [
        { label: "Location", value: "Under the Tall Oak Tree", known: true },
        { label: "Favorite Food", value: null, known: false },
        { label: "Special Skill", value: "Chewing Strong Ropes", known: true },
        { label: "Best Friend", value: null, known: false }
      ]
    },
    full_answers: {
      "Location": ["Green Valley Forest", "Under the Tall Oak Tree"],
      "Favorite Food": ["Wild Berries and Fresh Meat", "Small seeds and fresh nuts"],
      "Resting Time": ["Sunny Afternoons", "Under soft leaves at night"],
      "Special Skill": ["Loud Roar across the trees", "Chewing Strong Ropes"],
      "Best Friend": ["Milo the brave mouse", "Leo the mighty lion"]
    },
    prompt_questions: [
      "Where is the lion's location?",
      "What is his favorite food?",
      "When does he like to rest?"
    ],
    examiner_questions: [
      { id: "eq1", text: "Where is Leo's home located?", audio_url: "/audio/week34/ie_examiner_q1.mp3" },
      { id: "eq2", text: "What time does Leo usually rest?", audio_url: "/audio/week34/ie_examiner_q2.mp3" },
      { id: "eq3", text: "What is Milo's special skill?", audio_url: "/audio/week34/ie_examiner_q3.mp3" }
    ]
  },
  picture_story: {
    title: "The Forest Adventure",
    images: [
      { id: 1, image_url: "/images/week34/ps_1.png", narrator_prompt: "Leo and Milo decided to explore the forest." },
      { id: 2, image_url: "/images/week34/ps_2.png", narrator_prompt: "They found a hidden cave near the river." },
      { id: 3, image_url: "/images/week34/ps_3.png", narrator_prompt: "Inside the cave, they saw something shiny." },
      { id: 4, image_url: "/images/week34/ps_4.png", narrator_prompt: "It was an old treasure chest!" },
      { id: 5, image_url: "/images/week34/ps_5.png", narrator_prompt: "They opened it and found gold coins." }
    ],
    examiner_intro: "Look at these five pictures. They tell a story about Leo and Milo. First, I'll tell you about picture one. Then you tell me about pictures two, three, four, and five."
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
      { id: "d1", name: "Tree Flower Color", x: 80, y: 19, prompt_en: "In Picture A, the tree flower is small, but in Picture B, there are bright exotic flowers." },
      { id: "d2", name: "Sun and Cloud", x: 26, y: 20, prompt_en: "In Picture A, the sun is shining clearly, but in Picture B, a white cloud is covering the sun." },
      { id: "d3", name: "Mouse Tail Color (Pink)", x: 56, y: 68, prompt_en: "In Picture A, the mouse tail is brown, but in Picture B, the tail is bright pink." },
      { id: "d4", name: "Forest Mushroom Color", x: 82, y: 73, prompt_en: "In Picture A, the mushrooms are brown, but in Picture B, there is a bright cyan mushroom." }
    ]
  }
};

export const speakingHubData = speakingHub;
export default speakingHub;
