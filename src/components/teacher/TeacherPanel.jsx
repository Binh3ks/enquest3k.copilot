import React, { useState, useEffect, useMemo } from 'react';
import {
  X, Users, Send, AlertCircle, Star, BarChart2, Grid,
  Activity, ChevronRight, CheckCircle, Clock, Flame,
  MessageSquare, TrendingUp, AlertTriangle, Zap, Eye,
  BookOpen, Mic, Target, Award, UserPlus, Trash2, KeyRound, ShieldCheck, FileText,
  Printer, Share2, Copy, Book, ChevronDown, ChevronUp, Lock,
  Search, Reply, ThumbsUp
} from 'lucide-react';
import { teacherAPI } from '../../services/api';
import { printProgressReport } from '../../utils/generateProgressReport';
import { useUserStore } from '../../stores/useUserStore';
import WarmUpQuizGenerator from './tools/WarmUpQuizGenerator';
import PeriodicQuizGenerator from './tools/PeriodicQuizGenerator';

// ─── Constants ─────────────────────────────────────────────────────────────

const STATION_LABELS = {
  skill_reading: 'Read', vocab_mastery: 'Vocab', game_word_match: 'WordMatch',
  grammar_lab: 'Grammar', production_mindmap: 'Mindmap', ask_ai: 'Ask AI',
  skill_dictation: 'Dictation', skill_shadowing: 'Shadow', video_challenge: 'Writing',
  explore: 'Explore', game_logic: 'Logic', game_word_power: 'WordPwr',
  daily_watch: 'Watch', game_hub: 'Games', self_regulation: 'Goals', review_session: 'SRS',
  ai_story: 'AI Story', ai_pronunciation: 'Pronun',
};

const STATION_KEYS = Object.keys(STATION_LABELS);

const QUICK_NUDGES = [
  { label: '👏 Keep it up!', text: 'Great work this week! Keep the momentum going!' },
  { label: '🔥 On a streak!', text: 'You\'re on a roll! Don\'t break your streak!' },
  { label: '📚 Review needed', text: 'You have vocab words due for review. Spend 5 minutes on SRS Review today!' },
  { label: '🎤 Use the mic!', text: 'Try the speaking activities — they help your pronunciation a lot!' },
  { label: '⚠️ Inactive alert', text: 'We miss you! Log in and complete at least one station today.' },
  { label: '🏆 Almost there!', text: 'You\'re so close to finishing this week. Push through!' },
];

// ─── Sub-components ─────────────────────────────────────────────────────────

function StatCard({ icon: Icon, label, value, color = 'indigo', sub }) {
  return (
    <div className={`bg-gray-800 rounded-xl p-4 border border-gray-700`}>
      <div className="flex items-center gap-2 mb-1">
        <Icon size={16} className={`text-${color}-400`} />
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{label}</span>
      </div>
      <p className={`text-3xl font-black text-${color}-300`}>{value}</p>
      {sub && <p className="text-xs text-gray-500 mt-0.5">{sub}</p>}
    </div>
  );
}

function AlertBadge({ level }) {
  if (level === 'critical') return <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 text-[10px] font-black">⚠ INACTIVE 7d+</span>;
  if (level === 'warning')  return <span className="px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-300 text-[10px] font-black">⏱ Slow</span>;
  if (level === 'srs')      return <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-black">📚 SRS due</span>;
  return <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-300 text-[10px] font-black">✓ Active</span>;
}

// Level Badge: đánh giá tự động trình độ/tiến độ HS
// ⚠ Cần hỗ trợ: inactive 7d+ hoặc total_stars < 5
// ⭐ Vượt trội:  stars >= 30 và current_week >= 5
// ✓ Đạt chuẩn:  còn lại
function getLevelBadge(student) {
  const inactive = student.days_inactive || 0;
  const stars = student.total_stars || 0;
  const week = student.current_week || 1;
  if (inactive >= 7 || stars < 5)  return { label: '⚠ Needs Support', cls: 'bg-red-500/20 text-red-300' };
  if (stars >= 30 && week >= 5)    return { label: '⭐ Excelling',     cls: 'bg-yellow-500/20 text-yellow-300' };
  return                                  { label: '✓ On Track',      cls: 'bg-green-500/20 text-green-300' };
}

function LevelBadge({ student }) {
  const { label, cls } = getLevelBadge(student);
  return <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${cls}`}>{label}</span>;
}

// ─── Tab: Hôm Nay (Today Board) ──────────────────────────────────────────────

const WEEK_TITLES = {
  1:'Hello, World!', 2:'My Family Squad', 3:'The Mirror Game', 4:'My Happy Jar',
  5:'The Mystery House', 6:'Treasure Hunt', 7:'Inside My Backpack', 8:'At the Market',
  9:'City Sounds', 10:'The Farm Adventure', 11:'Weekend Fun Spots', 12:'Food & Drinks',
  13:'Daily Routines', 14:'Welcome to My World', 15:'The Busy Park', 16:'Weather & Seasons',
  17:'My Favourite Things', 18:'Sports & Hobbies', 19:'A Day at School', 20:'Animals',
  21:'Transport', 22:'Health & Body', 23:'Jobs & Work', 24:'Feelings', 25:'Travel',
  26:'Review & Checkpoint', 27:'Technology', 28:'Nature', 29:'Shopping', 30:'Celebrations',
};

function formatLastActive(lastActive) {
  if (!lastActive) return '—';
  const d = new Date(lastActive);
  const now = new Date();
  const diffMins = Math.floor((now - d) / 60000);
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return 'Yesterday';
  return `${diffDays}d ago`;
}

function getPct(s) {
  return Math.min(100, Math.max(0, Number(s.current_week_completion_pct) || 0));
}

function getStatus(s) {
  const inactive = s.days_inactive || 0;
  const pct = getPct(s);
  if (inactive >= 4 || pct < 20) return 'red';
  if (inactive >= 2 || pct < 50) return 'yellow';
  return 'green';
}

function buildZaloNudge(s) {
  const topic = WEEK_TITLES[s.current_week] || `Week ${s.current_week}`;
  const pct = getPct(s);
  if ((s.days_inactive || 0) >= 4) {
    return `📚 Reminder: ${s.student_name} hasn't logged into EngQuest for ${s.days_inactive} days! Week ${s.current_week} — "${topic}" needs to be completed before class.`;
  }
  return `📊 EngQuest: ${s.student_name} has completed ${pct}% of Week ${s.current_week} — "${topic}". Aim for 80% before the next class! 💪`;
}

function ProgressBar({ pct, status }) {
  const color = status === 'green' ? 'bg-green-500' : status === 'yellow' ? 'bg-yellow-500' : 'bg-red-500';
  const bg = status === 'green' ? 'bg-green-900/20' : status === 'yellow' ? 'bg-yellow-900/20' : 'bg-red-900/20';
  return (
    <div className={`h-2 w-full rounded-full ${bg} overflow-hidden`}>
      <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${Math.max(2, pct)}%` }} />
    </div>
  );
}

function WeekDots({ days }) {
  if (!days || !Array.isArray(days)) return null;
  return (
    <div className="flex gap-0.5">
      {days.map((active, i) => (
        <div key={i} className={`w-2 h-2 rounded-full ${active ? 'bg-indigo-400' : 'bg-gray-700'}`} title={`${6-i}d ago`} />
      ))}
    </div>
  );
}

function TabTodayBoard({ students, onSelectStudent }) {
  const [copied, setCopied] = useState(null);

  const copyText = (text, key) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const red    = students.filter(s => getStatus(s) === 'red');
  const yellow = students.filter(s => getStatus(s) === 'yellow');
  const green  = students.filter(s => getStatus(s) === 'green');
  const sorted = [...red, ...yellow, ...green];

  // Dominant week for the class (most common current_week)
  const weekFreq = {};
  students.forEach(s => { weekFreq[s.current_week || 1] = (weekFreq[s.current_week || 1] || 0) + 1; });
  const classWeek = parseInt(Object.entries(weekFreq).sort((a,b) => b[1]-a[1])[0]?.[0] || 1);
  const classTitle = WEEK_TITLES[classWeek] || `Week ${classWeek}`;
  const avgPct = students.length ? Math.round(students.reduce((acc,x) => acc + getPct(x), 0) / students.length) : 0;

  const allRedNudges = red.map(s => buildZaloNudge(s)).join('\n\n');

  if (students.length === 0) return (
    <div className="flex flex-col items-center justify-center h-64 text-gray-500">
      <Users size={40} className="mb-3 opacity-20"/>
      <p className="font-bold">No students yet</p>
    </div>
  );

  return (
    <div className="p-5 space-y-4">
      {/* ── Header: class summary ── */}
      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Current Week</p>
            <p className="text-white font-black text-base mt-0.5">W{classWeek} — {classTitle}</p>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-500"/>
                <span className="text-xs text-green-400 font-bold">{green.length} on track</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-yellow-500"/>
                <span className="text-xs text-yellow-400 font-bold">{yellow.length} slow</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-500"/>
                <span className="text-xs text-red-400 font-bold">{red.length} need nudge</span>
              </div>
            </div>
          </div>
          <div className="text-right shrink-0">
            <p className="text-3xl font-black text-white">{avgPct}<span className="text-base text-gray-400">%</span></p>
            <p className="text-[10px] text-gray-400">class avg</p>
          </div>
        </div>
        {/* Class progress bar */}
        <div className="mt-3">
          <ProgressBar pct={avgPct} status={avgPct >= 70 ? 'green' : avgPct >= 40 ? 'yellow' : 'red'} />
        </div>
      </div>

      {/* ── Batch nudge for all red students ── */}
      {red.length > 0 && (
        <button
          onClick={() => copyText(allRedNudges, 'all')}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-red-900/30 hover:bg-red-900/50 border border-red-700/40 rounded-xl text-xs font-bold text-red-300 transition-colors"
        >
          <Copy size={13}/>
          {copied === 'all' ? '✓ Copied!' : `Copy reminder — ${red.length} at-risk students (Zalo)`}
        </button>
      )}

      {/* ── Student rows ── */}
      <div className="space-y-2">
        {sorted.map(s => {
          const status = getStatus(s);
          const pct = getPct(s);
          const nudgeText = buildZaloNudge(s);
          const rowKey = s.student_id;

          const borderColor = status === 'green' ? 'border-green-700/30 hover:border-green-500/50'
            : status === 'yellow' ? 'border-yellow-700/30 hover:border-yellow-500/50'
            : 'border-red-700/30 hover:border-red-500/50';

          const dotColor = status === 'green' ? 'bg-green-500' : status === 'yellow' ? 'bg-yellow-400' : 'bg-red-500';

          return (
            <div key={rowKey} className={`bg-gray-800/70 border ${borderColor} rounded-xl px-4 py-3 transition-all`}>
              <div className="flex items-center gap-3">
                {/* Status dot */}
                <div className={`w-3 h-3 rounded-full shrink-0 ${dotColor}`} />

                {/* Avatar */}
                {s.avatar_url && <img src={s.avatar_url} className="w-8 h-8 rounded-full shrink-0" alt=""/>}

                {/* Name + meta */}
                <button className="flex-1 min-w-0 text-left" onClick={() => onSelectStudent(s)}>
                  <p className="font-bold text-white text-sm truncate">{s.student_name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-gray-400">{formatLastActive(s.last_active)}</span>
                    <WeekDots days={s.activity_last_7_days} />
                  </div>
                </button>

                {/* Week + pct */}
                <div className="text-right shrink-0 min-w-[52px]">
                  <p className="text-xs font-black text-gray-300">W{s.current_week || 1}</p>
                  <p className={`text-sm font-black ${status === 'green' ? 'text-green-400' : status === 'yellow' ? 'text-yellow-400' : 'text-red-400'}`}>{pct}%</p>
                </div>

                {/* Nudge copy button (only for red/yellow) */}
                {status !== 'green' && (
                  <button
                    onClick={() => copyText(nudgeText, rowKey)}
                    title="Copy Zalo reminder"
                    className="shrink-0 p-2 rounded-lg bg-gray-700 hover:bg-indigo-700 text-gray-400 hover:text-white transition-colors"
                  >
                    {copied === rowKey ? <CheckCircle size={14} className="text-green-400"/> : <Copy size={14}/>}
                  </button>
                )}
              </div>

              {/* Progress bar */}
              <div className="mt-2.5">
                <ProgressBar pct={pct} status={status} />
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Footer: refresh hint ── */}
      <p className="text-center text-[10px] text-gray-600">Auto-refreshes every 60s while panel is open</p>
    </div>
  );
}

// ─── Tab: Class Overview ─────────────────────────────────────────────────────

// ─── Build a Zalo-style report from students[] (overview data, no detail API call) ──
function buildBulkZaloReport(students) {
  const today = new Date().toLocaleDateString('en-GB');
  return students.map(s => {
    const name = s.student_name || 'Student';
    const week = s.current_week || 1;
    const pct  = s.current_week_completion_pct || 0;
    const stars = s.total_stars || 0;
    const streak = s.streak_days || 0;
    const inactive = s.days_inactive || 0;

    const stationMap = s.station_scores || {};
    const stationEntries = Object.entries(stationMap).filter(([,v]) => v != null);
    const strong = stationEntries.filter(([,v]) => v >= 75).sort((a,b) => b[1]-a[1]).slice(0,2);
    const weak   = stationEntries.filter(([,v]) => v > 0 && v < 60).sort((a,b) => a[1]-b[1]).slice(0,2);

    const strongStr = strong.length > 0
      ? `📈 Strong: ${strong.map(([k,v]) => `${STATION_LABELS[k]||k} (${v}%)`).join(', ')}`
      : '';
    const weakStr = weak.length > 0
      ? `⚠️ Needs improvement: ${weak.map(([k,v]) => `${STATION_LABELS[k]||k} (${v}%)`).join(', ')}`
      : '';

    let comment;
    if (inactive >= 7) comment = `${name} hasn't logged in this week. Please remind them to study! 📱`;
    else if (pct >= 80) comment = `${name} is doing excellent this week — great dedication! 🌟`;
    else if (pct >= 40) comment = `${name} is making steady progress. Encourage 20 mins/day at home! 💪`;
    else comment = `${name} is just getting started this week — please check in with them. 📚`;

    const lines = [
      `📊 WEEKLY REPORT — W${week}`,
      `👤 ${name} · ${today}`,
      `✅ Completed: ${pct}% this week`,
      `⭐ Total stars: ${stars}`,
      streak > 0 ? `🔥 Streak: ${streak} days` : `⚡ No streak yet — log in daily!`,
      strongStr || null,
      weakStr || null,
      ``,
      `💬 ${comment}`,
      `— EngQuest · engquest.vn`,
    ];
    return lines.filter(l => l !== null).join('\n');
  }).join('\n\n' + '─'.repeat(36) + '\n\n');
}

