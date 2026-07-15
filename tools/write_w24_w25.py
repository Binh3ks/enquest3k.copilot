#!/usr/bin/env python3
"""Write W24 and W25 singapore_math.js files.
W24: Multiplication ×2,×5,×10 domain (P2 final multiplication week)
W25: Division as equal sharing domain (P2 division, first week)
"""
from pathlib import Path

# ──────────────────────────────────────────────
# W24 ADV — "Feelings in the Past"
# Domain: P2 Multiplication ×2,×5,×10 | 5 types
# ADV numbers up to ~100
# ──────────────────────────────────────────────
w24_adv = """\
export default {
  title: "Singapore Math: Feelings in the Past",
  image_url: "/images/week24/math_cover_w24.jpg",
  audio_url: "/audio/week24/math_main.mp3",
  intro_en: "Use the bar model to solve these word problems about feelings.",
  intro_vi: "Dùng mô hình thanh để giải các bài toán về cảm xúc.",
  problems: [
    {
      id: 1,
      type: "part_whole",
      cpa_stage: "pictorial",
      question_en: "Mia felt happy for 47 minutes at the school festival and excited for 36 more minutes on the way home. How many minutes of positive feelings did she have altogether?",
      question_vi: "Mia cảm thấy vui trong 47 phút ở hội trường và hứng khởi thêm 36 phút trên đường về nhà. Tổng cộng cô bé có bao nhiêu phút cảm xúc tích cực?",
      bar_model: "/images/week24/barmodel_w24_adv_p1_v1.jpg",
      solution_steps: ["Happy minutes: 47", "Excited minutes: 36", "Total: 47 + 36 = ?"],
      answer: ["83", "eighty-three", "83 minutes"],
      unit: "minutes",
      hint_en: "Add both parts: 47 + 36. Remember to regroup.",
      hint_vi: "Cộng hai phần: 47 + 36. Nhớ nhớ số sang hàng chục.",
      explanation_en: "47 + 36 = 83. Mia had 83 minutes of positive feelings altogether.",
      math_vocab: ["altogether", "total", "add", "minutes"],
      audio_url: "/audio/week24/math_p1.mp3"
    },
    {
      id: 2,
      type: "comparison",
      cpa_stage: "pictorial",
      question_en: "Leo counted 74 times he felt cheerful last month and 58 times the month before. How many more cheerful moments did he have last month?",
      question_vi: "Leo đếm được 74 lần cảm thấy vui vẻ tháng trước và 58 lần tháng trước nữa. Tháng trước cậu có nhiều hơn bao nhiêu khoảnh khắc vui?",
      bar_model: "/images/week24/barmodel_w24_adv_p2_v1.jpg",
      solution_steps: ["Last month: 74", "Month before: 58", "Difference: 74 - 58 = ?"],
      answer: ["16", "sixteen", "16 times"],
      unit: "times",
      hint_en: "Subtract the smaller from the larger: 74 - 58.",
      hint_vi: "Trừ số nhỏ hơn khỏi số lớn hơn: 74 - 58.",
      explanation_en: "74 - 58 = 16. Leo had 16 more cheerful moments last month.",
      math_vocab: ["more than", "difference", "compare", "moments"],
      audio_url: "/audio/week24/math_p2.mp3"
    },
    {
      id: 3,
      type: "groups",
      cpa_stage: "pictorial",
      question_en: "The school made 7 emotion journals. Each journal has 10 blank pages for writing feelings. How many blank pages are there in total?",
      question_vi: "Trường làm 7 cuốn nhật ký cảm xúc. Mỗi cuốn có 10 trang trống để viết cảm nghĩ. Tổng cộng có bao nhiêu trang trống?",
      bar_model: "/images/week24/barmodel_w24_adv_p3_v1.jpg",
      solution_steps: ["Journals: 7", "Pages per journal: 10", "Total: 10 + 10 + 10 + 10 + 10 + 10 + 10 = ?"],
      answer: ["70", "seventy", "70 pages"],
      unit: "pages",
      hint_en: "Count 7 equal groups of 10 pages.",
      hint_vi: "Đếm 7 nhóm bằng nhau, mỗi nhóm 10 trang.",
      explanation_en: "10 x 7 = 70. There are 70 blank pages in total.",
      math_vocab: ["equal groups", "each journal", "total", "pages"],
      audio_url: "/audio/week24/math_p3.mp3"
    },
    {
      id: 4,
      type: "missing_part",
      cpa_stage: "pictorial",
      question_en: "In the class survey, 80 feelings were recorded. 53 of them were positive feelings. How many were not positive feelings?",
      question_vi: "Trong khảo sát lớp, 80 cảm xúc được ghi lại. 53 trong số đó là cảm xúc tích cực. Bao nhiêu cảm xúc không phải tích cực?",
      bar_model: "/images/week24/barmodel_w24_adv_p4_v1.jpg",
      solution_steps: ["Total feelings: 80", "Positive feelings: 53", "Not positive: 80 - 53 = ?"],
      answer: ["27", "twenty-seven", "27 feelings"],
      unit: "feelings",
      hint_en: "Total minus positive = not positive. 80 - 53 = ?",
      hint_vi: "Tổng trừ tích cực = không tích cực. 80 - 53 = ?",
      explanation_en: "80 - 53 = 27. There were 27 feelings that were not positive.",
      math_vocab: ["missing part", "not positive", "subtract", "feelings"],
      audio_url: "/audio/week24/math_p4.mp3"
    },
    {
      id: 5,
      type: "before_after",
      cpa_stage: "pictorial",
      question_en: "Mia had 65 worry points before she talked to her teacher. After the talk, she lost 38 worry points. How many worry points does she have now?",
      question_vi: "Mia có 65 điểm lo lắng trước khi nói chuyện với giáo viên. Sau buổi nói chuyện, cô bé bớt 38 điểm lo lắng. Bây giờ cô bé có bao nhiêu điểm lo lắng?",
      bar_model: "/images/week24/barmodel_w24_adv_p5_v1.jpg",
      solution_steps: ["Before talk: 65 worry points", "Lost after talk: 38", "After talk: 65 - 38 = ?"],
      answer: ["27", "twenty-seven", "27 worry points"],
      unit: "worry points",
      hint_en: "Before minus lost = after. 65 - 38 = ?",
      hint_vi: "Trước trừ bớt = sau. 65 - 38 = ?",
      explanation_en: "65 - 38 = 27. Mia now has 27 worry points.",
      math_vocab: ["before", "after", "lost", "worry points"],
      audio_url: "/audio/week24/math_p5.mp3"
    }
  ]
};
"""

