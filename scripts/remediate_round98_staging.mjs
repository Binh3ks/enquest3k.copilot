import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const STAGING_DIR = path.join(ROOT_DIR, 'docs/agent_artifacts/staging');

function countSyllables(word) {
  word = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!word) return 0;
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]|ed|es|e)$/, '');
  word = word.replace(/^y/, '');
  const syl = word.match(/[aeiouy]{1,2}/g);
  return syl ? syl.length : 1;
}

function calcFK(text) {
  if (!text) return { fkGrade: 0, words: 0, sentences: 0, longWordsPct: 0 };
  const clean = text.replace(/[\n\r]+/g, ' ').trim();
  const sentences = clean.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 2);
  const words = clean.split(/\s+/).map(w => w.replace(/[^a-zA-Z]/g, '').toLowerCase()).filter(w => w.length > 0);
  if (words.length === 0 || sentences.length === 0) return { fkGrade: 0, words: 0, sentences: 0, longWordsPct: 0 };
  let totalSyllables = 0;
  let longWords = 0;
  for (const w of words) {
    totalSyllables += countSyllables(w);
    if (w.length >= 10) longWords++;
  }
  const score = 0.39 * (words.length / sentences.length) + 11.8 * (totalSyllables / words.length) - 15.59;
  return {
    fkGrade: Math.round(score * 10) / 10,
    words: words.length,
    sentences: sentences.length,
    longWordsPct: Math.round((longWords / words.length) * 1000) / 10
  };
}

function assertFK(vocabList, weekNum) {
  vocabList.forEach(v => {
    const dFk = calcFK(v.definition_en).fkGrade;
    const eFk = calcFK(v.example_en).fkGrade;
    if (dFk > 9.5) {
      throw new Error(`[W${weekNum}] Def FK too high for "${v.word}": ${dFk} -> "${v.definition_en}"`);
    }
    if (eFk > 10.0) {
      throw new Error(`[W${weekNum}] Ex FK too high for "${v.word}": ${eFk} -> "${v.example_en}"`);
    }
  });
}

// ============================================================================
// REMEDIATION DATA DEFINITIONS
// ============================================================================

// --- W47 ---
const W47_VOCAB = [
  { word: "ten", ipa: "/tɛn/", definition_en: "The number that comes after nine.", definition_vi: "Số mười.", example_en: "She counted ten bright stars in the sky.", example_vi: "Cô ấy đếm được mười ngôi sao sáng trên bầu trời." },
  { word: "twenty", ipa: "/ˈtwɛnti/", definition_en: "The number equal to two times ten.", definition_vi: "Số hai mươi.", example_en: "There are twenty students in our math group.", example_vi: "Có hai mươi học sinh trong nhóm toán của chúng tôi." },
  { word: "hundred", ipa: "/ˈhʌndrəd/", definition_en: "The number equal to ten times ten.", definition_vi: "Số một trăm.", example_en: "He counted up to one hundred clear stars.", example_vi: "Cậu ấy đếm đến một trăm ngôi sao rõ ràng." },
  { word: "count", ipa: "/kaʊnt/", definition_en: "Say numbers in order to find a total.", definition_vi: "Đếm số thứ tự.", example_en: "We can count the small lights together.", example_vi: "Chúng ta có thể cùng nhau đếm những đốm sáng nhỏ." },
  { word: "how many", ipa: "/haʊ ˈmɛni/", definition_en: "Words used to ask about a number of things.", definition_vi: "Bao nhiêu (dùng để hỏi số lượng).", example_en: "How many shining stars do you see tonight?", example_vi: "Tối nay bạn nhìn thấy bao nhiêu ngôi sao tỏa sáng?" },
  { word: "place", ipa: "/pleɪs/", definition_en: "A particular position in a number chart.", definition_vi: "Vị trí trong bảng số.", example_en: "Each digit has a special place in the chart.", example_vi: "Mỗi chữ số có một vị trí đặc biệt trong bảng." },
  { word: "value", ipa: "/ˈvæljuː/", definition_en: "The amount that a digit is worth.", definition_vi: "Giá trị của chữ số.", example_en: "The value of five here is fifty.", example_vi: "Giá trị của số năm ở đây là năm mươi." },
  { word: "digit", ipa: "/ˈdɪdʒɪt/", definition_en: "Any single number symbol from zero to nine.", definition_vi: "Chữ số (từ 0 đến 9).", example_en: "Write the first digit in the tens box.", example_vi: "Hãy viết chữ số đầu tiên vào ô hàng chục." },
  { word: "column", ipa: "/ˈkɑːləm/", definition_en: "A straight line of numbers going down.", definition_vi: "Cột dọc các số.", example_en: "Put the tens in the left column.", example_vi: "Đặt hàng chục vào cột bên trái." },
  { word: "chart", ipa: "/tʃɑːrt/", definition_en: "A drawing that shows facts and numbers in a clear way.", definition_vi: "Biểu đồ, bảng thông tin.", example_en: "This simple chart helps us read big numbers.", example_vi: "Bảng đơn giản này giúp chúng ta đọc các số lớn." },
  { word: "total", ipa: "/ˈtoʊtl/", definition_en: "The whole number after adding parts together.", definition_vi: "Tổng số.", example_en: "The total number of stars was ninety.", example_vi: "Tổng số các ngôi sao là chín mươi." },
  { word: "amount", ipa: "/əˈmaʊnt/", definition_en: "How much there is of something you can count.", definition_vi: "Số lượng.", example_en: "We saw a large amount of stars above.", example_vi: "Chúng tôi đã thấy một lượng lớn các ngôi sao ở phía trên." },
  { word: "separate", ipa: "/ˈsɛpəreɪt/", definition_en: "Keep things apart in different groups.", definition_vi: "Tách biệt, phân chia.", example_en: "Separate the tens from the ones carefully.", example_vi: "Hãy tách hàng chục khỏi hàng đơn vị một cách cẩn thận." },
  { word: "bundle", ipa: "/ˈbʌndl/", definition_en: "A group of things tied together.", definition_vi: "Bó, xấp gom lại.", example_en: "Make a bundle of ten wooden sticks.", example_vi: "Hãy tạo một bó gồm mười que gỗ." },
  { word: "group", ipa: "/ɡruːp/", definition_en: "A set of people or items put together.", definition_vi: "Nhóm, tập hợp.", example_en: "Let us form a group of ten stars.", example_vi: "Chúng ta hãy tạo một nhóm gồm mười ngôi sao." },
  { word: "number", ipa: "/ˈnʌmbər/", definition_en: "A word or sign used for counting.", definition_vi: "Con số.", example_en: "Can you read this two-digit number?", example_vi: "Bạn có thể đọc con số có hai chữ số này không?" },
  { word: "fifty-six", ipa: "/ˌfɪfti ˈsɪks/", definition_en: "The number that comes after fifty-five.", definition_vi: "Số năm mươi sáu.", example_en: "She found fifty-six stars in the dark sky.", example_vi: "Cô ấy tìm thấy năm mươi sáu ngôi sao trên bầu trời tối." },
  { word: "seventy-eight", ipa: "/ˌsɛvənti ˈeɪt/", definition_en: "The whole number that comes right after seventy-seven.", definition_vi: "Số bảy mươi tám.", example_en: "He counted seventy-eight lights on the hill.", example_vi: "Cậu ấy đếm được bảy mươi tám ánh đèn trên ngọn đồi." },
  { word: "eighty-nine", ipa: "/ˌeɪti ˈnaɪn/", definition_en: "The number that follows eighty-eight.", definition_vi: "Số tám mươi chín.", example_en: "The class counted eighty-nine bright dots.", example_vi: "Cả lớp đã đếm được tám mươi chín chấm sáng." },
  { word: "ninety-nine", ipa: "/ˌnaɪnti ˈnaɪn/", definition_en: "The largest two-digit whole number.", definition_vi: "Số chín mươi chín.", example_en: "Ninety-nine is just one step before one hundred.", example_vi: "Chín mươi chín chỉ cách một trăm đúng một bước." }
];

const W47_CLIL = {
  title: "Counting Stars with Place Value",
  topic: "Big Numbers and Place Value",
  content_en: "On a clear night, students look up at the dark sky to count bright stars. When we see many stars, place value helps us organize them easily. In a two-digit number, each digit sits in a special place. We write numbers in a simple chart to separate tens from ones. For example, forty-five has four tens and five ones. When students wonder how many stars shine above, they group them into bundles of ten. If we find five groups of ten and six single stars, the total number is fifty-six. With another group, the count grows to sixty-seven and then seventy-eight. If we spot one more star past ninety-nine, our count reaches one hundred. A place value chart makes reading large numbers fun and easy.",
  glossary: [
    { word: "place value", definition_en: "The value of a digit depending on where it sits in a number." },
    { word: "digit", definition_en: "Any single number symbol from zero to nine." },
    { word: "column", definition_en: "A straight line of numbers going down a chart." },
    { word: "bundle", definition_en: "A group of items collected together." },
    { word: "total", definition_en: "The complete amount when everything is added together." }
  ],
  check_questions: [
    {
      question: "How do students group stars to count them easily?",
      options: ["Into bundles of ten", "By color only", "Into groups of one thousand"],
      correct_answer: "Into bundles of ten"
    },
    {
      question: "What does the digit 4 mean in the number forty-five?",
      options: ["Four tens", "Four hundreds", "Four single ones"],
      correct_answer: "Four tens"
    },
    {
      question: "What number comes after ninety-nine when you add one more star?",
      options: ["One hundred", "Eighty-nine", "Fifty-six"],
      correct_answer: "One hundred"
    }
  ]
};

