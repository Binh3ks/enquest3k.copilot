export default {
  title: "The Old Town Mystery",
  min_words: 55,
  min_sentences: 8,
  model_sentence: "Detective Luna loves mysteries. She found an old map of her town. On the old map, there was a local market near a long river with tall trees along the road. There was a wooden bridge over the river. Now the market is gone. There is a new bridge and new buildings. But the old temple still stands. Luna smiled and said, 'The past is still here if you look carefully!'",
  instruction_en: "Write about how a place has changed over time using was, were, there was, and however!",
  instruction_vi: "Viết về sự thay đổi của một nơi theo thời gian dùng was, were, there was và however!",
  prompt_en: "What was the place like before? What has changed? How do you feel about it?",
  prompt_vi: "Nơi đó trước đây thế nào? Điều gì đã thay đổi? Bạn cảm thấy thế nào?",
  topic_talk_prompt: "Describe a place that has changed — past vs present!",
  sentence_frames: [
    { "template": "Long ago, there ___", "answers": ["was a village"] },
    { "template": "Near the river, there ___", "answers": ["were trees"] },
    { "template": "Every morning, ___", "answers": ["people walked"] },
    { "template": "Now the town ___", "answers": ["is different"] },
    { "template": "But I think ___", "answers": ["the old days"] },
    { "template": "Sometimes, I wish ___", "answers": ["I could visit"] }
  ],
  scaffolding_stage: "medium-low",
  vocabulary_bank: [
    "old map",
    "local market",
    "long river",
    "tall trees",
    "along the road",
    "old temple",
    "wooden bridge",
    "over the river",
    "new tall buildings",
    "big new bridge",
    "still stands",
    "stood in front of the temple"
  ],
  story_prompts: {
    picture_mode: {
      type: 'picture',
      image_url: '/images/week20/story_writing_pic.jpg',
      image_prompt: "My father is telling me a fascinating story about his old village. Long ago, the town was very different from how it looks today. There were no modern cars, and there were no tall glass buildings anywhere. Watercolor children book illustration style, soft pastel colors, friendly cartoon characters, cozy setting, no text on image.",
      word_bank: [
        "old village",
        "long ago",
        "modern cars",
        "glass buildings",
        "ancient temple",
        "winding blue river",
        "leafy trees",
        "narrow dirt roads",
        "busy outdoor market",
        "friendly people",
        "fresh fruits",
        "colorful vegetables",
        "wooden bridge",
        "tall modern buildings",
        "peaceful and beautiful"
      ],
      writing_prompts: {
        en: "Look at the picture. The story is about an old village that has changed. Describe what the old town was like long ago using 'there was' and 'there were'. What is there now?",
        vi: "Nhìn bức tranh. Câu chuyện kể về một ngôi làng xưa đã thay đổi. Hãy mô tả thị trấn cũ ngày xưa dùng 'there was' và 'there were'. Bây giờ có gì?"
      },
      rubric_tier: 1,
      min_sentences: 8,
      sentence_frames: [
        { "template": "Long ago, there ___", "answers": ["was a village"] },
        { "template": "Near the river, there ___", "answers": ["were trees"] },
        { "template": "Every morning, ___", "answers": ["people walked"] },
        { "template": "Now the town ___", "answers": ["is different"] },
        { "template": "But I think ___", "answers": ["the old days"] },
        { "template": "Sometimes, I wish ___", "answers": ["I could visit"] }
      ]
    }
  }
}