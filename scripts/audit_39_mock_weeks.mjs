import fs from 'fs';
import path from 'path';

const syllabusPath = 'docs/1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt';
const lines = fs.readFileSync(syllabusPath, 'utf8').split('\n');

const part2Start = lines.findIndex(l => l.includes('PART II'));

const mockWeeks = [];
for (let w = 4; w <= 156; w += 4) {
  mockWeeks.push(w);
}

// Find each week strictly in Part II of Source B
const weekEntries = {};

for (let i = part2Start; i < lines.length; i++) {
  const line = lines[i];

  // Match single week
  const mSingle = line.match(/^[ \t]*[•\-\*]?[ \t]*(?:Week|Tuần)\s*(\d+)\b[:\s]*(.*)/i);
  if (mSingle) {
    const w = parseInt(mSingle[1], 10);
    if (!weekEntries[w]) {
      weekEntries[w] = {
        lineNum: i + 1,
        rawText: line.trim(),
        title: mSingle[2].trim(),
        isRange: false
      };
    }
  }

  // Match range (e.g., Weeks 79-80)
  const mRange = line.match(/^[ \t]*[•\-\*]?[ \t]*(?:Weeks|Tuần)\s*(\d+)\s*[-–—]\s*(\d+)\b[:\s]*(.*)/i);
  if (mRange) {
    // Avoid unit/block headers that contain "Content (Unit..."
    if (/Content\s*\(Unit/i.test(mRange[3])) continue;
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

// Categorization helper based on Part II content
function categorizePart2(title, rawText) {
  const lower = (title + ' ' + rawText).toLowerCase();
  if (lower.includes('exam') || lower.includes('test') || lower.includes('assessment') || lower.includes('checkpoint') || lower.includes('mock')) {
    return 'Official Exam / Assessment';
  }
  if (lower.includes('review') && (lower.includes('project') || lower.includes('debate') || lower.includes('mini-book'))) {
    return 'Review & Project / Culminating Event';
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
  'Official Exam / Assessment': 0,
  'Review & Project / Culminating Event': 0,
  'Review & Consolidation': 0,
  'Project / Culminating Event': 0,
  'New Rotary Content': 0
};

const prodDir = 'src/data/weeks';
const stagingDir = 'docs/agent_artifacts/staging';

for (const w of mockWeeks) {
  const entry = weekEntries[w] || { lineNum: 'N/A', rawText: 'NOT FOUND IN PART II', title: 'NOT FOUND' };
  const cat = categorizePart2(entry.title, entry.rawText);
  stats[cat] = (stats[cat] || 0) + 1;

  // Check production status
  const prodPath = path.join(prodDir, `week_${w}`);
  const hasReadingHub = fs.existsSync(path.join(prodPath, 'reading_hub.js'));
  let prodStatus = 'Unauthored stub';
  if (hasReadingHub) {
    const bpPath = path.join(prodPath, 'blueprint.json');
    let isProdMock = false;
    if (fs.existsSync(bpPath)) {
      try {
        const bp = JSON.parse(fs.readFileSync(bpPath, 'utf8'));
        isProdMock = bp.isFullMock === true;
      } catch (e) {}
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

let md = `# Audit 39 Tuần Mock Tiềm Năng (w % 4 === 0) Dựa Trên Phần II Source B (Round 74)\n\n`;
md += `> Căn cứ thực thi: Quét 100% dòng tuần trong **PART II (từ dòng ${part2Start + 1})** của file \`docs/1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt\`.\n\n`;

md += `## 1. Bảng Trích Dẫn 6 Tuần Mục Tiêu Cụ Thể (Task D.9)\n\n`;
md += `| Tuần | Dòng Part II | Trích dẫn nguyên văn dòng Part II trong Source B | Phân loại Sư phạm Source B | Trạng thái trong Repo EngQuest3K |\n`;
md += `| :---: | :---: | :--- | :--- | :--- |\n`;

const targetWeeks = [36, 76, 80, 40, 44, 48];
for (const tw of targetWeeks) {
  const row = audit.find(a => a.week === tw);
  if (row) {
    const status = row.prodStatus !== 'Unauthored stub' ? row.prodStatus : row.stagingStatus;
    md += `| **W${row.week}** | L${row.lineNum} | \`${row.rawText}\` | **${row.category}** | ${status} |\n`;
  }
}

md += `\n> **Phân tích sư phạm 6 tuần mục tiêu**:\n`;
md += `- **W36**: Source B ghi rõ là *Review & Project 3: "My Adventure Book"* (Dự án làm sách kết hợp ôn tập). Bản chất là tuần ôn tập/dự án, việc tổ chức Flyers Mock không làm mất nội dung kiến thức mới.\n`;
md += `- **W80**: Source B ghi trong khoảng *Weeks 79-80: Review & Micro-Debate 2* (Tranh luận nhỏ). Bản chất là chu trình ôn tập/debate.\n`;
md += `- **W76**: Source B ghi *History/ELA: Explorers / Math: Map Scales* (Lịch sử: Các nhà Thám hiểm & Toán Tỷ lệ bản đồ). Đây là **Nội dung Rotary Mới (New Rotary Content)**, KHÔNG PHẢI tuần thi hay ôn tập trong Source B. Biến W76 thành Full Mock PET đã thay thế mất nội dung Thám hiểm & Tỷ lệ bản đồ.\n`;
md += `- **W40**: Source B ghi *Beast Battle (Comparisons)*. Là **Nội dung Rotary Mới** (Khoa học / So sánh động vật), không phải mock.\n`;
md += `- **W44**: Source B ghi *The Cookie Monster (Subtraction Language)*. Là **Nội dung Rotary Mới** (Toán trừ), không phải mock.\n`;
md += `- **W48**: Source B ghi *Measuring Up (Length)*. Là **Nội dung Rotary Mới** (Toán đo độ dài), không phải mock.\n\n`;

md += `## 2. Tổng Hợp Thống Kê Phân Loại 39 Tuần (Part II)\n\n`;
md += `- **Tổng số tuần (\`w % 4 === 0\`)**: ${mockWeeks.length} tuần\n`;
for (const [k, v] of Object.entries(stats)) {
  if (v > 0) {
    md += `- **${k}**: ${v} tuần (${((v / mockWeeks.length) * 100).toFixed(1)}%)\n`;
  }
}
md += `\n`;

md += `## 3. Bảng Chi Tiết Toàn Bộ 39 Tuần Tiềm Năng (w % 4 === 0)\n\n`;
md += `| Tuần | Dòng Part II | Trích dẫn nguyên văn Part II | Phân loại Source B | Trạng thái Prod | Trạng thái Staging |\n`;
md += `| :---: | :---: | :--- | :--- | :--- | :--- |\n`;

for (const a of audit) {
  const shortText = a.rawText.replace(/\|/g, '\\|');
  md += `| **W${a.week}** | L${a.lineNum} | ${shortText} | \`${a.category}\` | ${a.prodStatus} | ${a.stagingStatus} |\n`;
}

fs.writeFileSync('docs/agent_artifacts/audit_39_mock_weeks_classification.md', md, 'utf8');
console.log('Saved docs/agent_artifacts/audit_39_mock_weeks_classification.md');
console.log(stats);
