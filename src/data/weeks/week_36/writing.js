export default {
  title: "The Submarine Buoyancy Rescue & Silk Road Writing",
  title_en: "The Submarine Buoyancy Rescue & Silk Road Writing",
  prompt_en: "Write a complete story about how Leo applied Archimedes buoyancy principle to float the 150 kg chest, or how Marco Polo traveled the Silk Road.",
  prompt_vi: "Viết một câu chuyện hoàn chỉnh về cách Leo áp dụng nguyên lý lực đẩy Archimedes để nâng rương 150kg, hoặc cách Marco Polo du hành Con đường Tơ lụa.",
  sentence_frames: [
    { template: "On a sunny Sunday afternoon, Leo dove into a deep ocean cavern in a ___." },
    { template: "They found an ancient wooden chest weighing ___ kilograms on the seabed." },
    { template: "To float the heavy chest, Leo applied Archimedes ___ principle." },
    { template: "He calculated that displacing 150 litres of seawater created 150 kg of ___." },
    { template: "He attached inflatable lift bags to ___ 150 litres of seawater." },
    { template: "The lift bags expanded and brought the heavy chest safely to the ___." },
    { template: "Inside the chest, they discovered a preserved 16th-century gold ___." },
    { template: "They presented the historical gold compass to the maritime ___." }
  ],
  hints: {
    words: [
      { word: "submarine", meaning_vi: "tàu ngầm" },
      { word: "buoyancy", meaning_vi: "lực đẩy nổi" },
      { word: "displace", meaning_vi: "dịch chuyển nước" },
      { word: "cavern", meaning_vi: "hang động ngầm" },
      { word: "compass", meaning_vi: "la bàn" },
      { word: "merchant", meaning_vi: "thương gia" },
      { word: "diplomat", meaning_vi: "nhà ngoại giao" },
      { word: "titanium", meaning_vi: "kim loại titan" },
      { word: "airplane", meaning_vi: "máy bay", distractor: true },
      { word: "skyscraper", meaning_vi: "tòa nhà cao tầng", distractor: true }
    ]
  },
  story_prompts: {
    picture_mode: {
      type: "picture",
      image_url: "/images/week36/story_writing_pic.jpg",
      image_prompt: "A yellow research submarine in a deep blue underwater ocean cavern using mechanical arms to attach red inflatable lift bags to an ancient wooden treasure chest resting on the seabed.",
      word_bank: ["submarine", "buoyancy", "displace", "cavern", "chest", "compass", "inflatable lift bags", "upward lift", "gold compass", "maritime museum", "neutral buoyancy", "titanium hull"],
      sentence_frames: [
        { template: "On a sunny Sunday afternoon, Leo dove into a deep ocean cavern in a ___.", answers: ["submarine"] },
        { template: "They found an ancient wooden chest weighing ___ kilograms on the seabed.", answers: ["150"] },
        { template: "To float the heavy chest, Leo applied Archimedes ___ principle.", answers: ["buoyancy"] },
        { template: "He calculated that displacing 150 litres of seawater created 150 kg of ___.", answers: ["upward lift"] },
        { template: "He attached inflatable lift bags to ___ 150 litres of seawater.", answers: ["displace"] },
        { template: "The lift bags expanded and brought the heavy chest safely to the ___.", answers: ["surface"] },
        { template: "Inside the chest, they discovered a preserved 16th-century gold ___.", answers: ["compass"] },
        { template: "They presented the historical gold compass to the maritime ___.", answers: ["museum"] }
      ],
      writing_prompts: {
        en: "Look at the underwater picture! Write a creative story (60+ words, 8+ sentences) about how Leo's submarine crew attached lift bags, displaced seawater to create buoyancy, and rescued the ancient gold compass from the ocean cavern.",
        vi: "Nhìn vào bức ảnh dưới biển! Viết một câu chuyện sáng tạo (60+ từ, 8+ câu) về cách thủy thủ đoàn tàu ngầm Leo gắn túi nâng, làm dịch chuyển nước biển để tạo lực nổi, và giải cứu chiếc la bàn vàng cổ từ hang động ngầm."
      }
    },
    topic_mode: {
      topics: [
        {
          id: "t1",
          title_en: "The Submarine Physics Rescue",
          en: "Describe how Leo applied Archimedes buoyancy principle to lift the 150 kg chest using compressed air bags.",
          vi: "Mô tả cách Leo áp dụng nguyên lý lực đẩy Archimedes để nâng chiếc rương 150kg bằng túi khí nén.",
          word_bank: ["submarine", "buoyancy", "displace", "cavern", "compass"]
        },
        {
          id: "t2",
          title_en: "Marco Polo's Silk Road Odyssey",
          en: "Write about Marco Polo's 24-year journey across Asia and his work as a diplomat for Kublai Khan.",
          vi: "Viết về chuyến đi 24 năm qua châu Á của Marco Polo và công việc làm sứ giả cho Hốt Tất Liệt.",
          word_bank: ["merchant", "diplomat", "Silk Road", "manuscript", "explorer"]
        }
      ]
    }
  }
};