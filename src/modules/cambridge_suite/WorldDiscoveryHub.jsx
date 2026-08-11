import React, { useState } from 'react';
import { learnerProgressService } from '../../services/learnerProgressService';
import { BookOpen, Volume2, Sparkles, CheckCircle2, PlayCircle, GraduationCap, ArrowRight, Layers } from 'lucide-react';

export default function WorldDiscoveryHub({ data, weekNumber = 33 }) {
  const [viewMode, setViewMode] = useState('learn'); // 'learn' | 'check'
  const [activeFrameIndex, setActiveFrameIndex] = useState(0);
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [checkAnswers, setCheckAnswers] = useState({});
  const [checkSubmitted, setCheckSubmitted] = useState(false);
  const [checkScore, setCheckScore] = useState(0);

  const storyFrames = data?.story_scenes || data?.storyFrames || [
    {
      scene_id: 'scene_1',
      title_en: 'Scene 1: The Waking Mistake',
      title_vi: 'Cảnh 1: Lỗi Sai Buổi Sáng',
      description_en: 'Tom woke up late and accidentally broke his alarm clock while reaching for it clumsily.',
      description_vi: 'Tom thức dậy muộn và vô tình làm vỡ chiếc đồng hồ báo thức khi với tay vụng về.',
      image_url: '/images/week33/webtoon_scene_1.png',
      lexical_chunks: [
        { word: 'broke', chunk: 'broke his alarm clock', x: 45, y: 55, vi: 'đã làm vỡ đồng hồ' },
        { word: 'clumsy', chunk: 'reached clumsily', x: 60, y: 40, vi: 'với tay vụng về' }
      ]
    },
    {
      scene_id: 'scene_2',
      title_en: 'Scene 2: Slipping on the Floor',
      title_vi: 'Cảnh 2: Trượt Chân Trên Sàn',
      description_en: 'He rushed downstairs in a hurry, slipped on a wet puddle, and fell onto the rug.',
      description_vi: 'Cậu vội vã chạy xuống nhà, trượt chân trên vũng nước và ngã xuống tấm thảm.',
      image_url: '/images/week33/webtoon_scene_2.png',
      lexical_chunks: [
        { word: 'slipped', chunk: 'slipped on a puddle', x: 30, y: 65, vi: 'đã trượt chân trên vũng nước' },
        { word: 'fell', chunk: 'fell onto the rug', x: 65, y: 75, vi: 'đã ngã xuống thảm' }
      ]
    },
    {
      scene_id: 'scene_3',
      title_en: 'Scene 3: The Dropped Juice',
      title_vi: 'Cảnh 3: Đánh Rơi Ly Nước',
      description_en: 'While making breakfast, he dropped a glass of orange juice and damaged his notebook.',
      description_vi: 'Trong lúc làm bữa sáng, cậu làm rơi ly nước cam và làm hư hại cuốn vở bài tập.',
      image_url: '/images/week33/webtoon_scene_3.png',
      lexical_chunks: [
        { word: 'dropped', chunk: 'dropped a glass', x: 50, y: 50, vi: 'đã đánh rơi ly nước' },
        { word: 'damaged', chunk: 'damaged his notebook', x: 70, y: 60, vi: 'bị hư hại cuốn vở' }
      ]
    }
  ];

  const checkQuestions = data?.checkQuestions || data?.check_questions || [
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

  const currentFrame = storyFrames[activeFrameIndex] || storyFrames[0];
  const frameHotspots = currentFrame.lexical_chunks || currentFrame.hotspots || [];

  // Play audio chunk for hotspot
  const handleHotspotClick = (hs) => {
    setSelectedHotspot(hs);
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
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 bg-white text-slate-800 rounded-3xl border border-slate-200 shadow-xl font-sans">
      {/* Top Header Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-100">
        <div>
          <span className="px-3.5 py-1.5 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1.5 w-fit">
            <BookOpen size={14} /> Hub 1: World Discovery & Webtoon Quest (W{weekNumber})
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 tracking-tight">
            The Accident File — Tom’s Bad Day
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">Explore 6 3D Webtoon Scenes & Cambridge Reading MCQ</p>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
          <button
            onClick={() => setViewMode('learn')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
              viewMode === 'learn' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <PlayCircle size={14} /> Learn Mode (3D Webtoon)
          </button>
          <button
            onClick={() => setViewMode('check')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
              viewMode === 'check' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GraduationCap size={14} /> Check Mode (Cambridge MCQ)
          </button>
        </div>
      </div>

      {/* VIEW MODE 1: LEARN MODE (3D Webtoon Story Scenes) */}
      {viewMode === 'learn' ? (
        <div className="space-y-6">
          {/* Main Webtoon Frame Display */}
          <div className="relative bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden p-4 sm:p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h3 className="text-lg font-black text-indigo-900">
                  Frame {activeFrameIndex + 1}/{storyFrames.length}: {currentFrame.title_en || currentFrame.title}
                </h3>
                <p className="text-xs text-slate-500 italic">{currentFrame.title_vi}</p>
              </div>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                💡 Click Hotspot pills on the image to hear vocabulary!
              </span>
            </div>

            {/* Real 3D Pixar Image Display with Hotspots */}
            <div className="relative w-full h-72 sm:h-[450px] bg-slate-200 rounded-2xl overflow-hidden shadow-md border border-slate-300">
              <img
                src={currentFrame.image_url}
                alt={currentFrame.title_en || 'Webtoon Frame'}
                className="w-full h-full object-cover transition-all duration-300"
              />

              {/* Hotspots Mapping */}
              {frameHotspots.map((hs, idx) => (
                <button
                  key={hs.word || idx}
                  onClick={() => handleHotspotClick(hs)}
                  style={{ top: `${hs.y || 50}%`, left: `${hs.x || 50}%` }}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-full shadow-2xl ring-4 ring-amber-300/60 transition hover:scale-110 flex items-center gap-1.5 border border-amber-500 animate-pulse"
                >
                  <Volume2 size={14} /> {hs.word}
                </button>
              ))}
            </div>

            {/* Description Text */}
            <div className="mt-4 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
              <p className="text-sm font-bold text-slate-800">{currentFrame.description_en || currentFrame.description}</p>
              <p className="text-xs text-slate-500 mt-1 italic">{currentFrame.description_vi}</p>
            </div>

            {/* Selected Hotspot Explanation Box */}
            {selectedHotspot && (
              <div className="mt-4 p-4 bg-indigo-50 rounded-xl border border-indigo-200 flex items-center justify-between animate-in fade-in duration-150">
                <div>
                  <div className="text-[10px] text-indigo-600 font-black uppercase tracking-wider">Lexical Chunk:</div>
                  <div className="text-base font-black text-indigo-950">{selectedHotspot.chunk}</div>
                  <div className="text-xs text-indigo-700 italic font-medium">{selectedHotspot.vi}</div>
                </div>
                <button
                  onClick={() => handleHotspotClick(selectedHotspot)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black flex items-center gap-1.5 shadow-md active:scale-95 transition"
                >
                  <Volume2 size={14} /> Listen Again
                </button>
              </div>
            )}

            {/* Frame Controls */}
            <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-200">
              <button
                onClick={() => setActiveFrameIndex((prev) => Math.max(0, prev - 1))}
                disabled={activeFrameIndex === 0}
                className="px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-black rounded-xl text-xs transition disabled:opacity-40"
              >
                ← Previous Frame
              </button>

              <div className="flex gap-2">
                {storyFrames.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveFrameIndex(idx)}
                    className={`w-3.5 h-3.5 rounded-full transition ${
                      idx === activeFrameIndex ? 'bg-indigo-600 scale-125 ring-2 ring-indigo-400' : 'bg-slate-300'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => setActiveFrameIndex((prev) => Math.min(storyFrames.length - 1, prev + 1))}
                disabled={activeFrameIndex === storyFrames.length - 1}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-xl text-xs transition disabled:opacity-40 flex items-center gap-1.5 shadow-md"
              >
                Next Frame <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* VIEW MODE 2: CHECK MODE (Cambridge Reading MCQ Format) */
        <div className="space-y-6 bg-white text-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="pb-4 border-b border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-xs text-indigo-600 font-black uppercase tracking-wider">CAMBRIDGE FLYERS READING PART 2</span>
              <h2 className="text-xl font-black text-slate-900 mt-1">Reading Comprehension Assessment</h2>
            </div>
            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 border border-indigo-100 text-xs font-mono font-bold rounded-md">Official MCQ Format</span>
          </div>

          <div className="space-y-6">
            {checkQuestions.map((q, idx) => (
              <div key={q.id || idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h4 className="text-sm font-black text-slate-900 mb-3">
                  {idx + 1}. {q.question}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {q.options.map((opt, optIdx) => (
                    <button
                      key={optIdx}
                      onClick={() => setCheckAnswers((prev) => ({ ...prev, [q.id]: optIdx }))}
                      className={`p-3 rounded-xl text-left text-sm font-bold transition border ${
                        checkAnswers[q.id] === optIdx
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
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
              <h3 className="text-lg font-black">Assessment Result: {checkScore}/100</h3>
              <p className="text-xs text-emerald-700 mt-1">Progress logged securely to Learner Progress Service.</p>
            </div>
          ) : (
            <button
              onClick={handleCheckSubmit}
              disabled={Object.keys(checkAnswers).length < checkQuestions.length}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl text-base transition flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
            >
              <CheckCircle2 size={18} /> Submit Reading Exam
            </button>
          )}
        </div>
      )}
    </div>
  );
}
