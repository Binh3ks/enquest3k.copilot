import fs from 'fs';
import path from 'path';

const root = process.cwd();

const w34RealData = {
  weekId: 34,
  title: "The Lion and the Mouse — Fables & Moral",
  title_vi: "Con Sư Tử và Con Chuột — Truyện Ngụ Ngôn",
  target_vocab: [
    { word: "lion", definition_en: "A large wild cat with golden fur", definition_vi: "con sư tử", example: "The huge lion slept under the tree.", ipa: "/ˈlaɪ.ən/" },
    { word: "mouse", definition_en: "A small rodent with a long tail", definition_vi: "con chuột", example: "The tiny mouse ran across his paw.", ipa: "/maʊs/" },
    { word: "net", definition_en: "A meshed fabric used to trap animals", definition_vi: "tấm lưới", example: "Hunters trapped the lion in a net.", ipa: "/net/" },
    { word: "trap", definition_en: "A device used to catch animals", definition_vi: "bẫy", example: "The net trap was made of strong ropes.", ipa: "/træp/" },
    { word: "roar", definition_en: "To make a loud deep sound", definition_vi: "tiếng gầm, gầm lớn", example: "'Please don't eat me!' roared the mouse.", ipa: "/rɔːr/" },
    { word: "help", definition_en: "To assist someone in need", definition_vi: "giúp đỡ", example: "The mouse rushed to help his friend.", ipa: "/help/" },
    { word: "friend", definition_en: "A person or animal you like and trust", definition_vi: "bạn bè", example: "They became best friends forever.", ipa: "/frend/" },
    { word: "tiny", definition_en: "Very small in size", definition_vi: "tí hon, nhỏ bé", example: "A tiny mouse can help a big lion.", ipa: "/ˈtaɪ.ni/" },
    { word: "huge", definition_en: "Very large in size", definition_vi: "to lớn, khổng lồ", example: "The lion had a huge paw.", ipa: "/hjuːdʒ/" },
    { word: "caught", definition_en: "Captured something (past of catch)", definition_vi: "đã bắt", example: "The lion caught the mouse angrily.", ipa: "/kɔːt/" },
    { word: "freed", definition_en: "Set something free from a trap", definition_vi: "đã giải thoát", example: "The lion was freed from the net.", ipa: "/friːd/" },
    { word: "chewed", definition_en: "Bitten repeatedly with teeth", definition_vi: "đã gặm, cắn", example: "The mouse chewed the strong ropes.", ipa: "/tʃuːd/" },
    { word: "hunter", definition_en: "A person who tracks and catches wild animals", definition_vi: "thợ săn", example: "Hunters set a trap in the forest.", ipa: "/ˈhʌn.tər/" },
    { word: "sharp", definition_en: "Having a fine edge that can cut", definition_vi: "sắc nhọn", example: "He used his sharp teeth to chew ropes.", ipa: "/ʃɑːp/" },
    { word: "rope", definition_en: "Strong thick cord", definition_vi: "dây thừng", example: "The ropes of the net broke.", ipa: "/rəʊp/" },
    { word: "laugh", definition_en: "To make sounds showing happiness", definition_vi: "cười", example: "The lion laughed out loud.", ipa: "/lɑːf/" },
    { word: "promise", definition_en: "To say you will definitely do something", definition_vi: "hứa", example: "The mouse promised to help him.", ipa: "/ˈprɒm.ɪs/" },
    { word: "grace", definition_en: "Kindness and mercy", definition_vi: "lòng nhân từ", example: "The lion showed grace to the mouse.", ipa: "/ɡreɪs/" },
    { word: "fable", definition_en: "A short story teaching a moral lesson", definition_vi: "truyện ngụ ngôn", example: "Aesop wrote the lion and mouse fable.", ipa: "/ˈfeɪ.bəl/" },
    { word: "grateful", definition_en: "Feeling or showing thanks", definition_vi: "biết ơn", example: "The lion was grateful to the mouse.", ipa: "/ˈɡreɪt.fəl/" }
  ],
  story_missions: [
    { mission_id: 1, title: "Retell the Fable", mission_context: "Retell how the tiny mouse helped the huge lion escape the net." },
    { mission_id: 2, title: "Moral Lesson", mission_context: "Explain why even tiny friends can be a big help." },
    { mission_id: 3, title: "Helping a Friend", mission_context: "Describe a time when you helped a friend in trouble." }
  ],
  spark_talk: [
    { topic_en: "Helping Small Friends", topic_vi: "Giúp đỡ bạn nhỏ", cards: ["How did the mouse help the lion?", "Why did the lion laugh at first?"] },
    { topic_en: "Fable Moral", topic_vi: "Bài học ngụ ngôn", cards: ["What lesson does this fable teach us?", "Have you ever helped someone bigger?"] }
  ],
  sentences: [
    "One sunny afternoon, a huge lion was sleeping under a tree.",
    "A tiny mouse accidentally ran across his paw.",
    "The lion woke up angrily and caught the mouse.",
    "The tiny mouse chewed the net with his sharp teeth.",
    "The lion was freed and thanked the mouse warmly."
  ]
};

