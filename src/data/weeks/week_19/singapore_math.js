export default {
  problems: [
    {
      id: 1,
      problem_en: "Tom was 4 years old. His sister was 7 years old. How much older was his sister?",
      problem_vi: "Tom 4 tuổi. Chị Tom 7 tuổi. Chị hơn Tom bao nhiêu tuổi?",
      bars: {
        tom: { units: 4, label: "Tom" },
        sister: { units: 7, label: "Sister" }
      },
      solution_en: "Sister = 7 years. Tom = 4 years. Difference = 7 - 4 = 3 years.",
      solution_vi: "Chị = 7 tuổi. Tom = 4 tuổi. Chênh lệch = 7 - 4 = 3 tuổi.",
      answer: 3,
      unit: "years old",
      audio_url: "/audio/week19/singapore_math_q1.mp3",
      image_url: "/images/week19/bar_model_1.jpg"
    },
    {
      id: 2,
      problem_en: "There were 12 children in kindergarten. 5 were girls. How many boys were there?",
      problem_vi: "Mẫu giáo có 12 trẻ. 5 bé gái. Có bao nhiêu bé trai?",
      bars: {
        total: { units: 12, label: "Total" },
        girls: { units: 5, label: "Girls" },
        boys: { units: "?", label: "Boys" }
      },
      solution_en: "Total = 12. Girls = 5. Boys = 12 - 5 = 7.",
      solution_vi: "Tổng = 12. Gái = 5. Trai = 12 - 5 = 7.",
      answer: 7,
      unit: "boys",
      audio_url: "/audio/week19/singapore_math_q2.mp3",
      image_url: "/images/week19/bar_model_2.jpg"
    },
    {
      id: 3,
      problem_en: "Anna was 100 cm tall. She grew 8 cm. How tall is Anna now?",
      problem_vi: "Anna cao 100 cm. Lớn thêm 8 cm. Anna cao bao nhiêu bây giờ?",
      bars: {
        before: { units: 100, label: "Before (Was)" },
        growth: { units: 8, label: "Growth" },
        now: { units: "?", label: "Now (Is)" }
      },
      solution_en: "Before = 100 cm. Growth = 8 cm. Now = 100 + 8 = 108 cm.",
      solution_vi: "Trước = 100 cm. Lớn thêm = 8 cm. Bây giờ = 100 + 8 = 108 cm.",
      answer: 108,
      unit: "cm",
      audio_url: "/audio/week19/singapore_math_q3.mp3",
      image_url: "/images/week19/bar_model_3.jpg"
    },
    {
      id: 4,
      problem_en: "Ben had 15 toys when he was little. Now he has 23 toys. How many toys did he get?",
      problem_vi: "Ben có 15 đồ chơi lúc nhỏ. Bây giờ có 23 đồ chơi. Ben được thêm bao nhiêu đồ chơi?",
      bars: {
        past: { units: 15, label: "Past (Was)" },
        added: { units: "?", label: "Added" },
        now: { units: 23, label: "Now (Is)" }
      },
      solution_en: "Past = 15 toys. Now = 23 toys. Added = 23 - 15 = 8 toys.",
      solution_vi: "Trước = 15 đồ chơi. Bây giờ = 23. Thêm = 23 - 15 = 8 đồ chơi.",
      answer: 8,
      unit: "toys",
      audio_url: "/audio/week19/singapore_math_q4.mp3",
      image_url: "/images/week19/bar_model_4.jpg"
    },
    {
      id: 5,
      problem_en: "Lisa was 6 years old last year. Her brother was 3 years older. How old was her brother last year?",
      problem_vi: "Lisa 6 tuổi năm ngoái. Anh Lisa hơn 3 tuổi. Anh bao nhiêu tuổi năm ngoái?",
      bars: {
        lisa: { units: 6, label: "Lisa" },
        difference: { units: 3, label: "+3" },
        brother: { units: "?", label: "Brother" }
      },
      solution_en: "Lisa = 6 years. Brother is 3 years older. Brother = 6 + 3 = 9 years.",
      solution_vi: "Lisa = 6 tuổi. Anh hơn 3 tuổi. Anh = 6 + 3 = 9 tuổi.",
      answer: 9,
      unit: "years old",
      audio_url: "/audio/week19/singapore_math_q5.mp3",
      image_url: "/images/week19/bar_model_5.jpg"
    },
    {
      id: 6,
      problem_en: "There were 20 photos in the past. Now there are 35 photos. How many new photos were added?",
      problem_vi: "Trước có 20 ảnh. Bây giờ có 35 ảnh. Thêm bao nhiêu ảnh mới?",
      bars: {
        past: { units: 20, label: "Past (Were)" },
        added: { units: "?", label: "Added" },
        now: { units: 35, label: "Now (Are)" }
      },
      solution_en: "Past = 20 photos. Now = 35 photos. Added = 35 - 20 = 15 photos.",
      solution_vi: "Trước = 20 ảnh. Bây giờ = 35 ảnh. Thêm = 35 - 20 = 15 ảnh.",
      answer: 15,
      unit: "photos",
      audio_url: "/audio/week19/singapore_math_q6.mp3",
      image_url: "/images/week19/bar_model_6.jpg"
    }
  ]
};
