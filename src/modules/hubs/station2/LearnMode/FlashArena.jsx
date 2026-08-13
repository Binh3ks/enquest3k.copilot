import React, { useState, useEffect } from 'react';
import { learnerProgressService } from '../../../../services/learnerProgressService';
import { useUserStore } from '../../../../stores/useUserStore';
import { Zap, Trophy, Timer, Swords, CheckCircle2, RefreshCw, Coffee } from 'lucide-react';

const WEEK33_VOCAB_SETS = {
  set1_nouns_adj: [
    { id: "na01", en: "corridor", vi: "hành lang" },
    { id: "na02", en: "bandage", vi: "băng cá nhân" },
    { id: "na03", en: "nurse", vi: "y tế / y tá" },
    { id: "na04", en: "cold pack", vi: "túi chườm lạnh" },
    { id: "na05", en: "relieved", vi: "nhẹ nhõm" },
    { id: "na06", en: "praised", vi: "khen ngợi" },
    { id: "na07", en: "carefully", vi: "cẩn thận" },
    { id: "na08", en: "immediately", vi: "ngay lập tức" },
    { id: "na09", en: "truce", vi: "hòa bình / ngưng chiến" },
    { id: "na10", en: "olympic", vi: "thế vận hội" }
  ],
  set2_verbs: [
    { id: "v01", en: "slipped", vi: "đã trượt chân" },
    { id: "v02", en: "fell down", vi: "đã ngã xuống" },
    { id: "v03", en: "called", vi: "đã gọi trợ giúp" },
    { id: "v04", en: "treated", vi: "đã sơ cứu" },
    { id: "v05", en: "applied", vi: "đã băng bó" },
    { id: "v06", en: "reminded", vi: "đã nhắc nhở" },
    { id: "v07", en: "followed", vi: "đã tuân thủ" },
    { id: "v08", en: "helped", vi: "đã giúp đỡ" },
    { id: "v09", en: "stopped", vi: "đã dừng lại" },
    { id: "v10", en: "praised", vi: "đã khen ngợi" }
  ],
    set3_chunks: [
    { id: "c01", en: "walking carefully down corridor", vi: "đi bộ cẩn thận dưới hành lang" },
    { id: "c02", en: "slipped on the wet floor", vi: "trượt chân trên sàn ướt" },
    { id: "c03", en: "fell down heavily", vi: "ngã xuống rất đau" },
    { id: "c04", en: "called the school nurse", vi: "gọi y tế trường học" },
    { id: "c05", en: "without hesitation", vi: "không một chút chần chừ" },
    { id: "c06", en: "applied a clean bandage", vi: "băng vết thương sạch sẽ" },
    { id: "c07", en: "placed a cold pack", vi: "chườm túi đá lạnh" },
    { id: "c08", en: "felt extremely relieved", vi: "cảm thấy rất nhẹ nhõm" },
    { id: "c09", en: "praised for quick thinking", vi: "khen ngợi vì phản ứng nhanh" },
    { id: "c10", en: "followed safety rules", vi: "tuân thủ quy tắc an toàn" }
  ],
  set4_definitions: [
    { id: "def01", en: "corridor", vi: "A long passage in a school building with doors on each side." },
    { id: "def02", en: "bandage", vi: "A strip of clean material used to bind up a wound or cut." },
    { id: "def03", en: "nurse", vi: "A trained healthcare worker who cares for sick or injured students." },
    { id: "def04", en: "slipped", vi: "Slid accidentally on a wet or smooth floor and lost balance." },
    { id: "def05", en: "relieved", vi: "Feeling happy because something difficult or scary is over." },
    { id: "def06", en: "praised", vi: "Expressed warm approval or admiration for good behavior." },
    { id: "def07", en: "caution", vi: "Care taken to avoid danger, accidents, or mistakes." },
    { id: "def08", en: "immediately", vi: "Right away without any delay." },
    { id: "def09", en: "truce", vi: "An agreement between groups to stop fighting or competing." },
    { id: "def10", en: "olympic", vi: "Relating to the global sports festival originating in ancient Greece." }
  ]
};

