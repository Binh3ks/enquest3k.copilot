/**
 * Add/replace personal stems in ALL W1-27 mindmaps.
 * Target: every week should have ≥3 stems starting with "I ___" or "My ___".
 * Usage: node _add_personal_stems_w01_27.mjs
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

// ─── WEEK DEFINITIONS ────────────────────────────────────────────────────────

const WEEKS = [

// ─────────────────── W2 ───────────────────
{
  folder: 'week2',
  file: 'src/data/weeks/week_02/mindmap.js',
  centerStems: [
    "This is my ___.",
    "My mother is ___.",
    "My father is ___.",
    "My family is ___.",
    "My favourite family activity is ___.",
    "I love my family because ___."
  ],
  branchLabels: {
    "This is my ___." : ["mother and father","big brother","little sister","happy family","sweet home","family team"],
    "My mother is ___." : ["the team leader","very kind","always helping us","cooking for us","taking care of everyone","my best friend"],
    "My father is ___." : ["strong and brave","working hard","teaching me things","playing with us","making us laugh","a good helper"],
    "My family is ___." : ["like a team","full of love","always together","helping each other","very happy","my treasure"],
    "My favourite family activity is ___." : ["playing games together","cooking together","watching movies as a family","reading stories together","going to the park","telling stories at night"],
    "I love my family because ___." : ["they always help me","we laugh together every day","they care for me deeply","we share everything","they are always there for me","they love me very much"]
  }
},
{
  folder: 'week2_easy',
  file: 'src/data/weeks_easy/week_02/mindmap.js',
  centerStems: [
    "This is my ___.",
    "My mother is ___.",
    "My father is ___.",
    "We are ___.",
    "I love ___.",
    "My family makes me ___."
  ],
  branchLabels: {
    "This is my ___." : ["mother","father","brother","sister","family","home"],
    "My mother is ___." : ["kind","nice","good","happy","the leader","my friend"],
    "My father is ___." : ["strong","big","kind","good","nice","a helper"],
    "We are ___." : ["a team","happy","a family","together","good","at home"],
    "I love ___." : ["my mother","my father","my family","my home","my team","everyone"],
    "My family makes me ___." : ["happy","feel safe","smile","laugh","feel loved","very proud"]
  }
},

// ─────────────────── W3 (already all personal, just ensure best content) ───
{
  folder: 'week3',
  file: 'src/data/weeks/week_03/mindmap.js',
  centerStems: [
    "I am ___.",
    "I have ___.",
    "My hair is ___.",
    "My eyes are ___.",
    "I look ___.",
    "My favourite thing about me is ___."
  ],
  branchLabels: {
    "I am ___." : ["tall","short","happy","beautiful","strong","kind"],
    "I have ___." : ["long hair","short hair","brown eyes","black eyes","a big smile","a happy face"],
    "My hair is ___." : ["black","brown","long and straight","short and curly","very beautiful","shiny and clean"],
    "My eyes are ___." : ["brown","black","big and round","very beautiful","bright and happy","like my mother's"],
    "I look ___." : ["happy today","like my mother","like my father","beautiful when I smile","very nice","in the mirror"],
    "My favourite thing about me is ___." : ["my smile","my kind heart","my bright eyes","my long hair","my strong body","my happy personality"]
  }
},
{
  folder: 'week3_easy',
  file: 'src/data/weeks_easy/week_03/mindmap.js',
  centerStems: [
    "I am ___.",
    "I have ___.",
    "My hair is ___.",
    "My eyes are ___.",
    "I look ___.",
    "I like my ___."
  ],
  branchLabels: {
    "I am ___." : ["tall","short","happy","nice","kind","good"],
    "I have ___." : ["long hair","short hair","brown eyes","black eyes","a smile","a face"],
    "My hair is ___." : ["black","brown","long","short","curly","straight"],
    "My eyes are ___." : ["brown","black","big","nice","happy","pretty"],
    "I look ___." : ["happy","like my mom","like my dad","nice","good","in the mirror"],
    "I like my ___." : ["smile","eyes","hair","face","hands","happy look"]
  }
},

// ─────────────────── W5 ───────────────────
{
  folder: 'week5',
  file: 'src/data/weeks/week_05/mindmap.js',
  centerStems: [
    "My house has ___.",
    "I have a ___ in my bedroom.",
    "My bedroom is ___.",
    "I see a ___ in the living room.",
    "My favourite room is ___.",
    "My favourite furniture is ___."
  ],
  branchLabels: {
    "My house has ___." : ["a bedroom","a kitchen","a living room","a bathroom","nice furniture","a big sofa"],
    "I have a ___ in my bedroom." : ["lamp","mirror","rug","shelf","cabinet","soft bed"],
    "My bedroom is ___." : ["big and comfortable","small but cosy","my favourite place","very tidy","full of my things","always clean"],
    "I see a ___ in the living room." : ["sofa","lamp","rug","shelf","TV","table"],
    "My favourite room is ___." : ["my bedroom","the living room","the kitchen","the bathroom","the study","the dining room"],
    "My favourite furniture is ___." : ["the sofa","my bed","the lamp","the mirror","the shelf","the rug"]
  }
},
{
  folder: 'week5_easy',
  file: 'src/data/weeks_easy/week_05/mindmap.js',
  centerStems: [
    "My house has ___.",
    "I sleep in my ___.",
    "I eat in the ___.",
    "I have a ___ in my bedroom.",
    "I sit on a ___.",
    "My favourite room is ___."
  ],
  branchLabels: {
    "My house has ___." : ["a bedroom","a kitchen","a bathroom","a living room","many rooms","four rooms"],
    "I sleep in my ___." : ["bedroom","bed","room","house","nice bed","big bedroom"],
    "I eat in the ___." : ["kitchen","dining room","house","living room","big kitchen","my house"],
    "I have a ___ in my bedroom." : ["bed","chair","table","toy","book","big bed"],
    "I sit on a ___." : ["chair","bed","big chair","small chair","red chair","blue chair"],
    "My favourite room is ___." : ["my bedroom","the kitchen","the living room","the bathroom","the garden","the dining room"]
  }
},

// ─────────────────── W6 ───────────────────
{
  folder: 'week6',
  file: 'src/data/weeks/week_06/mindmap.js',
  centerStems: [
    "I put my things ___.",
    "I hide ___ the desk.",
    "I look for things ___.",
    "I keep my bag ___.",
    "My favourite game is ___.",
    "I can find things ___."
  ],
  branchLabels: {
    "I put my things ___." : ["in the box","on the desk","under the chair","next to the door","on the floor","next to the window"],
    "I hide ___ the desk." : ["under","next to","on","behind","near","beside"],
    "I look for things ___." : ["in the box","under the chair","on the shelf","next to the window","behind the door","inside my bag"],
    "I keep my bag ___." : ["next to the desk","under the chair","on the floor","next to the door","beside my bed","on the shelf"],
    "My favourite game is ___." : ["hide and seek","treasure hunt","finding things","a hiding game","seeking games","a team game"],
    "I can find things ___." : ["under the desk","in the box","on the floor","next to the door","on the wall","next to the window"]
  }
},
{
  folder: 'week6_easy',
  file: 'src/data/weeks_easy/week_06/mindmap.js',
  centerStems: [
    "I put my things ___.",
    "I hide ___ the desk.",
    "I look ___ the box.",
    "My bag is ___.",
    "My favourite game is ___.",
    "I can find things ___."
  ],
  branchLabels: {
    "I put my things ___." : ["in the box","on the desk","under the chair","next to the door","on the floor","next to the window"],
    "I hide ___ the desk." : ["under","next to","on","behind","near","beside"],
    "I look ___ the box." : ["in","under","on","next to","behind","inside"],
    "My bag is ___." : ["next to the door","under the chair","on the floor","on the desk","beside my bed","on the shelf"],
    "My favourite game is ___." : ["hide and seek","treasure hunt","a finding game","a hiding game","a seeking game","a team game"],
    "I can find things ___." : ["under the desk","in the box","on the floor","next to the door","on the wall","next to the window"]
  }
},

// ─────────────────── W7 ───────────────────
{
  folder: 'week7',
  file: 'src/data/weeks/week_07/mindmap.js',
  centerStems: [
    "There is a ___ in my backpack.",
    "I use a ___ to write.",
    "In my classroom, I see ___.",
    "I keep my ___ organized.",
    "My favourite school supply is ___.",
    "There is a ___ on my desk."
  ],
  branchLabels: {
    "There is a ___ in my backpack." : ["book","notebook","pencil case","ruler","eraser","pen"],
    "I use a ___ to write." : ["pen","pencil","marker","crayon","chalk","stylus"],
    "In my classroom, I see ___." : ["a whiteboard","a computer","a teacher","a desk","a chair","a clock"],
    "I keep my ___ organized." : ["backpack","pencil case","notebook","folders","desk","locker"],
    "My favourite school supply is ___." : ["a pen","my notebook","my pencil case","a ruler","an eraser","coloured pencils"],
    "There is a ___ on my desk." : ["book","notebook","pen","ruler","eraser","pencil case"]
  }
},
{
  folder: 'week7_easy',
  file: 'src/data/weeks_easy/week_07/mindmap.js',
  centerStems: [
    "I draw with ___.",
    "I cut with ___.",
    "There is ___ in my bag.",
    "I eat from my ___.",
    "I write with ___.",
    "My favourite thing in my bag is ___."
  ],
  branchLabels: {
    "I draw with ___." : ["a pencil","a pen","a crayon","a marker","a brush","a coloured pencil"],
    "I cut with ___." : ["scissors","a knife","a paper cutter","small scissors","craft scissors","my scissors"],
    "There is ___ in my bag." : ["a book","a notebook","a pencil case","a ruler","an eraser","a lunch box"],
    "I eat from my ___." : ["lunch box","food box","school bag","home","plate","bowl"],
    "I write with ___." : ["a pen","a pencil","a marker","a crayon","chalk","a stylus"],
    "My favourite thing in my bag is ___." : ["my notebook","my pencil case","my book","my ruler","my lunch box","my eraser"]
  }
},

// ─────────────────── W8 ───────────────────
{
  folder: 'week8',
  file: 'src/data/weeks/week_08/mindmap.js',
  centerStems: [
    "My classroom has ___.",
    "My favourite number is ___.",
    "I count ___ on the shelf.",
    "I put ___ on my desk.",
    "I use ___ at school.",
    "There are ___ in my bag."
  ],
  branchLabels: {
    "My classroom has ___." : ["desks","chairs","a board","windows","shelves","a teacher's desk"],
    "My favourite number is ___." : ["one","ten","twenty","seven","three","one hundred"],
    "I count ___ on the shelf." : ["books","papers","pencils","markers","crayons","bags"],
    "I put ___ on my desk." : ["a pencil","a book","an eraser","a ruler","my notebook","my pencil case"],
    "I use ___ at school." : ["pencils","markers","crayons","papers","desks","chairs"],
    "There are ___ in my bag." : ["pencils","markers","crayons","papers","books","erasers"]
  }
},
{
  folder: 'week8_easy',
  file: 'src/data/weeks_easy/week_08/mindmap.js',
  centerStems: [
    "My classroom has ___.",
    "My favourite number is ___.",
    "There are ___ in my bag.",
    "I put ___ on my desk.",
    "I like ___ at school.",
    "I count ___."
  ],
  branchLabels: {
    "My classroom has ___." : ["desks","chairs","a board","windows","a shelf","a teacher"],
    "My favourite number is ___." : ["one","five","ten","seven","three","twenty"],
    "There are ___ in my bag." : ["pencils","markers","crayons","papers","books","erasers"],
    "I put ___ on my desk." : ["a pencil","a book","an eraser","a ruler","my notebook","my bag"],
    "I like ___ at school." : ["drawing","reading","playing","learning","writing","counting"],
    "I count ___." : ["one to ten","my books","my pencils","my friends","the chairs","the desks"]
  }
},

// ─────────────────── W9 ───────────────────
{
  folder: 'week9',
  file: 'src/data/weeks/week_09/mindmap.js',
  centerStems: [
    "In the city I see ___.",
    "In the city I hear ___.",
    "My favourite place in the city is ___.",
    "I live near ___.",
    "I can ride a ___.",
    "I think my city is ___."
  ],
  branchLabels: {
    "In the city I see ___." : ["tall buildings","busy streets","many cars","big buses","heavy traffic","modern buildings"],
    "In the city I hear ___." : ["car horns","people talking","bus engines","noisy traffic","busy sounds","city noise"],
    "My favourite place in the city is ___." : ["the park","the library","the school","the shopping centre","the sports centre","the museum"],
    "I live near ___." : ["a busy road","a market","a park","a school","a river","a shopping centre"],
    "I can ride a ___." : ["bus","car","taxi","bicycle","train","subway"],
    "I think my city is ___." : ["beautiful","exciting","busy","interesting","wonderful","the best place I know"]
  }
},
{
  folder: 'week9_easy',
  file: 'src/data/weeks_easy/week_09/mindmap.js',
  centerStems: [
    "In the city I see ___.",
    "In the city I hear ___.",
    "My favourite place is ___.",
    "I live near ___.",
    "I can ride a ___.",
    "The city is ___."
  ],
  branchLabels: {
    "In the city I see ___." : ["tall buildings","many cars","big buses","busy streets","traffic lights","modern buildings"],
    "In the city I hear ___." : ["car horns","people talking","bus engines","noise","city sounds","traffic"],
    "My favourite place is ___." : ["the park","the library","the school","the shop","the playground","the swimming pool"],
    "I live near ___." : ["a road","a market","a park","a school","a bus stop","a river"],
    "I can ride a ___." : ["bus","car","taxi","bicycle","train","subway"],
    "The city is ___." : ["busy","noisy","modern","exciting","crowded","big"]
  }
},

// ─────────────────── W11 (already personal, add one enhancement) ───
{
  folder: 'week11',
  file: 'src/data/weeks/week_11/mindmap.js',
  centerStems: [
    "I ___ at the park.",
    "I ___ at the library.",
    "I ___ at the supermarket.",
    "My favourite place is ___.",
    "I love going to ___.",
    "At the weekend, I go to ___."
  ],
  branchLabels: {
    "I ___ at the park." : ["play with friends","run and jump","fly my kite","eat a snack","relax on the grass","have fun with my family"],
    "I ___ at the library." : ["read books","borrow books","do my homework","study quietly","look for new stories","sit and read all day"],
    "I ___ at the supermarket." : ["buy food with my mum","help push the trolley","choose my favourite snacks","count the items","look for the best fruits","read the labels"],
    "My favourite place is ___." : ["the park","the library","the supermarket","the playground","the museum","the sports centre"],
    "I love going to ___." : ["the park on weekends","the library after school","the supermarket with my mum","the playground with friends","the museum on holidays","the sports centre"],
    "At the weekend, I go to ___." : ["the park","the library","the supermarket","the playground","the cinema","my grandparents' house"]
  }
},
{
  folder: 'week11_easy',
  file: 'src/data/weeks_easy/week_11/mindmap.js',
  centerStems: [
    "I ___ at the park.",
    "I ___ at the library.",
    "I ___ at the store.",
    "My favourite place is ___.",
    "I love going to ___.",
    "At the weekend, I ___."
  ],
  branchLabels: {
    "I ___ at the park." : ["play","run","fly my kite","eat a snack","sit on the grass","have fun"],
    "I ___ at the library." : ["read","borrow books","do homework","look for books","sit quietly","study"],
    "I ___ at the store." : ["buy food","help my mum","choose snacks","look for things","count items","find fruit"],
    "My favourite place is ___." : ["the park","the library","the playground","the store","the museum","the swimming pool"],
    "I love going to ___." : ["the park","the library","the store","the playground","the cinema","my grandparents' house"],
    "At the weekend, I ___." : ["go to the park","read a book","play with friends","help at home","go shopping","visit my family"]
  }
},

// ─────────────────── W12 (already personal, enhance one stem) ───
{
  folder: 'week12',
  file: 'src/data/weeks/week_12/mindmap.js',
  centerStems: [
    "I can ___.",
    "My friend can ___.",
    "Can you ___?",
    "I can ___ very well.",
    "My talent is ___.",
    "I cannot ___ yet."
  ],
  branchLabels: {
    "I can ___." : ["swim fast","sing well","draw beautifully","cook a simple meal","ride a bicycle","speak English"],
    "My friend can ___." : ["run very fast","sing beautifully","draw amazing pictures","play football well","speak two languages","solve hard problems"],
    "Can you ___?" : ["swim","sing","draw","ride a bicycle","speak English","play an instrument"],
    "I can ___ very well." : ["swim","sing","draw","run","read","write"],
    "My talent is ___." : ["drawing","singing","running","swimming","reading","making people laugh"],
    "I cannot ___ yet." : ["swim","ride a bicycle","play the piano","speak French","cook a full meal","do a cartwheel"]
  }
},
{
  folder: 'week12_easy',
  file: 'src/data/weeks_easy/week_12/mindmap.js',
  centerStems: [
    "I can ___.",
    "I can ___ well.",
    "Can you ___?",
    "I cannot ___.",
    "I like to ___.",
    "My talent is ___."
  ],
  branchLabels: {
    "I can ___." : ["swim","sing","draw","run","read","write"],
    "I can ___ well." : ["swim","sing","draw","run","jump","write"],
    "Can you ___?" : ["swim","sing","draw","run","read","jump"],
    "I cannot ___." : ["fly","drive a car","play the piano","speak French","run very fast","cook"],
    "I like to ___." : ["swim","sing","draw","run","read","write"],
    "My talent is ___." : ["drawing","singing","running","swimming","reading","making people laugh"]
  }
},

// ─────────────────── W13 (all personal) ───
{
  folder: 'week13',
  file: 'src/data/weeks/week_13/mindmap.js',
  centerStems: [
    "I ___ at 7 o'clock.",
    "I brush my ___.",
    "I eat ___ before school.",
    "After school, I ___.",
    "At night, I go to ___.",
    "My favourite part of the day is ___."
  ],
  branchLabels: {
    "I ___ at 7 o'clock." : ["wake up","get dressed","have breakfast","leave for school","brush my teeth","wash my face"],
    "I brush my ___." : ["teeth","hair","clothes","school bag","coat","boots"],
    "I eat ___ before school." : ["rice and eggs","toast with jam","cereal","fruit and milk","a sandwich","my favourite breakfast"],
    "After school, I ___." : ["do my homework","play with friends","read a book","help at home","watch TV","eat a snack"],
    "At night, I go to ___." : ["bed","sleep","my room","brush my teeth","read a story","say goodnight"],
    "My favourite part of the day is ___." : ["morning breakfast with my family","playing after school","reading before bed","dinner with everyone","the walk to school","bedtime stories"]
  }
},
{
  folder: 'week13_easy',
  file: 'src/data/weeks_easy/week_13/mindmap.js',
  centerStems: [
    "I ___ up.",
    "I brush my ___.",
    "I eat ___.",
    "I ___ with friends.",
    "I go to ___.",
    "My favourite part of the day is ___."
  ],
  branchLabels: {
    "I ___ up." : ["wake","get","stand","sit","dress","clean"],
    "I brush my ___." : ["teeth","hair","clothes","bag","coat","shoes"],
    "I eat ___." : ["breakfast","lunch","dinner","a snack","rice","toast"],
    "I ___ with friends." : ["play","talk","run","eat","laugh","study"],
    "I go to ___." : ["school","the park","bed","my room","the library","the store"],
    "My favourite part of the day is ___." : ["breakfast","playtime","lunch","after school","bedtime","dinner with my family"]
  }
},

// ─────────────────── W14 ───────────────────
{
  folder: 'week14',
  file: 'src/data/weeks/week_14/mindmap.js',
  centerStems: [
    "My poster is about ___.",
    "I can ___.",
    "My family has ___.",
    "I feel ___ when I present.",
    "I feel happy when ___.",
    "I am proud of ___."
  ],
  branchLabels: {
    "My poster is about ___." : ["my family","my talents","my hobbies","my world","my friends and family","things I love"],
    "I can ___." : ["sing","dance","draw","cook","play sports","speak English"],
    "My family has ___." : ["three people","a mother and father","a big brother","a little sister","a kind grandmother","two pets"],
    "I feel ___ when I present." : ["excited","nervous","proud","happy","confident","a little scared"],
    "I feel happy when ___." : ["the audience claps","I finish my speech","I speak clearly","I help someone","I share my work","I tell my story"],
    "I am proud of ___." : ["my poster","my family","my work","my talents","my friends","my progress"]
  }
},
{
  folder: 'week14_easy',
  file: 'src/data/weeks_easy/week_14/mindmap.js',
  centerStems: [
    "I can ___.",
    "My name is ___.",
    "I have ___.",
    "I show ___.",
    "I help ___.",
    "I am proud of ___."
  ],
  branchLabels: {
    "I can ___." : ["sing","draw","read","run","write","dance"],
    "My name is ___." : ["Tom","Anna","Ben","Mary","John","Lisa"],
    "I have ___." : ["a family","a friend","a book","a pet","a school","a home"],
    "I show ___." : ["my poster","my work","my picture","my book","my drawing","my project"],
    "I help ___." : ["my teacher","my friend","my mum","my classmate","my family","everyone"],
    "I am proud of ___." : ["my poster","my work","my family","my friends","my drawing","myself"]
  }
},

// ─────────────────── W15 ───────────────────
{
  folder: 'week15',
  file: 'src/data/weeks/week_15/mindmap.js',
  centerStems: [
    "At the park, I am ___.",
    "My family is ___.",
    "I see children ___.",
    "I enjoy ___.",
    "My favourite outdoor activity is ___.",
    "I am ___ on the grass."
  ],
  branchLabels: {
    "At the park, I am ___." : ["running fast","walking slowly","playing games","flying my kite","jogging with dad","relaxing under trees"],
    "My family is ___." : ["having a picnic","walking together","playing a game","very happy","resting near the fountain","enjoying the sunshine"],
    "I see children ___." : ["playing on the swings","running in the grass","flying kites","eating snacks","playing tag","chasing each other"],
    "I enjoy ___." : ["running at the park","walking with my family","playing with my friends","flying my kite","eating at the park","resting on the grass"],
    "My favourite outdoor activity is ___." : ["running","playing with friends","flying a kite","cycling","swimming","playing football"],
    "I am ___ on the grass." : ["running fast","sitting with my family","playing with friends","reading a book","relaxing","having a picnic"]
  }
},
{
  folder: 'week15_easy',
  file: 'src/data/weeks_easy/week_15/mindmap.js',
  centerStems: [
    "I am ___.",
    "My mom is ___.",
    "I see ___ at the park.",
    "I enjoy ___.",
    "My favourite activity is ___.",
    "I like ___."
  ],
  branchLabels: {
    "I am ___." : ["running fast","walking slowly","playing games","flying my kite","sitting on the grass","very happy"],
    "My mom is ___." : ["walking with me","sitting on the bench","smiling happily","drinking water","reading a book","taking photos"],
    "I see ___ at the park." : ["children playing","a dog running","flowers","tall trees","a fountain","my friends"],
    "I enjoy ___." : ["running","playing with friends","flying my kite","eating a snack","walking","sitting on the grass"],
    "My favourite activity is ___." : ["running","playing","flying a kite","cycling","swimming","playing football"],
    "I like ___." : ["the park","running","my friends","the sunshine","eating outside","playing games"]
  }
},

// ─────────────────── W16 ───────────────────
{
  folder: 'week16',
  file: 'src/data/weeks/week_16/mindmap.js',
  centerStems: [
    "In the game, I am ___.",
    "My favourite sport is ___.",
    "When I play sports, I ___.",
    "I train every day by ___.",
    "My team is ___.",
    "I scored a goal by ___."
  ],
  branchLabels: {
    "In the game, I am ___." : ["kicking the ball","running very fast","jumping high","throwing to my teammate","catching the ball","cheering loudly"],
    "My favourite sport is ___." : ["football","swimming","badminton","running","cycling","basketball"],
    "When I play sports, I ___." : ["feel excited","run my fastest","work as a team","enjoy every moment","play fair","cheer for my teammates"],
    "I train every day by ___." : ["running in the morning","practising my skills","eating healthy food","drinking lots of water","sleeping well","working hard with my team"],
    "My team is ___." : ["strong and fast","always helping each other","the best team","very supportive","practising every day","my favourite group"],
    "I scored a goal by ___." : ["kicking the ball hard","running very fast","passing to a teammate","being in the right position","practising every day","working with my team"]
  }
},
{
  folder: 'week16_easy',
  file: 'src/data/weeks_easy/week_16/mindmap.js',
  centerStems: [
    "I am ___.",
    "My favourite sport is ___.",
    "We are ___.",
    "I like to ___.",
    "At school, I ___.",
    "Sports make me ___."
  ],
  branchLabels: {
    "I am ___." : ["running","jumping","kicking","catching","throwing","cheering"],
    "My favourite sport is ___." : ["football","swimming","running","badminton","cycling","basketball"],
    "We are ___." : ["a team","playing together","winning","having fun","practising","very happy"],
    "I like to ___." : ["run fast","kick the ball","jump high","swim","cycle","play with my team"],
    "At school, I ___." : ["play sports","run in PE","do exercises","practise with my team","learn new sports","enjoy PE class"],
    "Sports make me ___." : ["happy","strong","healthy","excited","energetic","very proud"]
  }
},

// ─────────────────── W17 ───────────────────
{
  folder: 'week17',
  file: 'src/data/weeks/week_17/mindmap.js',
  centerStems: [
    "It is raining, so I am ___.",
    "When it is cold, I wear ___.",
    "The weather today is ___.",
    "My favourite weather is ___.",
    "It is snowing, so I am ___.",
    "On rainy days, I like to ___."
  ],
  branchLabels: {
    "It is raining, so I am ___." : ["wearing a coat","carrying an umbrella","wearing my boots","staying dry inside","putting on my hat","dressing for the weather"],
    "When it is cold, I wear ___." : ["a thick coat","a scarf and gloves","warm boots","a hat","my warmest jacket","layers of clothes"],
    "The weather today is ___." : ["sunny and warm","cold and windy","cloudy","rainy","perfect for a walk","great for playing outside"],
    "My favourite weather is ___." : ["sunny","rainy","snowy","cool and breezy","warm","cloudy with a breeze"],
    "It is snowing, so I am ___." : ["wearing thick boots","putting on my gloves","going outside to play","making a snowman","watching from the window","feeling very excited"],
    "On rainy days, I like to ___." : ["read books at home","stay indoors","watch movies","drink hot chocolate","listen to the rain","draw pictures"]
  }
},
{
  folder: 'week17_easy',
  file: 'src/data/weeks_easy/week_17/mindmap.js',
  centerStems: [
    "It is raining, so I am ___.",
    "When it is cold, I wear ___.",
    "My favourite weather is ___.",
    "It is snowing, so I need ___.",
    "On sunny days, the weather is ___.",
    "On rainy days, I like to ___."
  ],
  branchLabels: {
    "It is raining, so I am ___." : ["wearing a coat","using an umbrella","wearing my boots","staying inside","putting on my hat","getting dressed warmly"],
    "When it is cold, I wear ___." : ["a coat","a scarf","gloves","warm boots","a hat","my warmest jacket"],
    "My favourite weather is ___." : ["sunny","rainy","snowy","cool","warm","cloudy"],
    "It is snowing, so I need ___." : ["warm clothes","thick boots","a hat and gloves","a big coat","warm socks","a scarf"],
    "On sunny days, the weather is ___." : ["warm and bright","perfect for playing","hot","lovely","great for a walk","beautiful"],
    "On rainy days, I like to ___." : ["read books","stay home","watch a film","drink hot chocolate","listen to rain","draw pictures"]
  }
},

// ─────────────────── W18 ───────────────────
{
  folder: 'week18',
  file: 'src/data/weeks/week_18/mindmap.js',
  centerStems: [
    "I am describing ___.",
    "Right now, I am ___.",
    "I am watching ___.",
    "My friends are ___.",
    "I always ___.",
    "My favourite thing to describe is ___."
  ],
  branchLabels: {
    "I am describing ___." : ["the exciting scene","the classroom","what the reporter is doing","what I see","the story","what is happening"],
    "Right now, I am ___." : ["reading a book","eating lunch","playing outside","doing my homework","talking to my friend","walking to school"],
    "I am watching ___." : ["a football match","the news","a cartoon","a nature programme","a cooking show","my favourite show"],
    "My friends are ___." : ["studying together","playing outside","laughing loudly","eating lunch","running in the playground","talking about the news"],
    "I always ___." : ["try my best","help my friends","do my homework","listen carefully","speak clearly","tell the truth"],
    "My favourite thing to describe is ___." : ["my school","my family","my favourite sport","my city","my home","my best friend"]
  }
},
{
  folder: 'week18_easy',
  file: 'src/data/weeks_easy/week_18/mindmap.js',
  centerStems: [
    "I am ___ right now.",
    "My teacher is ___.",
    "At home, Mum is ___.",
    "My class is ___.",
    "I am ___ a picture.",
    "My pet is ___."
  ],
  branchLabels: {
    "I am ___ right now." : ["reading","writing","drawing","eating","playing","learning"],
    "My teacher is ___." : ["talking","writing on the board","explaining","helping us","walking around","asking questions"],
    "At home, Mum is ___." : ["cooking dinner","watching TV","reading a book","cleaning the house","talking on the phone","doing the laundry"],
    "My class is ___." : ["listening","learning","laughing","writing","working hard","very happy today"],
    "I am ___ a picture." : ["drawing","painting","colouring","describing","looking at","creating"],
    "My pet is ___." : ["sleeping on the sofa","running in the garden","playing","eating","sitting quietly","very fluffy"]
  }
},

// ─────────────────── W19 (all personal already, but enhance one stem) ───
{
  folder: 'week19',
  file: 'src/data/weeks/week_19/mindmap.js',
  centerStems: [
    "When I was a baby, I was ___.",
    "My photos from the past were ___.",
    "In my old album, I was ___.",
    "When I was in kindergarten, I was ___.",
    "My favourite childhood memory is ___.",
    "Now I am big, but I was ___."
  ],
  branchLabels: {
    "When I was a baby, I was ___." : ["very small","learning to walk","crying a lot","always laughing","sleeping all day","very cute"],
    "My photos from the past were ___." : ["very funny","so cute","full of memories","black and white","in an old album","my favourite pictures"],
    "In my old album, I was ___." : ["very small","wearing cute clothes","laughing with my family","looking very young","sitting in the garden","learning to walk"],
    "When I was in kindergarten, I was ___." : ["very small","learning to write","playing all day","making new friends","drawing pictures","singing songs"],
    "My favourite childhood memory is ___." : ["playing at the park","swimming with my family","reading with my mum","my first day at school","a holiday with my family","baking cookies with my grandma"],
    "Now I am big, but I was ___." : ["very small","afraid of the dark","learning to walk","wearing nappies","carried everywhere","my mum's little baby"]
  }
},
{
  folder: 'week19_easy',
  file: 'src/data/weeks_easy/week_19/mindmap.js',
  centerStems: [
    "I was ___.",
    "My photo was ___.",
    "When I was small, I was ___.",
    "My favourite memory is ___.",
    "In my album, I was ___.",
    "Now I am big, but I was ___."
  ],
  branchLabels: {
    "I was ___." : ["very small","very cute","learning to walk","always happy","a baby","tiny"],
    "My photo was ___." : ["very cute","very funny","in an old album","in black and white","a baby photo","my favourite"],
    "When I was small, I was ___." : ["very tiny","always playing","learning to talk","wearing baby clothes","very happy","with my mum"],
    "My favourite memory is ___." : ["playing at the park","swimming with my family","a holiday","my first day at school","baking with my grandma","a day with my family"],
    "In my album, I was ___." : ["very small","very cute","laughing","wearing baby clothes","sitting with my family","learning to walk"],
    "Now I am big, but I was ___." : ["very small","afraid of the dark","a baby","learning to walk","tiny","always crying"]
  }
},

// ─────────────────── W20 ───────────────────
{
  folder: 'week20',
  file: 'src/data/weeks/week_20/mindmap.js',
  centerStems: [
    "My town used to have ___.",
    "I remember when my town ___.",
    "My favourite old place in my town is ___.",
    "Now my town has ___ instead.",
    "I wish my town still had ___.",
    "The oldest thing in my town is ___."
  ],
  branchLabels: {
    "My town used to have ___." : ["a wooden bridge","a big market","dirt roads","a small temple","a clean river","old houses with gardens"],
    "I remember when my town ___." : ["had no tall buildings","was quiet and peaceful","had a big old market","had many trees on the road","had a beautiful old temple","had a clean river flowing through it"],
    "My favourite old place in my town is ___." : ["the old temple","the old bridge","the riverside","the town square","the old school","the old market"],
    "Now my town has ___ instead." : ["a new road","a modern bridge","a shopping centre","tall buildings","a new market","more cars and buses"],
    "I wish my town still had ___." : ["the old market","the wooden bridge","the clean river","the old trees","more quiet streets","fewer cars"],
    "The oldest thing in my town is ___." : ["the temple","the big old tree","the old bridge","the river","the town square","the old school building"]
  }
},
{
  folder: 'week20_easy',
  file: 'src/data/weeks_easy/week_20/mindmap.js',
  centerStems: [
    "There was a ___ near my house.",
    "I remember ___.",
    "The old market had ___.",
    "Now my town has a new ___.",
    "My favourite old place is ___.",
    "I wish my town still had ___."
  ],
  branchLabels: {
    "There was a ___ near my house." : ["market","big tree","bridge","small road","temple","river"],
    "I remember ___." : ["many trees on the road","small old shops","people walking everywhere","flowers by the road","old beautiful buildings","a wooden bridge"],
    "The old market had ___." : ["fresh food","many sellers","small stalls","fruit and vegetables","lots of people","wooden tables"],
    "Now my town has a new ___." : ["road","bridge","building","market","park","school"],
    "My favourite old place is ___." : ["the old temple","the big old tree","the old bridge","the riverside","the town square","the old market"],
    "I wish my town still had ___." : ["the old market","the wooden bridge","the clean river","the old trees","more quiet streets","the old school"]
  }
},

// ─────────────────── W21 (all personal already) ───
{
  folder: 'week21',
  file: 'src/data/weeks/week_21/mindmap.js',
  centerStems: [
    "Yesterday, I ___.",
    "My friend ___.",
    "In the morning, I ___.",
    "I really enjoyed ___.",
    "At home, I ___.",
    "My best memory from last week was ___."
  ],
  branchLabels: {
    "Yesterday, I ___." : ["went to the park","played football with friends","visited my grandparents","read a great book","cooked with my mum","stayed home and drew pictures"],
    "My friend ___." : ["came to my house to play","called me on the phone","helped me with homework","laughed with me all day","sent me a funny message","played football with me"],
    "In the morning, I ___." : ["woke up early","had a delicious breakfast","brushed my teeth carefully","walked to school with a friend","did some exercise","read my favourite book"],
    "I really enjoyed ___." : ["playing at the park","cooking with my family","reading a great story","watching my favourite show","playing with my best friend","visiting my grandparents"],
    "At home, I ___." : ["did my homework","helped set the table","played a board game","watched a film with my family","cooked a simple meal","read before bedtime"],
    "My best memory from last week was ___." : ["playing at the park with friends","going on a family trip","making a delicious meal","watching a great movie","winning a game","spending time with my family"]
  }
},
{
  folder: 'week21_easy',
  file: 'src/data/weeks_easy/week_21/mindmap.js',
  centerStems: [
    "Yesterday, I ___.",
    "My friend ___.",
    "In the morning, I ___.",
    "I really enjoy ___.",
    "At home, I ___.",
    "My best day was ___."
  ],
  branchLabels: {
    "Yesterday, I ___." : ["went to the park","played with my friends","visited my grandma","read a book","helped my mum","drew a picture"],
    "My friend ___." : ["came to my house","called me","helped me","laughed with me","played with me","sent me a message"],
    "In the morning, I ___." : ["woke up early","had breakfast","brushed my teeth","walked to school","did exercise","read a book"],
    "I really enjoy ___." : ["playing at the park","reading books","cooking with mum","watching my favourite show","playing with my best friend","visiting my grandparents"],
    "At home, I ___." : ["did my homework","helped mum","played a game","watched a film","read a story","cooked with mum"],
    "My best day was ___." : ["a day at the park","a family trip","a fun game day","a great film night","a day with my best friend","a holiday with my family"]
  }
}

]; // end WEEKS

// ─── Process all weeks ───────────────────────────────────────────────────────
let totalIssues = 0;

for (const week of WEEKS) {
  const filePath = path.join(ROOT, week.file);
  const content = renderFile(week.centerStems, week.branchLabels, week.folder);
  fs.writeFileSync(filePath, content, 'utf-8');

  let issues = 0;
  for (const stem of week.centerStems) {
    const branches = week.branchLabels[stem] || [];
    for (const branch of branches) {
      if (stem.replace('___', branch).includes('___')) issues++;
    }
  }

  // Count personal stems
  const personalCount = week.centerStems.filter(s => s.startsWith('I ') || s.startsWith('My ') || s.startsWith('I\'m')).length;

  console.log(`${issues === 0 ? '✅' : '❌'} ${week.folder}: ${personalCount}/6 personal stems${issues ? ` — ${issues} blank issues` : ''}`);
  totalIssues += issues;
}

console.log(`\n${totalIssues === 0 ? '✅ All clean!' : `❌ ${totalIssues} issues remaining`}`);
console.log('Run _audit_w01_27.mjs to verify audio URLs.');
