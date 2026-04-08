export default {
  title: "Singapore Math: The Live Reporter",
  image_url: "/images/week18/math_cover_w18.jpg",
  audio_url: "/audio/week18/math_main.mp3",
  intro_en: "Use the bar model to solve these reporter word problems.",
  intro_vi: "Dùng mô hình thanh để giải các bài toán về phóng viên.",
  problems: [
    {
      id: 1,
      type: "part_whole",
      cpa_stage: "pictorial",
      question_en: "Reporter A filmed 8 scenes in the morning. Reporter B filmed 9 scenes in the afternoon. How many scenes were filmed altogether?",
      question_vi: "Phóng viên A quay 8 cảnh vào buổi sáng. Phóng viên B quay 9 cảnh vào buổi chiều. Tổng cộng có bao nhiêu cảnh được quay?",
      bar_model: "/images/week18/barmodel_w18_adv_p1_v1.jpg",
      solution_steps: [
        "Reporter A: 8 scenes",
        "Reporter B: 9 scenes",
        "Total: 8 + 9 = ?"
      ],
      answer: ["17", "seventeen", "17 scenes"],
      unit: "scenes",
      hint_en: "Add both reporters' scenes: 8 + 9.",
      hint_vi: "Cộng cảnh quay của hai phóng viên: 8 + 9.",
      explanation_en: "8 + 9 = 17. There were 17 scenes filmed altogether.",
      math_vocab: ["altogether", "total", "add", "scenes"],
      audio_url: "/audio/week18/math_p1.mp3"
    },
    {
      id: 2,
      type: "comparison",
      cpa_stage: "pictorial",
      question_en: "Channel 1 has 16 cameras in the studio. Channel 2 has 7 cameras. How many more cameras does Channel 1 have?",
      question_vi: "Kênh 1 có 16 máy quay trong trường quay. Kênh 2 có 7 máy quay. Kênh 1 có nhiều hơn bao nhiêu máy quay?",
      bar_model: "/images/week18/barmodel_w18_adv_p2_v1.jpg",
      solution_steps: [
        "Channel 1 cameras: 16",
        "Channel 2 cameras: 7",
        "Difference: 16 - 7 = ?"
      ],
      answer: ["9", "nine", "9 cameras"],
      unit: "cameras",
      hint_en: "Subtract the smaller number from the larger: 16 - 7.",
      hint_vi: "Trừ số nhỏ hơn khỏi số lớn hơn: 16 - 7.",
      explanation_en: "16 - 7 = 9. Channel 1 has 9 more cameras than Channel 2.",
      math_vocab: ["more than", "difference", "compare", "cameras"],
      audio_url: "/audio/week18/math_p2.mp3"
    },
    {
      id: 3,
      type: "missing_part",
      cpa_stage: "pictorial",
      question_en: "The TV show needs 20 sound clips. So far 13 clips are ready. How many more clips are still needed?",
      question_vi: "Chương trình truyền hình cần 20 đoạn âm thanh. Đến nay đã sẵn sàng 13 đoạn. Cần thêm bao nhiêu đoạn nữa?",
      bar_model: "/images/week18/barmodel_w18_adv_p3_v1.jpg",
      solution_steps: [
        "Total clips needed: 20",
        "Clips ready: 13",
        "Still needed: 20 - 13 = ?"
      ],
      answer: ["7", "seven", "7 clips"],
      unit: "clips",
      hint_en: "Total minus done = still needed. 20 - 13 = ?",
      hint_vi: "Tổng trừ đã có = còn thiếu. 20 - 13 = ?",
      explanation_en: "20 - 13 = 7. They still need 7 more sound clips.",
      math_vocab: ["missing part", "still needed", "subtract", "total"],
      audio_url: "/audio/week18/math_p3.mp3"
    },
    {
      id: 4,
      type: "groups",
      cpa_stage: "pictorial",
      question_en: "There are 4 filming crews. Each crew has 3 cameras. How many cameras are there in total?",
      question_vi: "Có 4 đội quay phim. Mỗi đội có 3 máy quay. Tổng cộng có bao nhiêu máy quay?",
      bar_model: "/images/week18/barmodel_w18_adv_p4_v1.jpg",
      solution_steps: [
        "Number of crews: 4",
        "Cameras per crew: 3",
        "Total: 3 + 3 + 3 + 3 = ?"
      ],
      answer: ["12", "twelve", "12 cameras"],
      unit: "cameras",
      hint_en: "Count 4 equal groups of 3: 3 + 3 + 3 + 3.",
      hint_vi: "Đếm 4 nhóm bằng nhau, mỗi nhóm 3: 3 + 3 + 3 + 3.",
      explanation_en: "3 + 3 + 3 + 3 = 12. There are 12 cameras in total.",
      math_vocab: ["equal groups", "each", "altogether", "crews"],
      audio_url: "/audio/week18/math_p4.mp3"
    },
    {
      id: 5,
      type: "before_after",
      cpa_stage: "pictorial",
      question_en: "The studio had 18 lights switched on before the show. After the show, 9 lights were turned off. How many lights are still on?",
      question_vi: "Trường quay có 18 đèn sáng trước buổi diễn. Sau buổi diễn, 9 đèn đã tắt. Còn bao nhiêu đèn vẫn sáng?",
      bar_model: "/images/week18/barmodel_w18_adv_p5_v1.jpg",
      solution_steps: [
        "Before (lights on): 18",
        "Lights turned off: 9",
        "After: 18 - 9 = ?"
      ],
      answer: ["9", "nine", "9 lights"],
      unit: "lights",
      hint_en: "Before minus change = after. 18 - 9 = ?",
      hint_vi: "Trước trừ thay đổi = sau. 18 - 9 = ?",
      explanation_en: "18 - 9 = 9. There are still 9 lights on in the studio.",
      math_vocab: ["before", "after", "turned off", "still on"],
      audio_url: "/audio/week18/math_p5.mp3"
    }
  ]
};
