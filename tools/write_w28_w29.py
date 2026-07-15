#!/usr/bin/env python3
"""Write W28 and W29 singapore_math.js files.
W28 "The Tortoise and the Hare": mixed P2 review (mult/div groups + +/- operations)
W29 "Off We Go!": mixed P2 operations, P2-level numbers, 5 correct types
"""
from pathlib import Path

# ──────────────────────────────────────────────
# W28 ADV — "The Tortoise and the Hare"
# Domain: P2 mixed review | 5 types
# ──────────────────────────────────────────────
w28_adv = """\
export default {
  title: "Singapore Math: The Tortoise and the Hare",
  image_url: "/images/week28/math_cover_w28.jpg",
  audio_url: "/audio/week28/math_main.mp3",
  intro_en: "Use the bar model to solve these Tortoise and Hare word problems.",
  intro_vi: "Dùng mô hình thanh để giải các bài toán về Rùa và Thỏ.",
  problems: [
    {
      id: 1,
      type: "part_whole",
      cpa_stage: "pictorial",
      question_en: "The Hare ran 56 steps before his nap and 37 more steps after waking up. How many steps did the Hare run altogether?",
      question_vi: "Thỏ chạy 56 bước trước khi ngủ và 37 bước nữa sau khi thức dậy. Tổng cộng Thỏ chạy bao nhiêu bước?",
      bar_model: "/images/week28/barmodel_w28_adv_p1_v1.jpg",
      solution_steps: ["Steps before nap: 56", "Steps after nap: 37", "Total: 56 + 37 = ?"],
      answer: ["93", "ninety-three", "93 steps"],
      unit: "steps",
      hint_en: "Add both parts: 56 + 37. Remember to regroup.",
      hint_vi: "Cộng hai phần: 56 + 37. Nhớ nhớ số sang hàng chục.",
      explanation_en: "56 + 37 = 93. The Hare ran 93 steps altogether.",
      math_vocab: ["altogether", "total", "add", "steps"],
      audio_url: "/audio/week28/math_p1.mp3"
    },
    {
      id: 2,
      type: "comparison",
      cpa_stage: "pictorial",
      question_en: "The Tortoise walked 78 steps during the race. The Hare only ran 63 steps before he fell asleep. How many more steps did the Tortoise walk than the Hare?",
      question_vi: "Rùa đi 78 bước trong cuộc đua. Thỏ chỉ chạy 63 bước trước khi ngủ. Rùa đi nhiều hơn Thỏ bao nhiêu bước?",
      bar_model: "/images/week28/barmodel_w28_adv_p2_v1.jpg",
      solution_steps: ["Tortoise steps: 78", "Hare steps: 63", "Difference: 78 - 63 = ?"],
      answer: ["15", "fifteen", "15 steps"],
      unit: "steps",
      hint_en: "Subtract the smaller from the larger: 78 - 63.",
      hint_vi: "Trừ số nhỏ hơn khỏi số lớn hơn: 78 - 63.",
      explanation_en: "78 - 63 = 15. The Tortoise walked 15 more steps than the Hare.",
      math_vocab: ["more than", "difference", "compare", "steps"],
      audio_url: "/audio/week28/math_p2.mp3"
    },
    {
      id: 3,
      type: "groups",
      cpa_stage: "pictorial",
      question_en: "After the race, 8 groups of forest animals came to celebrate. Each group had 9 animals. How many animals came altogether?",
      question_vi: "Sau cuộc đua, 8 nhóm động vật rừng đến ăn mừng. Mỗi nhóm có 9 con vật. Tổng cộng có bao nhiêu con vật?",
      bar_model: "/images/week28/barmodel_w28_adv_p3_v1.jpg",
      solution_steps: ["Groups: 8", "Animals per group: 9", "Total: 9 + 9 + 9 + 9 + 9 + 9 + 9 + 9 = ?"],
      answer: ["72", "seventy-two", "72 animals"],
      unit: "animals",
      hint_en: "Count 8 equal groups of 9 animals.",
      hint_vi: "Đếm 8 nhóm bằng nhau, mỗi nhóm 9 con vật.",
      explanation_en: "9 x 8 = 72. There were 72 animals altogether.",
      math_vocab: ["equal groups", "each group", "total", "animals"],
      audio_url: "/audio/week28/math_p3.mp3"
    },
    {
      id: 4,
      type: "missing_part",
      cpa_stage: "pictorial",
      question_en: "The race track was 100 metres long. The Tortoise had already walked 64 metres. How many metres did the Tortoise still have to walk?",
      question_vi: "Đường đua dài 100 mét. Rùa đã đi được 64 mét. Rùa còn phải đi bao nhiêu mét nữa?",
      bar_model: "/images/week28/barmodel_w28_adv_p4_v1.jpg",
      solution_steps: ["Total track: 100 m", "Already walked: 64 m", "Still to walk: 100 - 64 = ?"],
      answer: ["36", "thirty-six", "36 metres"],
      unit: "metres",
      hint_en: "Total minus already walked = still to walk. 100 - 64 = ?",
      hint_vi: "Tổng trừ đã đi = còn phải đi. 100 - 64 = ?",
      explanation_en: "100 - 64 = 36. The Tortoise still had 36 metres to walk.",
      math_vocab: ["missing part", "still to walk", "subtract", "metres"],
      audio_url: "/audio/week28/math_p4.mp3"
    },
    {
      id: 5,
      type: "before_after",
      cpa_stage: "pictorial",
      question_en: "The Hare had 85 energy points before his nap. While he slept, he used up 47 energy points. How many energy points did he have when he woke up?",
      question_vi: "Thỏ có 85 điểm năng lượng trước khi ngủ. Trong khi ngủ, cậu dùng hết 47 điểm năng lượng. Lúc thức dậy Thỏ còn bao nhiêu điểm năng lượng?",
      bar_model: "/images/week28/barmodel_w28_adv_p5_v1.jpg",
      solution_steps: ["Energy before nap: 85", "Energy used while sleeping: 47", "Energy after waking: 85 - 47 = ?"],
      answer: ["38", "thirty-eight", "38 energy points"],
      unit: "energy points",
      hint_en: "Before minus used = after. 85 - 47 = ?",
      hint_vi: "Trước trừ đã dùng = sau. 85 - 47 = ?",
      explanation_en: "85 - 47 = 38. The Hare had 38 energy points when he woke up.",
      math_vocab: ["before", "after", "used", "energy points"],
      audio_url: "/audio/week28/math_p5.mp3"
    }
  ]
};
"""

