/**
 * Personal Questions Bank for Hot Seat Game
 *
 * Questions are organized by proficiency level:
 *   level1 → Weeks 1–10  : Simple to be, have, present simple, basic info
 *   level2 → Weeks 11–20 : Routines, hobbies, adjectives, can/can't, frequency
 *   level3 → Weeks 21–32 : Opinions, past tense, future, complex structures
 *
 * Each entry matches the read.js comprehension_question shape:
 *   question_en     – The question the student must form (full, correct English)
 *   answer          – Sample natural answer (for fallback display only)
 *   clue_statement  – The statement shown as a hint on the card
 *   hint_en         – Short English hint
 *   hint_vi         – Short Vietnamese hint
 */

const personalQuestions = {

  // ─── Level 1: Weeks 1–10 ──────────────────────────────────────────────────
  level1: [
    // Identity & name
    { question_en: "What is your name?",           answer: ["My name is Lily", "Lily"],                clue_statement: "My name is Lily.",                hint_en: "My name is...",        hint_vi: "Tên tôi là..." },
    { question_en: "How old are you?",             answer: ["I am nine years old", "Nine", "9"],        clue_statement: "I am nine years old.",            hint_en: "I am ___ years old.",  hint_vi: "Tôi ___ tuổi." },
    { question_en: "Are you a boy or a girl?",     answer: ["I am a girl", "A girl"],                   clue_statement: "I am a girl.",                    hint_en: "I am a...",            hint_vi: "Tôi là..." },
    // School
    { question_en: "Where do you go to school?",   answer: ["I go to Greenwood School"],                clue_statement: "I go to Greenwood School.",       hint_en: "I go to...",           hint_vi: "Tôi học tại..." },
    { question_en: "Who is your teacher?",         answer: ["My teacher is Ms. Johnson", "Ms. Johnson"],clue_statement: "My teacher is Ms. Johnson.",      hint_en: "My teacher is...",     hint_vi: "Giáo viên của tôi là..." },
    { question_en: "What grade are you in?",       answer: ["I am in Grade 4", "Grade 4", "4"],         clue_statement: "I am in Grade 4.",                hint_en: "I am in Grade...",     hint_vi: "Tôi học lớp..." },
    { question_en: "Is your classroom big?",       answer: ["Yes, my classroom is big"],                clue_statement: "My classroom is big and bright.", hint_en: "My classroom is...",   hint_vi: "Phòng học của tôi..." },
    // Family
    { question_en: "How many people are in your family?", answer: ["There are four people"],            clue_statement: "There are four people in my family.", hint_en: "There are...",    hint_vi: "Gia đình tôi có..." },
    { question_en: "Do you have a brother or sister?",   answer: ["I have one sister", "Yes, one sister"], clue_statement: "I have one sister.",          hint_en: "I have a...",          hint_vi: "Tôi có..." },
    { question_en: "Who is the leader of your family?",  answer: ["My mother is the leader"],           clue_statement: "My mother is the leader of our family.", hint_en: "My mother is...", hint_vi: "Mẹ tôi là..." },
    // Home
    { question_en: "Where do you live?",           answer: ["I live in Hanoi", "Hanoi"],                clue_statement: "I live in Hanoi.",                hint_en: "I live in...",         hint_vi: "Tôi sống ở..." },
    { question_en: "Is your house big?",           answer: ["Yes, my house is big"],                    clue_statement: "My house is big and cozy.",       hint_en: "My house is...",       hint_vi: "Nhà tôi..." },
    { question_en: "What room do you sleep in?",   answer: ["I sleep in my bedroom"],                   clue_statement: "I sleep in my bedroom.",          hint_en: "I sleep in...",        hint_vi: "Tôi ngủ ở..." },
    // Appearance
    { question_en: "What color is your hair?",     answer: ["My hair is black", "Black"],               clue_statement: "My hair is black.",               hint_en: "My hair is...",        hint_vi: "Tóc tôi màu..." },
    { question_en: "Are you tall or short?",       answer: ["I am a little short"],                     clue_statement: "I am a little short.",            hint_en: "I am tall/short.",     hint_vi: "Tôi cao/thấp." },
    { question_en: "Do you wear glasses?",         answer: ["No, I don't wear glasses"],                clue_statement: "I don't wear glasses.",           hint_en: "I wear / don't wear...", hint_vi: "Tôi đeo / không đeo..." },
    // Likes & favorites
    { question_en: "What is your favorite color?", answer: ["My favorite color is blue", "Blue"],       clue_statement: "My favorite color is blue.",      hint_en: "My favorite color is...", hint_vi: "Màu yêu thích của tôi..." },
    { question_en: "What do you like to eat?",     answer: ["I like to eat noodles"],                   clue_statement: "I like to eat noodles.",          hint_en: "I like to eat...",     hint_vi: "Tôi thích ăn..." },
    { question_en: "What is your favorite food?",  answer: ["My favorite food is pho", "Pho"],          clue_statement: "My favorite food is pho.",        hint_en: "My favorite food is...", hint_vi: "Món ăn yêu thích của tôi..." },
    { question_en: "Do you like animals?",         answer: ["Yes, I love animals"],                     clue_statement: "I love animals, especially cats.", hint_en: "I love / don't like...", hint_vi: "Tôi thích / không thích..." },
    { question_en: "Do you have a pet?",           answer: ["I have a cat at home", "Yes, a cat"],      clue_statement: "I have a cat at home.",           hint_en: "I have a / don't have...", hint_vi: "Tôi có / không có..." },
    // Bag & school items
    { question_en: "What color is your bag?",      answer: ["My bag is blue", "Blue"],                  clue_statement: "My bag is blue.",                 hint_en: "My bag is...",         hint_vi: "Túi của tôi màu..." },
    { question_en: "What do you have in your bag?", answer: ["I have books and a pencil"],              clue_statement: "I have books and a pencil in my bag.", hint_en: "I have...",       hint_vi: "Tôi có..." },
    // Transport
    { question_en: "How do you go to school?",     answer: ["I go to school by bus", "By bus"],         clue_statement: "I go to school by bus.",          hint_en: "I go by...",           hint_vi: "Tôi đi học bằng..." },
    // Feelings
    { question_en: "How do you feel today?",       answer: ["I feel happy today", "Happy"],             clue_statement: "I feel happy today.",             hint_en: "I feel...",            hint_vi: "Tôi cảm thấy..." },
    { question_en: "Are you happy at school?",     answer: ["Yes, I am happy at school"],               clue_statement: "I am happy at school.",           hint_en: "I am happy / not...",  hint_vi: "Tôi vui / không vui..." },
    // Abilities
    { question_en: "Can you swim?",                answer: ["Yes, I can swim"],                         clue_statement: "Yes, I can swim.",                hint_en: "Yes, I can / No, I can't.", hint_vi: "Tôi có thể / không thể..." },
    { question_en: "Can you ride a bike?",         answer: ["Yes, I can ride a bike"],                  clue_statement: "Yes, I can ride a bike.",         hint_en: "Yes, I can...",        hint_vi: "Tôi có thể..." },
    // Numbers & time
    { question_en: "What time do you wake up?",    answer: ["I wake up at 6 o'clock"],                  clue_statement: "I wake up at six o'clock.",       hint_en: "I wake up at...",      hint_vi: "Tôi thức dậy lúc..." },
    { question_en: "What is your favorite number?", answer: ["My favorite number is 7", "Seven", "7"], clue_statement: "My favorite number is seven.",    hint_en: "My favorite number is...", hint_vi: "Số yêu thích của tôi..." },
  ],

  // ─── Level 2: Weeks 11–20 ────────────────────────────────────────────────
  level2: [
    // Daily routine
    { question_en: "What do you do every morning?",   answer: ["I brush my teeth and eat breakfast"],  clue_statement: "Every morning I brush my teeth and eat breakfast.", hint_en: "Every morning I...", hint_vi: "Mỗi sáng tôi..." },
    { question_en: "What time do you go to bed?",     answer: ["I go to bed at 9 o'clock"],            clue_statement: "I go to bed at nine o'clock.",    hint_en: "I go to bed at...",    hint_vi: "Tôi đi ngủ lúc..." },
    { question_en: "What do you do after school?",    answer: ["I play soccer after school"],          clue_statement: "I play soccer after school.",     hint_en: "I ___ after school.",  hint_vi: "Sau giờ học tôi..." },
    { question_en: "How often do you exercise?",      answer: ["I exercise three times a week"],       clue_statement: "I exercise three times a week.",  hint_en: "I exercise...",        hint_vi: "Tôi tập thể dục..." },
    { question_en: "Do you help your parents at home?", answer: ["Yes, I help clean the house"],       clue_statement: "I help my parents clean the house.", hint_en: "I help...",         hint_vi: "Tôi giúp..." },
    // School & subjects
    { question_en: "What is your favorite subject?",  answer: ["My favorite subject is Math", "Math"], clue_statement: "My favorite subject is Math.",   hint_en: "My favorite subject is...", hint_vi: "Môn học yêu thích..." },
    { question_en: "What subject do you find difficult?", answer: ["I find English difficult"],        clue_statement: "I find English a little difficult.", hint_en: "I find ___ difficult.", hint_vi: "Tôi thấy ___ khó." },
    { question_en: "How many students are in your class?", answer: ["There are 30 students"],          clue_statement: "There are 30 students in my class.", hint_en: "There are...",      hint_vi: "Có ___ học sinh..." },
    // Friends
    { question_en: "Who is your best friend?",        answer: ["My best friend is Lily", "Lily"],      clue_statement: "My best friend is Lily.",         hint_en: "My best friend is...", hint_vi: "Bạn thân nhất của tôi..." },
    { question_en: "What do you and your friends do?", answer: ["We play games together"],             clue_statement: "My friends and I play games together.", hint_en: "We...",         hint_vi: "Chúng tôi..." },
    // Hobbies & sports
    { question_en: "What sport do you play?",         answer: ["I play badminton on weekends"],        clue_statement: "I play badminton on weekends.",   hint_en: "I play...",            hint_vi: "Tôi chơi..." },
    { question_en: "What do you like to do on weekends?", answer: ["I like to draw pictures"],         clue_statement: "I like to draw pictures on weekends.", hint_en: "I like to...",    hint_vi: "Tôi thích..." },
    { question_en: "Do you like reading books?",      answer: ["Yes, I love reading books"],           clue_statement: "I love reading books.",           hint_en: "I love / don't love...", hint_vi: "Tôi thích / không thích..." },
    { question_en: "How often do you read books?",    answer: ["I read books every evening"],          clue_statement: "I read books every evening.",     hint_en: "I read books...",      hint_vi: "Tôi đọc sách..." },
    { question_en: "Can you play a musical instrument?", answer: ["I can play the piano"],             clue_statement: "I can play the piano.",           hint_en: "I can play...",        hint_vi: "Tôi có thể chơi..." },
    // Body & health
    { question_en: "How tall are you?",               answer: ["I am one point three meters tall"],   clue_statement: "I am 1.3 meters tall.",           hint_en: "I am ___ meters tall.", hint_vi: "Tôi cao ___ mét." },
    { question_en: "Do you eat vegetables every day?", answer: ["Yes, I eat vegetables every day"],   clue_statement: "I eat vegetables every day.",     hint_en: "I eat vegetables...",  hint_vi: "Tôi ăn rau..." },
    { question_en: "What do you do to stay healthy?", answer: ["I exercise and eat well"],             clue_statement: "I exercise and eat well to stay healthy.", hint_en: "I exercise and...", hint_vi: "Tôi tập thể dục và..." },
    // Weather & nature
    { question_en: "What is the weather like today?", answer: ["It is sunny and warm today"],          clue_statement: "It is sunny and warm today.",     hint_en: "It is...",             hint_vi: "Trời hôm nay..." },
    { question_en: "Do you like rainy days?",         answer: ["I like rainy days because it is cool"], clue_statement: "I like rainy days because it is cool.", hint_en: "I like/don't like...", hint_vi: "Tôi thích/không thích..." },
    // Future & dreams
    { question_en: "What do you want to be?",         answer: ["I want to be a doctor"],               clue_statement: "I want to be a doctor.",          hint_en: "I want to be...",      hint_vi: "Tôi muốn trở thành..." },
    { question_en: "Where does your family like to go?", answer: ["My family likes to go to the beach"], clue_statement: "My family likes to go to the beach.", hint_en: "My family likes...", hint_vi: "Gia đình tôi thích..." },
    // Places & community
    { question_en: "Is there a park near your home?", answer: ["Yes, there is a park near my home"],   clue_statement: "There is a park near my home.",   hint_en: "There is a...",        hint_vi: "Gần nhà tôi có..." },
    { question_en: "Where do you buy food?",          answer: ["We buy food at the market"],           clue_statement: "We buy food at the market.",      hint_en: "We buy food at...",    hint_vi: "Chúng tôi mua thức ăn ở..." },
    // Describing people
    { question_en: "What does your mother look like?", answer: ["My mother is tall and has long hair"], clue_statement: "My mother is tall and has long hair.", hint_en: "My mother is...", hint_vi: "Mẹ tôi..." },
    { question_en: "Is your father tall?",             answer: ["Yes, my father is tall and strong"],  clue_statement: "My father is tall and strong.",   hint_en: "My father is...",      hint_vi: "Bố tôi..." },
    // Technology
    { question_en: "Do you use a computer?",          answer: ["Yes, I use a computer for school"],    clue_statement: "I use a computer for school.",    hint_en: "I use a computer...",  hint_vi: "Tôi dùng máy tính..." },
    { question_en: "What do you do on the computer?", answer: ["I do homework and watch videos"],      clue_statement: "I do homework and watch videos on the computer.", hint_en: "I do homework and...", hint_vi: "Tôi làm bài và..." },
    // Culture & food
    { question_en: "What food do Vietnamese people eat?", answer: ["Vietnamese people eat rice, pho, and banh mi"], clue_statement: "Vietnamese people eat rice, pho, and banh mi.", hint_en: "Vietnamese people eat...", hint_vi: "Người Việt ăn..." },
    { question_en: "Do you celebrate Tet?",           answer: ["Yes, I celebrate Tet with my family"], clue_statement: "I celebrate Tet with my family.", hint_en: "I celebrate...",       hint_vi: "Tôi ăn Tết..." },
  ],

  // ─── Level 3: Weeks 21–32 ────────────────────────────────────────────────
  level3: [
    // Opinions & preferences
    { question_en: "What do you think about protecting nature?",    answer: ["I think we should protect nature"],                clue_statement: "I think we should protect nature.",            hint_en: "I think we should...",    hint_vi: "Tôi nghĩ chúng ta nên..." },
    { question_en: "Which do you prefer, reading or watching TV?",  answer: ["I prefer reading to watching TV"],                 clue_statement: "I prefer reading to watching TV.",            hint_en: "I prefer ___ to...",      hint_vi: "Tôi thích ___ hơn..." },
    { question_en: "What is the most important thing in your life?",answer: ["Family is the most important thing in my life"],   clue_statement: "Family is the most important thing in my life.", hint_en: "The most important...", hint_vi: "Điều quan trọng nhất..." },
    { question_en: "Do you think learning English is important?",   answer: ["Yes, I think learning English is very important"],  clue_statement: "I think learning English is very important.", hint_en: "I think learning...",     hint_vi: "Tôi nghĩ học tiếng Anh..." },
    { question_en: "What kind of music do you like?",               answer: ["I like pop music and K-pop"],                      clue_statement: "I like pop music and K-pop.",                 hint_en: "I like ___ music.",       hint_vi: "Tôi thích nhạc..." },
    { question_en: "Who do you admire most?",                       answer: ["I admire my mother most"],                         clue_statement: "I admire my mother most.",                    hint_en: "I admire...",             hint_vi: "Tôi ngưỡng mộ..." },
    // Past experiences
    { question_en: "What did you do last weekend?",                 answer: ["I went to the park with my family"],               clue_statement: "Last weekend I went to the park with my family.", hint_en: "Last weekend I...",    hint_vi: "Cuối tuần trước tôi..." },
    { question_en: "Have you ever been to another country?",        answer: ["I have been to Singapore"],                        clue_statement: "I have been to Singapore.",                   hint_en: "I have been to...",       hint_vi: "Tôi đã đến..." },
    { question_en: "What was your best memory this year?",          answer: ["My best memory was a trip to Da Nang"],            clue_statement: "My best memory this year was a trip to Da Nang.", hint_en: "My best memory was...", hint_vi: "Kỷ niệm đẹp nhất của tôi là..." },
    { question_en: "Did you enjoy your last vacation?",             answer: ["Yes, I enjoyed my last vacation very much"],       clue_statement: "I enjoyed my last vacation very much.",       hint_en: "I enjoyed...",            hint_vi: "Tôi đã thích..." },
    // Skills & talents
    { question_en: "What are you good at?",                         answer: ["I am good at drawing and painting"],               clue_statement: "I am good at drawing and painting.",          hint_en: "I am good at...",         hint_vi: "Tôi giỏi..." },
    { question_en: "What are your hobbies?",                        answer: ["My hobbies are reading and painting"],             clue_statement: "My hobbies are reading and painting.",        hint_en: "My hobbies are...",       hint_vi: "Sở thích của tôi là..." },
    { question_en: "How long have you been learning English?",      answer: ["I have been learning English for three years"],     clue_statement: "I have been learning English for three years.", hint_en: "I have been learning for...", hint_vi: "Tôi đã học tiếng Anh được..." },
    // Community & environment
    { question_en: "How do you help the environment?",              answer: ["I recycle and plant trees to help the environment"], clue_statement: "I recycle and plant trees to help the environment.", hint_en: "I recycle and...", hint_vi: "Tôi tái chế và..." },
    { question_en: "What problems does your community have?",       answer: ["My community has a problem with littering"],        clue_statement: "My community has a problem with littering.",  hint_en: "My community has...",     hint_vi: "Cộng đồng của tôi có..." },
    { question_en: "What can young people do to help the community?", answer: ["We can clean up parks and help elderly people"], clue_statement: "We can clean up parks and help elderly people.", hint_en: "We can clean...",       hint_vi: "Chúng ta có thể..." },
    // Future plans & goals
    { question_en: "What do you want to do in the future?",         answer: ["I want to travel around the world"],               clue_statement: "I want to travel around the world.",          hint_en: "I want to...",            hint_vi: "Tôi muốn..." },
    { question_en: "Where would you like to go on vacation?",       answer: ["I would like to go to Paris"],                     clue_statement: "I would like to go to Paris on vacation.",    hint_en: "I would like to go to...", hint_vi: "Tôi muốn đi..." },
    { question_en: "What will you do after you finish school?",     answer: ["I will go to university to study science"],        clue_statement: "After school, I will go to university to study science.", hint_en: "I will go to...",  hint_vi: "Sau khi học xong, tôi sẽ..." },
    { question_en: "What is your goal for this year?",              answer: ["My goal is to read 10 books this year"],           clue_statement: "My goal is to read 10 books this year.",     hint_en: "My goal is to...",        hint_vi: "Mục tiêu của tôi là..." },
    // Feelings & challenges
    { question_en: "How do you feel when you make a mistake?",      answer: ["I feel a little sad but I try again"],             clue_statement: "When I make a mistake, I feel a little sad but I try again.", hint_en: "I feel...", hint_vi: "Tôi cảm thấy..." },
    { question_en: "What do you do when you feel stressed?",        answer: ["I listen to music or take a walk"],                clue_statement: "When I feel stressed, I listen to music.",    hint_en: "I listen to...",          hint_vi: "Tôi nghe nhạc..." },
    { question_en: "What is the biggest challenge in your life?",   answer: ["The biggest challenge is managing my time"],       clue_statement: "The biggest challenge in my life is managing my time.", hint_en: "The biggest challenge is...", hint_vi: "Thách thức lớn nhất là..." },
    // Technology & media
    { question_en: "How much time do you spend on your phone?",     answer: ["I spend about one hour on my phone each day"],     clue_statement: "I spend about one hour on my phone each day.", hint_en: "I spend about...",       hint_vi: "Tôi dùng điện thoại..." },
    { question_en: "What apps do you use most often?",              answer: ["I use learning apps and messaging apps most often"], clue_statement: "I use learning apps and messaging apps most often.", hint_en: "I use... most often.", hint_vi: "Tôi hay dùng..." },
    { question_en: "Do you think social media is good or bad?",     answer: ["I think social media can be good and bad"],        clue_statement: "I think social media can be good and bad.",   hint_en: "I think social media...", hint_vi: "Tôi nghĩ mạng xã hội..." },
    // Learning & school life
    { question_en: "How many hours do you study every day?",        answer: ["I study for about two hours every day"],           clue_statement: "I study for about two hours every day.",      hint_en: "I study for...",          hint_vi: "Tôi học khoảng..." },
    { question_en: "What is the best way to learn a new language?", answer: ["The best way is to practice every day"],           clue_statement: "The best way to learn a language is to practice every day.", hint_en: "The best way is...", hint_vi: "Cách tốt nhất là..." },
    { question_en: "What do you do when you don't understand something?", answer: ["I ask my teacher or look it up online"],   clue_statement: "When I don't understand, I ask my teacher.",  hint_en: "I ask my teacher...",     hint_vi: "Tôi hỏi giáo viên..." },
    // Culture & traditions
    { question_en: "What traditional food do you eat during Tet?",  answer: ["We eat banh chung and mut during Tet"],           clue_statement: "During Tet, we eat banh chung and mut.",     hint_en: "During Tet, we eat...",   hint_vi: "Vào dịp Tết, chúng tôi ăn..." },
    { question_en: "What is your favorite Vietnamese holiday?",      answer: ["My favorite holiday is Tet because we visit family"], clue_statement: "My favorite holiday is Tet because we visit family.", hint_en: "My favorite holiday is...", hint_vi: "Ngày lễ yêu thích của tôi là..." },
  ],
};

export default personalQuestions;
