export default {
  title: "My Talents",
  min_words: 30,
  vocabulary_bank: {
    label_en: "Need help? Click next to each blank",
    label_vi: "Can ho tro? Bam ben canh moi o",
    show_by_default: true,
    scaffolding_stage: "medium",
    words: [
      { "word": "many talents", "vi": "nhieu tai nang", "distractor": false },
      { "word": "sing happy songs", "vi": "hat bai hat vui", "distractor": false },
      { "word": "every day", "vi": "hang ngay", "distractor": false },
      { "word": "dance when I hear music", "vi": "nhay khi nghe nhac", "distractor": false },
      { "word": "run fast in the park", "vi": "chay nhanh o cong vien", "distractor": false },
      { "word": "with my friends", "vi": "voi ban be", "distractor": false },
      { "word": "jump over small boxes", "vi": "nhay qua nhung hop nho", "distractor": false },
      { "word": "climb on the playground", "vi": "leo tren san choi", "distractor": false },
      { "word": "draw pictures of my family", "vi": "ve tranh gia dinh", "distractor": false },
      { "word": "with colors", "vi": "voi mau sac", "distractor": false },
      { "word": "swim in the pool", "vi": "boi trong be", "distractor": false },
      { "word": "in summer", "vi": "vao mua he", "distractor": false },
      { "word": "cook with my mom", "vi": "nau an voi me", "distractor": false },
      { "word": "easy food", "vi": "mon an de lam", "distractor": false },
      { "word": "play games with my friends", "vi": "choi tro choi voi ban be", "distractor": false },
      { "word": "fly", "vi": "bay", "distractor": true },
      { "word": "already", "vi": "roi", "distractor": true },
      { "word": "hate", "vi": "ghet", "distractor": true }
    ]
  },
  sentence_frames: [
    {
      "template": "I have ___! I can ___ ___. I sing and have fun.",
      "answers": ["many talents", "sing happy songs", "every day"]
    },
    {
      "template": "I can also ___ when I hear music. I dance and laugh!",
      "answers": ["dance when I hear music"]
    },
    {
      "template": "I can ___ ___ ___. I run and play ___.",
      "answers": ["run fast in the park", "with my friends"]
    },
    {
      "template": "I can also ___ ___ and climb up high on the playground.",
      "answers": ["jump over small boxes"]
    },
    {
      "template": "I can ___ ___ ___. I draw with bright colors.",
      "answers": ["draw pictures of my family", "with colors"]
    },
    {
      "template": "I can also ___ ___ ___ and ___ ___ ___ with my mom. I have fun every day!",
      "answers": ["swim in the pool", "in summer", "cook with my mom", "easy food"]
    }
  ],

  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "low",
      words: [
        { "word": "read a book", "vi": "read a book", "distractor": false },
        { "word": "wrote a story", "vi": "wrote a story", "distractor": false },
        { "word": "painted a picture", "vi": "painted a picture", "distractor": false },
        { "word": "watched a movie", "vi": "watched a movie", "distractor": false },
        { "word": "listened to music", "vi": "listened to music", "distractor": false },
        { "word": "ate a sandwich", "vi": "ate a sandwich", "distractor": false },
        { "word": "played in the park", "vi": "played in the park", "distractor": false },
        { "word": "made a sandcastle", "vi": "made a sandcastle", "distractor": false },
        { "word": "swam in the pool", "vi": "swam in the pool", "distractor": false },
        { "word": "slept all afternoon", "vi": "slept all afternoon", "distractor": false },
        { "word": "baked a cake", "vi": "baked a cake", "distractor": false },
        { "word": "cleaned the room", "vi": "cleaned the room", "distractor": false },
        { "word": "washed the dishes", "vi": "washed the dishes", "distractor": false },
        { "word": "walked the dog", "vi": "walked the dog", "distractor": false },
        { "word": "fed the cat", "vi": "fed the cat", "distractor": false },
        { "word": "called grandma", "vi": "called grandma", "distractor": true },
        { "word": "bought a gift", "vi": "bought a gift", "distractor": true },
        { "word": "opened a present", "vi": "opened a present", "distractor": true }
      ]
    }
  },
};
