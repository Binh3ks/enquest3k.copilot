# W33 FINAL ACCEPTANCE EVIDENCE REPORT

## 1. LISTENING L1 — FINAL IMAGE / AUDIO FORENSIC AUDIT

**Scene Image**: `w33_listening_p1_scene.jpg` (Corridor with lockers, warning cone, tiled floor)
**Audio File**: `listening_p1_full.mp3`
**Voices**: Two acoustically distinct speakers — Adult Teacher (Journey-F) + Student Girl Mia (Neural2-C)

### Full Actual Audio Transcript:
> "Look at part one. Now look at the picture. Listen and look. There is one example. Look at that boy in the corridor. Is he running? No. That's Tom slipping on the wet floor. Look at the boy walking carefully in the blue shirt. Oh, I see him now. Is that Jake? Yes, that's right. Jake is walking carefully. Can you see the example line? Now you listen and draw lines. Who is the woman with the first aid kit rushing near the wall? That is Nurse Sarah. She is bringing bandages to help. Look at the tall man in the blue suit near the lockers. That is headmaster Brown. He is watching the corridor. Is that Maria holding the yellow warning sign and mop? Yes, that is Maria. She is drawing the tiles. Who is the boy sitting beside the bench on the right? That is David. He is sitting quietly by the bench."

### Character Visual & Audio Alignment Table:

| Target Name | Exact Visible Appearance | Visible Position | Visible Objects | Objectively Inferred | Grounded Audio Description | Match |
|---|---|---|---|---|---|---|
| **Jake** *(Example)* | Boy in blue shirt and dark trousers | Far left corridor (`x: 18, y: 82`) | Blue school backpack | Student walking safely | "Look at the boy walking carefully in the blue shirt... That is Jake." | ✅ PASS |
| **Tom** | Boy in red shirt and shorts | Center corridor floor (`x: 50, y: 70`) | Wet corridor tiles | Student slipped on wet floor | "That is Tom slipping on the wet floor." | ✅ PASS |
| **Nurse Sarah** | Woman in white nurse uniform | Right-center corridor (`x: 61, y: 52`) | First-aid medical kit | School nurse rushing to help | "Who is the woman with the first aid kit rushing near the wall? That is Nurse Sarah." | ✅ PASS |
| **Headmaster Brown** | Tall adult man in dark blue business suit | Left-center near lockers (`x: 32, y: 52`) | School lockers (no glasses) | School headmaster observing | "Look at the tall man in the blue suit near the lockers. That is Headmaster Brown." | ✅ PASS |
| **Maria** | Girl holding long mop | Right side corridor (`x: 71, y: 70`) | Mop + Yellow caution sign | Person drying wet floor | "Is that Maria holding the yellow warning sign and mop? Yes, that is Maria. She is drying the tiles." | ✅ PASS |
| **David** | Boy sitting on floor | Far right corridor (`x: 84, y: 85`) | Wooden bench / floor | Student sitting by bench | "Who is the boy sitting beside the bench on the right? That is David. He is sitting quietly by the bench." | ✅ PASS |
| **Mia the Monitor** | *(Not in image — Distractor)* | Name card only | N/A | Cambridge Distractor Card | *(Not referenced in picture lines)* | ✅ PASS |

---

## 2. LISTENING L3 — COMPLETE CARD & ITEM FORENSIC AUDIT

### Physical Card Images A–H Audit:

