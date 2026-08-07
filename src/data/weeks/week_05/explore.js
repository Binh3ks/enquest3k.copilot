export default {
  title_en: "Houses Around the World",
  title_vi: "Những Ngôi nhà trên Thế giới",
  image_url: "/images/week5/explore_cover_w05.jpg",
  audio_url: "/audio/week5/explore_main.mp3",
  content_en: "Houses are different **around the world**! In some countries, people live in big houses with many rooms upstairs and downstairs. In other places, people live in small apartments. Some houses have a **big sofa** **in the living room** where the **whole family** sits together. **In the kitchen**, every house needs a fridge to keep food fresh. Some bedrooms have a lamp for reading **at night**. Many houses have shelves for books and toys. A mirror helps you see yourself. A soft rug makes the floor cozy. Every house has special furniture that makes it feel like home!",
  content_vi: "Những ngôi nhà khác nhau trên khắp thế giới! Ở một số quốc gia, mọi người sống trong những ngôi nhà lớn với nhiều phòng ở tầng trên và tầng dưới. Ở những nơi khác, mọi người sống trong những căn hộ nhỏ. Một số ngôi nhà có một chiếc ghế sofa lớn trong phòng khách nơi cả gia đình cùng ngồi. Trong bếp, mọi ngôi nhà đều cần một chiếc tủ lạnh để giữ thức ăn tươi. Một số phòng ngủ có đèn để đọc sách vào ban đêm. Nhiều ngôi nhà có kệ để sách và đồ chơi. Một tấm gương giúp bạn nhìn thấy chính mình. Một tấm thảm mềm làm cho sàn nhà ấm cúng. Mỗi ngôi nhà có đồ đạc đặc biệt khiến nó có cảm giác như nhà!",
  check_questions: [
    {
      id: 1,
      question_en: "What do people need in the kitchen?",
      answer: ["fridge", "a fridge", "refrigerator"],
      hint_en: "It keeps food cold...",
      hint_vi: "Nó giữ thức ăn lạnh..."
    },
    {
      id: 2,
      question_en: "What helps you see yourself?",
      answer: ["mirror", "a mirror"],
      hint_en: "You look at it to see your face...",
      hint_vi: "Bạn nhìn vào nó để thấy khuôn mặt của mình..."
    },
    {
      id: 3,
      question_en: "What makes every house feel like home?",
      answer: ["furniture", "special furniture", "the furniture"],
      hint_en: "Things like chairs, tables, beds...",
      hint_vi: "Những thứ như ghế, bàn, giường..."
    }
  ],
  question: {
    text_en: "What furniture does your house have? What is special about your home?",
    text_vi: "Ngôi nhà của bạn có đồ đạc gì? Điều gì đặc biệt về ngôi nhà của bạn?",
    min_words: 30,
    hint_en: "Think about the rooms and furniture in your house...",
    hint_vi: "Hãy nghĩ về các phòng và đồ đạc trong nhà bạn..."
  }
};

export const chunk_focus = [
  "around the world",
  "big sofa",
  "in the living room",
  "whole family",
  "In the kitchen",
  "at night"
];

export const dictionary = {
    'In the kitchen': { word: 'In the kitchen', pronunciation: '/in the kitchen/', definition_vi: 'trong bếp', definition_en: 'meaning of in the kitchen', example: 'In the kitchen, I open the cabinet and look in the fridge.' },
    'around the world': { word: 'around the world', pronunciation: '/around the world/', definition_vi: 'khắp thế giới', definition_en: 'meaning of around the world', example: 'This is an example: around the world.' },
    'at night': { word: 'at night', pronunciation: '/at night/', definition_vi: '(cụm từ: at night)', definition_en: 'Multi-word phrase: at night', example: 'Use of \'at night\' in natural context.' },
    'big sofa': { word: 'big sofa', pronunciation: '/big sofa/', definition_vi: 'sofa lớn', definition_en: 'meaning of big sofa', example: 'The family sat together on the big sofa to watch a film.' },
    'in the living room': { word: 'in the living room', pronunciation: '/in the living room/', definition_vi: 'trong phòng khách', definition_en: 'meaning of in the living room', example: 'We watch TV in the living room.' },
    'whole family': { word: 'whole family', pronunciation: '/whole family/', definition_vi: 'toàn bộ gia đình', definition_en: 'Multi-word phrase: whole family', example: 'The phrase \'whole family\' is commonly used in conversation.' }
};
