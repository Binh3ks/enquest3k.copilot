import fs from 'fs';
import path from 'path';

const root = process.cwd();

// W34 Data: Lion and Mouse
const w34Dir = path.join(root, 'src/data/weeks/week_34');
if (!fs.existsSync(w34Dir)) fs.mkdirSync(w34Dir, { recursive: true });

fs.writeFileSync(path.join(w34Dir, 'read.js'), `// Week 34 — The Lion and the Mouse (Syllabus Restoration)
export const readData = {
  week: 34,
  title: "The Lion and the Mouse",
  text_en: "One sunny afternoon, a huge lion was sleeping under a tree. A tiny mouse accidentally ran across his paw. The lion woke up angrily and caught the mouse in his big paw. 'Please don't eat me!' roared the mouse. 'If you let me go, I will help you one day.' The lion laughed out loud because a tiny mouse could never help a huge lion. But he let the mouse go happily. A few days later, hunters trapped the lion in a strong rope net. The lion roared loudly for help. The tiny mouse heard the roar and rushed to help his friend. The mouse chewed the net with his sharp teeth until the ropes broke. The lion was freed and thanked the mouse. They became best friends forever.",
  text_vi: "Một buổi chiều nắng đẹp, một chú sư tử to lớn đang ngủ dưới gốc cây. Một chú chuột nhỏ bé vô tình chạy qua chân sư tử. Sư tử tức giận thức giấc và bắt lấy chú chuột trong bàn tay to lớn. 'Xin đừng ăn thịt tôi!' chú chuột gầm nhẹ. 'Nếu anh thả tôi đi, tôi sẽ giúp anh một ngày nào đó.' Sư tử cười lớn vì một chú chuột nhỏ bé không bao giờ có thể giúp một chú sư tử khổng lồ. Nhưng chú sư tử đã vui vẻ thả chú chuột đi. Vài ngày sau, thợ săn sập bẫy bắt được sư tử trong một tấm lưới thừng chắc chắn. Sư tử gầm lớn kêu cứu. Chú chuột nhỏ bé nghe thấy tiếng gầm và vội vã đến giúp bạn. Chú chuột cắn đứt tấm lưới bằng hàm răng sắc nhọn cho đến khi dây thừng đứt. Sư tử được giải thoát và cảm ơn chú chuột. Họ trở thành bạn thân mãi mãi.",
  interactive_story: {
    title: "Interactive Story: The Lion and the Mouse",
    gaps: [
      { id: 1, target: "caught the mouse" },
      { id: 2, target: "roared the mouse" },
      { id: 3, target: "trapped the lion in a strong net" },
      { id: 4, target: "chewed the net" },
      { id: 5, target: "thanked the mouse" }
    ],
    word_bank: ["caught the mouse", "roared the mouse", "trapped the lion in a strong net", "chewed the net", "thanked the mouse"]
  }
};
export default readData;
`, 'utf8');

fs.writeFileSync(path.join(w34Dir, 'vocab.js'), `// Week 34 Vocab — The Lion and the Mouse
export const vocab = [
  { id: 1, word: "lion", definition_en: "A large wild cat with golden fur", definition_vi: "con sư tử" },
  { id: 2, word: "mouse", definition_en: "A small rodent with a long tail", definition_vi: "con chuột" },
  { id: 3, word: "net", definition_en: "A meshed fabric used to trap animals", definition_vi: "tấm lưới" },
  { id: 4, word: "trap", definition_en: "A device used to catch animals", definition_vi: "bẫy" },
  { id: 5, word: "roar", definition_en: "To make a loud deep sound", definition_vi: "tiếng gầm, gầm lớn" },
  { id: 6, word: "help", definition_en: "To assist someone in need", definition_vi: "giúp đỡ" },
  { id: 7, word: "friend", definition_en: "A person or animal you like and trust", definition_vi: "bạn bè" },
  { id: 8, word: "tiny", definition_en: "Very small in size", definition_vi: "tí hon, nhỏ bé" },
  { id: 9, word: "huge", definition_en: "Very large in size", definition_vi: "to lớn, khổng lồ" },
  { id: 10, word: "caught", definition_en: "Captured something (past of catch)", definition_vi: "đã bắt" },
  { id: 11, word: "freed", definition_en: "Set something free from a trap", definition_vi: "đã giải thoát" },
  { id: 12, word: "chewed", definition_en: "Bitten repeatedly with teeth", definition_vi: "đã gặm, cắn" },
  { id: 13, word: "hunter", definition_en: "A person who tracks and catches wild animals", definition_vi: "thợ săn" },
  { id: 14, word: "sharp", definition_en: "Having a fine edge that can cut", definition_vi: "sắc nhọn" },
  { id: 15, word: "rope", definition_en: "Strong thick cord", definition_vi: "dây thừng" },
  { id: 16, word: "laugh", definition_en: "To make sounds showing happiness", definition_vi: "cười" },
  { id: 17, word: "promise", definition_en: "To say you will definitely do something", definition_vi: "hứa" },
  { id: 18, word: "grace", definition_en: "Kindness and mercy", definition_vi: "lòng nhân từ" },
  { id: 19, word: "fable", definition_en: "A short story teaching a moral lesson", definition_vi: "truyện ngụ ngôn" },
  { id: 20, word: "grateful", definition_en: "Feeling or showing thanks", definition_vi: "biết ơn" }
];
export default vocab;
`, 'utf8');


