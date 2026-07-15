#!/usr/bin/env python3
"""Write W26 and W27 singapore_math.js files.
Both weeks: Division as equal sharing domain (P2 W25-W27)
5 types: groups(division) · comparison · missing_part · part_whole · before_after
"""
from pathlib import Path

# ──────────────────────────────────────────────
# W26 ADV — "My Weekend Comic Strip"
# Domain: P2 Division as equal sharing | 5 types
# ──────────────────────────────────────────────
w26_adv = """\
export default {
  title: "Singapore Math: My Weekend Comic Strip",
  image_url: "/images/week26/math_cover_w26.jpg",
  audio_url: "/audio/week26/math_main.mp3",
  intro_en: "Use the bar model to solve these comic strip word problems.",
  intro_vi: "Dùng mô hình thanh để giải các bài toán về truyện tranh.",
  problems: [
    {
      id: 1,
      type: "groups",
      cpa_stage: "pictorial",
      question_en: "Leo drew 56 panels for his comic book. He put the same number of panels on each of 8 pages. How many panels are on each page?",
      question_vi: "Leo vẽ 56 khung cho quyển truyện tranh của mình. Cậu đặt cùng số khung lên mỗi trang trong 8 trang. Mỗi trang có bao nhiêu khung?",
      bar_model: "/images/week26/barmodel_w26_adv_p1_v1.jpg",
      solution_steps: ["Total panels: 56", "Number of pages: 8", "Panels per page: 56 ÷ 8 = ?"],
      answer: ["7", "seven", "7 panels"],
      unit: "panels",
      hint_en: "Share 56 equally into 8 groups. How many in each group?",
      hint_vi: "Chia đều 56 vào 8 nhóm. Mỗi nhóm có bao nhiêu?",
      explanation_en: "56 ÷ 8 = 7. Each page has 7 panels.",
      math_vocab: ["share equally", "divide", "each page", "groups"],
      audio_url: "/audio/week26/math_p1.mp3"
    },
    {
      id: 2,
      type: "comparison",
      cpa_stage: "pictorial",
      question_en: "Leo spent 74 minutes drawing his weekend comic. Mia spent 58 minutes drawing hers. How many more minutes did Leo spend than Mia?",
      question_vi: "Leo dành 74 phút vẽ truyện tranh cuối tuần. Mia dành 58 phút vẽ của mình. Leo dành nhiều hơn bao nhiêu phút so với Mia?",
      bar_model: "/images/week26/barmodel_w26_adv_p2_v1.jpg",
      solution_steps: ["Leo's minutes: 74", "Mia's minutes: 58", "Difference: 74 - 58 = ?"],
      answer: ["16", "sixteen", "16 minutes"],
      unit: "minutes",
      hint_en: "Subtract the smaller from the larger: 74 - 58.",
      hint_vi: "Trừ số nhỏ hơn khỏi số lớn hơn: 74 - 58.",
      explanation_en: "74 - 58 = 16. Leo spent 16 more minutes than Mia.",
      math_vocab: ["more than", "difference", "compare", "minutes"],
      audio_url: "/audio/week26/math_p2.mp3"
    },
    {
      id: 3,
      type: "missing_part",
      cpa_stage: "pictorial",
      question_en: "The class comic book needs 90 panels in total. The students have drawn 63 panels so far. How many more panels do they need to draw?",
      question_vi: "Quyển truyện tranh của lớp cần tổng cộng 90 khung. Học sinh đã vẽ 63 khung. Cần vẽ thêm bao nhiêu khung nữa?",
      bar_model: "/images/week26/barmodel_w26_adv_p3_v1.jpg",
      solution_steps: ["Panels needed: 90", "Panels drawn: 63", "Still needed: 90 - 63 = ?"],
      answer: ["27", "twenty-seven", "27 panels"],
      unit: "panels",
      hint_en: "Total minus drawn = still needed. 90 - 63 = ?",
      hint_vi: "Tổng trừ đã vẽ = còn thiếu. 90 - 63 = ?",
      explanation_en: "90 - 63 = 27. They need to draw 27 more panels.",
      math_vocab: ["missing part", "still needed", "subtract", "panels"],
      audio_url: "/audio/week26/math_p3.mp3"
    },
    {
      id: 4,
      type: "part_whole",
      cpa_stage: "pictorial",
      question_en: "Leo drew 48 action panels and 37 dialogue panels for his comic book. How many panels did he draw altogether?",
      question_vi: "Leo vẽ 48 khung hành động và 37 khung hội thoại cho quyển truyện tranh. Tổng cộng cậu vẽ bao nhiêu khung?",
      bar_model: "/images/week26/barmodel_w26_adv_p4_v1.jpg",
      solution_steps: ["Action panels: 48", "Dialogue panels: 37", "Total: 48 + 37 = ?"],
      answer: ["85", "eighty-five", "85 panels"],
      unit: "panels",
      hint_en: "Add both parts: 48 + 37. Remember to regroup.",
      hint_vi: "Cộng hai phần: 48 + 37. Nhớ nhớ số sang hàng chục.",
      explanation_en: "48 + 37 = 85. Leo drew 85 panels altogether.",
      math_vocab: ["altogether", "total", "add", "panels"],
      audio_url: "/audio/week26/math_p4.mp3"
    },
    {
      id: 5,
      type: "before_after",
      cpa_stage: "pictorial",
      question_en: "The art cabinet had 82 coloured pencils before the comic strip lesson. After the lesson, 45 pencils needed sharpening. How many pencils were still sharp?",
      question_vi: "Tủ mỹ thuật có 82 bút chì màu trước buổi học vẽ truyện tranh. Sau buổi học, 45 bút chì cần gọt. Còn bao nhiêu bút chì vẫn còn nhọn?",
      bar_model: "/images/week26/barmodel_w26_adv_p5_v1.jpg",
      solution_steps: ["Pencils before lesson: 82", "Pencils needing sharpening: 45", "Still sharp: 82 - 45 = ?"],
      answer: ["37", "thirty-seven", "37 pencils"],
      unit: "pencils",
      hint_en: "Before minus needing sharpening = still sharp. 82 - 45 = ?",
      hint_vi: "Trước trừ cần gọt = còn nhọn. 82 - 45 = ?",
      explanation_en: "82 - 45 = 37. There were 37 pencils still sharp.",
      math_vocab: ["before", "after", "still sharp", "pencils"],
      audio_url: "/audio/week26/math_p5.mp3"
    }
  ]
};
"""

