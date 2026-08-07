export default {
  title_en: "Why Does It Rain?",
  title_vi: "Tại Sao Trời Mưa?",
  image_url: "/images/week17/explore_cover_w17.jpg",
  audio_url: "/audio/week17_easy/explore_main.mp3",

  content_en: `
 Have you ever asked: why does it rain?

 The sun shines on water. The water gets hot. Then it **goes up into** the air. This is called evaporation! The water becomes light and floats up.

 The water goes high **up into** the atmosphere. The atmosphere is the air **around the Earth**. **Up there**, the water **gets cold**. It forms clouds!

 When **lots of water** is in the clouds, the clouds get heavy. Then the water **falls back down**. This is called precipitation!

 Precipitation can be rain. It can also be snow! When **it is very cold**, we get snowing **instead of** rain.

 On **sunny days**, you wear **light clothes**. You feel warm. On raining days, you wear your coat and carry your umbrella. We **dress for the weather**!
 `,

  content_vi: `
    Bạn đã bao giờ hỏi: tại sao trời mưa?

    Mặt trời chiếu vào nước. Nước trở nên nóng. Sau đó nó bay lên không khí. Điều này gọi là bốc hơi! Nước trở nên nhẹ và bay lên.

    Nước bay lên cao vào trong khí quyển. Khí quyển là không khí xung quanh Trái đất. Trên đó, nước trở nên lạnh. Nó tạo thành mây!

    Khi có nhiều nước trong mây, mây trở nên nặng. Sau đó nước rơi xuống. Điều này gọi là lượng mưa!

    Lượng mưa có thể là mưa. Nó cũng có thể là tuyết! Khi trời rất lạnh, chúng ta có tuyết thay vì mưa.

    Vào những ngày nắng, bạn mặc quần áo nhẹ. Bạn cảm thấy ấm. Vào những ngày mưa, bạn mặc áo khoác và mang ô. Chúng ta mặc đồ phù hợp với thời tiết!
  `,

  check_questions: [
    {
      id: 1,
      question_en: "What is evaporation?",
      question_vi: "Sự bốc hơi là gì?",
      answer_en: "Evaporation is water going up into the air.",
      answer_vi: "Sự bốc hơi là nước bay lên không khí."
    },
    {
      id: 2,
      question_en: "What do we wear on rainy days?",
      question_vi: "Chúng ta mặc gì vào những ngày mưa?",
      answer_en: "We wear a coat and carry an umbrella.",
      answer_vi: "Chúng ta mặc áo khoác và mang ô."
    },
    {
      id: 3,
      question_en: "What is precipitation?",
      question_vi: "Lượng mưa là gì?",
      answer_en: "Precipitation is rain or snow falling from clouds.",
      answer_vi: "Lượng mưa là mưa hoặc tuyết rơi từ mây."
    }
  ]
};

export const chunk_focus = [
  "goes up into",
  "up into",
  "around the Earth",
  "Up there",
  "gets cold",
  "lots of water",
  "falls back down",
  "it is very cold",
  "instead of",
  "sunny days",
  "light clothes",
  "dress for the weather"
];

export const dictionary = {
    'Up there': { word: 'Up there', pronunciation: '/up there/', definition_vi: '(cụm từ: up there)', definition_en: 'Multi-word phrase: up there', example: 'Use of \'up there\' in natural context.' },
    'around the Earth': { word: 'around the Earth', pronunciation: '/around the earth/', definition_vi: 'xung quanh Trái Đất', definition_en: 'meaning of around the earth', example: 'This is an example: around the earth.' },
    'dress for the weather': { word: 'dress for the weather', pronunciation: '/dress for the weather/', definition_vi: 'dress for the weather', definition_en: 'meaning of dress for the weather', example: 'This is an example: dress for the weather.' },
    'falls back down': { word: 'falls back down', pronunciation: '/falls back down/', definition_vi: 'falls back down', definition_en: 'meaning of falls back down', example: 'This is an example: falls back down.' },
    'gets cold': { word: 'gets cold', pronunciation: '/gets cold/', definition_vi: 'gets cold', definition_en: 'meaning of gets cold', example: 'This is an example: gets cold.' },
    'goes up into': { word: 'goes up into', pronunciation: '/goes up into/', definition_vi: 'goes up into', definition_en: 'meaning of goes up into', example: 'This is an example: goes up into.' },
    'instead of': { word: 'instead of', pronunciation: '/instead of/', definition_vi: 'thay vì', definition_en: 'meaning of instead of', example: 'This is an example: instead of.' },
    'it is very cold': { word: 'it is very cold', pronunciation: '/it is very cold/', definition_vi: 'Trời rất lạnh', definition_en: 'meaning of it is very cold', example: 'It is very cold today.' },
    'light clothes': { word: 'light clothes', pronunciation: '/light clothes/', definition_vi: 'quần áo mỏng', definition_en: 'meaning of light clothes', example: 'This is an example: light clothes.' },
    'lots of water': { word: 'lots of water', pronunciation: '/lots of water/', definition_vi: 'nhiều nước', definition_en: 'meaning of lots of water', example: 'This is an example: lots of water.' },
    'sunny days': { word: 'sunny days', pronunciation: '/sunny days/', definition_vi: 'những ngày nắng', definition_en: 'meaning of sunny days', example: 'This is an example: sunny days.' },
    'up into': { word: 'up into', pronunciation: '/up into/', definition_vi: 'lên trên', definition_en: 'Multi-word phrase: up into', example: 'The phrase \'up into\' is commonly used in conversation.' }
};
