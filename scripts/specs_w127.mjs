/**
 * scripts/specs_w127.mjs
 * Week 127: Global Climate Systems & Renewable Energy
 * Stage 2: Cambridge Lower Secondary & B2 First / FCE Rotary
 */

export const w127 = {
  week: 127,
  theme: "Global Climate Systems & Renewable Energy",
  title_en: "Global Climate Systems and Renewable Energy",
  title_vi: "Hệ Thống Khí Hậu Toàn Cầu và Năng Lượng Tái Tạo",
  cefr_level: "B2 First",
  grammar_focus: "Mixed Conditionals & Cause-Effect Sequences: 'If industrial nations had invested earlier in solar grids, atmospheric carbon levels would be substantially lower today.'",
  vocab_list: [
    { id: 1, word: "renewable", pos: "adj", ipa: "/rɪˈnuːəbəl/", definition_en: "Capable of being replenished naturally within a human lifetime", definition_vi: "tái tạo được", example_en: "Renewable energy installations generated over forty percent of regional power.", example_vi: "Các trạm năng lượng tái tạo đã tạo ra hơn bốn mươi phần trăm lượng điện khu vực." },
    { id: 2, word: "climate", pos: "n", ipa: "/ˈklaɪmət/", definition_en: "The weather conditions prevailing in an area over a long period", definition_vi: "khí hậu", example_en: "Shifts in the global climate alter rainfall patterns across agricultural plains.", example_vi: "Những biến đổi trong khí hậu toàn cầu làm thay đổi các hình thái lượng mưa khắp các đồng bằng nông nghiệp." },
    { id: 3, word: "emissions", pos: "n", ipa: "/ɪˈmɪʃənz/", definition_en: "The production and discharge of gases into the atmosphere", definition_vi: "khí thải", example_en: "Stricter industrial standards reduced sulfur dioxide emissions significantly.", example_vi: "Các tiêu chuẩn công nghiệp nghiêm ngặt hơn đã làm giảm đáng kể lượng khí thải lưu huỳnh đi-ô-xít." },
    { id: 4, word: "greenhouse", pos: "n", ipa: "/ˈɡriːnhaʊs/", definition_en: "Relating to atmospheric gases that trap heat radiating from Earth", definition_vi: "nhà kính (hiệu ứng)", example_en: "Excess greenhouse gas accumulation traps thermal energy near the ground.", example_vi: "Sự tích tụ quá mức khí nhà kính giữ lại nhiệt lượng gần mặt đất." },
    { id: 5, word: "solar", pos: "adj", ipa: "/ˈsoʊlər/", definition_en: "Relating to or determined by the energy of the sun", definition_vi: "thuộc mặt trời, năng lượng mặt trời", example_en: "Rooftop solar arrays convert sunlight into clean electrical current.", example_vi: "Hệ thống pin mặt trời trên mái nhà chuyển hóa ánh sáng mặt trời thành dòng điện sạch." },
    { id: 6, word: "turbine", pos: "n", ipa: "/ˈtɜːrbaɪn/", definition_en: "A rotary mechanical device that extracts energy from moving fluid or wind", definition_vi: "tua-bin", example_en: "The giant offshore wind turbine generates electricity in coastal winds.", example_vi: "Tua-bin gió ngoài khơi khổng lồ tạo ra điện trong những ngọn gió ven biển." },
    { id: 7, word: "counter", pos: "v", ipa: "/ˈkaʊntər/", definition_en: "Speak or act in opposition to something", definition_vi: "phản bác, đối phó", example_en: "Scientists present empirical data to counter climate change skepticism.", example_vi: "Các nhà khoa học đưa ra dữ liệu thực nghiệm để phản bác lại sự hoài nghi về biến đổi khí hậu." },
    { id: 8, word: "disagree", pos: "v", ipa: "/ˌdɪsəˈɡriː/", definition_en: "Hold a different opinion from another party", definition_vi: "không đồng ý, bất đồng", example_en: "Economists may disagree on the ideal tax rate for fossil fuel imports.", example_vi: "Các nhà kinh tế có thể không đồng ý về mức thuế lý tưởng đối với việc nhập khẩu nhiên liệu hóa thạch." },
    { id: 9, word: "point", pos: "n", ipa: "/pɔɪnt/", definition_en: "An argument or idea raised in a debate", definition_vi: "luận điểm, ý kiến", example_en: "Clara made a compelling point regarding the efficiency of battery storage.", example_vi: "Clara đã nêu ra một luận điểm thuyết phục liên quan đến hiệu suất của việc lưu trữ pin." },
    { id: 10, word: "true", pos: "adj", ipa: "/truː/", definition_en: "In accordance with fact or reality", definition_vi: "đúng, xác thực", example_en: "It is true that renewable installation costs have plummeted over ten years.", example_vi: "Đúng là chi phí lắp đặt năng lượng tái tạo đã giảm mạnh trong suốt mười năm qua." },
    { id: 11, word: "false", pos: "adj", ipa: "/fɔːls/", definition_en: "Not in accordance with truth or empirical fact", definition_vi: "sai, không chính xác", example_en: "The claim that wind energy is inherently unreliable proved completely false.", example_vi: "Tuyên bố rằng năng lượng gió vốn dĩ không đáng tin cậy đã chứng minh là hoàn toàn sai." },
    { id: 12, word: "sustainable", pos: "adj", ipa: "/səˈsteɪnəbəl/", definition_en: "Able to be maintained at a certain rate without depleting resources", definition_vi: "bền vững", example_en: "Sustainable forestry practices ensure timber harvesting does not destroy habitats.", example_vi: "Các hoạt động lâm nghiệp bền vững đảm bảo việc khai thác gỗ không phá hủy môi trường sống." },
    { id: 13, word: "efficiency", pos: "n", ipa: "/ɪˈfɪʃənsi/", definition_en: "The state of achieving maximum productivity with minimum wasted effort", definition_vi: "hiệu suất, tính hiệu quả", example_en: "New photovoltaic panels achieve an energy conversion efficiency of 24 percent.", example_vi: "Các tấm pin quang điện mới đạt hiệu suất chuyển đổi năng lượng lên tới 24 phần trăm." },
    { id: 14, word: "grid", pos: "n", ipa: "/ɡrɪd/", definition_en: "An interconnected network for distributing electricity over a region", definition_vi: "lưới điện", example_en: "A smart electric grid balances power demand across fluctuating wind conditions.", example_vi: "Lưới điện thông minh cân bằng nhu cầu điện năng giữa các điều kiện gió biến động." },
    { id: 15, word: "carbon", pos: "n", ipa: "/ˈkɑːrbən/", definition_en: "A chemical element forming organic compounds and greenhouse gases", definition_vi: "các-bon", example_en: "Reforestation projects absorb excess carbon dioxide directly from the air.", example_vi: "Các dự án tái trồng rừng hấp thụ lượng khí các-bon đi-ô-xít dư thừa trực tiếp từ không khí." },
    { id: 16, word: "transition", pos: "n", ipa: "/trænˈzɪʃən/", definition_en: "The process or a period of changing from one state to another", definition_vi: "sự chuyển đổi, bước chuyển tiếp", example_en: "The global energy transition requires rapid infrastructure investment.", example_vi: "Cuộc chuyển đổi năng lượng toàn cầu đòi hỏi sự đầu tư cơ sở hạ tầng nhanh chóng." },
    { id: 17, word: "fossil fuel", pos: "n", ipa: "/ˈfɑːsəl fjuːəl/", definition_en: "A natural fuel such as coal or gas formed in the geological past", definition_vi: "nhiên liệu hóa thạch", example_en: "Phasing out coal reduces reliance on polluting fossil fuel resources.", example_vi: "Việc loại bỏ dần than đá làm giảm sự phụ thuộc vào các nguồn nhiên liệu hóa thạch gây ô nhiễm." },
    { id: 18, word: "conservation", pos: "n", ipa: "/ˌkɑːnsərˈveɪʃən/", definition_en: "Prevention of wasteful use of a resource", definition_vi: "sự bảo tồn, sử dụng tiết kiệm", example_en: "Energy conservation campaigns encourage factories to upgrade outdated machinery.", example_vi: "Các chiến dịch tiết kiệm năng lượng khuyến khích các nhà máy nâng cấp máy móc lạc hậu." },
    { id: 19, word: "geothermal", pos: "adj", ipa: "/ˌdʒiːoʊˈθɜːrməl/", definition_en: "Relating to or produced by the internal heat of the earth", definition_vi: "địa nhiệt", example_en: "Iceland heats over eighty percent of its buildings using clean geothermal water.", example_vi: "Băng Đảo sưởi ấm hơn tám mươi phần trăm các tòa nhà bằng nước địa nhiệt sạch." },
    { id: 20, word: "photovoltaic", pos: "adj", ipa: "/ˌfoʊtoʊvɑːlˈteɪɪk/", definition_en: "Relating to the production of electric current at the junction of two substances exposed to light", definition_vi: "quang điện", example_en: "Large photovoltaic arrays span desert valleys to feed municipal power lines.", example_vi: "Các mảng quang điện lớn trải dài qua các thung lũng sa mạc để cung cấp điện cho các đường dây thành phố." }
  ],
  clil: {
    title_en: "Global Climate Equilibrium: The Physics of Renewable Energy",
    title_vi: "Cân Bằng Khí Hậu Toàn Cầu: Vật Lý Năng Lượng Tái Tạo",
    content_en: "Earth's atmospheric equilibrium relies on a delicate balance between incoming solar radiation and outgoing thermal emissions. For two centuries, industrial combustion of fossil fuel resources has increased atmospheric greenhouse gas concentrations. If nations had modernized regional electrical grids decades ago, atmospheric carbon levels would be substantially lower today. Fortunately, the cost of photovoltaic solar modules and offshore wind turbine infrastructure has fallen steeply. Clean power installations now compete directly with coal plants in cost efficiency. In debates concerning transition speed, economists point out that building flexible smart grids creates sustainable employment while preventing catastrophic ecosystem degradation.",
    glossary: [
      { word: "renewable", definition_en: "Energy sources derived from natural, self-replenishing processes", definition_vi: "nguồn năng lượng tự nhiên tự tái tạo" },
      { word: "emissions", definition_en: "Gaseous substances discharged into the surrounding atmosphere", definition_vi: "các chất khí thải vào khí quyển" },
      { word: "greenhouse", definition_en: "Atmospheric warming effect caused by trapped infrared heat", definition_vi: "hiệu ứng làm ấm khí quyển do nhiệt bị giữ lại" },
      { word: "efficiency", definition_en: "Ratio of useful energy output compared to total resource input", definition_vi: "tỷ lệ năng lượng hữu ích so với tài nguyên đầu vào" },
      { word: "transition", definition_en: "Systemic structural movement toward sustainable energy networks", definition_vi: "sự chuyển dịch cấu trúc sang mạng lưới năng lượng bền vững" }
    ],
    check_questions: [
      { id: 1, question_en: "Why would atmospheric carbon levels be substantially lower today under mixed conditional reasoning?", options: ["If industrial nations had invested earlier in renewable infrastructure", "If humans had stopped building houses completely", "If all solar panels had been painted black"], answer: "If industrial nations had invested earlier in renewable infrastructure" },
      { id: 2, question_en: "What economic trend has accelerated the global renewable energy transition?", options: ["A steep decline in the manufacturing and installation costs of wind and solar technology", "An increase in coal mining taxes worldwide", "The total abandonment of electrical appliances"], answer: "A steep decline in the manufacturing and installation costs of wind and solar technology" },
      { id: 3, question_en: "How do flexible smart grids solve the issue of fluctuating weather conditions?", options: ["By balancing power distribution across diverse regions and battery storage systems", "By storing power exclusively in wooden barrels", "By turning off electricity every sunny afternoon"], answer: "By balancing power distribution across diverse regions and battery storage systems" }
    ],
    critical_thinking: {
      question_en: "How can developing countries finance the transition from cheap fossil fuels to modern renewable grids without slowing economic development?",
      hint_en: "Consider green international climate bonds, technology transfer partnerships, and distributed microgrid solutions."
    }
  },
  shadowing_sentences: [
    { id: 1, text: "If industrial nations had acted earlier, global carbon emissions would be far lower today.", en: "If industrial nations had acted earlier, global carbon emissions would be far lower today.", vi: "Nếu các quốc gia công nghiệp hành động sớm hơn, lượng khí thải các-bon toàn cầu ngày nay đã thấp hơn nhiều.", ipa: "/ɪf ɪnˈdʌstriəl ˈneɪʃənz hæd ˈæktɪd ˈɜːrliər ˈɡloʊbəl ˈkɑːrbən ɪˈmɪʃənz wʊd biː fɑːr ˈloʊər təˈdeɪ/", words: ["If", "industrial", "nations", "had", "acted", "earlier", "global", "carbon", "emissions", "would", "be", "far", "lower", "today"] },
    { id: 2, text: "Offshore wind turbines generate enormous amounts of clean electrical power in coastal gales.", en: "Offshore wind turbines generate enormous amounts of clean electrical power in coastal gales.", vi: "Những tua-bin gió ngoài khơi tạo ra lượng điện sạch khổng lồ trong các đợt gió mạnh ven biển.", ipa: "/ˈɔːfʃɔːr wɪnd ˈtɜːrbaɪnz ˈdʒenəreɪt ɪˈnɔːrməs əˈmaʊnts əv kliːn ɪˈlektrɪkəl ˈpaʊər ɪn ˈkoʊstl ɡeɪlz/", words: ["Offshore", "wind", "turbines", "generate", "enormous", "amounts", "of", "clean", "electrical", "power", "in", "coastal", "gales"] },
    { id: 3, text: "Photovoltaic solar panels convert intense midday sunlight directly into usable household current.", en: "Photovoltaic solar panels convert intense midday sunlight directly into usable household current.", vi: "Các tấm pin quang điện mặt trời chuyển hóa ánh nắng giữa trưa gay gắt trực tiếp thành dòng điện gia dụng hữu ích.", ipa: "/ˌfoʊtoʊvɑːlˈteɪɪk ˈsoʊlər ˈpænlz kənˈvɜːrt ɪnˈtens ˈmɪddeɪ ˈsʌnlaɪt dəˈrektli ˈɪntuː ˈjuːzəbəl ˈhaʊshoʊld ˈkɜːrənt/", words: ["Photovoltaic", "solar", "panels", "convert", "intense", "midday", "sunlight", "directly", "into", "usable", "household", "current"] },
    { id: 4, text: "Scientists disagree on the optimal balance between nuclear fission and geothermal generation.", en: "Scientists disagree on the optimal balance between nuclear fission and geothermal generation.", vi: "Các nhà khoa học không đồng thuận về sự cân bằng tối ưu giữa phân hạch hạt nhân và sản xuất địa nhiệt.", ipa: "/ˈsaɪəntɪsts ˌdɪsəˈɡriː ɑːn ði ˈɑːptɪməl ˈbæləns bɪˈtwiːn ˈnuːkliər ˈfɪʃən ænd ˌdʒiːoʊˈθɜːrməl ˌdʒenəˈreɪʃən/", words: ["Scientists", "disagree", "on", "the", "optimal", "balance", "between", "nuclear", "fission", "and", "geothermal", "generation"] },
    { id: 5, text: "Clara presented empirical data to counter the claim that renewable energy destabilizes grids.", en: "Clara presented empirical data to counter the claim that renewable energy destabilizes grids.", vi: "Clara đã đưa ra dữ liệu thực nghiệm để phản bác tuyên bố rằng năng lượng tái tạo gây mất ổn định lưới điện.", ipa: "/ˈklærə prɪˈzentɪd ɪmˈpɪrɪkəl ˈdeɪtə tuː ˈkaʊntər ðə kleɪm ðæt rɪˈnuːəbəl ˈenərdʒi diːˈsteɪbəlaɪzɪz ɡrɪdz/", words: ["Clara", "presented", "empirical", "data", "to", "counter", "the", "claim", "that", "renewable", "energy", "destabilizes", "grids"] },
    { id: 6, text: "It is true that battery storage efficiency has doubled over the past five years.", en: "It is true that battery storage efficiency has doubled over the past five years.", vi: "Đúng là hiệu suất lưu trữ của pin đã tăng gấp đôi trong vòng năm năm qua.", ipa: "/ɪt ɪz truː ðæt ˈbætəri ˈstɔːrɪdʒ ɪˈfɪʃənsi hæz ˈdʌbəld ˈoʊvər ðə pæst faɪv jɪrz/", words: ["It", "is", "true", "that", "battery", "storage", "efficiency", "has", "doubled", "over", "the", "past", "five", "years"] },
    { id: 7, text: "The assertion that solar power cannot function in northern latitudes is completely false.", en: "The assertion that solar power cannot function in northern latitudes is completely false.", vi: "Khẳng định rằng năng lượng mặt trời không thể hoạt động ở các vĩ độ phía bắc là hoàn toàn sai.", ipa: "/ði əˈsɜːrʃən ðæt ˈsoʊlər ˈpaʊər ˈkænɑːt ˈfʌŋkʃən ɪn ˈnɔːrðərn ˈlætɪtuːdz ɪz kəmˈpliːtli fɔːls/", words: ["The", "assertion", "that", "solar", "power", "cannot", "function", "in", "northern", "latitudes", "is", "completely", "false"] },
    { id: 8, text: "A comprehensive energy transition guarantees long-term economic stability and ecological preservation.", en: "A comprehensive energy transition guarantees long-term economic stability and ecological preservation.", vi: "Một cuộc chuyển đổi năng lượng toàn diện đảm bảo sự ổn định kinh tế lâu dài và bảo tồn sinh thái.", ipa: "/ə ˌkɑːmprɪˈhensɪv ˈenərdʒi trænˈzɪʃən ˌɡærənˈtiːz lɔːŋ tɜːrm ˌekəˈnɑːmɪk stəˈbɪləti ænd ˌekəˈlɑːdʒɪkəl ˌprezərˈveɪʃən/", words: ["A", "comprehensive", "energy", "transition", "guarantees", "long-term", "economic", "stability", "and", "ecological", "preservation"] }
  ],
  story_scenes: [
    { id: 1, scene_id: "scene_1", scene_number: 1, title_en: "Inspecting the Coastal Wind Farm", title_vi: "Kiểm Tra Trang Trại Gió Ven Biển", description_en: "Dr. Marcus Thorne and Clara Lin review turbine telemetry as massive blades turn in the ocean wind.", description: "Dr. Marcus Thorne and Clara Lin review turbine telemetry as massive blades turn in the ocean wind.", image_url: "/images/week127/webtoon_scene_1.png", audio_url: "/audio/week127/scene_1.mp3" },
    { id: 2, scene_id: "scene_2", scene_number: 2, title_en: "Photovoltaic Efficiency Analysis", title_vi: "Phân Tích Hiệu Suất Quang Điện", description_en: "Clara measures solar panel conversion rates and records a record twenty-four percent efficiency.", description: "Clara measures solar panel conversion rates and records a record twenty-four percent efficiency.", image_url: "/images/week127/webtoon_scene_2.png", audio_url: "/audio/week127/scene_2.mp3" },
    { id: 3, scene_id: "scene_3", scene_number: 3, title_en: "Debating Grid Storage Policies", title_vi: "Tranh Luận Chính Sách Lưu Trữ Lưới Điện", description_en: "Marcus and Clara debate how best to integrate battery reserves into the regional power network.", description: "Marcus and Clara debate how best to integrate battery reserves into the regional power network.", image_url: "/images/week127/webtoon_scene_3.png", audio_url: "/audio/week127/scene_3.mp3" },
    { id: 4, scene_id: "scene_4", scene_number: 4, title_en: "Countering Fossil Fuel Lobbyists", title_vi: "Phản Bác Giới Vận Động Nhiên Liệu Hóa Thạch", description_en: "Clara presents verifiable emission data to counter false claims regarding renewable unreliability.", description: "Clara presents verifiable emission data to counter false claims regarding renewable unreliability.", image_url: "/images/week127/webtoon_scene_4.png", audio_url: "/audio/week127/scene_4.mp3" },
    { id: 5, scene_id: "scene_5", scene_number: 5, title_en: "Presenting the National Energy Accord", title_vi: "Trình Bày Hiệp Định Năng Lượng Quốc Gia", description_en: "Energy ministers endorse the transition roadmap after examining the team's sustainable models.", description: "Energy ministers endorse the transition roadmap after examining the team's sustainable models.", image_url: "/images/week127/webtoon_scene_5.png", audio_url: "/audio/week127/scene_5.mp3" }
  ],
  writing_data: {
    title: "Evaluating Global Renewable Energy Systems",
    prompt_en: "Look at the four pictures. Write a formal investigative report about Dr. Thorne and Clara Lin assessing renewable grid integration and countering climate skepticism. Write 20 or more words.",
    prompt_vi: "Nhìn vào 4 bức tranh. Viết bản báo cáo điều tra về Tiến sĩ Thorne và Clara Lin đánh giá tích hợp lưới điện tái tạo và phản bác hoài nghi khí hậu (từ 20 từ trở lên).",
    min_sentences: 3,
    min_words: 20,
    max_words: 90,
    model_sentence: "Dr. Marcus Thorne and Clara Lin conducted an audit of the regional renewable electrical grid. First, offshore wind turbine outputs were recorded under varying storm conditions. Next, Clara calculated photovoltaic panel efficiency and verified record output. After counteracting false claims with empirical data, energy ministers formally ratified the national transition accord.",
    word_bank: ["renewable", "climate", "emissions", "turbine", "solar", "grid", "efficiency", "transition", "sustainable", "counter"],
    sentence_frames: [
      "Initially, engineers analyzed power output from offshore wind ___ installations.",
      "Testing confirmed that modern photovoltaic arrays achieved higher conversion ___ than expected.",
      "The team presented empirical research to ___ misleading claims about grid instability.",
      "Ultimately, regional authorities approved the clean energy ___ blueprint."
    ],
    panels: [
      {
        panel_id: "panel_1",
        title_en: "Offshore Turbine Inspection",
        title_vi: "Kiểm Tra Tua-bin Ngoài Khơi",
        image_url: "/images/week127/writing_panel_1.png",
        image_prompt: "Two marine energy researchers on a boat inspecting massive white offshore wind turbines spinning over blue ocean waves.",
        caption: "Engineers measured electrical output from towering offshore wind turbines.",
        sentence_frame: "First, the researchers [inspected offshore wind turbines] to measure [ocean power output].",
        pills: ["inspected offshore wind turbines", "ocean power output", "Marcus and Clara", "gusty coastal winds"],
        connectors: ["First,", "Initially,", "On Monday morning,"]
      },
      {
        panel_id: "panel_2",
        title_en: "Solar Photovoltaic Testing",
        title_vi: "Thử Nghiệm Quang Điện Mặt Trời",
        image_url: "/images/week127/writing_panel_2.png",
        image_prompt: "A female scientist adjusting a digital light sensor above rows of dark blue solar panels in a sunny valley.",
        caption: "Clara verified that solar arrays achieved a record twenty-four percent efficiency.",
        sentence_frame: "Next, Clara verified that [photovoltaic solar arrays] achieved [record conversion efficiency].",
        pills: ["photovoltaic solar arrays", "record conversion efficiency", "Clara tested", "peak daylight hours"],
        connectors: ["Next,", "Subsequently,", "Shortly afterwards,"]
      },
      {
        panel_id: "panel_3",
        title_en: "Scientific Policy Debate",
        title_vi: "Tranh Luận Chính Sách Khoa Học",
        image_url: "/images/week127/writing_panel_3.png",
        image_prompt: "A scientist standing in front of a conference room pointing at emission reduction charts while opposing delegates listen.",
        caption: "Clara used empirical data to counter false claims about renewable reliability.",
        sentence_frame: "After that, Clara presented [empirical emissions data] to counter [misleading fossil fuel claims].",
        pills: ["empirical emissions data", "misleading fossil fuel claims", "compelling point", "scientific consensus"],
        connectors: ["After that,", "Later,", "During the hearing,"]
      },
      {
        panel_id: "panel_4",
        title_en: "National Accord Ratification",
        title_vi: "Phê Chuẩn Hiệp Định Quốc Gia",
        image_url: "/images/week127/writing_panel_4.png",
        image_prompt: "Government officials and scientists signing a green energy transition pact in front of a national seal.",
        caption: "Ministers signed the national energy transition pact based on sustainable models.",
        sentence_frame: "In the end, government ministers [ratified the national energy accord] to accelerate [the clean energy transition].",
        pills: ["ratified the national energy accord", "the clean energy transition", "sustainable future", "smiling delegates"],
        connectors: ["In the end,", "Finally,", "Consequently,"]
      }
    ],
    ladder_stages: [
      {
        badge_label: "MODEL",
        title: "Turbine Output Verification",
        image_url: "/images/week127/writing_panel_1.png",
        caption: "Engineers measured electrical output from towering offshore wind turbines.",
        frame_L1: "First, the researchers monitored offshore wind turbines. They proved that ocean gales produced steady clean electricity.",
        connectors: ["First,", "Initially,", "To begin,"],
        sentence_hint: "Write 2 sentences describing offshore turbine monitoring.",
        ordered_chips: ["Researchers monitored", "offshore wind turbines", "to verify", "steady electrical generation"],
        pills: ["offshore turbines", "clean electricity", "Marcus and Clara", "ocean gales"],
        sentence_frame: "First, researchers monitored [offshore wind turbines] to confirm [steady electrical generation]."
      },
      {
        badge_label: "BUILD",
        title: "Photovoltaic Efficiency",
        image_url: "/images/week127/writing_panel_2.png",
        caption: "Clara verified that solar arrays achieved a record twenty-four percent efficiency.",
        frame_L1: "Next, Clara tested photovoltaic solar arrays. The panels achieved a remarkable conversion efficiency rate.",
        connectors: ["Next,", "Subsequently,", "In addition,"],
        sentence_hint: "Write 2 sentences about solar panel efficiency testing.",
        pills: ["solar arrays", "conversion efficiency", "Clara tested", "remarkable rate"],
        sentence_frame: "Next, Clara tested [photovoltaic solar arrays] that achieved [unprecedented conversion efficiency]."
      },
      {
        badge_label: "WRITE",
        title: "Debating Skeptics",
        image_url: "/images/week127/writing_panel_3.png",
        caption: "Clara used empirical data to counter false claims about renewable reliability.",
        frame_L1: "After that, Clara addressed the energy conference. She countered false claims with real battery performance charts.",
        connectors: ["After that,", "Later,", "During the session,"],
        sentence_hint: "Write 2 sentences describing how data countered misleading claims.",
        pills: ["energy conference", "countered false claims", "performance charts", "compelling point"],
        sentence_frame: "After that, Clara [countered false claims] using [real battery performance data]."
      },
      {
        badge_label: "EXPAND",
        title: "National Transition Ratification",
        image_url: "/images/week127/writing_panel_4.png",
        caption: "Ministers signed the national energy transition pact based on sustainable models.",
        frame_L1: "In the end, policymakers signed the clean energy treaty. They committed to expanding the smart grid nationwide.",
        connectors: ["In the end,", "Finally,", "As a result,"],
        sentence_hint: "Write 2 sentences about signing the national transition treaty.",
        pills: ["signed clean energy treaty", "policymakers", "smart grid expansion", "sustainable future"],
        sentence_frame: "In the end, policymakers signed [the clean energy treaty] to expand [the national smart grid]."
      }
    ]
  },
  speaking_data: {
    talkshow_prompt: {
      topic: "Overcoming Skepticism in the Renewable Energy Transition",
      question: "Clara, how do you counter critics who argue that renewable energy cannot support heavy industrial grids?",
      model_response: "I disagree with that assertion because real-world empirical data proves it completely false! Modern smart grids integrate diverse energy sources, combining offshore wind, solar photovoltaic, and battery storage systems. When one source fluctuates, storage and interconnected regional lines maintain flawless grid equilibrium. Transitioning to sustainable energy not only reduces greenhouse gas emissions, but also shields economies from volatile fossil fuel price shocks."
    },
    info_exchange_cards: {
      table_a: {
        title: "Clara's Offshore Wind Array",
        subtitle: "Candidate's Question Card (Ask Examiner)",
        person: "Clara",
        fields: [
          { id: "field_a1", cue_prompt: "where / wind array located?", cue_word: "where", is_missing: true, acceptable_questions: ["Where is the offshore wind array located?", "Where is the wind farm?", "Where are the turbines built?"], nova_reply: "The offshore wind array is located twenty kilometers off the North Sea coastline." },
          { id: "field_a2", cue_prompt: "how many / turbines operational?", cue_word: "how many", is_missing: true, acceptable_questions: ["How many wind turbines are operational?", "How many turbines are there?", "How many are generating power?"], nova_reply: "There are currently seventy-two giant wind turbines operating in the array." },
          { id: "field_a3", cue_prompt: "what capacity / electricity generated?", cue_word: "what capacity", is_missing: true, acceptable_questions: ["What capacity of electricity is generated?", "How much electricity does it generate?", "What is the total capacity?"], nova_reply: "The entire offshore array generates eight hundred megawatts of clean electricity at peak wind." },
          { id: "field_a4", cue_prompt: "why / undersea cables used?", cue_word: "why", is_missing: true, acceptable_questions: ["Why are undersea high-voltage cables used?", "Why are undersea cables needed?", "Why are cables on the sea floor?"], nova_reply: "They transmit high-voltage power safely to the mainland grid with minimal electrical loss." },
          { id: "field_a5", cue_prompt: "who / manages daily maintenance?", cue_word: "who", is_missing: true, acceptable_questions: ["Who manages daily maintenance of the turbines?", "Who maintains the wind farm?", "Who inspects the turbines?"], nova_reply: "Certified marine technicians and automated drone inspection teams handle daily maintenance." }
        ]
      },
      table_b: {
        title: "Dr. Marcus Thorne's Solar Farm",
        subtitle: "Information Card (Answer Examiner's Questions)",
        person: "Marcus",
        fields: [
          { id: "field_b1", cue_prompt: "where / solar facility situated?", cue_word: "where", value: "Across three hundred hectares in the sunny Mojave desert plateau.", nova_question: "Where is Dr. Thorne's utility solar facility situated?", acceptable_answers: ["Across three hundred hectares in the sunny Mojave desert plateau.", "In the Mojave desert plateau.", "In the sunny Mojave desert."] },
          { id: "field_b2", cue_prompt: "what technology / panels utilize?", cue_word: "what technology", value: "Bifacial monocrystalline photovoltaic panels mounted on dual-axis trackers.", nova_question: "What specific technology do the solar panels utilize?", acceptable_answers: ["Bifacial monocrystalline photovoltaic panels mounted on dual-axis trackers.", "Bifacial monocrystalline photovoltaic panels.", "Dual-axis solar trackers."] },
          { id: "field_b3", cue_prompt: "how much / carbon emissions prevented?", cue_word: "how much", value: "It prevents approximately four hundred thousand metric tons of carbon annually.", nova_question: "How much carbon emissions does the solar farm prevent annually?", acceptable_answers: ["It prevents approximately four hundred thousand metric tons of carbon annually.", "Four hundred thousand metric tons.", "400,000 metric tons annually."] },
          { id: "field_b4", cue_prompt: "why / battery storage installed?", cue_word: "why", value: "To supply continuous electricity to cities for five hours after sunset.", nova_question: "Why was large-scale battery storage installed at the site?", acceptable_answers: ["To supply continuous electricity to cities for five hours after sunset.", "To supply electricity after sunset.", "For power after sunset."] },
          { id: "field_b5", cue_prompt: "what year / facility commissioned?", cue_word: "what year", value: "The entire commercial facility was commissioned and connected in 2024.", nova_question: "What year was the solar farm officially commissioned for the grid?", acceptable_answers: ["The entire commercial facility was commissioned and connected in 2024.", "In 2024.", "Officially commissioned in 2024."] }
        ]
      }
    }
  },
  cambridge_rw: {
    part1_definitions: [
      { id: 1, definition_en: "Energy from natural sources that replenish naturally and never run out.", options: ["renewable", "fossil fuel", "emissions"], answer: "renewable" },
      { id: 2, definition_en: "The prevailing weather patterns and temperatures across Earth over decades.", options: ["climate", "grid", "efficiency"], answer: "climate" },
      { id: 3, definition_en: "Gases discharged into the air through industrial combustion and burning.", options: ["emissions", "conservation", "turbine"], answer: "emissions" },
      { id: 4, definition_en: "A rotary machine that produces kinetic and electrical power from moving air.", options: ["turbine", "solar", "carbon"], answer: "turbine" },
      { id: 5, definition_en: "Present facts and logical arguments against an opposing viewpoint.", options: ["counter", "disagree", "point"], answer: "counter" },
      { id: 6, definition_en: "Achieving high output without wasting electrical energy or materials.", options: ["efficiency", "transition", "greenhouse"], answer: "efficiency" },
      { id: 7, definition_en: "The complex transmission network delivering electricity across a nation.", options: ["grid", "climate", "fossil fuel"], answer: "grid" },
      { id: 8, definition_en: "A major systemic shift from one energy model to another.", options: ["transition", "conservation", "emissions"], answer: "transition" },
      { id: 9, definition_en: "Energy produced directly from the heat stored inside the Earth's crust.", options: ["geothermal", "solar", "photovoltaic"], answer: "geothermal" },
      { id: 10, definition_en: "Devices that convert radiant light energy directly into electric voltage.", options: ["photovoltaic", "turbine", "renewable"], answer: "photovoltaic" }
    ],
    part2_dialogue: {
      topic: "Evaluating National Renewable Grid Feasibility",
      turns: [
        {
          speaker: "Dr. Thorne",
          text: "Clara, how can we counter arguments that solar panels are ineffective in cloudy regions?",
          options: [
            "We have empirical data proving that modern panels absorb diffuse ambient radiation.",
            "I usually catch the metro train at twenty minutes past eight.",
            "The library book on 19th-century history was very interesting."
          ],
          answer: "We have empirical data proving that modern panels absorb diffuse ambient radiation."
        },
        {
          speaker: "Clara",
          text: "Do you disagree with economists who say the grid transition is too expensive to complete?",
          options: [
            "Yes, I disagree because renewable energy is already far cheaper than building coal plants.",
            "My sister purchased a new camera for her vacation in Greece.",
            "No, the cafeteria serves vegetarian pizza on Wednesday afternoons."
          ],
          answer: "Yes, I disagree because renewable energy is already far cheaper than building coal plants."
        },
        {
          speaker: "Dr. Thorne",
          text: "What is your main point regarding the role of utility battery storage?",
          options: [
            "My point is that batteries guarantee constant grid frequency when wind speeds fluctuate.",
            "We played an intense game of chess during the lunch break.",
            "The weather forecast predicts light rain throughout the coming weekend."
          ],
          answer: "My point is that batteries guarantee constant grid frequency when wind speeds fluctuate."
        },
        {
          speaker: "Clara",
          text: "Is it true or false that offshore turbines cause significant harm to marine biodiversity?",
          options: [
            "That claim is false because turbine foundations actually create protected artificial reefs.",
            "I forgot to bring my blue umbrella to the office this morning.",
            "The train arrives at platform four in approximately ten minutes."
          ],
          answer: "That claim is false because turbine foundations actually create protected artificial reefs."
        },
        {
          speaker: "Dr. Thorne",
          text: "Shall we present our sustainable transition roadmap to the energy ministry today?",
          options: [
            "Yes, let's present our roadmap so policymakers can authorize grid expansion.",
            "I enjoy listening to classical symphony recordings in the evening.",
            "There are twenty-five laptops inside the primary science laboratory."
          ],
          answer: "Yes, let's present our roadmap so policymakers can authorize grid expansion."
        }
      ],
      exchanges: [
        { speaker: "Dr. Thorne", text: "Clara, how can we counter arguments that solar panels are ineffective in cloudy regions?" },
        { speaker: "Clara", text: "We have empirical data proving that modern panels absorb diffuse ambient radiation." },
        { speaker: "Dr. Thorne", text: "Do you disagree with economists who say the grid transition is too expensive to complete?" },
        { speaker: "Clara", text: "Yes, I disagree because renewable energy is already far cheaper than building coal plants." },
        { speaker: "Dr. Thorne", text: "What is your main point regarding the role of utility battery storage?" },
        { speaker: "Clara", text: "My point is that batteries guarantee constant grid frequency when wind speeds fluctuate." },
        { speaker: "Dr. Thorne", text: "Is it true or false that offshore turbines cause significant harm to marine biodiversity?" },
        { speaker: "Clara", text: "That claim is false because turbine foundations actually create protected artificial reefs." },
        { speaker: "Dr. Thorne", text: "Shall we present our sustainable transition roadmap to the energy ministry today?" },
        { speaker: "Clara", text: "Yes, let's present our roadmap so policymakers can authorize grid expansion." }
      ]
    },
    part6_cloze: {
      title: "Clara Lin's Research Diary: Grid Modernization",
      instructions: "Read the diary and write the missing words. Write one word on each line.",
      text_template: "Dear Diary, today Dr. Thorne and I finalized our report [1]_____ renewable power systems. If industrial nations had invested earlier, emissions [2]_____ be far lower today. Our empirical data counters claims that wind turbines [3]_____ unreliable. Modern smart grids balance power across regions with high [4]_____. Tomorrow, we will present our sustainable energy blueprint [5]_____ the national council.",
      answers: { "1": "on", "2": "would", "3": "are", "4": "efficiency", "5": "to" }
    }
  },
  minigames: {
    math_problems: [
      {
        id: "w127_p1",
        type: "part_whole",
        title: "Regional Renewable Power Generation",
        question: "A coastal regional grid receives 480 megawatts from offshore wind turbines and 320 megawatts from solar photovoltaic farms. What is the total renewable power generated in megawatts?",
        storyContext: "Clara tallies live grid telemetry on the central control room monitors.",
        modelData: {
          bars: [
            { label: "Wind Turbines", value: 480, color: "#0ea5e9" },
            { label: "Solar Farms", value: 320, color: "#f59e0b" }
          ],
          total: 800,
          unit: "megawatts"
        },
        target_answer: 800,
        unit: "megawatts",
        steps: [
          "Take 480 megawatts from offshore wind.",
          "Add 320 megawatts from solar farms.",
          "480 + 320 = 800 megawatts in total."
        ]
      },
      {
        id: "w127_p2",
        type: "comparison",
        title: "Carbon Emissions Reduction Comparison",
        question: "A coal plant produced 750 metric tons of carbon emissions daily, whereas an upgraded geothermal plant produces only 50 metric tons. By how many metric tons were daily carbon emissions reduced?",
        storyContext: "Dr. Thorne evaluates emission logs after replacing a decommissioned boiler.",
        modelData: {
          bars: [
            { label: "Coal Boiler", value: 750, color: "#ef4444" },
            { label: "Geothermal Plant", value: 50, color: "#10b981" }
          ],
          difference: 700,
          unit: "metric tons"
        },
        target_answer: 700,
        unit: "metric tons",
        steps: [
          "Start with 750 metric tons from the coal boiler.",
          "Subtract 50 metric tons from the geothermal plant.",
          "750 - 50 = 700 metric tons reduction."
        ]
      }
    ],
    action_lab_scenarios: [
      {
        stage: 1,
        title: "Renewable vs Fossil Energy Systems",
        diagram_type: "energy_classification",
        instruction: "Sort each generation technology into Renewable or Fossil Fuel categories.",
        items: [
          { label: "Offshore Wind Turbine", target: "renewable" },
          { label: "Photovoltaic Solar Farm", target: "renewable" },
          { label: "Coal-Fired Boiler", target: "fossil_fuel" },
          { label: "Natural Gas Peaker", target: "fossil_fuel" }
        ]
      },
      {
        stage: 2,
        title: "Smart Grid Power Balancing",
        diagram_type: "grid_balance_loop",
        instruction: "Trace the flow of electricity during midday peak generation hours.",
        items: [
          { label: "Solar Farms Generate Excess Midday Power", target: "step_1" },
          { label: "Battery Storage Stores Surplus Energy", target: "step_2" },
          { label: "Discharge to Cities During Evening Peak", target: "step_3" }
        ]
      },
      {
        stage: 3,
        title: "Climate Policy Implementation",
        diagram_type: "policy_milestones",
        instruction: "Order the stages required to enact a national renewable energy transition.",
        items: [
          { label: "Empirical Emissions Audit", target: "stage_1" },
          { label: "Smart Grid Infrastructure Upgrade", target: "stage_2" },
          { label: "Phase Out Obsolete Coal Subsidies", target: "stage_3" }
        ]
      }
    ],
    grammar_drills: [
      { sentence: "If nations had invested earlier, emissions would be lower today.", options: ["would be", "will be", "had been"], answer: "would be", explanation: "Mixed conditional (past action, present result) uses 'had + past participle' in if-clause and 'would + base verb' in main clause." },
      { sentence: "Clara presented strong evidence to counter the opponent's argument.", options: ["to counter", "countering", "countered"], answer: "to counter", explanation: "Use the infinitive of purpose 'to counter' to explain the reason for presenting evidence." },
      { sentence: "Scientists disagree on the optimal timeline for grid modernization.", options: ["disagree", "disagrees", "disagreeing"], answer: "disagree", explanation: "Plural subject 'Scientists' takes plural base verb 'disagree'." },
      { sentence: "It is true that solar module manufacturing costs have fallen.", options: ["is true", "are true", "being true"], answer: "is true", explanation: "Impersonal structure 'It is true that' requires singular auxiliary 'is'." },
      { sentence: "The claim that renewable power causes instability is completely false.", options: ["is", "are", "were"], answer: "is", explanation: "Singular subject 'The claim' takes singular verb 'is'." }
    ]
  }
};

export default w127;
