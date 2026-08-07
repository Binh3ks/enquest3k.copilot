import { loadWeekData } from '../src/data/weeks/index.js';

console.log('🧪 Testing Week 37 Runtime Dynamic Loader...');

async function testRuntime() {
  try {
    const adv = await loadWeekData(37, false);
    console.log('✅ Advanced Week 37 Loaded:');
    console.log('  - Title:', adv.title);
    console.log('  - Stations exported:', Object.keys(adv));
    console.log('  - Reading passage title:', adv.read?.title);
    console.log('  - Vocab items:', adv.vocab?.length);
    console.log('  - Chunks registered:', adv.read?.chunk_focus?.length);

    const easy = await loadWeekData(37, true);
    console.log('\n✅ Easy Week 37 Loaded:');
    console.log('  - Title:', easy.title);
    console.log('  - Stations exported:', Object.keys(easy));
    console.log('  - Reading passage title:', easy.read?.title);
    console.log('  - Vocab items:', easy.vocab?.length);
    console.log('  - Chunks registered:', easy.read?.chunk_focus?.length);

    console.log('\n🎉 ALL RUNTIME CHECKS PASSED FOR WEEK 37!');
  } catch (err) {
    console.error('❌ Runtime load failed:', err);
    process.exit(1);
  }
}

testRuntime();
