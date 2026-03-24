export default {
  problems: [
    {
      id: 1,
      problem_en: "Tom is 4. His sister is 7. How much older is sister?",
      problem_vi: "Tom 4 tuổi. Chị 7 tuổi. Chị hơn bao nhiêu tuổi?",
      bars: {
        tom: { units: 4, label: "Tom" },
        sister: { units: 7, label: "Sister" }
      },
      solution_en: "Sister is 7. Tom is 4. 7 - 4 = 3.",
      solution_vi: "Chị 7 tuổi. Tom 4 tuổi. 7 - 4 = 3.",
      answer: 3,
      unit: "years",
      audio_url: "/audio/week19_easy/singapore_math_q1.mp3",
      image_url: "/images/week19_easy/bar_model_1.jpg"
    },
    {
      id: 2,
      problem_en: "12 kids. 5 girls. How many boys?",
      problem_vi: "12 trẻ. 5 bé gái. Bao nhiêu bé trai?",
      bars: {
        total: { units: 12, label: "Total" },
        girls: { units: 5, label: "Girls" },
        boys: { units: "?", label: "Boys" }
      },
      solution_en: "Total 12. Girls 5. Boys = 12 - 5 = 7.",
      solution_vi: "Tổng 12. Gái 5. Trai = 12 - 5 = 7.",
      answer: 7,
      unit: "boys",
      audio_url: "/audio/week19_easy/singapore_math_q2.mp3",
      image_url: "/images/week19_easy/bar_model_2.jpg"
    },
    {
      id: 3,
      problem_en: "Anna was 100 cm. She grew 8 cm. How tall now?",
      problem_vi: "Anna 100 cm. Lớn 8 cm. Bây giờ cao bao nhiêu?",
      bars: {
        before: { units: 100, label: "Before" },
        growth: { units: 8, label: "Growth" },
        now: { units: "?", label: "Now" }
      },
      solution_en: "Before 100 cm. Growth 8 cm. Now = 100 + 8 = 108 cm.",
      solution_vi: "Trước 100 cm. Lớn 8 cm. Bây giờ = 100 + 8 = 108 cm.",
      answer: 108,
      unit: "cm",
      audio_url: "/audio/week19_easy/singapore_math_q3.mp3",
      image_url: "/images/week19_easy/bar_model_3.jpg"
    },
    {
      id: 4,
      problem_en: "Ben had 15 toys. Now he has 23 toys. How many added?",
      problem_vi: "Ben có 15 đồ chơi. Bây giờ có 23. Thêm bao nhiêu?",
      bars: {
        past: { units: 15, label: "Past" },
        added: { units: "?", label: "Added" },
        now: { units: 23, label: "Now" }
      },
      solution_en: "Past 15. Now 23. Added = 23 - 15 = 8.",
      solution_vi: "Trước 15. Bây giờ 23. Thêm = 23 - 15 = 8.",
      answer: 8,
      unit: "toys",
      audio_url: "/audio/week19_easy/singapore_math_q4.mp3",
      image_url: "/images/week19_easy/bar_model_4.jpg"
    }
  ]
};
