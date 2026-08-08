// WEEK 36: Writing Station — Advanced Mode

export default {
  hints: {
    words: [
      { word: "submarine", meaning_vi: "tàu ngầm" },
      { word: "buoyancy", meaning_vi: "lực đẩy nổi" },
      { word: "displace", meaning_vi: "dịch chuyển nước" },
      { word: "cavern", meaning_vi: "hang động ngầm" },
      { word: "compass", meaning_vi: "la bàn" },
      { word: "merchant", meaning_vi: "thương gia" },
      { word: "diplomat", meaning_vi: "nhà ngoại giao" },
      { word: "airplane", meaning_vi: "máy bay", distractor: true },
      { word: "skyscraper", meaning_vi: "tòa nhà cao tầng", distractor: true }
    ]
  },
  story_prompts: {
    picture_mode: {
      type: "picture",
      image_url: "/images/week36/read_stem_w36.jpg",
      word_bank: ["submarine", "buoyancy", "displace", "chest", "compass"],
      sentence_frames: [
        "On Sunday afternoon, Leo dove into an underwater cavern in a ___.",
        "To float the 150 kg chest, he applied Archimedes ___ principle.",
        "He attached lift bags to ___ 150 litres of seawater."
      ],
      writing_prompts: {
        en: "Write a short paragraph about how Leo used buoyancy and physics to lift an ancient chest from the ocean floor.",
        vi: "Viết một đoạn văn ngắn về cách Leo sử dụng lực đẩy nổi và vật lý để nâng rương cổ lên từ đáy đại dương."
      }
    }
  }
};