const W47_RW_PART2 = {
  title: "Lucas and Mia Counting Stars",
  topic: "Counting Stars and Reading Numbers",
  turns: [
    {
      speaker: "Lucas",
      statement: "Mia, look at the bright stars above the school!",
      options: [
        "They look wonderful tonight!",
        "It is five meters tall.",
        "Yesterday at school."
      ],
      answer: "They look wonderful tonight!"
    },
    {
      speaker: "Mia",
      statement: "How many stars can you count in that small group?",
      options: [
        "I can see about twenty stars.",
        "They are blue pencils.",
        "Tomorrow morning."
      ],
      answer: "I can see about twenty stars."
    },
    {
      speaker: "Lucas",
      statement: "How do we write the number forty-five in words?",
      options: [
        "Write forty-five with a hyphen in the middle.",
        "Use a wooden ruler.",
        "Because it is raining."
      ],
      answer: "Write forty-five with a hyphen in the middle."
    },
    {
      speaker: "Mia",
      statement: "What happens if we find one more star past ninety-nine?",
      options: [
        "Our count reaches one hundred.",
        "We need an umbrella.",
        "It is sleeping now."
      ],
      answer: "Our count reaches one hundred."
    },
    {
      speaker: "Lucas",
      statement: "Shall we put our star counts into a place value chart?",
      options: [
        "Yes, let's draw the chart now!",
        "No, it was Tuesday.",
        "Because the car is fast."
      ],
      answer: "Yes, let's draw the chart now!"
    }
  ]
};

const W47_RW_PART6 = {
  title: "Mia's Night Sky Journal",
  instructions: "Read the diary and write one word in each gap.",
  text_template: "Last night our class looked at the night sky. We wanted to {1} how many stars were shining. We used a simple chart to write each {2} in the correct column. First, we grouped the bright lights into bundles of {3}. Then we counted seventy-eight stars in the north sky. When Lucas found another star group, our total reached {4} hundred. It is fun to read big numbers when you know place {5}.",
  answers: {
    "1": "count",
    "2": "digit",
    "3": "ten",
    "4": "one",
    "5": "value"
  }
};

// --- W48 ---
const W48_VOCAB = [
  { word: "long", ipa: "/lɔːŋ/", definition_en: "Measuring a great distance from end to end.", definition_vi: "Dài.", example_en: "This wooden desk has a long surface.", example_vi: "Bàn gỗ này có bề mặt dài." },
  { word: "short", ipa: "/ʃɔːrt/", definition_en: "Measuring a small distance from end to end.", definition_vi: "Ngắn, thấp.", example_en: "The yellow crayon is short.", example_vi: "Cây bút sáp màu vàng rất ngắn." },
  { word: "tall", ipa: "/tɔːl/", definition_en: "Having a greater height than average.", definition_vi: "Cao.", example_en: "The science teacher is very tall.", example_vi: "Thầy giáo dạy khoa học rất cao." },
  { word: "measure", ipa: "/ˈmɛʒər/", definition_en: "Find the size or length of an object.", definition_vi: "Đo lường.", example_en: "We will measure our notebooks today.", example_vi: "Hôm nay chúng ta sẽ đo những cuốn vở của mình." },
  { word: "ruler", ipa: "/ˈruːlər/", definition_en: "A straight strip of wood or plastic used to measure.", definition_vi: "Cây thước kẻ.", example_en: "Use a plastic ruler to draw a straight line.", example_vi: "Hãy dùng thước nhựa để kẻ một đường thẳng." },
  { word: "centimeter", ipa: "/ˈsɛntəˌmiːtər/", definition_en: "A metric unit of length equal to one hundredth of a meter.", definition_vi: "Xăng-ti-mét.", example_en: "My pencil is fifteen centimeters long.", example_vi: "Bút chì của tôi dài mười lăm xăng-ti-mét." },
  { word: "meter", ipa: "/ˈmiːtər/", definition_en: "The standard metric unit of length equal to one hundred centimeters.", definition_vi: "Mét.", example_en: "The classroom whiteboard is two meters wide.", example_vi: "Bảng lớp học rộng hai mét." },
  { word: "length", ipa: "/lɛŋkθ/", definition_en: "The measurement of something from end to end.", definition_vi: "Chiều dài.", example_en: "Measure the length of your desk carefully.", example_vi: "Hãy đo chiều dài của bàn học cẩn thận." },
  { word: "width", ipa: "/wɪdθ/", definition_en: "The measurement of something from side to side.", definition_vi: "Chiều rộng.", example_en: "What is the width of this math book?", example_vi: "Chiều rộng của cuốn sách toán này là bao nhiêu?" },
  { word: "height", ipa: "/haɪt/", definition_en: "The measurement of someone or something from base to top.", definition_vi: "Chiều cao.", example_en: "The height of the bookshelf is two meters.", example_vi: "Chiều cao của giá sách là hai mét." },
  { word: "distance", ipa: "/ˈdɪstəns/", definition_en: "The amount of space between two places.", definition_vi: "Khoảng cách.", example_en: "The distance from the door to my seat is short.", example_vi: "Khoảng cách từ cửa đến chỗ ngồi của tôi rất ngắn." },
  { word: "tape", ipa: "/teɪp/", definition_en: "A long flexible strip used for measuring.", definition_vi: "Thước cuộn, dây đo.", example_en: "Use a measuring tape for long tables.", example_vi: "Hãy dùng thước dây cho những chiếc bàn dài." },
  { word: "scale", ipa: "/skeɪl/", definition_en: "A set of marks used for measuring.", definition_vi: "Thang đo, vạch chia.", example_en: "Look at the number scale on the ruler.", example_vi: "Hãy nhìn vào thang số trên thước kẻ." },
  { word: "accurate", ipa: "/ˈækjərət/", definition_en: "Correct in all details and exact.", definition_vi: "Chính xác.", example_en: "Make an accurate measurement of the paper.", example_vi: "Hãy đo thật chính xác tờ giấy." },
  { word: "record", ipa: "/rɪˈkɔːrd/", definition_en: "Write down information to keep it.", definition_vi: "Ghi chép lại.", example_en: "Record your answers in the notebook.", example_vi: "Hãy ghi câu trả lời của bạn vào vở." },
  { word: "compare", ipa: "/kəmˈpɛr/", definition_en: "Examine two things to see how they differ.", definition_vi: "So sánh.", example_en: "Compare the heights of both students.", example_vi: "Hãy so sánh chiều cao của cả hai học sinh." },
  { word: "millimeter", ipa: "/ˈmɪləˌmiːtər/", definition_en: "A tiny metric unit equal to one tenth of a centimeter.", definition_vi: "Mi-li-mét.", example_en: "A coin is only two millimeters thick.", example_vi: "Đồng xu chỉ dày hai mi-li-mét." },
  { word: "object", ipa: "/ˈɑːbdʒɛkt/", definition_en: "A material thing that can be seen and touched.", definition_vi: "Đồ vật.", example_en: "Pick up an object to measure its size.", example_vi: "Hãy nhặt một đồ vật lên để đo kích thước của nó." },
  { word: "classroom", ipa: "/ˈklæsruːm/", definition_en: "A room where students learn together.", definition_vi: "Lớp học.", example_en: "We measure items around our classroom.", example_vi: "Chúng tôi đo các đồ vật quanh lớp học." },
  { word: "desk", ipa: "/dɛsk/", definition_en: "A piece of furniture with a flat top used for study.", definition_vi: "Bàn học.", example_en: "The student sat at her wooden desk.", example_vi: "Học sinh đã ngồi tại bàn học bằng gỗ của mình." }
];

const W48_CLIL = {
  title: "Measuring Objects in Our Classroom",
  topic: "Measuring Length and Height",
  content_en: "In science class, students learn how to measure length and height accurately. We use a clear plastic ruler to measure small classroom objects. A ruler shows marks in centimeters and millimeters. For longer objects, a flexible measuring tape works much better. When we measure a notebook, it is twenty centimeters long. Students enjoy asking who is taller in their learning group. They stand straight against the wall to check their height. A student might be one meter and thirty centimeters tall. Next, they compare a tall bookshelf and a short wooden stool. Recording exact measurements in a science journal helps everyone become better thinkers. Measuring our world teaches us how things fit together.",
  glossary: [
    { word: "measure", definition_en: "To find the size or length of something using tools." },
    { word: "ruler", definition_en: "A straight strip with numbers used to measure length." },
    { word: "centimeter", definition_en: "A metric unit of length for small objects." },
    { word: "meter", definition_en: "A unit of length equal to one hundred centimeters." },
    { word: "length", definition_en: "The distance from one end of an object to the other." }
  ],
  check_questions: [
    {
      question: "What tool do students use to measure small classroom objects?",
      options: ["A clear plastic ruler", "A kitchen spoon", "A heavy hammer"],
      correct_answer: "A clear plastic ruler"
    },
    {
      question: "How many centimeters are there in one meter?",
      options: ["One hundred centimeters", "Ten centimeters", "Fifty centimeters"],
      correct_answer: "One hundred centimeters"
    },
    {
      question: "What tool works better for measuring long objects?",
      options: ["A flexible measuring tape", "A short pencil", "A small eraser"],
      correct_answer: "A flexible measuring tape"
    }
  ]
};