const w35RealData = {
  weekId: 35,
  title: "The Best Day Ever — Personal Recount",
  title_vi: "Ngày Tuyệt Vời Nhất — Kể Lại Kỷ Niệm Cá Nhân",
  target_vocab: [
    { word: "wonderful", definition_en: "Extremely good or impressive", definition_vi: "tuyệt vời", example: "Last Saturday was a wonderful day.", ipa: "/ˈwʌn.də.fəl/" },
    { word: "exciting", definition_en: "Causing great enthusiasm and eagerness", definition_vi: "hào hứng", example: "We rode an exciting roller coaster.", ipa: "/ɪkˈsaɪ.tɪŋ/" },
    { word: "sunny", definition_en: "Bright with sunlight", definition_vi: "nắng đẹp", example: "The weather was warm and sunny.", ipa: "/ˈsʌn.i/" },
    { word: "memorable", definition_en: "Easily remembered because of being special", definition_vi: "đáng nhớ", example: "It was a memorable personal recount.", ipa: "/ˈmem.ər.ə.bəl/" },
    { word: "joyful", definition_en: "Full of happiness and joy", definition_vi: "vui sướng", example: "We played joyful beach games.", ipa: "/ˈdʒɔɪ.fəl/" },
    { word: "delicious", definition_en: "Highly pleasing to taste", definition_vi: "thơm ngon", example: "We ate delicious chocolate ice cream.", ipa: "/dɪˈlɪʃ.əs/" },
    { word: "awesome", definition_en: "Extremely impressive or daunting", definition_vi: "tuyệt diệu", example: "We built an awesome sandcastle.", ipa: "/ˈɔː.səm/" },
    { word: "thrilling", definition_en: "Causing a sudden feeling of excitement", definition_vi: "kịch tính", example: "The coaster ride was thrilling.", ipa: "/ˈθrɪl.ɪŋ/" },
    { word: "peaceful", definition_en: "Free from disturbance; tranquil", definition_vi: "thanh bình", example: "The sunset ocean was peaceful.", ipa: "/ˈpiːs.fəl/" },
    { word: "happy", definition_en: "Feeling pleasure or contentment", definition_vi: "hạnh phúc", example: "I felt happy with my family.", ipa: "/ˈhæp.i/" },
    { word: "remember", definition_en: "To bring to mind past events", definition_vi: "ghi nhớ", example: "I will always remember this best day.", ipa: "/rɪˈmem.bər/" },
    { word: "enjoyed", definition_en: "Took pleasure in an activity", definition_vi: "thích thú", example: "We enjoyed every single minute.", ipa: "/ɪnˈdʒɔɪd/" },
    { word: "visited", definition_en: "Went to see a place or person", definition_vi: "đã ghé thăm", example: "We visited an amusement park.", ipa: "/ˈvɪz.ɪ.tɪd/" },
    { word: "celebrated", definition_en: "Marked an occasion with festivities", definition_vi: "đã kỷ niệm", example: "We celebrated my birthday at the beach.", ipa: "/ˈsel.ə.breɪ.tɪd/" },
    { word: "played", definition_en: "Engaged in games or recreation", definition_vi: "đã chơi", example: "We played on the golden sand.", ipa: "/pleɪd/" },
    { word: "shared", definition_en: "Distributed or used together", definition_vi: "đã chia sẻ", example: "We shared sweet ice cream.", ipa: "/ʃeəd/" },
    { word: "recount", definition_en: "A narration of past events", definition_vi: "kể lại kỷ niệm", example: "Write a short personal recount.", ipa: "/rɪˈkaʊnt/" },
    { word: "amusement", definition_en: "Entertainment and fun", definition_vi: "giải trí", example: "The amusement park was full of lights.", ipa: "/əˈmjuːz.mənt/" },
    { word: "sandcastle", definition_en: "A model castle made of sand", definition_vi: "lâu đài cát", example: "We built a big sandcastle.", ipa: "/ˈsændˌkɑː.səl/" },
    { word: "fireworks", definition_en: "Explosive devices producing bright light show", definition_vi: "pháo hoa", example: "We watched bright fireworks.", ipa: "/ˈfaɪə.wɜːks/" }
  ],
  story_missions: [
    { mission_id: 1, title: "My Best Day Ever", mission_context: "Recount what made your special holiday day so wonderful." },
    { mission_id: 2, title: "Using Adjectives", mission_context: "Use descriptive adjectives to describe the park, food, and fireworks." },
    { mission_id: 3, title: "Personal Memory", mission_context: "Write a short 5-6 sentence recount of your happiest day." }
  ],
  spark_talk: [
    { topic_en: "Best Holiday Memory", topic_vi: "Kỷ niệm ngày nghỉ tuyệt nhất", cards: ["Where did you go on your best day?", "What delicious food did you eat?"] },
    { topic_en: "Describing Feelings", topic_vi: "Miêu tả cảm xúc", cards: ["Why was this day memorable to you?", "Who was with you?"] }
  ],
  sentences: [
    "Last Saturday was the most wonderful day of my summer holiday.",
    "In the morning, the weather was sunny and warm.",
    "My family visited a beautiful amusement park near the ocean.",
    "We built an awesome sandcastle with big towers.",
    "At night, we watched a bright fireworks show in the sky."
  ]
};

