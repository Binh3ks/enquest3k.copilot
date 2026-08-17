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
    audio_url: '/audio/week33/listening_p1_full.mp3',
    passage_audio_script: "Nova: Look at the picture of the school corridor. Some children and adults are there. Can you see them all? Let's listen and draw lines from the names to the right people.\nNova: The boy who is wearing a blue shirt and carrying a backpack — he is walking carefully. That boy is Jake.\nNova: Now look at the lady who is wearing a white uniform and rushing towards the boy on the floor. She is carrying a bandage. That is the school nurse.\nNova: Can you find the boy who is wearing a red shirt and slipping on the wet floor? His name is Tom. He fell because he was running.\nNova: Look at the tall man who is wearing a dark blue suit and standing near the lockers. He is watching to make sure everyone is safe. That is the headmaster.\nNova: Finally, find the girl who is wearing a yellow top and holding a mop near the wet floor sign. Her name is Mia. She is trying to clean the floor.\nNova: Now, there is one more name — Alex. Can you find Alex? Look carefully at all the children. Is Alex there? No! Alex is not in the picture. Alex is not there today.",
    names: [
      { id: 'n1', text: 'Jake', target_id: 't1' },
      { id: 'n2', text: 'School Nurse', target_id: 't2' },
      { id: 'n3', text: 'Tom', target_id: 't3' },
      { id: 'n4', text: 'Headmaster', target_id: 't4' },
      { id: 'n5', text: 'Mia', target_id: 't5' },
      { id: 'n6', text: 'Alex', target_id: null }
    ],
    targets: [
      { id: 't1', label: 'Jake (Boy in blue shirt, walking carefully)', x: 16, y: 65 },
      { id: 't2', label: 'School Nurse (White uniform, rushing with bandage)', x: 58, y: 54 },
      { id: 't3', label: 'Tom (Red shirt, slipping on wet floor)', x: 49, y: 62 },
      { id: 't4', label: 'Headmaster (Dark blue suit, near lockers)', x: 30, y: 50 },
      { id: 't5', label: 'Mia (Yellow top, holding mop)', x: 78, y: 56 }
    ]
  },

  // Cambridge Listening Part 3 (Visual Matching A-H — School Locations)
  listening_p3: {
    passage_audio_script: "Teacher: Hello Jake! I need to write a report about yesterday. Can you help me find where everything was?\nJake: Of course! What do you need to know?\nTeacher: First, where was the clean bandage? Was it on the headmaster's desk?\nJake: Oh no, not there! The nurse keeps the clean bandage in the medical cabinet. In the nurse room.\nTeacher: I see. And what about the cold pack for Tom's knee? Was it in the science room somewhere?\nJake: No, the cold pack was on the first aid table — you know, the one near the corridor entrance.\nTeacher: Right. Now, Tom's science notebook — did he leave it in the corridor?\nJake: He thought so at first, but actually Tom left his science notebook on the lab desk. In the science room.\nTeacher: Hmm. I also heard about a glass of orange juice. Was it on the playground bench?\nJake: No, nobody took it outside! The orange juice was on the cafeteria counter. In the canteen.\nTeacher: And the alarm clock? Was that in the headmaster's office?\nJake: Ha! No. The alarm clock was at Tom's home — on his bedroom table. He forgot it there that morning!",
    items: [
      { id: 1, name: 'Clean Bandage', target_letter: 'A', audio_url: '/audio/week33/listening_p3_item1.mp3', audio_text: 'The clean bandage was kept in the medical cabinet in the nurse room.' },
      { id: 2, name: 'Cold Pack', target_letter: 'B', audio_url: '/audio/week33/listening_p3_item2.mp3', audio_text: 'The cold pack was placed on the first aid table near the corridor.' },
      { id: 3, name: 'Science Notebook', target_letter: 'C', audio_url: '/audio/week33/listening_p3_item3.mp3', audio_text: 'The science notebook was on the lab desk in the science room.' },
      { id: 4, name: 'Orange Juice', target_letter: 'D', audio_url: '/audio/week33/listening_p3_item4.mp3', audio_text: 'The orange juice glass was on the cafeteria counter in the canteen.' },
      { id: 5, name: 'Alarm Clock', target_letter: 'E', audio_url: '/audio/week33/listening_p3_item5.mp3', audio_text: 'The alarm clock was on the bedroom table at home.' }
    ],
    cards: [
      { letter: 'A', name: 'Medical Cabinet (Nurse Room)', location_name: 'Medical Cabinet', image_url: '/images/week33/nurse_cabinet.jpg' },
      { letter: 'B', name: 'First Aid Table', location_name: 'First Aid Table', image_url: '/images/week33/card_b_first_aid_table.jpg' },
      { letter: 'C', name: 'Science Lab Desk', location_name: 'Science Lab Desk', image_url: '/images/week33/lab_desk.jpg' },
      { letter: 'D', name: 'Cafeteria Counter', location_name: 'Cafeteria Counter', image_url: '/images/week33/cafeteria.jpg' },
      { letter: 'E', name: 'Bedroom Table (Home)', location_name: 'Bedroom Table', image_url: '/images/week33/bedroom_table.jpg' },
      { letter: 'F', name: 'Corridor Safety Locker', location_name: 'Corridor Locker', image_url: '/images/week33/corridor.jpg' },
      { letter: 'G', name: 'Headmaster Office Desk', location_name: 'Headmaster Office', image_url: '/images/week33/card_g_headmaster_office.jpg' },
      { letter: 'H', name: 'Playground Bench', location_name: 'Playground Bench', image_url: '/images/week33/card_h_playground_bench.jpg' }
    ]
  },

  // Cambridge Listening Part 4 (3-Picture Option Cards with Distractors)

  listening_p4_questions: [
    {
      id: 'lp4_1',
      content_id: 'lp4_1',
      type: 'listening_p4_picture',
      question: '1. Where did Tom slip and hurt his knee?',
      prompt: 'Where did Tom slip and hurt his knee?',
      audio_url: '/audio/week33/listening_p4_q1.mp3',
      audio_script: "Girl: Did Tom slip inside the science lab?\nBoy: No, he was walking past the science lab, but he actually slipped on wet tiles in the school corridor!\nGirl: Oh, so it was in the corridor, not in the lab or playground!",
      options: [
        { label: 'A', text: 'In the school corridor', image_url: '/images/week33/webtoon_scene_3.png', isCorrect: true },
        { label: 'B', text: 'Inside the science lab', image_url: '/images/week33/lab_desk.jpg', isCorrect: false },
        { label: 'C', text: 'On the outdoor playground', image_url: '/images/week33/card_h_playground_bench.jpg', isCorrect: false }
      ]
    },
    {
      id: 'lp4_2',
      content_id: 'lp4_2',
      type: 'listening_p4_picture',
      question: '2. What did Jake do immediately when Tom fell?',
      prompt: 'What did Jake do immediately when Tom fell?',
      audio_url: '/audio/week33/listening_p4_q2.mp3',
      audio_script: "Man: Did Jake run to find his teacher in class?\nWoman: No, Jake stopped right away and walked quickly to call the school nurse for help!\nMan: Ah, he called the school nurse immediately!",
      options: [
        { label: 'A', text: 'Walked quickly to call the school nurse', image_url: '/images/week33/webtoon_scene_4.png', isCorrect: true },
        { label: 'B', text: 'Ran to find his teacher in class', image_url: '/images/week33/webtoon_scene_2.png', isCorrect: false },
        { label: 'C', text: 'Kept walking down the hallway', image_url: '/images/week33/webtoon_scene_1.png', isCorrect: false }
      ]
    },
    {
      id: 'lp4_3',
      content_id: 'lp4_3',
      type: 'listening_p4_picture',
      question: '3. What did the school nurse apply to Tom’s knee?',
      prompt: 'What did the school nurse apply to Tom’s knee?',
      audio_url: '/audio/week33/listening_p4_q3.mp3',
      audio_script: "Woman: Did the nurse give Tom a glass of orange juice?\nMan: Tom was thirsty, but the nurse first applied a clean bandage and a cold pack to his knee.\nWoman: So she applied a clean bandage and a cold pack!",
      options: [
        { label: 'A', text: 'Applied a clean bandage and cold pack', image_url: '/images/week33/card_clean_bandage.jpg', isCorrect: true },
        { label: 'B', text: 'Gave him a glass of orange juice', image_url: '/images/week33/card_orange_juice.jpg', isCorrect: false },
        { label: 'C', text: 'Gave him a new science notebook', image_url: '/images/week33/card_science_notebook.jpg', isCorrect: false }
      ]
    },
    {
      id: 'lp4_4',
      content_id: 'lp4_4',
      type: 'listening_p4_picture',
      question: '4. How did everyone feel after Tom was safely helped?',
      prompt: 'How did everyone feel after Tom was safely helped?',
      audio_url: '/audio/week33/listening_p4_q4.mp3',
      audio_script: "Girl: Was Tom's knee severely injured?\nBoy: No, the nurse treated his knee gently, and everyone felt relieved and safe!\nGirl: That was a big relief for everyone!",
      options: [
        { label: 'A', text: 'Felt relieved and safe', image_url: '/images/week33/webtoon_scene_5.png', isCorrect: true },
        { label: 'B', text: 'Felt angry and upset', image_url: '/images/week33/webtoon_scene_2.png', isCorrect: false },
        { label: 'C', text: 'Felt scared and fell down', image_url: '/images/week33/webtoon_scene_3.png', isCorrect: false }
      ]
    },
    {
      id: 'lp4_5',
      content_id: 'lp4_5',
      type: 'listening_p4_picture',
      question: '5. What did the headmaster do during Monday assembly?',
      prompt: 'What did the headmaster do during Monday assembly?',
      audio_url: '/audio/week33/listening_p4_q5.mp3',
      audio_script: "Man: Did the headmaster give Jake a difficult test?\nWoman: Yes, the headmaster praised Jake publicly during Monday assembly for taking responsible action!",
      options: [
        { label: 'A', text: 'Praised Jake publicly during assembly', image_url: '/images/week33/w33_listening_p1_scene.jpg', isCorrect: true },
        { label: 'B', text: 'Gave Jake a difficult homework test', image_url: '/images/week33/card_g_headmaster_office.jpg', isCorrect: false },
        { label: 'C', text: 'Closed the school corridor forever', image_url: '/images/week33/webtoon_scene_1.png', isCorrect: false }
      ]
    }
  ],

  // Nova's Color & Write Mission
  listening_p5: {
    audio_script: "Nova: Look at the picture of the school corridor. Can you see the boy sitting on the floor with a hurt knee?\nJake: Yes! I can see him.\nNova: Look at the clean bandage on his knee. Can you color it blue?\nJake: Sure! I'm coloring the clean bandage blue now.\nNova: Excellent. Now look at the first aid table. Can you find the cold pack?\nJake: Yes, it's sitting on the table.\nNova: Color the cold pack green.\nJake: Green cold pack, done!\nNova: Now look at the warning sign on the floor near the wet tiles. Color the warning sign yellow.\nJake: Okay, the wet floor warning sign is yellow.\nNova: Finally, can you write something on the label at the bottom of the sign?\nJake: What should I write?\nNova: Write the word SAFE in capital letters.\nJake: S-A-F-E, done!",
    instructions: [
      { id: 't1', type: 'color', target_id: 'bandage', target_color: '#3b82f6', color_name: 'Blue', audio_url: '/audio/week33/listening_p5_inst1.mp3', prompt: '1. Color the clean bandage on the boy’s knee BLUE.' },
      { id: 't2', type: 'color', target_id: 'coldpack', target_color: '#22c55e', color_name: 'Green', audio_url: '/audio/week33/listening_p5_inst2.mp3', prompt: '2. Color the cold pack GREEN.' },
      { id: 't3', type: 'color', target_id: 'warning_sign', target_color: '#eab308', color_name: 'Yellow', audio_url: '/audio/week33/listening_p5_inst3.mp3', prompt: '3. Color the wet floor warning sign YELLOW.' },
      { id: 't4', type: 'write', label_id: 'sign_label', target_text: 'SAFE', audio_url: '/audio/week33/listening_p5_inst5.mp3', prompt: '4. Write the word SAFE on the warning sign label.' }
    ]
  }
};

export default listeningHubData;