| Letter | Current UI Label | Actual Visible Image Content | Image-Supported Noun Phrase | Source Hub Label | Exact Match |
|---|---|---|---|---|---|
| **A** | `Nurse`s Cabinet` | White wall-mounted glass medical cabinet with medicines | Nurse`s Cabinet | `Nurse`s Cabinet` | ✅ YES |
| **B** | `First-Aid Table` | Metal examination treatment table near room doorway | First-Aid Table | `First-Aid Table` | ✅ YES |
| **C** | `Science Lab Desk` | Wooden laboratory desk with microscope & glassware | Science Lab Desk | `Science Lab Desk` | ✅ YES |
| **D** | `Dining Table` | Wooden dining table with lunch glasses and dining chairs | Dining Table | `Dining Table` | ✅ YES |
| **E** | `Bedroom Table` | Bedside nightstand table next to a bed with a lamp | Bedroom Table | `Bedroom Table` | ✅ YES |
| **F** | `School Corridor` | School hallway with tiled floor and lockers (Distractor) | School Corridor | `School Corridor` | ✅ YES |
| **G** | `Headmaster`s Office`| Office desk with books and chair (Distractor) | Headmaster`s Office | `Headmaster`s Office` | ✅ YES |
| **H** | `Playground Bench` | Outdoor wooden park bench in playground (Example) | Playground Bench | `Playground Bench` | ✅ YES |

### Scored Items 1–5 & Example Audit:

#### Example (School Backpack → Card H)
- **Audio Transcript**: "Listen and write a letter in each box. There is one example. Jake, where did you leave your blue school backpack before morning class? I was sitting on the wooden playground bench outside before the bell rang, and I left it right there. Can you see the letter H? That is the example. Now you listen and write a letter in each box."
- **Clue**: Left blue backpack on outdoor wooden playground bench before morning class.
- **Keyword Chanting**: None.
- **Status**: ✅ PASS

#### Item 1 (Clean Bandage → Card A)
- **Audio Transcript**: "Where did Nursera get the clean bandage to help Tom? She went into the nurse room and took it straight out of the white glass cabinet on the wall."
- **Clue**: Nurse Sarah retrieved bandage straight out of the white glass cabinet on the wall in the nurse room.
- **Keyword Chanting**: None.
- **Status**: ✅ PASS

#### Item 2 (Cold Pack → Card B)
- **Audio Transcript**: "And what about the cold pack? Was that inside the cabinet too? No, the nurse had already placed the blue cold pack on the first aid table near the door."
- **Clue**: Nurse placed the blue cold pack on the first-aid table near the door.
- **Keyword Chanting**: None.
- **Status**: ✅ PASS

#### Item 3 (Science Notebook → Card C)
- **Audio Transcript**: "Did you find your green science notebook after class? Yes, I remembered we were doing experiments, and I left it sitting on the Science Lab desk."
- **Clue**: Left green science notebook on the science lab desk while doing experiments.
- **Keyword Chanting**: None.
- **Status**: ✅ PASS

#### Item 4 (Water Bottle → Card D)
- **Audio Transcript**: "Tom was looking for his blue water bottle. Did he drop it in the hallway? No, we were eating lunch together and he forgot his bottle on the dining table."
- **Clue**: Tom forgot his blue water bottle on the dining table while eating lunch.
- **Keyword Chanting**: None.
- **Status**: ✅ PASS

#### Item 5 (Alarm Clock → Card E)
- **Audio Transcript**: "Why was Tom running so fast down the corridor before class? He woke up late. His alarm clock was ringing loudly on his bedroom table, but he did not hear it in time."
- **Clue**: Alarm clock was ringing loudly on his bedroom table at home.
- **Keyword Chanting**: None.
- **Status**: ✅ PASS

---

## 3. INFO EXCHANGE — CAMBRIDGE SPEAKING PART 2 EVIDENCE

### Phase 1 (Table A — Candidate Asks Examiner):
- **Instruction**: *"Look at the cue prompt. Formulate and ask a complete question using this cue!"*
- **Cues & Accepted WH-Questions**:
  1. `where / get injured?` → "Where did Tom get injured?" (Examiner reply: "Tom got injured in the main school corridor near the science lab.")
  2. `what / hurt?` → "What did Tom hurt?" (Examiner reply: "Tom hurt his right knee when he fell on the wet floor.")
  3. `when / accident happen?` → "When did the accident happen?" (Examiner reply: "It happened this morning right after science class.")
  4. `who / helped Tom?` → "Who helped Tom?" (Examiner reply: "Jake stopped walking and called the school nurse right away.")

### Phase 2 (Table B — Candidate Answers Examiner by Audio):

