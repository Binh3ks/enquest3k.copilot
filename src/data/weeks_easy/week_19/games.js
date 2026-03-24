export default {
  vocabulary: [
    { word: "baby", definition: "very young child" },
    { word: "cute", definition: "very nice and sweet" },
    { word: "little", definition: "not big, small" },
    { word: "noisy", definition: "making loud sounds" },
    { word: "quiet", definition: "making no sound" },
    { word: "kindergarten", definition: "school for young kids" },
    { word: "grow", definition: "get bigger" },
    { word: "past", definition: "time before now" },
    { word: "young", definition: "not old" },
    { word: "small", definition: "not big" },
    { word: "was", definition: "past form of 'am/is'" },
    { word: "were", definition: "past form of 'are'" }
  ],

  show_tell: {
    title_en: "Show & Tell: My Baby Photo",
    title_vi: "Thuyết trình: Ảnh Em Bé Của Tôi",
    steps: [
      {
        step: 1,
        title_en: "Bring Photo",
        title_vi: "Mang Ảnh",
        description_en: "Bring your baby photo.",
        description_vi: "Mang ảnh em bé của bạn."
      },
      {
        step: 2,
        title_en: "Tell Class",
        title_vi: "Kể Cho Lớp",
        description_en: "Say: I was... (small / cute / quiet)",
        description_vi: "Nói: I was... (nhỏ / dễ thương / yên lặng)"
      },
      {
        step: 3,
        title_en: "Compare",
        title_vi: "So Sánh",
        description_en: "Say: I was... Now I am...",
        description_vi: "Nói: Tôi đã... Bây giờ tôi..."
      }
    ],
    sentence_frames: {
      easy: [
        "I was ___ (small / cute / quiet).",
        "Now I am ___ (big / tall / noisy).",
        "I was a baby in ___."
      ]
    }
  },

  games: [
    {
      id: 1,
      game_name: "Was Were Memory",
      game_type: "Wordwall",
      game_link: "https://wordwall.net/resource/baby-was-were",
      description_en: "Match: I was / You were",
      description_vi: "Ghép: I was / You were"
    },
    {
      id: 2,
      game_name: "Baby Quiz",
      game_type: "Quizizz",
      game_link: "https://quizizz.com/join/baby-grow-up",
      description_en: "Quiz about babies",
      description_vi: "Quiz về em bé"
    },
    {
      id: 3,
      game_name: "Past Race",
      game_type: "Kahoot",
      game_link: "https://kahoot.it/challenge/baby-past",
      description_en: "Race: Was/Were",
      description_vi: "Đua: Was/Were"
    }
  ]
};
