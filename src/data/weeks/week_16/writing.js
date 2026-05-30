export default {
  title: "My First Soccer Game",
  min_words: 45,
  vocabulary_bank: {
    label_en: "Need help? Click next to each blank",
    label_vi: "Can ho tro? Bam ben canh moi o",
    show_by_default: false,
    scaffolding_stage: "medium",
    words: [
      { "word": "very excited", "vi": "rat phan khich", "distractor": false },
      { "word": "coming to watch", "vi": "den xem", "distractor": false },
      { "word": "bringing his camera", "vi": "mang may anh", "distractor": false },
      { "word": "running very fast", "vi": "chay rat nhanh", "distractor": false },
      { "word": "kicking the ball", "vi": "sut bong", "distractor": false },
      { "word": "catching it with my foot", "vi": "bat bang chan", "distractor": false },
      { "word": "passing it to another friend", "vi": "chuyen bong cho ban khac", "distractor": false },
      { "word": "running to the goal", "vi": "chay ve phia khung thanh", "distractor": false },
      { "word": "has energy", "vi": "co nang luong", "distractor": false },
      { "word": "in motion", "vi": "dang chuyen dong", "distractor": false },
      { "word": "moving fast through the air", "vi": "di chuyen nhanh trong khong khi", "distractor": false },
      { "word": "playing soccer together", "vi": "choi bong cung nhau", "distractor": false },
      { "word": "working together", "vi": "lam viec cung nhau", "distractor": false },
      { "word": "cheering loudly", "vi": "co vu to", "distractor": false },
      { "word": "shouting with excitement", "vi": "het len voi phan khich", "distractor": false },
      { "word": "scoring a goal", "vi": "ghi ban thang", "distractor": false },
      { "word": "jumping up and down", "vi": "nhay len xuong", "distractor": false },
      { "word": "practice more", "vi": "luyen tap nhieu hon", "distractor": false },
      { "word": "playing soccer", "vi": "choi bong da", "distractor": false },
      { "word": "watching TV all day", "vi": "xem ti vi ca ngay", "distractor": true },
      { "word": "give up", "vi": "bo cuoc", "distractor": true },
      { "word": "hate soccer", "vi": "ghet bong da", "distractor": true }
    ]
  },
  sentence_frames: [
    {
      "template": "Today is my first soccer game! I am ___ ___. My mom is ___ ___ and my dad is ___ ___.",
      "answers": ["very excited", "coming to watch", "bringing his camera"]
    },
    {
      "template": "Look at me! I am ___ ___. My legs are moving quickly! My friend is ___ ___ ___. I am ___ ___ ___ ___.",
      "answers": ["running very fast", "kicking the ball", "to me", "catching it with my foot"]
    },
    {
      "template": "Now I am ___ ___ ___ ___. He is ___ ___ ___.",
      "answers": ["passing it to another friend", "running to the goal"]
    },
    {
      "template": "Wow! The ball ___ ___. It is ___ ___ ___ ___!",
      "answers": ["has energy", "in motion", "moving fast through the air"]
    },
    {
      "template": "Our team is ___ ___. Everyone is ___ ___ ___!",
      "answers": ["playing soccer together", "working together", "cheering loudly", "shouting with excitement"]
    },
    {
      "template": "Oh no! The other team is ___ ___. They are ___ ___ ___ ___ and they are happy.",
      "answers": ["scoring a goal", "jumping up and down"]
    },
    {
      "template": "I want to score a goal too! ___ ___, I will ___ ___ ___.",
      "answers": ["Next time", "practice more"]
    },
    {
      "template": "I love ___ ___! Soccer is the best sport in the world!",
      "answers": ["playing soccer"]
    }
  ]
};
