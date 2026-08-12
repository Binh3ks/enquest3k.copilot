import React, { useState } from 'react';
import { learnerProgressService } from '../../services/learnerProgressService';
import VoiceService from '../../services/voiceService';
import { BookOpen, Volume2, Sparkles, CheckCircle2, PlayCircle, GraduationCap, ArrowRight, Layers } from 'lucide-react';

export default function WorldDiscoveryHub({ data, weekNumber = 33 }) {
  const [activeTab, setActiveTab] = useState('webtoon'); // 'webtoon' | 'check'
  const [activeFrameIndex, setActiveFrameIndex] = useState(0);
  const [selectedHotspot, setSelectedHotspot] = useState(null);

  // Check Mode state (10 Cambridge Reading Drills)
  const [checkAnswers, setCheckAnswers] = useState({});
  const [checkScore, setCheckScore] = useState(null);
  const [checkSubmitted, setCheckSubmitted] = useState(false);

  const storyFrames = data?.story_scenes || data?.storyFrames || [
    {
      scene_id: 'scene_1',
      title_en: 'Scene 1: The Waking Mistake',
      title_vi: 'Cảnh 1: Lỗi Sai Lúc Thức Dậy',
      description_en: 'Tom reached clumsily for his glasses on the nightstand and accidentally broke his alarm clock.',
      description_vi: 'Tom với tay vụng về lấy kính trên bàn đầu giường và vô tình làm vỡ chiếc đồng hồ báo thức.',
      image_url: '/images/week33/webtoon_scene_1.png',
      lexical_chunks: [
        { word: 'broke', chunk: 'broke his alarm clock', x: 45, y: 55, vi: 'đã làm vỡ đồng hồ' },
        { word: 'clumsy', chunk: 'reached clumsily', x: 25, y: 40, vi: 'với tay vụng về' }
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

  const checkQuestions = data?.check_mode_drills || data?.checkQuestions || data?.check_questions || [
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
    },
    {
      id: 'q3',
      question: 'What was damaged when Tom dropped orange juice?',
      options: ['A) His clock', 'B) His notebook', 'C) His shoes', 'D) The bus seat'],
      answerIndex: 1
    },
    {
      id: 'q4',
      question: 'Who found Tom’s lost backpack on the bus?',
      options: ['A) Bus driver', 'B) Mia', 'C) Teacher', 'D) Tom'],
      answerIndex: 1
    },
    {
      id: 'q5',
      question: 'What lesson did Tom learn at the end of the story?',
      options: ['A) Ignore mistakes', 'B) Stay home', 'C) Be more cautious', 'D) Buy a clock'],
      answerIndex: 2
    },
    {
      id: 'q6',
      question: 'What adjective describes Tom’s morning behavior?',
      options: ['A) Clumsy and in a hurry', 'B) Slow and calm', 'C) Angry', 'D) Cautious'],
      answerIndex: 0
    },
    {
      id: 'q7',
      question: 'Where did Tom leave his backpack?',
      options: ['A) Kitchen', 'B) Bus seat', 'C) Bed', 'D) Gate'],
      answerIndex: 1
    },
    {
      id: 'q8',
      question: 'What did Tom do when he realized his mistake?',
      options: ['A) Blamed Mia', 'B) Apologized to teacher', 'C) Ran away', 'D) Broke another clock'],
      answerIndex: 1
    },
    {
      id: 'q9',
      question: 'Which irregular verb is past tense of fall?',
      options: ['A) fallen', 'B) fell', 'C) falling', 'D) falled'],
      answerIndex: 1
    },
    {
      id: 'q10',
      question: 'Which word means being very careful to avoid danger?',
      options: ['A) Careless', 'B) Clumsy', 'C) Cautious', 'D) Ignore'],
      answerIndex: 2
    }
  ];

  const currentFrame = storyFrames[activeFrameIndex] || storyFrames[0];
  const frameHotspots = currentFrame.lexical_chunks || currentFrame.hotspots || [];

  // Play audio chunk via Primary Google Cloud TTS Direct with Browser fallback
  const handleHotspotClick = async (hs) => {
    setSelectedHotspot(hs);
    try {
      await VoiceService.speak(hs.chunk, 'read');
    } catch (err) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(hs.chunk);
        utterance.lang = 'en-US';
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  // Submit Cambridge Check Mode Exam (10 Questions)
  const handleCheckSubmit = async () => {
    let correctCount = 0;
    checkQuestions.forEach((q) => {
      if (checkAnswers[q.id] === q.answerIndex) {
        correctCount += 1;
      }
    });

    const scorePct = Math.round((correctCount / checkQuestions.length) * 100);
    setCheckScore(scorePct);
    setCheckSubmitted(true);

    await learnerProgressService.logAttempt({
      learnerId: 'learner_default_01',
      contentId: `w${weekNumber}_read_check`,
      mode: 'check',
      result: scorePct >= 70 ? 'correct' : 'incorrect',
      score: scorePct,
      timeSpentSeconds: 60
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 bg-white text-slate-800 rounded-3xl border border-slate-200 shadow-xl font-sans">
      {/* Top Header Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-100">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Hub 1: World Discovery
          </h1>
        </div>

        {/* Tab Switcher: Learn Mode vs Check Mode */}
        <div className="flex items-center gap-2 bg-indigo-50/70 p-1.5 rounded-2xl border border-indigo-200">
          <button
            onClick={() => setActiveTab('webtoon')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
              activeTab === 'webtoon' ? 'bg-indigo-600 text-white shadow-md' : 'bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100'
            }`}
          >
            <PlayCircle size={14} /> Learn Mode
          </button>
          <button
            onClick={() => setActiveTab('check')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
              activeTab === 'check' ? 'bg-emerald-600 text-white shadow-md' : 'bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100'
            }`}
          >
            <GraduationCap size={14} /> Check Mode
          </button>
        </div>
      </div>

      {activeTab === 'webtoon' ? (
        /* LEARN MODE: WEBTOON 3D SCENES & HOTSPOTS */
        <div className="space-y-6">
          {/* Main Pixar 3D Scene Viewport */}
          <div className="relative bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 group">
            <div className="w-full h-80 sm:h-96 relative flex items-center justify-center bg-slate-950">
              <img
                src={currentFrame.image_url}
                alt={currentFrame.title_en}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/20" />

              {/* Hotspot Audio Pins */}
              {frameHotspots.map((hs, idx) => (
                <button
                  key={idx}
                  onClick={() => handleHotspotClick(hs)}
                  style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 bg-indigo-600/90 hover:bg-indigo-500 text-white rounded-full text-xs font-black shadow-xl backdrop-blur-md flex items-center gap-1.5 border border-indigo-300 animate-pulse hover:animate-none transition scale-100 hover:scale-110"
                >
                  <Volume2 size={14} /> {hs.word}
                </button>
              ))}
            </div>

            {/* Frame Narration Bar */}
            <div className="p-6 bg-white/95 backdrop-blur-md border-t border-slate-200">
              <div className="flex items-center justify-between gap-4 mb-2">
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <Sparkles size={18} className="text-amber-500" /> {currentFrame.title_en}
                </h3>
                <span className="text-xs font-bold text-slate-400 font-mono">
                  Frame {activeFrameIndex + 1} of {storyFrames.length}
                </span>
              </div>
              <p className="text-sm font-bold text-slate-700 leading-relaxed">
                {currentFrame.description_en}
              </p>
              <p className="text-xs font-medium text-slate-500 italic mt-1">
                {currentFrame.description_vi}
              </p>
            </div>
          </div>

          {/* Lexical Chunk Inspector Popup */}
          {selectedHotspot && (
            <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-200 flex items-center justify-between gap-4 shadow-md animate-in fade-in">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-indigo-600 text-white rounded-xl">
                  <Volume2 size={20} />
                </div>
                <div>
                  <div className="text-xs font-black text-indigo-950 uppercase tracking-wider">Vocab Chunk</div>
                  <div className="text-base font-black text-indigo-900">"{selectedHotspot.chunk}"</div>
                  <div className="text-xs font-semibold text-indigo-700 italic">{selectedHotspot.vi}</div>
                </div>
              </div>

              <button
                onClick={() => handleHotspotClick(selectedHotspot)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs rounded-xl transition shadow-sm flex items-center gap-1.5"
              >
                <Volume2 size={14} /> Replay TTS
              </button>
            </div>
          )}

          {/* Webtoon Scene Carousel Selection */}
          <div className="space-y-3">
            <div className="text-xs font-black text-slate-400 uppercase tracking-wider">Select Webtoon Scene:</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {storyFrames.map((frame, idx) => (
                <button
                  key={frame.scene_id}
                  onClick={() => { setActiveFrameIndex(idx); setSelectedHotspot(null); }}
                  className={`p-2 rounded-2xl border text-left transition overflow-hidden shadow-sm ${
                    activeFrameIndex === idx
                      ? 'border-indigo-600 bg-indigo-50 ring-4 ring-indigo-500/20 scale-102'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <div className="w-full h-16 rounded-xl overflow-hidden bg-slate-200 mb-2 relative">
                    <img src={frame.image_url} alt={frame.title_en} className="w-full h-full object-cover" />
                  </div>
                  <div className="text-[11px] font-black text-slate-900 truncate">{frame.title_en}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* CHECK MODE: 10 CAMBRIDGE READING MCQ DRILLS */
        <div className="space-y-6 bg-slate-50 rounded-3xl p-6 border border-slate-200 shadow-inner">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div>
              <span className="text-[10px] font-black text-emerald-600 uppercase tracking-wider">CAMBRIDGE CHECK MODE</span>
              <h2 className="text-xl font-black text-slate-900 mt-0.5">Reading Comprehension Exam (10 Questions)</h2>
            </div>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-black font-mono">
              10 Items
            </span>
          </div>

          <div className="space-y-6">
            {checkQuestions.map((q, qIdx) => (
              <div key={q.id || qIdx} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="text-sm font-black text-slate-900 flex items-start gap-2">
                  <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded-md text-xs">Q{qIdx + 1}</span>
                  <span>{q.question}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = checkAnswers[q.id] === optIdx;
                    return (
                      <button
                        key={optIdx}
                        disabled={checkSubmitted}
                        onClick={() => setCheckAnswers((prev) => ({ ...prev, [q.id]: optIdx }))}
                        className={`p-3 rounded-xl text-xs font-bold transition border text-left flex items-center justify-between ${
                          isSelected
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-md ring-2 ring-indigo-200'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        <span>{opt}</span>
                        {isSelected && <CheckCircle2 size={16} />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Submit Action */}
          {!checkSubmitted ? (
            <div className="pt-4 flex justify-end">
              <button
                onClick={handleCheckSubmit}
                disabled={Object.keys(checkAnswers).length < checkQuestions.length}
                className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl text-sm transition shadow-lg flex items-center gap-2 disabled:opacity-50"
              >
                <CheckCircle2 size={18} /> Submit Reading Exam
              </button>
            </div>
          ) : (
            <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-300 text-center space-y-3 animate-in fade-in">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl font-black shadow-md">
                🏆
              </div>
              <h3 className="text-xl font-black text-emerald-950">Reading Exam Completed!</h3>
              <p className="text-base font-black text-emerald-800">Final Score: {checkScore}%</p>
              <button
                onClick={() => { setCheckSubmitted(false); setCheckAnswers({}); setCheckScore(null); }}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-xl text-xs transition shadow-md"
              >
                Retake Reading Exam
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
