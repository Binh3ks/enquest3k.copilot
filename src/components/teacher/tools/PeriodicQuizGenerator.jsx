import { useState } from 'react';
import { Printer, Copy, RefreshCw, Calendar, ChevronDown, ChevronUp } from 'lucide-react';

// Vite glob — must be at module level so Vite can statically analyze
const FLAT_MODS  = import.meta.glob('../../../data/weeks/week_*_real.js');
const SUB_MODS   = import.meta.glob('../../../data/weeks/week_*/week_*_real.js');
const VOCAB_MODS = import.meta.glob('../../../data/weeks/week_*/vocab.js');

const getMeaning = (w) => typeof w === 'object'
  ? (w.definition_vi || w.meaning_vi || w.translation || w.definition_en || '?')
  : '?';

const getExample = (w, word) => {
  const ex    = typeof w === 'object' ? (w.example || w.example_sentence_en || '') : '';
  const blank = `(${word[0]}${'_'.repeat(Math.max(14, word.length + 8))})`; // hint at start, plenty of writing space
  if (ex) {
    const replaced = ex.replace(new RegExp(`\\b${word}\\b`, 'i'), blank);
    return replaced !== ex ? replaced : `${ex.replace(/[.!?]$/, '')} — ${blank}`;
  }
  return blank;
};

const PERIOD_PRESETS = [
  {
    id: 'weekly',
    label: '📅 Weekly Test',
    desc: 'Vocabulary & grammar review after each lesson',
    weeks: 1,
    numWords: 10,
    badgeColor: 'bg-green-100 text-green-700',
  },
  {
    id: 'biweekly',
    label: '📆 Bi-Weekly Test',
    desc: 'Mini-test at the midpoint of a 4-week block',
    weeks: 2,
    numWords: 15,
    badgeColor: 'bg-sky-100 text-sky-700',
  },
  {
    id: 'monthly',
    label: '🗓️ Monthly Test (4 Weeks)',
    desc: 'End-of-block review covering all 4 weeks',
    weeks: 4,
    numWords: 20,
    badgeColor: 'bg-violet-100 text-violet-700',
  },
  {
    id: 'midterm',
    label: '📋 Mid-Term (8 Weeks)',
    desc: 'Comprehensive 4-skill assessment',
    weeks: 8,
    numWords: 30,
    badgeColor: 'bg-amber-100 text-amber-700',
  },
  {
    id: 'checkpoint',
    label: '🏆 Cambridge Checkpoint',
    desc: 'Periodic Cambridge-style level assessment',
    weeks: 14,
    numWords: 40,
    badgeColor: 'bg-rose-100 text-rose-700',
  },
  {
    id: 'custom',
    label: '⚙️ Custom',
    desc: 'Choose week range and question count manually',
    weeks: null,
    numWords: null,
    badgeColor: 'bg-slate-100 text-slate-600',
  },
];

const QUIZ_SECTIONS = [
  { id: 'vocab_match',  label: '🔗 Word Matching',          selected: true  },
  { id: 'fill_blank',   label: '✏️ Fill in the Blank',      selected: true  },
  { id: 'mc',           label: '🔘 Multiple Choice',        selected: true  },
  { id: 'translation',  label: '🌐 Vietnamese → English',   selected: false },
  { id: 'sentence',     label: '📝 Write a Sentence',       selected: false },
];

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }

// Each builder returns { quiz, key } so student sheet and answer key are built from same data
function buildMatchingSection(vocab, n) {
  const words    = shuffle(vocab).slice(0, n);
  const shuffled = shuffle([...words]);
  const left  = words.map((w, i)   => `${i+1}. ${typeof w === 'string' ? w : w.word}`);
  const right = shuffled.map((w, i) => `${String.fromCharCode(65+i)}. ${getMeaning(w)}`);
  const lines = [];
  for (let i = 0; i < Math.max(left.length, right.length); i++) {
    lines.push(`  ${(left[i] || '').padEnd(28)} ${right[i] || ''}`);
  }
  const keyLines = words.map((w) => {
    const word = typeof w === 'string' ? w : w.word;
    const ri   = shuffled.findIndex(s => (typeof s === 'string' ? s : s.word) === word);
    return `  ${word} \u2192 ${String.fromCharCode(65 + ri)}`;
  });
  return { quiz: lines.join('\n'), key: keyLines.join('   ') };
}

