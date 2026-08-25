// Pure Generated Speaking Hub for Week 34
export const speakingHub = {
  talkshow_video: {
    video_id: "forest_cooperation_w34",
    title: "Animal Friendship & Teamwork in Nature"
  },
  info_exchange_cards: {
    candidate_card: {
      title: "The Lion's Home",
      items: [
        { label: "Wilderness Location", value: "Green Wilderness Forest" },
        { label: "Freshwater Food", value: "Freshwater River Fish" },
        { label: "Resting Time", value: "Sunny Peaceful Afternoons" }
      ]
    },
    examiner_card: {
      title: "The Mouse's Burrow",
      items: [
        { label: "Burrow Location", value: "Underneath the Oak Tree" },
        { label: "Protective Skill", value: "Chewing Strong Ropes" },
        { label: "Loyal Friendship", value: "The Mighty Lion" }
      ]
    },
    prompt_questions: [
      "Where is the lion's wilderness location?",
      "What is his favorite freshwater food?",
      "When does he enjoy peaceful afternoons?"
    ],
    examiner_questions: [
      { text: "Where does the lion live?", audio_url: "/audio/week34/ie_examiner_q1.mp3" },
      { text: "What is the lion's favorite food?", audio_url: "/audio/week34/ie_examiner_q2.mp3" },
      { text: "When does he like to rest?", audio_url: "/audio/week34/ie_examiner_q3.mp3" }
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
      { id: "d1", name: "Tree Flower Color", x: 26, y: 20, prompt_en: "In Picture A, the tree flower is small, but in Picture B, there are bright exotic flowers." },
      { id: "d2", name: "Sun and Cloud", x: 80, y: 19, prompt_en: "In Picture A, the sun is shining clearly, but in Picture B, a white cloud is covering the sun." },
      { id: "d3", name: "Mouse Tail Color (Pink)", x: 56, y: 68, prompt_en: "In Picture A, the mouse tail is brown, but in Picture B, the tail is bright pink." },
      { id: "d4", name: "Forest Mushroom Color", x: 82, y: 73, prompt_en: "In Picture A, the mushrooms are brown, but in Picture B, there is a bright cyan mushroom." }
    ]
  }
};

export const speakingHubData = speakingHub;
export default speakingHub;
