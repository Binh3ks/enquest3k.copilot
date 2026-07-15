/**
 * Bulk Generate AI Tutor Common Phrases to R2
 * 
 * This script pre-generates all 70 common AI Tutor phrases and caches them to R2.
 * Run this once after deploying the new cache architecture to populate the 
 * audio/ai_tutor/common/ folder.
 * 
 * Benefits:
 * - Common phrases immediately available (no first-time generation delay)
 * - Saves API costs (phrases used 50-100x per day)
 * - Consistent voice quality across all instances
 * 
 * Usage:
 *   node tools/generate_ai_tutor_common_phrases.js
 * 
 * Environment:
 *   VITE_TTS_WORKER_URL - TTS Worker URL (default: https://engquest-tts-worker.binhkhoi08.workers.dev)
 */

import { getAllCommonPhrases, getCommonPhrasePath } from '../src/services/ai_tutor/commonPhrases.js';

const TTS_WORKER_URL = process.env.VITE_TTS_WORKER_URL || 'https://engquest-tts-worker.binhkhoi08.workers.dev';
const VOICE = 'aura-asteria-en'; // Female voice for Miss Nova
const CONCURRENCY = 5; // Batch size (avoid rate limiting)
const DELAY_MS = 200; // Delay between batches

/**
 * Generate a single common phrase via Worker
 */
async function generatePhrase(filename, text) {
  const audioPath = getCommonPhrasePath(filename);
  const workerUrl = `${TTS_WORKER_URL}/tts?text=${encodeURIComponent(text)}&station=ai_tutor&voice=${VOICE}&path=${encodeURIComponent(audioPath)}`;
  
  console.log(`🎤 Generating: ${filename}...`);
  
  try {
    const response = await fetch(workerUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const blob = await response.blob();
    const sizeKB = (blob.size / 1024).toFixed(2);
    
    console.log(`✅ ${filename} (${sizeKB} KB)`);
    
    return { filename, success: true, size: blob.size };
  } catch (error) {
    console.error(`❌ ${filename}: ${error.message}`);
    return { filename, success: false, error: error.message };
  }
}

/**
 * Process phrases in batches to avoid rate limiting
 */
async function generateInBatches(phrases, batchSize) {
  const results = [];
  const entries = Object.entries(phrases);
  
  for (let i = 0; i < entries.length; i += batchSize) {
    const batch = entries.slice(i, i + batchSize);
    
    console.log(`\n📦 Batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(entries.length / batchSize)} (${batch.length} phrases)...`);
    
    const batchResults = await Promise.all(
      batch.map(([filename, text]) => generatePhrase(filename, text))
    );
    
    results.push(...batchResults);
    
    // Delay between batches
    if (i + batchSize < entries.length) {
      console.log(`⏸️  Waiting ${DELAY_MS}ms before next batch...`);
      await new Promise(resolve => setTimeout(resolve, DELAY_MS));
    }
  }
  
  return results;
}

/**
 * Main execution
 */
async function main() {
  console.log('╔════════════════════════════════════════════════════════╗');
  console.log('║  AI Tutor Common Phrases Bulk Generation              ║');
  console.log('╚════════════════════════════════════════════════════════╝\n');
  
  console.log(`🎯 Worker URL: ${TTS_WORKER_URL}`);
  console.log(`🎙️  Voice: ${VOICE}`);
  console.log(`📦 Batch size: ${CONCURRENCY}`);
  console.log(`⏱️  Batch delay: ${DELAY_MS}ms\n`);
  
  const phrases = getAllCommonPhrases();
  const totalPhrases = Object.keys(phrases).length;
  
  console.log(`📝 Total phrases to generate: ${totalPhrases}\n`);
  console.log('─────────────────────────────────────────────────────────\n');
  
  const startTime = Date.now();
  const results = await generateInBatches(phrases, CONCURRENCY);
  const endTime = Date.now();
  
  console.log('\n─────────────────────────────────────────────────────────\n');
  console.log('📊 GENERATION SUMMARY\n');
  
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  const totalSize = successful.reduce((sum, r) => sum + r.size, 0);
  const avgSize = totalSize / successful.length;
  const duration = ((endTime - startTime) / 1000).toFixed(2);
  
  console.log(`✅ Successful: ${successful.length}/${totalPhrases}`);
  console.log(`❌ Failed: ${failed.length}/${totalPhrases}`);
  console.log(`📦 Total size: ${(totalSize / 1024).toFixed(2)} KB`);
  console.log(`📏 Average size: ${(avgSize / 1024).toFixed(2)} KB per phrase`);
  console.log(`⏱️  Duration: ${duration}s`);
  console.log(`⚡ Rate: ${(totalPhrases / duration).toFixed(2)} phrases/sec`);
  
  if (failed.length > 0) {
    console.log('\n❌ FAILED PHRASES:\n');
    failed.forEach(f => {
      console.log(`  - ${f.filename}: ${f.error}`);
    });
    console.log('\n💡 Tip: Re-run script to retry failed phrases (Worker checks R2 cache first)');
  }
  
  console.log('\n─────────────────────────────────────────────────────────\n');
  console.log('✅ Bulk generation complete!');
  console.log(`📂 Files cached to: audio/ai_tutor/common/`);
  console.log(`🔗 R2 CDN URL: https://pub-8f917d02000c4be2a7214afb8d12abd3.r2.dev/audio/ai_tutor/common/`);
  console.log('\n💰 Cost Savings Estimate:');
  console.log(`   - Each phrase costs $0.0045 to generate`);
  console.log(`   - With 70 phrases, first generation: $0.315`);
  console.log(`   - Assuming 50 plays/day avg: Save ~$15/month`);
  console.log('─────────────────────────────────────────────────────────\n');
}

// Run
main().catch(error => {
  console.error('\n❌ FATAL ERROR:', error);
  process.exit(1);
});
