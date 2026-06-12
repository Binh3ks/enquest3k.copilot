export default {
  title: "My Special Presentation Day",
  min_words: 45,
  vocabulary_bank: {
    label_en: "Need help? Click next to each blank",
    label_vi: "Can ho tro? Bam ben canh moi o",
    show_by_default: false,
    scaffolding_stage: "medium",
    words: [
      { "word": "share my world", "vi": "chia se the gioi cua toi", "distractor": false },
      { "word": "present my poster", "vi": "trinh bay poster cua toi", "distractor": false },
      { "word": "my loving family", "vi": "gia dinh yeu thuong cua toi", "distractor": false },
      { "word": "4 people", "vi": "4 nguoi", "distractor": false },
      { "word": "my mom, my dad, my sister, and me", "vi": "me, bo, chi giai va toi", "distractor": false },
      { "word": "sing very well", "vi": "hat rat gioi", "distractor": false },
      { "word": "dance when happy", "vi": "nhay khi vui", "distractor": false },
      { "word": "drawing pictures", "vi": "ve tranh", "distractor": false },
      { "word": "stand here", "vi": "dung day", "distractor": false },
      { "word": "feel very confident", "vi": "cam thay rat tu tin", "distractor": false },
      { "word": "because the audience", "vi": "vi khan gia", "distractor": false },
      { "word": "listen carefully", "vi": "lang nghe cam than", "distractor": false },
      { "word": "introduce myself", "vi": "gioi thieu ban than", "distractor": false },
      { "word": "with a big smile", "vi": "voi nu cuoi lon", "distractor": false },
      { "word": "describe my project in detail", "vi": "mo ta du an cua toi chi tiet", "distractor": false },
      { "word": "so proud of my work", "vi": "rat tu hao ve cong viec cua toi", "distractor": false },
      { "word": "Thank you for listening", "vi": "Cam on ban da lang nghe", "distractor": false },
      { "word": "a terrible disaster", "vi": "thao hoa te hai", "distractor": true },
      { "word": "nervous and confused", "vi": "lo lang va hoi hop", "distractor": true },
      { "word": "no one listens", "vi": "khong ai lang nghe", "distractor": true }
    ]
  },
  sentence_frames: [
    {
      "template": "Welcome to my presentation! My name is Emma and I am 8 years old. Today I ___ because I want to ___ ___.",
      "answers": ["present my poster", "share my world"]
    },
    {
      "template": "This is ___. I have ___ in my family: ___.",
      "answers": ["my loving family", "4 people", "my mom, my dad, my sister, and me"]
    },
    {
      "template": "Now I talk about my talents! I can ___ and I can also ___ ___.",
      "answers": ["sing very well", "dance when happy"]
    },
    {
      "template": "I am also good at ___ of animals and flowers for my classmates.",
      "answers": ["drawing pictures"]
    },
    {
      "template": "When I ___ ___, I ___ ___ ___ the audience ___.",
      "answers": ["stand here", "feel very confident", "because the audience", "listen carefully"]
    },
    {
      "template": "I ___ ___ ___ ___ ___.",
      "answers": ["introduce myself", "with a big smile", "and then describe my project in detail"]
    },
    {
      "template": "I am ___ ___ my poster. I hope everyone enjoys it!",
      "answers": ["so proud of my work"]
    },
    {
      "template": "___. This is my very special day and I will never forget it!",
      "answers": ["Thank you for listening"]
    }
  ]
};
