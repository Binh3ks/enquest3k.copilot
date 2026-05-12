import { pathToFileURL } from 'url';

function buildFullSentence(stemText, branchText) {
  return stemText.replace('___', branchText);
}

const files = [
  ['src/data/weeks/week_28/mindmap.js', 'W28 ADV'],
  ['src/data/weeks_easy/week_28/mindmap.js', 'W28 Easy'],
  ['src/data/weeks/week_29/mindmap.js', 'W29 ADV'],
  ['src/data/weeks_easy/week_29/mindmap.js', 'W29 Easy'],
  ['src/data/weeks/week_30/mindmap.js', 'W30 ADV'],
  ['src/data/weeks_easy/week_30/mindmap.js', 'W30 Easy'],
  ['src/data/weeks/week_31/mindmap.js', 'W31 ADV'],
  ['src/data/weeks_easy/week_31/mindmap.js', 'W31 Easy'],
];

for (const [file, label] of files) {
  const mod = await import(pathToFileURL(`${process.cwd()}/${file}`).href);
  const data = mod.default;
  const issues = [];
  for (const stem of data.centerStems) {
    const stemText = typeof stem === 'string' ? stem : stem.text;
    const branches = data.branchLabels[stemText] || [];
    for (const branch of branches) {
      const branchText = typeof branch === 'string' ? branch : branch.text;
      const full = buildFullSentence(stemText, branchText);
      if (full.includes('___')) {
        issues.push({ stem: stemText, branch: branchText, result: full });
      }
    }
  }
  if (issues.length) {
    console.log(`\n❌ ${label} — ${issues.length} issues:`);
    for (const i of issues) {
      console.log(`  STEM:   "${i.stem}"`);
      console.log(`  BRANCH: "${i.branch}"`);
      console.log(`  RESULT: "${i.result}"`);
      console.log('');
    }
  } else {
    console.log(`✅ ${label}`);
  }
}