// W35 Data: The Best Day Ever
const w35Dir = path.join(root, 'src/data/weeks/week_35');
if (!fs.existsSync(w35Dir)) fs.mkdirSync(w35Dir, { recursive: true });

fs.writeFileSync(path.join(w35Dir, 'read.js'), `// Week 35 — The Best Day Ever (Syllabus Restoration)
export const readData = {
  week: 35,
  title: "The Best Day Ever",
  text_en: "Last Saturday was the most wonderful day of my summer holiday. In the morning, the weather was sunny and warm. My family visited a beautiful amusement park near the blue ocean. First, we rode a thrilling roller coaster that went super fast! Then, we ate delicious chocolate ice cream near the fountain. In the afternoon, we played joyful beach games on the soft golden sand. My brother and I built an awesome sandcastle with big towers. At night, we watched a bright fireworks show in the clear sky. I felt extremely happy and grateful for such a memorable personal recount with my family.",
  text_vi: "Thứ Bảy tuần trước là ngày tuyệt vời nhất trong kỳ nghỉ hè của tôi. Vào buổi sáng, thời tiết nắng ấm. Gia đình tôi đã đi thăm một công viên giải trí tuyệt đẹp gần bờ biển xanh. Đầu tiên, chúng tôi đi tàu siêu tốc giật gân chạy cực nhanh! Sau đó, chúng tôi ăn kem sô-cô-la thơm ngon gần đài phun nước. Vào buổi chiều, chúng tôi chơi các trò chơi bãi biển vui vẻ trên bãi cát vàng mềm mại. Anh trai và tôi đã xây một lâu đài cát tuyệt vời với những ngọn tháp lớn. Vào ban đêm, chúng tôi ngắm màn bắn pháo hoa rực rỡ trên bầu trời trong lành. Tôi cảm thấy cực kỳ hạnh phúc và biết ơn vì một kỷ niệm cá nhân đáng nhớ như vậy với gia đình.",
  interactive_story: {
    title: "Interactive Story: The Best Day Ever",
    gaps: [
      { id: 1, target: "most wonderful day" },
      { id: 2, target: "visited a beautiful park" },
      { id: 3, target: "ate delicious ice cream" },
      { id: 4, target: "built an awesome sandcastle" },
      { id: 5, target: "watched a bright fireworks show" }
    ],
    word_bank: ["most wonderful day", "visited a beautiful park", "ate delicious ice cream", "built an awesome sandcastle", "watched a bright fireworks show"]
  }
};
export default readData;
`, 'utf8');

