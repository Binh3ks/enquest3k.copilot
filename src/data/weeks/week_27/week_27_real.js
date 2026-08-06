const week27RealData = {
  week_id: 27,
  week_number: 27,
  title: "Maya's Growing Plant",
  weekTitle_en: "Maya's Growing Plant",
  weekTitle_vi: "Cay Trong Cua Maya",
  topic: "Describing plant growth using Present Simple for facts with sequence words (First, Next, After that, Finally)",
  topic_vi: "Mo ta su phat trien cua cay dung Hien Tai Don cho su that voi cac tu chi trinh tu (First, Next, After that, Finally)",
  theme: "Plant life cycle, Maya's bean plant experiment, photosynthesis, Mr. Chen's science class, seed germination, root stem leaf flower sequence",

  grammar_focus: "Present Simple for Facts: it grows, it needs, roots absorb, leaves make food — sequence: First, Next, After that, Finally",
  grammar_pattern: "A seed needs ___. The root absorbs ___. A leaf uses ___ to ___. The stem carries ___ to ___.",
  grammar_examples: [
    "A seed needs water and warmth to germinate.",
    "The root absorbs water and nutrients from the soil.",
    "The stem carries water up from the root to the leaves.",
    "A leaf uses sunlight to make food — this is called photosynthesis.",
    "First, a seed is planted. Next, a sprout appears. After that, the stem grows. Finally, a flower blooms.",
    "Plants need three things: water, sunlight, and nutrients."
  ],
  // Chunks/collocations AI must use in story_text narrative
  // Source: read.js bold chunks — multi-word phrases and high-value vocabulary
  chunk_focus: [
    "monday morning",
    "at school",
    "rich soil",
    "bean seeds",
    "watch carefully",
    "Watch the seed",
    "every day",
    "First of all",
    "bean seed",
    "added water",
    "warm water",
    "warm sunlight",
    "germinate into",
    "plants need",
    "three things",
    "grow from",
    "tiny seed",
    "good soil",
    "tiny sprout",
    "absorbs water"
  ],
  target_vocab: [
    { word: "seed", pronunciation: "/siːd/", definition_vi: "hạt giống", definition_en: "a small part of a plant from which a new plant grows when placed in soil" },
    { word: "soil", pronunciation: "/sɔɪl/", definition_vi: "đất", definition_en: "the top layer of the earth in which plants grow, containing minerals and nutrients" },
    { word: "root", pronunciation: "/ruːt/", definition_vi: "rễ cây", definition_en: "the part of a plant that grows underground and absorbs water and nutrients" },
    { word: "stem", pronunciation: "/stɛm/", definition_vi: "thân cây", definition_en: "the main long thin part of a plant above the ground that holds the leaves and flowers" },
    { word: "leaf / leaves", pronunciation: "/liːf/ /liːvz/", definition_vi: "lá cây", definition_en: "the flat green parts of a plant that grow on the stem and use sunlight to make food" },
    { word: "flower", pronunciation: "/ˈflaʊər/", definition_vi: "bông hoa", definition_en: "the colorful part of a plant that blooms and produces new seeds" },
    { word: "sprout", pronunciation: "/spraʊt/", definition_vi: "mầm cây", definition_en: "the first small green shoot that appears above the soil when a seed begins to grow" },
    { word: "germinate", pronunciation: "/ˈdʒɜːmɪneɪt/", definition_vi: "nảy mầm", definition_en: "to begin to grow from a seed — the first stage of plant growth" },
    { word: "absorb", pronunciation: "/əbˈzɔːb/", definition_vi: "hấp thụ", definition_en: "to take in water or nutrients through roots or other surfaces" },
    { word: "nutrients", pronunciation: "/ˈnjuːtriənts/", definition_vi: "chất dinh dưỡng", definition_en: "substances in soil that plants need to grow strong and healthy" },
    { word: "sunlight", pronunciation: "/ˈsʌnlaɪt/", definition_vi: "ánh sáng mặt trời", definition_en: "light from the sun — essential for plants to make food through photosynthesis" },
    { word: "photosynthesis", pronunciation: "/ˌfəʊtəʊˈsɪnθɪsɪs/", definition_vi: "quang hợp", definition_en: "the process by which plants use sunlight, water, and carbon dioxide to make food" },
    { word: "observe", pronunciation: "/əbˈzɜːv/", definition_vi: "quan sát", definition_en: "to watch something carefully and notice what is happening — what scientists do" }
  ],

  nova_instructions: {
    persona: "Nova - friendly bilingual AI tutor",
    language_mix: "English-dominant with Vietnamese scaffolding",
    key_correction: "Present Simple -s form for He/She/It facts (grows, absorbs, carries, uses, needs)",
    nova_recast: "Great! The root ABSORBS water! Say: The root absorbs water from the soil. What does the stem do?",
    grammar_guard: "Always model the full Present Simple fact form. Missing -s with He/She/It? Add it back. Used past tense for a fact? Recast to present. Sequence word missing? Model: First... Next... After that... Finally..."
  },

  v28_format_notes: {
    response_format: "ack + recast + question (V28 ONLY - NOT V25)",
    ack_options: ["Oh!", "I see!", "Nice!", "Wow!", "Really?", "Interesting!", "That is wonderful!"],
    recast_max_words: 8,
    recast_rules: [
      "Echo the plant fact with correct Present Simple form",
      "Model: Subject + verb-s + details (for He/She/It)",
      "Keep it encouraging and ask about the next plant part or growth stage"
    ],
    question_patterns_allowed: [
      "What does the root do?",
      "What comes next?",
      "What does the leaf use?",
      "What happens after that?",
      "What does the stem carry?"
    ],
    question_patterns_forbidden: [
      "Why do you think...?",
      "What does... mean?",
      "Do you understand?"
    ],
    example_exchanges: [
      { student: "Root absorb water", tutor_response: "Nice! The root ABSORBS water! Say: The root absorbs water from the soil. What does the stem do?" },
      { student: "Leaf make food", tutor_response: "Great! A leaf MAKES food! Say: A leaf uses sunlight to make food. What is this process called?" },
      { student: "The seed needed water", tutor_response: "Wow! A seed NEEDS water — it is always true! Say: A seed needs water and warmth to germinate. What happens next?" }
    ]
  },

  story_missions: [
    {
      mission_id: 1,
      id: 1,
      title: "Maya's Growing Plant - Story",
      title_en: "Maya's Growing Plant - Story",
      title_vi: "Cay Trong Cua Maya - Cau Chuyen",
      theme: "Maya observes her bean plant grow from seed to flower over four weeks",
      type: "story",
      image_url: "/images/week27/mission1_cover.jpg",
      nova_greeting: "Science class time! Maya planted a bean seed on Monday and watched it grow every day. Let us explore the life cycle of her plant together!",
      mission_context: "CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 1-2 hint choices if student seems stuck: Say: ___ or ___! LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. Week 27 Mission 1. Student practices Present Simple for facts by describing each stage of Maya's plant growth. GRAMMAR FOCUS: needs, absorbs, carries, uses, grows, blooms. VOCAB: seed, soil, root, stem, leaf, flower, sprout, germinate, absorb, nutrients, sunlight, photosynthesis, observe.",

      story_character: {
        name: "Maya",
        personality: "curious and scientific, loves observing and recording new things",
        backstory: "Maya is in Mr. Chen's science class. She planted a bean seed on Monday and wrote in her notebook every day. After four weeks, she observed the complete life cycle: seed → sprout → stem → leaf → flower.",
        speaking_style: "precise and scientific, uses sequence words naturally, describes facts clearly",
        facts: {
          planted_seed_on_monday: true,
          sprout_appeared_day_five: true,
          stem_grew_toward_sunlight: true,
          leaves_used_photosynthesis: true,
          flower_bloomed_week_four: true,
          observed_complete_life_cycle: true
        },
        role: "Young scientist who carefully observes and records plant growth"
      },

      opening_narrative: "What an exciting science adventure! Maya arrived at school on Monday with a pot of soil, bean seeds, and her notebook. Mr. Chen said: observe your seed every day and record what you see. Let us follow Maya's plant from Day One to Week Four! What did Maya do first? Say: First Maya planted a seed or Maya put a seed in the soil",

      story_arc: [
        {
          phase: "planting_day",
          turns: "1-3",
          phase_name: "Day One — Planting the Seed",
          focus: "Present Simple for facts: needs, grows",
          goal: "Student describes what a seed needs using Present Simple facts",
          phase_questions: [
            "Day One! What did Maya do first? Say: First Maya planted the seed in the soil or Maya put one seed into the pot",
            "What does a seed need to germinate? Say: A seed needs water and warmth or It needs sunlight and nutrients to grow",
            "What does Mr. Chen say plants need? Say: Plants need three things — water sunlight and nutrients or A seed needs water warmth and soil to germinate"
          ]
        },
        {
          phase: "germination",
          turns: "4-6",
          phase_name: "Day Three to Five — The Sprout Appears",
          focus: "Present Simple: appears, pushes, grows",
          goal: "Student describes sprout stage using Present Simple",
          phase_questions: [
            "Day Three! What did Maya see in the soil? Say: Maya saw a tiny crack in the soil or A small crack appeared in the soil",
            "Day Five! What happened? Say: A tiny green sprout pushed through the soil or The sprout appeared on Day Five",
            "What does a sprout do? Say: A sprout grows toward the sunlight or It pushes up through the soil toward the light"
          ]
        },
        {
          phase: "stem_and_leaves",
          turns: "7-8",
          phase_name: "Week Two to Three — Stem and Leaves",
          focus: "Present Simple: carries, uses, makes, absorbs",
          goal: "Student describes stem and leaf functions using facts",
          phase_questions: [
            "The stem! What does the stem do? Say: The stem carries water from the root to the leaves or It transports water upward",
            "The leaves! What do leaves do? Say: A leaf uses sunlight to make food or Leaves use sunlight for photosynthesis — this is called photosynthesis"
          ]
        },
        {
          phase: "flower_blooms",
          turns: "9-10",
          phase_name: "Week Four — The Flower Blooms",
          focus: "Finally + Present Simple: blooms, completes",
          goal: "Student completes the life cycle sequence",
          phase_questions: [
            "Week Four! What happened at the top of the plant? Say: Finally a yellow flower bloomed or A small flower appeared at the top after four weeks",
            "What is the complete life cycle? Say: Seed sprout stem leaf flower or The sequence is seed then sprout then stem then leaf then flower",
            "Why did Maya clap? Say: Maya was happy because she observed the complete life cycle or She saw everything from seed to flower"
          ]
        }
      ],

      minimum_turns: 8,
      maximum_turns: 12,

      story_text: "It was Monday morning when Maya arrived at school with a small pot of dark soil, a packet of bean seeds, and a notebook ready to observe. 'Today,' said Mr. Chen, 'we begin our Plant Growth Project. You will observe your seed every day and record what you see.' First, Maya pressed one small seed into the soil with her finger. She covered it gently and added water. 'A seed needs water and warmth to germinate,' said Mr. Chen. 'It is a natural fact: plants need three things — water, sunlight, and nutrients from the soil.' On Day Three, Maya checked her pot. She saw a tiny crack in the soil. By Day Five, a small green sprout pushed through! Maya wrote: 'The seed has germinated. A tiny green sprout appears. It grows towards the light.' Next, the sprout became a stem. The stem grew taller every day, reaching for the sunlight. 'The stem carries water up from the root to the leaves,' explained Mr. Chen. After that, two small leaves opened. 'A leaf uses sunlight to make food. This process is called photosynthesis.' Finally, after four weeks, a small yellow flower appeared at the top. Maya clapped with joy. She had observed the complete life cycle: seed → sprout → stem → leaf → flower.",
      story_text_vi: "Do la sang thu Hai khi Maya den truong voi mot chau dat den, mot goi hat giong va mot cuon so san sang quan sat. 'Hom nay,' ong Chen noi, 'chung ta bat dau Du An Trong Cay. Cac em se quan sat hat giong moi ngay va ghi lai nhung gi thay.' Dau tien, Maya an mot hat giong nho vao dat bang ngon tay. Co lap lai nhe nhan va tuoi nuoc. 'Mot hat giong can nuoc va hoi am de nay mam,' ong Chen noi. 'Day la su that: cay can ba thu — nuoc, anh sang mat troi, va chat dinh duong tu dat.' Vao Ngay Thu Ba, Maya thay mot vet nut nho tren dat. Den Ngay Thu Nam, mot mam cay xanh nho chui len! Maya viet: 'Hat giong da nay mam. Mot mam cay xanh nho xuat hien. No lon len ve phia anh sang.' Tiep theo, mam cay thanh than cay. Than cay vuon cao hon moi ngay. 'Than cay chuyen nuoc tu re len la,' ong Chen giai thich. Sau do, hai la nho mo ra. 'Mot la dung anh sang mat troi de tao ra thuc an. Qua trinh nay goi la quang hop.' Cuoi cung, sau bon tuan, mot bong hoa vang nho xuat hien. Maya vo tay vui mung. Co da quan sat toan bo vong doi: hat giong → mam cay → than cay → la → bong hoa.",
      discussion_prompts: [
        {
          id: 1,
          question_en: "Describe what a seed needs to grow. Use Present Simple for facts.",
          prompt_vi: "Mo ta nhung gi mot hat giong can de moc len. Dung Hien Tai Don cho su that.",
          grammar_hint: "A seed needs... It requires... Plants need three things: water, sunlight, and...",
          example_answer: "A seed needs water and warmth to germinate. It also needs nutrients from the soil. Plants need three things: water, sunlight, and nutrients. Without these, a seed cannot grow."
        },
        {
          id: 2,
          question_en: "Describe the stages from Day One to Day Five using sequence words.",
          prompt_vi: "Mo ta cac giai doan tu Ngay 1 den Ngay 5 dung tu chi trinh tu.",
          grammar_hint: "First, Maya plants the seed... Next, on Day Three... After that, on Day Five... A sprout appears and...",
          example_answer: "First, Maya plants the seed in the soil and adds water. Next, on Day Three, a tiny crack appears in the soil. After that, on Day Five, a small green sprout pushes through the soil. The sprout grows toward the sunlight."
        },
        {
          id: 3,
          question_en: "Describe what roots, stems, and leaves do. Use Present Simple facts for each.",
          prompt_vi: "Mo ta nhung gi re cay, than cay va la cay lam. Dung su that Hien Tai Don cho tung phan.",
          grammar_hint: "The root absorbs... The stem carries... A leaf uses... to make...",
          example_answer: "The root absorbs water and nutrients from the soil. The stem carries water up from the root to the leaves. A leaf uses sunlight to make food — this process is called photosynthesis. Together these three parts help the plant grow and bloom."
        }
      ]
    },
    {
      mission_id: 2,
      id: 2,
      title: "Sam's Plant Experiment - Practice",
      title_en: "Sam's Plant Experiment - Practice",
      title_vi: "Thi Nghiem Cay Cua Sam - Luyen Tap",
      theme: "Sam grows three different plants and compares their growth using Present Simple facts",
      type: "practice",
      image_url: "/images/week27/mission2_cover.jpg",
      nova_greeting: "Plant experiment time! Sam is Maya's classmate. He grew three different plants and wants to compare them. Let us help him describe what each plant needs and does!",
      mission_context: "CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 1-2 hint choices if student seems stuck: Say: ___ or ___! LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. Week 27 Mission 2. Student practices Present Simple for facts through Sam's plant comparison experiment. GRAMMAR FOCUS: needs, absorbs, carries, uses, grows, produces. VOCAB: seed, soil, root, stem, leaf, sunlight, germinate, absorb, nutrients, sprout.",

      story_character: {
        name: "Sam",
        personality: "systematic and methodical, loves comparing and measuring things",
        backstory: "Sam grew three plants from seeds: a bean plant, a sunflower, and a cactus. He observed that different plants have different needs but all follow the same basic life cycle.",
        speaking_style: "precise and scientific, uses comparisons and facts clearly",
        facts: {
          grew_bean_plant: true,
          grew_sunflower: true,
          grew_cactus: true,
          all_need_basic_conditions: true,
          different_amounts_of_water: true,
          same_basic_life_cycle: true
        },
        role: "Student scientist who compares different plants using Present Simple facts"
      },

      opening_narrative: "Sam's experiment starts now! Sam grew three plants in Mr. Chen's class. Plant A is a bean plant. Plant B is a sunflower. Plant C is a cactus. Let us help Sam describe what each plant needs and does! What does every plant need? Say: Every plant needs water sunlight and nutrients or Plants need three things to grow",

      story_arc: [
        {
          phase: "basic_needs",
          turns: "1-3",
          phase_name: "What Every Plant Needs",
          focus: "Present Simple: needs, requires",
          goal: "Student states the universal needs of all plants as facts",
          phase_questions: [
            "What does every plant need to survive? Say: Every plant needs water sunlight and nutrients or A plant needs three things to grow",
            "What does a seed need first? Say: A seed needs water and warmth to germinate or Seeds need moisture and warmth to start growing",
            "What does the root do for every plant? Say: The root absorbs water from the soil or Roots absorb water and nutrients for the plant"
          ]
        },
        {
          phase: "stem_leaf_facts",
          turns: "4-7",
          phase_name: "Stem and Leaf Functions",
          focus: "Present Simple: carries, transports, uses, makes",
          goal: "Student describes stem and leaf jobs using Present Simple facts",
          phase_questions: [
            "What does the stem do? Say: The stem carries water from the root to the leaves or The stem transports water upward",
            "What do leaves do with sunlight? Say: A leaf uses sunlight to make food or Leaves use sunlight for photosynthesis",
            "What is photosynthesis? Say: Photosynthesis is when a leaf uses sunlight to make food or It is the process plants use to produce food from sunlight",
            "Which plant uses the most sunlight? Say: A sunflower uses the most sunlight because it grows toward the sun or Sunflowers need a lot of sunlight to grow big"
          ]
        },
        {
          phase: "compare_plants",
          turns: "8-10",
          phase_name: "Comparing the Three Plants",
          focus: "Present Simple for comparisons: grows, survives, needs",
          goal: "Student compares the three plants using Present Simple facts",
          phase_questions: [
            "How much water does a cactus need? Say: A cactus needs very little water or The cactus survives with almost no water",
            "How much water does a bean plant need? Say: A bean plant needs water every day or It needs regular watering to grow",
            "What do ALL plants have in common? Say: All plants need sunlight water and nutrients or Every plant goes through the same life cycle — seed sprout stem leaf flower"
          ]
        }
      ],

      minimum_turns: 10,
      maximum_turns: 12,

      story_text: "Sam planted three seeds on the same day: a bean seed, a sunflower seed, and a cactus seed. He wanted to compare how they grow. Every morning, Sam checked each pot and wrote in his notebook. A bean plant needs a lot of water. Its root absorbs water quickly from the soil. The stem grows tall fast and the leaves use sunlight every day. A sunflower needs strong sunlight. It always grows toward the sun — its stem bends toward the window! The leaves are big and green and use lots of sunlight for photosynthesis. A cactus is very different. It needs very little water. Its thick stem stores water inside. The leaves are tiny spikes that save water. But even a cactus follows the same life cycle: seed → sprout → stem → flower. Sam concluded: all plants need water, sunlight, and nutrients. But each plant needs different amounts. A bean plant needs water every day. A cactus needs water only once a month. Plants are amazing — each one is perfectly designed for where it lives!",
      story_text_vi: "Sam trong ba hat giong cung mot ngay: hat giong dau, hat giong huong duong va hat giong xuong rong. Cau muon so sanh chung lon len nhu the nao. Moi buoi sang, Sam kiem tra tung chau va viet vao so. Cay dau can nhieu nuoc. Re cay hap thu nuoc nhanh chong tu dat. Than cay lon cao nhanh va la dung anh sang mat troi moi ngay. Cay huong duong can anh sang mat troi manh. No luon lon huong ve phia mat troi! La cay to va xanh su dung nhieu anh sang mat troi de quang hop. Xuong rong thi rat khac. No can rat it nuoc. Than cay day cua no tru nuoc ben trong. La la nhung gai nho giu nuoc. Nhung ngay ca xuong rong cung theo vong doi giong nhau: hat giong → mam cay → than cay → bong hoa. Sam ket luan: tat ca cay deu can nuoc, anh sang mat troi va chat dinh duong. Nhung moi cay can nguong do khac nhau.",
      discussion_prompts: [
        {
          id: 1,
          question_en: "Compare the water needs of a bean plant and a cactus using Present Simple facts.",
          prompt_vi: "So sanh nhu cau nuoc cua cay dau va xuong rong dung su that Hien Tai Don.",
          grammar_hint: "A bean plant needs... every day. A cactus only needs... A cactus survives with...",
          example_answer: "A bean plant needs water every day to grow. Its root absorbs water quickly from the soil. A cactus needs very little water — it survives with almost no rain. Its thick stem stores water inside. Both plants need water, but in very different amounts."
        },
        {
          id: 2,
          question_en: "What do the stem and leaves do in Sam's three plants? Use Present Simple for each.",
          prompt_vi: "Than cay va la cay lam gi trong ba cay cua Sam? Dung Hien Tai Don cho tung loai.",
          grammar_hint: "The stem carries... A sunflower stem bends toward... The leaves use... A cactus has tiny leaves that...",
          example_answer: "In all three plants, the stem carries water from the root to the leaves. A sunflower stem bends toward the sunlight. The leaves use sunlight to make food through photosynthesis. A cactus has tiny spike leaves that save water instead of making food."
        },
        {
          id: 3,
          question_en: "What do all three plants have in common? Use sequence words and Present Simple.",
          prompt_vi: "Ba cay co diem gi chung? Dung tu chi trinh tu va Hien Tai Don.",
          grammar_hint: "All plants need... First, a seed... Next, a sprout... After that, the stem... Finally, a flower...",
          example_answer: "All three plants need water, sunlight, and nutrients to survive. First, each plant starts as a seed in the soil. Next, a sprout appears with the right conditions. After that, a stem grows and leaves open up. Finally, a flower blooms. Every plant follows this same beautiful life cycle!"
        }
      ]
    },
    {
      mission_id: 3,
      id: 3,
      title: "My Plant Story — Free Talk",
      title_en: "My Plant Story — Free Talk",
      title_vi: "Cau Chuyen Cay Cua Toi — Noi Chuyen Tu Do",
      theme: "Student describes a real or imagined plant they would grow using Present Simple for facts",
      type: "free_talk",
      image_url: "/images/week27/mission3_cover.jpg",
      nova_greeting: "Free Talk Challenge! Now YOU are the plant scientist! Tell me about a plant you would like to grow. Use Present Simple facts: it needs, it grows, the root absorbs, the leaf uses sunlight!",
      mission_context: "CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 1-2 hint choices if student seems stuck: Say: ___ or ___! LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. Week 27 Mission 3. Student free-talks about their own plant using Present Simple for facts. GRAMMAR FOCUS: needs, grows, absorbs, carries, uses, blooms. VOCAB: seed, soil, root, stem, leaf, flower, sunlight, water, nutrients. SEQUENCE: First, Next, After that, Finally.",

      story_character: {
        name: "Student (You!)",
        personality: "curious young scientist who loves nature and growing things",
        backstory: "The student imagines planting their own seed — maybe a flower, a fruit, or a vegetable. They use Mr. Chen's science facts to describe exactly how it will grow.",
        speaking_style: "confident and factual, uses Present Simple naturally for science facts and sequence words",
        facts: {
          is_first_person: true,
          chooses_own_plant: true,
          uses_present_simple: true,
          uses_sequence_words: true,
          applies_plant_science: true
        },
        role: "Young scientist describing their own plant experiment"
      },

      opening_narrative: "Your plant experiment starts now! Imagine you are Maya or Sam. You have a pot, some soil, and a seed. What plant would you like to grow? Tell me about it! What plant do you choose? Say: I would like to grow a or My plant is a or I choose to plant a",

      story_arc: [
        {
          phase: "choose_plant",
          turns: "1-3",
          phase_name: "Choosing Your Plant",
          focus: "Setting up the experiment with Present Simple facts",
          goal: "Student chooses a plant and states its basic needs",
          phase_questions: [
            "What plant would you like to grow? Say: I would like to grow a sunflower or My plant is a tomato or I choose a rose",
            "What does your plant need to grow? Say: My plant needs water and sunlight or It needs good soil and warmth",
            "Where would you plant it? Say: I would plant it near a sunny window or I would put it in the garden"
          ]
        },
        {
          phase: "planting_and_growth",
          turns: "4-6",
          phase_name: "Planting and Early Growth",
          focus: "Sequence words with Present Simple: First, Next",
          goal: "Student describes the planting and germination stages",
          phase_questions: [
            "How do you start? Say: First I plant the seed in the soil or First the seed goes into warm moist soil",
            "What happens next? Say: Next the seed germinates and a sprout appears or Next a tiny green sprout pushes through the soil",
            "What does the root do? Say: The root absorbs water from the soil or The roots grow deeper and absorb nutrients"
          ]
        },
        {
          phase: "stem_leaves_facts",
          turns: "7-8",
          phase_name: "Stem, Leaves, and Photosynthesis",
          focus: "After that + Present Simple facts for plant parts",
          goal: "Student describes stem and leaf functions as science facts",
          phase_questions: [
            "After that, what does the stem do? Say: After that the stem grows taller and carries water to the leaves or The stem transports water from the root upward",
            "What do the leaves do? Say: The leaves use sunlight to make food or This process is called photosynthesis"
          ]
        },
        {
          phase: "flower_and_reflection",
          turns: "9-12",
          phase_name: "The Flower and Final Thoughts",
          focus: "Finally + reflection on the life cycle",
          goal: "Student completes the sequence and reflects on plant science",
          phase_questions: [
            "Finally, what do you hope happens? Say: Finally a beautiful flower blooms or I hope my plant produces fruit",
            "What is the complete life cycle? Say: Seed then sprout then stem then leaf then flower or The sequence is seed sprout stem leaf flower",
            "Why are plants amazing? Say: Plants are amazing because they make their own food or They are incredible because they grow from a tiny seed into something beautiful",
            "If you could grow any plant in the world, what would it be? Say: If I could grow any plant I would choose or The most amazing plant I know is",
            "What would you write in your plant notebook like Maya? Say: I would write the root absorbs water or I would record what day the sprout appeared"
          ]
        }
      ],

      minimum_turns: 12,
      maximum_turns: 12,

      story_text: "Now it is your turn to be a plant scientist! Think about a plant you would like to grow. It could be a flower like a rose or sunflower, a food plant like tomatoes or beans, or even something unusual like a bamboo or a cactus. Choose your plant and describe it using Mr. Chen's science facts. Use Present Simple for facts: A seed needs... The root absorbs... A leaf uses sunlight to... The stem carries... Use sequence words: First I plant the seed. Next, a sprout appears. After that, the stem grows. Finally, a flower blooms! Be a scientist: observe and record. Be like Maya: curious and precise. Be like Sam: compare and discover. Your plant story starts now!",
      story_text_vi: "Bay gio la luot cua ban tro thanh nha khoa hoc cay! Hay nghi ve mot cay ban muon trong. Co the la mot bong hoa nhu hoa hong hay huong duong, mot cay thuc pham nhu ca chua hay dau, hoac tham chi mot thu gi do bat thuong nhu tre hoac xuong rong. Chon cay cua ban va mo ta no dung cac su that khoa hoc cua ong Chen. Dung Hien Tai Don cho su that: Mot hat giong can... Re cay hap thu... Mot la dung anh sang mat troi de... Than cay chuyen... Dung cac tu chi trinh tu: First toi trong hat giong. Next, mot mam cay xuat hien. After that, than cay moc len. Finally, mot bong hoa no! Hay la mot nha khoa hoc: quan sat va ghi chep. Hay nhu Maya: tay mo va chinh xac. Cau chuyen cay cua ban bat dau ngay bay gio!",
      discussion_prompts: [
        {
          id: 1,
          question_en: "Describe your chosen plant's basic needs using Present Simple facts.",
          prompt_vi: "Mo ta nhu cau co ban cua cay ban chon dung su that Hien Tai Don.",
          grammar_hint: "My plant is a ___. It needs... The root absorbs... It grows in...",
          example_answer: "My plant is a sunflower. It needs a lot of sunlight to grow tall and strong. The root absorbs water and nutrients from the soil every day. It grows best in warm sunny weather near a window."
        },
        {
          id: 2,
          question_en: "Describe the growth sequence of your plant using First, Next, After that, Finally.",
          prompt_vi: "Mo ta trinh tu phat trien cua cay ban chon dung First, Next, After that, Finally.",
          grammar_hint: "First, a seed is planted in... Next, a sprout... After that, the stem... Finally, a flower...",
          example_answer: "First, I plant the sunflower seed in warm moist soil and add water. Next, the seed germinates and a tiny sprout appears after a few days. After that, the stem grows taller toward the sunlight every day. Finally, a big bright yellow flower blooms at the top!"
        },
        {
          id: 3,
          question_en: "Explain what the stem and leaves do for your plant. Use Present Simple facts.",
          prompt_vi: "Giai thich than cay va la cay lam gi cho cay cua ban. Dung su that Hien Tai Don.",
          grammar_hint: "The stem carries... The leaves use... This process is called... A leaf makes food using...",
          example_answer: "The stem carries water from the roots up to the leaves. The leaves are the most important part for making food — they use sunlight and water to produce glucose through photosynthesis. Without the stem and leaves working together, the plant cannot make food and grow."
        }
      ]
    }
  ],

  // 💬 SPARK TALK: AI-driven personal expression (W27+ uses AI mode)
  spark_talk: [
    {
      id: 'spark_plant_facts',
      emoji: '🌱',
      title: 'My Plant Facts',
      bridge: 'Maya learned so many amazing facts about plants — how they grow, what they need, and how they make food! Do YOU know plant facts?',
      seed_question: 'What does a plant need to grow? Is it sun or water?',
      frames: [
        { template: 'A plant needs ___', follow_up_q: 'What does a plant need? Sun or water?', hints: ['sun', 'water', 'soil'] },
        { template: 'It grows in ___', follow_up_q: 'Where does it grow? In soil or in a pot?', hints: ['soil', 'a pot', 'the garden'] },
        { template: 'The roots ___', follow_up_q: 'What do roots do? Do they absorb water or hold the plant?', hints: ['absorb water', 'hold the plant', 'grow deep'] },
        { template: 'The leaves ___', follow_up_q: 'What do leaves do? Do they make food or catch sunlight?', hints: ['make food', 'catch sunlight', 'look beautiful'] },
        { template: 'First, a seed ___', follow_up_q: 'What does a seed do first? Does it grow roots or sprout?', hints: ['grows roots', 'sprouts', 'breaks open'] },
        { template: 'Next, the stem ___', follow_up_q: 'What does the stem do next?', hints: ['grows up', 'reaches for the sun', 'gets taller'] },
        { template: 'After that, it ___', follow_up_q: 'What happens after the stem grows?', hints: ['grows leaves', 'makes a flower', 'gets bigger'] },
        { template: 'Finally, the plant ___', follow_up_q: 'What does the plant finally do?', hints: ['makes flowers', 'grows fruit', 'becomes beautiful'] }
      ],
      scaffold_frames: ['A plant needs ___', 'It grows in ___', 'The roots ___'],
      vocab_focus: ['roots', 'leaves', 'stem', 'soil', 'sunlight'],
      turns: 8
    },
    {
      id: 'spark_my_plant_story',
      emoji: '🌼',
      title: 'My Plant Story',
      bridge: 'Maya grew her plant step by step — first the seed, then the roots, then the beautiful flowers! Tell me YOUR plant story!',
      seed_question: 'Did you ever grow a plant? Did you start with a seed or a small plant?',
      frames: [
        { template: 'First, I ___', follow_up_q: 'What was the first step? Did you plant a seed?', hints: ['planted a seed', 'put it in soil', 'watered it'] },
        { template: 'Then, it ___', follow_up_q: 'What happened next? Did it sprout or grow?', hints: ['sprouted', 'grew a little', 'grew roots'] },
        { template: 'After that, it ___', follow_up_q: 'What happened after that?', hints: ['grew bigger', 'grew leaves', 'needed more water'] },
        { template: 'Finally, it ___', follow_up_q: 'What did it finally do? Flower or grow fruit?', hints: ['made a flower', 'grew fruit', 'became beautiful'] },
        { template: 'My plant grows in ___', follow_up_q: 'Where does your plant grow? In a pot or the garden?', hints: ['a pot', 'the garden', 'my room'] },
        { template: 'Every day it ___', follow_up_q: 'What does your plant do every day?', hints: ['grows bigger', 'needs water', 'reaches for the sun'] },
        { template: 'I love plants because ___', follow_up_q: 'Why do you love plants?', hints: ['they are beautiful', 'they grow slowly but surely', 'they make the world green'] },
        { template: 'My favorite plant is ___', follow_up_q: 'What is your favorite plant? A flower or a tree?', hints: ['a sunflower', 'a rose', 'a big green tree'] }
      ],
      scaffold_frames: ['First, I ___', 'Then, it ___', 'Finally, it ___'],
      vocab_focus: ['plant', 'grow', 'water', 'seed', 'flower'],
      turns: 8
    }
  ],

  conversation_cards: [
    {
      id: "plant_facts_present_simple",
      title: "Plant Facts Practice",
      emoji: "🌱",
      theme: "Practicing Present Simple for plant science facts",
      difficulty: "easy",
      exchanges: [
        { ai: "Plant facts! What does a seed need to grow? Say: A seed needs water and warmth or Seeds need sunlight and nutrients", options: ["A seed needs water and warmth to germinate", "Seeds need sunlight and nutrients to grow"] },
        { ai: "Great! What does the root do? Say: The root absorbs water or Roots absorb water and nutrients from the soil", options: ["The root absorbs water from the soil", "Roots absorb water and nutrients for the plant"] },
        { ai: "Perfect! What does the stem do? Say: The stem carries water to the leaves or The stem transports water upward", options: ["The stem carries water from the roots to the leaves", "The stem transports water upward to the whole plant"] },
        { ai: "Nice! What does a leaf do with sunlight? Say: A leaf uses sunlight to make food or Leaves use sunlight for photosynthesis", options: ["A leaf uses sunlight to make food", "Leaves use sunlight for photosynthesis"] },
        { ai: "Brilliant! What is photosynthesis? Say: Photosynthesis is when plants use sunlight to make food or It is the process plants use to produce food", options: ["Photosynthesis is when plants use sunlight to make food", "It is the process where a leaf uses sunlight to produce food"] },
        { ai: "Amazing! Say the complete life cycle. Say: Seed then sprout then stem then leaf then flower", options: ["Seed, sprout, stem, leaf, flower", "The order is seed, sprout, stem, leaf, and then flower"] }
      ],
      completion_message: "Plant facts complete! You used Present Simple perfectly!"
    },
    {
      id: "growth_sequence",
      title: "Plant Growth Sequence",
      emoji: "🌳",
      theme: "Describing plant growth using sequence words",
      difficulty: "easy",
      exchanges: [
        { ai: "Sequence challenge! First — what is the first step in plant growth? Say: First a seed is planted in the soil or First you put a seed into the soil and add water", options: ["First, a seed is planted in warm moist soil", "First, you put a seed into the soil and add water"] },
        { ai: "Good! Next — what happens after you plant the seed? Say: Next the seed germinates and a sprout appears or Next a tiny green sprout pushes through the soil", options: ["Next, the seed germinates and a sprout appears", "Next, a tiny green shoot pushes through the soil"] },
        { ai: "Great! After that — what grows next? Say: After that the stem grows taller toward the sunlight or After that the stem and leaves start to grow upward", options: ["After that, the stem grows taller toward the sunlight", "After that, the stem and leaves start to grow"] },
        { ai: "Perfect! Finally — what is the last stage? Say: Finally a flower blooms at the top of the plant or Finally a small yellow flower appears after several weeks", options: ["Finally, a beautiful flower blooms at the top", "Finally, a small flower appears after four weeks"] },
        { ai: "Now your turn! Use ALL four sequence words to describe plant growth in two sentences!", options: ["First a seed grows. Next a sprout appears. After that a stem grows. Finally a flower blooms.", "First the seed germinates. Next a sprout appears. After that leaves grow. Finally a flower blooms!"] }
      ],
      completion_message: "Sequence challenge complete! You described plant growth perfectly!"
    },
    {
      id: "he_she_it_s",
      title: "He / She / It + Verb-S Challenge",
      emoji: "⭐",
      theme: "Practising Present Simple -s with plant science subjects",
      difficulty: "medium",
      exchanges: [
        { ai: "verb-s challenge! A seed ___ water. Needs or Need? Say: A seed needs water or It needs water to germinate", options: ["A seed needs water to germinate", "It needs water and warmth to start growing"] },
        { ai: "Good! The root ___ water. Absorbs or Absorb? Say: The root absorbs water or It absorbs nutrients from the soil", options: ["The root absorbs water from the soil", "It absorbs both water and nutrients"] },
        { ai: "Perfect! A leaf ___ sunlight. Uses or Use? Say: A leaf uses sunlight or It uses sunlight to make food", options: ["A leaf uses sunlight to make food", "It uses sunlight for photosynthesis"] },
        { ai: "Brilliant! The stem ___ water upward. Carries or Carry? Say: The stem carries water or It carries nutrients to the leaves", options: ["The stem carries water upward to the leaves", "It carries water and nutrients to every part of the plant"] },
        { ai: "Now YOU! The flower ___ at the top. Blooms or Bloom? Say: The flower blooms at the top", options: ["The flower blooms at the top of the plant", "It blooms beautifully after four weeks"] }
      ],
      completion_message: "He/She/It challenge complete! You always used verb-s correctly!"
    }
  ],

  freetalk_knowledge: {
    week_title: "The Secret Life of Plants",
    week_number: 27,
    theme: "Plant growth and science facts using Present Simple",

    knowledge_base: [
    "IMPORTANT — Always respond with empathy and understanding. Acknowledge student feelings before correcting. If a student shares something negative, say you are sorry or that sounds difficult.",
      "A seed needs water, sunlight, and soil to grow",
      "Roots absorb water and nutrients from the soil",
      "The stem carries water and nutrients from roots to leaves",
      "Leaves use sunlight to make food through photosynthesis",
      "A plant grows slowly — first a sprout, then a stem, then leaves, then flowers",
      "Flowers bloom when the plant gets enough sun and water",
      "Present Simple is used for facts: A plant needs water. It absorbs sunlight.",
      "He/She/It verbs add -s: needs, absorbs, carries, uses, grows, blooms"
    ],

    example_opening_questions: [
      "Do you have a plant at home? What does it look like?",
      "What does a plant need to grow?",
      "What do roots do for a plant?",
      "How does a plant make its food?",
      "What happens when a plant gets enough sun and water?",
      "Can you describe the stages of how a plant grows?"
    ],

    starter_prompts: [
      { text_en: "I want to play games! 🎮", text_vi: "Tôi muốn chơi game!", type: "game" },
      { text_en: "Translate this for me... 📖", text_vi: "Dịch giúp con câu/chữ này...", type: "help" },
      { text_en: "Let's do roleplay! 🎭", text_vi: "Chơi nhập vai đi cô!", type: "roleplay" }
    ]
  },

  metadata: {
    week: 27,
    phase: 1,
    cefr_level: "A2",
    grammar_guard: {
      target_tense: "Present Simple for facts: He/She/It + verb-s",
      forbidden_structures: ["past tense for facts", "will + verb for natural facts"],
      focus_verbs: ["needs", "absorbs", "carries", "uses", "makes", "grows", "blooms", "appears", "pushes", "produces"]
    }
  }
};

export default week27RealData;
