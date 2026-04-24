// check_mismatches.mjs
const checks = [
  ['src/data/weeks/week_17/read.js', 'read', [0,1], 'W17 adv'],
  ['src/data/weeks/week_17/explore.js', 'explore', [0,1,2], 'W17 adv'],
  ['src/data/weeks/week_21/read.js', 'read', [0,2,3], 'W21 adv'],
  ['src/data/weeks_easy/week_21/read.js', 'read', [1], 'W21 easy'],
  ['src/data/weeks_easy/week_21/explore.js', 'explore', [2], 'W21 easy'],
  ['src/data/weeks/week_22/read.js', 'read', [2], 'W22 adv'],
  ['src/data/weeks/week_22/explore.js', 'explore', [0], 'W22 adv'],
  ['src/data/weeks_easy/week_22/read.js', 'read', [0,2], 'W22 easy'],
  ['src/data/weeks_easy/week_22/explore.js', 'explore', [1], 'W22 easy'],
  ['src/data/weeks/week_23/read.js', 'read', [3], 'W23 adv'],
  ['src/data/weeks/week_23/explore.js', 'explore', [0,3], 'W23 adv'],
  ['src/data/weeks_easy/week_23/explore.js', 'explore', [1], 'W23 easy'],
  ['src/data/weeks/week_24/read.js', 'read', [2], 'W24 easy'],
  ['src/data/weeks/week_24/explore.js', 'explore', [1], 'W24 adv'],
  ['src/data/weeks_easy/week_24/read.js', 'read', [2], 'W24 easy'],
  ['src/data/weeks_easy/week_24/explore.js', 'explore', [1], 'W24 easy'],
  ['src/data/weeks/week_25/read.js', 'read', [2,3], 'W25 adv'],
  ['src/data/weeks/week_25/explore.js', 'explore', [2], 'W25 adv'],
  ['src/data/weeks/week_26/read.js', 'read', [3], 'W26 adv'],
  ['src/data/weeks/week_26/explore.js', 'explore', [2], 'W26 adv'],
  ['src/data/weeks_easy/week_26/read.js', 'read', [2], 'W26 easy'],
  ['src/data/weeks/week_27/read.js', 'read', [2,3], 'W27 adv'],
  ['src/data/weeks/week_27/explore.js', 'explore', [2], 'W27 adv'],
  ['src/data/weeks_easy/week_27/read.js', 'read', [3], 'W27 easy'],
  ['src/data/weeks_easy/week_27/explore.js', 'explore', [0], 'W27 easy'],
  ['src/data/weeks/week_28/read.js', 'read', [0,1,2], 'W28 adv'],
  ['src/data/weeks/week_28/explore.js', 'explore', [0,2], 'W28 adv'],
  ['src/data/weeks_easy/week_28/read.js', 'read', [0], 'W28 easy'],
  ['src/data/weeks_easy/week_28/explore.js', 'explore', [2], 'W28 easy'],
  ['src/data/weeks/week_29/read.js', 'read', [0,1,3], 'W29 adv'],
  ['src/data/weeks/week_29/explore.js', 'explore', [1,2], 'W29 adv'],
  ['src/data/weeks_easy/week_29/read.js', 'read', [0,2], 'W29 easy'],
  ['src/data/weeks/week_30/read.js', 'read', [0,1,3], 'W30 adv'],
  ['src/data/weeks/week_30/explore.js', 'explore', [1,3], 'W30 adv'],
];

for (const [f, type, qIdxs, label] of checks) {
  const m = await import('./' + f + '?t=' + Date.now());
  const d = m.default;
  const arr = type === 'read' ? d.comprehension_questions : d.check_questions;
  console.log('\n=== ' + label + ' ' + type + ' ===');
  const content = (d.content_en || '').replace(/\*\*/g,'').replace(/\n/g,' ').slice(0,500);
  console.log('Content:', content);
  for (const qi of qIdxs) {
    const q = arr?.[qi];
    if (!q) { console.log(`  Q[${qi}]: MISSING`); continue; }
    console.log(`  Q[${qi}]: "${q.question_en}" | A: ${JSON.stringify(q.answer)}`);
  }
}
