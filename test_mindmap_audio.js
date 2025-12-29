// Quick test: Check if the audio URL injection is working correctly
import { injectAudioUrls } from '../src/utils/dataHooks.js';

// Mock mindmap data (advanced mode - simplified)
const mockWeekData = {
  weekId: 20,
  stations: {
    mindmap_speaking: {
      centerStems: [
        "In the old castle, there was ___.",
        "There were many ___.",
        "Long ago, a king could ___ here."
      ],
      branchLabels: {
        "In the old castle, there was ___.": [
          "a very tall tower",
          "a deep, dark dungeon",
          "a huge dining hall",
          "a secret passage",
          "a beautiful garden",
          "a throne for the king"
        ],
        "There were many ___.": [
          "high stone walls",
          "small windows",
          "old paintings",
          "suits of armor",
          "big, heavy doors",
          "stories about the past"
        ],
        "Long ago, a king could ___ here.": [
          "live with his family",
          "rule the whole country",
          "have big parties",
          "watch for enemies from the tower",
          "walk in the garden",
          "keep his treasure safe"
        ]
      }
    }
  }
};

// Test injection
const result = injectAudioUrls(mockWeekData, 'advanced');

console.log("=== CENTER STEM AUDIO ===");
result.stations.mindmap_speaking.centerStemAudio.forEach((url, i) => {
  console.log(`Stem ${i}: ${url}`);
});

console.log("\n=== BRANCH AUDIO MAPPING ===");
for (const [stem, audioUrls] of Object.entries(result.stations.mindmap_speaking.branchLabelsAudio)) {
  console.log(`\n${stem}`);
  audioUrls.forEach((url, i) => {
    const branch = result.stations.mindmap_speaking.branchLabels[stem][i];
    console.log(`  Branch ${i+1}: ${branch} -> ${url}`);
  });
}