fs.writeFileSync(path.join(w35Dir, 'vocab.js'), `// Week 35 Vocab — The Best Day Ever
export const vocab = [
  { id: 1, word: "wonderful", definition_en: "Extremely good or impressive", definition_vi: "tuyệt vời" },
  { id: 2, word: "exciting", definition_en: "Causing great enthusiasm and eagerness", definition_vi: "hào hứng" },
  { id: 3, word: "sunny", definition_en: "Bright with sunlight", definition_vi: "nắng đẹp" },
  { id: 4, word: "memorable", definition_en: "Easily remembered because of being special", definition_vi: "đáng nhớ" },
  { id: 5, word: "joyful", definition_en: "Full of happiness and joy", definition_vi: "vui sướng" },
  { id: 6, word: "delicious", definition_en: "Highly pleasing to taste", definition_vi: "thơm ngon" },
  { id: 7, word: "awesome", definition_en: "Extremely impressive or daunting", definition_vi: "tuyệt diệu" },
  { id: 8, word: "thrilling", definition_en: "Causing a sudden feeling of excitement", definition_vi: "kịch tính" },
  { id: 9, word: "peaceful", definition_en: "Free from disturbance; tranquil", definition_vi: "thanh bình" },
  { id: 10, word: "happy", definition_en: "Feeling pleasure or contentment", definition_vi: "hạnh phúc" },
  { id: 11, word: "remember", definition_en: "To bring to mind past events", definition_vi: "ghi nhớ" },
  { id: 12, word: "enjoyed", definition_en: "Took pleasure in an activity", definition_vi: "thích thú" },
  { id: 13, word: "visited", definition_en: "Went to see a place or person", definition_vi: "đã ghé thăm" },
  { id: 14, word: "celebrated", definition_en: "Marked an occasion with festivities", definition_vi: "đã kỷ niệm" },
  { id: 15, word: "played", definition_en: "Engaged in games or recreation", definition_vi: "đã chơi" },
  { id: 16, word: "shared", definition_en: "Distributed or used together", definition_vi: "đã chia sẻ" },
  { id: 17, word: "recount", definition_en: "A narration of past events", definition_vi: "kể lại kỷ niệm" },
  { id: 18, word: "amusement", definition_en: "Entertainment and fun", definition_vi: "giải trí" },
  { id: 19, word: "sandcastle", definition_en: "A model castle made of sand", definition_vi: "lâu đài cát" },
  { id: 20, word: "fireworks", definition_en: "Explosive devices producing bright light show", definition_vi: "pháo hoa" }
];
export default vocab;
`, 'utf8');


// W36 Data: My Adventure Book
const w36Dir = path.join(root, 'src/data/weeks/week_36');
if (!fs.existsSync(w36Dir)) fs.mkdirSync(w36Dir, { recursive: true });

fs.writeFileSync(path.join(w36Dir, 'read.js'), `// Week 36 — My Adventure Book (Syllabus Restoration)
export const readData = {
  week: 36,
  title: "My Adventure Book",
  text_en: "Welcome to Project 3: My Adventure Book! In this special project, young authors write and illustrate their own trip stories using past irregular verbs. Last month, Leo wrote his adventure book about a hidden island. In Chapter One, Leo **went** to a mysterious bay by boat. He **saw** a colorful parrot on a tall coconut tree and **found** an ancient treasure map under a mossy rock. In Chapter Two, he **took** out his wooden compass and **made** his way across the dense green jungle. He **had** a wonderful picnic near a roaring waterfall. At the end of his adventure, Leo **wrote** five thrilling chapters and drew beautiful colorful illustrations. Every student created their own adventure book to share with the class!",
  text_vi: "Chào mừng đến với Dự án 3: Sách Phiêu lưu của em! Trong dự án đặc biệt này, các tác giả nhỏ tuổi viết và vẽ minh họa cho câu chuyện chuyến đi của riêng mình bằng cách sử dụng các động từ bất quy tắc quá khứ. Tháng trước, Leo đã viết cuốn sách phiêu lưu của mình về một hòn đảo ẩn giấu. Trong Chương Một, Leo đi đến một vịnh bí ẩn bằng thuyền. Cậu ấy thấy một con vẹt sặc sỡ trên cây dừa cao và tìm thấy một bản đồ kho báu cổ xưa dưới một tảng đá phủ rêu. Trong Chương Hai, cậu ấy lấy ra chiếc la bàn bằng gỗ và mở đường đi qua khu rừng rậm xanh tươi. Cậu ấy đã có một buổi dã ngoại tuyệt vời gần thác nước reo vang. Cuối chuyến phiêu lưu, Leo đã viết năm chương kịch tính và vẽ những bức tranh minh họa đầy màu sắc tuyệt đẹp. Mỗi học sinh đều tự tạo cuốn sách phiêu lưu của riêng mình để chia sẻ với cả lớp!",
  interactive_story: {
    title: "Interactive Story: My Adventure Book",
    gaps: [
      { id: 1, target: "went to a mysterious bay" },
      { id: 2, target: "saw a colorful parrot" },
      { id: 3, target: "found an ancient treasure map" },
      { id: 4, target: "took out his compass" },
      { id: 5, target: "made his way across jungle" }
    ],
    word_bank: ["went to a mysterious bay", "saw a colorful parrot", "found an ancient treasure map", "took out his compass", "made his way across jungle"]
  }
};
export default readData;
`, 'utf8');