# ──────────────────────────────────────────────
# W28 EASY — "The Tortoise and the Hare"
# Domain: P2 mixed review | 5 types | numbers ≤50
# ──────────────────────────────────────────────
w28_easy = """\
export default {
  title: "Math: The Tortoise and the Hare",
  image_url: "/images/week28/math_cover_w28.jpg",
  audio_url: "/audio/week28_easy/math_main.mp3",
  intro_en: "Use the bar model to help you solve each problem.",
  intro_vi: "Dùng mô hình thanh để giúp bạn giải mỗi bài toán.",
  problems: [
    {
      id: 1,
      type: "part_whole",
      cpa_stage: "pictorial",
      question_en: "The Tortoise walked 23 steps in the morning and 16 steps in the afternoon. How many steps did he walk in total?",
      question_vi: "Rùa đi 23 bước vào buổi sáng và 16 bước vào buổi chiều. Tổng cộng Rùa đi bao nhiêu bước?",
      bar_model: "/images/week28/barmodel_w28_easy_p1_v1.jpg",
      solution_steps: ["Morning steps: 23", "Afternoon steps: 16", "Total: 23 + 16 = ?"],
      answer: ["39", "thirty-nine", "39 steps"],
      unit: "steps",
      hint_en: "Add 23 and 16 together.",
      hint_vi: "Cộng 23 và 16 lại.",
      explanation_en: "23 + 16 = 39. The Tortoise walked 39 steps in total.",
      math_vocab: ["total", "altogether", "add"],
      audio_url: "/audio/week28_easy/math_p1.mp3"
    },
    {
      id: 2,
      type: "comparison",
      cpa_stage: "pictorial",
      question_en: "The Hare ran 47 steps. The Tortoise walked 32 steps. How many more steps did the Hare run?",
      question_vi: "Thỏ chạy 47 bước. Rùa đi 32 bước. Thỏ chạy nhiều hơn Rùa bao nhiêu bước?",
      bar_model: "/images/week28/barmodel_w28_easy_p2_v1.jpg",
      solution_steps: ["Hare steps: 47", "Tortoise steps: 32", "Difference: 47 - 32 = ?"],
      answer: ["15", "fifteen", "15 steps"],
      unit: "steps",
      hint_en: "Subtract the smaller from the bigger: 47 - 32.",
      hint_vi: "Trừ số nhỏ hơn khỏi số lớn hơn: 47 - 32.",
      explanation_en: "47 - 32 = 15. The Hare ran 15 more steps than the Tortoise.",
      math_vocab: ["more than", "difference", "compare"],
      audio_url: "/audio/week28_easy/math_p2.mp3"
    },
    {
      id: 3,
      type: "groups",
      cpa_stage: "pictorial",
      question_en: "There are 5 groups of animals watching the race. Each group has 6 animals. How many animals are watching altogether?",
      question_vi: "Có 5 nhóm động vật xem cuộc đua. Mỗi nhóm có 6 con vật. Tổng cộng có bao nhiêu con vật đang xem?",
      bar_model: "/images/week28/barmodel_w28_easy_p3_v1.jpg",
      solution_steps: ["Groups: 5", "Animals per group: 6", "Total: 6 + 6 + 6 + 6 + 6 = ?"],
      answer: ["30", "thirty", "30 animals"],
      unit: "animals",
      hint_en: "Count 5 equal groups of 6 animals.",
      hint_vi: "Đếm 5 nhóm bằng nhau, mỗi nhóm 6 con vật.",
      explanation_en: "6 x 5 = 30. There are 30 animals watching altogether.",
      math_vocab: ["groups", "each", "altogether"],
      audio_url: "/audio/week28_easy/math_p3.mp3"
    },
    {
      id: 4,
      type: "missing_part",
      cpa_stage: "pictorial",
      question_en: "The race track is 50 metres long. The Tortoise has walked 29 metres. How many metres does he still have to walk?",
      question_vi: "Đường đua dài 50 mét. Rùa đã đi được 29 mét. Rùa còn phải đi bao nhiêu mét nữa?",
      bar_model: "/images/week28/barmodel_w28_easy_p4_v1.jpg",
      solution_steps: ["Track length: 50 m", "Already walked: 29 m", "Still to walk: 50 - 29 = ?"],
      answer: ["21", "twenty-one", "21 metres"],
      unit: "metres",
      hint_en: "Total minus walked = still to walk. 50 - 29 = ?",
      hint_vi: "Tổng trừ đã đi = còn phải đi. 50 - 29 = ?",
      explanation_en: "50 - 29 = 21. The Tortoise still has 21 metres to walk.",
      math_vocab: ["missing part", "still to walk", "subtract"],
      audio_url: "/audio/week28_easy/math_p4.mp3"
    },
    {
      id: 5,
      type: "before_after",
      cpa_stage: "pictorial",
      question_en: "The Hare had 44 energy points before his nap. He used 26 energy points while sleeping. How many energy points does he have now?",
      question_vi: "Thỏ có 44 điểm năng lượng trước khi ngủ. Cậu dùng 26 điểm năng lượng khi đang ngủ. Bây giờ Thỏ có bao nhiêu điểm năng lượng?",
      bar_model: "/images/week28/barmodel_w28_easy_p5_v1.jpg",
      solution_steps: ["Before nap: 44 points", "Used while sleeping: 26", "After waking: 44 - 26 = ?"],
      answer: ["18", "eighteen", "18 energy points"],
      unit: "energy points",
      hint_en: "Before minus used = after. 44 - 26 = ?",
      hint_vi: "Trước trừ đã dùng = sau. 44 - 26 = ?",
      explanation_en: "44 - 26 = 18. The Hare has 18 energy points now.",
      math_vocab: ["before", "after", "used", "energy points"],
      audio_url: "/audio/week28_easy/math_p5.mp3"
    }
  ]
};
"""

