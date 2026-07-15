/**
 * Collection configuration — 26 collections covering W1-W156.
 * Each collection spans 6 weeks and yields 8 cards total:
 *   - 6 common cards (1 per week, on weekly completion)
 *   - 2 rare bonus cards (awarded when the entire 6-week set completes)
 *
 * Card artwork is generated from theme + icon + accent + a `cardVariants` array
 * which lists 8 distinct symbols for the cards in this collection.
 */

const COLLECTIONS_RAW = [
  // A1 Starter — Pre-A1 / YLE Starters
  { id: 'C01', theme: 'School Beginnings',     icon: '🎒', accent: 'sky',    cefr: 'Pre-A1', weekRange: [1, 6],   iconIds: ['notebook', 'pencil', 'ruler', 'book', 'bag', 'clock'] },
  { id: 'C02', theme: 'My World',             icon: '🏡', accent: 'rose',   cefr: 'Pre-A1', weekRange: [7, 12],  iconIds: ['home', 'bed', 'lamp', 'chair', 'door', 'window'] },
  { id: 'C03', theme: 'Little Explorers',     icon: '🧒', accent: 'amber',  cefr: 'Pre-A1', weekRange: [13, 18], iconIds: ['child1', 'child2', 'ball', 'kite', 'swing', 'slide'] },
  { id: 'C04', theme: 'Animal Friends',       icon: '🐱', accent: 'emerald',cefr: 'A1',     weekRange: [19, 24], iconIds: ['cat', 'dog', 'bird', 'rabbit', 'fish', 'turtle'] },
  { id: 'C05', theme: 'Wild Kingdom',         icon: '🦁', accent: 'orange', cefr: 'A1',     weekRange: [25, 30], iconIds: ['lion', 'elephant', 'monkey', 'giraffe', 'zebra', 'bear'] },
  { id: 'C06', theme: 'Nature & Garden',      icon: '🌻', accent: 'green',  cefr: 'A1',     weekRange: [31, 36], iconIds: ['flower', 'tree', 'leaf', 'grass', 'seed', 'sun'] },
  { id: 'C07', theme: 'Food & Meals',         icon: '🍎', accent: 'red',    cefr: 'A1',     weekRange: [37, 42], iconIds: ['apple', 'bread', 'rice', 'milk', 'cake', 'banana'] },
  { id: 'C08', theme: 'Body & Health',        icon: '🩺', accent: 'pink',   cefr: 'A1',     weekRange: [43, 48], iconIds: ['heart', 'tooth', 'eye', 'ear', 'hand', 'foot'] },
  { id: 'C09', theme: 'City Life',            icon: '🏙️', accent: 'slate',  cefr: 'A1+',    weekRange: [49, 54], iconIds: ['car', 'bus', 'shop', 'park', 'road', 'sign'] },
  { id: 'C10', theme: 'Weather & Seasons',    icon: '🌦️', accent: 'cyan',   cefr: 'A1+',    weekRange: [55, 60], iconIds: ['sun', 'cloud', 'rain', 'snow', 'wind', 'storm'] },
  { id: 'C11', theme: 'Holidays & Celebrations', icon: '🎉', accent: 'fuchsia',cefr: 'A1+',  weekRange: [61, 66], iconIds: ['cake', 'gift', 'balloon', 'flag', 'party', 'candle'] },
  { id: 'C12', theme: 'Sports & Movement',    icon: '⚽', accent: 'lime',   cefr: 'A1+',    weekRange: [67, 72], iconIds: ['soccer', 'basket', 'tennis', 'swim', 'run', 'jump'] },
  { id: 'C13', theme: 'Music & Arts',         icon: '🎵', accent: 'violet', cefr: 'A1+',    weekRange: [73, 78], iconIds: ['piano', 'guitar', 'drum', 'paint', 'draw', 'sing'] },
  { id: 'C14', theme: 'Around the World',     icon: '🌍', accent: 'teal',   cefr: 'A2',     weekRange: [79, 84], iconIds: ['globe', 'plane', 'map', 'compass', 'flag', 'camera'] },
  { id: 'C15', theme: 'Jobs & Helpers',       icon: '👩‍⚕️', accent: 'sky',   cefr: 'A2',     weekRange: [85, 90], iconIds: ['doctor', 'teacher', 'police', 'cook', 'farmer', 'driver'] },
  { id: 'C16', theme: 'Tech & Gadgets',       icon: '💻', accent: 'blue',   cefr: 'A2',     weekRange: [91, 96], iconIds: ['phone', 'tablet', 'laptop', 'headset', 'robot', 'drone'] },
  { id: 'C17', theme: 'Storytime Adventures', icon: '📚', accent: 'indigo', cefr: 'A2',     weekRange: [97, 102], iconIds: ['castle', 'dragon', 'wizard', 'treasure', 'sword', 'magic'] },
  { id: 'C18', theme: 'Ocean & Sea Life',     icon: '🐬', accent: 'sky',    cefr: 'A2+',    weekRange: [103, 108], iconIds: ['dolphin', 'whale', 'shark', 'octopus', 'starfish', 'crab'] },
  { id: 'C19', theme: 'Earth & Environment',  icon: '🌳', accent: 'emerald',cefr: 'A2+',    weekRange: [109, 114], iconIds: ['recycle', 'earth', 'plant', 'windmill', 'solar', 'drop'] },
  { id: 'C20', theme: 'Space & Stars',        icon: '🚀', accent: 'indigo', cefr: 'A2+',    weekRange: [115, 120], iconIds: ['rocket', 'planet', 'star', 'moon', 'astronaut', 'alien'] },
  { id: 'C21', theme: 'Heroes & Legends',     icon: '🦸', accent: 'rose',   cefr: 'B1',     weekRange: [121, 126], iconIds: ['hero', 'shield', 'crown', 'cape', 'medal', 'flag'] },
  { id: 'C22', theme: 'Mysteries & Puzzles',  icon: '🔍', accent: 'amber',  cefr: 'B1',     weekRange: [127, 132], iconIds: ['magnifier', 'key', 'lock', 'map', 'puzzle', 'mystery'] },
  { id: 'C23', theme: 'Culture & Festivals',  icon: '🎭', accent: 'fuchsia',cefr: 'B1',     weekRange: [133, 138], iconIds: ['mask', 'music', 'dance', 'costume', 'lantern', 'firework'] },
  { id: 'C24', theme: 'Future & Dreams',      icon: '💫', accent: 'cyan',   cefr: 'B1',     weekRange: [139, 144], iconIds: ['crystal', 'lightbulb', 'rocket', 'star', 'cloud', 'idea'] },
  { id: 'C25', theme: 'Master Minds',         icon: '🧠', accent: 'violet', cefr: 'B1+',    weekRange: [145, 150], iconIds: ['brain', 'gear', 'puzzle', 'atom', 'graph', 'lab'] },
  { id: 'C26', theme: 'Champion Journey',     icon: '🏆', accent: 'amber',  cefr: 'B1+',    weekRange: [151, 156], iconIds: ['trophy', 'medal', 'crown', 'star', 'gem', 'ribbon'] },
];