const W48_RW_PART2 = {
  title: "Oliver and Emma Measuring Tools",
  topic: "Comparing Lengths and Heights",
  turns: [
    {
      speaker: "Oliver",
      statement: "Emma, look at this long measuring tape on the table!",
      options: [
        "It can measure very long desks!",
        "It is eating grass.",
        "Last Wednesday evening."
      ],
      answer: "It can measure very long desks!"
    },
    {
      speaker: "Emma",
      statement: "How long is your new science notebook?",
      options: [
        "It is thirty centimeters long.",
        "They are blue boots.",
        "At four o'clock."
      ],
      answer: "It is thirty centimeters long."
    },
    {
      speaker: "Oliver",
      statement: "Who is taller, the teacher or the student?",
      options: [
        "The teacher is much taller.",
        "It tastes sweet.",
        "In the garden."
      ],
      answer: "The teacher is much taller."
    },
    {
      speaker: "Emma",
      statement: "Can you help me measure the height of this bookshelf?",
      options: [
        "Yes, hold the measuring tape straight!",
        "No, I am asleep.",
        "Because it is cold."
      ],
      answer: "Yes, hold the measuring tape straight!"
    },
    {
      speaker: "Oliver",
      statement: "Shall we write down all our measurements in our journals?",
      options: [
        "Yes, let's record them now!",
        "Tomorrow morning at home.",
        "Because the dog barked."
      ],
      answer: "Yes, let's record them now!"
    }
  ]
};

const W48_RW_PART6 = {
  title: "Oliver's Science Notebook",
  instructions: "Read the diary and write one word in each gap.",
  text_template: "Today in science class, we learned how to {1} different things. Our teacher gave each student a plastic {2} to measure small items. My math book was twenty centimeters {3}. Next, we used a long tape to check our {4} against the wall. I found that I was one {5} and thirty centimeters tall. It was a fun lesson.",
  answers: {
    "1": "measure",
    "2": "ruler",
    "3": "long",
    "4": "height",
    "5": "meter"
  }
};

// --- W49 ---
const W49_VOCAB = [
  { word: "doctor", ipa: "/ˈdɑːktər/", definition_en: "A person with medical training who heals sick people.", definition_vi: "Bác sĩ.", example_en: "The doctor helped the boy feel better.", example_vi: "Bác sĩ đã giúp cậu bé cảm thấy khỏe hơn." },
  { word: "teacher", ipa: "/ˈtiːtʃər/", definition_en: "A person who helps students learn new things.", definition_vi: "Giáo viên.", example_en: "Our kind teacher explains the lesson clearly.", example_vi: "Giáo viên tốt bụng của chúng tôi giải thích bài học rất rõ ràng." },
  { word: "pilot", ipa: "/ˈpaɪlət/", definition_en: "A person who flies an airplane through the sky.", definition_vi: "Phi công.", example_en: "The brave pilot flew the plane safely.", example_vi: "Người phi công dũng cảm đã lái máy bay an toàn." },
  { word: "artist", ipa: "/ˈɑːrtɪst/", definition_en: "A person who paints pictures or creates art.", definition_vi: "Họa sĩ, nghệ sĩ.", example_en: "The artist painted a colorful picture of flowers.", example_vi: "Người họa sĩ đã vẽ một bức tranh hoa đầy màu sắc." },
  { word: "scientist", ipa: "/ˈsaɪəntɪst/", definition_en: "A person who studies the natural world with care.", definition_vi: "Nhà khoa học.", example_en: "The scientist showed us a fun experiment.", example_vi: "Nhà khoa học đã cho chúng tôi xem một thí nghiệm thú vị." },
  { word: "dream", ipa: "/driːm/", definition_en: "A strong hope or goal for the future.", definition_vi: "Ước mơ.", example_en: "Her dream is to travel around the world.", example_vi: "Ước mơ của cô ấy là được đi du lịch vòng quanh thế giới." },
  { word: "career", ipa: "/kəˈrɪr/", definition_en: "A job or profession that you do for a long time.", definition_vi: "Sự nghiệp, nghề nghiệp.", example_en: "Teaching English is a wonderful career.", example_vi: "Dạy tiếng Anh là một sự nghiệp tuyệt vời." },
  { word: "goal", ipa: "/ɡoʊl/", definition_en: "Something that you work hard to achieve.", definition_vi: "Mục tiêu.", example_en: "My goal is to read twenty English books.", example_vi: "Mục tiêu của tôi là đọc hai mươi cuốn sách tiếng Anh." },
  { word: "achieve", ipa: "/əˈtʃiːv/", definition_en: "Reach a goal by working hard.", definition_vi: "Đạt được.", example_en: "You can achieve your dreams with practice.", example_vi: "Bạn có thể đạt được ước mơ bằng việc luyện tập." },
  { word: "train", ipa: "/treɪn/", definition_en: "Practice skills to prepare for a job.", definition_vi: "Rèn luyện, đào tạo.", example_en: "Athletes train every day to stay strong.", example_vi: "Các vận động viên rèn luyện mỗi ngày để luôn khỏe mạnh." },
  { word: "college", ipa: "/ˈkɑːlɪdʒ/", definition_en: "A school for higher education after high school.", definition_vi: "Trường đại học, cao đẳng.", example_en: "She wants to study science in college.", example_vi: "Cô ấy muốn học khoa học ở trường đại học." },
  { word: "future", ipa: "/ˈfjuːtʃər/", definition_en: "The time that will come after now.", definition_vi: "Tương lai.", example_en: "What will you do in the future?", example_vi: "Bạn sẽ làm gì trong tương lai?" },
  { word: "skill", ipa: "/skɪl/", definition_en: "The ability to do an action well.", definition_vi: "Kỹ năng.", example_en: "Drawing is a very useful artistic skill.", example_vi: "Vẽ là một kỹ năng nghệ thuật rất hữu ích." },
  { word: "study", ipa: "/ˈstʌdi/", definition_en: "Spend time learning about a subject.", definition_vi: "Học tập, nghiên cứu.", example_en: "Students study math and English every week.", example_vi: "Học sinh học toán và tiếng Anh mỗi tuần." },
  { word: "help", ipa: "/hɛlp/", definition_en: "Give assistance to someone in need.", definition_vi: "Giúp đỡ.", example_en: "Doctors help people when they are sick.", example_vi: "Các bác sĩ giúp đỡ mọi người khi họ bị ốm." },
  { word: "create", ipa: "/kriˈeɪt/", definition_en: "Make something new that did not exist before.", definition_vi: "Tạo ra, sáng tạo.", example_en: "Creative artists make bright paintings for everyone to see.", example_vi: "Các nghệ sĩ tạo ra những bức tranh đẹp cho mọi người." },
  { word: "invent", ipa: "/ɪnˈvɛnt/", definition_en: "Design or make a new tool or machine.", definition_vi: "Phát minh.", example_en: "Engineers invent machines to solve problems.", example_vi: "Các kỹ sư phát minh ra máy móc để giải quyết các vấn đề." },
  { word: "discover", ipa: "/dɪˈskʌvər/", definition_en: "Find something that was not known before.", definition_vi: "Khám phá.", example_en: "Scientists discover new facts about stars.", example_vi: "Các nhà khoa học khám phá ra những sự thật mới về các vì sao." },
  { word: "hope", ipa: "/hoʊp/", definition_en: "Want something good to happen in the future.", definition_vi: "Hy vọng.", example_en: "I hope to become a pilot one day.", example_vi: "Tôi hy vọng một ngày nào đó sẽ trở thành phi công." },
  { word: "plan", ipa: "/plæn/", definition_en: "Decide what to do before taking action.", definition_vi: "Kế hoạch, lên kế hoạch.", example_en: "We will make a plan for our future study.", example_vi: "Chúng tôi sẽ lên kế hoạch cho việc học tập trong tương lai." }
];

const W49_CLIL = {
  title: "Career Day: Sharing Future Dreams",
  topic: "Future Dreams and Careers",
  content_en: "Every student has a special dream for the future. On Career Day at our school, children talk about the jobs they want to do. One student says, 'I want to be a kind doctor in order to help sick people.' Another child wants to be a teacher and share knowledge with young learners. Some students dream of becoming an artist to create colorful paintings. Others want to become a brave pilot and fly high above the white clouds. To achieve a great career, students study hard at school each day. They train their minds and practice important skills. Teachers remind everyone that having a clear goal helps you build an exciting future. With hope and steady effort, any dream can come true.",
  glossary: [
    { word: "career", definition_en: "A chosen job that a person does for a long time." },
    { word: "doctor", definition_en: "A trained person who heals sick people." },
    { word: "scientist", definition_en: "A person who explores and studies the natural world." },
    { word: "pilot", definition_en: "A skilled person who flies an airplane." },
    { word: "artist", definition_en: "A creative person who paints or makes art." }
  ],
  check_questions: [
    {
      question: "What event took place at the school?",
      options: ["Career Day", "A sports race", "A swimming party"],
      correct_answer: "Career Day"
    },
    {
      question: "Why does one student want to become a doctor?",
      options: ["In order to help sick people", "To build fast wooden cars", "To plant tall green trees"],
      correct_answer: "In order to help sick people"
    },
    {
      question: "What helps students build an exciting future?",
      options: ["Having a clear goal and working hard", "Sleeping all day long", "Watching television alone"],
      correct_answer: "Having a clear goal and working hard"
    }
  ]
};