# ──────────────────────────────────────────────
# W24 EASY — "Feelings in the Past"
# Domain: P2 Multiplication ×2,×5 | 5 types | numbers ≤50
# ──────────────────────────────────────────────
w24_easy = """\
export default {
  title: "Math: Feelings in the Past",
  image_url: "/images/week24/math_cover_w24.jpg",
  audio_url: "/audio/week24_easy/math_main.mp3",
  intro_en: "Use the bar model to help you solve each problem.",
  intro_vi: "Dùng mô hình thanh để giúp bạn giải mỗi bài toán.",
  problems: [
    {
      id: 1,
      type: "part_whole",
      cpa_stage: "pictorial",
      question_en: "Linh felt happy for 24 minutes in the morning and calm for 15 minutes in the afternoon. How many minutes of good feelings did she have in total?",
      question_vi: "Linh cảm thấy vui trong 24 phút vào buổi sáng và bình tĩnh 15 phút vào buổi chiều. Tổng cộng cô bé có bao nhiêu phút cảm xúc tốt?",
      bar_model: "/images/week24/barmodel_w24_easy_p1_v1.jpg",
      solution_steps: ["Happy minutes: 24", "Calm minutes: 15", "Total: 24 + 15 = ?"],
      answer: ["39", "thirty-nine", "39 minutes"],
      unit: "minutes",
      hint_en: "Add 24 and 15 together.",
      hint_vi: "Cộng 24 và 15 lại.",
      explanation_en: "24 + 15 = 39. Linh had 39 minutes of good feelings in total.",
      math_vocab: ["total", "altogether", "add"],
      audio_url: "/audio/week24_easy/math_p1.mp3"
    },
    {
      id: 2,
      type: "comparison",
      cpa_stage: "pictorial",
      question_en: "Tom felt cheerful 40 times last week and worried 27 times. How many more cheerful moments were there than worried moments?",
      question_vi: "Tom cảm thấy vui vẻ 40 lần tuần trước và lo lắng 27 lần. Có nhiều hơn bao nhiêu khoảnh khắc vui so với lo lắng?",
      bar_model: "/images/week24/barmodel_w24_easy_p2_v1.jpg",
      solution_steps: ["Cheerful moments: 40", "Worried moments: 27", "Difference: 40 - 27 = ?"],
      answer: ["13", "thirteen", "13 times"],
      unit: "times",
      hint_en: "Subtract the smaller from the bigger: 40 - 27.",
      hint_vi: "Trừ số nhỏ hơn khỏi số lớn hơn: 40 - 27.",
      explanation_en: "40 - 27 = 13. There were 13 more cheerful moments than worried moments.",
      math_vocab: ["more than", "difference", "compare"],
      audio_url: "/audio/week24_easy/math_p2.mp3"
    },
    {
      id: 3,
      type: "groups",
      cpa_stage: "pictorial",
      question_en: "There are 8 feeling cards in each pack. The teacher has 5 packs. How many feeling cards are there altogether?",
      question_vi: "Mỗi gói có 8 thẻ cảm xúc. Giáo viên có 5 gói. Tổng cộng có bao nhiêu thẻ cảm xúc?",
      bar_model: "/images/week24/barmodel_w24_easy_p3_v1.jpg",
      solution_steps: ["Packs: 5", "Cards per pack: 8", "Total: 8 + 8 + 8 + 8 + 8 = ?"],
      answer: ["40", "forty", "40 feeling cards"],
      unit: "feeling cards",
      hint_en: "Count 5 equal groups of 8 cards.",
      hint_vi: "Đếm 5 nhóm bằng nhau, mỗi nhóm 8 thẻ.",
      explanation_en: "8 x 5 = 40. There are 40 feeling cards altogether.",
      math_vocab: ["groups", "each", "altogether"],
      audio_url: "/audio/week24_easy/math_p3.mp3"
    },
    {
      id: 4,
      type: "missing_part",
      cpa_stage: "pictorial",
      question_en: "The feelings chart has 30 spaces. The class has filled in 18 spaces. How many spaces are still empty?",
      question_vi: "Bảng cảm xúc có 30 ô. Lớp đã điền vào 18 ô. Còn bao nhiêu ô trống?",
      bar_model: "/images/week24/barmodel_w24_easy_p4_v1.jpg",
      solution_steps: ["Total spaces: 30", "Spaces filled: 18", "Still empty: 30 - 18 = ?"],
      answer: ["12", "twelve", "12 spaces"],
      unit: "spaces",
      hint_en: "Total minus filled = still empty. 30 - 18 = ?",
      hint_vi: "Tổng trừ đã điền = còn trống. 30 - 18 = ?",
      explanation_en: "30 - 18 = 12. There are 12 spaces still empty.",
      math_vocab: ["missing part", "still empty", "subtract"],
      audio_url: "/audio/week24_easy/math_p4.mp3"
    },
    {
      id: 5,
      type: "before_after",
      cpa_stage: "pictorial",
      question_en: "Ana had 46 worry points before reading a funny book. After reading the book, she lost 19 worry points. How many worry points does she have now?",
      question_vi: "Ana có 46 điểm lo lắng trước khi đọc một cuốn sách vui. Sau khi đọc, cô bé bớt 19 điểm lo lắng. Bây giờ cô bé có bao nhiêu điểm lo lắng?",
      bar_model: "/images/week24/barmodel_w24_easy_p5_v1.jpg",
      solution_steps: ["Before reading: 46 worry points", "Lost after reading: 19", "After reading: 46 - 19 = ?"],
      answer: ["27", "twenty-seven", "27 worry points"],
      unit: "worry points",
      hint_en: "Before minus lost = after. 46 - 19 = ?",
      hint_vi: "Trước trừ bớt = sau. 46 - 19 = ?",
      explanation_en: "46 - 19 = 27. Ana now has 27 worry points.",
      math_vocab: ["before", "after", "lost", "worry points"],
      audio_url: "/audio/week24_easy/math_p5.mp3"
    }
  ]
};
"""

