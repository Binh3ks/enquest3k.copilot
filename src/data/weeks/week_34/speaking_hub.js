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
        { label: "Location", value: "Green Valley Forest" },
        { label: "Favorite Food", value: "Fresh Fish & Fruit" },
        { label: "Resting Time", value: "Sunny Afternoons" }
      ]
    },
    examiner_card: {
      title: "The Mouse's Home",
      items: [
        { label: "Location", value: "Under the Tall Oak Tree" },
        { label: "Special Skill", value: "Chewing Strong Ropes" },
        { label: "Best Friend", value: "The Mighty Lion" }
      ]
    },
    prompt_questions: [
      "Where does the lion live?",
      "What is the lion's favorite food?",
      "When does he like to rest?"
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
