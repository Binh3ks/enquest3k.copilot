const week30RealData = {
  week_id: 30,
  week_number: 30,
  title: "The Perfect Picnic",
  weekTitle_en: "Picnic Time!",
  weekTitle_vi: "Den Gio Da Ngoai!",
  topic: "Describing past eating and buying events using Past Simple Irregular Verbs: ate, drank, bought, gave",
  topic_vi: "Mo ta cac hanh dong an uong trong qua khu dung Dong Tu Bat Quy Tac: ate, drank, bought, gave",
  theme: "Picnic, food and sharing, healthy eating, irregular past tense consumption verbs in context",

  grammar_focus: "Past Simple Irregular Verbs 2: eat->ate, drink->drank, buy->bought, give->gave",
  grammar_pattern: "___ ate ___. She drank ___. Mum bought ___ at the ___. I gave ___ to ___.",
  grammar_examples: [
    "Luna and her friends ate sandwiches at the park.",
    "Tom drank orange juice and said it was delicious.",
    "Mum bought fruits and bread at the supermarket.",
    "Luna gave some cookies to her friends.",
    "They ate apples, bananas, and grapes after the picnic.",
    "Everyone drank juice and shared the food happily."
  ],
  // Chunks/collocations AI must use in story_text narrative
  // Source: read.js bold chunks — multi-word phrases and high-value vocabulary
  chunk_focus: [
    "Last sunday",
    "had a picnic",
    "in the park",
    "good cook",
    "cheese sandwiches",
    "cold lemonade",
    "put everything",
    "picnic basket",
    "best food",
    "mum brought",
    "fresh strawberries",
    "wooden bridge",
    "crossed the river",
    "build this bridge",
    "having lunch"
  ],
  target_vocab: [
    { word: "picnic", pronunciation: "/ˈpɪknɪk/", definition_vi: "buổi dã ngoại", definition_en: "a meal eaten outdoors, usually in a park or countryside" },
    { word: "basket", pronunciation: "/ˈbɑːskɪt/", definition_vi: "giỏ", definition_en: "a container made of woven material, used for carrying food or other items" },
    { word: "sandwich", pronunciation: "/ˈsænwɪtʃ/", definition_vi: "bánh mì kẹp", definition_en: "two slices of bread with food such as cheese or meat between them" },
    { word: "lemonade", pronunciation: "/ˌleməˈneɪd/", definition_vi: "nước chanh", definition_en: "a cold sweet drink made from lemon juice, water, and sugar" },
    { word: "market", pronunciation: "/ˈmɑːkɪt/", definition_vi: "chợ", definition_en: "a place where people buy and sell food and other goods" },
    { word: "watermelon", pronunciation: "/ˈwɔːtəˌmelən/", definition_vi: "dưa hấu", definition_en: "a large green fruit with sweet red flesh and black seeds" },
    { word: "blanket", pronunciation: "/ˈblæŋkɪt/", definition_vi: "tấm khăn trải", definition_en: "a large piece of soft cloth used for sitting on outdoors or warmth" },
    { word: "thirsty", pronunciation: "/ˈθɜːsti/", definition_vi: "khát nước", definition_en: "feeling a strong need to drink something" },
    { word: "hungry", pronunciation: "/ˈhʌŋɡri/", definition_vi: "đói bụng", definition_en: "feeling a strong need or desire to eat food" },
    { word: "cheerful", pronunciation: "/ˈtʃɪəfʊl/", definition_vi: "vui vẻ", definition_en: "noticeably happy and optimistic" },
    { word: "delicious", pronunciation: "/dɪˈlɪʃəs/", definition_vi: "ngon", definition_en: "having a very pleasant taste or smell" },
    { word: "outdoor", pronunciation: "/ˈaʊtdɔː/", definition_vi: "ngoài trời", definition_en: "happening, existing, or done in the open air, not inside a building" },
    { word: "refreshing", pronunciation: "/rɪˈfrɛʃɪŋ/", definition_vi: "mát mẻ", definition_en: "pleasantly cool and making you feel full of energy" },
    { word: "engineer", pronunciation: "/ˌendʒɪˈnɪər/", definition_vi: "kỹ sư", definition_en: "a person who uses science and maths to design and build structures, machines, or systems" },
    { word: "scientist", pronunciation: "/ˈsaɪəntɪst/", definition_vi: "nhà khoa học", definition_en: "a person who studies the natural world through experiments and careful observation" },
    { word: "artist", pronunciation: "/ˈɑːrtɪst/", definition_vi: "họa sĩ / nghệ sĩ", definition_en: "a person who creates paintings, drawings, or other works of art" },
    { word: "dentist", pronunciation: "/ˈdentɪst/", definition_vi: "nha sĩ", definition_en: "a doctor who specialises in caring for people's teeth and gums" },
    { word: "firefighter", pronunciation: "/ˈfaɪərˌfaɪtər/", definition_vi: "lính cứu hỏa", definition_en: "a person whose job is to put out fires and rescue people from dangerous situations" },
    { word: "chef", pronunciation: "/ʃef/", definition_vi: "đầu bếp", definition_en: "a professional cook who works in a restaurant or hotel kitchen" }
  ],

  nova_instructions: {
    persona: "Nova - friendly bilingual AI tutor",
    language_mix: "English-dominant with Vietnamese scaffolding",
    key_correction: "Past Simple Irregular forms: eat->ate (NOT eated), drink->drank (NOT drinked), buy->bought (NOT buyed), give->gave (NOT gived)",
    nova_recast: "Great! They ATE sandwiches! Say: Luna and her friends ate sandwiches at the picnic. What did they drink?",
    grammar_guard: "Always model the correct irregular past form. Student says 'eated'? Recast with 'ate'. Student says 'drinked'? Recast with 'drank'. buyed->bought, gived->gave. Keep encouraging and move the picnic story forward."
  },

  v28_format_notes: {
    response_format: "ack + recast + question (V28 ONLY - NOT V25)",
    ack_options: ["Oh!", "I see!", "Nice!", "Wow!", "Really?", "Yummy!", "That is wonderful!"],
    recast_max_words: 8,
    recast_rules: [
      "Echo the food action with correct irregular past form",
      "Model: Subject + irregular verb + food item (ate/drank/bought/gave)",
      "Keep it fun and appetising — ask about the next picnic event"
    ],
    question_patterns_allowed: [
      "What did they eat?",
      "What did she drink?",
      "What did Mum buy?",
      "Who gave cookies to the friends?",
      "What happened next at the picnic?"
    ],
    question_patterns_forbidden: [
      "Why do you think...?",
      "What does... mean?",
      "Do you understand?"
    ],
    example_exchanges: [
      { student: "They eated sandwich", tutor_response: "Yummy! They ATE sandwiches! Say: Luna and her friends ate sandwiches. What did they drink?" },
      { student: "Mum buyed food", tutor_response: "Nice! Mum BOUGHT food! Say: Mum bought bread and fruits. Where did she buy them?" },
      { student: "Luna gived cookies", tutor_response: "Oh! Luna GAVE cookies! Say: Luna gave some cookies to her friends. What did they say?" }
    ]
  },

  story_missions: [
    {
      mission_id: 1,
      id: 1,
      title: "The Perfect Picnic - Story",
      title_en: "The Perfect Picnic - Story",
      title_vi: "Buoi Da Ngoai Hoan Hao - Cau Chuyen",
      theme: "Luna and her friends have a picnic in the park — eating, drinking, buying, and sharing food",
      type: "story",
      image_url: "/images/week30/mission1_cover.jpg",
      nova_greeting: "Picnic time! Last Sunday, Luna had a delicious picnic with her friends in the park. Let us find out what they ate, what they drank, and how they shared everything! Ready? What did Mum do first?",
      mission_context: "CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 1-2 hint choices if student seems stuck: Say: ___ or ___! LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. Week 30 Mission 1. Student tells the picnic story using Past Simple Irregular Verbs: ate (eat), drank (drink), bought (buy), gave (give). GRAMMAR FOCUS: Consumption irregular verbs — NO eated/drinked/buyed/gived. VOCAB: picnic, basket, sandwich, lemonade, market, watermelon, blanket, thirsty, hungry, cheerful, delicious, outdoor, refreshing.",

      opening_narrative: "What a wonderful sunny day for a picnic! Luna had an outdoor picnic with her friends Tom and Mia. Her mum went to the market and came back with a big basket full of food. What did Mum buy? Say: Mum bought bread, fruits, and juice or She bought picnic food at the market",

      story_arc: [
        {
          phase: "preparation",
          turns: "1-3",
          phase_name: "Mum Buys the Picnic Food (bought)",
          focus: "Past Simple: bought — shopping at the market",
          goal: "Student describes what Mum bought for the picnic",
          phase_questions: [
            "What did Mum buy at the market? Say: Mum bought bread, fruits, and juice or She bought food for the picnic",
            "What did they bring to the park? Say: They brought a big basket or Luna and her friends brought a blanket and a basket",
            "How did the park look when they arrived? Say: The park was sunny and cheerful or It was a beautiful outdoor day"
          ]
        },
        {
          phase: "eating",
          turns: "4-7",
          phase_name: "Eating and Drinking at the Picnic (ate, drank)",
          focus: "Past Simple: ate, drank — consuming food at the picnic",
          goal: "Student describes what the friends ate and drank",
          phase_questions: [
            "What did they eat first? Say: First, they ate sandwiches or The sandwiches were delicious",
            "What did Tom drink? Say: Tom drank orange juice or He drank orange juice — it was refreshing",
            "What did Luna drink? Say: Luna drank apple juice or She drank lemonade and felt refreshed",
            "Who was hungry at the picnic? Say: Tom was hungry or Tom said: I am hungry!"
          ]
        },
        {
          phase: "sharing",
          turns: "8-10",
          phase_name: "Sharing and Fruit Time (gave, ate)",
          focus: "Past Simple: gave, ate — sharing cookies and eating fruit",
          goal: "Student describes giving cookies and eating fruits",
          phase_questions: [
            "What did Luna give to her friends? Say: Luna gave some cookies to her friends or She gave cookies and they said thank you",
            "What did they eat after the picnic? Say: They ate fruits — apples, bananas, and grapes or They ate watermelon too",
            "What did everyone say at the end? Say: Everyone said: I love picnics! or They all said it was a perfect day"
          ]
        }
      ],

      minimum_turns: 10,
      maximum_turns: 12,

      story_text: "Last Sunday, Luna had an outdoor picnic with her friends Tom and Mia. First, Mum went to the market. She bought bread, fresh fruits, juice, and some cookies. Luna packed everything into a big blanket and a cheerful picnic basket. The three friends went to the park under a big tree. Tom looked at the basket and said: I am hungry! They spread the blanket on the green grass. First, they ate sandwiches. Luna ate one big sandwich with cheese. The sandwiches were delicious! Then, they drank juice. Luna drank apple juice — it was refreshing and sweet. Tom drank orange juice and smiled. Next, Luna opened the cookie box. She gave some cookies to Tom. She gave some to Mia too. Thank you! they said. They shared everything. Sharing is caring! After eating, they felt thirsty again — so they drank more lemonade. Then, they ate fruits — apples, bananas, and sweet watermelon. I love picnics! said Luna. Me too! said everyone. It was a perfect outdoor day!",
      story_text_vi: "Chu Nhat tuan truoc, Luna co buoi da ngoai ngoai troi voi cac ban Tom va Mia. Truoc tien, Me di cho. Me mua banh mi, hoa qua tuoi, nuoc ep va banh quy. Luna xep tat ca vao chiec chan phang va gio pic-nic vui ve. Ba nguoi ban den cong vien duoi mot tan cay lon. Tom nhin vao gio va noi: Con doi! Ho trai chiec chan len bai co xanh. Truoc tien, ho an banh mi kep. Luna an mot cai banh mi kep lon voi pho mai. Canh banh mi rat ngon! Sau do, ho uong nuoc ep. Luna uong nuoc ep tao — mat lanh va ngot. Tom uong nuoc ep cam va mim cuoi. Tiep theo, Luna mo hop banh quy. Co cho Tom mot so chiec banh. Co cung cho Mia nuoc. Cam on! chung noi. Ho chia se moi thu. Chia se la quan tam! Sau khi an, ho lai khat — nen ho uong nuoc chanh. Roi ho an hoa qua — tao, chuoi va dua hau ngot. Minh yeu thich da ngoai! Luna noi. Minh cung vay! moi nguoi noi. Do la mot ngay ngoai troi hoan hao!",
      discussion_prompts: [
        {
          id: 1,
          question_en: "Retell the picnic story using: ate, drank, bought, gave.",
          prompt_vi: "Ke lai cau chuyen da ngoai dung: ate, drank, bought, gave.",
          grammar_hint: "Mum bought... They ate... Luna drank... She gave...",
          example_answer: "Mum bought bread, fruits, and juice at the market. At the park, they ate sandwiches and they were delicious. Luna drank apple juice and Tom drank orange juice. Luna gave some cookies to her friends and they all shared everything."
        },
        {
          id: 2,
          question_en: "What did each person eat and drink? Describe Luna, Tom, and Mia.",
          prompt_vi: "Moi nguoi an va uong gi? Mo ta Luna, Tom va Mia.",
          grammar_hint: "Luna ate... and drank... Tom drank... and ate... Mia received...",
          example_answer: "Luna ate a big cheese sandwich and drank apple juice. Tom drank orange juice and ate sandwiches too. Luna gave cookies to Mia and Tom. After that, they all ate watermelon and other fruits. Everyone shared and it was a cheerful outdoor day."
        },
        {
          id: 3,
          question_en: "Tell me about your own picnic or meal. Use: ate, drank, bought, gave.",
          prompt_vi: "Ke ve buoi da ngoai hoac bua an cua ban. Dung: ate, drank, bought, gave.",
          grammar_hint: "I ate... I drank... We bought... I gave... to...",
          example_answer: "Last weekend, I had a meal with my family. Mum bought rice, vegetables, and fish at the market. I ate rice and vegetables. I drank water. My grandma gave me some delicious soup. It was a wonderful family meal."
        }
      ]
    },
    {
      mission_id: 2,
      id: 2,
      title: "Tom's Food Report - Practice",
      title_en: "Tom's Food Report - Practice",
      title_vi: "Bao Cao Am Thuc Cua Tom - Luyen Tap",
      theme: "Tom recalls what his family ate, drank, bought, and gave at the school picnic and birthday dinner",
      type: "practice",
      image_url: "/images/week30/mission2_cover.jpg",
      nova_greeting: "Food report time! Tom had two special eating events last week — the school picnic and his birthday dinner. Let us help Tom retell everything using the correct irregular past verbs: ate, drank, bought, gave!",
      mission_context: "CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 1-2 hint choices if student seems stuck: Say: ___ or ___! LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. Week 30 Mission 2. Student practises Past Simple Irregular Verbs (ate, drank, bought, gave) through Tom's two food events. GRAMMAR FOCUS: eat->ate, drink->drank, buy->bought, give->gave. VOCAB: picnic, basket, sandwich, lemonade, market, watermelon, blanket, thirsty, hungry, cheerful, delicious, outdoor, refreshing.",

      opening_narrative: "Tom's food report! Event One: The school picnic on Friday. Event Two: Tom's birthday dinner on Saturday. Let us help Tom use the right past tense! What did Tom eat at the school picnic? Say: Tom ate sandwiches or He ate a big watermelon slice at the picnic",

      story_arc: [
        {
          phase: "school_picnic",
          turns: "1-5",
          phase_name: "The School Picnic (ate, drank, bought)",
          focus: "Past Simple: ate, drank, bought — picnic food",
          goal: "Student retells what everyone ate and drank at the school picnic",
          phase_questions: [
            "What did Tom eat at the picnic? Say: Tom ate sandwiches or He ate a big slice of watermelon",
            "Was the food delicious? Say: Yes, the food was delicious or The sandwiches were really tasty",
            "Did Tom feel hungry or thirsty? Say: At first Tom was very hungry or He was thirsty so he drank lemonade",
            "What did Tom drink? Say: Tom drank lemonade or He drank cold lemonade and felt refreshed",
            "What did the teacher buy for the class? Say: The teacher bought juice and biscuits or She bought snacks for everyone"
          ]
        },
        {
          phase: "birthday_dinner",
          turns: "6-10",
          phase_name: "The Birthday Dinner (bought, gave, ate, drank)",
          focus: "Past Simple: bought, gave, ate, drank — birthday party food",
          goal: "Student retells the birthday dinner events",
          phase_questions: [
            "What did Mum buy for Tom's birthday? Say: Mum bought a big chocolate cake or She bought a cake and decorations",
            "What gift did Grandma give Tom? Say: Grandma gave Tom a book or She gave him a football as a gift",
            "What did everyone eat at the birthday dinner? Say: They ate cake and rice or Everyone ate the birthday meal together",
            "What did the family drink? Say: They drank juice at the party or Everyone drank lemonade and cheered",
            "How was the dinner? Say: The dinner was cheerful and delicious or It was the best birthday meal ever"
          ]
        }
      ],

      minimum_turns: 10,
      maximum_turns: 12,

      story_text: "Tom had two great food events last week. Event One: The School Picnic. On Friday, Tom's school had an outdoor picnic at the park. The teacher bought cold juice and biscuits for everyone. Tom brought a big sandwich from home. First, Tom ate his sandwich — it was delicious. Then, he ate a thick slice of watermelon. The watermelon was sweet and refreshing! Tom was very thirsty in the warm sun, so he drank two glasses of lemonade. Everyone sat on blankets under the trees and ate and drank together cheerfully. Event Two: Tom's Birthday Dinner. On Saturday evening, Tom's family had a birthday dinner. Mum went to the market and bought a big chocolate cake and Tom's favorite foods — noodles and fried chicken. Grandma came with a big gift box. She gave Tom a brand new football! Tom was so happy. They all sat together and ate the birthday meal. Dad drank tea. Tom drank orange juice. Mum cut the cake and gave a slice to everyone. I ate two big slices! said Tom with a cheerful grin. It was the most delicious birthday ever.",
      story_text_vi: "Tom co hai su kien am thuc tuyet voi tuan truoc. Su kien mot: Buoi Da Ngoai Cua Truong. Thu Nam, truong cua Tom co buoi da ngoai ngoai troi tai cong vien. Co giao mua nuoc lanh va banh quy cho moi nguoi. Tom mang mot cai banh mi kep lon tu nha. Truoc tien, Tom an banh mi kep — ngon viec! Sau do, anh an mot miem dua hau day. Dua hau ngot va mat lanh! Tom khat nuoc lam duoi nang am, nen anh uong hai ly nuoc chanh. Moi nguoi ngoi tren chan trai duoi goc cay va an uong vui ve. Su kien hai: Bua Tiec Sinh Nhat Cua Tom. Toi Thu Bay, gia dinh Tom co bua tiec sinh nhat. Me di cho va mua mot cai banh kem socola lon va cac mon an Tom yeu thich — mi va ga ran. Ba ngoai den voi mot hop qua lon. Ba tang Tom mot qua bong da moi toanh! Tom vui lam. Ca nha ngoi lai va an bua sinh nhat. Bo uong tra. Tom uong nuoc ep cam. Me cat banh va cho moi nguoi mot miem. Con an hai mieng lon! Tom noi voi nu cuoi vui ve. Do la buoi sinh nhat ngon nhat tung co.",
      discussion_prompts: [
        {
          id: 1,
          question_en: "Retell Tom's school picnic. Use: ate, drank, bought.",
          prompt_vi: "Ke lai buoi da ngoai truong cua Tom. Dung: ate, drank, bought.",
          grammar_hint: "The teacher bought... Tom ate... He drank...",
          example_answer: "At the school picnic, the teacher bought juice and biscuits for everyone. Tom ate a big sandwich and a slice of watermelon. He was thirsty so he drank two glasses of lemonade. They all sat on blankets and ate together."
        },
        {
          id: 2,
          question_en: "Retell Tom's birthday dinner. Use: bought, gave, ate, drank.",
          prompt_vi: "Ke lai bua sinh nhat cua Tom. Dung: bought, gave, ate, drank.",
          grammar_hint: "Mum bought... Grandma gave... They ate... Tom drank...",
          example_answer: "For Tom's birthday, Mum bought a big chocolate cake and Tom's favorite foods. Grandma gave Tom a new football. The family ate together — noodles, fried chicken, and birthday cake. Tom drank orange juice and he ate two big slices of cake!"
        },
        {
          id: 3,
          question_en: "Tell me about a meal or picnic you had. Use all four verbs: ate, drank, bought, gave.",
          prompt_vi: "Ke ve mot bua an hoac da ngoai ban da co. Dung ca bon dong tu: ate, drank, bought, gave.",
          grammar_hint: "I ate... I drank... Mum/Dad bought... Someone gave me...",
          example_answer: "Last weekend, my family had a picnic. Mum bought sandwiches, fruits, and juice. We ate the sandwiches first — they were delicious. I drank cold lemonade and felt refreshed. My grandma gave me a piece of cake as a surprise. It was a perfect outdoor day!"
        }
      ]
    },
    {
      mission_id: 3,
      id: 3,
      title: "Luna Plans the Next Picnic - Creative",
      title_en: "Luna Plans the Next Picnic - Creative",
      title_vi: "Luna Lap Ke Hoach Da Ngoai Tiep Theo - Sang Tao",
      theme: "Creative planning and storytelling — imagining a perfect future picnic using irregular past verbs",
      type: "creative",
      image_url: "/images/week30/mission3_cover.jpg",
      nova_greeting: "Creative mission! Luna loved today's picnic so much that she wants to plan the NEXT one. She is already thinking about what she will buy, what everyone will eat, and who she will give special treats to. Help her plan the perfect picnic by imagining it in the past tense — as if it already happened!",
      mission_context: "CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 1-2 hint choices if student seems stuck: Say: ___ or ___! LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. Week 30 Mission 3. Student creates an imaginative future picnic scenario, told in Past Simple as a story. GRAMMAR FOCUS: ate, drank, bought, gave. CREATIVE TASK: inventive past-tense narrative with original food choices and sharing moments.",

      opening_narrative: "Creative time! Luna imagined her next perfect picnic and told the story as if it already happened. Let us join her! Say: Luna bought ___ for the picnic or First, she went to the market and bought ___",

      story_arc: [
        {
          phase: "shopping_for_the_picnic",
          turns: 3,
          focus: "Luna goes shopping and buys creative food — using bought and went",
          ai_prompts: [
            "Luna went to the market to buy food for the picnic. What interesting things did she buy? Say: Luna bought ___ and ___ or She went to the market and bought ___",
            "She also bought special drinks for everyone! What did she choose? Say: Luna bought ___ because ___ or Everyone drank ___ and said ___",
            "Luna gave the shopkeeper a handwritten note with her order. What was on the note? Say: The note said: Please give me ___ or Luna asked for ___"
          ],
          model_responses: [
            "Luna bought a giant watermelon, a tower of strawberries, and tiny colorful sandwiches!",
            "Luna bought coconut water and homemade lemonade because they were healthy and delicious!",
            "The note said: Please give me two watermelons, a bag of oranges, and your freshest bread!"
          ]
        },
        {
          phase: "at_the_picnic",
          turns: 3,
          focus: "Everyone eats, drinks, and shares — using ate, drank, gave",
          ai_prompts: [
            "At the picnic, everyone ate something different! What did each person eat? Say: Tom ate ___, Mia ate ___, and Luna ate ___",
            "What special drink did Luna give to her friends? Say: Luna gave everyone ___ or She gave ___ to Tom because ___",
            "After the food, Luna had a surprise! She gave everyone a secret cookie bag. Say: Luna gave ___ a cookie bag and they said ___"
          ],
          model_responses: [
            "Tom ate five strawberry sandwiches, Mia ate watermelon, and Luna ate the coconut rice balls she made herself!",
            "Luna gave everyone a cup of homemade lemonade with mint leaves — Tom said it was the best thing he ever drank!",
            "Luna gave Mia a rainbow cookie bag and she said: Luna, you are the best friend I ever had!"
          ]
        },
        {
          phase: "the_best_picnic_ever",
          turns: 4,
          focus: "Creative storytelling — the full picnic in Luna's voice",
          ai_prompts: [
            "Now retell the whole picnic story! Say: Luna bought..., everyone ate..., she gave... and they all drank...",
            "What was the most special thing that happened? Say: The best moment was when ___ or Everyone laughed when ___",
            "At the end, everyone gave Luna a big thank you. What did they say? Say: They said ___ or Everyone gave Luna ___",
            "Luna wrote it all in her diary. Start: Today I planned the best picnic. I bought... We ate... I gave... We drank..."
          ],
          model_responses: [
            "Luna bought the most amazing food, everyone ate and laughed, she gave everyone surprise bags, and they all drank homemade lemonade together!",
            "The best moment was when Mia opened her cookie bag and found a note inside that said: You are my best friend!",
            "They all said: Luna, this was the best picnic ever! and everyone gave her a big group hug!",
            "Today I planned the best picnic. I bought strawberries, watermelon, and lemonade. We ate and laughed for hours. I gave everyone a cookie bag. We drank cool coconut water. It was absolutely perfect."
          ]
        }
      ]
    }
  ],

  spark_talk: [
    {
      id: 'spark_my_picnic',
      emoji: '🧺',
      title: 'Your Picnic Memory',
      bridge: 'Luna and her friends ate, drank, and shared everything at the park! And what about YOU — did you ever have a picnic or a special meal? 🌳',
      seed_question: 'Did you have a picnic? What did you eat — rice or sandwiches?',
      frames: [
        {
          template: 'I ate ___',
                    hint_en: "I ate rice and sandwiches",
          follow_up_q: 'What did you eat?',
          hints: ['rice', 'sandwiches', 'watermelon', 'fried chicken', 'cake']
        },
        {
          template: 'I drank ___',
                    hint_en: "I drank orange juice and water",
          follow_up_q: 'What did you drink?',
          hints: ['orange juice', 'water', 'lemonade', 'coconut water', 'milk']
        },
        {
          template: 'Mum bought ___',
                    hint_en: "Mum bought rice and vegetables",
          follow_up_q: 'What did your family buy for the meal?',
          hints: ['rice and vegetables', 'fruit and juice', 'a birthday cake', 'bread and cheese', 'snacks']
        },
        { template: 'We sat on ___',           hint_en: "We sat on the grass and a blanket",
          follow_up_q: 'Where did you sit? On the grass or on a blanket?', hints: ['the grass', 'a blanket', 'a bench'] },
        { template: 'I brought ___',           hint_en: "I brought sandwiches and fruit juice",
          follow_up_q: 'What did you bring to the picnic?', hints: ['sandwiches', 'fruit juice', 'a big blanket'] },
        { template: 'The food was ___',           hint_en: "The food was delicious and amazing",
          follow_up_q: 'How was the food? Was it delicious or amazing?', hints: ['delicious', 'amazing', 'the best'] },
        { template: 'After eating, we ___',           hint_en: "After eating, we played in the park",
          follow_up_q: 'What did you do after eating?', hints: ['played in the park', 'walked around', 'sat and talked'] },
        { template: 'I felt ___ after the picnic',           hint_en: "I felt happy and full after the picnic",
          follow_up_q: 'How did you feel after the picnic?', hints: ['happy', 'full and content', 'sleepy and relaxed'] }
      ],
      scaffold_frames: ['I ate ___', 'I drank ___', 'Mum bought ___'],
      vocab_focus: ['picnic', 'basket', 'sandwich', 'lemonade', 'watermelon'],
      turns: 8
    },
    {
      id: 'spark_sharing_moment',
      emoji: '🍪',
      title: 'I Gave and Shared',
      bridge: 'Luna gave cookies to all her friends and everyone said thank you! Do YOU have a sharing moment? 💝',
      seed_question: 'Did you give something to a friend? Was it food or a gift?',
      frames: [
        {
          template: 'I gave ___ to ___',
                    hint_en: "I gave cake to my friend",
          follow_up_q: 'What did you give, and to whom?',
          hints: ['cake to my friend', 'fruit to my sister', 'a gift to my mum', 'cookies to my class', 'food to my grandpa']
        },
        {
          template: 'They said ___',
                    hint_en: "They said thank you so much",
          follow_up_q: 'What did they say when you gave it to them?',
          hints: ['thank you', 'thank you so much', 'I love it', 'you are so kind', 'delicious']
        },
        {
          template: 'I felt ___',
          hint_en: 'I felt HAPPY after sharing.',
          follow_up_q: 'How did you feel after sharing?',
          hints: ['happy', 'proud', 'warm inside', 'really good', 'great']
        },
        { template: 'They were so ___ when I gave it',           hint_en: "They were so happy when I gave it",
          follow_up_q: 'How did they react? Were they happy or surprised?', hints: ['happy', 'surprised', 'touched'] },
        { template: 'I also gave ___ to my neighbor',           hint_en: "I also gave a card to my neighbor",
          follow_up_q: 'Who else did you share with?', hints: ['a card', 'fruit', 'flowers'] },
        { template: 'When I give, I feel ___',           hint_en: "When I give, I feel warm inside",
          follow_up_q: 'How do you feel when you give something?', hints: ['generous', 'happy', 'wonderful inside'] },
        { template: 'The best gift I gave was ___',           hint_en: "The best gift I gave was a handmade card",
          follow_up_q: 'What is the best thing you ever gave?', hints: ['a handmade card', 'my time and help', 'a special present'] },
        { template: 'Sharing makes me feel ___ and it makes others smile',           hint_en: "Sharing makes me feel happy and it makes others smile",
          follow_up_q: 'Why does sharing make you feel good?', hints: ['happy', 'proud', 'warm'] }
      ],
      scaffold_frames: ['I gave ___ to ___', 'They said ___', 'I felt ___'],
      vocab_focus: ['give', 'share', 'cheerful', 'delicious', 'grateful'],
      turns: 8
    }
  ],

  conversation_cards: [
    {
      id: "picnic_chat",
      title: "At the Picnic",
      emoji: "🧇",
      theme: "Practising ate, drank, bought, gave in a picnic context",
      difficulty: "easy",
      exchanges: [
        { ai: "Picnic time! What did your family eat at a picnic or meal? Say: We ate ___ or I ate ___", options: ["We ate sandwiches and fruit at the park.", "I ate rice and chicken with my family.", "We ate watermelon — it was refreshing!"] },
        { ai: "Yummy! What did you drink? Say: I drank ___ or We drank ___", options: ["I drank cold lemonade and felt refreshed.", "We drank orange juice at the picnic.", "I drank water because I was thirsty."] },
        { ai: "Great! Who bought the food? Say: ___ bought ___ or Mum/Dad bought ___", options: ["Mum bought bread and fruits at the market.", "Dad bought juice and sandwiches for everyone.", "Grandma bought a cake and gave it to us."] },
        { ai: "Sharing is caring! Did you give food to someone? Say: I gave ___ to ___ or ___ gave me ___", options: ["I gave some cookies to my friend.", "Grandma gave me a slice of watermelon.", "I gave my sandwich to my little sister."] },
        { ai: "Perfect! Use ALL FOUR verbs about one meal! Say: I ate... drank... Mum bought... I gave...", options: ["I ate sandwiches, drank lemonade, Mum bought the food, and I gave cookies to my friend!", "We ate watermelon, drank juice, Dad bought everything, and Grandma gave us cake."] }
      ],
      completion_message: "Amazing picnic chat! You used ate, drank, bought, and gave perfectly! 🥪"
    },
    {
      id: "picnic_story_retell",
      title: "Retell the Picnic",
      emoji: "📖",
      theme: "Retelling the picnic story using irregular past verbs and sequence words",
      difficulty: "medium",
      exchanges: [
        { ai: "Story time! Let us retell Luna's picnic. First — what did Mum do? Say: First, Mum bought ___ or She went to the market and bought ___", options: ["First, Mum bought bread, fruits, and juice at the market.", "Mum went to the market and bought picnic food for everyone.", "First, Mum bought sandwiches and drinks for the picnic."] },
        { ai: "Good! Next — what did they eat first? Say: First, they ate ___ or When they arrived, they ate ___", options: ["First, they ate sandwiches — they were delicious!", "They spread the blanket and ate sandwiches together.", "First, everyone ate their sandwiches under the big tree."] },
        { ai: "After that — what did they drink? Say: Then, they drank ___ or Luna drank ___ and Tom drank ___", options: ["Then, they drank juice — Luna drank apple and Tom drank orange.", "After eating, they drank cold lemonade to refresh themselves.", "Luna drank apple juice and Tom drank orange juice happily."] },
        { ai: "Then — who gave cookies? Say: Luna gave ___ to ___ or She gave cookies and they said ___", options: ["Luna gave some cookies to Tom and Mia — they said thank you!", "She gave everyone cookies and they shared everything together.", "Luna gave cookies to her friends because sharing is caring."] },
        { ai: "Finally — what did they eat at the end? Say: Finally, they ate ___ or After that, everyone ate more ___", options: ["Finally, they ate fruits — apples, bananas, and sweet watermelon!", "They ate more fruit after the sandwiches and cookies.", "Finally, everyone ate watermelon and said: I love picnics!"] }
      ],
      completion_message: "Picnic story retold beautifully! You used First, Then, After that, Finally — and all four consumption verbs! 🌟"
    },
    {
      id: "tom_food_debate",
      title: "Tom's Food Debate",
      emoji: "🍎",
      theme: "Creative debate about food choices and healthy eating using ate, drank, bought, gave",
      difficulty: "hard",
      exchanges: [
        { ai: "Tom says he bought chips and fizzy drinks for the picnic instead of fruit and water. What do you think he ate and drank? Say: Tom ate ___ and drank ___ or He bought ___ instead of ___", options: ["Tom ate chips and drank fizzy cola instead of fruit and water.", "He bought crisps and drank soda — not very healthy for a picnic!", "Tom ate junk food and drank sugary drinks instead of healthy ones."] },
        { ai: "Luna gave Tom an apple and said it was better. Did Tom eat it? Say: Tom ate the apple because ___ or He did not eat it because ___", options: ["Tom ate the apple because Luna said it had natural sugar and vitamins.", "He did not eat it at first because he preferred chips, but then he tried it!", "Tom ate the apple slowly and said it was actually quite sweet and nice."] },
        { ai: "What is better to drink at a picnic — juice or fizzy drinks? Say: It is better to drink ___ because ___ or I think ___ is healthier because ___", options: ["It is better to drink water or juice because they do not have too much sugar.", "I think fresh juice is healthier because it comes from real fruit.", "Water is the best drink because it has no sugar and keeps you healthy."] },
        { ai: "Luna bought fresh fruit and gave some to everyone. Which fruit do you think they ate? Say: They ate ___ which was ___ or Luna gave them ___ and it tasted ___", options: ["They ate watermelon which was cool, sweet, and juicy on a hot day.", "Luna gave them apples and oranges and everyone said they tasted great.", "They ate bananas and grapes — easy to eat at a picnic and very tasty."] },
        { ai: "At the end, Tom said sorry and gave his chips to the birds. What lesson did he learn? Say: Tom learned that ___ or He understood that eating ___ was better because ___", options: ["Tom learned that eating fresh food gives you more energy and makes you feel good.", "He understood that buying healthy snacks was better for a picnic in the sun.", "Tom learned that sharing healthy food made the picnic much more special for everyone."] }
      ],
      minimum_turns: 10,
      maximum_turns: 12,

      completion_message: "Brilliant debate! You used ate, drank, bought, and gave to talk about food choices like a real English speaker! 🍎🌟"
    }
  ],

  freetalk_knowledge: {
    week_title: "The Perfect Picnic",
    week_number: 30,
    theme: "Food and sharing using Past Simple Irregular Verbs",

    knowledge_base: [
    "IMPORTANT — Always respond with empathy and understanding. Acknowledge student feelings before correcting. If a student shares something negative, say you are sorry or that sounds difficult.",
      "Irregular verbs: eat→ate, drink→drank, buy→bought, give→gave",
      "We use Past Simple to describe finished food events",
      "Picnic vocabulary: basket, blanket, sandwich, lemonade, watermelon, market",
      "Luna's mum bought food at the market and brought it in a big basket",
      "They ate sandwiches, drank lemonade, and shared everything",
      "Giving and sharing: She gave Tom a sandwich. He gave Mia some watermelon.",
      "NEVER say eated, drinked, buyed, or gived — these are wrong",
      "Sequence: First they bought food, then they ate, finally they gave gifts",
      "Cambridge occupations 2: engineer (kỹ sư), scientist (nhà khoa học), artist (họa sĩ), dentist (nha sĩ), firefighter (lính cứu hỏa), chef (đầu bếp)",
      "In the picnic story: Tom's dad is a chef (made food), Mia's mum is a scientist (brought fruit), Luna's uncle is an engineer (built bridge), they saw firefighters, an artist painted the lake, Tom jokes about the dentist"
    ],

    example_opening_questions: [
      "Have you ever had a picnic? What did you eat?",
      "What food did Luna's mum buy at the market?",
      "Can you say the past tense of eat, drink, buy, and give?",
      "What is your favorite food to eat outside?",
      "If you went on a picnic, what would you bring? What did you eat and drink?",
      "How did Luna and her friends share their food?"
    ],

    starter_prompts: [
      { text_en: "I want to play games! 🎮", text_vi: "Tôi muốn chơi game!", type: "game" },
      { text_en: "Translate this for me... 📖", text_vi: "Dịch giúp con câu/chữ này...", type: "help" },
      { text_en: "Let's do roleplay! 🎭", text_vi: "Chơi nhập vai đi cô!", type: "roleplay" }
    ]
  },

  metadata: {
    week: 30,
    phase: 1,
    cefr_level: "A1+",
    cambridge_prep: "YLE Movers",
    grammar_guard: {
      target_tense: "Past Simple Irregular: eat->ate, drink->drank, buy->bought, give->gave",
      forbidden_structures: ["eated", "drinked", "buyed", "gived", "did not ate", "did not drank"],
      focus_verbs: ["ate", "drank", "bought", "gave"]
    }
  }
};

export default week30RealData;
