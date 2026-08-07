export default {
  title_en: "Real Detectives: How Science Finds the Clues",
  title_vi: "Thám Tử Thực Sự: Khoa Học Tìm Manh Mối Như Thế Nào",
  image_url: "/images/week22/explore_cover_w22.jpg",
  audio_url: "/audio/week22_easy/explore_main.mp3",
  content_en: `
 Real detectives use more than their eyes — they also use science. Science helps detectives **solve cases** **all over the world**!

 When something happens, a detective goes to the place and **looks for** clues. A clue can be a fingerprint, a hair, or a footprint. The detective writes **every clue** clearly in a notebook. Later, all these clues go into an **official report**.

 Scientists discovered that every person leaves tiny clues wherever they go. So if a suspect was somewhere yesterday or **last night**, the clues will still be there!

 Detectives also **do interviews** with people who saw **what happened**. In an interview, they ask **one question** **at a time** and **listen to** **every answer**. Did you walk here **last week**? What did you see **last night**? Each answer is a new **piece of the puzzle**.

 **Because of** **forensic science**, many cases are solved and **innocent people** are protected.
 `,
  content_vi: `
    Các thám tử thực sự dùng nhiều hơn mắt — họ cũng dùng khoa học. Khoa học giúp thám tử giải quyết case trên toàn thế giới!

    Khi có chuyện xảy ra, một thám tử đến địa điểm và tìm kiếm manh mối. Một manh mối có thể là dấu vân tay, sợi tóc, hoặc dấu chân. Thám tử ghi mọi manh mối rõ ràng vào sổ tay. Sau đó, tất cả manh mối này đưa vào một báo cáo chính thức.

    Các nhà khoa học phát hiện rằng mỗi người để lại manh mối nhỏ ở bất cứ đâu họ đi. Vì vậy nếu một nghi phạm ở đâu đó hôm qua hay tối qua, các manh mối vẫn sẽ ở đó!

    Các thám tử cũng thực hiện phỏng vấn với người chứng kiến. Trong một phỏng vấn, họ đặt từng câu hỏi một và lắng nghe mọi câu trả lời. Bạn có đi đến đây tuần trước không? Bạn thấy gì tối qua? Mỗi câu trả lời là một mảnh ghép mới của câu đố.

    Nhờ khoa học điều tra, nhiều case được giải quyết và người vô tội được bảo vệ.
  `,
  check_questions: [
    {
      id: 1,
      question_en: "Name two types of clues a detective can find at a crime scene.",
      question_vi: "Kể hai loại manh mối mà thám tử có thể tìm thấy tại hiện trường.",
      answer: ["Fingerprint and hair", "Fingerprint and footprint", "Hair and footprint", "A fingerprint", "A hair", "A footprint"],
      hint_en: "A fingerprint, a hair, or a...",
      hint_vi: "Dấu vân tay, sợi tóc, hoặc..."
    },
    {
      id: 2,
      question_en: "Why do detectives ask questions about yesterday and last night?",
      question_vi: "Tại sao thám tử hỏi câu hỏi về hôm qua và tối qua?",
      answer: ["Because suspects leave clues wherever they go", "To find out where the suspect was", "Because clues from yesterday are still there"],
      hint_en: "Because every person leaves clues...",
      hint_vi: "Vì mỗi người để lại manh mối..."
    },
    {
      id: 3,
      question_en: "What does a detective write after finding all the clues?",
      question_vi: "Thám tử viết gì sau khi tìm thấy tất cả các manh mối?",
      answer: ["A report", "An official report", "report"],
      hint_en: "All clues go into a...",
      hint_vi: "Tất cả manh mối đưa vào..."
    }
  ],
  question: {
    text_en: "You are a detective. You find three clues at a scene. Write about the clues and two questions you would ask a suspect about yesterday and last night.",
    text_vi: "Bạn là thám tử. Bạn tìm thấy ba manh mối tại hiện trường. Hãy viết về các manh mối và hai câu hỏi bạn sẽ hỏi nghi phạm về hôm qua và tối qua.",
    min_words: 20,
    hint_en: "I found a clue: ... Then I asked the suspect: Did you...yesterday? Did you...last night?",
    hint_vi: "Tôi tìm thấy manh mối: ... Sau đó tôi hỏi nghi phạm: Bạn có...hôm qua không?"
  }
};

