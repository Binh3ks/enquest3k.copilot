export default {
  title: "Detective Nova's Case Interview",
  min_words: 45,
  instruction_en: "Write about a detective interview using past tense and time expressions!",
  instruction_vi: "Viết về cuộc phỏng vấn thám tử dùng thì quá khứ và các cụm từ chỉ thời gian!",
  prompt_en: "What questions did Nova ask? How did the suspect answer? What was the final report?",
  prompt_vi: "Nova đã hỏi câu nào? Nghi phạm trả lời thế nào? Báo cáo cuối cùng là gì?",
  topic_talk_prompt: "Tell me about a detective interview — what questions were asked and how were they answered?",
  sentence_frames: [
    {
      "template": "Nova was working on a difficult case in the old town of **Hoi An**, Vietnam. She was very careful.",
      "answers": [
        "Hoi An"
      ]
    },
    {
      "template": "She arrived at the scene and opened her notebook immediately. The **narrow lantern-lit streets** were quiet.",
      "answers": [
        "narrow lantern-lit streets"
      ]
    },
    {
      "template": "Nova began the interview calmly. She had three questions for the suspect.",
      "answers": [
        "began the interview calmly"
      ]
    },
    {
      "template": "'Where were you **yesterday morning**?' The suspect **answered clearly** and **without hesitation**.",
      "answers": [
        "yesterday morning",
        "answered clearly",
        "without hesitation"
      ]
    },
    {
      "template": "Nova **wrote every answer** as a new clue **in her notebook**.",
      "answers": [
        "wrote every answer",
        "in her notebook"
      ]
    },
    {
      "template": "She asked next: 'What did you do **last night** and **last week**?' Again, the suspect **answered clearly**.",
      "answers": [
        "last night",
        "last week",
        "answered clearly"
      ]
    },
    {
      "template": "Nova **studied each clue carefully** in the warm lantern light.",
      "answers": [
        "studied each clue carefully"
      ]
    },
    {
      "template": "Finally, Nova organized the case file and wrote her final report. She **had solved the case** once again!",
      "answers": [
        "had solved the case"
      ]
    }
  ],
  scaffolding_stage: "medium",
  vocabulary_bank: [
    "Hoi An",
    "narrow lantern-lit streets",
    "began the interview calmly",
    "yesterday morning",
    "answered clearly",
    "without hesitation",
    "wrote every answer",
    "in her notebook",
    "last night",
    "last week",
    "studied each clue carefully",
    "had solved the case"
  ],
  story_prompts: {
    picture_mode: {
      type: "picture",
      image_url: "/images/week22/story_writing_pic.jpg",
      image_prompt: "A student detective investigating a mystery.",
      word_bank: [],
      writing_prompts: {
        en: "Look at the picture. Who can you see? What are they doing? Use 3+ words from the word bank.",
        vi: "Nhìn bức tranh. Bạn thấy ai? Họ đang làm gì? Dùng 3+ từ trong ngân hàng từ."
      },
      rubric_tier: 1,
      min_sentences: 8,
      sentence_frames: [
        { "template": "First, ___" },
        { "template": "Then, ___" },
        { "template": "After that, ___" },
        { "template": "Finally, ___" }
      ]
    }
  }
}
