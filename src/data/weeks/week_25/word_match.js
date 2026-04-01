export default {
  title: "Word Match: Sequencing Actions",
  image_url: "/images/week25/wordmatch_cover_w25.jpg",
  audio_url: "/audio/week25/wordmatch_main.mp3",
  instruction_en: "Match each word or phrase to its meaning or pair.",
  instruction_vi: "Nối mỗi từ hoặc cụm từ với nghĩa hoặc cặp của nó.",
  sets: [
    {
      id: "sequence_connectors",
      label_en: "Connector Order",
      label_vi: "Thứ tự từ nối",
      pairs: [
        { left: "First", right: "step 1 — the beginning" },
        { left: "Next", right: "step 2 — right after first" },
        { left: "Then", right: "step 3+ — a middle step" },
        { left: "Finally", right: "the last step — the end" },
        { left: "Lastly", right: "another word for Finally" },
        { left: "After that", right: "another word for Then / Next" }
      ]
    },
    {
      id: "action_words",
      label_en: "Word to Definition",
      label_vi: "Từ và nghĩa",
      pairs: [
        { left: "spread", right: "put thinly and evenly on a surface" },
        { left: "squeeze", right: "press firmly to push liquid out" },
        { left: "rinse", right: "wash with clean water" },
        { left: "slice", right: "a thin flat piece cut from food" },
        { left: "pour", right: "make liquid flow into a container" },
        { left: "tidy", right: "make a place clean and organized" }
      ]
    },
    {
      id: "vietnamese",
      label_en: "English to Vietnamese",
      label_vi: "Anh – Việt",
      pairs: [
        { left: "bread", right: "bánh mì" },
        { left: "jam", right: "mứt" },
        { left: "knife", right: "dao" },
        { left: "toothpaste", right: "kem đánh răng" },
        { left: "sequence", right: "trình tự" },
        { left: "step", right: "bước" },
        { left: "brush", right: "bàn chải / chải" }
      ]
    }
  ]
};