fs.writeFileSync(path.join(w36Dir, 'vocab.js'), `// Week 36 Vocab — My Adventure Book
export const vocab = [
  { id: 1, word: "adventure", definition_en: "An exciting or daring experience", definition_vi: "chuyến phiêu lưu" },
  { id: 2, word: "journey", definition_en: "An act of traveling from one place to another", definition_vi: "hành trình" },
  { id: 3, word: "explore", definition_en: "To travel through an unfamiliar area to learn about it", definition_vi: "khám phá" },
  { id: 4, word: "path", definition_en: "A track laid down for walking", definition_vi: "con đường nhỏ" },
  { id: 5, word: "forest", definition_en: "A large area covered chiefly with trees", definition_vi: "Khu rừng" },
  { id: 6, word: "mountain", definition_en: "A large natural elevation of the earth's surface", definition_vi: "ngọn núi" },
  { id: 7, word: "island", definition_en: "A piece of land surrounded by water", definition_vi: "hòn đảo" },
  { id: 8, word: "map", definition_en: "A diagrammatic representation of an area", definition_vi: "bản đồ" },
  { id: 9, word: "compass", definition_en: "An instrument for determining directions", definition_vi: "la bàn" },
  { id: 10, word: "treasure", definition_en: "A quantity of precious metals or valuable objects", definition_vi: "kho báu" },
  { id: 11, word: "discovered", definition_en: "Found unexpectedly during a search", definition_vi: "đã phát hiện" },
  { id: 12, word: "travelled", definition_en: "Went from one place to another", definition_vi: "đã du lịch" },
  { id: 13, word: "climbed", definition_en: "Went up a steep slope or mountain", definition_vi: "đã leo" },
  { id: 14, word: "crossed", definition_en: "Passed from one side of a river or path to another", definition_vi: "đã băng qua" },
  { id: 15, word: "reached", definition_en: "Arrived at a destination", definition_vi: "đã tới nơi" },
  { id: 16, word: "returned", definition_en: "Came back to a place", definition_vi: "đã trở về" },
  { id: 17, word: "memory", definition_en: "Something remembered from the past", definition_vi: "kỷ niệm" },
  { id: 18, word: "illustration", definition_en: "A picture illustrating a book or story", definition_vi: "hình minh họa" },
  { id: 19, word: "author", definition_en: "A writer of a book or story", definition_vi: "tác giả" },
  { id: 20, word: "chapter", definition_en: "A main division of a book", definition_vi: "chương sách" }
];
export default vocab;
`, 'utf8');


// W37 Data: Living vs Non-Living (CLIL Unit 6)
const w37Dir = path.join(root, 'src/data/weeks/week_37');
if (!fs.existsSync(w37Dir)) fs.mkdirSync(w37Dir, { recursive: true });

