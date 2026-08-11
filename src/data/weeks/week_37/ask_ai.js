// Cambridge A2 Flyers ask_ai.js — Week 37
export default {
  prompts: [
  {
    "id": 1,
    "title_en": "Situation 1: Relay Handoff Physics",
    "context_en": "Ask Nova how accelerating in the exchange zone maintains running momentum.",
    "context_vi": "Hỏi Nova cách tăng tốc trong vùng giao gậy giúp duy trì động năng.",
    "sample_question_en": "How does smooth acceleration in the exchange zone help relay runners?",
    "sample_question_vi": "Tăng tốc mượt mà trong khu vực giao gậy giúp các vận động viên tiếp sức như thế nào?",
    "answer": "How does smooth acceleration in the exchange zone help relay runners?",
    "word_bank": [
      "How",
      "does",
      "acceleration",
      "help",
      "relay",
      "runners"
    ]
  },
  {
    "id": 2,
    "title_en": "Situation 2: High Altitude Stamina",
    "context_en": "Ask Nova why runners from Kenya's Rift Valley excel at marathon stamina.",
    "context_vi": "Hỏi Nova tại sao các vận động viên từ Thung lũng Rift ở Kenya lại có sức bền tuyệt vời.",
    "sample_question_en": "Why do athletes training at high altitudes develop greater stamina?",
    "sample_question_vi": "Tại sao các vận động viên tập luyện ở vùng cao nguyên lại phát triển sức bền tốt hơn?",
    "answer": "Why do athletes training at high altitudes develop greater stamina?",
    "word_bank": [
      "Why",
      "do",
      "athletes",
      "develop",
      "greater",
      "stamina"
    ]
  },
  {
    "id": 3,
    "title_en": "Situation 3: Olympic Truce History",
    "context_en": "Ask Nova about the history and purpose of the ancient Olympic Truce Ekecheiria.",
    "context_vi": "Hỏi Nova về lịch sử và mục đích của Thỏa thuận Ngừng bắn Olympic Ekecheiria.",
    "sample_question_en": "What was the purpose of the ancient Olympic Truce Ekecheiria?",
    "sample_question_vi": "Mục đích của Thỏa thuận Ngừng bắn Olympic Ekecheiria cổ đại là gì?",
    "answer": "What was the purpose of the ancient Olympic Truce Ekecheiria?",
    "word_bank": [
      "What",
      "was",
      "the",
      "purpose",
      "of",
      "Olympic",
      "Truce"
    ]
  },
  {
    "id": 4,
    "title_en": "Situation 4: Track Friction Science",
    "context_en": "Ask Nova how running spikes create friction to prevent slipping.",
    "context_vi": "Hỏi Nova cách đinh giày chạy tạo ma sát để chống trượt.",
    "sample_question_en": "How do athletic shoe spikes increase friction on synthetic tracks?",
    "sample_question_vi": "Đinh giày thể thao tăng ma sát trên đường chạy tổng hợp như thế nào?",
    "answer": "How do athletic shoe spikes increase friction on synthetic tracks?",
    "word_bank": [
      "How",
      "do",
      "shoe",
      "spikes",
      "increase",
      "friction"
    ]
  },
  {
    "id": 5,
    "title_en": "Situation 5: Values of Teamwork",
    "context_en": "Ask Nova what key values of teamwork relay races teach young students.",
    "context_vi": "Hỏi Nova những giá trị làm việc nhóm cốt lõi mà chạy tiếp sức dạy cho học sinh.",
    "sample_question_en": "What essential teamwork values do relay races promote among students?",
    "sample_question_vi": "Chạy tiếp sức thúc đẩy những giá trị làm việc nhóm thiết yếu nào giữa các học sinh?",
    "answer": "What essential teamwork values do relay races promote among students?",
    "word_bank": [
      "What",
      "teamwork",
      "values",
      "do",
      "relays",
      "promote"
    ]
  }
],
  situations: [
  {
    "id": 1,
    "title_en": "Situation 1: Relay Handoff Physics",
    "context_en": "Ask Nova how accelerating in the exchange zone maintains running momentum.",
    "context_vi": "Hỏi Nova cách tăng tốc trong vùng giao gậy giúp duy trì động năng.",
    "sample_question_en": "How does smooth acceleration in the exchange zone help relay runners?",
    "sample_question_vi": "Tăng tốc mượt mà trong khu vực giao gậy giúp các vận động viên tiếp sức như thế nào?",
    "answer": "How does smooth acceleration in the exchange zone help relay runners?",
    "word_bank": [
      "How",
      "does",
      "acceleration",
      "help",
      "relay",
      "runners"
    ]
  },
  {
    "id": 2,
    "title_en": "Situation 2: High Altitude Stamina",
    "context_en": "Ask Nova why runners from Kenya's Rift Valley excel at marathon stamina.",
    "context_vi": "Hỏi Nova tại sao các vận động viên từ Thung lũng Rift ở Kenya lại có sức bền tuyệt vời.",
    "sample_question_en": "Why do athletes training at high altitudes develop greater stamina?",
    "sample_question_vi": "Tại sao các vận động viên tập luyện ở vùng cao nguyên lại phát triển sức bền tốt hơn?",
    "answer": "Why do athletes training at high altitudes develop greater stamina?",
    "word_bank": [
      "Why",
      "do",
      "athletes",
      "develop",
      "greater",
      "stamina"
    ]
  },
  {
    "id": 3,
    "title_en": "Situation 3: Olympic Truce History",
    "context_en": "Ask Nova about the history and purpose of the ancient Olympic Truce Ekecheiria.",
    "context_vi": "Hỏi Nova về lịch sử và mục đích của Thỏa thuận Ngừng bắn Olympic Ekecheiria.",
    "sample_question_en": "What was the purpose of the ancient Olympic Truce Ekecheiria?",
    "sample_question_vi": "Mục đích của Thỏa thuận Ngừng bắn Olympic Ekecheiria cổ đại là gì?",
    "answer": "What was the purpose of the ancient Olympic Truce Ekecheiria?",
    "word_bank": [
      "What",
      "was",
      "the",
      "purpose",
      "of",
      "Olympic",
      "Truce"
    ]
  },
  {
    "id": 4,
    "title_en": "Situation 4: Track Friction Science",
    "context_en": "Ask Nova how running spikes create friction to prevent slipping.",
    "context_vi": "Hỏi Nova cách đinh giày chạy tạo ma sát để chống trượt.",
    "sample_question_en": "How do athletic shoe spikes increase friction on synthetic tracks?",
    "sample_question_vi": "Đinh giày thể thao tăng ma sát trên đường chạy tổng hợp như thế nào?",
    "answer": "How do athletic shoe spikes increase friction on synthetic tracks?",
    "word_bank": [
      "How",
      "do",
      "shoe",
      "spikes",
      "increase",
      "friction"
    ]
  },
  {
    "id": 5,
    "title_en": "Situation 5: Values of Teamwork",
    "context_en": "Ask Nova what key values of teamwork relay races teach young students.",
    "context_vi": "Hỏi Nova những giá trị làm việc nhóm cốt lõi mà chạy tiếp sức dạy cho học sinh.",
    "sample_question_en": "What essential teamwork values do relay races promote among students?",
    "sample_question_vi": "Chạy tiếp sức thúc đẩy những giá trị làm việc nhóm thiết yếu nào giữa các học sinh?",
    "answer": "What essential teamwork values do relay races promote among students?",
    "word_bank": [
      "What",
      "teamwork",
      "values",
      "do",
      "relays",
      "promote"
    ]
  }
]
};
