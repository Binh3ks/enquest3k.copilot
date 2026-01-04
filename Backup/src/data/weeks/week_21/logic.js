export default {
  puzzles: [
    {
      id: 1,
      type: "math",
      title_en: "Expedition Time",
      title_vi: "Thời gian thám hiểm",
      question_en: "The archaeologists started digging in 1920. They finished their work in 1925. How many years did the expedition last?",
      question_vi: "Các nhà khảo cổ bắt đầu đào vào năm 1920. Họ xong việc năm 1925. Cuộc thám hiểm kéo dài bao lâu?",
      answer: ["5 years"],
      target_number: 5,
      unit: "years",
      hint_en: "1925 minus 1920.",
      hint_vi: "1925 trừ 1920."
    },
    {
      id: 2,
      type: "logic",
      title_en: "Timeline Order",
      title_vi: "Thứ tự Dòng thời gian",
      question_en: "Put these historical events in order: 1. The King was born. 2. The City was destroyed. 3. The King built the City.",
      question_vi: "Sắp xếp sự kiện: 1. Vua sinh ra. 2. Thành phố bị hủy. 3. Vua xây thành phố.",
      answer: ["1, 3, 2"],
      target_number: 0,
      unit: "",
      hint_en: "Born -> Build -> Destroy.",
      hint_vi: "Sinh -> Xây -> Hủy."
    },
    {
      id: 3,
      type: "mc",
      title_en: "Artifact Sort",
      title_vi: "Phân loại Cổ vật",
      question_en: "You found three items in the ruins: A clay pot, a golden mask, and a plastic bottle. Which one does NOT belong to the ancient city?",
      question_vi: "Bạn tìm thấy: Bình gốm, Mặt nạ vàng, Chai nhựa. Cái nào KHÔNG thuộc về thành phố cổ?",
      answer: ["Plastic bottle"],
      options: ["Clay pot", "Golden mask", "Plastic bottle"],
      target_number: 0,
      unit: "",
      hint_en: "Plastic is modern.",
      hint_vi: "Nhựa là đồ hiện đại."
    },
    {
      id: 4,
      type: "math",
      title_en: "Treasure Count",
      title_vi: "Đếm Kho báu",
      question_en: "In the tomb, there are 4 chests. Each chest has 10 gold coins inside. How many coins are there in total?",
      question_vi: "Trong mộ có 4 rương. Mỗi rương có 10 đồng vàng. Tổng cộng có bao nhiêu đồng?",
      answer: ["40 coins"],
      target_number: 40,
      unit: "coins",
      hint_en: "4 times 10.",
      hint_vi: "4 nhân 10."
    },
    {
      id: 5,
      type: "logic",
      title_en: "Cause and Effect",
      title_vi: "Nguyên nhân Kết quả",
      question_en: "The river dried up. What happened to the farmers in the ancient city?",
      question_vi: "Sông bị khô cạn. Chuyện gì xảy ra với nông dân thành phố cổ?",
      answer: ["They had no food"],
      options: ["They had no food", "They were happy", "They went swimming"],
      target_number: 0,
      unit: "",
      hint_en: "No water = No plants.",
      hint_vi: "Không nước = Không cây."
    }
  ]
};
