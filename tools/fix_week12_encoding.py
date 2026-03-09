"""Fix encoding-corrupted Week 12 easy mode files by rewriting them cleanly."""
import pathlib

BASE = pathlib.Path("src/data/weeks_easy/week_12")

# ── LOGIC.JS ──────────────────────────────────────────────────────────────────
LOGIC = r"""// Easy Mode Logic Lab - Week 12: I Can / I Can't
// Phase 1 Blueprint rules: Vocab & Patterns (Math Bridge)
// NO complex riddles. Simple reading comprehension with CAN / CAN'T.
// Text-input format: student reads short sentences and writes one-word answer.

export default {
  puzzles: [
    {
      id: 1,
      type: "logic",
      question_en: "Mia can swim. What CAN Mia do? (Write one word)",
      question_vi: "Mia co the boi. Mia co the lam gi? (Viet mot tu)",
      answer: ["swim", "swimming"],
      hint_en: "Read the first sentence again. It tells you what Mia CAN do.",
      hint_vi: "Doc lai cau dau tien. No noi cho ban biet Mia CO THE lam gi.",
      audio_url: "/audio/week12_easy/logic_1.mp3"
    },
    {
      id: 2,
      type: "logic",
      question_en: "Tom can sing. Tom can draw. Tom can NOT swim. What can Tom NOT do? (Write one word)",
      question_vi: "Tom co the hat. Tom co the ve. Tom KHONG THE boi. Tom khong the lam gi? (Viet mot tu)",
      answer: ["swim", "swimming"],
      hint_en: "Find the sentence with 'can NOT'. That word is the answer.",
      hint_vi: "Tim cau co 'can NOT'. Tu do la dap an.",
      audio_url: "/audio/week12_easy/logic_2.mp3"
    },
    {
      id: 3,
      type: "logic",
      question_en: "I can run. I can jump. I can NOT fly. What can I NOT do? (Write one word)",
      question_vi: "Toi co the chay. Toi co the nhay. Toi KHONG THE bay. Toi khong the lam gi? (Viet mot tu)",
      answer: ["fly", "flying"],
      hint_en: "Find the sentence with 'can NOT'. That word is the answer.",
      hint_vi: "Tim cau co 'can NOT'. Tu do la dap an.",
      audio_url: "/audio/week12_easy/logic_3.mp3"
    },
    {
      id: 4,
      type: "logic",
      question_en: "Anna can dance very well. She loves dancing! Anna is a great ___. (Write: dancer or singer)",
      question_vi: "Anna co the nhay rat gioi. Co ay yeu thich nhay! Anna la mot ___ tuyet voi. (Viet: dancer hoac singer)",
      answer: ["dancer"],
      hint_en: "Anna loves dancing. dance + r = dancer.  sing + er = singer.",
      hint_vi: "Anna yeu thich nhay. dance + r = dancer.  sing + er = singer.",
      audio_url: "/audio/week12_easy/logic_4.mp3"
    },
    {
      id: 5,
      type: "logic",
      question_en: "Ben can cook. Ben can read. Ben can NOT ride a bike. How many things CAN Ben do? (Write a number)",
      question_vi: "Ben co the nau an. Ben co the doc sach. Ben KHONG THE di xe dap. Ben co the lam bao nhieu viec? (Viet so)",
      answer: ["2", "two"],
      hint_en: "Count only sentences with 'can' (skip 'can NOT'). How many?",
      hint_vi: "Chi dem cac cau co 'can' thoi (khong tinh 'can NOT'). Co bao nhieu?",
      audio_url: "/audio/week12_easy/logic_5.mp3"
    }
  ]
};
"""

# ── WORD_POWER.JS ─────────────────────────────────────────────────────────────
WORD_POWER = r"""// Easy Mode Word Power - Week 12: I Can / I Can't
// Phase 1 Blueprint rules: 3 simple Tier 1 concrete action words
// Images: wordpower_i_can_sing.jpg, wordpower_i_can_dance.jpg, wordpower_i_can_draw.jpg

export default {
  words: [
    {
      word: "sing",
      definition_en: "to make music with your voice",
      definition_vi: "hat - dung giong noi de tao ra am nhac",
      example: "I can sing a happy song!",
      usage_note: "I can sing. She can sing. Can you sing?",
      related_words: ["song", "singer", "music"],
      image_url: "/images/week12_easy/wordpower_i_can_sing.jpg",
      audio_word: "/audio/week12_easy/wordpower_sing.mp3",
      audio_definition: "/audio/week12_easy/wordpower_def_sing.mp3",
      audio_example: "/audio/week12_easy/wordpower_ex_sing.mp3"
    },
    {
      word: "dance",
      definition_en: "to move your body to music",
      definition_vi: "nhay - di chuyen co the theo nhac",
      example: "I can dance at the talent show!",
      usage_note: "I can dance. She can dance. Can you dance?",
      related_words: ["dancer", "music", "move"],
      image_url: "/images/week12_easy/wordpower_i_can_dance.jpg",
      audio_word: "/audio/week12_easy/wordpower_dance.mp3",
      audio_definition: "/audio/week12_easy/wordpower_def_dance.mp3",
      audio_example: "/audio/week12_easy/wordpower_ex_dance.mp3"
    },
    {
      word: "draw",
      definition_en: "to make a picture with a pencil or pen",
      definition_vi: "ve - tao ra tranh bang but chi hoac but muc",
      example: "I can draw a beautiful picture!",
      usage_note: "I can draw. She can draw. Can you draw?",
      related_words: ["picture", "artist", "pencil"],
      image_url: "/images/week12_easy/wordpower_i_can_draw.jpg",
      audio_word: "/audio/week12_easy/wordpower_draw.mp3",
      audio_definition: "/audio/week12_easy/wordpower_def_draw.mp3",
      audio_example: "/audio/week12_easy/wordpower_ex_draw.mp3"
    }
  ]
};
"""

(BASE / "logic.js").write_text(LOGIC, encoding="utf-8")
print("logic.js written OK")

(BASE / "word_power.js").write_text(WORD_POWER, encoding="utf-8")
print("word_power.js written OK")

# Verify both read back cleanly
for name in ("logic.js", "word_power.js"):
    text = (BASE / name).read_text(encoding="utf-8")
    print(f"{name}: {len(text)} chars, UTF-8 OK")
