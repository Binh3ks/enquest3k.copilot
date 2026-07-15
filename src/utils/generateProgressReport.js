/**
 * generateProgressReport.js
 * Sprint T2-B — Print a student progress report to PDF via browser print dialog.
 * No external packages required. Opens a styled window and triggers window.print().
 */

const STATION_LABELS_VI = {
  skill_reading: 'Đọc hiểu', vocab_mastery: 'Từ vựng', game_word_match: 'Ghép từ',
  grammar_lab: 'Ngữ pháp', production_mindmap: 'Mindmap nói', ask_ai: 'Hỏi AI',
  skill_dictation: 'Chính tả', skill_shadowing: 'Shadowing', video_challenge: 'Viết lách',
  explore: 'Khám phá', game_logic: 'Logic', game_word_power: 'Word Power',
  daily_watch: 'Xem video', game_hub: 'Games', self_regulation: 'Mục tiêu', review_session: 'Ôn tập SRS',
  ai_story: 'AI Story', ai_pronunciation: 'Phát âm',
};

function bar(pct, width = 20) {
  const filled = Math.round((pct / 100) * width);
  return '█'.repeat(filled) + '░'.repeat(width - filled);
}

export function printProgressReport(detail, studentInfo) {
  if (!detail) return;

  const name = detail.student?.username || studentInfo?.student_name || 'Học sinh';
  const email = detail.student?.email || '';
  const week = detail.currentWeek || 1;
  const totalStars = detail.student?.total_stars || 0;
  const streak = detail.student?.streak_days || 0;
  const weeksCount = detail.weekProgress?.length || 0;
  const today = new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });

  // Station breakdown for current week
  const stations = detail.stationDetails || [];
  const strong = stations.filter(s => s.score >= 75).sort((a, b) => b.score - a.score).slice(0, 3);
  const weak   = stations.filter(s => s.score > 0 && s.score < 60).sort((a, b) => a.score - b.score).slice(0, 3);

  // Current week stats
  const completedStations = stations.filter(s => s.score > 0).length;
  const weekPct = Math.round((completedStations / 16) * 100);
  const avgScore = stations.length > 0
    ? Math.round(stations.reduce((a, s) => a + s.score, 0) / stations.length)
    : 0;
  const weekStars = stations.reduce((a, s) => a + (s.score >= 90 ? 3 : s.score >= 80 ? 2 : s.score >= 60 ? 1 : 0), 0);

  // All weeks studied (oldest first in report)
  const recentWeeks = [...(detail.weekProgress || [])].reverse();

  const html = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Báo cáo tiến độ — ${name}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      font-size: 13px;
      color: #1a1a2e;
      background: #fff;
      padding: 32px 40px;
      max-width: 780px;
      margin: 0 auto;
    }
    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 3px solid #4f46e5;
      padding-bottom: 14px;
      margin-bottom: 22px;
    }
    .logo { font-size: 22px; font-weight: 900; color: #4f46e5; letter-spacing: -0.5px; }
    .logo span { color: #f59e0b; }
    .report-title { font-size: 11px; color: #6b7280; text-align: right; line-height: 1.6; }
    h2 { font-size: 20px; color: #1a1a2e; }
    .section { margin-bottom: 22px; }
    .section-title {
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #6b7280;
      border-bottom: 1px solid #e5e7eb;
      padding-bottom: 5px;
      margin-bottom: 12px;
    }
    .stat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
    .stat-box {
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 10px;
      padding: 12px;
      text-align: center;
    }
    .stat-box .val { font-size: 26px; font-weight: 900; color: #4f46e5; line-height: 1; }
    .stat-box .lbl { font-size: 10px; color: #9ca3af; font-weight: 700; text-transform: uppercase; margin-top: 4px; }
    .station-row {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 6px;
    }
    .station-name { width: 110px; font-size: 12px; font-weight: 600; }
    .bar-wrap { flex: 1; background: #e5e7eb; border-radius: 4px; height: 16px; overflow: hidden; }
    .bar-fill { height: 100%; border-radius: 4px; display: flex; align-items: center; padding-right: 6px; justify-content: flex-end; }
    .bar-fill span { font-size: 10px; font-weight: 700; color: #fff; }
    .pct-label { width: 36px; text-align: right; font-size: 11px; font-weight: 700; }
    .week-table { width: 100%; border-collapse: collapse; font-size: 12px; }
    .week-table th {
      background: #f3f4f6;
      font-weight: 700;
      text-align: left;
      padding: 7px 10px;
      border-bottom: 2px solid #e5e7eb;
      font-size: 11px;
      text-transform: uppercase;
      color: #6b7280;
    }
    .week-table td { padding: 7px 10px; border-bottom: 1px solid #f3f4f6; }
    .week-table tr:last-child td { border-bottom: none; }
    .strong { color: #059669; font-weight: 700; }
    .warn   { color: #d97706; font-weight: 700; }
    .crit   { color: #dc2626; font-weight: 700; }
    footer {
      margin-top: 28px;
      padding-top: 12px;
      border-top: 1px solid #e5e7eb;
      font-size: 10px;
      color: #9ca3af;
      text-align: center;
    }
    @media print {
      body { padding: 20px 28px; }
      @page { margin: 14mm 12mm; size: A4; }
    }
  </style>
</head>
<body>
  <header>
    <div>
      <div class="logo">Eng<span>Quest</span></div>
      <h2>${name}</h2>
      <p style="color:#6b7280;font-size:12px;margin-top:2px;">${email}</p>
    </div>
    <div class="report-title">
      <strong>PROGRESS REPORT</strong><br>
      Date: ${today}<br>
      Current Week: Week ${week}
    </div>
  </header>

  <!-- Stats overview -->
  <div class="section">
    <div class="section-title">Tổng quan</div>
    <div class="stat-grid">
      <div class="stat-box">
        <div class="val">${week}</div><div class="lbl">Current Week</div>
      </div>
      <div class="stat-box">
        <div class="val">${totalStars}⭐</div><div class="lbl">Total Stars</div>
      </div>
      <div class="stat-box">
        <div class="val">${streak}🔥</div><div class="lbl">Day Streak</div>
      </div>
      <div class="stat-box">
        <div class="val">${weeksCount}</div><div class="lbl">Weeks Done</div>
      </div>
    </div>
  </div>

  <!-- Current week breakdown -->
  <div class="section">
    <div class="section-title">Tuần ${week} — Chi tiết từng hoạt động (${completedStations}/16 station, ${weekPct}%, ⭐${weekStars}/48)</div>
    ${stations.length === 0 ? '<p style="color:#9ca3af">Chưa có dữ liệu tuần này.</p>' : stations.map(s => {
      const pct = s.score;
      const color = pct >= 75 ? '#059669' : pct >= 50 ? '#d97706' : pct > 0 ? '#dc2626' : '#9ca3af';
      const label = STATION_LABELS_VI[s.station_type] || s.station_type;
      return `
      <div class="station-row">
        <div class="station-name">${label}</div>
        <div class="bar-wrap">
          <div class="bar-fill" style="width:${Math.max(pct,2)}%;background:${color}">
            ${pct > 15 ? `<span>${pct}%</span>` : ''}
          </div>
        </div>
        <div class="pct-label" style="color:${color}">${pct > 0 ? pct + '%' : '—'}</div>
      </div>`;
    }).join('')}
  </div>

  <!-- Strengths & weaknesses -->
  ${(strong.length > 0 || weak.length > 0) ? `
  <div class="section">
    <div class="section-title">Phân tích điểm mạnh / yếu (Tuần ${week})</div>
    ${strong.length > 0 ? `<p class="strong" style="margin-bottom:6px;">✅ Điểm mạnh: ${strong.map(s => `${STATION_LABELS_VI[s.station_type] || s.station_type} (${s.score}%)`).join(' · ')}</p>` : ''}
    ${weak.length > 0   ? `<p class="warn">⚠️ Cần cải thiện: ${weak.map(s => `${STATION_LABELS_VI[s.station_type] || s.station_type} (${s.score}%)`).join(' · ')}</p>` : ''}
  </div>` : ''}

  <!-- Weekly history -->
  ${recentWeeks.length > 0 ? `
  <div class="section">
    <div class="section-title">Weekly History — All ${recentWeeks.length} week${recentWeeks.length !== 1 ? 's' : ''} studied</div>
    <table class="week-table">
      <thead>
        <tr>
          <th>Tuần</th>
          <th>Số station</th>
          <th>Điểm TB</th>
          <th>Sao</th>
          <th>Hoàn thành</th>
        </tr>
      </thead>
      <tbody>
        ${recentWeeks.map(w => {
          const avg = Math.round(w.avg_score || 0);
          const stars = Number(w.total_stars || 0);
          const cnt = Number(w.stations_completed || 0);
          const pct = Math.round((cnt / 16) * 100);
          const cls = pct >= 80 ? 'strong' : pct >= 50 ? 'warn' : 'crit';
          return `<tr>
            <td><strong>W${w.week_id}</strong></td>
            <td>${cnt}/16</td>
            <td>${avg}%</td>
            <td>⭐ ${stars}/48</td>
            <td class="${cls}">${pct}%</td>
          </tr>`;
        }).join('')}
      </tbody>
    </table>
  </div>` : ''}

  <footer>
    Auto-generated by EngQuest · engquest.vn · ${today}
  </footer>

  <script>window.onload = () => window.print();</script>
</body>
</html>`;

  const win = window.open('', '_blank', 'width=860,height=720');
  if (win) {
    win.document.write(html);
    win.document.close();
  }
}
