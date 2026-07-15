#!/usr/bin/env python3
"""Write W22 and W23 singapore_math.js files — Multiplication ×2,×5,×10 domain"""
from pathlib import Path

# ──────────────────────────────────────────────
# W22 ADV — "The Time Detective"
# Domain: P2 Multiplication ×2,×5,×10 | 5 types
# ──────────────────────────────────────────────
w22_adv = """\
export default {
  title: "Singapore Math: The Time Detective",
  image_url: "/images/week22/math_cover_w22.jpg",
  audio_url: "/audio/week22/math_main.mp3",
  intro_en: "Use the bar model to solve these time-detective word problems.",
  intro_vi: "Dùng mô hình thanh để giải các bài toán thám tử thời gian.",
  problems: [
    {
      id: 1,
      type: "part_whole",
      cpa_stage: "pictorial",
      question_en: "Yesterday the detective found 47 clues in the morning and 36 clues in the afternoon. How many clues did he find altogether?",
      question_vi: "Hôm qua thám tử tìm được 47 manh mối vào buổi sáng và 36 manh mối vào buổi chiều. Tổng cộng cậu tìm được bao nhiêu manh mối?",
      bar_model: "/images/week22/barmodel_w22_adv_p1_v1.jpg",
      solution_steps: ["Morning clues: 47", "Afternoon clues: 36", "Total: 47 + 36 = ?"],
      answer: ["83", "eighty-three", "83 clues"],
      unit: "clues",
      hint_en: "Add both parts: 47 + 36. Remember to regroup.",
      hint_vi: "Cộng hai phần: 47 + 36. Nhớ nhớ số sang hàng chục.",
      explanation_en: "47 + 36 = 83. The detective found 83 clues altogether.",
      math_vocab: ["altogether", "total", "add", "clues"],
      audio_url: "/audio/week22/math_p1.mp3"
    },
    {
      id: 2,
      type: "comparison",
      cpa_stage: "pictorial",
      question_en: "The detective solved 82 cases this year and 65 cases last year. How many more cases did he solve this year?",
      question_vi: "Thám tử giải được 82 vụ án năm nay và 65 vụ năm ngoái. Năm nay cậu giải được nhiều hơn bao nhiêu vụ?",
      bar_model: "/images/week22/barmodel_w22_adv_p2_v1.jpg",
      solution_steps: ["Cases this year: 82", "Cases last year: 65", "Difference: 82 - 65 = ?"],
      answer: ["17", "seventeen", "17 cases"],
      unit: "cases",
      hint_en: "Subtract the smaller from the larger: 82 - 65.",
      hint_vi: "Trừ số nhỏ hơn khỏi số lớn hơn: 82 - 65.",
      explanation_en: "82 - 65 = 17. He solved 17 more cases this year.",
      math_vocab: ["more than", "difference", "compare", "cases"],
      audio_url: "/audio/week22/math_p2.mp3"
    },
    {
      id: 3,
      type: "groups",
      cpa_stage: "pictorial",
      question_en: "There are 9 evidence folders. Each folder holds 10 photos. How many photos are there altogether?",
      question_vi: "Có 9 hồ sơ bằng chứng. Mỗi hồ sơ chứa 10 tấm ảnh. Tổng cộng có bao nhiêu tấm ảnh?",
      bar_model: "/images/week22/barmodel_w22_adv_p3_v1.jpg",
      solution_steps: ["Folders: 9", "Photos per folder: 10", "Total: 10 + 10 + 10 + 10 + 10 + 10 + 10 + 10 + 10 = ?"],
      answer: ["90", "ninety", "90 photos"],
      unit: "photos",
      hint_en: "Count 9 equal groups of 10 photos.",
      hint_vi: "Đếm 9 nhóm bằng nhau, mỗi nhóm 10 tấm ảnh.",
      explanation_en: "10 x 9 = 90. There are 90 photos altogether.",
      math_vocab: ["equal groups", "each folder", "total", "photos"],
      audio_url: "/audio/week22/math_p3.mp3"
    },
    {
      id: 4,
      type: "missing_part",
      cpa_stage: "pictorial",
      question_en: "The detective needs 70 clue cards to close the case. He already has 43 cards. How many more cards does he need?",
      question_vi: "Thám tử cần 70 thẻ manh mối để kết thúc vụ án. Cậu đã có 43 thẻ. Cần thêm bao nhiêu thẻ nữa?",
      bar_model: "/images/week22/barmodel_w22_adv_p4_v1.jpg",
      solution_steps: ["Cards needed: 70", "Cards he has: 43", "Still needed: 70 - 43 = ?"],
      answer: ["27", "twenty-seven", "27 cards"],
      unit: "cards",
      hint_en: "Total minus what he has = still needed. 70 - 43 = ?",
      hint_vi: "Tổng trừ đã có = còn thiếu. 70 - 43 = ?",
      explanation_en: "70 - 43 = 27. The detective needs 27 more cards.",
      math_vocab: ["missing part", "still needed", "subtract", "cards"],
      audio_url: "/audio/week22/math_p4.mp3"
    },
    {
      id: 5,
      type: "before_after",
      cpa_stage: "pictorial",
      question_en: "The detective had 61 files before the weekend. He solved 28 more files over the weekend. How many files does he have now?",
      question_vi: "Trước cuối tuần thám tử có 61 hồ sơ. Cậu giải quyết thêm 28 hồ sơ trong cuối tuần. Bây giờ cậu có bao nhiêu hồ sơ?",
      bar_model: "/images/week22/barmodel_w22_adv_p5_v1.jpg",
      solution_steps: ["Files before: 61", "Files solved over weekend: 28", "Files now: 61 + 28 = ?"],
      answer: ["89", "eighty-nine", "89 files"],
      unit: "files",
      hint_en: "Before plus added = after. 61 + 28 = ?",
      hint_vi: "Trước cộng thêm = sau. 61 + 28 = ?",
      explanation_en: "61 + 28 = 89. The detective now has 89 files.",
      math_vocab: ["before", "after", "added", "files"],
      audio_url: "/audio/week22/math_p5.mp3"
    }
  ]
};
"""

