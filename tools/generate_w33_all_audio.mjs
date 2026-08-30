/**
 * tools/generate_w33_all_audio.mjs
 * 
 * DEPRECATED — Replaced by canonical generator: scripts/generate_w33_audio_canonical.mjs
 * This file retains STATIC_AUDIO_TASKS export for static reading provenance,
 * but direct execution is blocked to prevent overwriting Cambridge multi-voice audio.
 */
import { fileURLToPath } from 'url';

export const STATIC_AUDIO_TASKS = [
  {
    filename: 'read_social.mp3',
    text: 'School safety rules help protect every student each day. In ancient schools and modern academies, following rules creates a peaceful environment. When students walk calmly in hallways, accidents do not happen. Helping an injured friend shows kindness and responsibility. Good citizens always care for others.',
    voice: 'en-US-Journey-F'
  }
];

export async function generateAll() {
  console.error('\n❌ DEPRECATION ERROR: tools/generate_w33_all_audio.mjs has been retired.');
  console.error('   Please run the canonical generator instead:');
  console.error('   npm run generate:audio:w33 (or node scripts/generate_w33_audio_canonical.mjs)\n');
  process.exit(1);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generateAll();
}
