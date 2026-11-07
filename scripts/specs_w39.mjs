/**
 * scripts/specs_w39.mjs
 * Week 39: Habitats (Persuasion Intro)
 */

export const w39 = {
  week: 39,
  theme: "Habitats (Persuasion Intro)",
  title_en: "Habitats and Animal Homes",
  title_vi: "Môi Trường Sống và Nơi Ở Của Động Vật",
  cefr_level: "A2 Flyers",
  grammar_focus: "I think the [animal] lives in the [place]",
  vocab_list: [
    { id: 1, word: "habitat", pos: "n", ipa: "/ˈhæbɪtæt/", definition_en: "The natural home or environment of an animal or plant", definition_vi: "môi trường sống", example_en: "The dense green jungle is a natural habitat for monkeys.", example_vi: "Khu rừng rậm xanh tươi là môi trường sống tự nhiên của loài khỉ." },
    { id: 2, word: "desert", pos: "n", ipa: "/ˈdezərt/", definition_en: "A dry sandy area with very little water and few plants", definition_vi: "sa mạc", example_en: "Camels can walk for days across the hot desert.", example_vi: "Lạc đà có thể đi bộ nhiều ngày băng qua sa mạc nóng bỏng." },
    { id: 3, word: "rainforest", pos: "n", ipa: "/ˈreɪnfɔːrɪst/", definition_en: "A thick tropical forest with tall trees and heavy rain", definition_vi: "rừng mưa nhiệt đới", example_en: "Many colorful birds live high in the tropical rainforest.", example_vi: "Nhiều loài chim rực rỡ sắc màu sống trên cao trong rừng mưa nhiệt đới." },
    { id: 4, word: "ocean", pos: "n", ipa: "/ˈoʊʃən/", definition_en: "A very large body of salt water covering much of Earth", definition_vi: "đại dương", example_en: "Blue whales swim across the cold and deep ocean.", example_vi: "Cá voi xanh bơi qua đại dương sâu thẳm và lạnh giá." },
    { id: 5, word: "polar", pos: "adj", ipa: "/ˈpoʊlər/", definition_en: "Relating to the North or South Pole and icy cold lands", definition_vi: "thuộc vùng cực", example_en: "Penguins stay warm in the chilly polar region.", example_vi: "Chim cánh cụt giữ ấm trong vùng cực lạnh giá." },
    { id: 6, word: "safe", pos: "adj", ipa: "/seɪf/", definition_en: "Protected from danger, harm, or bad weather", definition_vi: "an toàn", example_en: "The baby birds felt safe inside their warm nest.", example_vi: "Những chú chim non cảm thấy an toàn bên trong chiếc tổ ấm áp." },
    { id: 7, word: "dangerous", pos: "adj", ipa: "/ˈdeɪndʒərəs/", definition_en: "Likely to cause harm or injury", definition_vi: "nguy hiểm", example_en: "Deep fast rivers can be dangerous for young animals.", example_vi: "Những dòng sông sâu chảy xiết có thể nguy hiểm cho động vật non." },
    { id: 8, word: "burrow", pos: "n", ipa: "/ˈbɜːroʊ/", definition_en: "A hole or tunnel in the ground made by small animals", definition_vi: "hang đất", example_en: "The desert tortoise slept inside a cool underground burrow.", example_vi: "Chú rùa sa mạc ngủ bên trong một chiếc hang đất mát mẻ dưới lòng đất." },
    { id: 9, word: "shelter", pos: "n", ipa: "/ˈʃeltər/", definition_en: "A place giving protection from bad weather or enemies", definition_vi: "nơi trú ẩn", example_en: "Animals search for warm shelter before a winter storm.", example_vi: "Các loài động vật tìm kiếm nơi trú ẩn ấm áp trước cơn bão mùa đông." },
    { id: 10, word: "survive", pos: "v", ipa: "/sərˈvaɪv/", definition_en: "Continue to live in challenging conditions", definition_vi: "sống sót, sinh tồn", example_en: "Cacti store water to survive dry sunny months.", example_vi: "Cây xương rồng tích trữ nước để sinh tồn qua những tháng nắng hạn." },
    { id: 11, word: "camel", pos: "n", ipa: "/ˈkæməl/", definition_en: "A large animal with humps that lives in dry deserts", definition_vi: "lạc đà", example_en: "The strong camel carried heavy bags across sand dunes.", example_vi: "Chú lạc đà khỏe mạnh chở những bao hàng nặng qua các cồn cát." },
    { id: 12, word: "creature", pos: "n", ipa: "/ˈkriːtʃər/", definition_en: "An animal, fish, bird, or other living being", definition_vi: "sinh vật", example_en: "The coral reef is home to every sea creature.", example_vi: "Rạn san hô là ngôi nhà của mọi sinh vật biển." },
    { id: 13, word: "protect", pos: "v", ipa: "/prəˈtekt/", definition_en: "Keep someone or something safe from harm", definition_vi: "bảo vệ", example_en: "Thick fur helps protect arctic foxes from icy snow.", example_vi: "Bộ lông dày giúp bảo vệ loài cáo tuyết khỏi băng tuyết lạnh buốt." },
    { id: 14, word: "wildlife", pos: "n", ipa: "/ˈwaɪldlaɪf/", definition_en: "Wild animals and plants living in their natural state", definition_vi: "động vật hoang dã", example_en: "Rangers protect wildlife in the national park reserve.", example_vi: "Các kiểm lâm viên bảo vệ động vật hoang dã trong khu bảo tồn vườn quốc gia." },
    { id: 15, word: "climate", pos: "n", ipa: "/ˈklaɪmət/", definition_en: "The usual weather conditions of a particular region", definition_vi: "khí hậu", example_en: "The rainforest has a warm and wet tropical climate.", example_vi: "Rừng mưa nhiệt đới có khí hậu nóng ẩm quanh năm." },
    { id: 16, word: "shallow", pos: "adj", ipa: "/ˈʃæloʊ/", definition_en: "Not deep; measuring little from top to bottom", definition_vi: "nông, cạn", example_en: "Young fish feed in the shallow sunny waters.", example_vi: "Cá con kiếm ăn trong những vùng nước nông đầy ánh nắng." },
    { id: 17, word: "belong", pos: "v", ipa: "/bɪˈlɔːŋ/", definition_en: "Be in the right or suitable place", definition_vi: "thuộc về", example_en: "I think polar bears belong in icy arctic regions.", example_vi: "Tôi nghĩ gấu bắc cực thuộc về những vùng băng giá bắc cực." },
    { id: 18, word: "opinion", pos: "n", ipa: "/əˈpɪnjən/", definition_en: "A personal view or judgment about something", definition_vi: "ý kiến", example_en: "In my opinion, every animal needs a safe home.", example_vi: "Theo ý kiến của tôi, mọi loài động vật đều cần một ngôi nhà an toàn." },
    { id: 19, word: "canopy", pos: "n", ipa: "/ˈkænəpi/", definition_en: "The high roof of leafy branches formed by tall trees", definition_vi: "tầng tán rừng", example_en: "Monkeys swing quickly across the tall forest canopy.", example_vi: "Những chú khỉ đu mình nhanh thoăn thoắt qua tầng tán rừng cao vút." },
    { id: 20, word: "reserve", pos: "n", ipa: "/rɪˈzɜːrv/", definition_en: "A protected natural area set aside for wildlife", definition_vi: "khu bảo tồn", example_en: "We saw wild elephants inside the nature reserve.", example_vi: "Chúng tôi đã nhìn thấy những chú voi hoang dã bên trong khu bảo tồn thiên nhiên." }
  ],
  clil: {
    title_en: "Earth's Diverse Animal Habitats",
    title_vi: "Các Môi Trường Sống Đa Dạng Trên Trái Đất",
    content_en: "Our planet has four major habitats that shelter wildlife. Deserts are dry sandy places with very little rainfall. Animals like camels and lizards survive there by finding water in plants. In contrast, tropical rainforests receive daily rain. Tall trees create a leafy canopy where parrots and tree frogs live safely. Oceans cover most of our world with salty water. Whales and sea turtles swim in deep blue water where food is plentiful. Cold polar regions are covered in thick white ice. Thick fur and fat help seals and penguins stay warm in freezing winds. In my opinion, every creature needs a safe habitat to grow and thrive. When humans protect these habitats, all wild animals remain safe.",
    glossary: [
      { word: "habitat", definition_en: "The natural home where an animal or plant lives", definition_vi: "môi trường sống tự nhiên" },
      { word: "desert", definition_en: "A dry land area with little rain and sparse plants", definition_vi: "vùng đất sa mạc khô hạn" },
      { word: "rainforest", definition_en: "A dense tropical forest with tall trees and heavy rain", definition_vi: "rừng mưa nhiệt đới rậm rạp" },
      { word: "canopy", definition_en: "The high leafy ceiling of tall forest trees", definition_vi: "tầng tán lá trên cao của rừng" },
      { word: "shelter", definition_en: "A protective place that keeps animals safe", definition_vi: "nơi trú ẩn an toàn" }
    ],
    check_questions: [
      { id: 1, question_en: "How do animals survive in the dry desert?", options: ["By finding water in plants and hiding in cool burrows", "By swimming in deep rivers", "By building high leafy nests in trees"], answer: "By finding water in plants and hiding in cool burrows" },
      { id: 2, question_en: "Where do colorful parrots and tree frogs live safely in rainforests?", options: ["In deep ocean waters", "Under cold polar ice", "In the high leafy canopy formed by tall trees"], answer: "In the high leafy canopy formed by tall trees" },
      { id: 3, question_en: "Why do polar animals stay warm in freezing weather?", options: ["They build brick houses", "They have thick fur and layers of fat", "They fly to the desert every night"], answer: "They have thick fur and layers of fat" }
    ]
  },
  shadowing_sentences: [
    { id: 1, text: "Every animal needs a safe natural habitat to survive.", en: "Every animal needs a safe natural habitat to survive.", vi: "Mọi loài động vật đều cần một môi trường sống tự nhiên an toàn để sinh tồn.", ipa: "/ˈevri ˈænɪməl niːdz ə seɪf ˈnætʃərəl ˈhæbɪtæt tuː sərˈvaɪv/", words: ["Every", "animal", "needs", "a", "safe", "natural", "habitat", "to", "survive"] },
    { id: 2, text: "Camels walk across the hot and sandy desert easily.", en: "Camels walk across the hot and sandy desert easily.", vi: "Lạc đà đi bộ băng qua sa mạc nóng cát một cách dễ dàng.", ipa: "/ˈkæməlz wɔːk əˈkrɔːs ðə hɑːt ænd ˈsændi ˈdezərt ˈiːzɪli/", words: ["Camels", "walk", "across", "the", "hot", "and", "sandy", "desert", "easily"] },
    { id: 3, text: "Colorful parrots build nests high in the rainforest canopy.", en: "Colorful parrots build nests high in the rainforest canopy.", vi: "Những chú vẹt rực rỡ sắc màu làm tổ trên cao tại tán rừng nhiệt đới.", ipa: "/ˈkʌlərfəl ˈpærəts bɪld nests haɪ ɪn ðə ˈreɪnfɔːrɪst ˈkænəpi/", words: ["Colorful", "parrots", "build", "nests", "high", "in", "the", "rainforest", "canopy"] },
    { id: 4, text: "Giant blue whales swim through the deep salty ocean.", en: "Giant blue whales swim through the deep salty ocean.", vi: "Những chú cá voi xanh khổng lồ bơi qua đại dương mặn sâu thẳm.", ipa: "/ˈdʒaɪənt bluː weɪlz swɪm θruː ðə diːp ˈsɔːlti ˈoʊʃən/", words: ["Giant", "blue", "whales", "swim", "through", "the", "deep", "salty", "ocean"] },
    { id: 5, text: "Penguins huddle together in the freezing polar region.", en: "Penguins huddle together in the freezing polar region.", vi: "Chim cánh cụt đứng quây quần bên nhau tại vùng cực băng giá.", ipa: "/ˈpeŋɡwɪnz ˈhʌdəl təˈɡeðər ɪn ðə ˈfriːzɪŋ ˈpoʊlər ˈriːdʒən/", words: ["Penguins", "huddle", "together", "in", "the", "freezing", "polar", "region"] },
    { id: 6, text: "I think the desert tortoise belongs in a warm burrow.", en: "I think the desert tortoise belongs in a warm burrow.", vi: "Tôi nghĩ chú rùa sa mạc thuộc về một chiếc hang đất ấm áp.", ipa: "/aɪ θɪŋk ðə ˈdezərt ˈtɔːrtəs bɪˈlɔːŋz ɪn ə wɔːrm ˈbɜːroʊ/", words: ["I", "think", "the", "desert", "tortoise", "belongs", "in", "a", "warm", "burrow"] },
    { id: 7, text: "Rangers protect wildlife inside the large nature reserve.", en: "Rangers protect wildlife inside the large nature reserve.", vi: "Các kiểm lâm viên bảo vệ động vật hoang dã bên trong khu bảo tồn thiên nhiên lớn.", ipa: "/ˈreɪndʒərz prəˈtekt ˈwaɪldlaɪf ɪnˈsaɪd ðə lɑːrdʒ ˈneɪtʃər rɪˈzɜːrv/", words: ["Rangers", "protect", "wildlife", "inside", "the", "large", "nature", "reserve"] },
    { id: 8, text: "In my opinion, we must keep animal habitats clean.", en: "In my opinion, we must keep animal habitats clean.", vi: "Theo ý kiến của tôi, chúng ta phải giữ gìn môi trường sống của động vật luôn sạch sẽ.", ipa: "/ɪn maɪ əˈpɪnjən wiː mʌst kiːp ˈænɪməl ˈhæbɪtæts kliːn/", words: ["In", "my", "opinion", "we", "must", "keep", "animal", "habitats", "clean"] }
  ],
  story_scenes: [
    { id: 1, scene_id: "scene_1", scene_number: 1, title_en: "Entering the Habitat Sanctuary", title_vi: "Bước Vào Khu Bảo Tồn Môi Trường Sống", description_en: "Liam and Emma walk past wooden welcome arches at the Green Valley Wildlife Reserve.", description: "Liam and Emma walk past wooden welcome arches at the Green Valley Wildlife Reserve.", image_url: "/images/week39/webtoon_scene_1.png", audio_url: "/audio/week39/scene_1.mp3" },
    { id: 2, scene_id: "scene_2", scene_number: 2, title_en: "The Dry Desert Enclosure", title_vi: "Khu Vực Sa Mạc Khô Hạn", description_en: "Liam watches a desert tortoise move under the shadow of a big stone near dry bushes.", description: "Liam watches a desert tortoise move under the shadow of a big stone near dry bushes.", image_url: "/images/week39/webtoon_scene_2.png", audio_url: "/audio/week39/scene_2.mp3" },
    { id: 3, scene_id: "scene_3", scene_number: 3, title_en: "The Rainforest Canopy Boardwalk", title_vi: "Cầu Gỗ Tầng Tán Rừng Mưa", description_en: "Emma looks up into tall tropical trees as parrots flutter and call overhead.", description: "Emma looks up into tall tropical trees as parrots flutter and call overhead.", image_url: "/images/week39/webtoon_scene_3.png", audio_url: "/audio/week39/scene_3.mp3" },
    { id: 4, scene_id: "scene_4", scene_number: 4, title_en: "The Polar Pool Sanctuary", title_vi: "Hồ Nước Vùng Cực Băng Giá", description_en: "Two black and white penguins slide down ice blocks into clean, chilled pool water.", description: "Two black and white penguins slide down ice blocks into clean, chilled pool water.", image_url: "/images/week39/webtoon_scene_4.png", audio_url: "/audio/week39/scene_4.mp3" },
    { id: 5, scene_id: "scene_5", scene_number: 5, title_en: "Sharing Habitat Opinions", title_vi: "Chia Sẻ Ý Kiến Về Nơi Ở Động Vật", description_en: "Ranger David stamps Liam and Emma's Junior Ranger books with colorful habitat stickers.", description: "Ranger David stamps Liam and Emma's Junior Ranger books with colorful habitat stickers.", image_url: "/images/week39/webtoon_scene_5.png", audio_url: "/audio/week39/scene_5.mp3" }
  ],
  writing_data: {
    title: "Matching Animals to Safe Habitats",
    prompt_en: "Look at the four pictures. Tell a story about Liam and Emma helping animals find their natural habitats. Write 20 or more words.",
    prompt_vi: "Nhìn vào 4 bức tranh. Kể câu chuyện về Liam và Emma giúp các loài động vật tìm về môi trường sống an toàn (từ 20 từ trở lên).",
    min_sentences: 3,
    min_words: 20,
    max_words: 80,
    model_sentence: "Liam and Emma visited the wildlife sanctuary on Saturday morning. First, they saw a desert tortoise walking slowly across dry sand. Next, they observed a colorful parrot resting in the rainforest canopy. In the end, they agreed that every animal belongs in its natural habitat.",
    word_bank: ["habitat", "desert", "rainforest", "canopy", "shelter", "belong", "opinion", "safe", "creature", "survive"],
    sentence_frames: [
      "In the beginning, Liam and Emma visited the ___ nature reserve.",
      "They believed that the desert tortoise belongs in a warm ___.",
      "High above, colorful parrots rested inside the green ___.",
      "In the end, everyone agreed that wild animals need a ___ home."
    ],
    panels: [
      {
        panel_id: "panel_1",
        title_en: "Scene 1: Visiting Nature Reserve",
        title_vi: "Cảnh 1: Thăm Khu Bảo Tồn",
        image_url: "/images/week39/writing_panel_1.png",
        image_prompt: "Two children with backpacks looking at an outdoor wildlife sanctuary map with desert, forest, and ocean zones.",
        caption: "Liam and Emma visited the wildlife reserve to learn about animal habitats.",
        sentence_frame: "First, Liam and Emma [visited the wildlife reserve] on a [sunny Saturday morning].",
        pills: ["visited the wildlife reserve", "sunny Saturday morning", "looked at the map", "Liam and Emma"],
        connectors: ["First,", "On Saturday morning,", "In the beginning,"]
      },
      {
        panel_id: "panel_2",
        title_en: "Scene 2: Sandy Desert Zone",
        title_vi: "Cảnh 2: Khu Vực Sa Mạc Cát",
        image_url: "/images/week39/writing_panel_2.png",
        image_prompt: "A friendly tortoise resting near a sandy burrow beside small desert rocks and green cacti.",
        caption: "They observed a desert tortoise near its warm underground burrow.",
        sentence_frame: "Next, they saw a [desert tortoise] resting beside its [sandy burrow].",
        pills: ["desert tortoise", "sandy burrow", "warm dry rocks", "crawled slowly"],
        connectors: ["Next,", "Then,", "Also,"]
      },
      {
        panel_id: "panel_3",
        title_en: "Scene 3: Rainforest Canopy Zone",
        title_vi: "Cảnh 3: Tầng Tán Rừng Mưa",
        image_url: "/images/week39/writing_panel_3.png",
        image_prompt: "A bright green parrot perching on a flowering tree branch high in a leafy rainforest canopy.",
        caption: "A bright parrot called out from the tall rainforest canopy.",
        sentence_frame: "After that, they spotted a [colorful parrot] high in the [leafy rainforest canopy].",
        pills: ["colorful parrot", "leafy rainforest canopy", "tall green branches", "flew gracefully"],
        connectors: ["After that,", "Later,", "Also,"]
      },
      {
        panel_id: "panel_4",
        title_en: "Scene 4: Happy Conclusion",
        title_vi: "Cảnh 4: Kết Luận Hạnh Phúc",
        image_url: "/images/week39/writing_panel_4.png",
        image_prompt: "Two smiling children talking with a park ranger in front of a green wooden wildlife protection sign.",
        caption: "Everyone agreed that every creature needs a safe natural habitat.",
        sentence_frame: "In the end, they agreed that [every animal belongs] in its [safe natural habitat].",
        pills: ["every animal belongs", "safe natural habitat", "gave a thumbs up", "smiled happily"],
        connectors: ["In the end,", "Finally,", "At last,"]
      }
    ],
    ladder_stages: [
      {
        badge_label: "MODEL",
        title: "Scene 1: Visiting Nature Reserve",
        image_url: "/images/week39/writing_panel_1.png",
        caption: "Liam and Emma visited the wildlife reserve to learn about animal habitats.",
        frame_L1: "First, Liam and Emma visited the wildlife reserve. They wanted to learn where each animal lives safely.",
        connectors: ["First,", "On Saturday morning,", "In the beginning,"],
        sentence_hint: "Write 2 sentences about visiting the wildlife reserve.",
        ordered_chips: ["Liam and Emma", "visited the wildlife reserve", "to learn where", "animals live safely"],
        pills: ["Liam and Emma", "visited the wildlife reserve", "looked at the map", "sunny morning"],
        sentence_frame: "First, Liam and Emma [visited the wildlife reserve] to learn where [animals live safely]."
      },
      {
        badge_label: "BUILD",
        title: "Scene 2: Sandy Desert Zone",
        image_url: "/images/week39/writing_panel_2.png",
        caption: "They observed a desert tortoise near its warm underground burrow.",
        frame_L1: "Next, they saw a desert tortoise. It crawled slowly toward a cool sandy burrow.",
        connectors: ["Next,", "Then,", "Also,"],
        sentence_hint: "Write 2 sentences about the tortoise and its burrow.",
        pills: ["desert tortoise", "sandy burrow", "crawled slowly", "Liam"],
        sentence_frame: "Next, they saw a [desert tortoise] crawling near a [sandy burrow]."
      },
      {
        badge_label: "WRITE",
        title: "Scene 3: Rainforest Canopy Zone",
        image_url: "/images/week39/writing_panel_3.png",
        caption: "A bright parrot called out from the tall rainforest canopy.",
        frame_L1: "After that, they spotted a colorful parrot. It flew high into the green rainforest canopy.",
        connectors: ["After that,", "Later,", "Also,"],
        sentence_hint: "Write 2 sentences about the parrot in the canopy.",
        pills: ["colorful parrot", "rainforest canopy", "flew high", "green branches"],
        sentence_frame: "After that, they spotted a [colorful parrot] high in the [rainforest canopy]."
      },
      {
        badge_label: "EXPAND",
        title: "Scene 4: Safe Animal Habitats",
        image_url: "/images/week39/writing_panel_4.png",
        caption: "Everyone agreed that every creature needs a safe natural habitat.",
        frame_L1: "In the end, the children spoke with Ranger David. They agreed that every animal belongs in a safe habitat.",
        connectors: ["In the end,", "Finally,", "At last,"],
        sentence_hint: "Write 2 sentences about keeping animal habitats safe.",
        pills: ["every animal belongs", "safe habitat", "Ranger David", "smiled happily"],
        sentence_frame: "In the end, they agreed that [every animal belongs] in a [safe habitat]."
      }
    ]
  },
  speaking_data: {
    talkshow_prompt: {
      topic: "Matching Animals to Their Natural Homes",
      question: "Hi Liam! In your opinion, why does a desert tortoise belong in a dry sandy habitat?",
      model_response: "In my opinion, the tortoise belongs in the desert because its body needs warm sun and dry rocks! It digs a cool burrow underground when the afternoon gets too hot. If we put it in a wet polar zone, it could not survive. Every creature needs the right home!"
    },
    info_exchange_cards: {
      table_a: {
        title: "Liam's Desert Tortoise Project",
        subtitle: "Candidate's Question Card (Ask Examiner)",
        person: "Liam",
        fields: [
          { id: "field_a1", cue_prompt: "where / tortoise live?", cue_word: "where", is_missing: true, acceptable_questions: ["Where does the desert tortoise live?", "Where does the tortoise live?", "Where is the tortoise's home?"], nova_reply: "The desert tortoise lives in a sandy underground burrow." },
          { id: "field_a2", cue_prompt: "what / eat for food?", cue_word: "what", is_missing: true, acceptable_questions: ["What does the desert tortoise eat for food?", "What does it eat?", "What food does the tortoise like?"], nova_reply: "It eats desert grasses, dry leaves, and juicy cactus flowers." },
          { id: "field_a3", cue_prompt: "how / stay cool?", cue_word: "how", is_missing: true, acceptable_questions: ["How does the tortoise stay cool?", "How does it stay cool in the desert?", "How does it escape the hot sun?"], nova_reply: "It crawls deep inside its cool burrow during sunny afternoons." },
          { id: "field_a4", cue_prompt: "who / protects its habitat?", cue_word: "who", is_missing: true, acceptable_questions: ["Who protects its natural habitat?", "Who protects the tortoise?", "Who guards the desert reserve?"], nova_reply: "Friendly wildlife rangers protect the desert reserve from danger." },
          { id: "field_a5", cue_prompt: "why / shell so hard?", cue_word: "why", is_missing: true, acceptable_questions: ["Why is the tortoise's shell so hard?", "Why does it have a hard shell?", "Why is its shell strong?"], nova_reply: "Its hard shell protects its soft body from enemies and falling stones." }
        ]
      },
      table_b: {
        title: "Emma's Arctic Fox Project",
        subtitle: "Information Card (Answer Examiner's Questions)",
        person: "Emma",
        fields: [
          { id: "field_b1", cue_prompt: "where / arctic fox live?", cue_word: "where", value: "In icy snowy burrows across the cold polar region.", nova_question: "Where does Emma's arctic fox make its winter home?", acceptable_answers: ["In icy snowy burrows across the cold polar region.", "In snowy burrows.", "In the cold polar region."] },
          { id: "field_b2", cue_prompt: "what / color of fur in winter?", cue_word: "what", value: "Pure thick white fur to hide in the snow.", nova_question: "What color is the arctic fox's thick winter fur?", acceptable_answers: ["Pure thick white fur to hide in the snow.", "Thick white fur.", "Pure white fur."] },
          { id: "field_b3", cue_prompt: "how / stay warm in wind?", cue_word: "how", value: "It curls its fluffy bushy tail around its face.", nova_question: "How does the fox stay warm during freezing polar winds?", acceptable_answers: ["It curls its fluffy bushy tail around its face.", "With its bushy tail.", "By curling its tail around its face."] },
          { id: "field_b4", cue_prompt: "who / cares for the cubs?", cue_word: "who", value: "Both the mother and father fox protect their cubs.", nova_question: "Who cares for the young fox cubs in the den?", acceptable_answers: ["Both the mother and father fox protect their cubs.", "Both mother and father fox.", "The parent foxes."] },
          { id: "field_b5", cue_prompt: "why / polar home special?", cue_word: "why", value: "It has clean ice and open snowy hills to hunt.", nova_question: "Why is the polar region a special habitat for this fox?", acceptable_answers: ["It has clean ice and open snowy hills to hunt.", "It has clean ice and snow.", "Because it loves open snowy hills."] }
        ]
      }
    }
  },
  cambridge_rw: {
    part1_definitions: [
      { id: 1, text: "The natural home or area where an animal or plant lives safely.", target: "habitat" },
      { id: 2, text: "A very dry place with lots of sand and few plants.", target: "desert" },
      { id: 3, text: "The high leafy branches at the top of tall trees in a forest.", target: "canopy" },
      { id: 4, text: "A vast area of deep salt water where whales and sharks swim.", target: "ocean" },
      { id: 5, text: "A place that keeps animals warm and safe from rain or cold.", target: "shelter" }
    ],
    part2_dialogue: {
      title: "Liam & Emma Discussing Animal Habitats",
      turns: [
        {
          id: 1,
          speaker: "Liam",
          prompt: "Emma, where do you think this desert tortoise belongs?",
          options: [
            "I think it belongs in a dry sandy burrow.",
            "Yes, it lives in a tall green tree.",
            "It likes swimming in the deep ocean."
          ],
          answer: "I think it belongs in a dry sandy burrow."
        },
        {
          id: 2,
          speaker: "Liam",
          prompt: "Why can't the tortoise live in the cold polar zone?",
          options: [
            "Because it needs warm sand and sunny rocks.",
            "Because it has wings to fly away.",
            "No, it likes freezing snowy weather."
          ],
          answer: "Because it needs warm sand and sunny rocks."
        },
        {
          id: 3,
          speaker: "Liam",
          prompt: "What about this colorful parrot from the rainforest?",
          options: [
            "It belongs in the high leafy canopy.",
            "I think it lives in a cold cave.",
            "It swims under salty ocean water."
          ],
          answer: "It belongs in the high leafy canopy."
        },
        {
          id: 4,
          speaker: "Liam",
          prompt: "Is the nature reserve safe for all these wild animals?",
          options: [
            "Yes, the rangers protect every creature there.",
            "No, it is very dangerous inside.",
            "They lost their tickets yesterday."
          ],
          answer: "Yes, the rangers protect every creature there."
        },
        {
          id: 5,
          speaker: "Liam",
          prompt: "Shall we help Ranger David clean the habitat signs?",
          options: [
            "Good idea! Let's help right now.",
            "I do not like chocolate cake.",
            "Yes, the boat is blue."
          ],
          answer: "Good idea! Let's help right now."
        }
      ],
      exchanges: [
        { speaker: "Liam", text: "Emma, where do you think this desert tortoise belongs?" },
        { speaker: "Emma", text: "I think it belongs in a dry sandy burrow." },
        { speaker: "Liam", text: "Why can't the tortoise live in the cold polar zone?" },
        { speaker: "Emma", text: "Because it needs warm sand and sunny rocks." },
        { speaker: "Liam", text: "What about this colorful parrot from the rainforest?" },
        { speaker: "Emma", text: "It belongs in the high leafy canopy." },
        { speaker: "Liam", text: "Is the nature reserve safe for all these wild animals?" },
        { speaker: "Emma", text: "Yes, the rangers protect every creature there." },
        { speaker: "Liam", text: "Shall we help Ranger David clean the habitat signs?" },
        { speaker: "Emma", text: "Good idea! Let's help right now." }
      ]
    },
    part6_cloze: {
      title: "Liam's Diary: Animal Homes at the Reserve",
      instructions: "Read the diary and write the missing words. Write one word on each line.",
      text_template: "Dear Diary, today we visited [1]_____ wildlife reserve. A desert tortoise needs [2]_____ warm burrow to survive. High in the rainforest trees, parrots [3]_____ colorful nests. Ranger David explained that polar bears [4]_____ thick fur to stay warm. We agreed that all creatures [5]_____ in safe homes.",
      answers: { "1": "the", "2": "a", "3": "build", "4": "have", "5": "belong" }
    }
  },
  minigames: {
    math_problems: [
      {
        id: "w39_p1",
        type: "part_whole",
        title: "Wildlife Sanctuary Habitat Acres",
        question: "The Green Valley Sanctuary has 45 acres of desert land and 55 acres of rainforest land. How many acres does the sanctuary protect in total?",
        storyContext: "Ranger David measures the sanctuary boundary to make sure all animals have enough space.",
        modelData: {
          bars: [
            { label: "Desert Zone", value: 45, color: "#f59e0b" },
            { label: "Rainforest Zone", value: 55, color: "#10b981" }
          ],
          total: 100,
          unit: "acres"
        },
        target_answer: 100,
        unit: "acres",
        steps: [
          "Add the desert zone: 45 acres.",
          "Add the rainforest zone: 55 acres.",
          "45 + 55 = 100 acres in total."
        ]
      },
      {
        id: "w39_p2",
        type: "comparison",
        title: "Comparing Marine and Polar Animals",
        question: "The sanctuary rescued 36 marine turtles and 14 polar seabirds. How many more turtles were rescued than seabirds?",
        storyContext: "Emma tallies the rescued animals resting in safe recovery pools.",
        modelData: {
          bars: [
            { label: "Sea Turtles", value: 36, color: "#0ea5e9" },
            { label: "Polar Seabirds", value: 14, color: "#6366f1" }
          ],
          difference: 22,
          unit: "animals"
        },
        target_answer: 22,
        unit: "animals",
        steps: [
          "Start with the 36 sea turtles.",
          "Subtract the 14 polar seabirds.",
          "36 - 14 = 22 more sea turtles."
        ]
      }
    ],
    action_lab_scenarios: [
      {
        stage: 1,
        title: "Desert vs Polar Features",
        diagram_type: "habitat_temperature_cards",
        instruction: "Sort the survival adaptations into Desert or Polar categories.",
        items: [
          { label: "Thick Blubber Fat", target: "polar" },
          { label: "Water-Storing Hump", target: "desert" },
          { label: "Snow Camouflage Fur", target: "polar" },
          { label: "Cool Deep Burrow", target: "desert" }
        ]
      },
      {
        stage: 2,
        title: "Food and Shelter Matching",
        diagram_type: "food_shelter_slots",
        instruction: "Match each wild animal to its correct shelter and food source.",
        items: [
          { label: "Parrot -> Rainforest Canopy", target: "canopy" },
          { label: "Tortoise -> Sandy Burrow", target: "burrow" },
          { label: "Seal -> Icy Polar Shelf", target: "ice_shelf" }
        ]
      },
      {
        stage: 3,
        title: "Building a Safe Nature Reserve",
        diagram_type: "reserve_protection_plan",
        instruction: "Assemble the three essential elements of a safe animal sanctuary.",
        items: [
          { label: "Clean Freshwater Source", target: "resources" },
          { label: "Protected Leafy Shelter", target: "shelter" },
          { label: "Active Ranger Patrol", target: "safety" }
        ]
      }
    ],
    grammar_drills: [
      { sentence: "I think the camel belongs in the dry desert.", options: ["belongs", "belonging", "belonged"], answer: "belongs", explanation: "Use 3rd person singular present tense 'belongs' with 'the camel'." },
      { sentence: "Parrots build their nests high in the rainforest canopy.", options: ["build", "builds", "building"], answer: "build", explanation: "Use plural present form 'build' with 'parrots'." },
      { sentence: "Polar bears have thick white fur to stay warm.", options: ["have", "has", "having"], answer: "have", explanation: "Use plural verb 'have' with 'polar bears'." },
      { sentence: "The nature reserve is safe for all wild creatures.", options: ["safe", "safely", "safety"], answer: "safe", explanation: "Use adjective 'safe' after the linking verb 'is'." },
      { sentence: "In my opinion, every animal needs a protected habitat.", options: ["opinion", "idea", "mind"], answer: "opinion", explanation: "The standard collocation for giving a view is 'In my opinion'." }
    ]
  }
};