# ──────────────────────────────────────────────
# W22 EASY — "The Time Detective"
# Domain: P2 Multiplication ×2,×5 | 5 types | numbers ≤50
# ──────────────────────────────────────────────
w22_easy = """\
export default {
  title: "Math: The Time Detective",
  image_url: "/images/week22/math_cover_w22.jpg",
  audio_url: "/audio/week22_easy/math_main.mp3",
  intro_en: "Use the bar model to help you solve each problem.",
  intro_vi: "Dùng mô hình thanh để giúp bạn giải mỗi bài toán.",
  problems: [
    {
      id: 1,
      type: "part_whole",
      cpa_stage: "pictorial",
      question_en: "Yesterday Linh found 34 clues in the morning and 25 more in the afternoon. How many clues did she find in total?",
      question_vi: "Hôm qua Linh tìm được 34 manh mối vào buổi sáng và thêm 25 manh mối vào buổi chiều. Tổng cộng cô bé tìm được bao nhiêu manh mối?",
      bar_model: "/images/week22/barmodel_w22_easy_p1_v1.jpg",
      solution_steps: ["Morning clues: 34", "Afternoon clues: 25", "Total: 34 + 25 = ?"],
      answer: ["59", "fifty-nine", "59 clues"],
      unit: "clues",
      hint_en: "Add 34 and 25 together.",
      hint_vi: "Cộng 34 và 25 lại.",
      explanation_en: "34 + 25 = 59. Linh found 59 clues in total.",
      math_vocab: ["total", "altogether", "add"],
      audio_url: "/audio/week22_easy/math_p1.mp3"
    },
    {
      id: 2,
      type: "comparison",
      cpa_stage: "pictorial",
      question_en: "Tom collected 48 stamps last week and 31 stamps this week. How many more stamps did he collect last week?",
      question_vi: "Tom sưu tầm được 48 con tem tuần trước và 31 con tem tuần này. Tuần trước cậu sưu tầm được nhiều hơn bao nhiêu con tem?",
      bar_model: "/images/week22/barmodel_w22_easy_p2_v1.jpg",
      solution_steps: ["Stamps last week: 48", "Stamps this week: 31", "Difference: 48 - 31 = ?"],
      answer: ["17", "seventeen", "17 stamps"],
      unit: "stamps",
      hint_en: "Subtract the smaller from the bigger: 48 - 31.",
      hint_vi: "Trừ số nhỏ hơn khỏi số lớn hơn: 48 - 31.",
      explanation_en: "48 - 31 = 17. Tom collected 17 more stamps last week.",
      math_vocab: ["more than", "difference", "compare"],
      audio_url: "/audio/week22_easy/math_p2.mp3"
    },
    {
      id: 3,
      type: "groups",
      cpa_stage: "pictorial",
      question_en: "There are 6 clue folders. Each folder has 5 clue cards. How many clue cards are there altogether?",
      question_vi: "Có 6 hồ sơ manh mối. Mỗi hồ sơ có 5 thẻ manh mối. Tổng cộng có bao nhiêu thẻ manh mối?",
      bar_model: "/images/week22/barmodel_w22_easy_p3_v1.jpg",
      solution_steps: ["Folders: 6", "Cards per folder: 5", "Total: 5 + 5 + 5 + 5 + 5 + 5 = ?"],
      answer: ["30", "thirty", "30 clue cards"],
      unit: "clue cards",
      hint_en: "Count 6 equal groups of 5 cards.",
      hint_vi: "Đếm 6 nhóm bằng nhau, mỗi nhóm 5 thẻ.",
      explanation_en: "5 x 6 = 30. There are 30 clue cards altogether.",
      math_vocab: ["groups", "each", "altogether"],
      audio_url: "/audio/week22_easy/math_p3.mp3"
    },
    {
      id: 4,
      type: "missing_part",
      cpa_stage: "pictorial",
      question_en: "The detective board needs 50 photos. There are already 28 photos on it. How many more photos are needed?",
      question_vi: "Bảng thám tử cần 50 tấm ảnh. Đã có 28 tấm ảnh trên đó. Cần thêm bao nhiêu tấm ảnh nữa?",
      bar_model: "/images/week22/barmodel_w22_easy_p4_v1.jpg",
      solution_steps: ["Photos needed: 50", "Photos there: 28", "Still needed: 50 - 28 = ?"],
      answer: ["22", "twenty-two", "22 photos"],
      unit: "photos",
      hint_en: "Total minus what is there = still needed. 50 - 28 = ?",
      hint_vi: "Tổng trừ đã có = còn thiếu. 50 - 28 = ?",
      explanation_en: "50 - 28 = 22. They need 22 more photos.",
      math_vocab: ["missing part", "still needed", "subtract"],
      audio_url: "/audio/week22_easy/math_p4.mp3"
    },
    {
      id: 5,
      type: "before_after",
      cpa_stage: "pictorial",
      question_en: "Mia had 42 stickers in her detective kit before school. She used 17 stickers to label the clues. How many stickers does she have left?",
      question_vi: "Mia có 42 nhãn dán trong bộ thám tử trước khi đến trường. Cô bé dùng 17 nhãn để dán nhãn manh mối. Còn lại bao nhiêu nhãn dán?",
      bar_model: "/images/week22/barmodel_w22_easy_p5_v1.jpg",
      solution_steps: ["Before: 42 stickers", "Used: 17", "After: 42 - 17 = ?"],
      answer: ["25", "twenty-five", "25 stickers"],
      unit: "stickers",
      hint_en: "Before minus used = left. 42 - 17 = ?",
      hint_vi: "Trước trừ đã dùng = còn lại. 42 - 17 = ?",
      explanation_en: "42 - 17 = 25. Mia has 25 stickers left.",
      math_vocab: ["before", "after", "used", "left"],
      audio_url: "/audio/week22_easy/math_p5.mp3"
    }
  ]
};
"""

