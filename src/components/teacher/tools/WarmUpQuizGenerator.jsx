import { useState, useMemo } from 'react';
import { Printer, Copy, RefreshCw, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';

// Vite glob — resolves all real-data files at build time (no runtime dynamic import issues)
const FLAT_MODS = import.meta.glob('../../../data/weeks/week_*_real.js');
const SUB_MODS  = import.meta.glob('../../../data/weeks/week_*/week_*_real.js');

const getMeaning = (w) => typeof w === 'object'
  ? (w.definition_vi || w.meaning_vi || w.translation || w.definition_en || '?')
  : '?';

// ─── Data: week vocab extracted from week_XX_real.js target_vocab ───────────
// We import lazily per-selection to avoid bundle bloat
const WEEK_LIST = Array.from({ length: 30 }, (_, i) => ({ value: i + 1, label: `Tuần ${i + 1}` }));

const QUIZ_TYPES = [
  { id: 'fill_blank',      label: '✏️ Fill in the Blank',   desc: 'I am a (s______________) → student' },
  { id: 'matching',        label: '🔗 Word Matching',        desc: 'student ↔ học sinh' },
  { id: 'multiple_choice', label: '🔘 Multiple Choice',      desc: 'A. student  B. teacher  C. school' },
  { id: 'translation',     label: '🌐 Vietnamese → English', desc: 'học sinh → ___' },
];

function buildFillBlankQuiz(vocab) {
  return vocab.map((w, i) => {
    const word  = typeof w === 'string' ? w : w.word;
    const blank = `(${word[0]}${'_'.repeat(Math.max(14, word.length + 8))})`; // hint at start, plenty of writing space
    const ex    = typeof w === 'object' ? (w.example || w.example_sentence_en || '') : '';
    let sentence;
    if (ex) {
      const replaced = ex.replace(new RegExp(`\\b${word}\\b`, 'i'), blank);
      sentence = replaced !== ex ? replaced : `${ex.replace(/[.!?]$/, '')} — ${blank}`;
    } else {
      sentence = blank;
    }
    return `${i + 1}. ${sentence}`;
  }).join('\n');
}

function buildMatchingQuiz(vocab) {
  const shuffled = [...vocab].sort(() => Math.random() - 0.5);
  const left  = vocab.map((w, i)  => `${i + 1}. ${typeof w === 'string' ? w : w.word}`);
  const right = shuffled.map((w, i) => `${String.fromCharCode(65 + i)}. ${getMeaning(w)}`);
  const lines = [];
  for (let i = 0; i < Math.max(left.length, right.length); i++) {
    lines.push(`${(left[i] || '').padEnd(30)} ${right[i] || ''}`);
  }
  return lines.join('\n');
}

function buildMCQuiz(vocab) {
  return vocab.map((w, i) => {
    const word    = typeof w === 'string' ? w : w.word;
    const meaning = getMeaning(w);
    const others  = vocab.filter(v => (typeof v === 'string' ? v : v.word) !== word);
    const dists   = others.sort(() => Math.random() - 0.5).slice(0, 3).map(getMeaning);
    const options = [meaning, ...dists].sort(() => Math.random() - 0.5);
    return [
      `${i + 1}. "${word}" means:`,
      ...options.map((o, j) => `   ${String.fromCharCode(65 + j)}. ${o}`),
      ''
    ].join('\n');
  }).join('\n');
}

function buildMCAnswerKey(vocab) {
  return vocab.map((w, i) => {
    const word    = typeof w === 'string' ? w : w.word;
    const meaning = getMeaning(w);
    const others  = vocab.filter(v => (typeof v === 'string' ? v : v.word) !== word);
    const dists   = others.sort(() => Math.random() - 0.5).slice(0, 3).map(getMeaning);
    const options = [meaning, ...dists].sort(() => Math.random() - 0.5);
    const ans     = String.fromCharCode(65 + options.indexOf(meaning));
    return `${i + 1}. ${word} → ${ans}`;
  }).join('  |  ');
}

function buildTranslationQuiz(vocab) {
  return vocab.map((w, i) => {
    const meaning = getMeaning(w);
    return `${i + 1}. ${meaning}  →  ________________________________`;
  }).join('\n');
}

function buildTranslationAnswerKey(vocab) {
  return vocab.map((w, i) => {
    const word = typeof w === 'string' ? w : w.word;
    return `${i + 1}. ${word}`;
  }).join('  |  ');
}

function generateQuiz(type, vocab) {
  switch (type) {
    case 'fill_blank':       return buildFillBlankQuiz(vocab);
    case 'matching':         return buildMatchingQuiz(vocab);
    case 'multiple_choice':  return buildMCQuiz(vocab);
    case 'translation':      return buildTranslationQuiz(vocab);
    default:                 return '';
  }
}

// ─── Component ───────────────────────────────────────────────────────────────
const WarmUpQuizGenerator = () => {
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [quizType, setQuizType]         = useState('fill_blank');
  const [weekData, setWeekData]         = useState(null);
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState('');
  const [showAnswerKey, setShowAnswerKey] = useState(false);
  const [copied, setCopied]               = useState(false);

  const loadWeek = async (weekNum) => {
    setLoading(true);
    setError('');
    setWeekData(null);
    try {
      const pad = String(weekNum).padStart(2, '0');
      const flatKey = `../../../data/weeks/week_${pad}_real.js`;
      const subKey  = `../../../data/weeks/week_${pad}/week_${pad}_real.js`;
      let mod;
      if (FLAT_MODS[flatKey])       mod = await FLAT_MODS[flatKey]();
      else if (SUB_MODS[subKey])    mod = await SUB_MODS[subKey]();
      else throw new Error('File not found in bundle');
      const data = mod.default;
      if (!data) throw new Error('No data found');
      setWeekData(data);
    } catch (e) {
      setError(`Không tải được dữ liệu Tuần ${weekNum}. ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  const vocab = useMemo(() => {
    if (!weekData) return [];
    const raw = weekData.target_vocab || weekData.vocab?.words || [];
    return raw.slice(0, 10); // max 10 words for warm-up
  }, [weekData]);

  const quizText = useMemo(() => {
    if (!vocab.length) return '';
    return generateQuiz(quizType, vocab);
  }, [quizType, vocab]);

  const weekTitle = weekData?.week_title_en || weekData?.week_title_vi || `Tuần ${selectedWeek}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullOutput()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Student sheet — NO answer key
  const studentSheet = () => [
    `WARM-UP QUIZ — ${weekTitle.toUpperCase()}`,
    `Date: ____________  Class: ____________  Name: ________________________`,
    '',
    quizText,
  ].join('\n');

  // Answer key for teacher only (never printed on student sheet)
  const answerKeyText = () => {
    const words = vocab.map((w, i) => `${i + 1}. ${typeof w === 'string' ? w : w.word}`).join('  |  ');
    if (quizType === 'multiple_choice') return `ANSWER KEY — ${weekTitle.toUpperCase()}\n${buildMCAnswerKey(vocab)}`;
    if (quizType === 'translation')     return `ANSWER KEY — ${weekTitle.toUpperCase()}\n${buildTranslationAnswerKey(vocab)}`;
    return `ANSWER KEY — ${weekTitle.toUpperCase()}\n${words}`;
  };

  // Legacy helper kept for copy button
  const fullOutput = studentSheet;

  const handlePrint = () => {
    const win = window.open('', '_blank');
    win.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>Warm-Up Quiz</title></head><body><pre style="font-family:monospace;font-size:14px;padding:24px;white-space:pre-wrap;line-height:1.7">${studentSheet().replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</pre></body></html>`);
    win.document.close();
    win.print();
  };

  const handlePrintAnswerKey = () => {
    const win = window.open('', '_blank');
    win.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>Answer Key</title></head><body><pre style="font-family:monospace;font-size:14px;padding:24px;white-space:pre-wrap;line-height:1.7">${answerKeyText().replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</pre></body></html>`);
    win.document.close();
    win.print();
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
          <BookOpen size={20} className="text-amber-600" />
        </div>
        <div>
          <h2 className="text-base font-black text-gray-800">Warm-Up Quiz Generator</h2>
          <p className="text-xs text-gray-500">Quick vocabulary quiz for the start of class</p>
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Week selector */}
        <div>
          <label className="text-xs font-bold text-gray-600 mb-1 block">Ôn tuần nào? <span className="text-amber-500">(tuần trước đó)</span></label>
          <select
            value={selectedWeek}
            onChange={e => { const w = Number(e.target.value); setSelectedWeek(w); loadWeek(w); }}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-amber-400 focus:border-transparent"
          >
            {WEEK_LIST.map(w => <option key={w.value} value={w.value}>{w.label}</option>)}
          </select>
          <p className="text-[10px] text-gray-400 mt-1">Warm-up nên ôn từ vựng tuần trước, không phải tuần đang học.</p>
        </div>

        {/* Quiz type */}
        <div>
          <label className="text-xs font-bold text-gray-600 mb-1 block">Quiz Type</label>
          <select
            value={quizType}
            onChange={e => setQuizType(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-amber-400 focus:border-transparent"
          >
            {QUIZ_TYPES.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
          </select>
        </div>
      </div>

      {/* Load button */}
      {!weekData && !loading && (
        <button
          onClick={() => loadWeek(selectedWeek)}
          className="w-full py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm transition-colors mb-4"
        >
          Load Week {selectedWeek} Data
        </button>
      )}

      {loading && (
        <div className="text-center py-8 text-gray-500 text-sm animate-pulse">Loading data...</div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700 mb-4">{error}</div>
      )}

      {/* Preview */}
      {weekData && !loading && (
        <>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                Preview — {vocab.length} từ · {weekTitle}
              </span>
              <button
                onClick={() => setQuizType(QUIZ_TYPES[(QUIZ_TYPES.findIndex(t => t.id === quizType) + 1) % QUIZ_TYPES.length].id)}
                className="flex items-center gap-1 text-xs text-amber-600 hover:text-amber-700 font-medium"
              >
                <RefreshCw size={12} /> Đổi loại
              </button>
            </div>
            <pre className="text-xs text-gray-700 whitespace-pre-wrap font-mono leading-relaxed">
              {`WARM-UP QUIZ — ${weekTitle.toUpperCase()}\n\n`}{quizText}
            </pre>
          </div>

          {/* Answer key toggle (teacher only — never printed on student sheet) */}
          <button
            onClick={() => setShowAnswerKey(v => !v)}
            className="flex items-center gap-1 text-xs text-amber-600 hover:text-amber-700 mb-3 font-bold"
          >
            {showAnswerKey ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
            {showAnswerKey ? 'Hide Answer Key' : '🔑 Show Answer Key (Teacher Only)'}
          </button>

          {showAnswerKey && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-3 text-xs font-mono text-amber-800 whitespace-pre-wrap">
              {answerKeyText()}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition-colors"
            >
              <Printer size={15} /> Print Student Sheet
            </button>
            <button
              onClick={handlePrintAnswerKey}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm transition-colors"
            >
              <Printer size={15} /> Print Answer Key
            </button>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold text-sm transition-colors"
            >
              <Copy size={15} /> {copied ? '✓ Copied!' : 'Copy Text'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default WarmUpQuizGenerator;
