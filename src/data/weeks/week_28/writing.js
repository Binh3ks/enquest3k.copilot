export default {
  title: "Retell The Tortoise and the Hare",
  min_words: 45,
  model_sentence: "Once upon a time, the slow hare was very proud of being the fastest. He always bragged about winning every race and looked at the slow tortoise with loud laughter. The slow tortoise smiled calmly and said, 'Slow and steady wins the great race.' The animals all got into their vehicles. The slow hare jumped on his old bicycle and rode down the hill fast. The fox got into a yellow taxi. The elephant went to the train station. The slow tortoise got on his small boat. BANG — the race began suddenly. The slow hare got ahead of everyone quickly. But then he got tired and fell asleep under a tree. Meanwhile, the slow tortoise kept on sailing steadily while the taxi got stuck in traffic, the bus stopped at every station, the motorbike ran out of petrol, and the car got a flat tyre. The slow tortoise won the race and all the animals cheered loudly.",
  instruction_en: "Retell the fable in full using past tense and story phrases like once upon a time, meanwhile, and by the time!",
  instruction_vi: "Kể lại truyện ngụ ngôn đầy đủ bằng thì quá khứ và cụm từ kể chuyện như once upon a time, meanwhile, by the time!",
  prompt_en: "What did the Hare do? What did the Tortoise do? What is the moral?",
  prompt_vi: "Thỏ đã làm gì? Rùa đã làm gì? Bài học là gì?",
  keywords: ["slow hare", "slow tortoise", "won the race", "fell asleep", "cheered loudly", "slow and steady wins"],
  topic_talk_prompt: "Retell the tortoise and the hare story with all the details!",
  sentence_frames: [
    {
      "template": "Once upon a time, the ___ was very proud and bragged about ___ every race.",
      "answers": ["slow hare", "winning"]
    },
    {
      "template": "The ___ smiled calmly and said, 'Slow and ___ wins the great ___.'",
      "answers": ["slow tortoise", "steady", "race"]
    },
    {
      "template": "The slow hare jumped on his ___ and rode down the hill fast.",
      "answers": ["old bicycle"]
    },
    {
      "template": "The fox got into a ___ taxi and the elephant went to the ___.",
      "answers": ["yellow", "train station"]
    },
    {
      "template": "The slow tortoise got on his ___ and the race ___ suddenly.",
      "answers": ["small boat", "began"]
    },
    {
      "template": "The slow hare got ahead quickly but then ___ under a tree.",
      "answers": ["fell asleep"]
    },
    {
      "template": "Meanwhile, the slow tortoise kept on sailing ___ while the taxi ___ in traffic.",
      "answers": ["steadily", "got stuck"]
    },
    {
      "template": "The slow tortoise ___ the race and all the animals ___ loudly.",
      "answers": ["won", "cheered"]
    }
  ],
  hints: {
    vocabulary_bank: {
      label_en: "Need help? Click next to each blank",
      label_vi: "Cần trợ giúp? Bấm bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "low",
      words: [
        { "word": "slow hare", "vi": "thỏ chậm", "distractor": false },
        { "word": "winning every race", "vi": "thắng mọi cuộc đua", "distractor": false },
        { "word": "slow tortoise", "vi": "rùa chậm", "distractor": false },
        { "word": "steady", "vi": "chắc", "distractor": false },
        { "word": "great race", "vi": "cuộc đua lớn", "distractor": false },
        { "word": "old bicycle", "vi": "xe đạp cũ", "distractor": false },
        { "word": "yellow taxi", "vi": "taxi vàng", "distractor": false },
        { "word": "train station", "vi": "nhà ga", "distractor": false },
        { "word": "small boat", "vi": "thuyền nhỏ", "distractor": false },
        { "word": "began suddenly", "vi": "bắt đầu bất ngờ", "distractor": false },
        { "word": "fell asleep", "vi": "ngủ thiếp đi", "distractor": false },
        { "word": "steadily", "vi": "đều đặn", "distractor": false },
        { "word": "got stuck in traffic", "vi": "kẹt xe", "distractor": false },
        { "word": "won the race", "vi": "thắng cuộc đua", "distractor": false },
        { "word": "cheered loudly", "vi": "hoan hô lớn", "distractor": false },
        { "word": "ran very fast", "vi": "chạy rất nhanh", "distractor": true },
        { "word": "a swimming pool", "vi": "bể bơi", "distractor": true }
      ]
    }
  }
};
