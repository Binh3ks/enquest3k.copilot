import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Trophy, BookOpen, Pencil, Mic, CheckCircle, XCircle, TrendingUp, Star, ArrowLeft, RefreshCw, Users, BarChart2, Bell, BellOff } from 'lucide-react';
import { getWeeklyReport } from '../utils/progressReport';
import { useUserStore } from '../stores/useUserStore';
import { parentAPI, assessmentAPI, pushAPI } from '../services/api';
import { getWeekCEFR } from '../data/weekData';
import ParentQuizGenerator from '../components/parent/ParentQuizGenerator';

// ── Station hints for parents ───────────────────────────────────────────────
const STATION_HINTS = [
  {
    emoji: '📖', name: 'Đọc & Khám Phá (Read & Explore)',
    desc: 'Con đọc đoạn văn tiếng Anh theo chủ đề tuần và trả lời câu hỏi hiểu bài.',
    tip: 'Hỏi con: \"Bài đọc hôm nay về chủ đề gì?\" để con tập tóm tắt bằng tiếng Việt.',
  },
  {
    emoji: '🌱', name: 'Từ Vựng Mới (New Words)',
    desc: 'Con học từ mới qua hình ảnh, phiên âm và ví dụ. Hệ thống tự chọn từ phù hợp từng tuần.',
    tip: 'Khuyến khích con dùng 1–2 từ mới trong câu chuyện với ba/mẹ ngay hôm đó.',
  },
  {
    emoji: '🔤', name: 'Ghép Từ (Word Match)',
    desc: 'Game ghép từ với nghĩa hoặc hình ảnh. Ôn lại từ đã học theo cách vui và nhanh.',
    tip: 'Chơi cùng con — ai ghép đúng nhiều hơn? Tạo cuộc thi nhỏ tăng động lực.',
  },
  {
    emoji: '⚙️', name: 'Ngữ Pháp (Grammar)',
    desc: 'Luyện tập quy tắc ngữ pháp qua bài tập tương tác. Mỗi tuần tập trung một cấu trúc cụ thể.',
    tip: 'Nhờ con giải thích quy tắc ngữ pháp tuần này bằng tiếng Việt — nếu giải thích được, là con hiểu thật.',
  },
  {
    emoji: '🎙️', name: 'Shadowing — Bắt Chước Phát Âm (Pronunciation)',
    desc: 'Con nghe câu tiếng Anh rồi đọc to theo ngay lập tức — như diễn viên lồng tiếng. Giúp tai nghe giỏi hơn, phát âm chuẩn hơn, và ghi nhớ câu nói tự nhiên.',
    tip: 'Nếu con ngại đọc to, ngồi cùng con và làm mẫu trước — ba/mẹ đọc, con làm theo.',
  },
  {
    emoji: '✏️', name: 'Chính Tả (Dictation)',
    desc: 'Con nghe và viết lại câu tiếng Anh. Luyện đồng thời kỹ năng nghe, chính tả và cấu trúc câu.',
    tip: 'Đây là bài khó nhất — khi con viết sai, cho con nghe lại và tự sửa trước khi ba/mẹ giải thích.',
  },
  {
    emoji: '✍️', name: 'Viết Văn (Writing)',
    desc: 'Con viết đoạn văn ngắn theo chủ đề tuần. Xây dựng khả năng diễn đạt và tư duy bằng tiếng Anh.',
    tip: 'Đọc bài viết của con và hỏi: \"Con muốn nói thêm gì nữa không?\" — khuyến khích con bổ sung ý tưởng.',
  },
  {
    emoji: '🗺️', name: 'Mindmap Nói (Speaking Map)',
    desc: 'Con nhìn sơ đồ gợi ý rồi nói câu tiếng Anh hoàn chỉnh. Luyện nói có cấu trúc và tự nhiên.',
    tip: 'Ghi âm lại phần con nói rồi phát lại cho con nghe — con sẽ tự nhận ra điểm cần cải thiện.',
  },
  {
    emoji: '🤖', name: 'Hỏi AI (Ask AI)',
    desc: 'Con hội thoại tự do với AI bằng tiếng Anh. Luyện phản xạ giao tiếp trong môi trường không áp lực, không sợ sai.',
    tip: 'Khuyến khích con hỏi AI về bất kỳ điều gì con tò mò — không giới hạn chủ đề.',
  },
  {
    emoji: '🧠', name: 'Logic Lab',
    desc: 'Bài toán tư duy tích hợp tiếng Anh, Toán Singapore và Khoa học. Rèn não bộ xử lý tiếng Anh trong ngữ cảnh thực tế.',
    tip: 'Khi con bị kẹt, hướng dẫn con đọc lại đề tiếng Anh thật chậm — đừng dịch ngay sang tiếng Việt.',
  },
  {
    emoji: '💡', name: 'Sức Mạnh Từ Vựng (Word Power)',
    desc: 'Con học biến thể từ (danh từ/động từ/tính từ), đồng nghĩa và trái nghĩa. Giúp vốn từ linh hoạt, phong phú hơn.',
    tip: 'Game di chuyển: ba/mẹ nói một từ tiếng Anh, con tìm từ đồng nghĩa hoặc trái nghĩa.',
  },
  {
    emoji: '📺', name: 'Daily Watch',
    desc: 'Con xem video tiếng Anh ngắn theo chủ đề tuần từ các kênh giáo dục được chọn lọc.',
    tip: 'Xem cùng con, sau đó hỏi: \"Con hiểu được bao nhiêu?\" rồi cùng thảo luận vài phút.',
  },
  {
    emoji: '🎮', name: 'Game Hub',
    desc: 'Tổng hợp các trò chơi tiếng Anh vui nhộn để ôn lại từ vựng và kỹ năng qua hình thức giải trí.',
    tip: 'Đặt thử thách điểm số: \"Con thử đạt top score xem được không?\" — tăng động lực tự nhiên.',
  },
  {
    emoji: '🔁', name: 'Ôn Tập Thông Minh (SRS)',
    desc: 'Hệ thống tự động chọn từ con hay quên để ôn đúng lúc (spaced repetition). Đây là cách khoa học nhất để nhớ từ lâu dài.',
    tip: 'Khi con nói \"con học rồi\", nhắc con vào đây kiểm tra xem não bộ có thực sự nhớ không.',
  },
];