const W49_RW_PART2 = {
  title: "Sophia and Ben Discuss Future Careers",
  topic: "Sharing Future Dreams",
  turns: [
    {
      speaker: "Sophia",
      statement: "Ben, what do you want to be when you grow up?",
      options: [
        "I want to become a brave pilot!",
        "It is five o'clock now.",
        "Under the kitchen table."
      ],
      answer: "I want to become a brave pilot!"
    },
    {
      speaker: "Ben",
      statement: "Why do you want to be a teacher, Sophia?",
      options: [
        "Because I love helping children learn.",
        "It has four wheels.",
        "Last summer in the park."
      ],
      answer: "Because I love helping children learn."
    },
    {
      speaker: "Sophia",
      statement: "What skills does a good doctor need?",
      options: [
        "A doctor needs to care for people with patience.",
        "They are blue crayons.",
        "Tomorrow morning at home."
      ],
      answer: "A doctor needs to care for people with patience."
    },
    {
      speaker: "Ben",
      statement: "Where will you study after high school?",
      options: [
        "I hope to go to college to study science.",
        "I like eating apples.",
        "Because it was noisy."
      ],
      answer: "I hope to go to college to study science."
    },
    {
      speaker: "Sophia",
      statement: "Shall we draw our dream jobs on this poster?",
      options: [
        "Yes, let's start drawing our jobs now!",
        "No, it was raining yesterday.",
        "Because the bus was slow."
      ],
      answer: "Yes, let's start drawing our jobs now!"
    }
  ]
};

const W49_RW_PART6 = {
  title: "Sophia's Future Dreams Diary",
  instructions: "Read the diary and write one word in each gap.",
  text_template: "Today at school, we had a special Career Day. Everyone talked about their {1} for the future. Lucas wants to be an {2} who paints bright pictures. I want to be a science {3} so that I can help children learn. Our teacher told us that we must study {4} to reach our goals. When we work with hope, our dreams {5} come true.",
  answers: {
    "1": "dream",
    "2": "artist",
    "3": "teacher",
    "4": "hard",
    "5": "will"
  }
};

// --- W50 ---
const W50_VOCAB = [
  { word: "electric", ipa: "/ɪˈlɛktrɪk/", definition_en: "Working by or using electric power.", definition_vi: "Chạy bằng điện.", example_en: "My dad drives a quiet electric car.", example_vi: "Bố tôi lái một chiếc xe điện rất êm." },
  { word: "vehicle", ipa: "/ˈviːəkl/", definition_en: "A machine with wheels that carries people or things.", definition_vi: "Phương tiện giao thông.", example_en: "This clean vehicle carries six people safely.", example_vi: "Phương tiện sạch này chở sáu người an toàn." },
  { word: "battery", ipa: "/ˈbætəri/", definition_en: "A small unit that stores electric power.", definition_vi: "Pin, ắc quy.", example_en: "The battery keeps the machine working.", example_vi: "Cục pin giúp máy móc tiếp tục hoạt động." },
  { word: "energy", ipa: "/ˈɛnərdʒi/", definition_en: "Power that can make things move and work.", definition_vi: "Năng lượng.", example_en: "The sun gives clean energy to our planet.", example_vi: "Mặt trời mang lại nguồn năng lượng sạch cho hành tinh." },
  { word: "solar", ipa: "/ˈsoʊlər/", definition_en: "Coming from or using the light of the sun.", definition_vi: "Thuộc về năng lượng mặt trời.", example_en: "We put solar panels on our school roof.", example_vi: "Chúng tôi đặt các tấm pin mặt trời trên mái trường." },
  { word: "station", ipa: "/ˈsteɪʃn/", definition_en: "A special place where services are provided.", definition_vi: "Trạm sạc, nhà ga.", example_en: "We stopped at the charging station on the road.", example_vi: "Chúng tôi đã dừng lại ở trạm sạc trên đường." },
  { word: "charge", ipa: "/tʃɑːrdʒ/", definition_en: "To put electric power into a dead battery.", definition_vi: "Sạc điện.", example_en: "He will charge the battery before driving.", example_vi: "Cậu ấy sẽ sạc pin trước khi lái xe." },
  { word: "clean", ipa: "/kliːn/", definition_en: "Free from dirt or harmful smoke.", definition_vi: "Sạch sẽ, trong lành.", example_en: "Clean air helps all people breathe easily.", example_vi: "Không khí trong lành giúp mọi người thở dễ dàng." },
  { word: "motor", ipa: "/ˈmoʊtər/", definition_en: "A machine that uses power to create motion.", definition_vi: "Động cơ.", example_en: "The electric motor runs without loud noise.", example_vi: "Động cơ điện chạy mà không có tiếng ồn lớn." },
  { word: "reduce", ipa: "/rɪˈduːs/", definition_en: "Make something smaller in amount or size.", definition_vi: "Cắt giảm, giảm bớt.", example_en: "Electric cars reduce dirty smoke in cities.", example_vi: "Xe điện giúp giảm khói bụi bẩn trong thành phố." },
  { word: "emission", ipa: "/ɪˈmɪʃn/", definition_en: "Gas or smoke that is sent into the air.", definition_vi: "Khí thải.", example_en: "Cars with zero emission protect the trees.", example_vi: "Những chiếc xe không phát thải bảo vệ cây xanh." },
  { word: "speed", ipa: "/spiːd/", definition_en: "How fast someone or something moves.", definition_vi: "Tốc độ.", example_en: "The digital screen shows our driving speed.", example_vi: "Màn hình kỹ thuật số hiển thị tốc độ lái xe của chúng tôi." },
  { word: "screen", ipa: "/skriːn/", definition_en: "A flat surface on an electronic device showing words or pictures.", definition_vi: "Màn hình.", example_en: "Look at the screen to see how much power is left.", example_vi: "Hãy nhìn vào màn hình để xem còn bao nhiêu điện." },
  { word: "panel", ipa: "/ˈpænl/", definition_en: "A flat board that collects sunlight.", definition_vi: "Tấm pin năng lượng.", example_en: "Each solar panel collects bright sunshine.", example_vi: "Mỗi tấm pin mặt trời thu nhận ánh nắng rực rỡ." },
  { word: "power", ipa: "/ˈpaʊər/", definition_en: "Energy that makes machines run.", definition_vi: "Nguồn điện, năng lượng.", example_en: "Wind gives power to the small village.", example_vi: "Gió cung cấp năng lượng cho ngôi làng nhỏ." },
  { word: "travel", ipa: "/ˈtrævl/", definition_en: "Go from one place to another place.", definition_vi: "Đi lại, du hành.", example_en: "Many happy families travel to school by electric bus.", example_vi: "Nhiều gia đình đi lại bằng xe buýt điện." },
  { word: "future", ipa: "/ˈfjuːtʃər/", definition_en: "The time that is coming after today.", definition_vi: "Tương lai.", example_en: "In the future, all cars will be clean.", example_vi: "Trong tương lai, tất cả xe hơi sẽ sạch." },
  { word: "protect", ipa: "/prəˈtɛkt/", definition_en: "Keep someone or something safe from harm.", definition_vi: "Bảo vệ.", example_en: "We must protect our green planet together.", example_vi: "Chúng ta phải cùng nhau bảo vệ hành tinh xanh." },
  { word: "planet", ipa: "/ˈplænɪt/", definition_en: "A large round body in space like the Earth.", definition_vi: "Hành tinh.", example_en: "Earth is the wonderful planet we live on.", example_vi: "Trái Đất là hành tinh tuyệt vời nơi chúng ta sinh sống." },
  { word: "modern", ipa: "/ˈmɑːdərn/", definition_en: "Using the newest ideas and tools.", definition_vi: "Hiện đại.", example_en: "This modern station charges cars quickly.", example_vi: "Trạm hiện đại này sạc xe rất nhanh." }
];

const W50_CLIL = {
  title: "Modern Travel and Clean Energy",
  topic: "Electric Vehicles and Clean Energy",
  content_en: "Travel is changing fast across our world. In the past, all cars burned gas and made dirty smoke. Today, modern drivers choose a clean electric vehicle. An electric car uses a strong battery to power its quiet motor. Drivers stop at a charging station to charge the battery. When we use solar panels to make clean energy, we protect our green planet. A digital screen on the dashboard shows car speed and remaining power. Electric cars reduce harmful emission smoke in big cities. They can travel far on one charge. In the future, clean transport will keep our air fresh and clear.",
  glossary: [
    { word: "electric", definition_en: "Working by using electric power." },
    { word: "battery", definition_en: "A device that stores electric power for a machine." },
    { word: "solar", definition_en: "Coming from or using the light of the sun." },
    { word: "charge", definition_en: "To put electric power into a battery." },
    { word: "planet", definition_en: "A large round world in space like Earth." }
  ],
  check_questions: [
    {
      question: "What powers the quiet motor in an electric car?",
      options: ["A strong battery", "Burning wood", "Cold water"],
      correct_answer: "A strong battery"
    },
    {
      question: "Where do drivers stop to charge their electric cars?",
      options: ["At a charging station", "In a dark forest", "At a bakery shop"],
      correct_answer: "At a charging station"
    },
    {
      question: "How do electric cars help big cities?",
      options: ["They reduce harmful smoke", "They make loud noises", "They fly in the clouds"],
      correct_answer: "They reduce harmful smoke"
    }
  ]
};

