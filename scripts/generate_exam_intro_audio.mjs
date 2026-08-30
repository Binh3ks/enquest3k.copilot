/**
 * scripts/generate_exam_intro_audio.mjs
 *
 * DEPRECATED — Replaced by canonical generator: scripts/generate_w33_audio_canonical.mjs
 * Direct execution is blocked to prevent single-voice overwriting of Cambridge exam intros.
 */
import { fileURLToPath } from 'url';

export async function generateExamIntros() {
  console.error('\n❌ DEPRECATION ERROR: scripts/generate_exam_intro_audio.mjs has been retired.');
  console.error('   Please run the canonical generator instead:');
  console.error('   npm run generate:audio:w33 (or node scripts/generate_w33_audio_canonical.mjs)\n');
  process.exit(1);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generateExamIntros();
}
