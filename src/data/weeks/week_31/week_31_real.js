const week31RealData = {
  week_id: 31,
  week_number: 31,
  title: "The Forest Walk",
  weekTitle_en: "The Senses!",
  weekTitle_vi: "Cac Giac Quan!",
  topic: "Describing sensory experiences in the forest using Past Simple Irregular Verbs: saw, heard, felt, smelt",
  topic_vi: "Mo ta cac trai nghiem giac quan trong rung dung Dong Tu Bat Quy Tac: saw, heard, felt, smelt",
  theme: "Forest exploration, five senses, nature observation, irregular past tense perception verbs in context",

  grammar_focus: "Past Simple Irregular Verbs 3: see->saw, hear->heard, feel->felt, smell->smelt",
  grammar_pattern: "I saw ___. She heard ___. Luna felt ___. They smelt ___.",
  grammar_examples: [
    "Luna saw a vivid red butterfly on the green leaf.",
    "She heard the soft rustling of leaves in the forest.",
    "Everyone felt a cool breeze brush across their faces.",
    "Luna smelt fragrant wild roses near the sunny bushes.",
    "They heard the distant echo of a waterfall.",
    "Luna felt startled when the woodpecker knocked loudly."
  ],
  // Chunks/collocations AI must use in story_text narrative
  // Source: read.js bold chunks — multi-word phrases and high-value vocabulary
  chunk_focus: [
    "Last saturday",
    "luna went",
    "local market",
    "old town",
    "looked around",
    "could see",
    "many different",
    "shone through",
    "made little rainbows",
    "smiled at",
    "showed her",
    "wooden sculpture",
    "picked up",
    "stone bowl",
    "stone felt cool"
  ],
  target_vocab: [
    { word: "forest", pronunciation: "/\u02c8f\u0252r\u026ast/", definition_vi: "khu rung", definition_en: "a large area of land covered with many trees" },
    { word: "creature", pronunciation: "/\u02c8kri\u02d0t\u0283\u0259r/", definition_vi: "sinh vat", definition_en: "any living animal, especially a wild one" },
    { word: "rustling", pronunciation: "/\u02c8r\u028asl\u026a\u014b/", definition_vi: "tieng xao xac", definition_en: "a soft continuous sound made by leaves or grass moving" },
    { word: "fragrant", pronunciation: "/\u02c8fre\u026a\u0261r\u0259nt/", definition_vi: "thom ngat", definition_en: "having a pleasant, sweet smell" },
    { word: "damp", pronunciation: "/d\xe6mp/", definition_vi: "am uot", definition_en: "slightly wet, usually from water in the air or on a surface" },
    { word: "echo", pronunciation: "/\u02c8ek\u0259\u028a/", definition_vi: "tieng vang", definition_en: "a sound that bounces off a surface and is heard again" },
    { word: "sensation", pronunciation: "/sen\u02c8se\u026a\u0283n/", definition_vi: "cam giac", definition_en: "a feeling you get through one of your senses, such as touch or temperature" },
    { word: "texture", pronunciation: "/\u02c8tekst\u0283\u0259r/", definition_vi: "be mat", definition_en: "the way a surface feels when you touch it, such as rough or smooth" },
    { word: "vivid", pronunciation: "/\u02c8v\u026av\u026ad/", definition_vi: "song dong / ruc ro", definition_en: "very bright and strong in color, or very clear and detailed" },
    { word: "distant", pronunciation: "/\u02c8d\u026ast\u0259nt/", definition_vi: "xa xa / o xa", definition_en: "far away in space; not nearby" },
    { word: "breeze", pronunciation: "/bri\u02d0z/", definition_vi: "lan gio nhe", definition_en: "a light, gentle wind" },
    { word: "startled", pronunciation: "/\u02c8st\u0251\u02d0tld/", definition_vi: "giat minh / bat ngo", definition_en: "suddenly surprised or frightened by something unexpected" },
    { word: "whisper", pronunciation: "/\u02c8w\u026asp\u0259r/", definition_vi: "tieng thi tham", definition_en: "a very quiet, soft sound, like speaking without using your full voice" },
    { word: "wood", pronunciation: "/wʊd/", definition_vi: "gỗ", definition_en: "the hard material that comes from trees, used for building and making furniture" },
    { word: "metal", pronunciation: "/ˈmetəl/", definition_vi: "kim loại", definition_en: "a hard, shiny material such as iron or steel that conducts heat and electricity" },
    { word: "plastic", pronunciation: "/ˈplæstɪk/", definition_vi: "nhựa", definition_en: "a light, strong man-made material that can be moulded into many shapes" },
    { word: "glass", pronunciation: "/ɡlɑːs/", definition_vi: "thủy tinh", definition_en: "a hard, transparent material made from sand, used for windows, bottles, and jars" },
    { word: "stone", pronunciation: "/stəʊn/", definition_vi: "đá", definition_en: "a hard, solid natural material found in the ground, used in buildings and paths" },
    { word: "cotton", pronunciation: "/ˈkɒtən/", definition_vi: "vải cotton", definition_en: "a soft natural fabric made from the cotton plant, used to make clothing and towels" }
  ],

  nova_instructions: {
    persona: "Nova - friendly bilingual AI tutor",
    language_mix: "English-dominant with Vietnamese scaffolding",
    key_correction: "Past Simple Irregular forms: see->saw (NOT seed/seed), hear->heard (NOT heared), feel->felt (NOT feeled), smell->smelt (NOT smelled — accept both smelled/smelt but prefer smelt for W31)",
    nova_recast: "Great! Luna SAW a butterfly! Say: Luna saw a vivid butterfly on the leaf. What did she hear next?",
    grammar_guard: "Always model the correct irregular past form. Student says 'seed'? Recast with 'saw'. Student says 'heared'? Recast with 'heard'. feeled->felt, smelled->smelt. Keep encouraging and explore the forest story together!"
  },

  v28_format_notes: {
    response_format: "ack + recast + question (V28 ONLY - NOT V25)",
    ack_options: ["Oh!", "Wow!", "Nice!", "That is wonderful!", "I see!", "Really?", "Amazing!"],
    recast_max_words: 8,
    recast_rules: [
      "Echo the sensory action with correct irregular past form",
      "Model: Subject + irregular verb + sensory detail (saw/heard/felt/smelt)",
      "Keep it adventurous and nature-focused — ask about the next sensory event"
    ],
    question_patterns_allowed: [
      "What did Luna see?",
      "What did she hear?",
      "How did the bark feel?",
      "What did Luna smell?",
      "What happened next in the forest?"
    ],
    question_patterns_forbidden: [
      "Why do you think...?",
      "What does... mean?",
      "Do you understand?"
    ],
    example_exchanges: [
      { student: "Luna seed a butterfly", tutor_response: "Wow! Luna SAW a butterfly! Say: Luna saw a vivid red butterfly. What did she hear next?" },
      { student: "She heared rustling", tutor_response: "Great! She HEARD rustling! Say: Luna heard a soft rustling sound. What did she feel?" },
      { student: "Luna feeled the bark", tutor_response: "Nice! Luna FELT the bark! Say: Luna felt the rough texture of the bark. What did she smell?" }
    ]
  },

  story_missions: [
    {
      mission_id: 1,
      id: 1,
      title: "The Forest Walk - Story",
      title_en: "The Forest Walk - Story",
      title_vi: "Chuyen Di Rung - Cau Chuyen",
      theme: "Luna's class goes on a forest field trip and uses all five senses",
      type: "story",
      image_url: "/images/week31/mission1_cover.jpg",
      nova_greeting: "Forest adventure time! Last Saturday, Luna's class went on a field trip to the forest. They used all five senses — they saw, heard, felt, and smelt amazing things! Ready to explore? What did Luna hear first on the forest path?",
      mission_context: "CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 1-2 hint choices if student seems stuck: Say: ___ or ___! LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. Week 31 Mission 1. Student tells the forest walk story using Past Simple Irregular Verbs: saw, heard, felt, smelt. GRAMMAR FOCUS: Perception irregular verbs — NO seed/heared/feeled. VOCAB: forest, creature, rustling, fragrant, damp, echo, sensation, texture, vivid, distant, breeze, startled, whisper.",

      opening_narrative: "What a wonderful sensory journey! Luna's class walked into the forest. The teacher said: Today we will use all five senses! Luna stopped to listen carefully. What did Luna hear first on the path? Say: Luna heard a soft rustling sound or She heard leaves rustling in the tall grass",

      story_arc: [
        {
          phase: "hearing",
          turns: "1-3",
          phase_name: "What Luna Heard (heard)",
          focus: "Past Simple: heard — sounds in the forest",
          goal: "Student describes what Luna heard on the forest path",
          phase_questions: [
            "What did she hear in the valley? Say: She heard the distant echo of a waterfall or Luna heard the waterfall echo between the hills",
            "What did she hear at the end? Say: She heard the woodpecker's wings whisper or Luna heard soft wing sounds above her"
          ]
        },
        {
          phase: "seeing_and_feeling",
          turns: "4-7",
          phase_name: "What Luna Saw and Felt (saw, felt)",
          focus: "Past Simple: saw, felt — sights and sensations in the forest",
          goal: "Student describes what Luna saw and felt on the forest walk",
          phase_questions: [
            "What did Luna feel when she stopped? Say: She felt a cool breeze or Luna felt the cool wind brush her face",
            "What did Luna see on the green leaf? Say: Luna saw a vivid red butterfly or She saw a beautiful creature on the leaf",
            "How did the tree bark feel? Say: The bark felt rough and dry like cracked rock or She felt the rough texture of the bark",
            "What did Luna smell near the rose bushes? Say: She smelt fragrant roses or Luna smelt the sweet smell of wild flowers"
          ]
        },
        {
          phase: "smelling_and_surprise",
          turns: "8-10",
          phase_name: "What Luna Smelt and the Surprise (smelt, felt startled)",
          focus: "Past Simple: smelt, felt startled — roses and the woodpecker surprise",
          goal: "Student describes what Luna smelt and the startling woodpecker moment",
          phase_questions: [
            "What new thing surprised Luna in the forest? Say: A woodpecker's knock surprised Luna or Something knocked on a tree and startled her",
            "How did everyone feel about the walk? Say: They felt the forest spoke to every sense or Everyone said it was an amazing and unforgettable walk",
            "What did everyone say at the end? Say: Luna said the forest spoke to every sense or Everyone said it was an amazing walk"
          ]
        }
      ],

      minimum_turns: 10,
      maximum_turns: 12,

      story_text: "Last Saturday, Luna's class went on a field trip to the forest. The teacher said: Today we will use all five senses! They walked quietly along the damp path. First, Luna heard a soft rustling sound in the tall grass beside the path. She stopped and felt a cool breeze brush across her face. Then she saw a vivid red butterfly with orange spots land on a green leaf — the most beautiful creature she had ever seen in the wild! A little further on, she reached out and felt the rough bark of an enormous old oak tree. The texture under her fingers was dry and uneven, like cracked rock. But when she touched the damp green moss beside it, the sensation was wonderfully cool and soft. The distant sound of a waterfall drifted through the valley and made a gentle echo between the hills. Luna heard every note clearly. Finally, she smelt something fragrant near the bushes — wild roses growing in a patch of sunlight. The sweet scent floated towards her on the warm breeze, and she felt a rush of pure joy. Suddenly, a sharp knock from a woodpecker made everyone startled. Then they heard its wings whisper softly as it flew away over the treetops. I never knew the forest spoke to every single sense! said Luna.",
      story_text_vi: "Thu Bay tuan truoc, lop cua Luna di da ngoai vao rung. Co giao noi: Hom nay chung ta se dung ca nam giac quan! Ho buoc di nhe nhang tren con duong am uot. Truoc tien, Luna nghe mot tieng xao xac nhe trong dam co cao ben duong. Co dung lai va cam nhan mot lan gio mat lanh quet qua mat minh. Roi co nhin thay mot con buom do ruc ro voi nhung dot cam dau xuong mot chiec la xanh — sinh vat dep nhat co tung thay trong tu nhien! Di them mot doan, co with tay so vao lop vo thu nham ranh cua mot cay so gia khong lo. Be mat duoi ngon tay tho rap va khong deu, giong nhu da nut. Nhung khi co cham vao lop reu xanh am uot ben canh no, cam giac that mat lanh va mem mai tuyet voi. Tieng xa xa cua mot thac nuoc vang vong qua thung lung va tao ra mot tieng vang nhe nhang giua cac ngon doi. Luna nghe ro tung note cua no. Cuoi cung, co ngui thay mui thom ngat gan cac bui cay — hoa hong dai moc trong mot vuong anh nang. Huong thom ngot ngao bay ve phia co tren lan gio am ap, va co cam thay mot luong vui suong thuan khiet. Dot ngot, tieng go manh cua mot con chim go kien khien moi nguoi giat minh. Roi ho nghe tieng canh cua no thi tham nhe nhang khi no bay len tren nhung ngon cay. Minh chua bao gio biet rang khu rung noi chuyen voi tat ca cac giac quan! Luna noi.",
      discussion_prompts: [
        {
          id: 1,
          question_en: "Retell the forest walk story using: saw, heard, felt, smelt.",
          prompt_vi: "Ke lai chuyen di rung dung: saw, heard, felt, smelt.",
          grammar_hint: "Luna heard... She felt... She saw... She smelt...",
          example_answer: "Luna heard a soft rustling sound in the tall grass. She felt a cool breeze on her face. Then she saw a vivid red butterfly on a green leaf. She felt the rough texture of the bark and the damp cool moss. She heard the distant echo of a waterfall. Finally, she smelt fragrant wild roses. At the end, a woodpecker startled everyone and they heard its wings whisper softly."
        },
        {
          id: 2,
          question_en: "Compare the two textures Luna felt. How were they different?",
          prompt_vi: "So sanh hai be mat Luna cam nhan. Chung khac nhau the nao?",
          grammar_hint: "The bark felt... The moss felt... They felt very different because...",
          example_answer: "Luna felt the rough bark of the oak tree first — it felt dry and uneven like cracked rock. Then she touched the damp moss beside the tree, and it felt cool and wonderfully soft. The two textures felt very different: the bark was hard and rough but the moss was soft and damp."
        },
        {
          id: 3,
          question_en: "Tell me about a nature walk or park visit you had. Use: saw, heard, felt, smelt.",
          prompt_vi: "Ke ve chuyen di dao tu nhien hoac tham cong vien cua ban. Dung: saw, heard, felt, smelt.",
          grammar_hint: "I saw... I heard... I felt... I smelt...",
          example_answer: "Last weekend, I walked in the park with my family. I saw colorful birds and tall green trees. I heard the birds singing and children playing. I felt the warm sun on my face and the soft cool grass under my feet. I smelt flowers near the garden path. It was a wonderful walk!"
        }
      ]
    },
    {
      mission_id: 2,
      id: 2,
      title: "Tom's Sensory Report - Practice",
      title_en: "Tom's Sensory Report - Practice",
      title_vi: "Bao Cao Giac Quan Cua Tom - Luyen Tap",
      theme: "Tom describes two sensory experiences: a forest walk and a visit to a flower market",
      type: "practice",
      image_url: "/images/week31/mission2_cover.jpg",
      nova_greeting: "Sensory report time! Tom had two amazing sensory experiences — a forest walk and a visit to a beautiful flower market. Help Tom retell everything using saw, heard, felt, and smelt!",
      mission_context: "CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 1-2 hint choices if student seems stuck: Say: ___ or ___! LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. Week 31 Mission 2. Student practises Past Simple Irregular Verbs (saw, heard, felt, smelt) through Tom's two sensory events. GRAMMAR FOCUS: see->saw, hear->heard, feel->felt, smell->smelt. VOCAB: forest, creature, rustling, fragrant, damp, echo, sensation, texture, vivid, distant, breeze, startled, whisper.",

      opening_narrative: "Tom's sensory report! Event One: The forest walk on Saturday. Event Two: The Sunday market on Sunday. Let us help Tom use the right past tense! What did Tom hear on the forest walk? Say: Tom heard birds singing or He heard a distant waterfall echo",

      story_arc: [
        {
          phase: "forest_walk",
          turns: "1-5",
          phase_name: "The Forest Walk (heard, saw, felt)",
          focus: "Past Simple: heard, saw, felt — forest sensory experiences",
          goal: "Student retells what Tom heard, saw, and felt in the forest",
          phase_questions: [
            "What vivid creature did Tom see? Say: Tom saw a vivid green beetle or He saw a beautiful creature on the bark",
            "How did the ground feel? Say: The ground felt damp and soft or Tom felt the damp moss with his hands",
            "Did Tom feel startled by anything? Say: Tom felt startled by a loud bird call or He felt surprised when a creature moved",
            "What did Tom say about the forest textures? Say: The bark felt rough and dry or He said the forest felt amazing"
          ]
        },
        {
          phase: "flower_market",
          turns: "6-10",
          phase_name: "The Flower Market (smelt, saw, felt)",
          focus: "Past Simple: smelt, saw, felt — flower market sensory experiences",
          goal: "Student retells what Tom smelt, saw, and felt at the flower market",
          phase_questions: [
            "What did Tom smell at the flower market? Say: Tom smelt fragrant roses or He smelt sweet flowers on every stall",
            "What vivid colors did Tom see? Say: Tom saw vivid red, orange, and yellow flowers or He saw the most beautiful colors",
            "Did the flowers smell very fragrant? Say: Yes, the roses smelt really fragrant or Everything smelt sweet and wonderful",
            "Did anything startle Tom? Say: Tom felt startled when a bee flew near him or He was surprised by a buzzing sound",
            "What was the best sensation at the market? Say: The best sensation was the fragrant breeze or Tom said the market felt magical"
          ]
        }
      ],

      minimum_turns: 10,
      maximum_turns: 12,

      story_text: "Tom had two great sensory events last weekend. Event One: The Forest Walk. On Saturday, Tom went on a forest walk with his dad. He walked along a damp path under tall trees. Tom heard birds singing high up in the canopy — their voices echoed through the trees. He saw a vivid green beetle with shiny wings crawl slowly up the bark of an old tree. The texture of the bark felt rough and dry under Tom's fingers. Further on, the ground felt soft and damp after morning rain. Tom heard a distant waterfall echo through the valley. It was the best sound he ever heard! Then a big bird flew past and Tom felt startled — he jumped back and laughed. Event Two: The Flower Market. On Sunday, Tom and his mum went to the flower market in town. First, Tom smelt something wonderful at the gate — fragrant roses in red, pink, and white. Then he walked inside and saw vivid bouquets in every color: yellow, orange, violet, and vivid crimson. He felt a gentle fragrant breeze drift through the whole market. Every flower smelt wonderful! He reached out to touch a rose petal — it felt smooth, cool, and soft. Then a bee buzzed past and Tom felt startled again! He laughed and said: I felt startled twice in one weekend!",
      discussion_prompts: [
        {
          id: 1,
          question_en: "Retell Tom's forest walk. Use: heard, saw, felt.",
          prompt_vi: "Ke lai chuyen di rung cua Tom. Dung: heard, saw, felt.",
          grammar_hint: "Tom heard... He saw... He felt...",
          example_answer: "On the forest walk, Tom heard birds singing and their voices echoed through the trees. He saw a vivid green beetle with shiny wings on the bark. The bark felt rough and dry under his fingers. The ground felt soft and damp. Tom heard the distant waterfall echo and felt startled when a big bird flew past."
        },
        {
          id: 2,
          question_en: "Retell Tom's flower market visit. Use: smelt, saw, felt.",
          prompt_vi: "Ke lai chuyen tham cho hoa cua Tom. Dung: smelt, saw, felt.",
          grammar_hint: "Tom smelt... He saw vivid... He felt...",
          example_answer: "At the flower market, Tom smelt fragrant roses at the gate. He saw vivid bouquets in every color — yellow, orange, violet, and red. He felt a gentle fragrant breeze through the market. He touched a rose petal and it felt smooth, cool, and soft. A bee flew past and Tom felt startled again!"
        },
        {
          id: 3,
          question_en: "Tell me about a place you visited that had interesting sights, sounds, or smells. Use: saw, heard, felt, smelt.",
          prompt_vi: "Ke ve mot noi ban da tham quan co canh dep, am thanh, hoac mui huong thu vi. Dung: saw, heard, felt, smelt.",
          grammar_hint: "I saw... I heard... I felt... I smelt...",
          example_answer: "Last weekend, I went to a park near my house. I saw tall green trees and colorful birds. I heard birds singing and children playing. I felt the warm sun and a cool breeze. I smelt the grass after the rain — it smelt fresh and clean. It was a beautiful sensory experience!"
        }
      ]
    },
    {
      mission_id: 3,
      id: 3,
      title: "Luna Designs a Sensory Trail - Creative",
      title_en: "Luna Designs a Sensory Trail - Creative",
      title_vi: "Luna Thiet Ke Duong Mon Giac Quan - Sang Tao",
      theme: "Creative planning — Luna designs an imaginary sensory trail and tells the story as if it happened",
      type: "creative",
      image_url: "/images/week31/mission3_cover.jpg",
      nova_greeting: "Creative mission! Luna loved the forest walk so much that she wants to design her own Sensory Trail — a special path where every step uses a different sense. She imagines it as if it already happened and tells the story using saw, heard, felt, and smelt. Help her create the most amazing sensory experience ever!",
      mission_context: "CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 1-2 hint choices if student seems stuck: Say: ___ or ___! LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. Week 31 Mission 3. Student creates an imaginative sensory trail story told in Past Simple. GRAMMAR FOCUS: saw, heard, felt, smelt. CREATIVE TASK: inventive past-tense sensory narrative with original descriptive choices.",

      opening_narrative: "Luna is designing her Sensory Trail! Five stations — five senses. She imagines walking it and tells the story in Past Simple. Station 1: Sight. What vivid thing did Luna see first on her trail? Say: Luna saw a vivid glowing crystal or She saw a waterfall of rainbow lights",

      story_arc: [
        {
          phase: "sight_and_sound",
          turns: 3,
          focus: "Luna designs the Sight and Sound stations — using saw and heard",
          ai_prompts: [
            "What did Luna see at the Sight Station? Say: She saw ___ or Luna saw the most vivid ___",
            "What did she hear at the Sound Station? Say: Luna heard ___ or She heard the echo of ___",
            "What made the sounds special? Say: The sounds felt distant and mysterious or She heard a waterfall echo in the valley"
          ]
        },
        {
          phase: "touch_and_smell",
          turns: 3,
          focus: "Luna designs the Touch and Smell stations — using felt and smelt",
          ai_prompts: [
            "What texture did Luna feel at the Touch Station? Say: Luna felt ___ or The sensation felt ___",
            "What fragrant smell was at the Smell Station? Say: Luna smelt ___ or She smelt the most fragrant ___",
            "What was the most wonderful sensation on the whole trail? Say: The best sensation was ___ or Luna felt the most amazing ___"
          ]
        },
        {
          phase: "mystery_station",
          turns: 3,
          focus: "Luna adds a Mystery Station — a surprise sensory experience",
          ai_prompts: [
            "What surprise was at the Mystery Station? Say: Luna felt startled by ___ or She heard a whisper in the ___",
            "What vivid creature appeared at the mystery station? Say: She saw a creature with ___ or Luna saw the most vivid ___",
            "What did Luna say at the end of the trail? Say: Luna said the trail was ___ or She said every sense felt ___"
          ]
        }
      ],

      minimum_turns: 10,
      maximum_turns: 12,

      story_text: "Luna imagined the perfect Sensory Trail — five stations, one for each sense. She told the story as if she walked it yesterday. Station One: Sight. Luna walked into a grove of tall silver trees. She saw vivid glowing fireflies floating in the dusk air — each one lit up in a different vivid color. It was the most beautiful thing she ever saw! Station Two: Sound. She stepped onto a bridge over a small stream. She heard the distant echo of a waterfall through the valley — cool and clear and musical. She also heard the gentle rustling of reeds in the breeze. Station Three: Touch. Luna touched the bark of a silver birch tree — the texture felt smooth and cool like paper. Then she pressed her hand into a patch of damp green moss. The sensation felt soft, cool, and wonderfully alive. Station Four: Smell. She walked into a garden of wildflowers. She smelt fragrant lavender on the warm breeze. Then she smelt the damp earth after rain — a clean, fresh sensation. Station Five: Mystery! Suddenly, a vivid blue-winged creature flew past her face. Luna felt startled! Then she heard its wings whisper softly in the air. She stood still and felt a rush of wonder — pure and joyful. At the end, Luna said: I designed the most sensory experience in the world!",
      discussion_prompts: [
        {
          id: 1,
          question_en: "Describe Luna's Sensory Trail. Use: saw, heard, felt, smelt.",
          prompt_vi: "Mo ta Duong Mon Giac Quan cua Luna. Dung: saw, heard, felt, smelt.",
          grammar_hint: "Luna saw... She heard... She felt... She smelt...",
          example_answer: "At the Sight Station, Luna saw vivid glowing fireflies in every color. At the Sound Station, she heard the distant echo of a waterfall and rustling reeds. She felt the smooth bark and the damp cool moss at the Touch Station. She smelt fragrant lavender and fresh damp earth at the Smell Station. Finally, at the Mystery Station, a vivid creature startled her and she heard its wings whisper softly."
        },
        {
          id: 2,
          question_en: "Design your own Sensory Trail. What would you see, hear, feel, and smell?",
          prompt_vi: "Thiet ke Duong Mon Giac Quan cua rieng ban. Ban se nhin thay, nghe, cam nhan va ngui gi?",
          grammar_hint: "I saw... I heard... I felt... I smelt...",
          example_answer: "On my trail, I saw vivid orange and yellow flowers and a butterfly. I heard birds singing and the echo of rain on leaves. I felt soft warm grass and the cool rough bark of a tree. I smelt fresh flowers and the damp earth after rain. At the end, I felt wonderful — like the whole forest was speaking to me!"
        },
        {
          id: 3,
          question_en: "Which of the five senses gave Luna the strongest feeling? Why?",
          prompt_vi: "Giac quan nao trong nam giac quan mang lai cam giac manh me nhat cho Luna? Tai sao?",
          grammar_hint: "I think... felt the strongest because... When Luna saw/heard/felt/smelt...",
          example_answer: "I think smell felt the strongest because when Luna smelt the fragrant lavender, she felt a rush of pure joy. Smells can take you somewhere beautiful without even trying. She also felt startled by the mystery creature — that felt very exciting and sudden!"
        }
      ]
    }
  ],

  spark_talk: [
    {
      id: "spark_w31_market_senses",
      emoji: "🏪",
      title: "My Market Adventure",
      title_vi: "Chuyen Di Cho Dep Trai",
      bridge: "Luna went to a local market last Saturday — and she used ALL five senses! Have YOU ever been to a market? What did you notice?",
      seed_question: "Did you ever go to a market? What did you see there?",
      image_url: "/images/week31/sparktalk_1.jpg",
      turns: 8,
      vocab_focus: ["market", "stall", "seller", "colourful", "fragrant", "tasty", "smooth", "rough"],
      frames: [
        { template: "I went to a market and saw ___", follow_up_q: "What else did you see at the market? Were the stalls colourful?", hints: ["colourful stalls", "beautiful flowers", "fresh fruit", "colourful cloth"], hint_en: "I went to a market and saw COLOURFUL STALLS." },
        { template: "The market sounded ___", follow_up_q: "What sounds did you hear? Did a seller call out prices?", hints: ["noisy and busy", "full of voices", "full of chatter", "very loud"], hint_en: "The market sounded NOISY AND BUSY." },
        { template: "I smelt something fragrant like ___", follow_up_q: "What did the market smell like? Were there any special smells?", hints: ["fresh flowers", "sweet mango", "spicy herbs", "fragrant incense"], hint_en: "I smelt something fragrant like FRESH FLOWERS." },
        { template: "The stall felt ___ when I touched it", follow_up_q: "Did you touch anything at the market? What did it feel like?", hints: ["smooth and cool", "rough and warm", "soft like cotton", "cold and hard"], hint_en: "The stall felt SMOOTH AND COOL when I touched it." },
        { template: "I tasted ___ and it was ___", follow_up_q: "Did you try any food at the market? What did it taste like?", hints: ["mango — sweet and juicy", "fresh coconut — cool", "grilled corn — salty", "banana cake — sweet"], hint_en: "I tasted MANGO and it was SWEET AND JUICY." },
        { template: "The most interesting thing at the market was ___", follow_up_q: "What was the most interesting thing you saw? Tell me more!", hints: ["the flower stall", "the fruit seller", "the colour of the cloth", "the shape of the baskets"], hint_en: "The most interesting thing at the market was THE FLOWER STALL." },
        { template: "My family bought ___ at the market", follow_up_q: "What did your family buy? Was it expensive or cheap?", hints: ["fresh vegetables", "tasty fruit", "colourful cloth", "beautiful flowers"], hint_en: "My family bought FRESH VEGETABLES at the market." },
        { template: "I would love to go back to the market because ___", follow_up_q: "Would you like to visit the market again? Why?", hints: ["the food was delicious", "everything was colourful", "the sellers were friendly", "there were so many things to see"], hint_en: "I would love to go back to the market because THE FOOD WAS DELICIOUS." }
      ]
    },
    {
      id: "spark_w31_five_senses",
      emoji: "👁️",
      title: "Five Senses Every Day",
      title_vi: "Nam Giac Quan Moi Ngay",
      bridge: "We all have five senses — sight, hearing, touch, smell, and taste! Which one do you use the most every day?",
      seed_question: "Which of your five senses do you use the most? Tell me: sight, hearing, touch, smell, or taste?",
      image_url: "/images/week31/sparktalk_2.jpg",
      turns: 8,
      vocab_focus: ["sight", "hearing", "touch", "smell", "taste", "sense", "sensation"],
      frames: [
        { template: "I use my ___ the most because ___", follow_up_q: "That's interesting! Can you give me an example of when you use that sense?", hints: ["sight — I read books", "hearing — I listen to music", "touch — I feel different things", "smell — I enjoy nice scents"], hint_en: "I use my SIGHT the most because I READ BOOKS." },
        { template: "The most beautiful colour I ever saw was ___", follow_up_q: "What a beautiful colour! Where did you see it?", hints: ["a rainbow in the sky", "flowers at the market", "my favourite crayon", "a sunset at the beach"], hint_en: "The most beautiful colour I ever saw was A RAINBOW IN THE SKY." },
        { template: "The most interesting sound I ever heard was ___", follow_up_q: "What did it sound like? Did it make you feel happy or surprised?", hints: ["a guitar playing", "rain on the roof", "birds singing", "waves on the beach"], hint_en: "The most interesting sound I ever heard was A GUITAR PLAYING." },
        { template: "Something I love to touch is ___ because ___", follow_up_q: "Do you like touching things? What's your favourite texture?", hints: ["soft cotton — it feels gentle", "smooth stone — it feels cool", "rough bark — it feels strong", "warm sand — it feels soft"], hint_en: "Something I love to touch is SOFT COTTON because it FEELS GENTLE." },
        { template: "A smell that reminds me of home is ___", follow_up_q: "That's a lovely memory! Who were you with when you smelt it?", hints: ["my mum's cooking", "fresh bread in the morning", "flowers in our garden", "rain on dry ground"], hint_en: "A smell that reminds me of home is MY MUM'S COOKING." },
        { template: "The yummiest thing I ever tasted was ___", follow_up_q: "Wow, that sounds delicious! Would you like to taste it again?", hints: ["my grandmother's soup", "fresh mango from the market", "homemade ice cream", "grilled corn with salt"], hint_en: "The yummiest thing I ever tasted was MY GRANDMOTHER'S SOUP." },
        { template: "My favourite sense is ___ because ___", follow_up_q: "That's a great reason! Can you tell me more?", hints: ["sight — I love seeing colours", "hearing — music makes me happy", "taste — food brings joy", "smell — smells bring back memories"], hint_en: "My favourite sense is SIGHT because I LOVE SEEING COLOURS." },
        { template: "If I could only keep one sense, I would choose ___", follow_up_q: "That's a tough choice! How would your day be different with only that sense?", hints: ["sight — I would miss seeing faces", "hearing — music is everything to me", "taste — food is my happiness", "touch — I need to feel things"], hint_en: "If I could only keep one sense, I would choose SIGHT." }
      ]
    }
  ],

  freetalk_knowledge: {
    topic: "The Five Senses, Local Market Exploration, Irregular Past Tense Perception Verbs",
    theme: "How we use our senses at a local market — sight, hearing, touch, smell, and taste in a Vietnamese market setting",
    key_facts: [
      "Humans have five senses: sight, hearing, touch, smell, and taste.",
      "Local markets are rich sensory environments — full of colours, voices, textures, smells, and tastes.",
      "The verbs see, hear, feel, and smell have irregular past tense forms: saw, heard, felt, smelt.",
      "Colourful means full of many bright, vivid colours — market stalls are often very colourful.",
      "Fragrant means having a pleasant, sweet smell — fresh flowers and fruits at a market are often fragrant.",
      "Tasty means delicious and enjoyable to eat — market food is often very tasty and fresh.",
      "Smooth means having an even, flat surface — smooth glass jars or polished wood feel nice to touch.",
      "Rough means having an uneven surface — rough baskets and wooden crates have a rough texture.",
      "Texture refers to how a surface feels when touched — rough, smooth, soft, or hard.",
      "A seller is a person who sells things at a market — they often call out prices loudly.",
      "A stall is a small shop or table at a market where sellers display their goods.",
      "Cambridge market vocabulary: stall (quầy hàng), seller (người bán), customer (khách hàng), cheap (rẻ), expensive (đắt), fresh (tươi), bargain (mua hời)",
      "Market materials: wooden baskets, glass jars, metal pots, cotton cloth, plastic bags, stone bowls"
    ],
    example_opening_questions: [
      "What is the most colourful place you have ever visited?",
      "Have you ever been to a local market? What did you see there?",
      "What is the most interesting texture you have ever touched at a shop or market?",
      "Describe a delicious food you have tasted at a market.",
      "What sounds would you hear at a busy local market?",
      "What is your favourite thing to buy at a market — food, clothes, or flowers?"
    ]
  },

  conversation_cards: [
    {
      level: "easy",
      card_title: "Easy: Forest Senses",
      prompts: [
        "What do you see in a forest?",
        "What sounds do you hear in nature?",
        "What is your favorite smell in nature?"
      ]
    },
    {
      level: "medium",
      card_title: "Medium: Sensory Descriptions",
      prompts: [
        "Describe three things you saw, heard, and felt on a walk outside.",
        "Compare the texture of two very different natural objects.",
        "Tell me about a time you smelt something unexpected outdoors."
      ]
    },
    {
      level: "hard",
      card_title: "Hard: Sensory Story",
      prompts: [
        "Tell a 3-sentence story about a nature walk using saw, heard, felt, and smelt.",
        "Explain why forests have more sensory experiences than cities.",
        "Design a Sensory Trail and describe what visitors would experience at each station."
      ]
    }
  ],

  knowledge_base: [
    "IMPORTANT — Always respond with empathy and understanding. Acknowledge student feelings before correcting. If a student shares something negative, say you are sorry or that sounds difficult.",
    "Use sensory language: saw, heard, felt, smelt — in vivid, engaging descriptions",
    "The Five Senses: sight, sound, touch, smell, taste — describe each one in the forest setting"
  ],

  metadata: {
    week: 31,
    phase: 1,
    cefr_level: "A1+",
    cambridge_prep: "YLE Movers",
    theme: "The Senses",
    block: "D",
    grammar_category: "irregular_past_tense",
    irregular_verbs_group: 3
  }
};

export default week31RealData;
