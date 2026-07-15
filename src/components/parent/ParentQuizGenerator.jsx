import { useState } from 'react';
import { PlayCircle, Printer, Copy, CheckCircle, XCircle, RotateCcw, BookOpen, Star } from 'lucide-react';

// Vite glob — must be at module level so Vite can statically analyze all paths
const FLAT_MODS = import.meta.glob('../../data/weeks/week_*_real.js');
const SUB_MODS  = import.meta.glob('../../data/weeks/week_*/week_*_real.js');

// ─── Helpers ──────────────────────────────────────────────────────────────────
const getMeaning = (w) => typeof w === 'object'
  ? (w.definition_vi || w.meaning_vi || w.translation || w.definition_en || '?')
  : '?';

const getExample = (w) => typeof w === 'object' ? (w.example || w.example_sentence_en || null) : null;

// Cambridge level badge based on selected week range
const getCambridgeLevel = (start, end) => {
  const mid = Math.floor((start + end) / 2);
  if (mid <= 7)  return { name: 'Pre-Starters', emoji: '🌱', color: 'text-green-700 bg-green-50 border-green-200',   desc: 'Nhận biết chữ cái & từ đơn cơ bản' };
  if (mid <= 14) return { name: 'Cambridge Starters', emoji: '⭐', color: 'text-sky-700 bg-sky-50 border-sky-200',     desc: 'A1 — Gia đình, trường học, màu sắc, con vật' };
  if (mid <= 26) return { name: 'Cambridge Movers',   emoji: '🚀', color: 'text-blue-700 bg-blue-50 border-blue-200',   desc: 'A1+ — Giao tiếp cơ bản, đọc đoạn ngắn' };
  if (mid <= 36) return { name: 'Cambridge Flyers',   emoji: '🏆', color: 'text-violet-700 bg-violet-50 border-violet-200', desc: 'A2 — Đọc hiểu, viết đoạn, ngữ pháp mở rộng' };
  if (mid <= 54) return { name: 'Cambridge KET / B1', emoji: '🎓', color: 'text-amber-700 bg-amber-50 border-amber-200',  desc: 'B1 — Viết email, đọc bài dài, nghe tốt' };
  return { name: 'Cambridge PET / B2', emoji: '🏅', color: 'text-rose-700 bg-rose-50 border-rose-200', desc: 'B2 — Giao tiếp thành thạo, viết luận' };
};

// ─── Question types (multi-select) ───────────────────────────────────────────
const ALL_TYPES = [
  { id: 'recognition',  label: '🌐 Nhận biết từ (Anh → Việt)',    desc: 'Con nhìn từ tiếng Anh, nói/viết nghĩa tiếng Việt' },
  { id: 'production',   label: '✍️ Viết từ (Việt → Anh)',          desc: 'Ba/mẹ đọc tiếng Việt, con viết từ tiếng Anh' },
  { id: 'mc',           label: '🔘 Trắc nghiệm 4 đáp án',          desc: 'Chọn 1 trong 4 nghĩa đúng — đúng chuẩn Cambridge' },
  { id: 'fill_blank',   label: '✏️ Điền từ vào câu',               desc: 'Điền từ thích hợp vào chỗ trống trong câu' },
  { id: 'matching',     label: '🔗 Nối từ — nghĩa',                desc: 'Nối cột từ tiếng Anh với nghĩa tiếng Việt' },
  { id: 'spelling',     label: '🔊 Ba/mẹ đọc — con viết',          desc: 'Ba/mẹ đọc to từ tiếng Anh, con tự đánh vần' },
  { id: 'sentence',     label: '📝 Đặt câu hoàn chỉnh',            desc: 'Con tự viết câu tiếng Anh dùng từ cho sẵn' },
];

// Quick presets matching Vietnamese parent habits
const PRESETS = [
  { id: 'evening',   label: '🌙 Kiểm tra tối nay',   types: ['recognition', 'mc'],                           numQ: 5,  mode: 'onscreen', desc: '~5 phút · Hỏi nhanh trước khi đi ngủ' },
  { id: 'weekend',   label: '📅 Ôn cuối tuần',        types: ['production', 'fill_blank', 'matching'],        numQ: 12, mode: 'print',    desc: '~15 phút · In ra giấy làm cùng con' },
  { id: 'cambridge', label: '🏆 Mini Cambridge Test', types: ['mc', 'fill_blank', 'matching', 'recognition'], numQ: 15, mode: 'print',    desc: 'Format gần chuẩn bài thi Cambridge thật' },
  { id: 'spelling',  label: '🔊 Luyện đánh vần',      types: ['spelling'],                                    numQ: 10, mode: 'onscreen', desc: 'Ba/mẹ đọc to — con tự đánh vần & viết' },
];