const W50_RW_PART2 = {
  title: "Lucas and Maya at the Charging Station",
  topic: "Electric Vehicles and Clean Energy",
  turns: [
    {
      speaker: "Lucas",
      statement: "Look Maya, this new car makes no noise at all!",
      options: [
        "Yes, it has a quiet electric motor!",
        "It is five meters long.",
        "Last Sunday at noon."
      ],
      answer: "Yes, it has a quiet electric motor!"
    },
    {
      speaker: "Maya",
      statement: "How long does it take to charge the car battery?",
      options: [
        "It takes thirty minutes at this modern station.",
        "They are blue coats.",
        "In the kitchen cupboard."
      ],
      answer: "It takes thirty minutes at this modern station."
    },
    {
      speaker: "Lucas",
      statement: "Where does the green energy come from?",
      options: [
        "It comes from the solar panels on the roof.",
        "It is sleeping quietly.",
        "Because of the rain."
      ],
      answer: "It comes from the solar panels on the roof."
    },
    {
      speaker: "Maya",
      statement: "Will more people drive electric cars in the future?",
      options: [
        "Yes, they help protect our clean planet.",
        "No, it was Thursday.",
        "Tomorrow at school."
      ],
      answer: "Yes, they help protect our clean planet."
    },
    {
      speaker: "Lucas",
      statement: "Shall we write about clean transport for our school talk?",
      options: [
        "Yes, let's prepare our presentation together!",
        "No, I lost my pencil.",
        "Because the soup is hot."
      ],
      answer: "Yes, let's prepare our presentation together!"
    }
  ]
};

const W50_RW_PART6 = {
  title: "Maya's Clean Energy Journal",
  instructions: "Read the diary and write one word in each gap.",
  text_template: "Yesterday my family visited a modern charging station. We saw a new electric {1} that made no dirty smoke. The driver plugged a cable into the {2} to fill it with power. High above the station, big {3} panels collected sunshine. In the future, clean energy will {4} our green planet. I hope to drive a clean car {5} I grow up.",
  answers: {
    "1": "car",
    "2": "battery",
    "3": "solar",
    "4": "protect",
    "5": "when"
  }
};

// --- W51 ---
const W51_VOCAB = [
  { word: "system", ipa: "/ˈsɪstəm/", definition_en: "A group of related parts that work together.", definition_vi: "Hệ thống.", example_en: "Our solar system has eight planets.", example_vi: "Hệ mặt trời của chúng ta có tám hành tinh." },
  { word: "giant", ipa: "/ˈdʒaɪənt/", definition_en: "Very large in size or amount.", definition_vi: "Khổng lồ.", example_en: "Jupiter is a giant gas planet.", example_vi: "Sao Mộc là một hành tinh khí khổng lồ." },
  { word: "telescope", ipa: "/ˈtɛləˌskoʊp/", definition_en: "A tool shaped like a tube used to see distant stars.", definition_vi: "Kính thiên văn.", example_en: "Look through the telescope to see the moon.", example_vi: "Hãy nhìn qua kính thiên văn để ngắm mặt trăng." },
  { word: "atmosphere", ipa: "/ˈætməˌsfɪr/", definition_en: "The layer of air and gases around a planet.", definition_vi: "Bầu khí quyển.", example_en: "Earth has a protective atmosphere of air.", example_vi: "Trái Đất có một bầu khí quyển bảo vệ." },
  { word: "space", ipa: "/speɪs/", definition_en: "The huge area outside the Earth where stars are.", definition_vi: "Không gian, vũ trụ.", example_en: "Astronauts travel into outer space.", example_vi: "Các phi hành gia du hành vào không gian vũ trụ." },
  { word: "mission", ipa: "/ˈmɪʃn/", definition_en: "An important trip or task to learn facts.", definition_vi: "Nhiệm vụ, sứ mệnh.", example_en: "The robot went on a space mission.", example_vi: "Con rô-bốt đã thực hiện một sứ mệnh vũ trụ." },
  { word: "crater", ipa: "/ˈkreɪtər/", definition_en: "A large round hole in the ground of a planet.", definition_vi: "Miệng hố va chạm.", example_en: "The rocky moon has many deep craters.", example_vi: "Mặt trăng nhiều đá có nhiều miệng hố sâu." },
  { word: "rotate", ipa: "/ˈroʊteɪt/", definition_en: "Turn around in a continuous circle.", definition_vi: "Xoay quanh trục.", example_en: "Planets rotate as they move through space.", example_vi: "Các hành tinh tự quay khi di chuyển trong không gian." },
  { word: "data", ipa: "/ˈdeɪtə/", definition_en: "Facts and numbers collected by study.", definition_vi: "Dữ liệu, số liệu.", example_en: "The space probe sent back helpful data.", example_vi: "Tàu thăm dò không gian đã gửi về dữ liệu hữu ích." },
  { word: "planet", ipa: "/ˈplænɪt/", definition_en: "A large round world that moves around the sun.", definition_vi: "Hành tinh.", example_en: "Earth is the third planet from the sun.", example_vi: "Trái Đất là hành tinh thứ ba tính từ mặt trời." },
  { word: "solar", ipa: "/ˈsoʊlər/", definition_en: "Related to or coming from the sun.", definition_vi: "Thuộc hệ mặt trời.", example_en: "The solar system is full of wonders.", example_vi: "Hệ mặt trời có đầy những điều kỳ diệu." },
  { word: "orbit", ipa: "/ˈɔːrbɪt/", definition_en: "The curved path of a planet around a star.", definition_vi: "Quỹ đạo.", example_en: "The Earth moves in an orbit around the sun.", example_vi: "Trái Đất di chuyển theo quỹ đạo quanh mặt trời." },
  { word: "rocky", ipa: "/ˈrɑːki/", definition_en: "Made of or covered with hard rock.", definition_vi: "Nhiều đá, đất đá.", example_en: "Mars has a dry and rocky surface.", example_vi: "Sao Hỏa có bề mặt khô cằn và nhiều đá." },
  { word: "surface", ipa: "/ˈsɜːrfɪs/", definition_en: "The outside or top layer of something.", definition_vi: "Bề mặt.", example_en: "The surface of Venus is very hot.", example_vi: "Bề mặt của sao Kim rất nóng." },
  { word: "frozen", ipa: "/ˈfroʊzn/", definition_en: "Turned into ice by very cold temperatures.", definition_vi: "Băng giá, đóng băng.", example_en: "The outer moons have frozen water ice.", example_vi: "Các mặt trăng ngoài cùng có nước đóng băng." },
  { word: "ring", ipa: "/rɪŋ/", definition_en: "A circle of bright dust and ice around a planet.", definition_vi: "Vành đai.", example_en: "Saturn has a bright and beautiful ring.", example_vi: "Sao Thổ có một vành đai sáng và đẹp." },
  { word: "probe", ipa: "/proʊb/", definition_en: "A robotic spacecraft sent to explore space.", definition_vi: "Tàu thăm dò.", example_en: "The space probe flew past the planets.", example_vi: "Tàu thăm dò vũ trụ đã bay qua các hành tinh." },
  { word: "distance", ipa: "/ˈdɪstəns/", definition_en: "The length of space between two points.", definition_vi: "Khoảng cách.", example_en: "There is a great distance between worlds.", example_vi: "Có một khoảng cách rất lớn giữa các thế giới." },
  { word: "gravity", ipa: "/ˈɡrævəti/", definition_en: "The natural force that pulls objects toward a planet.", definition_vi: "Lực hấp dẫn, trọng lực.", example_en: "Gravity keeps our feet on the ground.", example_vi: "Trọng lực giữ cho đôi chân của chúng ta trên mặt đất." },
  { word: "explore", ipa: "/ɪkˈsplɔːr/", definition_en: "Travel around an area to learn about it.", definition_vi: "Khám phá.", example_en: "Scientists explore space to learn new facts.", example_vi: "Các nhà khoa học khám phá không gian để biết thêm điều mới." }
];

