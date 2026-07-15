/**
 * Fix W1-27 mindmaps (both ADV and Easy):
 * 1. Convert all old sequential audio URLs → hash-based content URLs
 * 2. Fix double-blank stems (so TTS never reads "blank")
 * 3. Enhance impersonal stems with personal "I ___" alternatives
 * Usage: node _fix_w01_27_mindmaps.mjs
 */

import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';

const ROOT = process.cwd();

// Same hashText as voiceService.js
function hashText(text) {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

function renderFile(stems, branchLabels, folder) {
  const stemLines = stems
    .map(s => `    { text: ${JSON.stringify(s)}, audio: "/audio/${folder}/mindmap_stem_${hashText(s)}.mp3" }`)
    .join(',\n');
  const branchEntries = Object.entries(branchLabels)
    .map(([key, branches]) => {
      const lines = branches
        .map(b => { const full = key.replace('___', b); return `      { text: ${JSON.stringify(b)}, audio: "/audio/${folder}/mindmap_branch_${hashText(full)}.mp3" }`; })
        .join(',\n');
      return `    ${JSON.stringify(key)}: [\n${lines}\n    ]`;
    })
    .join(',\n');
  return `const mindMapContent = {\n  centerStems: [\n${stemLines}\n  ],\n  branchLabels: {\n${branchEntries}\n  }\n};\n\nexport default mindMapContent;\n`;
}

// ─── Per-file content overrides (weeks with double-blanks or personal stem enhancements) ───

// W1 ADV – already good personal stems, just add audio format
const w1adv = {
  folder: 'week1',
  file: 'src/data/weeks/week_01/mindmap.js',
  centerStems: [
    "I am ___.",
    "My full name is ___.",
    "I am ___ years old.",
    "I like ___.",
    "My best friend is ___.",
    "When I grow up, I want to be ___."
  ],
  branchLabels: {
    "I am ___." : [
      "a student",
      "happy every day",
      "learning new things",
      "curious about everything",
      "good at many things",
      "excited to discover"
    ],
    "My full name is ___." : [
      "Thomas Anderson",
      "Anna Smith",
      "John Wilson",
      "Mary Johnson",
      "Benjamin Lee",
      "Lisa Brown"
    ],
    "I am ___ years old." : [
      "six",
      "seven",
      "eight",
      "nine",
      "ten",
      "five"
    ],
    "I like ___." : [
      "reading adventure books",
      "doing exciting projects",
      "learning about heroes",
      "discovering new things",
      "using my imagination",
      "helping my friends"
    ],
    "My best friend is ___." : [
      "kind and funny",
      "smart and helpful",
      "always there for me",
      "great at telling stories",
      "someone I can trust",
      "my favourite person"
    ],
    "When I grow up, I want to be ___." : [
      "a scientist discovering things",
      "a teacher helping students",
      "someone who helps others",
      "smart and successful",
      "a person who makes a difference",
      "a doctor saving lives"
    ]
  }
};

// W1 Easy – simple personal stems
const w1easy = {
  folder: 'week1_easy',
  file: 'src/data/weeks_easy/week_01/mindmap.js',
  centerStems: [
    "I am ___.",
    "My name is ___.",
    "I am ___ years old.",
    "I like ___.",
    "My friend is ___.",
    "I want to be ___."
  ],
  branchLabels: {
    "I am ___." : [
      "happy",
      "a student",
      "tall",
      "short",
      "kind",
      "good"
    ],
    "My name is ___." : [
      "Tom",
      "Anna",
      "John",
      "Mary",
      "Ben",
      "Lisa"
    ],
    "I am ___ years old." : [
      "six",
      "seven",
      "eight",
      "nine",
      "ten",
      "five"
    ],
    "I like ___." : [
      "reading",
      "learning",
      "playing",
      "drawing",
      "my friends",
      "school"
    ],
    "My friend is ___." : [
      "kind",
      "nice",
      "funny",
      "smart",
      "helpful",
      "my best friend"
    ],
    "I want to be ___." : [
      "a hero",
      "a scientist",
      "a teacher",
      "smart",
      "helpful",
      "happy"
    ]
  }
};

// W4 ADV – fix double-blank "I feel ___ when I ___." → "I feel ___."
// ALSO add personal stem: replace "My favorite thing is ___." with "My favourite hobby is ___."
const w4adv = {
  folder: 'week4',
  file: 'src/data/weeks/week_04/mindmap.js',
  centerStems: [
    "I like ___.",
    "I feel ___.",
    "My favourite hobby is ___.",
    "I am ___ today.",
    "Playing makes me ___.",
    "I love ___."
  ],
  branchLabels: {
    "I like ___." : [
      "playing games",
      "reading books",
      "drawing pictures",
      "singing songs",
      "dancing",
      "having fun"
    ],
    "I feel ___." : [
      "happy when I play",
      "excited when I sing",
      "calm when I read",
      "creative when I draw",
      "joyful when I dance",
      "good when I help"
    ],
    "My favourite hobby is ___." : [
      "playing with friends",
      "reading stories",
      "drawing animals",
      "singing my favourite songs",
      "dancing to music",
      "making new friends"
    ],
    "I am ___ today." : [
      "happy",
      "excited",
      "friendly",
      "funny",
      "calm",
      "creative"
    ],
    "Playing makes me ___." : [
      "happy",
      "excited",
      "feel good",
      "smile",
      "laugh",
      "joyful"
    ],
    "I love ___." : [
      "my friends",
      "my hobbies",
      "playing",
      "learning new things",
      "being creative",
      "having fun"
    ]
  }
};

// W4 Easy – no double blank, just needs audio. Add personal stem.
const w4easy = {
  folder: 'week4_easy',
  file: 'src/data/weeks_easy/week_04/mindmap.js',
  centerStems: [
    "I like ___.",
    "I am ___.",
    "I can ___.",
    "I love ___.",
    "I feel ___.",
    "My hobby is ___."
  ],
  branchLabels: {
    "I like ___." : [
      "playing",
      "drawing",
      "reading",
      "running",
      "singing",
      "dancing"
    ],
    "I am ___." : [
      "happy",
      "excited",
      "funny",
      "calm",
      "kind",
      "creative"
    ],
    "I can ___." : [
      "run fast",
      "draw well",
      "read books",
      "sing a song",
      "dance",
      "help my friends"
    ],
    "I love ___." : [
      "my family",
      "my friends",
      "playing",
      "learning",
      "music",
      "fun"
    ],
    "I feel ___." : [
      "happy",
      "excited",
      "calm",
      "joyful",
      "good",
      "creative"
    ],
    "My hobby is ___." : [
      "drawing",
      "reading",
      "playing",
      "singing",
      "dancing",
      "running"
    ]
  }
};

// W10 ADV – fix TWO double-blank comparison stems
const w10adv = {
  folder: 'week10',
  file: 'src/data/weeks/week_10/mindmap.js',
  centerStems: [
    "Compared to the farm, the city is ___.",
    "The farm has ___.",
    "I prefer the ___ because it is peaceful.",
    "I see ___ on the farm.",
    "Unlike the farm, the city has ___.",
    "The farm is ___."
  ],
  branchLabels: {
    "Compared to the farm, the city is ___." : [
      "noisier and busier",
      "more crowded",
      "dirtier and more polluted",
      "bigger and more modern",
      "more exciting",
      "faster-paced"
    ],
    "The farm has ___." : [
      "cows",
      "chickens",
      "many animals",
      "wide open fields",
      "tall trees",
      "clean fresh air"
    ],
    "I prefer the ___ because it is peaceful." : [
      "countryside",
      "quiet farm",
      "green countryside",
      "peaceful farm",
      "fresh countryside",
      "calm village"
    ],
    "I see ___ on the farm." : [
      "a cow",
      "a chicken",
      "many animals",
      "golden fields",
      "tall trees",
      "beautiful nature"
    ],
    "Unlike the farm, the city has ___." : [
      "busy roads and tall buildings",
      "many cars and buses",
      "lots of people everywhere",
      "noise and pollution",
      "traffic and shopping centres",
      "fast food restaurants"
    ],
    "The farm is ___." : [
      "quiet",
      "peaceful",
      "clean",
      "beautiful",
      "relaxing",
      "wonderful"
    ]
  }
};

// W10 Easy – same double-blank fix
const w10easy = {
  folder: 'week10_easy',
  file: 'src/data/weeks_easy/week_10/mindmap.js',
  centerStems: [
    "Compared to the farm, the city is ___.",
    "The farm has ___.",
    "The countryside is ___.",
    "I see ___ on the farm.",
    "Unlike the farm, the city has ___.",
    "I prefer the ___."
  ],
  branchLabels: {
    "Compared to the farm, the city is ___." : [
      "noisy and busy",
      "dirty",
      "crowded",
      "big",
      "exciting",
      "fast"
    ],
    "The farm has ___." : [
      "cows",
      "chickens",
      "animals",
      "fields",
      "trees",
      "clean air"
    ],
    "The countryside is ___." : [
      "peaceful",
      "quiet",
      "clean",
      "beautiful",
      "green",
      "fresh"
    ],
    "I see ___ on the farm." : [
      "a cow",
      "a chicken",
      "animals",
      "fields",
      "trees",
      "nature"
    ],
    "Unlike the farm, the city has ___." : [
      "cars",
      "tall buildings",
      "many people",
      "noise",
      "buses and shops",
      "pollution"
    ],
    "I prefer the ___." : [
      "peaceful countryside",
      "quiet farm",
      "busy city",
      "green countryside",
      "exciting city",
      "fresh countryside"
    ]
  }
};

// W22 ADV – fix "Nova found a ___ in the ___." → "Nova found ___."
// ALSO: replace "Nova wrote in her ___." with personal "If I were a detective, I would ___."
const w22adv = {
  folder: 'week22',
  file: 'src/data/weeks/week_22/mindmap.js',
  centerStems: [
    "The detective ___.",
    "Nova asked, 'Did the suspect ___?'",
    "The suspect ___.",
    "Nova found ___.",
    "Yesterday, the ___.",
    "If I were a detective, I would ___."
  ],
  branchLabels: {
    "The detective ___." : [
      "opened the notebook",
      "asked a question",
      "found a clue",
      "started the interview",
      "wrote a report",
      "solved the case"
    ],
    "Nova asked, 'Did the suspect ___?'" : [
      "answer clearly",
      "open the notebook",
      "find the clue yesterday",
      "write the report last night",
      "know the answer",
      "start the case last week"
    ],
    "The suspect ___." : [
      "answered clearly",
      "gave a clue",
      "opened the notebook",
      "answered every question",
      "finished the interview",
      "helped solve the case"
    ],
    "Nova found ___." : [
      "a clue in the notebook",
      "an answer in the report",
      "a clue in the case file",
      "a question in the interview",
      "the suspect's answer",
      "the key clue at last"
    ],
    "Yesterday, the ___." : [
      "detective opened the case",
      "suspect answered clearly",
      "interview started at noon",
      "clue was in the notebook",
      "detective asked ten questions",
      "report was finished at last"
    ],
    "If I were a detective, I would ___." : [
      "look for clues everywhere",
      "ask many careful questions",
      "write everything in a notebook",
      "never give up on a case",
      "solve every mystery",
      "help people find answers"
    ]
  }
};

// W22 Easy – no double blank, just audio conversion + personal stem
const w22easy = {
  folder: 'week22_easy',
  file: 'src/data/weeks_easy/week_22/mindmap.js',
  centerStems: [
    "Nova is a ___.",
    "Did the suspect ___?",
    "Nova found a ___.",
    "Yesterday, Nova ___.",
    "Nova wrote a ___.",
    "I think a good detective is ___."
  ],
  branchLabels: {
    "Nova is a ___." : [
      "detective",
      "time detective",
      "good detective",
      "brilliant detective",
      "notebook detective",
      "case detective"
    ],
    "Did the suspect ___?" : [
      "answer clearly",
      "open the notebook",
      "give a clue",
      "start the interview",
      "report the answer",
      "help with the case"
    ],
    "Nova found a ___." : [
      "clue",
      "clue in the notebook",
      "good clue",
      "clue in the report",
      "case clue",
      "new clue yesterday"
    ],
    "Yesterday, Nova ___." : [
      "opened the notebook",
      "started the interview",
      "asked a question",
      "found a clue",
      "solved the case",
      "recorded the answer"
    ],
    "Nova wrote a ___." : [
      "report",
      "clear report",
      "case report",
      "short report",
      "report about the case",
      "report about the suspect"
    ],
    "I think a good detective is ___." : [
      "clever and brave",
      "patient and careful",
      "always asking questions",
      "good at finding clues",
      "honest and smart",
      "never giving up"
    ]
  }
};

// W23 ADV – fix THREE double-blank stems + personal stem
const w23adv = {
  folder: 'week23',
  file: 'src/data/weeks/week_23/mindmap.js',
  centerStems: [
    "I ___ in art class.",
    "I used ___.",
    "The picture had ___.",
    "In art class, I ___.",
    "Yesterday, I ___.",
    "I created ___."
  ],
  branchLabels: {
    "I ___ in art class." : [
      "painted a beautiful picture",
      "coloured the flowers blue",
      "folded the paper carefully",
      "cut shapes with scissors",
      "glued the pieces together",
      "created a masterpiece"
    ],
    "I used ___." : [
      "a brush to paint flowers",
      "scissors to cut paper",
      "a brush to add texture",
      "glue to stick pieces",
      "a brush to mix pigment",
      "scissors to cut shapes"
    ],
    "The picture had ___." : [
      "bright pigment colours",
      "interesting texture",
      "beautiful symmetry",
      "painted flowers",
      "glued leaf borders",
      "folded butterfly shapes"
    ],
    "In art class, I ___." : [
      "folded the paper carefully",
      "cut the paper with scissors",
      "folded the paper in half",
      "cut the paper into shapes",
      "folded the paper to check symmetry",
      "glued the paper onto the picture"
    ],
    "Yesterday, I ___." : [
      "painted a garden picture",
      "coloured the flowers blue",
      "glued leaves to the border",
      "cut paper with scissors",
      "folded paper into a butterfly",
      "created my best art ever"
    ],
    "I created ___." : [
      "a picture with pigment and texture",
      "a butterfly with symmetry",
      "a masterpiece with texture",
      "a border with glued leaves",
      "a garden with painted flowers",
      "a design with fold and symmetry"
    ]
  }
};

// W23 Easy – fix TWO double-blank stems
const w23easy = {
  folder: 'week23_easy',
  file: 'src/data/weeks_easy/week_23/mindmap.js',
  centerStems: [
    "I ___ in art class.",
    "I used ___.",
    "My picture had ___.",
    "I ___ the paper.",
    "Yesterday I ___.",
    "I created ___."
  ],
  branchLabels: {
    "I ___ in art class." : [
      "painted a picture",
      "coloured the flowers",
      "folded the paper",
      "cut the paper",
      "glued the pieces",
      "used a brush"
    ],
    "I used ___." : [
      "a brush to paint",
      "scissors to cut",
      "glue to stick pieces",
      "my fingers to fold",
      "a brush to colour",
      "scissors to cut shapes"
    ],
    "My picture had ___." : [
      "bright colours",
      "painted flowers",
      "leaf borders",
      "a folded butterfly",
      "nice texture",
      "good symmetry"
    ],
    "I ___ the paper." : [
      "folded",
      "cut",
      "coloured",
      "glued",
      "painted",
      "folded carefully"
    ],
    "Yesterday I ___." : [
      "painted a picture",
      "coloured the flowers",
      "glued the leaves",
      "cut the paper",
      "folded a butterfly",
      "created a picture"
    ],
    "I created ___." : [
      "a picture using paint",
      "a butterfly using paper",
      "a border using leaves",
      "a picture using scissors and glue",
      "a flower using a brush",
      "a design using fold and cut"
    ]
  }
};

// W24 ADV – fix FOUR double-blank stems
const w24adv = {
  folder: 'week24',
  file: 'src/data/weeks/week_24/mindmap.js',
  centerStems: [
    "Yesterday, I was ___.",
    "She was ___.",
    "They were ___.",
    "He was ___.",
    "Were you ___?",
    "We were all ___ at the end."
  ],
  branchLabels: {
    "Yesterday, I was ___." : [
      "scared of the dark",
      "excited about the trip",
      "tired after running",
      "bored at home",
      "surprised by the news",
      "cheerful all morning"
    ],
    "She was ___." : [
      "scared because it was dark",
      "relieved because she found it",
      "upset because she lost her bag",
      "excited because of the visitor",
      "worried because of the test",
      "angry because of the noise"
    ],
    "They were ___." : [
      "surprised when he walked in",
      "excited when they heard the news",
      "scared when the lights went out",
      "relieved when it was over",
      "bored when it rained all day",
      "cheerful when they heard music"
    ],
    "He was ___." : [
      "not scared — he was calm",
      "not bored — he was curious",
      "not upset — he was relieved",
      "not angry — he was worried",
      "not tired — he was cheerful",
      "not sad — he was surprised"
    ],
    "Were you ___?" : [
      "scared about the test",
      "excited about the party",
      "worried about your friend",
      "upset about the result",
      "cheerful about the holiday",
      "surprised about the change"
    ],
    "We were all ___ at the end." : [
      "tired",
      "relieved",
      "cheerful",
      "hungry",
      "surprised",
      "calm"
    ]
  }
};

// W24 Easy – same four double-blank fixes (same content as ADV, same folder)
const w24easy = {
  folder: 'week24_easy',
  file: 'src/data/weeks_easy/week_24/mindmap.js',
  centerStems: [
    "Yesterday, I was ___.",
    "She was ___.",
    "They were ___.",
    "He was ___.",
    "Were you ___?",
    "We were all ___ at the end."
  ],
  branchLabels: {
    "Yesterday, I was ___." : [
      "scared of the dark",
      "excited about the trip",
      "tired after running",
      "bored at home",
      "surprised by the news",
      "cheerful all morning"
    ],
    "She was ___." : [
      "scared because it was dark",
      "relieved because she found it",
      "upset because she lost her bag",
      "excited because of the visitor",
      "worried because of the test",
      "angry because of the noise"
    ],
    "They were ___." : [
      "surprised when he walked in",
      "excited when they heard the news",
      "scared when the lights went out",
      "relieved when it was over",
      "bored when it rained all day",
      "cheerful when they heard music"
    ],
    "He was ___." : [
      "not scared — he was calm",
      "not bored — he was curious",
      "not upset — he was relieved",
      "not angry — he was worried",
      "not tired — he was cheerful",
      "not sad — he was surprised"
    ],
    "Were you ___?" : [
      "scared about the test",
      "excited about the party",
      "worried about your friend",
      "upset about the result",
      "cheerful about the holiday",
      "surprised about the change"
    ],
    "We were all ___ at the end." : [
      "tired",
      "relieved",
      "cheerful",
      "hungry",
      "surprised",
      "calm"
    ]
  }
};

// W25 ADV – fix "To make ___, first I ___." → "I can make ___."
const w25adv = {
  folder: 'week25',
  file: 'src/data/weeks/week_25/mindmap.js',
  centerStems: [
    "First, I ___.",
    "Next, I ___.",
    "Then, I ___.",
    "Finally, I ___.",
    "The last step is ___.",
    "I can make ___."
  ],
  branchLabels: {
    "First, I ___." : [
      "took two slices of bread",
      "squeezed toothpaste onto my brush",
      "got a clean glass",
      "washed my hands",
      "checked the ingredients",
      "picked up the knife"
    ],
    "Next, I ___." : [
      "spread jam on the bread",
      "brushed my teeth carefully",
      "poured juice into the glass",
      "sliced the bread",
      "squeezed the lemon",
      "followed the recipe step by step"
    ],
    "Then, I ___." : [
      "pressed the two slices together",
      "rinsed my mouth with water",
      "stirred the drink gently",
      "put the sandwich on a plate",
      "added the next ingredient",
      "checked each step in sequence"
    ],
    "Finally, I ___." : [
      "cut the sandwich in half",
      "tidied up the kitchen",
      "washed and put away the knife",
      "drank the juice and smiled",
      "finished all the steps in order",
      "ate the sandwich happily"
    ],
    "The last step is ___." : [
      "to tidy up after cooking",
      "to rinse your mouth",
      "to put the bottle back",
      "to check all the steps",
      "to enjoy your food",
      "to wash your hands"
    ],
    "I can make ___." : [
      "a jam sandwich",
      "toast with butter",
      "fresh juice",
      "warm porridge",
      "a fruit salad",
      "a healthy snack"
    ]
  }
};

// W25 Easy – fix "To make ___, first I ___." → "I can make ___."
const w25easy = {
  folder: 'week25_easy',
  file: 'src/data/weeks_easy/week_25/mindmap.js',
  centerStems: [
    "First, I ___.",
    "Next, I ___.",
    "Then, I ___.",
    "Finally, I ___.",
    "The last step is ___.",
    "I can make ___."
  ],
  branchLabels: {
    "First, I ___." : [
      "got two slices of bread",
      "squeezed toothpaste onto my brush",
      "got a clean glass",
      "washed my hands",
      "picked up the knife",
      "checked the recipe"
    ],
    "Next, I ___." : [
      "spread jam on the bread",
      "brushed my teeth carefully",
      "poured juice into the glass",
      "opened the jam jar",
      "put on my uniform",
      "packed my books"
    ],
    "Then, I ___." : [
      "pressed the two slices together",
      "rinsed my mouth with water",
      "put the sandwich on a plate",
      "ate my breakfast",
      "zipped up my bag",
      "checked each step again"
    ],
    "Finally, I ___." : [
      "cut the sandwich in half",
      "tidied up the kitchen",
      "ate the sandwich happily",
      "drank the juice and smiled",
      "went to school on time",
      "finished all the steps"
    ],
    "The last step is ___." : [
      "to cut the sandwich",
      "to rinse your mouth",
      "to tidy up after cooking",
      "to enjoy your food",
      "to check all steps are done",
      "to wash your hands"
    ],
    "I can make ___." : [
      "a jam sandwich",
      "toast",
      "fresh juice",
      "my bag ready",
      "a fruit salad",
      "porridge"
    ]
  }
};

// W26 ADV – fix "In Panel ___, I ___." and "I was ___ because ___."
const w26adv = {
  folder: 'week26',
  file: 'src/data/weeks/week_26/mindmap.js',
  centerStems: [
    "First, I ___.",
    "Then, I ___.",
    "After that, I ___.",
    "Finally, I ___.",
    "In my comic strip, I ___.",
    "I was ___."
  ],
  branchLabels: {
    "First, I ___." : [
      "woke up late on Saturday morning",
      "wrote the title at the top of the paper",
      "sketched the first scene of my weekend",
      "walked to the park with my friend",
      "planned the four panels of my comic strip",
      "gathered my pencils and paper"
    ],
    "Then, I ___." : [
      "drew Max chasing a red ball across the grass",
      "added a speech bubble with dialogue",
      "wrote a caption under each panel",
      "visited my grandmother on Sunday afternoon",
      "watched a street performance with my family",
      "described each scene using Past Simple verbs"
    ],
    "After that, I ___." : [
      "coloured all four panels carefully",
      "checked every caption for Past Simple verbs",
      "added detail to each background scene",
      "drew a border around each panel",
      "wrote a title at the top of the strip",
      "showed the strip to my friend"
    ],
    "Finally, I ___." : [
      "finished the comic strip with a happy ending",
      "shared my comic strip with the class",
      "felt proud of my finished work",
      "added colour to the last panel",
      "smiled at the finished story",
      "gave the comic to my teacher"
    ],
    "In my comic strip, I ___." : [
      "sketched the park scene first",
      "drew Max chasing his ball",
      "described the street show in Panel Three",
      "wrote our walk home in the last panel",
      "added a speech bubble in each frame",
      "used Past Simple verbs for every caption"
    ],
    "I was ___." : [
      "happy because I spent the day at the park",
      "proud because I created my first comic strip",
      "excited because I had a great weekend adventure",
      "tired because I walked and played all day",
      "surprised because a street musician arrived",
      "amazed because my weekend had so many wonderful scenes"
    ]
  }
};

// W26 Easy – fix "In Panel ___, Leo ___." → "In the story, Leo ___."
const w26easy = {
  folder: 'week26_easy',
  file: 'src/data/weeks_easy/week_26/mindmap.js',
  centerStems: [
    "It was ___.",
    "They were ___.",
    "Leo visited ___.",
    "Max played ___.",
    "In the story, Leo ___.",
    "Last weekend, I ___."
  ],
  branchLabels: {
    "It was ___." : [
      "sunny and warm",
      "a lovely day",
      "brilliant at the park",
      "a great adventure",
      "very exciting",
      "a perfect weekend day"
    ],
    "They were ___." : [
      "tired but happy",
      "very excited",
      "at the park",
      "ready to go home",
      "watching the show together",
      "having a great time"
    ],
    "Leo visited ___." : [
      "the park on Saturday",
      "the park with Max",
      "the park near his house",
      "his favourite green park",
      "the park early in the morning",
      "the park for the first time that weekend"
    ],
    "Max played ___." : [
      "with his ball for one hour",
      "in the green grass",
      "all afternoon at the park",
      "with the red ball happily",
      "until he was very tired",
      "and chased the ball everywhere"
    ],
    "In the story, Leo ___." : [
      "sketched the park in Panel One",
      "drew Max with the ball in Panel Two",
      "drew the street show in Panel Three",
      "drew the walk home in Panel Four",
      "wrote the title at the top",
      "added the last caption in Panel Four"
    ],
    "Last weekend, I ___." : [
      "visited the park with my family",
      "played football with my friends",
      "watched a movie at home",
      "created a drawing in my notebook",
      "returned home tired but happy",
      "had a great adventure outside"
    ]
  }
};

// W27 ADV – fix "A leaf uses ___ to ___." → "A leaf uses ___."
// ALSO: replace "The root ___." with personal "My favourite plant is ___."
const w27adv = {
  folder: 'week27',
  file: 'src/data/weeks/week_27/mindmap.js',
  centerStems: [
    "First, a seed ___.",
    "Next, the sprout ___.",
    "After that, the stem ___.",
    "Finally, the flower ___.",
    "My favourite plant is ___.",
    "A leaf uses ___."
  ],
  branchLabels: {
    "First, a seed ___." : [
      "is planted in warm, moist soil",
      "needs water and warmth to germinate",
      "cracks open underground after a few days",
      "grows into a new plant with the right conditions",
      "contains a tiny embryo inside its shell",
      "breaks open and sends roots downward"
    ],
    "Next, the sprout ___." : [
      "pushes through the soil toward the light",
      "appears as a tiny green shoot above the soil",
      "grows taller every day toward the window",
      "bends toward sunlight through phototropism",
      "develops into a strong stem over time",
      "needs sunlight to continue growing upward"
    ],
    "After that, the stem ___." : [
      "carries water from the roots to the leaves",
      "grows taller and stronger each week",
      "produces small buds at the top",
      "becomes thick and woody over time",
      "supports the leaves and flowers",
      "holds the plant up toward the sun"
    ],
    "Finally, the flower ___." : [
      "blooms in beautiful bright colours",
      "opens wide to attract insects",
      "produces pollen for pollination",
      "creates seeds for the next generation",
      "closes at night and opens in the morning",
      "fills the garden with a sweet scent"
    ],
    "My favourite plant is ___." : [
      "a sunflower because it is tall and bright",
      "a rose because it smells wonderful",
      "a cactus because it is tough and interesting",
      "a mint plant because I use it for tea",
      "a cherry blossom because it is beautiful",
      "a mango tree because I love the fruit"
    ],
    "A leaf uses ___." : [
      "sunlight to make food for the plant",
      "carbon dioxide and sunlight to produce oxygen",
      "water and sunlight for photosynthesis",
      "sunlight to convert water into glucose",
      "sunlight to help the plant grow tall and strong",
      "energy from the sun to produce green colour"
    ]
  }
};

// W27 Easy – fix "A leaf uses ___ to ___." → "A leaf uses ___."
const w27easy = {
  folder: 'week27_easy',
  file: 'src/data/weeks_easy/week_27/mindmap.js',
  centerStems: [
    "First, a seed ___.",
    "Next, the sprout ___.",
    "After that, the stem ___.",
    "Finally, the flower ___.",
    "The root ___.",
    "A leaf uses ___."
  ],
  branchLabels: {
    "First, a seed ___." : [
      "is planted in the soil",
      "needs water to grow",
      "needs sunlight to germinate",
      "cracks open underground",
      "contains a tiny plant inside",
      "breaks open and sends roots down"
    ],
    "Next, the sprout ___." : [
      "pushes through the soil",
      "grows toward the light",
      "appears above the soil",
      "gets taller every day",
      "bends toward the sun",
      "needs sunlight to grow"
    ],
    "After that, the stem ___." : [
      "carries water to the leaves",
      "grows taller each week",
      "holds the plant up",
      "gets stronger every day",
      "supports the leaves",
      "grows toward the sun"
    ],
    "Finally, the flower ___." : [
      "blooms in bright colours",
      "opens wide in the sun",
      "fills the garden with colour",
      "makes seeds for new plants",
      "closes at night",
      "smells wonderful"
    ],
    "The root ___." : [
      "drinks water from the soil",
      "holds the plant in the ground",
      "grows deep underground",
      "carries water to the stem",
      "keeps the plant safe",
      "grows longer every day"
    ],
    "A leaf uses ___." : [
      "sunlight to make food",
      "water and sunlight to grow",
      "sunlight to produce oxygen",
      "sunlight to help the plant",
      "energy from the sun to grow green",
      "water and light to make food"
    ]
  }
};

// ─── EXPLICIT OVERRIDES LIST ────────────────────────────────────────────────
const OVERRIDES = [
  w1adv, w1easy,
  w4adv, w4easy,
  w10adv, w10easy,
  w22adv, w22easy,
  w23adv, w23easy,
  w24adv, w24easy,
  w25adv, w25easy,
  w26adv, w26easy,
  w27adv, w27easy
];

// ─── PHASE 1: Apply explicit overrides ──────────────────────────────────────
for (const week of OVERRIDES) {
  const filePath = path.join(ROOT, week.file);
  const content = renderFile(week.centerStems, week.branchLabels, week.folder);
  fs.writeFileSync(filePath, content, 'utf-8');
  // Validate
  let issues = 0;
  for (const stem of week.centerStems) {
    const branches = week.branchLabels[stem] || [];
    for (const branch of branches) {
      const full = stem.replace('___', branch);
      if (full.includes('___')) issues++;
    }
  }
  console.log(`${issues === 0 ? '✅' : '❌'} ${week.folder}: ${issues} remaining blank issues`);
}

// ─── PHASE 2: Mechanical audio URL conversion for remaining W2-27 files ─────
// (files NOT in the overrides list)

const overrideFiles = new Set(OVERRIDES.map(w => w.file));

// Dynamic import + re-render for remaining files
const remainingFiles = [];
for (let w = 2; w <= 27; w++) {
  const wn = String(w).padStart(2, '0');
  for (const [mode, suffix] of [['weeks', ''], ['weeks_easy', '_easy']]) {
    const file = `src/data/${mode}/week_${wn}/mindmap.js`;
    const folder = `week${w}${suffix}`;
    if (!overrideFiles.has(file) && fs.existsSync(path.join(ROOT, file))) {
      remainingFiles.push({ file, folder });
    }
  }
}

async function processRemainingFiles() {
  for (const { file, folder } of remainingFiles) {
    try {
      const filePath = path.join(ROOT, file);
      const mod = await import(`./${file}?t=${Date.now()}`);
      const data = mod.default;

      // Extract text-only data
      const stems = data.centerStems.map(s => (typeof s === 'string' ? s : s.text));
      const branchLabels = {};
      for (const [key, branches] of Object.entries(data.branchLabels)) {
        branchLabels[key] = branches.map(b => (typeof b === 'string' ? b : b.text));
      }

      // Check for remaining double blanks before writing
      let issues = 0;
      for (const stem of stems) {
        const branches = branchLabels[stem] || [];
        for (const branch of branches) {
          if (stem.replace('___', branch).includes('___')) issues++;
        }
      }

      const content = renderFile(stems, branchLabels, folder);
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`${issues === 0 ? '✅' : '⚠️ '} ${folder}${issues > 0 ? ` — ${issues} remaining double-blank issues` : ''}`);
    } catch (err) {
      console.error(`❌ Error processing ${file}: ${err.message}`);
    }
  }
}

await processRemainingFiles();
console.log('\n✅ All files processed. Run _audit_w01_27.mjs to verify.');
