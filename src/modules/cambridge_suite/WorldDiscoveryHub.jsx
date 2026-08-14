import React, { useState, useMemo } from 'react';
import { learnerProgressService } from '../../services/learnerProgressService';
import { executeOpenClozeVerticalSlice } from '../../services/slices/OpenClozeVerticalSlice';
import { executeGenericVerticalSlice, ChoiceQuestionAdapter } from '../../services/slices/GenericVerticalSliceOrchestrator';
import ChoiceGrid from '../../components/common/ChoiceGrid';
import { useUserStore } from '../../stores/useUserStore';
import VoiceService from '../../services/voiceService';
import HoverWord from '../../components/common/HoverWord';
import { speakText } from '../../utils/AudioHelper';
import { BookOpen, Volume2, Sparkles, CheckCircle2, PlayCircle, GraduationCap, ArrowRight, Layers, FileText, RefreshCw, HelpCircle, XCircle, MessageSquare, Type } from 'lucide-react';
import WordBankMatchingGrid from '../../components/cambridge/WordBankMatchingGrid';
import DialogueAHCompleter from '../../components/cambridge/DialogueAHCompleter';
import InlineTextClozeDropdown from '../../components/cambridge/InlineTextClozeDropdown';
import TextExtractionCompleter from '../../components/cambridge/TextExtractionCompleter';


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
      {/* Top Controls: Learn Mode vs Check Mode */}
      <div className="flex items-center justify-end mb-4">

        {/* Tab Switcher: Learn Mode (Blue Pastel) vs Check Mode (Amber Focus) */}
        <div className={`flex items-center gap-2 p-1.5 rounded-2xl border transition-all ${
          activeTab === 'webtoon' ? 'bg-blue-50/80 border-blue-200 ring-2 ring-blue-100' : 'bg-amber-50/90 border-amber-300 ring-2 ring-amber-200'
        }`}>
          <button
            onClick={() => setActiveTab('webtoon')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
              activeTab === 'webtoon' ? 'bg-blue-600 text-white shadow-md' : 'bg-white/60 text-blue-800 hover:bg-blue-100'
            }`}
          >
            <PlayCircle size={14} /> 📖 Learn Mode
          </button>
          <button
            onClick={() => setActiveTab('check')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
              activeTab === 'check' ? 'bg-amber-600 text-white shadow-md' : 'bg-white/60 text-amber-900 hover:bg-amber-100'
            }`}
          >
            <GraduationCap size={14} /> 🎯 Check Mode
          </button>
        </div>
      </div>

      {activeTab === 'webtoon' ? (
        /* LEARN MODE: CAMBRIDGE READING & WRITING SUITE SUB-TABS */
        <div className="space-y-6">
          <div className="flex items-center justify-between sm:justify-evenly w-full flex-wrap gap-2 p-1.5 bg-blue-50/60 rounded-2xl border border-blue-200">
            <button
              onClick={() => setLearnSubTab('webtoon')}
              className={`flex-1 min-w-[120px] px-3.5 py-2.5 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 ${
                learnSubTab === 'webtoon' ? 'bg-blue-600 text-white shadow-md ring-2 ring-blue-300' : 'bg-white text-blue-900 border border-blue-200 hover:bg-blue-100'
              }`}
            >
              📖 Story Time
            </button>
            <button
              onClick={() => setLearnSubTab('rw_part1')}
              className={`flex-1 min-w-[120px] px-3.5 py-2.5 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 ${
                learnSubTab === 'rw_part1' ? 'bg-blue-600 text-white shadow-md ring-2 ring-blue-300' : 'bg-white text-blue-900 border border-blue-200 hover:bg-blue-100'
              }`}
            >
              🧩 Word Match
            </button>
            <button
              onClick={() => setLearnSubTab('rw_part2')}
              className={`flex-1 min-w-[120px] px-3.5 py-2.5 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 ${
                learnSubTab === 'rw_part2' ? 'bg-blue-600 text-white shadow-md ring-2 ring-blue-300' : 'bg-white text-blue-900 border border-blue-200 hover:bg-blue-100'
              }`}
            >
              💬 Chat Box
            </button>
            <button
              onClick={() => setLearnSubTab('rw_part4')}
              className={`flex-1 min-w-[120px] px-3.5 py-2.5 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 ${
                learnSubTab === 'rw_part4' ? 'bg-blue-600 text-white shadow-md ring-2 ring-blue-300' : 'bg-white text-blue-900 border border-blue-200 hover:bg-blue-100'
              }`}
            >
              📝 Fill the Blanks
            </button>
            <button
              onClick={() => setLearnSubTab('rw_part5')}
              className={`flex-1 min-w-[120px] px-3.5 py-2.5 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 ${
                learnSubTab === 'rw_part5' ? 'bg-blue-600 text-white shadow-md ring-2 ring-blue-300' : 'bg-white text-blue-900 border border-blue-200 hover:bg-blue-100'
              }`}
            >
              🕵️ Story Detective
            </button>
          </div>

          {learnSubTab === 'webtoon' && (
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

              {/* Webtoon Frame Selector Carousel */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="text-xs font-black text-slate-500 uppercase tracking-wider">
                  Story Scenes (Click to Jump Frame):
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {storyScenes.map((frame, idx) => (
                    <button
                      key={frame.scene_id || idx}
                      onClick={() => setActiveFrameIndex(idx)}
                      className={`p-2 rounded-xl border-2 text-left transition-all ${
                        activeFrameIndex === idx
                          ? 'border-indigo-600 bg-white shadow-md ring-2 ring-indigo-200'
                          : 'border-slate-200 bg-white hover:border-indigo-300'
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
          )}

          {learnSubTab === 'rw_part1' && (
            <WordBankMatchingGrid
              customData={data?.rw_part1}
              onComplete={async (score) => {
                await learnerProgressService.logAttempt({
                  learnerId,
                  contentId: `w${weekNumber}_rw_part1`,
                  mode: 'learn',
                  result: score >= 80 ? 'correct' : 'incorrect',
                  score,
                  timeSpentSeconds: 60
                });
              }}
            />
          )}

          {learnSubTab === 'rw_part2' && (
            <DialogueAHCompleter
              customData={data?.rw_part2}
              onComplete={async (score) => {
                await learnerProgressService.logAttempt({
                  learnerId,
                  contentId: `w${weekNumber}_rw_part2`,
                  mode: 'learn',
                  result: score >= 80 ? 'correct' : 'incorrect',
                  score,
                  timeSpentSeconds: 60
                });
              }}
            />
          )}

          {learnSubTab === 'rw_part4' && (
            <InlineTextClozeDropdown
              customData={data?.rw_part4}
              onComplete={async (score) => {
                await learnerProgressService.logAttempt({
                  learnerId,
                  contentId: `w${weekNumber}_rw_part4`,
                  mode: 'learn',
                  result: score >= 80 ? 'correct' : 'incorrect',
                  score,
                  timeSpentSeconds: 60
                });
              }}
            />
          )}

          {learnSubTab === 'rw_part5' && (
            <TextExtractionCompleter
              customData={data?.rw_part5}
              onComplete={async (score) => {
                await learnerProgressService.logAttempt({
                  learnerId,
                  contentId: `w${weekNumber}_rw_part5`,
                  mode: 'learn',
                  result: score >= 80 ? 'correct' : 'incorrect',
                  score,
                  timeSpentSeconds: 60
                });
              }}
            />
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