# ──────────────────────────────────────────────
# W26 EASY — "My Weekend Comic Strip"
# Domain: P2 Division | 5 types | numbers ≤50
# ──────────────────────────────────────────────
w26_easy = """\
export default {
  title: "Math: My Weekend Comic Strip",
  image_url: "/images/week26/math_cover_w26.jpg",
  audio_url: "/audio/week26_easy/math_main.mp3",
  intro_en: "Use the bar model to help you solve each problem.",
  intro_vi: "Dùng mô hình thanh để giúp bạn giải mỗi bài toán.",
  problems: [
    {
      id: 1,
      type: "groups",
      cpa_stage: "pictorial",
      question_en: "Linh drew 20 comic panels and placed them equally into 4 folders. How many panels are in each folder?",
      question_vi: "Linh vẽ 20 khung truyện tranh và để đều vào 4 thư mục. Mỗi thư mục có bao nhiêu khung?",
      bar_model: "/images/week26/barmodel_w26_easy_p1_v1.jpg",
      solution_steps: ["Total panels: 20", "Number of folders: 4", "Panels per folder: 20 ÷ 4 = ?"],
      answer: ["5", "five", "5 panels"],
      unit: "panels",
      hint_en: "Share 20 equally into 4 groups. How many in each group?",
      hint_vi: "Chia đều 20 vào 4 nhóm. Mỗi nhóm có bao nhiêu?",
      explanation_en: "20 ÷ 4 = 5. Each folder has 5 panels.",
      math_vocab: ["share equally", "divide", "each folder", "groups"],
      audio_url: "/audio/week26_easy/math_p1.mp3"
    },
    {
      id: 2,
      type: "comparison",
      cpa_stage: "pictorial",
      question_en: "Tom has 38 colour pencils and Mai has 25 colour pencils for their comic strips. How many more pencils does Tom have?",
      question_vi: "Tom có 38 bút chì màu và Mai có 25 bút chì để vẽ truyện tranh. Tom có nhiều hơn bao nhiêu bút chì?",
      bar_model: "/images/week26/barmodel_w26_easy_p2_v1.jpg",
      solution_steps: ["Tom's pencils: 38", "Mai's pencils: 25", "Difference: 38 - 25 = ?"],
      answer: ["13", "thirteen", "13 pencils"],
      unit: "pencils",
      hint_en: "Subtract the smaller from the bigger: 38 - 25.",
      hint_vi: "Trừ số nhỏ hơn khỏi số lớn hơn: 38 - 25.",
      explanation_en: "38 - 25 = 13. Tom has 13 more pencils.",
      math_vocab: ["more than", "difference", "compare"],
      audio_url: "/audio/week26_easy/math_p2.mp3"
    },
    {
      id: 3,
      type: "missing_part",
      cpa_stage: "pictorial",
      question_en: "The comic strip project needs 40 panels. The class has drawn 23 panels so far. How many more panels do they need?",
      question_vi: "Dự án truyện tranh cần 40 khung. Lớp đã vẽ 23 khung. Cần vẽ thêm bao nhiêu khung nữa?",
      bar_model: "/images/week26/barmodel_w26_easy_p3_v1.jpg",
      solution_steps: ["Panels needed: 40", "Panels drawn: 23", "Still needed: 40 - 23 = ?"],
      answer: ["17", "seventeen", "17 panels"],
      unit: "panels",
      hint_en: "Total minus drawn = still needed. 40 - 23 = ?",
      hint_vi: "Tổng trừ đã vẽ = còn thiếu. 40 - 23 = ?",
      explanation_en: "40 - 23 = 17. They need 17 more panels.",
      math_vocab: ["missing part", "still needed", "subtract"],
      audio_url: "/audio/week26_easy/math_p3.mp3"
    },
    {
      id: 4,
      type: "part_whole",
      cpa_stage: "pictorial",
      question_en: "Leo drew 18 panels on Saturday and 14 panels on Sunday for his comic strip. How many panels did he draw in total?",
      question_vi: "Leo vẽ 18 khung vào thứ Bảy và 14 khung vào Chủ Nhật cho truyện tranh. Tổng cộng cậu vẽ bao nhiêu khung?",
      bar_model: "/images/week26/barmodel_w26_easy_p4_v1.jpg",
      solution_steps: ["Saturday panels: 18", "Sunday panels: 14", "Total: 18 + 14 = ?"],
      answer: ["32", "thirty-two", "32 panels"],
      unit: "panels",
      hint_en: "Add 18 and 14 together.",
      hint_vi: "Cộng 18 và 14 lại.",
      explanation_en: "18 + 14 = 32. Leo drew 32 panels in total.",
      math_vocab: ["total", "altogether", "add"],
      audio_url: "/audio/week26_easy/math_p4.mp3"
    },
    {
      id: 5,
      type: "before_after",
      cpa_stage: "pictorial",
      question_en: "Mia had 45 blank pages before the art lesson. She used 19 pages to draw her comic strip. How many blank pages does she have left?",
      question_vi: "Mia có 45 trang trắng trước buổi học mỹ thuật. Cô bé dùng 19 trang để vẽ truyện tranh. Còn lại bao nhiêu trang trắng?",
      bar_model: "/images/week26/barmodel_w26_easy_p5_v1.jpg",
      solution_steps: ["Before lesson: 45 pages", "Pages used: 19", "Pages left: 45 - 19 = ?"],
      answer: ["26", "twenty-six", "26 pages"],
      unit: "pages",
      hint_en: "Before minus used = left. 45 - 19 = ?",
      hint_vi: "Trước trừ đã dùng = còn lại. 45 - 19 = ?",
      explanation_en: "45 - 19 = 26. Mia has 26 blank pages left.",
      math_vocab: ["before", "after", "used", "left"],
      audio_url: "/audio/week26_easy/math_p5.mp3"
    }
  ]
};
"""

