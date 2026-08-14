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
    passage_audio_script: "Welcome to Cambridge Listening Part 3. Listen to Jake talking to his teacher about where different items were placed during the school incident. First, the clean bandage was in card A. Second, the cold pack was in card B. Third, the science notebook was in card C. Fourth, the orange juice glass was in card D. And fifth, the alarm clock was in card E.",
    items: [
      { id: 1, name: 'Clean Bandage', target_letter: 'A', audio_text: 'The clean bandage is shown in picture card A.' },
      { id: 2, name: 'Cold Pack', target_letter: 'B', audio_text: 'The cold pack is shown in picture card B.' },
      { id: 3, name: 'Science Notebook', target_letter: 'C', audio_text: 'The science notebook is shown in picture card C.' },
      { id: 4, name: 'Orange Juice', target_letter: 'D', audio_text: 'The orange juice glass is shown in picture card D.' },
      { id: 5, name: 'Alarm Clock', target_letter: 'E', audio_text: 'The alarm clock is shown in picture card E.' }
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
