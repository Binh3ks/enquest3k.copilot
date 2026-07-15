export default {
  grammar_explanation: {
    title_en: "Present Simple for Facts: it grows, it needs",
    title_vi: "Hiện Tại Đơn cho sự thật: it grows, it needs",
    rules: [
      {
        id: 1, icon: "1️⃣",
        rule_en: "FACTS — use Present Simple for things that are always true",
        rule_vi: "SỰ THẬT — dùng Hiện Tại Đơn cho điều luôn đúng",
        example_en: "A plant grows. A seed needs water.",
        example_vi: "Cây lớn lên. Hạt giống cần nước."
      },
      {
        id: 2, icon: "2️⃣",
        rule_en: "HE / SHE / IT — add -S to the verb",
        rule_vi: "HE / SHE / IT — thêm -S vào động từ",
        example_en: "It grows. It needs. The root absorbs water.",
        example_vi: "Nó lớn. Nó cần. Rễ hấp thụ nước."
      },
      {
        id: 3, icon: "3️⃣",
        rule_en: "I / YOU / WE / THEY — no -S on the verb",
        rule_vi: "I / YOU / WE / THEY — không thêm -S vào động từ",
        example_en: "We grow plants. They need sunlight.",
        example_vi: "Chúng tôi trồng cây. Chúng cần ánh sáng mặt trời."
      },
      {
        id: 4, icon: "4️⃣",
        rule_en: "SEQUENCE WORDS to order natural steps",
        rule_vi: "TỪ TRÌNH TỰ để sắp xếp các bước tự nhiên",
        example_en: "First, a seed is planted. Then, it sprouts. Finally, it blooms.",
        example_vi: "Đầu tiên, hạt được gieo. Sau đó, nó nảy mầm. Cuối cùng, nó nở hoa."
      }
    ]
  },

  title: "Grammar: Present Simple for Facts — it grows, it needs, roots absorb",
  image_url: "/images/week27/grammar_cover_w27.jpg",
  audio_url: "/audio/week27_easy/grammar_main.mp3",
  rules: [
    {
      id: 1,
      rule_en: "FACTS — use Present Simple to say what is always true",
      examples: ["A seed needs water.", "The root absorbs water.", "A leaf makes food.", "Plants grow in soil."],
      audio_url: "/audio/week27_easy/grammar_rule1.mp3"
    },
    {
      id: 2,
      rule_en: "HE / SHE / IT — add -S to the verb",
      examples: ["It grows every day.", "The stem carries water.", "The leaf uses sunlight.", "The root absorbs nutrients."],
      audio_url: "/audio/week27_easy/grammar_rule2.mp3"
    },
    {
      id: 3,
      rule_en: "I / YOU / WE / THEY — no -S on the verb",
      examples: ["Plants need water.", "Roots absorb nutrients.", "Leaves make food.", "Seeds grow in soil."],
      audio_url: "/audio/week27_easy/grammar_rule3.mp3"
    },
    {
      id: 4,
      rule_en: "SEQUENCE WORDS — use words to tell the order",
      examples: ["First, a seed is planted.", "Next, a sprout appears.", "After that, the stem grows.", "Finally, a flower blooms."],
      audio_url: "/audio/week27_easy/grammar_rule4.mp3"
    }
  ],
  structure_table: {
    headers: ["Subject", "Verb", "Example"],
    rows: [
      ["I / You / We / They", "base verb", "Plants need water. Roots absorb nutrients."],
      ["He / She / It", "verb + -s", "It grows. The stem carries water. A leaf makes food."],
      ["Sequence", "First / Next / After that / Finally", "First, a seed is planted. Finally, a flower blooms."]
    ]
  },
  exercises: [
    { id: 1, type: "mc", question: "A seed ___ water and warmth to grow.", audio_url: "/audio/week27_easy/grammar_ex1.mp3", options: ["needs", "need", "needing", "needed"], answer: "needs", explanation_en: "Use NEEDS with A seed (it)." },
    { id: 2, type: "mc", question: "The root ___ water from the soil.", audio_url: "/audio/week27_easy/grammar_ex2.mp3", options: ["absorbs", "absorb", "absorbing", "absorbed"], answer: "absorbs", explanation_en: "Use ABSORBS with The root (it)." },
    { id: 3, type: "mc", question: "A leaf ___ sunlight to make food.", audio_url: "/audio/week27_easy/grammar_ex3.mp3", options: ["uses", "use", "using", "used"], answer: "uses", explanation_en: "Use USES with A leaf (it)." },
    { id: 4, type: "mc", question: "Plants ___ three things: water, sunlight, and nutrients.", audio_url: "/audio/week27_easy/grammar_ex4.mp3", options: ["need", "needs", "needing", "needed"], answer: "need", explanation_en: "Use NEED with Plants (they)." },
    { id: 5, type: "mc", question: "The stem ___ water up to the leaves.", audio_url: "/audio/week27_easy/grammar_ex5.mp3", options: ["carries", "carry", "carried", "carrying"], answer: "carries", explanation_en: "Use CARRIES with The stem (it)." },
    { id: 6, type: "fill", question: "A flower ___ at the top of the plant. (blooms / bloom)", audio_url: "/audio/week27_easy/grammar_ex6.mp3", answer: "blooms", hint_en: "Use -s with A flower (it)." },
    { id: 7, type: "fill", question: "Roots ___ deeper into the soil every day. (grow / grows)", audio_url: "/audio/week27_easy/grammar_ex7.mp3", answer: "grow", hint_en: "Use base verb with Roots (they)." },
    { id: 8, type: "fill", question: "___, the seed is planted in warm soil. (First / Finally)", audio_url: "/audio/week27_easy/grammar_ex8.mp3", answer: "First", hint_en: "First marks the first step." },
    { id: 9, type: "fill", question: "The leaf ___ food for the plant. (makes / make)", audio_url: "/audio/week27_easy/grammar_ex9.mp3", answer: "makes", hint_en: "Use MAKES with The leaf (it)." },
    { id: 10, type: "fill", question: "___, a yellow flower blooms. (Finally / First)", audio_url: "/audio/week27_easy/grammar_ex10.mp3", answer: "Finally", hint_en: "Finally marks the last step." },
    { id: 11, type: "unscramble", question: "Unscramble: [ water / needs / A / seed ]", audio_url: "/audio/week27_easy/grammar_ex11.mp3", answer: "A seed needs water.", hint_en: "Start with A seed..." },
    { id: 12, type: "unscramble", question: "Unscramble: [ water / absorbs / root / The / soil / from / the ]", audio_url: "/audio/week27_easy/grammar_ex12.mp3", answer: "The root absorbs water from the soil.", hint_en: "Start with The root..." },
    { id: 13, type: "unscramble", question: "Unscramble: [ food / leaf / sunlight / A / to / uses / make ]", audio_url: "/audio/week27_easy/grammar_ex13.mp3", answer: "A leaf uses sunlight to make food.", hint_en: "Start with A leaf..." },
    { id: 14, type: "unscramble", question: "Unscramble: [ sprout / appears / a / Next / green ]", audio_url: "/audio/week27_easy/grammar_ex14.mp3", answer: "Next, a green sprout appears.", hint_en: "Start with Next..." },
    { id: 15, type: "mc", question: "Which sentence is correct?", audio_url: "/audio/week27_easy/grammar_ex15.mp3", options: ["A seed needs water.", "A seed need water.", "A seed needing water.", "A seed needed water."], answer: "A seed needs water.", explanation_en: "Use NEEDS with A seed (it) for a fact." },
    { id: 16, type: "mc", question: "Which sentence uses the correct verb form?", audio_url: "/audio/week27_easy/grammar_ex16.mp3", options: ["Roots absorb water.", "Roots absorbs water.", "Root absorbs water.", "Roots absorbed water."], answer: "Roots absorb water.", explanation_en: "Use ABSORB (no -s) with Roots (they)." },
    { id: 17, type: "fill", question: "The sprout ___ through the soil on Day Five. (pushes / push)", audio_url: "/audio/week27_easy/grammar_ex17.mp3", answer: "pushes", hint_en: "Use PUSHES with The sprout (it)." },
    { id: 18, type: "fill", question: "___ that, the stem grows taller. (After / First)", audio_url: "/audio/week27_easy/grammar_ex18.mp3", answer: "After", hint_en: "After that is a sequence word for Step 3." },
    { id: 19, type: "mc", question: "How do you say GROW for He / She / It?", audio_url: "/audio/week27_easy/grammar_ex19.mp3", options: ["grows", "grow", "growing", "growed"], answer: "grows", explanation_en: "Add -s: grow → grows for He / She / It." },
    { id: 20, type: "fill", question: "___, the seed needs water to germinate. (First / Finally)", audio_url: "/audio/week27_easy/grammar_ex20.mp3", answer: "First", hint_en: "First marks the beginning step." }
  ]
};
