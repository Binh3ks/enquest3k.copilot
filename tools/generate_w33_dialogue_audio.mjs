/**
 * tools/generate_w33_dialogue_audio.mjs
 * 
 * DEPRECATED — Replaced by canonical generator: scripts/generate_w33_audio_canonical.mjs
 */
import { fileURLToPath } from 'url';

export async function main() {
  console.error('\n❌ DEPRECATION ERROR: tools/generate_w33_dialogue_audio.mjs is deprecated.');
  console.error('   Please run the canonical generator instead:');
  console.error('   npm run generate:audio:w33 (or node scripts/generate_w33_audio_canonical.mjs)\n');
  process.exit(1);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
