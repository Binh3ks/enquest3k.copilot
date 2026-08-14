/**
 * Week 33 Gold Standard Data — Listening Hub
 * Theme: "Corridor Safety & School Care"
 */

import dictation from './dictation.js';
import shadowing from './shadowing.js';

export const listeningHubData = {
  week: 33,
  theme: "Corridor Safety & School Care",
  dictation,
  shadowing,

  // Cambridge Listening Part 1 (SVG Line Matcher)
  listening_p1: {
    image_url: '/images/week33/w33_listening_p1_scene.jpg',
    passage_audio_script: "Look at Part 1. Listen and draw lines. Mia: Look at that boy in the corridor! Is he running? Teacher: No, the boy slipping on the wet floor in the red shirt is Tom! Look at the boy walking carefully in the blue shirt. Mia: Oh, I see him now. Is that Jake? Teacher: Yes, that's right. Jake is walking carefully. Mia: Who is the lady in the white uniform carrying a bandage? Teacher: That's the school nurse! She is rushing to help Tom. Mia: And who is the tall man in the blue suit talking to students? Teacher: That's the headmaster. He is making sure everyone stays safe. Mia: Look at the girl near the yellow wet floor sign holding a mop. Teacher: Ah, that's Mia. She is cleaning the wet floor so nobody else falls.",
    names: [
      { id: 'n1', text: 'Jake', target_id: 't1' },
      { id: 'n2', text: 'School Nurse', target_id: 't2' },
      { id: 'n3', text: 'Tom', target_id: 't3' },
      { id: 'n4', text: 'Headmaster', target_id: 't4' },
      { id: 'n5', text: 'Mia', target_id: 't5' }
    ],
    targets: [
      { id: 't1', label: 'Jake (Boy walking carefully)', x: 20, y: 60 },
      { id: 't2', label: 'School Nurse (Carrying bandage)', x: 39, y: 50 },
      { id: 't3', label: 'Tom (Slipping on wet floor)', x: 56, y: 68 },
      { id: 't4', label: 'Headmaster (In blue suit)', x: 74, y: 48 },
      { id: 't5', label: 'Mia (Girl holding mop)', x: 88, y: 52 }
    ]
  },

  // Cambridge Listening Part 3 (Visual Matching A-H)
  listening_p3: {
    passage_audio_script: "Teacher: Hello Jake! Can you tell me where all these items were placed during the incident in the corridor?\nJake: Sure! First, when Tom fell, the school nurse brought a clean bandage. She kept it in the medical cabinet, which is picture card A.\nTeacher: Great! What about the cold pack to cool his hurt knee?\nJake: Ah, the cold pack was placed on the first aid table. That is picture card B.\nTeacher: Where was Tom's science notebook?\nJake: Tom dropped his science notebook on the lab desk before running, so that is picture card C.\nTeacher: I see a glass of orange juice. Did anyone spill it?\nJake: No, it was sitting safely on the cafeteria table, which is picture card D.\nTeacher: And lastly, what about the red alarm clock?\nJake: The alarm clock was on the bedroom table at home, picture card E! The backpack, water bottle, and first aid box weren't used at all.",
    items: [
      { id: 1, name: 'Clean Bandage', target_letter: 'A', audio_text: 'The clean bandage was kept in the medical cabinet, picture card A.' },
      { id: 2, name: 'Cold Pack', target_letter: 'B', audio_text: 'The cold pack was placed on the first aid table, picture card B.' },
      { id: 3, name: 'Science Notebook', target_letter: 'C', audio_text: 'The science notebook was on the lab desk, picture card C.' },
      { id: 4, name: 'Orange Juice', target_letter: 'D', audio_text: 'The orange juice glass was on the cafeteria table, picture card D.' },
      { id: 5, name: 'Alarm Clock', target_letter: 'E', audio_text: 'The alarm clock was on the bedroom table, picture card E.' }
    ],
    cards: [
      { letter: 'A', name: 'Clean Bandage', image_url: '/images/week33/card_clean_bandage.jpg' },
      { letter: 'B', name: 'Cold Pack', image_url: '/images/week33/card_cold_pack.jpg' },
      { letter: 'C', name: 'Science Notebook', image_url: '/images/week33/card_science_notebook.jpg' },
      { letter: 'D', name: 'Orange Juice', image_url: '/images/week33/card_orange_juice.jpg' },
      { letter: 'E', name: 'Alarm Clock', image_url: '/images/week33/card_alarm_clock.jpg' },
      { letter: 'F', name: 'School Backpack', image_url: '/images/week33/card_backpack.jpg' },
      { letter: 'G', name: 'Water Bottle', image_url: '/images/week33/card_water_bottle.jpg' },
      { letter: 'H', name: 'First Aid Kit', image_url: '/images/week33/card_first_aid_kit.jpg' }
    ]
  },

  // Cambridge Listening Part 4 (3-Picture Option Cards with Distractors)
  listening_p4_questions: [
    {
      id: 'lp4_1',
      question: '1. Where did Tom slip and hurt his knee?',
      audio_script: "Girl: Did Tom slip inside the science lab?\nBoy: No, he was walking past the science lab, but he actually slipped on wet tiles in the school corridor!\nGirl: Oh, so it was in the corridor, not in the lab or playground!",
      options: [
        { label: 'A', text: 'In the school corridor', image_url: '/images/week33/webtoon_scene_3.png', isCorrect: true },
        { label: 'B', text: 'Inside the science lab', image_url: '/images/week33/webtoon_scene_1.png', isCorrect: false },
        { label: 'C', text: 'On the outdoor playground', image_url: '/images/week33/webtoon_scene_2.png', isCorrect: false }
      ]
    },
    {
      id: 'lp4_2',
      question: '2. What did Jake do immediately when Tom fell?',
      audio_script: "Man: Did Jake run to call his teacher?\nWoman: No, Jake stopped right away and walked quickly to the school nurse room to call for help!\nMan: Ah, he called the school nurse immediately!",
      options: [
        { label: 'A', text: 'Walked quickly to call the school nurse', image_url: '/images/week33/webtoon_scene_4.png', isCorrect: true },
        { label: 'B', text: 'Ran to find his teacher in class', image_url: '/images/week33/webtoon_scene_2.png', isCorrect: false },
        { label: 'C', text: 'Kept walking down the hallway', image_url: '/images/week33/webtoon_scene_1.png', isCorrect: false }
      ]
    },
    {
      id: 'lp4_3',
      question: '3. What did the school nurse apply to Tom’s knee?',
      audio_script: "Woman: Did the nurse give Tom a glass of orange juice?\nMan: Tom was thirsty, but the nurse first applied a clean bandage and a cold pack to his knee.\nWoman: So she applied a clean bandage!",
      options: [
        { label: 'A', text: 'Applied a clean bandage and cold pack', image_url: '/images/week33/webtoon_scene_5.png', isCorrect: true },
        { label: 'B', text: 'Gave him a glass of orange juice', image_url: '/images/week33/card_orange_juice.jpg', isCorrect: false },
        { label: 'C', text: 'Gave him a new science notebook', image_url: '/images/week33/card_science_notebook.jpg', isCorrect: false }
      ]
    }
  ],

  // Cambridge Listening Part 5 (SVG Color & Write Dialogue)
  listening_p5: {
    audio_script: "Examiner: Look at the picture of the school corridor. Can you see the boy sitting on the floor with a hurt knee?\nStudent: Yes! I can see him.\nExaminer: Look at the clean bandage on his knee. Can you color it blue?\nStudent: Sure! I'm coloring the clean bandage blue now.\nExaminer: Excellent. Now look at the first aid table. Can you find the cold pack?\nStudent: Yes, it's sitting on the table.\nExaminer: Color the cold pack green.\nStudent: Green cold pack, done!\nExaminer: Now look at the warning sign on the floor near the wet tiles. Color the warning sign yellow.\nStudent: Okay, the wet floor warning sign is yellow.\nExaminer: Finally, can you write something on the label at the bottom of the sign?\nStudent: What should I write?\nExaminer: Write the word SAFE in capital letters.\nStudent: S-A-F-E, done!",
    instructions: [
      { id: 't1', type: 'color', target_id: 'bandage', target_color: '#3b82f6', color_name: 'Blue', prompt: '1. Color the clean bandage on the boy’s knee BLUE.' },
      { id: 't2', type: 'color', target_id: 'coldpack', target_color: '#22c55e', color_name: 'Green', prompt: '2. Color the cold pack GREEN.' },
      { id: 't3', type: 'color', target_id: 'warning_sign', target_color: '#eab308', color_name: 'Yellow', prompt: '3. Color the wet floor warning sign YELLOW.' },
      { id: 't4', type: 'write', label_id: 'sign_label', target_text: 'SAFE', prompt: '4. Write the word SAFE on the warning sign label.' }
    ]
  }
};

export default listeningHubData;
