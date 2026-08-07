export default {
  title: "My Presentation Day",
  image_url: "/images/week14/read_cover_w14.jpg",
  audio_url: "/audio/week14_easy/read_explore_main.mp3",
  content_en: "Welcome to my presentation! **My name** is Emma. I am **8 years old**. Today I **present my poster**. I want to **show you my world**. This is my **loving family**. I love **my family**. I have 4 people in **my family**. **My mom**, **my dad**, **my sister**, and me. Now I tell you about my talents. I can **sing very well**. I can also **dance happily**. I am good at **drawing pictures**. I **draw animals** and flowers. I **feel very confident** today. The audience **listen to me**. I **feel proud** of **my work**. **Thank you for listening**! Do you **have questions**? This is my **very special day**!",
  content_vi: "Chào mừng đến với bài thuyết trình của tôi! Tên tôi là Emma. Tôi 8 tuổi. Hôm nay tôi trình bày poster của tôi. Tôi muốn cho bạn xem thế giới của tôi. Đây là gia đình tôi. Tôi yêu gia đình tôi. Tôi có 4 người trong gia đình. Mẹ tôi, bố tôi, chị gái tôi và tôi. Bây giờ tôi kể cho bạn về tài năng của tôi. Tôi có thể hát rất hay. Tôi cũng có thể nhảy. Tôi cũng giỏi vẽ. Tôi vẽ động vật và hoa. Tôi cảm thấy rất tự tin hôm nay. Khán giả lắng nghe tôi. Tôi tự hào về công việc của mình. Cảm ơn bạn đã lắng nghe! Bạn có câu hỏi không? Đây là ngày đặc biệt của tôi!",
  comprehension_questions: [
    { id: 1, question_en: "What is the girl's name?", answer: ["Emma"], clue_statement: "The girl's name is Emma.", hint_en: "Her name...", hint_vi: "Tên cô ấy..." },
    { id: 2, question_en: "What can Emma do?", answer: ["sing", "dance", "draw", "sing and dance", "draw animals"], clue_statement: "She can sing, dance, and draw.", hint_en: "Her talents...", hint_vi: "Tài năng của cô ấy..." },
    { id: 3, question_en: "How many people are in Emma's family?", answer: ["4", "four", "4 people"], clue_statement: "There are 4 people in her family.", hint_en: "A number...", hint_vi: "Một con số..." }
  ],
  question: { text_en: "What can YOU do? Tell me about YOUR talents!", text_vi: "BẠN có thể làm gì? Kể về tài năng của BẠN!", min_words: 10, hint_en: "I can sing, I can draw, I am good at...", hint_vi: "Tôi có thể hát, tôi có thể vẽ, tôi giỏi..." }
};

export const chunk_focus = [
  "My name",
  "8 years old",
  "present my poster",
  "show you my world",
  "loving family",
  "my family",
  "My mom",
  "my dad",
  "my sister",
  "sing very well",
  "dance happily",
  "drawing pictures",
  "draw animals",
  "feel very confident",
  "listen to me",
  "feel proud",
  "my work",
  "Thank you for listening",
  "have questions",
  "very special day"
];

export const dictionary = {
    '8 years old': { word: '8 years old', pronunciation: '/8 years old/', definition_vi: 'tám tuổi', definition_en: 'meaning of 8 years old', example: 'My cousin is 8 years old and she is already reading chapter books!' },
    'My mom': { word: 'My mom', pronunciation: '/my mom/', definition_vi: 'cụm từ vựng: my mom', definition_en: 'Collocation: my mom', example: 'The students learned \'my mom\' in their English lesson.' },
    'My name': { word: 'My name', pronunciation: '/my name/', definition_vi: 'cụm từ vựng: my name', definition_en: 'Collocation: my name', example: 'The students learned \'my name\' in their English lesson.' },
    'Thank you for listening': { word: 'Thank you for listening', pronunciation: '/thank you for listening/', definition_vi: 'cảm ơn vì đã lắng nghe', definition_en: 'meaning of thank you for listening', example: 'Thank you for listening!' },
    'dance happily': { word: 'dance happily', pronunciation: '/dance happily/', definition_vi: 'nhảy múa vui vẻ', definition_en: 'meaning of dance happily', example: 'The children love to dance happily at the school party.' },
    'draw animals': { word: 'draw animals', pronunciation: '/draw animals/', definition_vi: 'vẽ động vật', definition_en: 'Multi-word phrase: draw animals', example: 'The phrase \'draw animals\' is commonly used in conversation.' },
    'drawing pictures': { word: 'drawing pictures', pronunciation: '/drawing pictures/', definition_vi: 'vẽ tranh', definition_en: 'meaning of drawing pictures', example: 'In art class, the children spent the morning drawing pictures of flowers.' },
    'feel proud': { word: 'feel proud', pronunciation: '/feel proud/', definition_vi: 'cảm thấy tự hào', definition_en: 'meaning of feel proud', example: 'This is an example: feel proud.' },
    'feel very confident': { word: 'feel very confident', pronunciation: '/feel very confident/', definition_vi: 'cảm thấy rất tự tin', definition_en: 'meaning of feel very confident', example: 'When I stand here, I feel very confident because the audience listen carefully.' },
    'have questions': { word: 'have questions', pronunciation: '/have questions/', definition_vi: 'có câu hỏi', definition_en: 'meaning of have questions', example: 'She have questions with her friends after school.' },
    'listen to me': { word: 'listen to me', pronunciation: '/listen to me/', definition_vi: 'lắng nghe tôi', definition_en: 'meaning of listen to me', example: 'The audience listen to me.' },
    'loving family': { word: 'loving family', pronunciation: '/loving family/', definition_vi: 'gia đình yêu thương', definition_en: 'meaning of loving family', example: 'In a loving family, everyone helps and cares for each other.' },
    'my dad': { word: 'my dad', pronunciation: '/my dad/', definition_vi: 'my bố', definition_en: 'Collocation: my dad', example: 'The students learned \'my dad\' in their English lesson.' },
    'my family': { word: 'my family', pronunciation: '/my family/', definition_vi: 'my gia đình', definition_en: 'Key collocation: my family', example: 'Natural usage of \'my family\' in sentence context.' },
    'my sister': { word: 'my sister', pronunciation: '/my sister/', definition_vi: 'cụm từ vựng: my sister', definition_en: 'Collocation: my sister', example: 'The students learned \'my sister\' in their English lesson.' },
    'my work': { word: 'my work', pronunciation: '/my work/', definition_vi: 'my làm việc', definition_en: 'English phrase: my work', example: 'The phrase \'my work\' means my làm việc.' },
    'present my poster': { word: 'present my poster', pronunciation: '/present my poster/', definition_vi: 'trình bày poster', definition_en: 'meaning of present my poster', example: 'Today I present my poster because I want to share my world with you.' },
    'show you my world': { word: 'show you my world', pronunciation: '/show you my world/', definition_vi: 'cho bạn xem thế giới của tôi', definition_en: 'meaning of show you my world', example: 'I want to show you my world.' },
    'sing very well': { word: 'sing very well', pronunciation: '/sing very well/', definition_vi: 'hát rất hay', definition_en: 'meaning of sing very well', example: 'I can sing very well, and I can also dance when I am happy.' },
    'very special day': { word: 'very special day', pronunciation: '/very special day/', definition_vi: 'ngày rất đặc biệt', definition_en: 'meaning of very special day', example: 'The wedding was a very special day for the whole family to celebrate.' }
};
