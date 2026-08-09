export default {
  prompts: [
    {
      id: 1,
      context_en: "Leo calculated that displacing 150 litres of seawater gives 150 kg of buoyant lift.",
      nova_says: "Ask me how compressed air inside lift bags raises a heavy submarine chest!",
      nova_says_vi: "Hãy hỏi tôi cách khí nén trong túi nâng giúp nâng chiếc rương ngầm nặng!",
      question_word_bank: ["How does air...", "What displaces...", "Why does buoyancy...", "How much lift..."],
      question_frame: "How does air displace seawater to create ___?",
      correctWord: "upward lift",
      hints: ["How does compressed air displace seawater?", "Why does displaced water create upward lift?", "How much buoyancy was needed?"]
    },
    {
      id: 2,
      context_en: "Marco Polo traveled for 24 years on the Silk Road connecting Europe and Asia.",
      nova_says: "Ask me what ancient goods and ideas Marco Polo discovered in China!",
      nova_says_vi: "Hãy hỏi tôi những hàng hóa và ý tưởng cổ xưa mà Marco Polo khám phá ở Trung Quốc!",
      question_word_bank: ["What goods did...", "How long did...", "Why did Marco...", "Where did Marco..."],
      question_frame: "What goods did Marco Polo ___ along the Silk Road?",
      correctWord: "discover",
      hints: ["What goods did Marco Polo discover?", "How long was Marco Polo's journey?", "Why did Kublai Khan appoint Marco as diplomat?"]
    },
    {
      id: 3,
      context_en: "Titanium submersibles dive nearly 11,000 metres into the Mariana Trench.",
      nova_says: "Ask me why submersibles need spherical titanium hulls to dive 11,000 metres!",
      nova_says_vi: "Hãy hỏi tôi tại sao tàu lặn cần vỏ titan hình cầu để lặn xuống 11.000 mét!",
      question_word_bank: ["Why do submersibles...", "How strong is...", "What material...", "How deep is..."],
      question_frame: "Why do submersibles need ___ to withstand water pressure?",
      correctWord: "spherical titanium hulls",
      hints: ["Why do submersibles need spherical titanium hulls?", "How strong is ocean pressure at Challenger Deep?", "What organisms live without sunlight?"]
    },
    {
      id: 4,
      context_en: "Leo's team donated the preserved 16th-century gold compass to the maritime museum.",
      nova_says: "Ask me why Leo presented the 16th-century gold compass to the museum!",
      nova_says_vi: "Hãy hỏi tôi tại sao Leo lại trao chiếc la bàn vàng thế kỷ 16 cho bảo tàng!",
      question_word_bank: ["Why did Leo...", "What artifact...", "How old was...", "Where is the..."],
      question_frame: "Why did Leo present the ___ to the maritime museum?",
      correctWord: "ancient gold compass",
      hints: ["Why did Leo present the gold compass to the museum?", "What artifact was found inside the chest?", "How was the compass preserved underwater?"]
    },
    {
      id: 5,
      context_en: "Deep ocean submersibles explore hydrothermal vent ecosystems without sunlight.",
      nova_says: "Ask me how bioluminescent creatures survive at hydrothermal vents without sunlight!",
      nova_says_vi: "Hãy hỏi tôi làm sao các sinh vật phát quang sinh sống ở miệng phun mà không có ánh mặt trời!",
      question_word_bank: ["How do creatures...", "What process...", "Why do vent species...", "Where do deep sea..."],
      question_frame: "How do bioluminescent creatures ___ in total darkness?",
      correctWord: "produce natural light",
      hints: ["How do bioluminescent creatures produce light?", "What energy source powers hydrothermal vents?", "How deep is the Mariana Trench?"]
    }
  ]
};