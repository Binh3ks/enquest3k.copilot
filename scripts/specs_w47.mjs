/**
 * scripts/specs_w47.mjs
 * Week 47: Big Numbers (Place Value)
 * CEFR Standard: A2 Flyers (Stage 1)
 */

export const w47 = {
  week: 47,
  theme: "Big Numbers (Place Value)",
  title_en: "Big Numbers and Place Value",
  title_vi: "Số Lớn và Giá Trị Hàng",
  cefr_level: "A2 Flyers",
  grammar_focus: "Hyphenated numbers & quantity expressions: 'There are twenty-five saplings. How many stars did you count in the sky?'",
  vocab_list: [
    { id: 1, word: "ten", pos: "num", ipa: "/ten/", definition_en: "The number equal to nine plus one", definition_vi: "số mười", example_en: "Sophie tied ten small wooden markers with green string.", example_vi: "Sophie đã buộc mười chiếc cọc gỗ đánh dấu bằng sợi dây màu xanh." },
    { id: 2, word: "twenty", pos: "num", ipa: "/ˈtwenti/", definition_en: "The number equal to two tens (20)", definition_vi: "số hai mươi", example_en: "There are twenty young pine saplings in the first row.", example_vi: "Có hai mươi cây thông non ở hàng đầu tiên." },
    { id: 3, word: "thirty", pos: "num", ipa: "/ˈθɜːrti/", definition_en: "The number equal to three tens (30)", definition_vi: "số ba mươi", example_en: "Lucas counted thirty colorful flower pots along the terrace.", example_vi: "Lucas đã đếm ba mươi chậu hoa rực rỡ dọc theo bậc thềm." },
    { id: 4, word: "hundred", pos: "num", ipa: "/ˈhʌndrəd/", definition_en: "The number equal to ten tens (100)", definition_vi: "số một trăm", example_en: "The village volunteers planted over one hundred trees.", example_vi: "Các tình nguyện viên của làng đã trồng hơn một trăm cây xanh." },
    { id: 5, word: "count", pos: "v", ipa: "/kaʊnt/", definition_en: "Determine the total number of items in a collection", definition_vi: "đếm", example_en: "Children learn to count saplings by grouping them in tens.", example_vi: "Trẻ em học cách đếm cây non bằng cách nhóm chúng thành từng chục." },
    { id: 6, word: "how many", pos: "pron", ipa: "/haʊ ˈmeni/", definition_en: "Used to ask about the quantity or number of countable things", definition_vi: "bao nhiêu", example_en: "How many bright stars can you spot above the hill tonight?", example_vi: "Bạn có thể nhìn thấy bao nhiêu ngôi sao sáng phía trên ngọn đồi tối nay?" },
    { id: 7, word: "forty", pos: "num", ipa: "/ˈfɔːrti/", definition_en: "The number equal to four tens (40)", definition_vi: "số bốn mươi", example_en: "Forty students gathered at the village community garden.", example_vi: "Bốn mươi học sinh đã tập trung tại vườn cộng đồng của làng." },
    { id: 8, word: "fifty", pos: "num", ipa: "/ˈfɪfti/", definition_en: "The number equal to five tens (50)", definition_vi: "số năm mươi", example_en: "Our team planted fifty birch saplings near the stream.", example_vi: "Đội chúng tôi đã trồng năm mươi cây bạch dương non gần bờ suối." },
    { id: 9, word: "sixty", pos: "num", ipa: "/ˈsɪksti/", definition_en: "The number equal to six tens (60)", definition_vi: "số sáu mươi", example_en: "There are sixty minutes in one complete hour.", example_vi: "Có sáu mươi phút trong một giờ đồng hồ trọn vẹn." },
    { id: 10, word: "seventy", pos: "num", ipa: "/ˈsevənti/", definition_en: "The number equal to seven tens (70)", definition_vi: "số bảy mươi", example_en: "Grandpa counted seventy healthy apple trees in his orchard.", example_vi: "Ông nội đã đếm được bảy mươi cây táo khỏe mạnh trong vườn cây ăn quả của mình." },
    { id: 11, word: "eighty", pos: "num", ipa: "/ˈeɪti/", definition_en: "The number equal to eight tens (80)", definition_vi: "số tám mươi", example_en: "Eighty shining stars formed a magnificent spiral pattern.", example_vi: "Tám mươi ngôi sao lấp lánh tạo thành một hình xoắn ốc tuyệt đẹp." },
    { id: 12, word: "ninety", pos: "num", ipa: "/ˈnaɪnti/", definition_en: "The number equal to nine tens (90)", definition_vi: "số chín mươi", example_en: "The tall oak tree is more than ninety years old.", example_vi: "Cây sồi cao lớn đã hơn chín mươi năm tuổi." },
    { id: 13, word: "number", pos: "n", ipa: "/ˈnʌmbər/", definition_en: "A mathematical value used for counting or measuring", definition_vi: "con số, số lượng", example_en: "Write the correct number of seedlings on your chart.", example_vi: "Hãy viết con số chính xác về số cây con lên bảng biểu của bạn." },
    { id: 14, word: "total", pos: "n", ipa: "/ˈtoʊtl/", definition_en: "The whole amount or number of things added together", definition_vi: "tổng số", example_en: "The total number of trees planted today was ninety-six.", example_vi: "Tổng số cây được trồng ngày hôm nay là chín mươi sáu cây." },
    { id: 15, word: "add", pos: "v", ipa: "/æd/", definition_en: "Join numbers together to calculate a total", definition_vi: "cộng thêm, thêm vào", example_en: "If you add ten to forty, you get fifty.", example_vi: "Nếu bạn cộng mười vào bốn mươi, bạn sẽ được năm mươi." },
    { id: 16, word: "equal", pos: "adj", ipa: "/ˈiːkwəl/", definition_en: "Being the same in quantity, size, or value", definition_vi: "bằng nhau", example_en: "Five tens are equal to fifty individual units.", example_vi: "Năm chục thì bằng năm mươi đơn vị riêng lẻ." },
    { id: 17, word: "group", pos: "n", ipa: "/ɡruːp/", definition_en: "A collection of items gathered or classed together", definition_vi: "nhóm", example_en: "Students worked in a small group to bundle saplings.", example_vi: "Các học sinh đã làm việc theo một nhóm nhỏ để buộc các bó cây non." },
    { id: 18, word: "star", pos: "n", ipa: "/stɑːr/", definition_en: "A luminous celestial point shining in the night sky", definition_vi: "ngôi sao", example_en: "Sophie pointed her small telescope at the North Star.", example_vi: "Sophie đã hướng chiếc kính thiên văn nhỏ của mình về phía sao Bắc Cực." },
    { id: 19, word: "village", pos: "n", ipa: "/ˈvɪlɪdʒ/", definition_en: "A small settlement in a country area smaller than a town", definition_vi: "ngôi làng", example_en: "Everyone in the peaceful village joined the tree festival.", example_vi: "Mọi người trong ngôi làng yên bình đều tham gia lễ hội trồng cây." },
    { id: 20, word: "tree", pos: "n", ipa: "/triː/", definition_en: "A woody perennial plant with an elongated trunk and branches", definition_vi: "cây cối", example_en: "A healthy tree provides cool shade and clean oxygen.", example_vi: "Một cái cây khỏe mạnh mang lại bóng mát và oxy trong lành." }
  ],
  clil: {
    title_en: "Counting Big Numbers with Place Value",
    title_vi: "Đếm Những Con Số Lớn Bằng Giá Trị Hàng",
    content_en: "Have you ever wondered how people count hundreds of stars or thousands of forest trees? Counting items one by one takes too long, so mathematicians invented place value. Place value means grouping numbers into sets of tens and hundreds. For example, twenty means two groups of ten, and fifty means five groups of ten. When we write compound numbers between twenty-one and ninety-nine, we always use a hyphen between the words. If volunteers plant seventy oak saplings and twenty pine saplings, we add the tens together. Seven tens plus two tens equal ninety trees in total! Understanding place value helps us calculate big quantities quickly and accurately.",
    glossary: [
      { word: "number", definition_en: "A word or symbol showing a quantity", definition_vi: "con số chỉ số lượng" },
      { word: "hundred", definition_en: "A number made of ten groups of ten (100)", definition_vi: "số một trăm gồm mười chục" },
      { word: "group", definition_en: "Items placed together into organized sets", definition_vi: "nhóm các vật được tập hợp lại" },
      { word: "total", definition_en: "The combined sum of all items counted", definition_vi: "tổng số lượng gom lại" },
      { word: "equal", definition_en: "Having the exact same amount or numerical value", definition_vi: "bằng nhau về giá trị" }
    ],
    check_questions: [
      { id: 1, question_en: "How does grouping items into tens help when counting large collections?", options: ["It makes counting much faster and prevents mistakes", "It makes numbers smaller than zero", "It turns trees into plastic toys"], answer: "It makes counting much faster and prevents mistakes" },
      { id: 2, question_en: "What punctuation mark is used when writing compound numbers like twenty-five?", options: ["A hyphen between the tens and units words", "An exclamation mark after each letter", "A question mark at the front"], answer: "A hyphen between the tens and units words" },
      { id: 3, question_en: "If volunteers plant fifty oak trees and thirty pine trees, what is the total?", options: ["Eighty trees in total", "Ten trees in total", "One hundred forty trees"], answer: "Eighty trees in total" }
    ]
  },
  shadowing_sentences: [
    { id: 1, text: "Sophie tied ten small green markers with bright string.", en: "Sophie tied ten small green markers with bright string.", vi: "Sophie buộc mười chiếc cọc xanh nhỏ bằng sợi dây sáng màu.", ipa: "/ˈsoʊfi taɪd ten smɔːl ɡriːn ˈmɑːrkərz wɪð braɪt strɪŋ/", words: ["Sophie", "tied", "ten", "small", "green", "markers", "with", "bright", "string"] },
    { id: 2, text: "There are twenty young pine saplings growing in the row.", en: "There are twenty young pine saplings growing in the row.", vi: "Có hai mươi cây thông non đang lớn lên ở trong hàng.", ipa: "/ðer ɑːr ˈtwenti jʌŋ paɪn ˈsæplɪŋz ˈɡroʊɪŋ ɪn ðə roʊ/", words: ["There", "are", "twenty", "young", "pine", "saplings", "growing", "in", "the", "row"] },
    { id: 3, text: "How many shining stars can you count in the clear sky?", en: "How many shining stars can you count in the clear sky?", vi: "Bạn có thể đếm được bao nhiêu ngôi sao sáng trên bầu trời trong?", ipa: "/haʊ ˈmeni ˈʃaɪnɪŋ stɑːrz kæn juː kaʊnt ɪn ðə klɪr skaɪ/", words: ["How", "many", "shining", "stars", "can", "you", "count", "in", "the", "clear", "sky"] },
    { id: 4, text: "Lucas counted thirty colorful flower pots along the stone path.", en: "Lucas counted thirty colorful flower pots along the stone path.", vi: "Lucas đã đếm ba mươi chậu hoa rực rỡ dọc con đường đá.", ipa: "/ˈluːkəs ˈkaʊntɪd ˈθɜːrti ˈkʌlərfəl ˈflaʊər pɑːts əˈlɔːŋ ðə stoʊn pæθ/", words: ["Lucas", "counted", "thirty", "colorful", "flower", "pots", "along", "the", "stone", "path"] },
    { id: 5, text: "The village volunteers planted more than one hundred trees today.", en: "The village volunteers planted more than one hundred trees today.", vi: "Các tình nguyện viên của làng đã trồng hơn một trăm cây xanh hôm nay.", ipa: "/ðə ˈvɪlɪdʒ ˌvɑːlənˈtɪrz ˈplæntɪd mɔːr ðæn wʌn ˈhʌndrəd triːz təˈdeɪ/", words: ["The", "village", "volunteers", "planted", "more", "than", "one", "hundred", "trees", "today"] },
    { id: 6, text: "Fifty healthy saplings were neatly grouped into bundles of ten.", en: "Fifty healthy saplings were neatly grouped into bundles of ten.", vi: "Năm mươi cây non khỏe mạnh được nhóm gọn gàng thành từng bó mười cây.", ipa: "/ˈfɪfti ˈhelθi ˈsæplɪŋz wɜːr ˈniːtli ɡruːpt ˈɪntuː ˈbʌndəlz əv ten/", words: ["Fifty", "healthy", "saplings", "were", "neatly", "grouped", "into", "bundles", "of", "ten"] },
    { id: 7, text: "Forty plus forty is equal to eighty sturdy village trees.", en: "Forty plus forty is equal to eighty sturdy village trees.", vi: "Bốn mươi cộng bốn mươi bằng tám mươi cây xanh vững chãi của làng.", ipa: "/ˈfɔːrti plʌs ˈfɔːrti ɪz ˈiːkwəl tuː ˈeɪti ˈstɜːrdi ˈvɪlɪdʒ triːz/", words: ["Forty", "plus", "forty", "is", "equal", "to", "eighty", "sturdy", "village", "trees"] },
    { id: 8, text: "We write hyphenated numbers like seventy-five with great care.", en: "We write hyphenated numbers like seventy-five with great care.", vi: "Chúng ta viết những con số có gạch nối như bảy mươi lăm rất cẩn thận.", ipa: "/wiː raɪt ˈhaɪfəˌneɪtɪd ˈnʌmbərz laɪk ˌsevənti ˈfaɪv wɪð ɡreɪt ker/", words: ["We", "write", "hyphenated", "numbers", "like", "seventy-five", "with", "great", "care"] }
  ],
  story_scenes: [
    { id: 1, scene_id: "scene_1", scene_number: 1, title_en: "Village Festival Gathering", title_vi: "Tập Hợp Tại Lễ Hội Làng", description_en: "Lucas and Sophie arrive at the community garden where crates of saplings wait to be counted.", description: "Lucas and Sophie arrive at the community garden where crates of saplings wait to be counted.", image_url: "/images/week47/webtoon_scene_1.png", audio_url: "/audio/week47/scene_1.mp3" },
    { id: 2, scene_id: "scene_2", scene_number: 2, title_en: "Grouping Saplings by Tens", title_vi: "Nhóm Cây Non Thành Từng Chục", description_en: "Sophie groups fifty green pine saplings into five tidy bundles of ten each.", description: "Sophie groups fifty green pine saplings into five tidy bundles of ten each.", image_url: "/images/week47/webtoon_scene_2.png", audio_url: "/audio/week47/scene_2.mp3" },
    { id: 3, scene_id: "scene_3", scene_number: 3, title_en: "Counting Eighty Oak Trees", title_vi: "Đếm Tám Mươi Cây Sồi", description_en: "Lucas tallies rows of oak trees along the river path and reaches eighty in total.", description: "Lucas tallies rows of oak trees along the river path and reaches eighty in total.", image_url: "/images/week47/webtoon_scene_3.png", audio_url: "/audio/week47/scene_3.mp3" },
    { id: 4, scene_id: "scene_4", scene_number: 4, title_en: "Counting Stars at Twilight", title_vi: "Đếm Sao Lúc Hoàng Hôn", description_en: "As evening falls over the village, they count bright stars appearing across the clear sky.", description: "As evening falls over the village, they count bright stars appearing across the clear sky.", image_url: "/images/week47/webtoon_scene_4.png", audio_url: "/audio/week47/scene_4.mp3" },
    { id: 5, scene_id: "scene_5", scene_number: 5, title_en: "Certificate for One Hundred", title_vi: "Chứng Nhận Cho Con Số Một Trăm", description_en: "Teacher Martin presents volunteer certificates for planting over one hundred trees.", description: "Teacher Martin presents volunteer certificates for planting over one hundred trees.", image_url: "/images/week47/webtoon_scene_5.png", audio_url: "/audio/week47/scene_5.mp3" }
  ],
  writing_data: {
    title: "Counting Big Numbers at the Village Festival",
    prompt_en: "Look at the four pictures. Tell a story about Lucas and Sophie counting saplings and stars at the village festival. Write 20 or more words.",
    prompt_vi: "Nhìn vào 4 bức tranh. Kể câu chuyện về Lucas và Sophie đếm cây non và các vì sao tại lễ hội làng (từ 20 từ trở lên).",
    min_sentences: 3,
    min_words: 20,
    max_words: 80,
    model_sentence: "Lucas and Sophie joined the village tree festival on Saturday morning. First, Sophie grouped fifty pine saplings into neat bundles of ten. Next, Lucas counted eighty oak saplings planted along the river. In the evening, they looked up and counted stars in the clear sky. In the end, Teacher Martin congratulated the children for counting over one hundred trees.",
    word_bank: ["ten", "twenty", "fifty", "eighty", "hundred", "count", "group", "total", "tree", "star"],
    sentence_frames: [
      "In the beginning, Lucas and Sophie visited the village ___ festival.",
      "Sophie grouped the young saplings into bundles of ___.",
      "Next, Lucas counted eighty oak saplings along the ___.",
      "In the end, everyone celebrated planting over one ___ trees."
    ],
    panels: [
      {
        panel_id: "panel_1",
        title_en: "Scene 1: Arriving at the Garden",
        title_vi: "Cảnh 1: Đến Khu Vườn Cộng Đồng",
        image_url: "/images/week47/writing_panel_1.png",
        image_prompt: "Two smiling students carrying clipboards arriving at a lively village festival with crates of tree saplings.",
        caption: "Lucas and Sophie volunteered at the village tree-planting festival.",
        sentence_frame: "First, Lucas and Sophie [volunteered at the village festival] on a [sunny Saturday morning].",
        pills: ["volunteered at the village festival", "sunny Saturday morning", "held clipboards", "Lucas and Sophie"],
        connectors: ["First,", "On Saturday morning,", "In the beginning,"]
      },
      {
        panel_id: "panel_2",
        title_en: "Scene 2: Grouping by Tens",
        title_vi: "Cảnh 2: Nhóm Cây Thành Từng Bó Mười",
        image_url: "/images/week47/writing_panel_2.png",
        image_prompt: "A girl tying green string around bundles of ten pine saplings on a wooden potting bench.",
        caption: "Sophie grouped fifty pine saplings into bundles of ten.",
        sentence_frame: "Next, Sophie grouped [fifty young saplings] into [neat bundles of ten].",
        pills: ["fifty young saplings", "neat bundles of ten", "tied with string", "place value grouping"],
        connectors: ["Next,", "Then,", "Soon after,"]
      },
      {
        panel_id: "panel_3",
        title_en: "Scene 3: Counting Eighty Trees",
        title_vi: "Cảnh 3: Đếm Tám Mươi Cây Sồi",
        image_url: "/images/week47/writing_panel_3.png",
        image_prompt: "A boy walking beside a straight row of newly planted oak saplings along a peaceful riverbank.",
        caption: "Lucas counted eighty oak saplings planted along the river path.",
        sentence_frame: "After that, Lucas counted [eighty oak saplings] along the [peaceful river path].",
        pills: ["eighty oak saplings", "peaceful river path", "tallied numbers", "straight green row"],
        connectors: ["After that,", "Later,", "Meanwhile,"]
      },
      {
        panel_id: "panel_4",
        title_en: "Scene 4: Certificate for One Hundred",
        title_vi: "Cảnh 4: Nhận Bằng Khen Một Trăm Cây",
        image_url: "/images/week47/writing_panel_4.png",
        image_prompt: "A kind teacher handing golden certificates to two proud children in front of a village banner reading 100 Trees.",
        caption: "Teacher Martin presented certificates for planting over one hundred trees.",
        sentence_frame: "In the end, Teacher Martin gave [golden certificates to the children] for [planting one hundred trees].",
        pills: ["golden certificates to the children", "planting one hundred trees", "Teacher Martin smiled", "proud community"],
        connectors: ["In the end,", "Finally,", "At last,"]
      }
    ],
    ladder_stages: [
      {
        badge_label: "MODEL",
        title: "Scene 1: Tree Festival Arrival",
        image_url: "/images/week47/writing_panel_1.png",
        caption: "Lucas and Sophie volunteered at the village tree-planting festival.",
        frame_L1: "First, Lucas and Sophie joined the village festival. They carried notebooks to help count young trees.",
        connectors: ["First,", "In the beginning,", "On Saturday morning,"],
        sentence_hint: "Write 2 sentences about joining the village festival.",
        ordered_chips: ["Lucas and Sophie", "joined the village festival", "to count saplings", "on Saturday morning"],
        pills: ["village festival", "count saplings", "Lucas and Sophie", "carried notebooks"],
        sentence_frame: "First, Lucas and Sophie [joined the village festival] to [count saplings with clipboards]."
      },
      {
        badge_label: "BUILD",
        title: "Scene 2: Grouping by Tens",
        image_url: "/images/week47/writing_panel_2.png",
        caption: "Sophie grouped fifty pine saplings into bundles of ten.",
        frame_L1: "Next, Sophie sorted the pine saplings. She arranged fifty trees into five neat bundles of ten.",
        connectors: ["Next,", "Then,", "Soon after,"],
        sentence_hint: "Write 2 sentences about grouping trees into bundles of ten.",
        pills: ["fifty pine saplings", "bundles of ten", "neat rows", "green string"],
        sentence_frame: "Next, Sophie arranged [fifty pine saplings] into [five neat bundles of ten]."
      },
      {
        badge_label: "WRITE",
        title: "Scene 3: Counting Eighty Trees",
        image_url: "/images/week47/writing_panel_3.png",
        caption: "Lucas counted eighty oak saplings planted along the river path.",
        frame_L1: "After that, Lucas walked along the riverbank. He tallied the saplings and reached eighty trees in total.",
        connectors: ["After that,", "Later,", "Meanwhile,"],
        sentence_hint: "Write 2 sentences about counting eighty trees.",
        pills: ["eighty oak saplings", "river path", "tallied numbers", "Lucas walked"],
        sentence_frame: "After that, Lucas counted [eighty oak saplings] planted along the [river path]."
      },
      {
        badge_label: "EXPAND",
        title: "Scene 4: Certificate for One Hundred",
        image_url: "/images/week47/writing_panel_4.png",
        caption: "Teacher Martin presented certificates for planting over one hundred trees.",
        frame_L1: "In the end, the festival ended with big applause. Teacher Martin gave awards for planting over one hundred trees.",
        connectors: ["In the end,", "Finally,", "At last,"],
        sentence_hint: "Write 2 sentences about receiving certificates.",
        pills: ["Teacher Martin", "one hundred trees", "golden certificates", "big applause"],
        sentence_frame: "In the end, Teacher Martin presented [golden certificates] for [planting one hundred trees]."
      }
    ]
  },
  speaking_data: {
    talkshow_prompt: {
      topic: "Counting Big Numbers with Place Value",
      question: "Hello Sophie! How does grouping numbers by tens help volunteers count hundreds of trees quickly?",
      model_response: "Hello! Grouping by tens makes counting big numbers so much faster and easier! Instead of counting one by one, we bundle ten saplings together. Two bundles make twenty, five bundles make fifty, and ten bundles equal one hundred! Place value helps us see the exact amount without getting confused or losing our place."
    },
    info_exchange_cards: {
      table_a: {
        title: "Lucas's Village Tree Orchard",
        subtitle: "Candidate's Question Card (Ask Examiner)",
        person: "Lucas",
        fields: [
          { id: "field_a1", cue_prompt: "how many / oak trees planted?", cue_word: "how many", is_missing: true, acceptable_questions: ["How many oak trees were planted?", "How many oak trees are there?", "How many oak trees did they plant?"], nova_reply: "The volunteers planted seventy-four sturdy oak saplings along the orchard path." },
          { id: "field_a2", cue_prompt: "how many / rows of trees?", cue_word: "how many", is_missing: true, acceptable_questions: ["How many rows of trees are in the orchard?", "How many rows of trees are there?", "How many rows were planted?"], nova_reply: "There are eight straight rows with nine trees in each row." },
          { id: "field_a3", cue_prompt: "who / planted the pine saplings?", cue_word: "who", is_missing: true, acceptable_questions: ["Who planted the pine saplings?", "Who planted the pine trees?", "Who helped plant them?"], nova_reply: "Lucas and his school friends planted thirty young pine saplings." },
          { id: "field_a4", cue_prompt: "which tree / tallest in village?", cue_word: "which tree", is_missing: true, acceptable_questions: ["Which tree is the tallest in the village?", "Which tree is tallest?", "What is the tallest tree?"], nova_reply: "The giant village oak in the town square is twenty-five meters tall." },
          { id: "field_a5", cue_prompt: "how much / water needed daily?", cue_word: "how much", is_missing: true, acceptable_questions: ["How much water is needed daily for the saplings?", "How much water do they need?", "How much water is required each day?"], nova_reply: "Each bundle of ten saplings needs forty liters of fresh rainwater daily." }
        ]
      },
      table_b: {
        title: "Sophie's Stargazing Night",
        subtitle: "Information Card (Answer Examiner's Questions)",
        person: "Sophie",
        fields: [
          { id: "field_b1", cue_prompt: "how many / stars counted?", cue_word: "how many", value: "Sophie counted eighty-six shining stars across the clear night sky.", nova_question: "How many shining stars did Sophie count in the night sky?", acceptable_answers: ["Sophie counted eighty-six shining stars across the clear night sky.", "Eighty-six shining stars.", "Eighty-six stars."] },
          { id: "field_b2", cue_prompt: "what telescope / used?", cue_word: "what telescope", value: "She used a portable brass telescope borrowed from the school science lab.", nova_question: "What telescope did Sophie use for observing the stars?", acceptable_answers: ["She used a portable brass telescope borrowed from the school science lab.", "A portable brass telescope.", "A brass telescope from the science lab."] },
          { id: "field_b3", cue_prompt: "where / observed the sky?", cue_word: "where", value: "From the top of Oak Hill behind the quiet village church.", nova_question: "Where did Sophie set up her telescope to observe the sky?", acceptable_answers: ["From the top of Oak Hill behind the quiet village church.", "On top of Oak Hill.", "Behind the quiet village church."] },
          { id: "field_b4", cue_prompt: "which constellation / brightest?", cue_word: "which constellation", value: "The Great Bear constellation shone brightest with seven major stars.", nova_question: "Which constellation looked brightest in the northern sky?", acceptable_answers: ["The Great Bear constellation shone brightest with seven major stars.", "The Great Bear constellation.", "The Great Bear with seven major stars."] },
          { id: "field_b5", cue_prompt: "what time / finished stargazing?", cue_word: "what time", value: "Sophie and her parents packed their telescope at half past nine.", nova_question: "What time did Sophie finish her stargazing session?", acceptable_answers: ["Sophie and her parents packed their telescope at half past nine.", "At half past nine.", "At nine thirty."] }
        ]
      }
    }
  },
  cambridge_rw: {
    part1_definitions: [
      { id: 1, definition_en: "The number that comes after nine and before eleven.", options: ["ten", "twenty", "thirty"], answer: "ten" },
      { id: 2, definition_en: "The number equal to two tens or twenty units.", options: ["twenty", "forty", "sixty"], answer: "twenty" },
      { id: 3, definition_en: "The number equal to ten tens or ten times ten.", options: ["hundred", "fifty", "ninety"], answer: "hundred" },
      { id: 4, definition_en: "Find out how many things or people are present in a group.", options: ["count", "add", "equal"], answer: "count" },
      { id: 5, definition_en: "A word or mathematical symbol that tells us an amount.", options: ["number", "tree", "village"], answer: "number" },
      { id: 6, definition_en: "The complete amount when all items are added together.", options: ["total", "group", "star"], answer: "total" },
      { id: 7, definition_en: "Put numbers together to calculate a larger whole number.", options: ["add", "count", "equal"], answer: "add" },
      { id: 8, definition_en: "Having the exact same value or amount as another number.", options: ["equal", "total", "number"], answer: "equal" },
      { id: 9, definition_en: "A bright burning point of light high in the night sky.", options: ["star", "tree", "village"], answer: "star" },
      { id: 10, definition_en: "A tall plant with a woody trunk, green leaves, and roots.", options: ["tree", "star", "group"], answer: "tree" }
    ],
    part2_dialogue: {
      topic: "Counting Trees at the Village Festival",
      turns: [
        {
          speaker: "Lucas",
          text: "Sophie, how many pine saplings are in this first wooden crate?",
          options: [
            "There are twenty saplings tied in two neat bundles of ten.",
            "I watched an interesting movie on television yesterday.",
            "The weather in the mountains was very snowy last week."
          ],
          answer: "There are twenty saplings tied in two neat bundles of ten."
        },
        {
          speaker: "Sophie",
          text: "How many oak trees did the volunteers plant along the river path?",
          options: [
            "They planted eighty sturdy oak trees in a straight line.",
            "My uncle drives a blue delivery truck every afternoon.",
            "No, I prefer eating strawberry ice cream."
          ],
          answer: "They planted eighty sturdy oak trees in a straight line."
        },
        {
          speaker: "Lucas",
          text: "What is the total if we add forty pine trees to fifty birch trees?",
          options: [
            "Forty plus fifty is equal to ninety trees in total.",
            "We played tennis after school on Wednesday.",
            "The library opens at nine o'clock in the morning."
          ],
          answer: "Forty plus fifty is equal to ninety trees in total."
        },
        {
          speaker: "Sophie",
          text: "Did our village reach our big target of one hundred trees today?",
          options: [
            "Yes, we planted over one hundred trees and won certificates!",
            "I bought a pair of new white sneakers yesterday.",
            "There are four windows inside our modern kitchen."
          ],
          answer: "Yes, we planted over one hundred trees and won certificates!"
        },
        {
          speaker: "Lucas",
          text: "Shall we walk up Oak Hill tonight and count stars in the sky?",
          options: [
            "Yes, let's bring our telescope and count stars together!",
            "I do not want any tomato soup for dinner.",
            "The train leaves the station in fifteen minutes."
          ],
          answer: "Yes, let's bring our telescope and count stars together!"
        }
      ],
      exchanges: [
        { speaker: "Lucas", text: "Sophie, how many pine saplings are in this first wooden crate?" },
        { speaker: "Sophie", text: "There are twenty saplings tied in two neat bundles of ten." },
        { speaker: "Lucas", text: "How many oak trees did the volunteers plant along the river path?" },
        { speaker: "Sophie", text: "They planted eighty sturdy oak trees in a straight line." },
        { speaker: "Lucas", text: "What is the total if we add forty pine trees to fifty birch trees?" },
        { speaker: "Sophie", text: "Forty plus fifty is equal to ninety trees in total." },
        { speaker: "Lucas", text: "Did our village reach our big target of one hundred trees today?" },
        { speaker: "Sophie", text: "Yes, we planted over one hundred trees and won certificates!" },
        { speaker: "Lucas", text: "Shall we walk up Oak Hill tonight and count stars in the sky?" },
        { speaker: "Sophie", text: "Yes, let's bring our telescope and count stars together!" }
      ]
    },
    part6_cloze: {
      title: "Lucas's Volunteer Logbook: Big Numbers",
      instructions: "Read the diary and write the missing words. Write one word on each line.",
      text_template: "Dear Logbook, today our village held [1]_____ tree festival. Sophie and I helped count [2]_____ saplings by grouping them in tens. We had twenty pine trees and [3]_____ oak trees. In total, the volunteers planted over [4]_____ hundred trees. It was easy to calculate because [5]_____ understand place value.",
      answers: { "1": "a", "2": "the", "3": "eighty", "4": "one", "5": "we" }
    }
  },
  minigames: {
    math_problems: [
      {
        id: "w47_p1",
        type: "part_whole",
        title: "Tree Planting Total by Tens",
        question: "Volunteers planted 60 pine saplings and 40 birch saplings in the village park. How many saplings did they plant in total?",
        storyContext: "Sophie enters the group totals into the festival scoreboard ledger.",
        modelData: {
          bars: [
            { label: "Pine Saplings (6 tens)", value: 60, color: "#10b981" },
            { label: "Birch Saplings (4 tens)", value: 40, color: "#f59e0b" }
          ],
          total: 100,
          unit: "saplings"
        },
        target_answer: 100,
        unit: "saplings",
        steps: [
          "Take 60 pine saplings (6 tens).",
          "Add 40 birch saplings (4 tens).",
          "60 + 40 = 100 saplings in total."
        ]
      },
      {
        id: "w47_p2",
        type: "comparison",
        title: "Stargazing Count Comparison",
        question: "Sophie counted 75 stars through her telescope, while Lucas counted 50 stars with his binoculars. How many more stars did Sophie count than Lucas?",
        storyContext: "Lucas and Sophie compare their stargazing tallies on top of Oak Hill.",
        modelData: {
          bars: [
            { label: "Sophie's Stars", value: 75, color: "#6366f1" },
            { label: "Lucas's Stars", value: 50, color: "#0ea5e9" }
          ],
          difference: 25,
          unit: "stars"
        },
        target_answer: 25,
        unit: "stars",
        steps: [
          "Start with Sophie's 75 stars.",
          "Subtract Lucas's 50 stars.",
          "75 - 50 = 25 more stars counted by Sophie."
        ]
      }
    ],
    action_lab_scenarios: [
      {
        stage: 1,
        title: "Place Value Tens and Ones Sorting",
        diagram_type: "place_value_blocks",
        instruction: "Drag each compound number to its matching tens and units configuration.",
        items: [
          { label: "Forty-Five -> 4 Tens + 5 Units", target: "tens_4_units_5" },
          { label: "Seventy-Two -> 7 Tens + 2 Units", target: "tens_7_units_2" },
          { label: "Ninety-Six -> 9 Tens + 6 Units", target: "tens_9_units_6" }
        ]
      },
      {
        stage: 2,
        title: "Tree Orchard Counting Grid",
        diagram_type: "orchard_group_grid",
        instruction: "Match each orchard section to its correct bundle calculation.",
        items: [
          { label: "3 Bundles of Ten -> Thirty Trees", target: "thirty" },
          { label: "5 Bundles of Ten -> Fifty Trees", target: "fifty" },
          { label: "8 Bundles of Ten -> Eighty Trees", target: "eighty" }
        ]
      },
      {
        stage: 3,
        title: "Community Counting Verification",
        diagram_type: "total_verification_steps",
        instruction: "Order the three steps for verifying a large collection total.",
        items: [
          { label: "Group Items into Sets of Ten", target: "step_1" },
          { label: "Add the Tens Together", target: "step_2" },
          { label: "Record Final Total with Hyphenated Word", target: "step_3" }
        ]
      }
    ],
    grammar_drills: [
      { sentence: "How many saplings did the village volunteers plant today?", options: ["How many", "How much", "How long"], answer: "How many", explanation: "Use 'How many' with plural countable nouns like 'saplings'." },
      { sentence: "There are twenty-five young trees growing in the orchard.", options: ["twenty-five", "twenty five", "twenties-five"], answer: "twenty-five", explanation: "Compound numbers from 21 to 99 are written with a hyphen." },
      { sentence: "Forty plus fifty is equal to ninety trees in total.", options: ["equal", "equals", "equaling"], answer: "equal", explanation: "Use adjective 'equal' in the phrase 'is equal to'." },
      { sentence: "Sophie neatly groups the green saplings into bundles of ten.", options: ["groups", "group", "grouping"], answer: "groups", explanation: "Use 3rd person singular present tense 'groups' with singular subject 'Sophie'." },
      { sentence: "Lucas counted eighty shining stars in the clear night sky.", options: ["counted", "counts", "counting"], answer: "counted", explanation: "Use past tense 'counted' to narrate completed observation." }
    ]
  }
};

export default w47;
