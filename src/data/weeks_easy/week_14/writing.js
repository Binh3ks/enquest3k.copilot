export default {
  title: "My Presentation Day",
  min_words: 30,
  vocabulary_bank: {
    label_en: "Need help? Click next to each blank",
    label_vi: "Can ho tro? Bam ben canh moi o",
    show_by_default: true,
    scaffolding_stage: "medium",
    words: [
      { "word": "8 years old", "vi": "8 tuoi", "distractor": false },
      { "word": "present my poster", "vi": "trinh bay poster", "distractor": false },
      { "word": "show you my world", "vi": "cho ban xem the gioi cua toi", "distractor": false },
      { "word": "my loving family", "vi": "gia dinh yeu thuong", "distractor": false },
      { "word": "love", "vi": "yeu", "distractor": false },
      { "word": "4 people", "vi": "4 nguoi", "distractor": false },
      { "word": "my mom, my dad, my sister, and me", "vi": "me, bo, chi, va toi", "distractor": false },
      { "word": "sing very well", "vi": "hat rat hay", "distractor": false },
      { "word": "dance happily", "vi": "nhay vui ve", "distractor": false },
      { "word": "drawing pictures of animals and flowers", "vi": "ve tranh dong vat va hoa", "distractor": false },
      { "word": "feel very confident", "vi": "cam thay tu tin", "distractor": false },
      { "word": "listen to me", "vi": "lang nghe toi", "distractor": false },
      { "word": "feel proud of my work", "vi": "tu hao ve cong viec", "distractor": false },
      { "word": "Thank you for listening", "vi": "Cam on da lang nghe", "distractor": false },
      { "word": "very special day", "vi": "ngay dac biet", "distractor": false },
      { "word": "have questions", "vi": "co cau hoi", "distractor": false },
      { "word": "terrible", "vi": "te hai", "distractor": true },
      { "word": "boring", "vi": "nham chan", "distractor": true },
      { "word": "sad", "vi": "buon", "distractor": true }
    ]
  },
  sentence_frames: [
    {
      "template": "Welcome to my presentation! My name is Emma. I am ___.",
      "answers": ["8 years old"]
    },
    {
      "template": "Today I ___ ___. I want to ___ ___ ___.",
      "answers": ["present my poster", "show you my world"]
    },
    {
      "template": "This is ___. I ___ my family. I have ___: ___.",
      "answers": ["my loving family", "love", "4 people", "my mom, my dad, my sister, and me"]
    },
    {
      "template": "I can ___. I can also ___. I am good at ___.",
      "answers": ["sing very well", "dance happily", "drawing pictures of animals and flowers"]
    },
    {
      "template": "I ___ ___ today. The audience ___.",
      "answers": ["feel very confident", "listen to me"]
    },
    {
      "template": "I ___ ___ ___. ___! This is my ___! Do you ___?",
      "answers": ["feel proud of my work", "Thank you for listening", "very special day", "have questions"]
    }
  ],

  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "low",
      words: [
        { "word": "made a snowman", "vi": "made a snowman", "distractor": false },
        { "word": "wore a big coat", "vi": "wore a big coat", "distractor": false },
        { "word": "walked in the snow", "vi": "walked in the snow", "distractor": false },
        { "word": "drank hot chocolate", "vi": "drank hot chocolate", "distractor": false },
        { "word": "skated on ice", "vi": "skated on ice", "distractor": false },
        { "word": "threw snowballs", "vi": "threw snowballs", "distractor": false },
        { "word": "caught a snowflake", "vi": "caught a snowflake", "distractor": false },
        { "word": "wore warm gloves", "vi": "wore warm gloves", "distractor": false },
        { "word": "a white winter day", "vi": "a white winter day", "distractor": false },
        { "word": "ran in cold wind", "vi": "ran in cold wind", "distractor": false },
        { "word": "felt very cold", "vi": "felt very cold", "distractor": false },
        { "word": "had rosy cheeks", "vi": "had rosy cheeks", "distractor": false },
        { "word": "built an igloo", "vi": "built an igloo", "distractor": false },
        { "word": "watched the snowfall", "vi": "watched the snowfall", "distractor": false },
        { "word": "ate a hot meal", "vi": "ate a hot meal", "distractor": false },
        { "word": "slept in a warm bed", "vi": "slept in a warm bed", "distractor": true },
        { "word": "woke up happy", "vi": "woke up happy", "distractor": true },
        { "word": "was very hungry", "vi": "was very hungry", "distractor": true }
      ]
    }
  },
};