const AI_TUTOR_HINTS = [
  {
    emoji: '🤖', name: 'Nova AI Tutor — Tổng Quan (Overview)',
    desc: 'Nova là AI gia sư riêng của con. Nhấn nút “I’m Nova — Talk with me!” ở đầu trang để mở cửa sổ hỏi chương với AI. Nova có 4 tab: Story Mission, Free Talk, Pronunciation, Debate.',
    tip: 'Khuyến khích con mở Nova ít nhất 1 lần mỗi buổi học — chỉ cần 5 phút hỏi đáp với AI là đủ tăng phản xạ giao tiếp.',
  },
  {
    emoji: '📝', name: 'Story Mission (Nova Tab)',
    desc: 'Nova kể một câu chuyện theo chủ đề tuần. Con đọc hiểu, trả lời câu hỏi và hoàn thành nhiệm vụ liên quan. Xây dựng khả năng đọc hiểu theo ngữ cảnh.',
    tip: 'Hỏi con: “Nhiệm vụ hôm nay Nova giao là gì?” — con sẽ tự hào giải thích cho ba/mẹ.',
  },
  {
    emoji: '💬', name: 'Free Talk (Nova Tab)',
    desc: 'Con trò chuyện tự do với Nova bằng tiếng Anh. Nova sẽ gợi ý chủ đề, chơi game từ vựng, hoặc kể chuyện. Không có áp lực, không sợ sai.',
    tip: 'Nếu con ngại nói, gợi ý: “Con kể cho Nova nghe ngày hôm nay con đã làm gì?” — câu hỏi quen thuộc giúp con mở đầu dễ hơn.',
  },
  {
    emoji: '🎤', name: 'Pronunciation (Nova Tab)',
    desc: 'Nova đọc mẫu từng câu theo bài đọc của tuần. Con nghe và nhấn nút ghi âm giọng mình. Hệ thống góp ý phát âm cụ thể.',
    tip: 'Nhớ con: phát âm cần luyện lại nhiều lần — mỗi lần sẽ tốt hơn một chút. Không ai đạt chuẩn ngay từ đầu.',
  },
  {
    emoji: '🥊', name: 'Debate (Nova Tab)',
    desc: 'Tab nâng cao — mở khóa từ tuần 40. Con tranh luận với Nova về các chủ đề theo trình độ. Rèn khả năng lập luận, phản biện và diễn đạt quan điểm bằng tiếng Anh.',
    tip: 'Không cần có ngay từ đầu. Đây là mục tiêu dài hạn — khi con đạt tuần 40, Nova sẽ mở Debate để bước lên trình độ tiếp theo.',
  },
];