export const COLLECTIONS = COLLECTIONS_RAW.map((c) => ({
  ...c,
  // Two rare bonus cards awarded when the full collection is complete.
  // They reuse icon 1 + icon 2 of the same theme but with rare rarity styling.
  rareIcons: [c.iconIds[0], c.iconIds[1]],
}));

/**
 * Sprint S4 — Story Writer collectible cards.
 * Unlocked per-week (one per user per week) via useUserStore.checkAndAwardItems:
 *   - story_notebook_w{N}: picture-prompt writing rubric >= 8/12
 *   - story_quill_w{N}:     picture-prompt writing rubric >= 10/12
 *   - storyteller_mic_w{N}: Viva Voce verification passed
 *
 * These are NOT part of the 6-week collections. They live as standalone badges
 * that the CollectionBoard renders via wildcard match.
 */
export const STORY_CARDS = {
  story_notebook: { theme: 'Story Writer',        icon: '📓', accent: 'amber', desc_vi: 'Hoàn thành bài viết có tranh', desc_en: 'Completed a picture-prompt story' },
  story_quill:    { theme: 'Master Storyteller',  icon: '🖋️', accent: 'gold',  desc_vi: 'Đạt điểm cao trong bài viết',   desc_en: 'Achieved an excellent writing score' },
  storyteller_mic:{ theme: 'Viva Voce',           icon: '🎤', accent: 'rose',  desc_vi: 'Đã kể lại câu chuyện bằng lời nói', desc_en: 'Spoke the story aloud + verified' },
};

export const getCollectionById = (id) =>
  COLLECTIONS.find((c) => c.id === id);

export const getCollectionByWeek = (weekId) =>
  COLLECTIONS.find((c) => weekId >= c.weekRange[0] && weekId <= c.weekRange[1]);

/**
 * Get the 8 cards for a collection.
 * Each card is { id, iconId, rarity: 'common' | 'rare', weekIndex }
 * - 6 common: one per week in weekRange
 * - 2 rare: bonus when full collection completes
 */
export const getCardsForCollection = (collection) => {
  const cards = [];
  collection.weekRange.forEach((week, idx) => {
    cards.push({
      id: `${collection.id}_w${week}_c`,
      iconId: collection.iconIds[idx],
      rarity: 'common',
      weekIndex: idx,
      weekNumber: week,
    });
  });
  cards.push({
    id: `${collection.id}_r1`,
    iconId: collection.rareIcons[0],
    rarity: 'rare',
    weekIndex: 6,
  });
  cards.push({
    id: `${collection.id}_r2`,
    iconId: collection.rareIcons[1],
    rarity: 'rare',
    weekIndex: 7,
  });
  return cards;
};

export const getCardById = (cardId) => {
  for (const col of COLLECTIONS) {
    const cards = getCardsForCollection(col);
    const found = cards.find((c) => c.id === cardId);
    if (found) return { ...found, collection: col };
  }
  return null;
};
