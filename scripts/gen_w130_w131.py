#!/usr/bin/env python3
"""
Generate scripts/specs_w130.mjs and scripts/specs_w131.mjs
Week 130: Opinion Project 3: Comparing Global Approaches
Week 131: Opinion Project 3: Persuasive Techniques
Stage 2: B2 First / Cambridge Lower Secondary
"""

import json

def render_js(spec_obj, export_name):
    js_content = json.dumps(spec_obj, indent=2, ensure_ascii=False)
    return f"/**\n * Auto-generated Spec for Week {spec_obj['week']}: {spec_obj['theme']}\n * Strict Blueprint Fidelity\n */\n\nexport const {export_name} = {js_content};\n\nexport default {export_name};\n"

# ==============================================================================
# WEEK 130: Opinion Project 3: Comparing Global Approaches
# ==============================================================================
w130 = {
  "week": 130,
  "theme": "Opinion Project 3: Comparing Global Approaches",
  "title_en": "Opinion Project 3: Comparing Global Approaches",
  "title_vi": "Dự án Quan điểm 3: So sánh các cách tiếp cận toàn cầu",
  "cefr_level": "B2 First",
  "grammar_focus": "Comparative legal synthesis, source citation markers ('In contrast to France's statutory ban, Florida opted for...', 'According to legislative records...').",
  "vocab_list": [
    { "id": 1, "word": "comparative", "pos": "adj", "ipa": "/kəmˈpærətɪv/", "definition_en": "Involving the systematic examination of two or more items or legal systems", "definition_vi": "so sánh / đối chiếu", "example_en": "A comparative analysis reveals profound differences between European and American statutes.", "example_vi": "Một phân tích so sánh chỉ ra những khác biệt sâu sắc giữa các đạo luật của Châu Âu và Hoa Kỳ." },
    { "id": 2, "word": "legislation", "pos": "n", "ipa": "/ˌledʒɪsˈleɪʃən/", "definition_en": "Laws or statutes enacted by a parliament or legislative body", "definition_vi": "luật pháp / các đạo luật ban hành", "example_en": "The parliament passed comprehensive legislation to regulate digital device usage in schools.", "example_vi": "Quốc hội đã thông qua một đạo luật toàn diện nhằm quy định việc sử dụng thiết bị kỹ thuật số trong trường học." },
    { "id": 3, "word": "ban", "n": "n", "pos": "n", "ipa": "/bæn/", "definition_en": "An official or legal prohibition against a particular activity or device", "definition_vi": "lệnh cấm chính thức", "example_en": "The national ban applies to all public elementary and middle school campuses.", "example_vi": "Lệnh cấm toàn quốc áp dụng cho tất cả các khuôn viên trường tiểu học và trung học cơ sở công lập." },
    { "id": 4, "word": "jurisdiction", "pos": "n", "ipa": "/ˌdʒʊrɪsˈdɪkʃən/", "definition_en": "The official authority to make legal decisions, enforce statutes, or govern", "definition_vi": "quyền hạn tài phán / thẩm quyền pháp lý", "example_en": "State legislators have jurisdiction over public school curriculum and disciplinary policies.", "example_vi": "Các nhà lập pháp tiểu bang có thẩm quyền pháp lý đối với chương trình giảng dạy và chính sách kỷ luật của trường công." },
    { "id": 5, "word": "enforcement", "pos": "n", "ipa": "/ɪnˈfɔːrsmənt/", "definition_en": "The act of compelling observance of or compliance with a law or rule", "definition_vi": "sự thực thi pháp luật / sự bắt buộc tuân thủ", "example_en": "Consistent enforcement ensures that students power off their devices before entering class.", "example_vi": "Sự thực thi nhất quán đảm bảo rằng học sinh tắt nguồn thiết bị trước khi vào lớp học." },
    { "id": 6, "word": "policy", "pos": "n", "ipa": "/ˈpɑːləsi/", "definition_en": "A course or principle of action adopted by a government or educational board", "definition_vi": "chính sách / chủ trương", "example_en": "The district policy balances technological literacy with classroom academic focus.", "example_vi": "Chính sách của học khu cân bằng giữa việc hiểu biết công nghệ với sự tập trung học tập trong lớp." },
    { "id": 7, "word": "compliance", "pos": "n", "ipa": "/kəmˈplaɪəns/", "definition_en": "The state or act of conforming to rules, laws, or institutional standards", "definition_vi": "sự tuân thủ", "example_en": "High student compliance was achieved after administrators clearly explained the rationale.", "example_vi": "Tỷ lệ tuân thủ cao của học sinh đã đạt được sau khi ban giám hiệu giải thích rõ ràng lý do." },
    { "id": 8, "word": "regulate", "pos": "v", "ipa": "/ˈreɡjəleɪt/", "definition_en": "To control or maintain the operation of a process by authoritative rules", "definition_vi": "điều chỉnh / quy định", "example_en": "Statutes regulate how social media corporations handle minor personal data.", "example_vi": "Các đạo luật quy định cách thức các tập đoàn mạng xã hội xử lý dữ liệu cá nhân của trẻ vị thành niên." },
    { "id": 9, "word": "statute", "pos": "n", "ipa": "/ˈstætʃuːt/", "definition_en": "A formal written enactment passed by a legislative authority", "definition_vi": "đạo luật / quy chế", "example_en": "The state statute requires schools to restrict mobile access during instructional hours.", "example_vi": "Đạo luật tiểu bang yêu cầu các trường học hạn chế truy cập di động trong giờ giảng dạy." },
    { "id": 10, "word": "framework", "pos": "n", "ipa": "/ˈfreɪmwɜːrk/", "definition_en": "An essential supporting structure or established system of rules", "definition_vi": "khuôn khổ pháp lý / cơ cấu", "example_en": "A legal framework provides clear boundaries for both teachers and parents.", "example_vi": "Một khuôn khổ pháp lý cung cấp các ranh giới rõ ràng cho cả giáo viên và phụ huynh." },
    { "id": 11, "word": "approach", "pos": "n", "ipa": "/əˈproʊtʃ/", "definition_en": "A distinctive way of addressing or dealing with a societal challenge", "definition_vi": "cách tiếp cận / phương pháp giải quyết", "example_en": "Florida adopted a targeted statutory approach focusing on social media algorithms.", "example_vi": "Florida đã áp dụng một cách tiếp cận luật pháp có mục tiêu tập trung vào các thuật toán mạng xã hội." },
    { "id": 12, "word": "restriction", "pos": "n", "ipa": "/rɪˈstrɪkʃən/", "definition_en": "A limiting condition or statutory rule placed upon access or behavior", "definition_vi": "sự hạn chế / giới hạn", "example_en": "The device restriction applies to hallways, dining halls, and sports fields during the school day.", "example_vi": "Sự hạn chế thiết bị áp dụng cho hành lang, phòng ăn và sân thể thao trong suốt ngày học." },
    { "id": 13, "word": "exemption", "pos": "n", "ipa": "/ɪɡˈzempʃən/", "definition_en": "Freedom from an obligation or restriction imposed on other persons", "definition_vi": "sự miễn trừ", "example_en": "Medical monitoring devices and disability accommodations receive an official exemption.", "example_vi": "Các thiết bị theo dõi y tế và hỗ trợ khuyết tật nhận được sự miễn trừ chính thức." },
    { "id": 14, "word": "directive", "pos": "n", "ipa": "/dəˈrektɪv/", "definition_en": "An official or authoritative instruction guiding institutional compliance", "definition_vi": "chỉ thị / chỉ dẫn chính thức", "example_en": "The ministry of education issued an administrative directive regarding phone storage lockers.", "example_vi": "Bộ giáo dục đã ban hành một chỉ thị hành chính liên quan đến các tủ khóa lưu trữ điện thoại." },
    { "id": 15, "word": "penalty", "pos": "n", "ipa": "/ˈpenəlti/", "definition_en": "A punishment or consequence imposed for breaking a law, rule, or contract", "definition_vi": "hình phạt / chế tài", "example_en": "Repeated violations result in an escalating administrative penalty including phone confiscation.", "example_vi": "Các vi phạm lặp lại dẫn đến một chế tài hành chính tăng dần bao gồm việc tạm giữ điện thoại." },
    { "id": 16, "word": "adopt", "pos": "v", "ipa": "/əˈdɑːpt/", "definition_en": "To formally choose, approve, or put into effect a policy or statute", "definition_vi": "thông qua / áp dụng", "example_en": "Several European countries decided to adopt the French model of classroom device prohibition.", "example_vi": "Một số quốc gia Châu Âu đã quyết định thông qua mô hình cấm thiết bị trong lớp học của Pháp." },
    { "id": 17, "word": "implement", "pos": "v", "ipa": "/ˈɪmpləment/", "definition_en": "To put a decision, plan, or statutory requirement into practical effect", "definition_vi": "triển khai / thực hiện", "example_en": "School principals must implement secure storage solutions before the academic term begins.", "example_vi": "Các hiệu trưởng nhà trường phải triển khai các giải pháp lưu trữ an toàn trước khi học kỳ bắt đầu." },
    { "id": 18, "word": "measure", "pos": "n", "ipa": "/ˈmeʒər/", "definition_en": "A legislative enactment, statutory provision, or official course of action", "definition_vi": "biện pháp pháp lý / giải pháp", "example_en": "Lawmakers enacted this regulatory measure to protect youth from online exploitation.", "example_vi": "Các nhà lập pháp đã ban hành biện pháp điều chỉnh này nhằm bảo vệ thanh thiếu niên khỏi sự bóc lột trực tuyến." },
    { "id": 19, "word": "precedent", "pos": "n", "ipa": "/ˈpresɪdənt/", "definition_en": "An earlier event, decision, or court ruling regarded as an exemplar guide", "definition_vi": "tiền lệ pháp lý", "example_en": "The landmark Supreme Court ruling established an enduring precedent for student privacy rights.", "example_vi": "Phán quyết mang tính bước ngoặt của Tòa án Tối cao đã thiết lập một tiền lệ lâu dài cho quyền riêng tư của học sinh." },
    { "id": 20, "word": "governance", "pos": "n", "ipa": "/ˈɡʌvərnəns/", "definition_en": "The action, manner, or system of governing an institution or society", "definition_vi": "sự quản trị / sự điều hành", "example_en": "Effective digital governance balances individual technological freedom with collective public welfare.", "example_vi": "Quản trị kỹ thuật số hiệu quả cân bằng giữa tự do công nghệ cá nhân với phúc lợi công cộng tập thể." }
  ],
  "clil": {
    "title_en": "Comparative Law: Device Restrictions in France and Florida",
    "title_vi": "Luật So Sánh: Các Quy Định Hạn Chế Thiết Bị Tại Pháp và Florida",
    "content_en": "Governments around the world have adopted contrasting legal frameworks to regulate mobile devices among youth. In comparative law, researchers analyze how distinct jurisdictions address shared social dilemmas. In France, national legislation completely banned personal smartphones in all primary and middle school grounds during instructional hours. French policymakers concluded that an absolute prohibition restores classroom concentration and prevents playground cyberbullying. In contrast, lawmakers in Florida instituted a statute mandating that public schools restrict student access to social media platforms during school hours, while granting schools local flexibility. When writing an analytical comparative essay, students synthesize primary legal texts, evaluate policy compliance rates, and assess public reception. Comparing French and American statutory models illustrates how legal cultures formulate different regulatory solutions to modern technological challenges.",
    "glossary": [
      { "word": "comparative", "definition_en": "The analytical methodology of contrasting legal systems and cultural policies across nations", "definition_vi": "phương pháp luận phân tích đối chiếu các hệ thống pháp luật và chính sách văn hóa giữa các quốc gia" },
      { "word": "legislation", "definition_en": "Enacted statutory provisions and parliamentary codes governing institutional behavior", "definition_vi": "các điều khoản quy định đã ban hành và bộ luật điều chỉnh hành vi của tổ chức" },
      { "word": "jurisdiction", "definition_en": "Territory or statutory sphere within which a governing authority exercises legal power", "definition_vi": "lãnh thổ hoặc phạm vi mà cơ quan có thẩm quyền thực thi quyền lực pháp lý" },
      { "word": "statute", "definition_en": "A formal written law passed by a legislative assembly governing public conduct", "definition_vi": "luật thành văn chính thức được thông qua bởi cơ quan lập pháp điều chỉnh hành vi công chúng" },
      { "word": "compliance", "definition_en": "Adherence to legislative commands, institutional directives, and administrative regulations", "definition_vi": "sự tuân thủ các mệnh lệnh lập pháp, chỉ thị của tổ chức và quy định hành chính" }
    ],
    "check_questions": [
      { "id": 1, "question_en": "How does France's national smartphone policy differ from Florida's state approach?", "options": ["France enacted an absolute nationwide ban across all school grounds, while Florida focused on restricting social media access", "France requires every student to carry three smartphones", "Florida banned all computers and books completely"], "answer": "France enacted an absolute nationwide ban across all school grounds, while Florida focused on restricting social media access" },
      { "id": 2, "question_en": "What primary justification did French lawmakers provide for their school device ban?", "options": ["Restoring classroom academic concentration and reducing playground cyberbullying", "Saving electrical power in school hallways", "Encouraging students to sell mobile phones"], "answer": "Restoring classroom academic concentration and reducing playground cyberbullying" },
      { "id": 3, "question_en": "Which students receive an exemption from school device restrictions?", "options": ["Students with verified medical needs or disability accommodations", "Only students on the varsity football team", "No exemptions are permitted under any circumstances"], "answer": "Students with verified medical needs or disability accommodations" }
    ],
    "critical_thinking": {
      "question_en": "Why does a nationwide centralized ban (like France's) create different enforcement challenges compared to a decentralized statute (like Florida's)?",
      "hint_en": "Centralized bans require uniform nationwide administrative resources, while decentralized statutes allow local districts to tailor enforcement to community needs."
    }
  },
  "shadowing_sentences": [
    { "id": 1, "text": "In France, national legislation completely bans smartphones on school grounds.", "en": "In France, national legislation completely bans smartphones on school grounds.", "vi": "Tại Pháp, luật pháp quốc gia cấm hoàn toàn điện thoại thông minh trong khuôn viên trường học.", "ipa": "/ɪn fræns ˈnæʃənəl ˌledʒɪsˈleɪʃən kəmˈpliːtli bænz ˈsmɑːrtfoʊnz ɑːn skuːl ɡraʊndz/", "words": ["In", "France", "national", "legislation", "completely", "bans", "smartphones", "on", "school", "grounds"] },
    { "id": 2, "text": "In contrast to France, Florida instituted a statute targeting social media access.", "en": "In contrast to France, Florida instituted a statute targeting social media access.", "vi": "Trái ngược với Pháp, Florida đã ban hành một đạo luật nhắm vào việc truy cập mạng xã hội.", "ipa": "/ɪn ˈkɑːntræst tuː fræns ˈflɔːrɪdə ˈɪnstɪtuːtɪd ə ˈstætʃuːt ˈtɑːrɡɪtɪŋ ˈsoʊʃəl ˈmiːdiə ˈækses/", "words": ["In", "contrast", "to", "France", "Florida", "instituted", "a", "statute", "targeting", "social", "media", "access"] },
    { "id": 3, "text": "Comparative law examines how distinct jurisdictions resolve shared educational challenges.", "en": "Comparative law examines how distinct jurisdictions resolve shared educational challenges.", "vi": "Luật so sánh xem xét cách các khu vực pháp lý khác nhau giải quyết những thách thức giáo dục chung.", "ipa": "/kəmˈpærətɪv lɔː ɪɡˈzæmɪnz haʊ dɪˈstɪŋkt ˌdʒʊrɪsˈdɪkʃənz rɪˈzɑːlv ʃerd ˌedʒuˈkeɪʃənəl ˈtʃælɪndʒɪz/", "words": ["Comparative", "law", "examines", "how", "distinct", "jurisdictions", "resolve", "shared", "educational", "challenges"] },
    { "id": 4, "text": "Students with verified medical conditions receive an official statutory exemption.", "en": "Students with verified medical conditions receive an official statutory exemption.", "vi": "Học sinh có tình trạng y tế đã được xác nhận sẽ nhận được sự miễn trừ theo luật chính thức.", "ipa": "/ˈstuːdənts wɪð ˈverɪfaɪd ˈmedɪkəl kənˈdɪʃənz rɪˈsiːv ən əˈfɪʃəl ˈstætʃətɔːri ɪɡˈzempʃən/", "words": ["Students", "with", "verified", "medical", "conditions", "receive", "an", "official", "statutory", "exemption"] },
    { "id": 5, "text": "Consistent enforcement ensures high compliance across public school classrooms.", "en": "Consistent enforcement ensures high compliance across public school classrooms.", "vi": "Sự thực thi nhất quán đảm bảo tỷ lệ tuân thủ cao trong các lớp học của trường công lập.", "ipa": "/kənˈsɪstənt ɪnˈfɔːrsmənt ɪnˈʃʊrz haɪ kəmˈplaɪəns əˈkrɔːs ˈpʌblɪk skuːl ˈklæsruːmz/", "words": ["Consistent", "enforcement", "ensures", "high", "compliance", "across", "public", "school", "classrooms"] },
    { "id": 6, "text": "French policymakers concluded that device bans significantly reduce cyberbullying.", "en": "French policymakers concluded that device bans significantly reduce cyberbullying.", "vi": "Các nhà hoạch định chính sách Pháp kết luận rằng lệnh cấm thiết bị làm giảm đáng kể bắt nạt trên mạng.", "ipa": "/frentʃ ˈpɑːləsiˌmeɪkərz kənˈkluːdɪd ðæt dɪˈvaɪs bænz sɪɡˈnɪfɪkəntli rɪˈduːs ˈsaɪbərbʊliɪŋ/", "words": ["French", "policymakers", "concluded", "that", "device", "bans", "significantly", "reduce", "cyberbullying"] },
    { "id": 7, "text": "Lawmakers designed regulatory measures to protect students from algorithmic distraction.", "en": "Lawmakers designed regulatory measures to protect students from algorithmic distraction.", "vi": "Các nhà lập pháp đã thiết kế các biện pháp quản lý nhằm bảo vệ học sinh khỏi sự xao nhãng của thuật toán.", "ipa": "/ˈlɔːˌmeɪkərz dɪˈzaɪnd ˈreɡjələtɔːri ˈmeʒərz tuː prəˈtekt ˈstuːdənts frəm ˌælɡəˈrɪðmɪk dɪˈstrækʃən/", "words": ["Lawmakers", "designed", "regulatory", "measures", "to", "protect", "students", "from", "algorithmic", "distraction"] },
    { "id": 8, "text": "Analyzing international policies broadens our understanding of public governance.", "en": "Analyzing international policies broadens our understanding of public governance.", "vi": "Phân tích các chính sách quốc tế mở rộng sự hiểu biết của chúng ta về quản trị công.", "ipa": "/ˈænəlaɪzɪŋ ˌɪntərˈnæʃənəl ˈpɑːləsiz ˈbrɔːdənz ˈaʊər ˌʌndərˈstændɪŋ əv ˈpʌblɪk ˈɡʌvərnəns/", "words": ["Analyzing", "international", "policies", "broadens", "our", "understanding", "of", "public", "governance"] }
  ],
  "story_scenes": [
    { "id": 1, "scene_id": "scene_1", "scene_number": 1, "title_en": "Examining the French National Code", "title_vi": "Xem Xét Bộ Luật Quốc Gia Pháp", "description_en": "Chloe reads the French Education Code article mandating that all primary school students store phones in lockers.", "description": "Chloe reads the French Education Code article mandating that all primary school students store phones in lockers.", "image_url": "/images/week130/webtoon_scene_1.png", "audio_url": "/audio/week130/scene_1.mp3" },
    { "id": 2, "scene_id": "scene_2", "scene_number": 2, "title_en": "Investigating Florida's Social Media Statute", "title_vi": "Điều Tra Đạo Luật Mạng Xã Hội Của Florida", "description_en": "Chloe and David analyze Florida legislation that restricts minor access to algorithmic social platforms.", "description": "Chloe and David analyze Florida legislation that restricts minor access to algorithmic social platforms.", "image_url": "/images/week130/webtoon_scene_2.png", "audio_url": "/audio/week130/scene_2.mp3" },
    { "id": 3, "scene_id": "scene_3", "scene_number": 3, "title_en": "Comparing Policy Enforcement Models", "title_vi": "So Sánh Các Mô Hình Thực Thi Chính Sách", "description_en": "David sketches a comparative matrix contrasting France's centralized ban with Florida's local district discretion.", "description": "David sketches a comparative matrix contrasting France's centralized ban with Florida's local district discretion.", "image_url": "/images/week130/webtoon_scene_3.png", "audio_url": "/audio/week130/scene_3.mp3" },
    { "id": 4, "scene_id": "scene_4", "scene_number": 4, "title_en": "Debating Student Civil Liberties", "title_vi": "Tranh Biện Về Quyền Tự Do Dân Sự Của Học Sinh", "description_en": "The study group discusses legal precedents concerning student privacy, emergency contact, and medical exemptions.", "description": "The study group discusses legal precedents concerning student privacy, emergency contact, and medical exemptions.", "image_url": "/images/week130/webtoon_scene_4.png", "audio_url": "/audio/week130/scene_4.mp3" },
    { "id": 5, "scene_id": "scene_5", "scene_number": 5, "title_en": "Presenting the Comparative Synthesis", "title_vi": "Trình Bày Tổng Hợp So Sánh", "description_en": "Chloe and David deliver their presentation to the civics class, earning praise for their balanced legal synthesis.", "description": "Chloe and David deliver their presentation to the civics class, earning praise for their balanced legal synthesis.", "image_url": "/images/week130/webtoon_scene_5.png", "audio_url": "/audio/week130/scene_5.mp3" }
  ],
  "writing_data": {
    "title": "Comparative Analysis of International Device Legislation",
    "prompt_en": "Look at the four panels. Write a comparative essay paragraph synthesizing French and American statutory approaches to student mobile devices. Use comparative connectors ('in contrast to', 'whereas', 'on the other hand') and legal terminology. Write 20 or more words.",
    "prompt_vi": "Nhìn vào 4 khung tranh. Viết một đoạn văn bài luận so sánh tổng hợp các cách tiếp cận luật pháp của Pháp và Hoa Kỳ đối với thiết bị di động của học sinh. Sử dụng từ nối so sánh ('in contrast to', 'whereas', 'on the other hand') và thuật ngữ pháp lý. Viết từ 20 từ trở lên.",
    "min_sentences": 3,
    "min_words": 20,
    "max_words": 90,
    "model_sentence": "In contrast to France's centralized legislation, which completely bans personal smartphones on school campuses, Florida adopted a targeted statutory framework. French policymakers enacted an absolute prohibition to eliminate cyberbullying and restore academic concentration. Whereas Florida's legislation specifically restricts access to algorithmic social media networks during instructional hours, both jurisdictions provide clear medical exemptions to safeguard student health.",
    "word_bank": ["comparative", "legislation", "ban", "jurisdiction", "enforcement", "policy", "compliance", "statute", "restriction", "exemption"],
    "sentence_frames": [
      "In contrast to France's nationwide ban, Florida adopted a targeted ___ framework.",
      "French policymakers enacted strict ___ to eliminate classroom distractions.",
      "Whereas France prohibits all devices, Florida restricts access to social ___ apps.",
      "Ultimately, both legal models grant statutory ___ for verified medical needs."
    ],
    "panels": [
      {
        "panel_id": "panel_1",
        "title_en": "Panel 1: The French Centralized Prohibition",
        "title_vi": "Khung 1: Lệnh Cấm Tập Trung Của Pháp",
        "image_url": "/images/week130/writing_panel_1.png",
        "image_prompt": "French middle school students placing their mobile phones into numbered secure wooden lockers in the school foyer.",
        "caption": "France enacted a nationwide statute prohibiting devices across all school grounds.",
        "sentence_frame": "French legislation [imposes an absolute nationwide ban] on [personal mobile devices in schools].",
        "pills": ["imposes an absolute nationwide ban", "personal mobile devices in schools", "centralized statutory code", "prohibits playground usage"],
        "connectors": ["First,", "Under French law,", "In the French model,"]
      },
      {
        "panel_id": "panel_2",
        "title_en": "Panel 2: Florida's Social Media Statute",
        "title_vi": "Khung 2: Đạo Luật Mạng Xã Hội Của Florida",
        "image_url": "/images/week130/writing_panel_2.png",
        "image_prompt": "A state legislative chamber with voting boards displaying bill titles on youth digital platform access.",
        "caption": "Florida's statute specifically restricts minor social media platform accounts.",
        "sentence_frame": "Florida lawmakers [passed targeted legislation] that [restricts minor social media access].",
        "pills": ["passed targeted legislation", "restricts minor social media access", "algorithmic platform safeguards", "district-level enforcement"],
        "connectors": ["In contrast,", "Whereas Florida,", "On the other hand,"]
      },
      {
        "panel_id": "panel_3",
        "title_en": "Panel 3: Statutory Exemptions for Medical Needs",
        "title_vi": "Khung 3: Các Miễn Trừ Pháp Lý Cho Nhu Cầu Y Tế",
        "image_url": "/images/week130/writing_panel_3.png",
        "image_prompt": "A school nurse reviewing a student's continuous glucose monitoring smartphone app with medical permission forms.",
        "caption": "Statutes provide legal exemptions for students requiring continuous medical monitoring.",
        "sentence_frame": "Both jurisdictions [grant official statutory exemptions] for [students with documented medical needs].",
        "pills": ["grant official statutory exemptions", "students with documented medical needs", "glucose monitoring devices", "essential health protections"],
        "connectors": ["Importantly,", "In both jurisdictions,", "Furthermore,"]
      },
      {
        "panel_id": "panel_4",
        "title_en": "Panel 4: Comparative Governance Insights",
        "title_vi": "Khung 4: Những Góc Nhìn Quản Trị So Sánh",
        "image_url": "/images/week130/writing_panel_4.png",
        "image_prompt": "A global comparative law seminar with international flags and presentation screens showing youth policy metrics.",
        "caption": "Comparing legal cultures illuminates diverse paths to digital governance.",
        "sentence_frame": "Comparative legal analysis [reveals how diverse cultures] address [shared modern technological challenges].",
        "pills": ["reveals how diverse cultures", "shared modern technological challenges", "balances freedom and safety", "effective public governance"],
        "connectors": ["In conclusion,", "Ultimately,", "Consequently,"]
      }
    ],
    "ladder_stages": [
      {
        "badge_label": "MODEL",
        "title": "Stage 1: Describing the French Model",
        "image_url": "/images/week130/writing_panel_1.png",
        "caption": "France enacted a nationwide statute prohibiting devices across all school grounds.",
        "frame_L1": "France has a nationwide law. It bans all mobile phones in elementary and middle schools.",
        "connectors": ["First,", "Under French law,", "In France,"],
        "sentence_hint": "Write 2 sentences describing France's absolute device ban.",
        "ordered_chips": ["French national legislation", "completely bans mobile phones", "across all school grounds", "during instructional hours."],
        "pills": ["French national legislation", "completely bans mobile phones", "across school grounds", "instructional hours"],
        "sentence_frame": "French legislation [imposes an absolute nationwide ban] on [personal mobile devices in schools]."
      },
      {
        "badge_label": "BUILD",
        "title": "Stage 2: Introducing the Florida Approach",
        "image_url": "/images/week130/writing_panel_2.png",
        "caption": "Florida's statute specifically restricts minor social media platform accounts.",
        "frame_L1": "In contrast, Florida passed a different law. It restricts youth access to social media apps during class.",
        "connectors": ["In contrast,", "Whereas Florida,", "On the other hand,"],
        "sentence_hint": "Write 2 sentences contrasting Florida's targeted policy with France's ban.",
        "pills": ["in contrast", "Florida passed a law", "restricts social media", "during class hours"],
        "sentence_frame": "Florida lawmakers [passed targeted legislation] that [restricts minor social media access]."
      },
      {
        "badge_label": "WRITE",
        "title": "Stage 3: Identifying Shared Safeguards",
        "image_url": "/images/week130/writing_panel_3.png",
        "caption": "Statutes provide legal exemptions for students requiring continuous medical monitoring.",
        "frame_L1": "Both laws provide medical exemptions. Students with health monitoring devices can use phones safely.",
        "connectors": ["Importantly,", "Furthermore,", "In both jurisdictions,"],
        "sentence_hint": "Write 2 sentences describing how medical exemptions protect students.",
        "pills": ["both laws provide exemptions", "health monitoring devices", "use phones safely", "essential protection"],
        "sentence_frame": "Both jurisdictions [grant official statutory exemptions] for [students with documented medical needs]."
      },
      {
        "badge_label": "EXPAND",
        "title": "Stage 4: Synthesizing Comparative Governance",
        "image_url": "/images/week130/writing_panel_4.png",
        "caption": "Comparing legal cultures illuminates diverse paths to digital governance.",
        "frame_L1": "Comparative law shows different solutions. Governments can balance technological access with student focus.",
        "connectors": ["In conclusion,", "Ultimately,", "Consequently,"],
        "sentence_hint": "Write 2 sentences summarizing the broader lessons of comparative policy analysis.",
        "pills": ["comparative law insights", "different regulatory paths", "balance access and focus", "modern public governance"],
        "sentence_frame": "Comparative legal analysis [reveals how diverse cultures] address [shared modern technological challenges]."
      }
    ]
  },
  "speaking_data": {
    "talkshow_prompt": {
      "topic": "Synthesizing Comparative Legal Frameworks on Student Mobile Devices",
      "question": "Chloe, how does examining international laws help educators design better technology policies?",
      "model_response": "Examining international models allows us to see theoretical ideas tested in real classrooms! France tested an absolute centralized prohibition, demonstrating that removing phones dramatically reduces hallway drama and cyberbullying. Meanwhile, Florida tested a targeted statute focusing specifically on addictive social media algorithms while preserving educational technology. Comparing these frameworks gives school districts proven data to build balanced, enforceable policies!"
    },
    "info_exchange_cards": {
      "table_a": {
        "title": "Chloe's Comparative Policy Matrix",
        "subtitle": "Candidate's Question Card (Ask Examiner)",
        "person": "Chloe",
        "fields": [
          { "id": "field_a1", "cue_prompt": "where / French national legislation debated?", "cue_word": "where", "is_missing": True, "acceptable_questions": ["Where was the French national legislation debated?", "Where was the legislation debated?", "Where did French lawmakers debate the law?"], "nova_reply": "The legislation was debated in the National Assembly in Paris." },
          { "id": "field_a2", "cue_prompt": "what / penalty for unauthorized phone use in France?", "cue_word": "what", "is_missing": True, "acceptable_questions": ["What is the penalty for unauthorized phone use in France?", "What happens if a student uses a phone?", "What is the penalty?"], "nova_reply": "Confiscation of the device until the end of the school day." },
          { "id": "field_a3", "cue_prompt": "how many / students affected by Florida statute?", "cue_word": "how many", "is_missing": True, "acceptable_questions": ["How many students are affected by the Florida statute?", "How many students does the law cover?", "What is the student population affected?"], "nova_reply": "Approximately two point eight million public school students across the state." },
          { "id": "field_a4", "cue_prompt": "who / sponsors legal compliance audits in schools?", "cue_word": "who", "is_missing": True, "acceptable_questions": ["Who sponsors legal compliance audits in schools?", "Who checks for compliance?", "Who conducts the audits?"], "nova_reply": "State Department of Education compliance inspectors and local district officers." },
          { "id": "field_a5", "cue_prompt": "why / statutes include medical exemptions?", "cue_word": "why", "is_missing": True, "acceptable_questions": ["Why do statutes include medical exemptions?", "Why are medical exemptions necessary?", "Why exempt health devices?"], "nova_reply": "To protect students with diabetes who require continuous smartphone glucose monitoring." }
        ]
      },
      "table_b": {
        "title": "Inspector Laurent's Enforcement Protocol",
        "subtitle": "Information Card (Answer Examiner's Questions)",
        "person": "Inspector Laurent",
        "fields": [
          { "id": "field_b1", "cue_prompt": "where / store confiscated mobile devices?", "cue_word": "where", "value": "Inside secure fireproof administration lockboxes.", "nova_question": "Where are confiscated mobile devices stored?", "acceptable_answers": ["Inside secure fireproof administration lockboxes.", "In administrative lockboxes.", "In fireproof lockboxes."] },
          { "id": "field_b2", "cue_prompt": "what / percentage of student compliance reported?", "cue_word": "what", "value": "Over ninety-two percent compliance within three months.", "nova_question": "What percentage of student compliance was reported?", "acceptable_answers": ["Over ninety-two percent compliance within three months.", "Over 92 percent.", "Ninety-two percent."] },
          { "id": "field_b3", "cue_prompt": "how / teachers verify medical exemptions?", "cue_word": "how", "value": "Through registered digital health passes issued by school doctors.", "nova_question": "How do teachers verify medical exemptions?", "acceptable_answers": ["Through registered digital health passes issued by school doctors.", "With registered digital health passes.", "Through doctor health passes."] },
          { "id": "field_b4", "cue_prompt": "who / drafted the model enforcement protocol?", "cue_word": "who", "value": "A joint commission of child psychologists, teachers, and legal scholars.", "nova_question": "Who drafted the model enforcement protocol?", "acceptable_answers": ["A joint commission of child psychologists, teachers, and legal scholars.", "A joint commission of experts.", "Psychologists, teachers, and scholars."] },
          { "id": "field_b5", "cue_prompt": "why / centralized legislation easier to enforce?", "cue_word": "why", "value": "Because clear uniform rules eliminate subjective arguments at school gates.", "nova_question": "Why is centralized legislation easier to enforce?", "acceptable_answers": ["Because clear uniform rules eliminate subjective arguments at school gates.", "Uniform rules eliminate arguments.", "It creates clear uniform standards."] }
        ]
      }
    }
  },
  "cambridge_rw": {
    "part1_definitions": [
      { "id": 1, "text": "A formal written enactment or code passed by a legislative assembly.", "target": "statute" },
      { "id": 2, "text": "The systematic examination and comparison of two or more legal systems.", "target": "comparative" },
      { "id": 3, "text": "An official exemption granted to relieve an individual from a statutory rule.", "target": "exemption" },
      { "id": 4, "text": "The active process of compelling obedience and adherence to legal rules.", "target": "enforcement" },
      { "id": 5, "text": "A punishment or consequence imposed on an individual for violating rules.", "target": "penalty" }
    ],
    "part2_dialogue": {
      "title": "Analyzing International Legal Approaches to Classroom Devices",
      "turns": [
        {
          "id": 1,
          "speaker": "David",
          "prompt": "Chloe, what is the central legal difference between the French and Florida approaches?",
          "options": [
            "France imposed a complete nationwide ban on school grounds, whereas Florida targeted social media platforms.",
            "France banned textbooks while Florida banned teachers.",
            "There is no difference; both countries closed all schools."
          ],
          "answer": "France imposed a complete nationwide ban on school grounds, whereas Florida targeted social media platforms."
        },
        {
          "id": 2,
          "speaker": "David",
          "prompt": "Why did French lawmakers decide against giving individual schools local discretion?",
          "options": [
            "A uniform nationwide statute establishes clear expectations and eliminates boundary disputes.",
            "They wanted teachers to spend all day searching backpacks.",
            "Local principals were forbidden from reading email."
          ],
          "answer": "A uniform nationwide statute establishes clear expectations and eliminates boundary disputes."
        },
        {
          "id": 3,
          "speaker": "David",
          "prompt": "How does Florida's statute address potential legal challenges regarding student safety?",
          "options": [
            "It explicitly permits devices for medical needs and emergency communications outside instructional periods.",
            "It requires every student to carry a satellite radio.",
            "It ignores student health completely."
          ],
          "answer": "It explicitly permits devices for medical needs and emergency communications outside instructional periods."
        },
        {
          "id": 4,
          "speaker": "David",
          "prompt": "What did comparative compliance data reveal after these policies were implemented?",
          "options": [
            "Classroom concentration improved significantly and reported incidents of cyberbullying declined.",
            "Student test scores dropped to zero across both nations.",
            "All students stopped coming to school."
          ],
          "answer": "Classroom concentration improved significantly and reported incidents of cyberbullying declined."
        },
        {
          "id": 5,
          "speaker": "David",
          "prompt": "How does comparative law contribute to sound policymaking?",
          "options": [
            "It enables lawmakers to evaluate the real-world outcomes of policies adopted by other jurisdictions.",
            "It forces all countries to speak the exact same language.",
            "It proves that laws can never change."
          ],
          "answer": "It enables lawmakers to evaluate the real-world outcomes of policies adopted by other jurisdictions."
        }
      ]
    },
    "part6_cloze": {
      "instructions": "Read the comparative legal text and choose the correct function word for each blank space.",
      "text_template": "Comparative legal studies highlight contrasting approaches to school technology. In France, national legislation completely bans smartphones [1] all elementary campuses. In contrast [2] this absolute prohibition, Florida opted [3] a statute that restricts algorithmic social media networks. Both frameworks provide exceptions [4] students with documented medical conditions. Ultimately, analyzing international policies helps governments design rules [5] protect adolescent mental health.",
      "answers": { "1": "on", "2": "to", "3": "for", "4": "for", "5": "that" }
    }
  },
  "minigames": {
    "math_problems": [
      {
        "id": "w130_p1",
        "type": "part_whole",
        "title": "Tallying Comparative School Device Survey Sample",
        "question": "A comparative legal study surveys 180 French school administrators and 220 American district superintendents regarding policy enforcement. What is the total survey sample size?",
        "storyContext": "Chloe compiles survey response totals for her comparative law portfolio.",
        "modelData": {
          "bars": [
            { "label": "French Administrators", "value": 180, "color": "#3b82f6" },
            { "label": "American Superintendents", "value": 220, "color": "#ef4444" }
          ],
          "total": 400,
          "unit": "administrators"
        },
        "target_answer": 400,
        "unit": "administrators",
        "steps": [
          "Take French respondents: 180.",
          "Add American respondents: 220.",
          "180 + 220 = 400 total administrators surveyed."
        ]
      },
      {
        "id": "w130_p2",
        "type": "comparison",
        "title": "Comparing Policy Compliance Rates Over Time",
        "question": "In a pilot school, student compliance with device rules was 65 percent in September and rose to 92 percent by December following clear communication. What was the percentage increase in compliance?",
        "storyContext": "David graphs compliance improvements across the academic term.",
        "modelData": {
          "bars": [
            { "label": "December Compliance", "value": 92, "color": "#10b981" },
            { "label": "September Baseline", "value": 65, "color": "#f59e0b" }
          ],
          "difference": 27,
          "unit": "percentage points"
        },
        "target_answer": 27,
        "unit": "percentage points",
        "steps": [
          "Start with December compliance: 92%.",
          "Subtract September compliance: 65%.",
          "92 - 65 = 27 percentage point improvement."
        ]
      }
    ],
    "action_lab_scenarios": [
      {
        "stage": 1,
        "title": "Centralized vs Decentralized Statutory Architecture",
        "diagram_type": "comparative_governance_flowchart",
        "instruction": "Map legislative command structures from national parliaments to local classroom doors.",
        "items": [
          { "label": "National Statutory Mandate", "target": "centralized_model" },
          { "label": "Decentralized District Policy", "target": "local_discretion" },
          { "label": "Administrative Enforcement Gateway", "target": "compliance_point" }
        ]
      },
      {
        "stage": 2,
        "title": "Filtering Algorithmic Social Media Access",
        "diagram_type": "school_firewall_protocol_filter",
        "instruction": "Configure school network protocols to block social algorithms while allowing educational research.",
        "items": [
          { "label": "Social Platform Packet Filter", "target": "statutory_block" },
          { "label": "Educational Database Whitelist", "target": "open_access" },
          { "label": "Encrypted School Network Router", "target": "secure_gateway" }
        ]
      },
      {
        "stage": 3,
        "title": "Evaluating Medical & Accommodation Exemptions",
        "diagram_type": "statutory_exemption_verification_flow",
        "instruction": "Process verified medical certificates to grant authorized device exemptions.",
        "items": [
          { "label": "Physician Medical Certificate", "target": "verification_input" },
          { "label": "Digital Health Permit", "target": "authorization_badge" },
          { "label": "Secure Classroom Monitoring", "target": "protected_usage" }
        ]
      }
    ],
    "grammar_drills": [
      { "sentence": "In contrast to France's nationwide ban, Florida opted for a decentralized approach.", "options": ["In contrast to", "In addition to", "As a result of"], "answer": "In contrast to", "explanation": "Use 'In contrast to' to highlight a prominent difference between two subjects." },
      { "sentence": "Whereas France bans all devices, Florida restricts access to specific platforms.", "options": ["Whereas", "Because", "Despite"], "answer": "Whereas", "explanation": "Use 'Whereas' to contrast two facts or situations in adjoining clauses." },
      { "sentence": "Students with documented health conditions receive an official exemption.", "options": ["exemption", "exempted", "exempting"], "answer": "exemption", "explanation": "Use the noun 'exemption' following the adjective 'official'." },
      { "sentence": "Consistent enforcement ensures that all students comply with school policies.", "options": ["comply with", "comply to", "comply for"], "answer": "comply with", "explanation": "Use the preposition 'with' following the verb 'comply'." },
      { "sentence": "Lawmakers enacted statutory measures to protect student wellbeing.", "options": ["enacted", "enact", "enacting"], "answer": "enacted", "explanation": "Use the past simple 'enacted' to describe completed legislative actions." }
    ]
  }
}