# ──────────────────────────────────────────────
# W29 ADV — "Off We Go! (Irregular Verbs 1)"
# Domain: P2 mixed | 5 types | P2-level numbers
# ──────────────────────────────────────────────
w29_adv = """\
export default {
  title: "Singapore Math: Off We Go!",
  image_url: "/images/week29/math_cover_w29.jpg",
  audio_url: "/audio/week29/math_main.mp3",
  intro_en: "Use the bar model to solve these travel word problems.",
  intro_vi: "Dùng mô hình thanh để giải các bài toán về du lịch.",
  problems: [
    {
      id: 1,
      type: "part_whole",
      cpa_stage: "pictorial",
      question_en: "Lily's family packed 47 items into the big suitcase and 36 items into the small bags. How many items did they pack altogether?",
      question_vi: "Gia đình Lily đóng 47 đồ vào vali lớn và 36 đồ vào các túi nhỏ. Tổng cộng họ đóng bao nhiêu đồ?",
      bar_model: "/images/week29/barmodel_w29_adv_p1_v1.jpg",
      solution_steps: ["Suitcase items: 47", "Bag items: 36", "Total: 47 + 36 = ?"],
      answer: ["83", "eighty-three", "83 items"],
      unit: "items",
      hint_en: "Add both parts: 47 + 36. Remember to regroup.",
      hint_vi: "Cộng hai phần: 47 + 36. Nhớ nhớ số sang hàng chục.",
      explanation_en: "47 + 36 = 83. They packed 83 items altogether.",
      math_vocab: ["altogether", "total", "add", "items"],
      audio_url: "/audio/week29/math_p1.mp3"
    },
    {
      id: 2,
      type: "missing_part",
      cpa_stage: "pictorial",
      question_en: "The plane journey took 100 minutes in total. The family had already been flying for 63 minutes. How many minutes of the journey were left?",
      question_vi: "Chuyến bay mất 100 phút. Gia đình đã bay được 63 phút. Còn bao nhiêu phút nữa?",
      bar_model: "/images/week29/barmodel_w29_adv_p2_v1.jpg",
      solution_steps: ["Total journey: 100 min", "Already flown: 63 min", "Time left: 100 - 63 = ?"],
      answer: ["37", "thirty-seven", "37 minutes"],
      unit: "minutes",
      hint_en: "Total minus already flown = still left. 100 - 63 = ?",
      hint_vi: "Tổng trừ đã bay = còn lại. 100 - 63 = ?",
      explanation_en: "100 - 63 = 37. There were 37 minutes of the journey left.",
      math_vocab: ["missing part", "journey left", "subtract", "minutes"],
      audio_url: "/audio/week29/math_p2.mp3"
    },
    {
      id: 3,
      type: "comparison",
      cpa_stage: "pictorial",
      question_en: "The departure lounge had 85 passengers waiting. The arrivals hall had 68 passengers. How many more passengers were in the departure lounge?",
      question_vi: "Phòng chờ khởi hành có 85 hành khách đang đợi. Phòng đến có 68 hành khách. Phòng chờ khởi hành có nhiều hơn bao nhiêu hành khách?",
      bar_model: "/images/week29/barmodel_w29_adv_p3_v1.jpg",
      solution_steps: ["Departure lounge: 85", "Arrivals hall: 68", "Difference: 85 - 68 = ?"],
      answer: ["17", "seventeen", "17 passengers"],
      unit: "passengers",
      hint_en: "Subtract the smaller from the larger: 85 - 68.",
      hint_vi: "Trừ số nhỏ hơn khỏi số lớn hơn: 85 - 68.",
      explanation_en: "85 - 68 = 17. There were 17 more passengers in the departure lounge.",
      math_vocab: ["more than", "difference", "compare", "passengers"],
      audio_url: "/audio/week29/math_p3.mp3"
    },
    {
      id: 4,
      type: "groups",
      cpa_stage: "pictorial",
      question_en: "The airport has 9 boarding gates. Each gate has 10 rows of seats. How many rows of seats are there at the airport altogether?",
      question_vi: "Sân bay có 9 cổng lên máy bay. Mỗi cổng có 10 hàng ghế. Tổng cộng sân bay có bao nhiêu hàng ghế?",
      bar_model: "/images/week29/barmodel_w29_adv_p4_v1.jpg",
      solution_steps: ["Boarding gates: 9", "Rows per gate: 10", "Total: 10 + 10 + 10 + 10 + 10 + 10 + 10 + 10 + 10 = ?"],
      answer: ["90", "ninety", "90 rows"],
      unit: "rows",
      hint_en: "Count 9 equal groups of 10 rows.",
      hint_vi: "Đếm 9 nhóm bằng nhau, mỗi nhóm 10 hàng.",
      explanation_en: "10 x 9 = 90. There are 90 rows of seats altogether.",
      math_vocab: ["equal groups", "each gate", "total", "rows"],
      audio_url: "/audio/week29/math_p4.mp3"
    },
    {
      id: 5,
      type: "before_after",
      cpa_stage: "pictorial",
      question_en: "Before boarding, Lily's family had 74 local currency notes. They spent 38 notes on snacks and drinks at the airport. How many notes did they have left?",
      question_vi: "Trước khi lên máy bay, gia đình Lily có 74 tờ tiền. Họ tiêu 38 tờ mua đồ ăn và nước uống ở sân bay. Còn lại bao nhiêu tờ tiền?",
      bar_model: "/images/week29/barmodel_w29_adv_p5_v1.jpg",
      solution_steps: ["Notes before boarding: 74", "Notes spent: 38", "Notes left: 74 - 38 = ?"],
      answer: ["36", "thirty-six", "36 notes"],
      unit: "notes",
      hint_en: "Before minus spent = left. 74 - 38 = ?",
      hint_vi: "Trước trừ đã tiêu = còn lại. 74 - 38 = ?",
      explanation_en: "74 - 38 = 36. They had 36 notes left.",
      math_vocab: ["before", "after", "spent", "notes"],
      audio_url: "/audio/week29/math_p5.mp3"
    }
  ]
};
"""

