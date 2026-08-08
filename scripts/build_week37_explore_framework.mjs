import fs from 'fs';
import path from 'path';

console.log('🚀 Building Global World Horizon Explore Station Framework for Week 37 (ADV & EASY)...');

const ADV_DIR = './src/data/weeks/week_37';
const EASY_DIR = './src/data/weeks_easy/week_37';

fs.mkdirSync(ADV_DIR, { recursive: true });
fs.mkdirSync(EASY_DIR, { recursive: true });

// ============================================================================
// EXPLORE STATION PASSAGES (100% Global World Horizon Framework — Kenya Champions)
// ============================================================================

// ADV Explore (~190w, 10 bolds)
const advExploreEn = `Far away in East Africa, high in the Great Rift Valley of Kenya, lies a legendary town called Iten. It **is known as the Home of Champions** because world-record marathon runners train there every day. Young athletes run together on red dirt paths 2,400 metres above sea level. High up in the mountains, the thin air contains less oxygen, so the human body naturally adapts by building stronger lungs and heart muscles. For many Kenyan children, **running long distances to school** across rolling hills **is a normal part** of daily life. This daily endurance training turns young runners into world-class athletes who **win global marathon races**. Today, international runners from around the world **travel to Kenya to train** together in Iten. Athletes **share traditional meals** and **learn about different cultures** while running under the African sun. Outdoor running in Kenya **is a powerful bridge** that connects local communities to the global sports world. By pursuing athletic dreams, young runners **inspire children everywhere** to stay active and **achieve great goals**!`;

const advExploreVi = `Xa xôi ở Đông Phi, cao trên Thung lũng Rift Lớn của Kenya, có một thị trấn huyền thoại tên là Iten. Nơi đây được biết đến như Quê hương của những Nhà vô địch vì các vận động viên marathon kỷ lục thế giới tập luyện ở đó mỗi ngày. Các vận động viên trẻ cùng nhau chạy trên những con đường đất đỏ cao 2.400 mét so với mực nước biển. Trên núi cao, không khí mỏng chứa ít oxy hơn, vì vậy cơ thể con người tự nhiên thích nghi bằng cách xây dựng lá phổi và cơ tim khỏe mạnh hơn. Đối với nhiều trẻ em Kenya, việc chạy quãng đường dài đến trường qua những ngọn đồi nhấp nhô là một phần bình thường của cuộc sống hàng ngày. Việc rèn luyện sức bền hàng ngày này biến các vận động viên trẻ thành những vận động viên đẳng cấp thế giới, những người giành chiến thắng trong các giải marathon toàn cầu. Ngày nay, các vận động viên quốc tế từ khắp nơi trên thế giới đến Kenya để cùng tập luyện ở Iten. Họ chia sẻ các bữa ăn truyền thống và tìm hiểu về các nền văn hóa khác nhau. Chạy bộ ở Kenya là chiếc cầu nối mạnh mẽ kết nối cộng đồng địa phương với thế giới thể thao toàn cầu!`;

// EASY Explore (155w, 10 bolds)
const easyExploreEn = `Far away in East Africa, high in the mountains of Kenya, lies a small town named Iten. It **is known as the Home of Champions** because fast marathon runners train there every single day. High mountain air has less oxygen, so active runners build very strong lungs and healthy hearts. For many Kenyan children, **running long distances to school** across green hills **is a normal part** of daily life. They **run on red dirt paths** every morning under the warm African sun. Fresh mountain air gives active runners great natural energy. This long training helps them **win global marathon races** around the world. Today, international runners from many countries **travel to Kenya to train** together in Iten. They **share healthy meals** and **learn about different cultures** while running fast. Running **is a great bridge** that connects Kenya to children everywhere. Young athletes **feel proud** when they **achieve big dreams** through speed!`;

