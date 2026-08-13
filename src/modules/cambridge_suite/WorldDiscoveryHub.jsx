import React, { useState, useMemo } from 'react';
import { learnerProgressService } from '../../services/learnerProgressService';
import { executeOpenClozeVerticalSlice } from '../../services/slices/OpenClozeVerticalSlice';
import { executeGenericVerticalSlice, ChoiceQuestionAdapter } from '../../services/slices/GenericVerticalSliceOrchestrator';
import ChoiceGrid from '../../components/common/ChoiceGrid';
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

  // Cambridge Reading Part 3 Story Title State
  const [selectedStoryTitle, setSelectedStoryTitle] = useState(null);
  const [storyTitleSubmitted, setStoryTitleSubmitted] = useState(false);


    const storyScenes = data?.story_scenes || [
    {
      scene_id: 'scene_1',
      title_en: 'Scene 1: Walking Down the Corridor',
      description_en: 'Jake was walking **carefully** down the school **corridor** after science class.',
      image_url: '/images/week33/webtoon_scene_1.png',
      lexical_chunks: [
        { word: 'corridor', chunk: 'school corridor', x: 45, y: 55 },
        { word: 'carefully', chunk: 'walking carefully', x: 25, y: 40 }
      ]
    },
    {
      scene_id: 'scene_2',
      title_en: 'Scene 2: Slipping on the Wet Floor',
      description_en: 'A boy running fast **slipped on the wet floor** and **fell down** heavily.',
      image_url: '/images/week33/webtoon_scene_2.png',
      lexical_chunks: [
        { word: 'slipped', chunk: 'slipped on wet floor', x: 50, y: 70 },
        { word: 'fell', chunk: 'fell down heavily', x: 60, y: 80 }
      ]
    },
    {
      scene_id: 'scene_3',
      title_en: 'Scene 3: Calling the School Nurse',
      description_en: 'Jake stopped immediately and **called the school nurse** for medical help.',
      image_url: '/images/week33/webtoon_scene_3.png',
      lexical_chunks: [
        { word: 'nurse', chunk: 'school nurse', x: 35, y: 50 },
        { word: 'called', chunk: 'called immediately', x: 55, y: 60 }
      ]
    },
    {
      scene_id: 'scene_4',
      title_en: 'Scene 4: Applying First Aid & Bandage',
      description_en: 'The nurse arrived quickly with a **clean bandage** and a **cold pack**.',
      image_url: '/images/week33/webtoon_scene_4.png',
      lexical_chunks: [
        { word: 'bandage', chunk: 'clean bandage', x: 40, y: 60 },
        { word: 'cold_pack', chunk: 'cold pack', x: 60, y: 65 }
      ]
    },
    {
      scene_id: 'scene_5',
      title_en: 'Scene 5: Feeling Relieved & Praised',
      description_en: 'Everyone **felt relieved** and the headmaster **praised Jake** for following safety rules.',
      image_url: '/images/week33/webtoon_scene_5.png',
      lexical_chunks: [
        { word: 'relieved', chunk: 'felt relieved', x: 45, y: 50 },
        { word: 'praised', chunk: 'praised Jake', x: 65, y: 55 }
      ]
    }
  ];

    const interactiveStory = data?.interactive_story || {
    title: "Interactive Story: Corridor Safety Incident",
    text_template: "Jake was walking carefully down the school corridor today. First, he noticed a wet puddle near the science room. Then, a boy running fast ____1____ on the slippery tiles and ____2____ heavily. ____3____, Jake stopped immediately and ____4____ the school nurse. The nurse arrived quickly with a ____5____ and treated his knee gently.",
    gaps: [
      { id: 1, target: 'slipped', hint: 'bị trượt chân' },
      { id: 2, target: 'fell down', hint: 'ngã xuống' },
      { id: 3, target: 'Without hesitation', hint: 'không chần chừ' },
      { id: 4, target: 'called', hint: 'gọi y tế' },
      { id: 5, target: 'clean bandage', hint: 'băng cá nhân' }
    ],
    word_bank: ['slipped', 'fell down', 'Without hesitation', 'called', 'clean bandage', 'careful', 'hurt']
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

  // Submit Interactive Story Gap-Fill / Open Cloze via Golden Vertical Slice Pipeline
  const handleStorySubmit = async () => {
    const sliceResult = await executeOpenClozeVerticalSlice({
      weekData: { weekId: weekNumber, readingHub: data, interactive_story: interactiveStory },
      userAnswers: storyAnswers,
      learnerId,
      timeSpentSeconds: 45
    });

    setStoryScore(sliceResult.stage3_scoreResult.scorePct);
    setStorySubmitted(true);
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

              {/* Story Paragraph with Clickable Blanks or Open Cloze Inputs (Boosted Typography: font-sans font-bold text-lg sm:text-xl leading-loose) */}
              <div className="p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-sm leading-loose sm:leading-extraloose text-lg sm:text-xl font-bold text-slate-900 space-y-2">
                {renderParsedText("Jake was walking **carefully down the school corridor** today. Suddenly, a classmate running fast ")}{' '}
                {interactiveStory.mode === 'open_cloze' ? (
                  <input
                    type="text"
                    value={storyAnswers[1] || ''}
                    onChange={(e) => setStoryAnswers((prev) => ({ ...prev, 1: e.target.value }))}
                    placeholder={interactiveStory.hints?.[1] || "____"}
                    className="w-48 px-3 py-1.5 mx-1 rounded-xl border-2 border-indigo-400 bg-white text-indigo-950 font-black text-center text-base sm:text-lg focus:ring-4 focus:ring-indigo-200 focus:outline-none shadow-inner placeholder:text-slate-400 placeholder:italic placeholder:text-sm"
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
                    {storyAnswers[1] || `[ ${interactiveStory.hints?.[1] || 'Blank 1'} ]`}
                  </button>
                )}{' '}
                {renderParsedText(" on the wet slippery tiles and ")}{' '}
                {interactiveStory.mode === 'open_cloze' ? (
                  <input
                    type="text"
                    value={storyAnswers[2] || ''}
                    onChange={(e) => setStoryAnswers((prev) => ({ ...prev, 2: e.target.value }))}
                    placeholder={interactiveStory.hints?.[2] || "____"}
                    className="w-48 px-3 py-1.5 mx-1 rounded-xl border-2 border-indigo-400 bg-white text-indigo-950 font-black text-center text-base sm:text-lg focus:ring-4 focus:ring-indigo-200 focus:outline-none shadow-inner placeholder:text-slate-400 placeholder:italic placeholder:text-sm"
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
                    {storyAnswers[2] || `[ ${interactiveStory.hints?.[2] || 'Blank 2'} ]`}
                  </button>
                )}
                {renderParsedText(" heavily near the science room. ")}{' '}
                {interactiveStory.mode === 'open_cloze' ? (
                  <input
                    type="text"
                    value={storyAnswers[3] || ''}
                    onChange={(e) => setStoryAnswers((prev) => ({ ...prev, 3: e.target.value }))}
                    placeholder={interactiveStory.hints?.[3] || "____"}
                    className="w-48 px-3 py-1.5 mx-1 rounded-xl border-2 border-indigo-400 bg-white text-indigo-950 font-black text-center text-base sm:text-lg focus:ring-4 focus:ring-indigo-200 focus:outline-none shadow-inner placeholder:text-slate-400 placeholder:italic placeholder:text-sm"
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
                    {storyAnswers[3] || `[ ${interactiveStory.hints?.[3] || 'Blank 3'} ]`}
                  </button>
                )}{' '}
                {renderParsedText(", Jake stopped immediately and ")}{' '}
                {interactiveStory.mode === 'open_cloze' ? (
                  <input
                    type="text"
                    value={storyAnswers[4] || ''}
                    onChange={(e) => setStoryAnswers((prev) => ({ ...prev, 4: e.target.value }))}
                    placeholder={interactiveStory.hints?.[4] || "____"}
                    className="w-48 px-3 py-1.5 mx-1 rounded-xl border-2 border-indigo-400 bg-white text-indigo-950 font-black text-center text-base sm:text-lg focus:ring-4 focus:ring-indigo-200 focus:outline-none shadow-inner placeholder:text-slate-400 placeholder:italic placeholder:text-sm"
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
                    {storyAnswers[4] || `[ ${interactiveStory.hints?.[4] || 'Blank 4'} ]`}
                  </button>
                )}{' '}
                {renderParsedText(" the school nurse for medical help. The nurse arrived quickly with a ")}{' '}
                {interactiveStory.mode === 'open_cloze' ? (
                  <input
                    type="text"
                    value={storyAnswers[5] || ''}
                    onChange={(e) => setStoryAnswers((prev) => ({ ...prev, 5: e.target.value }))}
                    placeholder={interactiveStory.hints?.[5] || "____"}
                    className="w-48 px-3 py-1.5 mx-1 rounded-xl border-2 border-indigo-400 bg-white text-indigo-950 font-black text-center text-base sm:text-lg focus:ring-4 focus:ring-indigo-200 focus:outline-none shadow-inner placeholder:text-slate-400 placeholder:italic placeholder:text-sm"
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
                    {storyAnswers[5] || `[ ${interactiveStory.hints?.[5] || 'Blank 5'} ]`}
                  </button>
                )}{' '}
                {renderParsedText(" and **promised to be more careful** next time.")}
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

                        <ChoiceGrid
                          options={q.options}
                          selectedOption={selectedOpt}
                          isSubmitted={isSubmitted}
                          answerIndex={q.answerIndex}
                          onSelectOption={(opt) => setR3Answers((prev) => ({ ...prev, [q.id]: opt }))}
                          themeColor="indigo"
                        />

                        {!isSubmitted ? (
                          <div className="flex justify-end pt-1">
                            <button
                              disabled={!selectedOpt}
                              onClick={async () => {
                                setR3Submitted((prev) => ({ ...prev, [q.id]: true }));
                                await executeGenericVerticalSlice({
                                  adapter: ChoiceQuestionAdapter,
                                  rawData: { questions: [q] },
                                  weekData: { weekId: weekNumber, readingHub: data },
                                  userAnswers: { [q.id]: selectedOpt },
                                  learnerId,
                                  contentIdOverride: `w${weekNumber}_r3_${q.id}`
                                });
                              }}
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

              {/* CAMBRIDGE FLYERS READING PART 3: CHOOSE THE BEST TITLE FOR THE STORY */}
              <div className="pt-8 border-t-2 border-indigo-200 space-y-4">
                <div className="p-6 sm:p-8 bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 text-white rounded-3xl shadow-xl space-y-4 border border-indigo-700">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-indigo-500/30 text-indigo-200 text-xs font-black uppercase tracking-widest rounded-full border border-indigo-400/30">
                      CAMBRIDGE READING PART 3 — FINAL TASK
                    </span>
                    <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black font-serif">
                    {data?.story_title_options?.question_en || "Now choose the best title for the story:"}
                  </h3>

                  <div className="grid grid-cols-1 gap-3 pt-2">
                    {(data?.story_title_options?.options || [
                      { id: "opt_a", text: "Tom's Clumsy Morning", is_correct: false, explanation: "Incorrect: The story is about Jake in the school corridor, not Tom." },
                      { id: "opt_b", text: "Corridor Safety & Quick Action", is_correct: true, explanation: "Correct! The story describes corridor safety, Jake's quick action, and first aid treatment." },
                      { id: "opt_c", text: "Playing Soccer in Science Class", is_correct: false, explanation: "Incorrect: Soccer is not played in science class." }
                    ]).map((opt) => {
                      const isSelected = selectedStoryTitle === opt.id;
                      const isCorrect = opt.is_correct;

                      return (
                        <button
                          key={opt.id}
                          disabled={storyTitleSubmitted}
                          onClick={() => setSelectedStoryTitle(opt.id)}
                          className={`p-4 rounded-2xl font-bold text-left transition-all flex items-center justify-between border-2 ${
                            storyTitleSubmitted
                              ? isCorrect
                                ? 'bg-emerald-600 text-white border-emerald-400 shadow-md'
                                : isSelected
                                ? 'bg-rose-600 text-white border-rose-400 shadow-md'
                                : 'bg-indigo-950/60 text-indigo-200 border-indigo-800 opacity-60'
                              : isSelected
                              ? 'bg-amber-400 text-indigo-950 border-amber-300 font-black shadow-lg scale-[1.01]'
                              : 'bg-indigo-950/80 hover:bg-indigo-800/80 text-white border-indigo-700'
                          }`}
                        >
                          <span className="text-base sm:text-lg">{opt.text}</span>
                          {storyTitleSubmitted && isCorrect && <CheckCircle2 className="w-6 h-6 text-white" />}
                        </button>
                      );
                    })}
                  </div>

                  {!storyTitleSubmitted ? (
                    <div className="pt-2 flex justify-end">
                      <button
                        disabled={!selectedStoryTitle}
                        onClick={async () => {
                          setStoryTitleSubmitted(true);
                          const isCorrect = selectedStoryTitle === 'opt_b' || selectedStoryTitle?.includes('b');
                          await learnerProgressService.logAttempt({
                            learnerId,
                            contentId: `w${weekNumber}_rw_p3_title`,
                            mode: 'learn',
                            result: isCorrect ? 'correct' : 'incorrect',
                            score: isCorrect ? 100 : 0,
                            timeSpentSeconds: 20
                          });
                        }}
                        className="px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-indigo-950 font-black text-sm sm:text-base rounded-2xl transition shadow-lg active:scale-95 disabled:opacity-40"
                      >
                        Submit Story Title Choice
                      </button>
                    </div>
                  ) : (
                    <div className="p-4 bg-indigo-950/90 rounded-2xl border border-indigo-600 text-sm font-bold text-indigo-100 flex items-center justify-between">
                      <span>
                        {selectedStoryTitle === 'opt_b' || selectedStoryTitle?.includes('b')
                          ? '🎉 Correct! Corridor Safety & Quick Action is the best title!'
                          : '❌ Try again! Re-read the main theme of the story.'}
                      </span>
                      <button
                        onClick={() => { setStoryTitleSubmitted(false); setSelectedStoryTitle(null); }}
                        className="px-4 py-2 bg-indigo-700 hover:bg-indigo-600 text-white font-bold rounded-xl text-xs transition"
                      >
                        Retry Title
                      </button>
                    </div>
                  )}
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
