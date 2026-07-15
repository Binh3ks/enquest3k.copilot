const week25RealData = {
  week_id: 25,
  week_number: 25,
  title: "The Sequence Challenge",
  weekTitle_en: "The Sequence Challenge",
  weekTitle_vi: "Thu Thach Trinh Tu",
  topic: "Describing a sequence of actions using connectors: First, Next, Then, Finally",
  topic_vi: "Mo ta chuoi hanh dong dung tu noi trinh tu: First, Next, Then, Finally",
  theme: "Sequencing actions, following steps, making a sandwich, brushing teeth, first/next/then/finally",

  grammar_focus: "Sequence Connectors: First, Next, Then, Finally",
  grammar_pattern: "First, I ___. Next, I ___. Then, I ___. Finally, I ___.",
  grammar_examples: [
    "First, I got two slices of bread and a knife.",
    "Next, I spread jam on one slice.",
    "Then, I put the two slices together.",
    "Finally, I cut the sandwich and put it on a plate.",
    "First, I squeezed some toothpaste onto my brush."
  ],
  // Chunks/collocations AI must use in story_text narrative
  // Source: read.js bold chunks — multi-word phrases and high-value vocabulary
  chunk_focus: [
        "picked up",
    "rinsed",
    "tidied",
    "squeezed",
    "brushed",
    "brush"
  ],
  target_vocab: [
    { word: "bread", pronunciation: "/brɛd/", definition_vi: "bánh mì", definition_en: "a food made from flour, water and yeast, baked in an oven" },
    { word: "jam", pronunciation: "/dʒæm/", definition_vi: "mứt", definition_en: "a sweet spread made from cooked fruit and sugar" },
    { word: "spread", pronunciation: "/sprɛd/", definition_vi: "phết/dàn đều", definition_en: "to put something thinly and evenly over a surface" },
    { word: "knife", pronunciation: "/naɪf/", definition_vi: "dao", definition_en: "a sharp tool with a handle used for cutting or spreading food" },
    { word: "toothpaste", pronunciation: "/ˈtuːθpeɪst/", definition_vi: "kem đánh răng", definition_en: "a soft paste used with a toothbrush to clean teeth" },
    { word: "brush", pronunciation: "/brʌʃ/", definition_vi: "bàn chải / chải", definition_en: "a tool with bristles used for cleaning, or the action of using it" },
    { word: "rinse", pronunciation: "/rɪns/", definition_vi: "súc miệng / rửa sạch", definition_en: "to wash something with clean water to remove soap or residue" },
    { word: "slice", pronunciation: "/slaɪs/", definition_vi: "lát mỏng / cắt lát", definition_en: "a thin flat piece cut from something, or to cut into thin pieces" },
    { word: "squeeze", pronunciation: "/skwiːz/", definition_vi: "bóp ra / vắt ra", definition_en: "to press something firmly with fingers to get liquid or paste out" },
    { word: "step", pronunciation: "/stɛp/", definition_vi: "bước / giai đoạn", definition_en: "one single action in a series of actions to complete a task" },
    { word: "sequence", pronunciation: "/ˈsiːkwəns/", definition_vi: "trình tự / chuỗi", definition_en: "a set of things that come one after another in a particular order" },
    { word: "pour", pronunciation: "/pɔːr/", definition_vi: "rót / đổ", definition_en: "to make a liquid flow from one container into another" },
    { word: "tidy", pronunciation: "/ˈtaɪdi/", definition_vi: "dọn dẹp / gọn gàng", definition_en: "to make a place clean and organized by putting things in their right places" }
  ],

  nova_instructions: {
    persona: "Nova - friendly bilingual AI tutor",
    language_mix: "English-dominant with Vietnamese scaffolding",
    key_correction: "sequence connector placement and action verb order",
    nova_recast: "Great! FIRST you spread the jam! Say: First, I spread the jam. What did you do NEXT?",
    grammar_guard: "Always model the full sequence connector + action. Missing connector? Add it back. Wrong order? Restate the correct sequence."
  },

  v28_format_notes: {
    response_format: "ack + recast + question (V28 ONLY - NOT V25)",
    ack_options: ["Oh!", "I see!", "Nice!", "Wow!", "Really?", "Interesting!", "That is wonderful!"],
    recast_max_words: 8,
    recast_rules: [
      "Echo the action with the correct sequence connector",
      "Model: First / Next / Then / Finally + subject + verb",
      "Keep it encouraging and move to next step"
    ],
    question_patterns_allowed: [
      "What did you do first?",
      "What happened next?",
      "What was the last step?",
      "How do you make a sandwich?",
      "What did you do after that?"
    ],
    question_patterns_forbidden: [
      "Why do you think...?",
      "What does... mean?",
      "Do you understand?"
    ],
    example_exchanges: [
      { student: "I put jam on bread", tutor_response: "Nice! FIRST you spread the jam! Say: First, I spread the jam. What did you do next?" },
      { student: "Then I eat it", tutor_response: "Great! FINALLY you ate it! Say: Finally, I ate the sandwich. What was the first step?" },
      { student: "I brush tooth", tutor_response: "Wow! You BRUSHED your TEETH! Say: First, I brushed my teeth. What did you do then?" }
    ]
  },

  story_missions: [
    {
      mission_id: 1,
      id: 1,
      title: "Leo's Sandwich Disaster - Story",
      title_en: "Leo's Sandwich Disaster - Story",
      title_vi: "Buoi Lam Banh Mi Tham Hoa Cua Leo",
      theme: "Leo tries to make a sandwich without following the steps in order",
      type: "story",
      image_url: "/images/week25/mission1_cover.jpg",
      nova_greeting: "Sequence time! Leo tried to make a sandwich but forgot the steps! Let us help him get the order right!",
      mission_context: "CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 1-2 hint choices if student seems stuck: Say: ___ or ___! LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. Week 25 Mission 1. Student practices sequence connectors First/Next/Then/Finally by retelling Leo's sandwich story. GRAMMAR FOCUS: First I ___, Next I ___, Then I ___, Finally I ___. VOCAB: bread, jam, spread, knife, slice, step, sequence.",

      story_character: {
        name: "Leo",
        personality: "enthusiastic but forgetful, learns by doing",
        backstory: "Leo wanted to make a jam sandwich all by himself but kept getting the steps mixed up until Mia showed him the correct sequence.",
        speaking_style: "friendly and energetic, says things in the wrong order and then corrects himself",
        facts: {
          made_sandwich: true,
          got_steps_wrong_first: true,
          learned_from_mia: true,
          favorite_phrase: "The sequence is the secret!"
        },
        role: "Character who learns the importance of doing steps in the right order"
      },

      opening_narrative: "Great! Sequence practice — it is so satisfying when steps are in order! Leo grabbed the bread and tried to eat it right away — without any jam! Let us help Leo tell the correct sandwich story! What did Leo do FIRST? Say: First Leo took two slices of bread or First he got the bread from the bag",

      story_arc: [
        {
          phase: "sandwich_steps",
          turns: "1-6",
          phase_name: "Making the Sandwich",
          focus: "First, Next, Then, Finally + sandwich vocabulary",
          goal: "Student retells each step of making Leo's sandwich",
          phase_questions: [
            "Sandwich time! What did Leo do FIRST? Say: First Leo took two slices of bread or First he got the bread from the bag",
            "Bread ready! What did Leo do NEXT? Say: Next Leo spread jam on one slice or Next he used the knife to spread the jam",
            "Jam on! What did Leo do THEN? Say: Then Leo pressed the two slices together or Then he put the slices together",
            "Almost done! What did Leo do FINALLY? Say: Finally Leo cut the sandwich in half or Finally he put it on a plate",
            "Great sequence! Why did the ORDER matter for Leo? Say: The order matters because or If he ate the bread first there was no jam on it",
            "Sequence champion! Can you say all four steps? Say: First... Next... Then... Finally... or Tell me Leo's four sandwich steps!"
          ]
        },
        {
          phase: "teeth_steps",
          turns: "7-10",
          phase_name: "Brushing Teeth Sequence",
          focus: "First/Next/Then/Finally + toothpaste/brush/rinse vocabulary",
          goal: "Student describes Mia's teeth-brushing sequence",
          phase_questions: [
            "Now teeth time! What do you do FIRST when brushing teeth? Say: First I squeeze toothpaste onto my brush or First get the toothpaste ready",
            "Toothpaste ready! What do you do NEXT? Say: Next I brush all my teeth carefully or Next brush teeth for two minutes",
            "Brushing done! What do you do THEN? Say: Then I rinse my mouth with water or Then rinse out the toothpaste",
            "What is the LAST step? Say: Finally I tidy up and wash my hands or Finally put away the toothbrush"
          ]
        }
      ],

      minimum_turns: 8,
      maximum_turns: 12,

      story_text: "It was Saturday morning. Leo wanted to make a jam sandwich for breakfast. He grabbed the bread and immediately tried to eat it. 'Wait!' said Mia. 'You have to follow the steps in order!' Leo looked confused. 'Why does the ORDER matter?' he asked. Mia smiled and said, 'Watch me. FIRST, I take two slices of bread. NEXT, I use the knife to spread jam on one slice. THEN, I press the two slices together. FINALLY, I cut it in half and put it on the plate.' Leo tried again, following every step. His sandwich turned out perfect! 'The sequence is the secret!' he said, taking a big happy bite.",
      story_text_vi: "Do la sang thu Bay. Leo muon lam banh mi mit de an sang. Anh lay banh mi va lien tuc co an ngay. 'Khoan da!' Mia noi. 'Anh phai lam theo thu tu!' Leo co ve boi roi. 'Tai sao THU TU lai quan trong?' anh hoi. Mia mim cuoi va noi, 'Nhin em nay. Thu nhat (FIRST), em lay hai lat banh mi. Tiep theo (NEXT), em dung dao phet mit len mot lat. Sau do (THEN), em up hai lat lai voi nhau. Cuoi cung (FINALLY), em cat doi va dat len dia.' Leo thu lai, lam theo tung buoc. Cai banh mi cua anh ra rat ngon! 'Trinh tu chinh la bi mat!' anh noi, ca n mot cai that lon.",
      discussion_prompts: [
        {
          id: 1,
          question_en: "Tell me the four steps to make a sandwich using: First, Next, Then, Finally.",
          prompt_vi: "Hay ke cho toi nghe bon buoc lam banh mi dung: First, Next, Then, Finally.",
          grammar_hint: "First, I ___. Next, I ___. Then, I ___. Finally, I ___.",
          example_answer: "First, I take two slices of bread. Next, I spread jam on one slice. Then, I press the two slices together. Finally, I cut the sandwich and eat it."
        },
        {
          id: 2,
          question_en: "Why does the ORDER of steps matter when making food?",
          prompt_vi: "Tai sao THU TU cac buoc lai quan trong khi lam thuc an?",
          grammar_hint: "If you don't follow the steps in order, the result will be...",
          example_answer: "If you don't follow the steps in order, the food will not turn out right. For example, you cannot spread jam if you haven't got the bread first."
        },
        {
          id: 3,
          question_en: "What was Leo's mistake and how did Mia help him fix it?",
          prompt_vi: "Leo da mac loi gi va Mia da giup anh sua no nhu the nao?",
          grammar_hint: "Leo's mistake was... Mia helped him by...",
          example_answer: "Leo's mistake was trying to eat the sandwich before preparing it. Mia helped him by showing the correct steps in order: First, Next, Then, Finally."
        }
      ]
    },
    {
      mission_id: 2,
      id: 2,
      title: "The Morning Routine Race - Grammar Practice",
      title_en: "The Morning Routine Race - Grammar Practice",
      title_vi: "Cuoc Dua Buoi Sang - Luyen Tap Ngu Phap",
      theme: "Using sequence connectors to describe morning hygiene routine",
      type: "grammar",
      image_url: "/images/week25/mission2_cover.jpg",
      nova_greeting: "Morning routine challenge! Can you tell me YOUR morning steps using First, Next, Then, Finally?",
      mission_context: "CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 1-2 hint choices if student seems stuck: Say: ___ or ___! LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. Week 25 Mission 2. Student practices sequence connectors by describing their own morning routine. GRAMMAR FOCUS: First I ___, Next I ___, Then I ___, Finally I ___. VOCAB: toothpaste, brush, rinse, squeeze, tidy.",

      story_character: {
        name: "Student (You!)",
        personality: "organised early-riser who loves following routines",
        backstory: "The student has a morning routine they follow every day — now it is time to share it with Nova using sequence connectors!",
        speaking_style: "personal, first-person, uses sequence connectors naturally",
        facts: {
          is_first_person: true,
          has_morning_routine: true,
          brushes_teeth: true,
          favorite_phrase: "First I wake up and..."
        },
        role: "Student describing their own daily morning sequence"
      },

      opening_narrative: "Morning routine story! Every morning you follow steps. Let us hear YOUR routine! What do you do FIRST in the morning? Say: First I wake up or First I get out of bed",

      story_arc: [
        {
          phase: "wake_up_routine",
          turns: "1-5",
          phase_name: "Waking Up Steps",
          focus: "First/Next/Then/Finally + wake up, wash, brush, dress, eat",
          goal: "Student describes their personal morning wake-up sequence",
          phase_questions: [
            "Morning start! What is the FIRST thing you do when you wake up? Say: First I wake up or First I get out of bed and stretch",
            "Up and going! What do you do NEXT? Say: Next I go to the bathroom or Next I wash my face",
            "Getting fresh! What do you do THEN? Say: Then I brush my teeth or Then I get dressed for school",
            "Nearly ready! What do you do FINALLY to finish your morning? Say: Finally I eat breakfast or Finally I pack my bag and go to school",
            "Full routine! Can you say all four morning steps? Say: First... Next... Then... Finally... or Tell me your morning in one go!"
          ]
        },
        {
          phase: "teeth_routine",
          turns: "6-10",
          phase_name: "Teeth Brushing Sequence",
          focus: "squeeze, brush, rinse, tidy + sequence connectors",
          goal: "Student describes Mia's teeth-brushing routine and connects to their own",
          phase_questions: [
            "Teeth time! What does Mia do FIRST when she brushes her teeth? Say: First Mia squeezes toothpaste onto her brush or First she gets the toothpaste",
            "Toothpaste on! What does she do NEXT? Say: Next she brushes all her teeth carefully or Next she brushes for two minutes",
            "Brushing done! What does she do THEN? Say: Then she rinses her mouth with water or Then she washes out the toothpaste",
            "Last step! What does Mia do FINALLY? Say: Finally she tidies up the bathroom or Finally she washes her hands",
            "Same routine! Do you follow the same steps? Say: Yes I do the same steps or My routine is similar but I also..."
          ]
        }
      ],

      minimum_turns: 10,
      maximum_turns: 12,

      story_text: "Every morning, Mia has a very organised routine for brushing her teeth. First, she squeezes a little toothpaste onto her brush. Next, she brushes all her teeth carefully for two minutes. Then, she rinses her mouth with clean water. Finally, she tidies up the bathroom and washes her hands. She says the secret is doing every step in the right sequence. Now Nova wants YOU to describe YOUR morning routine using the same connectors!",
      story_text_vi: "Moi buoi sang, Mia co mot quy trinh danh rang rat co to chuc. Dau tien, co bop mot it kem danh rang len ban chai. Tiep theo, co danh tat ca rang can than trong hai phut. Sau do, co suc mieng bang nuoc sach. Cuoi cung, co don dep phong tam va rua tay. Co noi bi mat la lam tung buoc theo dung trinh tu. Bay gio Nova muon BAN mo ta quy trinh buoi sang cua BAN dung nhung tu noi tuong tu!",
      discussion_prompts: [
        {
          id: 1,
          question_en: "Describe Mia's teeth-brushing routine using First, Next, Then, Finally.",
          prompt_vi: "Mo ta quy trinh danh rang cua Mia dung First, Next, Then, Finally.",
          grammar_hint: "First, she ___. Next, she ___. Then, she ___. Finally, she ___.",
          example_answer: "First, she squeezed toothpaste onto her brush. Next, she brushed her teeth for two minutes. Then, she rinsed her mouth. Finally, she tidied up and washed her hands."
        },
        {
          id: 2,
          question_en: "Describe what YOU do first thing in the morning. Use at least two sequence connectors.",
          prompt_vi: "Mo ta nhung gi BAN lam dau tien vao buoi sang. Dung it nhat hai tu noi trinh tu.",
          grammar_hint: "In the morning, first I ___. Then I ___. Finally, I ___.",
          example_answer: "In the morning, first I wake up and wash my face. Then I brush my teeth. Finally, I eat breakfast and get ready for school."
        },
        {
          id: 3,
          question_en: "What would happen if Mia did the steps in the WRONG order — rinsed before brushing?",
          prompt_vi: "Dieu gi se xay ra neu Mia lam cac buoc theo SAI THU TU — suc mieng truoc khi danh rang?",
          grammar_hint: "If she rinsed before brushing, then...",
          example_answer: "If she rinsed before brushing, then her teeth would not be clean because the toothpaste would wash away before it could do its job."
        }
      ]
    },
    {
      mission_id: 3,
      id: 3,
      title: "The Recipe Card Challenge - Free Talk",
      title_en: "The Recipe Card Challenge - Free Talk",
      title_vi: "Thu Thach The Cong Thuc - Noi Chuyen Tu Do",
      theme: "Creating and presenting a step-by-step recipe using sequence connectors",
      type: "free_talk",
      image_url: "/images/week25/mission3_cover.jpg",
      nova_greeting: "Free Talk Challenge! Can you teach ME how to make your favourite food or do your favourite task? Use First, Next, Then, Finally!",
      mission_context: "CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 1-2 hint choices if student seems stuck: Say: ___ or ___! LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. Week 25 Mission 3. Student free-talks about their own step-by-step process using all four sequence connectors. GRAMMAR FOCUS: First I ___, Next I ___, Then I ___, Finally I ___. VOCAB: any sequence vocabulary.",

      story_character: {
        name: "Student (You!)",
        personality: "creative presenter who loves sharing personal routines and recipes",
        backstory: "The student knows how to make something — a food, a craft, a morning routine. Now they teach Nova how to do it step by step!",
        speaking_style: "confident, uses all four connectors: First, Next, Then, Finally",
        facts: {
          is_first_person: true,
          uses_all_four_connectors: true,
          teaches_nova: true,
          favorite_phrase: "First, you need to..."
        },
        role: "Creative presenter teaching Nova a personal step-by-step process"
      },

      opening_narrative: "Recipe Challenge starts now! You are the teacher today! Pick something you know how to do — make a food, do a morning task, pack your bag. Then teach me using First, Next, Then, Finally! What will you teach me? Say: I will teach you how to make or I will explain how to do",

      story_arc: [
        {
          phase: "choose_and_introduce",
          turns: "1-3",
          phase_name: "Choose a Topic",
          focus: "Introduce the task they will explain",
          goal: "Student picks a topic and introduces their explanation",
          phase_questions: [
            "Pick your topic! Can you teach me how to make a food or do a task? Say: I will teach you how to make toast or I want to explain how to pack my bag",
            "Great choice! How many steps does your process have? Say: My process has four steps or There are about five things to do",
            "Let us begin! What do you need to get started? Say: First you need to get or First the most important thing is"
          ]
        },
        {
          phase: "explain_steps",
          turns: "4-8",
          phase_name: "Step by Step Explanation",
          focus: "All four connectors First/Next/Then/Finally in sequence",
          goal: "Student explains all steps in order",
          phase_questions: [
            "Explain your FIRST step clearly! Say: First I take or First you need to or First the step is to",
            "Good start! What comes NEXT? Say: Next I add or Next you have to or Next the important thing is",
            "Halfway there! What do you do THEN? Say: Then I put or Then you should or Then the next part is",
            "Last step! What do you do FINALLY? Say: Finally I eat or Finally you finish by or Finally the last thing is",
            "Full sequence! Can you say all four steps in one go? Say: First... Next... Then... Finally... or the whole sequence in one breath!"
          ]
        },
        {
          phase: "reflect_and_review",
          turns: "9-12",
          phase_name: "Review and Reflect",
          focus: "Thinking about why sequence matters",
          goal: "Student explains why order is important and reflects on their explanation",
          phase_questions: [
            "Why does the ORDER of your steps matter? Say: The order matters because or If you mix up the steps",
            "What happens if you skip a step? Say: If you skip a step then or Without that step you cannot",
            "Can your partner follow your steps exactly? Say: Yes they can follow my steps or My steps are clear because I used First Next Then Finally",
            "Challenge complete! Were you a good sequence teacher today? Say: Yes I explained clearly or I think I was a good teacher because"
          ]
        }
      ],

      minimum_turns: 12,
      maximum_turns: 12,

      story_text: "It is time for the big Sequence Challenge! Each student must explain how to make their favourite simple food or do their favourite daily task using all four connectors: First, Next, Then, Finally. Mia chose to explain how to pour and drink a glass of juice: 'First, I take a clean cup. Next, I pour the juice from the bottle. Then, I stir it gently with a spoon. Finally, I drink and tidy up!' Can you create YOUR own step-by-step explanation? Make it clear so your partner can follow the steps exactly!",
      story_text_vi: "Da den luc Thu Thach Trinh Tu lon! Moi hoc sinh phai giai thich cach lam mon an don gian yeu thich hoac cach thuc hien mot nhiem vu hang ngay yeu thich, dung ca bon tu noi: First, Next, Then, Finally. Mia chon giai thich cach rot va uong mot ly nuoc ep: 'Thu nhat, toi lay mot coc sach. Tiep theo, toi rot nuoc ep tu chai ra. Sau do, toi khuy nhe voi muong. Cuoi cung, toi uong va don dep!' Ban co the tao ra loi giai thich tung buoc cua CHINH BAN khong? Lam cho ro rang de ban cung co the lam theo tung buoc!",
      discussion_prompts: [
        {
          id: 1,
          question_en: "Choose a simple food or task and describe it step by step: First... Next... Then... Finally...",
          prompt_vi: "Chon mot mon an don gian hoac nhiem vu va mo ta tung buoc: First... Next... Then... Finally...",
          grammar_hint: "First, I ___. Next, I ___. Then, I ___. Finally, I ___.",
          example_answer: "I will describe how to make toast. First, I put the bread in the toaster. Next, I press the button and wait. Then, I take the toast out carefully when it pops. Finally, I spread butter on it and eat it."
        },
        {
          id: 2,
          question_en: "Can you think of a daily task at school that has steps? Describe it using sequence connectors.",
          prompt_vi: "Ban co the nghi ve mot nhiem vu hang ngay o truong co cac buoc khong? Mo ta no dung tu noi trinh tu.",
          grammar_hint: "To ___: first I ___, then I ___, finally I ___.",
          example_answer: "To pack my school bag: First, I check my timetable. Next, I put in my books and stationery. Then, I add my lunch box. Finally, I zip it up and put it by the door."
        },
        {
          id: 3,
          question_en: "What is the most important thing about following steps in order? Give an example.",
          prompt_vi: "Dieu quan trong nhat khi lam theo cac buoc theo thu tu la gi? Hay cho vi du.",
          grammar_hint: "The most important thing is... For example, if you do not follow the order...",
          example_answer: "The most important thing is to not skip any steps. For example, if you skip the step of spreading jam, you will only have plain bread. Each step connects to the next one!"
        }
      ]
    }
  ],

  // 💬 SPARK TALK: AI-driven personal expression, bridged from the week's story
  spark_talk: [
    {
      id: 'spark_my_howto',
      emoji: '📝',
      title: 'How To...',
      bridge: 'The characters explained step by step how to make a sandwich, tie shoes, and fly a kite! 🪁',
      seed_question: 'What will you teach me? Is it how to make a sandwich or how to draw a cat?',
      frames: [
        { template: 'First, I ___', follow_up_q: 'What is the first step? Do you first wash your hands or get the ingredients?', hints: ['get the ingredients', 'wash my hands', 'open the book'] },
        { template: 'Then, I ___', follow_up_q: 'What is the next step?', hints: ['mix everything together', 'read the instructions', 'start working'] },
        { template: 'After that, I ___', follow_up_q: 'What do you do after that?', hints: ['add the salt', 'check the result', 'ask for help'] },
        { template: 'Finally, I ___', follow_up_q: 'What is the last step? Do you eat it or share it?', hints: ['eat it', 'share it with my family', 'celebrate'] },
        { template: 'First I ___, then I start cooking', follow_up_q: 'Tell me two steps in order!', hints: ['wash my hands', 'read the recipe', 'prepare everything'] },
        { template: 'The most important step is ___', follow_up_q: 'What is the most important step?', hints: ['washing your hands first', 'reading the instructions', 'being careful'] },
        { template: 'It takes ___ steps to finish it', follow_up_q: 'How many steps are there?', hints: ['three', 'four', 'five'] },
        { template: 'First I prepare, then I cook, and finally I eat', follow_up_q: 'Tell me the whole sequence!', hints: ['wash', 'read', 'plan'] },
      ],
      scaffold_frames: ['First you ___', 'Then you ___', 'Finally you ___'],
      vocab_focus: ['first', 'then', 'next', 'after that', 'finally'],
      turns: 8,
    },
    {
      id: 'spark_my_story_sequence',
      emoji: '🎬',
      title: 'My Story (Beginning to End)',
      bridge: 'Every great story has a beginning, a middle, and an exciting end — just like ours! 📖',
      seed_question: 'What is your story about? Is it a brave hero or a fun adventure?',
      frames: [
        { template: 'First, the story started with ___', follow_up_q: 'How did the story begin?', hints: ['a young hero', 'a big problem', 'a new adventure'] },
        { template: 'Then, ___', follow_up_q: 'What happened next in the story?', hints: ['the hero found a clue', 'a new friend appeared', 'something strange happened'] },
        { template: 'After that, ___', follow_up_q: 'What happened after that?', hints: ['the hero solved the problem', 'everyone worked together', 'the plan succeeded'] },
        { template: 'Finally, ___', follow_up_q: 'How did the story end? Was it a happy ending?', hints: ['everyone was happy', 'the hero won', 'they all celebrated'] },
        { template: 'My favourite part was when ___', follow_up_q: 'What was the best part of the story?', hints: ['the hero was brave', 'the friends helped each other', 'the ending was a surprise'] },
        { template: 'First the adventure started, then friends helped, finally everyone cheered', follow_up_q: 'Sum up the story in three steps!', hints: ['the adventure started', 'friends met', 'a hero appeared'] },
        { template: 'The story taught me that ___', follow_up_q: 'What lesson did the story have?', hints: ['teamwork is powerful', 'never give up', 'kindness always wins'] },
        { template: 'My story begins when ___ and everything changes', follow_up_q: 'Tell me your own story sequence!', hints: ['I found a treasure', 'I got lost', 'I had a dream'] },
      ],
      scaffold_frames: ['First, ___', 'Then, something happened —', 'In the end, ___'],
      vocab_focus: ['beginning', 'middle', 'end', 'then', 'finally'],
      turns: 8,
    },
  ],

  conversation_cards: [
    {
      id: 'sequence_connectors_practice',
      title: 'Sequencing Actions Practice',
      emoji: '📋',
      theme: 'Practicing sequence connectors First, Next, Then, Finally',
      difficulty: 'easy',
      exchanges: [
        { ai: 'Sequence time! How do you make a sandwich? Tell me the FIRST step! Say: First I take two slices of bread', options: ['First I take two slices of bread', 'First I get the bread and jam'] },
        { ai: 'Bread ready! What comes NEXT? Say: Next I spread the jam with a knife', options: ['Next I spread the jam with a knife', 'Next I open the jam jar'] },
        { ai: 'Great! What do you do THEN? Say: Then I put the two slices together', options: ['Then I put the two slices together', 'Then I press the bread together'] },
        { ai: 'Almost done! What is FINALLY? Say: Finally I cut the sandwich or Finally I eat the sandwich!', options: ['Finally I cut the sandwich in half', 'Finally I eat the sandwich!'] },
        { ai: 'Perfect! How do you brush teeth? FIRST? Say: First I put toothpaste on my brush', options: ['First I put toothpaste on my brush', 'First I get my toothbrush ready'] },
        { ai: 'Toothpaste ready! What is the LAST step when brushing teeth? Say: Finally I rinse my mouth', options: ['Finally I rinse my mouth with water', 'Finally I wash out the toothpaste'] }
      ],
      completion_message: 'Sequencing complete! You used First, Next, Then, Finally perfectly!'
    },
    {
      id: 'morning_routine_sequence',
      title: 'Morning Routine Sequencing',
      emoji: '🌅',
      theme: 'Describing a morning routine step by step',
      difficulty: 'easy',
      exchanges: [
        { ai: 'Morning time! What is the FIRST thing you do? Say: First I wake up or First I get out of bed', options: ['First I wake up and get out of bed', 'First I turn off my alarm clock'] },
        { ai: 'Good morning! What do you do NEXT? Say: Next I brush my teeth or Next I go to the bathroom', options: ['Next I go to the bathroom', 'Next I wash my face and brush my teeth'] },
        { ai: 'Clean up! What do you do THEN? Say: Then I get dressed or Then I put on my uniform', options: ['Then I get dressed for school', 'Then I put on my school uniform'] },
        { ai: 'Getting ready! What do you do FINALLY? Say: Finally I eat breakfast or Finally I pack my bag', options: ['Finally I eat breakfast and pack my bag', 'Finally I say goodbye and go to school'] },
        { ai: 'Great routine! How many steps in your morning? Say: I have four steps or My morning has five steps', options: ['I have four main steps', 'My morning routine has five steps'] }
      ],
      completion_message: 'Morning routine complete! You described your sequence perfectly!'
    },
    {
      id: 'bread_teeth_order',
      title: 'Sandwich and Teeth — In Order!',
      emoji: '🥪',
      theme: 'Sequencing two routines with connectors',
      difficulty: 'medium',
      exchanges: [
        { ai: 'Sequence challenge! Does SPREADING jam come before or after getting the bread? Say: Spreading jam comes after or First the bread then spread the jam', options: ['Spreading jam comes after getting the bread', 'First we get the bread then we spread the jam'] },
        { ai: 'Correct! Does RINSING come before or after brushing? Say: Rinsing comes after brushing or First you brush then you rinse', options: ['Rinsing comes after brushing', 'First you brush then you rinse your mouth'] },
        { ai: 'Perfect! Tell me sandwich steps using First Next Then Finally!', options: ['First take bread next spread jam then put together finally eat', 'First I get bread next I spread jam then cut it finally eat it'] },
        { ai: 'Amazing! What if you put bread together BEFORE spreading jam?', options: ['The jam will not be inside the sandwich', 'You cannot spread jam if bread is already together'] },
        { ai: 'Great thinking! Which has more steps: making sandwich or brushing teeth?', options: ['Making a sandwich has more steps', 'Brushing teeth has fewer steps than making a sandwich'] }
      ],
      completion_message: 'Sequence challenge complete! You understood the order perfectly!'
    }
  ],

  metadata: {
    week: 25,
    phase: 1,
    cefr_level: 'A1',
    grammar_guard: {
      target_tense: 'present simple with sequence connectors First Next Then Finally',
      forbidden_structures: ['will + verb', 'have + verb-ed'],
      focus_connectors: ['first', 'next', 'then', 'finally']
    }
  },
  freetalk_knowledge: {
    week_title: "The Sequence Challenge",
    week_number: 25,
    theme: "Sequencing actions step by step — First, Next, Then, Finally",

    knowledge_base: [
    "IMPORTANT — Always respond with empathy and understanding. Acknowledge student feelings before correcting. If a student shares something negative, say you are sorry or that sounds difficult.",
      "Sequence connectors: First, Next, Then, After that, Finally",
      "Grammar: Sequence Connectors used with Past Simple to tell the order of events",
      "Pattern: First, I ___. Next, I ___. Then, I ___. Finally, I ___.",
      "Examples: First, I woke up. Next, I brushed my teeth. Then, I ate breakfast. Finally, I went to school.",
      "We use sequence words to make our stories clear and easy to follow",
      "Common sequences: morning routine, making a sandwich, getting ready for school",
      "Transition tip: 'After that' can be used between 'Then' and 'Finally'",
      "Questions: What did you do first? What happened next?"
    ],

    example_opening_questions: [
      "Can you tell me what you did this morning, step by step?",
      "What do you do first when you wake up?",
      "Can you explain how to make your favourite food using First, Next, Then, Finally?",
      "What happened at school today? Tell me in order.",
      "What is the first thing you do when you get home from school?",
      "How do you get ready for bed at night? Tell me the steps."
    ],

    // FREE TALK 2.0: Starter prompts
    starter_prompts: [
      { text_en: "I want to play games! 🎮", text_vi: "Tôi muốn chơi game!", type: "game" },
      { text_en: "Translate this for me... 📖", text_vi: "Dịch giúp con câu/chữ này...", type: "help" },
      { text_en: "I have a question! ❓", text_vi: "Con có câu hỏi!", type: "ask" }
    ]
  },
};

export default week25RealData;