const w36RealData = {
  weekId: 36,
  title: "My Adventure Book — Project 3 & Irregular Verbs Review",
  title_vi: "Sách Phiêu Lưu Của Em — Dự Án 3 & Ôn Tập Động Từ Bất Quy Tắc",
  target_vocab: [
    { word: "adventure", definition_en: "An exciting or daring experience", definition_vi: "chuyến phiêu lưu", example: "Leo wrote an adventure book.", ipa: "/ədˈven.tʃər/" },
    { word: "journey", definition_en: "An act of traveling from one place to another", definition_vi: "hành trình", example: "His journey took him across the sea.", ipa: "/ˈdʒɜː.ni/" },
    { word: "explore", definition_en: "To travel through an unfamiliar area to learn about it", definition_vi: "khám phá", example: "He explored a mysterious island.", ipa: "/ɪkˈsplɔːr/" },
    { word: "path", definition_en: "A track laid down for walking", definition_vi: "con đường nhỏ", example: "Follow the path through the dense forest.", ipa: "/pɑːθ/" },
    { word: "forest", definition_en: "A large area covered chiefly with trees", definition_vi: "Khu rừng", example: "The green forest was full of birds.", ipa: "/ˈfɒr.ɪst/" },
    { word: "mountain", definition_en: "A large natural elevation of the earth's surface", definition_vi: "ngọn núi", example: "They climbed the high mountain.", ipa: "/ˈmaʊn.tɪn/" },
    { word: "island", definition_en: "A piece of land surrounded by water", definition_vi: "hòn đảo", example: "The hidden island had secret caves.", ipa: "/ˈaɪ.lənd/" },
    { word: "map", definition_en: "A diagrammatic representation of an area", definition_vi: "bản đồ", example: "He found an ancient treasure map.", ipa: "/mæp/" },
    { word: "compass", definition_en: "An instrument for determining directions", definition_vi: "la bàn", example: "He used his compass to find north.", ipa: "/ˈkʌm.pəs/" },
    { word: "treasure", definition_en: "A quantity of precious metals or valuable objects", definition_vi: "kho báu", example: "The treasure map showed an X mark.", ipa: "/ˈtreʒ.ər/" },
    { word: "discovered", definition_en: "Found unexpectedly during a search", definition_vi: "đã phát hiện", example: "He discovered a wooden chest.", ipa: "/dɪˈskʌv.əd/" },
    { word: "travelled", definition_en: "Went from one place to another", definition_vi: "đã du lịch", example: "Leo travelled by boat.", ipa: "/ˈtræv.əld/" },
    { word: "climbed", definition_en: "Went up a steep slope or mountain", definition_vi: "đã leo", example: "He climbed up the mossy rock.", ipa: "/klaɪmd/" },
    { word: "crossed", definition_en: "Passed from one side of a river or path to another", definition_vi: "đã băng qua", example: "He crossed the roaring river.", ipa: "/krɒst/" },
    { word: "reached", definition_en: "Arrived at a destination", definition_vi: "đã tới nơi", example: "He reached the waterfall.", ipa: "/riːtʃt/" },
    { word: "returned", definition_en: "Came back to a place", definition_vi: "đã trở về", example: "He returned home safely.", ipa: "/rɪˈtɜːnd/" },
    { word: "memory", definition_en: "Something remembered from the past", definition_vi: "kỷ niệm", example: "Writing a book creates a great memory.", ipa: "/ˈmem.ər.i/" },
    { word: "illustration", definition_en: "A picture illustrating a book or story", definition_vi: "hình minh họa", example: "He drew colorful illustrations.", ipa: "/ˌɪl.əˈstreɪ.ʃən/" },
    { word: "author", definition_en: "A writer of a book or story", definition_vi: "tác giả", example: "Every student became a book author.", ipa: "/ˈɔː.θər/" },
    { word: "chapter", definition_en: "A main division of a book", definition_vi: "chương sách", example: "Chapter One describes the island.", ipa: "/ˈtʃæp.tər/" }
  ],
  story_missions: [
    { mission_id: 1, title: "My Adventure Story", mission_context: "Retell Leo's adventure book story using past irregular verbs (went, saw, found, took, made)." },
    { mission_id: 2, title: "Creating Project 3", mission_context: "Explain how you illustrated and wrote your own adventure book chapters." },
    { mission_id: 3, title: "Author Presentation", mission_context: "Present your completed adventure book project to the class." }
  ],
  spark_talk: [
    { topic_en: "Adventure Book Writing", topic_vi: "Viết sách phiêu lưu", cards: ["What irregular verbs did you use in Chapter 1?", "Where does your adventure story take place?"] },
    { topic_en: "Illustrating Stories", topic_vi: "Vẽ minh họa câu chuyện", cards: ["What picture did you draw for Chapter 2?", "Who is the main author of your book?"] }
  ],
  sentences: [
    "Welcome to Project 3: My Adventure Book!",
    "Leo went to a mysterious bay by boat.",
    "He saw a colorful parrot and found an ancient treasure map.",
    "He took out his compass and made his way across the jungle.",
    "Leo wrote five thrilling chapters and drew beautiful illustrations."
  ]
};