# ──────────────────────────────────────────────
# W23 ADV — "The Art Class"
# Domain: P2 Multiplication ×2,×5,×10 | 5 types
# ──────────────────────────────────────────────
w23_adv = """\
export default {
  title: "Singapore Math: The Art Class",
  image_url: "/images/week23/math_cover_w23.jpg",
  audio_url: "/audio/week23/math_main.mp3",
  intro_en: "Use the bar model to solve these art class word problems.",
  intro_vi: "Dùng mô hình thanh để giải các bài toán lớp học mỹ thuật.",
  problems: [
    {
      id: 1,
      type: "part_whole",
      cpa_stage: "pictorial",
      question_en: "Mia painted 54 red dots and 38 blue dots on her art canvas. How many dots did she paint altogether?",
      question_vi: "Mia vẽ 54 chấm đỏ và 38 chấm xanh lên khung vải. Tổng cộng cô bé vẽ bao nhiêu chấm?",
      bar_model: "/images/week23/barmodel_w23_adv_p1_v1.jpg",
      solution_steps: ["Red dots: 54", "Blue dots: 38", "Total: 54 + 38 = ?"],
      answer: ["92", "ninety-two", "92 dots"],
      unit: "dots",
      hint_en: "Add both parts: 54 + 38. Remember to regroup.",
      hint_vi: "Cộng hai phần: 54 + 38. Nhớ nhớ số sang hàng chục.",
      explanation_en: "54 + 38 = 92. Mia painted 92 dots altogether.",
      math_vocab: ["altogether", "total", "add", "dots"],
      audio_url: "/audio/week23/math_p1.mp3"
    },
    {
      id: 2,
      type: "comparison",
      cpa_stage: "pictorial",
      question_en: "The art room has 73 coloured pencils and 46 crayons. How many more pencils than crayons are there?",
      question_vi: "Phòng mỹ thuật có 73 bút chì màu và 46 bút sáp. Có nhiều hơn bao nhiêu bút chì so với bút sáp?",
      bar_model: "/images/week23/barmodel_w23_adv_p2_v1.jpg",
      solution_steps: ["Coloured pencils: 73", "Crayons: 46", "Difference: 73 - 46 = ?"],
      answer: ["27", "twenty-seven", "27 pencils"],
      unit: "pencils",
      hint_en: "Subtract the smaller from the larger: 73 - 46.",
      hint_vi: "Trừ số nhỏ hơn khỏi số lớn hơn: 73 - 46.",
      explanation_en: "73 - 46 = 27. There are 27 more pencils than crayons.",
      math_vocab: ["more than", "difference", "compare", "pencils"],
      audio_url: "/audio/week23/math_p2.mp3"
    },
    {
      id: 3,
      type: "groups",
      cpa_stage: "pictorial",
      question_en: "There are 8 paint trays in the art room. Each paint tray has 5 colour pots. How many colour pots are there altogether?",
      question_vi: "Phòng mỹ thuật có 8 khay màu. Mỗi khay có 5 lọ màu. Tổng cộng có bao nhiêu lọ màu?",
      bar_model: "/images/week23/barmodel_w23_adv_p3_v1.jpg",
      solution_steps: ["Paint trays: 8", "Colour pots per tray: 5", "Total: 5 + 5 + 5 + 5 + 5 + 5 + 5 + 5 = ?"],
      answer: ["40", "forty", "40 colour pots"],
      unit: "colour pots",
      hint_en: "Count 8 equal groups of 5 colour pots.",
      hint_vi: "Đếm 8 nhóm bằng nhau, mỗi nhóm 5 lọ màu.",
      explanation_en: "5 x 8 = 40. There are 40 colour pots altogether.",
      math_vocab: ["equal groups", "each tray", "total", "colour pots"],
      audio_url: "/audio/week23/math_p3.mp3"
    },
    {
      id: 4,
      type: "missing_part",
      cpa_stage: "pictorial",
      question_en: "The class needs 90 sheets of art paper for the project. They have collected 67 sheets already. How many more sheets do they need?",
      question_vi: "Lớp cần 90 tờ giấy mỹ thuật cho dự án. Họ đã thu thập được 67 tờ. Cần thêm bao nhiêu tờ nữa?",
      bar_model: "/images/week23/barmodel_w23_adv_p4_v1.jpg",
      solution_steps: ["Sheets needed: 90", "Sheets collected: 67", "Still needed: 90 - 67 = ?"],
      answer: ["23", "twenty-three", "23 sheets"],
      unit: "sheets",
      hint_en: "Total minus collected = still needed. 90 - 67 = ?",
      hint_vi: "Tổng trừ đã có = còn thiếu. 90 - 67 = ?",
      explanation_en: "90 - 67 = 23. They need 23 more sheets.",
      math_vocab: ["missing part", "still needed", "subtract", "sheets"],
      audio_url: "/audio/week23/math_p4.mp3"
    },
    {
      id: 5,
      type: "before_after",
      cpa_stage: "pictorial",
      question_en: "The art teacher had 85 paint brushes before class started. After class, 47 brushes needed cleaning. How many brushes were still clean?",
      question_vi: "Giáo viên mỹ thuật có 85 cọ vẽ trước khi bắt đầu lớp học. Sau lớp, 47 cọ cần rửa. Còn bao nhiêu cọ vẫn còn sạch?",
      bar_model: "/images/week23/barmodel_w23_adv_p5_v1.jpg",
      solution_steps: ["Brushes before class: 85", "Brushes needing cleaning: 47", "Clean brushes: 85 - 47 = ?"],
      answer: ["38", "thirty-eight", "38 brushes"],
      unit: "brushes",
      hint_en: "Before minus used = still clean. 85 - 47 = ?",
      hint_vi: "Trước trừ đã dùng = còn sạch. 85 - 47 = ?",
      explanation_en: "85 - 47 = 38. There were 38 clean brushes left.",
      math_vocab: ["before", "after", "still clean", "brushes"],
      audio_url: "/audio/week23/math_p5.mp3"
    }
  ]
};
"""

