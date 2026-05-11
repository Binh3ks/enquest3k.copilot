export default {
  title: "Word Match: The Big Adventure",
  image_url: "/images/week29/wordmatch_cover_w29.jpg",
  audio_url: "/audio/week29/wordmatch_main.mp3",
  instruction_en: "Match each word or phrase to its meaning or pair.",
  instruction_vi: "Nối mỗi từ hoặc cụm từ với nghĩa hoặc cặp của nó.",
  sets: [
    {
      id: "irregular_verbs_transport",
      label_en: "Base Form → Past Simple",
      label_vi: "Dạng gốc → Quá khứ đơn",
      pairs: [
        { left: "go", right: "went" },
        { left: "run", right: "ran" },
        { left: "come", right: "came" },
        { left: "fly", right: "flew" },
        { left: "begin", right: "began" },
        { left: "take", right: "took" }
      ]
    },
    {
      id: "travel_vocab",
      label_en: "English Word → Vietnamese",
      label_vi: "Tiếng Anh – Tiếng Việt",
      pairs: [
        { left: "journey", right: "chuyến đi" },
        { left: "airport", right: "sân bay" },
        { left: "passenger", right: "hành khách" },
        { left: "departure", right: "giờ khởi hành" },
        { left: "arrival", right: "sự đến nơi" },
        { left: "destination", right: "điểm đến" }
      ]
    },
    {
      id: "story_actions",
      label_en: "Who did what in the story?",
      label_vi: "Ai làm gì trong câu chuyện?",
      pairs: [
        { left: "Dad", right: "ran to the check-in desk" },
        { left: "Mum", right: "came with the luggage" },
        { left: "Lily", right: "flew above the clouds" },
        { left: "Grandma", right: "ran from the arrival hall" },
        { left: "The family", right: "went to the airport by taxi" },
        { left: "The plane", right: "flew up into the sky" }
      ]
    },
    {
      id: "cambridge_occupations_1",
      label_en: "Job → Meaning",
      label_vi: "Nghề nghiệp → Nghĩa",
      pairs: [
        { left: "pilot", right: "phi công" },
        { left: "doctor", right: "bác sĩ" },
        { left: "farmer", right: "nông dân" },
        { left: "teacher", right: "giáo viên" },
        { left: "driver", right: "tài xế" },
        { left: "nurse", right: "y tá" }
      ]
    }
  ]
};
