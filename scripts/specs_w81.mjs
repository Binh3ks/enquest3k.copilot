/**
 * scripts/specs_w81.mjs
 * Week 81: ELA: The Master Architect (Structure) / Math: Graphing Data
 * Stage 2: Cambridge Lower Secondary & B1 Preliminary
 */

export const w81 = {
  week: 81,
  theme: "ELA: The Master Architect (Structure) / Math: Graphing Data",
  title_en: "The Master Architect: Building a Five-Paragraph Essay",
  title_vi: "Kiến Trúc Sư Tài Ba: Xây Dựng Bài Văn 5 Đoạn",
  cefr_level: "B1 Preliminary",
  grammar_focus: "Transition Signals: 'Firstly', 'Secondly', 'In conclusion'",
  vocab_list: [
    { id: 1, word: "architect", pos: "n", ipa: "/ˈɑːrkɪtekt/", definition_en: "A person who designs buildings and guides the structural plan of complex projects", definition_vi: "kiến trúc sư", example_en: "Like a skilled master architect, an essay writer creates a sturdy blueprint before drafting.", example_vi: "Như một kiến trúc sư bậc thầy lành nghề, người viết bài luận tạo ra một bản thiết kế vững chắc trước khi viết nháp." },
    { id: 2, word: "outline", pos: "n", ipa: "/ˈaʊtlaɪn/", definition_en: "A general description or visual plan giving the essential features of a piece of writing", definition_vi: "dàn ý / đề cương", example_en: "Organizing your ideas into a five-paragraph outline ensures clear logical development.", example_vi: "Sắp xếp các ý tưởng của bạn thành một dàn ý 5 đoạn đảm bảo sự phát triển logic rõ ràng." },
    { id: 3, word: "structure", pos: "n", ipa: "/ˈstrʌktʃər/", definition_en: "The arrangement of and relations between the parts or elements of something complex", definition_vi: "cấu trúc", example_en: "A strong argumentative structure supports your main thesis from beginning to end.", example_vi: "Một cấu trúc lập luận vững chắc sẽ nâng đỡ luận điểm chính của bạn từ đầu đến cuối." },
    { id: 4, word: "paragraph", pos: "n", ipa: "/ˈpærəɡræf/", definition_en: "A distinct section of a piece of writing, usually dealing with a single idea", definition_vi: "đoạn văn", example_en: "Each body paragraph must start with a focused topic sentence that connects to the prompt.", example_vi: "Mỗi đoạn thân bài phải bắt đầu bằng một câu chủ đề tập trung liên kết với đề bài." },
    { id: 5, word: "introduction", pos: "n", ipa: "/ˌɪntrəˈdʌkʃən/", definition_en: "The opening section of an essay that captures attention and states the thesis", definition_vi: "phần mở bài / phần giới thiệu", example_en: "The introduction contains a compelling hook and an unambiguous thesis statement.", example_vi: "Phần mở bài chứa một câu mở đầu lôi cuốn và một câu phát biểu luận điểm rõ ràng." },
    { id: 6, word: "thesis", pos: "n", ipa: "/ˈθiːsɪs/", definition_en: "A statement or theory that is put forward as a premise to be maintained or proved", definition_vi: "luận điểm chính", example_en: "A clear thesis statement informs readers exactly what your essay will demonstrate.", example_vi: "Một câu luận điểm rõ ràng cho người đọc biết chính xác bài luận của bạn sẽ chứng minh điều gì." },
    { id: 7, word: "evidence", pos: "n", ipa: "/ˈevɪdəns/", definition_en: "Facts, quotations, or statistical information that support an argument", definition_vi: "dẫn chứng / chứng cứ", example_en: "Writers provide factual evidence and citations to reinforce their analytical claims.", example_vi: "Người viết đưa ra dẫn chứng thực tế và trích dẫn để củng cố các luận cứ phân tích của mình." },
    { id: 8, word: "conclusion", pos: "n", ipa: "/kənˈkluːʒən/", definition_en: "The final section of an essay that synthesizes main points and offers final insights", definition_vi: "phần kết bài", example_en: "In conclusion, writers restate their thesis in fresh words and summarize key arguments.", example_vi: "Trong phần kết bài, người viết nhắc lại luận điểm bằng từ ngữ mới và tóm tắt các luận cứ chính." },
    { id: 9, word: "transition", pos: "n", ipa: "/trænˈzɪʃən/", definition_en: "A word, phrase, or sentence connecting one topic or paragraph to another smoothly", definition_vi: "từ nối chuyển ý / sự chuyển tiếp", example_en: "Transition signals like 'furthermore' and 'on the other hand' improve reading flow.", example_vi: "Các từ nối chuyển ý như 'furthermore' và 'on the other hand' cải thiện sự mạch lạc khi đọc." },
    { id: 10, word: "draft", pos: "n", ipa: "/dræft/", definition_en: "A preliminary version of a piece of writing subject to revision and editing", definition_vi: "bản thảo / bản viết nháp", example_en: "After completing the outline, Lucas wrote the first draft of his historical essay.", example_vi: "Sau khi hoàn thành dàn ý, Lucas đã viết bản thảo đầu tiên của bài luận lịch sử." },
    { id: 11, word: "cohesion", pos: "n", ipa: "/koʊˈhiːʒən/", definition_en: "The quality of sticking together and forming a unified, logical whole", definition_vi: "sự gắn kết / tính mạch lạc", example_en: "Using consistent pronouns and connecting words gives your essay strong cohesion.", example_vi: "Sử dụng đại từ nhất quán và các từ nối mang lại cho bài luận của bạn sự gắn kết chặt chẽ." },
    { id: 12, word: "argument", pos: "n", ipa: "/ˈɑːrɡjəmənt/", definition_en: "A coherent series of reasons, statements, or facts intended to establish a point of view", definition_vi: "luận điểm / lập luận", example_en: "Each supporting argument should be backed by credible facts and logical reasoning.", example_vi: "Mỗi luận điểm củng cố nên được hỗ trợ bởi các sự kiện đáng tin cậy và lập luận logic." },
    { id: 13, word: "elaborate", pos: "v", ipa: "/ɪˈlæbəreɪt/", definition_en: "To develop or present an idea or theory in further detail and depth", definition_vi: "diễn giải chi tiết / đào sâu", example_en: "Good writers elaborate on their claims by explaining real-world consequences.", example_vi: "Những người viết giỏi diễn giải chi tiết các luận điểm của mình bằng cách giải thích các hệ quả thực tế." },
    { id: 14, word: "blueprint", pos: "n", ipa: "/ˈbluːprɪnt/", definition_en: "A detailed outline or technical plan of action serving as a guide", definition_vi: "bản thiết kế / bản vẽ chi tiết", example_en: "An essay outline functions like an architectural blueprint for building a house.", example_vi: "Một dàn ý bài luận hoạt động giống như một bản thiết kế kiến trúc để xây dựng một ngôi nhà." },
    { id: 15, word: "hook", pos: "n", ipa: "/hʊk/", definition_en: "An opening sentence designed to catch the reader's interest immediately", definition_vi: "câu mở đầu thu hút / câu móc", example_en: "Starting with a surprising question or bold statistic creates an engaging hook.", example_vi: "Bắt đầu bằng một câu hỏi bất ngờ hoặc một số liệu thống kê táo bạo sẽ tạo ra một câu mở đầu đầy lôi cuốn." },
    { id: 16, word: "summary", pos: "n", ipa: "/ˈsʌməri/", definition_en: "A brief statement or account of the main points of something", definition_vi: "bản tóm tắt", example_en: "The final paragraph includes a concise summary of the three body arguments.", example_vi: "Đoạn văn cuối cùng bao gồm một bản tóm tắt ngắn gọn về ba luận cứ trong thân bài." },
    { id: 17, word: "logical", pos: "adj", ipa: "/ˈlɑːdʒɪkəl/", definition_en: "Characterized by or capable of clear, sound, and valid reasoning", definition_vi: "mang tính logic / hợp lý", example_en: "Ideas must follow a logical sequence so readers can track the progression of thoughts.", example_vi: "Các ý tưởng phải đi theo một trình tự logic để người đọc có thể theo dõi sự phát triển của suy nghĩ." },
    { id: 18, word: "revise", pos: "v", ipa: "/rɪˈvaɪz/", definition_en: "To re-examine and alter written work in light of further evidence and feedback", definition_vi: "chỉnh sửa / sửa đổi bài viết", example_en: "Students revise their drafts carefully to eliminate grammatical inconsistencies.", example_vi: "Học sinh chỉnh sửa bản thảo của mình cẩn thận để loại bỏ những điểm bất nhất về ngữ pháp." },
    { id: 19, word: "brainstorm", pos: "v", ipa: "/ˈbreɪnstɔːrm/", definition_en: "To produce an idea or way of solving a problem by holding a spontaneous group or individual discussion", definition_vi: "động não / nảy ra ý tưởng", example_en: "Writers brainstorm multiple potential solutions before choosing their strongest thesis.", example_vi: "Người viết động não nhiều giải pháp tiềm năng trước khi chọn ra luận điểm mạnh nhất của mình." },
    { id: 20, word: "sequence", pos: "n", ipa: "/ˈsiːkwəns/", definition_en: "A particular order in which related events, movements, or things follow each other", definition_vi: "trình tự / chuỗi nối tiếp", example_en: "Chronological sequence markers ensure the historical narrative unfolds naturally.", example_vi: "Các dấu hiệu trình tự thời gian đảm bảo lời kể lịch sử diễn ra một cách tự nhiên." }
  ],
  clil: {
    title_en: "The Master Architect: Crafting the Five-Paragraph Essay",
    title_vi: "Kiến Trúc Sư Tài Ba: Xây Dựng Bài Văn Năm Đoạn",
    content_en: "Writing a successful academic essay is remarkably similar to designing and constructing a sturdy building. A skilled master architect never pours concrete before drafting a rigorous blueprint; likewise, an essayist must establish a five-paragraph outline before writing. Firstly, the introduction lays a deep foundation, opening with an engaging hook and concluding with a clear thesis statement. Secondly, three distinct body paragraphs act as structural pillars, each opening with a focused topic sentence, followed by factual evidence and detailed elaboration. Transition signals such as 'furthermore' and 'in addition' connect these pillars smoothly. Finally, the conclusion provides a protective roof. In conclusion, the writer restates the thesis in refreshed vocabulary, synthesizes the core evidence, and leaves readers with a thought-provoking final reflection.",
    glossary: [
      { word: "architect", definition_en: "A designer who plans complex structures with balance and purpose", definition_vi: "người thiết kế các công trình phức tạp có cân bằng và chủ đích" },
      { word: "outline", definition_en: "A hierarchical schematic organizing main ideas and supporting facts", definition_vi: "sơ đồ phân cấp tổ chức các ý chính và dẫn chứng" },
      { word: "thesis", definition_en: "The overarching central claim that the entire essay proves", definition_vi: "tuyên bố trọng tâm bao trùm mà toàn bài luận chứng minh" },
      { word: "transition", definition_en: "Directional discourse signals linking conceptual paragraphs", definition_vi: "dấu hiệu định hướng diễn ngôn liên kết các đoạn văn" },
      { word: "cohesion", definition_en: "The unified structural integrity of related argumentative points", definition_vi: "sự thống nhất toàn vẹn cấu trúc của các luận điểm" }
    ],
    check_questions: [
      { id: 1, question_en: "Why is creating an outline compared to an architect's blueprint?", options: ["Because it organizes ideas logically before drafting begins", "Because it is drawn with blue colored pencils only", "Because it makes the paper waterproof"], answer: "Because it organizes ideas logically before drafting begins" },
      { id: 2, question_en: "Which transition signals are traditionally used to introduce sequential body paragraphs?", options: ["Firstly, secondly, and furthermore", "Yesterday, tomorrow, and never", "Blue, yellow, and red"], answer: "Firstly, secondly, and furthermore" },
      { id: 3, question_en: "What essential element should appear at the end of the introductory paragraph?", options: ["A clear and focused thesis statement", "A list of spelling mistakes", "A cartoon drawing"], answer: "A clear and focused thesis statement" }
    ],
    critical_thinking: {
      question_en: "How do transition signals like 'Firstly', 'Secondly', and 'In conclusion' enhance reading comprehension?",
      hint_en: "Think about how road signs guide drivers on a highway; transition signals guide the reader's attention through complex ideas."
    }
  },
  shadowing_sentences: [
    { id: 1, text: "A master architect always designs a clear blueprint before building a house.", en: "A master architect always designs a clear blueprint before building a house.", vi: "Một kiến trúc sư bậc thầy luôn thiết kế bản vẽ rõ ràng trước khi xây nhà.", ipa: "/ə ˈmæstər ˈɑːrkɪtekt ˈɔːlweɪz dɪˈzaɪnz ə klɪər ˈbluːprɪnt bɪˈfɔːr ˈbɪldɪŋ ə haʊs/", words: ["A", "master", "architect", "always", "designs", "a", "clear", "blueprint", "before", "building", "a", "house"] },
    { id: 2, text: "Firstly, our introductory paragraph establishes a sturdy thesis statement.", en: "Firstly, our introductory paragraph establishes a sturdy thesis statement.", vi: "Thứ nhất, đoạn mở bài của chúng ta thiết lập một câu luận điểm vững chắc.", ipa: "/ˈfɜːrstli ˈaʊər ˌɪntrəˈdʌktəri ˈpærəɡræf ɪˈstæblɪʃɪz ə ˈstɜːrdi ˈθiːsɪs ˈsteɪtmənt/", words: ["Firstly", "our", "introductory", "paragraph", "establishes", "a", "sturdy", "thesis", "statement"] },
    { id: 3, text: "Secondly, three body paragraphs provide factual evidence and supporting arguments.", en: "Secondly, three body paragraphs provide factual evidence and supporting arguments.", vi: "Thứ hai, ba đoạn thân bài cung cấp dẫn chứng thực tế và các luận điểm củng cố.", ipa: "/ˈsekəndli θriː ˈbɑːdi ˈpærəɡræfs prəˈvaɪd ˈfæktʃuəl ˈevɪdəns ænd səˈpɔːrtɪŋ ˈɑːrɡjəmənts/", words: ["Secondly", "three", "body", "paragraphs", "provide", "factual", "evidence", "and", "supporting", "arguments"] },
    { id: 4, text: "Transition signals connect ideas smoothly to create strong structural cohesion.", en: "Transition signals connect ideas smoothly to create strong structural cohesion.", vi: "Các từ nối chuyển ý liên kết các ý tưởng trôi chảy để tạo sự gắn kết cấu trúc chặt chẽ.", ipa: "/trænˈzɪʃən ˈsɪɡnəlz kəˈnekt aɪˈdiːəz ˈsmuːðli tuː kriˈeɪt strɔːŋ ˈstrʌktʃərəl koʊˈhiːʒən/", words: ["Transition", "signals", "connect", "ideas", "smoothly", "to", "create", "strong", "structural", "cohesion"] },
    { id: 5, text: "Each body section begins with a focused topic sentence that guides the reader.", en: "Each body section begins with a focused topic sentence that guides the reader.", vi: "Mỗi phần thân bài bắt đầu bằng một câu chủ đề tập trung định hướng người đọc.", ipa: "/iːtʃ ˈbɑːdi ˈsekʃən bɪˈɡɪnz wɪð ə ˈfoʊkəst ˈtɑːpɪk ˈsentəns ðæt ɡaɪdz ðə ˈriːdər/", words: ["Each", "body", "section", "begins", "with", "a", "focused", "topic", "sentence", "that", "guides", "the", "reader"] },
    { id: 6, text: "Writers elaborate their claims by explaining real-world consequences.", en: "Writers elaborate their claims by explaining real-world consequences.", vi: "Người viết diễn giải chi tiết các luận điểm bằng cách giải thích các hệ quả thực tế.", ipa: "/ˈraɪtərz ɪˈlæbəreɪt ðer kleɪmz baɪ ɪkˈspleɪnɪŋ rɪəl wɜːrld ˈkɑːnsəkwensɪz/", words: ["Writers", "elaborate", "their", "claims", "by", "explaining", "real-world", "consequences"] },
    { id: 7, text: "In conclusion, writers restate their thesis and synthesize key discoveries.", en: "In conclusion, writers restate their thesis and synthesize key discoveries.", vi: "Tóm lại, người viết nhắc lại luận điểm và tổng hợp những phát hiện chính.", ipa: "/ɪn kənˈkluːʒən ˈraɪtərz ˌriːˈsteɪt ðer ˈθiːsɪs ænd ˈsɪnθəsaɪz kiː dɪˈskʌvəriz/", words: ["In", "conclusion", "writers", "restate", "their", "thesis", "and", "synthesize", "key", "discoveries"] },
    { id: 8, text: "A well-structured essay communicates complex thoughts with power and grace.", en: "A well-structured essay communicates complex thoughts with power and grace.", vi: "Một bài luận có cấu trúc tốt sẽ truyền đạt những suy nghĩ phức tạp với sức mạnh và sự duyên dáng.", ipa: "/ə wel ˈstrʌktʃərd ˈeseɪ kəˈmjuːnɪkeɪts ˈkɑːmpleks θɔːts wɪð ˈpaʊər ænd ɡreɪs/", words: ["A", "well-structured", "essay", "communicates", "complex", "thoughts", "with", "power", "and", "grace"] }
  ],
  story_scenes: [
    { id: 1, scene_id: "scene_1", scene_number: 1, title_en: "The Writing Studio Blueprint Board", title_vi: "Bảng Thiết Kế Phòng Viết Văn", description_en: "Mr. Vance and Lucas pin colorful index cards onto a large whiteboard mapped like a 5-story building.", description: "Mr. Vance and Lucas pin colorful index cards onto a large whiteboard mapped like a 5-story building.", image_url: "/images/week81/webtoon_scene_1.png", audio_url: "/audio/week81/scene_1.mp3" },
    { id: 2, scene_id: "scene_2", scene_number: 2, title_en: "Laying the Introduction Foundation", title_vi: "Đặt Nền Móng Mở Bài", description_en: "Lucas writes an attention-grabbing hook and underlines a sharp thesis statement in red marker.", description: "Lucas writes an attention-grabbing hook and underlines a sharp thesis statement in red marker.", image_url: "/images/week81/webtoon_scene_2.png", audio_url: "/audio/week81/scene_2.mp3" },
    { id: 3, scene_id: "scene_3", scene_number: 3, title_en: "Raising the Three Body Pillars", title_vi: "Dựng Ba Cột Trụ Thân Bài", description_en: "Mr. Vance shows how transition words like 'Firstly' and 'Secondly' support the middle paragraphs.", description: "Mr. Vance shows how transition words like 'Firstly' and 'Secondly' support the middle paragraphs.", image_url: "/images/week81/webtoon_scene_3.png", audio_url: "/audio/week81/scene_3.mp3" },
    { id: 4, scene_id: "scene_4", scene_number: 4, title_en: "The Concluding Roof Synthesis", title_vi: "Mái Nhà Tổng Hợp Kết Bài", description_en: "Lucas crafts a concluding paragraph that brings all evidence together beneath a unifying theme.", description: "Lucas crafts a concluding paragraph that brings all evidence together beneath a unifying theme.", image_url: "/images/week81/webtoon_scene_4.png", audio_url: "/audio/week81/scene_4.mp3" },
    { id: 5, scene_id: "scene_5", scene_number: 5, title_en: "Graphing Essay Proportions", title_vi: "Vẽ Biểu Đồ Tỷ Lệ Bài Luận", description_en: "Lucas plots word count distribution across all five paragraphs on a bar graph in his writer's notebook.", description: "Lucas plots word count distribution across all five paragraphs on a bar graph in his writer's notebook.", image_url: "/images/week81/webtoon_scene_5.png", audio_url: "/audio/week81/scene_5.mp3" }
  ],
  writing_data: {
    title: "Constructing a Five-Paragraph Essay Blueprint",
    prompt_en: "Look at the four panels. Write an expository paragraph explaining how to organize a five-paragraph essay using transition signals ('Firstly', 'Secondly', 'Furthermore', 'In conclusion'). Write 20 or more words.",
    prompt_vi: "Nhìn vào 4 khung tranh. Viết một đoạn văn giải thích cách tổ chức bài luận 5 đoạn sử dụng từ nối chuyển ý ('Firstly', 'Secondly', 'Furthermore', 'In conclusion'). Viết từ 20 từ trở lên.",
    min_sentences: 3,
    min_words: 20,
    max_words: 90,
    model_sentence: "Firstly, the introduction builds a sturdy foundation with an engaging hook and a clear thesis statement. Secondly, the first body paragraph presents solid factual evidence and careful elaboration. Furthermore, subsequent body paragraphs strengthen the argument with logical transitions. In conclusion, the final paragraph restates the thesis and synthesizes key insights, completing the essay blueprint.",
    word_bank: ["architect", "outline", "structure", "paragraph", "introduction", "thesis", "evidence", "conclusion", "transition", "cohesion"],
    sentence_frames: [
      "Firstly, the introduction provides a firm ___ for the entire essay.",
      "Secondly, each body paragraph presents factual ___ to prove the point.",
      "Furthermore, transition signals ensure logical ___ between sections.",
      "In conclusion, the final paragraph provides a clear ___ of the main claims."
    ],
    panels: [
      {
        panel_id: "panel_1",
        title_en: "Panel 1: Introduction Foundation",
        title_vi: "Khung 1: Nền Móng Mở Bài",
        image_url: "/images/week81/writing_panel_1.png",
        image_prompt: "An architectural blueprint showing the concrete foundation of a house labeled 'Introduction & Thesis'.",
        caption: "Firstly, the introduction establishes the thesis foundation.",
        sentence_frame: "Firstly, the introductory paragraph [establishes a sturdy foundation] with [a clear thesis statement].",
        pills: ["establishes a sturdy foundation", "a clear thesis statement", "compelling hook", "introductory paragraph"],
        connectors: ["Firstly,", "To begin with,", "In the opening section,"]
      },
      {
        panel_id: "panel_2",
        title_en: "Panel 2: First Supporting Pillar",
        title_vi: "Khung 2: Cột Trụ Củng Cố Thứ Nhất",
        image_url: "/images/week81/writing_panel_2.png",
        image_prompt: "The first stone pillar of a building rising, labeled 'Body Paragraph 1: Evidence & Examples'.",
        caption: "Secondly, the first body paragraph provides evidence.",
        sentence_frame: "Secondly, the first body paragraph [provides factual evidence] to [support the main thesis].",
        pills: ["provides factual evidence", "support the main thesis", "topic sentence", "first supporting pillar"],
        connectors: ["Secondly,", "Next,", "Following this,"]
      },
      {
        panel_id: "panel_3",
        title_en: "Panel 3: Building Cohesion",
        title_vi: "Khung 3: Xây Dựng Tính Gắn Kết",
        image_url: "/images/week81/writing_panel_3.png",
        image_prompt: "Connecting arches between pillars labeled with transition words like 'Furthermore' and 'In addition'.",
        caption: "Furthermore, transition signals link subsequent body paragraphs.",
        sentence_frame: "Furthermore, transition signals [link supporting paragraphs smoothly] to [create strong cohesion].",
        pills: ["link supporting paragraphs smoothly", "create strong cohesion", "subsequent body sections", "logical progression"],
        connectors: ["Furthermore,", "In addition,", "Moreover,"]
      },
      {
        panel_id: "panel_4",
        title_en: "Panel 4: The Concluding Roof",
        title_vi: "Khung 4: Mái Nhà Kết Luận",
        image_url: "/images/week81/writing_panel_4.png",
        image_prompt: "A finished house with a sheltering roof labeled 'Conclusion: Synthesis & Reflection'.",
        caption: "In conclusion, the final paragraph synthesizes key arguments.",
        sentence_frame: "In conclusion, the final paragraph [synthesizes key arguments] and [restates the core thesis].",
        pills: ["synthesizes key arguments", "restates the core thesis", "lasting final reflection", "completing the structure"],
        connectors: ["In conclusion,", "Ultimately,", "To summarize,"]
      }
    ],
    ladder_stages: [
      {
        badge_label: "MODEL",
        title: "Stage 1: Building the Foundation",
        image_url: "/images/week81/writing_panel_1.png",
        caption: "Firstly, the introduction establishes the thesis foundation.",
        frame_L1: "Firstly, the introduction establishes a firm foundation. It presents a hook and a clear thesis.",
        connectors: ["Firstly,", "To begin with,", "In the opening section,"],
        sentence_hint: "Write 2 sentences about the introduction and thesis.",
        ordered_chips: ["Firstly, the introduction", "lays a solid foundation", "with an engaging hook", "and clear thesis."],
        pills: ["lays a solid foundation", "engaging hook", "clear thesis", "introduction"],
        sentence_frame: "Firstly, the introduction [lays a solid foundation] with [a clear thesis statement]."
      },
      {
        badge_label: "BUILD",
        title: "Stage 2: Supporting Body Pillars",
        image_url: "/images/week81/writing_panel_2.png",
        caption: "Secondly, the first body paragraph provides evidence.",
        frame_L1: "Secondly, body paragraphs provide strong evidence. They explain reasons with real examples.",
        connectors: ["Secondly,", "Next,", "Following this,"],
        sentence_hint: "Write 2 sentences describing evidence in body paragraphs.",
        pills: ["strong evidence", "body paragraphs", "real examples", "topic sentences"],
        sentence_frame: "Secondly, the body paragraphs [present factual evidence] and [explain reasons clearly]."
      },
      {
        badge_label: "WRITE",
        title: "Stage 3: Seamless Transitions",
        image_url: "/images/week81/writing_panel_3.png",
        caption: "Furthermore, transition signals link subsequent body paragraphs.",
        frame_L1: "Furthermore, transition signals connect each idea. Words like 'moreover' create strong cohesion.",
        connectors: ["Furthermore,", "In addition,", "Moreover,"],
        sentence_hint: "Write 2 sentences about using transition words.",
        pills: ["transition signals", "connect each idea", "strong cohesion", "smooth flow"],
        sentence_frame: "Furthermore, transition words [connect ideas smoothly] and [ensure logical cohesion]."
      },
      {
        badge_label: "EXPAND",
        title: "Stage 4: Sheltering Conclusion",
        image_url: "/images/week81/writing_panel_4.png",
        caption: "In conclusion, the final paragraph synthesizes key arguments.",
        frame_L1: "In conclusion, the final paragraph unifies the essay. It restates the thesis and offers lasting insight.",
        connectors: ["In conclusion,", "To summarize,", "Ultimately,"],
        sentence_hint: "Write 2 sentences summarizing the concluding paragraph.",
        pills: ["unifies the essay", "restates the thesis", "lasting insight", "completes the blueprint"],
        sentence_frame: "In conclusion, the writer [restates the thesis] and [synthesizes the main points]."
      }
    ]
  },
  speaking_data: {
    talkshow_prompt: {
      topic: "Mastering Essay Architecture and Transition Signals",
      question: "Mr. Vance, how do transition signals function like architectural supports in writing?",
      model_response: "Transition signals act just like the steel joints and connecting beams of a building! Signals such as 'firstly', 'secondly', and 'in conclusion' show the reader exactly which floor of the argument they are standing on. Without clear transition markers, an essay becomes a confusing pile of unmortared bricks. With them, every paragraph stands tall with balance, clarity, and structural cohesion!"
    },
    info_exchange_cards: {
      table_a: {
        title: "Lucas's Essay Outline Project",
        subtitle: "Candidate's Question Card (Ask Examiner)",
        person: "Lucas",
        fields: [
          { id: "field_a1", cue_prompt: "where / display essay blueprint?", cue_word: "where", is_missing: true, acceptable_questions: ["Where does Lucas display his essay blueprint?", "Where is the blueprint displayed?", "Where does he post the outline?"], nova_reply: "Lucas pins his blueprint on the center corkboard in the writing lab." },
          { id: "field_a2", cue_prompt: "what / central thesis of the essay?", cue_word: "what", is_missing: true, acceptable_questions: ["What is the central thesis of the essay?", "What is his thesis?", "What does the essay argue?"], nova_reply: "His thesis argues that renewable energy creates cleaner cities and healthier communities." },
          { id: "field_a3", cue_prompt: "how many / body paragraphs planned?", cue_word: "how many", is_missing: true, acceptable_questions: ["How many body paragraphs are planned?", "How many paragraphs in the body?", "What is the number of body paragraphs?"], nova_reply: "He planned three distinct body paragraphs, each with two pieces of evidence." },
          { id: "field_a4", cue_prompt: "who / reviews the outline draft?", cue_word: "who", is_missing: true, acceptable_questions: ["Who reviews the outline draft?", "Who checks his outline?", "Who gives feedback on the draft?"], nova_reply: "Writing mentor Mr. Vance reviews the outline draft with him." },
          { id: "field_a5", cue_prompt: "why / transition signals essential?", cue_word: "why", is_missing: true, acceptable_questions: ["Why are transition signals essential?", "Why do we use transition signals?", "Why are transitions important?"], nova_reply: "Because transition signals guide readers smoothly from one argument to the next." }
        ]
      },
      table_b: {
        title: "Mr. Vance's Writing Workshop Guide",
        subtitle: "Information Card (Answer Examiner's Questions)",
        person: "Mr. Vance",
        fields: [
          { id: "field_b1", cue_prompt: "where / conduct weekly writing seminars?", cue_word: "where", value: "In the multimedia humanities seminar room on the third floor.", nova_question: "Where does Mr. Vance conduct his weekly writing seminars?", acceptable_answers: ["In the multimedia humanities seminar room on the third floor.", "On the third floor.", "In the seminar room."] },
          { id: "field_b2", cue_prompt: "what / core textbook used for outlining?", cue_word: "what", value: "The Elements of Structural Composition for Young Essayists.", nova_question: "What core textbook is assigned for the outlining unit?", acceptable_answers: ["The Elements of Structural Composition for Young Essayists.", "The Elements of Structural Composition.", "The Young Essayists composition book."] },
          { id: "field_b3", cue_prompt: "how / measure paragraph word balance?", cue_word: "how", value: "By plotting paragraph lengths on a comparative bar graph.", nova_question: "How do students verify that their paragraph lengths are balanced?", acceptable_answers: ["By plotting paragraph lengths on a comparative bar graph.", "Using a comparative bar graph.", "By plotting lengths on a bar graph."] },
          { id: "field_b4", cue_prompt: "who / judges the annual essay contest?", cue_word: "who", value: "A panel of three visiting university literature professors.", nova_question: "Who judges the academy's annual analytical essay competition?", acceptable_answers: ["A panel of three visiting university literature professors.", "Three university literature professors.", "University professors."] },
          { id: "field_b5", cue_prompt: "why / revise introductory hooks carefully?", cue_word: "why", value: "To capture reader curiosity within the very first twenty seconds.", nova_question: "Why should writers polish their introductory hook so carefully?", acceptable_answers: ["To capture reader curiosity within the very first twenty seconds.", "To capture reader curiosity quickly.", "To interest readers in the first twenty seconds."] }
        ]
      }
    }
  },
  cambridge_rw: {
    part1_definitions: [
      { id: 1, text: "A detailed structural plan or diagram showing the main sections of an essay.", target: "outline" },
      { id: 2, text: "The primary claim or central argument that an essayist proves with evidence.", target: "thesis" },
      { id: 3, text: "A connecting word or phrase that moves readers smoothly between ideas.", target: "transition" },
      { id: 4, text: "The final concluding section of an essay that synthesizes discoveries.", target: "conclusion" },
      { id: 5, text: "Factual information, examples, and citations that reinforce an argument.", target: "evidence" }
    ],
    part2_dialogue: {
      title: "Lucas & Mr. Vance Planning Essay Architecture",
      turns: [
        {
          id: 1,
          speaker: "Lucas",
          prompt: "Mr. Vance, why should an essay writer create an outline before drafting?",
          options: [
            "Because an outline acts like an architect's blueprint, ensuring logical structure.",
            "Because writing outlines uses all our colored pens.",
            "Yes, outlines make our paper fly away."
          ],
          answer: "Because an outline acts like an architect's blueprint, ensuring logical structure."
        },
        {
          id: 2,
          speaker: "Lucas",
          prompt: "What transition signals should we use to introduce body paragraphs?",
          options: [
            "We should use transition signals like 'Firstly', 'Secondly', and 'Furthermore'.",
            "We should write 'Yesterday', 'Never', and 'Maybe'.",
            "We should only write question marks."
          ],
          answer: "We should use transition signals like 'Firstly', 'Secondly', and 'Furthermore'."
        },
        {
          id: 3,
          speaker: "Lucas",
          prompt: "Where does the central thesis statement belong in the essay?",
          options: [
            "It belongs at the end of the introductory paragraph as the main foundation.",
            "It should be hidden under a secret rock.",
            "It only appears on the back cover of the notebook."
          ],
          answer: "It belongs at the end of the introductory paragraph as the main foundation."
        },
        {
          id: 4,
          speaker: "Lucas",
          prompt: "How does a writer conclude the essay with strength?",
          options: [
            "In conclusion, we restate the thesis in new words and synthesize our key points.",
            "By writing 'The End' in giant red letters across the page.",
            "We delete the entire first paragraph."
          ],
          answer: "In conclusion, we restate the thesis in new words and synthesize our key points."
        },
        {
          id: 5,
          speaker: "Lucas",
          prompt: "Shall we graph the word counts of our five paragraphs on a bar chart?",
          options: [
            "Great idea! Let's plot our data to make sure paragraph proportions are balanced.",
            "I would like to eat pancakes now.",
            "The library door is made of blue glass."
          ],
          answer: "Great idea! Let's plot our data to make sure paragraph proportions are balanced."
        }
      ],
      exchanges: [
        { speaker: "Lucas", text: "Mr. Vance, why should an essay writer create an outline before drafting?" },
        { speaker: "Mr. Vance", text: "Because an outline acts like an architect's blueprint, ensuring logical structure." },
        { speaker: "Lucas", text: "What transition signals should we use to introduce body paragraphs?" },
        { speaker: "Mr. Vance", text: "We should use transition signals like 'Firstly', 'Secondly', and 'Furthermore'." },
        { speaker: "Lucas", text: "Where does the central thesis statement belong in the essay?" },
        { speaker: "Mr. Vance", text: "It belongs at the end of the introductory paragraph as the main foundation." },
        { speaker: "Lucas", text: "How does a writer conclude the essay with strength?" },
        { speaker: "Mr. Vance", text: "In conclusion, we restate the thesis in new words and synthesize our key points." },
        { speaker: "Lucas", text: "Shall we graph the word counts of our five paragraphs on a bar chart?" },
        { speaker: "Mr. Vance", text: "Great idea! Let's plot our data to make sure paragraph proportions are balanced." }
      ]
    },
    part6_cloze: {
      title: "Lucas's Writer's Handbook: Essay Architecture",
      instructions: "Read the handbook notes and write the missing words. Write one word on each line.",
      text_template: "Planning an essay is like designing [1]_____ building. Firstly, the introduction establishes a clear [2]_____ statement. Secondly, three body paragraphs provide facts [3]_____ evidence. Transition words connect each idea [4]_____ that readers follow easily. In conclusion, the writer brings everything [5]_____ with a thoughtful reflection.",
      answers: { "1": "a", "2": "thesis", "3": "and", "4": "so", "5": "together" }
    }
  },
  minigames: {
    math_problems: [
      {
        id: "w81_p1",
        type: "part_whole",
        title: "Graphing Word Counts in a Five-Paragraph Essay",
        question: "Lucas's introductory and concluding paragraphs total 130 words combined, while his three body paragraphs contain 270 words. What is the total word count of the five-paragraph essay?",
        storyContext: "Mr. Vance helps Lucas plot paragraph word counts on an analytical bar graph.",
        modelData: {
          bars: [
            { label: "Intro & Conclusion", value: 130, color: "#f59e0b" },
            { label: "Three Body Paragraphs", value: 270, color: "#3b82f6" }
          ],
          total: 400,
          unit: "words"
        },
        target_answer: 400,
        unit: "words",
        steps: [
          "Take the combined intro and conclusion length: 130 words.",
          "Add the three body paragraphs: 270 words.",
          "130 + 270 = 400 total words."
        ]
      },
      {
        id: "w81_p2",
        type: "comparison",
        title: "Comparing Evidence Quotations between Body Paragraphs",
        question: "Body Paragraph 1 contains 48 words of cited evidence, while Body Paragraph 2 contains 32 words of cited evidence. How many more words of evidence are in Paragraph 1 than Paragraph 2?",
        storyContext: "Lucas compares quotation density across two draft sections on his bar chart.",
        modelData: {
          bars: [
            { label: "Paragraph 1 Evidence", value: 48, color: "#10b981" },
            { label: "Paragraph 2 Evidence", value: 32, color: "#6366f1" }
          ],
          difference: 16,
          unit: "words"
        },
        target_answer: 16,
        unit: "words",
        steps: [
          "Start with Paragraph 1 evidence: 48 words.",
          "Subtract Paragraph 2 evidence: 32 words.",
          "48 - 32 = 16 words difference."
        ]
      }
    ],
    action_lab_scenarios: [
      {
        stage: 1,
        title: "Introductory Foundation & Thesis",
        diagram_type: "foundation_hook_blueprint",
        instruction: "Select the required structural elements for a strong introductory paragraph.",
        items: [
          { label: "Engaging Opening Hook", target: "hook" },
          { label: "Contextual Background Info", target: "context" },
          { label: "Definitive Thesis Statement", target: "thesis" }
        ]
      },
      {
        stage: 2,
        title: "Body Paragraph Pillars & Evidence",
        diagram_type: "pillar_evidence_column",
        instruction: "Sequence the internal components of a supportive body paragraph.",
        items: [
          { label: "Clear Topic Sentence", target: "topic_sentence" },
          { label: "Factual Evidence & Quotes", target: "evidence" },
          { label: "Analytical Elaboration", target: "elaboration" }
        ]
      },
      {
        stage: 3,
        title: "Concluding Synthesis & Reflection",
        diagram_type: "roof_synthesis_vault",
        instruction: "Assemble the essential elements of an effective conclusion.",
        items: [
          { label: "Restated Thesis Statement", target: "restate_thesis" },
          { label: "Synthesis of Core Arguments", target: "synthesis" },
          { label: "Provocative Final Thought", target: "reflection" }
        ]
      }
    ],
    grammar_drills: [
      { sentence: "Firstly, the introduction establishes a clear thesis statement.", options: ["Firstly", "First of", "At first"], answer: "Firstly", explanation: "Use 'Firstly' as an enumeration adverb to introduce the first point in formal writing." },
      { sentence: "Secondly, three body paragraphs provide factual evidence.", options: ["Secondly", "Second", "Seconds"], answer: "Secondly", explanation: "Use 'Secondly' to introduce the second item in an ordered sequence." },
      { sentence: "In conclusion, writers restate their thesis in new words.", options: ["In conclusion", "At conclusion", "On conclusion"], answer: "In conclusion", explanation: "The standard prepositional phrase to signal the ending of an essay is 'In conclusion'." },
      { sentence: "Transition signals ensure logical cohesion across the essay.", options: ["cohesion", "cohesive", "cohesively"], answer: "cohesion", explanation: "The noun 'cohesion' describes the quality of parts sticking together into a united whole." },
      { sentence: "A skilled master architect designs a blueprint before building.", options: ["architect", "architecture", "architectural"], answer: "architect", explanation: "Use the noun 'architect' referring to the person who designs structures." }
    ]
  }
};