function buildFillBlankSection(vocab, n) {
  const words = shuffle(vocab).slice(0, n);
  const quizLines = words.map((w, i) => {
    const word = typeof w === 'string' ? w : w.word;
    return `  ${i+1}. ${getExample(w, word)}`;
  });
  const keyLines = words.map((w, i) => {
    const word = typeof w === 'string' ? w : w.word;
    return `  ${i+1}. ${word}`;
  });
  return { quiz: quizLines.join('\n'), key: keyLines.join('\n') };
}

function buildMCSection(vocab, n) {
  const words = shuffle(vocab).slice(0, n);
  const quizParts = [];
  const keyParts  = [];
  words.forEach((w, i) => {
    const word    = typeof w === 'string' ? w : w.word;
    const meaning = getMeaning(w);
    const others  = vocab.filter(v => (typeof v === 'string' ? v : v.word) !== word);
    const opts    = shuffle([meaning, ...shuffle(others).slice(0, 3).map(getMeaning)]);
    const correct = String.fromCharCode(65 + opts.indexOf(meaning));
    quizParts.push(`  ${i+1}. "${word}" means:`, ...opts.map((o, j) => `     ${String.fromCharCode(65+j)}. ${o}`), '');
    keyParts.push(`  ${i+1}. ${word} \u2192 ${correct}`);
  });
  return { quiz: quizParts.join('\n'), key: keyParts.join('\n') };
}

function buildTranslationSection(vocab, n) {
  const words = shuffle(vocab).slice(0, n);
  const quizLines = words.map((w, i) => `  ${i+1}. ${getMeaning(w)}  \u2192  ________________________________`);
  const keyLines  = words.map((w, i) => `  ${i+1}. ${typeof w === 'string' ? w : w.word}`);
  return { quiz: quizLines.join('\n'), key: keyLines.join('\n') };
}

function buildSentenceSection(vocab, n) {
  const words = shuffle(vocab).slice(0, n);
  const quizLines = words.map((w, i) => {
    const word = typeof w === 'string' ? w : w.word;
    return `  ${i+1}. Use "${word}" in a complete sentence:\n     _______________________________________________`;
  });
  const keyLines = words.map((w, i) => `  ${i+1}. "${typeof w === 'string' ? w : w.word}" \u2014 open-ended (check for correct usage)`);
  return { quiz: quizLines.join('\n'), key: keyLines.join('\n') };
}

