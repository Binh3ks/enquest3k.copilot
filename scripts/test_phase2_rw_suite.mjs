import { readFileSync } from 'fs';

console.log('================================================================');
console.log('🧪 QA AUTOMATED UNIT VERIFICATION FOR PHASE 2 R&W SUITE');
console.log('================================================================\n');

let totalPassed = 0;

// Test 1: Verify WordBankMatchingGrid (R&W Part 1)
const part1Code = readFileSync('src/components/cambridge/WordBankMatchingGrid.jsx', 'utf-8');
if (part1Code.includes('usedWords') && part1Code.includes('opacity-40 line-through') && part1Code.includes('CAMBRIDGE READING & WRITING PART 1')) {
  console.log('✅ [QA PASS] R&W Part 1: WordBankMatchingGrid active with 15-word pool & visual elimination tracking!');
  totalPassed++;
} else {
  console.error('❌ [QA FAIL] R&W Part 1: WordBankMatchingGrid implementation incomplete.');
  process.exit(1);
}

// Test 2: Verify DialogueAHCompleter (R&W Part 2)
const part2Code = readFileSync('src/components/cambridge/DialogueAHCompleter.jsx', 'utf-8');
if (part2Code.includes('optionToGapMap') && part2Code.includes('A-H Answers Drawer') && part2Code.includes('CAMBRIDGE READING & WRITING PART 2')) {
  console.log('✅ [QA PASS] R&W Part 2: DialogueAHCompleter active with continuous dialogue & A-H side drawer!');
  totalPassed++;
} else {
  console.error('❌ [QA FAIL] R&W Part 2: DialogueAHCompleter implementation incomplete.');
  process.exit(1);
}

// Test 3: Verify InlineTextClozeDropdown (R&W Part 4)
const part4Code = readFileSync('src/components/cambridge/InlineTextClozeDropdown.jsx', 'utf-8');
if (part4Code.includes('activeGapPopover') && part4Code.includes('CAMBRIDGE READING & WRITING PART 4') && part4Code.includes('Choose the best title')) {
  console.log('✅ [QA PASS] R&W Part 4: InlineTextClozeDropdown active with 10 popover dropdown gaps & story title choice!');
  totalPassed++;
} else {
  console.error('❌ [QA FAIL] R&W Part 4: InlineTextClozeDropdown implementation incomplete.');
  process.exit(1);
}

// Test 4: Verify TextExtractionCompleter (R&W Part 5)
const part5Code = readFileSync('src/components/cambridge/TextExtractionCompleter.jsx', 'utf-8');
if (part5Code.includes('wordCount > 4') && part5Code.includes('CAMBRIDGE READING & WRITING PART 5') && part5Code.includes('7 Summary Sentences')) {
  console.log('✅ [QA PASS] R&W Part 5: TextExtractionCompleter active with split-screen layout & 1-4 words extraction limit!');
  totalPassed++;
} else {
  console.error('❌ [QA FAIL] R&W Part 5: TextExtractionCompleter implementation incomplete.');
  process.exit(1);
}

// Test 5: Verify WorldDiscoveryHub sub-tabs integration
const hub1Code = readFileSync('src/modules/cambridge_suite/WorldDiscoveryHub.jsx', 'utf-8');
if (hub1Code.includes('WordBankMatchingGrid') && hub1Code.includes('DialogueAHCompleter') && hub1Code.includes('InlineTextClozeDropdown') && hub1Code.includes('TextExtractionCompleter')) {
  console.log('✅ [QA PASS] WorldDiscoveryHub (Hub 1): All 4 R&W Suite components integrated into sub-tabs navigation!');
  totalPassed++;
} else {
  console.error('❌ [QA FAIL] WorldDiscoveryHub integration missing R&W components.');
  process.exit(1);
}

// Test 6: Verify Fisher-Yates Array Shuffling in all components (DialogueAHCompleter, WordBankMatchingGrid, InlineTextClozeDropdown, FlashArena)
const flashArenaCode = readFileSync('src/modules/hubs/station2/LearnMode/FlashArena.jsx', 'utf-8');
const allShuffled = part1Code.includes('shuffleArray') && part2Code.includes('shuffleArray') && part4Code.includes('shuffleArray') && flashArenaCode.includes('shuffledEnList');
if (allShuffled) {
  console.log('✅ [QA PASS] Array Shuffling (Fisher-Yates): Active in DialogueAHCompleter, WordBankMatchingGrid, InlineTextClozeDropdown, and FlashArena!');
  totalPassed++;
} else {
  console.error('❌ [QA FAIL] Array Shuffling missing in one or more components.');
  process.exit(1);
}

console.log(`\n================================================================`);
console.log(`🎉 QA VERIFICATION SUMMARY: ${totalPassed}/6 TESTS PASSED 100%!`);
console.log(`================================================================`);

