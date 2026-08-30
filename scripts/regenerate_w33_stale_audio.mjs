#!/usr/bin/env node
/**
 * scripts/regenerate_w33_stale_audio.mjs
 *
 * DEPRECATED — Replaced by canonical generator: scripts/generate_w33_audio_canonical.mjs
 * Direct execution is blocked to enforce single unified canonical audio pipeline.
 */
import { fileURLToPath } from 'url';

export async function regenerateStale() {
  console.error('\n❌ DEPRECATION ERROR: scripts/regenerate_w33_stale_audio.mjs has been retired.');
  console.error('   Please run the canonical generator instead:');
  console.error('   npm run generate:audio:w33 (or node scripts/generate_w33_audio_canonical.mjs)\n');
  process.exit(1);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  regenerateStale();
}