const easyExploreVi = `Xa xôi ở Đông Phi, cao trên những ngọn núi ở Kenya, có một thị trấn nhỏ tên là Iten. Nơi đây được biết đến như Quê hương của những Nhà vô địch vì các vận động viên marathon nhanh nhẹn tập luyện ở đó mỗi ngày. Không khí núi cao có ít oxy hơn, nên người chạy xây dựng lá phổi và cơ tim rất khỏe. Đối với nhiều trẻ em Kenya, chạy quãng đường dài đến trường qua những ngọn đồi xanh là một phần bình thường của cuộc sống hàng ngày. Họ chạy trên đường đất đỏ mỗi sáng dưới ánh nắng mặt trời Châu Phi ấm áp. Không khí núi trong lành mang lại năng lượng tự nhiên lớn. Sự rèn luyện lâu dài này giúp họ giành chiến thắng trong các giải marathon toàn cầu trên thế giới. Ngày nay, các vận động viên quốc tế từ nhiều quốc gia đến Kenya để cùng tập luyện ở Iten. Họ chia sẻ các bữa ăn lành mạnh và tìm hiểu về các nền văn hóa khác nhau. Chạy bộ là chiếc cầu nối tuyệt vời kết nối Kenya với trẻ em khắp nơi. Các vận động viên trẻ cảm thấy tự hào khi họ đạt được những giấc mơ lớn thông qua tốc độ!`;

const advExploreData = `export default {
  content_en: \`${advExploreEn}\`,
  content_vi: \`${advExploreVi}\`,
  check_questions: [
    {
      id: 1,
      question_en: "Where is the town of Iten located?",
      question_vi: "Thị trấn Iten nằm ở đâu?",
      options: [
        "In the Great Rift Valley of Kenya, East Africa",
        "In ancient Olympia, Greece",
        "Near a sports stadium in London",
        "On a tropical island in the Pacific Ocean"
      ],
      correct_answer: 0,
      explanation_en: "Iten is located high in the Great Rift Valley of Kenya, East Africa.",
      explanation_vi: "Iten nằm ở vùng cao trên Thung lũng Rift Lớn của Kenya, Đông Phi."
    },
    {
      id: 2,
      question_en: "Why does running high up in the mountains build stronger lungs and heart muscles?",
      question_vi: "Tại sao chạy trên núi cao lại giúp phổi và cơ tim khỏe mạnh hơn?",
      options: [
        "Because thin mountain air has less oxygen, forcing the body to adapt",
        "Because mountain tracks are made of synthetic rubber",
        "Because athletes only run in cold rainy weather",
        "Because children drink special juices in the mountains"
      ],
      correct_answer: 0,
      explanation_en: "Thin mountain air contains less oxygen, so the human body adapts by strengthening lungs and heart muscles.",
      explanation_vi: "Không khí mỏng trên núi chứa ít oxy hơn, khiến cơ thể thích nghi bằng cách làm lá phổi và cơ tim khỏe hơn."
    },
    {
      id: 3,
      question_en: "What do international runners do when they travel to Iten, Kenya?",
      question_vi: "Các vận động viên quốc tế làm gì khi đến Iten, Kenya?",
      options: [
        "They train together, share traditional meals, and learn about different cultures",
        "They build big sports stadiums with swimming pools",
        "They stop running and rest at hotels all day",
        "They only watch sports on television"
      ],
      correct_answer: 0,
      explanation_en: "Runners from around the world train together, share traditional meals, and exchange cultures in Iten.",
      explanation_vi: "Các vận động viên từ khắp nơi trên thế giới cùng tập luyện, chia sẻ bữa ăn truyền thống và giao lưu văn hóa tại Iten."
    },
    {
      id: 4,
      critical_thinking: true,
      question_en: "How does running long distances every day help children build physical strength and achieve their future dreams?",
      question_vi: "Chạy bộ quãng đường dài hàng ngày giúp trẻ em xây dựng thể lực và đạt được ước mơ tương lai như thế nào?",
      options: [
        "It builds strong cardiovascular endurance and determination to overcome challenges",
        "It makes children stay inside their classrooms all day",
        "It lets runners skip daily practice completely",
        "It only helps people win gold trophies without hard work"
      ],
      correct_answer: 0,
      explanation_en: "Daily endurance running develops strong heart endurance and mental resilience to achieve great life goals.",
      explanation_vi: "Chạy bộ rèn luyện sức bền tim mạch và ý chí kiên cường để vượt qua khó khăn và đạt mục tiêu lớn."
    }
  ],
  question: {
    text_en: "Write a short paragraph about how high-altitude running in Kenya inspires children around the world to stay active and pursue their dreams.",
    text_vi: "Viết một đoạn văn ngắn về việc chạy bộ trên vùng cao ở Kenya truyền cảm hứng cho trẻ em trên toàn thế giới giữ lối sống năng động và theo đuổi ước mơ.",
    min_words: 15,
    hint_en: "Mention Kenya, high altitude, thin air, strong lungs, and inspiring global children.",
    hint_vi: "Nêu các ý: Kenya, độ cao lớn, không khí mỏng, lá phổi khỏe, và truyền cảm hứng cho trẻ em toàn cầu."
  }
};`;

