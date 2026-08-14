/**
 * Week 33 Gold Standard Data — Speaking Hub
 * Theme: "Corridor Safety & School Care"
 */

import mindmap from './mindmap.js';
import ask_ai from './ask_ai.js';

export const speakingHubData = {
  week: 33,
  theme: "Corridor Safety & School Care",
  mindmap,
  ask_ai,

  // Cambridge Speaking Part 1 (Find Differences)
  find_differences: {
    picA: { title: 'Picture A (Original Scene)', image_url: '/images/week33/w33_diff_scene_a.jpg' },
    picB: { title: 'Picture B (Difference Scene)', image_url: '/images/week33/w33_diff_scene_b.jpg' },
    hotspots: [
      { id: 'diff1', name: 'Left Bench Backpack Color', x: 10, y: 60, prompt_en: 'In Picture A, the backpack on the left bench is blue, but in Picture B, it is red.' },
      { id: 'diff2', name: 'Boy Shirt Color', x: 45, y: 50, prompt_en: 'In Picture A, the boy is wearing a red shirt, but in Picture B, he is wearing a blue shirt.' },
      { id: 'diff3', name: 'Wall Clock Time', x: 73, y: 14, prompt_en: 'In Picture A, the wall clock shows 9:00, but in Picture B, it shows 10:00.' },
      { id: 'diff4', name: 'Wet Floor Warning Sign Color', x: 78, y: 72, prompt_en: 'In Picture A, the wet floor warning sign is yellow, but in Picture B, it is orange.' }
    ]
  }
};

export default speakingHubData;
