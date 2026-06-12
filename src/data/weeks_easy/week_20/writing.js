export default {
  title: "The Old Town Long Ago",
  min_words: 40,
  min_sentences: 6,
  model_sentence: "Last year there was a small local market near the river. There were tall trees along the road. There was a wooden bridge. Now there is a new bridge and new buildings. The old temple still stands. The past is still here if you look carefully!",
  instruction_en: "Write about how your neighbourhood has changed!",
  instruction_vi: "Viết về khu phố của bạn đã thay đổi như thế nào!",
  prompt_en: "What was there before? What is there now? How is it different?",
  prompt_vi: "Trước đây có gì? Bây giờ có gì? Nó khác nhau thế nào?",
  topic_talk_prompt: "Describe your neighbourhood — now and before!",
  show_by_default: true,
  scaffolding_stage: "medium-low",
  vocabulary_bank: [
    "old village",
    "long ago",
    "ancient temple",
    "winding river",
    "leafy trees",
    "narrow dirt roads",
    "busy market",
    "wooden bridge",
    "modern buildings",
    "peaceful and beautiful"
  ],
  sentence_frames: [
    { "template": "Long ago, there ___", "answers": ["was a village"] },
    { "template": "Near the river, there ___", "answers": ["were trees"] },
    { "template": "Every morning, ___", "answers": ["people walked"] },
    { "template": "Now the town ___", "answers": ["is different"] },
    { "template": "Sometimes, I wish ___", "answers": ["I could visit"] }
  ],
  story_prompts: {
    picture_mode: {
      type: 'picture',
      image_url: '/images/week20/story_writing_pic.jpg',
      image_prompt: "My father is telling me a fascinating story about his old village. Long ago, the town was very different from how it looks today. There were no modern cars, and there were no tall glass buildings anywhere. Watercolor children book illustration style, soft pastel colors, friendly cartoon characters, cozy setting, no text on image.",
      word_bank: [
        "old village",
        "long ago",
        "ancient temple",
        "winding river",
        "leafy trees",
        "narrow dirt roads",
        "busy market",
        "wooden bridge",
        "modern buildings",
        "peaceful and beautiful"
      ],
      writing_prompts: {
        en: "Look at the picture. What can you see? How was the town long ago? How is it different now? Use 3+ words from the word bank to describe the scene.",
        vi: "Nhìn bức tranh. Bạn thấy gì? Thị trấn từ xưa như thế nào? Bây giờ khác gì? Dùng 3+ từ trong ngân hàng từ để mô tả."
      },
      rubric_tier: 1,
      sentence_frames: [
        { "template": "Long ago, there ___", "answers": ["was a village"] },
        { "template": "Near the river, there ___", "answers": ["were trees"] },
        { "template": "Every morning, ___", "answers": ["people walked"] },
        { "template": "Now the town ___", "answers": ["is different"] },
        { "template": "Sometimes, I wish ___", "answers": ["I could visit"] }
      ]
    }
  }
}
