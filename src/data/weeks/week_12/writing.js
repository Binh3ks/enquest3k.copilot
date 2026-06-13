export default {
  title: "The Talent Show",
  min_words: 45,
  hints: {
vocabulary_bank: {
      label_en: "Need help? Click next to each blank",
    label_vi: "Can ho tro? Bam ben canh moi o",
    show_by_default: false,
    scaffolding_stage: "medium",
    words: [
      { "word": "the school talent show", "vi": "buoi bieu dien tai nang cua truong", "distractor": false },
      { "word": "sing songs happily on stage", "vi": "hat bai hat vui ve tren san khau", "distractor": false },
      { "word": "the audience loves it", "vi": "khan gia rat thich", "distractor": false },
      { "word": "dance happily with energy and style", "vi": "nhay vui ve voi nang luong va phong cach", "distractor": false },
      { "word": "run fast around the track", "vi": "chay nhanh quanh duong dua", "distractor": false },
      { "word": "jump high", "vi": "nhay cao", "distractor": false },
      { "word": "draw pictures of animals and people", "vi": "ve tranh dong vat va nguoi", "distractor": false },
      { "word": "swim fast long distances without stopping", "vi": "boi nhanh quang duong dai khong ngung lai", "distractor": false },
      { "word": "cook simple meals", "vi": "nau mon an don gian", "distractor": false },
      { "word": "a tasty snack on stage", "vi": "mon an vat ngon tren san khau", "distractor": false },
      { "word": "special talents", "vi": "tai nang dac biet", "distractor": false },
      { "word": "every child has", "vi": "moi tre deu co", "distractor": false },
      { "word": "an empty stage", "vi": "san khau trong", "distractor": true },
      { "word": "boring performance", "vi": "bieu dien nham chan", "distractor": true },
      { "word": "no one claps", "vi": "khong ai vua tay", "distractor": true }
    ]
  }
  },
  sentence_frames: [
    {
      "template": "Today is ___! Many children showcase their amazing abilities on stage.",
      "answers": ["the school talent show"]
    },
    {
      "template": "Sarah can ___. ___ when she performs and the audience loves it.",
      "answers": ["sing songs happily on stage"]
    },
    {
      "template": "Tom can ___ and everyone watches him dance with energy and style.",
      "answers": ["dance happily with energy and style"]
    },
    {
      "template": "Mike can ___ faster than anyone in his grade.",
      "answers": ["run fast around the track"]
    },
    {
      "template": "Emma can ___ very high and she always lands safely.",
      "answers": ["jump high"]
    },
    {
      "template": "Lisa can ___ ___ ___ for her classmates.",
      "answers": ["draw pictures of animals and people"]
    },
    {
      "template": "Amy can ___ because she practices every day.",
      "answers": ["swim fast long distances without stopping"]
    },
    {
      "template": "David can ___. He prepares ___ for the show. ___ ___ ___! It is wonderful to see so many talents together.",
      "answers": ["cook simple meals", "a tasty snack on stage", "every child has", "special talents"]
    }
  ]
};
