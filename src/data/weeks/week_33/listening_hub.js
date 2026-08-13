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
  audio_exercises: [
    { id: 1, prompt: "Listen and identify: While Jake was walking, what happened?", options: ["A boy slipped", "A dog ran", "A bell rang"], answer: "A boy slipped" }
  ]
};

export default listeningHubData;