export const chunk_focus = [
  "solve cases",
  "all over the world",
  "looks for",
  "every clue",
  "official report",
  "last night",
  "do interviews",
  "what happened",
  "one question",
  "at a time",
  "listen to",
  "every answer",
  "last week",
  "piece of the puzzle",
  "Because of",
  "forensic science",
  "innocent people"
];

export const dictionary = {
    'Because of': { word: 'Because of', pronunciation: '/because of/', definition_vi: 'bởi vì', definition_en: 'meaning of because of', example: 'This is an example: because of.' },
    'all over the world': { word: 'all over the world', pronunciation: '/all over the world/', definition_vi: 'khắp thế giới', definition_en: 'meaning of all over the world', example: 'This is an example: all over the world.' },
    'at a time': { word: 'at a time', pronunciation: '/at a time/', definition_vi: 'mỗi lần', definition_en: 'meaning of at a time', example: 'This is an example: at a time.' },
    'do interviews': { word: 'do interviews', pronunciation: '/do interviews/', definition_vi: 'thực hiện các cuộc phỏng vấn', definition_en: 'English phrase: do interviews', example: 'The phrase \'do interviews\' means thực hiện các cuộc phỏng vấn.' },
    'every answer': { word: 'every answer', pronunciation: '/every answer/', definition_vi: 'mỗi câu trả lời', definition_en: 'Multi-word phrase: every answer', example: 'The phrase \'every answer\' is commonly used in conversation.' },
    'every clue': { word: 'every clue', pronunciation: '/every clue/', definition_vi: 'mỗi manh mối', definition_en: 'Multi-word phrase: every clue', example: 'The phrase \'every clue\' is commonly used in conversation.' },
    'forensic science': { word: 'forensic science', pronunciation: '/forensic science/', definition_vi: 'pháp y khoa học', definition_en: 'Key collocation: forensic science', example: 'Natural usage of \'forensic science\' in sentence context.' },
    'innocent people': { word: 'innocent people', pronunciation: '/innocent people/', definition_vi: 'người vô tội', definition_en: 'Multi-word phrase: innocent people', example: 'The phrase \'innocent people\' is commonly used in conversation.' },
    'last night': { word: 'last night', pronunciation: '/last night/', definition_vi: 'tối qua', definition_en: 'the night before this morning', example: 'Last night I read a book before going to sleep.' },
    'last week': { word: 'last week', pronunciation: '/last week/', definition_vi: 'tuần trước', definition_en: 'the week before this week', example: 'Last week our class went on a trip to the park.' },
    'listen to': { word: 'listen to', pronunciation: '/listen to/', definition_vi: 'listen đến', definition_en: 'Key collocation: listen to', example: 'Natural usage of \'listen to\' in sentence context.' },
    'looks for': { word: 'looks for', pronunciation: '/looks for/', definition_vi: 'tìm kiếm', definition_en: 'tries to find something', example: 'A detective looks for clues at the scene.' },
    'official report': { word: 'official report', pronunciation: '/official report/', definition_vi: 'cụm từ vựng: official report', definition_en: 'Collocation: official report', example: 'The students learned \'official report\' in their English lesson.' },
    'one question': { word: 'one question', pronunciation: '/one question/', definition_vi: 'một câu hỏi', definition_en: 'a single question', example: 'The detective asks one question at a time.' },
    'piece of the puzzle': { word: 'piece of the puzzle', pronunciation: '/piece of the puzzle/', definition_vi: 'piece của the puzzle', definition_en: 'Key collocation: piece of the puzzle', example: 'Natural usage of \'piece of the puzzle\' in sentence context.' },
    'solve cases': { word: 'solve cases', pronunciation: '/solve cases/', definition_vi: 'cụm từ vựng: solve cases', definition_en: 'Collocation: solve cases', example: 'The students learned \'solve cases\' in their English lesson.' },
    'what happened': { word: 'what happened', pronunciation: '/what happened/', definition_vi: 'chuyện gì đã xảy ra', definition_en: 'Multi-word phrase: what happened', example: 'The phrase \'what happened\' is commonly used in conversation.' }
};