# ──────────────────────────────────────────────
# W25 ADV — "The Sequence Challenge"
# Domain: P2 Division as equal sharing | 5 types
# ADV numbers up to ~100; division results are whole numbers
# ──────────────────────────────────────────────
w25_adv = """\
export default {
  title: "Singapore Math: The Sequence Challenge",
  image_url: "/images/week25/math_cover_w25.jpg",
  audio_url: "/audio/week25/math_main.mp3",
  intro_en: "Use the bar model to solve these equal-sharing word problems.",
  intro_vi: "Dùng mô hình thanh để giải các bài toán chia đều.",
  problems: [
    {
      id: 1,
      type: "groups",
      cpa_stage: "pictorial",
      question_en: "There are 72 challenge cards. They are shared equally into 9 trays. How many cards are in each tray?",
      question_vi: "Có 72 thẻ thử thách. Chúng được chia đều vào 9 khay. Mỗi khay có bao nhiêu thẻ?",
      bar_model: "/images/week25/barmodel_w25_adv_p1_v1.jpg",
      solution_steps: ["Total cards: 72", "Number of trays: 9", "Cards per tray: 72 ÷ 9 = ?"],
      answer: ["8", "eight", "8 cards"],
      unit: "cards",
      hint_en: "Share 72 equally into 9 groups. How many in each group?",
      hint_vi: "Chia đều 72 vào 9 nhóm. Mỗi nhóm có bao nhiêu?",
      explanation_en: "72 ÷ 9 = 8. There are 8 cards in each tray.",
      math_vocab: ["share equally", "divide", "each tray", "groups"],
      audio_url: "/audio/week25/math_p1.mp3"
    },
    {
      id: 2,
      type: "comparison",
      cpa_stage: "pictorial",
      question_en: "The blue team solved 83 sequence steps and the red team solved 67 steps. How many more steps did the blue team solve?",
      question_vi: "Đội xanh giải 83 bước chuỗi còn đội đỏ giải 67 bước. Đội xanh giải được nhiều hơn bao nhiêu bước?",
      bar_model: "/images/week25/barmodel_w25_adv_p2_v1.jpg",
      solution_steps: ["Blue team: 83", "Red team: 67", "Difference: 83 - 67 = ?"],
      answer: ["16", "sixteen", "16 steps"],
      unit: "steps",
      hint_en: "Subtract the smaller from the larger: 83 - 67.",
      hint_vi: "Trừ số nhỏ hơn khỏi số lớn hơn: 83 - 67.",
      explanation_en: "83 - 67 = 16. The blue team solved 16 more steps.",
      math_vocab: ["more than", "difference", "compare", "steps"],
      audio_url: "/audio/week25/math_p2.mp3"
    },
    {
      id: 3,
      type: "missing_part",
      cpa_stage: "pictorial",
      question_en: "The challenge has 100 sequence steps in total. The class has completed 64 steps. How many steps are still left to solve?",
      question_vi: "Thử thách có tổng cộng 100 bước chuỗi. Lớp đã hoàn thành 64 bước. Còn bao nhiêu bước chưa giải?",
      bar_model: "/images/week25/barmodel_w25_adv_p3_v1.jpg",
      solution_steps: ["Total steps: 100", "Completed steps: 64", "Steps left: 100 - 64 = ?"],
      answer: ["36", "thirty-six", "36 steps"],
      unit: "steps",
      hint_en: "Total minus completed = steps left. 100 - 64 = ?",
      hint_vi: "Tổng trừ đã xong = còn lại. 100 - 64 = ?",
      explanation_en: "100 - 64 = 36. There are 36 steps still left to solve.",
      math_vocab: ["missing part", "steps left", "subtract", "total"],
      audio_url: "/audio/week25/math_p3.mp3"
    },
    {
      id: 4,
      type: "part_whole",
      cpa_stage: "pictorial",
      question_en: "In round one, the class solved 48 pattern steps. In round two, they solved 35 more pattern steps. How many steps did they solve altogether?",
      question_vi: "Ở vòng một, lớp giải được 48 bước mẫu. Ở vòng hai, họ giải thêm 35 bước nữa. Tổng cộng họ giải được bao nhiêu bước?",
      bar_model: "/images/week25/barmodel_w25_adv_p4_v1.jpg",
      solution_steps: ["Round one: 48", "Round two: 35", "Total: 48 + 35 = ?"],
      answer: ["83", "eighty-three", "83 steps"],
      unit: "steps",
      hint_en: "Add both rounds: 48 + 35. Remember to regroup.",
      hint_vi: "Cộng hai vòng: 48 + 35. Nhớ nhớ số sang hàng chục.",
      explanation_en: "48 + 35 = 83. They solved 83 steps altogether.",
      math_vocab: ["altogether", "total", "add", "rounds"],
      audio_url: "/audio/week25/math_p4.mp3"
    },
    {
      id: 5,
      type: "before_after",
      cpa_stage: "pictorial",
      question_en: "The class had 90 challenge points before the final round. They used 47 points to unlock a bonus level. How many points do they have left?",
      question_vi: "Trước vòng cuối lớp có 90 điểm thử thách. Họ dùng 47 điểm để mở cấp thưởng. Còn lại bao nhiêu điểm?",
      bar_model: "/images/week25/barmodel_w25_adv_p5_v1.jpg",
      solution_steps: ["Points before: 90", "Points used: 47", "Points left: 90 - 47 = ?"],
      answer: ["43", "forty-three", "43 points"],
      unit: "points",
      hint_en: "Before minus used = left. 90 - 47 = ?",
      hint_vi: "Trước trừ đã dùng = còn lại. 90 - 47 = ?",
      explanation_en: "90 - 47 = 43. The class has 43 challenge points left.",
      math_vocab: ["before", "after", "used", "points"],
      audio_url: "/audio/week25/math_p5.mp3"
    }
  ]
};
"""