const W51_CLIL = {
  title: "Exploring Our Amazing Solar System",
  topic: "The Solar System and Planetary Science",
  content_en: "Our solar system has eight amazing planets. They all orbit around the bright sun. The four inner worlds are small and rocky. Each rocky planet has a solid surface with deep crater holes. In contrast, the outer worlds are giant planets of gas. Saturn is a giant planet with a bright frozen ring. Scientists look into deep space through a metallic telescope. They also send a space probe on a long mission to collect scientific data. The probe flies a great distance to study each planet atmosphere. Invisible gravity keeps every world in place as they rotate smoothly. Space science helps us explore our solar system.",
  glossary: [
    { word: "planet", definition_en: "A large round body in space that orbits a star." },
    { word: "orbit", definition_en: "The curved path of a planet around the sun." },
    { word: "telescope", definition_en: "An instrument with lenses used to observe distant objects." },
    { word: "crater", definition_en: "A large bowl-shaped hole on a rocky planet surface." },
    { word: "gravity", definition_en: "The invisible force that pulls objects toward a world." }
  ],
  check_questions: [
    {
      question: "How many planets are there in our solar system?",
      options: ["Eight planets", "Four planets", "Twelve planets"],
      correct_answer: "Eight planets"
    },
    {
      question: "What keeps every planet in its orbit around the sun?",
      options: ["Invisible gravity", "Strong winds", "Warm sunshine"],
      correct_answer: "Invisible gravity"
    },
    {
      question: "Which planet is famous for having bright frozen rings?",
      options: ["Saturn", "Mercury", "Venus"],
      correct_answer: "Saturn"
    }
  ]
};

const W51_RW_PART2 = {
  title: "Leo and Mia Looking at Planets",
  topic: "Planets in the Solar System",
  turns: [
    {
      speaker: "Leo",
      statement: "Mia, look through this telescope at Saturn!",
      options: [
        "I can see its beautiful rings clearly!",
        "It is five centimeters wide.",
        "Yesterday at five."
      ],
      answer: "I can see its beautiful rings clearly!"
    },
    {
      speaker: "Mia",
      statement: "How many rocky planets are close to the sun?",
      options: [
        "There are four inner rocky planets.",
        "They are blue pencils.",
        "Under the table."
      ],
      answer: "There are four inner rocky planets."
    },
    {
      speaker: "Leo",
      statement: "Which planet is the largest in our whole solar system?",
      options: [
        "Jupiter is the biggest planet of all.",
        "It has two legs.",
        "Tomorrow morning."
      ],
      answer: "Jupiter is the biggest planet of all."
    },
    {
      speaker: "Mia",
      statement: "Why did scientists send a space probe to Mars?",
      options: [
        "In order to collect data about its surface.",
        "Because it is very cold.",
        "With a red spoon."
      ],
      answer: "In order to collect data about its surface."
    },
    {
      speaker: "Leo",
      statement: "Shall we build a model of the solar system for science class?",
      options: [
        "Yes, let's start making our planet model!",
        "No, I was sleeping.",
        "Because the soup was warm."
      ],
      answer: "Yes, let's start making our planet model!"
    }
  ]
};

const W51_RW_PART6 = {
  title: "Mia's Astronomy Journal",
  instructions: "Read the diary and write one word in each gap.",
  text_template: "Last night our class visited the school observatory. We looked through a giant {1} to see outer space. I was amazed to see Saturn with its bright frozen {2}. Our teacher told us that eight planets {3} around the sun. Invisible {4} keeps all the worlds in place. Space science helps us {5} many wonderful mysteries.",
  answers: {
    "1": "telescope",
    "2": "rings",
    "3": "orbit",
    "4": "gravity",
    "5": "explore"
  }
};

// --- W53 ---
const W53_VOCAB = [
  { word: "detective", ipa: "/dɪˈtɛktɪv/", definition_en: "A person who looks for clues to solve a mystery.", definition_vi: "Thám tử.", example_en: "The smart detective found a missing key.", example_vi: "Người thám tử thông minh đã tìm thấy chiếc chìa khóa bị mất." },
  { word: "mystery", ipa: "/ˈmɪstəri/", definition_en: "Something strange that is hard to explain.", definition_vi: "Điều bí ẩn.", example_en: "They solved the mystery of the quiet room.", example_vi: "Họ đã giải quyết điều bí ẩn về căn phòng yên tĩnh." },
  { word: "badge", ipa: "/bædʒ/", definition_en: "A small metal sign worn on clothes.", definition_vi: "Huy hiệu.", example_en: "The officer wore a shiny silver badge.", example_vi: "Viên sĩ quan đã đeo một chiếc huy hiệu màu bạc sáng bóng." },
  { word: "clue", ipa: "/kluː/", definition_en: "A piece of evidence that helps solve a problem.", definition_vi: "Manh mối.", example_en: "This footprint is an important clue.", example_vi: "Dấu chân này là một manh mối quan trọng." },
  { word: "footprint", ipa: "/ˈfʊtprɪnt/", definition_en: "A mark left on the ground by a foot or shoe.", definition_vi: "Dấu chân.", example_en: "We saw a muddy footprint near the door.", example_vi: "Chúng tôi thấy một dấu chân đầy bùn ở gần cửa." },
  { word: "evidence", ipa: "/ˈɛvɪdəns/", definition_en: "Facts or signs that show something is true.", definition_vi: "Bằng chứng.", example_en: "The note was clear evidence in the case.", example_vi: "Mẩu giấy là bằng chứng rõ ràng trong vụ việc." },
  { word: "shadow", ipa: "/ˈʃædoʊ/", definition_en: "A dark shape made when light is blocked.", definition_vi: "Bóng râm, chiếc bóng.", example_en: "A long shadow fell across the wooden wall.", example_vi: "Một chiếc bóng dài đổ xuống bức tường gỗ." },
  { word: "suspect", ipa: "/ˈsʌspɛkt/", definition_en: "A person who might have done something wrong.", definition_vi: "Kẻ tình nghi.", example_en: "The detective talked to each suspect politely.", example_vi: "Thám tử nói chuyện với từng kẻ tình nghi một cách lịch sự." },
  { word: "deduction", ipa: "/dɪˈdʌkʃn/", definition_en: "The process of reaching a conclusion using logic.", definition_vi: "Sự suy luận logic.", example_en: "Through careful deduction, he found the truth.", example_vi: "Nhờ suy luận cẩn thận, cậu ấy đã tìm ra sự thật." },
  { word: "portfolio", ipa: "/pɔːrtˈfoʊlioʊ/", definition_en: "A neat folder containing samples of your work.", definition_vi: "Hồ sơ năng lực, tập bài tập.", example_en: "She placed her best drawings in the portfolio.", example_vi: "Cô ấy đặt những bức vẽ đẹp nhất của mình vào hồ sơ năng lực." },
  { word: "artifact", ipa: "/ˈɑːrtɪfækt/", definition_en: "An object made by a person that shows skill.", definition_vi: "Sản phẩm thực tế, hiện vật.", example_en: "Her story was a proud writing artifact.", example_vi: "Câu chuyện của cô ấy là một sản phẩm viết đầy tự hào." },
  { word: "progress", ipa: "/ˈprɑːɡrɛs/", definition_en: "Forward movement toward a good goal.", definition_vi: "Sự tiến bộ.", example_en: "He made great progress in reading this year.", example_vi: "Cậu ấy đã đạt tiến bộ lớn trong môn đọc năm nay." },
  { word: "reflect", ipa: "/rɪˈflɛkt/", definition_en: "Think carefully about things that happened.", definition_vi: "Suy ngẫm, nhìn nhận lại.", example_en: "Students reflect on their learning journey.", example_vi: "Học sinh suy ngẫm về hành trình học tập của mình." },
  { word: "review", ipa: "/rɪˈvjuː/", definition_en: "Look back at what you studied before.", definition_vi: "Ôn tập, xem xét lại.", example_en: "Let us review all the units from this year.", example_vi: "Chúng ta hãy cùng xem lại tất cả các bài học trong năm nay." },
  { word: "summary", ipa: "/ˈsʌməri/", definition_en: "A short statement of the main points.", definition_vi: "Bản tóm tắt.", example_en: "Write a short summary of your project.", example_vi: "Hãy viết một bản tóm tắt ngắn về dự án của bạn." },
  { word: "growth", ipa: "/ɡroʊθ/", definition_en: "The steady process of learning and doing better.", definition_vi: "Sự phát triển, tiến bộ.", example_en: "The teacher praised her growth in English.", example_vi: "Giáo viên khen ngợi sự tiến bộ của cô ấy trong môn tiếng Anh." },
  { word: "display", ipa: "/dɪˈspleɪ/", definition_en: "Put something in a place where people can see it.", definition_vi: "Trưng bày.", example_en: "Display your favorite poems on the board.", example_vi: "Hãy trưng bày những bài thơ yêu thích của bạn lên bảng." },
  { word: "neat", ipa: "/niːt/", definition_en: "Tidy and arranged in good order.", definition_vi: "Gọn gàng, ngăn nắp.", example_en: "Keep your portfolio clean and neat.", example_vi: "Hãy giữ cho hồ sơ năng lực của bạn sạch sẽ và gọn gàng." },
  { word: "proud", ipa: "/praʊd/", definition_en: "Feeling pleased about something you did well.", definition_vi: "Tự hào.", example_en: "Parents feel proud of their children.", example_vi: "Cha mẹ cảm thấy tự hào về con cái của họ." },
  { word: "celebrate", ipa: "/ˈsɛləˌbreɪt/", definition_en: "Do something special for an important event.", definition_vi: "Kỷ niệm, ăn mừng.", example_en: "We will celebrate our school success together.", example_vi: "Chúng tôi sẽ cùng nhau ăn mừng thành công trong học tập." }
];

