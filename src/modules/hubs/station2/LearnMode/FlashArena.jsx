import React, { useState, useEffect } from 'react';
import { learnerProgressService } from '../../../../services/learnerProgressService';
import { useUserStore } from '../../../../stores/useUserStore';
import { Zap, Trophy, Timer, Swords, CheckCircle2, RefreshCw, Coffee } from 'lucide-react';

const WEEK33_VOCAB_SETS = {
  set1_nouns_adj: [
    { id: "na01", en: "mistake", vi: "sai lầm / lỗi" },
    { id: "na02", en: "accident", vi: "sự cố tai nạn" },
    { id: "na03", en: "puddle", vi: "vũng nước" },
    { id: "na04", en: "backpack", vi: "chiếc cặp sách" },
    { id: "na05", en: "vase", vi: "bình hoa" },
    { id: "na06", en: "careful", vi: "cẩn thận" },
    { id: "na07", en: "clumsy", vi: "vụng về" },
    { id: "na08", en: "sorry", vi: "xin lỗi / hối hận" },
    { id: "na09", en: "cautious", vi: "cẩn trọng" },
    { id: "na10", en: "careless", vi: "bất cẩn" }
  ],
  set2_verbs: [
    { id: "v01", en: "broke", vi: "đã làm vỡ" },
    { id: "v02", en: "fell", vi: "đã ngã" },
    { id: "v03", en: "lost", vi: "đã làm mất" },
    { id: "v04", en: "found", vi: "đã tìm thấy" },
    { id: "v05", en: "slipped", vi: "đã trượt chân" },
    { id: "v06", en: "spilled", vi: "đã làm tràn / đổ" },
    { id: "v07", en: "dropped", vi: "đánh rơi" },
    { id: "v08", en: "apologized", vi: "đã xin lỗi" },
    { id: "v09", en: "repaired", vi: "đã sửa chữa" },
    { id: "v10", en: "searched", vi: "đã tìm kiếm" }
  ],
  set3_chunks: [
    { id: "c01", en: "broke an alarm clock", vi: "làm vỡ đồng hồ báo thức" },
    { id: "c02", en: "slipped on a puddle", vi: "trượt chân trên vũng nước" },
    { id: "c03", en: "spilled the juice", vi: "làm đổ nước trái cây" },
    { id: "c04", en: "apologized to mom", vi: "xin lỗi mẹ" },
    { id: "c05", en: "lost his backpack", vi: "làm mất chiếc cặp" },
    { id: "c06", en: "dropped a glass", vi: "đánh rơi ly nước" },
    { id: "c07", en: "cleaned up carefully", vi: "cẩn thận dọn dẹp" },
    { id: "c08", en: "damaged a notebook", vi: "làm hư cuốn vở" },
    { id: "c09", en: "searched the bus", vi: "tìm kiếm trên xe buýt" },
    { id: "c10", en: "promised to be cautious", vi: "hứa sẽ cẩn trọng hơn" }
  ],
  set4_definitions: [
    { id: "def01", en: "backpack", vi: "You put your books in this to take them to school." },
    { id: "def02", en: "puddle", vi: "A small pool of liquid on the ground after rain." },
    { id: "def03", en: "alarm clock", vi: "A device that wakes you up with a loud sound." },
    { id: "def04", en: "vase", vi: "A container used for holding fresh flowers." },
    { id: "def05", en: "clumsy", vi: "Moving awkwardly or dropping things easily." },
    { id: "def06", en: "careful", vi: "Paying close attention to avoid making mistakes." },
    { id: "def07", en: "cautious", vi: "Taking care to avoid potential danger or mistakes." },
    { id: "def08", en: "spilled", vi: "Accidentally allowed liquid to flow out of a cup." },
    { id: "def09", en: "repaired", vi: "Fixed or restored something that was broken." },
    { id: "def10", en: "apologized", vi: "Said sorry for causing an accident or mistake." }
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

  const [shuffledViList, setShuffledViList] = useState([]);

  // Explicit Fisher-Yates Shuffle for Vietnamese column
  useEffect(() => {
    if (!currentPairs || currentPairs.length === 0) return;
    const arr = [...currentPairs];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    // Guarantee non-identical alignment with English column
    if (arr.length > 1 && arr.every((item, idx) => item.id === currentPairs[idx].id)) {
      [arr[0], arr[1]] = [arr[1], arr[0]];
    }
    setShuffledViList(arr);
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
            {currentPairs.map((item) => {
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
