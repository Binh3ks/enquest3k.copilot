"""
Comprehensive fix script for W29-W36 to match W28 golden standard.
Fixes: vocab_tiers, PART 5, PART 6, PART 8, SPIRAL REVIEW structure.
"""
import json, os, copy

BASE = os.path.dirname(os.path.abspath(__file__))

# ─────────────────────────────────────────────────────────────────────────────
# 1. VOCAB TIERS ADDITIONS (grammar table + Tier2 Cambridge words)
# ─────────────────────────────────────────────────────────────────────────────
# W28 has story-word entries + Tier2 preview entries (with Vietnamese + sentence)
# + 2 grammar table rows (just strings, no dict)

VOCAB_GRAMMAR_TABLES = {
    29: ["go → went / come → came / run → ran / fly → flew",
         "didn't go / didn't come / didn't run / didn't fly  (negative: use base form)"],
    30: ["eat → ate / drink → drank / have → had",
         "didn't eat / didn't drink / didn't have  (negative: use base form)"],
    31: ["see → saw / hear → heard / feel → felt / smell → smelt",
         "didn't see / didn't hear / didn't feel / didn't smell  (negative: use base form)"],
    32: ["do → did / make → made / have → had / take → took",
         "didn't do / didn't make / didn't have / didn't take  (negative: use base form)"],
    33: ["break → broke / fall → fell / lose → lost / find → found",
         "didn't break / didn't fall / didn't lose / didn't find  (negative: use base form)"],
    34: ["run → ran / win → won / catch → caught / say → said",
         "didn't run / didn't win / didn't catch / didn't say  (negative: use base form)"],
    35: ["go → went / see → saw / feel → felt / make → made / give → gave",
         "didn't go / didn't see / didn't feel / didn't make / didn't give  (negative: use base form)"],
    36: ["REVIEW: went / saw / heard / ran / felt / lost / found / gave + was / were",
         "Sequence words: First… / Then… / Next… / After that… / Finally…"],
}

# Tier2 Cambridge preview words to ADD to vocab_tiers (dict format like W28 transport words)
# Only for weeks with < 14 items
VOCAB_TIER2_EXTRA = {
    29: [],  # already has 10 good items, just needs grammar table
    30: [],  # 10 detailed items, just needs grammar table
    31: [
        {"Word": "path", "Vietnamese": "con đường mòn", "Key Collocation(s)": "walk along the path", "Memory Trick": "P-A-T-H: People Always Travel Here"},
        {"Word": "shadow", "Vietnamese": "bóng tối / cái bóng", "Key Collocation(s)": "see a shadow", "Memory Trick": "SHADOW: Something Has A Dark Outline Waiting"},
        {"Word": "breeze", "Vietnamese": "làn gió nhẹ", "Key Collocation(s)": "felt a cool breeze", "Memory Trick": "B-R-E-E-Z-E: Breezes Refresh Everyone Everyday Zapping Energy"},
        {"Word": "branch", "Vietnamese": "cành cây", "Key Collocation(s)": "sat on a branch", "Memory Trick": "B-R-A-N-C-H: Birds Rest And Nestle Cozily Here"},
        {"Word": "nature", "Vietnamese": "thiên nhiên", "Key Collocation(s)": "walked in nature", "Memory Trick": "NATURE: Nice And Thrilling, Untamed, Relaxing, Exciting"},
        {"Word": "rustling", "Vietnamese": "tiếng xào xạc", "Key Collocation(s)": "heard a rustling sound", "Memory Trick": "Rustling = the sound dry leaves make when wind moves them"},
    ],
    32: [],  # 10 detailed items
    33: [],  # 10 detailed items
    34: [
        {"Word": "fable", "Vietnamese": "truyện ngụ ngôn", "Key Collocation(s)": "read a fable", "Memory Trick": "F-A-B-L-E: Famous Animals Bring Life's Experiences"},
        {"Word": "hunter", "Vietnamese": "thợ săn", "Key Collocation(s)": "a hunter set a trap", "Memory Trick": "HUNTER: Has Unique Net To Ensnare Rodents"},
        {"Word": "strength", "Vietnamese": "sức mạnh", "Key Collocation(s)": "used his strength", "Memory Trick": "STRENGTH: Strong Results Everywhere — Never Take Help"},
    ],
    35: [
        {"Word": "kite", "Vietnamese": "cái diều", "Key Collocation(s)": "flew a kite", "Memory Trick": "K-I-T-E: Kids In The Elements (fly kites outside!)"},
        {"Word": "coral", "Vietnamese": "san hô", "Key Collocation(s)": "saw colourful coral", "Memory Trick": "CORAL: Colourful Ocean Reef Alive Life"},
        {"Word": "shell", "Vietnamese": "vỏ sò / mai", "Key Collocation(s)": "found a shell on the beach", "Memory Trick": "SHELL: Small Houses Every Littoral Life"},
        {"Word": "float", "Vietnamese": "nổi trên mặt nước", "Key Collocation(s)": "watched it float", "Memory Trick": "FLOAT: Finds Level On A Tide"},
        {"Word": "sycamore", "Vietnamese": "cây sung / loài cây có hạt bay", "Key Collocation(s)": "saw a sycamore seed spin", "Memory Trick": "Seeds spin like tiny helicopters — think FLY!"},
    ],
    36: [
        {"Word": "narrator", "Vietnamese": "người kể chuyện", "Key Collocation(s)": "The narrator told the story", "Memory Trick": "NAR-RA-TOR: One who NARRATes"},
        {"Word": "audience", "Vietnamese": "khán giả / người nghe", "Key Collocation(s)": "spoke to the audience", "Memory Trick": "AUDIENCE: The people AUDIting = listening"},
        {"Word": "sequence", "Vietnamese": "thứ tự / trình tự", "Key Collocation(s)": "used sequence words", "Memory Trick": "SEQUENCE: SEQuence = in order like 1, 2, 3"},
        {"Word": "chapter", "Vietnamese": "chương sách", "Key Collocation(s)": "read the first chapter", "Memory Trick": "CHAPTER: Each section in a story"},
        {"Word": "clue", "Vietnamese": "manh mối / gợi ý", "Key Collocation(s)": "found a clue", "Memory Trick": "C-L-U-E: Clever Little Useful Evidence"},
    ],
}


