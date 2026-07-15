import React, { useState } from 'react';
import { Star, Award, Check, ChevronRight, Zap, X, Globe } from 'lucide-react';
import LoginScreen from './LoginScreen';
import NovaMascot from '../NovaMascot';

const text = {
  vi: {
    loginBtn: 'Đăng nhập',
    homeBtn: 'Trang chủ',
    heroTitle1: 'Học Tiếng Anh',
    heroTitle2: 'Chuẩn Cambridge',
    heroDesc: 'Không chỉ học tiếng Anh — mà học Toán, Khoa học, Tư duy bằng tiếng Anh. Sau 3 năm: B1+ Cambridge, sẵn sàng cho chương trình giáo dục quốc tế.',
    trialBadge: '14 ngày dùng thử MIỄN PHÍ — đầy đủ tính năng',
    primaryCta: 'Dùng thử 14 ngày miễn phí',
    primaryCtaSub: 'Không cần thẻ ngân hàng · Đăng ký trong 30 giây',
    socialProof: [
      { n: '156', label: 'Tuần học' },
      { n: '4', label: 'Kỹ năng' },
      { n: '30+', label: 'Năm kinh nghiệm' },
      { n: 'A1→B1+', label: 'Cambridge' },
    ],
    clilBadge: 'Khác biệt cốt lõi',
    clilTitle: 'Lexio không phải ESL đơn thuần',
    clilDesc: 'Đây là chương trình CLIL — Content & Language Integrated Learning. Học sinh học Toán, Khoa học, Xã hội học bằng tiếng Anh, chứ không chỉ học tiếng Anh như một môn học.',
    clilSubjects: [
      { emoji: '📐', text: 'Toán tư duy bằng tiếng Anh' },
      { emoji: '🔬', text: 'Khoa học bằng tiếng Anh' },
      { emoji: '🌍', text: 'Xã hội học bằng tiếng Anh' },
    ],
    clilGoal: '🎯 Mục tiêu sau 3 năm: B1+ Cambridge (IELTS 5.0–5.5)',
    clilGoalDesc: 'Đủ năng lực dùng tiếng Anh làm ngôn ngữ học tập (Medium of Instruction) cho các chương trình giáo dục quốc tế Mỹ, Úc, Singapore',
    featuresLabel: 'Tính năng nổi bật',
    featuresTitle: 'Tất cả trong một ứng dụng',
    features: [
      { emoji: '📚', title: 'CLIL · 156 Tuần', desc: 'Học Toán, Khoa học bằng tiếng Anh. Không chỉ là học tiếng Anh — mà học bằng tiếng Anh. A1 → B1+ Cambridge.' },
      { emoji: '🤖', title: 'AI Tutor Nova 24/7', desc: 'Gia sư riêng không giới hạn — trò chuyện, luyện phát âm, sửa bài viết tức thì.' },
      { emoji: '🧠', title: 'Spaced Repetition', desc: 'Hệ thống ôn từ khoa học nhất — tự động nhắc đúng lúc não bộ sắp quên.' },
      { emoji: '🎮', title: 'Game Hub + Logic Lab', desc: 'Tư duy bằng tiếng Anh qua trò chơi — học mà không thấy như học.' },
      { emoji: '📊', title: 'Báo cáo phụ huynh', desc: 'Tiến độ thực tế từng tuần — dữ liệu thật, minh bạch, không ước tính.' },
      { emoji: '🎙️', title: 'Shadowing & Phát âm', desc: 'Phương pháp học tiếng Anh nổi tiếng của các phiên dịch Cabin.' },
    ],
    compareLabel: 'So sánh',
    compareTitle: 'Tại sao chọn Lexio?',
    compareDesc: 'Lexio là app duy nhất tích hợp CLIL — học các môn học bằng tiếng Anh, chứ không chỉ học tiếng Anh như một môn học',
    comparePillars: [
      { emoji: '🏫', title: 'CLIL', sub: 'Học các môn học bằng tiếng Anh' },
      { emoji: '🤖', title: 'AI Tutor', sub: 'Hội thoại thật sự 24/7' },
      { emoji: '🧠', title: 'Khoa học', sub: 'SRS + Shadowing' },
    ],
    compareHeader: ['Tính năng', 'Lexio', 'Duolingo', 'Edupia', 'Lingokids'],
    compareRows: [
      'CLIL — học môn học bằng tiếng Anh',
      'Lộ trình có cấu trúc A1→B1+',
      'AI Tutor hội thoại thật sự',
      'Spaced Repetition (SRS)',
      'Chuẩn Cambridge (không theo SGK)',
      'Shadowing & luyện phát âm AI',
      'Viết câu / sửa bài tức thì',
      'Dashboard & báo cáo phụ huynh',
      'Tạo đề kiểm tra (cho GV & PH)',
      'Nội dung chuẩn hóa cho HS Việt',
      'Game + Logic Lab tư duy',
    ],
    compareFooter: '✓ Lexio — ứng dụng duy nhất tích hợp CLIL: học Toán · Khoa học · Xã hội học bằng tiếng Anh',
    credentialsTitle: 'Được xây dựng bởi chuyên gia',
    credentialsSub: 'Phiên dịch viên cabin · Nhà nghiên cứu ESL · 30 năm',
    credentials: [
      '30 năm kinh nghiệm dạy và nghiên cứu ESL',
      'Phiên dịch viên cabin hàng đầu Việt Nam',
      'Là công trình cả đời, trực tiếp viết toàn bộ 156 tuần nội dung',
      'Xây dựng theo chuẩn Cambridge & phương pháp ESL tiên tiến nhất',
    ],
    bottomCtaTitle: 'Bắt đầu ngay hôm nay',
    bottomCtaSub: '14 ngày đầy đủ tính năng, hoàn toàn miễn phí',
    bottomCtaBtn: '🚀 Đăng ký miễn phí ngay',
    bottomCtaLogin1: 'Đã có tài khoản?',
    bottomCtaLogin2: 'Đăng nhập tại đây',
  },
  en: {
    loginBtn: 'Login',
    homeBtn: 'Home',
    heroTitle1: 'Learn English',
    heroTitle2: 'Cambridge Standard',
    heroDesc: 'Not just learning English — but learning Math, Science, Critical Thinking IN English. After 3 years: B1+ Cambridge, ready for international education.',
    trialBadge: '14 days FREE trial — full features',
    primaryCta: 'Try 14 days free',
    primaryCtaSub: 'No credit card needed · Sign up in 30 seconds',
    socialProof: [
      { n: '156', label: 'Weeks' },
      { n: '4', label: 'Skills' },
      { n: '30+', label: 'Years Experience' },
      { n: 'A1→B1+', label: 'Cambridge' },
    ],
    clilBadge: 'Core Difference',
    clilTitle: 'Lexio is not just ESL',
    clilDesc: 'This is CLIL — Content & Language Integrated Learning. Students learn Math, Science, Social Studies IN English, not just learning English as a subject.',
    clilSubjects: [
      { emoji: '📐', text: 'Math IN English' },
      { emoji: '🔬', text: 'Science IN English' },
      { emoji: '🌍', text: 'Social Studies IN English' },
    ],
    clilGoal: '🎯 Goal after 3 years: B1+ Cambridge (IELTS 5.0–5.5)',
    clilGoalDesc: 'Ready to use English as Medium of Instruction for international education programs (US, Australia, Singapore)',
    featuresLabel: 'Key Features',
    featuresTitle: 'Everything in one app',
    features: [
      { emoji: '📚', title: 'CLIL · 156 Weeks', desc: 'Learn Math, Science in English. Not just learning English — learn IN English. A1 → B1+ Cambridge.' },
      { emoji: '🤖', title: 'AI Tutor Nova 24/7', desc: 'Unlimited personal tutor — chat, practice pronunciation, instant essay correction.' },
      { emoji: '🧠', title: 'Spaced Repetition', desc: 'Most scientific review system — automatic reminders right when your brain is about to forget.' },
      { emoji: '🎮', title: 'Game Hub + Logic Lab', desc: 'Think in English through games — learning without feeling like learning.' },
      { emoji: '📊', title: 'Parent Reports', desc: 'Real weekly progress — real data, transparent, not estimates.' },
      { emoji: '🎙️', title: 'Shadowing & Pronunciation', desc: 'Famous English learning method of cabin interpreters.' },
    ],
    compareLabel: 'Comparison',
    compareTitle: 'Why choose Lexio?',
    compareDesc: 'Lexio is the only app integrating CLIL — learning subjects IN English, not just learning English as a subject',
    comparePillars: [
      { emoji: '🏫', title: 'CLIL', sub: 'Learn subjects IN English' },
      { emoji: '🤖', title: 'AI Tutor', sub: 'Real conversation 24/7' },
      { emoji: '🧠', title: 'Scientific', sub: 'SRS + Shadowing' },
    ],
    compareHeader: ['Feature', 'Lexio', 'Duolingo', 'Edupia', 'Lingokids'],
    compareRows: [
      'CLIL — learn subjects IN English',
      'Structured A1→B1+ curriculum',
      'Real AI Tutor conversation',
      'Spaced Repetition (SRS)',
      'Cambridge standard (not textbook)',
      'Shadowing & AI pronunciation',
      'Writing / instant correction',
      'Dashboard & parent reports',
      'Test generator (for teachers & parents)',
      'Content for Vietnamese students',
      'Game + Logic Lab thinking',
    ],
    compareFooter: '✓ Lexio — the only app integrating CLIL: Math · Science · Social Studies IN English',
    credentialsTitle: 'Built by experts',
    credentialsSub: 'Cabin interpreter · ESL researcher · 30 years',
    credentials: [
      '30 years of ESL teaching and research',
      'Top cabin interpreter in Vietnam',
      'Life work, personally wrote all 156 weeks of content',
      'Built on Cambridge standards & most advanced ESL methods',
    ],
    bottomCtaTitle: 'Get started today',
    bottomCtaSub: '14 days full features, completely free',
    bottomCtaBtn: '🚀 Sign up free now',
    bottomCtaLogin1: 'Already have an account?',
    bottomCtaLogin2: 'Login here',
  }
};

