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
      { id: "d1", name: "Mouse Tail Direction", x: 45, y: 70, prompt_en: "In Picture A, the mouse tail points up, but in Picture B, it points down." },
      { id: "d2", name: "Tree Flower Color", x: 20, y: 35, prompt_en: "In Picture A, the flower is pink, but in Picture B, it is yellow." },
      { id: "d3", name: "Butterfly on Rock", x: 75, y: 60, prompt_en: "In Picture A, there is a blue butterfly, but in Picture B, there is no butterfly." },
      { id: "d4", name: "Sun Position", x: 85, y: 15, prompt_en: "In Picture A, the sun is high, but in Picture B, it is behind a cloud." }
    ]
  }
};

export const speakingHubData = speakingHub;
export default speakingHub;