// ─── Question builders ────────────────────────────────────────────────────────
function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }

function makeQuestionsOfType(vocab, type, count, weekStart = 1) {
  return shuffle(vocab).slice(0, count).map((w) => {
    const word    = typeof w === 'string' ? w : w.word;
    const meaning = getMeaning(w);
    const example = getExample(w);
    if (type === 'recognition') return { type, question: `"${word}" nghĩa là gì?`, answer: meaning, word, meaning };
    if (type === 'production')  return { type, question: `Tiếng Anh của "${meaning}" là gì?`, answer: word, word, meaning };
    if (type === 'mc' || type === 'matching') {
      const others = vocab.filter(v => (typeof v === 'string' ? v : v.word) !== word);
      const opts   = shuffle([meaning, ...shuffle(others).slice(0, 3).map(getMeaning)]);
      const label  = type === 'matching' ? `Nối "${word}" với nghĩa đúng:` : `"${word}" nghĩa là gì?`;
      return { type, question: label, answer: meaning, options: opts, word, meaning };
    }
    if (type === 'fill_blank') {
      const sent = example
        ? example.replace(new RegExp(`\\b${word}\\b`, 'i'), '___________')
        : `___________ (nghĩa: ${meaning})`;
      return { type, question: sent, answer: word, word, meaning };
    }
    if (type === 'spelling') {
      // Tuần 14+: dictation câu/đoạn; Tuần 1–13: đánh vần từ đơn
      if (weekStart >= 14 && example) {
        return { type, question: 'Con nghe và chép lại câu:', answer: example, word, meaning, example, isDictation: true };
      }
      return { type, question: `Ba/mẹ đọc to: "${word}"`, answer: word, word, meaning, isSpelling: true };
    }
    if (type === 'sentence') return { type, question: `Đặt câu với từ: "${word}" (${meaning})`, answer: null, word, meaning, isOpenEnded: true };
    return null;
  }).filter(Boolean);
}

function buildAllQuestions(vocab, types, totalQ, weekStart = 1) {
  if (!types.length || !vocab.length) return [];
  const perType = Math.max(2, Math.ceil(totalQ / types.length));
  return shuffle(types.flatMap(t => makeQuestionsOfType(vocab, t, perType, weekStart))).slice(0, totalQ);
}

// ─── Print sheet builder ──────────────────────────────────────────────────────
function buildPrintSheet(questions, weekStart, weekEnd, level) {
  const sep  = '─'.repeat(56);
  const date = new Date().toLocaleDateString('vi-VN');
  const header = [sep, `  PHIẾU KIỂM TRA TỪ VỰNG TIẾNG ANH`,
    `  Cấp độ: ${level.emoji} ${level.name}  |  Tuần ${weekStart}–${weekEnd}`,
    `  Họ tên: _________________________   Ngày: ${date}`, sep, ''].join('\n');

  const byType = {};
  questions.forEach(q => { if (!byType[q.type]) byType[q.type] = []; byType[q.type].push(q); });

  const parts = [];
  let n = 1;

  if (byType.recognition?.length) {
    parts.push(`PHẦN ${n++}: NHẬN BIẾT TỪ VỰNG (${byType.recognition.length} câu)\nNhìn từ tiếng Anh, viết nghĩa tiếng Việt:\n\n` +
      byType.recognition.map((q, i) => `  ${i+1}. ${q.word.padEnd(20)} →  _______________________`).join('\n'));
  }
  if (byType.production?.length) {
    parts.push(`PHẦN ${n++}: VIẾT TIẾNG ANH (${byType.production.length} câu)\nĐọc nghĩa tiếng Việt, viết từ tiếng Anh:\n\n` +
      byType.production.map((q, i) => `  ${i+1}. ${q.meaning.padEnd(22)} →  _______________________`).join('\n'));
  }
  if (byType.mc?.length) {
    parts.push(`PHẦN ${n++}: TRẮC NGHIỆM (${byType.mc.length} câu)\nKhoanh tròn đáp án đúng:\n\n` +
      byType.mc.map((q, i) => [
        `  ${i+1}. "${q.word}" nghĩa là:`,
        ...q.options.map((o, j) => `     ${String.fromCharCode(65+j)}. ${o}`), ''
      ].join('\n')).join('\n'));
  }
  if (byType.matching?.length) {
    const qs = byType.matching;
    const rights = shuffle([...qs]).map((q, i) => `${String.fromCharCode(65+i)}. ${q.meaning}`);
    parts.push(`PHẦN ${n++}: NỐI TỪ VỚI NGHĨA (${qs.length} câu)\nNối cột trái với cột phải:\n\n` +
      qs.map((q, i) => `  ${(i+1 + '. ' + q.word).padEnd(30)} ${rights[i] || ''}`).join('\n'));
  }
  if (byType.fill_blank?.length) {
    parts.push(`PHẦN ${n++}: ĐIỀN VÀO CHỖ TRỐNG (${byType.fill_blank.length} câu)\n\n` +
      byType.fill_blank.map((q, i) => `  ${i+1}. ${q.question}`).join('\n'));
  }
  if (byType.spelling?.length) {
    const qs = byType.spelling;
    parts.push(`PHẦN ${n++}: BA/MẸ ĐỌC — CON VIẾT (${qs.length} câu)\n(Ba/mẹ đọc to từng từ, con tự viết)\n\n` +
      qs.map((q, i) => `  ${i+1}. _______________________________`).join('\n') +
      `\n\n  [Danh sách từ cho ba/mẹ — cắt trước khi cho con làm]:\n  ${qs.map((q, i) => `${i+1}. ${q.word}`).join('   ')}`);
  }
  if (byType.sentence?.length) {
    parts.push(`PHẦN ${n++}: ĐẶT CÂU (${byType.sentence.length} câu)\nDùng từ sau để đặt câu tiếng Anh hoàn chỉnh:\n\n` +
      byType.sentence.map((q, i) =>
        `  ${i+1}. Từ: "${q.word}" (${q.meaning})\n     __________________________________________________`
      ).join('\n'));
  }

  return header + parts.join('\n\n' + sep + '\n\n');
}

