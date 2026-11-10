#!/usr/bin/env python3
"""
Generate scripts/specs_w133.mjs and scripts/specs_w134.mjs
Week 133: Deep Research & Data (Syllabus words: statistic, percent, study, data, majority, minority, survey, population)
Week 134: Identifying Fallacies (Syllabus words: fallacy, generalization, assumption, true, false, valid, invalid, logic)
Stage 2: B2 First / Cambridge Lower Secondary
"""

import json

def render_js(spec_obj, export_name):
    js_content = json.dumps(spec_obj, indent=2, ensure_ascii=False)
    return f"/**\n * Auto-generated Spec for Week {spec_obj['week']}: {spec_obj['theme']}\n * Strict Blueprint Fidelity\n */\n\nexport const {export_name} = {js_content};\n\nexport default {export_name};\n"

# ==============================================================================
# WEEK 133: Deep Research & Data
# ==============================================================================
w133 = {
  "week": 133,
  "theme": "Deep Research & Data",
  "title_en": "Deep Research & Data",
  "title_vi": "Nghiên cứu Sâu & Dữ liệu",
  "cefr_level": "B2 First",
  "grammar_focus": "Citation phrases & empirical reporting ('According to a study by...', 'Statistics demonstrate that...', 'Data reveals that...').",
  "vocab_list": [
    { "id": 1, "word": "statistic", "pos": "n", "ipa": "/stəˈtɪstɪk/", "definition_en": "A numerical fact or piece of data derived from a large quantity of numerical data", "definition_vi": "số liệu thống kê", "example_en": "The landmark statistic indicated that seventy percent of middle school students play video games.", "example_vi": "Số liệu thống kê mang tính bước ngoặt chỉ ra rằng bảy mươi phần trăm học sinh trung học cơ sở chơi trò chơi điện tử." },
    { "id": 2, "word": "percent", "pos": "n", "ipa": "/pərˈsent/", "definition_en": "One part in every hundred; represented by the percent symbol", "definition_vi": "phần trăm", "example_en": "Only twelve percent of surveyed players reported persistent feelings of digital fatigue.", "example_vi": "Chỉ mười hai phần trăm người chơi được khảo sát báo cáo cảm giác mệt mỏi kỹ thuật số kéo dài." },
    { "id": 3, "word": "study", "pos": "n", "ipa": "/ˈstʌdi/", "definition_en": "A detailed investigation and analytical examination of a subject or situation", "definition_vi": "công trình nghiên cứu", "example_en": "A four-year longitudinal study tracked adolescent gaming habits across twenty school districts.", "example_vi": "Một nghiên cứu theo chiều dọc kéo dài bốn năm đã theo dõi thói quen chơi game của thanh thiếu niên trên hai mươi học khu." },
    { "id": 4, "word": "data", "pos": "n", "ipa": "/ˈdeɪtə/", "definition_en": "Facts and statistics collected together for reference, calculation, or analysis", "definition_vi": "dữ liệu / số liệu thu thập", "example_en": "Empirical survey data provides verifiable foundation for evidence-based policymaking.", "example_vi": "Dữ liệu khảo sát thực nghiệm cung cấp nền tảng có thể kiểm chứng cho việc hoạch định chính sách dựa trên bằng chứng." },
    { "id": 5, "word": "majority", "pos": "n", "ipa": "/məˈdʒɔːrəti/", "definition_en": "The greater number or part of something; representing more than fifty percent", "definition_vi": "đa số / phần lớn", "example_en": "The vast majority of respondents reported that cooperative gaming improved their teamwork skills.", "example_vi": "Đại đa số người được hỏi cho biết việc chơi game hợp tác đã cải thiện kỹ năng làm việc nhóm của họ." },
    { "id": 6, "word": "minority", "pos": "n", "ipa": "/maɪˈnɔːrəti/", "definition_en": "The smaller number or part of a group; representing less than fifty percent", "definition_vi": "thiểu số / phần nhỏ", "example_en": "A small minority of participants exhibited signs of compulsive overnight screen usage.", "example_vi": "Một bộ phận nhỏ người tham gia có dấu hiệu sử dụng màn hình cưỡng chế qua đêm." },
    { "id": 7, "word": "survey", "pos": "n", "ipa": "/ˈsɜːrveɪ/", "definition_en": "A research investigation of opinions or behaviors of a representative sample group", "definition_vi": "cuộc khảo sát / điều tra", "example_en": "The university conducted an anonymous online survey involving four thousand young players.", "example_vi": "Trường đại học đã tiến hành một cuộc khảo sát trực tuyến ẩn danh với sự tham gia của bốn nghìn người chơi trẻ tuổi." },
    { "id": 8, "word": "population", "pos": "n", "ipa": "/ˌpɑːpjəˈleɪʃən/", "definition_en": "The entire group of individuals from which a statistical sample is drawn", "definition_vi": "quần thể nghiên cứu / tổng dân số đối tượng", "example_en": "The sample was carefully calibrated to mirror the broader national adolescent population.", "example_vi": "Mẫu khảo sát đã được hiệu chuẩn cẩn thận để phản ánh đúng quần thể thanh thiếu niên quốc gia rộng lớn hơn." },
    { "id": 9, "word": "sample", "pos": "n", "ipa": "/ˈsæmpəl/", "definition_en": "A representative subset of individuals selected from a larger population", "definition_vi": "mẫu nghiên cứu", "example_en": "Researchers selected a randomized sample of one thousand students from diverse backgrounds.", "example_vi": "Các nhà nghiên cứu đã chọn một mẫu ngẫu nhiên gồm một nghìn học sinh từ các hoàn cảnh khác nhau." },
    { "id": 10, "word": "quantitative", "pos": "adj", "ipa": "/ˈkwɑːntəteɪtɪv/", "definition_en": "Relating to, measuring, or measured by the numerical quantity of something", "definition_vi": "định lượng", "example_en": "Quantitative research relies on measurable data and mathematical statistical models.", "example_vi": "Nghiên cứu định lượng dựa trên dữ liệu có thể đo lường và các mô hình thống kê toán học." },
    { "id": 11, "word": "methodology", "pos": "n", "ipa": "/ˌmeθəˈdɑːlədʒi/", "definition_en": "A systematic system of methods applied within a particular research field", "definition_vi": "phương pháp luận nghiên cứu", "example_en": "The research team published their full methodology to ensure scientific transparency.", "example_vi": "Nhóm nghiên cứu đã công bố toàn bộ phương pháp luận của họ để đảm bảo tính minh bạch khoa học." },
    { "id": 12, "word": "findings", "pos": "n", "ipa": "/ˈfaɪndɪŋz/", "definition_en": "Information or conclusions discovered as the result of a scientific inquiry", "definition_vi": "kết quả nghiên cứu / các phát hiện", "example_en": "The initial findings challenged common stereotypes regarding youth computer usage.", "example_vi": "Các phát hiện ban đầu đã thách thức những định kiến phổ biến liên quan đến việc sử dụng máy tính của giới trẻ." },
    { "id": 13, "word": "correlation", "pos": "n", "ipa": "/ˌkɔːrəˈleɪʃən/", "definition_en": "A mutual statistical relationship or connection between two or more variables", "definition_vi": "sự tương quan", "example_en": "Scientists discovered a moderate correlation between late-night gaming and morning tardiness.", "example_vi": "Các nhà khoa học đã phát hiện ra mối tương quan vừa phải giữa việc chơi game khuya và việc đi học muộn vào buổi sáng." },
    { "id": 14, "word": "variable", "pos": "n", "ipa": "/ˈveriəbəl/", "definition_en": "An element, feature, or numerical factor that is liable to change in an experiment", "definition_vi": "biến số nghiên cứu", "example_en": "Sleep duration was treated as the primary dependent variable in the regression analysis.", "example_vi": "Thời lượng giấc ngủ được coi là biến phụ thuộc chính trong phân tích hồi quy." },
    { "id": 15, "word": "analyze", "pos": "v", "ipa": "/ˈænəlaɪz/", "definition_en": "To examine methodically and in detail the constitution or structure of data", "definition_vi": "phân tích", "example_en": "Data analysts use advanced statistical software to analyze thousands of survey responses.", "example_vi": "Các nhà phân tích dữ liệu sử dụng phần mềm thống kê tiên tiến để phân tích hàng nghìn phản hồi khảo sát." },
    { "id": 16, "word": "respondent", "pos": "n", "ipa": "/rɪˈspɑːndənt/", "definition_en": "A person who replies to an inquiry, questionnaire, or research survey", "definition_vi": "người trả lời khảo sát", "example_en": "Each respondent completed a thirty-question survey evaluating daily digital habits.", "example_vi": "Mỗi người trả lời đã hoàn thành một bảng khảo sát gồm ba mươi câu hỏi đánh giá thói quen kỹ thuật số hàng ngày." },
    { "id": 17, "word": "metric", "pos": "n", "ipa": "/ˈmetrɪk/", "definition_en": "A standard of quantitative measurement used for assessment or tracking", "definition_vi": "chỉ số đo lường", "example_en": "Weekly active playing hours served as the primary behavioral metric in the investigation.", "example_vi": "Số giờ chơi tích cực hàng tuần đóng vai trò là chỉ số đo lường hành vi chính trong cuộc điều tra." },
    { "id": 18, "word": "empirical", "pos": "adj", "ipa": "/ɪmˈpɪrɪkəl/", "definition_en": "Based on, concerned with, or verifiable by systematic observation or experience", "definition_vi": "mang tính thực nghiệm", "example_en": "Empirical evidence carries far more scholarly weight than unsubstantiated personal anecdotes.", "example_vi": "Bằng chứng thực nghiệm mang nhiều trọng lượng học thuật hơn là những giai thoại cá nhân vô căn cứ." },
    { "id": 19, "word": "hypothesis", "pos": "n", "ipa": "/haɪˈpɑːθəsɪs/", "definition_en": "A proposed formal explanation made on the basis of limited evidence as a starting point", "definition_vi": "giả thuyết nghiên cứu", "example_en": "The research team formulated a hypothesis that moderate puzzle gaming enhances spatial reasoning.", "example_vi": "Nhóm nghiên cứu đã xây dựng giả thuyết rằng chơi game giải đố có chừng mực sẽ nâng cao khả năng suy luận không gian." },
    { "id": 20, "word": "frequency", "pos": "n", "ipa": "/ˈfriːkwənsi/", "definition_en": "The rate at which something occurs or is repeated over a specified time period", "definition_vi": "tần suất xuất hiện", "example_en": "The survey recorded the frequency of multiplayer collaborative sessions per week.", "example_vi": "Cuộc khảo sát đã ghi lại tần suất của các buổi chơi hợp tác nhiều người chơi mỗi tuần." }
  ],
  "clil": {
    "title_en": "Quantitative Evidence: Deep Research and Data in Video Game Studies",
    "title_vi": "Bằng Chứng Định Lượng: Nghiên Cứu Sâu và Dữ Liệu Trong Các Nghiên Cứu Về Trò Chơi Điện Tử",
    "content_en": "In rigorous academic inquiry, scholars rely on deep research and quantitative data to substantiate empirical arguments. Rather than relying on anecdotal claims about youth gaming habits, researchers conduct structured surveys across representative demographic samples. According to a landmark study by university psychologists, seventy percent of adolescent students play video games weekly. The collected data revealed that a substantial majority of players utilize cooperative multiplayer games to build social connections. However, a small minority exhibited signs of problematic usage that correlated with sleep deficits. When citing empirical evidence in research papers, students employ precise attribution phrases such as 'According to data published by the survey...' and 'Statistics demonstrate that...'. Incorporating verifiable numerical metrics transforms subjective assertions into credible, evidence-based academic scholarship.",
    "glossary": [
      { "word": "statistic", "definition_en": "A numerical datum or quantitative indicator computed from a representative sample", "definition_vi": "số liệu định lượng hoặc chỉ số đo lường tính toán từ một mẫu đại diện" },
      { "word": "percent", "definition_en": "A ratio expressed as a fraction of one hundred used in demographic proportions", "definition_vi": "tỷ lệ được biểu thị dưới dạng một phần một trăm dùng trong cơ cấu tỷ lệ dân số" },
      { "word": "quantitative", "definition_en": "Relating to measurements involving precise numerical values and statistical models", "definition_vi": "liên quan đến các phép đo liên quan đến các giá trị số chính xác và mô hình thống kê" },
      { "word": "correlation", "definition_en": "A mutual statistical association between two measurable observational variables", "definition_vi": "mối liên hệ thống kê tương hỗ giữa hai biến số quan sát có thể đo lường" },
      { "word": "empirical", "definition_en": "Originating in or verified by systematic sensory observation or experimental data", "definition_vi": "bắt nguồn từ hoặc được kiểm chứng bằng quan sát có hệ thống hoặc dữ liệu thực nghiệm" }
    ],
    "check_questions": [
      { "id": 1, "question_en": "What percentage of adolescent students play video games weekly according to the university study?", "options": ["Seventy percent", "Ten percent", "Ninety-nine percent"], "answer": "Seventy percent" },
      { "id": 2, "question_en": "What did the research data reveal about the majority of adolescent players?", "options": ["A substantial majority utilize cooperative games to build positive social connections", "The majority never speak to their friends or family", "The majority only play games on old radio sets"], "answer": "A substantial majority utilize cooperative games to build positive social connections" },
      { "id": 3, "question_en": "Which phrase is an accurate academic citation formula for introducing data?", "options": ["'According to a study by...'", "'I personally dreamed that...'", "'Everybody always knows that...'"], "answer": "'According to a study by...'" }
    ],
    "critical_thinking": {
      "question_en": "Why does correlation between late-night gaming and sleep deficits not automatically prove that gaming is the sole cause of insomnia?",
      "hint_en": "Other hidden variables, such as school stress, caffeine consumption, or academic homework loads, could independently cause both delayed sleep and late gaming."
    }
  },
  "shadowing_sentences": [
    { "id": 1, "text": "According to a landmark study by university psychologists, seventy percent of adolescents play video games.", "en": "According to a landmark study by university psychologists, seventy percent of adolescents play video games.", "vi": "Theo một nghiên cứu mang tính bước ngoặt của các nhà tâm lý học đại học, bảy mươi phần trăm thanh thiếu niên chơi game.", "ipa": "/əˈkɔːrdɪŋ tuː ə ˈlændmɑːrk ˈstʌdi baɪ ˌjuːnəˈvɜːrsəti saɪˈkɑːlədʒɪsts ˈsevənti pərˈsent əv ˌædəˈlesənts pleɪ ˈvɪdioʊ ɡeɪmz/", "words": ["According", "to", "a", "landmark", "study", "by", "university", "psychologists", "seventy", "percent", "of", "adolescents", "play", "video", "games"] },
    { "id": 2, "text": "The collected survey data revealed that a substantial majority play cooperative multiplayer games.", "en": "The collected survey data revealed that a substantial majority play cooperative multiplayer games.", "vi": "Dữ liệu khảo sát thu thập được tiết lộ rằng phần lớn chơi các trò chơi hợp tác nhiều người chơi.", "ipa": "/ðə kəˈlektɪd ˈsɜːrveɪ ˈdeɪtə rɪˈviːld ðæt ə səbˈstænʃəl məˈdʒɔːrəti pleɪ koʊˈɑːpərətɪv ˌmʌltiˈpleɪər ɡeɪmz/", "words": ["The", "collected", "survey", "data", "revealed", "that", "a", "substantial", "majority", "play", "cooperative", "multiplayer", "games"] },
    { "id": 3, "text": "Statistics demonstrate that a small minority exhibit signs of problematic screen usage.", "en": "Statistics demonstrate that a small minority exhibit signs of problematic screen usage.", "vi": "Số liệu thống kê chứng minh rằng một thiểu số nhỏ có dấu hiệu sử dụng màn hình có vấn đề.", "ipa": "/stəˈtɪstɪks ˈdemənstreɪt ðæt ə smɔːl maɪˈnɔːrəti ɪɡˈzɪbɪt saɪnz əv ˌprɑːbləˈmætɪk skriːn ˈjuːsɪdʒ/", "words": ["Statistics", "demonstrate", "that", "a", "small", "minority", "exhibit", "signs", "of", "problematic", "screen", "usage"] },
    { "id": 4, "text": "Researchers analyzed a randomized demographic sample of two thousand high school respondents.", "en": "Researchers analyzed a randomized demographic sample of two thousand high school respondents.", "vi": "Các nhà nghiên cứu đã phân tích một mẫu nhân khẩu học ngẫu nhiên gồm hai nghìn người trả lời ở trường trung học phổ thông.", "ipa": "/ˈriːsɜːrtʃərz ˈænəlaɪzd ə ˈrændəmaɪzd ˌdeməˈɡræfɪk ˈsæmpəl əv tuː ˈθaʊzənd haɪ skuːl rɪˈspɑːndənts/", "words": ["Researchers", "analyzed", "a", "randomized", "demographic", "sample", "of", "two", "thousand", "high", "school", "respondents"] },
    { "id": 5, "text": "Empirical evidence transforms subjective personal assertions into credible scholarly arguments.", "en": "Empirical evidence transforms subjective personal assertions into credible scholarly arguments.", "vi": "Bằng chứng thực nghiệm biến các khẳng định cá nhân chủ quan thành các lập luận học thuật đáng tin cậy.", "ipa": "/ɪmˈpɪrɪkəl ˈevɪdəns trænsˈfɔːrmz səbˈdʒektɪv ˈpɜːrsənəl əˈsɜːrʃənz ˈɪntuː ˈkredəbəl ˈskɑːlərli ˈɑːrɡjəmənts/", "words": ["Empirical", "evidence", "transforms", "subjective", "personal", "assertions", "into", "credible", "scholarly", "arguments"] },
    { "id": 6, "text": "Data reveals a moderate correlation between excessive midnight gaming and morning fatigue.", "en": "Data reveals a moderate correlation between excessive midnight gaming and morning fatigue.", "vi": "Dữ liệu tiết lộ mối tương quan vừa phải giữa việc chơi game khuya quá mức và sự mệt mỏi vào buổi sáng.", "ipa": "/ˈdeɪtə rɪˈviːlz ə ˈmɑːdərət ˌkɔːrəˈleɪʃən bɪˈtwiːn ɪkˈsesɪv ˈmɪdnaɪt ˈɡeɪmɪŋ ænd ˈmɔːrnɪŋ fəˈtiːɡ/", "words": ["Data", "reveals", "a", "moderate", "correlation", "between", "excessive", "midnight", "gaming", "and", "morning", "fatigue"] },
    { "id": 7, "text": "Publishing the exact methodology ensures that scientific findings can be independently replicated.", "en": "Publishing the exact methodology ensures that scientific findings can be independently replicated.", "vi": "Công bố phương pháp luận chính xác đảm bảo rằng các phát hiện khoa học có thể được lặp lại một cách độc lập.", "ipa": "/ˈpʌblɪʃɪŋ ði ɪɡˈzækt ˌmeθəˈdɑːlədʒi ɪnˈʃʊrz ðæt ˌsaɪənˈtɪfɪk ˈfaɪndɪŋz kæn bi ˌɪndɪˈpendəntli ˈreplɪkeɪtɪd/", "words": ["Publishing", "the", "exact", "methodology", "ensures", "that", "scientific", "findings", "can", "be", "independently", "replicated"] },
    { "id": 8, "text": "Rigorous data analysis equips students to evaluate public health claims with precision.", "en": "Rigorous data analysis equips students to evaluate public health claims with precision.", "vi": "Phân tích dữ liệu nghiêm ngặt trang bị cho học sinh khả năng đánh giá các khẳng định sức khỏe cộng đồng một cách chính xác.", "ipa": "/ˈrɪɡərəs ˈdeɪtə əˈnæləsɪs ɪˈkwɪps ˈstuːdənts tuː ɪˈvæljueɪt ˈpʌblɪk helθ kleɪmz wɪð prɪˈsɪʒən/", "words": ["Rigorous", "data", "analysis", "equips", "students", "to", "evaluate", "public", "health", "claims", "with", "precision"] }
  ],
  "story_scenes": [
    { "id": 1, "scene_id": "scene_1", "scene_number": 1, "title_en": "Formulating the Research Hypothesis", "title_vi": "Xây Dựng Giả Thuyết Nghiên Cứu", "description_en": "Ethan and Hannah discuss whether computer gaming automatically reduces academic grades among their peers.", "description": "Ethan and Hannah discuss whether computer gaming automatically reduces academic grades among their peers.", "image_url": "/images/week133/webtoon_scene_1.png", "audio_url": "/audio/week133/scene_1.mp3" },
    { "id": 2, "scene_id": "scene_2", "scene_number": 2, "title_en": "Surveying a Randomized Student Sample", "title_vi": "Khảo Sát Mẫu Học Sinh Ngẫu Nhiên", "description_en": "They distribute an anonymous quantitative survey to five hundred students across five local middle schools.", "description": "They distribute an anonymous quantitative survey to five hundred students across five local middle schools.", "image_url": "/images/week133/webtoon_scene_2.png", "audio_url": "/audio/week133/scene_2.mp3" },
    { "id": 3, "scene_id": "scene_3", "scene_number": 3, "title_en": "Analyzing Statistical Metrics", "title_vi": "Phân Tích Các Chỉ Số Thống Kê", "description_en": "Hannah plots response variables in a spreadsheet, calculating that seventy percent of gamers maintain high honor roll marks.", "description": "Hannah plots response variables in a spreadsheet, calculating that seventy percent of gamers maintain high honor roll marks.", "image_url": "/images/week133/webtoon_scene_3.png", "audio_url": "/audio/week133/scene_3.mp3" },
    { "id": 4, "scene_id": "scene_4", "scene_number": 4, "title_en": "Citing Verified Academic Authorities", "title_vi": "Trích Dẫn Các Cơ Quan Học Thuật Đã Kiểm Chứng", "description_en": "Ethan integrates citation phrases like 'According to a study by...' to ground their local survey in national data.", "description": "Ethan integrates citation phrases like 'According to a study by...' to ground their local survey in national data.", "image_url": "/images/week133/webtoon_scene_4.png", "audio_url": "/audio/week133/scene_4.mp3" },
    { "id": 5, "scene_id": "scene_5", "scene_number": 5, "title_en": "Publishing the Empirical Report", "title_vi": "Công Bố Báo Cáo Thực Nghiệm", "description_en": "The faculty review board approves their empirical research paper for presentation at the regional science fair.", "description": "The faculty review board approves their empirical research paper for presentation at the regional science fair.", "image_url": "/images/week133/webtoon_scene_5.png", "audio_url": "/audio/week133/scene_5.mp3" }
  ],
  "writing_data": {
    "title": "Citing Quantitative Evidence and Statistical Findings in Research",
    "prompt_en": "Look at the four panels. Write a research findings paragraph reporting quantitative data on youth gaming habits. Use formal attribution citation formulas ('According to a study by...', 'Statistics demonstrate that...', 'Data reveals that...') and precise numerical metrics. Write 20 or more words.",
    "prompt_vi": "Nhìn vào 4 khung tranh. Viết một đoạn văn kết quả nghiên cứu báo cáo dữ liệu định lượng về thói quen chơi game của giới trẻ. Sử dụng các cấu trúc trích dẫn chính thức ('According to a study by...', 'Statistics demonstrate that...', 'Data reveals that...') và các chỉ số số liệu chính xác. Viết từ 20 từ trở lên.",
    "min_sentences": 3,
    "min_words": 20,
    "max_words": 90,
    "model_sentence": "According to a landmark empirical study conducted by university psychologists, seventy percent of adolescent students play video games on a weekly basis. Survey data demonstrates that a substantial majority of players utilize cooperative multiplayer modes to build social friendships. Furthermore, statistics reveal that only a small twelve-percent minority exhibit problematic sleep disruption, disproving the stereotype that all gaming harms academic wellbeing.",
    "word_bank": ["statistic", "percent", "study", "data", "majority", "minority", "survey", "population", "sample", "empirical"],
    "sentence_frames": [
      "According to a landmark ___, seventy percent of youth play digital games weekly.",
      "The collected survey ___ reveals that a substantial majority play cooperatively.",
      "Furthermore, statistics demonstrate that only a small ___ experiences sleep issues.",
      "Ultimately, citing verified ___ transforms personal claims into credible scholarship."
    ],
    "panels": [
      {
        "panel_id": "panel_1",
        "title_en": "Panel 1: Formulating the Survey Hypothesis",
        "title_vi": "Khung 1: Xây Dựng Giả Thuyết Khảo Sát",
        "image_url": "/images/week133/writing_panel_1.png",
        "image_prompt": "Two researchers designing a questionnaire on laptop screens with statistical flowcharts on the whiteboard.",
        "caption": "Researchers draft a structured survey to test hypotheses against demographic data.",
        "sentence_frame": "Researchers [formulate an empirical hypothesis] to [evaluate youth gaming habits scientifically].",
        "pills": ["formulate an empirical hypothesis", "evaluate youth gaming habits scientifically", "structured survey questionnaire", "demographic research sample"],
        "connectors": ["First,", "In the planning phase,", "To begin the study,"]
      },
      {
        "panel_id": "panel_2",
        "title_en": "Panel 2: Sampling the Student Population",
        "title_vi": "Khung 2: Lấy Mẫu Quần Thể Học Sinh",
        "image_url": "/images/week133/writing_panel_2.png",
        "image_prompt": "Students in a school computer lab quietly answering an online research survey with privacy dividers.",
        "caption": "A randomized sample of respondents completes the quantitative questionnaire.",
        "sentence_frame": "A representative sample [completes the anonymous survey] to [provide verifiable numerical data].",
        "pills": ["completes the anonymous survey", "provide verifiable numerical data", "randomized participant sample", "diverse student population"],
        "connectors": ["Next,", "During data collection,", "Across the survey,"]
      },
      {
        "panel_id": "panel_3",
        "title_en": "Panel 3: Analyzing Numerical Metrics",
        "title_vi": "Khung 3: Phân Tích Các Chỉ Số Số Liệu",
        "image_url": "/images/week133/writing_panel_3.png",
        "image_prompt": "A researcher pointing to colorful pie charts and bar graphs showing seventy percent participation and high grades.",
        "caption": "Statistical analysis reveals that seventy percent of gamers maintain strong grades.",
        "sentence_frame": "Data analysis [reveals that a substantial majority] of [gamers maintain high academic standing].",
        "pills": ["reveals that a substantial majority", "gamers maintain high academic standing", "statistical pie charts", "seventy percent metric"],
        "connectors": ["According to the data,", "Statistics reveal that,", "Furthermore,"]
      },
      {
        "panel_id": "panel_4",
        "title_en": "Panel 4: Citing Formal Scholarly Findings",
        "title_vi": "Khung 4: Trích Dẫn Các Phát Hiện Học Thuật Chính Thức",
        "image_url": "/images/week133/writing_panel_4.png",
        "image_prompt": "A student presenting a research poster titled Deep Research & Data at a science symposium with faculty listening.",
        "caption": "Scholarly citation phrases ground arguments in verifiable scientific data.",
        "sentence_frame": "Scholarly citation formulas [transform subjective opinions into] an [evidence-based research publication].",
        "pills": ["transform subjective opinions into", "evidence-based research publication", "scholarly citation formulas", "verifiable academic proof"],
        "connectors": ["In conclusion,", "Ultimately,", "Consequently,"]
      }
    ],
    "ladder_stages": [
      {
        "badge_label": "MODEL",
        "title": "Stage 1: Introducing the Survey Source",
        "image_url": "/images/week133/writing_panel_1.png",
        "caption": "Researchers draft a structured survey to test hypotheses against demographic data.",
        "frame_L1": "Scientists conducted a study on video games. They surveyed many students to collect facts.",
        "connectors": ["First,", "According to researchers,", "To begin,"],
        "sentence_hint": "Write 2 sentences introducing who conducted the study and what was investigated.",
        "ordered_chips": ["According to a study", "by university researchers,", "seventy percent of students", "play video games weekly."],
        "pills": ["according to a study", "university researchers", "seventy percent of students", "play video games weekly"],
        "sentence_frame": "Researchers [formulate an empirical hypothesis] to [evaluate youth gaming habits scientifically]."
      },
      {
        "badge_label": "BUILD",
        "title": "Stage 2: Reporting the Majority Metric",
        "image_url": "/images/week133/writing_panel_2.png",
        "caption": "A randomized sample of respondents completes the quantitative questionnaire.",
        "frame_L1": "The survey data shows interesting facts. A large majority of players enjoy cooperative team games.",
        "connectors": ["Survey data shows,", "Furthermore,", "In addition,"],
        "sentence_hint": "Write 2 sentences reporting the findings about the majority of players.",
        "pills": ["survey data shows", "large majority of players", "cooperative team games", "build friendships"],
        "sentence_frame": "The collected survey data [reveals that a substantial majority] of [participants play cooperative games]."
      },
      {
        "badge_label": "WRITE",
        "title": "Stage 3: Quantifying the Minority Finding",
        "image_url": "/images/week133/writing_panel_3.png",
        "caption": "Statistical analysis reveals that seventy percent of gamers maintain strong grades.",
        "frame_L1": "Only a small minority has sleep problems. Statistics prove that most gamers keep good school marks.",
        "connectors": ["In contrast,", "Statistics demonstrate that,", "On the other hand,"],
        "sentence_hint": "Write 2 sentences contrasting the small minority with the broader population.",
        "pills": ["small minority has issues", "statistics demonstrate that", "keep good school marks", "twelve percent metric"],
        "sentence_frame": "Statistics demonstrate that [only a twelve-percent minority] experiences [problematic sleep disruption]."
      },
      {
        "badge_label": "EXPAND",
        "title": "Stage 4: Synthesizing Evidence-Based Claims",
        "image_url": "/images/week133/writing_panel_4.png",
        "caption": "Scholarly citation phrases ground arguments in verifiable scientific data.",
        "frame_L1": "Using real statistics makes our writing credible. Empirical evidence proves that stereotypes about gaming are false.",
        "connectors": ["In conclusion,", "Ultimately,", "Consequently,"],
        "sentence_hint": "Write 2 sentences concluding why quantitative data makes claims believable.",
        "pills": ["real statistics create credibility", "empirical evidence proves", "stereotypes are false", "evidence-based scholarship"],
        "sentence_frame": "Scholarly citation formulas [transform subjective opinions into] an [evidence-based research publication]."
      }
    ]
  },
  "speaking_data": {
    "talkshow_prompt": {
      "topic": "Using Deep Research and Quantitative Data in Public Debate",
      "question": "Hannah, why does citing precise statistics carry far more weight than sharing personal anecdotes?",
      "model_response": "Personal stories are emotionally moving, but they represent the experience of only one individual! In contrast, when you say: 'According to a survey of two thousand students, seventy percent play cooperatively and only twelve percent experience sleep deficits,' you are describing the broader population! Precise quantitative statistics provide verifiable proof that stops opponents from dismissing your argument as mere personal bias!"
    },
    "info_exchange_cards": {
      "table_a": {
        "title": "Hannah's Adolescent Gaming Survey",
        "subtitle": "Candidate's Question Card (Ask Examiner)",
        "person": "Hannah",
        "fields": [
          { "id": "field_a1", "cue_prompt": "where / adolescent gaming survey conducted?", "cue_word": "where", "is_missing": True, "acceptable_questions": ["Where was the adolescent gaming survey conducted?", "Where was the survey held?", "Where did Hannah conduct the gaming survey?"], "nova_reply": "Across fifteen public middle schools in the Greater Boston metropolitan district." },
          { "id": "field_a2", "cue_prompt": "what / exact percentage of weekly gamers recorded?", "cue_word": "what", "is_missing": True, "acceptable_questions": ["What is the exact percentage of weekly gamers recorded?", "What percent play weekly?", "What percentage was found?"], "nova_reply": "Exactly seventy-one point four percent of respondents played weekly." },
          { "id": "field_a3", "cue_prompt": "how many / total respondents completed questionnaires?", "cue_word": "how many", "is_missing": True, "acceptable_questions": ["How many total respondents completed questionnaires?", "How many students participated?", "What was the total sample size?"], "nova_reply": "Two thousand four hundred and fifty verified student respondents." },
          { "id": "field_a4", "cue_prompt": "who / supervised statistical data analysis?", "cue_word": "who", "is_missing": True, "acceptable_questions": ["Who supervised the statistical data analysis?", "Who was the data analyst?", "Who managed the statistics?"], "nova_reply": "Dr. Marcus Thorne, chair of quantitative educational statistics." },
          { "id": "field_a5", "cue_prompt": "why / cite empirical data in debate speeches?", "cue_word": "why", "is_missing": True, "acceptable_questions": ["Why cite empirical data in debate speeches?", "Why is data important in debates?", "Why use statistics in speaking?"], "nova_reply": "Because verified metrics substantiate claims and withstand critical cross-examination." }
        ]
      },
      "table_b": {
        "title": "Dr. Thorne's Statistical Fact Sheet",
        "subtitle": "Information Card (Answer Examiner's Questions)",
        "person": "Dr. Thorne",
        "fields": [
          { "id": "field_b1", "cue_prompt": "where / research dataset archived?", "cue_word": "where", "value": "On the university's open-access empirical research repository.", "nova_question": "Where is the research dataset archived?", "acceptable_answers": ["On the university's open-access empirical research repository.", "In the open-access repository.", "University empirical repository."] },
          { "id": "field_b2", "cue_prompt": "what / percentage of gamers play cooperative titles?", "cue_word": "what", "value": "Sixty-eight percent report playing team-based cooperative games.", "nova_question": "What percentage of gamers play cooperative titles?", "acceptable_answers": ["Sixty-eight percent report playing team-based cooperative games.", "Sixty-eight percent.", "68 percent."] },
          { "id": "field_b3", "cue_prompt": "how / researchers ensure demographic sample validity?", "cue_word": "how", "value": "By applying stratified random sampling across diverse income brackets.", "nova_question": "How did researchers ensure demographic sample validity?", "acceptable_answers": ["By applying stratified random sampling across diverse income brackets.", "Through stratified random sampling.", "Stratified random sampling across income brackets."] },
          { "id": "field_b4", "cue_prompt": "who / funded the longitudinal study?", "cue_word": "who", "value": "The National Science Foundation and the Children's Health Foundation.", "nova_question": "Who funded the longitudinal study?", "acceptable_answers": ["The National Science Foundation and the Children's Health Foundation.", "National Science Foundation.", "NSF and Children's Health Foundation."] },
          { "id": "field_b5", "why": "why", "cue_prompt": "why / distinguish between correlation and causation?", "cue_word": "why", "value": "To prevent faulty assumptions about what directly creates sleep deficits.", "nova_question": "Why must researchers distinguish between correlation and causation?", "acceptable_answers": ["To prevent faulty assumptions about what directly creates sleep deficits.", "To avoid faulty causal assumptions.", "To prevent assuming gaming causes all sleep deficits."] }
        ]
      }
    }
  },
  "cambridge_rw": {
    "part1_definitions": [
      { "id": 1, "text": "A numerical fact or datum computed from a structured sample study.", "target": "statistic" },
      { "id": 2, "text": "A formal research investigation of opinions from a representative sample.", "target": "survey" },
      { "id": 3, "text": "The greater number or proportion; representing more than half of a total.", "target": "majority" },
      { "id": 4, "text": "The smaller number or proportion; representing less than half of a group.", "target": "minority" },
      { "id": 5, "text": "A ratio or proportion expressed as a fraction of one hundred.", "target": "percent" }
    ],
    "part2_dialogue": {
      "title": "Evaluating Quantitative Evidence in a Research Project",
      "turns": [
        {
          "id": 1,
          "speaker": "Ethan",
          "prompt": "Hannah, why is citing 'According to a study by...' better than saying 'Everyone knows that'?",
          "options": [
            "It attributes data to a credible scientific source that listeners can independently verify.",
            "It makes sentences exactly twelve words longer.",
            "It guarantees that judges will not listen to your speech."
          ],
          "answer": "It attributes data to a credible scientific source that listeners can independently verify."
        },
        {
          "id": 2,
          "speaker": "Ethan",
          "prompt": "What did the research data show regarding the seventy-percent gaming statistic?",
          "options": [
            "Seventy percent of middle school students play games weekly, predominantly cooperative titles.",
            "Seventy percent of computers break down every morning.",
            "Only teachers are allowed to play video games."
          ],
          "answer": "Seventy percent of middle school students play games weekly, predominantly cooperative titles."
        },
        {
          "id": 3,
          "speaker": "Ethan",
          "prompt": "Why is the distinction between a majority and a minority important in reporting?",
          "options": [
            "It prevents generalizations by showing that problematic habits affect only a small minority.",
            "It allows researchers to ignore numbers completely.",
            "It proves that all students have identical daily schedules."
          ],
          "answer": "It prevents generalizations by showing that problematic habits affect only a small minority."
        },
        {
          "id": 4,
          "speaker": "Ethan",
          "prompt": "What does a statistical correlation between two variables actually tell us?",
          "options": [
            "It reveals a mutual connection between variables, though one does not necessarily cause the other.",
            "It proves that the second variable was invented by magicians.",
            "It means both variables are completely false."
          ],
          "answer": "It reveals a mutual connection between variables, though one does not necessarily cause the other."
        },
        {
          "id": 5,
          "speaker": "Ethan",
          "prompt": "How does deep research transform student writing into credible scholarship?",
          "options": [
            "It replaces unsubstantiated personal claims with verifiable empirical facts and rigorous metrics.",
            "It eliminates the need for grammar and punctuation.",
            "It turns research papers into fictional fairy tales."
          ],
          "answer": "It replaces unsubstantiated personal claims with verifiable empirical facts and rigorous metrics."
        }
      ]
    },
    "part6_cloze": {
      "instructions": "Read the text about quantitative research and choose the correct function word for each blank space.",
      "text_template": "In academic research, scholars rely [1] quantitative data to support empirical claims. According [2] a landmark study of adolescent habits, seventy percent of students play video games weekly. Survey data shows that a substantial majority [3] players enjoy cooperative games. Furthermore, statistics reveal that only a small minority [4] students experience sleep disruption. By citing verified metrics, researchers provide credible proof [5] their audience.",
      "answers": { "1": "on", "2": "to", "3": "of", "4": "of", "5": "for" }
    }
  },
  "minigames": {
    "math_problems": [
      {
        "id": "w133_p1",
        "type": "part_whole",
        "title": "Calculating Survey Cohort Participation Numbers",
        "question": "In a survey of 1,000 students, 700 students (70 percent) reported playing video games weekly, while 300 students reported zero gaming activity. What is the total survey sample size?",
        "storyContext": "Hannah tallies demographic participation numbers in a research ledger.",
        "modelData": {
          "bars": [
            { "label": "Weekly Gamers (70%)", "value": 700, "color": "#10b981" },
            { "label": "Non-Gamers (30%)", "value": 300, "color": "#64748b" }
          ],
          "total": 1000,
          "unit": "students"
        },
        "target_answer": 1000,
        "unit": "students",
        "steps": [
          "Take weekly gamers: 700 students.",
          "Add non-gamers: 300 students.",
          "700 + 300 = 1,000 total students in the sample."
        ]
      },
      {
        "id": "w133_p2",
        "type": "comparison",
        "title": "Comparing Majority Cooperative Gamers vs Minority Solitary Gamers",
        "question": "Out of 700 adolescent gamers, 490 students play cooperative multiplayer titles, while 210 students play solitary single-player games. How many more students play cooperative games than solitary games?",
        "storyContext": "Ethan graphs gaming modality distributions on a comparative chart.",
        "modelData": {
          "bars": [
            { "label": "Cooperative Multiplayer", "value": 490, "color": "#3b82f6" },
            { "label": "Solitary Single-Player", "value": 210, "color": "#f59e0b" }
          ],
          "difference": 280,
          "unit": "students"
        },
        "target_answer": 280,
        "unit": "students",
        "steps": [
          "Start with cooperative players: 490 students.",
          "Subtract solitary players: 210 students.",
          "490 - 210 = 280 more students playing cooperative titles."
        ]
      }
    ],
    "action_lab_scenarios": [
      {
        "stage": 1,
        "title": "Sampling Representative Demographic Populations",
        "diagram_type": "stratified_population_sample_matrix",
        "instruction": "Calibrate demographic sampling proportions across age, school district, and gender.",
        "items": [
          { "label": "Target Adolescent Population", "target": "universe_scope" },
          { "label": "Stratified Demographic Quota", "target": "sampling_filter" },
          { "label": "Randomized Participant Cohort", "target": "empirical_sample" }
        ]
      },
      {
        "stage": 2,
        "title": "Mapping Quantitative Survey Correlation Curves",
        "diagram_type": "scatter_plot_correlation_regression",
        "instruction": "Analyze statistical regression lines connecting gaming hours with academic grades.",
        "items": [
          { "label": "Weekly Active Gaming Hours (X-Axis)", "target": "independent_var" },
          { "label": "Academic Grade Point Average (Y-Axis)", "target": "dependent_var" },
          { "label": "Non-Linear Regression Threshold Curve", "target": "correlation_line" }
        ]
      },
      {
        "stage": 3,
        "title": "Publishing Verifiable Open-Access Datasets",
        "diagram_type": "academic_data_repository_pipeline",
        "instruction": "Package raw survey responses, statistical scripts, and methodology documentation.",
        "items": [
          { "label": "Anonymized Survey Microdata", "target": "raw_dataset" },
          { "label": "Reproducible Analysis Script", "target": "code_repository" },
          { "label": "Peer-Reviewed Open Access Report", "target": "published_study" }
        ]
      }
    ],
    "grammar_drills": [
      { "sentence": "According to a study by university psychologists, seventy percent play video games.", "options": ["According to", "According with", "According from"], "answer": "According to", "explanation": "Use 'According to' followed by a source or authority to introduce cited evidence." },
      { "sentence": "Statistics demonstrate that a small minority exhibits signs of fatigue.", "options": ["demonstrate", "demonstrates", "demonstrating"], "answer": "demonstrate", "explanation": "The plural noun 'Statistics' takes the plural verb 'demonstrate'." },
      { "sentence": "Data reveals that cooperative games build strong teamwork skills.", "options": ["reveals that", "reveals for", "revealing that"], "answer": "reveals that", "explanation": "Use 'reveals that' followed by a declarative clause to present research findings." },
      { "sentence": "Researchers analyzed a randomized demographic sample of two thousand students.", "options": ["analyzed", "analyze", "analyzing"], "answer": "analyzed", "explanation": "Use past simple 'analyzed' to describe completed research actions." },
      { "sentence": "A substantial majority of respondents reported positive social connections.", "options": ["majority of", "majority to", "majority from"], "answer": "majority of", "explanation": "Use the preposition 'of' after 'majority' to specify the population subgroup." }
    ]
  }
}