# ──────────────────────────────────────────────
# W29 EASY — "Off We Go!"
# Domain: P2 mixed | 5 types | numbers ≤50
# ──────────────────────────────────────────────
w29_easy = """\
export default {
  title: "Math: Off We Go!",
  image_url: "/images/week29/math_cover_w29.jpg",
  audio_url: "/audio/week29_easy/math_main.mp3",
  intro_en: "Use the bar model to help you solve each problem.",
  intro_vi: "Dùng mô hình thanh để giúp bạn giải mỗi bài toán.",
  problems: [
    {
      id: 1,
      type: "part_whole",
      cpa_stage: "pictorial",
      question_en: "Lily packed 24 clothes and 13 toys in her travel bag. How many items did she pack in total?",
      question_vi: "Lily đóng 24 bộ quần áo và 13 đồ chơi vào túi du lịch. Tổng cộng cô bé đóng bao nhiêu đồ?",
      bar_model: "/images/week29/barmodel_w29_easy_p1_v1.jpg",
      solution_steps: ["Clothes: 24", "Toys: 13", "Total: 24 + 13 = ?"],
      answer: ["37", "thirty-seven", "37 items"],
      unit: "items",
      hint_en: "Add 24 and 13 together.",
      hint_vi: "Cộng 24 và 13 lại.",
      explanation_en: "24 + 13 = 37. Lily packed 37 items in total.",
      math_vocab: ["total", "altogether", "add"],
      audio_url: "/audio/week29_easy/math_p1.mp3"
    },
    {
      id: 2,
      type: "missing_part",
      cpa_stage: "pictorial",
      question_en: "The flight takes 40 minutes. The family has already been flying for 27 minutes. How many minutes are left?",
      question_vi: "Chuyến bay mất 40 phút. Gia đình đã bay được 27 phút. Còn bao nhiêu phút nữa?",
      bar_model: "/images/week29/barmodel_w29_easy_p2_v1.jpg",
      solution_steps: ["Total flight: 40 min", "Already flown: 27 min", "Still left: 40 - 27 = ?"],
      answer: ["13", "thirteen", "13 minutes"],
      unit: "minutes",
      hint_en: "Total minus flown = still left. 40 - 27 = ?",
      hint_vi: "Tổng trừ đã bay = còn lại. 40 - 27 = ?",
      explanation_en: "40 - 27 = 13. There are 13 minutes left.",
      math_vocab: ["missing part", "still left", "subtract"],
      audio_url: "/audio/week29_easy/math_p2.mp3"
    },
    {
      id: 3,
      type: "comparison",
      cpa_stage: "pictorial",
      question_en: "Dad's travel bag weighs 35 kg. Mum's bag weighs 22 kg. How many kg heavier is Dad's bag?",
      question_vi: "Túi du lịch của bố nặng 35 kg. Túi của mẹ nặng 22 kg. Túi của bố nặng hơn bao nhiêu kg?",
      bar_model: "/images/week29/barmodel_w29_easy_p3_v1.jpg",
      solution_steps: ["Dad's bag: 35 kg", "Mum's bag: 22 kg", "Difference: 35 - 22 = ?"],
      answer: ["13", "thirteen", "13 kg"],
      unit: "kg",
      hint_en: "Subtract the smaller from the bigger: 35 - 22.",
      hint_vi: "Trừ số nhỏ hơn khỏi số lớn hơn: 35 - 22.",
      explanation_en: "35 - 22 = 13. Dad's bag is 13 kg heavier.",
      math_vocab: ["heavier", "difference", "compare"],
      audio_url: "/audio/week29_easy/math_p3.mp3"
    },
    {
      id: 4,
      type: "groups",
      cpa_stage: "pictorial",
      question_en: "The waiting room has 7 rows of seats. Each row has 5 seats. How many seats are there in the waiting room altogether?",
      question_vi: "Phòng chờ có 7 hàng ghế. Mỗi hàng có 5 ghế. Tổng cộng phòng chờ có bao nhiêu ghế?",
      bar_model: "/images/week29/barmodel_w29_easy_p4_v1.jpg",
      solution_steps: ["Rows: 7", "Seats per row: 5", "Total: 5 + 5 + 5 + 5 + 5 + 5 + 5 = ?"],
      answer: ["35", "thirty-five", "35 seats"],
      unit: "seats",
      hint_en: "Count 7 equal groups of 5 seats.",
      hint_vi: "Đếm 7 nhóm bằng nhau, mỗi nhóm 5 ghế.",
      explanation_en: "5 x 7 = 35. There are 35 seats in the waiting room.",
      math_vocab: ["groups", "each", "altogether"],
      audio_url: "/audio/week29_easy/math_p4.mp3"
    },
    {
      id: 5,
      type: "before_after",
      cpa_stage: "pictorial",
      question_en: "Lily had 48 sweets before the trip. On the plane she gave away 19 sweets to other children. How many sweets does she have left?",
      question_vi: "Lily có 48 viên kẹo trước chuyến đi. Trên máy bay cô bé cho 19 viên cho những đứa trẻ khác. Còn lại bao nhiêu viên kẹo?",
      bar_model: "/images/week29/barmodel_w29_easy_p5_v1.jpg",
      solution_steps: ["Before trip: 48 sweets", "Gave away: 19", "Left: 48 - 19 = ?"],
      answer: ["29", "twenty-nine", "29 sweets"],
      unit: "sweets",
      hint_en: "Before minus given away = left. 48 - 19 = ?",
      hint_vi: "Trước trừ đã cho = còn lại. 48 - 19 = ?",
      explanation_en: "48 - 19 = 29. Lily has 29 sweets left.",
      math_vocab: ["before", "after", "gave away", "left"],
      audio_url: "/audio/week29_easy/math_p5.mp3"
    }
  ]
};
"""

files = {
    "src/data/weeks/week_28/singapore_math.js": w28_adv,
    "src/data/weeks_easy/week_28/singapore_math.js": w28_easy,
    "src/data/weeks/week_29/singapore_math.js": w29_adv,
    "src/data/weeks_easy/week_29/singapore_math.js": w29_easy,
}

base = Path(__file__).parent.parent
for rel, content in files.items():
    p = base / rel
    p.write_text(content, encoding="utf-8")
    print(f"Written: {rel}")

print("Done: W28 ADV, W28 EASY, W29 ADV, W29 EASY")
