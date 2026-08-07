export default {
  title_en: "Learning at Home",
  title_vi: "Học tập tại nhà",
  image_url: "/images/week2/explore_cover_w2.jpg",
  content_en: "**Learning** happens everywhere in our **home**. The **kitchen** is a great place to learn about **measurements** when we cook. We can **measure** water, flour, and sugar. The **living room** has books where we **practice** reading every day. Our **bedroom** is perfect for **studying** and doing homework quietly. We can **organize** our school supplies in drawers and on shelves. **Parents** help us create good study **habits** by setting up special learning spaces. When we have a quiet, clean place to **focus**, we learn much better. Every corner of our home can become a classroom!",
  content_vi: "Việc học diễn ra ở khắp nơi trong ngôi nhà của chúng ta. Bếp là nơi tuyệt vời để học về đo lường khi nấu ăn. Chúng ta có thể đo nước, bột mì và đường. Phòng khách có sách để chúng ta luyện đọc mỗi ngày. Phòng ngủ là nơi hoàn hảo để học và làm bài tập một cách yên tĩnh. Chúng ta có thể sắp xếp đồ dùng học tập trong ngăn kéo và trên kệ. Bố mẹ giúp chúng ta tạo thói quen học tập tốt bằng cách thiết lập các không gian học tập đặc biệt. Khi có một nơi yên tĩnh, sạch sẽ để tập trung, chúng ta học tốt hơn nhiều. Mỗi góc nhà đều có thể trở thành lớp học!",
  check_questions: [
    {
      id: 1,
      question_en: "Where can we learn about measurements?",
      question_vi: "Chúng ta có thể học về đo lường ở đâu?",
      answer: ["In the kitchen", "The kitchen", "Kitchen"],
      hint_en: "In the...",
      hint_vi: "Ở bếp..."
    },
    {
      id: 2,
      question_en: "What helps us learn better?",
      question_vi: "Thế nào giúp chúng ta học tốt hơn?",
      answer: ["A quiet, clean place", "Quiet place to focus", "Good study habits"],
      hint_en: "A quiet...",
      hint_vi: "Một nơi yên tĩnh..."
    },
    {
      id: 3,
      question_en: "Who helps us create good study habits?",
      question_vi: "Ai giúp chúng ta tạo thói quen học tập tốt?",
      answer: ["Parents", "Our parents", "Mom and dad"],
      hint_en: "Our...",
      hint_vi: "Bố mẹ..."
    }
  ],
  question: {
    text_en: "Where is your favorite place to study at home and why?",
    text_vi: "Nơi nào trong nhà bạn thích học nhất và tại sao?",
    min_words: 15,
    hint_en: "My favorite place is...",
    hint_vi: "Nơi tôi thích nhất là...",
    model_answer: "My favorite place to study is my bedroom. It is quiet and I can focus on my homework."
  }
};

export const chunk_focus = [
  "Learning",
  "home",
  "kitchen",
  "measurements",
  "measure",
  "living room",
  "practice",
  "bedroom",
  "studying",
  "organize",
  "Parents",
  "habits",
  "focus"
];

export const dictionary = {
    'Learning': { word: 'Learning', pronunciation: '/learning/', definition_vi: 'học', definition_en: 'meaning of learning', example: 'Learning new things is fun.' },
    'Parents': { word: 'Parents', pronunciation: '/parents/', definition_vi: 'bố mẹ', definition_en: 'meaning of parents', example: 'My parents are very kind.' },
    'bedroom': { word: 'bedroom', pronunciation: '/bedroom/', definition_vi: 'phòng ngủ', definition_en: 'a room where you sleep', example: 'I sleep in my bedroom.' },
    'focus': { word: 'focus', pronunciation: '/focus/', definition_vi: 'tập trung', definition_en: 'meaning of focus', example: 'When we have a quiet, clean place to focus, we learn much better.' },
    'habits': { word: 'habits', pronunciation: '/habits/', definition_vi: 'thói quen', definition_en: 'meaning of habits', example: 'Parents help us create good study habits by setting up special learning spaces.' },
    'home': { word: 'home', pronunciation: '/home/', definition_vi: 'Nhà, gia đình', definition_en: 'The place where you live with your family.', example: 'I go home after school.' },
    'kitchen': { word: 'kitchen', pronunciation: '/kitchen/', definition_vi: 'nhà bếp', definition_en: 'a room where you cook and eat', example: 'Mom is cooking in the kitchen.' },
    'living room': { word: 'living room', pronunciation: '/living room/', definition_vi: 'phòng khách', definition_en: 'a room where family sits together', example: 'My family watches TV together in the living room.' },
    'measure': { word: 'measure', pronunciation: '/measure/', definition_vi: 'đo lường', definition_en: 'meaning of measure', example: 'This involves measure in some way.' },
    'measurements': { word: 'measurements', pronunciation: '/measurements/', definition_vi: 'phép đo, số đo', definition_en: 'meaning of measurements', example: 'The kitchen is a great place to learn about measurements when we cook.' },
    'organize': { word: 'organize', pronunciation: '/organize/', definition_vi: 'sắp xếp, tổ chức', definition_en: 'meaning of organize', example: 'We can organize our school supplies in drawers and on shelves.' },
    'practice': { word: 'practice', pronunciation: '/practice/', definition_vi: 'Luyện tập', definition_en: 'to do something regularly to improve', example: 'She practices at school regularly.' },
    'studying': { word: 'studying', pronunciation: '/studying/', definition_vi: 'đang học, nghiên cứu', definition_en: 'meaning of studying', example: 'Our bedroom is perfect for studying and doing homework quietly.' }
};