# ==============================================================================
# WEEK 131: Opinion Project 3: Persuasive Techniques
# ==============================================================================
w131 = {
  "week": 131,
  "theme": "Opinion Project 3: Persuasive Techniques",
  "title_en": "Opinion Project 3: Persuasive Techniques",
  "title_vi": "Dự án Quan điểm 3: Kỹ thuật Thuyết phục",
  "cefr_level": "B2 First",
  "grammar_focus": "Rhetorical Triads, Stress & Persuasive Cadence ('Not only does it..., but it also...', parallel structures, and vocal pitch modulation).",
  "vocab_list": [
    { "id": 1, "word": "persuasion", "pos": "n", "ipa": "/pərˈsweɪʒən/", "definition_en": "The action or fact of convincing someone to believe or do something", "definition_vi": "sự thuyết phục", "example_en": "Mastering the art of persuasion empowers leaders to inspire meaningful civic action.", "example_vi": "Làm chủ nghệ thuật thuyết phục giúp các nhà lãnh đạo truyền cảm hứng cho những hành động công dân ý nghĩa." },
    { "id": 2, "word": "ethos", "pos": "n", "ipa": "/ˈiːθɑːs/", "definition_en": "A rhetorical appeal based on the speaker's moral character, credibility, and authority", "definition_vi": "sức thuyết phục từ uy tín / tư cách đạo đức", "example_en": "By citing twenty years of pediatric research, Dr. Lin established strong personal ethos.", "example_vi": "Bằng cách trích dẫn hai mươi năm nghiên cứu nhi khoa, Tiến sĩ Lin đã thiết lập được uy tín cá nhân mạnh mẽ." },
    { "id": 3, "word": "pathos", "pos": "n", "ipa": "/ˈpeɪθɑːs/", "definition_en": "A rhetorical appeal that evokes empathy, emotion, and heartfelt feeling in an audience", "definition_vi": "sức thuyết phục từ cảm xúc / sự đồng cảm", "example_en": "The speaker used pathos by sharing a poignant story about an anxious child finding peace.", "example_vi": "Diễn giả đã sử dụng cảm xúc bằng cách chia sẻ một câu chuyện xúc động về một đứa trẻ lo âu tìm lại sự bình yên." },
    { "id": 4, "word": "logos", "pos": "n", "ipa": "/ˈloʊɡɑːs/", "definition_en": "A rhetorical appeal based on logic, factual evidence, and structured reasoning", "definition_vi": "sức thuyết phục từ tính logic / lập luận chặt chẽ", "example_en": "Rigorous statistical charts provided the logos necessary to convince the school board.", "example_vi": "Các biểu đồ thống kê nghiêm ngặt đã cung cấp tính logic cần thiết để thuyết phục hội đồng nhà trường." },
    { "id": 5, "word": "appeal", "pos": "n", "ipa": "/əˈpiːl/", "definition_en": "A serious, urgent, or structured rhetorical request used to influence an audience", "definition_vi": "sự lôi cuốn / lời kêu gọi / phương thức thuyết phục", "example_en": "Effective orators combine emotional appeal with verifiable empirical facts.", "example_vi": "Những nhà diễn thuyết hiệu quả kết hợp sức hút cảm xúc với các sự thật thực nghiệm có thể kiểm chứng." },
    { "id": 6, "word": "credibility", "pos": "n", "ipa": "/ˌkredəˈbɪləti/", "definition_en": "The quality of being trusted, believable, and academically respected", "definition_vi": "sự đáng tin cậy / uy tín", "example_en": "Fabricating quotes severely undermines a debater's professional credibility.", "example_vi": "Bịa đặt trích dẫn làm suy yếu nghiêm trọng uy tín nghề nghiệp của một tranh biện viên." },
    { "id": 7, "word": "rhetorical", "pos": "adj", "ipa": "/rɪˈtɔːrɪkəl/", "definition_en": "Relating to the strategic and artistic use of spoken or written discourse", "definition_vi": "thuộc về thuật tu từ / mang tính hùng biện", "example_en": "The speech utilized rhetorical questions to prompt deep audience reflection.", "example_vi": "Bài phát biểu đã sử dụng các câu hỏi tu từ để thúc đẩy khán giả suy ngẫm sâu sắc." },
    { "id": 8, "word": "emotion", "pos": "n", "ipa": "/ɪˈmoʊʃən/", "definition_en": "A natural instinctive state of mind deriving from personal circumstances", "definition_vi": "cảm xúc", "example_en": "Tapping into genuine audience emotion creates an enduring human connection.", "example_vi": "Chạm vào cảm xúc chân thật của khán giả tạo ra một sự kết nối con người lâu dài." },
    { "id": 9, "word": "logic", "pos": "n", "ipa": "/ˈlɑːdʒɪk/", "definition_en": "Reasoning conducted according to strict principles of validity and truth", "definition_vi": "tính logic / lý lẽ hợp lý", "example_en": "Clear deductive logic ensures that conclusions follow naturally from premises.", "example_vi": "Tính logic suy diễn rõ ràng đảm bảo rằng các kết luận bắt nguồn một cách tự nhiên từ các tiền đề." },
    { "id": 10, "word": "convince", "pos": "v", "ipa": "/kənˈvɪns/", "definition_en": "To cause someone to believe firmly in the truth of an assertion", "definition_vi": "thuyết phục ai tin điều gì", "example_en": "Sound arguments supported by peer-reviewed evidence convince skeptical listeners.", "example_vi": "Những lập luận vững chắc được củng cố bằng bằng chứng bình duyệt sẽ thuyết phục những người nghe hoài nghi." },
    { "id": 11, "word": "metaphor", "pos": "n", "ipa": "/ˈmetəfɔːr/", "definition_en": "A figure of speech in which a word or phrase is applied to an object not literally applicable", "definition_vi": "phép ẩn dụ", "example_en": "Calling a smartphone 'a glowing slot machine in your pocket' is a vivid metaphor.", "example_vi": "Gọi điện thoại thông minh là 'một chiếc máy đánh bạc phát sáng trong túi bạn' là một phép ẩn dụ sinh động." },
    { "id": 12, "word": "orator", "pos": "n", "ipa": "/ˈɔːrətər/", "definition_en": "A skilled and eloquent public speaker trained in rhetoric", "definition_vi": "nhà diễn thuyết / nhà hùng biện", "example_en": "The young orator modulated his vocal pitch to highlight key moral questions.", "example_vi": "Nhà diễn thuyết trẻ tuổi đã điều biến cao độ giọng nói để làm nổi bật các câu hỏi đạo đức then chốt." },
    { "id": 13, "word": "analogy", "pos": "n", "ipa": "/əˈnælədʒi/", "definition_en": "A comparison between two distinct things to clarify or explain an idea", "definition_vi": "sự suy diễn tương tự / phép loại suy", "example_en": "He drew an analogy between digital distraction and junk food consumption.", "example_vi": "Anh ấy đã đưa ra một phép so sánh tương tự giữa sự xao nhãng kỹ thuật số và việc tiêu thụ thức ăn rác." },
    { "id": 14, "word": "cadence", "pos": "n", "ipa": "/ˈkeɪdəns/", "definition_en": "A rhythmic sequence, flow, or modulation of sounds in spoken delivery", "definition_vi": "nhịp điệu câu nói / âm điệu", "example_en": "The rhythmic cadence of the address echoed the cadence of famous historical speeches.", "example_vi": "Âm điệu nhịp nhàng của bài phát biểu lặp lại nhịp điệu của các bài diễn văn lịch sử nổi tiếng." },
    { "id": 15, "word": "eloquence", "pos": "n", "ipa": "/ˈeləkwəns/", "definition_en": "Fluent, graceful, and persuasive speaking or writing", "definition_vi": "sự hùng biện / tài ăn nói lưu loát", "example_en": "Her natural eloquence moved the entire assembly to stand and applaud.", "example_vi": "Tài hùng biện tự nhiên của cô ấy đã khiến toàn thể hội trường đứng dậy vỗ tay." },
    { "id": 16, "word": "passion", "pos": "n", "ipa": "/ˈpæʃən/", "definition_en": "Strong, barely controllable emotion or intense personal conviction", "definition_vi": "niềm đam mê / sự nhiệt huyết", "example_en": "Speaking with authentic passion transforms dry research into an urgent moral call.", "example_vi": "Nói chuyện với niềm đam mê đích thực biến nghiên cứu khô khan thành một lời kêu gọi đạo đức khẩn thiết." },
    { "id": 17, "word": "rationale", "pos": "n", "ipa": "/ˌræʃəˈnæl/", "definition_en": "A set of reasons or a logical basis for a course of action or belief", "definition_vi": "lý do căn bản / cơ sở hợp lý", "example_en": "The policy document outlines the scientific rationale behind screen restrictions.", "example_vi": "Tài liệu chính sách phác thảo cơ sở khoa học đằng sau các giới hạn màn hình." },
    { "id": 18, "word": "motive", "pos": "n", "ipa": "/ˈmoʊtɪv/", "definition_en": "A reason for doing something, especially one that is hidden or underlying", "definition_vi": "động cơ / mục đích", "example_en": "Commercial app developers have a financial motive to maximize youth screen time.", "example_vi": "Các nhà phát triển ứng dụng thương mại có động cơ tài chính để tối đa hóa thời gian sử dụng màn hình của giới trẻ." },
    { "id": 19, "word": "repetition", "pos": "n", "ipa": "/ˌrepəˈtɪʃən/", "definition_en": "The deliberate repeating of key words or phrases for rhetorical emphasis", "definition_vi": "sự lặp từ / điệp từ điệp ngữ", "example_en": "Deliberate repetition of 'We can choose balance' anchored the keynote theme.", "example_vi": "Việc lặp lại có chủ đích cụm từ 'Chúng ta có thể chọn sự cân bằng' đã khắc sâu chủ đề của bài diễn văn." },
    { "id": 20, "word": "charismatic", "pos": "adj", "ipa": "/ˌkerɪzˈmætɪk/", "definition_en": "Exercising a compelling personal charm and leadership that inspires others", "definition_vi": "có sức hút lôi cuốn / có uy tín lãnh đạo", "example_en": "The charismatic team captain motivated everyone to practice their speeches daily.", "example_vi": "Đội trưởng lôi cuốn đã thúc đẩy mọi người luyện tập bài phát biểu của mình hàng ngày." }
  ],
  "clil": {
    "title_en": "Rhetorical Appeals: Ethos, Pathos, and Logos in Historic Speeches",
    "title_vi": "Các Phương Thức Thuyết Phục: Ethos, Pathos và Logos Trong Các Bài Diễn Văn Lịch Sử",
    "content_en": "Classical rhetoric identifies three fundamental appeals that empower persuasive communication: ethos, pathos, and logos. Aristotle established that an effective argument must integrate all three dimensions to persuade an audience completely. Ethos establishes the speaker's personal credibility, scholarly integrity, and ethical authority. Pathos engages the audience's emotions, values, and empathy through vivid storytelling and sensory descriptions. Logos provides the logical foundation, employing rigorous evidence, deductive reasoning, and factual statistics. When historical orators deliver addresses, they weave these appeals together using rhythmic repetition and dynamic cadence. For instance, pairing a compelling moral narrative with verifiable data creates an irresistible persuasive impact. Understanding rhetorical mechanisms equips students to deliver speeches that inspire conviction while critically evaluating political and commercial persuasion in modern society.",
    "glossary": [
      { "word": "ethos", "definition_en": "The character, moral authority, and established credibility of a speaker", "definition_vi": "tư cách, uy tín đạo đức và độ tin cậy đã được xác lập của một diễn giả" },
      { "word": "pathos", "definition_en": "Rhetorical engagement with audience emotional sympathies and values", "definition_vi": "sự kết nối tu từ với tình cảm, sự đồng cảm và giá trị của khán giả" },
      { "word": "logos", "definition_en": "Logical argumentation grounded in empirical data, deductive reasoning, and factual evidence", "definition_vi": "lập luận logic dựa trên dữ liệu thực nghiệm, suy diễn và bằng chứng thực tế" },
      { "word": "cadence", "definition_en": "The rhythmic vocal modulation and inflection of spoken delivery", "definition_vi": "sự điều biến giọng nói và ngữ điệu nhịp nhàng trong diễn thuyết" },
      { "word": "repetition", "definition_en": "The strategic reiteration of key phrases to anchor memorability and emotional weight", "definition_vi": "sự lặp lại chiến lược các cụm từ chính để tạo sự ghi nhớ và sức nặng cảm xúc" }
    ],
    "check_questions": [
      { "id": 1, "question_en": "Which rhetorical appeal relies on verifiable empirical data and logical deduction?", "options": ["Logos", "Pathos", "Ethos"], "answer": "Logos" },
      { "id": 2, "question_en": "How does an orator establish personal ethos before an audience?", "options": ["By demonstrating integrity, deep expertise, and respect for listeners", "By speaking as loudly as possible through a megaphone", "By telling completely invented stories without sources"], "answer": "By demonstrating integrity, deep expertise, and respect for listeners" },
      { "id": 3, "question_en": "Why do great speeches combine both emotional pathos and factual logos?", "options": ["Because emotion inspires motivation while logical facts satisfy intellectual scrutiny", "Because speakers must fill at least two hours of time", "Because rules forbid using only one appeal"], "answer": "Because emotion inspires motivation while logical facts satisfy intellectual scrutiny" }
    ],
    "critical_thinking": {
      "question_en": "Why can an argument that relies exclusively on pathos become emotionally manipulative or deceptive?",
      "hint_en": "Without the objective grounding of logos and the honest credibility of ethos, raw emotional appeals can mislead listeners into accepting unsound conclusions."
    }
  },
  "shadowing_sentences": [
    { "id": 1, "text": "Classical rhetoric integrates ethos, pathos, and logos into an effective persuasive speech.", "en": "Classical rhetoric integrates ethos, pathos, and logos into an effective persuasive speech.", "vi": "Thuật tu từ cổ điển tích hợp ethos, pathos và logos thành một bài phát biểu thuyết phục hiệu quả.", "ipa": "/ˈklæsɪkəl ˈretərɪk ˈɪntɪɡreɪts ˈiːθɑːs ˈpeɪθɑːs ænd ˈloʊɡɑːs ˈɪntuː ən ɪˈfektɪv pərˈsweɪsɪv spiːtʃ/", "words": ["Classical", "rhetoric", "integrates", "ethos", "pathos", "and", "logos", "into", "an", "effective", "persuasive", "speech"] },
    { "id": 2, "text": "Ethos establishes personal credibility through academic integrity and ethical leadership.", "en": "Ethos establishes personal credibility through academic integrity and ethical leadership.", "vi": "Ethos thiết lập uy tín cá nhân thông qua sự liêm chính học thuật và năng lực lãnh đạo đạo đức.", "ipa": "/ˈiːθɑːs ɪˈstæblɪʃɪz ˈpɜːrsənəl ˌkredəˈbɪləti θruː ˌækəˈdemɪk ɪnˈteɡrəti ænd ˈeθɪkəl ˈliːdərʃɪp/", "words": ["Ethos", "establishes", "personal", "credibility", "through", "academic", "integrity", "and", "ethical", "leadership"] },
    { "id": 3, "text": "Pathos touches human emotion through vivid personal stories that evoke genuine empathy.", "en": "Pathos touches human emotion through vivid personal stories that evoke genuine empathy.", "vi": "Pathos chạm vào cảm xúc con người thông qua những câu chuyện cá nhân sinh động gợi lên sự đồng cảm chân thành.", "ipa": "/ˈpeɪθɑːs ˈtʌtʃɪz ˈhjuːmən ɪˈmoʊʃən θruː ˈvɪvɪd ˈpɜːrsənəl ˈstɔːriz ðæt ɪˈvoʊk ˈdʒenjuɪn ˈempəθi/", "words": ["Pathos", "touches", "human", "emotion", "through", "vivid", "personal", "stories", "that", "evoke", "genuine", "empathy"] },
    { "id": 4, "text": "Logos provides the solid logical foundation using verifiable statistical evidence.", "en": "Logos provides the solid logical foundation using verifiable statistical evidence.", "vi": "Logos cung cấp nền tảng logic vững chắc bằng cách sử dụng bằng chứng thống kê có thể kiểm chứng.", "ipa": "/ˈloʊɡɑːs prəˈvaɪdz ðə ˈsɑːlɪd ˈlɑːdʒɪkəl faʊnˈdeɪʃən ˈjuːzɪŋ ˈverɪfaɪəbəl stəˈtɪstɪkəl ˈevɪdəns/", "words": ["Logos", "provides", "the", "solid", "logical", "foundation", "using", "verifiable", "statistical", "evidence"] },
    { "id": 5, "text": "Not only does it inform the mind, but it also inspires the heart.", "en": "Not only does it inform the mind, but it also inspires the heart.", "vi": "Nó không chỉ cung cấp thông tin cho tâm trí, mà còn truyền cảm hứng cho trái tim.", "ipa": "/nɑːt ˈoʊnli dʌz ɪt ɪnˈfɔːrm ðə maɪnd bʌt ɪt ˈɔːlsoʊ ɪnˈspaɪərz ðə hɑːrt/", "words": ["Not", "only", "does", "it", "inform", "the", "mind", "but", "it", "also", "inspires", "the", "heart"] },
    { "id": 6, "text": "Varying your vocal cadence and rhythm commands the attention of every listener.", "en": "Varying your vocal cadence and rhythm commands the attention of every listener.", "vi": "Thay đổi âm điệu và nhịp điệu giọng nói sẽ thu hút sự chú ý của mọi người nghe.", "ipa": "/ˈveriɪŋ jʊər ˈvoʊkəl ˈkeɪdəns ænd ˈrɪðəm kəˈmændz ði əˈtenʃən əv ˈevri ˈlɪsənər/", "words": ["Varying", "your", "vocal", "cadence", "and", "rhythm", "commands", "the", "attention", "of", "every", "listener"] },
    { "id": 7, "text": "Deliberate repetition of key phrases reinforces the core message of the address.", "en": "Deliberate repetition of key phrases reinforces the core message of the address.", "vi": "Việc lặp lại có chủ đích các cụm từ then chốt củng cố thông điệp cốt lõi của bài phát biểu.", "ipa": "/dɪˈlɪbərət ˌrepəˈtɪʃən əv kiː ˈfreɪzɪz ˌriːɪnˈfɔːrsɪz ðə kɔːr ˈmesɪdʒ əv ði əˈdres/", "words": ["Deliberate", "repetition", "of", "key", "phrases", "reinforces", "the", "core", "message", "of", "the", "address"] },
    { "id": 8, "text": "Mastering persuasive techniques enables young citizens to advocate for positive community change.", "en": "Mastering persuasive techniques enables young citizens to advocate for positive community change.", "vi": "Làm chủ các kỹ thuật thuyết phục cho phép các công dân trẻ vận động cho sự thay đổi tích cực của cộng đồng.", "ipa": "/ˈmæstərɪŋ pərˈsweɪsɪv tekˈniːks ɪˈneɪbəlz jʌŋ ˈsɪtɪzənz tuː ˈædvəkeɪt fɔːr ˈpɑːzətɪv kəˈmjuːnəti tʃeɪndʒ/", "words": ["Mastering", "persuasive", "techniques", "enables", "young", "citizens", "to", "advocate", "for", "positive", "community", "change"] }
  ],
  "story_scenes": [
    { "id": 1, "scene_id": "scene_1", "scene_number": 1, "title_en": "Analyzing Aristotle's Triad", "title_vi": "Phân Tích Bộ Ba Của Aristotle", "description_en": "Marcus and Olivia examine classical Greek rhetoric manuscripts illustrating the balance of ethos, pathos, and logos.", "description": "Marcus and Olivia examine classical Greek rhetoric manuscripts illustrating the balance of ethos, pathos, and logos.", "image_url": "/images/week131/webtoon_scene_1.png", "audio_url": "/audio/week131/scene_1.mp3" },
    { "id": 2, "scene_id": "scene_2", "scene_number": 2, "title_en": "Crafting the Emotional Hook", "title_vi": "Tạo Điểm Móc Cảm Xúc", "description_en": "Olivia writes a touching narrative about a young student feeling isolated without real-world friendships.", "description": "Olivia writes a touching narrative about a young student feeling isolated without real-world friendships.", "image_url": "/images/week131/webtoon_scene_2.png", "audio_url": "/audio/week131/scene_2.mp3" },
    { "id": 3, "scene_id": "scene_3", "scene_number": 3, "title_en": "Bolstering Arguments with Solid Data", "title_vi": "Củng Cố Lập Luận Bằng Dữ Liệu Chắc Chắn", "description_en": "Marcus integrates pediatric research statistics into the speech, ensuring the emotional appeal has logical proof.", "description": "Marcus integrates pediatric research statistics into the speech, ensuring the emotional appeal has logical proof.", "image_url": "/images/week131/webtoon_scene_3.png", "audio_url": "/audio/week131/scene_3.mp3" },
    { "id": 4, "scene_id": "scene_4", "scene_number": 4, "title_en": "Practicing Dynamic Vocal Cadence", "title_vi": "Luyện Tập Âm Điệu Giọng Nói Sinh Động", "description_en": "They practice the inverted structure 'Not only does it protect health, but it also inspires learning' before the team.", "description": "They practice the inverted structure 'Not only does it protect health, but it also inspires learning' before the team.", "image_url": "/images/week131/webtoon_scene_4.png", "audio_url": "/audio/week131/scene_4.mp3" },
    { "id": 5, "scene_id": "scene_5", "scene_number": 5, "title_en": "The Standing Ovation", "title_vi": "Tràng Pháo Tay Đứng Dậy", "description_en": "The civic assembly rises in applause as Marcus and Olivia conclude their persuasive address with moral conviction.", "description": "The civic assembly rises in applause as Marcus and Olivia conclude their persuasive address with moral conviction.", "image_url": "/images/week131/webtoon_scene_5.png", "audio_url": "/audio/week131/scene_5.mp3" }
  ],
  "writing_data": {
    "title": "Applying Rhetorical Appeals in a Persuasive Public Address",
    "prompt_en": "Look at the four panels. Write a persuasive speech paragraph advocating for digital wellness boundaries. Combine ethical credibility (ethos), emotional resonance (pathos), and logical data (logos). Use rhetorical triads or inverted emphasis ('not only does it...'). Write 20 or more words.",
    "prompt_vi": "Nhìn vào 4 khung tranh. Viết một đoạn văn bài phát biểu thuyết phục vận động cho các ranh giới sống khỏe kỹ thuật số. Kết hợp uy tín đạo đức (ethos), cảm xúc cộng hưởng (pathos) và dữ liệu logic (logos). Sử dụng bộ ba tu từ hoặc nhấn mạnh đảo ngữ ('not only does it...'). Viết từ 20 từ trở lên.",
    "min_sentences": 3,
    "min_words": 20,
    "max_words": 90,
    "model_sentence": "To persuade an audience effectively, an orator must balance ethos, pathos, and logos. Drawing on verified pediatric studies establishes scientific ethos, while personal stories of student isolation evoke profound pathos. Not only does digital moderation protect nocturnal sleep cycles, but it also revitalizes deep classroom focus. By uniting empirical logic with heartfelt emotion, speakers inspire authentic commitment to community wellbeing.",
    "word_bank": ["persuasion", "ethos", "pathos", "logos", "credibility", "rhetorical", "emotion", "logic", "convince", "cadence"],
    "sentence_frames": [
      "An effective speech combines personal ethos with logical ___.",
      "Vivid stories evoke emotional ___ and touch the listeners' hearts.",
      "Not only does balanced screen time protect sleep, but it also improves ___ focus.",
      "Ultimately, uniting emotion and evidence creates irresistible ___ power."
    ],
    "panels": [
      {
        "panel_id": "panel_1",
        "title_en": "Panel 1: Establishing Speaker Credibility (Ethos)",
        "title_vi": "Khung 1: Thiết Lập Uy Tín Diễn Giả (Ethos)",
        "image_url": "/images/week131/writing_panel_1.png",
        "image_prompt": "A student speaker standing before an academic seal presenting peer-reviewed medical credentials.",
        "caption": "Ethos establishes trust through research integrity and ethical leadership.",
        "sentence_frame": "The speaker [establishes moral and scholarly credibility] by [citing verified scientific research].",
        "pills": ["establishes moral and scholarly credibility", "citing verified scientific research", "demonstrates personal integrity", "builds audience trust"],
        "connectors": ["First,", "To begin with,", "By establishing ethos,"]
      },
      {
        "panel_id": "panel_2",
        "title_en": "Panel 2: Evoking Emotional Empathy (Pathos)",
        "title_vi": "Khung 2: Khơi Gợi Sự Đồng Cảm Cảm Xúc (Pathos)",
        "image_url": "/images/week131/writing_panel_2.png",
        "image_prompt": "An audience listening with touched, thoughtful expressions as a story of child wellness is told.",
        "caption": "Pathos touches human emotion through compelling personal stories.",
        "sentence_frame": "Vivid storytelling [evokes genuine emotional empathy] across [the assembled listeners].",
        "pills": ["evokes genuine emotional empathy", "the assembled listeners", "touches human hearts", "awakens moral concern"],
        "connectors": ["Furthermore,", "Next,", "Through heartfelt pathos,"]
      },
      {
        "panel_id": "panel_3",
        "title_en": "Panel 3: Anchoring Logic and Data (Logos)",
        "title_vi": "Khung 3: Cố Định Logic và Dữ Liệu (Logos)",
        "image_url": "/images/week131/writing_panel_3.png",
        "image_prompt": "A digital screen displaying clear bar charts correlating sleep hours with academic performance.",
        "caption": "Logos satisfies rational scrutiny with verifiable statistical proof.",
        "sentence_frame": "Empirical data [provides undeniable logical proof] to [substantiate the central thesis].",
        "pills": ["provides undeniable logical proof", "substantiate the central thesis", "statistical bar charts", "rigorous reasoning"],
        "connectors": ["In addition,", "Providing logos,", "Empirical data reveals that"]
      },
      {
        "panel_id": "panel_4",
        "title_en": "Panel 4: Inspiring Collective Action",
        "title_vi": "Khung 4: Truyền Cảm Hứng Cho Hành Động Tập Thể",
        "image_url": "/images/week131/writing_panel_4.png",
        "image_prompt": "An auditorium of diverse citizens raising hands in unanimous support of a community wellness agreement.",
        "caption": "Uniting rhetoric appeals moves communities to enact positive changes.",
        "sentence_frame": "Harmonizing these appeals [inspires the community to embrace] a [healthier digital future].",
        "pills": ["inspires the community to embrace", "healthier digital future", "unanimous civic commitment", "authentic persuasion"],
        "connectors": ["Ultimately,", "In conclusion,", "Therefore,"]
      }
    ],
    "ladder_stages": [
      {
        "badge_label": "MODEL",
        "title": "Stage 1: Building Speaker Credibility",
        "image_url": "/images/week131/writing_panel_1.png",
        "caption": "Ethos establishes trust through research integrity and ethical leadership.",
        "frame_L1": "Speakers establish credibility by citing medical facts. Trust helps the audience listen carefully.",
        "connectors": ["First,", "To establish ethos,", "Initially,"],
        "sentence_hint": "Write 2 sentences explaining how ethos creates trust.",
        "ordered_chips": ["Speakers build credibility", "by citing verified research", "to establish trust", "with their audience."],
        "pills": ["build credibility", "verified research", "establish trust", "thoughtful listeners"],
        "sentence_frame": "The speaker [establishes moral and scholarly credibility] by [citing verified scientific research]."
      },
      {
        "badge_label": "BUILD",
        "title": "Stage 2: Engaging Audience Empathy",
        "image_url": "/images/week131/writing_panel_2.png",
        "caption": "Pathos touches human emotion through compelling personal stories.",
        "frame_L1": "Personal stories touch listeners' hearts. Pathos makes dry data feel urgent and meaningful.",
        "connectors": ["Furthermore,", "Through pathos,", "In addition,"],
        "sentence_hint": "Write 2 sentences describing how emotional storytelling inspires listeners.",
        "pills": ["personal stories", "touch listeners hearts", "pathos makes data urgent", "meaningful message"],
        "sentence_frame": "Vivid storytelling [evokes genuine emotional empathy] across [the assembled listeners]."
      },
      {
        "badge_label": "WRITE",
        "title": "Stage 3: Providing Verifiable Logic",
        "image_url": "/images/week131/writing_panel_3.png",
        "caption": "Logos satisfies rational scrutiny with verifiable statistical proof.",
        "frame_L1": "Statistical charts prove the point logically. Logos ensures that listeners cannot dismiss the argument.",
        "connectors": ["Providing logos,", "In addition,", "Logically,"],
        "sentence_hint": "Write 2 sentences explaining why data and reasoning complete the appeal.",
        "pills": ["statistical charts", "proves the point logically", "satisfies rational inquiry", "solid evidence"],
        "sentence_frame": "Empirical data [provides undeniable logical proof] to [substantiate the central thesis]."
      },
      {
        "badge_label": "EXPAND",
        "title": "Stage 4: Inspiring Action with Cadence",
        "image_url": "/images/week131/writing_panel_4.png",
        "caption": "Uniting rhetoric appeals moves communities to enact positive changes.",
        "frame_L1": "Not only does rhetoric inform the mind, but it also inspires action. Together, these appeals persuade everyone.",
        "connectors": ["Ultimately,", "In conclusion,", "Consequently,"],
        "sentence_hint": "Write 2 sentences using 'Not only does it...' to summarize the full impact.",
        "pills": ["inform the mind", "inspire positive action", "persuasive rhetoric", "community change"],
        "sentence_frame": "Harmonizing these appeals [inspires the community to embrace] a [healthier digital future]."
      }
    ]
  },
  "speaking_data": {
    "talkshow_prompt": {
      "topic": "The Power of Classical Rhetoric in Contemporary Speeches",
      "question": "Marcus, how does balancing ethos, pathos, and logos prevent a speech from being either dry or manipulative?",
      "model_response": "A speech with only logos is an emotionless textbook that puts people to sleep, while a speech with only pathos can turn into manipulative propaganda! But when an orator roots their character in honest ethos, supports their claims with undeniable logos, and brings those facts alive with human pathos, true persuasion occurs! The audience feels the emotional urgency while their rational minds confirm every fact!"
    },
    "info_exchange_cards": {
      "table_a": {
        "title": "Marcus's Rhetorical Analysis Workshop",
        "subtitle": "Candidate's Question Card (Ask Examiner)",
        "person": "Marcus",
        "fields": [
          { "id": "field_a1", "cue_prompt": "where / classical rhetoric seminar held?", "cue_word": "where", "is_missing": True, "acceptable_questions": ["Where was the classical rhetoric seminar held?", "Where was the seminar held?", "Where did Marcus study rhetoric?"], "nova_reply": "The seminar was held in the university humanities symposium room." },
          { "id": "field_a2", "cue_prompt": "what / three classical appeals studied?", "cue_word": "what", "is_missing": True, "acceptable_questions": ["What are the three classical appeals studied?", "What appeals did they study?", "What is the rhetorical triad?"], "nova_reply": "Ethos, pathos, and logos as formulated by Aristotle." },
          { "id": "field_a3", "cue_prompt": "how many / historic speeches analyzed by students?", "cue_word": "how many", "is_missing": True, "acceptable_questions": ["How many historic speeches were analyzed by students?", "How many speeches did they analyze?", "What was the number of speeches studied?"], "nova_reply": "Students transcribed and annotated twelve landmark historic addresses." },
          { "id": "field_a4", "cue_prompt": "who / delivered the guest lecture on vocal cadence?", "cue_word": "who", "is_missing": True, "acceptable_questions": ["Who delivered the guest lecture on vocal cadence?", "Who was the guest speaker?", "Who gave the cadence lecture?"], "nova_reply": "Professor Julian Vance, director of the national oratory institute." },
          { "id": "field_a5", "cue_prompt": "why / inverted sentence structures effective?", "cue_word": "why", "is_missing": True, "acceptable_questions": ["Why are inverted sentence structures effective?", "Why use structures like 'not only does it'?", "Why use inversion in speeches?"], "nova_reply": "Because they create dramatic cadence and emphasize the secondary benefit." }
        ]
      },
      "table_b": {
        "title": "Olivia's Speech Rehearsal Notes",
        "subtitle": "Information Card (Answer Examiner's Questions)",
        "person": "Olivia",
        "fields": [
          { "id": "field_b1", "cue_prompt": "where / practice her keynote speech?", "cue_word": "where", "value": "In the acoustic rehearsal theater of the community center.", "nova_question": "Where does Olivia practice her keynote speech?", "acceptable_answers": ["In the acoustic rehearsal theater of the community center.", "At the community center theater.", "In the acoustic rehearsal theater."] },
          { "id": "field_b2", "cue_prompt": "what / core metaphor used in the introduction?", "cue_word": "what", "value": "Comparing unmoderated notifications to continuous mental turbulence.", "nova_question": "What is the core metaphor used in the introduction?", "acceptable_answers": ["Comparing unmoderated notifications to continuous mental turbulence.", "Continuous mental turbulence.", "Mental turbulence metaphor."] },
          { "id": "field_b3", "cue_prompt": "how / vocal pitch modulated during key phrases?", "cue_word": "how", "value": "By lowering pitch at line ends and pausing three full seconds.", "nova_question": "How does she modulate her vocal pitch during key phrases?", "acceptable_answers": ["By lowering pitch at line ends and pausing three full seconds.", "Lowering pitch and pausing.", "Pausing three seconds with lower pitch."] },
          { "id": "field_b4", "cue_prompt": "who / provided feedback on speech delivery?", "cue_word": "who", "value": "The school debate coach and senior civic communications officers.", "nova_question": "Who provided feedback on speech delivery?", "acceptable_answers": ["The school debate coach and senior civic communications officers.", "The debate coach and civic officers.", "Debate coach and communications officers."] },
          { "id": "field_b5", "cue_prompt": "why / balance pathos with statistical data?", "cue_word": "why", "value": "To ensure emotional stories are grounded in objective reality.", "nova_question": "Why must speakers balance pathos with statistical data?", "acceptable_answers": ["To ensure emotional stories are grounded in objective reality.", "To ground emotional stories in reality.", "To prevent emotional manipulation."] }
        ]
      }
    }
  },
  "cambridge_rw": {
    "part1_definitions": [
      { "id": 1, "text": "The rhetorical appeal based on logical proof, factual deduction, and evidence.", "target": "logos" },
      { "id": 2, "text": "The rhetorical appeal based on a speaker's moral authority and credibility.", "target": "ethos" },
      { "id": 3, "text": "The rhetorical appeal that engages human emotion, empathy, and sympathy.", "target": "pathos" },
      { "id": 4, "text": "The rhythmic sequence and modulation of voice in public speaking.", "target": "cadence" },
      { "id": 5, "text": "A figure of speech comparing two distinct items to explain an idea creatively.", "target": "metaphor" }
    ],
    "part2_dialogue": {
      "title": "Mastering Rhetorical Appeals for Public Addresses",
      "turns": [
        {
          "id": 1,
          "speaker": "Marcus",
          "prompt": "Olivia, how does an orator establish ethos when speaking to an unfamiliar audience?",
          "options": [
            "By demonstrating sound expertise, ethical character, and genuine respect for the listeners.",
            "By wearing a gold crown and shouting demands.",
            "By refusing to answer questions from the floor."
          ],
          "answer": "By demonstrating sound expertise, ethical character, and genuine respect for the listeners."
        },
        {
          "id": 2,
          "speaker": "Marcus",
          "prompt": "Why can an argument that relies exclusively on pathos become problematic?",
          "options": [
            "Without objective data and logical proof, raw emotional appeals can become manipulative.",
            "Because human beings have no emotions whatsoever.",
            "Because emotions make speeches too quiet to hear."
          ],
          "answer": "Without objective data and logical proof, raw emotional appeals can become manipulative."
        },
        {
          "id": 3,
          "speaker": "Marcus",
          "prompt": "How does logos satisfy the analytical minds in the auditorium?",
          "options": [
            "It provides verifiable statistics and sound deduction that withstand critical scrutiny.",
            "It plays soft guitar music in the background.",
            "It shortens every word to two letters."
          ],
          "answer": "It provides verifiable statistics and sound deduction that withstand critical scrutiny."
        },
        {
          "id": 4,
          "speaker": "Marcus",
          "prompt": "What effect does the inverted sentence 'Not only does it..., but it also...' create on stage?",
          "options": [
            "It establishes a memorable rhetorical cadence and places powerful vocal emphasis on key ideas.",
            "It causes the speaker to forget the next paragraph.",
            "It turns off the stage lighting automatically."
          ],
          "answer": "It establishes a memorable rhetorical cadence and places powerful vocal emphasis on key ideas."
        },
        {
          "id": 5,
          "speaker": "Marcus",
          "prompt": "How do historic orators conclude their most persuasive speeches?",
          "options": [
            "They synthesize ethos, pathos, and logos into a compelling moral call to action.",
            "They run out of the auditorium without saying goodbye.",
            "They apologize for wasting the audience's time."
          ],
          "answer": "They synthesize ethos, pathos, and logos into a compelling moral call to action."
        }
      ]
    },
    "part6_cloze": {
      "instructions": "Read the text about rhetorical appeals and choose the correct function word for each blank space.",
      "text_template": "Classical rhetoric teaches speakers how to persuade diverse audiences. To be truly effective, an orator must balance ethos, pathos, [1] logos. Establishing personal credibility convinces listeners [2] the speaker is trustworthy. In addition, sharing vivid stories engages emotion [3] a human level. Not only does structured logic provide proof, [4] it also satisfies intellectual scrutiny. By uniting these appeals, speakers inspire lasting commitment [5] positive community change.",
      "answers": { "1": "and", "2": "that", "3": "on", "4": "but", "5": "to" }
    }
  },
  "minigames": {
    "math_problems": [
      {
        "id": "w131_p1",
        "type": "part_whole",
        "title": "Measuring Time Devoted to Rhetorical Appeals",
        "question": "In a 300-second keynote address, Olivia spends 90 seconds establishing research credentials and ethos, and 210 seconds presenting logos and pathos. What is the total speech duration in seconds?",
        "storyContext": "Olivia reviews audio rehearsal logs to balance rhetorical components.",
        "modelData": {
          "bars": [
            { "label": "Ethos Introduction", "value": 90, "color": "#6366f1" },
            { "label": "Logos & Pathos Body", "value": 210, "color": "#10b981" }
          ],
          "total": 300,
          "unit": "seconds"
        },
        "target_answer": 300,
        "unit": "seconds",
        "steps": [
          "Take ethos duration: 90 seconds.",
          "Add logos and pathos duration: 210 seconds.",
          "90 + 210 = 300 seconds in total (5 full minutes)."
        ]
      },
      {
        "id": "w131_p2",
        "type": "comparison",
        "title": "Comparing Audience Engagement Rates",
        "question": "Before rhetoric coaching, 45 percent of audience members signed the digital wellness petition; after coaching in ethos, pathos, and logos, 82 percent signed. What was the percentage increase in sign-ups?",
        "storyContext": "Marcus analyzes petition conversion statistics on a comparative chart.",
        "modelData": {
          "bars": [
            { "label": "Post-Coaching Sign-ups", "value": 82, "color": "#0ea5e9" },
            { "label": "Pre-Coaching Baseline", "value": 45, "color": "#f59e0b" }
          ],
          "difference": 37,
          "unit": "percentage points"
        },
        "target_answer": 37,
        "unit": "percentage points",
        "steps": [
          "Start with post-coaching rate: 82%.",
          "Subtract pre-coaching rate: 45%.",
          "82 - 45 = 37 percentage point increase."
        ]
      }
    ],
    "action_lab_scenarios": [
      {
        "stage": 1,
        "title": "Balancing Aristotle's Rhetorical Triangle",
        "diagram_type": "rhetorical_triangle_equilibrium",
        "instruction": "Equilibrate ethos, pathos, and logos vectors to prevent speech bias or manipulation.",
        "items": [
          { "label": "Ethos Credibility Anchor", "target": "ethical_vertex" },
          { "label": "Pathos Emotional Empathy Vector", "target": "affective_vertex" },
          { "label": "Logos Empirical Evidence Base", "target": "rational_vertex" }
        ]
      },
      {
        "stage": 2,
        "title": "Modulating Vocal Cadence & Pitch Contours",
        "diagram_type": "acoustic_speech_cadence_envelope",
        "instruction": "Structure pitch shifts, rhetorical emphasis, and three-second pauses across key sentences.",
        "items": [
          { "label": "Inverted Sentence Stress Peak", "target": "pitch_inflection" },
          { "label": "Deliberate Three-Second Silence", "target": "rhetorical_pause" },
          { "label": "Resonant Downward Cadence", "target": "resolution_cadence" }
        ]
      },
      {
        "stage": 3,
        "title": "Synthesizing Persuasive Call to Action",
        "diagram_type": "civic_advocacy_conversion_funnel",
        "instruction": "Channel intellectual conviction into concrete community resolutions and petitions.",
        "items": [
          { "label": "Empirical Problem Formulation", "target": "cognitive_conviction" },
          { "label": "Heartfelt Empathy Awakening", "target": "moral_motivation" },
          { "label": "Unanimous Civic Commitment", "target": "action_commitment" }
        ]
      }
    ],
    "grammar_drills": [
      { "sentence": "Not only does digital moderation protect sleep, but it also improves attention.", "options": ["does digital moderation protect", "digital moderation protects", "did digital moderation protected"], "answer": "does digital moderation protect", "explanation": "After the negative or limiting expression 'Not only...', invert the auxiliary verb and subject: 'does digital moderation protect'." },
      { "sentence": "By uniting emotion and logic, the speaker convinced skeptical listeners.", "options": ["convinced", "convince", "convincing"], "answer": "convinced", "explanation": "Use past simple 'convinced' to describe completed persuasive action." },
      { "sentence": "The speech was both articulate and deeply moving to the audience.", "options": ["both", "either", "neither"], "answer": "both", "explanation": "Use 'both... and...' to join two parallel positive adjectives." },
      { "sentence": "Varying vocal cadence reinforces the emotional weight of key phrases.", "options": ["reinforces", "reinforce", "reinforcing"], "answer": "reinforces", "explanation": "The singular gerund subject 'Varying vocal cadence' takes the singular verb 'reinforces'." },
      { "sentence": "Ethos establishes personal credibility through consistent moral integrity.", "options": ["through", "with of", "across to"], "answer": "through", "explanation": "Use 'through' to denote the means or agency by which credibility is established." }
    ]
  }
}

with open("scripts/specs_w130.mjs", "w", encoding="utf-8") as f:
    f.write(render_js(w130, "w130"))
print("✅ Generated scripts/specs_w130.mjs (Opinion Project 3: Comparing Global Approaches)")

with open("scripts/specs_w131.mjs", "w", encoding="utf-8") as f:
    f.write(render_js(w131, "w131"))
print("✅ Generated scripts/specs_w131.mjs (Opinion Project 3: Persuasive Techniques)")
