/**
 * Fix double-blank stems in W28-31 mindmaps.
 * Only modifies stems/branches with remaining-blank issues.
 * Re-hashes all audio URLs after changes.
 * Usage: node _fix_mindmap_blanks.mjs
 */

import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();

function hashText(text) {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

function renderFile(centerStems, branchLabels, folder) {
  const stemLines = centerStems
    .map(s => `    { text: ${JSON.stringify(s)}, audio: ${JSON.stringify(`/audio/${folder}/mindmap_stem_${hashText(s)}.mp3`)} }`)
    .join(',\n');
  const branchEntries = Object.entries(branchLabels)
    .map(([key, branches]) => {
      const lines = branches
        .map(b => { const full = key.replace('___', b); return `      { text: ${JSON.stringify(b)}, audio: ${JSON.stringify(`/audio/${folder}/mindmap_branch_${hashText(full)}.mp3`)} }`; })
        .join(',\n');
      return `    ${JSON.stringify(key)}: [\n${lines}\n    ]`;
    })
    .join(',\n');
  return `const mindMapContent = {\n  centerStems: [\n${stemLines}\n  ],\n  branchLabels: {\n${branchEntries}\n  }\n};\n\nexport default mindMapContent;\n`;
}

// ─────────────────────────────────────────────────────────────
// W28 ADV
// ─────────────────────────────────────────────────────────────
const w28adv = {
  folder: 'week28',
  file: 'src/data/weeks/week_28/mindmap.js',
  centerStems: [
    "The tortoise won the race because ___.",
    "The other vehicles failed because ___.",
    "I usually travel to school by ___.",
    "My favourite vehicle is ___.",
    "If I could travel anywhere, I would go by ___.",
    "I think the best vehicle for a long journey is ___."
  ],
  branchLabels: {
    "The tortoise won the race because ___.": [
      "he never stopped for a single moment",
      "the hare fell asleep under a shady tree",
      "he was steady, determined, and never gave up",
      "he chose the perfect River Route",
      "he was patient and kept his own pace",
      "slow and steady always wins the race"
    ],
    "The other vehicles failed because ___.": [
      "the car got a flat tyre and had to stop",
      "the taxi got stuck in city traffic",
      "the bus stopped at every station along the road",
      "the motorbike ran out of petrol on the way",
      "the train station was too far from the finish",
      "only the steady boat had no problems at all"
    ],
    "I usually travel to school by ___.": [
      "bus", "bicycle", "car", "motorbike", "on foot", "taxi"
    ],
    "My favourite vehicle is ___.": [
      "bicycle because it is healthy and fun",
      "train because it is fast and comfortable",
      "boat because I love being on the water",
      "bus because I can look out the window",
      "car because it is convenient for my family",
      "motorbike because it feels exciting and fast"
    ],
    "If I could travel anywhere, I would go by ___.": [
      "plane, because it is the fastest way",
      "train, because the view from the window is beautiful",
      "ship, because the ocean is so beautiful",
      "bicycle, because I want to see everything slowly",
      "motorbike, because it is free and exciting",
      "boat, because rivers are calm and peaceful"
    ],
    "I think the best vehicle for a long journey is ___.": [
      "train because it is fast and has comfortable seats",
      "ship because you can sleep and rest on it",
      "plane because it saves the most time",
      "bus because it is affordable and stops everywhere",
      "bicycle because it is healthy and costs nothing",
      "car because it goes exactly where you need"
    ]
  }
};

// ─────────────────────────────────────────────────────────────
// W28 EASY
// ─────────────────────────────────────────────────────────────
const w28easy = {
  folder: 'week28_easy',
  file: 'src/data/weeks_easy/week_28/mindmap.js',
  centerStems: [
    "The tortoise chose a ___.",
    "The hare stopped to ___.",
    "I go to school by ___.",
    "My favourite vehicle is ___.",
    "A ___.",
    "I want to travel by ___ one day."
  ],
  branchLabels: {
    "The tortoise chose a ___.": [
      "boat", "small boat", "boat on the river",
      "slow and steady boat", "boat that never stopped", "boat and won the race"
    ],
    "The hare stopped to ___.": [
      "sleep", "show off", "sleep under a tree",
      "boast to other animals", "do tricks on his bicycle", "rest and show off"
    ],
    "I go to school by ___.": [
      "bus", "car", "bicycle", "motorbike", "on foot", "taxi"
    ],
    "My favourite vehicle is ___.": [
      "bus", "train", "bicycle", "car", "boat", "motorbike"
    ],
    "A ___.": [
      "bus is big and red",
      "car is fast and loud",
      "bicycle is small and fun",
      "boat is slow and quiet",
      "train is long and fast",
      "motorbike is loud and fast"
    ],
    "I want to travel by ___ one day.": [
      "ship", "train", "boat", "plane", "bicycle", "motorbike"
    ]
  }
};

// ─────────────────────────────────────────────────────────────
// W29 ADV
// ─────────────────────────────────────────────────────────────
const w29adv = {
  folder: 'week29',
  file: 'src/data/weeks/week_29/mindmap.js',
  centerStems: [
    "On the magic trip, Lily flew to the ___.",
    "The ___ on the trip was kind and helped Lily.",
    "When I grow up, I want to be ___.",
    "I think being a pilot is ___.",
    "If I could fly on a magic carpet, I would go to ___.",
    "In my family, ___."
  ],
  branchLabels: {
    "On the magic trip, Lily flew to the ___.": [
      "farm", "ocean coast", "school", "island", "dolphin bay", "mountains"
    ],
    "The ___ on the trip was kind and helped Lily.": [
      "farmer", "pilot", "teacher", "driver", "nurse", "doctor"
    ],
    "When I grow up, I want to be ___.": [
      "a doctor because I want to help sick people",
      "a pilot because I love aeroplanes and the sky",
      "a teacher because I enjoy helping others learn",
      "a farmer because I love animals and nature",
      "a nurse because I want to care for patients",
      "a driver because I enjoy travelling to new places"
    ],
    "I think being a pilot is ___.": [
      "exciting because you fly all over the world",
      "important because people depend on pilots",
      "difficult but wonderful",
      "amazing because the sky view is so beautiful",
      "special because not everyone gets to do it",
      "fun because you travel to many countries"
    ],
    "If I could fly on a magic carpet, I would go to ___.": [
      "a farm", "the ocean", "a tropical island",
      "a mountain", "a school in another country", "a dolphin coast"
    ],
    "In my family, ___.": [
      "my mum works as a doctor",
      "my dad works as a teacher",
      "my uncle works as an engineer",
      "my aunt works as a nurse",
      "my grandpa works as a farmer",
      "my older brother works as a driver"
    ]
  }
};

// ─────────────────────────────────────────────────────────────
// W29 EASY
// ─────────────────────────────────────────────────────────────
const w29easy = {
  folder: 'week29_easy',
  file: 'src/data/weeks_easy/week_29/mindmap.js',
  centerStems: [
    "The carpet flew to a ___.",
    "Lily met a kind ___ on the trip.",
    "I want to be a ___ one day.",
    "A doctor ___.",
    "In my family, ___.",
    "I like ___."
  ],
  branchLabels: {
    "The carpet flew to a ___.": [
      "farm", "school", "island", "ocean", "mountain", "hospital"
    ],
    "Lily met a kind ___ on the trip.": [
      "farmer", "pilot", "teacher", "nurse", "doctor", "driver"
    ],
    "I want to be a ___ one day.": [
      "doctor", "nurse", "teacher", "pilot", "farmer", "driver"
    ],
    "A doctor ___.": [
      "helps sick people", "works in a hospital", "gives medicine",
      "is very kind", "saves lives", "wears a white coat"
    ],
    "In my family, ___.": [
      "Mum is a nurse",
      "Dad is a driver",
      "my aunt is a teacher",
      "my uncle is a doctor",
      "my grandpa is a farmer",
      "my sister is a pilot"
    ],
    "I like ___.": [
      "doctors because they help people",
      "teachers because they are kind",
      "pilots because they fly planes",
      "nurses because they care for us",
      "farmers because they grow food",
      "drivers because they take us places"
    ]
  }
};

// ─────────────────────────────────────────────────────────────
// W30 ADV
// ─────────────────────────────────────────────────────────────
const w30adv = {
  folder: 'week30',
  file: 'src/data/weeks/week_30/mindmap.js',
  centerStems: [
    "Tom's dad, the chef, made ___ for the picnic.",
    "At the picnic, the friends felt ___.",
    "My favourite picnic food is ___.",
    "I think ___.",
    "In my family, ___.",
    "My dream job is ___."
  ],
  branchLabels: {
    "Tom's dad, the chef, made ___ for the picnic.": [
      "delicious sandwiches, cookies, and cold lemonade",
      "fresh cheese sandwiches for everyone",
      "the best picnic food with all his chef skills",
      "everything in the basket from scratch",
      "homemade cookies that everyone wanted more of",
      "a full basket of wonderful homemade food"
    ],
    "At the picnic, the friends felt ___.": [
      "happy because the food was delicious and the day was sunny",
      "surprised because an artist was painting the lake nearby",
      "grateful because Tom's dad made everything from scratch",
      "cheerful because they shared everything with each other",
      "amazed because Luna's uncle built the bridge they crossed",
      "full and content because the picnic was absolutely perfect"
    ],
    "My favourite picnic food is ___.": [
      "sandwiches because they are easy to carry outside",
      "watermelon because it is so refreshing in the sun",
      "fruit because it is healthy, sweet, and light",
      "cookies because they are a perfect little treat",
      "lemonade because it cools me down outside",
      "rice because it fills me up and I love it"
    ],
    "I think ___.": [
      "being a chef is interesting because you create food that makes everyone happy",
      "being a scientist is interesting because you discover amazing things every day",
      "being an engineer is interesting because you design things that help everyone",
      "being an artist is interesting because you express your feelings through your work",
      "being a firefighter is interesting because you are brave and save people's lives",
      "being a dentist is interesting because you help people have beautiful healthy smiles"
    ],
    "In my family, ___.": [
      "my mum works as a chef and loves cooking for us",
      "my dad works as an engineer and loves solving problems",
      "my aunt works as a doctor and loves helping patients",
      "my uncle works as a firefighter and loves his brave job",
      "my grandma works as a teacher and loves her students",
      "my older brother works as a scientist and loves experiments"
    ],
    "My dream job is ___.": [
      "chef because I love creating food for people I care about",
      "scientist because I enjoy discovering how the world works",
      "engineer because I want to build things that help everyone",
      "artist because I want to share my feelings with others",
      "firefighter because I want to be brave and protect people",
      "dentist because I want to help everyone have a healthy smile"
    ]
  }
};

// ─────────────────────────────────────────────────────────────
// W30 EASY
// ─────────────────────────────────────────────────────────────
const w30easy = {
  folder: 'week30_easy',
  file: 'src/data/weeks_easy/week_30/mindmap.js',
  centerStems: [
    "The chef ___.",
    "At the picnic, the friends ___.",
    "My favourite food is ___.",
    "I think ___.",
    "In my family, ___.",
    "My dream job is ___."
  ],
  branchLabels: {
    "The chef ___.": [
      "made sandwiches", "cooked the best food", "packed the big basket",
      "made cookies and lemonade", "is Tom's dad", "loves cooking for everyone"
    ],
    "At the picnic, the friends ___.": [
      "ate and drank", "felt very happy", "shared all their food",
      "laughed and played", "felt full and cheerful", "had a great time"
    ],
    "My favourite food is ___.": [
      "sandwiches", "watermelon", "cookies", "fruit", "rice", "noodles"
    ],
    "I think ___.": [
      "being a chef is fun and creative",
      "being a doctor is important and kind",
      "being a teacher is wonderful and helpful",
      "being a firefighter is brave and exciting",
      "being an artist is creative and beautiful",
      "being a scientist is interesting and clever"
    ],
    "In my family, ___.": [
      "Mum is a teacher",
      "Dad is a chef",
      "my aunt is a doctor",
      "my uncle is an engineer",
      "my grandpa is a farmer",
      "my older sister is a nurse"
    ],
    "My dream job is ___.": [
      "chef", "doctor", "teacher", "firefighter", "artist", "scientist"
    ]
  }
};

// ─────────────────────────────────────────────────────────────
// W31 ADV
// ─────────────────────────────────────────────────────────────
const w31adv = {
  folder: 'week31',
  file: 'src/data/weeks/week_31/mindmap.js',
  centerStems: [
    "At the market, Luna touched ___.",
    "Luna was surprised when ___.",
    "At home, I have ___.",
    "I think ___.",
    "When I touch ___.",
    "My favourite material is ___."
  ],
  branchLabels: {
    "At the market, Luna touched ___.": [
      "wood and felt its rough, warm texture",
      "stone and felt how cool and heavy it was",
      "cotton and felt how soft and light it was",
      "metal and felt how cold and hard it was",
      "glass and felt how smooth and fragile it was",
      "plastic and felt how light and flexible it was"
    ],
    "Luna was surprised when ___.": [
      "she touched the smooth, cold glass",
      "she felt how heavy the stone was",
      "the cotton felt so soft and light",
      "the metal was cold even inside the market",
      "the wood felt warm and rough together",
      "the plastic bent without breaking"
    ],
    "At home, I have ___.": [
      "a chair made of wood",
      "a bowl made of stone",
      "a window made of glass",
      "a water bottle made of plastic",
      "a pot made of metal",
      "a pillow cover made of cotton"
    ],
    "I think ___.": [
      "metal is the strongest material because it does not break or bend easily",
      "stone is the strongest material because it lasts for hundreds of years",
      "wood is the strongest material because it is thick, tough, and natural",
      "glass is the strongest material because it is hard and does not absorb water",
      "plastic is the strongest material because it is light but very durable",
      "cotton is the strongest material because it stretches without tearing"
    ],
    "When I touch ___.": [
      "wood, it feels rough and warm under my fingers",
      "stone, it feels cool and very smooth",
      "cotton, it feels soft and gentle against my skin",
      "metal, it feels cold and hard",
      "glass, it feels perfectly smooth and a little cold",
      "plastic, it feels light and slightly flexible"
    ],
    "My favourite material is ___.": [
      "wood because it is warm, natural, and beautiful",
      "cotton because it is soft and comfortable to wear",
      "glass because it is clear and beautiful in the light",
      "stone because it feels cool and strong and ancient",
      "metal because it is strong, shiny, and long-lasting",
      "plastic because it can be any colour or shape"
    ]
  }
};

// ─────────────────────────────────────────────────────────────
// W31 EASY
// ─────────────────────────────────────────────────────────────
const w31easy = {
  folder: 'week31_easy',
  file: 'src/data/weeks_easy/week_31/mindmap.js',
  centerStems: [
    "Luna went to the ___.",
    "She touched ___.",
    "At home, I have ___.",
    "When I touch ___.",
    "My favourite material is ___.",
    "I like the market because ___."
  ],
  branchLabels: {
    "Luna went to the ___.": [
      "market", "big market", "market with her dad",
      "busy market", "colourful market", "market on Saturday"
    ],
    "She touched ___.": [
      "the wood and it felt rough and warm",
      "the stone and it felt cold and heavy",
      "the cotton and it felt soft and light",
      "the metal and it felt cold and hard",
      "the glass and it felt smooth and cool",
      "the plastic and it felt light and smooth"
    ],
    "At home, I have ___.": [
      "a chair made of wood",
      "a bowl made of stone",
      "a window made of glass",
      "a bottle made of plastic",
      "a pot made of metal",
      "a scarf made of cotton"
    ],
    "When I touch ___.": [
      "wood, it feels warm and rough",
      "stone, it feels cold and smooth",
      "cotton, it feels soft and light",
      "metal, it feels cold and hard",
      "glass, it feels smooth and cool",
      "plastic, it feels light and smooth"
    ],
    "My favourite material is ___.": [
      "wood because it is warm and natural",
      "cotton because it is soft and comfortable",
      "glass because it is pretty and shiny",
      "stone because it is cool and strong",
      "metal because it is strong and shiny",
      "plastic because it can be any colour"
    ],
    "I like the market because ___.": [
      "it is fun",
      "there are many stalls",
      "it is very colourful",
      "I can touch new things",
      "the food is fresh",
      "I learn new things"
    ]
  }
};

// ─────────────────────────────────────────────────────────────
// WRITE + VALIDATE
// ─────────────────────────────────────────────────────────────
const allWeeks = [w28adv, w28easy, w29adv, w29easy, w30adv, w30easy, w31adv, w31easy];

let totalIssues = 0;
for (const week of allWeeks) {
  const content = renderFile(week.centerStems, week.branchLabels, week.folder);
  fs.writeFileSync(path.join(ROOT, week.file), content, 'utf-8');

  // Validate: no remaining ___ after substitution
  let issues = 0;
  for (const stem of week.centerStems) {
    const branches = week.branchLabels[stem] || [];
    for (const branch of branches) {
      const full = stem.replace('___', branch);
      if (full.includes('___')) {
        issues++;
        console.log(`  ❌ "${full}"`);
      }
    }
  }
  totalIssues += issues;
  console.log(`${issues === 0 ? '✅' : '❌'} ${week.folder} — ${issues} remaining blank issues`);
}
console.log(`\n${totalIssues === 0 ? '✅ All clean!' : `❌ ${totalIssues} total issues remain`}`);


