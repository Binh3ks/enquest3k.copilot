export default {
  title: "My Emotional Day",
  min_words: 45,
  model_sentence: "Yesterday was a very emotional day for me because I felt so many different things from morning to night. In the morning I felt very worried because I could not find my homework anywhere. My brother looked so angry because someone took his pencil, but our mum stayed very calm and helped us both look everywhere. I felt so relieved when I found the homework inside my school bag. At school the class felt very excited because there was a special visitor — it was a famous author! Everyone looked so surprised. During the long talk, some students felt very bored because the author spoke very slowly. After the snack, the children felt hungry and thirsty. By lunchtime, the whole class felt very cheerful again. At the end of the day I felt so tired but happy. What an emotional day!",
  instruction_en: "Write about an emotional day from morning to night using because and feeling words!",
  instruction_vi: "Viết về một ngày đầy cảm xúc từ sáng đến tối dùng because và từ cảm xúc!",
  prompt_en: "What happened? How did you feel and why? How did the day end?",
  prompt_vi: "Chuyện gì xảy ra? Bạn cảm thấy thế nào và tại sao? Ngày kết thúc thế nào?",
  keywords: ["worried", "relieved", "excited", "surprised", "bored", "hungry", "cheerful", "tired"],
  topic_talk_prompt: "Describe an emotional day — what feelings did you have and why?",
  sentence_frames: [
    {
      "template": "Yesterday was a very ___ day for me because I felt ___ things from morning to night.",
      "answers": ["emotional", "so many different"]
    },
    {
      "template": "In the morning I felt very ___ because I could not ___ my homework anywhere.",
      "answers": ["worried", "find"]
    },
    {
      "template": "I felt so ___ when I found the homework ___ my school bag.",
      "answers": ["relieved", "inside"]
    },
    {
      "template": "At school the class felt very ___ because there was a ___ visitor.",
      "answers": ["excited", "special"]
    },
    {
      "template": "Everyone ___ so surprised — it was a ___ author!",
      "answers": ["looked", "famous"]
    },
    {
      "template": "During the talk, some students felt very ___ because the author spoke very ___.",
      "answers": ["bored", "slowly"]
    },
    {
      "template": "By lunchtime, the whole class felt very ___ and ___ again.",
      "answers": ["cheerful", "excited"]
    },
    {
      "template": "At the end of the day I felt so ___ but happy. What an ___ day!",
      "answers": ["tired", "emotional"]
    }
  ],
  hints: {
    vocabulary_bank: {
      label_en: "Need help? Click next to each blank",
      label_vi: "Cần trợ giúp? Bấm bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "medium-low",
      words: [
        { "word": "emotional", "vi": "đầy cảm xúc", "distractor": false },
        { "word": "worried", "vi": "lo lắng", "distractor": false },
        { "word": "find", "vi": "tìm thấy", "distractor": false },
        { "word": "relieved", "vi": "nhẹ nhõm", "distractor": false },
        { "word": "inside my school bag", "vi": "bên trong cặp sách", "distractor": false },
        { "word": "excited", "vi": "hào hứng", "distractor": false },
        { "word": "special visitor", "vi": "khách đặc biệt", "distractor": false },
        { "word": "looked so surprised", "vi": "trông rất ngạc nhiên", "distractor": false },
        { "word": "famous author", "vi": "nhà văn nổi tiếng", "distractor": false },
        { "word": "bored", "vi": "chán", "distractor": false },
        { "word": "slowly", "vi": "chậm rãi", "distractor": false },
        { "word": "cheerful", "vi": "vui vẻ", "distractor": false },
        { "word": "tired", "vi": "mệt mỏi", "distractor": false },
        { "word": "confused and angry", "vi": "bối rối và tức giận", "distractor": true },
        { "word": "quickly", "vi": "nhanh chóng", "distractor": true }
      ]
    }
  },

  story_prompts: {
    picture_mode: {
      type: "picture",
      image_url: "/images/week24/story_writing_pic.jpg",
      image_prompt: "A fun day at the amusement park.",
      word_bank: ["emotional","worried","find","relieved","inside my school bag","excited","special visitor","looked so surprised","famous author","bored","slowly","cheerful","tired","confused and angry","quickly"],
      writing_prompts: {
        en: "Look at the picture. Who can you see? What are they doing? Use 3+ words from the word bank.",
        vi: "Nhìn bức tranh. Bạn thấy ai? Họ đang làm gì? Dùng 3+ từ trong ngân hàng từ."
      },
      rubric_tier: 2,
      min_sentences: 8,
      sentence_frames: [
        { "template": "First, ___" },
        { "template": "Then, ___" },
        { "template": "After that, ___" },
        { "template": "Finally, ___" }
      ]
    }
  }
}
