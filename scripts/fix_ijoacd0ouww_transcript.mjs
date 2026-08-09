import fs from 'fs';

console.log("🛠️ FIXING IJoAcD0oUww.json TRANSCRIPT SENTENCE BOUNDARIES...");

const cleanSegments = [
  { id: 1, text: "Have you ever heard of global warming?", start: 6.0, duration: 2.96 },
  { id: 2, text: "Did you know that over the past decades, sea level has risen?", start: 8.96, duration: 4.8 },
  { id: 3, text: "All these news are related to climate change.", start: 13.76, duration: 5.84 },
  { id: 4, text: "To understand better what climate change is, we should define what climate is.", start: 17.36, duration: 7.44 },
  { id: 5, text: "The climate is the combination of atmospheric conditions that occur in a place for a prolonged period of time.", start: 24.8, duration: 11.12 },
  { id: 6, text: "Over the past centuries, the climate everywhere around the Earth has changed.", start: 33.44, duration: 8.0 },
  { id: 7, text: "Altering the usual conditions of a place regarding precipitation and temperature.", start: 38.48, duration: 9.28 },
  { id: 8, text: "This way, water shortage, desertification, and the disappearance of lakes are becoming more common.", start: 44.56, duration: 11.28 },
  { id: 9, text: "In addition, the number of natural disasters like droughts, floods, or huge storms has increased.", start: 53.6, duration: 10.32 },
  { id: 10, text: "All these situations are a consequence of global warming.", start: 61.44, duration: 5.2 },
  { id: 11, text: "Meaning the increase in temperature happening on the planet, owing mainly to human activity.", start: 63.92, duration: 9.72 },
  { id: 12, text: "But why has the planet's temperature risen?", start: 73.76, duration: 6.0 },
  { id: 13, text: "The Earth is surrounded by the atmosphere, a thin layer of gas which allows solar radiation to penetrate.", start: 78.32, duration: 8.4 },
  { id: 14, text: "This layer consists of greenhouse effect gases whose mission is to maintain the planet's temperature.", start: 86.72, duration: 10.24 },
  { id: 15, text: "One of the main greenhouse effect gases is CO2.", start: 99.6, duration: 7.92 },
  { id: 16, text: "With the Industrial Revolution, CO2 emissions started to increase owing to fossil fuels like coal or petrol.", start: 104.88, duration: 12.24 },
  { id: 17, text: "Over the past years, the presence of gases like CO2 in the atmosphere increased.", start: 115.36, duration: 8.48 },
  { id: 18, text: "For this reason, its capacity to retain solar radiation has been enhanced, increasing global temperature.", start: 119.44, duration: 12.32 },
  { id: 19, text: "Climate change affects every country in the world, causing a negative impact on people's lives.", start: 132.32, duration: 12.24 },
  { id: 20, text: "Over the past 150 years, the average global temperature increased almost 2 degrees Fahrenheit.", start: 145.28, duration: 10.8 },
  { id: 21, text: "If the Earth's temperature keeps rising, thousands of animal and plant species may disappear forever.", start: 156.08, duration: 10.16 },
  { id: 22, text: "Oceans got warmer, causing ice amounts to decrease and sea levels to rise.", start: 163.68, duration: 11.84 },
  { id: 23, text: "Did you know that between 1901 and 2010, the sea level has risen 7.5 inches?", start: 171.52, duration: 11.2 },
  { id: 24, text: "Worse consequences are predicted in the future if we don't take measures urgently.", start: 187.44, duration: 8.0 },
  { id: 25, text: "Currently, there are some viable solutions at hand.", start: 194.4, duration: 6.96 },
  { id: 26, text: "It is necessary to turn to renewable energies to reduce CO2 emissions.", start: 201.36, duration: 6.88 },
  { id: 27, text: "Cars are responsible for 10 percent of CO2 emissions; use public transport, bicycle, or walk.", start: 208.24, duration: 13.2 },
  { id: 28, text: "Reduce your plastic use, plant a tree, and always recycle to protect our planet!", start: 218.96, duration: 25.0 }
];

const fullText = cleanSegments.map(s => s.text).join(' ');

const data = {
  text: fullText,
  segments: cleanSegments,
  fetchedAt: "2026-08-09T03:36:00Z",
  videoId: "IJoAcD0oUww"
};

fs.writeFileSync('./src/data/video_transcripts_by_id/sentences/IJoAcD0oUww.json', JSON.stringify(data, null, 2));
console.log("✅ Restructured IJoAcD0oUww.json into 28 clean, grammatical, ESL-compliant sentences!");
