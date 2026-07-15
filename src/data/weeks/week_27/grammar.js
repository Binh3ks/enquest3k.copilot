export default {
  grammar_explanation: {
    title_en: "Present Simple for Facts: It grows, It needs",
    title_vi: "Hiện Tại Đơn cho sự thật: It grows, It needs",
    rules: [
      {
        id: 1, icon: "1️⃣",
        rule_en: "Present Simple states facts that are always true",
        rule_vi: "Hiện Tại Đơn dùng để nêu sự thật luôn đúng",
        example_en: "A seed grows into a plant. Plants need water and sunlight.",
        example_vi: "Hạt giống lớn lên thành cây. Cây cần nước và ánh sáng."
      },
      {
        id: 2, icon: "2️⃣",
        rule_en: "He / She / It → add -s or -es to the verb",
        rule_vi: "He / She / It → thêm -s hoặc -es vào động từ",
        example_en: "It grows. It needs water. The stem reaches for sunlight.",
        example_vi: "Nó lớn. Nó cần nước. Thân cây vươn về phía ánh sáng."
      },
      {
        id: 3, icon: "3️⃣",
        rule_en: "I / You / We / They → no -s added to the verb",
        rule_vi: "I / You / We / They → không thêm -s vào động từ",
        example_en: "They grow in sunlight. Leaves make food. Roots absorb water.",
        example_vi: "Chúng lớn trong ánh sáng. Lá tạo ra thức ăn. Rễ hấp thụ nước."
      },
      {
        id: 4, icon: "4️⃣",
        rule_en: "Use sequence words: First, Next, After that, Finally",
        rule_vi: "Dùng từ trình tự: First, Next, After that, Finally",
        example_en: "First, a seed is planted. Then, it sprouts. Finally, it blooms.",
        example_vi: "Đầu tiên, hạt được gieo. Sau đó, nó nảy mầm. Cuối cùng, nó nở hoa."
      }
    ]
  },

  title: "Grammar: Present Simple for Facts — It grows, It needs",
  image_url: "/images/week27/grammar_cover_w27.jpg",
  audio_url: "/audio/week27/grammar_main.mp3",
  rules: [
    {
      id: 1,
      rule_en: "PRESENT SIMPLE FOR FACTS — Use the Present Simple to state facts that are always true",
      examples: [
        "A seed grows into a plant.",
        "Plants need water, sunlight, and nutrients.",
        "The root absorbs water from the soil.",
        "Leaves make food using sunlight.",
        "A flower produces seeds."
      ],
      audio_url: "/audio/week27/grammar_rule1.mp3"
    },
    {
      id: 2,
      rule_en: "THIRD PERSON SINGULAR — Add -s or -es to the verb with He / She / It",
      examples: [
        "It grows from a tiny seed. (grow → grows)",
        "It needs water every day. (need → needs)",
        "The stem reaches for sunlight. (reach → reaches)",
        "The root absorbs nutrients. (absorb → absorbs)",
        "A leaf collects sunlight. (collect → collects)"
      ],
      audio_url: "/audio/week27/grammar_rule2.mp3"
    },
    {
      id: 3,
      rule_en: "PLURAL SUBJECTS — No -s added with They / Plants / Leaves / Roots",
      examples: [
        "Plants need sunlight and water.",
        "Roots absorb water from the soil.",
        "Leaves produce oxygen through photosynthesis.",
        "Seeds germinate in warm, moist soil.",
        "Flowers attract bees and butterflies."
      ],
      audio_url: "/audio/week27/grammar_rule3.mp3"
    },
    {
      id: 4,
      rule_en: "SEQUENCE WORDS with facts — Use First, Next, After that, Finally to order a natural process",
      examples: [
        "First, a seed is planted in the soil.",
        "Next, the seed germinates and a sprout appears.",
        "After that, the stem grows taller toward the sunlight.",
        "Finally, a flower blooms at the top of the plant.",
        "The roots absorb water — then the stem carries it upwards."
      ],
      audio_url: "/audio/week27/grammar_rule4.mp3"
    }
  ],
  structure_table: {
    headers: ["Subject", "Verb Form", "Example"],
    rows: [
      ["I / You / We / They / Plants / Roots", "base verb", "Plants need water. Roots absorb nutrients."],
      ["He / She / It / A plant / The stem", "verb + -s / -es", "It grows. The stem reaches. A leaf collects sunlight."],
      ["Any subject", "sequence word + Present Simple", "First, a seed germinates. Finally, a flower blooms."]
    ]
  },
  exercises: [
    {
      id: 1,
      type: "mc",
      question: "A plant ___ sunlight to produce food.",
      audio_url: "/audio/week27/grammar_ex1.mp3",
      options: ["needs", "need", "needing", "needed"],
      answer: "needs",
      explanation_en: "Subject is 'A plant' (it = singular), so we add -s: needs."
    },
    {
      id: 2,
      type: "mc",
      question: "Roots ___ water and nutrients from the soil.",
      audio_url: "/audio/week27/grammar_ex2.mp3",
      options: ["absorb", "absorbs", "absorbing", "absorbed"],
      answer: "absorb",
      explanation_en: "Subject is 'Roots' (plural/they), so no -s: absorb."
    },
    {
      id: 3,
      type: "mc",
      question: "The stem ___ water from the roots up to the leaves.",
      audio_url: "/audio/week27/grammar_ex3.mp3",
      options: ["carries", "carry", "carrying", "carried"],
      answer: "carries",
      explanation_en: "Subject is 'The stem' (it = singular). Carry → Carries (consonant + y → ies)."
    },
    {
      id: 4,
      type: "mc",
      question: "___, a tiny seed is placed in warm, moist soil.",
      audio_url: "/audio/week27/grammar_ex4.mp3",
      options: ["First", "Finally", "After that", "Next"],
      answer: "First",
      explanation_en: "The first step in a sequence starts with 'First'."
    },
    {
      id: 5,
      type: "mc",
      question: "A seed ___ into a plant when conditions are right.",
      audio_url: "/audio/week27/grammar_ex5.mp3",
      options: ["grows", "grow", "growing", "grew"],
      answer: "grows",
      explanation_en: "Subject is 'A seed' (it = singular), so add -s: grows."
    },
    {
      id: 6,
      type: "mc",
      question: "Leaves ___ food through a process called photosynthesis.",
      audio_url: "/audio/week27/grammar_ex6.mp3",
      options: ["make", "makes", "making", "made"],
      answer: "make",
      explanation_en: "Subject is 'Leaves' (plural/they), so no -s: make."
    },
    {
      id: 7,
      type: "mc",
      question: "___, the seed germinates and a small sprout appears.",
      audio_url: "/audio/week27/grammar_ex7.mp3",
      options: ["Next", "First", "Finally", "Before"],
      answer: "Next",
      explanation_en: "This is the second step in the sequence: Next."
    },
    {
      id: 8,
      type: "mc",
      question: "The flower ___ seeds so that new plants can grow.",
      audio_url: "/audio/week27/grammar_ex8.mp3",
      options: ["produces", "produce", "producing", "produced"],
      answer: "produces",
      explanation_en: "Subject is 'The flower' (it = singular), so add -s: produces."
    },
    {
      id: 9,
      type: "mc",
      question: "___, a beautiful flower blooms at the top of the plant.",
      audio_url: "/audio/week27/grammar_ex9.mp3",
      options: ["Finally", "First", "Next", "Before that"],
      answer: "Finally",
      explanation_en: "'Finally' signals the last step in a sequence."
    },
    {
      id: 10,
      type: "mc",
      question: "A plant ___ not grow without water.",
      audio_url: "/audio/week27/grammar_ex10.mp3",
      options: ["does", "do", "is", "are"],
      answer: "does",
      explanation_en: "Negative Present Simple: do/does + not. 'A plant' (singular) = does not / doesn't."
    },
    {
      id: 11,
      type: "mc",
      question: "The root ___ deep into the soil to find water.",
      audio_url: "/audio/week27/grammar_ex11.mp3",
      options: ["reaches", "reach", "reaching", "reached"],
      answer: "reaches",
      explanation_en: "Subject is 'The root' (it = singular). Reach → Reaches (-es after -ch)."
    },
    {
      id: 12,
      type: "mc",
      question: "Seeds ___ in warm, moist conditions.",
      audio_url: "/audio/week27/grammar_ex12.mp3",
      options: ["germinate", "germinates", "germinating", "germinated"],
      answer: "germinate",
      explanation_en: "Subject is 'Seeds' (plural/they), so no -s: germinate."
    },
    {
      id: 13,
      type: "mc",
      question: "After that, the leaves ___ out and collect sunlight.",
      audio_url: "/audio/week27/grammar_ex13.mp3",
      options: ["spread", "spreads", "spreading", "spread out"],
      answer: "spread",
      explanation_en: "Subject is 'the leaves' (plural/they), so no -s: spread."
    },
    {
      id: 14,
      type: "mc",
      question: "It ___ about three days for a bean seed to germinate.",
      audio_url: "/audio/week27/grammar_ex14.mp3",
      options: ["takes", "take", "taking", "took"],
      answer: "takes",
      explanation_en: "Subject is 'It' (singular), so add -s: takes."
    },
    {
      id: 15,
      type: "mc",
      question: "Plants ___ carbon dioxide and release oxygen during photosynthesis.",
      audio_url: "/audio/week27/grammar_ex15.mp3",
      options: ["absorb", "absorbs", "absorbing", "absorbed"],
      answer: "absorb",
      explanation_en: "Subject is 'Plants' (plural/they), so no -s: absorb."
    },
    {
      id: 16,
      type: "mc",
      question: "The soil ___ nutrients that help the plant grow strong.",
      audio_url: "/audio/week27/grammar_ex16.mp3",
      options: ["contains", "contain", "containing", "contained"],
      answer: "contains",
      explanation_en: "Subject is 'The soil' (it = singular), so add -s: contains."
    },
    {
      id: 17,
      type: "mc",
      question: "Green leaves ___ the plant's color and collect sunlight.",
      audio_url: "/audio/week27/grammar_ex17.mp3",
      options: ["give", "gives", "giving", "gave"],
      answer: "give",
      explanation_en: "Subject is 'Green leaves' (plural/they), so no -s: give."
    },
    {
      id: 18,
      type: "mc",
      question: "A seed ___ not need sunlight to germinate — it needs warmth and water.",
      audio_url: "/audio/week27/grammar_ex18.mp3",
      options: ["does", "do", "is", "are"],
      answer: "does",
      explanation_en: "Negative Present Simple: does not (doesn't) + base verb. 'A seed' is singular."
    },
    {
      id: 19,
      type: "mc",
      question: "The sprout ___ toward the light through the soil.",
      audio_url: "/audio/week27/grammar_ex19.mp3",
      options: ["pushes", "push", "pushing", "pushed"],
      answer: "pushes",
      explanation_en: "Subject is 'The sprout' (it = singular). Push → Pushes (-es after -sh)."
    },
    {
      id: 20,
      type: "mc",
      question: "Flowers ___ insects like bees and butterflies.",
      audio_url: "/audio/week27/grammar_ex20.mp3",
      options: ["attract", "attracts", "attracting", "attracted"],
      answer: "attract",
      explanation_en: "Subject is 'Flowers' (plural/they), so no -s: attract."
    }
  ]
};
