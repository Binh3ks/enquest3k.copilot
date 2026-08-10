export default {
  "title": "How a Seed Grows into a Plant",
  "min_words": 60,
  "min_sentences": 8,
  "model_sentence": "The life cycle of a plant is one of nature's most fascinating processes and I am going to explain it step by step so you can understand exactly how a tiny seed becomes a beautiful flowering plant. First, a seed is carefully planted in warm and moist soil, where it is protected from cold temperatures and extreme weather until it is ready to germinate. The seed needs a combination of warmth, water, and oxygen to trigger the germination process, and once these conditions are right, the seed coat breaks open and a tiny white root pushes down into the soil. Next, a small green shoot pushes upward through the surface of the soil toward the sunlight, because all plants are drawn to light as their source of energy. Then, the shoot grows taller and produces its first pair of small green leaves, which begin to absorb sunlight through a process called photosynthesis. Finally, the plant matures, produces a bud, and eventually blooms into a beautiful flower that attracts bees and butterflies to spread its pollen.",
  "instruction_en": "Write a detailed scientific explanation of how a seed grows using sequence words!",
  "instruction_vi": "Viết giải thích khoa học chi tiết về cách hạt giống mọc dùng từ trình tự!",
  "prompt_en": "What are all the stages? What does the seed need at each stage? Why?",
  "prompt_vi": "Các giai đoạn là gì? Hạt cần gì ở mỗi giai đoạn? Tại sao?",
  "keywords": [
    "tiny seed",
    "good soil",
    "fresh water",
    "bright warm sun",
    "small hole",
    "strong root",
    "green stem",
    "warm sunlight",
    "broad green leaves",
    "bright yellow flower",
    "magical",
    "amazing life cycle"
  ],
  "topic_talk_prompt": "Explain the full life cycle of a plant from seed to flower in scientific detail!",
  "sentence_frames": [
    {
      "template": "First, the farmer digs a small ___ and puts a tiny little seed deep in the dark ___.",
      "answers": [
        "hole",
        "ground"
      ]
    },
    {
      "template": "Next, the plant slowly grows a strong ___ under the soil so it can find water and stay ___.",
      "answers": [
        "root",
        "firmly"
      ]
    },
    {
      "template": "Then, a thin green ___ grows up toward the warm ___.",
      "answers": [
        "stem",
        "sunlight"
      ]
    },
    {
      "template": "The stem gets taller and stronger every single ___ ___ .",
      "answers": [
        "day",
        "next"
      ]
    },
    {
      "template": "After that, many broad green ___ start to appear on the side of the ___.",
      "answers": [
        "leaves",
        "stem"
      ]
    },
    {
      "template": "They help the plant catch the beautiful ___ ___ .",
      "answers": [
        "sunlight",
        "slowly"
      ]
    },
    {
      "template": "Finally, a beautiful, bright ___ flower opens up fully in the warm summer ___.",
      "answers": [
        "yellow",
        "sun"
      ]
    },
    {
      "template": "I like planting small seeds in my own garden because I love watching the beautiful plants ___ and grow over ___.",
      "answers": [
        "change",
        "time"
      ]
    }
  ],
  "hints": {
    "vocabulary_bank": {
      "label_en": "Need help? Click next to each blank",
      "label_vi": "Cần trợ giúp? Bấm bên cạnh mỗi ô",
      "show_by_default": false,
      "scaffolding_stage": "medium",
      "words": [
        {
          "word": "small hole",
          "vi": "lỗ nhỏ",
          "distractor": false
        },
        {
          "word": "dark ground",
          "vi": "đất tối",
          "distractor": false
        },
        {
          "word": "strong root",
          "vi": "rễ chắc",
          "distractor": false
        },
        {
          "word": "green stem",
          "vi": "thân xanh",
          "distractor": false
        },
        {
          "word": "warm sunlight",
          "vi": "ánh nắng ấm",
          "distractor": false
        },
        {
          "word": "broad green leaves",
          "vi": "lá xanh rộng",
          "distractor": false
        },
        {
          "word": "bright yellow flower",
          "vi": "bông hoa vàng rực",
          "distractor": false
        },
        {
          "word": "warm summer sun",
          "vi": "mặt trời mùa hè ấm áp",
          "distractor": false
        },
        {
          "word": "wonderful flower",
          "vi": "bông hoa tuyệt vời",
          "distractor": false
        },
        {
          "word": "shining sun",
          "vi": "mặt trời rực rỡ",
          "distractor": false
        },
        {
          "word": "magical",
          "vi": "thần kỳ",
          "distractor": false
        },
        {
          "word": "amazed and happy",
          "vi": "ngạc nhiên và vui",
          "distractor": false
        },
        {
          "word": "my own garden",
          "vi": "vườn của tôi",
          "distractor": false
        },
        {
          "word": "darkness",
          "vi": "bóng tối",
          "distractor": true
        },
        {
          "word": "freezing cold soil",
          "vi": "đất lạnh cóng",
          "distractor": true
        }
      ]
    }
  },
  "story_prompts": {
    "picture_mode": {
      "type": "picture",
      "image_url": "/images/week27/story_writing_pic.jpg",
      "image_prompt": "In my science class this morning, I am learning all about nature and how different plants grow from tiny seeds. This beautiful picture clearly shows the amazing life cycle of a tall, yellow sunflower. A healthy plant always needs good soil, fresh water, and bright, warm sun to grow properly. Watercolor children book illustration style, soft pastel colors, friendly cartoon characters, cozy setting, no text on image.",
      "word_bank": [
        "tiny seed",
        "small hole",
        "dark ground",
        "strong root",
        "green stem",
        "warm sunlight",
        "broad green leaves",
        "bright yellow flower",
        "warm summer sun",
        "wonderful flower",
        "my own garden",
        "magical",
        "amazed and happy"
      ],
      "writing_prompts": {
        "en": "Look at the picture. Who can you see? Where are they? What are they doing? Use 3+ words from the word bank to describe the scene.",
        "vi": "Nhìn bức tranh. Bạn thấy ai? Họ ở đâu? Họ đang làm gì? Dùng 3+ từ trong ngân hàng từ để mô tả."
      },
      "rubric_tier": 1,
      "sentence_frames": [
        {
          "template": "First, you plant a tiny ___ ___",
          "answers": [
            "seed",
            "then"
          ]
        },
        {
          "template": "You put it in a small hole in the ___ ___",
          "answers": [
            "dark ground",
            "also"
          ]
        },
        {
          "template": "After a few days, a strong ___ ___",
          "answers": [
            "root grows",
            "so"
          ]
        },
        {
          "template": "Then a green ___ ___",
          "answers": [
            "stem appears",
            "next"
          ]
        },
        {
          "template": "The plant needs warm ___ ___",
          "answers": [
            "sunlight",
            "finally"
          ]
        },
        {
          "template": "Soon, broad green ___ ___",
          "answers": [
            "leaves grow",
            "slowly"
          ]
        },
        {
          "template": "Finally, a bright yellow ___ ___",
          "answers": [
            "flower blooms",
            "happily"
          ]
        },
        {
          "template": "The flower is truly ___ ___",
          "answers": [
            "magical",
            "carefully"
          ]
        }
      ]
    }
  }
};
