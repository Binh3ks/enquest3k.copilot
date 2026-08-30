/**
 * scripts/regenerate_w33_listening_audio.mjs
 * 
 * DEPRECATED — Replaced by canonical generator: scripts/generate_w33_audio_canonical.mjs
 * Direct execution is blocked to prevent conflicting voice models for Cambridge listening parts.
 */
import { fileURLToPath } from 'url';

export async function regenerateListening() {
  console.error('\n❌ DEPRECATION ERROR: scripts/regenerate_w33_listening_audio.mjs has been retired.');
  console.error('   Please run the canonical generator instead:');
  console.error('   npm run generate:audio:w33 (or node scripts/generate_w33_audio_canonical.mjs)\n');
  process.exit(1);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  regenerateListening();
}