# ──────────────────────────────────────────────
# W25 EASY — "The Sequence Challenge"
# Domain: P2 Division as equal sharing | 5 types | numbers ≤50
# ──────────────────────────────────────────────
w25_easy = """\
export default {
  title: "Math: The Sequence Challenge",
  image_url: "/images/week25/math_cover_w25.jpg",
  audio_url: "/audio/week25_easy/math_main.mp3",
  intro_en: "Use the bar model to help you solve each problem.",
  intro_vi: "Dùng mô hình thanh để giúp bạn giải mỗi bài toán.",
  problems: [
    {
      id: 1,
      type: "groups",
      cpa_stage: "pictorial",
      question_en: "There are 30 challenge cards shared equally into 5 boxes. How many cards are in each box?",
      question_vi: "Có 30 thẻ thử thách được chia đều vào 5 hộp. Mỗi hộp có bao nhiêu thẻ?",
      bar_model: "/images/week25/barmodel_w25_easy_p1_v1.jpg",
      solution_steps: ["Total cards: 30", "Number of boxes: 5", "Cards per box: 30 ÷ 5 = ?"],
      answer: ["6", "six", "6 cards"],
      unit: "cards",
      hint_en: "Share 30 equally into 5 groups. How many in each group?",
      hint_vi: "Chia đều 30 vào 5 nhóm. Mỗi nhóm có bao nhiêu?",
      explanation_en: "30 ÷ 5 = 6. There are 6 cards in each box.",
      math_vocab: ["share equally", "divide", "each box", "groups"],
      audio_url: "/audio/week25_easy/math_p1.mp3"
    },
    {
      id: 2,
      type: "comparison",
      cpa_stage: "pictorial",
      question_en: "The blue team has 35 sequence cards. The red team has 22 cards. How many more cards does the blue team have?",
      question_vi: "Đội xanh có 35 thẻ chuỗi. Đội đỏ có 22 thẻ. Đội xanh có nhiều hơn bao nhiêu thẻ?",
      bar_model: "/images/week25/barmodel_w25_easy_p2_v1.jpg",
      solution_steps: ["Blue team: 35", "Red team: 22", "Difference: 35 - 22 = ?"],
      answer: ["13", "thirteen", "13 cards"],
      unit: "cards",
      hint_en: "Subtract the smaller from the bigger: 35 - 22.",
      hint_vi: "Trừ số nhỏ hơn khỏi số lớn hơn: 35 - 22.",
      explanation_en: "35 - 22 = 13. The blue team has 13 more cards.",
      math_vocab: ["more than", "difference", "compare"],
      audio_url: "/audio/week25_easy/math_p2.mp3"
    },
    {
      id: 3,
      type: "missing_part",
      cpa_stage: "pictorial",
      question_en: "The class needs to solve 40 steps. They have solved 24 steps so far. How many steps are still left?",
      question_vi: "Lớp cần giải 40 bước. Họ đã giải được 24 bước. Còn bao nhiêu bước chưa giải?",
      bar_model: "/images/week25/barmodel_w25_easy_p3_v1.jpg",
      solution_steps: ["Steps needed: 40", "Steps solved: 24", "Steps left: 40 - 24 = ?"],
      answer: ["16", "sixteen", "16 steps"],
      unit: "steps",
      hint_en: "Total minus solved = left. 40 - 24 = ?",
      hint_vi: "Tổng trừ đã giải = còn lại. 40 - 24 = ?",
      explanation_en: "40 - 24 = 16. There are 16 steps still left.",
      math_vocab: ["missing part", "steps left", "subtract"],
      audio_url: "/audio/week25_easy/math_p3.mp3"
    },
    {
      id: 4,
      type: "part_whole",
      cpa_stage: "pictorial",
      question_en: "Sam solved 17 steps in the morning and 14 steps in the afternoon. How many steps did he solve in total?",
      question_vi: "Sam giải được 17 bước vào buổi sáng và 14 bước vào buổi chiều. Tổng cộng cậu giải được bao nhiêu bước?",
      bar_model: "/images/week25/barmodel_w25_easy_p4_v1.jpg",
      solution_steps: ["Morning steps: 17", "Afternoon steps: 14", "Total: 17 + 14 = ?"],
      answer: ["31", "thirty-one", "31 steps"],
      unit: "steps",
      hint_en: "Add 17 and 14 together.",
      hint_vi: "Cộng 17 và 14 lại.",
      explanation_en: "17 + 14 = 31. Sam solved 31 steps in total.",
      math_vocab: ["total", "altogether", "add"],
      audio_url: "/audio/week25_easy/math_p4.mp3"
    },
    {
      id: 5,
      type: "before_after",
      cpa_stage: "pictorial",
      question_en: "The class had 50 points before the last challenge. They used 28 points to unlock a new level. How many points do they have now?",
      question_vi: "Trước thử thách cuối lớp có 50 điểm. Họ dùng 28 điểm để mở cấp mới. Bây giờ họ có bao nhiêu điểm?",
      bar_model: "/images/week25/barmodel_w25_easy_p5_v1.jpg",
      solution_steps: ["Before: 50 points", "Used: 28 points", "Now: 50 - 28 = ?"],
      answer: ["22", "twenty-two", "22 points"],
      unit: "points",
      hint_en: "Before minus used = now. 50 - 28 = ?",
      hint_vi: "Trước trừ đã dùng = bây giờ. 50 - 28 = ?",
      explanation_en: "50 - 28 = 22. The class now has 22 points.",
      math_vocab: ["before", "after", "used", "points"],
      audio_url: "/audio/week25_easy/math_p5.mp3"
    }
  ]
};
"""

files = {
    "src/data/weeks/week_24/singapore_math.js": w24_adv,
    "src/data/weeks_easy/week_24/singapore_math.js": w24_easy,
    "src/data/weeks/week_25/singapore_math.js": w25_adv,
    "src/data/weeks_easy/week_25/singapore_math.js": w25_easy,
}

base = Path(__file__).parent.parent
for rel, content in files.items():
    p = base / rel
    p.write_text(content, encoding="utf-8")
    print(f"Written: {rel}")

print("Done: W24 ADV, W24 EASY, W25 ADV, W25 EASY")