# ──────────────────────────────────────────────
# W23 EASY — "The Art Class"
# Domain: P2 Multiplication ×2,×5 | 5 types | numbers ≤50
# ──────────────────────────────────────────────
w23_easy = """\
export default {
  title: "Math: The Art Class",
  image_url: "/images/week23/math_cover_w23.jpg",
  audio_url: "/audio/week23_easy/math_main.mp3",
  intro_en: "Use the bar model to help you solve each problem.",
  intro_vi: "Dùng mô hình thanh để giúp bạn giải mỗi bài toán.",
  problems: [
    {
      id: 1,
      type: "part_whole",
      cpa_stage: "pictorial",
      question_en: "Mia used 26 red beads and 14 blue beads for her art necklace project. How many beads did she use in total?",
      question_vi: "Mia dùng 26 hạt đỏ và 14 hạt xanh cho dự án vòng cổ mỹ thuật. Tổng cộng cô bé dùng bao nhiêu hạt?",
      bar_model: "/images/week23/barmodel_w23_easy_p1_v1.jpg",
      solution_steps: ["Red beads: 26", "Blue beads: 14", "Total: 26 + 14 = ?"],
      answer: ["40", "forty", "40 beads"],
      unit: "beads",
      hint_en: "Add 26 and 14 together.",
      hint_vi: "Cộng 26 và 14 lại.",
      explanation_en: "26 + 14 = 40. Mia used 40 beads in total.",
      math_vocab: ["total", "altogether", "add"],
      audio_url: "/audio/week23_easy/math_p1.mp3"
    },
    {
      id: 2,
      type: "comparison",
      cpa_stage: "pictorial",
      question_en: "There are 35 paint brushes and 22 pencils in the art box. How many more paint brushes than pencils are there?",
      question_vi: "Có 35 cọ vẽ và 22 bút chì trong hộp mỹ thuật. Có nhiều hơn bao nhiêu cọ vẽ so với bút chì?",
      bar_model: "/images/week23/barmodel_w23_easy_p2_v1.jpg",
      solution_steps: ["Paint brushes: 35", "Pencils: 22", "Difference: 35 - 22 = ?"],
      answer: ["13", "thirteen", "13 brushes"],
      unit: "brushes",
      hint_en: "Subtract the smaller from the bigger: 35 - 22.",
      hint_vi: "Trừ số nhỏ hơn khỏi số lớn hơn: 35 - 22.",
      explanation_en: "35 - 22 = 13. There are 13 more brushes than pencils.",
      math_vocab: ["more than", "difference", "compare"],
      audio_url: "/audio/week23_easy/math_p2.mp3"
    },
    {
      id: 3,
      type: "groups",
      cpa_stage: "pictorial",
      question_en: "There are 9 students in the art class. Each student gets 2 paint brushes. How many paint brushes are given out altogether?",
      question_vi: "Có 9 học sinh trong lớp mỹ thuật. Mỗi học sinh nhận 2 cọ vẽ. Tổng cộng phát ra bao nhiêu cọ vẽ?",
      bar_model: "/images/week23/barmodel_w23_easy_p3_v1.jpg",
      solution_steps: ["Students: 9", "Brushes per student: 2", "Total: 2 + 2 + 2 + 2 + 2 + 2 + 2 + 2 + 2 = ?"],
      answer: ["18", "eighteen", "18 brushes"],
      unit: "brushes",
      hint_en: "Count 9 equal groups of 2 brushes.",
      hint_vi: "Đếm 9 nhóm bằng nhau, mỗi nhóm 2 cọ.",
      explanation_en: "2 x 9 = 18. There are 18 brushes given out altogether.",
      math_vocab: ["groups", "each", "altogether"],
      audio_url: "/audio/week23_easy/math_p3.mp3"
    },
    {
      id: 4,
      type: "missing_part",
      cpa_stage: "pictorial",
      question_en: "The art class needs 40 sheets of paper for a project. They already have 27 sheets. How many more sheets do they need?",
      question_vi: "Lớp mỹ thuật cần 40 tờ giấy cho dự án. Họ đã có 27 tờ. Cần thêm bao nhiêu tờ nữa?",
      bar_model: "/images/week23/barmodel_w23_easy_p4_v1.jpg",
      solution_steps: ["Sheets needed: 40", "Sheets they have: 27", "Still needed: 40 - 27 = ?"],
      answer: ["13", "thirteen", "13 sheets"],
      unit: "sheets",
      hint_en: "Total minus have = still needed. 40 - 27 = ?",
      hint_vi: "Tổng trừ đã có = còn thiếu. 40 - 27 = ?",
      explanation_en: "40 - 27 = 13. They need 13 more sheets.",
      math_vocab: ["missing part", "still needed", "subtract"],
      audio_url: "/audio/week23_easy/math_p4.mp3"
    },
    {
      id: 5,
      type: "before_after",
      cpa_stage: "pictorial",
      question_en: "The art shelf had 38 glue sticks before class. After class, 15 glue sticks were empty. How many glue sticks were still full?",
      question_vi: "Kệ mỹ thuật có 38 thanh keo trước giờ học. Sau giờ học, 15 thanh keo đã hết. Còn bao nhiêu thanh keo vẫn còn đầy?",
      bar_model: "/images/week23/barmodel_w23_easy_p5_v1.jpg",
      solution_steps: ["Before: 38 glue sticks", "Empty after class: 15", "Still full: 38 - 15 = ?"],
      answer: ["23", "twenty-three", "23 glue sticks"],
      unit: "glue sticks",
      hint_en: "Before minus empty = still full. 38 - 15 = ?",
      hint_vi: "Trước trừ đã hết = còn đầy. 38 - 15 = ?",
      explanation_en: "38 - 15 = 23. There are 23 glue sticks still full.",
      math_vocab: ["before", "after", "still full", "empty"],
      audio_url: "/audio/week23_easy/math_p5.mp3"
    }
  ]
};
"""

files = {
    "src/data/weeks/week_22/singapore_math.js": w22_adv,
    "src/data/weeks_easy/week_22/singapore_math.js": w22_easy,
    "src/data/weeks/week_23/singapore_math.js": w23_adv,
    "src/data/weeks_easy/week_23/singapore_math.js": w23_easy,
}

base = Path(__file__).parent.parent
for rel, content in files.items():
    p = base / rel
    p.write_text(content, encoding="utf-8")
    print(f"Written: {rel}")

print("Done: W22 ADV, W22 EASY, W23 ADV, W23 EASY")
