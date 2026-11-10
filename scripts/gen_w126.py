#!/usr/bin/env python3
"""
Generate scripts/specs_w126.mjs
Week 126: From Essay to Speech (Oral Rhetoric, Cue Cards & Signposting)
Stage 2: B2 First / Cambridge Lower Secondary
Theme strictly matches blueprint.json: "From Essay to Speech"
"""

import json

def render_js(spec_obj, export_name):
    js_content = json.dumps(spec_obj, indent=2, ensure_ascii=False)
    return f"/**\n * Auto-generated Spec for Week {spec_obj['week']}: {spec_obj['theme']}\n * Strict Blueprint Fidelity\n */\n\nexport const {export_name} = {js_content};\n\nexport default {export_name};\n"

w126 = {
  "week": 126,
  "theme": "From Essay to Speech",
  "title_en": "From Essay to Speech",
  "title_vi": "Chuyển từ Bài viết sang Bài nói",
  "cefr_level": "B2 First",
  "grammar_focus": "Oral signposting markers ('Moving on to...', 'Turning our attention to...', 'Having examined...') and rhetorical pauses.",
  "vocab_list": [
    { "id": 1, "word": "signpost", "pos": "v", "ipa": "/ˈsaɪnpoʊst/", "definition_en": "To provide clear verbal indicators that guide an audience through a presentation", "definition_vi": "dùng lời chỉ dẫn hướng / định hướng người nghe", "example_en": "Skilled speakers signpost their major points so listeners follow the presentation structure.", "example_vi": "Các diễn giả lành nghề định hướng các luận điểm chính để người nghe theo kịp cấu trúc bài thuyết trình." },
    { "id": 2, "word": "cue", "pos": "n", "ipa": "/kjuː/", "definition_en": "A brief prompt or reminder note used to guide a speaker on stage", "definition_vi": "thẻ gợi ý / lời gợi ý", "example_en": "She wrote bullet points on pocket-sized cue cards to remember key transition phrases.", "example_vi": "Cô ấy viết các gạch đầu dòng lên thẻ gợi ý bỏ túi để ghi nhớ các cụm từ chuyển ý quan trọng." },
    { "id": 3, "word": "transition", "pos": "n", "ipa": "/trænˈzɪʃən/", "definition_en": "The process or a period of changing smoothly from one topic to another", "definition_vi": "sự chuyển tiếp / bước chuyển", "example_en": "The transition between the historical context and the current data was remarkably smooth.", "example_vi": "Bước chuyển giữa bối cảnh lịch sử và dữ liệu hiện tại diễn ra rất mượt mà." },
    { "id": 4, "word": "rhetoric", "pos": "n", "ipa": "/ˈretərɪk/", "definition_en": "The art of effective or persuasive speaking or writing", "definition_vi": "nghệ thuật tu từ / tài hùng biện", "example_en": "Classical rhetoric teaches speakers how to balance logical evidence with vocal emotion.", "example_vi": "Thuật tu từ cổ điển dạy người nói cách cân bằng bằng chứng logic với cảm xúc giọng nói." },
    { "id": 5, "word": "delivery", "pos": "n", "ipa": "/dɪˈlɪvəri/", "definition_en": "The manner or vocal style in which a speech or presentation is spoken", "definition_vi": "phong cách diễn thuyết / cách trình bày", "example_en": "His energetic delivery kept the auditorium audience engaged throughout the lecture.", "example_vi": "Phong cách diễn thuyết tràn đầy năng lượng của anh ấy giữ cho khán giả hội trường chăm chú suốt bài giảng." },
    { "id": 6, "word": "articulate", "pos": "v", "ipa": "/ɑːrˈtɪkjəleɪt/", "definition_en": "To express an idea or feeling fluently and coherently aloud", "definition_vi": "diễn đạt rõ ràng / phát âm rành mạch", "example_en": "Debaters must articulate complex ethical principles clearly under strict time limits.", "example_vi": "Các tranh biện viên phải diễn đạt rõ ràng các nguyên tắc đạo đức phức tạp trong giới hạn thời gian nghiêm ngặt." },
    { "id": 7, "word": "outline", "pos": "n", "ipa": "/ˈaʊtlaɪn/", "definition_en": "A general sketch or framework giving the essential features of a speech", "definition_vi": "dàn ý / đề cương", "example_en": "Prepare an outline before transferring full essay paragraphs onto speaker cards.", "example_vi": "Hãy chuẩn bị một dàn ý trước khi chuyển toàn bộ các đoạn văn thành thẻ ghi chú." },
    { "id": 8, "word": "audience", "pos": "n", "ipa": "/ˈɔːdiəns/", "definition_en": "The assembled spectators or listeners at a public performance or lecture", "definition_vi": "khán giả / thính giả", "example_en": "Maintain consistent eye contact with your audience across all sections of the hall.", "example_vi": "Hãy duy trì giao tiếp bằng mắt nhất quán với khán giả của bạn trên khắp các khu vực của khán phòng." },
    { "id": 9, "word": "gesture", "pos": "n", "ipa": "/ˈdʒestʃər/", "definition_en": "A movement of hands or body to emphasize an idea or feeling", "definition_vi": "cử chỉ / điệu bộ", "example_en": "Natural hand gestures reinforce verbal emphasis during oral presentations.", "example_vi": "Cử chỉ tay tự nhiên củng cố sự nhấn mạnh bằng lời nói trong các bài thuyết trình." },
    { "id": 10, "word": "pacing", "pos": "n", "ipa": "/ˈpeɪsɪŋ/", "definition_en": "The speed and tempo at which an oral speech or presentation progresses", "definition_vi": "nhịp độ nói / tốc độ nói", "example_en": "Deliberate pacing allows listeners sufficient time to absorb difficult technical ideas.", "example_vi": "Nhịp độ nói thận trọng cho phép người nghe có đủ thời gian để tiếp thu các ý tưởng kỹ thuật khó." },
    { "id": 11, "word": "emphasis", "pos": "n", "ipa": "/ˈemfəsɪs/", "definition_en": "Special importance, value, or vocal stress given to something", "definition_vi": "sự nhấn mạnh / trọng âm ngữ điệu", "example_en": "Place vocal emphasis on the contrastive connectors to highlight opposing viewpoints.", "example_vi": "Hãy đặt trọng âm ngữ điệu vào các từ nối tương phản để làm nổi bật các quan điểm đối lập." },
    { "id": 12, "word": "rehearse", "pos": "v", "ipa": "/rɪˈhɜːrs/", "definition_en": "To practice a speech or performance before presenting it publicly", "definition_vi": "luyện tập / diễn tập", "example_en": "Students rehearse their five-minute speeches with a timer to refine pacing.", "example_vi": "Học sinh luyện tập các bài nói năm phút của mình với đồng hồ bấm giờ để tinh chỉnh nhịp độ." },
    { "id": 13, "word": "intonation", "pos": "n", "ipa": "/ˌɪntəˈneɪʃən/", "definition_en": "The rise and fall of voice pitch when speaking", "definition_vi": "ngữ điệu giọng nói", "example_en": "Varying your intonation prevents speeches from sounding monotonous and flat.", "example_vi": "Thay đổi ngữ điệu của bạn giúp bài phát biểu không bị đơn điệu và bằng phẳng." },
    { "id": 14, "word": "verbal", "pos": "adj", "ipa": "/ˈvɜːrbəl/", "definition_en": "Relating to or in the form of words spoken aloud", "definition_vi": "bằng lời nói / thuộc về ngôn từ", "example_en": "Verbal cues such as 'furthermore' signal that an additional argument is coming.", "example_vi": "Các dấu hiệu bằng lời nói như 'hơn nữa' báo hiệu rằng một lập luận bổ sung sắp được đưa ra." },
    { "id": 15, "word": "projection", "pos": "n", "ipa": "/prəˈdʒekʃən/", "definition_en": "The strength and volume of speaking to be heard clearly at a distance", "definition_vi": "độ vang giọng / phóng âm", "example_en": "Good vocal projection ensures that listeners in the back row hear every syllable.", "example_vi": "Khả năng phóng âm tốt đảm bảo rằng người nghe ở hàng ghế sau cùng nghe rõ từng âm tiết." },
    { "id": 16, "word": "elocution", "pos": "n", "ipa": "/ˌeləˈkjuːʃən/", "definition_en": "The skill of clear and expressive speech, especially of pronunciation", "definition_vi": "nghệ thuật phát âm / thuật đọc diễn cảm", "example_en": "Elocution training develops crisp consonant pronunciation and breath support.", "example_vi": "Huấn luyện phát âm phát triển cách phát âm phụ âm rõ nét và khả năng làm chủ hơi thở." },
    { "id": 17, "word": "summary", "pos": "n", "ipa": "/ˈsʌməri/", "definition_en": "A brief statement reviewing the main points or findings of a speech", "definition_vi": "phần tóm tắt / tổng kết", "example_en": "Conclude your speech with a succinct summary of your three primary recommendations.", "example_vi": "Hãy kết thúc bài phát biểu của bạn bằng một bản tóm tắt ngắn gọn về ba khuyến nghị chính." },
    { "id": 18, "word": "structure", "pos": "n", "ipa": "/ˈstrʌktʃər/", "definition_en": "The organization or arrangement of components within a presentation", "definition_vi": "cấu trúc bài diễn thuyết", "example_en": "A three-part structure comprising introduction, body arguments, and conclusion clarifies intent.", "example_vi": "Cấu trúc ba phần gồm mở đầu, thân bài và kết luận làm sáng tỏ mục đích của bài thuyết trình." },
    { "id": 19, "word": "keynote", "pos": "n", "ipa": "/ˈkiːnoʊt/", "definition_en": "The central theme or opening address that sets the tone for an event", "definition_vi": "bài diễn văn chủ đề / ý tưởng cốt lõi", "example_en": "Her keynote speech emphasized the ethical responsibilities of scientific researchers.", "example_vi": "Bài diễn văn chủ đề của cô ấy nhấn mạnh trách nhiệm đạo đức của các nhà nghiên cứu khoa học." },
    { "id": 20, "word": "oratory", "pos": "n", "ipa": "/ˈɔːrətɔːri/", "definition_en": "The formal practice or study of eloquent public address", "definition_vi": "tài hùng biện / khoa diễn thuyết", "example_en": "The school debate tournament celebrates outstanding student oratory and civic dialogue.", "example_vi": "Giải đấu tranh biện của trường tôn vinh tài hùng biện xuất sắc của học sinh và sự đối thoại công dân." }
  ],
  "clil": {
    "title_en": "Oral Rhetoric: Transforming Essays into Compelling Speeches",
    "title_vi": "Thuật Hùng Biện: Chuyển Đổi Bài Luận Thành Bài Phát Biểu Lôi Cuốn",
    "content_en": "Transforming an academic essay into an engaging oral speech requires specific rhetorical techniques. Written essays rely on dense sentences, footnotes, and paragraph indentations that a listening audience cannot see. When delivering a presentation, speakers prepare concise cue cards containing keywords rather than reading full paragraphs verbatim. Effective public speakers use clear oral signposting markers, such as 'Moving on to our second finding' or 'Turning our attention to the global context.' These signposts guide listeners smoothly through complex arguments. In addition, speakers practice vocal pacing, deliberate pauses, and expressive intonation to emphasize crucial points. Mastering the transition from written text to spoken delivery ensures that research findings persuade and captivate diverse audiences.",
    "glossary": [
      { "word": "signpost", "definition_en": "To use explicit verbal phrases that indicate transitions between sections of a talk", "definition_vi": "dùng các cụm từ chỉ hướng rõ ràng để báo hiệu chuyển đoạn trong bài nói" },
      { "word": "cue", "definition_en": "A brief prompt or index card keyword that reminds a speaker of their next point", "definition_vi": "thẻ gợi ý chứa từ khóa nhắc nhở người nói về luận điểm tiếp theo" },
      { "word": "rhetoric", "definition_en": "The formal art of discourse and persuasive public communication", "definition_vi": "nghệ thuật diễn thuyết và truyền thông thuyết phục công chúng" },
      { "word": "pacing", "definition_en": "The deliberate modulation of speaking rate to enhance audience comprehension", "definition_vi": "sự điều chỉnh nhịp điệu nói có chủ đích để người nghe dễ hiểu" },
      { "word": "intonation", "definition_en": "Pitch variation across spoken sentences used to convey emphasis and attitude", "definition_vi": "sự biến thiên cao độ giọng nói dùng để biểu đạt sự nhấn mạnh và thái độ" }
    ],
    "check_questions": [
      { "id": 1, "question_en": "Why should speakers avoid reading full essay paragraphs verbatim from a sheet?", "options": ["Because audiences cannot see paragraph formatting and reading aloud sounds monotone", "Because written essays are always shorter than speeches", "Because reading aloud damages vocal cords"], "answer": "Because audiences cannot see paragraph formatting and reading aloud sounds monotone" },
      { "id": 2, "question_en": "What is the primary function of oral signposting markers like 'Moving on to...'?", "options": ["They guide listeners clearly through changes in topic and argument structure", "They tell the audience that the speech is immediately finished", "They replace the need for any research evidence"], "answer": "They guide listeners clearly through changes in topic and argument structure" },
      { "id": 3, "question_en": "What do effective speakers write on pocket cue cards?", "options": ["Concise keywords and transitional prompts", "Full essays word-for-word in tiny font", "Doodles and unrelated drawings"], "answer": "Concise keywords and transitional prompts" }
    ],
    "critical_thinking": {
      "question_en": "How do vocal pauses and signposting phrases work together to help listeners remember key ideas?",
      "hint_en": "Signposts warn the audience of a new concept, while deliberate pauses give listeners time to process and file the information mentally."
    }
  },
  "shadowing_sentences": [
    { "id": 1, "text": "Transforming a written essay into an oral speech requires strategic signposting phrases.", "en": "Transforming a written essay into an oral speech requires strategic signposting phrases.", "vi": "Chuyển một bài luận viết thành bài nói đòi hỏi các cụm từ định hướng chiến lược.", "ipa": "/trænsˈfɔːrmɪŋ ə ˈrɪtn ˈeseɪ ˈɪntuː ən ˈɔːrəl spiːtʃ rɪˈkwaɪərz strəˈtiːdʒɪk ˈsaɪnpoʊstɪŋ ˈfreɪzɪz/", "words": ["Transforming", "a", "written", "essay", "into", "an", "oral", "speech", "requires", "strategic", "signposting", "phrases"] },
    { "id": 2, "text": "Speakers write bullet point keywords on portable cue cards instead of full paragraphs.", "en": "Speakers write bullet point keywords on portable cue cards instead of full paragraphs.", "vi": "Các diễn giả viết từ khóa dạng gạch đầu dòng lên thẻ gợi ý thay vì đọc cả đoạn văn.", "ipa": "/ˈspiːkərz raɪt ˈbʊlɪt pɔɪnt ˈkiːwɜːrdz ɑːn ˈpɔːrtəbəl kjuː kɑːrdz ɪnˈsted əv fʊl ˈpærəɡræfs/", "words": ["Speakers", "write", "bullet", "point", "keywords", "on", "portable", "cue", "cards", "instead", "of", "full", "paragraphs"] },
    { "id": 3, "text": "Moving on to our second finding, let us examine the statistical survey results.", "en": "Moving on to our second finding, let us examine the statistical survey results.", "vi": "Chuyển sang phát hiện thứ hai, chúng ta hãy xem xét kết quả khảo sát thống kê.", "ipa": "/ˈmuːvɪŋ ɑːn tuː ˈaʊər ˈsekənd ˈfaɪndɪŋ let ʌs ɪɡˈzæmɪn ðə stəˈtɪstɪkəl ˈsɜːrveɪ rɪˈzʌlts/", "words": ["Moving", "on", "to", "our", "second", "finding", "let", "us", "examine", "the", "statistical", "survey", "results"] },
    { "id": 4, "text": "Deliberate pacing and pauses give the audience time to absorb complex arguments.", "en": "Deliberate pacing and pauses give the audience time to absorb complex arguments.", "vi": "Nhịp độ nói cẩn trọng và những khoảng dừng giúp khán giả có thời gian tiếp thu các lập luận phức tạp.", "ipa": "/dɪˈlɪbərət ˈpeɪsɪŋ ænd ˈpɔːzɪz ɡɪv ði ˈɔːdiəns taɪm tuː əbˈzɔːrb ˈkɑːmpleks ˈɑːrɡjəmənts/", "words": ["Deliberate", "pacing", "and", "pauses", "give", "the", "audience", "time", "to", "absorb", "complex", "arguments"] },
    { "id": 5, "text": "Varying your vocal intonation keeps listeners engaged throughout the presentation.", "en": "Varying your vocal intonation keeps listeners engaged throughout the presentation.", "vi": "Thay đổi ngữ điệu giọng nói giúp khán giả luôn tập trung trong suốt bài thuyết trình.", "ipa": "/ˈveriɪŋ jʊər ˈvoʊkəl ˌɪntəˈneɪʃən kiːps ˈlɪsənərz ɪnˈɡeɪdʒd θruːˈaʊt ðə ˌpriːzenˈteɪʃən/", "words": ["Varying", "your", "vocal", "intonation", "keeps", "listeners", "engaged", "throughout", "the", "presentation"] },
    { "id": 6, "text": "Natural hand gestures and steady eye contact strengthen speaker credibility on stage.", "en": "Natural hand gestures and steady eye contact strengthen speaker credibility on stage.", "vi": "Cử chỉ tay tự nhiên và ánh mắt tự tin củng cố uy tín của diễn giả trên sân khấu.", "ipa": "/ˈnætʃərəl hænd ˈdʒestʃərz ænd ˈstedi aɪ ˈkɑːntækt ˈstreŋθən ˈspiːkər ˌkredəˈbɪləti ɑːn steɪdʒ/", "words": ["Natural", "hand", "gestures", "and", "steady", "eye", "contact", "strengthen", "speaker", "credibility", "on", "stage"] },
    { "id": 7, "text": "Rehearsing aloud with a timer ensures that each transition fits the schedule.", "en": "Rehearsing aloud with a timer ensures that each transition fits the schedule.", "vi": "Luyện tập nói to với đồng hồ bấm giờ đảm bảo mỗi bước chuyển đều khớp lịch trình.", "ipa": "/rɪˈhɜːrsɪŋ əˈlaʊd wɪð ə ˈtaɪmər ɪnˈʃʊrz ðæt iːtʃ trænˈzɪʃən fɪts ðə ˈskedʒuːl/", "words": ["Rehearsing", "aloud", "with", "a", "timer", "ensures", "that", "each", "transition", "fits", "the", "schedule"] },
    { "id": 8, "text": "An effective summary reviews key insights without repeating the full text.", "en": "An effective summary reviews key insights without repeating the full text.", "vi": "Một phần tổng kết hiệu quả ôn lại các điểm cốt lõi mà không cần lặp lại toàn văn.", "ipa": "/ən ɪˈfektɪv ˈsʌməri rɪˈvjuːz kiː ˈɪnsaɪts wɪðˈaʊt rɪˈpiːtɪŋ ðə fʊl tekst/", "words": ["An", "effective", "summary", "reviews", "key", "insights", "without", "repeating", "the", "full", "text"] }
  ],
  "story_scenes": [
    { "id": 1, "scene_id": "scene_1", "scene_number": 1, "title_en": "Facing the Written Essay Draft", "title_vi": "Đối Mặt Với Bản Thảo Bài Luận Viết", "description_en": "Lucas reviews his ten-page academic research paper and wonders how to deliver it aloud in seven minutes.", "description": "Lucas reviews his ten-page academic research paper and wonders how to deliver it aloud in seven minutes.", "image_url": "/images/week126/webtoon_scene_1.png", "audio_url": "/audio/week126/scene_1.mp3" },
    { "id": 2, "scene_id": "scene_2", "scene_number": 2, "title_en": "Creating Pocket Cue Cards", "title_vi": "Tạo Thẻ Gợi Ý Bỏ Túi", "description_en": "Coach Elena guides Lucas to extract key words and transition markers onto color-coded index cards.", "description": "Coach Elena guides Lucas to extract key words and transition markers onto color-coded index cards.", "image_url": "/images/week126/webtoon_scene_2.png", "audio_url": "/audio/week126/scene_2.mp3" },
    { "id": 3, "scene_id": "scene_3", "scene_number": 3, "title_en": "Practicing Signpost Markers", "title_vi": "Luyện Tập Các Cụm Từ Báo Hiệu", "description_en": "Lucas stands before the mirror practicing phrases like 'Turning our attention to...' with confident hand gestures.", "description": "Lucas stands before the mirror practicing phrases like 'Turning our attention to...' with confident hand gestures.", "image_url": "/images/week126/webtoon_scene_3.png", "audio_url": "/audio/week126/scene_3.mp3" },
    { "id": 4, "scene_id": "scene_4", "scene_number": 4, "title_en": "Auditorium Rehearsal with Timer", "title_vi": "Diễn Tập Khán Phòng Cùng Đồng Hồ", "description_en": "Lucas times his rehearsal in the empty school auditorium, balancing vocal pacing with intentional pauses.", "description": "Lucas times his rehearsal in the empty school auditorium, balancing vocal pacing with intentional pauses.", "image_url": "/images/week126/webtoon_scene_4.png", "audio_url": "/audio/week126/scene_4.mp3" },
    { "id": 5, "scene_id": "scene_5", "scene_number": 5, "title_en": "Delivering the Keynote Address", "title_vi": "Trình Bày Bài Diễn Văn Chủ Đề", "description_en": "The audience erupts into applause as Lucas concludes his presentation with an articulate final summary.", "description": "The audience erupts into applause as Lucas concludes his presentation with an articulate final summary.", "image_url": "/images/week126/webtoon_scene_5.png", "audio_url": "/audio/week126/scene_5.mp3" }
  ],
  "writing_data": {
    "title": "Converting an Academic Paper into a Public Address",
    "prompt_en": "Look at the four panels. Write a practical guide paragraph explaining how to convert a written research essay into an engaging spoken presentation. Use oral signposting phrases ('Moving on to...', 'Turning our attention to...') and vocal delivery techniques. Write 20 or more words.",
    "prompt_vi": "Nhìn vào 4 khung tranh. Viết một đoạn văn hướng dẫn thực tế giải thích cách chuyển đổi một bài luận nghiên cứu viết thành bài thuyết trình nói hấp dẫn. Sử dụng các cụm từ định hướng bằng lời ('Moving on to...', 'Turning our attention to...') và kỹ thuật diễn thuyết. Viết từ 20 từ trở lên.",
    "min_sentences": 3,
    "min_words": 20,
    "max_words": 90,
    "model_sentence": "To convert an academic essay into an engaging speech, speakers must condense paragraphs into concise cue cards. First, outline the core arguments and replace dense academic prose with oral signposting phrases like 'Moving on to our next finding.' Next, rehearse vocal pacing and intonation to keep the audience focused. Ultimately, deliberate pauses and clear signposts ensure the spoken delivery captivates listeners.",
    "word_bank": ["signpost", "cue", "transition", "rhetoric", "delivery", "articulate", "audience", "pacing", "intonation", "summary"],
    "sentence_frames": [
      "When preparing a speech, speakers write concise keywords on ___ cards.",
      "Oral ___ markers like 'Moving on to...' guide listeners smoothly.",
      "Deliberate vocal ___ allows the audience to absorb complex points.",
      "In the end, clear vocal delivery produces a memorable ___ presentation."
    ],
    "panels": [
      {
        "panel_id": "panel_1",
        "title_en": "Panel 1: Condensing Essays onto Cards",
        "title_vi": "Khung 1: Cô Đọng Bài Luận Lên Thẻ",
        "image_url": "/images/week126/writing_panel_1.png",
        "image_prompt": "A student highlighting key thesis lines on a printed essay and writing bullet points onto index cards.",
        "caption": "Writers condense paragraphs into concise cue card bullet points.",
        "sentence_frame": "Speakers [condense long written paragraphs] onto [compact cue cards with key phrases].",
        "pills": ["condense long written paragraphs", "compact cue cards with key phrases", "highlight essential claims", "prepare speaking prompts"],
        "connectors": ["First,", "To begin with,", "In the planning phase,"]
      },
      {
        "panel_id": "panel_2",
        "title_en": "Panel 2: Integrating Signposting Signals",
        "title_vi": "Khung 2: Tích Hợp Các Tín Hiệu Định Hướng",
        "image_url": "/images/week126/writing_panel_2.png",
        "image_prompt": "A podium speaker pointing to presentation slides labeled with transition words like Next and Furthermore.",
        "caption": "Signposting phrases guide the audience between major sections.",
        "sentence_frame": "Oral signposts [guide the listening audience] through [each logical step of the argument].",
        "pills": ["guide the listening audience", "each logical step of the argument", "signal topic changes", "transition smoothly"],
        "connectors": ["Next,", "Moving on to the next step,", "Furthermore,"]
      },
      {
        "panel_id": "panel_3",
        "title_en": "Panel 3: Rehearsing Vocal Modulation",
        "title_vi": "Khung 3: Diễn Tập Điều Biến Giọng Nói",
        "image_url": "/images/week126/writing_panel_3.png",
        "image_prompt": "A speaker practicing before an audio recorder with sound wave graphics illustrating pauses and intonation.",
        "caption": "Rehearsing pacing and vocal pitch prevents monotone delivery.",
        "sentence_frame": "Speakers [rehearse vocal pacing and intonation] to [maintain strong audience attention].",
        "pills": ["rehearse vocal pacing and intonation", "maintain strong audience attention", "avoid monotonous delivery", "practice strategic pauses"],
        "connectors": ["Meanwhile,", "During rehearsals,", "In addition,"]
      },
      {
        "panel_id": "panel_4",
        "title_en": "Panel 4: Captivating the Auditorium",
        "title_vi": "Khung 4: Lôi Cuốn Toàn Thể Khán Phòng",
        "image_url": "/images/week126/writing_panel_4.png",
        "image_prompt": "A student standing confidently at a lecture hall microphone while the engaged audience listens intently.",
        "caption": "Dynamic spoken delivery turns dry research into an inspiring speech.",
        "sentence_frame": "Confident delivery [transforms written academic research] into [an inspiring keynote address].",
        "pills": ["transforms written academic research", "an inspiring keynote address", "connects with the audience", "delivers clear conclusions"],
        "connectors": ["Ultimately,", "In conclusion,", "As a result,"]
      }
    ],
    "ladder_stages": [
      {
        "badge_label": "MODEL",
        "title": "Stage 1: Organizing Speaker Prompts",
        "image_url": "/images/week126/writing_panel_1.png",
        "caption": "Writers condense paragraphs into concise cue card bullet points.",
        "frame_L1": "Speakers summarize paragraphs onto cue cards. Bullet points help them remember main points.",
        "connectors": ["First,", "Initially,", "To begin,"],
        "sentence_hint": "Write 2 sentences about how cue cards help speakers stay organized.",
        "ordered_chips": ["Speakers write keywords", "on portable cue cards", "to guide their delivery", "without reading full texts."],
        "pills": ["portable cue cards", "write keywords", "guide delivery", "stay organized"],
        "sentence_frame": "Speakers [condense long written paragraphs] onto [compact cue cards with key phrases]."
      },
      {
        "badge_label": "BUILD",
        "title": "Stage 2: Applying Signpost Language",
        "image_url": "/images/week126/writing_panel_2.png",
        "caption": "Signposting phrases guide the audience between major sections.",
        "frame_L1": "Signposting phrases tell the audience where the speech is going. They make transitions smooth.",
        "connectors": ["Moving on,", "Next,", "Furthermore,"],
        "sentence_hint": "Write 2 sentences explaining how signposts like 'Moving on to...' help listeners.",
        "pills": ["signposting phrases", "guide the audience", "smooth transitions", "signal topic changes"],
        "sentence_frame": "Oral signposts [guide the listening audience] through [each logical step of the argument]."
      },
      {
        "badge_label": "WRITE",
        "title": "Stage 3: Mastering Tempo and Intonation",
        "image_url": "/images/week126/writing_panel_3.png",
        "caption": "Rehearsing pacing and vocal pitch prevents monotone delivery.",
        "frame_L1": "Speakers rehearse with a timer to adjust their speed. Changing pitch keeps the audience engaged.",
        "connectors": ["During practice,", "In addition,", "Meanwhile,"],
        "sentence_hint": "Write 2 sentences describing why pauses and vocal variety matter on stage.",
        "pills": ["rehearse with a timer", "adjust speaking speed", "changing vocal pitch", "keep audience engaged"],
        "sentence_frame": "Speakers [rehearse vocal pacing and intonation] to [maintain strong audience attention]."
      },
      {
        "badge_label": "EXPAND",
        "title": "Stage 4: Synthesizing the Public Address",
        "image_url": "/images/week126/writing_panel_4.png",
        "caption": "Dynamic spoken delivery turns dry research into an inspiring speech.",
        "frame_L1": "Clear delivery turns an essay into a memorable talk. The audience understands and remembers the main message.",
        "connectors": ["Ultimately,", "In conclusion,", "Consequently,"],
        "sentence_hint": "Write 2 sentences summarizing how public speaking skills bring research alive.",
        "pills": ["clear vocal delivery", "memorable keynote talk", "audience understands message", "inspires listeners"],
        "sentence_frame": "Confident delivery [transforms written academic research] into [an inspiring keynote address]."
      }
    ]
  },
  "speaking_data": {
    "talkshow_prompt": {
      "topic": "Mastering the Art of Converting Essays into Speeches",
      "question": "Lucas, why is oral signposting more essential in spoken presentations than in written essays?",
      "model_response": "In a written essay, readers can glance at subheadings, check footnotes, or re-read confusing paragraphs at their own pace. But in an oral presentation, the audience hears your words only once in real time! Signposting markers like 'Moving on to our next question' or 'Turning our attention to the data' act as mental road signs. They prepare listeners for what comes next, keeping everyone united and engaged throughout the entire speech!"
    },
    "info_exchange_cards": {
      "table_a": {
        "title": "Lucas's Public Speaking Workshop",
        "subtitle": "Candidate's Question Card (Ask Examiner)",
        "person": "Lucas",
        "fields": [
          { "id": "field_a1", "cue_prompt": "where / public speaking workshop held?", "cue_word": "where", "is_missing": True, "acceptable_questions": ["Where is the public speaking workshop held?", "Where is the workshop?", "Where does Lucas attend the workshop?"], "nova_reply": "The workshop is held in the university debate lecture auditorium." },
          { "id": "field_a2", "cue_prompt": "what / core skill taught this session?", "cue_word": "what", "is_missing": True, "acceptable_questions": ["What is the core skill taught this session?", "What core skill do they learn?", "What is taught in the session?"], "nova_reply": "Techniques for condensing essay paragraphs into keyword cue cards." },
          { "id": "field_a3", "cue_prompt": "how long / each practice speech last?", "cue_word": "how long", "is_missing": True, "acceptable_questions": ["How long does each practice speech last?", "How long is each speech?", "What is the duration of the speech?"], "nova_reply": "Each student delivers a timed five-minute presentation." },
          { "id": "field_a4", "cue_prompt": "who / coaches the students?", "cue_word": "who", "is_missing": True, "acceptable_questions": ["Who coaches the students?", "Who is the speech coach?", "Who leads the training session?"], "nova_reply": "Professor Elena Vance, a national collegiate debate champion." },
          { "id": "field_a5", "cue_prompt": "why / signpost markers essential?", "cue_word": "why", "is_missing": True, "acceptable_questions": ["Why are signpost markers essential?", "Why do speakers use signposting?", "Why is signposting important?"], "nova_reply": "Because listeners cannot re-read spoken sentences and need verbal road signs." }
        ]
      },
      "table_b": {
        "title": "Elena's Oratory Masterclass",
        "subtitle": "Information Card (Answer Examiner's Questions)",
        "person": "Elena",
        "fields": [
          { "id": "field_b1", "cue_prompt": "where / speech rehearsal studio located?", "cue_word": "where", "value": "On the third floor of the civic arts center.", "nova_question": "Where is the speech rehearsal studio located?", "acceptable_answers": ["On the third floor of the civic arts center.", "At the civic arts center.", "Third floor of the civic arts center."] },
          { "id": "field_b2", "cue_prompt": "what / maximum number of words per cue card?", "cue_word": "what", "value": "Six bullet point keywords to prevent verbatim reading.", "nova_question": "What is the maximum number of words per cue card?", "acceptable_answers": ["Six bullet point keywords to prevent verbatim reading.", "Six bullet point keywords.", "Six words per card."] },
          { "id": "field_b3", "cue_prompt": "how / measure student speaking speed?", "cue_word": "how", "value": "Using a digital pacing monitor that tracks words per minute.", "nova_question": "How do coaches measure student speaking speed?", "acceptable_answers": ["Using a digital pacing monitor that tracks words per minute.", "With a digital pacing monitor.", "By tracking words per minute."] },
          { "id": "field_b4", "cue_prompt": "who / evaluates the final presentations?", "cue_word": "who", "value": "A panel of three professional communications instructors.", "nova_question": "Who evaluates the final student presentations?", "acceptable_answers": ["A panel of three professional communications instructors.", "Three communications instructors.", "Professional instructors."] },
          { "id": "field_b5", "cue_prompt": "why / include deliberate pauses in speeches?", "cue_word": "why", "value": "To let listeners process key ideas and to build dramatic focus.", "nova_question": "Why should speakers include deliberate pauses in speeches?", "acceptable_answers": ["To let listeners process key ideas and to build dramatic focus.", "To let listeners process ideas.", "To build dramatic focus and give listeners time."] }
        ]
      }
    }
  },
  "cambridge_rw": {
    "part1_definitions": [
      { "id": 1, "text": "A brief prompt or note card containing keywords used to guide an oral presenter.", "target": "cue" },
      { "id": 2, "text": "The verbal signaling words used to guide listeners from one section of a talk to the next.", "target": "signpost" },
      { "id": 3, "text": "The speed and deliberate tempo at which a spoken presentation is delivered.", "target": "pacing" },
      { "id": 4, "text": "The artistic and strategic use of persuasive language in public communication.", "target": "rhetoric" },
      { "id": 5, "text": "A brief statement that reviews and synthesizes the primary points of an address.", "target": "summary" }
    ],
    "part2_dialogue": {
      "title": "Preparing for a Public Research Presentation",
      "turns": [
        {
          "id": 1,
          "speaker": "Elena",
          "prompt": "Lucas, why should you avoid reading your essay word-for-word at the podium?",
          "options": [
            "Because reading directly sounds monotone and breaks eye contact with the audience.",
            "Because podium lights are too bright to see text.",
            "Because speeches must be whispered quietly."
          ],
          "answer": "Because reading directly sounds monotone and breaks eye contact with the audience."
        },
        {
          "id": 2,
          "speaker": "Elena",
          "prompt": "How do pocket cue cards help you deliver a more natural presentation?",
          "options": [
            "They display concise bullet points that prompt your memory while keeping delivery conversational.",
            "They hide your hands so nobody sees them shaking.",
            "They replace the need to understand your topic."
          ],
          "answer": "They display concise bullet points that prompt your memory while keeping delivery conversational."
        },
        {
          "id": 3,
          "speaker": "Elena",
          "prompt": "Which phrase is an example of an effective oral signpost?",
          "options": [
            "'Moving on to our second finding, let us examine the statistical evidence.'",
            "'I have forgotten what my next slide shows.'",
            "'This paragraph has twelve lines and three commas.'"
          ],
          "answer": "'Moving on to our second finding, let us examine the statistical evidence.'"
        },
        {
          "id": 4,
          "speaker": "Elena",
          "prompt": "Why is deliberate pacing essential when explaining complex scientific models?",
          "options": [
            "It gives listeners sufficient mental time to process unfamiliar concepts and evidence.",
            "It ensures you finish before the auditorium doors unlock.",
            "It makes the speech twice as loud."
          ],
          "answer": "It gives listeners sufficient mental time to process unfamiliar concepts and evidence."
        },
        {
          "id": 5,
          "speaker": "Elena",
          "prompt": "How should you conclude your oral presentation effectively?",
          "options": [
            "Deliver a concise summary reviewing the central insights and thank the audience.",
            "Walk off the stage without saying another word.",
            "Re-read the entire paper from page one."
          ],
          "answer": "Deliver a concise summary reviewing the central insights and thank the audience."
        }
      ]
    },
    "part6_cloze": {
      "instructions": "Read the text about speech preparation and choose the correct function word for each blank space.",
      "text_template": "Converting an essay into an oral speech requires strategic planning. Instead [1] reading full paragraphs aloud, speakers prepare cue cards with key words. Signposting phrases are used [2] indicate when a new topic begins. Furthermore, presenters practice pacing so [3] listeners have time to understand difficult ideas. In the end, rehearsal ensures [4] the speaker delivers [5] inspiring and articulate presentation.",
      "answers": { "1": "of", "2": "to", "3": "that", "4": "that", "5": "an" }
    }
  },
  "minigames": {
    "math_problems": [
      {
        "id": "w126_p1",
        "type": "part_whole",
        "title": "Allocating Time Across Speech Sections",
        "question": "A student allocates 120 seconds for the introduction and conclusions combined, and 240 seconds for the main body arguments. What is the total duration of the presentation in seconds?",
        "storyContext": "Lucas calculates speaking time limits using a rehearsal timeline chart.",
        "modelData": {
          "bars": [
            { "label": "Intro & Conclusion", "value": 120, "color": "#6366f1" },
            { "label": "Body Arguments", "value": 240, "color": "#10b981" }
          ],
          "total": 360,
          "unit": "seconds"
        },
        "target_answer": 360,
        "unit": "seconds",
        "steps": [
          "Take the introduction and conclusion time: 120 seconds.",
          "Add the body arguments duration: 240 seconds.",
          "120 + 240 = 360 seconds in total (exactly 6 minutes)."
        ]
      },
      {
        "id": "w126_p2",
        "type": "comparison",
        "title": "Comparing Word Counts: Full Essay vs Cue Card Notes",
        "question": "A complete written research essay contains 1,250 words, while its condensed cue card presentation notes contain only 280 words. How many fewer words are on the cue card notes?",
        "storyContext": "Elena reviews word reduction metrics on an editorial comparison graph.",
        "modelData": {
          "bars": [
            { "label": "Full Essay Text", "value": 1250, "color": "#f43f5e" },
            { "label": "Cue Card Notes", "value": 280, "color": "#3b82f6" }
          ],
          "difference": 970,
          "unit": "words"
        },
        "target_answer": 970,
        "unit": "words",
        "steps": [
          "Start with the total essay words: 1,250 words.",
          "Subtract the cue card words: 280 words.",
          "1,250 - 280 = 970 fewer words on the cue card outline."
        ]
      }
    ],
    "action_lab_scenarios": [
      {
        "stage": 1,
        "title": "Deconstructing Written Essay into Core Themes",
        "diagram_type": "essay_text_condensation_funnel",
        "instruction": "Filter dense essay paragraphs down to core thesis statements and keyword prompts.",
        "items": [
          { "label": "Full Paragraph Text Analysis", "target": "source_input" },
          { "label": "Keyword Extraction Filter", "target": "condensation_stage" },
          { "label": "Pocket Cue Card Prompts", "target": "speaker_notes" }
        ]
      },
      {
        "stage": 2,
        "title": "Mapping Signpost Transitions in Presentation Flow",
        "diagram_type": "speech_signposting_roadmap",
        "instruction": "Insert transition connectors between introduction, evidence points, and summary.",
        "items": [
          { "label": "Opening Signpost: 'Let us begin with...'", "target": "introduction_gate" },
          { "label": "Progressive Signpost: 'Moving on to...'", "target": "transition_node" },
          { "label": "Closing Signpost: 'In conclusion...'", "target": "synthesis_exit" }
        ]
      },
      {
        "stage": 3,
        "title": "Optimizing Vocal Modulation & Pacing",
        "diagram_type": "vocal_cadence_frequency_wave",
        "instruction": "Synchronize pitch intonation, volume projection, and intentional silence pauses.",
        "items": [
          { "label": "Auditorium Vocal Projection", "target": "volume_level" },
          { "label": "Pitch Variation for Emphasis", "target": "intonation_curve" },
          { "label": "Strategic Three-Second Silence", "target": "cognitive_pause" }
        ]
      }
    ],
    "grammar_drills": [
      { "sentence": "Moving on to our second main finding, let us examine the survey data.", "options": ["Moving on to", "Move on at", "Moved on for"], "answer": "Moving on to", "explanation": "Use 'Moving on to...' as an oral signpost to transition smoothly to a new topic." },
      { "sentence": "Having examined the historical background, we can now address current policies.", "options": ["Having examined", "Have examined", "Examine"], "answer": "Having examined", "explanation": "Use the perfect participle clause 'Having examined...' to summarize prior context before introducing a new focus." },
      { "sentence": "Turning our attention to the global market, export numbers grew significantly.", "options": ["Turning our attention to", "Turn our attention on", "Turned attention with"], "answer": "Turning our attention to", "explanation": "Use 'Turning our attention to...' to direct listeners' focus toward a specific aspect." },
      { "sentence": "Speakers should pause deliberately so that listeners can absorb difficult points.", "options": ["so that", "because of", "in order"], "answer": "so that", "explanation": "Use 'so that' followed by a clause to express the intended purpose of an action." },
      { "sentence": "Varying vocal intonation keeps the audience engaged throughout the address.", "options": ["keeps", "keep", "keeping"], "answer": "keeps", "explanation": "The singular gerund subject 'Varying vocal intonation' takes the singular verb 'keeps'." }
    ]
  }
}

with open("scripts/specs_w126.mjs", "w", encoding="utf-8") as f:
    f.write(render_js(w126, "w126"))
print("✅ Generated scripts/specs_w126.mjs (From Essay to Speech)")