fs.writeFileSync(path.join(w37Dir, 'read.js'), `// Week 37 — Living vs. Non-Living (Syllabus Restoration)
export const readData = {
  week: 37,
  title: "Living vs. Non-Living",
  text_en: "Welcome to CLIL Unit 6: Nature's Rules! Today, young scientists investigate clues in nature to classify living and non-living things. A puppy is a living thing because it breathes fresh air, grows bigger every day, and needs food and water to survive. A green tree is also living because it grows towards sunlight and absorbs water from the soil. In contrast, a grey rock is non-living because it does not breathe, grow, or eat food. A plastic toy car is non-living because it cannot move by itself or reproduce. We use scientific reasoning with 'because' to explain natural rules: an organism is living because it carries out vital life processes!",
  text_vi: "Chào mừng đến với CLIL Đơn vị 6: Quy luật Tự nhiên! Hôm nay, các nhà khoa học nhí điều tra các manh mối trong tự nhiên để phân loại vật sống và vật không sống. Chú chó con là một vật sống vì nó thở không khí trong lành, lớn lên mỗi ngày và cần thức ăn và nước uống để tồn tại. Cây xanh cũng là vật sống vì nó lớn lên hướng về ánh nắng mặt trời và hấp thụ nước từ đất. Ngược lại, một tảng đá xám là vật không sống vì nó không thở, không lớn lên hay ăn thức ăn. Một chiếc ô tô đồ chơi bằng nhựa là vật không sống vì nó không thể tự di chuyển hoặc sinh sản. Chúng ta sử dụng lý luận khoa học với 'vì' để giải thích các quy luật tự nhiên: một sinh vật là vật sống vì nó thực hiện các quá trình sống thiết yếu!",
  interactive_story: {
    title: "Interactive Story: Living vs. Non-Living",
    gaps: [
      { id: 1, target: "puppy is a living thing" },
      { id: 2, target: "breathes fresh air and grows" },
      { id: 3, target: "needs food and water" },
      { id: 4, target: "rock is non-living" },
      { id: 5, target: "plastic car cannot move" }
    ],
    word_bank: ["puppy is a living thing", "breathes fresh air and grows", "needs food and water", "rock is non-living", "plastic car cannot move"]
  }
};
export default readData;
`, 'utf8');

fs.writeFileSync(path.join(w37Dir, 'vocab.js'), `// Week 37 Vocab — Living vs. Non-Living
export const vocab = [
  { id: 1, word: "living", definition_en: "Having life; alive and active", definition_vi: "vật sống" },
  { id: 2, word: "non-living", definition_en: "Not alive; matter that does not grow or breathe", definition_vi: "vật không sống" },
  { id: 3, word: "breathe", definition_en: "To take air into the lungs and expel it", definition_vi: "thở, hít thở" },
  { id: 4, word: "grow", definition_en: "To increase in size and develop", definition_vi: "lớn lên, phát triển" },
  { id: 5, word: "need", definition_en: "To require something essential for life", definition_vi: "cần thiết" },
  { id: 6, word: "food", definition_en: "Substance consumed to provide nutritional support", definition_vi: "thức ăn" },
  { id: 7, word: "water", definition_en: "Essential clear liquid necessary for life", definition_vi: "nước uống" },
  { id: 8, word: "rock", definition_en: "Solid mineral material forming part of the earth", definition_vi: "tảng đá" },
  { id: 9, word: "plastic", definition_en: "Synthetic non-living material", definition_vi: "chất nhựa" },
  { id: 10, word: "reproduce", definition_en: "To produce offspring or new organisms", definition_vi: "sinh sản" },
  { id: 11, word: "organism", definition_en: "An individual living creature", definition_vi: "sinh vật" },
  { id: 12, word: "energy", definition_en: "Power derived from food or sunlight", definition_vi: "năng lượng" },
  { id: 13, word: "survive", definition_en: "To continue to live or exist", definition_vi: "tồn tại, sống sót" },
  { id: 14, word: "air", definition_en: "The invisible gaseous substance surrounding the earth", definition_vi: "không khí" },
  { id: 15, word: "sunlight", definition_en: "Light from the sun essential for plants", definition_vi: "ánh nắng mặt trời" },
  { id: 16, word: "plant", definition_en: "A living organism such as a tree or flower", definition_vi: "thực vật, cây xanh" },
  { id: 17, word: "animal", definition_en: "A living organism that feeds on organic matter", definition_vi: "động vật" },
  { id: 18, word: "object", definition_en: "A material thing that can be seen and touched", definition_vi: "vật thể" },
  { id: 19, word: "environment", definition_en: "The surroundings in which a living thing lives", definition_vi: "môi trường" },
  { id: 20, word: "natural", definition_en: "Existing in or caused by nature", definition_vi: "tự nhiên" }
];
export default vocab;
`, 'utf8');

console.log('🚀 Faithfully rebuilt W34, W35, W36, W37 from original 156-week Syllabus!');
