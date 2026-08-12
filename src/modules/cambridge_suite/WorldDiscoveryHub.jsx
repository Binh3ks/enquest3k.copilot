import React, { useState, useMemo } from 'react';
import { learnerProgressService } from '../../services/learnerProgressService';
import { useUserStore } from '../../stores/useUserStore';
import VoiceService from '../../services/voiceService';
import HoverWord from '../../components/common/HoverWord';
import { speakText } from '../../utils/AudioHelper';
import { BookOpen, Volume2, Sparkles, CheckCircle2, PlayCircle, GraduationCap, ArrowRight, Layers, FileText, RefreshCw, HelpCircle, XCircle } from 'lucide-react';

export default function WorldDiscoveryHub({ data, weekNumber = 33 }) {
  const currentUser = useUserStore((state) => state.currentUser);
  const learnerId = currentUser?.id || currentUser?.username || 'guest_01';

  const [activeTab, setActiveTab] = useState('webtoon'); // 'webtoon' | 'check'
  const [learnSubTab, setLearnSubTab] = useState('webtoon'); // 'webtoon' | 'interactive_story' | 'reading_part3'
  const [activeFrameIndex, setActiveFrameIndex] = useState(0);
  const [selectedHotspot, setSelectedHotspot] = useState(null);

  // Cambridge Flyers Reading Part 3 state
  const [r3Answers, setR3Answers] = useState({});
  const [r3Submitted, setR3Submitted] = useState({});

  // Interactive Gap-Fill Story state (Cambridge Reading Part 4 Standard)
  const [storyAnswers, setStoryAnswers] = useState({});
  const [selectedGapId, setSelectedGapId] = useState(1);
  const [storySubmitted, setStorySubmitted] = useState(false);
  const [storyScore, setStoryScore] = useState(null);

  // Check Mode state (10 Cambridge Reading Drills)
  const [checkAnswers, setCheckAnswers] = useState({});
  const [checkScore, setCheckScore] = useState(null);
  const [checkSubmitted, setCheckSubmitted] = useState(false);

  const storyScenes = data?.story_scenes || [
    {
      scene_id: 'scene_1',
      title_en: 'Scene 1: The Waking Mistake',
      description_en: 'Tom reached **clumsily** for his glasses on the nightstand and accidentally **broke his alarm clock**.',
      image_url: '/images/week33/webtoon_scene_1.png',
      lexical_chunks: [
        { word: 'broke', chunk: 'broke his alarm clock', x: 45, y: 55 },
        { word: 'clumsy', chunk: 'reached clumsily', x: 25, y: 40 }
      ]
    },
    {
      scene_id: 'scene_2',
      title_en: 'Scene 2: Slipping on the Tiles',
      description_en: 'Then he rushed downstairs into the kitchen and **slipped on a wet puddle** near the table.',
      image_url: '/images/week33/webtoon_scene_2.png',
      lexical_chunks: [
        { word: 'slipped', chunk: 'slipped on a puddle', x: 50, y: 70 },
        { word: 'puddle', chunk: 'a wet puddle', x: 60, y: 80 }
      ]
    },
    {
      scene_id: 'scene_3',
      title_en: 'Scene 3: The Spilled Juice Incident',
      description_en: 'While trying to balance, Tom **spilled the juice** over his desk and **damaged a notebook**.',
      image_url: '/images/week33/webtoon_scene_3.png',
      lexical_chunks: [
        { word: 'spilled', chunk: 'spilled the juice', x: 35, y: 50 },
        { word: 'damaged', chunk: 'damaged a notebook', x: 55, y: 60 }
      ]
    },
    {
      scene_id: 'scene_4',
      title_en: 'Scene 4: Apologizing to Mom',
      description_en: 'Feeling very sorry for the mess, Tom **apologized to mom** and cleaned the room carefully.',
      image_url: '/images/week33/webtoon_scene_4.png',
      lexical_chunks: [
        { word: 'apologized', chunk: 'apologized to mom', x: 40, y: 45 },
        { word: 'careful', chunk: 'cleaned up carefully', x: 60, y: 65 }
      ]
    },
    {
      scene_id: 'scene_5',
      title_en: 'Scene 5: The Bus Surprise',
      description_en: 'On his way to school, Tom **lost his backpack** on the bus! Fortunately, Mia **found his backpack** on a seat.',
      image_url: '/images/week33/webtoon_scene_5.png',
      lexical_chunks: [
        { word: 'lost', chunk: 'lost his backpack', x: 30, y: 50 },
        { word: 'found', chunk: 'found his backpack', x: 70, y: 55 }
      ]
    },
    {
      scene_id: 'scene_6',
      title_en: 'Scene 6: A Lesson Learned',
      description_en: 'Tom felt relieved and promised to be more **cautious** and **careful** every morning.',
      image_url: '/images/week33/webtoon_scene_6.png',
      lexical_chunks: [
        { word: 'cautious', chunk: 'promised to be cautious', x: 50, y: 50 }
      ]
    }
  ];

  const interactiveStory = data?.interactive_story || {
    title: "Interactive Story: Tom's Clumsy Morning",
    text_template: "Tom had a very bad morning today. First, he accidentally ____1____ his alarm clock because he was feeling ____2____. Then, he rushed downstairs and slipped on a wet ____3____ on the kitchen floor. To make things worse, he ____4____ his backpack on the bus! His mother told him not to worry, but Tom promised to be more ____5____ next time.",
    gaps: [
      { id: 1, target: 'broke', hint: 'past of break' },
      { id: 2, target: 'clumsy', hint: 'moving awkwardly' },
      { id: 3, target: 'puddle', hint: 'small pool of liquid' },
      { id: 4, target: 'lost', hint: 'past of lose' },
      { id: 5, target: 'careful', hint: 'paying attention to avoid mistakes' }
    ],
    word_bank: ['broke', 'clumsy', 'puddle', 'lost', 'careful', 'spilled', 'dropped']
  };

  const checkQuestions = data?.check_mode_drills || [
    {
      id: 'q1',
      question: 'What did Tom break in the morning?',
      options: ['A) His backpack', 'B) His alarm clock', 'C) His bicycle', 'D) His water bottle'],
      answerIndex: 1
    },
    {
      id: 'q2',
      question: 'How did Tom feel when he woke up late?',
      options: ['A) Energetic', 'B) Clumsy', 'C) Angry', 'D) Excited'],
      answerIndex: 1
    },
    {
      id: 'q3',
      question: 'What did Tom slip on in the kitchen?',
      options: ['A) A rug', 'B) A wet puddle', 'C) A banana peel', 'D) A toy car'],
      answerIndex: 1
    },
    {
      id: 'q4',
      question: 'What did Tom spill over his desk?',
      options: ['A) Milk', 'B) Orange juice', 'C) Water', 'D) Soup'],
      answerIndex: 1
    },
    {
      id: 'q5',
      question: 'What did Tom lose on the bus?',
      options: ['A) His jacket', 'B) His hat', 'C) His backpack', 'D) His homework'],
      answerIndex: 2
    },
    {
      id: 'q6',
      question: 'Who found Tom\'s lost backpack?',
      options: ['A) His teacher', 'B) The bus driver', 'C) Mia', 'D) His mother'],
      answerIndex: 2
    },
    {
      id: 'q7',
      question: 'What did Tom do after spilling the liquid?',
      options: ['A) He ran away', 'B) He apologized to mom', 'C) He went to sleep', 'D) He laughed'],
      answerIndex: 1
    },
    {
      id: 'q8',
      question: 'What is the past simple tense of "break"?',
      options: ['A) Breakings', 'B) Broke', 'C) Breaked', 'D) Broken'],
      answerIndex: 1
    },
    {
      id: 'q9',
      question: 'What is the past simple tense of "lose"?',
      options: ['A) Lost', 'B) Losed', 'C) Losing', 'D) Loses'],
      answerIndex: 0
    },
    {
      id: 'q10',
      question: 'What did Tom promise to be in the future?',
      options: ['A) More careless', 'B) More cautious and careful', 'C) More clumsy', 'D) Faster'],
      answerIndex: 1
    }
  ];

  const readingPart3Data = data?.reading_part3_story || {
    title: "Cambridge Flyers Reading Part 3 — Tom's Morning Adventure",
    story_text: "Tom had a very eventful Saturday morning. While he was waking up, his alarm clock rang loudly. He reached over clumsily and accidentally knocked it off the table. Later, while he was rushing downstairs to have breakfast, he slipped on a wet puddle on the kitchen floor. To make things worse, he dropped his glass of juice over his English notebook. Fortunately, his sister Mia helped him clean the floor, and he promised to be more cautious.",
    questions: [
      {
        id: "r3_q01",
        question: "Why did Tom knock his alarm clock off the table?",
        options: [
          { label: "A", text: "Because he reached over clumsily while waking up.", isCorrect: true },
          { label: "B", text: "Because he wanted to break it on purpose.", isCorrect: false },
          { label: "C", text: "Because his dog jumped onto his bed.", isCorrect: false }
        ],
        answerIndex: 0
      },
      {
        id: "r3_q02",
        question: "What happened while Tom was rushing downstairs?",
        options: [
          { label: "A", text: "He slipped on a wet puddle on the kitchen floor.", isCorrect: true },
          { label: "B", text: "He met his teacher at the front door.", isCorrect: false },
          { label: "C", text: "He dropped his shoes into the sink.", isCorrect: false }
        ],
        answerIndex: 0
      },
      {
        id: "r3_q03",
        question: "What was damaged when Tom dropped his glass of juice?",
        options: [
          { label: "A", text: "His English notebook.", isCorrect: true },
          { label: "B", text: "His new sports shoes.", isCorrect: false },
          { label: "C", text: "His mother's phone.", isCorrect: false }
        ],
        answerIndex: 0
      },
      {
        id: "r3_q04",
        question: "Who helped Tom clean up the kitchen floor?",
        options: [
          { label: "A", text: "His sister Mia.", isCorrect: true },
          { label: "B", text: "His school bus driver.", isCorrect: false },
          { label: "C", text: "His neighbor Mr. Green.", isCorrect: false }
        ],
        answerIndex: 0
      },
      {
        id: "r3_q05",
        question: "What did Tom promise to do next time?",
        options: [
          { label: "A", text: "To be more cautious in the morning.", isCorrect: true },
          { label: "B", text: "To sleep all day on Saturday.", isCorrect: false },
          { label: "C", text: "To buy a new alarm clock.", isCorrect: false }
        ],
        answerIndex: 0
      }
    ]
  };

  const currentFrame = storyScenes[activeFrameIndex] || storyScenes[0];
  const frameHotspots = currentFrame.lexical_chunks || [];

  // System Global Text Parser using HoverWord component
  const renderParsedText = (text, themeColor = 'indigo') => {
    if (!text) return null;
    const segments = text.split(/(\*\*.*?\*\*)/);
    let key = 0;
    const parts = [];

    for (const segment of segments) {
      if (segment.startsWith('**') && segment.endsWith('**')) {
        const word = segment.slice(2, -2).trim();
        parts.push(
          <HoverWord
            key={key++}
            word={word}
            themeColor={themeColor}
            onSpeak={(w) => speakText(w, null, 1.0, null, 'reading', weekNumber, 'advanced')}
            tier={1}
          />
        );
      } else {
        let currentWord = '';
        let currentNonWord = '';

        for (let i = 0; i < segment.length; i++) {
          const char = segment[i];
          if (/[\w'-]/.test(char)) {
            if (currentNonWord) {
              parts.push(<span key={key++}>{currentNonWord}</span>);
              currentNonWord = '';
            }
            currentWord += char;
          } else {
            if (currentWord) {
              parts.push(
                <HoverWord
                  key={key++}
                  word={currentWord}
                  themeColor={themeColor}
                  onSpeak={(w) => speakText(w, null, 1.0, null, 'reading', weekNumber, 'advanced')}
                  tier={3}
                />
              );
              currentWord = '';
            }
            currentNonWord += char;
          }
        }
        if (currentWord) {
          parts.push(
            <HoverWord
              key={key++}
              word={currentWord}
              themeColor={themeColor}
              onSpeak={(w) => speakText(w, null, 1.0, null, 'reading', weekNumber, 'advanced')}
              tier={3}
            />
          );
        }
        if (currentNonWord) {
          parts.push(<span key={key++}>{currentNonWord}</span>);
        }
      }
    }

    return parts;
  };

  // Play audio chunk via Primary Google Cloud TTS Direct with Browser fallback
  const handleHotspotClick = async (hs) => {
    setSelectedHotspot(hs);
    try {
      await VoiceService.speak(hs.chunk || hs.word, 'read');
    } catch (err) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(hs.chunk || hs.word);
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

  // Fill in Gap-fill word pill
  const handleSelectWord = (word) => {
    if (!selectedGapId) return;
    setStoryAnswers((prev) => ({
      ...prev,
      [selectedGapId]: word
    }));
    const nextGap = interactiveStory.gaps.find((g) => g.id > selectedGapId && !storyAnswers[g.id]);
    if (nextGap) {
      setSelectedGapId(nextGap.id);
    }
  };

  // Submit Interactive Story Gap-Fill / Open Cloze
  const handleStorySubmit = async () => {
    let correct = 0;
    interactiveStory.gaps.forEach((g) => {
      const userAns = (storyAnswers[g.id] || '').toLowerCase().trim();
      const targetAns = (g.target || '').toLowerCase().trim();
      if (userAns === targetAns) {
        correct += 1;
      }
    });
    const pct = Math.round((correct / interactiveStory.gaps.length) * 100);
    setStoryScore(pct);
    setStorySubmitted(true);

    await learnerProgressService.logAttempt({
      learnerId,
      contentId: `w${weekNumber}_interactive_story`,
      mode: 'learn',
      result: pct >= 80 ? 'correct' : 'incorrect',
      score: pct,
      timeSpentSeconds: 45
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
        /* LEARN MODE: SUB-TABS (EXACTLY 2 TABS: 3D Webtoon & Interactive Story) */
        <div className="space-y-6">
          <div className="flex items-center gap-2 p-1.5 bg-indigo-50/70 rounded-2xl border border-indigo-200">
            <button
              onClick={() => setLearnSubTab('webtoon')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
                learnSubTab === 'webtoon' ? 'bg-indigo-600 text-white shadow-md' : 'bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100'
              }`}
            >
              <BookOpen size={14} /> 3D Webtoon
            </button>
            <button
              onClick={() => setLearnSubTab('interactive_story')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
                learnSubTab === 'interactive_story' ? 'bg-indigo-600 text-white shadow-md' : 'bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100'
              }`}
            >
              <FileText size={14} /> Interactive Story & Reading Part 3
            </button>
          </div>

          {learnSubTab === 'webtoon' ? (
            /* SUB-TAB 1: 3D WEBTOON SCENES & HOTSPOTS */
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

                {/* Frame Narration Bar (Parsed with System Global HoverWord Parser) */}
                <div className="p-6 bg-white/95 backdrop-blur-md border-t border-slate-200">
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                      <Sparkles size={18} className="text-amber-500" /> {currentFrame.title_en}
                    </h3>
                    <span className="text-xs font-bold text-slate-400 font-mono">
                      Frame {activeFrameIndex + 1} of {storyScenes.length}
                    </span>
                  </div>
                  <div className="text-sm font-bold text-slate-700 leading-relaxed">
                    {renderParsedText(currentFrame.description_en, 'indigo')}
                  </div>
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
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedHotspot(null)}
                    className="p-2 text-slate-400 hover:text-slate-600 rounded-lg transition"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}

              {/* Webtoon Scene Carousel Selection */}
              <div className="space-y-3">
                <div className="text-xs font-black text-slate-400 uppercase tracking-wider">Select Webtoon Scene:</div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                  {storyScenes.map((frame, idx) => (
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
            /* SUB-TAB 2: INTERACTIVE STORY GAP-FILL (Cambridge Reading Part 4) */
            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200 shadow-inner space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div>
                  <span className="text-[10px] font-black text-indigo-600 uppercase tracking-wider">CAMBRIDGE READING PART 4 — GAP-FILL</span>
                  <h3 className="text-lg font-black text-slate-900 mt-0.5">{renderParsedText(interactiveStory.title, 'indigo')}</h3>
                </div>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-black font-mono rounded-full">
                  5 Blanks
                </span>
              </div>

              {/* Story Paragraph with Clickable Blanks or Open Cloze Inputs (Boosted Typography: text-lg sm:text-xl font-bold leading-loose) */}
              <div className="p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-sm leading-loose sm:leading-extraloose text-lg sm:text-xl font-bold text-slate-900 space-y-2">
                {renderParsedText("Tom had a very bad morning today. First, he accidentally ")}{' '}
                {interactiveStory.mode === 'open_cloze' ? (
                  <input
                    type="text"
                    value={storyAnswers[1] || ''}
                    onChange={(e) => setStoryAnswers((prev) => ({ ...prev, 1: e.target.value }))}
                    placeholder="____"
                    className="w-32 px-3 py-1.5 mx-1 rounded-xl border-2 border-indigo-400 bg-white text-indigo-950 font-black text-center text-lg sm:text-xl focus:ring-4 focus:ring-indigo-200 focus:outline-none shadow-inner"
                  />
                ) : (
                  <button
                    onClick={() => setSelectedGapId(1)}
                    className={`px-4 py-1.5 mx-1 rounded-xl border-2 font-black text-lg sm:text-xl transition-all ${
                      selectedGapId === 1
                        ? 'bg-indigo-600 text-white font-black ring-4 ring-indigo-200'
                        : storyAnswers[1]
                        ? 'bg-indigo-100 text-indigo-900 border-indigo-300'
                        : 'bg-amber-100 text-amber-900 border-amber-300 animate-pulse'
                    }`}
                  >
                    {storyAnswers[1] || '[ Blank 1 ]'}
                  </button>
                )}{' '}
                {renderParsedText("his **alarm clock** because he was feeling ")}{' '}
                {interactiveStory.mode === 'open_cloze' ? (
                  <input
                    type="text"
                    value={storyAnswers[2] || ''}
                    onChange={(e) => setStoryAnswers((prev) => ({ ...prev, 2: e.target.value }))}
                    placeholder="____"
                    className="w-32 px-3 py-1.5 mx-1 rounded-xl border-2 border-indigo-400 bg-white text-indigo-950 font-black text-center text-lg sm:text-xl focus:ring-4 focus:ring-indigo-200 focus:outline-none shadow-inner"
                  />
                ) : (
                  <button
                    onClick={() => setSelectedGapId(2)}
                    className={`px-4 py-1.5 mx-1 rounded-xl border-2 font-black text-lg sm:text-xl transition-all ${
                      selectedGapId === 2
                        ? 'bg-indigo-600 text-white font-black ring-4 ring-indigo-200'
                        : storyAnswers[2]
                        ? 'bg-indigo-100 text-indigo-900 border-indigo-300'
                        : 'bg-amber-100 text-amber-900 border-amber-300 animate-pulse'
                    }`}
                  >
                    {storyAnswers[2] || '[ Blank 2 ]'}
                  </button>
                )}
                {renderParsedText(". Then, he **rushed downstairs** and slipped on a wet ")}{' '}
                {interactiveStory.mode === 'open_cloze' ? (
                  <input
                    type="text"
                    value={storyAnswers[3] || ''}
                    onChange={(e) => setStoryAnswers((prev) => ({ ...prev, 3: e.target.value }))}
                    placeholder="____"
                    className="w-32 px-3 py-1.5 mx-1 rounded-xl border-2 border-indigo-400 bg-white text-indigo-950 font-black text-center text-lg sm:text-xl focus:ring-4 focus:ring-indigo-200 focus:outline-none shadow-inner"
                  />
                ) : (
                  <button
                    onClick={() => setSelectedGapId(3)}
                    className={`px-4 py-1.5 mx-1 rounded-xl border-2 font-black text-lg sm:text-xl transition-all ${
                      selectedGapId === 3
                        ? 'bg-indigo-600 text-white font-black ring-4 ring-indigo-200'
                        : storyAnswers[3]
                        ? 'bg-indigo-100 text-indigo-900 border-indigo-300'
                        : 'bg-amber-100 text-amber-900 border-amber-300 animate-pulse'
                    }`}
                  >
                    {storyAnswers[3] || '[ Blank 3 ]'}
                  </button>
                )}{' '}
                {renderParsedText("on the kitchen floor. To make things worse, he ")}{' '}
                {interactiveStory.mode === 'open_cloze' ? (
                  <input
                    type="text"
                    value={storyAnswers[4] || ''}
                    onChange={(e) => setStoryAnswers((prev) => ({ ...prev, 4: e.target.value }))}
                    placeholder="____"
                    className="w-32 px-3 py-1.5 mx-1 rounded-xl border-2 border-indigo-400 bg-white text-indigo-950 font-black text-center text-lg sm:text-xl focus:ring-4 focus:ring-indigo-200 focus:outline-none shadow-inner"
                  />
                ) : (
                  <button
                    onClick={() => setSelectedGapId(4)}
                    className={`px-4 py-1.5 mx-1 rounded-xl border-2 font-black text-lg sm:text-xl transition-all ${
                      selectedGapId === 4
                        ? 'bg-indigo-600 text-white font-black ring-4 ring-indigo-200'
                        : storyAnswers[4]
                        ? 'bg-indigo-100 text-indigo-900 border-indigo-300'
                        : 'bg-amber-100 text-amber-900 border-amber-300 animate-pulse'
                    }`}
                  >
                    {storyAnswers[4] || '[ Blank 4 ]'}
                  </button>
                )}{' '}
                {renderParsedText("his backpack on the bus! His mother told him not to worry, but Tom promised to be more ")}{' '}
                {interactiveStory.mode === 'open_cloze' ? (
                  <input
                    type="text"
                    value={storyAnswers[5] || ''}
                    onChange={(e) => setStoryAnswers((prev) => ({ ...prev, 5: e.target.value }))}
                    placeholder="____"
                    className="w-32 px-3 py-1.5 mx-1 rounded-xl border-2 border-indigo-400 bg-white text-indigo-950 font-black text-center text-lg sm:text-xl focus:ring-4 focus:ring-indigo-200 focus:outline-none shadow-inner"
                  />
                ) : (
                  <button
                    onClick={() => setSelectedGapId(5)}
                    className={`px-4 py-1.5 mx-1 rounded-xl border-2 font-black text-lg sm:text-xl transition-all ${
                      selectedGapId === 5
                        ? 'bg-indigo-600 text-white font-black ring-4 ring-indigo-200'
                        : storyAnswers[5]
                        ? 'bg-indigo-100 text-indigo-900 border-indigo-300'
                        : 'bg-amber-100 text-amber-900 border-amber-300 animate-pulse'
                    }`}
                  >
                    {storyAnswers[5] || '[ Blank 5 ]'}
                  </button>
                )}{' '}
                {renderParsedText("next time.")}
              </div>

              {/* Word Bank Container (Hidden if mode === 'open_cloze') */}
              {interactiveStory.mode !== 'open_cloze' && (
                <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-3 shadow-sm">
                  <div className="text-xs font-black text-slate-600 uppercase tracking-wider">
                    Word Bank (Click a word to fill selected Blank {selectedGapId || 1}):
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {interactiveStory.word_bank.map((w, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelectWord(w)}
                        className="px-5 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-950 border border-indigo-200 rounded-xl text-base font-black transition shadow-sm hover:scale-105 active:scale-95"
                      >
                        {w}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Submit / Results for Part 4 Gap-Fill */}
              {!storySubmitted ? (
                <div className="flex justify-end">
                  <button
                    onClick={handleStorySubmit}
                    disabled={Object.keys(storyAnswers).length < interactiveStory.gaps.length}
                    className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl text-sm transition shadow-md flex items-center gap-2 disabled:opacity-40"
                  >
                    <CheckCircle2 size={18} /> Check Interactive Story
                  </button>
                </div>
              ) : (
                <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-300 text-center space-y-2 animate-in fade-in">
                  <h4 className="text-xl font-black text-emerald-950">Gap-Fill Score: {storyScore}%</h4>
                  <p className="text-sm text-emerald-800 font-semibold">Great active reading practice!</p>
                  <button
                    onClick={() => { setStorySubmitted(false); setStoryAnswers({}); setStoryScore(null); }}
                    className="px-5 py-2.5 bg-indigo-600 text-white font-black text-xs rounded-xl shadow-sm hover:bg-indigo-700 transition"
                  >
                    Try Again
                  </button>
                </div>
              )}

              {/* UNIFIED FLOW: CAMBRIDGE FLYERS READING PART 3 (SENTENCE COMPLETION QUESTIONS) */}
              <div className="pt-8 border-t-2 border-slate-200 space-y-6">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <h4 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-wide flex items-center gap-2">
                    <HelpCircle size={20} className="text-indigo-600" /> Comprehension Questions (Part 3)
                  </h4>
                  <span className="text-xs font-bold text-slate-500 font-mono">5 Items • Sentence Completion</span>
                </div>

                {/* 5 Sentence Completion Questions with Boosted Typography & Instant Feedback */}
                <div className="space-y-6">
                  {readingPart3Data.questions.map((q, qIdx) => {
                    const isSubmitted = !!r3Submitted[q.id];
                    const selectedOpt = r3Answers[q.id];

                    return (
                      <div key={q.id || qIdx} className="p-6 sm:p-7 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-5">
                        <div className="text-base sm:text-lg font-black text-slate-900 flex items-start gap-3 leading-snug">
                          <span className="px-3 py-1 bg-indigo-100 text-indigo-900 rounded-xl text-xs font-mono shrink-0 mt-0.5">
                            Q{qIdx + 1}
                          </span>
                          <span>{renderParsedText(q.question, 'indigo')}</span>
                        </div>

                        <div className="space-y-3">
                          {q.options.map((opt, optIdx) => {
                            const isSelected = selectedOpt && selectedOpt.label === opt.label;
                            const isCorrect = opt.isCorrect || (q.answerIndex !== undefined && optIdx === q.answerIndex);

                            let buttonStyle = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800';
                            let badgeStyle = 'bg-slate-200 text-slate-700';

                            if (isSubmitted) {
                              if (isCorrect) {
                                buttonStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-400 shadow-sm';
                                badgeStyle = 'bg-emerald-600 text-white';
                              } else if (isSelected && !isCorrect) {
                                buttonStyle = 'border-rose-500 bg-rose-50 text-rose-950 font-bold ring-2 ring-rose-400 shadow-sm';
                                badgeStyle = 'bg-rose-600 text-white';
                              } else {
                                buttonStyle = 'border-slate-200 bg-slate-50 text-slate-400 opacity-60';
                                badgeStyle = 'bg-slate-200 text-slate-400';
                              }
                            } else if (isSelected) {
                              buttonStyle = 'border-indigo-600 bg-indigo-50/80 text-indigo-950 font-bold ring-2 ring-indigo-500 shadow-sm';
                              badgeStyle = 'bg-indigo-600 text-white';
                            }

                            return (
                              <button
                                key={opt.label}
                                disabled={isSubmitted}
                                onClick={() => setR3Answers((prev) => ({ ...prev, [q.id]: opt }))}
                                className={`w-full p-4 sm:p-5 rounded-2xl text-left border transition-all flex items-center justify-between gap-4 ${buttonStyle}`}
                              >
                                <div className="flex items-center gap-4 flex-1">
                                  <span className={`w-8 h-8 rounded-full font-black flex items-center justify-center text-sm shrink-0 ${badgeStyle}`}>
                                    {opt.label}
                                  </span>
                                  <span className="text-base font-bold leading-relaxed">{renderParsedText(opt.text, 'indigo')}</span>
                                </div>

                                {isSubmitted && isCorrect && (
                                  <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-700 font-extrabold text-xs rounded-full shrink-0">
                                    <CheckCircle2 size={16} /> Correct
                                  </span>
                                )}
                                {isSubmitted && isSelected && !isCorrect && (
                                  <span className="flex items-center gap-1.5 px-3 py-1 bg-rose-100 text-rose-700 font-extrabold text-xs rounded-full shrink-0">
                                    <XCircle size={16} /> Incorrect
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {!isSubmitted ? (
                          <div className="flex justify-end pt-1">
                            <button
                              disabled={!selectedOpt}
                              onClick={() => setR3Submitted((prev) => ({ ...prev, [q.id]: true }))}
                              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl text-xs transition flex items-center gap-1.5 shadow-sm disabled:opacity-40"
                            >
                              <CheckCircle2 size={16} /> Check Answer
                            </button>
                          </div>
                        ) : (
                          <div className="flex justify-end pt-1">
                            <button
                              onClick={() => {
                                setR3Submitted((prev) => ({ ...prev, [q.id]: false }));
                                setR3Answers((prev) => ({ ...prev, [q.id]: null }));
                              }}
                              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-lg text-xs transition flex items-center gap-1.5"
                            >
                              <RefreshCw size={14} /> Retry Question
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
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