// Returns { studentSheet, answerKeySheet } — answer key is NEVER embedded in student sheet
function buildFullQuiz({ title, className, date, vocab, sections, weekStart, weekEnd }) {
  const sep = '\u2500'.repeat(56);
  const studentHeader = [
    sep,
    `  ${title.toUpperCase()} \u2014 VOCABULARY TEST`,
    `  Weeks: ${weekStart}\u2013${weekEnd}  |  Word pool: ${vocab.length} words`,
    `  Class: ${className || '___________'}   Date: ${date || '_____________'}`,
    `  Student Name: ________________________________  Score: _______`,
    sep, '',
  ].join('\n');
  const keyHeader = [
    sep,
    `  ANSWER KEY \u2014 ${title.toUpperCase()}`,
    `  Weeks: ${weekStart}\u2013${weekEnd}  \u2014  TEACHER ONLY \u2014 DO NOT DISTRIBUTE`,
    sep, '',
  ].join('\n');

  const quizParts = [];
  const keyParts  = [];
  let idx = 1;

  if (sections.includes('vocab_match')) {
    const n = Math.min(10, vocab.length);
    const { quiz, key } = buildMatchingSection(vocab, n);
    quizParts.push(`PART ${idx}: WORD MATCHING (${n} items)\nDraw a line to match each word with its meaning.\n\n${quiz}`);
    keyParts.push(`PART ${idx}: WORD MATCHING\n${key}`);
    idx++;
  }
  if (sections.includes('fill_blank')) {
    const n = Math.min(8, vocab.length);
    const { quiz, key } = buildFillBlankSection(vocab, n);
    quizParts.push(`PART ${idx}: FILL IN THE BLANK (${n} items)\nWrite the missing word in each blank.\n\n${quiz}`);
    keyParts.push(`PART ${idx}: FILL IN THE BLANK\n${key}`);
    idx++;
  }
  if (sections.includes('mc')) {
    const n = Math.min(8, vocab.length);
    const { quiz, key } = buildMCSection(vocab, n);
    quizParts.push(`PART ${idx}: MULTIPLE CHOICE (${n} items)\nCircle the correct meaning.\n\n${quiz}`);
    keyParts.push(`PART ${idx}: MULTIPLE CHOICE\n${key}`);
    idx++;
  }
  if (sections.includes('translation')) {
    const n = Math.min(6, vocab.length);
    const { quiz, key } = buildTranslationSection(vocab, n);
    quizParts.push(`PART ${idx}: TRANSLATE — Vietnamese \u2192 English (${n} items)\n\n${quiz}`);
    keyParts.push(`PART ${idx}: TRANSLATION\n${key}`);
    idx++;
  }
  if (sections.includes('sentence')) {
    const n = Math.min(4, vocab.length);
    const { quiz, key } = buildSentenceSection(vocab, n);
    quizParts.push(`PART ${idx}: WRITE A SENTENCE (${n} items)\n\n${quiz}`);
    keyParts.push(`PART ${idx}: SENTENCES\n${key}`);
    idx++;
  }

  return {
    studentSheet:  studentHeader + quizParts.join('\n\n' + sep + '\n\n'),
    answerKeySheet: keyHeader   + keyParts.join('\n\n' + sep + '\n\n'),
  };
}

