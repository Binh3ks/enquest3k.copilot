/**
 * oddOneOutData.js
 * Lexical Categorization dataset for Cambridge Starters & Movers (W01–W32).
 * Trains semantic network clustering and intruder elimination.
 */

export const ODD_ONE_OUT_ROUNDS = [
  {
    id: 'odd_1',
    category: 'Animals',
    clue: 'Find the intruder! 3 are Animals, 1 is NOT.',
    items: [
      { text: 'Tiger', isIntruder: false, icon: '🐯' },
      { text: 'Elephant', isIntruder: false, icon: '🐘' },
      { text: 'Rabbit', isIntruder: false, icon: '🐰' },
      { text: 'Table', isIntruder: true, icon: '🪑', reason: 'Table is furniture, not an animal!' },
    ],
  },
  {
    id: 'odd_2',
    category: 'Fruits & Food',
    clue: 'Find the intruder! 3 are Fruits, 1 is NOT.',
    items: [
      { text: 'Apple', isIntruder: false, icon: '🍎' },
      { text: 'Banana', isIntruder: false, icon: '🍌' },
      { text: 'Orange', isIntruder: false, icon: '🍊' },
      { text: 'Pencil', isIntruder: true, icon: '✏️', reason: 'Pencil is school stationery, not fruit!' },
    ],
  },
  {
    id: 'odd_3',
    category: 'Classroom & Stationery',
    clue: 'Find the intruder! 3 are School Items, 1 is NOT.',
    items: [
      { text: 'Eraser', isIntruder: false, icon: '🧹' },
      { text: 'Notebook', isIntruder: false, icon: '📓' },
      { text: 'Ruler', isIntruder: false, icon: '📏' },
      { text: 'Monkey', isIntruder: true, icon: '🐒', reason: 'Monkey is a jungle animal!' },
    ],
  },
  {
    id: 'odd_4',
    category: 'Colors',
    clue: 'Find the intruder! 3 are Colors, 1 is NOT.',
    items: [
      { text: 'Purple', isIntruder: false, icon: '🟣' },
      { text: 'Yellow', isIntruder: false, icon: '🟡' },
      { text: 'Green', isIntruder: false, icon: '🟢' },
      { text: 'Guitar', isIntruder: true, icon: '🎸', reason: 'Guitar is a musical instrument!' },
    ],
  },
  {
    id: 'odd_5',
    category: 'Vehicles / Transportation',
    clue: 'Find the intruder! 3 are Vehicles, 1 is NOT.',
    items: [
      { text: 'Airplane', isIntruder: false, icon: '✈️' },
      { text: 'Train', isIntruder: false, icon: '🚆' },
      { text: 'Bicycle', isIntruder: false, icon: '🚲' },
      { text: 'Sandwich', isIntruder: true, icon: '🥪', reason: 'Sandwich is food you eat!' },
    ],
  },
  {
    id: 'odd_6',
    category: 'Clothes',
    clue: 'Find the intruder! 3 are Clothes, 1 is NOT.',
    items: [
      { text: 'Jacket', isIntruder: false, icon: '🧥' },
      { text: 'T-shirt', isIntruder: false, icon: '👕' },
      { text: 'Shoes', isIntruder: false, icon: '👟' },
      { text: 'Watermelon', isIntruder: true, icon: '🍉', reason: 'Watermelon is a fruit!' },
    ],
  },
  {
    id: 'odd_7',
    category: 'Body Parts',
    clue: 'Find the intruder! 3 are Body Parts, 1 is NOT.',
    items: [
      { text: 'Shoulder', isIntruder: false, icon: '💪' },
      { text: 'Elbow', isIntruder: false, icon: '🦾' },
      { text: 'Knee', isIntruder: false, icon: '🦵' },
      { text: 'Clock', isIntruder: true, icon: '⏰', reason: 'Clock tells the time!' },
    ],
  },
  {
    id: 'odd_8',
    category: 'Action Verbs',
    clue: 'Find the intruder! 3 are Actions, 1 is NOT.',
    items: [
      { text: 'Jump', isIntruder: false, icon: '🦘' },
      { text: 'Swim', isIntruder: false, icon: '🏊' },
      { text: 'Dance', isIntruder: false, icon: '💃' },
      { text: 'Blue', isIntruder: true, icon: '🔵', reason: 'Blue is a color, not an action!' },
    ],
  },
];