const FEATURES = [
  { emoji: '📚', title: 'CLIL · 156 Tuần', desc: 'Học Toán, Khoa học bằng tiếng Anh. Không chỉ là học tiếng Anh — mà học bằng tiếng Anh. A1 → B1+ Cambridge.' },
  { emoji: '🤖', title: 'AI Tutor Nova 24/7', desc: 'Gia sư riêng không giới hạn — trò chuyện, luyện phát âm, sửa bài viết tức thì.' },
  { emoji: '🧠', title: 'Spaced Repetition', desc: 'Hệ thống ôn từ khoa học nhất — tự động nhắc đúng lúc não bộ sắp quên.' },
  { emoji: '🎮', title: 'Game Hub + Logic Lab', desc: 'Tư duy bằng tiếng Anh qua trò chơi — học mà không thấy như học.' },
  { emoji: '📊', title: 'Báo cáo phụ huynh', desc: 'Tiến độ thực tế từng tuần — dữ liệu thật, minh bạch, không ước tính.' },
  { emoji: '🎙️', title: 'Shadowing & Phát âm', desc: 'Phương pháp học tiếng Anh nổi tiếng của các phiên dịch Cabin.' },
];

const CREDENTIALS = [
  '30 năm kinh nghiệm dạy và nghiên cứu ESL',
  'Phiên dịch viên cabin hàng đầu Việt Nam',
  'Là công trình cả đời, trực tiếp viết toàn bộ 156 tuần nội dung',
  'Xây dựng theo chuẩn Cambridge & phương pháp ESL tiên tiến nhất',
];

