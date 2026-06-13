export default {
  title: "My First Soccer Game",
  min_words: 30,
  vocabulary_bank: {
    label_en: "Need help? Click next to each blank",
    label_vi: "Can ho tro? Bam ben canh moi o",
    show_by_default: true,
    scaffolding_stage: "medium",
    words: [
      { "word": "very excited", "vi": "rat phan khich", "distractor": false },
      { "word": "running very fast", "vi": "chay rat nhanh", "distractor": false },
      { "word": "kicking the ball", "vi": "sut bong", "distractor": false },
      { "word": "catching it", "vi": "bat no", "distractor": false },
      { "word": "passing it", "vi": "chuyen no", "distractor": false },
      { "word": "has energy", "vi": "co nang luong", "distractor": false },
      { "word": "in motion", "vi": "dang chuyen dong", "distractor": false },
      { "word": "moving fast", "vi": "di chuyen nhanh", "distractor": false },
      { "word": "playing soccer", "vi": "choi bong", "distractor": false },
      { "word": "cheering loudly", "vi": "co vu to", "distractor": false },
      { "word": "shout with excitement", "vi": "het len voi vui", "distractor": false },
      { "word": "throw the ball", "vi": "nem bong", "distractor": false },
      { "word": "use my feet", "vi": "dung chan", "distractor": false },
      { "word": "wrong", "vi": "sai roi", "distractor": false },
      { "word": "scoring a goal", "vi": "ghi ban", "distractor": false },
      { "word": "jumping up and down", "vi": "nhay len xuong", "distractor": false },
      { "word": "comes to watch", "vi": "den xem", "distractor": false },
      { "word": "takes photos", "vi": "chup anh", "distractor": false },
      { "word": "drink water", "vi": "uong nuoc", "distractor": false },
      { "word": "sleep", "vi": "ngu", "distractor": true },
      { "word": "hate soccer", "vi": "ghet bong", "distractor": true },
      { "word": "give up", "vi": "bo cuoc", "distractor": true }
    ]
  },
  sentence_frames: [
    {
      "template": "Today is my first soccer game! I am ___!",
      "answers": ["very excited"]
    },
    {
      "template": "Look! I am ___ ___. My legs are moving fast. This is fun!",
      "answers": ["running very fast"]
    },
    {
      "template": "My friend is ___ ___. I am ___ ___.",
      "answers": ["kicking the ball", "catching it"]
    },
    {
      "template": "Now I am ___. The ball ___ ___. It is ___!",
      "answers": ["passing it", "has energy", "in motion"]
    },
    {
      "template": "Our team is ___ ___. Everyone is ___ ___ ___!",
      "answers": ["playing soccer", "cheering loudly", "shout with excitement"]
    },
    {
      "template": "Oh no! I ___ ___ ___. That is ___! In soccer I can only ___ ___. The other team is ___ ___. They are ___ ___ ___! I want to score a goal too!",
      "answers": ["throw the ball", "wrong", "use my feet", "scoring a goal", "jumping up and down"]
    }
  ]
,
  story_prompts: {
    picture_mode: {
      type: "picture",
      image_url: "/images/week16/story_writing_pic.jpg",
      image_prompt: "A simple picture for week 16 story writing.",
      word_bank: [],
      writing_prompts: {
        en: "Look at the picture. What can you see? Write simply.",
        vi: "Nhìn bức tranh. Bạn thấy gì? Viết đơn giản."
      },
      rubric_tier: 1,
      min_sentences: 6,
      sentence_frames: [
        {"template": "At the track, ___", "answers": ["students are running"]},
        {"template": "On the field, ___", "answers": ["the game is exciting"]},
        {"template": "Meanwhile, ___", "answers": ["the crowd is cheering"]},
        {"template": "After the race, ___", "answers": ["everyone celebrates"]}
      ]
    }
  }
}
