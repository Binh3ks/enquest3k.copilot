export default {
  title: "Singapore Math: When I Was Small",
  image_url: "/images/week19/math_cover_w19.jpg",
  audio_url: "/audio/week19/math_main.mp3",
  intro_en: "Use the bar model to solve these childhood word problems.",
  intro_vi: "Dùng mô hình thanh để giải các bài toán về tuổi thơ.",
  problems: [
    {
      id: 1,
      type: "part_whole",
      cpa_stage: "pictorial",
      question_en: "Grandma has 47 baby photos and 36 childhood photos in her album. How many photos does she have altogether?",
      question_vi: "Bà có 47 ảnh em bé và 36 ảnh thời thơ ấu trong album. Bà có tổng cộng bao nhiêu ảnh?",
      bar_model: "/images/week19/barmodel_w19_adv_p1_v1.jpg",
      solution_steps: [
        "Baby photos: 47",
        "Childhood photos: 36",
        "Total: 47 + 36 = ?"
      ],
      answer: ["83", "eighty-three", "83 photos"],
      unit: "photos",
      hint_en: "Add the two groups: 47 + 36. Remember to regroup the ones.",
      hint_vi: "Cộng hai nhóm: 47 + 36. Nhớ nhớ số sang hàng chục.",
      explanation_en: "47 + 36 = 83. Grandma has 83 photos altogether.",
      math_vocab: ["altogether", "total", "add", "regroup"],
      audio_url: "/audio/week19/math_p1.mp3"
    },
    {
      id: 2,
      type: "comparison",
      cpa_stage: "pictorial",
      question_en: "Tom was 94 cm tall in Grade 1. He was 67 cm tall as a baby. How many centimetres taller is he now than when he was a baby?",
      question_vi: "Tom cao 94 cm khi học lớp 1. Khi còn là em bé, cậu ấy cao 67 cm. Cậu ấy cao hơn hồi bé bao nhiêu cm?",
      bar_model: "/images/week19/barmodel_w19_adv_p2_v1.jpg",
      solution_steps: [
        "Grade 1 height: 94 cm",
        "Baby height: 67 cm",
        "Difference: 94 - 67 = ?"
      ],
      answer: ["27", "twenty-seven", "27 cm"],
      unit: "cm",
      hint_en: "Subtract the smaller height from the larger: 94 - 67.",
      hint_vi: "Trừ chiều cao nhỏ hơn khỏi chiều cao lớn hơn: 94 - 67.",
      explanation_en: "94 - 67 = 27. Tom is 27 cm taller now than as a baby.",
      math_vocab: ["taller", "difference", "compare", "subtract"],
      audio_url: "/audio/week19/math_p2.mp3"
    },
    {
      id: 3,
      type: "missing_part",
      cpa_stage: "pictorial",
      question_en: "A childhood memory box can hold 80 items. There are already 53 items inside. How many more items can fit in the box?",
      question_vi: "Hộp kỷ niệm tuổi thơ chứa được 80 món đồ. Bên trong đã có 53 món. Bao nhiêu món nữa có thể vào vừa hộp?",
      bar_model: "/images/week19/barmodel_w19_adv_p3_v1.jpg",
      solution_steps: [
        "Box capacity: 80 items",
        "Items already inside: 53",
        "Space remaining: 80 - 53 = ?"
      ],
      answer: ["27", "twenty-seven", "27 items"],
      unit: "items",
      hint_en: "Total space minus items inside = space left. 80 - 53 = ?",
      hint_vi: "Sức chứa trừ đồ đã có = chỗ còn lại. 80 - 53 = ?",
      explanation_en: "80 - 53 = 27. Twenty-seven more items can fit in the box.",
      math_vocab: ["missing part", "capacity", "remaining", "subtract"],
      audio_url: "/audio/week19/math_p3.mp3"
    },
    {
      id: 4,
      type: "groups",
      cpa_stage: "pictorial",
      question_en: "The family made 6 photo albums. Each album has 8 pages of memories. How many pages are there in total?",
      question_vi: "Gia đình làm 6 album ảnh. Mỗi album có 8 trang kỷ niệm. Tổng cộng có bao nhiêu trang?",
      bar_model: "/images/week19/barmodel_w19_adv_p4_v1.jpg",
      solution_steps: [
        "Number of albums: 6",
        "Pages per album: 8",
        "Total: 8 + 8 + 8 + 8 + 8 + 8 = ?"
      ],
      answer: ["48", "forty-eight", "48 pages"],
      unit: "pages",
      hint_en: "Count 6 equal groups of 8 pages.",
      hint_vi: "Đếm 6 nhóm bằng nhau, mỗi nhóm 8 trang.",
      explanation_en: "6 × 8 = 48. There are 48 pages of memories in total.",
      math_vocab: ["equal groups", "each", "total", "albums"],
      audio_url: "/audio/week19/math_p4.mp3"
    },
    {
      id: 5,
      type: "before_after",
      cpa_stage: "pictorial",
      question_en: "The toy shelf had 62 toys before Mum tidied it. After tidying, 35 toys were donated. How many toys are left on the shelf?",
      question_vi: "Kệ đồ chơi có 62 món trước khi mẹ dọn dẹp. Sau khi dọn, 35 món được cho đi. Còn bao nhiêu món trên kệ?",
      bar_model: "/images/week19/barmodel_w19_adv_p5_v1.jpg",
      solution_steps: [
        "Before (toys on shelf): 62",
        "Toys donated: 35",
        "After: 62 - 35 = ?"
      ],
      answer: ["27", "twenty-seven", "27 toys"],
      unit: "toys",
      hint_en: "Before minus donated = after. 62 - 35 = ?",
      hint_vi: "Trước trừ cho đi = sau. 62 - 35 = ?",
      explanation_en: "62 - 35 = 27. There are 27 toys left on the shelf.",
      math_vocab: ["before", "after", "donated", "left"],
      audio_url: "/audio/week19/math_p5.mp3"
    }
  ]
};