const FEATURE_COLORS = [
  'bg-indigo-50 border-indigo-100',
  'bg-violet-50 border-violet-100',
  'bg-cyan-50 border-cyan-100',
  'bg-emerald-50 border-emerald-100',
  'bg-amber-50 border-amber-100',
  'bg-rose-50 border-rose-100',
];
const TITLE_COLORS = [
  'text-indigo-700', 'text-violet-700', 'text-cyan-700',
  'text-emerald-700', 'text-amber-700', 'text-rose-700',
];
const DESC_COLORS = [
  'text-indigo-600', 'text-violet-600', 'text-cyan-700',
  'text-emerald-700', 'text-amber-700', 'text-rose-600',
];

// Competitive comparison data
const COMPARE_ROWS = [
  { feature: 'CLIL — học môn học bằng tiếng Anh', lexio: true, duolingo: false, edupia: false, lingokids: false },
  { feature: 'Lộ trình có cấu trúc A1→B1+',    lexio: true,  duolingo: false, edupia: false, lingokids: false },
  { feature: 'AI Tutor hội thoại thật sự',       lexio: true,  duolingo: false, edupia: false, lingokids: false },
  { feature: 'Spaced Repetition (SRS)',           lexio: true,  duolingo: true,  edupia: false, lingokids: false },
  { feature: 'Chuẩn Cambridge (không theo SGK)', lexio: true,  duolingo: false, edupia: false, lingokids: false },
  { feature: 'Shadowing & luyện phát âm AI',     lexio: true,  duolingo: false, edupia: true,  lingokids: false },
  { feature: 'Viết câu / sửa bài tức thì',       lexio: true,  duolingo: false, edupia: false, lingokids: false },
  { feature: 'Dashboard & báo cáo phụ huynh',    lexio: true,  duolingo: false, edupia: true,  lingokids: false },
  { feature: 'Tạo đề kiểm tra (cho GV & PH)',    lexio: true,  duolingo: false, edupia: false, lingokids: false },
  { feature: 'Nội dung chuẩn hóa cho HS Việt',  lexio: true,  duolingo: false, edupia: true,  lingokids: false },
  { feature: 'Game + Logic Lab tư duy',           lexio: true,  duolingo: false, edupia: true,  lingokids: true  },
];

