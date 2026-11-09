/**
 * scripts/specs_w74.mjs
 * Week 74: Science/ELA: Food Chains / Math: Complex Charts
 * Stage 2: Cambridge Lower Secondary & B1 Preliminary
 */

export const w74 = {
  week: 74,
  theme: "Science/ELA: Food Chains / Math: Complex Charts",
  title_en: "Who Eats Who? Energy Flow in Nature",
  title_vi: "Ai Ăn Ai? Dòng Chảy Năng Lượng Trong Tự Nhiên",
  cefr_level: "B1 Preliminary",
  grammar_focus: "Zero Conditional (Scientific Facts): 'If plants die, animals have no food'",
  vocab_list: [
    { id: 1, word: "producer", pos: "n", ipa: "/prəˈduːsər/", definition_en: "An organism, such as a green plant, that creates its own food through photosynthesis", definition_vi: "sinh vật sản xuất", example_en: "Green plants act as the primary producer in every terrestrial ecosystem.", example_vi: "Cây xanh đóng vai trò là sinh vật sản xuất chính trong mọi hệ sinh thái trên cạn." },
    { id: 2, word: "consumer", pos: "n", ipa: "/kənˈsuːmər/", definition_en: "An organism that obtains energy by feeding on other organisms", definition_vi: "sinh vật tiêu thụ", example_en: "Rabbits and deer are herbivores that act as a primary consumer.", example_vi: "Thỏ và hươu là động vật ăn cỏ đóng vai trò là sinh vật tiêu thụ bậc một." },
    { id: 3, word: "predator", pos: "n", ipa: "/ˈpredətər/", definition_en: "An animal that naturally preys on and hunts other animals for sustenance", definition_vi: "động vật ăn thịt / kẻ săn mồi", example_en: "The red-tailed hawk is a fierce predator hunting mice across open meadows.", example_vi: "Chim ưng đuôi đỏ là kẻ săn mồi dữ tợn săn chuột trên những đồng cỏ trống." },
    { id: 4, word: "prey", pos: "n", ipa: "/preɪ/", definition_en: "An animal that is hunted and caught by another for food", definition_vi: "con mồi", example_en: "Field mice remain vigilant to avoid becoming prey for prowling owls.", example_vi: "Chuột đồng luôn cảnh giác để tránh trở thành con mồi cho những chú cú đang rình mồi." },
    { id: 5, word: "energy", pos: "n", ipa: "/ˈenərdʒi/", definition_en: "The power or capacity derived from resources to sustain life and activity", definition_vi: "năng lượng", example_en: "Solar energy is captured by green leaves and converted into chemical fuel.", example_vi: "Năng lượng mặt trời được lá cây xanh thu nạp và chuyển hóa thành nhiên liệu hóa học." },
    { id: 6, word: "flow", pos: "n", ipa: "/floʊ/", definition_en: "The continuous movement of a substance or energy through a system", definition_vi: "dòng chảy / sự lưu chuyển", example_en: "Ecologists map the flow of energy from grass to grazing zebras.", example_vi: "Các nhà sinh thái học lập bản đồ dòng chảy năng lượng từ cỏ sang đàn ngựa vằn đang gặm cỏ." },
    { id: 7, word: "herbivore", pos: "n", ipa: "/ˈhɜːrbɪvɔːr/", definition_en: "An animal that feeds exclusively on plants and vegetation", definition_vi: "động vật ăn thực vật", example_en: "The giant tortoise is a gentle herbivore eating fallen fruit and cactus.", example_vi: "Chú rùa khổng lồ là một loài ăn cỏ hiền lành ăn trái cây rụng và xương rồng." },
    { id: 8, word: "carnivore", pos: "n", ipa: "/ˈkɑːrnɪvɔːr/", definition_en: "An animal that feeds chiefly or exclusively on animal tissue", definition_vi: "động vật ăn thịt", example_en: "Lions and wolves are examples of a powerful carnivore.", example_vi: "Sư tử và chó sói là những ví dụ về một loài ăn thịt dũng mãnh." },
    { id: 9, word: "decomposer", pos: "n", ipa: "/ˌdiːkəmˈpoʊzər/", definition_en: "An organism, especially a fungus or bacterium, that breaks down organic matter", definition_vi: "sinh vật phân hủy", example_en: "Fungi and earthworms serve as an indispensable decomposer in rich soil.", example_vi: "Nấm và giun đất đóng vai trò là sinh vật phân hủy không thể thiếu trong đất màu mỡ." },
    { id: 10, word: "ecosystem", pos: "n", ipa: "/ˈiːkoʊsɪstəm/", definition_en: "A biological community of interacting organisms and their physical environment", definition_vi: "hệ sinh thái", example_en: "Every woodland ecosystem depends on delicate balances between species.", example_vi: "Mỗi hệ sinh thái rừng cây đều phụ thuộc vào sự cân bằng mong manh giữa các loài." },
    { id: 11, word: "sunlight", pos: "n", ipa: "/ˈsʌnlaɪt/", definition_en: "Light originating directly from the sun that powers biological growth", definition_vi: "ánh sáng mặt trời", example_en: "Without sunlight, green plants cannot produce essential glucose.", example_vi: "Nếu không có ánh sáng mặt trời, cây xanh không thể sản xuất glucose thiết yếu." },
    { id: 12, word: "nutrient", pos: "n", ipa: "/ˈnuːtriənt/", definition_en: "A substance that provides nourishment essential for maintenance of life", definition_vi: "chất dinh dưỡng", example_en: "Decomposed leaf litter supplies vital nutrient elements to forest soil.", example_vi: "Thảm lá mục bị phân hủy cung cấp các nguyên tố dinh dưỡng sống còn cho đất rừng." },
    { id: 13, word: "organism", pos: "n", ipa: "/ˈɔːrɡənɪzəm/", definition_en: "An individual animal, plant, or single-celled life form", definition_vi: "sinh vật / cơ thể sống", example_en: "Every living organism has a unique role inside its local habitat.", example_vi: "Mỗi sinh vật sống đều có một vai trò riêng biệt bên trong môi trường sống bản địa." },
    { id: 14, word: "survive", pos: "v", ipa: "/sərˈvaɪv/", definition_en: "To continue to exist or remain alive, especially through difficult times", definition_vi: "sinh tồn / sống sót", example_en: "Animals must consume sufficient food each day to survive harsh winters.", example_vi: "Động vật phải tiêu thụ đủ thức ăn mỗi ngày để sinh tồn qua những mùa đông khắc nghiệt." },
    { id: 15, word: "balance", pos: "n", ipa: "/ˈbæləns/", definition_en: "A state of equilibrium where different elements exist in stable proportion", definition_vi: "sự cân bằng", example_en: "Predators prevent overgrazing to maintain ecological balance in the park.", example_vi: "Kẻ săn mồi ngăn chặn việc chăn thả quá mức để duy trì sự cân bằng sinh thái trong công viên." },
    { id: 16, word: "trophic", pos: "adj", ipa: "/ˈtroʊfɪk/", definition_en: "Relating to feeding and nutrition within a hierarchical food chain", definition_vi: "thuộc bậc dinh dưỡng", example_en: "Energy diminishes rapidly as you ascend to each higher trophic level.", example_vi: "Năng lượng giảm đi nhanh chóng khi bạn leo lên từng bậc dinh dưỡng cao hơn." },
    { id: 17, word: "biomass", pos: "n", ipa: "/ˈbaɪoʊmæs/", definition_en: "The total mass of living organisms in a given area or ecosystem", definition_vi: "sinh khối", example_en: "Producers always comprise the greatest biomass inside a healthy meadow.", example_vi: "Sinh vật sản xuất luôn chiếm sinh khối lớn nhất bên trong một đồng cỏ khỏe mạnh." },
    { id: 18, word: "devour", pos: "v", ipa: "/dɪˈvaʊər/", definition_en: "To eat food hungrily, quickly, or completely", definition_vi: "ngấu nghiến / nuốt chửng", example_en: "Hungry caterpillars devour fresh oak leaves throughout early spring.", example_vi: "Những chú sâu bướm đói bụng ngấu nghiến những chiếc lá sồi non suốt đầu mùa xuân." },
    { id: 19, word: "interconnect", pos: "v", ipa: "/ˌɪntərkəˈnekt/", definition_en: "To connect with one another in a complex web of mutual relationships", definition_vi: "kết nối chằng chịt / liên kết", example_en: "Multiple overlapping food chains interconnect to form an intricate food web.", example_vi: "Nhiều chuỗi thức ăn chồng chéo liên kết với nhau để tạo thành một mạng lưới thức ăn phức tạp." },
    { id: 20, word: "vital", pos: "adj", ipa: "/ˈvaɪtl/", definition_en: "Crucially important or necessary for life and vitality", definition_vi: "sống còn / thiết yếu", example_en: "Soil decomposers perform a vital function by returning minerals to roots.", example_vi: "Các sinh vật phân hủy đất thực hiện một chức năng sống còn bằng cách đưa khoáng chất trở lại cho rễ cây." }
  ],
  clil: {
    title_en: "Food Chains and Trophic Pyramids: Energy Flow in Systems",
    title_vi: "Chuỗi Thức Ăn và Kim Tự Tháp Dinh Dưỡng: Dòng Năng Lượng Trong Hệ Thống",
    content_en: "Every living organism requires fuel to survive, and in natural ecosystems, energy flows in a clear directional pathway. Green plants absorb sunlight through photosynthesis to generate chemical glucose; therefore, plants function as the primary producer. If plants receive sufficient sunlight and moisture, they flourish. When herbivores consume these plants, energy transfers to the primary consumer tier. Subsequently, carnivores hunt herbivores, demonstrating predator and prey relationships. If an apex predator vanishes from a habitat, herbivore populations explode and destroy vegetation. Eventually, when organisms die, fungi and soil bacteria act as a decomposer, recycling nutrients back into fertile earth.",
    glossary: [
      { word: "producer", definition_en: "Autotrophic plants that manufacture food from sunlight", definition_vi: "cây tự dưỡng sản xuất thức ăn từ ánh nắng" },
      { word: "consumer", definition_en: "Heterotrophic organisms that feed on other living things", definition_vi: "sinh vật dị dưỡng ăn sinh vật khác" },
      { word: "predator", definition_en: "Carnivorous animals that actively hunt prey for energy", definition_vi: "động vật ăn thịt săn bắt con mồi" },
      { word: "herbivore", definition_en: "Animals adapted specifically to digest plant material", definition_vi: "động vật thích nghi để ăn thực vật" },
      { word: "decomposer", definition_en: "Microbes and fungi that break down dead biological matter", definition_vi: "vi sinh vật phân hủy chất hữu cơ chết" }
    ],
    check_questions: [
      { id: 1, question_en: "What happens if green plants receive sufficient sunlight and water?", options: ["They flourish and manufacture chemical energy as producers", "They turn into predatory wolves", "They instantly stop growing"], answer: "They flourish and manufacture chemical energy as producers" },
      { id: 2, question_en: "How does energy transfer from a primary producer to a primary consumer?", options: ["When herbivores consume nutritious plant leaves", "Through underground lightning strikes", "By flying above rain clouds"], answer: "When herbivores consume nutritious plant leaves" },
      { id: 3, question_en: "What vital role do decomposers fulfill in the ecosystem?", options: ["They recycle nutrients from dead matter back into the soil", "They hunt healthy adult deer", "They block sunlight from reaching plants"], answer: "They recycle nutrients from dead matter back into the soil" }
    ],
    critical_thinking: {
      question_en: "Using the zero conditional structure, explain what happens to carnivores if an entire plant species is wiped out by disease.",
      hint_en: "If plants disappear, herbivores starve; if herbivores starve, carnivores have no food."
    }
  },
  shadowing_sentences: [
    { id: 1, text: "If plants capture bright sunlight, they produce essential food energy.", en: "If plants capture bright sunlight, they produce essential food energy.", vi: "Nếu thực vật thu nạp ánh nắng rực rỡ, chúng sẽ tạo ra năng lượng thức ăn thiết yếu.", ipa: "/ɪf plænts ˈkæptʃər braɪt ˈsʌnlaɪt ðeɪ prəˈduːs ɪˈsenʃəl fuːd ˈenərdʒi/", words: ["If", "plants", "capture", "bright", "sunlight", "they", "produce", "essential", "food", "energy"] },
    { id: 2, text: "When herbivores eat green leaves, energy transfers up the food chain.", en: "When herbivores eat green leaves, energy transfers up the food chain.", vi: "Khi động vật ăn cỏ ăn lá xanh, năng lượng sẽ chuyển dịch lên chuỗi thức ăn.", ipa: "/wen ˈhɜːrbɪvɔːrz iːt ɡriːn liːvz ˈenərdʒi trænsˈfɜːrz ʌp ðə fuːd tʃeɪn/", words: ["When", "herbivores", "eat", "green", "leaves", "energy", "transfers", "up", "the", "food", "chain"] },
    { id: 3, text: "If prey animals remain watchful, they can escape dangerous predators.", en: "If prey animals remain watchful, they can escape dangerous predators.", vi: "Nếu con mồi luôn cảnh giác, chúng có thể trốn thoát kẻ săn mồi nguy hiểm.", ipa: "/ɪf preɪ ˈænɪməl z rɪˈmeɪn ˈwɑːtʃfəl ðeɪ kæn ɪˈskeɪp ˈdeɪndʒərəs ˈpredətərz/", words: ["If", "prey", "animals", "remain", "watchful", "they", "can", "escape", "dangerous", "predators"] },
    { id: 4, text: "Fierce carnivores hunt for meat to sustain their strong bodies.", en: "Fierce carnivores hunt for meat to sustain their strong bodies.", vi: "Những loài ăn thịt dữ tợn săn tìm thịt để duy trì cơ thể cường tráng.", ipa: "/fɪərs ˈkɑːrnɪvɔːrz hʌnt fɔːr miːt tuː səˈsteɪn ðer strɔːŋ ˈbɑːdiz/", words: ["Fierce", "carnivores", "hunt", "for", "meat", "to", "sustain", "their", "strong", "bodies"] },
    { id: 5, text: "If an apex predator disappears, the entire ecosystem loses balance.", en: "If an apex predator disappears, the entire ecosystem loses balance.", vi: "Nếu một kẻ săn mồi đầu bảng biến mất, toàn bộ hệ sinh thái sẽ mất cân bằng.", ipa: "/ɪf ən ˈeɪpeks ˈpredətər ˌdɪsəˈpɪərz ði ɪnˈtaɪər ˈiːkoʊsɪstəm ˈluːzɪz ˈbæləns/", words: ["If", "an", "apex", "predator", "disappears", "the", "entire", "ecosystem", "loses", "balance"] },
    { id: 6, text: "Decomposers break down dead branches to enrich deep forest soil.", en: "Decomposers break down dead branches to enrich deep forest soil.", vi: "Sinh vật phân hủy làm mục các cành cây chết để làm giàu cho đất rừng sâu.", ipa: "/ˌdiːkəmˈpoʊzərz breɪk daʊn ded ˈbræntʃɪz tuː ɪnˈrɪtʃ diːp ˈfɔːrɪst sɔɪl/", words: ["Decomposers", "break", "down", "dead", "branches", "to", "enrich", "deep", "forest", "soil"] },
    { id: 7, text: "If soil contains rich nutrients, new seedlings grow tall quickly.", en: "If soil contains rich nutrients, new seedlings grow tall quickly.", vi: "Nếu đất chứa nhiều chất dinh dưỡng màu mỡ, cây non sẽ mọc cao nhanh chóng.", ipa: "/ɪf sɔɪl kənˈteɪnz rɪtʃ ˈnuːtriənts nuː ˈsiːdlɪŋz ɡroʊ tɔːl ˈkwɪkli/", words: ["If", "soil", "contains", "rich", "nutrients", "new", "seedlings", "grow", "tall", "quickly"] },
    { id: 8, text: "These interconnected relationships maintain harmony across living nature.", en: "These interconnected relationships maintain harmony across living nature.", vi: "Những mối quan hệ kết nối này duy trì sự hài hòa trong khắp thế giới tự nhiên.", ipa: "/ðiːz ˌɪntərkəˈnektɪd rɪˈleɪʃənʃɪps meɪnˈteɪn ˈhɑːrməni əˈkrɔːs ˈlɪvɪŋ ˈneɪtʃər/", words: ["These", "interconnected", "relationships", "maintain", "harmony", "across", "living", "nature"] }
  ],
  story_scenes: [
    { id: 1, scene_id: "scene_1", scene_number: 1, title_en: "Oak Ridge Nature Reserve", title_vi: "Khu Bảo Tồn Đồi Sồi", description_en: "Leo and Ranger Chloe walk under tall sunlit oak trees to study the woodland food web.", description: "Leo and Ranger Chloe walk under tall sunlit oak trees to study the woodland food web.", image_url: "/images/week74/webtoon_scene_1.png", audio_url: "/audio/week74/scene_1.mp3" },
    { id: 2, scene_id: "scene_2", scene_number: 2, title_en: "Herbivores Feeding on Foliage", title_vi: "Động Vật Ăn Cỏ Gặm Lá Cây", description_en: "Leo observes small green caterpillars and meadow rabbits eating fresh clover leaves.", description: "Leo observes small green caterpillars and meadow rabbits eating fresh clover leaves.", image_url: "/images/week74/webtoon_scene_2.png", audio_url: "/audio/week74/scene_2.mp3" },
    { id: 3, scene_id: "scene_3", scene_number: 3, title_en: "The Red-Tailed Hawk in Flight", title_vi: "Chim Ưng Đuôi Đỏ Bay Lượn", description_en: "A swift predator glides above the forest clearing, scanning the grass for mice.", description: "A swift predator glides above the forest clearing, scanning the grass for mice.", image_url: "/images/week74/webtoon_scene_3.png", audio_url: "/audio/week74/scene_3.mp3" },
    { id: 4, scene_id: "scene_4", scene_number: 4, title_en: "Decomposers in Fallen Logs", title_vi: "Sinh Vật Phân Hủy Trong Thân Cây Mục", description_en: "Ranger Chloe lifts moist bark to show Leo shelf mushrooms and earthworms recycling nutrients.", description: "Ranger Chloe lifts moist bark to show Leo shelf mushrooms and earthworms recycling nutrients.", image_url: "/images/week74/webtoon_scene_4.png", audio_url: "/audio/week74/scene_4.mp3" },
    { id: 5, scene_id: "scene_5", scene_number: 5, title_en: "Mapping the Ecological Diagram", title_vi: "Lập Sơ Đồ Hệ Sinh Thái", description_en: "Leo draws a double bar chart and food web pyramid in his field science notebook.", description: "Leo draws a double bar chart and food web pyramid in his field science notebook.", image_url: "/images/week74/webtoon_scene_5.png", audio_url: "/audio/week74/scene_5.mp3" }
  ],
  writing_data: {
    title: "Explaining Dependency in the Forest Food Web",
    prompt_en: "Look at the four panels. Write a paragraph explaining how energy flows through the forest ecosystem using zero conditional sentences (e.g., 'If plants produce food...', 'If herbivores eat plants...'). Write 20 or more words.",
    prompt_vi: "Nhìn vào 4 khung tranh. Viết một đoạn văn giải thích dòng chảy năng lượng trong hệ sinh thái rừng sử dụng câu điều kiện loại 0 ('If plants produce food...', 'If herbivores eat plants...'). Viết từ 20 từ trở lên.",
    min_sentences: 3,
    min_words: 20,
    max_words: 90,
    model_sentence: "If green plants absorb bright sunlight, they produce chemical energy through photosynthesis. When herbivores eat these plants, energy transfers to primary consumers. If predators hunt herbivores, they maintain ecological balance in the woodland. When organisms die, decomposers recycle nutrients back into the soil, sustaining the endless food chain.",
    word_bank: ["producer", "consumer", "predator", "prey", "energy", "herbivore", "carnivore", "decomposer", "ecosystem", "balance"],
    sentence_frames: [
      "If plants absorb sunlight, they act as the primary ___.",
      "When herbivores eat fresh leaves, energy transfers to the ___.",
      "If fierce carnivores hunt prey, they keep the forest in ___.",
      "When living things die, fungi serve as an active ___."
    ],
    panels: [
      {
        panel_id: "panel_1",
        title_en: "Panel 1: Sunlight & Producers",
        title_vi: "Khung 1: Ánh Nắng & Sinh Vật Sản Xuất",
        image_url: "/images/week74/writing_panel_1.png",
        image_prompt: "Sunbeams illuminating green oak leaves while a small diagram shows photosynthesis creating plant energy.",
        caption: "If plants absorb bright sunlight, they generate food energy.",
        sentence_frame: "If plants [absorb bright sunlight], they [produce vital food energy].",
        pills: ["absorb bright sunlight", "produce vital food energy", "primary producers", "photosynthesis process"],
        connectors: ["If,", "Whenever,", "When,"]
      },
      {
        panel_id: "panel_2",
        title_en: "Panel 2: Herbivore Consumers",
        title_vi: "Khung 2: Động Vật Ăn Cỏ Tiêu Thụ",
        image_url: "/images/week74/writing_panel_2.png",
        image_prompt: "A fluffy meadow rabbit and tiny caterpillars munching on green clover in a woodland clearing.",
        caption: "When herbivores consume plants, energy transfers to consumers.",
        sentence_frame: "When herbivores [consume fresh green leaves], energy [transfers to primary consumers].",
        pills: ["consume fresh green leaves", "transfers to primary consumers", "meadow rabbits", "gentle herbivores"],
        connectors: ["When,", "If,", "As,"]
      },
      {
        panel_id: "panel_3",
        title_en: "Panel 3: Predators & Prey Balance",
        title_vi: "Khung 3: Kẻ Săn Mồi & Cân Bằng Con Mồi",
        image_url: "/images/week74/writing_panel_3.png",
        image_prompt: "A red-tailed hawk soaring over the meadow while a field mouse hides cautiously under dry grass.",
        caption: "If predators hunt prey, they maintain natural population balance.",
        sentence_frame: "If predators [hunt active prey], they [maintain ecological balance] in the forest.",
        pills: ["hunt active prey", "maintain ecological balance", "red-tailed hawk", "fierce carnivore"],
        connectors: ["If,", "Whenever,", "Also,"]
      },
      {
        panel_id: "panel_4",
        title_en: "Panel 4: Decomposer Nutrient Recycling",
        title_vi: "Khung 4: Sinh Vật Phân Hủy Tái Chế Dinh Dưỡng",
        image_url: "/images/week74/writing_panel_4.png",
        image_prompt: "Mushrooms and earthworms breaking down a fallen mossy log into rich dark soil.",
        caption: "When organisms die, decomposers recycle nutrients into soil.",
        sentence_frame: "When organisms die, decomposers [recycle vital nutrients] into [fertile woodland soil].",
        pills: ["recycle vital nutrients", "fertile woodland soil", "enriching new seedlings", "completing the food web"],
        connectors: ["Eventually,", "When,", "In the end,"]
      }
    ],
    ladder_stages: [
      {
        badge_label: "MODEL",
        title: "Stage 1: Primary Producers",
        image_url: "/images/week74/writing_panel_1.png",
        caption: "If plants absorb bright sunlight, they generate food energy.",
        frame_L1: "If green plants absorb sunlight, they produce chemical food. They are primary producers.",
        connectors: ["If,", "Whenever,", "When,"],
        sentence_hint: "Write 2 sentences explaining how plants capture sunlight.",
        ordered_chips: ["If plants absorb sunlight,", "they manufacture food", "as primary producers", "in the forest."],
        pills: ["absorb sunlight", "manufacture food", "primary producers", "green leaves"],
        sentence_frame: "If plants [absorb bright sunlight], they [produce vital food energy]."
      },
      {
        badge_label: "BUILD",
        title: "Stage 2: Primary Consumers",
        image_url: "/images/week74/writing_panel_2.png",
        caption: "When herbivores consume plants, energy transfers to consumers.",
        frame_L1: "When herbivores eat green leaves, energy transfers up. Rabbits act as primary consumers.",
        connectors: ["When,", "If,", "Next,"],
        sentence_hint: "Write 2 sentences describing herbivores eating plants.",
        pills: ["eat green leaves", "energy transfers", "primary consumers", "meadow rabbits"],
        sentence_frame: "When herbivores [eat green plants], energy [moves to the consumer tier]."
      },
      {
        badge_label: "WRITE",
        title: "Stage 3: Predators Maintain Balance",
        image_url: "/images/week74/writing_panel_3.png",
        caption: "If predators hunt prey, they maintain natural population balance.",
        frame_L1: "If predators hunt prey animals, they preserve balance. The hawk keeps mouse numbers steady.",
        connectors: ["If,", "Whenever,", "Also,"],
        sentence_hint: "Write 2 sentences about how predators control herbivore populations.",
        pills: ["hunt prey animals", "preserve balance", "soaring hawk", "steady numbers"],
        sentence_frame: "If predators [hunt active prey], they [keep the ecosystem in balance]."
      },
      {
        badge_label: "EXPAND",
        title: "Stage 4: Decomposers Recycle",
        image_url: "/images/week74/writing_panel_4.png",
        caption: "When organisms die, decomposers recycle nutrients into soil.",
        frame_L1: "When organisms die, fungi break down organic matter. Rich nutrients nourish new seedlings.",
        connectors: ["When,", "In the end,", "Eventually,"],
        sentence_hint: "Write 2 sentences summarizing nutrient recycling.",
        pills: ["fungi break down matter", "rich nutrients nourish", "fertile soil", "continuous cycle"],
        sentence_frame: "When organisms die, decomposers [recycle nutrients] into [fertile forest soil]."
      }
    ]
  },
  speaking_data: {
    talkshow_prompt: {
      topic: "Ecosystem Stability and the Zero Conditional",
      question: "Ranger Chloe, why is the zero conditional grammar structure ideal for explaining food webs?",
      model_response: "The zero conditional expresses universal scientific facts that always occur under specific conditions! For example: if plants capture sunlight, they produce glucose; when herbivores eat plants, energy moves to the next trophic level. If an apex predator vanishes, herbivore numbers rapidly explode and destroy the habitat. It clearly shows direct cause and effect in living systems!"
    },
    info_exchange_cards: {
      table_a: {
        title: "Leo's Forest Food Web Study",
        subtitle: "Candidate's Question Card (Ask Examiner)",
        person: "Leo",
        fields: [
          { id: "field_a1", cue_prompt: "where / conduct food web survey?", cue_word: "where", is_missing: true, acceptable_questions: ["Where does Leo conduct his food web survey?", "Where is the survey conducted?", "Where does he study the forest?"], nova_reply: "Leo conducts his survey across the Oak Ridge Nature Reserve." },
          { id: "field_a2", cue_prompt: "what / primary producer in the study?", cue_word: "what", is_missing: true, acceptable_questions: ["What is the primary producer in the study?", "What producer does he study?", "What plant acts as producer?"], nova_reply: "Ancient white oak trees and forest clover act as primary producers." },
          { id: "field_a3", cue_prompt: "how many / trophic levels recorded?", cue_word: "how many", is_missing: true, acceptable_questions: ["How many trophic levels are recorded?", "How many levels did he record?", "What is the number of trophic levels?"], nova_reply: "He recorded four distinct trophic levels from producers to apex predators." },
          { id: "field_a4", cue_prompt: "who / helps identify soil decomposers?", cue_word: "who", is_missing: true, acceptable_questions: ["Who helps identify the soil decomposers?", "Who helps Leo?", "Who identifies fungi and worms?"], nova_reply: "Ranger Chloe helps identify earthworms and woodland fungi." },
          { id: "field_a5", cue_prompt: "why / predator populations essential?", cue_word: "why", is_missing: true, acceptable_questions: ["Why are predator populations essential?", "Why do we need predators?", "Why are hawks important?"], nova_reply: "Because predators prevent herbivores from overconsuming plant foliage." }
        ]
      },
      table_b: {
        title: "Ranger Chloe's Wetland Energy Project",
        subtitle: "Information Card (Answer Examiner's Questions)",
        person: "Ranger Chloe",
        fields: [
          { id: "field_b1", cue_prompt: "where / wetland research pond?", cue_word: "where", value: "At the southern boundary of Willow Creek Marsh.", nova_question: "Where is Ranger Chloe's wetland research site located?", acceptable_answers: ["At the southern boundary of Willow Creek Marsh.", "At Willow Creek Marsh.", "Southern boundary of the marsh."] },
          { id: "field_b2", cue_prompt: "what / apex predator in the marsh?", cue_word: "what", value: "The great blue heron hunting fish and frogs.", nova_question: "What animal serves as the apex predator in the marsh?", acceptable_answers: ["The great blue heron hunting fish and frogs.", "The great blue heron.", "A blue heron."] },
          { id: "field_b3", cue_prompt: "how / measure aquatic plant biomass?", cue_word: "how", value: "By weighing dried sample quadrants of pond lily leaves.", nova_question: "How does the research team measure aquatic plant biomass?", acceptable_answers: ["By weighing dried sample quadrants of pond lily leaves.", "By weighing dried plant samples.", "Using sample quadrants of leaves."] },
          { id: "field_b4", cue_prompt: "who / monitors water quality weekly?", cue_word: "who", value: "Student volunteers from the environmental science academy.", nova_question: "Who monitors water quality and nutrient levels weekly?", acceptable_answers: ["Student volunteers from the environmental science academy.", "Student volunteers.", "Environmental science students."] },
          { id: "field_b5", cue_prompt: "why / decomposers crucial for ponds?", cue_word: "why", value: "To prevent decaying plant matter from choking fish oxygen.", nova_question: "Why are aquatic decomposers crucial for wetland ponds?", acceptable_answers: ["To prevent decaying plant matter from choking fish oxygen.", "To maintain fish oxygen.", "So decaying plants do not choke oxygen."] }
        ]
      }
    }
  },
  cambridge_rw: {
    part1_definitions: [
      { id: 1, text: "A green plant or organism that manufactures its own food through photosynthesis.", target: "producer" },
      { id: 2, text: "An animal that actively hunts and catches other living creatures for sustenance.", target: "predator" },
      { id: 3, text: "A gentle creature whose diet consists entirely of leaves, grasses, and vegetation.", target: "herbivore" },
      { id: 4, text: "An organism, such as a mushroom or bacterium, that breaks down dead plant material.", target: "decomposer" },
      { id: 5, text: "A biological community where living organisms interact harmoniously with their environment.", target: "ecosystem" }
    ],
    part2_dialogue: {
      title: "Leo & Ranger Chloe Exploring the Food Chain",
      turns: [
        {
          id: 1,
          speaker: "Leo",
          prompt: "Ranger Chloe, what happens if plants do not receive enough sunlight?",
          options: [
            "If plants lack sunlight, they cannot produce food through photosynthesis.",
            "They turn into large carnivorous birds immediately.",
            "Yes, they fly across the blue sky."
          ],
          answer: "If plants lack sunlight, they cannot produce food through photosynthesis."
        },
        {
          id: 2,
          speaker: "Leo",
          prompt: "What happens when herbivores eat those green leaves?",
          options: [
            "When herbivores eat plants, energy transfers directly into their bodies.",
            "The plants disappear from the entire planet.",
            "It turns into cold winter snow."
          ],
          answer: "When herbivores eat plants, energy transfers directly into their bodies."
        },
        {
          id: 3,
          speaker: "Leo",
          prompt: "Why are predators like the red-tailed hawk so important?",
          options: [
            "If predators hunt prey, they keep herbivore numbers from exploding.",
            "Because hawks build nests made of heavy iron.",
            "No, hawks only swim in deep rivers."
          ],
          answer: "If predators hunt prey, they keep herbivore numbers from exploding."
        },
        {
          id: 4,
          speaker: "Leo",
          prompt: "What role do fungi and earthworms play when organisms die?",
          options: [
            "They break down dead matter and return rich nutrients to the soil.",
            "They turn soil into hard plastic blocks.",
            "They stop the sun from rising."
          ],
          answer: "They break down dead matter and return rich nutrients to the soil."
        },
        {
          id: 5,
          speaker: "Leo",
          prompt: "Shall we plot our animal count data onto a double bar graph?",
          options: [
            "Fantastic idea! Let's compare herbivores and carnivores on the chart.",
            "I want to drink warm lemonade now.",
            "The library opens on Sunday afternoon."
          ],
          answer: "Fantastic idea! Let's compare herbivores and carnivores on the chart."
        }
      ],
      exchanges: [
        { speaker: "Leo", text: "Ranger Chloe, what happens if plants do not receive enough sunlight?" },
        { speaker: "Ranger Chloe", text: "If plants lack sunlight, they cannot produce food through photosynthesis." },
        { speaker: "Leo", text: "What happens when herbivores eat those green leaves?" },
        { speaker: "Ranger Chloe", text: "When herbivores eat plants, energy transfers directly into their bodies." },
        { speaker: "Leo", text: "Why are predators like the red-tailed hawk so important?" },
        { speaker: "Ranger Chloe", text: "If predators hunt prey, they keep herbivore numbers from exploding." },
        { speaker: "Leo", text: "What role do fungi and earthworms play when organisms die?" },
        { speaker: "Ranger Chloe", text: "They break down dead matter and return rich nutrients to the soil." },
        { speaker: "Leo", text: "Shall we plot our animal count data onto a double bar graph?" },
        { speaker: "Ranger Chloe", text: "Fantastic idea! Let's compare herbivores and carnivores on the chart." }
      ]
    },
    part6_cloze: {
      title: "Leo's Science Field Notes: Energy Flow",
      instructions: "Read the field notes and write the missing words. Write one word on each line.",
      text_template: "In nature, all living organisms depend [1]_____ one another for energy. Green plants produce food [2]_____ capturing bright sunlight. If herbivores eat these leaves, energy transfers [3]_____ their bodies. When predators hunt, they maintain [4]_____ healthy balance in the ecosystem. Decomposers return nutrients [5]_____ the earth so new plants can flourish.",
      answers: { "1": "on", "2": "by", "3": "into", "4": "a", "5": "to" }
    }
  },
  minigames: {
    math_problems: [
      {
        id: "w74_p1",
        type: "part_whole",
        title: "Comparing Herbivore and Carnivore Counts on Complex Charts",
        question: "In the Oak Ridge Reserve survey, researchers counted 140 herbivores (rabbits and deer) and 35 carnivores (hawks and foxes). How many total animals were recorded in the population chart?",
        storyContext: "Ranger Chloe plots multi-set animal survey data onto an ecological double bar graph.",
        modelData: {
          bars: [
            { label: "Herbivores (Prey)", value: 140, color: "#10b981" },
            { label: "Carnivores (Predators)", value: 35, color: "#ef4444" }
          ],
          total: 175,
          unit: "animals"
        },
        target_answer: 175,
        unit: "animals",
        steps: [
          "Record the herbivore population: 140 animals.",
          "Add the carnivore population: 35 animals.",
          "140 + 35 = 175 total animals in the survey."
        ]
      },
      {
        id: "w74_p2",
        type: "comparison",
        title: "Comparing Biomass Yield in Two Forest Sectors",
        question: "Sector North produced 180 kilograms of plant biomass per hectare, while Sector South produced 115 kilograms. How many more kilograms of biomass did Sector North produce than Sector South?",
        storyContext: "Leo compares primary producer biomass between two woodland study quadrants.",
        modelData: {
          bars: [
            { label: "Sector North Biomass", value: 180, color: "#059669" },
            { label: "Sector South Biomass", value: 115, color: "#d97706" }
          ],
          difference: 65,
          unit: "kg"
        },
        target_answer: 65,
        unit: "kg",
        steps: [
          "Start with Sector North biomass: 180 kg.",
          "Subtract Sector South biomass: 115 kg.",
          "180 - 115 = 65 kg difference in biomass."
        ]
      }
    ],
    action_lab_scenarios: [
      {
        stage: 1,
        title: "Photosynthesis & Solar Capture",
        diagram_type: "producer_energy_harness",
        instruction: "Select the required components for primary producers to manufacture glucose.",
        items: [
          { label: "Solar Radiation Influx", target: "sunlight" },
          { label: "Chlorophyll Absorption", target: "photosynthesis" },
          { label: "Glucose Energy Output", target: "biomass" }
        ]
      },
      {
        stage: 2,
        title: "Herbivore to Carnivore Transfer",
        diagram_type: "trophic_transfer_chain",
        instruction: "Connect the feeding pathways between trophic tiers in the woodland.",
        items: [
          { label: "Green Oak Leaves", target: "producer" },
          { label: "Meadow Caterpillar", target: "primary_consumer" },
          { label: "Red-Tailed Hawk", target: "apex_predator" }
        ]
      },
      {
        stage: 3,
        title: "Nutrient Recycling & Decomposition",
        diagram_type: "decomposer_substrate",
        instruction: "Route organic matter into the fungal decomposition network.",
        items: [
          { label: "Fallen Leaf Litter", target: "organic_matter" },
          { label: "Mycelium Fungal Web", target: "decomposer" },
          { label: "Soil Mineral Replenishment", target: "nutrients" }
        ]
      }
    ],
    grammar_drills: [
      { sentence: "If plants capture sunlight, they produce chemical food.", options: ["produce", "produced", "producing"], answer: "produce", explanation: "Zero conditional uses present simple in both clauses for scientific facts." },
      { sentence: "When herbivores eat green leaves, energy transfers up the food chain.", options: ["transfers", "transferred", "transferring"], answer: "transfers", explanation: "Use 3rd person singular present simple 'transfers' with the singular subject 'energy'." },
      { sentence: "If a predator disappears, herbivore populations explode.", options: ["disappears", "disappeared", "disappearing"], answer: "disappears", explanation: "In the 'if' clause of a zero conditional, use present simple ('disappears')." },
      { sentence: "Decomposers break down dead logs to enrich the soil.", options: ["break", "breaks", "breaking"], answer: "break", explanation: "Use the base plural verb 'break' with the plural subject 'Decomposers'." },
      { sentence: "Every living organism plays a vital role in its ecosystem.", options: ["organism", "organic", "organ"], answer: "organism", explanation: "The noun 'organism' means any individual living plant, animal, or microbe." }
    ]
  }
};
