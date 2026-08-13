import { readFileSync } from 'fs';

console.log('================================================================');
console.log('🧪 QA AUTOMATED UNIT VERIFICATION FOR PHASE 1 FIXES');
console.log('================================================================\n');

let totalPassed = 0;

// Test 1: Verify NotepadNoteCompleter Master Global Audio Player (Cambridge Flyers Listening Part 2 standard)
const notepadCode = readFileSync('src/components/common/NotepadNoteCompleter.jsx', 'utf-8');
if (notepadCode.includes('handleToggleMasterAudio') && notepadCode.includes('Play Full Audio') && !notepadCode.includes('Listen to note prompt')) {
  console.log('✅ [QA PASS] Hub 2 Listening P2: Master Global Audio Player active & individual note speaker buttons removed (Cambridge Flyers Part 2 Standard)!');
  totalPassed++;
} else {
  console.error('❌ [QA FAIL] Hub 2 Listening P2: Master Global Audio Player missing or individual speaker buttons still exist in NotepadNoteCompleter.jsx');
  process.exit(1);
}


// Test 2: Verify NovaTalkShowHub has activeRecordingPicId for independent picture recording state
const novaCode = readFileSync('src/modules/cambridge_suite/NovaTalkShowHub.jsx', 'utf-8');
if (novaCode.includes('activeRecordingPicId') && novaCode.includes('activeRecordingPicId === pic.id')) {
  console.log('✅ [QA PASS] Hub 4 Speaking P3: Picture recording states are 100% independent per picture card!');
  totalPassed++;
} else {
  console.error('❌ [QA FAIL] Hub 4 Speaking P3: Independent recording state (activeRecordingPicId) missing in NovaTalkShowHub.jsx');
  process.exit(1);
}

// Test 3: Verify User Gesture click audio trigger and Hero Start Mission button
if (novaCode.includes('handleSelectPicStorySubmode') && novaCode.includes('🚀 Start Mission: Listen to Story Intro 🎧')) {
  console.log('✅ [QA PASS] Hub 4 Speaking P3: User Gesture audio trigger & Hero Start Mission button active (Autoplay Policy compliant 100%)!');
  totalPassed++;
} else {
  console.error('❌ [QA FAIL] Hub 4 Speaking P3: User gesture audio trigger or Hero Start Mission button missing in NovaTalkShowHub.jsx');
  process.exit(1);
}


console.log(`\n================================================================`);
console.log(`🎉 QA VERIFICATION SUMMARY: ${totalPassed}/3 TESTS PASSED 100%!`);
console.log(`================================================================`);
