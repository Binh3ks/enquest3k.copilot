export default {
  prompts: [
    {
      id: 1,
      context_en: "Leo calculated that displacing 150 litres of seawater gives 150 kg of buoyant lift.",
      nova_says: "How does compressed air inside lift bags help raise a heavy submarine chest?",
      nova_says_vi: "Khí nén trong túi nâng giúp nâng chiếc rương ngầm nặng như thế nào?",
      question_word_bank: ["displaces water", "creates upward lift", "reduces overall density", "balances heavy weight"],
      question_frame: "Air displaces seawater to create ___ for the chest.",
      correctWord: "creates upward lift",
      hints: ["Air displaces water", "Displaced water creates lift", "Buoyant force balances weight"]
    },
    {
      id: 2,
      context_en: "Marco Polo traveled for 24 years on the Silk Road connecting Europe and Asia.",
      nova_says: "What goods and ideas did Marco Polo discover during his Silk Road journey?",
      nova_says_vi: "Marco Polo đã khám phá ra hàng hóa và ý tưởng gì trong chuyến đi Con đường Tơ lụa?",
      question_word_bank: ["paper money and silk", "merchant bazaars", "coal fuel usage", "diplomatic travel"],
      question_frame: "Marco Polo documented ___ across Asian trade routes.",
      correctWord: "paper money and silk",
      hints: ["Paper money and silk", "Persian merchant bazaars", "Chinese manuscripts"]
    },
    {
      id: 3,
      context_en: "Titanium submersibles dive nearly 11,000 metres into the Mariana Trench.",
      nova_says: "Why do ocean engineers build submersibles with spherical titanium hulls?",
      nova_says_vi: "Tại sao các kỹ sư đại dương lại chế tạo tàu lặn với vỏ titan hình cầu?",
      question_word_bank: ["distributes water pressure", "lightweight metal strength", "prevents hull collapse", "resists ocean force"],
      question_frame: "Spherical titanium hulls ___ evenly under deep pressure.",
      correctWord: "distributes water pressure",
      hints: ["Spheres distribute water pressure", "Titanium is strong and light", "Resists extreme pressure"]
    },
    {
      id: 4,
      context_en: "Leo's team donated the preserved 16th-century gold compass to the museum.",
      nova_says: "Why is it important to present ancient deep-sea artifacts to public museums?",
      nova_says_vi: "Tại sao việc trình bày cổ vật biển sâu cho các bảo tàng công cộng lại quan trọng?",
      question_word_bank: ["preserves historical knowledge", "teaches future generations", "honors ancient explorers", "shares scientific discoveries"],
      question_frame: "Presenting artifacts ___ for future generations.",
      correctWord: "preserves historical knowledge",
      hints: ["Preserves historical knowledge", "Teaches future generations", "Honors ancient explorers"]
    },
    {
      id: 5,
      context_en: "Deep ocean submersibles explore hydrothermal vent ecosystems without sunlight.",
      nova_says: "How do bioluminescent creatures and vent species thrive without sunlight?",
      nova_says_vi: "Các sinh vật phát quang và loài ở miệng phun sinh sống thế nào khi không có ánh sáng mặt trời?",
      question_word_bank: ["chemical energy synthesis", "natural light production", "extreme physical adaptation", "deep sea survival"],
      question_frame: "Deep sea creatures use ___ to survive without light.",
      correctWord: "chemical energy synthesis",
      hints: ["Chemical energy synthesis", "Natural light production", "Extreme adaptation"]
    }
  ]
};