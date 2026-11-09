/**
 * scripts/specs_w126.mjs
 * Week 126: Advanced Robotics & Artificial Intelligence Ethics
 * Stage 2: Cambridge Lower Secondary & B2 First / FCE Rotary
 */

export const w126 = {
  week: 126,
  theme: "Advanced Robotics & Artificial Intelligence Ethics",
  title_en: "Advanced Robotics and Artificial Intelligence Ethics",
  title_vi: "Đạo Đức Trong Robot Học và Trí Tuệ Nhân Tạo",
  cefr_level: "B2 First",
  grammar_focus: "Complex Passive Voice & Impersonal Structures: 'It is argued that autonomous systems must be strictly audited before deployment.'",
  vocab_list: [
    { id: 1, word: "robotics", pos: "n", ipa: "/roʊˈbɑːtɪks/", definition_en: "The branch of technology dealing with design, construction, and operation of robots", definition_vi: "ngành người máy, kỹ thuật robot", example_en: "Advanced robotics has transformed precision surgery in modern hospitals.", example_vi: "Kỹ thuật robot tiên tiến đã biến đổi phẫu thuật chính xác tại các bệnh viện hiện đại." },
    { id: 2, word: "algorithm", pos: "n", ipa: "/ˈælɡərɪðəm/", definition_en: "A process or set of mathematical rules to be followed in calculations or problem-solving", definition_vi: "thuật toán", example_en: "The navigation algorithm calculates the fastest autonomous delivery route.", example_vi: "Thuật toán định vị tính toán tuyến đường giao hàng tự hành nhanh nhất." },
    { id: 3, word: "ethics", pos: "n", ipa: "/ˈeθɪks/", definition_en: "Moral principles that govern a person's or organization's behavior", definition_vi: "đạo đức học, chuẩn mực đạo đức", example_en: "Engineers must consider professional ethics when designing autonomous systems.", example_vi: "Các kỹ sư phải cân nhắc đạo đức nghề nghiệp khi thiết kế các hệ thống tự hành." },
    { id: 4, word: "autonomous", pos: "adj", ipa: "/ɔːˈtɑːnəməs/", definition_en: "Operating independently without human intervention", definition_vi: "tự hành, tự chủ", example_en: "Autonomous rovers navigate rough terrain across desert landscapes.", example_vi: "Xe tự hành di chuyển qua địa hình gồ ghề khắp các vùng cảnh quan sa mạc." },
    { id: 5, word: "automation", pos: "n", ipa: "/ˌɔːtəˈmeɪʃən/", definition_en: "The use of largely automatic equipment in a facility or process", definition_vi: "sự tự động hóa", example_en: "Factory automation increases productivity while reducing human physical strain.", example_vi: "Tự động hóa nhà máy tăng năng suất đồng thời giảm bớt căng thẳng thể chất cho con người." },
    { id: 6, word: "bias", pos: "n", ipa: "/ˈbaɪəs/", definition_en: "Prejudice in favor of or against one thing or group compared with another", definition_vi: "sự thiên vị, định kiến", example_en: "Data scientists audit training sets to prevent algorithmic bias.", example_vi: "Các nhà khoa học dữ liệu kiểm toán các tập dữ liệu huấn luyện để ngăn ngừa định kiến thuật toán." },
    { id: 7, word: "transparency", pos: "n", ipa: "/trænsˈpærənsi/", definition_en: "The condition of being open, clear, and easily examined", definition_vi: "tính minh bạch", example_en: "System transparency allows regulators to review machine decision processes.", example_vi: "Tính minh bạch của hệ thống cho phép các cơ quan quản lý xem xét quy trình ra quyết định của máy móc." },
    { id: 8, word: "accountability", pos: "n", ipa: "/əˌkaʊntəˈbɪləti/", definition_en: "The fact or condition of being accountable; responsibility", definition_vi: "trách nhiệm giải trình", example_en: "Legal accountability remains essential when autonomous software makes critical errors.", example_vi: "Trách nhiệm giải trình pháp lý vẫn là điều thiết yếu khi phần mềm tự hành gây ra lỗi nghiêm trọng." },
    { id: 9, word: "sensor", pos: "n", ipa: "/ˈsensər/", definition_en: "A device that detects or measures a physical property and records it", definition_vi: "cảm biến", example_en: "Infrared sensors detect approaching obstacles in complete darkness.", example_vi: "Cảm biến hồng ngoại phát hiện các chướng ngại vật đang tới gần trong bóng tối hoàn toàn." },
    { id: 10, word: "humanoid", pos: "adj", ipa: "/ˈhjuːmənɔɪd/", definition_en: "Having an appearance or character resembling that of a human", definition_vi: "dạng người, hình người", example_en: "The humanoid assistant greeted visitors at the university research lab.", example_vi: "Người máy trợ lý dạng người đã chào đón khách tham quan tại phòng thí nghiệm nghiên cứu của trường đại học." },
    { id: 11, word: "neural network", pos: "n", ipa: "/ˈnʊrəl ˈnetwɜːrk/", definition_en: "A computer system modeled on the human brain and nervous system", definition_vi: "mạng nơ-ron", example_en: "A deep neural network analyzes thousands of medical scans in seconds.", example_vi: "Mạng nơ-ron sâu phân tích hàng ngàn hình ảnh chụp y tế chỉ trong vài giây." },
    { id: 12, word: "regulation", pos: "n", ipa: "/ˌreɡjuˈleɪʃən/", definition_en: "A rule or directive made and maintained by an authority", definition_vi: "quy định, quy chế", example_en: "International regulations establish clear safety thresholds for commercial robotics.", example_vi: "Các quy định quốc tế thiết lập các ngưỡng an toàn rõ ràng cho robot thương mại." },
    { id: 13, word: "framework", pos: "n", ipa: "/ˈfreɪmwɜːrk/", definition_en: "A basic structure underlying a system, concept, or text", definition_vi: "khung cơ chế, khuôn khổ", example_en: "The committee published a comprehensive ethical framework for technology firms.", example_vi: "Ủy ban đã công bố một khuôn khổ đạo đức toàn diện cho các công ty công nghệ." },
    { id: 14, word: "dilemma", pos: "n", ipa: "/dɪˈlemə/", definition_en: "A situation in which a difficult choice has to be made between two alternatives", definition_vi: "tình thế tiến thoái lưỡng nan", example_en: "Self-driving cars face moral dilemmas during unavoidable traffic collisions.", example_vi: "Ô tô tự lái đối mặt với những tình thế lưỡng nan về đạo đức trong những vụ va chạm giao thông không thể tránh khỏi." },
    { id: 15, word: "safeguard", pos: "n", ipa: "/ˈseɪfɡɑːrd/", definition_en: "A measure taken to protect someone or something or to prevent failure", definition_vi: "biện pháp bảo vệ, cơ chế phòng ngừa", example_en: "Strict digital safeguards prevent unauthorized override of robotic controls.", example_vi: "Các biện pháp bảo vệ kỹ thuật số nghiêm ngặt ngăn chặn việc can thiệp trái phép vào điều khiển robot." },
    { id: 16, word: "innovation", pos: "n", ipa: "/ˌɪnəˈveɪʃən/", definition_en: "A new method, idea, or product", definition_vi: "sự đổi mới, sáng kiến", example_en: "Robotic innovation enhances emergency rescue operations in disaster zones.", example_vi: "Đổi mới robot tăng cường các hoạt động cứu hộ khẩn cấp tại các khu vực thảm họa." },
    { id: 17, word: "surveillance", pos: "n", ipa: "/sərˈveɪləns/", definition_en: "Close observation, especially of a suspected person or area", definition_vi: "sự giám sát", example_en: "Public debate centers on facial recognition surveillance in city centers.", example_vi: "Cuộc tranh luận của công chúng tập trung vào việc giám sát bằng nhận diện khuôn mặt tại các trung tâm thành phố." },
    { id: 18, word: "simulation", pos: "n", ipa: "/ˌsɪmjuˈleɪʃən/", definition_en: "The production of a computer model of something, especially for study", definition_vi: "mô phỏng", example_en: "Engineers run virtual simulations before testing the mechanical prototype.", example_vi: "Các kỹ sư chạy các mô phỏng ảo trước khi thử nghiệm nguyên mẫu cơ khí." },
    { id: 19, word: "dataset", pos: "n", ipa: "/ˈdeɪtəset/", definition_en: "A collection of related sets of information composed of separate elements", definition_vi: "tập dữ liệu", example_en: "A balanced dataset ensures that image classifiers identify faces accurately.", example_vi: "Một tập dữ liệu cân bằng đảm bảo rằng các bộ phân loại hình ảnh nhận dạng khuôn mặt một cách chính xác." },
    { id: 20, word: "precedent", pos: "n", ipa: "/ˈpresɪdənt/", definition_en: "An earlier event or action regarded as an example or guide", definition_vi: "tiền lệ", example_en: "The court verdict set a historic precedent for algorithmic accountability.", example_vi: "Phán quyết của tòa án đã thiết lập một tiền lệ lịch sử cho trách nhiệm giải trình của thuật toán." }
  ],
  clil: {
    title_en: "Governing the Machine: Ethical Frameworks in Robotics and AI",
    title_vi: "Quản Trị Máy Móc: Các Khuôn Khổ Đạo Đức Trong Robot Học và AI",
    content_en: "As autonomous machines take on expanding roles in medicine, transport, and manufacturing, society faces critical governance questions. It is widely acknowledged that algorithms possess immense potential to optimize logistics and prevent human fatigue. However, significant ethical dilemmas arise when neural networks make autonomous decisions without human oversight. If training datasets contain historical discrimination, automated decisions inevitably perpetuate social bias. Consequently, international technology bodies demand transparent algorithmic auditing and robust institutional safeguards. Developers are expected to ensure that autonomous agents adhere to strict safety regulations, preserving human dignity and legal accountability across all deployment stages.",
    glossary: [
      { word: "robotics", definition_en: "Engineering field creating autonomous and programmable machines", definition_vi: "ngành kỹ thuật chế tạo máy móc tự hành" },
      { word: "algorithm", definition_en: "Calculated computational sequence designed to solve problems", definition_vi: "chuỗi tính toán logic giải quyết vấn đề" },
      { word: "transparency", definition_en: "Openness and explainability in computational decision-making", definition_vi: "tính công khai và giải thích được trong quyết định máy" },
      { word: "accountability", definition_en: "Clear assignment of legal and ethical responsibility", definition_vi: "sự quy gán trách nhiệm pháp lý và đạo đức rõ ràng" },
      { word: "safeguard", definition_en: "Protective mechanism designed to prevent systemic harm", definition_vi: "cơ chế bảo vệ ngăn ngừa tổn hại mang tính hệ thống" }
    ],
    check_questions: [
      { id: 1, question_en: "Why is algorithmic auditing essential for training datasets in modern machine learning?", options: ["To detect and eliminate hidden biases before automated deployment", "To make robots run faster without battery power", "To delete all programming code permanently"], answer: "To detect and eliminate hidden biases before automated deployment" },
      { id: 2, question_en: "What impersonal passive structure expresses societal consensus on machine governance?", options: ["It is widely acknowledged that algorithms require oversight", "Robots will play soccer happily", "Computers eat electricity everyday"], answer: "It is widely acknowledged that algorithms require oversight" },
      { id: 3, question_en: "Who holds accountability when autonomous systems cause unintended harm?", options: ["The institutions, engineers, and governing bodies deploying the technology", "Only the metal chassis of the robot", "No one, because machines have no legal owners"], answer: "The institutions, engineers, and governing bodies deploying the technology" }
    ],
    critical_thinking: {
      question_en: "How can developers balance rapid technological innovation with rigorous safety safeguards in medical robotics?",
      hint_en: "Consider the necessity of peer-reviewed clinical trials and verifiable software transparency before patient contact."
    }
  },
  shadowing_sentences: [
    { id: 1, text: "It is widely believed that autonomous systems require comprehensive regulatory frameworks.", en: "It is widely believed that autonomous systems require comprehensive regulatory frameworks.", vi: "Người ta tin tưởng rộng rãi rằng các hệ thống tự hành đòi hỏi những khuôn khổ quản lý toàn diện.", ipa: "/ɪt ɪz ˈwaɪdli bɪˈliːvd ðæt ɔːˈtɑːnəməs ˈsɪstəmz rɪˈkwaɪər ˌkɑːmprɪˈhensɪv ˈreɡjulətɔːri ˈfreɪmwɜːrks/", words: ["It", "is", "widely", "believed", "that", "autonomous", "systems", "require", "comprehensive", "regulatory", "frameworks"] },
    { id: 2, text: "Algorithms must be evaluated continuously to eliminate systemic social bias.", en: "Algorithms must be evaluated continuously to eliminate systemic social bias.", vi: "Các thuật toán phải được đánh giá liên tục để loại bỏ định kiến xã hội mang tính hệ thống.", ipa: "/ˈælɡərɪðəmz mʌst biː ɪˈvæljueɪtɪd kənˈtɪnjuəsli tuː ɪˈlɪmɪneɪt sɪˈstemɪk ˈsoʊʃəl ˈbaɪəs/", words: ["Algorithms", "must", "be", "evaluated", "continuously", "to", "eliminate", "systemic", "social", "bias"] },
    { id: 3, text: "Strict institutional safeguards have been established by international ethics committees.", en: "Strict institutional safeguards have been established by international ethics committees.", vi: "Những cơ chế phòng ngừa nghiêm ngặt đã được thiết lập bởi các ủy ban đạo đức quốc tế.", ipa: "/strɪkt ˌɪnstɪˈtuːʃənl ˈseɪfɡɑːrdz hæv biːn ɪˈstæblɪʃt baɪ ˌɪntərˈnæʃnəl ˈeθɪks kəˈmɪtiz/", words: ["Strict", "institutional", "safeguards", "have", "been", "established", "by", "international", "ethics", "committees"] },
    { id: 4, text: "Full computational transparency allows engineers to audit complex machine decisions.", en: "Full computational transparency allows engineers to audit complex machine decisions.", vi: "Tính minh bạch tính toán đầy đủ cho phép các kỹ sư kiểm toán các quyết định máy móc phức tạp.", ipa: "/fʊl ˌkɑːmpjuˈteɪʃənl trænsˈpærənsi əˈlaʊz ˌendʒɪˈnɪrz tuː ˈɔːdɪt ˈkɑːmpleks məˈʃiːn dɪˈsɪʒənz/", words: ["Full", "computational", "transparency", "allows", "engineers", "to", "audit", "complex", "machine", "decisions"] },
    { id: 5, text: "High-resolution sensors transmit environmental data directly to the navigation processor.", en: "High-resolution sensors transmit environmental data directly to the navigation processor.", vi: "Các cảm biến độ phân giải cao truyền dữ liệu môi trường trực tiếp tới bộ xử lý điều hướng.", ipa: "/haɪ ˌrezəˈluːʃən ˈsensərz trænzˈmɪt ɪnˌvaɪrənˈmentl ˈdeɪtə dəˈrektli tuː ðə ˌnævɪˈɡeɪʃən ˈprɑːsesər/", words: ["High-resolution", "sensors", "transmit", "environmental", "data", "directly", "to", "the", "navigation", "processor"] },
    { id: 6, text: "Moral dilemmas emerge whenever automated vehicles confront unavoidable emergency collisions.", en: "Moral dilemmas emerge whenever automated vehicles confront unavoidable emergency collisions.", vi: "Những tình thế lưỡng nan về đạo đức xuất hiện bất cứ khi nào phương tiện tự động đối mặt với va chạm khẩn cấp không thể tránh khỏi.", ipa: "/ˈmɔːrəl dɪˈleməz ɪˈmɜːrdʒ wenˈevər ˈɔːtəmeɪtɪd ˈviːɪkəlz kənˈfrʌnt ˌʌnəˈvɔɪdəbəl ɪˈmɜːrdʒənsi kəˈlɪʒənz/", words: ["Moral", "dilemmas", "emerge", "whenever", "automated", "vehicles", "confront", "unavoidable", "emergency", "collisions"] },
    { id: 7, text: "Extensive virtual simulations were conducted prior to authorizing public trials.", en: "Extensive virtual simulations were conducted prior to authorizing public trials.", vi: "Các mô phỏng ảo quy mô lớn đã được tiến hành trước khi cấp phép thử nghiệm công cộng.", ipa: "/ɪkˈstensɪv ˈvɜːrtʃuəl ˌsɪmjuˈleɪʃənz wɜːr kənˈdʌktɪd ˈpraɪər tuː ˈɔːθəraɪzɪŋ ˈpʌblɪk ˈtraɪəlz/", words: ["Extensive", "virtual", "simulations", "were", "conducted", "prior", "to", "authorizing", "public", "trials"] },
    { id: 8, text: "Clear legal accountability must be preserved throughout every stage of deployment.", en: "Clear legal accountability must be preserved throughout every stage of deployment.", vi: "Trách nhiệm giải trình pháp lý rõ ràng phải được bảo tồn xuyên suốt mọi giai đoạn triển khai.", ipa: "/klɪr ˈliːɡəl əˌkaʊntəˈbɪləti mʌst biː prɪˈzɜːrvd θruːˈaʊt ˈevri steɪdʒ əv dɪˈplɔɪmənt/", words: ["Clear", "legal", "accountability", "must", "be", "preserved", "throughout", "every", "stage", "of", "deployment"] }
  ],
  story_scenes: [
    { id: 1, scene_id: "scene_1", scene_number: 1, title_en: "Calibrating the Autonomous Prototype", title_vi: "Hiệu Chuẩn Nguyên Mẫu Tự Hành", description_en: "Dr. Elena Vance and Ethan Cole inspect sensor telemetry on their new medical transport rover.", description: "Dr. Elena Vance and Ethan Cole inspect sensor telemetry on their new medical transport rover.", image_url: "/images/week126/webtoon_scene_1.png", audio_url: "/audio/week126/scene_1.mp3" },
    { id: 2, scene_id: "scene_2", scene_number: 2, title_en: "Auditing Algorithmic Datasets", title_vi: "Kiểm Toán Tập Dữ Liệu Thuật Toán", description_en: "Ethan spots demographic bias in the navigation image training sets and flags the disparity.", description: "Ethan spots demographic bias in the navigation image training sets and flags the disparity.", image_url: "/images/week126/webtoon_scene_2.png", audio_url: "/audio/week126/scene_2.mp3" },
    { id: 3, scene_id: "scene_3", scene_number: 3, title_en: "Virtual Obstacle Simulation", title_vi: "Mô Phỏng Chướng Ngại Vật Ảo", description_en: "The rover encounters complex multi-hazard collision scenarios within a digital twin simulation.", description: "The rover encounters complex multi-hazard collision scenarios within a digital twin simulation.", image_url: "/images/week126/webtoon_scene_3.png", audio_url: "/audio/week126/scene_3.mp3" },
    { id: 4, scene_id: "scene_4", scene_number: 4, title_en: "Establishing Safety Safeguards", title_vi: "Thiết Lập Các Cơ Chế Bảo Vệ An Toàn", description_en: "Dr. Vance hardcodes manual override commands to ensure human operators retain final authority.", description: "Dr. Vance hardcodes manual override commands to ensure human operators retain final authority.", image_url: "/images/week126/webtoon_scene_4.png", audio_url: "/audio/week126/scene_4.mp3" },
    { id: 5, scene_id: "scene_5", scene_number: 5, title_en: "Ethics Council Ratification", title_vi: "Thông Qua Tại Hội Đồng Đạo Đức", description_en: "The hospital ethics committee signs off on clinical trials after reviewing full system transparency.", description: "The hospital ethics committee signs off on clinical trials after reviewing full system transparency.", image_url: "/images/week126/webtoon_scene_5.png", audio_url: "/audio/week126/scene_5.mp3" }
  ],
  writing_data: {
    title: "Auditing an Autonomous Medical Assistant",
    prompt_en: "Look at the four pictures. Write a formal investigative report about Dr. Vance and Ethan evaluating the safety and ethics of an autonomous hospital rover. Write 20 or more words.",
    prompt_vi: "Nhìn vào 4 bức tranh. Viết bản báo cáo điều tra về Tiến sĩ Vance và Ethan đánh giá độ an toàn và đạo đức của robot bệnh viện tự hành (từ 20 từ trở lên).",
    min_sentences: 3,
    min_words: 20,
    max_words: 90,
    model_sentence: "Dr. Elena Vance and Ethan Cole conducted rigorous safety trials on their autonomous hospital rover. First, the sensors were calibrated to detect moving obstacles accurately. Next, Ethan audited the training datasets to eliminate algorithmic bias. After virtual simulations confirmed emergency stops functioned, the ethics committee approved clinical hospital deployment.",
    word_bank: ["robotics", "algorithm", "ethics", "autonomous", "bias", "transparency", "safeguard", "simulation", "sensor", "accountability"],
    sentence_frames: [
      "Initially, the autonomous rover was evaluated within the university ___ laboratory.",
      "Engineers discovered that training data required balancing to prevent algorithmic ___.",
      "Comprehensive digital ___ verified that emergency brakes engaged under all conditions.",
      "Ultimately, institutional approval was granted due to complete system ___."
    ],
    panels: [
      {
        panel_id: "panel_1",
        title_en: "Laboratory Sensor Calibration",
        title_vi: "Hiệu Chuẩn Cảm Biến Phòng Thí Nghiệm",
        image_url: "/images/week126/writing_panel_1.png",
        image_prompt: "Two scientists in lab coats testing laser sensor arrays on a sleek wheeled hospital transport robot.",
        caption: "Engineers calibrated sensor arrays to ensure obstacle detection was flawless.",
        sentence_frame: "First, the research team [calibrated laser sensor arrays] to ensure [flawless obstacle detection].",
        pills: ["calibrated laser sensor arrays", "flawless obstacle detection", "Dr. Vance and Ethan", "precision diagnostic"],
        connectors: ["First,", "Initially,", "At the start of testing,"]
      },
      {
        panel_id: "panel_2",
        title_en: "Algorithmic Bias Inspection",
        title_vi: "Thanh Tra Định Kiến Thuật Toán",
        image_url: "/images/week126/writing_panel_2.png",
        image_prompt: "A researcher examining lines of code and demographic distribution charts on a glowing monitor.",
        caption: "Ethan audited neural network training sets to remove demographic bias.",
        sentence_frame: "Next, the engineer [audited neural network datasets] to prevent [discriminatory algorithmic bias].",
        pills: ["audited neural network datasets", "discriminatory algorithmic bias", "data integrity", "demographic balance"],
        connectors: ["Next,", "Subsequently,", "Following data analysis,"]
      },
      {
        panel_id: "panel_3",
        title_en: "Virtual Collision Simulation",
        title_vi: "Mô Phỏng Va Chạm Khẩn Cấp",
        image_url: "/images/week126/writing_panel_3.png",
        image_prompt: "A computer screen showing a 3D digital simulation of hospital hallways with virtual patients and carts.",
        caption: "Simulations demonstrated that automated safeguards halted the rover safely.",
        sentence_frame: "After that, virtual simulations proved that [emergency stopping safeguards] engaged [within milliseconds].",
        pills: ["emergency stopping safeguards", "within milliseconds", "digital twin trial", "collision prevention"],
        connectors: ["After that,", "Furthermore,", "In subsequent tests,"]
      },
      {
        panel_id: "panel_4",
        title_en: "Regulatory Certification Granted",
        title_vi: "Cấp Chứng Nhận Quản Lý",
        image_url: "/images/week126/writing_panel_4.png",
        image_prompt: "A formal ethics review board handing signed compliance documents to smiling robotics engineers.",
        caption: "The ethics board ratified hospital deployment based on full transparency.",
        sentence_frame: "In the end, the ethics committee [authorized clinical deployment] due to [verified system transparency].",
        pills: ["authorized clinical deployment", "verified system transparency", "ratified compliance", "Dr. Vance smiled"],
        connectors: ["In the end,", "Finally,", "Consequently,"]
      }
    ],
    ladder_stages: [
      {
        badge_label: "MODEL",
        title: "Sensor Calibration",
        image_url: "/images/week126/writing_panel_1.png",
        caption: "Engineers calibrated sensor arrays to ensure obstacle detection was flawless.",
        frame_L1: "First, the engineering team tested optical sensors. They confirmed that spatial mapping was accurate.",
        connectors: ["First,", "Initially,", "To begin,"],
        sentence_hint: "Write 2 sentences describing sensor testing in the laboratory.",
        ordered_chips: ["Engineers tested", "optical sensor arrays", "to verify", "accurate spatial mapping"],
        pills: ["optical sensors", "spatial mapping", "Dr. Vance", "laboratory trial"],
        sentence_frame: "First, engineers tested [optical sensor arrays] to ensure [accurate spatial mapping]."
      },
      {
        badge_label: "BUILD",
        title: "Dataset Auditing",
        image_url: "/images/week126/writing_panel_2.png",
        caption: "Ethan audited neural network training sets to remove demographic bias.",
        frame_L1: "Next, the data scientist analyzed training datasets. Biased data was removed to protect patient safety.",
        connectors: ["Next,", "Subsequently,", "In addition,"],
        sentence_hint: "Write 2 sentences about eliminating algorithmic bias from training data.",
        pills: ["training datasets", "removed biased data", "Ethan inspected", "algorithm fairness"],
        sentence_frame: "Next, the data scientist analyzed [training datasets] and removed [unbalanced demographic data]."
      },
      {
        badge_label: "WRITE",
        title: "Simulated Stress Testing",
        image_url: "/images/week126/writing_panel_3.png",
        caption: "Simulations demonstrated that automated safeguards halted the rover safely.",
        frame_L1: "After that, the robot ran hundred virtual hallway trials. Automated brakes prevented every simulated crash.",
        connectors: ["After that,", "Furthermore,", "Meanwhile,"],
        sentence_hint: "Write 2 sentences explaining virtual collision simulations.",
        pills: ["virtual trials", "automated brakes", "prevented collisions", "digital twin"],
        sentence_frame: "After that, virtual trials confirmed that [automated brakes] prevented [every simulated collision]."
      },
      {
        badge_label: "EXPAND",
        title: "Ethics Council Approval",
        image_url: "/images/week126/writing_panel_4.png",
        caption: "The ethics board ratified hospital deployment based on full transparency.",
        frame_L1: "In the end, hospital regulators reviewed audit logs. They approved clinical testing because accountability was maintained.",
        connectors: ["In the end,", "Finally,", "As a result,"],
        sentence_hint: "Write 2 sentences about receiving formal ethics board approval.",
        pills: ["audit logs", "approved testing", "accountability maintained", "clinical trial"],
        sentence_frame: "In the end, regulators reviewed [audit logs] and approved [clinical hospital testing]."
      }
    ]
  },
  speaking_data: {
    talkshow_prompt: {
      topic: "Ethical Governance in Autonomous Healthcare Robotics",
      question: "Dr. Vance, should autonomous robotic systems ever be granted full decision-making authority over critical patient triage?",
      model_response: "It is widely agreed among bioethicists that automated systems must never operate without meaningful human supervision in critical triage. While machine learning algorithms can analyze vital signs with unmatched speed, moral accountability cannot be transferred to software. Human physicians must retain the final prerogative to override algorithmic recommendations, ensuring that empathy, contextual judgment, and institutional accountability are preserved."
    },
    info_exchange_cards: {
      table_a: {
        title: "Dr. Vance's Autonomous Hospital Rover",
        subtitle: "Candidate's Question Card (Ask Examiner)",
        person: "Dr. Vance",
        fields: [
          { id: "field_a1", cue_prompt: "where / rover tested?", cue_word: "where", is_missing: true, acceptable_questions: ["Where was the autonomous rover tested?", "Where did the testing take place?", "Where was the rover evaluated?"], nova_reply: "The rover was tested in the simulated corridors of St. Jude University Research Hospital." },
          { id: "field_a2", cue_prompt: "what sensors / detect obstacles?", cue_word: "what sensors", is_missing: true, acceptable_questions: ["What sensors detect obstacles in corridors?", "What kind of sensors are used?", "Which sensors detect obstacles?"], nova_reply: "It relies on solid-state lidar and panoramic ultrasonic proximity sensors." },
          { id: "field_a3", cue_prompt: "how / prevent algorithmic bias?", cue_word: "how", is_missing: true, acceptable_questions: ["How do engineers prevent algorithmic bias?", "How is bias prevented in training?", "How do they eliminate bias?"], nova_reply: "Data scientists balance demographic datasets and run independent fairness audits monthly." },
          { id: "field_a4", cue_prompt: "who / holds legal accountability?", cue_word: "who", is_missing: true, acceptable_questions: ["Who holds legal accountability for errors?", "Who is responsible if an error occurs?", "Who holds accountability?"], nova_reply: "The hospital governing board and the robotics manufacturing firm share legal liability." },
          { id: "field_a5", cue_prompt: "when / clinical deployment begin?", cue_word: "when", is_missing: true, acceptable_questions: ["When will clinical deployment begin?", "When does hospital deployment start?", "When will trials start?"], nova_reply: "Clinical deployment is scheduled to begin in the cardiology wing next September." }
        ]
      },
      table_b: {
        title: "Ethan Cole's Carebot Prototype",
        subtitle: "Information Card (Answer Examiner's Questions)",
        person: "Ethan",
        fields: [
          { id: "field_b1", cue_prompt: "where / carebot deployed?", cue_word: "where", value: "At the Oakwood Senior Living rehabilitation center in Manchester.", nova_question: "Where is Ethan's carebot prototype currently deployed?", acceptable_answers: ["At the Oakwood Senior Living rehabilitation center in Manchester.", "At Oakwood Senior Living.", "In Manchester."] },
          { id: "field_b2", cue_prompt: "what tasks / robot perform?", cue_word: "what tasks", value: "It delivers prescribed medications and monitors patient heart telemetry.", nova_question: "What primary tasks does the carebot perform for residents?", acceptable_answers: ["It delivers prescribed medications and monitors patient heart telemetry.", "Delivers medication and monitors heart telemetry.", "Delivering medication and monitoring vitals."] },
          { id: "field_b3", cue_prompt: "why / manual override required?", cue_word: "why", value: "To guarantee human nurses can disengage automated navigation instantly.", nova_question: "Why is a manual physical override switch required on the unit?", acceptable_answers: ["To guarantee human nurses can disengage automated navigation instantly.", "So nurses can stop automated navigation instantly.", "To allow instant human disengagement."] },
          { id: "field_b4", cue_prompt: "how long / battery operate?", cue_word: "how long", value: "The dual lithium-polymer pack powers continuous operation for fourteen hours.", nova_question: "How long can the prototype operate between charging cycles?", acceptable_answers: ["The dual lithium-polymer pack powers continuous operation for fourteen hours.", "Fourteen hours continuously.", "For fourteen hours."] },
          { id: "field_b5", cue_prompt: "what regulation / standard certified?", cue_word: "what regulation", value: "It earned ISO-13482 international safety certification for personal care robots.", nova_question: "What regulatory safety certification has the prototype received?", acceptable_answers: ["It earned ISO-13482 international safety certification for personal care robots.", "ISO-13482 international safety certification.", "ISO-13482 certification."] }
        ]
      }
    }
  },
  cambridge_rw: {
    part1_definitions: [
      { id: 1, definition_en: "The branch of engineering dealing with autonomous mechanical agents.", options: ["robotics", "ethics", "algorithm"], answer: "robotics" },
      { id: 2, definition_en: "A step-by-step mathematical rule used for calculations and problem solving.", options: ["algorithm", "sensor", "bias"], answer: "algorithm" },
      { id: 3, definition_en: "Systematic moral principles that govern professional conduct and decisions.", options: ["ethics", "innovation", "dilemma"], answer: "ethics" },
      { id: 4, definition_en: "Operating independently without requiring constant human steering.", options: ["autonomous", "humanoid", "resilient"], answer: "autonomous" },
      { id: 5, definition_en: "A disproportionate weight in favor of or against an idea or group in data.", options: ["bias", "accountability", "safeguard"], answer: "bias" },
      { id: 6, definition_en: "The condition of being clear, verifiable, and open to external auditing.", options: ["transparency", "surveillance", "simulation"], answer: "transparency" },
      { id: 7, definition_en: "The legal obligation to answer for outcomes and rectify failures.", options: ["accountability", "regulation", "innovation"], answer: "accountability" },
      { id: 8, definition_en: "A physical instrument that detects changes in heat, light, or distance.", options: ["sensor", "algorithm", "dataset"], answer: "sensor" },
      { id: 9, definition_en: "A difficult ethical choice between two equally undesirable alternatives.", options: ["dilemma", "precedent", "framework"], answer: "dilemma" },
      { id: 10, definition_en: "A protective measure designed to prevent unauthorized or dangerous failure.", options: ["safeguard", "bias", "surveillance"], answer: "safeguard" }
    ],
    part2_dialogue: {
      topic: "Ethical Oversight of Autonomous Healthcare Robotics",
      turns: [
        {
          speaker: "Dr. Vance",
          text: "Ethan, how can we prove to the hospital review board that our navigation algorithm is completely unbiased?",
          options: [
            "We have published our training datasets and full audit logs for external scrutiny.",
            "I usually take the commuter train to the university campus at eight.",
            "The laboratory cafeteria serves chicken sandwiches on Thursdays."
          ],
          answer: "We have published our training datasets and full audit logs for external scrutiny."
        },
        {
          speaker: "Ethan",
          text: "Should autonomous rovers be allowed to deliver medications without a nurse checking the barcode first?",
          options: [
            "It is strongly recommended that medical staff retain dual-verification control.",
            "My sister recently moved to an apartment near the city center.",
            "No, the printer ran out of recycled white paper this morning."
          ],
          answer: "It is strongly recommended that medical staff retain dual-verification control."
        },
        {
          speaker: "Dr. Vance",
          text: "What safety safeguards are activated if a patient suddenly steps directly into the rover's blind spot?",
          options: [
            "Ultrasonic proximity sensors trigger an automatic mechanical brake within fifty milliseconds.",
            "We played competitive badminton in the university recreation center.",
            "The library requires students to show their digital identity badges."
          ],
          answer: "Ultrasonic proximity sensors trigger an automatic mechanical brake within fifty milliseconds."
        },
        {
          speaker: "Ethan",
          text: "How does our proposed governance framework assign legal accountability in case of hardware failure?",
          options: [
            "Accountability is clearly shared between software developers and hospital administration.",
            "The museum exhibits ancient Greek pottery and bronze sculptures.",
            "I forgot to return the laboratory locker keys to security yesterday."
          ],
          answer: "Accountability is clearly shared between software developers and hospital administration."
        },
        {
          speaker: "Dr. Vance",
          text: "Shall we present our transparent audit report to the ethics council this afternoon?",
          options: [
            "Yes, let's present our findings so they can approve the clinical pilot trials.",
            "I prefer drinking green tea instead of black coffee after lunch.",
            "The conference room is located on the third floor of the east tower."
          ],
          answer: "Yes, let's present our findings so they can approve the clinical pilot trials."
        }
      ],
      exchanges: [
        { speaker: "Dr. Vance", text: "Ethan, how can we prove to the hospital review board that our navigation algorithm is completely unbiased?" },
        { speaker: "Ethan", text: "We have published our training datasets and full audit logs for external scrutiny." },
        { speaker: "Dr. Vance", text: "Should autonomous rovers be allowed to deliver medications without a nurse checking the barcode first?" },
        { speaker: "Ethan", text: "It is strongly recommended that medical staff retain dual-verification control." },
        { speaker: "Dr. Vance", text: "What safety safeguards are activated if a patient suddenly steps directly into the rover's blind spot?" },
        { speaker: "Ethan", text: "Ultrasonic proximity sensors trigger an automatic mechanical brake within fifty milliseconds." },
        { speaker: "Dr. Vance", text: "How does our proposed governance framework assign legal accountability in case of hardware failure?" },
        { speaker: "Ethan", text: "Accountability is clearly shared between software developers and hospital administration." },
        { speaker: "Dr. Vance", text: "Shall we present our transparent audit report to the ethics council this afternoon?" },
        { speaker: "Ethan", text: "Yes, let's present our findings so they can approve the clinical pilot trials." }
      ]
    },
    part6_cloze: {
      title: "Ethan Cole's Engineering Logbook: Algorithmic Auditing",
      instructions: "Read the diary and write the missing words. Write one word on each line.",
      text_template: "Dear Logbook, today Dr. Vance and I completed our formal audit [1]_____ the autonomous hospital rover. It is widely agreed that algorithms must [2]_____ monitored to avoid bias. Sensor telemetry confirmed that emergency brakes engaged [3]_____ fifty milliseconds during simulations. By maintaining full transparency, our team ensured [4]_____ accountability remains clear. Tomorrow, we will present our findings [5]_____ the university ethics board.",
      answers: { "1": "of", "2": "be", "3": "within", "4": "that", "5": "to" }
    }
  },
  minigames: {
    math_problems: [
      {
        id: "w126_p1",
        type: "part_whole",
        title: "Algorithmic Dataset Demographic Distribution",
        question: "An AI training dataset contains 650 audited clinical images and 350 simulated synthetic images. What is the total volume of training images in the balanced dataset?",
        storyContext: "Ethan tallies image files across diagnostic categories to ensure balance.",
        modelData: {
          bars: [
            { label: "Clinical Scans", value: 650, color: "#3b82f6" },
            { label: "Synthetic Models", value: 350, color: "#10b981" }
          ],
          total: 1000,
          unit: "images"
        },
        target_answer: 1000,
        unit: "images",
        steps: [
          "Identify 650 audited clinical images.",
          "Add 350 synthetic simulation images.",
          "650 + 350 = 1000 images in total."
        ]
      },
      {
        id: "w126_p2",
        type: "comparison",
        title: "Sensor Response Latency Optimization",
        question: "The legacy rover proximity sensor responded in 85 milliseconds, whereas the upgraded optical sensor triggers in 35 milliseconds. By how many milliseconds was sensor latency reduced?",
        storyContext: "Dr. Vance benchmarks hardware stop speeds across repeated obstacle trials.",
        modelData: {
          bars: [
            { label: "Legacy Sensor", value: 85, color: "#ef4444" },
            { label: "Upgraded Sensor", value: 35, color: "#06b6d4" }
          ],
          difference: 50,
          unit: "milliseconds"
        },
        target_answer: 50,
        unit: "milliseconds",
        steps: [
          "Start with legacy latency of 85 ms.",
          "Subtract upgraded latency of 35 ms.",
          "85 - 35 = 50 ms reduction in latency."
        ]
      }
    ],
    action_lab_scenarios: [
      {
        stage: 1,
        title: "Classifying Ethical Governance Principles",
        diagram_type: "governance_matrix",
        instruction: "Assign each technological practice to its corresponding ethical principle.",
        items: [
          { label: "Publishing Training Code -> Transparency", target: "transparency" },
          { label: "Designating Legal Liability -> Accountability", target: "accountability" },
          { label: "Balancing Demographic Ratios -> Fairness", target: "fairness" },
          { label: "Manual Emergency Killswitch -> Safeguard", target: "safeguard" }
        ]
      },
      {
        stage: 2,
        title: "Sensor Pipeline Data Flow",
        diagram_type: "sensor_pipeline",
        instruction: "Trace the sequence of information from physical obstacle to robotic braking.",
        items: [
          { label: "Optical Sensor Detection", target: "step_1" },
          { label: "Neural Network Analysis", target: "step_2" },
          { label: "Mechanical Brake Activation", target: "step_3" }
        ]
      },
      {
        stage: 3,
        title: "Institutional Audit Protocol",
        diagram_type: "audit_verification",
        instruction: "Order the mandatory stages before clinical deployment authorization.",
        items: [
          { label: "Virtual Stress Simulation", target: "stage_1" },
          { label: "Third-Party Bias Assessment", target: "stage_2" },
          { label: "Ethics Council Certification", target: "stage_3" }
        ]
      }
    ],
    grammar_drills: [
      { sentence: "It is widely believed that autonomous systems require strict oversight.", options: ["believed", "believing", "believe"], answer: "believed", explanation: "Use past participle 'believed' in the impersonal passive structure 'It is widely believed that'." },
      { sentence: "Training datasets must be audited to prevent discriminatory bias.", options: ["audited", "auditing", "audit"], answer: "audited", explanation: "Passive modal construction requires 'must be' followed by past participle 'audited'." },
      { sentence: "Emergency safeguards were established by the international committee.", options: ["were established", "was established", "establishing"], answer: "were established", explanation: "Plural subject 'safeguards' requires plural passive auxiliary 'were established'." },
      { sentence: "Full transparency allows regulators to inspect complex algorithms.", options: ["allows", "allowing", "allow"], answer: "allows", explanation: "Singular non-count noun 'transparency' requires singular 3rd person verb 'allows'." },
      { sentence: "Accountability is considered essential whenever machines make decisions.", options: ["is considered", "are considered", "considering"], answer: "is considered", explanation: "Singular noun 'accountability' takes singular passive verb 'is considered'." }
    ]
  }
};

export default w126;