function TabClassOverview({ students }) {
  const atRisk = students.filter(s => (s.days_inactive || 0) >= 3);
  const active  = students.filter(s => (s.days_inactive || 0) < 3);
  const avgWeek = students.length
    ? (students.reduce((a, s) => a + (s.current_week || 1), 0) / students.length).toFixed(1)
    : 0;

  const [selectedIds, setSelectedIds]     = useState(() => new Set());
  const [showBulkReport, setShowBulkReport] = useState(false);
  const [bulkCopied, setBulkCopied]       = useState(false);

  const toggleSelect = (id) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };
  const selectAll   = () => setSelectedIds(new Set(students.map(s => s.student_id)));
  const clearAll    = () => setSelectedIds(new Set());

  const selectedStudents = students.filter(s => selectedIds.has(s.student_id));
  const bulkText = showBulkReport && selectedStudents.length > 0
    ? buildBulkZaloReport(selectedStudents) : '';

  // Simple 7-day activity grid: each student has activity_last_7_days: [bool×7]
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="p-6 space-y-6">
      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon={Users}        label="Students"     value={students.length}     color="indigo" />
        <StatCard icon={TrendingUp}   label="Avg. Week"    value={`W${avgWeek}`}        color="green" />
        <StatCard icon={AlertTriangle}label="At-Risk"      value={atRisk.length}        color="red"   sub="inactive 3d+" />
        <StatCard icon={Flame}        label="Active (<3d)" value={active.length}         color="amber" sub={active.length > 0 ? active.slice(0,3).map(s=>(s.student_name||'').split(' ').pop()).join(', ')+(active.length>3?` +${active.length-3}`:'') : undefined} />
      </div>

      {/* At-Risk Panel */}
      {atRisk.length > 0 && (
        <div className="bg-red-900/20 border border-red-700/40 rounded-xl p-4">
          <h4 className="text-sm font-black text-red-300 flex items-center gap-2 mb-3">
            <AlertTriangle size={16}/> At-Risk Students — Need Attention
          </h4>
          <div className="space-y-2">
            {atRisk.map(s => (
              <div key={s.student_id} className="flex items-center justify-between bg-gray-800/60 rounded-lg px-4 py-2">
                <div className="flex items-center gap-3">
                  {s.avatar_url && <img src={s.avatar_url} className="w-7 h-7 rounded-full" alt=""/>}
                  <div>
                    <p className="text-sm font-bold text-white">{s.student_name}</p>
                    <p className="text-[10px] text-gray-400">Week {s.current_week || 1} · Stars ⭐{s.total_stars || 0}</p>
                  </div>
                </div>
                <AlertBadge level={(s.days_inactive || 0) >= 7 ? 'critical' : 'warning'} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7-day Activity Heatmap */}
      <div className="bg-gray-800 rounded-xl p-5">
        <h4 className="text-sm font-black text-white flex items-center gap-2 mb-4">
          <Activity size={16} className="text-indigo-400"/> Class Activity — Last 7 Days
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr>
                <th className="text-left text-gray-500 font-bold pb-2 pr-4 w-28">Student</th>
                {days.map(d => (
                  <th key={d} className="text-center text-gray-500 font-bold pb-2 px-1">{d}</th>
                ))}
                <th className="text-right text-gray-500 font-bold pb-2 pl-3">Streak</th>
              </tr>
            </thead>
            <tbody className="space-y-1">
              {students.map(s => {
                const activity = s.activity_last_7_days || Array(7).fill(false);
                const streak = s.streak_days || 0;
                return (
                  <tr key={s.student_id}>
                    <td className="text-white font-bold pr-4 py-1 truncate max-w-[7rem]">{s.student_name}</td>
                    {activity.map((active, i) => (
                      <td key={i} className="text-center py-1 px-1">
                        <span className={`inline-block w-6 h-6 rounded-md ${active ? 'bg-green-500' : 'bg-gray-700'}`}/>
                      </td>
                    ))}
                    <td className="text-right text-amber-400 font-black pl-3">{streak > 0 ? `🔥${streak}` : '—'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Class rank by week */}
      <div className="bg-gray-800 rounded-xl p-5">
        <h4 className="text-sm font-black text-white flex items-center gap-2 mb-4">
          <Award size={16} className="text-yellow-400"/> Class Leaderboard
        </h4>
        <div className="space-y-1.5">
          {[...students]
            .sort((a, b) => (b.current_week || 1) - (a.current_week || 1) || (b.total_stars || 0) - (a.total_stars || 0))
            .map((s, i) => (
              <div key={s.student_id} className="flex items-center gap-3 bg-gray-700/50 rounded-lg px-3 py-2">
                <input
                  type="checkbox"
                  checked={selectedIds.has(s.student_id)}
                  onChange={() => toggleSelect(s.student_id)}
                  className="w-4 h-4 accent-indigo-500 cursor-pointer shrink-0"
                  title="Select for bulk report"
                />
                <span className={`w-6 text-sm font-black ${i === 0 ? 'text-yellow-400' : i === 1 ? 'text-gray-300' : i === 2 ? 'text-amber-600' : 'text-gray-500'}`}>
                  #{i + 1}
                </span>
                {s.avatar_url && <img src={s.avatar_url} className="w-7 h-7 rounded-full" alt=""/>}
                <span className="flex-1 text-sm font-bold text-white">{s.student_name}</span>
                <LevelBadge student={s} />
                <span className="text-xs text-indigo-300 font-bold">W{s.current_week || 1}</span>
                <span className="text-xs text-yellow-400 font-bold flex items-center gap-0.5">
                  <Star size={11} className="fill-current"/>  {s.total_stars || 0}
                </span>
              </div>
            ))}
        </div>
      </div>

      {/* Bulk Zalo Report */}
      <div className="bg-gray-800 rounded-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-black text-white flex items-center gap-2">
            <Share2 size={16} className="text-blue-400"/> Bulk Zalo Report
          </h4>
          <div className="flex items-center gap-2">
            <button onClick={selectAll} className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 transition-colors">Select All</button>
            <span className="text-gray-600">·</span>
            <button onClick={clearAll} className="text-[10px] font-bold text-gray-500 hover:text-gray-400 transition-colors">Clear</button>
            <span className="text-[10px] text-gray-500 ml-2">{selectedIds.size} selected</span>
          </div>
        </div>
        {selectedIds.size === 0 ? (
          <p className="text-xs text-gray-600 italic">Tick checkboxes in the leaderboard above to select students.</p>
        ) : (
          <div className="space-y-2">
            <button
              onClick={() => { setShowBulkReport(true); setBulkCopied(false); }}
              className="flex items-center gap-1.5 px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white text-xs font-black rounded-lg transition-all"
            >
              <Share2 size={12}/> Generate {selectedIds.size} Report{selectedIds.size !== 1 ? 's' : ''}
            </button>
            {showBulkReport && bulkText && (
              <div className="mt-2 space-y-2">
                <textarea
                  readOnly
                  value={bulkText}
                  rows={12}
                  className="w-full bg-gray-900 border border-gray-600 text-gray-200 text-xs font-mono rounded-lg p-3 resize-y focus:outline-none"
                />
                <button
                  onClick={() => { navigator.clipboard.writeText(bulkText).then(() => { setBulkCopied(true); setTimeout(() => setBulkCopied(false), 3000); }); }}
                  className={`flex items-center gap-1.5 px-4 py-2 text-xs font-black rounded-lg transition-all ${bulkCopied ? 'bg-green-700 text-green-200' : 'bg-gray-700 hover:bg-gray-600 text-white'}`}
                >
                  {bulkCopied ? '✓ Copied!' : '📋 Copy All to Clipboard'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Tab: Station Mastery Grid ───────────────────────────────────────────────

function TabMasteryGrid({ students, onSelectStudent }) {
  // Colour cell by completion ratio
  const cellColor = (ratio) => {
    if (ratio === null || ratio === undefined) return 'bg-gray-700 text-gray-600';
    if (ratio >= 0.9) return 'bg-green-600/80 text-white';
    if (ratio >= 0.6) return 'bg-yellow-600/80 text-white';
    if (ratio >= 0.1) return 'bg-red-700/60 text-red-200';
    return 'bg-gray-700 text-gray-500';
  };

  const cellLabel = (ratio) => {
    if (ratio === null || ratio === undefined) return '—';
    return `${Math.round(ratio * 100)}`;
  };

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h4 className="text-sm font-black text-white flex items-center gap-2">
            <Grid size={16} className="text-indigo-400"/> Station Mastery Grid
          </h4>
          <p className="text-[10px] text-gray-500 mt-0.5">Best score ever per station (all weeks)</p>
        </div>
        <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400">
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-600 inline-block"/> ≥90%</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-yellow-600 inline-block"/> 60–89%</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-700 inline-block"/> &lt;60%</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-gray-700 inline-block"/> Not done</span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="text-[10px]">
          <thead>
            <tr>
              <th className="text-left text-gray-400 font-bold py-2 pr-3 sticky left-0 bg-gray-900 z-10 w-28">Student</th>
              {STATION_KEYS.map(k => (
                <th key={k} className="text-center text-gray-400 font-bold py-2 px-1 w-10">
                  <span style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)', display: 'inline-block' }}>
                    {STATION_LABELS[k]}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.map(s => {
              const stationMap = s.station_scores || {};
              return (
                <tr key={s.student_id} className="hover:bg-gray-800/40 cursor-pointer" onClick={() => onSelectStudent(s)}>
                  <td className="text-white font-bold pr-3 py-1 sticky left-0 bg-gray-900 truncate max-w-[7rem]">
                    {s.student_name}
                  </td>
                  {STATION_KEYS.map(k => {
                    const ratio = stationMap[k] != null ? stationMap[k] / 100 : null;
                    return (
                      <td key={k} className="text-center py-1 px-0.5">
                        <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-[9px] font-black ${cellColor(ratio)}`}>
                          {cellLabel(ratio)}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Class-wide weak spots */}
      <div className="mt-6 bg-gray-800 rounded-xl p-4">
        <h5 className="text-xs font-black text-white mb-3 flex items-center gap-2">
          <Zap size={14} className="text-yellow-400"/> Class-Wide Weak Spots
        </h5>
        <div className="flex flex-wrap gap-2">
          {STATION_KEYS.map(k => {
            const scores = students.map(s => (s.station_scores || {})[k]).filter(v => v != null);
            if (scores.length === 0) return null;
            const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
            if (avg >= 70) return null;
            return (
              <span key={k} className="px-2 py-1 bg-red-900/30 border border-red-700/40 rounded-lg text-red-300 text-[10px] font-bold">
                {STATION_LABELS[k]} — avg {Math.round(avg)}%
              </span>
            );
          })}
        </div>
        {students.every(s => STATION_KEYS.every(k => ((s.station_scores || {})[k] ?? 100) >= 70)) && (
          <p className="text-xs text-green-400 font-bold">🎉 No class-wide weak spots — great work!</p>
        )}
      </div>
    </div>
  );
}

// ─── Tab: Student Detail ─────────────────────────────────────────────────────

function TabStudentDetail({ students, teacherAPI: api, initialStudent }) {
  const [selectedId, setSelectedId]     = useState(initialStudent?.student_id || null);
  const [detail, setDetail]             = useState(null);
  const [loading, setLoading]           = useState(false);
  const [message, setMessage]           = useState('');
  const [messageSent, setMessageSent]   = useState(false);
  const [assignWeek, setAssignWeek]     = useState('');
  const [privateNotes, setPrivateNotes] = useState('');
  const [notesSaved, setNotesSaved]     = useState(false);
  const [taskAssignments, setTaskAssignments] = useState([]);
  const [assignType, setAssignType]           = useState('week_override');
  const [assignTgtWeek, setAssignTgtWeek]     = useState('');
  const [assignStation, setAssignStation]     = useState('');
  const [assignDeadline, setAssignDeadline]   = useState('');
  const [assignSaved, setAssignSaved]         = useState(false);
  const [showZalo, setShowZalo]               = useState(false);
  const [zaloCopied, setZaloCopied]           = useState(false);
  const [parentPhone, setParentPhone]         = useState('');
  const [sessionNotes, setSessionNotes]       = useState([]);
  const [noteWeek, setNoteWeek]               = useState('');
  const [noteSession, setNoteSession]         = useState('0');
  const [noteText, setNoteText]               = useState('');
  const [noteSaving, setNoteSaving]           = useState(false);
  const [assessmentHistory, setAssessmentHistory] = useState([]);

  const selectedStudent = students.find(s => s.student_id === selectedId);

  // ── Build Zalo report text from available data ──────────────────────────
  const buildZaloReport = () => {
    if (!detail) return '';
    const name = detail.student?.username || selectedStudent?.student_name || 'Student';
    const week = detail.currentWeek || 1;
    const stations = detail.stationDetails || [];
    const completed = stations.filter(s => s.score > 0).length;
    const pct = Math.round((completed / 16) * 100);
    const weekStars = stations.reduce((a, s) => a + (s.score >= 90 ? 3 : s.score >= 80 ? 2 : s.score >= 60 ? 1 : 0), 0);
    const streak = detail.student?.streak_days || 0;

    const strong = stations.filter(s => s.score >= 75).sort((a, b) => b.score - a.score).slice(0, 2);
    const weak   = stations.filter(s => s.score > 0 && s.score < 60).sort((a, b) => a.score - b.score).slice(0, 2);

    const strongStr = strong.length > 0
      ? `📈 Strong: ${strong.map(s => `${STATION_LABELS[s.station_type] || s.station_type} (${s.score}%)`).join(', ')}`
      : '';
    const weakStr = weak.length > 0
      ? `⚠️ Needs improvement: ${weak.map(s => `${STATION_LABELS[s.station_type] || s.station_type} (${s.score}%)`).join(', ')}`
      : '';

    let comment;
    const avgScore = stations.length > 0 ? stations.reduce((a, s) => a + s.score, 0) / stations.length : 0;
    if (avgScore >= 80) comment = `${name} is doing excellent this week! Keep it up! 🌟`;
    else if (avgScore >= 55) comment = `${name} is making steady progress. ${weak.length > 0 ? `Focus more on ${STATION_LABELS[weak[0].station_type] || weak[0].station_type}!` : 'Try to complete all activities!'}`;
    else if (completed === 0) comment = `${name} hasn't studied this week. Please log in and study today! 📱`;
    else comment = `${name} needs more practice at home. Just 20 minutes a day is enough! 💪`;

    const lines = [
      `📊 WEEKLY LEARNING REPORT — WEEK ${week}`,
      `👤 Student: ${name}`,
      `📅 Date: ${new Date().toLocaleDateString('en-GB')}`,
      '',
      `✅ Completed: ${completed}/16 activities (${pct}%)`,
      `⭐ Stars this week: ${weekStars}/48`,
      streak > 0 ? `🔥 Streak: ${streak} days` : null,
      strongStr || null,
      weakStr || null,
      '',
      `💬 Teacher comment:`,
      comment,
      '',
      `— Sent from EngQuest · engquest.vn`,
    ];

    return lines.filter(l => l !== null).join('\n');
  };

  useEffect(() => {
    if (initialStudent?.student_id) {
      setSelectedId(initialStudent.student_id);
    }
  }, [initialStudent]);

  useEffect(() => {
    if (!selectedId) return;
    setLoading(true);
    setDetail(null);
    setPrivateNotes('');
    setParentPhone(localStorage.getItem(`parentPhone_${selectedId}`) || '');
    api.getStudentDetail(selectedId)
      .then(r => {
        setDetail(r.data);
        setPrivateNotes(r.data?.student?.private_notes || '');
      })
      .catch(e => console.error('Detail load failed', e))
      .finally(() => setLoading(false));
  }, [selectedId]);

  useEffect(() => {
    if (!selectedId) { setTaskAssignments([]); return; }
    api.getTaskAssignments(selectedId)
      .then(r => setTaskAssignments(r.data || []))
      .catch(() => setTaskAssignments([]));
  }, [selectedId]);

  useEffect(() => {
    if (!selectedId) { setSessionNotes([]); return; }
    api.getSessionNotes(selectedId)
      .then(r => setSessionNotes(r.data || []))
      .catch(() => setSessionNotes([]));
  }, [selectedId]);

  useEffect(() => {
    if (!selectedId) { setAssessmentHistory([]); return; }
    import('../../services/api').then(({ assessmentAPI }) => {
      assessmentAPI.getStudentHistory(selectedId)
        .then(r => setAssessmentHistory(r.data || []))
        .catch(() => setAssessmentHistory([]));
    });
  }, [selectedId]);

  const handleSend = async (text) => {
    if (!text.trim() || !selectedId) return;
    try {
      await api.sendMessage(selectedId, text, 'Message from Teacher');
      setMessage('');
      setMessageSent(true);
      setTimeout(() => setMessageSent(false), 3000);
    } catch (e) {
      alert('Failed to send message');
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedId) return;
    try {
      await api.savePrivateNotes(selectedId, privateNotes);
      setNotesSaved(true);
      setTimeout(() => setNotesSaved(false), 2500);
    } catch (e) {
      alert('Failed to save notes');
    }
  };

  const handleSaveAssignment = async () => {
    if (!selectedId) return;
    try {
      await api.setTaskAssignment(selectedId, assignType, {
        weekNum: assignTgtWeek ? parseInt(assignTgtWeek) : undefined,
        stationKey: assignStation || undefined,
        deadline: assignDeadline || undefined,
      });
      const r = await api.getTaskAssignments(selectedId);
      setTaskAssignments(r.data || []);
      setAssignSaved(true);
      setTimeout(() => setAssignSaved(false), 2500);
    } catch (e) {
      alert('Failed to save assignment');
    }
  };

  const handleDeleteAssignment = async (id) => {
    try {
      await api.deleteTaskAssignment(id);
      setTaskAssignments(prev => prev.filter(a => a.id !== id));
    } catch (e) {
      alert('Failed to remove assignment');
    }
  };

  const handleSaveNote = async () => {
    if (!selectedId || !noteWeek || !noteText.trim()) return;
    setNoteSaving(true);
    try {
      await api.saveSessionNote(selectedId, parseInt(noteWeek), parseInt(noteSession), noteText.trim());
      const r = await api.getSessionNotes(selectedId);
      setSessionNotes(r.data || []);
      setNoteText('');
    } catch (e) {
      alert('Failed to save note');
    } finally {
      setNoteSaving(false);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await api.deleteSessionNote(id);
      setSessionNotes(prev => prev.filter(n => n.id !== id));
    } catch (e) {
      alert('Failed to delete note');
    }
  };

  return (
    <div className="relative flex h-full overflow-hidden">
      {/* Left: student picker */}
      <div className="w-56 bg-gray-800 border-r border-gray-700 overflow-y-auto shrink-0">
        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-4 pt-4 pb-2">Students</p>
        {students.map(s => {
          const inactive = s.days_inactive || 0;
          return (
            <button
              key={s.student_id}
              onClick={() => setSelectedId(s.student_id)}
              className={`w-full text-left px-4 py-3 flex items-center gap-2 transition-all ${selectedId === s.student_id ? 'bg-indigo-600' : 'hover:bg-gray-700'}`}
            >
              {s.avatar_url && <img src={s.avatar_url} className="w-8 h-8 rounded-full shrink-0" alt=""/>}
              <div className="min-w-0">
                <p className="text-sm font-bold text-white truncate">{s.student_name}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="text-[9px] text-gray-400">W{s.current_week || 1}</span>
                  {inactive >= 3 && <span className="text-[9px] text-red-400">• inactive {inactive}d</span>}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Right: detail pane */}
      <div className="flex-1 overflow-y-auto p-6 space-y-5">
        {!selectedId && (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <Eye size={48} className="mb-3 opacity-20"/>
            <p className="font-bold">Select a student</p>
          </div>
        )}
        {selectedId && loading && (
          <div className="flex items-center justify-center h-64 text-gray-400">
            <p className="font-bold animate-pulse">Loading…</p>
          </div>
        )}
        {selectedId && !loading && detail && (
          <>
            {/* Header */}
            <div className="bg-gray-800 rounded-xl p-5 flex items-center gap-4">
              {detail.student.avatar_url && (
                <img src={detail.student.avatar_url} className="w-16 h-16 rounded-full border-2 border-indigo-400" alt=""/>
              )}
              <div className="flex-1">
                <h3 className="text-xl font-black text-white">{detail.student.username}</h3>
                <p className="text-gray-400 text-sm">{detail.student.email}</p>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${detail.student.plan === 'premium' ? 'bg-yellow-500/20 text-yellow-300' : 'bg-gray-600 text-gray-300'}`}>
                    {(detail.student.plan || 'FREE').toUpperCase()}
                  </span>
                  <span className="text-xs text-gray-400">Week {detail.currentWeek}</span>
                  {(selectedStudent?.days_inactive || 0) >= 3 && (
                    <span className="text-xs text-red-400">⚠ Inactive {Math.round(selectedStudent.days_inactive || 0)}d</span>
                  )}
                  <LevelBadge student={selectedStudent || {}} />
                </div>
              </div>
              {/* Action buttons: Zalo report + Print */}
              <div className="flex flex-col gap-2 shrink-0">
                <button
                  onClick={() => { setShowZalo(true); setZaloCopied(false); }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-all"
                >
                  <Share2 size={13}/> Báo cáo Zalo
                </button>
                <button
                  onClick={() => printProgressReport(detail, selectedStudent)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-600 hover:bg-gray-500 text-white text-xs font-bold rounded-lg transition-all"
                >
                  <Printer size={13}/> In / PDF
                </button>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gray-800 rounded-xl p-3 text-center">
                <p className="text-2xl font-black text-yellow-400">{detail.student.total_stars || 0}</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase">Total Stars</p>
              </div>
              <div className="bg-gray-800 rounded-xl p-3 text-center">
                <p className="text-2xl font-black text-amber-400">{detail.student.streak_days || 0}🔥</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase">Streak</p>
              </div>
              <div className="bg-gray-800 rounded-xl p-3 text-center">
                <p className="text-2xl font-black text-indigo-300">W{detail.currentWeek}</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase">Current</p>
              </div>
            </div>

            {/* Weekly progress bars */}
            {detail.weekProgress?.length > 0 && (
              <div className="bg-gray-800 rounded-xl p-5">
                <h4 className="text-sm font-black text-white mb-3 flex items-center gap-2">
                  <BarChart2 size={15} className="text-indigo-400"/> Weekly Progress
                </h4>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {[...detail.weekProgress].reverse().map(week => {
                    const maxStars = 48;
                    const pct = Math.min(100, Math.round((week.total_stars / maxStars) * 100));
                    return (
                      <div key={week.week_id} className="flex items-center gap-3">
                        <span className="text-xs font-bold text-gray-400 w-10">W{week.week_id}</span>
                        <div className="flex-1 h-6 bg-gray-700 rounded-lg overflow-hidden">
                          <div
                            className={`h-full flex items-center justify-end pr-2 text-[10px] font-black text-white ${pct >= 80 ? 'bg-green-600' : pct >= 50 ? 'bg-indigo-600' : 'bg-red-700'}`}
                            style={{ width: `${Math.max(pct, 4)}%` }}
                          >
                            {pct > 15 && `${pct}%`}
                          </div>
                        </div>
                        <span className="text-[10px] text-yellow-400 font-bold w-14 text-right">⭐{week.total_stars}/{maxStars}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Current-week station breakdown */}
            {detail.stationDetails?.length > 0 && (
              <div className="bg-gray-800 rounded-xl p-5">
                <h4 className="text-sm font-black text-white mb-3 flex items-center gap-2">
                  <Target size={15} className="text-emerald-400"/> Station Breakdown — W{detail.currentWeek}
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {detail.stationDetails.map((st, i) => {
                    const stars = st.score >= 90 ? 3 : st.score >= 70 ? 2 : st.score >= 50 ? 1 : 0;
                    return (
                      <div key={i} className={`rounded-lg p-3 flex items-center justify-between ${st.score >= 70 ? 'bg-green-900/30 border border-green-700/30' : st.score > 0 ? 'bg-yellow-900/30 border border-yellow-700/30' : 'bg-gray-700/50'}`}>
                        <div>
                          <p className="text-xs font-bold text-white capitalize">{STATION_LABELS[st.station_type] || st.station_type?.replace(/_/g,' ')}</p>
                          <p className="text-[9px] text-gray-400">{st.attempts || 1} attempt{st.attempts !== 1 ? 's' : ''}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-base font-black text-white">{st.score}%</p>
                          <div className="flex gap-0.5">
                            {[1,2,3].map(n => <Star key={n} size={9} className={n<=stars?'text-yellow-400 fill-current':'text-gray-600'}/>)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quick Nudge */}
            <div className="bg-gray-800 rounded-xl p-5">
              <h4 className="text-sm font-black text-white mb-3 flex items-center gap-2">
                <Zap size={15} className="text-yellow-400"/> Quick Nudge
              </h4>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {QUICK_NUDGES.map((n, i) => (
                  <button
                    key={i}
                    onClick={() => setMessage(n.text)}
                    className="text-left text-[10px] font-bold bg-gray-700 hover:bg-indigo-700 text-gray-300 hover:text-white rounded-lg px-3 py-2 transition-all"
                  >
                    {n.label}
                  </button>
                ))}
              </div>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Or write a custom message..."
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-indigo-500 focus:outline-none min-h-[80px] resize-none text-sm"
              />
              <button
                onClick={() => handleSend(message)}
                disabled={!message.trim()}
                className="mt-2 w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all"
              >
                {messageSent
                  ? <><CheckCircle size={16}/> Sent!</>
                  : <><Send size={16}/> Send Message</>}
              </button>
            </div>

            {/* Private Notes (hidden from students) */}
            <div className="bg-gray-800 rounded-xl p-5">
              <h4 className="text-sm font-black text-white mb-3 flex items-center gap-2">
                <FileText size={15} className="text-slate-400"/> Private Notes
                <span className="text-[9px] font-normal text-gray-500 ml-1">(teacher only)</span>
              </h4>
              <textarea
                value={privateNotes}
                onChange={e => setPrivateNotes(e.target.value)}
                placeholder="Private notes: strengths, weaknesses, personal plan, reminders for next session..."
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-slate-400 focus:outline-none min-h-[90px] resize-none text-sm placeholder:text-gray-600"
              />
              <button
                onClick={handleSaveNotes}
                className="mt-2 w-full bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 rounded-lg flex items-center justify-center gap-2 transition-all text-sm"
              >
                {notesSaved
                  ? <><CheckCircle size={14}/> Saved!</>
                  : <><FileText size={14}/> Save Notes</>}
              </button>
            </div>

            {/* Giao bài / Lock lộ trình (T1-B) */}
            <div className="bg-gray-800 rounded-xl p-5">
              <h4 className="text-sm font-black text-white mb-3 flex items-center gap-2">
                <Target size={15} className="text-orange-400"/> Assign / Lock Schedule
              </h4>

              {/* Active assignments */}
              {taskAssignments.length > 0 && (
                <div className="space-y-2 mb-4">
                  {taskAssignments.map(a => (
                    <div key={a.id} className="flex items-center justify-between bg-gray-700/60 rounded-lg px-3 py-2">
                      <div>
                        <p className="text-xs font-bold text-orange-300 capitalize">{a.type.replace(/_/g, ' ')}</p>
                        <p className="text-[10px] text-gray-400">
                          {a.week_num && `W${a.week_num}`}
                          {a.station_key && ` · ${STATION_LABELS[a.station_key] || a.station_key}`}
                          {a.deadline && ` · due ${new Date(a.deadline).toLocaleDateString('en-GB')}`}
                        </p>
                      </div>
                      <button onClick={() => handleDeleteAssignment(a.id)} className="text-red-400 hover:text-red-300 p-1 rounded transition-colors">
                        <Trash2 size={13}/>
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* New assignment form */}
              <div className="space-y-2.5">
                <select
                  value={assignType}
                  onChange={e => setAssignType(e.target.value)}
                  className="w-full p-2.5 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-orange-400 focus:outline-none text-sm"
                >
                  <option value="week_override">Override week (assign specific week)</option>
                  <option value="week_lock">Lock week (prevent auto-advance)</option>
                  <option value="station_assign">Assign specific station</option>
                </select>

                {(assignType === 'week_override' || assignType === 'week_lock') && (
                  <select
                    value={assignTgtWeek}
                    onChange={e => setAssignTgtWeek(e.target.value)}
                    className="w-full p-2.5 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-orange-400 focus:outline-none text-sm"
                  >
                    <option value="">Select week...</option>
                    {Array.from({ length: 156 }, (_, i) => i + 1).map(w => (
                      <option key={w} value={w}>Week {w}</option>
                    ))}
                  </select>
                )}

                {assignType === 'station_assign' && (
                  <select
                    value={assignStation}
                    onChange={e => setAssignStation(e.target.value)}
                    className="w-full p-2.5 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-orange-400 focus:outline-none text-sm"
                  >
                    <option value="">Select station...</option>
                    {STATION_KEYS.map(k => (
                      <option key={k} value={k}>{STATION_LABELS[k]}</option>
                    ))}
                  </select>
                )}

                <input
                  type="date"
                  value={assignDeadline}
                  onChange={e => setAssignDeadline(e.target.value)}
                  className="w-full p-2.5 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-orange-400 focus:outline-none text-sm"
                />

                <button
                  onClick={handleSaveAssignment}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all text-sm"
                >
                  {assignSaved
                    ? <><CheckCircle size={14}/> Assigned!</>
                    : <><Target size={14}/> Assign</>}
                </button>
              </div>
            </div>

            {/* Assessment History (Sprint 2) */}
            {assessmentHistory.length > 0 && (
              <div className="bg-gray-800 rounded-xl p-5">
                <h4 className="text-sm font-black text-white mb-3 flex items-center gap-2">
                  <BarChart2 size={15} className="text-indigo-400"/> Mini Quiz Vocab
                </h4>
                <div className="space-y-2">
                  {assessmentHistory.map(h => {
                    const pct = h.total_pct || 0;
                    const barColor = pct >= 80 ? 'bg-green-500' : pct >= 50 ? 'bg-yellow-500' : 'bg-red-500';
                    const textColor = pct >= 80 ? 'text-green-400' : pct >= 50 ? 'text-yellow-400' : 'text-red-400';
                    return (
                      <div key={h.block} className="space-y-1">
                        <div className="flex justify-between text-[10px] font-bold text-gray-400">
                          <span>Mini Quiz #{h.block} · W{(h.block-1)*4+1}–{h.block*4}</span>
                          <span className={textColor}>{pct}% ({h.correct}/{h.total})</span>
                        </div>
                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${barColor}`} style={{ width: `${pct}%` }}/>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Session Notes (T4-A) */}
            <div className="bg-gray-800 rounded-xl p-5">
              <h4 className="text-sm font-black text-white mb-3 flex items-center gap-2">
                <BookOpen size={15} className="text-teal-400"/> Session Notes
              </h4>

              {/* Note history */}
              {sessionNotes.length > 0 && (
                <div className="space-y-1.5 mb-4 max-h-40 overflow-y-auto pr-1">
                  {sessionNotes.map(n => (
                    <div key={n.id} className="flex items-start justify-between gap-2 bg-gray-700/60 rounded-lg px-3 py-2">
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-bold text-teal-300 leading-none mb-0.5">
                          {new Date(n.created_at).toLocaleDateString('en-GB')}
                          {' · '}W{n.week_num}{n.session_num > 0 ? ` S${n.session_num}` : ''}
                        </p>
                        <p className="text-xs text-gray-300 leading-snug line-clamp-2">{n.note}</p>
                      </div>
                      <button onClick={() => handleDeleteNote(n.id)} className="text-gray-500 hover:text-red-400 p-0.5 rounded shrink-0 transition-colors mt-0.5">
                        <Trash2 size={12}/>
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* New note form */}
              <div className="space-y-2">
                <div className="flex gap-2">
                  <select
                    value={noteWeek}
                    onChange={e => setNoteWeek(e.target.value)}
                    className="flex-1 p-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-teal-400 focus:outline-none text-xs"
                  >
                    <option value="">Week...</option>
                    {Array.from({ length: 156 }, (_, i) => i + 1).map(w => (
                      <option key={w} value={w}>Week {w}</option>
                    ))}
                  </select>
                  <select
                    value={noteSession}
                    onChange={e => setNoteSession(e.target.value)}
                    className="flex-1 p-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-teal-400 focus:outline-none text-xs"
                  >
                    <option value="0">General</option>
                    <option value="1">Session 1</option>
                    <option value="2">Session 2</option>
                    <option value="3">Session 3</option>
                  </select>
                </div>
                <textarea
                  value={noteText}
                  onChange={e => setNoteText(e.target.value)}
                  placeholder="Notes: pronunciation /θ/ needs work, vocab strong, grammar weak, remind next session..."
                  className="w-full p-2.5 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-teal-400 focus:outline-none min-h-[70px] resize-none text-xs placeholder:text-gray-600"
                />
                <button
                  onClick={handleSaveNote}
                  disabled={noteSaving || !noteWeek || !noteText.trim()}
                  className="w-full bg-teal-700 hover:bg-teal-600 disabled:opacity-40 text-white font-bold py-2 rounded-lg flex items-center justify-center gap-2 transition-all text-sm"
                >
                  {noteSaving
                    ? <><Clock size={13}/> Saving...</>
                    : <><CheckCircle size={13}/> Save Note</>}
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Zalo Report Modal (T2-A) */}
      {showZalo && detail && (
        <div className="absolute inset-0 z-10 bg-black/70 flex items-center justify-center p-6">
          <div className="bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg border border-gray-700">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-700">
              <h4 className="font-black text-white flex items-center gap-2">
                <Share2 size={16} className="text-blue-400"/> Zalo Report
              </h4>
              <button onClick={() => setShowZalo(false)} className="text-gray-400 hover:text-white transition-colors">
                <X size={18}/>
              </button>
            </div>
            <div className="p-5">
              {/* Parent phone for Zalo direct */}
              <div className="mb-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider block mb-1">Parent Phone (for Zalo)</label>
                <div className="flex gap-2">
                  <input
                    type="tel"
                    value={parentPhone}
                    onChange={e => {
                      setParentPhone(e.target.value);
                      if (selectedId) localStorage.setItem(`parentPhone_${selectedId}`, e.target.value);
                    }}
                    placeholder="e.g. 0912345678"
                    className="flex-1 bg-gray-700 border border-gray-600 text-white text-sm rounded-lg px-3 py-1.5 focus:border-blue-400 focus:outline-none placeholder-gray-600"
                  />
                  {parentPhone && (
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(buildZaloReport()).then(() => {
                          setZaloCopied(true);
                          setTimeout(() => setZaloCopied(false), 3000);
                        });
                        const phone = parentPhone.replace(/^0/, '84').replace(/\D/g, '');
                        window.open(`https://zalo.me/${phone}`, '_blank');
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-all whitespace-nowrap"
                      title="Copy report then open Zalo chat"
                    >
                      📲 Open Zalo
                    </button>
                  )}
                </div>
                {parentPhone && <p className="text-[9px] text-gray-500 mt-1">Tap “Open Zalo” → copies report to clipboard + opens Zalo chat with this number.</p>}
              </div>
              <textarea
                readOnly
                value={buildZaloReport()}
                className="w-full h-64 p-3 bg-gray-800 text-white rounded-lg border border-gray-600 text-sm font-mono resize-none focus:outline-none"
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(buildZaloReport()).then(() => {
                    setZaloCopied(true);
                    setTimeout(() => setZaloCopied(false), 3000);
                  });
                }}
                className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all"
              >
                {zaloCopied
                  ? <><CheckCircle size={15}/> Copied! 📱</>
                  : <><Copy size={15}/> Copy to clipboard</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Tab: Messages ────────────────────────────────────────────────────────────

function TabMessages({ students, teacherAPI: api }) {
  const [inbox, setInbox]           = useState([]);
  const [loading, setLoading]       = useState(false);
  const [replyTo, setReplyTo]       = useState(null);
  const [replyText, setReplyText]   = useState('');
  const [replySending, setReplySending] = useState(false);
  const [composing, setComposing]   = useState(false);
  const [composeTo, setComposeTo]   = useState('');
  const [composeText, setComposeText] = useState('');
  const [composeSending, setComposeSending] = useState(false);
  const [composeSent, setComposeSent] = useState(false);

  const refresh = () => {
    setLoading(true);
    api.getInbox()
      .then(r => setInbox(r.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { refresh(); }, []); // eslint-disable-line

  const handleMarkRead = async (msg) => {
    if (msg.is_read) return;
    try {
      await api.markMessageRead(msg.id);
      setInbox(prev => prev.map(m => m.id === msg.id ? { ...m, is_read: true } : m));
    } catch { /* silent */ }
  };

  const handleReply = async () => {
    if (!replyText.trim() || !replyTo) return;
    setReplySending(true);
    try {
      await api.sendMessage(replyTo.from_user_id, replyText.trim(), `Re: ${replyTo.subject || 'Your message'}`);
      setReplyText('');
      setReplyTo(null);
    } catch {
      alert('Failed to send reply');
    } finally {
      setReplySending(false);
    }
  };

  const handleCompose = async () => {
    if (!composeTo || !composeText.trim()) return;
    setComposeSending(true);
    try {
      await api.sendMessage(parseInt(composeTo), composeText.trim(), 'Message from teacher');
      setComposeSent(true);
      setTimeout(() => { setComposing(false); setComposeSent(false); setComposeText(''); setComposeTo(''); }, 2000);
    } catch {
      alert('Failed to send message');
    } finally {
      setComposeSending(false);
    }
  };

  const unreadCount = inbox.filter(m => !m.is_read).length;

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-black text-white flex items-center gap-2">
          <MessageSquare size={16} className="text-indigo-400"/> Messages
          {unreadCount > 0 && (
            <span className="bg-indigo-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full">{unreadCount}</span>
          )}
        </h4>
        <div className="flex items-center gap-2">
          <button
            onClick={() => { setComposing(c => !c); setComposeSent(false); setComposeText(''); setComposeTo(''); }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition-all"
          >
            <Send size={11}/> New Message
          </button>
          <button onClick={refresh} className="text-xs text-gray-400 hover:text-white transition-colors">↻ Refresh</button>
        </div>
      </div>

      {/* Compose form */}
      {composing && (
        <div className="bg-gray-800 rounded-xl p-4 border border-indigo-500/40 space-y-3">
          <h5 className="text-xs font-black text-indigo-300 flex items-center gap-1.5"><Send size={12}/> New Message</h5>
          <select
            value={composeTo}
            onChange={e => setComposeTo(e.target.value)}
            className="w-full p-2.5 bg-gray-700 border border-gray-600 text-white rounded-lg text-sm focus:border-indigo-400 focus:outline-none"
          >
            <option value="">Select student...</option>
            {students.map(s => <option key={s.student_id} value={s.student_id}>{s.student_name}</option>)}
          </select>
          <textarea
            value={composeText}
            onChange={e => setComposeText(e.target.value)}
            placeholder="Write your message..."
            className="w-full p-2.5 bg-gray-700 border border-gray-600 text-white rounded-lg text-sm min-h-[80px] resize-none focus:border-indigo-400 focus:outline-none placeholder-gray-600"
          />
          <div className="flex gap-2">
            <button
              onClick={handleCompose}
              disabled={composeSending || !composeTo || !composeText.trim()}
              className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white text-xs font-bold rounded-lg transition-all"
            >
              {composeSent ? <><CheckCircle size={12}/> Sent!</> : composeSending ? 'Sending...' : <><Send size={12}/> Send</>}
            </button>
            <button onClick={() => setComposing(false)} className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 text-xs font-bold rounded-lg transition-all">Cancel</button>
          </div>
        </div>
      )}
      {loading && <p className="text-gray-400 text-sm animate-pulse">Loading messages…</p>}
      {!loading && inbox.length === 0 && (
        <div className="text-center py-16 text-gray-600">
          <MessageSquare size={40} className="mx-auto mb-3 opacity-30"/>
          <p className="font-bold">No messages yet</p>
        </div>
      )}
      <div className="space-y-2">
        {inbox.map((msg, i) => (
          <div key={i} className={`bg-gray-800 rounded-xl p-4 ${!msg.is_read ? 'border-l-4 border-indigo-500' : ''}`}>
            <div className="flex items-start gap-3">
              <MessageSquare size={16} className={msg.is_read ? 'text-gray-600 mt-0.5' : 'text-indigo-400 mt-0.5'} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <p className="text-sm font-bold text-white truncate">{msg.from_username || 'Student'}</p>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] text-gray-500">
                      {msg.created_at ? new Date(msg.created_at).toLocaleDateString() : ''}
                    </span>
                    {!msg.is_read && (
                      <button
                        onClick={() => handleMarkRead(msg)}
                        className="text-[10px] text-indigo-400 hover:text-indigo-200 font-bold transition-colors"
                        title="Mark as read"
                      >
                        ✓ Read
                      </button>
                    )}
                    {msg.from_user_id && (
                      <button
                        onClick={() => { setReplyTo(msg); setReplyText(''); handleMarkRead(msg); }}
                        className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-indigo-300 font-bold transition-colors"
                        title="Reply"
                      >
                        <Reply size={11}/> Reply
                      </button>
                    )}
                  </div>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">{msg.message}</p>
              </div>
            </div>
            {/* Inline reply box */}
            {replyTo?.id === msg.id && (
              <div className="mt-3 ml-7 space-y-2">
                <textarea
                  value={replyText}
                  onChange={e => setReplyText(e.target.value)}
                  placeholder={`Reply to ${msg.from_username || 'student'}…`}
                  className="w-full p-2.5 bg-gray-700 text-white rounded-lg border border-indigo-500/50 focus:border-indigo-400 focus:outline-none text-xs min-h-[60px] resize-none placeholder-gray-600"
                  autoFocus
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleReply}
                    disabled={replySending || !replyText.trim()}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white text-xs font-bold rounded-lg transition-all"
                  >
                    <Send size={11}/> {replySending ? 'Sending…' : 'Send'}
                  </button>
                  <button
                    onClick={() => setReplyTo(null)}
                    className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-gray-300 text-xs font-bold rounded-lg transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

// ─── Tab: Manage Teachers (for team_leader / center_director / admin) ─────────

const MANAGER_ROLES = ['team_leader', 'center_director', 'admin', 'super_admin'];

function TabManageTeachers({ onRefresh }) {
  const [teachers, setTeachers]         = useState([]);
  const [seatInfo, setSeatInfo]         = useState(null);
  const [loadingList, setLoadingList]   = useState(false);
  const [username, setUsername]         = useState('');
  const [password, setPassword]         = useState('');
  const [allocSeats, setAllocSeats]     = useState('');
  const [creating, setCreating]         = useState(false);
  const [error, setError]               = useState('');
  const [success, setSuccess]           = useState('');
  const [removing, setRemoving]         = useState({});
  const [showPwd, setShowPwd]           = useState(false);
  const [resetPwd, setResetPwd]         = useState({});
  const [resetting, setResetting]       = useState({});

  const refresh = () => {
    setLoadingList(true);
    Promise.all([teacherAPI.myTeachers(), teacherAPI.managerSeatInfo()])
      .then(([tr, si]) => { setTeachers(tr.data || []); setSeatInfo(si.data); })
      .catch(() => {})
      .finally(() => setLoadingList(false));
  };

  useEffect(() => { refresh(); }, []);

  const teachersUsed  = seatInfo?.teachers_used  ?? teachers.length;
  const teachersTotal = seatInfo?.teachers_total ?? 0;
  const full = teachersUsed >= teachersTotal;

  const handleCreate = async () => {
    setError(''); setSuccess('');
    if (!username.trim() || !password.trim()) { setError('Enter username and password.'); return; }
    setCreating(true);
    try {
      const seats = allocSeats ? parseInt(allocSeats) : undefined;
      const res = await teacherAPI.createTeacher(username.trim(), password.trim(), seats);
      setSuccess(`✓ Teacher "${res.data.teacher.username}" created · ${res.data.teachers_used}/${res.data.maxTeachers} slots used`);
      setUsername(''); setPassword(''); setAllocSeats('');
      refresh(); onRefresh?.();
    } catch (e) {
      setError(e.response?.data?.message || 'Failed to create teacher.');
    } finally {
      setCreating(false);
    }
  };

  const handleRemove = async (t) => {
    if (!window.confirm(`Remove teacher "${t.teacher_name}" from your team?\n(Account stays active, just removed from your list)`)) return;
    setRemoving(r => ({ ...r, [t.teacher_id]: true }));
    try {
      await teacherAPI.removeTeacher(t.teacher_id, false);
      refresh(); onRefresh?.();
    } catch (e) {
      alert(e.response?.data?.message || 'Failed to remove');
    } finally {
      setRemoving(r => ({ ...r, [t.teacher_id]: false }));
    }
  };

  const handleResetPassword = async (t) => {
    const newPwd = resetPwd[t.teacher_id];
    if (!newPwd || newPwd.length < 6) { alert('Password must be at least 6 characters'); return; }
    setResetting(r => ({ ...r, [t.teacher_id]: true }));
    try {
      await teacherAPI.resetTeacherPassword(t.teacher_id, newPwd);
      setResetPwd(p => ({ ...p, [t.teacher_id]: '' }));
      alert(`✓ Password reset for "${t.teacher_name}"`);
    } catch (e) {
      alert(e.response?.data?.message || 'Failed');
    } finally {
      setResetting(r => ({ ...r, [t.teacher_id]: false }));
    }
  };

  return (
    <div className="p-6 space-y-6 text-white">
      {/* Manager quota banner */}
      <div className={`flex items-center justify-between p-4 rounded-2xl border ${full ? 'bg-red-900/30 border-red-700' : 'bg-purple-900/40 border-purple-700'}`}>
        <div className="flex items-center gap-3">
          <ShieldCheck size={20} className={full ? 'text-red-400' : 'text-purple-400'} />
          <div>
            <p className="font-black text-sm">Teacher Slots</p>
            <p className="text-xs text-gray-400">{seatInfo?.role ? seatInfo.role.replace('_', ' ').toUpperCase() : 'Manager'} · {seatInfo?.plan || ''}</p>
          </div>
        </div>
        <div className="text-right">
          <p className={`text-3xl font-black ${full ? 'text-red-400' : 'text-purple-300'}`}>{teachersUsed}<span className="text-lg text-gray-500">/{teachersTotal}</span></p>
          {full && <p className="text-xs text-red-400 font-bold">Quota full — upgrade plan to add more</p>}
        </div>
        <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden ml-4">
          <div className={`h-full rounded-full transition-all ${full ? 'bg-red-500' : 'bg-purple-500'}`} style={{width: teachersTotal ? `${Math.min(100, teachersUsed/teachersTotal*100)}%` : '0%'}} />
        </div>
      </div>

      {/* Create teacher form */}
      <div className="bg-gray-800 rounded-2xl p-5 border border-gray-700">
        <h3 className="font-black text-sm mb-4 flex items-center gap-2"><UserPlus size={16} className="text-purple-400"/> Create new teacher account</h3>
        {error   && <p className="text-xs text-red-400 font-bold mb-3 bg-red-900/20 p-2 rounded-lg">{error}</p>}
        {success && <p className="text-xs text-green-400 font-bold mb-3 bg-green-900/20 p-2 rounded-lg">{success}</p>}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input
            value={username} onChange={e => setUsername(e.target.value)}
            placeholder="Username (e.g. ms_hoa)"
            className="bg-gray-900 border border-gray-600 rounded-xl px-4 py-3 text-sm font-bold text-white placeholder-gray-500 focus:border-purple-500 outline-none"
            disabled={full || creating}
          />
          <div className="relative">
            <input
              value={password} onChange={e => setPassword(e.target.value)}
              type={showPwd ? 'text' : 'password'}
              placeholder="Password (≥6 chars)"
              className="w-full bg-gray-900 border border-gray-600 rounded-xl px-4 py-3 text-sm font-bold text-white placeholder-gray-500 focus:border-purple-500 outline-none pr-12"
              disabled={full || creating}
              onKeyDown={e => e.key === 'Enter' && handleCreate()}
            />
            <button onClick={() => setShowPwd(s => !s)} className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-300"><Eye size={16}/></button>
          </div>
          <input
            value={allocSeats} onChange={e => setAllocSeats(e.target.value)}
            placeholder="Student seats (optional)"
            type="number" min="1" max="50"
            className="bg-gray-900 border border-gray-600 rounded-xl px-4 py-3 text-sm font-bold text-white placeholder-gray-500 focus:border-purple-500 outline-none"
            disabled={full || creating}
          />
          <button
            onClick={handleCreate}
            disabled={full || creating || !username.trim() || !password.trim()}
            className="bg-purple-600 hover:bg-purple-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-black text-sm rounded-xl py-3 flex items-center justify-center gap-2 transition-colors"
          >
            {creating ? '⏳ Creating…' : <><UserPlus size={15}/> Add Teacher</>}
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">Teacher will be able to create and manage their own students. Share username + password with them to log in.</p>
      </div>

      {/* Teachers list */}
      <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-700 flex items-center justify-between">
          <h3 className="font-black text-sm flex items-center gap-2"><Users size={14} className="text-purple-400"/> Teachers in team ({teachers.length})</h3>
          <button onClick={refresh} className="text-xs text-gray-400 hover:text-white transition-colors">↻ Refresh</button>
        </div>
        {loadingList ? (
          <p className="text-center py-8 text-gray-500 text-sm animate-pulse">Loading...</p>
        ) : teachers.length === 0 ? (
          <div className="p-8 text-center text-gray-500 text-sm">No teachers yet. Create an account above.</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-900/50 text-gray-400 text-xs uppercase">
              <tr>
                <th className="px-4 py-3 text-left">Teacher</th>
                <th className="px-4 py-3 text-left">Plan</th>
                <th className="px-4 py-3 text-left">Students</th>
                <th className="px-4 py-3 text-left">Reset Password</th>
                <th className="px-4 py-3 text-right">Remove</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map(t => (
                <tr key={t.teacher_id} className="border-t border-gray-700/60 hover:bg-gray-700/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center text-xs font-black">{(t.teacher_name || '?')[0].toUpperCase()}</div>
                      <div>
                        <p className="font-bold">{t.teacher_name}</p>
                        <p className="text-xs text-gray-500">teacher</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${t.plan === 'premium' ? 'bg-yellow-500/20 text-yellow-300' : 'bg-gray-600 text-gray-300'}`}>
                      {(t.plan || 'free').toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-mono font-bold text-purple-300">{t.students_assigned}/{t.allocated_seats ?? '?'}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <input
                        value={resetPwd[t.teacher_id] || ''}
                        onChange={e => setResetPwd(p => ({ ...p, [t.teacher_id]: e.target.value }))}
                        placeholder="New password"
                        type="password"
                        className="bg-gray-900 border border-gray-600 rounded-lg px-3 py-1.5 text-xs text-white placeholder-gray-600 w-32 focus:border-purple-500 outline-none"
                      />
                      <button
                        onClick={() => handleResetPassword(t)}
                        disabled={resetting[t.teacher_id] || !resetPwd[t.teacher_id]}
                        className="p-1.5 bg-amber-600 hover:bg-amber-700 disabled:opacity-30 rounded-lg transition-colors"
                        title="Reset password"
                      >
                        <KeyRound size={13}/>
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleRemove(t)}
                      disabled={removing[t.teacher_id]}
                      className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-900/30 rounded-lg transition-colors disabled:opacity-30"
                      title="Remove from team"
                    >
                      {removing[t.teacher_id] ? '…' : <Trash2 size={14}/>}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// ─── Tab: Manage Students ──────────────────────────────────────────────────

function TabManageStudents({ students, seatInfo, onRefresh }) {
  const [username, setUsername]   = useState('');
  const [password, setPassword]   = useState('');
  const [creating, setCreating]   = useState(false);
  const [error, setError]         = useState('');
  const [success, setSuccess]     = useState('');
  const [resetPwd, setResetPwd]   = useState({}); // { [studentId]: newPwd }
  const [resetting, setResetting] = useState({});
  const [removing, setRemoving]   = useState({});
  const [showPwd, setShowPwd]     = useState(false);

  const seatsUsed  = seatInfo?.seats_used  ?? students.length;
  const seatsTotal = seatInfo?.seats_total ?? 0;
  const seatsFull  = seatsUsed >= seatsTotal;

  const handleCreate = async () => {
    setError(''); setSuccess('');
    if (!username.trim() || !password.trim()) { setError('Enter username and password.'); return; }
    setCreating(true);
    try {
      const res = await teacherAPI.createStudent(username.trim(), password.trim());
      setSuccess(`✓ Created "${res.data.student.username}" · ${res.data.seats_used}/${res.data.seats_total} seats used`);
      setUsername(''); setPassword('');
      onRefresh();
    } catch (e) {
      setError(e.response?.data?.message || 'Failed to create.');
    } finally {
      setCreating(false);
    }
  };

  const handleRemove = async (student) => {
    if (!window.confirm(`Remove "${student.student_name}" from class?\n(Account stays active, just removed from your list)`)) return;
    setRemoving(r => ({ ...r, [student.student_id]: true }));
    try {
      await teacherAPI.removeStudent(student.student_id, false);
      onRefresh();
    } catch (e) {
      alert(e.response?.data?.message || 'Failed to remove');
    } finally {
      setRemoving(r => ({ ...r, [student.student_id]: false }));
    }
  };

  const handleResetPassword = async (student) => {
    const newPwd = resetPwd[student.student_id];
    if (!newPwd || newPwd.length < 6) { alert('New password must be at least 6 characters'); return; }
    setResetting(r => ({ ...r, [student.student_id]: true }));
    try {
      await teacherAPI.resetStudentPassword(student.student_id, newPwd);
      setResetPwd(p => ({ ...p, [student.student_id]: '' }));
      alert(`✓ Password reset for "${student.student_name}"`);
    } catch (e) {
      alert(e.response?.data?.message || 'Failed');
    } finally {
      setResetting(r => ({ ...r, [student.student_id]: false }));
    }
  };

  return (
    <div className="p-6 space-y-6 text-white">
      {/* Seat usage banner */}
      <div className={`flex items-center justify-between p-4 rounded-2xl border ${seatsFull ? 'bg-red-900/30 border-red-700' : 'bg-indigo-900/40 border-indigo-700'}`}>
        <div className="flex items-center gap-3">
          <ShieldCheck size={20} className={seatsFull ? 'text-red-400' : 'text-indigo-400'} />
          <div>
            <p className="font-black text-sm">Seats used</p>
            <p className="text-xs text-gray-400">{seatInfo?.plan || 'GV Plan'}</p>
          </div>
        </div>
        <div className="text-right">
          <p className={`text-3xl font-black ${seatsFull ? 'text-red-400' : 'text-indigo-300'}`}>{seatsUsed}<span className="text-lg text-gray-500">/{seatsTotal}</span></p>
          {seatsFull && <p className="text-xs text-red-400 font-bold">Quota full — upgrade plan to add students</p>}
        </div>
        {/* Seat bar */}
        <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden ml-4">
          <div className={`h-full rounded-full transition-all ${seatsFull ? 'bg-red-500' : 'bg-indigo-500'}`} style={{width: seatsTotal ? `${Math.min(100, seatsUsed/seatsTotal*100)}%` : '0%'}} />
        </div>
      </div>

      {/* Create student form */}
      <div className="bg-gray-800 rounded-2xl p-5 border border-gray-700">
        <h3 className="font-black text-sm mb-4 flex items-center gap-2"><UserPlus size={16} className="text-green-400"/> Create new student account</h3>
        {error   && <p className="text-xs text-red-400 font-bold mb-3 bg-red-900/20 p-2 rounded-lg">{error}</p>}
        {success && <p className="text-xs text-green-400 font-bold mb-3 bg-green-900/20 p-2 rounded-lg">{success}</p>}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            value={username} onChange={e => setUsername(e.target.value)}
            placeholder="Username (vd: hocsinh01)"
            className="bg-gray-900 border border-gray-600 rounded-xl px-4 py-3 text-sm font-bold text-white placeholder-gray-500 focus:border-indigo-500 outline-none"
            disabled={seatsFull || creating}
          />
          <div className="relative">
            <input
              value={password} onChange={e => setPassword(e.target.value)}
              type={showPwd ? 'text' : 'password'}
              placeholder="Password (≥6 chars)"
              className="w-full bg-gray-900 border border-gray-600 rounded-xl px-4 py-3 text-sm font-bold text-white placeholder-gray-500 focus:border-indigo-500 outline-none pr-12"
              disabled={seatsFull || creating}
              onKeyDown={e => e.key === 'Enter' && handleCreate()}
            />
            <button onClick={() => setShowPwd(s => !s)} className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-300">
              <Eye size={16}/>
            </button>
          </div>
          <button
            onClick={handleCreate}
            disabled={seatsFull || creating || !username.trim() || !password.trim()}
            className="bg-green-600 hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-black text-sm rounded-xl py-3 flex items-center justify-center gap-2 transition-colors"
          >
            {creating ? '⏳ Creating…' : <><UserPlus size={15}/> Add Student</>}
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">Student will be automatically added to your class. Share username + password with them to log in.</p>
      </div>

      {/* Student list */}
      <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-700 flex items-center justify-between">
          <h3 className="font-black text-sm flex items-center gap-2"><Users size={14} className="text-indigo-400"/> Students in class ({students.length})</h3>
          <button onClick={onRefresh} className="text-xs text-gray-400 hover:text-white transition-colors">↻ Refresh</button>
        </div>
        {students.length === 0 ? (
          <div className="p-8 text-center text-gray-500 text-sm">No students yet. Create an account above.</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-900/50 text-gray-400 text-xs uppercase">
              <tr>
                <th className="px-4 py-3 text-left">Student</th>
                <th className="px-4 py-3 text-left">Week</th>
                <th className="px-4 py-3 text-left">Activity</th>
                <th className="px-4 py-3 text-left">Reset Password</th>
                <th className="px-4 py-3 text-right">Remove</th>
              </tr>
            </thead>
            <tbody>
              {students.map(s => {
                const inactive = Math.floor(s.days_inactive || 0);
                return (
                  <tr key={s.student_id} className="border-t border-gray-700/60 hover:bg-gray-700/30">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {s.avatar_url
                          ? <img src={s.avatar_url} className="w-8 h-8 rounded-full" alt=""/>
                          : <div className="w-8 h-8 rounded-full bg-indigo-700 flex items-center justify-center text-xs font-black">{(s.student_name || '?')[0].toUpperCase()}</div>}
                        <div>
                          <p className="font-bold">{s.student_name}</p>
                          <p className="text-xs text-gray-500">{s.plan || 'student'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3"><span className="font-mono font-bold text-indigo-300">W{s.current_week || 1}</span></td>
                    <td className="px-4 py-3">
                      {inactive > 7
                        ? <span className="text-red-400 text-xs font-bold">⚠ {inactive}d inactive</span>
                        : inactive > 3
                          ? <span className="text-amber-400 text-xs font-bold">⏱ {inactive}d ago</span>
                          : <span className="text-green-400 text-xs font-bold">✓ Active</span>}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <input
                          value={resetPwd[s.student_id] || ''}
                          onChange={e => setResetPwd(p => ({ ...p, [s.student_id]: e.target.value }))}
                          placeholder="New password"
                          type="password"
                          className="bg-gray-900 border border-gray-600 rounded-lg px-3 py-1.5 text-xs text-white placeholder-gray-600 w-32 focus:border-indigo-500 outline-none"
                        />
                        <button
                          onClick={() => handleResetPassword(s)}
                          disabled={resetting[s.student_id] || !resetPwd[s.student_id]}
                          className="p-1.5 bg-amber-600 hover:bg-amber-700 disabled:opacity-30 rounded-lg transition-colors"
                          title="Reset password"
                        >
                          <KeyRound size={13}/>
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleRemove(s)}
                        disabled={removing[s.student_id]}
                        className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-900/30 rounded-lg transition-colors disabled:opacity-30"
                        title="Remove from class"
                      >
                        {removing[s.student_id] ? '…' : <Trash2 size={14}/>}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// ─── Tab: Lesson Plans (Sprint T3) ──────────────────────────────────────────

// Weeks covered in our lesson plan data (All 156 weeks available)
const LP_AVAILABLE_STATIC = new Set(Array.from({ length: 156 }, (_, i) => i + 1));

const LP_SUB_TABS = [
  { key: 'overview',   label: 'Quick Ref'   },
  { key: 'vocab',      label: 'Vocab'       },
  { key: 'method',     label: 'Methodology' },
  { key: 'session1',   label: 'Session 1'   },
  { key: 'session2',   label: 'Session 2'   },
  { key: 'session3',   label: 'Session 3'   },
  { key: 'answers',    label: 'Answer Key'  },
  { key: 'taskcards',  label: 'Task Cards'  },
];

function LPSection({ title, children, defaultOpen = true, badge = null, accent = null }) {
  const [open, setOpen] = useState(defaultOpen);
  const isGrammar = accent === 'grammar';
  return (
    <div className={`rounded-xl overflow-hidden ${isGrammar ? 'bg-emerald-950/40 border border-emerald-700/40' : 'bg-gray-800'}`}>
      <button
        onClick={() => setOpen(o => !o)}
        className={`w-full flex items-center justify-between px-5 py-3 text-sm font-black transition-colors ${isGrammar ? 'text-emerald-300 hover:bg-emerald-900/30' : 'text-white hover:bg-gray-750'}`}
      >
        <span className="flex items-center gap-2 flex-1 min-w-0">
          <span className="truncate">{title}</span>
          {badge != null && badge > 0 && (
            <span className="shrink-0 text-[10px] font-black px-1.5 py-0.5 rounded border text-yellow-400 bg-yellow-400/10 border-yellow-400/30">
              {badge} pts
            </span>
          )}
        </span>
        {open ? <ChevronUp size={14} className="text-gray-400 shrink-0"/> : <ChevronDown size={14} className="text-gray-400 shrink-0"/>}
      </button>
      {open && <div className="px-5 pb-5">{children}</div>}
    </div>
  );
}

function TabLessonPlan({ sessionsPerWeek = 3, setSessionsPerWeek, students = [], teacherAPI: api }) {
  const [weekCache, setWeekCache]     = useState({});
  const [loadError, setLoadError]     = useState(false);
  const [loadingLP, setLoadingLP]     = useState(false);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [subTab, setSubTab]           = useState('overview');
  const [weekData, setWeekData]       = useState(null);
  const [lpSearch, setLpSearch]       = useState('');
  const [lpIndex, setLpIndex]         = useState(null);
  const [lpAvailable, setLpAvailable] = useState(LP_AVAILABLE_STATIC);
  const [playedGames, setPlayedGames] = useState(() => {
    try { return JSON.parse(localStorage.getItem('tpPlayedGames') || '{}'); } catch { return {}; }
  });
  // Class start date (shared with Lesson Pack logic, now merged here)
  const [classStartDate, setClassStartDate] = useState('');
  const [classDateInput, setClassDateInput] = useState('');
  const [editingClassDate, setEditingClassDate] = useState(false);
  const [savingClassDate, setSavingClassDate]   = useState(false);
  const [saveDateError, setSaveDateError]       = useState('');
  // Session notes aggregated across all students for selected week
  // { sessNum: [{student_name, note, created_at}] }
  const [weekNotes, setWeekNotes]     = useState({});
  const [notesFetching, setNotesFetching] = useState(false);
  // Quick-add note form (per session sub-tab)
  const [addNoteStudentId, setAddNoteStudentId] = useState('');
  const [addNoteText, setAddNoteText]           = useState('');
  const [addNoteSaving, setAddNoteSaving]       = useState(false);

  const markGamePlayed = (weekNum, gameIdx) => {
    const key = `${weekNum}_${gameIdx}`;
    const updated = { ...playedGames, [key]: !playedGames[key] };
    setPlayedGames(updated);
    localStorage.setItem('tpPlayedGames', JSON.stringify(updated));
  };

  // Load class start date
  useEffect(() => {
    if (!api) return;
    api.getClassSettings()
      .then(r => {
        const d = r.data?.class_start_date || '';
        setClassStartDate(d);
        setClassDateInput(d);
      })
      .catch(() => {});
  }, [api]);

  const currentClassWeek = (() => {
    if (!classStartDate) return null;
    const start = new Date(classStartDate); start.setHours(0,0,0,0);
    const today = new Date(); today.setHours(0,0,0,0);
    return Math.max(1, Math.floor((today - start) / (7*24*60*60*1000)) + 1);
  })();

  const handleSaveClassDate = async () => {
    if (!classDateInput || !api) return;
    setSavingClassDate(true);
    setSaveDateError('');
    try {
      await api.saveClassSettings(classDateInput);
      setClassStartDate(classDateInput);
      setEditingClassDate(false);
    } catch (e) {
      setSaveDateError(e?.response?.data?.message || 'Failed to save date');
    } finally {
      setSavingClassDate(false);
    }
  };

  // Fetch session notes for all students when selected week changes (LP tab)
  useEffect(() => {
    if (!selectedWeek || !api || students.length === 0) { setWeekNotes({}); return; }
    setNotesFetching(true);
    Promise.all(students.map(s =>
      api.getSessionNotes(s.student_id)
        .then(r => ({ student_name: s.student_name, notes: r.data || [] }))
        .catch(() => ({ student_name: s.student_name, notes: [] }))
    )).then(results => {
      const map = {};
      results.forEach(({ student_name, notes }) => {
        notes
          .filter(n => n.week_num === selectedWeek || n.weekNum === selectedWeek)
          .forEach(n => {
            const sessNum = n.session_num ?? n.sessionNum ?? 0;
            if (!map[sessNum]) map[sessNum] = [];
            map[sessNum].push({ student_name, note: n.note, created_at: n.created_at });
          });
      });
      setWeekNotes(map);
    }).finally(() => setNotesFetching(false));
  }, [selectedWeek, students.length]); // eslint-disable-line

  const handleAddNote = async (sessNum) => {
    if (!addNoteStudentId || !addNoteText.trim() || !selectedWeek || !api) return;
    setAddNoteSaving(true);
    try {
      await api.saveSessionNote(parseInt(addNoteStudentId), selectedWeek, sessNum, addNoteText.trim());
      // Optimistically add to weekNotes
      setWeekNotes(prev => {
        const student_name = students.find(s => s.student_id === parseInt(addNoteStudentId))?.student_name || 'Student';
        const entry = { student_name, note: addNoteText.trim(), created_at: new Date().toISOString() };
        return { ...prev, [sessNum]: [...(prev[sessNum] || []), entry] };
      });
      setAddNoteText('');
    } catch (e) {
      alert('Failed to save note');
    } finally {
      setAddNoteSaving(false);
    }
  };

  // Fetch index to derive LP_AVAILABLE dynamically
  useEffect(() => {
    (api?.getLessonsIndex ? api.getLessonsIndex() : fetch('/data/lessonPlans_index.json').then(r => r.ok ? r.json() : null).then(d => ({ data: d })))
      .then(r => {
        const d = r?.data || r;
        if (!d) return;
        setLpIndex(d);
        setLpAvailable(new Set(Object.keys(d).map(Number)));
      })
      .catch(() => {});
  }, []); // eslint-disable-line

  // Lazy-fetch a single week file on demand (authenticated API with robust 2-tier fallback)
  const loadWeek = (wnum) => {
    if (!wnum) return;
    const key = String(wnum);
    if (weekCache[key]) { setWeekData(weekCache[key]); return; }
    setLoadingLP(true);
    setLoadError(false);
    const fetcher = api?.getLessonWeek
      ? api.getLessonWeek(wnum).then(r => r.data)
      : fetch(`/data/lessons/W${key}.json`).then(r => { if (!r.ok) throw new Error('Not found'); return r.json(); });
    fetcher
      .then(d => {
        setWeekCache(c => ({ ...c, [key]: d }));
        setWeekData(d);
        setLoadingLP(false);
      })
      .catch(async (err) => {
        try {
          const res = await fetch(`/data/lessons/W${key}.json`);
          if (res.ok) {
            const d = await res.json();
            setWeekCache(c => ({ ...c, [key]: d }));
            setWeekData(d);
            setLoadingLP(false);
            return;
          }
        } catch (_) {}
        const msg = err?.response?.data?.message || err?.message || '';
        if (msg.includes('chưa được mở') || msg.includes('nằm ngoài') || msg.includes('Week not available') || msg.includes('not unlocked')) {
          setLoadError(msg);
        } else {
          setLoadError(true);
        }
        setLoadingLP(false);
      });
  };

  useEffect(() => { loadWeek(selectedWeek); }, [selectedWeek]); // eslint-disable-line

  useEffect(() => {
    if (!selectedWeek) { setWeekData(null); return; }
    setSubTab('overview');
  }, [selectedWeek]);

  // Reset sub-tab to overview when sessions-per-week changes (avoid staying on invalid session tab)
  useEffect(() => {
    const m = subTab.match(/^session(\d+)$/);
    if (m) setSubTab('overview');
  }, [sessionsPerWeek]);

  // Group weeks 1-156 into blocks of 12
  const BLOCKS = [
    { label: 'Block A · W1–12',   weeks: Array.from({length:12}, (_,i)=>i+1)   },
    { label: 'Block A · W13–24',  weeks: Array.from({length:12}, (_,i)=>i+13)  },
    { label: 'Block B · W25–36',  weeks: Array.from({length:12}, (_,i)=>i+25)  },
    { label: 'Block B · W37–48',  weeks: Array.from({length:12}, (_,i)=>i+37)  },
    { label: 'Block C · W49–60',  weeks: Array.from({length:12}, (_,i)=>i+49)  },
    { label: 'Block C · W61–72',  weeks: Array.from({length:12}, (_,i)=>i+61)  },
    { label: 'Block D · W73–84',  weeks: Array.from({length:12}, (_,i)=>i+73)  },
    { label: 'Block D · W85–96',  weeks: Array.from({length:12}, (_,i)=>i+85)  },
    { label: 'Block E · W97–108', weeks: Array.from({length:12}, (_,i)=>i+97)  },
    { label: 'Block E · W109–120',weeks: Array.from({length:12}, (_,i)=>i+109) },
    { label: 'Block F · W121–132',weeks: Array.from({length:12}, (_,i)=>i+121) },
    { label: 'Block F · W133–156',weeks: Array.from({length:24}, (_,i)=>i+133) },
  ];

  // Derive active session array based on sessionsPerWeek
  const getSessKey = () => sessionsPerWeek === 2 ? 'sessions_2' : sessionsPerWeek === 5 ? 'sessions_5' : 'sessions';
  const getActiveSessions = () => weekData?.[getSessKey()] || weekData?.sessions || [];
  const getSessionByIndex = (idx) => getActiveSessions()[idx] || null;

  // Filtered weeks for sidebar search
  const searchLower = lpSearch.trim().toLowerCase();
  const matchesSearch = (wnum) => {
    if (!searchLower) return true;
    // match week number
    if (String(wnum).includes(searchLower)) return true;
    // match unit_theme from index
    const theme = (lpIndex?.[String(wnum)]?.unit_theme || '').toLowerCase();
    if (theme.includes(searchLower)) return true;
    // match grammar focus from loaded cache
    const qr = weekCache[String(wnum)]?.quick_ref || {};
    const grammar = (qr['Grammar Focus'] || '').toLowerCase();
    return grammar.includes(searchLower);
  };

  // Dynamic sub-tabs: fixed tabs + one per session
  const staticSubTabs = [
    { key: 'overview', label: 'Quick Ref' },
    { key: 'vocab',    label: 'Vocab'     },
    { key: 'method',   label: 'Methodology' },
  ];
  const sessionSubTabs = weekData
    ? getActiveSessions().map((s, i) => ({
        key: `session${i + 1}`,
        label: s.session_label ? s.session_label.split('—')[0].trim() : `Session ${i + 1}`,
      }))
    : Array.from({ length: sessionsPerWeek }, (_, i) => ({ key: `session${i + 1}`, label: `Session ${i + 1}` }));
  // Strip duration suffix like "(120 min)" from session tab labels
  sessionSubTabs.forEach(t => { t.label = t.label.replace(/\s*\(\d+\s*min\)/i, '').trim(); });
  const tailSubTabs = [
    { key: 'answers',   label: 'Answer Key' },
    { key: 'taskcards', label: 'Task Cards'  },
    { key: 'audio',     label: '📋 Teacher\'s Contents' },
    { key: 'games',     label: '🎮 Games'    },
    { key: 'videos',    label: '🎬 Video Prompts' },
  ];
  const activeSubTabs = [...staticSubTabs, ...sessionSubTabs, ...tailSubTabs];

  const renderSubTab = () => {
    if (!weekData) return null;
    const { quick_ref, methodology, vocab_tiers, answer_key, task_cards } = weekData;
    const activeSessions = getActiveSessions();
    const hasPerSlotAK = sessionsPerWeek !== 3 && activeSessions.some(s => (s.answer_key || []).length > 0);
    const hasPerSlotTC = sessionsPerWeek !== 3 && activeSessions.some(s => (s.task_cards || []).length > 0);

    if (subTab === 'overview') {
      const qrEntries = Object.entries(quick_ref || {});
      return (
        <div className="space-y-4">
          {qrEntries.length > 0 && (
            <LPSection title="📋 Quick Reference Table">
              <table className="w-full text-sm border-collapse">
                <tbody>
                  {qrEntries.map(([k, v]) => (
                    <tr key={k} className="border-b border-gray-700">
                      <td className="py-2 pr-4 text-xs font-black text-gray-400 uppercase w-40 align-top">{k}</td>
                      <td className="py-2 text-white">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </LPSection>
          )}
        </div>
      );
    }

    if (subTab === 'vocab') {
      return (
        <div className="space-y-4">
          {vocab_tiers?.length > 0 ? (
            <LPSection title={`📚 Vocab (${vocab_tiers.length} words)`}>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-gray-600">
                      {['Word', 'Vietnamese', 'Key Collocation(s)', 'Memory Trick'].map(h => (
                        <th key={h} className="text-left py-2 pr-3 text-gray-400 font-black uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {vocab_tiers.map((v, i) => (
                      <tr key={i} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                        <td className="py-2 pr-3 font-bold text-emerald-300">{v.Word || v.Tier}</td>
                        <td className="py-2 pr-3 text-gray-300">{v.Vietnamese || '—'}</td>
                        <td className="py-2 pr-3 text-indigo-300 italic">{v['Key Collocation(s)'] || '—'}</td>
                        <td className="py-2 text-yellow-300/70 text-[10px]">{v['Memory Trick'] || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </LPSection>
          ) : <p className="text-gray-500 text-sm py-4">No vocabulary data yet.</p>}
        </div>
      );
    }

    if (subTab === 'method') {
      return (
        <div className="space-y-3">
          {methodology?.length > 0 ? methodology.map((sub, i) => (
            <LPSection key={i} title={sub.title}>
              {sub.content.map((line, j) => (
                <p key={j} className="text-sm text-gray-300 mb-2 leading-relaxed">{line}</p>
              ))}
            </LPSection>
          )) : <p className="text-gray-500 text-sm py-4">No methodology data yet.</p>}
        </div>
      );
    }

    const sessMatch = subTab.match(/^session(\d+)$/);
    if (sessMatch) {
      const idx = parseInt(sessMatch[1]) - 1;
      const sess = getSessionByIndex(idx);
      const sessLabel = sess?.session_label || `Session ${idx + 1}`;
      if (!sess) return <p className="text-gray-500 text-sm py-4 px-1">{sessLabel} — no data yet.</p>;

      const handlePrintSession = () => {
        const sessionLabel = `W${weekData.week} — ${weekData.unit_theme || ''} · ${sessLabel}`;
        const allParts = sess.parts || [];

        // ── helpers ──────────────────────────────────────────────
        const esc = s => String(s)
          .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

        // Fix: extract content embedded in part titles (Part 9 vocab, Part 6 diagram, Part 1 passage)
        const fixPart = (part) => {
          let raw = part.title.replace(/^\[.\]\s*/, '').trim();
          let title = raw, extra = [];
          // Priority 1: READING INPUT — extract passage text regardless of \n
          if (/READING INPUT/i.test(raw)) {
            const BASE = 'READING INPUT', ai = raw.toUpperCase().indexOf(BASE) + BASE.length;
            const rest = raw.slice(ai).replace(/^\s*\[[^\]]*\]\s*/, '').trim();
            if (rest.length > 3) { title = raw.slice(0, ai).trim(); extra = [rest]; }
            else title = raw.split('\n')[0].trim();
          } else if (raw.includes('\n')) {
            const nl = raw.indexOf('\n'); let firstLine = raw.slice(0, nl).trim();
            const rest = raw.slice(nl + 1).trim();
            // For VOCAB parts: strip embedded first word entry from title line
            if (/VOCAB/i.test(firstLine)) {
              const vi = firstLine.search(/\s+\d+\.\s+\S/);
              if (vi > 5) { extra.push(firstLine.slice(vi).trim()); firstLine = firstLine.slice(0, vi).trim(); }
            }
            title = firstLine;
            if (rest) extra.push(...(/HOMEWORK.*Vocabulary|PART\s*9.*HOMEWORK/i.test(title)
              ? rest.split(/(?=\s+[b-j]\.\s)/).map(s => s.trim()).filter(Boolean) : [rest]));
          } else if (/HOMEWORK.*Vocabulary|PART\s*9.*HOMEWORK/i.test(raw)) {
            const m = raw.match(/^(.*?Vocabulary\s*\(\d+\s*words\):)\s*(a\..+)$/s);
            if (m) { title = m[1].trim(); extra = m[2].split(/(?=\s+[b-j]\.\s)/).map(s => s.trim()).filter(Boolean); }
          } else if (/VOCAB/i.test(raw)) {
            // VOCAB without \n: strip embedded word entries from title
            const vi = raw.search(/\s+\d+\.\s+\S/);
            if (vi > 5) { title = raw.slice(0, vi).trim(); extra = [raw.slice(vi).trim()]; }
          } else {
            const si = raw.search(/\s+Read this:|\s+The diagram shows:|\s+A\.\s+Stage/i);
            if (si > 5) {
              title = raw.slice(0, si).trim(); const rest = raw.slice(si).trim();
              const di = rest.search(/The diagram shows:/i);
              if (di > 0) { const b = rest.slice(0, di).trim(); if (b) extra.push(b); extra.push(rest.slice(di).trim()); }
              else extra = [rest];
            }
          }
          return { title, lines: [...extra, ...(part.content || [])] };
        };

        // ── diagram generators ────────────────────────────────────
        const makeCycleSVG = (items) => {
          const cx = 280, cy = 260, r = 140;
          const positions = [
            { x: cx,          y: cy - r - 42 }, // top
            { x: cx + r + 54, y: cy          }, // right
            { x: cx,          y: cy + r + 42 }, // bottom
            { x: cx - r - 54, y: cy          }, // left
          ];
          const colors = ['#4a6cf7','#16a34a','#d97706','#dc2626'];
          const wrapLabel = (text, maxCh) => {
            const ws = (text||'').split(' '); const ls = []; let cur = '';
            for (const w of ws) { const try_ = cur ? cur+' '+w : w; if (try_.length <= maxCh) cur = try_; else { if (cur) ls.push(cur); cur = w; } }
            if (cur) ls.push(cur); return ls.slice(0,3);
          };
          const arcs = [
            `M ${cx+36} ${cy-r-16} A ${r+16} ${r+16} 0 0 1 ${cx+r+16} ${cy-36}`,
            `M ${cx+r+16} ${cy+36} A ${r+16} ${r+16} 0 0 1 ${cx+36} ${cy+r+16}`,
            `M ${cx-36} ${cy+r+16} A ${r+16} ${r+16} 0 0 1 ${cx-r-16} ${cy+36}`,
            `M ${cx-r-16} ${cy-36} A ${r+16} ${r+16} 0 0 1 ${cx-36} ${cy-r-16}`,
          ];
          const AID = `arr${Math.random().toString(36).slice(2,6)}`;
          const boxW = 152, boxH = 58;
          const boxes = positions.map((p,i) => {
            const ls = wrapLabel(items[i]||'', 20);
            const bx = p.x - boxW/2, by = p.y - boxH/2;
            const startY = p.y - (ls.length - 1) * 7;
            const tspans = ls.map((l,li) => `<tspan x="${p.x}" dy="${li===0?0:14}">${esc(l)}</tspan>`).join('');
            return `<rect x="${bx}" y="${by}" width="${boxW}" height="${boxH}" rx="8" fill="${colors[i]}22" stroke="${colors[i]}" stroke-width="1.5"/><text x="${p.x}" y="${startY}" text-anchor="middle" dominant-baseline="middle" font-size="10.5" fill="#111" font-family="Arial">${tspans}</text>`;
          });
          return `<div style="text-align:center;margin:14px 0">
<svg width="480" height="440" viewBox="0 0 560 520" style="display:inline-block;max-width:100%">
  <defs><marker id="${AID}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="#666"/></marker></defs>
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#d1d5db" stroke-width="2" stroke-dasharray="8,4"/>
  ${arcs.map(d => `<path d="${d}" fill="none" stroke="#666" stroke-width="1.5" marker-end="url(#${AID})"/>`).join('')}
  ${boxes.join(' ')}
</svg></div>`;
        };

        const makeComparisonDiv = (leftLabel, leftText, rightLabel, rightText) =>
          `<div style="display:flex;gap:10px;margin:12px 0">
  <div style="flex:1;border:1.5px solid #555;border-radius:8px;padding:10px">
    <p style="margin:0 0 4px;font-weight:800;font-size:11px">${esc(leftLabel || '◀ A')}</p>
    <p style="margin:0;font-size:11px;line-height:1.5">${esc(leftText)}</p>
  </div>
  <div style="display:flex;align-items:center;font-size:22px;flex-shrink:0">↔</div>
  <div style="flex:1;border:1.5px solid #555;border-radius:8px;padding:10px">
    <p style="margin:0 0 4px;font-weight:800;font-size:11px">${esc(rightLabel || 'B ▶')}</p>
    <p style="margin:0;font-size:11px;line-height:1.5">${esc(rightText)}</p>
  </div>
</div>`;

        const makeDiagramBox = (desc) =>
          `<div style="border:2px dashed #666;border-radius:8px;padding:12px 14px;margin:12px 0">
  <p style="margin:0 0 6px;font-weight:800;font-size:11px;text-transform:uppercase">📊 Diagram</p>
  <p style="margin:0;font-size:11px;line-height:1.7;font-style:italic">${esc(desc)}</p>
</div>`;

        const makeDiagram = (rawLine) => {
          const desc = rawLine.replace(/^The diagram shows:\s*/i,'').trim();
          const lower = desc.toLowerCase();
          // Cycle diagram
          if ((lower.includes('circle') || lower.includes('cycle')) && lower.includes('arrow')) {
            const pos = {};
            for (const m of desc.matchAll(/\b(Top|Right|Bottom|Left):\s*([^.]+)/gi))
              pos[m[1].toLowerCase()] = m[2].trim();
            if (pos.top || pos.right || pos.bottom || pos.left)
              return makeCycleSVG([pos.top||'', pos.right||'', pos.bottom||'', pos.left||'']);
            // Numbered items
            const items = [];
            for (const m of desc.matchAll(/\d+\)\s*([^,)]+)/g)) items.push(m[1].trim());
            if (items.length >= 3) return makeCycleSVG(items);
          }
          // Comparison / split
          const lm = desc.match(/[Oo]n the left[,:]?\s*([^.]+)/);
          const rm = desc.match(/[Oo]n the right[,:]?\s*([^.]+)/);
          if (lm && rm) return makeComparisonDiv('', lm[1].trim(), '', rm[1].trim());
          // Fallback
          return makeDiagramBox(desc);
        };

        // ── section renderers ────────────────────────────────────
        const renderVocab = (lines) => {
          // Normalise lines: expand "→ Collocation practice: a. xxx b. xxx" into separate lines
          const expanded = [];
          for (const raw of lines) {
            const s = String(raw);
            // Detect "→ ... : a. ... b. ..." pattern (embedded sub-items on one line)
            const cpMatch = s.match(/^(→\s*(?:Collocation practice|Practice)[^:]*:)\s*(a\..+)$/i);
            if (cpMatch) {
              expanded.push(cpMatch[1].trim()); // "→ Collocation practice:"
              const rest = cpMatch[2].trim();
              // Split at " b. " " c. " etc.
              const parts = rest.split(/(?<=\S)\s+(?=[b-z]\.\s)/);
              expanded.push(...parts.map(p => p.trim()).filter(Boolean));
            } else {
              expanded.push(s);
            }
          }

          const out = []; let inWord = false; let sectionQ = 0;
          for (let i = 0; i < expanded.length; i++) {
            const s = String(expanded[i]);
            const nextIsArrow = i < expanded.length-1 && String(expanded[i+1]).startsWith('→');
            const isWordHeader = s.trim() &&
              !s.startsWith('→') && !s.match(/^[a-z]\.\s/) &&
              !s.startsWith('Stage') && !s.startsWith('[') &&
              !s.startsWith('✍') && !s.startsWith('🎥') && !s.startsWith('👨') &&
              !s.match(/^Vocabulary\s*\(/) && !s.match(/^Grammar/) && !s.match(/^Error/) &&
              (s.includes('Vietnamese') || /^\d+\.\s/.test(s) || nextIsArrow);
            if (isWordHeader) {
              if (inWord) out.push('</div>');
              out.push(`<div style="margin:10px 0 0;border-top:1px solid #d1d5db;padding:5px 0 4px 8px">`);
              out.push(`<p style="margin:0 0 3px;font-weight:800;font-size:12px">${esc(s)}</p>`);
              inWord = true; sectionQ = 0;
            } else if (s.match(/^[a-z]\.\s/)) {
              sectionQ++;
              out.push(`<p style="margin:2px 0 2px 20px;font-size:12px">${esc(s)}</p>`);
            } else if (s.startsWith('→')) {
              out.push(`<p style="margin:2px 0 2px 14px;font-size:12px">${esc(s)}</p>`);
            } else if (s.trim()) {
              out.push(`<p style="margin:3px 0;font-size:12px">${esc(s)}</p>`);
            }
          }
          if (inWord) out.push('</div>');
          return out.join('');
        };

        const renderStem = (lines) => {
          const out = []; let qNum = 0;
          for (const line of lines) {
            const s = String(line);
            if (/^The diagram shows:/i.test(s)) { out.push(makeDiagram(s)); continue; }
            if (s.startsWith('[Same text')) { out.push(`<p style="margin:3px 0 3px 12px;font-size:11px;font-style:italic">${esc(s)}</p>`); continue; }
            if (s.match(/^\[O[\s\]]/)) { qNum++; out.push(`<p style="margin:6px 0;font-size:12px"><b>Q${qNum}.</b> ${esc(s.replace(/^\[O[^\]]*\]\s*/,''))}</p>`); continue; }
            if (s.startsWith('Stage')) { out.push(`<p style="margin:10px 0 4px;font-weight:700;font-size:12px">${esc(s)}</p>`); continue; }
            if (s.startsWith('→')) { out.push(`<p style="margin:2px 0 2px 16px;font-size:12px">${esc(s)}</p>`); continue; }
            if (s.startsWith('🔍')) { out.push(`<p style="margin:6px 0;font-size:11px;font-style:italic">${esc(s)}</p>`); continue; }
            if (s.trim()) out.push(`<p style="margin:3px 0;font-size:12px;line-height:1.65">${esc(s)}</p>`);
          }
          return out.join('');
        };

        const renderHomework = (lines) => {
          const out = []; let qNum = 0; let hwSection = '';
          for (const s of lines.map(String)) {
            if (s.match(/^\[O\]|^\[Y\]/)) { out.push(`<p style="margin:10px 0 4px;font-weight:800;font-size:12px;border-top:1px solid #ccc;padding-top:6px">${esc(s.replace(/^\[[OY]\]\s*/,''))}</p>`); continue; }
            if (s.match(/^Vocabulary|^Grammar|^Error correction|^Translation|^Portfolio|^Word.Phrase Bank|^Phrase Bank|^Word Bank/)) { qNum = 0; hwSection = s.match(/^(Error correction|Translation)/i)?.[0]?.toLowerCase() || ''; out.push(`<p style="margin:10px 0 3px;font-weight:800;font-size:12px;border-bottom:1px solid #ccc;padding-bottom:2px">${esc(s)}</p>`); continue; }
            // Auto-number items in Error correction and Translation sections
            if ((hwSection === 'error correction' || hwSection === 'translation') && s.trim() && !s.startsWith('→')) { qNum++; out.push(`<p style="margin:3px 0;font-size:12px;line-height:1.65"><b style="margin-right:4px">${qNum}.</b>${esc(s)}</p>`); continue; }
            if (s.match(/^[a-z]\.\s/)) { qNum++; out.push(`<p style="margin:3px 0 3px 8px;font-size:12px;line-height:1.65"><b style="margin-right:3px">${qNum}.</b><b>${esc(s.match(/^[a-z]\./)[0])}</b>${esc(s.replace(/^[a-z]\./, ''))}</p>`); continue; }
            if (s.startsWith('🎥') || s.startsWith('✍️') || s.startsWith('👨')) { out.push(`<p style="margin:8px 0 2px;font-size:12px;font-weight:700">${esc(s)}</p>`); continue; }
            if (s.match(/^\[Target:/)) { out.push(`<p style="margin:2px 0 4px;font-size:10px;font-style:italic;color:#666">${esc(s)}</p>`); continue; }
            if (s.startsWith('→')) { out.push(`<p style="margin:2px 0 2px 16px;font-size:12px">${esc(s)}</p>`); continue; }
            if (s.includes('____') && !s.startsWith('→') && !s.match(/^[a-z]\.\s/)) {
              // Reading passage with embedded [N] blanks — not a homework exercise, don't auto-number
              if (/\[\d+\]\s*_{3,}/.test(s)) {
                out.push(`<p style="margin:4px 0;font-size:12px;line-height:1.7;background:#fafafa;padding:3px 6px;border-left:2px solid #ddd">${esc(s)}</p>`);
                continue;
              }
              if (/^\d+\.\s/.test(s.trim())) {
                // Already numbered in content — render as-is, no auto-number
                out.push(`<p style="margin:3px 0;font-size:12px;line-height:1.65">${esc(s)}</p>`);
              } else {
                qNum++; out.push(`<p style="margin:3px 0;font-size:12px;line-height:1.65"><b style="margin-right:4px">${qNum}.</b>${esc(s)}</p>`);
              }
              continue;
            }
            if (s.trim()) out.push(`<p style="margin:3px 0;font-size:12px;line-height:1.65">${esc(s)}</p>`);
          }
          return out.join('');
        };

        const renderGeneric = (lines) => {
          const out = []; let qNum = 0;
          const isExLine = s => {
            const t = s.trim();
            if (!t || t.startsWith('→') || t.startsWith('⬛')) return false;
            if (/^[_\s]+$/.test(t)) return false;
            if (/^\[\s*(Sub-total|Total)/.test(t) || /\/\s*\d+\s*\]/.test(t)) return false;
            if (t.startsWith('📋')) return false;
            if (/^\d+\.\s/.test(t) || /^[a-p]\.\s/.test(t)) return false;
            if (/^Stage\s+\d/.test(t) || /^(\[O\]\s*)?L[1-5]\s*[—–\-]/.test(t)) return false;
            if (/^Student [AB]:|^Goal:/.test(t)) return false;
            if (/^Grammar sentences.*:/.test(t) && !t.includes('____')) return false;
            if (/^(\[O\]\s*)?[A-F]\.\s*(Stage|Dictation|Inference)/.test(t) || /^[A-F]\.\s*$/.test(t)) return false;
            if (/^(Extension|Challenge|Design challenge):/.test(t) && !t.includes('____')) return false;
            if (/^Write\s+.+:\s*$/.test(t)) return false;
            return t.startsWith('T / F:') || (t.includes('____') && !t.startsWith('→')) || / -> /.test(t) || /^Base:\s/.test(t) || /^Type\s+[A-Z]/.test(t);
          };
          for (const line of lines) {
            const s = String(line);
            if (/^The diagram shows:/i.test(s)) { out.push(makeDiagram(s)); continue; }
            if (/^(\[O\]\s*)?L[1-5]\s*[—–\-]/.test(s)) { qNum = 0; out.push(`<p style="margin:10px 0 3px;font-weight:800;font-size:12px;border-top:1px solid #d1d5db;padding-top:5px">${esc(s.replace(/^\[O\]\s*/,''))}</p>`); continue; }
            if (s.startsWith('Stage')) { qNum = 0; out.push(`<p style="margin:10px 0 4px;font-weight:700;font-size:12px">${esc(s)}</p>`); continue; }
            if (s.startsWith('T /') || s.startsWith('F /')) { qNum++; out.push(`<p style="margin:2px 0;font-size:12px"><b style="margin-right:4px">${qNum}.</b>${esc(s)}</p>`); continue; }
            if (s.startsWith('→')) { out.push(`<p style="margin:2px 0 2px 16px;font-size:12px">${esc(s)}</p>`); continue; }
            if (s.match(/^[a-z]\.\s/)) { out.push(`<p style="margin:2px 0 2px 20px;font-size:12px">${esc(s)}</p>`); continue; }
            if (s.match(/^\d+\.\s/) && !s.includes('Vietnamese')) { out.push(`<p style="margin:6px 0 2px;font-weight:700;font-size:12px">${esc(s)}</p>`); continue; }
            if (s.startsWith('🔍') || s.startsWith('📌')) { out.push(`<p style="margin:6px 0;font-size:11px;font-style:italic">${esc(s)}</p>`); continue; }
            if (isExLine(s)) { qNum++; out.push(`<p style="margin:4px 0;font-size:12px;line-height:1.65"><b style="margin-right:4px;min-width:18px;display:inline-block">${qNum}.</b>${esc(s)}</p>`); continue; }
            if (s.trim()) out.push(`<p style="margin:3px 0;font-size:12px;line-height:1.65">${esc(s)}</p>`);
          }
          return out.join('');
        };

        // ── assemble ─────────────────────────────────────────────
        const isUnscoredTitle = (t) => /^WEEK\s+\d+\s*\|/i.test(t) || /^SPIRAL\s+REVIEW/i.test(t);
        const getPartScore = (title, lines) => {
          if (isUnscoredTitle(title)) return 0;
          // ① For PART 3: use PART 3 TOTAL line (not the first per-level Sub-total)
          if (/PART\s*3/i.test(title)) {
            for (const l of lines) {
              const m = String(l).match(/\[\s*PART\s*3\s*TOTAL[^/]*\/\s*(\d+)\s*\]/);
              if (m) return parseInt(m[1]);
            }
          }
          // ② Explicit [ Sub-total: ___ / N ] marker — highest priority
          for (const l of lines) {
            const m = String(l).match(/\[\s*Sub-total[^/]*\/\s*(\d+)\s*\]/);
            if (m) return parseInt(m[1]);
          }
          // ② Sum (X items) / (X words) annotations
          let total = 0;
          for (const t of [title, ...lines])
            for (const m of [...String(t).matchAll(/\((\d+)\s*(?:items?|words?)\)/gi)])
              total += parseInt(m[1]);
          if (total > 0) return total;
          const vc = lines.filter(l => /^\d+\.\s+\S+.*\(Vietnamese/i.test(l)).length;
          if (vc > 0) return vc;
          return lines.filter(l => {
            const s = String(l).trim();
            if (!s || s.startsWith('→') || /^Stage\s+\d/.test(s) || /^(\[O\]\s*)?L[1-5]\s*[—–\-]/.test(s)) return false;
            return s.startsWith('T / F:') || (s.includes('____') && !s.startsWith('→')) || / -> /.test(s) || /^Base:\s/.test(s) || /^Type\s+[A-Z]/.test(s);
          }).length;
        };
        const sessionTotalPts = allParts.reduce((sum, p) => {
          const { title, lines } = fixPart(p);
          if (isUnscoredTitle(title) || /HOMEWORK|PART\s*9:/i.test(title)) return sum;
          return sum + getPartScore(title, lines);
        }, 0);
        const renderReading = (lines) => {
          // Find where exercises begin: first line starting with Title: / Stage / [
          const exStart = lines.findIndex(l => {
            const s = String(l).trim();
            return s.startsWith('Title:') || /^Stage\s+\d/.test(s) || s.startsWith('[');
          });
          let passageHTML = '', exerciseHTML = '';
          const pLines = exStart > 0 ? lines.slice(0, exStart).filter(l => String(l).trim() !== '') : [];
          const eLines = exStart >= 0 ? lines.slice(exStart) : lines;
          if (pLines.length > 0) {
            passageHTML = `<div style="background:#f0f7ff;border-left:4px solid #2563eb;border-radius:4px;padding:10px 14px;margin:6px 0 12px">
  <p style="font-size:9px;font-weight:900;color:#1d4ed8;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 6px">📖 Reading Passage</p>
  ${pLines.map(l => `<p style="margin:3px 0;font-size:12px;line-height:1.7;color:#1e293b">${esc(String(l))}</p>`).join('')}
</div>`;
          }
          exerciseHTML = renderGeneric(eLines);
          return passageHTML + exerciseHTML;
        };

        const renderPart = (part) => {
          const { title, lines } = fixPart(part);
          const T = title.toUpperCase();
          let body;
          if (/PART\s*2|VOCAB\s*BUILD/i.test(T))   body = renderVocab(lines);
          else if (/STEM|CLIL/i.test(T))             body = renderStem(lines);
          else if (/HOMEWORK|PART\s*9/i.test(T))     body = renderHomework(lines);
          else if (/READING INPUT/i.test(T))          body = renderReading(lines);
          else                                        body = renderGeneric(lines);
          const score = getPartScore(title, lines);
          const isHW = /HOMEWORK|PART\s*9:/i.test(title);
          const badge = '';
          const totalRow = (isHW && sessionTotalPts > 0)
            ? `<div style="text-align:right;font-size:11px;font-weight:900;border:1.5px solid #333;border-radius:4px;padding:4px 12px;margin-bottom:8px">▶ Session Total (Part 1–8): ${sessionTotalPts} pts</div>` : '';
          return `${totalRow}<div class="part">
  <h2>${esc(title)}${badge}</h2>
  <div style="padding:2px 0 2px 10px">${body}</div>
</div>`;
        };

        const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>${esc(sessionLabel)}</title>
<style>
  *{box-sizing:border-box}
  @page{size:A4;margin:12mm 16mm}
  body{font-family:Arial,sans-serif;font-size:12px;color:#111;margin:0;padding:0}
  h1{font-size:15px;font-weight:900;border-bottom:2.5px solid #333;padding-bottom:5px;margin-bottom:14px}
  h2{font-size:11.5px;font-weight:800;background:#f3f4f6;padding:4px 9px;margin:12px 0 3px;border-left:3px solid #555;color:#222;page-break-after:avoid}
  p{margin:2px 0;line-height:1.6}
  .watermark{font-size:9px;color:#bbb;text-align:center;margin-top:24px;border-top:1px solid #eee;padding-top:6px}
  .part{margin:8px 0}
  -webkit-print-color-adjust:exact;print-color-adjust:exact
</style></head>
<body>
<h1>LESSON PLAN — ${esc(sessionLabel)}</h1>
${allParts.map(p => renderPart(p)).join('')}
<div class="watermark">Lexio · For teachers only · Do not distribute</div>
</body></html>`;

        const win = window.open('', '_blank', 'width=880,height=750');
        win.document.write(html);
        win.document.close();
        setTimeout(() => win.print(), 600);
      };

      return (
        <div className="space-y-3">
          <div className="flex justify-end mb-1">
            <button
              onClick={handlePrintSession}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-xs font-bold rounded-lg transition-all"
            >
              <Printer size={12}/> Print Session {idx + 1}
            </button>
          </div>
          {(() => {
            // ── Title extractor (same logic for all parts) ──────────────────
            const extractPart = (part) => {
              let raw = part.title.replace(/^\[.\]\s*/, '').trim();
              let title = raw, prependLines = [];
              if (raw.includes('\n')) {
                const nl = raw.indexOf('\n'); title = raw.slice(0, nl).trim();
                const rest = raw.slice(nl + 1).trim();
                if (rest) prependLines = /HOMEWORK.*Vocabulary|PART\s*9.*HOMEWORK/i.test(title)
                  ? rest.split(/(?=\s+[b-j]\.\s)/).map(s => s.trim()).filter(Boolean) : [rest];
              } else if (/HOMEWORK.*Vocabulary|PART\s*9.*HOMEWORK/i.test(raw)) {
                const m = raw.match(/^(.*?Vocabulary\s*\(\d+\s*words\):)\s*(a\..+)$/s);
                if (m) { title = m[1].trim(); prependLines = m[2].split(/(?=\s+[b-j]\.\s)/).map(s => s.trim()).filter(Boolean); }
              } else {
                const si = raw.search(/\s+Read this:|\s+The diagram shows:|\s+A\.\s+Stage/i);
                if (si > 5) {
                  title = raw.slice(0, si).trim(); const rest = raw.slice(si).trim();
                  const di = rest.search(/The diagram shows:/i);
                  if (di > 0) { const b = rest.slice(0, di).trim(); if (b) prependLines.push(b); prependLines.push(rest.slice(di).trim()); }
                  else prependLines = [rest];
                } else if (/READING INPUT/i.test(raw)) {
                  const BASE = 'READING INPUT', ai = raw.toUpperCase().indexOf(BASE) + BASE.length;
                  const rest = raw.slice(ai).trim();
                  if (rest.length > 3) { title = raw.slice(0, ai).trim(); prependLines = [rest]; }
                }
              }
              return { title, prependLines, content: part.content || [] };
            };

            // ── Count scorable items in a part ──────────────────────────────
            const getPartItemCount = (title, lines) => {
              // ① For PART 3: use PART 3 TOTAL line (not the first per-level Sub-total)
              if (/PART\s*3/i.test(title)) {
                for (const l of lines) {
                  const m = String(l).match(/\[\s*PART\s*3\s*TOTAL[^/]*\/\s*(\d+)\s*\]/);
                  if (m) return parseInt(m[1]);
                }
              }
              // ② Explicit [ Sub-total: ___ / N ] marker — highest priority
              for (const l of lines) {
                const m = String(l).match(/\[\s*Sub-total[^/]*\/\s*(\d+)\s*\]/);
                if (m) return parseInt(m[1]);
              }
              // ② Sum all explicit (X items) / (X words) annotations
              let total = 0;
              for (const t of [title, ...lines])
                for (const m of [...String(t).matchAll(/\((\d+)\s*(?:items?|words?)\)/gi)])
                  total += parseInt(m[1]);
              if (total > 0) return total;
              // ③ Count numbered exercise items (1., 2., …) that are real questions
              const nc = lines.filter(l => {
                const s = String(l).trim();
                return /^\d+\.\s/.test(s) && (s.includes('____') || s.includes('?') || / -> /.test(s));
              }).length;
              if (nc > 0) return nc;
              // ④ Fallback: T/F lines only
              return lines.filter(l => String(l).trim().startsWith('T / F:')).length;
            };

            // ── Detect lines that need a generated number ────────────────────
            const isExerciseLine = (line) => {
              const t = String(line).trim();
              if (!t) return false;
              // Pure blank line (only underscores / spaces)
              if (/^[_\s]+$/.test(t)) return false;
              // Scoring / sub-total lines
              if (/^\[\s*(Sub-total|Total)/.test(t) || /\/\s*\d+\s*\]/.test(t)) return false;
              // GV teacher cue lines
              if (t.startsWith('📋')) return false;
              // Already has own number/letter → don't double-number
              if (/^\d+\.\s/.test(t) || /^[a-p]\.\s/.test(t)) return false;
              // Headers / instructions / non-exercise
              if (t.startsWith('→') || t.startsWith('⬛')) return false;
              if (/^Stage\s+\d/.test(t) || /^L[1-5]\s*[—–\-]/.test(t)) return false;
              if (/^Student [AB]:|^Goal:/.test(t)) return false;
              if (/^Grammar sentences.*:/.test(t) && !t.includes('____')) return false;
              if (/^[A-F]\.\s*$/.test(t) || /^[A-F]\.\s*(Stage|Dictation|Inference)/.test(t)) return false;
              if (/^(Extension|Challenge|Design challenge):/.test(t) && !t.includes('____')) return false;
              if (/^Write\s+.+:\s*$/.test(t)) return false;
              // Exercise signals
              return t.startsWith('T / F:') || (t.includes('____') && !t.startsWith('→')) ||
                     / -> /.test(t) || /^Base:\s/.test(t);
            };

            // ── Line renderer ────────────────────────────────────────────────
            const renderLine = (line, j) => {
              const s = String(line);
              // GV activity cue
              if (s.startsWith('📋')) return (
                <div key={j} className="flex items-center gap-2 text-xs font-black text-amber-300 bg-amber-900/20 rounded-lg px-3 py-2 my-2 border-l-2 border-amber-500">
                  <span>{s}</span>
                </div>
              );
              // Pure blank line → styled answer slot
              if (/^[_\s]{20,}$/.test(s.trim())) return (
                <div key={j} className="border-b border-gray-500/50 my-1 h-6 w-full" />
              );
              // Sub-total line
              if (/^\[\s*Sub-total/.test(s.trim())) return (
                <p key={j} className="text-xs font-black text-yellow-400/70 mt-2 text-right">{s}</p>
              );
              if (/^The diagram shows:/i.test(s)) {
                const desc = s.replace(/^The diagram shows:\s*/i, '').trim();
                const lo = desc.toLowerCase();
                if ((lo.includes('circle') || lo.includes('cycle')) && lo.includes('arrow')) {
                  const pos = {};
                  for (const m of [...desc.matchAll(/\b(Top|Right|Bottom|Left):\s*([^.]+)/gi)]) pos[m[1].toLowerCase()] = m[2].trim();
                  const items = [pos.top||'', pos.right||'', pos.bottom||'', pos.left||''];
                  const colors = ['#4a6cf7','#16a34a','#d97706','#dc2626'];
                  const cx = 210, cy = 210, r = 105;
                  const pts = [{x:cx,y:cy-r-36},{x:cx+r+44,y:cy},{x:cx,y:cy+r+36},{x:cx-r-44,y:cy}];
                  const arrows = [0,1,2,3].map(k => { const a=pts[k],b=pts[(k+1)%4]; return {x1:a.x+(cx-a.x)*.28,y1:a.y+(cy-a.y)*.28,x2:b.x+(cx-b.x)*.28,y2:b.y+(cy-b.y)*.28}; });
                  const wrapW = (txt,max) => { const ws=(txt||'').split(' '); const ls=[]; let c=''; for(const w of ws){const t=c?c+' '+w:w; if(t.length<=max)c=t; else{if(c)ls.push(c);c=w;}} if(c)ls.push(c); return ls.slice(0,3); };
                  return (
                    <div key={j} className="my-3 flex flex-col items-center bg-indigo-950/30 border border-indigo-700/40 rounded-xl p-3">
                      <p className="text-[10px] font-black text-indigo-400 uppercase tracking-wider mb-2">📊 Diagram</p>
                      <svg width="100%" viewBox="0 0 420 420" style={{maxWidth:'380px'}}>
                        <defs><marker id="lpArr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="#6b7280"/></marker></defs>
                        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#374151" strokeWidth="2" strokeDasharray="6,3"/>
                        {arrows.map((a,k) => <line key={k} x1={a.x1} y1={a.y1} x2={a.x2} y2={a.y2} stroke="#6b7280" strokeWidth="1.5" markerEnd="url(#lpArr)"/>)}
                        {pts.map((p,k) => { const ls=wrapW(items[k]||'',17); const sy=p.y-(ls.length-1)*6; return (<g key={k}><rect x={p.x-54} y={p.y-26} width="108" height="52" rx="6" fill={`${colors[k]}22`} stroke={colors[k]} strokeWidth="1.5"/><text textAnchor="middle" fontSize="9" fill="#e5e7eb" fontFamily="Arial,sans-serif">{ls.map((l,li)=><tspan key={li} x={p.x} y={sy+li*13}>{l}</tspan>)}</text></g>); })}
                      </svg>
                    </div>
                  );
                }
                return <div key={j} className="border-2 border-dashed border-indigo-500/40 rounded-lg p-3 my-2 bg-indigo-950/20"><p className="text-[10px] font-black text-indigo-400 uppercase mb-1">📊 Diagram</p><p className="text-xs text-gray-400 italic">{desc}</p></div>;
              }
              if (/^(\[O\]\s*)?L[1-5]\s*[—–\-]/.test(s)) return <p key={j} className="text-sm font-black text-yellow-200 mt-3 mb-1 border-t border-gray-700/60 pt-2">{s.replace(/^\[O\]\s*/,'')}</p>;
              if (/^Stage\s+\d/.test(s)) return <p key={j} className="text-sm font-bold text-yellow-300 mt-2 mb-0.5">{s}</p>;
              if (/^(Extension|Challenge|Design challenge):/.test(s)) return <p key={j} className="text-sm text-purple-300 italic mt-2 mb-0.5">{s}</p>;
              if (s.startsWith('→')) return <p key={j} className="text-sm text-indigo-300 ml-3 mb-1">{s}</p>;
              if (s.startsWith('T /') || s.startsWith('F /')) return <p key={j} className="text-sm text-cyan-300 ml-4 mb-0.5">{s}</p>;
              if (/^[a-j]\.\s/.test(s)) return <p key={j} className="text-sm text-gray-200 ml-4 mb-1.5 leading-relaxed">{s}</p>;
              if (/^\d+\.\s/.test(s) && !s.includes('Vietnamese')) return <p key={j} className="text-sm text-gray-200 ml-2 mb-0.5">{s}</p>;
              // 📌 Grammar rule highlight
              if (s.startsWith('📌')) return <p key={j} style={{fontSize:'12px',fontWeight:700,color:'#6ee7b7',background:'rgba(6,78,59,0.4)',borderLeft:'3px solid #34d399',borderRadius:'4px',padding:'4px 8px',margin:'6px 0'}}>{s}</p>;
              // Box-drawing table chars → monospace
              if (/^[┌┐└┘├┤┬┴┼─│╔╗╚╝║═]/.test(s)) return <p key={j} style={{fontFamily:'monospace',fontSize:'11px',color:'#94a3b8',whiteSpace:'pre',margin:'0',lineHeight:'1.4'}}>{s}</p>;
              return <p key={j} className="text-sm text-gray-300 mb-1.5 leading-relaxed">{s}</p>;
            };

            // ── Pre-compute processed parts + sub-totals ─────────────────────
            // Parts excluded from scoring: session header, spiral review, homework
            const isUnscoredPart = (t) =>
              /^WEEK\s+\d+\s*\|/i.test(t) || /^SPIRAL\s+REVIEW/i.test(t) || /HOMEWORK|PART\s*9:/i.test(t);
            const processedParts = sess.parts.map(extractPart);
            const subTotals = processedParts.map(({ title, prependLines, content }) =>
              isUnscoredPart(title) ? 0 : getPartItemCount(title, [...prependLines, ...content])
            );
            const sessionTotal = subTotals.reduce((s, n) => s + n, 0);

            return (
              <>
                {processedParts.map(({ title, prependLines, content }, i) => {
                  const isReading = /READING INPUT/i.test(title);
                  const isGrammarFocus = /GRAMMAR FOCUS/i.test(title);

                  // ── Separate passage lines from exercise lines ─────────────
                  let passageLines = [];
                  let exerciseLines = [...prependLines, ...content];
                  if (isReading) {
                    // Use content[] directly for passage detection
                    // Find first line that starts an exercise section
                    const exStart = content.findIndex(l => {
                      const s = String(l).trim();
                      return s.startsWith('Title:') || /^Stage\s+\d/.test(s) || s.startsWith('[');
                    });
                    if (exStart > 0) {
                      // Lines before exStart = passage; lines from exStart = exercises
                      passageLines = content.slice(0, exStart).filter(l => String(l).trim() !== '');
                      exerciseLines = content.slice(exStart);
                    } else if (exStart === 0) {
                      passageLines = [];
                      exerciseLines = content;
                    } else if (prependLines.length > 0) {
                      // Fallback: legacy format with passage in prependLines
                      const blob = prependLines[0];
                      passageLines = blob.split(/(?<=[.!?])\s+(?=[A-Z"])/).map(s => s.trim()).filter(Boolean);
                      exerciseLines = content;
                    }
                  }

                  const allLines = exerciseLines;
                  let partItemNum = 0;
                  const numberedLines = allLines.map(line => {
                    if (!isExerciseLine(line)) return { text: line, num: null };
                    partItemNum++;
                    return { text: line, num: partItemNum };
                  });
                  return (
                    <LPSection key={i} title={title} defaultOpen={i < 6} badge={subTotals[i] > 0 ? subTotals[i] : null} accent={isGrammarFocus ? 'grammar' : undefined}>
                      {/* Reading passage box */}
                      {passageLines.length > 0 && (
                        <div style={{marginBottom:'16px',padding:'12px 14px',borderRadius:'8px',background:'rgba(30,58,138,0.5)',border:'1.5px solid rgba(96,165,250,0.6)'}}>
                          <p style={{fontSize:'10px',fontWeight:900,color:'#93c5fd',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:'8px'}}>📖 Reading Passage</p>
                          {passageLines.map((line, k) => {
                            const s = String(line);
                            const isTitle = s.startsWith('📖');
                            return (
                              <p key={k} style={{fontSize:'13px',color: isTitle ? '#bfdbfe' : '#e2e8f0',lineHeight:'1.7',marginBottom:'4px',fontWeight: isTitle ? 700 : 400}}>{s}</p>
                            );
                          })}
                        </div>
                      )}
                      {numberedLines.length === 0
                        ? <p className="text-gray-500 text-[11px] italic">—</p>
                        : numberedLines.map(({ text, num }, j) => {
                            const el = renderLine(text, j);
                            if (num == null) return el;
                            return (
                              <div key={j} className="flex gap-1.5 items-baseline">
                                <span className="text-[11px] font-black text-yellow-500/70 shrink-0 min-w-[22px] text-right leading-relaxed mt-[2px]">{num}.</span>
                                {React.cloneElement(el, { key: `n${j}` })}
                              </div>
                            );
                          })
                      }
                    </LPSection>
                  );
                })}
                {sessionTotal > 0 && (
                  <div className="flex justify-end mt-1">
                    <div className="text-xs font-black text-yellow-300 bg-yellow-400/10 border border-yellow-400/30 rounded-lg px-3 py-1.5">
                      Session {idx + 1} Total: {sessionTotal} pts
                    </div>
                  </div>
                )}
              </>
            );
          })()}

          {/* Teaching Notes for this session (aggregated across all students) */}
          <div className="mt-4 bg-teal-900/20 border border-teal-700/40 rounded-xl p-4">
            <h5 className="text-xs font-black text-teal-300 flex items-center gap-1.5 mb-3">
              <BookOpen size={13}/> Teaching Notes — Session {idx + 1}
              {notesFetching && <span className="text-teal-500 font-normal italic ml-1">loading…</span>}
            </h5>
            {(weekNotes[idx + 1] || weekNotes[0] && idx === 0 ? weekNotes[idx + 1] || [] : weekNotes[idx + 1] || []).length > 0 ? (
              <div className="space-y-2 mb-3">
                {(weekNotes[idx + 1] || []).map((n, ni) => (
                  <div key={ni} className="bg-gray-800/60 rounded-lg px-3 py-2">
                    <p className="text-[10px] font-black text-teal-400">{n.student_name}</p>
                    <p className="text-xs text-gray-300 mt-0.5">{n.note}</p>
                    {n.created_at && (
                      <p className="text-[9px] text-gray-600 mt-0.5">{new Date(n.created_at).toLocaleDateString('vi-VN')}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              !notesFetching && <p className="text-xs text-gray-600 italic mb-3">No notes for this session yet.</p>
            )}
            {/* Quick add note */}
            {api && students.length > 0 && (
              <div className="flex gap-2 items-start mt-2">
                <select
                  value={addNoteStudentId}
                  onChange={e => setAddNoteStudentId(e.target.value)}
                  className="bg-gray-700 border border-gray-600 text-white rounded-lg px-2 py-1.5 text-xs shrink-0 focus:outline-none focus:border-teal-500"
                >
                  <option value="">Select student…</option>
                  {students.map(s => <option key={s.student_id} value={s.student_id}>{s.student_name}</option>)}
                </select>
                <input
                  type="text"
                  value={addNoteText}
                  onChange={e => setAddNoteText(e.target.value)}
                  placeholder="Add teaching note…"
                  className="flex-1 bg-gray-700 border border-gray-600 text-white rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-teal-500"
                  onKeyDown={e => e.key === 'Enter' && handleAddNote(idx + 1)}
                />
                <button
                  onClick={() => handleAddNote(idx + 1)}
                  disabled={!addNoteStudentId || !addNoteText.trim() || addNoteSaving}
                  className="px-3 py-1.5 bg-teal-700 hover:bg-teal-600 disabled:opacity-40 text-white text-xs font-black rounded-lg transition-all"
                >
                  {addNoteSaving ? '…' : 'Save'}
                </button>
              </div>
            )}
          </div>
        </div>
      );
    }

    if (subTab === 'answers') {
      // For 2-session and 5-session: read AK directly from embedded slot data.
      // For 3-session: use the by_session split.
      const activeSessions = getActiveSessions();
      let akGroups;
      if (sessionsPerWeek === 3) {
        const akBySession = weekData?.answer_key_by_session || {};
        akGroups = [
          { label: 'Session 1 — Answer Key', lines: akBySession.s1 || [] },
          { label: 'Session 2 — Answer Key', lines: akBySession.s2 || [] },
          { label: 'Session 3 — Answer Key', lines: akBySession.s3 || [] },
        ];
      } else {
        // 2-session and 5-session: use per-slot embedded answer_key
        akGroups = activeSessions.map((s, i) => ({
          label: `${s.session_label.split('—').slice(0, 2).join('—').trim()} — Answer Key`,
          lines: s.answer_key || [],
        }));
      }
      const visibleAk = akGroups.filter(g => g.lines.length > 0);
      // Fallback: if no per-session AK found (e.g. W25 inline only), show full AK
      const fallbackAk = weekData?.answer_key || [];
      return (
        <div className="space-y-3">
          {visibleAk.length > 0
            ? visibleAk.map((grp, gi) => (
                <LPSection key={gi} title={`✅ ${grp.label}`}>
                  {grp.lines.map((line, i) => (
                    <p key={i} className="text-sm text-gray-200 mb-1.5 leading-relaxed">{line}</p>
                  ))}
                </LPSection>
              ))
            : fallbackAk.length > 0
              ? <LPSection title="✅ Answer Key">
                  {fallbackAk.map((line, i) => (
                    <p key={i} className="text-sm text-gray-200 mb-1.5 leading-relaxed">{line}</p>
                  ))}
                  <p className="text-xs text-yellow-400/70 mt-2 italic">Note: only 1 answer key shared for the whole week.</p>
                </LPSection>
              : <p className="text-gray-500 text-sm py-4">No answer key yet.</p>}
        </div>
      );
    }

    if (subTab === 'taskcards') {
      // For 2-session and 5-session: read TC directly from embedded slot data (no S1/S2/S3 labels).
      // For 3-session: use the by_session split.
      const activeSessions = getActiveSessions();
      let tcGroups;
      if (sessionsPerWeek === 3) {
        const tcBySession = weekData?.task_cards_by_session || {};
        tcGroups = [
          { label: 'Session 1 — Task Cards', lines: tcBySession.s1 || [] },
          { label: 'Session 2 — Task Cards', lines: tcBySession.s2 || [] },
          { label: 'Session 3 — Task Cards', lines: tcBySession.s3 || [] },
        ].filter(g => g.lines.length > 0);
      } else {
        tcGroups = activeSessions
          .map((s, i) => ({
            label: `${s.session_label.split('—').slice(0, 2).join('—').trim()} — Task Cards`,
            lines: s.task_cards || [],
          }))
          .filter(g => g.lines.length > 0);
      }
      // Fallback: full task_cards if no split
      if (tcGroups.length === 0 && (weekData?.task_cards || []).length > 0) {
        tcGroups = [{ label: 'Task Cards', lines: weekData.task_cards }];
      }
      return (
        <div className="space-y-3">
          {tcGroups.length > 0
            ? tcGroups.map((grp, gi) => (
                <LPSection key={gi} title={`🃏 ${grp.label}`}>
                  {grp.lines.map((line, i) => (
                    <p key={i} className="text-sm text-gray-200 mb-1.5 leading-relaxed">{line}</p>
                  ))}
                </LPSection>
              ))
            : <p className="text-gray-500 text-sm py-4">No task cards yet.</p>}
        </div>
      );
    }

    if (subTab === 'games') {
      const games = weekData?.games || [];
      return (
        <div className="space-y-4">
          <p className="text-xs text-gray-500 italic pb-1">
            Flexible games for all 3 formats: 2-session / 3-session / 5-session. Teacher chooses the best moment.
          </p>
          {games.length > 0 ? games.map((g, gi) => {
            const gameKey = `${weekData.week}_${gi}`;
            const played  = playedGames[gameKey];
            return (
              <LPSection key={gi} title={`🎮 ${g.name} · ${g.type} · ${g.duration}`}>
                <div className="space-y-2 text-sm">
                  <div className="flex flex-wrap gap-2 mb-3 text-xs items-center">
                    <span className="bg-indigo-900/50 text-indigo-300 px-2 py-0.5 rounded">👥 {g.players}</span>
                    <span className="bg-emerald-900/50 text-emerald-300 px-2 py-0.5 rounded">📅 {g.session_fit}</span>
                    <span className="bg-gray-700 text-gray-300 px-2 py-0.5 rounded">📋 {g.materials}</span>
                    <button
                      onClick={() => markGamePlayed(weekData.week, gi)}
                      className={`ml-auto flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black transition-all ${
                        played
                          ? 'bg-green-700/50 text-green-300 border border-green-600'
                          : 'bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-white border border-gray-600'
                      }`}
                    >
                      <ThumbsUp size={9}/> {played ? 'Played ✓' : 'Mark as played'}
                    </button>
                  </div>
                  <p className="text-xs font-black text-gray-400 uppercase tracking-wider mb-1">Instructions:</p>
                  {g.instructions.map((step, si) => (
                    <p key={si} className="text-gray-300 mb-1"><span className="text-indigo-400 font-bold">{si + 1}.</span> {step}</p>
                  ))}
                </div>
              </LPSection>
            );
          }) : <p className="text-gray-500 text-sm py-4">No games data yet.</p>}
        </div>
      );
    }

    if (subTab === 'audio') {
      const teacherContents = weekData?.teacher_contents || [];
      const audioScripts = weekData?.audio_scripts || [];
      const hasContent = teacherContents.length > 0 || audioScripts.length > 0;
      return (
        <div className="space-y-5">
          <div className="bg-amber-900/30 border border-amber-700/50 rounded-lg p-3 text-xs text-amber-200/80">
            <p className="font-black text-amber-300 mb-1">📋 Teacher's Contents — for classroom use only, do not print in student worksheets</p>
            <p>Includes: listening scripts (read aloud to students), Speaking Checkpoint guidance, STEM/CLIL answer notes, and Section 5–7 activity materials.</p>
          </div>
          {!hasContent ? (
            <div className="text-center py-10 text-gray-500">
              <p className="text-2xl mb-2">📋</p>
              <p className="font-bold text-sm">No teacher content data for this week yet</p>
            </div>
          ) : teacherContents.length > 0 ? (
            teacherContents.map((s, i) => (
              <LPSection key={i} title={`📋 Session ${s.session} — Teacher's Contents`}>
                {s.listening_script && (
                  <div className="mb-5">
                    <p className="text-xs font-black text-amber-400 uppercase tracking-wider mb-2">🎧 Listening Script (Teacher Reads Aloud)</p>
                    {s.listening_script.speed_note && (
                      <p className="text-xs text-yellow-300/80 mb-2 italic">{s.listening_script.speed_note}</p>
                    )}
                    <div className="bg-gray-900/50 rounded-lg p-3 border border-amber-700/40">
                      <p className="text-sm text-gray-200 leading-relaxed whitespace-pre-line">{s.listening_script.text}</p>
                    </div>
                  </div>
                )}
                {s.speaking_notes && (
                  <div className="mb-5">
                    <p className="text-xs font-black text-green-400 uppercase tracking-wider mb-2">🗣️ Speaking Checkpoint — Teacher Notes</p>
                    <div className="bg-green-900/20 rounded-lg p-3 border border-green-700/40">
                      <p className="text-sm text-gray-200 leading-relaxed whitespace-pre-line">{s.speaking_notes}</p>
                    </div>
                  </div>
                )}
                {s.stem_extension && (
                  <div>
                    <p className="text-xs font-black text-blue-400 uppercase tracking-wider mb-2">🔬 STEM/CLIL Extension — Answer Guide</p>
                    <div className="bg-blue-900/20 rounded-lg p-3 border border-blue-700/40">
                      <p className="text-sm text-gray-200 leading-relaxed whitespace-pre-line">{s.stem_extension}</p>
                    </div>
                  </div>
                )}
                {s.in_class_speaking && (
                  <div className="mt-5">
                    <p className="text-xs font-black text-purple-400 uppercase tracking-wider mb-2">🗣️ In-Class Speaking Activities</p>
                    <div className="bg-purple-900/20 rounded-lg p-3 border border-purple-700/40">
                      <p className="text-sm text-gray-200 leading-relaxed whitespace-pre-line">{s.in_class_speaking}</p>
                    </div>
                  </div>
                )}
                {s.vc_answer_key && (
                  <div className="mt-5">
                    <p className="text-xs font-black text-orange-400 uppercase tracking-wider mb-2">🎥 Video Challenge — Answer Key (Teacher Only)</p>
                    <div className="bg-orange-900/20 rounded-lg p-3 border border-orange-700/40">
                      <p className="text-sm text-gray-200 leading-relaxed font-mono">{s.vc_answer_key}</p>
                    </div>
                  </div>
                )}
              </LPSection>
            ))
          ) : (
            audioScripts.map((s, i) => (
              <LPSection key={i} title={`🎧 Session ${s.session} — Audio Script`}>
                {s.speed_note && (
                  <p className="text-xs text-yellow-300/80 mb-3 font-medium">{s.speed_note}</p>
                )}
                {s.listening_text && (
                  <div className="mb-4">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-wider mb-2">Listening Text</p>
                    <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-600">
                      <p className="text-sm text-gray-200 leading-relaxed">{s.listening_text}</p>
                    </div>
                  </div>
                )}
                {s.dictation && s.dictation.length > 0 && (
                  <div>
                    <p className="text-xs font-black text-gray-400 uppercase tracking-wider mb-2">Dictation Sentences</p>
                    <div className="space-y-1">
                      {s.dictation.map((sentence, j) => (
                        <div key={j} className="flex items-start gap-2 bg-gray-700/30 rounded px-3 py-2">
                          <span className="text-indigo-400 font-bold text-xs w-4 shrink-0">{j + 1}.</span>
                          <p className="text-sm text-gray-200">&ldquo;{sentence}&rdquo;</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </LPSection>
            ))
          )}
        </div>
      );
    }

    if (subTab === 'videos') {
      const vp = weekData?.video_prompts || {};
      const chanting = vp.chanting || [];
      const shadowing = vp.shadowing || [];
      const hasContent = chanting.length > 0 || shadowing.length > 0;
      return (
        <div className="space-y-5">
          <div className="bg-gray-700/40 rounded-lg p-3 text-xs text-gray-400 border border-gray-600">
            <p className="font-bold text-gray-300 mb-1">🎬 Video lesson recording guide</p>
            <p>Use the scripts/prompts below to record Chanting and Shadowing videos for this week. Videos don't need to be long — just 2–5 minutes each. After uploading to YouTube (unlisted) or Google Drive, paste the link into the LMS for students to watch.</p>
          </div>
          {!hasContent && (
            <div className="text-center py-10 text-gray-500">
              <p className="text-2xl mb-2">🎬</p>
              <p className="font-bold text-sm">No scripts for this week yet</p>
              <p className="text-xs mt-1 text-gray-600">Video prompts will be added to the week's JSON file. Contact admin to update.</p>
            </div>
          )}
          {chanting.length > 0 && (
            <LPSection title="🎵 Chanting Video — Script & Prompts">
              <p className="text-xs text-indigo-300 mb-3">Read/chant rhythmically. Record a short 2–3 min clip. Students will watch and read along.</p>
              {chanting.map((item, i) => (
                <div key={i} className="mb-3 bg-gray-700/30 rounded-md p-3">
                  {item.title && <p className="text-xs font-black text-yellow-300 mb-1">{item.title}</p>}
                  {item.script && (
                    <pre className="text-xs text-gray-200 whitespace-pre-wrap leading-relaxed font-mono bg-gray-900/40 rounded p-2">{item.script}</pre>
                  )}
                  {item.notes && <p className="text-[10px] text-gray-500 mt-2 italic">💡 {item.notes}</p>}
                </div>
              ))}
            </LPSection>
          )}
          {shadowing.length > 0 && (
            <LPSection title="🔊 Shadowing Video — Script & Prompts">
              <p className="text-xs text-emerald-300 mb-3">Read example sentences clearly. Students listen and repeat (shadowing). Say each sentence twice.</p>
              {shadowing.map((item, i) => (
                <div key={i} className="mb-3 bg-gray-700/30 rounded-md p-3">
                  {item.title && <p className="text-xs font-black text-emerald-300 mb-1">{item.title}</p>}
                  {item.sentences && (
                    <div className="space-y-1">
                      {item.sentences.map((s, j) => (
                        <p key={j} className="text-xs text-gray-200"><span className="text-emerald-500 font-bold w-5 inline-block">{j+1}.</span> {s}</p>
                      ))}
                    </div>
                  )}
                  {item.script && (
                    <pre className="text-xs text-gray-200 whitespace-pre-wrap leading-relaxed font-mono bg-gray-900/40 rounded p-2">{item.script}</pre>
                  )}
                  {item.notes && <p className="text-[10px] text-gray-500 mt-2 italic">💡 {item.notes}</p>}
                </div>
              ))}
            </LPSection>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="flex h-full overflow-hidden">
      {/* Left: Week selector */}
      <div className="w-60 bg-gray-800 border-r border-gray-700 overflow-y-auto shrink-0">
        {/* Class date indicator */}
        <div className="px-4 pt-3 pb-1 flex items-center justify-between">
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Select Week</p>
          {api && !editingClassDate && (
            <button
              onClick={() => setEditingClassDate(true)}
              className="text-[9px] text-violet-400 hover:text-violet-300 font-bold transition-colors"
              title="Set class start date to highlight your current teaching week"
            >
              {classStartDate ? `📌 W${currentClassWeek} now` : '+ Set class date'}
            </button>
          )}
        </div>
        {editingClassDate && (
          <div className="px-3 pb-2 space-y-1">
            <div className="flex items-center gap-1.5">
              <input
                type="date" value={classDateInput}
                onChange={e => { setClassDateInput(e.target.value); setSaveDateError(''); }}
                className="flex-1 bg-gray-700 border border-violet-500 text-white text-xs rounded-md px-2 py-1 focus:outline-none"
              />
              <button onClick={handleSaveClassDate} disabled={savingClassDate} className="px-2 py-1 bg-violet-600 hover:bg-violet-700 disabled:opacity-40 text-white text-xs font-bold rounded-md">{savingClassDate ? '…' : '✓'}</button>
              <button onClick={() => { setEditingClassDate(false); setSaveDateError(''); }} className="text-gray-500 hover:text-white"><X size={12}/></button>
            </div>
            {saveDateError && <p className="text-[10px] text-red-400 pl-1">{saveDateError}</p>}
          </div>
        )}
        {/* Search filter */}
        <div className="px-3 pb-2">
          <div className="flex items-center gap-1.5 bg-gray-700 rounded-lg px-2.5 py-1.5">
            <Search size={11} className="text-gray-500 shrink-0"/>
            <input
              type="text"
              value={lpSearch}
              onChange={e => setLpSearch(e.target.value)}
              placeholder="Search week / topic…"
              className="flex-1 bg-transparent text-[11px] text-white placeholder-gray-500 outline-none"
            />
            {lpSearch && (
              <button onClick={() => setLpSearch('')} className="text-gray-500 hover:text-white">
                <X size={10}/>
              </button>
            )}
          </div>
        </div>
        {loadingLP && <p className="text-xs text-gray-500 px-4 animate-pulse">Loading...</p>}
        {loadError  && <p className="text-xs text-red-400 px-4">⚠ Failed to load.</p>}
        {BLOCKS.map(blk => {
          const filteredWeeks = blk.weeks.filter(w => lpAvailable.has(w) ? matchesSearch(w) : !searchLower);
          if (searchLower && filteredWeeks.length === 0) return null;
          return (
          <div key={blk.label}>
            <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest px-4 pt-3 pb-1">{blk.label}</p>
            <div className="grid grid-cols-4 gap-1 px-3 pb-1">
              {(searchLower ? filteredWeeks : blk.weeks).map(w => {
                const avail = lpAvailable.has(w);
                const sel   = selectedWeek === w;
                const isCurrent = currentClassWeek === w && avail;
                return (
                  <button
                    key={w}
                    disabled={!avail}
                    onClick={() => avail && setSelectedWeek(w)}
                    title={isCurrent ? `Week ${w} — Current class week` : avail ? `Week ${w}` : `Week ${w} — coming soon`}
                    className={`rounded-md py-1.5 text-xs font-bold transition-all ${
                      sel       ? 'bg-indigo-600 text-white' :
                      isCurrent ? 'bg-violet-700 text-violet-100 ring-1 ring-violet-400' :
                      avail     ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' :
                                  'bg-gray-700/30 text-gray-600 cursor-not-allowed'
                    }`}
                  >
                    {avail ? w : <Lock size={9} className="mx-auto opacity-50"/>}
                  </button>
                );
              })}
            </div>
          </div>
          );
        })}
      </div>

      {/* Right: content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {!selectedWeek && (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <Book size={48} className="mb-3 opacity-20"/>
            <p className="font-bold text-sm">Select a week to view the lesson plan</p>
            <p className="text-[11px] mt-1 text-gray-600">{lpAvailable.size} weeks available · W1–{lpAvailable.size > 0 ? Math.max(...lpAvailable) : '…'} updating progressively</p>
          </div>
        )}

        {selectedWeek && !weekData && (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 px-6 text-center">
            {typeof loadError === 'string' && loadError ? (
              <>
                <Lock size={40} className="mb-3 text-amber-500 opacity-60"/>
                <p className="font-bold text-sm text-amber-400">Week not unlocked</p>
                <p className="text-[11px] mt-1 text-gray-400 max-w-xs">{loadError}</p>
              </>
            ) : loadingLP ? (
              <p className="text-sm animate-pulse">Loading week {selectedWeek}…</p>
            ) : (
              <>
                <Lock size={40} className="mb-3 opacity-30"/>
                <p className="font-bold text-sm">Week {selectedWeek} — Coming soon</p>
                <p className="text-[11px] mt-1 text-gray-600">Content will be added in the next update</p>
              </>
            )}
          </div>
        )}

        {selectedWeek && weekData && (
          <>
            {/* Week Header */}
            <div className="shrink-0 bg-gray-800 border-b border-gray-700 px-5 py-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-black text-indigo-400 uppercase tracking-wider">WEEK {weekData.week} — BLOCK {weekData.block}</p>
                  <h3 className="text-base font-black text-white mt-0.5 leading-snug">{weekData.unit_theme || weekData.header}</h3>
                  {weekData.quick_ref?.['Grammar Focus'] && (
                    <p className="text-[11px] text-emerald-300 mt-1">📌 {weekData.quick_ref['Grammar Focus']}</p>
                  )}
                </div>
                <button
                  onClick={() => {
                    const win = window.open('', '_blank', 'width=960,height=800');
                    if (!win) return;
                    const esc = (s) => String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
                    const activeSess = getActiveSessions();
                    const akBySession = weekData.answer_key_by_session || {};
                    const tcBySession = weekData.task_cards_by_session || {};

                    // Build vocab table rows
                    const vocabRows = (weekData.vocab_tiers||[]).map(v =>
                      `<tr><td><strong>${esc(v.Word)}</strong></td><td>${esc(v.Vietnamese)}</td><td>${esc(v['Key Collocation(s)'])}</td><td>${esc(v['Memory Trick'])}</td></tr>`
                    ).join('');

                    // Build methodology section
                    const methodHTML = (weekData.methodology||[]).map(m =>
                      `<h3 class="method-title">${esc(m.title)}</h3>${(m.content||[]).map(c=>`<p>${esc(c)}</p>`).join('')}`
                    ).join('');

                    // Build session sections
                    const sessionHTML = activeSess.map((s, i) => {
                      const sessKey = `s${i+1}`;
                      const ak = akBySession[sessKey] || [];
                      const tc = tcBySession[sessKey] || [];
                      const partsHTML = (s.parts||[]).map(p =>
                        `<div class="part"><h4>${esc(p.title)}</h4>${(p.content||[]).map(c=>`<p>${esc(c)}</p>`).join('')}</div>`
                      ).join('');
                      const akHTML = ak.length ? `<div class="ak-box"><h4>📝 Answer Key — Session ${i+1}</h4>${ak.map(l=>`<p>${esc(l)}</p>`).join('')}</div>` : '';
                      const tcHTML = tc.length ? `<div class="tc-box"><h4>🃏 Task Cards — Session ${i+1}</h4>${tc.map(l=>`<p>${esc(l)}</p>`).join('')}</div>` : '';
                      return `<div class="session-block page-break"><div class="session-header">SESSION ${i+1}: ${esc(s.session_label||'')}</div>${partsHTML}${akHTML}${tcHTML}</div>`;
                    }).join('');

                    // Flat AK/TC (fallback for non-session-split data)
                    const flatAK = (weekData.answer_key||[]).filter(Boolean);
                    const flatTC = (weekData.task_cards||[]).filter(Boolean);
                    const hasPerSessionAK = Object.values(akBySession).some(v => v.length > 0);
                    const hasPerSessionTC = Object.values(tcBySession).some(v => v.length > 0);
                    const flatAKHTML = (!hasPerSessionAK && flatAK.length) ? `<div class="ak-box page-break"><h2>📝 Answer Key</h2>${flatAK.map(l=>`<p>${esc(l)}</p>`).join('')}</div>` : '';
                    const flatTCHTML = (!hasPerSessionTC && flatTC.length) ? `<div class="tc-box page-break"><h2>🃏 Task Cards</h2>${flatTC.map(l=>`<p>${esc(l)}</p>`).join('')}</div>` : '';

                    const qrEntries = Object.entries(weekData.quick_ref||{});
                    const html = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Week ${esc(weekData.week)} — ${esc(weekData.unit_theme||weekData.header)}</title><style>
@page { size: A4; margin: 18mm 15mm; }
body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 11pt; color: #1a1a2e; margin: 0; }
.watermark { position: fixed; top: 50%; left: 50%; transform: translate(-50%,-50%) rotate(-35deg); font-size: 56pt; font-weight: 900; color: rgba(99,102,241,0.07); white-space: nowrap; pointer-events: none; z-index: 0; letter-spacing: 4px; }
.content { position: relative; z-index: 1; }
.cover { text-align: center; padding: 32px 0 24px; border-bottom: 3px solid #6366f1; margin-bottom: 20px; }
.cover .week-badge { background: #6366f1; color: #fff; display: inline-block; padding: 4px 14px; border-radius: 20px; font-size: 9pt; font-weight: 700; letter-spacing: 1px; margin-bottom: 10px; }
.cover h1 { font-size: 22pt; margin: 6px 0; color: #1a1a2e; }
.cover .sub { font-size: 11pt; color: #555; margin-top: 6px; }
.quick-ref { display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px 16px; background: #f5f3ff; border-radius: 8px; padding: 12px 16px; margin-bottom: 20px; }
.quick-ref .qr-item { font-size: 9.5pt; } .quick-ref .qr-label { font-weight: 700; color: #6366f1; } 
h2 { font-size: 14pt; color: #6366f1; border-bottom: 2px solid #e0e7ff; padding-bottom: 4px; margin-top: 22px; margin-bottom: 8px; }
h3.method-title { font-size: 11.5pt; color: #4338ca; margin: 12px 0 4px; }
p { margin: 3px 0 5px; line-height: 1.55; }
table.vocab { width: 100%; border-collapse: collapse; margin: 10px 0; font-size: 9.5pt; }
table.vocab th { background: #6366f1; color: #fff; padding: 6px 8px; text-align: left; }
table.vocab td { border: 1px solid #d1d5db; padding: 5px 8px; vertical-align: top; }
table.vocab tr:nth-child(even) td { background: #f5f3ff; }
.session-block { margin-top: 22px; }
.session-header { background: #1a1a2e; color: #fff; padding: 8px 14px; border-radius: 6px; font-size: 12pt; font-weight: 700; letter-spacing: 0.5px; margin-bottom: 10px; }
.part { margin-bottom: 10px; }
.part h4 { background: #e0e7ff; color: #3730a3; padding: 4px 10px; border-left: 4px solid #6366f1; margin: 8px 0 4px; font-size: 10pt; }
.ak-box { background: #f0fdf4; border: 1px solid #86efac; border-radius: 6px; padding: 10px 14px; margin-top: 14px; }
.ak-box h4 { color: #15803d; margin: 0 0 6px; font-size: 10pt; }
.tc-box { background: #fff7ed; border: 1px solid #fdba74; border-radius: 6px; padding: 10px 14px; margin-top: 10px; }
.tc-box h4 { color: #c2410c; margin: 0 0 6px; font-size: 10pt; }
.page-break { page-break-before: always; }
footer { position: fixed; bottom: 0; left: 0; right: 0; text-align: center; font-size: 7.5pt; color: #9ca3af; padding: 6px; border-top: 1px solid #e5e7eb; }
@media print { .no-print { display: none; } }
</style></head><body>
<div class="watermark">EngQuest</div>
<div class="content">
<div class="cover">
  <div class="week-badge">WEEK ${esc(weekData.week)} · BLOCK ${esc(weekData.block||'')}</div>
  <h1>${esc(weekData.unit_theme||weekData.header)}</h1>
  <div class="sub">${esc(weekData.header||'')} &nbsp;|&nbsp; EngQuest · engquest.vn</div>
</div>
${qrEntries.length ? `<div class="quick-ref">${qrEntries.map(([k,v])=>`<div class="qr-item"><span class="qr-label">${esc(k)}:</span> ${esc(v)}</div>`).join('')}</div>` : ''}
${methodHTML ? `<h2>📚 Methodology</h2>${methodHTML}` : ''}
${vocabRows ? `<h2>📖 Vocabulary</h2><table class="vocab"><thead><tr><th>Word</th><th>Vietnamese</th><th>Collocations</th><th>Memory Trick</th></tr></thead><tbody>${vocabRows}</tbody></table>` : ''}
${sessionHTML}
${flatAKHTML}
${flatTCHTML}
</div>
<footer>EngQuest · engquest.vn &nbsp;|&nbsp; Week ${esc(weekData.week)} — ${esc(weekData.unit_theme||'')} &nbsp;|&nbsp; Printed ${new Date().toLocaleDateString('vi-VN')}</footer>
</body></html>`;
                    win.document.write(html);
                    win.document.close();
                    setTimeout(() => win.print(), 600);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-xs font-bold rounded-lg shrink-0 ml-4 transition-all"
                >
                  <Printer size={12}/> Print Week
                </button>
              </div>
            </div>

            {/* Sessions-per-week selector inside Lesson Plan tab */}
            {setSessionsPerWeek && (
              <div className="flex items-center gap-1.5 px-4 py-2 border-b border-gray-700 shrink-0 bg-gray-850">
                <span className="text-[10px] text-gray-500 font-bold mr-1">Sessions/wk:</span>
                {[2, 3, 5].map(n => (
                  <button
                    key={n}
                    onClick={() => { setSessionsPerWeek(n); setSubTab('overview'); }}
                    className={`w-7 h-7 rounded-md text-xs font-black transition-all ${sessionsPerWeek === n ? 'bg-violet-600 text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-white'}`}
                  >{n}</button>
                ))}
              </div>
            )}
            {/* Sub-tab bar */}
            <div className="flex border-b border-gray-700 shrink-0 overflow-x-auto bg-gray-850">
              {activeSubTabs.map(t => {
                const sessM = t.key.match(/^session(\d+)$/);
                const _acts = getActiveSessions();
                const hasData = sessM
                  ? !!getSessionByIndex(parseInt(sessM[1]) - 1)
                  : (t.key === 'vocab' && weekData.vocab_tiers?.length > 0) ||
                    (t.key === 'answers' && (weekData.answer_key?.length > 0 || _acts.some(s => (s.answer_key||[]).length > 0) || Object.values(weekData.answer_key_by_session||{}).some(v=>v.length>0))) ||
                    (t.key === 'taskcards' && (weekData.task_cards?.length > 0 || _acts.some(s => (s.task_cards||[]).length > 0) || Object.values(weekData.task_cards_by_session||{}).some(v=>v.length>0))) ||
                    (t.key === 'method' && weekData.methodology?.length > 0) ||
                    (t.key === 'games' && weekData.games?.length > 0) ||
                    (t.key === 'videos' && (weekData.video_prompts?.chanting?.length > 0 || weekData.video_prompts?.shadowing?.length > 0)) ||
                    t.key === 'overview';
                return (
                  <button
                    key={t.key}
                    onClick={() => setSubTab(t.key)}
                    className={`flex items-center gap-1 px-4 py-2.5 text-[11px] font-bold whitespace-nowrap transition-all border-b-2 ${
                      subTab === t.key ? 'border-indigo-400 text-indigo-300' :
                      hasData ? 'border-transparent text-gray-400 hover:text-gray-200' :
                               'border-transparent text-gray-600'
                    }`}
                  >
                    {t.label}
                    {!hasData && <Lock size={9} className="opacity-40"/>}
                  </button>
                );
              })}
            </div>

            {/* Sub-tab content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {renderSubTab()}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Tab: Content Pack / Bài giảng (Sprint T4-B) ────────────────────────────

// Compute max lesson week allowed by subscription (FIRST_WEEK = 25)
const FIRST_LESSON_WEEK = 25;
function computeMaxAllowedWeek(user) {
  if (!user) return FIRST_LESSON_WEEK + 1; // no user  = minimal access (2 free-trial weeks)
  const { role, plan_months: planMonths, plan_expires_at: planExpires } = user;
  if (['admin', 'super_admin'].includes(role)) return 9999;
  const MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000;
  const now = Date.now();
  if (planExpires && new Date(planExpires) > new Date(now)) {
    let planWeeks;
    if (planMonths != null) {
      planWeeks = Math.floor(Number(planMonths) * 4.33);
    } else {
      // Legacy: no plan_months → derive from remaining time
      planWeeks = Math.max(1, Math.floor((new Date(planExpires) - now) / MS_PER_WEEK));
    }
    return FIRST_LESSON_WEEK + Math.max(planWeeks, 1) - 1;
  }
  // No active plan / expired → free trial: 2 weeks
  return FIRST_LESSON_WEEK + 2 - 1;
}

function TabContentPack({ students, teacherAPI: api, sessionsPerWeek, setSessionsPerWeek }) {
  const currentUser = useUserStore(s => s.currentUser);
  const maxSubWeek = computeMaxAllowedWeek(currentUser);

  const [classStartDate, setClassStartDate] = useState('');
  const [editingDate, setEditingDate]       = useState(false);
  const [inputDate, setInputDate]           = useState('');
  const [savingDate, setSavingDate]         = useState(false);
  const [lpIndex, setLpIndex]           = useState(null);   // { "25": {week,unit_theme}, ... }
  const [weekCache, setWeekCache]       = useState({});      // { "25": fullWeekData, ... }
  const [loadingLP, setLoadingLP]       = useState(false);
  const [loadingWeek, setLoadingWeek]   = useState(null);    // week number being fetched
  const [expandedWeek, setExpandedWeek] = useState(null);
  // Track delivered sessions: { "25_0": true, "25_1": true, ... } key = weekNum_sessIdx
  const [deliveredSessions, setDeliveredSessions] = useState(() => {
    try { return JSON.parse(localStorage.getItem('tpDeliveredSessions') || '{}'); } catch { return {}; }
  });
  // Inline expansion of AK/TC per session row: { key: "weekNum_sessIdx_ak" | "weekNum_sessIdx_tc" }
  const [expandedInfo, setExpandedInfo] = useState(null); // "weekNum_idx_ak" or "weekNum_idx_tc"

  const toggleInfo = (weekNum, idx, type) => {
    const key = `${weekNum}_${idx}_${type}`;
    setExpandedInfo(prev => (prev === key ? null : key));
  };

  const toggleDelivered = (weekNum, sessIdx) => {
    const key = `${weekNum}_${sessIdx}`;
    const updated = { ...deliveredSessions, [key]: !deliveredSessions[key] };
    setDeliveredSessions(updated);
    localStorage.setItem('tpDeliveredSessions', JSON.stringify(updated));
  };

  // Load teacher's class_start_date
  useEffect(() => {
    api.getClassSettings()
      .then(r => {
        const d = r.data?.class_start_date || '';
        setClassStartDate(d);
        setInputDate(d);
      })
      .catch(() => {});
  }, []);

  // Lazy-load index (tiny, ~2KB) on mount
  const ensureLP = () => {
    if (lpIndex || loadingLP) return;
    setLoadingLP(true);
    (api?.getLessonsIndex ? api.getLessonsIndex().then(r => r.data) : fetch('/data/lessonPlans_index.json').then(r => r.json()))
      .then(d => setLpIndex(d))
      .catch(() => setLpIndex({}))
      .finally(() => setLoadingLP(false));
  };

  // Fetch a single week's full data on demand (authenticated)
  const loadWeek = (wnum) => {
    const key = String(wnum);
    if (weekCache[key] || loadingWeek === wnum) return;
    setLoadingWeek(wnum);
    (api?.getLessonWeek ? api.getLessonWeek(wnum).then(r => r.data) : fetch(`/data/lessons/W${key}.json`).then(r => r.ok ? r.json() : null))
      .then(d => { if (d) setWeekCache(c => ({ ...c, [key]: d })); })
      .catch(() => {})
      .finally(() => setLoadingWeek(null));
  };

  // Unlock logic: week N unlocks when class_start_date + (N-1)*7 <= today
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const getWeekStatus = (weekNum) => {
    // Subscription gate: check before class-date gate
    if (weekNum > maxSubWeek) return 'sub_locked';
    if (!classStartDate) return 'no_date';
    const start = new Date(classStartDate);
    start.setHours(0, 0, 0, 0);
    const unlockDate = new Date(start.getTime() + (weekNum - 1) * 7 * 24 * 60 * 60 * 1000);
    const diff = Math.ceil((unlockDate - today) / (24 * 60 * 60 * 1000)); // days until unlock
    if (today >= unlockDate) return 'unlocked';
    if (diff <= 7) return `soon_${diff}`; // unlocks within 7 days
    return 'locked';
  };

  // Class stats for a given week
  const classStats = (weekNum) => {
    const active = students.filter(s => (s.current_week || 1) >= weekNum).length;
    return { active, total: students.length };
  };

  // Weeks that exist in our lesson plan data
  const availableWeeks = lpIndex ? Object.keys(lpIndex).map(Number).sort((a, b) => a - b) : [];

  // Compute current class week
  const currentWeek = (() => {
    if (!classStartDate) return null;
    const start = new Date(classStartDate);
    start.setHours(0, 0, 0, 0);
    const elapsed = Math.floor((today - start) / (7 * 24 * 60 * 60 * 1000));
    return Math.max(1, elapsed + 1);
  })();

  const handleSaveDate = async () => {
    if (!inputDate) return;
    setSavingDate(true);
    try {
      await api.saveClassSettings(inputDate);
      setClassStartDate(inputDate);
      setEditingDate(false);
      ensureLP();
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || 'Unknown error';
      alert('Save failed: ' + msg);
      console.error('saveClassSettings error:', err);
    } finally {
      setSavingDate(false);
    }
  };

  const handlePrintSession = (weekD, sessNum) => {
    if (!weekD) return;
    const sess = weekD.sessions?.find(s => s.session === sessNum);
    if (!sess) return;
    const sessLabel = sess.session_label || `Session ${sessNum}`;
    const label = `W${weekD.week} — ${weekD.unit_theme || ''} · ${sessLabel}`;
    const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>${label}</title>
<style>
  body{font-family:Arial,sans-serif;font-size:13px;color:#111;max-width:800px;margin:40px auto;padding:0 30px}
  h1{font-size:17px;font-weight:900;border-bottom:2px solid #333;padding-bottom:6px;margin-bottom:16px}
  h2{font-size:13px;font-weight:800;background:#f0f0f0;padding:4px 8px;border-left:3px solid #555;margin:18px 0 4px;page-break-after:avoid}
  p{margin:3px 0 3px 12px;line-height:1.6}
  .stage{color:#7c3aed;font-weight:bold;margin-top:10px}
  .arrow{color:#2563eb;margin-left:20px}
  .watermark{font-size:10px;color:#aaa;text-align:center;margin-top:40px;border-top:1px solid #eee;padding-top:8px}
  @media print{body{margin:20px;-webkit-print-color-adjust:exact}h2{page-break-after:avoid}}
</style></head><body>
<h1>LESSON PLAN — ${label}</h1>
${(sess.parts || []).map(p => `
  <h2>${p.title.replace(/^\[.\]\s*/,'')}</h2>
  ${(p.content || []).map(line =>
    `<p class="${line.startsWith('Stage') ? 'stage' : line.startsWith('\u2192') ? 'arrow' : ''}">${line.replace(/</g,'&lt;')}</p>`
  ).join('')}
`).join('')}
<div class="watermark">engquest.vn \u00b7 For teachers only \u00b7 Do not distribute</div>
</body></html>`;
    const win = window.open('', '_blank', 'width=850,height=700');
    win.document.write(html);
    win.document.close();
    setTimeout(() => win.print(), 500);
  };

  // Trigger LP load on mount
  useEffect(() => { ensureLP(); }, []);

  // ── Render ──────────────────────────────────────────────────────────────
  return (
    <div className="h-full overflow-y-auto p-6 space-y-5">

      {/* Header + date picker */}
      <div className="bg-gray-800 rounded-xl p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-black text-white text-base flex items-center gap-2">
              <BookOpen size={16} className="text-violet-400"/> Lesson Pack — Schedule View
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">Your class calendar: lessons auto-unlock week by week based on your class start date.</p>
            <p className="text-[11px] text-gray-500 mt-1">Set the start date once → the system calculates which week your class is on and unlocks content accordingly. Mark sessions ✅ as delivered to track progress. Use AK / TC buttons to quickly review answer keys and task cards without switching tabs.</p>
          </div>
          {!editingDate ? (
            <button
              onClick={() => { setEditingDate(true); setInputDate(classStartDate); }}
              className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-xs font-bold rounded-lg transition-all"
            >
              <Clock size={12}/>
              {classStartDate
                ? `Class started: ${new Date(classStartDate).toLocaleDateString('en-GB')}`
                : 'Set class start date'}
            </button>
          ) : (
            <div className="flex items-center gap-2 shrink-0">
              <input
                type="date"
                value={inputDate}
                onChange={e => setInputDate(e.target.value)}
                className="bg-gray-700 border border-violet-500 text-white rounded-lg px-3 py-1.5 text-sm focus:outline-none"
              />
              <button
                onClick={handleSaveDate}
                disabled={savingDate || !inputDate}
                className="px-3 py-1.5 bg-violet-600 hover:bg-violet-700 disabled:opacity-40 text-white text-xs font-bold rounded-lg transition-all"
              >
                {savingDate ? '...' : 'Save'}
              </button>
              <button onClick={() => setEditingDate(false)} className="text-gray-500 hover:text-white transition-colors">
                <X size={16}/>
              </button>
            </div>
          )}
        </div>

        {currentWeek && (
          <div className="mt-3 flex items-center gap-3 flex-wrap">
            <div className="bg-violet-900/40 border border-violet-700 rounded-lg px-4 py-2 text-sm font-black text-violet-200">
              Current class week: <span className="text-violet-100">W{currentWeek}</span>
            </div>
            <p className="text-xs text-gray-500">{students.length} student{students.length !== 1 ? 's' : ''}</p>
            {/* Sessions per week selector */}
            <div className="ml-auto flex items-center gap-1.5">
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Sessions/week:</span>
              {[2, 3, 5].map(n => (
                <button
                  key={n}
                  onClick={() => setSessionsPerWeek(n)}
                  className={`w-7 h-7 rounded-md text-xs font-black transition-all ${sessionsPerWeek === n ? 'bg-violet-600 text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-white'}`}
                >{n}</button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* No date set */}
      {!classStartDate && (
        <div className="bg-gray-800 rounded-xl p-8 text-center">
          <Lock size={32} className="text-gray-600 mx-auto mb-3"/>
          <p className="text-gray-400 font-bold">Set class start date to unlock lessons</p>
          <p className="text-gray-600 text-xs mt-1">Lessons will unlock automatically by class week</p>
        </div>
      )}

      {/* Loading */}
      {classStartDate && loadingLP && (
        <p className="text-gray-500 text-sm animate-pulse text-center py-8">Loading lesson data...</p>
      )}

      {/* Week cards */}
      {classStartDate && !loadingLP && availableWeeks.map(weekNum => {
        const status = getWeekStatus(weekNum);
        const indexEntry = lpIndex?.[String(weekNum)];
        if (!indexEntry) return null;

        const isCurrentWeek = weekNum === currentWeek;
        const isUnlocked = status === 'unlocked';
        const isSoon = status.startsWith('soon_');
        const daysUntil = isSoon ? parseInt(status.split('_')[1]) : null;
        const isLocked = status === 'locked';
        const isSubLocked = status === 'sub_locked';
        const stats = classStats(weekNum);
        const isExpanded = expandedWeek === weekNum;
        const wd = weekCache[String(weekNum)]; // full data, loaded on expand

        if (isLocked && !isCurrentWeek) return null; // only show class-time locked if it's close
        if (isSubLocked) return (
          <div key={weekNum} className="rounded-xl border border-gray-700/50 bg-gray-800/30 overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-3">
              <span className="text-lg leading-none opacity-30">🔐</span>
              <div className="flex-1 min-w-0">
                <span className="text-sm font-black text-gray-600">Week {weekNum}</span>
                <p className="text-[11px] text-gray-700 truncate">{indexEntry.unit_theme || '—'}</p>
              </div>
              <span className="text-[10px] bg-rose-900/30 text-rose-400 px-2 py-1 rounded-full font-bold shrink-0">
                Upgrade plan to unlock
              </span>
            </div>
          </div>
        );

        return (
          <div
            key={weekNum}
            className={`rounded-xl border overflow-hidden ${
              isCurrentWeek ? 'border-violet-600 bg-gray-800' :
              isUnlocked    ? 'border-gray-600 bg-gray-800' :
                              'border-gray-700 bg-gray-800/50'
            }`}
          >
            {/* Week header row */}
            <button
              onClick={() => {
                if (!isUnlocked && !isCurrentWeek) return;
                const next = isExpanded ? null : weekNum;
                setExpandedWeek(next);
                if (next) loadWeek(next);
              }}
              className="w-full flex items-center gap-3 px-5 py-3.5 text-left"
            >
              {/* Status badge */}
              <span className={`text-lg leading-none shrink-0 ${isLocked || isSoon ? 'opacity-40' : ''}`}>
                {isCurrentWeek ? '📌' : isUnlocked ? '✅' : isSoon ? '🔒' : '🔒'}
              </span>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-sm font-black ${isUnlocked || isCurrentWeek ? 'text-white' : 'text-gray-500'}`}>
                    Week {weekNum}{isCurrentWeek ? ' — Current' : ''}
                  </span>
                  {wd?.block && (
                    <span className="text-[10px] bg-gray-700 text-gray-400 px-2 py-0.5 rounded-full font-bold">
                      Block {wd.block}
                    </span>
                  )}
                  {isSoon && (
                    <span className="text-[10px] bg-amber-900/40 text-amber-400 px-2 py-0.5 rounded-full font-bold">
                      Unlocks in {daysUntil} day{daysUntil === 1 ? '' : 's'}
                    </span>
                  )}
                </div>
                <p className={`text-xs mt-0.5 truncate ${isUnlocked || isCurrentWeek ? 'text-gray-400' : 'text-gray-600'}`}>
                  {indexEntry.unit_theme || '—'}
                </p>
              </div>

              {/* Class stats */}
              {(isUnlocked || isCurrentWeek) && stats.total > 0 && (
                <div className="shrink-0 text-right">
                  <p className="text-[11px] font-bold text-emerald-400">{stats.active}/{stats.total} on track</p>
                </div>
              )}

              {(isUnlocked || isCurrentWeek) && (
                <ChevronDown size={14} className={`text-gray-500 shrink-0 transition-transform ${isExpanded ? 'rotate-180' : ''}`}/>
              )}
            </button>

            {/* Session list (expanded) */}
            {isExpanded && isUnlocked && (() => {
              if (!wd) return (
                <div className="border-t border-gray-700 px-5 py-4 text-gray-500 text-xs animate-pulse">
                  {loadingWeek === weekNum ? 'Loading week data…' : 'Loading…'}
                </div>
              );
              // Use the correct sessions key based on selected sessions/week
              const sessKey = sessionsPerWeek === 2 ? 'sessions_2' : sessionsPerWeek === 5 ? 'sessions_5' : 'sessions';
              const allSessions = wd[sessKey] || wd.sessions || [];
              const displaySessions = allSessions.map((sess, i) => {
                // Resolve AK/TC lines: prefer embedded in session, fallback to by_session map
                const akLines = (sess.answer_key || []).length > 0
                  ? sess.answer_key
                  : (wd.answer_key_by_session?.[`s${i + 1}`] || []);
                const tcLines = (sess.task_cards || []).length > 0
                  ? sess.task_cards
                  : (wd.task_cards_by_session?.[`s${i + 1}`] || []);
                return {
                  label: sess.session_label || `Session ${sess.session || i + 1}`,
                  parts: sess.parts || [],
                  hasData: (sess.parts || []).some(p => (p.content || []).length > 0),
                  akLines,
                  tcLines,
                  printFn: () => {
                    const fake = { ...wd, sessions: [{ session: 1, parts: sess.parts || [] }] };
                    handlePrintSession(fake, 1);
                  },
                };
              });
              return (
                <div className="border-t border-gray-700 divide-y divide-gray-700/50">
                  {displaySessions.map((ds, idx) => {
                    const delivKey  = `${weekNum}_${idx}`;
                    const isDelivered = !!deliveredSessions[delivKey];
                    const akKey = `${weekNum}_${idx}_ak`;
                    const tcKey = `${weekNum}_${idx}_tc`;
                    const akOpen = expandedInfo === akKey;
                    const tcOpen = expandedInfo === tcKey;
                    return (
                    <div key={idx} className="flex flex-col">
                      <div className="px-5 py-3 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-white">{ds.label}</p>
                            <p className="text-[11px] text-gray-500 mt-0.5">
                              {ds.hasData ? `${ds.parts.length} parts` : 'No content yet'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0 flex-wrap justify-end">
                          {/* AK/TC quick-view pills */}
                          {ds.akLines.length > 0 && (
                            <button
                              onClick={() => toggleInfo(weekNum, idx, 'ak')}
                              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-black transition-all border ${
                                akOpen
                                  ? 'bg-violet-700/50 text-violet-200 border-violet-500'
                                  : 'bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-white border-gray-600'
                              }`}
                              title="Show Answer Key"
                            >
                              ✅ AK
                            </button>
                          )}
                          {ds.tcLines.length > 0 && (
                            <button
                              onClick={() => toggleInfo(weekNum, idx, 'tc')}
                              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-black transition-all border ${
                                tcOpen
                                  ? 'bg-amber-700/50 text-amber-200 border-amber-500'
                                  : 'bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-white border-gray-600'
                              }`}
                              title="Show Task Cards"
                            >
                              🃏 TC
                            </button>
                          )}
                          <button
                            onClick={() => toggleDelivered(weekNum, idx)}
                            title={isDelivered ? 'Mark as not taught' : 'Mark as taught'}
                            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-black transition-all border ${
                              isDelivered
                                ? 'bg-green-700/40 text-green-300 border-green-600'
                                : 'bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-white border-gray-600'
                            }`}
                          >
                            <CheckCircle size={10}/> {isDelivered ? 'Taught' : 'Mark'}
                          </button>
                          {ds.hasData && (
                            <button
                              onClick={ds.printFn}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-xs font-bold rounded-lg transition-all"
                            >
                              <Printer size={12}/> Print PDF
                            </button>
                          )}
                        </div>
                      </div>
                      {/* Inline AK expansion */}
                      {akOpen && (
                        <div className="mx-5 mb-3 bg-violet-900/20 border border-violet-700/40 rounded-xl p-3 max-h-60 overflow-y-auto">
                          <p className="text-[10px] font-black text-violet-300 uppercase tracking-wider mb-2">Answer Key — {ds.label}</p>
                          {ds.akLines.map((line, li) => (
                            <p key={li} className="text-xs text-gray-200 mb-1 leading-relaxed">{line}</p>
                          ))}
                        </div>
                      )}
                      {/* Inline TC expansion */}
                      {tcOpen && (
                        <div className="mx-5 mb-3 bg-amber-900/20 border border-amber-700/40 rounded-xl p-3 max-h-60 overflow-y-auto">
                          <p className="text-[10px] font-black text-amber-300 uppercase tracking-wider mb-2">Task Cards — {ds.label}</p>
                          {ds.tcLines.map((line, li) => (
                            <p key={li} className="text-xs text-gray-200 mb-1 leading-relaxed">{line}</p>
                          ))}
                        </div>
                      )}
                    </div>
                    );
                  })}

                  {/* Vocab preview */}
                  {wd.vocab_tiers?.length > 0 && (
                    <div className="px-5 py-3">
                      <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">This week's vocabulary</p>
                      <div className="flex flex-wrap gap-1.5">
                        {wd.vocab_tiers.slice(0, 10).map((v, i) => (
                          <span key={i} className="px-2 py-0.5 bg-gray-700 text-gray-300 text-[11px] rounded font-medium">
                            {v.Word || Object.values(v)[0] || ''}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        );
      })}

      {classStartDate && !loadingLP && availableWeeks.length === 0 && (
        <p className="text-gray-500 text-sm text-center py-8">No lesson data yet.</p>
      )}
    </div>
  );
}

// ─── Main TABS ──────────────────────────────────────────────────────────────

const TABS = [
  { key: 'today',     label: 'Today',       icon: Zap },
  { key: 'overview',  label: 'Overview',    icon: Activity },
  { key: 'mastery',   label: 'Mastery',     icon: Grid },
  { key: 'students',  label: 'Students',    icon: Users },
  { key: 'lessons',   label: 'Lesson Plan', icon: Book },
  { key: 'messages',  label: 'Messages',    icon: MessageSquare },
  { key: 'tools',     label: 'Tools',      icon: Target },
  { key: 'manage',    label: 'Manage',      icon: UserPlus },
];

const TeacherPanel = ({ isOpen, onClose }) => {
  const [students, setStudents]     = useState([]);
  const [loading, setLoading]       = useState(false);
  const [activeTab, setActiveTab]   = useState('today');
  const [drillStudent, setDrillStudent] = useState(null);
  const [seatInfo, setSeatInfo]     = useState(null);
  const [sessionsPerWeek, setSessionsPerWeek] = useState(() => parseInt(localStorage.getItem('tpSessionsPerWeek') || '3')); // 2 | 3 | 5 — shared between Content Pack & Lesson Plan tabs, persisted
  const [viewAsTeacher, setViewAsTeacher] = useState(false); // super_admin can preview teacher experience
  const currentUser = useUserStore(state => state.currentUser);
  const isSuperAdmin = currentUser?.role === 'super_admin';
  const isManager = !viewAsTeacher && MANAGER_ROLES.includes(currentUser?.role);

  const TP_CACHE_KEY = `tp_students_${currentUser?.id || 'anon'}`;
  const TP_CACHE_TTL = 5 * 60 * 1000; // 5 min — show stale data, refresh silently

  const refreshStudents = (silent = false) => {
    // Show cached data instantly if available (avoids blank loading screen)
    if (!silent) {
      try {
        const cached = JSON.parse(localStorage.getItem(TP_CACHE_KEY) || 'null');
        if (cached && Date.now() - cached.ts < TP_CACHE_TTL) {
          setStudents(cached.students);
          setSeatInfo(cached.seatInfo);
          // Still fetch fresh data silently in background
          silent = true;
        } else {
          setLoading(true);
        }
      } catch { setLoading(true); }
    }

    Promise.all([
      teacherAPI.getMyStudents(),
      teacherAPI.getSeatInfo(),
    ])
      .then(([sRes, siRes]) => {
        const students = sRes.data || [];
        const seatInfo = siRes.data;
        setStudents(students);
        setSeatInfo(seatInfo);
        // Cache for next open
        try {
          localStorage.setItem(TP_CACHE_KEY, JSON.stringify({ students, seatInfo, ts: Date.now() }));
        } catch { /* quota exceeded — ignore */ }
      })
      .catch(e => console.error('Failed to load teacher data:', e))
      .finally(() => { if (!silent) setLoading(false); });
  };

  const STUDENT_TABS = new Set(['today', 'overview', 'mastery', 'students', 'manage']);

  useEffect(() => {
    if (!isOpen) return;
    refreshStudents(false);
    // Background refresh every 60s — silent (no loading spinner), only when on a student tab
    const interval = setInterval(() => {
      if (STUDENT_TABS.has(activeTab)) refreshStudents(true);
    }, 60000);
    return () => clearInterval(interval);
  }, [isOpen]);

  useEffect(() => {
    localStorage.setItem('tpSessionsPerWeek', String(sessionsPerWeek));
  }, [sessionsPerWeek]);

  const handleSelectStudent = (student) => {
    setDrillStudent(student);
    setActiveTab('students');
  };

  return (
    <div 
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-gray-900 w-[96vw] h-[92vh] max-w-6xl rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-700"
        onClick={e => e.stopPropagation()}
      >

        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-700 to-purple-700 px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl">
              <BookOpen className="text-white" size={20} />
            </div>
            <div>
              <h2 className="font-black text-lg text-white leading-none">TEACHER PANEL</h2>
              <p className="text-xs text-white/70 mt-0.5">
                {students.length} student{students.length !== 1 ? 's' : ''}
                {seatInfo ? ` · ${seatInfo.seats_used}/${seatInfo.seats_total} seats` : ''}
                {loading ? ' · Loading…' : ' · Live data'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {isSuperAdmin && (
              <button
                onClick={() => setViewAsTeacher(v => !v)}
                className={`text-[10px] font-black px-3 py-1.5 rounded-lg border transition-all ${
                  viewAsTeacher
                    ? 'bg-amber-400 text-gray-900 border-amber-300'
                    : 'bg-white/10 text-white/70 border-white/20 hover:bg-white/20'
                }`}
                title="Toggle between Owner view and Teacher experience"
              >
                {viewAsTeacher ? '👤 Teacher View' : '🛡️ Owner View'}
              </button>
            )}
            <button onClick={onClose} className="hover:bg-white/10 p-2 rounded-full transition-colors">
              <X size={22} className="text-white" />
            </button>
          </div>
        </div>

        {/* Tab Bar */}
        <div className="flex border-b border-gray-700 shrink-0 bg-gray-900">
          {TABS.map(t => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`flex items-center gap-2 px-5 py-3 text-xs font-black uppercase tracking-wider transition-all border-b-2 ${activeTab === t.key ? 'border-indigo-400 text-indigo-300' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
            >
              <t.icon size={14}/> {t.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-hidden">
          {loading && students.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-400">
              <p className="font-bold animate-pulse">Loading students…</p>
            </div>
          ) : (
            <>
              {activeTab === 'today'    && <div className="h-full overflow-y-auto"><TabTodayBoard students={students} onSelectStudent={handleSelectStudent} /></div>}
              {activeTab === 'overview'  && <div className="h-full overflow-y-auto"><TabClassOverview students={students} /></div>}
              {activeTab === 'mastery'   && <div className="h-full overflow-y-auto"><TabMasteryGrid students={students} onSelectStudent={handleSelectStudent} /></div>}
              {activeTab === 'students'  && <div className="h-full"><TabStudentDetail students={students} teacherAPI={teacherAPI} initialStudent={drillStudent} /></div>}
              {activeTab === 'content'   && <div className="h-full"><TabContentPack students={students} teacherAPI={teacherAPI} sessionsPerWeek={sessionsPerWeek} setSessionsPerWeek={setSessionsPerWeek} /></div>}
              {activeTab === 'messages'  && <div className="h-full overflow-y-auto"><TabMessages students={students} teacherAPI={teacherAPI} /></div>}
              {activeTab === 'lessons'   && <div className="h-full"><TabLessonPlan sessionsPerWeek={sessionsPerWeek} setSessionsPerWeek={setSessionsPerWeek} students={students} teacherAPI={teacherAPI} /></div>}
              {activeTab === 'tools'     && <div className="h-full overflow-y-auto bg-white"><WarmUpQuizGenerator /><PeriodicQuizGenerator /></div>}
              {activeTab === 'manage'    && <div className="h-full overflow-y-auto">
                {isManager
                  ? <TabManageTeachers onRefresh={refreshStudents} />
                  : <TabManageStudents students={students} seatInfo={seatInfo} onRefresh={refreshStudents} />}
              </div>}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherPanel;

