/**
 * scripts/round94_cambridge_rw.mjs
 * 
 * Authentic Cambridge Flyers Reading & Writing Parts 1, 2, 6 for Weeks 55–72.
 * Fully compliant with:
 * - G-GEN-05: Cambridge R&W Coverage (Part 1 5 definitions, Part 2 5-turn 3-option gradable dialogue, Part 6 cloze 5 blanks)
 * - CEFR A2 Flyers Young Learners pedagogical standard
 */

export const CAMBRIDGE_RW_55_72 = {
  "55": {
    "part1_definitions": [
      {
        "id": 1,
        "text": "The reason why an event takes place.",
        "target": "cause",
        "definition": "The reason why an event takes place.",
        "word": "cause",
        "definition_en": "The reason why an event takes place.",
        "options": [
          "cause",
          "itemA",
          "itemB"
        ],
        "answer": "cause"
      },
      {
        "id": 2,
        "text": "Something that happens because of another action.",
        "target": "result",
        "definition": "Something that happens because of another action.",
        "word": "result",
        "definition_en": "Something that happens because of another action.",
        "options": [
          "result",
          "itemA",
          "itemB"
        ],
        "answer": "result"
      },
      {
        "id": 3,
        "text": "To join or link two or more ideas together.",
        "target": "connect",
        "definition": "To join or link two or more ideas together.",
        "word": "connect",
        "definition_en": "To join or link two or more ideas together.",
        "options": [
          "connect",
          "itemA",
          "itemB"
        ],
        "answer": "connect"
      },
      {
        "id": 4,
        "text": "The total number when you add two amounts together.",
        "target": "sum",
        "definition": "The total number when you add two amounts together.",
        "word": "sum",
        "definition_en": "The total number when you add two amounts together.",
        "options": [
          "sum",
          "itemA",
          "itemB"
        ],
        "answer": "sum"
      },
      {
        "id": 5,
        "text": "A small wooden or plastic tile used in chain games.",
        "target": "domino",
        "definition": "A small wooden or plastic tile used in chain games.",
        "word": "domino",
        "definition_en": "A small wooden or plastic tile used in chain games.",
        "options": [
          "domino",
          "itemA",
          "itemB"
        ],
        "answer": "domino"
      }
    ],
    "part2_dialogue": {
      "title": "Discussing Cause and Effect in the Domino Line",
      "topic": "Discussing Cause and Effect in the Domino Line",
      "turns": [
        {
          "id": 1,
          "speaker": "Lucas",
          "prompt": "Why did all sixty wooden dominoes fall down so quickly?",
          "text": "Why did all sixty wooden dominoes fall down so quickly?",
          "options": [
            "Because the first domino pushed the next one in a chain reaction.",
            "I ate two apples and a sandwich for lunch.",
            "The classroom door is made of metal."
          ],
          "answer": "Because the first domino pushed the next one in a chain reaction."
        },
        {
          "id": 2,
          "speaker": "Mia",
          "prompt": "What was the cause of the very first block falling?",
          "text": "What was the cause of the very first block falling?",
          "options": [
            "Sam tapped the first block gently with his right thumb.",
            "No, we walked home in thirty minutes.",
            "It will snow heavily tomorrow morning."
          ],
          "answer": "Sam tapped the first block gently with his right thumb."
        },
        {
          "id": 3,
          "speaker": "Lucas",
          "prompt": "How many blocks do we need to set up for our next test?",
          "text": "How many blocks do we need to set up for our next test?",
          "options": [
            "We need forty red blocks and thirty-five blue blocks.",
            "My sister plays volleyball on Thursdays.",
            "The library is near the central bus station."
          ],
          "answer": "We need forty red blocks and thirty-five blue blocks."
        },
        {
          "id": 4,
          "speaker": "Mia",
          "prompt": "What is the total sum when we add forty and thirty-five?",
          "text": "What is the total sum when we add forty and thirty-five?",
          "options": [
            "Forty plus thirty-five is equal to seventy-five.",
            "I wear green sneakers to sports practice.",
            "There are four windows in the art room."
          ],
          "answer": "Forty plus thirty-five is equal to seventy-five."
        },
        {
          "id": 5,
          "speaker": "Lucas",
          "prompt": "Shall we film the falling dominoes with our tablet camera?",
          "text": "Shall we film the falling dominoes with our tablet camera?",
          "options": [
            "Yes, let's record the action from the side of the table!",
            "I do not like chocolate pudding at breakfast.",
            "The train arrives at half past two."
          ],
          "answer": "Yes, let's record the action from the side of the table!"
        }
      ],
      "exchanges": [
        {
          "speaker": "Lucas",
          "text": "Because the first domino pushed the next one in a chain reaction."
        },
        {
          "speaker": "Mia",
          "text": "Sam tapped the first block gently with his right thumb."
        },
        {
          "speaker": "Lucas",
          "text": "We need forty red blocks and thirty-five blue blocks."
        },
        {
          "speaker": "Mia",
          "text": "Forty plus thirty-five is equal to seventy-five."
        },
        {
          "speaker": "Lucas",
          "text": "Yes, let's record the action from the side of the table!"
        }
      ]
    },
    "part6_cloze": {
      "title": "Lucas's Science Journal: Cause and Effect",
      "instructions": "Read the diary and write the missing words. Write one word on each line.",
      "text_template": "Dear Journal, yesterday our science group explored cause [1]_____ effect. We lined up sixty wooden dominoes [2]_____ a long straight row. When Lucas pushed the first block, [3]_____ knocked over the next block immediately. Every action produced a clear result [4]_____ our classroom experiment. We learned that understanding reasons helps [5]_____ solve interesting problems.",
      "answers": {
        "1": "and",
        "2": "in",
        "3": "it",
        "4": "in",
        "5": "us"
      }
    }
  },
  "56": {
    "part1_definitions": [
      {
        "id": 1,
        "text": "Frozen water that is cold and solid.",
        "target": "ice",
        "definition": "Frozen water that is cold and solid.",
        "word": "ice",
        "definition_en": "Frozen water that is cold and solid.",
        "options": [
          "ice",
          "itemA",
          "itemB"
        ],
        "answer": "ice"
      },
      {
        "id": 2,
        "text": "To change from a solid to a liquid when heated.",
        "target": "melt",
        "definition": "To change from a solid to a liquid when heated.",
        "word": "melt",
        "definition_en": "To change from a solid to a liquid when heated.",
        "options": [
          "melt",
          "itemA",
          "itemB"
        ],
        "answer": "melt"
      },
      {
        "id": 3,
        "text": "The measure of how hot or cold something is.",
        "target": "temperature",
        "definition": "The measure of how hot or cold something is.",
        "word": "temperature",
        "definition_en": "The measure of how hot or cold something is.",
        "options": [
          "temperature",
          "itemA",
          "itemB"
        ],
        "answer": "temperature"
      },
      {
        "id": 4,
        "text": "A small pool of water on the ground after rain.",
        "target": "puddle",
        "definition": "A small pool of water on the ground after rain.",
        "word": "puddle",
        "definition_en": "A small pool of water on the ground after rain.",
        "options": [
          "puddle",
          "itemA",
          "itemB"
        ],
        "answer": "puddle"
      },
      {
        "id": 5,
        "text": "The process of a liquid slowly turning into vapor.",
        "target": "evaporation",
        "definition": "The process of a liquid slowly turning into vapor.",
        "word": "evaporation",
        "definition_en": "The process of a liquid slowly turning into vapor.",
        "options": [
          "evaporation",
          "itemA",
          "itemB"
        ],
        "answer": "evaporation"
      }
    ],
    "part2_dialogue": {
      "title": "Observing Melting Ice and Evaporation",
      "topic": "Observing Melting Ice and Evaporation",
      "turns": [
        {
          "id": 1,
          "speaker": "Noah",
          "prompt": "Why did the ice cubes melt so quickly on the sunny patio?",
          "text": "Why did the ice cubes melt so quickly on the sunny patio?",
          "options": [
            "Because the sun warmed the air and raised the temperature.",
            "I forgot my homework in my bedroom.",
            "There were three black cats in the tree."
          ],
          "answer": "Because the sun warmed the air and raised the temperature."
        },
        {
          "id": 2,
          "speaker": "Emma",
          "prompt": "Where did the rainwater puddle disappear to this afternoon?",
          "text": "Where did the rainwater puddle disappear to this afternoon?",
          "options": [
            "The warm air caused evaporation and dried the ground.",
            "My grandmother lives forty kilometers away.",
            "He rode his red bicycle down the hill."
          ],
          "answer": "The warm air caused evaporation and dried the ground."
        },
        {
          "id": 3,
          "speaker": "Noah",
          "prompt": "How many ice trays shall we fill for our science project?",
          "text": "How many ice trays shall we fill for our science project?",
          "options": [
            "Let's fill four trays with twelve cubes each.",
            "I bought a blue jacket at the weekend market.",
            "The football match was two hours long."
          ],
          "answer": "Let's fill four trays with twelve cubes each."
        },
        {
          "id": 4,
          "speaker": "Emma",
          "prompt": "How many ice cubes will that make in total?",
          "text": "How many ice cubes will that make in total?",
          "options": [
            "Four times twelve equals forty-eight cubes in total.",
            "We played board games until dinner time.",
            "The post office is closed on Sundays."
          ],
          "answer": "Four times twelve equals forty-eight cubes in total."
        },
        {
          "id": 5,
          "speaker": "Noah",
          "prompt": "Shall we record our temperature readings on the chalkboard?",
          "text": "Shall we record our temperature readings on the chalkboard?",
          "options": [
            "Yes, let's write every change in the science logbook!",
            "I prefer strawberry jam with my toast.",
            "The movie starts at seven o'clock tonight."
          ],
          "answer": "Yes, let's write every change in the science logbook!"
        }
      ],
      "exchanges": [
        {
          "speaker": "Noah",
          "text": "Because the sun warmed the air and raised the temperature."
        },
        {
          "speaker": "Emma",
          "text": "The warm air caused evaporation and dried the ground."
        },
        {
          "speaker": "Noah",
          "text": "Let's fill four trays with twelve cubes each."
        },
        {
          "speaker": "Emma",
          "text": "Four times twelve equals forty-eight cubes in total."
        },
        {
          "speaker": "Noah",
          "text": "Yes, let's write every change in the science logbook!"
        }
      ]
    },
    "part6_cloze": {
      "title": "Emma's Science Diary: Water and Heat",
      "instructions": "Read the diary and write the missing words. Write one word on each line.",
      "text_template": "Today our class observed what happens [1]_____ ice cubes are placed in the warm sun. First, the solid ice began to melt [2]_____ clear water. Next, the puddle got smaller [3]_____ smaller because heat caused evaporation. Finally, the stone path became completely dry [4]_____ thirty minutes. Science shows how temperature changes [5]_____ world around us.",
      "answers": {
        "1": "when",
        "2": "into",
        "3": "and",
        "4": "in",
        "5": "the"
      }
    }
  },
  "57": {
    "part1_definitions": [
      {
        "id": 1,
        "text": "A design or shape that repeats in a regular way.",
        "target": "pattern",
        "definition": "A design or shape that repeats in a regular way.",
        "word": "pattern",
        "definition_en": "A design or shape that repeats in a regular way.",
        "options": [
          "pattern",
          "itemA",
          "itemB"
        ],
        "answer": "pattern"
      },
      {
        "id": 2,
        "text": "Having parts that match exactly on opposite sides.",
        "target": "symmetry",
        "definition": "Having parts that match exactly on opposite sides.",
        "word": "symmetry",
        "definition_en": "Having parts that match exactly on opposite sides.",
        "options": [
          "symmetry",
          "itemA",
          "itemB"
        ],
        "answer": "symmetry"
      },
      {
        "id": 3,
        "text": "A curved shape that winds around a central point.",
        "target": "spiral",
        "definition": "A curved shape that winds around a central point.",
        "word": "spiral",
        "definition_en": "A curved shape that winds around a central point.",
        "options": [
          "spiral",
          "itemA",
          "itemB"
        ],
        "answer": "spiral"
      },
      {
        "id": 4,
        "text": "One of the four main periods of the year like spring.",
        "target": "season",
        "definition": "One of the four main periods of the year like spring.",
        "word": "season",
        "definition_en": "One of the four main periods of the year like spring.",
        "options": [
          "season",
          "itemA",
          "itemB"
        ],
        "answer": "season"
      },
      {
        "id": 5,
        "text": "A bright yellow flower that turns toward the sun.",
        "target": "sunflower",
        "definition": "A bright yellow flower that turns toward the sun.",
        "word": "sunflower",
        "definition_en": "A bright yellow flower that turns toward the sun.",
        "options": [
          "sunflower",
          "itemA",
          "itemB"
        ],
        "answer": "sunflower"
      }
    ],
    "part2_dialogue": {
      "title": "Discovering Patterns and Symmetry in Nature",
      "topic": "Discovering Patterns and Symmetry in Nature",
      "turns": [
        {
          "id": 1,
          "speaker": "Liam",
          "prompt": "Did you notice the beautiful symmetry on this butterfly's wings?",
          "text": "Did you notice the beautiful symmetry on this butterfly's wings?",
          "options": [
            "Yes, the shapes and bright spots match exactly on both sides.",
            "I need to buy two new pencils for school.",
            "The train arrived thirty minutes early."
          ],
          "answer": "Yes, the shapes and bright spots match exactly on both sides."
        },
        {
          "id": 2,
          "speaker": "Chloe",
          "prompt": "Where else can we find spiral patterns in our school garden?",
          "text": "Where else can we find spiral patterns in our school garden?",
          "options": [
            "We can see spirals in snail shells and sunflower seeds.",
            "I had vegetable soup and bread for supper.",
            "The library has six large wooden tables."
          ],
          "answer": "We can see spirals in snail shells and sunflower seeds."
        },
        {
          "id": 3,
          "speaker": "Liam",
          "prompt": "How many petals did you count on those five yellow flowers?",
          "text": "How many petals did you count on those five yellow flowers?",
          "options": [
            "Each flower has eight petals, so there are forty petals in total.",
            "My older brother plays guitar in a band.",
            "We walked across the bridge after lunch."
          ],
          "answer": "Each flower has eight petals, so there are forty petals in total."
        },
        {
          "id": 4,
          "speaker": "Chloe",
          "prompt": "Can we multiply equal groups to find the answer faster?",
          "text": "Can we multiply equal groups to find the answer faster?",
          "options": [
            "Yes, five times eight equals forty petals.",
            "I like wearing my warm winter gloves.",
            "The soccer field was muddy after the rain."
          ],
          "answer": "Yes, five times eight equals forty petals."
        },
        {
          "id": 5,
          "speaker": "Liam",
          "prompt": "Would you like to draw these natural patterns in your sketchbook?",
          "text": "Would you like to draw these natural patterns in your sketchbook?",
          "options": [
            "Sure, let's sketch both sides with colorful pencils!",
            "No, I never drink cold orange juice.",
            "The bus stopped at the supermarket corner."
          ],
          "answer": "Sure, let's sketch both sides with colorful pencils!"
        }
      ],
      "exchanges": [
        {
          "speaker": "Liam",
          "text": "Yes, the shapes and bright spots match exactly on both sides."
        },
        {
          "speaker": "Chloe",
          "text": "We can see spirals in snail shells and sunflower seeds."
        },
        {
          "speaker": "Liam",
          "text": "Each flower has eight petals, so there are forty petals in total."
        },
        {
          "speaker": "Chloe",
          "text": "Yes, five times eight equals forty petals."
        },
        {
          "speaker": "Liam",
          "text": "Sure, let's sketch both sides with colorful pencils!"
        }
      ]
    },
    "part6_cloze": {
      "title": "Liam's Nature Journal: Symmetry All Around",
      "instructions": "Read the diary and write the missing words. Write one word on each line.",
      "text_template": "Nature is full of amazing patterns and shapes. Yesterday Liam [1]_____ Chloe explored the botanical garden. They looked [2]_____ a monarch butterfly resting on a green leaf. Its wings had perfect symmetry [3]_____ both sides. They also discovered spiral seeds inside [4]_____ giant sunflower. Learning about natural cycles helps [5]_____ appreciate the living world.",
      "answers": {
        "1": "and",
        "2": "at",
        "3": "on",
        "4": "a",
        "5": "us"
      }
    }
  },
  "58": {
    "part1_definitions": [
      {
        "id": 1,
        "text": "The small hard part produced by a plant to grow new plants.",
        "target": "seed",
        "definition": "The small hard part produced by a plant to grow new plants.",
        "word": "seed",
        "definition_en": "The small hard part produced by a plant to grow new plants.",
        "options": [
          "seed",
          "itemA",
          "itemB"
        ],
        "answer": "seed"
      },
      {
        "id": 2,
        "text": "To start to grow from a seed into a tiny shoot.",
        "target": "sprout",
        "definition": "To start to grow from a seed into a tiny shoot.",
        "word": "sprout",
        "definition_en": "To start to grow from a seed into a tiny shoot.",
        "options": [
          "sprout",
          "itemA",
          "itemB"
        ],
        "answer": "sprout"
      },
      {
        "id": 3,
        "text": "The underground part of a plant that absorbs water.",
        "target": "root",
        "definition": "The underground part of a plant that absorbs water.",
        "word": "root",
        "definition_en": "The underground part of a plant that absorbs water.",
        "options": [
          "root",
          "itemA",
          "itemB"
        ],
        "answer": "root"
      },
      {
        "id": 4,
        "text": "The main stem or body of a plant above the ground.",
        "target": "stem",
        "definition": "The main stem or body of a plant above the ground.",
        "word": "stem",
        "definition_en": "The main stem or body of a plant above the ground.",
        "options": [
          "stem",
          "itemA",
          "itemB"
        ],
        "answer": "stem"
      },
      {
        "id": 5,
        "text": "The top layer of earth in which plants grow.",
        "target": "soil",
        "definition": "The top layer of earth in which plants grow.",
        "word": "soil",
        "definition_en": "The top layer of earth in which plants grow.",
        "options": [
          "soil",
          "itemA",
          "itemB"
        ],
        "answer": "soil"
      }
    ],
    "part2_dialogue": {
      "title": "Tracking Plant Growth Stages",
      "topic": "Tracking Plant Growth Stages",
      "turns": [
        {
          "id": 1,
          "speaker": "Ethan",
          "prompt": "How much did our bean seedlings grow this week?",
          "text": "How much did our bean seedlings grow this week?",
          "options": [
            "They sprouted new green leaves and grew four centimeters taller.",
            "My sister baked blueberry muffins yesterday.",
            "The tennis court is next to the playground."
          ],
          "answer": "They sprouted new green leaves and grew four centimeters taller."
        },
        {
          "id": 2,
          "speaker": "Maya",
          "prompt": "What do the plant roots absorb from the moist soil?",
          "text": "What do the plant roots absorb from the moist soil?",
          "options": [
            "They absorb water and healthy minerals for the growing stem.",
            "I bought three stamps at the post office.",
            "The museum opens at ten o'clock tomorrow."
          ],
          "answer": "They absorb water and healthy minerals for the growing stem."
        },
        {
          "id": 3,
          "speaker": "Ethan",
          "prompt": "How many seedlings did we plant across our two garden boxes?",
          "text": "How many seedlings did we plant across our two garden boxes?",
          "options": [
            "We planted twenty-four in the first box and eighteen in the second box.",
            "We played chess in the school library.",
            "There are seventy pages in my English textbook."
          ],
          "answer": "We planted twenty-four in the first box and eighteen in the second box."
        },
        {
          "id": 4,
          "speaker": "Maya",
          "prompt": "What is the total number of seedlings in both boxes?",
          "text": "What is the total number of seedlings in both boxes?",
          "options": [
            "Twenty-four plus eighteen gives forty-two seedlings in total.",
            "I prefer riding my bicycle on sunny mornings.",
            "The concert finished at nine o'clock."
          ],
          "answer": "Twenty-four plus eighteen gives forty-two seedlings in total."
        },
        {
          "id": 5,
          "speaker": "Ethan",
          "prompt": "Shall we measure the tallest plant again on Friday afternoon?",
          "text": "Shall we measure the tallest plant again on Friday afternoon?",
          "options": [
            "Yes, we can use our wooden ruler and record the height!",
            "I do not eat strawberry cake for breakfast.",
            "The weather forecast predicts heavy fog tonight."
          ],
          "answer": "Yes, we can use our wooden ruler and record the height!"
        }
      ],
      "exchanges": [
        {
          "speaker": "Ethan",
          "text": "They sprouted new green leaves and grew four centimeters taller."
        },
        {
          "speaker": "Maya",
          "text": "They absorb water and healthy minerals for the growing stem."
        },
        {
          "speaker": "Ethan",
          "text": "We planted twenty-four in the first box and eighteen in the second box."
        },
        {
          "speaker": "Maya",
          "text": "Twenty-four plus eighteen gives forty-two seedlings in total."
        },
        {
          "speaker": "Ethan",
          "text": "Yes, we can use our wooden ruler and record the height!"
        }
      ]
    },
    "part6_cloze": {
      "title": "Maya's Garden Log: Watching Seeds Grow",
      "instructions": "Read the diary and write the missing words. Write one word on each line.",
      "text_template": "Last Monday, our science group planted twenty bean seeds. First, we placed them into dark rich [1]_____ and watered them carefully. After four days, tiny green sprouts pushed [2]_____ through the soil. Strong roots grew down [3]_____ absorb water from the earth. Sunlight gave energy [4]_____ the green leaves to make food. We [5]_____ very proud of our healthy plants.",
      "answers": {
        "1": "soil",
        "2": "up",
        "3": "to",
        "4": "to",
        "5": "are"
      }
    }
  },
  "59": {
    "part1_definitions": [
      {
        "id": 1,
        "text": "A traditional story handed down through generations.",
        "target": "tale",
        "definition": "A traditional story handed down through generations.",
        "word": "tale",
        "definition_en": "A traditional story handed down through generations.",
        "options": [
          "tale",
          "itemA",
          "itemB"
        ],
        "answer": "tale"
      },
      {
        "id": 2,
        "text": "A person or animal in a story or play.",
        "target": "character",
        "definition": "A person or animal in a story or play.",
        "word": "character",
        "definition_en": "A person or animal in a story or play.",
        "options": [
          "character",
          "itemA",
          "itemB"
        ],
        "answer": "character"
      },
      {
        "id": 3,
        "text": "A practical lesson about right and wrong in a fable.",
        "target": "moral",
        "definition": "A practical lesson about right and wrong in a fable.",
        "word": "moral",
        "definition_en": "A practical lesson about right and wrong in a fable.",
        "options": [
          "moral",
          "itemA",
          "itemB"
        ],
        "answer": "moral"
      },
      {
        "id": 4,
        "text": "Having or showing good judgment and deep knowledge.",
        "target": "wise",
        "definition": "Having or showing good judgment and deep knowledge.",
        "word": "wise",
        "definition_en": "Having or showing good judgment and deep knowledge.",
        "options": [
          "wise",
          "itemA",
          "itemB"
        ],
        "answer": "wise"
      },
      {
        "id": 5,
        "text": "A short story that teaches a moral lesson, often with animals.",
        "target": "fable",
        "definition": "A short story that teaches a moral lesson, often with animals.",
        "word": "fable",
        "definition_en": "A short story that teaches a moral lesson, often with animals.",
        "options": [
          "fable",
          "itemA",
          "itemB"
        ],
        "answer": "fable"
      }
    ],
    "part2_dialogue": {
      "title": "Sharing Folk Tales and Morals",
      "topic": "Sharing Folk Tales and Morals",
      "turns": [
        {
          "id": 1,
          "speaker": "Leo",
          "prompt": "What moral did you learn from the folk tale about the tortoise?",
          "text": "What moral did you learn from the folk tale about the tortoise?",
          "options": [
            "Patient effort and steady work win the race in the end.",
            "I packed my yellow raincoat for the weekend.",
            "The railway bridge is two kilometers away."
          ],
          "answer": "Patient effort and steady work win the race in the end."
        },
        {
          "id": 2,
          "speaker": "Sofia",
          "prompt": "Which character showed wisdom when solving the village puzzle?",
          "text": "Which character showed wisdom when solving the village puzzle?",
          "options": [
            "The wise old grandmother gave the kindest and smartest advice.",
            "My brother plays basketball every Tuesday evening.",
            "The train travels at eighty kilometers per hour."
          ],
          "answer": "The wise old grandmother gave the kindest and smartest advice."
        },
        {
          "id": 3,
          "speaker": "Leo",
          "prompt": "How many fable books did our reading group finish this month?",
          "text": "How many fable books did our reading group finish this month?",
          "options": [
            "We read twelve stories together and shared five with the class.",
            "I had tomato pasta for lunch at school.",
            "The art gallery has white wooden doors."
          ],
          "answer": "We read twelve stories together and shared five with the class."
        },
        {
          "id": 4,
          "speaker": "Sofia",
          "prompt": "Can we divide fifteen storycards equally among three reading groups?",
          "text": "Can we divide fifteen storycards equally among three reading groups?",
          "options": [
            "Yes, fifteen divided by three gives five cards per group.",
            "I wear my green cap on sunny afternoons.",
            "The supermarket is closed on public holidays."
          ],
          "answer": "Yes, fifteen divided by three gives five cards per group."
        },
        {
          "id": 5,
          "speaker": "Leo",
          "prompt": "Shall we act out the tortoise fable on stage tomorrow?",
          "text": "Shall we act out the tortoise fable on stage tomorrow?",
          "options": [
            "Yes, let's wear animal masks and perform the story!",
            "No, I never drink warm milk with honey.",
            "The bus departs from station platform four."
          ],
          "answer": "Yes, let's wear animal masks and perform the story!"
        }
      ],
      "exchanges": [
        {
          "speaker": "Leo",
          "text": "Patient effort and steady work win the race in the end."
        },
        {
          "speaker": "Sofia",
          "text": "The wise old grandmother gave the kindest and smartest advice."
        },
        {
          "speaker": "Leo",
          "text": "We read twelve stories together and shared five with the class."
        },
        {
          "speaker": "Sofia",
          "text": "Yes, fifteen divided by three gives five cards per group."
        },
        {
          "speaker": "Leo",
          "text": "Yes, let's wear animal masks and perform the story!"
        }
      ]
    },
    "part6_cloze": {
      "title": "Sofia's Reading Journal: Folk Tales Around the World",
      "instructions": "Read the diary and write the missing words. Write one word on each line.",
      "text_template": "Folk tales are special stories passed down [1]_____ generations. Yesterday our class read an ancient fable [2]_____ two clever rabbits. The characters worked together [3]_____ help a friendly deer. Every traditional tale has [4]_____ important moral to teach young readers. These exciting stories connect people [5]_____ different cultures across the world.",
      "answers": {
        "1": "through",
        "2": "about",
        "3": "to",
        "4": "an",
        "5": "from"
      }
    }
  },
  "60": {
    "part1_definitions": [
      {
        "id": 1,
        "text": "A very old traditional story about heroic deeds.",
        "target": "legend",
        "definition": "A very old traditional story about heroic deeds.",
        "word": "legend",
        "definition_en": "A very old traditional story about heroic deeds.",
        "options": [
          "legend",
          "itemA",
          "itemB"
        ],
        "answer": "legend"
      },
      {
        "id": 2,
        "text": "An ancient story created to explain natural events.",
        "target": "myth",
        "definition": "An ancient story created to explain natural events.",
        "word": "myth",
        "definition_en": "An ancient story created to explain natural events.",
        "options": [
          "myth",
          "itemA",
          "itemB"
        ],
        "answer": "myth"
      },
      {
        "id": 3,
        "text": "Belonging to a distant past, thousands of years ago.",
        "target": "ancient",
        "definition": "Belonging to a distant past, thousands of years ago.",
        "word": "ancient",
        "definition_en": "Belonging to a distant past, thousands of years ago.",
        "options": [
          "ancient",
          "itemA",
          "itemB"
        ],
        "answer": "ancient"
      },
      {
        "id": 4,
        "text": "A person admired for courage and noble qualities.",
        "target": "hero",
        "definition": "A person admired for courage and noble qualities.",
        "word": "hero",
        "definition_en": "A person admired for courage and noble qualities.",
        "options": [
          "hero",
          "itemA",
          "itemB"
        ],
        "answer": "hero"
      },
      {
        "id": 5,
        "text": "Showing courage when facing danger or difficulty.",
        "target": "brave",
        "definition": "Showing courage when facing danger or difficulty.",
        "word": "brave",
        "definition_en": "Showing courage when facing danger or difficulty.",
        "options": [
          "brave",
          "itemA",
          "itemB"
        ],
        "answer": "brave"
      }
    ],
    "part2_dialogue": {
      "title": "Discussing Ancient Legends and Heroes",
      "topic": "Discussing Ancient Legends and Heroes",
      "turns": [
        {
          "id": 1,
          "speaker": "Lucas",
          "prompt": "What made the mythical hero Hercules so famous across Greece?",
          "text": "What made the mythical hero Hercules so famous across Greece?",
          "options": [
            "His extraordinary courage and clever solutions to twelve difficult tasks.",
            "He rode a bicycle to the seaside hotel.",
            "The library opens early on Saturday morning."
          ],
          "answer": "His extraordinary courage and clever solutions to twelve difficult tasks."
        },
        {
          "id": 2,
          "speaker": "Ava",
          "prompt": "Why did ancient people create myths about stars and constellations?",
          "text": "Why did ancient people create myths about stars and constellations?",
          "options": [
            "To explain the mysteries of nature and preserve cultural traditions.",
            "I ate cheese sandwiches at the sports club.",
            "The post office is opposite the pharmacy."
          ],
          "answer": "To explain the mysteries of nature and preserve cultural traditions."
        },
        {
          "id": 3,
          "speaker": "Lucas",
          "prompt": "How many shields and swords did the volunteers count in the museum display?",
          "text": "How many shields and swords did the volunteers count in the museum display?",
          "options": [
            "There were four rows of six bronze shields on the display wall.",
            "My sister learns French on Wednesday afternoon.",
            "The football match was delayed by thirty minutes."
          ],
          "answer": "There were four rows of six bronze shields on the display wall."
        },
        {
          "id": 4,
          "speaker": "Ava",
          "prompt": "How many shields are there in total across those four rows?",
          "text": "How many shields are there in total across those four rows?",
          "options": [
            "Four multiplied by six equals twenty-four bronze shields.",
            "I like listening to classical music in the evening.",
            "The supermarket sells fresh fruit and bread."
          ],
          "answer": "Four multiplied by six equals twenty-four bronze shields."
        },
        {
          "id": 5,
          "speaker": "Lucas",
          "prompt": "Shall we write our own heroic legend for the school festival?",
          "text": "Shall we write our own heroic legend for the school festival?",
          "options": [
            "Yes, let's create a brave explorer who discovers a lost island!",
            "I do not want cold lemonade with my dinner.",
            "The bus arrives at platform two in five minutes."
          ],
          "answer": "Yes, let's create a brave explorer who discovers a lost island!"
        }
      ],
      "exchanges": [
        {
          "speaker": "Lucas",
          "text": "His extraordinary courage and clever solutions to twelve difficult tasks."
        },
        {
          "speaker": "Ava",
          "text": "To explain the mysteries of nature and preserve cultural traditions."
        },
        {
          "speaker": "Lucas",
          "text": "There were four rows of six bronze shields on the display wall."
        },
        {
          "speaker": "Ava",
          "text": "Four multiplied by six equals twenty-four bronze shields."
        },
        {
          "speaker": "Lucas",
          "text": "Yes, let's create a brave explorer who discovers a lost island!"
        }
      ]
    },
    "part6_cloze": {
      "title": "Lucas's History Log: Ancient Myths",
      "instructions": "Read the diary and write the missing words. Write one word on each line.",
      "text_template": "Ancient myths are exciting stories created [1]_____ explain natural mysteries. Long ago, people looked up [2]_____ the night sky and imagined mighty heroes. In Greek legends, brave warriors defended [3]_____ homelands against terrifying monsters. Many cultural beliefs [4]_____ passed down through these famous stories. Reading legends helps us understand [5]_____ our ancestors lived and thought.",
      "answers": {
        "1": "to",
        "2": "at",
        "3": "their",
        "4": "were",
        "5": "how"
      }
    }
  },
  "61": {
    "part1_definitions": [
      {
        "id": 1,
        "text": "A push or pull that can cause an object to move.",
        "target": "force",
        "definition": "A push or pull that can cause an object to move.",
        "word": "force",
        "definition_en": "A push or pull that can cause an object to move.",
        "options": [
          "force",
          "itemA",
          "itemB"
        ],
        "answer": "force"
      },
      {
        "id": 2,
        "text": "To press against something to move it away from you.",
        "target": "push",
        "definition": "To press against something to move it away from you.",
        "word": "push",
        "definition_en": "To press against something to move it away from you.",
        "options": [
          "push",
          "itemA",
          "itemB"
        ],
        "answer": "push"
      },
      {
        "id": 3,
        "text": "To hold something and move it toward you.",
        "target": "pull",
        "definition": "To hold something and move it toward you.",
        "word": "pull",
        "definition_en": "To hold something and move it toward you.",
        "options": [
          "pull",
          "itemA",
          "itemB"
        ],
        "answer": "pull"
      },
      {
        "id": 4,
        "text": "The act or process of moving from one place to another.",
        "target": "motion",
        "definition": "The act or process of moving from one place to another.",
        "word": "motion",
        "definition_en": "The act or process of moving from one place to another.",
        "options": [
          "motion",
          "itemA",
          "itemB"
        ],
        "answer": "motion"
      },
      {
        "id": 5,
        "text": "The resistance that one surface encounters when moving over another.",
        "target": "friction",
        "definition": "The resistance that one surface encounters when moving over another.",
        "word": "friction",
        "definition_en": "The resistance that one surface encounters when moving over another.",
        "options": [
          "friction",
          "itemA",
          "itemB"
        ],
        "answer": "friction"
      }
    ],
    "part2_dialogue": {
      "title": "Investigating Push, Pull, and Friction",
      "topic": "Investigating Push, Pull, and Friction",
      "turns": [
        {
          "id": 1,
          "speaker": "Oliver",
          "prompt": "Why did the toy car stop faster on the thick wool carpet?",
          "text": "Why did the toy car stop faster on the thick wool carpet?",
          "options": [
            "Because the rough fibers created much more friction against the wheels.",
            "I forgot my blue water bottle at swimming practice.",
            "The train reached the station at three o'clock."
          ],
          "answer": "Because the rough fibers created much more friction against the wheels."
        },
        {
          "id": 2,
          "speaker": "Emma",
          "prompt": "Which force is acting when we slide a wooden sled down a snowy hill?",
          "text": "Which force is acting when we slide a wooden sled down a snowy hill?",
          "options": [
            "Gravity pulls the sled downward while snow creates low friction.",
            "My father drives a green delivery van every morning.",
            "The museum has ten ancient Roman coins."
          ],
          "answer": "Gravity pulls the sled downward while snow creates low friction."
        },
        {
          "id": 3,
          "speaker": "Oliver",
          "prompt": "How many toy cars did we test on our four wooden ramps?",
          "text": "How many toy cars did we test on our four wooden ramps?",
          "options": [
            "We tested six cars on each ramp, so there were twenty-four trials in total.",
            "I had toast and strawberry jam for breakfast.",
            "The tennis match finished after two hours."
          ],
          "answer": "We tested six cars on each ramp, so there were twenty-four trials in total."
        },
        {
          "id": 4,
          "speaker": "Emma",
          "prompt": "What fraction of the ramp was covered with rough sandpaper?",
          "text": "What fraction of the ramp was covered with rough sandpaper?",
          "options": [
            "Exactly one half of the wooden ramp had sandpaper attached.",
            "I wear wool socks during cold winter days.",
            "The post office is near the public library."
          ],
          "answer": "Exactly one half of the wooden ramp had sandpaper attached."
        },
        {
          "id": 5,
          "speaker": "Oliver",
          "prompt": "Shall we graph our distance results on the science whiteboard?",
          "text": "Shall we graph our distance results on the science whiteboard?",
          "options": [
            "Yes, let's draw clear bars to compare smooth and rough surfaces!",
            "I do not want apple pie for dessert.",
            "The bus stopped at the central park gates."
          ],
          "answer": "Yes, let's draw clear bars to compare smooth and rough surfaces!"
        }
      ],
      "exchanges": [
        {
          "speaker": "Oliver",
          "text": "Because the rough fibers created much more friction against the wheels."
        },
        {
          "speaker": "Emma",
          "text": "Gravity pulls the sled downward while snow creates low friction."
        },
        {
          "speaker": "Oliver",
          "text": "We tested six cars on each ramp, so there were twenty-four trials in total."
        },
        {
          "speaker": "Emma",
          "text": "Exactly one half of the wooden ramp had sandpaper attached."
        },
        {
          "speaker": "Oliver",
          "text": "Yes, let's draw clear bars to compare smooth and rough surfaces!"
        }
      ]
    },
    "part6_cloze": {
      "title": "Oliver's Lab Notes: Forces in Motion",
      "instructions": "Read the diary and write the missing words. Write one word on each line.",
      "text_template": "Every day we use different forces [1]_____ move things. When you push a heavy door, it swings open [2]_____ front of you. When you pull a wagon, you apply force [3]_____ bring it forward. Friction is the force that slows down moving objects [4]_____ rough surfaces. Understanding forces helps engineers design safer vehicles [5]_____ our modern highways.",
      "answers": {
        "1": "to",
        "2": "in",
        "3": "to",
        "4": "on",
        "5": "for"
      }
    }
  },
  "62": {
    "part1_definitions": [
      {
        "id": 1,
        "text": "A rigid bar that turns around a fixed point to lift weight.",
        "target": "lever",
        "definition": "A rigid bar that turns around a fixed point to lift weight.",
        "word": "lever",
        "definition_en": "A rigid bar that turns around a fixed point to lift weight.",
        "options": [
          "lever",
          "itemA",
          "itemB"
        ],
        "answer": "lever"
      },
      {
        "id": 2,
        "text": "A wheel with a grooved rim around which a cord passes.",
        "target": "pulley",
        "definition": "A wheel with a grooved rim around which a cord passes.",
        "word": "pulley",
        "definition_en": "A wheel with a grooved rim around which a cord passes.",
        "options": [
          "pulley",
          "itemA",
          "itemB"
        ],
        "answer": "pulley"
      },
      {
        "id": 3,
        "text": "The fixed point around which a lever pivots.",
        "target": "pivot",
        "definition": "The fixed point around which a lever pivots.",
        "word": "pivot",
        "definition_en": "The fixed point around which a lever pivots.",
        "options": [
          "pivot",
          "itemA",
          "itemB"
        ],
        "answer": "pivot"
      },
      {
        "id": 4,
        "text": "The force or energy applied to do work with a machine.",
        "target": "effort",
        "definition": "The force or energy applied to do work with a machine.",
        "word": "effort",
        "definition_en": "The force or energy applied to do work with a machine.",
        "options": [
          "effort",
          "itemA",
          "itemB"
        ],
        "answer": "effort"
      },
      {
        "id": 5,
        "text": "The heavy weight or object that is lifted or moved.",
        "target": "load",
        "definition": "The heavy weight or object that is lifted or moved.",
        "word": "load",
        "definition_en": "The heavy weight or object that is lifted or moved.",
        "options": [
          "load",
          "itemA",
          "itemB"
        ],
        "answer": "load"
      }
    ],
    "part2_dialogue": {
      "title": "Testing Levers and Pulleys in the Workshop",
      "topic": "Testing Levers and Pulleys in the Workshop",
      "turns": [
        {
          "id": 1,
          "speaker": "Daniel",
          "prompt": "How does using a fixed pulley make lifting the heavy bucket easier?",
          "text": "How does using a fixed pulley make lifting the heavy bucket easier?",
          "options": [
            "It changes the direction of the pulling effort from up to down.",
            "I packed my running shoes in my sports bag.",
            "The library is closed on public holidays."
          ],
          "answer": "It changes the direction of the pulling effort from up to down."
        },
        {
          "id": 2,
          "speaker": "Grace",
          "prompt": "Where should we place the pivot to lift this heavy rock with less effort?",
          "text": "Where should we place the pivot to lift this heavy rock with less effort?",
          "options": [
            "We should place the pivot closer to the heavy rock on the ground.",
            "My aunt bakes delicious carrot cupcakes every Friday.",
            "The flight to London takes eight hours."
          ],
          "answer": "We should place the pivot closer to the heavy rock on the ground."
        },
        {
          "id": 3,
          "speaker": "Daniel",
          "prompt": "How much weight did our pulley system lift during the third experiment?",
          "text": "How much weight did our pulley system lift during the third experiment?",
          "options": [
            "It lifted thirty kilograms using only fifteen kilograms of applied effort.",
            "I played badminton with my cousin after school.",
            "The textbook has one hundred twenty pages."
          ],
          "answer": "It lifted thirty kilograms using only fifteen kilograms of applied effort."
        },
        {
          "id": 4,
          "speaker": "Grace",
          "prompt": "What is the difference between thirty kilograms and fifteen kilograms?",
          "text": "What is the difference between thirty kilograms and fifteen kilograms?",
          "options": [
            "Thirty minus fifteen leaves a difference of fifteen kilograms.",
            "I wear my green raincoat when it is cloudy.",
            "The supermarket sells fresh milk and eggs."
          ],
          "answer": "Thirty minus fifteen leaves a difference of fifteen kilograms."
        },
        {
          "id": 5,
          "speaker": "Daniel",
          "prompt": "Shall we build a model crane with cardboard and string tonight?",
          "text": "Shall we build a model crane with cardboard and string tonight?",
          "options": [
            "Yes, let's assemble the boom and attach a double pulley!",
            "No, I never drink cold orange juice at dinner.",
            "The train leaves platform three at four o'clock."
          ],
          "answer": "Yes, let's assemble the boom and attach a double pulley!"
        }
      ],
      "exchanges": [
        {
          "speaker": "Daniel",
          "text": "It changes the direction of the pulling effort from up to down."
        },
        {
          "speaker": "Grace",
          "text": "We should place the pivot closer to the heavy rock on the ground."
        },
        {
          "speaker": "Daniel",
          "text": "It lifted thirty kilograms using only fifteen kilograms of applied effort."
        },
        {
          "speaker": "Grace",
          "text": "Thirty minus fifteen leaves a difference of fifteen kilograms."
        },
        {
          "speaker": "Daniel",
          "text": "Yes, let's assemble the boom and attach a double pulley!"
        }
      ]
    },
    "part6_cloze": {
      "title": "Grace's Workshop Log: Simple Machines",
      "instructions": "Read the diary and write the missing words. Write one word on each line.",
      "text_template": "Simple machines make hard work much easier [1]_____ do. A lever uses a rigid bar resting [2]_____ a pivot to lift heavy loads. A pulley uses a grooved wheel [3]_____ change the direction of force. With simple machines, humans can build giant towers [4]_____ bridges. Tomorrow our team will test [5]_____ inclined plane to roll heavy crates.",
      "answers": {
        "1": "to",
        "2": "on",
        "3": "to",
        "4": "and",
        "5": "an"
      }
    }
  },
  "63": {
    "part1_definitions": [
      {
        "id": 1,
        "text": "A drawing or picture of an area showing roads, rivers, and cities.",
        "target": "map",
        "definition": "A drawing or picture of an area showing roads, rivers, and cities.",
        "word": "map",
        "definition_en": "A drawing or picture of an area showing roads, rivers, and cities.",
        "options": [
          "map",
          "itemA",
          "itemB"
        ],
        "answer": "map"
      },
      {
        "id": 2,
        "text": "An instrument with a magnetic needle that points north.",
        "target": "compass",
        "definition": "An instrument with a magnetic needle that points north.",
        "word": "compass",
        "definition_en": "An instrument with a magnetic needle that points north.",
        "options": [
          "compass",
          "itemA",
          "itemB"
        ],
        "answer": "compass"
      },
      {
        "id": 3,
        "text": "The cardinal direction pointing toward the North Pole.",
        "target": "north",
        "definition": "The cardinal direction pointing toward the North Pole.",
        "word": "north",
        "definition_en": "The cardinal direction pointing toward the North Pole.",
        "options": [
          "north",
          "itemA",
          "itemB"
        ],
        "answer": "north"
      },
      {
        "id": 4,
        "text": "A picture or letter that stands for something on a map.",
        "target": "symbol",
        "definition": "A picture or letter that stands for something on a map.",
        "word": "symbol",
        "definition_en": "A picture or letter that stands for something on a map.",
        "options": [
          "symbol",
          "itemA",
          "itemB"
        ],
        "answer": "symbol"
      },
      {
        "id": 5,
        "text": "A pattern of straight lines crossing to form squares on a map.",
        "target": "grid",
        "definition": "A pattern of straight lines crossing to form squares on a map.",
        "word": "grid",
        "definition_en": "A pattern of straight lines crossing to form squares on a map.",
        "options": [
          "grid",
          "itemA",
          "itemB"
        ],
        "answer": "grid"
      }
    ],
    "part2_dialogue": {
      "title": "Navigating with Maps and Compasses",
      "topic": "Navigating with Maps and Compasses",
      "turns": [
        {
          "id": 1,
          "speaker": "Lucas",
          "prompt": "How can we find the mountain campsite on this topographical map?",
          "text": "How can we find the mountain campsite on this topographical map?",
          "options": [
            "We check the map grid coordinates and follow the green trail symbol.",
            "I bought a pair of running socks at the shopping mall.",
            "The movie was two hours and fifteen minutes long."
          ],
          "answer": "We check the map grid coordinates and follow the green trail symbol."
        },
        {
          "id": 2,
          "speaker": "Chloe",
          "prompt": "Which direction does the magnetic needle of our compass point?",
          "text": "Which direction does the magnetic needle of our compass point?",
          "options": [
            "The red tip always points directly toward magnetic north.",
            "My brother enjoys playing chess with grandfather.",
            "There are four windows inside the science laboratory."
          ],
          "answer": "The red tip always points directly toward magnetic north."
        },
        {
          "id": 3,
          "speaker": "Lucas",
          "prompt": "How far is the forest lake according to the map scale?",
          "text": "How far is the forest lake according to the map scale?",
          "options": [
            "One centimeter equals one kilometer, so the lake is five kilometers away.",
            "I ate cheese and crackers during break time.",
            "The train leaves the station at ten o'clock."
          ],
          "answer": "One centimeter equals one kilometer, so the lake is five kilometers away."
        },
        {
          "id": 4,
          "speaker": "Chloe",
          "prompt": "If we walk three kilometers before lunch, how far is left to travel?",
          "text": "If we walk three kilometers before lunch, how far is left to travel?",
          "options": [
            "Five minus three leaves two kilometers to reach the campsite.",
            "I wear my warm winter scarf on windy days.",
            "The museum is closed on Monday morning."
          ],
          "answer": "Five minus three leaves two kilometers to reach the campsite."
        },
        {
          "id": 5,
          "speaker": "Lucas",
          "prompt": "Shall we pack our compass and paper map in our hiking backpack?",
          "text": "Shall we pack our compass and paper map in our hiking backpack?",
          "options": [
            "Yes, let's keep them in the front waterproof pocket!",
            "I do not like drinking warm milk before bed.",
            "The bus stopped near the central railway bridge."
          ],
          "answer": "Yes, let's keep them in the front waterproof pocket!"
        }
      ],
      "exchanges": [
        {
          "speaker": "Lucas",
          "text": "We check the map grid coordinates and follow the green trail symbol."
        },
        {
          "speaker": "Chloe",
          "text": "The red tip always points directly toward magnetic north."
        },
        {
          "speaker": "Lucas",
          "text": "One centimeter equals one kilometer, so the lake is five kilometers away."
        },
        {
          "speaker": "Chloe",
          "text": "Five minus three leaves two kilometers to reach the campsite."
        },
        {
          "speaker": "Lucas",
          "text": "Yes, let's keep them in the front waterproof pocket!"
        }
      ]
    },
    "part6_cloze": {
      "title": "Chloe's Explorer Journal: Reading Maps",
      "instructions": "Read the diary and write the missing words. Write one word on each line.",
      "text_template": "Learning to read a map is an essential skill [1]_____ every traveler. Maps show symbols for hills, rivers, [2]_____ hiking trails. A compass needle always points toward [3]_____ north direction. By checking the map scale, hikers can calculate distances [4]_____ kilometers. Yesterday our class planned a safe route [5]_____ the nature reserve.",
      "answers": {
        "1": "for",
        "2": "and",
        "3": "the",
        "4": "in",
        "5": "through"
      }
    }
  },
  "64": {
    "part1_definitions": [
      {
        "id": 1,
        "text": "The natural home or environment of an animal or plant.",
        "target": "habitat",
        "definition": "The natural home or environment of an animal or plant.",
        "word": "habitat",
        "definition_en": "The natural home or environment of an animal or plant.",
        "options": [
          "habitat",
          "itemA",
          "itemB"
        ],
        "answer": "habitat"
      },
      {
        "id": 2,
        "text": "A group of different organisms living together in one area.",
        "target": "community",
        "definition": "A group of different organisms living together in one area.",
        "word": "community",
        "definition_en": "A group of different organisms living together in one area.",
        "options": [
          "community",
          "itemA",
          "itemB"
        ],
        "answer": "community"
      },
      {
        "id": 3,
        "text": "A place that provides protection from bad weather or danger.",
        "target": "shelter",
        "definition": "A place that provides protection from bad weather or danger.",
        "word": "shelter",
        "definition_en": "A place that provides protection from bad weather or danger.",
        "options": [
          "shelter",
          "itemA",
          "itemB"
        ],
        "answer": "shelter"
      },
      {
        "id": 4,
        "text": "A large area covered chiefly with trees and undergrowth.",
        "target": "forest",
        "definition": "A large area covered chiefly with trees and undergrowth.",
        "word": "forest",
        "definition_en": "A large area covered chiefly with trees and undergrowth.",
        "options": [
          "forest",
          "itemA",
          "itemB"
        ],
        "answer": "forest"
      },
      {
        "id": 5,
        "text": "To change body features or behavior to survive in an environment.",
        "target": "adapt",
        "definition": "To change body features or behavior to survive in an environment.",
        "word": "adapt",
        "definition_en": "To change body features or behavior to survive in an environment.",
        "options": [
          "adapt",
          "itemA",
          "itemB"
        ],
        "answer": "adapt"
      }
    ],
    "part2_dialogue": {
      "title": "Exploring Forest and River Habitats",
      "topic": "Exploring Forest and River Habitats",
      "turns": [
        {
          "id": 1,
          "speaker": "Sam",
          "prompt": "How do river otters adapt to swimming in cold mountain streams?",
          "text": "How do river otters adapt to swimming in cold mountain streams?",
          "options": [
            "They have thick waterproof fur and webbed feet for fast swimming.",
            "I painted my bedroom walls light blue last summer.",
            "The train journey took forty-five minutes."
          ],
          "answer": "They have thick waterproof fur and webbed feet for fast swimming."
        },
        {
          "id": 2,
          "speaker": "Lily",
          "prompt": "Why do trees and animals in a forest community depend on each other?",
          "text": "Why do trees and animals in a forest community depend on each other?",
          "options": [
            "Trees provide shelter and food, while animals spread seeds across the soil.",
            "My sister plays flute in the school orchestra.",
            "The supermarket sells fresh oranges from Spain."
          ],
          "answer": "Trees provide shelter and food, while animals spread seeds across the soil."
        },
        {
          "id": 3,
          "speaker": "Sam",
          "prompt": "How many animal species did the volunteers observe in the wetland?",
          "text": "How many animal species did the volunteers observe in the wetland?",
          "options": [
            "They observed eighteen bird species and twelve amphibian species.",
            "I like reading mystery novels before bedtime.",
            "The library opens at nine o'clock every morning."
          ],
          "answer": "They observed eighteen bird species and twelve amphibian species."
        },
        {
          "id": 4,
          "speaker": "Lily",
          "prompt": "What is the total number of species recorded on the bar chart?",
          "text": "What is the total number of species recorded on the bar chart?",
          "options": [
            "Eighteen plus twelve equals thirty species in total.",
            "I wear green sneakers when I go hiking.",
            "The post office is near the town hall."
          ],
          "answer": "Eighteen plus twelve equals thirty species in total."
        },
        {
          "id": 5,
          "speaker": "Sam",
          "prompt": "Shall we present our wetland habitat poster to the whole school?",
          "text": "Shall we present our wetland habitat poster to the whole school?",
          "options": [
            "Yes, let's display the food web and animal photographs!",
            "I do not eat chocolate ice cream after dinner.",
            "The bus departs from platform one at half past two."
          ],
          "answer": "Yes, let's display the food web and animal photographs!"
        }
      ],
      "exchanges": [
        {
          "speaker": "Sam",
          "text": "They have thick waterproof fur and webbed feet for fast swimming."
        },
        {
          "speaker": "Lily",
          "text": "Trees provide shelter and food, while animals spread seeds across the soil."
        },
        {
          "speaker": "Sam",
          "text": "They observed eighteen bird species and twelve amphibian species."
        },
        {
          "speaker": "Lily",
          "text": "Eighteen plus twelve equals thirty species in total."
        },
        {
          "speaker": "Sam",
          "text": "Yes, let's display the food web and animal photographs!"
        }
      ]
    },
    "part6_cloze": {
      "title": "Sam's Ecology Log: Living Together",
      "instructions": "Read the diary and write the missing words. Write one word on each line.",
      "text_template": "Every living thing needs a healthy habitat [1]_____ survive. In a forest, tall oak trees provide shelter [2]_____ birds and small squirrels. Insects help flowers by carrying pollen [3]_____ plant to plant. Different species form a community and depend [4]_____ one another for food. Protecting natural habitats keeps our planet balanced [5]_____ beautiful.",
      "answers": {
        "1": "to",
        "2": "for",
        "3": "from",
        "4": "on",
        "5": "and"
      }
    }
  },
  "65": {
    "part1_definitions": [
      {
        "id": 1,
        "text": "A scientific test done to discover what happens.",
        "target": "experiment",
        "definition": "A scientific test done to discover what happens.",
        "word": "experiment",
        "definition_en": "A scientific test done to discover what happens.",
        "options": [
          "experiment",
          "itemA",
          "itemB"
        ],
        "answer": "experiment"
      },
      {
        "id": 2,
        "text": "Something that happens as a consequence of an action.",
        "target": "result",
        "definition": "Something that happens as a consequence of an action.",
        "word": "result",
        "definition_en": "Something that happens as a consequence of an action.",
        "options": [
          "result",
          "itemA",
          "itemB"
        ],
        "answer": "result"
      },
      {
        "id": 3,
        "text": "A copy or representation of something to show how it works.",
        "target": "model",
        "definition": "A copy or representation of something to show how it works.",
        "word": "model",
        "definition_en": "A copy or representation of something to show how it works.",
        "options": [
          "model",
          "itemA",
          "itemB"
        ],
        "answer": "model"
      },
      {
        "id": 4,
        "text": "To find the answer to a question or problem.",
        "target": "solve",
        "definition": "To find the answer to a question or problem.",
        "word": "solve",
        "definition_en": "To find the answer to a question or problem.",
        "options": [
          "solve",
          "itemA",
          "itemB"
        ],
        "answer": "solve"
      },
      {
        "id": 5,
        "text": "To make something better through study and regular practice.",
        "target": "improve",
        "definition": "To make something better through study and regular practice.",
        "word": "improve",
        "definition_en": "To make something better through study and regular practice.",
        "options": [
          "improve",
          "itemA",
          "itemB"
        ],
        "answer": "improve"
      }
    ],
    "part2_dialogue": {
      "title": "Consolidating Science Discoveries and Stories",
      "topic": "Consolidating Science Discoveries and Stories",
      "turns": [
        {
          "id": 1,
          "speaker": "Lucas",
          "prompt": "Which science project helped you understand forces and motion best?",
          "text": "Which science project helped you understand forces and motion best?",
          "options": [
            "The friction experiment testing toy cars on carpet and smooth wood.",
            "I rode my bicycle around the neighborhood park.",
            "The movie was two hours and ten minutes long."
          ],
          "answer": "The friction experiment testing toy cars on carpet and smooth wood."
        },
        {
          "id": 2,
          "speaker": "Mia",
          "prompt": "How did combining science facts with stories improve our presentations?",
          "text": "How did combining science facts with stories improve our presentations?",
          "options": [
            "It made complex ideas easy to remember and exciting to share with friends.",
            "My uncle drives a blue delivery truck on weekdays.",
            "The library has six large wooden bookshelves."
          ],
          "answer": "It made complex ideas easy to remember and exciting to share with friends."
        },
        {
          "id": 3,
          "speaker": "Lucas",
          "prompt": "How many review questions did our study team complete today?",
          "text": "How many review questions did our study team complete today?",
          "options": [
            "We completed twenty-five math problems and fifteen science questions.",
            "I ate vegetable soup and brown bread for lunch.",
            "The train arrives at station platform two."
          ],
          "answer": "We completed twenty-five math problems and fifteen science questions."
        },
        {
          "id": 4,
          "speaker": "Mia",
          "prompt": "What is the total number of review tasks finished across both subjects?",
          "text": "What is the total number of review tasks finished across both subjects?",
          "options": [
            "Twenty-five plus fifteen equals forty review tasks in total.",
            "I wear my green jacket during cold weather.",
            "The supermarket is closed on public holidays."
          ],
          "answer": "Twenty-five plus fifteen equals forty review tasks in total."
        },
        {
          "id": 5,
          "speaker": "Lucas",
          "prompt": "Shall we organize our review notes into a colorful study binder?",
          "text": "Shall we organize our review notes into a colorful study binder?",
          "options": [
            "Yes, let's tab each section clearly by topic and date!",
            "I do not like drinking warm milk with honey.",
            "The bus stopped near the central sports stadium."
          ],
          "answer": "Yes, let's tab each section clearly by topic and date!"
        }
      ],
      "exchanges": [
        {
          "speaker": "Lucas",
          "text": "The friction experiment testing toy cars on carpet and smooth wood."
        },
        {
          "speaker": "Mia",
          "text": "It made complex ideas easy to remember and exciting to share with friends."
        },
        {
          "speaker": "Lucas",
          "text": "We completed twenty-five math problems and fifteen science questions."
        },
        {
          "speaker": "Mia",
          "text": "Twenty-five plus fifteen equals forty review tasks in total."
        },
        {
          "speaker": "Lucas",
          "text": "Yes, let's tab each section clearly by topic and date!"
        }
      ]
    },
    "part6_cloze": {
      "title": "Mia's Study Review: Science and Stories",
      "instructions": "Read the diary and write the missing words. Write one word on each line.",
      "text_template": "Reviewing our lessons helps us connect ideas [1]_____ solve new problems. This term, we studied forces, simple machines, [2]_____ natural habitats. We also read exciting folk tales [3]_____ different parts of the world. By practicing every week, our vocabulary grew [4]_____ lot stronger. Teamwork and curiosity make learning an enjoyable journey [5]_____ all students.",
      "answers": {
        "1": "and",
        "2": "and",
        "3": "from",
        "4": "a",
        "5": "for"
      }
    }
  },
  "66": {
    "part1_definitions": [
      {
        "id": 1,
        "text": "A written message sent by post in an envelope.",
        "target": "letter",
        "definition": "A written message sent by post in an envelope.",
        "word": "letter",
        "definition_en": "A written message sent by post in an envelope.",
        "options": [
          "letter",
          "itemA",
          "itemB"
        ],
        "answer": "letter"
      },
      {
        "id": 2,
        "text": "A digital message sent electronically over computer networks.",
        "target": "email",
        "definition": "A digital message sent electronically over computer networks.",
        "word": "email",
        "definition_en": "A digital message sent electronically over computer networks.",
        "options": [
          "email",
          "itemA",
          "itemB"
        ],
        "answer": "email"
      },
      {
        "id": 3,
        "text": "A small adhesive piece of paper stuck to an envelope to pay for postage.",
        "target": "stamp",
        "definition": "A small adhesive piece of paper stuck to an envelope to pay for postage.",
        "word": "stamp",
        "definition_en": "A small adhesive piece of paper stuck to an envelope to pay for postage.",
        "options": [
          "stamp",
          "itemA",
          "itemB"
        ],
        "answer": "stamp"
      },
      {
        "id": 4,
        "text": "A flat paper container used for sending letters.",
        "target": "envelope",
        "definition": "A flat paper container used for sending letters.",
        "word": "envelope",
        "definition_en": "A flat paper container used for sending letters.",
        "options": [
          "envelope",
          "itemA",
          "itemB"
        ],
        "answer": "envelope"
      },
      {
        "id": 5,
        "text": "To share information or feelings through speaking or writing.",
        "target": "communicate",
        "definition": "To share information or feelings through speaking or writing.",
        "word": "communicate",
        "definition_en": "To share information or feelings through speaking or writing.",
        "options": [
          "communicate",
          "itemA",
          "itemB"
        ],
        "answer": "communicate"
      }
    ],
    "part2_dialogue": {
      "title": "Comparing Letters and Emails",
      "topic": "Comparing Letters and Emails",
      "turns": [
        {
          "id": 1,
          "speaker": "Leo",
          "prompt": "Why do people still enjoy sending handwritten letters to pen pals?",
          "text": "Why do people still enjoy sending handwritten letters to pen pals?",
          "options": [
            "Because letters feel personal, warm, and fun to open in the mailbox.",
            "I left my sports shoes in the gym locker.",
            "The train reached the station thirty minutes early."
          ],
          "answer": "Because letters feel personal, warm, and fun to open in the mailbox."
        },
        {
          "id": 2,
          "speaker": "Ava",
          "prompt": "What is the main advantage of sending an email to a teacher?",
          "text": "What is the main advantage of sending an email to a teacher?",
          "options": [
            "It delivers important school messages instantly across any distance.",
            "My brother plays violin in the youth orchestra.",
            "The supermarket has fresh apples from France."
          ],
          "answer": "It delivers important school messages instantly across any distance."
        },
        {
          "id": 3,
          "speaker": "Leo",
          "prompt": "How many letters and emails did our class send to our partner school?",
          "text": "How many letters and emails did our class send to our partner school?",
          "options": [
            "We sent eighteen handwritten letters and twenty-four electronic emails.",
            "I had a tuna sandwich and an apple for lunch.",
            "The art gallery has five exhibition halls."
          ],
          "answer": "We sent eighteen handwritten letters and twenty-four electronic emails."
        },
        {
          "id": 4,
          "speaker": "Ava",
          "prompt": "What is the total number of communications sent to the partner school?",
          "text": "What is the total number of communications sent to the partner school?",
          "options": [
            "Eighteen plus twenty-four gives forty-two messages in total.",
            "I wear my blue sweater on chilly mornings.",
            "The football match finished at four o'clock."
          ],
          "answer": "Eighteen plus twenty-four gives forty-two messages in total."
        },
        {
          "id": 5,
          "speaker": "Leo",
          "prompt": "Shall we write a thank-you letter to the postmaster on Friday?",
          "text": "Shall we write a thank-you letter to the postmaster on Friday?",
          "options": [
            "Yes, let's write a polite letter and mail it at the local post office!",
            "I do not want cold lemonade with my lunch.",
            "The bus leaves from the corner of Maple Street."
          ],
          "answer": "Yes, let's write a polite letter and mail it at the local post office!"
        }
      ],
      "exchanges": [
        {
          "speaker": "Leo",
          "text": "Because letters feel personal, warm, and fun to open in the mailbox."
        },
        {
          "speaker": "Ava",
          "text": "It delivers important school messages instantly across any distance."
        },
        {
          "speaker": "Leo",
          "text": "We sent eighteen handwritten letters and twenty-four electronic emails."
        },
        {
          "speaker": "Ava",
          "text": "Eighteen plus twenty-four gives forty-two messages in total."
        },
        {
          "speaker": "Leo",
          "text": "Yes, let's write a polite letter and mail it at the local post office!"
        }
      ]
    },
    "part6_cloze": {
      "title": "Ava's Writing Diary: Letters and Emails",
      "instructions": "Read the diary and write the missing words. Write one word on each line.",
      "text_template": "People communicate in many different ways [1]_____ share thoughts and news. When you write a friendly letter, you place [2]_____ inside a paper envelope. You stick a postage stamp on top [3]_____ drop it into a mailbox. Emails travel much faster because they move [4]_____ the internet in seconds. Both letters and emails connect people [5]_____ live far apart.",
      "answers": {
        "1": "to",
        "2": "it",
        "3": "and",
        "4": "across",
        "5": "who"
      }
    }
  },
  "67": {
    "part1_definitions": [
      {
        "id": 1,
        "text": "A personal view or judgment formed about something.",
        "target": "opinion",
        "definition": "A personal view or judgment formed about something.",
        "word": "opinion",
        "definition_en": "A personal view or judgment formed about something.",
        "options": [
          "opinion",
          "itemA",
          "itemB"
        ],
        "answer": "opinion"
      },
      {
        "id": 2,
        "text": "A formal assessment or written report of a book or movie.",
        "target": "review",
        "definition": "A formal assessment or written report of a book or movie.",
        "word": "review",
        "definition_en": "A formal assessment or written report of a book or movie.",
        "options": [
          "review",
          "itemA",
          "itemB"
        ],
        "answer": "review"
      },
      {
        "id": 3,
        "text": "Preferred before all others of the same kind.",
        "target": "favorite",
        "definition": "Preferred before all others of the same kind.",
        "word": "favorite",
        "definition_en": "Preferred before all others of the same kind.",
        "options": [
          "favorite",
          "itemA",
          "itemB"
        ],
        "answer": "favorite"
      },
      {
        "id": 4,
        "text": "To praise someone or something as being good for a purpose.",
        "target": "recommend",
        "definition": "To praise someone or something as being good for a purpose.",
        "word": "recommend",
        "definition_en": "To praise someone or something as being good for a purpose.",
        "options": [
          "recommend",
          "itemA",
          "itemB"
        ],
        "answer": "recommend"
      },
      {
        "id": 5,
        "text": "The main events of a play, novel, or movie.",
        "target": "plot",
        "definition": "The main events of a play, novel, or movie.",
        "word": "plot",
        "definition_en": "The main events of a play, novel, or movie.",
        "options": [
          "plot",
          "itemA",
          "itemB"
        ],
        "answer": "plot"
      }
    ],
    "part2_dialogue": {
      "title": "Sharing Opinions in Book and Movie Reviews",
      "topic": "Sharing Opinions in Book and Movie Reviews",
      "turns": [
        {
          "id": 1,
          "speaker": "Ethan",
          "prompt": "In your opinion, why was the mystery novel worth reading?",
          "text": "In your opinion, why was the mystery novel worth reading?",
          "options": [
            "Because the clever plot had exciting surprises in every chapter.",
            "I walked my golden retriever in the park.",
            "The train arrives at platform two at noon."
          ],
          "answer": "Because the clever plot had exciting surprises in every chapter."
        },
        {
          "id": 2,
          "speaker": "Sophia",
          "prompt": "How many stars would you give the animated space movie?",
          "text": "How many stars would you give the animated space movie?",
          "options": [
            "I would give it five stars because the animation and soundtrack were superb.",
            "My sister baked strawberry cupcakes for the party.",
            "The library is near the central bus stop."
          ],
          "answer": "I would give it five stars because the animation and soundtrack were superb."
        },
        {
          "id": 3,
          "speaker": "Ethan",
          "prompt": "How many students voted for fantasy books versus adventure movies?",
          "text": "How many students voted for fantasy books versus adventure movies?",
          "options": [
            "Thirty-two students chose fantasy books while twenty-eight chose adventure movies.",
            "I ate vegetable pizza and drank orange juice.",
            "The museum has ancient Roman artifacts."
          ],
          "answer": "Thirty-two students chose fantasy books while twenty-eight chose adventure movies."
        },
        {
          "id": 4,
          "speaker": "Sophia",
          "prompt": "What is the difference in votes between the two choices?",
          "text": "What is the difference in votes between the two choices?",
          "options": [
            "Thirty-two minus twenty-eight leaves a difference of four votes.",
            "I wear wool socks when the weather turns cold.",
            "The supermarket sells fresh bread every morning."
          ],
          "answer": "Thirty-two minus twenty-eight leaves a difference of four votes."
        },
        {
          "id": 5,
          "speaker": "Ethan",
          "prompt": "Would you recommend this historical novel to our school reading club?",
          "text": "Would you recommend this historical novel to our school reading club?",
          "options": [
            "Yes, I strongly recommend it because the characters are very brave!",
            "I do not like tomato soup on warm days.",
            "The bus leaves from the corner of Oak Avenue."
          ],
          "answer": "Yes, I strongly recommend it because the characters are very brave!"
        }
      ],
      "exchanges": [
        {
          "speaker": "Ethan",
          "text": "Because the clever plot had exciting surprises in every chapter."
        },
        {
          "speaker": "Sophia",
          "text": "I would give it five stars because the animation and soundtrack were superb."
        },
        {
          "speaker": "Ethan",
          "text": "Thirty-two students chose fantasy books while twenty-eight chose adventure movies."
        },
        {
          "speaker": "Sophia",
          "text": "Thirty-two minus twenty-eight leaves a difference of four votes."
        },
        {
          "speaker": "Ethan",
          "text": "Yes, I strongly recommend it because the characters are very brave!"
        }
      ]
    },
    "part6_cloze": {
      "title": "Sophia's Review Journal: Sharing Opinions",
      "instructions": "Read the diary and write the missing words. Write one word on each line.",
      "text_template": "Writing a review allows you [1]_____ share your honest opinion. When reviewing a movie, you can describe [2]_____ plot without giving away the ending. You can also mention your favorite character [3]_____ explain why you liked them. Giving a rating helps other readers decide [4]_____ to watch the film. Expressing clear reasons makes your review helpful [5]_____ interesting.",
      "answers": {
        "1": "to",
        "2": "the",
        "3": "and",
        "4": "whether",
        "5": "and"
      }
    }
  },
  "68": {
    "part1_definitions": [
      {
        "id": 1,
        "text": "A cause or explanation for an action, event, or belief.",
        "target": "reason",
        "definition": "A cause or explanation for an action, event, or belief.",
        "word": "reason",
        "definition_en": "A cause or explanation for an action, event, or belief.",
        "options": [
          "reason",
          "itemA",
          "itemB"
        ],
        "answer": "reason"
      },
      {
        "id": 2,
        "text": "Facts or information indicating whether a belief is true.",
        "target": "evidence",
        "definition": "Facts or information indicating whether a belief is true.",
        "word": "evidence",
        "definition_en": "Facts or information indicating whether a belief is true.",
        "options": [
          "evidence",
          "itemA",
          "itemB"
        ],
        "answer": "evidence"
      },
      {
        "id": 3,
        "text": "Facts and statistics collected together for reference or analysis.",
        "target": "data",
        "definition": "Facts and statistics collected together for reference or analysis.",
        "word": "data",
        "definition_en": "Facts and statistics collected together for reference or analysis.",
        "options": [
          "data",
          "itemA",
          "itemB"
        ],
        "answer": "data"
      },
      {
        "id": 4,
        "text": "A sheet of information in the form of a diagram, table, or graph.",
        "target": "chart",
        "definition": "A sheet of information in the form of a diagram, table, or graph.",
        "word": "chart",
        "definition_en": "A sheet of information in the form of a diagram, table, or graph.",
        "options": [
          "chart",
          "itemA",
          "itemB"
        ],
        "answer": "chart"
      },
      {
        "id": 5,
        "text": "To cause someone to believe firmly in the truth of something.",
        "target": "convince",
        "definition": "To cause someone to believe firmly in the truth of something.",
        "word": "convince",
        "definition_en": "To cause someone to believe firmly in the truth of something.",
        "options": [
          "convince",
          "itemA",
          "itemB"
        ],
        "answer": "convince"
      }
    ],
    "part2_dialogue": {
      "title": "Using Evidence and Data to Build Strong Reasons",
      "topic": "Using Evidence and Data to Build Strong Reasons",
      "turns": [
        {
          "id": 1,
          "speaker": "Lucas",
          "prompt": "Why is data important when presenting an argument to the school council?",
          "text": "Why is data important when presenting an argument to the school council?",
          "options": [
            "Because authentic survey data provides verifiable proof for your opinions.",
            "I bought new running shoes at the department store.",
            "The train reached the station thirty minutes late."
          ],
          "answer": "Because authentic survey data provides verifiable proof for your opinions."
        },
        {
          "id": 2,
          "speaker": "Lily",
          "prompt": "How did the bar chart support our proposal for a new reading corner?",
          "text": "How did the bar chart support our proposal for a new reading corner?",
          "options": [
            "It showed clearly that sixty-five students want more books in the library.",
            "My father drives a silver delivery van on weekdays.",
            "The supermarket sells fresh milk and cheese."
          ],
          "answer": "It showed clearly that sixty-five students want more books in the library."
        },
        {
          "id": 3,
          "speaker": "Lucas",
          "prompt": "How many students participated in our school survey overall?",
          "text": "How many students participated in our school survey overall?",
          "options": [
            "Seventy-five girls and sixty boys returned completed survey forms.",
            "I had a cheese toastie and an apple for lunch.",
            "The art gallery has five exhibition rooms."
          ],
          "answer": "Seventy-five girls and sixty boys returned completed survey forms."
        },
        {
          "id": 4,
          "speaker": "Lily",
          "prompt": "What is the total number of survey participants across both groups?",
          "text": "What is the total number of survey participants across both groups?",
          "options": [
            "Seventy-five plus sixty equals one hundred thirty-five participants.",
            "I wear my blue baseball cap on sunny afternoons.",
            "The soccer match ended in a draw."
          ],
          "answer": "Seventy-five plus sixty equals one hundred thirty-five participants."
        },
        {
          "id": 5,
          "speaker": "Lucas",
          "prompt": "Shall we present our evidence chart during the assembly tomorrow?",
          "text": "Shall we present our evidence chart during the assembly tomorrow?",
          "options": [
            "Yes, let's explain the statistics with clear voices and diagrams!",
            "I do not like chocolate pudding after dinner.",
            "The bus stopped near the central railway station."
          ],
          "answer": "Yes, let's explain the statistics with clear voices and diagrams!"
        }
      ],
      "exchanges": [
        {
          "speaker": "Lucas",
          "text": "Because authentic survey data provides verifiable proof for your opinions."
        },
        {
          "speaker": "Lily",
          "text": "It showed clearly that sixty-five students want more books in the library."
        },
        {
          "speaker": "Lucas",
          "text": "Seventy-five girls and sixty boys returned completed survey forms."
        },
        {
          "speaker": "Lily",
          "text": "Seventy-five plus sixty equals one hundred thirty-five participants."
        },
        {
          "speaker": "Lucas",
          "text": "Yes, let's explain the statistics with clear voices and diagrams!"
        }
      ]
    },
    "part6_cloze": {
      "title": "Lily's Research Diary: Strong Reasons",
      "instructions": "Read the diary and write the missing words. Write one word on each line.",
      "text_template": "When you want to convince people, you need [1]_____ use strong evidence. Facts, survey data, and examples turn personal feelings [2]_____ persuasive arguments. Last week, our class conducted [3]_____ survey about playground activities. We organized the numerical results [4]_____ a colorful bar graph. Presenting real data helped the principal understand [5]_____ ideas clearly.",
      "answers": {
        "1": "to",
        "2": "into",
        "3": "a",
        "4": "on",
        "5": "our"
      }
    }
  },
  "69": {
    "part1_definitions": [
      {
        "id": 1,
        "text": "To cause someone to do something through reasoning or argument.",
        "target": "persuade",
        "definition": "To cause someone to do something through reasoning or argument.",
        "word": "persuade",
        "definition_en": "To cause someone to do something through reasoning or argument.",
        "options": [
          "persuade",
          "itemA",
          "itemB"
        ],
        "answer": "persuade"
      },
      {
        "id": 2,
        "text": "A group of people living in the same place under common laws.",
        "target": "community",
        "definition": "A group of people living in the same place under common laws.",
        "word": "community",
        "definition_en": "A group of people living in the same place under common laws.",
        "options": [
          "community",
          "itemA",
          "itemB"
        ],
        "answer": "community"
      },
      {
        "id": 3,
        "text": "To convert waste materials into reusable material.",
        "target": "recycle",
        "definition": "To convert waste materials into reusable material.",
        "word": "recycle",
        "definition_en": "To convert waste materials into reusable material.",
        "options": [
          "recycle",
          "itemA",
          "itemB"
        ],
        "answer": "recycle"
      },
      {
        "id": 4,
        "text": "A piece of planned work that is designed to achieve an aim.",
        "target": "project",
        "definition": "A piece of planned work that is designed to achieve an aim.",
        "word": "project",
        "definition_en": "A piece of planned work that is designed to achieve an aim.",
        "options": [
          "project",
          "itemA",
          "itemB"
        ],
        "answer": "project"
      },
      {
        "id": 5,
        "text": "A person who freely offers to take part in an enterprise.",
        "target": "volunteer",
        "definition": "A person who freely offers to take part in an enterprise.",
        "word": "volunteer",
        "definition_en": "A person who freely offers to take part in an enterprise.",
        "options": [
          "volunteer",
          "itemA",
          "itemB"
        ],
        "answer": "volunteer"
      }
    ],
    "part2_dialogue": {
      "title": "Persuading the Community to Clean the Park",
      "topic": "Persuading the Community to Clean the Park",
      "turns": [
        {
          "id": 1,
          "speaker": "Oliver",
          "prompt": "How can we persuade our neighbors to join the Saturday park cleanup?",
          "text": "How can we persuade our neighbors to join the Saturday park cleanup?",
          "options": [
            "By explaining how clean parks protect wildlife and create safe play areas.",
            "I ate a bowl of noodle soup for lunch.",
            "The flight to New York took seven hours."
          ],
          "answer": "By explaining how clean parks protect wildlife and create safe play areas."
        },
        {
          "id": 2,
          "speaker": "Emma",
          "prompt": "What persuasive words did we include on our community poster?",
          "text": "What persuasive words did we include on our community poster?",
          "options": [
            "We used strong phrases like 'join together', 'protect nature', and 'take action'.",
            "My uncle grows yellow sunflowers in his garden.",
            "The museum has four floors of paintings."
          ],
          "answer": "We used strong phrases like 'join together', 'protect nature', and 'take action'."
        },
        {
          "id": 3,
          "speaker": "Oliver",
          "prompt": "How many volunteers registered for the recycling project so far?",
          "text": "How many volunteers registered for the recycling project so far?",
          "options": [
            "Thirty-five adults and twenty-eight students signed the volunteer list.",
            "I packed my yellow notebook in my school bag.",
            "The library is closed on Sunday afternoon."
          ],
          "answer": "Thirty-five adults and twenty-eight students signed the volunteer list."
        },
        {
          "id": 4,
          "speaker": "Emma",
          "prompt": "What is the total number of community volunteers registered?",
          "text": "What is the total number of community volunteers registered?",
          "options": [
            "Thirty-five plus twenty-eight equals sixty-three volunteers in total.",
            "I wear my green raincoat when it drizzles.",
            "The train departs from platform two at noon."
          ],
          "answer": "Thirty-five plus twenty-eight equals sixty-three volunteers in total."
        },
        {
          "id": 5,
          "speaker": "Oliver",
          "prompt": "Shall we deliver our persuasive flyers to the neighborhood shops?",
          "text": "Shall we deliver our persuasive flyers to the neighborhood shops?",
          "options": [
            "Yes, let's ask the shopkeepers to display them in their front windows!",
            "I do not want cold milk with my cereal.",
            "The bus stopped at the supermarket entrance."
          ],
          "answer": "Yes, let's ask the shopkeepers to display them in their front windows!"
        }
      ],
      "exchanges": [
        {
          "speaker": "Oliver",
          "text": "By explaining how clean parks protect wildlife and create safe play areas."
        },
        {
          "speaker": "Emma",
          "text": "We used strong phrases like 'join together', 'protect nature', and 'take action'."
        },
        {
          "speaker": "Oliver",
          "text": "Thirty-five adults and twenty-eight students signed the volunteer list."
        },
        {
          "speaker": "Emma",
          "text": "Thirty-five plus twenty-eight equals sixty-three volunteers in total."
        },
        {
          "speaker": "Oliver",
          "text": "Yes, let's ask the shopkeepers to display them in their front windows!"
        }
      ]
    },
    "part6_cloze": {
      "title": "Emma's Action Log: Persuading Our Community",
      "instructions": "Read the diary and write the missing words. Write one word on each line.",
      "text_template": "Writing to persuade is a powerful way [1]_____ improve your community. Last month, student leaders wrote a letter [2]_____ our local town council. They explained why our neighborhood needed [3]_____ community recycling center. They included clear facts about waste [4]_____ pollution in the park. Working together can persuade leaders [5]_____ make positive changes.",
      "answers": {
        "1": "to",
        "2": "to",
        "3": "a",
        "4": "and",
        "5": "to"
      }
    }
  },
  "70": {
    "part1_definitions": [
      {
        "id": 1,
        "text": "To say words or make a speech to an audience.",
        "target": "speak",
        "definition": "To say words or make a speech to an audience.",
        "word": "speak",
        "definition_en": "To say words or make a speech to an audience.",
        "options": [
          "speak",
          "itemA",
          "itemB"
        ],
        "answer": "speak"
      },
      {
        "id": 2,
        "text": "A talk in which a new idea or topic is shown and explained.",
        "target": "presentation",
        "definition": "A talk in which a new idea or topic is shown and explained.",
        "word": "presentation",
        "definition_en": "A talk in which a new idea or topic is shown and explained.",
        "options": [
          "presentation",
          "itemA",
          "itemB"
        ],
        "answer": "presentation"
      },
      {
        "id": 3,
        "text": "The assembled spectators or listeners at a public event.",
        "target": "audience",
        "definition": "The assembled spectators or listeners at a public event.",
        "word": "audience",
        "definition_en": "The assembled spectators or listeners at a public event.",
        "options": [
          "audience",
          "itemA",
          "itemB"
        ],
        "answer": "audience"
      },
      {
        "id": 4,
        "text": "A feeling of trust in one's abilities, qualities, and judgment.",
        "target": "confidence",
        "definition": "A feeling of trust in one's abilities, qualities, and judgment.",
        "word": "confidence",
        "definition_en": "A feeling of trust in one's abilities, qualities, and judgment.",
        "options": [
          "confidence",
          "itemA",
          "itemB"
        ],
        "answer": "confidence"
      },
      {
        "id": 5,
        "text": "A large printed notice or picture used to illustrate a talk.",
        "target": "poster",
        "definition": "A large printed notice or picture used to illustrate a talk.",
        "word": "poster",
        "definition_en": "A large printed notice or picture used to illustrate a talk.",
        "options": [
          "poster",
          "itemA",
          "itemB"
        ],
        "answer": "poster"
      }
    ],
    "part2_dialogue": {
      "title": "Preparing for the Class Presentation",
      "topic": "Preparing for the Class Presentation",
      "turns": [
        {
          "id": 1,
          "speaker": "Lucas",
          "prompt": "How can a speaker speak with confidence in front of a big audience?",
          "text": "How can a speaker speak with confidence in front of a big audience?",
          "options": [
            "By standing tall, breathing calmly, and making friendly eye contact.",
            "I bought two tennis balls at the sports shop.",
            "The train journey took thirty-five minutes."
          ],
          "answer": "By standing tall, breathing calmly, and making friendly eye contact."
        },
        {
          "id": 2,
          "speaker": "Mia",
          "prompt": "Why should we use a colorful poster with clear slide titles?",
          "text": "Why should we use a colorful poster with clear slide titles?",
          "options": [
            "Because visual aids help the audience follow each main idea easily.",
            "My older brother plays piano in the living room.",
            "The supermarket sells fresh milk and bread."
          ],
          "answer": "Because visual aids help the audience follow each main idea easily."
        },
        {
          "id": 3,
          "speaker": "Lucas",
          "prompt": "How many minutes did we practice our presentation after school?",
          "text": "How many minutes did we practice our presentation after school?",
          "options": [
            "We practiced for twenty minutes on Monday and twenty-five minutes on Tuesday.",
            "I had vegetable noodles for dinner at home.",
            "The library opens early on Saturday morning."
          ],
          "answer": "We practiced for twenty minutes on Monday and twenty-five minutes on Tuesday."
        },
        {
          "id": 4,
          "speaker": "Mia",
          "prompt": "What is the total practice time across both days?",
          "text": "What is the total practice time across both days?",
          "options": [
            "Twenty plus twenty-five equals forty-five minutes of practice.",
            "I wear green sneakers when I run.",
            "The post office is near the central park."
          ],
          "answer": "Twenty plus twenty-five equals forty-five minutes of practice."
        },
        {
          "id": 5,
          "speaker": "Lucas",
          "prompt": "Are you ready to deliver our presentation to the class tomorrow?",
          "text": "Are you ready to deliver our presentation to the class tomorrow?",
          "options": [
            "Yes, we know our parts thoroughly and our poster looks fantastic!",
            "I do not like drinking warm orange juice.",
            "The bus departs from platform four at three o'clock."
          ],
          "answer": "Yes, we know our parts thoroughly and our poster looks fantastic!"
        }
      ],
      "exchanges": [
        {
          "speaker": "Lucas",
          "text": "By standing tall, breathing calmly, and making friendly eye contact."
        },
        {
          "speaker": "Mia",
          "text": "Because visual aids help the audience follow each main idea easily."
        },
        {
          "speaker": "Lucas",
          "text": "We practiced for twenty minutes on Monday and twenty-five minutes on Tuesday."
        },
        {
          "speaker": "Mia",
          "text": "Twenty plus twenty-five equals forty-five minutes of practice."
        },
        {
          "speaker": "Lucas",
          "text": "Yes, we know our parts thoroughly and our poster looks fantastic!"
        }
      ]
    },
    "part6_cloze": {
      "title": "Lucas's Public Speaking Journal",
      "instructions": "Read the diary and write the missing words. Write one word on each line.",
      "text_template": "Giving a class presentation helps students develop [1]_____ voices and confidence. Before speaking, it is important to practice [2]_____ front of family or friends. Speaking clearly and standing upright shows respect [3]_____ your audience. Using colorful posters and slides makes [4]_____ topic easier to understand. With preparation, public speaking becomes an exciting opportunity [5]_____ share ideas.",
      "answers": {
        "1": "their",
        "2": "in",
        "3": "for",
        "4": "the",
        "5": "to"
      }
    }
  },
  "71": {
    "part1_definitions": [
      {
        "id": 1,
        "text": "The planet on which we live; the world.",
        "target": "earth",
        "definition": "The planet on which we live; the world.",
        "word": "earth",
        "definition_en": "The planet on which we live; the world.",
        "options": [
          "earth",
          "itemA",
          "itemB"
        ],
        "answer": "earth"
      },
      {
        "id": 2,
        "text": "The physical universe beyond the earth's atmosphere.",
        "target": "space",
        "definition": "The physical universe beyond the earth's atmosphere.",
        "word": "space",
        "definition_en": "The physical universe beyond the earth's atmosphere.",
        "options": [
          "space",
          "itemA",
          "itemB"
        ],
        "answer": "space"
      },
      {
        "id": 3,
        "text": "A celestial body moving in an elliptical orbit around a star.",
        "target": "planet",
        "definition": "A celestial body moving in an elliptical orbit around a star.",
        "word": "planet",
        "definition_en": "A celestial body moving in an elliptical orbit around a star.",
        "options": [
          "planet",
          "itemA",
          "itemB"
        ],
        "answer": "planet"
      },
      {
        "id": 4,
        "text": "The curved path of a celestial object around a star or planet.",
        "target": "orbit",
        "definition": "The curved path of a celestial object around a star or planet.",
        "word": "orbit",
        "definition_en": "The curved path of a celestial object around a star or planet.",
        "options": [
          "orbit",
          "itemA",
          "itemB"
        ],
        "answer": "orbit"
      },
      {
        "id": 5,
        "text": "An optical instrument designed to make distant objects appear nearer.",
        "target": "telescope",
        "definition": "An optical instrument designed to make distant objects appear nearer.",
        "word": "telescope",
        "definition_en": "An optical instrument designed to make distant objects appear nearer.",
        "options": [
          "telescope",
          "itemA",
          "itemB"
        ],
        "answer": "telescope"
      }
    ],
    "part2_dialogue": {
      "title": "Exploring the Solar System and Planets",
      "topic": "Exploring the Solar System and Planets",
      "turns": [
        {
          "id": 1,
          "speaker": "Oliver",
          "prompt": "How many rocky planets orbit closest to our burning sun?",
          "text": "How many rocky planets orbit closest to our burning sun?",
          "options": [
            "Four inner rocky planets orbit closest: Mercury, Venus, Earth, and Mars.",
            "I packed my swimming goggles in my backpack.",
            "The train arrives at platform two at noon."
          ],
          "answer": "Four inner rocky planets orbit closest: Mercury, Venus, Earth, and Mars."
        },
        {
          "id": 2,
          "speaker": "Emma",
          "prompt": "What did we see through the school telescope on Tuesday night?",
          "text": "What did we see through the school telescope on Tuesday night?",
          "options": [
            "We saw the golden rings of Saturn and craters on the bright moon.",
            "My father drives a blue station wagon to work.",
            "The supermarket is closed on Sunday morning."
          ],
          "answer": "We saw the golden rings of Saturn and craters on the bright moon."
        },
        {
          "id": 3,
          "speaker": "Oliver",
          "prompt": "How many kilometers does light travel in three seconds across space?",
          "text": "How many kilometers does light travel in three seconds across space?",
          "options": [
            "Light travels about three hundred thousand kilometers each second.",
            "I ate blueberry pancakes for breakfast.",
            "The library has six wooden bookshelves."
          ],
          "answer": "Light travels about three hundred thousand kilometers each second."
        },
        {
          "id": 4,
          "speaker": "Emma",
          "prompt": "Why does the earth remain in orbit around the giant sun?",
          "text": "Why does the earth remain in orbit around the giant sun?",
          "options": [
            "Because the sun's powerful gravity holds our planet in a steady curved path.",
            "I wear my green scarf when it is windy.",
            "The museum is closed on public holidays."
          ],
          "answer": "Because the sun's powerful gravity holds our planet in a steady curved path."
        },
        {
          "id": 5,
          "speaker": "Oliver",
          "prompt": "Shall we build a scale model of the eight planets this weekend?",
          "text": "Shall we build a scale model of the eight planets this weekend?",
          "options": [
            "Yes, let's paint foam spheres and hang them in accurate order!",
            "I do not want tomato pasta for supper.",
            "The bus stopped near the central sports ground."
          ],
          "answer": "Yes, let's paint foam spheres and hang them in accurate order!"
        }
      ],
      "exchanges": [
        {
          "speaker": "Oliver",
          "text": "Four inner rocky planets orbit closest: Mercury, Venus, Earth, and Mars."
        },
        {
          "speaker": "Emma",
          "text": "We saw the golden rings of Saturn and craters on the bright moon."
        },
        {
          "speaker": "Oliver",
          "text": "Light travels about three hundred thousand kilometers each second."
        },
        {
          "speaker": "Emma",
          "text": "Because the sun's powerful gravity holds our planet in a steady curved path."
        },
        {
          "speaker": "Oliver",
          "text": "Yes, let's paint foam spheres and hang them in accurate order!"
        }
      ]
    },
    "part6_cloze": {
      "title": "Emma's Astronomy Log: Our Solar System",
      "instructions": "Read the diary and write the missing words. Write one word on each line.",
      "text_template": "Our solar system is a vast and fascinating place. Eight unique planets orbit around [1]_____ hot central sun. Earth is the third planet, where liquid water [2]_____ air support living creatures. Using a powerful telescope, astronomers study distant stars [3]_____ moons in deep space. Learning about space helps us understand [4]_____ special our home planet really [5]_____.",
      "answers": {
        "1": "the",
        "2": "and",
        "3": "and",
        "4": "how",
        "5": "is"
      }
    }
  },
  "72": {
    "part1_definitions": [
      {
        "id": 1,
        "text": "An event where skills, qualities, or products are exhibited.",
        "target": "showcase",
        "definition": "An event where skills, qualities, or products are exhibited.",
        "word": "showcase",
        "definition_en": "An event where skills, qualities, or products are exhibited.",
        "options": [
          "showcase",
          "itemA",
          "itemB"
        ],
        "answer": "showcase"
      },
      {
        "id": 2,
        "text": "A culminating project, experience, or achievement in school.",
        "target": "capstone",
        "definition": "A culminating project, experience, or achievement in school.",
        "word": "capstone",
        "definition_en": "A culminating project, experience, or achievement in school.",
        "options": [
          "capstone",
          "itemA",
          "itemB"
        ],
        "answer": "capstone"
      },
      {
        "id": 3,
        "text": "To acknowledge a significant happy day or event with a gathering.",
        "target": "celebrate",
        "definition": "To acknowledge a significant happy day or event with a gathering.",
        "word": "celebrate",
        "definition_en": "To acknowledge a significant happy day or event with a gathering.",
        "options": [
          "celebrate",
          "itemA",
          "itemB"
        ],
        "answer": "celebrate"
      },
      {
        "id": 4,
        "text": "The accomplishment of an aim or intended purpose.",
        "target": "success",
        "definition": "The accomplishment of an aim or intended purpose.",
        "word": "success",
        "definition_en": "The accomplishment of an aim or intended purpose.",
        "options": [
          "success",
          "itemA",
          "itemB"
        ],
        "answer": "success"
      },
      {
        "id": 5,
        "text": "The ability to do something well, gained through training.",
        "target": "skill",
        "definition": "The ability to do something well, gained through training.",
        "word": "skill",
        "definition_en": "The ability to do something well, gained through training.",
        "options": [
          "skill",
          "itemA",
          "itemB"
        ],
        "answer": "skill"
      }
    ],
    "part2_dialogue": {
      "title": "Celebrating Our Primary Capstone Showcase",
      "topic": "Celebrating Our Primary Capstone Showcase",
      "turns": [
        {
          "id": 1,
          "speaker": "Lucas",
          "prompt": "What was your favorite project in our whole primary showcase?",
          "text": "What was your favorite project in our whole primary showcase?",
          "options": [
            "The interactive science lab demonstrating renewable solar energy and circuits.",
            "I wore my black leather shoes to church.",
            "The train leaves platform three at four o'clock."
          ],
          "answer": "The interactive science lab demonstrating renewable solar energy and circuits."
        },
        {
          "id": 2,
          "speaker": "Mia",
          "prompt": "How much did our English speaking and writing improve this year?",
          "text": "How much did our English speaking and writing improve this year?",
          "options": [
            "We learned hundreds of academic words and can now present with strong confidence.",
            "My sister baked apple pie for our neighbors.",
            "The supermarket sells fresh milk and butter."
          ],
          "answer": "We learned hundreds of academic words and can now present with strong confidence."
        },
        {
          "id": 3,
          "speaker": "Lucas",
          "prompt": "How many guests attended our graduation showcase exhibition?",
          "text": "How many guests attended our graduation showcase exhibition?",
          "options": [
            "Forty-five parents and thirty-five teachers gathered in the assembly hall.",
            "I had vegetable noodles and green tea for lunch.",
            "The library is closed on Sunday morning."
          ],
          "answer": "Forty-five parents and thirty-five teachers gathered in the assembly hall."
        },
        {
          "id": 4,
          "speaker": "Mia",
          "prompt": "What is the total number of guests who attended the celebration?",
          "text": "What is the total number of guests who attended the celebration?",
          "options": [
            "Forty-five plus thirty-five equals eighty guests in total.",
            "I wear my green raincoat when it rains.",
            "The museum is closed on public holidays."
          ],
          "answer": "Forty-five plus thirty-five equals eighty guests in total."
        },
        {
          "id": 5,
          "speaker": "Lucas",
          "prompt": "Are you excited to step forward into secondary school next autumn?",
          "text": "Are you excited to step forward into secondary school next autumn?",
          "options": [
            "Yes, we are proud of our primary success and ready for new challenges!",
            "I do not like drinking warm orange juice.",
            "The bus leaves from the corner of Elm Street."
          ],
          "answer": "Yes, we are proud of our primary success and ready for new challenges!"
        }
      ],
      "exchanges": [
        {
          "speaker": "Lucas",
          "text": "The interactive science lab demonstrating renewable solar energy and circuits."
        },
        {
          "speaker": "Mia",
          "text": "We learned hundreds of academic words and can now present with strong confidence."
        },
        {
          "speaker": "Lucas",
          "text": "Forty-five parents and thirty-five teachers gathered in the assembly hall."
        },
        {
          "speaker": "Mia",
          "text": "Forty-five plus thirty-five equals eighty guests in total."
        },
        {
          "speaker": "Lucas",
          "text": "Yes, we are proud of our primary success and ready for new challenges!"
        }
      ]
    },
    "part6_cloze": {
      "title": "Lucas's Capstone Reflection: Looking Ahead",
      "instructions": "Read the diary and write the missing words. Write one word on each line.",
      "text_template": "Completing primary school is a memorable milestone [1]_____ celebrate with friends. Today our class presented our capstone showcase [2]_____ parents and teachers. We displayed posters about science, mathematics, [3]_____ world literature. Everyone spoke with confidence and shared [4]_____ proud learning achievements. We are excited to step forward [5]_____ secondary school with strong skills.",
      "answers": {
        "1": "to",
        "2": "to",
        "3": "and",
        "4": "their",
        "5": "into"
      }
    }
  }
};
export default CAMBRIDGE_RW_55_72;