const easyExploreData = `export default {
  content_en: \`${easyExploreEn}\`,
  content_vi: \`${easyExploreVi}\`,
  check_questions: [
    {
      id: 1,
      question_en: "Where is the small town named Iten?",
      question_vi: "Thị trấn nhỏ tên Iten ở đâu?",
      options: [
        "High in the mountains of Kenya",
        "In a big city classroom",
        "Near a ocean beach",
        "In ancient Greece"
      ],
      correct_answer: 0,
      explanation_en: "Iten is a small town high in the mountains of Kenya.",
      explanation_vi: "Iten là một thị trấn nhỏ ở vùng núi cao của Kenya."
    },
    {
      id: 2,
      question_en: "How do Kenyan children get to school every morning?",
      question_vi: "Trẻ em Kenya đến trường như thế nào mỗi sáng?",
      options: [
        "They run across green hills and red dirt paths",
        "They take big yellow buses",
        "They ride fast trains",
        "They stay at home all day"
      ],
      correct_answer: 0,
      explanation_en: "Kenyan children run long distances to school across hills and dirt paths.",
      explanation_vi: "Trẻ em Kenya chạy quãng đường dài đến trường qua những ngọn đồi và đường đất."
    },
    {
      id: 3,
      question_en: "What connects Kenya to children around the world?",
      question_vi: "Điều gì kết nối Kenya với trẻ em trên khắp thế giới?",
      options: [
        "Running and sports friendship",
        "Buying new toys",
        "Watching television alone",
        "Playing computer games"
      ],
      correct_answer: 0,
      explanation_en: "Running is a great bridge that connects Kenya to children everywhere through sports.",
      explanation_vi: "Chạy bộ là chiếc cầu nối tuyệt vời kết nối Kenya với trẻ em khắp nơi qua tình bạn thể thao."
    },
    {
      id: 4,
      critical_thinking: true,
      question_en: "Why is running outdoors good for your heart and body?",
      question_vi: "Tại sao chạy bộ ngoài trời lại tốt cho tim và cơ thể của bạn?",
      options: [
        "It builds strong lungs, a healthy heart, and great energy",
        "It makes people feel tired and sad all day",
        "It prevents children from making new friends",
        "It only works inside a quiet room"
      ],
      correct_answer: 0,
      explanation_en: "Outdoor running strengthens your lungs and heart while giving high energy.",
      explanation_vi: "Chạy bộ ngoài trời giúp tăng cường sức khỏe của phổi và tim đồng thời mang lại năng lượng dồi dào."
    }
  ],
  question: {
    text_en: "Why do runners from many countries travel to Kenya to train together?",
    text_vi: "Tại sao các vận động viên từ nhiều quốc gia lại đến Kenya để cùng tập luyện?",
    min_words: 10,
    hint_en: "Mention strong lungs, running fast, and global friendship.",
    hint_vi: "Nêu các ý: lá phổi khỏe, chạy nhanh, và tình hữu nghị toàn cầu."
  }
};`;

fs.writeFileSync(path.join(ADV_DIR, 'explore.js'), advExploreData, 'utf8');
fs.writeFileSync(path.join(EASY_DIR, 'explore.js'), easyExploreData, 'utf8');
console.log('✅ Successfully wrote 100% Global World Horizon explore.js for ADV & EASY!');