function GuideDrawer({ onClose }) {
  const [tab, setTab] = React.useState('stations');
  const [expanded, setExpanded] = React.useState(false);
  const shown = tab === 'stations' ? (expanded ? STATION_HINTS : STATION_HINTS.slice(0, 5)) : AI_TUTOR_HINTS;
  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />
      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-violet-50">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-wide">🎓 Hướng Dẫn Sử Dụng</p>
            <p className="text-sm font-black text-slate-700">Lexio</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 text-xl font-bold">×</button>
        </div>
        {/* Tabs */}
        <div className="flex border-b border-slate-100">
          <button
            onClick={() => setTab('stations')}
            className={`flex-1 py-2.5 text-xs font-black transition-colors ${
              tab === 'stations' ? 'text-indigo-700 border-b-2 border-indigo-600 bg-indigo-50' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            📚 16 Trạm Học
          </button>
          <button
            onClick={() => setTab('nova')}
            className={`flex-1 py-2.5 text-xs font-black transition-colors ${
              tab === 'nova' ? 'text-purple-700 border-b-2 border-purple-600 bg-purple-50' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            🤖 AI Tutor Nova
          </button>
        </div>
        {/* Content */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-50">
          {shown.map(s => (
            <div key={s.name} className="px-5 py-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0 mt-0.5">{s.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black text-slate-700 mb-1">{s.name}</p>
                  <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
                  <div className="mt-2 bg-amber-50 rounded-lg px-2.5 py-2 flex gap-1.5 items-start">
                    <span className="text-[11px] flex-shrink-0 mt-px">💡</span>
                    <p className="text-[11px] text-amber-800 leading-relaxed">{s.tip}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {tab === 'stations' && (
            <button
              onClick={() => setExpanded(e => !e)}
              className="w-full py-3 text-xs font-black text-indigo-600 hover:bg-indigo-50 transition-colors"
            >
              {expanded ? '▲ Thu gọn' : `▼ Xem thêm ${STATION_HINTS.length - 5} tính năng`}
            </button>
          )}
        </div>
      </div>
    </>
  );
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function AssessmentBars({ assessments }) {
  if (!assessments || assessments.length === 0) return (
    <p className="text-sm text-slate-400 italic">Chưa có bài kiểm tra nào.</p>
  );
  return (
    <div className="space-y-3">
      {assessments.map(h => {
        const pct = h.total_pct || 0;
        const barColor = pct >= 80 ? 'bg-green-500' : pct >= 50 ? 'bg-amber-400' : 'bg-rose-400';
        const textColor = pct >= 80 ? 'text-green-600' : pct >= 50 ? 'text-amber-600' : 'text-rose-500';
        const grade = pct >= 90 ? '🏆' : pct >= 70 ? '⭐' : pct >= 50 ? '📚' : '💪';
        const wStart = (h.block - 1) * 4 + 1;
        const wEnd = h.block * 4;
        return (
          <div key={h.block}>
            <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
              <span>{grade} Mini Quiz #{h.block} · Tuần {wStart}–{wEnd}</span>
              <span className={textColor}>{pct}% ({h.correct}/{h.total})</span>
            </div>
            <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div className={`h-full rounded-full transition-all ${barColor}`} style={{ width: `${pct}%` }} />
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5 text-right">
              {new Date(h.taken_at).toLocaleDateString('vi-VN')}
            </p>
          </div>
        );
      })}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function ParentDashboard() {
  const params = useParams();
  const navigate = useNavigate();
  const currentUser = useUserStore(state => state.currentUser);
  const token = useUserStore(state => state.token);

  const [weekNumber, setWeekNumber] = useState(parseInt(params.weekId) || 1);
  const [report, setReport] = useState(null);
  const [showGuide, setShowGuide] = useState(false);

  // ── Push notification subscribe state (parent only) ──────────────────────
  const [pushSupported] = useState(() => 'serviceWorker' in navigator && 'PushManager' in window);
  const [pushStatus, setPushStatus] = useState('idle'); // idle | requesting | subscribed | blocked | error
  const [pushLoading, setPushLoading] = useState(false);

  // ── Server-side data ──────────────────────────────────────────────────────
  const isParent = currentUser?.role === 'parent';
  const isStudent = currentUser?.role === 'student';

  const [children, setChildren] = useState([]);           // parent role: list of children
  const [childrenLoading, setChildrenLoading] = useState(false);
  const [selectedChild, setSelectedChild] = useState(null); // { id, username }
  const [serverData, setServerData] = useState(null);     // from /api/assessment/child/:id
  const [ownAssessments, setOwnAssessments] = useState([]); // student self-view
  const [serverLoading, setServerLoading] = useState(false);
  const [expandedWeek, setExpandedWeek] = useState(null); // accordion state for weekly detail

  // Load children list for parent role
  useEffect(() => {
    if (!isParent || !token) return;
    setChildrenLoading(true);
    parentAPI.getChildren().then(r => {
      // Handle both array response and { children: [...] } / { data: [...] } formats
      const raw = r.data;
      const kids = Array.isArray(raw) ? raw : (raw?.children || raw?.data || []);
      setChildren(kids);
      if (kids.length > 0) setSelectedChild(kids[0]);
    }).catch(() => {
      setChildren([]);
    }).finally(() => setChildrenLoading(false));
  }, [isParent, token]);

  // Fetch child dashboard data when selected child changes
  const loadChildData = useCallback(() => {
    if (!selectedChild?.id || !token) return;
    setServerLoading(true);
    assessmentAPI.getChildDashboard(selectedChild.id)
      .then(r => setServerData(r.data))
      .catch(() => setServerData(null))
      .finally(() => setServerLoading(false));
  }, [selectedChild, token]);

  useEffect(() => { loadChildData(); }, [loadChildData]);

  // Fetch own assessment history for student self-view
  const [ownStats, setOwnStats] = useState(null);
  const [ownCheckpoints, setOwnCheckpoints] = useState(null); // null = loading, [] = empty
  useEffect(() => {
    if (!isStudent || !token) return;
    assessmentAPI.getHistory()
      .then(r => {
        const data = r.data || {};
        setOwnAssessments(data.assessments || (Array.isArray(data) ? data : []));
        setOwnStats(data.stats || null);
        setOwnCheckpoints(data.checkpoints || []);
      })
      .catch(() => { setOwnCheckpoints([]); });
  }, [isStudent, token]);

  // localStorage-based report (vocab health, writing, streaks, adaptive)
  useEffect(() => {
    setReport(getWeeklyReport(weekNumber));
  }, [weekNumber]);

  // Register service worker for push (parent role only)
  useEffect(() => {
    if (!isParent || !pushSupported) return;
    navigator.serviceWorker.register('/sw.js').catch(() => {});
    // Check existing permission
    if (Notification.permission === 'granted') setPushStatus('subscribed');
    else if (Notification.permission === 'denied') setPushStatus('blocked');
  }, [isParent, pushSupported]);

  // Sync weekNumber from server data
  useEffect(() => {
    if (serverData?.progress?.current_week) {
      setWeekNumber(serverData.progress.current_week);
    }
  }, [serverData]);

  const handleRefresh = () => {
    setReport(getWeeklyReport(weekNumber));
    loadChildData();
  };

  // ── Push notification subscribe ──────────────────────────────────────────
  const handleSubscribePush = async () => {
    if (!pushSupported || pushLoading) return;
    setPushLoading(true);
    try {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') { setPushStatus('blocked'); setPushLoading(false); return; }
      const reg = await navigator.serviceWorker.ready;
      const keyRes = await pushAPI.getVapidKey();
      const vapidKey = keyRes.data?.publicKey;
      const urlBase64ToUint8 = (base64) => {
        const padding = '='.repeat((4 - base64.length % 4) % 4);
        const b64 = (base64 + padding).replace(/-/g, '+').replace(/_/g, '/');
        const raw = window.atob(b64);
        return Uint8Array.from([...raw].map(c => c.charCodeAt(0)));
      };
      const subscription = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8(vapidKey),
      });
      await pushAPI.subscribe(subscription.toJSON());
      setPushStatus('subscribed');
    } catch (err) {
      console.error('[Push] Subscribe failed:', err);
      setPushStatus('error');
    } finally {
      setPushLoading(false);
    }
  };

  if (!report) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-slate-400 font-bold">Loading report…</p>
    </div>
  );

  // Decide whose assessments to show and what display name to use
  const displayAssessments = isParent ? (serverData?.assessments || []) : ownAssessments;
  const displayName = isParent
    ? (serverData?.child_name || selectedChild?.username || '')
    : (currentUser?.name || currentUser?.username || '');
  const displayWeeksCompleted = isParent
    ? (serverData?.progress?.weeks_completed || 0)
    : (ownStats?.weeks_completed || null);
  const displayStreak = isParent
    ? (serverData?.streak_days ?? null)
    : null; // student sees localStorage streak (same device)

  // Server-side vocab / speaking / writing (for parent view or student with server data)
  const serverProgress = isParent ? serverData?.progress : ownStats;
  const serverMastered   = serverProgress?.mastered_stations  || 0;
  const serverLearning   = serverProgress?.learning_stations  || 0;
  const serverNeedReview = serverProgress?.needs_review_stations || 0;
  const serverSpeaking   = serverProgress?.speaking_sessions  || 0;
  const serverWritingAvg = serverProgress?.avg_writing_score  || 0;
  const hasServerVocab   = serverMastered + serverLearning + serverNeedReview > 0;

  const cefrInfo = getWeekCEFR(weekNumber);

  const { vocab, writing, streak, adaptive, checkpoints, nextCheckpoint, cefr, cambridge, nextMilestone } = report;

  // ── Progress summary for hero card ───────────────────────────────────────
  const totalVocab = serverMastered + serverLearning + serverNeedReview;
  const masteryPct = totalVocab > 0 ? Math.round((serverMastered / totalVocab) * 100) : (vocab.masteryPercent || 0);
  const weeksDisplay = displayWeeksCompleted || 0;
  const streakDisplay = displayStreak !== null ? displayStreak : streak.days;
  const latestQuiz = displayAssessments.length > 0 ? displayAssessments[displayAssessments.length - 1] : null;
  const heroChildName = isParent ? (serverData?.child_name || selectedChild?.username || '') : (currentUser?.name || currentUser?.username || '');

  // ── Narrative report ────────────────────────────────────────────────────
  // Returns { body: string, tip: string } | null
  const narrativeReport = (() => {
    if (serverLoading) return null;
    const name = heroChildName || 'Con';
    const seen = serverLearning + serverNeedReview + serverMastered; // total vocab encountered

    // Opening — phase-aware, always positive
    let opening;
    if (weeksDisplay === 0) {
      opening = `${name} vừa bắt đầu hành trình học tiếng Anh cùng EngQuest 3K (trình độ ${cefr}). Giai đoạn đầu là quan trọng nhất — não bộ đang hình thành nền tảng ngôn ngữ mới.`;
    } else if (weeksDisplay < 4) {
      opening = `${name} đang trong giai đoạn khởi động (${cefr}, tuần ${weeksDisplay}). Đây là thời điểm não bộ xây dựng nền tảng — mỗi buổi học đều được hệ thống ghi lại đầy đủ.`;
    } else {
      opening = `${name} đã hoàn thành ${weeksDisplay} tuần học${streakDisplay > 1 ? `, đang duy trì chuỗi ${streakDisplay} ngày liên tục` : ''} (${cefr}).`;
    }

    // Vocab — never negative about zeros in early weeks
    let vocabNote = null;
    if (weeksDisplay < 4) {
      if (seen > 0) {
        vocabNote = `${name} đã tiếp xúc với ${seen} từ vựng. Hệ thống chỉ đánh dấu "đã thuộc" khi con trả lời đúng nhiều lần liên tiếp — quá trình này diễn ra dần trong những tuần đầu.`;
      } else {
        vocabNote = `Khi con bắt đầu luyện Word Station, số liệu từ vựng sẽ hiển thị đầy đủ tại đây.`;
      }
    } else if (serverMastered >= 30) {
      vocabNote = `Vốn từ phát triển xuất sắc — ${name} đã ghi nhớ sâu ${serverMastered} từ (${masteryPct}% tổng số từ đã học).`;
    } else if (serverMastered >= 10) {
      vocabNote = `${name} đã ghi nhớ được ${serverMastered} từ (${masteryPct}%). Luyện tập đều đặn mỗi ngày giúp con số này tăng nhanh.`;
    } else if (serverMastered > 0) {
      vocabNote = `${name} đã bắt đầu ghi nhớ ${serverMastered} từ đầu tiên — đây là dấu hiệu tiến bộ tích cực!`;
    } else if (seen > 0) {
      vocabNote = `${name} đang luyện tập ${seen} từ. Từ vựng sẽ chuyển sang "đã thuộc" sau khi con trả lời đúng nhiều lần liên tiếp.`;
    }

    // Quiz
    let quizNote = null;
    if (latestQuiz) {
      if (latestQuiz.total_pct >= 90) {
        quizNote = `Mini Quiz gần nhất đạt ${latestQuiz.total_pct}% 🏆 — kết quả xuất sắc, con ghi nhớ từ vựng rất bền.`;
      } else if (latestQuiz.total_pct >= 70) {
        quizNote = `Mini Quiz gần nhất đạt ${latestQuiz.total_pct}% — tốt, con đang tiến bộ đúng hướng.`;
      } else if (latestQuiz.total_pct >= 50) {
        quizNote = `Mini Quiz gần nhất đạt ${latestQuiz.total_pct}% — con nắm được khoảng nửa số từ, cần ôn thêm một số từ khó.`;
      } else {
        quizNote = `Mini Quiz gần nhất đạt ${latestQuiz.total_pct}% — nên ôn lại từ vựng 4 tuần vừa qua, đặc biệt các từ được gắn cờ "cần ôn".`;
      }
    }

    // Skills
    const skillParts = [];
    if (serverWritingAvg >= 80) skillParts.push(`kỹ năng viết xuất sắc (TB ${serverWritingAvg}%)`);
    else if (serverWritingAvg >= 55) skillParts.push(`kỹ năng viết đang tiến bộ (TB ${serverWritingAvg}%)`);
    else if (serverWritingAvg > 0) skillParts.push(`kỹ năng viết cần thêm luyện tập (TB ${serverWritingAvg}%)`);
    if (serverSpeaking >= 10) skillParts.push(`${serverSpeaking} bài nói đã hoàn thành`);
    const skillNote = skillParts.length > 0
      ? skillParts.join(', ').replace(/^./, c => c.toUpperCase()) + '.'
      : null;

    // Tip — concrete action for parent/student, always last
    let tip;
    if (weeksDisplay < 4) {
      tip = `Hỏi con mỗi tối: "Hôm nay con học được từ gì mới?" — câu hỏi đơn giản này giúp tăng khả năng ghi nhớ dài hạn đáng kể.`;
    } else if (latestQuiz && latestQuiz.total_pct < 70) {
      tip = `Dành 5 phút ôn từ cùng con trước khi đi ngủ — hỏi con giải nghĩa từ bằng tiếng Việt hoặc đặt câu ví dụ.`;
    } else if (streakDisplay >= 7) {
      tip = `Con đang duy trì chuỗi học ${streakDisplay} ngày liên tục — hãy ghi nhận điều này với con để tạo động lực tiếp tục!`;
    } else if (streakDisplay < 3 && weeksDisplay > 2) {
      tip = `Cùng con đặt một khung giờ học cố định mỗi ngày — chỉ cần 15–20 phút đều đặn là đủ để duy trì tiến độ tốt.`;
    } else {
      tip = `Khen ngợi cụ thể sau mỗi buổi học: "Con học được từ mới hôm nay — ba/mẹ tự hào lắm!" — điều này tạo động lực học tập lâu dài cho con.`;
    }

    const body = [opening, vocabNote, quizNote, skillNote].filter(Boolean).join(' ');
    return { body, tip };
  })();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      {showGuide && <GuideDrawer onClose={() => setShowGuide(false)} />}
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm relative">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 rounded-xl hover:bg-slate-100 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-500" />
          </button>
          <div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-wide">Lexio</p>
            <h1 className="text-2xl font-black text-slate-800">
              Theo Dõi Học Tập{displayName ? ` — ${displayName}` : ''}
            </h1>
          </div>
        </div>
        {/* 📚 Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/week/33/read_explore')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shadow-md transition-colors"
          >
            🎮 Vào Học Ngay
          </button>
          <button
            onClick={() => setShowGuide(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black shadow-md transition-colors"
            title="Hướng dẫn sử dụng"
          >
            📚 Hướng Dẫn
          </button>
          {isParent && pushSupported && pushStatus !== 'blocked' && (
            <button
              onClick={pushStatus === 'subscribed' ? undefined : handleSubscribePush}
              disabled={pushLoading}
              title={pushStatus === 'subscribed' ? 'Đã bật thông báo' : 'Bật thông báo khi con học xong'}
              className={`p-2 rounded-xl transition-colors ${pushStatus === 'subscribed' ? 'bg-green-50 text-green-600' : 'hover:bg-amber-50 text-amber-500'}`}
            >
              {pushLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : pushStatus === 'subscribed' ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
            </button>
          )}
          <button onClick={handleRefresh} className="p-2 rounded-xl hover:bg-slate-100 transition-colors" title="Làm mới">
            <RefreshCw className={`w-4 h-4 text-slate-400 ${serverLoading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={() => {
              useUserStore.getState().logout();
              navigate('/');
            }}
            className="px-3 py-1.5 text-xs font-bold text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-xl transition-colors"
            title="Đăng xuất"
          >
            Đăng xuất
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto p-5 md:p-8 space-y-6">

        {/* ── Child Tabs (parent role, prominent, at the top) ── */}
        {isParent && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-4 pt-3 pb-0 flex items-center justify-between">
              <p className="text-xs font-black text-slate-400 uppercase tracking-wide flex items-center gap-1.5">
                <Users size={13} /> Tài khoản con
              </p>
              <button
                onClick={() => navigate('/parent/children')}
                className="text-xs font-bold text-indigo-500 hover:text-indigo-700 transition-colors"
              >
                + Quản lý →
              </button>
            </div>

            {childrenLoading ? (
              <div className="px-4 py-4 text-sm text-slate-400 animate-pulse">Đang tải tài khoản con…</div>
            ) : children.length === 0 ? (
              <div className="px-4 py-4 flex items-center gap-3">
                <p className="text-sm text-slate-500 flex-1">Chưa có tài khoản con. Tạo tài khoản để theo dõi tiến độ của con.</p>
                <button
                  onClick={() => navigate('/parent/children')}
                  className="px-3 py-1.5 text-xs font-black bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors"
                >
                  + Tạo tài khoản
                </button>
              </div>
            ) : (
              <>
                <div className="flex border-b border-slate-100 overflow-x-auto">
                  {children.map(c => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedChild(c)}
                      className={`flex-shrink-0 py-3 px-5 text-sm font-black transition-colors border-b-2 ${
                        selectedChild?.id === c.id
                          ? 'text-indigo-700 border-indigo-600 bg-indigo-50'
                          : 'text-slate-500 border-transparent hover:text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      👦 {c.display_name || c.username}
                    </button>
                  ))}
                </div>
                {selectedChild && (
                  <div className="px-4 py-3 flex items-center justify-between bg-slate-50">
                    <div>
                      <p className="text-sm font-bold text-slate-700">
                        {serverData?.child_name || selectedChild.display_name || selectedChild.username}
                      </p>
                      <p className="text-xs text-slate-400">
                        {serverData?.progress?.current_week
                          ? `Đang học Tuần ${serverData.progress.current_week} · ${serverData.progress.weeks_completed || 0} tuần đã hoàn thành`
                          : serverLoading ? 'Đang tải…' : 'Chưa có dữ liệu'}
                      </p>
                    </div>
                    <button
                      onClick={() => navigate('/placement')}
                      className="px-3 py-1.5 text-xs font-black bg-violet-600 hover:bg-violet-700 text-white rounded-xl transition-colors"
                    >
                      🎯 Placement Test
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* ── Hero Summary Card ── */}
        <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl p-5 text-white shadow-lg">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-indigo-200 text-sm font-bold uppercase tracking-wide">Tóm Tắt Tiến Độ</p>
              <p className="text-3xl font-black mt-1">
                {heroChildName ? `👦 ${heroChildName}` : '📊 Học Sinh'}
              </p>
              {serverLoading && <p className="text-indigo-300 text-sm mt-1 animate-pulse">Đang tải dữ liệu…</p>}
            </div>
            <div className="text-right">
              <div className="bg-white/20 rounded-xl px-3 py-2 text-center">
                <p className="text-4xl font-black">{weeksDisplay}</p>
                <p className="text-indigo-200 text-sm font-bold">tuần đã học</p>
              </div>
            </div>
          </div>

          {/* Key stats row */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            {[
              { emoji: '🌱',
                value: serverMastered > 0 ? serverMastered : (weeksDisplay < 4 ? '…' : 0),
                label: serverMastered > 0 ? 'từ đã thuộc' : (weeksDisplay < 4 ? 'đang tích lũy' : 'từ đã thuộc') },
              { emoji: '🔥', value: streakDisplay, label: `ngày liên tục` },
              { emoji: '🎙️', value: serverSpeaking || streak.speakingStreak || 0, label: 'bài nói' },
              { emoji: '✍️', value: serverWritingAvg > 0 ? `${serverWritingAvg}%` : (writing.averageScore !== null ? `${writing.averageScore}/12` : '—'), label: 'điểm viết' },
            ].map(s => (
              <div key={s.label} className="bg-white/15 rounded-xl p-2 text-center">
                <p className="text-lg">{s.emoji}</p>
                <p className="text-base font-black leading-none mt-0.5">{s.value}</p>
                <p className="text-indigo-200 text-[10px] mt-0.5 leading-tight">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Mastery progress bar */}
          <div>
            <div className="flex justify-between text-xs font-bold text-indigo-200 mb-1">
              <span>Mức độ nắm từ vựng</span>
              <span>{masteryPct}%</span>
            </div>
            <div className="h-2.5 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full transition-all" style={{ width: `${masteryPct}%` }} />
            </div>
          </div>

          {/* Latest quiz inline */}
          {latestQuiz && (
            <div className="mt-3 bg-white/15 rounded-xl px-3 py-2 flex items-center justify-between">
              <p className="text-xs font-bold text-indigo-100">
                Mini Quiz #{latestQuiz.block} · Tuần {(latestQuiz.block-1)*4+1}–{latestQuiz.block*4}
              </p>
              <p className={`text-sm font-black ${latestQuiz.total_pct >= 70 ? 'text-green-300' : latestQuiz.total_pct >= 50 ? 'text-amber-300' : 'text-rose-300'}`}>
                {latestQuiz.total_pct}%
              </p>
            </div>
          )}

          {/* New user encouragement */}
          {weeksDisplay === 0 && !serverLoading && (
            <div className="mt-3 bg-white/15 rounded-xl px-3 py-2">
              <p className="text-xs font-bold text-indigo-100">🚀 Con mới bắt đầu hành trình! Mỗi buổi học đều được ghi nhận tại đây.</p>
            </div>
          )}
          {weeksDisplay > 0 && weeksDisplay < 4 && (
            <div className="mt-3 bg-white/15 rounded-xl px-3 py-2">
              <p className="text-xs font-bold text-indigo-100">📅 Đã học {weeksDisplay}/4 tuần — còn {4 - weeksDisplay} tuần nữa để mở Mini Quiz đầu tiên!</p>
            </div>
          )}
        </div>

        {/* ── Narrative Report Card ── */}
        {narrativeReport && (
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <p className="text-sm font-black text-slate-400 uppercase tracking-wide mb-3">📋 Nhận Xét</p>
            <p className="text-base text-slate-700 leading-relaxed">{narrativeReport.body}</p>
            <div className="mt-3 bg-amber-50 border border-amber-100 rounded-xl px-3 py-3 flex gap-2 items-start">
              <span className="text-xl flex-shrink-0 mt-0.5">💡</span>
              <p className="text-sm text-amber-800 leading-relaxed font-medium">{narrativeReport.tip}</p>
            </div>
          </div>
        )}

        {/* ── Push notification opt-in banner ── */}
        {isParent && pushSupported && pushStatus === 'idle' && (
          <div className="bg-sky-50 border border-sky-200 rounded-2xl px-4 py-3 flex items-center gap-3">
            <BellOff className="w-5 h-5 text-sky-500 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-bold text-sky-800">Nhận kết quả của con ngay khi bài xong</p>
              <p className="text-xs text-sky-600 mt-0.5">Bật thông báo để không bỏ lỡ bất kỳ kết quả kiểm tra nào.</p>
            </div>
            <button
              onClick={handleSubscribePush}
              disabled={pushLoading}
              className="flex-shrink-0 px-3 py-1.5 bg-sky-500 hover:bg-sky-600 text-white text-xs font-black rounded-xl transition-colors"
            >
              {pushLoading ? '...' : 'Bật'}
            </button>
          </div>
        )}
        {isParent && pushStatus === 'subscribed' && (
          <div className="bg-green-50 border border-green-200 rounded-2xl px-4 py-2 flex items-center gap-2">
            <Bell className="w-4 h-4 text-green-600" />
            <p className="text-xs font-bold text-green-700">Thông báo đã bật — bạn sẽ được báo khi con hoàn thành bài kiểm tra.</p>
          </div>
        )}

        {/* ── Station Guide — moved to drawer, button in header */}

        {/* Child selector for parent role — removed from here, shown above hero card */}

        {/* Trình độ CEFR */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-black text-slate-400 uppercase mb-1">Trình độ hiện tại — Tuần {weekNumber}</p>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1.5 rounded-xl bg-indigo-100 text-indigo-700 font-black text-base">{cefr}</span>
                <span className="px-3 py-1.5 rounded-xl bg-violet-100 text-violet-700 font-bold text-base">{cambridge}</span>
                {nextMilestone && <span className="text-sm text-slate-400">⏭ Mốc tiếp: Tuần {nextMilestone}</span>}
              </div>
            </div>
            <div className="flex gap-1">
              <button onClick={() => setWeekNumber(w => Math.max(1, w - 1))} className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 font-black text-slate-600 text-sm">−</button>
              <button onClick={() => setWeekNumber(w => w + 1)} className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 font-black text-slate-600 text-sm">+</button>
            </div>
          </div>
        </div>

        {/* Streak + Bài Nói */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className="flex items-center gap-2 mb-1">
              <Star className="w-5 h-5 text-amber-500" />
              <p className="text-sm font-black text-slate-400 uppercase">Chuỗi Học</p>
            </div>
            <p className="text-4xl font-black text-amber-500">
              {displayStreak !== null ? displayStreak : streak.days}
              <span className="text-base text-slate-400 ml-1">ngày</span>
            </p>
            {displayStreak !== null && <p className="text-[10px] text-indigo-500 mt-1">📡 Dữ liệu server</p>}
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className="flex items-center gap-2 mb-1">
              <Mic className="w-5 h-5 text-violet-500" />
              <p className="text-sm font-black text-slate-400 uppercase">Bài Nói</p>
            </div>
            {serverSpeaking > 0 ? (
              <>
                <p className="text-4xl font-black text-violet-500">{serverSpeaking}<span className="text-base text-slate-400 ml-1">bài</span></p>
                <p className="text-[10px] text-indigo-500 mt-1">📡 Tổng bài đã hoàn thành</p>
              </>
            ) : (
              <p className="text-4xl font-black text-violet-500">{streak.speakingStreak}<span className="text-base text-slate-400 ml-1">lần</span></p>
            )}
          </div>
        </div>

        {/* Sức Khoẻ Từ Vựng */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-blue-500" />
            <p className="text-lg font-black text-slate-700">Sức Khoẻ Từ Vựng</p>
            {hasServerVocab ? (
              <span className="ml-auto text-2xl font-black text-blue-600">
                {Math.round((serverMastered / (serverMastered + serverLearning + serverNeedReview)) * 100)}%
                <span className="text-[10px] text-indigo-500 ml-1">📡</span>
              </span>
            ) : (
              <span className="ml-auto text-2xl font-black text-blue-600">{vocab.masteryPercent}%</span>
            )}
          </div>
          {hasServerVocab ? (
            <>
              <div className="flex rounded-full overflow-hidden h-3 mb-4 bg-slate-100">
                {serverMastered > 0 && <div className="bg-green-500 transition-all" style={{ width: `${(serverMastered/(serverMastered+serverLearning+serverNeedReview))*100}%` }} />}
                {serverLearning > 0 && <div className="bg-blue-400 transition-all" style={{ width: `${(serverLearning/(serverMastered+serverLearning+serverNeedReview))*100}%` }} />}
                {serverNeedReview > 0 && <div className="bg-amber-400 transition-all" style={{ width: `${(serverNeedReview/(serverMastered+serverLearning+serverNeedReview))*100}%` }} />}
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                {[
                  { label: 'Đã thuộc', value: serverMastered,   color: 'green' },
                  { label: 'Đang ôn',  value: serverLearning,   color: 'blue' },
                  { label: 'Cần ôn',   value: serverNeedReview, color: 'amber' },
                ].map(item => (
                  <div key={item.label} className={`bg-${item.color}-50 rounded-xl p-2`}>
                    <p className={`text-xl font-black text-${item.color}-600`}>{item.value}</p>
                    <p className="text-xs text-slate-500">{item.label}</p>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-indigo-500 mt-2">📡 Dựa trên điểm thực tế (≥80% = Đã thuộc)</p>
            </>
          ) : (
            <>
              <div className="flex rounded-full overflow-hidden h-3 mb-4 bg-slate-100">
                {vocab.mastered > 0 && <div className="bg-green-500 transition-all" style={{ width: `${vocab.total > 0 ? (vocab.mastered / vocab.total) * 100 : 0}%` }} />}
                {vocab.reviewing > 0 && <div className="bg-blue-400 transition-all" style={{ width: `${vocab.total > 0 ? (vocab.reviewing / vocab.total) * 100 : 0}%` }} />}
                {vocab.learning > 0 && <div className="bg-amber-400 transition-all" style={{ width: `${vocab.total > 0 ? (vocab.learning / vocab.total) * 100 : 0}%` }} />}
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                {[
                  { label: 'Đã thuộc', value: vocab.mastered,  color: 'green' },
                  { label: 'Đang ôn',  value: vocab.reviewing, color: 'blue' },
                  { label: 'Cần ôn',   value: vocab.atRisk,    color: 'amber' },
                ].map(item => (
                  <div key={item.label} className={`bg-${item.color}-50 rounded-xl p-2`}>
                    <p className={`text-xl font-black text-${item.color}-600`}>{item.value}</p>
                    <p className="text-xs text-slate-500">{item.label}</p>
                  </div>
                ))}
              </div>
              {vocab.weakWords && vocab.weakWords.length > 0 && (
                <div className="mt-3 pt-3 border-t border-amber-100">
                  <p className="text-[10px] font-black text-amber-600 uppercase tracking-wide mb-2">⚠️ Từ cần ôn thêm</p>
                  <div className="flex flex-wrap gap-1.5">
                    {vocab.weakWords.map(w => (
                      <span key={w.word} className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200 rounded-lg px-2 py-0.5 text-xs font-bold text-amber-700">
                        {w.word}
                        {w.meaning && <span className="text-amber-500 font-normal"> · {w.meaning}</span>}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Điểm Viết */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-4">
            <Pencil className="w-5 h-5 text-amber-500" />
            <p className="text-lg font-black text-slate-700">Điểm Viết (4 bài gần nhất)</p>
            {serverWritingAvg > 0 ? (
              <span className="ml-auto text-sm font-black text-amber-600">📡 TB: {serverWritingAvg}%</span>
            ) : writing.averageScore !== null ? (
              <span className="ml-auto text-sm font-black text-amber-600">TB: {writing.averageScore}/12</span>
            ) : null}
          </div>
          {serverWritingAvg > 0 ? (
            <>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${serverWritingAvg >= 80 ? 'bg-green-500' : serverWritingAvg >= 55 ? 'bg-amber-400' : 'bg-rose-400'}`}
                    style={{ width: `${serverWritingAvg}%` }} />
                </div>
                <span className="text-sm font-black text-slate-600">{serverWritingAvg}%</span>
              </div>
              <p className="text-[10px] text-indigo-500 mt-2">📡 Điểm trung bình các bài viết đã nộp</p>
            </>
          ) : writing.recentScores.length === 0 ? (
            <p className="text-sm text-slate-400 italic">Chưa có bài nộp.</p>
          ) : (
            <div className="flex gap-3 items-end">
              {writing.recentScores.map((s, i) => {
                const pct = Math.round((s.total / (s.maxTotal || 12)) * 100);
                const barColor = pct >= 80 ? 'bg-green-500' : pct >= 55 ? 'bg-amber-400' : 'bg-rose-400';
                return (
                  <div key={i} className="flex-1 text-center">
                    <div className="relative h-20 bg-slate-100 rounded-xl overflow-hidden">
                      <div className={`${barColor} absolute bottom-0 w-full transition-all rounded-xl`} style={{ height: `${pct}%` }} />
                    </div>
                    <p className="text-xs font-black text-slate-600 mt-1">{s.total}/{s.maxTotal || 12}</p>
                    <p className="text-[10px] text-slate-400 capitalize">{s.tier || ''}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Mini Quiz Từ Vựng (mỗi 4 tuần) */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-4">
            <BarChart2 className="w-5 h-5 text-violet-500" />
            <p className="text-lg font-black text-slate-700">Mini Quiz Từ Vựng (mỗi 4 tuần)</p>
            {displayAssessments.length > 0 && (
              <span className="ml-auto text-xs font-black text-violet-600">
                TB: {Math.round(displayAssessments.reduce((a,h) => a + h.total_pct, 0) / displayAssessments.length)}%
              </span>
            )}
          </div>
          {serverLoading ? (
            <p className="text-sm text-slate-400 animate-pulse">Đang tải…</p>
          ) : displayAssessments.length === 0 && (isParent || isStudent) ? (
            <div className="bg-violet-50 border border-violet-100 rounded-xl p-4">
              <p className="text-sm font-bold text-violet-700 mb-1">🎯 Chưa có Mini Quiz nào.</p>
              <p className="text-xs text-violet-600">
                Hoàn thành ít nhất 2 bài tập mỗi tuần. Sau 4 tuần đầu, quiz đầu tiên sẽ tự động mở!
              </p>
              {(serverProgress?.weeks_completed ?? 0) > 0 && (
                <p className="text-xs text-violet-500 mt-2 font-bold">
                  📅 Đã học {serverProgress.weeks_completed} tuần — còn {Math.max(0, 4 - serverProgress.weeks_completed)} tuần nữa!
                </p>
              )}
            </div>
          ) : (
            <>
              <AssessmentBars assessments={displayAssessments} />
              {serverMastered > 0 && (
                <div className="mt-3 flex items-center gap-2 bg-green-50 rounded-xl px-3 py-2">
                  <span className="text-base">🌱</span>
                  <p className="text-xs font-bold text-green-700">
                    Con đã ghi nhớ {serverMastered} từ trong {serverProgress?.weeks_completed || '?'} tuần học!
                  </p>
                </div>
              )}
            </>
          )}
          {!isParent && !isStudent && (
            <p className="text-xs text-slate-400 mt-2 italic">Đăng nhập để xem kết quả kiểm tra.</p>
          )}
        </div>

        {/* Kết Quả Từng Tuần Đã Học */}
        {(isParent || isStudent) && (() => {
          const weeksCompleted = serverData?.progress?.weeks_completed || ownStats?.weeks_completed || 0;
          const currentWeek = serverData?.progress?.current_week || weekNumber;
          const stationMap = serverData?.progress?.stations || null;
          if (weeksCompleted === 0 && !serverLoading) return null;

          const WEEK_NAMES = {
            1:'Hello, World!', 2:'My Family Squad', 3:'The Mirror Game', 4:'My Happy Jar',
            5:'The Mystery House', 6:'Treasure Hunt', 7:'Inside My Backpack', 8:'At the Market',
            9:'City Sounds', 10:'The Farm Adventure', 11:'Weekend Fun Spots', 12:'Food & Drinks',
            13:'Daily Routines', 14:'Welcome to My World', 15:'The Busy Park', 16:'Weather & Seasons',
            17:'My Favourite Things', 18:'Sports & Hobbies', 19:'A Day at School', 20:'Animals',
            21:'Transport', 22:'Health & Body', 23:'Jobs & Work', 24:'Feelings', 25:'Travel',
            26:'Review & Checkpoint', 27:'Technology', 28:'Nature', 29:'Shopping', 30:'Celebrations',
          };

          const stationList = [
            { key: 'skill_reading',       emoji: '📖', label: 'Đọc hiểu' },
            { key: 'vocab_mastery',        emoji: '🌱', label: 'Từ vựng' },
            { key: 'game_word_match',      emoji: '🔤', label: 'Word Match' },
            { key: 'grammar_lab',          emoji: '⚙️', label: 'Ngữ pháp' },
            { key: 'skill_shadowing',      emoji: '🎙️', label: 'Shadowing' },
            { key: 'skill_dictation',      emoji: '✏️', label: 'Chính tả' },
            { key: 'video_challenge',      emoji: '✍️', label: 'Viết' },
            { key: 'production_mindmap',   emoji: '🗺️', label: 'Mindmap' },
            { key: 'ask_ai',               emoji: '🤖', label: 'Ask AI' },
            { key: 'game_logic',           emoji: '🧠', label: 'Logic Lab' },
            { key: 'game_word_power',      emoji: '💡', label: 'Word Power' },
            { key: 'daily_watch',          emoji: '📺', label: 'Daily Watch' },
            { key: 'game_hub',             emoji: '🎮', label: 'Game Hub' },
            { key: 'review_session',       emoji: '🔁', label: 'SRS Ôn tập' },
          ];

          const completedWeeks = Array.from({ length: weeksCompleted }, (_, i) => weeksCompleted - i); // newest first

          return (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart2 className="w-5 h-5 text-indigo-500" />
                  <p className="text-base font-black text-slate-700">Kết Quả Từng Tuần Đã Học</p>
                </div>
                <span className="text-xs font-bold text-indigo-500 bg-indigo-50 px-2.5 py-1 rounded-full">
                  {weeksCompleted} tuần
                </span>
              </div>
              {serverLoading ? (
                <div className="px-5 py-4 text-sm text-slate-400 animate-pulse">Đang tải…</div>
              ) : (
                <div className="divide-y divide-slate-50">
                  {completedWeeks.map(w => {
                    const isOpen = expandedWeek === w;
                    const isCurrent = w === currentWeek;
                    const quizBlock = Math.ceil(w / 4);
                    const quizData = displayAssessments.find(a => a.block === quizBlock);
                    return (
                      <div key={w}>
                        <button
                          onClick={() => setExpandedWeek(isOpen ? null : w)}
                          className="w-full flex items-center px-5 py-3.5 hover:bg-slate-50 transition-colors text-left"
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black mr-3 flex-shrink-0 ${
                            isCurrent ? 'bg-indigo-600 text-white' : 'bg-green-100 text-green-700'
                          }`}>
                            {w}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-slate-700 truncate">
                              Tuần {w}: {WEEK_NAMES[w] || '—'}
                            </p>
                            <p className="text-xs text-slate-400">
                              {isCurrent ? 'Tuần hiện tại' : '✅ Đã hoàn thành'}
                              {quizData && ` · Quiz: ${quizData.total_pct}%`}
                            </p>
                          </div>
                          <span className="text-slate-300 ml-2 text-base">{isOpen ? '▲' : '▼'}</span>
                        </button>

                        {isOpen && (
                          <div className="px-5 pb-4 bg-slate-50 border-t border-slate-100">
                            {isCurrent && stationMap ? (
                              <div className="pt-3 grid grid-cols-2 gap-2">
                                {stationList.map(({ key, emoji, label }) => {
                                  const s = stationMap[key];
                                  const score = s?.score ?? null;
                                  const done = s?.isCompleted || false;
                                  const errors = s?.error_count ?? null;
                                  const color = done
                                    ? (score !== null ? (score >= 80 ? 'text-green-600' : score >= 50 ? 'text-amber-600' : 'text-rose-500') : 'text-green-600')
                                    : 'text-slate-400';
                                  return (
                                    <div key={key} className={`flex items-center gap-2 py-1.5 px-2 rounded-lg ${done ? 'bg-white' : ''}`}>
                                      <span className="text-base flex-shrink-0">{emoji}</span>
                                      <div className="flex-1 min-w-0">
                                        <p className="text-xs font-bold text-slate-600 truncate">{label}</p>
                                      </div>
                                      <p className={`text-xs font-black flex-shrink-0 ${color}`}>
                                        {score !== null ? `${score}%` : done ? '✓' : '—'}
                                        {errors !== null && errors > 0 && (
                                          <span className="text-rose-400 font-normal ml-0.5">({errors}✗)</span>
                                        )}
                                      </p>
                                    </div>
                                  );
                                })}
                              </div>
                            ) : (
                              <div className="pt-3">
                                <p className="text-xs text-slate-500">✅ Tuần này đã hoàn thành.</p>
                                {quizData && (
                                  <div className="mt-2 bg-white rounded-xl px-3 py-2">
                                    <p className="text-xs font-bold text-violet-700">
                                      Mini Quiz Block {quizData.block}: {quizData.total_pct}% ({quizData.correct}/{quizData.total} câu đúng)
                                    </p>
                                  </div>
                                )}
                                <p className="text-[10px] text-slate-400 mt-2">Chi tiết từng station của tuần này sẽ hiển thị đầy đủ trong bản cập nhật tiếp theo.</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })()}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-5 h-5 text-indigo-500" />
            <p className="text-lg font-black text-slate-700">Checkpoint Lớn</p>
            <span className="ml-auto text-[10px] text-indigo-400">📡</span>
          </div>
          {(() => {
            const serverCps = isParent ? (serverData?.checkpoints || null) : ownCheckpoints;
            if (serverCps === null) return <p className="text-xs text-slate-400 italic">Đang tải...</p>;
            return (
              <>
                <div className="grid grid-cols-2 gap-3">
                  {[14, 26, 36, 54].map(w => {
                    const cp = serverCps.find(c => Number(c.week_num) === w);
                    return (
                      <div key={w} className={`rounded-2xl p-3 border ${cp ? (cp.passed ? 'bg-green-50 border-green-200' : 'bg-rose-50 border-rose-200') : 'bg-slate-50 border-slate-200'}`}>
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-xs font-black text-slate-500">Tuần {w}</p>
                          {cp ? (cp.passed ? <CheckCircle className="w-4 h-4 text-green-500" /> : <XCircle className="w-4 h-4 text-rose-400" />) : <span className="text-xs text-slate-400">—</span>}
                        </div>
                        {cp ? (
                          <>
                            <p className={`text-xs font-bold ${cp.passed ? 'text-green-700' : 'text-rose-600'}`}>
                              {cp.passed ? '✅ Đạt' : '⚠️ Chưa đạt'}
                            </p>
                            {cp.taken_at && <p className="text-[10px] text-slate-400 mt-0.5">{new Date(cp.taken_at).toLocaleDateString('vi-VN')}</p>}
                          </>
                        ) : (
                          <p className="text-xs text-slate-400">{w <= weekNumber ? 'Chưa làm' : 'Chưa đến'}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
                {nextCheckpoint && (
                  <p className="text-xs text-slate-400 mt-3 text-center">⏭ Checkpoint tiếp theo: Tuần {nextCheckpoint}</p>
                )}
              </>
            );
          })()}
        </div>

        {/* Gợi Ý Thích Ứng */}
        {(adaptive.showWordWorkout || adaptive.needsWritingSupport || adaptive.unlockChallengeGrammar || adaptive.unlockAdvancedLogic) && (
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-violet-500" />
              <p className="text-lg font-black text-slate-700">Gợi Ý Thích Ứng</p>
            </div>
            <ul className="space-y-2">
              {adaptive.showWordWorkout && (
                <li className="text-sm text-amber-700 bg-amber-50 rounded-xl px-3 py-2">
                  📖 Từ vựng thấp 2 tuần liên tiếp — cần ôn luyện thêm (Word Workout).
                </li>
              )}
              {adaptive.needsWritingSupport && (
                <li className="text-sm text-rose-700 bg-rose-50 rounded-xl px-3 py-2">
                  ✏️ Điểm viết dưới ngưỡng 2 lần — đang bật chế độ hỗ trợ viết.
                </li>
              )}
              {adaptive.unlockChallengeGrammar && (
                <li className="text-sm text-green-700 bg-green-50 rounded-xl px-3 py-2">
                  🏆 Ngữ pháp xuất sắc 3 tuần — câu hỏi thử thách đã mở khoá!
                </li>
              )}
              {adaptive.unlockAdvancedLogic && (
                <li className="text-sm text-blue-700 bg-blue-50 rounded-xl px-3 py-2">
                  🧠 Logic Lab xuất sắc 3 tuần — Chế độ Nâng Cao đã mở khoá!
                </li>
              )}
            </ul>
          </div>
        )}

        {/* ── Parent Quiz Generator ── */}
        {(isParent || isStudent) && <ParentQuizGenerator />}

        <p className="text-center text-xs text-slate-400 pb-8">
          📡 Kiểm tra: dữ liệu server · Từ vựng/Viết: thiết bị này · {new Date(report.generatedAt).toLocaleString('vi-VN')}
        </p>
      </div>
    </div>
  );
}
