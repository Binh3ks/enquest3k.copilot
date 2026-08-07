export default {
  title_en: "Tools Scientists Use",
  title_vi: "Công cụ mà các nhà khoa học sử dụng",
  image_url: "/images/week1/explore_cover_w01.jpg",
  audio_url: "/audio/week1/explore_main.mp3",
  content_en: "Scientists use many tools to **learn about** the world. A magnifying glass helps us **look at** **tiny insects** and small leaves more clearly. A microscope is even more powerful and helps scientists **observe very small things**. Scientists also use notebooks to **write down** what they discover. They measure things with rulers and scales. All these **tools help scientists** **make new discoveries** **every day**. Maybe you can be a scientist too!",
  content_vi: "Các nhà khoa học sử dụng nhiều công cụ để tìm hiểu về thế giới. Kính lúp giúp chúng ta nhìn những con côn trùng nhỏ và những chiếc lá nhỏ rõ hơn. Kính hiển vi còn mạnh hơn nữa và giúp các nhà khoa học quan sát những thứ rất nhỏ. Các nhà khoa học cũng dùng sổ tay để ghi lại những gì họ khám phá. Họ đo đạc mọi thứ bằng thước kẻ và cân. Tất cả những công cụ này giúp các nhà khoa học có những khám phá mới mỗi ngày. Có lẽ bạn cũng có thể trở thành một nhà khoa học!",
  check_questions: [
    { id: 1, question_en: "What does a magnifying glass do?", answer: ["It makes small things look bigger", "Makes things bigger", "Helps us see small things"], hint_en: "It helps us...", hint_vi: "Nó giúp chúng ta..." },
    { id: 2, question_en: "What tool is more powerful than a magnifying glass?", answer: ["A microscope", "Microscope"], hint_en: "M...", hint_vi: "Kính hiển..." },
    { id: 3, question_en: "What do scientists use to write down discoveries?", answer: ["Notebooks", "A notebook", "Their notebooks"], hint_en: "They write in...", hint_vi: "Họ viết vào..." }
  ],
  question: {
    text_en: "If you were a scientist, what would you like to study and why?",
    text_vi: "Nếu bạn là nhà khoa học, bạn muốn nghiên cứu gì và tại sao?",
    min_words: 20,
    hint_en: "If I were a scientist, I would study...",
    hint_vi: "Nếu tôi là nhà khoa học, tôi sẽ nghiên cứu..."
  }
};

export const chunk_focus = [
  "learn about",
  "look at",
  "tiny insects",
  "observe very small things",
  "write down",
  "tools help scientists",
  "make new discoveries",
  "every day"
];

export const dictionary = {
    'every day': { word: 'every day', pronunciation: '/every day/', definition_vi: 'mỗi ngày', definition_en: 'meaning of every day', example: 'This is my family. My mother is kind. She makes food for us every day. My father is strong. He plays with me in the park.' },
    'learn about': { word: 'learn about', pronunciation: '/learn about/', definition_vi: 'học về', definition_en: 'meaning of learn about', example: 'This is an example: learn about.' },
    'look at': { word: 'look at', pronunciation: '/look at/', definition_vi: 'nhìn xem', definition_en: 'meaning of look at', example: 'Look at that beautiful rainbow in the sky after the rain!' },
    'make new discoveries': { word: 'make new discoveries', pronunciation: '/make new discoveries/', definition_vi: 'có những khám phá mới', definition_en: 'to find or learn something new', example: 'All these tools help scientists make new discoveries every day.' },
    'observe very small things': { word: 'observe very small things', pronunciation: '/observe very small things/', definition_vi: 'quan sát những thứ rất nhỏ', definition_en: 'to look at tiny things carefully', example: 'A microscope helps scientists observe very small things.' },
    'tiny insects': { word: 'tiny insects', pronunciation: '/tiny insects/', definition_vi: 'côn trùng nhỏ', definition_en: 'meaning of tiny insects', example: 'This is an example: tiny insects.' },
    'tools help scientists': { word: 'tools help scientists', pronunciation: '/tools help scientists/', definition_vi: 'tools help scientists', definition_en: 'meaning of tools help scientists', example: 'This is an example: tools help scientists.' },
    'write down': { word: 'write down', pronunciation: '/write down/', definition_vi: 'ghi lại', definition_en: 'to record something in writing', example: 'Scientists write down what they discover in their notebooks.' }
};
