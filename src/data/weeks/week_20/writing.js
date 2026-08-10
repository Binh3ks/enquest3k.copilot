export default {
  "title": "The Old Town Mystery",
  "min_words": 55,
  "min_sentences": 8,
  "model_sentence": "Detective Luna found an old map of her town. The map was from one hundred years ago! word1. On the old map, there was a big market near the long river. There were tall trees along the road. At the end of the road there was a beautiful old temple. There was a wooden bridge over the river. However, now there are new tall buildings where the old market was. There is a big new bridge but not many trees. word1 at school.",
  "instruction_en": "Write about how a place has changed over time using was, were, there was, and however!",
  "instruction_vi": "Viết về sự thay đổi của một nơi theo thời gian dùng was, were, there was và however!",
  "prompt_en": "What was the place like before? What has changed? How do you feel about it?",
  "prompt_vi": "Nơi đó trước đây thế nào? Điều gì đã thay đổi? Bạn cảm thấy thế nào?",
  "topic_talk_prompt": "Describe a place that has changed — past vs present!",
  "sentence_frames": [
    {
      "template": "Detective Luna ___ an old ___ of her town.",
      "answers": [
        "found",
        "map"
      ]
    },
    {
      "template": "The map ___ from one ___ years ago! word1.",
      "answers": [
        "was",
        "hundred"
      ]
    },
    {
      "template": "On the ___ map, there ___ a big market near the long river.",
      "answers": [
        "old",
        "was"
      ]
    },
    {
      "template": "There were ___ trees along ___ road.",
      "answers": [
        "tall",
        "the"
      ]
    },
    {
      "template": "At the ___ of the ___ there was a beautiful old temple.",
      "answers": [
        "end",
        "road"
      ]
    },
    {
      "template": "There was ___ wooden bridge ___ the river.",
      "answers": [
        "a",
        "over"
      ]
    },
    {
      "template": "However, now ___ are new ___ buildings where the old market was.",
      "answers": [
        "there",
        "tall"
      ]
    },
    {
      "template": "There is ___ big new ___ but not many trees. word1 at school.",
      "answers": [
        "a",
        "bridge"
      ]
    }
  ],
  "hints": {
    "vocabulary_bank": {
      "label_en": "💡 Need help? Click 💡 next to each blank",
      "label_vi": "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      "show_by_default": false,
      "scaffolding_stage": "medium",
      "words": [
        {
          "word": "old village",
          "vi": "làng cổ",
          "distractor": false
        },
        {
          "word": "long ago",
          "vi": "cách đây lâu",
          "distractor": false
        },
        {
          "word": "modern cars",
          "vi": "xe hơi hiện đại",
          "distractor": false
        },
        {
          "word": "glass buildings",
          "vi": "tòa nhà kính",
          "distractor": false
        },
        {
          "word": "ancient temple",
          "vi": "ngôi đền cổ",
          "distractor": false
        },
        {
          "word": "winding blue river",
          "vi": "sông xanh uốn khúc",
          "distractor": false
        },
        {
          "word": "leafy trees",
          "vi": "cây lá xanh",
          "distractor": false
        },
        {
          "word": "narrow dirt roads",
          "vi": "đường đất nhỏ",
          "distractor": false
        },
        {
          "word": "busy outdoor market",
          "vi": "chợ ngoài trời nhộn nhịp",
          "distractor": false
        },
        {
          "word": "friendly people",
          "vi": "người dân thân thiện",
          "distractor": false
        },
        {
          "word": "fresh fruits",
          "vi": "trái cây tươi",
          "distractor": false
        },
        {
          "word": "colorful vegetables",
          "vi": "rau củ đa dạng",
          "distractor": false
        },
        {
          "word": "wooden bridge",
          "vi": "cầu gỗ",
          "distractor": false
        },
        {
          "word": "tall modern buildings",
          "vi": "tòa nhà hiện đại cao",
          "distractor": false
        },
        {
          "word": "peaceful and beautiful",
          "vi": "yên bình và đẹp",
          "distractor": false
        },
        {
          "word": "bought some flowers",
          "vi": "mua hoa",
          "distractor": true
        },
        {
          "word": "ate some fruit",
          "vi": "ăn trái cây",
          "distractor": true
        },
        {
          "word": "watched the river",
          "vi": "nhìn sông",
          "distractor": true
        }
      ]
    }
  },
  "story_prompts": {
    "picture_mode": {
      "type": "picture",
      "image_url": "/images/week20/story_writing_pic.jpg",
      "image_prompt": "My father is telling me a fascinating story about his old village. Long ago, the town was very different from how it looks today. There were no modern cars, and there were no tall glass buildings anywhere. Watercolor children book illustration style, soft pastel colors, friendly cartoon characters, cozy setting, no text on image.",
      "word_bank": [
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
      "writing_prompts": {
        "en": "Look at the picture. The story is about an old village that has changed. Describe what the old town was like long ago using 'there was' and 'there were'. What is there now?",
        "vi": "Nhìn bức tranh. Câu chuyện kể về một ngôi làng xưa đã thay đổi. Hãy mô tả thị trấn cũ ngày xưa dùng 'there was' và 'there were'. Bây giờ có gì?"
      },
      "rubric_tier": 1,
      "min_sentences": 8,
      "sentence_frames": [
        {
          "template": "Long ago, there ___ ___",
          "answers": [
            "was an old village",
            "then"
          ]
        },
        {
          "template": "Near the river, ___ ___",
          "answers": [
            "there was a market",
            "also"
          ]
        },
        {
          "template": "There were ___ ___",
          "answers": [
            "leafy trees",
            "so"
          ]
        },
        {
          "template": "There was a ___ ___",
          "answers": [
            "wooden bridge",
            "next"
          ]
        },
        {
          "template": "But now, ___ ___",
          "answers": [
            "there are tall buildings",
            "finally"
          ]
        },
        {
          "template": "The old temple ___ ___",
          "answers": [
            "still stands",
            "slowly"
          ]
        },
        {
          "template": "I think the old village was ___ ___",
          "answers": [
            "peaceful and beautiful",
            "happily"
          ]
        },
        {
          "template": "I wish ___ ___",
          "answers": [
            "I could go back",
            "carefully"
          ]
        }
      ]
    }
  }
};