// Đáp án riêng — chỉ hiển thị trên máy, không bao giờ in theo phiếu học sinh
function buildAnswerKeyText(questions, weekStart, weekEnd) {
  const sep = '\u2500'.repeat(56);
  const byType = {};
  questions.forEach(q => { if (!byType[q.type]) byType[q.type] = []; byType[q.type].push(q); });
  const lines = [sep, `ĐÁP ÁN — Tuần ${weekStart}–${weekEnd} — DÀNH CHO BA/MẸ`, sep, ''];
  if (byType.recognition?.length) lines.push('[Nhận biết]   ' + byType.recognition.map((q,i)=>`${i+1}. ${q.meaning}`).join('  '));
  if (byType.production?.length)  lines.push('[Viết A-Anh]  ' + byType.production.map((q,i)=>`${i+1}. ${q.word}`).join('  '));
  if (byType.mc?.length)          lines.push('[Trắc nghiệm]  ' + byType.mc.map((q,i)=>`${i+1}. ${q.options ? String.fromCharCode(65+q.options.indexOf(q.answer)) : '?'} = ${q.answer}`).join('   '));
  if (byType.fill_blank?.length)  lines.push('[Điền câu]     ' + byType.fill_blank.map((q,i)=>`${i+1}. ${q.word}`).join('  '));
  if (byType.spelling?.length)    lines.push('[Đánh vần]     ' + byType.spelling.map((q,i)=>`${i+1}. ${q.isDictation ? q.answer : q.word}`).join('  '));
  if (byType.matching?.length)    lines.push('[Nối từ]      ' + byType.matching.map((q,i)=>`${i+1}. ${q.meaning}`).join('  '));
  if (byType.sentence?.length)    lines.push('[Đặt câu]      ' + byType.sentence.map((q,i)=>`${i+1}. "${q.word}" — câu mẫu theo ngữ cảnh`).join('  '));
  return lines.join('\n');
}

// Hướng dẫn chọn tuần cho Mini Cambridge Test
const CAMBRIDGE_GUIDE = [
  { w1: 5,  w2: 7,  label: 'Tuần 5–7',   level: 'Pre-Starters 🌱', numQ: 10, format: '5 Nhận biết + 5 Nối từ',                        note: 'Chưa đủ vốn từ đầy đủ — chỉ nên làm mini nhận biết.' },
  { w1: 8,  w2: 14, label: 'Tuần 8–14',  level: 'Starters ⭐ (A1)',   numQ: 15, format: '5 Trắc nghiệm + 5 Nối từ + 5 Nhận biết',         note: 'Đủ chuẩn Cambridge Starters.' },
  { w1: 15, w2: 26, label: 'Tuần 15–26', level: 'Movers 🚀 (A1+)',    numQ: 20, format: '5 MC + 5 Nối từ + 5 Điền + 5 Nhận biết',         note: 'Tương đương Movers A1+.' },
  { w1: 27, w2: 36, label: 'Tuần 27–36', level: 'Flyers 🏆 (A2)',     numQ: 25, format: '5 MC + 5 Nối + 5 Điền + 5 Viết + 5 Đặt câu',    note: 'Tương đương Flyers A2.' },
];