const W53_CLIL = {
  title: "Building a Proud Learning Portfolio",
  topic: "Detective Thinking and Portfolio Curation",
  content_en: "A clever detective works hard to solve a mystery. The detective wears a shiny badge and looks for each hidden clue. If there is a muddy footprint near the curtain, it gives clear evidence. A dark shadow on the wall helps find the suspect. With careful deduction, the detective decides who is guilty and who is innocent. In school, students also do a Year in Review. They create a neat portfolio to display their best work. Each artifact shows real progress in math and science. Students reflect on their school year and write a short summary. Building a proud portfolio helps learners celebrate their growth.",
  glossary: [
    { word: "detective", definition_en: "A person who looks for clues to solve a mystery." },
    { word: "evidence", definition_en: "Facts or signs that prove something is true." },
    { word: "portfolio", definition_en: "A neat folder of your best school work." },
    { word: "artifact", definition_en: "A sample of work made by a student." },
    { word: "progress", definition_en: "Growth and improvement over a period of time." }
  ],
  check_questions: [
    {
      question: "What does a detective look for to solve a mystery?",
      options: ["Hidden clues and evidence", "Sweet red apples", "Colorful party balloons"],
      correct_answer: "Hidden clues and evidence"
    },
    {
      question: "What do students create to display their best school work?",
      options: ["A neat portfolio", "A heavy toolbox", "A shopping basket"],
      correct_answer: "A neat portfolio"
    },
    {
      question: "How does building a portfolio help learners?",
      options: ["It helps them celebrate their learning growth", "It makes them feel tired", "It hides their homework"],
      correct_answer: "It helps them celebrate their learning growth"
    }
  ]
};

const W53_RW_PART2 = {
  title: "Jack and Ruby Reviewing Their Portfolios",
  topic: "Portfolio Preparation and Detective Deduction",
  turns: [
    {
      speaker: "Jack",
      statement: "Ruby, look at my completed portfolio folder!",
      options: [
        "Your drawings look very neat and colorful!",
        "It is ten meters tall.",
        "Yesterday in the kitchen."
      ],
      answer: "Your drawings look very neat and colorful!"
    },
    {
      speaker: "Ruby",
      statement: "Which writing sample will you choose as your main artifact?",
      options: [
        "I will choose my story about the clever detective.",
        "They are blue socks.",
        "At four o'clock."
      ],
      answer: "I will choose my story about the clever detective."
    },
    {
      speaker: "Jack",
      statement: "How did the detective know who borrowed the missing trophy?",
      options: [
        "By careful deduction from the muddy footprint.",
        "It was singing loudly.",
        "Tomorrow morning at home."
      ],
      answer: "By careful deduction from the muddy footprint."
    },
    {
      speaker: "Ruby",
      statement: "What did you write in your personal introduction summary?",
      options: [
        "I wrote about my favorite science experiments.",
        "I am asleep now.",
        "Because it was cold outside."
      ],
      answer: "I wrote about my favorite science experiments."
    },
    {
      speaker: "Jack",
      statement: "Shall we practice presenting our portfolios before the showcase?",
      options: [
        "Yes, let's practice our speeches right now!",
        "No, it was Tuesday yesterday.",
        "Because the train is long."
      ],
      answer: "Yes, let's practice our speeches right now!"
    }
  ]
};

const W53_RW_PART6 = {
  title: "Ruby's Portfolio Journal",
  instructions: "Read the diary and write one word in each gap.",
  text_template: "This week in class, we got ready for our big showcase. Each student collected their best work in a neat {1}. I selected my favorite detective story as my main {2}. Our teacher told us to {3} on how much we learned this year. I feel very proud of my {4} in English writing. We are all ready to {5} our year of growth.",
  answers: {
    "1": "portfolio",
    "2": "artifact",
    "3": "reflect",
    "4": "progress",
    "5": "celebrate"
  }
};

// --- W54 ---
const W54_VOCAB = [
  { word: "graduate", ipa: "/ˈɡrædʒueɪt/", definition_en: "A person who completes a course of study.", definition_vi: "Học sinh tốt nghiệp.", example_en: "Every graduate smiled on the big stage.", example_vi: "Mỗi học sinh tốt nghiệp đều mỉm cười trên sân khấu lớn." },
  { word: "showcase", ipa: "/ˈʃoʊkeɪs/", definition_en: "An event to display skills and best work.", definition_vi: "Buổi trình diễn, trưng bày.", example_en: "Our school held a wonderful learning showcase.", example_vi: "Trường chúng tôi đã tổ chức một buổi trình diễn học tập tuyệt vời." },
  { word: "stage", ipa: "/steɪdʒ/", definition_en: "A raised floor where people give speeches.", definition_vi: "Sân khấu.", example_en: "Students walked onto the stage with joy.", example_vi: "Học sinh vui vẻ bước lên sân khấu." },
  { word: "speech", ipa: "/spiːtʃ/", definition_en: "A talk given to an audience.", definition_vi: "Bài phát biểu.", example_en: "She gave a short speech in English.", example_vi: "Cô ấy đã đọc một bài phát biểu ngắn bằng tiếng Anh." },
  { word: "confidence", ipa: "/ˈkɑːnfɪdəns/", definition_en: "Feeling sure about your own abilities.", definition_vi: "Sự tự tin.", example_en: "He spoke with confidence before the crowd.", example_vi: "Cậu ấy đã nói một cách tự tin trước đám đông." },
  { word: "presentation", ipa: "/ˌprɛznˈteɪʃn/", definition_en: "A talk where you show and explain an idea.", definition_vi: "Bài thuyết trình.", example_en: "Their presentation on clean energy was clear.", example_vi: "Bài thuyết trình của họ về năng lượng sạch rất rõ ràng." },
  { word: "ancient", ipa: "/ˈeɪnʃənt/", definition_en: "Belonging to a time long ago in history.", definition_vi: "Cổ đại.", example_en: "We learned about ancient stone temples.", example_vi: "Chúng tôi đã tìm hiểu về những ngôi đền đá cổ đại." },
  { word: "pyramid", ipa: "/ˈpɪrəmɪd/", definition_en: "A large stone structure with triangular sides.", definition_vi: "Kim tự tháp.", example_en: "The ancient pyramid rose high in the desert.", example_vi: "Kim tự tháp cổ đại sừng sững giữa sa mạc." },
  { word: "monument", ipa: "/ˈmɑːnjumənt/", definition_en: "A statue or building that honors an event.", definition_vi: "Tượng đài, đài tưởng niệm.", example_en: "The marble monument honors great heroes.", example_vi: "Đài tưởng niệm bằng đá cẩm thạch vinh danh những người anh hùng vĩ đại." },
  { word: "landmark", ipa: "/ˈlændmɑːrk/", definition_en: "A well-known building or place easy to recognize.", definition_vi: "Công trình tiêu biểu, thắng cảnh.", example_en: "The Eiffel Tower is a famous landmark.", example_vi: "Tháp Eiffel là một thắng cảnh nổi tiếng." },
  { word: "applause", ipa: "/əˈplɔːz/", definition_en: "Clapping hands to show joy and approval.", definition_vi: "Tràng pháo tay.", example_en: "The audience gave loud applause after the talk.", example_vi: "Khán giả đã vỗ tay nồng nhiệt sau bài nói." },
  { word: "celebrate", ipa: "/ˈsɛləˌbreɪt/", definition_en: "Honor a happy day with special fun.", definition_vi: "Ăn mừng, chào mừng.", example_en: "Students celebrate with their families after the big show.", example_vi: "Học sinh ăn mừng cùng gia đình sau buổi diễn lớn." },
  { word: "award", ipa: "/əˈwɔːrd/", definition_en: "A prize given for good work.", definition_vi: "Phần thưởng, giải thưởng.", example_en: "She won a special award for reading.", example_vi: "Cô ấy đã giành được một phần thưởng đặc biệt cho môn đọc." },
  { word: "certificate", ipa: "/sərˈtɪfɪkət/", definition_en: "An official paper showing that you finished study.", definition_vi: "Chứng chỉ, giấy khen.", example_en: "The teacher handed me my school certificate. I was very proud.", example_vi: "Thầy giáo đã trao cho tôi chứng chỉ học tập. Tôi rất tự hào." },
  { word: "souvenir", ipa: "/ˌsuːvəˈnɪr/", definition_en: "A small item kept to remember a special time.", definition_vi: "Món quà lưu niệm.", example_en: "I bought a small souvenir badge.", example_vi: "Tôi đã mua một chiếc huy hiệu lưu niệm nhỏ." },
  { word: "memory", ipa: "/ˈmɛməri/", definition_en: "Something that you remember from the past.", definition_vi: "Kỷ niệm, ký ức.", example_en: "Our first science project is a happy memory.", example_vi: "Dự án khoa học đầu tiên của chúng tôi là một kỷ niệm vui." },
  { word: "journey", ipa: "/ˈdʒɜːrni/", definition_en: "The process of learning and growing over time.", definition_vi: "Hành trình.", example_en: "Our English learning journey was exciting.", example_vi: "Hành trình học tiếng Anh của chúng tôi thật hào hứng." },
  { word: "proud", ipa: "/praʊd/", definition_en: "Feeling very happy about the good things you did.", definition_vi: "Tự hào.", example_en: "The children were proud of their hard work.", example_vi: "Các bạn nhỏ rất tự hào về sự chăm chỉ của mình." },
  { word: "hall", ipa: "/hɔːl/", definition_en: "A large room used for meetings and events.", definition_vi: "Hội trường.", example_en: "Parents gathered in the school hall.", example_vi: "Phụ huynh tập trung đông đủ trong hội trường trường học." },
  { word: "future", ipa: "/ˈfjuːtʃər/", definition_en: "The years that will follow after today.", definition_vi: "Tương lai.", example_en: "We look forward to an exciting future.", example_vi: "Chúng tôi đón chờ một tương lai đầy hào hứng." }
];

