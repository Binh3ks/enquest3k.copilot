// WEEK 35: Environmental Issues
// Explore Station — Easy Mode
// Theme: Climate Science
// ~140 words (Blueprint Block E, W32-35)

export default {
  title_en: "Climate Science: Our Changing Planet",
  title_vi: "Khoa Học Khí Hậu: Hành Tinh Đang Thay Đổi",
  content_en: `What is **climate change**?

**Climate change** means the Earth's climate is **getting warmer**. The planet is about **1.1°C warmer** than 100 **years ago**. This sounds small, but it causes big problems for **animals and people**.

Why is the Earth warming up?

When we **burn fossil fuels** like coal, oil, and gas, we put **greenhouse gases** into the air. These gases are like a **warm blanket** **around the earth**. They trap heat from the sun and make the planet hotter.

What is the **greenhouse effect**?

The sun sends light to Earth. The Earth reflects some heat back. But **greenhouse gases** trap this heat. More gases = more heat = a **warmer planet**.

**What happens** when ice melts?

When **polar ice** melts, it becomes water. This water goes into the ocean. Then **sea levels** rise. Some **animal homes** disappear under the water.

The **good news**: We can all help! We **must protect** **our planet**!`,
  content_vi: `Biến đổi khí hậu nghĩa là gì?

Biến đổi khí hậu có nghĩa là khí hậu của Trái Đất đang nóng lên. Hành tinh ấm hơn khoảng 1,1°C so với 100 năm trước. Điều này nghe có vẻ nhỏ, nhưng nó gây ra những vấn đề lớn cho động vật và con người.

Tại sao Trái Đất đang nóng lên?

Khi chúng ta đốt nhiên liệu hóa thạch như than, dầu, và khí, chúng ta thải khí nhà kính vào không khí. Các khí này như một tấm chăn ấm quanh Trái Đất. Chúng giữ nhiệt từ mặt trời và làm hành tinh nóng hơn.

Hiệu ứng nhà kính là gì?

Mặt trời gửi ánh sáng đến Trái Đất. Trái Đất phản xạ một phần nhiệt trở lại. Nhưng khí nhà kính giữ nhiệt này. Nhiều khí hơn = nhiều nhiệt hơn = hành tinh nóng hơn.

Điều gì xảy ra khi băng tan chảy?

Khi băng ở hai cực tan chảy, nó trở thành nước. Nước này chảy vào đại dương. Sau đó mực nước biển dâng cao. Một số nhà của động vật biến mất dưới nước.

Tin tốt: Tất cả chúng ta đều có thể giúp! Chúng ta phải bảo vệ hành tinh của mình!`,
  audio_narration: "/audio/week35_easy/explore_narration.mp3",
  image_url: "/images/week35/explore_cover_w35.jpg",
  check_questions: [
    {
      id: 1,
      question_en: "What makes the Earth warmer?",
      answer: ["Burning fossil fuels and greenhouse gases", "Greenhouse gases that trap heat in the atmosphere", "Too much sunlight hitting the planet"],
      hint_en: "The text says: When we ___ ___ like coal, oil, and gas, we put greenhouse gases into the air.",
      hint_vi: "Bài đọc nói: Khi chúng ta ___ ___ như than, dầu, và khí, chúng ta thải khí nhà kính vào không khí.",
      audio_url: "/audio/week35_easy/explore_q1.mp3"
    },
    {
      id: 2,
      question_en: "What happens when polar ice melts?",
      answer: ["Sea levels rise and some animal homes disappear", "The ocean becomes colder", "The Earth gets cooler"],
      hint_en: "The text says: When polar ice melts, ___ ___ rise.",
      hint_vi: "Bài đọc nói: Khi băng ở hai cực tan chảy, ___ ___ dâng cao.",
      audio_url: "/audio/week35_easy/explore_q2.mp3"
    },
    {
      id: 3,
      question_en: "How much warmer is the Earth compared to 100 years ago?",
      answer: ["About 1.1°C warmer", "About 11°C warmer", "About 0.1°C warmer"],
      hint_en: "The text says: The planet is about ___°C warmer than 100 years ago.",
      hint_vi: "Bài đọc nói: Hành tinh ấm hơn khoảng ___°C so với 100 năm trước.",
      audio_url: "/audio/week35_easy/explore_q3.mp3"
    },
    {
      id: 99,
      type: "critical_thinking",
      question_en: "What is one thing you can do at home to help reduce climate change?",
      answer: ["Turn off lights when not in use to save energy", "Use less plastic and recycle more", "Plant trees or use less water"],
      hint_en: "Think about what uses energy or creates waste at home.",
      hint_vi: "Hãy nghĩ về điều gì sử dụng năng lượng hoặc tạo rác thải ở nhà.",
      audio_url: "/audio/week35_easy/explore_q4.mp3"
    }
  ],
  writing_prompt_en: "Write 3 things that cause climate change. Then write 3 things we can do to help the planet.",
  writing_prompt_vi: "Viết 3 điều gây ra biến đổi khí hậu. Sau đó viết 3 điều chúng ta có thể làm để giúp hành tinh.",
  question: {
    text_en: "What is one thing you can do at home to help reduce climate change? Why is it important?",
    text_vi: "Một điều bạn có thể làm ở nhà để giúp giảm biến đổi khí hậu là gì? Tại sao nó quan trọng?",
    min_words: 15,
    hint_en: "I can ___ at home because it helps ___.",
    hint_vi: "Tôi có thể ___ ở nhà vì nó giúp ___.",
  }
};

