/**
 * Weekly PBL Worksheet & Parent-Teacher Handover Generator
 * Generates an A4 print-ready PDF document with Cambridge branding, 
 * 3-panel comic prompts, vocabulary bank, and offline PBL mission.
 * Zero external heavy dependencies — uses clean semantic printable window.
 */

export function generateWeeklyWorksheet(weekData, learnerName = 'Student') {
  if (!weekData) return;

  const weekNum = weekData.week || weekData.weekId || 33;
  const theme = weekData.theme || weekData.title || 'Weekly Lesson';
  const panels = weekData.picture_story || weekData.picturePanels || [
    { title_en: 'Panel 1: Running in Corridor', image_url: '/images/week33/writing_panel_1.png' },
    { title_en: 'Panel 2: Slipping on Wet Floor', image_url: '/images/week33/writing_panel_2.png' },
    { title_en: 'Panel 3: Nurse Applying Bandage', image_url: '/images/week33/writing_panel_3.png' }
  ];
  const pills = weekData.word_bank_pills || {};
  const pblMission = weekData.pbl_mission || {
    title_en: "Offline Safety Ambassador Mission",
    title_vi: "Nhiệm vụ Đại sứ An toàn Học đường",
    task_en: "1. Draw a safety warning sign for your home or school.\n2. Write 3 safety rules under your sign.\n3. Record a 1-minute video explaining why these rules protect everyone.",
    task_vi: "1. Vẽ 1 biển báo an toàn cho gia đình hoặc trường học.\n2. Viết 3 quy tắc an toàn bên dưới biển báo.\n3. Quay video 1 phút giải thích vì sao quy tắc này bảo vệ mọi người."
  };

  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow popups to open the Printable Weekly Worksheet.');
    return;
  }

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>EngQuest3K - Week ${weekNum} PBL Handover Worksheet</title>
  <style>
    @page { size: A4 portrait; margin: 12mm; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #1e293b;
      margin: 0;
      padding: 0;
      line-height: 1.4;
      font-size: 11pt;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #2563eb;
      padding-bottom: 8px;
      margin-bottom: 12px;
    }
    .logo {
      font-size: 16pt;
      font-weight: 900;
      color: #1d4ed8;
      letter-spacing: -0.5px;
    }
    .badge {
      font-size: 8pt;
      font-weight: 800;
      background: #dbeafe;
      color: #1e40af;
      padding: 3px 8px;
      border-radius: 4px;
      text-transform: uppercase;
    }
    .meta-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 8px 12px;
      margin-bottom: 12px;
      display: flex;
      justify-content: space-between;
      font-size: 9.5pt;
    }
    .section-title {
      font-size: 11pt;
      font-weight: 800;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin: 10px 0 6px 0;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .comic-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      margin-bottom: 12px;
    }
    .comic-card {
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      overflow: hidden;
      text-align: center;
      background: #fff;
    }
    .comic-card img {
      width: 100%;
      height: 100px;
      object-fit: cover;
      display: block;
    }
    .comic-card .caption {
      font-size: 8pt;
      font-weight: 700;
      padding: 4px;
      background: #f1f5f9;
      color: #334155;
    }
    .writing-lines {
      border: 1px solid #94a3b8;
      border-radius: 6px;
      height: 120px;
      background-image: repeating-linear-gradient(transparent, transparent 23px, #e2e8f0 24px);
      padding: 8px;
      margin-bottom: 12px;
    }
    .vocab-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 8.5pt;
      margin-bottom: 10px;
    }
    .vocab-table th, .vocab-table td {
      border: 1px solid #cbd5e1;
      padding: 4px 6px;
      text-align: left;
    }
    .vocab-table th {
      background: #f1f5f9;
      font-weight: 800;
    }
    .pbl-box {
      background: #fefce8;
      border: 2px dashed #ca8a04;
      border-radius: 8px;
      padding: 10px 14px;
      margin-top: 10px;
    }
    .pbl-title {
      font-weight: 900;
      color: #854d0e;
      font-size: 10pt;
      margin-bottom: 4px;
    }
    .footer {
      text-align: center;
      font-size: 7.5pt;
      color: #64748b;
      margin-top: 14px;
      border-top: 1px solid #e2e8f0;
      padding-top: 6px;
    }
    @media print {
      .no-print { display: none; }
    }
  </style>
</head>
<body>
  <div class="no-print" style="background:#2563eb; color:#fff; padding:10px; text-align:center; font-weight:bold; margin-bottom:15px; border-radius:6px;">
    🖨️ Click "Print / Save as PDF" (Ctrl+P or Cmd+P) to print or export as PDF.
    <button onclick="window.print()" style="margin-left:15px; padding:6px 16px; background:#fff; color:#2563eb; font-weight:900; border:none; border-radius:4px; cursor:pointer;">Print Worksheet</button>
  </div>

  <div class="header">
    <div>
      <div class="logo">EngQuest 3000</div>
      <div style="font-size:8pt; color:#64748b; font-weight:600;">Cambridge A2 Flyers & CLIL Academic Platform</div>
    </div>
    <div style="text-align:right;">
      <span class="badge">Week ${weekNum} Handover</span>
      <div style="font-size:8pt; color:#475569; margin-top:2px; font-weight:700;">Theme: ${theme}</div>
    </div>
  </div>

  <div class="meta-box">
    <div><strong>Student Name:</strong> ____________________________</div>
    <div><strong>Class:</strong> _____________</div>
    <div><strong>Date:</strong> ___ / ___ / 2026</div>
    <div><strong>Score:</strong> _____ / 100</div>
  </div>

  <div class="section-title">✍️ Part 1: Picture Story Writing (Cambridge A2 Standard — 20+ words)</div>
  <div class="comic-grid">
    ${panels.map((p, i) => `
      <div class="comic-card">
        <img src="${p.image_url}" alt="Panel ${i+1}" onerror="this.src='https://placehold.co/300x150/e2e8f0/475569?text=Scene+${i+1}'" />
        <div class="caption">${p.title_en || `Panel ${i+1}`}</div>
      </div>
    `).join('')}
  </div>

  <div style="font-size:8.5pt; color:#475569; margin-bottom:4px; font-weight:600;">
    💡 <strong>Word Bank:</strong> ${(pills.action_verbs || []).slice(0, 5).join(', ')}, ${(pills.connectors || []).slice(0, 4).join(', ')}
  </div>
  <div class="writing-lines"></div>

  <div class="section-title">🌟 Part 2: Offline PBL Mission (Thực hành dự án thực tế)</div>
  <div class="pbl-box">
    <div class="pbl-title">🎯 ${pblMission.title_en} (${pblMission.title_vi})</div>
    <div style="font-size:8.5pt; color:#713f12; white-space:pre-line; margin-bottom:4px;">
${pblMission.task_en}
    </div>
    <div style="font-size:8pt; color:#a16207; font-style:italic; border-top:1px dashed #eab308; padding-top:4px;">
      🇻🇳 Hướng dẫn phụ huynh: Giúp con hoàn thành thử thách vẽ và quay video ngắn 1 phút gửi lên lớp học.
    </div>
  </div>

  <div class="footer">
    EngQuest 3000 Academic Excellence Standard • Parent-Teacher Handover Module • Verified Cambridge A2 Flyers Syllabus
  </div>
</body>
</html>
  `;

  printWindow.document.write(htmlContent);
  printWindow.document.close();
}