const W54_CLIL = {
  title: "Phase 1 Graduation Showcase",
  topic: "Graduation Celebration and Looking Ahead",
  content_en: "Today is a big day for every graduate at our school. Families gather in the hall for the annual showcase. Students stand on the stage and feel proud of their learning journey. With great confidence, each student gives a short speech before the audience. In their presentation, they share memories of an ancient wonder, like a giant stone pyramid or a famous landmark monument. Parents smile and celebrate this happy event with loud applause. The principal gives each child a special award and a paper certificate. A small souvenir gift reminds everyone of this wonderful memory. All students are ready for an exciting future in the next grade.",
  glossary: [
    { word: "graduate", definition_en: "A student who finishes a course of learning." },
    { word: "showcase", definition_en: "An event to show off skills and achievements." },
    { word: "speech", definition_en: "A talk given to a group of people." },
    { word: "presentation", definition_en: "A spoken talk explaining an idea or project." },
    { word: "certificate", definition_en: "An official document proving you finished study." }
  ],
  check_questions: [
    {
      question: "Where do families gather for the graduation showcase?",
      options: ["In the school hall", "At a bus stop", "In a dark basement"],
      correct_answer: "In the school hall"
    },
    {
      question: "What does the principal give each graduating student?",
      options: ["A special award and a paper certificate", "A bag of cold ice", "A red umbrella"],
      correct_answer: "A special award and a paper certificate"
    },
    {
      question: "How do parents celebrate their children's speeches?",
      options: ["With loud applause and smiles", "By walking away silently", "By turning off the lights"],
      correct_answer: "With loud applause and smiles"
    }
  ]
};

const W54_RW_PART2 = {
  title: "Liam and Zoe at the Graduation Showcase",
  topic: "Graduation Speeches and Celebrations",
  turns: [
    {
      speaker: "Liam",
      statement: "Zoe, look at all the parents waiting in the hall!",
      options: [
        "They are smiling and ready for our speeches!",
        "It is four meters wide.",
        "Last Friday evening."
      ],
      answer: "They are smiling and ready for our speeches!"
    },
    {
      speaker: "Zoe",
      statement: "Are you ready to walk onto the stage with your certificate?",
      options: [
        "Yes, I feel very proud of our work!",
        "They are blue socks.",
        "Under the chair."
      ],
      answer: "Yes, I feel very proud of our work!"
    },
    {
      speaker: "Liam",
      statement: "What did you share during your presentation talk?",
      options: [
        "I talked about the ancient stone pyramid we studied.",
        "It has two wings.",
        "Tomorrow morning at home."
      ],
      answer: "I talked about the ancient stone pyramid we studied."
    },
    {
      speaker: "Zoe",
      statement: "Will you keep this graduation souvenir for a long time?",
      options: [
        "Yes, it will always remind me of Phase 1.",
        "I am asleep now.",
        "Because it was cold outside."
      ],
      answer: "Yes, it will always remind me of Phase 1."
    },
    {
      speaker: "Liam",
      statement: "Shall we take a picture together with our certificates?",
      options: [
        "Yes, let's take a photo right now!",
        "No, it was raining yesterday.",
        "Because the train is fast."
      ],
      answer: "Yes, let's take a photo right now!"
    }
  ]
};

const W54_RW_PART6 = {
  title: "Liam's Graduation Journal",
  instructions: "Read the diary and write one word in each gap.",
  text_template: "Today was the graduation showcase at our school. Every {1} stood on the stage to give a short speech. I felt great {2} as my parents smiled and clapped. The principal handed me a beautiful paper {3} and a golden badge. It has been an exciting learning {4} across fifty-four weeks. We are ready for a wonderful {5} in Phase 2.",
  answers: {
    "1": "graduate",
    "2": "confidence",
    "3": "certificate",
    "4": "journey",
    "5": "future"
  }
};

// ============================================================================
// EXECUTION ENGINE
// ============================================================================

const TARGETS = [
  {
    week: 47,
    vocab: W47_VOCAB,
    clil: W47_CLIL,
    rw2: W47_RW_PART2,
    rw6: W47_RW_PART6,
    bpGrammar: "Hyphenated numbers (twenty-one); place value grouping"
  },
  {
    week: 48,
    vocab: W48_VOCAB,
    clil: W48_CLIL,
    rw2: W48_RW_PART2,
    rw6: W48_RW_PART6,
    bpGrammar: "Comparative adjectives and measurement phrases (*It is [number] centimeters long*)"
  },
  {
    week: 49,
    vocab: W49_VOCAB,
    clil: W49_CLIL,
    rw2: W49_RW_PART2,
    rw6: W49_RW_PART6,
    bpGrammar: "Future tense with *want to be* and *will* (*I want to be a doctor in order to help people*)"
  },
  {
    week: 50,
    vocab: W50_VOCAB,
    clil: W50_CLIL,
    rw2: W50_RW_PART2,
    rw6: W50_RW_PART6,
    bpGrammar: "First conditional with present and future forms (*If we use clean energy...*)"
  },
  {
    week: 51,
    vocab: W51_VOCAB,
    clil: W51_CLIL,
    rw2: W51_RW_PART2,
    rw6: W51_RW_PART6,
    bpGrammar: "Order of adjectives and comparative forms in planetary descriptions"
  },
  {
    week: 53,
    vocab: W53_VOCAB,
    clil: W53_CLIL,
    rw2: W53_RW_PART2,
    rw6: W53_RW_PART6,
    bpGrammar: "Modal verbs of deduction (*must be, can't be*); portfolio review reflections",
    bpTheme: 'Project 4 Prep - "My Year in Review"'
  },
  {
    week: 54,
    vocab: W54_VOCAB,
    clil: W54_CLIL,
    rw2: W54_RW_PART2,
    rw6: W54_RW_PART6,
    bpGrammar: "Present perfect introduction (*Have you ever visited...?*); graduation speech presentations"
  }
];

for (const t of TARGETS) {
  const dir = path.join(STAGING_DIR, `week_${t.week}`);
  console.log(`\n======================================================`);
  console.log(`Remediating Week ${t.week} at ${dir}...`);

  // 1. Assert FK and length
  assertFK(t.vocab, t.week);
  if (t.vocab.length !== 20) {
    throw new Error(`Week ${t.week} vocab length is ${t.vocab.length}, expected 20!`);
  }

  // 2. Update vocab.js
  const vocabFile = path.join(dir, 'vocab.js');
  const vocabContent = `// Week ${t.week} Target Vocabulary (20/20 Target Words with GA IPA, Definitions, Examples)
export const vocabData = {
  week: ${t.week},
  vocab: ${JSON.stringify(t.vocab, null, 2)}
};

export default vocabData;
`;
  fs.writeFileSync(vocabFile, vocabContent, 'utf8');
  console.log(`  ✓ Updated vocab.js (20 words, 0 FK violations)`);

  // 3. Update reading_hub.js
  const rhFile = path.join(dir, 'reading_hub.js');
  let rhData = (await import(path.join(dir, `reading_hub.js?t=${Date.now()}`))).default;

  rhData.clil_article = {
    ...rhData.clil_article,
    ...t.clil
  };

  rhData.rw_part2 = t.rw2;
  rhData.rw_part_2 = t.rw2;
  rhData.rw_part6 = t.rw6;
  rhData.rw_part_6 = t.rw6;

  rhData.cambridge_rw = {
    part1_definitions: rhData.rw_part1?.definitions || rhData.cambridge_rw?.part1_definitions || [],
    part2_dialogue: t.rw2,
    part6_cloze: t.rw6
  };

  const rhContent = `// Week ${t.week} Reading Hub Deliverable
export const readingHubData = ${JSON.stringify(rhData, null, 2)};

export default readingHubData;
`;
  fs.writeFileSync(rhFile, rhContent, 'utf8');
  console.log(`  ✓ Updated reading_hub.js (CLIL with ${t.clil.glossary.length} glossary terms, gradable R&W Part 2 & Part 6)`);

  // 4. Update blueprint.json
  const bpFile = path.join(dir, 'blueprint.json');
  const bp = JSON.parse(fs.readFileSync(bpFile, 'utf8'));
  bp.grammar_focus = {
    structure: t.bpGrammar,
    outcome: bp.grammar_focus?.outcome || null,
    pattern_regex: bp.grammar_focus?.pattern_regex || null,
    requires_authoring_examples: true
  };
  if (t.bpTheme) {
    bp.theme = t.bpTheme;
  }
  fs.writeFileSync(bpFile, JSON.stringify(bp, null, 2) + '\n', 'utf8');
  console.log(`  ✓ Updated blueprint.json (grammar_focus English translation, zero Vietnamese leak)`);
}

console.log('\n🎉 All 7 target weeks remediated successfully.');
