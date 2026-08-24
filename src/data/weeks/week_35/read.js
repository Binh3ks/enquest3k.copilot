// Week 35 Story — The Best Day Ever: Mountain Camping Adventure
export const readData = {
  week: 35,
  title: "The Best Day Ever: Mountain Camping",
  title_vi: "Ngày Tuyệt Vời Nhất: Cắm Trại Trên Núi",
  text_en: "Last Saturday was the most memorable day of my summer holiday. Early in the morning, my family packed our backpacks and drove to Pine Valley Mountain. While my parents were setting up our large blue tent, my brother and I collected dry pine branches for the campfire. In the afternoon, we went hiking along a winding forest stream. The water was cool and crystal clear. While we were walking, we saw two playful squirrels jumping between pine branches. When evening arrived, Dad lit the warm campfire. We sat together, roasted sweet marshmallows, and told funny stories. Looking up at the clear starry sky, I saw bright constellations shining above the mountain. It was truly the best day ever.",
  text_vi: "Thứ Bảy tuần trước là ngày đáng nhớ nhất trong kỳ nghỉ hè của tôi. Từ sáng sớm, gia đình tôi đã xếp ba lô và lái xe đến Núi Thung Lũng Thông. Trong khi bố mẹ đang dựng chiếc lều xanh lớn, anh trai và tôi đã đi nhặt những cành thông khô cho đống lửa trại. Vào buổi chiều, chúng tôi đi bộ dọc theo con suối rừng uốn lượn. Nước suối mát rượi và trong vắt. Trong khi chúng tôi đang đi bộ, chúng tôi nhìn thấy hai chú sóc tinh nghịch nhảy nhót giữa các cành thông. Khi buổi tối đến, bố đã nhóm đống lửa trại ấm áp. Chúng tôi ngồi cùng nhau, nướng kẹo xốp ngọt và kể những câu chuyện vui nhộn. Ngước nhìn bầu trời đêm đầy sao, tôi nhìn thấy những chòm sao sáng lấp lánh trên đỉnh núi. Đó thực sự là ngày tuyệt vời nhất.",
  
  story_scenes: [
    {
      id: 1,
      scene_number: 1,
      scene_id: "scene_1",
      title: "Panel 1: Arriving at Pine Valley",
      title_en: "Panel 1: Arriving at Pine Valley",
      description: "The family arrived at the campsite and set up the large blue tent.",
      description_en: "The family arrived at the campsite and set up the large blue tent.",
      image_url: "/images/week35/webtoon_scene_1.png",
      lexical_chunks: [
        { word: "arrived", chunk: "arrived at Pine Valley", x: 40, y: 60 },
        { word: "tent", chunk: "set up the blue tent", x: 60, y: 50 }
      ]
    },
    {
      id: 2,
      scene_number: 2,
      scene_id: "scene_2",
      title: "Panel 2: Hiking Along the Stream",
      title_en: "Panel 2: Hiking Along the Stream",
      description: "In the afternoon, the children went hiking along the clear forest stream.",
      description_en: "In the afternoon, the children went hiking along the clear forest stream.",
      image_url: "/images/week35/webtoon_scene_2.png",
      lexical_chunks: [
        { word: "hiking", chunk: "hiking along the stream", x: 50, y: 65 },
        { word: "stream", chunk: "cool crystal clear water", x: 30, y: 75 }
      ]
    },
    {
      id: 3,
      scene_number: 3,
      scene_id: "scene_3",
      title: "Panel 3: Spotting Forest Wildlife",
      title_en: "Panel 3: Spotting Forest Wildlife",
      description: "While walking, they spotted two playful squirrels in the pine trees.",
      description_en: "While walking, they spotted two playful squirrels in the pine trees.",
      image_url: "/images/week35/webtoon_scene_3.png",
      lexical_chunks: [
        { word: "squirrels", chunk: "two playful squirrels", x: 55, y: 40 },
        { word: "trees", chunk: "jumping between branches", x: 45, y: 30 }
      ]
    },
    {
      id: 4,
      scene_number: 4,
      scene_id: "scene_4",
      title: "Panel 4: Campfire & Marshmallows",
      title_en: "Panel 4: Campfire & Marshmallows",
      description: "They sat around the warm campfire and roasted sweet marshmallows.",
      description_en: "They sat around the warm campfire and roasted sweet marshmallows.",
      image_url: "/images/week35/webtoon_scene_4.png",
      lexical_chunks: [
        { word: "campfire", chunk: "sat around warm campfire", x: 45, y: 60 },
        { word: "marshmallows", chunk: "roasted sweet marshmallows", x: 65, y: 55 }
      ]
    },
    {
      id: 5,
      scene_number: 5,
      scene_id: "scene_5",
      title: "Panel 5: The Starry Night Sky",
      title_en: "Panel 5: The Starry Night Sky",
      description: "Looking up at the bright starry sky, they celebrated the best day ever.",
      description_en: "Looking up at the bright starry sky, they celebrated the best day ever.",
      image_url: "/images/week35/webtoon_scene_5.png",
      lexical_chunks: [
        { word: "starry sky", chunk: "clear starry sky above", x: 50, y: 25 },
        { word: "best day", chunk: "truly the best day ever", x: 50, y: 70 }
      ]
    }
  ],

  comprehension_questions: [
    {
      id: 1,
      question_en: "Where did the family go for their camping trip?",
      options: ["Pine Valley Mountain", "The city center", "A sandy ocean beach"],
      answer: "Pine Valley Mountain"
    },
    {
      id: 2,
      question_en: "What did the children do while their parents set up the tent?",
      options: ["They collected dry pine branches", "They slept in the car", "They went swimming"],
      answer: "They collected dry pine branches"
    },
    {
      id: 3,
      question_en: "What animals did they spot while hiking near the stream?",
      options: ["Two playful squirrels", "A big brown bear", "Three grey wolves"],
      answer: "Two playful squirrels"
    },
    {
      id: 4,
      question_en: "What sweet treat did they roast over the campfire?",
      options: ["Sweet marshmallows", "Cold ice cream", "Fresh apples"],
      answer: "Sweet marshmallows"
    }
  ]
};

export default readData;