# ==============================================================================
# WEEK 134: Identifying Fallacies
# ==============================================================================
w134 = {
  "week": 134,
  "theme": "Identifying Fallacies",
  "title_en": "Identifying Fallacies",
  "title_vi": "Nhận diện Lỗi Ngụy biện",
  "cefr_level": "B2 First",
  "grammar_focus": "Qualifiers of frequency and extent ('some', 'many', 'often', 'tend to') to prevent sweeping over-generalizations.",
  "vocab_list": [
    { "id": 1, "word": "fallacy", "pos": "n", "ipa": "/ˈfæləsi/", "definition_en": "A mistaken belief or a flaw in reasoning that invalidates an argument", "definition_vi": "lỗi ngụy biện / sự ngụy biện", "example_en": "Claiming that all computer gamers are lazy is a classic hasty generalization fallacy.", "example_vi": "Khẳng định rằng tất cả người chơi máy tính đều lười biếng là một lỗi ngụy biện khái quát hóa vội vã kinh điển." },
    { "id": 2, "word": "generalization", "pos": "n", "ipa": "/ˌdʒenərələˈzeɪʃən/", "definition_en": "A broad statement obtained by inferring from only a small number of specific cases", "definition_vi": "sự khái quát hóa / sự vơ đũa cả nắm", "example_en": "Avoid making a sweeping generalization without examining comprehensive statistical data.", "example_vi": "Hãy tránh đưa ra một sự khái quát hóa vơ đũa cả nắm mà không kiểm tra dữ liệu thống kê toàn diện." },
    { "id": 3, "word": "assumption", "pos": "n", "ipa": "/əˈsʌmpʃən/", "definition_en": "A thing that is accepted as true without proof or critical verification", "definition_vi": "giả định / điều mặc nhiên thừa nhận", "example_en": "Her entire objection rested on the false assumption that mobile technology has no educational value.", "example_vi": "Toàn bộ sự phản đối của cô ấy dựa trên giả định sai lầm rằng công nghệ di động không có giá trị giáo dục." },
    { "id": 4, "word": "true", "pos": "adj", "ipa": "/truː/", "definition_en": "In accordance with verifiable fact, accurate reality, and sound logic", "definition_vi": "đúng đắn / chân thực / xác thực", "example_en": "An argument can only be valid if its foundational premises are factually true.", "example_vi": "Một lập luận chỉ có thể hợp lệ nếu các tiền đề nền tảng của nó đúng về mặt thực tế." },
    { "id": 5, "word": "false", "pos": "adj", "ipa": "/fɔːls/", "definition_en": "Not in accordance with truth or reality; incorrect, mistaken, or misleading", "definition_vi": "sai lầm / giả tạo / không đúng", "example_en": "Presenting false statistics in an academic debate immediately disqualifies a debater.", "example_vi": "Đưa ra các số liệu thống kê sai lệch trong một cuộc tranh biện học thuật sẽ khiến tranh biện viên bị loại ngay lập tức." },
    { "id": 6, "word": "valid", "pos": "adj", "ipa": "/ˈvælɪd/", "definition_en": "Having a sound basis in logic or fact; reasonable, cogent, and legally binding", "definition_vi": "hợp lệ / có căn cứ vững chắc", "example_en": "Her deduction was logically valid because the conclusion followed necessarily from true premises.", "example_vi": "Suy luận của cô ấy hợp lệ về mặt logic vì kết luận bắt nguồn một cách tất yếu từ các tiền đề đúng." },
    { "id": 7, "word": "invalid", "pos": "adj", "ipa": "/ɪnˈvælɪd/", "definition_en": "Not logically or factually sound; containing reasoning errors or false premises", "definition_vi": "không hợp lệ / vô căn cứ về mặt logic", "example_en": "An invalid argument fails to prove its point because its logical structure is broken.", "example_vi": "Một lập luận không hợp lệ không thể chứng minh được luận điểm của nó vì cấu trúc logic của nó bị phá vỡ." },
    { "id": 8, "word": "logic", "pos": "n", "ipa": "/ˈlɑːdʒɪk/", "definition_en": "Reasoning conducted according to strict principles of validity and sound inference", "definition_vi": "tính logic / lý luận chặt chẽ", "example_en": "Studying formal logic teaches students to separate compelling proof from deceptive rhetoric.", "example_vi": "Học logic hình thức dạy học sinh cách phân biệt bằng chứng thuyết phục với những lời tu từ lừa dối." },
    { "id": 9, "word": "premise", "pos": "n", "ipa": "/ˈpremɪs/", "definition_en": "A previous proposition from which another inference is drawn as a conclusion", "definition_vi": "tiền đề", "example_en": "If a speaker begins with a flawed premise, their final conclusion will inevitably be defective.", "example_vi": "Nếu một diễn giả bắt đầu bằng một tiền đề sai sót, kết luận cuối cùng của họ chắc chắn sẽ bị khiếm khuyết." },
    { "id": 10, "word": "conclusion", "pos": "n", "ipa": "/kənˈkluːʒən/", "definition_en": "A judgment or formal decision reached by reasoning from supporting premises", "definition_vi": "kết luận", "example_en": "The final conclusion was substantiated by three independent empirical studies.", "example_vi": "Kết luận cuối cùng đã được chứng minh bởi ba nghiên cứu thực nghiệm độc lập." },
    { "id": 11, "word": "flaw", "pos": "n", "ipa": "/flɔː/", "definition_en": "A defect, mistake, or vulnerability that impairs the soundness of an argument", "definition_vi": "lỗ hổng / khuyết điểm logic", "example_en": "The adjudicator pointed out a critical reasoning flaw in the affirmative team's case.", "example_vi": "Trọng tài đã chỉ ra một lỗ hổng lập luận nghiêm trọng trong vụ kiện của đội khẳng định." },
    { "id": 12, "word": "stereotype", "pos": "n", "ipa": "/ˈsteriətaɪp/", "definition_en": "A widely held but oversimplified, unfair image or belief about a group", "definition_vi": "khuôn mẫu định kiến / định kiến hẹp hòi", "example_en": "Relying on a cultural stereotype blinds researchers to individual diversity and variation.", "example_vi": "Dựa vào một định kiến văn hóa khiến các nhà nghiên cứu mù quáng trước sự đa dạng và khác biệt của cá nhân." },
    { "id": 13, "word": "deduction", "pos": "n", "ipa": "/dɪˈdʌkʃən/", "definition_en": "The process of reaching a conclusion by applying general principles to specific cases", "definition_vi": "sự suy diễn logic", "example_en": "Through careful deduction, the detective eliminated three impossible scenarios.", "example_vi": "Thông qua sự suy diễn cẩn thận, thám tử đã loại trừ ba kịch bản bất khả thi." },
    { "id": 14, "word": "reasoning", "pos": "n", "ipa": "/ˈriːzənɪŋ/", "definition_en": "The intellectual action of thinking about things in a logical and sensible manner", "definition_vi": "quá trình lập luận / suy luận", "example_en": "Sound moral reasoning requires considering the consequences of policies on vulnerable people.", "example_vi": "Lập luận đạo đức đúng đắn đòi hỏi phải xem xét hậu quả của các chính sách đối với những người dễ bị tổn thương." },
    { "id": 15, "word": "claim", "pos": "n", "ipa": "/kleɪm/", "definition_en": "An assertion that something is true, typically one requiring substantiating evidence", "definition_vi": "tuyên bố / khẳng định", "example_en": "Before accepting an extraordinary scientific claim, demand extraordinary empirical proof.", "example_vi": "Trước khi chấp nhận một khẳng định khoa học phi thường, hãy yêu cầu bằng chứng thực nghiệm phi thường." },
    { "id": 16, "word": "bias", "pos": "n", "ipa": "/ˈbaɪəs/", "definition_en": "Prejudice in favor of or against one thing or group compared with another", "definition_vi": "sự thiên vị / định kiến", "example_en": "Researchers must guard against confirmation bias when evaluating experimental results.", "example_vi": "Các nhà nghiên cứu phải đề phòng sự thiên vị xác nhận khi đánh giá các kết quả thực nghiệm." },
    { "id": 17, "word": "hasty", "pos": "adj", "ipa": "/ˈheɪsti/", "definition_en": "Done with excessive speed or urgency; hurried without adequate deliberation", "definition_vi": "vội vã / thiếu cân nhắc", "example_en": "Drawing a hasty conclusion from a single interview is a dangerous investigative error.", "example_vi": "Rút ra một kết luận vội vã từ một cuộc phỏng vấn duy nhất là một sai lầm điều tra nguy hiểm." },
    { "id": 18, "word": "misleading", "pos": "adj", "ipa": "/ˌmɪsˈliːdɪŋ/", "definition_en": "Giving the wrong impression or leading an audience toward a false belief", "definition_vi": "gây hiểu lầm / sai lệch", "example_en": "The advertisement used misleading percentages to exaggerate product effectiveness.", "example_vi": "Quảng cáo đã sử dụng tỷ lệ phần trăm gây hiểu lầm để phóng đại hiệu quả của sản phẩm." },
    { "id": 19, "word": "soundness", "pos": "n", "ipa": "/ˈsaʊndnəs/", "definition_en": "The state of an argument having both valid logical structure and true premises", "definition_vi": "tính xác đáng / sự đúng đắn toàn diện về logic và thực tế", "example_en": "Scholars admire the intellectual soundness of her philosophical treatise.", "example_vi": "Các học giả ngưỡng mộ tính xác đáng về mặt trí tuệ trong luận văn triết học của cô ấy." },
    { "id": 20, "word": "argumentation", "pos": "n", "ipa": "/ˌɑːrɡjəmenˈteɪʃən/", "definition_en": "The methodical process of establishing reasons and conclusions to persuade others", "definition_vi": "nghệ thuật lập luận / quá trình tranh luận", "example_en": "Rigorous argumentation relies on precise qualifiers rather than absolute universal assertions.", "example_vi": "Lập luận nghiêm ngặt dựa trên các từ ngữ định lượng chính xác thay vì các khẳng định tuyệt đối phổ quát." }
  ],
  "clil": {
    "title_en": "Critical Thinking and Logic: Identifying Generalization Fallacies",
    "title_vi": "Tư Duy Phản Biện và Logic: Nhận Diện Các Lỗi Ngụy Biện Khái Quát Hóa",
    "content_en": "Critical thinking requires learners to scrutinize arguments for underlying logical errors known as fallacies. A common reasoning flaw is the hasty generalization, which occurs when a speaker draws a sweeping conclusion from insufficient evidence. For example, claiming that 'all video gamers are lazy and unmotivated' is an invalid assumption contradicted by empirical studies. To construct sound arguments, thinkers employ careful qualifiers such as 'some', 'many', 'often', and 'tend to' rather than absolute universal terms like 'all' or 'never'. Evaluating an argument entails checking whether its premises are true and whether the deduction logically holds. Distinguishing valid reasoning from deceptive fallacies protects students from misleading advertisements, unfounded propaganda, and polarized rhetoric. Developing a sharp eye for flawed logic fosters intellectually honest discourse in academic discussions.",
    "glossary": [
      { "word": "fallacy", "definition_en": "A deceptive or structurally defective form of reasoning that invalidates an inference", "definition_vi": "hình thức lập luận sai lệch hoặc khiếm khuyết về cấu trúc làm mất hiệu lực của một suy luận" },
      { "word": "generalization", "definition_en": "Inferring universal laws or attributes to an entire group from limited particular observations", "definition_vi": "suy luận các quy luật hoặc thuộc tính phổ quát cho toàn bộ một nhóm từ các quan sát cụ thể có hạn" },
      { "word": "assumption", "definition_en": "An implicit proposition taken for granted as true without verifying empirical substantiation", "definition_vi": "mệnh đề ngầm được coi là đúng mà không cần xác minh bằng chứng thực nghiệm" },
      { "word": "soundness", "definition_en": "The gold standard of deductive logic where every premise is factually true and the structure is valid", "definition_vi": "tiêu chuẩn vàng của logic suy diễn trong đó mọi tiền đề đều đúng thực tế và cấu trúc hợp lệ" },
      { "word": "bias", "definition_en": "Systematic cognitive skewing or prejudice that distorts fair factual evaluation", "definition_vi": "sự sai lệch nhận thức có hệ thống hoặc định kiến làm sai lệch đánh giá khách quan về thực tế" }
    ],
    "check_questions": [
      { "id": 1, "question_en": "What is a 'hasty generalization' fallacy?", "options": ["Drawing a sweeping universal conclusion from inadequate or limited examples", "Speaking too fast during an oral speech rehearsal", "Using too many verified statistical studies"], "answer": "Drawing a sweeping universal conclusion from inadequate or limited examples" },
      { "id": 2, "question_en": "Which qualifying words help speakers avoid making fallacious generalizations?", "options": ["'Some', 'many', 'often', and 'tend to'", "'All', 'every', 'always', and 'never'", "'Nobody', 'nowhere', and 'impossible'"], "answer": "'Some', 'many', 'often', and 'tend to'" },
      { "id": 3, "question_en": "Why is the statement 'All video gamers are lazy and unmotivated' invalid?", "options": ["It is a sweeping generalization contradicted by empirical research and diverse real-world players", "Because video games were only invented last week", "Because lazy people are not allowed to play games"], "answer": "It is a sweeping generalization contradicted by empirical research and diverse real-world players" }
    ],
    "critical_thinking": {
      "question_en": "How does using qualifiers like 'tend to' or 'in many cases' protect a speaker's academic credibility during debate cross-examination?",
      "hint_en": "Absolute statements ('all', 'never') can be disproven by a single counterexample, whereas careful qualifiers acknowledge nuances and withstand factual challenges."
    }
  },
  "shadowing_sentences": [
    { "id": 1, "text": "Claiming that all computer gamers are unmotivated is an invalid generalization fallacy.", "en": "Claiming that all computer gamers are unmotivated is an invalid generalization fallacy.", "vi": "Khẳng định rằng tất cả game thủ máy tính đều thiếu động lực là một lỗi ngụy biện khái quát hóa không hợp lệ.", "ipa": "/ˈkleɪmɪŋ ðæt ɔːl kəmˈpjuːtər ˈɡeɪmərz ɑːr ˌʌnˈmoʊtəveɪtɪd ɪz ən ɪnˈvælɪd ˌdʒenərələˈzeɪʃən ˈfæləsi/", "words": ["Claiming", "that", "all", "computer", "gamers", "are", "unmotivated", "is", "an", "invalid", "generalization", "fallacy"] },
    { "id": 2, "text": "Critical thinkers use qualifiers like some, many, and often to prevent sweeping statements.", "en": "Critical thinkers use qualifiers like some, many, and often to prevent sweeping statements.", "vi": "Những người tư duy phản biện sử dụng các từ chỉ mức độ như some, many và often để ngăn chặn các khẳng định vơ đũa cả nắm.", "ipa": "/ˈkrɪtɪkəl ˈθɪŋkərz juːz ˈkwɑːləˌfaɪərz laɪk sʌm ˈmeni ænd ˈɔːfən tuː prɪˈvent ˈswiːpɪŋ ˈsteɪtmənts/", "words": ["Critical", "thinkers", "use", "qualifiers", "like", "some", "many", "and", "often", "to", "prevent", "sweeping", "statements"] },
    { "id": 3, "text": "An argument is valid only when its underlying premises are factually true.", "en": "An argument is valid only when its underlying premises are factually true.", "vi": "Một lập luận chỉ hợp lệ khi các tiền đề cơ bản của nó đúng về mặt thực tế.", "ipa": "/ən ˈɑːrɡjəmənt ɪz ˈvælɪd ˈoʊnli wen ɪts ˌʌndərˈlaɪɪŋ ˈpremɪsɪz ɑːr ˈfæktʃuəli truː/", "words": ["An", "argument", "is", "valid", "only", "when", "its", "underlying", "premises", "are", "factually", "true"] },
    { "id": 4, "text": "Drawing a hasty conclusion from a single example creates misleading stereotypes.", "en": "Drawing a hasty conclusion from a single example creates misleading stereotypes.", "vi": "Rút ra một kết luận vội vã từ một ví dụ duy nhất tạo ra những định kiến gây hiểu lầm.", "ipa": "/ˈdrɔːɪŋ ə ˈheɪsti kənˈkluːʒən frəm ə ˈsɪŋɡəl ɪɡˈzæmpəl kriˈeɪts ˌmɪsˈliːdɪŋ ˈsteriətaɪps/", "words": ["Drawing", "a", "hasty", "conclusion", "from", "a", "single", "example", "creates", "misleading", "stereotypes"] },
    { "id": 5, "text": "Many adolescent players tend to develop strong cooperative problem solving skills.", "en": "Many adolescent players tend to develop strong cooperative problem solving skills.", "vi": "Nhiều người chơi thanh thiếu niên có xu hướng phát triển kỹ năng giải quyết vấn đề hợp tác mạnh mẽ.", "ipa": "/ˈmeni ˌædəˈlesənt ˈpleɪərz tend tuː dɪˈveləp strɔːŋ koʊˈɑːpərətɪv ˈprɑːbləm ˈsɑːlvɪŋ skɪlz/", "words": ["Many", "adolescent", "players", "tend", "to", "develop", "strong", "cooperative", "problem", "solving", "skills"] },
    { "id": 6, "text": "We must scrutinize whether evidence is reliable before accepting controversial assertions.", "en": "We must scrutinize whether evidence is reliable before accepting controversial assertions.", "vi": "Chúng ta phải xem xét kỹ lưỡng liệu bằng chứng có đáng tin cậy hay không trước khi chấp nhận các khẳng định gây tranh cãi.", "ipa": "/wiː mʌst ˈskruːtənaɪz ˈweðər ˈevɪdəns ɪz rɪˈlaɪəbəl bɪˈfɔːr əkˈseptɪŋ ˌkɑːntrəˈvɜːrʃəl əˈsɜːrʃənz/", "words": ["We", "must", "scrutinize", "whether", "evidence", "is", "reliable", "before", "accepting", "controversial", "assertions"] },
    { "id": 7, "text": "Recognizing logical flaws protects learners from manipulative advertising and false propaganda.", "en": "Recognizing logical flaws protects learners from manipulative advertising and false propaganda.", "vi": "Nhận biết các lỗ hổng logic bảo vệ người học khỏi quảng cáo thao túng và tuyên truyền sai lệch.", "ipa": "/ˈrekəɡnaɪzɪŋ ˈlɑːdʒɪkəl flɔːz prəˈtekts ˈlɜːrnərz frəm məˈnɪpjəleɪtɪv ˈædvərtaɪzɪŋ ænd fɔːls ˌprɑːpəˈɡændə/", "words": ["Recognizing", "logical", "flaws", "protects", "learners", "from", "manipulative", "advertising", "and", "false", "propaganda"] },
    { "id": 8, "text": "Mastering critical logic cultivates intellectually honest and respectful civic discussions.", "en": "Mastering critical logic cultivates intellectually honest and respectful civic discussions.", "vi": "Làm chủ logic phản biện nuôi dưỡng các cuộc thảo luận công dân trung thực và tôn trọng về mặt trí tuệ.", "ipa": "/ˈmæstərɪŋ ˈkrɪtɪkəl ˈlɑːdʒɪk ˈkʌltɪveɪts ˌɪntəˈlektʃuəli ˈɑːnɪst ænd rɪˈspektfəl ˈsɪvɪk dɪˈskʌʃənz/", "words": ["Mastering", "critical", "logic", "cultivates", "intellectually", "honest", "and", "respectful", "civic", "discussions"] }
  ],
  "story_scenes": [
    { "id": 1, "scene_id": "scene_1", "scene_number": 1, "title_en": "Analyzing the Sweeping Headline", "title_vi": "Phân Tích Dòng Tít Vơ Đũa Cả Nắm", "description_en": "Zoe and Liam read a newspaper editorial claiming: 'All video games destroy attention spans and motivation.'", "description": "Zoe and Liam read a newspaper editorial claiming: 'All video games destroy attention spans and motivation.'", "image_url": "/images/week134/webtoon_scene_1.png", "audio_url": "/audio/week134/scene_1.mp3" },
    { "id": 2, "scene_id": "scene_2", "scene_number": 2, "title_en": "Detecting the Generalization Fallacy", "title_vi": "Phát Hiện Lỗi Ngụy Biện Khái Quát Hóa", "description_en": "Zoe points out the absolute universal word 'all', explaining that drawing broad conclusions from extreme cases is fallacious.", "description": "Zoe points out the absolute universal word 'all', explaining that drawing broad conclusions from extreme cases is fallacious.", "image_url": "/images/week134/webtoon_scene_2.png", "audio_url": "/audio/week134/scene_2.mp3" },
    { "id": 3, "scene_id": "scene_3", "scene_number": 3, "title_en": "Applying Epistemic Qualifiers", "title_vi": "Áp Dụng Các Từ Ngữ Định Lượng Nhận Thức", "description_en": "Liam rewrites the editorial sentence using careful qualifiers: 'Some excessive gaming may disrupt focus, but many games build skills.'", "description": "Liam rewrites the editorial sentence using careful qualifiers: 'Some excessive gaming may disrupt focus, but many games build skills.'", "image_url": "/images/week134/webtoon_scene_3.png", "audio_url": "/audio/week134/scene_3.mp3" },
    { "id": 4, "scene_id": "scene_4", "scene_number": 4, "title_en": "Testing Logical Validity on the Whiteboard", "title_vi": "Kiểm Tra Tính Hợp Lệ Logic Trên Bảng Trắng", "description_en": "The study group maps premises and conclusions, identifying where false assumptions corrupt the deductive reasoning.", "description": "The study group maps premises and conclusions, identifying where false assumptions corrupt the deductive reasoning.", "image_url": "/images/week134/webtoon_scene_4.png", "audio_url": "/audio/week134/scene_4.mp3" },
    { "id": 5, "scene_id": "scene_5", "scene_number": 5, "title_en": "Presenting the Fallacy Audit", "title_vi": "Trình Bày Kiểm Toán Lỗi Ngụy Biện", "description_en": "Zoe and Liam present their critical logic audit to the philosophy club, receiving applause for their rigorous analysis.", "description": "Zoe and Liam present their critical logic audit to the philosophy club, receiving applause for their rigorous analysis.", "image_url": "/images/week134/webtoon_scene_5.png", "audio_url": "/audio/week134/scene_5.mp3" }
  ],
  "writing_data": {
    "title": "Identifying and Correcting Generalization Fallacies in Arguments",
    "prompt_en": "Look at the four panels. Write a critical analysis paragraph identifying a hasty generalization fallacy in a media statement and correcting it using careful qualifiers ('some', 'many', 'often', 'tend to'). Write 20 or more words.",
    "prompt_vi": "Nhìn vào 4 khung tranh. Viết một đoạn văn phân tích phê phán nhận diện lỗi ngụy biện khái quát hóa vội vã trong một phát ngôn truyền thông và sửa lại bằng các từ chỉ mức độ cẩn trọng ('some', 'many', 'often', 'tend to'). Viết từ 20 từ trở lên.",
    "min_sentences": 3,
    "min_words": 20,
    "max_words": 90,
    "model_sentence": "Claiming that all video gamers are lazy and unmotivated represents an invalid hasty generalization fallacy. This flawed assumption ignores empirical research showing that many gamers develop strategic thinking and teamwork skills. To maintain academic soundness, critical thinkers must use careful qualifiers, noting that while excessive gaming may impair some students, many players manage their screen time responsibly.",
    "word_bank": ["fallacy", "generalization", "assumption", "true", "false", "valid", "invalid", "logic", "premise", "stereotype"],
    "sentence_frames": [
      "Claiming that all gamers are lazy represents a classic hasty ___ fallacy.",
      "This invalid argument rests on a completely false ___.",
      "In contrast, empirical studies prove that ___ players build strong problem-solving skills.",
      "Ultimately, using qualifiers like 'often' and 'tend to' ensures logical ___."
    ],
    "panels": [
      {
        "panel_id": "panel_1",
        "title_en": "Panel 1: Identifying the Universal Claim",
        "title_vi": "Khung 1: Nhận Diện Khẳng Định Tuyệt Đối",
        "image_url": "/images/week134/writing_panel_1.png",
        "image_prompt": "A student circling words like ALL and NEVER in red marker on a printed newspaper editorial.",
        "caption": "Absolute universal claims often signal an invalid generalization fallacy.",
        "sentence_frame": "The editorial [makes an absolute universal claim] that [all digital gamers lack academic motivation].",
        "pills": ["makes an absolute universal claim", "all digital gamers lack academic motivation", "sweeping generalization", "unsubstantiated stereotype"],
        "connectors": ["First,", "In the editorial,", "To begin the critique,"]
      },
      {
        "panel_id": "panel_2",
        "title_en": "Panel 2: Exposing the Flawed Assumption",
        "title_vi": "Khung 2: Vạch Trần Giả Định Khiếm Khuyết",
        "image_url": "/images/week134/writing_panel_2.png",
        "image_prompt": "A balance scale tipping unevenly with one single anecdotal feather outweighing massive research books.",
        "caption": "Drawing sweeping conclusions from isolated cases invalidates deductive reasoning.",
        "sentence_frame": "The writer [draws an invalid sweeping deduction] from [isolated individual anecdotes].",
        "pills": ["draws an invalid sweeping deduction", "isolated individual anecdotes", "unreliable premise", "logical fallacy"],
        "connectors": ["However,", "Upon scrutiny,", "In reality,"]
      },
      {
        "panel_id": "panel_3",
        "title_en": "Panel 3: Introducing Epistemic Qualifiers",
        "title_vi": "Khung 3: Đưa Vào Các Từ Chỉ Mức Độ",
        "image_url": "/images/week134/writing_panel_3.png",
        "image_prompt": "A student typing on a laptop screen replacing the word ALL with SOME and TEND TO in bold font.",
        "caption": "Careful qualifiers replace absolute universal words with nuanced precision.",
        "sentence_frame": "Critical thinkers [replace absolute universal words] with [careful qualifiers like some and often].",
        "pills": ["replace absolute universal words", "careful qualifiers like some and often", "nuanced factual precision", "avoids generalization"],
        "connectors": ["Therefore,", "To correct the claim,", "Instead of universal words,"]
      },
      {
        "panel_id": "panel_4",
        "title_en": "Panel 4: Restoring Intellectual Soundness",
        "title_vi": "Khung 4: Khôi Phục Tính Xác Đáng Trí Tuệ",
        "image_url": "/images/week134/writing_panel_4.png",
        "image_prompt": "A logic seminar discussion board showing verified premises connecting smoothly to sound conclusions.",
        "caption": "Sound reasoning grounded in true premises fosters honest academic discourse.",
        "sentence_frame": "Sound argumentation [ensures that conclusions follow logically] from [factually true empirical premises].",
        "pills": ["ensures that conclusions follow logically", "factually true empirical premises", "valid intellectual soundness", "honest academic discourse"],
        "connectors": ["Ultimately,", "In conclusion,", "Consequently,"]
      }
    ],
    "ladder_stages": [
      {
        "badge_label": "MODEL",
        "title": "Stage 1: Stating the Flawed Generalization",
        "image_url": "/images/week134/writing_panel_1.png",
        "caption": "Absolute universal claims often signal an invalid generalization fallacy.",
        "frame_L1": "The editorial claims that all video gamers are lazy. This is an invalid generalization fallacy.",
        "connectors": ["First,", "To begin,", "The article states that,"],
        "sentence_hint": "Write 2 sentences stating the media claim and identifying the fallacy.",
        "ordered_chips": ["Claiming that all gamers", "are unmotivated and lazy", "represents a classic", "hasty generalization fallacy."],
        "pills": ["all gamers are lazy", "hasty generalization fallacy", "absolute universal claim", "unproven assumption"],
        "sentence_frame": "The editorial [makes an absolute universal claim] that [all digital gamers lack academic motivation]."
      },
      {
        "badge_label": "BUILD",
        "title": "Stage 2: Exposing the False Premise",
        "image_url": "/images/week134/writing_panel_2.png",
        "caption": "Drawing sweeping conclusions from isolated cases invalidates deductive reasoning.",
        "frame_L1": "The assumption is false. Many students play games and still earn excellent grades.",
        "connectors": ["However,", "In reality,", "Upon examination,"],
        "sentence_hint": "Write 2 sentences explaining why the premise is factually untrue.",
        "pills": ["assumption is false", "earn excellent grades", "isolated examples", "cannot support generalization"],
        "sentence_frame": "The writer [draws an invalid sweeping deduction] from [isolated individual anecdotes]."
      },
      {
        "badge_label": "WRITE",
        "title": "Stage 3: Rewriting with Careful Qualifiers",
        "image_url": "/images/week134/writing_panel_3.png",
        "caption": "Careful qualifiers replace absolute universal words with nuanced precision.",
        "frame_L1": "We should use words like 'some' and 'often'. While some kids play too much, many play responsibly.",
        "connectors": ["Instead,", "Using qualifiers,", "To be precise,"],
        "sentence_hint": "Write 2 sentences using 'some', 'many', or 'tend to' to state the truth accurately.",
        "pills": ["words like some and often", "some kids play too much", "many play responsibly", "nuanced precision"],
        "sentence_frame": "Critical thinkers [replace absolute universal words] with [careful qualifiers like some and often]."
      },
      {
        "badge_label": "EXPAND",
        "title": "Stage 4: Synthesizing the Critical Thinking Lesson",
        "image_url": "/images/week134/writing_panel_4.png",
        "caption": "Sound reasoning grounded in true premises fosters honest academic discourse.",
        "frame_L1": "Sound logic requires true premises. Spotting fallacies protects us from misleading advertisements and bias.",
        "connectors": ["Ultimately,", "In conclusion,", "Consequently,"],
        "sentence_hint": "Write 2 sentences summarizing why identifying fallacies strengthens critical thinking.",
        "pills": ["sound logic requires truth", "spotting fallacies protects us", "misleading bias", "critical thinking skills"],
        "sentence_frame": "Sound argumentation [ensures that conclusions follow logically] from [factually true empirical premises]."
      }
    ]
  },
  "speaking_data": {
    "talkshow_prompt": {
      "topic": "Detecting and Correcting Logical Fallacies in Public Debate",
      "question": "Zoe, why is the hasty generalization fallacy so common, and how can debaters avoid committing it?",
      "model_response": "The hasty generalization fallacy is tempting because human brains love shortcuts! When someone sees one or two lazy gamers, they jump to the lazy conclusion that 'all gamers are unmotivated.' But in formal academic debate, a single counterexample shatters an absolute 'all' or 'never' claim! Skilled debaters protect their credibility by using qualifiers like 'many', 'some', or 'tend to.' Qualifiers reflect real-world complexity and ensure arguments remain logically sound!"
    },
    "info_exchange_cards": {
      "table_a": {
        "title": "Zoe's Logic and Fallacy Workshop",
        "subtitle": "Candidate's Question Card (Ask Examiner)",
        "person": "Zoe",
        "fields": [
          { "id": "field_a1", "cue_prompt": "where / critical logic workshop held?", "cue_word": "where", "is_missing": True, "acceptable_questions": ["Where was the critical logic workshop held?", "Where was the workshop held?", "Where did Zoe attend the logic seminar?"], "nova_reply": "In the philosophy seminar room at the central public library." },
          { "id": "field_a2", "cue_prompt": "what / core fallacy analyzed this week?", "cue_word": "what", "is_missing": True, "acceptable_questions": ["What core fallacy was analyzed this week?", "What was the fallacy analyzed?", "What fallacy did they study?"], "nova_reply": "The hasty generalization fallacy and false universal claims." },
          { "id": "field_a3", "cue_prompt": "how many / media advertisements analyzed for bias?", "cue_word": "how many", "is_missing": True, "acceptable_questions": ["How many media advertisements were analyzed for bias?", "How many ads were checked?", "What was the number of ads analyzed?"], "nova_reply": "Twenty-four print and television commercial advertisements." },
          { "id": "field_a4", "cue_prompt": "who / instructed the critical reasoning class?", "cue_word": "who", "is_missing": True, "acceptable_questions": ["Who instructed the critical reasoning class?", "Who was the logic professor?", "Who taught the course?"], "nova_reply": "Professor Arthur Pendelton, senior fellow in formal epistemology." },
          { "id": "field_a5", "cue_prompt": "why / universal absolute claims dangerous in debate?", "cue_word": "why", "is_missing": True, "acceptable_questions": ["Why are universal absolute claims dangerous in debate?", "Why avoid words like 'all' and 'never'?", "Why are absolute claims risky?"], "nova_reply": "Because an opponent needs only one single counterexample to disprove the entire claim." }
        ]
      },
      "table_b": {
        "title": "Professor Pendelton's Logic Guide",
        "subtitle": "Information Card (Answer Examiner's Questions)",
        "person": "Professor Pendelton",
        "fields": [
          { "id": "field_b1", "cue_prompt": "where / download the fallacy classification chart?", "cue_word": "where", "value": "From the collegiate logic consortium educational portal.", "nova_question": "Where can students download the fallacy classification chart?", "acceptable_answers": ["From the collegiate logic consortium educational portal.", "From the logic consortium portal.", "Collegiate logic consortium portal."] },
          { "id": "field_b2", "cue_prompt": "what / three essential qualifiers recommended?", "cue_word": "what", "value": "'Some', 'frequently', and 'tend to' for empirical statements.", "nova_question": "What three essential qualifiers are recommended?", "acceptable_answers": ["'Some', 'frequently', and 'tend to' for empirical statements.", "'Some', 'frequently', and 'tend to'.", "Some, frequently, tend to."] },
          { "id": "field_b3", "cue_prompt": "how / test whether an argument is logically sound?", "cue_word": "how", "value": "Verify that all premises are true and the deductive inference is valid.", "nova_question": "How do philosophers test whether an argument is logically sound?", "acceptable_answers": ["Verify that all premises are true and the deductive inference is valid.", "Verify true premises and valid inference.", "Check premises and deductive validity."] },
          { "id": "field_b4", "cue_prompt": "who / formulated the classic rules of deductive syllogisms?", "cue_word": "who", "value": "Aristotle laid the foundational principles of deductive logic.", "nova_question": "Who formulated the classic rules of deductive syllogisms?", "acceptable_answers": ["Aristotle laid the foundational principles of deductive logic.", "Aristotle.", "Ancient philosopher Aristotle."] },
          { "id": "field_b5", "cue_prompt": "why / critical thinking essential for democratic citizens?", "cue_word": "why", "value": "To evaluate political arguments objectively and resist deceptive rhetoric.", "nova_question": "Why is critical thinking essential for democratic citizens?", "acceptable_answers": ["To evaluate political arguments objectively and resist deceptive rhetoric.", "To evaluate arguments objectively and resist deception.", "To resist deceptive rhetoric."] }
        ]
      }
    }
  },
  "cambridge_rw": {
    "part1_definitions": [
      { "id": 1, "text": "A mistaken belief or defective reasoning pattern that invalidates an argument.", "target": "fallacy" },
      { "id": 2, "text": "A broad claim inferred from only a small number of specific observations.", "target": "generalization" },
      { "id": 3, "text": "A proposition accepted as true without critical proof or verification.", "target": "assumption" },
      { "id": 4, "text": "Having a sound logical structure and factual grounding in reality.", "target": "valid" },
      { "id": 5, "text": "The strict principles and rules governing correct deductive reasoning.", "target": "logic" }
    ],
    "part2_dialogue": {
      "title": "Identifying Logical Fallacies in Media Arguments",
      "turns": [
        {
          "id": 1,
          "speaker": "Liam",
          "prompt": "Zoe, what makes the statement 'All gamers are lazy' a logical fallacy?",
          "options": [
            "It is a hasty generalization that unfairly applies an extreme stereotype to an entire population.",
            "It is spelled with five letters instead of six.",
            "It was written on a Sunday afternoon."
          ],
          "answer": "It is a hasty generalization that unfairly applies an extreme stereotype to an entire population."
        },
        {
          "id": 2,
          "speaker": "Liam",
          "prompt": "How can an opponent dismantle an absolute claim containing the word 'never'?",
          "options": [
            "By presenting a single verifiable counterexample that disproves the universal statement.",
            "By shouting louder than the speaker.",
            "By agreeing that 'never' means 'always'."
          ],
          "answer": "By presenting a single verifiable counterexample that disproves the universal statement."
        },
        {
          "id": 3,
          "speaker": "Liam",
          "prompt": "Which qualifying words help us formulate academically sound arguments?",
          "options": [
            "Careful qualifiers such as 'some', 'many', 'often', and 'tend to'.",
            "Universal extremes like 'always', 'all', and 'everybody'.",
            "Made-up slang words with no dictionary definitions."
          ],
          "answer": "Careful qualifiers such as 'some', 'many', 'often', and 'tend to'."
        },
        {
          "id": 4,
          "speaker": "Liam",
          "prompt": "What is the difference between a valid argument and a sound argument?",
          "options": [
            "A valid argument has correct logical structure, while a sound argument also has factually true premises.",
            "A sound argument is played through high-volume audio speakers.",
            "There is no difference; both words mean the same thing."
          ],
          "answer": "A valid argument has correct logical structure, while a sound argument also has factually true premises."
        },
        {
          "id": 5,
          "speaker": "Liam",
          "prompt": "Why is recognizing fallacies an empowering skill in everyday life?",
          "options": [
            "It protects us from misleading advertisements, unfounded political claims, and biased thinking.",
            "It allows us to avoid doing our homework.",
            "It makes computers run twice as fast."
          ],
          "answer": "It protects us from misleading advertisements, unfounded political claims, and biased thinking."
        }
      ]
    },
    "part6_cloze": {
      "instructions": "Read the text about critical thinking and choose the correct function word for each blank space.",
      "text_template": "Critical thinking helps students identify flaws in argumentation. When someone claims that all gamers are unmotivated, they commit [1] hasty generalization fallacy. This invalid statement rests on [2] false assumption. Rather than using absolute words like 'always', careful thinkers use qualifiers such [3] 'some' and 'often'. An argument is sound only when its premises are true and its logic holds. Developing these skills protects citizens [4] misleading claims and fosters respectful debate [5] modern society.",
      "answers": { "1": "a", "2": "a", "3": "as", "4": "from", "5": "in" }
    }
  },
  "minigames": {
    "math_problems": [
      {
        "id": "w134_p1",
        "type": "part_whole",
        "title": "Tallying Logical Fallacies in a Media Sample",
        "question": "In an audit of 50 opinion articles, Zoe identified 18 hasty generalizations and 12 false cause fallacies. How many total fallacies did she detect across these two categories?",
        "storyContext": "Zoe categorizes reasoning errors on a media audit ledger.",
        "modelData": {
          "bars": [
            { "label": "Hasty Generalizations", "value": 18, "color": "#ef4444" },
            { "label": "False Cause Fallacies", "value": 12, "color": "#f59e0b" }
          ],
          "total": 30,
          "unit": "fallacies"
        },
        "target_answer": 30,
        "unit": "fallacies",
        "steps": [
          "Take hasty generalizations: 18.",
          "Add false cause fallacies: 12.",
          "18 + 12 = 30 total fallacies detected."
        ]
      },
      {
        "id": "w134_p2",
        "type": "comparison",
        "title": "Comparing Qualified Statements vs Universal Generalizations",
        "question": "In a debate transcript, team A used 35 qualified statements (using 'some' or 'often'), while team B used only 14 qualified statements, relying mostly on sweeping extremes. How many more qualified statements did team A use?",
        "storyContext": "Liam compares rhetorical qualifiers on a debate balance graph.",
        "modelData": {
          "bars": [
            { "label": "Team A (Careful Qualifiers)", "value": 35, "color": "#10b981" },
            { "label": "Team B (Sweeping Extremes)", "value": 14, "color": "#64748b" }
          ],
          "difference": 21,
          "unit": "statements"
        },
        "target_answer": 21,
        "unit": "statements",
        "steps": [
          "Start with Team A: 35 statements.",
          "Subtract Team B: 14 statements.",
          "35 - 14 = 21 more qualified statements."
        ]
      }
    ],
    "action_lab_scenarios": [
      {
        "stage": 1,
        "title": "Dismantling Hasty Generalization Syllogisms",
        "diagram_type": "syllogistic_fallacy_breakdown_flow",
        "instruction": "Identify the flawed inductive leap from an isolated anecdote to a universal premise.",
        "items": [
          { "label": "Isolated Particular Case", "target": "narrow_observation" },
          { "label": "Unwarranted Inductive Leap", "target": "fallacious_step" },
          { "label": "Flawed Universal Stereotype", "target": "invalid_conclusion" }
        ]
      },
      {
        "stage": 2,
        "title": "Inserting Epistemic Modal Qualifiers",
        "diagram_type": "epistemic_qualifier_tuning_matrix",
        "instruction": "Calibrate universal assertions with probability qualifiers ('often', 'tend to', 'some').",
        "items": [
          { "label": "Universal Extreme ('All / Never')", "target": "vulnerable_extreme" },
          { "label": "Nuanced Qualifier Filter", "target": "epistemic_moderator" },
          { "label": "Defensible Empirical Claim", "target": "sound_assertion" }
        ]
      },
      {
        "stage": 3,
        "title": "Validating Deductive Soundness Matrix",
        "diagram_type": "deductive_truth_soundness_tree",
        "instruction": "Test both structural logical validity and empirical factual truth of premises.",
        "items": [
          { "label": "Factually True Premise A", "target": "empirical_basis" },
          { "label": "Valid Deductive Inference Step", "target": "structural_rule" },
          { "label": "Sound and Incontestable Conclusion", "target": "verified_soundness" }
        ]
      }
    ],
    "grammar_drills": [
      { "sentence": "Many adolescent players tend to develop strong teamwork skills.", "options": ["tend to", "tend on", "tending to"], "answer": "tend to", "explanation": "Use 'tend to' followed by a base verb to express a habitual likelihood or disposition." },
      { "sentence": "Claiming that all gamers are unmotivated is an invalid generalization.", "options": ["an invalid", "a invalid", "invalid an"], "answer": "an invalid", "explanation": "Use the indefinite article 'an' before the vowel sound in 'invalid'." },
      { "sentence": "Critical thinkers use qualifiers such as some, many, and often.", "options": ["such as", "as such", "such like"], "answer": "such as", "explanation": "Use 'such as' to introduce specific illustrative examples." },
      { "sentence": "An argument is sound only when its foundational premises are true.", "options": ["premises are true", "premises is true", "premise are true"], "answer": "premises are true", "explanation": "The plural subject 'premises' requires the plural verb 'are'." },
      { "sentence": "Drawing a hasty conclusion from a single example creates misleading stereotypes.", "options": ["creates", "create", "creating"], "answer": "creates", "explanation": "The singular gerund phrase 'Drawing a hasty conclusion...' takes the singular verb 'creates'." }
    ]
  }
}

with open("scripts/specs_w133.mjs", "w", encoding="utf-8") as f:
    f.write(render_js(w133, "w133"))
print("✅ Generated scripts/specs_w133.mjs (Deep Research & Data)")

with open("scripts/specs_w134.mjs", "w", encoding="utf-8") as f:
    f.write(render_js(w134, "w134"))
print("✅ Generated scripts/specs_w134.mjs (Identifying Fallacies)")
