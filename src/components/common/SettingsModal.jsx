import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard, Wrench, LogOut, Activity, Grid, Users, MessageSquare,
  AlertTriangle, Flame, TrendingUp, Star, BarChart2, Target, Zap,
  Send, CheckCircle, Eye, Award, UserPlus, KeyRound
} from 'lucide-react';
import { getAdminStudents, teacherAPI } from '../../services/api';
import MediaStudio from './MediaStudio';
import TeacherPanel from '../teacher/TeacherPanel';

// ─── Station name cleaner ─────────────────────────────────────────────────────
// Fixed canonical list — matches backend normalization in admin.js
const CANONICAL_STATION_LABELS = {
  skill_reading:       'Read',
  vocab_mastery:       'Vocab',
  skill_dictation:     'Dictation',
  skill_shadowing:     'Shadow',
  grammar_lab:         'Grammar',
  production_mindmap:  'Mindmap',
  game_word_match:     'Match',
  game_logic:          'Logic',
  game_word_power:     'WordPwr',
  explore:             'Explore',
  video_challenge:     'Writing',
  daily_watch:         'Watch',
  ask_ai:              'Ask AI',
  ai_story:            'AI Story',
  ai_pronunciation:    'Pronun',
  self_regulation:     'Goals',
};
const CANONICAL_STATION_KEYS = Object.keys(CANONICAL_STATION_LABELS);

const QUICK_NUDGES = [
  { label: '👏 Keep it up!',      text: 'Great work this week! Keep up the great work!' },
  { label: '🔥 On a streak!',     text: "You're on a roll! Don't break your streak!" },
  { label: '📚 Review vocab',     text: 'You have vocab words due for SRS review. Spend 5 minutes today!' },
  { label: '🎤 Use the mic!',     text: 'Try the speaking activities — they help your pronunciation a lot!' },
  { label: '⚠️ We miss you!',     text: "We miss you! Log in and complete at least one station today." },
  { label: '🏆 Almost there!',    text: "You're so close to finishing this week. Push through!" },
];

// ─── Teacher sub-tabs ──────────────────────────────────────────────────────────
const MANAGER_ROLES = ['team_leader', 'center_director'];
const TEACHER_MANAGE_ROLES = ['teacher', 'team_leader', 'center_director'];

const getTeacherTabs = (role) => [
  { key: 'overview',  label: 'Overview',  icon: Activity },
  { key: 'mastery',   label: 'Mastery',   icon: Grid },
  { key: 'detail',    label: 'Students',  icon: Users },
  { key: 'messages',  label: 'Messages',  icon: MessageSquare },
  ...(TEACHER_MANAGE_ROLES.includes(role)
    ? [{ key: 'manage', label: MANAGER_ROLES.includes(role) ? 'Quản lý GV' : 'Quản lý HS', icon: UserPlus }]
    : []),
];

