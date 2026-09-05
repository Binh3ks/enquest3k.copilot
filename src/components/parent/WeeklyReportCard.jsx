import React from 'react';
import { Trophy, Clock, TrendingUp, Star, Printer } from 'lucide-react';
import SkillRadarChart from './SkillRadarChart';

/**
 * WeeklyReportCard — Printable/shareable weekly progress summary.
 *
 * Props:
 *   report: {
 *     weekNumber, studentName, completionRate, timeSpent,
 *     skills: { listening, reading, writing, speaking },
 *     srsStats: { totalWords, masteredWords, needsReview },
 *     highlights: string[],
 *     areasToImprove: string[]
 *   }
 */

export default function WeeklyReportCard({ report }) {
  if (!report) return null;

  const {
    weekNumber = 33,
    studentName = 'Học sinh',
    completionRate = '0/15',
    timeSpent = '0m',
    skills = { listening: 0, reading: 0, writing: 0, speaking: 0 },
    srsStats = { totalWords: 0, masteredWords: 0, needsReview: 0 },
    highlights = [],
    areasToImprove = [],
  } = report;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="wrc-card">
      {/* Header */}
      <div className="wrc-header">
        <div>
          <h2 className="wrc-title">📊 Báo Cáo Tuần {weekNumber}</h2>
          <p className="wrc-subtitle">Học sinh: <strong>{studentName}</strong></p>
        </div>
        <button type="button" className="wrc-print-btn" onClick={handlePrint} title="In báo cáo">
          <Printer size={16} />
        </button>
      </div>

      {/* Stats row */}
      <div className="wrc-stats-row">
        <div className="wrc-stat">
          <Trophy size={18} className="wrc-stat-icon" />
          <div>
            <span className="wrc-stat-value">{completionRate}</span>
            <span className="wrc-stat-label">Quests</span>
          </div>
        </div>
        <div className="wrc-stat">
          <Clock size={18} className="wrc-stat-icon" />
          <div>
            <span className="wrc-stat-value">{timeSpent}</span>
            <span className="wrc-stat-label">Thời gian</span>
          </div>
        </div>
        <div className="wrc-stat">
          <Star size={18} className="wrc-stat-icon" />
          <div>
            <span className="wrc-stat-value">{srsStats.masteredWords}</span>
            <span className="wrc-stat-label">Từ thuộc</span>
          </div>
        </div>
      </div>

      {/* Radar Chart */}
      <div className="wrc-chart-section">
        <h3 className="wrc-section-title">4 Kỹ Năng</h3>
        <SkillRadarChart skills={skills} size={200} />
      </div>

      {/* SRS Stats */}
      <div className="wrc-srs-section">
        <h3 className="wrc-section-title">📚 Từ Vựng (SRS)</h3>
        <div className="wrc-srs-bar">
          <div className="wrc-srs-bar-bg">
            <div
              className="wrc-srs-bar-fill"
              style={{ width: `${srsStats.totalWords > 0 ? (srsStats.masteredWords / srsStats.totalWords) * 100 : 0}%` }}
            />
          </div>
          <span className="wrc-srs-label">
            {srsStats.masteredWords}/{srsStats.totalWords} thuộc lòng • {srsStats.needsReview} cần ôn
          </span>
        </div>
      </div>

      {/* Highlights */}
      {highlights.length > 0 && (
        <div className="wrc-highlights">
          <h3 className="wrc-section-title">🌟 Điểm nổi bật</h3>
          <ul className="wrc-list wrc-list-good">
            {highlights.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Areas to improve */}
      {areasToImprove.length > 0 && (
        <div className="wrc-improve">
          <h3 className="wrc-section-title">📝 Cần cải thiện</h3>
          <ul className="wrc-list wrc-list-improve">
            {areasToImprove.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
