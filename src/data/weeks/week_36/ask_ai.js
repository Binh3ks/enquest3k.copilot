// Cambridge A2 Flyers ask_ai.js — Week 36
export default {
  prompts: [
  {
    "id": 1,
    "title_en": "Situation 1: Cave Stalactite Science",
    "context_en": "Ask Nova how acidic water forms stalactites over thousands of years.",
    "context_vi": "Hỏi Nova cách nước axit tạo thành nhũ đá qua hàng ngàn năm.",
    "sample_question_en": "How does water form stalactites inside limestone caves over time?",
    "sample_question_vi": "Nước tạo thành nhũ đá trong hang đá vôi theo thời gian như thế nào?",
    "answer": "How does water form stalactites inside limestone caves over time?",
    "word_bank": [
      "How",
      "does",
      "water",
      "form",
      "stalactites",
      "inside",
      "caves"
    ]
  },
  {
    "id": 2,
    "title_en": "Situation 2: Magnetic Compass Navigation",
    "context_en": "Ask Nova why a brass compass always points toward Earth's magnetic north.",
    "context_vi": "Hỏi Nova tại sao la bàn đồng luôn chỉ về hướng Bắc từ tính.",
    "sample_question_en": "Why does a magnetic compass always point toward Earth's north pole?",
    "sample_question_vi": "Tại sao la bàn từ tính luôn chỉ về cực Bắc của Trái đất?",
    "answer": "Why does a magnetic compass always point toward Earth's north pole?",
    "word_bank": [
      "Why",
      "does",
      "a",
      "compass",
      "point",
      "north"
    ]
  },
  {
    "id": 3,
    "title_en": "Situation 3: Son Doong Underground Jungle",
    "context_en": "Ask Nova about the unique weather and jungle inside Vietnam's Son Doong Cave.",
    "context_vi": "Hỏi Nova về thời tiết và rừng rậm độc đáo bên trong Hang Sơn Đoòng.",
    "sample_question_en": "What unique natural features exist inside Son Doong Cave in Vietnam?",
    "sample_question_vi": "Những đặc điểm tự nhiên độc đáo nào tồn tại bên trong Hang Sơn Đoòng?",
    "answer": "What unique natural features exist inside Son Doong Cave in Vietnam?",
    "word_bank": [
      "What",
      "features",
      "exist",
      "inside",
      "Son Doong",
      "Cave"
    ]
  },
  {
    "id": 4,
    "title_en": "Situation 4: Historical Explorer Maps",
    "context_en": "Ask Nova how ancient explorers drew parchment maps before GPS existed.",
    "context_vi": "Hỏi Nova cách các nhà khám phá cổ đại vẽ bản đồ giấy da trước khi có GPS.",
    "sample_question_en": "How did historical explorers create detailed parchment maps long ago?",
    "sample_question_vi": "Các nhà khám phá lịch sử đã tạo ra bản đồ giấy da chi tiết như thế nào ngày xưa?",
    "answer": "How did historical explorers create detailed parchment maps long ago?",
    "word_bank": [
      "How",
      "did",
      "explorers",
      "create",
      "parchment",
      "maps"
    ]
  },
  {
    "id": 5,
    "title_en": "Situation 5: Wilderness Safety Rules",
    "context_en": "Ask Nova what safety gear kids should prepare for a forest hike.",
    "context_vi": "Hỏi Nova những thiết bị an toàn trẻ em nên chuẩn bị khi đi bộ trong rừng.",
    "sample_question_en": "What safety equipment should explorers bring when hiking in forests?",
    "sample_question_vi": "Nhà khám phá nên mang theo thiết bị an toàn nào khi đi bộ đường dài trong rừng?",
    "answer": "What safety equipment should explorers bring when hiking in forests?",
    "word_bank": [
      "What",
      "safety",
      "equipment",
      "should",
      "explorers",
      "bring"
    ]
  }
],
  situations: [
  {
    "id": 1,
    "title_en": "Situation 1: Cave Stalactite Science",
    "context_en": "Ask Nova how acidic water forms stalactites over thousands of years.",
    "context_vi": "Hỏi Nova cách nước axit tạo thành nhũ đá qua hàng ngàn năm.",
    "sample_question_en": "How does water form stalactites inside limestone caves over time?",
    "sample_question_vi": "Nước tạo thành nhũ đá trong hang đá vôi theo thời gian như thế nào?",
    "answer": "How does water form stalactites inside limestone caves over time?",
    "word_bank": [
      "How",
      "does",
      "water",
      "form",
      "stalactites",
      "inside",
      "caves"
    ]
  },
  {
    "id": 2,
    "title_en": "Situation 2: Magnetic Compass Navigation",
    "context_en": "Ask Nova why a brass compass always points toward Earth's magnetic north.",
    "context_vi": "Hỏi Nova tại sao la bàn đồng luôn chỉ về hướng Bắc từ tính.",
    "sample_question_en": "Why does a magnetic compass always point toward Earth's north pole?",
    "sample_question_vi": "Tại sao la bàn từ tính luôn chỉ về cực Bắc của Trái đất?",
    "answer": "Why does a magnetic compass always point toward Earth's north pole?",
    "word_bank": [
      "Why",
      "does",
      "a",
      "compass",
      "point",
      "north"
    ]
  },
  {
    "id": 3,
    "title_en": "Situation 3: Son Doong Underground Jungle",
    "context_en": "Ask Nova about the unique weather and jungle inside Vietnam's Son Doong Cave.",
    "context_vi": "Hỏi Nova về thời tiết và rừng rậm độc đáo bên trong Hang Sơn Đoòng.",
    "sample_question_en": "What unique natural features exist inside Son Doong Cave in Vietnam?",
    "sample_question_vi": "Những đặc điểm tự nhiên độc đáo nào tồn tại bên trong Hang Sơn Đoòng?",
    "answer": "What unique natural features exist inside Son Doong Cave in Vietnam?",
    "word_bank": [
      "What",
      "features",
      "exist",
      "inside",
      "Son Doong",
      "Cave"
    ]
  },
  {
    "id": 4,
    "title_en": "Situation 4: Historical Explorer Maps",
    "context_en": "Ask Nova how ancient explorers drew parchment maps before GPS existed.",
    "context_vi": "Hỏi Nova cách các nhà khám phá cổ đại vẽ bản đồ giấy da trước khi có GPS.",
    "sample_question_en": "How did historical explorers create detailed parchment maps long ago?",
    "sample_question_vi": "Các nhà khám phá lịch sử đã tạo ra bản đồ giấy da chi tiết như thế nào ngày xưa?",
    "answer": "How did historical explorers create detailed parchment maps long ago?",
    "word_bank": [
      "How",
      "did",
      "explorers",
      "create",
      "parchment",
      "maps"
    ]
  },
  {
    "id": 5,
    "title_en": "Situation 5: Wilderness Safety Rules",
    "context_en": "Ask Nova what safety gear kids should prepare for a forest hike.",
    "context_vi": "Hỏi Nova những thiết bị an toàn trẻ em nên chuẩn bị khi đi bộ trong rừng.",
    "sample_question_en": "What safety equipment should explorers bring when hiking in forests?",
    "sample_question_vi": "Nhà khám phá nên mang theo thiết bị an toàn nào khi đi bộ đường dài trong rừng?",
    "answer": "What safety equipment should explorers bring when hiking in forests?",
    "word_bank": [
      "What",
      "safety",
      "equipment",
      "should",
      "explorers",
      "bring"
    ]
  }
]
};