// ─── On-screen Quiz Runner ────────────────────────────────────────────────────
function QuizRunner({ questions, onDone, onBack }) {
  const [current, setCurrent]           = useState(0);
  const [input, setInput]               = useState('');
  const [selected, setSelected]         = useState(null);
  const [revealed, setRevealed]         = useState(false);
  const [results, setResults]           = useState([]);
  const [showParentHint, setShowParentHint] = useState(false);

  const q = questions[current];

  const advance = (correct) => {
    const r = [...results, { ...q, userCorrect: correct }];
    setResults(r);
    if (current + 1 < questions.length) {
      setCurrent(c => c + 1);
      setInput(''); setSelected(null); setRevealed(false); setShowParentHint(false);
    } else { onDone(r); }
  };

  const handleMC = (opt) => {
    if (revealed) return;
    setSelected(opt); setRevealed(true);
    setTimeout(() => advance(opt === q.answer), 900);
  };

  const typeBadges = {
    recognition: ['🌐 Nhận biết', 'bg-green-100 text-green-700'],
    production:  ['✍️ Viết từ',   'bg-violet-100 text-violet-700'],
    mc:          ['🔘 Trắc nghiệm','bg-sky-100 text-sky-700'],
    matching:    ['🔗 Nối từ',    'bg-indigo-100 text-indigo-700'],
    fill_blank:  ['✏️ Điền câu',  'bg-amber-100 text-amber-700'],
    spelling:    ['🔊 Đánh vần',  'bg-orange-100 text-orange-700'],
    sentence:    ['📝 Đặt câu',   'bg-pink-100 text-pink-700'],
  };
  const [badgeText, badgeCls] = typeBadges[q.type] || ['', ''];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="text-xs font-bold text-slate-400 hover:text-slate-600 flex-shrink-0">← Quầy lại</button>
        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${(current / questions.length) * 100}%` }} />
        </div>
        <p className="text-xs font-black text-slate-500">{current + 1}/{questions.length}</p>
      </div>

      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black ${badgeCls}`}>{badgeText}</span>

      <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5">
        <p className="text-sm font-black text-emerald-700 mb-1">Câu {current + 1}</p>
        {q.isDictation ? (
          <div>
            <p className="text-slate-600 text-sm mb-2 font-bold">🔊 Dictation — con nghe và chép lại câu:</p>
            <button onClick={() => setShowParentHint(v => !v)} className="text-xs font-black text-emerald-700 underline">
              {showParentHint ? 'Ẩn câu' : '👁 Xem câu (dành cho ba/mẹ đọc / dùng Natural Reader)'}
            </button>
            {showParentHint && (
              <div className="mt-2 bg-white rounded-xl p-3 border border-emerald-200">
                <p className="text-sm font-bold text-slate-800 leading-relaxed">{q.example}</p>
                <a href="https://www.naturalreaders.com/online/" target="_blank" rel="noopener noreferrer"
                  className="text-[10px] text-emerald-600 underline mt-1.5 block">
                  🔗 Natural Reader — tạo giọng đọc tiếng Anh miễn phí
                </a>
              </div>
            )}
          </div>
        ) : q.isSpelling ? (
          <div>
            <p className="text-slate-500 text-sm mb-3">Ba/mẹ đọc to từ tiếng Anh bên dưới, con tự viết vào ô.</p>
            <button onClick={() => setShowParentHint(v => !v)} className="text-xs font-black text-emerald-700 underline">
              {showParentHint ? 'Ẩn từ' : '👁 Xem từ (dành cho ba/mẹ)'}
            </button>
            {showParentHint && <p className="mt-2 text-2xl font-black text-slate-800">{q.word}</p>}
          </div>
        ) : (
          <p className="text-lg text-slate-800 font-bold leading-relaxed">{q.question}</p>
        )}
      </div>

      {/* MC */}
      {(q.type === 'mc' || q.type === 'matching') && q.options && (
        <div className="grid grid-cols-1 gap-2">
          {q.options.map(opt => {
            const isCorrect = opt === q.answer;
            const isChosen  = selected === opt;
            let cls = 'border-slate-200 bg-white hover:border-emerald-300 text-slate-700 cursor-pointer';
            if (revealed && isCorrect) cls = 'border-green-500 bg-green-50 text-green-800 cursor-default';
            else if (revealed && isChosen) cls = 'border-rose-400 bg-rose-50 text-rose-700 cursor-default';
            else if (revealed) cls = 'border-slate-100 bg-white text-slate-300 cursor-default';
            return (
              <button key={opt} onClick={() => handleMC(opt)}
                className={`text-left px-4 py-3 rounded-xl border-2 text-sm font-bold transition-all ${cls}`}>{opt}</button>
            );
          })}
        </div>
      )}

      {/* Text input answer */}
      {!q.options && !q.isOpenEnded && (
        <div className="space-y-3">
          {!revealed ? (
            <>
              {q.isDictation ? (
                <textarea
                  placeholder="Con chép câu vừa nghe..."
                  value={input} onChange={e => setInput(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-base focus:border-emerald-400 focus:outline-none resize-none h-20"
                  autoFocus />
              ) : (
                <input type="text" placeholder={q.isSpelling ? 'Con tự viết từ nghe được...' : 'Gõ câu trả lời...'}
                  value={input} onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && setRevealed(true)}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-base focus:border-emerald-400 focus:outline-none"
                  autoFocus />
              )}
              <button onClick={() => setRevealed(true)}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm">Xem đáp án</button>
            </>
          ) : (
            <>
              <div className="bg-white border-2 border-green-400 rounded-2xl p-4">
                <p className="text-xs font-black text-slate-400 uppercase mb-1">Đáp án đúng</p>
                <p className="text-xl font-black text-green-700">{q.answer}</p>
                {q.type === 'fill_blank' && <p className="text-xs text-slate-400 mt-1">({q.meaning})</p>}
                {input && <p className="text-sm text-slate-500 mt-1.5">Con viết: <em className="font-bold">{input}</em></p>}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => advance(true)} className="flex items-center justify-center gap-2 py-3 rounded-xl bg-green-50 border-2 border-green-300 text-green-700 font-black text-sm hover:bg-green-100">
                  <CheckCircle size={16}/> Đúng ✓
                </button>
                <button onClick={() => advance(false)} className="flex items-center justify-center gap-2 py-3 rounded-xl bg-rose-50 border-2 border-rose-300 text-rose-700 font-black text-sm hover:bg-rose-100">
                  <XCircle size={16}/> Sai ✗
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Sentence (open-ended) */}
      {q.isOpenEnded && (
        <div className="space-y-3">
          <textarea placeholder={`Con đặt câu với từ "${q.word}"...`}
            value={input} onChange={e => setInput(e.target.value)}
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-base focus:border-emerald-400 focus:outline-none resize-none h-24" />
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => advance(true)} className="flex items-center justify-center gap-2 py-3 rounded-xl bg-green-50 border-2 border-green-300 text-green-700 font-black text-sm hover:bg-green-100">
              <CheckCircle size={16}/> Đúng ✓
            </button>
            <button onClick={() => advance(false)} className="flex items-center justify-center gap-2 py-3 rounded-xl bg-rose-50 border-2 border-rose-300 text-rose-700 font-black text-sm hover:bg-rose-100">
              <XCircle size={16}/> Sai ✗
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Results Screen ───────────────────────────────────────────────────────────
function QuizResults({ results, onRetry, onBack }) {
  const gradable = results.filter(r => r.answer !== null);
  const correct  = gradable.filter(r => r.userCorrect).length;
  const pct      = gradable.length ? Math.round((correct / gradable.length) * 100) : 100;
  const emoji    = pct >= 80 ? '🏆' : pct >= 60 ? '👍' : '📖';
  return (
    <div className="space-y-4">
      <div className={`rounded-2xl p-5 text-center ${pct >= 80 ? 'bg-green-50 border-2 border-green-300' : pct >= 60 ? 'bg-amber-50 border-2 border-amber-300' : 'bg-rose-50 border-2 border-rose-300'}`}>
        <p className="text-4xl mb-2">{emoji}</p>
        <p className="text-3xl font-black text-slate-800">{pct}%</p>
        <p className="text-sm font-bold text-slate-600 mt-1">{correct}/{gradable.length} câu đúng</p>
        {pct >= 80 && <p className="text-xs text-green-700 mt-2 font-medium">Xuất sắc! Con nắm vững từ vựng rất tốt.</p>}
        {pct >= 60 && pct < 80 && <p className="text-xs text-amber-700 mt-2 font-medium">Tốt! Ôn lại những từ chưa thuộc nhé.</p>}
        {pct < 60 && <p className="text-xs text-rose-700 mt-2 font-medium">Cần ôn thêm — luyện tập đều đặn mỗi ngày.</p>}
      </div>
      <div className="max-h-52 overflow-y-auto space-y-1.5">
        {results.map((r, i) => (
          <div key={i} className={`flex items-center gap-3 px-3 py-2 rounded-xl ${r.answer === null ? 'bg-blue-50' : r.userCorrect ? 'bg-green-50' : 'bg-rose-50'}`}>
            {r.answer === null ? <Star size={13} className="text-blue-400 flex-shrink-0"/> : r.userCorrect ? <CheckCircle size={13} className="text-green-500 flex-shrink-0"/> : <XCircle size={13} className="text-rose-400 flex-shrink-0"/>}
            <span className="text-sm font-bold text-slate-700 flex-1">{r.word}</span>
            <span className="text-xs text-slate-400">{r.meaning}</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button onClick={onBack} className="flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-slate-200 text-slate-500 font-black text-sm hover:bg-slate-50">
          ← Cài đặt mới
        </button>
        <button onClick={onRetry} className="flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm">
          <RotateCcw size={15}/> Làm lại
        </button>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
const ParentQuizGenerator = () => {
  const [weekStart,     setWeekStart]     = useState(1);
  const [weekEnd,       setWeekEnd]       = useState(1);
  const [selectedTypes, setSelectedTypes] = useState(['recognition', 'mc']);
  const [mode,          setMode]          = useState('onscreen');
  const [numQ,          setNumQ]          = useState(10);
  const [loading,       setLoading]       = useState(false);
  const [error,         setError]         = useState('');
  const [questions,     setQuestions]     = useState(null);
  const [results,       setResults]       = useState(null);
  const [printText,     setPrintText]     = useState('');
  const [copied,        setCopied]        = useState(false);
  const [answerKey,     setAnswerKey]     = useState('');
  const [showAnswerKey, setShowAnswerKey] = useState(false);
  const [activePreset,  setActivePreset]  = useState(null);

  const level = getCambridgeLevel(weekStart, weekEnd);

  const applyPreset = (p) => {
    setActivePreset(p.id);
    setSelectedTypes(p.types); setNumQ(p.numQ); setMode(p.mode);
    setResults(null); setQuestions(null); setPrintText(''); setAnswerKey(''); setShowAnswerKey(false);
  };

  const toggleType = (id) => {
    setSelectedTypes(prev =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter(t => t !== id) : prev) : [...prev, id]
    );
  };

  const loadVocab = async () => {
    const all = [];
    for (let w = weekStart; w <= weekEnd; w++) {
      const pad     = String(w).padStart(2, '0');
      const flatKey = `../../data/weeks/week_${pad}_real.js`;
      const subKey  = `../../data/weeks/week_${pad}/week_${pad}_real.js`;
      try {
        let mod;
        if (FLAT_MODS[flatKey])     mod = await FLAT_MODS[flatKey]();
        else if (SUB_MODS[subKey]) mod = await SUB_MODS[subKey]();
        else continue;
        all.push(...(mod.default?.target_vocab || []));
      } catch { /* skip */ }
    }
    return all;
  };

  const handleGenerate = async () => {
    setResults(null); setError(''); setLoading(true); setPrintText('');
    const start = weekStart;
    const end   = Math.max(weekStart, weekEnd);
    if (end !== weekEnd) setWeekEnd(end);
    const vocab = await loadVocab();
    setLoading(false);
    if (!vocab.length) { setError(`Không tìm thấy từ vựng cho tuần ${start}–${end}.`); return; }
    const qs = buildAllQuestions(vocab, selectedTypes, numQ, start);
    if (!qs.length) { setError('Không tạo được câu hỏi.'); return; }
    setAnswerKey(buildAnswerKeyText(qs, start, end));
    setShowAnswerKey(false);
    if (mode === 'onscreen') { setQuestions(qs); }
    else { setPrintText(buildPrintSheet(qs, weekStart, weekEnd, level)); }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(printText).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };

  const handlePrint = () => {
    const win = window.open('', '_blank');
    win.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>Phiếu kiểm tra EngQuest</title></head><body><pre style="font-family:monospace;font-size:13px;padding:28px;white-space:pre-wrap;line-height:1.75">${printText.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</pre></body></html>`);
    win.document.close(); win.print();
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
      <div className="flex items-center gap-2 mb-5">
        <BookOpen className="w-5 h-5 text-emerald-500" />
        <p className="text-lg font-black text-slate-700">Tự Tạo Bài Kiểm Tra Cho Con</p>
        <span className="ml-2 px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-black rounded-full uppercase">Phụ Huynh</span>
      </div>

      {questions && !results && <QuizRunner questions={questions} onDone={r => { setResults(r); setQuestions(null); }} onBack={() => setQuestions(null)} />}
      {results && <QuizResults results={results} onRetry={() => { setResults(null); handleGenerate(); }} onBack={() => { setResults(null); setPrintText(''); setAnswerKey(''); }} />}

      {!questions && !results && !printText && (
        <div className="space-y-5">

          {/* Quick presets */}
          <div>
            <p className="text-xs font-black text-slate-400 uppercase mb-2">Chọn nhanh theo nhu cầu</p>
            <div className="grid grid-cols-2 gap-2">
              {PRESETS.map(p => (
                <button key={p.id} onClick={() => applyPreset(p)}
                  className="text-left p-3 rounded-xl border-2 border-slate-200 hover:border-emerald-400 hover:bg-emerald-50 transition-all">
                  <p className="text-xs font-black text-slate-700">{p.label}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{p.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Week range + Cambridge level badge */}
          <div>
            <p className="text-xs font-black text-slate-400 uppercase mb-2">Phạm vi tuần học</p>
            <div className="flex items-center gap-3 mb-2">
              <select value={weekStart} onChange={e => { const v = Number(e.target.value); setWeekStart(v); if (weekEnd < v) setWeekEnd(v); }}
                className="flex-1 px-3 py-2 rounded-xl border-2 border-slate-200 text-sm font-bold focus:border-emerald-400 focus:outline-none">
                {Array.from({length:30},(_,i)=>i+1).map(w=><option key={w} value={w}>Tuần {w}</option>)}
              </select>
              <span className="text-slate-400 font-black">→</span>
              <select value={weekEnd} onChange={e => setWeekEnd(Number(e.target.value))}
                className="flex-1 px-3 py-2 rounded-xl border-2 border-slate-200 text-sm font-bold focus:border-emerald-400 focus:outline-none">
                {Array.from({length:30},(_,i)=>i+1).filter(w=>w>=weekStart).map(w=><option key={w} value={w}>Tuần {w}</option>)}
              </select>
            </div>
            <div className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border ${level.color}`}>
              <span className="text-lg">{level.emoji}</span>
              <div>
                <p className="text-xs font-black">{level.name}</p>
                <p className="text-[10px] opacity-75">{level.desc}</p>
              </div>
            </div>
            {activePreset === 'cambridge' && (
              <div className="mt-2 p-3 rounded-xl bg-violet-50 border border-violet-200 space-y-1.5">
                <p className="text-[10px] font-black text-violet-700 uppercase">📌 Hướng dẫn chọn tuần — Mini Cambridge Test</p>
                {CAMBRIDGE_GUIDE.map(g => {
                  const isActive = weekStart >= g.w1 && weekEnd <= g.w2;
                  return (
                    <div key={g.label} className={`text-[10px] leading-relaxed rounded-lg px-2 py-1 ${isActive ? 'bg-violet-200 text-violet-900 font-bold' : 'text-violet-600'}`}>
                      <strong>{g.label}:</strong> {g.level} — {g.numQ} câu — {g.format}
                      {isActive && <span className="ml-1 text-violet-700">← Phạm vi hiện tại ✓</span>}
                    </div>
                  );
                })}
                <p className="text-[10px] text-violet-500 italic">💡 Chỉnh số câu theo khuyến nghị trên để format chuẩn Cambridge nhất.</p>
              </div>
            )}
          </div>

          {/* Question types — checkboxes, multi-select */}
          <div>
            <p className="text-xs font-black text-slate-400 uppercase mb-2">
              Loại câu hỏi <span className="normal-case font-normal text-slate-300">(chọn nhiều)</span>
            </p>
            <div className="space-y-2">
              {ALL_TYPES.map(t => (
                <label key={t.id}
                  className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${selectedTypes.includes(t.id) ? 'border-emerald-400 bg-emerald-50' : 'border-slate-200 hover:border-emerald-200'}`}
                  onClick={() => toggleType(t.id)}>
                  <div className={`w-5 h-5 mt-0.5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-all ${selectedTypes.includes(t.id) ? 'border-emerald-500 bg-emerald-500' : 'border-slate-300 bg-white'}`}>
                    {selectedTypes.includes(t.id) && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-700">{t.label}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{t.desc}</p>
                  </div>
                </label>
              ))}
              {selectedTypes.includes('spelling') && (
                <div className="ml-8 p-3 rounded-xl bg-orange-50 border border-orange-200 text-[10px] text-orange-800 space-y-1">
                  {weekEnd <= 13 ? (
                    <p>🔊 <strong>Tuần 1–13 — Nghe-viết từ đơn:</strong> Ba/mẹ đọc to từng từ tiếng Anh, con tự đánh vần và viết lại.</p>
                  ) : weekStart >= 14 ? (
                    <>
                      <p>🔊 <strong>Tuần 14+ — Dictation câu/đoạn ngắn:</strong> Con nghe và chép lại nguyên câu tiếng Anh.</p>
                      <p>💡 <strong>Dùng Natural Reader (miễn phí):</strong> Copy câu → Paste vào{' '}
                        <a href="https://www.naturalreaders.com/online/" target="_blank" rel="noopener noreferrer" className="underline font-bold text-orange-700">naturalreaders.com</a>{' '}
                        → Phát cho con nghe → Con chép lại.
                      </p>
                    </>
                  ) : (
                    <>
                      <p>🔊 <strong>Tuần 1–13:</strong> Nghe-viết từ đơn. <strong>Tuần 14+:</strong> Dictation câu/đoạn ngắn.</p>
                      <p>💡 Từ tuần 14 dùng{' '}
                        <a href="https://www.naturalreaders.com/online/" target="_blank" rel="noopener noreferrer" className="underline font-bold text-orange-700">Natural Reader</a>{' '}
                        để tạo giọng đọc câu/đoạn.
                      </p>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mode */}
          <div>
            <p className="text-xs font-black text-slate-400 uppercase mb-2">Hình thức</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'onscreen', label: '📱 Làm trực tiếp', desc: 'Hỏi từng câu trên màn hình, xem kết quả ngay' },
                { id: 'print',    label: '🖨️ In ra giấy',    desc: 'Tạo phiếu kiểm tra chuẩn để in' },
              ].map(m => (
                <button key={m.id} onClick={() => setMode(m.id)}
                  className={`text-left p-3 rounded-xl border-2 transition-all ${mode === m.id ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 hover:border-emerald-200'}`}>
                  <p className="text-xs font-black text-slate-700">{m.label}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{m.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Num questions */}
          <div>
            <p className="text-xs font-black text-slate-400 uppercase mb-2">Số câu hỏi: <span className="text-slate-700">{numQ}</span></p>
            <input type="range" min={5} max={20} step={1} value={numQ} onChange={e => setNumQ(Number(e.target.value))}
              className="w-full accent-emerald-600" />
            <div className="flex justify-between text-xs text-slate-400 mt-0.5"><span>5</span><span>20</span></div>
          </div>

          {error && <p className="text-sm text-rose-600 bg-rose-50 rounded-xl px-3 py-2">{error}</p>}

          <button onClick={handleGenerate} disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-black text-sm transition-colors">
            {loading
              ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block"/>&nbsp;Đang tải dữ liệu…</>
              : <><PlayCircle size={16}/> Tạo bài kiểm tra</>}
          </button>
        </div>
      )}

      {/* Print output */}
      {printText && (
        <div className="mt-4 space-y-3">
          <button onClick={() => { setPrintText(''); setAnswerKey(''); setShowAnswerKey(false); }}
            className="text-xs font-bold text-slate-400 hover:text-slate-600 flex items-center gap-1">
            ← Quầy lại cài đặt
          </button>
          <pre className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs font-mono text-slate-700 overflow-auto max-h-80 whitespace-pre-wrap leading-relaxed">{printText}</pre>
          <div className="flex gap-2">
            <button onClick={handlePrint}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs">
              <Printer size={14}/> In phiếu học sinh
            </button>
            <button onClick={handleCopy}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs">
              <Copy size={14}/> {copied ? '✓ Đã sao chép!' : 'Sao chép'}
            </button>
          </div>
          {/* Đáp án — chỉ hiển thị trên máy, không in theo phiếu */}
          <button onClick={() => setShowAnswerKey(v => !v)}
            className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1">
            🔑 {showAnswerKey ? 'Ẩn đáp án' : 'Xem đáp án (chỉ hiển thị trên máy)'}
          </button>
          {showAnswerKey && answerKey && (
            <pre className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs font-mono text-amber-900 whitespace-pre-wrap overflow-auto max-h-48">{answerKey}</pre>
          )}
        </div>
      )}
    </div>
  );
};

export default ParentQuizGenerator;
