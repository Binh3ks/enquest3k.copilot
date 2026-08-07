export default {
  title: "Plants Are Amazing!",
  image_url: "/images/week27/explore_cover_w27.jpg",
  content_en: "Did you know that plants **grow from** a **tiny seed**?\n\nEvery plant needs **three things**: water, sun, and **good soil**.\n\nFirst, the seed goes into the soil. Next, it drinks water and a small sprout **grows up**. **After that**, the stem grows tall. The **stem carries** water up to the leaf. The **leaf uses** sun to **make food**. Finally, a **beautiful flower** blooms **at the top**!\n\nThe root grows down under the soil. It drinks water for the whole plant.\n\nIn Vietnam, farmers grow rice from tiny seeds in wet fields. Rice needs **lots of water** and warm soil to grow.\n\nYou can grow a plant too! Put a seed in soil, add water, and put it near a **sunny window**.",
  content_vi: "Ban co biet rang cay moc tu mot hat giong nho khong?\n\nMoi cay can ba thu: nuoc, mat troi, va dat tot.\n\nDau tien, hat giong vao dat. Tiep theo, no uong nuoc va mot mam cay nho moc len. Sau do, than cay lon cao. Than cay chuyen nuoc len la cay. La cay dung mat troi de lam thuc an. Cuoi cung, mot bong hoa dep no o tren!\n\nRe cay moc xuong duoi dat. No uong nuoc cho toan bo cay.\n\nO Viet Nam, nong dan trong lua tu hat giong nho trong cac canh dong uot. Lua can nhieu nuoc va dat am de moc.\n\nBan cung co the trong cay! Dat hat giong vao dat, them nuoc, va de gan cua so co nang.",
  audio_url: "/audio/week27_easy/explore_main.mp3",
  check_questions: [
    {
      id: 1,
      question_en: "What three things does a seed need to grow?",
      answer: ["Water, sunlight, and soil", "Water, sunlight, and good soil", "Soil, water, and sunlight"],
      hint_en: "A seed needs water, sunlight, and...",
      hint_vi: "Hat giong can nuoc, anh sang mat troi, va...",
      audio_url: "/audio/week27_easy/explore_q1.mp3"
    },
    {
      id: 2,
      question_en: "What do leaves use sunlight for?",
      answer: ["To make food", "To make food for the plant", "To produce food"],
      hint_en: "A leaf uses sunlight to...",
      hint_vi: "La dung anh sang mat troi de...",
      audio_url: "/audio/week27_easy/explore_q2.mp3"
    },
    {
      id: 3,
      question_en: "What plant do Vietnamese farmers grow in wet fields?",
      answer: ["Rice", "Rice plants"],
      hint_en: "Farmers in Vietnam grow... in wet fields called rice paddies.",
      hint_vi: "Nong dan Viet Nam trong... trong cac ruong nuoc.",
      audio_url: "/audio/week27_easy/explore_q3.mp3"
    }
  ],
  question: {
    text_en: "Describe how a seed grows into a plant. Use sequence words: First, Next, After that, Finally. Use at least three of these words: seed, soil, water, sunlight, sprout, stem, leaf, flower.",
    text_vi: "Mo ta cach hat giong moc thanh cay. Dung: First, Next, After that, Finally. Dung it nhat ba tu: seed, soil, water, sunlight, sprout, stem, leaf, flower.",
    min_words: 30,
    hint_en: "First, a seed... Next, a sprout... After that, the stem... Finally, a flower...",
    hint_vi: "First, hat giong... Next, mam cay... After that, than cay... Finally, bong hoa..."
  }
};

export const chunk_focus = [
  "grow from",
  "tiny seed",
  "three things",
  "good soil",
  "grows up",
  "After that",
  "stem carries",
  "leaf uses",
  "make food",
  "beautiful flower",
  "at the top",
  "lots of water",
  "sunny window"
];

export const dictionary = {
    'After that': { word: 'After that', pronunciation: '/after that/', definition_vi: 'sau đó', definition_en: 'meaning of after that', example: 'We visited the museum in the morning and after that, we had lunch at a café.' },
    'at the top': { word: 'at the top', pronunciation: '/at the top/', definition_vi: 'at the top', definition_en: 'meaning of at the top', example: 'This is an example: at the top.' },
    'beautiful flower': { word: 'beautiful flower', pronunciation: '/beautiful flower/', definition_vi: 'hoa đẹp', definition_en: 'Multi-word phrase: beautiful flower', example: 'The phrase \'beautiful flower\' is commonly used in conversation.' },
    'good soil': { word: 'good soil', pronunciation: '/good soil/', definition_vi: 'good soil', definition_en: 'meaning of good soil', example: 'This is an example: good soil.' },
    'grow from': { word: 'grow from', pronunciation: '/grow from/', definition_vi: 'grow from', definition_en: 'meaning of grow from', example: 'This is an example: grow from.' },
    'grows up': { word: 'grows up', pronunciation: '/grows up/', definition_vi: 'grows up', definition_en: 'meaning of grows up', example: 'This is an example: grows up.' },
    'leaf uses': { word: 'leaf uses', pronunciation: '/leaf uses/', definition_vi: 'lá cây sử dụng', definition_en: 'Multi-word phrase: leaf uses', example: 'The phrase \'leaf uses\' is commonly used in conversation.' },
    'lots of water': { word: 'lots of water', pronunciation: '/lots of water/', definition_vi: 'nhiều nước', definition_en: 'meaning of lots of water', example: 'This is an example: lots of water.' },
    'make food': { word: 'make food', pronunciation: '/make food/', definition_vi: 'nấu đồ ăn', definition_en: 'meaning of make food', example: 'My grandmother knows how to make food that tastes like heaven.' },
    'stem carries': { word: 'stem carries', pronunciation: '/stem carries/', definition_vi: 'thân cây mang', definition_en: 'Multi-word phrase: stem carries', example: 'The phrase \'stem carries\' is commonly used in conversation.' },
    'sunny window': { word: 'sunny window', pronunciation: '/sunny window/', definition_vi: 'sunny window', definition_en: 'meaning of sunny window', example: 'This is an example: sunny window.' },
    'three things': { word: 'three things', pronunciation: '/three things/', definition_vi: 'ba thứ', definition_en: 'Multi-word phrase: three things', example: 'The phrase \'three things\' is commonly used in conversation.' },
    'tiny seed': { word: 'tiny seed', pronunciation: '/tiny seed/', definition_vi: 'tiny seed', definition_en: 'meaning of tiny seed', example: 'This is an example: tiny seed.' }
};
