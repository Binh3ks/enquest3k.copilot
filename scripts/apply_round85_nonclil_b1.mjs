import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const BASE_DIR = path.resolve('docs/agent_artifacts/staging');
const COMMIT_BASE = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();

function makeWordChips(sentence) {
  return String(sentence)
    .replace(/—/g, ' ')
    .split(/\s+/)
    .map((w) => w.replace(/^[.,!?;:"'()]+|[.,!?;:"'()]+$/g, ''))
    .filter(Boolean);
}

// Per-week B1+ rewrites for vocab (definition_en/example_en/example_vi), shadowing (also dictation),
// and remaining non-CLIL prose in story_scenes, rw_part2, rw_part6, writing_hub, speaking_hub, skill_practice_hub.
const UPDATES = {
  126: {
    vocabPatch: {
      signpost: {
        definition_en: 'To use clear spoken phrases that guide listeners through your talk',
        example_en: 'Good speakers signpost their main points so listeners can follow easily.',
        example_vi: 'Người nói giỏi dùng từ dẫn ý để người nghe dễ theo dõi các ý chính.',
      },
      cue: {
        example_en: 'She wrote short key words on pocket cue cards to help her remember.',
        example_vi: 'Cô ấy viết từ khóa ngắn lên thẻ gợi ý bỏ túi để giúp nhớ bài.',
      },
      transition: {
        example_en: 'The transition from her first point to her second example was smooth.',
        example_vi: 'Phần chuyển ý từ luận điểm đầu sang ví dụ thứ hai rất mượt mà.',
      },
      rhetoric: {
        definition_en: 'The art of speaking or writing clearly to persuade others',
        example_en: 'School rhetoric practice teaches students how to share reasons and feelings well.',
        example_vi: 'Luyện tập hùng biện ở trường dạy học sinh cách chia sẻ lý lẽ và cảm xúc tốt.',
      },
      delivery: {
        definition_en: 'The way a speaker uses voice and body during a speech',
        example_en: 'His bright delivery kept the whole school hall listening closely.',
        example_vi: 'Cách trình bày sinh động của cậu ấy khiến cả hội trường chăm chú lắng nghe.',
      },
      articulate: {
        definition_en: 'To say ideas clearly so listeners understand every word',
        example_en: 'Debaters must articulate hard ideas clearly even when time is short.',
        example_vi: 'Người tranh biện phải diễn đạt rõ các ý khó ngay cả khi thời gian ngắn.',
      },
      outline: {
        example_en: 'Make a short outline before writing key words onto note cards.',
        example_vi: 'Hãy lập dàn ý ngắn trước khi viết từ khóa lên thẻ ghi chú.',
      },
      audience: {
        definition_en: 'The people watching or listening to a speech or performance',
        example_en: 'Look up from your notes and make eye contact with your audience.',
        example_vi: 'Hãy ngẩng lên khỏi ghi chú và giao tiếp bằng mắt với khán giả.',
      },
      gesture: {
        example_en: 'Friendly hand gestures help your listeners picture each idea clearly.',
        example_vi: 'Cử chỉ tay thân thiện giúp người nghe hình dung rõ từng ý.',
      },
      pacing: {
        definition_en: 'The speed at which a speaker talks during a speech',
        example_en: 'Steady pacing gives listeners enough time to understand new ideas.',
        example_vi: 'Tốc độ nói ổn định giúp người nghe đủ thời gian hiểu các ý mới.',
      },
      emphasis: {
        example_en: "Put strong vocal emphasis on words like 'however' to show contrast.",
        example_vi: "Hãy nhấn giọng rõ vào những từ như 'however' để thể hiện sự đối lập.",
      },
      rehearse: {
        example_en: 'Students rehearse their three-minute talks with a timer before class.',
        example_vi: 'Học sinh tập dượt bài nói ba phút với đồng hồ bấm giờ trước giờ học.',
      },
      intonation: {
        example_en: 'Changing your intonation keeps your speech from sounding flat and boring.',
        example_vi: 'Thay đổi ngữ điệu giúp bài nói không bị đều đều và nhàm chán.',
      },
      verbal: {
        example_en: "Verbal signals like 'next' tell listeners a new point is coming.",
        example_vi: "Các tín hiệu lời nói như 'next' báo cho người nghe biết sắp sang ý mới.",
      },
      projection: {
        example_en: 'Good voice projection helps people in the back row hear every word.',
        example_vi: 'Phát âm vang rõ giúp người ngồi hàng cuối nghe được từng chữ.',
      },
      elocution: {
        definition_en: 'The skill of speaking clearly with careful word sounds',
        example_en: 'Elocution practice helps you say hard word endings clearly.',
        example_vi: 'Luyện phát âm rõ giúp bạn đọc rõ các âm cuối khó.',
      },
      summary: {
        example_en: 'End your speech with a short summary of your three main ideas.',
        example_vi: 'Hãy kết thúc bài nói bằng một bản tóm tắt ngắn gọn ba ý chính.',
      },
      structure: {
        example_en: 'A clear three-part structure with start, middle, and end helps listeners.',
        example_vi: 'Cấu trúc ba phần rõ ràng gồm mở đầu, thân bài và kết luận giúp người nghe dễ hiểu.',
      },
      keynote: {
        example_en: 'Her keynote speech explained why honesty matters in school science fairs.',
        example_vi: 'Bài phát biểu chính của cô ấy giải thích vì sao sự trung thực quan trọng ở hội chợ khoa học.',
      },
      oratory: {
        definition_en: 'The skill and practice of giving strong, clear speeches in public',
        example_en: 'Our school speech contest celebrates clear student oratory and fair talks.',
        example_vi: 'Cuộc thi nói của trường tôn vinh tài diễn thuyết rõ ràng và công bằng của học sinh.',
      },
    },
    shadowing: [
      {
        id: 1,
        text: 'Turning a written essay into a spoken talk needs clear signpost phrases.',
        vi: 'Chuyển bài luận viết thành bài nói cần các cụm từ dẫn ý rõ ràng.',
        ipa: '/ˈtɜːrnɪŋ ə ˈrɪtn ˈeseɪ ˈɪntuː ə ˈspoʊkən tɔːk niːdz klɪr ˈsaɪnpoʊst ˈfreɪzɪz/',
      },
      {
        id: 2,
        text: 'Speakers write short key words on pocket cue cards instead of full pages.',
        vi: 'Người nói viết các từ khóa ngắn lên thẻ gợi ý bỏ túi thay vì cả trang chữ.',
        ipa: '/ˈspiːkərz raɪt ʃɔːrt kiː wɜːrdz ɑːn ˈpɑːkɪt kjuː kɑːrdz ɪnˈsted əv fʊl ˈpeɪdʒɪz/',
      },
      {
        id: 3,
        text: 'Moving on to our second finding, let us look at the class survey results.',
        vi: 'Chuyển sang phát hiện thứ hai, chúng ta hãy xem kết quả khảo sát của lớp.',
        ipa: '/ˈmuːvɪŋ ɑːn tuː ˈaʊər ˈsekənd ˈfaɪndɪŋ let ʌs lʊk æt ðə klæs ˈsɜːrveɪ rɪˈzʌlts/',
      },
      {
        id: 4,
        text: 'Steady pacing and short pauses give listeners time to follow hard ideas.',
        vi: 'Tốc độ nói đều đặn và khoảng dừng ngắn giúp người nghe theo kịp các ý khó.',
        ipa: '/ˈstedi ˈpeɪsɪŋ ænd ʃɔːrt ˈpɔːzɪz ɡɪv ˈlɪsənərz taɪm tuː ˈfɑːloʊ hɑːrd aɪˈdiːəz/',
      },
      {
        id: 5,
        text: 'Changing your voice intonation keeps the class interested through your whole talk.',
        vi: 'Thay đổi ngữ điệu giọng nói giúp cả lớp hứng thú suốt bài trình bày.',
        ipa: '/ˈtʃeɪndʒɪŋ jʊr vɔɪs ˌɪntəˈneɪʃən kiːps ðə klæs ˈɪntrəstɪd θruː jʊr hoʊl tɔːk/',
      },
      {
        id: 6,
        text: 'Friendly hand gestures and steady eye contact build trust with your audience.',
        vi: 'Cử chỉ tay thân thiện và giao tiếp mắt ổn định tạo sự tin cậy với khán giả.',
        ipa: '/ˈfrendli hænd ˈdʒestʃərz ænd ˈstedi aɪ ˈkɑːntækt bɪld trʌst wɪð jʊr ˈɔːdiəns/',
      },
      {
        id: 7,
        text: 'Rehearsing aloud with a timer helps every transition fit your time limit.',
        vi: 'Tập nói to với đồng hồ bấm giờ giúp mỗi phần chuyển ý vừa đúng thời gian.',
        ipa: '/rɪˈhɜːrsɪŋ əˈlaʊd wɪð ə ˈtaɪmər helps ˈevri trænˈzɪʃən fɪt jʊr taɪm ˈlɪmɪt/',
      },
      {
        id: 8,
        text: 'A clear summary reviews your main points without reading the whole essay again.',
        vi: 'Bản tóm tắt rõ ràng nhắc lại các ý chính mà không đọc lại toàn bộ bài luận.',
        ipa: '/ə klɪr ˈsʌməri rɪˈvjuːz jʊr meɪn pɔɪnts wɪˈðaʊt ˈriːdɪŋ ðə hoʊl ˈeseɪ əˈɡen/',
      },
    ],
    rwPart2Patch: {
      1: {
        prompt: 'Lucas, why should you avoid reading your essay word for word on stage?',
        answer: 'Because reading directly sounds flat and breaks eye contact with the audience.',
      },
      2: {
        answer: 'They show short key words that help your memory while keeping your voice natural.',
      },
      3: {
        answer: "'Moving on to our second finding, let us look at the class survey results.'",
      },
      4: {
        prompt: 'Why is steady pacing important when explaining hard science ideas?',
        answer: 'It gives listeners enough time to think about new facts and ideas.',
      },
      5: {
        answer: 'Give a short summary of your main points and thank the audience.',
      },
    },
    rwPart6Template:
      'Turning an essay into a spoken talk takes good planning. Instead [1] reading full pages aloud, speakers write key words on cue cards. Signpost phrases are used [2] show when a new topic begins. Next, speakers practice steady pacing so [3] listeners have time to understand hard ideas. In the end, practice makes sure [4] the speaker gives [5] interesting and clear talk.',
    storyScenesPatch: {
      1: {
        description_en: 'Lucas looks at his long written essay and plans how to share it aloud in five minutes.',
      },
      5: {
        description_en: 'The audience claps loudly as Lucas finishes his speech with a clear final summary.',
      },
    },
    writingPatch: {
      title: 'Turning a Written Essay into a Clear Speech',
      prompt_en:
        "Look at the four panels. Write a short guide explaining how to turn a written essay into a clear spoken talk. Use spoken signpost phrases ('Moving on to...', 'Turning our attention to...') and steady voice tips. Write 20 or more words.",
      model_sentence:
        "To turn a written essay into a lively speech, copy your main ideas onto short cue cards. First, make a simple outline and use spoken signpost phrases like 'Moving on to our next point.' Next, practice your pacing and intonation so people stay interested. In the end, clear pauses and signposts help every listener follow your talk.",
      sentence_frames: [
        'When preparing a speech, speakers write short key words on ___ cards.',
        "Spoken ___ phrases like 'Moving on to...' guide listeners smoothly.",
        'Steady vocal ___ lets the audience think about hard points.',
        'In the end, clear voice delivery makes a memorable ___ talk.',
      ],
      panelOverrides: {
        panel_1: {
          caption: 'Writers put main ideas onto small cue cards with short notes.',
          sentence_frame: 'Speakers [shorten long written paragraphs] onto [small cue cards with key words].',
          pills: ['shorten long written paragraphs', 'small cue cards with key words', 'highlight main ideas', 'prepare speaking notes'],
          ladderTitle: 'Stage 1: Making Simple Cue Cards',
        },
        panel_2: {
          image_prompt: "A speaker on stage pointing to slides with signpost words like Next and Moving on.",
          caption: 'Signpost phrases guide the audience from one topic to the next.',
          sentence_frame: 'Spoken signposts [guide the listening audience] through [each clear step of the talk].',
          pills: ['guide the listening audience', 'each clear step of the talk', 'signal topic changes', 'move smoothly'],
          connectors: ['Next,', 'After that,', 'Moving on to our next point,'],
          ladderTitle: 'Stage 2: Using Spoken Signposts',
        },
        panel_3: {
          caption: 'Practicing speed and voice pitch stops your speech from sounding flat.',
          sentence_frame: 'Speakers [vary their vocal intonation] with [steady speaking pacing] to [keep listeners interested].',
          pills: ['vary their vocal intonation', 'steady speaking pacing', 'keep listeners interested', 'avoid flat delivery'],
          ladderTitle: 'Stage 3: Using Good Speed and Tone',
        },
        panel_4: {
          title_en: 'Panel 4: Speaking Clearly on Stage',
          title_vi: 'Khung 4: Nói Rõ Ràng Trên Sân Khấu',
          caption: 'Clear signposts and steady delivery make spoken talks easy to follow.',
          sentence_frame: 'Clear delivery [turns a written essay into] a [lively spoken talk] for listeners.',
          pills: ['turns a written essay into', 'lively spoken talk', 'clear vocal summary', 'confident stage ending'],
          connectors: ['In conclusion,', 'Finally,', 'To sum up,'],
          ladderTitle: 'Stage 4: Wrapping Up the Speech',
        },
      },
    },
    speakingPatch: {
      talkshow_prompt: {
        topic: 'Turning a Written Essay into a Good Speech',
        question: 'Lucas, why are spoken signposts more helpful in a speech than in a written essay?',
        model_response:
          "In a written essay, readers can look at headings or read hard parts again slowly. But in a speech, the audience hears your words only once! Spoken signpost phrases like 'Moving on to our next question' act like road signs so every listener can follow your talk.",
      },
      table_a: {
        field_a1: {
          nova_reply: 'The workshop is held in the school speech hall.',
        },
        field_a2: {
          nova_reply: 'How to turn long essay paragraphs into short cue card notes.',
        },
        field_a4: {
          nova_reply: 'Coach Elena Vance, a two-time national school debate winner.',
        },
      },
      table_b: {
        field_b1: {
          cue_prompt: 'where / speech practice room located?',
          value: 'On the third floor of the community arts center.',
          nova_question: 'Where is the speech practice room located?',
          acceptable_answers: [
            'On the third floor of the community arts center.',
            'At the community arts center.',
            'Third floor of the community arts center.',
          ],
        },
        field_b2: {
          value: 'Six short key words so speakers do not read word for word.',
          acceptable_answers: [
            'Six short key words so speakers do not read word for word.',
            'Six short key words.',
            'Six words per card.',
          ],
        },
        field_b4: {
          value: 'A team of three school speech teachers.',
          acceptable_answers: [
            'A team of three school speech teachers.',
            'Three speech teachers.',
            'School speech teachers.',
          ],
        },
      },
    },
    drillsPatch: [
      { idx: 0, sentence: 'Moving on to our second finding, let us look at the survey data.' },
      { idx: 1, sentence: 'Having examined the class survey, we can now plan our speech.' },
      { idx: 2, sentence: 'Turning our attention to the school library, book loans grew fast.' },
      { idx: 3, sentence: 'Speakers should pause briefly so that listeners can follow hard ideas.' },
      {
        idx: 4,
        sentence: 'Varying your voice keeps the audience interested through your whole speech.',
        explanation: "The singular gerund phrase 'Varying your voice' takes the singular verb 'keeps'.",
      },
    ],
  },

  127: {
    vocabPatch: {
      disagree: {
        example_en: 'Debaters often disagree on school rules while still speaking politely.',
        example_vi: 'Người tranh biện thường bất đồng về nội quy trường học nhưng vẫn nói năng lịch sự.',
      },
      counter: {
        example_en: "She shared three recent school studies to counter her opponent's claim.",
        example_vi: 'Cô ấy đưa ra ba nghiên cứu gần đây để phản bác lại khẳng định của đối thủ.',
      },
      point: {
        example_en: 'The speaker made a helpful point about the cost of plastic bottles.',
        example_vi: 'Người nói đã nêu một ý hữu ích về chi phí của chai nhựa.',
      },
      false: {
        example_en: 'His rebuttal proved that the false claim about student homework was wrong.',
        example_vi: 'Phần phản biện của cậu ấy chứng minh nhận định sai về bài tập là không đúng.',
      },
      true: {
        example_en: 'The idea sounded nice, but it was not true when we checked the facts.',
        example_vi: 'Ý tưởng nghe có vẻ hay nhưng không đúng sự thật khi chúng tôi kiểm tra số liệu.',
      },
      rebuttal: {
        example_en: 'In the rebuttal round, speakers answer the other team directly.',
        example_vi: 'Trong vòng phản biện, các thí sinh trả lời trực tiếp ý kiến của đội kia.',
      },
      refute: {
        example_en: 'New survey numbers refuted the claim that students never read books.',
        example_vi: 'Số liệu khảo sát mới đã bác bỏ nhận định cho rằng học sinh không bao giờ đọc sách.',
      },
      concede: {
        example_en: 'A smart speaker may concede one small true fact before giving a stronger point.',
        example_vi: 'Người nói khéo có thể thừa nhận một sự thật nhỏ trước khi nêu luận điểm mạnh hơn.',
      },
      oppose: {
        example_en: 'Many parents oppose longer school days because kids need rest.',
        example_vi: 'Nhiều phụ huynh phản đối kéo dài giờ học vì trẻ em cần được nghỉ ngơi.',
      },
      objection: {
        example_en: 'Her main objection was that the study tested only five students.',
        example_vi: 'Phản đối chính của cô ấy là nghiên cứu đó chỉ kiểm tra năm học sinh.',
      },
      contradict: {
        example_en: 'The library checkout numbers contradicted the claim that nobody reads.',
        example_vi: 'Số liệu mượn sách thư viện trái ngược với nhận định rằng không ai đọc sách.',
      },
      fallacious: {
        example_en: 'Attacking a speaker instead of their ideas is a fallacious trick.',
        example_vi: 'Công kích cá nhân người nói thay vì lý lẽ của họ là cách lập luận ngụy biện.',
      },
      premise: {
        example_en: 'If your starting premise is wrong, your final conclusion fails too.',
        example_vi: 'Nếu tiền đề ban đầu sai thì kết luận cuối cùng cũng sụp đổ.',
      },
      evidence: {
        definition_en: 'Real facts and examples showing whether a claim is true',
        example_en: 'Good debate evidence comes from real facts that anyone can check.',
        example_vi: 'Bằng chứng tranh biện tốt đến từ các sự thật mà ai cũng có thể kiểm tra.',
      },
      flaw: {
        example_en: 'The judges spotted a big flaw in the speaker’s math example.',
        example_vi: 'Ban giám khảo phát hiện ra một lỗi lớn trong ví dụ toán học của người nói.',
      },
      standpoint: {
        example_en: 'From a health standpoint, fresh fruit is better than sweet soda.',
        example_vi: 'Xét từ góc độ sức khỏe, trái cây tươi tốt hơn nước ngọt có ga.',
      },
      contend: {
        example_en: 'The first team contended that school uniforms help students feel equal.',
        example_vi: 'Đội thứ nhất cho rằng đồng phục học sinh giúp mọi bạn cảm thấy bình đẳng.',
      },
      disprove: {
        definition_en: 'To show with real facts that a claim or idea is wrong',
        example_en: 'Doctors ran careful tests to disprove the rumor about energy drinks.',
        example_vi: 'Các bác sĩ đã làm kiểm tra cẩn thận để bác bỏ tin đồn về nước tăng lực.',
      },
      rebut: {
        example_en: 'She stepped up to the microphone ready to rebut each weak point politely.',
        example_vi: 'Cô ấy bước lên micro sẵn sàng phản bác lịch sự từng điểm yếu.',
      },
      validity: {
        definition_en: 'Being true, fair, and backed by good reasons',
        example_en: 'Careful questions test the validity of every fact in a debate.',
        example_vi: 'Những câu hỏi kỹ lưỡng kiểm tra tính xác thực của mọi thông tin trong tranh biện.',
      },
    },
    shadowing: [
      {
        id: 1,
        text: 'They say space travel wastes money, but I say it brings helpful new tools.',
        vi: 'Họ nói du hành vũ trụ tốn tiền, nhưng tôi nói nó mang lại nhiều công cụ hữu ích.',
        ipa: '/ðeɪ seɪ speɪs ˈtrævəl weɪsts ˈmʌni bʌt aɪ seɪ ɪt brɪŋz ˈhelpfəl nuː tuːlz/',
      },
      {
        id: 2,
        text: 'A skilled speaker answers opposing points directly instead of ignoring them.',
        vi: 'Người nói giỏi trả lời trực tiếp các ý kiến trái chiều thay vì phớt lờ chúng.',
        ipa: '/ə skɪld ˈspiːkər ˈænsərz əˈpoʊzɪŋ pɔɪnts dəˈrektli ɪnˈsted əv ɪɡˈnɔːrɪŋ ðem/',
      },
      {
        id: 3,
        text: 'On the contrary, recent science studies prove that the first premise was false.',
        vi: 'Ngược lại, các nghiên cứu khoa học gần đây chứng minh tiền đề đầu tiên là sai.',
        ipa: '/ɑːn ðə ˈkɑːntreri ˈriːsənt ˈsaɪəns ˈstʌdiz pruːv ðæt ðə fɜːrst ˈpremɪs wʌz fɔːls/',
      },
      {
        id: 4,
        text: 'While opponents ask for strict bans, real data shows that education works better.',
        vi: 'Trong khi đối thủ đòi lệnh cấm nghiêm ngặt, dữ liệu thực cho thấy giáo dục hiệu quả hơn.',
        ipa: '/waɪl əˈpoʊnənts æsk fɔːr strɪkt bænz riːl ˈdeɪtə ʃoʊz ðæt ˌedʒuˈkeɪʃən wɜːrks ˈbetər/',
      },
      {
        id: 5,
        text: 'Smart debaters concede small true points so they can focus on big reasons.',
        vi: 'Người tranh biện thông minh nhượng bộ ý nhỏ đúng để tập trung vào lý lẽ lớn.',
        ipa: '/smɑːrt dɪˈbeɪtərz kənˈsiːd smɔːl truː pɔɪnts soʊ ðeɪ kæn ˈfoʊkəs ɑːn bɪɡ ˈriːzənz/',
      },
      {
        id: 6,
        text: 'Showing a mistake in reasoning quickly weakens an unfair debate claim.',
        vi: 'Chỉ ra lỗi suy luận nhanh chóng làm suy yếu một tuyên bố thiếu công bằng.',
        ipa: '/ˈʃoʊɪŋ ə mɪˈsteɪk ɪn ˈriːzənɪŋ ˈkwɪkli ˈwiːkənz ən ʌnˈfer dɪˈbeɪt kleɪm/',
      },
      {
        id: 7,
        text: 'We should check whether claims are really true before believing their conclusions.',
        vi: 'Chúng ta cần kiểm tra xem các tuyên bố có thật sự đúng không trước khi tin kết luận.',
        ipa: '/wi ʃʊd tʃek ˈweðər kleɪmz ɑːr ˈriːəli truː bɪˈfɔːr bɪˈliːvɪŋ ðer kənˈkluːʒənz/',
      },
      {
        id: 8,
        text: 'Careful rebuttal practice builds clear thinking and polite speaking skills.',
        vi: 'Luyện tập phản biện cẩn thận giúp rèn tư duy rõ ràng và kỹ năng nói lịch sự.',
        ipa: '/ˈkerfəl rɪˈbʌtl ˈpræktɪs bɪldz klɪr ˈθɪŋkɪŋ ænd pəˈlaɪt ˈspiːkɪŋ skɪlz/',
      },
    ],
    storyScenesPatch: {
      5: {
        description_en: "The debate judges nod in agreement and give high marks for Nora's clear, direct answer to the other side.",
      },
    },
    rwPart2Patch: {
      2: {
        answer: 'It proves we listened to the other speaker before answering their main reason.',
      },
      3: {
        answer: 'Share recent real facts that clearly show why their guess is wrong.',
      },
      4: {
        answer: 'Yes, admitting a small true point shows fairness and saves debate time.',
      },
      5: {
        answer: 'They show a clear, direct contrast between a weak claim and our checked facts.',
      },
    },
    rwPart6Template:
      'In a school debate, a strong rebuttal starts with careful listening. When someone makes a claim, debaters must check whether it [1] actually true or false. Smart speakers do not just disagree; on the contrary, they counter [2] real evidence. Even when opponents sound confident, facts [3] often show clear flaws in their thinking. By dealing directly [4] opposing points, speakers prove the validity [5] their own case.',
    writingPatch: {
      prompt_en:
        "Look at the four panels. Write a short rebuttal paragraph answering an opposing claim with checked facts. Use 'They say... but I say...', 'On the contrary,', and 'However,'. Write 20 or more words.",
      model_sentence:
        'They claim that clean energy is too weak to power modern cities, but recent data proves the contrary. While opponents argue that solar power drops at night, big new batteries store extra power during sunny hours. On the contrary, recent studies show that clean power grids stay steady, proving the other claim false.',
      sentence_frames: [
        'They say clean power is weak, but recent ___ proves them wrong.',
        'While opponents say solar power drops at night, battery ___ solves the issue.',
        'On the contrary, real data shows their first premise is completely ___.',
        'In the end, our clear rebuttal confirms the ___ of clean energy plans.',
      ],
      panelOverrides: {
        panel_1: {
          caption: 'Debaters listen carefully to find the exact claim made by the other side.',
          sentence_frame: 'Speakers [note the opposing claim] to [check its starting premise].',
          pills: ['note the opposing claim', 'check its starting premise', 'spot false assumptions', 'listen actively'],
        },
        panel_2: {
          caption: 'Rebuttal notes point out wrong facts and old numbers.',
          sentence_frame: "A clear rebuttal [spots factual mistakes] in the [other side's old numbers].",
          pills: ['spots factual mistakes', "other side's old numbers", 'shows flawed reasoning', 'weak basis'],
          connectors: ['However,', 'Look closely,', 'In fact,'],
        },
        panel_3: {
          caption: 'Speakers counter weak claims with real, checked studies.',
          sentence_frame: 'Debaters [share recent real studies] to [counter a false claim].',
          pills: ['share recent real studies', 'counter a false claim', 'checked survey data', 'verified facts'],
          connectors: ['On the contrary,', 'However,', 'Real data shows that'],
        },
        panel_4: {
          sentence_frame: 'A clear rebuttal [answers the opposing claim] and [proves the validity of our idea].',
          pills: ['answers the opposing claim', 'proves the validity of our idea', 'convinces the judges', 'clear conclusion'],
        },
      },
    },
    speakingPatch: {
      talkshow_prompt: {
        model_response:
          "Simply repeating your first speech tells judges you did not listen! A real rebuttal answers what your opponent just said. Using 'They say... but I say...' shows you heard their point, spotted the mistake, and brought better facts to answer it.",
      },
      table_a: {
        field_a2: {
          nova_reply: 'Whether cities should switch to 100 percent clean energy by 2035.',
        },
        field_a5: {
          nova_reply: 'Because she answered the other team’s numbers politely without personal insults.',
        },
      },
      table_b: {
        title: "Judge Miller's Debate Score Sheet",
        field_b2: {
          value: 'Direct answers to opposing points and clear, fair facts.',
          acceptable_answers: [
            'Direct answers to opposing points and clear, fair facts.',
            'Direct answers and clear facts.',
            'Fair logic and facts.',
          ],
        },
        field_b4: {
          value: 'Nora won best speaker for her clear, polite rebuttal answers.',
          acceptable_answers: [
            'Nora won best speaker for her clear, polite rebuttal answers.',
            'Nora.',
            'Nora won best speaker.',
          ],
        },
        field_b5: {
          value: 'Because personal insults attack the person instead of the idea and lose points.',
          acceptable_answers: [
            'Because personal insults attack the person instead of the idea and lose points.',
            'They attack the person instead of the idea.',
            'Personal insults lose points.',
          ],
        },
      },
    },
    drillsPatch: [
      {
        idx: 0,
        explanation: "Use 'On the contrary,' to show the claim before it was wrong and the opposite is true.",
      },
      { idx: 1, sentence: 'While opponents say clean power costs a lot, long-term savings are much bigger.' },
      { idx: 2, sentence: 'They claim space travel wastes money, but evidence shows it creates useful health tools.' },
      { idx: 3, sentence: 'Debaters should disagree with ideas politely without attacking the other speaker.' },
      { idx: 4, sentence: 'If the starting premise is invalid, the final conclusion fails too.' },
    ],
    scienceLabPatch: {
      stage1Instruction: "Separate an opponent's claim from checked rebuttal facts.",
    },
  },

  133: {
    vocabPatch: {
      statistic: {
        definition_en: 'A number fact collected from a study or survey',
        example_en: 'One clear statistic showed that seventy percent of middle school students play games.',
        example_vi: 'Một số liệu thống kê rõ ràng cho thấy bảy mươi phần trăm học sinh THCS chơi game.',
      },
      percent: {
        example_en: 'Only twelve percent of students in the survey felt tired the next morning.',
        example_vi: 'Chỉ mười hai phần trăm học sinh tham gia khảo sát cảm thấy mệt vào sáng hôm sau.',
      },
      study: {
        definition_en: 'A careful research project looking into a topic',
        example_en: 'A four-year school study followed how students spend free time after class.',
        example_vi: 'Một nghiên cứu kéo dài bốn năm theo dõi cách học sinh dùng thời gian rảnh sau giờ học.',
      },
      data: {
        example_en: 'Real survey data gives speakers checked numbers they can trust in a debate.',
        example_vi: 'Dữ liệu khảo sát thực tế mang lại những con số đáng tin cậy trong tranh biện.',
      },
      majority: {
        example_en: 'The large majority of students said team games helped them make friends.',
        example_vi: 'Phần lớn học sinh cho biết trò chơi đồng đội giúp các em kết bạn.',
      },
      minority: {
        example_en: 'Only a small minority of players stayed up late playing on school nights.',
        example_vi: 'Chỉ một thiểu số nhỏ người chơi thức khuya chơi game vào tối đi học.',
      },
      survey: {
        definition_en: 'A set of questions asked to many people to collect facts',
        example_en: 'Our school club ran an online survey asking four hundred students about hobbies.',
        example_vi: 'Câu lạc bộ trường tôi đã thực hiện khảo sát trực tuyến hỏi bốn trăm học sinh về sở thích.',
      },
      population: {
        definition_en: 'The whole group of people that a study wants to learn about',
        example_en: 'We chose students from every grade so our sample matched the whole school population.',
        example_vi: 'Chúng tôi chọn học sinh từ mọi khối lớp để mẫu khớp với toàn bộ học sinh của trường.',
      },
      sample: {
        example_en: 'Researchers picked a fair sample of one hundred students from five classes.',
        example_vi: 'Các nhà nghiên cứu chọn một mẫu công bằng gồm một trăm học sinh từ năm lớp.',
      },
      quantitative: {
        example_en: 'Quantitative studies use counted numbers and percentages instead of guesses.',
        example_vi: 'Nghiên cứu định lượng dùng các con số đếm được và tỷ lệ phần trăm thay vì phỏng đoán.',
      },
      methodology: {
        definition_en: 'A clear, step-by-step plan for doing a study or survey',
        example_en: 'Our club shared its full methodology so other classes could repeat the same steps.',
        example_vi: 'Câu lạc bộ của chúng tôi chia sẻ đầy đủ phương pháp để các lớp khác làm lại đúng các bước.',
      },
      findings: {
        example_en: 'Our survey findings showed that most players finish homework before playing.',
        example_vi: 'Kết quả khảo sát cho thấy hầu hết người chơi đều làm xong bài tập trước khi chơi.',
      },
      correlation: {
        example_en: 'Scientists noticed a correlation between late screen time and sleepy mornings.',
        example_vi: 'Các nhà khoa học nhận thấy mối liên hệ giữa việc xem màn hình khuya và buổi sáng buồn ngủ.',
      },
      variable: {
        example_en: 'Hours of sleep was one important variable we tracked in our class chart.',
        example_vi: 'Số giờ ngủ là một biến số quan trọng chúng tôi theo dõi trên biểu đồ của lớp.',
      },
      analyze: {
        definition_en: 'To study numbers or facts carefully to understand what they show',
        example_en: 'Students use simple bar charts to analyze answers from their class survey.',
        example_vi: 'Học sinh dùng biểu đồ cột đơn giản để phân tích câu trả lời từ khảo sát lớp.',
      },
      respondent: {
        example_en: 'Each respondent answered ten short questions about after-school screen time.',
        example_vi: 'Mỗi người trả lời đã hoàn thành mười câu hỏi ngắn về thời gian dùng màn hình sau giờ học.',
      },
      metric: {
        example_en: 'Hours played per week was our main metric in the school survey.',
        example_vi: 'Số giờ chơi mỗi tuần là chỉ số chính trong khảo sát của trường.',
      },
      empirical: {
        definition_en: 'Based on real facts and tests you can actually check',
        example_en: "Empirical evidence—real facts you can check—is stronger than one person's guess.",
        example_vi: 'Bằng chứng thực nghiệm—những sự thật kiểm chứng được—mạnh hơn lời đoán của một người.',
      },
      hypothesis: {
        example_en: 'Our club tested the hypothesis that team games help students cooperate better.',
        example_vi: 'Câu lạc bộ kiểm tra giả thuyết rằng trò chơi đồng đội giúp học sinh hợp tác tốt hơn.',
      },
      frequency: {
        example_en: 'The survey asked about the weekly frequency of team games after school.',
        example_vi: 'Khảo sát hỏi về tần suất chơi game đồng đội hằng tuần sau giờ học.',
      },
    },
    shadowing: [
      {
        id: 1,
        text: 'According to a study by university researchers, seventy percent of middle school students play games.',
        vi: 'Theo một nghiên cứu của các nhà nghiên cứu đại học, bảy mươi phần trăm học sinh THCS chơi game.',
        ipa: '/əˈkɔːrdɪŋ tuː ə ˈstʌdi baɪ ˌjuːnəˈvɜːrsəti rɪˈsɜːrtʃərz ˈsevənti pərˈsent əv ˈmɪdl skuːl ˈstuːdənts pleɪ ɡeɪmz/',
      },
      {
        id: 2,
        text: 'The class survey data showed that a large majority play friendly team games.',
        vi: 'Dữ liệu khảo sát của lớp cho thấy phần lớn học sinh chơi các trò chơi đồng đội thân thiện.',
        ipa: '/ðə klæs ˈsɜːrveɪ ˈdeɪtə ʃoʊd ðæt ə lɑːrdʒ məˈdʒɔːrəti pleɪ ˈfrendli tiːm ɡeɪmz/',
      },
      {
        id: 3,
        text: 'Statistics show that only a small minority have trouble sleeping on school nights.',
        vi: 'Số liệu thống kê cho thấy chỉ một thiểu số nhỏ gặp khó khăn khi ngủ vào tối đi học.',
        ipa: '/stəˈtɪstɪks ʃoʊ ðæt ˈoʊnli ə smɔːl maɪˈnɔːrəti hæv ˈtrʌbl ˈsliːpɪŋ ɑːn skuːl naɪts/',
      },
      {
        id: 4,
        text: 'Researchers studied a fair random sample of two thousand middle school respondents.',
        vi: 'Các nhà nghiên cứu đã khảo sát một mẫu ngẫu nhiên công bằng gồm hai nghìn học sinh THCS.',
        ipa: '/rɪˈsɜːrtʃərz ˈstʌdid ə fer ˈrændəm ˈsæmpəl əv tuː ˈθaʊzənd ˈmɪdl skuːl rɪˈspɑːndənts/',
      },
      {
        id: 5,
        text: 'Empirical evidence uses real facts we can check instead of personal guesses.',
        vi: 'Bằng chứng thực nghiệm dùng những sự thật kiểm chứng được thay cho phỏng đoán cá nhân.',
        ipa: '/ɪmˈpɪrɪkəl ˈevɪdəns ˈjuːzɪz riːl fækts wi kæn tʃek ɪnˈsted əv ˈpɜːrsənəl ˈɡesɪz/',
      },
      {
        id: 6,
        text: 'The chart shows a correlation between late-night gaming and feeling tired at school.',
        vi: 'Biểu đồ cho thấy mối liên hệ giữa việc chơi game khuya và cảm giác mệt mỏi ở trường.',
        ipa: '/ðə tʃɑːrt ʃoʊz ə ˌkɔːrəˈleɪʃən bɪˈtwiːn leɪt naɪt ˈɡeɪmɪŋ ænd ˈfiːlɪŋ ˈtaɪərd æt skuːl/',
      },
      {
        id: 7,
        text: 'Sharing your exact methodology helps other students repeat the same survey safely.',
        vi: 'Chia sẻ phương pháp chính xác giúp học sinh khác lặp lại đúng cuộc khảo sát đó.',
        ipa: '/ˈʃerɪŋ jʊr ɪɡˈzækt ˌmeθəˈdɑːlədʒi helps ˈʌðər ˈstuːdənts rɪˈpiːt ðə seɪm ˈsɜːrveɪ ˈseɪfli/',
      },
      {
        id: 8,
        text: 'Careful data checking helps students test health claims with real numbers.',
        vi: 'Kiểm tra dữ liệu cẩn thận giúp học sinh kiểm chứng các nhận định sức khỏe bằng con số thực.',
        ipa: '/ˈkerfəl ˈdeɪtə ˈtʃekɪŋ helps ˈstuːdənts test helθ kleɪmz wɪð riːl ˈnʌmbərz/',
      },
    ],
    storyScenesPatch: {
      5: {
        title_en: 'Sharing the Checked Report',
        title: 'Sharing the Checked Report',
        description_en: 'Their school science teacher approves their empirical report for the class fair.',
      },
    },
    rwPart2Patch: {
      1: {
        answer: 'It connects data to a real study that listeners can easily check.',
      },
      2: {
        answer: 'Seventy percent of middle school students play games weekly, mostly team games.',
      },
      3: {
        answer: 'It stops unfair guesses by showing that late-night problems affect only a small minority.',
      },
      5: {
        prompt: 'How does careful research make student debate speeches stronger?',
        answer: 'It replaces personal guesses with checked empirical facts and clear numbers.',
      },
    },
    rwPart6Template:
      'In school debates, careful speakers rely [1] number data to support empirical claims. According [2] a recent study of student habits, seventy percent of kids play video games weekly. Survey data shows that a large majority [3] players enjoy team games. Next, statistics show that only a small minority [4] students lose sleep. By sharing checked facts, speakers give honest proof [5] their audience.',
    writingPatch: {
      title: 'Using Numbers and Study Findings in Debate Writing',
      prompt_en:
        "Look at the four panels. Write a short paragraph reporting survey numbers on student gaming. Use study phrases ('According to a study by...', 'Statistics show that...', 'Survey data reveals that...') and clear numbers. Write 20 or more words.",
      model_sentence:
        'According to an empirical study by school researchers, seventy percent of students play video games every week. Survey data shows that a large majority of players use team games to build friendships. In addition, statistics reveal that only a small minority lose sleep, showing that most students balance gaming and homework well.',
      sentence_frames: [
        'According to a recent ___, seventy percent of students play games weekly.',
        'The collected survey ___ reveals that a large majority play together.',
        'In addition, statistics show that only a small ___ loses sleep at night.',
        'Finally, sharing checked ___ turns a guess into strong proof.',
      ],
      panelOverrides: {
        panel_1: {
          caption: 'Students plan a short survey to test ideas with real school data.',
          sentence_frame: 'Students [test an empirical hypothesis] to [check how gaming affects study time].',
          pills: ['test an empirical hypothesis', 'check how gaming affects study time', 'short survey questions', 'fair student sample'],
        },
        panel_2: {
          caption: 'A fair random sample of students answers the short online survey.',
          sentence_frame: 'A fair student sample [answers the short online survey] to [share true number facts].',
          pills: ['answers the short online survey', 'share true number facts', 'randomized student sample', 'fair school group'],
          connectors: ['Survey data shows,', 'In addition,', 'Also,'],
          ladderTitle: 'Stage 2: Collecting Survey Answers',
        },
        panel_3: {
          caption: 'Simple charts show that seventy percent of gamers keep strong grades.',
          sentence_frame: 'Data charts [show that a large majority] of [gamers keep strong school grades].',
          pills: ['show that a large majority', 'gamers keep strong school grades', 'simple pie charts', 'seventy percent result'],
          connectors: ['According to the data,', 'Statistics reveal that,', 'In addition,'],
        },
        panel_4: {
          title_en: 'Panel 4: Sharing Clear Study Proof',
          title_vi: 'Khung 4: Chia Sẻ Bằng Chứng Rõ Ràng',
          caption: 'Clear citation phrases base your points on checked facts.',
          sentence_frame: 'Clear citation phrases [turn personal guesses into] an [honest fact-based report].',
          pills: ['turn personal guesses into', 'honest fact-based report', 'clear citation phrases', 'checked school facts'],
          connectors: ['In conclusion,', 'Finally,', 'Because of this,'],
          frame_L1: 'Using real statistics makes our writing trusted. Empirical evidence proves that guesses about gaming can be false.',
        },
      },
    },
    speakingPatch: {
      talkshow_prompt: {
        question: 'Hannah, why are real survey statistics stronger than telling just one personal story?',
        model_response:
          "Personal stories are interesting, but they only show one person's life! When you say: 'According to a survey of two thousand students, seventy percent play team games and only twelve percent lose sleep,' you describe the whole group. Clear number facts stop people from saying your idea is only a personal guess.",
      },
      table_a: {
        title: "Hannah's Student Gaming Survey",
        field_a1: {
          cue_prompt: 'where / student gaming survey done?',
          acceptable_questions: [
            'Where was the student gaming survey done?',
            'Where was the survey held?',
            'Where did Hannah do the gaming survey?',
          ],
          nova_reply: 'Across fifteen middle schools in our city district.',
        },
        field_a5: {
          nova_reply: 'Because checked numbers support claims and answer hard questions.',
        },
      },
      table_b: {
        field_b1: {
          value: "On the school science club's public data page.",
          acceptable_answers: [
            "On the school science club's public data page.",
            'On the public data page.',
            'School data page.',
          ],
        },
        field_b2: {
          cue_prompt: 'what / percent of gamers play team games?',
          value: 'Sixty-eight percent say they play friendly team games.',
          nova_question: 'What percent of gamers play team games?',
          acceptable_answers: [
            'Sixty-eight percent say they play friendly team games.',
            'Sixty-eight percent.',
            '68 percent.',
          ],
        },
        field_b3: {
          cue_prompt: 'how / researchers pick a fair student group?',
          value: 'By picking students at random from different schools and neighborhoods.',
          nova_question: 'How did researchers pick a fair student group?',
          acceptable_answers: [
            'By picking students at random from different schools and neighborhoods.',
            'Random picking across different schools.',
            'Fair random student group.',
          ],
        },
        field_b4: {
          cue_prompt: 'who / paid for the multi-year study?',
          value: "The National Science Foundation and the Children's Health Foundation.",
          nova_question: 'Who paid for the multi-year study?',
          acceptable_answers: [
            "The National Science Foundation and the Children's Health Foundation.",
            'National Science Foundation.',
            "NSF and Children's Health Foundation.",
          ],
        },
        field_b5: {
          value: 'So we do not assume one habit directly causes every sleep problem.',
          acceptable_answers: [
            'So we do not assume one habit directly causes every sleep problem.',
            'To avoid false cause guesses.',
            'To stop assuming gaming causes every sleep problem.',
          ],
        },
      },
    },
    drillsPatch: [
      { idx: 0, sentence: 'According to a study by university researchers, seventy percent play video games.' },
      { idx: 1, sentence: 'Statistics demonstrate that only a small minority feels tired in the morning.' },
      { idx: 3, sentence: 'Researchers analyzed a fair random sample of two thousand students.' },
      { idx: 4, sentence: 'A large majority of students reported better teamwork skills.' },
    ],
    scienceLabPatch: {
      stage1Items: [
        { label: 'Grade 6-8 Student Pool', target: 'population_pool' },
        { label: 'Clear Short Survey', target: 'survey_tool' },
        { label: '100 Chosen Respondents', target: 'sample_group' },
      ],
      stage2Title: 'Counting Answers and Percentages',
      stage2Instruction: 'Turn raw survey counts into clear percentages.',
      stage3Title: 'Sharing Real Study Proof',
      stage3Instruction: 'Put a clear source citation together for your speech.',
      stage3Items: [
        { label: 'Source Citation Tag', target: 'intro_clause' },
        { label: 'Class Survey Number Fact', target: 'statistic_core' },
        { label: 'Clear Evidence Sentence', target: 'impact_clause' },
      ],
    },
  },

  134: {
    vocabPatch: {
      fallacy: {
        example_en: "Saying 'all gamers are lazy' is an unfair hasty generalization fallacy.",
        example_vi: "Nói rằng 'mọi người chơi game đều lười' là một ngụy biện khái quát vội vàng thiếu công bằng.",
      },
      generalization: {
        example_en: 'Do not make a broad generalization after seeing only two examples.',
        example_vi: 'Đừng vội khái quát chung chung chỉ sau khi nhìn thấy hai ví dụ.',
      },
      assumption: {
        example_en: 'Her whole objection used the false assumption that phones never help learning.',
        example_vi: 'Toàn bộ ý kiến phản đối của cô ấy dựa trên giả định sai rằng điện thoại không bao giờ giúp học tập.',
      },
      true: {
        example_en: 'An argument works only when its starting facts are actually true.',
        example_vi: 'Một lập luận chỉ vững khi các dữ kiện mở đầu của nó thật sự đúng.',
      },
      false: {
        example_en: 'Sharing false numbers in a school debate costs your team points.',
        example_vi: 'Đưa số liệu sai trong buổi tranh biện của trường sẽ làm đội bạn mất điểm.',
      },
      valid: {
        definition_en: 'Based on true facts and clear, sensible thinking',
        example_en: 'Her conclusion was valid because it followed clearly from two true facts.',
        example_vi: 'Kết luận của cô ấy hợp lý vì nó suy ra rõ ràng từ hai sự thật đúng.',
      },
      invalid: {
        example_en: 'An invalid argument fails because its logic step is broken.',
        example_vi: 'Một lập luận không hợp lệ sẽ thất bại vì bước suy luận của nó bị sai.',
      },
      logic: {
        example_en: 'Learning simple logic helps students tell strong proof from weak tricks.',
        example_vi: 'Học logic cơ bản giúp học sinh phân biệt bằng chứng vững với mẹo lập luận yếu.',
      },
      premise: {
        example_en: 'If a speaker starts with a wrong premise, their final conclusion fails.',
        example_vi: 'Nếu người nói bắt đầu từ một tiền đề sai, kết luận cuối cùng sẽ sai.',
      },
      conclusion: {
        example_en: 'Our final conclusion was supported by three separate class surveys.',
        example_vi: 'Kết luận cuối cùng của chúng tôi được ủng hộ bởi ba khảo sát lớp độc lập.',
      },
      flaw: {
        example_en: 'The teacher pointed out a clear flaw in the first team’s example.',
        example_vi: 'Giáo viên chỉ ra một lỗ hổng rõ ràng trong ví dụ của đội thứ nhất.',
      },
      stereotype: {
        example_en: 'Believing a lazy stereotype makes us miss how different each student is.',
        example_vi: 'Tin vào định kiến rập khuôn khiến ta bỏ qua sự khác biệt của từng học sinh.',
      },
      deduction: {
        example_en: 'Using careful deduction, the student detective ruled out three wrong answers.',
        example_vi: 'Nhờ suy diễn cẩn thận, học sinh thám tử loại bỏ được ba đáp án sai.',
      },
      reasoning: {
        example_en: 'Fair reasoning means thinking about how a new rule affects every student.',
        example_vi: 'Suy luận công bằng nghĩa là nghĩ xem quy định mới ảnh hưởng thế nào đến mọi học sinh.',
      },
      claim: {
        definition_en: 'A statement saying something is true that still needs proof',
        example_en: 'Before believing a surprising claim, ask to see real facts first.',
        example_vi: 'Trước khi tin một tuyên bố gây ngạc nhiên, hãy hỏi xem sự thật trước đã.',
      },
      bias: {
        definition_en: 'An unfair feeling for or against one side before checking the facts',
        example_en: 'Good researchers avoid personal bias when checking survey results.',
        example_vi: 'Người nghiên cứu giỏi tránh thiên vị cá nhân khi kiểm tra kết quả khảo sát.',
      },
      hasty: {
        definition_en: 'Done too fast without taking time to think or check',
        example_en: 'Making a hasty guess from one short talk is an easy mistake.',
        example_vi: 'Đưa ra phán đoán vội vàng chỉ từ một cuộc trò chuyện ngắn là lỗi dễ mắc phải.',
      },
      misleading: {
        example_en: 'The ad used misleading numbers to make a weak drink sound healthy.',
        example_vi: 'Quảng cáo dùng những con số gây hiểu lầm để làm món đồ uống yếu nghe có vẻ tốt cho sức khỏe.',
      },
      soundness: {
        definition_en: 'Having both true starting facts and valid step-by-step logic',
        example_en: 'Judges check the soundness of an argument by testing both facts and logic.',
        example_vi: 'Giám khảo kiểm tra tính vững chắc của lập luận bằng cách xem cả sự thật lẫn logic.',
      },
      argumentation: {
        definition_en: 'Building clear reasons and proof to support your point in a debate',
        example_en: "Careful argumentation uses words like 'many' and 'often' instead of 'always'.",
        example_vi: "Cách lập luận cẩn thận dùng các từ như 'many' và 'often' thay cho 'always'.",
      },
    },
    shadowing: [
      {
        id: 1,
        text: 'Saying that all video gamers are lazy is an invalid generalization fallacy.',
        vi: 'Nói rằng tất cả người chơi game đều lười là một ngụy biện khái quát không hợp lệ.',
        ipa: '/ˈseɪɪŋ ðæt ɔːl ˈvɪdioʊ ˈɡeɪmərz ɑːr ˈleɪzi ɪz æn ɪnˈvælɪd ˌdʒenrələˈzeɪʃən ˈfæləsi/',
      },
      {
        id: 2,
        text: 'Careful thinkers use words like some, many, and often to keep claims fair.',
        vi: 'Người suy nghĩ cẩn thận dùng những từ như một số, nhiều và thường để giữ nhận định công bằng.',
        ipa: '/ˈkerfəl ˈθɪŋkərz juːz wɜːrdz laɪk sʌm ˈmeni ænd ˈɔːfən tuː kiːp kleɪmz fer/',
      },
      {
        id: 3,
        text: 'An argument is valid only when its starting premises are really true.',
        vi: 'Một lập luận chỉ hợp lệ khi các tiền đề mở đầu của nó thật sự đúng.',
        ipa: '/æn ˈɑːrɡjəmənt ɪz ˈvælɪd ˈoʊnli wen ɪts ˈstɑːrtɪŋ ˈpremɪsɪz ɑːr ˈriːəli truː/',
      },
      {
        id: 4,
        text: 'Making a hasty conclusion from one example creates unfair stereotypes.',
        vi: 'Rút ra kết luận vội vàng từ một ví dụ tạo ra những định kiến thiếu công bằng.',
        ipa: '/ˈmeɪkɪŋ ə ˈheɪsti kənˈkluːʒən frʌm wʌn ɪɡˈzæmpəl kriˈeɪts ʌnˈfer ˈsteriətaɪps/',
      },
      {
        id: 5,
        text: 'Many middle school players tend to build strong teamwork problem solving skills.',
        vi: 'Nhiều người chơi cấp trung học có xu hướng xây dựng kỹ năng giải quyết vấn đề theo nhóm tốt.',
        ipa: '/ˈmeni ˈmɪdl skuːl ˈpleɪərz tend tuː bɪld strɔːŋ ˈtiːmwɜːrk ˈprɑːbləm ˈsɑːlvɪŋ skɪlz/',
      },
      {
        id: 6,
        text: 'We must check whether proof is real before believing surprising claims.',
        vi: 'Chúng ta phải kiểm tra xem bằng chứng có thật không trước khi tin các tuyên bố gây ngạc nhiên.',
        ipa: '/wi mʌst tʃek ˈweðər pruːf ɪz riːl bɪˈfɔːr bɪˈliːvɪŋ sərˈpraɪzɪŋ kleɪmz/',
      },
      {
        id: 7,
        text: 'Spotting logic flaws protects students from tricky ads and false rumors.',
        vi: 'Nhận ra lỗi logic giúp học sinh tránh được quảng cáo đánh lừa và tin đồn sai.',
        ipa: '/ˈspɑːtɪŋ ˈlɑːdʒɪk flɔːz prəˈtekts ˈstuːdənts frʌm ˈtrɪki ædz ænd fɔːls ˈruːmərz/',
      },
      {
        id: 8,
        text: 'Good critical thinking leads to honest, fair, and polite school debates.',
        vi: 'Tư duy phản biện tốt dẫn đến những buổi tranh biện ở trường trung thực, công bằng và lịch sự.',
        ipa: '/ɡʊd ˈkrɪtɪkəl ˈθɪŋkɪŋ liːdz tuː ˈɑːnɪst fer ænd pəˈlaɪt skuːl dɪˈbeɪts/',
      },
    ],
    storyScenesPatch: {
      3: {
        title_en: 'Using Careful Words',
        title: 'Using Careful Words',
        description_en: "Liam fixes the newspaper line using careful words: 'Some late gaming hurts sleep, but many games build skills.'",
      },
      5: {
        description_en: 'Zoe and Liam present their fallacy check to the school debate club, winning claps for their careful work.',
      },
    },
    rwPart2Patch: {
      1: {
        answer: 'It is a hasty generalization that applies an unfair stereotype to a whole group of people.',
      },
      2: {
        prompt: "How can a speaker answer an extreme claim that uses the word 'never'?",
        answer: 'By showing one clear real example that proves the extreme statement wrong.',
      },
      3: {
        prompt: 'Which careful words help us make fair, sound arguments?',
        answer: "Careful words like 'some', 'many', 'often', and 'tend to'.",
      },
      4: {
        answer: 'A valid argument has clear logic steps, while a sound argument also has true starting facts.',
      },
      5: {
        prompt: 'Why is spotting fallacies a helpful skill in everyday life?',
        answer: 'It protects us from misleading ads, weak rumors, and biased thinking.',
      },
    },
    rwPart6Template:
      "Careful thinking helps students spot flaws in argumentation. When someone says all gamers are lazy, they make [1] hasty generalization fallacy. This invalid claim rests on [2] false assumption. Instead of extreme words like 'always', smart speakers use careful words such [3] 'some' and 'often'. An argument stays sound only when its facts are true and its logic works. These skills protect students [4] unfair tricks and help polite debate [5] school.",
    writingPatch: {
      model_sentence:
        'Claiming that all video gamers are lazy is an invalid hasty generalization fallacy. This weak assumption ignores real research showing that many gamers build problem-solving and teamwork skills. To keep arguments sound, careful speakers use words like some and often so their points stay fair.',
      sentence_frames: [
        'Claiming that all gamers are lazy is a classic hasty ___ fallacy.',
        'This invalid point rests on a completely false ___.',
        'In contrast, real studies show that ___ players build strong teamwork skills.',
        "Finally, using words like 'often' and 'tend to' keeps our logic ___.",
      ],
      panelOverrides: {
        panel_1: {
          title_en: 'Panel 1: Spotting Extreme All-or-Never Claims',
          title_vi: 'Khung 1: Nhận Diện Khẳng Định Tuyệt Đối',
          caption: 'Words like all and never often show an unfair generalization.',
          sentence_frame: 'The writer [makes an extreme all-group claim] that [all video gamers feel lazy].',
          pills: ['makes an extreme all-group claim', 'all video gamers feel lazy', 'broad generalization', 'unfair stereotype'],
          ladderTitle: 'Stage 1: Spotting the Unfair Claim',
        },
        panel_2: {
          sentence_frame: 'The writer [makes an invalid quick guess] from [one or two stories].',
          pills: ['makes an invalid quick guess', 'one or two stories', 'weak premise', 'logic fallacy'],
          connectors: ['However,', 'Look closely,', 'In fact,'],
        },
        panel_3: {
          title_en: 'Panel 3: Using Careful Qualifying Words',
          title_vi: 'Khung 3: Dùng Từ Giới Hạn Cẩn Thận',
          caption: 'Careful words like some and often replace extreme words like always.',
          sentence_frame: 'Careful speakers [replace extreme all-or-never words] with [careful words like some and often].',
          pills: ['replace extreme all-or-never words', 'careful words like some and often', 'fair and accurate facts', 'avoids generalization'],
        },
        panel_4: {
          title_en: 'Panel 4: Building Fair, Sound Logic',
          title_vi: 'Khung 4: Xây Dựng Lập Luận Vững Chắc',
          caption: 'True starting facts and fair logic build honest school debates.',
          sentence_frame: 'Fair argumentation [makes sure conclusions follow] from [true checked facts].',
          pills: ['makes sure conclusions follow', 'true checked facts', 'clear logic soundness', 'honest school debate'],
          connectors: ['Finally,', 'In conclusion,', 'Because of this,'],
          ladderTitle: 'Stage 4: Building Fair, Sound Logic',
        },
      },
    },
    speakingPatch: {
      talkshow_prompt: {
        model_response:
          "A hasty generalization is tempting because people love quick shortcuts! When someone sees one or two lazy gamers, they jump to saying 'all gamers are lazy.' But in a school debate, just one counterexample breaks an extreme 'all' or 'never' claim! Smart speakers keep their points fair by using careful words like 'many', 'some', or 'tend to' so their logic stays sound.",
      },
      table_a: {
        field_a4: {
          nova_reply: 'Mr. Arthur Pendelton, our school debate and logic coach.',
        },
      },
      table_b: {
        field_b1: {
          value: 'From the school debate club study page.',
          acceptable_answers: [
            'From the school debate club study page.',
            'From the debate club page.',
            'School debate club page.',
          ],
        },
        field_b2: {
          value: "'Some', 'often', and 'tend to' for fair claims.",
          acceptable_answers: [
            "'Some', 'often', and 'tend to' for fair claims.",
            "'Some', 'often', and 'tend to'.",
            'Some, often, tend to.',
          ],
        },
        field_b3: {
          cue_prompt: 'how / test if an argument is sound?',
          value: 'Check that all starting facts are true and every logic step is valid.',
          nova_question: 'How do debaters test whether an argument is sound?',
          acceptable_answers: [
            'Check that all starting facts are true and every logic step is valid.',
            'Check true facts and valid logic steps.',
            'Test true starting facts and logic.',
          ],
        },
        field_b4: {
          cue_prompt: 'who / wrote the early rules of step-by-step logic?',
          value: 'Aristotle wrote the early rules of step-by-step logic.',
          nova_question: 'Who wrote the early rules of step-by-step logic?',
          acceptable_answers: [
            'Aristotle wrote the early rules of step-by-step logic.',
            'Aristotle.',
            'Ancient thinker Aristotle.',
          ],
        },
        field_b5: {
          value: 'To check claims fairly and spot tricky ads or rumors.',
          acceptable_answers: [
            'To check claims fairly and spot tricky ads or rumors.',
            'To check claims fairly and avoid tricks.',
            'To spot unfair tricks.',
          ],
        },
      },
    },
    drillsPatch: [
      { idx: 0, sentence: 'Many middle school players tend to build strong teamwork skills.' },
      { idx: 1, sentence: 'Saying that all gamers are lazy is an invalid generalization.' },
      { idx: 2, sentence: 'Careful thinkers use words such as some, many, and often.' },
      { idx: 3, sentence: 'An argument works only when its starting premises are true.' },
    ],
    scienceLabPatch: {
      stage2Items: [
        { label: 'Personal Comment Card', target: 'discard_bin' },
        { label: 'Policy Evidence Card', target: 'analysis_table' },
        { label: 'Fair Checked Statement', target: 'debate_ledger' },
      ],
    },
  },
};

function serializeHeader(origText) {
  const idx = origText.indexOf('\nexport const ');
  return idx !== -1 ? origText.slice(0, idx + 1) : '';
}

function serializeFooter(origText, varName) {
  if (origText.includes('readingHubData.rw_part_1')) {
    return `\nreadingHubData.rw_part_1 = readingHubData.rw_part1;\nreadingHubData.rw_part_2 = readingHubData.rw_part2;\nreadingHubData.rw_part_6 = readingHubData.rw_part6;\n\nexport default readingHubData;\n`;
  }
  return `\nexport default ${varName};\n`;
}

for (const w of [126, 127, 133, 134]) {
  const dir = path.join(BASE_DIR, `week_${w}`);
  const u = UPDATES[w];

  const rhPath = path.join(dir, 'reading_hub.js');
  const vhPath = path.join(dir, 'vocab.js');
  const lhPath = path.join(dir, 'listening_hub.js');
  const whPath = path.join(dir, 'writing_hub.js');
  const shPath = path.join(dir, 'speaking_hub.js');
  const spPath = path.join(dir, 'skill_practice_hub.js');
  const provPath = path.join(dir, 'provenance.json');

  const rhOrig = fs.readFileSync(rhPath, 'utf8');
  const vhOrig = fs.readFileSync(vhPath, 'utf8');
  const lhOrig = fs.readFileSync(lhPath, 'utf8');
  const whOrig = fs.readFileSync(whPath, 'utf8');
  const shOrig = fs.readFileSync(shPath, 'utf8');
  const spOrig = fs.readFileSync(spPath, 'utf8');

  const rh = (await import(`${rhPath}?v=${Date.now()}`)).default;
  const vh = (await import(`${vhPath}?v=${Date.now()}`)).default;
  const lh = (await import(`${lhPath}?v=${Date.now()}`)).default;
  const wh = (await import(`${whPath}?v=${Date.now()}`)).default;
  const sh = (await import(`${shPath}?v=${Date.now()}`)).default;
  const sp = (await import(`${spPath}?v=${Date.now()}`)).default;

  // 1. Vocab update in BOTH reading_hub.js and vocab.js
  for (const item of rh.vocab) {
    const p = u.vocabPatch[item.word];
    if (p) {
      if (p.definition_en) item.definition_en = p.definition_en;
      if (p.example_en) item.example_en = p.example_en;
      if (p.example_vi) item.example_vi = p.example_vi;
    }
    const target = item.word.toLowerCase();
    if (!item.example_en.toLowerCase().includes(target)) {
      throw new Error(`W${w} vocab[${item.word}] missing target word in example_en: ${item.example_en}`);
    }
  }
  const vhArr = vh.vocab || vh;
  for (const item of vhArr) {
    const match = rh.vocab.find((x) => x.word === item.word);
    if (match) {
      item.definition_en = match.definition_en;
      item.example_en = match.example_en;
      item.example_vi = match.example_vi;
    }
  }

  // 2. Shadowing & Listening Hub (sync 1:1)
  const newShadow = u.shadowing.map((s) => ({
    id: s.id,
    text: s.text,
    en: s.text,
    vi: s.vi,
    ipa: s.ipa,
    words: makeWordChips(s.text),
  }));
  rh.shadowingData.sentences = newShadow;
  lh.shadowing_sentences = JSON.parse(JSON.stringify(newShadow));
  lh.passage_audio_script =
    `Narrator: Cambridge B1+ Academic Listening Practice for Week ${w}. Theme: ${rh.theme}.\n` +
    newShadow.map((s) => `Speaker: ${s.text}`).join('\n');

  // 3. Story scenes
  if (u.storyScenesPatch) {
    for (const scene of rh.story_scenes) {
      const spatch = u.storyScenesPatch[scene.scene_number || scene.id];
      if (spatch) {
        if (spatch.title_en) {
          scene.title_en = spatch.title_en;
        }
        if (spatch.description_en) {
          scene.description_en = spatch.description_en;
          scene.description = spatch.description_en;
        }
      }
    }
  }

  // 4. rw_part2
  if (u.rwPart2Patch) {
    for (const turn of rh.rw_part2.turns) {
      const tpatch = u.rwPart2Patch[turn.id];
      if (tpatch) {
        if (tpatch.prompt) turn.prompt = tpatch.prompt;
        if (tpatch.answer) {
          const oldAns = turn.answer;
          turn.answer = tpatch.answer;
          turn.options = turn.options.map((opt) => (opt === oldAns ? tpatch.answer : opt));
          if (!turn.options.includes(turn.answer)) {
            throw new Error(`W${w} rw_part2 turn ${turn.id} answer not in options`);
          }
        }
      }
    }
  }

  // 5. rw_part6
  if (u.rwPart6Template) {
    rh.rw_part6.text_template = u.rwPart6Template;
    for (const k of ['1', '2', '3', '4', '5']) {
      if (!rh.rw_part6.text_template.includes(`[${k}]`)) {
        throw new Error(`W${w} rw_part6 missing [${k}]`);
      }
    }
  }

  // 6. Writing Hub
  const ps = wh.picture_story;
  if (u.writingPatch.title) ps.title = u.writingPatch.title;
  ps.model_sentence = u.writingPatch.model_sentence;
  ps.sentence_frames = u.writingPatch.sentence_frames;
  for (const pan of ps.panels) {
    const ov = u.writingPatch.panelOverrides?.[pan.panel_id];
    if (ov) {
      if (ov.title_en) pan.title_en = ov.title_en;
      if (ov.title_vi) pan.title_vi = ov.title_vi;
      if (ov.image_prompt) pan.image_prompt = ov.image_prompt;
      if (ov.caption) pan.caption = ov.caption;
      if (ov.sentence_frame) pan.sentence_frame = ov.sentence_frame;
      if (ov.pills) pan.pills = ov.pills;
      if (ov.connectors) pan.connectors = ov.connectors;
    }
  }
  // Sync ladder_stages captions/sentence_frames/connectors/pills cleanly with panels
  if (Array.isArray(ps.ladder_stages)) {
    ps.ladder_stages.forEach((st, idx) => {
      const panId = `panel_${idx + 1}`;
      const ov = u.writingPatch.panelOverrides?.[panId];
      if (ov) {
        if (ov.ladderTitle) st.title = ov.ladderTitle;
        if (ov.caption) st.caption = ov.caption;
        if (ov.sentence_frame) st.sentence_frame = ov.sentence_frame;
        if (ov.pills) st.pills = [...ov.pills];
        if (ov.connectors) st.connectors = ov.connectors;
        if (ov.frame_L1) st.frame_L1 = ov.frame_L1;
      }
    });
  }

  // Strict panel & ladder sentence_frame <-> pills alignment assertion
  for (const [label, coll] of [
    ['panel', ps.panels],
    ['ladder_stage', ps.ladder_stages || []],
  ]) {
    for (const item of coll) {
      const slots = [...(item.sentence_frame || '').matchAll(/\[([^\]]+)\]/g)].map((m) => m[1]);
      for (const s of slots) {
        if (!Array.isArray(item.pills) || !item.pills.includes(s)) {
          throw new Error(`W${w} ${label} "${item.panel_id || item.title}" slot [${s}] missing from pills: ${JSON.stringify(item.pills)}`);
        }
      }
    }
  }

  // 7. Speaking Hub
  if (u.speakingPatch) {
    if (u.speakingPatch.talkshow_prompt) {
      Object.assign(sh.talkshow_prompt, u.speakingPatch.talkshow_prompt);
    }
    for (const tblKey of ['table_a', 'table_b']) {
      const tblPatch = u.speakingPatch[tblKey];
      if (!tblPatch) continue;
      const tbl = sh.info_exchange_cards[tblKey];
      if (tblPatch.title) tbl.title = tblPatch.title;
      for (const f of tbl.fields) {
        const fp = tblPatch[f.id];
        if (fp) Object.assign(f, fp);
      }
    }
  }

  // 8. Skill Practice Hub (grammar_drills + science_lab ONLY; singapore_math UNTOUCHED)
  if (u.drillsPatch) {
    for (const dp of u.drillsPatch) {
      const d = sp.grammar_drills[dp.idx];
      if (dp.sentence) d.sentence = dp.sentence;
      if (dp.explanation) d.explanation = dp.explanation;
      if (!d.sentence.includes(d.answer)) {
        throw new Error(`W${w} drill #${dp.idx + 1} missing answer "${d.answer}" in "${d.sentence}"`);
      }
    }
  }
  if (u.scienceLabPatch) {
    if (u.scienceLabPatch.stage1Instruction) {
      sp.science_lab.scenarios[0].instruction = u.scienceLabPatch.stage1Instruction;
    }
    if (u.scienceLabPatch.stage1Items) {
      sp.science_lab.scenarios[0].items = u.scienceLabPatch.stage1Items;
    }
    if (u.scienceLabPatch.stage2Title) {
      sp.science_lab.scenarios[1].title = u.scienceLabPatch.stage2Title;
    }
    if (u.scienceLabPatch.stage2Instruction) {
      sp.science_lab.scenarios[1].instruction = u.scienceLabPatch.stage2Instruction;
    }
    if (u.scienceLabPatch.stage2Items) {
      sp.science_lab.scenarios[1].items = u.scienceLabPatch.stage2Items;
    }
    if (u.scienceLabPatch.stage3Title) {
      sp.science_lab.scenarios[2].title = u.scienceLabPatch.stage3Title;
    }
    if (u.scienceLabPatch.stage3Instruction) {
      sp.science_lab.scenarios[2].instruction = u.scienceLabPatch.stage3Instruction;
    }
    if (u.scienceLabPatch.stage3Items) {
      sp.science_lab.scenarios[2].items = u.scienceLabPatch.stage3Items;
    }
  }

  // Serialize back cleanly preserving existing exports & aliases
  const writeMod = (filePath, origText, varName, obj) => {
    if (varName === 'vocab') {
      const content =
        serializeHeader(origText) +
        `export const vocab = ${JSON.stringify(obj, null, 2)};\n` +
        `export const vocabList = vocab;\nexport const week${w}Vocab = vocab;\nexport default vocab;\n`;
      fs.writeFileSync(filePath, content, 'utf8');
      return;
    }
    const cleanObj = { ...obj };
    if (varName === 'readingHubData') {
      delete cleanObj.rw_part_1;
      delete cleanObj.rw_part_2;
      delete cleanObj.rw_part_6;
    }
    const content =
      serializeHeader(origText) +
      `export const ${varName} = ${JSON.stringify(cleanObj, null, 2)};\n` +
      serializeFooter(origText, varName);
    fs.writeFileSync(filePath, content, 'utf8');
  };

  writeMod(rhPath, rhOrig, 'readingHubData', rh);
  writeMod(vhPath, vhOrig, 'vocab', vhArr);
  writeMod(lhPath, lhOrig, 'listeningHubData', lh);
  writeMod(whPath, whOrig, 'writingHubData', wh);
  writeMod(shPath, shOrig, 'speakingHubData', sh);
  writeMod(spPath, spOrig, 'skillPracticeHubData', sp);

  const prov = JSON.parse(fs.readFileSync(provPath, 'utf8'));
  prov.review_status = 'PENDING_CLAUDE_ESL_SIGNOFF';
  prov.round85_nonclil_b1_register_rewrite = {
    round: 85,
    rewritten_at: new Date().toISOString(),
    baseline_commit: COMMIT_BASE,
    scope: 'STAGING_ONLY_NON_CLIL_B1_PLUS_REGISTER',
    updated_files: [
      `docs/agent_artifacts/staging/week_${w}/reading_hub.js`,
      `docs/agent_artifacts/staging/week_${w}/vocab.js`,
      `docs/agent_artifacts/staging/week_${w}/listening_hub.js`,
      `docs/agent_artifacts/staging/week_${w}/writing_hub.js`,
      `docs/agent_artifacts/staging/week_${w}/speaking_hub.js`,
      `docs/agent_artifacts/staging/week_${w}/skill_practice_hub.js`,
    ],
    notes: 'Rewrote flagged non-CLIL vocab definitions/examples, shadowing/dictation sentences, story/RW prompts, writing/speaking frames, and grammar/lab items to genuine CEFR B1+ register while keeping syllabus target words and math untouched.',
  };
  fs.writeFileSync(provPath, JSON.stringify(prov, null, 2) + '\n', 'utf8');
  console.log(`Updated Week ${w} staging files cleanly.`);
}