# ──────────────────────────────────────────────
# W27 ADV — "Maya's Growing Plant"
# Domain: P2 Division as equal sharing | 5 types
# ──────────────────────────────────────────────
w27_adv = """\
export default {
  title: "Singapore Math: Maya's Growing Plant",
  image_url: "/images/week27/math_cover_w27.jpg",
  audio_url: "/audio/week27/math_main.mp3",
  intro_en: "Use the bar model to solve these growing plant word problems.",
  intro_vi: "Dùng mô hình thanh để giải các bài toán về cây trồng.",
  problems: [
    {
      id: 1,
      type: "groups",
      cpa_stage: "pictorial",
      question_en: "Maya has 63 flower seeds. She wants to plant the same number of seeds in each of 9 pots. How many seeds will go in each pot?",
      question_vi: "Maya có 63 hạt hoa. Cô bé muốn trồng cùng số hạt vào mỗi chậu trong 9 chậu. Mỗi chậu sẽ có bao nhiêu hạt?",
      bar_model: "/images/week27/barmodel_w27_adv_p1_v1.jpg",
      solution_steps: ["Total seeds: 63", "Number of pots: 9", "Seeds per pot: 63 ÷ 9 = ?"],
      answer: ["7", "seven", "7 seeds"],
      unit: "seeds",
      hint_en: "Share 63 equally into 9 groups. How many in each group?",
      hint_vi: "Chia đều 63 vào 9 nhóm. Mỗi nhóm có bao nhiêu?",
      explanation_en: "63 ÷ 9 = 7. Each pot gets 7 seeds.",
      math_vocab: ["share equally", "divide", "each pot", "groups"],
      audio_url: "/audio/week27/math_p1.mp3"
    },
    {
      id: 2,
      type: "comparison",
      cpa_stage: "pictorial",
      question_en: "Maya's sunflower grew 83 cm by the end of summer. Her bean plant grew 67 cm. How much taller was her sunflower than her bean plant?",
      question_vi: "Hoa hướng dương của Maya cao 83 cm vào cuối hè. Cây đậu của cô bé cao 67 cm. Hoa hướng dương cao hơn cây đậu bao nhiêu cm?",
      bar_model: "/images/week27/barmodel_w27_adv_p2_v1.jpg",
      solution_steps: ["Sunflower height: 83 cm", "Bean plant height: 67 cm", "Difference: 83 - 67 = ?"],
      answer: ["16", "sixteen", "16 cm"],
      unit: "cm",
      hint_en: "Subtract the smaller from the larger: 83 - 67.",
      hint_vi: "Trừ số nhỏ hơn khỏi số lớn hơn: 83 - 67.",
      explanation_en: "83 - 67 = 16. The sunflower was 16 cm taller.",
      math_vocab: ["taller", "difference", "compare", "cm"],
      audio_url: "/audio/week27/math_p2.mp3"
    },
    {
      id: 3,
      type: "missing_part",
      cpa_stage: "pictorial",
      question_en: "The school garden has 70 plant pots. 43 pots already have seedlings. How many pots are still empty?",
      question_vi: "Vườn trường có 70 chậu cây. 43 chậu đã có cây con. Còn bao nhiêu chậu trống?",
      bar_model: "/images/week27/barmodel_w27_adv_p3_v1.jpg",
      solution_steps: ["Total pots: 70", "Pots with seedlings: 43", "Empty pots: 70 - 43 = ?"],
      answer: ["27", "twenty-seven", "27 pots"],
      unit: "pots",
      hint_en: "Total minus with seedlings = empty. 70 - 43 = ?",
      hint_vi: "Tổng trừ có cây = trống. 70 - 43 = ?",
      explanation_en: "70 - 43 = 27. There are 27 empty pots.",
      math_vocab: ["missing part", "empty", "subtract", "pots"],
      audio_url: "/audio/week27/math_p3.mp3"
    },
    {
      id: 4,
      type: "part_whole",
      cpa_stage: "pictorial",
      question_en: "Maya planted 49 seeds in the front garden and 36 seeds in the back garden. How many seeds did she plant altogether?",
      question_vi: "Maya trồng 49 hạt ở vườn trước và 36 hạt ở vườn sau. Tổng cộng cô bé trồng bao nhiêu hạt?",
      bar_model: "/images/week27/barmodel_w27_adv_p4_v1.jpg",
      solution_steps: ["Front garden: 49", "Back garden: 36", "Total: 49 + 36 = ?"],
      answer: ["85", "eighty-five", "85 seeds"],
      unit: "seeds",
      hint_en: "Add both parts: 49 + 36. Remember to regroup.",
      hint_vi: "Cộng hai phần: 49 + 36. Nhớ nhớ số sang hàng chục.",
      explanation_en: "49 + 36 = 85. Maya planted 85 seeds altogether.",
      math_vocab: ["altogether", "total", "add", "seeds"],
      audio_url: "/audio/week27/math_p4.mp3"
    },
    {
      id: 5,
      type: "before_after",
      cpa_stage: "pictorial",
      question_en: "The class had 91 plant labels before the gardening project started. After labelling all the pots, 54 labels had been used. How many labels were left?",
      question_vi: "Lớp có 91 nhãn cây trước khi bắt đầu dự án làm vườn. Sau khi dán nhãn tất cả các chậu, 54 nhãn đã được dùng. Còn lại bao nhiêu nhãn?",
      bar_model: "/images/week27/barmodel_w27_adv_p5_v1.jpg",
      solution_steps: ["Labels before: 91", "Labels used: 54", "Labels left: 91 - 54 = ?"],
      answer: ["37", "thirty-seven", "37 labels"],
      unit: "labels",
      hint_en: "Before minus used = left. 91 - 54 = ?",
      hint_vi: "Trước trừ đã dùng = còn lại. 91 - 54 = ?",
      explanation_en: "91 - 54 = 37. There are 37 labels left.",
      math_vocab: ["before", "after", "used", "labels"],
      audio_url: "/audio/week27/math_p5.mp3"
    }
  ]
};
"""

