import fs from 'fs';
import path from 'path';

const syllabusPath = 'docs/1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt';
const lines = fs.readFileSync(syllabusPath, 'utf8').split('\n');

const mockWeeks = [];
for (let w = 4; w <= 156; w += 4) {
  mockWeeks.push(w);
}

// Find each week in Source B
const weekEntries = {};

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  // Match single week or range
  const mSingle = line.match(/^[ \t]*[•\-\*]?[ \t]*(?:Week|Tuần)\s*(\d+)\b[:\s]*(.*)/i);
  if (mSingle) {
    const w = parseInt(mSingle[1], 10);
    if (!weekEntries[w]) {
      weekEntries[w] = {
        lineNum: i + 1,
        rawText: line.trim(),
        title: mSingle[2].trim()
      };
    }
  }

  const mRange = line.match(/^[ \t]*[•\-\*]?[ \t]*(?:Weeks|Tuần)\s*(\d+)\s*[-–—]\s*(\d+)\b[:\s]*(.*)/i);
  if (mRange) {
    const start = parseInt(mRange[1], 10);
    const end = parseInt(mRange[2], 10);
    for (let w = start; w <= end; w++) {
      if (!weekEntries[w]) {
        weekEntries[w] = {
          lineNum: i + 1,
          rawText: line.trim(),
          title: mRange[3].trim(),
          isRange: true,
          range: `${start}-${end}`
        };
      }
    }
  }
}

// Categorization helper
function categorize(title, rawText) {
  const lower = (title + ' ' + rawText).toLowerCase();
  if (lower.includes('exam') || lower.includes('test') || lower.includes('assessment') || lower.includes('checkpoint') || lower.includes('mock')) {
    return 'Authentic Exam / Assessment';
  }
  if (lower.includes('review') || lower.includes('consolidation') || lower.includes('showcase')) {
    return 'Review & Consolidation';
  }
  if (lower.includes('debate') || lower.includes('fair') || lower.includes('presentation') || lower.includes('graduation') || lower.includes('ceremony') || lower.includes('assembly')) {
    return 'Project / Culminating Event';
  }
  return 'New Rotary Content';
}

const audit = [];
const stats = {
  'Authentic Exam / Assessment': 0,
  'Review & Consolidation': 0,
  'Project / Culminating Event': 0,
  'New Rotary Content': 0
};

// Check merged / staged status
const prodDir = 'src/data/weeks';
const stagingDir = 'docs/agent_artifacts/staging';

for (const w of mockWeeks) {
  const entry = weekEntries[w] || { lineNum: 'N/A', rawText: 'NOT FOUND IN SOURCE B', title: 'NOT FOUND' };
  const cat = categorize(entry.title, entry.rawText);
  stats[cat]++;

  // Check production status
  const prodPath = path.join(prodDir, `week_${w}`);
  const hasReadingHub = fs.existsSync(path.join(prodPath, 'reading_hub.js'));
  let prodStatus = 'Unauthored stub';
  if (hasReadingHub) {
    const bpPath = path.join(prodPath, 'blueprint.json');
    let isProdMock = false;
    if (fs.existsSync(bpPath)) {
      const bp = JSON.parse(fs.readFileSync(bpPath, 'utf8'));
      isProdMock = bp.isFullMock === true;
    }
    prodStatus = isProdMock ? 'Merged FULL MOCK (Real content)' : 'Merged ROTARY (Real content)';
  }

  // Check staging status
  let stagingStatus = 'None';
  if (fs.existsSync(path.join(stagingDir, `week_${w}_mock`, 'reading_hub.js'))) {
    stagingStatus = 'Staged as MOCK';
  } else if (fs.existsSync(path.join(stagingDir, `week_${w}`, 'reading_hub.js'))) {
    stagingStatus = 'Staged as rotary';
  }

  audit.push({
    week: w,
    lineNum: entry.lineNum,
    rawText: entry.rawText,
    category: cat,
    prodStatus,
    stagingStatus,
    displacedContent: cat === 'New Rotary Content' ? entry.title : 'None (Was review/exam/project in Source B)'
  });
}

let md = `# Audit of 39 Candidate Mock Weeks (w % 4 === 0) Against Source B\n\n`;
md += `Calculated programmatically by \`scripts/audit_39_mock_weeks.mjs\` from \`docs/1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt\`.\n\n`;

md += `## 1. Summary of Classifications in Source B\n\n`;
md += `- **Total Weeks Audited (\`w % 4 === 0\`)**: ${mockWeeks.length} weeks\n`;
for (const [k, v] of Object.entries(stats)) {
  md += `- **${k}**: ${v} weeks (${((v / mockWeeks.length) * 100).toFixed(1)}%)\n`;
}
md += `\n`;

const mergedMocks = audit.filter(a => a.prodStatus.includes('Merged FULL MOCK'));
const stagedMocks = audit.filter(a => a.stagingStatus.includes('Staged as MOCK'));
md += `## 2. Status in EngQuest (Merged vs Staged Mocks)\n\n`;
md += `- **Merged Full Mocks in Production (Real Content)**: ${mergedMocks.map(m => `**W${m.week}**`).join(', ') || 'None'}\n`;
md += `- **Staged Full Mocks (Ready in staging/)**: ${stagedMocks.map(m => `**W${m.week}**`).join(', ') || 'None'}\n\n`;

md += `### Displaced Source B Content for Merged & Staged Mocks:\n`;
for (const m of [...mergedMocks, ...stagedMocks]) {
  md += `- **W${m.week}** (${m.prodStatus !== 'Unauthored stub' ? m.prodStatus : m.stagingStatus}): Source B line ${m.lineNum}: \`${m.rawText}\` -> Displaced: *${m.displacedContent}*\n`;
}
md += `\n`;

md += `## 3. Complete Itemized Table across all 39 Weeks\n\n`;
md += `| Week | Source B Line | Source B Verbatim Entry | Source B Classification | EngQuest Prod Status | Staging Status | Displaced Source B Content |\n`;
md += `| :---: | :---: | :--- | :--- | :--- | :--- | :--- |\n`;

for (const a of audit) {
  const shortText = a.rawText.replace(/\|/g, '\\|').slice(0, 60);
  md += `| **W${a.week}** | ${a.lineNum} | ${shortText} | \`${a.category}\` | ${a.prodStatus} | ${a.stagingStatus} | ${a.displacedContent} |\n`;
}

fs.writeFileSync('docs/agent_artifacts/audit_39_mock_weeks_classification.md', md, 'utf8');
console.log('Saved docs/agent_artifacts/audit_39_mock_weeks_classification.md');
console.log(stats);
console.log(`Merged mocks: ${mergedMocks.map(m => m.week).join(', ')}`);
console.log(`Staged mocks: ${stagedMocks.map(m => m.week).join(', ')}`);
