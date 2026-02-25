// Test grammar guard pattern với "guessed"
const pattern = /\b(?!red|bed|wed|fed|shed|led|sled|bred|sped|fled|thread|spread|read|dead|head|bread|ahead|lead|instead|tread)\w{3,}ed\b/gi;

const testStrings = [
  "Yes! You guessed it!",
  "You guessed the correct answer!",
  "The bed is red.",
  "I walked to school.",
  "It is finished."
];

console.log("Testing grammar pattern for -ed verbs:");
console.log("Pattern:", pattern.source);
console.log("\n");

testStrings.forEach((text, index) => {
  const matches = text.match(pattern);
  console.log(`Test ${index + 1}: "${text}"`);
  console.log(`  Matches: ${matches ? matches.join(', ') : 'NONE'}`);
  console.log(`  Should block: ${matches && matches.length > 0 ? 'YES ✅' : 'NO ❌'}`);
  console.log("");
});