const w37RealData = {
  weekId: 37,
  title: "Living vs. Non-Living — CLIL Unit 6 Nature's Rules",
  title_vi: "Vật Sống & Không Sống — Quy Luật Tự Nhiên CLIL Unit 6",
  target_vocab: [
    { word: "living", definition_en: "Having life; alive and active", definition_vi: "vật sống", example: "A puppy is a living organism.", ipa: "/ˈlɪv.ɪŋ/" },
    { word: "non-living", definition_en: "Not alive; matter that does not grow or breathe", definition_vi: "vật không sống", example: "A grey rock is a non-living object.", ipa: "/nɒnˈlɪv.ɪŋ/" },
    { word: "breathe", definition_en: "To take air into the lungs and expel it", definition_vi: "thở, hít thở", example: "Living animals breathe fresh air.", ipa: "/briːð/" },
    { word: "grow", definition_en: "To increase in size and develop", definition_vi: "lớn lên, phát triển", example: "Trees grow bigger with sunlight.", ipa: "/ɡrəʊ/" },
    { word: "need", definition_en: "To require something essential for life", definition_vi: "cần thiết", example: "Plants need water and sunlight.", ipa: "/niːd/" },
    { word: "food", definition_en: "Substance consumed to provide nutritional support", definition_vi: "thức ăn", example: "Animals eat food to get energy.", ipa: "/fuːd/" },
    { word: "water", definition_en: "Essential clear liquid necessary for life", definition_vi: "nước uống", example: "All living things require water.", ipa: "/ˈwɔː.tər/" },
    { word: "rock", definition_en: "Solid mineral material forming part of the earth", definition_vi: "tảng đá", example: "A rock is non-living because it does not grow.", ipa: "/rɒk/" },
    { word: "plastic", definition_en: "Synthetic non-living material", definition_vi: "chất nhựa", example: "A plastic car is a non-living toy.", ipa: "/ˈplæs.tɪk/" },
    { word: "reproduce", definition_en: "To produce offspring or new organisms", definition_vi: "sinh sản", example: "Living organisms can reproduce.", ipa: "/ˌriː.prəˈdjuːs/" },
    { word: "organism", definition_en: "An individual living creature", definition_vi: "sinh vật", example: "A green plant is a living organism.", ipa: "/ˈɔː.ɡən.ɪ.zəm/" },
    { word: "energy", definition_en: "Power derived from food or sunlight", definition_vi: "năng lượng", example: "Food gives living things energy.", ipa: "/ˈen.ə.dʒi/" },
    { word: "survive", definition_en: "To continue to live or exist", definition_vi: "tồn tại, sống sót", example: "Animals need air to survive.", ipa: "/səˈvaɪv/" },
    { word: "air", definition_en: "The invisible gaseous substance surrounding the earth", definition_vi: "không khí", example: "We breathe clean air.", ipa: "/eər/" },
    { word: "sunlight", definition_en: "Light from the sun essential for plants", definition_vi: "ánh nắng mặt trời", example: "Plants absorb warm sunlight.", ipa: "/ˈsʌn.laɪt/" },
    { word: "plant", definition_en: "A living organism such as a tree or flower", definition_vi: "thực vật, cây xanh", example: "A green plant is living.", ipa: "/plɑːnt/" },
    { word: "animal", definition_en: "A living organism that feeds on organic matter", definition_vi: "động vật", example: "Animals are living organisms.", ipa: "/ˈæn.ɪ.məl/" },
    { word: "object", definition_en: "A material thing that can be seen and touched", definition_vi: "vật thể", example: "A stone is a non-living object.", ipa: "/ˈɒb.dʒɪkt/" },
    { word: "environment", definition_en: "The surroundings in which a living thing lives", definition_vi: "môi trường", example: "Organisms adapt to their environment.", ipa: "/ɪnˈvaɪ.rən.mənt/" },
    { word: "natural", definition_en: "Existing in or caused by nature", definition_vi: "tự nhiên", example: "Rocks are natural non-living objects.", ipa: "/ˈnætʃ.ər.əl/" }
  ],
  story_missions: [
    { mission_id: 1, title: "Classifying Nature", mission_context: "Explain why a puppy or tree is living using 'because' (it breathes/grows)." },
    { mission_id: 2, title: "Non-Living Objects", mission_context: "Explain why a rock or plastic toy is non-living using 'because' (it does not eat/grow)." },
    { mission_id: 3, title: "Scientific Reasoning", mission_context: "Present your CLIL Unit 6 science classification chart to the class." }
  ],
  spark_talk: [
    { topic_en: "Living Organisms", topic_vi: "Sinh vật sống", cards: ["Why is a puppy a living thing?", "What three things do plants need to survive?"] },
    { topic_en: "Non-Living Objects", topic_vi: "Vật thể không sống", cards: ["Is a rock living or non-living?", "How do you explain it using 'because'?"] }
  ],
  sentences: [
    "Welcome to CLIL Unit 6: Nature's Rules!",
    "Today young scientists classify living and non-living things.",
    "A puppy is living because it breathes fresh air and grows.",
    "A grey rock is non-living because it does not breathe or grow.",
    "An organism is living because it carries out vital life processes."
  ]
};

function writeRealFilePair(weekNum, dataObj) {
  const weekStr = weekNum < 10 ? `0${weekNum}` : `${weekNum}`;
  const content = `// Cambridge A2 Flyers week_${weekStr}_real.js (Restored Syllabus Data)\nexport default ${JSON.stringify(dataObj, null, 2)};\n`;

  // Write flat file
  const flatPath = path.join(root, 'src', 'data', 'weeks', `week_${weekStr}_real.js`);
  fs.writeFileSync(flatPath, content, 'utf8');

  // Write nested file inside week_XX/
  const nestedPath = path.join(root, 'src', 'data', 'weeks', `week_${weekStr}`, `week_${weekStr}_real.js`);
  fs.writeFileSync(nestedPath, content, 'utf8');
}

writeRealFilePair(34, w34RealData);
writeRealFilePair(35, w35RealData);
writeRealFilePair(36, w36RealData);
writeRealFilePair(37, w37RealData);

console.log('🚀 Synchronized ALL week_XX_real.js data files for W34, W35, W36, W37!');
