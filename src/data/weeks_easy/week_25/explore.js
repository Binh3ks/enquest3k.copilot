export default {
  title: "Robots and Recipes: Following Steps",
  image_url: "/images/week25/explore_cover_w25.jpg",
  content_en: "Do you know how robots work? Robots **follow steps** — **just like** you do!\n\nWhen you teach a robot to **make a sandwich**, you give it a list of steps to follow. The robot does each step **in order**. It does step one first, then step two, and so on.\n\nRobots cannot **think for themselves**. If you miss one step, the robot **gets confused** and stops. This is why the order of steps is very important.\n\nScientists write steps for robots in a special way. They call it a recipe or a sequence. A sequence means doing things **in the right order**.\n\nYou also use sequences **every day**! When you **brush your teeth**, you follow a sequence: first **put on** toothpaste, next **brush your teeth**, then spit it out, finally **rinse your mouth**. Each step is important!",
  content_vi: "Ban biet robot hoat dong nhu the nao khong? Robot lam theo cac buoc - giong nhu ban vay!\n\nKhi ban day robot lam banh mi ban cho no mot danh sach cac buoc can lam. Robot lam tung buoc theo thu tu.\n\nRobot khong the tu nghi. Neu ban bo qua mot buoc robot se bi nham va dung lai. Do la ly do tai sao thu tu cua cac buoc rat quan trong.\n\nCac nha khoa hoc viet buoc cho robot theo mot cach dac biet. Ho goi no la cong thuc hoac trinh tu. Trinh tu co nghia la lam viec theo dung thu tu.\n\nBan cung dung trinh tu moi ngay! Khi ban danh rang ban lam theo mot trinh tu: dau tien cho kem danh rang tiep theo danh rang sau do nho ra cuoi cung suc mieng.",
  audio_url: "/audio/week25_easy/explore_main.mp3",
  check_questions: [
    {
      id: 1,
      question_en: "What does a robot follow to do a job?",
      answer: ["Steps", "A list of steps", "A sequence of steps"],
      hint_en: "Robots follow a list of...",
      hint_vi: "Robot lam theo mot danh sach cac...",
      audio_url: "/audio/week25_easy/explore_q1.mp3"
    },
    {
      id: 2,
      question_en: "What happens if you miss one step when giving instructions to a robot?",
      answer: ["The robot gets confused and stops", "It gets confused", "The robot stops"],
      hint_en: "If you miss a step the robot gets confused and...",
      hint_vi: "Neu bo qua mot buoc robot se bi nham lan va...",
      audio_url: "/audio/week25_easy/explore_q2.mp3"
    },
    {
      id: 3,
      question_en: "Name ONE step in the tooth-brushing sequence.",
      answer: ["Put on toothpaste", "Brush your teeth", "Rinse your mouth", "Spit it out", "First put toothpaste", "Finally rinse mouth"],
      hint_en: "When you brush your teeth you: First put on toothpaste, Next...",
      hint_vi: "Khi ban danh rang ban: Dau tien cho kem danh rang Tiep theo...",
      audio_url: "/audio/week25_easy/explore_q3.mp3"
    }
  ],
  question: {
    text_en: "Think of a simple task you do every day. Use First, Next, Then, Finally to describe the steps.",
    text_vi: "Hay nghi ve mot viec don gian ban lam moi ngay. Dung First Next Then Finally de mo ta cac buoc.",
    min_words: 20,
    hint_en: "First I... Next I... Then I... Finally I...",
    hint_vi: "Dau tien toi... Tiep theo toi... Sau do toi... Cuoi cung toi..."
  }
};

export const chunk_focus = [
  "follow steps",
  "just like",
  "make a sandwich",
  "in order",
  "think for themselves",
  "gets confused",
  "in the right order",
  "every day",
  "brush your teeth",
  "put on",
  "rinse your mouth"
];

export const dictionary = {
    'brush your teeth': { word: 'brush your teeth', pronunciation: '/brush your teeth/', definition_vi: 'chải răng', definition_en: 'meaning of brush your teeth', example: 'Remember to brush your teeth twice a day, morning and night.' },
    'every day': { word: 'every day', pronunciation: '/every day/', definition_vi: 'mỗi ngày', definition_en: 'meaning of every day', example: 'This is my family. My mother is kind. She makes food for us every day. My father is strong. He plays with me in the park.' },
    'follow steps': { word: 'follow steps', pronunciation: '/follow steps/', definition_vi: 'làm theo các bước', definition_en: 'meaning of follow steps', example: 'This is an example: follow steps.' },
    'gets confused': { word: 'gets confused', pronunciation: '/gets confused/', definition_vi: 'trở nên bối rối', definition_en: 'Collocation: gets confused', example: 'The students learned \'gets confused\' in their English lesson.' },
    'in order': { word: 'in order', pronunciation: '/in order/', definition_vi: 'in thứ tự', definition_en: 'English phrase: in order', example: 'The phrase \'in order\' means in thứ tự.' },
    'in the right order': { word: 'in the right order', pronunciation: '/in the right order/', definition_vi: 'trong right order', definition_en: 'ESL phrase: in the right order', example: 'The students practiced using \'in the right order\' in class.' },
    'just like': { word: 'just like', pronunciation: '/just like/', definition_vi: 'giống như', definition_en: 'in the same way as', example: 'A bicycle is slow and steady, just like the tortoise.' },
    'make a sandwich': { word: 'make a sandwich', pronunciation: '/make a sandwich/', definition_vi: 'làm bánh sandwich', definition_en: 'meaning of make a sandwich', example: 'This is an example: make a sandwich.' },
    'put on': { word: 'put on', pronunciation: '/put on/', definition_vi: 'mặc', definition_en: 'meaning of put on', example: 'This is an example: put on.' },
    'rinse your mouth': { word: 'rinse your mouth', pronunciation: '/rinse your mouth/', definition_vi: 'súc miệng', definition_en: 'meaning of rinse your mouth', example: 'After brushing, rinse your mouth with clean water.' },
    'think for themselves': { word: 'think for themselves', pronunciation: '/think for themselves/', definition_vi: 'nghĩ cho themselves', definition_en: 'English phrase: think for themselves', example: 'The phrase \'think for themselves\' means nghĩ cho themselves.' }
};