export function FlashArena({ customSets, onAttemptResult }) {
  const currentUser = useUserStore((state) => state.currentUser);
  const learnerId = currentUser?.id || currentUser?.username || 'guest_01';

  const [playMode, setPlayMode] = useState('casual'); // 'casual' (Untimed) | 'speed' (30s Timer)
  const [activeSetKey, setActiveSetKey] = useState('set1_nouns_adj');
  const [selectedEn, setSelectedEn] = useState(null);
  const [selectedVi, setSelectedVi] = useState(null);
  const [matchedIds, setMatchedIds] = useState([]);
  const [score, setScore] = useState(0);
  const [botScore, setBotScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isGameOver, setIsGameOver] = useState(false);

  const activeSets = customSets || WEEK33_VOCAB_SETS;
  const currentPairs = activeSets[activeSetKey] || activeSets.set1_nouns_adj || Object.values(activeSets)[0];

  const [shuffledEnList, setShuffledEnList] = useState([]);
  const [shuffledViList, setShuffledViList] = useState([]);

  // Fisher-Yates Shuffle BOTH English and Right columns independently
  useEffect(() => {
    if (!currentPairs || currentPairs.length === 0) return;

    // Shuffle English column
    const arrEn = [...currentPairs];
    for (let i = arrEn.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arrEn[i], arrEn[j]] = [arrEn[j], arrEn[i]];
    }
    setShuffledEnList(arrEn);

    // Shuffle Right column (VI / Definition)
    const arrVi = [...currentPairs];
    for (let i = arrVi.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arrVi[i], arrVi[j]] = [arrVi[j], arrVi[i]];
    }

    // Guarantee no side-by-side row match at the start
    let attempts = 0;
    while (attempts < 10 && arrVi.some((item, idx) => item.id === arrEn[idx]?.id)) {
      for (let i = arrVi.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arrVi[i], arrVi[j]] = [arrVi[j], arrVi[i]];
      }
      attempts++;
    }

    setShuffledViList(arrVi);
  }, [activeSetKey, customSets]);


  // Timer Countdown Engine (Only active in Speed mode)
  useEffect(() => {
    if (playMode !== 'speed' || isGameOver) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const botTimer = setInterval(() => {
      if (!isGameOver) {
        setBotScore((prev) => prev + 10);
      }
    }, 6000);

    return () => {
      clearInterval(timer);
      clearInterval(botTimer);
    };
  }, [playMode, isGameOver]);

  // Handle Match Selection
  const handleEnClick = (item) => {
    if (matchedIds.includes(item.id)) return;
    setSelectedEn(item);
    if (selectedVi) {
      checkMatch(item, selectedVi);
    }
  };

  const handleViClick = (item) => {
    if (matchedIds.includes(item.id)) return;
    setSelectedVi(item);
    if (selectedEn) {
      checkMatch(selectedEn, item);
    }
  };

  const checkMatch = async (enItem, viItem) => {
    if (enItem.id === viItem.id) {
      // Correct Match
      const newMatched = [...matchedIds, enItem.id];
      setMatchedIds(newMatched);
      setScore((prev) => prev + 20);
      setSelectedEn(null);
      setSelectedVi(null);

      // Check if all matched
      if (newMatched.length === currentPairs.length) {
        setIsGameOver(true);
        await learnerProgressService.logAttempt({
          learnerId,
          contentId: `w33_flash_arena_${activeSetKey}`,
          mode: 'learn',
          result: 'correct',
          score: score + 20,
          timeSpentSeconds: 30 - timeLeft
        });

        if (onAttemptResult) {
          onAttemptResult(true, 'flash_arena');
        }
      }
    } else {
      // Incorrect Match
      setSelectedEn(null);
      setSelectedVi(null);
    }
  };

  const handleRestart = () => {
    setMatchedIds([]);
    setSelectedEn(null);
    setSelectedVi(null);
    setScore(0);
    setBotScore(0);
    setTimeLeft(30);
    setIsGameOver(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-3xl border border-slate-200 shadow-md font-sans text-slate-900">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 mb-6 border-b border-slate-200">
        <div>
          <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1.5 w-fit">
            <Zap size={14} /> Flash Arena — Vocabulary Speed Battle
          </span>
          <h2 className="text-xl font-black text-slate-900 mt-1">Week 33 Vocabulary Battle</h2>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
          <button
            onClick={() => { setPlayMode('casual'); handleRestart(); }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
              playMode === 'casual' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Coffee size={14} /> Casual Mode (Untimed)
          </button>
          <button
            onClick={() => { setPlayMode('speed'); handleRestart(); }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
              playMode === 'speed' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Timer size={14} /> Speed Battle (30s)
          </button>
        </div>
      </div>

      {/* Set Selector */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        <span className="text-xs font-black text-slate-500 uppercase mr-2">Card Sets:</span>
        {Object.keys(activeSets).map((key, idx) => (
          <button
            key={key}
            onClick={() => { setActiveSetKey(key); handleRestart(); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition border ${
              activeSetKey === key
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {idx === 0
              ? 'Set 1: Nouns & Adjectives'
              : idx === 1
              ? 'Set 2: Action Verbs'
              : idx === 2
              ? 'Set 3: Chunks & Collocations'
              : 'Set 4: Definitions'}
          </button>
        ))}
      </div>

      {/* Arena Status Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        <div className="p-3 bg-indigo-50 rounded-2xl border border-indigo-100 flex items-center gap-3">
          <div className="p-2.5 bg-indigo-600 text-white rounded-xl">
            <Trophy size={18} />
          </div>
          <div>
            <div className="text-[10px] text-indigo-700 font-black uppercase">Your Score</div>
            <div className="text-lg font-black text-indigo-950">{score} pts</div>
          </div>
        </div>

        <div className="p-3 bg-purple-50 rounded-2xl border border-purple-100 flex items-center gap-3">
          <div className="p-2.5 bg-purple-600 text-white rounded-xl">
            <Swords size={18} />
          </div>
          <div>
            <div className="text-[10px] text-purple-700 font-black uppercase">Mode</div>
            <div className="text-sm font-black text-purple-950">
              {playMode === 'casual' ? 'Untimed Practice' : `Speed (${timeLeft}s remaining)`}
            </div>
          </div>
        </div>

        <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-3 col-span-2 sm:col-span-1">
          <div className="p-2.5 bg-emerald-600 text-white rounded-xl">
            <CheckCircle2 size={18} />
          </div>
          <div>
            <div className="text-[10px] text-emerald-700 font-black uppercase">Matched</div>
            <div className="text-sm font-black text-emerald-950">{matchedIds.length}/{currentPairs.length} Pairs</div>
          </div>
        </div>
      </div>

      {/* Main Matching Grid */}
      {!isGameOver ? (
        <div className="grid grid-cols-2 gap-4">
          {/* English Column */}
          <div className="space-y-2.5">
            <div className="text-xs font-black text-slate-400 uppercase tracking-wider text-center mb-1">ENGLISH</div>
            {(shuffledEnList.length > 0 ? shuffledEnList : currentPairs).map((item) => {

              const isMatched = matchedIds.includes(item.id);
              const isSelected = selectedEn?.id === item.id;
              return (
                <button
                  key={item.id}
                  disabled={isMatched}
                  onClick={() => handleEnClick(item)}
                  className={`w-full p-4 rounded-2xl font-black text-sm transition border text-left shadow-sm ${
                    isMatched
                      ? 'bg-slate-100 text-slate-300 border-slate-200 line-through'
                      : isSelected
                      ? 'bg-indigo-600 text-white border-indigo-600 ring-4 ring-indigo-200 shadow-md scale-102'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                  }`}
                >
                  {item.en}
                </button>
              );
            })}
          </div>

          {/* Meaning / Definition Column (Shuffled to prevent straight row matching) */}
          <div className="space-y-2.5">
            <div className="text-xs font-black text-slate-400 uppercase tracking-wider text-center mb-1">
              {activeSetKey === 'set4_definitions' ? 'DEFINITION (ENGLISH)' : 'VIETNAMESE'}
            </div>
            {(shuffledViList.length > 0 ? shuffledViList : currentPairs).map((item) => {
              const isMatched = matchedIds.includes(item.id);
              const isSelected = selectedVi?.id === item.id;
              return (
                <button
                  key={item.id}
                  disabled={isMatched}
                  onClick={() => handleViClick(item)}
                  className={`w-full p-4 rounded-2xl font-black text-sm transition border text-left shadow-sm ${
                    isMatched
                      ? 'bg-slate-100 text-slate-300 border-slate-200 line-through'
                      : isSelected
                      ? 'bg-purple-600 text-white border-purple-600 ring-4 ring-purple-200 shadow-md scale-102'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                  }`}
                >
                  {item.vi}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        /* Game Over Screen */
        <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-4 animate-in fade-in">
          <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto text-2xl font-black shadow-md">
            🏆
          </div>
          <h3 className="text-xl font-black text-slate-900">Flash Arena Completed!</h3>
          <p className="text-sm font-bold text-slate-600">Total Score Achieved: {score} Points</p>
          <button
            onClick={handleRestart}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-xl text-sm transition inline-flex items-center gap-2 shadow-md"
          >
            <RefreshCw size={16} /> Play Arena Again
          </button>
        </div>
      )}
    </div>
  );
}
