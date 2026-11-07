/**
 * scripts/specs_w43.mjs
 * Week 43: The "Plus" Machine (Addition Language)
 */

export const w43 = {
  week: 43,
  theme: "The \"Plus\" Machine (Addition Language)",
  title_en: "The \"Plus\" Machine (Addition Language)",
  title_vi: "Cỗ Máy \"Cộng\" — Ngôn Ngữ Phép Cộng và Đọc Toán",
  cefr_level: "A2 Flyers",
  grammar_focus: "Addition Language: \"2 plus 2 equals 4\" / \"combine and add\"",
  vocab_list: [
    { id: 1, word: "add", pos: "v", ipa: "/æd/", definition_en: "Put two or more numbers together to calculate a larger sum", definition_vi: "cộng thêm", example_en: "If you add three red marbles, you get seven.", example_vi: "Nếu bạn cộng thêm ba viên bi đỏ, bạn sẽ có bảy viên." },
    { id: 2, word: "plus", pos: "prep", ipa: "/plʌs/", definition_en: "With the addition of a specified number or amount", definition_vi: "cộng với", example_en: "Four plus five equals nine on the chalkboard.", example_vi: "Bốn cộng năm bằng chín trên bảng đen." },
    { id: 3, word: "combine", pos: "v", ipa: "/kəmˈbaɪn/", definition_en: "Join two or more sets together into one single group", definition_vi: "kết hợp, gộp lại", example_en: "We can combine the blue blocks and yellow blocks.", example_vi: "Chúng ta có thể gộp các khối gỗ xanh và khối gỗ vàng lại." },
    { id: 4, word: "total", pos: "n", ipa: "/ˈtoʊtəl/", definition_en: "The whole number or amount obtained by adding parts", definition_vi: "tổng số", example_en: "The total number of wooden gears in the box is ten.", example_vi: "Tổng số bánh răng gỗ trong hộp là mười cái." },
    { id: 5, word: "together", pos: "adv", ipa: "/təˈɡeðər/", definition_en: "In or into one gathered group, mass, or whole", definition_vi: "cùng nhau, gộp chung", example_en: "Push the two wooden trays together on the table.", example_vi: "Hãy đẩy hai khay gỗ lại gần nhau trên bàn." },
    { id: 6, word: "equals", pos: "v", ipa: "/ˈiːkwəlz/", definition_en: "Is the same in quantity, size, number, or value as", definition_vi: "bằng với", example_en: "Six plus two equals eight in our math puzzle.", example_vi: "Sáu cộng hai bằng tám trong câu đố toán của chúng ta." },
    { id: 7, word: "count", pos: "v", ipa: "/kaʊnt/", definition_en: "Determine the total number of items by naming figures", definition_vi: "đếm", example_en: "Alex can count all the shiny marbles in the jar.", example_vi: "Alex có thể đếm tất cả những viên bi sáng lấp lánh trong lọ." },
    { id: 8, word: "sum", pos: "n", ipa: "/sʌm/", definition_en: "The final aggregate amount produced by adding numbers", definition_vi: "tổng phép tính", example_en: "The sum of five and three is eight.", example_vi: "Tổng của năm và ba là tám." },
    { id: 9, word: "altogether", pos: "adv", ipa: "/ˌɔːltəˈɡeðər/", definition_en: "In total sum; taking all items into consideration", definition_vi: "tất cả cùng nhau, tổng cộng", example_en: "How many colored tokens are there altogether?", example_vi: "Có tất cả bao nhiêu đồng xu màu tổng cộng?" },
    { id: 10, word: "join", pos: "v", ipa: "/dʒɔɪn/", definition_en: "Connect or link things together into a single unit", definition_vi: "nối lại, liên kết", example_en: "Join the red puzzle pieces to make a long train.", example_vi: "Hãy nối các mảnh ghép màu đỏ lại để tạo thành đoàn tàu dài." },
    { id: 11, word: "number", pos: "n", ipa: "/ˈnʌmbər/", definition_en: "A mathematical value used for counting and calculating", definition_vi: "chữ số, con số", example_en: "Pick a lucky number between one and twenty.", example_vi: "Hãy chọn một con số may mắn từ một đến hai mươi." },
    { id: 12, word: "machine", pos: "n", ipa: "/məˈʃiːn/", definition_en: "An apparatus using mechanical power to perform work", definition_vi: "cỗ máy", example_en: "The invention machine drops marbles into plastic cups.", example_vi: "Cỗ máy phát minh thả những viên bi vào các cốc nhựa." },
    { id: 13, word: "marble", pos: "n", ipa: "/ˈmɑːrbəl/", definition_en: "A small hard glass ball used in children's games", definition_vi: "viên bi ve", example_en: "Mia rolled a green glass marble down the wooden ramp.", example_vi: "Mia lăn một viên bi ve xanh lá cây xuống con dốc gỗ." },
    { id: 14, word: "block", pos: "n", ipa: "/blɑːk/", definition_en: "A solid piece of wood or plastic used as a building toy", definition_vi: "khối gỗ, khối hộp", example_en: "Stack each wooden block carefully to build a tower.", example_vi: "Hãy xếp từng khối gỗ cẩn thận để xây thành một tòa tháp." },
    { id: 15, word: "math", pos: "n", ipa: "/mæθ/", definition_en: "The study of numbers, quantities, shapes, and patterns", definition_vi: "môn toán", example_en: "We solve interesting math stories in the laboratory.", example_vi: "Chúng tôi giải những câu chuyện toán thú vị trong phòng thí nghiệm." },
    { id: 16, word: "problem", pos: "n", ipa: "/ˈprɑːbləm/", definition_en: "A mathematical question that requires investigation", definition_vi: "bài toán, vấn đề", example_en: "Alex solved the tricky addition problem quickly.", example_vi: "Alex đã giải bài toán cộng hóc búa một cách nhanh chóng." },
    { id: 17, word: "calculate", pos: "v", ipa: "/ˈkælkjəleɪt/", definition_en: "Determine a mathematical result using careful reasoning", definition_vi: "tính toán", example_en: "Use the plus machine to calculate the correct amount.", example_vi: "Hãy dùng cỗ máy cộng để tính toán số lượng chính xác." },
    { id: 18, word: "answer", pos: "n", ipa: "/ˈænsər/", definition_en: "A solution to a problem or math equation", definition_vi: "câu trả lời, đáp án", example_en: "Her final answer to the addition quiz was twelve.", example_vi: "Đáp án cuối cùng của cô ấy cho câu đố phép cộng là mười hai." },
    { id: 19, word: "chute", pos: "n", ipa: "/ʃuːt/", definition_en: "A sloping channel down which things can slide", definition_vi: "máng trượt", example_en: "The wooden chute sends marbles directly into the bucket.", example_vi: "Máng trượt gỗ dẫn những viên bi thẳng vào trong xô." },
    { id: 20, word: "lever", pos: "n", ipa: "/ˈlevər/", definition_en: "A handle that you push or pull to work a machine", definition_vi: "cần gạt", example_en: "Pull the metal lever to open the machine trapdoor.", example_vi: "Hãy kéo cần gạt kim loại để mở cửa sập của cỗ máy." }
  ],
  clil: {
    title_en: "The Plus Machine: How We Read Addition Stories",
    title_vi: "Cỗ Máy Phép Cộng: Cách Chúng Ta Đọc Truyện Toán Học",
    content_en: "Math is an international language that describes the world around us. When we solve addition problems, we put separate groups together to find a bigger amount. In our workshop, Mr. Davis built a wooden machine called the Plus Machine. It has two top chutes where students drop glass marbles. For example, if Alex drops three red marbles and Mia drops four blue marbles, the machine joins them inside a funnel. When you pull the shiny lever, all seven marbles tumble into one tray. In words, we say that three plus four equals seven. We can also say that the sum of three and four is seven. Reading equations as complete sentences helps young learners think logically. Adding quantities together is a practical skill used every day.",
    glossary: [
      { word: "add", definition_en: "To put quantities together to find how many there are", definition_vi: "cộng gộp các lượng lại với nhau" },
      { word: "plus", definition_en: "A mathematical preposition meaning added to", definition_vi: "từ chỉ phép cộng mang nghĩa cộng với" },
      { word: "combine", definition_en: "To join separate groups into a single unified whole", definition_vi: "kết hợp các nhóm riêng rẽ lại" },
      { word: "equals", definition_en: "Having the exact same amount or numerical value as", definition_vi: "bằng giá trị chính xác với" },
      { word: "total", definition_en: "The complete amount after every part is counted", definition_vi: "tổng số sau khi đếm tất cả" }
    ],
    check_questions: [
      { id: 1, question_en: "What happens when you drop marbles into the two chutes?", options: ["The machine breaks them", "The machine combines the two groups into one tray", "The marbles fly into the air"], answer: "The machine combines the two groups into one tray" },
      { id: 2, question_en: "How do we read the equation 3 + 4 = 7 aloud?", options: ["Three minus four is seven", "Three plus four equals seven", "Three times four makes seven"], answer: "Three plus four equals seven" },
      { id: 3, question_en: "Why is reading equations as complete sentences helpful?", options: ["It helps young students think clearly and logically", "It makes students forget the numbers", "It turns numbers into colors"], answer: "It helps young students think clearly and logically" }
    ]
  },
  shadowing_sentences: [
    { id: 1, text: "The wooden Plus Machine helps us add numbers together.", en: "The wooden Plus Machine helps us add numbers together.", vi: "Cỗ máy Cộng bằng gỗ giúp chúng ta cộng các con số lại với nhau.", ipa: "/ðə ˈwʊdən plʌs məˈʃiːn helps ʌs æd ˈnʌmbərz təˈɡeðər/", words: ["The", "wooden", "Plus", "Machine", "helps", "us", "add", "numbers", "together"] },
    { id: 2, text: "Alex drops four shiny red marbles into the left chute.", en: "Alex drops four shiny red marbles into the left chute.", vi: "Alex thả bốn viên bi đỏ sáng bóng vào máng trượt bên trái.", ipa: "/ˈælɪks drɑːps fɔːr ˈʃaɪni red ˈmɑːrbəlz ˈɪntuː ðə left ʃuːt/", words: ["Alex", "drops", "four", "shiny", "red", "marbles", "into", "the", "left", "chute"] },
    { id: 3, text: "Mia adds three blue marbles into the right chute.", en: "Mia adds three blue marbles into the right chute.", vi: "Mia cộng thêm ba viên bi xanh dương vào máng trượt bên phải.", ipa: "/ˈmiːə ædz θriː bluː ˈmɑːrbəlz ˈɪntuː ðə raɪt ʃuːt/", words: ["Mia", "adds", "three", "blue", "marbles", "into", "the", "right", "chute"] },
    { id: 4, text: "Four plus three equals seven marbles in the wooden tray.", en: "Four plus three equals seven marbles in the wooden tray.", vi: "Bốn cộng ba bằng bảy viên bi trong khay gỗ.", ipa: "/fɔːr plʌs θriː ˈiːkwəlz ˈsevən ˈmɑːrbəlz ɪn ðə ˈwʊdən treɪ/", words: ["Four", "plus", "three", "equals", "seven", "marbles", "in", "the", "wooden", "tray"] },
    { id: 5, text: "We combine two groups of blocks to find the total sum.", en: "We combine two groups of blocks to find the total sum.", vi: "Chúng tôi kết hợp hai nhóm khối gỗ để tìm ra tổng số.", ipa: "/wiː kəmˈbaɪn tuː ɡruːps ʌv blɑːks tuː faɪnd ðə ˈtoʊtəl sʌm/", words: ["We", "combine", "two", "groups", "of", "blocks", "to", "find", "the", "total", "sum"] },
    { id: 6, text: "Pull the metal lever to release the rolling wooden balls.", en: "Pull the metal lever to release the rolling wooden balls.", vi: "Hãy kéo cần gạt kim loại để mở đường cho những quả bóng gỗ lăn xuống.", ipa: "/pʊl ðə ˈmetəl ˈlevər tuː rɪˈliːs ðə ˈroʊlɪŋ ˈwʊdən bɔːlz/", words: ["Pull", "the", "metal", "lever", "to", "release", "the", "rolling", "wooden", "balls"] },
    { id: 7, text: "Can you read this exciting math equation as a sentence?", en: "Can you read this exciting math equation as a sentence?", vi: "Bạn có thể đọc phép tính toán thú vị này thành một câu hoàn chỉnh không?", ipa: "/kæn juː riːd ðɪs ɪkˈsaɪtɪŋ mæθ ɪˈkweɪʒən æz ə ˈsentəns/", words: ["Can", "you", "read", "this", "exciting", "math", "equation", "as", "a", "sentence"] },
    { id: 8, text: "Six and four make ten blocks altogether on the table.", en: "Six and four make ten blocks altogether on the table.", vi: "Sáu và bốn tạo thành mười khối hộp tổng cộng trên bàn.", ipa: "/sɪks ænd fɔːr meɪk ten blɑːks ˌɔːltəˈɡeðər ɑːn ðə ˈteɪbəl/", words: ["Six", "and", "four", "make", "ten", "blocks", "altogether", "on", "the", "table"] }
  ],
  story_scenes: [
    { id: 1, scene_id: "scene_1", scene_number: 1, title_en: "The Math Invention Workshop", title_vi: "Xưởng Sáng Chế Toán Học", description_en: "Alex and Mia step inside inventor Mr. Davis's colorful workshop filled with wooden gears and chutes.", description: "Alex and Mia step inside inventor Mr. Davis's colorful workshop filled with wooden gears and chutes.", image_url: "/images/week43/webtoon_scene_1.png", audio_url: "/audio/week43/scene_1.mp3" },
    { id: 2, scene_id: "scene_2", scene_number: 2, title_en: "Dropping the Red Marbles", title_vi: "Thả Những Viên Bi Đỏ", description_en: "Alex carefully drops five red glass marbles one by one into the machine's left hopper.", description: "Alex carefully drops five red glass marbles one by one into the machine's left hopper.", image_url: "/images/week43/webtoon_scene_2.png", audio_url: "/audio/week43/scene_2.mp3" },
    { id: 3, scene_id: "scene_3", scene_number: 3, title_en: "Adding the Blue Marbles", title_vi: "Cộng Thêm Bi Xanh Dương", description_en: "Mia counts aloud as she drops three shiny blue marbles down the right spiraling chute.", description: "Mia counts aloud as she drops three shiny blue marbles down the right spiraling chute.", image_url: "/images/week43/webtoon_scene_3.png", audio_url: "/audio/week43/scene_3.mp3" },
    { id: 4, scene_id: "scene_4", scene_number: 4, title_en: "Pulling the Release Lever", title_vi: "Kéo Cần Gạt Giải Phóng", description_en: "Mr. Davis invites the children to pull the big brass lever that opens the combined holding chamber.", description: "Mr. Davis invites the children to pull the big brass lever that opens the combined holding chamber.", image_url: "/images/week43/webtoon_scene_4.png", audio_url: "/audio/week43/scene_4.mp3" },
    { id: 5, scene_id: "scene_5", scene_number: 5, title_en: "The Grand Addition Total", title_vi: "Tổng Số Phép Cộng Tuyệt Vời", description_en: "All eight marbles roll into the collection tray, and Alex and Mia read the math equation with bright smiles.", description: "All eight marbles roll into the collection tray, and Alex and Mia read the math equation with bright smiles.", image_url: "/images/week43/webtoon_scene_5.png", audio_url: "/audio/week43/scene_5.mp3" }
  ],
  writing_data: {
    title: "Alex and Mia Test the Plus Machine",
    prompt_en: "Look at the four pictures. Tell a story about Alex and Mia testing the Plus Machine in Mr. Davis's workshop. Write 20 or more words.",
    prompt_vi: "Nhìn vào 4 bức tranh. Kể câu chuyện về Alex và Mia thử nghiệm Cỗ Máy Cộng trong xưởng của thầy Davis (từ 20 từ trở lên).",
    min_sentences: 3,
    min_words: 20,
    max_words: 80,
    model_sentence: "Alex and Mia visited Mr. Davis's invention workshop on Wednesday afternoon. First, Alex placed four red blocks into the wooden chute. Next, Mia added three green blocks to the tray. Then, they pulled the lever to combine the toys. In the end, they calculated seven blocks altogether.",
    word_bank: ["plus", "machine", "add", "equals", "total", "combine", "marbles", "blocks", "together", "calculate"],
    sentence_frames: [
      "In the beginning, Alex and Mia visited the workshop's ___ machine.",
      "First, Alex dropped four shiny red ___ down the chute.",
      "Next, Mia added three blue marbles to ___ the two groups.",
      "In the end, four plus three ___ seven marbles in total."
    ],
    panels: [
      {
        panel_id: "panel_1",
        title_en: "Scene 1: Entering the Workshop",
        title_vi: "Cảnh 1: Bước Vào Xưởng Sáng Chế",
        image_url: "/images/week43/writing_panel_1.png",
        image_prompt: "Two young students standing beside a creative wooden machine with two top funnel chutes and numbered dials.",
        caption: "Alex and Mia arrived at the workshop to test the mechanical Plus Machine.",
        sentence_frame: "First, Alex and Mia [visited the math workshop] to [test the Plus Machine].",
        pills: ["visited the math workshop", "test the Plus Machine", "looked at dials", "Wednesday afternoon"],
        connectors: ["First,", "On Wednesday afternoon,", "In the beginning,"]
      },
      {
        panel_id: "panel_2",
        title_en: "Scene 2: Dropping First Marbles",
        title_vi: "Cảnh 2: Thả Lượt Bi Đầu Tiên",
        image_url: "/images/week43/writing_panel_2.png",
        image_prompt: "A boy dropping four red glass marbles into the left wooden hopper chute.",
        caption: "Alex counted and dropped four red marbles into the left chute.",
        sentence_frame: "Next, Alex dropped [four red marbles] into the [left wooden chute].",
        pills: ["four red marbles", "left wooden chute", "counted carefully", "rolled smoothly"],
        connectors: ["Next,", "Then,", "Also,"]
      },
      {
        panel_id: "panel_3",
        title_en: "Scene 3: Adding Second Group",
        title_vi: "Cảnh 3: Thêm Nhóm Bi Thứ Hai",
        image_url: "/images/week43/writing_panel_3.png",
        image_prompt: "A girl adding three shiny blue marbles into the right spiraling chute of the wooden machine.",
        caption: "Mia added three blue marbles into the right chute to combine them.",
        sentence_frame: "After that, Mia [added three blue marbles] into the [right spiraling chute].",
        pills: ["added three blue marbles", "right spiraling chute", "combined the groups", "Mia smiled"],
        connectors: ["After that,", "Later,", "Also,"]
      },
      {
        panel_id: "panel_4",
        title_en: "Scene 4: Counting the Total",
        title_vi: "Cảnh 4: Đếm Tổng Số",
        image_url: "/images/week43/writing_panel_4.png",
        image_prompt: "Two children and an older inventor smiling as seven marbles rest in the collection tray under an equation sign.",
        caption: "They pulled the lever and read that four plus three equals seven.",
        sentence_frame: "In the end, they pulled the [metal lever] and [calculated seven marbles altogether].",
        pills: ["metal lever", "calculated seven marbles altogether", "read the equation", "laughed happily"],
        connectors: ["In the end,", "Finally,", "At last,"]
      }
    ],
    ladder_stages: [
      {
        badge_label: "MODEL",
        title: "Scene 1: Entering the Workshop",
        image_url: "/images/week43/writing_panel_1.png",
        caption: "Alex and Mia arrived at the workshop to test the mechanical Plus Machine.",
        frame_L1: "First, Alex and Mia entered the workshop. They wanted to test how the Plus Machine combines numbers.",
        connectors: ["First,", "On Wednesday afternoon,", "In the beginning,"],
        sentence_hint: "Write 2 sentences about visiting the inventor's workshop.",
        ordered_chips: ["Alex and Mia", "visited the workshop", "to test how", "numbers combine"],
        pills: ["Alex and Mia", "visited the workshop", "Plus Machine", "Wednesday afternoon"],
        sentence_frame: "First, Alex and Mia [visited the workshop] to test the [Plus Machine]."
      },
      {
        badge_label: "BUILD",
        title: "Scene 2: Dropping First Marbles",
        image_url: "/images/week43/writing_panel_2.png",
        caption: "Alex counted and dropped four red marbles into the left chute.",
        frame_L1: "Next, Alex took four red marbles. He dropped them carefully into the left wooden hopper.",
        connectors: ["Next,", "Then,", "Also,"],
        sentence_hint: "Write 2 sentences about dropping the four red marbles.",
        pills: ["four red marbles", "left wooden hopper", "counted carefully", "Alex"],
        sentence_frame: "Next, Alex dropped [four red marbles] into the [left wooden hopper]."
      },
      {
        badge_label: "WRITE",
        title: "Scene 3: Adding Second Group",
        image_url: "/images/week43/writing_panel_3.png",
        caption: "Mia added three blue marbles into the right chute to combine them.",
        frame_L1: "After that, Mia held three blue marbles. She added them into the right chute to join the groups.",
        connectors: ["After that,", "Later,", "Also,"],
        sentence_hint: "Write 2 sentences about Mia adding the blue marbles.",
        pills: ["three blue marbles", "right chute", "join the groups", "Mia"],
        sentence_frame: "After that, Mia added [three blue marbles] to [join the groups]."
      },
      {
        badge_label: "EXPAND",
        title: "Scene 4: Counting the Total",
        image_url: "/images/week43/writing_panel_4.png",
        caption: "They pulled the lever and read that four plus three equals seven.",
        frame_L1: "In the end, they pulled the lever. Seven marbles rolled out, and they happily said four plus three equals seven.",
        connectors: ["In the end,", "Finally,", "At last,"],
        sentence_hint: "Write 2 sentences about pulling the lever and stating the equation.",
        pills: ["pulled the lever", "seven marbles rolled out", "equals seven", "read the math sentence"],
        sentence_frame: "In the end, they pulled the lever and stated that [four plus three equals seven]."
      }
    ]
  },
  speaking_data: {
    talkshow_prompt: {
      topic: "Reading Math Equations as Stories",
      question: "Hi Alex! How does the Plus Machine help you read an addition problem?",
      model_response: "The Plus Machine turns numbers into a real action story! When I put four marbles in one chute and Mia adds three marbles in the other chute, the machine combines them together. When we pull the lever, seven marbles roll out. So we read the sentence: four plus three equals seven!"
    },
    info_exchange_cards: {
      table_a: {
        title: "Alex's Marbles Addition Experiment",
        subtitle: "Candidate's Question Card (Ask Examiner)",
        person: "Alex",
        fields: [
          { id: "field_a1", cue_prompt: "how many / red marbles drop?", cue_word: "how", is_missing: true, acceptable_questions: ["How many red marbles did Alex drop?", "How many red marbles did he drop into the machine?", "How many red marbles were there?"], nova_reply: "Alex dropped five shiny red marbles into the left hopper chute." },
          { id: "field_a2", cue_prompt: "what / color of second group?", cue_word: "what", is_missing: true, acceptable_questions: ["What color were the second group of marbles?", "What color marbles did Mia add?", "What was the color of the second group?"], nova_reply: "The second group consisted of bright blue glass marbles." },
          { id: "field_a3", cue_prompt: "how / machine join them?", cue_word: "how", is_missing: true, acceptable_questions: ["How does the machine join them together?", "How does the machine combine the marbles?", "How do the marbles join together?"], nova_reply: "The two chutes lead into a center funnel that joins the marbles together." },
          { id: "field_a4", cue_prompt: "who / pulled the release lever?", cue_word: "who", is_missing: true, acceptable_questions: ["Who pulled the release lever?", "Who operated the metal lever?", "Who pulled the machine lever?"], nova_reply: "Alex and Mia pulled the brass lever together with Mr. Davis." },
          { id: "field_a5", cue_prompt: "what / final equation sentence?", cue_word: "what", is_missing: true, acceptable_questions: ["What was the final equation sentence?", "What equation did they read aloud?", "What is the math sentence?"], nova_reply: "They read aloud: five plus three equals eight marbles in total." }
        ]
      },
      table_b: {
        title: "Mia's Wooden Block Addition Experiment",
        subtitle: "Information Card (Answer Examiner's Questions)",
        person: "Mia",
        fields: [
          { id: "field_b1", cue_prompt: "how many / yellow blocks on table?", cue_word: "how", value: "Six bright yellow wooden blocks stacked in a row.", nova_question: "How many yellow blocks did Mia start with on her table?", acceptable_answers: ["Six bright yellow wooden blocks stacked in a row.", "Six yellow blocks.", "Six blocks."] },
          { id: "field_b2", cue_prompt: "what / blocks did Alex add?", cue_word: "what", value: "Four green rectangular blocks from the toy chest.", nova_question: "What blocks did Alex add to Mia's yellow stack?", acceptable_answers: ["Four green rectangular blocks from the toy chest.", "Four green rectangular blocks.", "Four green blocks."] },
          { id: "field_b3", cue_prompt: "where / stack the combined blocks?", cue_word: "where", value: "On the wide wooden workbench beside the Plus Machine.", nova_question: "Where did the children stack all the combined blocks?", acceptable_answers: ["On the wide wooden workbench beside the Plus Machine.", "On the wide wooden workbench.", "On the workbench."] },
          { id: "field_b4", cue_prompt: "how many / blocks altogether?", cue_word: "how", value: "Ten blocks altogether forming a tall colorful tower.", nova_question: "How many blocks were there altogether in the finished tower?", acceptable_answers: ["Ten blocks altogether forming a tall colorful tower.", "Ten blocks altogether.", "Ten blocks."] },
          { id: "field_b5", cue_prompt: "why / activity fun?", cue_word: "why", value: "Because building blocks makes addition easy to see.", nova_question: "Why was this block building activity fun for the class?", acceptable_answers: ["Because building blocks makes addition easy to see.", "It makes addition easy to see.", "Because it was easy to see."] }
        ]
      }
    }
  },
  cambridge_rw: {
    part1_definitions: [
      { id: 1, text: "A preposition used in math that means combined with another number.", target: "plus" },
      { id: 2, text: "To join two or more quantities together to find a bigger amount.", target: "add" },
      { id: 3, text: "The complete amount calculated when every separate part is counted.", target: "total" },
      { id: 4, text: "A small solid cube of wood or plastic used for building toys.", target: "block" },
      { id: 5, text: "A mechanical device with moving parts designed to do practical tasks.", target: "machine" }
    ],
    part2_dialogue: {
      title: "Alex & Mia Discussing the Plus Machine",
      turns: [
        {
          id: 1,
          speaker: "Alex",
          prompt: "Mia, did you see how the marbles rolled down the wooden chute?",
          options: [
            "Yes, they rolled quickly into the center funnel.",
            "No, I never drink cold water in the morning.",
            "The bicycle has two rubber tires."
          ],
          answer: "Yes, they rolled quickly into the center funnel."
        },
        {
          id: 2,
          speaker: "Alex",
          prompt: "What happens when we add four marbles and three marbles?",
          options: [
            "Four plus three equals seven marbles in total.",
            "Four minus three leaves one pencil.",
            "They turn into purple birds."
          ],
          answer: "Four plus three equals seven marbles in total."
        },
        {
          id: 3,
          speaker: "Alex",
          prompt: "Why does Mr. Davis tell us to read equations as sentences?",
          options: [
            "Because reading complete sentences helps us think logically.",
            "Because he lost his reading glasses.",
            "So we can paint the classroom walls."
          ],
          answer: "Because reading complete sentences helps us think logically."
        },
        {
          id: 4,
          speaker: "Alex",
          prompt: "Can we use wooden blocks to test another addition problem?",
          options: [
            "Yes, let's combine six yellow blocks and four green blocks!",
            "I ate an apple twenty minutes ago.",
            "No, it is too cold to swim today."
          ],
          answer: "Yes, let's combine six yellow blocks and four green blocks!"
        },
        {
          id: 5,
          speaker: "Alex",
          prompt: "Shall we write these math sentences on the whiteboard?",
          options: [
            "Great idea! Let's write them neatly right now.",
            "My shoes are under the bed.",
            "It costs fifty pence at the shop."
          ],
          answer: "Great idea! Let's write them neatly right now."
        }
      ],
      exchanges: [
        { speaker: "Alex", text: "Mia, did you see how the marbles rolled down the wooden chute?" },
        { speaker: "Mia", text: "Yes, they rolled quickly into the center funnel." },
        { speaker: "Alex", text: "What happens when we add four marbles and three marbles?" },
        { speaker: "Mia", text: "Four plus three equals seven marbles in total." },
        { speaker: "Alex", text: "Why does Mr. Davis tell us to read equations as sentences?" },
        { speaker: "Mia", text: "Because reading complete sentences helps us think logically." },
        { speaker: "Alex", text: "Can we use wooden blocks to test another addition problem?" },
        { speaker: "Mia", text: "Yes, let's combine six yellow blocks and four green blocks!" },
        { speaker: "Alex", text: "Shall we write these math sentences on the whiteboard?" },
        { speaker: "Mia", text: "Great idea! Let's write them neatly right now." }
      ]
    },
    part6_cloze: {
      title: "Alex's Workshop Notes: The Plus Machine",
      instructions: "Read the workshop notes and write the missing words. Write one word on each line.",
      text_template: "Today we tested [1]_____ amazing Plus Machine. When Alex dropped four marbles, Mia [2]_____ three more. The machine helped us [3]_____ both groups together. Four plus three [4]_____ seven in total. Adding items makes math easy [5]_____ understand.",
      answers: { "1": "an", "2": "added", "3": "combine", "4": "equals", "5": "to" }
    }
  },
  minigames: {
    math_problems: [
      {
        id: "w43_p1",
        type: "part_whole",
        title: "Combining Workshop Marbles",
        question: "Alex dropped 25 red marbles into the Plus Machine and Mia dropped 15 blue marbles. How many marbles did they combine in total?",
        storyContext: "Alex and Mia tally the total marbles collected in the wooden tray.",
        modelData: {
          bars: [
            { label: "Red Marbles", value: 25, color: "#ef4444" },
            { label: "Blue Marbles", value: 15, color: "#3b82f6" }
          ],
          total: 40,
          unit: "marbles"
        },
        target_answer: 40,
        unit: "marbles",
        steps: [
          "Count the red marbles: 25 marbles.",
          "Add the blue marbles: 15 marbles.",
          "25 + 15 = 40 marbles in total."
        ]
      },
      {
        id: "w43_p2",
        type: "part_whole",
        title: "Wooden Blocks for the Tower",
        question: "The students stacked 32 yellow blocks and 28 green blocks to build a tower. How many blocks did they use altogether?",
        storyContext: "Mr. Davis measures the tall tower built from combined wooden toy blocks.",
        modelData: {
          bars: [
            { label: "Yellow Blocks", value: 32, color: "#eab308" },
            { label: "Green Blocks", value: 28, color: "#22c55e" }
          ],
          total: 60,
          unit: "blocks"
        },
        target_answer: 60,
        unit: "blocks",
        steps: [
          "Take the yellow blocks: 32 blocks.",
          "Add the green blocks: 28 blocks.",
          "32 + 28 = 60 blocks altogether."
        ]
      }
    ],
    action_lab_scenarios: [
      {
        stage: 1,
        title: "Addition Sentence Builder",
        diagram_type: "equation_builder_slots",
        instruction: "Drag the numbers and math words into the correct slots to make a true sentence.",
        items: [
          { label: "Number Slot: 4", target: "first_number" },
          { label: "Math Word: plus", target: "math_operator" },
          { label: "Number Slot: 3", target: "second_number" },
          { label: "Verb Slot: equals 7", target: "sum_result" }
        ]
      },
      {
        stage: 2,
        title: "Machine Chute Sorting",
        diagram_type: "dual_chute_distributor",
        instruction: "Sort the items into Chute A and Chute B before pulling the combine lever.",
        items: [
          { label: "5 Red Glass Spheres", target: "chute_a" },
          { label: "5 Blue Glass Spheres", target: "chute_b" },
          { label: "Combined Output Tray: 10 Spheres", target: "tray_result" }
        ]
      },
      {
        stage: 3,
        title: "Total Sum Verification",
        diagram_type: "math_scale_balance",
        instruction: "Match each addition equation to its correct total sum.",
        items: [
          { label: "12 plus 8", target: "equals_20" },
          { label: "15 plus 15", target: "equals_30" },
          { label: "24 plus 6", target: "equals_30" }
        ]
      }
    ],
    grammar_drills: [
      { sentence: "Four plus five equals nine on the chalkboard.", options: ["equals", "equal", "equaling"], answer: "equals", explanation: "Use 3rd person singular 'equals' when stating mathematical equations." },
      { sentence: "We can combine two groups of blocks together.", options: ["combine", "combines", "combined"], answer: "combine", explanation: "Use bare infinitive 'combine' after the modal auxiliary 'can'." },
      { sentence: "If you add three red marbles, you get seven.", options: ["add", "adds", "added"], answer: "add", explanation: "Use base verb 'add' with subject 'you' in present conditional." },
      { sentence: "The total number of wooden blocks is twenty.", options: ["is", "are", "were"], answer: "is", explanation: "Use singular verb 'is' with the singular head noun 'The total number'." },
      { sentence: "Six and four make ten blocks altogether.", options: ["altogether", "almost", "already"], answer: "altogether", explanation: "Use adverb 'altogether' meaning 'in total sum'." }
    ]
  }
};