# ──────────────────────────────────────────────
# W27 EASY — "Maya's Growing Plant"
# Domain: P2 Division | 5 types | numbers ≤50
# ──────────────────────────────────────────────
w27_easy = """\
export default {
  title: "Math: Maya's Growing Plant",
  image_url: "/images/week27/math_cover_w27.jpg",
  audio_url: "/audio/week27_easy/math_main.mp3",
  intro_en: "Use the bar model to help you solve each problem.",
  intro_vi: "Dùng mô hình thanh để giúp bạn giải mỗi bài toán.",
  problems: [
    {
      id: 1,
      type: "groups",
      cpa_stage: "pictorial",
      question_en: "Maya has 24 flower seeds. She shares them equally into 4 pots. How many seeds are in each pot?",
      question_vi: "Maya có 24 hạt hoa. Cô bé chia đều vào 4 chậu. Mỗi chậu có bao nhiêu hạt?",
      bar_model: "/images/week27/barmodel_w27_easy_p1_v1.jpg",
      solution_steps: ["Total seeds: 24", "Number of pots: 4", "Seeds per pot: 24 ÷ 4 = ?"],
      answer: ["6", "six", "6 seeds"],
      unit: "seeds",
      hint_en: "Share 24 equally into 4 groups. How many in each group?",
      hint_vi: "Chia đều 24 vào 4 nhóm. Mỗi nhóm có bao nhiêu?",
      explanation_en: "24 ÷ 4 = 6. Each pot gets 6 seeds.",
      math_vocab: ["share equally", "divide", "each pot", "groups"],
      audio_url: "/audio/week27_easy/math_p1.mp3"
    },
    {
      id: 2,
      type: "comparison",
      cpa_stage: "pictorial",
      question_en: "Maya's sunflower is 42 cm tall. Her bean plant is 27 cm tall. How much taller is the sunflower?",
      question_vi: "Hoa hướng dương của Maya cao 42 cm. Cây đậu của cô bé cao 27 cm. Hoa hướng dương cao hơn bao nhiêu cm?",
      bar_model: "/images/week27/barmodel_w27_easy_p2_v1.jpg",
      solution_steps: ["Sunflower: 42 cm", "Bean plant: 27 cm", "Difference: 42 - 27 = ?"],
      answer: ["15", "fifteen", "15 cm"],
      unit: "cm",
      hint_en: "Subtract the smaller from the bigger: 42 - 27.",
      hint_vi: "Trừ số nhỏ hơn khỏi số lớn hơn: 42 - 27.",
      explanation_en: "42 - 27 = 15. The sunflower is 15 cm taller.",
      math_vocab: ["taller", "difference", "compare"],
      audio_url: "/audio/week27_easy/math_p2.mp3"
    },
    {
      id: 3,
      type: "missing_part",
      cpa_stage: "pictorial",
      question_en: "The class needs to fill 30 plant pots. They have filled 14 pots so far. How many pots are still empty?",
      question_vi: "Lớp cần đổ đất vào 30 chậu cây. Họ đã làm 14 chậu. Còn bao nhiêu chậu trống?",
      bar_model: "/images/week27/barmodel_w27_easy_p3_v1.jpg",
      solution_steps: ["Pots needed: 30", "Pots filled: 14", "Still empty: 30 - 14 = ?"],
      answer: ["16", "sixteen", "16 pots"],
      unit: "pots",
      hint_en: "Total minus filled = still empty. 30 - 14 = ?",
      hint_vi: "Tổng trừ đã làm = còn trống. 30 - 14 = ?",
      explanation_en: "30 - 14 = 16. There are 16 pots still empty.",
      math_vocab: ["missing part", "still empty", "subtract"],
      audio_url: "/audio/week27_easy/math_p3.mp3"
    },
    {
      id: 4,
      type: "part_whole",
      cpa_stage: "pictorial",
      question_en: "Maya planted 23 seeds in the morning and 16 seeds in the afternoon. How many seeds did she plant in total?",
      question_vi: "Maya trồng 23 hạt vào buổi sáng và 16 hạt vào buổi chiều. Tổng cộng cô bé trồng bao nhiêu hạt?",
      bar_model: "/images/week27/barmodel_w27_easy_p4_v1.jpg",
      solution_steps: ["Morning seeds: 23", "Afternoon seeds: 16", "Total: 23 + 16 = ?"],
      answer: ["39", "thirty-nine", "39 seeds"],
      unit: "seeds",
      hint_en: "Add 23 and 16 together.",
      hint_vi: "Cộng 23 và 16 lại.",
      explanation_en: "23 + 16 = 39. Maya planted 39 seeds in total.",
      math_vocab: ["total", "altogether", "add"],
      audio_url: "/audio/week27_easy/math_p4.mp3"
    },
    {
      id: 5,
      type: "before_after",
      cpa_stage: "pictorial",
      question_en: "The garden shelf had 50 plant labels before the class started. After class, 28 labels had been used. How many labels were left?",
      question_vi: "Kệ vườn có 50 nhãn cây trước khi lớp bắt đầu. Sau buổi học, 28 nhãn đã được dùng. Còn lại bao nhiêu nhãn?",
      bar_model: "/images/week27/barmodel_w27_easy_p5_v1.jpg",
      solution_steps: ["Before class: 50 labels", "Labels used: 28", "Labels left: 50 - 28 = ?"],
      answer: ["22", "twenty-two", "22 labels"],
      unit: "labels",
      hint_en: "Before minus used = left. 50 - 28 = ?",
      hint_vi: "Trước trừ đã dùng = còn lại. 50 - 28 = ?",
      explanation_en: "50 - 28 = 22. There are 22 labels left.",
      math_vocab: ["before", "after", "used", "labels"],
      audio_url: "/audio/week27_easy/math_p5.mp3"
    }
  ]
};
"""

files = {
    "src/data/weeks/week_26/singapore_math.js": w26_adv,
    "src/data/weeks_easy/week_26/singapore_math.js": w26_easy,
    "src/data/weeks/week_27/singapore_math.js": w27_adv,
    "src/data/weeks_easy/week_27/singapore_math.js": w27_easy,
}

base = Path(__file__).parent.parent
for rel, content in files.items():
    p = base / rel
    p.write_text(content, encoding="utf-8")
    print(f"Written: {rel}")

print("Done: W26 ADV, W26 EASY, W27 ADV, W27 EASY")