# ─────────────────────────────────────────────────────────────────────────────
# 2. PART 6 STEM/CLIL EXPANDED CONTENT
# ─────────────────────────────────────────────────────────────────────────────
# Format: {week: {session: [lines]}}
PART6 = {
    29: {
        1: [
            "Transportation and Speed",
            "In science, we measure speed in km/h. Here is real data about how things move:",
            "• Airplane: ~800 km/h  • Car: ~100 km/h  • Bicycle: ~20 km/h  • Person walking: ~5 km/h  • Bird flying: ~50 km/h",
            "1. Which is faster: an airplane or a car? (Airplane = 800 km/h, Car = 100 km/h)",
            "→ ____________________________________________________________",
            "2. How many times faster is a car than a person walking?",
            "→ 100 ÷ 5 = ____________________ times faster.",
            "3. True or False: A bicycle is faster than a bird flying. (Bicycle = 20, Bird = 50)",
            "→ ____________ Because: ____________________________________________",
            "4. Max flew in an airplane at 800 km/h. His friend drove a car at 100 km/h. How much faster was Max?",
            "→ 800 – 100 = ____________________ km/h faster.",
            "Challenge: Design your dream vehicle! How fast would it go? Write 1 sentence using 'flew' or 'ran'.",
            "____________________________________________________________",
            "5. Which transport would YOU choose for a trip to a mountain? Give one reason.",
            "→ ____________________________________________________________",
            "[ Sub-total: ___ / 5 ]",
        ],
        2: [
            "Geography and Elevation",
            "In geography, we measure how high places are above sea level:",
            "• Beach: ~0 m  • Hill: ~100–500 m  • Mountain: ~1,000–4,000 m  • Airplane: ~10,000 m",
            "1. True or False: A mountain is higher than a hill. (Mountain = 1,000–4,000 m, Hill = 100–500 m)",
            "→ ____________ Because: ____________________________________________",
            "2. How much higher is an airplane than a mountain? (Airplane = 10,000 m, Mountain = 4,000 m)",
            "→ 10,000 – 4,000 = ____________________ metres higher.",
            "3. Luna went to a mountain 2,000 m high. Max flew in a plane at 10,000 m. Who went higher?",
            "→ ____________________________________________________________",
            "4. If you go higher up a mountain, the air gets: (a) warmer  (b) colder  (c) the same",
            "→ ____________ Because: ____________________________________________",
            "Challenge: Would you rather go to the beach or climb a mountain? Write 1 sentence using 'went'.",
            "____________________________________________________________",
            "5. Write the word for: a very high landform with snow at the top. → ________________",
            "[ Sub-total: ___ / 5 ]",
        ],
        3: [
            "Animal Locomotion — How Animals Move",
            "In science, we study how animals move. Different animals have different ways of moving:",
            "• Birds: fly with wings  • Fish: swim with fins  • Rabbits: run and hop on legs  • Snakes: slither on the ground",
            "1. Match the animal with how it moves:",
            "   eagle → ________________  fish → ________________  rabbit → ________________  snake → ________________",
            "2. Which animal FLEW? Write a past tense sentence: The eagle _________________________.",
            "3. Which animal RAN? Write a past tense sentence: The rabbit _______________________.",
            "4. True or False: A fish can fly like a bird.",
            "→ ____________ Because: ____________________________________________",
            "Challenge: Think of an animal. Write how it moved yesterday using a past tense verb.",
            "____________________________________________________________",
            "5. Which animal do YOU think is the fastest? Write 1 sentence giving your reason.",
            "→ ____________________________________________________________",
            "[ Sub-total: ___ / 5 ]",
        ],
    },
    30: {
        1: [
            "Science: Food Gives Us Energy",
            "Our bodies are like machines — we need energy to move, run, and learn. We get energy from food!",
            "• Carbohydrates (bread, rice): fast energy  • Protein (eggs, meat): build muscles  • Vitamins (fruit, veg): keep us healthy",
            "1. Which food group gives us FAST energy? (a) protein  (b) carbohydrates  (c) vitamins",
            "→ ____________ Because: ____________________________________________",
            "2. True or False: A sandwich gives us energy to run and play.",
            "→ ____________ Because: ____________________________________________",
            "3. If you ate a big sandwich, what could you do with all that energy?",
            "→ ____________________________________________________________",
            "4. Write 1 sentence using 'ate': I ate __________________ because __________________.",
            "5. Write 1 sentence using 'drank': I drank __________________ because __________________.",
            "Challenge: Design a healthy picnic. Name 3 foods and explain which energy group each belongs to.",
            "____________________________________________________________",
            "[ Sub-total: ___ / 5 ]",
        ],
        2: [
            "Science: Why We Get Thirsty",
            "Our bodies are mostly made of water (~60%). When we run and play, we sweat — water leaves our body!",
            "• Running 30 min → lose ~500 ml water  • A child needs ~1.5 litres of water per day  • Juice + water count!",
            "1. If you run for 30 min and lose 500 ml, and you drank 1 glass (250 ml), how much more do you need?",
            "→ 500 – 250 = ____________________ ml more to drink.",
            "2. True or False: Drinking juice helps replace lost water in our body.",
            "→ ____________ Because: ____________________________________________",
            "3. Why did Luna feel thirsty after the picnic? Write 1 sentence using 'because'.",
            "→ ____________________________________________________________",
            "4. Write 1 sentence using 'drank': After running, I drank __________________.",
            "5. Which drink is healthiest: (a) fizzy soda  (b) water  (c) milkshake? Give 1 reason.",
            "→ ____________________________________________________________",
            "Challenge: How would you explain to a 5-year-old why we need to drink water every day?",
            "____________________________________________________________",
            "[ Sub-total: ___ / 5 ]",
        ],
        3: [
            "Health: A Balanced Diet",
            "A balanced diet means eating a variety of foods from all food groups every day.",
            "• Group 1: Grains (rice, bread, pasta) — energy  • Group 2: Protein (eggs, meat, fish) — growth",
            "• Group 3: Fruit & Vegetables — vitamins  • Group 4: Dairy (milk, cheese) — strong bones",
            "1. Which food group helps bones grow strong? (a) grains  (b) dairy  (c) fruit",
            "→ ____________ Because: ____________________________________________",
            "2. True or False: Eating only sandwiches every day is a balanced diet.",
            "→ ____________ Because: ____________________________________________",
            "3. At the picnic, Tom ate a sandwich, drank juice, and had fresh fruit. Did he eat a balanced meal?",
            "→ ____________ Because: ____________________________________________",
            "4. Write 1 sentence using 'ate': For a balanced meal, I ate __________________.",
            "Challenge: Plan a perfect picnic with 4 food items — one from each food group.",
            "____________________________________________________________",
            "5. Which food do you think is the MOST important? Write 1 sentence giving your reason.",
            "→ ____________________________________________________________",
            "[ Sub-total: ___ / 5 ]",
        ],
    },
    31: {
        1: [
            "Science: Our Five Senses",
            "We use our five senses to explore the world. Each sense uses a different body part:",
            "• SEE (eyes)  • HEAR (ears)  • FEEL/TOUCH (skin)  • SMELL (nose)  • TASTE (tongue)",
            "1. Match the sense to the body part:",
            "   saw → ________________  heard → ________________  felt → ________________  smelt → ________________",
            "2. True or False: You use your ears to see a bird in a tree.",
            "→ ____________ Because: ____________________________________________",
            "3. In the forest, Luna HEARD a bird and FELT the wind. Name 2 senses she used.",
            "→ ____________________________________________________________",
            "4. Write 1 sentence using 'saw': In the forest, I saw __________________.",
            "5. Write 1 sentence using 'heard': I heard __________________ in the forest.",
            "Challenge: Close your eyes for 30 seconds. Write 2 things you could HEAR or SMELL or FEEL.",
            "____________________________________________________________",
            "[ Sub-total: ___ / 5 ]",
        ],
        2: [
            "Science: Being a Good Observer",
            "Scientists observe the world carefully — they use ALL their senses to collect information!",
            "• Observe = look and listen and feel carefully  • Evidence = what you notice  • Record = write it down",
            "1. A scientist in the forest noticed: 'The leaves were wet.' Which senses could she use?",
            "→ ____________________________________________________________",
            "2. True or False: A good scientist only uses their eyes to observe.",
            "→ ____________ Because: ____________________________________________",
            "3. Luna heard a rustling sound in the bushes. What should a scientist do next?",
            "→ (a) Run away  (b) Observe more carefully  (c) Ignore it",
            "→ ____________ Because: ____________________________________________",
            "4. Write 1 sentence using 'heard': I heard __________________ and decided to __________________.",
            "5. Write 1 sentence using 'smelt': I smelt __________________ because __________________.",
            "Challenge: Imagine you are a nature scientist. Write 3 things you observed using different senses.",
            "____________________________________________________________",
            "[ Sub-total: ___ / 5 ]",
        ],
        3: [
            "Science: Animal Super Senses",
            "Some animals have senses much stronger than ours! Here is real science data:",
            "• Dog: hears sounds up to 65,000 Hz (human: 20,000 Hz)  • Owl: sees in near total darkness",
            "• Shark: smells blood from 1 km away  • Bat: hears its own echo to find food",
            "1. Which animal has the strongest sense of HEARING? (a) dog  (b) owl  (c) bat",
            "→ ____________ Because: ____________________________________________",
            "2. True or False: An owl uses its nose to hunt at night.",
            "→ ____________ Because: ____________________________________________",
            "3. A bat HEARD its own echo. Which past tense verb describes this?",
            "→ ____________________________________________________________",
            "4. Write 1 sentence using 'felt': The animal felt __________________ in the dark.",
            "5. Write 1 sentence using 'smelt': The wolf smelt __________________ from far away.",
            "Challenge: If you could have one animal's super sense, which would you choose? Write 1 reason.",
            "____________________________________________________________",
            "[ Sub-total: ___ / 5 ]",
        ],
    },
    32: {
        1: [
            "Health: Why We Need a Daily Routine",
            "A routine is doing the same helpful things every day. Science shows that routines help our brain and body!",
            "• Morning routine: wash face, eat breakfast, brush teeth — takes ~20 min",
            "• After school: tidy room, do homework, clean up — takes ~30 min",
            "1. Which morning task is most important for health? (a) brush teeth  (b) watch TV  (c) eat sweets",
            "→ ____________ Because: ____________________________________________",
            "2. True or False: Having a routine is bad for children.",
            "→ ____________ Because: ____________________________________________",
            "3. Luna did 3 chores in 30 minutes. Max did 2 chores in 30 minutes. Who did more work?",
            "→ ____________ Because: ____________________________________________",
            "4. Write 1 sentence using 'did': I did __________________ to help at home.",
            "5. Write 1 sentence using 'took': I took __________________ to stay healthy.",
            "Challenge: Write YOUR perfect morning routine in 3 steps. Use First, Then, Finally.",
            "____________________________________________________________",
            "[ Sub-total: ___ / 5 ]",
        ],
        2: [
            "Social Studies: Teamwork and Chores",
            "When a family works together, chores get done faster and the home is happier!",
            "• 1 person cleans: 60 min  • 2 people clean together: 30 min  • 4 people: ~15 min",
            "1. If 4 people clean together instead of 1, how many minutes do they save?",
            "→ 60 – 15 = ____________________ minutes saved.",
            "2. True or False: It is faster to do all chores alone.",
            "→ ____________ Because: ____________________________________________",
            "3. In Max's house, he made the bed and Luna swept the floor. How did they work together?",
            "→ ____________________________________________________________",
            "4. Write 1 sentence using 'made': I made __________________ to help my family.",
            "5. Write 1 sentence using 'did': We did __________________ together.",
            "Challenge: What chore do you do at home? Write 2 sentences about it using past tense verbs.",
            "____________________________________________________________",
            "[ Sub-total: ___ / 5 ]",
        ],
        3: [
            "Science: How a Camera Captures Light",
            "When we take a photo, we capture light! A camera works like your eyes — both use a lens to focus light.",
            "• Lens → focuses light  • Shutter → lets light in for a tiny moment  • Sensor → records the image",
            "1. What part of a camera works like the pupil in your eye? (a) lens  (b) flash  (c) case)",
            "→ ____________ Because: ____________________________________________",
            "2. True or False: A camera and the human eye both use a lens.",
            "→ ____________ Because: ____________________________________________",
            "3. Luna took a photo of a tree. What happened inside the camera?",
            "→ ____________________________________________________________",
            "4. Write 1 sentence using 'took': I took __________________ to remember my day.",
            "5. Write 1 sentence using 'made': The camera made __________________ when I pressed the button.",
            "Challenge: In what ways is a camera DIFFERENT from the human eye? Write 1 sentence.",
            "____________________________________________________________",
            "[ Sub-total: ___ / 5 ]",
        ],
    },
    33: {
        1: [
            "Science: Gravity and Falling",
            "Gravity is the invisible force that pulls all objects DOWN towards the Earth. It never stops!",
            "• Isaac Newton saw an apple FALL from a tree and discovered gravity (~1666)",
            "• Gravity pulls all objects at the same speed: 9.8 m/s² (when there is no air resistance)",
            "1. Why do things fall to the ground and not float into the sky?",
            "→ ____________________________________________________________",
            "2. True or False: A heavy book and a light pen fall at different speeds in space (no air).",
            "→ ____________ Because: ____________________________________________",
            "3. Tom dropped a ball. It fell to the ground. Which force caused this?",
            "→ ____________________________________________________________",
            "4. Write 1 sentence using 'fell': The apple fell __________________ because of gravity.",
            "5. Write 1 sentence using 'broke': The plate broke __________________ when it hit the ground.",
            "Challenge: What would the world be like without gravity? Write 1 fun sentence.",
            "____________________________________________________________",
            "[ Sub-total: ___ / 5 ]",
        ],
        2: [
            "Science: Materials and Why Some Things Break",
            "Different materials have different properties — some are hard, some are soft, some are fragile:",
            "• Glass: hard but FRAGILE (breaks easily)  • Plastic: hard but FLEXIBLE (doesn't break easily)",
            "• Wood: strong but can split  • Rubber: stretchy and bouncy",
            "1. Which material is most likely to BREAK if you drop it? (a) rubber ball  (b) glass cup  (c) plastic bottle",
            "→ ____________ Because: ____________________________________________",
            "2. True or False: Plastic is more fragile than glass.",
            "→ ____________ Because: ____________________________________________",
            "3. Why are children's drinking cups made of plastic, not glass?",
            "→ ____________________________________________________________",
            "4. Write 1 sentence using 'broke': The glass __________________ when it fell.",
            "5. Write 1 sentence using 'lost': I lost __________________ because __________________.",
            "Challenge: What is something in your home made of glass? Why was glass chosen for that object?",
            "____________________________________________________________",
            "[ Sub-total: ___ / 5 ]",
        ],
        3: [
            "Health & Safety: Preventing Accidents",
            "Accidents happen — but we can PREVENT many of them by being careful!",
            "• Wet floor → walk slowly  • Heavy items → bend your knees when lifting  • Sharp objects → handle carefully",
            "1. Tom RAN on a wet floor and FELL. Which safety rule did he break?",
            "→ ____________________________________________________________",
            "2. True or False: Running indoors is always safe.",
            "→ ____________ Because: ____________________________________________",
            "3. Name 2 things that could cause someone to LOSE their balance and FALL.",
            "→ ____________________________________________________________",
            "4. Write 1 sentence using 'found': I found __________________ on the floor — it was dangerous!",
            "5. Write 1 sentence using 'broke': I broke __________________ because I was not careful.",
            "Challenge: Write 1 safety rule for your home kitchen. Use a present tense sentence.",
            "____________________________________________________________",
            "[ Sub-total: ___ / 5 ]",
        ],
    },
    34: {
        1: [
            "Science: Big Animals and Small Animals",
            "In nature, animals come in all sizes — and each size has advantages!",
            "• Lion: weighs ~180 kg, can run ~80 km/h, a top predator  • Mouse: weighs ~20 g, can fit in tiny spaces, hides easily",
            "1. Which animal is heavier: a lion (180 kg) or a mouse (20 g)?",
            "→ ____________ How many times heavier? 180 kg × 1000 ÷ 20 = ____________________ times",
            "2. True or False: Being small is always a disadvantage in the wild.",
            "→ ____________ Because: ____________________________________________",
            "3. The mouse ran through a tiny hole to escape the lion. What advantage does being small give?",
            "→ ____________________________________________________________",
            "4. Write 1 sentence about the lion using 'ran': The lion ran __________________ towards the mouse.",
            "5. Write 1 sentence using 'found': The mouse found __________________ to help the lion.",
            "Challenge: If you were a small animal, what ONE special ability would help you survive? Write 1 sentence.",
            "____________________________________________________________",
            "[ Sub-total: ___ / 5 ]",
        ],
        2: [
            "Science: How Nets Work (Forces)",
            "A net is a tool that traps objects using interconnected ropes. When it is pulled tight, it holds very strong!",
            "• A fishing net can hold hundreds of fish at once  • A safety net can stop a falling person  • Rope strength: 1 rope = not very strong, but many ropes = very strong",
            "1. Why does a net get stronger when you have more ropes?",
            "→ ____________________________________________________________",
            "2. True or False: The lion could escape the net easily by biting one rope.",
            "→ ____________ Because: ____________________________________________",
            "3. The mouse GNAWED through the ropes one by one. Which irregular past tense verb fits the mouse's biting? (gnaw → gnawed) Write the sentence.",
            "→ ____________________________________________________________",
            "4. Write 1 sentence using 'caught': The hunters caught __________________ in their net.",
            "5. Write 1 sentence using 'ran': The lion ran __________________ when he was free.",
            "Challenge: Can you think of a time when a SMALL action (like cutting one rope) changed everything? Write 1 sentence.",
            "____________________________________________________________",
            "[ Sub-total: ___ / 5 ]",
        ],
        3: [
            "Science: Symbiosis — When Animals Help Each Other",
            "Symbiosis means two different animals living together and BOTH benefiting. It is a win-win relationship!",
            "• Crocodile + bird (plover): bird eats food from croc teeth → croc gets clean teeth, bird gets food",
            "• Clownfish + sea anemone: fish hides in anemone → anemone gets protection, fish gets shelter",
            "1. In the lion and mouse story, who helped who? Was it symbiosis?",
            "→ ____________________________________________________________",
            "2. True or False: In symbiosis, only ONE animal benefits.",
            "→ ____________ Because: ____________________________________________",
            "3. The crocodile said: 'I won't eat you.' The bird said: 'I'll clean your teeth.' This is an example of?",
            "→ ____________________________________________________________",
            "4. Write 1 sentence using 'said': The lion said __________________ to the mouse.",
            "5. Write 1 sentence using 'won': In the end, __________________ won because __________________.",
            "Challenge: Can you think of a real-life example of HUMAN symbiosis (people helping each other)? Write 1 sentence.",
            "____________________________________________________________",
            "[ Sub-total: ___ / 5 ]",
        ],
    },
    35: {
        1: [
            "Science: Ocean Animals and Coral Reefs",
            "The ocean is full of amazing animals! Coral reefs are home to thousands of species.",
            "• Crab: hard shell for protection, 8 legs for walking  • Starfish: can regenerate lost arms!  • Coral: actually an animal, not a plant!",
            "1. What body part helps a crab survive dangerous predators?",
            "→ ____________________________________________________________",
            "2. True or False: A coral reef is made up of plants.",
            "→ ____________ Because: ____________________________________________",
            "3. Max WENT to the beach and SAW a crab. Write a past tense sentence about this:",
            "→ ____________________________________________________________",
            "4. If a starfish loses one arm, what can it do? (a) die  (b) grow a new arm  (c) swim away fast",
            "→ ____________ Because: ____________________________________________",
            "Challenge: Which ocean animal would you most like to see? Write 1 sentence using 'saw'.",
            "____________________________________________________________",
            "5. Write 1 sentence using 'felt': I felt __________________ when I saw the ocean.",
            "[ Sub-total: ___ / 5 ]",
        ],
        2: [
            "Science: Zoo Animals and Their Adaptations",
            "Animals at the zoo are adapted (specially designed by nature) for their home habitat!",
            "• Giraffe: 1.8 m neck → reaches leaves high in trees  • Penguin: waterproof feathers → swims in icy water  • Elephant: big ears → fans itself to stay cool",
            "1. Why does a giraffe have such a long neck?",
            "→ ____________________________________________________________",
            "2. True or False: A penguin's feathers get wet and heavy in water.",
            "→ ____________ Because: ____________________________________________",
            "3. Max WENT to the zoo and SAW a giraffe eating leaves. Write a complete past tense sentence:",
            "→ ____________________________________________________________",
            "4. Which animal FEELS the hottest in summer? (a) giraffe  (b) elephant  (c) penguin  Why?",
            "→ ____________________________________________________________",
            "Challenge: If you could GIVE one adaptation to a human, which would you choose? Write 1 sentence using 'gave'.",
            "____________________________________________________________",
            "5. Write 1 sentence using 'made': The zookeeper made __________________ for the animals.",
            "[ Sub-total: ___ / 5 ]",
        ],
        3: [
            "Science: Why Things Float and Sink",
            "Objects float when they are LESS DENSE than water. They sink when they are MORE DENSE than water!",
            "• Density = how much 'stuff' is packed into a space  • Cork floats  • Iron sinks",
            "• A steel ship FLOATS because it is shaped to trap air — air is very light!",
            "1. A paper boat FLOATS. A metal coin SINKS. What is the difference?",
            "→ ____________________________________________________________",
            "2. True or False: A heavy steel ship sinks because steel is heavy.",
            "→ ____________ Because: ____________________________________________",
            "3. Max MADE a paper boat at the park. He WATCHED it FLOAT. Write a complete past tense sentence:",
            "→ ____________________________________________________________",
            "4. Which would float? (a) a large rock  (b) an empty plastic bottle  (c) a coin  Why?",
            "→ ____________________________________________________________",
            "Challenge: Write 1 sentence using 'felt' to describe how Max felt when his kite flew up.",
            "____________________________________________________________",
            "5. Write 1 sentence using 'gave': Max gave __________________ to his dad.",
            "[ Sub-total: ___ / 5 ]",
        ],
    },
    36: {
        1: [
            "Art & Literacy: Parts of a Book",
            "A storybook has special parts. Each part has a job! Here is what a book looks like:",
            "• Cover: title + author + illustration  • Title page: inside first page  • Chapters: sections of the story  • Last page: the ending",
            "1. What does the COVER of a book tell you? Name 2 things.",
            "→ ____________________________________________________________",
            "2. True or False: Every book has the author's name on the cover.",
            "→ ____________ Because: ____________________________________________",
            "3. Max WENT to the library. He FOUND a book about a forest adventure. Write a complete sentence:",
            "→ ____________________________________________________________",
            "4. Which part of a book tells you the MAIN IDEA before you read? (a) last page  (b) cover  (c) middle chapter)",
            "→ ____________ Because: ____________________________________________",
            "Challenge: Design YOUR book cover! Write: Title: __________ | Author: __________ | What the picture shows: __________",
            "____________________________________________________________",
            "5. Write 1 sentence using 'went': Last week, I went __________________ and found __________________.",
            "[ Sub-total: ___ / 5 ]",
        ],
        2: [
            "Art: How Illustrators Show Emotions",
            "In a storybook, the PICTURES tell half the story! Illustrators draw faces, colours, and body language to show feelings.",
            "• Happy: big smile, bright colours  • Sad: frown, drooping shoulders, grey/blue colours  • Scared: wide eyes, pale colour  • Excited: arms up, yellow/orange",
            "1. The illustrator draws Max with big eyes and a pale face. What emotion is Max feeling?",
            "→ ____________________________________________________________",
            "2. True or False: Illustrators can use colours to show emotions without drawing a face.",
            "→ ____________ Because: ____________________________________________",
            "3. Max FELT nervous at first, then FELT proud. How would the illustrator draw these two emotions differently?",
            "→ ____________________________________________________________",
            "4. Write 1 sentence using 'felt': Max felt __________________ when he saw the forest.",
            "5. Write 1 sentence using 'saw': The audience saw __________________ and clapped.",
            "Challenge: Draw or describe the illustration for the most exciting moment of Max's story.",
            "____________________________________________________________",
            "[ Sub-total: ___ / 5 ]",
        ],
        3: [
            "Communication: Presentation Skills",
            "When you present your story, you are a NARRATOR — the person who tells the story! Good presenters use these skills:",
            "• Stand tall  • Speak clearly and at the right speed  • Make eye contact with the audience  • Use sequence words: First, Then, Finally",
            "1. Name 3 things a good presenter does. (Use the box above.)",
            "→ ____________________________________________________________",
            "2. True or False: A good presenter reads from a paper and never looks up.",
            "→ ____________ Because: ____________________________________________",
            "3. Max STOOD at the front. He WENT through his story using sequence words. Write a sentence about him presenting:",
            "→ ____________________________________________________________",
            "4. Which sequence word comes LAST? (a) First  (b) Then  (c) Finally",
            "→ ____________ Write a sentence using it: ____________________________________________________________",
            "Challenge: Write your opening sentence for presenting Max's story to the class. Use 'First' and a past tense verb.",
            "____________________________________________________________",
            "5. Write 1 sentence using 'went': I went to the front and __________________.",
            "[ Sub-total: ___ / 5 ]",
        ],
    },
}


