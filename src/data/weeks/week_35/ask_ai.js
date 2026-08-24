// Week 35 Mascot Nova AI Voice Dialogue Cards & Cambridge P2 Info Exchange
export default [
  { id: 1, title_en: "Turn 1: Where did you go for your adventure?", sample_question_en: "We went camping at Pine Valley Mountain last Saturday.", sample_question_vi: "Chúng tôi đã đi cắm trại ở Núi Thung Lũng Thông vào thứ Bảy tuần trước.", answer: "Wonderful! What was the weather like on the mountain?", word_bank: ["camping", "Pine", "Valley", "Mountain", "Saturday"] },
  { id: 2, title_en: "Turn 2: What did you do while setting up camp?", sample_question_en: "We collected dry pine branches for the warm campfire.", sample_question_vi: "Chúng tôi đã nhặt những cành thông khô cho đống lửa trại ấm áp.", answer: "Great teamwork! Did you go hiking in the afternoon?", word_bank: ["collected", "pine", "branches", "warm", "campfire"] },
  { id: 3, title_en: "Turn 3: What did you see along the forest stream?", sample_question_en: "We saw two playful squirrels jumping in the trees.", sample_question_vi: "Chúng tôi nhìn thấy hai chú sóc tinh nghịch đang nhảy trên cây.", answer: "How lovely! What delicious treat did you enjoy in the evening?", word_bank: ["saw", "playful", "squirrels", "forest", "stream"] },
  { id: 4, title_en: "Turn 4: How did you spend your evening around the fire?", sample_question_en: "We roasted sweet marshmallows and told funny stories.", sample_question_vi: "Chúng tôi đã nướng kẹo xốp ngọt và kể những câu chuyện vui.", answer: "Sounds delicious! What did you see when you looked up at the sky?", word_bank: ["roasted", "sweet", "marshmallows", "campfire", "stories"] },
  { id: 5, title_en: "Turn 5: Why was this truly the best day ever?", sample_question_en: "Because we spent happy time together under the starry sky.", sample_question_vi: "Bởi vì chúng tôi đã có khoảng thời gian hạnh phúc cùng nhau dưới bầu trời đầy sao.", answer: "Splendid! Nature and family make the best memories.", word_bank: ["happy", "time", "together", "starry", "sky"] }
];

export const CUE_CARD_PROMPTS = [
  {
    cue_id: "cue_1",
    target_prompt_en: "Where / the family / go camping last weekend?",
    target_prompt_vi: "Hỏi Nova: Gia đình đã đi cắm trại ở đâu cuối tuần trước?",
    question_word: "Where",
    word_bank: ["Where", "did", "the", "family", "go", "camping", "last", "weekend", "?"],
    scrambled_words: ["weekend", "camping", "Where", "family", "go", "last", "did", "the", "?"],
    acceptable_questions: [
      "Where did the family go camping last weekend?",
      "Where did they go camping?",
      "Where did the family go?"
    ],
    nova_answer_audio_text: "The family went camping at Pine Valley Mountain last Saturday."
  },
  {
    cue_id: "cue_2",
    target_prompt_en: "What / the children / collect for the campfire?",
    target_prompt_vi: "Hỏi Nova: Các bạn nhỏ đã nhặt thứ gì cho đống lửa trại?",
    question_word: "What",
    word_bank: ["What", "did", "the", "children", "collect", "for", "campfire", "?"],
    scrambled_words: ["collect", "What", "campfire", "children", "did", "the", "for", "?"],
    acceptable_questions: [
      "What did the children collect for the campfire?",
      "What did they collect?",
      "What did the children gather?"
    ],
    nova_answer_audio_text: "The children collected dry pine branches to make a warm campfire."
  },
  {
    cue_id: "cue_3",
    target_prompt_en: "What wildlife / they / spot near the stream?",
    target_prompt_vi: "Hỏi Nova: Họ đã nhìn thấy động vật hoang dã nào gần con suối?",
    question_word: "What",
    word_bank: ["What", "animals", "did", "they", "see", "near", "stream", "?"],
    scrambled_words: ["see", "What", "stream", "animals", "did", "near", "they", "?"],
    acceptable_questions: [
      "What animals did they see near the stream?",
      "What did they spot near the stream?",
      "What did they see while hiking?"
    ],
    nova_answer_audio_text: "While hiking along the stream, they spotted two playful squirrels."
  },
  {
    cue_id: "cue_4",
    target_prompt_en: "What / sweet food / they / roast in the evening?",
    target_prompt_vi: "Hỏi Nova: Họ đã nướng món ăn ngọt nào vào buổi tối?",
    question_word: "What",
    word_bank: ["What", "did", "they", "roast", "over", "the", "fire", "?"],
    scrambled_words: ["roast", "What", "fire", "they", "did", "over", "the", "?"],
    acceptable_questions: [
      "What did they roast over the fire?",
      "What did they eat in the evening?",
      "What sweet food did they roast?"
    ],
    nova_answer_audio_text: "They roasted sweet marshmallows on thin sticks over the warm campfire."
  },
  {
    cue_id: "cue_5",
    target_prompt_en: "Why / was / it the best day ever?",
    target_prompt_vi: "Hỏi Nova: Tại sao đó lại là ngày tuyệt vời nhất?",
    question_word: "Why",
    word_bank: ["Why", "was", "it", "the", "best", "day", "ever", "?"],
    scrambled_words: ["best", "Why", "ever", "day", "was", "the", "it", "?"],
    acceptable_questions: [
      "Why was it the best day ever?",
      "Why was the day so memorable?",
      "Why did they enjoy the camping trip?"
    ],
    nova_answer_audio_text: "Because the whole family worked together and enjoyed the starry night sky."
  }
];

export const INFORMATION_EXCHANGE_P2 = {
  theme: "The Pine Valley Camping Trip Information Exchange",
  candidateA: {
    cardTitle: "Candidate A: The Pine Valley Campsite",
    fields: [
      { label: "Campsite Name", value: "Pine Valley Mountain Campsite" },
      { label: "Day of Trip", value: "Sunny Saturday morning" },
      { label: "Tent Color", value: "Large blue cloth tent" },
      { label: "Evening Activity", value: "Roasting sweet marshmallows by campfire" },
      { label: "Night View", value: "Clear starry sky with bright constellations" }
    ]
  },
  candidateB: {
    cardTitle: "Candidate B: The Mountain Hikers",
    prompts: CUE_CARD_PROMPTS
  }
};
