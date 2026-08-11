import week36 from '../src/data/weeks/week_36/index.js';

console.log('Week 36 Object Keys:', Object.keys(week36));
console.log('Week 36 Stations Keys:', Object.keys(week36.stations || {}));
console.log('Grammar exercises length:', week36.stations?.grammar?.exercises?.length);
console.log('Mindmap centerStems:', week36.stations?.mindmap_speaking?.centerStems?.length);
console.log('Ask AI prompts:', week36.stations?.ask_ai?.prompts?.length);