# ─────────────────────────────────────────────────────────────────────────────
# 3. PART 8 PORTFOLIO EXPANDED CONTENT
# ─────────────────────────────────────────────────────────────────────────────
PART8 = {
    29: {
        1: [
            "📝 Week 29 — Session 1 | Topic: The Magic Trip",
            "Today's goal: Write 3 sentences about a trip using irregular past tense verbs.",
            "Story Starter: Last weekend, Max and his friends _____________________________ (went / came / ran / flew).",
            "My sentence 1 (went): ___________________________________________________________________________",
            "My sentence 2 (flew): ___________________________________________________________________________",
            "My sentence 3 (came or ran): ____________________________________________________________________",
            "Extension: Rewrite sentence 2 as a NEGATIVE: Max didn't ____________ because ____________________.",
            "____________________________________________________________",
            "☐ Did I use 'went', 'flew', or 'came'?  ☐ Capital letter at start?  ☐ Full stop at end?",
            "☐ Did I add a 'because' or 'and' to make my sentence interesting?",
            "[ Sub-total: ___ / 5 ]",
        ],
        2: [
            "📝 Week 29 — Session 2 | Topic: The Mountain Trip",
            "Today's goal: Write 3 sentences about climbing a mountain using past tense verbs.",
            "Story Starter: Luna went to a tall mountain. First, she _________________________ (ran / came / went).",
            "My sentence 1 (went): ___________________________________________________________________________",
            "My sentence 2 (ran): ____________________________________________________________________________",
            "My sentence 3 (came): ___________________________________________________________________________",
            "Extension: Write 1 sentence about what Luna SAW on the mountain.",
            "____________________________________________________________",
            "☐ Did I use 'went', 'ran', or 'came'?  ☐ Capital letter at start?  ☐ Full stop at end?",
            "☐ Did I include a describing word (e.g. tall, cold, beautiful)?",
            "[ Sub-total: ___ / 5 ]",
        ],
        3: [
            "📝 Week 29 — Session 3 | Topic: Animal Movements",
            "Today's goal: Write a 4-sentence paragraph about how animals moved. Use First, Then, Finally.",
            "Story Starter: In the forest, many animals were busy. _________________________ the bird ___________________________.",
            "Sentence 1 (First): _____________________________________________________________________________",
            "Sentence 2 (Then): ______________________________________________________________________________",
            "Sentence 3 (Next / After that): _________________________________________________________________",
            "Sentence 4 (Finally): ___________________________________________________________________________",
            "Extension: Circle all the irregular past tense verbs in your paragraph.",
            "☐ Did I use First, Then, Finally?  ☐ Did I use at least 2 past tense verbs (flew, ran, came)?",
            "☐ Capital letter at start?  ☐ Full stop at end?  ☐ Did I describe the animals?",
            "[ Sub-total: ___ / 6 ]",
        ],
    },
    30: {
        1: [
            "📝 Week 30 — Session 1 | Topic: A Great Picnic (Beginning)",
            "Today's goal: Write 3 sentences about the BEGINNING of a picnic story.",
            "Story Starter: One sunny day, we went on a picnic. First, I _________________________ (ate / drank / had).",
            "My sentence 1 (ate): ____________________________________________________________________________",
            "My sentence 2 (drank): __________________________________________________________________________",
            "My sentence 3 (had): ____________________________________________________________________________",
            "Extension: Add 1 describing word to each sentence (e.g. delicious, cold, fresh).",
            "____________________________________________________________",
            "☐ Did I use 'ate', 'drank', or 'had'?  ☐ Capital letter?  ☐ Full stop?",
            "☐ Did I say WHERE the picnic was?  ☐ Sub-total:",
            "[ Sub-total: ___ / 5 ]",
        ],
        2: [
            "📝 Week 30 — Session 2 | Topic: A Great Picnic (Middle)",
            "Today's goal: Write the MIDDLE of the picnic story — something exciting happened!",
            "Story Starter: Suddenly, something went wrong at the picnic! _________________________ because _________________________.",
            "My sentence 1: __________________________________________________________________________________",
            "My sentence 2: __________________________________________________________________________________",
            "My sentence 3: __________________________________________________________________________________",
            "Extension: Write 1 sentence explaining how the problem was solved.",
            "____________________________________________________________",
            "☐ Did I use at least 2 past tense verbs (ate / drank / had)?  ☐ Is there a problem in my story?",
            "☐ Capital letter?  ☐ Full stop?  ☐ Did I use 'because' to explain?",
            "[ Sub-total: ___ / 5 ]",
        ],
        3: [
            "📝 Week 30 — Session 3 | Topic: A Great Picnic (Full Story)",
            "Today's goal: Combine Sentences 1–6 into a complete Beginning-Middle-End story.",
            "Write your full paragraph here (Beginning, Middle, End):",
            "____________________________________________________________",
            "____________________________________________________________",
            "____________________________________________________________",
            "____________________________________________________________",
            "Checklist: ☐ Did I use 'ate', 'drank', AND 'had'?  ☐ Did I use First, Then, Finally?",
            "☐ Did I write a Beginning (set-up), Middle (problem), and End (solution)?",
            "☐ Capital letter at start?  ☐ Full stop at end?",
            "[ Sub-total: ___ / 8 ]",
        ],
    },
    31: {
        1: [
            "📝 Week 31 — Session 1 | Topic: Senses in the Forest",
            "Today's goal: Write 3 sentences about what you sensed in a forest.",
            "Story Starter: I walked into the dark forest. First, I _________________________ (saw / heard / felt / smelt).",
            "Sentence 1 (saw): ______________________________________________________________________________",
            "Sentence 2 (heard): _____________________________________________________________________________",
            "Sentence 3 (felt): _______________________________________________________________________________",
            "Extension: Write 1 bonus sentence using 'smelt': I smelt __________________ because __________________.",
            "____________________________________________________________",
            "☐ Did I use 'saw', 'heard', or 'felt'?  ☐ Capital letter?  ☐ Full stop?",
            "☐ Did I include a describing word (e.g. loud, soft, dark)?",
            "[ Sub-total: ___ / 5 ]",
        ],
        2: [
            "📝 Week 31 — Session 2 | Topic: A Walk in Nature",
            "Today's goal: Write 3 sentences describing a nature walk using senses + sequence words.",
            "Story Starter: Last afternoon, I went for a walk in the park. First I _________________________ (saw / heard / felt).",
            "Sentence 1 (First): _____________________________________________________________________________",
            "Sentence 2 (Then): ______________________________________________________________________________",
            "Sentence 3 (Finally): ___________________________________________________________________________",
            "Extension: Write 1 sentence using a describing adjective (e.g. 'I felt a cool breeze' or 'I heard a loud bird').",
            "____________________________________________________________",
            "☐ Did I use 2+ sense verbs (saw/heard/felt/smelt)?  ☐ Did I use sequence words?",
            "☐ Capital letter?  ☐ Full stop?  ☐ Did I describe WHAT I sensed?",
            "[ Sub-total: ___ / 5 ]",
        ],
        3: [
            "📝 Week 31 — Session 3 | Topic: A Sensory Adventure Story",
            "Today's goal: Write a 5-sentence adventure story using senses and sequence words.",
            "Story Starter: Yesterday, Luna went into the deep forest alone. It was very quiet.",
            "Sentence 1 (First + saw): _______________________________________________________________________",
            "Sentence 2 (Then + heard): ______________________________________________________________________",
            "Sentence 3 (Next + felt): ________________________________________________________________________",
            "Sentence 4 (After that + smelt): _________________________________________________________________",
            "Sentence 5 (Finally + came or ran): _____________________________________________________________",
            "Extension: Circle ALL irregular past tense verbs in your story.",
            "☐ Did I use all 4 sense verbs (saw/heard/felt/smelt)?  ☐ Did I use First/Then/Finally?",
            "☐ Is my story exciting? Did something happen?  ☐ Capital letter?  ☐ Full stop?",
            "[ Sub-total: ___ / 8 ]",
        ],
    },
    32: {
        1: [
            "📝 Week 32 — Session 1 | Topic: A Busy Day (Beginning)",
            "Today's goal: Write 3 sentences about the BEGINNING of a busy day story.",
            "Story Starter: One morning, I woke up early. First, I _________________________ (did / made / had / took).",
            "Sentence 1 (did): ______________________________________________________________________________",
            "Sentence 2 (made): _____________________________________________________________________________",
            "Sentence 3 (had): _______________________________________________________________________________",
            "Extension: Add 1 detail to tell WHY you did each thing (use 'because').",
            "____________________________________________________________",
            "☐ Did I use 'did', 'made', or 'had'?  ☐ Capital letter?  ☐ Full stop?",
            "☐ Did I say WHAT time of day it was?",
            "[ Sub-total: ___ / 5 ]",
        ],
        2: [
            "📝 Week 32 — Session 2 | Topic: A Busy Day (Middle)",
            "Today's goal: Write the MIDDLE part — something went wrong and teamwork helped!",
            "Story Starter: In the afternoon, there was a big mess! We _________________________ (did / made / took / had).",
            "Sentence 1: ___________________________________________________________________________________",
            "Sentence 2: ___________________________________________________________________________________",
            "Sentence 3 (teamwork): _________________________________________________________________________",
            "Extension: Write 1 sentence about how you FELT when the chores were done.",
            "____________________________________________________________",
            "☐ Did I use at least 2 past tense verbs?  ☐ Did I show teamwork?",
            "☐ Capital letter?  ☐ Full stop?  ☐ Did I use 'because' or 'so'?",
            "[ Sub-total: ___ / 5 ]",
        ],
        3: [
            "📝 Week 32 — Session 3 | Topic: A Busy Day (Full Story)",
            "Today's goal: Write your complete Beginning-Middle-End story about a busy day.",
            "Write your full paragraph here:",
            "____________________________________________________________",
            "____________________________________________________________",
            "____________________________________________________________",
            "____________________________________________________________",
            "Checklist: ☐ Used 'did', 'made', AND 'took'?  ☐ Used sequence words (First, Then, Finally)?",
            "☐ Beginning (set-up), Middle (problem/teamwork), End (result)?",
            "☐ Capital letter?  ☐ Full stop?  ☐ At least 4 sentences?",
            "[ Sub-total: ___ / 8 ]",
        ],
    },
    33: {
        1: [
            "📝 Week 33 — Session 1 | Topic: A Clumsy Day (Beginning)",
            "Today's goal: Write 3 sentences about the BEGINNING of an accident story.",
            "Story Starter: One morning, I had a very clumsy day. First, I _________________________ (broke / fell / lost / found).",
            "Sentence 1 (broke): ____________________________________________________________________________",
            "Sentence 2 (fell): ______________________________________________________________________________",
            "Sentence 3 (because): __________________________________________________________________________",
            "Extension: Write 1 sentence about how you FELT when the accident happened.",
            "____________________________________________________________",
            "☐ Did I use 'broke' or 'fell'?  ☐ Capital letter?  ☐ Full stop?",
            "☐ Did I explain WHY the accident happened (use 'because')?",
            "[ Sub-total: ___ / 5 ]",
        ],
        2: [
            "📝 Week 33 — Session 2 | Topic: A Clumsy Day (Middle)",
            "Today's goal: Write the MIDDLE — more accidents AND finding a solution!",
            "Story Starter: Then, something worse happened. I _________________________ (lost / fell / broke / found).",
            "Sentence 1: ___________________________________________________________________________________",
            "Sentence 2: ___________________________________________________________________________________",
            "Sentence 3 (found a solution): _________________________________________________________________",
            "Extension: Write 1 sentence with BOTH 'lost' and 'found' in it.",
            "____________________________________________________________",
            "☐ Did I use 'lost' and 'found'?  ☐ Did I show a problem AND a solution?",
            "☐ Capital letter?  ☐ Full stop?  ☐ Did I use 'because' or 'so'?",
            "[ Sub-total: ___ / 5 ]",
        ],
        3: [
            "📝 Week 33 — Session 3 | Topic: A Clumsy Day (Full Story)",
            "Today's goal: Write your complete Beginning-Middle-End clumsy day story.",
            "Write your full paragraph here:",
            "____________________________________________________________",
            "____________________________________________________________",
            "____________________________________________________________",
            "____________________________________________________________",
            "Checklist: ☐ Used 'broke', 'fell', 'lost', AND 'found'?  ☐ Used sequence words?",
            "☐ Beginning (normal day), Middle (accidents), End (solution or lesson)?",
            "☐ Capital letter?  ☐ Full stop?  ☐ At least 4 sentences?",
            "[ Sub-total: ___ / 8 ]",
        ],
    },
    34: {
        1: [
            "📝 Week 34 — Session 1 | Topic: The Fable (Beginning — Introduce the Characters)",
            "Today's goal: Write the BEGINNING of the fable — introduce the lion and mouse.",
            "Story Starter: Once upon a time, in a big forest, there lived a __________ lion and a __________ mouse.",
            "Sentence 1 (lion): _____________________________________________________________________________",
            "Sentence 2 (mouse): ____________________________________________________________________________",
            "Sentence 3 (First event): _______________________________________________________________________",
            "Extension: Use at least 2 adjectives to describe the characters (e.g. powerful, tiny, clever).",
            "____________________________________________________________",
            "☐ Did I introduce BOTH characters?  ☐ Did I use past tense verbs (ran, was, came)?",
            "☐ Capital letter?  ☐ Full stop?  ☐ Did I set the scene (where/when)?",
            "[ Sub-total: ___ / 5 ]",
        ],
        2: [
            "📝 Week 34 — Session 2 | Topic: The Fable (Middle — The Problem)",
            "Today's goal: Write the MIDDLE of the fable — the lion gets caught!",
            "Story Starter: One day, the hunters came. They _________________________ (caught / ran / said / won).",
            "Sentence 1 (caught): ___________________________________________________________________________",
            "Sentence 2 (lion called for help): ______________________________________________________________",
            "Sentence 3 (mouse came): _______________________________________________________________________",
            "Extension: Write the mouse's actual words using speech marks: 'I will help you!' said the mouse.",
            "____________________________________________________________",
            "☐ Did I use 'caught', 'ran', or 'said'?  ☐ Did I include speech marks?",
            "☐ Capital letter?  ☐ Full stop?  ☐ Is there a clear problem?",
            "[ Sub-total: ___ / 5 ]",
        ],
        3: [
            "📝 Week 34 — Session 3 | Topic: The Complete Fable",
            "Today's goal: Write your complete Beginning-Middle-End fable. Use ALL characters and past tense verbs.",
            "Write your full fable here:",
            "____________________________________________________________",
            "____________________________________________________________",
            "____________________________________________________________",
            "____________________________________________________________",
            "Checklist: ☐ Used 'ran', 'won', 'caught', AND 'said'?  ☐ Introduced both characters?",
            "☐ Wrote the problem AND the solution?  ☐ Included a moral (lesson)?",
            "☐ Capital letter?  ☐ Full stop?  ☐ At least 4 sentences?",
            "[ Sub-total: ___ / 8 ]",
        ],
    },
    35: {
        1: [
            "📝 Week 35 — Session 1 | Topic: My Best Day (Beginning — The Beach)",
            "Today's goal: Write 3 sentences about the BEGINNING of your best day.",
            "Story Starter: One special day, I _________________________ (went / saw / felt / made / gave).",
            "Sentence 1 (went + where): _____________________________________________________________________",
            "Sentence 2 (saw + what): _______________________________________________________________________",
            "Sentence 3 (felt + how): ________________________________________________________________________",
            "Extension: Add a describing word to each sentence (e.g. beautiful, amazing, colourful).",
            "____________________________________________________________",
            "☐ Did I use 'went', 'saw', or 'felt'?  ☐ Capital letter?  ☐ Full stop?",
            "☐ Did I describe WHERE I went?  ☐ Did I say HOW I felt?",
            "[ Sub-total: ___ / 5 ]",
        ],
        2: [
            "📝 Week 35 — Session 2 | Topic: My Best Day (Middle — The Zoo)",
            "Today's goal: Write 3 sentences about the MIDDLE of your best day — something special happened!",
            "Story Starter: In the afternoon, I _________________________ (went / saw / made / gave / felt).",
            "Sentence 1: ___________________________________________________________________________________",
            "Sentence 2: ___________________________________________________________________________________",
            "Sentence 3 (gave someone something OR made something): _________________________________________",
            "Extension: Write 1 sentence about a problem that happened and how you solved it.",
            "____________________________________________________________",
            "☐ Did I use 'saw', 'made', or 'gave'?  ☐ Did I describe what made it special?",
            "☐ Capital letter?  ☐ Full stop?  ☐ Did I use 'because' or 'so'?",
            "[ Sub-total: ___ / 5 ]",
        ],
        3: [
            "📝 Week 35 — Session 3 | Topic: My Best Day (Full Story)",
            "Today's goal: Write your complete Beginning-Middle-End story about your BEST DAY.",
            "Write your full paragraph here:",
            "____________________________________________________________",
            "____________________________________________________________",
            "____________________________________________________________",
            "____________________________________________________________",
            "Checklist: ☐ Used 'went', 'saw', 'felt', 'made', AND 'gave'?  ☐ Used sequence words?",
            "☐ Beginning (where/when), Middle (what happened), End (how you felt or what you learned)?",
            "☐ Capital letter?  ☐ Full stop?  ☐ At least 4 sentences?",
            "[ Sub-total: ___ / 8 ]",
        ],
    },
    36: {
        1: [
            "📝 Week 36 — Session 1 | Topic: My Adventure Book (Cover + Chapter 1 Opening)",
            "Today's goal: Write your book cover details AND the opening sentence of Chapter 1.",
            "Book Cover: Title: _____________________________ | Author (your name): _____________________________",
            "Cover Illustration idea: ______________________________________________________________________",
            "Chapter 1 Opening sentence (use 'went' or 'was'): _______________________________________________",
            "Chapter 1 Sentence 2: __________________________________________________________________________",
            "Extension: Write what the reader will FIND OUT in your book — tease the adventure!",
            "____________________________________________________________",
            "☐ Did I write a title and author name?  ☐ Did I use a past tense verb (went / saw / was)?",
            "☐ Capital letter?  ☐ Full stop?  ☐ Is my opening sentence exciting?",
            "[ Sub-total: ___ / 5 ]",
        ],
        2: [
            "📝 Week 36 — Session 2 | Topic: My Adventure Book (Chapter 2 — The Problem)",
            "Today's goal: Write Chapter 2 — something goes WRONG in your adventure story!",
            "Story Starter: Suddenly, Max _________________________ (lost / felt / heard / ran / saw).",
            "Sentence 1 (problem): __________________________________________________________________________",
            "Sentence 2 (how he felt): _______________________________________________________________________",
            "Sentence 3 (what he tried to do): ______________________________________________________________",
            "Extension: Write Max's exact words using speech marks: '___________________________!' said Max.",
            "____________________________________________________________",
            "☐ Did I use 'lost', 'felt', or 'heard'?  ☐ Is there a clear problem?",
            "☐ Capital letter?  ☐ Full stop?  ☐ Did I use speech marks?",
            "[ Sub-total: ___ / 5 ]",
        ],
        3: [
            "📝 Week 36 — Session 3 | Topic: My Adventure Book (Complete Story — Case Closed!)",
            "Today's goal: Write your complete story with all 3 chapters. Use ALL Block B verbs reviewed this week.",
            "Write your complete story here:",
            "____________________________________________________________",
            "____________________________________________________________",
            "____________________________________________________________",
            "____________________________________________________________",
            "Checklist: ☐ Used at least 5 Block B past tense verbs (went/saw/heard/ran/felt/lost/found/gave)?",
            "☐ Used sequence words (First, Then, Next, Finally)?  ☐ Used 'was' or 'were'?",
            "☐ Beginning, Middle (problem), End (solution)?  ☐ At least 5 sentences?",
            "[ Sub-total: ___ / 10 ]",
        ],
    },
}