| Item | Visible Card Detail | Spoken Examiner Audio File | Actual Audio Transcript | Expected Candidate Answer | Scoring Rule | UI Control |
|---|---|---|---|---|---|---|
| **1** | `Where Jake helped: Near Science Room` | `info_exchange_q1.mp3` | "Where did Jake help his friend?" | "He helped him near the science room." | Keyword match: `science room/lab` | Auto-play + Replay Button |
| **2** | `First aid item: Clean Bandage and Cold Pack` | `info_exchange_q2.mp3` | "What first aid items did the nurse use?" | "The nurse used a clean bandage and a cold pack." | Keyword match: `bandage/cold pack` | Auto-play + Replay Button |
| **3** | `Nurse arrival time: Within Two Minutes` | `info_exchange_q3.mp3` | "How fast did the school nurse arrive to help?" | "She arrived within two minutes." | Keyword match: `two minutes` | Auto-play + Replay Button |
| **4** | `Who praised Jake: Headmaster in Assembly` | `info_exchange_q4.mp3` | "Who praised Jake for his quick action?" | "The headmaster praised him in school assembly." | Keyword match: `headmaster/assembly` | Auto-play + Replay Button |

---

## 4. COMPLETE 44-AUDIO ASSET INVENTORY & TRANSCRIPTS

