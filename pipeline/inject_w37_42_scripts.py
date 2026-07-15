"""
Inject listening scripts + S3 speaking_notes + S3 in_class_speaking
into W37-W42 JSON files, then regenerate Lesson Plan DOCX.

Run: python3 pipeline/inject_w37_42_scripts.py
"""
import json, pathlib, shutil

ROOT     = pathlib.Path(__file__).parent.parent
PUB      = ROOT / "public/data/lessons"
MCP      = ROOT / "mcp-server/data/lessons"

# ──────────────────────────────────────────────────────────────────────────────
# CONTENT — 6 weeks × 3 sessions each
# ──────────────────────────────────────────────────────────────────────────────

SCRIPTS = {

# ─── W37: Nature's Rules — The Life Investigation ────────────────────────────
# Grammar: "because" for scientific reasoning
# Vocab: living, non-living, breathe, grow, move
37: {
    "s1": {
        "listening_script": (
            "Hello, scientists! Today we are investigating living and non-living things. "
            "A dog is a living thing because it breathes, grows, and moves. "
            "A rock is a non-living thing because it cannot breathe or grow. "
            "A flower is living because it needs water and sunlight to grow. "
            "A toy car is non-living because it cannot breathe or move by itself. "
            "Remember: we use 'because' to give scientific reasons. "
            "Now listen again and check your answers on your worksheet."
        ),
        "speaking_notes": None,
        "in_class_speaking": None,
    },
    "s2": {
        "listening_script": (
            "Welcome back, detectives! Let us investigate more living things. "
            "A tree is living because it grows toward the sunlight. "
            "A cloud is non-living because it cannot breathe or grow. "
            "Fish are living because they breathe underwater and can move on their own. "
            "A bottle of water is non-living because it does not grow or breathe. "
            "Always give your reason using 'because' — that is the scientific way! "
            "Listen one more time and write True or False on your worksheet."
        ),
        "speaking_notes": None,
        "in_class_speaking": None,
    },
    "s3": {
        "listening_script": (
            "Good morning, young scientists! I will now present my life investigation report. "
            "I investigated four objects: a cat, a pencil, a plant, and a stone. "
            "The cat is living because it breathes, moves, and grows. "
            "The pencil is non-living because it cannot breathe, move, or grow by itself. "
            "The plant is living because it grows toward the sun and needs water. "
            "The stone is non-living because it has none of the seven signs of life. "
            "My conclusion: living things breathe, grow, and move because they have life energy."
        ),
        "speaking_notes": (
            "SPEAKING CHECKPOINT — Teacher Guidance (do NOT share with students):\n\n"
            "Student A: Name a living or non-living thing.\n"
            "Student B: Explain using 'because' (e.g., 'A cat is living because it breathes and grows.').\n"
            "Goal: Full scientific reasoning using 'because' for all 7 characteristics.\n"
            "[O] L3 — Fill in the blank with 3 options (10 items)\n"
            "A cat is a _______________ (living / non-living / dead) thing.\n"
            "A rock cannot _______________ (breathe / grow / move) by itself.\n"
            "Plants are living _______________ (because / but / so) they grow.\n"
            "A toy is non-living _______________ (because / when / if) it cannot breathe.\n"
            "Fish are living things _______________ (because / unless / although) they breathe underwater.\n"
            "I can prove this _______________ (because / while / after) I observed it.\n"
            "A stone does not _______________ (breathe / water / cycle) on its own.\n"
            "Living things _______________ (need / non / rock) food and water.\n"
            "_______________ (Because / When / If) it grows, it is living.\n"
            "My report shows _______________ (that / because / grow) a plant is living.\n"
            "[O] L4 — Sentence Expansion (10 items)\n"
            "Base: A plant is living. + Add: (because it grows and needs sunlight) → ________________\n"
            "Base: A rock is non-living. + Add: (because it cannot breathe) → ________________\n"
            "Base: A cat breathes. + Add: (so it is a living thing) → ________________\n"
            "Base: I investigated four objects. + Add: (in my science report today) → ________________\n"
            "Base: Fish can move. + Add: (because they are living things) → ________________"
        ),
        "in_class_speaking": (
            "IN-CLASS SPEAKING ACTIVITIES — Session 3 (teacher-led)\n\n"
            "Activity 1 — Pair Speaking (3–5 min, pairs):\n"
            "  Student A: Name a living or non-living thing.\n"
            "  Student B: Give a scientific reason using 'because'.\n"
            "  Goal: Full scientific reasoning using 'because'.\n\n"
            "Challenge Extension (L3 — for advanced/older students):\n"
            "  [O] L3 — Fill in the blank with 3 options (10 items)\n"
            "  A cat is a _______________ (living / non-living / dead) thing.\n"
            "  A rock cannot _______________ (breathe / grow / move) by itself.\n"
            "  Plants are living _______________ (because / but / so) they grow.\n"
            "  A toy is non-living _______________ (because / when / if) it cannot breathe.\n"
            "  Fish are living things _______________ (because / unless / although) they breathe underwater.\n"
            "  I can prove this _______________ (because / while / after) I observed it.\n"
            "  A stone does not _______________ (breathe / water / cycle) on its own.\n"
            "  Living things _______________ (need / non / rock) food and water.\n"
            "  _______________ (Because / When / If) it grows, it is living.\n"
            "  My report shows _______________ (that / because / grow) a plant is living."
        ),
    },
},

# ─── W38: Nature's Rules — Animal Groups ─────────────────────────────────────
# Grammar: Present Simple for facts (has/have, lays, lives)
# Vocab: mammal, reptile, amphibian, insect, bird
38: {
    "s1": {
        "listening_script": (
            "Hello, animal experts! Today we are sorting animals into five groups. "
            "A dog is a mammal. It has fur and feeds its babies with milk. "
            "A snake is a reptile. It has scales and lives on land. "
            "A frog is an amphibian. It lives both in water and on land. "
            "A bee is an insect. It has six legs and three body parts. "
            "An eagle is a bird. It has feathers and lays eggs. "
            "Remember to use 'has', 'lays', or 'lives' when you describe animals!"
        ),
        "speaking_notes": None,
        "in_class_speaking": None,
    },
    "s2": {
        "listening_script": (
            "Welcome back, scientists! Let us review the five animal groups. "
            "Mammals have fur. A cat has fur and gives birth to live babies. "
            "Reptiles have scales. A lizard has scales and lays eggs on land. "
            "Amphibians live in two worlds. A toad lives in water and on land. "
            "Insects have six legs. A butterfly has six legs and beautiful wings. "
            "Birds have feathers and beaks. A parrot has colourful feathers and lays eggs. "
            "Now listen and match each animal to its correct group on your worksheet."
        ),
        "speaking_notes": None,
        "in_class_speaking": None,
    },
    "s3": {
        "listening_script": (
            "Welcome to my animal science presentation! I will explain the five animal groups. "
            "First, mammals: a whale is a mammal because it has warm blood and feeds its babies milk. "
            "Second, reptiles: a crocodile is a reptile because it has scales and lays eggs. "
            "Third, amphibians: a salamander lives in water and on land, so it is an amphibian. "
            "Fourth, insects: an ant has six legs and three body parts, so it is an insect. "
            "Fifth, birds: a penguin has feathers and lays eggs, so it is a bird. "
            "Every animal belongs to a group based on its features!"
        ),
        "speaking_notes": (
            "SPEAKING CHECKPOINT — Teacher Guidance (do NOT share with students):\n\n"
            "Student A: Name an animal.\n"
            "Student B: Classify it and give two facts (e.g., 'A whale is a mammal. It has warm blood and feeds its babies milk.').\n"
            "Goal: Use Present Simple facts — has/have, lays, lives.\n"
            "[O] L3 — Fill in the blank with 3 options (10 items)\n"
            "A dog is a _______________ (mammal / reptile / insect).\n"
            "A snake _______________ (has / lays / lives) scales.\n"
            "A frog _______________ (lives / has / lays) in water and on land.\n"
            "An ant _______________ (has / lays / feeds) six legs.\n"
            "A parrot _______________ (lays / lives / grows) eggs.\n"
            "A whale _______________ (feeds / scales / lays) its babies with milk.\n"
            "A crocodile _______________ (has / is / are) a reptile.\n"
            "Insects have _______________ (six / four / eight) legs.\n"
            "A _______________ (mammal / insect / bird) has feathers.\n"
            "An amphibian lives in water _______________ (and / but / so) on land."
        ),
        "in_class_speaking": (
            "IN-CLASS SPEAKING ACTIVITIES — Session 3 (teacher-led)\n\n"
            "Activity 1 — Pair Speaking (3–5 min, pairs):\n"
            "  Student A: Name an animal.\n"
            "  Student B: State its group and two facts (e.g., 'A snake is a reptile. It has scales and lays eggs.').\n"
            "  Goal: Accurate use of Present Simple for facts.\n\n"
            "Challenge Extension (L3 — for advanced/older students):\n"
            "  [O] L3 — Fill in the blank with 3 options (10 items)\n"
            "  A dog is a _______________ (mammal / reptile / insect).\n"
            "  A snake _______________ (has / lays / lives) scales.\n"
            "  A frog _______________ (lives / has / lays) in water and on land.\n"
            "  An ant _______________ (has / lays / feeds) six legs.\n"
            "  A parrot _______________ (lays / lives / grows) eggs.\n"
            "  A whale _______________ (feeds / scales / lays) its babies with milk.\n"
            "  A crocodile _______________ (has / is / are) a reptile.\n"
            "  Insects have _______________ (six / four / eight) legs.\n"
            "  A _______________ (mammal / insect / bird) has feathers.\n"
            "  An amphibian lives in water _______________ (and / but / so) on land."
        ),
    },
},

# ─── W39: Nature's Rules — Oviparous vs Viviparous ──────────────────────────
# Grammar: Comparison structures (Both, Unlike, but)
# Vocab: lay eggs, give birth, hatch, protect, develop
39: {
    "s1": {
        "listening_script": (
            "Hello, scientists! Today we compare oviparous and viviparous animals. "
            "Oviparous animals lay eggs. A chicken and a turtle both lay eggs. "
            "Viviparous animals give birth to live babies. A cat and a dog both give birth. "
            "Both groups protect their young — but in different ways. "
            "Unlike viviparous animals, oviparous animals hatch from eggs. "
            "Eggs need warmth to develop into healthy babies. "
            "Listen carefully and circle the correct word on your worksheet!"
        ),
        "speaking_notes": None,
        "in_class_speaking": None,
    },
    "s2": {
        "listening_script": (
            "Welcome, animal researchers! Let us compare more animals today. "
            "A crocodile is oviparous. It lays eggs in the sand and protects the nest. "
            "A dolphin is viviparous. It gives birth underwater and feeds its baby milk. "
            "Both crocodiles and dolphins protect their young after birth or hatching. "
            "Unlike the crocodile, the dolphin does not lay eggs. "
            "Eggs develop slowly inside a shell before they hatch. "
            "Now complete the True or False activity on your worksheet."
        ),
        "speaking_notes": None,
        "in_class_speaking": None,
    },
    "s3": {
        "listening_script": (
            "Good morning! Today I will compare oviparous and viviparous animals in my report. "
            "Both oviparous and viviparous animals develop from a single cell at the start. "
            "Unlike viviparous animals, oviparous animals lay eggs that must hatch outside the body. "
            "A sea turtle lays eggs on the beach and the babies hatch after two months. "
            "A human is viviparous — the baby develops inside the mother and is born live. "
            "Both types of animals protect their young to help them survive. "
            "My conclusion: the main difference is how the baby develops and enters the world."
        ),
        "speaking_notes": (
            "SPEAKING CHECKPOINT — Teacher Guidance (do NOT share with students):\n\n"
            "Student A: Name an animal.\n"
            "Student B: Describe it using 'Both', 'Unlike', or 'but' (e.g., 'Both frogs and birds lay eggs, but frogs hatch in water.').\n"
            "Goal: Accurate use of comparison structures.\n"
            "[O] L3 — Fill in the blank with 3 options (10 items)\n"
            "_______________ (Both / Unlike / But) frogs and birds lay eggs.\n"
            "A cat gives _______________ (birth / eggs / hatch) to live babies.\n"
            "_______________ (Unlike / Both / Develop) reptiles, mammals do not lay eggs.\n"
            "Eggs need warmth to _______________ (develop / protect / hatch) properly.\n"
            "A turtle _______________ (lays / gives / hatches) eggs on the beach.\n"
            "Both crocodiles and turtles are _______________ (oviparous / viviparous / mammals).\n"
            "The baby bird must _______________ (hatch / give / lay) out of its shell.\n"
            "Viviparous animals _______________ (give birth / lay eggs / hatch) to live babies.\n"
            "A dolphin _______________ (protects / lays / hatches) its baby after birth.\n"
            "Unlike birds, dogs _______________ (give birth / lay eggs / develop) to live pups."
        ),
        "in_class_speaking": (
            "IN-CLASS SPEAKING ACTIVITIES — Session 3 (teacher-led)\n\n"
            "Activity 1 — Pair Speaking (3–5 min, pairs):\n"
            "  Student A: Name one oviparous and one viviparous animal.\n"
            "  Student B: Compare them using 'Both', 'Unlike', or 'but'.\n"
            "  Example: 'Both eagles and sharks protect their young, but unlike sharks, eagles lay eggs.'\n\n"
            "Challenge Extension (L3 — for advanced/older students):\n"
            "  [O] L3 — Fill in the blank with 3 options (10 items)\n"
            "  _______________ (Both / Unlike / But) frogs and birds lay eggs.\n"
            "  A cat gives _______________ (birth / eggs / hatch) to live babies.\n"
            "  _______________ (Unlike / Both / Develop) reptiles, mammals do not lay eggs.\n"
            "  Eggs need warmth to _______________ (develop / protect / hatch) properly.\n"
            "  A turtle _______________ (lays / gives / hatches) eggs on the beach.\n"
            "  Both crocodiles and turtles are _______________ (oviparous / viviparous / mammals).\n"
            "  The baby bird must _______________ (hatch / give / lay) out of its shell.\n"
            "  Viviparous animals _______________ (give birth / lay eggs / hatch) to live babies.\n"
            "  A dolphin _______________ (protects / lays / hatches) its baby after birth.\n"
            "  Unlike birds, dogs _______________ (give birth / lay eggs / develop) to live pups."
        ),
    },
},

# ─── W40: Nature's Rules — Habitats ─────────────────────────────────────────
# Grammar: Comparatives (-er than)
# Vocab: habitat, desert, ocean, hotter, colder
40: {
    "s1": {
        "listening_script": (
            "Hello, geographers! Today we are learning about animal habitats. "
            "A habitat is the natural home of an animal. "
            "The desert is hotter than the forest. Camels live in the desert because it is dry. "
            "The ocean is colder than the desert. Fish live in the ocean because they need water. "
            "The Arctic is colder than any other habitat on Earth. Polar bears live there. "
            "Every animal's habitat is perfect for that animal. "
            "Listen and match each animal to its correct habitat on your worksheet!"
        ),
        "speaking_notes": None,
        "in_class_speaking": None,
    },
    "s2": {
        "listening_script": (
            "Welcome back, habitat hunters! Let us compare more habitats today. "
            "The rainforest is wetter than the desert. Monkeys live in rainforests. "
            "Mountains are colder than plains. Snow leopards live on cold, rocky mountains. "
            "The savannah is drier than the rainforest. Lions and zebras live on the savannah. "
            "Coral reefs are warmer than deep ocean water. Clownfish live in warm coral reefs. "
            "The habitat with the right temperature and food helps animals survive. "
            "Now complete the True or False activity and give a reason for each answer!"
        ),
        "speaking_notes": None,
        "in_class_speaking": None,
    },
    "s3": {
        "listening_script": (
            "Hello! I will now present my habitat comparison report. "
            "The desert is hotter and drier than the rainforest. Camels are better at surviving heat. "
            "The Arctic is colder than any other habitat. Polar bears have thicker fur than other bears. "
            "The ocean is deeper and wider than any river. Whales are larger than river dolphins. "
            "Rainforests are wetter and greener than any other habitat. More species live there. "
            "My conclusion: different habitats support different animals because each provides the right conditions. "
            "Animals that live in colder habitats usually have thicker fur or more body fat than warm-habitat animals."
        ),
        "speaking_notes": (
            "SPEAKING CHECKPOINT — Teacher Guidance (do NOT share with students):\n\n"
            "Student A: Name two habitats.\n"
            "Student B: Compare them using comparatives (e.g., 'The desert is hotter than the forest.').\n"
            "Goal: Accurate use of -er than comparatives.\n"
            "[O] L3 — Fill in the blank with 3 options (10 items)\n"
            "The desert is _______________ (hotter / colder / wetter) than the rainforest.\n"
            "A polar bear's _______________ (habitat / ocean / desert) is the Arctic.\n"
            "The ocean is _______________ (deeper / hotter / drier) than a river.\n"
            "Camels are _______________ (better / bigger / taller) at surviving in the desert.\n"
            "The Arctic is _______________ (colder / hotter / smaller) than the savannah.\n"
            "Rainforests are _______________ (wetter / drier / colder) than savannahs.\n"
            "Clownfish live in _______________ (coral reefs / deserts / mountains).\n"
            "The savannah is _______________ (drier / wetter / colder) than the rainforest.\n"
            "Snow leopards live in _______________ (mountains / oceans / deserts).\n"
            "Animals survive because their habitat gives them the right _______________ (conditions / colder / habitat)."
        ),
        "in_class_speaking": (
            "IN-CLASS SPEAKING ACTIVITIES — Session 3 (teacher-led)\n\n"
            "Activity 1 — Pair Speaking (3–5 min, pairs):\n"
            "  Student A: Name two habitats.\n"
            "  Student B: Compare them using at least two comparatives.\n"
            "  Example: 'The Arctic is colder and snowier than the savannah.'\n\n"
            "Challenge Extension (L3 — for advanced/older students):\n"
            "  [O] L3 — Fill in the blank with 3 options (10 items)\n"
            "  The desert is _______________ (hotter / colder / wetter) than the rainforest.\n"
            "  A polar bear's _______________ (habitat / ocean / desert) is the Arctic.\n"
            "  The ocean is _______________ (deeper / hotter / drier) than a river.\n"
            "  Camels are _______________ (better / bigger / taller) at surviving in the desert.\n"
            "  The Arctic is _______________ (colder / hotter / smaller) than the savannah.\n"
            "  Rainforests are _______________ (wetter / drier / colder) than savannahs.\n"
            "  Clownfish live in _______________ (coral reefs / deserts / mountains).\n"
            "  The savannah is _______________ (drier / wetter / colder) than the rainforest.\n"
            "  Snow leopards live in _______________ (mountains / oceans / deserts).\n"
            "  Animals survive because their habitat gives them the right _______________ (conditions / colder / habitat)."
        ),
    },
},

# ─── W41: Nature's Rules — Life Cycles ───────────────────────────────────────
# Grammar: Sequence Words (First, Next, Then, Finally) + Present Simple
# Vocab: cycle, larva, pupa, adult, stage
41: {
    "s1": {
        "listening_script": (
            "Hello, biologists! Today we are studying the life cycle of a butterfly. "
            "A life cycle has four stages. First, a butterfly lays a tiny egg on a leaf. "
            "Next, the egg hatches into a larva — we call it a caterpillar. "
            "Then, the caterpillar becomes a pupa inside a chrysalis. "
            "Finally, the pupa transforms into a beautiful adult butterfly. "
            "The cycle then begins again when the butterfly lays new eggs. "
            "Listen and number the stages in the correct order on your worksheet!"
        ),
        "speaking_notes": None,
        "in_class_speaking": None,
    },
    "s2": {
        "listening_script": (
            "Welcome back, scientists! Today we study the life cycle of a frog. "
            "First, a frog lays hundreds of eggs in the water. "
            "Next, the eggs hatch into tiny tadpoles with tails. "
            "Then, the tadpoles grow legs and their tails shrink. "
            "Finally, the tadpoles become adult frogs that can live on land and in water. "
            "The adult frog then begins the cycle again by laying more eggs. "
            "Now draw and label the four stages of the frog's life cycle on your worksheet!"
        ),
        "speaking_notes": None,
        "in_class_speaking": None,
    },
    "s3": {
        "listening_script": (
            "Good morning! I will now present my life cycle report for the class. "
            "I chose the mosquito because it has a very clear four-stage cycle. "
            "First, the adult mosquito lays eggs on the surface of water. "
            "Next, the eggs hatch into larvae that wiggle and swim in the water. "
            "Then, the larvae become pupae and stop eating while they change. "
            "Finally, the pupae break open and an adult mosquito flies out. "
            "The complete cycle takes about one week, and then the adult starts a new cycle!"
        ),
        "speaking_notes": (
            "SPEAKING CHECKPOINT — Teacher Guidance (do NOT share with students):\n\n"
            "Student A: Name one stage of a life cycle (e.g., 'larva').\n"
            "Student B: Describe what happens using a sequence word (e.g., 'Next, the larva eats and grows bigger.').\n"
            "Goal: Accurate use of First, Next, Then, Finally + Present Simple.\n"
            "[O] L3 — Fill in the blank with 3 options (10 items)\n"
            "_______________ (First / Next / Finally), the butterfly lays an egg.\n"
            "The egg hatches into a _______________ (larva / pupa / adult).\n"
            "_______________ (Then / First / Finally), the larva becomes a pupa.\n"
            "The pupa transforms into an _______________ (adult / larva / egg) butterfly.\n"
            "_______________ (Finally / Next / First), the butterfly starts the cycle again.\n"
            "A life cycle has _______________ (four / two / six) main stages.\n"
            "The caterpillar is the _______________ (larva / pupa / adult) stage.\n"
            "The chrysalis is the _______________ (pupa / larva / adult) stage.\n"
            "A frog _______________ (lays / grows / hatches) eggs in water.\n"
            "Each _______________ (stage / cycle / adult) in the life cycle has a special role."
        ),
        "in_class_speaking": (
            "IN-CLASS SPEAKING ACTIVITIES — Session 3 (teacher-led)\n\n"
            "Activity 1 — Pair Speaking (3–5 min, pairs):\n"
            "  Student A: Choose any animal (butterfly, frog, mosquito).\n"
            "  Student B: Describe all four stages using First, Next, Then, Finally.\n"
            "  Example: 'First, the frog lays eggs. Next, tadpoles hatch. Then, they grow legs. Finally, they become adult frogs.'\n\n"
            "Challenge Extension (L3 — for advanced/older students):\n"
            "  [O] L3 — Fill in the blank with 3 options (10 items)\n"
            "  _______________ (First / Next / Finally), the butterfly lays an egg.\n"
            "  The egg hatches into a _______________ (larva / pupa / adult).\n"
            "  _______________ (Then / First / Finally), the larva becomes a pupa.\n"
            "  The pupa transforms into an _______________ (adult / larva / egg) butterfly.\n"
            "  _______________ (Finally / Next / First), the butterfly starts the cycle again.\n"
            "  A life cycle has _______________ (four / two / six) main stages.\n"
            "  The caterpillar is the _______________ (larva / pupa / adult) stage.\n"
            "  The chrysalis is the _______________ (pupa / larva / adult) stage.\n"
            "  A frog _______________ (lays / grows / hatches) eggs in water.\n"
            "  Each _______________ (stage / cycle / adult) in the life cycle has a special role."
        ),
    },
},

# ─── W42: Nature's Rules — The Water Cycle ───────────────────────────────────
# Grammar: Sequence words + Present Simple for processes
# Vocab: evaporation, condensation, precipitation, vapor, water cycle
42: {
    "s1": {
        "listening_script": (
            "Hello, Earth scientists! Today we are learning about the water cycle. "
            "The water cycle is the journey of water around our planet — it never stops! "
            "First, the sun heats the ocean and evaporation happens — water becomes vapor. "
            "Next, the vapor rises into the sky and condensation happens — it forms clouds. "
            "Then, the clouds get heavy and precipitation happens — rain or snow falls. "
            "Finally, the water flows back to rivers and the ocean, and the cycle begins again. "
            "Listen and label the four stages on your water cycle diagram!"
        ),
        "speaking_notes": None,
        "in_class_speaking": None,
    },
    "s2": {
        "listening_script": (
            "Welcome back, water scientists! Let us practise the water cycle vocabulary. "
            "Evaporation: heat turns liquid water into invisible water vapor in the air. "
            "Condensation: water vapor cools and forms tiny water droplets — these make clouds. "
            "Precipitation: water falls from clouds as rain, snow, or hail back to the ground. "
            "Collection: water gathers in rivers, lakes, and oceans, and the cycle begins again. "
            "Without evaporation, there is no condensation. Without condensation, there is no precipitation. "
            "Every stage depends on the next! Complete the True or False activity now."
        ),
        "speaking_notes": None,
        "in_class_speaking": None,
    },
    "s3": {
        "listening_script": (
            "Good morning, class! I will now explain the complete water cycle in my presentation. "
            "First, evaporation happens when sunlight warms the surface of the ocean or a lake. "
            "Water molecules escape into the air as invisible water vapor. "
            "Next, condensation happens high in the atmosphere where the air is colder. "
            "The vapor forms tiny droplets that clump together and create clouds. "
            "Then, precipitation happens when the clouds become too heavy and water falls as rain. "
            "Finally, the water collects in rivers and oceans, and the cycle starts all over again — "
            "the same water has cycled on Earth for billions of years!"
        ),
        "speaking_notes": (
            "SPEAKING CHECKPOINT — Teacher Guidance (do NOT share with students):\n\n"
            "Student A: Point to one stage of the water cycle on the diagram.\n"
            "Student B: Explain what happens at that stage using a sequence word and Present Simple.\n"
            "Example: 'First, evaporation happens. The sun heats the water and it becomes vapor.'\n"
            "Goal: Full explanation of all 4 stages using sequence words + Present Simple.\n"
            "[O] L3 — Fill in the blank with 3 options (10 items)\n"
            "_______________ (First / Then / Finally), evaporation happens when water heats up.\n"
            "Water becomes _______________ (vapor / solid / condensation) during evaporation.\n"
            "_______________ (Next / First / Finally), condensation forms clouds.\n"
            "Clouds form when water vapor _______________ (cools / heats / evaporates) down.\n"
            "_______________ (Then / Next / First), precipitation falls as rain or snow.\n"
            "Precipitation collects in rivers and _______________ (oceans / vapor / clouds).\n"
            "_______________ (Finally / First / Next), the cycle starts again.\n"
            "Condensation happens when vapor _______________ (cools / warms / falls) in the sky.\n"
            "The water _______________ (cycle / vapor / cloud) never stops on Earth.\n"
            "Without _______________ (evaporation / rain / ocean), there would be no water cycle."
        ),
        "in_class_speaking": (
            "IN-CLASS SPEAKING ACTIVITIES — Session 3 (teacher-led)\n\n"
            "Activity 1 — Pair Speaking (3–5 min, pairs):\n"
            "  Student A: Ask 'What happens at [stage]?'\n"
            "  Student B: Explain using a sequence word and Present Simple.\n"
            "  Example: A: 'What happens first?' B: 'First, evaporation happens. The sun warms the water and it turns into vapor.'\n\n"
            "Challenge Extension (L3 — for advanced/older students):\n"
            "  [O] L3 — Fill in the blank with 3 options (10 items)\n"
            "  _______________ (First / Then / Finally), evaporation happens when water heats up.\n"
            "  Water becomes _______________ (vapor / solid / condensation) during evaporation.\n"
            "  _______________ (Next / First / Finally), condensation forms clouds.\n"
            "  Clouds form when water vapor _______________ (cools / heats / evaporates) down.\n"
            "  _______________ (Then / Next / First), precipitation falls as rain or snow.\n"
            "  Precipitation collects in rivers and _______________ (oceans / vapor / clouds).\n"
            "  _______________ (Finally / First / Next), the cycle starts again.\n"
            "  Condensation happens when vapor _______________ (cools / warms / falls) in the sky.\n"
            "  The water _______________ (cycle / vapor / cloud) never stops on Earth.\n"
            "  Without _______________ (evaporation / rain / ocean), there would be no water cycle."
        ),
    },
},

}  # end SCRIPTS


