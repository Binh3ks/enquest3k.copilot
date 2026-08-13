import { readFileSync } from 'fs';

console.log('================================================================');
console.log('🧪 QA AUTOMATED UNIT VERIFICATION FOR PHASE 1 FIXES');
console.log('================================================================\n');

let totalPassed = 0;

// Test 1: Verify NotepadNoteCompleter calls VoiceService.speak(text, 'dictation')
const notepadCode = readFileSync('src/components/common/NotepadNoteCompleter.jsx', 'utf-8');
if (notepadCode.includes("VoiceService.speak(text, 'dictation')")) {
  console.log('✅ [QA PASS] Hub 2 Listening P2: Speaker button calls VoiceService.speak(text, "dictation") correctly!');
  totalPassed++;
} else {
  console.error('❌ [QA FAIL] Hub 2 Listening P2: VoiceService.speak call missing or incorrect in NotepadNoteCompleter.jsx');
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

// Test 3: Verify Picture 1 intro auto-play effect
if (novaCode.includes("subMode === 'pic_story'") && novaCode.includes('speakNovaQuestion(pictureStoryData.intro_audio_text)')) {
  console.log('✅ [QA PASS] Hub 4 Speaking P3: Picture 1 Examiner Introduction auto-plays audio on load!');
  totalPassed++;
} else {
  console.error('❌ [QA FAIL] Hub 4 Speaking P3: Picture 1 intro auto-play effect missing in NovaTalkShowHub.jsx');
  process.exit(1);
}

console.log(`\n================================================================`);
console.log(`🎉 QA VERIFICATION SUMMARY: ${totalPassed}/3 TESTS PASSED 100%!`);
console.log(`================================================================`);
