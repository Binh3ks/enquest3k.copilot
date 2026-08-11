import React, { useState } from 'react';
import { learnerProgressService } from '../../services/learnerProgressService';
import { BookOpen, Volume2, Sparkles, CheckCircle2, PlayCircle, GraduationCap, ArrowRight, Layers, HelpCircle } from 'lucide-react';

export default function WorldDiscoveryHub({ data, weekNumber = 33 }) {
  const [viewMode, setViewMode] = useState('learn'); // 'learn' | 'check'
  const [activeFrameIndex, setActiveFrameIndex] = useState(0);
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [userSequence, setUserSequence] = useState([]);
  const [checkAnswers, setCheckAnswers] = useState({});
  const [checkSubmitted, setCheckSubmitted] = useState(false);
  const [checkScore, setCheckScore] = useState(0);

  const storyFrames = data?.storyFrames || [
    {
      id: 'frame_1',
      title: 'Tom’s Unfortunate Morning',
      description: 'Tom woke up late and accidentally broke his favorite alarm clock while reaching for it.',
      image_url: '/images/week33/webtoon_1.webp',
      hotspots: [
        { id: 'h1', word: 'broke', chunk: 'broke his alarm clock', audio: '/audio/broke.mp3', x: 45, y: 55, vi: 'đã làm vỡ đồng hồ' }
      ]
    },
    {
      id: 'frame_2',
      title: 'The Slippery Stairs',
      description: 'He rushed downstairs, slipped on a wet puddle, and fell right onto the carpet.',
      image_url: '/images/week33/webtoon_2.webp',
      hotspots: [
        { id: 'h2', word: 'fell', chunk: 'fell onto the carpet', audio: '/audio/fell.mp3', x: 60, y: 70, vi: 'đã ngã xuống thảm' },
        { id: 'h3', word: 'slipped', chunk: 'slipped on a puddle', audio: '/audio/slipped.mp3', x: 30, y: 65, vi: 'đã trượt chân' }
      ]
    },
    {
      id: 'frame_3',
      title: 'The Lost Homework',
      description: 'At school, Tom realized he lost his backpack on the bus. Luckily, his friend found it.',
      image_url: '/images/week33/webtoon_3.webp',
      hotspots: [
        { id: 'h4', word: 'lost', chunk: 'lost his backpack', audio: '/audio/lost.mp3', x: 40, y: 50, vi: 'đã làm mất cặp' },
        { id: 'h5', word: 'found', chunk: 'found it later', audio: '/audio/found.mp3', x: 75, y: 50, vi: 'đã tìm thấy nó' }
      ]
    }
  ];

  const checkQuestions = data?.checkQuestions || [
    {
      id: 'q1',
      question: 'What did Tom break in the morning?',
      options: ['A) His backpack', 'B) His alarm clock', 'C) His bicycle', 'D) His water bottle'],
      answerIndex: 1
    },
    {
      id: 'q2',
      question: 'Why did Tom fall on the stairs?',
      options: ['A) He slipped on a wet puddle', 'B) He ran into his dog', 'C) The lights were off', 'D) He tripped over a shoe'],
      answerIndex: 0
    }
  ];

  const currentFrame = storyFrames[activeFrameIndex];

  // Play audio chunk for hotspot
  const handleHotspotClick = (hs) => {
    setSelectedHotspot(hs);
    // TTS or Web Audio API fallback
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(hs.chunk);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  // Submit Cambridge Check Mode Exam
  const handleCheckSubmit = async () => {
    let scoreCount = 0;
    checkQuestions.forEach((q) => {
      if (checkAnswers[q.id] === q.answerIndex) {
        scoreCount += 50;
      }
    });

    setCheckScore(scoreCount);
    setCheckSubmitted(true);

    await learnerProgressService.logAttempt({
      learnerId: 'learner_default_01',
      contentId: `w${weekNumber}_read_check`,
      mode: 'check',
      result: scoreCount >= 50 ? 'correct' : 'incorrect',
      score: scoreCount,
      timeSpentSeconds: 45
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* Top Header Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-800">
        <div>
          <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 w-fit">
            <BookOpen size={14} /> Hub 1: World Discovery & Story Quest (W{weekNumber})
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-amber-400 mt-2">
            The Accident File — Tom’s Bad Day
          </h1>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => setViewMode('learn')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 ${
              viewMode === 'learn' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <PlayCircle size={14} /> Learn Mode (Webtoon Tĩnh)
          </button>
          <button
            onClick={() => setViewMode('check')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 ${
              viewMode === 'check' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <GraduationCap size={14} /> Check Mode (Cambridge MCQ)
          </button>
        </div>
      </div>

      {/* VIEW MODE 1: LEARN MODE (Webtoon Tĩnh 0% Video) */}
      {viewMode === 'learn' ? (
        <div className="space-y-6">
          {/* Main Webtoon Frame Display */}
          <div className="relative bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-indigo-300">
                Frame {activeFrameIndex + 1}/{storyFrames.length}: {currentFrame.title}
              </h3>
              <span className="text-xs text-slate-400">Chạm điểm sáng (Hotspot) để nghe cụm từ vựng!</span>
            </div>

            {/* Static Image Box with Hotspots */}
            <div className="relative w-full h-64 sm:h-96 bg-slate-950 rounded-xl overflow-hidden flex items-center justify-center border border-slate-800">
              <div className="text-center p-6 text-slate-500">
                <Layers className="w-16 h-16 mx-auto mb-2 text-indigo-500/40" />
                <p className="text-sm font-semibold text-slate-400">{currentFrame.description}</p>
                <p className="text-xs text-indigo-400 mt-2 font-mono">[Webtoon Static Visual Frame {activeFrameIndex + 1}]</p>
              </div>

              {/* Hotspots Mapping */}
              {currentFrame.hotspots?.map((hs) => (
                <button
                  key={hs.id}
                  onClick={() => handleHotspotClick(hs)}
                  style={{ top: `${hs.y}%`, left: `${hs.x}%` }}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 bg-amber-500/90 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-full shadow-lg ring-4 ring-amber-400/30 transition hover:scale-110 flex items-center gap-1"
                >
                  <Volume2 size={12} /> {hs.word}
                </button>
              ))}
            </div>

            {/* Selected Hotspot Explanation Box */}
            {selectedHotspot && (
              <div className="mt-4 p-4 bg-indigo-950/60 rounded-xl border border-indigo-500/40 flex items-center justify-between animate-in fade-in duration-150">
                <div>
                  <div className="text-xs text-indigo-300 font-bold uppercase">Lexical Chunk:</div>
                  <div className="text-base font-extrabold text-amber-300">{selectedHotspot.chunk}</div>
                  <div className="text-xs text-slate-300 italic">{selectedHotspot.vi}</div>
                </div>
                <button
                  onClick={() => handleHotspotClick(selectedHotspot)}
                  className="p-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-md"
                >
                  <Volume2 size={14} /> Nghe lại
                </button>
              </div>
            )}

            {/* Frame Controls */}
            <div className="mt-6 flex items-center justify-between">
              <button
                onClick={() => setActiveFrameIndex((prev) => Math.max(0, prev - 1))}
                disabled={activeFrameIndex === 0}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs transition disabled:opacity-40"
              >
                ← Khung trước
              </button>

              <div className="flex gap-2">
                {storyFrames.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveFrameIndex(idx)}
                    className={`w-3 h-3 rounded-full transition ${
                      idx === activeFrameIndex ? 'bg-amber-400 scale-125' : 'bg-slate-700'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => setActiveFrameIndex((prev) => Math.min(storyFrames.length - 1, prev + 1))}
                disabled={activeFrameIndex === storyFrames.length - 1}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition disabled:opacity-40 flex items-center gap-1"
              >
                Khung tiếp <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* VIEW MODE 2: CHECK MODE (Cambridge Reading MCQ Format) */
        <div className="space-y-6 bg-white text-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-300 shadow-xl">
          <div className="pb-4 border-b border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">CAMBRIDGE FLYERS READING PART 2</span>
              <h2 className="text-xl font-black text-slate-900 mt-1">Reading Comprehension Assessment</h2>
            </div>
            <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-mono font-bold rounded-md">Exam Layout</span>
          </div>

          <div className="space-y-6">
            {checkQuestions.map((q, idx) => (
              <div key={q.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h4 className="text-sm font-extrabold text-slate-900 mb-3">
                  {idx + 1}. {q.question}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {q.options.map((opt, optIdx) => (
                    <button
                      key={optIdx}
                      onClick={() => setCheckAnswers((prev) => ({ ...prev, [q.id]: optIdx }))}
                      className={`p-3 rounded-lg text-left text-sm font-medium transition border ${
                        checkAnswers[q.id] === optIdx
                          ? 'bg-indigo-600 text-white border-indigo-600 font-bold'
                          : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {checkSubmitted ? (
            <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xl text-center">
              <h3 className="text-lg font-black">Kết quả bài thi Check Mode: {checkScore}/100</h3>
              <p className="text-xs text-emerald-700 mt-1">Dữ liệu đã ghi nhận riêng biệt vào Learner Progress Layer.</p>
            </div>
          ) : (
            <button
              onClick={handleCheckSubmit}
              disabled={Object.keys(checkAnswers).length < checkQuestions.length}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-base transition flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
            >
              <CheckCircle2 size={18} /> Nộp Bài Thi Reading Check Mode
            </button>
          )}
        </div>
      )}
    </div>
  );
}
