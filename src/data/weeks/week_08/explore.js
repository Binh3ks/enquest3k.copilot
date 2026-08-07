export default {
  title_en: "Classrooms Around the World",
  title_vi: "Lớp Học Khắp Thế Giới",
  image_url: "/images/week8/explore_cover_w08.jpg",
  audio_url: "/audio/week8/explore_main.mp3",
  content_en: "**There are** classrooms in every country! But they are all different. In Japan, **there are** desks for every student. **There are** about **30 students** in each Japanese class. **There are** also daily chores — students clean the classroom each day! In Finland, **there are** small classes — only 20 students. **There are** comfortable chairs and **soft lighting**. In Brazil, some outdoor classrooms have no walls! **There are** students learning under trees. **There are** boards, bags, and pencils everywhere. In the USA, **there are** colorful shelves full of books. **There are** art corners with crayons and markers. In Vietnam, **there are** **neat rows** of desks and chairs. **There are** boards **at the front** where teachers write. All these classrooms are different, but they all share **one thing**: **there are** students who love **to learn**!",
  content_vi: "Có lớp học ở mọi quốc gia! Nhưng tất cả đều khác nhau. Ở Nhật Bản, có bàn học cho mỗi học sinh. Có khoảng 30 học sinh trong mỗi lớp Nhật. Cũng có nhiệm vụ hàng ngày — học sinh dọn dẹp lớp mỗi ngày! Ở Phần Lan, có các lớp nhỏ — chỉ 20 học sinh. Có những ghế thoải mái và ánh sáng dịu. Ở Brazil, một số lớp ngoài trời không có tường! Có học sinh học dưới cây. Có bảng, túi, và bút chì ở khắp nơi. Ở Mỹ, có kệ đầy màu sắc chứa đầy sách. Có góc nghệ thuật với bút sáp và bút lông. Ở Việt Nam, có những hàng bàn và ghế ngay ngắn. Có bảng ở phía trước nơi giáo viên viết. Tất cả các lớp học này đều khác nhau, nhưng chúng đều có một điểm chung: có học sinh yêu thích học hỏi!",
  check_questions: [
    {
      id: 1,
      question_en: "How many students are in a typical Japanese class?",
      answer: ["30 students", "about 30", "30"],
      hint_en: "Read about Japan...",
      hint_vi: "Đọc về Nhật Bản..."
    },
    {
      id: 2,
      question_en: "What do Japanese students do every day in the classroom?",
      answer: ["clean the classroom", "cleaning", "chores"],
      hint_en: "It's their daily chore...",
      hint_vi: "Đó là nhiệm vụ hàng ngày của họ..."
    },
    {
      id: 3,
      question_en: "What do all classrooms around the world have in common?",
      answer: ["students who love to learn", "students", "learning"],
      hint_en: "The last sentence tells us...",
      hint_vi: "Câu cuối cùng cho chúng ta biết..."
    }
  ],
  question: {
    text_en: "What is in your classroom? How many students and desks are there? Tell me about your classroom!",
    text_vi: "Trong lớp học của bạn có gì? Có bao nhiêu học sinh và bàn? Kể cho tôi nghe về lớp học của bạn!",
    min_words: 30,
    hint_en: "Use There are... to describe your classroom...",
    hint_vi: "Dùng There are... để mô tả lớp học của bạn..."
  }
};

export const chunk_focus = [
  "There are",
  "there are",
  "30 students",
  "soft lighting",
  "neat rows",
  "at the front",
  "one thing",
  "to learn"
];

export const dictionary = {
    '30 students': { word: '30 students', pronunciation: '/30 students/', definition_vi: '30 học sinh', definition_en: 'a group of thirty students', example: 'There are 30 students in our class.' },
    'There are': { word: 'There are', pronunciation: '/there are/', definition_vi: 'có (nhiều)', definition_en: 'meaning of there are', example: 'In my classroom, there are twenty desks and one big whiteboard.' },
    'at the front': { word: 'at the front', pronunciation: '/at the front/', definition_vi: 'ở phía trước', definition_en: 'meaning of at the front', example: 'I can see a colorful picture on the wall and a big door at the front.' },
    'neat rows': { word: 'neat rows', pronunciation: '/neat rows/', definition_vi: 'hàng ngay ngắn', definition_en: 'Multi-word phrase: neat rows', example: 'The phrase \'neat rows\' is commonly used in conversation.' },
    'one thing': { word: 'one thing', pronunciation: '/one thing/', definition_vi: '(cụm từ: one thing)', definition_en: 'Multi-word phrase: one thing', example: 'Use of \'one thing\' in natural context.' },
    'soft lighting': { word: 'soft lighting', pronunciation: '/soft lighting/', definition_vi: 'ánh sáng mềm', definition_en: 'Multi-word phrase: soft lighting', example: 'The phrase \'soft lighting\' is commonly used in conversation.' },
    'there are': { word: 'there are', pronunciation: '/there are/', definition_vi: 'có (nhiều)', definition_en: 'meaning of there are', example: 'In my classroom, there are twenty desks and one big whiteboard.' },
    'to learn': { word: 'to learn', pronunciation: '/to learn/', definition_vi: 'để học', definition_en: 'meaning of to learn', example: 'I want to learn English every day.' }
};
