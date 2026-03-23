const mindMapContent = {
  title: "Weather & Clothes",
  title_vi: "Thời tiết & Trang phục",
  centerStems: [
    {
      id: 1,
      text: "It is raining, so I am ___.",
      text_vi: "Trời đang mưa, vì vậy tôi đang ___.",
      audio: "/audio/week17/mindmap_stem_1.mp3",
      completions: ["wearing a coat", "carrying an umbrella", "wearing boots"]
    },
    {
      id: 2,
      text: "When it is cold, I wear ___.",
      text_vi: "Khi trời lạnh, tôi mặc ___.",
      audio: "/audio/week17/mindmap_stem_2.mp3",
      completions: ["a warm coat", "a hat", "boots"]
    },
    {
      id: 3,
      text: "The weather today is ___.",
      text_vi: "Thời tiết hôm nay ___.",
      audio: "/audio/week17/mindmap_stem_3.mp3",
      completions: ["rainy and cold", "sunny and warm", "snowing outside"]
    },
    {
      id: 4,
      text: "Water goes into the atmosphere by ___.",
      text_vi: "Nước đi vào khí quyển bằng cách ___.",
      audio: "/audio/week17/mindmap_stem_4.mp3",
      completions: ["evaporation", "rising up as vapor", "heating up in the sun"]
    },
    {
      id: 5,
      text: "It is snowing, so I am ___.",
      text_vi: "Trời đang có tuyết, vì vậy tôi đang ___.",
      audio: "/audio/week17/mindmap_stem_5.mp3",
      completions: ["wearing a heavy coat", "putting on my boots", "wearing a warm hat"]
    },
    {
      id: 6,
      text: "Precipitation falls when ___.",
      text_vi: "Lượng mưa rơi xuống khi ___.",
      audio: "/audio/week17/mindmap_stem_6.mp3",
      completions: ["clouds get heavy", "water drops are too heavy", "the atmosphere holds too much water"]
    }
  ],
  branchLabels: {
    weather: "Weather / Thời tiết",
    clothing: "Clothing / Trang phục",
    science: "Science / Khoa học",
    action: "Action / Hành động"
  },
  vocab_focus: ["raining", "snowing", "sunny", "cold", "warm", "coat", "boots", "hat", "umbrella", "wearing", "evaporation", "atmosphere", "precipitation"]
};

export default mindMapContent;