export const chunk_focus = [
  "climate change",
  "Climate change",
  "getting warmer",
  "1.1°C warmer",
  "years ago",
  "animals and people",
  "burn fossil fuels",
  "greenhouse gases",
  "warm blanket",
  "around the earth",
  "greenhouse effect",
  "warmer planet",
  "What happens",
  "polar ice",
  "sea levels",
  "animal homes",
  "good news",
  "must protect",
  "our planet"
];

export const dictionary = {
    '1.1°C warmer': { word: '1.1°C warmer', pronunciation: '/1.1°c warmer/', definition_vi: '1.1°c warmer', definition_en: 'key phrase: 1.1°c warmer', example: 'They used the phrase \'1.1°c warmer\' in their reading.' },
    'Climate change': { word: 'Climate change', pronunciation: '/ˈklaɪmət tʃeɪndʒ/', definition_vi: 'biến đổi khí hậu', definition_en: 'meaning of climate change', example: 'Climate change is making the Earth warmer.' },
    'What happens': { word: 'What happens', pronunciation: '/what happens/', definition_vi: 'điều gì xảy ra', definition_en: 'Multi-word phrase: what happens', example: 'The phrase \'what happens\' is commonly used in conversation.' },
    'animal homes': { word: 'animal homes', pronunciation: '/animal homes/', definition_vi: 'nơi ở của động vật', definition_en: 'Multi-word phrase: animal homes', example: 'The phrase \'animal homes\' is commonly used in conversation.' },
    'animals and people': { word: 'animals and people', pronunciation: '/animals and people/', definition_vi: 'động vật và con người', definition_en: 'meaning of animals and people', example: 'On the farm, animals and people live and work together every day.' },
    'around the earth': { word: 'around the earth', pronunciation: '/around the earth/', definition_vi: 'xung quanh Trái Đất', definition_en: 'meaning of around the earth', example: 'This is an example: around the earth.' },
    'burn fossil fuels': { word: 'burn fossil fuels', pronunciation: '/burn fossil fuels/', definition_vi: 'đốt nhiên liệu hóa thạch', definition_en: 'meaning of burn fossil fuels', example: 'This is an example: burn fossil fuels.' },
    'climate change': { word: 'climate change', pronunciation: '/ˈklaɪmət tʃeɪndʒ/', definition_vi: 'biến đổi khí hậu', definition_en: 'meaning of climate change', example: 'Climate change is making the Earth warmer.' },
    'getting warmer': { word: 'getting warmer', pronunciation: '/getting warmer/', definition_vi: 'đang ấm hơn', definition_en: 'Multi-word phrase: getting warmer', example: 'The phrase \'getting warmer\' is commonly used in conversation.' },
    'good news': { word: 'good news', pronunciation: '/good news/', definition_vi: 'tin tốt', definition_en: 'Multi-word phrase: good news', example: 'The phrase \'good news\' is commonly used in conversation.' },
    'greenhouse effect': { word: 'greenhouse effect', pronunciation: '/greenhouse effect/', definition_vi: 'hiệu ứng nhà kính', definition_en: 'meaning of greenhouse effect', example: 'This is an example: greenhouse effect.' },
    'greenhouse gases': { word: 'greenhouse gases', pronunciation: '/greenhouse gases/', definition_vi: 'khí nhà kính', definition_en: 'meaning of greenhouse gases', example: 'This is an example: greenhouse gases.' },
    'must protect': { word: 'must protect', pronunciation: '/must protect/', definition_vi: 'phải bảo vệ', definition_en: 'meaning of must protect', example: 'This is an example: must protect.' },
    'our planet': { word: 'our planet', pronunciation: '/our planet/', definition_vi: 'hành tinh của chúng ta', definition_en: 'the Earth where we live', example: 'We must protect our planet every day.' },
    'polar ice': { word: 'polar ice', pronunciation: '/ˈpoʊlər aɪs/', definition_vi: 'băng ở hai cực', definition_en: 'meaning of polar ice', example: 'Polar ice is melting because of climate change.' },
    'sea levels': { word: 'sea levels', pronunciation: '/sea levels/', definition_vi: 'mực nước biển', definition_en: 'meaning of sea levels', example: 'This is an example: sea levels.' },
    'warm blanket': { word: 'warm blanket', pronunciation: '/warm blanket/', definition_vi: 'chăn ấm', definition_en: 'meaning of warm blanket', example: 'This is an example: warm blanket.' },
    'warmer planet': { word: 'warmer planet', pronunciation: '/warmer planet/', definition_vi: 'warmer planet', definition_en: 'meaning of warmer planet', example: 'This is an example: warmer planet.' },
    'years ago': { word: 'years ago', pronunciation: '/years ago/', definition_vi: 'nhiều năm trước', definition_en: 'Multi-word phrase: years ago', example: 'The phrase \'years ago\' is commonly used in conversation.' }
};