// ─── Component ────────────────────────────────────────────────────────────────
const PeriodicQuizGenerator = () => {
  const [preset, setPreset]         = useState('monthly');
  const [weekStart, setWeekStart]   = useState(1);
  const [weekEnd, setWeekEnd]       = useState(4);
  const [className, setClassName]   = useState('');
  const [quizDate, setQuizDate]     = useState(() => new Date().toLocaleDateString('vi-VN'));
  const [sections, setSections]     = useState(() => QUIZ_SECTIONS.filter(s => s.selected).map(s => s.id));
  const [loading, setLoading]               = useState(false);
  const [error, setError]                   = useState('');
  const [warning, setWarning]               = useState('');
  const [output, setOutput]                 = useState('');
  const [answerKeyOutput, setAnswerKeyOutput] = useState('');
  const [showAnswerKey, setShowAnswerKey]   = useState(false);
  const [copied, setCopied]                 = useState(false);
  const [showSections, setShowSections]     = useState(false);

  const selectedPreset = PERIOD_PRESETS.find(p => p.id === preset);

  // Auto-set week range when preset changes
  const applyPreset = (pid) => {
    setPreset(pid);
    const p = PERIOD_PRESETS.find(x => x.id === pid);
    if (p?.weeks) {
      // Align to latest complete block
      setWeekEnd(p.weeks);
      setWeekStart(1);
    }
  };

  const handleWeekStartChange = (val) => {
    setWeekStart(val);
    if (weekEnd < val) setWeekEnd(val);
  };

  const toggleSection = (id) => {
    setSections(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const loadVocabRange = async (start, end) => {
    const all = [];
    const missing = [];
    for (let w = start; w <= end; w++) {
      const pad = String(w).padStart(2, '0');
      const flatKey  = `../../../data/weeks/week_${pad}_real.js`;
      const subKey   = `../../../data/weeks/week_${pad}/week_${pad}_real.js`;
      const vocabKey = `../../../data/weeks/week_${pad}/vocab.js`;
      let found = false;
      try {
        let mod;
        if (FLAT_MODS[flatKey])       mod = await FLAT_MODS[flatKey]();
        else if (SUB_MODS[subKey])    mod = await SUB_MODS[subKey]();
        if (mod) {
          const data = mod.default;
          const vocab = data?.target_vocab || [];
          if (vocab.length) { all.push(...vocab); found = true; }
        }
      } catch { /* continue */ }
      // Fallback: try vocab.js if _real.js had no data
      if (!found && VOCAB_MODS[vocabKey]) {
        try {
          const vmod = await VOCAB_MODS[vocabKey]();
          const vocab = vmod.default?.vocab || [];
          if (vocab.length) {
            // Convert to target_vocab shape
            all.push(...vocab.map(v => ({
              word: v.word,
              definition_vi: v.definition_vi,
              example: v.example,
            })));
            found = true;
          }
        } catch { /* skip */ }
      }
      if (!found) missing.push(w);
    }
    return { vocab: all, missing };
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    setWarning('');
    setOutput('');
    try {
      const { vocab, missing } = await loadVocabRange(weekStart, weekEnd);
      if (!vocab.length) throw new Error(`Không tìm thấy từ vựng nào cho tuần ${weekStart}–${weekEnd}. Dữ liệu chưa được tạo.`);
      if (missing.length) setWarning(`⚠️ Tuần chưa có dữ liệu: ${missing.join(', ')} — đã bỏ qua. Test dựa trên ${vocab.length} từ từ các tuần còn lại.`);
      const title = selectedPreset?.id === 'custom'
        ? `Weeks ${weekStart}–${weekEnd}`
        : selectedPreset?.label?.replace(/^\S+\s/, '');
      const { studentSheet, answerKeySheet } = buildFullQuiz({
        title: title || 'Periodic',
        className,
        date: quizDate,
        vocab: shuffle(vocab),
        sections,
        weekStart,
        weekEnd,
      });
      setOutput(studentSheet);
      setAnswerKeyOutput(answerKeySheet);
      setShowAnswerKey(false);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handlePrint = () => {
    const win = window.open('', '_blank');
    win.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>Test</title></head><body><pre style="font-family:monospace;font-size:13px;padding:24px;white-space:pre-wrap;line-height:1.6">${output.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</pre></body></html>`);
    win.document.close();
    win.print();
  };

  const handlePrintAnswerKey = () => {
    const win = window.open('', '_blank');
    win.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>Answer Key</title></head><body><pre style="font-family:monospace;font-size:13px;padding:24px;white-space:pre-wrap;line-height:1.6">${answerKeyOutput.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</pre></body></html>`);
    win.document.close();
    win.print();
  };

  return (
    <div className="p-6 border-t-2 border-dashed border-amber-200 mt-2">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
          <Calendar size={20} className="text-violet-600" />
        </div>
        <div>
          <h2 className="text-base font-black text-gray-800">Periodic Test Generator</h2>
          <p className="text-xs text-gray-500">Weekly · Monthly · Mid-Term · Cambridge Checkpoint</p>
        </div>
      </div>

      {/* Preset cards */}
      <div className="mb-4">
        <p className="text-xs font-bold text-gray-500 uppercase mb-2">Select Test Type</p>
        <div className="grid grid-cols-2 gap-2">
          {PERIOD_PRESETS.map(p => (
            <button key={p.id} onClick={() => applyPreset(p.id)}
              className={`text-left p-3 rounded-xl border-2 transition-all ${preset === p.id ? 'border-violet-500 bg-violet-50' : 'border-gray-200 hover:border-violet-300 bg-white'}`}>
              <span className={`inline-block text-[10px] font-black px-2 py-0.5 rounded-full mb-1 ${p.badgeColor}`}>{p.id === 'custom' ? 'Tùy chỉnh' : p.label.replace(/^\S+\s/, '')}</span>
              <p className="text-xs font-bold text-gray-700 leading-snug">{p.label}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">{p.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Week range */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label className="text-xs font-bold text-gray-500 mb-1 block">From Week</label>
          <select value={weekStart} onChange={e => handleWeekStartChange(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-violet-400 focus:border-transparent">
            {Array.from({length:30},(_,i)=>i+1).map(w=><option key={w} value={w}>Tuần {w}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs font-bold text-gray-500 mb-1 block">To Week</label>
          <select value={weekEnd} onChange={e => setWeekEnd(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-violet-400 focus:border-transparent">
            {Array.from({length:30},(_,i)=>i+1).filter(w=>w>=weekStart).map(w=><option key={w} value={w}>Tuần {w}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs font-bold text-gray-500 mb-1 block">Class Name</label>
          <input type="text" placeholder="e.g. 5A, Group 2..." value={className} onChange={e => setClassName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-violet-400 focus:border-transparent" />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-500 mb-1 block">Test Date</label>
          <input type="text" value={quizDate} onChange={e => setQuizDate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-violet-400 focus:border-transparent" />
        </div>
      </div>

      {/* Sections toggle */}
      <div className="mb-4">
        <button onClick={() => setShowSections(v => !v)}
          className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 font-bold mb-2">
          {showSections ? <ChevronUp size={13}/> : <ChevronDown size={13}/>}
          Test Sections ({sections.length} selected)
        </button>
        {showSections && (
          <div className="grid grid-cols-2 gap-2">
            {QUIZ_SECTIONS.map(s => (
              <label key={s.id} className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-all ${sections.includes(s.id) ? 'border-violet-400 bg-violet-50' : 'border-gray-200 hover:border-violet-200'}`}>
                <input type="checkbox" checked={sections.includes(s.id)} onChange={() => toggleSection(s.id)} className="accent-violet-600" />
                <span className="text-xs font-medium text-gray-700">{s.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {error   && <p className="text-sm text-red-600   bg-red-50   rounded-lg px-3 py-2 mb-3">{error}</p>}
      {warning && <p className="text-sm text-amber-700 bg-amber-50 rounded-lg px-3 py-2 mb-3">{warning}</p>}

      <button onClick={handleGenerate} disabled={loading || !sections.length}
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white font-black text-sm transition-colors mb-4">
        {loading ? <><RefreshCw size={14} className="animate-spin"/> Loading…</> : <><Calendar size={14}/> Generate Test</>}
      </button>

      {output && (
        <div className="space-y-3">
          <pre className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-xs font-mono text-gray-700 whitespace-pre-wrap overflow-auto max-h-80">{output}</pre>
          <div className="flex gap-2 flex-wrap">
            <button onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs transition-colors">
              <Printer size={13}/> Print Student Sheet
            </button>
            <button onClick={handlePrintAnswerKey}
              className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-black text-xs transition-colors">
              <Printer size={13}/> Print Answer Key
            </button>
            <button onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 font-black text-xs transition-colors">
              <Copy size={13}/> {copied ? '✓ Copied!' : 'Copy'}
            </button>
            <button onClick={() => { setOutput(''); setAnswerKeyOutput(''); setShowAnswerKey(false); }}
              className="px-3 py-2 rounded-xl border border-gray-200 text-gray-500 text-xs font-black hover:border-gray-300 transition-colors">✕</button>
          </div>
          {/* Answer key — teacher only, never printed on student sheet */}
          <button onClick={() => setShowAnswerKey(v => !v)}
            className="flex items-center gap-1 text-xs text-amber-600 hover:text-amber-700 font-bold">
            {showAnswerKey ? <ChevronUp size={13}/> : <ChevronDown size={13}/>}
            {showAnswerKey ? 'Hide Answer Key' : '🔑 Show Answer Key (Teacher Only)'}
          </button>
          {showAnswerKey && (
            <pre className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs font-mono text-amber-900 whitespace-pre-wrap overflow-auto max-h-60">{answerKeyOutput}</pre>
          )}
        </div>
      )}
    </div>
  );
};

export default PeriodicQuizGenerator;