# ─────────────────────────────────────────────────────────────────────────────
# HELPER FUNCTIONS
# ─────────────────────────────────────────────────────────────────────────────
def apply_fixes(week_num):
    for path_rel in [
        'mcp-server/data/lessons/W%d.json' % week_num,
        'public/data/lessons/W%d.json' % week_num,
    ]:
        path = os.path.join(BASE, path_rel)
        w = json.load(open(path, encoding='utf-8'))
        changed = []

        # ── 1. vocab_tiers: add Tier2 words + grammar table ──────────────────
        vt = w.get('vocab_tiers', [])
        # Remove existing grammar table rows (strings, not dicts)
        vt_dicts = [v for v in vt if isinstance(v, dict)]
        
        # Add extra Tier2 words if week needs them
        extra = VOCAB_TIER2_EXTRA.get(week_num, [])
        # Avoid duplicates
        existing_words = {v.get('Word','').lower() for v in vt_dicts}
        for e in extra:
            if e['Word'].lower() not in existing_words:
                vt_dicts.append(e)
        
        # Add grammar table rows
        grammar_rows = VOCAB_GRAMMAR_TABLES.get(week_num, [])
        for row in grammar_rows:
            vt_dicts.append(row)
        
        w['vocab_tiers'] = vt_dicts
        changed.append('vocab_tiers → %d items' % len(vt_dicts))

        # ── 2. PART 6 and PART 8 expansion ───────────────────────────────────
        p6_data = PART6.get(week_num, {})
        p8_data = PART8.get(week_num, {})

        for sess in w.get('sessions', []):
            sn = sess['session']
            for p in sess.get('parts', []):
                title = p.get('title', '')
                content = p.get('content', [])

                if 'PART 6' in title:
                    new_content = p6_data.get(sn)
                    if new_content and len(new_content) > len(content):
                        p['content'] = new_content
                        changed.append('S%d PART 6: %d→%d lines' % (sn, len(content), len(new_content)))

                elif 'PART 8' in title:
                    new_content = p8_data.get(sn)
                    if new_content and len(new_content) > len(content):
                        p['content'] = new_content
                        changed.append('S%d PART 8: %d→%d lines' % (sn, len(content), len(new_content)))

        # ── 3. SPIRAL REVIEW: separate part for W31 and W35 ──────────────────
        if week_num in (31, 35):
            for sess in w.get('sessions', []):
                sn = sess['session']
                parts = sess.get('parts', [])
                # Check if first part is the merged header
                if parts and len(parts[0].get('content', [])) > 2:
                    header_content = parts[0]['content']
                    # Find SPIRAL REVIEW content in header
                    spiral_start = None
                    for i, line in enumerate(header_content):
                        if 'SPIRAL REVIEW' in line or 'SPIRAL' in line:
                            spiral_start = i
                            break
                    if spiral_start is not None:
                        # Split header: keep only lines before spiral as header
                        # and create separate SPIRAL REVIEW part
                        new_header = header_content[:spiral_start]
                        spiral_content = [l for l in header_content[spiral_start:] if 'SPIRAL REVIEW' not in l and 'SPIRAL' not in l]
                        
                        parts[0]['content'] = new_header if new_header else header_content[:1]
                        
                        # Insert spiral review as second part
                        spiral_part = {
                            "title": "SPIRAL REVIEW (5 min)",
                            "content": spiral_content
                        }
                        parts.insert(1, spiral_part)
                        changed.append('S%d SPIRAL REVIEW: extracted to separate part (%d lines)' % (sn, len(spiral_content)))
                        sess['parts'] = parts

        # Save
        with open(path, 'w', encoding='utf-8') as f:
            json.dump(w, f, ensure_ascii=False, indent=2)
        print('  [%s] %s' % (path_rel.split('/')[-1], ' | '.join(changed) if changed else 'no changes'))


# ─────────────────────────────────────────────────────────────────────────────
# MAIN
# ─────────────────────────────────────────────────────────────────────────────
print('=' * 60)
print('Applying comprehensive W29-W36 fixes vs W28 golden standard')
print('=' * 60)

for n in range(29, 37):
    print('\nW%d:' % n)
    apply_fixes(n)

# Update lessonPlans.json for W29-W36
print('\nUpdating public/data/lessonPlans.json...')
plans_path = os.path.join(BASE, 'public/data/lessonPlans.json')
lp = json.load(open(plans_path, encoding='utf-8'))
for n in range(29, 37):
    pub_data = json.load(open(os.path.join(BASE, 'public/data/lessons/W%d.json' % n), encoding='utf-8'))
    lp[str(n)] = pub_data
    print('  Updated key=%d' % n)
with open(plans_path, 'w', encoding='utf-8') as f:
    json.dump(lp, f, ensure_ascii=False, indent=2)

print('\nDone.')
