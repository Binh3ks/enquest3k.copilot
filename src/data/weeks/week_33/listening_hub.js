/**
 * Week 33 Gold Standard Data — Listening Hub
 * Theme: "Corridor Safety & School Care"
 * Cambridge A2 Flyers Full Exam Standard Audio & Scripts (W33 - W72)
 */

import dictation from './dictation.js';
import shadowing from './shadowing.js';

export const listeningHubData = {
  week: 33,
  theme: "Corridor Safety & School Care",
  dictation,
  shadowing,

  // Cambridge Listening Part 1 (SVG Line Matcher — Scene Investigation)
  listening_p1: {
    image_url: '/images/week33/w33_listening_p1_scene.jpg',
    audio_url: '/audio/week33/listening_p1_full.mp3',
    passage_audio_script: "Nova: Look at Part 1. Now look at the picture. Listen and look. There is one example.\nGirl: Look at this photo of our school corridor after lunch! It was quite busy.\nMan: Oh yes, I can see many people. Who is that boy walking carefully down the hallway in the blue shirt?\nGirl: That's Jake. He always walks slowly and watches where he is going.\nMan: That is very sensible of him.\nNova: Can you see the line? This is an example. Now you listen and draw lines.\nGirl: Oh dear, look at the boy who is slipping on the wet floor!\nMan: Yes, his papers are flying everywhere! Is he wearing a red sweater?\nGirl: That's right, he is wearing a red shirt. His name is Tom. He fell down because he was running in a hurry.\nMan: Poor Tom! I hope he is okay.\nGirl: Look, someone is rushing quickly to help him. Can you see the lady carrying a clean bandage in the white uniform?\nMan: Ah, that's our school nurse! She always takes good care of everyone when accidents happen.\nGirl: Yes, she is very kind.\nMan: Who is that tall man standing near the blue lockers in the dark suit?\nGirl: Do you mean the man watching all the students to make sure the hallway is safe?\nMan: Yes, exactly.\nGirl: That's our headmaster! He always reminds us about corridor safety rules.\nMan: Now look near the yellow warning sign. Is that a girl holding a cleaning mop?\nGirl: Yes, that is Mia. She is wiping the water off the floor so nobody else slips.\nMan: What a helpful girl!\nGirl: Is Alex in this picture today?\nMan: No, Alex had a doctor appointment this morning, so he is not at school today.",
    names: [
      { id: 'n1', text: 'Jake', target_id: 't1', isExample: true },
      { id: 'n2', text: 'School Nurse', target_id: 't2' },
      { id: 'n3', text: 'Tom', target_id: 't3' },
      { id: 'n4', text: 'Headmaster', target_id: 't4' },
      { id: 'n5', text: 'Mia', target_id: 't5' },
      { id: 'n6', text: 'Alex', target_id: null }
    ],
    targets: [
      { id: 't1', label: 'Jake (Boy walking with backpack on left)', x: 37, y: 50, isExample: true },
      { id: 't2', label: 'School Nurse (White uniform with bandage)', x: 66, y: 50 },
      { id: 't3', label: 'Tom (Red shirt, slipping on wet floor)', x: 60, y: 54 },
      { id: 't4', label: 'Headmaster (Dark blue suit near lockers)', x: 49, y: 44 },
      { id: 't5', label: 'Mia (Girl holding cleaning mop)', x: 77, y: 48 }
    ]
  },

  // Cambridge Listening Part 3 (Visual Matching A-H — School Locations)
  listening_p3: {
    passage_audio_script: "Teacher: Hello Jake! I am writing our school safety report about yesterday. Can you tell me where all the items were found?\nJake: Of course, Mrs. Wilson! I remember everything clearly.\nTeacher: First, where was the clean bandage kept? Was it inside the headmaster's office?\nJake: No, not there! The school nurse keeps the clean bandage inside the white medical cabinet in the nurse room.\nTeacher: Excellent. And what about the cold pack for Tom's knee? Did someone leave it on the science lab desk?\nJake: No, the nurse placed the cold pack on the first aid table near the corridor entrance so it was ready to use.\nTeacher: Right. And where was Tom's science notebook? I know he was looking for it everywhere.\nJake: He thought he lost it on the playground bench, but actually his notebook was sitting right on the lab desk in the science room.\nTeacher: Ah, that is a relief! Now, what about the glass of orange juice that someone brought for Tom?\nJake: Nobody took it outside! The fresh orange juice was placed on the cafeteria counter in the school canteen.\nTeacher: And what about Tom's alarm clock? Was that left in the corridor locker?\nJake: Haha, no! Tom told me his alarm clock was on his bedroom table at home. He woke up late that morning!",
    items: [
      { 
        id: 1, 
        name: 'Clean Bandage', 
        target_letter: 'A', 
        audio_url: '/audio/week33/listening_p3_item1.mp3', 
        audio_text: "Teacher: Where was the clean bandage kept? Was it inside the headmaster's office?\nJake: No, not there! The school nurse keeps the clean bandage inside the white medical cabinet in the nurse room." 
      },
      { 
        id: 2, 
        name: 'Cold Pack', 
        target_letter: 'B', 
        audio_url: '/audio/week33/listening_p3_item2.mp3', 
        audio_text: "Teacher: What about the cold pack for Tom's knee? Did someone leave it on the science lab desk?\nJake: No, the nurse placed the cold pack on the first aid table near the corridor entrance so it was ready to use." 
      },
      { 
        id: 3, 
        name: 'Science Notebook', 
        target_letter: 'C', 
        audio_url: '/audio/week33/listening_p3_item3.mp3', 
        audio_text: "Teacher: And where was Tom's science notebook? I know he was looking for it everywhere.\nJake: He thought he lost it on the playground bench, but actually his notebook was sitting right on the lab desk in the science room." 
      },
      { 
        id: 4, 
        name: 'Orange Juice', 
        target_letter: 'D', 
        audio_url: '/audio/week33/listening_p3_item4.mp3', 
        audio_text: "Teacher: What about the glass of orange juice that someone brought for Tom?\nJake: Nobody took it outside! The fresh orange juice was placed on the cafeteria counter in the school canteen." 
      },
      { 
        id: 5, 
        name: 'Alarm Clock', 
        target_letter: 'E', 
        audio_url: '/audio/week33/listening_p3_item5.mp3', 
        audio_text: "Teacher: And what about Tom's alarm clock? Was that left in the corridor locker?\nJake: Haha, no! Tom told me his alarm clock was on his bedroom table at home. He woke up late that morning!" 
      }
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
      audio_script: "Girl: Where did Tom slip and hurt his knee yesterday?\nBoy: Well, he walked past the science lab after class and was heading towards the outdoor playground.\nGirl: Did he fall on the playground?\nBoy: No, he was running in a hurry and slipped on the wet floor in the school corridor before reaching the exit!",
      options: [
        { label: 'A', text: 'Inside the science lab', image_url: '/images/week33/lab_desk.jpg', isCorrect: false },
        { label: 'B', text: 'In the school corridor', image_url: '/images/week33/webtoon_scene_3.png', isCorrect: true },
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
      audio_script: "Man: What did Jake do immediately when Tom slipped and fell down?\nWoman: Did he run back to find his teacher in class?\nMan: No, and he didn't just keep walking down the hallway either! Jake stopped right away and walked quickly to call the school nurse for help.\nWoman: That was very quick and responsible of him!",
      options: [
        { label: 'A', text: 'Ran to find his teacher in class', image_url: '/images/week33/webtoon_scene_2.png', isCorrect: false },
        { label: 'B', text: 'Kept walking down the hallway', image_url: '/images/week33/webtoon_scene_1.png', isCorrect: false },
        { label: 'C', text: 'Walked quickly to call the school nurse', image_url: '/images/week33/webtoon_scene_4.png', isCorrect: true }
      ]
    },
    {
      id: 'lp4_3',
      content_id: 'lp4_3',
      type: 'listening_p4_picture',
      question: '3. What did the school nurse apply to Tom’s knee?',
      prompt: 'What did the school nurse apply to Tom’s knee?',
      audio_url: '/audio/week33/listening_p4_q3.mp3',
      audio_script: "Woman: What did the school nurse apply to Tom's knee first?\nMan: Tom asked for a new science notebook, and someone offered him a glass of orange juice to drink.\nWoman: But what did the nurse do for his injury?\nMan: The nurse first applied a clean bandage and a cold pack directly to his hurt knee to stop the swelling.",
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
      audio_script: "Girl: How did everyone feel after the nurse safely treated Tom?\nBoy: Tom was scared when he fell, and some students were quite upset.\nGirl: Were they still worried or angry?\nBoy: No, everyone felt greatly relieved and safe once they saw Tom was standing and smiling again.",
      options: [
        { label: 'A', text: 'Felt angry and upset', image_url: '/images/week33/webtoon_scene_2.png', isCorrect: false },
        { label: 'B', text: 'Felt relieved and safe', image_url: '/images/week33/webtoon_scene_5.png', isCorrect: true },
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
      audio_script: "Man: What did the headmaster do during Monday morning assembly?\nWoman: Did he give all the students a difficult test or close down the corridor?\nMan: No, he gave a wonderful speech and praised Jake publicly on stage for his responsible corridor safety action!\nWoman: How fantastic for Jake!",
      options: [
        { label: 'A', text: 'Gave Jake a difficult homework test', image_url: '/images/week33/card_g_headmaster_office.jpg', isCorrect: false },
        { label: 'B', text: 'Closed the school corridor forever', image_url: '/images/week33/webtoon_scene_1.png', isCorrect: false },
        { label: 'C', text: 'Praised Jake publicly during assembly', image_url: '/images/week33/w33_listening_p1_scene.jpg', isCorrect: true }
      ]
    }
  ],

  // Nova's Color & Write Mission
  listening_p5: {
    audio_script: "Nova: Look at the picture of our school corridor again. Can you see the boy sitting on the floor after his accident?\nJake: Yes! That's Tom. I can see the white bandage on his hurt knee.\nNova: That's right. Now, can you color the bandage on his knee blue?\nJake: A blue bandage on his knee? Sure, I am coloring it blue right now.\nNova: Excellent. Now look at the first aid table near the corridor entrance. Can you see the cold pack sitting on top?\nJake: Yes, I found it.\nNova: Please color the cold pack green.\nJake: Okay, coloring the cold pack green... done!\nNova: Now look down at the floor near the wet tiles. Can you see the tall warning sign?\nJake: Yes, the triangular warning sign!\nNova: Color the warning sign bright yellow.\nJake: Bright yellow for the wet floor sign. It looks very clear now.\nNova: Finally, look at the white label at the bottom of the yellow warning sign. Can you write a word there?\nJake: What word should I write?\nNova: Please write the word SAFE in capital letters.\nJake: S-A-F-E... SAFE! All finished!",
    instructions: [
      { id: 't1', type: 'color', target_id: 'bandage', target_color: '#3b82f6', color_name: 'Blue', audio_url: '/audio/week33/listening_p5_inst1.mp3', prompt: '1. Color the clean bandage on the boy’s knee BLUE.' },
      { id: 't2', type: 'color', target_id: 'coldpack', target_color: '#22c55e', color_name: 'Green', audio_url: '/audio/week33/listening_p5_inst2.mp3', prompt: '2. Color the cold pack GREEN.' },
      { id: 't3', type: 'color', target_id: 'warning_sign', target_color: '#eab308', color_name: 'Yellow', audio_url: '/audio/week33/listening_p5_inst3.mp3', prompt: '3. Color the wet floor warning sign YELLOW.' },
      { id: 't4', type: 'write', label_id: 'sign_label', target_text: 'SAFE', audio_url: '/audio/week33/listening_p5_inst5.mp3', prompt: '4. Write the word SAFE on the warning sign label.' }
    ]
  }
};

export default listeningHubData;