def inject_week(week_num: int):
    pub_path = PUB / f"W{week_num}.json"
    mcp_path = MCP / f"W{week_num}.json"

    data = json.loads(pub_path.read_text())
    tc   = data["teacher_contents"]        # list of 3 session dicts

    sessions = ["s1", "s2", "s3"]
    for i, sk in enumerate(sessions):
        slot = SCRIPTS[week_num][sk]
        ls_text = slot["listening_script"]
        if ls_text:
            if "listening_script" not in tc[i] or not isinstance(tc[i]["listening_script"], dict):
                tc[i]["listening_script"] = {}
            tc[i]["listening_script"]["text"] = ls_text

        if slot["speaking_notes"]:
            tc[i]["speaking_notes"] = slot["speaking_notes"]

        if slot["in_class_speaking"]:
            tc[i]["in_class_speaking"] = slot["in_class_speaking"]

    out = json.dumps(data, ensure_ascii=False, indent=2)
    pub_path.write_text(out)
    mcp_path.write_text(out)
    print(f"  W{week_num} ✓ — scripts injected into JSON (public + mcp-server)")


def main():
    weeks = sorted(SCRIPTS.keys())
    print(f"Injecting audio scripts for W{weeks[0]}–W{weeks[-1]}...\n")
    for w in weeks:
        inject_week(w)

    print("\nRegenerating Lesson Plan DOCX files...")
    from pipeline.gen_lp_docx import generate_lp_docx
    for w in weeks:
        lp = generate_lp_docx(w)
        print(f"  W{w} [DOCX] → {lp.name}")

    print("\nRunning validation...")
    import subprocess, sys
    result = subprocess.run(
        [sys.executable, "pipeline/validate_lesson_plan.py"] + [str(w) for w in weeks],
        capture_output=True, text=True
    )
    print(result.stdout)
    if result.stderr:
        print(result.stderr)


if __name__ == "__main__":
    main()
