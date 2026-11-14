/**
 * scripts/fix_round96_speaking_p2.mjs
 * 
 * Enforces Cambridge Flyers Speaking Part 2 contract on staged weeks W40, W42, W44, W47-W54:
 * 1. Table B: fields[i] has real `value`, non-null `nova_question`, `is_missing: false`, `acceptable_answers` array, Flyers cue.
 * 2. Table A: fields[i] has `cue_prompt`, non-null `nova_reply`, `is_missing: true`, `acceptable_questions` array, Flyers cue.
 * 3. 0 placeholders ("... on file", "is recorded for <theme>").
 */
import fs from 'fs';
import path from 'path';

const STAGING_DIR = path.join(process.cwd(), 'docs/agent_artifacts/staging');

const AUTHENTIC_P2_DATA = {
  40: {
    table_a: [
      {
        id: "field_a1",
        label: "how heavy / Siberian tiger?",
        cue_prompt: "how heavy / Siberian tiger?",
        cue_word: "weight",
        is_missing: true,
        value: "Three hundred kilograms",
        acceptable_questions: [
          "How heavy is the Siberian tiger?",
          "How much does the Siberian tiger weigh?",
          "What is the weight of the tiger?"
        ],
        nova_reply: "The male Siberian tiger weighs three hundred kilograms."
      },
      {
        id: "field_a2",
        label: "what color / stripes?",
        cue_prompt: "what color / stripes?",
        cue_word: "color",
        is_missing: true,
        value: "Dark brown and black",
        acceptable_questions: [
          "What color are its stripes?",
          "What color are the tiger's stripes?",
          "Are its stripes black?"
        ],
        nova_reply: "Its stripes are dark brown and black."
      },
      {
        id: "field_a3",
        label: "where / tiger live?",
        cue_prompt: "where / tiger live?",
        cue_word: "habitat",
        is_missing: true,
        value: "Russian cold pine forests",
        acceptable_questions: [
          "Where does the Siberian tiger live?",
          "What is its natural habitat?",
          "Where can you find the tiger?"
        ],
        nova_reply: "The Siberian tiger lives in cold pine forests in Russia."
      },
      {
        id: "field_a4",
        label: "how fast / tiger run?",
        cue_prompt: "how fast / tiger run?",
        cue_word: "speed",
        is_missing: true,
        value: "Sixty kilometers per hour",
        acceptable_questions: [
          "How fast can the tiger run?",
          "What is the tiger's top speed?",
          "Can the tiger run fast?"
        ],
        nova_reply: "It can run up to sixty kilometers per hour in short bursts."
      },
      {
        id: "field_a5",
        label: "what / tiger eat?",
        cue_prompt: "what / tiger eat?",
        cue_word: "diet",
        is_missing: true,
        value: "Deer and wild boars",
        acceptable_questions: [
          "What does the tiger eat?",
          "What is its main food?",
          "What animals does the tiger hunt?"
        ],
        nova_reply: "The tiger hunts wild boars and large forest deer."
      }
    ],
    table_b: [
      {
        id: "field_b1",
        label: "how heavy / cheetah?",
        cue_prompt: "how heavy / cheetah?",
        cue_word: "weight",
        is_missing: false,
        value: "Sixty kilograms",
        nova_question: "How heavy is the adult cheetah?",
        acceptable_answers: [
          "Sixty kilograms",
          "Sixty kilograms.",
          "It weighs sixty kilograms.",
          "About sixty kilograms."
        ]
      },
      {
        id: "field_b2",
        label: "what / on fur?",
        cue_prompt: "what / on fur?",
        cue_word: "spots",
        is_missing: false,
        value: "Small round black spots",
        nova_question: "What pattern is on the cheetah's fur?",
        acceptable_answers: [
          "Small round black spots",
          "Small round black spots.",
          "It has small round black spots.",
          "Black spots."
        ]
      },
      {
        id: "field_b3",
        label: "where / cheetah live?",
        cue_prompt: "where / cheetah live?",
        cue_word: "habitat",
        is_missing: false,
        value: "Open African grasslands",
        nova_question: "Where does the cheetah live in the wild?",
        acceptable_answers: [
          "Open African grasslands",
          "Open African grasslands.",
          "The cheetah lives in open African grasslands.",
          "African grasslands."
        ]
      },
      {
        id: "field_b4",
        label: "how fast / cheetah run?",
        cue_prompt: "how fast / cheetah run?",
        cue_word: "speed",
        is_missing: false,
        value: "One hundred ten kilometers per hour",
        nova_question: "How fast can the cheetah run?",
        acceptable_answers: [
          "One hundred ten kilometers per hour",
          "One hundred ten kilometers per hour.",
          "It can run up to one hundred ten kilometers per hour.",
          "110 km per hour."
        ]
      },
      {
        id: "field_b5",
        label: "what / cheetah eat?",
        cue_prompt: "what / cheetah eat?",
        cue_word: "prey",
        is_missing: false,
        value: "Small gazelles and hares",
        nova_question: "What does the cheetah hunt and eat?",
        acceptable_answers: [
          "Small gazelles and hares",
          "Small gazelles and hares.",
          "The cheetah eats small gazelles and hares.",
          "Gazelles and hares."
        ]
      }
    ]
  },
  42: {
    table_a: [
      {
        id: "field_a1",
        label: "how deep / lake?",
        cue_prompt: "how deep / lake?",
        cue_word: "depth",
        is_missing: true,
        value: "Eighty-five meters deep",
        acceptable_questions: [
          "How deep is the lake?",
          "What is the lake depth?",
          "How many meters deep is the lake?"
        ],
        nova_reply: "The mountain lake is eighty-five meters deep."
      },
      {
        id: "field_a2",
        label: "water / warm or cool?",
        cue_prompt: "water / warm or cool?",
        cue_word: "temperature",
        is_missing: true,
        value: "Cool and clear",
        acceptable_questions: [
          "Is the water warm or cool?",
          "What is the water temperature?",
          "Is the lake water cool?"
        ],
        nova_reply: "The water is cool and clear."
      },
      {
        id: "field_a3",
        label: "where / stream flow?",
        cue_prompt: "where / stream flow?",
        cue_word: "flow",
        is_missing: true,
        value: "Into the Pine River",
        acceptable_questions: [
          "Where does the mountain stream flow?",
          "Which river does the stream enter?",
          "Where does the water go?"
        ],
        nova_reply: "The mountain stream flows down into the Pine River."
      },
      {
        id: "field_a4",
        label: "how much / rain / weekly?",
        cue_prompt: "how much / rain / weekly?",
        cue_word: "rainfall",
        is_missing: true,
        value: "Forty millimeters",
        acceptable_questions: [
          "How much rain falls weekly?",
          "What is the weekly rainfall?",
          "How many millimeters of rain fall?"
        ],
        nova_reply: "About forty millimeters of rain falls every week."
      },
      {
        id: "field_a5",
        label: "what / wildlife / live there?",
        cue_prompt: "what / wildlife / live there?",
        cue_word: "wildlife",
        is_missing: true,
        value: "Trout and river otters",
        acceptable_questions: [
          "What animals live near the lake?",
          "Which wildlife can you find there?",
          "What creatures live in the lake?"
        ],
        nova_reply: "Wild trout and river otters live around the lake."
      }
    ],
    table_b: [
      {
        id: "field_b1",
        label: "how much / water / beaker?",
        cue_prompt: "how much / water / beaker?",
        cue_word: "volume",
        is_missing: false,
        value: "One hundred milliliters",
        nova_question: "How much water is inside the glass beaker?",
        acceptable_answers: [
          "One hundred milliliters",
          "One hundred milliliters.",
          "There is one hundred milliliters of water.",
          "100 ml."
        ]
      },
      {
        id: "field_b2",
        label: "what temperature / vapor form?",
        cue_prompt: "what temperature / vapor form?",
        cue_word: "temperature",
        is_missing: false,
        value: "Fifty degrees Celsius",
        nova_question: "At what temperature does vapor begin to form?",
        acceptable_answers: [
          "Fifty degrees Celsius",
          "Fifty degrees Celsius.",
          "Vapor forms at fifty degrees Celsius.",
          "50 degrees."
        ]
      },
      {
        id: "field_b3",
        label: "where / experiment take place?",
        cue_prompt: "where / experiment take place?",
        cue_word: "location",
        is_missing: false,
        value: "School science laboratory",
        nova_question: "Where did the water cycle experiment take place?",
        acceptable_answers: [
          "School science laboratory",
          "School science laboratory.",
          "It took place in the school science laboratory.",
          "In the science lab."
        ]
      },
      {
        id: "field_b4",
        label: "how long / evaporation take?",
        cue_prompt: "how long / evaporation take?",
        cue_word: "duration",
        is_missing: false,
        value: "Twenty-five minutes",
        nova_question: "How long did the evaporation process take under the lamp?",
        acceptable_answers: [
          "Twenty-five minutes",
          "Twenty-five minutes.",
          "It took twenty-five minutes.",
          "25 minutes."
        ]
      },
      {
        id: "field_b5",
        label: "what color / condensed drops?",
        cue_prompt: "what color / condensed drops?",
        cue_word: "color",
        is_missing: false,
        value: "Clear and pure",
        nova_question: "What color were the condensed drops on the glass lid?",
        acceptable_answers: [
          "Clear and pure",
          "Clear and pure.",
          "The drops were completely clear and pure.",
          "Clear."
        ]
      }
    ]
  },
  44: {
    table_a: [
      {
        id: "field_a1",
        label: "how many / cookies baked?",
        cue_prompt: "how many / cookies baked?",
        cue_word: "baked",
        is_missing: true,
        value: "Seventy-two cookies",
        acceptable_questions: [
          "How many cookies were baked?",
          "How many cookies did the class bake?",
          "What was the total number baked?"
        ],
        nova_reply: "We baked seventy-two cookies on large baking trays."
      },
      {
        id: "field_a2",
        label: "how many / cookies sold?",
        cue_prompt: "how many / cookies sold?",
        cue_word: "sold",
        is_missing: true,
        value: "Twenty-eight cookies",
        acceptable_questions: [
          "How many cookies were sold?",
          "How many treats did you sell?",
          "What was the number sold?"
        ],
        nova_reply: "We sold twenty-eight cookies to morning visitors."
      },
      {
        id: "field_a3",
        label: "how many / cookies left?",
        cue_prompt: "how many / cookies left?",
        cue_word: "remaining",
        is_missing: true,
        value: "Forty-four cookies",
        acceptable_questions: [
          "How many cookies were left?",
          "How many cookies remained in the jar?",
          "What was the remaining count?"
        ],
        nova_reply: "There were forty-four cookies left in the jar."
      },
      {
        id: "field_a4",
        label: "what / flavor / cookies?",
        cue_prompt: "what / flavor / cookies?",
        cue_word: "flavor",
        is_missing: true,
        value: "Chocolate chip and butter",
        acceptable_questions: [
          "What flavor were the cookies?",
          "What kind of cookies did you bake?",
          "What was the cookie flavor?"
        ],
        nova_reply: "The cookies were chocolate chip and sweet butter flavor."
      },
      {
        id: "field_a5",
        label: "what time / bake sale end?",
        cue_prompt: "what time / bake sale end?",
        cue_word: "time",
        is_missing: true,
        value: "Four o'clock in the afternoon",
        acceptable_questions: [
          "What time did the bake sale end?",
          "When did the sale finish?",
          "At what time did it end?"
        ],
        nova_reply: "The bake sale finished at four o'clock in the afternoon."
      }
    ],
    table_b: [
      {
        id: "field_b1",
        label: "how many / party guests arrived?",
        cue_prompt: "how many / party guests arrived?",
        cue_word: "guests",
        is_missing: false,
        value: "Fifteen party guests",
        nova_question: "How many guests arrived at the cookie party?",
        acceptable_answers: [
          "Fifteen party guests",
          "Fifteen party guests.",
          "There were fifteen party guests.",
          "Fifteen guests."
        ]
      },
      {
        id: "field_b2",
        label: "how many / cookies eaten?",
        cue_prompt: "how many / cookies eaten?",
        cue_word: "eaten",
        is_missing: false,
        value: "Thirty-five cookies eaten",
        nova_question: "How many cookies were eaten during the party?",
        acceptable_answers: [
          "Thirty-five cookies eaten",
          "Thirty-five cookies eaten.",
          "The guests ate thirty-five cookies.",
          "Thirty-five."
        ]
      },
      {
        id: "field_b3",
        label: "where / party held?",
        cue_prompt: "where / party held?",
        cue_word: "venue",
        is_missing: false,
        value: "Grandma's sunny backyard",
        nova_question: "Where was the cookie party held?",
        acceptable_answers: [
          "Grandma's sunny backyard",
          "Grandma's sunny backyard.",
          "The party was held in Grandma's sunny backyard.",
          "In the backyard."
        ]
      },
      {
        id: "field_b4",
        label: "how many / cookies left in jar?",
        cue_prompt: "how many / cookies left in jar?",
        cue_word: "remaining",
        is_missing: false,
        value: "Twenty-five cookies",
        nova_question: "How many cookies remained in the big glass jar?",
        acceptable_answers: [
          "Twenty-five cookies",
          "Twenty-five cookies.",
          "There were twenty-five cookies left.",
          "Twenty-five."
        ]
      },
      {
        id: "field_b5",
        label: "what / game played?",
        cue_prompt: "what / game played?",
        cue_word: "game",
        is_missing: false,
        value: "Cookie monster counting game",
        nova_question: "What game did the guests play together?",
        acceptable_answers: [
          "Cookie monster counting game",
          "Cookie monster counting game.",
          "They played a fun cookie monster counting game.",
          "Cookie counting game."
        ]
      }
    ]
  },
  47: {
    table_a: [
      {
        id: "field_a1",
        label: "what / village name?",
        cue_prompt: "what / village name?",
        cue_word: "name",
        is_missing: true,
        value: "Silver Hill Village",
        acceptable_questions: [
          "What is the village name?",
          "Can you tell me the village name?",
          "What is the name of the village?"
        ],
        nova_reply: "The village is called Silver Hill Village."
      },
      {
        id: "field_a2",
        label: "how many / stone houses?",
        cue_prompt: "how many / stone houses?",
        cue_word: "houses",
        is_missing: true,
        value: "Forty-five stone houses",
        acceptable_questions: [
          "How many stone houses are there?",
          "How many houses does the village have?",
          "How many stone houses are in the village?"
        ],
        nova_reply: "There are forty-five stone houses in the village."
      },
      {
        id: "field_a3",
        label: "how many / cottages in north?",
        cue_prompt: "how many / cottages in north?",
        cue_word: "cottages",
        is_missing: true,
        value: "Twenty-one cottages",
        acceptable_questions: [
          "How many cottages are in the north?",
          "Are there cottages in the north?",
          "How many northern cottages are there?"
        ],
        nova_reply: "There are twenty-one cottages located in the north."
      },
      {
        id: "field_a4",
        label: "how many / farms in south?",
        cue_prompt: "how many / farms in south?",
        cue_word: "farms",
        is_missing: true,
        value: "Thirty-four farms",
        acceptable_questions: [
          "How many farms are in the south?",
          "Are there farms in the south?",
          "How many southern farms are there?"
        ],
        nova_reply: "There are thirty-four farms situated in the south."
      },
      {
        id: "field_a5",
        label: "what / total population?",
        cue_prompt: "what / total population?",
        cue_word: "population",
        is_missing: true,
        value: "Ninety-nine residents",
        acceptable_questions: [
          "What is the total population?",
          "How many residents live in the village?",
          "How many people live there?"
        ],
        nova_reply: "The total population of Silver Hill Village is ninety-nine residents."
      }
    ],
    table_b: [
      {
        id: "field_b1",
        label: "what / observatory name?",
        cue_prompt: "what / observatory name?",
        cue_word: "name",
        is_missing: false,
        value: "Sky Peak Observatory",
        nova_question: "What is the name of the star observatory?",
        acceptable_answers: [
          "Sky Peak Observatory",
          "Sky Peak Observatory.",
          "It is Sky Peak Observatory.",
          "It is called Sky Peak Observatory."
        ]
      },
      {
        id: "field_b2",
        label: "how many / telescopes in use?",
        cue_prompt: "how many / telescopes in use?",
        cue_word: "telescopes",
        is_missing: false,
        value: "Eight large telescopes",
        nova_question: "How many large telescopes are currently in use?",
        acceptable_answers: [
          "Eight large telescopes",
          "Eight large telescopes.",
          "There are eight large telescopes in use.",
          "Eight telescopes."
        ]
      },
      {
        id: "field_b3",
        label: "which / constellations counted?",
        cue_prompt: "which / constellations counted?",
        cue_word: "constellations",
        is_missing: false,
        value: "Southern and northern constellations",
        nova_question: "Which constellations were observed and counted tonight?",
        acceptable_answers: [
          "Southern and northern constellations",
          "Southern and northern constellations.",
          "Astronomers counted southern and northern constellations."
        ]
      },
      {
        id: "field_b4",
        label: "how many / stars logged tonight?",
        cue_prompt: "how many / stars logged tonight?",
        cue_word: "stars",
        is_missing: false,
        value: "Seventy-eight southern stars and sixty-seven northern stars",
        nova_question: "How many stars were logged in the night sky?",
        acceptable_answers: [
          "Seventy-eight southern stars and sixty-seven northern stars",
          "Seventy-eight southern stars and sixty-seven northern stars.",
          "They logged seventy-eight southern and sixty-seven northern stars."
        ]
      },
      {
        id: "field_b5",
        label: "what / visitor total tonight?",
        cue_prompt: "what / visitor total tonight?",
        cue_word: "visitors",
        is_missing: false,
        value: "Fifty-six students",
        nova_question: "What was the total number of student visitors tonight?",
        acceptable_answers: [
          "Fifty-six students",
          "Fifty-six students.",
          "There were fifty-six student visitors.",
          "Fifty-six."
        ]
      }
    ]
  },
  48: {
    table_a: [
      {
        id: "field_a1",
        label: "which / lab room?",
        cue_prompt: "which / lab room?",
        cue_word: "room",
        is_missing: true,
        value: "Science Lab Room 3",
        acceptable_questions: [
          "Which science lab room is it?",
          "What room is the science lab?",
          "Where is the science experiment?"
        ],
        nova_reply: "The experiment takes place in Science Lab Room 3."
      },
      {
        id: "field_a2",
        label: "how long / plastic ruler?",
        cue_prompt: "how long / plastic ruler?",
        cue_word: "ruler",
        is_missing: true,
        value: "Thirty centimeters",
        acceptable_questions: [
          "How long is the plastic ruler?",
          "What is the length of the ruler?",
          "How many centimeters is the ruler?"
        ],
        nova_reply: "The plastic ruler measures thirty centimeters long."
      },
      {
        id: "field_a3",
        label: "what color / ribbon measured?",
        cue_prompt: "what color / ribbon measured?",
        cue_word: "ribbon",
        is_missing: true,
        value: "Blue ribbon (forty-five centimeters)",
        acceptable_questions: [
          "What color is the ribbon?",
          "What color ribbon was measured in the lab?",
          "What is the color of the ribbon?"
        ],
        nova_reply: "The assistant measured a blue ribbon that is forty-five centimeters long."
      },
      {
        id: "field_a4",
        label: "what temperature / water freeze?",
        cue_prompt: "what temperature / water freeze?",
        cue_word: "freeze",
        is_missing: true,
        value: "Zero degrees Celsius",
        acceptable_questions: [
          "At what temperature does water freeze?",
          "What is the freezing temperature of water?",
          "When does water freeze?"
        ],
        nova_reply: "Water freezes at zero degrees Celsius in glass beakers."
      },
      {
        id: "field_a5",
        label: "what / container type?",
        cue_prompt: "what / container type?",
        cue_word: "container",
        is_missing: true,
        value: "Glass beakers",
        acceptable_questions: [
          "What type of container is used?",
          "What container does the lab use?",
          "Are glass beakers used?"
        ],
        nova_reply: "The lab assistant uses clean glass beakers for the liquids."
      }
    ],
    table_b: [
      {
        id: "field_b1",
        label: "which / garden plot?",
        cue_prompt: "which / garden plot?",
        cue_word: "plot",
        is_missing: false,
        value: "Garden Plot B",
        nova_question: "Which garden plot are you measuring?",
        acceptable_answers: [
          "Garden Plot B",
          "Garden Plot B.",
          "It is Garden Plot B.",
          "Plot B."
        ]
      },
      {
        id: "field_b2",
        label: "how tall / giant sunflower?",
        cue_prompt: "how tall / giant sunflower?",
        cue_word: "height",
        is_missing: false,
        value: "Two meters tall",
        nova_question: "How tall is the giant sunflower?",
        acceptable_answers: [
          "Two meters tall",
          "Two meters tall.",
          "The giant sunflower is two meters tall.",
          "Two meters."
        ]
      },
      {
        id: "field_b3",
        label: "what / measuring tool used?",
        cue_prompt: "what / measuring tool used?",
        cue_word: "tool",
        is_missing: false,
        value: "Flexible measuring tape",
        nova_question: "What measuring tool does the botanist use?",
        acceptable_answers: [
          "Flexible measuring tape",
          "Flexible measuring tape.",
          "The botanist uses a flexible measuring tape.",
          "A measuring tape."
        ]
      },
      {
        id: "field_b4",
        label: "how wide / garden plot?",
        cue_prompt: "how wide / garden plot?",
        cue_word: "width",
        is_missing: false,
        value: "Eighty centimeters",
        nova_question: "What is the width of Garden Plot B?",
        acceptable_answers: [
          "Eighty centimeters",
          "Eighty centimeters.",
          "The plot width is eighty centimeters.",
          "Eighty centimeters wide."
        ]
      },
      {
        id: "field_b5",
        label: "how much / sunflower grow / this week?",
        cue_prompt: "how much / sunflower grow / this week?",
        cue_word: "growth",
        is_missing: false,
        value: "Five centimeters",
        nova_question: "How much did the sunflower grow this week?",
        acceptable_answers: [
          "Five centimeters",
          "Five centimeters.",
          "It grew five centimeters this week.",
          "Five centimeters growth."
        ]
      }
    ]
  },
  49: {
    table_a: [
      {
        id: "field_a1",
        label: "what / career dream?",
        cue_prompt: "what / career dream?",
        cue_word: "career",
        is_missing: true,
        value: "Robotics engineer",
        acceptable_questions: [
          "What is Chloe's career dream?",
          "What does Chloe want to be?",
          "What career does she want?"
        ],
        nova_reply: "Chloe wants to become a robotics engineer."
      },
      {
        id: "field_a2",
        label: "why / choose robotics?",
        cue_prompt: "why / choose robotics?",
        cue_word: "reason",
        is_missing: true,
        value: "To build friendly helper robots",
        acceptable_questions: [
          "Why did she choose robotics?",
          "Why does Chloe want to be an engineer?",
          "What is her reason for choosing robotics?"
        ],
        nova_reply: "She chose robotics in order to build friendly helper robots."
      },
      {
        id: "field_a3",
        label: "what / university subject?",
        cue_prompt: "what / university subject?",
        cue_word: "subject",
        is_missing: true,
        value: "Computer science",
        acceptable_questions: [
          "What subject will Chloe study at university?",
          "What will she study at college?",
          "Which subject is she planning to study?"
        ],
        nova_reply: "She plans to study computer science at university."
      },
      {
        id: "field_a4",
        label: "what / target invention?",
        cue_prompt: "what / target invention?",
        cue_word: "invention",
        is_missing: true,
        value: "Automated hospital tools",
        acceptable_questions: [
          "What is Chloe's target invention?",
          "What does she want to invent?",
          "What tools will she create?"
        ],
        nova_reply: "Her target invention is automated hospital tools to help doctors."
      },
      {
        id: "field_a5",
        label: "how many / years of study?",
        cue_prompt: "how many / years of study?",
        cue_word: "years",
        is_missing: true,
        value: "Four years",
        acceptable_questions: [
          "How many years will Chloe study?",
          "How long is her university course?",
          "How many years of study are required?"
        ],
        nova_reply: "She will study computer science for four years."
      }
    ],
    table_b: [
      {
        id: "field_b1",
        label: "what / career dream?",
        cue_prompt: "what / career dream?",
        cue_word: "dream",
        is_missing: false,
        value: "Astronaut",
        nova_question: "What is Noah's future career dream?",
        acceptable_answers: [
          "Astronaut",
          "Astronaut.",
          "He wants to be an astronaut.",
          "Noah wants to be an astronaut."
        ]
      },
      {
        id: "field_b2",
        label: "which / destination planet?",
        cue_prompt: "which / destination planet?",
        cue_word: "planet",
        is_missing: false,
        value: "Mars",
        nova_question: "Which planet does Noah hope to visit?",
        acceptable_answers: [
          "Mars",
          "Mars.",
          "He hopes to visit Mars.",
          "The planet Mars."
        ]
      },
      {
        id: "field_b3",
        label: "what / training required?",
        cue_prompt: "what / training required?",
        cue_word: "training",
        is_missing: false,
        value: "Physical fitness and physics",
        nova_question: "What training will Noah complete at college?",
        acceptable_answers: [
          "Physical fitness and physics",
          "Physical fitness and physics.",
          "He will train in physical fitness and physics."
        ]
      },
      {
        id: "field_b4",
        label: "how long / college training?",
        cue_prompt: "how long / college training?",
        cue_word: "duration",
        is_missing: false,
        value: "Five years",
        nova_question: "How long will his college training last?",
        acceptable_answers: [
          "Five years",
          "Five years.",
          "His college training will last five years.",
          "Five years at college."
        ]
      },
      {
        id: "field_b5",
        label: "what / favorite subject?",
        cue_prompt: "what / favorite subject?",
        cue_word: "subject",
        is_missing: false,
        value: "Astronomy",
        nova_question: "What is Noah's favorite school subject?",
        acceptable_answers: [
          "Astronomy",
          "Astronomy.",
          "His favorite subject is astronomy.",
          "Astronomy class."
        ]
      }
    ]
  },
  50: {
    table_a: [
      {
        id: "field_a1",
        label: "what / vehicle model?",
        cue_prompt: "what / vehicle model?",
        cue_word: "model",
        is_missing: true,
        value: "The EcoCity Car",
        acceptable_questions: [
          "What is the electric vehicle model?",
          "What model is the car?",
          "What is the name of the vehicle?"
        ],
        nova_reply: "The vehicle model is called the EcoCity Car."
      },
      {
        id: "field_a2",
        label: "what / battery capacity?",
        cue_prompt: "what / battery capacity?",
        cue_word: "battery",
        is_missing: true,
        value: "Seventy kilowatts",
        acceptable_questions: [
          "What is the battery capacity?",
          "How big is the battery?",
          "What capacity does the battery have?"
        ],
        nova_reply: "The EcoCity Car uses a seventy-kilowatt battery."
      },
      {
        id: "field_a3",
        label: "how long / recharge time?",
        cue_prompt: "how long / recharge time?",
        cue_word: "recharge",
        is_missing: true,
        value: "Thirty minutes",
        acceptable_questions: [
          "How long does the car take to recharge?",
          "What is the recharge time?",
          "How many minutes to charge?"
        ],
        nova_reply: "It recharges in thirty minutes at high-speed fast stations."
      },
      {
        id: "field_a4",
        label: "what / driving range?",
        cue_prompt: "what / driving range?",
        cue_word: "range",
        is_missing: true,
        value: "Four hundred kilometers",
        acceptable_questions: [
          "What is the driving range?",
          "How far can the car drive on one charge?",
          "What is its maximum range?"
        ],
        nova_reply: "The EcoCity Car offers a four-hundred-kilometer driving range."
      },
      {
        id: "field_a5",
        label: "what / clean energy source?",
        cue_prompt: "what / clean energy source?",
        cue_word: "energy",
        is_missing: true,
        value: "Solar panels",
        acceptable_questions: [
          "What is the clean energy source?",
          "Where does the clean electricity come from?",
          "What powers the charging station?"
        ],
        nova_reply: "The car is charged with electricity powered entirely by solar panels."
      }
    ],
    table_b: [
      {
        id: "field_b1",
        label: "where / station location?",
        cue_prompt: "where / station location?",
        cue_word: "location",
        is_missing: false,
        value: "Greenway Hub",
        nova_question: "Where is the solar charging station located?",
        acceptable_answers: [
          "Greenway Hub",
          "Greenway Hub.",
          "It is located at Greenway Hub.",
          "At Greenway Hub."
        ]
      },
      {
        id: "field_b2",
        label: "how many / fast chargers?",
        cue_prompt: "how many / fast chargers?",
        cue_word: "chargers",
        is_missing: false,
        value: "Sixteen high-speed plugs",
        nova_question: "How many high-speed charging plugs are available?",
        acceptable_answers: [
          "Sixteen high-speed plugs",
          "Sixteen high-speed plugs.",
          "There are sixteen high-speed charging plugs.",
          "Sixteen plugs."
        ]
      },
      {
        id: "field_b3",
        label: "how many / solar panels on roof?",
        cue_prompt: "how many / solar panels on roof?",
        cue_word: "panels",
        is_missing: false,
        value: "Eighty solar panels",
        nova_question: "How many solar panels are installed on the roof?",
        acceptable_answers: [
          "Eighty solar panels",
          "Eighty solar panels.",
          "There are eighty solar panels on the roof.",
          "Eighty panels."
        ]
      },
      {
        id: "field_b4",
        label: "how many / vehicles served daily?",
        cue_prompt: "how many / vehicles served daily?",
        cue_word: "vehicles",
        is_missing: false,
        value: "Ninety electric vehicles",
        nova_question: "How many electric vehicles does the hub serve daily?",
        acceptable_answers: [
          "Ninety electric vehicles",
          "Ninety electric vehicles.",
          "It serves ninety electric vehicles daily.",
          "Ninety vehicles."
        ]
      },
      {
        id: "field_b5",
        label: "what / environmental benefit?",
        cue_prompt: "what / environmental benefit?",
        cue_word: "benefit",
        is_missing: false,
        value: "Reduces city carbon emissions",
        nova_question: "What is the main environmental benefit of Greenway Hub?",
        acceptable_answers: [
          "Reduces city carbon emissions",
          "Reduces city carbon emissions.",
          "It reduces city carbon emissions significantly.",
          "Reducing emissions."
        ]
      }
    ]
  },
  51: {
    table_a: [
      {
        id: "field_a1",
        label: "which / target planet?",
        cue_prompt: "which / target planet?",
        cue_word: "planet",
        is_missing: true,
        value: "Jupiter",
        acceptable_questions: [
          "Which target planet is the astronomer studying?",
          "What planet is being observed?",
          "Which planet is it?"
        ],
        nova_reply: "The astronomer is observing Jupiter."
      },
      {
        id: "field_a2",
        label: "what / planet category?",
        cue_prompt: "what / planet category?",
        cue_word: "category",
        is_missing: true,
        value: "Gas giant planet",
        acceptable_questions: [
          "What category of planet is Jupiter?",
          "What type of planet is Jupiter?",
          "Is Jupiter a gas planet?"
        ],
        nova_reply: "Jupiter is classified as a giant swirling gas planet."
      },
      {
        id: "field_a3",
        label: "what / appearance description?",
        cue_prompt: "what / appearance description?",
        cue_word: "appearance",
        is_missing: true,
        value: "Swirling clouds and giant storms",
        acceptable_questions: [
          "What does Jupiter look like?",
          "How is Jupiter's appearance described?",
          "What can you see on Jupiter?"
        ],
        nova_reply: "Jupiter has thick swirling clouds and massive storms."
      },
      {
        id: "field_a4",
        label: "how many / moons orbiting?",
        cue_prompt: "how many / moons orbiting?",
        cue_word: "moons",
        is_missing: true,
        value: "Ninety-five moons",
        acceptable_questions: [
          "How many moons orbit Jupiter?",
          "How many moons does Jupiter have?",
          "What is the number of moons?"
        ],
        nova_reply: "Jupiter has ninety-five confirmed moons orbiting it."
      },
      {
        id: "field_a5",
        label: "what / distance from sun?",
        cue_prompt: "what / distance from sun?",
        cue_word: "distance",
        is_missing: true,
        value: "Seven hundred seventy-eight million kilometers",
        acceptable_questions: [
          "What is Jupiter's distance from the sun?",
          "How far is Jupiter from the sun?",
          "How many kilometers from the sun is Jupiter?"
        ],
        nova_reply: "Jupiter orbits at seven hundred seventy-eight million kilometers from the sun."
      }
    ],
    table_b: [
      {
        id: "field_b1",
        label: "what / mission vehicle?",
        cue_prompt: "what / mission vehicle?",
        cue_word: "vehicle",
        is_missing: false,
        value: "Robotic rover",
        nova_question: "What vehicle is exploring the Martian surface?",
        acceptable_answers: [
          "Robotic rover",
          "Robotic rover.",
          "A robotic rover is exploring the surface.",
          "The robotic rover."
        ]
      },
      {
        id: "field_b2",
        label: "which / destination planet?",
        cue_prompt: "which / destination planet?",
        cue_word: "planet",
        is_missing: false,
        value: "Mars",
        nova_question: "Which planet is the mission controller directing?",
        acceptable_answers: [
          "Mars",
          "Mars.",
          "The planet Mars.",
          "Mars is the destination."
        ]
      },
      {
        id: "field_b3",
        label: "what / planet appearance?",
        cue_prompt: "what / planet appearance?",
        cue_word: "appearance",
        is_missing: false,
        value: "Dry, red, rocky surface",
        nova_question: "How is the surface of Mars described?",
        acceptable_answers: [
          "Dry, red, rocky surface",
          "Dry, red, rocky surface.",
          "Mars has a dry, red, and rocky surface.",
          "Red and rocky."
        ]
      },
      {
        id: "field_b4",
        label: "what / surface feature photographed?",
        cue_prompt: "what / surface feature photographed?",
        cue_word: "craters",
        is_missing: false,
        value: "Giant impact craters",
        nova_question: "What surface features does the rover photograph?",
        acceptable_answers: [
          "Giant impact craters",
          "Giant impact craters.",
          "It photographs giant impact craters.",
          "Impact craters."
        ]
      },
      {
        id: "field_b5",
        label: "what / atmosphere condition?",
        cue_prompt: "what / atmosphere condition?",
        cue_word: "atmosphere",
        is_missing: false,
        value: "Thin carbon dioxide atmosphere",
        nova_question: "What kind of atmosphere does Mars have?",
        acceptable_answers: [
          "Thin carbon dioxide atmosphere",
          "Thin carbon dioxide atmosphere.",
          "Mars has a thin carbon dioxide atmosphere.",
          "Thin atmosphere."
        ]
      }
    ]
  },
  52: {
    table_a: [
      {
        id: "field_a1",
        label: "how many / foreign countries visited?",
        cue_prompt: "how many / foreign countries visited?",
        cue_word: "countries",
        is_missing: true,
        value: "Three foreign countries",
        acceptable_questions: [
          "How many foreign countries has Harper visited?",
          "How many countries has she traveled to?",
          "What is the number of countries visited?"
        ],
        nova_reply: "Harper has visited three foreign countries."
      },
      {
        id: "field_a2",
        label: "what / famous landmark seen?",
        cue_prompt: "what / famous landmark seen?",
        cue_word: "landmark",
        is_missing: true,
        value: "Mount Fuji in Japan",
        acceptable_questions: [
          "What famous landmark has Harper seen?",
          "Which mountain has she visited?",
          "Has Harper seen Mount Fuji?"
        ],
        nova_reply: "She has seen the snowy peak of Mount Fuji in Japan."
      },
      {
        id: "field_a3",
        label: "what / unusual food eaten?",
        cue_prompt: "what / unusual food eaten?",
        cue_word: "food",
        is_missing: true,
        value: "Sushi and dragon fruit",
        acceptable_questions: [
          "What unusual foods has Harper eaten?",
          "What foods has she tried abroad?",
          "Has she eaten dragon fruit?"
        ],
        nova_reply: "Harper has eaten fresh sushi and sweet dragon fruit."
      },
      {
        id: "field_a4",
        label: "what / never tried before?",
        cue_prompt: "what / never tried before?",
        cue_word: "never",
        is_missing: true,
        value: "Ridden a camel",
        acceptable_questions: [
          "What has Harper never tried before?",
          "Has Harper ever ridden a camel?",
          "What adventure has she not done?"
        ],
        nova_reply: "She has never ridden a camel in the desert."
      },
      {
        id: "field_a5",
        label: "what / next dream adventure?",
        cue_prompt: "what / next dream adventure?",
        cue_word: "dream",
        is_missing: true,
        value: "Climbing the Alps",
        acceptable_questions: [
          "What is Harper's next dream adventure?",
          "What mountain range does she want to climb?",
          "Where does she want to go next?"
        ],
        nova_reply: "Her next dream adventure is climbing the Swiss Alps."
      }
    ],
    table_b: [
      {
        id: "field_b1",
        label: "how many / hills climbed?",
        cue_prompt: "how many / hills climbed?",
        cue_word: "hills",
        is_missing: false,
        value: "Five forest hills",
        nova_question: "How many forest hills has Daniel climbed?",
        acceptable_answers: [
          "Five forest hills",
          "Five forest hills.",
          "Daniel has climbed five forest hills.",
          "Five hills."
        ]
      },
      {
        id: "field_b2",
        label: "how many times / flown across ocean?",
        cue_prompt: "how many times / flown across ocean?",
        cue_word: "ocean",
        is_missing: false,
        value: "Twice",
        nova_question: "How many times has Daniel flown across the ocean?",
        acceptable_answers: [
          "Twice",
          "Twice.",
          "He has flown across the ocean twice.",
          "Two times."
        ]
      },
      {
        id: "field_b3",
        label: "which / museum visited?",
        cue_prompt: "which / museum visited?",
        cue_word: "museum",
        is_missing: false,
        value: "National Space Museum",
        nova_question: "Which national museum has Daniel visited?",
        acceptable_answers: [
          "National Space Museum",
          "National Space Museum.",
          "He has visited the National Space Museum.",
          "The space museum."
        ]
      },
      {
        id: "field_b4",
        label: "what / never tried before?",
        cue_prompt: "what / never tried before?",
        cue_word: "never",
        is_missing: false,
        value: "Flown in a hot air balloon",
        nova_question: "What experience has Daniel never tried?",
        acceptable_answers: [
          "Flown in a hot air balloon",
          "Flown in a hot air balloon.",
          "He has never flown in a hot air balloon.",
          "Hot air balloon."
        ]
      },
      {
        id: "field_b5",
        label: "what / next outdoor goal?",
        cue_prompt: "what / next outdoor goal?",
        cue_word: "goal",
        is_missing: false,
        value: "Visiting a coral reef",
        nova_question: "What is Daniel's next outdoor exploration goal?",
        acceptable_answers: [
          "Visiting a coral reef",
          "Visiting a coral reef.",
          "His goal is visiting a coral reef.",
          "A coral reef."
        ]
      }
    ]
  },
  53: {
    table_a: [
      {
        id: "field_a1",
        label: "what / mystery case name?",
        cue_prompt: "what / mystery case name?",
        cue_word: "case",
        is_missing: true,
        value: "The Library Trophy Mystery",
        acceptable_questions: [
          "What is the mystery case name?",
          "What case did Oliver investigate?",
          "What was the title of the case?"
        ],
        nova_reply: "The case was named The Library Trophy Mystery."
      },
      {
        id: "field_a2",
        label: "what / key clue discovered?",
        cue_prompt: "what / key clue discovered?",
        cue_word: "clue",
        is_missing: true,
        value: "Twenty-two-centimeter sneaker footprint",
        acceptable_questions: [
          "What was the key clue discovered?",
          "What clue did Oliver find in the library?",
          "How long was the footprint clue?"
        ],
        nova_reply: "The key clue was a twenty-two-centimeter sneaker footprint on the rug."
      },
      {
        id: "field_a3",
        label: "what / deduction made?",
        cue_prompt: "what / deduction made?",
        cue_word: "deduction",
        is_missing: true,
        value: "The culprit must be a primary student",
        acceptable_questions: [
          "What deduction did Oliver make?",
          "Who did Oliver deduce the suspect was?",
          "What conclusion was reached from the footprint?"
        ],
        nova_reply: "Oliver deduced that the footprint must belong to a primary school student."
      },
      {
        id: "field_a4",
        label: "where / notes curated?",
        cue_prompt: "where / notes curated?",
        cue_word: "notes",
        is_missing: true,
        value: "In his detective portfolio",
        acceptable_questions: [
          "Where were the detective notes curated?",
          "Where did Oliver save his evidence?",
          "What document holds the investigation notes?"
        ],
        nova_reply: "Oliver curated all detective notes neatly into his portfolio."
      },
      {
        id: "field_a5",
        label: "what / modal skill demonstrated?",
        cue_prompt: "what / modal skill demonstrated?",
        cue_word: "modal",
        is_missing: true,
        value: "Modals of deduction: must, could, cannot",
        acceptable_questions: [
          "What modal grammar skill was demonstrated?",
          "Which modal verbs did Oliver use?",
          "What grammar skill was applied?"
        ],
        nova_reply: "He demonstrated modals of deduction using must, could, and cannot."
      }
    ],
    table_b: [
      {
        id: "field_b1",
        label: "what / project portfolio title?",
        cue_prompt: "what / project portfolio title?",
        cue_word: "title",
        is_missing: false,
        value: "Year in Review Portfolio",
        nova_question: "What is the title of Grace's project portfolio?",
        acceptable_answers: [
          "Year in Review Portfolio",
          "Year in Review Portfolio.",
          "It is called Year in Review Portfolio.",
          "My Year in Review."
        ]
      },
      {
        id: "field_b2",
        label: "how many / written essays included?",
        cue_prompt: "how many / written essays included?",
        cue_word: "essays",
        is_missing: false,
        value: "Five essays",
        nova_question: "How many written essays are included in her portfolio?",
        acceptable_answers: [
          "Five essays",
          "Five essays.",
          "Her portfolio contains five essays.",
          "Five."
        ]
      },
      {
        id: "field_b3",
        label: "how many / science diagrams?",
        cue_prompt: "how many / science diagrams?",
        cue_word: "diagrams",
        is_missing: false,
        value: "Three science diagrams",
        nova_question: "How many science diagrams did Grace curate?",
        acceptable_answers: [
          "Three science diagrams",
          "Three science diagrams.",
          "She included three science diagrams.",
          "Three diagrams."
        ]
      },
      {
        id: "field_b4",
        label: "what / core learning takeaway?",
        cue_prompt: "what / core learning takeaway?",
        cue_word: "takeaway",
        is_missing: false,
        value: "Evidence must prove truth",
        nova_question: "What is Grace's core learning takeaway from the project?",
        acceptable_answers: [
          "Evidence must prove truth",
          "Evidence must prove truth.",
          "She demonstrated that evidence must prove truth.",
          "Proof of truth."
        ]
      },
      {
        id: "field_b5",
        label: "when / portfolio display date?",
        cue_prompt: "when / portfolio display date?",
        cue_word: "date",
        is_missing: false,
        value: "This Friday afternoon",
        nova_question: "When will Grace's portfolio be displayed in the hall?",
        acceptable_answers: [
          "This Friday afternoon",
          "This Friday afternoon.",
          "It will be displayed on Friday.",
          "On Friday afternoon."
        ]
      }
    ]
  },
  54: {
    table_a: [
      {
        id: "field_a1",
        label: "who / graduation valedictorian?",
        cue_prompt: "who / graduation valedictorian?",
        cue_word: "valedictorian",
        is_missing: true,
        value: "Sophia",
        acceptable_questions: [
          "Who is the graduation valedictorian?",
          "Who delivered the valedictory speech?",
          "What is the valedictorian's name?"
        ],
        nova_reply: "Sophia delivered the valedictory speech."
      },
      {
        id: "field_a2",
        label: "what / valedictory speech topic?",
        cue_prompt: "what / valedictory speech topic?",
        cue_word: "topic",
        is_missing: true,
        value: "The Pyramids of Giza and ancient engineering",
        acceptable_questions: [
          "What was Sophia's speech topic?",
          "What did Sophia speak about at graduation?",
          "What topic was featured in her speech?"
        ],
        nova_reply: "Her speech topic explored the Pyramids of Giza and ancient engineering."
      },
      {
        id: "field_a3",
        label: "how many / weeks completed?",
        cue_prompt: "how many / weeks completed?",
        cue_word: "weeks",
        is_missing: true,
        value: "Fifty-four weeks of English excellence",
        acceptable_questions: [
          "How many weeks did the graduates complete?",
          "How many weeks of English did they celebrate?",
          "What milestone was reached?"
        ],
        nova_reply: "The students celebrated fifty-four completed weeks of English excellence."
      },
      {
        id: "field_a4",
        label: "what / academic goal for Phase 2?",
        cue_prompt: "what / academic goal for Phase 2?",
        cue_word: "goal",
        is_missing: true,
        value: "Master academic writing and persuasion",
        acceptable_questions: [
          "What is Sophia's goal for Phase 2?",
          "What will the students master in Phase 2?",
          "What is their next academic milestone?"
        ],
        nova_reply: "Her goal is to master academic writing and persuasion in Phase 2."
      },
      {
        id: "field_a5",
        label: "what / certificate awarded?",
        cue_prompt: "what / certificate awarded?",
        cue_word: "certificate",
        is_missing: true,
        value: "Phase 1 Graduation Honors Certificate",
        acceptable_questions: [
          "What certificate was awarded to Sophia?",
          "Which honors certificate did graduates receive?",
          "What award was given on stage?"
        ],
        nova_reply: "Sophia received the Phase 1 Graduation Honors Certificate on stage."
      }
    ],
    table_b: [
      {
        id: "field_b1",
        label: "where / showcase ceremony venue?",
        cue_prompt: "where / showcase ceremony venue?",
        cue_word: "venue",
        is_missing: false,
        value: "The Grand Hall",
        nova_question: "Where did the graduation showcase ceremony take place?",
        acceptable_answers: [
          "The Grand Hall",
          "The Grand Hall.",
          "It took place in the Grand Hall.",
          "In the Grand Hall."
        ]
      },
      {
        id: "field_b2",
        label: "how many / graduates celebrating?",
        cue_prompt: "how many / graduates celebrating?",
        cue_word: "graduates",
        is_missing: false,
        value: "Fifty graduates",
        nova_question: "How many graduates participated in the ceremony?",
        acceptable_answers: [
          "Fifty graduates",
          "Fifty graduates.",
          "There were fifty graduates.",
          "Fifty students."
        ]
      },
      {
        id: "field_b3",
        label: "how many / parents attended?",
        cue_prompt: "how many / parents attended?",
        cue_word: "parents",
        is_missing: false,
        value: "One hundred fifty parents",
        nova_question: "How many parents attended the graduation showcase?",
        acceptable_answers: [
          "One hundred fifty parents",
          "One hundred fifty parents.",
          "One hundred fifty parents attended.",
          "One hundred fifty."
        ]
      },
      {
        id: "field_b4",
        label: "what / highlight event?",
        cue_prompt: "what / highlight event?",
        cue_word: "highlight",
        is_missing: false,
        value: "Student portfolio gallery",
        nova_question: "What was the highlight event of the ceremony?",
        acceptable_answers: [
          "Student portfolio gallery",
          "Student portfolio gallery.",
          "The highlight was the student portfolio gallery.",
          "Portfolio gallery."
        ]
      },
      {
        id: "field_b5",
        label: "what / final ceremony stage?",
        cue_prompt: "what / final ceremony stage?",
        cue_word: "stage",
        is_missing: false,
        value: "Certificate award presentation",
        nova_question: "What concluded the graduation showcase?",
        acceptable_answers: [
          "Certificate award presentation",
          "Certificate award presentation.",
          "The certificate award presentation concluded the event.",
          "Award presentation."
        ]
      }
    ]
  }
};

for (const [wStr, p2Data] of Object.entries(AUTHENTIC_P2_DATA)) {
  const w = parseInt(wStr, 10);
  const p = path.join(STAGING_DIR, `week_${w}/speaking_hub.js`);
  if (!fs.existsSync(p)) continue;

  const mod = await import('file://' + p);
  const data = mod.speakingHubData || mod.default;
  if (!data?.info_exchange_cards) continue;

  // Update table_a and table_b fields
  data.info_exchange_cards.table_a.fields = p2Data.table_a;
  data.info_exchange_cards.table_b.fields = p2Data.table_b;

  // Write back formatted JS
  const newContent = `/**
 * STAGED DELIVERABLE: Round 96 Authentic Cambridge Flyers Speaking Hub
 * Week: ${w} | Theme: "${data.theme}" | CEFR: ${data.cefr_level || 'A2 Flyers'}
 */
export const speakingHubData = ${JSON.stringify(data, null, 2)};
export default speakingHubData;
`;
  fs.writeFileSync(p, newContent, 'utf8');
  console.log(`✅ Applied authentic Speaking Part 2 for week_${w}`);
}

console.log('🎉 Speaking Part 2 normalization complete for all 11 weeks (W40, W42, W44, W47-W54).');