const CheckIcon  = () => <span className="text-emerald-500 font-black text-base">✓</span>;
const CrossIcon  = () => <span className="text-rose-300 font-black text-sm">✗</span>;

export default function LandingPage({ onLogin, onRegister, onGuestLogin }) {
  const [view, setView]         = useState('landing');
  const [authMode, setAuthMode] = useState('login');
  const [lang, setLang] = useState('vi');
  const t = text[lang];

  const goAuth = (mode) => { setAuthMode(mode); setView('auth'); };

  if (view === 'auth') {
    return (
      <>
        <button
          onClick={() => setView('landing')}
          className="fixed top-4 left-4 z-[10000] flex items-center gap-1.5 text-sm font-bold text-slate-700 bg-white shadow-lg px-4 py-2 rounded-full border border-slate-200 hover:bg-slate-50 transition-colors"
        >
          ← {t.homeBtn}
        </button>
        <LoginScreen
          onLogin={onLogin}
          onRegister={onRegister}
          onGuestLogin={onGuestLogin}
          initialMode={authMode}
          lang={lang}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col overflow-y-auto">

      {/* ── Header ── */}
      <header className="flex items-center justify-between px-5 py-4 border-b border-slate-100 sticky top-0 bg-white z-10 shadow-sm">
        <button
          onClick={() => goAuth('login')}
          className="text-sm font-black text-rose-600 hover:text-white border-2 border-rose-500 hover:bg-rose-500 px-5 py-2 rounded-xl transition-all"
        >
          {t.loginBtn}
        </button>
        <div className="flex items-center gap-2">
          <NovaMascot size={36} mood="sidebar" />
          <span style={{ fontFamily: "'Nunito', 'Quicksand', system-ui, sans-serif", fontWeight: 800, fontSize: '1.5rem', color: '#58cc02', letterSpacing: '-0.5px', lineHeight: 1 }}>Lexio</span>
        </div>
        <button
          onClick={() => setLang(lang === 'vi' ? 'en' : 'vi')}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-indigo-600 bg-slate-50 hover:bg-indigo-50 px-3 py-2 rounded-xl border border-slate-200 hover:border-indigo-300 transition-all"
        >
          <Globe size={14} />
          {lang === 'vi' ? 'EN' : 'VI'}
        </button>
      </header>

      {/* ── Hero ── */}
      <div className="bg-gradient-to-br from-rose-500 via-red-400 to-orange-400 px-6 pt-12 pb-10 text-center">
        <div className="flex justify-center mb-5">
          <NovaMascot size={220} mood="landing" />
        </div>
        <h1 className="text-4xl font-black text-white leading-tight mb-4 tracking-tight">
          {t.heroTitle1}<br />
          <span className="bg-gradient-to-r from-amber-300 to-yellow-200 bg-clip-text text-transparent">
            {t.heroTitle2}
          </span>
        </h1>
        <p className="text-white text-lg font-black leading-relaxed mb-6 max-w-sm mx-auto">
          {t.heroDesc}
        </p>

        {/* Trial badge */}
        <div className="inline-flex items-center gap-2 bg-amber-400 rounded-full px-5 py-2.5 mb-7 shadow-lg shadow-amber-900/30">
          <Star size={14} className="text-amber-900" fill="currentColor" />
          <span className="text-amber-900 text-sm font-black">{t.trialBadge}</span>
          <Star size={14} className="text-amber-900" fill="currentColor" />
        </div>

        {/* Primary CTA */}
        <button
          onClick={() => goAuth('register')}
          className="w-full max-w-sm mx-auto py-5 rounded-2xl bg-white hover:bg-amber-50 text-rose-700 font-black text-lg shadow-2xl shadow-red-900/40 transition-all active:scale-95 flex items-center justify-center gap-3 mb-3 border-2 border-transparent hover:border-amber-200"
        >
          <span className="text-2xl">🎁</span>
          {t.primaryCta}
          <ChevronRight size={20} className="text-rose-400" />
        </button>
        <p className="text-white text-sm font-semibold">{t.primaryCtaSub}</p>
      </div>

      {/* ── Social proof strip ── */}
      <div className="bg-rose-50 border-y border-rose-100 px-5 py-4 flex items-center justify-center gap-6 flex-wrap">
        {t.socialProof.map(s => (
          <div key={s.label} className="text-center">
            <p className="text-2xl font-black text-rose-600">{s.n}</p>
            <p className="text-sm font-bold text-rose-500 uppercase tracking-wide">{s.label}</p>
          </div>
        ))}
      </div>

      {/* ── CLIL Differentiator ── */}
      <div className="mx-5 my-6">
        <div className="bg-gradient-to-br from-blue-700 to-indigo-800 rounded-3xl overflow-hidden shadow-2xl">
          <div className="px-5 pt-6 pb-4 text-center">
            <span className="inline-block bg-amber-400 text-blue-900 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3">{t.clilBadge}</span>
            <h2 className="text-white font-black text-xl leading-tight mb-3">
              {t.clilTitle}
            </h2>
            <p className="text-white text-base font-medium leading-relaxed">
              {t.clilDesc.split('CLIL')[0]}<span className="font-black underline decoration-amber-400">CLIL</span>{t.clilDesc.split('CLIL')[1]?.split('bằng tiếng Anh')[0]}<span className="font-black">{lang === 'vi' ? 'bằng tiếng Anh' : 'IN English'}</span>{t.clilDesc.split(lang === 'vi' ? 'bằng tiếng Anh' : 'IN English')[1]}
            </p>
          </div>
          <div className="grid grid-cols-3 divide-x divide-blue-500 border-t border-blue-500">
            {t.clilSubjects.map(item => (
              <div key={item.text} className="px-2 py-4 text-center">
                <span className="text-3xl">{item.emoji}</span>
                <p className="text-white font-black text-sm mt-2 leading-snug">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="bg-indigo-900 border-t border-indigo-600 px-5 py-4 text-center">
            <p className="text-white font-black text-base">{t.clilGoal}</p>
            <p className="text-white text-sm mt-2 font-medium leading-relaxed">
              {t.clilGoalDesc}
            </p>
          </div>
        </div>
      </div>

      {/* ── Features ── */}
      <div className="px-5 py-8">
        <p className="text-center text-xs font-black text-slate-400 uppercase tracking-widest mb-2">{t.featuresLabel}</p>
        <h2 className="text-center text-2xl font-black text-slate-800 mb-6">{t.featuresTitle}</h2>
        <div className="grid grid-cols-2 gap-3">
          {t.features.map((f, i) => (
            <div key={f.title} className={`rounded-2xl p-4 border-2 ${FEATURE_COLORS[i]}`}>
              <span className="text-3xl">{f.emoji}</span>
              <p className={`font-black text-base mt-2 mb-1 leading-tight ${TITLE_COLORS[i]}`}>{f.title}</p>
              <p className={`text-sm font-medium leading-relaxed ${DESC_COLORS[i]}`}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Competitive comparison table ── */}
      <div className="px-5 pb-8">
        <p className="text-center text-xs font-black text-slate-400 uppercase tracking-widest mb-2">{t.compareLabel}</p>
        <h2 className="text-center text-2xl font-black text-slate-800 mb-1">{t.compareTitle}</h2>
        <p className="text-center text-base text-slate-600 mb-5 font-medium">{t.compareDesc}</p>

        {/* 3 pillars */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          {t.comparePillars.map(p => (
            <div key={p.title} className="bg-gradient-to-br from-rose-500 to-orange-400 rounded-2xl p-3 text-center shadow-md">
              <span className="text-2xl">{p.emoji}</span>
              <p className="text-white font-black text-sm mt-1">{p.title}</p>
              <p className="text-white text-sm font-semibold leading-snug mt-1">{p.sub}</p>
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm overflow-x-auto">
          {/* Header */}
          <div className="grid grid-cols-6 bg-slate-800 text-white text-[10px] font-black uppercase tracking-wide min-w-[340px]">
            <div className="col-span-2 px-3 py-3">{t.compareHeader[0]}</div>
            <div className="px-1 py-3 text-center text-rose-300">{t.compareHeader[1]}</div>
            <div className="px-1 py-3 text-center text-slate-400">{t.compareHeader[2]}</div>
            <div className="px-1 py-3 text-center text-slate-400">{t.compareHeader[3]}</div>
            <div className="px-1 py-3 text-center text-slate-400">{t.compareHeader[4]}</div>
          </div>
          {/* Rows */}
          {COMPARE_ROWS.map((row, i) => (
            <div
              key={row.feature}
              className={`grid grid-cols-6 items-center border-t border-slate-100 min-w-[340px] ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}
            >
              <div className="col-span-2 px-3 py-3 text-xs font-semibold text-slate-700 leading-snug">{t.compareRows[i]}</div>
              <div className="py-2.5 text-center">{row.lexio      ? <CheckIcon /> : <CrossIcon />}</div>
              <div className="py-2.5 text-center">{row.duolingo   ? <CheckIcon /> : <CrossIcon />}</div>
              <div className="py-2.5 text-center">{row.edupia     ? <CheckIcon /> : <CrossIcon />}</div>
              <div className="py-2.5 text-center">{row.lingokids  ? <CheckIcon /> : <CrossIcon />}</div>
            </div>
          ))}
          {/* Footer note */}
          <div className="bg-rose-50 px-3 py-3 border-t border-rose-100">
            <p className="text-xs text-rose-600 font-semibold text-center">
              {t.compareFooter}
            </p>
          </div>
        </div>
      </div>

      {/* ── Credentials ── */}
      <div className="mx-5 mb-8 rounded-3xl overflow-hidden shadow-xl">
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-4 flex items-center gap-3">
          <Award size={22} className="text-white flex-shrink-0" />
          <div>
            <p className="text-white font-black text-base">{t.credentialsTitle}</p>
            <p className="text-white text-xs font-semibold">{t.credentialsSub}</p>
          </div>
        </div>
        <div className="bg-amber-50 px-5 py-4 space-y-3">
          {t.credentials.map(c => (
            <div key={c} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                <Check size={11} className="text-white" />
              </div>
              <p className="text-base text-slate-700 font-semibold leading-snug">{c}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom CTA ── */}
      <div className="px-5 pb-12 bg-gradient-to-b from-white to-rose-50">
        <div className="bg-gradient-to-br from-rose-500 to-orange-500 rounded-3xl p-6 text-center shadow-2xl shadow-rose-200">
          <Zap size={28} className="text-amber-300 mx-auto mb-3" fill="currentColor" />
          <p className="text-white font-black text-xl mb-1">{t.bottomCtaTitle}</p>
          <p className="text-white text-sm mb-5 font-semibold">{t.bottomCtaSub}</p>
          <button
            onClick={() => goAuth('register')}
            className="w-full py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-amber-900 font-black text-base transition-all active:scale-95 shadow-lg shadow-amber-900/30 flex items-center justify-center gap-2"
          >
            {t.bottomCtaBtn}
          </button>
          <p className="text-white text-sm font-semibold mt-4">
            {t.bottomCtaLogin1}{' '}
            <button onClick={() => goAuth('login')} className="text-white font-black underline hover:text-amber-200 transition-colors">
              {t.bottomCtaLogin2}
            </button>
          </p>
        </div>
      </div>

    </div>
  );
}

