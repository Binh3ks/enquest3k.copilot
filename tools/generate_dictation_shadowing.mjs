import { readFileSync, writeFileSync } from 'fs';

function escapeQuotes(str) {
  return str.replace(/"/g, '\\"');
}

const BASE = 'src/data';

function extractContent(filePath) {
  try {
    const content = readFileSync(filePath, 'utf8');
    const enMatch = content.match(/content_en:\s*`([^`]+)`,\s*content_vi:/s) ||
                    content.match(/content_en:\s*"([^"\\]*(?:\\.[^"\\]*)*)",\s*content_vi:/s);
    const viMatch = content.match(/content_vi:\s*`([^`]+)`,\s*(?:comprehension_questions|question|audio_url|image_url)/s) ||
                    content.match(/content_vi:\s*"([^"\\]*(?:\\.[^"\\]*)*)",\s*(?:comprehension_questions|question|audio_url|image_url)/s);
    if (!enMatch) return null;
    let en = enMatch[1].replace(/\\"/g, '"').replace(/\\n/g, '\n');
    let vi = viMatch ? viMatch[1].replace(/\\"/g, '"').replace(/\\n/g, '\n') : '';
    const enStripped = en.replace(/\*\*/g, '');
    const viStripped = vi.replace(/\*\*/g, '');
    const enSents = enStripped.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0);
    const viSents = viStripped.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0);
    return { en, enSents, viSents };
  } catch (e) {
    return null;
  }
}

function generateADV_Dictation(week, data) {
  const { enSents, viSents } = data;
  const lines = enSents.map((text, i) => {
    const meaning = viSents[i] || '';
    return `    { id: ${i + 1}, text: "${escapeQuotes(text)}", meaning: "${escapeQuotes(meaning)}" }`;
  });
  return `export default {\n  sentences: [\n${lines.join(',\n')}\n  ]\n};\n`;
}

function generateADV_Shadowing(week, data) {
  const { enSents, viSents } = data;
  const lines = enSents.map((text, i) => {
    const vi = viSents[i] || '';
    return `    { id: ${i + 1}, text: "${escapeQuotes(text)}", vi: "${escapeQuotes(vi)}" }`;
  });
  return `export default {\n  script: [\n${lines.join(',\n')}\n  ]\n};\n`;
}

function generateEasy_Dictation(week, data) {
  const { enSents, viSents } = data;
  const lines = enSents.map((text, i) => {
    const meaning = viSents[i] || '';
    return `    { id: ${i + 1}, text: "${escapeQuotes(text)}", meaning: "${escapeQuotes(meaning)}" }`;
  });
  return `export default {\n  sentences: [\n${lines.join(',\n')}\n  ]\n};\n`;
}

function generateEasy_Shadowing(week, data) {
  const { enSents, viSents } = data;
  const lines = enSents.map((text, i) => {
    const vi = viSents[i] || '';
    return `    { id: ${i + 1}, text: "${escapeQuotes(text)}", vi: "${escapeQuotes(vi)}" }`;
  });
  return `export default {\n  script: [\n${lines.join(',\n')}\n  ]\n};\n`;
}

const weeks = ['week_14', 'week_15', 'week_16', 'week_17', 'week_18', 'week_19', 'week_20', 'week_21', 'week_22'];

weeks.forEach(week => {
  const advRead = extractContent(`${BASE}/weeks/${week}/read.js`);
  const easyRead = extractContent(`${BASE}/weeks_easy/${week}/read.js`);

  if (advRead) {
    const dictContent = generateADV_Dictation(week, advRead);
    const shadContent = generateADV_Shadowing(week, advRead);
    writeFileSync(`${BASE}/weeks/${week}/dictation.js`, dictContent);
    writeFileSync(`${BASE}/weeks/${week}/shadowing.js`, shadContent);
    console.log(`ADV ${week}: wrote dictation.js (${advRead.enSents.length} sents) + shadowing.js (${advRead.enSents.length} sents)`);
  } else {
    console.log(`ADV ${week}: MISSING read.js`);
  }

  if (easyRead) {
    const dictContent = generateEasy_Dictation(week, easyRead);
    const shadContent = generateEasy_Shadowing(week, easyRead);
    writeFileSync(`${BASE}/weeks_easy/${week}/dictation.js`, dictContent);
    writeFileSync(`${BASE}/weeks_easy/${week}/shadowing.js`, shadContent);
    console.log(`Easy ${week}: wrote dictation.js (${easyRead.enSents.length} sents) + shadowing.js (${easyRead.enSents.length} sents)`);
  } else {
    console.log(`Easy ${week}: MISSING read.js`);
  }
});

// W33
const w33AdvRead = extractContent(`${BASE}/weeks/week_33/read.js`);
const w33EasyRead = extractContent(`${BASE}/weeks_easy/week_33/read.js`);

if (w33AdvRead) {
  writeFileSync(`${BASE}/weeks/week_33/dictation.js`, generateADV_Dictation('week_33', w33AdvRead));
  writeFileSync(`${BASE}/weeks/week_33/shadowing.js`, generateADV_Shadowing('week_33', w33AdvRead));
  console.log(`ADV week_33: wrote dictation.js (${w33AdvRead.enSents.length} sents) + shadowing.js (${w33AdvRead.enSents.length} sents)`);
} else {
  console.log('ADV week_33: MISSING read.js');
}

if (w33EasyRead) {
  writeFileSync(`${BASE}/weeks_easy/week_33/dictation.js`, generateEasy_Dictation('week_33', w33EasyRead));
  writeFileSync(`${BASE}/weeks_easy/week_33/shadowing.js`, generateEasy_Shadowing('week_33', w33EasyRead));
  console.log(`Easy week_33: wrote dictation.js (${w33EasyRead.enSents.length} sents) + shadowing.js (${w33EasyRead.enSents.length} sents)`);
} else {
  console.log('Easy week_33: MISSING read.js');
}

console.log('\nDone!');
