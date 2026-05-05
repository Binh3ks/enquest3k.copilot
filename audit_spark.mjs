import { readFileSync } from 'fs';

const files = [
  'src/data/weeks/week_01_real.js','src/data/weeks/week_02_real.js','src/data/weeks/week_03_real.js',
  'src/data/weeks/week_04_real.js','src/data/weeks/week_05_real.js','src/data/weeks/week_06_real.js',
  'src/data/weeks/week_07_real.js','src/data/weeks/week_08_real.js','src/data/weeks/week_09_real.js',
  'src/data/weeks/week_10_real.js','src/data/weeks/week_11_real.js','src/data/weeks/week_12_real.js',
  'src/data/weeks/week_13_real.js','src/data/weeks/week_14_real.js','src/data/weeks/week_15_real.js',
  'src/data/weeks/week_16_real.js','src/data/weeks/week_17_real.js','src/data/weeks/week_18_real.js',
  'src/data/weeks/week_19_real.js','src/data/weeks/week_20_real.js','src/data/weeks/week_21_real.js',
  'src/data/weeks/week_22_real.js','src/data/weeks/week_23_real.js','src/data/weeks/week_24_real.js',
  'src/data/weeks/week_25_real.js','src/data/weeks/week_26_real.js','src/data/weeks/week_27/week_27_real.js',
  'src/data/weeks/week_28_real.js','src/data/weeks/week_29/week_29_real.js','src/data/weeks/week_30/week_30_real.js'
];

for (const f of files) {
  const code = readFileSync(f, 'utf8');
  const m = code.match(/spark_talk:\s*\[[\s\S]*?\],\n\s*conversation_cards/);
  if (!m) { console.log('NO SPARK_TALK IN ' + f); continue; }
  const week = f.match(/week_(\d+)/)[1];
  const lines = m[0].split('\n');
  let seedQ = null;
  let sparkId = null;
  let isFirstFrame = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const sid = line.match(/id:\s*'(spark_[^']+)'/);
    if (sid) { sparkId = sid[1]; isFirstFrame = true; seedQ = null; }

    const sq = line.match(/seed_question:\s*'([^']+)'/);
    if (sq) seedQ = sq[1];

    const tmplM = line.match(/template:\s*'([^']+)'/);
    const fuqM = line.match(/follow_up_q:\s*'([^']+)'/);
    const hintsM = line.match(/hints:\s*(\[[^\]]+\])/);

    if (tmplM && fuqM && hintsM) {
      const tmpl = tmplM[1];
      const fuq = fuqM[1];
      let hArr;
      try { hArr = JSON.parse(hintsM[1].replace(/'/g, '"')); } catch(e) { hArr = ['PARSE_ERROR']; }
      const rendered = hArr.map(h => tmpl.replace('___', h));

      if (isFirstFrame && seedQ) {
        console.log('\nW' + week + ' [' + sparkId + ']');
        console.log('  SEED: ' + seedQ);
        isFirstFrame = false;
      } else if (isFirstFrame) {
        isFirstFrame = false;
      }

      console.log('  T: ' + tmpl);
      console.log('  Q: ' + fuq);
      console.log('  H: ' + rendered.join(' | '));
    }
  }
}