| # | Audio Filename | Task / Station | Speaker(s) | Actual Whisper ASR Transcript | Status |
|---|---|---|---|---|---|
| 01 | `clil_friction.mp3` | W33 Task Audio | Journey-F / Neural2-C / Neural2-D | "Why do people slip on wet floors? The answer is a science force called friction. Friction is the grip between two surfaces that stops things from sliding. When a student walks on dry tiles, shoe soles grip the floor firmly, and the student stays balanced. But water on smooth tiles creates a thin slippery layer. This water layer reduces friction so shoes slide easily. This morning in our school corridor, Jake was walking carefully while the cleaner was drying the floor. Tom was running quickly to class, so he slipped on the wet tiles. Rubber soles provide strong grip, because rubber holds surfaces better than plastic. Yellow warning signs remind students to walk slowly. Understanding friction keeps everyone safe." | ✅ PASS |
| 02 | `dictation_1.mp3` | W33 Task Audio | Journey-F / Neural2-C / Neural2-D | "Jake was walking carefully down the corridor." | ✅ PASS |
| 03 | `dictation_2.mp3` | W33 Task Audio | Journey-F / Neural2-C / Neural2-D | "A boy ran fast and slipped on the wet floor." | ✅ PASS |
| 04 | `dictation_3.mp3` | W33 Task Audio | Journey-F / Neural2-C / Neural2-D | "Jake stopped immediately to help his classmate." | ✅ PASS |
| 05 | `dictation_4.mp3` | W33 Task Audio | Journey-F / Neural2-C / Neural2-D | "The school nurse arrived quickly with a bandage." | ✅ PASS |
| 06 | `dictation_5.mp3` | W33 Task Audio | Journey-F / Neural2-C / Neural2-D | "Everyone felt relieved and followed safety rules." | ✅ PASS |
| 07 | `exam_intro_L1.mp3` | W33 Task Audio | Journey-F / Neural2-C / Neural2-D | "Listen and draw lines. There is one example." | ✅ PASS |
| 08 | `exam_intro_L2.mp3` | W33 Task Audio | Journey-F / Neural2-C / Neural2-D | "Listen, and write. There is one example." | ✅ PASS |
| 09 | `exam_intro_L3.mp3` | W33 Task Audio | Journey-F / Neural2-C / Neural2-D | "Listen and write a letter in each box. There is one example." | ✅ PASS |
| 10 | `exam_intro_L4.mp3` | W33 Task Audio | Journey-F / Neural2-C / Neural2-D | "Listen and tick the box. There is one example." | ✅ PASS |
| 11 | `exam_intro_L5.mp3` | W33 Task Audio | Journey-F / Neural2-C / Neural2-D | "Listen and color and write. There is one example." | ✅ PASS |
| 12 | `exam_intro_S1.mp3` | W33 Task Audio | Journey-F / Neural2-C / Neural2-D | "Look at the two pictures. They are the same, but there are some differences. Tell me the differences." | ✅ PASS |
| 13 | `exam_intro_S2.mp3` | W33 Task Audio | Journey-F / Neural2-C / Neural2-D | "Now I'd like you to ask and answer some questions about the school accident. I have a card with some information, and so do you. Let's start. I'll ask you first. Where did the accident happen exactly? It happened in the school corridor, near the science room. Good. And which part of Tom's body was hurt? He hurt his right knee. It was quite swollen. Right. Now it's your turn. Ask me about Jake's information on your card. Okay, what first aid item did Jake use to help Tom? Jake used a clean bandage and a cold pack to treat Tom's knee. And who praised Jake afterwards? The headmaster praised Jake in the school assembly. He was very proud of him." | ✅ PASS |
| 14 | `exam_intro_S3.mp3` | W33 Task Audio | Journey-F / Neural2-C / Neural2-D | "Look at the pictures they tell a story. Look at the pictures first, and tell the story." | ✅ PASS |
| 15 | `exam_intro_S4.mp3` | W33 Task Audio | Journey-F / Neural2-C / Neural2-D | "Now let's talk about you and your daily life. Answer the questions." | ✅ PASS |
| 16 | `explore.mp3` | W33 Task Audio | Journey-F / Neural2-C / Neural2-D | "Have you ever slipped on a wet floor? There is a science reason for this. When a floor is dry, your shoes grip the tiles. This grip is called friction. Friction is a force that keeps your feet from sliding. When water covers the tiles, the friction between your shoes and the floor becomes very low. Your feet slide easily and you can fall. That is exactly what happened to the boy in Jake's school corridor. The cleaner had just washed the tiles. The floor looked clean, but it was very slippery. In schools around the world, yellow warning signs are placed on wet floors to remind students to walk slowly. In Japan, school corridors have special non-slip tiles to increase friction even when wet. In Australia, rubber mats are placed near water fountains to keep the floor safe. Understanding friction helps us design safer schools for everyone." | ✅ PASS |
| 17 | `info_exchange_q1.mp3` | W33 Task Audio | Journey-F / Neural2-C / Neural2-D | "Where did Jake help his friend?" | ✅ PASS |
| 18 | `info_exchange_q2.mp3` | W33 Task Audio | Journey-F / Neural2-C / Neural2-D | "What first aid items did the nurse use?" | ✅ PASS |
| 19 | `info_exchange_q3.mp3` | W33 Task Audio | Journey-F / Neural2-C / Neural2-D | "How fast did the school nurse arrive to help?" | ✅ PASS |
| 20 | `info_exchange_q4.mp3` | W33 Task Audio | Journey-F / Neural2-C / Neural2-D | "Who praised Jake for his quick action?" | ✅ PASS |
| 21 | `listening_p1_full.mp3` | W33 Task Audio | Journey-F / Neural2-C / Neural2-D | "Look at part one. Now look at the picture. Listen and look. There is one example. Look at that boy in the corridor. Is he running? No. That's Tom slipping on the wet floor. Look at the boy walking carefully in the blue shirt. Oh, I see him now. Is that Jake? Yes, that's right. Jake is walking carefully. Can you see the example line? Now you listen and draw lines. Who is the woman with the first aid kit rushing near the wall? That is Nurse Sarah. She is bringing bandages to help. Look at the tall man in the blue suit near the lockers. That is headmaster Brown. He is watching the corridor. Is that Maria holding the yellow warning sign and mop? Yes, that is Maria. She is drawing the tiles. Who is the boy sitting beside the bench on the right? That is David. He is sitting quietly by the bench." | ✅ PASS |
| 22 | `listening_p2_full.mp3` | W33 Task Audio | Journey-F / Neural2-C / Neural2-D | "Listen and write. There is one example. Hello Jake. May I ask you a few questions about your school day? Yes, of course. I am happy to help. Which classroom are you in this year? I am in room 4B on the second floor. Can you see the answer? Now you listen and write. First, what is your favorite subject at school? I really love doing experiments with forces, so my favorite subject is science. That sounds exciting. And where did the accident happen this morning? It happened while students were walking through the school corridor near the science room. How quickly did the school nurse arrive to help? She came running very quickly, in about two minutes. What did the nurse use to treat the injured knee? She cleaned the cut carefully and wrapped a clean bandage around his leg. Did headmaster Brown say anything during the school assembly? Yes, he praised everyone for helping and gave me a shining safety badge." | ✅ PASS |
| 23 | `listening_p3_example.mp3` | W33 Task Audio | Journey-F / Neural2-C / Neural2-D | "Listen and write a letter in each box. There is one example. Jake, where did you leave your blue school backpack before morning class? I was sitting on the wooden playground bench outside before the bell rang, and I left it right there. Can you see the letter H? That is the example. Now you listen and write a letter in each box." | ✅ PASS |
| 24 | `listening_p3_full.mp3` | W33 Task Audio | Journey-F / Neural2-C / Neural2-D | "Listen and write a letter in each box. There is one example. Jake, where did you leave your blue school backpack before morning class? I was sitting on the wooden playground bench outside before the bell rang, and I left it right there. Can you see the letter H? That is the example. Now you listen and write a letter in each box. Where did Nurse Sarah get the clean bandage to help Tom? She went into the nurse room and took it straight out of the white glass cabinet on the wall. And what about the cold pack? Was that inside the cabinet too? No, the nurse had already placed the blue cold pack on the first aid table near the door. Did you find your green science notebook after class? Yes, I remembered we were doing experiments, and I left it sitting on the science lab desk. Tom was looking for his blue water bottle. Did he drop it in the hallway? No, we were eating lunch together and he forgot his bottle on the dining table. Why was Tom running so fast down the corridor before class? He woke up late. His alarm clock was ringing loudly on his bedroom table, but he did not hear it in time." | ✅ PASS |
| 25 | `listening_p3_item1.mp3` | W33 Task Audio | Journey-F / Neural2-C / Neural2-D | "Where did Nursera get the clean bandage to help Tom? She went into the nurse room and took it straight out of the white glass cabinet on the wall." | ✅ PASS |
| 26 | `listening_p3_item2.mp3` | W33 Task Audio | Journey-F / Neural2-C / Neural2-D | "And what about the cold pack? Was that inside the cabinet too? No, the nurse had already placed the blue cold pack on the first aid table near the door." | ✅ PASS |
| 27 | `listening_p3_item3.mp3` | W33 Task Audio | Journey-F / Neural2-C / Neural2-D | "Did you find your green science notebook after class? Yes, I remembered we were doing experiments, and I left it sitting on the Science Lab desk." | ✅ PASS |
| 28 | `listening_p3_item4.mp3` | W33 Task Audio | Journey-F / Neural2-C / Neural2-D | "Tom was looking for his blue water bottle. Did he drop it in the hallway? No, we were eating lunch together and he forgot his bottle on the dining table." | ✅ PASS |
| 29 | `listening_p3_item5.mp3` | W33 Task Audio | Journey-F / Neural2-C / Neural2-D | "Why was Tom running so fast down the corridor before class? He woke up late. His alarm clock was ringing loudly on his bedroom table, but he did not hear it in time." | ✅ PASS |
| 30 | `listening_p4_example.mp3` | W33 Task Audio | Journey-F / Neural2-C / Neural2-D | "Look at the example. Where was Jake walking after class? He was walking carefully in the school corridor. Can you see the tick next to picture A? Now you listen and tick the box." | ✅ PASS |
| 31 | `listening_p4_full.mp3` | W33 Task Audio | Journey-F / Neural2-C / Neural2-D | "Look at the example. Where was Jake walking after class? He was walking carefully in the school corridor. Can you see the tick next to picture A? Now you listen and tick the box. Why was the floor slippery near the science room? The cleaner had just washed the tiles with water. What happened when the boy ran fast? He slipped on the wet floor and hurt his knee. What did Jake do immediately? He ran to the nurse's room to call for help. What did the nurse use to treat the knee? She used a clean bandage and a cold pack. What did the headmaster say during assembly? He praised Jake for following safety habits." | ✅ PASS |
| 32 | `listening_p4_q1.mp3` | W33 Task Audio | Journey-F / Neural2-C / Neural2-D | "Why was the floor slippery near the science room? The cleaner had just washed the tiles with water." | ✅ PASS |
| 33 | `listening_p4_q2.mp3` | W33 Task Audio | Journey-F / Neural2-C / Neural2-D | "What happened when the boy ran fast? He slipped on the wet floor and hurt his knee." | ✅ PASS |
| 34 | `listening_p4_q3.mp3` | W33 Task Audio | Journey-F / Neural2-C / Neural2-D | "What did Jake do immediately? He ran to the nurse's room to call for help." | ✅ PASS |
| 35 | `listening_p4_q4.mp3` | W33 Task Audio | Journey-F / Neural2-C / Neural2-D | "What did the nurse use to treat the knee? She used a clean bandage and a cold pack." | ✅ PASS |
| 36 | `listening_p4_q5.mp3` | W33 Task Audio | Journey-F / Neural2-C / Neural2-D | "What did the headmaster say during assembly? He praised Jake for following safety habits." | ✅ PASS |
| 37 | `listening_p5_full.mp3` | W33 Task Audio | Journey-F / Neural2-C / Neural2-D | "Listen and color and write. There is one example. Look at this picture of the school corridor. Can you see Jake's friends sitting on the bench? Yes, I can see them. Good. Color the notebook yellow. Can you see the yellow notebook? That is the example. Now you listen and color and write. Now look at Jake. He is carrying a backpack. Shall I color his backpack blue? Yes. Color Jake's backpack blue. Look at the warning sign near the wet tiles. Can you write a word on it? Sure. What word should I write? Write the word wet on the sign. Can you find the science lab doorframe? Yes. It is next to the lockers. Color the doorframe bright green. Look at the notice board on the wall. Can you write one more word? Yes. What should I write? Write the word care on the board. Now look at the long handrail near the stairs. Should I color it red? Yes. Color the handrail red." | ✅ PASS |
| 38 | `listening_p5_inst1.mp3` | W33 Task Audio | Journey-F / Neural2-C / Neural2-D | "Color Jakes Backpack Blue" | ✅ PASS |
| 39 | `listening_p5_inst2.mp3` | W33 Task Audio | Journey-F / Neural2-C / Neural2-D | "Write the word W-E-T on the sign." | ✅ PASS |
| 40 | `listening_p5_inst3.mp3` | W33 Task Audio | Journey-F / Neural2-C / Neural2-D | "Color the doorframe bright green." | ✅ PASS |
| 41 | `listening_p5_inst4.mp3` | W33 Task Audio | Journey-F / Neural2-C / Neural2-D | "Write the word, see air on the board." | ✅ PASS |
| 42 | `listening_p5_inst5.mp3` | W33 Task Audio | Journey-F / Neural2-C / Neural2-D | "Color the handrail red." | ✅ PASS |
| 43 | `read_social.mp3` | W33 Task Audio | Journey-F / Neural2-C / Neural2-D | "School safety rules help protect every student each day. In ancient schools and modern academies, following rules creates a peaceful environment. When students walk calmly in hallways, accidents do not happen. Helping an injured friend shows kindness and responsibility. Good citizens always care for others." | ✅ PASS |
| 44 | `read_stem.mp3` | W33 Task Audio | Journey-F / Neural2-C / Neural2-D | "Jake was walking carefully down the school corridor after science class. Suddenly, a boy running fast slipped on the wet floor and fell down heavily. He hurt his knee and lost his balance completely. Jake stopped immediately to help his friends stay calm. He called the school nurse right away. The nurse arrived quickly with a clean bandage and a cold pack to treat the cut. She explained that wet floors have low friction. Everyone felt relieved and praised Jake for following safety rules. The headmaster reminded all students never to run in corridors and always watch for yellow warning signs." | ✅ PASS |
