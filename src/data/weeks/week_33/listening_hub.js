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
    passage_audio_script: "Look at Part 1. Listen and draw lines. Girl: Look at that boy in the corridor! Is he running? Man: No, the boy slipping on the wet floor in the red shirt is Tom! Look at the boy walking carefully in the blue shirt. Girl: Oh, I see him now. Is that Jake? Man: Yes, that's right. Jake is walking carefully. Girl: Who is the lady in the white uniform carrying a bandage? Man: That's the school nurse! She is rushing to help Tom. Girl: And who is the tall man in the blue suit talking to students? Man: That's the headmaster. He is making sure everyone stays safe. Girl: Look at the girl near the yellow wet floor sign holding a mop. Man: Ah, that's Mia. She is cleaning the wet floor so nobody else falls.",
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
    passage_audio_script: "Welcome to Cambridge Listening Part 3. Listen to Jake talking to his teacher about where different items were placed during the school incident. First, the clean bandage was inside the school nurse cabinet. Second, the cold pack was taken from the first aid ice box. Third, the science notebook fell on the corridor floor when the boy slipped. Fourth, the orange juice glass was sitting on the science lab desk. And fifth, the alarm clock was ringing on the bedroom table at home.",
    items: [
      { id: 1, name: 'Clean Bandage', target_letter: 'A', audio_text: 'The clean bandage was inside the school nurse cabinet.' },
      { id: 2, name: 'Cold Pack', target_letter: 'B', audio_text: 'The cold pack was taken from the first aid ice box.' },
      { id: 3, name: 'Science Notebook', target_letter: 'C', audio_text: 'The science notebook fell on the corridor floor when the boy slipped.' },
      { id: 4, name: 'Orange Juice', target_letter: 'E', audio_text: 'The orange juice glass was sitting on the science lab desk.' },
      { id: 5, name: 'Alarm Clock', target_letter: 'D', audio_text: 'The alarm clock was ringing on the bedroom table at home.' }
    ],
    cards: [
      { letter: 'A', name: 'School Nurse Cabinet', image_url: '/images/week33/nurse.jpg' },
      { letter: 'B', name: 'First Aid Ice Box', image_url: '/images/week33/cold_pack.jpg' },
      { letter: 'C', name: 'School Corridor Floor', image_url: '/images/week33/corridor.jpg' },
      { letter: 'D', name: 'Bedroom Table', image_url: '/images/week33/webtoon_scene_5.png' },
      { letter: 'E', name: 'Science Laboratory', image_url: '/images/week33/webtoon_scene_2.png' },
      { letter: 'F', name: 'School Cafeteria', image_url: '/images/week33/webtoon_scene_3.png' },
      { letter: 'G', name: 'Library Desk', image_url: '/images/week33/w33_diff_scene_a.jpg' },
      { letter: 'H', name: 'Playground Bench', image_url: '/images/week33/w33_diff_scene_b.jpg' }
    ]
  },

  // Cambridge Listening Part 5 (SVG Color & Write)
  listening_p5: {
    instructions: [
      { id: 't1', type: 'color', target_id: 'bandage', target_color: '#3b82f6', color_name: 'Blue', prompt: '1. Color the clean bandage on the boy’s knee BLUE.' },
      { id: 't2', type: 'color', target_id: 'coldpack', target_color: '#22c55e', color_name: 'Green', prompt: '2. Color the cold pack GREEN.' },
      { id: 't3', type: 'color', target_id: 'warning_sign', target_color: '#eab308', color_name: 'Yellow', prompt: '3. Color the wet floor warning sign YELLOW.' },
      { id: 't4', type: 'write', label_id: 'sign_label', target_text: 'SAFE', prompt: '4. Write the word SAFE on the warning sign label.' }
    ]
  }
};

export default listeningHubData;
