const week26RealData = {
  week_id: 26,
  week_number: 26,
  title: "My Weekend Comic Strip",
  weekTitle_en: "My Weekend Comic Strip",
  weekTitle_vi: "Bo Truyen Tranh Cuoi Tuan Cua Toi",
  topic: "Telling a weekend story using a comic strip format with Past Simple (was/were, -ed verbs)",
  topic_vi: "Ke chuyen cuoi tuan bang dinh dang truyen tranh dung Qua Khu Don (was/were, dong tu -ed)",
  theme: "Comic strip creation, storytelling with panels, past simple review, Leo and Max at the park, speech bubbles, captions",

  grammar_focus: "Past Simple Review: was/were, regular -ed verbs, sequence words (First, Then, After that, Finally)",
  grammar_pattern: "It was ___. He/She was ___. We were ___. They visited ___. Leo played ___. We watched ___.",
  grammar_examples: [
    "Leo visited the park last Saturday.",
    "Max played with his ball for one hour.",
    "It was sunny and warm.",
    "We were tired but very happy.",
    "Leo sketched four panels and coloured them in.",
    "They watched a street performance and clapped."
  ],
  // Chunks/collocations AI must use in story_text narrative
  // Source: read.js bold chunks — multi-word phrases and high-value vocabulary
  chunk_focus: [
    "Last Saturday",
    "had a great time",
    "First",
    "After that",
    "finally",
    "comic strip",
    "wonderful way",
    "tell a story",
    "made of",
    "write a caption",
    "what is happening",
    "speech bubble",
    "create a comic strip",
    "last weekend",
    "how many",
    "around the world",
    "tell stories",
    "folk tales",
    "just like",
    "exciting adventures"
  ],
  target_vocab: [
    { word: "comic strip", pronunciation: "/ˈkɒmɪk strɪp/", definition_vi: "truyện tranh khung", definition_en: "a series of drawn panels that tell a story with captions and speech bubbles" },
    { word: "panel", pronunciation: "/ˈpænəl/", definition_vi: "khung vẽ", definition_en: "one single frame or box in a comic strip showing one moment of the story" },
    { word: "caption", pronunciation: "/ˈkæpʃən/", definition_vi: "chú thích", definition_en: "a short piece of writing that describes or explains a picture or panel" },
    { word: "speech bubble", pronunciation: "/spiːtʃ ˈbʌbəl/", definition_vi: "bong bóng lời thoại", definition_en: "a rounded shape in a comic strip that shows what a character is saying" },
    { word: "character", pronunciation: "/ˈkærɪktər/", definition_vi: "nhân vật", definition_en: "a person or animal in a story, book, film, or drawing" },
    { word: "adventure", pronunciation: "/ədˈvɛntʃər/", definition_vi: "cuộc phiêu lưu", definition_en: "an exciting and unusual experience or activity that someone has" },
    { word: "weekend", pronunciation: "/ˈwiːkɛnd/", definition_vi: "cuối tuần", definition_en: "Saturday and Sunday — the two days when most people do not go to school or work" },
    { word: "describe", pronunciation: "/dɪˈskraɪb/", definition_vi: "mô tả", definition_en: "to say or write in detail what something or someone is like" },
    { word: "scene", pronunciation: "/siːn/", definition_vi: "cảnh / khung cảnh", definition_en: "a view or particular moment from a story, event, or place" },
    { word: "create", pronunciation: "/kriˈeɪt/", definition_vi: "tạo ra / sáng tạo", definition_en: "to make or produce something new using skill and imagination" },
    { word: "title", pronunciation: "/ˈtaɪtəl/", definition_vi: "tiêu đề", definition_en: "the name given to a story, book, comic strip, or other creative work" },
    { word: "sketch", pronunciation: "/skɛtʃ/", definition_vi: "phác thảo", definition_en: "a quick, rough drawing made without a lot of detail, used as a first draft" },
    { word: "express", pronunciation: "/ɪkˈsprɛs/", definition_vi: "diễn đạt / bày tỏ", definition_en: "to show your feelings, ideas, or thoughts using words, pictures, or actions" }
  ],

  nova_instructions: {
    persona: "Nova - friendly bilingual AI tutor",
    language_mix: "English-dominant with Vietnamese scaffolding",
    key_correction: "past simple -ed verb forms and was/were usage",
    nova_recast: "Great! He PLAYED at the park! Say: Max played with his ball. What did Leo do then?",
    grammar_guard: "Always model the full Past Simple form. Missing -ed? Add it back. Used present tense? Recast to past. Was/were confusion? Model the correct form gently."
  },

  v28_format_notes: {
    response_format: "ack + recast + question (V28 ONLY - NOT V25)",
    ack_options: ["Oh!", "I see!", "Nice!", "Wow!", "Really?", "Interesting!", "That is wonderful!"],
    recast_max_words: 8,
    recast_rules: [
      "Echo the action with correct Past Simple -ed form or was/were",
      "Model: Subject + verb-ed / was / were + details",
      "Keep it encouraging and ask about the next panel or scene"
    ],
    question_patterns_allowed: [
      "What happened next?",
      "What did Leo do in the next panel?",
      "What was it like?",
      "How did Leo feel?",
      "What did Leo write in the caption?"
    ],
    question_patterns_forbidden: [
      "Why do you think...?",
      "What does... mean?",
      "Do you understand?"
    ],
    example_exchanges: [
      { student: "Leo go to the park", tutor_response: "Nice! Leo WENT to the park! Say: Leo visited the park. What did he do there?" },
      { student: "It is sunny", tutor_response: "Wow! It WAS sunny! Say: It was sunny and warm. How did Max feel?" },
      { student: "Max play ball", tutor_response: "Great! Max PLAYED with his ball! Say: Max played with his ball. What happened in the next panel?" }
    ]
  },

  story_missions: [
    {
      mission_id: 1,
      id: 1,
      title: "Leo's Comic Strip Adventure - Story",
      title_en: "Leo's Comic Strip Adventure - Story",
      title_vi: "Cuoc Phieu Luu Truyen Tranh Cua Leo",
      theme: "Leo creates a 4-panel comic strip about his weekend at the park with Max",
      type: "story",
      image_url: "/images/week26/mission1_cover.jpg",
      nova_greeting: "Comic strip time! Leo spent his whole Sunday making a comic strip about his weekend. Let us explore it panel by panel!",
      mission_context: "CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 1-2 hint choices if student seems stuck: Say: ___ or ___! LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. Week 26 Mission 1. Student practices Past Simple -ed verbs and was/were by retelling Leo's comic strip story panel by panel. GRAMMAR FOCUS: visited, played, watched, returned, was, were. VOCAB: comic strip, panel, caption, speech bubble, character, sketch, scene.",

      story_character: {
        name: "Leo",
        personality: "creative and artistic, loves storytelling through drawing",
        backstory: "Leo spent his weekend at the park with his dog Max. On Sunday he turned the whole adventure into a 4-panel comic strip using Past Simple in every caption.",
        speaking_style: "enthusiastic and proud of his artwork, describes each panel in detail",
        facts: {
          visited_the_park: true,
          max_played_with_ball: true,
          watched_street_performance: true,
          returned_home_tired_happy: true,
          used_past_simple_in_captions: true
        },
        role: "Creative student who tells his weekend story through a comic strip"
      },

      opening_narrative: "What a fun creative challenge! Leo sat down on Sunday and created a wonderful 4-panel comic strip about his weekend. Let us read it together panel by panel! What is the title of Leo's comic strip? Say: The title is My Weekend Adventure or Leo called it My Weekend Adventure",

      story_arc: [
        {
          phase: "panel_one",
          turns: "1-3",
          phase_name: "Panel One — The Park Visit",
          focus: "Past Simple visited, walked, was",
          goal: "Student describes Panel One using Past Simple",
          phase_questions: [
            "Panel One! Where did Leo and Max go on Saturday morning? Say: They visited the park or Leo and Max went to the park",
            "What was the weather like? Say: It was sunny and warm or The weather was beautiful",
            "What did Leo write in the caption? Say: He wrote Saturday morning Max and I walked to the park or The caption described their walk to the park"
          ]
        },
        {
          phase: "panel_two",
          turns: "4-6",
          phase_name: "Panel Two — Max and the Ball",
          focus: "Past Simple played, drew, was",
          goal: "Student describes Panel Two with was/played",
          phase_questions: [
            "Panel Two! What did Max do with the ball? Say: Max played with his ball or Max chased the ball across the grass",
            "How long did Max play? Say: Max played for one hour or He played with the ball all afternoon",
            "What did the speech bubble say? Say: The speech bubble said I played all day or Max said I played all day in the speech bubble"
          ]
        },
        {
          phase: "panel_three",
          turns: "7-8",
          phase_name: "Panel Three — The Street Performance",
          focus: "Past Simple watched, arrived, clapped",
          goal: "Student describes the exciting moment in Panel Three",
          phase_questions: [
            "Panel Three! What did Leo and Max watch? Say: They watched a street performance or A street musician arrived and everyone stopped",
            "How did Leo feel? Say: Leo was amazed or The character in the panel looked surprised and happy"
          ]
        },
        {
          phase: "panel_four",
          turns: "9-10",
          phase_name: "Panel Four — Going Home",
          focus: "Past Simple returned, were",
          goal: "Student completes the story with the final panel",
          phase_questions: [
            "Panel Four! What happened at the end? Say: They returned home or Leo and Max walked home tired but happy",
            "How did Leo feel about his comic strip? Say: Leo was proud of his comic strip or Leo felt happy because he described his whole weekend",
            "Which panel is your favourite? Say: My favourite panel is the one where or I like Panel Two because Max was so funny"
          ]
        }
      ],

      minimum_turns: 8,
      maximum_turns: 10,

      story_text: "It was Sunday afternoon when Leo sat down with his pencils, paper, and a big smile. He had decided to create a comic strip about his adventure-filled weekend. First, Leo wrote the title: 'My Weekend Adventure — by Leo.' In Panel One, he sketched the scene where he and Max visited the park on Saturday morning. The caption read: 'Saturday morning. Max and I walked to the park. It was sunny and warm.' In Panel Two, Leo drew Max chasing a red ball across the green grass. The speech bubble above Max said: 'I played all day!' In Panel Three, Leo drew the moment a street musician arrived and everyone stopped to watch. The caption described the scene: 'We watched a street performance. It was brilliant! We smiled and clapped.' In Panel Four, Leo drew himself and Max walking home — both tired but happy. The caption read: 'Finally, we returned home. We were tired but very happy. It was a perfect day!'",
      story_text_vi: "Do la chieu Chu Nhat khi Leo ngoi xuong voi but chi, giay va mot nu cuoi lon. Cau da quyet dinh tao ra mot bo truyen tranh ve cai tuan cuoi day phieu luu cua minh. Dau tien, Leo viet tieu de: 'Cuoc Phieu Luu Cuoi Tuan Cua Toi — boi Leo.' O Khung 1, cau phac thao canh noi cau va Max da den cong vien vao sang thu Bay. Chu thich viet: 'Sang thu Bay. Max va toi di bo den cong vien. Thoi tiet nang am.' O Khung 2, Leo ve Max dang duoi qua bong do tren bai co xanh. Bong bong loi thoai phia tren Max noi: 'Toi da choi suot ngay!' O Khung 3, Leo ve khoang khac mot nhac si duong pho xuat hien va moi nguoi dung lai xem. O Khung 4, Leo ve minh va Max di bo ve nha — ca hai met nhung hanh phuc. Chu thich viet: 'Cuoi cung, chung toi da tro ve nha. Chung toi met nhung rat hanh phuc. Do la mot ngay hoan hao!'",
      discussion_prompts: [
        {
          id: 1,
          question_en: "Describe what Leo did in Panel One using Past Simple.",
          prompt_vi: "Mo ta nhung gi Leo da lam o Khung 1 dung Qua Khu Don.",
          grammar_hint: "Leo visited... He sketched... It was... Max and Leo walked...",
          example_answer: "In Panel One, Leo sketched the scene where he and Max visited the park. It was sunny and warm. He wrote a caption describing their walk."
        },
        {
          id: 2,
          question_en: "What did Max do in Panel Two and how did the speech bubble express his feelings?",
          prompt_vi: "Max da lam gi o Khung 2 va bong bong loi thoai the hien cam xuc cua Max nhu the nao?",
          grammar_hint: "Max played... He chased... The speech bubble said...",
          example_answer: "Max played with his ball for one hour and chased it across the grass. The speech bubble said 'I played all day!' which showed Max was very happy and excited."
        },
        {
          id: 3,
          question_en: "What happened in Panel Three and Panel Four? Use was/were and -ed verbs.",
          prompt_vi: "Dieu gi da xay ra o Khung 3 va Khung 4? Dung was/were va dong tu -ed.",
          grammar_hint: "In Panel Three, they watched... In Panel Four, they returned... They were...",
          example_answer: "In Panel Three, they watched a street performance. It was brilliant and they clapped. In Panel Four, they returned home. They were tired but very happy. It was a perfect day."
        }
      ]
    },
    {
      mission_id: 2,
      id: 2,
      title: "Mia's Sunday Story - Practice",
      title_en: "Mia's Sunday Story - Practice",
      title_vi: "Cau Chuyen Chu Nhat Cua Mia - Luyen Tap",
      theme: "Mia describes her own Sunday activities using Past Simple",
      type: "practice",
      image_url: "/images/week26/mission2_cover.jpg",
      nova_greeting: "Now it is Mia's turn! She had a great Sunday too. Let us help her describe it using Past Simple!",
      mission_context: "CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 1-2 hint choices if student seems stuck: Say: ___ or ___! LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. Week 26 Mission 2. Student practices Past Simple was/were and -ed verbs through Mia's Sunday story. GRAMMAR FOCUS: visited, watched, created, sketched, expressed, was/were. VOCAB: adventure, describe, scene, express, create.",

      story_character: {
        name: "Mia",
        personality: "organised and creative, loves helping others and doing art projects",
        backstory: "Mia spent her Sunday visiting the library in the morning, drawing a poster in the afternoon, and watching a nature documentary in the evening. She wants to describe her day using Past Simple.",
        speaking_style: "clear and detailed, enjoys giving structured descriptions with good vocabulary",
        facts: {
          visited_library: true,
          created_poster: true,
          watched_documentary: true,
          was_happy: true,
          it_was_a_great_sunday: true
        },
        role: "Student who models perfect Past Simple storytelling"
      },

      opening_narrative: "Mia's Sunday Practice! Mia had a great Sunday. She visited the library, created a poster, and watched a nature documentary. Let us help her describe each activity! What did Mia do in the morning? Say: Mia visited the library or In the morning Mia went to the library",

      story_arc: [
        {
          phase: "morning_activity",
          turns: "1-3",
          phase_name: "Morning — Library Visit",
          focus: "Past Simple visited, borrowed, was",
          goal: "Student describes Mia's morning using Past Simple",
          phase_questions: [
            "What did Mia do on Sunday morning? Say: Mia visited the library or She went to the library in the morning",
            "What did Mia do at the library? Say: She borrowed three books or She looked at books about drawing",
            "How was the library? Say: The library was quiet and comfortable or It was a lovely morning at the library"
          ]
        },
        {
          phase: "afternoon_activity",
          turns: "4-7",
          phase_name: "Afternoon — Creating a Poster",
          focus: "Past Simple created, sketched, expressed",
          goal: "Student describes Mia's creative afternoon activity",
          phase_questions: [
            "What did Mia do in the afternoon? Say: She created a poster or Mia sketched and drew a colourful poster",
            "What was the poster about? Say: The poster was about nature or It described her favourite animals",
            "How did Mia express her ideas? Say: She expressed her ideas with drawings and captions or She used colourful sketches to tell a story",
            "How did Mia feel about her poster? Say: Mia was proud of her poster or She was happy with what she created"
          ]
        },
        {
          phase: "evening_activity",
          turns: "8-10",
          phase_name: "Evening — Documentary",
          focus: "Past Simple watched, was",
          goal: "Student describes Mia's evening and reflects on the full day",
          phase_questions: [
            "What did Mia do in the evening? Say: Mia watched a nature documentary or She watched TV in the evening",
            "How was the documentary? Say: It was interesting and beautiful or The documentary was about ocean animals",
            "How was Mia's whole Sunday? Say: Mia's Sunday was full of adventures or It was a great day because she visited created and watched",
            "What would YOU do on a perfect Sunday? Say: On a perfect Sunday I would or My ideal Sunday is"
          ]
        }
      ],

      minimum_turns: 8,
      maximum_turns: 10,

      story_text: "Mia had a wonderfully busy Sunday. In the morning, she visited the library near her house. She borrowed three books about drawing and comics. The library was quiet and peaceful. In the afternoon, Mia sat at her desk and created a colourful poster about ocean animals. She sketched each creature carefully and expressed her love of nature through every drawing. She was very pleased with the result! In the evening, Mia watched a nature documentary about coral reefs on television. The colours were incredible and she learned many new things. When bedtime came, she closed her notebook and smiled. It was a Sunday full of learning, creating, and exploring!",
      story_text_vi: "Mia co mot ngay Chu Nhat tuyet voi ban ron. Vao buoi sang, co den thu vien gan nha. Co muon ba cuon sach ve ve tranh va truyen tranh. Thu vien rat yen tinh va thanh binh. Vao buoi chieu, Mia ngoi o ban lam viec va tao ra mot to poster day mau sac ve dong vat bien. Co phac thao tung sinh vat can than va bieu dat tinh yeu thien nhien qua tung net ve. Co rat hai long voi ket qua! Vao buoi toi, Mia xem mot phim tai lieu ve thien nhien ve ran san ho tren truyen hinh. Mau sac that tuyet dep va co hoc duoc nhieu dieu moi. Khi gio di ngu den, co dong quyen so tay lai va mim cuoi. Do la mot ngay Chu Nhat day hoc hoi, sang tao va kham pha!",
      discussion_prompts: [
        {
          id: 1,
          question_en: "Describe Mia's morning using Past Simple verbs.",
          prompt_vi: "Mo ta buoi sang cua Mia dung dong tu Qua Khu Don.",
          grammar_hint: "In the morning, Mia visited... She borrowed... The library was...",
          example_answer: "In the morning, Mia visited the library. She borrowed three books about drawing and comics. The library was quiet and peaceful."
        },
        {
          id: 2,
          question_en: "How did Mia express herself in the afternoon? Use 'created', 'sketched', and 'expressed'.",
          prompt_vi: "Mia da bieu dat ban than nhu the nao vao buoi chieu? Dung 'created', 'sketched', va 'expressed'.",
          grammar_hint: "She created... She sketched... She expressed her ideas through...",
          example_answer: "Mia created a colourful poster about ocean animals. She sketched each creature carefully. She expressed her love of nature through every drawing and was very pleased with the result."
        },
        {
          id: 3,
          question_en: "Compare Mia's Sunday with Leo's weekend. Use was/were and -ed verbs for both.",
          prompt_vi: "So sanh ngay Chu Nhat cua Mia voi cuoi tuan cua Leo. Dung was/were va dong tu -ed cho ca hai.",
          grammar_hint: "Leo visited... Max played... Mia created... She watched... Both were...",
          example_answer: "Leo visited the park with Max and they watched a street performance. Mia visited the library and created a poster. They were both busy and happy. Leo was outdoors and active, while Mia was creative and quiet. Both had wonderful weekends!"
        }
      ]
    },
    {
      mission_id: 3,
      id: 3,
      title: "My Weekend Comic — Free Talk",
      title_en: "My Weekend Comic — Free Talk",
      title_vi: "Truyen Tranh Cuoi Tuan Cua Toi — Noi Chuyen Tu Do",
      theme: "Student creates their own 4-panel weekend comic strip in words using Past Simple",
      type: "free_talk",
      image_url: "/images/week26/mission3_cover.jpg",
      nova_greeting: "Free Talk Challenge! Now YOU are the comic strip artist! Tell me about YOUR weekend using Past Simple — describe four panels of your own weekend story!",
      mission_context: "CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 1-2 hint choices if student seems stuck: Say: ___ or ___! LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. Week 26 Mission 3. Student free-talks about their own weekend using comic strip format. GRAMMAR FOCUS: Past Simple -ed verbs, was/were, sequence words First/Then/After that/Finally. VOCAB: comic strip, panel, caption, scene, adventure, describe, express.",

      story_character: {
        name: "Student (You!)",
        personality: "creative storyteller who loves describing their own experiences",
        backstory: "The student had a weekend with moments worth sharing. Now they imagine turning it into a comic strip — four panels, four moments, all in Past Simple!",
        speaking_style: "confident and descriptive, uses Past Simple verbs and was/were naturally",
        facts: {
          is_first_person: true,
          creates_4_panels: true,
          uses_past_simple: true,
          uses_was_were: true,
          tells_weekend_story: true
        },
        role: "Comic strip artist telling their own weekend story"
      },

      opening_narrative: "Your Comic Strip starts now! Imagine your weekend as a 4-panel comic strip. Each panel is one moment from your Saturday or Sunday. Tell me Panel One first — what was the FIRST thing you did or saw this weekend? Say: In Panel One I visited or My first panel shows or Panel One is about",

      story_arc: [
        {
          phase: "panel_one",
          turns: "1-3",
          phase_name: "Panel One — First Moment",
          focus: "Setting the scene with was/were and first -ed verb",
          goal: "Student describes their first weekend moment",
          phase_questions: [
            "Panel One! What was the first thing you did this weekend? Say: In Panel One I visited or On Saturday morning I went or My first moment was",
            "What was it like? Say: It was fun and exciting or It was relaxing and quiet or It was sunny and nice",
            "Who was with you? Say: I was with my family or I was alone but it was great or My friend was there too"
          ]
        },
        {
          phase: "panel_two",
          turns: "4-6",
          phase_name: "Panel Two — Main Action",
          focus: "-ed verbs for main activity",
          goal: "Student describes their most important weekend activity",
          phase_questions: [
            "Panel Two! What is the main thing you did? Say: In Panel Two I played or Then I visited or My second panel shows me",
            "How long did you do it? Say: I played for two hours or I stayed there all morning or It lasted until the afternoon",
            "What was the best part? Say: The best part was when I or It was great because I"
          ]
        },
        {
          phase: "panel_three",
          turns: "7-8",
          phase_name: "Panel Three — Exciting Moment",
          focus: "Most interesting/surprising moment of the weekend",
          goal: "Student describes an exciting or memorable moment",
          phase_questions: [
            "Panel Three! What was the most exciting or surprising moment? Say: The most exciting part was or I was surprised when or Something interesting happened",
            "How did you feel? Say: I was really excited or I was happy because or I was a bit tired but still"
          ]
        },
        {
          phase: "panel_four",
          turns: "9-12",
          phase_name: "Panel Four — The End",
          focus: "Finally and was/were for ending the story",
          goal: "Student completes their comic strip with the final moment",
          phase_questions: [
            "Panel Four! How did your weekend end? Say: Finally I returned home or At the end I was or The last thing I did was",
            "How did you feel at the end? Say: I was tired but happy or I felt relaxed and satisfied or I was excited for the next day",
            "What would the title of YOUR comic strip be? Say: My title would be or I would call it or The title of my comic is",
            "Which panel best describes your weekend? Say: My best panel is Panel Two because or The most important moment was in Panel One when",
            "If your friend read your comic strip what would they say? Say: My friend would say it looks fun or They would think my weekend was exciting"
          ]
        }
      ],

      minimum_turns: 10,
      maximum_turns: 10,

      story_text: "It is time for the big Comic Strip Challenge! Each student becomes a comic strip artist and tells the story of their own weekend — but in words! Think of four moments from your Saturday or Sunday. Describe each moment like a panel in a comic: What happened? What was it like? Who was there? How did you feel? Leo described his park adventure. Mia described her library, poster, and documentary. Now it is YOUR turn. Use Past Simple verbs — visited, played, watched, created, was, were — and sequence words like First, Then, After that, Finally. Make your weekend come alive through your four panels!",
      story_text_vi: "Da den luc cho Thu Thach Truyen Tranh lon! Moi hoc sinh tro thanh mot hoa si truyen tranh va ke cau chuyen ve cuoi tuan cua chinh minh — nhung bang loi! Hay nghi den bon khoang khac tu thu Bay hoac Chu Nhat cua ban. Mo ta tung khoang khac nhu mot khung trong truyen tranh: Dieu gi da xay ra? No nhu the nao? Ai o do? Ban cam thay ra sao? Leo mo ta cuoc phieu luu o cong vien. Mia mo ta thu vien, poster va phim tai lieu cua minh. Bay gio la LUOT CUA BAN. Dung dong tu Qua Khu Don — visited, played, watched, created, was, were — va cac tu trinh tu nhu First, Then, After that, Finally. Hay lam cho cuoi tuan cua ban song dong qua bon khung tranh!",
      discussion_prompts: [
        {
          id: 1,
          question_en: "Describe Panel One of YOUR weekend comic strip. Use Past Simple and say where you were and what it was like.",
          prompt_vi: "Mo ta Khung 1 trong bo truyen tranh cuoi tuan CUA BAN. Dung Qua Khu Don va noi ban o dau va no nhu the nao.",
          grammar_hint: "In Panel One, I visited/went to... It was... I was with...",
          example_answer: "In Panel One, I visited my grandparents on Saturday morning. It was warm and sunny. I was excited to see them. My grandfather was in the garden and my grandmother was in the kitchen."
        },
        {
          id: 2,
          question_en: "What was your Panel Two main activity? Describe it with at least three Past Simple verbs.",
          prompt_vi: "Hoat dong chinh trong Khung 2 cua ban la gi? Mo ta voi it nhat ba dong tu Qua Khu Don.",
          grammar_hint: "In Panel Two, I played/watched/visited/created/... I also... It was...",
          example_answer: "In Panel Two, I played football with my cousins in the garden. We laughed and chased the ball for two hours. I scored two goals! It was the best part of my weekend."
        },
        {
          id: 3,
          question_en: "How did your weekend end? Describe Panel Four using 'Finally', 'was', 'were', and one -ed verb.",
          prompt_vi: "Cuoi tuan cua ban ket thuc nhu the nao? Mo ta Khung 4 dung 'Finally', 'was', 'were', va mot dong tu -ed.",
          grammar_hint: "Finally, I returned home / we finished... I was... We were... It was a great weekend because...",
          example_answer: "Finally, I returned home on Sunday evening. I was tired but really happy. We were all exhausted from the busy weekend. It was a great weekend because I visited family, played, and had a wonderful adventure."
        }
      ]
    }
  ],

  // 💬 SPARK TALK: AI-driven personal expression, bridged from the week's story
  spark_talk: [
    {
      id: 'spark_comic_hero',
      emoji: '🦸',
      title: 'My Comic Hero',
      bridge: 'The weekend comic strip had a hero with a problem — and an epic solution! 💥',
      seed_question: 'What is your superpower? Is it flying or running super fast?',
      frames: [
        { template: 'My hero was ___', follow_up_q: 'What was your hero like? Was he brave or kind?', hints: ['brave', 'kind', 'very smart'] },
        { template: 'First, my hero ___ed', follow_up_q: 'What did your hero do first?', hints: ['start', 'help', 'discover'] },
        { template: 'Then, my hero ___', follow_up_q: 'What did your hero do next?', hints: ['saved', 'discovered', 'escaped'] },
        { template: 'My hero was ___ when things got hard', follow_up_q: 'What was your hero feeling at a key moment?', hints: ['brave', 'calm', 'strong'] },
        { template: 'Finally, my hero ___', follow_up_q: 'How did it end? What did the hero do finally?', hints: ['saved', 'succeeded', 'celebrated'] },
        { template: 'My hero ___ and became a champion', follow_up_q: 'What did the hero do to become great?', hints: ['trained', 'helped', 'tried'] },
        { template: 'There was a ___ and my hero solved it', follow_up_q: 'What was the challenge and how did the hero handle it?', hints: ['big problem', 'scary monster', 'hard task'] },
        { template: 'My hero was the best because ___', follow_up_q: 'Why was your hero the best?', hints: ['they never gave up', 'they were always kind', 'they always helped others'] }
      ],
      scaffold_frames: ['My superpower is ___', 'The problem was ___', 'I solved it by ___ing'],
      vocab_focus: ['hero', 'superpower', 'problem', 'solved', 'saved'],
      turns: 8,
    },
    {
      id: 'spark_weekend_comic',
      emoji: '📰',
      title: 'My Weekend Comic Strip',
      bridge: 'The comic strip told one epic weekend story, panel by panel — so vivid and funny! 🎨',
      seed_question: 'How did your weekend start? Did you go out or stay home?',
      frames: [
        { template: 'My weekend started when I ___ed', follow_up_q: 'How did your weekend start? What did you do first?', hints: ['clean', 'cook', 'call'] },
        { template: 'First, I ___ed', follow_up_q: 'What did you do first this weekend?', hints: ['clean', 'cook', 'call'] },
        { template: 'Then, I ___ and it was so fun', follow_up_q: 'What did you do next and how was it?', hints: ['played', 'cooked', 'shopped'] },
        { template: 'I was ___ when I got a surprise', follow_up_q: 'What were you feeling when something happened this weekend?', hints: ['happy', 'excited', 'tired'] },
        { template: 'After that, I ___ed', follow_up_q: 'What did you do after?', hints: ['rest', 'watch', 'cook'] },
        { template: 'There was a moment when I ___ and felt joy', follow_up_q: 'What special moment happened?', hints: ['laughed', 'smiled', 'jumped'] },
        { template: 'Finally, I ___ and felt great', follow_up_q: 'How did your weekend end? What did you do and feel?', hints: ['rested', 'relaxed', 'smiled'] },
        { template: 'My best weekend moment was when I ___', follow_up_q: 'What was the best moment of your weekend?', hints: ['laughed', 'played', 'tried'] }
      ],
      scaffold_frames: ['Panel 1: I ___', 'Panel 2: Then ___', 'Panel 3: Finally ___'],
      vocab_focus: ['first', 'next', 'then', 'suddenly', 'the end'],
      turns: 8,
    },
  ],

  conversation_cards: [
    {
      id: 'past_simple_comic_practice',
      title: 'Comic Strip Past Simple Practice',
      emoji: '🖼️',
      theme: 'Practicing Past Simple -ed verbs and was/were through Leo\'s comic strip',
      difficulty: 'easy',
      exchanges: [
        { ai: 'Comic time! Where did Leo and Max go on Saturday? Say: They visited the park or Leo and Max went to the park', options: ['They visited the park on Saturday', 'Leo and Max went to the park'] },
        { ai: 'Great! How was the weather? Say: It was sunny and warm or The weather was beautiful', options: ['It was sunny and warm', 'The weather was beautiful and sunny'] },
        { ai: 'Nice! What did Max do with the ball? Say: Max played with his ball or He chased the ball across the grass', options: ['Max played with his ball for an hour', 'He chased the ball across the grass'] },
        { ai: 'Wonderful! What did they watch in Panel Three? Say: They watched a street performance or A musician performed and they clapped', options: ['They watched a street performance', 'A street musician performed and they clapped'] },
        { ai: 'Amazing! How did they feel at the end? Say: They were tired but happy or They returned home feeling great', options: ['They were tired but very happy', 'They returned home tired but pleased'] },
        { ai: 'Perfect! Was it a good weekend? Say: Yes it was a perfect weekend or It was a great adventure for Leo and Max', options: ['Yes it was a perfect weekend', 'It was a wonderful adventure for them'] }
      ],
      completion_message: 'Comic strip complete! You used Past Simple perfectly!'
    },
    {
      id: 'weekend_story_panels',
      title: 'Tell YOUR Weekend Story',
      emoji: '🗓️',
      theme: 'Describing personal weekend in four panel style',
      difficulty: 'easy',
      exchanges: [
        { ai: 'Your comic! What is the title of YOUR weekend comic strip? Say: My title is or I call it My Weekend', options: ['My title is My Weekend Adventure', 'I would call it My Wonderful Weekend'] },
        { ai: 'Great title! Panel One — where did you go? Say: In Panel One I visited or I went to', options: ['In Panel One I visited my family', 'I went to the park or the shops'] },
        { ai: 'Panel Two! What was the main thing you did? Say: I played or I watched or I created', options: ['I played games with my friends', 'I watched a film with my family'] },
        { ai: 'Panel Three! Was there an exciting moment? Say: The exciting moment was or I was surprised when', options: ['The exciting moment was when I won a game', 'I was surprised by something fun that happened'] },
        { ai: 'Final panel! How did your weekend end? Say: Finally I returned home or At the end I was', options: ['Finally I returned home and rested', 'At the end I was tired but really happy'] }
      ],
      completion_message: 'Your weekend comic strip is complete! What a great story!'
    },
    {
      id: 'was_were_review',
      title: 'Was / Were Review Challenge',
      emoji: '⭐',
      theme: 'Reviewing was/were through comic strip situations',
      difficulty: 'medium',
      exchanges: [
        { ai: 'Was or Were? The park ___ sunny. Say: The park was sunny or It was a sunny day', options: ['The park was sunny and warm', 'It was a beautiful sunny day'] },
        { ai: 'Good! Leo and Max ___ at the park. Was or Were? Say: Leo and Max were at the park', options: ['Leo and Max were at the park', 'They were both at the park together'] },
        { ai: 'Perfect! Max ___ so happy. Was or Were? Say: Max was so happy or He was really excited', options: ['Max was so happy with his ball', 'He was really excited and energetic'] },
        { ai: 'Great! They ___ tired at the end. Was or Were? Say: They were tired but happy', options: ['They were tired but very happy', 'Both Leo and Max were exhausted'] },
        { ai: 'Now you! Yesterday, I ___ at home. Use was or were! Say: I was at home or I was with my family', options: ['I was at home all day', 'I was with my family yesterday'] },
        { ai: 'Amazing! My friends and I ___ very happy. Say: My friends and I were very happy', options: ['My friends and I were very happy', 'We were all really happy together'] }
      ],
      completion_message: 'Was/Were challenge complete! You got them all right!'
    }
  ],

  metadata: {
    week: 26,
    phase: 1,
    cefr_level: 'A1',
    grammar_guard: {
      target_tense: 'Past Simple: regular -ed verbs and was/were',
      forbidden_structures: ['present tense for past events', 'will + verb for past'],
      focus_verbs: ['visited', 'played', 'watched', 'returned', 'created', 'sketched', 'expressed', 'described']
    }
  },
  freetalk_knowledge: {
    week_title: "My Weekend Comic Strip",
    week_number: 26,
    theme: "Storytelling about the weekend using Past Simple and sequence words",

    knowledge_base: [
    "IMPORTANT — Always respond with empathy and understanding. Acknowledge student feelings before correcting. If a student shares something negative, say you are sorry or that sounds difficult.",
      "Weekend vocabulary: visited, played, watched, cooked, went, saw, met, enjoyed, relaxed, explored",
      "Grammar: Past Simple Review — was/were, regular -ed verbs, sequence words",
      "Sequence words: First, Then, After that, Finally, In the morning, In the afternoon, In the evening",
      "Pattern: It was ___. I/We/They + verb-ed ___. After that, we ___.  Finally, I ___.",
      "Storytelling: A good weekend story has a beginning, middle, and end",
      "Describing feelings: I was happy/excited/tired because...",
      "Questions to build a story: Where did you go? Who did you meet? What did you see?",
      "Comic strip structure: Panel 1 (setting) → Panel 2 (action) → Panel 3 (result) → Panel 4 (ending)"
    ],

    example_opening_questions: [
      "What did you do last weekend?",
      "Where did you go on Saturday or Sunday?",
      "Who did you spend time with at the weekend?",
      "What was the most fun thing you did this week?",
      "Did anything funny or surprising happen to you recently?",
      "If your weekend were a comic strip, what would the four panels show?"
    ],

    // FREE TALK 2.0: Starter prompts
    starter_prompts: [
      { text_en: "I want to play games! 🎮", text_vi: "Tôi muốn chơi game!", type: "game" },
      { text_en: "Translate this for me... 📖", text_vi: "Dịch giúp con câu/chữ này...", type: "help" },
      { text_en: "I have a question! ❓", text_vi: "Con có câu hỏi!", type: "ask" }
    ]
  },
};

export default week26RealData;
