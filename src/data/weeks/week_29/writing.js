export default {
  title: "Writing: The Magic Trip",
  image_url: null,
  min_words: 45,
  instruction_en: "Write about a magic trip! Use the past tense. Where did you GO? Who did you MEET (a pilot, a doctor, a farmer, an engineer, or a scientist)? What CAME to help you? Include at least THREE occupations words!",
  instruction_vi: "Hãy viết về một chuyến đi kỳ diệu! Dùng thì quá khứ. Bạn đã ĐI đâu? Bạn GẶP ai (một phi công, bác sĩ, nông dân, kỹ sư, hay nhà khoa học)? Điều gì ĐẾN để giúp bạn?",
  prompt_en: "Imagine you found a magic carpet. Describe your trip using went, flew, came, and ran.",
  prompt_vi: "Hãy tưởng tượng bạn tìm thấy một tấm thảm thần. Mô tả chuyến đi của bạn dùng went, flew, came và ran.",
  model_sentence: "Last week, the children at Green School went on a magic trip to a wonderful place. First, they got on a magic carpet that flew to a tiny green island in the sea. On the island, a friendly pilot came to help them. He picked up a beautiful photo and gave it to the teacher. A kind farmer went to the field and gave them fresh mangoes. An engineer looked at an old map and showed them a tiny lighthouse. A scientist looked through a telescope and said loudly, 'Come and look at this!' On the way back, the dolphins jumped out of the water and swam alongside the magic carpet. The magic carpet flew back over the sea to the school station. All the children went home happy and tired. 'What a wonderful trip!' they said together. 'We will always remember this adventure.'",
  keywords: ["went on", "magic carpet", "flew to", "came to help", "gave it", "looked at", "swam alongside", "flew back"],
  topic_talk_prompt: "What job would you like to have — pilot, doctor, farmer, engineer, or scientist? Why? Speak for at least 5 sentences!",
  audio_model: "/audio/week29/writing_model.mp3",
  sentence_frames: [
    {
      "template": "Last week the children ___ a ___ to a ___ place.",
      "answers": ["went on", "magic trip", "wonderful"]
    },
    {
      "template": "First, they ___ on a ___ that ___ to a tiny green island in the sea.",
      "answers": ["got", "magic carpet", "flew"]
    },
    {
      "template": "A ___ ___ to help them and ___ a beautiful photo to the teacher.",
      "answers": ["friendly pilot", "came", "gave"]
    },
    {
      "template": "A ___ ___ to the field and ___ them fresh mangoes.",
      "answers": ["kind farmer", "went", "gave"]
    },
    {
      "template": "An engineer ___ at an old map and ___ them a tiny lighthouse.",
      "answers": ["looked", "showed"]
    },
    {
      "template": "A scientist ___ through a telescope and ___ loudly, 'Come and look at this!'",
      "answers": ["looked through", "said"]
    },
    {
      "template": "On the way back, the dolphins ___ ___ of the water and ___ the magic carpet.",
      "answers": ["jumped out", "swam alongside"]
    },
    {
      "template": "The magic carpet ___ back over the sea. All the children ___ home happy and tired.",
      "answers": ["flew", "went"]
    }
  ],
  hints: {
    vocabulary_bank: {
      label_en: "Need help? Click next to each blank",
      label_vi: "Can tro giup? Bam ben canh moi o",
      show_by_default: false,
      scaffolding_stage: "low",
      words: [
        { "word": "went on a magic trip", "vi": "di chuyen ki dieu", "distractor": false },
        { "word": "wonderful place", "vi": "noi tuyet voi", "distractor": false },
        { "word": "got on", "vi": "len", "distractor": false },
        { "word": "magic carpet", "vi": "tham than", "distractor": false },
        { "word": "flew to", "vi": "bay den", "distractor": false },
        { "word": "friendly pilot", "vi": "phi cong than thien", "distractor": false },
        { "word": "came to help", "vi": "den giup", "distractor": false },
        { "word": "gave a beautiful photo", "vi": "tra anh dep", "distractor": false },
        { "word": "kind farmer", "vi": "nong dan tot bung", "distractor": false },
        { "word": "went to the field", "vi": "den canh dong", "distractor": false },
        { "word": "gave fresh mangoes", "vi": "cho xoai tuoi", "distractor": false },
        { "word": "looked at", "vi": "nhin", "distractor": false },
        { "word": "showed them", "vi": "chi cho ho", "distractor": false },
        { "word": "looked through", "vi": "nhin qua", "distractor": false },
        { "word": "said loudly", "vi": "noi to", "distractor": false },
        { "word": "jumped out of", "vi": "nhay len khoi", "distractor": false },
        { "word": "swam alongside", "vi": "boi ben canh", "distractor": false },
        { "word": "flew back", "vi": "bay ve", "distractor": false },
        { "word": "went home", "vi": "ve nha", "distractor": false },
        { "word": "a magic book", "vi": "sach than", "distractor": true },
        { "word": "ran away", "vi": "chay di", "distractor": true }
      ]
    }
  }
};
