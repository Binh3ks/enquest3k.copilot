const week29RealData = {
  week_id: 29,
  week_number: 29,
  title: "The Big Adventure",
  weekTitle_en: "Off We Go!",
  weekTitle_vi: "Xuat Phat Thoi!",
  topic: "Describing past travel events using Past Simple Irregular Verbs: went, ran, came, flew",
  topic_vi: "Mo ta cac su kien du lich trong qua khu dung Dong Tu Bat Quy Tac: went, ran, came, flew",
  theme: "Travel and transport, Lily's family trip to Da Nang, airport, plane journey, irregular past tense verbs in context",

  grammar_focus: "Past Simple Irregular Verbs 1: go→went, run→ran, come→came, fly→flew",
  grammar_pattern: "___ went to ___. They flew from ___ to ___. She ran to ___. He came back and ___.",
  grammar_examples: [
    "Lily's family went to the airport early in the morning.",
    "They flew from Hanoi to Da Nang in one hour.",
    "Lily ran to the window to see the planes.",
    "Dad came back with three boarding passes.",
    "They went on a big adventure together.",
    "The plane flew above the white clouds."
  ],
  // Chunks/collocations AI must use in story_text narrative
  // Source: read.js bold chunks — multi-word phrases and high-value vocabulary
  chunk_focus: [
    "Last week",
    "went on",
    "magic trip",
    "wonderful place",
    "got on",
    "magic carpet",
    "flew to",
    "tiny green island",
    "in the sea",
    "On the island",
    "friendly pilot",
    "came to",
    "help them",
    "picked up",
    "gave it",
    "learn about",
    "in the world",
    "there are",
    "carry passengers",
    "On the ground"
  ],
  target_vocab: [
    { word: "journey", pronunciation: "/ˈdʒɜːni/", definition_vi: "hành trình", definition_en: "a long trip from one place to another by plane, train, or car" },
    { word: "airport", pronunciation: "/ˈɛːpɔːt/", definition_vi: "sân bay", definition_en: "a place where planes take off and land, and passengers board their flights" },
    { word: "passenger", pronunciation: "/ˈpæsɪndʒər/", definition_vi: "hành khách", definition_en: "a person who travels on a plane, bus, or train — not the driver or pilot" },
    { word: "departure", pronunciation: "/dɪˈpɑːtʃər/", definition_vi: "thời điểm khởi hành", definition_en: "the time or act of leaving a place to start a journey" },
    { word: "arrival", pronunciation: "/əˈraɪvəl/", definition_vi: "thời điểm đến nơi", definition_en: "the time or act of reaching a destination at the end of a journey" },
    { word: "ticket", pronunciation: "/ˈtɪkɪt/", definition_vi: "vé", definition_en: "a piece of paper or card that shows you have paid to travel on a plane or train" },
    { word: "luggage", pronunciation: "/ˈlʌɡɪdʒ/", definition_vi: "hành lý", definition_en: "bags and suitcases that you take with you when you travel" },
    { word: "platform", pronunciation: "/ˈplætfɔːm/", definition_vi: "sân ga / ô tàu", definition_en: "the area in a train station where you stand to board or exit a train" },
    { word: "destination", pronunciation: "/ˌdɛstɪˈneɪʃən/", definition_vi: "điểm đến", definition_en: "the place you are traveling to — your final goal at the end of a journey" },
    { word: "route", pronunciation: "/ruːt/", definition_vi: "tuyến đường", definition_en: "the path or way taken to get from one place to another" },
    { word: "delay", pronunciation: "/dɪˈleɪ/", definition_vi: "sự chậm trễ", definition_en: "when something happens later than planned — a plane or train that is late" },
    { word: "vehicle", pronunciation: "/ˈviːɪkəl/", definition_vi: "phương tiện", definition_en: "any machine used to transport people or goods — cars, buses, trains, planes" },
    { word: "adventure", pronunciation: "/ədˈvɛntʃər/", definition_vi: "cuộc phiêu lưu", definition_en: "an exciting and unusual experience, often involving travel or discovery" },
    { word: "pilot", pronunciation: "/ˈpaɪlət/", definition_vi: "phi công", definition_en: "a person trained to fly an aeroplane or other aircraft" },
    { word: "doctor", pronunciation: "/ˈdɒktər/", definition_vi: "bác sĩ", definition_en: "a person trained to treat people who are sick or injured" },
    { word: "farmer", pronunciation: "/ˈfɑːmər/", definition_vi: "nông dân", definition_en: "a person who owns or works on a farm, growing crops or raising animals" },
    { word: "teacher", pronunciation: "/ˈtiːtʃər/", definition_vi: "giáo viên", definition_en: "a person whose job is to help students learn in a school or class" },
    { word: "driver", pronunciation: "/ˈdraɪvər/", definition_vi: "tài xế", definition_en: "a person who drives a vehicle such as a car, bus, or taxi as their job" },
    { word: "nurse", pronunciation: "/nɜːrs/", definition_vi: "y tá", definition_en: "a person trained to care for sick or injured people, working alongside doctors" }
  ],

  nova_instructions: {
    persona: "Nova - friendly bilingual AI tutor",
    language_mix: "English-dominant with Vietnamese scaffolding",
    key_correction: "Past Simple Irregular forms: go→went (NOT goed), run→ran, come→came, fly→flew (NOT flyed)",
    nova_recast: "Great! They FLEW to Da Nang! Say: Lily's family flew from Hanoi to Da Nang. Where did they go?",
    grammar_guard: "Always model the correct irregular past form. Student says 'goed'? Recast with 'went'. Student says 'flyed'? Recast with 'flew'. Ran/came errors corrected similarly. Keep encouraging and move the story forward."
  },

  v28_format_notes: {
    response_format: "ack + recast + question (V28 ONLY - NOT V25)",
    ack_options: ["Oh!", "I see!", "Nice!", "Wow!", "Really?", "Interesting!", "That is wonderful!"],
    recast_max_words: 8,
    recast_rules: [
      "Echo the travel action with correct irregular past form",
      "Model: Subject + irregular verb + details (went/ran/came/flew)",
      "Keep it exciting and ask about the next travel event"
    ],
    question_patterns_allowed: [
      "Where did they go?",
      "How did they get there?",
      "What did Lily do next?",
      "What happened at the airport?",
      "Where did the plane fly?"
    ],
    question_patterns_forbidden: [
      "Why do you think...?",
      "What does... mean?",
      "Do you understand?"
    ],
    example_exchanges: [
      { student: "They goed to airport", tutor_response: "Nice! They WENT to the airport! Say: Lily's family went to the airport early. What did they see there?" },
      { student: "The plane flyed up", tutor_response: "Wow! The plane FLEW up! Say: The plane flew above the white clouds. Where did they go?" },
      { student: "Lily runned to window", tutor_response: "Oh! Lily RAN to the window! Say: Lily ran to the window to see the planes. What did she see?" }
    ]
  },

  story_missions: [
    {
      mission_id: 1,
      id: 1,
      title: "The Big Adventure - Story",
      title_en: "The Big Adventure - Story",
      title_vi: "Cuoc Phieu Luu Lon - Cau Chuyen",
      theme: "Lily's family goes to the airport and flies to Da Nang for their first big adventure",
      type: "story",
      image_url: "/images/week29/mission1_cover.jpg",
      nova_greeting: "Adventure time! Today Lily and her family went to the airport for their first plane trip. Let us follow their exciting journey from home to Da Nang together!",
      mission_context: "CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 1-2 hint choices if student seems stuck: Say: ___ or ___! LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. Week 29 Mission 1. Student practices Past Simple Irregular Verbs by retelling Lily's family trip to Da Nang. GRAMMAR FOCUS: went, ran, came, flew. VOCAB: journey, airport, passenger, departure, arrival, ticket, luggage, platform, destination, route, delay, vehicle, adventure.",

      story_character: {
        name: "Lily",
        personality: "curious and adventurous, excited about new experiences",
        backstory: "Lily is eight years old. Her family went to the airport early one morning for their very first plane trip. Their destination was Da Nang — a city by the sea. They flew from Hanoi in one hour and had an amazing adventure.",
        speaking_style: "enthusiastic and descriptive, uses past tense to retell events",
        facts: {
          went_to_airport_early: true,
          dad_came_back_with_tickets: true,
          lily_ran_to_window: true,
          plane_flew_from_hanoi: true,
          arrived_in_da_nang: true,
          family_adventure_together: true
        },
        role: "Excited young traveler on her first plane journey"
      },

      opening_narrative: "What an exciting adventure awaits! Lily woke up very early. Mum said: today we go to Da Nang! They went to the airport by taxi. Let us retell the story! Where did Lily's family go? Say: They went to the airport or Lily and her family went to Da Nang",

      story_arc: [
        {
          phase: "at_the_airport",
          turns: "1-3",
          phase_name: "Arriving at the Airport",
          focus: "Past Simple: went, came",
          goal: "Student retells the family's arrival at the airport",
          phase_questions: [
            "Where did Lily's family go first? Say: They went to the airport early in the morning or Lily's family went to Noi Bai Airport by taxi",
            "What did Dad come back with? Say: Dad came back with three tickets or He came back with the boarding passes",
            "What did Lily do when she saw the planes? Say: Lily ran to the big window or She ran across the hall to see the planes"
          ]
        },
        {
          phase: "boarding_the_plane",
          turns: "4-6",
          phase_name: "Boarding the Plane",
          focus: "Past Simple: ran, came, went",
          goal: "Student describes boarding using irregular past forms",
          phase_questions: [
            "How did the family get to the gate? Say: They walked through the departure gate or The family went through the gate together",
            "What did passengers carry? Say: Passengers carried their luggage onto the plane or They put their bags in the overhead lockers",
            "When the announcement came, what did they do? Say: They went to Gate 7 or The family came to the gate when they heard the announcement"
          ]
        },
        {
          phase: "flying",
          turns: "7-9",
          phase_name: "Flying to Da Nang",
          focus: "Past Simple: flew",
          goal: "Student describes the flight using flew",
          phase_questions: [
            "How did Lily's family travel to Da Nang? Say: They flew from Hanoi to Da Nang or The plane flew south to reach Da Nang",
            "What did Lily see from the window? Say: She saw white clouds below or The plane flew above the clouds and Lily saw the sea",
            "How long did the flight take? Say: The flight took one hour or They flew for about sixty minutes"
          ]
        },
        {
          phase: "arrival",
          turns: "10-12",
          phase_name: "Arriving at Da Nang",
          focus: "Past Simple: came, went — arrival and adventure begins",
          goal: "Student completes the travel story with arrival and adventure",
          phase_questions: [
            "When the plane landed, where did they go? Say: They went to the arrivals hall or The family came out of the airport into the sunshine",
            "What could they see at Da Nang airport? Say: They came out and saw the sea or There was a blue sky and warm sunshine at Da Nang",
            "What was Lily's adventure? Say: Lily went on a big adventure with her family or It was the best journey of her life"
          ]
        }
      ],

      minimum_turns: 10,
      maximum_turns: 12,

      story_text: "Lily woke up very early one morning. Mum said: 'Today we fly to Da Nang!' They packed their luggage the night before. Dad called a taxi and they went to Noi Bai Airport before sunrise. The airport was huge and full of passengers. Lily ran to the big window to look at the planes on the runway. 'Look at that big one!' she said. Dad came back with three tickets and boarding passes. 'Gate 7!' he called. They walked through the departure hall and showed their tickets at the gate. Soon, an announcement came over the speakers: 'Flight VN214 to Da Nang — now boarding.' They went down the air bridge and stepped onto the plane. Lily sat by the window. The plane taxied along the route and then — whoosh! — it flew up into the blue sky. Lily pressed her face against the glass. Below, she saw white clouds and then, far away, the shining sea. 'Our destination!' said Mum. One hour later, the plane landed smoothly. There was no delay. They came out of Da Nang Airport into warm sunshine and a big blue sky. 'We flew here!' said Lily. 'This is our adventure!' ",
      story_text_vi: "Lily thuc day rat som mot buoi sang. Me noi: 'Hom nay chung ta bay den Da Nang!' Ho da don hanh ly tu toi hom truoc. Bo goi taxi va ho den San bay Noi Bai truoc binh minh. San bay rat lon va day hanh khach. Lily chay den cua so lon de nhin cac may bay tren duong bang. 'Nhin cai lon kia kia!' co noi. Bo quay lai voi ba ve va the len may bay. 'Cong 7!' ong goi. Ho di bo qua hanh lang khoi hanh va xuat trinh ve o cong. Sap den luc, mot thong bao vang len qua loa: 'Chuyen bay VN214 den Da Nang — moi hanh khach len tau.' Ho di xuong cau hang khong va buoc len may bay. Lily ngoi o ghe canh cua so. May bay lan ra va bay len bau troi xanh — vut! Lily ap mat vao kinh. Phia duoi, co thay may trang va phia xa, bien sang long lanh. 'Diem den cua chung ta day!' Me noi. Mot tieng dong ho sau, may bay ha canh nhe nhang. Khong co su cham tre. Ho ra khoi San bay Da Nang vao anh nang am ap va bau troi xanh rong. 'Chung ta da bay den day!' Lily noi. 'Day la cuoc phieu luu cua chung ta!'",
      discussion_prompts: [
        {
          id: 1,
          question_en: "Retell Lily's journey from home to Da Nang. Use: went, flew, ran, came.",
          prompt_vi: "Ke lai hanh trinh cua Lily tu nha den Da Nang. Dung: went, flew, ran, came.",
          grammar_hint: "First, Lily's family went to... Then she ran to... Dad came back with... The plane flew...",
          example_answer: "First, Lily's family went to the airport by taxi. Then Lily ran to the big window to see the planes. Dad came back with three tickets. Finally, the plane flew from Hanoi to Da Nang in one hour."
        },
        {
          id: 2,
          question_en: "What did Lily see and feel during the flight? Use past tense.",
          prompt_vi: "Lily da thay va cam thay gi trong chuyen bay? Dung qua khu.",
          grammar_hint: "She saw... The plane flew above... She felt... It was...",
          example_answer: "During the flight, Lily sat by the window. She saw white clouds below the plane. The plane flew above the clouds. She felt excited when she saw the sea far away. It was an amazing adventure."
        },
        {
          id: 3,
          question_en: "Describe a journey you went on. Use: went, came, ran, flew — or any irregular past verb.",
          prompt_vi: "Mo ta mot hanh trinh ban da trai qua. Dung: went, came, ran, flew — hoac bat ky dong tu qua khu bat quy tac nao.",
          grammar_hint: "I went to... We flew / took a bus to... I ran to... When we came back...",
          example_answer: "Last holiday, I went to my grandparents' house by bus. We left early in the morning. I ran to the bus station because we were almost late. When we came home, I was tired but very happy."
        }
      ]
    },
    {
      mission_id: 2,
      id: 2,
      title: "Tom's Travel Report - Practice",
      title_en: "Tom's Travel Report - Practice",
      title_vi: "Bao Cao Du Lich Cua Tom - Luyen Tap",
      theme: "Tom retells his family's train and plane trip using irregular past verbs",
      type: "practice",
      image_url: "/images/week29/mission2_cover.jpg",
      nova_greeting: "Travel report time! Tom went on two different trips last month — one by train and one by plane. Let us help him retell his journeys using the correct irregular past verbs!",
      mission_context: "CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 1-2 hint choices if student seems stuck: Say: ___ or ___! LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. Week 29 Mission 2. Student practises Past Simple Irregular Verbs (went, ran, came, flew) through Tom's travel report. GRAMMAR FOCUS: went, ran, came, flew — correct irregular forms, NO goed/runned/comed/flyed. VOCAB: journey, airport, passenger, departure, arrival, ticket, luggage, platform, destination, route, delay, vehicle, adventure.",

      story_character: {
        name: "Tom",
        personality: "talkative and detailed, likes to share his travel stories",
        backstory: "Tom went on a train trip to Hue last month and then flew to Ho Chi Minh City with his dad. He wants to write his travel report but needs help using the correct past tense forms.",
        speaking_style: "enthusiastic storyteller, mixes up irregular past tense — needs recasting support",
        facts: {
          went_by_train_to_hue: true,
          came_back_late: true,
          ran_to_catch_the_train: true,
          flew_to_hcmc_with_dad: true,
          no_delay_on_flight: true,
          lots_of_luggage: true
        },
        role: "Young traveler who needs help forming irregular past tense in his report"
      },

      opening_narrative: "Tom's travel report starts now! Tom wants to tell you about his two trips last month. Trip One: Hanoi to Hue by train. Trip Two: Hanoi to Ho Chi Minh City by plane. Let us help him use the right past tense! Where did Tom go first? Say: Tom went to Hue by train or He took the train to Hue last month",

      story_arc: [
        {
          phase: "train_journey",
          turns: "1-4",
          phase_name: "The Train Journey to Hue (went, ran, came)",
          focus: "Past Simple: went, ran, came — train trip",
          goal: "Student retells Tom's train journey using went/ran/came",
          phase_questions: [
            "Where did Tom go on Trip One? Say: Tom went to Hue by train or He went on a long train journey to Hue",
            "Tom and his mum were almost late! What did they do? Say: They ran to Platform 3 or Tom ran as fast as he could to catch the train",
            "When did they come home? Say: They came back to Hanoi the next day or Tom came home on Sunday evening",
            "Why did they come back by bus? Say: They came back by bus because the train was full or There was no ticket for the return train journey"
          ]
        },
        {
          phase: "plane_journey",
          turns: "5-8",
          phase_name: "The Plane Journey to Ho Chi Minh City (flew, went)",
          focus: "Past Simple: flew, went — plane trip with Dad",
          goal: "Student retells Tom's flight using flew/went",
          phase_questions: [
            "How did Tom and his dad travel to Ho Chi Minh City? Say: They flew from Hanoi to Ho Chi Minh City or Tom and his dad flew south",
            "Was there a delay? Say: There was no delay or The plane departed on time and flew for two hours",
            "What did Tom carry as luggage? Say: Tom carried a small backpack or He went with just one bag because it was a short trip",
            "Where did they go in Ho Chi Minh City? Say: They went to visit Tom's uncle or Tom and his dad went to the Ben Thanh Market"
          ]
        },
        {
          phase: "compare_and_reflect",
          turns: "9-10",
          phase_name: "Comparing the Two Journeys",
          focus: "Past Simple — comparing experiences",
          goal: "Student compares the train trip and the plane trip",
          phase_questions: [
            "Which journey was faster? Say: The plane trip was faster or They flew to HCMC in two hours but the train took eight hours",
            "Which vehicle did Tom prefer? Say: Tom preferred the plane or He liked flying more because it was faster and exciting"
          ]
        }
      ],

      minimum_turns: 10,
      maximum_turns: 12,

      story_text: "Tom had two adventures last month. Trip One was by train. Tom and Mum went to Ga Hanoi station early in the morning. They almost missed the train! Tom ran as fast as he could to Platform 3. They jumped on just in time. The train went south along a beautiful route next to mountains and rice fields. Their destination was Hue — an ancient city. They arrived without any delay. The next day, they came back to Hanoi by bus because the return train ticket was all sold out. Trip Two was by plane. Tom and Dad went to Noi Bai Airport. Dad carried the luggage while Tom held the tickets. They were passengers on Flight VN230. The plane flew from Hanoi to Ho Chi Minh City in just two hours. Tom looked out the window and saw the city far below. 'We flew so high!' he said. When they came out at Tan Son Nhat Airport, his uncle waved and called: 'Welcome to HCMC!' It was an amazing adventure — two journeys, two vehicles, two great stories to tell.",
      story_text_vi: "Tom da co hai cuoc phieu luu thang truoc. Chuyen di Thu Nhat la bang tau hoa. Tom va Me den Ga Ha Noi som buoi sang. Ho suyt bo lo tau! Tom chay nhanh het suc den San tau 3. Ho buoc len vua kip luc. Tau chay ve phia nam theo tuyen duong dep ben canh nui va dong lua. Diem den cua ho la Hue — mot thanh pho co kinh. Ho den noi khong bi cham tre. Ngay hom sau, ho quay ve Ha Noi bang xe buyt vi ve tau chieu ve da het. Chuyen di Thu Hai la bang may bay. Tom va Bo den San bay Noi Bai. Bo xach hanh ly con Tom cam ve. Ho la hanh khach tren chuyen bay VN230. May bay bay tu Ha Noi den Thanh pho Ho Chi Minh chi mat hai tieng. Tom nhin ra cua so va thay thanh pho o xa phia duoi. 'Chung ta bay cao qua!' anh noi. Khi ra khoi San bay Tan Son Nhat, chu anh vay tay va goi: 'Chao mung den TPHCM!' Day la mot cuoc phieu luu tuyet voi — hai hanh trinh, hai phuong tien, hai cau chuyen hay de ke.",
      discussion_prompts: [
        {
          id: 1,
          question_en: "Retell Tom's train trip to Hue. Use: went, ran, came.",
          prompt_vi: "Ke lai chuyen tau cua Tom den Hue. Dung: went, ran, came.",
          grammar_hint: "Tom went to... He ran to Platform... They came back...",
          example_answer: "Tom went to Ga Hanoi station with his mum. They almost missed the train so Tom ran to Platform 3. The train went south to Hue. The next day, they came back to Hanoi by bus."
        },
        {
          id: 2,
          question_en: "Retell Tom's plane trip to Ho Chi Minh City. Use: flew, went, came.",
          prompt_vi: "Ke lai chuyen bay cua Tom den Thanh pho Ho Chi Minh. Dung: flew, went, came.",
          grammar_hint: "Tom and his dad went to... The plane flew... When they came out...",
          example_answer: "Tom and his dad went to Noi Bai Airport. The plane flew from Hanoi to Ho Chi Minh City in two hours. When they came out at Tan Son Nhat Airport, his uncle was waiting for them."
        },
        {
          id: 3,
          question_en: "Compare a train journey and a plane journey. Which is better? Use past tense.",
          prompt_vi: "So sanh chuyen tau va chuyen bay. Cai nao tot hon? Dung qua khu.",
          grammar_hint: "The train went slowly but... The plane flew faster... I think... because...",
          example_answer: "The train went slowly but it was comfortable and scenic. The plane flew much faster — Tom's train took eight hours but the plane took only two. I think the plane was better because there was no delay and Tom came home quickly. But the train was more relaxing and beautiful."
        }
      ]
    },
    {
      mission_id: 3,
      id: 3,
      title: "Grandma's Welcome - Creative",
      title_en: "Grandma's Welcome - Creative",
      title_vi: "Loi Chao Don Cua Ba - Sang Tao",
      theme: "Creative retelling of the arrival scene — Grandma's perspective using went, ran, came, flew",
      type: "creative",
      image_url: "/images/week29/mission3_cover.jpg",
      nova_greeting: "Creative time! Grandma waited all day at Da Nang Airport. She ran to the arrival hall the moment she heard the announcement. Now imagine you are Grandma — tell me the story from her side!",
      mission_context: "CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 1-2 hint choices if student seems stuck: Say: ___ or ___! LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. Week 29 Mission 3. Student retells the airport arrival from Grandma's point of view. GRAMMAR FOCUS: went, ran, came, flew. CREATIVE TASK: first-person past tense narrative from Grandma's perspective.",

      story_character: {
        name: "Grandma",
        personality: "warm, loving, excited to see her grandchildren after a long time",
        backstory: "Grandma lives in Da Nang. She knew Lily's family flew from Hanoi today. She went to the airport early and waited in the arrivals hall. When the plane came, she ran to be first in line to hug everyone.",
        speaking_style: "warm and expressive, uses simple past tense to describe waiting and reuniting",
        facts: {
          waited_at_airport: true,
          plane_came_from_hanoi: true,
          ran_to_arrivals: true,
          hugged_everyone: true,
          prepared_welcome_home: true
        },
        role: "Loving grandmother waiting at Da Nang Airport for her family to arrive"
      },

      opening_narrative: "Creative story from Grandma's side! I went to the airport very early this morning. My heart ran fast with excitement. The big board said: Flight VN214 from Hanoi — ARRIVED. Tell the story as Grandma! Say: I went to the airport because ___ or I came early because ___",

      story_arc: [
        {
          phase: "waiting_at_airport",
          turns: 3,
          focus: "Grandma goes to the airport and waits — using went and came",
          ai_prompts: [
            "Grandma, why did you go to the airport so early? Say: I went early because ___ or I came to the airport because ___",
            "Did anyone come with you to the airport? Say: ___ came with me or I went to the airport alone because ___",
            "How long did you wait? Say: I waited for ___ or The plane came at ___ and I was already there at ___"
          ],
          model_responses: [
            "I went to the airport early because I was so excited! My Lily flew all the way from Hanoi to see me!",
            "My neighbor came with me by taxi because I was too excited to drive!",
            "I waited for two hours! The plane came at noon and I arrived at 10 o'clock in the morning."
          ]
        },
        {
          phase: "the_plane_arrives",
          turns: 3,
          focus: "The plane arrives and Grandma runs — using flew, came, ran",
          ai_prompts: [
            "The big screen shows: Da Nang ARRIVED from Hanoi! What did you do? Say: I ran to ___ or I came as fast as I could to ___",
            "The doors opened and Lily's family came out! What happened? Say: When they came out, I ___ or The moment they came through the doors ___",
            "You ran to hug Lily first! Say: I ran to Lily because ___ or I hugged ___ first because ___"
          ],
          model_responses: [
            "I ran to the front of the arrivals hall as fast as my legs could go!",
            "When they came out, I cried happy tears and opened my arms wide!",
            "I ran to Lily first because she flew so far and I missed her the most!"
          ]
        },
        {
          phase: "the_reunion",
          turns: 4,
          focus: "Creative writing — the full reunion story in Grandma's voice",
          ai_prompts: [
            "Now retell the whole morning: I went to the airport... the plane came... I ran...",
            "What did you say to Lily when you finally came together? Say: I said ___ or I asked ___",
            "What happened after the hugs? Where did you all go? Say: We went to ___ or I took them to ___",
            "Imagine you are writing a letter. Start: Dear Lily, Today I went to the airport and I was so happy when the plane came..."
          ],
          model_responses: [
            "I went to the airport at ten, the plane came at noon, and I ran when I saw them come through the doors!",
            "I said: Welcome to Da Nang! and I asked: How was the journey? Did you fly above the clouds?",
            "We went to my house and I cooked all their favorite food — it was the best day ever!",
            "Dear Lily, Today I went to the airport and my heart ran fast with joy. When your plane came and you walked through the doors, I ran to you. It was the best moment of my life. Love, Grandma."
          ]
        }
      ]
    }
  ],

  // 💬 SPARK TALK: AI-driven personal expression
  spark_talk: [
    {
      id: 'spark_my_journey',
      emoji: '✈️',
      title: 'My Big Journey',
      bridge: 'Tom went on the biggest adventure of his life — he flew, he ran, he came home! And what about YOU — did you ever go on a big journey?',
      seed_question: 'Did you go on a trip? Did you go to a new city or a new country?',
      frames: [
        { template: 'I went to ___', follow_up_q: 'Where did you go? To a new city or a new country?', hints: ['a new city', 'the airport', 'grandma\'s house'] },
        { template: 'I came from ___', follow_up_q: 'Where did you come from? From your city or your home?', hints: ['my city', 'my home', 'a long way away'] },
        { template: 'I flew to ___', follow_up_q: 'Where did you fly? To a new country or a holiday place?', hints: ['a new country', 'a holiday place', 'Japan'] },
        { template: 'I ran to ___', follow_up_q: 'Where did you run? To the gate or to your family?', hints: ['the gate', 'my family', 'the terminal'] },
        { template: 'I went with my ___', follow_up_q: 'Who did you go with? Your family or your friend?', hints: ['family', 'friend', 'grandparents'] },
        { template: 'I came back and I was ___', follow_up_q: 'How did you feel when you came back?', hints: ['happy to be home', 'tired but excited', 'full of great memories'] },
        { template: 'I flew over ___', follow_up_q: 'What did you fly over? Mountains or the sea?', hints: ['mountains', 'the sea', 'beautiful clouds'] },
        { template: 'I went, I saw, and I ___', follow_up_q: 'What did you do on your adventure? Go, see, and...?', hints: ['came home happy', 'felt inspired', 'learned so much'] }
      ],
      scaffold_frames: ['I went to ___', 'I flew over ___', 'I came back and I was ___'],
      vocab_focus: ['went', 'ran', 'came', 'flew', 'journey'],
      turns: 8
    },
    {
      id: 'spark_at_the_airport',
      emoji: '🌍',
      title: 'At the Airport',
      bridge: 'Tom ran through the airport, flew high in the sky, and came home to a big hug! What is YOUR airport story?',
      seed_question: 'Did you ever fly on a plane? Was it exciting or a little scary?',
      frames: [
        { template: 'I went to the airport and ___', follow_up_q: 'What happened at the airport?', hints: ['checked in my bag', 'saw many planes', 'met the pilot'] },
        { template: 'I came from ___ to Japan', follow_up_q: 'Where did you travel from and to?', hints: ['Vietnam', 'my home city', 'Ho Chi Minh City'] },
        { template: 'I flew ___ for three hours', follow_up_q: 'How long did you fly?', hints: ['to Japan', 'far away', 'over the sea'] },
        { template: 'I ran to catch the ___', follow_up_q: 'What did you run to catch?', hints: ['plane', 'bus to the airport', 'gate'] },
        { template: 'I went on the plane and I ___', follow_up_q: 'What did you do on the plane?', hints: ['slept', 'watched a movie', 'ate airplane food'] },
        { template: 'I came to ___ and saw beautiful temples', follow_up_q: 'Where did you arrive and what did you see?', hints: ['Japan', 'a new city', 'the beach'] },
        { template: 'I flew ___ and felt so excited', follow_up_q: 'How did you feel when you were flying?', hints: ['high in the sky', 'above the clouds', 'to a new place'] },
        { template: 'The best part of my journey was when I ___', follow_up_q: 'What was the best part?', hints: ['flew for the first time', 'arrived and saw my family', 'came home safely'] }
      ],
      scaffold_frames: ['I went to the airport and ___', 'I flew ___ for ___ hours', 'I came to ___ and saw ___'],
      vocab_focus: ['went', 'ran', 'came', 'flew', 'airport'],
      turns: 8
    }
  ],

  conversation_cards: [
    {
      id: "airport_chat",
      title: "At the Airport",
      emoji: "✈️",
      theme: "Practising went, ran, came, flew in a travel context",
      difficulty: "easy",
      exchanges: [
        { ai: "Travel time! Where did your family go last holiday? Say: We went to ___ or My family went to ___", options: ["We went to Da Nang on a plane.", "My family went to Hanoi by train.", "We went to the beach last holiday."] },
        { ai: "Great! How did you get there? Say: We flew to ___ or We went by ___", options: ["We flew from Hanoi to Da Nang.", "We went by bus to the mountains.", "We flew — it only took two hours!"] },
        { ai: "Exciting! Did anyone run at the airport? Say: Yes, ___ ran to ___ or No, we walked slowly", options: ["Yes, Dad ran to the check-in desk.", "Yes, I ran to see the planes at the window.", "No, we walked slowly — we arrived early."] },
        { ai: "Now tell me about arrival! Who came to meet you? Say: ___ came to meet us or Nobody came — we took a taxi", options: ["Grandma came to meet us at the airport!", "My uncle came with a big sign with our names.", "Nobody came — we took a taxi to the hotel."] },
        { ai: "Wonderful! Use ALL FOUR verbs in one sentence about the trip! Say: We went..., flew..., ran..., came...", options: ["We went to the airport, flew to Da Nang, ran to the gate, and then Grandma came to hug us!", "My family went by taxi, flew for two hours, Dad ran to check-in, and Grandma came to the arrival hall."] }
      ],
      completion_message: "Amazing travel chat! You used went, ran, came, and flew perfectly! ✈️"
    },
    {
      id: "travel_story_retell",
      title: "Retell the Journey",
      emoji: "📖",
      theme: "Retelling a travel story using irregular past verbs and sequence words",
      difficulty: "medium",
      exchanges: [
        { ai: "Story time! Let us retell Lily's journey. First — where did the family go? Say: First, Lily's family went to ___ or They went to the airport first", options: ["First, Lily's family went to the airport by taxi.", "They went to Noi Bai Airport very early in the morning.", "First, the whole family went to catch their flight."] },
        { ai: "Good! Next — who ran and why? Say: Dad ran to ___ because ___ or Then Dad ran when ___", options: ["Then Dad ran to the check-in desk because they had 30 minutes left.", "Next, Dad ran to the gate because their departure was soon.", "Dad ran fast because they were almost late for boarding."] },
        { ai: "After that — how did Mum arrive? Say: After that, Mum came with ___ or Then Mum came through ___", options: ["After that, Mum came through the doors with two big suitcases.", "Then Mum came with all the luggage, smiling calmly.", "Mum came to join them at the gate with everything packed."] },
        { ai: "Then — describe the flight! Say: The plane flew ___ or They flew above ___", options: ["The plane flew up into the blue sky above the white clouds!", "They flew from Hanoi to Da Nang in just two hours.", "The plane flew so high — the cars below looked like tiny toys."] },
        { ai: "Finally — who came to meet them? Say: Finally, Grandma ran/came to ___ and said ___", options: ["Finally, Grandma ran to the arrival hall to hug everyone!", "Grandma came to meet them at Da Nang Airport with a big smile.", "Finally, Grandma came and asked: How was the journey?"] }
      ],
      completion_message: "Story retold perfectly! You used First, Next, After that, Finally — and all four irregular verbs! 🌟"
    },
    {
      id: "lily_window_moment",
      title: "Lily at the Window",
      emoji: "🪟",
      theme: "Describing what Lily saw and felt during the flight — creative past tense storytelling",
      difficulty: "hard",
      exchanges: [
        { ai: "Lily sat by the window on the plane. What did she see first? Say: She saw ___ below or From the window, she could see ___", options: ["She saw the whole airport getting smaller and smaller below.", "From the window, she could see the runway and all the parked planes.", "She saw the city disappear as the plane flew up into the clouds."] },
        { ai: "The plane flew above the clouds! What did the roads and cars look like from up there? Say: The cars looked like ___ or Everything below looked ___", options: ["The cars looked like tiny little toys from way up high!", "Everything below looked so small — like a miniature city.", "The roads looked like thin lines and the cars were like little colored dots."] },
        { ai: "How do you think Lily felt when the plane flew into the clouds? Say: Lily felt ___ because ___ or She must have felt ___", options: ["Lily felt excited and amazed because she had never flown before!", "She must have felt a little scared but also very happy.", "Lily felt like she was in a dream — floating above the whole world."] },
        { ai: "The plane came down and landed at Da Nang. Who ran first when they came out? Say: ___ ran to ___ or When they came out, ___", options: ["Grandma ran from the arrivals hall and came straight to hug Lily!", "Lily ran to the big windows to see the Da Nang beach in the distance.", "When they came out, everyone came together and Dad ran to get the luggage."] },
        { ai: "Now bring it all together! Tell the whole window story in 2 sentences using went, flew, saw, came.", options: ["Lily went to the window, the plane flew above the clouds, she saw tiny cars below, then Grandma came to hug her at the end.", "They went up high, flew above white clouds, Lily saw a tiny city below, and finally Grandma came running to meet them."] }
      ],
      minimum_turns: 10,
      maximum_turns: 12,

      completion_message: "Beautiful storytelling! You brought Lily's window adventure to life in perfect Past Simple! ✈️🪟"
    }
  ],

  freetalk_knowledge: {
    week_title: "The Big Journey",
    week_number: 29,
    theme: "Travel and airports using Past Simple Irregular Verbs",

    knowledge_base: [
    "IMPORTANT — Always respond with empathy and understanding. Acknowledge student feelings before correcting. If a student shares something negative, say you are sorry or that sounds difficult.",
      "Irregular verbs: go→went, run→ran, come→came, fly→flew",
      "We use Past Simple to tell stories about finished actions",
      "At an airport: departure, arrival, ticket, luggage, passport, gate",
      "Sequence words for stories: first, then, after that, finally",
      "Lily's family flew from Hanoi to Da Nang — flew is the past of fly",
      "They went to the airport early — went is the past of go",
      "Grandma ran to the arrivals hall — ran is the past of run",
      "NEVER say goed, runned, comed, or flyed — these are wrong",
      "Cambridge occupations 1: pilot (phi công), doctor (bác sĩ), farmer (nông dân), teacher (giáo viên), driver (tài xế), nurse (y tá)",
      "In the Magic Trip story, Lily visited: a farm (farmer), a school (teacher), the ocean (pilot waved), a hospital (doctor and nurse), finally a driver helped her home"
    ],

    example_opening_questions: [
      "Have you ever been on a plane? Where did you go?",
      "What do you do at an airport before you fly?",
      "Can you tell me about a trip you took? Where did you go?",
      "What is the difference between 'go' and 'went'?",
      "Imagine you flew to a new city — where did you go and what did you do?",
      "What happened when Lily's family arrived at Da Nang airport?"
    ],

    starter_prompts: [
      { text_en: "I want to play games! 🎮", text_vi: "Tôi muốn chơi game!", type: "game" },
      { text_en: "Translate this for me... 📖", text_vi: "Dịch giúp con câu/chữ này...", type: "help" },
      { text_en: "Let's do roleplay! 🎭", text_vi: "Chơi nhập vai đi cô!", type: "roleplay" }
    ]
  },

  metadata: {
    week: 29,
    phase: 1,
    cefr_level: "A1+",
    grammar_guard: {
      target_tense: "Past Simple Irregular: go→went, run→ran, come→came, fly→flew",
      forbidden_structures: ["goed", "runned", "comed", "flyed", "did not went", "did not ran"],
      focus_verbs: ["went", "ran", "came", "flew"]
    }
  }
};

export default week29RealData;