// ─── TeacherManageSection (light-theme manage tab) ───────────────────────────
function TeacherManageSection({ students, seatInfo, managerTeachers, onRefresh, role }) {
  const isManager = MANAGER_ROLES.includes(role);
  const list = isManager ? managerTeachers : students;

  const [uname, setUname]       = useState('');
  const [upass, setUpass]       = useState('');
  const [creating, setCreating] = useState(false);
  const [err, setErr]           = useState('');
  const [ok, setOk]             = useState('');

  const seatsUsed  = seatInfo?.teachers_used  ?? seatInfo?.seats_used  ?? 0;
  const seatsTotal = seatInfo?.teachers_total ?? seatInfo?.seats_total ?? 0;
  const planLabel  = seatInfo?.plan ?? '';

  const handleCreate = async () => {
    setErr(''); setOk('');
    if (!uname.trim() || !upass.trim()) { setErr('Nhập đầy đủ username và password.'); return; }
    setCreating(true);
    try {
      if (isManager) {
        const res = await teacherAPI.createTeacher(uname.trim(), upass.trim());
        setOk(`✓ Đã tạo GV "${res.data?.teacher?.username || uname}"`);
      } else {
        const res = await teacherAPI.createStudent(uname.trim(), upass.trim());
        setOk(`✓ Đã tạo HS "${res.data?.student?.username || uname}"`);
      }
      setUname(''); setUpass('');
      onRefresh();
    } catch (e) {
      setErr(e.response?.data?.message || 'Tạo tài khoản thất bại.');
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Seat bar */}
      {seatsTotal > 0 && (
        <div className={`p-4 rounded-xl border flex items-center justify-between ${
          seatsUsed >= seatsTotal ? 'bg-red-50 border-red-200' : 'bg-indigo-50 border-indigo-200'
        }`}>
          <div>
            <p className="font-black text-sm text-slate-700">{isManager ? 'Giáo viên đã tạo' : 'Ghế đã sử dụng'}</p>
            {planLabel && <p className="text-xs text-slate-500">{planLabel}</p>}
          </div>
          <p className={`text-2xl font-black ${
            seatsUsed >= seatsTotal ? 'text-red-600' : 'text-indigo-700'
          }`}>
            {seatsUsed}<span className="text-base text-slate-400">/{seatsTotal}</span>
          </p>
        </div>
      )}

      {/* Create form */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
        <h3 className="font-black text-sm text-slate-700 flex items-center gap-2">
          <UserPlus size={15} className="text-indigo-500"/>
          {isManager ? 'Tạo tài khoản giáo viên' : 'Tạo tài khoản học sinh'}
        </h3>
        {err && <p className="text-xs text-red-600 font-bold bg-red-50 p-2 rounded">{err}</p>}
        {ok  && <p className="text-xs text-green-600 font-bold bg-green-50 p-2 rounded">{ok}</p>}
        <div className="flex gap-2">
          <input
            value={uname} onChange={e => setUname(e.target.value)}
            placeholder="Username"
            className="flex-1 p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
          <input
            value={upass} onChange={e => setUpass(e.target.value)}
            type="password" placeholder="Password"
            className="flex-1 p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
          <button
            onClick={handleCreate}
            disabled={creating || !uname.trim() || !upass.trim()}
            className="px-4 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
          >
            {creating ? '…' : 'Tạo'}
          </button>
        </div>
      </div>

      {/* List */}
      <div className="border border-slate-200 rounded-xl overflow-hidden">
        <div className="bg-slate-50 px-4 py-2.5 border-b flex justify-between items-center">
          <p className="text-xs font-black text-slate-600">
            {isManager ? 'Giáo viên' : 'Học sinh'} ({list.length})
          </p>
          <button onClick={onRefresh} className="text-xs text-slate-400 hover:text-slate-600 font-bold">↻ Làm mới</button>
        </div>
        {list.length === 0 ? (
          <p className="p-8 text-center text-slate-400 text-sm">Chưa có ai. Tạo tài khoản ở trên.</p>
        ) : (
          <table className="w-full text-sm">
            <tbody>
              {list.map((s, idx) => (
                <tr key={s.student_id || s.teacher_id || idx} className="border-b last:border-0 hover:bg-slate-50">
                  <td className="px-4 py-2.5 font-bold text-slate-800">{s.student_name || s.username || s.teacher_name}</td>
                  <td className="px-4 py-2.5 text-indigo-600 font-mono text-xs font-bold">
                    {!isManager && `W${s.current_week || s.last_week || 1}`}
                    {isManager && `${s.student_count ?? 0} HS`}
                  </td>
                  <td className="px-4 py-2.5 text-xs">
                    {!isManager && (
                      (s.days_inactive || 0) > 7
                        ? <span className="text-red-500 font-bold">⚠ {s.days_inactive}d</span>
                        : (s.days_inactive || 0) > 3
                          ? <span className="text-amber-500">⏱ {s.days_inactive}d</span>
                          : <span className="text-green-600">✓ Active</span>
                    )}
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

function cellColor(ratio) {
  if (ratio === null || ratio === undefined) return 'bg-slate-100 text-slate-400';
  if (ratio >= 0.9) return 'bg-green-100 text-green-700';
  if (ratio >= 0.6) return 'bg-yellow-100 text-yellow-700';
  if (ratio >= 0.1) return 'bg-red-100 text-red-600';
  return 'bg-slate-100 text-slate-400';
}

// ─── Tab: Overview ─────────────────────────────────────────────────────────────
function TeacherOverview({ students }) {
  const atRisk = students.filter(s => (s.days_inactive || 0) >= 3);
  const avgWeek = students.length
    ? (students.reduce((a, s) => a + (s.current_week || s.last_week || 1), 0) / students.length).toFixed(1)
    : 0;

  return (
    <div className="space-y-5">
      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100 text-center">
          <p className="text-3xl font-black text-indigo-900">{students.length}</p>
          <p className="text-xs font-bold text-indigo-400 uppercase">Students</p>
        </div>
        <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 text-center">
          <p className="text-3xl font-black text-emerald-900">W{avgWeek}</p>
          <p className="text-xs font-bold text-emerald-400 uppercase">Avg. Week</p>
        </div>
        <div className="p-4 bg-red-50 rounded-xl border border-red-100 text-center">
          <p className="text-3xl font-black text-red-900">{atRisk.length}</p>
          <p className="text-xs font-bold text-red-400 uppercase">At-Risk 3d+</p>
        </div>
      </div>

      {/* At-risk */}
      {atRisk.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <h4 className="text-sm font-black text-red-700 flex items-center gap-2 mb-3">
            <AlertTriangle size={15}/> Needs Attention
          </h4>
          <div className="space-y-2">
            {atRisk.map(s => (
              <div key={s.student_id || s.name} className="flex items-center justify-between bg-white rounded-lg px-4 py-2 border border-red-100">
                <div>
                  <p className="text-sm font-bold text-slate-800">{s.student_name || s.name || s.username}</p>
                  <p className="text-xs text-slate-400">Week {s.current_week || s.last_week || 1} · ⭐{s.total_stars || s.stars || 0}</p>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${(s.days_inactive||0)>=7 ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'}`}>
                  {(s.days_inactive||0)>=7 ? `⚠ ${Math.round(s.days_inactive)}d inactive` : `⏱ ${Math.round(s.days_inactive || 3)}d slow`}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Leaderboard */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
          <Award size={15} className="text-yellow-500"/>
          <span className="text-sm font-black text-slate-700">Leaderboard</span>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="p-3 text-left text-slate-500 font-bold text-xs">#</th>
              <th className="p-3 text-left text-slate-500 font-bold text-xs">Name</th>
              <th className="p-3 text-center text-slate-500 font-bold text-xs">Stars</th>
              <th className="p-3 text-center text-slate-500 font-bold text-xs">Week</th>
              <th className="p-3 text-center text-slate-500 font-bold text-xs">Streak</th>
            </tr>
          </thead>
          <tbody>
            {[...students]
              .sort((a, b) => (b.current_week || b.last_week || 1) - (a.current_week || a.last_week || 1) || (b.total_stars || b.stars || 0) - (a.total_stars || a.stars || 0))
              .map((s, i) => (
                <tr key={s.student_id || i} className="border-b border-slate-50 hover:bg-slate-50">
                  <td className="p-3 font-black text-slate-400 text-xs">{i+1}</td>
                  <td className="p-3 font-bold text-slate-800">{s.student_name || s.name || s.username}</td>
                  <td className="p-3 text-center text-amber-500 font-bold">★ {s.total_stars || s.stars || 0}</td>
                  <td className="p-3 text-center font-bold text-indigo-600">W{s.current_week || s.last_week || 1}</td>
                  <td className="p-3 text-center text-amber-600 font-bold text-xs">{(s.streak_days||0) > 0 ? `🔥${s.streak_days}` : '—'}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Tab: Mastery Grid ─────────────────────────────────────────────────────────
function TeacherMastery({ students, onDrill }) {
  // Only show columns where at least one student has data
  const activeKeys = CANONICAL_STATION_KEYS.filter(k =>
    students.some(s => (s.station_scores || {})[k] != null)
  );

  const weakSpots = activeKeys.filter(k => {
    const scores = students.map(s => (s.station_scores || {})[k]).filter(v => v != null);
    if (!scores.length) return false;
    return scores.reduce((a, b) => a + b, 0) / scores.length < 70;
  });

  if (activeKeys.length === 0) {
    return (
      <div className="text-center py-16 text-slate-400">
        <Grid size={36} className="mx-auto mb-3 opacity-20"/>
        <p className="font-bold">No station data yet</p>
        <p className="text-xs mt-1">Students need to complete stations for data to appear here</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-xs text-slate-400 font-medium">
        Best score per station across all weeks (easy+advanced merged). Week = tuần hiện tại. 
        Colors: <span className="text-green-600 font-bold">■ ≥90%</span> · <span className="text-yellow-600 font-bold">■ 60–89%</span> · <span className="text-red-500 font-bold">■ &lt;60%</span> · <span className="text-slate-400">■ Not done</span>
      </p>
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="text-[11px] w-full">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="text-left p-3 text-slate-500 font-bold sticky left-0 bg-slate-50 w-28">Student</th>
              <th className="text-center p-2 text-slate-400 font-bold w-10">Week</th>
              {activeKeys.map(k => (
                <th key={k} className="text-center p-2 text-slate-400 font-bold min-w-[36px]">
                  <span style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)', display: 'inline-block', fontSize: '10px' }}>
                    {CANONICAL_STATION_LABELS[k]}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.map((s, si) => {
              const sm = s.station_scores || {};
              const week = s.current_week || s.last_week || 1;
              return (
                <tr key={s.student_id || si} className="border-b border-slate-100 hover:bg-indigo-50 cursor-pointer" onClick={() => onDrill(s)}>
                  <td className="p-3 font-bold text-slate-800 sticky left-0 bg-white truncate max-w-[7rem]">{s.student_name || s.name || s.username}</td>
                  <td className="text-center p-1">
                    <span className="inline-flex items-center justify-center px-2 h-7 rounded-lg text-[9px] font-black bg-indigo-50 text-indigo-600">W{week}</span>
                  </td>
                  {activeKeys.map(k => {
                    const v = sm[k];
                    const ratio = v != null ? v / 100 : null;
                    return (
                      <td key={k} className="text-center p-1">
                        <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-[9px] font-black ${cellColor(ratio)}`}>
                          {v != null ? Math.round(v) : '—'}
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
      {weakSpots.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-xs font-black text-red-700 flex items-center gap-2 mb-2"><Zap size={14}/> Class-Wide Weak Spots (&lt;70% avg)</p>
          <div className="flex flex-wrap gap-2">
            {weakSpots.map(k => {
              const scores = students.map(s => (s.station_scores || {})[k]).filter(v => v != null);
              const avg = scores.length ? Math.round(scores.reduce((a,b)=>a+b,0)/scores.length) : 0;
              return (
                <span key={k} className="px-2 py-1 bg-red-100 text-red-600 rounded-lg text-[10px] font-bold">{CANONICAL_STATION_LABELS[k]} — {avg}%</span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Tab: Student Detail ───────────────────────────────────────────────────────
function TeacherStudentDetail({ students, initialStudent }) {
  const [selectedId, setSelectedId] = useState(initialStudent?.student_id || null);
  const [detail, setDetail]         = useState(null);
  const [loading, setLoading]       = useState(false);
  const [message, setMessage]       = useState('');
  const [sent, setSent]             = useState(false);
  const [viewWeek, setViewWeek]     = useState(null); // which week's stations to show

  useEffect(() => {
    if (initialStudent?.student_id) setSelectedId(initialStudent.student_id);
  }, [initialStudent]);

  useEffect(() => {
    if (!selectedId) return;
    setLoading(true); setDetail(null); setViewWeek(null);
    teacherAPI.getStudentDetail(selectedId)
      .then(r => {
        setDetail(r.data);
        setViewWeek(r.data.currentWeek);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [selectedId]);

  const handleSend = async () => {
    if (!message.trim() || !selectedId) return;
    await teacherAPI.sendMessage(selectedId, message, 'Message from Teacher').catch(console.error);
    setMessage(''); setSent(true); setTimeout(() => setSent(false), 3000);
  };

  const sel = students.find(s => s.student_id === selectedId);
  const shownStations = detail?.stationsByWeek?.[viewWeek] || detail?.stationDetails || [];

  return (
    <div className="flex gap-4 h-full min-h-0">
      {/* Student list */}
      <div className="w-44 shrink-0 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50">
        {students.map(s => (
          <button
            key={s.student_id || s.name}
            onClick={() => setSelectedId(s.student_id)}
            className={`w-full text-left px-3 py-2.5 border-b border-slate-100 transition-colors ${selectedId === s.student_id ? 'bg-indigo-100 border-l-2 border-l-indigo-500' : 'hover:bg-white'}`}
          >
            <p className="text-sm font-bold text-slate-800 truncate">{s.student_name || s.name || s.username}</p>
            <p className="text-[10px] text-slate-400">W{s.current_week || s.last_week || 1}{(s.days_inactive||0)>=3 ? ` · ⚠${Math.round(s.days_inactive)}d` : ''}</p>
          </button>
        ))}
      </div>

      {/* Detail pane */}
      <div className="flex-1 overflow-y-auto space-y-4">
        {!selectedId && <div className="h-48 flex items-center justify-center text-slate-400"><Eye size={32} className="opacity-30 mr-2"/>Select a student</div>}
        {selectedId && loading && <p className="text-sm text-slate-400 animate-pulse mt-8 text-center">Loading…</p>}
        {selectedId && !loading && detail && (
          <>
            {/* Header */}
            <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100 flex items-center gap-3">
              {detail.student?.avatar_url && <img src={detail.student.avatar_url} className="w-12 h-12 rounded-full border-2 border-indigo-300" alt=""/>}
              <div>
                <p className="font-black text-lg text-slate-800">{detail.student?.username}</p>
                <p className="text-xs text-slate-500">{detail.student?.email}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-bold text-indigo-600">W{detail.currentWeek}</span>
                  {(sel?.days_inactive||0) >= 3 && <span className="text-xs text-red-500">⚠ {Math.round(sel.days_inactive)}d inactive</span>}
                </div>
              </div>
            </div>

            {/* Clickable weekly progress bars */}
            {detail.weekProgress?.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-xl p-4">
                <p className="text-xs font-black text-slate-600 mb-1 flex items-center gap-1.5"><BarChart2 size={13}/> Weekly Progress <span className="font-normal text-slate-400 ml-1">— click a bar to see that week's stations</span></p>
                <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
                  {[...detail.weekProgress].reverse().map(w => {
                    const stars = Number(w.total_stars) || 0;
                    const pct = Math.min(100, Math.round((stars / 48) * 100));
                    const isActive = viewWeek === w.week_id;
                    return (
                      <button
                        key={w.week_id}
                        onClick={() => setViewWeek(w.week_id)}
                        className={`w-full flex items-center gap-2 rounded-lg px-2 py-1 transition-all ${isActive ? 'bg-indigo-50 ring-2 ring-indigo-300' : 'hover:bg-slate-50'}`}
                      >
                        <span className="text-[10px] font-bold text-slate-400 w-7 text-left">W{w.week_id}</span>
                        <div className="flex-1 h-5 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full ${pct>=80?'bg-green-500':pct>=50?'bg-indigo-500':'bg-red-400'}`} style={{width:`${Math.max(pct,2)}%`}}/>
                        </div>
                        <span className="text-[10px] text-amber-500 font-bold w-12 text-right">⭐{stars}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Station breakdown for selected week */}
            <div className="bg-white border border-slate-200 rounded-xl p-4">
              <p className="text-xs font-black text-slate-600 mb-3 flex items-center gap-1.5">
                <Target size={13}/> Stations — W{viewWeek}
                {viewWeek !== detail.currentWeek && <span className="text-[10px] text-indigo-500 font-bold ml-1">(click any bar above to switch week)</span>}
              </p>
              {shownStations.length === 0
                ? <p className="text-xs text-slate-400 italic">No stations completed this week</p>
                : (
                  <div className="grid grid-cols-2 gap-2">
                    {shownStations.map((st, i) => (
                      <div key={i} className={`rounded-lg p-2.5 border ${st.score>=70?'bg-green-50 border-green-200':st.score>0?'bg-yellow-50 border-yellow-200':'bg-slate-50 border-slate-200'}`}>
                        <p className="text-xs font-bold text-slate-700 truncate">{CANONICAL_STATION_LABELS[st.station_type] || st.station_type?.replace(/_easy$|_hard$/,'').replace(/_/g,' ')}</p>
                        <p className="text-xs text-slate-400 font-mono truncate">{st.station_type}</p>
                        <p className="text-lg font-black text-slate-800">{st.score}%</p>
                      </div>
                    ))}
                  </div>
                )}
            </div>

            {/* Quick nudge + message */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
              <p className="text-xs font-black text-slate-600 flex items-center gap-1.5"><Zap size={13} className="text-yellow-500"/> Quick Nudge</p>
              <div className="grid grid-cols-2 gap-1.5">
                {QUICK_NUDGES.map((n, i) => (
                  <button key={i} onClick={() => setMessage(n.text)} className="text-left text-[10px] font-bold bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 text-slate-600 hover:text-indigo-700 rounded-lg px-2.5 py-1.5 transition-all">
                    {n.label}
                  </button>
                ))}
              </div>
              <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Custom message…" className="w-full p-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-400 resize-none min-h-[70px]"/>
              <button onClick={handleSend} disabled={!message.trim()} className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white text-sm font-bold py-2 rounded-lg flex items-center justify-center gap-2 transition-all">
                {sent ? <><CheckCircle size={15}/> Sent!</> : <><Send size={15}/> Send</>}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Tab: Messages ─────────────────────────────────────────────────────────────
function TeacherMessages({ students }) {
  const [inbox, setInbox]       = useState([]);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);
  const [composing, setComposing] = useState(false);
  const [toId, setToId]         = useState('');
  const [subject, setSubject]   = useState('');
  const [msgText, setMsgText]   = useState('');
  const [sending, setSending]   = useState(false);

  const loadInbox = () => {
    setLoading(true);
    setError(null);
    teacherAPI.getInbox()
      .then(r => setInbox(r.data || []))
      .catch(e => setError(e?.response?.data?.message || 'Could not load messages'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadInbox(); }, []);

  const handleSend = async () => {
    if (!toId || !msgText.trim()) return;
    setSending(true);
    try {
      await teacherAPI.sendMessage(Number(toId), msgText.trim(), subject.trim() || 'Message from Teacher');
      setComposing(false); setToId(''); setSubject(''); setMsgText('');
      loadInbox();
    } catch (e) {
      alert(e?.response?.data?.message || 'Failed to send');
    } finally { setSending(false); }
  };

  return (
    <div className="space-y-3">
      {/* Compose button */}
      <div className="flex justify-end">
        <button onClick={() => setComposing(c => !c)}
          className="text-xs font-bold px-3 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 flex items-center gap-1">
          <MessageSquare size={12}/> {composing ? 'Cancel' : '+ New Message'}
        </button>
      </div>

      {/* Compose form */}
      {composing && (
        <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50 space-y-2">
          <select value={toId} onChange={e => setToId(e.target.value)}
            className="w-full text-xs border border-slate-200 rounded-lg p-2 bg-white">
            <option value="">— select student —</option>
            {(students || []).map(s => <option key={s.student_id} value={s.student_id}>{s.student_name}</option>)}
          </select>
          <input value={subject} onChange={e => setSubject(e.target.value)}
            placeholder="Subject (optional)"
            className="w-full text-xs border border-slate-200 rounded-lg p-2 bg-white"/>
          <textarea value={msgText} onChange={e => setMsgText(e.target.value)}
            placeholder="Message…" rows={3}
            className="w-full text-xs border border-slate-200 rounded-lg p-2 bg-white resize-none"/>
          <button onClick={handleSend} disabled={sending || !toId || !msgText.trim()}
            className="w-full text-xs font-bold py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50">
            {sending ? 'Sending…' : 'Send'}
          </button>
        </div>
      )}

      {loading && <p className="text-sm text-slate-400 animate-pulse">Loading…</p>}
      {error && <p className="text-xs text-rose-500 bg-rose-50 p-3 rounded-lg">{error}</p>}
      {!loading && !error && inbox.length === 0 && (
        <div className="text-center py-16 text-slate-400">
          <MessageSquare size={36} className="mx-auto mb-3 opacity-20"/>
          <p className="font-bold">No messages yet</p>
          <p className="text-xs mt-1">Use &quot;New Message&quot; to contact a student</p>
        </div>
      )}
      {inbox.map((msg, i) => {
        const isSent = msg.direction === 'sent';
        return (
          <div key={i} className={`p-4 rounded-xl border ${isSent ? 'bg-indigo-50 border-indigo-200' : !msg.read ? 'bg-amber-50 border-amber-200' : 'bg-white border-slate-200'}`}>
            <div className="flex items-center justify-between mb-1 gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className={`text-[10px] font-black px-1.5 py-0.5 rounded uppercase ${isSent ? 'bg-indigo-200 text-indigo-700' : 'bg-amber-200 text-amber-700'}`}>
                  {isSent ? `→ ${msg.to_username}` : `← ${msg.from_username}`}
                </span>
                {msg.subject && <span className="text-[10px] text-slate-500 truncate">{msg.subject}</span>}
              </div>
              <span className="text-[10px] text-slate-400 shrink-0">{msg.created_at ? new Date(msg.created_at).toLocaleDateString('vi-VN') : ''}</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">{msg.message}</p>
          </div>
        );
      })}
    </div>
  );
}

// ─── Main SettingsModal ────────────────────────────────────────────────────────
const SettingsModal = ({ isOpen, onClose, onLogout, currentUser, currentWeekId }) => {
  const isAdminOrOwner = currentUser.role === 'admin' || currentUser.role === 'super_admin';
  const isManager      = MANAGER_ROLES.includes(currentUser.role);
  const isTeacherView  = currentUser.role === 'teacher' || isManager || isAdminOrOwner;

  const [activeTab, setActiveTab]             = useState(isTeacherView ? 'dashboard' : '');
  const [teacherSubTab, setTeacherSubTab]     = useState('overview');
  const [showNewPanel, setShowNewPanel]       = useState(false);
  const [students, setStudents]               = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [drillStudent, setDrillStudent]       = useState(null);
  const [seatInfo, setSeatInfo]               = useState(null);
  const [managerTeachers, setManagerTeachers] = useState([]);

  const teacherTabs = getTeacherTabs(currentUser.role);

  const loadStudents = () => {
    setLoadingStudents(true);
    getAdminStudents()
      .then(r => {
        const raw = r.data || [];
        setStudents(raw.map(s => ({
          student_id: s.id || s.student_id,
          student_name: s.username,
          name: s.username,
          current_week: s.last_week || 1,
          last_week: s.last_week || 1,
          total_stars: s.stars || 0,
          stars: s.stars || 0,
          streak_days: s.streak_days || 0,
          days_inactive: s.days_inactive || 0,
          station_scores: s.station_scores || {},
          activity_last_7_days: s.activity_last_7_days || Array(7).fill(false),
        })));
      })
      .catch(e => console.error('Failed to load students', e))
      .finally(() => setLoadingStudents(false));
  };

  const loadManagerData = () => {
    teacherAPI.managerSeatInfo()
      .then(r => setSeatInfo(r.data))
      .catch(() => {});
    teacherAPI.myTeachers()
      .then(r => setManagerTeachers(r.data || []))
      .catch(() => {});
  };

  const loadSeatInfo = () => {
    teacherAPI.getSeatInfo()
      .then(r => setSeatInfo(r.data))
      .catch(() => {});
  };

  useEffect(() => {
    if (isTeacherView && isOpen) {
      loadStudents();
      if (isManager) loadManagerData();
      else if (currentUser.role === 'teacher') loadSeatInfo();
    }
  }, [isOpen, isTeacherView]);

  const handleDrill = (student) => {
    setDrillStudent(student);
    setTeacherSubTab('detail');
  };

  if (!isOpen) return null;

  return (
    <>
      <TeacherPanel isOpen={showNewPanel} onClose={() => setShowNewPanel(false)} />
      <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl w-full max-w-4xl h-[700px] flex flex-col overflow-hidden animate-in zoom-in-95 shadow-2xl">

        {/* Top tab bar */}
        <div className="flex border-b bg-slate-50 shrink-0">
          {isTeacherView && (
            <button
              onClick={() => { setActiveTab('dashboard'); setShowNewPanel(true); }}
              className={`flex-1 p-4 font-bold text-sm flex items-center justify-center gap-2 ${activeTab === 'dashboard' ? 'text-orange-600 border-b-2 border-orange-500 bg-white' : 'text-slate-500 hover:bg-white'}`}
            >
              <LayoutDashboard className="w-4 h-4"/> Students
            </button>
          )}
          {isAdminOrOwner && (
            <button
              onClick={() => setActiveTab('studio')}
              className={`flex-1 p-4 font-bold text-sm flex items-center justify-center gap-2 ${activeTab === 'studio' ? 'text-purple-600 border-b-2 border-purple-500 bg-white' : 'text-slate-500 hover:bg-white'}`}
            >
              <Wrench className="w-4 h-4"/> Media Studio
            </button>
          )}
        </div>

        {/* Teacher sub-tab bar removed — now uses new TeacherPanel */}

        {/* Content */}
        <div className="flex-1 overflow-auto p-5">
          {activeTab === 'dashboard' && isTeacherView && (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <p className="text-2xl">🎓</p>
              <p className="font-bold text-slate-700">Teacher Panel has been upgraded!</p>
              <p className="text-sm text-slate-400">Use the Teacher Panel button (bottom right) or click below.</p>
              <button
                onClick={() => { setShowNewPanel(true); }}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg transition-all"
              >
                Open Teacher Panel →
              </button>
            </div>
          )}
          {activeTab === 'studio' && isAdminOrOwner && <MediaStudio defaultWeekId={currentWeekId || 1} />}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center shrink-0">
          <button onClick={onClose} className="px-6 py-2 bg-white border border-slate-300 font-bold text-slate-600 rounded-lg hover:bg-slate-100">Close</button>
          <button onClick={onLogout} className="text-rose-600 font-bold text-sm flex items-center hover:bg-rose-50 px-3 py-2 rounded-lg transition-colors"><LogOut className="w-4 h-4 mr-2"/> Log Out</button>
        </div>
      </div>
    </div>
    </>
  );
};
export default SettingsModal;
